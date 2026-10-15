import type { ReactNode } from "react";
import { FiAlertCircle, FiAlertTriangle, FiCheckCircle } from "react-icons/fi";
import { cn } from "../../lib/cn";

const tones = {
	error: { box: "border-red-200 bg-red-50 text-red-800", Icon: FiAlertCircle },
	warning: { box: "border-orange-200 bg-orange-50 text-orange-800", Icon: FiAlertTriangle },
} as const;

type AlertProps = {
	tone?: keyof typeof tones;
	children: ReactNode;
	className?: string;
};

/** Inline message box for form errors and configuration warnings. */
export function Alert({ tone = "error", children, className }: AlertProps) {
	const { box, Icon } = tones[tone];
	return (
		<div role={tone === "error" ? "alert" : "status"} className={cn("flex gap-2.5 rounded-lg border p-3 text-sm", box, className)}>
			<Icon aria-hidden size={16} className="mt-0.5 shrink-0" />
			<div>{children}</div>
		</div>
	);
}

type SuccessMessageProps = {
	title: ReactNode;
	children: ReactNode;
	className?: string;
};

/** Confirmation panel shown in place of a form after it was sent. */
export function SuccessMessage({ title, children, className }: SuccessMessageProps) {
	return (
		<div role="status" className={cn("rounded-2xl border border-line bg-surface p-10 text-center md:p-12", className)}>
			<span className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-brand-green text-white">
				<FiCheckCircle aria-hidden size={30} />
			</span>
			<h3 className="mb-3 font-serif text-2xl font-semibold text-brand-blue">{title}</h3>
			<p className="text-base text-body">{children}</p>
		</div>
	);
}
