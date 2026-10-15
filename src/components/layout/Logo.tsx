import { Link } from "react-router-dom";
import { SITE } from "../../config/site";
import { cn } from "../../lib/cn";

/** Logo mark + wordmark linking home. `light` is for dark backgrounds (footer). */
export default function Logo({ theme = "default" }: { theme?: "default" | "light" }) {
	const light = theme === "light";
	return (
		<Link to="/" aria-label={`${SITE.name} — home`} className="group flex shrink-0 items-center gap-3">
			<span
				className={cn(
					"flex shrink-0 items-center justify-center",
					light ? "size-16 rounded-xl bg-white p-2 shadow-lg" : "size-12 md:size-14",
				)}
			>
				<img src={SITE.logo} alt="" width={56} height={56} className="size-full object-contain" />
			</span>
			<span className="leading-tight">
				<span
					className={cn(
						"block font-serif text-lg font-bold leading-none md:text-xl",
						light ? "text-white" : "text-brand-blue",
					)}
				>
					{SITE.shortName}
				</span>
				<span
					className={cn(
						"mt-1 block text-[0.65rem] uppercase md:text-xs",
						light ? "font-bold tracking-[0.2em] text-brand-teal" : "tracking-widest text-brand-teal",
					)}
				>
					{SITE.tagline}
				</span>
			</span>
		</Link>
	);
}
