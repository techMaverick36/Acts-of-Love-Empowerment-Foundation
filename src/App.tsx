import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import AboutPage from "./Pages/About";
import ProgramsPage from "./Pages/Programs";
import ImpactPage from "./Pages/Impact";
import ContactPage from "./Pages/Contact";
import GetInvolvedPage from "./Pages/GetInvolved";
import DonatePage from "./Pages/Donate";
import CheckoutPage from "./Pages/Checkout";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
	return (
		<Router>
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
			</Routes>
		</Router>
	);
};

export default App;
