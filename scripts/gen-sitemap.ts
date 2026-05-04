import { uniqueCalculators } from "../src/lib/calculator-utils";
import { categories } from "../src/data/calculators";
import fs from "fs";

const BASE_URL = "https://thecalculator.us";
const today = new Date().toISOString().split("T")[0];

const staticPages = [
  { loc: "/", priority: "1.0", changefreq: "daily" },
  { loc: "/categories", priority: "0.9", changefreq: "weekly" },
  { loc: "/popular", priority: "0.8", changefreq: "weekly" },
  { loc: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
  { loc: "/terms-of-service", priority: "0.3", changefreq: "yearly" },
  { loc: "/disclaimer", priority: "0.3", changefreq: "yearly" },
  { loc: "/contact", priority: "0.4", changefreq: "yearly" },
];
const categoryPages = categories.map((c: any) => ({ loc: `/category/${c.slug}`, priority: "0.8", changefreq: "weekly" }));
const calcPages = uniqueCalculators.map((c: any) => ({ loc: `/${c.categorySlug}/${c.slug}`, priority: "0.7", changefreq: "monthly" }));
const all = [...staticPages, ...categoryPages, ...calcPages];
const urls = all.map(p => `  <url>\n    <loc>${BASE_URL}${p.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`).join("\n");
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
fs.writeFileSync("public/sitemap.xml", xml);
console.log("Wrote", all.length, "URLs to public/sitemap.xml");
