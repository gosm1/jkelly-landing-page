"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// --- Visual Component for Security Card ---

interface SecurityVisualProps {
    mainColor?: string;
    secondaryColor?: string;
    gridColor?: string;
}

export function SecurityVisual({
    mainColor = "#027DD5",
    secondaryColor = "#10b981",
    gridColor = "#80808015",
}: SecurityVisualProps) {
    return (
        <div className="relative h-[180px] w-full overflow-hidden rounded-lg">
            <DonutChart color={mainColor} secondaryColor={secondaryColor} />
            <FloatingTags color={mainColor} secondaryColor={secondaryColor} />
            <EllipseGradient color={mainColor} />
            <GridLayer color={gridColor} />
        </div>
    );
}

const EllipseGradient: React.FC<{ color: string }> = ({ color }) => {
    return (
        <div className="absolute inset-0 z-5 flex h-full w-full items-center justify-center">
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 356 180"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
            >
                <rect width="356" height="180" fill="url(#security_radial)" />
                <defs>
                    <radialGradient
                        id="security_radial"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(178 98) rotate(90) scale(98 178)"
                    >
                        <stop stopColor={color} stopOpacity="0.25" />
                        <stop offset="0.34" stopColor={color} stopOpacity="0.15" />
                        <stop offset="1" stopOpacity="0" />
                    </radialGradient>
                </defs>
            </svg>
        </div>
    );
};

const GridLayer: React.FC<{ color: string }> = ({ color }) => {
    return (
        <div
            style={{ "--grid-color": color } as React.CSSProperties}
            className="pointer-events-none absolute inset-0 z-4 h-full w-full bg-transparent bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-size-[20px_20px] bg-center opacity-70 mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"
        />
    );
};

interface LayerProps {
    color: string;
    secondaryColor?: string;
}

const DonutChart: React.FC<LayerProps> = ({ color, secondaryColor }) => {
    const mainProgress = 66;
    const secondaryProgress = 100;

    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const mainDashoffset = circumference - (mainProgress / 100) * circumference;
    const secondaryDashoffset = circumference - (secondaryProgress / 100) * circumference;

    return (
        <div className="absolute inset-0 z-7 flex items-center justify-center -translate-y-[20px] scale-110">
            <div className="relative flex h-[120px] w-[120px] items-center justify-center text-white">
                <svg width="120" height="120" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r={radius} stroke="currentColor" strokeWidth="10" fill="transparent" opacity={0.2} />
                    <circle
                        cx="50" cy="50" r={radius}
                        stroke={secondaryColor}
                        strokeWidth="14" fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={secondaryDashoffset}
                        transform="rotate(-90 50 50)"
                    />
                    <circle
                        cx="50" cy="50" r={radius}
                        stroke={color}
                        strokeWidth="14" fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={mainDashoffset}
                        transform="rotate(-90 50 50)"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-white">
                        {secondaryProgress}%
                    </span>
                </div>
            </div>
        </div>
    );
};

const FloatingTags: React.FC<LayerProps> = ({ color, secondaryColor }) => {
    const items = [
        { id: 1, translateX: "90", translateY: "45", text: "SSL" },
        { id: 2, translateX: "90", translateY: "-45", text: "HTTPS" },
        { id: 3, translateX: "110", translateY: "0", text: "Firewall" },
        { id: 4, translateX: "-110", translateY: "0", text: "Auth" },
        { id: 5, translateX: "-90", translateY: "45", text: "Backup" },
        { id: 6, translateX: "-90", translateY: "-45", text: "DDoS" },
    ];

    return (
        <div className="absolute inset-0 z-7 flex items-center justify-center">
            {items.map((item, index) => (
                <div
                    key={item.id}
                    className="absolute flex items-center justify-center gap-1 rounded-full border border-gray-700 bg-black/70 px-1.5 py-0.5 backdrop-blur-sm"
                    style={{
                        transform: `translate(${item.translateX}px, ${item.translateY}px)`,
                    }}
                >
                    <div
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: index < 3 ? color : secondaryColor }}
                    />
                    <span className="ml-1 text-[10px] text-white">{item.text}</span>
                </div>
            ))}
        </div>
    );
};
