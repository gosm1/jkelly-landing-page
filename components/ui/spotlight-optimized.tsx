"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const SpotlightOptimized = () => {
    return (
        <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden">
            <style jsx>{`
                @keyframes spotlight-move-left {
                    0% { transform: translateX(0) translateY(-350px) rotate(-45deg); opacity: 0; }
                    50% { transform: translateX(100px) translateY(-350px) rotate(-45deg); opacity: 1; }
                    100% { transform: translateX(0) translateY(-350px) rotate(-45deg); opacity: 0; }
                }
                @keyframes spotlight-move-right {
                    0% { transform: translateX(0) translateY(-350px) rotate(45deg); opacity: 0; }
                    50% { transform: translateX(-100px) translateY(-350px) rotate(45deg); opacity: 1; }
                    100% { transform: translateX(0) translateY(-350px) rotate(45deg); opacity: 0; }
                }
                .spotlight-left {
                    animation: spotlight-move-left 7s ease-in-out infinite;
                }
                .spotlight-right {
                    animation: spotlight-move-right 7s ease-in-out infinite;
                }
            `}</style>

            {/* Left Beam */}
            <div className="spotlight-left absolute top-0 left-0 w-screen h-screen">
                <div
                    className="absolute top-0 left-0 w-[560px] h-[1380px]"
                    style={{ background: "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 80%)" }}
                />
            </div>

            {/* Right Beam */}
            <div className="spotlight-right absolute top-0 right-0 w-screen h-screen">
                <div
                    className="absolute top-0 right-0 w-[560px] h-[1380px]"
                    style={{ background: "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 80%)" }}
                />
            </div>
        </div>
    );
};
