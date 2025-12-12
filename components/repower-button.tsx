'use client';

import { motion } from "framer-motion";
import { Flame } from "lucide-react";

interface RepowerButtonProps {
    isActive: boolean;
    onClick: () => void;
}

export function RepowerButton({ isActive, onClick }: RepowerButtonProps) {
    return (
        <motion.button
            onClick={onClick}
            className={`relative group flex items-center gap-3 px-8 py-4 rounded-full border transition-all duration-500 ${isActive
                    ? 'bg-white text-black border-white shadow-[0_0_40px_rgba(255,255,255,0.6)]'
                    : 'bg-black/40 text-white/80 border-white/20 hover:border-white/60 hover:text-white hover:bg-black/60'
                }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {/* Inner Glow when active */}
            {isActive && (
                <div className="absolute inset-0 rounded-full bg-white blur-md -z-10" />
            )}

            <div className={`relative p-2 rounded-full transition-colors duration-500 ${isActive ? 'bg-indigo-500 text-white' : 'bg-white/10 text-zinc-400 group-hover:bg-white/20 group-hover:text-white'}`}>
                <Flame className={`w-5 h-5 ${isActive ? 'fill-current' : ''}`} />
            </div>

            <div className="flex flex-col items-start px-2">
                <span className="text-xs font-mono uppercase tracking-widest opacity-60">Sistema</span>
                <span className="font-display font-bold uppercase tracking-wider text-sm">
                    {isActive ? "Espíritu Activo" : "Repotenciar"}
                </span>
            </div>

            {/* Holy Particles on Button */}
            {isActive && (
                <>
                    <motion.div
                        className="absolute -top-2 -right-2 w-2 h-2 bg-white rounded-full blur-[2px]"
                        animate={{ y: -20, opacity: 0 }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-blue-400 rounded-full blur-[1px]"
                        animate={{ y: -15, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    />
                </>
            )}
        </motion.button>
    );
}
