export interface Joven {
    slug: string; // Folder name (e.g., "Juan_Perez")
    realImage: string; // Path to real image
    avatarImage: string; // Path to avatar image
    data: JovenData;
}

export interface JovenData {
    nombre: string;
    avatarNombre: string;
    descripcion: string;
    cualidadesPrincipales: string[];
    habilidadEspecial: string;
    fraseEmblema: string;
    rolEnElEquipo: string;
    // New Fields
    transformacion?: string;
    promesaBiblica?: string;
    flipCard?: {
        tipo: string;
        contenido: string;
    };
}
