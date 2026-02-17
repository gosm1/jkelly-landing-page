"use client";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { ArrowUp, Users, Clock, Zap, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function Testimonial1() {
    const [hoveredImage, setHoveredImage] = useState<string | null>(null);

    interface StatItem {
        value: string;
        label: string;
        icon: React.ElementType;
    }

    const stats: StatItem[] = [
        {
            value: "20+",
            label: "Happy Clients",
            icon: Users,
        },
        {
            value: "10",
            label: "Day Delivery",
            icon: Clock,
        },
        {
            value: "100%",
            label: "Satisfaction",
            icon: Zap,
        },
        {
            value: "3x",
            label: "More Leads",
            icon: TrendingUp,
        },
    ];

    return (
        <div id="about" className="w-full py-16 md:py-20 px-4 md:px-8 lg:px-16 relative">
            <div className="max-w-5xl mx-auto">
                {/* Badge */}
                <div className="flex justify-center mb-8" data-aos="fade-up">
                    <div className="bg-black border border-gray-800 text-gray-400 px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium">
                        About the Developer
                    </div>
                </div>

                {/* Main Heading with Images */}
                <div className="text-center max-w-screen-xl mx-auto relative" data-aos="fade-up" data-aos-delay="50">
                    <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold leading-tight text-white">
                        I help{" "}
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="inline-block mx-1 align-middle relative">
                                        <div className="relative overflow-hidden sm:w-16 w-12 h-12 origin-center transition-all duration-300 md:hover:w-36 hover:w-24 rounded-full border-2 border-gray-700">
                                            <img
                                                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=200&h=200&fit=crop&crop=face"
                                                alt="Business owner"
                                                className="object-cover w-full h-full"
                                                style={{ objectPosition: "center" }}
                                            />
                                        </div>
                                    </div>
                                </TooltipTrigger>

                            </Tooltip>
                        </TooltipProvider>
                        business owners turn
                    </h1>

                    <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold leading-tight text-white">
                        their{" "}
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="inline-block mx-1 align-middle">
                                        <div className="relative overflow-hidden sm:w-16 w-14 h-14 origin-center transition-all duration-300 lg:hover:w-36 md:hover:w-24 hover:w-20 rounded-full border-2 border-gray-700">
                                            <img
                                                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop"
                                                alt="Website on laptop"
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                    </div>
                                </TooltipTrigger>

                            </Tooltip>
                        </TooltipProvider>
                        websites into
                    </h1>
                    <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold leading-tight text-[#027DD5]">
                        growth engines
                    </h1>
                </div>

                {/* Stats Bar */}
                <div
                    className="flex flex-wrap gap-6 md:gap-0 bg-black/40 backdrop-blur-sm mt-10 w-full mx-auto px-6 md:px-8 py-6 border rounded-xl border-gray-800"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    {stats.map((stat, index) => (
                        <div
                            key={stat.label}
                            className="flex-1 min-w-[120px] flex flex-col items-center justify-center gap-1.5 relative"
                        >
                            {index !== 0 && (
                                <div className="hidden md:block w-px h-10 border-l border-dashed border-gray-700 absolute left-0 top-1/2 -translate-y-1/2" />
                            )}
                            <div className="flex items-center gap-1.5">
                                <ArrowUp className="w-4 h-4 text-[#027DD5]" />
                                <span className="text-2xl md:text-3xl font-bold text-white">
                                    {stat.value}
                                </span>
                            </div>
                            <p className="text-gray-500 text-xs md:text-sm text-center">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Quote */}
                <div className="mt-12 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="150">
                    <div className="border-l-2 border-[#027DD5]/40 pl-6 py-1">
                        <p className="text-gray-400 italic text-base md:text-lg leading-relaxed">
                            &ldquo;I&apos;ve been in your shoes as a business owner. That&apos;s why every website I build focuses on one thing: helping your business grow. From day one to long after launch, I&apos;m committed to creating a digital presence that works as hard as you do.&rdquo;
                        </p>
                        <p className="mt-3 text-sm font-medium text-white">— Jack Kelly</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
