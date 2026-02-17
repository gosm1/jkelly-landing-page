"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useTransform,
} from "motion/react";
import { Mail, User, MessageSquare, DollarSign, Globe, ArrowRight, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { z } from "zod";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    niche: z.string().min(1, "Please enter your website niche"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;
type FormErrors = Partial<Record<keyof ContactFormData, string>>;

function Input({
    className,
    type,
    ...props
}: React.ComponentProps<"input">) {
    return (
        <input
            type={type}
            className={cn(
                "flex h-10 w-full min-w-0 rounded-lg border border-transparent bg-white/5 px-3 py-1 text-sm text-white placeholder:text-white/30 shadow-xs transition-all duration-300 outline-none focus:border-white/20 focus:bg-white/10",
                className
            )}
            {...props}
        />
    );
}

export default function Contact() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        niche: "",
        message: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useTransform(mouseY, [-300, 300], [6, -6]);
    const rotateY = useTransform(mouseX, [-300, 300], [-6, 6]);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            const rect = e.currentTarget.getBoundingClientRect();
            mouseX.set(e.clientX - rect.left - rect.width / 2);
            mouseY.set(e.clientY - rect.top - rect.height / 2);
        },
        [mouseX, mouseY]
    );

    const handleMouseLeave = useCallback(() => {
        mouseX.set(0);
        mouseY.set(0);
    }, [mouseX, mouseY]);

    const handleChange = (field: keyof ContactFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const result = contactSchema.safeParse(formData);
        if (!result.success) {
            const fieldErrors: FormErrors = {};
            const flattenedErrors = result.error.flatten().fieldErrors;

            (Object.keys(flattenedErrors) as Array<keyof ContactFormData>).forEach((key) => {
                const messages = flattenedErrors[key];
                if (messages && messages.length > 0) {
                    fieldErrors[key] = messages[0];
                }
            });

            setErrors(fieldErrors);
            return;
        }

        setErrors({});
        setIsLoading(true);

        // Save to localStorage and redirect to onboarding
        localStorage.setItem("onboarding_contact", JSON.stringify(formData));
        setTimeout(() => {
            router.push("/onboarding");
        }, 800);
    };

    return (
        <section id="contact" className="relative py-16 md:py-20 overflow-hidden">
            {/* Background gradient — blue theme */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#027DD5]/15 via-[#027DD5]/10 to-transparent" />

            {/* Top radial glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] rounded-b-[50%] bg-[#027DD5]/10 blur-[80px]" />
            <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[40vh] rounded-b-full bg-[#027DD5]/8 blur-[60px]"
                animate={{
                    opacity: [0.15, 0.3, 0.15],
                    scale: [0.98, 1.02, 0.98],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "mirror",
                }}
            />

            {/* Animated glow spots */}
            <div className="absolute left-1/4 top-1/3 w-72 h-72 bg-[#027DD5]/5 rounded-full blur-[100px] animate-pulse opacity-40" />
            <div className="absolute right-1/4 bottom-1/4 w-72 h-72 bg-[#027DD5]/5 rounded-full blur-[100px] animate-pulse delay-1000 opacity-40" />

            <div className="relative z-10 mx-auto max-w-5xl lg:max-w-6xl px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                    {/* Left — Copy */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        <p className="text-[#027DD5] text-sm font-medium mb-3">
                            Get in Touch
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-tight">
                            Ready to turn your business into a{" "}
                            <span className="text-gray-500">
                                growth machine?
                            </span>
                        </h2>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-md">
                            Whether you need a brand-new website or a full
                            redesign, I&apos;ll craft something that looks
                            premium, loads fast, and actually converts visitors
                            into customers. Let&apos;s talk.
                        </p>

                        {/* Key points */}
                        <div className="space-y-4 mb-8">
                            {[
                                {
                                    icon: Send,
                                    text: "Typically respond within 2 hours",
                                },
                                {
                                    icon: Globe,
                                    text: "Free consultation & project estimate",
                                },
                                {
                                    icon: DollarSign,
                                    text: "No hidden fees — transparent pricing",
                                },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-[#027DD5]/10 border border-[#027DD5]/20 flex items-center justify-center shrink-0">
                                        <item.icon className="w-4 h-4 text-[#027DD5]" />
                                    </div>
                                    <p className="text-gray-300 text-sm">
                                        {item.text}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Social links */}
                        <p className="text-gray-500 text-xs mb-3 uppercase tracking-wider">
                            Find me on
                        </p>
                        <div className="flex gap-3">
                            {[
                                { icon: "fa-twitter", href: "#" },
                                { icon: "fa-instagram", href: "#" },
                                { icon: "fa-linkedin-in", href: "#" },
                            ].map((s, i) => (
                                <a
                                    key={i}
                                    href={s.href}
                                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center hover:bg-[#027DD5]/20 hover:border-[#027DD5]/30 transition-all duration-300"
                                >
                                    <i
                                        className={`fab ${s.icon} text-sm text-gray-400`}
                                    />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right — Glass Card Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full max-w-md mx-auto md:mx-0 md:ml-auto"
                        style={{ perspective: 1500 }}
                    >
                        <motion.div
                            className="relative"
                            style={{ rotateX, rotateY }}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            whileHover={{ z: 10 }}
                        >
                            <div className="relative group">
                                {/* Card glow */}
                                <motion.div
                                    className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-700"
                                    animate={{
                                        boxShadow: [
                                            "0 0 10px 2px rgba(2,125,213,0.05)",
                                            "0 0 15px 5px rgba(2,125,213,0.1)",
                                            "0 0 10px 2px rgba(2,125,213,0.05)",
                                        ],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        repeatType: "mirror",
                                    }}
                                />

                                {/* Traveling light beams */}
                                <div className="absolute -inset-[1px] rounded-2xl overflow-hidden">
                                    <motion.div
                                        className="absolute top-0 left-0 h-[2px] w-[50%] bg-gradient-to-r from-transparent via-[#027DD5]/60 to-transparent"
                                        animate={{
                                            left: ["-50%", "100%"],
                                        }}
                                        transition={{
                                            duration: 2.5,
                                            ease: "easeInOut",
                                            repeat: Infinity,
                                            repeatDelay: 1,
                                        }}
                                    />
                                    <motion.div
                                        className="absolute top-0 right-0 h-[50%] w-[2px] bg-gradient-to-b from-transparent via-[#027DD5]/60 to-transparent"
                                        animate={{
                                            top: ["-50%", "100%"],
                                        }}
                                        transition={{
                                            duration: 2.5,
                                            ease: "easeInOut",
                                            repeat: Infinity,
                                            repeatDelay: 1,
                                            delay: 0.6,
                                        }}
                                    />
                                    <motion.div
                                        className="absolute bottom-0 right-0 h-[2px] w-[50%] bg-gradient-to-r from-transparent via-[#027DD5]/60 to-transparent"
                                        animate={{
                                            right: ["-50%", "100%"],
                                        }}
                                        transition={{
                                            duration: 2.5,
                                            ease: "easeInOut",
                                            repeat: Infinity,
                                            repeatDelay: 1,
                                            delay: 1.2,
                                        }}
                                    />
                                    <motion.div
                                        className="absolute bottom-0 left-0 h-[50%] w-[2px] bg-gradient-to-b from-transparent via-[#027DD5]/60 to-transparent"
                                        animate={{
                                            bottom: ["-50%", "100%"],
                                        }}
                                        transition={{
                                            duration: 2.5,
                                            ease: "easeInOut",
                                            repeat: Infinity,
                                            repeatDelay: 1,
                                            delay: 1.8,
                                        }}
                                    />
                                </div>

                                {/* Border glow */}
                                <div className="absolute -inset-[0.5px] rounded-2xl bg-gradient-to-r from-[#027DD5]/5 via-[#027DD5]/10 to-[#027DD5]/5 opacity-0 group-hover:opacity-70 transition-opacity duration-500" />

                                {/* Glass card body */}
                                <div className="relative bg-black/50 rounded-2xl p-6 md:p-8 border border-white/[0.06] shadow-2xl overflow-hidden">
                                    {/* Subtle pattern */}
                                    <div
                                        className="absolute inset-0 opacity-[0.02]"
                                        style={{
                                            backgroundImage: `linear-gradient(135deg, white 0.5px, transparent 0.5px), linear-gradient(45deg, white 0.5px, transparent 0.5px)`,
                                            backgroundSize: "30px 30px",
                                        }}
                                    />

                                    {/* Header */}
                                    <div className="text-center space-y-1 mb-6">
                                        <motion.div
                                            initial={{
                                                scale: 0.5,
                                                opacity: 0,
                                            }}
                                            whileInView={{
                                                scale: 1,
                                                opacity: 1,
                                            }}
                                            viewport={{ once: true }}
                                            transition={{
                                                type: "spring",
                                                duration: 0.8,
                                            }}
                                            className="mx-auto w-10 h-10 rounded-full border border-[#027DD5]/20 bg-[#027DD5]/10 flex items-center justify-center relative overflow-hidden"
                                        >
                                            <Mail className="w-4 h-4 text-[#027DD5]" />
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#027DD5]/20 to-transparent opacity-50" />
                                        </motion.div>

                                        <h3 className="text-lg font-bold text-white">
                                            Start Your Project
                                        </h3>
                                        <p className="text-white/50 text-xs">
                                            Fill in your details and I&apos;ll
                                            get back to you within 24h.
                                        </p>
                                    </div>

                                    {/* Form */}
                                    <form
                                        onSubmit={handleSubmit}
                                        className="space-y-3"
                                    >
                                        {/* Name & Email */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <div className="relative">
                                                    <User
                                                        className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${focusedInput === "name" ? "text-[#027DD5]" : errors.name ? "text-red-400/60" : "text-white/30"}`}
                                                    />
                                                    <Input
                                                        type="text"
                                                        placeholder="Full Name"
                                                        value={formData.name}
                                                        onChange={(e) => handleChange("name", e.target.value)}
                                                        className={cn("pl-10", errors.name && "border-red-500/50 focus:border-red-500/70")}
                                                        onFocus={() => setFocusedInput("name")}
                                                        onBlur={() => setFocusedInput(null)}
                                                    />
                                                </div>
                                                {errors.name && <p className="text-red-400 text-[11px] mt-1 pl-1">{errors.name}</p>}
                                            </div>
                                            <div>
                                                <div className="relative">
                                                    <Mail
                                                        className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${focusedInput === "email" ? "text-[#027DD5]" : errors.email ? "text-red-400/60" : "text-white/30"}`}
                                                    />
                                                    <Input
                                                        type="email"
                                                        placeholder="Email"
                                                        value={formData.email}
                                                        onChange={(e) => handleChange("email", e.target.value)}
                                                        className={cn("pl-10", errors.email && "border-red-500/50 focus:border-red-500/70")}
                                                        onFocus={() => setFocusedInput("email")}
                                                        onBlur={() => setFocusedInput(null)}
                                                    />
                                                </div>
                                                {errors.email && <p className="text-red-400 text-[11px] mt-1 pl-1">{errors.email}</p>}
                                            </div>
                                        </div>

                                        {/* Niche */}
                                        <div className="relative">
                                            <Globe
                                                className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${focusedInput === "niche" ? "text-[#027DD5]" : errors.niche ? "text-red-400/60" : "text-white/30"}`}
                                            />
                                            <Input
                                                type="text"
                                                placeholder="Website Niche"
                                                value={formData.niche}
                                                onChange={(e) => handleChange("niche", e.target.value)}
                                                className={cn("pl-10", errors.niche && "border-red-500/50 focus:border-red-500/70")}
                                                onFocus={() => setFocusedInput("niche")}
                                                onBlur={() => setFocusedInput(null)}
                                            />
                                            {errors.niche && <p className="text-red-400 text-[11px] mt-1 pl-1">{errors.niche}</p>}
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <div className="relative">
                                                <MessageSquare
                                                    className={`absolute left-3 top-3 w-4 h-4 transition-colors duration-300 ${focusedInput === "message" ? "text-[#027DD5]" : errors.message ? "text-red-400/60" : "text-white/30"}`}
                                                />
                                                <textarea
                                                    rows={3}
                                                    placeholder="Tell me about your project..."
                                                    value={formData.message}
                                                    onChange={(e) => handleChange("message", e.target.value)}
                                                    className={cn(
                                                        "w-full rounded-lg border border-transparent bg-white/5 pl-10 pr-3 py-2.5 text-sm text-white placeholder:text-white/30 transition-all duration-300 outline-none focus:border-white/20 focus:bg-white/10 resize-none",
                                                        errors.message && "border-red-500/50 focus:border-red-500/70"
                                                    )}
                                                    onFocus={() => setFocusedInput("message")}
                                                    onBlur={() => setFocusedInput(null)}
                                                />
                                            </div>
                                            {errors.message && <p className="text-red-400 text-[11px] mt-1 pl-1">{errors.message}</p>}
                                        </div>

                                        {/* Submit */}
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full relative group/button mt-2"
                                        >
                                            <div className="absolute inset-0 bg-[#027DD5]/20 rounded-lg blur-lg opacity-0 group-hover/button:opacity-70 transition-opacity duration-300" />

                                            <div className="relative overflow-hidden bg-[#027DD5] text-white font-medium h-10 rounded-lg transition-all duration-300 flex items-center justify-center hover:bg-[#027DD5]/90">
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -z-10"
                                                    animate={{
                                                        x: ["-100%", "100%"],
                                                    }}
                                                    transition={{
                                                        duration: 1.5,
                                                        ease: "easeInOut",
                                                        repeat: Infinity,
                                                        repeatDelay: 1,
                                                    }}
                                                    style={{
                                                        opacity: isLoading ? 1 : 0,
                                                        transition: "opacity 0.3s ease",
                                                    }}
                                                />

                                                <AnimatePresence mode="wait">
                                                    {isLoading ? (
                                                        <motion.div
                                                            key="loading"
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            exit={{ opacity: 0 }}
                                                        >
                                                            <div className="w-4 h-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
                                                        </motion.div>
                                                    ) : (
                                                        <motion.span
                                                            key="text"
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            exit={{ opacity: 0 }}
                                                            className="flex items-center gap-1.5 text-sm font-medium"
                                                        >
                                                            Get Started
                                                            <ArrowRight className="w-3.5 h-3.5 group-hover/button:translate-x-1 transition-transform duration-300" />
                                                        </motion.span>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </motion.button>
                                    </form>

                                    {/* Email fallback */}
                                    <p className="text-[10px] text-white/30 mt-4 text-center">
                                        or email me directly at{" "}
                                        <a
                                            href="mailto:jack@jkellysites.com"
                                            className="text-[#027DD5]/70 hover:text-[#027DD5] transition-colors"
                                        >
                                            jack@jkellysites.com
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
