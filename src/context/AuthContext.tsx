import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { getSupabase, isSupabaseConfigured } from "../lib/supabase";

type AuthContextValue = {
	session: Session | null;
	loading: boolean;
	signIn: (email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/** Admin sign-in state (Supabase Auth). Only mounted for /admin routes. */
export function AuthProvider({ children }: { children: ReactNode }) {
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(isSupabaseConfigured);

	useEffect(() => {
		if (!isSupabaseConfigured) return;
		let unsubscribe: (() => void) | undefined;
		let cancelled = false;
		getSupabase().then((supabase) => {
			if (cancelled) return;
			supabase.auth.getSession().then(({ data }) => {
				setSession(data.session);
				setLoading(false);
			});
			const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
			unsubscribe = () => sub.subscription.unsubscribe();
		});
		return () => {
			cancelled = true;
			unsubscribe?.();
		};
	}, []);

	const signIn = async (email: string, password: string) => {
		const supabase = await getSupabase();
		const { error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) throw error;
	};

	const signOut = async () => {
		const supabase = await getSupabase();
		await supabase.auth.signOut();
	};

	return <AuthContext.Provider value={{ session, loading, signIn, signOut }}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
	return ctx;
}
