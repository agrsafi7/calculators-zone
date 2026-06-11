// Apply the v2 kill list: regenerate deleted-slugs.ts and vercel.json redirects.
import fs from "fs";
import path from "path";

const killList = JSON.parse(fs.readFileSync("docs/calculator-kill-list-v2.json", "utf8")) as Record<string, { slug: string; name: string }[]>;

// Build slug -> categorySlug map by scanning src/data/*.ts
const dataDir = "src/data";
const slugCat = new Map<string, string>();
for (const f of fs.readdirSync(dataDir)) {
  if (!f.endsWith(".ts")) continue;
  const txt = fs.readFileSync(path.join(dataDir, f), "utf8");
  const re = /slug:\s*"([^"]+)"[^}]*categorySlug:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(txt))) {
    if (!slugCat.has(m[1])) slugCat.set(m[1], m[2]);
  }
}

const validCategories = new Set(["finance","health","math","conversions","science","datetime","lifestyle","other"]);

// Preserve existing deletions from previous deleted-slugs.ts
const existing: Record<string, string> = {};
const cur = fs.readFileSync("src/data/deleted-slugs.ts", "utf8");
const reCur = /"([^"]+)":\s*"([^"]+)"/g;
let cm;
while ((cm = reCur.exec(cur))) existing[cm[1]] = cm[2];

const redirects: Record<string, string> = { ...existing };
const missing: string[] = [];
for (const [bucket, items] of Object.entries(killList)) {
  for (const { slug } of items) {
    let cat = slugCat.get(slug);
    if (!cat) { missing.push(slug); continue; }
    if (!validCategories.has(cat)) cat = "other"; // automotive/cooking → other
    redirects[slug] = cat;
  }
}

console.log("Total redirects:", Object.keys(redirects).length, "Missing slugs:", missing.length);
if (missing.length) console.log("Missing examples:", missing.slice(0,10));

// Group by category for nicer file
const byCat: Record<string, string[]> = {};
for (const [slug, cat] of Object.entries(redirects)) {
  (byCat[cat] ||= []).push(slug);
}
for (const cat of Object.keys(byCat)) byCat[cat].sort();

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

// Generate vercel.json redirects
// Need original categorySlug (URL path) — use slugCat (or existing fallback "<cat>")
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

// Conflict check: ensure no source path overlaps another
const dup = vRedirects.map(r=>r.source).filter((s,i,a)=>a.indexOf(s)!==i);
if (dup.length) { console.error("DUPLICATES:", dup); process.exit(1); }
