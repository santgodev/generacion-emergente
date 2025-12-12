import { getJovenBySlug, getJovenes } from "@/lib/jovenes";
import { notFound } from "next/navigation";
import Link from "next/link";
import { JovenProfileClient } from "@/components/joven-profile-client";
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

    return <JovenProfileClient joven={joven} />;
}
