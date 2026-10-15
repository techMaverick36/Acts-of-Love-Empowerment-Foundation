import { SOCIAL_LINKS } from "../../config/site";
import IconButton from "./IconButton";

/** The foundation's social profiles as icon links. */
export default function SocialLinks({ theme = "light" }: { theme?: "light" | "dark" }) {
	return (
		<ul className="flex gap-3">
			{SOCIAL_LINKS.map(({ label, href, Icon }) => (
				<li key={label}>
					<IconButton
						href={href}
						target="_blank"
						label={label}
						icon={Icon}
						tone={theme === "dark" ? "chip-dark" : "chip"}
						size={theme === "dark" ? "lg" : "md"}
					/>
				</li>
			))}
		</ul>
	);
}
