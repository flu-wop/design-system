#!/usr/bin/env node
// Replaces hard-coded hex Tailwind classes (text-[#D4AF77], bg-[#090909]/80 …) with
// IN-FLU-ENTIAL token classes. Dry run by default; --write applies.
//
//   node node_modules/@flu-wop/design-system/scripts/migrate-colors.mjs src          # report
//   node node_modules/@flu-wop/design-system/scripts/migrate-colors.mjs src --write  # apply
//
// Hex literals outside class names (inline styles, Framer Motion, SVG attrs) are only
// REPORTED — change those by hand to var(--if-…) tokens.
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const args = process.argv.slice(2);
const write = args.includes("--write");
const roots = args.filter((a) => !a.startsWith("--"));
if (!roots.length) { console.error("usage: migrate-colors.mjs <dir…> [--write]"); process.exit(1); }

const GOLD = { text: "accent-text", bg: "accent", border: "accent", from: "gold", via: "gold", to: "gold", fill: "accent", stroke: "accent", ring: "focus", outline: "focus", decoration: "accent-text", divide: "accent" };
const BLACK = { text: "studio-black", bg: "surface", border: "surface", from: "surface", via: "surface", to: "surface", fill: "surface", stroke: "surface", ring: "surface", outline: "surface", divide: "surface" };
const MAP = {
  d4af77: GOLD, c9a84c: GOLD, c8a45a: GOLD,
  e8c97a: { text: "gold-light", bg: "accent-hover", border: "gold-light", from: "gold-light", via: "gold-light", to: "gold-light", fill: "gold-light", stroke: "gold-light" },
  b8935a: { text: "gold-dark", bg: "accent-deep", border: "accent-deep", from: "gold-dark", via: "gold-dark", to: "gold-dark", fill: "accent-deep", stroke: "accent-deep" },
  "9a7b50": { text: "gold-muted", bg: "gold-muted", border: "gold-muted" },
  a89880: { text: "ink-muted", bg: "mist", border: "line-strong", fill: "ink-muted", stroke: "ink-muted", placeholder: "ink-muted" },
  "5a4c3a": { text: "ink-muted", bg: "surface-raised", border: "line", fill: "ink-muted", stroke: "line" },
  f5edd8: { text: "ink", bg: "cream", border: "cream", fill: "ink", stroke: "ink", from: "cream", via: "cream", to: "cream" },
  fff4e0: { text: "ink", bg: "cream" },
  "090909": BLACK, "080808": BLACK, "0d0d0d": BLACK, "060606": BLACK, "030303": BLACK, "0d0d0a": BLACK,
  "111111": { bg: "surface-alt", from: "surface-alt", via: "surface-alt", to: "surface-alt", border: "surface-alt" },
  "131108": { bg: "surface-alt" },
  "1a1a1a": { bg: "surface-raised", border: "surface-raised", from: "surface-raised", to: "surface-raised" },
  "1a1208": { bg: "surface-raised" },
  "1c1c1c": { bg: "surface-card", border: "surface-card" },
  "2a2a2a": { border: "line", bg: "line", divide: "line", text: "line" },
  "1d9e75": { text: "success", bg: "success", border: "success", fill: "success" },
};

const CLASS = /((?:[a-z0-9-]+:)*)(text|bg|border(?:-[trblxy])?|from|via|to|fill|stroke|ring|outline|decoration|divide|placeholder)-\[#([0-9a-fA-F]{6})\](\/\d+)?/g;
const LITERAL = /#[0-9a-fA-F]{6}\b/g;
const EXT = new Set([".tsx", ".ts", ".jsx", ".js", ".mdx"]);

function* walk(p) {
  const s = statSync(p);
  if (s.isDirectory()) { for (const n of readdirSync(p)) if (n !== "node_modules" && !n.startsWith(".")) yield* walk(join(p, n)); }
  else if (EXT.has(extname(p)) && !/tailwind\.config/.test(p)) yield p;
}

let replaced = 0, files = 0; const unmapped = new Map(); const literals = new Map();
for (const root of roots) for (const file of walk(root)) {
  const src = readFileSync(file, "utf8");
  let n = 0;
  const out = src.replace(CLASS, (m, variants, prop, hex, alpha) => {
    const base = prop.startsWith("border") ? "border" : prop;
    const token = MAP[hex.toLowerCase()]?.[base];
    if (!token) { unmapped.set(m, (unmapped.get(m) || 0) + 1); return m; }
    n++; return `${variants}${prop}-${token}${alpha ?? ""}`;
  });
  const rest = out.replace(CLASS, "").match(LITERAL) || [];
  for (const l of rest) { const k = `${l.toUpperCase()}  ${file}`; literals.set(k, (literals.get(k) || 0) + 1); }
  if (n) { files++; replaced += n; if (write) writeFileSync(file, out); }
}
console.log(`${write ? "Replaced" : "Would replace"} ${replaced} classes in ${files} files.`);
if (unmapped.size) { console.log(`\nNo token for (fix by hand or add a token):`); for (const [k, v] of [...unmapped].sort((a, b) => b[1] - a[1])) console.log(`  ${v}×  ${k}`); }
if (literals.size) { console.log(`\nHex literals outside classes (use var(--if-…)):`); for (const [k, v] of [...literals].sort((a, b) => b[1] - a[1]).slice(0, 40)) console.log(`  ${v}×  ${k}`); if (literals.size > 40) console.log(`  … ${literals.size - 40} more`); }
