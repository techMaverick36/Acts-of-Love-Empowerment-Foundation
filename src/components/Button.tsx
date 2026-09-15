import type { ComponentPropsWithRef } from "react";
import { Link } from "react-router-dom";

const variants = {
	primary: "rounded-full text-white bg-[#D91E26]",
	secondary: "rounded-full text-white bg-[#204487]",
	accent: "rounded-full text-white",
	outline: "rounded-full border-2",
	transparent: "rounded-full border-2 text-white",
	ghost: "",
};

const sizes = {
	sm: "px-5 py-2.5 text-sm",
	md: "px-6 py-2.5 text-sm",
	lg: "px-8 py-3.5 text-sm",
	xl: "px-10 py-4 text-base",
	custom: "",
};

const effects = {
	navigation: "transition-all duration-200 hover:opacity-90 hover:scale-105 shadow-sm",
	raised: "btn-primary",
	elevated: "btn-elevated",
	custom: "",
};

type Appearance = {
	variant?: keyof typeof variants;
	size?: keyof typeof sizes;
	effect?: keyof typeof effects;
	/** Existing layouts can supply their own spacing and alignment. */
	layout?: "inline" | "custom";
	className?: string;
};

type NativeButtonProps = Appearance & ComponentPropsWithRef<"button"> & {
	to?: never;
	href?: never;
};
type RouterButtonProps = Appearance & ComponentPropsWithRef<typeof Link> & {
	href?: never;
};
type AnchorButtonProps = Appearance & ComponentPropsWithRef<"a"> & {
	href: string;
	to?: never;
};

export type ButtonProps = NativeButtonProps | RouterButtonProps | AnchorButtonProps;

/** Navigation-style CTA by default; `to` and `href` retain native link behavior. */
export default function Button(props: ButtonProps) {
	const {
		variant = "primary",
		size = variant === "ghost" ? "custom" : "md",
		effect = variant === "ghost" ? "custom" : "navigation",
		layout = variant === "ghost" ? "custom" : "inline",
		className = "",
		...rest
	} = props;
	const classes = [
		"site-button",
		variants[variant],
		layout === "inline" ? "inline-flex items-center gap-2 font-semibold" : "",
		sizes[size],
		effects[effect],
		className,
	].filter(Boolean).join(" ");

	if ("to" in rest && rest.to !== undefined) {
		return <Link {...rest as ComponentPropsWithRef<typeof Link>} className={classes} />;
	}
	if ("href" in rest && rest.href !== undefined) {
		return <a {...rest as ComponentPropsWithRef<"a">} className={classes} />;
	}
	const { type = "button", ...buttonProps } = rest as ComponentPropsWithRef<"button">;
	return <button {...buttonProps} type={type} className={classes} />;
}
