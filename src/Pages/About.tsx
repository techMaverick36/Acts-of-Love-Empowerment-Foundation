import { FiHeart, FiEye, FiUsers, FiAward, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const team = [
	{
		name: "Dr. Amara Okonkwo",
		role: "Executive Director",
		img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80",
	},
	{
		name: "Chidi Nwachukwu",
		role: "Director of Programs",
		img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
	},
	{
		name: "Fatima Aliyu",
		role: "Head of Partnerships",
		img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
	},
	{
		name: "Emeka Obi",
		role: "Finance & Compliance",
		img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
	},
];

const milestones = [
	{
		year: "2026",
		event:
			"Foundation established in Kampala Uganda with a focus on community health.",
	},
];

export default function AboutPage() {
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
						For over 15 years, we have partnered with communities to create
						sustainable, life-changing impact across Nigeria.
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
								We work not just for communities, but with them — listening,
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

			{/* ── MISSION & VISION ── */}
			<section className="py-20" style={{ backgroundColor: "#eef3fb" }}>
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center max-w-2xl mx-auto mb-14">
						<p
							className="text-sm font-semibold tracking-widest uppercase mb-3"
							style={{ color: "#D91E26" }}
						>
							Purpose & Direction
						</p>
						<h2
							className="font-serif text-4xl font-bold"
							style={{ color: "#204487" }}
						>
							Mission & Vision
						</h2>
					</div>
					<div className="grid md:grid-cols-2 gap-8">
						<div className="bg-white rounded-2xl p-10 border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
							<div
								className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
								style={{ backgroundColor: "#204487" }}
							>
								<FiHeart size={26} className="text-white" />
							</div>
							<p
								className="text-xs font-bold tracking-widest uppercase mb-3"
								style={{ color: "#D91E26" }}
							>
								Our Mission
							</p>
							<h3
								className="font-serif text-2xl font-bold mb-4"
								style={{ color: "#204487" }}
							>
								Empowering Communities to Flourish
							</h3>
							<p
								className="text-base leading-relaxed mb-6"
								style={{ color: "#4a4a4a" }}
							>
								Our Mission is to provide support to communities by enhancing
								education, promoting better health practices, inclusion, and
								sustainable environmental development, so that everyone has a
								fair chance at living a productive life
							</p>
							<ul
								className="flex flex-col gap-2 pt-6 border-t"
								style={{ borderColor: "#e8eef8" }}
							>
								{[
									"Community-driven programming",
									"Long-term, sustainable solutions",
									"Dignity-centered service delivery",
								].map((i) => (
									<li
										key={i}
										className="flex items-start gap-2 text-sm"
										style={{ color: "#4a4a4a" }}
									>
										<span
											className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
											style={{ backgroundColor: "#00A54F" }}
										/>
										{i}
									</li>
								))}
							</ul>
						</div>
						<div className="bg-white rounded-2xl p-10 border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
							<div
								className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
								style={{ backgroundColor: "#D91E26" }}
							>
								<FiEye size={26} className="text-white" />
							</div>
							<p
								className="text-xs font-bold tracking-widest uppercase mb-3"
								style={{ color: "#204487" }}
							>
								Our Vision
							</p>
							<h3
								className="font-serif text-2xl font-bold mb-4"
								style={{ color: "#204487" }}
							>
								A World Where Everyone Thrives
							</h3>
							<p
								className="text-base leading-relaxed mb-6"
								style={{ color: "#4a4a4a" }}
							>
								Our Vision is to create an inclusive world where every
								individual has an opportunity to live a dignified, empowered,
								and fulfilled life, regardless of their background.
							</p>
							<ul
								className="flex flex-col gap-2 pt-6 border-t"
								style={{ borderColor: "#e8eef8" }}
							>
								{[
									"Equal access to opportunity",
									"Inclusive growth for all communities",
									"Resilient, self-sustaining societies",
								].map((i) => (
									<li
										key={i}
										className="flex items-start gap-2 text-sm"
										style={{ color: "#4a4a4a" }}
									>
										<span
											className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
											style={{ backgroundColor: "#D91E26" }}
										/>
										{i}
									</li>
								))}
							</ul>
						</div>
					</div>

					{/* Values */}
					<div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
						{[
							{ label: "Compassion", color: "#D91E26" },
							{ label: "Transparency", color: "#204487" },
							{ label: "Integrity", color: "#00A54F" },
							{ label: "Inclusion", color: "#F26421" },
						].map((v) => (
							<div
								key={v.label}
								className="bg-white rounded-xl px-5 py-4 text-center border border-blue-100"
							>
								<div
									className="w-2 h-2 rounded-full mx-auto mb-2"
									style={{ backgroundColor: v.color }}
								/>
								<p
									className="text-sm font-semibold"
									style={{ color: "#1D1E1F" }}
								>
									{v.label}
								</p>
							</div>
						))}
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
						Whether you give, volunteer, or partner with us — you become part of
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
