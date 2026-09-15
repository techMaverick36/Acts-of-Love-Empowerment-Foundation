import Button from "./Button";
import { useEffect, useRef } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import HardBreak from "@tiptap/extension-hard-break";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { FiBold, FiItalic, FiLink } from "react-icons/fi";

const linkExt = Link.configure({
	openOnClick: false,
	HTMLAttributes: { rel: "noopener noreferrer" },
});

// In the paragraph editor the document is inline-only, so there is no block to
// split — plain Enter would do nothing. Map Enter (and Shift/Mod-Enter) to a
// hard break so pressing Enter inserts a new line, as users expect.
const InlineHardBreak = HardBreak.extend({
	addKeyboardShortcuts() {
		const br = () => this.editor.commands.setHardBreak();
		return { Enter: br, "Shift-Enter": br, "Mod-Enter": br };
	},
});

// The list document only allows a bullet list, so an empty item can't be lifted
// out. Make Enter always add a new bullet, even from an empty item.
const SmartListItem = ListItem.extend({
	addKeyboardShortcuts() {
		return {
			...this.parent?.(),
			Enter: () => {
				if (this.editor.commands.splitListItem(this.name)) return true;
				// Empty item: append a fresh empty bullet instead of stalling.
				return this.editor
					.chain()
					.insertContent({
						type: this.name,
						content: [{ type: "paragraph" }],
					})
					.focus()
					.run();
			},
		};
	},
});

function Toolbar({ editor }: { editor: Editor }) {
	const addLink = () => {
		const prev = editor.getAttributes("link").href as string | undefined;
		const url = window.prompt("Link URL", prev || "https://");
		if (url === null) return;
		if (url === "") {
			editor.chain().focus().extendMarkRange("link").unsetLink().run();
			return;
		}
		editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
	};
	const cls = (active: boolean) =>
		`w-7 h-7 flex items-center justify-center rounded text-sm transition-colors ${
			active ? "bg-[#204487] text-white" : "text-[#204487] hover:bg-[#eef2fa]"
		}`;
	return (
		<div className="flex items-center gap-1 px-2 py-1.5 border-b border-gray-200 bg-[#f8f9fb]">
			<Button variant="ghost" type="button" onMouseDown={(e) => e.preventDefault()} className={cls(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold" aria-label="Bold">
				<FiBold size={13} />
			</Button>
			<Button variant="ghost" type="button" onMouseDown={(e) => e.preventDefault()} className={cls(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic" aria-label="Italic">
				<FiItalic size={13} />
			</Button>
			<Button variant="ghost" type="button" onMouseDown={(e) => e.preventDefault()} className={cls(editor.isActive("link"))} onClick={addLink} title="Add link" aria-label="Add link">
				<FiLink size={13} />
			</Button>
		</div>
	);
}

const shell =
	"rounded-lg border-2 border-gray-200 overflow-hidden focus-within:border-[#204487] transition-colors bg-white";

// Click anywhere in the editor body to place the cursor at the end, so the
// generous empty area below the text is a usable click target, not dead space.
const focusEnd = (editor: Editor) => (e: React.MouseEvent) => {
	if ((e.target as HTMLElement).closest(".ProseMirror")) return;
	editor.chain().focus("end").run();
};

// ── Paragraph: inline rich text (bold / italic / link) ──
const InlineDoc = Document.extend({ content: "inline*" });

export function InlineRichText({
	value,
	onChange,
}: {
	value: string;
	onChange: (html: string) => void;
}) {
	const editor = useEditor({
		extensions: [InlineDoc, Text, Bold, Italic, InlineHardBreak, linkExt],
		content: value || "",
		onUpdate: ({ editor }) => onChange(editor.getHTML()),
		editorProps: {
			// data-ph drives a CSS placeholder (the inline-only doc has no child
			// textblock for the Placeholder extension to decorate).
			attributes: {
				class: "mini-editor focus:outline-none",
				"data-ph": "Write a paragraph… (Enter for a new line)",
			},
		},
	});

	useEffect(() => {
		if (editor && value !== editor.getHTML()) {
			editor.commands.setContent(value || "", { emitUpdate: false });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editor, value]);

	if (!editor) return null;
	return (
		<div className={shell} onMouseDown={focusEnd(editor)}>
			<Toolbar editor={editor} />
			<EditorContent editor={editor} />
		</div>
	);
}

// ── List: bullet list of rich items, stored as string[] ──
const ListDoc = Document.extend({ content: "bulletList" });

const itemsToHtml = (items: string[]) =>
	`<ul>${(items.length ? items : [""])
		.map((i) => `<li><p>${i || ""}</p></li>`)
		.join("")}</ul>`;

const htmlToItems = (html: string): string[] => {
	const doc = new DOMParser().parseFromString(html, "text/html");
	return [...doc.querySelectorAll("li")].map((li) => {
		const p = li.querySelector("p");
		return (p ? p.innerHTML : li.innerHTML).trim();
	});
};

export function ListRichText({
	value,
	onChange,
}: {
	value: string[];
	onChange: (items: string[]) => void;
}) {
	const lastEmitted = useRef(JSON.stringify(value));
	const editor = useEditor({
		extensions: [
			ListDoc,
			Paragraph,
			Text,
			Bold,
			Italic,
			SmartListItem,
			BulletList,
			linkExt,
			Placeholder.configure({
				placeholder: "List item… (Enter for the next one)",
				includeChildren: true,
			}),
		],
		content: itemsToHtml(value),
		onUpdate: ({ editor }) => {
			const items = htmlToItems(editor.getHTML());
			lastEmitted.current = JSON.stringify(items);
			onChange(items);
		},
		editorProps: { attributes: { class: "mini-editor mini-list focus:outline-none" } },
	});

	useEffect(() => {
		if (editor && JSON.stringify(value) !== lastEmitted.current) {
			editor.commands.setContent(itemsToHtml(value), { emitUpdate: false });
			lastEmitted.current = JSON.stringify(value);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editor, value]);

	if (!editor) return null;
	return (
		<div className={shell} onMouseDown={focusEnd(editor)}>
			<Toolbar editor={editor} />
			<EditorContent editor={editor} />
		</div>
	);
}
