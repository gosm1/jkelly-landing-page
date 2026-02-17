"use client";
import { Card, CardContent } from '@/components/ui/card'
import { Code, Shield, Zap, Search, Wrench, Sparkles } from 'lucide-react'
import { Cover } from '@/components/ui/cover'
import { PointerHighlight } from '@/components/ui/pointer-highlight'
import { SecurityVisual } from '@/components/ui/security-visual'
import { DesignVisual } from '@/components/ui/design-visual'

export function Features() {
    return (
        <section id="services" className="py-16 md:py-20">
            <div className="mx-auto max-w-5xl lg:max-w-6xl px-6">
                <div className="text-center mb-14" data-aos="fade-up">
                    <p className="text-[#027DD5] mb-2 text-sm font-medium">Why me?</p>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Everything You Need, All in One Place
                    </h2>
                    <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm md:text-base">
                        From design to launch to ongoing support — I handle every aspect of your website so you can focus on running your business.
                    </p>
                </div>
                <div className="relative">
                    <div className="relative z-10 grid grid-cols-6 gap-4">

                        {/* Card 1 - Custom Website Design */}
                        <Card className="relative col-span-full overflow-hidden lg:col-span-2 border-gray-800 bg-black/40" data-aos="fade-up">
                            <div className="mt-6">
                                <DesignVisual />
                            </div>
                            <CardContent className="border-t border-gray-800 pt-4 pb-4">
                                <h2 className="text-lg font-semibold text-white mb-1">Custom Website Design</h2>
                                <p className="text-gray-400 text-sm">Designed and built from scratch with unlimited revisions — no templates, no shortcuts.</p>
                            </CardContent>
                        </Card>

                        {/* Card 2 - Secure by Default */}
                        <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2 border-gray-800 bg-black/40" data-aos="fade-up" data-aos-delay="50">
                            <div className="mt-6">
                                <SecurityVisual />
                            </div>
                            <CardContent className="border-t border-gray-800 pt-4 pb-4">
                                <h2 className="text-lg font-semibold text-white mb-1">Secure by Default</h2>
                                <p className="text-gray-400 text-sm">Built with modern security best practices, SSL, and performance optimization baked in.</p>
                            </CardContent>
                        </Card>

                        {/* Card 3 - Lightning Fast */}
                        <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2 border-gray-800 bg-black/40 min-h-[320px] flex" data-aos="fade-up" data-aos-delay="100">
                            <CardContent className="py-10 m-auto flex flex-col items-center justify-center">
                                <div className="flex items-center justify-center mb-5">
                                    <Cover>
                                        <div className="flex items-center gap-3">
                                            <Zap className="size-14 text-[#027DD5]" strokeWidth={1.5} />
                                            <div>
                                                <span className="text-5xl font-bold text-white">{"<"}1s</span>
                                                <p className="text-xs text-gray-500">Load time</p>
                                            </div>
                                        </div>
                                    </Cover>
                                </div>
                                <div className="text-center">
                                    <h2 className="text-xl font-semibold text-white mb-2">Lightning Fast</h2>
                                    <p className="text-gray-400 text-sm">Optimized for speed so your visitors never have to wait.</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Card 4 - SEO & Performance */}
                        <Card className="relative col-span-full overflow-hidden lg:col-span-3 border-gray-800 bg-black/40" data-aos="fade-up" data-aos-delay="150">
                            <CardContent className="grid py-12 sm:grid-cols-2 gap-6">
                                <div className="relative z-10 flex flex-col justify-between space-y-8">
                                    <div className="relative flex aspect-square size-14 rounded-full border border-gray-800 items-center justify-center">
                                        <Search className="size-6 text-[#027DD5]" strokeWidth={1.5} />
                                    </div>
                                    <div className="space-y-2">
                                        <PointerHighlight>
                                            <h2 className="text-xl font-semibold text-white px-2 py-1">SEO & Performance</h2>
                                        </PointerHighlight>
                                        <p className="text-gray-400 text-sm">Optimized for search engines and speed to maximize your online visibility and bring in more customers.</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center sm:ml-0">
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { score: 100, label: 'Perf', color: '#10b981' },
                                            { score: 98, label: 'A11y', color: '#10b981' },
                                            { score: 95, label: 'BP', color: '#10b981' },
                                            { score: 92, label: 'SEO', color: '#027DD5' },
                                        ].map((item) => (
                                            <div key={item.label} className="flex flex-col items-center gap-1.5">
                                                <div className="relative size-16">
                                                    <svg className="size-16 -rotate-90" viewBox="0 0 64 64">
                                                        <circle cx="32" cy="32" r="28" fill="none" stroke="#1f2937" strokeWidth="4" />
                                                        <circle
                                                            cx="32" cy="32" r="28" fill="none"
                                                            stroke={item.color}
                                                            strokeWidth="4"
                                                            strokeLinecap="round"
                                                            strokeDasharray={`${(item.score / 100) * 175.9} 175.9`}
                                                        />
                                                    </svg>
                                                    <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
                                                        {item.score}
                                                    </span>
                                                </div>
                                                <span className="text-[10px] text-gray-500 uppercase tracking-wider">{item.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Card 5 - Ongoing Support & Done For You */}
                        <Card className="relative col-span-full overflow-hidden lg:col-span-3 border-gray-800 bg-black/40" data-aos="fade-up" data-aos-delay="200">
                            <CardContent className="grid h-full py-12 sm:grid-cols-2 gap-6">
                                <div className="relative z-10 flex flex-col justify-between space-y-8">
                                    <div className="relative flex aspect-square size-14 rounded-full border border-gray-800 items-center justify-center">
                                        <Wrench className="size-6 text-[#027DD5]" strokeWidth={1.5} />
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-xl font-semibold text-white">Ongoing Support</h2>
                                        <p className="text-gray-400 text-sm">Backups, security, and performance — I handle the tech stuff so you don&apos;t have to.</p>
                                    </div>
                                </div>
                                <div className="relative mt-2 sm:-my-6 sm:-mr-6 border-l border-gray-800 sm:border-l">
                                    <div className="relative flex h-full flex-col justify-center space-y-6 py-6 pl-6">
                                        <div className="flex items-center gap-3">
                                            <div className="size-9 rounded-full bg-[#027DD5]/10 border border-[#027DD5]/20 flex items-center justify-center shrink-0">
                                                <Sparkles className="size-4 text-[#027DD5]" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-white">Fully Done for You</p>
                                                <p className="text-xs text-gray-500">Tell me your vision, I handle the rest</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="size-9 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                                                <span className="text-sm text-emerald-400">✓</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-white">Unlimited Revisions</p>
                                                <p className="text-xs text-gray-500">Until you&apos;re 100% happy</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="size-9 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                                                <span className="text-sm text-emerald-400">✓</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-white">10-Day Delivery</p>
                                                <p className="text-xs text-gray-500">Fast turnaround, no shortcuts</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </div>
        </section>
    )
}
