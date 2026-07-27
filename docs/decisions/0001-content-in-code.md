# 1. Content lives in typed code, not a CMS

## Context

This is a single-page site with a small, stable set of copy (one hero, a
handful of section headings and body paragraphs, two advisor bios) across
three locales. Content changes are expected to be infrequent and made by
someone comfortable editing a text file, not by a marketing team needing a
visual editor.

## Decision

All page copy lives in three TypeScript files — `src/i18n/content/{pt,en,es}.ts`
— each exporting an object that must satisfy a single shared `SiteContent`
type (`src/i18n/types.ts`). Components never import these files directly;
only the three page files (`src/pages/{pt,en,es}/index.astro`) call
`getContent(locale)` and pass slices of it down as props. No CMS, no
headless-CMS SDK, no runtime content fetch.

## Consequences

- A missing key, a typo'd property name, or a shortened fixed-length array
  (e.g. the four capability descriptions) in any one locale fails
  `pnpm build`/`pnpm check` immediately, at the exact file and line — content
  parity across locales is enforced by the compiler, not by a checklist.
- Editing copy requires a code change and a rebuild/redeploy — there is no
  live-editing workflow. Given the size and cadence of this site, that
  tradeoff favors compile-time safety over editorial convenience.
- If a real CMS is ever needed, the migration seam is already isolated:
  `getContent()` is the only function that would need a new implementation
  (e.g. fetching from an API instead of an in-memory object); every component
  already expects content as props and would not need to change.
