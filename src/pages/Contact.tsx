import { lazy, Suspense, useState, type FormEvent } from "react";
import { FiArrowRight, FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { InputField, SelectField, TextareaField } from "../components/forms/Field";
import PageHero from "../components/layout/PageHero";
import PageLayout from "../components/layout/PageLayout";
import Section from "../components/layout/Section";
import Accordion from "../components/ui/Accordion";
import { Alert, SuccessMessage } from "../components/ui/Alert";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import IconTile from "../components/ui/IconTile";
import SectionHeading from "../components/ui/SectionHeading";
import SocialLinks from "../components/ui/SocialLinks";
import { PAGES } from "../config/seo";
import { SITE } from "../config/site";
import { useIsClient } from "../hooks/useIsClient";
import { useEmailForm } from "../hooks/useEmailForm";
import { faqJsonLd } from "../lib/structuredData";

const ContactMap = lazy(() => import("../components/contact/ContactMap"));

const faqs = [
	{
		question: "How do I know my donation reaches beneficiaries?",
		answer:
			"We share donor updates, program reports, and financial records. Each program tracks clear outputs, such as children supported, supplies delivered, or visits completed.",
	},
	{
		question: "Is Acts of Love a legitimate organisation?",
		answer:
			"Yes. Acts of Love Empowerment Foundation is a non-profit organisation based in Kampala, Uganda. We use funds responsibly and keep clear records for donors and partners.",
	},
	{
		question: "Can I visit your project sites?",
		answer:
			"We welcome donor and partner visits to our field programs. Contact us to schedule a supervised site visit with advance notice of at least 2 weeks.",
	},
	{
		question: "How quickly will I hear back after volunteering?",
		answer:
			"Our volunteer coordinator responds to applications within 48 business hours. The reply includes next steps and a brief onboarding questionnaire.",
	},
];

const contactDetails = [
	{ icon: FiMapPin, label: "Our Office", value: SITE.address.display },
	{ icon: FiMail, label: "Email Us", value: SITE.email, href: `mailto:${SITE.email}` },
	{ icon: FiPhone, label: "Call Us", value: "+256 740093081", href: SITE.phone.href },
	{ icon: FiClock, label: "Office Hours", value: "Mon - Fri: 8am - 5pm EAT" },
];

const SUBJECTS = ["General Enquiry", "Donation & Giving", "Volunteering", "Partnership Proposal", "Media & Press", "Other"];

const emptyForm = { name: "", email: "", subject: "", message: "" };

function ContactForm() {
	const [form, setForm] = useState(emptyForm);
	const { submit, error, sending, sent } = useEmailForm(
		"We couldn't send your message right now. Please try again shortly or email us directly.",
	);

	const update = (field: keyof typeof form) => (e: { target: { value: string } }) =>
		setForm({ ...form, [field]: e.target.value });

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const ok = await submit({ ...form, subject: form.subject || "General Enquiry" });
		if (ok) setForm(emptyForm);
	};

	if (sent) {
		return (
			<SuccessMessage title="Message Sent" className="h-full">
				Thank you for writing to us. Our team will respond to your message within 1-2 business days.
			</SuccessMessage>
		);
	}

	return (
		<Card className="shadow-sm">
			<h3 className="mb-6 font-serif text-2xl font-semibold text-brand-blue">Send Us a Message</h3>
			<form onSubmit={handleSubmit} className="flex flex-col gap-5">
				{error && <Alert>{error}</Alert>}
				<div className="grid gap-5 sm:grid-cols-2">
					<InputField label="Full Name *" required autoComplete="name" value={form.name} onChange={update("name")} placeholder="Your full name" />
					<InputField label="Email Address *" type="email" required autoComplete="email" value={form.email} onChange={update("email")} placeholder="your@email.com" />
				</div>
				<SelectField label="Subject" value={form.subject} onChange={update("subject")}>
					<option value="">Select a subject</option>
					{SUBJECTS.map((s) => (
						<option key={s}>{s}</option>
					))}
				</SelectField>
				<TextareaField
					label="Your Message *"
					required
					rows={5}
					value={form.message}
					onChange={update("message")}
					placeholder="Tell us how we can help..."
				/>
				<Button type="submit" size="lg" fullWidth disabled={sending} trailingIcon={FiArrowRight}>
					{sending ? "Sending..." : "Send Message"}
				</Button>
			</form>
		</Card>
	);
}

export default function ContactPage() {
	const isClient = useIsClient();

	return (
		<PageLayout seo={{ ...PAGES.contact, jsonLd: faqJsonLd(faqs) }}>
			<PageHero
				image="/D-4231r_39.jpg"
				imageAlt="Community impact"
				eyebrow="Contact Us"
				title="Reach Out to Our Team"
				highlight="We're Ready to Listen"
			/>

			{/* ── CONTACT INFO + FORM ── */}
			<Section containerClassName="grid gap-14 lg:grid-cols-5">
				<div className="lg:col-span-2">
					<SectionHeading
						align="left"
						size="md"
						eyebrow="Get In Touch"
						title="We're Here for You"
						intro="Questions about programs, donations, volunteering, or partnerships are welcome. Our team is ready to help."
						className="mb-10"
					/>

					<ul className="flex flex-col gap-6">
						{contactDetails.map((c) => (
							<li key={c.label} className="flex items-start gap-4">
								<IconTile icon={c.icon} size="sm" />
								<div>
									<p className="mb-0.5 text-xs font-bold uppercase tracking-widest text-muted">{c.label}</p>
									{c.href ? (
										<a href={c.href} className="text-sm font-medium text-ink transition-colors hover:text-brand-blue">
											{c.value}
										</a>
									) : (
										<p className="text-sm font-medium text-ink">{c.value}</p>
									)}
								</div>
							</li>
						))}
					</ul>

					<div className="mt-10 border-t border-line pt-10">
						<p className="mb-4 text-xs font-bold uppercase tracking-widest text-muted">Follow Us</p>
						<SocialLinks />
					</div>
				</div>

				<div className="lg:col-span-3">
					<ContactForm />
				</div>
			</Section>

			{/* ── MAP ── */}
			<section aria-label="Map" className="bg-white pb-20">
				<div className="mx-auto max-w-7xl px-6">
					<div className="relative z-0 h-[360px] overflow-hidden rounded-2xl border border-line bg-surface">
						{isClient && (
							<Suspense fallback={null}>
								<ContactMap />
							</Suspense>
						)}
					</div>
				</div>
			</section>

			{/* ── FAQ ── */}
			<Section tone="surface" width="narrow">
				<SectionHeading size="md" eyebrow="Questions" title="Common Questions" className="mb-12" />
				<Accordion items={faqs} />
			</Section>
		</PageLayout>
	);
}
