import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { searchCalculators } from "@/lib/calculator-utils";
import { getCategoryIcon, type CalculatorInfo } from "@/data/calculators";

interface SearchBarProps {
  placeholder?: string;
  large?: boolean;
  onAfterSelect?: () => void;
}

const SearchBar = ({ placeholder = "Search tools...", large = false, onAfterSelect }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CalculatorInfo[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setResults(searchCalculators(query));
    setOpen(query.trim().length > 0);
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (calc: CalculatorInfo) => {
    setQuery("");
    setOpen(false);
    navigate(`/${calc.categorySlug}/${calc.slug}`);
    onAfterSelect?.();
  };

  return (
    <div ref={ref} className="relative w-full">
      <Search
        className={`absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground ${
          large ? "w-5 h-5 left-4" : "w-4 h-4"
        }`}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`w-full border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary ${
          large ? "pl-12 pr-28 py-3.5 rounded-xl shadow-sm" : "pl-9 pr-3 py-1.5 rounded-lg bg-secondary"
        }`}
      />
      {large && (
        <button
          onClick={() => {
            if (results.length > 0) handleSelect(results[0]);
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          Search
        </button>
      )}

      {open && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden">
          {results.map((calc) => {
            const Icon = getCategoryIcon(calc.icon);
            return (
              <button
                key={calc.slug}
                onClick={() => handleSelect(calc)}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-secondary transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{calc.name}</p>
                  <p className="text-xs text-muted-foreground">{calc.category}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {open && query.trim().length > 0 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-50 p-4 text-center text-sm text-muted-foreground">
          No calculators found for "{query}"
        </div>
      )}
    </div>
  );
};

export default SearchBar;
