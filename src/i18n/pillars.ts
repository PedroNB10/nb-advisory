/**
 * NB's four strategic capabilities are brand terms, not copy — they stay in
 * English across pt/en/es (see the design system readme, "Content
 * fundamentals"). Positionally matched to each locale's
 * `capabilities.descs` tuple.
 */
export const PILLAR_NAMES = [
  'Decision Review',
  'Coherence Reading',
  'Stability Restoration',
  'AI World COO',
] as const satisfies readonly [string, string, string, string];
