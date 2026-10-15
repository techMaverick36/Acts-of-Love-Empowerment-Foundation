import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/layout/ScrollToTop";
import AboutPage from "./pages/About";
import BlogPage from "./pages/Blog";
import BlogPostPage from "./pages/BlogPost";
import CheckoutPage from "./pages/Checkout";
import ContactPage from "./pages/Contact";
import DonatePage from "./pages/Donate";
import GetInvolvedPage from "./pages/GetInvolved";
import HomePage from "./pages/Home";
import ImpactPage from "./pages/Impact";
import NotFoundPage from "./pages/NotFound";
import ProgramsPage from "./pages/Programs";
import AdminLoading from "./components/admin/AdminLoading";

// Admin screens (rich-text editor, Supabase auth) load on demand, so public
// visitors never download them.
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminLogin = lazy(() => import("./pages/admin/Login"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const PostEditor = lazy(() => import("./pages/admin/PostEditor"));
const ProtectedRoute = lazy(() => import("./components/admin/ProtectedRoute"));

/**
 * All routes. The router itself is supplied by the entry point:
 * <BrowserRouter> in main.tsx, <StaticRouter> in entry-server.tsx (prerender).
 * Public pages must also be listed in src/config/seo.ts.
 */
export default function App() {
	return (
		<>
			<ScrollToTop />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="/programs" element={<ProgramsPage />} />
				<Route path="/impact" element={<ImpactPage />} />
				<Route path="/contact" element={<ContactPage />} />
				<Route path="/get-involved" element={<GetInvolvedPage />} />
				<Route path="/donate" element={<DonatePage />} />
				<Route path="/checkout" element={<CheckoutPage />} />
				<Route path="/blog" element={<BlogPage />} />
				<Route path="/blog/:slug" element={<BlogPostPage />} />

				<Route
					path="/admin"
					element={
						<Suspense fallback={<AdminLoading />}>
							<AdminLayout />
						</Suspense>
					}
				>
					<Route path="login" element={<AdminLogin />} />
					<Route
						index
						element={
							<ProtectedRoute>
								<AdminDashboard />
							</ProtectedRoute>
						}
					/>
					<Route
						path="new"
						element={
							<ProtectedRoute>
								<PostEditor />
							</ProtectedRoute>
						}
					/>
					<Route
						path="edit/:slug"
						element={
							<ProtectedRoute>
								<PostEditor />
							</ProtectedRoute>
						}
					/>
				</Route>

				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</>
	);
}
