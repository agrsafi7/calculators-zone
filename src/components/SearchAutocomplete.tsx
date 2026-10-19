import { useEffect, useRef, useState } from "react";
import { searchCalculators } from "@/lib/calculator-utils";
import { getCategoryIcon, type CalculatorInfo } from "@/data/calculators";

// Shared Google-style autocomplete: live suggestion dropdown for any search box.
export function useSearchAutocomplete(onPick: (calc: CalculatorInfo) => void) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<CalculatorInfo[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query.trim();
    setSuggestions(q ? searchCalculators(q) : []);
    setOpen(q.length > 0);
    setActiveIndex(-1);
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const pick = (calc: CalculatorInfo) => {
    setQuery("");
    setOpen(false);
    onPick(calc);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      pick(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return {
    query,
    setQuery,
    suggestions,
    open,
    setOpen,
    activeIndex,
    setActiveIndex,
    ref,
    pick,
    handleKeyDown,
  };
}

export function SearchSuggestions({
  suggestions,
  activeIndex,
  onSelect,
  onHover,
  idPrefix,
}: {
  suggestions: CalculatorInfo[];
  activeIndex: number;
  onSelect: (calc: CalculatorInfo) => void;
  onHover: (i: number) => void;
  idPrefix: string;
}) {
  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden max-h-80 overflow-y-auto">
      {suggestions.map((calc, i) => {
        const Icon = getCategoryIcon(calc.icon);
        return (
          <button
            key={`${idPrefix}-${calc.slug}`}
            type="button"
            onClick={() => onSelect(calc)}
            onMouseEnter={() => onHover(i)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-left ${
              i === activeIndex ? "bg-secondary" : "hover:bg-secondary"
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-surface-low flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-ink truncate">{calc.name}</p>
              <p className="text-xs text-ink-soft">{calc.category}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
