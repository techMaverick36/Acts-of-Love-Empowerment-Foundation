import type { BlogPost } from "../data/blogPosts";

/**
 * Data fetched at build time so prerendered blog pages contain the real posts.
 *
 * The prerender step fills this before rendering a route and embeds it in the
 * page as <script id="prerender-data">. In the browser, main.tsx reads it back
 * before the first render, so pages start with the same content (no loading
 * flash) and then refresh from Supabase as usual.
 */
export type PrerenderData = {
	posts?: BlogPost[];
	post?: BlogPost;
	related?: BlogPost[];
};

export const PRERENDER_DATA_ID = "prerender-data";

let data: PrerenderData = {};

export function setPrerenderData(next: PrerenderData) {
	data = next;
}

export function getPrerenderData(): PrerenderData {
	return data;
}

/** Browser only: load the data embedded by the prerender step, if any. */
export function loadEmbeddedPrerenderData() {
	const el = document.getElementById(PRERENDER_DATA_ID);
	if (!el?.textContent) return;
	try {
		data = JSON.parse(el.textContent) as PrerenderData;
	} catch {
		data = {};
	}
}
