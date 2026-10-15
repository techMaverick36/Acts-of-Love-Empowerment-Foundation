import { FiArrowRight } from "react-icons/fi";
import { categoryColors, formatDate, type BlogPost } from "../../data/blogPosts";
import MediaCard from "../ui/MediaCard";

export default function BlogCard({ post }: { post: BlogPost }) {
	return (
		<MediaCard
			to={`/blog/${post.slug}`}
			image={post.image}
			imageAlt={post.title}
			badge={{ label: post.category, color: categoryColors[post.category] }}
			meta={
				<>
					<time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readTime}
				</>
			}
			title={post.title}
			description={post.excerpt}
			footer={
				<span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue">
					Read Story
					<FiArrowRight aria-hidden size={14} className="transition-transform group-hover:translate-x-1" />
				</span>
			}
		/>
	);
}
