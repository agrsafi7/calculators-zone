import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowUpRight, Search, X } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { categories, getCategoryIcon } from "@/data/calculators";
import { uniqueCalculators } from "@/lib/calculator-utils";
import AdPlaceholder from "@/components/AdPlaceholder";
import RecentlyUsed from "@/components/RecentlyUsed";
import SEO from "@/components/SEO";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [filter, setFilter] = useState("");
  const category = categories.find((c) => c.slug === slug);
  const allCalcs = uniqueCalculators.filter((c) => c.categorySlug === slug);

  const calculators = useMemo(() => {
    if (!filter.trim()) return allCalcs;
    const q = filter.toLowerCase();
    return allCalcs.filter(
      (c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    );
  }, [allCalcs, filter]);

  // Group by subcategory
  const grouped = useMemo(() => {
    const groups: Record<string, typeof calculators> = {};
    const ungrouped: typeof calculators = [];
    calculators.forEach((c) => {
      const sub = (c as any).subcategory;
      if (sub) {
        if (!groups[sub]) groups[sub] = [];
        groups[sub].push(c);
      } else {
        ungrouped.push(c);
      }
    });
    return { groups, ungrouped };
  }, [calculators]);

  const hasSubcategories = Object.keys(grouped.groups).length > 0;

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-2">Category not found</h1>
        <Link to="/" className="text-primary hover:underline text-sm">Back to Home</Link>
      </div>
    );
  }

  const CatIcon = getCategoryIcon(category.icon);

  const renderCalcGrid = (calcs: typeof calculators) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {calcs.map((calc) => {
        const Icon = getCategoryIcon(calc.icon);
        return (
          <Link
            key={calc.slug}
            to={`/${calc.categorySlug}/${calc.slug}`}
            className="card-elevated bg-card rounded-xl border border-border p-5 group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="font-semibold text-sm mb-1">{calc.name}</h3>
            <p className="text-xs text-muted-foreground">{calc.description}</p>
          </Link>
        );
      })}
    </div>
  );

  return (
    <div>
      <SEO title={`${category.name} Calculators`} description={category.description} canonical={`/category/${category.slug}`} breadcrumbs={[{name:"Home",url:"/"},{name:category.name,url:`/category/${category.slug}`}]} />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: category.name },
      ]} />

      <div className="container mx-auto px-4 pb-12">
        <div className="flex gap-8">
          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Category header */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${category.color}15`, color: category.color }}
              >
                <CatIcon className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-black">{category.name} Calculators</h1>
                <p className="text-muted-foreground text-sm">{category.description} — {allCalcs.length} calculators</p>
              </div>
            </div>

            {/* Search / filter */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder={`Filter ${allCalcs.length} calculators…`}
                className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
              />
              {filter && (
                <button
                  onClick={() => setFilter("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <AdPlaceholder size="leaderboard" />

            {/* Subcategory sections */}
            {hasSubcategories ? (
              <div className="mt-8 space-y-10">
                {grouped.ungrouped.length > 0 && (
                  <div>
                    <h2 className="text-lg font-bold mb-4">General</h2>
                    {renderCalcGrid(grouped.ungrouped)}
                  </div>
                )}
                {Object.entries(grouped.groups).map(([subcategory, calcs]) => (
                  <div key={subcategory}>
                    <div className="flex items-center gap-3 mb-4">
                      <h2 className="text-lg font-bold">{subcategory}</h2>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{calcs.length}</span>
                    </div>
                    {renderCalcGrid(calcs)}
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-8">
                {renderCalcGrid(calculators)}
              </div>
            )}

            {calculators.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-sm">{filter ? "No calculators match your search." : "Calculators coming soon for this category."}</p>
              </div>
            )}

            <div className="mt-8">
              <AdPlaceholder size="leaderboard" />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block w-[300px] shrink-0 space-y-6">
            <AdPlaceholder size="rectangle" />

            {/* Other categories */}
            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-bold text-sm mb-4">Other Categories</h3>
              <ul className="space-y-1">
                {categories
                  .filter((c) => c.slug !== slug)
                  .map((c) => {
                    const OtherIcon = getCategoryIcon(c.icon);
                    return (
                      <li key={c.slug}>
                        <Link
                          to={`/category/${c.slug}`}
                          className="flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-secondary transition-colors text-sm"
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${c.color}15`, color: c.color }}
                          >
                            <OtherIcon className="w-4 h-4" />
                          </div>
                          {c.name}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>

            <RecentlyUsed />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
