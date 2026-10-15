import type { ReactNode } from "react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";
import { NAV_LINKS, SITE } from "../../config/site";
import SocialLinks from "../ui/SocialLinks";
import { Container } from "./Section";
import Logo from "./Logo";

const OUR_WORK = [
	"Healthcare Support",
	"Education for All",
	"Inclusion & Dignity",
	"Sustainable Development",
	"Emergency Relief",
];

// TODO: point these at real policy pages once they exist.
const LEGAL_LINKS = ["Privacy Policy", "Terms of Service", "Cookie Policy"];

function FooterHeading({ children }: { children: ReactNode }) {
	return (
		<h2 className="relative mb-6 inline-block font-sans text-base font-bold text-white">
			{children}
			<span aria-hidden className="absolute -bottom-2 left-0 h-0.5 w-8 bg-brand-orange" />
		</h2>
	);
}

const linkClass = "inline-block transition-[color,transform] duration-200 hover:translate-x-1 hover:text-white";

export default function Footer() {
	return (
		<footer className="bg-brand-blue text-white">
			<Container className="pb-10 pt-16">
				<div className="mb-14 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
					<div className="flex flex-col gap-5">
						<Logo theme="light" />
						<p className="text-sm leading-relaxed text-white/65">
							Supporting children and families through education, healthcare, inclusion, and community
							programs across Uganda.
						</p>
						<SocialLinks theme="dark" />
					</div>

					<nav aria-label="Footer" className="lg:pl-8">
						<FooterHeading>Quick Links</FooterHeading>
						<ul className="space-y-3.5 text-sm text-white/65">
							{NAV_LINKS.map((link) => (
								<li key={link.path}>
									<Link to={link.path} className={linkClass}>
										{link.footerName ?? link.name}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					<div>
						<FooterHeading>Our Work</FooterHeading>
						<ul className="space-y-3.5 text-sm text-white/65">
							{OUR_WORK.map((item) => (
								<li key={item}>
									<Link to="/impact" className={linkClass}>
										{item}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<address className="rounded-2xl border border-white/10 bg-white/5 p-6 not-italic">
						<h2 className="mb-5 font-sans text-base font-bold text-white">Contact Us</h2>
						<ul className="space-y-5 text-sm text-white/70">
							<li className="flex items-start gap-4">
								<FiMapPin aria-hidden size={17} className="mt-0.5 shrink-0 text-brand-orange" />
								<span>{SITE.address.display}</span>
							</li>
							<li className="flex items-center gap-4">
								<FiPhone aria-hidden size={17} className="shrink-0 text-brand-orange" />
								<a href={SITE.phone.href} className="transition-colors hover:text-white">
									{SITE.phone.display}
								</a>
							</li>
							<li className="flex items-center gap-4">
								<FiMail aria-hidden size={17} className="shrink-0 text-brand-orange" />
								<a href={`mailto:${SITE.email}`} className="break-all transition-colors hover:text-white">
									{SITE.email}
								</a>
							</li>
						</ul>
					</address>
				</div>

				<div className="flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 text-xs text-white/50 md:flex-row">
					<p>
						© {new Date().getFullYear()} {SITE.name}. All rights reserved.
					</p>
					<ul className="flex gap-6">
						{LEGAL_LINKS.map((label) => (
							<li key={label}>
								<a href="#" className="transition-colors hover:text-white">
									{label}
								</a>
							</li>
						))}
					</ul>
				</div>
			</Container>
		</footer>
	);
}
