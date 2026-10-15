import type { SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * True when both Supabase env vars are present. Lets the UI show a clear
 * "not configured" message instead of crashing when .env is incomplete.
 */
export const isSupabaseConfigured = Boolean(url && anonKey);

let client: Promise<SupabaseClient> | undefined;

/**
 * The shared Supabase client. The SDK (~200 kB) is downloaded the first time
 * this is called, so pages that never touch the blog or admin don't pay for it.
 */
export function getSupabase(): Promise<SupabaseClient> {
	client ??= import("@supabase/supabase-js").then(({ createClient }) =>
		// Placeholders keep createClient from throwing when .env is incomplete;
		// callers check `isSupabaseConfigured` first.
		createClient(url || "https://placeholder.supabase.co", anonKey || "public-anon-placeholder"),
	);
	return client;
}
