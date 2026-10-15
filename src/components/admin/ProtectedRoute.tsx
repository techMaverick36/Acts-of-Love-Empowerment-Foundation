import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminLoading from "./AdminLoading";

/** Renders its children only for a signed-in admin; otherwise redirects to /admin/login. */
export default function ProtectedRoute({ children }: { children: ReactNode }) {
	const { session, loading } = useAuth();

	if (loading) return <AdminLoading />;
	if (!session) return <Navigate to="/admin/login" replace />;
	return <>{children}</>;
}
