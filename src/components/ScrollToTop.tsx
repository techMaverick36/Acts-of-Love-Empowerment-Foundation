import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
	const { pathname, hash } = useLocation();

	useEffect(() => {
		if (!hash) {
			window.scrollTo(0, 0);
		} else {
			const el = document.querySelector(hash);
			if (el) {
				el.scrollIntoView({ behavior: "smooth" });
			}
		}
	}, [pathname, hash]);

	return null;
}
