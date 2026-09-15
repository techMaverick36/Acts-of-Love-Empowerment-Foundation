import Button from "../components/Button";
import { useParams } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiHeart, FiMail } from "react-icons/fi";
import {
	FaFacebookF,
	FaXTwitter,
	FaLinkedinIn,
	FaWhatsapp,
} from "react-icons/fa6";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";
import { formatDate, type BlogPost, type BodyBlock } from "../data/blogPosts";
import { getPublishedPost, listRelatedPosts } from "../lib/posts";
import DOMPurify from "dompurify";

const initials = (name: string) =>
	name
		.trim()
		.split(/\s+/)
		.map((w) => w[0])
		.slice(0, 2)
		.join("")
		.toUpperCase();

const slugify = (s: string) =>
	s
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");

function Block({ block }: { block: BodyBlock }) {
	if (block.type === "h2")
		return (
			<h2
				id={slugify(block.text)}
				className="font-serif text-2xl md:text-3xl font-bold mt-10 mb-4 scroll-mt-28 clear-both"
				style={{ color: "#204487" }}
			>
				{block.text}
			</h2>
		);
	if (block.type === "ul")
		return (
			<ul className="list-disc pl-6 mb-7 space-y-2.5">
				{block.items.map((item, i) => (
					<li
						key={i}
						className="pl-1"
						style={{ color: "#4a4a4a" }}
						dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item) }}
					/>
				))}
			</ul>
		);
	if (block.type === "image") {
		const floated = block.align === "right" || block.align === "left";
		const figureClass =
			block.align === "right"
				? "my-6 lg:float-right lg:w-[46%] lg:ml-7 lg:mb-5"
				: block.align === "left"
					? "my-6 lg:float-left lg:w-[46%] lg:mr-7 lg:mb-5"
					: "my-8 clear-both";
		return (
			<figure className={figureClass}>
				<img
					src={block.src}
					alt={block.caption || ""}
					className="w-full h-auto rounded-2xl shadow-md"
				/>
				{block.caption && (
					<figcaption
						className={`mt-2.5 text-xs italic ${floated ? "text-left" : "text-center"}`}
						style={{ color: "#888" }}
					>
						{block.caption}
					</figcaption>
				)}
			</figure>
		);
	}
	if (block.type === "quote")
		return (
			<blockquote
				className="my-10 pl-6 border-l-4 font-serif text-2xl md:text-3xl leading-snug italic clear-both"
				style={{ borderColor: "#F26421", color: "#204487" }}
			>
				{block.text}
			</blockquote>
		);
	return (
		<p
			className="text-lg leading-[1.9] mb-7"
			style={{ color: "#4a4a4a" }}
			dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(block.text) }}
		/>
	);
}

function ShareBar({ url, title }: { url: string; title: string }) {
	const u = encodeURIComponent(url);
	const t = encodeURIComponent(title);
	const links = [
		{ Icon: FaFacebookF, label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
		{ Icon: FaXTwitter, label: "Share on X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
		{ Icon: FaLinkedinIn, label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
		{ Icon: FaWhatsapp, label: "Share on WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
		{ Icon: FiMail, label: "Share by email", href: `mailto:?subject=${t}&body=${u}` },
	];
	return (
		<div>
			<p
				className="text-[11px] font-bold uppercase tracking-widest mb-2.5"
				style={{ color: "#888" }}
			>
				Share
			</p>
			<div className="flex flex-wrap gap-2">
				{links.map(({ Icon, label, href }) => (
					<Button variant="ghost"
						key={label}
						href={href}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={label}
						className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:text-white hover:bg-[#204487]"
						style={{ backgroundColor: "#f8f9fb", color: "#204487" }}
					>
						<Icon size={14} />
					</Button>
				))}
			</div>
		</div>
	);
}

export default function BlogPostPage() {
	const { slug } = useParams<{ slug: string }>();
	const [post, setPost] = useState<BlogPost | null>(null);
	const [related, setRelated] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState(true);
	const shareUrl = typeof window !== "undefined" ? window.location.href : "";

	useEffect(() => {
		if (!slug) {
			setLoading(false);
			return;
		}
		setLoading(true);
		getPublishedPost(slug)
			.then(async (p) => {
				setPost(p);
				if (p) setRelated(await listRelatedPosts(p.slug, p.category));
			})
			.catch(() => setPost(null))
			.finally(() => setLoading(false));
	}, [slug]);

	if (loading) {
		return (
			<div>
				<Navbar />
				<div className="min-h-[70vh] flex items-center justify-center bg-white pt-20">
					<p className="text-sm" style={{ color: "#888" }}>
						Loading…
					</p>
				</div>
				<Footer />
			</div>
		);
	}

	if (!post) {
		return (
			<div>
				<Navbar />
				<section className="min-h-[70vh] flex items-center justify-center bg-white pt-20">
					<div className="text-center px-6 max-w-lg">
						<p
							className="text-sm font-semibold tracking-widest uppercase mb-3"
							style={{ color: "#D91E26" }}
						>
							Story Not Found
						</p>
						<h1
							className="font-serif text-4xl font-bold mb-4"
							style={{ color: "#204487" }}
						>
							We couldn't find that story
						</h1>
						<p className="text-base mb-8" style={{ color: "#4a4a4a" }}>
							The article you're looking for may have moved or no longer exists.
						</p>
						<Button variant="secondary" size="custom" effect="elevated"
							to="/blog"
							className="px-7 py-3.5 text-sm"
						>
							<FiArrowLeft size={15} /> Back to the Journal
						</Button>
					</div>
				</section>
				<Footer />
			</div>
		);
	}

	return (
		<div>
			<Navbar />

			{/* ── COVER HERO ── */}
			<section className="relative min-h-[60vh] md:h-[55vh] flex items-center justify-center text-center overflow-hidden">
				<img
					src={post.image}
					alt={post.title}
					className="absolute inset-0 w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/75" />

				<div className="relative z-10 px-6 max-w-3xl pt-20">
					<p className="uppercase tracking-[0.3em] text-xs mb-4 font-semibold text-[#F26421]">
						{post.category} · {post.readTime}
					</p>
					<h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-snug sm:leading-tight">
						{post.title}
					</h1>
				</div>
			</section>

			{/* ── ARTICLE BODY (share rail + article + impact card) ── */}
			<section className="py-14 md:py-20 bg-white">
				<div className="max-w-7xl mx-auto px-6">
					<Button variant="ghost"
						to="/blog"
						className="inline-flex items-center gap-2 text-sm font-semibold mb-8 hover:opacity-80 transition-opacity"
						style={{ color: "#204487" }}
					>
						<FiArrowLeft size={15} /> Back to the Journal
					</Button>

					<div className="grid lg:grid-cols-[190px_minmax(0,1fr)_250px] gap-x-12 gap-y-8">
						{/* LEFT RAIL — author + share */}
						<aside className="lg:sticky lg:top-28 self-start">
							<div className="flex flex-row lg:flex-col gap-6 items-start justify-between border-b lg:border-b-0 border-gray-100 pb-6 lg:pb-0">
								<div className="flex items-center gap-3">
									{post.author.avatar ? (
										<img
											src={post.author.avatar}
											alt={post.author.name}
											className="w-11 h-11 rounded-full object-cover border border-gray-100 shrink-0"
										/>
									) : (
										<div
											className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white text-sm font-bold"
											style={{ backgroundColor: "#204487" }}
											aria-hidden="true"
										>
											{initials(post.author.name)}
										</div>
									)}
									<div>
										<p className="text-sm font-bold" style={{ color: "#1D1E1F" }}>
											{post.author.name}
										</p>
										{post.author.role && (
											<p className="text-xs" style={{ color: "#888" }}>
												{post.author.role}
											</p>
										)}
										<p className="text-xs" style={{ color: "#888" }}>
											{formatDate(post.date)}
										</p>
									</div>
								</div>
								<ShareBar url={shareUrl} title={post.title} />
							</div>
						</aside>

						{/* CENTER — article */}
						<article className="min-w-0 post-rich">
							{post.body.map((block, i) => (
								<Block key={i} block={block} />
							))}

						
						</article>

						{/* RIGHT RAIL — subtle impact card */}
						<aside className="hidden lg:block lg:sticky lg:top-28 self-start">
							{post.impactStats.length > 0 && (
							<div className="rounded-2xl border border-blue-100 p-6" style={{ backgroundColor: "#f8f9fb" }}>
								<p
									className="text-[11px] font-bold uppercase tracking-widest mb-5"
									style={{ color: "#888" }}
								>
									Our Impact So Far
								</p>
								<div className="flex flex-col gap-4">
									{post.impactStats.map((s, i) => (
										<div
											key={i}
											className={`flex items-baseline gap-3 ${
												i > 0 ? "pt-4 border-t border-blue-100" : ""
											}`}
										>
											<p
												className="font-serif text-2xl font-bold leading-none w-14 shrink-0"
												style={{ color: "#204487" }}
											>
												{s.value}
											</p>
											<p
												className="text-xs leading-snug"
												style={{ color: "#888" }}
											>
												{s.label}
											</p>
										</div>
									))}
								</div>
								<Button variant="ghost"
									to="/donate"
									className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-[#D91E26]"
									style={{ color: "#204487" }}
								>
									<FiHeart size={14} style={{ color: "#D91E26" }} /> Support our
									work <FiArrowRight size={14} />
								</Button>
							</div>
							)}
						</aside>
					</div>
				</div>
			</section>

			{/* ── RELATED ── */}
			{related.length > 0 && (
				<section className="py-20" style={{ backgroundColor: "#f8f9fb" }}>
					<div className="max-w-7xl mx-auto px-6">
						<div className="text-center max-w-2xl mx-auto mb-12">
							<p
								className="text-sm font-semibold tracking-widest uppercase mb-3"
								style={{ color: "#D91E26" }}
							>
								Keep Reading
							</p>
							<h2
								className="font-serif text-4xl font-bold mb-4"
								style={{ color: "#204487" }}
							>
								More Stories
							</h2>
							<div
								className="w-14 h-1 rounded mx-auto"
								style={{ backgroundColor: "#F26421" }}
							/>
						</div>
						<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
							{related.map((r) => (
								<BlogCard key={r.slug} post={r} />
							))}
						</div>
					</div>
				</section>
			)}

			{/* ── CTA BAND ── */}
			<section className="py-20" style={{ backgroundColor: "#08415C" }}>
				<div className="max-w-3xl mx-auto px-6 text-center">
					<div className="flex justify-center mb-6">
						<span className="h-px w-16 bg-[#639E90]" />
					</div>
					<h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-5">
						Be Part of the Next Story
					</h2>
					<p
						className="text-base leading-relaxed mb-10"
						style={{ color: "rgba(255,255,255,0.75)" }}
					>
						Your gift, time, or partnership can help a child stay in school, a
						family reach care, or a community receive practical support.
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<Button variant="primary" size="lg" effect="raised"
							to="/donate"
						>
							Donate <FiArrowRight size={16} />
						</Button>
						<Button variant="transparent" size="lg" effect="custom"
							to="/get-involved"
							className="hover:bg-white hover:text-[#08415C] transition-all duration-200"
							style={{ borderColor: "rgba(255,255,255,0.4)" }}
						>
							Get Involved <FiArrowRight size={16} />
						</Button>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
