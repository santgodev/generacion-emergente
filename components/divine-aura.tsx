'use client';

import { motion } from "framer-motion";

export function DivineAura({ src, alt, className, isActive = false }: { src: string; alt: string; className?: string; isActive?: boolean }) {
    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Ambient Glow Backend - White/Blue/Gold */}
            <motion.div
                className="absolute inset-0 bg-blue-500/20 z-0 blur-2xl mixture-blend-screen"
                animate={isActive ? {
                    opacity: [0.2, 0.6, 0.2],
                    scale: [0.9, 1.1, 0.9],
                    backgroundColor: ["rgba(59, 130, 246, 0.2)", "rgba(255, 215, 0, 0.15)", "rgba(59, 130, 246, 0.2)"]
                } : {
                    opacity: 0
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Main Image with Enhanced Clarity */}
            <motion.img
                src={src}
                alt={alt}
                className="relative z-10 w-full h-full object-cover"
                initial={{ filter: "grayscale(100%) brightness(0.8) contrast(1)" }}
                animate={isActive ? {
                    filter: "grayscale(0%) brightness(1.2) contrast(1.1)",
                    scale: 1.05
                } : {
                    filter: "grayscale(100%) brightness(0.9) contrast(1)",
                    scale: 1
                }}
                transition={{ duration: 1.5 }}
            />

            {/* Descending Holy Light Beam - Triggered on Repower */}
            {isActive && (
                <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-full bg-gradient-to-b from-white via-indigo-100/30 to-transparent z-20 mix-blend-soft-light pointer-events-none"
                    initial={{ y: "-100%", opacity: 0 }}
                    animate={{ y: ["-100%", "20%"], opacity: [0, 1, 0] }}
                    transition={{
                        duration: 2.5,
                        ease: "easeOut",
                        times: [0, 0.5, 1]
                    }}
                />
            )}

            {/* Continuous Divine Shine */}
            <motion.div
                className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-tr from-transparent via-white/20 to-transparent"
                animate={isActive ? {
                    opacity: [0, 0.4, 0],
                    backgroundPosition: ["0% 0%", "100% 100%"]
                } : { opacity: 0 }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Particles - Only when active */}
            {isActive && [...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-white rounded-full z-20 blur-[1px] shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                    style={{
                        width: Math.random() * 3 + 1,
                        height: Math.random() * 3 + 1,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -60],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0]
                    }}
                    transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 1,
                        ease: "easeOut"
                    }}
                />
            ))}
        </div>
    );
}
