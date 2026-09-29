// @ts-check
import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';
import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // <link rel="canonical"> and the hreflang alternates are built from this.
  // Must match public/CNAME.
  site: 'https://niamkovich.dev',
  i18n: {
    defaultLocale: 'be',
    locales: ['be', 'en'],
    routing: {
      // "/" is Belarusian, "/en/" is English.
      prefixDefaultLocale: false,
    },
  },
  integrations: [react()],
  markdown: {
    // No syntax highlighting for blog code blocks.
    syntaxHighlight: false,
  },
  vite: {
    // cv.yaml lives at the repo root and is imported as a module, so editing it
    // hot-reloads the dev server instead of requiring a restart.
    plugins: [yaml(), tailwindcss()],
  },
});
