import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, Links, NavLink } from "react-router-dom";

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
		{ name: "Contact", path: "/contact" },
	];
	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
				scrolled ? "shadow-md" : ""
			}`}
		>
			<div className="max-w-7xl mx-auto px-6">
				<div className="flex items-center justify-between h-20">
					{/* Logo */}
					<Link to={"/"} className="flex items-center gap-2">
						<div className="w-9 h-9 rounded-full flex items-center justify-end">
							<img
								src="./logo.png"
								alt="Acts of Love Empowerment Foundation Logo"
							/>
						</div>
						<div className="leading-tight">
							<p
								className="font-serif font-bold text-base leading-none"
								style={{ color: "#204487" }}
							>
								Acts of Love
							</p>
							<p
								className="text-xs tracking-widest uppercase"
								style={{ color: "#639E90" }}
							>
								Empowerment Foundation
							</p>
						</div>
					</Link>

					{/* Desktop Links */}
					<div className="hidden md:flex items-center gap-8">
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
								// style={{ color: "#1D1E1F" }}  <-- REMOVE THIS! It blocks the highlight colors
							>
								{({ isActive }) => (
									<>
										{link.name}

										{/* Optional: Add a smooth underline that only appears when active */}
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
					<div className="hidden md:block">
						<a
							href={`/get-involved`}
							className="inline-block px-6 py-2.5 text-sm font-semibold text-white rounded transition-opacity duration-200 hover:opacity-90"
							style={{ backgroundColor: "#D91E26" }}
						>
							Donate Now
						</a>
					</div>

					{/* Mobile Menu Toggle */}
					<button
						className="md:hidden p-2"
						onClick={() => setMenuOpen(!menuOpen)}
						style={{ color: "#204487" }}
					>
						{menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			{menuOpen && (
				<div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
					{navLinks.map((link) => (
						<NavLink
							key={link.name}
							to={link.path}
							className="text-sm font-medium py-1"
							style={{ color: "#1D1E1F" }}
						>
							{link.name}
						</NavLink>
					))}
					<NavLink
						to={`/get-involved`}
						className="inline-block px-6 py-2.5 text-sm font-semibold text-white rounded text-center mt-2"
						style={{ backgroundColor: "#D91E26" }}
					>
						Donate Now
					</NavLink>
				</div>
			)}
		</nav>
	);
}
