import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { loadEmbeddedPrerenderData } from "./lib/prerenderData";

/**
 * The prerendered HTML carries this page's <title>/<meta> tags between the
 * <!--app-head--> markers. React renders its own copy once the app mounts,
 * so remove the static ones first to avoid duplicates.
 */
function removePrerenderedHead() {
	let inside = false;
	for (const node of Array.from(document.head.childNodes)) {
		if (node.nodeType === Node.COMMENT_NODE) {
			const text = node.nodeValue?.trim();
			if (text === "app-head") inside = true;
			if (text === "/app-head") inside = false;
			continue;
		}
		if (inside) node.remove();
	}
}

/** /about.html → /about, /index.html → / (the router only knows clean URLs). */
function normalizeHtmlUrl() {
	const { pathname, search, hash } = window.location;
	if (!pathname.endsWith(".html")) return;
	const clean = pathname.replace(/(index)?\.html$/, "") || "/";
	window.history.replaceState(null, "", clean + search + hash);
}

normalizeHtmlUrl();
loadEmbeddedPrerenderData();
removePrerenderedHead();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>,
);
