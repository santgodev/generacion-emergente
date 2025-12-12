const fs = require('fs');
const path = require('path');

const nombres = [
    "Salome",
    "Joyce",
    "Camilo",
    "Gisell",
    "Karen",
    "Evelyn",
    "Daniel Burgos",
    "Juan Pablo",
    "Camila",
    "Sofía Gutiérrez",
    "Joshua",
    "Valentina Toro",
    "Juan Andrés",
    "Santiago Ávila",
    "Alejandra",
    "Derek",
    "Jampier",
    "Sofía Tique",
    "Laura Rojas",
    "Laura O",
    "Valentina Paba",
    "Santiago G",
    "Yisell",
    "Cristian",
    "María Angélica",
    "Diego",
    "Natalia"
];

const template = {
    "nombre": "",
    "avatarNombre": "Brisa Serena",
    "descripcion": "Brisa Serena es una joven que transforma ambientes sin esfuerzos. Su calma inspira confianza, y su manera de hablar da seguridad a quienes la rodean.",
    "cualidadesPrincipales": [
        "Serenidad",
        "Paciencia",
        "Escucha activa",
        "Sensibilidad"
    ],
    "habilidadEspecial": "Eco del Consuelo: Es capaz de transmitir paz incluso en los momentos más tensos.",
    "fraseEmblema": "Lo suave también sostiene.",
    "rolEnElEquipo": "Equilibradora emocional"
};

const baseDir = path.join(__dirname, '..', 'public', 'jovenes');

if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
}

function normalizeName(name) {
    return name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove accents
        .replace(/\s+/g, "_"); // Replace spaces with underscores
}

nombres.forEach(nombre => {
    const folderName = normalizeName(nombre);
    const dirPath = path.join(baseDir, folderName);

    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
        console.log(`Created folder: ${folderName}`);
    }

    const jsonPath = path.join(dirPath, 'perfil.json');
    const profileData = { ...template, nombre: nombre }; // Set the real name in the JSON

    fs.writeFileSync(jsonPath, JSON.stringify(profileData, null, 2));
    console.log(`Created perfil.json for: ${nombre}`);
});

console.log('Done generating profiles!');
