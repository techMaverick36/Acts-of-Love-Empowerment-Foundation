import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";
import { Badge } from "./Badge";

type MediaCardProps = {
	image: string;
	imageAlt: string;
	title: ReactNode;
	description: ReactNode;
	badge?: { label: ReactNode; color?: string };
	/** Small line above the title (date, read time). */
	meta?: ReactNode;
	/** Bottom row, separated by a hairline. */
	footer?: ReactNode;
	/** Makes the whole card a link. Don't combine with interactive elements in `footer`. */
	to?: string;
	headingLevel?: "h2" | "h3";
	className?: string;
};

/** Photo-topped card used for giving options and blog stories. */
export default function MediaCard({
	image,
	imageAlt,
	title,
	description,
	badge,
	meta,
	footer,
	to,
	headingLevel: Heading = "h3",
	className,
}: MediaCardProps) {
	const classes = cn(
		"group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow duration-300 hover:shadow-[0_22px_45px_-28px_rgba(32,68,135,0.5)]",
		className,
	);

	const body = (
		<>
			<div className="relative aspect-[16/10] overflow-hidden bg-surface">
				<img
					src={image}
					alt={imageAlt}
					loading="lazy"
					decoding="async"
					className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
				/>
				<div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/40" />
				{badge && (
					<Badge color={badge.color} className="absolute left-4 top-4">
						{badge.label}
					</Badge>
				)}
			</div>
			<div className="flex flex-1 flex-col p-6">
				{meta && <p className="mb-2 text-xs text-muted">{meta}</p>}
				<Heading className="mb-2 font-serif text-xl font-semibold text-ink transition-colors group-hover:text-brand-blue">
					{title}
				</Heading>
				<p className="mb-5 flex-1 text-sm leading-relaxed text-body">{description}</p>
				{footer && <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">{footer}</div>}
			</div>
		</>
	);

	return to ? (
		<Link to={to} className={classes}>
			{body}
		</Link>
	) : (
		<article className={classes}>{body}</article>
	);
}
