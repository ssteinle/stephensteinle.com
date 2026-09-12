/**
 * Generates the raster brand assets that cannot be served as SVG.
 *
 * The Open Graph image has to be a raster because most social platforms refuse
 * SVG, and a missing og:image is what makes a shared link render as a blank
 * box. See Section 17.
 *
 * Run with: node scripts/generate-assets.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const publicDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

const FONT = 'DejaVu Sans, system-ui, sans-serif';
const INK = '#fdfdfc';
const MUTED = '#a9c3dc';
const BACKDROP = '#131315';
const ACCENT = '#1b4d7e';

const ogImage = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BACKDROP}"/>
  <rect x="0" y="0" width="1200" height="8" fill="${ACCENT}"/>
  <text x="90" y="270" font-family="${FONT}" font-size="82" font-weight="bold" fill="${INK}">Stephen Steinle</text>
  <text x="90" y="345" font-family="${FONT}" font-size="36" fill="${MUTED}">Ph.D. Researcher in Computer Science</text>
  <text x="90" y="395" font-family="${FONT}" font-size="36" fill="${MUTED}">and Artificial Intelligence</text>
  <text x="90" y="500" font-family="${FONT}" font-size="26" fill="#7a7a72">University of South Florida</text>
  <text x="90" y="540" font-family="${FONT}" font-size="26" fill="#7a7a72">Advancing Machine and Human Reasoning Lab</text>
</svg>`;

const touchIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="${ACCENT}"/>
  <text x="90" y="127" font-family="${FONT}" font-size="110" font-weight="bold" fill="${INK}" text-anchor="middle">S</text>
</svg>`;

await mkdir(publicDir, { recursive: true });

await sharp(Buffer.from(ogImage)).png({ compressionLevel: 9 }).toFile(join(publicDir, 'og-default.png'));
await sharp(Buffer.from(touchIcon)).png({ compressionLevel: 9 }).toFile(join(publicDir, 'apple-touch-icon.png'));

await writeFile(join(publicDir, 'favicon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="5" fill="${ACCENT}"/>
  <text x="16" y="23" font-family="${FONT}" font-size="20" font-weight="bold" fill="${INK}" text-anchor="middle">S</text>
</svg>
`);

console.log('Wrote og-default.png, apple-touch-icon.png, favicon.svg');
