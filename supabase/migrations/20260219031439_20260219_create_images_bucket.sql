/*
  # Create images storage bucket

  1. Storage Buckets
    - `images` - Public bucket for portfolio and profile images
  
  2. Security
    - Bucket is public for read access
    - Anonymous users can upload images
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;