import { Link } from "react-router-dom";
import {
	FiArrowRight,
	FiActivity,
	FiUsers,
	FiBook,
	FiSun,
	FiHeart,
	FiEye,
	FiShield,
	FiCheckCircle,
	FiAward,
	FiMapPin,
} from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

const impactAreas = [
	{
		icon: FiActivity,
		area: "Health",
		accent: "#00A54F",
		bg: "#f0faf4",
		border: "#b3e6c8",
		desc: "Health support gives families room to work, study, and care for one another.",
	},
	{
		icon: FiUsers,
		area: "Inclusion",
		accent: "#F26421",
		bg: "#fdf4ee",
		border: "#f8ceae",
		desc: "Support for people who are often left out, including women, youth, and persons with disabilities.",
	},
	{
		icon: FiBook,
		area: "Education",
		accent: "#204487",
		bg: "#eef3fb",
		border: "#b5c8ed",
		desc: "School fees, learning materials, meals, and mentoring for young people.",
	},
	{
		icon: FiSun,
		area: "Sustainable Development",
		accent: "#00A54F",
		bg: "#f0faf4",
		border: "#b3e6c8",
		desc: "Clean water, farming support, and practical projects that help families plan ahead.",
	},
];

export default function HomePage() {
	return (
		<div>
			<Navbar />

			{/* ── HERO ── */}
			<Hero />

			{/* ── TRUST STRIP ── */}
			<div className="py-5 bg-white border-b border-gray-100">
				<div className="max-w-7xl mx-auto px-6">
					<div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
						{[
							{ icon: FiShield, label: "Non-Profit Organisation", sub: "Kampala, Uganda" },
							{ icon: FiCheckCircle, label: "100% Program Allocation", sub: "Transparent financials" },
							{ icon: FiUsers, label: "Community-Led", sub: "Built with communities" },
							{ icon: FiAward, label: "Est. 2026", sub: "Kampala, Uganda" },
						].map((item) => {
							const Icon = item.icon;
							return (
								<div key={item.label} className="flex items-center gap-3">
									<div
										className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
										style={{ backgroundColor: "#eef3fb" }}
									>
										<Icon size={16} style={{ color: "#204487" }} />
									</div>
									<div>
										<p className="text-sm font-bold leading-tight" style={{ color: "#1D1E1F" }}>
											{item.label}
										</p>
										<p className="text-xs" style={{ color: "#888" }}>
											{item.sub}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* ── WHO WE ARE ── */}
			<section className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-6">
					<div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
						{/* Image */}
						<div className="relative order-2 lg:order-1">
							<img
								src="/D-4231r_37.jpg"
								alt="Acts of Love Foundation team serving the community"
								className="rounded-2xl w-full object-cover shadow-xl"
								style={{ height: 440 }}
							/>
							<div
								className="absolute -bottom-6 right-0 md:-right-6 bg-white rounded-2xl p-5 shadow-lg border border-blue-100 hidden sm:block"
							>
								<p className="font-serif text-3xl font-bold" style={{ color: "#204487" }}>
									Est. 2026
								</p>
								<p className="text-sm font-medium mt-0.5" style={{ color: "#4a4a4a" }}>
									Kampala, Uganda
								</p>
							</div>
						</div>

						{/* Content */}
						<div className="order-1 lg:order-2">
							<p
								className="text-sm font-semibold tracking-widest uppercase mb-3"
								style={{ color: "#D91E26" }}
							>
								Our Foundation
							</p>
							<h2
								className="font-serif text-4xl md:text-5xl font-bold mb-4"
								style={{ color: "#204487" }}
							>
								Who We Are
							</h2>
							<div className="w-14 h-1 rounded mb-6" style={{ backgroundColor: "#F26421" }} />
							<p className="text-base leading-relaxed mb-4" style={{ color: "#4a4a4a" }}>
								Acts of Love Empowerment Foundation is a non-profit organisation in Uganda
								supporting children and families through education, health, inclusion, and
								community development.
							</p>
							<p className="text-base leading-relaxed mb-8" style={{ color: "#4a4a4a" }}>
								Our work starts with listening. Communities help shape the support they
								receive, from school needs to health outreach and family care.
							</p>
							<Link
								to="/about"
								className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80"
								style={{ color: "#204487" }}
							>
								Our Full Story <FiArrowRight size={16} />
							</Link>
						</div>
					</div>

					{/* Mission / Vision Cards */}
					<div className="grid md:grid-cols-2 gap-8">
						{[
							{
								icon: FiHeart,
								bg: "#204487",
								tag: "Our Mission",
								tagColor: "#D91E26",
								title: "Support That Starts Close to Home",
								body: "Our mission is to support communities through education, better health practices, inclusion, and practical development, so more people have a fair chance to live with dignity.",
							},
							{
								icon: FiEye,
								bg: "#D91E26",
								tag: "Our Vision",
								tagColor: "#204487",
								title: "Dignity for Every Person",
								body: "Our vision is a fairer world where every person has the chance to learn, receive care, take part, and live with dignity, whatever their background.",
							},
						].map((c) => {
							const Icon = c.icon;
							return (
								<div
									key={c.title}
									className="bg-white rounded-2xl p-8 border border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-300"
								>
									<div
										className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
										style={{ backgroundColor: c.bg }}
									>
										<Icon size={26} className="text-white" />
									</div>
									<p
										className="text-xs font-bold tracking-widest uppercase mb-3"
										style={{ color: c.tagColor }}
									>
										{c.tag}
									</p>
									<h3
										className="font-serif text-2xl font-bold mb-4"
										style={{ color: "#204487" }}
									>
										{c.title}
									</h3>
									<p className="text-base leading-relaxed" style={{ color: "#4a4a4a" }}>
										{c.body}
									</p>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* ── IMPACT AREAS ── */}
			<section className="py-20" style={{ backgroundColor: "#eef3fb" }}>
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center max-w-2xl mx-auto mb-14">
						<p
							className="text-sm font-semibold tracking-widest uppercase mb-3"
							style={{ color: "#D91E26" }}
						>
							What We Do
						</p>
						<h2
							className="font-serif text-4xl md:text-5xl font-bold mb-4"
							style={{ color: "#204487" }}
						>
							Where We Serve
						</h2>
						<p className="text-base leading-relaxed" style={{ color: "#4a4a4a" }}>
							Our work focuses on 4 areas where steady support can change daily life for
							children, families, and communities.
						</p>
					</div>
					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
						{impactAreas.map((item) => {
							const Icon = item.icon;
							return (
								<div
									key={item.area}
									className="group rounded-2xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border"
									style={{ backgroundColor: item.bg, borderColor: item.border }}
								>
									<div
										className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
										style={{ backgroundColor: item.accent }}
									>
										<Icon size={22} className="text-white" />
									</div>
									<h3
										className="font-serif text-xl font-bold mb-3"
										style={{ color: "#1D1E1F" }}
									>
										{item.area}
									</h3>
									<p className="text-sm leading-relaxed" style={{ color: "#4a4a4a" }}>
										{item.desc}
									</p>
								</div>
							);
						})}
					</div>
					<div className="text-center">
						<Link
							to="/impact"
							className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80"
							style={{ color: "#204487" }}
						>
							Explore Our Work <FiArrowRight size={16} />
						</Link>
					</div>
				</div>
			</section>

			{/* ── STATS BAND ── */}
			{/* <section className="py-20" style={{ backgroundColor: "#204487" }}>
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center mb-14">
						<p
							className="text-sm font-semibold tracking-widest uppercase mb-3"
							style={{ color: "rgba(255,255,255,0.55)" }}
						>
							Our Numbers
						</p>
						<h2 className="font-serif text-4xl font-bold text-white">
							The Work So Far
						</h2>
					</div>
					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
						{[
							{ icon: FiUsers, val: "130+", label: "Lives Reached", sub: "Across 2 communities" },
							{ icon: FiMapPin, val: "2", label: "Communities Served", sub: "Wakiso District, Uganda" },
							{ icon: FiActivity, val: "2026", label: "Year Founded", sub: "Kampala, Uganda" },
							{ icon: FiHeart, val: "5+", label: "Volunteers", sub: "Giving time and skill" },
						].map((s) => {
							const Icon = s.icon;
							return (
								<div key={s.label} className="group">
									<div
										className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110"
										style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
									>
										<Icon size={24} className="text-white" />
									</div>
									<p className="font-serif text-5xl font-bold text-white mb-2">
										{s.val}
									</p>
									<p className="text-base font-semibold text-white mb-1">{s.label}</p>
									<p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
										{s.sub}
									</p>
								</div>
							);
						})}
					</div>
					<div className="mt-14 text-center">
						<Link
							to="/impact"
							className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white rounded-full border-2 hover:bg-white hover:text-blue-900 transition-all duration-200"
							style={{ borderColor: "rgba(255,255,255,0.4)" }}
						>
							View Our Work <FiArrowRight size={16} />
						</Link>
					</div>
				</div>
			</section> */}

			{/* ── IMPACT STORY / QUOTE ── */}
			<section className="py-20" style={{ backgroundColor: "#08415C" }}>
				<div className="max-w-7xl mx-auto px-6">
					<div className="grid lg:grid-cols-2 gap-16 items-center">
						{/* Quote side */}
						<div>
							<div className="flex items-center gap-3 mb-8">
								<span className="h-px w-12 bg-[#639E90]" />
								<p
									className="text-sm font-semibold tracking-widest uppercase"
									style={{ color: "#639E90" }}
								>
									Why It Matters
								</p>
							</div>
							<blockquote
								className="font-serif text-3xl md:text-4xl text-white leading-snug mb-6"
							>
								"Every child deserves the chance to dream, learn, and become
								everything they were created to be."
							</blockquote>
							<p
								className="text-sm uppercase tracking-widest font-semibold mb-10"
								style={{ color: "rgba(255,255,255,0.45)" }}
							>
								- Acts of Love Empowerment Foundation
							</p>
							<div className="flex flex-wrap gap-4">
								<Link
									to="/impact"
									className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full border-2 hover:bg-white hover:text-[#08415C] transition-all duration-200"
									style={{ borderColor: "rgba(255,255,255,0.4)" }}
								>
									See Our Work <FiArrowRight size={15} />
								</Link>
								<Link
									to="/donate"
									className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full hover:opacity-90 transition-opacity"
									style={{ backgroundColor: "#D91E26" }}
								>
									Support a Child <FiHeart size={15} />
								</Link>
							</div>
						</div>

						{/* Image side */}
						<div className="relative">
							<img
								src="/D-4231r_21.jpg"
								alt="Child receiving support from Acts of Love Foundation"
								className="rounded-2xl w-full object-cover shadow-2xl"
								style={{ height: 460 }}
							/>
							<div className="absolute -bottom-4 -left-4 md:-left-6 bg-white rounded-2xl p-5 shadow-xl">
								<p className="font-serif text-2xl font-bold" style={{ color: "#D91E26" }}>
									130+
								</p>
								<p className="text-xs font-semibold mt-0.5" style={{ color: "#1D1E1F" }}>
									Lives Directly Reached
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ── WAYS TO GIVE ── */}
			<section className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center max-w-2xl mx-auto mb-14">
						<p
							className="text-sm font-semibold tracking-widest uppercase mb-3"
							style={{ color: "#D91E26" }}
						>
							Get Involved
						</p>
						<h2
							className="font-serif text-4xl md:text-5xl font-bold mb-4"
							style={{ color: "#204487" }}
						>
							Ways To Give
						</h2>
						<p className="text-base leading-relaxed" style={{ color: "#4a4a4a" }}>
							Every gift goes directly to education, health, food, and community support.
						</p>
					</div>
					<div className="grid md:grid-cols-3 gap-8 mb-10">
						{[
							{
								title: "Sponsor a Child",
								cost: "Any amount helps",
								img: "/D-4231r_21.jpg",
								badge: "Most Popular",
								desc: "Provide school fees, healthcare support, and daily meals for a child.",
							},
							{
								title: "Help a Community",
								cost: "Any amount helps",
								img: "/D-4231r_30.jpg",
								badge: null,
								desc: "Support clean water, clinic needs, and farming projects for communities.",
							},
							{
								title: "Medical Emergencies",
								cost: "Any amount helps",
								img: "/IMG_0951.jpg",
								badge: "Urgent",
								desc: "Send urgent support for surgery, medicine, transport, and recovery care.",
							},
						].map((c) => (
							<div
								key={c.title}
								className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col bg-white"
							>
								<div className="relative h-52 overflow-hidden">
									<img
										src={c.img}
										alt={c.title}
										className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
									/>
									<div
										className="absolute inset-0"
										style={{
											background:
												"linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.42) 100%)",
										}}
									/>
									{c.badge && (
										<span
											className="absolute top-4 left-4 text-[10px] tracking-wide font-extrabold px-3 py-1 rounded-full text-white shadow-sm uppercase"
											style={{ backgroundColor: "#D91E26" }}
										>
											{c.badge}
										</span>
									)}
								</div>
								<div className="p-6 flex flex-col flex-1">
									<h3
										className="font-serif text-xl font-bold mb-2"
										style={{ color: "#1D1E1F" }}
									>
										{c.title}
									</h3>
									<p className="text-sm leading-relaxed mb-5" style={{ color: "#4a4a4a" }}>
										{c.desc}
									</p>
									<div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-gray-100">
										<span className="text-sm font-semibold" style={{ color: "#204487" }}>
											{c.cost}
										</span>
										<Link
											to="/donate"
											aria-label={`Donate: ${c.title}`}
											className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-full transition-all hover:scale-[1.02] active:scale-95"
											style={{ backgroundColor: "#D91E26" }}
										>
											Donate <FiArrowRight size={14} />
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="text-center">
						<Link
							to="/programs"
							className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity"
							style={{ color: "#204487" }}
						>
							View All Giving Options <FiArrowRight size={16} />
						</Link>
					</div>
				</div>
			</section>

			{/* ── VOLUNTEER BAND ── */}
			<section className="relative py-24 overflow-hidden">
				<img
					src="/D-4231r_22.jpg"
					alt="Volunteers working with the community"
					className="absolute inset-0 w-full h-full object-cover"
				/>
				<div
					className="absolute inset-0"
					style={{
						background:
							"linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.52) 55%, rgba(0,0,0,0.28) 100%)",
					}}
				/>
				<div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
					<div
						className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
						style={{ backgroundColor: "rgba(217,30,38,0.2)", color: "#ff8080" }}
					>
						<span className="w-1.5 h-1.5 rounded-full bg-[#D91E26]" />
						Join Our Team
					</div>
					<h2
						className="font-serif text-4xl md:text-5xl font-bold text-white mb-5"
					>
						Volunteer Your Time,{" "}
						<span style={{ color: "#F26421" }}>Change a Life</span>
					</h2>
					<p
						className="text-base md:text-lg leading-relaxed mb-10"
						style={{ color: "rgba(255,255,255,0.8)" }}
					>
						Your time and skills can help with clinics, mentoring, admin work,
						fundraising, and community visits across Uganda.
					</p>
					<div className="flex flex-wrap gap-4 justify-center">
						<Link
							to="/get-involved#volunteer"
							className="inline-flex items-center gap-2 px-10 py-4 text-base font-semibold text-white rounded-full hover:opacity-90 transition-opacity"
							style={{ backgroundColor: "#D91E26" }}
						>
							Become a Volunteer <FiArrowRight size={18} />
						</Link>
						<Link
							to="/get-involved#partnerships"
							className="inline-flex items-center gap-2 px-10 py-4 text-base font-semibold text-white rounded-full border-2 hover:bg-white hover:text-blue-900 transition-all duration-200"
							style={{ borderColor: "rgba(255,255,255,0.4)" }}
						>
							Partner With Us
						</Link>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
