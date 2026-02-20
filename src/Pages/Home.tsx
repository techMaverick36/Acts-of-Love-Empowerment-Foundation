import { Link } from "react-router-dom";
import {
	FiArrowRight,
	// FiChevronLeft,
	// FiChevronRight,
	FiActivity,
	FiUsers,
	FiBook,
	FiSun,
	FiHeart,
	FiEye,
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
		desc: " A healthy community can focus on creating a better, stable future",
	},
	{
		icon: FiUsers,
		area: "Inclusion",
		accent: "#F26421",
		bg: "#fdf4ee",
		border: "#f8ceae",
		desc: "Ensuring that all people regardless of their background, identity, or circumstances can participate in and benefit from societal progress. ",
	},
	{
		icon: FiBook,
		area: "Education",
		accent: "#204487",
		bg: "#eef3fb",
		border: "#b5c8ed",
		desc: "We believe that quality education sets young people up for lifelong success.",
	},
	{
		icon: FiSun,
		area: "Sustainable Development",
		accent: "#00A54F",
		bg: "#f0faf4",
		border: "#b3e6c8",
		desc: "Focusing on Environmental, Social, and Economic projects that meet our present needs without compromising the ability of future generations to meet their own needs. ",
	},
];

export default function HomePage() {
	return (
		<div>
			<Navbar />
			{/* ── HERO ── */}
			<Hero />

			{/* ── WHO WE ARE PREVIEW ── */}
			<section className="py-20" style={{ backgroundColor: "#eef3fb" }}>
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center max-w-2xl mx-auto mb-14">
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
						<p
							className="text-base leading-relaxed"
							style={{ color: "#4a4a4a" }}
						>
							Acts of Love Empowerment Foundation is an organization that is
							committed to improving people’s lives through Education, Inclusive
							support, and Sustainable development.
						</p>
					</div>
					<div className="grid md:grid-cols-2 gap-8 mb-10">
						{[
							{
								icon: FiHeart,
								bg: "#204487",
								tag: "Our Mission",
								tagColor: "#D91E26",
								title: "Empowering Communities to Flourish",
								body: "Our Mission is to provide support to communities by enhancing education, promoting better health practices, inclusion, and sustainable development, so that everyone has a fair chance at living a productive life",
							},
							{
								icon: FiEye,
								bg: "#D91E26",
								tag: "Our Vision",
								tagColor: "#204487",
								title: "A World Where Everyone Thrives",
								body: "Our Vision is to create an inclusive world where every individual has an opportunity to live a dignified, empowered, and fulfilled life, regardless of their background.",
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
									<p
										className="text-base leading-relaxed"
										style={{ color: "#4a4a4a" }}
									>
										{c.body}
									</p>
								</div>
							);
						})}
					</div>
					<div className="text-center">
						<Link
							to="/about#principles"
							className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80"
							style={{ color: "#204487" }}
						>
							Learn More About Us <FiArrowRight size={16} />
						</Link>
					</div>
				</div>
			</section>

			{/* ── IMPACT AREAS PREVIEW ── */}
			<section className="py-20 bg-white">
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
							Areas of Impact
						</h2>
						<p
							className="text-base leading-relaxed"
							style={{ color: "#4a4a4a" }}
						>
							Four critical pillars designed to address root causes and create
							lasting, generational change.
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
									<p
										className="text-sm leading-relaxed"
										style={{ color: "#4a4a4a" }}
									>
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
							Explore All Impact Areas <FiArrowRight size={16} />
						</Link>
					</div>
				</div>
			</section>

			{/* ── STATS BAND ── */}
			<section className="py-20" style={{ backgroundColor: "#204487" }}>
				<div className="max-w-7xl mx-auto px-6">
					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
						{[
							{ val: "5+", label: "Lives Impacted" },
							{ val: "2+", label: "Communities Served" },
							{ val: "1", label: "Years of Service" },
							{ val: "5+", label: "Volunteers" },
						].map((s) => (
							<div key={s.label}>
								<p className="font-serif text-5xl font-bold text-white mb-2">
									{s.val}
								</p>
								<p className="text-base font-semibold text-white">{s.label}</p>
							</div>
						))}
					</div>
					<div className="mt-14 text-center">
						<Link
							to="/impact"
							className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white rounded border-2 border-white border-opacity-40 hover:bg-white hover:text-blue-800 transition-colors duration-200"
						>
							See Our Full Impact Report <FiArrowRight size={16} />
						</Link>
					</div>
				</div>
			</section>

			{/* ── GIVE PREVIEW ── */}
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
						<p
							className="text-base leading-relaxed"
							style={{ color: "#4a4a4a" }}
						>
							Every gift goes directly toward programs that transform lives.
						</p>
					</div>
     <div className="grid md:grid-cols-3 gap-8 mb-10">
                        {[
							{
								title: "Sponsor a Child",
								cost: "Any amount helps",
								img: "https://images.unsplash.com/photo-1521493959102-bdd6677fdd81?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
								badge: "Most Popular",
							},
							{
								title: "Help a Community",
								cost: "Any amount helps",
								img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80",
								badge: null,
							},
							{
								title: "Medical Emergencies",
								cost: "Any amount helps",
								img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80",
								badge: "Urgent",
							},
      ].map((c) => (
                            <div
                                key={c.title}
                                className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#204487] flex flex-col bg-white/90"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={c.img}
                                        alt={c.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background:
                                                "linear-gradient(180deg, rgba(32,68,135,0.15) 0%, rgba(32,68,135,0.45) 100%)",
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
                                <div className="p-6 flex flex-col h-full">
                                    <h3
                                        className="font-serif text-xl md:text-2xl font-bold mb-1.5"
                                        style={{ color: "#1D1E1F" }}
                                    >
                                        {c.title}
                                    </h3>
                                    <p className="text-xs text-gray-500">Acts of Love Empowerment Foundation</p>
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mt-5 pt-4 border-t border-gray-100">
                                        <span
                                            className="text-sm font-semibold"
                                            style={{ color: "#204487" }}
                                        >
                                            {c.cost}
                                        </span>
                                        <Link
                                            to="/programs"
                                            aria-label={`Give Away: ${c.title}`}
                                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-full transition-all bg-[#D91E26] hover:bg-[#b81a20] hover:scale-[1.02] active:scale-95 w-full lg:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D91E26]"
                                        >
                                            Give Away <FiArrowRight size={14} />
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
			<section className="py-20" style={{ backgroundColor: "#eef3fb" }}>
				<div className="max-w-3xl mx-auto px-6 text-center">
					<div
						className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
						style={{ backgroundColor: "rgba(217,30,38,0.1)", color: "#D91E26" }}
					>
						<span
							className="w-1.5 h-1.5 rounded-full"
							style={{ backgroundColor: "#D91E26" }}
						/>
						Join Our Team
					</div>
					<h2
						className="font-serif text-4xl md:text-5xl font-bold mb-5"
						style={{ color: "#204487" }}
					>
						Volunteer Your Time,{" "}
						<span style={{ color: "#D91E26" }}>Change a Life</span>
					</h2>
					<p
						className="text-base md:text-lg leading-relaxed mb-8"
						style={{ color: "#4a4a4a" }}
					>
						Your skills and passion are the most powerful things you can offer.
						Join our growing team of volunteers already making their mark.
					</p>
					<Link
						to="/get-involved#volunteer"
						className="inline-flex items-center gap-2 px-10 py-4 text-base font-semibold text-white rounded hover:opacity-90 transition-opacity"
						style={{ backgroundColor: "#D91E26" }}
					>
						Become a Volunteer <FiArrowRight size={18} />
					</Link>
				</div>
			</section>
			<Footer />
		</div>
	);
}
