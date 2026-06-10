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
			"We support preventive and urgent healthcare for communities with limited access to clinics, health workers, and partner hospitals.",
		highlights: [
			"We plan to launch free mobile clinics for 15+ communities each year",
			"Maternal and child health support",
			"HIV/AIDS awareness and prevention campaigns",
			"Mental health support and community counselling",
			"Disease monitoring and emergency health response",
		],
		stat: { val: "0+", label: "Patients Served Annually" },
	},
	{
		icon: FiUsers,
		area: "Inclusion",
		accent: "#F26421",
		bg: "#fdf4ee",
		border: "#f8ceae",
		image: "/D-4231r_20.jpg",
		summary:
			"We support the full participation of persons with disabilities, women, and young people who face barriers in daily life.",
		highlights: [
			"We plan to provide assistive devices and rehabilitation support for PWDs",
			"Women's economic support and skills programs",
			"Safe spaces and support for survivors of gender-based violence",
			"Youth leadership development and mentorship",
			"Legal aid and rights advocacy clinics",
		],
		stat: { val: "0+", label: "Individuals Supported" },
	},
	{
		icon: FiBook,
		area: "Education",
		accent: "#204487",
		bg: "#eef3fb",
		border: "#b5c8ed",
		image: "/D-4231r_18.jpg",
		summary:
			"We support learners from early childhood through vocational training with fees, materials, meals, and mentoring.",
		highlights: [
			"We plan to provide full scholarships covering tuition, materials, and feeding",
			"Adult literacy and numeracy programs for women",
			"STEM outreach in underserved secondary schools",
			"School infrastructure: classrooms, toilets, libraries",
			"Teacher training and school support",
		],
		stat: { val: "130+", label: "Students Supported" },
	},
	{
		icon: FiSun,
		area: "Sustainable Development",
		accent: "#00A54F",
		bg: "#f0faf4",
		border: "#b3e6c8",
		image: "/IMG_0934.jpg",
		summary:
			"We help communities plan beyond a single donation through clean water, farming support, solar access, and small business support.",
		highlights: [
			"We plan to provide clean water access: borehole drilling and water treatment",
			"Agribusiness training and cooperative farming support",
			"Solar energy installation for off-grid communities",
			"Small business grants and practical training",
			"Environmental conservation and tree planting campaigns",
		],
		stat: { val: "80+", label: "Households Reached" },
	},
];

const stats = [
	{
		icon: FiPeople,
		val: "130+",
		label: "Lives Directly Reached",
		sub: "Across all 4 pillars",
	},
	{
		icon: FiMapPin,
		val: "2",
		label: "Communities Served",
		sub: "Wakiso District, Uganda",
	},
	{ icon: FiAward, val: "2026", label: "Year Founded", sub: "Kampala, Uganda" },
	{
		icon: FiHeart,
		val: "5+",
		label: "Dedicated Volunteers",
		sub: "Giving their time",
	},
];

export default function ImpactPage() {
	return (
		<div>
			<Navbar />

			{/* ── PAGE HERO ── */}
			<section className="relative min-h-[60vh] md:h-[45vh] flex items-center justify-center text-center overflow-hidden py-20 sm:py-24">
				<img
					src="/D-4231r_31.jpg"
					alt="Acts of Love Foundation distributing supplies to children"
					className="absolute inset-0 w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

				<div className="relative z-10 px-6 max-w-3xl">
					<p className="uppercase tracking-[0.3em] text-xs mb-4 font-semibold text-[#F26421]">
						Our Work
					</p>
					<h1 className="font-serif break-words text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-snug sm:leading-tight mb-3 sm:mb-4">
						Practical Support{" "}
						<span className="block text-[#639E90]">For Daily Needs</span>
					</h1>
					<p className="text-gray-200 text-sm sm:text-base md:text-lg">
						These are the areas where we serve children, families, and
						communities across Uganda.
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
										className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-full hover:opacity-90 transition-opacity"
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
							What We've Done So Far
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
								Your support helps the work continue.
							</p>
							<p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
								Every donation helps cover real program costs.
							</p>
						</div>
						<Link
							to="/programs"
							className="flex-shrink-0 inline-block px-8 py-3.5 text-sm font-semibold text-white rounded-full hover:opacity-90 transition-opacity whitespace-nowrap"
							style={{ backgroundColor: "#D91E26" }}
						>
							Give Support
						</Link>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
}
