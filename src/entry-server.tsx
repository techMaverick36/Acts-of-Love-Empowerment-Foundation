/**
 * Build-time renderer used by scripts/prerender.mjs (not shipped to browsers).
 * Renders one route to static HTML so search engines and link previews see
 * full content and the right <head> tags without running JavaScript.
 */
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import { setPrerenderData, type PrerenderData } from "./lib/prerenderData";

export { PAGES } from "./config/seo";
export { SITE } from "./config/site";
export { listPublishedPosts, listRelatedPosts } from "./lib/posts";
export { isSupabaseConfigured } from "./lib/supabase";

/** Returns the <head> tags and the #root markup for `url`. */
export function render(url: string, data: PrerenderData = {}) {
	setPrerenderData(data);
	// Rendering a whole document makes React place <title>/<meta>/<link> in <head>.
	const doc = renderToString(
		<html lang="en">
			<head />
			<body>
				<div id="root">
					<StaticRouter location={url}>
						<App />
					</StaticRouter>
				</div>
			</body>
		</html>,
	);
	setPrerenderData({});

	const head = doc.slice(doc.indexOf("<head>") + "<head>".length, doc.indexOf("</head>"));
	const rootStart = doc.indexOf('<div id="root">') + '<div id="root">'.length;
	const rootEnd = doc.lastIndexOf("</div></body>");
	return { head, html: doc.slice(rootStart, rootEnd) };
}
