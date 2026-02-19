import {
	FiMail,
	FiPhone,
	FiMapPin,
	FiInstagram,
	FiFacebook,
	FiTwitter,
	FiLinkedin,
} from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";

export default function Footer() {
	const navLinks = [
		{ name: "Home", path: "/" },
		{ name: "Who We Are", path: "/about" },
		{ name: "Impact", path: "/impact" },
		{ name: "Programs", path: "/programs" },
		{ name: "Contact", path: "/contact" },
	];
	return (
		<footer className="bg-[#204487] text-white pt-20 pb-10">
			<div className="max-w-7xl mx-auto px-6">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
					{/* Brand Column */}
					<div className="flex flex-col gap-6">
						<Link to="/" className="flex items-center gap-4 group">
							{/* Logo Container - Clean & Visible */}
							<div className="bg-white p-2 rounded-xl shadow-lg transition-transform group-hover:scale-105">
								<img
									src="./logo.png"
									alt="Acts of Love Logo"
									className="w-12 h-12 object-contain"
								/>
							</div>
							<div>
								<h3 className="font-serif font-bold text-xl leading-none tracking-tight text-white">
									Acts of Love
								</h3>
								<p className="text-[#639E90] text-[10px] uppercase tracking-[0.2em] font-bold mt-1">
									Empowerment Foundation
								</p>
							</div>
						</Link>

						<p className="text-blue-100/80 text-sm leading-relaxed max-w-xs">
							Committed to transforming lives through sustainable healthcare,
							education, and community empowerment initiatives across Uganda.
						</p>

						<div className="flex gap-3">
							{[
								{ Icon: FiFacebook, link: "#" },
								{ Icon: FiTwitter, link: "#" },
								{ Icon: FiInstagram, link: "#" },
								{ Icon: FiLinkedin, link: "#" },
							].map((item, i) => (
								<a
									key={i}
									href={item.link}
									className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#D91E26] hover:border-[#D91E26] transition-all duration-300"
								>
									<item.Icon size={18} />
								</a>
							))}
						</div>
					</div>

					{/* Quick Links */}
					<div className="lg:pl-10">
						<h4 className="text-white font-bold text-lg mb-6 relative inline-block">
							Quick Links
							<span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#F26421]"></span>
						</h4>
						<ul className="space-y-4 text-sm text-blue-100/70">
							{navLinks.map((item) => (
								<li key={item.name}>
									<NavLink
										to={item.path}
										className="hover:text-white hover:translate-x-1 transition-all inline-block"
									>
										{item.name}
									</NavLink>
								</li>
							))}
						</ul>
					</div>

					{/* Programs */}
					<div>
						<h4 className="text-white font-bold text-lg mb-6 relative inline-block">
							Our Work
							<span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#F26421]"></span>
						</h4>
						<ul className="space-y-4 text-sm text-blue-100/70">
							{[
								"Healthcare Support",
								"Education for All",
								"Community Growth",
								"Emergency Relief",
							].map((item) => (
								<li key={item}>
									<a
										href="#"
										className="hover:text-white hover:translate-x-1 transition-all inline-block"
									>
										{item}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Contact Info */}
					<div className="bg-white/5 p-6 rounded-2xl border border-white/10">
						<h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
						<ul className="space-y-5 text-sm text-blue-100/80">
							<li className="flex items-start gap-4">
								<FiMapPin className="text-[#F26421] shrink-0 mt-1" size={18} />
								<span>Bunamwaya, Wakiso District, Uganda</span>
							</li>
							<li className="flex items-center gap-4">
								<FiPhone className="text-[#F26421] shrink-0" size={18} />
								<span>+256 779150875</span>
							</li>
							<li className="flex items-center gap-4">
								<FiMail className="text-[#F26421] shrink-0" size={18} />
								<span className="break-all">actsofloveempowerment@gmail.com</span>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[13px] text-blue-200/50">
					<p>
						© {new Date().getFullYear()} Acts of Love Empowerment Foundation.
					</p>
					<div className="flex gap-8">
						<a href="#" className="hover:text-white transition-colors">
							Privacy Policy
						</a>
						<a href="#" className="hover:text-white transition-colors">
							Terms of Service
						</a>
						<a href="#" className="hover:text-white transition-colors">
							Cookie Policy
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
