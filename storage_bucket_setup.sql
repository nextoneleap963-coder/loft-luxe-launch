-- Create the storage bucket for lookbook photos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'lookbook',
  'lookbook',
  true, -- Make bucket public so images can be accessed
  5242880, -- 5MB file size limit (in bytes)
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Policy: Allow anyone to read (view) images
CREATE POLICY "Allow public read access"
ON storage.objects
FOR SELECT
USING (bucket_id = 'lookbook');

-- Policy: Allow authenticated users to upload images
CREATE POLICY "Allow authenticated users to upload"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'lookbook' 
  AND auth.role() = 'authenticated'
);

-- Policy: Allow authenticated users to update their own uploads
CREATE POLICY "Allow authenticated users to update"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'lookbook' 
  AND auth.role() = 'authenticated'
)
WITH CHECK (
  bucket_id = 'lookbook' 
  AND auth.role() = 'authenticated'
);

-- Policy: Allow authenticated users to delete images
CREATE POLICY "Allow authenticated users to delete"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'lookbook' 
  AND auth.role() = 'authenticated'
);

-- Optional: If you want to restrict to admin users only, use these policies instead:
-- (Comment out the above policies and uncomment these)

-- CREATE POLICY "Allow admin users to upload"
-- ON storage.objects
-- FOR INSERT
-- WITH CHECK (
--   bucket_id = 'lookbook' 
--   AND EXISTS (
--     SELECT 1 FROM public.user_roles
--     WHERE user_roles.user_id = auth.uid()
--     AND user_roles.role = 'admin'
--   )
-- );

-- CREATE POLICY "Allow admin users to update"
-- ON storage.objects
-- FOR UPDATE
-- USING (
--   bucket_id = 'lookbook' 
--   AND EXISTS (
--     SELECT 1 FROM public.user_roles
--     WHERE user_roles.user_id = auth.uid()
--     AND user_roles.role = 'admin'
--   )
-- )
-- WITH CHECK (
--   bucket_id = 'lookbook' 
--   AND EXISTS (
--     SELECT 1 FROM public.user_roles
--     WHERE user_roles.user_id = auth.uid()
--     AND user_roles.role = 'admin'
--   )
-- );

-- CREATE POLICY "Allow admin users to delete"
-- ON storage.objects
-- FOR DELETE
-- USING (
--   bucket_id = 'lookbook' 
--   AND EXISTS (
--     SELECT 1 FROM public.user_roles
--     WHERE user_roles.user_id = auth.uid()
--     AND user_roles.role = 'admin'
--   )
-- );
