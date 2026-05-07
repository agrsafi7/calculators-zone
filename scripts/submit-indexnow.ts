/**
 * Submits sitemap URLs to IndexNow (used by Bing, Yandex, Seznam, Naver, Yep).
 * Run with: bun scripts/submit-indexnow.ts
 *
 * After running, also manually submit the sitemap once at:
 *   - Bing Webmaster Tools:   https://www.bing.com/webmasters  (Sitemaps → Submit sitemap)
 *   - Yandex Webmaster:       https://webmaster.yandex.com
 *   - DuckDuckGo / Brave / Ecosia: index from Bing automatically.
 *   - Google Search Console:  https://search.google.com/search-console
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

const HOST = "thecalculator.us";
const KEY = "f937249da4607fa4011d25f1fa822657";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const sitemapXml = readFileSync(join(process.cwd(), "public/sitemap.xml"), "utf8");
const urls = Array.from(sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)).map((m) => m[1]);

console.log(`Found ${urls.length} URLs in sitemap.`);

const endpoints = [
  "https://api.indexnow.org/IndexNow",
  "https://www.bing.com/IndexNow",
  "https://yandex.com/indexnow",
];

// IndexNow accepts up to 10,000 URLs per request.
const chunkSize = 1000;
for (const endpoint of endpoints) {
  for (let i = 0; i < urls.length; i += chunkSize) {
    const chunk = urls.slice(i, i + chunkSize);
    const body = {
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: chunk,
    };
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(body),
      });
      console.log(`[${endpoint}] batch ${i / chunkSize + 1}: HTTP ${res.status}`);
    } catch (err) {
      console.error(`[${endpoint}] batch ${i / chunkSize + 1} failed:`, err);
    }
  }
}

console.log("Done. Bing, Yandex, DuckDuckGo, Brave, Ecosia, and Seznam will pick up the URLs from IndexNow.");
