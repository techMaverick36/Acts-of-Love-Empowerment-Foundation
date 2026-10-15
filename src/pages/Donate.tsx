import { FiHeart } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import DonationForm from "../components/forms/DonationForm";
import PageLayout from "../components/layout/PageLayout";
import { Container } from "../components/layout/Section";
import { PAGES } from "../config/seo";
import type { DonationAmount, DonationFrequency } from "../data/donations";

/** Optional router state other pages can pass when linking to /donate. */
type DonatePreset = {
	suggestedAmount?: DonationAmount;
	designation?: string;
	frequency?: DonationFrequency;
};

const promises = [
	{ title: "Clear Use of Funds", text: "100% of your donation goes directly to our field programs.", bar: "bg-brand-teal" },
	{
		title: "Steady Support",
		text: "Monthly donations help us plan school, health, and family support.",
		bar: "bg-brand-red",
	},
];

export default function DonatePage() {
	const preset = (useLocation().state as DonatePreset | null) ?? {};

	return (
		<PageLayout seo={PAGES.donate} offsetHeader className="bg-surface">
			<Container width="wide" className="py-16">
				<div className="grid overflow-hidden rounded-3xl bg-white shadow-[0_30px_60px_-35px_rgba(32,68,135,0.45)] md:grid-cols-[2fr_3fr]">
					<div className="bg-brand-blue p-8 text-white md:p-12">
						<FiHeart aria-hidden className="mb-5 size-12 text-brand-orange" />
						<h1 className="mb-4 font-serif text-3xl font-semibold">Make a Donation</h1>
						<p className="mb-10 leading-relaxed text-blue-100">
							Your donation supports education, healthcare, food relief, and community programs. Thank you for
							helping us serve.
						</p>
						<ul className="space-y-6">
							{promises.map((p) => (
								<li key={p.title} className="flex gap-4">
									<span aria-hidden className={`w-1.5 shrink-0 rounded-full ${p.bar}`} />
									<p className="text-sm">
										<span className="mb-1 block font-bold">{p.title}</span>
										{p.text}
									</p>
								</li>
							))}
						</ul>
					</div>

					<div className="p-8 md:p-12">
						{preset.designation && (
							<div className="mb-6 rounded-xl border-2 border-brand-orange/30 bg-brand-orange/5 p-3">
								<p className="mb-1 text-xs font-bold uppercase tracking-wider text-brand-orange">Designated Gift</p>
								<p className="text-sm text-gray-700">
									Suggested designation: <span className="font-semibold">{preset.designation}</span>
								</p>
							</div>
						)}
						<DonationForm
							initialAmount={preset.suggestedAmount}
							initialReason={preset.designation}
							initialFrequency={preset.frequency}
							submitLabel="Continue to Checkout"
							footnote="By continuing, you agree to our Terms of Service and Privacy Policy. Secure payment processing powered by Stripe."
						/>
					</div>
				</div>
			</Container>
		</PageLayout>
	);
}
