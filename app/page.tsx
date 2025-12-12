import { getJovenes } from "@/lib/jovenes";
import { TitleSection } from "@/components/title-section";
import { JovenGrid } from "@/components/joven-grid";

// This is a Server Component
export default function Home() {
    const jovenes = getJovenes();

    return (
        <main className="min-h-screen p-4 md:p-8 relative selection:bg-primary selection:text-white">
            {/* Floating Header / Nav */}
            <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass-panel px-6 py-3 rounded-full flex items-center gap-6">
                <span className="font-display font-bold text-white tracking-widest">YAHWEH</span>
                <div className="h-4 w-px bg-white/20"></div>
                <span className="text-xs text-zinc-400 uppercase tracking-widest">Jóvenes</span>
            </nav>

            <div className="max-w-[1600px] mx-auto pt-24 pb-20">
                <TitleSection count={jovenes.length} />

                <JovenGrid jovenes={jovenes} />

                {jovenes.length === 0 && (
                    <div className="text-center py-32 opacity-50 font-display text-xl border border-dashed border-white/10 rounded-xl mt-10">
                        [ SISTEMA : ESPERANDO DATOS ]
                    </div>
                )}
            </div>

            {/* Decorative Footer */}
            <footer className="fixed bottom-6 right-6 z-40">
                <div className="text-[10px] sm:text-xs font-mono text-zinc-600 flex flex-col items-end">
                    <span>YHW-SYS.VER.2.0</span>
                    <span>NEBULAR.SPIRIT</span>
                </div>
            </footer>
        </main>
    );
}
