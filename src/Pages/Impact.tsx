import { Link } from "react-router-dom";
import {
	FiActivity,
	FiUsers,
	FiBook,
	FiSun,
	FiCheckCircle,
	FiArrowRight,
	FiUsers as FiPeople,
	FiMapPin,
	FiAward,
	FiHeart,
} from "react-icons/fi";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const pillars = [
	{
		icon: FiActivity,
		area: "Health",
		accent: "#00A54F",
		bg: "#f0faf4",
		border: "#b3e6c8",
		image:
			"https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
		summary:
			"We deliver life-saving and preventive healthcare to communities that would otherwise go without, through a network of mobile clinics, trained community health workers, and partner hospitals.",
		highlights: [
			"Free mobile clinics serving 15+ communities annually",
			"Maternal & child health programs reducing infant mortality",
			"HIV/AIDS awareness and prevention campaigns",
			"Mental health support and community counselling",
			"Disease surveillance and epidemic response teams",
		],
		stat: { val: "100+", label: "Patients Served Annually" },
	},
	{
		icon: FiUsers,
		area: "Inclusion",
		accent: "#F26421",
		bg: "#fdf4ee",
		border: "#f8ceae",
		image:
			"https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
		summary:
			"We fight for the full participation of every person in society — from persons with disabilities to women facing systemic barriers to young people navigating a difficult world.",
		highlights: [
			"Assistive devices and rehabilitation support for PWDs",
			"Gender equity and women's economic empowerment programs",
			"Safe spaces and support for survivors of gender-based violence",
			"Youth leadership development and mentorship",
			"Legal aid and rights advocacy clinics",
		],
		stat: { val: "10+", label: "Individuals Supported" },
	},
	{
		icon: FiBook,
		area: "Education",
		accent: "#204487",
		bg: "#eef3fb",
		border: "#b5c8ed",
		image:
			"https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80",
		summary:
			"Education is the most powerful tool for breaking the cycle of poverty. We invest in learners at every stage — from early childhood to vocational training — to unlock lifelong potential.",
		highlights: [
			"Full scholarships covering tuition, materials, and feeding",
			"Adult literacy and numeracy programs for women",
			"STEM outreach in underserved secondary schools",
			"School infrastructure: classrooms, toilets, libraries",
			"Teacher training and capacity building",
		],
		stat: { val: "600+", label: "Students Supported" },
	},
	{
		icon: FiSun,
		area: "Sustainable Development",
		accent: "#00A54F",
		bg: "#f0faf4",
		border: "#b3e6c8",
		image:
			"https://images.unsplash.com/photo-1521493959102-bdd6677fdd81?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		summary:
			"True transformation means equipping communities to be self-sufficient long after our teams leave. Our sustainable development programs build lasting economic and environmental resilience.",
		highlights: [
			"Clean water access: borehole drilling and water treatment",
			"Agribusiness training and cooperative farming support",
			"Solar energy installation for off-grid communities",
			"Micro-enterprise grants and SME capacity building",
			"Environmental conservation and tree planting campaigns",
		],
		stat: { val: "20+", label: "Households Reached" },
	},
];

const stats = [
	{
		icon: FiPeople,
		val: "100+",
		label: "Lives Directly Impacted",
		sub: "Across all 4 pillars",
	},
	{
		icon: FiMapPin,
		val: "15+",
		label: "Communities Served",
		sub: "Nationwide reach",
	},
	{ icon: FiAward, val: "15+", label: "Years of Service", sub: "Founded 2025" },
	{
		icon: FiHeart,
		val: "20+",
		label: "Dedicated Volunteers",
		sub: "Giving their time",
	},
];

export default function ImpactPage() {
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
						Our Impacts
					</p>
					<h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
						Transforming Lives{" "}
						<span className="block text-[#639E90]">Actions & Results</span>
					</h1>
					<p className="text-gray-200 text-base md:text-lg">
						Every number tells a story of lives changed, communities uplifted,
						and a brighter future forged together.
					</p>
				</div>
			</section>

			{/* ── PILLARS ── */}
			{pillars.map((p, i) => {
				const Icon = p.icon;
				const isEven = i % 2 === 0;
				return (
					<section
						key={p.area}
						className="py-20"
						style={{ backgroundColor: isEven ? "#ffffff" : "#eef3fb" }}
					>
						<div className="max-w-7xl mx-auto px-6">
							<div
								className={`grid lg:grid-cols-2 gap-14 items-center ${!isEven ? "lg:flex-row-reverse" : ""}`}
							>
								{/* Image side */}
								<div className={isEven ? "" : "lg:order-2"}>
									<div
										className="relative rounded-2xl overflow-hidden"
										style={{ height: 400 }}
									>
										<img
											src={p.image}
											alt={p.area}
											className="w-full h-full object-cover"
										/>
										<div
											className="absolute inset-0"
											style={{ backgroundColor: `${p.accent}20` }}
										/>
										{/* Stat badge */}
										<div className="absolute bottom-6 left-6 bg-white rounded-xl px-5 py-4 shadow-lg">
											<p
												className="font-serif font-bold text-2xl"
												style={{ color: p.accent }}
											>
												{p.stat.val}
											</p>
											<p
												className="text-xs font-medium mt-0.5"
												style={{ color: "#1D1E1F" }}
											>
												{p.stat.label}
											</p>
										</div>
									</div>
								</div>

								{/* Content side */}
								<div className={isEven ? "" : "lg:order-1"}>
									<div className="flex items-center gap-3 mb-5">
										<div
											className="w-12 h-12 rounded-xl flex items-center justify-center"
											style={{ backgroundColor: p.accent }}
										>
											<Icon size={22} className="text-white" />
										</div>
										<div>
											<p
												className="text-xs font-bold tracking-widest uppercase"
												style={{ color: p.accent }}
											>
												Program Area
											</p>
											<h2
												className="font-serif text-3xl font-bold"
												style={{ color: "#204487" }}
											>
												{p.area}
											</h2>
										</div>
									</div>
									<p
										className="text-base leading-relaxed mb-6"
										style={{ color: "#4a4a4a" }}
									>
										{p.summary}
									</p>
									<ul className="flex flex-col gap-3 mb-8">
										{p.highlights.map((h) => (
											<li key={h} className="flex items-start gap-3">
												<FiCheckCircle
													size={16}
													className="flex-shrink-0 mt-0.5"
													style={{ color: p.accent }}
												/>
												<span
													className="text-sm leading-relaxed"
													style={{ color: "#4a4a4a" }}
												>
													{h}
												</span>
											</li>
										))}
									</ul>
									<Link
										to="/programs"
										className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded hover:opacity-90 transition-opacity"
										style={{ backgroundColor: p.accent }}
									>
										Support This Program <FiArrowRight size={15} />
									</Link>
								</div>
							</div>
						</div>
					</section>
				);
			})}

			{/* ── STATS ── */}
			<section className="py-20" style={{ backgroundColor: "#08415C" }}>
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center mb-14">
						<p
							className="text-sm font-semibold tracking-widest uppercase mb-3"
							style={{ color: "#fdf4ee" }}
						>
							Our Numbers
						</p>
						<h2 className="font-serif text-4xl font-bold text-white">
							The Impact We've Made
						</h2>
					</div>
					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
						{stats.map((s) => {
							const Icon = s.icon;
							return (
								<div key={s.label} className="group">
									<div
										className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110"
										style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
									>
										<Icon size={24} className="text-white" />
									</div>
									<p className="font-serif text-5xl font-bold text-white mb-2">
										{s.val}
									</p>
									<p className="text-base font-semibold text-white mb-1">
										{s.label}
									</p>
									<p
										className="text-sm"
										style={{ color: "rgba(255,255,255,0.6)" }}
									>
										{s.sub}
									</p>
								</div>
							);
						})}
					</div>
					<div
						className="mt-16 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
						style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
					>
						<div>
							<p className="font-serif text-2xl font-bold text-white mb-1">
								Your support amplifies every number.
							</p>
							<p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
								Every naira donated creates a real, measurable difference.
							</p>
						</div>
						<Link
							to="/programs"
							className="flex-shrink-0 inline-block px-8 py-3.5 text-sm font-semibold text-white rounded hover:opacity-90 transition-opacity whitespace-nowrap"
							style={{ backgroundColor: "#D91E26" }}
						>
							Make Your Impact
						</Link>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
}
