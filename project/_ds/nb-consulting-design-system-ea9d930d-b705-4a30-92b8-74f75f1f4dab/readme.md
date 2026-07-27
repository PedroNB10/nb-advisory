# NB Consulting — Design System

## Company & context

NB Consulting is an independent executive advisory practice founded on the complementary experience of two advisors:

- **Francisco** — decades leading complex industrial operations (manufacturing, quality, engineering, logistics) across multinationals including Nestlé, Nestlé Purina, WABCO North America and Johnson Controls, with international experience in Switzerland, Chile and Latin America.
- **Raimundo** — decades in industrial leadership, now extending that experience through digital architecture, automation and applied artificial intelligence.

NB positions itself deliberately as **an independent executive practice, not a traditional consultancy**. It supports industrial CEOs, industrial directors, VPs of Operations and business owners in moments of critical operational decision — reviewing risk, reducing ambiguity and improving decision quality *before* execution, not after.

NB's four strategic capabilities:
1. **Decision Review**
2. **Coherence Reading**
3. **Stability Restoration**
4. **AI World COO** — not a separate product, but the extension of the first three through digital/AI architecture (Raimundo's contribution).

Brand architecture: **NB** — *Decisions | Coherence | Stability*.

The first deliverable built from this system is a single bilingual (PT/EN) executive landing page — see `templates/nb-landing/`. It is deliberately a narrative sequence, not an institutional site:
1. Recognition of the situation
2. The NB perspective
3. How NB acts
4. Where NB adds value (the four capabilities)
5. The advisors (Francisco & Raimundo)
6. Invitation to a conversation

**Primary audience:** industrial CEOs, industrial directors, VPs of Operations, industrial business owners. Secondary: board members, consulting partners, executive search, investors.

**Tone of the CTA:** an invitation, never a pitch — "Begin a confidential conversation," not "Book a demo." Contact channels are direct and personal: email and WhatsApp, no long forms or scheduling tools in v1.
- Email: nb.admin@icloud.com
- WhatsApp: +55 11 95049-8530

**Sources provided:** brand asset exports only (no Figma file, no codebase) — `uploads/NB_*` logo renders, `uploads/Fundo_Navy_NB_*` background plates, `uploads/Referencia_Tipografica.txt` (typography brief), `uploads/Estrutura-do-site.txt` (site structure brief, PT). No design tool link or repo was attached; if one exists, attach it so future work can reference exact component/pixel truth.

## Content fundamentals

- **Language:** primary content is Portuguese (BR); English is a natural adaptation for an international executive audience, not a literal translation — it should read as if originally written in English.
- **Voice:** first-person plural institutional ("NB atua...", "we act as..."), addressing the reader indirectly as "leaders" / "decisores" rather than a direct "you"-heavy sales voice. Sentences are short, declarative, unhurried.
- **Vibe:** serene authority. NB doesn't argue for itself — it states its perspective plainly and lets the right reader recognize the value. As the brief puts it: *"Nosso objetivo não é convencer qualquer visitante. É permitir que os decisores certos reconheçam rapidamente o valor da proposta da NB."*
- **No emoji, no exclamation points, no growth-hacking language** ("book now!", "limited spots"). No urgency mechanics.
- **Advisor bios read as authority signal, not résumé** — company names (Nestlé, Nestlé Purina, WABCO North America, Johnson Controls) appear once, plainly, in a single sentence of context — never as a logo wall or "worked with" bar.
- **Headline pattern:** brand line + one short clarifying sentence, e.g. "NB — Decision Clarity. Independent clarity before critical execution." Section headlines are similarly short — one sentence, serif, never a paragraph.
- **CTA copy:** "Begin a confidential conversation" / "Let's talk about an important decision" — first-person, calm, no imperative pressure verbs like "unlock," "boost," "transform."

## Visual foundations

- **Palette:** deep navy as the dominant field (`--nb-navy-950 #04091a`), a muted premium gold as the only accent (`--nb-gold-500 #c9a353`, with a brighter `--nb-gold-bright #f0c878` reserved for logo-adjacent moments), and silver/white for primary text and the monogram (`--nb-silver-100/300/500`). Long-reading sections switch to warm white / paper, never pure `#fff` (`--nb-warm-white #faf8f3`). See `tokens/colors.css`.
- **Type:** Georgia (serif) for hero statements and section headlines — short, large, restrained; Inter/Arial (sans) for body, navigation and labels. Only two families, ever. See `tokens/typography.css`.
- **Spacing:** wide, deliberate whitespace. Section vertical padding is `clamp(80px, 11vw, 176px)` — nothing feels dense. Few spacing steps, large jumps between them (see `tokens/spacing.css`) rather than a fine 4px grid — the brand reads through restraint, not precision.
- **Backgrounds:** the navy field is a very subtle radial vignette (near-flat, barely-there lightening toward center) — no pattern, no grain, no texture, no gradient mesh. Provided as static plates per breakpoint (`assets/backgrounds/`); do not recreate as a CSS gradient guess — use the plate or a flat navy fallback.
- **Animation:** minimal to none. Where used at all: slow fades on scroll-into-view (400ms+, ease, never spring/bounce), no looping decorative motion, no parallax.
- **Hover states:** hairline borders solidify or gild — a `secondary`/`ghost` button's border brightens; the `primary` button's gold outline fills solid on hover. No lift/scale, no shadow-pop.
- **Press states:** none pronounced — this is an executive surface, not a consumer app; a subtle opacity dip (~0.9) on `:active` is enough.
- **Borders & shadows:** hairlines do the work shadows would elsewhere — `1px` gold or silver at low opacity on dark, `1px` ink at low opacity on light. One soft shadow token exists for the rare elevated card (`--shadow-card-dark/light`) but is used sparingly.
- **Corner radii:** almost none. `--radius-sm` (2px) / `--radius-md` (4px) on buttons only; cards, images and sections are square — rounded corners read as "startup," which the brief explicitly asks to avoid.
- **Cards:** no boxed card with fill + shadow + rounded corner. NB's "cards" (pillars, advisors) are unboxed compositions separated by a hairline top-rule, per `components/cards/`.
- **Imagery:** advisor photographs should be serene, professional headshots/environmental portraits — not corporate-stock, not backlit hero shots. No photography has been supplied yet (see Caveats).
- **Transparency/blur:** none used — flat, opaque surfaces throughout; no glassmorphism.
- **Layout:** single-column narrative, generously margined, content capped at `--content-max-width` (1120px) / narrow reading column at 680px for prose blocks. No sticky/fixed chrome beyond a minimal top nav.

## Iconography

**No icon system was supplied and none should be invented.** The brief explicitly asks to avoid "excesso de ícones" (icon overload) — NB's visual language is typographic and driven by hairlines/whitespace, not iconography. If a wayfinding glyph is ever needed (e.g. an arrow for the CTA), use a single plain SVG chevron/arrow at 1px stroke matching the gold or silver hairline weight — never an icon font, never emoji, never a filled/colored icon chip.

## Assets

`assets/logos/` — NB monogram and full lockup (NB + "Decisions | Coherence | Stability"), each pre-composited on navy (no transparent-background version was supplied — see Caveats), plus favicons at 32/64/192/512px.
`assets/backgrounds/` — the official navy field at four export sizes (web 1920, mobile 1080×1920, LinkedIn banner 1584×396, 4K master).

## Components

Standard set, sized to the brand's actual needs (no Figma/codebase was supplied, so this is an intentionally small, purpose-built set rather than a full generic UI kit):

- **Button** (`components/core/Button.jsx`) — gold/silver/ink hairline CTA; `primary` / `secondary` / `ghost`, three sizes.
- **Eyebrow** (`components/core/Eyebrow.jsx`) — wide-tracked uppercase section label with optional numeric index (the "sequence of perception" marker).
- **Divider** (`components/core/Divider.jsx`) — short hairline rule, NB's only separator.
- **PillarCard** (`components/cards/PillarCard.jsx`) — one of the four strategic capabilities.
- **AdvisorCard** (`components/cards/AdvisorCard.jsx`) — advisor photo/name/role/bio block for Francisco & Raimundo.

### Intentional additions
None of the above map to a supplied source (there wasn't one) — they were authored directly from the brand brief's own vocabulary (the four "frentes," the advisor bios, the CTA) rather than a generic component checklist. No Toast/Tooltip/Tabs/etc. were added — the landing page needs none of them.

## Templates

- `templates/nb-landing/NbLanding.dc.html` — the full bilingual (PT/EN toggle) executive landing page, built to the "sequence of perception" structure above. Uses all five components + the navy background plate + the official logo lockup.

## Index

- `styles.css` — global stylesheet entry (import-only)
- `tokens/` — colors, typography, spacing, effects (fonts.css loads Inter)
- `components/core/` — Button, Eyebrow, Divider
- `components/cards/` — PillarCard, AdvisorCard
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand)
- `assets/logos/`, `assets/backgrounds/` — brand imagery
- `templates/nb-landing/` — the executive landing page template
- `SKILL.md` — portable skill definition for Claude Code

## Caveats

- **No transparent-background logo was supplied** — every logo export is pre-composited onto the navy field. This works for headers/footers on navy but will show a navy box if placed on a light section. If NB has a transparent PNG/SVG of the monogram and lockup, please share it.
- **No advisor photography supplied** — `AdvisorCard` renders a plain "Photograph pending" placeholder until real photos of Francisco and Raimundo are provided.
- **No Figma file or codebase was attached** — this system was authored entirely from brand asset exports + the two written briefs. Components are therefore a small, purpose-built set (not a full enumerated inventory from a source of truth). If a Figma file exists, attach it and this can be reconciled against it.
- **`NB_Referencia_Visual_Essencial.png`** could not be decoded (corrupt/unsupported) — not used as a source; flagging in case it held reference material worth re-exporting.
- Gold/silver/navy hex values were sampled directly from the provided PNGs (pixel sampling), not from a supplied swatch file — please confirm they match NB's official values if a brand guideline PDF exists.

**Ask:** please confirm (1) the sampled navy/gold/silver hex values look right to you, (2) whether you can share a transparent-background logo, and (3) advisor photographs for Francisco and Raimundo — then I'll iterate the landing page and specimens against the real assets.
