import { useState, type FormEvent } from "react";
import { FiArrowRight, FiCheckCircle, FiClock, FiGlobe, FiMail, FiSmile, FiUsers } from "react-icons/fi";
import { InputField, SelectField, TextareaField } from "../components/forms/Field";
import CtaBand from "../components/layout/CtaBand";
import PageHero from "../components/layout/PageHero";
import PageLayout from "../components/layout/PageLayout";
import Section from "../components/layout/Section";
import { Alert, SuccessMessage } from "../components/ui/Alert";
import { Tag } from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import IconTile from "../components/ui/IconTile";
import SectionHeading from "../components/ui/SectionHeading";
import StatCallout from "../components/ui/StatCallout";
import { PAGES } from "../config/seo";
import { useEmailForm } from "../hooks/useEmailForm";

const roles = [
	{
		title: "Community Health Volunteer",
		commitment: "Weekends",
		location: "Field / On-site",
		desc: "Support mobile clinics, health screenings, and community sensitization campaigns in assigned communities.",
	},
	{
		title: "Education Mentor",
		commitment: "2 hrs/week",
		location: "Field or Remote",
		desc: "Mentor sponsored children and scholarship students through academic support, career guidance, and life skills.",
	},
	{
		title: "Admin & Communications",
		commitment: "Flexible",
		location: "Remote",
		desc: "Help with social media, reports, newsletters, donor communications, and general office support.",
	},
	{
		title: "Fundraising & Events",
		commitment: "Project-based",
		location: "On-site or Remote",
		desc: "Organize fundraising events, donor drives, and community awareness work for the foundation.",
	},
	{
		title: "Legal & Advocacy Pro Bono",
		commitment: "Case-based",
		location: "Remote / Kampala",
		desc: "Provide legal support, policy advocacy, and rights-based counselling for beneficiaries and the organization.",
	},
	{
		title: "Finance & Audit Support",
		commitment: "Quarterly",
		location: "Remote",
		desc: "Assist with financial review, grant reporting, bookkeeping, and compliance documentation.",
	},
];

const perks = [
	{
		icon: FiClock,
		title: "Flexible Commitment",
		desc: "Choose hours that fit your life, including weekends, evenings, or full-time field work.",
	},
	{
		icon: FiGlobe,
		title: "Different Ways to Help",
		desc: "Serve in field programs, admin roles, or remote support, depending on where you are.",
	},
	{
		icon: FiSmile,
		title: "Close-Up Service",
		desc: "Volunteer time goes into real work: visits, mentoring, reporting, events, and care.",
	},
	{
		icon: FiUsers,
		title: "Strong Community",
		desc: "Join volunteers who care about children, families, and practical community support.",
	},
	{
		icon: FiCheckCircle,
		title: "Certificates & References",
		desc: "Receive official volunteer certificates and character references.",
	},
	{
		icon: FiMail,
		title: "Ongoing Support",
		desc: "Our team provides training and support for every volunteer role.",
	},
];

const emptyForm = { name: "", email: "", phone: "", role: "", message: "" };

function VolunteerForm() {
	const [form, setForm] = useState(emptyForm);
	const { submit, error, sending, sent } = useEmailForm(
		"We couldn't send your application right now. Please try again in a moment or contact us directly.",
	);

	const update = (field: keyof typeof form) => (e: { target: { value: string } }) =>
		setForm({ ...form, [field]: e.target.value });

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const ok = await submit({ ...form, role: form.role || "Not specified" });
		if (ok) setForm(emptyForm);
	};

	if (sent) {
		return (
			<SuccessMessage title="Application Received!">
				Thank you for your interest. Our volunteer coordinator will be in touch within 48 hours.
			</SuccessMessage>
		);
	}

	return (
		<Card as="div" className="shadow-sm">
			<form onSubmit={handleSubmit} className="flex flex-col gap-5">
				{error && <Alert>{error}</Alert>}
				<div className="grid gap-5 sm:grid-cols-2">
					<InputField label="Full Name *" required autoComplete="name" value={form.name} onChange={update("name")} placeholder="e.g. Jane Doe" />
					<InputField label="Email Address *" type="email" required autoComplete="email" value={form.email} onChange={update("email")} placeholder="your@email.com" />
				</div>
				<div className="grid gap-5 sm:grid-cols-2">
					<InputField label="Phone Number" type="tel" autoComplete="tel" value={form.phone} onChange={update("phone")} placeholder="+256 ..." />
					<SelectField label="Role of Interest" value={form.role} onChange={update("role")}>
						<option value="">Select a role</option>
						{roles.map((r) => (
							<option key={r.title} value={r.title}>
								{r.title}
							</option>
						))}
					</SelectField>
				</div>
				<TextareaField
					label="Why do you want to volunteer?"
					rows={4}
					value={form.message}
					onChange={update("message")}
					placeholder="Tell us a little about yourself and why this work matters to you..."
				/>
				<Button type="submit" size="lg" fullWidth disabled={sending} trailingIcon={FiArrowRight}>
					{sending ? "Sending..." : "Submit Application"}
				</Button>
			</form>
		</Card>
	);
}

export default function GetInvolvedPage() {
	return (
		<PageLayout seo={PAGES.getInvolved}>
			<PageHero
				image="/D-4231r_17.jpg"
				imageAlt="Volunteers sorting school supplies for distribution"
				eyebrow="Get Involved"
				title="Give Time, Skill, or Support"
				highlight="Where It Is Needed"
			/>

			{/* ── VOLUNTEER INTRO ── */}
			<Section id="volunteer" tone="surface">
				<div className="grid items-center gap-16 lg:grid-cols-2">
					<div>
						<SectionHeading
							align="left"
							size="md"
							eyebrow="Volunteer"
							title={
								<>
									Volunteer Your Time, <span className="text-brand-red">Help a Family</span>
								</>
							}
						/>
						<div className="mt-6 space-y-4 text-base leading-relaxed text-body">
							<p>
								Have you got time, energy, or expertise to share? Volunteers make an enormous contribution to our
								work. There are many ways you can make a difference as we work together to improve the lives of
								vulnerable communities around the world.
							</p>
							<p>
								Our volunteers can choose from various projects to ensure their interests and strengths are best
								utilized during their time with Acts of Love Empowerment Foundation. Email us at
								info@actsofloveempowermentfoundation.org to find your team.
							</p>
						</div>
					</div>
					<div className="relative">
						<img
							src="/D-4231r_22.jpg"
							alt="Acts of Love volunteer with children"
							loading="lazy"
							className="h-80 w-full rounded-2xl object-cover md:h-[400px]"
						/>
						<StatCallout value="5+" label="Active Volunteers" className="-bottom-5 -right-2 md:-right-5" />
					</div>
				</div>
			</Section>

			{/* ── PERKS ── */}
			<Section>
				<SectionHeading size="md" eyebrow="Volunteer Support" title="What Volunteers Receive" className="mb-14" />
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{perks.map((p) => (
						<Card key={p.title} tone="surface">
							<IconTile icon={p.icon} variant="solid" size="sm" className="mb-4" />
							<h3 className="mb-2 font-sans text-base font-semibold text-ink">{p.title}</h3>
							<p className="text-sm leading-relaxed text-body">{p.desc}</p>
						</Card>
					))}
				</div>
			</Section>

			{/* ── OPEN ROLES ── */}
			<Section tone="surface">
				<SectionHeading size="md" eyebrow="Open Volunteer Roles" title="Find a Volunteer Role" className="mb-14" />
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{roles.map((r) => (
						<Card key={r.title} as="article" interactive className="flex flex-col">
							<h3 className="mb-3 font-serif text-lg font-semibold text-brand-blue">{r.title}</h3>
							<p className="mb-5 flex-1 text-sm leading-relaxed text-body">{r.desc}</p>
							<div className="flex flex-wrap gap-2 border-t border-line pt-4">
								<Tag>{r.commitment}</Tag>
								<Tag tone="green">{r.location}</Tag>
							</div>
						</Card>
					))}
				</div>
			</Section>

			{/* ── SIGN UP FORM ── */}
			<Section width="narrow">
				<SectionHeading
					size="md"
					eyebrow="Apply Now"
					title="Become a Volunteer"
					intro="Fill in the form below. We'll reach out within 48 hours with next steps."
					className="mb-12"
				/>
				<VolunteerForm />
			</Section>

			{/* ── PARTNERSHIP ── */}
			<CtaBand
				id="partnerships"
				eyebrow="Partnerships"
				title="Partner With Us"
				description="We are keen to initiate partnerships with organizations that share our ambition. Together we can empower communities, improve projects, and strengthen relationships. Talk to a member of our team if our values and goals align with your Corporate Social Responsibilities and strategies."
				actions={
					<Button to="/contact" variant="outline-light" size="lg" trailingIcon={FiArrowRight}>
						Discuss Partnership
					</Button>
				}
			/>
		</PageLayout>
	);
}
