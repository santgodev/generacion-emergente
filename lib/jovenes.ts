import fs from 'fs';
import path from 'path';
import { Joven } from '@/types';

const JOVENES_DIR = path.join(process.cwd(), 'public', 'jovenes');

export function getJovenes(): Joven[] {
    if (!fs.existsSync(JOVENES_DIR)) {
        return [];
    }

    const folders = fs.readdirSync(JOVENES_DIR).filter((folder) => {
        const folderPath = path.join(JOVENES_DIR, folder);
        return fs.statSync(folderPath).isDirectory();
    });

    const jovenes: Joven[] = folders
        .map((folder) => {
            const folderPath = path.join(JOVENES_DIR, folder);
            const jsonPath = path.join(folderPath, 'perfil.json');

            if (!fs.existsSync(jsonPath)) {
                return null;
            }

            try {
                const fileContent = fs.readFileSync(jsonPath, 'utf8');
                const data = JSON.parse(fileContent);

                // Dynamic Image Finding
                let imagePath = 'https://placehold.co/400x600/101012/6366f1?text=SIN+FOTO';

                if (fs.existsSync(folderPath)) {
                    const files = fs.readdirSync(folderPath);
                    const imageFile = files.find(file => /\.(png|jpg|jpeg|webp)$/i.test(file) && !file.includes('qr.png'));

                    if (imageFile) {
                        imagePath = `/jovenes/${folder}/${imageFile}`;
                    }
                }

                return {
                    slug: folder,
                    realImage: imagePath,
                    avatarImage: imagePath, // Same image for both as requested
                    data: data,
                };
            } catch (e) {
                console.error(`Error reading data for ${folder}`, e);
                return null;
            }
        })
        .filter((j) => j !== null) as Joven[];

    return jovenes;
}

export function getJovenBySlug(slug: string): Joven | null {
    const all = getJovenes();
    return all.find((j) => j.slug === slug) || null;
}
