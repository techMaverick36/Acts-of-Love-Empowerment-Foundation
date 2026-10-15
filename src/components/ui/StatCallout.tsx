import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

type StatCalloutProps = {
	value: ReactNode;
	label: ReactNode;
	note?: ReactNode;
	/** Colour of the value (any CSS colour). */
	color?: string;
	className?: string;
};

/** White card with a big figure, overlapping the corner of a photo. */
export default function StatCallout({
	value,
	label,
	note,
	color = "var(--color-brand-blue)",
	className,
}: StatCalloutProps) {
	return (
		<div className={cn("absolute rounded-xl border border-line bg-white px-5 py-4 shadow-lg", className)}>
			<p className="font-serif text-3xl font-semibold leading-none" style={{ color }}>
				{value}
			</p>
			<p className="mt-1.5 text-sm font-medium text-ink">{label}</p>
			{note && <p className="mt-0.5 text-xs text-muted">{note}</p>}
		</div>
	);
}
