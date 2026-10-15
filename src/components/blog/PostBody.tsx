import type { BodyBlock } from "../../data/blogPosts";
import { cn } from "../../lib/cn";
import { sanitizeRichText } from "../../lib/sanitize";

const slugify = (s: string) =>
	s
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");

function Block({ block }: { block: BodyBlock }) {
	switch (block.type) {
		case "h2":
			return (
				<h2 id={slugify(block.text)} className="clear-both mb-4 mt-10 font-serif text-2xl font-semibold text-brand-blue md:text-3xl">
					{block.text}
				</h2>
			);
		case "ul":
			return (
				<ul className="mb-7 list-disc space-y-2.5 pl-6">
					{block.items.map((item, i) => (
						<li key={i} className="pl-1 text-body" dangerouslySetInnerHTML={{ __html: sanitizeRichText(item) }} />
					))}
				</ul>
			);
		case "image": {
			const floated = block.align === "right" || block.align === "left";
			return (
				<figure
					className={cn(
						block.align === "right" && "my-6 lg:float-right lg:mb-5 lg:ml-7 lg:w-[46%]",
						block.align === "left" && "my-6 lg:float-left lg:mb-5 lg:mr-7 lg:w-[46%]",
						!floated && "clear-both my-8",
					)}
				>
					<img src={block.src} alt={block.caption || ""} loading="lazy" className="h-auto w-full rounded-2xl shadow-md" />
					{block.caption && (
						<figcaption className={cn("mt-2.5 text-xs italic text-muted", floated ? "text-left" : "text-center")}>
							{block.caption}
						</figcaption>
					)}
				</figure>
			);
		}
		case "quote":
			return (
				<blockquote className="clear-both my-10 border-l-4 border-brand-orange pl-6 font-serif text-2xl italic leading-snug text-brand-blue md:text-3xl">
					{block.text}
				</blockquote>
			);
		default:
			return (
				<p
					className="mb-7 text-lg leading-[1.9] text-body"
					dangerouslySetInnerHTML={{ __html: sanitizeRichText(block.text) }}
				/>
			);
	}
}

/** Renders a post's content blocks. Rich text is sanitized before display. */
export default function PostBody({ blocks }: { blocks: BodyBlock[] }) {
	return (
		<div className="post-rich">
			{blocks.map((block, i) => (
				<Block key={i} block={block} />
			))}
		</div>
	);
}
