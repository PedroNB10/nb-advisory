/** Top nav link labels. */
export interface NavContent {
  advisors: string;
  capabilities: string;
  contact: string;
}

/** Section 1 — Opening. */
export interface HeroContent {
  title: string;
  sub: string;
}

/** Section 2 — Recognition. Exactly four pain-point statements — the grid is built for four. */
export interface RecognitionContent {
  eyebrow: string;
  title: string;
  points: readonly [string, string, string, string];
}

/** Section 3 — The NB perspective. */
export interface PerspectiveContent {
  eyebrow: string;
  title: string;
  body: string;
}

/** Section 4 — How NB acts. Exactly three items, one per gold hairline. */
export interface HowContent {
  eyebrow: string;
  title: string;
  items: readonly [string, string, string];
}

/**
 * Section 5 — Capabilities. Exactly four descriptions, matched positionally
 * to PILLAR_NAMES (src/i18n/pillars.ts), which is not localised.
 */
export interface CapabilitiesContent {
  eyebrow: string;
  title: string;
  descs: readonly [string, string, string, string];
}

/** Section 6 — Advisors. */
export interface AdvisorsContent {
  eyebrow: string;
  title: string;
  franciscoRole: string;
  franciscoBio: string;
  raimundoRole: string;
  raimundoBio: string;
  linkedinLabel: string;
}

/** Section 7 — Conversation / CTA. */
export interface CtaContent {
  title: string;
  sub: string;
  note: string;
  emailLabel: string;
  whatsappLabel: string;
}

export interface FooterContent {
  tagline: string;
  email: string;
}

/**
 * The full shape of one locale's copy. Every locale file in src/i18n/content/
 * must satisfy this exactly — a missing or misspelled key in any language is
 * a compile error, not a runtime surprise on the page in that language.
 */
export interface SiteContent {
  nav: NavContent;
  hero: HeroContent;
  recognition: RecognitionContent;
  perspective: PerspectiveContent;
  how: HowContent;
  capabilities: CapabilitiesContent;
  advisors: AdvisorsContent;
  cta: CtaContent;
  footer: FooterContent;
}
