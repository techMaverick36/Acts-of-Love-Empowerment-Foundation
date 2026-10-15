/** Options offered by every donation form (Donate page and the Programs modal). */

export type DonationAmount = number | "other";
export type DonationFrequency = "one-time" | "monthly";

export const DONATION_AMOUNTS: { label: string; value: DonationAmount }[] = [
	{ label: "$10", value: 10 },
	{ label: "$25", value: 25 },
	{ label: "$50", value: 50 },
	{ label: "$100", value: 100 },
	{ label: "Other", value: "other" },
];

export const DONATION_REASONS = [
	"Where needed most",
	"Education & Scholarships",
	"Healthcare & Medical Support",
	"Women & Youth Support",
	"Medical Emergency Fund",
	"Food Relief",
	"Shelter & Community Projects",
	"Other",
];

export const DEFAULT_REASON = DONATION_REASONS[0];

export const DONATION_FREQUENCIES: { value: DonationFrequency; label: string }[] = [
	{ value: "one-time", label: "One-time" },
	{ value: "monthly", label: "Monthly" },
];

/** What a donation form hands to /checkout (via router state). */
export type CheckoutState = {
	amount: number | string;
	reason: string;
	frequency: DonationFrequency;
	firstName: string;
	lastName: string;
	email: string;
};
