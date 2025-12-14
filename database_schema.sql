-- Create lookbook_photos table
CREATE TABLE IF NOT EXISTS public.lookbook_photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index on category for faster filtering
CREATE INDEX IF NOT EXISTS idx_lookbook_photos_category ON public.lookbook_photos(category);

-- Create index on created_at for faster sorting
CREATE INDEX IF NOT EXISTS idx_lookbook_photos_created_at ON public.lookbook_photos(created_at DESC);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at on row update
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.lookbook_photos
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Enable Row Level Security
ALTER TABLE public.lookbook_photos ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to read (SELECT) photos
CREATE POLICY "Allow public read access"
  ON public.lookbook_photos
  FOR SELECT
  USING (true);

-- Policy: Allow authenticated users to insert photos
-- You can restrict this further by checking for admin role if needed
CREATE POLICY "Allow authenticated users to insert"
  ON public.lookbook_photos
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Policy: Allow authenticated users to update photos
CREATE POLICY "Allow authenticated users to update"
  ON public.lookbook_photos
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Policy: Allow authenticated users to delete photos
CREATE POLICY "Allow authenticated users to delete"
  ON public.lookbook_photos
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Optional: If you want to restrict to admin users only, use this instead:
-- Replace the INSERT, UPDATE, DELETE policies above with:

-- CREATE POLICY "Allow admin users to insert"
--   ON public.lookbook_photos
--   FOR INSERT
--   WITH CHECK (
--     EXISTS (
--       SELECT 1 FROM public.user_roles
--       WHERE user_roles.user_id = auth.uid()
--       AND user_roles.role = 'admin'
--     )
--   );

-- CREATE POLICY "Allow admin users to update"
--   ON public.lookbook_photos
--   FOR UPDATE
--   USING (
--     EXISTS (
--       SELECT 1 FROM public.user_roles
--       WHERE user_roles.user_id = auth.uid()
--       AND user_roles.role = 'admin'
--     )
--   )
--   WITH CHECK (
--     EXISTS (
--       SELECT 1 FROM public.user_roles
--       WHERE user_roles.user_id = auth.uid()
--       AND user_roles.role = 'admin'
--     )
--   );

-- CREATE POLICY "Allow admin users to delete"
--   ON public.lookbook_photos
--   FOR DELETE
--   USING (
--     EXISTS (
--       SELECT 1 FROM public.user_roles
--       WHERE user_roles.user_id = auth.uid()
--       AND user_roles.role = 'admin'
--     )
--   );
