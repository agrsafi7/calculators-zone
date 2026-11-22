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

// 1b. Bundle the server entry and load the SSR render function
console.log("[prerender] bundling server entry…");
execSync(
  `"${join(root, "node_modules", ".bin", "esbuild")}" "${join(root, "src", "entry-server.tsx")}" --bundle --platform=node --format=cjs --jsx=automatic --alias:@=${join(root, "src")} --define:import.meta.env.VITE_SUPABASE_URL='"https://localhost"' --define:import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY='"ssr-dummy-key"' --outfile=/tmp/entry-server.cjs --log-level=error`,
  { encoding: "utf-8", maxBuffer: 64 * 1024 * 1024 }
);
// Minimal browser shims so modules that touch localStorage at import time
// (e.g. the supabase client) don't crash the Node render.
if (typeof globalThis.localStorage === "undefined") {
  globalThis.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
  };
}
const { render: renderRoute } = await import("/tmp/entry-server.cjs");

// 1b2. Warm up React.lazy components used by calculator pages
// (LazyGuideSections): renderToString renders the Suspense fallback for an
// unresolved lazy component, so the first SSR render must happen here —
// discarded — with a macrotask afterwards to let the lazy factory's promise
// settle. After that, every real render in the loop below emits the full
// guide HTML. Any calculator route that renders CalculatorTemplate (or a
// dedicated page) works — all four call sites share the one lazy module.
// /science/ routes are excluded because the five science-template pages
// render ScienceCalculator, which has no GuideSections. If this ever stops
// working, the guide-presence assertion in buildHtml fails the build
// loudly instead of shipping guideless pages.
const warmupEntry = entries.find(
  (e) => /^\/[^/]+\/[^/]+$/.test(e.path) && !e.path.startsWith("/science/")
);
if (warmupEntry) {
  try {
    renderRoute(warmupEntry.path);
  } catch {
    // A failed warmup render is not fatal by itself — the assertion in
    // buildHtml will catch any page whose guide is actually missing.
  }
  await new Promise((r) => setTimeout(r, 0));
}

// 1c. Read the Vite manifest to map pages -> output chunks (for per-route
// modulepreload hints, so the client's lazy page chunk is already cached
// when React hydrates and the Suspense boundary resolves)
let manifest = {};
try {
  manifest = JSON.parse(readFileSync(join(dist, ".vite", "manifest.json"), "utf-8"));
} catch {
  console.warn("[prerender] no vite manifest found — skipping per-route preloads");
}
const pageForPath = (p) => {
  if (p === "/") return null; // Index is directly imported in the main bundle
  if (p === "/finance/mortgage-calculator") return "src/pages/MortgageCalculator.tsx";
  if (p === "/health/bmi-calculator") return "src/pages/BmiCalculator.tsx";
  if (p === "/math/percentage-calculator") return "src/pages/PercentageCalculator.tsx";
  if (p === "/categories") return "src/pages/AllCategoriesPage.tsx";
  if (p === "/popular") return "src/pages/PopularToolsPage.tsx";
  if (p === "/sitemap") return "src/pages/SitemapPage.tsx";
  if (p === "/blog") return "src/pages/BlogIndex.tsx";
  if (p === "/about") return "src/pages/AboutPage.tsx";
  if (p.startsWith("/category/")) return "src/pages/CategoryPage.tsx";
  if (p.startsWith("/blog/")) return "src/pages/BlogPost.tsx";
  if (["/privacy-policy", "/terms-of-service", "/disclaimer", "/contact"].includes(p))
    return "src/pages/LegalPages.tsx";
  if (/^\/[^/]+\/[^/]+$/.test(p)) return "src/pages/GenericCalculatorPage.tsx";
  return null;
};
const chunkForPage = (page) => {
  const entry = page && manifest[page];
  return entry ? `/${entry.file}` : null;
};
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
  // hreflang alternates must point at this page, not the homepage template
  // default (the template hardcodes https://thecalculator.us/ for both).
  html = html.replace(
    /<link rel="alternate" href=".*?" hreflang="en"\s*\/?>/,
    `<link rel="alternate" href="${canonical}" hreflang="en" />`
  );
  html = html.replace(
    /<link rel="alternate" href=".*?" hreflang="x-default"\s*\/?>/,
    `<link rel="alternate" href="${canonical}" hreflang="x-default" />`
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
  // Breadcrumb structured data — owned by this prerender layer, like
  // FAQPage above (SEO audit F7 pattern): Helmet <script> children do not
  // survive prerender serialization, so emitting BreadcrumbList from
  // SEO.tsx left the schema out of the served HTML entirely. The trail
  // here is built in collect-meta.ts to match each page's visible
  // breadcrumb trail exactly.
  if (entry.breadcrumbs && entry.breadcrumbs.length > 0) {
    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: entry.breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: `${BASE}${b.url}`,
      })),
    };
    const tag = `<script type="application/ld+json">${JSON.stringify(breadcrumbLd).replace(/</g, "\\u003c")}</script>`;
    html = html.replace("</head>", `  ${tag}\n</head>`);
  }
  // HowTo structured data — owned by this prerender layer, like FAQPage
  // above (same SEO audit F7 pattern: Helmet <script> children don't
  // survive prerender serialization). Steps are built in collect-meta.ts
  // from the config formula + the guide's worked example; pages without a
  // clean worked example carry no howTo and get no block.
  if (entry.howTo) {
    const howToLd = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: entry.howTo.name,
      description: entry.howTo.description,
      step: entry.howTo.steps.map((s) => ({
        "@type": "HowToStep",
        name: s.name,
        text: s.text,
      })),
    };
    const tag = `<script type="application/ld+json">${JSON.stringify(howToLd).replace(/</g, "\\u003c")}</script>`;
    html = html.replace("</head>", `  ${tag}\n</head>`);
  }
  // Article structured data for blog posts (content visible to crawlers without JS)
  if (entry.articleLd) {
    const tag = `<script type="application/ld+json">${JSON.stringify(entry.articleLd).replace(/</g, "\\u003c")}</script>`;
    html = html.replace("</head>", `  ${tag}\n</head>`);
  }
  // Per-route modulepreload: the client's lazy page chunk resolves from cache
  // during hydration instead of flashing the loading skeleton.
  const chunk = chunkForPage(pageForPath(entry.path));
  if (chunk) {
    const preload = `<link rel="modulepreload" crossorigin href="${chunk}" />`;
    html = html.replace("</head>", `  ${preload}\n</head>`);
  }
  // Server-rendered content: real HTML in #root so first paint doesn't wait
  // for the JS bundle. React hydrates this markup on load.
  let ssrOk = false;
  try {
    const ssr = renderRoute(entry.path);
    if (ssr && ssr.includes("<")) {
      // Replace the loading placeholder inside #root with the real content.
      // The placeholder ends at the </div> just before <noscript>.
      html = html.replace(
        /<div id="root">[\s\S]*?<\/div>\s*<noscript>/,
        `<div id="root">${ssr}</div>\n    <noscript>`
      );
      ssrOk = true;
    }
  } catch (err) {
    console.warn(`[prerender] SSR failed for ${entry.path}: ${err.message} — shipping empty shell`);
  }
  // Guide-presence assertion (LazyGuideSections guard): a calculator page
  // whose guide exists must carry it in the served HTML. If the lazy warmup
  // in §1b2 above ever stops resolving the component, renderToString silently
  // renders the Suspense fallback instead — fail the build loudly rather
  // than ship 328 pages with their guides stripped. Only checked when SSR
  // itself succeeded; a failed SSR keeps the existing warn-and-continue.
  if (entry.hasGuide && ssrOk && !html.includes("In-Depth Guide")) {
    throw new Error(
      `[prerender] ${entry.path}: guide missing from served HTML — ` +
        `LazyGuideSections did not resolve during SSR (check the warmup)`
    );
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
// 4. Inline critical CSS so first paint doesn't wait for the full stylesheet
// (the key mobile/Slow-4G bottleneck). The remaining CSS loads async.
console.log("[prerender] inlining critical CSS…");
const { default: Critters } = await import("critters");
const critters = new Critters({
  path: dist,
  preload: "media",
  inlineFonts: true,
  pruneSource: false,
});
let crittersDone = 0;
for (const entry of entries) {
  const file =
    entry.path === "/"
      ? templatePath
      : join(dist, entry.path, "index.html");
  try {
    const html = readFileSync(file, "utf-8");
    const processed = await critters.process(html);
    writeFileSync(file, processed);
    crittersDone++;
  } catch (err) {
    console.warn(`[prerender] critters failed for ${entry.path}: ${err.message}`);
  }
}
console.log(`[prerender] critical CSS inlined in ${crittersDone} files`);
