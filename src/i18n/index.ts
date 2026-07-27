import type { SiteContent } from './types';
import { pt } from './content/pt';
import { en } from './content/en';
import { es } from './content/es';

export type {
  SiteContent,
  NavContent,
  HeroContent,
  RecognitionContent,
  PerspectiveContent,
  HowContent,
  CapabilitiesContent,
  AdvisorsContent,
  CtaContent,
  FooterContent,
} from './types';
export { PILLAR_NAMES } from './pillars';

/** Locales in nav order — pt is first because it's the primary/default locale. */
export const LOCALES = ['pt', 'en', 'es'] as const satisfies readonly [string, string, string];
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'pt';

const contentByLocale: Record<Locale, SiteContent> = { pt, en, es };

/**
 * Single seam for reading copy. Only page files should call this — components
 * receive content as typed props (see BUILD-PROMPT.md §5) so that swapping
 * this function's implementation for a CMS fetch is the whole migration.
 */
export function getContent(locale: Locale): SiteContent {
  return contentByLocale[locale];
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
