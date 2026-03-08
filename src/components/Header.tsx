import { Link } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchCalculators } from "@/lib/calculator-utils";
import { getCategoryIcon, type CalculatorInfo } from "@/data/calculators";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
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
  };

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 bg-foreground rounded-md flex items-center justify-center">
            <div className="w-3.5 h-3.5 grid grid-cols-2 gap-0.5">
              <div className="bg-primary-foreground rounded-[1px]" />
              <div className="bg-primary-foreground rounded-[1px]" />
              <div className="bg-primary-foreground rounded-[1px]" />
              <div className="bg-primary-foreground rounded-[1px]" />
            </div>
          </div>
          <span className="text-lg font-bold text-foreground">CalcHub</span>
        </Link>

        {/* Center search */}
        <div ref={ref} className="hidden md:block relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search calculators..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          {open && results.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden max-h-80 overflow-y-auto">
              {results.map((calc) => {
                const Icon = getCategoryIcon(calc.icon);
                return (
                  <button
                    key={calc.slug}
                    onClick={() => handleSelect(calc)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-secondary transition-colors text-left"
                  >
                    <div className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5 text-primary" />
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
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Log In
          </button>
          <button className="px-4 py-1.5 bg-foreground text-background text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">
            Sign Up
          </button>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 py-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search calculators..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button className="flex-1 py-2 text-sm font-medium text-foreground border border-border rounded-lg">
              Log In
            </button>
            <button className="flex-1 py-2 bg-foreground text-background text-sm font-semibold rounded-lg">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
