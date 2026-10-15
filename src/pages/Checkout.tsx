import { FiCheck, FiCreditCard, FiLock } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import { Container } from "../components/layout/Section";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { PAGES } from "../config/seo";
import { DONATION_FREQUENCIES, type CheckoutState } from "../data/donations";

const fallback: CheckoutState = {
	amount: 0,
	reason: "",
	frequency: "one-time",
	firstName: "Guest",
	lastName: "",
	email: "",
};

export default function CheckoutPage() {
	const { amount, frequency, firstName, lastName, email } =
		(useLocation().state as CheckoutState | null) ?? fallback;
	const frequencyLabel = DONATION_FREQUENCIES.find((f) => f.value === frequency)?.label ?? "One-time";

	return (
		<PageLayout seo={PAGES.checkout} offsetHeader className="bg-gray-50">
			<Container width="medium" className="py-16">
				<div className="mb-12 text-center">
					<h1 className="mb-2 font-serif text-3xl font-semibold text-brand-blue">Complete Your Donation</h1>
					<p className="flex items-center justify-center gap-2 text-gray-600">
						<FiLock aria-hidden className="text-green-600" /> Secure Checkout
					</p>
				</div>

				<div className="grid gap-8 md:grid-cols-3">
					<div className="space-y-6">
						<Card padding="md" className="shadow-sm">
							<h2 className="mb-4 font-sans font-bold text-gray-800">Summary</h2>
							<dl className="text-sm">
								<div className="mb-2 flex justify-between">
									<dt className="text-gray-500">Donation Amount</dt>
									<dd className="font-bold">${amount}</dd>
								</div>
								<div className="mb-4 flex justify-between">
									<dt className="text-gray-500">Frequency</dt>
									<dd className="text-gray-800">{frequencyLabel}</dd>
								</div>
								<div className="flex justify-between border-t border-line pt-4">
									<dt className="font-bold">Total</dt>
									<dd className="text-xl font-bold text-brand-red">${amount}</dd>
								</div>
							</dl>
						</Card>

						<div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
							<h2 className="mb-2 font-sans text-sm font-bold text-brand-blue">Donor Information</h2>
							<p className="text-sm text-gray-700">
								{firstName} {lastName}
							</p>
							<p className="text-sm text-gray-500">{email}</p>
						</div>
					</div>

					{/* Payment method — placeholder until a payment provider is connected. */}
					<Card className="shadow-md md:col-span-2">
						<div className="mb-8 flex items-center gap-4">
							<span className="flex size-12 items-center justify-center rounded-full bg-gray-100">
								<FiCreditCard aria-hidden className="size-6 text-gray-400" />
							</span>
							<div>
								<h2 className="font-sans font-bold text-gray-800">Payment Method</h2>
								<p className="text-xs text-gray-500">Payment details are protected during checkout.</p>
							</div>
						</div>

						<div className="mb-8 space-y-4">
							<div className="flex items-center justify-between rounded-xl border-2 border-brand-blue p-4">
								<div className="flex items-center gap-3">
									<FiCreditCard aria-hidden className="text-brand-blue" />
									<span className="font-semibold text-gray-800">Credit or Debit Card</span>
								</div>
								<span className="flex size-5 items-center justify-center rounded-full bg-brand-blue">
									<FiCheck aria-hidden className="size-3 text-white" />
								</span>
							</div>
							<div aria-hidden className="pointer-events-none grid gap-4 opacity-50">
								<div className="h-12 rounded-lg border border-gray-200 bg-gray-50" />
								<div className="grid grid-cols-2 gap-4">
									<div className="h-12 rounded-lg border border-gray-200 bg-gray-50" />
									<div className="h-12 rounded-lg border border-gray-200 bg-gray-50" />
								</div>
							</div>
						</div>

						<div className="mb-8 rounded-xl border border-yellow-100 bg-yellow-50 p-4">
							<p className="text-xs leading-relaxed text-yellow-800">
								<strong>Note:</strong> This is a demonstration checkout page. A live site would connect to Stripe,
								Flutterwave, or another payment provider before processing your donation.
							</p>
						</div>

						<Button to="/" size="lg" fullWidth>
							Complete Donation
						</Button>
					</Card>
				</div>
			</Container>
		</PageLayout>
	);
}
