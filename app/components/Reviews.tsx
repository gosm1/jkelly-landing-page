"use client";

import { motion } from "motion/react";
import { GridPattern } from "@/components/ui/grid-pattern";

type Testimonial = {
    name: string;
    role: string;
    company: string;
    quote: string;
    image: string;
};

const testimonials: Testimonial[] = [
    {
        quote: "The site feels warm and premium, and our online orders jumped immediately. Jack organized everything so customers find the menu and location fast.",
        name: "Vida",
        role: "Owner",
        company: "Vida Cafe",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        quote: "Jack nailed the look and kept the booking flow simple. The team page and service layout have been a huge upgrade for us.",
        name: "Vines",
        role: "Owner",
        company: "Vines Hair Studio",
        image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
        quote: "Our product brand finally has a site that feels legit. The visuals, layout, and CTA flow are exactly what we needed to convert.",
        name: "Vines",
        role: "Owner",
        company: "Vines33",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        quote: "Fast turnaround and clean design. The site looks modern and customers can find our booking info instantly.",
        name: "Ponch",
        role: "Owner",
        company: "Ponch Blendz",
        image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
        quote: "Our new website finally matches the quality of our work. It brought in more quote requests within the first week.",
        name: "Tandy",
        role: "Owner",
        company: "Tandy's Window Services",
        image: "https://randomuser.me/api/portraits/men/52.jpg",
    },
    {
        quote: "The site feels luxury without being overdone. Customers stay longer and the product pages are easy to browse.",
        name: "CE",
        role: "Owner",
        company: "CE Jewelry",
        image: "https://randomuser.me/api/portraits/women/28.jpg",
    },
    {
        quote: "Jack delivered a bold, high-energy site that fits my brand. Sponsors and new clients can contact me fast now.",
        name: "Esizzle",
        role: "Owner",
        company: "Esizzle Boxing",
        image: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    {
        quote: "The mobile layout is perfect for our customers. We get more calls and bookings because everything is clear and quick.",
        name: "J&A",
        role: "Owner",
        company: "J&A Auto Detailing",
        image: "https://randomuser.me/api/portraits/men/36.jpg",
    },
    {
        quote: "The site looks authentic and tells our story well. It is clean, easy to navigate, and highlights our products perfectly.",
        name: "Aramso",
        role: "Owner",
        company: "Aramso Kebab",
        image: "https://randomuser.me/api/portraits/men/55.jpg",
    },
    {
        quote: "We needed a site that builds trust and makes it easy to call. Jack handled both and the results show.",
        name: "Pick",
        role: "Owner",
        company: "PickALock",
        image: "https://randomuser.me/api/portraits/men/41.jpg",
    },
    {
        quote: "Classic style with modern clarity. Customers always comment on how easy it is to find info and book.",
        name: "The Mug",
        role: "Owner",
        company: "The Mug & Brush Barbershop",
        image: "https://randomuser.me/api/portraits/men/75.jpg",
    },
    {
        quote: "The new site presents our industrial services in a sharp, professional way. It instantly looks more credible to prospects.",
        name: "Zig",
        role: "Owner",
        company: "Zig Team",
        image: "https://randomuser.me/api/portraits/men/61.jpg",
    },
    {
        quote: "Clean, elegant, and fast. The property layout makes it easy for buyers to reach out.",
        name: "Patty",
        role: "Owner",
        company: "Patty Real Estate",
        image: "https://randomuser.me/api/portraits/women/33.jpg",
    },
    {
        quote: "We finally have a site that shows our work properly. The gallery and quote flow are a big help.",
        name: "Cado",
        role: "Owner",
        company: "Cado Construction",
        image: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
        quote: "The design feels premium and matches our brand. Clients can request service quickly without confusion.",
        name: "Prestige",
        role: "Owner",
        company: "Prestige Transportation",
        image: "https://randomuser.me/api/portraits/men/29.jpg",
    },
    {
        quote: "Simple, clean, and effective. The site explains our services clearly and brings in steady leads.",
        name: "Mr. Bee",
        role: "Owner",
        company: "Mr. Bee's Auto Care",
        image: "https://randomuser.me/api/portraits/men/68.jpg",
    },
    {
        quote: "Jack made the site easy for families to contact us. It feels friendly and professional at the same time.",
        name: "Janeth",
        role: "Owner",
        company: "Janeth House Cleaning",
        image: "https://randomuser.me/api/portraits/women/50.jpg",
    },
    {
        quote: "The site looks sharp and performs well. Customers can shop and browse new arrivals without any friction.",
        name: "KTD",
        role: "Owner",
        company: "KTD Supply Co",
        image: "https://randomuser.me/api/portraits/men/86.jpg",
    },
];

export default function Reviews() {
    return (
        <section id="testimonials" className="relative w-full py-16 md:py-20 px-4">
            {/* Background radial glow */}
            <div
                aria-hidden
                className="absolute inset-0 isolate z-0 contain-strict pointer-events-none"
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(2,125,213,0.08)_0%,transparent_70%)]" />
            </div>

            <div className="mx-auto max-w-5xl lg:max-w-6xl space-y-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col gap-2"
                >
                    <p className="text-[#027DD5] text-sm font-medium">
                        Testimonials
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Real Results, Real Voices
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base max-w-lg">
                        See how businesses are thriving with websites built by
                        Jack — real stories, real impact, real growth.
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="relative grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map(
                        ({ name, role, company, quote, image }, index) => (
                            <motion.div
                                initial={{
                                    filter: "blur(4px)",
                                    translateY: -8,
                                    opacity: 0,
                                }}
                                whileInView={{
                                    filter: "blur(0px)",
                                    translateY: 0,
                                    opacity: 1,
                                }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: 0.05 * index + 0.1,
                                    duration: 0.8,
                                }}
                                key={index}
                                className={`group relative grid grid-cols-[auto_1fr] gap-x-3 overflow-hidden border border-dashed border-gray-700/50 p-4 hover:border-[#027DD5]/30 hover:bg-white/[0.02] transition-colors duration-300${index >= 6 ? " hidden sm:grid" : ""}`}
                            >
                                {/* Grid pattern overlay */}
                                <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] to-white/[0.01] [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
                                        <GridPattern
                                            width={25}
                                            height={25}
                                            x={-12}
                                            y={4}
                                            strokeDasharray="3"
                                            className="stroke-gray-600/20 absolute inset-0 h-full w-full mix-blend-overlay"
                                        />
                                    </div>
                                </div>

                                {/* Avatar */}
                                <img
                                    alt={name}
                                    src={image}
                                    loading="lazy"
                                    className="size-9 rounded-full ring-1 ring-gray-700/50"
                                />

                                {/* Content */}
                                <div>
                                    <div className="-mt-0.5 -space-y-0.5">
                                        <p className="text-sm md:text-base text-white font-medium">
                                            {name}
                                        </p>
                                        <span className="text-gray-500 block text-[11px] font-light tracking-tight">
                                            {role} at {company}
                                        </span>
                                    </div>
                                    <blockquote className="mt-3">
                                        <p className="text-gray-300 text-sm font-light tracking-wide leading-relaxed">
                                            &ldquo;{quote}&rdquo;
                                        </p>
                                    </blockquote>
                                </div>
                            </motion.div>
                        )
                    )}
                </div>

                {/* Social proof banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.6,
                        delay: 0.2,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex justify-center pt-4"
                >
                    <div className="inline-flex items-center gap-4 border border-gray-700/50 rounded-full px-6 py-3 bg-white/[0.02]">
                        <div className="flex -space-x-2">
                            <img
                                className="w-7 h-7 rounded-full border-2 border-black"
                                src="https://randomuser.me/api/portraits/men/1.jpg"
                                alt="User"
                            />
                            <img
                                className="w-7 h-7 rounded-full border-2 border-black"
                                src="https://randomuser.me/api/portraits/women/2.jpg"
                                alt="User"
                            />
                            <img
                                className="w-7 h-7 rounded-full border-2 border-black"
                                src="https://randomuser.me/api/portraits/men/3.jpg"
                                alt="User"
                            />
                            <div className="w-7 h-7 rounded-full border-2 border-black bg-[#027DD5] flex items-center justify-center text-[10px] font-bold text-white">
                                18+
                            </div>
                        </div>
                        <span className="text-xs font-medium text-gray-300">
                            Trusted by 18+ business owners
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
