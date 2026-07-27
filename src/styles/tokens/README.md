# Design tokens — provenance

These files (`colors.css`, `spacing.css`, `typography.css`, `effects.css`) are
copied **byte-for-byte** from the Claude Design handoff bundle at
`project/_ds/nb-consulting-design-system-ea9d930d-b705-4a30-92b8-74f75f1f4dab/tokens/`.

The hex values in `colors.css` were pixel-sampled from NB's brand asset
exports, not typed from a brand guideline document — see that bundle's
`readme.md` under "Caveats". They have not been independently confirmed
against an official brand guideline. If NB provides one, reconcile it there
first, then re-copy into this directory — never patch a value here without
also correcting the source.

**To change a value, change the token — never override it downstream.**
Component styles should only ever reference `var(--token-name)`. If a
component needs a color, spacing step, or type size, add or adjust a token
here; do not hardcode a literal (`#c9a353`, `24px`, …) inline. That inline
literal is exactly how this system quietly stops being the source of truth.

**One deliberate exception:** `fonts.css` differs from the vendored bundle.
The original loads Inter via a Google Fonts `@import`, which is a
render-blocking third-party request. This copy self-hosts the same Inter
weights instead (see the comment in that file) — no token _value_ changed,
`--font-sans` still resolves to `'Inter', Arial, Helvetica, sans-serif`.

Do not reformat, "clean up", or re-derive any of these files from the design
tool again without diffing against the original — regenerating risks a
silent one-character drift in a hex value that surfaces months later as "the
navy looks wrong."
