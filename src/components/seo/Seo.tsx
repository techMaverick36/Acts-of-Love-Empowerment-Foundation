import { SITE } from "../../config/site";
import type { PageMeta } from "../../config/seo";
import { absoluteUrl } from "../../lib/structuredData";

export type SeoProps = Pick<PageMeta, "path" | "title" | "description" | "image" | "noindex"> & {
	type?: "website" | "article";
	/** ISO date, for articles. */
	publishedTime?: string;
	/** One or more schema.org objects (see lib/structuredData.ts). */
	jsonLd?: object | object[];
};

/**
 * Per-page <head> tags. React 19 hoists <title>, <meta> and <link> into the
 * document head, and the prerender step writes them into the static HTML.
 */
export default function Seo({ path, title, description, image, noindex, type = "website", publishedTime, jsonLd }: SeoProps) {
	const fullTitle = path === "/" ? title : `${title} | ${SITE.name}`;
	const url = absoluteUrl(path);
	const imageUrl = absoluteUrl(image || SITE.defaultImage);
	const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

	return (
		<>
			<title>{fullTitle}</title>
			<meta name="description" content={description} />
			<meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"} />
			{!noindex && <link rel="canonical" href={url} />}

			<meta property="og:site_name" content={SITE.name} />
			<meta property="og:type" content={type} />
			<meta property="og:title" content={fullTitle} />
			<meta property="og:description" content={description} />
			<meta property="og:url" content={url} />
			<meta property="og:image" content={imageUrl} />
			<meta property="og:locale" content="en_UG" />
			{publishedTime && <meta property="article:published_time" content={publishedTime} />}

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={fullTitle} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={imageUrl} />

			{schemas.map((schema, i) => (
				<script
					key={i}
					type="application/ld+json"
					// JSON-LD must be raw JSON; "<" is escaped so content can't close the tag.
					dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
				/>
			))}
		</>
	);
}
