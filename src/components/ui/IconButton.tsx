import type { IconType } from "react-icons";
import { cn } from "../../lib/cn";
import Button, { type ButtonProps } from "./Button";

const tones = {
	/** Blue icon, soft grey hover — toolbars and admin rows. */
	plain: "rounded-lg text-brand-blue hover:bg-surface",
	/** Red icon for destructive actions. */
	danger: "rounded-lg text-brand-red hover:bg-red-50",
	/** Round chip on light backgrounds (share / social links). */
	chip: "rounded-full bg-surface text-brand-blue hover:bg-brand-blue hover:text-white",
	/** Square chip on the dark footer. */
	"chip-dark":
		"rounded-lg border border-white/10 bg-white/5 text-white hover:border-brand-red hover:bg-brand-red",
} as const;

const sizes = {
	sm: "size-8",
	md: "size-9",
	lg: "size-10",
} as const;

/** Omit that keeps each member of a union (button / router link / anchor) intact. */
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

type IconButtonProps = DistributiveOmit<ButtonProps, "variant" | "size" | "icon" | "trailingIcon" | "children"> & {
	/** Accessible name — also shown as a tooltip. Required: there is no visible text. */
	label: string;
	icon: IconType;
	tone?: keyof typeof tones;
	size?: keyof typeof sizes;
	iconSize?: number;
};

/** A button or link whose only content is an icon. */
export default function IconButton({
	label,
	icon: Icon,
	tone = "plain",
	size = "md",
	iconSize = 16,
	className,
	...rest
}: IconButtonProps) {
	return (
		<Button
			{...(rest as ButtonProps)}
			variant="ghost"
			aria-label={label}
			title={label}
			className={cn("inline-flex items-center justify-center transition-colors duration-200", sizes[size], tones[tone], className)}
		>
			<Icon aria-hidden size={iconSize} />
		</Button>
	);
}
