import type { IconType } from "react-icons";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

/**
 * Organisation details shared across the site (header, footer, contact page,
 * SEO metadata and structured data). Update contact details here only.
 */
export const SITE = {
	name: "Acts of Love Empowerment Foundation",
	shortName: "Acts of Love",
	tagline: "Empowerment Foundation",
	/** Production origin, no trailing slash. Used for canonical URLs and the sitemap. */
	url: "https://actsofloveempowerment.org",
	logo: "/logo.png",
	/** Default social-share image (relative to /public). */
	defaultImage: "/D-4231r.jpg",
	foundingDate: "2026-01-01",
	email: "actsofloveempowerment@gmail.com",
	phone: {
		display: "+256 740 093 081",
		href: "tel:+256740093081",
		e164: "+256740093081",
	},
	address: {
		street: "Bunamwaya",
		locality: "Wakiso District",
		country: "Uganda",
		countryCode: "UG",
		display: "Bunamwaya, Wakiso District, Uganda",
	},
	geo: { lat: 0.264913, lng: 32.546467 },
	serviceArea: "Serving Communities - Kampala, Uganda",
} as const;

export type SocialLink = { label: string; href: string; Icon: IconType };

export const SOCIAL_LINKS: SocialLink[] = [
	{ label: "Facebook", href: "https://www.facebook.com/profile.php?id=61594453510201", Icon: FaFacebookF },
	{ label: "Twitter", href: "https://x.com/actsoflove_ug", Icon: FaXTwitter },
	{ label: "Instagram", href: "https://www.instagram.com/actsofloveempowerment/", Icon: FaInstagram },
	{ label: "LinkedIn", href: "https://www.linkedin.com/company/actsofloveempowermentfoundation", Icon: FaLinkedinIn },
];

export type NavLink = {
	name: string;
	path: string;
	/** Label used in the footer when it differs from the header. */
	footerName?: string;
};

/** Primary navigation, shown in the header and the footer "Quick Links". */
export const NAV_LINKS: NavLink[] = [
	{ name: "Home", path: "/" },
	{ name: "Who We Are", path: "/about" },
	{ name: "Impact", path: "/impact" },
	{ name: "Programs", path: "/programs" },
	{ name: "Get Involved", path: "/get-involved" },
	{ name: "Contact", path: "/contact" },
	{ name: "Blogs", path: "/blog", footerName: "Blog" },
];
