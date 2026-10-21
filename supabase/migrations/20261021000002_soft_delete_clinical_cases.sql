-- ==============================================================================
-- MIGRATION: 20261021000002_soft_delete_clinical_cases.sql
-- DESCRIPTION: Soft-delete column, active cases index, guarded soft_delete_case
--              stored procedure, and updated RLS policies for mastitis_cases.
-- ==============================================================================

-- 1. Add deleted_at column for soft-delete lifecycle
ALTER TABLE public.mastitis_cases 
  ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ DEFAULT NULL;

-- 2. Partial index for active (non-deleted) cases
CREATE INDEX IF NOT EXISTS idx_cases_active 
  ON public.mastitis_cases(farm_id, deleted_at) 
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_cases_vet_active 
  ON public.mastitis_cases(assigned_vet_id, deleted_at) 
  WHERE deleted_at IS NULL;

-- 3. Stored Procedure for Guarded Soft-Deletion
CREATE OR REPLACE FUNCTION public.soft_delete_case(p_case_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  v_case RECORD;
  v_has_active_prescription BOOLEAN := FALSE;
BEGIN
  -- Read case record
  SELECT id, farm_id, reported_by, assigned_vet_id, status, deleted_at
  INTO v_case
  FROM public.mastitis_cases
  WHERE id = p_case_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Case not found: %', p_case_id;
  END IF;

  IF v_case.deleted_at IS NOT NULL THEN
    RETURN TRUE; -- Already marked deleted
  END IF;

  -- 1. If caller is licensed veterinarian: full clinical discretion
  IF public.is_vet() THEN
    UPDATE public.mastitis_cases
    SET deleted_at = NOW(), updated_at = NOW()
    WHERE id = p_case_id;
    RETURN TRUE;

  -- 2. If caller is farm member: guarded by prescription / withholding status
  ELSIF public.is_farm_member(v_case.farm_id) THEN
    SELECT EXISTS (
      SELECT 1 FROM public.treatment_plans
      WHERE case_id = p_case_id
    ) INTO v_has_active_prescription;

    IF v_has_active_prescription OR v_case.status = 'treatment_prescribed' THEN
      RAISE EXCEPTION 'Food safety policy: Cannot delete cases with active prescriptions or mandatory milk withholding.';
    END IF;

    UPDATE public.mastitis_cases
    SET deleted_at = NOW(), updated_at = NOW()
    WHERE id = p_case_id;
    RETURN TRUE;

  ELSE
    RAISE EXCEPTION 'Access denied: You do not have permission to delete this case.';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Update Select Policies on mastitis_cases to hide soft-deleted cases by default
DROP POLICY IF EXISTS "cases_farmer_select" ON public.mastitis_cases;
CREATE POLICY "cases_farmer_select" ON public.mastitis_cases FOR SELECT TO authenticated
    USING (public.is_farm_member(farm_id) AND deleted_at IS NULL);

DROP POLICY IF EXISTS "cases_vet_select" ON public.mastitis_cases;
CREATE POLICY "cases_vet_select" ON public.mastitis_cases FOR SELECT TO authenticated
    USING (public.is_vet() AND deleted_at IS NULL);

-- 5. Update Policies allowing farmers and vets to soft-delete cases
DROP POLICY IF EXISTS "cases_farmer_soft_delete" ON public.mastitis_cases;
CREATE POLICY "cases_farmer_soft_delete" ON public.mastitis_cases FOR UPDATE TO authenticated
    USING (public.is_farm_member(farm_id) AND status = 'open' AND deleted_at IS NULL)
    WITH CHECK (public.is_farm_member(farm_id));
