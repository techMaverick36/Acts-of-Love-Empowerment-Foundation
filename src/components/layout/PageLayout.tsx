import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import Seo, { type SeoProps } from "../seo/Seo";
import Footer from "./Footer";
import Navbar from "./Navbar";

type PageLayoutProps = {
	seo: SeoProps;
	/** Push content below the fixed header. Pages that open with a <PageHero> don't need it. */
	offsetHeader?: boolean;
	className?: string;
	children: ReactNode;
};

/** Header, footer and <head> metadata shared by every public page. */
export default function PageLayout({ seo, offsetHeader, className, children }: PageLayoutProps) {
	return (
		<>
			<Seo {...seo} />
			<a
				href="#main"
				className="sr-only z-[60] rounded-full bg-brand-blue px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
			>
				Skip to content
			</a>
			<Navbar />
			<main id="main" className={cn(offsetHeader && "pt-header lg:pt-header-lg", className)}>
				{children}
			</main>
			<Footer />
		</>
	);
}
