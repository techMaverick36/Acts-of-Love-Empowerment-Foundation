/**
 * Search/social metadata for every static route. The build's prerender step
 * (scripts/prerender.mjs) and the sitemap read this list too, so a new public
 * page only needs an entry here plus its <Route> in App.tsx.
 */
export type PageMeta = {
	path: string;
	/** Page name; " | Acts of Love Empowerment Foundation" is appended (except on the home page). */
	title: string;
	description: string;
	/** Social-share image under /public. Defaults to SITE.defaultImage. */
	image?: string;
	/** Keep the page out of search results and the sitemap. */
	noindex?: boolean;
	/** Sitemap hints. */
	changefreq?: "weekly" | "monthly";
	priority?: number;
};

export const PAGES = {
	home: {
		path: "/",
		title: "Acts of Love Empowerment Foundation | Education, Health & Inclusion in Uganda",
		description:
			"Acts of Love Empowerment Foundation is an organization committed to improving people's lives through Education, Inclusive support, and Sustainable development.",
		image: "/D-4231r.jpg",
		changefreq: "weekly",
		priority: 1.0,
	},
	about: {
		path: "/about",
		title: "Who We Are",
		description:
			"We work with communities in Uganda on education, health, inclusion, and practical family support. Our work starts with listening.",
		image: "/D-4231r_52.jpg",
		changefreq: "monthly",
		priority: 0.8,
	},
	impact: {
		path: "/impact",
		title: "Our Work: Health, Inclusion, Education & Sustainable Development",
		description:
			"These are the areas where we serve children, families, and communities across Uganda: health, inclusion, education, and sustainable development.",
		image: "/D-4231r_31.jpg",
		changefreq: "monthly",
		priority: 0.8,
	},
	programs: {
		path: "/programs",
		title: "Programs: Sponsor a Child, Help a Community, Medical Emergencies",
		description:
			"Pick the kind of support you want to give. Each program is tied to real needs in education, health, food, or community care.",
		image: "/D-4231r_41.jpg",
		changefreq: "weekly",
		priority: 0.9,
	},
	getInvolved: {
		path: "/get-involved",
		title: "Get Involved: Volunteer & Partner With Us",
		description:
			"Your time and skills can help with clinics, mentoring, admin work, fundraising, and community visits across Uganda.",
		image: "/D-4231r_17.jpg",
		changefreq: "monthly",
		priority: 0.9,
	},
	contact: {
		path: "/contact",
		title: "Contact Us",
		description:
			"Questions about programs, donations, volunteering, or partnerships are welcome. Our team is ready to help.",
		image: "/D-4231r_39.jpg",
		changefreq: "monthly",
		priority: 0.6,
	},
	donate: {
		path: "/donate",
		title: "Make a Donation",
		description:
			"Your donation supports education, healthcare, food relief, and community programs. Thank you for helping us serve.",
		changefreq: "weekly",
		priority: 1.0,
	},
	blog: {
		path: "/blog",
		title: "Blog: Stories From the Field",
		description:
			"Updates from our outreach missions, reflections on the work, and the thinking that guides how we serve communities across Uganda.",
		image: "/D-4231r_51.jpg",
		changefreq: "weekly",
		priority: 0.8,
	},
	checkout: {
		path: "/checkout",
		title: "Complete Your Donation",
		description: "Secure checkout for your donation to Acts of Love Empowerment Foundation.",
		noindex: true,
	},
	notFound: {
		path: "/404",
		title: "Page Not Found",
		description: "The page you're looking for may have moved or no longer exists.",
		noindex: true,
	},
	admin: {
		path: "/admin",
		title: "Journal Admin",
		description: "Content administration.",
		noindex: true,
	},
} satisfies Record<string, PageMeta>;
