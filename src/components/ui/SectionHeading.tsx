import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

const eyebrowTones = {
	red: "text-brand-red",
	orange: "text-brand-orange",
	teal: "text-brand-teal",
	light: "text-white/60",
} as const;

type EyebrowProps = {
	children: ReactNode;
	tone?: keyof typeof eyebrowTones;
	/** Short rule before the text. */
	rule?: boolean;
	className?: string;
};

/** Small uppercase label that sits above a heading. */
export function Eyebrow({ children, tone = "red", rule = true, className }: EyebrowProps) {
	return (
		<p
			className={cn(
				"flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em]",
				eyebrowTones[tone],
				className,
			)}
		>
			{rule && <span aria-hidden className="h-px w-8 bg-current opacity-60" />}
			{children}
		</p>
	);
}

type SectionHeadingProps = {
	eyebrow?: ReactNode;
	eyebrowTone?: EyebrowProps["tone"];
	title: ReactNode;
	intro?: ReactNode;
	align?: "left" | "center";
	/** `light` renders white text for dark backgrounds. */
	theme?: "default" | "light";
	size?: "md" | "lg";
	as?: "h1" | "h2";
	className?: string;
};

/** Eyebrow + heading + optional intro paragraph, used at the top of a section. */
export default function SectionHeading({
	eyebrow,
	eyebrowTone,
	title,
	intro,
	align = "center",
	theme = "default",
	size = "lg",
	as: Heading = "h2",
	className,
}: SectionHeadingProps) {
	const centered = align === "center";
	const light = theme === "light";
	return (
		<div className={cn(centered && "mx-auto max-w-2xl text-center", className)}>
			{eyebrow && (
				<Eyebrow
					tone={eyebrowTone ?? (light ? "teal" : "red")}
					className={cn("mb-4", centered && "justify-center")}
				>
					{eyebrow}
				</Eyebrow>
			)}
			<Heading
				className={cn(
					"font-serif font-semibold leading-tight tracking-tight",
					size === "lg" ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl",
					light ? "text-white" : "text-brand-blue",
				)}
			>
				{title}
			</Heading>
			{intro && (
				<p className={cn("mt-5 text-base leading-relaxed md:text-lg", light ? "text-white/75" : "text-body")}>
					{intro}
				</p>
			)}
		</div>
	);
}
