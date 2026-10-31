// Pravi favicone iz monogram logoa (src/assets/images/logo-monogram.png).
// Iseca samo zub sa slovom „Š“, jer je ceo logo sa natpisom nečitljiv na 16–32 px.
// Pokretanje: npm run favicons
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const SRC = 'src/assets/images/logo-monogram.png';
const OUT = 'public';
const BG = { r: 15, g: 42, b: 61, alpha: 1 }; // #0F2A3D

// Pronađi granice svetlog obrisa zuba (gornji deo slike, iznad natpisa)
const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
let minX = info.width, minY = info.height, maxX = 0, maxY = 0;
for (let y = 0; y < 350; y++) {
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * info.channels;
    if (data[i] + data[i + 1] + data[i + 2] > 300) {
      minX = Math.min(minX, x); maxX = Math.max(maxX, x);
      minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    }
  }
}
const size = Math.round(Math.max(maxX - minX, maxY - minY) * 1.3);
const left = Math.round((minX + maxX) / 2 - size / 2);
const top = Math.round((minY + maxY) / 2 - size / 2);
const square = await sharp(SRC).extract({ left, top, width: size, height: size }).png().toBuffer();

const render = (px) => sharp(square).resize(px, px).flatten({ background: BG }).png().toBuffer();

const files = { 'favicon-16x16.png': 16, 'favicon-32x32.png': 32, 'apple-touch-icon.png': 180, 'icon-192.png': 192, 'icon-512.png': 512 };
for (const [name, px] of Object.entries(files)) writeFileSync(`${OUT}/${name}`, await render(px));

// favicon.ico sa 16, 32 i 48 px (PNG unosi unutar ICO kontejnera)
const icoSizes = [16, 32, 48];
const pngs = await Promise.all(icoSizes.map(render));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(pngs.length, 4);
let offset = 6 + 16 * pngs.length;
const entries = pngs.map((png, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(icoSizes[i], 0); e.writeUInt8(icoSizes[i], 1);
  e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6);
  e.writeUInt32LE(png.length, 8); e.writeUInt32LE(offset, 12);
  offset += png.length;
  return e;
});
writeFileSync(`${OUT}/favicon.ico`, Buffer.concat([header, ...entries, ...pngs]));

console.log('Favicon fajlovi su napravljeni u public/.');
