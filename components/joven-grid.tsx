'use client';

import { Joven } from "@/types";
import { JovenCard } from "./joven-card";
import { motion } from "framer-motion";
import { useState } from "react";

export function JovenGrid({ jovenes }: { jovenes: Joven[] }) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [deletedSlugs, setDeletedSlugs] = useState<string[]>([]);
    const [lastDeletedIndex, setLastDeletedIndex] = useState<number>(-1);

    // Filter out deleted items - preventing re-render issues by using a derived array
    const activeJovenes = jovenes.filter(j => !deletedSlugs.includes(j.slug));

    const handleDelete = (slug: string, index: number) => {
        setDeletedSlugs(prev => [...prev, slug]);
        setLastDeletedIndex(index);
    };

    return (
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 auto-rows-[250px]">
            {activeJovenes.map((joven, index) => {
                // Masonry Logic restored but controlled
                // We keep the "Tall" cards (index % 3 === 0) creates a nice rhythm.
                // BUT, to ensure the grid ends "mostly even", we force the last few items to be SHORT.
                // This prevents a tall card at the very end hanging down alone at the bottom.
                // increased buffer to 12 to cover the last ~2 rows, ensuring Natalia and others align perfectly.
                // User EXCEPTION: Natalia, Joshua, Santiago Avila, Daniel Burgos, and Maria Angelica must ALWAYS be tall.
                // Cristian must NEVER be tall (even if he falls on a mod 3 spot).
                const isTall = ((index % 3 === 0 && index < activeJovenes.length - 12 && joven.slug !== 'Cristian') ||
                    ['Natalia', 'Joshua', 'Santiago_Avila', 'Daniel_Burgos', 'Maria_Angelica'].includes(joven.slug));
                const isHovered = hoveredIndex === index;

                // Relevance Calculation
                let relevance = 1;
                if (lastDeletedIndex !== -1) {
                    const distance = Math.abs(index - lastDeletedIndex);
                    relevance = Math.min(1, 0.2 + (distance * 0.25));
                }

                return (
                    <motion.div
                        key={joven.slug}
                        layout
                        className={`${isTall ? "sm:row-span-2" : "row-span-1"} relative transition-all duration-200 ${isHovered ? 'z-50' : 'z-auto'}`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <JovenCard
                            joven={joven}
                            index={index}
                            isTall={isTall}
                            onDelete={() => handleDelete(joven.slug, index)}
                            relevance={relevance}
                        />
                    </motion.div>
                );
            })}
        </div>
    );
}
