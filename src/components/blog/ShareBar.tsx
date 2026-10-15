import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";
import IconButton from "../ui/IconButton";

/** Share links for a blog post. `url` should be the post's canonical URL. */
export default function ShareBar({ url, title }: { url: string; title: string }) {
	const u = encodeURIComponent(url);
	const t = encodeURIComponent(title);
	const links = [
		{ Icon: FaFacebookF, label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
		{ Icon: FaXTwitter, label: "Share on X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
		{ Icon: FaLinkedinIn, label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
		{ Icon: FaWhatsapp, label: "Share on WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
		{ Icon: FiMail, label: "Share by email", href: `mailto:?subject=${t}&body=${u}` },
	];

	return (
		<div>
			<p className="mb-2.5 text-[11px] font-bold uppercase tracking-widest text-muted">Share</p>
			<ul className="flex flex-wrap gap-2">
				{links.map(({ Icon, label, href }) => (
					<li key={label}>
						<IconButton href={href} target="_blank" label={label} icon={Icon} iconSize={14} tone="chip" />
					</li>
				))}
			</ul>
		</div>
	);
}
