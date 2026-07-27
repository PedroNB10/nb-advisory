# 2. No contact form — mailto: and wa.me: only

## Context

NB Consulting's advisory work begins with a direct conversation, not a form
submission triaged later. A contact form would also introduce a backend (or
a third-party form service), spam handling, and a data-retention question
for a two-person practice that doesn't need any of that.

## Decision

Every call-to-action on the page resolves to either a `mailto:` link or a
`wa.me:` (WhatsApp) link. Both values are centralized in
`src/config/contact.ts` so the email address and phone number each exist in
exactly one place in the codebase. There is no `<form>`, no submission
endpoint, and no server-side code in this project at all — the entire site
is static output.

## Consequences

- No form-spam surface, no server to secure or maintain, no third-party form
  vendor to trust with visitor data.
- The site can be, and is, a fully static build (works with Cloudflare
  Pages' free static hosting, no Functions/Workers needed).
- If NB ever wants form analytics (e.g. counting inquiries) or a different
  intake flow, that's a deliberate future change, not something this
  codebase quietly accumulates — updating `contact.ts` is the only thing
  required to change where these links point.
