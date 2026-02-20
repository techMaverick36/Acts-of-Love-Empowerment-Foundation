import { Link } from "react-router-dom";
import { FiArrowRight, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const programs = [
	{
		id: "child",
		title: "Sponsor a Child",
		badge: "Most Popular",
		badgeBg: "#D91E26",
		image:
			"https://images.unsplash.com/photo-1521493959102-bdd6677fdd81?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		cost: "Any amount helps",
		description:
			"Your monthly sponsorship directly covers school fees, healthcare, nutritious meals, and mentorship for a child in need. When you sponsor a child, you become a consistent presence in their life someone they know is rooting for them.",
		includes: [
			"Full school fees and learning materials",
			"Monthly healthcare checkups and medications",
			"Nutritious daily meals through our feeding program",
			"Mentorship and psycho-social support",
			"Quarterly progress reports to you",
		],
		amounts: ["Any amount"],
	},
	{
		id: "community",
		title: "Help a Community",
		badge: null,
		badgeBg: null,
		image:
			"https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
		cost: "Any amount helps",
		description:
			"Fund clean water access, community health centers, school construction, or agricultural support projects that lift entire villages toward self-sufficiency. Your gift doesn't just help one person  it transforms an entire ecosystem.",
		includes: [
			"Borehole drilling and clean water access",
			"Community health center construction & equipment",
			"School building and infrastructure renovation",
			"Agribusiness training and farming cooperative support",
			"Dedicated project report with photos and impact data",
		],
		amounts: ["Any amount"],
	},
	{
		id: "medical",
		title: "Medical Emergencies",
		badge: "Urgent Need",
		badgeBg: "#F26421",
		image:
			"https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
		cost: "Any amount helps",
		description:
			"Rush critical funds to individuals facing life-threatening health crises surgeries, emergency procedures, medications  who have no other means of support. Time-sensitive giving saves lives.",
		includes: [
			"Emergency surgery and procedure funding",
			"Critical medications and post-op care",
			"Transport and logistics for urgent medical travel",
			"Family support during hospitalization",
			"Discharge and recovery follow-up care",
		],
		amounts: ["Any amount"],
	},
];

function ProgramCard({ prog }: { prog: (typeof programs)[0] }) {
	return (
		<div className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-gray-100 shadow-md">
			{/* Image */}
			<div className="relative min-h-64 lg:min-h-0">
				<img
					src={prog.image}
					alt={prog.title}
					className="absolute inset-0 w-full h-full object-cover"
				/>
				<div
					className="absolute inset-0"
					style={{ backgroundColor: "rgba(32,68,135,0.45)" }}
				/>
				{prog.badge && (
					<span
						className="absolute top-5 left-5 text-xs font-bold px-3 py-1.5 rounded-full text-white"
						style={{ backgroundColor: prog.badgeBg }}
					>
						{prog.badge}
					</span>
				)}
				<div className="absolute bottom-6 left-6 right-6">
					<p className="font-serif text-2xl font-bold text-white mb-1">
						{prog.title}
					</p>
					<p
						className="text-sm font-semibold"
						style={{ color: "rgba(255,255,255,0.75)" }}
					>
						{prog.cost}
					</p>
				</div>
			</div>

			{/* Content */}
			<div className="bg-white p-8 flex flex-col">
				<p
					className="text-sm leading-relaxed mb-5"
					style={{ color: "#4a4a4a" }}
				>
					{prog.description}
				</p>
				<ul className="flex flex-col gap-2 mb-6">
					{prog.includes.map((i) => (
						<li
							key={i}
							className="flex items-start gap-2.5 text-sm"
							style={{ color: "#4a4a4a" }}
						>
							<FiCheckCircle
								size={15}
								className="flex-shrink-0 mt-0.5"
								style={{ color: "#00A54F" }}
							/>
							{i}
						</li>
					))}
				</ul>

				{/* Amount selector */}
				{/* <div className="mt-auto">
					<p
						className="text-xs font-bold tracking-widest uppercase mb-3"
						style={{ color: "#204487" }}
					>
						Choose Amount
					</p>
					<div className="flex gap-2 flex-wrap mb-3">
						{prog.amounts.map((a) => (
							<button
								key={a}
								onClick={() => {
									setSelected(a);
									setCustom("");
								}}
								className="px-4 py-2 text-sm font-semibold rounded-lg border-2 transition-all duration-200"
								style={{
									borderColor:
										selected === a && !custom ? "#204487" : "#e2e8f0",
									backgroundColor:
										selected === a && !custom ? "#eef3fb" : "white",
									color: selected === a && !custom ? "#204487" : "#4a4a4a",
								}}
							>
								{a}
							</button>
						))}
					</div>
					<input
						type="text"
						placeholder="Enter custom amount ($)"
						value={custom}
						onChange={(e) => {
							setCustom(e.target.value);
							setSelected("");
						}}
						className="w-full border-2 rounded-lg px-4 py-2.5 text-sm outline-none transition-colors mb-4"
						style={{ borderColor: custom ? "#204487" : "#e2e8f0" }}
					/>
					<button
						className="w-full py-3.5 text-sm font-semibold text-white rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
						style={{ backgroundColor: "#D91E26" }}
					>
						Donate {custom || selected} Now <FiArrowRight size={15} />
					</button>
				</div> */}
			</div>
		</div>
	);
}

export default function ProgramsPage() {
	return (
		<div>
			<Navbar />
			{/* ── PAGE HERO ── */}
			<section className="relative h-[45vh] min-h-[340px] flex items-center justify-center text-center overflow-hidden">
				<img
					src="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=1600&q=80"
					alt="Community impact"
					className="absolute inset-0 w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

				<div className="relative z-10 px-6 max-w-3xl">
					<p className="uppercase tracking-[0.3em] text-xs mb-4 font-semibold text-[#F26421]">
						Our Programs
					</p>
					<h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
						Choose how you{" "}
						<span className="text-[#639E90] italic">make an impact.</span>
					</h1>
					<p className="text-gray-200 text-base md:text-lg"></p>
				</div>
			</section>

			{/* Intro strip */}
			<div className="py-10 bg-white border-b border-gray-100">
				<div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-8 items-center justify-between">
					{[
						{ label: "100% of donations fund programs", color: "#00A54F" },
						{ label: "Registered Non-profit", color: "#00A54F" },
						{ label: "Transparent reporting to all donors", color: "#D91E26" },
					].map((item) => (
						<div key={item.label} className="flex items-center gap-2">
							<FiCheckCircle size={18} style={{ color: item.color }} />
							<span
								className="text-sm font-semibold"
								style={{ color: "#1D1E1F" }}
							>
								{item.label}
							</span>
						</div>
					))}
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
							className="font-serif text-4xl font-bold"
							style={{ color: "#204487" }}
						>
							Choose Your Program
						</h2>
					</div>
					{programs.map((p) => (
						<ProgramCard key={p.id} prog={p} />
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
						<h2
							className="font-serif text-4xl font-bold"
							style={{ color: "#204487" }}
						>
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
								className="rounded-2xl p-8 border border-blue-100"
								style={{ backgroundColor: "#eef3fb" }}
							>
								<h3
									className="font-serif text-xl font-bold mb-3"
									style={{ color: "#204487" }}
								>
									{c.title}
								</h3>
								<p
									className="text-sm leading-relaxed mb-5"
									style={{ color: "#4a4a4a" }}
								>
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
			<section className="py-14" style={{ backgroundColor: "#08415C" }}>
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
					<p
						className="text-base mb-8"
						style={{ color: "rgba(255,255,255,0.75)" }}
					>
						Our Medical Emergency Fund is critically low. A child could be
						waiting for surgery. A mother could be waiting for care. Every
						contribution today goes directly to urgent cases.
					</p>
					<button
						className="inline-flex items-center gap-2 px-10 py-4 text-base font-semibold text-white rounded hover:opacity-90 transition-opacity"
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
