import { useState } from "react";
import { FiAlertCircle, FiArrowRight, FiCheckCircle, FiHeart, FiLock, FiShield, FiUsers } from "react-icons/fi";
import DonationForm from "../components/forms/DonationForm";
import CtaBand from "../components/layout/CtaBand";
import PageHero from "../components/layout/PageHero";
import PageLayout from "../components/layout/PageLayout";
import Section, { Container } from "../components/layout/Section";
import { Badge } from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import CheckList from "../components/ui/CheckList";
import IconTile from "../components/ui/IconTile";
import Modal from "../components/ui/Modal";
import SectionHeading from "../components/ui/SectionHeading";
import { PAGES } from "../config/seo";

type Program = {
	id: string;
	title: string;
	badge?: { label: string; color: string };
	image: string;
	cost: string;
	description: string;
	includes: string[];
};

const programs: Program[] = [
	{
		id: "child",
		title: "Sponsor a Child",
		badge: { label: "Most Popular", color: "var(--color-brand-red)" },
		image: "/D-4231r_9.jpg",
		cost: "Any amount helps",
		description:
			"Sponsorship gives a vulnerable child a bright future. It covers school fees, meals, school uniforms, and scholastic materials. Children born into poverty who gain access to education are proven to break the poverty cycle and become successful independent adults. Their education can help their whole family escape the poverty trap, often for generations to come.",
		includes: [
			"Full school fees and learning materials",
			"Monthly healthcare checkups and medications",
			"Nutritious daily meals through our feeding program",
			"Mentorship and psycho-social support",
			"Quarterly progress reports to you",
		],
	},
	{
		id: "community",
		title: "Help a Community",
		image: "/IMG_0934.jpg",
		cost: "Any amount helps",
		description:
			"Sometimes the community needs emergency intervention, and there isn't time for long-term projects. Such cases include mudslides, flooding that destroys schools and homes, among other unforeseen disasters that demand immediate intervention.",
		includes: [
			"Borehole drilling and clean water access",
			"Community health center construction & equipment",
			"School building and infrastructure renovation",
			"Agribusiness training and farming cooperative support",
			"Project report with photos and clear updates",
		],
	},
	{
		id: "medical",
		title: "Medical Emergencies",
		badge: { label: "Urgent Need", color: "var(--color-brand-orange)" },
		image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80",
		cost: "Any amount helps",
		description:
			"Our Medical Response Fund is an initiative that gives you the ability to intervene in medical emergencies, helping especially children and single-parent households access medical treatment they couldn't otherwise afford.",
		includes: [
			"Emergency surgery and procedure funding",
			"Critical medications and post-op care",
			"Transport and logistics for urgent medical travel",
			"Family support during hospitalization",
			"Discharge and recovery follow-up care",
		],
	},
];

const trustItems = [
	{ icon: FiCheckCircle, label: "100% of donations fund programs", color: "var(--color-brand-green)" },
	{ icon: FiShield, label: "Non-profit Organisation", color: "var(--color-brand-blue)" },
	{ icon: FiUsers, label: "Transparent reporting to all donors", color: "var(--color-brand-orange)" },
];

const otherWays = [
	{
		title: "Bank Transfer",
		desc: "Send directly to our account. Contact us for bank details and a donation reference number.",
		action: "Get Bank Details",
	},
	{
		title: "Corporate Giving",
		desc: "Partner with us through CSR, matching gifts, or employee giving programs. We'll tailor a proposal for your company.",
		action: "Partner With Us",
	},
	{
		title: "In-Kind Donations",
		desc: "We accept medical supplies, educational materials, food items, and equipment for our field programs.",
		action: "Learn More",
	},
];

function DonateModal({ program, onClose }: { program: Program; onClose: () => void }) {
	return (
		<Modal
			labelledBy="donate-modal-title"
			onClose={onClose}
			className="max-w-4xl"
			header={
				<div className="flex items-center gap-3">
					<IconTile icon={FiHeart} accent="var(--color-brand-red)" size="sm" />
					<div>
						<p className="text-[11px] font-semibold uppercase tracking-widest text-brand-orange">Donate to this program</p>
						<h2 id="donate-modal-title" className="font-serif text-xl font-semibold leading-tight text-brand-blue">
							{program.title}
						</h2>
					</div>
					{program.badge && (
						<span className="ml-1 hidden sm:block">
							<Badge color={program.badge.color}>{program.badge.label}</Badge>
						</span>
					)}
				</div>
			}
		>
			<div className="flex flex-col lg:grid lg:h-full lg:max-h-[calc(90vh-5rem)] lg:grid-cols-[17rem_1fr]">
				<aside className="flex flex-col gap-5 bg-surface p-6 lg:overflow-y-auto">
					<p className="text-sm leading-relaxed text-body">{program.description}</p>
					<CheckList items={program.includes} size="sm" color="var(--color-brand-teal)" className="border-t border-line pt-4" />
					<p className="flex items-center gap-1.5 border-t border-line pt-4 text-[11px] text-brand-blue">
						<FiLock aria-hidden size={11} className="text-brand-teal" />
						Secure & encrypted
					</p>
				</aside>
				<DonationForm
					className="p-6 sm:p-8 lg:overflow-y-auto"
					submitIcon={FiHeart}
					submitLabel={<>Donate to {program.title}</>}
					footnote="By continuing you agree to our Terms of Service and Privacy Policy. Secure payment processing powered by Stripe."
				/>
			</div>
		</Modal>
	);
}

function ProgramCard({ program, onDonate }: { program: Program; onDonate: () => void }) {
	return (
		<article className="grid overflow-hidden rounded-2xl border border-line bg-white shadow-[0_18px_40px_-30px_rgba(32,68,135,0.6)] lg:grid-cols-2">
			<div className="relative min-h-72 lg:min-h-0">
				<img src={program.image} alt={program.title} loading="lazy" className="absolute inset-0 size-full object-cover" />
				<div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
				{program.badge && (
					<Badge color={program.badge.color} className="absolute left-5 top-5">
						{program.badge.label}
					</Badge>
				)}
				<div className="absolute inset-x-6 bottom-6">
					<h3 className="mb-1 font-serif text-2xl font-semibold text-white">{program.title}</h3>
					<p className="text-sm font-semibold text-white/80">{program.cost}</p>
				</div>
			</div>

			<div className="flex flex-col p-8">
				<p className="mb-6 text-sm leading-relaxed text-body">{program.description}</p>
				<CheckList items={program.includes} className="mb-8" />
				<div className="mt-auto flex flex-col gap-3 border-t border-line pt-6 sm:flex-row">
					<Button icon={FiHeart} onClick={onDonate} className="flex-1">
						Donate to This Program
					</Button>
					<Button to="/contact" variant="outline" trailingIcon={FiArrowRight}>
						Learn More
					</Button>
				</div>
			</div>
		</article>
	);
}

export default function ProgramsPage() {
	const [donateTarget, setDonateTarget] = useState<Program | null>(null);
	const medical = programs.find((p) => p.id === "medical")!;

	return (
		<PageLayout seo={PAGES.programs}>
			{donateTarget && <DonateModal program={donateTarget} onClose={() => setDonateTarget(null)} />}

			<PageHero
				image="/D-4231r_41.jpg"
				imageAlt="School children in uniform"
				eyebrow="Our Programs"
				title="Choose how you"
				highlight="give support."
				highlightLayout="inline"
				description="Every contribution, large or small, goes directly to program needs."
			/>

			{/* ── TRUST STRIP ── */}
			<div className="border-b border-line bg-white py-6">
				<Container>
					<ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:justify-between">
						{trustItems.map((item) => (
							<li key={item.label} className="flex items-center gap-2.5 text-sm font-semibold text-ink">
								<item.icon aria-hidden size={18} style={{ color: item.color }} />
								{item.label}
							</li>
						))}
					</ul>
				</Container>
			</div>

			{/* ── PROGRAM CARDS ── */}
			<Section tone="surface" containerClassName="flex flex-col gap-10">
				<SectionHeading
					size="md"
					eyebrow="Giving Options"
					title="Choose Your Program"
					intro="Pick the kind of support you want to give. Each program is tied to real needs in education, health, food, or community care."
					className="mb-4"
				/>
				{programs.map((p) => (
					<ProgramCard key={p.id} program={p} onDonate={() => setDonateTarget(p)} />
				))}
			</Section>

			{/* ── OTHER WAYS ── */}
			<Section>
				<SectionHeading size="md" eyebrow="Other Ways to Give" title="More Giving Options" className="mb-14" />
				<div className="grid gap-7 sm:grid-cols-3">
					{otherWays.map((c) => (
						<Card key={c.title} tone="surface" interactive className="flex flex-col">
							<h3 className="mb-3 font-serif text-xl font-semibold text-brand-blue">{c.title}</h3>
							<p className="mb-6 flex-1 text-sm leading-relaxed text-body">{c.desc}</p>
							<Button to="/contact" variant="link-red" trailingIcon={FiArrowRight} className="self-start text-sm">
								{c.action}
							</Button>
						</Card>
					))}
				</div>
			</Section>

			{/* ── URGENT APPEAL ── */}
			<CtaBand
				kicker={
					<p className="mb-5 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-orange">
						<FiAlertCircle aria-hidden size={20} />
						Urgent Appeal
					</p>
				}
				title="There are families waiting right now."
				description="Our Medical Emergency Fund is running low. A child may need surgery. A mother may need care. Gifts today go directly to urgent cases."
				actions={
					<Button size="lg" trailingIcon={FiArrowRight} onClick={() => setDonateTarget(medical)}>
						Give to Emergency Fund
					</Button>
				}
			/>
		</PageLayout>
	);
}
