import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Video {
  id: string;
  title: string;
  description: string;
  file_path: string;
  thumbnail_path: string | null;
  duration: number | null;
  file_size: number;
  mime_type: string;
  created_at: string;
  updated_at: string;
}
