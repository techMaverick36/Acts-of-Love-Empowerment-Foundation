import type { CSSProperties } from "react";
import {
	FiActivity,
	FiArrowRight,
	FiAward,
	FiBook,
	FiCheckCircle,
	FiEye,
	FiHeart,
	FiShield,
	FiSun,
	FiUsers,
} from "react-icons/fi";
import HeroSlider from "../components/home/HeroSlider";
import CtaBand from "../components/layout/CtaBand";
import PageLayout from "../components/layout/PageLayout";
import Section, { Container } from "../components/layout/Section";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import IconTile from "../components/ui/IconTile";
import MediaCard from "../components/ui/MediaCard";
import SectionHeading, { Eyebrow } from "../components/ui/SectionHeading";
import StatCallout from "../components/ui/StatCallout";
import { PAGES } from "../config/seo";
import { organizationJsonLd, websiteJsonLd } from "../lib/structuredData";

const trustItems = [
	{ icon: FiShield, label: "Non-Profit Organisation", sub: "Kampala, Uganda" },
	{ icon: FiCheckCircle, label: "100% Program Allocation", sub: "Transparent financials" },
	{ icon: FiUsers, label: "Community-Led", sub: "Built with communities" },
	{ icon: FiAward, label: "Est. 2026", sub: "Kampala, Uganda" },
];

const missionVision = [
	{
		icon: FiHeart,
		iconColor: "var(--color-brand-blue)",
		tag: "Our Mission",
		tagClass: "text-brand-red",
		title: "A Fair Chance at a Productive Life",
		body: "Our mission is to provide support to communities by enhancing education, promoting better health practices, inclusion, and sustainable environmental development, so that everyone has a fair chance at living a productive life.",
	},
	{
		icon: FiEye,
		iconColor: "var(--color-brand-red)",
		tag: "Our Vision",
		tagClass: "text-brand-blue",
		title: "An Inclusive World for Every Individual",
		body: "Our vision is to create an inclusive world where every individual has an opportunity to live a dignified, empowered, and fulfilled life, regardless of their background.",
	},
];

const impactAreas = [
	{
		icon: FiActivity,
		area: "Health",
		accent: "var(--color-brand-green)",
		desc: "A healthy community can focus on creating a better, stable future.",
	},
	{
		icon: FiUsers,
		area: "Inclusion",
		accent: "var(--color-brand-orange)",
		desc: "Ensuring that all people, regardless of their background, identity, or circumstances, can participate in and benefit from societal progress.",
	},
	{
		icon: FiBook,
		area: "Education",
		accent: "var(--color-brand-blue)",
		desc: "We believe that quality education sets young people up for lifelong success.",
	},
	{
		icon: FiSun,
		area: "Sustainable Development",
		accent: "var(--color-brand-green)",
		desc: "Focusing on Environmental, Social, and Economic projects that meet our present needs without compromising the ability of future generations to meet their own needs.",
	},
];

const waysToGive = [
	{
		title: "Sponsor a Child",
		cost: "Any amount helps",
		img: "/D-4231r_21.jpg",
		badge: "Most Popular",
		desc: "Sponsorship gives a vulnerable child a bright future. It covers school fees, meals, school uniforms, and scholastic materials — proven to help children break the poverty cycle.",
	},
	{
		title: "Help a Community",
		cost: "Any amount helps",
		img: "/D-4231r_30.jpg",
		badge: null,
		desc: "Sometimes communities need emergency intervention without time for long-term projects — cases like mudslides or flooding that demand immediate response.",
	},
	{
		title: "Medical Emergencies",
		cost: "Any amount helps",
		img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80",
		badge: "Urgent",
		desc: "Send urgent support for surgery, medicine, transport, and recovery care.",
	},
];

export default function HomePage() {
	return (
		<PageLayout seo={{ ...PAGES.home, jsonLd: [organizationJsonLd(), websiteJsonLd()] }}>
			<HeroSlider />

			{/* ── TRUST STRIP ── */}
			<div className="border-b border-line bg-white py-6">
				<Container>
					<ul className="flex flex-wrap items-center justify-center gap-x-14 gap-y-5">
						{trustItems.map((item) => (
							<li key={item.label} className="flex items-center gap-3">
								<IconTile icon={item.icon} size="sm" />
								<div>
									<p className="text-sm font-bold leading-tight text-ink">{item.label}</p>
									<p className="text-xs text-muted">{item.sub}</p>
								</div>
							</li>
						))}
					</ul>
				</Container>
			</div>

			{/* ── WHO WE ARE ── */}
			<Section>
				<div className="mb-20 grid items-center gap-16 lg:grid-cols-2">
					<div className="relative order-2 lg:order-1">
						<img
							src="/D-4231r_37.jpg"
							alt="Acts of Love Foundation team serving the community"
							loading="lazy"
							className="aspect-[4/3] w-full rounded-2xl object-cover shadow-xl lg:aspect-auto lg:h-[440px]"
						/>
						<StatCallout value="Est. 2026" label="Kampala, Uganda" className="-bottom-6 right-0 hidden sm:block md:-right-6" />
					</div>

					<div className="order-1 lg:order-2">
						<SectionHeading align="left" eyebrow="Our Foundation" title="Who We Are" />
						<div className="mt-6 space-y-4 text-base leading-relaxed text-body">
							<p>
								Acts of Love Empowerment Foundation is an organization committed to improving people's lives
								through Education, Inclusive support, and Sustainable development.
							</p>
							<p>
								Our work starts with listening. Communities help shape the programs they receive, from school
								needs to health outreach and family care.
							</p>
						</div>
						<Button to="/about" variant="link" trailingIcon={FiArrowRight} className="mt-8 text-sm">
							Our Full Story
						</Button>
					</div>
				</div>

				<div className="grid gap-8 md:grid-cols-2">
					{missionVision.map((c) => (
						<Card key={c.title} interactive>
							<IconTile icon={c.icon} accent={c.iconColor} variant="solid" size="lg" className="mb-6" />
							<p className={`mb-3 text-xs font-bold uppercase tracking-widest ${c.tagClass}`}>{c.tag}</p>
							<h3 className="mb-4 font-serif text-2xl font-semibold text-brand-blue">{c.title}</h3>
							<p className="text-base leading-relaxed text-body">{c.body}</p>
						</Card>
					))}
				</div>
			</Section>

			{/* ── IMPACT AREAS ── */}
			<Section tone="surface">
				<SectionHeading
					eyebrow="What We Do"
					title="Where We Serve"
					intro="Our work focuses on 4 areas where steady support can change daily life for children, families, and communities."
					className="mb-14"
				/>
				<div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{impactAreas.map((item) => (
						<article
							key={item.area}
							style={{ "--accent": item.accent } as CSSProperties}
							className="flex flex-col rounded-2xl border border-(--accent)/25 border-t-4 border-t-(--accent) bg-white p-7"
						>
							<IconTile icon={item.icon} accent={item.accent} className="mb-5" />
							<h3 className="mb-3 font-serif text-xl font-semibold text-ink">{item.area}</h3>
							<p className="text-sm leading-relaxed text-body">{item.desc}</p>
						</article>
					))}
				</div>
				<div className="text-center">
					<Button to="/impact" variant="link" trailingIcon={FiArrowRight} className="text-sm">
						Explore Our Work
					</Button>
				</div>
			</Section>

			{/* ── WHY IT MATTERS ── */}
			<Section tone="navy">
				<div className="grid items-center gap-16 lg:grid-cols-2">
					<figure>
						<Eyebrow tone="teal" className="mb-8">
							Why It Matters
						</Eyebrow>
						<blockquote className="mb-6 font-serif text-3xl leading-snug text-white md:text-4xl">
							"Every child deserves the chance to dream, learn, and become everything they were created to be."
						</blockquote>
						<figcaption className="mb-10 text-sm font-semibold uppercase tracking-widest text-white/50">
							- Acts of Love Empowerment Foundation
						</figcaption>
						<div className="flex flex-wrap gap-4">
							<Button to="/impact" variant="outline-light" trailingIcon={FiArrowRight}>
								See Our Work
							</Button>
							<Button to="/donate" trailingIcon={FiHeart}>
								Support a Child
							</Button>
						</div>
					</figure>

					<div className="relative">
						<img
							src="/D-4231r_21.jpg"
							alt="Child receiving support from Acts of Love Foundation"
							loading="lazy"
							className="aspect-[4/3] w-full rounded-2xl object-cover shadow-2xl lg:aspect-auto lg:h-[460px]"
						/>
						<StatCallout
							value="130+"
							label="Lives Directly Reached"
							color="var(--color-brand-red)"
							className="-bottom-4 -left-2 md:-left-6"
						/>
					</div>
				</div>
			</Section>

			{/* ── WAYS TO GIVE ── */}
			<Section>
				<SectionHeading
					eyebrow="Get Involved"
					title="Ways To Give"
					intro="We believe that to give is not to cast away — it is to store for the future. When we come together to tackle the world's toughest challenges, we invest in a greater future. Change is possible, but only through collective generosity."
					className="mb-14"
				/>
				<div className="mb-12 grid gap-8 md:grid-cols-3">
					{waysToGive.map((c) => (
						<MediaCard
							key={c.title}
							image={c.img}
							imageAlt={c.title}
							badge={c.badge ? { label: c.badge } : undefined}
							title={c.title}
							description={c.desc}
							footer={
								<>
									<span className="text-sm font-semibold text-brand-blue">{c.cost}</span>
									<Button to="/donate" size="sm" trailingIcon={FiArrowRight} aria-label={`Donate: ${c.title}`}>
										Donate
									</Button>
								</>
							}
						/>
					))}
				</div>
				<div className="text-center">
					<Button to="/programs" variant="link" trailingIcon={FiArrowRight} className="text-sm">
						View All Giving Options
					</Button>
				</div>
			</Section>

			{/* ── VOLUNTEER BAND ── */}
			<CtaBand
				image={{ src: "/D-4231r_22.jpg", alt: "Volunteers working with the community" }}
				title={
					<>
						Volunteer Your Time, <span className="text-brand-orange">Change a Life</span>
					</>
				}
				description="Your time and skills can help with clinics, mentoring, admin work, fundraising, and community visits across Uganda."
				actions={
					<>
						<Button to="/get-involved#volunteer" size="lg" trailingIcon={FiArrowRight}>
							Become a Volunteer
						</Button>
						<Button to="/get-involved#partnerships" variant="outline-light" size="lg">
							Partner With Us
						</Button>
					</>
				}
			/>
		</PageLayout>
	);
}
