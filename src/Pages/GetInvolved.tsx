import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import {
	FiClock,
	FiGlobe,
	FiSmile,
	FiCheckCircle,
	FiArrowRight,
	FiUsers,
	FiMail,
} from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

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
		desc: "Organize fundraising events, donor drives, and community awareness campaigns for the foundation.",
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
		desc: "Choose your own hours — weekends, evenings, or full-time deployments.",
	},
	{
		icon: FiGlobe,
		title: "National Reach",
		desc: "Serve in field programs, admin roles, or remote support — wherever you are.",
	},
	{
		icon: FiSmile,
		title: "Real Impact",
		desc: "You'll see, hear, and feel the difference your time makes in real lives.",
	},
	{
		icon: FiUsers,
		title: "Strong Community",
		desc: "Join a growing network of like-minded volunteers committed to change.",
	},
	{
		icon: FiCheckCircle,
		title: "Certificates & References",
		desc: "Receive official volunteer certificates and character references.",
	},
	{
		icon: FiMail,
		title: "Ongoing Support",
		desc: "Our team provides training, tools, and support for every volunteer role.",
	},
];

export default function GetInvolvedPage() {
	const [form, setForm] = useState({
		name: "",
		email: "",
		phone: "",
		role: "",
		message: "",
	});
	const [submitted, setSubmitted] = useState(false);
	const [sending, setSending] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { hash } = useLocation();

	useEffect(() => {
		if (hash) {
			const el = document.querySelector(hash);
			if (el) {
				setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
			}
		}
	}, [hash]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setError(null);
		setSending(true);

		// Read EmailJS credentials from Vite env
		const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
		const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
		const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

		if (!serviceId || !templateId || !publicKey) {
			setSending(false);
			setError(
				"Email service is not configured. Please add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY to your .env file."
			);
			return;
		}

		try {
			await emailjs.send(
				serviceId,
				templateId,
				{
					name: form.name,
					email: form.email,
					phone: form.phone,
					role: form.role || "Not specified",
					message: form.message,
				},
				{ publicKey }
			);

			setSubmitted(true);
			setForm({ name: "", email: "", phone: "", role: "", message: "" });
		} catch (err) {
			setError(
				`Error: ${err}We couldn't send your application right now. Please try again in a moment or contact us directly.`
			);
		} finally {
			setSending(false);
		}
	};

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
					<p className="uppercase tracking-[0.3em] text-xs mb-4 font-semibold text-[#F26421]">
						Change A Life
					</p>
					<h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
						Get Involved
						<span className="block text-[#639E90]">To Save a Life</span>
					</h1>
				</div>
			</section>

			{/* ── VOLUNTEER INTRO ── */}
			<section id="volunteer" className="py-20 scroll-mt-28" style={{ backgroundColor: "#eef3fb" }}>
				<div className="max-w-7xl mx-auto px-6">
					<div className="grid lg:grid-cols-2 gap-16 items-center">
						<div>
							<p
								className="text-sm font-semibold tracking-widest uppercase mb-4"
								style={{ color: "#D91E26" }}
							>
								Volunteer
							</p>
							<h2
								className="font-serif text-4xl font-bold mb-5"
								style={{ color: "#204487" }}
							>
								Volunteer Your Time,{" "}
								<span style={{ color: "#D91E26" }}>Change a Life</span>
							</h2>
							<p
								className="text-base leading-relaxed mb-4"
								style={{ color: "#4a4a4a" }}
							>
								You don't need to have money to make a difference. Your skills,
								time, and passion are the most powerful things you can offer.
								Join our growing team of volunteers already making their mark across
								Uganda.
							</p>
							<p
								className="text-base leading-relaxed"
								style={{ color: "#4a4a4a" }}
							>
								Whether you're a healthcare professional, teacher, lawyer,
								communications expert, or simply someone with time and heart
								there is a meaningful role waiting for you here.
							</p>
						</div>
						<div className="relative">
							<img
								src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80"
								alt="Volunteers at work"
								className="rounded-2xl w-full object-cover"
								style={{ height: 400 }}
							/>
							<div className="absolute -bottom-5 -right-5 bg-white rounded-2xl p-5 shadow-lg border border-blue-100">
								<p
									className="font-serif font-bold text-3xl"
									style={{ color: "#204487" }}
								>
									5+
								</p>
								<p
									className="text-sm font-medium mt-0.5"
									style={{ color: "#1D1E1F" }}
								>
									Active Volunteers
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ── PERKS ── */}
			<section className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center max-w-xl mx-auto mb-14">
						<p
							className="text-sm font-semibold tracking-widest uppercase mb-3"
							style={{ color: "#D91E26" }}
						>
							What You Get
						</p>
						<h2
							className="font-serif text-4xl font-bold"
							style={{ color: "#204487" }}
						>
							Why Volunteer With Us
						</h2>
					</div>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{perks.map((p) => {
							const Icon = p.icon;
							return (
								<div
									key={p.title}
									className="rounded-2xl p-7 border border-blue-100"
									style={{ backgroundColor: "#eef3fb" }}
								>
									<div
										className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
										style={{ backgroundColor: "#204487" }}
									>
										<Icon size={18} className="text-white" />
									</div>
									<h3
										className="font-semibold text-base mb-2"
										style={{ color: "#1D1E1F" }}
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

			{/* ── OPEN ROLES ── */}
			<section className="py-20" style={{ backgroundColor: "#eef3fb" }}>
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center max-w-xl mx-auto mb-14">
						<p
							className="text-sm font-semibold tracking-widest uppercase mb-3"
							style={{ color: "#D91E26" }}
						>
							Open Volunteer Roles
						</p>
						<h2
							className="font-serif text-4xl font-bold"
							style={{ color: "#204487" }}
						>
							Find Your Volunteer Role
						</h2>
					</div>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
						{roles.map((r) => (
							<div
								key={r.title}
								className="bg-white rounded-2xl p-7 border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
							>
								<h3
									className="font-serif text-lg font-bold mb-3"
									style={{ color: "#204487" }}
								>
									{r.title}
								</h3>
								<p
									className="text-sm leading-relaxed mb-4"
									style={{ color: "#4a4a4a" }}
								>
									{r.desc}
								</p>
								<div className="flex flex-wrap gap-2 pt-4 border-t border-blue-50">
									<span
										className="text-xs font-medium px-3 py-1 rounded-full"
										style={{ backgroundColor: "#eef3fb", color: "#204487" }}
									>
										⏱ {r.commitment}
									</span>
									<span
										className="text-xs font-medium px-3 py-1 rounded-full"
										style={{ backgroundColor: "#f0faf4", color: "#00A54F" }}
									>
										📍 {r.location}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── SIGN UP FORM ── */}
			<section className="py-20 bg-white">
				<div className="max-w-3xl mx-auto px-6">
					<div className="text-center mb-12">
						<p
							className="text-sm font-semibold tracking-widest uppercase mb-3"
							style={{ color: "#D91E26" }}
						>
							Apply Now
						</p>
						<h2
							className="font-serif text-4xl font-bold"
							style={{ color: "#204487" }}
						>
							Become a Volunteer
						</h2>
						<p className="mt-3 text-base" style={{ color: "#4a4a4a" }}>
							Fill in the form below. We'll reach out within 48 hours with next
							steps.
						</p>
					</div>

					{submitted ? (
						<div
							className="rounded-2xl p-12 text-center border border-blue-100"
							style={{ backgroundColor: "#eef3fb" }}
						>
							<div
								className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
								style={{ backgroundColor: "#00A54F" }}
							>
								<FiCheckCircle size={30} className="text-white" />
							</div>
							<h3
								className="font-serif text-2xl font-bold mb-3"
								style={{ color: "#204487" }}
							>
								Application Received!
							</h3>
							<p className="text-base" style={{ color: "#4a4a4a" }}>
								Thank you for your interest. Our volunteer coordinator will be
								in touch within 48 hours.
							</p>
						</div>
					) : (
 					<form
 						onSubmit={handleSubmit}
 						className="bg-white rounded-2xl p-8 border border-blue-100 shadow-sm flex flex-col gap-5"
 					>
 						{error && (
 							<div
 								className="text-sm p-3 rounded-md border"
 								style={{ backgroundColor: "#fff5f5", borderColor: "#fecaca", color: "#991b1b" }}
 							>
 								{error}
 							</div>
 						)}
							<div className="grid sm:grid-cols-2 gap-5">
								<div>
									<label
										className="block text-sm font-semibold mb-1.5"
										style={{ color: "#1D1E1F" }}
									>
										Full Name *
									</label>
									<input
										required
										value={form.name}
										onChange={(e) => setForm({ ...form, name: e.target.value })}
										className="w-full border-2 rounded-lg px-4 py-2.5 text-sm outline-none transition-colors"
										style={{ borderColor: "#e2e8f0" }}
										placeholder="e.g. Jane Doe"
									/>
								</div>
								<div>
									<label
										className="block text-sm font-semibold mb-1.5"
										style={{ color: "#1D1E1F" }}
									>
										Email Address *
									</label>
									<input
										required
										type="email"
										value={form.email}
										onChange={(e) =>
											setForm({ ...form, email: e.target.value })
										}
										className="w-full border-2 rounded-lg px-4 py-2.5 text-sm outline-none transition-colors"
										style={{ borderColor: "#e2e8f0" }}
										placeholder="your@email.com"
									/>
								</div>
							</div>
							<div className="grid sm:grid-cols-2 gap-5">
								<div>
									<label
										className="block text-sm font-semibold mb-1.5"
										style={{ color: "#1D1E1F" }}
									>
										Phone Number
									</label>
									<input
										value={form.phone}
										onChange={(e) =>
											setForm({ ...form, phone: e.target.value })
										}
										className="w-full border-2 rounded-lg px-4 py-2.5 text-sm outline-none"
										style={{ borderColor: "#e2e8f0" }}
										placeholder="+256 ..."
									/>
								</div>
								<div>
									<label
										className="block text-sm font-semibold mb-1.5"
										style={{ color: "#1D1E1F" }}
									>
										Role of Interest
									</label>
									<select
										value={form.role}
										onChange={(e) => setForm({ ...form, role: e.target.value })}
										className="w-full border-2 rounded-lg px-4 py-2.5 text-sm outline-none bg-white"
										style={{ borderColor: "#e2e8f0", color: "#4a4a4a" }}
									>
										<option value="">Select a role</option>
										{roles.map((r) => (
											<option key={r.title} value={r.title}>
												{r.title}
											</option>
										))}
									</select>
								</div>
							</div>
							<div>
								<label
									className="block text-sm font-semibold mb-1.5"
									style={{ color: "#1D1E1F" }}
								>
									Why do you want to volunteer?
								</label>
								<textarea
									rows={4}
									value={form.message}
									onChange={(e) =>
										setForm({ ...form, message: e.target.value })
									}
									className="w-full border-2 rounded-lg px-4 py-3 text-sm outline-none resize-none"
									style={{ borderColor: "#e2e8f0" }}
									placeholder="Tell us a little about yourself and your motivation..."
								/>
							</div>
 						<button
 							type="submit"
 							disabled={sending}
 							className="w-full py-3.5 text-sm font-semibold text-white rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
 							style={{ backgroundColor: "#D91E26" }}
 						>
 							{sending ? "Sending..." : "Submit Application"} <FiArrowRight size={15} />
 						</button>
 					</form>
					)}
				</div>
			</section>

			{/* ── PARTNERSHIP ── */}
			<section id="partnerships" className="py-24 scroll-mt-24" style={{ backgroundColor: "#08415C" }}>
				<div className="max-w-4xl mx-auto px-6 text-center">
					{/* Decorative line */}
					<div className="flex justify-center mb-6">
						<span className="h-px w-16 bg-[#639E90]"></span>
					</div>
					<p
						className="text-sm font-semibold tracking-widest uppercase mb-5"
						style={{ color: "#639E90" }}
					>
						Partnerships
					</p>
					<h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
						Become an Organisational Partner
					</h2>
					<p
						className="text-base md:text-lg leading-relaxed mb-12 max-w-2xl mx-auto"
						style={{ color: "rgba(255,255,255,0.75)" }}
					>
						We're looking for organizations that share our vision. Whether through
						funding, capacity building, or shared advocacy — let's create
						lasting impact together.
					</p>
					<a
						href="mailto:actsofloveempowerment@gmail.com"
						className="inline-flex items-center gap-2 px-10 py-4 text-base font-semibold rounded-lg border-2 border-white/50 text-white hover:bg-white hover:text-[#08415C] transition-all duration-300"
					>
						Discuss Partnership <FiArrowRight size={18} />
					</a>
				</div>
			</section>
			<Footer />
		</div>
	);
}
