import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type SubmittedProfile = {
  id?: string;
  type: "tech" | "business";
  first_name: string;
  last_name: string;
  email: string;
  location: string;
  bio: string;
  skills: string[];
  linkedin?: string;
  website?: string;
  agency_name?: string;
  agency_description?: string;
  agency_stage?: string;
  looking_for?: string;
  status: "pending" | "approved" | "rejected";
  created_at?: string;
};
