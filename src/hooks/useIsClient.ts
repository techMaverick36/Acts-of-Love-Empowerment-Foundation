import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** False while prerendering at build time, true in the browser. Use it to skip browser-only widgets. */
export function useIsClient() {
	return useSyncExternalStore(
		subscribe,
		() => true,
		() => false,
	);
}
