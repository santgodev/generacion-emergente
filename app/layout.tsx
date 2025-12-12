import type { Metadata } from 'next'
import { Space_Grotesk, Syne } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })
const syne = Syne({ subsets: ['latin'], variable: '--font-syne' })

export const metadata: Metadata = {
    title: 'Jóvenes YAHWEH',
    description: 'Plataforma del grupo de jóvenes.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es" className="dark">
            <body className={cn(
                space.variable,
                syne.variable,
                "font-sans min-h-screen bg-zinc-950 selection:bg-primary selection:text-white overflow-x-hidden"
            )}>
                {/* Global Ambient Noise already in CSS */}

                {/* Global Ambient Glows */}
                <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[130px] rounded-full pointer-events-none -z-10 opacity-40 mix-blend-screen" />
                <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 blur-[150px] rounded-full pointer-events-none -z-10 opacity-30" />

                {children}
            </body>
        </html>
    )
}
