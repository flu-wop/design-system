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

## Working rules

- Never commit `.env*` files with real values, build output (`.next/`, `dist/`), or `node_modules/`.
- Prefer small focused commits; describe user-visible changes in the commit message.
