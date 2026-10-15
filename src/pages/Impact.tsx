import type { CSSProperties } from "react";
import { FiActivity, FiArrowRight, FiAward, FiBook, FiHeart, FiMapPin, FiSun, FiUsers } from "react-icons/fi";
import PageHero from "../components/layout/PageHero";
import PageLayout from "../components/layout/PageLayout";
import Section from "../components/layout/Section";
import Button from "../components/ui/Button";
import CheckList from "../components/ui/CheckList";
import IconTile from "../components/ui/IconTile";
import SectionHeading from "../components/ui/SectionHeading";
import StatCallout from "../components/ui/StatCallout";
import { PAGES } from "../config/seo";

const pillars = [
	{
		icon: FiActivity,
		area: "Health",
		accent: "var(--color-brand-green)",
		image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
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
		accent: "var(--color-brand-orange)",
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
		accent: "var(--color-brand-blue)",
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
		accent: "var(--color-brand-green)",
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
	{ icon: FiUsers, val: "130+", label: "Lives Directly Reached", sub: "Across all 4 pillars" },
	{ icon: FiMapPin, val: "2", label: "Communities Served", sub: "Wakiso District, Uganda" },
	{ icon: FiAward, val: "2026", label: "Year Founded", sub: "Kampala, Uganda" },
	{ icon: FiHeart, val: "5+", label: "Dedicated Volunteers", sub: "Giving their time" },
];

const slug = (area: string) => area.toLowerCase().replace(/\s+/g, "-");

export default function ImpactPage() {
	return (
		<PageLayout seo={PAGES.impact}>
			<PageHero
				image="/D-4231r_31.jpg"
				imageAlt="Acts of Love Foundation distributing supplies to children"
				eyebrow="Our Work"
				title="Practical Support"
				highlight="For Daily Needs"
				description="These are the areas where we serve children, families, and communities across Uganda."
			/>

			{/* ── PILLARS ── */}
			{pillars.map((p, i) => {
				const imageFirst = i % 2 === 0;
				return (
					<Section
						key={p.area}
						id={slug(p.area)}
						tone={imageFirst ? "white" : "surface"}
						aria-labelledby={`${slug(p.area)}-heading`}
						style={{ "--accent": p.accent } as CSSProperties}
					>
						<div className="grid items-center gap-14 lg:grid-cols-2">
							<div className={imageFirst ? "" : "lg:order-2"}>
								<div className="relative h-80 overflow-hidden rounded-2xl md:h-[400px]">
									<img src={p.image} alt={p.area} loading="lazy" className="size-full object-cover" />
									<div aria-hidden className="absolute inset-0 bg-(--accent)/10" />
									<StatCallout value={p.stat.val} label={p.stat.label} color={p.accent} className="bottom-6 left-6" />
								</div>
							</div>

							<div className={imageFirst ? "" : "lg:order-1"}>
								<div className="mb-6 flex items-center gap-4">
									<IconTile icon={p.icon} accent={p.accent} variant="solid" />
									<div>
										<p className="text-xs font-bold uppercase tracking-widest text-(--accent)">Program Area</p>
										<h2 id={`${slug(p.area)}-heading`} className="font-serif text-3xl font-semibold text-brand-blue">
											{p.area}
										</h2>
									</div>
								</div>
								<p className="mb-6 text-base leading-relaxed text-body">{p.summary}</p>
								<CheckList items={p.highlights} color={p.accent} className="mb-8" />
								<Button to="/programs" variant="accent" trailingIcon={FiArrowRight}>
									Support This Program
								</Button>
							</div>
						</div>
					</Section>
				);
			})}

			{/* ── STATS ── */}
			<Section tone="navy">
				<SectionHeading size="md" theme="light" eyebrow="Our Numbers" eyebrowTone="light" title="What We've Done So Far" className="mb-14" />
				<ul className="grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
					{stats.map((s) => (
						<li key={s.label} className="flex flex-col items-center">
							<IconTile icon={s.icon} variant="glass" size="lg" className="mb-4" />
							<p className="mb-2 font-serif text-5xl font-semibold text-white">{s.val}</p>
							<p className="mb-1 text-base font-semibold text-white">{s.label}</p>
							<p className="text-sm text-white/60">{s.sub}</p>
						</li>
					))}
				</ul>
				<div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-2xl bg-white/8 p-8 md:flex-row">
					<div>
						<p className="mb-1 font-serif text-2xl font-semibold text-white">Your support helps the work continue.</p>
						<p className="text-sm text-white/70">Every donation helps cover real program costs.</p>
					</div>
					<Button to="/programs" size="lg" className="shrink-0 whitespace-nowrap">
						Give Support
					</Button>
				</div>
			</Section>
		</PageLayout>
	);
}
