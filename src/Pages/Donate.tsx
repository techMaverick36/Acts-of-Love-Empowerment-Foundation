import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiHeart, FiArrowRight } from "react-icons/fi";

const donationAmounts = [
	{ label: "$10", value: 10 },
	{ label: "$25", value: 25 },
	{ label: "$50", value: 50 },
	{ label: "$100", value: 100 },
	{ label: "Other", value: "other" },
];

export default function DonatePage() {
	const navigate = useNavigate();
	const [amount, setAmount] = useState<number | string>(25);
	const [customAmount, setCustomAmount] = useState("");
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		frequency: "one-time",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const finalAmount = amount === "other" ? customAmount : amount;
		// In a real app, we would pass this data to checkout via state or context
		navigate("/checkout", { state: { amount: finalAmount, ...formData } });
	};

	return (
		<div className="min-h-screen bg-gray-50 pt-20">
			<Navbar />
			<main className="max-w-4xl mx-auto px-6 py-16">
				<div className="bg-white rounded-3xl shadow-xl overflow-hidden">
					<div className="grid md:grid-cols-2">
						{/* Left side: Info */}
						<div className="bg-[#204487] text-white p-8 md:p-12">
							<div className="mb-8">
								<FiHeart className="text-[#F26421] w-12 h-12 mb-4" />
								<h1 className="text-3xl font-serif font-bold mb-4">
									Make an Impact
								</h1>
								<p className="text-blue-100 leading-relaxed">
									Your donation directly supports our education, healthcare,
									and empowerment programs. Thank you for being a part of
									the change.
								</p>
							</div>
							<div className="space-y-6">
								<div className="flex gap-4">
									<div className="w-1.5 h-auto bg-[#639E90] rounded-full" />
									<p className="text-sm">
										<span className="block font-bold mb-1">Transparent</span>
										100% of your donation goes directly to our field programs.
									</p>
								</div>
								<div className="flex gap-4">
									<div className="w-1.5 h-auto bg-[#D91E26] rounded-full" />
									<p className="text-sm">
										<span className="block font-bold mb-1">Sustainable</span>
										Monthly donations help us plan for long-term community growth.
									</p>
								</div>
							</div>
						</div>

						{/* Right side: Form */}
						<div className="p-8 md:p-12">
							<form onSubmit={handleSubmit} className="space-y-6">
								{/* Frequency */}
								<div className="flex gap-4 p-1 bg-gray-100 rounded-lg mb-8">
									{["one-time", "monthly"].map((freq) => (
										<button
											key={freq}
											type="button"
											onClick={() => setFormData({ ...formData, frequency: freq })}
											className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
												formData.frequency === freq
													? "bg-white text-[#204487] shadow-sm"
													: "text-gray-500 hover:text-[#204487]"
											}`}
										>
											{freq.charAt(0).toUpperCase() + freq.slice(1)}
										</button>
									))}
								</div>

								{/* Amount Selection */}
								<div>
									<label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
										Select Amount
									</label>
									<div className="grid grid-cols-3 gap-3 mb-4">
										{donationAmounts.map((amt) => (
											<button
												key={amt.label}
												type="button"
												onClick={() => setAmount(amt.value)}
												className={`py-3 text-sm font-bold rounded-xl border-2 transition-all ${
													amount === amt.value
														? "border-[#D91E26] bg-[#D91E26]/5 text-[#D91E26]"
														: "border-gray-200 text-gray-600 hover:border-gray-300"
												}`}
											>
												{amt.label}
											</button>
										))}
									</div>
									{amount === "other" && (
										<div className="relative">
											<span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
												$
											</span>
											<input
												type="number"
												required
												placeholder="Enter amount"
												value={customAmount}
												onChange={(e) => setCustomAmount(e.target.value)}
												className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#204487] focus:outline-none transition-all font-bold"
											/>
										</div>
									)}
								</div>

								{/* Personal Info */}
								<div className="grid sm:grid-cols-2 gap-4">
									<div>
										<label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">
											First Name
										</label>
										<input
											type="text"
											required
											value={formData.firstName}
											onChange={(e) =>
												setFormData({ ...formData, firstName: e.target.value })
											}
											className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#204487] focus:outline-none"
										/>
									</div>
									<div>
										<label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">
											Last Name
										</label>
										<input
											type="text"
											required
											value={formData.lastName}
											onChange={(e) =>
												setFormData({ ...formData, lastName: e.target.value })
											}
											className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#204487] focus:outline-none"
										/>
									</div>
								</div>

								<div>
									<label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">
										Email Address
									</label>
									<input
										type="email"
										required
										value={formData.email}
										onChange={(e) =>
											setFormData({ ...formData, email: e.target.value })
										}
										className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#204487] focus:outline-none"
									/>
								</div>

								<button
									type="submit"
									className="w-full bg-[#D91E26] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-[#b81a20] transition-all flex items-center justify-center gap-2 group"
								>
									Continue to Checkout
									<FiArrowRight className="group-hover:translate-x-1 transition-transform" />
								</button>

								<p className="text-[10px] text-center text-gray-400 leading-relaxed">
									By continuing, you agree to our Terms of Service and Privacy Policy. 
									Secure payment processing powered by Stripe.
								</p>
							</form>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}
