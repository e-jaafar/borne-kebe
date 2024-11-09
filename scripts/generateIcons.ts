import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '../public');

const sizes = [
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'apple-icon.png', size: 180 },
  { name: 'mstile-150x150.png', size: 150 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon.png', size: 32 }
];

export const createPhotoboothSVG = (size: number) => `
  <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1a0f2e;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#2d1f42;stop-opacity:1" />
      </linearGradient>
      <linearGradient id="lensGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#9333ea;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <filter id="innerShadow">
        <feOffset dx="0" dy="1"/>
        <feGaussianBlur stdDeviation="1"/>
        <feComposite operator="out" in="SourceGraphic"/>
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.7"/>
        </feComponentTransfer>
        <feBlend mode="multiply" in2="SourceGraphic"/>
      </filter>
    </defs>

    <!-- Fond avec coins arrondis -->
    <rect width="${size}" height="${size}" fill="url(#bgGrad)" rx="${size * 0.2}" />

    <!-- Corps du photobooth -->
    <rect 
      x="${size * 0.2}" 
      y="${size * 0.15}" 
      width="${size * 0.6}" 
      height="${size * 0.7}" 
      fill="url(#lensGrad)"
      rx="${size * 0.1}"
      filter="url(#glow)"
    />

    <!-- Objectif principal -->
    <circle 
      cx="${size * 0.5}" 
      cy="${size * 0.4}" 
      r="${size * 0.15}" 
      fill="#140b24"
      stroke="url(#lensGrad)"
      stroke-width="${size * 0.02}"
      filter="url(#glow)"
    />

    <!-- Reflet de l'objectif -->
    <circle 
      cx="${size * 0.5}" 
      cy="${size * 0.4}" 
      r="${size * 0.12}" 
      fill="none"
      stroke="rgba(255,255,255,0.2)"
      stroke-width="${size * 0.01}"
    />

    <!-- Flash -->
    <rect
      x="${size * 0.65}"
      y="${size * 0.25}"
      width="${size * 0.1}"
      height="${size * 0.1}"
      fill="#ffffff"
      rx="${size * 0.02}"
      filter="url(#glow)"
    />

    <!-- Bande décorative -->
    <rect
      x="${size * 0.2}"
      y="${size * 0.65}"
      width="${size * 0.6}"
      height="${size * 0.05}"
      fill="rgba(255,255,255,0.1)"
      rx="${size * 0.02}"
    />

    <!-- Sortie photo -->
    <rect
      x="${size * 0.35}"
      y="${size * 0.75}"
      width="${size * 0.3}"
      height="${size * 0.05}"
      fill="#140b24"
      rx="${size * 0.01}"
    />

    <!-- Effet de brillance -->
    <rect
      x="${size * 0.2}"
      y="${size * 0.15}"
      width="${size * 0.6}"
      height="${size * 0.1}"
      fill="rgba(255,255,255,0.1)"
      rx="${size * 0.05}"
    />
  </svg>
`;

async function generateIcons() {
  try {
    // Créer le dossier public s'il n'existe pas
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Générer les icônes PNG
    for (const { name, size } of sizes) {
      const svg = createPhotoboothSVG(size);
      const outputPath = join(publicDir, name);
      
      await sharp(Buffer.from(svg))
        .png()
        .toFile(outputPath);
      
      console.log(`Generated ${name}`);
    }

    // Copier le favicon-32x32.png vers favicon.ico
    const faviconSource = join(publicDir, 'favicon-32x32.png');
    const faviconDest = join(publicDir, 'favicon.ico');
    fs.copyFileSync(faviconSource, faviconDest);
    console.log('Generated favicon.ico');

  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons(); 