# 3. Routed i18n (`/pt`, `/en`, `/es`) over client-side language switching

## Context

The prototype handoff had no routing at all — it was a single static HTML
file. The site needed three languages, and the two common approaches are (a)
one URL that swaps visible text via client-side JavaScript/state, or (b)
distinct routes per locale that Astro builds as separate static pages.

## Decision

Each locale is a real route — `/pt`, `/en`, `/es` — configured via Astro's
built-in `i18n` router (`astro.config.mjs`), with `/pt` as the default
locale and `prefixDefaultLocale: true` so it's still addressed at `/pt`
rather than bare `/`. The bare `/` route is a redirect-only stub
(`redirectToDefaultLocale: true`) that sends visitors to `/pt` — the only
automatic redirect behavior on the site; there is no geography-based
auto-redirect, so a visitor who lands directly on `/en` stays on `/en`.

## Consequences

- Each locale is a genuinely separate, fully server-rendered-at-build-time
  HTML document — correct per-page `<html lang>`, per-page canonical URL,
  and reciprocal `hreflang`/`x-default` tags all fall out naturally, since
  each is a distinct static file rather than one document pretending to be
  three.
- The page is fully readable and navigable with JavaScript disabled — a
  client-side-only language switcher would not survive that requirement.
- The only feature that needs client JS at all is preserving the in-page
  hash fragment (e.g. `#advisors`) across a language switch, in
  `LanguageTabs.astro` — and it's a progressive enhancement: the links work
  as plain anchors without it, just without the hash carried over.
- Search engines can index and rank each locale's page independently, which
  a single JS-swapped URL would make much harder.
