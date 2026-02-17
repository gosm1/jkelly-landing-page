"use client";

import { motion, useMotionValue, useSpring, type Variants } from "motion/react";
import { useState, useCallback, useRef } from "react";
import { projects } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

export default function ProjectsPage() {
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        },
        [mouseX, mouseY]
    );

    return (
        <main className="min-h-screen text-white">
            <div className="mx-auto max-w-5xl lg:max-w-6xl px-6 py-20 md:py-32">
                {/* Back link */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-12"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-300"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </motion.div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-16"
                >
                    <p className="text-[#027DD5] mb-2 text-sm font-medium">
                        Portfolio
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                        All Projects
                    </h1>
                    <p className="text-gray-500 max-w-xl text-sm md:text-base">
                        A showcase of websites I&apos;ve designed and built for
                        real businesses — each crafted with care, speed, and
                        purpose.
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div
                    ref={containerRef}
                    className="relative"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{ cursor: isHovered ? "none" : "auto" }}
                >
                    {/* Custom magnetic cursor */}
                    <motion.div
                        className="pointer-events-none absolute z-50 mix-blend-difference"
                        style={{
                            x: cursorX,
                            y: cursorY,
                            translateX: "-50%",
                            translateY: "-50%",
                        }}
                    >
                        <motion.div
                            className="rounded-full bg-white flex items-center justify-center"
                            animate={{
                                width: isHovered ? 80 : 0,
                                height: isHovered ? 80 : 0,
                                opacity: isHovered ? 1 : 0,
                            }}
                            transition={{
                                type: "spring",
                                damping: 20,
                                stiffness: 200,
                            }}
                        >
                            <motion.span
                                className="text-black text-xs font-medium tracking-wider uppercase"
                                animate={{ opacity: isHovered ? 1 : 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                View
                            </motion.span>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {projects.map((project, index) => (
                            <motion.a
                                key={index}
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                variants={cardVariants}
                                className="group block"
                            >
                                {/* Image Container */}
                                <div className="relative rounded-2xl overflow-hidden mb-5 bg-[#111] border border-white/5">
                                    <div className="overflow-hidden">
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            transition={{
                                                duration: 0.6,
                                                ease: [0.16, 1, 0.3, 1],
                                            }}
                                        >
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                width={800}
                                                height={500}
                                                className="w-full h-[280px] md:h-[320px] object-cover"
                                            />
                                        </motion.div>
                                    </div>
                                    {/* Gradient overlay on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                </div>

                                {/* Project Info */}
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-white group-hover:text-[#027DD5] transition-colors duration-300">
                                        {project.title}
                                    </h3>

                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Category Tag */}
                                    <div className="pt-1">
                                        <span className="inline-block text-xs text-[#027DD5] border border-[#027DD5]/30 rounded-full px-3 py-1 bg-[#0F1B2E]">
                                            {project.category}
                                        </span>
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </motion.div>
                </div>

                {/* Back to top */}
                <motion.div
                    className="text-center mt-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2.5 text-sm font-medium text-white border border-[#027DD5]/40 rounded-full px-6 py-3 bg-[#027DD5]/10 hover:bg-[#027DD5]/20 hover:border-[#027DD5]/60 transition-all duration-300"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </motion.div>
            </div>
        </main>
    );
}
