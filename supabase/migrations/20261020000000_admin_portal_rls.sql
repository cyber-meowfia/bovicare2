-- ============================================================================
-- BOVICARE SECURE ADMIN PORTAL & RBAC EXTENSION MIGRATION
-- Migration Version: 20261020000000
-- Description:
--   1. Adds public.is_admin() Security Definer function to check admin role.
--   2. Adds Admin-level RLS policies across all tables.
--   3. Defines a secure, aggregated KPI function for the Admin Dashboard.
--   4. Preserves all existing farmer and veterinarian security policies.
-- ============================================================================

-- 1. Helper function: Check if current authenticated user has 'admin' role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- 2. Aggregated Admin KPIs function (Security Definer, restricted to Admins)
-- Active Veterinarian Definition:
--   A veterinarian profile is considered 'active' if they are either verified
--   (is_verified_vet = TRUE) OR currently have assigned mastitis triage cases.
CREATE OR REPLACE FUNCTION public.get_admin_dashboard_metrics()
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_total_farmers INT := 0;
  v_active_vets INT := 0;
  v_total_vets INT := 0;
  v_total_admins INT := 0;
  v_total_cows INT := 0;
  v_total_buffaloes INT := 0;
  v_total_livestock INT := 0;
  v_total_cases INT := 0;
  v_open_cases INT := 0;
  v_result JSONB;
BEGIN
  -- Strict permission gate: Only admin can execute
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Access Denied: Only users with the administrator role may view system telemetry.'
      USING ERRCODE = '42501';
  END IF;

  -- User role counts from public.profiles
  SELECT COUNT(*) INTO v_total_farmers FROM public.profiles WHERE role = 'farmer';
  SELECT COUNT(*) INTO v_total_vets FROM public.profiles WHERE role = 'veterinarian';
  SELECT COUNT(*) INTO v_total_admins FROM public.profiles WHERE role = 'admin';

  -- Active Veterinarians (Verified or actively managing clinical cases)
  SELECT COUNT(*) INTO v_active_vets
  FROM public.profiles p
  WHERE p.role = 'veterinarian'
    AND (
      p.is_verified_vet = TRUE
      OR EXISTS (
        SELECT 1 FROM public.mastitis_cases mc
        WHERE mc.assigned_vet_id = p.id
      )
    );

  -- Livestock counts & Species breakdown (Cow vs Buffalo)
  SELECT COUNT(*) INTO v_total_livestock FROM public.cows;
  SELECT COUNT(*) INTO v_total_buffaloes
  FROM public.cows
  WHERE LOWER(breed) LIKE '%buffalo%' OR LOWER(breed) LIKE '%murrah%';
  
  v_total_cows := v_total_livestock - v_total_buffaloes;
  IF v_total_cows < 0 THEN v_total_cows := 0; END IF;

  -- Mastitis Clinical Cases
  SELECT COUNT(*) INTO v_total_cases FROM public.mastitis_cases;
  SELECT COUNT(*) INTO v_open_cases FROM public.mastitis_cases WHERE status IN ('open', 'under_review', 'escalated');

  v_result := jsonb_build_object(
    'total_farmers', v_total_farmers,
    'active_vets', v_active_vets,
    'total_vets', v_total_vets,
    'total_admins', v_total_admins,
    'total_registered_users', (v_total_farmers + v_total_vets + v_total_admins),
    'total_cows', v_total_cows,
    'total_buffaloes', v_total_buffaloes,
    'total_livestock', v_total_livestock,
    'total_cases', v_total_cases,
    'open_cases', v_open_cases,
    'active_vet_definition', 'is_verified_vet = TRUE or assigned active cases'
  );

  RETURN v_result;
END;
$$;

-- Grant execution to authenticated users (internal gate checks is_admin())
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_admin_dashboard_metrics() TO authenticated;

-- 3. Row Level Security Policies for Administrator Access
-- Ensures Admins can inspect and audit tables without breaking farmer/vet policies

-- PROFILES (Admin Read & Manage)
DROP POLICY IF EXISTS "admin_profiles_all" ON public.profiles;
CREATE POLICY "admin_profiles_all" ON public.profiles FOR ALL TO authenticated
USING (public.is_admin()) WITH CHECK (public.is_admin());

-- FARMS & MEMBERS (Admin Read & Manage)
DROP POLICY IF EXISTS "admin_farms_all" ON public.farms;
CREATE POLICY "admin_farms_all" ON public.farms FOR ALL TO authenticated
USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin_farm_members_all" ON public.farm_members;
CREATE POLICY "admin_farm_members_all" ON public.farm_members FOR ALL TO authenticated
USING (public.is_admin()) WITH CHECK (public.is_admin());

-- COWS & LIVESTOCK (Admin Read & Manage)
DROP POLICY IF EXISTS "admin_cows_all" ON public.cows;
CREATE POLICY "admin_cows_all" ON public.cows FOR ALL TO authenticated
USING (public.is_admin()) WITH CHECK (public.is_admin());

-- CLINICAL CASES (Admin Read & Manage)
DROP POLICY IF EXISTS "admin_cases_all" ON public.mastitis_cases;
CREATE POLICY "admin_cases_all" ON public.mastitis_cases FOR ALL TO authenticated
USING (public.is_admin()) WITH CHECK (public.is_admin());

-- UDDER IMAGES & SCREENING (Admin Read & Audit)
DROP POLICY IF EXISTS "admin_images_all" ON public.udder_images;
CREATE POLICY "admin_images_all" ON public.udder_images FOR ALL TO authenticated
USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin_screening_all" ON public.screening_results;
CREATE POLICY "admin_screening_all" ON public.screening_results FOR ALL TO authenticated
USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ============================================================================
-- HOW TO SECURELY PROVISION THE FIRST ADMINISTRATOR:
-- 1. Create a user via standard auth (or have the user register their email).
-- 2. From your secure Supabase SQL Editor or Service-Role CLI, run:
--
--    UPDATE public.profiles
--    SET role = 'admin'
--    WHERE id = (SELECT id FROM auth.users WHERE email = 'your-admin@example.com');
--
-- This cannot be performed by public users or via frontend client calls.
-- ============================================================================
