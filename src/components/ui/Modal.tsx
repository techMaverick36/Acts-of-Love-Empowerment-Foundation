import { useEffect, useRef, type ReactNode } from "react";
import { FiX } from "react-icons/fi";
import { cn } from "../../lib/cn";
import IconButton from "./IconButton";

type ModalProps = {
	/** id of the element that names the dialog (usually its heading). */
	labelledBy: string;
	onClose: () => void;
	/** Content of the sticky top bar, left of the close button. */
	header: ReactNode;
	className?: string;
	children: ReactNode;
};

/**
 * Modal dialog built on the native <dialog> element, which handles focus
 * trapping and Escape. Render it only while open; unmounting closes it.
 */
export default function Modal({ labelledBy, onClose, header, className, children }: ModalProps) {
	const ref = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = ref.current;
		dialog?.showModal();
		const { overflow } = document.body.style;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = overflow;
			dialog?.close();
		};
	}, []);

	return (
		<dialog
			ref={ref}
			aria-labelledby={labelledBy}
			onCancel={(e) => {
				e.preventDefault();
				onClose();
			}}
			onClick={(e) => e.target === e.currentTarget && onClose()}
			className={cn(
				"m-auto max-h-[90vh] w-[calc(100%-2rem)] overflow-hidden rounded-2xl bg-white p-0 shadow-2xl backdrop:bg-black/65",
				className,
			)}
		>
			<div className="flex max-h-[90vh] flex-col">
				<div className="flex shrink-0 items-center justify-between gap-4 border-b border-line px-6 py-5 sm:px-7">
					{header}
					<IconButton label="Close" icon={FiX} iconSize={20} onClick={onClose} />
				</div>
				<div className="min-h-0 flex-1 overflow-y-auto lg:overflow-hidden">{children}</div>
			</div>
		</dialog>
	);
}
