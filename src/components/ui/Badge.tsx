import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

const sizes = {
	sm: "px-2 py-0.5 text-[10px]",
	md: "px-3 py-1 text-[11px]",
} as const;

type BadgeProps = {
	children: ReactNode;
	/** Background colour (any CSS colour). Defaults to brand red. */
	color?: string;
	size?: keyof typeof sizes;
	className?: string;
};

/** Solid uppercase label, e.g. pinned to the corner of an image. */
export function Badge({ children, color = "var(--color-brand-red)", size = "md", className }: BadgeProps) {
	return (
		<span
			style={{ backgroundColor: color }}
			className={cn("inline-block rounded-full font-bold uppercase tracking-wider text-white", sizes[size], className)}
		>
			{children}
		</span>
	);
}

const tagTones = {
	blue: "bg-brand-blue/8 text-brand-blue",
	green: "bg-brand-green/10 text-brand-green",
	amber: "bg-amber-100 text-amber-800",
} as const;

type TagProps = {
	children: ReactNode;
	tone?: keyof typeof tagTones;
	size?: keyof typeof sizes;
	className?: string;
};

/** Soft-coloured chip for metadata (commitment, location, status). */
export function Tag({ children, tone = "blue", size = "md", className }: TagProps) {
	return (
		<span
			className={cn(
				"inline-block rounded-full font-semibold",
				size === "sm" ? "px-2 py-0.5 text-[10px] uppercase tracking-wide" : "px-3 py-1 text-xs",
				tagTones[tone],
				className,
			)}
		>
			{children}
		</span>
	);
}
