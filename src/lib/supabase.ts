import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * True when both Supabase env vars are present. Lets the UI show a clear
 * "not configured" message instead of crashing when .env is incomplete.
 */
export const isSupabaseConfigured = Boolean(url && anonKey);

// Fall back to harmless placeholders so importing this module never throws;
// actual calls are gated behind `isSupabaseConfigured` in the UI.
export const supabase = createClient(
	url || "https://placeholder.supabase.co",
	anonKey || "public-anon-placeholder"
);
