// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Za sopstveni domen: site postaviti na npr. 'https://www.ordinacijaskoric.rs', a base na '/'
export default defineConfig({
  site: 'https://lukovicsreten.github.io',
  base: '/drskoric',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
