import { FiArrowRight, FiShield, FiUsers, FiTarget, FiGlobe } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const milestones = [
	{
		year: "January 2026",
		event:
			"Foundation established in Kampala, Uganda, with a focus on community health and education. First community outreach reaches 50+ people in Wakiso District.",
	},
	{
		year: "June 2026",
		event:
			"Second community outreach completed, serving 80 additional people across a second community. Total lives reached rises to 130+ across 2 communities.",
	},
];

function getMonthsActive() {
	const founded = new Date(2026, 0, 1);
	const now = new Date();
	const months =
		(now.getFullYear() - founded.getFullYear()) * 12 +
		(now.getMonth() - founded.getMonth());
	return months <= 1 ? "1 month" : `${months} months`;
}

export default function AboutPage() {
	const { hash } = useLocation();

	useEffect(() => {
		if (hash) {
			const el = document.querySelector(hash);
			if (el) {
				setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
			}
		}
	}, [hash]);

	return (
		<div>
			<Navbar />

			{/* ── PAGE HERO ── */}
			<section className="relative min-h-[60vh] md:h-[50vh] flex items-center justify-center text-center overflow-hidden py-20 sm:py-24">
				<img
					src="/D-4231r_52.jpg"
					alt="Acts of Love Foundation team"
					className="absolute inset-0 w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/70" />

				<div className="relative z-10 px-6 max-w-3xl">
					<p className="uppercase tracking-[0.3em] text-xs mb-4 font-semibold text-[#F26421]">
						About Acts of Love
					</p>
					<h1 className="font-serif wrap-break-word text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-snug sm:leading-tight mb-4">
						Serving Families With
						<span className="block text-[#639E90]">Care and Consistency</span>
					</h1>
					<p className="text-gray-200 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
						We work with communities in Uganda on education, health, inclusion,
						and practical family support.
					</p>
				</div>
			</section>

			{/* ── INTRO ── */}
			<section className="py-16 md:py-24 bg-white">
				<div className="max-w-7xl mx-auto px-6">
					<div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
						<div>
							<p
								className="text-sm font-semibold tracking-widest uppercase mb-4"
								style={{ color: "#D91E26" }}
							>
								Our Story
							</p>
							<h2
								className="font-serif text-4xl font-bold mb-4"
								style={{ color: "#204487" }}
							>
								Started With a Desire to Serve
							</h2>
							<div className="w-14 h-1 rounded mb-6" style={{ backgroundColor: "#F26421" }} />
							<p className="text-base leading-relaxed mb-4" style={{ color: "#4a4a4a" }}>
								Acts of Love Empowerment Foundation is an organization committed to improving
								people's lives through Education, Inclusive support, and Sustainable development.


							</p>
							<p className="text-base leading-relaxed mb-8" style={{ color: "#4a4a4a" }}>
								Our work starts with listening. Communities help shape the programs they receive,
								and we report clearly to donors while treating every person we serve with respect.


							</p>
							<Link
								to="/impact"
								className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold text-white rounded-full hover:opacity-90 transition-opacity"
								style={{ backgroundColor: "#204487" }}
							>
								See Our Work <FiArrowRight size={15} />
							</Link>
						</div>
						<div className="relative mt-8 lg:mt-0">
							<img
								src="/D-4231r_37.jpg"
								alt="Acts of Love Foundation distributing to children"
								className="rounded-2xl w-full object-cover shadow-2xl"
								style={{ height: 460 }}
							/>
							<div
								className="absolute -bottom-6 left-0 md:-left-6 bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hidden sm:block"
								style={{ maxWidth: 220 }}
							>
								<p
									className="font-serif text-4xl font-bold mb-1"
									style={{ color: "#204487" }}
								>
									{getMonthsActive()}
								</p>
								<p className="text-sm font-medium" style={{ color: "#1D1E1F" }}>
									of purposeful service
								</p>
								<p className="text-xs mt-1" style={{ color: "#888" }}>
									Est. 2026 · Kampala, Uganda
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ── OUR PRINCIPLES ── */}
			<section
				id="principles"
				className="py-20 scroll-mt-28"
				style={{ backgroundColor: "#eef3fb" }}
			>
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center max-w-2xl mx-auto mb-14">
						<p
							className="text-sm font-semibold tracking-widest uppercase mb-3"
							style={{ color: "#D91E26" }}
						>
							What Guides Us
						</p>
						<h2
							className="font-serif text-4xl font-bold mb-4"
							style={{ color: "#204487" }}
						>
							Our Principles
						</h2>
						<div className="w-14 h-1 rounded mx-auto mb-5" style={{ backgroundColor: "#F26421" }} />
						<p className="text-base leading-relaxed" style={{ color: "#4a4a4a" }}>
							These principles guide our decisions, our programs, and the way
							we treat people.
						</p>
					</div>
					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{[
							{
								icon: FiUsers,
								title: "Participation and Ownership",
								desc: "Success depends on community involvement from the planning stages through to completion, to ensure that projects are appropriately managed after the organization hands over.",
								color: "#204487",
							},
							{
								icon: FiShield,
								title: "Equity and Social Justice",
								desc: "Growth must be fair, providing equal access to resources and opportunities regardless of gender, religion, age, or socioeconomic status.",
								color: "#D91E26",
							},
							{
								icon: FiTarget,
								title: "Empowerment and Capacity Building",
								desc: "Providing the tools, skills, and knowledge necessary for communities to lead their own development rather than creating dependency.",
								color: "#00A54F",
							},
							{
								icon: FiGlobe,
								title: "Transparency and Accountability",
								desc: "Maintaining open records of fund allocation and providing regular updates on progress, to build trust with both donors and beneficiaries for long-term survival.",
								color: "#639E90",
							},
						].map((p) => {
							const Icon = p.icon;
							return (
								<div
									key={p.title}
									className="bg-white rounded-2xl p-8 border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 group"
								>
									<div
										className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
										style={{ backgroundColor: p.color }}
									>
										<Icon size={22} className="text-white" />
									</div>
									<h3
										className="font-serif text-xl font-bold mb-3"
										style={{ color: "#204487" }}
									>
										{p.title}
									</h3>
									<p className="text-sm leading-relaxed" style={{ color: "#4a4a4a" }}>
										{p.desc}
									</p>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* ── TIMELINE ── */}
			<section className="py-20 bg-white">
				<div className="max-w-4xl mx-auto px-6">
					<div className="text-center mb-14">
						<p
							className="text-sm font-semibold tracking-widest uppercase mb-3"
							style={{ color: "#D91E26" }}
						>
							Our Timeline
						</p>
						<h2
							className="font-serif text-4xl font-bold mb-4"
							style={{ color: "#204487" }}
						>
							{getMonthsActive()} of Service
						</h2>
						<div className="w-14 h-1 rounded mx-auto" style={{ backgroundColor: "#F26421" }} />
					</div>
					<div className="relative">
						<div
							className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px"
							style={{ backgroundColor: "#dce8f8" }}
						/>
						<div className="flex flex-col gap-10">
							{milestones.map((m, i) => (
								<div
									key={m.year}
									className={`relative flex items-start gap-6 ${
										i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
									}`}
								>
									<div
										className={`flex-1 ${
											i % 2 === 0 ? "md:text-right" : "md:text-left"
										} pl-14 md:pl-0`}
									>
										<div
											className="bg-white rounded-xl p-5 border border-blue-100 shadow-sm inline-block text-left"
											style={{ maxWidth: 340 }}
										>
											<p
												className="font-serif font-bold text-xl mb-1"
												style={{ color: "#204487" }}
											>
												{m.year}
											</p>
											<p className="text-sm leading-relaxed" style={{ color: "#4a4a4a" }}>
												{m.event}
											</p>
										</div>
									</div>
									<div
										className="absolute left-3.5 md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full border-4 border-white shadow-sm shrink-0 mt-4"
										style={{ backgroundColor: "#204487" }}
									/>
									<div className="flex-1 hidden md:block" />
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* ── CTA ── */}
			<section
				className="relative py-20 overflow-hidden  bg-gray-900"
			>
				<img
					src="/IMG_0934.jpg"
					alt="Acts of Love Foundation community outreach"
					className="absolute inset-0 w-full h-full object-cover opacity-20"
				/>
				<div className="max-w-3xl mx-auto px-6 text-center relative z-10">
					<div className="flex justify-center mb-6">
						<span className="h-px w-16 bg-[#639E90]" />
					</div>
					<h2 className="font-serif text-4xl font-bold text-white mb-4">
						Join the Work
					</h2>
					<p
						className="text-base leading-relaxed mb-10"
						style={{ color: "rgba(255,255,255,0.75)" }}
					>
						Your gift, time, or partnership can help a child stay in school,
						a family reach care, or a community receive practical support.
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<Link
							to="/donate"
							className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white rounded-full hover:opacity-90 transition-opacity"
							style={{ backgroundColor: "#D91E26" }}
						>
							Donate <FiArrowRight size={16} />
						</Link>
						<Link
							to="/get-involved"
							className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white rounded-full border-2 hover:bg-white hover:text-[#08415C] transition-all duration-200"
							style={{ borderColor: "rgba(255,255,255,0.4)" }}
						>
							Get Involved <FiArrowRight size={16} />
						</Link>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}