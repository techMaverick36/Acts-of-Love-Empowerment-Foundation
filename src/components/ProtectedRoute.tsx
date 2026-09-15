import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
	children,
}: {
	children: React.ReactNode;
}) {
	const { session, loading } = useAuth();

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-[#f8f9fb]">
				<p className="text-sm" style={{ color: "#888" }}>
					Loading…
				</p>
			</div>
		);
	}

	if (!session) {
		return <Navigate to="/admin/login" replace />;
	}

	return <>{children}</>;
}
