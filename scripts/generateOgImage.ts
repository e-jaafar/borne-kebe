import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createPhotoboothSVG } from './generateIcons';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '../public');

const createOgImageSVG = () => `
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1a0f2e;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#2d1f42;stop-opacity:1" />
      </linearGradient>
      <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#9333ea;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" />
      </linearGradient>
    </defs>

    <!-- Fond -->
    <rect width="1200" height="630" fill="url(#bgGrad)" />

    <!-- Motif décoratif -->
    <path d="M0,0 L1200,630 M1200,0 L0,630" stroke="rgba(147, 51, 234, 0.1)" stroke-width="2" />

    <!-- Logo Photobooth -->
    <g transform="translate(100, 165) scale(1.5)">
      ${createPhotoboothSVG(200).replace(/<svg[^>]*>|<\/svg>/g, '')}
    </g>

    <!-- Texte -->
    <text x="450" y="250" font-family="Arial" font-size="72" font-weight="bold" fill="#ffffff">
      Borne Kébè
    </text>
    <text x="450" y="350" font-family="Arial" font-size="36" fill="#9333ea">
      Location de Photobooth Professionnel
    </text>

    <!-- Sous-titre -->
    <text x="450" y="420" font-family="Arial" font-size="24" fill="rgba(255,255,255,0.8)">
      Qualité Studio • Partage Instantané • Personnalisation Complète
    </text>

    <!-- URL du site -->
    <text x="450" y="500" font-family="Arial" font-size="20" fill="rgba(255,255,255,0.6)">
      www.borne-kebe.com
    </text>
  </svg>
`;

async function generateOgImage() {
  try {
    const svg = createOgImageSVG();
    const outputPath = join(publicDir, 'og-image.jpg');

    await sharp(Buffer.from(svg))
      .jpeg({
        quality: 90,
        progressive: true,
      })
      .toFile(outputPath);

    console.log('Generated og-image.jpg');
  } catch (error) {
    console.error('Error generating OG image:', error);
    process.exit(1);
  }
}

generateOgImage(); 