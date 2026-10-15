import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import AdminLoading from "../../components/admin/AdminLoading";
import { AuthProvider } from "../../context/AuthContext";

/** Wraps every /admin route: provides the signed-in session and a loading state for lazy screens. */
export default function AdminLayout() {
	return (
		<AuthProvider>
			<Suspense fallback={<AdminLoading />}>
				<Outlet />
			</Suspense>
		</AuthProvider>
	);
}
