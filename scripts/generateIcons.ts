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
  { name: 'favicon-16x16.png', size: 16 }
];

const createInitialsSVG = (size: number) => `
  <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#2B3A67;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1B1B3A;stop-opacity:1" />
      </linearGradient>
      <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#FFA500;stop-opacity:1" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <!-- Fond avec coins arrondis -->
    <rect width="${size}" height="${size}" fill="url(#bgGrad)" rx="${size * 0.2}" />

    <!-- K stylisé -->
    <path 
      d="
        M${size * 0.3} ${size * 0.25}
        L${size * 0.3} ${size * 0.75}
        M${size * 0.3} ${size * 0.5}
        L${size * 0.7} ${size * 0.25}
        M${size * 0.3} ${size * 0.5}
        L${size * 0.7} ${size * 0.75}
      "
      stroke="url(#accentGrad)"
      stroke-width="${size * 0.08}"
      stroke-linecap="round"
      fill="none"
      filter="url(#glow)"
    />

    <!-- Éléments décoratifs -->
    <circle 
      cx="${size * 0.7}" 
      cy="${size * 0.3}" 
      r="${size * 0.05}" 
      fill="url(#accentGrad)"
      filter="url(#glow)"
    />
    
    <!-- Ligne décorative -->
    <path
      d="M${size * 0.2} ${size * 0.85} L${size * 0.8} ${size * 0.85}"
      stroke="url(#accentGrad)"
      stroke-width="${size * 0.02}"
      stroke-linecap="round"
      opacity="0.6"
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
      const svg = createInitialsSVG(size);
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