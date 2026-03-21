/*
  # Allow Public Video Uploads

  1. Changes
    - Update INSERT policy to allow anonymous users to upload videos
    - Update UPDATE policy to allow anonymous users to update videos
    - Update DELETE policy to allow anonymous users to delete videos
    - Update storage policies to allow anonymous users to upload/delete files

  2. Security Note
    - This allows anyone to upload, update, and delete videos
    - Suitable for personal portfolio sites with low traffic
*/

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can upload videos" ON videos;
DROP POLICY IF EXISTS "Authenticated users can update videos" ON videos;
DROP POLICY IF EXISTS "Authenticated users can delete videos" ON videos;

-- Create new public policies for videos table
CREATE POLICY "Anyone can upload videos"
  ON videos FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update videos"
  ON videos FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete videos"
  ON videos FOR DELETE
  TO public
  USING (true);

-- Drop existing restrictive storage policies
DROP POLICY IF EXISTS "Authenticated users can upload videos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete videos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload thumbnails" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete thumbnails" ON storage.objects;

-- Create new public storage policies
CREATE POLICY "Anyone can upload videos"
  ON storage.objects FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'videos');

CREATE POLICY "Anyone can delete videos"
  ON storage.objects FOR DELETE
  TO public
  USING (bucket_id = 'videos');

CREATE POLICY "Anyone can upload thumbnails"
  ON storage.objects FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'thumbnails');

CREATE POLICY "Anyone can delete thumbnails"
  ON storage.objects FOR DELETE
  TO public
  USING (bucket_id = 'thumbnails');