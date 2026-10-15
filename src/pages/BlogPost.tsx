import { useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiHeart } from "react-icons/fi";
import { useParams } from "react-router-dom";
import BlogCard from "../components/blog/BlogCard";
import PostBody from "../components/blog/PostBody";
import ShareBar from "../components/blog/ShareBar";
import CtaBand from "../components/layout/CtaBand";
import PageLayout from "../components/layout/PageLayout";
import Section from "../components/layout/Section";
import Button from "../components/ui/Button";
import SectionHeading, { Eyebrow } from "../components/ui/SectionHeading";
import StatusMessage from "../components/ui/StatusMessage";
import { PAGES } from "../config/seo";
import { formatDate, type BlogPost } from "../data/blogPosts";
import { getPublishedPost, listRelatedPosts } from "../lib/posts";
import { getPrerenderData } from "../lib/prerenderData";
import { absoluteUrl, blogPostingJsonLd, breadcrumbJsonLd } from "../lib/structuredData";

const initials = (name: string) =>
	name
		.trim()
		.split(/\s+/)
		.map((w) => w[0])
		.slice(0, 2)
		.join("")
		.toUpperCase();

/** Route entry: remounts the article whenever the slug changes, so state never leaks between posts. */
export default function BlogPostPage() {
	const { slug = "" } = useParams<{ slug: string }>();
	return <BlogPostArticle key={slug} slug={slug} />;
}

function BlogPostArticle({ slug }: { slug: string }) {
	const seeded = getPrerenderData().post?.slug === slug ? getPrerenderData() : null;
	const [post, setPost] = useState<BlogPost | null>(seeded?.post ?? null);
	const [related, setRelated] = useState<BlogPost[]>(seeded?.related ?? []);
	const [loading, setLoading] = useState(!seeded);

	useEffect(() => {
		getPublishedPost(slug)
			.then(async (p) => {
				setPost(p);
				if (p) setRelated(await listRelatedPosts(p.slug, p.category));
			})
			// On failure keep what we have (the prerendered copy, or nothing → "not found").
			.catch(() => {})
			.finally(() => setLoading(false));
	}, [slug]);

	const path = `/blog/${slug}`;

	if (loading) {
		return (
			<PageLayout seo={{ ...PAGES.blog, path }} offsetHeader>
				<div className="flex min-h-[70vh] items-center justify-center bg-white">
					<p className="text-sm text-muted">Loading…</p>
				</div>
			</PageLayout>
		);
	}

	if (!post) {
		return (
			<PageLayout seo={{ ...PAGES.notFound, path }} offsetHeader>
				<StatusMessage
					eyebrow="Story Not Found"
					title="We couldn't find that story"
					action={
						<Button to="/blog" variant="secondary" icon={FiArrowLeft}>
							Back to the Journal
						</Button>
					}
				>
					The article you're looking for may have moved or no longer exists.
				</StatusMessage>
			</PageLayout>
		);
	}

	return (
		<PageLayout
			seo={{
				path,
				title: post.title,
				description: post.excerpt,
				image: post.image,
				type: "article",
				publishedTime: post.date,
				jsonLd: [
					blogPostingJsonLd(post),
					breadcrumbJsonLd([
						{ name: "Home", path: "/" },
						{ name: "Blog", path: "/blog" },
						{ name: post.title, path },
					]),
				],
			}}
		>
			{/* ── COVER ── */}
			<section className="relative isolate flex min-h-[28rem] items-center justify-center overflow-hidden pb-16 pt-[calc(var(--spacing-header)+3rem)] text-center md:min-h-[32rem] lg:pt-[calc(var(--spacing-header-lg)+3rem)]">
				<img src={post.image} alt={post.title} fetchPriority="high" className="absolute inset-0 -z-20 size-full object-cover" />
				<div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/75 via-black/55 to-black/75" />
				<div className="max-w-3xl px-6">
					<Eyebrow tone="orange" className="mb-5 justify-center">
						{post.category} · {post.readTime}
					</Eyebrow>
					<h1 className="font-serif text-4xl leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">{post.title}</h1>
				</div>
			</section>

			{/* ── ARTICLE (author + share rail · body · impact card) ── */}
			<Section spacing="md" className="md:py-20">
				<div className="mb-8">
					<Button to="/blog" variant="link" icon={FiArrowLeft} className="text-sm">
						Back to the Journal
					</Button>
				</div>

				<div className="grid gap-x-12 gap-y-8 lg:grid-cols-[190px_minmax(0,1fr)_250px]">
					<aside className="self-start lg:sticky lg:top-32">
						<div className="flex flex-row items-start justify-between gap-6 border-b border-line pb-6 lg:flex-col lg:border-b-0 lg:pb-0">
							<div className="flex items-center gap-3">
								{post.author.avatar ? (
									<img src={post.author.avatar} alt={post.author.name} className="size-11 shrink-0 rounded-full border border-line object-cover" />
								) : (
									<span aria-hidden className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-blue text-sm font-bold text-white">
										{initials(post.author.name)}
									</span>
								)}
								<div>
									<p className="text-sm font-bold text-ink">{post.author.name}</p>
									{post.author.role && <p className="text-xs text-muted">{post.author.role}</p>}
									<p className="text-xs text-muted">
										<time dateTime={post.date}>{formatDate(post.date)}</time>
									</p>
								</div>
							</div>
							<ShareBar url={absoluteUrl(path)} title={post.title} />
						</div>
					</aside>

					<article className="min-w-0">
						<PostBody blocks={post.body} />
					</article>

					<aside className="hidden self-start lg:sticky lg:top-32 lg:block">
						{post.impactStats.length > 0 && (
							<div className="rounded-2xl border border-line bg-surface p-6">
								<p className="mb-5 text-[11px] font-bold uppercase tracking-widest text-muted">Our Impact So Far</p>
								<ul className="flex flex-col divide-y divide-line">
									{post.impactStats.map((s, i) => (
										<li key={i} className="flex items-baseline gap-3 py-4 first:pt-0">
											<p className="w-14 shrink-0 font-serif text-2xl font-semibold leading-none text-brand-blue">{s.value}</p>
											<p className="text-xs leading-snug text-muted">{s.label}</p>
										</li>
									))}
								</ul>
								<Button to="/donate" variant="link" icon={FiHeart} trailingIcon={FiArrowRight} className="mt-2 text-sm [&>svg:first-child]:text-brand-red">
									Support our work
								</Button>
							</div>
						)}
					</aside>
				</div>
			</Section>

			{related.length > 0 && (
				<Section tone="surface">
					<SectionHeading size="md" eyebrow="Keep Reading" title="More Stories" className="mb-12" />
					<div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
						{related.map((r) => (
							<BlogCard key={r.slug} post={r} />
						))}
					</div>
				</Section>
			)}

			<CtaBand
				title="Be Part of the Next Story"
				description="Your gift, time, or partnership can help a child stay in school, a family reach care, or a community receive practical support."
				actions={
					<>
						<Button to="/donate" size="lg" trailingIcon={FiArrowRight}>
							Donate
						</Button>
						<Button to="/get-involved" variant="outline-light" size="lg" trailingIcon={FiArrowRight}>
							Get Involved
						</Button>
					</>
				}
			/>
		</PageLayout>
	);
}
