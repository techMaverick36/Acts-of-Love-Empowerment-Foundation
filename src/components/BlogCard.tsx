import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { type BlogPost, formatDate, categoryColors } from "../data/blogPosts";

export default function BlogCard({ post }: { post: BlogPost }) {
	return (
		<Link
			to={`/blog/${post.slug}`}
			className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col bg-white"
		>
			{/* Image */}
			<div className="relative h-52 overflow-hidden">
				<img
					src={post.image}
					alt={post.title}
					className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
				/>
				<div
					className="absolute inset-0"
					style={{
						background:
							"linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.42) 100%)",
					}}
				/>
				<span
					className="absolute top-4 left-4 text-[10px] tracking-wide font-extrabold px-3 py-1 rounded-full text-white shadow-sm uppercase"
					style={{ backgroundColor: categoryColors[post.category] }}
				>
					{post.category}
				</span>
			</div>

			{/* Content */}
			<div className="p-6 flex flex-col flex-1">
				<p className="text-xs mb-2" style={{ color: "#888" }}>
					{formatDate(post.date)} · {post.readTime}
				</p>
				<h3 className="font-serif text-xl font-bold mb-2 text-[#1D1E1F] transition-colors group-hover:text-[#204487]">
					{post.title}
				</h3>
				<p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "#4a4a4a" }}>
					{post.excerpt}
				</p>
				<span
					className="inline-flex items-center gap-2 text-sm font-semibold mt-auto pt-4 border-t border-gray-100"
					style={{ color: "#204487" }}
				>
					Read Story{" "}
					<FiArrowRight
						size={14}
						className="group-hover:translate-x-1 transition-transform"
					/>
				</span>
			</div>
		</Link>
	);
}
