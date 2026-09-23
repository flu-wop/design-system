// Flattens src/styles/{tokens,base,components}.css into ./styles.css (what sites import).
import { readFileSync, writeFileSync } from "node:fs";
const parts = ["tokens", "base", "components"].map((n) => readFileSync(new URL(`../src/styles/${n}.css`, import.meta.url), "utf8"));
writeFileSync(new URL("../styles.css", import.meta.url), parts.join("\n"));
console.log("styles.css written");
