import type { ReactNode } from "react";
import { Eyebrow } from "./SectionHeading";

type StatusMessageProps = {
	eyebrow: ReactNode;
	title: ReactNode;
	children: ReactNode;
	/** Usually a single <Button>. */
	action?: ReactNode;
};

/** Centred full-height message for "not found" and similar dead ends. Renders the page's <h1>. */
export default function StatusMessage({ eyebrow, title, children, action }: StatusMessageProps) {
	return (
		<section className="flex min-h-[70vh] items-center justify-center bg-white px-6 py-20">
			<div className="max-w-lg text-center">
				<Eyebrow className="mb-4 justify-center">{eyebrow}</Eyebrow>
				<h1 className="mb-4 font-serif text-4xl font-semibold text-brand-blue">{title}</h1>
				<p className="mb-8 text-base text-body">{children}</p>
				{action}
			</div>
		</section>
	);
}
