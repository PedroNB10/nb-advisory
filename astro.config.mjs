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
  integrations: [
    sitemap({
      // The bare root ("/") is a redirect-only stub, not a real page — exclude it.
      // (Per-page hreflang alternates are already emitted by BaseLayout via
      // getAlternateLinks() — the integration's own `i18n` option assumes the
      // default locale is served unprefixed at "/", which doesn't hold here
      // since `/pt` is the real page and "/" only redirects to it.)
      filter: (page) => page.replace(/\/$/, '') !== PUBLIC_SITE_URL?.replace(/\/$/, ''),
    }),
  ],
});
