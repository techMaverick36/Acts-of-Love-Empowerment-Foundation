import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	FiArrowRight,
	FiCheckCircle,
	FiAlertCircle,
	FiHeart,
	FiShield,
	FiUsers,
	FiX,
	FiLock,
} from "react-icons/fi";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const programs = [
	{
		id: "child",
		title: "Sponsor a Child",
		badge: "Most Popular",
		badgeBg: "#D91E26",
		image: "/D-4231r_9.jpg",
		cost: "Any amount helps",
		description:
			"Your monthly sponsorship helps cover school fees, healthcare, meals, and mentorship for a child. Steady support helps a child keep learning and growing with care around them.",
		includes: [
			"Full school fees and learning materials",
			"Monthly healthcare checkups and medications",
			"Nutritious daily meals through our feeding program",
			"Mentorship and psycho-social support",
			"Quarterly progress reports to you",
		],
	},
	{
		id: "community",
		title: "Help a Community",
		badge: null,
		badgeBg: null,
		image: "/IMG_0934.jpg",
		cost: "Any amount helps",
		description:
			"Support clean water access, community health needs, school improvements, or farming projects. Your gift helps families solve practical problems together.",
		includes: [
			"Borehole drilling and clean water access",
			"Community health center construction & equipment",
			"School building and infrastructure renovation",
			"Agribusiness training and farming cooperative support",
			"Project report with photos and clear updates",
		],
	},
	{
		id: "medical",
		title: "Medical Emergencies",
		badge: "Urgent Need",
		badgeBg: "#F26421",
		image: "/D-4231r_26.jpg",
		cost: "Any amount helps",
		description:
			"Send urgent funds to people facing serious health crises, including surgery, emergency procedures, medication, transport, and recovery care.",
		includes: [
			"Emergency surgery and procedure funding",
			"Critical medications and post-op care",
			"Transport and logistics for urgent medical travel",
			"Family support during hospitalization",
			"Discharge and recovery follow-up care",
		],
	},
];

const donationAmounts = [
	{ label: "$10", value: 10 },
	{ label: "$25", value: 25 },
	{ label: "$50", value: 50 },
	{ label: "$100", value: 100 },
	{ label: "Other", value: "other" as const },
];

const donationReasons = [
	"Where needed most",
	"Education & Scholarships",
	"Healthcare & Medical Support",
	"Women & Youth Support",
	"Medical Emergency Fund",
	"Food Relief",
	"Shelter & Community Projects",
	"Other",
];

type Program = (typeof programs)[0];

function DonateModal({ prog, onClose }: { prog: Program; onClose: () => void }) {
	const navigate = useNavigate();

	const initialReason = donationReasons.includes(prog.title)
		? prog.title
		: "Where needed most";

	const [amount, setAmount] = useState<number | "other">(25);
	const [customAmount, setCustomAmount] = useState("");
	const [reason, setReason] = useState(initialReason);
	const [otherReason, setOtherReason] = useState("");
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		frequency: "one-time",
	});

	// Lock body scroll while open
	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => { document.body.style.overflow = ""; };
	}, []);

	// Close on Escape key
	useEffect(() => {
		const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [onClose]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const finalAmount = amount === "other" ? customAmount : amount;
		const finalReason = reason === "Other" ? otherReason.trim() : reason;
		navigate("/checkout", {
			state: { amount: finalAmount, reason: finalReason, ...formData },
		});
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
			style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
			onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
		>
			<div className="relative w-full max-w-4xl rounded-2xl shadow-2xl bg-white flex flex-col" style={{ maxHeight: "90vh" }}>

				{/* ── Compact header ── */}
				<div className="shrink-0 flex items-center justify-between px-7 py-5 border-b border-gray-100 rounded-t-2xl bg-white">
					<div className="flex items-center gap-3">
						<div className="p-2 rounded-full" style={{ backgroundColor: "#eef3fb" }}>
							<FiHeart size={18} style={{ color: "#D91E26" }} />
						</div>
						<div>
							<p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#F26421" }}>
								Donate to this program
							</p>
							<h2 className="font-serif text-xl font-bold leading-tight" style={{ color: "#204487" }}>
								{prog.title}
							</h2>
						</div>
						{prog.badge && (
							<span
								className="hidden sm:inline text-xs font-bold px-3 py-1 rounded-full text-white ml-1"
								style={{ backgroundColor: prog.badgeBg as string }}
							>
								{prog.badge}
							</span>
						)}
					</div>
					<button
						onClick={onClose}
						className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all"
						aria-label="Close"
					>
						<FiX size={20} />
					</button>
				</div>

				{/* ── Body (scrolls as a unit on small screens, columns on large) ── */}
				<div className="flex flex-col lg:grid lg:grid-cols-[15rem_1fr] flex-1 min-h-0 overflow-hidden rounded-b-2xl">

					{/* Left info strip */}
					<div className="lg:overflow-y-auto p-6 flex flex-col gap-5 shrink-0 lg:shrink" style={{ backgroundColor: "#eef3fb" }}>
						<p className="text-sm leading-relaxed" style={{ color: "#4a4a4a" }}>{prog.description}</p>
						<div className="flex flex-col gap-3 pt-3 border-t border-blue-100">
							{prog.includes.map((item) => (
								<div key={item} className="flex items-start gap-2">
									<FiCheckCircle size={12} className="shrink-0 mt-0.5" style={{ color: "#639E90" }} />
									<p className="text-xs leading-snug" style={{ color: "#4a4a4a" }}>{item}</p>
								</div>
							))}
						</div>
						<div className="flex items-center gap-1.5 pt-3 border-t border-blue-100">
							<FiLock size={11} style={{ color: "#639E90" }} />
							<span className="text-[11px]" style={{ color: "#204487" }}>Secure & encrypted</span>
						</div>
					</div>

					{/* Right form */}
					<form onSubmit={handleSubmit} className="overflow-y-auto p-6 sm:p-8 flex flex-col gap-5">

						{/* Frequency toggle */}
						<div className="flex gap-1 p-1 bg-gray-100 rounded-full">
							{["one-time", "monthly"].map((freq) => (
								<button
									key={freq}
									type="button"
									onClick={() => setFormData({ ...formData, frequency: freq })}
									className={`flex-1 py-2 text-sm font-semibold rounded-full transition-all ${
										formData.frequency === freq
											? "bg-white text-[#204487] shadow-sm"
											: "text-gray-500 hover:text-[#204487]"
									}`}
								>
									{freq.charAt(0).toUpperCase() + freq.slice(1)}
								</button>
							))}
						</div>

						{/* Amount */}
						<div>
							<label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
								Select Amount
							</label>
							<div className="grid grid-cols-5 gap-2 mb-3">
								{donationAmounts.map((amt) => (
									<button
										key={amt.label}
										type="button"
										onClick={() => setAmount(amt.value)}
										className={`py-2.5 text-sm font-bold rounded-full border-2 transition-all ${
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
									<span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
									<input
										type="number"
										required
										placeholder="Enter amount"
										value={customAmount}
										onChange={(e) => setCustomAmount(e.target.value)}
										className="w-full pl-8 pr-4 py-2.5 border-2 border-gray-200 rounded-full focus:border-[#204487] focus:outline-none font-bold text-sm"
									/>
								</div>
							)}
						</div>

						{/* Donation purpose */}
						<div>
							<label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
								Donation Purpose
							</label>
							<div className="grid grid-cols-2 gap-2">
								{donationReasons.map((r) => (
									<button
										key={r}
										type="button"
										onClick={() => setReason(r)}
										className={`text-left px-3 py-2 text-xs font-semibold rounded-full border-2 transition-all ${
											reason === r
												? "border-[#204487] bg-[#204487]/5 text-[#204487]"
												: "border-gray-200 text-gray-500 hover:border-gray-300"
										}`}
										aria-pressed={reason === r}
									>
										{r}
									</button>
								))}
							</div>
							{reason === "Other" && (
								<input
									type="text"
									required
									placeholder="Please specify"
									value={otherReason}
									onChange={(e) => setOtherReason(e.target.value)}
									className="mt-2 w-full px-4 py-2.5 border-2 border-gray-200 rounded-full focus:border-[#204487] focus:outline-none text-sm"
								/>
							)}
						</div>

						{/* Personal info */}
						<div className="grid grid-cols-2 gap-3">
							<div>
								<label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">
									First Name
								</label>
								<input
									type="text"
									required
									value={formData.firstName}
									onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
									className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-full focus:border-[#204487] focus:outline-none text-sm"
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
									onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
									className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-full focus:border-[#204487] focus:outline-none text-sm"
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
								onChange={(e) => setFormData({ ...formData, email: e.target.value })}
								className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-full focus:border-[#204487] focus:outline-none text-sm"
							/>
						</div>

						{/* Submit */}
						<button
							type="submit"
							className="w-full bg-[#D91E26] text-white py-3.5 rounded-full font-bold text-sm shadow-lg hover:bg-[#b81a20] transition-all flex items-center justify-center gap-2 group"
						>
							<FiHeart size={15} />
							Donate to {prog.title}
							<FiArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
						</button>

						<p className="text-[10px] text-center text-gray-400 leading-relaxed">
							By continuing you agree to our Terms of Service and Privacy Policy.
							Secure payment processing powered by Stripe.
						</p>
					</form>
				</div>
			</div>
		</div>
	);
}

function ProgramCard({
	prog,
	onDonate,
}: {
	prog: Program;
	onDonate: (p: Program) => void;
}) {
	return (
		<div className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300">
			{/* Image */}
			<div className="relative min-h-64 lg:min-h-0">
				<img
					src={prog.image}
					alt={prog.title}
					className="absolute inset-0 w-full h-full object-cover"
				/>
				<div
					className="absolute inset-0"
					style={{ backgroundColor: "rgba(0,0,0,0.32)" }}
				/>
				{prog.badge && (
					<span
						className="absolute top-5 left-5 text-xs font-bold px-3 py-1.5 rounded-full text-white"
						style={{ backgroundColor: prog.badgeBg as string }}
					>
						{prog.badge}
					</span>
				)}
				<div className="absolute bottom-6 left-6 right-6">
					<p className="font-serif text-2xl font-bold text-white mb-1">
						{prog.title}
					</p>
					<p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.75)" }}>
						{prog.cost}
					</p>
				</div>
			</div>

			{/* Content */}
			<div className="bg-white p-8 flex flex-col">
				<p className="text-sm leading-relaxed mb-5" style={{ color: "#4a4a4a" }}>
					{prog.description}
				</p>
				<ul className="flex flex-col gap-2.5 mb-8">
					{prog.includes.map((i) => (
						<li
							key={i}
							className="flex items-start gap-2.5 text-sm"
							style={{ color: "#4a4a4a" }}
						>
							<FiCheckCircle
								size={15}
								className="shrink-0 mt-0.5"
								style={{ color: "#00A54F" }}
							/>
							{i}
						</li>
					))}
				</ul>
				<div className="mt-auto pt-5 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
					<button
						type="button"
						onClick={() => onDonate(prog)}
						className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-full hover:opacity-90 transition-opacity"
						style={{ backgroundColor: "#D91E26" }}
					>
						<FiHeart size={15} />
						Donate to This Program
					</button>
					<Link
						to="/contact"
						className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-full border-2 hover:bg-[#eef3fb] transition-colors"
						style={{ borderColor: "#204487", color: "#204487" }}
					>
						Learn More <FiArrowRight size={14} />
					</Link>
				</div>
			</div>
		</div>
	);
}

export default function ProgramsPage() {
	const [donateTarget, setDonateTarget] = useState<Program | null>(null);

	return (
		<div>
			<Navbar />

			{donateTarget && (
				<DonateModal prog={donateTarget} onClose={() => setDonateTarget(null)} />
			)}

			{/* ── PAGE HERO ── */}
			<section className="relative h-[60vh] min-h-105 flex items-center justify-center text-center overflow-hidden">
				<img
					src="/D-4231r_41.jpg"
					alt="School children in uniform"
					className="absolute inset-0 w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/70" />

				<div className="relative z-10 px-6 max-w-3xl">
					<p className="uppercase tracking-[0.3em] text-xs mb-4 font-semibold text-[#F26421]">
						Our Programs
					</p>
					<h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
						Choose how you{" "}
						<span className="text-[#639E90] italic">give support.</span>
					</h1>
					<p className="text-gray-200 text-base md:text-lg">
						Every contribution, large or small, goes directly to program needs.
					</p>
				</div>
			</section>

			{/* Trust strip */}
			<div className="py-6 bg-white border-b border-gray-100">
				<div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-8 items-center justify-center md:justify-between">
					{[
						{ icon: FiCheckCircle, label: "100% of donations fund programs", color: "#00A54F" },
						{ icon: FiShield, label: "Non-profit Organisation", color: "#204487" },
						{ icon: FiUsers, label: "Transparent reporting to all donors", color: "#F26421" },
					].map((item) => {
						const Icon = item.icon;
						return (
							<div key={item.label} className="flex items-center gap-2.5">
								<Icon size={18} style={{ color: item.color }} />
								<span className="text-sm font-semibold" style={{ color: "#1D1E1F" }}>
									{item.label}
								</span>
							</div>
						);
					})}
				</div>
			</div>

			{/* Program Cards */}
			<section className="py-20" style={{ backgroundColor: "#eef3fb" }}>
				<div className="max-w-7xl mx-auto px-6 flex flex-col gap-10">
					<div className="text-center max-w-2xl mx-auto mb-4">
						<p
							className="text-sm font-semibold tracking-widest uppercase mb-3"
							style={{ color: "#D91E26" }}
						>
							Giving Options
						</p>
						<h2
							className="font-serif text-4xl font-bold mb-4"
							style={{ color: "#204487" }}
						>
							Choose Your Program
						</h2>
						<p className="text-base leading-relaxed" style={{ color: "#4a4a4a" }}>
							Pick the kind of support you want to give. Each program is tied to
							real needs in education, health, food, or community care.
						</p>
					</div>
					{programs.map((p) => (
						<ProgramCard key={p.id} prog={p} onDonate={setDonateTarget} />
					))}
				</div>
			</section>

			{/* Other Ways */}
			<section className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center max-w-xl mx-auto mb-14">
						<p
							className="text-sm font-semibold tracking-widest uppercase mb-3"
							style={{ color: "#D91E26" }}
						>
							Other Ways to Give
						</p>
						<h2 className="font-serif text-4xl font-bold" style={{ color: "#204487" }}>
							More Giving Options
						</h2>
					</div>
					<div className="grid sm:grid-cols-3 gap-7">
						{[
							{
								title: "Bank Transfer",
								desc: "Send directly to our account. Contact us for bank details and a donation reference number.",
								action: "Get Bank Details",
							},
							{
								title: "Corporate Giving",
								desc: "Partner with us through CSR, matching gifts, or employee giving programs. We'll tailor a proposal for your company.",
								action: "Partner With Us",
							},
							{
								title: "In-Kind Donations",
								desc: "We accept medical supplies, educational materials, food items, and equipment for our field programs.",
								action: "Learn More",
							},
						].map((c) => (
							<div
								key={c.title}
								className="rounded-2xl p-8 border border-blue-100 hover:shadow-md transition-shadow duration-300"
								style={{ backgroundColor: "#eef3fb" }}
							>
								<h3
									className="font-serif text-xl font-bold mb-3"
									style={{ color: "#204487" }}
								>
									{c.title}
								</h3>
								<p className="text-sm leading-relaxed mb-5" style={{ color: "#4a4a4a" }}>
									{c.desc}
								</p>
								<Link
									to="/contact"
									className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-80"
									style={{ color: "#D91E26" }}
								>
									{c.action} <FiArrowRight size={14} />
								</Link>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Urgent banner */}
			<section className="py-16" style={{ backgroundColor: "#08415C" }}>
				<div className="max-w-4xl mx-auto px-6 text-center">
					<div className="flex items-center justify-center gap-2 mb-4">
						<FiAlertCircle size={20} style={{ color: "#F26421" }} />
						<span
							className="text-sm font-bold tracking-widest uppercase"
							style={{ color: "#F26421" }}
						>
							Urgent Appeal
						</span>
					</div>
					<h2 className="font-serif text-3xl font-bold text-white mb-4">
						There are families waiting right now.
					</h2>
					<p className="text-base mb-8" style={{ color: "rgba(255,255,255,0.75)" }}>
						Our Medical Emergency Fund is running low. A child may need surgery.
						A mother may need care. Gifts today go directly to urgent cases.
					</p>
					<button
						type="button"
						onClick={() =>
							setDonateTarget(programs.find((p) => p.id === "medical")!)
						}
						className="inline-flex items-center gap-2 px-10 py-4 text-base font-semibold text-white rounded-full hover:opacity-90 transition-opacity"
						style={{ backgroundColor: "#D91E26" }}
					>
						Give to Emergency Fund <FiArrowRight size={18} />
					</button>
				</div>
			</section>

			<Footer />
		</div>
	);
}
