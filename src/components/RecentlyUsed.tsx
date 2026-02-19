import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { getRecentCalculators } from "@/lib/calculator-utils";
import { getCategoryIcon } from "@/data/calculators";
import { useEffect, useState } from "react";
import type { RecentEntry } from "@/lib/calculator-utils";

const RecentlyUsed = () => {
  const [recents, setRecents] = useState<RecentEntry[]>([]);

  useEffect(() => {
    setRecents(getRecentCalculators());
  }, []);

  if (recents.length === 0) return null;

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
        <Star className="w-4 h-4 text-primary" /> Recently Used
      </h3>
      <ul className="space-y-3">
        {recents.map((calc) => (
          <li key={calc.slug}>
            <Link to={`/${calc.categorySlug}/${calc.slug}`} className="block hover:opacity-80 transition-opacity">
              <p className="text-sm font-medium">{calc.name}</p>
              <p className="text-xs text-muted-foreground">{calc.category}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentlyUsed;
