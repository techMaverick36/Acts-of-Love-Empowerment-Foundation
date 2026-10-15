import type { ComponentPropsWithRef, ReactNode } from "react";
import type { IconType } from "react-icons";
import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";

const base =
	"group/btn inline-flex items-center justify-center gap-2 font-semibold text-center transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
	/** Brand red — donations and the main call to action. */
	primary:
		"rounded-full bg-brand-red text-white shadow-[0_10px_22px_-12px_rgba(217,30,38,0.7)] hover:bg-brand-red-dark",
	/** Brand blue — secondary actions and admin forms. */
	secondary: "rounded-full bg-brand-blue text-white hover:bg-brand-blue-dark",
	/** Filled with the nearest `--accent` CSS variable (program colours). */
	accent: "rounded-full bg-(--accent) text-white hover:brightness-90",
	/** Blue outline on light backgrounds. */
	outline:
		"rounded-full border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white",
	/** White outline on dark or photo backgrounds. */
	"outline-light":
		"rounded-full border-2 border-white/45 text-white hover:border-white hover:bg-white hover:text-brand-navy",
	/** Quiet bordered button for tools (admin). */
	subtle:
		"rounded-full border-2 border-line text-brand-blue hover:border-brand-blue",
	/** Inline text link with an optional arrow. Inherits size from its context. */
	link: "text-brand-blue hover:text-brand-red",
	/** Red inline text link. */
	"link-red": "text-brand-red hover:text-brand-blue",
	/** No styling — for icon buttons and custom controls. */
	ghost: "",
} as const;

const sizes = {
	sm: "px-4 py-2 text-sm",
	md: "px-6 py-3 text-sm",
	lg: "px-8 py-3.5 text-base",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

type Appearance = {
	variant?: ButtonVariant;
	/** Ignored by the link and ghost variants. */
	size?: ButtonSize;
	/** Icon shown before the label. */
	icon?: IconType;
	/** Icon shown after the label; nudges right on hover. */
	trailingIcon?: IconType;
	fullWidth?: boolean;
	className?: string;
	children?: ReactNode;
};

type NativeButtonProps = Appearance & ComponentPropsWithRef<"button"> & { to?: never; href?: never };
type RouterLinkProps = Appearance & ComponentPropsWithRef<typeof Link> & { href?: never };
type AnchorProps = Appearance & ComponentPropsWithRef<"a"> & { href: string; to?: never };

export type ButtonProps = NativeButtonProps | RouterLinkProps | AnchorProps;

/**
 * The one button for the whole site.
 * - `to` renders a router <Link>, `href` an <a> (external links get
 *   rel="noopener noreferrer" automatically), otherwise a <button type="button">.
 * - Form submit buttons must pass `type="submit"`.
 */
export default function Button(props: ButtonProps) {
	const {
		variant = "primary",
		size = "md",
		icon: Icon,
		trailingIcon: TrailingIcon,
		fullWidth,
		className,
		children,
		...rest
	} = props;

	const classes = cn(
		base,
		variants[variant],
		!variant.startsWith("link") && variant !== "ghost" && sizes[size],
		fullWidth && "w-full",
		className,
	);

	const content = (
		<>
			{Icon && <Icon aria-hidden className="size-[1.1em] shrink-0" />}
			{children}
			{TrailingIcon && (
				<TrailingIcon
					aria-hidden
					className="size-[1.1em] shrink-0 transition-transform duration-200 group-hover/btn:translate-x-0.5"
				/>
			)}
		</>
	);

	if ("to" in rest && rest.to !== undefined) {
		return (
			<Link {...(rest as ComponentPropsWithRef<typeof Link>)} className={classes}>
				{content}
			</Link>
		);
	}

	if ("href" in rest && rest.href !== undefined) {
		const anchor = rest as ComponentPropsWithRef<"a">;
		const rel = anchor.target === "_blank" ? anchor.rel ?? "noopener noreferrer" : anchor.rel;
		return (
			<a {...anchor} rel={rel} className={classes}>
				{content}
			</a>
		);
	}

	const { type = "button", ...buttonProps } = rest as ComponentPropsWithRef<"button">;
	return (
		<button {...buttonProps} type={type} className={classes}>
			{content}
		</button>
	);
}
