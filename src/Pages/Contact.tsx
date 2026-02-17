import { useState } from "react";
import {
	FiMail,
	FiPhone,
	FiMapPin,
	FiCheckCircle,
	FiArrowRight,
	FiClock,
	FiFacebook,
	FiTwitter,
	FiInstagram,
} from "react-icons/fi";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaMapPin } from "react-icons/fa";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { FaMap } from "react-icons/fa6";

const faqs = [
	{
		q: "How do I know my donation reaches beneficiaries?",
		a: "We publish annual impact reports, quarterly donor updates, and maintain a transparent financial audit process. Every program has measurable output metrics we report publicly.",
	},
	{
		q: "Is Acts of Love a registered NGO?",
		a: "Yes. We are a registered non-governmental organization with the Corporate Affairs Commission (CAC) in Nigeria, and hold a valid tax exemption certificate.",
	},
	{
		q: "Can I visit your project sites?",
		a: "We welcome donor and partner visits to our field programs. Contact us to schedule a supervised site visit with advance notice of at least 2 weeks.",
	},
	{
		q: "How quickly will I hear back after volunteering?",
		a: "Our volunteer coordinator responds to all applications within 48 business hours. You'll receive an email with next steps and a brief onboarding questionnaire.",
	},
];

export default function ContactPage() {
	const [form, setForm] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
	const [submitted, setSubmitted] = useState(false);
	const [openFaq, setOpenFaq] = useState<number | null>(null);

	const handleSubmit = (e: any) => {
		e.preventDefault();
		setSubmitted(true);
	};
	const position: [number, number] = [0.32678913755996225, 32.564701286507834];

	const customMarkerIcon = L.divIcon({
		html: renderToStaticMarkup(<FaMapPin size={30} color="#D91E26" />),
		iconSize: [30, 30],
		iconAnchor: [15, 30],
		className: "bg-transparent",
	});

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
						Contact Us
					</p>
					<h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
						Let Us Hear From You
						<span className="block text-[#639E90]">Save Lives Together</span>
					</h1>
				</div>
			</section>

			{/* ── CONTACT INFO + FORM ── */}
			<section className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-5 gap-14">
					{/* Left: Info */}
					<div className="lg:col-span-2">
						<p
							className="text-sm font-semibold tracking-widest uppercase mb-4"
							style={{ color: "#D91E26" }}
						>
							Get In Touch
						</p>
						<h2
							className="font-serif text-3xl font-bold mb-5"
							style={{ color: "#204487" }}
						>
							We're Here for You
						</h2>
						<p
							className="text-base leading-relaxed mb-10"
							style={{ color: "#4a4a4a" }}
						>
							Whether you have a question about programs, want to make a
							donation, or are interested in volunteering or partnering — our
							team is ready to help.
						</p>

						<div className="flex flex-col gap-6">
							{[
								{
									icon: FiMapPin,
									label: "Our Office",
									value: "kampala, uganda",
									href: null,
								},
								{
									icon: FiMail,
									label: "Email Us",
									value: "info@actsoflove.org",
									href: "mailto:info@actsoflove.org",
								},
								{
									icon: FiPhone,
									label: "Call Us",
									value: "+234 800 000 0000",
									href: "tel:+2348000000000",
								},
								{
									icon: FiClock,
									label: "Office Hours",
									value: "Mon – Fri: 8am – 5pm EAT",
									href: null,
								},
							].map((c) => {
								const Icon = c.icon;
								return (
									<div key={c.label} className="flex items-start gap-4">
										<div
											className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
											style={{ backgroundColor: "#eef3fb" }}
										>
											<Icon size={17} style={{ color: "#204487" }} />
										</div>
										<div>
											<p
												className="text-xs font-bold uppercase tracking-widest mb-0.5"
												style={{ color: "#888" }}
											>
												{c.label}
											</p>
											{c.href ? (
												<a
													href={c.href}
													className="text-sm font-medium hover:text-blue-700 transition-colors"
													style={{ color: "#1D1E1F" }}
												>
													{c.value}
												</a>
											) : (
												<p
													className="text-sm font-medium"
													style={{ color: "#1D1E1F" }}
												>
													{c.value}
												</p>
											)}
										</div>
									</div>
								);
							})}
						</div>

						{/* Social */}
						<div className="mt-10 pt-10 border-t border-gray-100">
							<p
								className="text-xs font-bold uppercase tracking-widest mb-4"
								style={{ color: "#888" }}
							>
								Follow Us
							</p>
							<div className="flex gap-3">
								{[
									{ Icon: FiFacebook, label: "Facebook" },
									{ Icon: FiTwitter, label: "Twitter" },
									{ Icon: FiInstagram, label: "Instagram" },
								].map(({ Icon, label }) => (
									<a
										key={label}
										href="#"
										className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:text-white"
										style={{ backgroundColor: "#eef3fb", color: "#204487" }}
										onMouseEnter={(e) => {
											e.currentTarget.style.backgroundColor = "#204487";
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.backgroundColor = "#eef3fb";
											e.currentTarget.style.color = "#204487";
										}}
									>
										<Icon size={16} />
									</a>
								))}
							</div>
						</div>
					</div>

					{/* Right: Form */}
					<div className="lg:col-span-3">
						{submitted ? (
							<div
								className="rounded-2xl p-12 text-center border border-blue-100"
								style={{ backgroundColor: "#eef3fb", height: "100%" }}
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
									Message Sent!
								</h3>
								<p className="text-base" style={{ color: "#4a4a4a" }}>
									Thank you for reaching out. Our team will respond to your
									message within 1–2 business days.
								</p>
							</div>
						) : (
							<div className="bg-white rounded-2xl p-8 border border-blue-100 shadow-sm">
								<h3
									className="font-serif text-2xl font-bold mb-6"
									style={{ color: "#204487" }}
								>
									Send Us a Message
								</h3>
								<form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
												onChange={(e) =>
													setForm({ ...form, name: e.target.value })
												}
												className="w-full border-2 rounded-lg px-4 py-2.5 text-sm outline-none"
												style={{ borderColor: "#e2e8f0" }}
												placeholder="Your full name"
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
												className="w-full border-2 rounded-lg px-4 py-2.5 text-sm outline-none"
												style={{ borderColor: "#e2e8f0" }}
												placeholder="your@email.com"
											/>
										</div>
									</div>
									<div>
										<label
											className="block text-sm font-semibold mb-1.5"
											style={{ color: "#1D1E1F" }}
										>
											Subject
										</label>
										<select
											value={form.subject}
											onChange={(e) =>
												setForm({ ...form, subject: e.target.value })
											}
											className="w-full border-2 rounded-lg px-4 py-2.5 text-sm outline-none bg-white"
											style={{ borderColor: "#e2e8f0", color: "#4a4a4a" }}
										>
											<option value="">Select a subject</option>
											<option>General Enquiry</option>
											<option>Donation & Giving</option>
											<option>Volunteering</option>
											<option>Partnership Proposal</option>
											<option>Media & Press</option>
											<option>Other</option>
										</select>
									</div>
									<div>
										<label
											className="block text-sm font-semibold mb-1.5"
											style={{ color: "#1D1E1F" }}
										>
											Your Message *
										</label>
										<textarea
											required
											rows={5}
											value={form.message}
											onChange={(e) =>
												setForm({ ...form, message: e.target.value })
											}
											className="w-full border-2 rounded-lg px-4 py-3 text-sm outline-none resize-none"
											style={{ borderColor: "#e2e8f0" }}
											placeholder="Tell us how we can help..."
										/>
									</div>
									<button
										type="submit"
										className="w-full py-3.5 text-sm font-semibold text-white rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
										style={{ backgroundColor: "#D91E26" }}
									>
										Send Message <FiArrowRight size={15} />
									</button>
								</form>
							</div>
						)}
					</div>
				</div>
			</section>

			{/* ── MAP PLACEHOLDER ── */}
			<section className="bg-white pb-20">
				<div className="max-w-7xl mx-auto px-6">
					<div
						className="rounded-2xl overflow-hidden"
						style={{
							height: 360,
							backgroundColor: "#eef3fb",
							border: "1px solid #dce8f8",
						}}
					>
						<MapContainer
							center={position}
							zoom={13}
							scrollWheelZoom={false}
							style={{ height: "100%", width: "100%" }}
						>
							<TileLayer
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							/>
							<Marker position={position} icon={customMarkerIcon}>
								<Popup>
									Act of Love Empowerment Foundation <br /> Kampala, Uganda.
									{position[0]}, {position[1]}
								</Popup>
							</Marker>
						</MapContainer>
					</div>
				</div>
			</section>

			{/* ── FAQ ── */}
			<section className="py-20" style={{ backgroundColor: "#eef3fb" }}>
				<div className="max-w-3xl mx-auto px-6">
					<div className="text-center mb-12">
						<p
							className="text-sm font-semibold tracking-widest uppercase mb-3"
							style={{ color: "#D91E26" }}
						>
							Questions
						</p>
						<h2
							className="font-serif text-4xl font-bold"
							style={{ color: "#204487" }}
						>
							Frequently Asked Questions
						</h2>
					</div>
					<div className="flex flex-col gap-3">
						{faqs.map((f, i) => (
							<div
								key={i}
								className="bg-white rounded-xl border border-blue-100 overflow-hidden"
							>
								<button
									onClick={() => setOpenFaq(openFaq === i ? null : i)}
									className="w-full flex items-center justify-between px-6 py-4 text-left"
								>
									<span
										className="font-semibold text-sm"
										style={{ color: "#1D1E1F" }}
									>
										{f.q}
									</span>
									<span
										className="text-xl font-light ml-4 flex-shrink-0"
										style={{ color: "#204487" }}
									>
										{openFaq === i ? "−" : "+"}
									</span>
								</button>
								{openFaq === i && (
									<div className="px-6 pb-5 border-t border-blue-50">
										<p
											className="text-sm leading-relaxed pt-4"
											style={{ color: "#4a4a4a" }}
										>
											{f.a}
										</p>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
}
