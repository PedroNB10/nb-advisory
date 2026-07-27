// @ts-check
import { loadEnv } from 'vite';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// astro.config.mjs runs outside Vite's own env pipeline, so .env files are
// not merged into process.env here automatically — load them explicitly.
const { PUBLIC_SITE_URL } = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  // exactOptionalPropertyTypes forbids `site: undefined`, so omit the key entirely when unset.
  ...(PUBLIC_SITE_URL ? { site: PUBLIC_SITE_URL } : {}),
  trailingSlash: 'never',
  i18n: {
    locales: ['pt', 'en', 'es'],
    defaultLocale: 'pt',
    routing: {
      prefixDefaultLocale: true,
      // `/` redirects to `/pt` automatically — see `docs/decisions/`.
      redirectToDefaultLocale: true,
    },
  },
  integrations: [sitemap()],
});
