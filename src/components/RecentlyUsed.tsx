import { Link } from "react-router-dom";
import { Star, Trash2 } from "lucide-react";
import { getRecentCalculators, clearRecentCalculators } from "@/lib/calculator-utils";
import { useEffect, useState } from "react";
import type { RecentEntry } from "@/lib/calculator-utils";

const RecentlyUsed = () => {
  const [recents, setRecents] = useState<RecentEntry[]>([]);

  useEffect(() => {
    setRecents(getRecentCalculators());
  }, []);

  const handleClear = () => {
    clearRecentCalculators();
    setRecents([]);
  };

  if (recents.length === 0) return null;

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-sm flex items-center gap-2">
          <Star className="w-4 h-4 text-primary" /> Recently Used
        </h3>
        <button
          onClick={handleClear}
          className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors"
        >
          <Trash2 className="w-3 h-3" /> Clear
        </button>
      </div>
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
