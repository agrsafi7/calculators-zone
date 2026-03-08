import { Link } from "react-router-dom";
import { Menu, X, Search, Moon, Sun } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchCalculators } from "@/lib/calculator-utils";
import { getCategoryIcon, categories, type CalculatorInfo } from "@/data/calculators";
import { useDarkMode } from "@/hooks/use-dark-mode";

const Header = () => {
  const { isDark, toggle: toggleDark } = useDarkMode();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CalculatorInfo[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setResults(searchCalculators(query));
    setOpen(query.trim().length > 0);
  }, [query]);

  // Close search dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      const header = mobileRef.current;
      if (header && !header.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  const handleSelect = (calc: CalculatorInfo) => {
    setQuery("");
    setOpen(false);
    navigate(`/${calc.categorySlug}/${calc.slug}`);
  };

  return (
    <header ref={mobileRef} className="sticky top-0 z-50 bg-card border-b border-border">
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

        {/* Category links (desktop) */}
        <nav className="hidden md:flex items-center gap-1 shrink-0">
          {categories.slice(0, 5).map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </nav>

        {/* Dark mode toggle */}
        <button
          onClick={toggleDark}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors shrink-0"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
        </button>

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
          <nav className="flex flex-col gap-1 pt-2">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary rounded-lg transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
