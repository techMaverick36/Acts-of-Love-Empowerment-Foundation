import { useLocation, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiLock, FiCreditCard, FiCheck } from "react-icons/fi";

export default function CheckoutPage() {
	const location = useLocation();
	const { amount, firstName, lastName, email } = location.state || {
		amount: 0,
		firstName: "Guest",
		lastName: "",
		email: "",
	};

	return (
		<div className="min-h-screen bg-gray-50 pt-20">
			<Navbar />
			<main className="max-w-4xl mx-auto px-6 py-16">
				<div className="text-center mb-12">
					<h1 className="text-3xl font-serif font-bold text-[#204487] mb-2">
						Complete Your Donation
					</h1>
					<p className="text-gray-600 flex items-center justify-center gap-2">
						<FiLock className="text-green-500" /> Secure Checkout
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{/* Left: Summary */}
					<div className="md:col-span-1 space-y-6">
						<div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
							<h2 className="font-bold text-gray-800 mb-4 border-bottom pb-2">
								Summary
							</h2>
							<div className="flex justify-between mb-2">
								<span className="text-gray-500">Donation Amount</span>
								<span className="font-bold">${amount}</span>
							</div>
							<div className="flex justify-between mb-4">
								<span className="text-gray-500">Frequency</span>
								<span className="text-gray-800">One-time</span>
							</div>
							<div className="border-t pt-4 flex justify-between">
								<span className="font-bold">Total</span>
								<span className="font-bold text-[#D91E26] text-xl">${amount}</span>
							</div>
						</div>

						<div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
							<h3 className="font-bold text-[#204487] mb-2 text-sm">
								Donor Information
							</h3>
							<p className="text-sm text-gray-700">
								{firstName} {lastName}
							</p>
							<p className="text-sm text-gray-500">{email}</p>
						</div>
					</div>

					{/* Right: Payment Method (Placeholder) */}
					<div className="md:col-span-2">
						<div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
							<div className="flex items-center gap-4 mb-8">
								<div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
									<FiCreditCard className="text-gray-400 w-6 h-6" />
								</div>
								<div>
									<h3 className="font-bold text-gray-800">Payment Method</h3>
									<p className="text-xs text-gray-500">
										All transactions are encrypted and secure.
									</p>
								</div>
							</div>

							<div className="space-y-4 mb-8">
								<div className="p-4 border-2 border-[#204487] rounded-xl flex items-center justify-between">
									<div className="flex items-center gap-3">
										<FiCreditCard className="text-[#204487]" />
										<span className="font-semibold text-gray-800">
											Credit or Debit Card
										</span>
									</div>
									<div className="w-5 h-5 bg-[#204487] rounded-full flex items-center justify-center">
										<FiCheck className="text-white w-3 h-3" />
									</div>
								</div>

								{/* Placeholder for Card Inputs */}
								<div className="grid grid-cols-1 gap-4 opacity-50 pointer-events-none">
									<div className="h-12 bg-gray-50 rounded-lg border border-gray-200"></div>
									<div className="grid grid-cols-2 gap-4">
										<div className="h-12 bg-gray-50 rounded-lg border border-gray-200"></div>
										<div className="h-12 bg-gray-50 rounded-lg border border-gray-200"></div>
									</div>
								</div>
							</div>

							<div className="bg-yellow-50 border border-yellow-100 p-4 rounded-xl mb-8">
								<p className="text-xs text-yellow-800 leading-relaxed">
									<strong>Note:</strong> This is a demonstration checkout page. 
									In the production environment, a secure payment gateway (like Stripe 
									or Flutterwave) would be integrated here to process your payment.
								</p>
							</div>

							<Link
								to="/"
								className="block w-full text-center bg-[#D91E26] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-[#b81a20] transition-all"
							>
								Complete Donation
							</Link>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}
