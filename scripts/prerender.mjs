// Post-build prerender: generates one static HTML file per route with correct
// <title>, meta description, canonical, and OG tags, plus FAQ JSON-LD where
// available. Crawlers and social previews see accurate per-page meta even
// before the React app hydrates. The SPA rewrite in vercel.json only applies
// when no static file matches, so these files are served directly.
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const BASE = "https://thecalculator.us";

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// 1. Bundle + run the collector to get the manifest
console.log("[prerender] collecting route meta…");
const out = execSync(
  `"${join(root, "node_modules", ".bin", "esbuild")}" "${join(root, "scripts", "collect-meta.ts")}" --bundle --platform=node --format=cjs --alias:@=${join(root, "src")} --outfile=/tmp/collect-meta.cjs --log-level=error && node /tmp/collect-meta.cjs`,
  { encoding: "utf-8", maxBuffer: 64 * 1024 * 1024 }
);
const entries = JSON.parse(out);
console.log(`[prerender] ${entries.length} routes`);

// 2. Read the built index.html template
const templatePath = join(dist, "index.html");
if (!existsSync(templatePath)) {
  console.error("[prerender] dist/index.html not found — run vite build first");
  process.exit(1);
}
const template = readFileSync(templatePath, "utf-8");

const buildHtml = (entry) => {
  const title = esc(entry.title);
  const desc = esc(entry.description);
  const canonical = `${BASE}${entry.path === "/" ? "/" : entry.path}`;
  let html = template;
  html = html.replace(/<title>.*?<\/title>/s, `<title>${title}</title>`);
  html = html.replace(
    /<meta name="description" content=".*?"\s*\/?>/,
    `<meta name="description" content="${desc}" />`
  );
  html = html.replace(
    /<link rel="canonical" href=".*?"\s*\/?>/,
    `<link rel="canonical" href="${canonical}" />`
  );
  html = html.replace(
    /<meta property="og:title" content=".*?"\s*\/?>/,
    `<meta property="og:title" content="${title}" />`
  );
  html = html.replace(
    /<meta property="og:description" content=".*?"\s*\/?>/,
    `<meta property="og:description" content="${desc}" />`
  );
  html = html.replace(
    /<meta property="og:url" content=".*?"\s*\/?>/,
    `<meta property="og:url" content="${canonical}" />`
  );
  // FAQ structured data for rich results
  if (entry.faqs && entry.faqs.length > 0) {
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: entry.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    };
    const tag = `<script type="application/ld+json">${JSON.stringify(faqLd).replace(/</g, "\\u003c")}</script>`;
    html = html.replace("</head>", `  ${tag}\n</head>`);
  }
  return html;
};

// 3. Write per-route files (+ rewrite homepage index.html with accurate meta)
let written = 0;
for (const entry of entries) {
  const html = buildHtml(entry);
  if (entry.path === "/") {
    writeFileSync(templatePath, html);
    written++;
    continue;
  }
  const dir = join(dist, entry.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
  written++;
}
console.log(`[prerender] wrote ${written} HTML files`);
