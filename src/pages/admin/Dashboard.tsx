import { useEffect, useState } from "react";
import { FiEdit2, FiExternalLink, FiLogOut, FiPlus, FiTrash2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Seo from "../../components/seo/Seo";
import { Alert } from "../../components/ui/Alert";
import { Badge, Tag } from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import IconButton from "../../components/ui/IconButton";
import { PAGES } from "../../config/seo";
import { SITE } from "../../config/site";
import { useAuth } from "../../context/AuthContext";
import { categoryColors, formatDate, type BlogPost } from "../../data/blogPosts";
import { deletePost, listAllPosts } from "../../lib/posts";

type AdminPost = BlogPost & { published: boolean };

export default function AdminDashboard() {
	const { session, signOut } = useAuth();
	const navigate = useNavigate();
	const [posts, setPosts] = useState<AdminPost[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [deleting, setDeleting] = useState<string | null>(null);

	useEffect(() => {
		listAllPosts()
			.then(setPosts)
			.catch((e) => setError(e instanceof Error ? e.message : "Failed to load posts."))
			.finally(() => setLoading(false));
	}, []);

	const handleDelete = async (slug: string, title: string) => {
		if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
		setDeleting(slug);
		try {
			await deletePost(slug);
			setPosts((prev) => prev.filter((p) => p.slug !== slug));
		} catch (e) {
			alert(e instanceof Error ? e.message : "Failed to delete post.");
		} finally {
			setDeleting(null);
		}
	};

	const handleSignOut = async () => {
		await signOut();
		navigate("/admin/login", { replace: true });
	};

	return (
		<div className="min-h-screen bg-surface">
			<Seo {...PAGES.admin} />
			<header className="border-b border-line bg-white">
				<div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
					<Link to="/" className="flex items-center gap-2.5">
						<img src={SITE.logo} alt="Acts of Love" className="size-9 object-contain" />
						<span className="font-serif font-bold text-brand-blue">Journal Admin</span>
					</Link>
					<div className="flex items-center gap-4">
						<span className="hidden text-xs text-muted sm:block">{session?.user.email}</span>
						<Button variant="link" icon={FiLogOut} onClick={handleSignOut} className="text-sm">
							Sign out
						</Button>
					</div>
				</div>
			</header>

			<main className="mx-auto max-w-5xl px-6 py-10">
				<div className="mb-8 flex items-center justify-between">
					<div>
						<h1 className="font-serif text-3xl font-semibold text-brand-blue">Blog Posts</h1>
						<p className="mt-1 text-sm text-muted">
							{posts.length} {posts.length === 1 ? "story" : "stories"}
						</p>
					</div>
					<Button to="/admin/new" size="sm" icon={FiPlus}>
						New Post
					</Button>
				</div>

				{error && <Alert className="mb-6">{error}</Alert>}

				{loading ? (
					<p className="text-sm text-muted">Loading…</p>
				) : posts.length === 0 ? (
					<div className="rounded-2xl border border-line bg-white p-12 text-center">
						<p className="mb-4 text-base text-body">No posts yet.</p>
						<Button to="/admin/new" size="sm" icon={FiPlus}>
							Write your first story
						</Button>
					</div>
				) : (
					<ul className="flex flex-col gap-3">
						{posts.map((p) => (
							<li
								key={p.slug}
								className="flex items-center gap-4 rounded-xl border border-line bg-white p-4 transition-shadow hover:shadow-sm"
							>
								<div className="size-16 shrink-0 overflow-hidden rounded-lg bg-surface">
									{p.image && <img src={p.image} alt="" className="size-full object-cover" />}
								</div>
								<div className="min-w-0 flex-1">
									<div className="mb-1 flex items-center gap-2">
										<Badge size="sm" color={categoryColors[p.category]}>
											{p.category}
										</Badge>
										{!p.published && (
											<Tag size="sm" tone="amber">
												Draft
											</Tag>
										)}
									</div>
									<p className="truncate font-semibold text-ink">{p.title}</p>
									<p className="text-xs text-muted">
										{formatDate(p.date)} · {p.author.name}
									</p>
								</div>
								<div className="flex shrink-0 items-center gap-1">
									{p.published && <IconButton to={`/blog/${p.slug}`} target="_blank" icon={FiExternalLink} label="View" />}
									<IconButton to={`/admin/edit/${p.slug}`} icon={FiEdit2} label="Edit" />
									<IconButton
										tone="danger"
										icon={FiTrash2}
										label="Delete"
										onClick={() => handleDelete(p.slug, p.title)}
										disabled={deleting === p.slug}
										className="disabled:opacity-50"
									/>
								</div>
							</li>
						))}
					</ul>
				)}
			</main>
		</div>
	);
}
