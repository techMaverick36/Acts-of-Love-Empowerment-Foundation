/**
 * schema.org JSON-LD builders. Google reads these to understand who the
 * foundation is, how to contact it, and what each blog post is about.
 */
import { SITE, SOCIAL_LINKS } from "../config/site";
import type { BlogPost } from "../data/blogPosts";

export const absoluteUrl = (path: string) =>
	/^https?:\/\//.test(path) ? path : `${SITE.url}${path.startsWith("/") ? "" : "/"}${path}`;

const ORG_ID = `${SITE.url}/#organization`;

export function organizationJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "NGO",
		"@id": ORG_ID,
		name: SITE.name,
		alternateName: SITE.shortName,
		url: SITE.url,
		logo: absoluteUrl(SITE.logo),
		image: absoluteUrl(SITE.defaultImage),
		email: SITE.email,
		telephone: SITE.phone.e164,
		foundingDate: SITE.foundingDate,
		nonprofitStatus: "Nonprofit",
		address: {
			"@type": "PostalAddress",
			streetAddress: SITE.address.street,
			addressLocality: SITE.address.locality,
			addressCountry: SITE.address.countryCode,
		},
		geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
		areaServed: { "@type": "Country", name: SITE.address.country },
		knowsAbout: ["Education", "Health", "Inclusion", "Sustainable Development"],
		contactPoint: {
			"@type": "ContactPoint",
			contactType: "customer support",
			email: SITE.email,
			telephone: SITE.phone.e164,
			areaServed: SITE.address.countryCode,
			availableLanguage: ["English"],
		},
		sameAs: SOCIAL_LINKS.map((s) => s.href),
	};
}

export function websiteJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"@id": `${SITE.url}/#website`,
		name: SITE.name,
		url: SITE.url,
		publisher: { "@id": ORG_ID },
		inLanguage: "en",
	};
}

export function faqJsonLd(items: readonly { question: string; answer: string }[]) {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: items.map((item) => ({
			"@type": "Question",
			name: item.question,
			acceptedAnswer: { "@type": "Answer", text: item.answer },
		})),
	};
}

export function breadcrumbJsonLd(trail: readonly { name: string; path: string }[]) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: trail.map((crumb, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: crumb.name,
			item: absoluteUrl(crumb.path),
		})),
	};
}

export function blogPostingJsonLd(post: BlogPost) {
	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.excerpt,
		image: post.image ? [absoluteUrl(post.image)] : undefined,
		datePublished: post.date,
		author: { "@type": "Person", name: post.author.name, jobTitle: post.author.role },
		publisher: { "@id": ORG_ID, "@type": "NGO", name: SITE.name, logo: absoluteUrl(SITE.logo) },
		mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
		articleSection: post.category,
		inLanguage: "en",
	};
}
