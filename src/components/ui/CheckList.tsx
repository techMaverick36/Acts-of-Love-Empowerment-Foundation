import { FiCheckCircle } from "react-icons/fi";
import { cn } from "../../lib/cn";

type CheckListProps = {
	items: readonly string[];
	/** Colour of the check icons (any CSS colour). */
	color?: string;
	size?: "sm" | "md";
	className?: string;
};

/** Bulleted list with check icons, for program inclusions and highlights. */
export default function CheckList({
	items,
	color = "var(--color-brand-green)",
	size = "md",
	className,
}: CheckListProps) {
	return (
		<ul className={cn("flex flex-col", size === "sm" ? "gap-2.5" : "gap-3", className)}>
			{items.map((item) => (
				<li
					key={item}
					className={cn("flex items-start gap-2.5 leading-relaxed text-body", size === "sm" ? "text-xs" : "text-sm")}
				>
					<FiCheckCircle
						aria-hidden
						size={size === "sm" ? 13 : 16}
						className="mt-0.5 shrink-0"
						style={{ color }}
					/>
					{item}
				</li>
			))}
		</ul>
	);
}
