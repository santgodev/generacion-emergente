const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Local IP Address (Verify this matches ipconfig)
const LOCAL_IP = '192.168.1.75';
const PORT = 3000;
const BASE_URL = `http://${LOCAL_IP}:${PORT}`;

const jovenesDir = path.join(__dirname, '../public/jovenes');

async function generateQRs() {
    console.log(`Generating QR Codes for Base URL: ${BASE_URL}`);

    try {
        const folders = fs.readdirSync(jovenesDir);

        for (const folder of folders) {
            const folderPath = path.join(jovenesDir, folder);

            // Check if it's a directory
            if (fs.statSync(folderPath).isDirectory()) {
                const slug = folder; // Using folder name as slug logic matches app
                const url = `${BASE_URL}/joven/${slug}`;
                const outputPath = path.join(folderPath, 'qr.png');

                await QRCode.toFile(outputPath, url, {
                    color: {
                        dark: '#000000',  // Blue dots
                        light: '#0000' // Transparent background
                    },
                    width: 300
                });

                console.log(`✅ QR Generated for ${slug}: ${url}`);
            }
        }
        console.log('\n✨ All QR Codes generated successfully!');
    } catch (err) {
        console.error('Error generating QRs:', err);
    }
}

generateQRs();
