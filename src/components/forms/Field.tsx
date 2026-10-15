import { useId, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export const controlClass =
	"w-full rounded-lg border-2 border-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-gray-400 transition-colors focus:border-brand-blue focus:outline-none";

type FieldShellProps = {
	label: ReactNode;
	id: string;
	hint?: ReactNode;
	className?: string;
	children: ReactNode;
};

function FieldShell({ label, id, hint, className, children }: FieldShellProps) {
	return (
		<div className={className}>
			<label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
				{label}
			</label>
			{children}
			{hint && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
		</div>
	);
}

type Common = { label: ReactNode; hint?: ReactNode; className?: string };

/** Labelled text input. All native <input> props pass through. */
export function InputField({ label, hint, className, id, ...input }: Common & ComponentPropsWithoutRef<"input">) {
	const autoId = useId();
	const fieldId = id ?? autoId;
	return (
		<FieldShell label={label} id={fieldId} hint={hint} className={className}>
			<input id={fieldId} {...input} className={controlClass} />
		</FieldShell>
	);
}

/** Labelled <select>. Pass <option>s as children. */
export function SelectField({ label, hint, className, id, children, ...select }: Common & ComponentPropsWithoutRef<"select">) {
	const autoId = useId();
	const fieldId = id ?? autoId;
	return (
		<FieldShell label={label} id={fieldId} hint={hint} className={className}>
			<select id={fieldId} {...select} className={cn(controlClass, "text-body")}>
				{children}
			</select>
		</FieldShell>
	);
}

/** Labelled <textarea>. */
export function TextareaField({ label, hint, className, id, ...textarea }: Common & ComponentPropsWithoutRef<"textarea">) {
	const autoId = useId();
	const fieldId = id ?? autoId;
	return (
		<FieldShell label={label} id={fieldId} hint={hint} className={className}>
			<textarea id={fieldId} {...textarea} className={cn(controlClass, "resize-none py-3")} />
		</FieldShell>
	);
}

/** Caption for a <fieldset> of related controls (e.g. chip groups). Place it first inside the fieldset. */
export function FieldGroupLabel({ children }: { children: ReactNode }) {
	return <legend className="mb-2.5 text-sm font-semibold text-ink">{children}</legend>;
}
