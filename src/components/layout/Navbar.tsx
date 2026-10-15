import { useEffect, useState } from "react";
import { FiMail, FiMapPin, FiMenu, FiPhone, FiX } from "react-icons/fi";
import { NavLink, useLocation } from "react-router-dom";
import { NAV_LINKS, SITE } from "../../config/site";
import { cn } from "../../lib/cn";
import Button from "../ui/Button";
import IconButton from "../ui/IconButton";
import Logo from "./Logo";

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const { pathname } = useLocation();
	// The menu belongs to the page it was opened on, so navigating closes it.
	const [menuOpenOn, setMenuOpenOn] = useState<string | null>(null);
	const menuOpen = menuOpenOn === pathname;
	const setMenuOpen = (open: boolean) => setMenuOpenOn(open ? pathname : null);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Close the mobile menu on Escape.
	useEffect(() => {
		if (!menuOpen) return;
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpenOn(null);
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [menuOpen]);

	return (
		<header className="fixed inset-x-0 top-0 z-50">
			{/* Contact bar */}
			<div className="hidden bg-brand-navy py-2 lg:block">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-6 text-xs text-white/65">
					<div className="flex items-center gap-6">
						<a href={`mailto:${SITE.email}`} className="flex items-center gap-1.5 transition-colors hover:text-white">
							<FiMail aria-hidden size={12} />
							{SITE.email}
						</a>
						<a href={SITE.phone.href} className="flex items-center gap-1.5 transition-colors hover:text-white">
							<FiPhone aria-hidden size={12} />
							{SITE.phone.display}
						</a>
					</div>
					<p className="flex items-center gap-1.5">
						<FiMapPin aria-hidden size={12} className="text-brand-teal" />
						{SITE.serviceArea}
					</p>
				</div>
			</div>

			<nav
				aria-label="Main"
				className={cn("bg-white transition-shadow duration-300", scrolled || menuOpen ? "shadow-[0_6px_24px_-12px_rgba(0,0,0,0.25)]" : "")}
			>
				<div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
					<Logo />

					<ul className="hidden items-center gap-7 xl:flex">
						{NAV_LINKS.map((link) => (
							<li key={link.path}>
								<NavLink
									to={link.path}
									end={link.path === "/"}
									className={({ isActive }) =>
										cn(
											"relative py-1 text-sm font-semibold transition-colors duration-200",
											"after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:bg-current after:transition-transform after:duration-300",
											isActive
												? "text-brand-red after:scale-x-100"
												: "text-ink hover:text-brand-blue after:scale-x-0",
										)
									}
								>
									{link.name}
								</NavLink>
							</li>
						))}
					</ul>

					<div className="hidden xl:block">
						<Button to="/donate">Donate Now</Button>
					</div>

					<IconButton
						className="xl:hidden"
						size="lg"
						iconSize={24}
						icon={menuOpen ? FiX : FiMenu}
						label="Toggle navigation menu"
						aria-expanded={menuOpen}
						aria-controls="mobile-navigation"
						onClick={() => setMenuOpen(!menuOpen)}
					/>
				</div>

				{menuOpen && (
					<div id="mobile-navigation" className="border-t border-line bg-white px-6 pb-6 pt-3 xl:hidden">
						<ul className="flex flex-col gap-1">
							{NAV_LINKS.map((link) => (
								<li key={link.path}>
									<NavLink
										to={link.path}
										end={link.path === "/"}
										className={({ isActive }) =>
											cn(
												"block rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors",
												isActive ? "bg-red-50 text-brand-red" : "text-ink hover:bg-surface hover:text-brand-blue",
											)
										}
									>
										{link.name}
									</NavLink>
								</li>
							))}
						</ul>
						<Button to="/donate" fullWidth className="mt-4">
							Donate Now
						</Button>
						<p className="mt-4 border-t border-line pt-3 text-center text-xs text-muted">{SITE.serviceArea}</p>
					</div>
				)}
			</nav>
		</header>
	);
}
