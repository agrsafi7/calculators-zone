import { useEffect } from "react";
import { uniqueCalculators } from "@/lib/calculator-utils";
import { categories } from "@/data/calculators";

const BASE_URL = "https://thecalculator.us";

const SitemapPage = () => {
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

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  useEffect(() => {
    // Download the sitemap as a file for search engines
    const blob = new Blob([sitemapXml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    
    // Create a download link
    const link = document.createElement("a");
    link.href = url;
    link.download = "sitemap.xml";
    
    // Cleanup
    return () => URL.revokeObjectURL(url);
  }, [sitemapXml]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-4">XML Sitemap</h1>
      <p className="text-muted-foreground mb-6">
        This sitemap contains {allPages.length} URLs for search engine crawling. 
        The sitemap is also available at <code className="px-2 py-1 bg-secondary rounded text-sm">/sitemap.xml</code>
      </p>
      
      <div className="mb-6">
        <a 
          href={`data:application/xml;charset=utf-8,${encodeURIComponent(sitemapXml)}`}
          download="sitemap.xml"
          className="inline-flex px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Download sitemap.xml
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-card rounded-xl border border-border p-5">
          <p className="text-3xl font-black text-primary">{staticPages.length}</p>
          <p className="text-sm text-muted-foreground">Static Pages</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <p className="text-3xl font-black text-primary">{categoryPages.length}</p>
          <p className="text-sm text-muted-foreground">Category Pages</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <p className="text-3xl font-black text-primary">{calcPages.length}</p>
          <p className="text-sm text-muted-foreground">Calculator Pages</p>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border bg-secondary/50">
          <p className="text-sm font-medium">sitemap.xml preview</p>
        </div>
        <pre className="p-4 text-xs overflow-x-auto max-h-[500px] overflow-y-auto text-muted-foreground">
          {sitemapXml}
        </pre>
      </div>
    </div>
  );
};

export default SitemapPage;
