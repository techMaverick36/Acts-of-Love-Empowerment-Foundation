import { useEffect, useRef, useState, type ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiChevronDown, FiChevronUp, FiPlus, FiSave, FiTrash2, FiUploadCloud, FiX } from "react-icons/fi";
import { InlineRichText, ListRichText } from "../../components/admin/BlockEditors";
import { InputField, SelectField, TextareaField, controlClass } from "../../components/forms/Field";
import Seo from "../../components/seo/Seo";
import { Alert } from "../../components/ui/Alert";
import Button from "../../components/ui/Button";
import IconButton from "../../components/ui/IconButton";
import { PAGES } from "../../config/seo";
import { cn } from "../../lib/cn";
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
			<div className="flex min-h-screen items-center justify-center bg-surface">
				<p className="text-sm text-muted">Loading…</p>
			</div>
		);

	return (
		<div className="min-h-screen bg-surface pb-24">
			<Seo {...PAGES.admin} title={isEdit ? "Edit Post" : "New Post"} />
			<header className="sticky top-0 z-10 border-b border-line bg-white">
				<div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
					<Button to="/admin" variant="link" icon={FiArrowLeft} className="text-sm">
						Back
					</Button>
					<Button size="sm" icon={FiSave} onClick={handleSave} disabled={saving}>
						{saving ? "Saving…" : "Save Post"}
					</Button>
				</div>
			</header>

			<main className="mx-auto max-w-3xl px-6 py-8">
				<h1 className="mb-8 font-serif text-3xl font-semibold text-brand-blue">{isEdit ? "Edit Post" : "New Post"}</h1>

				{error && <Alert className="mb-6">{error}</Alert>}

				<div className="flex flex-col gap-5 rounded-2xl border border-line bg-white p-6 md:p-8">
					<InputField label="Title" value={title} onChange={(e) => onTitleChange(e.target.value)} placeholder="Story headline" />

					<div className="grid gap-4 sm:grid-cols-2">
						<InputField
							label="Slug (URL)"
							value={slug}
							onChange={(e) => {
								setSlug(slugify(e.target.value));
								setSlugEdited(true);
							}}
							placeholder="story-url-slug"
						/>
						<SelectField label="Category" value={category} onChange={(e) => setCategory(e.target.value as PostCategory)}>
							{postCategories.map((c) => (
								<option key={c} value={c}>
									{c}
								</option>
							))}
						</SelectField>
					</div>

					<TextareaField
						label="Excerpt (card + intro)"
						rows={2}
						value={excerpt}
						onChange={(e) => setExcerpt(e.target.value)}
						placeholder="One or two sentences shown on the listing card."
					/>

					<div>
						<FieldLabel>Cover image</FieldLabel>
						<ImageField
							value={image}
							uploading={uploadingKey === "cover"}
							onUpload={(file) => handleUpload(file, setImage, "cover")}
							onClear={() => setImage("")}
						/>
					</div>

					<div className="grid gap-4 sm:grid-cols-2">
						<InputField label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
						<InputField label="Read time" value={readTime} onChange={(e) => setReadTime(e.target.value)} placeholder="4 min read" />
					</div>

					<div className="grid gap-4 sm:grid-cols-2">
						<InputField label="Author name" value={authorName} onChange={(e) => setAuthorName(e.target.value)} placeholder="Team lead name" />
						<InputField label="Author role" value={authorRole} onChange={(e) => setAuthorRole(e.target.value)} placeholder="Led the Kibuli outreach" />
					</div>
					<div>
						<FieldLabel>Author photo (optional)</FieldLabel>
						<ImageField
							value={authorAvatar}
							uploading={uploadingKey === "avatar"}
							onUpload={(file) => handleUpload(file, setAuthorAvatar, "avatar")}
							onClear={() => setAuthorAvatar("")}
							rounded
						/>
					</div>

					<section aria-labelledby="impact-stats-heading">
						<h2 id="impact-stats-heading" className="mb-2 font-serif text-xl font-semibold text-brand-blue">
							Impact stats
						</h2>
						<p className="mb-4 text-sm text-gray-500">
							Add the results for this story. Leave this list empty to hide the impact card.
						</p>
						<div className="flex flex-col gap-3">
							{impactStats.map((stat, index) => (
								<div
									key={stat.key}
									className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto]"
								>
									<InputField
										label="Value"
										value={stat.value}
										placeholder="e.g. 130+"
										onChange={(e) =>
											setImpactStats((stats) => stats.map((s) => (s.key === stat.key ? { ...s, value: e.target.value } : s)))
										}
									/>
									<InputField
										className="col-start-1 row-start-2 sm:col-start-auto sm:row-start-auto"
										label="Label"
										value={stat.label}
										placeholder="e.g. Lives directly reached"
										onChange={(e) =>
											setImpactStats((stats) => stats.map((s) => (s.key === stat.key ? { ...s, label: e.target.value } : s)))
										}
									/>
									<IconButton
										tone="danger"
										size="lg"
										icon={FiTrash2}
										label={`Remove impact stat ${index + 1}`}
										onClick={() => setImpactStats((stats) => stats.filter((s) => s.key !== stat.key))}
									/>
								</div>
							))}
						</div>
						<Button
							variant="subtle"
							size="sm"
							icon={FiPlus}
							className="mt-4"
							onClick={() => setImpactStats((stats) => [...stats, { key: nextKey(), value: "", label: "" }])}
						>
							Add stat
						</Button>
					</section>

					<label className="flex cursor-pointer items-center gap-3">
						<input
							type="checkbox"
							checked={published}
							onChange={(e) => setPublished(e.target.checked)}
							className="size-4 accent-brand-blue"
						/>
						<span className="text-sm font-semibold text-ink">Published {published ? "" : "(saved as draft)"}</span>
					</label>
				</div>

				{/* ── BODY BLOCKS ── */}
				<div className="mt-8">
					<h2 className="mb-4 font-serif text-xl font-semibold text-brand-blue">Article Body</h2>

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
							<p className="py-6 text-center text-sm text-muted">No content blocks yet — add one below.</p>
						)}
					</div>

					<div className="mt-5 flex flex-wrap gap-2">
						{BLOCK_TYPES.map((type) => (
							<Button key={type} variant="subtle" size="sm" icon={FiPlus} onClick={() => addBlock(type)}>
								{BLOCK_LABELS[type]}
							</Button>
						))}
					</div>
				</div>
			</main>
		</div>
	);
}

const BLOCK_LABELS: Record<BodyBlock["type"], string> = {
	p: "Paragraph",
	h2: "Heading",
	ul: "List",
	image: "Image",
	quote: "Quote",
};
const BLOCK_TYPES = Object.keys(BLOCK_LABELS) as BodyBlock["type"][];

function FieldLabel({ children }: { children: ReactNode }) {
	return <p className="mb-1.5 text-sm font-semibold text-ink">{children}</p>;
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
	const box = rounded ? "size-14 rounded-full" : "h-16 w-24 rounded-lg";
	return (
		<div className="flex items-center gap-4">
			{value ? (
				<img src={value} alt="" className={cn("border border-line object-cover", box)} />
			) : (
				<div className={cn("flex items-center justify-center border border-dashed border-gray-300 bg-surface", box)}>
					<FiUploadCloud aria-hidden size={18} className="text-gray-400" />
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
				<Button variant="subtle" size="sm" icon={FiUploadCloud} onClick={() => ref.current?.click()} disabled={uploading}>
					{uploading ? "Uploading…" : value ? "Replace" : "Upload"}
				</Button>
				{value && !uploading && (
					<Button variant="link-red" icon={FiX} onClick={onClear} className="text-sm">
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

	return (
		<div className="rounded-xl border border-line bg-white p-4">
			<div className="mb-3 flex items-center justify-between">
				<span className="text-[11px] font-bold uppercase tracking-widest text-muted">{BLOCK_LABELS[block.type]}</span>
				<div className="flex items-center gap-1">
					<IconButton size="sm" icon={FiChevronUp} label="Move up" onClick={() => onMove(-1)} disabled={index === 0} className="disabled:opacity-30" />
					<IconButton size="sm" icon={FiChevronDown} label="Move down" onClick={() => onMove(1)} disabled={index === total - 1} className="disabled:opacity-30" />
					<IconButton size="sm" tone="danger" icon={FiTrash2} label="Remove" onClick={onRemove} />
				</div>
			</div>

			{block.type === "p" && <InlineRichText value={block.text} onChange={(html) => onChange({ type: "p", text: html })} />}
			{block.type === "h2" && (
				<input
					aria-label="Section heading"
					className={controlClass}
					value={block.text}
					onChange={(e) => onChange({ type: "h2", text: e.target.value })}
					placeholder="Section heading"
				/>
			)}
			{block.type === "quote" && (
				<textarea
					aria-label="Pull-quote text"
					rows={2}
					className={cn(controlClass, "resize-none")}
					value={block.text}
					onChange={(e) => onChange({ type: "quote", text: e.target.value })}
					placeholder="Pull-quote text…"
				/>
			)}
			{block.type === "ul" && <ListRichText value={block.items} onChange={(items) => onChange({ type: "ul", items })} />}
			{block.type === "image" && (
				<div className="flex flex-col gap-3">
					<div className="flex items-center gap-4">
						{block.src ? (
							<img src={block.src} alt="" className="h-20 w-28 rounded-lg border border-line object-cover" />
						) : (
							<div className="flex h-20 w-28 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-surface">
								<FiUploadCloud aria-hidden size={18} className="text-gray-400" />
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
						<Button variant="subtle" size="sm" icon={FiUploadCloud} onClick={() => ref.current?.click()} disabled={uploading}>
							{uploading ? "Uploading…" : block.src ? "Replace" : "Upload"}
						</Button>
					</div>
					<input
						aria-label="Caption"
						className={controlClass}
						value={block.caption ?? ""}
						onChange={(e) => onChange({ ...block, caption: e.target.value })}
						placeholder="Caption (optional)"
					/>
					<select
						aria-label="Image alignment"
						className={controlClass}
						value={block.align ?? "full"}
						onChange={(e) => onChange({ ...block, align: e.target.value as "full" | "left" | "right" })}
					>
						<option value="full">Full width</option>
						<option value="left">Float left (text wraps on the right)</option>
						<option value="right">Float right (text wraps on the left)</option>
					</select>
				</div>
			)}
		</div>
	);
}
