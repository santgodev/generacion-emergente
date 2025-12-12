'use client';

import { motion } from "framer-motion";

export function TitleSection({ count }: { count: number }) {
    return (
        <header className="relative z-10 text-center flex flex-col items-center justify-center min-h-[40vh]">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
            >
                <h1 className="font-display text-[13vw] leading-[0.8] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20 mix-blend-overlay opacity-90 select-none">
                    YAHWEH
                </h1>
                <div className="relative mt-4 md:absolute md:mt-0 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full text-center">
                    <span className="block text-sm md:text-3xl text-primary font-display font-bold tracking-[0.6em] uppercase blur-[1px]">Generación Emergente</span>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="mt-8 flex items-center gap-4"
            >
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50"></span>
                <p className="text-sm md:text-base font-mono text-zinc-400 uppercase tracking-widest">
                    {count} Agentes Activos
                </p>
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50"></span>
            </motion.div>
        </header>
    );
}
