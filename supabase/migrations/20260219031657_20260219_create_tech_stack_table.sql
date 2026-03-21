/*
  # Create tech_stack table

  1. New Tables
    - `tech_stack`
      - `id` (uuid, primary key)
      - `name` (text) - Name of the technology (Slack, ClickFunnels, Notion, Funnelytics, HighLevel)
      - `logo_url` (text) - URL to the logo image in storage
      - `category` (text) - Category of the tool (communication, marketing, productivity, analytics)
      - `order` (integer) - Display order
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `tech_stack` table
    - Add policy for anyone to read tech stack
*/

CREATE TABLE IF NOT EXISTS tech_stack (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text NOT NULL,
  category text NOT NULL,
  "order" integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tech_stack ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read tech_stack"
  ON tech_stack
  FOR SELECT
  TO public
  USING (true);
