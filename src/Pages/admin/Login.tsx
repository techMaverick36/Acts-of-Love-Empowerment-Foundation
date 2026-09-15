import Button from "../../components/Button";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiLock, FiArrowRight } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { isSupabaseConfigured } from "../../lib/supabase";

export default function AdminLogin() {
	const { session, signIn } = useAuth();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [busy, setBusy] = useState(false);

	// Already signed in → go straight to the dashboard.
	useEffect(() => {
		if (session) navigate("/admin", { replace: true });
	}, [session, navigate]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setBusy(true);
		try {
			await signIn(email, password);
			navigate("/admin", { replace: true });
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Unable to sign in. Please try again."
			);
		} finally {
			setBusy(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: "#f8f9fb" }}>
			<div className="w-full max-w-md">
				<Link to="/" className="flex items-center justify-center gap-3 mb-8">
					<img src="/logo.png" alt="Acts of Love" className="w-11 h-11 object-contain" />
					<div className="leading-tight text-left">
						<p className="font-serif font-bold text-lg" style={{ color: "#204487" }}>
							Acts of Love
						</p>
						<p className="text-[10px] uppercase tracking-widest" style={{ color: "#639E90" }}>
							Admin
						</p>
					</div>
				</Link>

				<div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-8">
					<div className="flex items-center gap-3 mb-6">
						<div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#f8f9fb" }}>
							<FiLock size={18} style={{ color: "#204487" }} />
						</div>
						<div>
							<h1 className="font-serif text-xl font-bold" style={{ color: "#204487" }}>
								Sign in
							</h1>
							<p className="text-xs" style={{ color: "#888" }}>
								Restricted to foundation admins
							</p>
						</div>
					</div>

					{!isSupabaseConfigured && (
						<div className="text-sm p-3 rounded-lg border mb-5" style={{ backgroundColor: "#fff7ed", borderColor: "#fed7aa", color: "#9a3412" }}>
							Supabase isn't configured yet. Add <code>VITE_SUPABASE_URL</code> and{" "}
							<code>VITE_SUPABASE_ANON_KEY</code> to your <code>.env</code> file.
						</div>
					)}

					<form onSubmit={handleSubmit} className="flex flex-col gap-4">
						{error && (
							<div className="text-sm p-3 rounded-lg border" style={{ backgroundColor: "#fff5f5", borderColor: "#fecaca", color: "#991b1b" }}>
								{error}
							</div>
						)}
						<div>
							<label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#888" }}>
								Email
							</label>
							<input
								type="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:border-[#204487] focus:outline-none transition-colors"
								placeholder="you@example.com"
							/>
						</div>
						<div>
							<label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "#888" }}>
								Password
							</label>
							<input
								type="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:border-[#204487] focus:outline-none transition-colors"
								placeholder="••••••••"
							/>
						</div>
						<Button variant="secondary" size="custom" layout="custom" effect="custom"
							type="submit"
							disabled={busy || !isSupabaseConfigured}
							className="mt-2 w-full py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
						>
							{busy ? "Signing in…" : "Sign in"} <FiArrowRight size={15} />
						</Button>
					</form>
				</div>

				<p className="text-center mt-6">
					<Link to="/" className="text-xs font-semibold hover:opacity-80" style={{ color: "#204487" }}>
						← Back to website
					</Link>
				</p>
			</div>
		</div>
	);
}
