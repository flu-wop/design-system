// Flattens src/styles into what sites import:
//   styles.css  = tokens + shadcn/legacy compat vars + base + components   (the dark/gold ecosystem sites)
//   core.css    = --if-* tokens + components only: no compat vars, no base element styles (client-brand sites, with a theme)
//   compat.css  = shadcn/ui + legacy --color-*/--font-* vars mapped onto the tokens (pair with core.css + preset)
//   themes/*.css = one brand theme per client, applied with <html data-theme="…">
import { readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync } from "node:fs";
const src = (p) => new URL(`../src/styles/${p}`, import.meta.url);
const out = (p) => new URL(`../${p}`, import.meta.url);
const read = (n) => readFileSync(src(`${n}.css`), "utf8");
writeFileSync(out("styles.css"), ["tokens", "compat", "base", "components"].map(read).join("\n"));
writeFileSync(out("core.css"), ["tokens", "components"].map(read).join("\n"));
writeFileSync(out("compat.css"), read("compat"));
mkdirSync(out("themes/"), { recursive: true });
for (const f of readdirSync(src("themes/"))) copyFileSync(src(`themes/${f}`), out(`themes/${f}`));
console.log("styles.css, core.css and themes/ written");
