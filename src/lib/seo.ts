import { env } from './env';
import { LOCALES, DEFAULT_LOCALE, type Locale } from '../i18n';

/** This is a single-page site, so every locale's canonical URL is just its root. */
export function getCanonicalUrl(locale: Locale): string {
  return `${env.PUBLIC_SITE_URL}/${locale}`;
}

export interface AlternateLink {
  hreflang: string;
  href: string;
}

/** Reciprocal hreflang links for every locale, plus x-default pointing at the primary one. */
export function getAlternateLinks(): readonly AlternateLink[] {
  return [
    ...LOCALES.map((locale) => ({ hreflang: locale, href: getCanonicalUrl(locale) })),
    { hreflang: 'x-default', href: getCanonicalUrl(DEFAULT_LOCALE) },
  ];
}

/** og:locale uses underscore-separated IETF-ish tags, not our short routing codes. */
const OG_LOCALES: Record<Locale, string> = {
  pt: 'pt_BR',
  en: 'en_US',
  es: 'es_ES',
};

/** Maps a routing locale (`pt`) to the tag `og:locale` expects (`pt_BR`). */
export function getOgLocale(locale: Locale): string {
  return OG_LOCALES[locale];
}

/**
 * The PNG, not the AVIF/WebP variants: social-media link-preview crawlers
 * have unreliable AVIF/WebP support, and this is a one-time-per-share fetch,
 * not a page-load performance concern.
 */
export function getOgImageUrl(): string {
  return `${env.PUBLIC_SITE_URL}/backgrounds/navy-web-1920.png`;
}
