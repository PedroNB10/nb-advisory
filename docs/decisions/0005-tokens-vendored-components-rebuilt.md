# 5. Tokens vendored verbatim; components recreated from usage

## Context

The design handoff bundle included the design tokens as plain CSS files and
a single static prototype (`project/NbLanding.dc.html`) showing every
component already rendered inline, plus a design-system readme describing
each component's intent and rules. It did not include component source
files (no `.jsx`/`.tsx`/`.astro` sources for Button, Eyebrow, Divider,
PillarCard, or AdvisorCard) — only their compiled-in-place HTML/CSS output
in the prototype.

## Decision

The token CSS files are treated as an authoritative artifact and vendored
byte-identical (see [0004](0004-no-tailwind.md)). The components themselves
have no equivalent source artifact to vendor — they were rebuilt from
scratch as typed `.astro` files, inferring their prop shape (variants,
sizes, optional fields) from how each one is _used_ in the prototype's
markup, cross-checked against the design-system readme's description of
each component's rules (e.g. Button's variants, Eyebrow's index formatting,
PillarCard's structure).

## Consequences

- Token fidelity is verifiable by diffing files; component fidelity was
  verified by comparing rendered output against the prototype's markup and
  the readme's stated rules, since there was no source file to diff against.
- Component props were designed for this rebuild (e.g. Button's polymorphic
  `as="a" | "button"` prop, using `astro/types`' `HTMLAttributes<Tag>`
  helper) rather than carried over from an original implementation that
  doesn't exist in this handoff.
- Any visual mismatch against the prototype found later should be treated as
  a rebuild gap to fix, not a token problem — the tokens were never in
  question.
