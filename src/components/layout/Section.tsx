import type { CSSProperties, ReactNode } from "react";
import { cn } from "../../lib/cn";

const widths = {
	default: "max-w-7xl",
	wide: "max-w-6xl",
	medium: "max-w-4xl",
	narrow: "max-w-3xl",
} as const;

type ContainerProps = {
	width?: keyof typeof widths;
	className?: string;
	children: ReactNode;
};

/** Centred page-width wrapper with the standard side gutter. */
export function Container({ width = "default", className, children }: ContainerProps) {
	return <div className={cn("mx-auto w-full px-6", widths[width], className)}>{children}</div>;
}

const tones = {
	white: "bg-white",
	surface: "bg-surface",
	navy: "bg-brand-navy text-white",
	blue: "bg-brand-blue text-white",
} as const;

type SectionProps = {
	id?: string;
	tone?: keyof typeof tones;
	width?: keyof typeof widths;
	/** Vertical padding. */
	spacing?: "md" | "lg";
	className?: string;
	containerClassName?: string;
	style?: CSSProperties;
	"aria-labelledby"?: string;
	children: ReactNode;
};

/** A full-width page band with consistent background and vertical rhythm. */
export default function Section({
	id,
	tone = "white",
	width,
	spacing = "lg",
	className,
	containerClassName,
	style,
	children,
	...aria
}: SectionProps) {
	return (
		<section
			id={id}
			style={style}
			className={cn(tones[tone], spacing === "lg" ? "py-20 md:py-24" : "py-14 md:py-16", className)}
			{...aria}
		>
			<Container width={width} className={containerClassName}>
				{children}
			</Container>
		</section>
	);
}
