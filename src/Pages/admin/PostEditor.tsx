import Button from "../../components/Button";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	FiArrowLeft,
	FiTrash2,
	FiChevronUp,
	FiChevronDown,
	FiUploadCloud,
	FiSave,
} from "react-icons/fi";
import {
	createPost,
	updatePost,
	getPostForEdit,
	uploadImage,
	type PostInput,
} from "../../lib/posts";
import {
	postCategories,
	type BodyBlock,
	type ImpactStat,
	type PostCategory,
} from "../../data/blogPosts";
import { InlineRichText, ListRichText } from "../../components/blockEditors";

const slugify = (s: string) =>
	s
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");

let keyCounter = 0;
const nextKey = () => `b${keyCounter++}`;
type Keyed = { key: string; block: BodyBlock };

const blankBlock = (type: BodyBlock["type"]): BodyBlock => {
	switch (type) {
		case "h2":
			return { type: "h2", text: "" };
		case "ul":
			return { type: "ul", items: [] };
		case "image":
			return { type: "image", src: "", caption: "", align: "full" };
		case "quote":
			return { type: "quote", text: "" };
		default:
			return { type: "p", text: "" };
	}
};

const inputClass =
	"w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:border-[#204487] focus:outline-none transition-colors";
const labelClass =
	"block text-xs font-bold uppercase tracking-wider mb-1.5";

export default function PostEditor() {
	const { slug: routeSlug } = useParams<{ slug: string }>();
	const isEdit = Boolean(routeSlug);
	const navigate = useNavigate();

	const [loading, setLoading] = useState(isEdit);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const [title, setTitle] = useState("");
	const [slug, setSlug] = useState("");
	const [slugEdited, setSlugEdited] = useState(false);
	const [category, setCategory] = useState<PostCategory>("Field Stories");
	const [excerpt, setExcerpt] = useState("");
	const [image, setImage] = useState("");
	const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
	const [readTime, setReadTime] = useState("4 min read");
	const [authorName, setAuthorName] = useState("");
	const [authorRole, setAuthorRole] = useState("");
	const [authorAvatar, setAuthorAvatar] = useState("");
	const [published, setPublished] = useState(true);
	const [blocks, setBlocks] = useState<Keyed[]>([]);
	const [impactStats, setImpactStats] = useState<(ImpactStat & { key: string })[]>([]);

	const originalSlug = useRef<string | null>(null);

	useEffect(() => {
		if (!isEdit || !routeSlug) return;
		getPostForEdit(routeSlug)
			.then((p) => {
				if (!p) {
					setError("Post not found.");
					return;
				}
				originalSlug.current = p.slug;
				setTitle(p.title);
				setSlug(p.slug);
				setSlugEdited(true);
				setCategory(p.category);
				setExcerpt(p.excerpt);
				setImage(p.image);
				setDate(p.date.slice(0, 10));
				setReadTime(p.readTime);
				setAuthorName(p.author.name);
				setAuthorRole(p.author.role ?? "");
				setAuthorAvatar(p.author.avatar ?? "");
				setPublished(p.published);
				setImpactStats(p.impactStats.map((stat) => ({ ...stat, key: nextKey() })));
				setBlocks(p.body.map((block) => ({ key: nextKey(), block })));
			})
			.catch((e) => setError(e instanceof Error ? e.message : "Failed to load."))
			.finally(() => setLoading(false));
	}, [isEdit, routeSlug]);

	const onTitleChange = (v: string) => {
		setTitle(v);
		if (!slugEdited) setSlug(slugify(v));
	};

	// ── Block operations ──
	const addBlock = (type: BodyBlock["type"]) =>
		setBlocks((b) => [...b, { key: nextKey(), block: blankBlock(type) }]);
	const removeBlock = (key: string) =>
		setBlocks((b) => b.filter((x) => x.key !== key));
	const move = (key: string, dir: -1 | 1) =>
		setBlocks((b) => {
			const i = b.findIndex((x) => x.key === key);
			const j = i + dir;
			if (i < 0 || j < 0 || j >= b.length) return b;
			const copy = [...b];
			[copy[i], copy[j]] = [copy[j], copy[i]];
			return copy;
		});
	const patchBlock = (key: string, block: BodyBlock) =>
		setBlocks((b) => b.map((x) => (x.key === key ? { ...x, block } : x)));

	const [uploadingKey, setUploadingKey] = useState<string | null>(null);

	const handleUpload = async (
		file: File,
		onDone: (url: string) => void,
		key = "field"
	) => {
		setUploadingKey(key);
		setError(null);
		try {
			const url = await uploadImage(file);
			onDone(url);
		} catch (e) {
			setError(e instanceof Error ? e.message : "Upload failed.");
		} finally {
			setUploadingKey(null);
		}
	};

	const handleSave = async () => {
		setError(null);
		if (!title.trim() || !slug.trim()) {
			setError("Title and slug are required.");
			return;
		}
		if (impactStats.some((stat) => !stat.value.trim() || !stat.label.trim())) {
			setError("Enter a value and label for each impact stat, or remove the empty row.");
			return;
		}
		const input: PostInput = {
			slug: slug.trim(),
			category,
			title: title.trim(),
			excerpt: excerpt.trim(),
			image,
			date,
			author: {
				name: authorName.trim() || "Acts of Love Team",
				role: authorRole.trim() || undefined,
				avatar: authorAvatar || undefined,
			},
			readTime: readTime.trim(),
			body: blocks.map((b) => b.block),
			impactStats: impactStats.map((stat) => ({ value: stat.value.trim(), label: stat.label.trim() })),
			published,
		};
		setSaving(true);
		try {
			if (isEdit && originalSlug.current) {
				await updatePost(originalSlug.current, input);
			} else {
				await createPost(input);
			}
			navigate("/admin", { replace: true });
		} catch (e) {
			setError(e instanceof Error ? e.message : "Failed to save.");
		} finally {
			setSaving(false);
		}
	};

	if (loading)
		return (
			<div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#f8f9fb" }}>
				<p className="text-sm" style={{ color: "#888" }}>Loading…</p>
			</div>
		);

	return (
		<div className="min-h-screen pb-24" style={{ backgroundColor: "#f8f9fb" }}>
			<header className="bg-white border-b border-gray-100 sticky top-0 z-10">
				<div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
					<Button variant="ghost" to="/admin" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "#204487" }}>
						<FiArrowLeft size={15} /> Back
					</Button>
					<Button variant="primary" effect="custom"
						onClick={handleSave}
						disabled={saving}
						className="hover:opacity-90 transition-opacity disabled:opacity-60"
					>
						<FiSave size={15} /> {saving ? "Saving…" : "Save Post"}
					</Button>
				</div>
			</header>

			<main className="max-w-3xl mx-auto px-6 py-8">
				<h1 className="font-serif text-3xl font-bold mb-8" style={{ color: "#204487" }}>
					{isEdit ? "Edit Post" : "New Post"}
				</h1>

				{error && (
					<div className="text-sm p-3 rounded-lg border mb-6" style={{ backgroundColor: "#fff5f5", borderColor: "#fecaca", color: "#991b1b" }}>
						{error}
					</div>
				)}

				<div className="bg-white rounded-2xl border border-blue-100 p-6 md:p-8 flex flex-col gap-5">
					{/* Title */}
					<div>
						<label className={labelClass} style={{ color: "#888" }}>Title</label>
						<input className={inputClass} value={title} onChange={(e) => onTitleChange(e.target.value)} placeholder="Story headline" />
					</div>

					{/* Slug + Category */}
					<div className="grid sm:grid-cols-2 gap-4">
						<div>
							<label className={labelClass} style={{ color: "#888" }}>Slug (URL)</label>
							<input
								className={inputClass}
								value={slug}
								onChange={(e) => { setSlug(slugify(e.target.value)); setSlugEdited(true); }}
								placeholder="story-url-slug"
							/>
						</div>
						<div>
							<label className={labelClass} style={{ color: "#888" }}>Category</label>
							<select className={inputClass + " bg-white"} value={category} onChange={(e) => setCategory(e.target.value as PostCategory)}>
								{postCategories.map((c) => (
									<option key={c} value={c}>{c}</option>
								))}
							</select>
						</div>
					</div>

					{/* Excerpt */}
					<div>
						<label className={labelClass} style={{ color: "#888" }}>Excerpt (card + intro)</label>
						<textarea className={inputClass + " resize-none"} rows={2} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="One or two sentences shown on the listing card." />
					</div>

					{/* Cover image */}
					<div>
						<label className={labelClass} style={{ color: "#888" }}>Cover image</label>
						<ImageField
							value={image}
							uploading={uploadingKey === "cover"}
							onUpload={(file) => handleUpload(file, setImage, "cover")}
							onClear={() => setImage("")}
						/>
					</div>

					{/* Date + read time */}
					<div className="grid sm:grid-cols-2 gap-4">
						<div>
							<label className={labelClass} style={{ color: "#888" }}>Date</label>
							<input type="date" className={inputClass} value={date} onChange={(e) => setDate(e.target.value)} />
						</div>
						<div>
							<label className={labelClass} style={{ color: "#888" }}>Read time</label>
							<input className={inputClass} value={readTime} onChange={(e) => setReadTime(e.target.value)} placeholder="4 min read" />
						</div>
					</div>

					{/* Author */}
					<div className="grid sm:grid-cols-2 gap-4">
						<div>
							<label className={labelClass} style={{ color: "#888" }}>Author name</label>
							<input className={inputClass} value={authorName} onChange={(e) => setAuthorName(e.target.value)} placeholder="Team lead name" />
						</div>
						<div>
							<label className={labelClass} style={{ color: "#888" }}>Author role</label>
							<input className={inputClass} value={authorRole} onChange={(e) => setAuthorRole(e.target.value)} placeholder="Led the Kibuli outreach" />
						</div>
					</div>
					<div>
						<label className={labelClass} style={{ color: "#888" }}>Author photo (optional)</label>
						<ImageField
							value={authorAvatar}
							uploading={uploadingKey === "avatar"}
							onUpload={(file) => handleUpload(file, setAuthorAvatar, "avatar")}
							onClear={() => setAuthorAvatar("")}
							rounded
						/>
					</div>

					<section aria-labelledby="impact-stats-heading">
						<h2 id="impact-stats-heading" className="font-serif text-xl font-bold mb-2" style={{ color: "#204487" }}>Impact stats</h2>
						<p className="text-sm text-gray-500 mb-4">Add the results for this story. Leave this list empty to hide the impact card.</p>
						<div className="flex flex-col gap-3">
							{impactStats.map((stat, index) => (
								<div key={stat.key} className="grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto] gap-3 items-end">
									<div>
										<label htmlFor={`stat-value-${stat.key}`} className={labelClass}>Value</label>
										<input id={`stat-value-${stat.key}`} className={inputClass} value={stat.value} placeholder="e.g. 130+" onChange={(e) => setImpactStats((stats) => stats.map((s) => s.key === stat.key ? { ...s, value: e.target.value } : s))} />
									</div>
									<div className="col-start-1 row-start-2 sm:col-start-auto sm:row-start-auto">
										<label htmlFor={`stat-label-${stat.key}`} className={labelClass}>Label</label>
										<input id={`stat-label-${stat.key}`} className={inputClass} value={stat.label} placeholder="e.g. Lives directly reached" onChange={(e) => setImpactStats((stats) => stats.map((s) => s.key === stat.key ? { ...s, label: e.target.value } : s))} />
									</div>
									<Button variant="ghost" aria-label={`Remove impact stat ${index + 1}`} className="p-3 rounded-lg text-[#D91E26] hover:bg-red-50" onClick={() => setImpactStats((stats) => stats.filter((s) => s.key !== stat.key))}><FiTrash2 size={16} /></Button>
								</div>
							))}
						</div>
						<Button variant="outline" size="sm" effect="custom" className="mt-4 border-gray-200 text-[#204487] hover:border-[#204487] transition-colors" onClick={() => setImpactStats((stats) => [...stats, { key: nextKey(), value: "", label: "" }])}>Add stat</Button>
					</section>

					{/* Published toggle */}
					<label className="flex items-center gap-3 cursor-pointer">
						<input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="w-4 h-4 accent-[#204487]" />
						<span className="text-sm font-semibold" style={{ color: "#1D1E1F" }}>
							Published {published ? "" : "(saved as draft)"}
						</span>
					</label>
				</div>

				{/* ── BODY BLOCKS ── */}
				<div className="mt-8">
					<h2 className="font-serif text-xl font-bold mb-4" style={{ color: "#204487" }}>Article Body</h2>

					<div className="flex flex-col gap-4">
						{blocks.map((kb, i) => (
							<BlockEditor
								key={kb.key}
								kb={kb}
								index={i}
								total={blocks.length}
								uploading={uploadingKey === kb.key}
								onChange={(block) => patchBlock(kb.key, block)}
								onRemove={() => removeBlock(kb.key)}
								onMove={(d) => move(kb.key, d)}
								onUpload={(file, onDone) => handleUpload(file, onDone, kb.key)}
							/>
						))}
						{blocks.length === 0 && (
							<p className="text-sm text-center py-6" style={{ color: "#888" }}>
								No content blocks yet — add one below.
							</p>
						)}
					</div>

					{/* Add block buttons */}
					<div className="flex flex-wrap gap-2 mt-5">
						{([
							["p", "Paragraph"],
							["h2", "Heading"],
							["ul", "List"],
							["image", "Image"],
							["quote", "Quote"],
						] as [BodyBlock["type"], string][]).map(([type, label]) => (
							<Button variant="outline" size="custom" layout="custom" effect="custom"
								key={type}
								type="button"
								onClick={() => addBlock(type)}
								className="px-4 py-2 text-sm font-semibold border-gray-200 hover:border-[#204487] transition-colors"
								style={{ color: "#204487" }}
							>
								+ {label}
							</Button>
						))}
					</div>
				</div>
			</main>
		</div>
	);
}

// ── Image upload field ──
function ImageField({
	value,
	uploading,
	onUpload,
	onClear,
	rounded,
}: {
	value: string;
	uploading: boolean;
	onUpload: (file: File) => void;
	onClear: () => void;
	rounded?: boolean;
}) {
	const ref = useRef<HTMLInputElement>(null);
	return (
		<div className="flex items-center gap-4">
			{value ? (
				<img
					src={value}
					alt=""
					className={`object-cover border border-gray-200 ${rounded ? "w-14 h-14 rounded-full" : "w-24 h-16 rounded-lg"}`}
				/>
			) : (
				<div className={`flex items-center justify-center bg-[#f8f9fb] border border-dashed border-gray-300 ${rounded ? "w-14 h-14 rounded-full" : "w-24 h-16 rounded-lg"}`}>
					<FiUploadCloud size={18} style={{ color: "#aaa" }} />
				</div>
			)}
			<div className="flex items-center gap-2">
				<input
					ref={ref}
					type="file"
					accept="image/*"
					className="hidden"
					onChange={(e) => {
						const f = e.target.files?.[0];
						if (f) onUpload(f);
						e.target.value = "";
					}}
				/>
				<Button variant="outline" size="custom" layout="custom" effect="custom"
					type="button"
					onClick={() => ref.current?.click()}
					disabled={uploading}
					className="px-4 py-2 text-sm font-semibold border-gray-200 hover:border-[#204487] transition-colors disabled:opacity-60"
					style={{ color: "#204487" }}
				>
					{uploading ? "Uploading…" : value ? "Replace" : "Upload"}
				</Button>
				{value && !uploading && (
					<Button variant="ghost" type="button" onClick={onClear} className="text-sm font-semibold" style={{ color: "#D91E26" }}>
						Remove
					</Button>
				)}
			</div>
		</div>
	);
}

// ── Per-block editor ──
function BlockEditor({
	kb,
	index,
	total,
	uploading,
	onChange,
	onRemove,
	onMove,
	onUpload,
}: {
	kb: Keyed;
	index: number;
	total: number;
	uploading: boolean;
	onChange: (b: BodyBlock) => void;
	onRemove: () => void;
	onMove: (dir: -1 | 1) => void;
	onUpload: (file: File, onDone: (url: string) => void) => void;
}) {
	const { block } = kb;
	const ref = useRef<HTMLInputElement>(null);
	const ta = inputClass + " resize-none";

	return (
		<div className="bg-white rounded-xl border border-gray-100 p-4">
			<div className="flex items-center justify-between mb-3">
				<span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#888" }}>
					{block.type === "p" ? "Paragraph" : block.type === "h2" ? "Heading" : block.type === "ul" ? "List" : block.type === "image" ? "Image" : "Quote"}
				</span>
				<div className="flex items-center gap-1">
					<Button variant="ghost" type="button" onClick={() => onMove(-1)} disabled={index === 0} className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30" title="Move up" style={{ color: "#204487" }}>
						<FiChevronUp size={15} />
					</Button>
					<Button variant="ghost" type="button" onClick={() => onMove(1)} disabled={index === total - 1} className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30" title="Move down" style={{ color: "#204487" }}>
						<FiChevronDown size={15} />
					</Button>
					<Button variant="ghost" type="button" onClick={onRemove} className="p-1.5 rounded hover:bg-red-50" title="Remove" style={{ color: "#D91E26" }}>
						<FiTrash2 size={15} />
					</Button>
				</div>
			</div>

			{block.type === "p" && (
				<InlineRichText value={block.text} onChange={(html) => onChange({ type: "p", text: html })} />
			)}
			{block.type === "h2" && (
				<input className={inputClass} value={block.text} onChange={(e) => onChange({ type: "h2", text: e.target.value })} placeholder="Section heading" />
			)}
			{block.type === "quote" && (
				<textarea rows={2} className={ta} value={block.text} onChange={(e) => onChange({ type: "quote", text: e.target.value })} placeholder="Pull-quote text…" />
			)}
			{block.type === "ul" && (
				<ListRichText value={block.items} onChange={(items) => onChange({ type: "ul", items })} />
			)}
			{block.type === "image" && (
				<div className="flex flex-col gap-3">
					<div className="flex items-center gap-4">
						{block.src ? (
							<img src={block.src} alt="" className="w-28 h-20 object-cover rounded-lg border border-gray-200" />
						) : (
							<div className="w-28 h-20 flex items-center justify-center bg-[#f8f9fb] border border-dashed border-gray-300 rounded-lg">
								<FiUploadCloud size={18} style={{ color: "#aaa" }} />
							</div>
						)}
						<input
							ref={ref}
							type="file"
							accept="image/*"
							className="hidden"
							onChange={(e) => {
								const f = e.target.files?.[0];
								if (f) onUpload(f, (url) => onChange({ ...block, src: url }));
								e.target.value = "";
							}}
						/>
						<Button variant="outline" size="custom" layout="custom" effect="custom" type="button" onClick={() => ref.current?.click()} disabled={uploading} className="px-4 py-2 text-sm font-semibold border-gray-200 hover:border-[#204487] transition-colors disabled:opacity-60" style={{ color: "#204487" }}>
							{uploading ? "Uploading…" : block.src ? "Replace" : "Upload"}
						</Button>
					</div>
					<input className={inputClass} value={block.caption ?? ""} onChange={(e) => onChange({ ...block, caption: e.target.value })} placeholder="Caption (optional)" />
					<select className={inputClass + " bg-white"} value={block.align ?? "full"} onChange={(e) => onChange({ ...block, align: e.target.value as "full" | "left" | "right" })}>
						<option value="full">Full width</option>
						<option value="left">Float left (text wraps on the right)</option>
						<option value="right">Float right (text wraps on the left)</option>
					</select>
				</div>
			)}
		</div>
	);
}
