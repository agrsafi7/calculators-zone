// IndexNow submission for thecalculator.us (set up 2026-11-03).
// Pings Bing/Yandex/etc. instantly when pages are published or changed,
// instead of waiting for the next crawl.
//
// Usage:
//   node scripts/indexnow.mjs                 -> submit ALL URLs from public/sitemap.xml
//   node scripts/indexnow.mjs <url> [url...]  -> submit specific URLs
//
// Run AFTER a deploy is verified live (the key file must be reachable).
// The API key is read from the hosted key file in public/ (single .txt with a 32-hex name).
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const keyFile = readdirSync(join(root, "public")).find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
if (!keyFile) { console.error("IndexNow key file not found in public/"); process.exit(1); }
const key = keyFile.replace(".txt", "");
const host = "thecalculator.us";

let urls = process.argv.slice(2);
if (urls.length === 0) {
  const xml = readFileSync(join(root, "public", "sitemap.xml"), "utf8");
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
console.log(`Submitting ${urls.length} URL(s) to IndexNow with key ${key.slice(0, 8)}...`);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList: urls }),
});
console.log(`IndexNow response: HTTP ${res.status} ${res.statusText}`);
// 200 = accepted, 202 = accepted (key validation pending). Anything else: check body.
if (res.status !== 200 && res.status !== 202) {
  console.log(await res.text());
  process.exit(1);
}
console.log("Done.");
