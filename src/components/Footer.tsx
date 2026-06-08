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
		{ name: "Get Involved", path: "/get-involved" },
		{ name: "Contact", path: "/contact" },
	];

	return (
		<footer className="bg-[#204487] text-white">
			{/* Main footer grid */}
			<div className="pt-16 pb-10">
				<div className="max-w-7xl mx-auto px-6">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
						{/* Brand Column */}
						<div className="flex flex-col gap-5">
							<Link to="/" className="flex items-center gap-4 group">
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

							<p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
								Supporting children and families through education, healthcare,
								inclusion, and community programs across Uganda.
							</p>

							<div
								className="inline-flex items-center gap-2 text-xs px-3 py-2 rounded-lg self-start"
								style={{ backgroundColor: "rgba(99,158,144,0.15)", color: "#639E90" }}
							>
								<span className="w-1.5 h-1.5 rounded-full bg-[#639E90]" />
								Serving Communities - Kampala, Uganda
							</div>

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
										aria-label="Social media"
										className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#D91E26] hover:border-[#D91E26] transition-all duration-300"
									>
										<item.Icon size={17} />
									</a>
								))}
							</div>
						</div>

						{/* Quick Links */}
						<div className="lg:pl-8">
							<h4 className="text-white font-bold text-base mb-6 relative inline-block">
								Quick Links
								<span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-[#F26421]" />
							</h4>
							<ul className="space-y-3.5 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
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

						{/* Our Work */}
						<div>
							<h4 className="text-white font-bold text-base mb-6 relative inline-block">
								Our Work
								<span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-[#F26421]" />
							</h4>
							<ul className="space-y-3.5 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
								{[
									"Healthcare Support",
									"Education for All",
									"Inclusion & Dignity",
									"Sustainable Development",
									"Emergency Relief",
								].map((item) => (
									<li key={item}>
										<Link
											to="/impact"
											className="hover:text-white hover:translate-x-1 transition-all inline-block"
										>
											{item}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* Contact Info */}
						<div className="rounded-2xl p-6 border border-white/10" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
							<h4 className="text-white font-bold text-base mb-5">Contact Us</h4>
							<ul className="space-y-5 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
								<li className="flex items-start gap-4">
									<FiMapPin className="text-[#F26421] shrink-0 mt-0.5" size={17} />
									<span>Bunamwaya, Wakiso District, Uganda</span>
								</li>
								<li className="flex items-center gap-4">
									<FiPhone className="text-[#F26421] shrink-0" size={17} />
									<a href="tel:+256740093081" className="hover:text-white transition-colors">
										+256 740 093 081
									</a>
								</li>
								<li className="flex items-center gap-4">
									<FiMail className="text-[#F26421] shrink-0" size={17} />
									<a
										href="mailto:actsofloveempowerment@gmail.com"
										className="break-all hover:text-white transition-colors"
									>
										actsofloveempowerment@gmail.com
									</a>
								</li>
							</ul>
						</div>
					</div>

					{/* Bottom Bar */}
					<div
						className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-5 text-[12px]"
						style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}
					>
						<p>
							© {new Date().getFullYear()} Acts of Love Empowerment Foundation. All rights reserved.
						</p>
						<div className="flex gap-6">
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
			</div>
		</footer>
	);
}
