import { useState, type FormEvent, type ReactNode } from "react";
import type { IconType } from "react-icons";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
	DEFAULT_REASON,
	DONATION_AMOUNTS,
	DONATION_FREQUENCIES,
	DONATION_REASONS,
	type CheckoutState,
	type DonationAmount,
	type DonationFrequency,
} from "../../data/donations";
import { cn } from "../../lib/cn";
import Button from "../ui/Button";
import { ChoiceChip, SegmentedControl } from "../ui/ChoiceChip";
import { FieldGroupLabel, InputField, controlClass } from "./Field";

type DonationFormProps = {
	initialAmount?: DonationAmount;
	/** Preselects a purpose; anything not in the list is put under "Other". */
	initialReason?: string;
	initialFrequency?: DonationFrequency;
	submitLabel: ReactNode;
	submitIcon?: IconType;
	footnote: ReactNode;
	className?: string;
};

/** Amount, purpose and donor details; continues to /checkout. */
export default function DonationForm({
	initialAmount = 25,
	initialReason = DEFAULT_REASON,
	initialFrequency = "one-time",
	submitLabel,
	submitIcon,
	footnote,
	className,
}: DonationFormProps) {
	const navigate = useNavigate();
	const knownReason = DONATION_REASONS.includes(initialReason);

	const [frequency, setFrequency] = useState<DonationFrequency>(initialFrequency);
	const [amount, setAmount] = useState<DonationAmount>(initialAmount);
	const [customAmount, setCustomAmount] = useState("");
	const [reason, setReason] = useState(knownReason ? initialReason : "Other");
	const [otherReason, setOtherReason] = useState(knownReason ? "" : initialReason);
	const [donor, setDonor] = useState({ firstName: "", lastName: "", email: "" });

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const state: CheckoutState = {
			amount: amount === "other" ? customAmount : amount,
			reason: reason === "Other" ? otherReason.trim() : reason,
			frequency,
			...donor,
		};
		navigate("/checkout", { state });
	};

	return (
		<form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)}>
			<SegmentedControl label="Donation frequency" options={DONATION_FREQUENCIES} value={frequency} onChange={setFrequency} />

			<fieldset>
				<FieldGroupLabel>Select Amount</FieldGroupLabel>
				<div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
					{DONATION_AMOUNTS.map((option) => (
						<ChoiceChip
							key={option.label}
							tone="red"
							selected={amount === option.value}
							onSelect={() => setAmount(option.value)}
						>
							{option.label}
						</ChoiceChip>
					))}
				</div>
				{amount === "other" && (
					<div className="relative mt-3">
						<span aria-hidden className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">
							$
						</span>
						<input
							type="number"
							min="1"
							required
							aria-label="Custom amount in US dollars"
							placeholder="Enter amount"
							value={customAmount}
							onChange={(e) => setCustomAmount(e.target.value)}
							className={cn(controlClass, "pl-8 font-bold")}
						/>
					</div>
				)}
			</fieldset>

			<fieldset>
				<FieldGroupLabel>Donation Purpose</FieldGroupLabel>
				<div className="grid gap-2 sm:grid-cols-2">
					{DONATION_REASONS.map((r) => (
						<ChoiceChip key={r} align="left" selected={reason === r} onSelect={() => setReason(r)} className="text-xs sm:text-sm">
							{r}
						</ChoiceChip>
					))}
				</div>
				{reason === "Other" && (
					<InputField
						className="mt-3"
						label="Please specify"
						required
						placeholder="Type your donation reason"
						value={otherReason}
						onChange={(e) => setOtherReason(e.target.value)}
					/>
				)}
			</fieldset>

			<div className="grid gap-4 sm:grid-cols-2">
				<InputField
					label="First Name"
					required
					autoComplete="given-name"
					value={donor.firstName}
					onChange={(e) => setDonor({ ...donor, firstName: e.target.value })}
				/>
				<InputField
					label="Last Name"
					required
					autoComplete="family-name"
					value={donor.lastName}
					onChange={(e) => setDonor({ ...donor, lastName: e.target.value })}
				/>
			</div>
			<InputField
				label="Email Address"
				type="email"
				required
				autoComplete="email"
				value={donor.email}
				onChange={(e) => setDonor({ ...donor, email: e.target.value })}
			/>

			<Button type="submit" size="lg" fullWidth icon={submitIcon} trailingIcon={FiArrowRight}>
				{submitLabel}
			</Button>

			<p className="text-center text-[11px] leading-relaxed text-gray-400">{footnote}</p>
		</form>
	);
}
