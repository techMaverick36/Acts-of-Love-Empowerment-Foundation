export type BodyBlock =
	| { type: "p"; text: string }
	| { type: "h2"; text: string }
	| { type: "ul"; items: string[] }
	| { type: "image"; src: string; caption?: string; align?: "full" | "right" }
	| { type: "quote"; text: string };

export type BlogPost = {
	slug: string;
	category: "Field Stories" | "Education" | "Health" | "Community";
	title: string;
	excerpt: string;
	image: string;
	date: string; // ISO date
	author: { name: string; role?: string; avatar?: string };
	readTime: string;
	body: BodyBlock[];
};

export const categories = [
	"All",
	"Field Stories",
	"Education",
	"Health",
	"Community",
] as const;

// Category chip colors reuse the site's existing accent semantics
// (Health green, Community orange, Education blue).
export const categoryColors: Record<BlogPost["category"], string> = {
	"Field Stories": "#08415C",
	Education: "#204487",
	Health: "#00A54F",
	Community: "#F26421",
};

export const blogPosts: BlogPost[] = [
	{
		slug: "first-outreach-police-children-school-kibuli",
		category: "Field Stories",
		title: "Our First Outreach: 50 Children Equipped for School in Kibuli",
		excerpt:
			"In April 2026 we walked through the gates of the Police Children School in Kibuli for our very first mission — and left with a clear sense of the work ahead.",
		image: "/D-4231r_18.jpg",
		date: "2026-04-18",
		author: {
			// TODO: replace with the actual team lead's name and photo.
			// Drop a photo in /public and set e.g. avatar: "/team-lead.jpg".
			name: "Team Lead",
			role: "Led the Kibuli outreach",
		},
		readTime: "4 min read",
		body: [
			{
				type: "p",
				text: "There is a particular quiet that settles over a classroom when children are handed something that is truly theirs. In April 2026, at the Police Children School in Kibuli, Wakiso District, we watched fifty children open packages of exercise books, pens, pencils, and mathematical sets — and that quiet was the first thing we noticed.",
			},
			{
				type: "p",
				text: "It was our first outreach mission as a foundation, and we had spent weeks preparing. But no amount of planning quite prepares you for the moment a child who has been sharing a single pencil suddenly has a full set of their own.",
			},
			{
				type: "image",
				src: "/D-4231r_54.jpg",
				caption:
					"Pupils at the Police Children School in Kibuli with their new learning materials.",
			},
			{ type: "h2", text: "Why scholastic materials matter" },
			{
				type: "p",
				text: "For families stretched thin, the cost of basic learning supplies is often the difference between a child attending school and staying home. A missing exercise book is rarely just a missing book — it is a missed lesson, a lower mark, and slowly, a lost sense that school is a place where you belong.",
			},
			{
				type: "ul",
				items: [
					"Exercise books for every core subject",
					"Pens, pencils, and mathematical sets",
					"Rulers and other daily classroom supplies",
					"Enough for a full term of steady learning",
				],
			},
			{
				type: "p",
				text: "By meeting that need directly, we remove one of the smallest but most persistent barriers to a child's education. It is not dramatic work. It is steady, practical, and it changes what a school day feels like.",
			},
			{
				type: "quote",
				text: "No amount of planning prepares you for the moment a child who has been sharing a single pencil suddenly has a full set of their own.",
			},
			{ type: "h2", text: "What we learned" },
			{
				type: "p",
				text: "Our work starts with listening, and this first mission taught us to listen more closely. Teachers told us which supplies ran out fastest. Parents told us what a term's worth of materials would mean for their household budget. Those conversations now shape how we plan every outreach that follows.",
			},
			{
				type: "p",
				text: "Fifty children is a beginning, not a finish line. But it is a real beginning — and we are grateful to everyone who helped make it possible.",
			},
		],
	},
];

export function getPostBySlug(slug: string): BlogPost | undefined {
	return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 2): BlogPost[] {
	const current = getPostBySlug(slug);
	if (!current) return blogPosts.slice(0, limit);
	const sameCategory = blogPosts.filter(
		(p) => p.slug !== slug && p.category === current.category
	);
	const others = blogPosts.filter(
		(p) => p.slug !== slug && p.category !== current.category
	);
	return [...sameCategory, ...others].slice(0, limit);
}

export function formatDate(iso: string): string {
	return new Date(iso).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}
