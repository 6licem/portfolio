/*
  # Video Storage Setup

  1. New Tables
    - `videos`
      - `id` (uuid, primary key)
      - `title` (text) - Video title
      - `description` (text) - Video description
      - `file_path` (text) - Path to video file in storage
      - `thumbnail_path` (text, nullable) - Path to thumbnail image
      - `duration` (integer, nullable) - Video duration in seconds
      - `file_size` (bigint) - File size in bytes
      - `mime_type` (text) - Video MIME type
      - `created_at` (timestamptz) - Upload timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Storage
    - Create `videos` bucket for video files
    - Create `thumbnails` bucket for video thumbnails

  3. Security
    - Enable RLS on `videos` table
    - Add policies for public read access to videos
    - Add policies for authenticated admin uploads
    - Configure storage policies for public access to videos
*/

-- Create videos table
CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  file_path text NOT NULL UNIQUE,
  thumbnail_path text,
  duration integer,
  file_size bigint NOT NULL,
  mime_type text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view videos
CREATE POLICY "Anyone can view videos"
  ON videos FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert videos (you can restrict this further)
CREATE POLICY "Authenticated users can upload videos"
  ON videos FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update videos
CREATE POLICY "Authenticated users can update videos"
  ON videos FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete videos
CREATE POLICY "Authenticated users can delete videos"
  ON videos FOR DELETE
  TO authenticated
  USING (true);

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES ('videos', 'videos', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('thumbnails', 'thumbnails', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for videos bucket
CREATE POLICY "Anyone can view videos"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'videos');

CREATE POLICY "Authenticated users can upload videos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'videos');

CREATE POLICY "Authenticated users can delete videos"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'videos');

-- Storage policies for thumbnails bucket
CREATE POLICY "Anyone can view thumbnails"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'thumbnails');

CREATE POLICY "Authenticated users can upload thumbnails"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'thumbnails');

CREATE POLICY "Authenticated users can delete thumbnails"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'thumbnails');