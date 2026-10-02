// Supabase client. If the env vars are missing, `supabase` is null and
// store.js runs the localStorage demo instead. The anon key is safe to
// ship in the frontend — row-level security guards every table.
import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isCloud = Boolean(url && anonKey);
export const supabase = isCloud ? createClient(url, anonKey) : null;
