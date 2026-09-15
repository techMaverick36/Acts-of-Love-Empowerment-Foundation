import { supabase, isSupabaseConfigured } from "./supabase";
import type { BlogPost, BodyBlock, ImpactStat, PostCategory } from "../data/blogPosts";

const BUCKET = "blog-images";

// Shape of a row in the `posts` table.
type PostRow = {
	id: string;
	slug: string;
	category: PostCategory;
	title: string;
	excerpt: string | null;
	image: string | null;
	date: string;
	author_name: string;
	author_role: string | null;
	author_avatar: string | null;
	read_time: string | null;
	body: BodyBlock[] | null;
	impact_stats?: ImpactStat[] | null;
	published: boolean;
	created_at?: string;
	updated_at?: string;
};

// What the editor submits (published flag is handled separately).
export type PostInput = {
	slug: string;
	category: PostCategory;
	title: string;
	excerpt: string;
	image: string;
	date: string;
	author: { name: string; role?: string; avatar?: string };
	readTime: string;
	body: BodyBlock[];
	impactStats: ImpactStat[];
	published: boolean;
};

function rowToPost(row: PostRow): BlogPost {
	return {
		slug: row.slug,
		category: row.category,
		title: row.title,
		excerpt: row.excerpt ?? "",
		image: row.image ?? "",
		date: row.date,
		author: {
			name: row.author_name,
			role: row.author_role ?? undefined,
			avatar: row.author_avatar ?? undefined,
		},
		readTime: row.read_time ?? "",
		body: Array.isArray(row.body) ? row.body : [],
		impactStats: Array.isArray(row.impact_stats)
			? row.impact_stats.filter((stat) => stat && typeof stat.value === "string" && typeof stat.label === "string" && stat.value.trim() && stat.label.trim())
			: [],
	};
}

function inputToRow(input: PostInput) {
	return {
		slug: input.slug,
		category: input.category,
		title: input.title,
		excerpt: input.excerpt,
		image: input.image,
		date: input.date,
		author_name: input.author.name,
		author_role: input.author.role ?? null,
		author_avatar: input.author.avatar ?? null,
		read_time: input.readTime,
		body: input.body,
		impact_stats: input.impactStats,
		published: input.published,
	};
}

/** Published posts for the public listing, newest first. */
export async function listPublishedPosts(): Promise<BlogPost[]> {
	const { data, error } = await supabase
		.from("posts")
		.select("*")
		.eq("published", true)
		.order("date", { ascending: false });
	if (error) throw error;
	return (data as PostRow[]).map(rowToPost);
}

/** A single published post by slug (or null if not found). */
export async function getPublishedPost(slug: string): Promise<BlogPost | null> {
	const { data, error } = await supabase
		.from("posts")
		.select("*")
		.eq("slug", slug)
		.eq("published", true)
		.maybeSingle();
	if (error) throw error;
	return data ? rowToPost(data as PostRow) : null;
}

/** Related published posts — same category first, then others. */
export async function listRelatedPosts(
	slug: string,
	category: PostCategory,
	limit = 2
): Promise<BlogPost[]> {
	const { data, error } = await supabase
		.from("posts")
		.select("*")
		.eq("published", true)
		.neq("slug", slug)
		.order("date", { ascending: false });
	if (error) throw error;
	const posts = (data as PostRow[]).map(rowToPost);
	const same = posts.filter((p) => p.category === category);
	const others = posts.filter((p) => p.category !== category);
	return [...same, ...others].slice(0, limit);
}

/** All posts (published or not) for the admin dashboard. */
export async function listAllPosts(): Promise<(BlogPost & { published: boolean })[]> {
	const { data, error } = await supabase
		.from("posts")
		.select("*")
		.order("date", { ascending: false });
	if (error) throw error;
	return (data as PostRow[]).map((row) => ({
		...rowToPost(row),
		published: row.published,
	}));
}

export async function getPostForEdit(
	slug: string
): Promise<(BlogPost & { published: boolean }) | null> {
	const { data, error } = await supabase
		.from("posts")
		.select("*")
		.eq("slug", slug)
		.maybeSingle();
	if (error) throw error;
	if (!data) return null;
	const row = data as PostRow;
	return { ...rowToPost(row), published: row.published };
}

export async function createPost(input: PostInput): Promise<void> {
	const { error } = await supabase.from("posts").insert(inputToRow(input));
	if (error) throw error;
}

export async function updatePost(
	originalSlug: string,
	input: PostInput
): Promise<void> {
	const { error } = await supabase
		.from("posts")
		.update(inputToRow(input))
		.eq("slug", originalSlug);
	if (error) throw error;
}

export async function deletePost(slug: string): Promise<void> {
	const { error } = await supabase.from("posts").delete().eq("slug", slug);
	if (error) throw error;
}

/** Upload an image to the blog-images bucket; returns its public URL. */
export async function uploadImage(file: File): Promise<string> {
	if (!isSupabaseConfigured) {
		throw new Error("Supabase is not configured — set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
	}
	// Storage RLS requires a signed-in user; fail early with a clear message.
	const { data: auth } = await supabase.auth.getSession();
	if (!auth.session) {
		throw new Error("Your session has expired. Please sign in again before uploading.");
	}

	// Build a safe, unique object name (keep a lowercase extension only).
	const rawExt = file.name.split(".").pop()?.toLowerCase() ?? "";
	const ext = /^[a-z0-9]{1,5}$/.test(rawExt) ? rawExt : "jpg";
	const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

	const { error } = await supabase.storage
		.from(BUCKET)
		.upload(path, file, {
			cacheControl: "3600",
			upsert: false,
			contentType: file.type || undefined,
		});

	if (error) {
		// The most common setup mistake: the bucket's INSERT policy is missing,
		// so Supabase rejects every upload with an RLS error. Point the admin
		// straight at the fix instead of showing the raw message.
		if (/row-level security|violates|policy/i.test(error.message)) {
			throw new Error(
				"Upload blocked by Supabase storage security rules. Run " +
					"supabase/storage-policies.sql in the Supabase SQL editor, then try again."
			);
		}
		throw error;
	}

	const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
	return data.publicUrl;
}
