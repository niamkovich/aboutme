// @ts-check
import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';

// https://astro.build/config
export default defineConfig({
  // Placeholder — set this to the real domain before deploying. It is what
  // <link rel="canonical"> and the hreflang alternates are built from.
  site: 'https://example.com',
  i18n: {
    defaultLocale: 'be',
    locales: ['be', 'en'],
    routing: {
      // "/" is Belarusian, "/en/" is English.
      prefixDefaultLocale: false,
    },
  },
  vite: {
    // cv.yaml lives at the repo root and is imported as a module, so editing it
    // hot-reloads the dev server instead of requiring a restart.
    plugins: [yaml()],
  },
});
