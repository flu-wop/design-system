/**
 * IN-FLU-ENTIAL Tailwind v3 preset.
 * tailwind.config.ts:  presets: [require("@flu-wop/design-system/tailwind-preset")]
 *
 * Semantic colours (surface, ink, accent, line…) follow the active theme
 * (<html data-theme="studio"> default, or data-theme="paper").
 * Legacy primitive names (studio-black, gold, cream, mist…) are kept so existing
 * class names keep working while sites migrate; new code uses the semantic names.
 */
const raw = (name) => `var(--if-${name})`;
// Colour as a function so opacity modifiers (bg-accent/20) work on CSS-variable colours.
const c = (cssVar) => ({ opacityValue }) =>
  opacityValue === undefined || opacityValue === "1"
    ? cssVar
    : `color-mix(in srgb, ${cssVar} calc(${opacityValue} * 100%), transparent)`;
const v = (name) => c(raw(name));

module.exports = {
  theme: {
    extend: {
      colors: {
        // ── Semantic (theme-aware) — use these in new code
        surface: { DEFAULT: v("surface"), alt: v("surface-alt"), raised: v("surface-raised"), card: v("surface-card") },
        ink: { DEFAULT: v("ink"), muted: v("ink-muted") },
        accent: { DEFAULT: v("accent"), hover: v("accent-hover"), text: v("accent-text"), deep: v("accent-deep") },
        "on-accent": v("on-accent"),
        line: { DEFAULT: v("line"), strong: v("line-strong") },
        success: v("success"),
        danger: { DEFAULT: v("danger"), text: v("danger-text") },
        "on-danger": v("on-danger"),
        focus: v("focus"),

        // ── Legacy primitives (fixed values) — kept for migration, don't use in new code
        studio: { black: v("studio-black"), charcoal: v("charcoal"), dark: v("dark"), card: v("card"), border: v("border") },
        charcoal: v("charcoal"),
        dark: v("dark"),
        gold: { DEFAULT: v("gold"), light: v("gold-light"), dark: v("gold-dark"), muted: v("gold-muted"), ink: v("gold-ink") },
        cream: v("cream"),
        mist: v("mist"),

        // ── shadcn/ui compatibility (map onto the semantic tokens)
        background: c("var(--background)"),
        foreground: c("var(--foreground)"),
        card: { DEFAULT: c("var(--card)"), foreground: c("var(--card-foreground)") },
        border: c("var(--border)"),
        input: c("var(--input)"),
        ring: c("var(--ring)"),
        destructive: { DEFAULT: c("var(--destructive)"), foreground: c("var(--destructive-foreground)") },

        // ── Accent layers — each only on its own site
        ember: v("ember"),
        flame: v("flame"),
        "ink-deep": v("ink-deep"),
        bayou: v("bayou"),
        prairie: v("prairie"),
        parchment: v("parchment"),
        "nola-red": v("nola-red"),
      },
      fontFamily: {
        display: [raw("font-display")],
        sans: [raw("font-sans")],
        mono: [raw("font-mono")],
      },
      fontSize: {
        "display-xl": ["72px", { lineHeight: "76px", letterSpacing: "-0.01em", fontWeight: "300" }],
        "display-lg": ["60px", { lineHeight: "64px", letterSpacing: "-0.01em", fontWeight: "300" }],
        "heading-1": ["48px", { lineHeight: "54px", letterSpacing: "-0.01em", fontWeight: "300" }],
        "heading-2": ["36px", { lineHeight: "42px", letterSpacing: "-0.01em", fontWeight: "300" }],
        "heading-3": ["30px", { lineHeight: "36px", fontWeight: "300" }],
        "heading-4": ["24px", { lineHeight: "30px", fontWeight: "300" }],
        "body-lg": ["18px", { lineHeight: "29px" }],
        body: ["16px", { lineHeight: "26px" }],
        "body-sm": ["14px", { lineHeight: "22px" }],
        caption: ["12px", { lineHeight: "18px" }],
        eyebrow: ["12px", { lineHeight: "16px", letterSpacing: "0.14em", fontWeight: "500" }],
      },
      boxShadow: {
        card: raw("shadow-card"),
        lift: raw("shadow-lift"),
        vignette: raw("shadow-vignette"),
        focus: raw("focus-ring"),
      },
      transitionDuration: {
        fast: raw("duration-fast"),
        base: raw("duration-base"),
        slow: raw("duration-slow"),
        reveal: raw("duration-reveal"),
        scroll: raw("duration-scroll"),
      },
      transitionTimingFunction: {
        out: raw("ease-out"),
      },
    },
  },
};
