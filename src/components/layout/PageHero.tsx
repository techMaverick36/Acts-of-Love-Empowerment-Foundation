import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Eyebrow } from "../ui/SectionHeading";

type PageHeroProps = {
	image: string;
	imageAlt: string;
	eyebrow: ReactNode;
	title: ReactNode;
	/** Second part of the title, set in the teal accent colour. */
	highlight?: ReactNode;
	/** `block` puts the highlight on its own line; `inline` keeps it in the sentence (italic). */
	highlightLayout?: "block" | "inline";
	description?: ReactNode;
};

/** Full-bleed photo header with the page's <h1>. Used at the top of every inner page. */
export default function PageHero({
	image,
	imageAlt,
	eyebrow,
	title,
	highlight,
	highlightLayout = "block",
	description,
}: PageHeroProps) {
	return (
		<section className="relative isolate flex min-h-[28rem] items-center justify-center overflow-hidden pb-16 pt-[calc(var(--spacing-header)+3rem)] text-center md:min-h-[32rem] lg:pt-[calc(var(--spacing-header-lg)+3rem)]">
			<img
				src={image}
				alt={imageAlt}
				fetchPriority="high"
				className="absolute inset-0 -z-20 size-full object-cover"
			/>
			<div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/75" />

			<div className="max-w-3xl px-6">
				<Eyebrow tone="orange" className="mb-5 justify-center">
					{eyebrow}
				</Eyebrow>
				<h1 className="mb-5 break-words font-serif text-4xl leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
					{title}
					{highlight && highlightLayout === "inline" && (
						<>
							{" "}
							<span className="italic text-brand-teal">{highlight}</span>
						</>
					)}
					{highlight && highlightLayout === "block" && <span className="block text-brand-teal">{highlight}</span>}
				</h1>
				{description && (
					<p className={cn("mx-auto max-w-xl text-base text-gray-200 md:text-lg")}>{description}</p>
				)}
			</div>
		</section>
	);
}
