/* eslint-disable @next/next/no-img-element */
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
    {
        id: "01",
        title: "How long does it take to build a website?",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        content:
            "It typically takes 1–2 weeks for a landing page and 2–4 weeks for a full multi-page website, depending on the complexity and number of revisions. I keep you updated at every stage so there are no surprises.",
    },
    {
        id: "02",
        title: "What's included in every project?",
        img: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=800&q=80",
        content:
            "Every project includes custom design, mobile responsiveness, basic SEO setup, contact forms, fast loading speeds, and a polished launch-ready site. I handle everything from design to deployment.",
    },
    {
        id: "03",
        title: "Do you offer ongoing support?",
        img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
        content:
            "Yes — I offer monthly maintenance packages that cover updates, security, backups, and performance monitoring so your site stays fast and secure long after launch.",
    },
    {
        id: "04",
        title: "Are there any hidden costs?",
        img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
        content:
            "No hidden fees, ever. All costs are outlined upfront in your proposal. The only separate costs are third-party services like hosting and domain registration, which I help you set up.",
    },
    {
        id: "05",
        title: "Can you redesign my existing website?",
        img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80",
        content:
            "Absolutely. I can modernize your current site with a fresh design, faster performance, better mobile experience, and improved conversion — while keeping your brand identity intact.",
    },
];

export default function FAQ() {
    return (
        <section id="faqs" className="py-16 md:py-20">
            <div className="mx-auto max-w-5xl lg:max-w-6xl px-6">
                <p className="text-[#027DD5] text-sm font-medium mb-2">FAQs</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                    Questions? We have{" "}
                    <span className="text-gray-500">answers.</span>
                </h2>
                <p className="text-gray-500 max-w-lg text-sm md:text-base mb-10">
                    Everything you need to know before getting started — no
                    fine print, no confusion.
                </p>

                <div className="w-full border border-gray-800 overflow-hidden">
                    <Accordion
                        type="single"
                        defaultValue="02"
                        collapsible
                        className="w-full"
                    >
                        {items.map((item) => (
                            <AccordionItem
                                className="relative border-gray-800"
                                value={item.id}
                                key={item.id}
                            >
                                <AccordionTrigger className="pl-6 pr-4 hover:no-underline hover:bg-white/[0.02] transition-colors [&>svg]:hidden">
                                    <h3 className="text-base md:text-lg font-semibold text-white text-left">
                                        {item.title}
                                    </h3>
                                </AccordionTrigger>
                                <AccordionContent className="space-y-6 text-gray-400 w-full h-full md:h-full grid md:grid-cols-2">
                                    <div className="px-6 space-y-5">
                                        <p className="text-sm leading-relaxed">
                                            {item.content}
                                        </p>
                                    </div>
                                    <img
                                        className="h-full md:border-l border-gray-800 border-t md:border-t-0 md:absolute md:w-1/2 object-cover right-0 top-0"
                                        src={item.img}
                                        alt={item.title}
                                        aria-hidden="true"
                                    />
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
