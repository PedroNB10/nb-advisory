# 4. No Tailwind — vendored token CSS instead

## Context

The design handoff bundle (`project/_ds/`) ships its own design-token CSS
files (colors, typography, spacing, effects, fonts) as the source of truth
for the visual system, along with a design-system readme documenting how
components should use them. This is a from-scratch design system, not a
generic one a utility framework's default scale would match.

## Decision

The five token CSS files are vendored into `src/styles/tokens/` and imported
directly in `BaseLayout.astro` — byte-identical to the handoff bundle, except
that font files are self-hosted (`@font-face` pointing at `public/fonts/`)
instead of an external font CDN. No Tailwind, no other CSS/utility
framework. Components use plain `<style>` blocks (scoped by Astro by
default) referencing the token custom properties directly (e.g.
`color: var(--nb-silver-500)`).

## Consequences

- The token files can be diffed byte-for-byte against the original design
  bundle at any time to prove nothing drifted from the handoff — a
  guarantee a Tailwind config re-encoding the same values as theme extension
  couldn't offer as directly.
- No utility-class build step, no Tailwind config to keep in sync with the
  token files, no risk of the two sources of truth (tokens vs. Tailwind
  theme) diverging over time.
- Component styles are slightly more verbose (real CSS declarations instead
  of utility classes), which is an acceptable tradeoff for a component count
  this small (5 core/card components, 3 layout components, 7 sections).
