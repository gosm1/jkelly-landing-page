export interface Project {
    title: string;
    category: string;
    description: string;
    image: string;
    url: string;
}

export const projects: Project[] = [
    {
        title: "Vines Hair Studio",
        category: "Hair Salon",
        description:
            "Professional multi-page layout with service breakdowns, stylist team section, and location/map built in.",
        image: "/assets/images/Vines Hair Studio.webp",
        url: "https://vinesstudio.com",
    },
    {
        title: "Vida Cafe",
        category: "Coffee Shop",
        description:
            "Premium coffee shop website featuring menu showcase, location details, and online ordering integration.",
        image: "/assets/images/vidacafe.webp",
        url: "https://vidacafe.jkellysites.com",
    },
    {
        title: "MostKnown SNKRS",
        category: "Sneaker Reseller",
        description:
            "Premium sneaker and streetwear reseller with bold branding and clean product displays.",
        image: "/assets/images/mostknownsnrks.webp",
        url: "https://mostknownsnkrs.jkellysites.com",
    },
    {
        title: "Nilou Med Spa",
        category: "Medical Spa",
        description:
            "Elegant medical spa website featuring treatments, galleries, and clear booking paths.",
        image: "/assets/images/nilou.webp",
        url: "https://niloumedspa.jkellysites.com",
    },
    {
        title: "Plumbing Pros",
        category: "Plumbing Services",
        description:
            "Service-forward plumbing site with emergency contact, service areas, and customer reviews.",
        image: "/assets/images/plumbingpros.webp",
        url: "https://plumbingpros.jkellysites.com",
    },
    {
        title: "J&A Auto Detailing",
        category: "Auto Detailing",
        description:
            "Mobile detailing site showcasing services, pricing, and fast booking CTAs.",
        image: "/assets/images/jaautodetailing.webp",
        url: "https://jadetailing.jkellysites.com",
    },
];
