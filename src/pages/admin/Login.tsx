import { useEffect, useState, type FormEvent } from "react";
import { FiArrowLeft, FiArrowRight, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { InputField } from "../../components/forms/Field";
import Seo from "../../components/seo/Seo";
import { Alert } from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import IconTile from "../../components/ui/IconTile";
import { PAGES } from "../../config/seo";
import { SITE } from "../../config/site";
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

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError(null);
		setBusy(true);
		try {
			await signIn(email, password);
			navigate("/admin", { replace: true });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unable to sign in. Please try again.");
		} finally {
			setBusy(false);
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-surface px-6">
			<Seo {...PAGES.admin} title="Sign in" path="/admin/login" />
			<div className="w-full max-w-md">
				<Link to="/" className="mb-8 flex items-center justify-center gap-3">
					<img src={SITE.logo} alt="Acts of Love" className="size-11 object-contain" />
					<div className="text-left leading-tight">
						<p className="font-serif text-lg font-bold text-brand-blue">Acts of Love</p>
						<p className="text-[10px] uppercase tracking-widest text-brand-teal">Admin</p>
					</div>
				</Link>

				<div className="rounded-2xl border border-line bg-white p-8 shadow-sm">
					<div className="mb-6 flex items-center gap-3">
						<IconTile icon={FiLock} size="md" />
						<div>
							<h1 className="font-serif text-xl font-semibold text-brand-blue">Sign in</h1>
							<p className="text-xs text-muted">Restricted to foundation admins</p>
						</div>
					</div>

					{!isSupabaseConfigured && (
						<Alert tone="warning" className="mb-5">
							Supabase isn't configured yet. Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to
							your <code>.env</code> file.
						</Alert>
					)}

					<form onSubmit={handleSubmit} className="flex flex-col gap-4">
						{error && <Alert>{error}</Alert>}
						<InputField
							label="Email"
							type="email"
							required
							autoComplete="username"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="you@example.com"
						/>
						<InputField
							label="Password"
							type="password"
							required
							autoComplete="current-password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••"
						/>
						<Button
							type="submit"
							variant="secondary"
							fullWidth
							className="mt-2"
							disabled={busy || !isSupabaseConfigured}
							trailingIcon={FiArrowRight}
						>
							{busy ? "Signing in…" : "Sign in"}
						</Button>
					</form>
				</div>

				<p className="mt-6 text-center">
					<Button to="/" variant="link" icon={FiArrowLeft} className="text-xs">
						Back to website
					</Button>
				</p>
			</div>
		</div>
	);
}
