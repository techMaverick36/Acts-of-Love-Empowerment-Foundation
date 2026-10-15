import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

const tones = {
	blue: "border-brand-blue bg-brand-blue/5 text-brand-blue",
	red: "border-brand-red bg-brand-red/5 text-brand-red",
} as const;

type ChoiceChipProps = {
	selected: boolean;
	onSelect: () => void;
	/** Colour when selected. */
	tone?: keyof typeof tones;
	align?: "center" | "left";
	className?: string;
	children: ReactNode;
};

/** Pill-shaped toggle used for amounts, purposes and filters. */
export function ChoiceChip({ selected, onSelect, tone = "blue", align = "center", className, children }: ChoiceChipProps) {
	return (
		<button
			type="button"
			aria-pressed={selected}
			onClick={onSelect}
			className={cn(
				"rounded-full border-2 px-4 py-2.5 text-sm font-semibold transition-colors duration-150",
				align === "left" ? "text-left" : "text-center",
				selected ? tones[tone] : "border-line bg-white text-body hover:border-gray-300",
				className,
			)}
		>
			{children}
		</button>
	);
}

type SegmentedControlProps<T extends string> = {
	options: readonly { value: T; label: ReactNode }[];
	value: T;
	onChange: (value: T) => void;
	label: string;
	className?: string;
};

/** Two-or-more option switch, e.g. One-time / Monthly. */
export function SegmentedControl<T extends string>({ options, value, onChange, label, className }: SegmentedControlProps<T>) {
	return (
		<div role="group" aria-label={label} className={cn("flex gap-1 rounded-full bg-gray-100 p-1", className)}>
			{options.map((option) => {
				const selected = option.value === value;
				return (
					<button
						key={option.value}
						type="button"
						aria-pressed={selected}
						onClick={() => onChange(option.value)}
						className={cn(
							"flex-1 rounded-full py-2 text-sm font-semibold transition-colors duration-150",
							selected ? "bg-white text-brand-blue shadow-sm" : "text-gray-500 hover:text-brand-blue",
						)}
					>
						{option.label}
					</button>
				);
			})}
		</div>
	);
}
