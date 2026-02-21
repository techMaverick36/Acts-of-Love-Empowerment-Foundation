import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

const donationReasons = [
    "Where needed most",
    "Education & Scholarships",
    "Healthcare & Medical Support",
    "Women & Youth Empowerment",
    "Medical Emergency Fund",
    "Food Relief",
    "Shelter & Community Projects",
    "Other",
];

export default function DonatePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const preset = (location.state as any) || {};

    const [amount, setAmount] = useState<number | string>(() =>
        preset.suggestedAmount ?? 25
    );
    const [customAmount, setCustomAmount] = useState("");
    const initialReason = (preset.designation as string) || "Where needed most";
    const [reason, setReason] = useState<string>(
        donationReasons.includes(initialReason) ? initialReason : initialReason ? "Other" : "Where needed most"
    );
    const [otherReason, setOtherReason] = useState(
        donationReasons.includes(initialReason) ? "" : initialReason || ""
    );
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        frequency: preset.frequency ?? "one-time",
    });

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
        const finalAmount = amount === "other" ? customAmount : amount;
        const finalReason = reason === "Other" ? otherReason.trim() : reason;
        // In a real app, we would pass this data to checkout via state or context
        navigate("/checkout", { state: { amount: finalAmount, reason: finalReason, ...formData } });
    };

	return (
		<div className="min-h-screen bg-gray-50 pt-20">
			<Navbar />
	  <main className="max-w-6xl mx-auto px-6 py-16">
				<div className="bg-white rounded-3xl shadow-xl overflow-hidden">
					<div className="grid md:grid-cols-[2fr_3fr]">
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
                            {preset.designation && (
                                <div className="mb-6 p-3 rounded-xl border-2 border-[#F26421]/30 bg-[#F26421]/5">
                                    <p className="text-xs font-bold tracking-wider text-[#F26421] uppercase mb-1">
                                        Designated Gift
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        Suggested designation: <span className="font-semibold">{preset.designation}</span>
                                    </p>
                                </div>
                            )}
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

        {/* Donation Reason */}
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                Donation Reason
            </label>
            <div className="grid sm:grid-cols-2 gap-3 mb-3" role="group" aria-label="Donation reason">
                {donationReasons.map((r) => (
                    <button
                        key={r}
                        type="button"
                        onClick={() => setReason(r)}
                        className={`text-left px-4 py-3 text-sm font-semibold rounded-xl border-2 transition-all ${
                            reason === r
                                ? "border-[#204487] bg-[#204487]/5 text-[#204487]"
                                : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                        aria-pressed={reason === r}
                    >
                        {r}
                    </button>
                ))}
            </div>
            {reason === "Other" && (
                <div className="mt-2">
                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider" htmlFor="other-reason">
                        Please specify
                    </label>
                    <input
                        id="other-reason"
                        type="text"
                        required
                        placeholder="Type your donation reason"
                        value={otherReason}
                        onChange={(e) => setOtherReason(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#204487] focus:outline-none transition-all"
                    />
                </div>
            )}
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
