-- ============================================================================
-- MIGRATION: 20261018000000_core_bovicare_schema.sql
-- DESCRIPTION: Complete Core Schema, Tables, Indexes, RLS Policies & Onboarding
-- FOR: BoviCare (Bovine Mastitis Detection & Veterinary Assistance System)
-- TARGET: Supabase Free Tier (PostgreSQL 15+)
-- NOTE: Idempotent and safe. Creates all necessary database structures and RLS.
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ----------------------------------------------------------------------------
-- 1. ENUMS
-- ----------------------------------------------------------------------------
DO $$ BEGIN
    CREATE TYPE public.user_role AS ENUM ('farmer', 'veterinarian', 'admin');
    CREATE TYPE public.cow_health_status AS ENUM ('healthy', 'to_monitor', 'under_treatment', 'quarantined', 'culled');
    CREATE TYPE public.case_status AS ENUM ('open', 'under_review', 'treatment_prescribed', 'monitoring', 'resolved', 'escalated');
    CREATE TYPE public.case_urgency AS ENUM ('routine', 'monitor', 'urgent', 'critical');
    CREATE TYPE public.udder_quarter AS ENUM ('LF', 'RF', 'LR', 'RR', 'ALL');
    CREATE TYPE public.screening_status AS ENUM ('staged', 'queued', 'processing', 'completed', 'failed');
    CREATE TYPE public.diagnosis_type AS ENUM ('clinical_mastitis', 'subclinical_mastitis', 'trauma_injury', 'healthy_non_mastitis');
    CREATE TYPE public.treatment_route AS ENUM ('intramammary', 'intramuscular', 'subcutaneous', 'oral', 'topical');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ----------------------------------------------------------------------------
-- 2. USER PROFILES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role public.user_role NOT NULL DEFAULT 'farmer',
    full_name TEXT NOT NULL,
    phone_number TEXT,
    vet_license_number TEXT,
    vet_clinic_affiliation TEXT,
    avatar_url TEXT,
    is_verified_vet BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 3. FARMS & FARM MEMBERSHIP
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.farms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    registration_code TEXT UNIQUE,
    location_address TEXT,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.farm_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    member_role TEXT NOT NULL DEFAULT 'owner' CHECK (member_role IN ('owner', 'manager', 'worker')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (farm_id, user_id)
);

-- ----------------------------------------------------------------------------
-- 4. LIVESTOCK (COWS) & GENERAL HEALTH RECORDS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.cows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
    tag_number TEXT NOT NULL,
    name TEXT NOT NULL,
    breed TEXT NOT NULL,
    lactation_stage TEXT NOT NULL DEFAULT '2nd Lactation',
    daily_yield_liters NUMERIC(4,1) DEFAULT 18.0 CHECK (daily_yield_liters >= 0),
    status public.cow_health_status NOT NULL DEFAULT 'healthy',
    photo_storage_path TEXT,
    date_of_birth DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (farm_id, tag_number)
);

CREATE TABLE IF NOT EXISTS public.health_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cow_id UUID NOT NULL REFERENCES public.cows(id) ON DELETE CASCADE,
    farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
    recorded_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    record_type TEXT NOT NULL,
    details TEXT NOT NULL,
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 5. MASTITIS CASES & UDDER IMAGES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.mastitis_cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cow_id UUID NOT NULL REFERENCES public.cows(id) ON DELETE CASCADE,
    farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
    reported_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    assigned_vet_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    status public.case_status NOT NULL DEFAULT 'open',
    urgency public.case_urgency NOT NULL DEFAULT 'monitor',
    affected_quarters public.udder_quarter[] NOT NULL DEFAULT '{}',
    symptoms_observed TEXT[] NOT NULL DEFAULT '{}',
    farmer_notes TEXT,
    opened_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    resolved_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.udder_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES public.mastitis_cases(id) ON DELETE CASCADE,
    cow_id UUID NOT NULL REFERENCES public.cows(id) ON DELETE CASCADE,
    farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
    uploaded_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    storage_path TEXT NOT NULL, -- Path format: "{farm_id}/{cow_id}/{case_id}/{filename}"
    file_size_bytes INT CHECK (file_size_bytes <= 1048576), -- Strict 1MB Free-tier limit
    mime_type TEXT NOT NULL CHECK (mime_type IN ('image/jpeg', 'image/png', 'image/webp')),
    quarter public.udder_quarter NOT NULL DEFAULT 'ALL',
    image_category TEXT NOT NULL DEFAULT 'udder_exterior' CHECK (image_category IN ('udder_exterior', 'fore_milk_strip_cup')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 6. AI SCREENING RESULTS (STAGED & ISOLATED)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.screening_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_id UUID NOT NULL REFERENCES public.udder_images(id) ON DELETE CASCADE,
    case_id UUID NOT NULL REFERENCES public.mastitis_cases(id) ON DELETE CASCADE,
    model_version TEXT NOT NULL DEFAULT 'staged_v0',
    status public.screening_status NOT NULL DEFAULT 'staged',
    is_mastitis_detected BOOLEAN,
    confidence_score NUMERIC(5,4) CHECK (confidence_score BETWEEN 0.0 AND 1.0),
    predicted_features JSONB DEFAULT '{}'::jsonb,
    is_active_model BOOLEAN NOT NULL DEFAULT FALSE,
    screened_at TIMESTAMPTZ
);

-- ----------------------------------------------------------------------------
-- 7. CLINICAL VETERINARY DIAGNOSES, CONSULTATIONS & TREATMENT PLANS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.diagnoses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID NOT NULL REFERENCES public.mastitis_cases(id) ON DELETE CASCADE,
    vet_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    diagnosis public.diagnosis_type NOT NULL,
    cmt_score TEXT,
    clinical_notes TEXT NOT NULL,
    confirmed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.consultations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID NOT NULL REFERENCES public.mastitis_cases(id) ON DELETE CASCADE,
    vet_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    consultation_channel TEXT NOT NULL DEFAULT 'remote_telehealth' CHECK (consultation_channel IN ('remote_telehealth', 'farm_visit', 'chat')),
    summary TEXT NOT NULL,
    conducted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.treatment_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID NOT NULL REFERENCES public.mastitis_cases(id) ON DELETE CASCADE,
    diagnosis_id UUID REFERENCES public.diagnoses(id) ON DELETE SET NULL,
    prescribed_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    medication_protocol TEXT NOT NULL,
    route public.treatment_route NOT NULL DEFAULT 'intramammary',
    dosage_instructions TEXT NOT NULL,
    milk_withdrawal_hours INT NOT NULL DEFAULT 72 CHECK (milk_withdrawal_hours >= 0),
    meat_withdrawal_days INT NOT NULL DEFAULT 14 CHECK (meat_withdrawal_days >= 0),
    treatment_start DATE NOT NULL DEFAULT CURRENT_DATE,
    treatment_end DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.follow_ups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID NOT NULL REFERENCES public.mastitis_cases(id) ON DELETE CASCADE,
    scheduled_date DATE NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    outcome_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 8. INDEXES (Lean Foreign Key Optimization for Free Tier)
-- ----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_cows_farm ON public.cows(farm_id);
CREATE INDEX IF NOT EXISTS idx_farm_members_user ON public.farm_members(user_id);
CREATE INDEX IF NOT EXISTS idx_cases_farm_cow ON public.mastitis_cases(farm_id, cow_id);
CREATE INDEX IF NOT EXISTS idx_cases_assigned_vet ON public.mastitis_cases(assigned_vet_id) WHERE assigned_vet_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_cases_status_open ON public.mastitis_cases(status) WHERE status = 'open';
CREATE INDEX IF NOT EXISTS idx_images_case ON public.udder_images(case_id);
CREATE INDEX IF NOT EXISTS idx_treatment_case ON public.treatment_plans(case_id);

-- ----------------------------------------------------------------------------
-- 9. USER SIGNUP TRIGGER & ANTI-SELF-PROMOTION CONTROLS
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.prevent_role_self_escalation()
RETURNS TRIGGER AS $$
BEGIN
    IF (OLD.role IS DISTINCT FROM NEW.role OR OLD.is_verified_vet IS DISTINCT FROM NEW.is_verified_vet) THEN
        IF (auth.jwt() ->> 'role' != 'service_role') AND NOT EXISTS (
            SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
        ) THEN
            RAISE EXCEPTION 'Forbidden: Role modifications require administrative credentials.';
        END IF;
    END IF;
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_prevent_role_self_escalation ON public.profiles;
CREATE TRIGGER trg_prevent_role_self_escalation
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.prevent_role_self_escalation();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, role, vet_license_number, is_verified_vet)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'Farm Operator'),
        CASE 
            WHEN NEW.raw_user_meta_data->>'role' = 'veterinarian' THEN 'veterinarian'::public.user_role
            ELSE 'farmer'::public.user_role
        END,
        NEW.raw_user_meta_data->>'vet_license_number',
        FALSE
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ----------------------------------------------------------------------------
-- 10. LEAST-PRIVILEGE API GRANTS
-- ----------------------------------------------------------------------------
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;

-- ----------------------------------------------------------------------------
-- 11. SECURITY DEFINER HELPER FUNCTIONS FOR RLS
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_farm_member(check_farm_id UUID)
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.farm_members
    WHERE farm_id = check_farm_id AND user_id = auth.uid()
  );
$$;

CREATE OR REPLACE FUNCTION public.is_vet()
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'veterinarian'
  );
$$;

-- ----------------------------------------------------------------------------
-- 12. ROW LEVEL SECURITY (RLS) ACTIVATION
-- ----------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farm_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mastitis_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.udder_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.screening_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnoses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treatment_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follow_ups ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- 13. HARDENED RLS POLICIES
-- ----------------------------------------------------------------------------

-- PROFILES
DROP POLICY IF EXISTS "profiles_read" ON public.profiles;
CREATE POLICY "profiles_read" ON public.profiles FOR SELECT TO authenticated
USING (id = auth.uid() OR public.is_vet());

DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT TO authenticated
WITH CHECK (id = auth.uid());

DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE TO authenticated
USING (id = auth.uid()) WITH CHECK (id = auth.uid());

-- FARMS
DROP POLICY IF EXISTS "farms_select" ON public.farms;
DROP POLICY IF EXISTS "farms_farmer_access" ON public.farms;
CREATE POLICY "farms_select" ON public.farms FOR SELECT TO authenticated
USING (public.is_farm_member(id) OR created_by = auth.uid() OR public.is_vet());

DROP POLICY IF EXISTS "farms_insert" ON public.farms;
DROP POLICY IF EXISTS "farms_farmer_insert" ON public.farms;
CREATE POLICY "farms_insert" ON public.farms FOR INSERT TO authenticated
WITH CHECK (created_by = auth.uid());

-- FARM MEMBERS
DROP POLICY IF EXISTS "farm_members_select" ON public.farm_members;
DROP POLICY IF EXISTS "farm_members_access" ON public.farm_members;
CREATE POLICY "farm_members_select" ON public.farm_members FOR SELECT TO authenticated
USING (user_id = auth.uid() OR public.is_farm_member(farm_id) OR public.is_vet());

DROP POLICY IF EXISTS "farm_members_insert" ON public.farm_members;
CREATE POLICY "farm_members_insert" ON public.farm_members FOR INSERT TO authenticated
WITH CHECK (
    user_id = auth.uid()
    AND (
        EXISTS (SELECT 1 FROM public.farms WHERE id = farm_id AND created_by = auth.uid())
        OR public.is_farm_member(farm_id)
    )
);

-- COWS
DROP POLICY IF EXISTS "cows_farmer_all" ON public.cows;
CREATE POLICY "cows_farmer_all" ON public.cows FOR ALL TO authenticated
USING (public.is_farm_member(farm_id)) WITH CHECK (public.is_farm_member(farm_id));

DROP POLICY IF EXISTS "cows_vet_select" ON public.cows;
DROP POLICY IF EXISTS "cows_vet_read" ON public.cows;
CREATE POLICY "cows_vet_select" ON public.cows FOR SELECT TO authenticated
USING (public.is_vet());

DROP POLICY IF EXISTS "cows_vet_update" ON public.cows;
CREATE POLICY "cows_vet_update" ON public.cows FOR UPDATE TO authenticated
USING (public.is_vet()) WITH CHECK (public.is_vet());

-- HEALTH RECORDS
DROP POLICY IF EXISTS "health_records_farmer_all" ON public.health_records;
CREATE POLICY "health_records_farmer_all" ON public.health_records FOR ALL TO authenticated
USING (public.is_farm_member(farm_id)) WITH CHECK (public.is_farm_member(farm_id));

DROP POLICY IF EXISTS "health_records_vet_select" ON public.health_records;
DROP POLICY IF EXISTS "health_records_vet_read" ON public.health_records;
CREATE POLICY "health_records_vet_select" ON public.health_records FOR SELECT TO authenticated
USING (public.is_vet());

-- MASTITIS CASES
DROP POLICY IF EXISTS "cases_farmer_select" ON public.mastitis_cases;
CREATE POLICY "cases_farmer_select" ON public.mastitis_cases FOR SELECT TO authenticated
USING (public.is_farm_member(farm_id));

DROP POLICY IF EXISTS "cases_farmer_insert" ON public.mastitis_cases;
CREATE POLICY "cases_farmer_insert" ON public.mastitis_cases FOR INSERT TO authenticated
WITH CHECK (public.is_farm_member(farm_id) AND reported_by = auth.uid());

DROP POLICY IF EXISTS "cases_vet_select" ON public.mastitis_cases;
CREATE POLICY "cases_vet_select" ON public.mastitis_cases FOR SELECT TO authenticated
USING (public.is_vet());

DROP POLICY IF EXISTS "cases_vet_update" ON public.mastitis_cases;
CREATE POLICY "cases_vet_update" ON public.mastitis_cases FOR UPDATE TO authenticated
USING (public.is_vet()) WITH CHECK (public.is_vet());

-- UDDER IMAGES
DROP POLICY IF EXISTS "images_farmer_all" ON public.udder_images;
CREATE POLICY "images_farmer_all" ON public.udder_images FOR ALL TO authenticated
USING (public.is_farm_member(farm_id)) WITH CHECK (public.is_farm_member(farm_id) AND uploaded_by = auth.uid());

DROP POLICY IF EXISTS "images_vet_select" ON public.udder_images;
DROP POLICY IF EXISTS "images_vet_read" ON public.udder_images;
CREATE POLICY "images_vet_select" ON public.udder_images FOR SELECT TO authenticated
USING (public.is_vet());

-- SCREENING RESULTS
DROP POLICY IF EXISTS "screening_read" ON public.screening_results;
CREATE POLICY "screening_read" ON public.screening_results FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.mastitis_cases WHERE id = screening_results.case_id AND (public.is_farm_member(farm_id) OR public.is_vet())));

-- DIAGNOSES
DROP POLICY IF EXISTS "diagnoses_vet_insert" ON public.diagnoses;
CREATE POLICY "diagnoses_vet_insert" ON public.diagnoses FOR INSERT TO authenticated
WITH CHECK (public.is_vet() AND vet_id = auth.uid());

DROP POLICY IF EXISTS "diagnoses_read" ON public.diagnoses;
DROP POLICY IF EXISTS "diagnoses_farmer_read" ON public.diagnoses;
CREATE POLICY "diagnoses_read" ON public.diagnoses FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.mastitis_cases WHERE id = diagnoses.case_id AND (public.is_farm_member(farm_id) OR public.is_vet())));

-- CONSULTATIONS
DROP POLICY IF EXISTS "consultations_insert" ON public.consultations;
CREATE POLICY "consultations_insert" ON public.consultations FOR INSERT TO authenticated
WITH CHECK (public.is_vet() AND vet_id = auth.uid());

DROP POLICY IF EXISTS "consultations_read" ON public.consultations;
CREATE POLICY "consultations_read" ON public.consultations FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.mastitis_cases WHERE id = consultations.case_id AND (public.is_farm_member(farm_id) OR public.is_vet())));

-- TREATMENT PLANS
DROP POLICY IF EXISTS "treatment_vet_all" ON public.treatment_plans;
CREATE POLICY "treatment_vet_all" ON public.treatment_plans FOR ALL TO authenticated
USING (public.is_vet() AND prescribed_by = auth.uid()) WITH CHECK (public.is_vet() AND prescribed_by = auth.uid());

DROP POLICY IF EXISTS "treatment_vet_select" ON public.treatment_plans;
CREATE POLICY "treatment_vet_select" ON public.treatment_plans FOR SELECT TO authenticated
USING (public.is_vet());

DROP POLICY IF EXISTS "treatment_farmer_read" ON public.treatment_plans;
CREATE POLICY "treatment_farmer_read" ON public.treatment_plans FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.mastitis_cases WHERE id = treatment_plans.case_id AND public.is_farm_member(farm_id)));

-- FOLLOW UPS
DROP POLICY IF EXISTS "follow_ups_rw" ON public.follow_ups;
CREATE POLICY "follow_ups_rw" ON public.follow_ups FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.mastitis_cases WHERE id = follow_ups.case_id AND (public.is_farm_member(farm_id) OR public.is_vet())))
WITH CHECK (EXISTS (SELECT 1 FROM public.mastitis_cases WHERE id = follow_ups.case_id AND (public.is_farm_member(farm_id) OR public.is_vet())));

-- ----------------------------------------------------------------------------
-- 14. AUTOMATED STARTER HERD SEEDING TRIGGER
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.seed_initial_farm_herd(target_farm_id UUID)
RETURNS VOID AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.cows WHERE farm_id = target_farm_id) THEN
        INSERT INTO public.cows (farm_id, tag_number, name, breed, lactation_stage, daily_yield_liters, status)
        VALUES
            (target_farm_id, '#C001', 'Gauri', 'Holstein Friesian', '2nd Lactation (45 DIM)', 22.5, 'healthy'),
            (target_farm_id, '#C002', 'Laxmi', 'Gir Cross', '3rd Lactation (90 DIM)', 16.0, 'to_monitor'),
            (target_farm_id, '#C003', 'Rani', 'Jersey Cross', '1st Lactation (30 DIM)', 18.0, 'healthy');
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.trg_auto_seed_farm()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM public.seed_initial_farm_herd(NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_farm_created_seed ON public.farms;
CREATE TRIGGER on_farm_created_seed
    AFTER INSERT ON public.farms
    FOR EACH ROW EXECUTE FUNCTION public.trg_auto_seed_farm();
