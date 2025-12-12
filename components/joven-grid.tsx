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
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 auto-rows-[300px]">
            {activeJovenes.map((joven, index) => {
                const isTall = index % 3 === 0;
                const isHovered = hoveredIndex === index;

                // Relevance Calculation
                // If a deletion occurred, items closer to the "void" (lastDeletedIndex) lose saturation
                let relevance = 1;
                if (lastDeletedIndex !== -1) {
                    const distance = Math.abs(index - lastDeletedIndex);
                    // Items that slide INTO the position (distance 0) are most affected
                    // Gradient: 0 -> 0.2 relevance, 4 -> 1.0 relevance
                    relevance = Math.min(1, 0.2 + (distance * 0.25));
                }

                return (
                    <motion.div
                        key={joven.slug} // Keep slug as key to help React track identity
                        layout // Animate layout changes when items are removed
                        className={`${isTall ? "sm:row-span-2" : "row-span-1"} relative transition-all duration-200 ${isHovered ? 'z-50' : 'z-auto'}`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        animate={{
                            // scale: isHovered ? 1.05 : 1, // Removed to avoid double zoom (inner image already zooms)
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <JovenCard
                            joven={joven}
                            index={index}
                            onDelete={() => handleDelete(joven.slug, index)}
                            relevance={relevance}
                        />
                    </motion.div>
                );
            })}
        </div>
    );
}
