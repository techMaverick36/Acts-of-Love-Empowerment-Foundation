import { FiHeart, FiArrowRight, FiShield, FiUsers, FiStar, FiTarget, FiGlobe } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// const team = [
// 	{
// 		name: "Dr. Amara Okonkwo",
// 		role: "Executive Director",
// 		img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80",
// 	},
// 	{
// 		name: "Chidi Nwachukwu",
// 		role: "Director of Programs",
// 		img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
// 	},
// 	{
// 		name: "Fatima Aliyu",
// 		role: "Head of Partnerships",
// 		img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
// 	},
// 	{
// 		name: "Emeka Obi",
// 		role: "Finance & Compliance",
// 		img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
// 	},
// ];

const milestones = [
	{
		year: "2026",
		event:
			"Foundation established in Kampala Uganda with a focus on community health.",
	},
];

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
			<section className="relative h-[45vh] min-h-[340px] flex items-center justify-center text-center overflow-hidden">
				<img
					src="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=1600&q=80"
					alt="Community impact"
					className="absolute inset-0 w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

				<div className="relative z-10 px-6 max-w-3xl">
					<p className="uppercase tracking-[0.3em] text-xs mb-4 font-semibold text-[#f85407]">
						About Acts of Love
					</p>
					<h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
						Building Hope Through
						<span className="block text-[#639E90]">Compassion & Action</span>
					</h1>
					<p className="text-gray-200 text-base md:text-lg">
						We plan to partner with communities to create
						sustainable, life-changing impact across Uganda.
					</p>
				</div>
			</section>

			{/* ── INTRO ── */}
			<section className="p-20 bg-white ">
				<div className="max-w-7xl mx-auto px-6">
					<div className="grid lg:grid-cols-2 gap-16 items-center">
						<div>
							<p
								className="text-sm font-semibold tracking-widest uppercase mb-4"
								style={{ color: "#D91E26" }}
							>
								Our Story
							</p>
							<h2
								className="font-serif text-4xl font-bold mb-6"
								style={{ color: "#204487" }}
							>
								Born from a Desire to Serve
							</h2>
							<p
								className="text-base leading-relaxed mb-4"
								style={{ color: "#4a4a4a" }}
							>
								Acts of Love Empowerment Foundation was founded in January 2026
								by a small group of passionate Ugandans who believed that change
								begins at the community level. We Picture this world where every
								person, regardless of their circumstances, has the opportunity
								to thrive. We started with a simple mission: to empower
								vulnerable communities through compassionate action and
								sustainable development.
							</p>
							<p
								className="text-base leading-relaxed mb-8"
								style={{ color: "#4a4a4a" }}
							>
								We work not just for communities, but with them listening,
								co-designing, and walking alongside people as they build the
								lives they deserve. Our model is built on trust, transparency,
								and the conviction that every person carries dignity worth
								protecting.
							</p>
							<Link
								to="/impact"
								className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold text-white rounded hover:opacity-90 transition-opacity"
								style={{ backgroundColor: "#204487" }}
							>
								See Our Impact <FiArrowRight size={15} />
							</Link>
						</div>
						<div className="relative">
							<img
								src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80"
								alt="Community work"
								className="rounded-2xl w-full object-cover"
								style={{ height: 440 }}
							/>
							<div
								className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-lg border border-blue-100"
								style={{ maxWidth: 220 }}
							>
								<p
									className="font-serif text-4xl font-bold mb-1"
									style={{ color: "#204487" }}
								>
									2 +
								</p>
								<p className="text-sm font-medium" style={{ color: "#1D1E1F" }}>
									months with trusted services
								</p>
								<p className="text-xs mt-1" style={{ color: "#888" }}>
									Est. 2026, Kampala, Uganda
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ── OUR PRINCIPLES ── */}
			<section id="principles" className="py-20 scroll-mt-24" style={{ backgroundColor: "#eef3fb" }}>
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
						<p
							className="text-base leading-relaxed"
							style={{ color: "#4a4a4a" }}
						>
							These principles shape every decision we make and every program we build. They are the foundation of who we are.
						</p>
					</div>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{[
							{
								icon: FiHeart,
								title: "Compassion First",
								desc: "Every action we take is rooted in love and genuine care for the communities we serve. We lead with empathy in all that we do.",
								color: "#D91E26",
							},
							{
								icon: FiShield,
								title: "Integrity & Transparency",
								desc: "We are open, honest, and accountable in everything we do from how we use funds to how we report our impact.",
								color: "#204487",
							},
							{
								icon: FiUsers,
								title: "Inclusion & Dignity",
								desc: "We believe every person deserves to be treated with dignity and respect, regardless of background, identity, or circumstance.",
								color: "#F26421",
							},
							{
								icon: FiGlobe,
								title: "Community Ownership",
								desc: "We work with communities, not just for them. Our programs are co-designed with the people they are meant to serve.",
								color: "#639E90",
							},
							{
								icon: FiTarget,
								title: "Sustainable Impact",
								desc: "We focus on long-term solutions over short-term fixes, building programs that continue to deliver value for generations.",
								color: "#00A54F",
							},
							{
								icon: FiStar,
								title: "Excellence & Stewardship",
								desc: "We hold ourselves to the highest standards of service delivery, ensuring that every resource is used wisely and purposefully.",
								color: "#204487",
							},
						].map((p) => {
							const Icon = p.icon;
							return (
								<div
									key={p.title}
									className="bg-white rounded-2xl p-8 border border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-300"
								>
									<div
										className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
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
									<p
										className="text-sm leading-relaxed"
										style={{ color: "#4a4a4a" }}
									>
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
							Our Journey
						</p>
						<h2
							className="font-serif text-4xl font-bold"
							style={{ color: "#204487" }}
						>
							2 months of Impact
						</h2>
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
									className={`relative flex items-start gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
								>
									<div
										className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"} pl-14 md:pl-0`}
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
											<p
												className="text-sm leading-relaxed"
												style={{ color: "#4a4a4a" }}
											>
												{m.event}
											</p>
										</div>
									</div>
									<div
										className="absolute left-3.5 md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full border-4 border-white shadow-sm flex-shrink-0 mt-4"
										style={{ backgroundColor: "#204487" }}
									/>
									<div className="flex-1 hidden md:block" />
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* ── TEAM ── */}
			{/* <section className="py-20" style={{ backgroundColor: "#eef3fb" }}>
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center max-w-xl mx-auto mb-14">
						<p
							className="text-sm font-semibold tracking-widest uppercase mb-3"
							style={{ color: "#D91E26" }}
						>
							Our People
						</p>
						<h2
							className="font-serif text-4xl font-bold"
							style={{ color: "#204487" }}
						>
							Leadership Team
						</h2>
					</div>
					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
						{team.map((m) => (
							<div
								key={m.name}
								className="bg-white rounded-2xl overflow-hidden border border-blue-100 shadow-sm hover:shadow-md transition-shadow group"
							>
								<div className="h-56 overflow-hidden">
									<img
										src={m.img}
										alt={m.name}
										className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
									/>
								</div>
								<div className="p-5">
									<p
										className="font-serif font-bold text-base"
										style={{ color: "#1D1E1F" }}
									>
										{m.name}
									</p>
									<p className="text-sm mt-1" style={{ color: "#639E90" }}>
										{m.role}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section> */}

			{/* ── CTA ── */}
			<section className="py-20" style={{ backgroundColor: "#08415C" }}>
				<div className="max-w-3xl mx-auto px-6 text-center">
					<h2 className="font-serif text-4xl font-bold text-white mb-4">
						Be Part of the Story
					</h2>
					<p
						className="text-base leading-relaxed mb-8"
						style={{ color: "rgba(255,255,255,0.75)" }}
					>
						Whether you give, volunteer, or partner with us you become part of
						a community changing lives every single day.
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<Link
							to="/programs"
							className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white rounded hover:opacity-90 transition-opacity"
							style={{ backgroundColor: "#D91E26" }}
						>
							Donate Now <FiArrowRight size={16} />
						</Link>
						<Link
							to="/get-involved"
							className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded border-2 border-white border-opacity-50 text-white hover:bg-white hover:text-blue-800 transition-colors"
						>
							Volunteer <FiArrowRight size={16} />
						</Link>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
}
