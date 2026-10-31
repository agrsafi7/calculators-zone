import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { uniqueCalculators } from "@/lib/calculator-utils";
import { categories } from "@/data/calculators";
import { getPublishedPosts } from "@/data/blog-posts";

// Human-readable sitemap (SEO audit F15). The previous version generated a
// fake XML preview client-side — wrong URL count, every <lastmod> set to
// "today", all blog posts missing, plus a dead blob useEffect. This page is
// now a plain directory built from the same live data as the rest of the
// site, so it can never drift out of sync. The machine-readable sitemap for
// search engines stays at /sitemap.xml (declared in robots.txt and Search
// Console) and is linked below — it is NOT generated here.

const MAIN_PAGES = [
  { name: "Home", path: "/" },
  { name: "All Calculator Categories", path: "/categories" },
  { name: "Popular Calculators", path: "/popular" },
  { name: "Blog", path: "/blog" },
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contact" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Terms of Service", path: "/terms-of-service" },
  { name: "Disclaimer", path: "/disclaimer" },
];

const SitemapPage = () => {
  const posts = getPublishedPosts();

  return (
    <div>
      <SEO
        title="Sitemap"
        description="Browse every calculator and page on TheCalculator.us, organized by category: finance, health, math, conversions, science, date & time, lifestyle, and more."
        canonical="/sitemap"
      />
      <Breadcrumbs items={[{ label: "Sitemap" }]} />
      <div className="container mx-auto px-4 py-10 max-w-[1200px]">
        <h1 className="text-3xl font-bold mb-2">Sitemap</h1>
        <p className="text-muted-foreground mb-8">
          Every calculator and page on TheCalculator.us — {uniqueCalculators.length} calculators
          across {categories.length} categories. For search engines, the XML sitemap is at{" "}
          <a href="/sitemap.xml" className="text-link hover:underline font-medium">
            thecalculator.us/sitemap.xml
          </a>
          .
        </p>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">Main Pages</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
            {MAIN_PAGES.map((p) => (
              <li key={p.path}>
                <Link to={p.path} className="text-link hover:underline">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {categories.map((cat) => {
          const calcs = uniqueCalculators.filter((c) => c.categorySlug === cat.slug);
          if (calcs.length === 0) return null;
          return (
            <section key={cat.slug} className="mb-10">
              <h2 className="text-xl font-bold mb-3">
                <Link to={`/category/${cat.slug}`} className="hover:text-primary transition-colors">
                  {cat.name}
                  {cat.name.endsWith("Calculators") ? "" : " Calculators"}
                </Link>{" "}
                <span className="text-sm font-normal text-muted-foreground">({calcs.length})</span>
              </h2>
              <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
                {calcs.map((c) => (
                  <li key={c.slug}>
                    <Link to={`/${c.categorySlug}/${c.slug}`} className="text-link hover:underline">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">
            <Link to="/blog" className="hover:text-primary transition-colors">
              Blog — Guides &amp; Explainers
            </Link>{" "}
            <span className="text-sm font-normal text-muted-foreground">({posts.length})</span>
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link to={`/blog/${p.slug}`} className="text-link hover:underline">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default SitemapPage;
