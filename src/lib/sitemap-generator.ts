import { uniqueCalculators } from "@/lib/calculator-utils";
import { categories } from "@/data/calculators";

const BASE_URL = "https://thecalculator.us";

export const generateSitemapXml = (): string => {
  const today = new Date().toISOString().split("T")[0];

  const staticPages = [
    { loc: "/", priority: "1.0", changefreq: "daily" },
    { loc: "/categories", priority: "0.9", changefreq: "weekly" },
    { loc: "/popular", priority: "0.8", changefreq: "weekly" },
    { loc: "/about", priority: "0.6", changefreq: "monthly" },
    { loc: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
    { loc: "/terms-of-service", priority: "0.3", changefreq: "yearly" },
    { loc: "/disclaimer", priority: "0.3", changefreq: "yearly" },
    { loc: "/contact", priority: "0.4", changefreq: "yearly" },
  ];

  const categoryPages = categories.map((cat) => ({
    loc: `/category/${cat.slug}`,
    priority: "0.8",
    changefreq: "weekly",
  }));

  const calcPages = uniqueCalculators.map((calc) => ({
    loc: `/${calc.categorySlug}/${calc.slug}`,
    priority: "0.7",
    changefreq: "monthly",
  }));

  const allPages = [...staticPages, ...categoryPages, ...calcPages];

  const urls = allPages
    .map(
      (p) => `  <url>
    <loc>${BASE_URL}${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
};
