'use client';

import Image from "next/image";

import { Joven } from "@/types";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";

export function JovenCard({ joven, index, onDelete, relevance = 1, isTall = false }: { joven: Joven; index: number; onDelete?: () => void; relevance?: number; isTall?: boolean }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    // Interactive Visuals based on Relevance
    // If relevance is 1, standard. If 0 (closest to deleted), descaturated and dim.
    const saturation = relevance * 1; // 0 to 1
    const lightness = 0.5 + (relevance * 0.5); // 0.5 to 1

    const hasRelevanceLost = relevance < 1;

    // Staggered grid height removed for uniform alignment

    const spotlightBg = useMotionTemplate`
        radial-gradient(
            650px circle at ${mouseX}px ${mouseY}px,
            rgba(99, 102, 241, 0.15),
            transparent 80%
        )
    `;

    return (
        <div className={`group/card block relative h-full w-full`}> {/* Wrapper to handle click propagation issues if we used Link directly as root */}

            {/* Delete Button - Only visible on hover */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDelete?.();
                }}
                className="absolute -top-2 -right-2 z-[60] h-8 w-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity shadow-lg backdrop-blur-sm scale-90 group-hover/card:scale-100 duration-300"
                title="Eliminar Agente"
            >
                ✕
            </button>

            <Link href={`/joven/${joven.slug}`} className="block h-full w-full">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        filter: hasRelevanceLost ? `grayscale(${100 - (saturation * 100)}%) opacity(${lightness})` : `grayscale(0%) opacity(1)`
                    }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    onMouseMove={handleMouseMove}
                    className={`group relative h-full w-full overflow-hidden rounded-2xl border bg-zinc-900/50 backdrop-blur-sm transition-all duration-500 ${hasRelevanceLost ? 'border-zinc-800' : 'border-white/5 hover:border-primary/50'}`}
                >
                    {/* Spotlight Effect - Hidden if lost relevance */}
                    {!hasRelevanceLost && (
                        <motion.div
                            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                            style={{
                                background: spotlightBg,
                            }}
                        />
                    )}

                    <div className={`relative w-full overflow-hidden ${isTall ? 'aspect-[3/5]' : 'aspect-[3/4]'}`}>
                        <Image
                            src={joven.realImage}
                            alt={joven.data.nombre}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className={`h-full w-full object-cover transition-transform duration-700 ${!hasRelevanceLost ? 'group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0' : ''}`}
                            onError={(e) => {
                                // Fallback for next/image is handled differently, often just visually broken if fails.
                                // We'll rely on the valid data for now since direct img manipulation on error is not same.
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

                        {/* Avatar floating */}
                        <div className="absolute top-4 right-4 h-12 w-12 overflow-hidden rounded-full border border-white/20 bg-black/50 backdrop-blur-md">
                            <img src={joven.avatarImage} className="h-full w-full object-cover" alt="Avatar" />
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full p-6">
                        <motion.div
                            initial={{ y: 0 }}
                            whileHover={!hasRelevanceLost ? { y: -5 } : {}}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <h3 className={`font-display text-2xl font-bold uppercase tracking-wide drop-shadow-lg transition-colors ${hasRelevanceLost ? 'text-zinc-500' : 'text-white group-hover:text-primary'}`}>
                                {joven.data.nombre}
                            </h3>
                            {/* Status Line */}
                            <div className={`mt-2 h-0.5 w-12 transition-all duration-300 ${hasRelevanceLost ? 'bg-zinc-800 w-full' : 'bg-secondary opacity-0 group-hover:w-full group-hover:opacity-100'}`} />

                            <p className={`mt-2 text-sm transition-all duration-300 delay-75 line-clamp-2 ${hasRelevanceLost ? 'text-zinc-600 opacity-100 translate-y-0' : 'text-zinc-400 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                                {joven.data.fraseEmblema}
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </Link>
        </div>
    );
}
