import { useEffect, useState } from "react";
import BlogCard from "../components/blog/BlogCard";
import PageHero from "../components/layout/PageHero";
import PageLayout from "../components/layout/PageLayout";
import Section from "../components/layout/Section";
import { ChoiceChip } from "../components/ui/ChoiceChip";
import SectionHeading from "../components/ui/SectionHeading";
import { PAGES } from "../config/seo";
import { categories, type BlogPost } from "../data/blogPosts";
import { listPublishedPosts } from "../lib/posts";
import { getPrerenderData } from "../lib/prerenderData";

export default function BlogPage() {
	// Start from the posts baked in at build time (if any), then refresh.
	const [posts, setPosts] = useState<BlogPost[]>(() => getPrerenderData().posts ?? []);
	const [loading, setLoading] = useState(() => !getPrerenderData().posts);
	const [error, setError] = useState<string | null>(null);
	const [active, setActive] = useState<(typeof categories)[number]>("All");

	useEffect(() => {
		listPublishedPosts()
			.then(setPosts)
			.catch((e) => setError(e instanceof Error ? e.message : "Stories couldn't be loaded right now."))
			.finally(() => setLoading(false));
	}, []);

	const filtered = active === "All" ? posts : posts.filter((p) => p.category === active);

	let content;
	if (loading) {
		content = <p className="py-10 text-center text-base text-muted">Loading stories…</p>;
	} else if (error && posts.length === 0) {
		content = <p className="py-10 text-center text-base text-red-800">{error}</p>;
	} else if (filtered.length === 0) {
		content = (
			<p className="py-10 text-center text-base text-body">
				{posts.length === 0 ? "No stories published yet — please check back soon." : "No stories in this category yet."}
			</p>
		);
	} else {
		content = (
			<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{filtered.map((post) => (
					<BlogCard key={post.slug} post={post} />
				))}
			</div>
		);
	}

	return (
		<PageLayout seo={PAGES.blog}>
			<PageHero
				image="/D-4231r_51.jpg"
				imageAlt="Acts of Love Foundation team with the community"
				eyebrow="The Journal"
				title="Stories From the Field"
				highlight="and the Work We Do"
				description="Updates from our outreach missions, reflections on the work, and the thinking that guides how we serve communities across Uganda."
			/>

			<Section tone="surface">
				<SectionHeading eyebrow="Latest Stories" title="From the Journal" className="mb-12" />

				{posts.length > 1 && (
					<div role="group" aria-label="Filter articles by category" className="mb-12 flex flex-wrap justify-center gap-3">
						{categories.map((c) => (
							<ChoiceChip key={c} selected={active === c} onSelect={() => setActive(c)} className="px-5">
								{c}
							</ChoiceChip>
						))}
					</div>
				)}

				{content}
			</Section>
		</PageLayout>
	);
}
