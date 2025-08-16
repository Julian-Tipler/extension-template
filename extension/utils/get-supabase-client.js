import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fdorughcnbbgdletmlut.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkb3J1Z2hjbmJiZ2RsZXRtbHV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5MzIyNDIsImV4cCI6MjA3MDUwODI0Mn0.6JYSqzWlkOPWmO1PAt8p12Gie-X5vuNXz2cK5Ta_5Ng";

export async function getSupabaseClient() {
  const result = await chrome.storage.local.get("yourMomSessionToken");
  const sessionToken = result.yourMomSessionToken;
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: sessionToken ? `Bearer ${sessionToken}` : "",
      },
    },
  });
  return supabase;
}
