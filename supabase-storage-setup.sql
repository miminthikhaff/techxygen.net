-- =====================================================
-- TechXygen Storage Setup for File Uploads
-- =====================================================
-- Run this script in your Supabase SQL Editor to set up file storage

-- =====================================================
-- 1. Create storage bucket for job applications
-- =====================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'job-applications',
  'job-applications',
  true,
  10485760, -- 10MB limit
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
);

-- =====================================================
-- 2. Create storage bucket for general uploads
-- =====================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'general-uploads',
  'general-uploads',
  true,
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'text/plain']
);

-- =====================================================
-- 3. Set up Row Level Security (RLS) for job-applications bucket
-- =====================================================

-- Policy: Anyone can upload files to job-applications bucket
CREATE POLICY "Anyone can upload job application files" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'job-applications');

-- Policy: Anyone can view job application files
CREATE POLICY "Anyone can view job application files" ON storage.objects
FOR SELECT USING (bucket_id = 'job-applications');

-- Policy: Only admins can delete job application files
CREATE POLICY "Admins can delete job application files" ON storage.objects
FOR DELETE USING (
  bucket_id = 'job-applications' AND
  EXISTS (
    SELECT 1 FROM admin_profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('super_admin', 'hr_admin')
  )
);

-- =====================================================
-- 4. Set up Row Level Security (RLS) for general-uploads bucket
-- =====================================================

-- Policy: Anyone can upload files to general-uploads bucket
CREATE POLICY "Anyone can upload general files" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'general-uploads');

-- Policy: Anyone can view general files
CREATE POLICY "Anyone can view general files" ON storage.objects
FOR SELECT USING (bucket_id = 'general-uploads');

-- Policy: Only admins can delete general files
CREATE POLICY "Admins can delete general files" ON storage.objects
FOR DELETE USING (
  bucket_id = 'general-uploads' AND
  EXISTS (
    SELECT 1 FROM admin_profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('super_admin', 'content_admin')
  )
);

-- =====================================================
-- 5. Create indexes for better performance
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_storage_objects_bucket_id ON storage.objects(bucket_id);
CREATE INDEX IF NOT EXISTS idx_storage_objects_name ON storage.objects(name);
CREATE INDEX IF NOT EXISTS idx_storage_objects_created_at ON storage.objects(created_at);

-- =====================================================
-- 6. Create function to clean up old files (optional)
-- =====================================================
CREATE OR REPLACE FUNCTION cleanup_old_files()
RETURNS void AS $$
BEGIN
  -- Delete files older than 1 year from job-applications bucket
  DELETE FROM storage.objects 
  WHERE bucket_id = 'job-applications' 
  AND created_at < NOW() - INTERVAL '1 year';
  
  -- Delete files older than 6 months from general-uploads bucket
  DELETE FROM storage.objects 
  WHERE bucket_id = 'general-uploads' 
  AND created_at < NOW() - INTERVAL '6 months';
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- Setup Complete!
-- =====================================================
-- Your Supabase storage is now ready for file uploads.
-- 
-- Buckets created:
-- - job-applications: For resume uploads (10MB limit, PDF/DOC/DOCX only)
-- - general-uploads: For general file uploads (50MB limit, various types)
--
-- Security policies are in place to ensure proper access control.
-- You can now use the file upload functionality in your application.





