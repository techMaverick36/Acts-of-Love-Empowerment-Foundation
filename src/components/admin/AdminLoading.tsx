/** Full-screen loading state for admin screens. */
export default function AdminLoading() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-surface">
			<p className="text-sm text-muted">Loading…</p>
		</div>
	);
}
