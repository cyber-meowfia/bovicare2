-- ============================================================================
-- BOVICARE STRICT ROLE-BASED ACCESS CONTROL & ROUTE PROTECTION MIGRATION
-- Migration Version: 20261020000001
-- Description:
--   1. Reinforces strict prevention of client-side role self-escalation.
--   2. Enforces explicit separation between Farmer and Veterinarian actions.
--   3. Guarantees that users cannot change their assigned role via API payloads.
-- ============================================================================

-- 1. Strict Role Self-Escalation Barrier Trigger
-- Ensures only database administrators or service_role can alter role / is_verified_vet
CREATE OR REPLACE FUNCTION public.prevent_role_self_escalation()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    IF (OLD.role IS DISTINCT FROM NEW.role OR OLD.is_verified_vet IS DISTINCT FROM NEW.is_verified_vet) THEN
        IF (auth.jwt() ->> 'role' != 'service_role') AND NOT EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        ) THEN
            RAISE EXCEPTION 'Access Denied: Role modifications require administrative credentials.'
                USING ERRCODE = '42501';
        END IF;
    END IF;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_prevent_role_self_escalation ON public.profiles;
CREATE TRIGGER trg_prevent_role_self_escalation
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.prevent_role_self_escalation();

-- 2. Enforce Veterinary-Only Prescription and Diagnosis Modifications
-- Farmers cannot update clinical diagnosis or prescription records
DROP POLICY IF EXISTS "diagnoses_farmer_read_only" ON public.diagnoses;
CREATE POLICY "diagnoses_farmer_read_only" ON public.diagnoses FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.mastitis_cases mc
        WHERE mc.id = case_id AND public.is_farm_member(mc.farm_id)
    )
    OR public.is_vet()
    OR public.is_admin()
);

DROP POLICY IF EXISTS "diagnoses_vet_modify" ON public.diagnoses;
CREATE POLICY "diagnoses_vet_modify" ON public.diagnoses FOR ALL TO authenticated
USING (public.is_vet() OR public.is_admin())
WITH CHECK (public.is_vet() OR public.is_admin());

-- 3. Enforce Farmer-Only Livestock Management
-- Veterinarians have read & clinical-update access, but cannot create or delete cows
DROP POLICY IF EXISTS "cows_farmer_insert_only" ON public.cows;
CREATE POLICY "cows_farmer_insert_only" ON public.cows FOR INSERT TO authenticated
WITH CHECK (
    public.is_farm_member(farm_id) 
    AND NOT public.is_vet()
);
