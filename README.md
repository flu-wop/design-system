# @flu-wop/design-system

The IN-FLU-ENTIAL design system as code: one set of colour and type tokens, a Tailwind preset, base styles, and the shared components every flu-wop site uses. The reference with live previews is the **IN-FLU-ENTIAL** Design System page.

## What's in it

| File | What |
|---|---|
| `styles.css` | Tokens as CSS variables (`--if-surface`, `--if-accent`…), studio + paper themes, base styles, shared utilities (`text-gold-gradient`, `grain-overlay`, `vignette`, `card-lift`), component styles |
| `tailwind-preset.cjs` | Tailwind v3 preset: semantic colours (`bg-surface`, `text-ink-muted`, `bg-accent`, `border-line`…), type sizes (`text-heading-1`, `text-eyebrow`…), shadows, durations. Keeps the old names (`studio-black`, `gold`, `cream`, `mist`) working during migration |
| `src/` | React components: `Button`, `Badge`, `Card`, `Input`, `SectionHeading`, `Vignette`, `CtaBlock`; `tokens` (resolved hex values for emails, Three.js and OG images) |
| `tokens.json` | Source of truth, same file as the Design System page |
| `scripts/migrate-colors.mjs` | Rewrites hard-coded `text-[#D4AF77]`-style classes to token classes |

## Add it to a site

```bash
npm install github:flu-wop/design-system
```

**`next.config.ts`**
```ts
const nextConfig = { transpilePackages: ["@flu-wop/design-system"] };
```

**`tailwind.config.ts`**
```ts
presets: [require("@flu-wop/design-system/tailwind-preset")],
content: [
  "./src/**/*.{ts,tsx,mdx}",
  "./node_modules/@flu-wop/design-system/src/**/*.{ts,tsx}",
],
```
Then delete the site's own `colors` block for the brand palette (keep only its accent layer, if it has one).

**`src/app/layout.tsx`**
```tsx
import "@flu-wop/design-system/styles.css";
import "./globals.css"; // keep the Google Fonts @import as its FIRST line

<html lang="en" data-theme="studio"> … </html>
```

**Use it**
```tsx
import { SectionHeading, Vignette, CtaBlock, Button } from "@flu-wop/design-system";

<SectionHeading eyebrow="Studio booking" title="Sessions that pay before they start" emphasis="before" />
<CtaBlock primary={{ label: "Book a session", href: "/studio" }} reassurance="Deposit refundable until your session is confirmed." />

// Wrap Next's <Link> so navigation stays client-side
<Button size="lg" variant="outline" asChild><Link href="/projects">Explore projects</Link></Button>
```

**Match the site's corners.** Components use `--if-radius-sm` (2px by default). If the site's Tailwind `rounded-sm` is driven by `--radius`, add this to its `globals.css` `:root` so both agree:
```css
--if-radius-sm: calc(var(--radius) - 4px);
```

## Themes

`data-theme="studio"` (dark, default) or `data-theme="paper"` (light: documents, print, light sections). Set it on `<html>` or on any section. A client brand becomes a third theme that re-points the same semantic variables; components don't change.

## Migrating a site's colours

```bash
node node_modules/@flu-wop/design-system/scripts/migrate-colors.mjs src          # dry run: what would change
node node_modules/@flu-wop/design-system/scripts/migrate-colors.mjs src --write  # apply
```
It lists anything it can't map, plus hex literals outside class names (emails, Framer Motion, Three.js). For those import `tokens`:
```ts
import { tokens } from "@flu-wop/design-system";
new THREE.MeshStandardMaterial({ color: tokens.studio.gold });
```

## Rules

- New code uses semantic names only: `surface`, `ink`, `accent`, `line`. Never a hex, never `text-[#…]`.
- One `primary` Button per view. Every hero CTA has a reassurance line.
- Gold as text on paper is `text-accent-text`, never `text-gold`.
- Fire on the Bayou's own `ink` (#060605) is `ink-deep` in the preset; rename `bg-ink` → `bg-ink-deep` when that site migrates.

## Updating

Change `tokens.json` (or the Design System page), regenerate `src/styles/tokens.css`, run `npm run build:css`, bump `version`, push. Sites pick it up with `npm update @flu-wop/design-system`.
