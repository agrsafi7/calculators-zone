import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { categories, getCategoryIcon } from "@/data/calculators";
import { uniqueCalculators } from "@/lib/calculator-utils";

const CalculatorMegaMenu = ({ onClose }: { onClose?: () => void }) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const getCategoryCalcs = (slug: string) =>
    uniqueCalculators.filter((c) => c.categorySlug === slug).sort((a, b) => a.name.localeCompare(b.name));

  // Group by subcategory if available
  const groupBySubcategory = (calcs: typeof uniqueCalculators) => {
    const groups: Record<string, typeof uniqueCalculators> = {};
    calcs.forEach((c) => {
      const sub = (c as any).subcategory || "General";
      if (!groups[sub]) groups[sub] = [];
      groups[sub].push(c);
    });
    return groups;
  };

  return (
    <div className="w-full">
      {categories.map((cat) => {
        const Icon = getCategoryIcon(cat.icon);
        const isOpen = openCategory === cat.slug;
        const calcs = getCategoryCalcs(cat.slug);
        const groups = groupBySubcategory(calcs);
        const groupKeys = Object.keys(groups).sort();

        return (
          <div key={cat.slug} className="border-b border-border/50 last:border-b-0">
            <button
              onClick={() => setOpenCategory(isOpen ? null : cat.slug)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${cat.color}20` }}
                >
                  <Icon className="w-4 h-4" style={{ color: cat.color }} />
                </div>
                <div className="text-left">
                  <span className="text-sm font-semibold text-foreground">{cat.name}</span>
                  <span className="text-[11px] text-muted-foreground ml-2">({calcs.length})</span>
                </div>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="bg-secondary/30 px-4 pb-3 animate-accordion-down">
                {groupKeys.length > 1 ? (
                  groupKeys.map((group) => (
                    <div key={group} className="mb-2">
                      <p className="text-[11px] font-semibold text-primary uppercase tracking-wider mb-1 mt-2 border-b border-primary/20 pb-1">
                        {group}
                      </p>
                      <div className="grid grid-cols-2 gap-x-4">
                        {groups[group].map((calc) => (
                          <Link
                            key={calc.slug}
                            to={`/${calc.categorySlug}/${calc.slug}`}
                            onClick={onClose}
                            className="text-xs text-muted-foreground hover:text-foreground py-1 border-b border-border/30 truncate transition-colors"
                          >
                            {calc.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="grid grid-cols-2 gap-x-4">
                    {calcs.map((calc) => (
                      <Link
                        key={calc.slug}
                        to={`/${calc.categorySlug}/${calc.slug}`}
                        onClick={onClose}
                        className="text-xs text-muted-foreground hover:text-foreground py-1 border-b border-border/30 truncate transition-colors"
                      >
                        {calc.name}
                      </Link>
                    ))}
                  </div>
                )}

                <Link
                  to={`/category/${cat.slug}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary mt-2 hover:underline"
                >
                  View all {cat.name} <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CalculatorMegaMenu;
