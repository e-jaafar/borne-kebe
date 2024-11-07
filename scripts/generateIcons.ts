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
        <stop offset="0%" style="stop-color:#2D1B69;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1A0F2E;stop-opacity:1" />
      </linearGradient>
      <filter id="shadow">
        <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3"/>
      </filter>
      <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#E0E0E0;stop-opacity:1" />
      </linearGradient>
    </defs>
    
    <!-- Fond avec coins arrondis -->
    <rect width="${size}" height="${size}" fill="url(#bgGrad)" rx="${size * 0.2}" />
    
    <!-- Éléments photographiques stylisés -->
    <circle cx="${size * 0.5}" cy="${size * 0.5}" r="${size * 0.35}" 
      fill="none" 
      stroke="url(#textGrad)" 
      stroke-width="${size * 0.03}"
      opacity="0.2"
    />
    <circle cx="${size * 0.5}" cy="${size * 0.5}" r="${size * 0.25}" 
      fill="none" 
      stroke="url(#textGrad)" 
      stroke-width="${size * 0.02}"
      opacity="0.15"
    />
    
    <!-- Flash stylisé -->
    <path 
      d="M${size * 0.65} ${size * 0.3} L${size * 0.7} ${size * 0.4} L${size * 0.6} ${size * 0.45} L${size * 0.65} ${size * 0.6}"
      stroke="url(#textGrad)"
      stroke-width="${size * 0.02}"
      fill="none"
      opacity="0.3"
    />

    <!-- Texte KEBE -->
    <text
      x="50%"
      y="50%"
      font-family="Arial"
      font-size="${size * 0.25}"
      font-weight="900"
      text-anchor="middle"
      dominant-baseline="central"
      fill="url(#textGrad)"
      filter="url(#shadow)"
      style="letter-spacing: ${size * 0.01}px;"
    >KEBE</text>
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