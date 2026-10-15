import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * On navigation: scroll to the #hash target if there is one, otherwise to the
 * top. Pages don't need their own hash-scrolling code.
 */
export default function ScrollToTop() {
	const { pathname, hash } = useLocation();

	useEffect(() => {
		if (!hash) {
			window.scrollTo(0, 0);
			return;
		}
		// Wait a frame so the new page has rendered its sections.
		const frame = requestAnimationFrame(() => {
			document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: "smooth" });
		});
		return () => cancelAnimationFrame(frame);
	}, [pathname, hash]);

	return null;
}
