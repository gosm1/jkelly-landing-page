"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RocketIcon, ArrowRightIcon, PhoneCallIcon } from "lucide-react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import bizlogo1 from "@/assets/images/bizlogo1.webp";
import bizlogo2 from "@/assets/images/bizlogo2.webp";
import bizlogo3 from "@/assets/images/bizlogo3.webp";
import bizlogo4 from "@/assets/images/bizlogo4.webp";
import bizlogo5 from "@/assets/images/bizlogo5.webp";
import { ShinyButton } from "@/components/ui/shiny-button";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { Spotlight, GridBackground } from "@/components/ui/spotlight-new";

const clients = [
    { id: 1, name: "Vida Cafe", designation: "Coffee Shop", image: bizlogo1 },
    { id: 2, name: "MostKnown SNKRS", designation: "Sneaker Reseller", image: bizlogo2 },
    { id: 3, name: "Nilou Med Spa", designation: "Medical Spa", image: bizlogo3 },
    { id: 4, name: "Plumbing Pros", designation: "Plumbing Services", image: bizlogo4 },
    { id: 5, name: "J&A Auto Detailing", designation: "Auto Detailing", image: bizlogo5 },
];


export function HeroSection2Exp() {
    return (
        <section className="relative mx-auto w-full max-w-5xl min-h-[100dvh] flex flex-col justify-center">

            {/* Grid Background - full screen width */}
            <div className="absolute inset-0 left-1/2 -translate-x-1/2 w-screen h-full overflow-hidden pointer-events-none">
                <GridBackground />
            </div>


            {/* Spotlight Effect */}
            <Spotlight />

            {/* main content */}
            <div className="relative z-10 flex flex-col items-center justify-center gap-5 pt-32 pb-30">

                <a
                    className={cn(
                        "group mx-auto flex w-fit items-center gap-3 rounded-full border border-gray-800 bg-black backdrop-blur-sm px-3 py-1 shadow",
                        "fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards transition-all delay-500 duration-500 ease-out"
                    )}
                    href="#contact"
                >
                    <AnimatedShinyText className="inline-flex items-center justify-center transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                        <RocketIcon className="size-3 text-muted-foreground mr-2" />
                        <span className="text-xs">Hey! My name is jack kelly!</span>
                        <ArrowRightIcon className="ml-2 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                    </AnimatedShinyText>
                </a>

                <h1
                    className={cn(
                        "fade-in slide-in-from-bottom-10 animate-in text-balance fill-mode-backwards text-center text-4xl tracking-tight delay-100 duration-500 ease-out md:text-5xl lg:text-6xl"
                    )}
                >
                    Your Dream Website.<br />Live in 10 Days or Less.
                </h1>

                <p className="fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards mx-auto max-w-2xl text-center text-base text-gray-400 delay-200 duration-500 ease-out sm:text-lg">
                    Professional, custom-coded websites built to gain visitors and<br />turn them into paying customers.
                </p>

                <div className="fade-in slide-in-from-bottom-10 flex animate-in flex-row flex-wrap items-center justify-center gap-3 fill-mode-backwards pt-2 delay-300 duration-500 ease-out">
                    <Link href="#contact">
                        <Button className="rounded-full bg-[#027DD5] hover:bg-black border border-[#027DD5] hover:border-gray-800 text-white shadow-sm h-12 px-8 w-full sm:w-auto transition-colors" size="lg">
                            <PhoneCallIcon className="size-4 mr-2" />
                            Book a Call
                        </Button>
                    </Link>
                    <ShinyButton href="#portfolio" className="relative z-10 h-12 w-full shadow-lg transition-shadow duration-300 hover:shadow-xl sm:w-auto text-base py-0! content-center px-8">
                        See my work
                    </ShinyButton>

                </div>

                {/* Mini Testimonials */}
                <div className="fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards delay-500 duration-500 ease-out flex flex-col items-center gap-3 pt-6">
                    <div className="flex flex-row items-center justify-center">
                        <AnimatedTooltip items={clients} />
                    </div>
                    <p className="text-sm text-gray-500">Trusted by <span className="text-gray-300 font-medium">20+</span> clients worldwide</p>
                </div>
            </div>
        </section>
    );
}
