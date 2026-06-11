// Apply v2 KEEP allowlist using the runtime calculator list (uniqueCalculators).
import fs from "fs";
import { allCalculators } from "../src/lib/calculator-utils";

const md = fs.readFileSync("docs/calculator-kill-list-v2.md", "utf8");
const keepSet = new Set<string>();
for (const m of md.matchAll(/✅\s+`([^`]+)`/g)) keepSet.add(m[1]);
// Always keep popular essentials
for (const s of ["mortgage-calculator","bmi-calculator","percentage-calculator","age-calculator","salary-calculator","length-converter"]) keepSet.add(s);
console.log("KEEP allowlist size:", keepSet.size);

const validCategories = new Set(["finance","health","math","conversions","science","datetime","lifestyle","other"]);

// Dedup by slug, take first occurrence's categorySlug
const slugCat = new Map<string, string>();
for (const c of allCalculators) if (!slugCat.has(c.slug)) slugCat.set(c.slug, c.categorySlug);
console.log("Total unique slugs:", slugCat.size);

const redirects: Record<string, string> = {};
for (const [slug, origCat] of slugCat.entries()) {
  if (keepSet.has(slug)) continue;
  let target = origCat;
  if (!validCategories.has(target)) target = "other";
  redirects[slug] = target;
}
console.log("Will delete:", Object.keys(redirects).length, "Will keep:", slugCat.size - Object.keys(redirects).length);

const byCat: Record<string, string[]> = {};
for (const [slug, cat] of Object.entries(redirects)) (byCat[cat] ||= []).push(slug);
for (const k of Object.keys(byCat)) byCat[k].sort();

let body = `// Calculators removed during pruning passes.
// These slugs are filtered from listings/search/sitemap and 301-redirect
// to their category page (see vercel.json + GenericCalculatorPage).

export const DELETED_REDIRECTS: Record<string, string> = {\n`;
for (const cat of Object.keys(byCat).sort()) {
  body += `  // ${cat} → /category/${cat}\n`;
  for (const s of byCat[cat]) body += `  "${s}": "${cat}",\n`;
}
body += `};\n\nexport const DELETED_SLUGS: Set<string> = new Set(Object.keys(DELETED_REDIRECTS));\n`;
fs.writeFileSync("src/data/deleted-slugs.ts", body);

const vercel = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
const vRedirects: any[] = [];
const seen = new Set<string>();
for (const slug of Object.keys(redirects)) {
  const origCat = slugCat.get(slug) || redirects[slug];
  const source = `/${origCat}/${slug}`;
  if (seen.has(source)) continue;
  seen.add(source);
  vRedirects.push({ source, destination: `/category/${redirects[slug]}`, statusCode: 301 });
}
vRedirects.sort((a,b)=>a.source.localeCompare(b.source));
vercel.redirects = vRedirects;
fs.writeFileSync("vercel.json", JSON.stringify(vercel, null, 2) + "\n");
console.log("Wrote", vRedirects.length, "vercel redirects");

const dup = vRedirects.map(r=>r.source).filter((s,i,a)=>a.indexOf(s)!==i);
if (dup.length) { console.error("DUPLICATE SOURCES:", dup); process.exit(1); }
const destSet = new Set(vRedirects.map(r=>r.destination));
for (const r of vRedirects) if (destSet.has(r.source)) { console.error("LOOP:", r); process.exit(1); }
console.log("No conflicts, no loops ✓");

// Save redirect table preview
const tableMd = "# Redirect Preview\n\n| Old URL | → | New URL |\n|---|---|---|\n" +
  vRedirects.map(r=>`| \`${r.source}\` | → | \`${r.destination}\` |`).join("\n") + "\n";
fs.writeFileSync("docs/redirect-table.md", tableMd);
console.log("Wrote docs/redirect-table.md");
