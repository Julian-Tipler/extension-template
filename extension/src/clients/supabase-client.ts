import { createClient } from "@supabase/supabase-js";

// Try both import.meta.env (Vite standard) and process.env (our fallback)
const supabaseUrl: string =
  import.meta.env.VITE_PUBLIC_SUPABASE_URL ||
  process.env.VITE_PUBLIC_SUPABASE_URL ||
  "";

const supabaseAnonKey: string =
  import.meta.env.VITE_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY ||
  process.env.VITE_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY ||
  "";
  console.log("Supabase URL:", supabaseUrl);
  console.log("Supabase Anon Key:", supabaseAnonKey);
if (!supabaseUrl) {
  console.error("Supabase URL is missing! Check your environment variables.");
}

if (!supabaseAnonKey) {
  console.error(
    "Supabase Anon Key is missing! Check your environment variables."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
