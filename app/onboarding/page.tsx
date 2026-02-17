"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
    ArrowRight,
    ArrowLeft,
    User,
    Mail,
    Globe,
    DollarSign,
    MessageSquare,
    CheckCircle2,
    Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { z } from "zod";

/* ─── Schemas ─── */
const step1Schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    niche: z.string().min(1, "Please enter your website niche"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

const step2Schema = z.object({
    goals: z
        .array(z.string())
        .min(1, "Please select at least one goal"),
    audience: z.string().min(5, "Please describe your target audience"),
    existingSite: z.string().min(1, "Please select an option"),
    investmentAmount: z.number().min(500, "Minimum budget is $500"),
    references: z.string().min(3, "Please provide at least 1 reference"),
    brandTone: z.string().min(3, "Please describe your brand tone"),
});

const step3Schema = z.object({
    contentAck: z.boolean().refine((val) => val === true, {
        message: "Please acknowledge this",
    }),
    contactMethod: z.string().min(1, "Please select a contact method"),
});

/* ─── Types ─── */
type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;
type AnyErrors = Record<string, string | undefined>;

/* ─── Helpers ─── */
function flatErrors(result: { success: boolean; error?: z.ZodError }): AnyErrors {
    if (result.success || !result.error) return {};
    const out: AnyErrors = {};
    const flat = result.error.flatten().fieldErrors;
    for (const key of Object.keys(flat)) {
        const msgs = (flat as Record<string, string[] | undefined>)[key];
        if (msgs && msgs.length > 0) out[key] = msgs[0];
    }
    return out;
}

/* ─── Shared input ─── */
function Input({
    className,
    ...props
}: React.ComponentProps<"input">) {
    return (
        <input
            className={cn(
                "flex h-11 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/30 transition-all duration-300 outline-none focus:border-[#027DD5]/50 focus:bg-white/10",
                className
            )}
            {...props}
        />
    );
}

/* ─── Goal options ─── */
const GOALS = [
    "Get more customers/clients",
    "Establish online presence",
    "Look more professional",
    "Improve search visibility (Google)",
    "Sell products/services online",
    "Showcase portfolio/work",
    "Share information about services",
    "Other",
];

const EXISTING_OPTIONS = [
    "No, this is my first website",
    "Yes, but I need a complete redesign",
    "Yes, but I need updates/improvements",
];

const CONTACT_METHODS = [
    "Instagram DM",
    "Text message",
    "Phone call",
];

/* ─── Main Component ─── */
export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const totalSteps = 3;

    /* Step 1 data */
    const [s1, setS1] = useState<Step1Data>({
        name: "",
        email: "",
        niche: "",
        message: "",
    });

    /* Step 2 data */
    const [s2, setS2] = useState<Step2Data>({
        goals: [],
        audience: "",
        existingSite: "",
        investmentAmount: 5000,
        references: "",
        brandTone: "",
    });

    /* Step 3 data */
    const [s3, setS3] = useState<Step3Data>({
        contentAck: false as unknown as true,
        contactMethod: "",
    });

    const [errors, setErrors] = useState<AnyErrors>({});
    const [showThankYou, setShowThankYou] = useState(false);

    /* Pre-fill from localStorage */
    useEffect(() => {
        try {
            const raw = localStorage.getItem("onboarding_contact");
            if (raw) {
                const data = JSON.parse(raw) as Step1Data;
                setS1(data);
            }
        } catch {
            /* ignore */
        }
    }, []);

    /* ─── Validation ─── */
    const validateStep = (): boolean => {
        let result;
        if (step === 1) result = step1Schema.safeParse(s1);
        else if (step === 2) result = step2Schema.safeParse(s2);
        else result = step3Schema.safeParse(s3);

        const errs = flatErrors(result);
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleNext = () => {
        if (!validateStep()) return;
        setErrors({});
        if (step < totalSteps) {
            setStep((s) => s + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            handleFinalSubmit();
        }
    };

    const handleBack = () => {
        setErrors({});
        setStep((s) => Math.max(1, s - 1));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleFinalSubmit = () => {
        // Optimistic UI: Immediately show success state to the user
        // We don't await the fetch here so the UI feels instant.
        // The Thank You screen stays for 5s, which is plenty of time for the request to complete.

        const fullData = { ...s1, ...s2, ...s3 };

        // 1. Trigger API call in background
        fetch('/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fullData),
        }).catch((err) => {
            console.error("Background submission error:", err);
            // In a real app, you might save to localStorage here to retry later
        });

        // 2. Clear local storage immediately
        localStorage.removeItem("onboarding_contact");

        // 3. Show Thank You screen immediately (0ms latency for user)
        setShowThankYou(true);
        setTimeout(() => {
            router.push("/");
        }, 5000);
    };

    /* ─── Toggle goal ─── */
    const toggleGoal = (goal: string) => {
        setS2((prev) => ({
            ...prev,
            goals: prev.goals.includes(goal)
                ? prev.goals.filter((g) => g !== goal)
                : [...prev.goals, goal],
        }));
        if (errors.goals) setErrors((p) => ({ ...p, goals: undefined }));
    };

    /* ─── Thank-you screen ─── */
    if (showThankYou) {
        return (
            <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
                {/* Background blobs */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vh] bg-[#027DD5]/15 rounded-full blur-[120px]" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", duration: 0.8 }}
                    className="relative z-10 text-center max-w-lg"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2, duration: 0.6 }}
                        className="mx-auto w-20 h-20 rounded-full bg-[#027DD5]/15 border border-[#027DD5]/30 flex items-center justify-center mb-6"
                    >
                        <CheckCircle2 className="w-10 h-10 text-[#027DD5]" />
                    </motion.div>

                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        Thank You!
                    </h1>
                    <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-4">
                        Your project details have been submitted
                        successfully. I&apos;ll review everything and get
                        back to you shortly.
                    </p>
                    <p className="text-gray-500 text-sm">
                        Redirecting you to the homepage in a few
                        seconds…
                    </p>

                    {/* Progress bar */}
                    <div className="mt-6 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-[#027DD5] rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 5, ease: "linear" }}
                        />
                    </div>
                </motion.div>
            </div>
        );
    }

    /* ─── Progress bar ─── */
    const progress = (step / totalSteps) * 100;

    return (
        <div className="min-h-screen relative overflow-hidden py-12 md:py-20 px-4">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#027DD5]/10 via-transparent to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70vw] h-[30vh] bg-[#027DD5]/8 rounded-b-full blur-[80px]" />

            <div className="relative z-10 max-w-2xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#027DD5]/10 border border-[#027DD5]/20 text-[#027DD5] text-xs font-medium mb-4">
                        <Sparkles className="w-3.5 h-3.5" />
                        Project Onboarding
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        Let&apos;s Build Something{" "}
                        <span className="text-gray-500">Amazing</span>
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base">
                        Step {step} of {totalSteps} — {step === 1 ? "Your Details" : step === 2 ? "Project Details" : "Content & Contact"}
                    </p>
                </motion.div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-white/5 rounded-full mb-10 overflow-hidden">
                    <motion.div
                        className="h-full bg-[#027DD5] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                </div>

                {/* Step content */}
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 md:p-10">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <StepWrapper key="step1">
                                <StepTitle title="Your Details" subtitle="This information was pre-filled from the contact form. Feel free to update anything." />

                                <div className="space-y-4">
                                    <FieldGroup label="Full Name" error={errors.name}>
                                        <div className="relative">
                                            <User className={cn("absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors", errors.name ? "text-red-400" : "text-white/30")} />
                                            <Input
                                                placeholder="John Doe"
                                                value={s1.name}
                                                onChange={(e) => { setS1((p) => ({ ...p, name: e.target.value })); if (errors.name) setErrors((p) => ({ ...p, name: undefined })); }}
                                                className={cn("pl-10", errors.name && "border-red-500/50")}
                                            />
                                        </div>
                                    </FieldGroup>

                                    <FieldGroup label="Email Address" error={errors.email}>
                                        <div className="relative">
                                            <Mail className={cn("absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors", errors.email ? "text-red-400" : "text-white/30")} />
                                            <Input
                                                type="email"
                                                placeholder="john@example.com"
                                                value={s1.email}
                                                onChange={(e) => { setS1((p) => ({ ...p, email: e.target.value })); if (errors.email) setErrors((p) => ({ ...p, email: undefined })); }}
                                                className={cn("pl-10", errors.email && "border-red-500/50")}
                                            />
                                        </div>
                                    </FieldGroup>

                                    <FieldGroup label="Website Niche" error={errors.niche}>
                                        <div className="relative">
                                            <Globe className={cn("absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors", errors.niche ? "text-red-400" : "text-white/30")} />
                                            <Input
                                                placeholder="e.g. Restaurant"
                                                value={s1.niche}
                                                onChange={(e) => { setS1((p) => ({ ...p, niche: e.target.value })); if (errors.niche) setErrors((p) => ({ ...p, niche: undefined })); }}
                                                className={cn("pl-10", errors.niche && "border-red-500/50")}
                                            />
                                        </div>
                                    </FieldGroup>

                                    <FieldGroup label="Project Overview" error={errors.message}>
                                        <div className="relative">
                                            <MessageSquare className={cn("absolute left-3 top-3 w-4 h-4 transition-colors", errors.message ? "text-red-400" : "text-white/30")} />
                                            <textarea
                                                rows={3}
                                                placeholder="Tell me about your project..."
                                                value={s1.message}
                                                onChange={(e) => { setS1((p) => ({ ...p, message: e.target.value })); if (errors.message) setErrors((p) => ({ ...p, message: undefined })); }}
                                                className={cn(
                                                    "w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 transition-all duration-300 outline-none focus:border-[#027DD5]/50 focus:bg-white/10 resize-none",
                                                    errors.message && "border-red-500/50"
                                                )}
                                            />
                                        </div>
                                    </FieldGroup>
                                </div>
                            </StepWrapper>
                        )}

                        {step === 2 && (
                            <StepWrapper key="step2">
                                <StepTitle title="Project Details" subtitle="Help me understand exactly what you need so I can build the perfect website for you." />

                                <div className="space-y-6">
                                    {/* Goals */}
                                    <FieldGroup label="What do you want this website to help with?" error={errors.goals}>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {GOALS.map((goal) => {
                                                const selected = s2.goals.includes(goal);
                                                return (
                                                    <button
                                                        key={goal}
                                                        type="button"
                                                        onClick={() => toggleGoal(goal)}
                                                        className={cn(
                                                            "text-left px-4 py-3 rounded-lg text-sm border transition-all duration-200",
                                                            selected
                                                                ? "bg-[#027DD5]/15 border-[#027DD5]/40 text-white"
                                                                : "bg-white/[0.03] border-white/10 text-gray-400 hover:bg-white/[0.06] hover:text-gray-300"
                                                        )}
                                                    >
                                                        <span className="flex items-center gap-2">
                                                            <span className={cn("w-4 h-4 rounded border flex items-center justify-center text-[10px] shrink-0 transition-colors", selected ? "bg-[#027DD5] border-[#027DD5] text-white" : "border-white/20")}>
                                                                {selected && "✓"}
                                                            </span>
                                                            {goal}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </FieldGroup>

                                    {/* Audience */}
                                    <FieldGroup label="Who is your target audience/customers?" error={errors.audience}>
                                        <Input
                                            placeholder="e.g. Local families looking for dining, Car buyers in Chicago area..."
                                            value={s2.audience}
                                            onChange={(e) => { setS2((p) => ({ ...p, audience: e.target.value })); if (errors.audience) setErrors((p) => ({ ...p, audience: undefined })); }}
                                            className={cn(errors.audience && "border-red-500/50")}
                                        />
                                    </FieldGroup>

                                    {/* Existing site */}
                                    <FieldGroup label="Do you currently have a website?" error={errors.existingSite}>
                                        <div className="space-y-2">
                                            {EXISTING_OPTIONS.map((opt) => {
                                                const selected = s2.existingSite === opt;
                                                return (
                                                    <button
                                                        key={opt}
                                                        type="button"
                                                        onClick={() => { setS2((p) => ({ ...p, existingSite: opt })); if (errors.existingSite) setErrors((p) => ({ ...p, existingSite: undefined })); }}
                                                        className={cn(
                                                            "w-full text-left px-4 py-3 rounded-lg text-sm border transition-all duration-200 flex items-center gap-3",
                                                            selected
                                                                ? "bg-[#027DD5]/15 border-[#027DD5]/40 text-white"
                                                                : "bg-white/[0.03] border-white/10 text-gray-400 hover:bg-white/[0.06]"
                                                        )}
                                                    >
                                                        <span className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors", selected ? "border-[#027DD5]" : "border-white/20")}>
                                                            {selected && <span className="w-2 h-2 rounded-full bg-[#027DD5]" />}
                                                        </span>
                                                        {opt}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </FieldGroup>

                                    {/* Budget slider */}
                                    <FieldGroup label="How much do you want to invest in your website?" error={errors.investmentAmount}>
                                        <p className="text-gray-500 text-xs mb-3">
                                            I work with a range of budgets from $500 to $20,000+. Your budget determines the time and level of customization I can put into your site.
                                        </p>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[#027DD5] text-2xl font-bold">${s2.investmentAmount.toLocaleString()}</span>
                                                <span className="text-gray-500 text-xs">$500 – $20,000+</span>
                                            </div>
                                            <input
                                                type="range"
                                                min={500}
                                                max={20000}
                                                step={500}
                                                value={s2.investmentAmount}
                                                onChange={(e) => setS2((p) => ({ ...p, investmentAmount: Number(e.target.value) }))}
                                                className="w-full accent-[#027DD5] h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#027DD5] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white/20 [&::-webkit-slider-thumb]:shadow-lg"
                                            />
                                        </div>
                                    </FieldGroup>

                                    {/* References */}
                                    <FieldGroup label="Reference websites you like" error={errors.references}>
                                        <p className="text-gray-500 text-xs mb-2">
                                            Please share at least one website URL that you like the design/style of. The more examples you provide, the better I can understand your vision!
                                        </p>
                                        <textarea
                                            rows={2}
                                            placeholder="e.g. website1.com, website2.com, @instagramusername"
                                            value={s2.references}
                                            onChange={(e) => { setS2((p) => ({ ...p, references: e.target.value })); if (errors.references) setErrors((p) => ({ ...p, references: undefined })); }}
                                            className={cn(
                                                "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 transition-all duration-300 outline-none focus:border-[#027DD5]/50 focus:bg-white/10 resize-none",
                                                errors.references && "border-red-500/50"
                                            )}
                                        />
                                    </FieldGroup>

                                    {/* Brand tone */}
                                    <FieldGroup label="How do you want your brand to come across?" error={errors.brandTone}>
                                        <Input
                                            placeholder="e.g. professional & trustworthy, fun & energetic, luxury & elegant"
                                            value={s2.brandTone}
                                            onChange={(e) => { setS2((p) => ({ ...p, brandTone: e.target.value })); if (errors.brandTone) setErrors((p) => ({ ...p, brandTone: undefined })); }}
                                            className={cn(errors.brandTone && "border-red-500/50")}
                                        />
                                    </FieldGroup>
                                </div>
                            </StepWrapper>
                        )}

                        {step === 3 && (
                            <StepWrapper key="step3">
                                <StepTitle title="Content & Contact" subtitle="Last step! Let me know how to reach you." />

                                <div className="space-y-6">
                                    {/* Content acknowledgment */}
                                    <FieldGroup label="Content & Images" error={errors.contentAck}>
                                        <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                                            <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                                Please gather up all of your best content (videos, images, logos, etc.) that you want on your website. I will need this content from you and will have you send it to me at your preferred contact method after I reach out to you.
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() => { setS3((p) => ({ ...p, contentAck: true as unknown as true })); if (errors.contentAck) setErrors((p) => ({ ...p, contentAck: undefined })); }}
                                                className={cn(
                                                    "w-full text-left px-4 py-3 rounded-lg text-sm border transition-all duration-200 flex items-center gap-3",
                                                    s3.contentAck
                                                        ? "bg-[#027DD5]/15 border-[#027DD5]/40 text-white"
                                                        : "bg-white/[0.03] border-white/10 text-gray-400 hover:bg-white/[0.06]"
                                                )}
                                            >
                                                <span className={cn("w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors text-xs", s3.contentAck ? "bg-[#027DD5] border-[#027DD5] text-white" : "border-white/20")}>
                                                    {s3.contentAck && "✓"}
                                                </span>
                                                I understand — I will gather my content and send it when you contact me
                                            </button>
                                        </div>
                                    </FieldGroup>

                                    {/* Contact method */}
                                    <FieldGroup label="How would you like me to contact you?" error={errors.contactMethod}>
                                        <div className="space-y-2">
                                            {CONTACT_METHODS.map((method) => {
                                                const selected = s3.contactMethod === method;
                                                return (
                                                    <button
                                                        key={method}
                                                        type="button"
                                                        onClick={() => { setS3((p) => ({ ...p, contactMethod: method })); if (errors.contactMethod) setErrors((p) => ({ ...p, contactMethod: undefined })); }}
                                                        className={cn(
                                                            "w-full text-left px-4 py-3 rounded-lg text-sm border transition-all duration-200 flex items-center gap-3",
                                                            selected
                                                                ? "bg-[#027DD5]/15 border-[#027DD5]/40 text-white"
                                                                : "bg-white/[0.03] border-white/10 text-gray-400 hover:bg-white/[0.06]"
                                                        )}
                                                    >
                                                        <span className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors", selected ? "border-[#027DD5]" : "border-white/20")}>
                                                            {selected && <span className="w-2 h-2 rounded-full bg-[#027DD5]" />}
                                                        </span>
                                                        {method}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </FieldGroup>
                                </div>
                            </StepWrapper>
                        )}
                    </AnimatePresence>

                    {/* Navigation buttons */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.06]">
                        {step > 1 ? (
                            <button
                                type="button"
                                onClick={handleBack}
                                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200 px-4 py-2.5 rounded-lg hover:bg-white/5"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Previous
                            </button>
                        ) : (
                            <div />
                        )}

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            onClick={handleNext}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-[#027DD5]/20 rounded-lg blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                            <div className="relative px-6 py-2.5 bg-[#027DD5] text-white text-sm font-medium rounded-lg flex items-center gap-2 hover:bg-[#027DD5]/90 transition-colors">
                                {step === totalSteps ? "Submit Form" : "Next"}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                        </motion.button>
                    </div>
                </div>

                {/* Step indicators */}
                <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: totalSteps }, (_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "w-2 h-2 rounded-full transition-all duration-300",
                                i + 1 === step
                                    ? "bg-[#027DD5] w-6"
                                    : i + 1 < step
                                        ? "bg-[#027DD5]/50"
                                        : "bg-white/10"
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ─── Sub-components ─── */
function StepWrapper({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}

function StepTitle({ title, subtitle }: { title: string; subtitle: string }) {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-1">{title}</h2>
            <p className="text-gray-500 text-sm">{subtitle}</p>
        </div>
    );
}

function FieldGroup({
    label,
    error,
    children,
}: {
    label: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
                {label}
            </label>
            {children}
            {error && (
                <p className="text-red-400 text-[11px] mt-1 pl-1">{error}</p>
            )}
        </div>
    );
}
