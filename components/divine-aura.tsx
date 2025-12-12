'use client';

import { motion } from "framer-motion";

export function DivineAura({ src, alt, className }: { src: string; alt: string; className?: string }) {
    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Ambient Glow Backend */}
            <motion.div
                className="absolute inset-0 bg-indigo-500/20 z-0 blur-2xl"
                animate={{
                    opacity: [0.2, 0.5, 0.2],
                    scale: [0.9, 1.1, 0.9],
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
                className="relative z-10 w-full h-full object-cover grayscale-0 contrast-110 brightness-110"
                initial={{ filter: "grayscale(100%) brightness(1)" }}
                animate={{ filter: "grayscale(0%) brightness(1.2)" }}
                transition={{ duration: 1.5 }}
            />

            {/* Descending Holy Light Beam */}
            <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-full bg-gradient-to-b from-white/90 via-indigo-100/20 to-transparent z-20 mix-blend-soft-light pointer-events-none"
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: ["-100%", "20%"], opacity: [0, 1, 0] }}
                transition={{
                    duration: 2,
                    ease: "easeOut",
                    times: [0, 0.6, 1]
                }}
            />

            {/* Continuos Divine Shine */}
            <motion.div
                className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-transparent"
                animate={{
                    opacity: [0, 0.3, 0],
                    backgroundPosition: ["0% 0%", "100% 100%"]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Particles */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-white rounded-full z-20 blur-[1px]"
                    style={{
                        width: Math.random() * 4 + 1,
                        height: Math.random() * 4 + 1,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -100],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeOut"
                    }}
                />
            ))}
        </div>
    );
}
