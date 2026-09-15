import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	FiPlus,
	FiEdit2,
	FiTrash2,
	FiLogOut,
	FiExternalLink,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { listAllPosts, deletePost } from "../../lib/posts";
import { formatDate, categoryColors, type BlogPost } from "../../data/blogPosts";

type AdminPost = BlogPost & { published: boolean };

export default function AdminDashboard() {
	const { session, signOut } = useAuth();
	const navigate = useNavigate();
	const [posts, setPosts] = useState<AdminPost[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [deleting, setDeleting] = useState<string | null>(null);

	const load = () => {
		setLoading(true);
		listAllPosts()
			.then((p) => setPosts(p))
			.catch((e) => setError(e instanceof Error ? e.message : "Failed to load posts."))
			.finally(() => setLoading(false));
	};

	useEffect(load, []);

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
		<div className="min-h-screen" style={{ backgroundColor: "#f8f9fb" }}>
			{/* Top bar */}
			<header className="bg-white border-b border-gray-100">
				<div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
					<Link to="/" className="flex items-center gap-2.5">
						<img src="/logo.png" alt="Acts of Love" className="w-9 h-9 object-contain" />
						<span className="font-serif font-bold" style={{ color: "#204487" }}>
							Journal Admin
						</span>
					</Link>
					<div className="flex items-center gap-4">
						<span className="hidden sm:block text-xs" style={{ color: "#888" }}>
							{session?.user.email}
						</span>
						<Button variant="ghost"
							onClick={handleSignOut}
							className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity"
							style={{ color: "#204487" }}
						>
							<FiLogOut size={15} /> Sign out
						</Button>
					</div>
				</div>
			</header>

			<main className="max-w-5xl mx-auto px-6 py-10">
				<div className="flex items-center justify-between mb-8">
					<div>
						<h1 className="font-serif text-3xl font-bold" style={{ color: "#204487" }}>
							Blog Posts
						</h1>
						<p className="text-sm mt-1" style={{ color: "#888" }}>
							{posts.length} {posts.length === 1 ? "story" : "stories"}
						</p>
					</div>
					<Button variant="primary" size="sm" effect="raised"
						to="/admin/new"
					>
						<FiPlus size={16} /> New Post
					</Button>
				</div>

				{error && (
					<div className="text-sm p-3 rounded-lg border mb-6" style={{ backgroundColor: "#fff5f5", borderColor: "#fecaca", color: "#991b1b" }}>
						{error}
					</div>
				)}

				{loading ? (
					<p className="text-sm" style={{ color: "#888" }}>Loading…</p>
				) : posts.length === 0 ? (
					<div className="bg-white rounded-2xl border border-blue-100 p-12 text-center">
						<p className="text-base mb-4" style={{ color: "#4a4a4a" }}>
							No posts yet.
						</p>
						<Button variant="primary" size="sm" effect="custom"
							to="/admin/new"
						>
							<FiPlus size={16} /> Write your first story
						</Button>
					</div>
				) : (
					<div className="flex flex-col gap-3">
						{posts.map((p) => (
							<div
								key={p.slug}
								className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4 hover:shadow-sm transition-shadow"
							>
								<div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-[#f8f9fb]">
									{p.image ? (
										<img src={p.image} alt="" className="w-full h-full object-cover" />
									) : null}
								</div>
								<div className="min-w-0 flex-1">
									<div className="flex items-center gap-2 mb-1">
										<span
											className="text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-full text-white"
											style={{ backgroundColor: categoryColors[p.category] }}
										>
											{p.category}
										</span>
										{!p.published && (
											<span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full" style={{ backgroundColor: "#fef3c7", color: "#92400e" }}>
												Draft
											</span>
										)}
									</div>
									<p className="font-semibold truncate" style={{ color: "#1D1E1F" }}>
										{p.title}
									</p>
									<p className="text-xs" style={{ color: "#888" }}>
										{formatDate(p.date)} · {p.author.name}
									</p>
								</div>
								<div className="flex items-center gap-1 shrink-0">
									{p.published && (
										<Button variant="ghost"
											to={`/blog/${p.slug}`}
											target="_blank"
											className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
											title="View"
											style={{ color: "#204487" }}
										>
											<FiExternalLink size={16} />
										</Button>
									)}
									<Button variant="ghost"
										to={`/admin/edit/${p.slug}`}
										className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
										title="Edit"
										style={{ color: "#204487" }}
									>
										<FiEdit2 size={16} />
									</Button>
									<Button variant="ghost"
										onClick={() => handleDelete(p.slug, p.title)}
										disabled={deleting === p.slug}
										className="p-2 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
										title="Delete"
										style={{ color: "#D91E26" }}
									>
										<FiTrash2 size={16} />
									</Button>
								</div>
							</div>
						))}
					</div>
				)}
			</main>
		</div>
	);
}
