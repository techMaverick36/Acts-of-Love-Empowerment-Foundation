import Button from "../components/Button";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";
import { listPublishedPosts } from "../lib/posts";
import { categories, type BlogPost } from "../data/blogPosts";

export default function BlogPage() {
	const [active, setActive] = useState<(typeof categories)[number]>("All");
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		listPublishedPosts()
			.then(setPosts)
			.catch((e) =>
				setError(
					e instanceof Error ? e.message : "Stories couldn't be loaded right now."
				)
			)
			.finally(() => setLoading(false));
	}, []);

	const filtered =
		active === "All" ? posts : posts.filter((p) => p.category === active);

	return (
		<div>
			<Navbar />

			{/* ── PAGE HERO ── */}
			<section className="relative min-h-[60vh] md:h-[50vh] flex items-center justify-center text-center overflow-hidden py-20 sm:py-24">
				<img
					src="/D-4231r_51.jpg"
					alt="Acts of Love Foundation team with the community"
					className="absolute inset-0 w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

				<div className="relative z-10 px-6 max-w-3xl">
					<p className="uppercase tracking-[0.3em] text-xs mb-4 font-semibold text-[#F26421]">
						The Journal
					</p>
					<h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-snug sm:leading-tight mb-4">
						Stories From the Field
						<span className="block text-[#639E90]">and the Work We Do</span>
					</h1>
					<p className="text-gray-200 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
						Updates from our outreach missions, reflections on the work, and the
						thinking that guides how we serve communities across Uganda.
					</p>
				</div>
			</section>

			{/* ── STORIES ── */}
			<section className="py-20" style={{ backgroundColor: "#f8f9fb" }}>
				<div className="max-w-7xl mx-auto px-6">
					{/* Section heading */}
					<div className="text-center max-w-2xl mx-auto mb-12">
						<p
							className="text-sm font-semibold tracking-widest uppercase mb-3"
							style={{ color: "#D91E26" }}
						>
							Latest Stories
						</p>
						<h2
							className="font-serif text-4xl md:text-5xl font-bold mb-4"
							style={{ color: "#204487" }}
						>
							From the Journal
						</h2>
						<div
							className="w-14 h-1 rounded mx-auto"
							style={{ backgroundColor: "#F26421" }}
						/>
					</div>

					{/* Filters (shown once there is more than one story) */}
					{posts.length > 1 && (
						<div
							className="flex flex-wrap justify-center gap-3 mb-12"
							role="group"
							aria-label="Filter articles by category"
						>
							{categories.map((c) => (
								<Button variant="ghost"
									key={c}
									type="button"
									onClick={() => setActive(c)}
									aria-pressed={active === c}
									className={`px-5 py-2.5 text-sm font-semibold rounded-full border-2 transition-all ${
										active === c
											? "border-[#204487] bg-[#204487]/5 text-[#204487]"
											: "border-gray-200 text-gray-600 hover:border-gray-300 bg-white"
									}`}
								>
									{c}
								</Button>
							))}
						</div>
					)}

					{/* States */}
					{loading ? (
						<p className="text-center text-base py-10" style={{ color: "#888" }}>
							Loading stories…
						</p>
					) : error ? (
						<p className="text-center text-base py-10" style={{ color: "#991b1b" }}>
							{error}
						</p>
					) : filtered.length === 0 ? (
						<p
							className="text-center text-base py-10"
							style={{ color: "#4a4a4a" }}
						>
							{posts.length === 0
								? "No stories published yet — please check back soon."
								: "No stories in this category yet."}
						</p>
					) : (
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{filtered.map((post) => (
								<BlogCard key={post.slug} post={post} />
							))}
						</div>
					)}
				</div>
			</section>

			<Footer />
		</div>
	);
}
