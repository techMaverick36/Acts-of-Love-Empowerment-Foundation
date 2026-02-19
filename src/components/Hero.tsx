import { useState, useEffect } from "react";
import {
	FiArrowRight,
	FiChevronLeft,
	FiChevronRight,
	FiHeart,
} from "react-icons/fi";

const slides = [
	{
		url: "https://images.unsplash.com/photo-1521493959102-bdd6677fdd81?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		alt: "Children in a community program",
		title: "Empowering The Young Through",
		highlight: "Education",
		description:
			"We provide access to inclusive and quality education that breaks the cycle of poverty.",
	},
	{
		url: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1600&q=80",
		alt: "Healthcare volunteers serving communities",
		title: "Restoring Hope Through",
		highlight: "Healthcare",
		description:
			"Improving community health through outreach programs and medical support initiatives.",
	},
	{
		url: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=1600&q=80",
		alt: "Education and empowerment",
		title: "Building Inclusive",
		highlight: "Communities",
		description:
			"Championing inclusion and dignity so every individual thrives regardless of background.",
	},
	{
		url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&q=80",
		alt: "Community development",
		title: "Driving Sustainable",
		highlight: "Development",
		description:
			"Creating lasting environmental, social and economic transformation for future generations.",
	},
];

export default function Hero() {
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrent((prev) => (prev + 1) % slides.length);
		}, 7000);
		return () => clearInterval(timer);
	}, []);

	const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
	const next = () => setCurrent((c) => (c + 1) % slides.length);

	return (
		<section className="relative h-[90vh] md:h-screen w-full overflow-hidden font-sans">
			{/* Background Slides */}
			{slides.map((slide, i) => (
				<div
					key={i}
					className={`absolute inset-0 transition-all duration-[1800ms] ease-out ${
						i === current ? "opacity-100 scale-100" : "opacity-0 scale-110"
					}`}
				>
					<img
						src={slide.url}
						alt={slide.alt}
						className="w-full h-full object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/50 to-black/20" />
				</div>
			))}

			{/* Content */}
			<div className="relative z-10 h-full flex items-center px-6 pt-28 md:pt-32 lg:pt-0 md:px-12 lg:px-24 lg:-right-60">
				<div className="max-w-3xl text-white">
					{/* Tagline */}
					<div className="flex items-center gap-3 mb-8">
						<span className="h-px w-10 bg-[#639E90]"></span>
						<p className="uppercase tracking-[0.3em] text-xs md:text-sm font-semibold text-[#639E90]">
							Acts of Love Empowerment Foundation
						</p>
					</div>

					{/* Dynamic Headline */}
					<h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.2] tracking-tight mb-8 transition-all duration-700">
						{slides[current].title}{" "}
						<span className="text-[#639E90] italic">
							{slides[current].highlight}
						</span>
					</h1>

					{/* Dynamic Description */}
					<p className="text-gray-200 text-lg md:text-xl max-w-2xl leading-loose mb-12">
						{slides[current].description}
					</p>

					{/* CTA Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 mb-16">
						<button className="group flex items-center justify-center gap-3 bg-[#D91E26] text-white px-8 py-4 rounded-full font-semibold transition-all hover:bg-[#b81a20] hover:scale-105 active:scale-95 shadow-xl">
							<FiHeart className="group-hover:animate-pulse" />
							Donate Now
						</button>

						<button className="flex items-center justify-center gap-2 border-2 border-white/40 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-black transition-all">
							Become a Partner
							<FiArrowRight />
						</button>
					</div>

					{/* Impact Stats */}
					{/* <div className="hidden lg:grid grid-cols-3 gap-12 border-t border-white/20 pt-8 max-w-3xl">
						{[
							{ label: "Lives Impacted", val: "1+" },
							{ label: "Communities Served", val: "0+" },
							{ label: "Years of Impact", val: "0+" },
						].map((stat, idx) => (
							<div key={idx}>
								<p className="text-white text-3xl font-serif font-bold hover:text-[#F26421] transition-colors">
									{stat.val}
								</p>
								<p className="text-gray-400 text-sm uppercase tracking-widest mt-1">
									{stat.label}
								</p>
							</div>
						))}
					</div> */}
				</div>
			</div>

			{/* Navigation Arrows */}
			<div className="absolute right-8 bottom-24 md:bottom-auto md:top-1/2 md:-translate-y-1/2 flex flex-col gap-4 z-20">
				<button
					onClick={prev}
					className="p-4 rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-all backdrop-blur-md"
				>
					<FiChevronLeft size={24} />
				</button>
				<button
					onClick={next}
					className="p-4 rounded-full bg-white text-black hover:bg-[#D91E26] hover:text-white transition-all shadow-2xl"
				>
					<FiChevronRight size={24} />
				</button>
			</div>

			{/* Slide Progress Bars */}
			<div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-20">
				{slides.map((_, i) => (
					<button
						key={i}
						onClick={() => setCurrent(i)}
						className="relative h-1 w-14 bg-white/30 overflow-hidden rounded-full"
					>
						<div
							className={`absolute inset-0 bg-[#F26421] transition-transform duration-[7000ms] ease-linear ${
								i === current ? "translate-x-0" : "-translate-x-full"
							}`}
						/>
					</button>
				))}
			</div>
		</section>
	);
}
