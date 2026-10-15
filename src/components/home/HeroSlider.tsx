import { useEffect, useState } from "react";
import { FiArrowRight, FiHeart } from "react-icons/fi";
import { SITE } from "../../config/site";
import { cn } from "../../lib/cn";
import Button from "../ui/Button";
import { Eyebrow } from "../ui/SectionHeading";

const SLIDE_MS = 7000;

const slides = [
	{
		url: "/D-4231r.jpg",
		alt: "Children seated at Acts of Love school mission",
		title: "Empowering The Young Through",
		highlight: "Education",
		description: "We provide access to inclusive and quality education that breaks the cycle of poverty.",
	},
	{
		url: "/D-4231r_31.jpg",
		alt: "Acts of Love Foundation team distributing to children",
		title: "Restoring Hope Through",
		highlight: "Action",
		description: "Reaching communities directly with the resources, care, and support they deserve.",
	},
	{
		url: "/IMG_0934.jpg",
		alt: "Acts of Love Foundation team and community members gathered together",
		title: "Building Inclusive",
		highlight: "Communities",
		description: "Championing inclusion and dignity so every individual thrives regardless of background.",
	},
	{
		url: "/IMG_0955.jpg",
		alt: "Acts of Love Foundation team standing together at community outreach",
		title: "Driven by Passion,",
		highlight: "Led by Love",
		description: "Our dedicated team works tirelessly to create lasting, generational change across Uganda.",
	},
];

/** Home page hero: rotating photos and headlines with Donate / Partner actions. */
export default function HeroSlider() {
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => setCurrent((prev) => (prev + 1) % slides.length), SLIDE_MS);
		return () => clearInterval(timer);
	}, [current]);

	const slide = slides[current];

	return (
		<section aria-roledescription="carousel" aria-label="Highlights" className="relative isolate h-[90vh] min-h-[36rem] w-full overflow-hidden md:h-screen">
			{slides.map((s, i) => (
				<div
					key={s.url}
					aria-hidden={i !== current}
					className={cn(
						"absolute inset-0 -z-10 transition-[opacity,transform] duration-[1800ms] ease-out",
						i === current ? "scale-100 opacity-100" : "scale-110 opacity-0",
					)}
				>
					<img
						src={s.url}
						alt={s.alt}
						loading={i === 0 ? "eager" : "lazy"}
						fetchPriority={i === 0 ? "high" : "low"}
						className="size-full object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/50 to-black/20" />
				</div>
			))}

			<div className="flex h-full items-center pt-header lg:pt-header-lg">
				<div className="mx-auto w-full max-w-7xl px-6">
					<div className="max-w-3xl text-white md:mx-auto md:text-center lg:mx-0 lg:text-left">
						<Eyebrow tone="teal" className="mb-6 md:justify-center lg:justify-start">
							{SITE.name}
						</Eyebrow>

						<h1 aria-live="polite" className="mb-6 font-serif text-4xl leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
							{slide.title} <span className="italic text-brand-teal">{slide.highlight}</span>
						</h1>

						<p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-gray-200 sm:text-lg md:text-xl lg:mx-0">
							{slide.description}
						</p>

						<div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4 lg:justify-start">
							<Button to="/donate" size="lg" icon={FiHeart}>
								Donate
							</Button>
							<Button to="/get-involved#partnerships" variant="outline-light" size="lg" trailingIcon={FiArrowRight} className="backdrop-blur-sm">
								Become a Partner
							</Button>
						</div>
					</div>
				</div>
			</div>

			<div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-3">
				{slides.map((s, i) => (
					<button
						key={s.url}
						type="button"
						onClick={() => setCurrent(i)}
						aria-label={`Show slide ${i + 1}: ${s.title} ${s.highlight}`}
						aria-current={i === current}
						className="group/dot flex h-6 items-center"
					>
						<span className="relative block h-1 w-12 overflow-hidden rounded-full bg-white/30 transition-colors group-hover/dot:bg-white/50">
							<span
								className={cn(
									"absolute inset-0 bg-brand-orange ease-linear",
									i === current ? "translate-x-0 transition-transform duration-[7000ms]" : "-translate-x-full",
								)}
							/>
						</span>
					</button>
				))}
			</div>
		</section>
	);
}
