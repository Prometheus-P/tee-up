-- Migration 017: Create storage buckets for media uploads
-- TEE:UP - Storage configuration for lesson media, profile images, portfolio images

-- ============================================
-- Step 1: Create storage buckets
-- ============================================

-- Lesson media bucket (private - pro only access)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'lesson-media',
  'lesson-media',
  false,
  104857600, -- 100MB limit for videos
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/quicktime', 'video/webm']
)
ON CONFLICT (id) DO UPDATE SET
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Profile images bucket (public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'profile-images',
  'profile-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Portfolio images bucket (public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio-images',
  'portfolio-images',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- ============================================
-- Step 2: RLS Policies for lesson-media bucket
-- ============================================

-- Drop existing policies if any
DROP POLICY IF EXISTS "Pros can upload to lesson-media" ON storage.objects;
DROP POLICY IF EXISTS "Pros can view own lesson-media" ON storage.objects;
DROP POLICY IF EXISTS "Pros can delete own lesson-media" ON storage.objects;
DROP POLICY IF EXISTS "Students can view shared lesson-media" ON storage.objects;

-- Pros can upload to their own folder
CREATE POLICY "Pros can upload to lesson-media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'lesson-media'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Pros can view their own media
CREATE POLICY "Pros can view own lesson-media"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'lesson-media'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Pros can update their own media
CREATE POLICY "Pros can update own lesson-media"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'lesson-media'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Pros can delete their own media
CREATE POLICY "Pros can delete own lesson-media"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'lesson-media'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Students can view media from their lesson logs
CREATE POLICY "Students can view shared lesson-media"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'lesson-media'
  AND EXISTS (
    SELECT 1 FROM public.lesson_media lm
    JOIN public.lesson_logs ll ON ll.id = lm.lesson_log_id
    WHERE lm.storage_path = name
    AND ll.student_id = auth.uid()
  )
);

-- ============================================
-- Step 3: RLS Policies for profile-images bucket (public read)
-- ============================================

DROP POLICY IF EXISTS "Anyone can view profile-images" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload own profile-images" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own profile-images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own profile-images" ON storage.objects;

-- Anyone can view profile images
CREATE POLICY "Anyone can view profile-images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'profile-images');

-- Users can upload to their own folder
CREATE POLICY "Users can upload own profile-images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-images'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can update their own images
CREATE POLICY "Users can update own profile-images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'profile-images'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can delete their own images
CREATE POLICY "Users can delete own profile-images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'profile-images'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- ============================================
-- Step 4: RLS Policies for portfolio-images bucket (public read)
-- ============================================

DROP POLICY IF EXISTS "Anyone can view portfolio-images" ON storage.objects;
DROP POLICY IF EXISTS "Pros can upload portfolio-images" ON storage.objects;
DROP POLICY IF EXISTS "Pros can update own portfolio-images" ON storage.objects;
DROP POLICY IF EXISTS "Pros can delete own portfolio-images" ON storage.objects;

-- Anyone can view portfolio images
CREATE POLICY "Anyone can view portfolio-images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'portfolio-images');

-- Pros can upload to their own folder
CREATE POLICY "Pros can upload portfolio-images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'portfolio-images'
  AND (storage.foldername(name))[1] = auth.uid()::text
  AND EXISTS (
    SELECT 1 FROM public.pro_profiles
    WHERE user_id = auth.uid()
  )
);

-- Pros can update their own images
CREATE POLICY "Pros can update own portfolio-images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'portfolio-images'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Pros can delete their own images
CREATE POLICY "Pros can delete own portfolio-images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'portfolio-images'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Migration completed successfully
