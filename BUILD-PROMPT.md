# Build Prompt — NB Consulting Executive Landing Page

> Paste this into Claude Code or Cursor, with this repo open.
> Supersedes any earlier spec. Where they disagree, this file wins.

---

## Role

You are implementing a production landing page from an existing Claude Design handoff bundle. The design is **done** — your job is to recreate it faithfully in Astro, make it responsive, and make it maintainable. Do not redesign it. Do not add features.

Optimise for **maintainability over cleverness**. Prefer boring, obvious code. Work in the phases below, and confirm the build and typecheck pass before moving between them.

---

## 1. Source material — read all of it before writing code

```
francisco-and-raimundo-profiles/
  README.md                          handoff instructions
  project/
    NbLanding.dc.html                THE DESIGN. Read top to bottom.
    ds-base.js  support.js           prototype runtime — do NOT port
    _ds/nb-consulting-design-system-.../
      readme.md                      brand voice, visual rules, caveats — read in full
      styles.css
      tokens/  colors, typography, spacing, effects, fonts
    assets/logos/  assets/backgrounds/
```

`NbLanding.dc.html` is a prototype using a custom `<x-dc>` runtime (`x-import`, `sc-for`, `{{ }}` bindings, a `DCLogic` class). **That runtime is not production code.** Read it for structure, styling and content, then discard it. Never ship `ds-base.js` or `support.js`.

The design system `readme.md` is the brand bible — voice, spacing philosophy, why there are no icons, why corners are square. Read it before making any judgement call. Note it is slightly stale: it says "bilingual (PT/EN)" but Spanish is fully implemented.

---

## 2. What's being built

A single-page executive landing site for **NB Consulting**, an independent advisory practice run by two advisors (Francisco and Raimundo). Audience: industrial CEOs, operations VPs, industrial business owners.

Seven sections, in a deliberate narrative order:

1. **Opening** — logo, hero statement, subheading. Full-bleed navy plate.
2. **Recognition** — eyebrow, headline, four pain-point statements in a grid
3. **Perspective** — eyebrow, two-column headline + body
4. **How NB Acts** — eyebrow, headline, three items each with a gold hairline
5. **Capabilities** — eyebrow, headline, four `PillarCard`s in a bordered grid
6. **Advisors** — eyebrow, headline, two `AdvisorCard`s with LinkedIn links
7. **Conversation** — CTA with email + WhatsApp buttons. Navy plate.

Plus a sticky header (logo, three anchor links, PT/EN/ES tabs) and a footer.

**Three languages, all first-class:** Portuguese (default), English, Spanish. All copy is already written in the prototype's `content` object.

**Non-goals — do not build:** a contact form, a CMS, analytics, a blog, authentication, a component library, or any abstraction "for later." See §4 on the form specifically.

---

## 3. Stack — decided, don't relitigate

| Concern | Choice | Why |
|---|---|---|
| Framework | **Astro 5+** | Static output, zero JS by default, native i18n routing |
| Language | **TypeScript strict** | Non-negotiable, see §8 |
| Styling | **Astro scoped `<style>` + the existing token CSS** | **No Tailwind.** `_ds/tokens/` is already the design system. Converting it to Tailwind's scale would destroy the source of truth; arbitrary-value classes would be worse than plain CSS |
| Content | **Typed i18n dictionaries in the repo** | Fixed brand narrative, rarely edited. No CMS in v1 — see §5 |
| Hosting | **Cloudflare Pages** | Free tier permits commercial use, unlimited bandwidth, global edge |
| Package manager | **pnpm** | |

Total recurring cost: the domain. Nothing else.

Do not add dependencies beyond Astro and its official integrations without asking.

---

## 4. The contact form question — settled: there is no form

The design promises *"Sem formulários" / "No forms" / "Sin formularios"* in all three languages, and the brand readme states it as policy: contact is direct and personal.

**Do not build a contact form.** Contact is exactly two buttons plus a footer address:

- Email → `mailto:nb.admin@icloud.com`
- WhatsApp → `https://wa.me/5511950498530`

No Resend, no Turnstile, no Pages Functions, no server runtime of any kind. This site is pure static output.

Put these values in a single `src/config/contact.ts` constant, typed and exported, so they exist in one place. The two LinkedIn URLs go there too:

- Francisco — `https://www.linkedin.com/in/francisco-ueliton/`
- Raimundo — `https://www.linkedin.com/in/raimundo-almeida-barboza-7114113a`

---

## 5. Content architecture

All copy lives in `src/i18n/content/` as typed TypeScript. Extract it verbatim from the `content` object in `NbLanding.dc.html` — **do not retranslate, rewrite or "improve" any string.** The Portuguese is the primary voice; the English and Spanish are considered adaptations, not literal translations. They are correct as written.

Structure it one file per locale, sharing a single type:

```
src/i18n/
  types.ts        SiteContent — the shape, defined once
  content/pt.ts   satisfies SiteContent
  content/en.ts   satisfies SiteContent
  content/es.ts   satisfies SiteContent
  index.ts        getContent(locale), locale config, helpers
```

Type it so a missing or misspelled key in **any** language is a compile error. Use `satisfies SiteContent` rather than `: SiteContent` so literal types are preserved. Fixed-length arrays (four recognition points, three "how" items, four capability descriptions) should be typed as tuples, not `string[]` — if someone deletes one, the build should fail, because the grid layout depends on the count.

**Capability names stay in English across all three languages** — `Decision Review`, `Coherence Reading`, `Stability Restoration`, `AI World COO`. These are brand terms, not copy. Keep them in a separate non-localised constant, exactly as the prototype does.

### Leaving the door open for a CMS

We may add Sanity later. Make that a small change, not a rewrite:

- Components must receive content as **typed props** and never import the dictionaries directly. Only page files read content.
- Access content through `getContent(locale)` in `src/i18n/index.ts`. Swapping that one function's implementation for a CMS fetch should be the whole migration.
- Keep the content shape flat and serialisable — no functions, no class instances, nothing that wouldn't survive a JSON round-trip.

Add `docs/decisions/0001-content-in-code.md` recording why there's no CMS in v1 and what would trigger revisiting it.

---

## 6. Internationalisation — routed, not client-side

The prototype switches language via `state.lang` with no URL change. **Replace this with real routing.** One URL per language means each is indexable, shareable, and correctly tagged.

```
/          → redirect to /pt
/pt        → Portuguese (primary)
/en        → English
/es        → Spanish
```

Use Astro's built-in i18n config with `getStaticPaths` so all three prerender to static HTML at build time. Nothing translates at runtime; there is no language state in the browser.

**The language tabs must look and behave identically to the prototype** — same three uppercase buttons, same hairline border, same active state (`--nb-navy-950` text on `--nb-silver-300` background). The only change is that they're now `<a>` elements pointing at the sibling locale, preserving the current hash fragment so switching language from `#advisors` keeps you at `#advisors`.

Mark the active one with `aria-current="page"`.

**SEO requirements:**

- Reciprocal `hreflang` on all three pages, plus `x-default` pointing at `/pt`
- Canonical URL per locale
- `<html lang>` set correctly per page
- Per-locale meta title, meta description and OG tags — write these; the prototype has none
- `sitemap.xml` covering all three, `robots.txt`
- `Organization` structured data with the two advisors as `member`

**Do not auto-redirect by geography.** A visitor who lands on `/en` stays on `/en`. The root `/` redirect to `/pt` is the only automatic behaviour.

---

## 7. Responsive — this is the real work

**The prototype has zero media queries.** Every grid is hardcoded and the page is currently desktop-only. This is the largest gap between the design and a shippable site.

Fix, mobile-first:

| Section | Desktop (as designed) | Must become |
|---|---|---|
| Capabilities | `repeat(4, 1fr)` | 1 col → 2 → 4 |
| How NB Acts | `repeat(3, 1fr)` | 1 col → 3 |
| Recognition | `auto-fit minmax(220px, 1fr)` | already fluid — verify |
| Perspective | `1fr 1fr` | stacked → 2 col |
| Advisors | `1fr 1fr` | stacked → 2 col |
| Footer | `1fr auto 1fr` | stacked centred → 3 col |

The capabilities grid uses `border-left` on the container and `border-right` per card to create hairline dividers. **That breaks when the grid wraps** — you get stray rules mid-row. Rework it so dividers only appear between columns in the same row, and become horizontal rules when stacked. Verify at every breakpoint, not just the extremes.

**The header needs a mobile treatment.** Three nav links plus three language tabs will not fit a 375px viewport. Per the brand's restraint, avoid a hamburger drawer if you can — consider dropping the anchor links below `md` and keeping only the logo and language tabs, or letting the nav wrap to a second row. Propose your approach before building it.

Also check: hero `min-height: 92vh` behaves badly on mobile browsers with dynamic toolbars — use `svh` with a `vh` fallback. And `--content-gutter` is already `clamp(24px, 6vw, 96px)`, so gutters are handled; don't add your own.

Test at 375, 768, 1024, 1440 and 1920.

---

## 8. Code quality

**TypeScript** — `strict: true` plus `noUncheckedIndexedAccess`, `noImplicitOverride`, `exactOptionalPropertyTypes`. No `any`. No non-null assertions without a comment justifying them. Derive types rather than duplicating them.

**Components** — port the five design-system components as `.astro` files with typed `Props` interfaces:

```
src/components/
  core/     Button.astro  Eyebrow.astro  Divider.astro
  cards/    PillarCard.astro  AdvisorCard.astro
  layout/   Header.astro  Footer.astro  LanguageTabs.astro
  sections/ Opening.astro  Recognition.astro  Perspective.astro
            HowNbActs.astro  Capabilities.astro  Advisors.astro  Conversation.astro
```

`Button` needs `variant: 'primary' | 'secondary' | 'ghost'`, `size`, and polymorphic `as="a" | "button"` — the prototype uses it as a link. `AdvisorCard` currently renders a "Photograph pending" placeholder; keep that behaviour and make `photo` an optional prop, since no photography has been supplied yet.

Components receive data as props and render. They never import content dictionaries. Pages fetch and pass down.

**Styling — vendor the tokens, recreate the components**

Copy `_ds/tokens/*.css` into `src/styles/tokens/` **unchanged**. Do not rewrite, reformat or "tidy" them. They are well-authored — a base scale with semantic aliases layered on top, fluid `clamp()` type scales, and the brand's hairline-over-shadow philosophy encoded in `effects.css`. More importantly, the hex values were **pixel-sampled from NB's brand assets**, so retyping them risks a silent one-character drift that surfaces months later as "the navy looks wrong."

Do **not** port `_ds_bundle.js`. It targets the prototype's `x-import` / global-namespace runtime and can't run in Astro. Recreate the five components as `.astro` files instead — you gain typed props, real accessibility and responsive behaviour the prototype never had.

**Drop the `@import` chain.** `styles.css` is five sequential `@import url(...)` lines, which produces a request waterfall in production. Keep the individual token files, but import them directly in the base layout so Vite bundles them into a single stylesheet. Discard `styles.css` itself.

Add `src/styles/tokens/README.md` recording that these files came from the design bundle and are not to be edited casually: **to change a value, change the token — never override it downstream.** Without this note, someone eventually writes `color: #c9a353` inline and the system quietly stops being the source of truth.

The prototype's inline `style=""` attributes move into scoped `<style>` blocks referencing the same custom properties. Preserve every token reference — `var(--fs-display-1)`, `var(--space-9)`, `var(--nb-gold-500)` — rather than resolving them to literals.

**Self-host Inter and Georgia fallbacks.** `fonts.css` currently loads Inter externally; replace with local `woff2` and `font-display: swap`. No render-blocking third-party requests.

**Environment** — the only variable is `PUBLIC_SITE_URL`. For v1 this is the free Cloudflare Pages subdomain (e.g. `https://nb-advisory.pages.dev` — use whatever the project is actually named). It must be a single configurable value read from the environment, **never hardcoded**, precisely so that swapping in `https://nbadvisory.com.br` later is a one-line change with no code edits. Parse it once through Zod in `src/lib/env.ts` and ship a documented `.env.example`. A missing value must fail the build with a clear message, not silently emit broken canonical URLs. Validate it parses as a URL with no trailing slash, so canonical construction can't produce `//pt`.

**Tooling** — ESLint (typescript-eslint strict) + Prettier + `astro check`, all wired into a pre-commit hook and CI. CI fails on type errors, lint errors, or a failing build.

**Naming** — components `PascalCase.astro`, utilities `camelCase.ts`, no abbreviations (`locale`, not `loc`).

---

## 9. Accessibility

The prototype gets several things right already — keep them: `prefers-reduced-motion` guards on the reveal animation, semantic `<header>`/`<nav>`/`<footer>`, `<button>` elements for the language tabs, one `h1` with `h2` per section.

Add what's missing:

- Skip-to-content link, visible on focus
- Visible focus states throughout. The token already exists — `--color-focus-ring: var(--nb-gold-300)` in `colors.css` — it is simply never applied to anything. Wire it up rather than inventing a new value. Use it as a gold hairline consistent with the brand's hover language, never a browser default outline on navy
- `aria-current="page"` on the active language tab
- Meaningful `alt` text. `alt="NB"` on the logo is thin — use "NB Consulting" and mark the decorative footer instance `alt=""`
- Verify WCAG AA contrast on every text/background pair. `--nb-silver-700` on `--nb-navy-950` is the one most likely to fail — measure it, and if it fails, raise the token rather than patching individual elements
- Confirm the reveal animation doesn't leave content permanently invisible if JavaScript fails. Content must be visible by default with the animation as enhancement — the prototype does the reverse (`opacity: 0` until `data-shown`), which is a hard failure mode

Background plates are decorative — apply via CSS `background-image`, not `<img>`.

---

## 10. Performance

Static HTML with effectively no client JavaScript. The only script should be the small intersection-observer reveal, and it must be optional.

- `navy-web-1920.png` is a full-bleed plate used twice. Convert to AVIF/WebP with PNG fallback and serve responsive sizes — the bundle includes mobile and 4K variants; use them via `<picture>` or CSS `image-set()`
- Explicit width/height on all images, `loading="lazy"` below the fold
- Target Lighthouse 100 on Accessibility, Best Practices and SEO; 95+ on Performance, mobile profile. Report actual scores when done

---

## 11. Build order

1. Scaffold Astro + TS strict + ESLint/Prettier. Verify `pnpm build` and `astro check` pass clean on an empty page.
2. Vendor the design tokens verbatim into `src/styles/tokens/` with their README; import them directly in the base layout (no `@import` chain). Self-host fonts. Base layout renders on the navy field with correct typography.
3. `src/i18n/` — types, three content files, `getContent()`. Typecheck must catch a deliberately deleted key. Prove it, then restore.
4. i18n routing: `/pt`, `/en`, `/es`, root redirect, hreflang, canonicals.
5. Port the five core components with typed props.
6. Build the seven sections desktop-first to match the prototype exactly.
7. **Responsive pass** — §7. Expect this to take the longest.
8. Header, footer, language tabs with hash preservation.
9. Accessibility pass — §9.
10. SEO: meta, OG images, sitemap, robots, structured data.
11. Performance: image conversion, Lighthouse.
12. Documentation — README, ADRs, content-editing guide.
13. Deploy to Cloudflare Pages, connect the domain.

---

## 12. Documentation

**`README.md`** — what this is, prerequisites with versions, setup from clone to running, every script explained, **how to edit copy** (which file, what to watch for, how to deploy the change), **how to add a fourth language** (exact files in order), deployment and rollback, and a troubleshooting section.

**`docs/decisions/`** — short ADRs (context / decision / consequences) for: content in code rather than a CMS; no contact form; routed i18n over client-side switching; no Tailwind; tokens vendored verbatim while components were recreated.

**Inline comments** — explain *why*, never *what*. `// Gold hairline only between columns in the same row — see §7` earns its place. `// loop over pillars` does not. JSDoc on every exported function.

---

## 13. Definition of done

- [ ] `pnpm build`, `astro check`, lint all pass clean
- [ ] Zero `any`, zero `@ts-ignore`, zero hardcoded user-facing strings in components
- [ ] All three locales render at `/pt`, `/en`, `/es` with copy identical to the prototype
- [ ] Deleting any content key in one language fails typecheck
- [ ] Layout correct at 375, 768, 1024, 1440, 1920 — capabilities dividers included
- [ ] Language switch preserves the hash fragment
- [ ] Page fully readable with JavaScript disabled
- [ ] `hreflang`, `x-default` and canonicals correct on all three pages
- [ ] WCAG AA contrast verified and measured, not assumed
- [ ] Keyboard navigable end to end with visible focus states
- [ ] Lighthouse: 100 A11y / Best Practices / SEO, 95+ Performance, mobile — scores reported
- [ ] No `ds-base.js`, `support.js` or `_ds_bundle.js` anywhere in the output
- [ ] Token files are byte-identical to the design bundle — diff them to confirm
- [ ] README takes a stranger from clone to running site

---

## 14. Open items — ask me, don't guess

1. **Advisor photography** — none supplied. `AdvisorCard` shows "Photograph pending". Confirm whether to ship with placeholders or wait.
2. **Transparent logo** — all exports are pre-composited on navy. Fine while every section is navy, but confirm no light section is planned.
3. **Brand hex values** — the readme says navy/gold/silver were sampled from PNGs, not from a brand guideline. Ask for confirmation before treating them as canonical.
4. ~~**Domain**~~ — **deferred: v1 ships on the free `*.pages.dev` subdomain**. Custom domain (`nbadvisory.com.br`) is a later discussion. See §15.
5. **Header on mobile** — propose your approach before building it (§7).

---

## 15. Domain & deployment

**v1 ships on the free Cloudflare Pages subdomain** (e.g. `nb-advisory.pages.dev`). No custom domain yet — that's a later decision. This does not change any code: the origin is read from `PUBLIC_SITE_URL` (§8), so canonicals, `hreflang`, OG tags and the sitemap all derive from that one value.

**Build the migration path in now, so the later switch is trivial:**

- Never hardcode the origin anywhere. Every absolute URL is built from `PUBLIC_SITE_URL`. Grepping the source for `pages.dev` or `nbadvisory` should return zero hits outside `.env`.
- When the custom domain is ready, the entire change is: update `PUBLIC_SITE_URL`, point DNS, rebuild. No source edits.

Deployment is push-to-`main` → Cloudflare Pages builds → static output. No server, no runtime, no secrets in the build beyond `PUBLIC_SITE_URL`. Enable "Always Use HTTPS".

- Root `/` redirects to `/pt` per §6.
- Never emit a canonical containing `//` — see the `PUBLIC_SITE_URL` validation note in §8.

**Deferred to a later discussion:** custom domain `nbadvisory.com.br` (confirmed available at registro.br, ~R$40/year, Brazilian CPF/CNPJ required). When we get there: register at registro.br → add to Cloudflare for nameservers → point DNS → attach to the Pages project → update `PUBLIC_SITE_URL`. Note `.com.br` does not auto-renew by default, so a renewal reminder will matter then. None of this blocks v1.

---

## 16. How to work with me

- If a requirement here is ambiguous or looks wrong, **say so before building it**. A question costs seconds; rework costs hours.
- Don't add dependencies not listed above without asking.
- Don't redesign. The visual design is settled — if something seems off, raise it rather than silently "fixing" it.
- When a phase is done, summarise what changed and what you'd flag for review. Briefly. Don't paste whole files back at me.
