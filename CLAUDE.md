# design-system

The IN-FLU-ENTIAL design system as code: CSS tokens, Tailwind preset, base styles and shared React components consumed by the flu-wop sites.

**Type:** Internal / own project · **Default branch:** `main`

## Stack

- Next.js 16.2.6 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lenis

## Commands

```bash
npm install
npm run typecheck            # tsc --noEmit
npm run build:css            # node scripts/build-css.mjs
npm run migrate              # node scripts/migrate-colors.mjs
```

There is no automated test suite. Before pushing, verify with `npm run typecheck` and a local run.

## Layout

- Directories: `scripts/`, `src/`, `src/components/`, `src/motion/`, `src/styles/`, `themes/`
- Top-level files: `README.md`, `package.json`, `tailwind-preset.cjs`, `tokens.json`, `tsconfig.json`

## Notes

- Sites install this package straight from GitHub (`github:flu-wop/design-system#<tag-or-sha>`). The repo must stay reachable by Vercel builds. Making it private breaks every consumer's install unless they switch to an authenticated registry.
- Release flow: change → bump `version` in package.json → tag `vX.Y.Z` → update the pin in each consuming site.
- `tokens.json` is the source of truth for colours/type; `npm run build:css` regenerates the CSS.
- `npm run migrate` rewrites hard-coded colours in a consuming site to tokens.

## House rules (IN-FLU-ENTIAL standard, v1 — Nov 2026)

### Permissions
- Allowed without asking: read anything, run builds/tests/audits, commit to any branch except `main`, push non-main branches.
- Ask first: pushing or merging to `main`, changing Vercel env vars or domains, touching DNS, adding a dependency, deleting or renaming files or routes, anything that charges money or emails real people.
- Never: commit secrets or `.env*` files, add hard-coded fallback values for secrets, disable a security check to make a build pass, force-push `main`.

### How to work
1. One change at a time. Build and verify before starting the next.
2. A passing build doesn't mean the page renders. Check that it does.
3. Don't touch stable 3D/WebGL/scroll code (Lenis, GSAP, R3F) unless asked.
4. If a change breaks something, revert it. Don't stack patches on a broken state.
5. Keep design tokens (gold #D4AF77, black #090909, Cormorant Garamond + DM Sans) unless this repo has its own client brand.
6. Flag uncertainty instead of guessing. Put unverified assumptions in `FLAGS.md`.
7. End every session with a short summary: what changed, what's verified, what's open.

### Content
- Use only real content from the client or their existing site. Never invent prices, hours, addresses, phone numbers, testimonials, awards, client logos or stats.
- Placeholder copy must be obviously marked and never ships to a live client site.
- Footer credit: "Designed by IN-FLU-ENTIAL" (no LLC), linking to influential.live. Sites Kayla builds say "Designed by Epoch Skin".
- In documents, the company name is always "IN-FLU-ENTIAL LLC", all caps.

### Security (the site-security skill's checklist must pass before deploy)
- Prices are set on the server, never trusted from the browser.
- Stripe/Square webhooks verify signatures and are idempotent.
- Rate-limit every route that hits Stripe, Square or Resend.
- Admin routes and anything with client data (bookings, orders, `calendar.ics`) require an admin session or a secret token. Never expose client PII on a public endpoint.
- No admin password or secret in a `NEXT_PUBLIC_` variable.
- A privacy policy is required on any site that collects personal data.

### Verify before calling it done
- Build and typecheck pass (flat HTML: page loads with no console errors).
- WebKit overflow check at 320 / 390 / 768 px.
- axe accessibility scan: no WCAG A/AA violations.
- Every form, checkout and admin login tested in mock/test mode.
- After a push to `main`, confirm the Vercel deployment went live and spot-check the live URL.
