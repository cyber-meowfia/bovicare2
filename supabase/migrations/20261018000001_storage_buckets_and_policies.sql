-- ============================================================================
-- MIGRATION: 20261018000001_storage_buckets_and_policies.sql
-- DESCRIPTION: Private Storage Buckets & Hardened RLS Policies (1MB Free Tier Cap)
-- FOR: BoviCare Private Storage ('bovicare-private-images' & 'udder-images')
-- TARGET: Supabase Free Tier (Run in Supabase Dashboard SQL Editor)
-- NOTE: Safe & idempotent. Supports dual-bucket configuration with WebP/JPEG/PNG.
-- ============================================================================

-- 1. CONFIGURE BOTH PRIVATE BUCKETS (Strict 1MB size cap, JPEG/PNG/WebP only)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
    ('bovicare-private-images', 'bovicare-private-images', FALSE, 1048576, ARRAY['image/jpeg', 'image/png', 'image/webp']),
    ('udder-images', 'udder-images', FALSE, 1048576, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET 
    public = FALSE,
    file_size_limit = 1048576,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp'];

-- 2. INSERT: Farmer Uploads with Farm, Cow, and Case Ownership Validation
DROP POLICY IF EXISTS "farmer_storage_upload_policy" ON storage.objects;
CREATE POLICY "farmer_storage_upload_policy"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
    bucket_id IN ('bovicare-private-images', 'udder-images')
    AND array_length(storage.foldername(name), 1) = 3
    AND (storage.foldername(name))[1] ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
    AND (storage.foldername(name))[2] ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
    AND (storage.foldername(name))[3] ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
    AND public.is_farm_member(((storage.foldername(name))[1])::uuid)
    AND EXISTS (
        SELECT 1 FROM public.cows
        WHERE id = ((storage.foldername(name))[2])::uuid
          AND farm_id = ((storage.foldername(name))[1])::uuid
    )
    AND EXISTS (
        SELECT 1 FROM public.mastitis_cases
        WHERE id = ((storage.foldername(name))[3])::uuid
          AND farm_id = ((storage.foldername(name))[1])::uuid
          AND cow_id = ((storage.foldername(name))[2])::uuid
    )
);

-- 3. SELECT: Read via Signed URLs (Only Farm Members or Authorized Vets)
DROP POLICY IF EXISTS "authorized_storage_read_policy" ON storage.objects;
CREATE POLICY "authorized_storage_read_policy"
ON storage.objects FOR SELECT TO authenticated
USING (
    bucket_id IN ('bovicare-private-images', 'udder-images')
    AND array_length(storage.foldername(name), 1) = 3
    AND (storage.foldername(name))[1] ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
    AND (
        public.is_farm_member(((storage.foldername(name))[1])::uuid)
        OR (
            public.is_vet()
            AND (storage.foldername(name))[3] ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
            AND EXISTS (
                SELECT 1 FROM public.mastitis_cases
                WHERE id = ((storage.foldername(name))[3])::uuid
                  AND (assigned_vet_id = auth.uid() OR status = 'open')
            )
        )
    )
);

-- 4. UPDATE: Immutability (Overwriting Existing Diagnostic Images Disallowed)
DROP POLICY IF EXISTS "disallow_storage_overwrite_policy" ON storage.objects;
CREATE POLICY "disallow_storage_overwrite_policy"
ON storage.objects FOR UPDATE TO authenticated
USING (false) WITH CHECK (false);

-- 5. DELETE: Farm Owners / Managers Only
DROP POLICY IF EXISTS "farmer_storage_delete_policy" ON storage.objects;
CREATE POLICY "farmer_storage_delete_policy"
ON storage.objects FOR DELETE TO authenticated
USING (
    bucket_id IN ('bovicare-private-images', 'udder-images')
    AND array_length(storage.foldername(name), 1) = 3
    AND (storage.foldername(name))[1] ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
    AND EXISTS (
        SELECT 1 FROM public.farm_members
        WHERE farm_id = ((storage.foldername(name))[1])::uuid
          AND user_id = auth.uid()
          AND member_role IN ('owner', 'manager')
    )
);
