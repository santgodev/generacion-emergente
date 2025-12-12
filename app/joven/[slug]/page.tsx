import { getJovenBySlug, getJovenes } from "@/lib/jovenes";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Sparkles, Zap, Heart, Star } from "lucide-react";
import { DivineAura } from "@/components/divine-aura";
import './style.css'; // We'll add a specific css file for this page's FX if needed or just use globals

export async function generateStaticParams() {
    const jovenes = getJovenes();
    return jovenes.map((joven) => ({
        slug: joven.slug,
    }));
}

export default function JovenPage({ params }: { params: { slug: string } }) {
    const joven = getJovenBySlug(params.slug);

    if (!joven) {
        notFound();
    }

    // Split name for styling
    const names = joven.data.nombre.split(" ");
    const firstName = names[0];
    const lastName = names.slice(1).join(" ");

    return (
        <main className="relative min-h-screen w-full overflow-hidden bg-zinc-950 text-white selection:bg-accent selection:text-black">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950 to-zinc-950 z-0 pointer-events-none" />
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
                        <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-white/10 bg-zinc-900">
                            {/* Glitch/Noise overlay on hover would go here in CSS */}
                            <DivineAura
                                src={joven.realImage}
                                alt={joven.data.nombre}
                                className="h-full w-full"
                            />

                            {/* Holographic Frame Details */}
                            <div className="absolute top-4 left-4 w-2 h-2 bg-white z-30"></div>
                            <div className="absolute top-4 right-4 w-2 h-2 bg-white z-30"></div>
                            <div className="absolute bottom-4 left-4 w-2 h-2 bg-white z-30"></div>
                            <div className="absolute bottom-4 right-4 w-2 h-2 bg-white z-30"></div>

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

                    <div className="mb-12">
                        <h1 className="font-display text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.8]">
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">{firstName}</span>
                            <span className="block text-2xl md:text-4xl lg:text-5xl text-indigo-500 tracking-normal font-sans font-medium mt-2">{lastName}</span>
                        </h1>
                        <p className="mt-8 text-xl md:text-2xl text-zinc-300 font-light max-w-2xl leading-relaxed border-l-2 border-primary pl-6">
                            "{joven.data.descripcion}"
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Card: Archetype */}
                        <div className="glass-card p-6 rounded-xl">
                            <div className="flex items-center gap-3 mb-4 text-primary">
                                <Star className="w-5 h-5" />
                                <h3 className="font-mono text-xs uppercase tracking-widest">Arquetipo</h3>
                            </div>
                            <p className="text-2xl font-display font-bold">{joven.data.avatarNombre}</p>
                            <p className="text-sm text-zinc-500 mt-2 italic">"{joven.data.fraseEmblema}"</p>
                        </div>

                        {/* Card: Role */}
                        <div className="glass-card p-6 rounded-xl">
                            <div className="flex items-center gap-3 mb-4 text-secondary">
                                <Zap className="w-5 h-5" />
                                <h3 className="font-mono text-xs uppercase tracking-widest">Función Táctica</h3>
                            </div>
                            <p className="text-xl font-bold">{joven.data.rolEnElEquipo}</p>
                        </div>

                        {/* Card: Stats/Qualities */}
                        <div className="glass-card p-6 rounded-xl md:col-span-2">
                            <div className="flex items-center gap-3 mb-6 text-accent">
                                <Heart className="w-5 h-5" />
                                <h3 className="font-mono text-xs uppercase tracking-widest">Cualidades & Habilidades</h3>
                            </div>

                            <div className="flex flex-wrap gap-3 mb-8">
                                {joven.data.cualidadesPrincipales.map((c, i) => (
                                    <span key={i} className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-sm hover:bg-white/10 transition-colors cursor-default">
                                        {c}
                                    </span>
                                ))}
                            </div>

                            <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
                                <h4 className="text-accent text-sm font-bold mb-1">HABILIDAD ESPECIAL</h4>
                                <p className="text-zinc-300">{joven.data.habilidadEspecial}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
