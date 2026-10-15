import type { CSSProperties, ReactNode } from "react";
import { cn } from "../../lib/cn";

type CardProps = {
	/** `white` on surface sections, `surface` on white sections. */
	tone?: "white" | "surface";
	padding?: "md" | "lg";
	/** Lift the shadow on hover (for cards that contain a link). */
	interactive?: boolean;
	as?: "div" | "article" | "li";
	className?: string;
	style?: CSSProperties;
	children: ReactNode;
};

/** Bordered rounded panel — the base for every content card. */
export default function Card({
	tone = "white",
	padding = "lg",
	interactive,
	as: Tag = "div",
	className,
	style,
	children,
}: CardProps) {
	return (
		<Tag
			style={style}
			className={cn(
				"rounded-2xl border border-line",
				tone === "white" ? "bg-white" : "bg-surface",
				padding === "lg" ? "p-7 md:p-8" : "p-6",
				interactive && "transition-shadow duration-300 hover:shadow-[0_18px_40px_-24px_rgba(32,68,135,0.45)]",
				className,
			)}
		>
			{children}
		</Tag>
	);
}
