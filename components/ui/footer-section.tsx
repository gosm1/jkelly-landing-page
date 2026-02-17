'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { InstagramIcon } from 'lucide-react';
import Image from 'next/image';
import JkLogo from '@/assets/images/JkLogo.webp';

interface FooterLink {
    title: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
    label: string;
    links: FooterLink[];
}

const footerLinks: FooterSection[] = [
    {
        label: 'Navigate',
        links: [
            { title: 'About', href: '#about' },
            { title: 'Services', href: '#services' },
            { title: 'Portfolio', href: '#portfolio' },
            { title: 'Testimonials', href: '#testimonials' },
        ],
    },
    {
        label: 'Company',
        links: [
            { title: 'FAQs', href: '#faqs' },
            { title: 'About Us', href: '#about' },
        ],
    },
    {
        label: 'Social Links',
        links: [
            { title: 'Instagram', href: 'https://www.instagram.com/jkellysites', icon: InstagramIcon },
        ],
    },
];

export function Footer() {
    return (
        <footer className="md:rounded-t-6xl relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-4xl border-t border-white/[0.06] mt-20 px-6 py-12 lg:py-16">
            <div className="bg-white/[0.04] absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-sm" />

            <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
                <AnimatedContainer className="space-y-4">
                    <Image src={JkLogo} alt="Jack Kelly Logo" width={120} height={40} className="h-8 w-auto" />
                    <p className="text-gray-500 mt-8 text-sm md:mt-0">
                        © 2025 Jack Kelly. All rights reserved.
                    </p>
                    <p className="text-gray-600 text-xs">
                        This website and services are not affiliated with Google or Meta.
                    </p>
                </AnimatedContainer>

                <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-3 xl:col-span-2 xl:mt-0">
                    {footerLinks.map((section, index) => (
                        <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
                            <div className="mb-10 md:mb-0">
                                <h3 className="text-xs text-gray-400">{section.label}</h3>
                                <ul className="text-gray-600 mt-4 space-y-2 text-sm">
                                    {section.links.map((link) => (
                                        <li key={link.title}>
                                            <a
                                                href={link.href}
                                                className="hover:text-gray-300 inline-flex items-center transition-all duration-300"
                                            >
                                                {link.icon && <link.icon className="me-1 size-4" />}
                                                {link.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </AnimatedContainer>
                    ))}
                </div>
            </div>
        </footer>
    );
}

type ViewAnimationProps = {
    delay?: number;
    className?: ComponentProps<typeof motion.div>['className'];
    children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return children;
    }

    return (
        <motion.div
            initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
            whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.8 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
