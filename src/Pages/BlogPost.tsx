import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiHeart, FiMail } from "react-icons/fi";
import {
	FaFacebookF,
	FaXTwitter,
	FaLinkedinIn,
	FaWhatsapp,
} from "react-icons/fa6";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";
import {
	getPostBySlug,
	getRelatedPosts,
	formatDate,
	type BodyBlock,
} from "../data/blogPosts";

const impactStats = [
	{ val: "130+", label: "Lives directly reached" },
	{ val: "80+", label: "Households supported" },
	{ val: "2", label: "Communities served" },
];

const slugify = (s: string) =>
	s
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");

const initials = (name: string) =>
	name
		.trim()
		.split(/\s+/)
		.map((w) => w[0])
		.slice(0, 2)
		.join("")
		.toUpperCase();

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
				{block.items.map((item) => (
					<li key={item} className="pl-1" style={{ color: "#4a4a4a" }}>
						{item}
					</li>
				))}
			</ul>
		);
	if (block.type === "image") {
		const right = block.align === "right";
		return (
			<figure
				className={
					right
						? "my-6 lg:float-right lg:w-[46%] lg:ml-7 lg:mb-5"
						: "my-8 clear-both"
				}
			>
				<img
					src={block.src}
					alt={block.caption || ""}
					className="w-full h-auto rounded-2xl shadow-md"
				/>
				{block.caption && (
					<figcaption
						className={`mt-2.5 text-xs italic ${right ? "text-left" : "text-center"}`}
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
		<p className="text-lg leading-[1.9] mb-7" style={{ color: "#4a4a4a" }}>
			{block.text}
		</p>
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
					<a
						key={label}
						href={href}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={label}
						className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:text-white hover:bg-[#204487]"
						style={{ backgroundColor: "#f8f9fb", color: "#204487" }}
					>
						<Icon size={14} />
					</a>
				))}
			</div>
		</div>
	);
}

export default function BlogPostPage() {
	const { slug } = useParams<{ slug: string }>();
	const post = slug ? getPostBySlug(slug) : undefined;

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
						<Link
							to="/blog"
							className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full hover:opacity-90 transition-opacity"
							style={{ backgroundColor: "#204487" }}
						>
							<FiArrowLeft size={15} /> Back to the Journal
						</Link>
					</div>
				</section>
				<Footer />
			</div>
		);
	}

	const related = getRelatedPosts(post.slug);
	const shareUrl = typeof window !== "undefined" ? window.location.href : "";

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
					<Link
						to="/blog"
						className="inline-flex items-center gap-2 text-sm font-semibold mb-8 hover:opacity-80 transition-opacity"
						style={{ color: "#204487" }}
					>
						<FiArrowLeft size={15} /> Back to the Journal
					</Link>

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
						<article className="min-w-0">
							{post.body.map((block, i) => (
								<Block key={i} block={block} />
							))}

							{/* Inline CTA */}
							<div className="mt-12 pt-8 border-t border-gray-100 clear-both">
								<p className="text-base mb-5" style={{ color: "#4a4a4a" }}>
									Every story here is made possible by people who choose to give.
									You can be part of the next one.
								</p>
								<div className="flex flex-wrap gap-4">
									<Link
										to="/donate"
										className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full hover:opacity-90 transition-opacity"
										style={{ backgroundColor: "#D91E26" }}
									>
										<FiHeart size={15} /> Donate
									</Link>
									<Link
										to="/get-involved"
										className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full border-2 hover:bg-[#f8f9fb] transition-colors"
										style={{ borderColor: "#204487", color: "#204487" }}
									>
										Get Involved <FiArrowRight size={15} />
									</Link>
								</div>
							</div>
						</article>

						{/* RIGHT RAIL — subtle impact card */}
						<aside className="hidden lg:block lg:sticky lg:top-28 self-start">
							<div className="rounded-2xl border border-blue-100 p-6" style={{ backgroundColor: "#f8f9fb" }}>
								<p
									className="text-[11px] font-bold uppercase tracking-widest mb-5"
									style={{ color: "#888" }}
								>
									Our Impact So Far
								</p>
								<div className="flex flex-col gap-4">
									{impactStats.map((s, i) => (
										<div
											key={s.label}
											className={`flex items-baseline gap-3 ${
												i > 0 ? "pt-4 border-t border-blue-100" : ""
											}`}
										>
											<p
												className="font-serif text-2xl font-bold leading-none w-14 shrink-0"
												style={{ color: "#204487" }}
											>
												{s.val}
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
								<Link
									to="/donate"
									className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-[#D91E26]"
									style={{ color: "#204487" }}
								>
									<FiHeart size={14} style={{ color: "#D91E26" }} /> Support our
									work <FiArrowRight size={14} />
								</Link>
							</div>
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
						<Link
							to="/donate"
							className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white rounded-full hover:opacity-90 transition-opacity"
							style={{ backgroundColor: "#D91E26" }}
						>
							Donate <FiArrowRight size={16} />
						</Link>
						<Link
							to="/get-involved"
							className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white rounded-full border-2 hover:bg-white hover:text-[#08415C] transition-all duration-200"
							style={{ borderColor: "rgba(255,255,255,0.4)" }}
						>
							Get Involved <FiArrowRight size={16} />
						</Link>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
