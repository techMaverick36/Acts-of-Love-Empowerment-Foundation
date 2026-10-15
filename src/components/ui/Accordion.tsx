import { useId, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { cn } from "../../lib/cn";

export type AccordionItem = { question: string; answer: string };

/**
 * Question/answer list. Answers stay in the DOM when collapsed so search
 * engines and screen readers can still find them.
 */
export default function Accordion({ items }: { items: readonly AccordionItem[] }) {
	const [open, setOpen] = useState<number | null>(null);
	const baseId = useId();

	return (
		<div className="flex flex-col gap-3">
			{items.map((item, i) => {
				const isOpen = open === i;
				const panelId = `${baseId}-panel-${i}`;
				return (
					<div key={item.question} className="overflow-hidden rounded-xl border border-line bg-white">
						<h3>
							<button
								type="button"
								aria-expanded={isOpen}
								aria-controls={panelId}
								onClick={() => setOpen(isOpen ? null : i)}
								className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-sans text-sm font-semibold text-ink transition-colors hover:text-brand-blue"
							>
								{item.question}
								<FiPlus
									aria-hidden
									size={18}
									className={cn("shrink-0 text-brand-blue transition-transform duration-200", isOpen && "rotate-45")}
								/>
							</button>
						</h3>
						<div
							id={panelId}
							role="region"
							className={cn(
								"grid transition-[grid-template-rows] duration-200 ease-out",
								isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
							)}
							inert={!isOpen}
						>
							<div className="overflow-hidden">
								<p className="mx-6 border-t border-line pb-5 pt-4 text-sm leading-relaxed text-body">{item.answer}</p>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
