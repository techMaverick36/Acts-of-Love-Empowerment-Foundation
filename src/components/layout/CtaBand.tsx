import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import SectionHeading from "../ui/SectionHeading";
import { Container } from "./Section";

type CtaBandProps = {
	id?: string;
	eyebrow?: ReactNode;
	title: ReactNode;
	description?: ReactNode;
	/** Buttons, usually <Button>s. */
	actions: ReactNode;
	/** Optional background photo; it is darkened so text stays legible. */
	image?: { src: string; alt: string };
	/** Element above the heading (e.g. an alert label). */
	kicker?: ReactNode;
};

/** Dark, centred call-to-action band that closes a page. */
export default function CtaBand({ id, eyebrow, title, description, actions, image, kicker }: CtaBandProps) {
	return (
		<section id={id} className={cn("relative isolate overflow-hidden py-20 md:py-24", !image && "bg-brand-navy")}>
			{image && (
				<>
					<img src={image.src} alt={image.alt} loading="lazy" className="absolute inset-0 -z-20 size-full object-cover" />
					<div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/60 to-black/45" />
				</>
			)}
			<Container width="narrow" className="text-center">
				{kicker}
				<SectionHeading eyebrow={eyebrow} title={title} intro={description} theme="light" />
				<div className="mt-10 flex flex-wrap justify-center gap-4">{actions}</div>
			</Container>
		</section>
	);
}
