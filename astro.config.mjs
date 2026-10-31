// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Isti kod radi na dva mesta:
//  - GitHub Pages: https://lukovicsreten.github.io/drskoric/  (base „/drskoric“)
//  - Vercel: sajt je na korenu domena (base „/“); Vercel pri build-u postavlja promenljivu VERCEL=1
// Za sopstveni domen: site postaviti na npr. 'https://www.ordinacijaskoric.rs', a base na '/'
const onVercel = Boolean(process.env.VERCEL);
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export default defineConfig({
  site: onVercel && vercelUrl ? `https://${vercelUrl}` : 'https://lukovicsreten.github.io',
  base: onVercel ? '/' : '/drskoric',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
