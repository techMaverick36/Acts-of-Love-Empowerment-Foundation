import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import { cn } from "../../lib/cn";

const sizes = {
	sm: { box: "size-9 rounded-lg", icon: 16 },
	md: { box: "size-11 rounded-xl", icon: 20 },
	lg: { box: "size-14 rounded-xl", icon: 24 },
} as const;

type IconTileProps = {
	icon: IconType;
	/** Any CSS colour; defaults to brand blue. */
	accent?: string;
	/** `tint`: soft background, coloured icon. `solid`: filled, white icon. `glass`: for dark backgrounds. */
	variant?: "tint" | "solid" | "glass";
	size?: keyof typeof sizes;
	className?: string;
};

/** Decorative icon in a rounded square, coloured by `accent`. */
export default function IconTile({
	icon: Icon,
	accent = "var(--color-brand-blue)",
	variant = "tint",
	size = "md",
	className,
}: IconTileProps) {
	const { box, icon } = sizes[size];
	return (
		<span
			aria-hidden
			style={{ "--accent": accent } as CSSProperties}
			className={cn(
				"inline-flex shrink-0 items-center justify-center",
				box,
				variant === "tint" && "bg-(--accent)/10 text-(--accent)",
				variant === "solid" && "bg-(--accent) text-white",
				variant === "glass" && "rounded-full bg-white/10 text-white",
				className,
			)}
		>
			<Icon size={icon} />
		</span>
	);
}
