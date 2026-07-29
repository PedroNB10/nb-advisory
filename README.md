# NB Advisory — landing page

A single-page marketing site for NB Advisory, an industrial-executive
advisory practice run by two advisors (Francisco and Raimundo). Static Astro
site, three routed locales (`/pt`, `/en`, `/es`), no contact form — every call
to action opens `mailto:` or `wa.me:`. Deployed as a static build to
Cloudflare Pages.

## Prerequisites

- [Node.js](https://nodejs.org/) 22.12.0 or newer (see `engines` in
  `package.json`)
- [pnpm](https://pnpm.io/) 11.x — this repo pins its lockfile format to pnpm
  11, so use pnpm rather than npm/yarn

## Setup: clone to running site

```sh
git clone <this-repo>
cd francisco-and-raimundo-profiles
pnpm install
cp .env.example .env      # edit PUBLIC_SITE_URL if you have a real domain
pnpm dev
```

Open `http://localhost:4321` — it redirects to `/pt`. Use the language tabs
in the header to switch to `/en` or `/es`.

`PUBLIC_SITE_URL` (in `.env`) is the only place the site's origin is
hardcoded. It feeds canonical URLs, hreflang tags, Open Graph tags, the
sitemap, and `robots.txt`. Every other URL in the codebase is relative.

## Scripts

| Command        | Action                                                              |
| :------------- | :------------------------------------------------------------------ |
| `pnpm install` | Install dependencies (also wires up the pre-commit git hook)        |
| `pnpm dev`     | Start the dev server at `localhost:4321`                            |
| `pnpm build`   | Type-check and build the static site to `./dist/`                   |
| `pnpm preview` | Serve the built `./dist/` locally, as a smoke test before deploying |
| `pnpm check`   | Run `astro check` (TypeScript + template diagnostics) on its own    |
| `pnpm lint`    | Run ESLint over the whole project                                   |
| `pnpm format`  | Run Prettier `--write` over the whole project                       |

A pre-commit hook (via `simple-git-hooks` + `lint-staged`) runs ESLint and
Prettier automatically on staged files — you shouldn't need to run `lint`/
`format` by hand except to check the whole tree at once.

## How to edit copy

All page copy lives in three typed TypeScript files, one per locale:

- `src/i18n/content/pt.ts`
- `src/i18n/content/en.ts`
- `src/i18n/content/es.ts`

Each exports a `pt`/`en`/`es` object shaped by the `SiteContent` type in
`src/i18n/types.ts`. To change a string, find its key in the locale you want
to edit and change the value — nothing else needs to change, since every
`.astro` component reads its copy from these files via props, never
hardcoded text.

**Two exceptions are not per-locale copy, on purpose:**

- `src/i18n/pillars.ts` (`PILLAR_NAMES`) — the four capability names
  (`Decision Review`, `Coherence Reading`, `Stability Restoration`, `AI World
COO`) are brand terms that stay in English in every locale.
- `src/i18n/advisors.ts` (`ADVISOR_NAMES`) — Francisco's and Raimundo's names
  don't get translated either.

**Guardrail:** `SiteContent` is a single shared type with fixed-length tuples
for things like the four capability descriptions and the three "how we act"
items. If you delete a key or shorten one of those arrays in any one locale
file, `pnpm check` (and `pnpm build`) fails to type-check — you cannot ship a
locale silently missing a string. Try it: comment out a line in
`content/es.ts` and run `pnpm check` to see the error, then put it back.

Contact details (email, WhatsApp number, LinkedIn links) are not copy — they
live in `src/config/contact.ts`, a single file shared by all three locales.

After editing copy, run `pnpm check` (or `pnpm build`) to confirm nothing
broke — the pre-commit hook only runs ESLint/Prettier, not the type checker,
so this step is on you — then deploy as described below.

## How to add a fourth language

There is no config flag for this — it's five files, in this order:

1. **`src/i18n/content/<locale>.ts`** — copy the shape of `pt.ts` (or `en.ts`)
   into a new file for the new locale code (e.g. `fr.ts`) and translate every
   string. `satisfies SiteContent` at the bottom of the file is what makes a
   missing/wrong-shape key fail to compile.
2. **`src/i18n/index.ts`** — import the new content object, add it to
   `contentByLocale`, and add the locale code to the `LOCALES` tuple (update
   the `satisfies readonly [string, string, string]` length annotation to
   match the new count).
3. **`src/pages/<locale>/index.astro`** — copy an existing locale's page file
   (e.g. `src/pages/en/index.astro`) into the new locale's directory and
   change the `const locale = '...' as const` literal.
4. **`astro.config.mjs`** — add the locale code to the `i18n.locales` array so
   Astro's router recognizes the new path prefix.
5. **`src/lib/seo.ts`** — add an entry to the `OG_LOCALES` map (the
   underscore-separated tag used in `og:locale`, e.g. `fr_FR`).

Run `pnpm build` afterward — a missing step in this list almost always shows
up as a type error or a 404 on the new route, not a silent bug.

## Deployment (Cloudflare Pages)

This is a static site — `pnpm build` produces a self-contained `dist/`
directory with no server required.

**First-time setup**, from the Cloudflare dashboard: Workers & Pages → Create
→ Pages → connect this Git repository, and set:

- Build command: `pnpm build`
- Build output directory: `dist`
- Environment variable: `PUBLIC_SITE_URL` set to the Pages URL Cloudflare
  assigns you (e.g. `https://nb-advisory-landing.pages.dev`), or your
  custom domain once one is attached

Every push to the production branch triggers a new deploy automatically.

**Manual/CLI deploy** (e.g. before a Git remote exists), using
[Wrangler](https://developers.cloudflare.com/workers/wrangler/), already a
project dependency (`pnpm exec`, not a global install):

```sh
pnpm exec wrangler login                # one-time per machine/account, opens a browser
pnpm build
pnpm exec wrangler pages deploy dist --project-name=nb-advisory-landing
```

Deploying under a different Cloudflare account than the one already logged
in? Re-run `wrangler login` first — it overwrites the stored credentials.

**Attaching a custom domain later:** add it under the Pages project's Custom
Domains tab, then update `PUBLIC_SITE_URL` in the Pages project's environment
variables to the new domain and trigger a rebuild (canonical URLs, hreflang,
OG tags, the sitemap and `robots.txt` all read from this one value).

**Rollback:** Cloudflare Pages keeps every deploy. Open the project's
Deployments tab, find the last-known-good deployment, and use "Rollback to
this deployment" (or "Retry deployment" to redeploy it as a new one) — no
revert commit required.

## Troubleshooting

- **`pnpm build` fails with a type error mentioning `SiteContent` or a
  locale content file** — you're missing a key, or an array is the wrong
  length, in one of the three `content/*.ts` files. The error message names
  the file and the missing property; add it there.
- **A page 404s at a locale you just added** — check step 4 above
  (`astro.config.mjs`'s `i18n.locales`); Astro's router won't build a route
  for a prefix it doesn't know about.
- **Build fails with "Invalid environment configuration"** — `.env` is
  missing or `PUBLIC_SITE_URL` has a trailing slash. Copy `.env.example` to
  `.env` and make sure the URL has no trailing `/`.
- **Language switch loses my place on the page (the `#anchor` disappears)**
  — this only works with JavaScript enabled; the hash-preserving behavior in
  `LanguageTabs.astro` is a progressive enhancement, not a hard requirement,
  so this is expected (not a bug) with JS disabled.
- **Sitemap or `robots.txt` show the wrong origin** — both are generated at
  build time from `PUBLIC_SITE_URL`; rebuild after changing `.env` or the
  Cloudflare Pages environment variable.

## Project structure

```text
src/
├── components/
│   ├── core/        # Button, Eyebrow, Divider — design-system primitives
│   ├── cards/        # PillarCard, AdvisorCard
│   ├── layout/       # Header, Footer, LanguageTabs
│   └── sections/     # The 7 page sections (Opening, Recognition, ...)
├── config/
│   └── contact.ts   # Centralized email/WhatsApp/LinkedIn — no contact form
├── i18n/
│   ├── content/      # pt.ts, en.ts, es.ts — all page copy, per locale
│   ├── types.ts      # SiteContent — the shared shape every locale must match
│   ├── pillars.ts    # PILLAR_NAMES — brand terms, not translated
│   ├── advisors.ts   # ADVISOR_NAMES — advisor names, not translated
│   └── index.ts      # getContent(), LOCALES, DEFAULT_LOCALE
├── layouts/
│   └── BaseLayout.astro  # <head>, skip link, reveal-on-scroll script
├── lib/
│   ├── env.ts        # Validates PUBLIC_SITE_URL at build time
│   └── seo.ts        # Canonical URLs, hreflang, og:locale, og:image
├── pages/
│   ├── pt/, en/, es/index.astro   # One page per locale, assembles the sections
│   ├── index.astro                # Redirect-only stub, sends "/" to "/pt"
│   └── robots.txt.ts              # Generated from PUBLIC_SITE_URL
└── styles/
    └── tokens/       # Design tokens, vendored byte-identical from the
                       # design handoff bundle — see tokens/README.md
```

Design decisions with more context than fits here are written up as ADRs in
[`docs/decisions/`](docs/decisions/).
