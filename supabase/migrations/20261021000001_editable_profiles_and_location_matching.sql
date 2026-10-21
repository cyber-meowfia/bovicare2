-- ==============================================================================
-- MIGRATION: 20261021000001_editable_profiles_and_location_matching.sql
-- DESCRIPTION: Structured location fields for Profiles & Farms, location-based
--              vet matching hierarchy, and farmer privacy protection.
-- ==============================================================================

-- 1. Add structured location columns to profiles (for veterinarians & farmers)
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS village_city TEXT,
  ADD COLUMN IF NOT EXISTS district TEXT,
  ADD COLUMN IF NOT EXISTS state TEXT,
  ADD COLUMN IF NOT EXISTS pincode TEXT,
  ADD COLUMN IF NOT EXISTS practice_address TEXT,
  ADD COLUMN IF NOT EXISTS service_area TEXT,
  ADD COLUMN IF NOT EXISTS is_active_vet BOOLEAN NOT NULL DEFAULT TRUE;

-- 2. Add structured location columns and assigned vet reference to farms
ALTER TABLE public.farms
  ADD COLUMN IF NOT EXISTS village_city TEXT,
  ADD COLUMN IF NOT EXISTS district TEXT,
  ADD COLUMN IF NOT EXISTS state TEXT,
  ADD COLUMN IF NOT EXISTS pincode TEXT,
  ADD COLUMN IF NOT EXISTS assigned_vet_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL;

-- 3. Indexes for fast location matching
CREATE INDEX IF NOT EXISTS idx_profiles_vet_location 
  ON public.profiles(role, is_verified_vet, is_active_vet, pincode, district, state) 
  WHERE role = 'veterinarian';

CREATE INDEX IF NOT EXISTS idx_farms_location 
  ON public.farms(pincode, district, state);

-- 4. Location Matching Function (4-Tier Hierarchy + Deterministic Tie-Breaker)
-- Tier 4: Exact PIN Code match
-- Tier 3: Same Village/City AND District
-- Tier 2: Same District
-- Tier 1: Same State
-- Tier 0: No match (returns NULL)
-- Tie-breaker: created_at ASC, id ASC
CREATE OR REPLACE FUNCTION public.match_vet_for_farm(p_farm_id UUID)
RETURNS UUID AS $$
DECLARE
  v_farm RECORD;
  v_current_vet RECORD;
  v_current_tier INT := 0;
  v_best_vet_id UUID;
  v_best_tier INT := 0;
BEGIN
  -- Read farm location details
  SELECT id, village_city, district, state, pincode, assigned_vet_id
  INTO v_farm
  FROM public.farms
  WHERE id = p_farm_id;

  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  -- Evaluate current vet's tier if already assigned and still eligible
  IF v_farm.assigned_vet_id IS NOT NULL THEN
    SELECT id, village_city, district, state, pincode, is_verified_vet, is_active_vet
    INTO v_current_vet
    FROM public.profiles
    WHERE id = v_farm.assigned_vet_id 
      AND role = 'veterinarian' 
      AND is_verified_vet = TRUE 
      AND is_active_vet = TRUE;

    IF FOUND THEN
      IF v_farm.pincode IS NOT NULL AND v_current_vet.pincode IS NOT NULL 
         AND LOWER(TRIM(v_farm.pincode)) = LOWER(TRIM(v_current_vet.pincode)) THEN
        v_current_tier := 4;
      ELSIF v_farm.village_city IS NOT NULL AND v_current_vet.village_city IS NOT NULL
         AND LOWER(TRIM(v_farm.village_city)) = LOWER(TRIM(v_current_vet.village_city))
         AND v_farm.district IS NOT NULL AND v_current_vet.district IS NOT NULL
         AND LOWER(TRIM(v_farm.district)) = LOWER(TRIM(v_current_vet.district)) THEN
        v_current_tier := 3;
      ELSIF v_farm.district IS NOT NULL AND v_current_vet.district IS NOT NULL
         AND LOWER(TRIM(v_farm.district)) = LOWER(TRIM(v_current_vet.district)) THEN
        v_current_tier := 2;
      ELSIF v_farm.state IS NOT NULL AND v_current_vet.state IS NOT NULL
         AND LOWER(TRIM(v_farm.state)) = LOWER(TRIM(v_current_vet.state)) THEN
        v_current_tier := 1;
      END IF;
    END IF;
  END IF;

  -- Search for highest tier eligible vet
  SELECT 
    p.id,
    CASE 
      WHEN v_farm.pincode IS NOT NULL AND p.pincode IS NOT NULL 
           AND LOWER(TRIM(v_farm.pincode)) = LOWER(TRIM(p.pincode)) THEN 4
      WHEN v_farm.village_city IS NOT NULL AND p.village_city IS NOT NULL 
           AND LOWER(TRIM(v_farm.village_city)) = LOWER(TRIM(p.village_city))
           AND v_farm.district IS NOT NULL AND p.district IS NOT NULL 
           AND LOWER(TRIM(v_farm.district)) = LOWER(TRIM(p.district)) THEN 3
      WHEN v_farm.district IS NOT NULL AND p.district IS NOT NULL 
           AND LOWER(TRIM(v_farm.district)) = LOWER(TRIM(p.district)) THEN 2
      WHEN v_farm.state IS NOT NULL AND p.state IS NOT NULL 
           AND LOWER(TRIM(v_farm.state)) = LOWER(TRIM(p.state)) THEN 1
      ELSE 0
    END AS tier
  INTO v_best_vet_id, v_best_tier
  FROM public.profiles p
  WHERE p.role = 'veterinarian'
    AND p.is_verified_vet = TRUE
    AND p.is_active_vet = TRUE
    AND (
      (v_farm.pincode IS NOT NULL AND p.pincode IS NOT NULL AND LOWER(TRIM(v_farm.pincode)) = LOWER(TRIM(p.pincode))) OR
      (v_farm.district IS NOT NULL AND p.district IS NOT NULL AND LOWER(TRIM(v_farm.district)) = LOWER(TRIM(p.district))) OR
      (v_farm.state IS NOT NULL AND p.state IS NOT NULL AND LOWER(TRIM(v_farm.state)) = LOWER(TRIM(p.state)))
    )
  ORDER BY tier DESC, p.created_at ASC, p.id ASC
  LIMIT 1;

  -- Rule 9: Avoid unnecessary reassignment if current vet maintains the same or higher match tier
  IF v_current_tier > 0 AND v_current_tier >= v_best_tier THEN
    RETURN v_farm.assigned_vet_id;
  END IF;

  -- If a suitable matching vet was found, assign them
  IF v_best_tier > 0 THEN
    UPDATE public.farms 
    SET assigned_vet_id = v_best_vet_id, updated_at = NOW()
    WHERE id = p_farm_id;
    RETURN v_best_vet_id;
  ELSE
    -- No suitable vet available for this location
    UPDATE public.farms 
    SET assigned_vet_id = NULL, updated_at = NOW()
    WHERE id = p_farm_id;
    RETURN NULL;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Trigger on farm location update to recalculate vet assignment
CREATE OR REPLACE FUNCTION public.trg_farm_location_recalculate()
RETURNS TRIGGER AS $$
BEGIN
  IF (OLD.pincode IS DISTINCT FROM NEW.pincode OR 
      OLD.village_city IS DISTINCT FROM NEW.village_city OR 
      OLD.district IS DISTINCT FROM NEW.district OR 
      OLD.state IS DISTINCT FROM NEW.state) THEN
    PERFORM public.match_vet_for_farm(NEW.id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_farm_location_change ON public.farms;
CREATE TRIGGER on_farm_location_change
  AFTER UPDATE ON public.farms
  FOR EACH ROW
  EXECUTE FUNCTION public.trg_farm_location_recalculate();

-- 6. Trigger on new mastitis case to auto-route to farm's assigned vet
CREATE OR REPLACE FUNCTION public.trg_route_case_to_farm_vet()
RETURNS TRIGGER AS $$
DECLARE
  v_assigned_vet UUID;
BEGIN
  IF NEW.assigned_vet_id IS NULL AND NEW.farm_id IS NOT NULL THEN
    SELECT assigned_vet_id INTO v_assigned_vet FROM public.farms WHERE id = NEW.farm_id;
    IF v_assigned_vet IS NULL THEN
      -- Run dynamic match if farm does not have an assigned vet yet
      v_assigned_vet := public.match_vet_for_farm(NEW.farm_id);
    END IF;
    NEW.assigned_vet_id := v_assigned_vet;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_case_create_route_vet ON public.mastitis_cases;
CREATE TRIGGER on_case_create_route_vet
  BEFORE INSERT ON public.mastitis_cases
  FOR EACH ROW
  EXECUTE FUNCTION public.trg_route_case_to_farm_vet();
