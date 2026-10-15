import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { categories } from "@/data/calculators";
import { uniqueCalculators } from "@/lib/calculator-utils";
import { categorySEOData, getMetaKeywords } from "@/lib/seo-keywords";
import SEO from "@/components/SEO";

const CATEGORY_IMAGES: Record<string, string> = {
  finance: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiVEwE0z5UThuB6Kp4dzOehehPrRbBJZKOZivzMq8Q7rFZ9I2qGb-4z-QjSK9N3l2PSEZiGZ7TsdzIDuUIma-jCF9pljhBUcV-utx1sEF5eD4W4eaOI5o4_wizxtNvTLXJNdyotT0xgVfTiDuDQYbrqaD1GxNnBQKBSz1b--HgHoUlsOBvh1ODKUHOkuqhcGxm4WIdfswbIW_2ixcY2mzPKAJ00CVM_N2PtXdzhVl_i67Yx_RwFfmo=w200",
  health: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGK_sBsDvtmwKepjEMXeYySXCsEmu9r0FN6nZWO00vGYRjemPdALqLRIiqsTTFGb3o0IZNCwMS3ieIts4OTgMk7VF9WhBc1MpqQGON4jQbWeIGZnCl8-QO8h3nXx5CmEElIsIKuq59cyUmlm1sL4ua_E50BbrxHhud6jmuZ3FIyN2kgn_otkIFpDKiRW-OACpvwoYRzwM0z6ilvBE7ff4Zmotrz78OIzTRUXCkaEwBRx7CJLhUiswR=w200",
  math: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBng2iry8yhYtaA0BhItFPEIG97gbyp--Zh5rfqhGrPBIxNnHVh-p_twmW6HjxLpw_wBszeacQZ1VrYRSkxrSGNOq2PQbMsOpYBdWlLz3ulCdRAxqsDzAj9cfVYfTmKyXwDLk4sfhN-86UqpwfI8rJpZjPmO8k4KjzUYvNyEmz4vWQJ6nKskGnoL61kkPDRc6Zc7I0kpXewYSnDkmrYlg5Uw6lzoYewo26UyzndmomTv8hQh8PsG2E=w200",
  other: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1cPfaMmkKFwMWFwpCgKuWEAyKkTH_84snAQOQ_ayRYd4NrxBUgBiF-Lti9my-q9ey9XC9_kyvUv342LU5Wf2dLX6BcJbe0_kYBJ5phe9y_Kp7ziLOyZ5hWqkZB56LcV3uHYljb9Cd_HV77INijaTLcNfUfVy73vq63km0G7XDt-ZuH9VoqbfygBCucW_UytgX1xwjkVxzacyelklwzzB_rk1f2tj1epsxNBdAtCu8TZ37ky1gBajd=w200",
};

const CATEGORY_ICONS: Record<string, string> = {
  conversions: "swap_horiz",
  datetime: "schedule",
  science: "science",
  lifestyle: "home",
};
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
        <h1 className="font-display text-[24px] font-semibold mb-2">Category not found</h1>
        <Link to="/" className="text-link hover:underline text-[13px]">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-background min-h-[calc(100vh-144px)]">
      <SEO
        title={`${category.name} Calculators — Free Online Tools`}
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
                  <span className="material-symbols-outlined text-white text-[28px]">{CATEGORY_ICONS[category.slug]}</span>
                </span>
              )}
              <div className="flex flex-wrap items-baseline justify-between gap-2 flex-1">
                <h1 className="font-display text-[24px] font-semibold text-ink tracking-tight">
                  {category.name} Calculators
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
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-ink-soft text-[18px]">search</span>
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
                <span className="material-symbols-outlined text-[18px]">close</span>
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
                    {rc.name} Calculators
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* SEO bottom content */}
          <section className="mt-6 border-t border-surface-container pt-6">
            <h2 className="font-display text-[18px] font-semibold text-ink mb-3">About {category.name} Calculators</h2>
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
