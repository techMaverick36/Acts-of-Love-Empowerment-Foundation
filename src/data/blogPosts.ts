export type BodyBlock =
	| { type: "p"; text: string }
	| { type: "h2"; text: string }
	| { type: "ul"; items: string[] }
	| { type: "image"; src: string; caption?: string; align?: "full" | "left" | "right" }
	| { type: "quote"; text: string };

export type PostCategory =
	| "Field Stories"
	| "Education"
	| "Health"
	| "Community";

export type ImpactStat = { value: string; label: string };

export type BlogPost = {
	slug: string;
	category: PostCategory;
	title: string;
	excerpt: string;
	image: string;
	date: string; // ISO date
	author: { name: string; role?: string; avatar?: string };
	readTime: string;
	body: BodyBlock[];
	impactStats: ImpactStat[];
};

export const categories = [
	"All",
	"Field Stories",
	"Education",
	"Health",
	"Community",
] as const;

// Categories selectable when authoring a post (excludes the "All" filter).
export const postCategories: PostCategory[] = [
	"Field Stories",
	"Education",
	"Health",
	"Community",
];

// Category chip colors reuse the site's existing accent semantics
// (Health green, Community orange, Education blue).
export const categoryColors: Record<PostCategory, string> = {
	"Field Stories": "#08415C",
	Education: "#204487",
	Health: "#00A54F",
	Community: "#F26421",
};

export function formatDate(iso: string): string {
	return new Date(iso).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}
