import DOMPurify from "dompurify";

/** Markup the blog editor can produce inside paragraphs and list items. */
const ALLOWED_TAGS = ["strong", "b", "em", "i", "br", "a"];
const SAFE_URL = /^(https?:|mailto:|tel:|\/|#)/i;

const escapeHtml = (s: string) => s.replace(/&(?![a-z0-9#]+;)/gi, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escapeAttr = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/**
 * Strict allowlist sanitizer for the build-time prerender, where DOMPurify has
 * no DOM to work with. Keeps only ALLOWED_TAGS (and safe link hrefs); every
 * other tag is dropped and stray angle brackets are escaped.
 */
function sanitizeWithoutDom(html: string): string {
	const tag = /<(\/?)([a-z0-9]+)\b([^>]*)>/gi;
	let out = "";
	let last = 0;
	for (let m = tag.exec(html); m; m = tag.exec(html)) {
		out += escapeHtml(html.slice(last, m.index));
		last = tag.lastIndex;
		const [, closing, rawName, attrs] = m;
		const name = rawName.toLowerCase();
		if (!ALLOWED_TAGS.includes(name)) continue;
		if (name === "br") out += "<br>";
		else if (closing) out += `</${name}>`;
		else if (name === "a") {
			const href = /href\s*=\s*"([^"]*)"/i.exec(attrs)?.[1] ?? "";
			out += SAFE_URL.test(href) ? `<a href="${escapeAttr(href)}" rel="noopener noreferrer">` : "<a>";
		} else out += `<${name}>`;
	}
	return out + escapeHtml(html.slice(last));
}

/** Sanitizes rich text from the blog editor before it is rendered as HTML. */
export function sanitizeRichText(html: string): string {
	if (typeof window === "undefined") return sanitizeWithoutDom(html);
	return DOMPurify.sanitize(html, { ALLOWED_TAGS, ALLOWED_ATTR: ["href", "rel", "target"] });
}
