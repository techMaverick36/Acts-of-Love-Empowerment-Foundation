import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import AboutPage from "./Pages/About";
import ProgramsPage from "./Pages/Programs";
import ImpactPage from "./Pages/Impact";
import ContactPage from "./Pages/Contact";
import GetInvolvedPage from "./Pages/GetInvolved";
import DonatePage from "./Pages/Donate";
import CheckoutPage from "./Pages/Checkout";
import BlogPage from "./Pages/Blog";
import BlogPostPage from "./Pages/BlogPost";
import AdminLogin from "./Pages/admin/Login";
import AdminDashboard from "./Pages/admin/Dashboard";
import PostEditor from "./Pages/admin/PostEditor";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
	return (
		<Router>
			<AuthProvider>
				<ScrollToTop />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<AboutPage />} />
					<Route path="/programs" element={<ProgramsPage />} />
					<Route path="/impact" element={<ImpactPage />} />
					<Route path="/contact" element={<ContactPage />} />
					<Route path="/get-involved" element={<GetInvolvedPage />} />
					<Route path="/donate" element={<DonatePage />} />
					<Route path="/checkout" element={<CheckoutPage />} />
					<Route path="/blog" element={<BlogPage />} />
					<Route path="/blog/:slug" element={<BlogPostPage />} />

					{/* Admin */}
					<Route path="/admin/login" element={<AdminLogin />} />
					<Route
						path="/admin"
						element={
							<ProtectedRoute>
								<AdminDashboard />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/admin/new"
						element={
							<ProtectedRoute>
								<PostEditor />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/admin/edit/:slug"
						element={
							<ProtectedRoute>
								<PostEditor />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</AuthProvider>
		</Router>
	);
};

export default App;
