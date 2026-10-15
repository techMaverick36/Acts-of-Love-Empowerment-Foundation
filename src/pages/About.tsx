import { FiArrowRight, FiGlobe, FiShield, FiTarget, FiUsers } from "react-icons/fi";
import CtaBand from "../components/layout/CtaBand";
import PageHero from "../components/layout/PageHero";
import PageLayout from "../components/layout/PageLayout";
import Section from "../components/layout/Section";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import IconTile from "../components/ui/IconTile";
import SectionHeading from "../components/ui/SectionHeading";
import StatCallout from "../components/ui/StatCallout";
import { PAGES } from "../config/seo";
import { SITE } from "../config/site";

const principles = [
	{
		icon: FiUsers,
		title: "Participation and Ownership",
		desc: "Success depends on community involvement from the planning stages through to completion, to ensure that projects are appropriately managed after the organization hands over.",
		color: "var(--color-brand-blue)",
	},
	{
		icon: FiShield,
		title: "Equity and Social Justice",
		desc: "Growth must be fair, providing equal access to resources and opportunities regardless of gender, religion, age, or socioeconomic status.",
		color: "var(--color-brand-red)",
	},
	{
		icon: FiTarget,
		title: "Empowerment and Capacity Building",
		desc: "Providing the tools, skills, and knowledge necessary for communities to lead their own development rather than creating dependency.",
		color: "var(--color-brand-green)",
	},
	{
		icon: FiGlobe,
		title: "Transparency and Accountability",
		desc: "Maintaining open records of fund allocation and providing regular updates on progress, to build trust with both donors and beneficiaries for long-term survival.",
		color: "var(--color-brand-teal)",
	},
];

const milestones = [
	{
		date: "2026-01",
		year: "January 2026",
		event: "Foundation established in Kampala, Uganda, with a focus on community health and education.",
	},
	{
		date: "2026-04",
		year: "April 2026 – First Outreach Mission",
		event:
			"Acts of Love Empowerment Foundation conducted its first mission at the Police Children School in Kibuli, Wakiso District. During this outreach, 50 students received essential scholastic materials, including exercise books, pens, pencils, mathematical sets, and other learning supplies to support their daily classroom studies and academic success.",
	},
	{
		date: "2026-06",
		year: "June 2026 – Community Food Support Initiative",
		event:
			"As part of our mission to promote healthy eating and improve household nutrition, Acts of Love Empowerment Foundation provided grocery support to 80 families across Kibuli and Zzana-Nfuufu. Each family received a food basket containing 2 kilograms of meat and 1 kilogram of rice, helping to enhance access to nutritious meals within their homes.",
	},
];

/** Whole months since the founding month, e.g. "9 months". */
function getMonthsActive() {
	const [foundedYear, foundedMonth] = SITE.foundingDate.split("-").map(Number);
	const now = new Date();
	const months = (now.getFullYear() - foundedYear) * 12 + (now.getMonth() + 1 - foundedMonth);
	return months <= 1 ? "1 month" : `${months} months`;
}

export default function AboutPage() {
	const monthsActive = getMonthsActive();

	return (
		<PageLayout seo={PAGES.about}>
			<PageHero
				image="/D-4231r_52.jpg"
				imageAlt="Acts of Love Foundation team"
				eyebrow="About Acts of Love"
				title="Serving Families With"
				highlight="Care and Consistency"
				description="We work with communities in Uganda on education, health, inclusion, and practical family support."
			/>

			{/* ── OUR STORY ── */}
			<Section>
				<div className="grid items-center gap-12 md:gap-20 lg:grid-cols-2">
					<div>
						<SectionHeading align="left" size="md" eyebrow="Our Story" title="Started With a Desire to Serve" />
						<div className="mb-8 mt-6 space-y-4 text-base leading-relaxed text-body">
							<p>
								Acts of Love Empowerment Foundation is an organization committed to improving people's lives
								through Education, Inclusive support, and Sustainable development.
							</p>
							<p>
								Our work starts with listening. Communities help shape the programs they receive, and we report
								clearly to donors while treating every person we serve with respect.
							</p>
						</div>
						<Button to="/impact" variant="secondary" trailingIcon={FiArrowRight}>
							See Our Work
						</Button>
					</div>
					<div className="relative mt-8 lg:mt-0">
						<img
							src="/D-4231r_37.jpg"
							alt="Acts of Love Foundation distributing to children"
							loading="lazy"
							className="aspect-[4/3] w-full rounded-2xl object-cover shadow-2xl lg:aspect-auto lg:h-[460px]"
						/>
						<StatCallout
							value={monthsActive}
							label="of purposeful service"
							note="Est. 2026 · Kampala, Uganda"
							className="-bottom-6 left-0 hidden max-w-[220px] sm:block md:-left-6"
						/>
					</div>
				</div>
			</Section>

			{/* ── OUR PRINCIPLES ── */}
			<Section id="principles" tone="surface">
				<SectionHeading
					size="md"
					eyebrow="What Guides Us"
					title="Our Principles"
					intro="These principles guide our decisions, our programs, and the way we treat people."
					className="mb-14"
				/>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{principles.map((p) => (
						<Card key={p.title} interactive>
							<IconTile icon={p.icon} accent={p.color} className="mb-5" />
							<h3 className="mb-3 font-serif text-xl font-semibold text-brand-blue">{p.title}</h3>
							<p className="text-sm leading-relaxed text-body">{p.desc}</p>
						</Card>
					))}
				</div>
			</Section>

			{/* ── TIMELINE ── */}
			<Section width="medium">
				<SectionHeading size="md" eyebrow="Our Timeline" title={`${monthsActive} of Service`} className="mb-14" />
				<ol className="relative flex flex-col gap-10">
					<span aria-hidden className="absolute bottom-0 left-6 top-0 w-px bg-line md:left-1/2" />
					{milestones.map((m, i) => (
						<li
							key={m.year}
							className={`relative flex items-start gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
						>
							<div className={`flex-1 pl-14 md:pl-0 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
								<article className="inline-block max-w-[340px] rounded-xl border border-line bg-white p-5 text-left shadow-sm">
									<h3 className="mb-1 font-serif text-xl font-semibold text-brand-blue">
										<time dateTime={m.date}>{m.year}</time>
									</h3>
									<p className="text-sm leading-relaxed text-body">{m.event}</p>
								</article>
							</div>
							<span
								aria-hidden
								className="absolute left-3.5 mt-4 size-5 shrink-0 rounded-full border-4 border-white bg-brand-blue shadow-sm md:left-1/2 md:-translate-x-1/2"
							/>
							<div className="hidden flex-1 md:block" />
						</li>
					))}
				</ol>
			</Section>

			<CtaBand
				image={{ src: "/IMG_0934.jpg", alt: "Acts of Love Foundation community outreach" }}
				title="Join the Work"
				description="Your gift, time, or partnership can help a child stay in school, a family reach care, or a community receive practical support."
				actions={
					<>
						<Button to="/donate" size="lg" trailingIcon={FiArrowRight}>
							Donate
						</Button>
						<Button to="/get-involved" variant="outline-light" size="lg" trailingIcon={FiArrowRight}>
							Get Involved
						</Button>
					</>
				}
			/>
		</PageLayout>
	);
}
