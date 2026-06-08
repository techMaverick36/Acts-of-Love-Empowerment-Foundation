import { useState, useEffect } from "react";
import { FiMenu, FiX, FiMail, FiPhone } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navLinks = [
		{ name: "Home", path: "/" },
		{ name: "Who We Are", path: "/about" },
		{ name: "Impact", path: "/impact" },
		{ name: "Programs", path: "/programs" },
		{ name: "Get Involved", path: "/get-involved" },
		{ name: "Contact", path: "/contact" },
	];

	return (
		<header className="fixed top-0 left-0 right-0 z-50">
			{/* Top contact bar */}
			<div className="hidden lg:block bg-[#08415C] py-2">
				<div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-[11px]">
					<div className="flex items-center gap-6 text-white/60">
						<a
							href="mailto:actsofloveempowerment@gmail.com"
							className="flex items-center gap-1.5 hover:text-white transition-colors"
						>
							<FiMail size={11} />
							actsofloveempowerment@gmail.com
						</a>
						<a
							href="tel:+256740093081"
							className="flex items-center gap-1.5 hover:text-white transition-colors"
						>
							<FiPhone size={11} />
							+256 740 093 081
						</a>
					</div>
					<div className="flex items-center gap-1.5 text-white/60">
						<span className="w-1.5 h-1.5 rounded-full bg-[#639E90]" />
						<span>Serving Communities - Kampala, Uganda</span>
					</div>
				</div>
			</div>

			{/* Main Navbar */}
			<nav
				className={`bg-white transition-all duration-300 ${
					scrolled ? "shadow-md" : "shadow-none"
				}`}
			>
				<div className="max-w-7xl mx-auto px-6">
					<div className="flex items-center justify-between h-20">
						{/* Logo */}
						<Link to="/" className="flex items-center gap-3 shrink-0">
							<div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shrink-0">
								<img
									src="./logo.png"
									alt="Acts of Love Empowerment Foundation Logo"
									className="w-full h-full object-contain"
								/>
							</div>
							<div className="leading-tight">
								<p
									className="font-serif font-bold text-lg md:text-xl leading-none"
									style={{ color: "#204487" }}
								>
									Acts of Love
								</p>
								<p
									className="text-[0.65rem] md:text-xs tracking-widest uppercase"
									style={{ color: "#639E90" }}
								>
									Empowerment Foundation
								</p>
							</div>
						</Link>

						{/* Desktop Links */}
						<div className="hidden lg:flex items-center gap-7">
							{navLinks.map((link) => (
								<NavLink
									key={link.name}
									to={link.path}
									className={({ isActive }) => `
										relative text-sm font-semibold transition-all duration-300
										${
											scrolled
												? isActive
													? "text-[#D91E26]"
													: "text-gray-700 hover:text-[#204487]"
												: isActive
													? "text-[#F26421]"
													: "text-gray-800 hover:text-[#204487]"
										}
									`}
								>
									{({ isActive }) => (
										<>
											{link.name}
											<span
												className={`absolute -bottom-1 left-0 h-0.5 bg-current transition-all duration-300 ${
													isActive ? "w-full opacity-100" : "w-0 opacity-0"
												}`}
											/>
										</>
									)}
								</NavLink>
							))}
						</div>

						{/* Donate Button */}
						<div className="hidden lg:block">
							<Link
								to="/donate"
								className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white rounded-full transition-all duration-200 hover:opacity-90 hover:scale-105 shadow-sm"
								style={{ backgroundColor: "#D91E26" }}
							>
								Donate Now
							</Link>
						</div>

						{/* Mobile Menu Toggle */}
						<button
							className="lg:hidden p-2 rounded-lg transition-colors hover:bg-gray-100"
							onClick={() => setMenuOpen(!menuOpen)}
							style={{ color: "#204487" }}
							aria-label="Toggle navigation menu"
						>
							{menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				{menuOpen && (
					<div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-1">
						{navLinks.map((link) => (
							<NavLink
								key={link.name}
								to={link.path}
								className={({ isActive }) =>
									`text-sm font-medium py-2.5 px-3 rounded-lg transition-colors ${
										isActive
											? "text-[#D91E26] bg-red-50"
											: "text-[#1D1E1F] hover:text-[#204487] hover:bg-blue-50"
									}`
								}
								onClick={() => setMenuOpen(false)}
							>
								{link.name}
							</NavLink>
						))}
						<Link
							to="/donate"
							className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-full text-center mt-3"
							style={{ backgroundColor: "#D91E26" }}
							onClick={() => setMenuOpen(false)}
						>
							Donate Now
						</Link>
						<div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-400 text-center">
							Serving Communities - Kampala, Uganda
						</div>
					</div>
				)}
			</nav>
		</header>
	);
}
