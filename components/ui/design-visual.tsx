"use client";

import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface DesignVisualProps {
    mainColor?: string;
    secondaryColor?: string;
    gridColor?: string;
}

export function DesignVisual({
    mainColor = "#027DD5",
    secondaryColor = "#6366f1",
    gridColor = "#80808015",
}: DesignVisualProps) {
    return (
        <div className="relative h-[180px] w-full overflow-hidden rounded-lg">
            <BrowserWireframe color={mainColor} secondaryColor={secondaryColor} />
            <FloatingDesignTags color={mainColor} secondaryColor={secondaryColor} />
            <EllipseGradient color={mainColor} />
            <GridLayer color={gridColor} />
        </div>
    );
}

const EllipseGradient: React.FC<{ color: string }> = ({ color }) => (
    <div className="absolute inset-0 z-5 flex h-full w-full items-center justify-center">
        <svg width="100%" height="100%" viewBox="0 0 356 180" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <rect width="356" height="180" fill="url(#design_radial)" />
            <defs>
                <radialGradient id="design_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(178 98) rotate(90) scale(98 178)">
                    <stop stopColor={color} stopOpacity="0.25" />
                    <stop offset="0.34" stopColor={color} stopOpacity="0.15" />
                    <stop offset="1" stopOpacity="0" />
                </radialGradient>
            </defs>
        </svg>
    </div>
);

const GridLayer: React.FC<{ color: string }> = ({ color }) => (
    <div
        style={{ "--grid-color": color } as React.CSSProperties}
        className="pointer-events-none absolute inset-0 z-4 h-full w-full bg-transparent bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-size-[20px_20px] bg-center opacity-70 mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"
    />
);

interface LayerProps {
    color: string;
    secondaryColor?: string;
}

// Animated browser wireframe with building blocks
const BrowserWireframe: React.FC<LayerProps> = ({ color, secondaryColor }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 300);
        return () => clearTimeout(timer);
    }, []);

    // Website sections that "build" themselves
    const sections = [
        // Nav bar
        { x: 8, y: 18, width: mounted ? 144 : 0, height: 8, color: color, delay: "0ms", radius: 2 },
        // Hero section
        { x: 8, y: 30, width: mounted ? 90 : 0, height: 28, color: color, delay: "150ms", radius: 3, opacity: 0.6 },
        // Hero text lines
        { x: 104, y: 32, width: mounted ? 48 : 0, height: 4, color: "#ffffff", delay: "300ms", radius: 1, opacity: 0.5 },
        { x: 104, y: 40, width: mounted ? 38 : 0, height: 4, color: "#ffffff", delay: "400ms", radius: 1, opacity: 0.3 },
        { x: 104, y: 48, width: mounted ? 28 : 0, height: 6, color: secondaryColor!, delay: "500ms", radius: 2 },
        // Content cards row
        { x: 8, y: 64, width: mounted ? 42 : 0, height: 30, color: color, delay: "600ms", radius: 3, opacity: 0.4 },
        { x: 54, y: 64, width: mounted ? 42 : 0, height: 30, color: secondaryColor!, delay: "700ms", radius: 3, opacity: 0.4 },
        { x: 100, y: 64, width: mounted ? 52 : 0, height: 30, color: color, delay: "800ms", radius: 3, opacity: 0.5 },
        // Footer
        { x: 8, y: 100, width: mounted ? 144 : 0, height: 8, color: "#ffffff", delay: "900ms", radius: 2, opacity: 0.15 },
    ];

    return (
        <div className="absolute inset-0 z-7 flex items-center justify-center">
            <div className="relative">
                <svg width="160" height="116" viewBox="0 0 160 116" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Browser chrome */}
                    <rect x="0" y="0" width="160" height="116" rx="6" fill="#111111" stroke="#333333" strokeWidth="1" />
                    {/* Title bar dots */}
                    <circle cx="10" cy="7" r="2" fill="#ef4444" opacity="0.8" />
                    <circle cx="18" cy="7" r="2" fill="#eab308" opacity="0.8" />
                    <circle cx="26" cy="7" r="2" fill="#22c55e" opacity="0.8" />
                    {/* URL bar */}
                    <rect x="36" y="4" width="80" height="7" rx="3" fill="#222222" />
                    <text x="50" y="10" fontSize="4" fill="#666666" fontFamily="monospace">jkelly.dev</text>

                    {/* Animated sections */}
                    {sections.map((section, index) => (
                        <rect
                            key={index}
                            x={section.x}
                            y={section.y}
                            width={section.width}
                            height={section.height}
                            rx={section.radius}
                            fill={section.color}
                            opacity={section.opacity ?? 0.8}
                            style={{
                                transition: `width 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${section.delay}`,
                            }}
                        />
                    ))}

                    {/* Pulsing cursor indicator */}
                    <rect x="130" y="32" width="2" height="12" rx="1" fill={color}>
                        <animate attributeName="opacity" values="1;0.2;1" dur="1.2s" repeatCount="indefinite" />
                    </rect>
                </svg>

                {/* Floating pixel/brush strokes around the browser */}
                <div className="absolute -top-2 -right-3 w-3 h-3 rounded-sm border border-gray-600" style={{ backgroundColor: color, opacity: 0.6 }}>
                    <div className="w-full h-full animate-pulse" />
                </div>
                <div className="absolute -bottom-1 -left-2 w-2 h-2 rounded-full" style={{ backgroundColor: secondaryColor, opacity: 0.5 }}>
                    <div className="w-full h-full animate-pulse" style={{ animationDelay: "0.5s" }} />
                </div>
                <div className="absolute top-1/2 -right-4 w-2 h-4 rounded-sm border border-gray-700" style={{ backgroundColor: color, opacity: 0.3 }}>
                    <div className="w-full h-full animate-pulse" style={{ animationDelay: "1s" }} />
                </div>
            </div>
        </div>
    );
};

const FloatingDesignTags: React.FC<LayerProps> = ({ color, secondaryColor }) => {
    const items = [
        { id: 1, x: "105", y: "-50", text: "Fonts", dotColor: color },
        { id: 2, x: "110", y: "10", text: "Layout", dotColor: secondaryColor },
        { id: 3, x: "100", y: "55", text: "Custom", dotColor: color },
        { id: 4, x: "-105", y: "-45", text: "Colors", dotColor: secondaryColor },
        { id: 5, x: "-100", y: "15", text: "Responsive", dotColor: color },
        { id: 6, x: "-95", y: "55", text: "Pixel Perfect", dotColor: secondaryColor },
    ];

    return (
        <div className="absolute inset-0 z-7 flex items-center justify-center">
            {items.map((item) => (
                <div
                    key={item.id}
                    className="absolute flex items-center justify-center gap-1 rounded-full border border-gray-700 bg-black/70 px-1.5 py-0.5 backdrop-blur-sm"
                    style={{
                        transform: `translate(${item.x}px, ${item.y}px)`,
                    }}
                >
                    <div
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: item.dotColor }}
                    />
                    <span className="ml-1 text-[10px] text-white">{item.text}</span>
                </div>
            ))}
        </div>
    );
};
