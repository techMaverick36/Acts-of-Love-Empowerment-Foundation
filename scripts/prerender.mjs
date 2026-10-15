/**
 * Prerender step — runs after `vite build` (see the "build" script).
 *
 * For every public page it renders the React app to static HTML, so search
 * engines and social link previews get the full content and the right
 * <title>/<meta> tags without running JavaScript. The browser then takes over
 * as a normal single-page app.
 *
 * Output (in dist/):
 *   index.html, about.html, …      one file per page in src/config/seo.ts
 *   blog/<slug>.html               one per published post (fetched from Supabase)
 *   404.html                       the "page not found" page
 *   app.html                       empty shell for client-only routes (/admin, new posts)
 *   sitemap.xml                    every indexable URL
 *   _redirects                     Netlify routing for all of the above
 */
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const serverEntry = join(root, "dist-ssr", "entry-server.js");

const { render, PAGES, SITE, listPublishedPosts, listRelatedPosts, isSupabaseConfigured } = await import(
	pathToFileURL(serverEntry).href
);

const template = await readFile(join(dist, "index.html"), "utf8");
const HEAD = /<!--app-head-->[\s\S]*?<!--\/app-head-->/;
if (!HEAD.test(template) || !template.includes("<!--app-html-->") || !template.includes("<!--app-data-->")) {
	throw new Error("index.html is missing the <!--app-head-->, <!--app-html--> or <!--app-data--> markers.");
}

// Keep a pristine shell before index.html is overwritten by the home page.
await writeFile(join(dist, "app.html"), template.replace("<!--app-html-->", "").replace("<!--app-data-->", ""));

/** "/" → index.html, "/about" → about.html, "/blog/x" → blog/x.html */
const fileFor = (path) => (path === "/" ? "index.html" : `${path.slice(1)}.html`);

async function writePage(url, outFile, data) {
	const { head, html } = render(url, data);
	const json = data ? JSON.stringify(data).replace(/</g, "\\u003c") : "";
	const page = template
		.replace(HEAD, `<!--app-head-->${head}<!--/app-head-->`)
		.replace("<!--app-html-->", html)
		.replace("<!--app-data-->", json ? `<script id="prerender-data" type="application/json">${json}</script>` : "");
	if (url !== "/" && !outFile.startsWith("404")) rewrites.push([url, `/${outFile}`]);
	const target = join(dist, outFile);
	await mkdir(dirname(target), { recursive: true });
	await writeFile(target, page);
	console.log(`  prerendered ${url.padEnd(40)} → ${outFile}`);
}

const rewrites = []; // [url, file] for Netlify
const today = new Date().toISOString().slice(0, 10);
const sitemap = [];

console.log("Prerendering pages…");
for (const page of Object.values(PAGES)) {
	if (page.noindex) continue;
	if (page.path === "/blog") continue; // rendered below with its posts
	await writePage(page.path, fileFor(page.path));
	sitemap.push({ loc: page.path, lastmod: today, changefreq: page.changefreq, priority: page.priority });
}
await writePage("/checkout", fileFor("/checkout"));
await writePage(PAGES.notFound.path, "404.html");

// Blog: bake the published posts into the listing and each article page.
let posts = [];
if (isSupabaseConfigured) {
	try {
		posts = await listPublishedPosts();
	} catch (err) {
		console.warn(`  ! Could not load blog posts (${err?.message ?? err}); blog pages will load them in the browser.`);
	}
} else {
	console.warn("  ! Supabase env vars not set; blog pages will load posts in the browser.");
}

await writePage("/blog", fileFor("/blog"), posts.length ? { posts } : undefined);
sitemap.push({ loc: "/blog", lastmod: posts[0]?.date?.slice(0, 10) ?? today, changefreq: PAGES.blog.changefreq, priority: PAGES.blog.priority });

for (const post of posts) {
	const path = `/blog/${post.slug}`;
	const related = await listRelatedPosts(post.slug, post.category).catch(() => []);
	await writePage(path, fileFor(path), { post, related });
	sitemap.push({ loc: path, lastmod: post.date.slice(0, 10), changefreq: "monthly", priority: 0.7 });
}

// Sitemap
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemap
	.map(
		(u) => `  <url>
    <loc>${SITE.url}${u.loc === "/" ? "/" : u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>${u.changefreq ? `\n    <changefreq>${u.changefreq}</changefreq>` : ""}${
			u.priority != null ? `\n    <priority>${u.priority.toFixed(1)}</priority>` : ""
		}
  </url>`,
	)
	.join("\n")}
</urlset>
`;
await writeFile(join(dist, "sitemap.xml"), xml);
console.log(`  wrote sitemap.xml (${sitemap.length} URLs)`);

// Netlify routing: explicit rewrites first, then client-only routes, then 404.
const rules = [
	...rewrites.map(([from, to]) => `${from}  ${to}  200`),
	"/admin    /app.html  200",
	"/admin/*  /app.html  200",
	"/blog/*   /app.html  200",
	"/*        /404.html  404",
];
await writeFile(join(dist, "_redirects"), `${rules.join("\n")}\n`);
console.log(`  wrote _redirects (${rules.length} rules)`);

// The server bundle is only needed for this step.
await rm(join(root, "dist-ssr"), { recursive: true, force: true });
