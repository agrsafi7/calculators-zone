import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { categories } from "@/data/calculators";
import { uniqueCalculators } from "@/lib/calculator-utils";
import { categorySEOData, getMetaKeywords } from "@/lib/seo-keywords";
import SEO from "@/components/SEO";
import { ArrowLeftRight, Clock, FlaskConical, Home, LucideIcon, Search, X } from "lucide-react";

const CATEGORY_IMAGES: Record<string, string> = {
  finance: "/images/categories/finance.webp",
  health: "/images/categories/health.webp",
  math: "/images/categories/math.webp",
  other: "/images/categories/other.webp",
};

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  conversions: ArrowLeftRight,
  datetime: Clock,
  science: FlaskConical,
  lifestyle: Home,
};
const catTitle = (name: string) => (name.endsWith("Calculators") ? name : `${name} Calculators`);

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [filter, setFilter] = useState("");
  const category = categories.find((c) => c.slug === slug);
  const allCalcs = uniqueCalculators.filter((c) => c.categorySlug === slug);
  const seoData = slug ? categorySEOData[slug] : undefined;

  const calculators = useMemo(() => {
    if (!filter.trim()) return allCalcs;
    const q = filter.toLowerCase();
    return allCalcs.filter(
      (c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    );
  }, [allCalcs, filter]);

  const grouped = useMemo(() => {
    const groups = new Map<string, typeof calculators>();
    const ungrouped: typeof calculators = [];
    calculators.forEach((c) => {
      const sub = (c as any).subcategory;
      if (sub) {
        if (!groups.has(sub)) groups.set(sub, []);
        groups.get(sub)!.push(c);
      } else {
        ungrouped.push(c);
      }
    });
    return { groups: [...groups.entries()], ungrouped };
  }, [calculators]);

  if (!category) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-16 text-center">
        {/* SEO audit F4 fallback: unknown category slugs are noindexed.
            The edge middleware returns a real HTTP 404 for these paths. */}
        <SEO
          title="Category Not Found"
          description="This calculator category does not exist on TheCalculator.us. Browse all calculator categories to find the tool you need."
          noindex
        />
        <h1 className="font-display text-[24px] font-semibold mb-2">Category not found</h1>
        <Link to="/" className="text-link hover:underline text-[13px]">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-background min-h-[calc(100vh-144px)]">
      <SEO
        title={`${catTitle(category.name)} — Free Online Tools`}
        description={seoData?.contentIntro?.slice(0, 155) || category.description}
        canonical={`/category/${category.slug}`}
        keywords={slug ? getMetaKeywords(slug) : undefined}
        breadcrumbs={[{ name: "Home", url: "/" }, { name: category.name, url: `/category/${category.slug}` }]}
      />

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10 py-5">
        <div className="flex flex-col w-full">
          {/* Breadcrumbs & header */}
          <div className="flex flex-col mb-4">
            <div className="flex items-center gap-1.5 text-[11px] text-ink-soft">
              <Link className="hover:text-primary transition-colors" to="/">Home</Link>
              <span className="opacity-50">/</span>
              <span className="text-ink font-medium">{category.name}</span>
            </div>
            <div className="flex items-center gap-4 mt-2">
              {CATEGORY_IMAGES[category.slug] ? (
                <img
                  className="w-14 h-14 rounded-full object-cover shrink-0 shadow-sm"
                  src={CATEGORY_IMAGES[category.slug]}
                  alt={`${category.name} calculators`}
                />
              ) : (
                <span className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-sm">
                  {(() => { const DynIcon = CATEGORY_ICONS[category.slug]; return <DynIcon size={28} className="text-white" />; })()}
                </span>
              )}
              <div className="flex flex-wrap items-baseline justify-between gap-2 flex-1">
                <h1 className="font-display text-[24px] font-semibold text-ink tracking-tight">
                  {catTitle(category.name)}
                </h1>
                <span className="text-[12px] text-ink-soft">{allCalcs.length} free tools</span>
              </div>
            </div>
            <p className="text-[14px] text-ink-soft mt-2">{category.description}</p>
          </div>

          {/* SEO intro */}
          {seoData && (
            <div className="mb-5 text-[12px] text-ink-soft leading-relaxed space-y-2">
              <p>{seoData.contentIntro}</p>
              {seoData.topCalcLinks.length > 0 && (
                <p>
                  <strong className="text-ink">Popular tools:</strong>{" "}
                  {seoData.topCalcLinks.map((link, i) => (
                    <span key={link.calcSlug}>
                      <Link to={`/${link.slug}/${link.calcSlug}`} className="text-link hover:underline font-medium">
                        {link.name}
                      </Link>
                      {i < seoData.topCalcLinks.length - 1 ? ", " : "."}
                    </span>
                  ))}
                </p>
              )}
            </div>
          )}

          {/* Filter */}
          <div className="relative max-w-md mb-6">
            <Search size={18} className="absolute left-3 top-2.5 text-ink-soft" />
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder={`Filter ${allCalcs.length} calculators…`}
              className="w-full pl-9 pr-9 py-2 rounded-lg bg-surface-low text-[13px] text-ink placeholder:text-ink-soft focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {filter && (
              <button
                onClick={() => setFilter("")}
                className="absolute right-3 top-2.5 text-ink-soft hover:text-ink"
                aria-label="Clear filter"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Calculator link groups */}
          <div className="bg-surface-lowest rounded-xl p-6 shadow-sm mb-6">
            {grouped.ungrouped.length > 0 && (
              <div className="mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6">
                  {grouped.ungrouped.map((calc) => (
                    <Link
                      key={calc.slug}
                      to={`/${calc.categorySlug}/${calc.slug}`}
                      className="text-[13px] text-link hover:text-link-dark hover:underline block py-1"
                    >
                      {calc.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {grouped.groups.map(([sub, calcs]) => (
              <div key={sub} className="mb-6 last:mb-0">
                <h2 className="font-display text-[15px] font-semibold text-ink mb-2">{sub}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6">
                  {calcs.map((calc) => (
                    <Link
                      key={calc.slug}
                      to={`/${calc.categorySlug}/${calc.slug}`}
                      className="text-[13px] text-link hover:text-link-dark hover:underline block py-1"
                    >
                      {calc.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            {calculators.length === 0 && (
              <p className="text-[13px] text-ink-soft text-center py-8">
                {filter ? "No calculators match your search." : "Calculators coming soon for this category."}
              </p>
            )}
          </div>

          {/* Related categories */}
          {seoData && seoData.relatedCategories.length > 0 && (
            <div className="mt-2 pt-6 border-t border-surface-container">
              <h2 className="font-display text-[18px] font-semibold text-ink mb-3">Explore Related Categories</h2>
              <div className="flex flex-wrap gap-1.5">
                {seoData.relatedCategories.map((rc) => (
                  <Link
                    key={rc.slug}
                    to={`/category/${rc.slug}`}
                    className="text-[12px] text-link hover:text-link-dark bg-surface-lowest px-2.5 py-1.5 rounded hover:shadow-sm transition-all"
                  >
                    {catTitle(rc.name)}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* SEO bottom content */}
          <section className="mt-6 border-t border-surface-container pt-6">
            <h2 className="font-display text-[18px] font-semibold text-ink mb-3">About {catTitle(category.name)}</h2>
            <div className="text-[12px] text-ink-soft space-y-3 leading-relaxed">
              <p>
                TheCalculator.us's <strong>{category.name.toLowerCase()} calculators</strong> are designed for users in the United States,
                United Kingdom, Canada, and Australia. All tools are free, require no registration, and work on any device —
                desktop, tablet, or mobile.
              </p>
              <p>
                Each calculator uses established formulas and provides instant results directly in your browser.
                Whether you're a student, professional, or simply curious, our {allCalcs.length} {category.name.toLowerCase()} tools
                are here to help. <Link to="/categories" className="text-link hover:underline font-medium">Browse all calculator categories</Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
