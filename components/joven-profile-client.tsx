'use client';

import { Joven } from "@/types";
import Link from "next/link";
import { ArrowLeft, Sparkles, Zap, Heart, Star } from "lucide-react";
import { DivineAura } from "@/components/divine-aura";
import { RepowerButton } from "@/components/repower-button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function JovenProfileClient({ joven }: { joven: Joven }) {
    const [isRepowered, setIsRepowered] = useState(false);

    // Split name for styling
    const names = joven.data.nombre.split(" ");
    const firstName = names[0];
    const lastName = names.slice(1).join(" ");

    return (
        <main className="relative min-h-screen w-full overflow-hidden bg-zinc-950 text-white selection:bg-accent selection:text-black">
            {/* Dynamic Background - Repowered changes background too */}
            <div className={`absolute inset-0 transition-all duration-1000 ${isRepowered ? 'bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-500/30 via-zinc-900 to-zinc-950' : 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950 to-zinc-950'} z-0 pointer-events-none`} />

            <div className="absolute top-0 right-0 p-12 opacity-20 font-display text-9xl font-bold leading-none text-outline z-0 select-none">
                {firstName}
            </div>

            <div className="relative z-10 container mx-auto px-6 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                {/* Navigation */}
                <Link href="/" className="absolute top-8 left-6 md:left-12 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-mono text-xs uppercase tracking-widest">Volver</span>
                </Link>

                {/* Hero Image Section */}
                <div className="lg:col-span-5 relative group">
                    <div className="sticky top-24">
                        <div className={`relative aspect-[4/5] overflow-hidden rounded-sm border transition-all duration-1000 ${isRepowered ? 'border-white/50 shadow-[0_0_30px_rgba(255,255,255,0.1)]' : 'border-white/10 bg-zinc-900'}`}>

                            <DivineAura
                                src={joven.realImage}
                                alt={joven.data.nombre}
                                className="h-full w-full"
                                isActive={isRepowered}
                            />

                            {/* Holographic Frame Details - Fade out when repowered for cleaner look */}
                            <div className={`absolute top-4 left-4 w-2 h-2 bg-white z-30 transition-opacity ${isRepowered ? 'opacity-50' : 'opacity-100'}`}></div>
                            <div className={`absolute top-4 right-4 w-2 h-2 bg-white z-30 transition-opacity ${isRepowered ? 'opacity-50' : 'opacity-100'}`}></div>
                            <div className={`absolute bottom-4 left-4 w-2 h-2 bg-white z-30 transition-opacity ${isRepowered ? 'opacity-50' : 'opacity-100'}`}></div>
                            <div className={`absolute bottom-4 right-4 w-2 h-2 bg-white z-30 transition-opacity ${isRepowered ? 'opacity-50' : 'opacity-100'}`}></div>

                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/50 tracking-[0.3em] z-30">
                                SUBJ: {joven.slug.toUpperCase()}
                            </div>
                        </div>

                        {/* Avatar Orbit */}
                        <div className="absolute -bottom-10 -right-6 lg:-right-12 h-32 w-32 md:h-40 md:w-40 z-50 rounded-full border border-white/10 p-2 glass-panel animate-float">
                            <div className="h-full w-full rounded-full overflow-hidden border border-white/20">
                                <img src={joven.avatarImage} className="h-full w-full object-cover" alt="Avatar" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Specs / Data Section */}
                <div className="lg:col-span-7 flex flex-col justify-center">

                    <div className="mb-8">
                        <motion.h1
                            className="font-display text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.8]"
                            animate={isRepowered ? { textShadow: "0 0 40px rgba(255,255,255,0.3)" } : {}}
                        >
                            <span className={`block text-transparent bg-clip-text transition-all duration-1000 ${isRepowered ? 'bg-gradient-to-r from-white via-indigo-200 to-white' : 'bg-gradient-to-r from-white to-zinc-500'}`}>
                                {firstName}
                            </span>
                            <span className="block text-2xl md:text-4xl lg:text-5xl text-indigo-500 tracking-normal font-sans font-medium mt-2">{lastName}</span>
                        </motion.h1>

                        <p className="mt-8 text-xl md:text-2xl text-zinc-300 font-light max-w-2xl leading-relaxed border-l-2 border-primary pl-6">
                            "{joven.data.descripcion}"
                        </p>
                    </div>

                    {/* REPOWER BUTTON */}
                    <div className="mb-12 flex justify-start">
                        <RepowerButton
                            isActive={isRepowered}
                            onClick={() => setIsRepowered(!isRepowered)}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Card: Archetype */}
                        <div className="glass-card p-6 rounded-xl transition-all duration-500 hover:bg-white/5">
                            <div className="flex items-center gap-3 mb-4 text-primary">
                                <Star className={`w-5 h-5 transition-all duration-500 ${isRepowered ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]' : ''}`} />
                                <h3 className="font-mono text-xs uppercase tracking-widest">Arquetipo</h3>
                            </div>
                            <p className="text-2xl font-display font-bold">{joven.data.avatarNombre}</p>
                            <p className="text-sm text-zinc-500 mt-2 italic">"{joven.data.fraseEmblema}"</p>
                        </div>

                        {/* Card: Role */}
                        <div className="glass-card p-6 rounded-xl transition-all duration-500 hover:bg-white/5">
                            <div className="flex items-center gap-3 mb-4 text-secondary">
                                <Zap className={`w-5 h-5 transition-all duration-500 ${isRepowered ? 'text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]' : ''}`} />
                                <h3 className="font-mono text-xs uppercase tracking-widest">Función Táctica</h3>
                            </div>
                            <p className="text-xl font-bold">{joven.data.rolEnElEquipo}</p>
                        </div>

                        {/* Card: Stats/Qualities */}
                        <div className="glass-card p-6 rounded-xl md:col-span-2">
                            <div className="flex items-center gap-3 mb-6 text-accent">
                                <Heart className={`w-5 h-5 transition-all duration-500 ${isRepowered ? 'text-pink-400 drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]' : ''}`} />
                                <h3 className="font-mono text-xs uppercase tracking-widest">Cualidades & Habilidades</h3>
                            </div>

                            <div className="flex flex-wrap gap-3 mb-8">
                                {joven.data.cualidadesPrincipales.map((c, i) => (
                                    <motion.span
                                        key={i}
                                        className={`relative px-4 py-2 rounded-full border text-sm transition-all duration-500 cursor-default overflow-hidden ${isRepowered
                                                ? 'bg-white/10 border-white/40 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                                                : 'bg-white/5 border-white/10 hover:bg-white/10'
                                            }`}
                                        animate={isRepowered ? {
                                            scale: 1.05,
                                            boxShadow: "0 0 15px rgba(255,255,255,0.2)"
                                        } : { scale: 1, boxShadow: "none" }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        {/* Skill Upgrade Shine effect */}
                                        {isRepowered && (
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                                                animate={{ x: ['-200%', '200%'] }}
                                                transition={{ repeat: Infinity, duration: 2, delay: i * 0.2, ease: "easeInOut" }}
                                            />
                                        )}
                                        <span className="relative z-10">{c}</span>
                                    </motion.span>
                                ))}
                            </div>

                            <div className={`p-4 rounded-lg transition-all duration-700 ${isRepowered ? 'bg-indigo-500/20 border border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.15)]' : 'bg-accent/5 border border-accent/20'}`}>
                                <h4 className={`text-sm font-bold mb-1 transition-colors ${isRepowered ? 'text-indigo-300' : 'text-accent'}`}>
                                    {isRepowered ? "HABILIDAD POTENCIADA" : "HABILIDAD ESPECIAL"}
                                </h4>
                                <motion.p
                                    className="text-zinc-300"
                                    animate={isRepowered ? { color: "#ffffff" } : { color: "#d4d4d8" }}
                                >
                                    {joven.data.habilidadEspecial}
                                </motion.p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
