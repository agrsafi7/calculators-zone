import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { categories, getCategoryIcon, type CalculatorInfo } from "@/data/calculators";
import { searchCalculators } from "@/lib/calculator-utils";
import { Calculator, Menu, Search, User, X } from "lucide-react";

// Site header per the approved design: fixed top bar with logo, category
// pills, search, and account icon.
const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  // Google-style autocomplete suggestions
  const [suggestions, setSuggestions] = useState<CalculatorInfo[]>([]);
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const q = query.trim();
    setSuggestions(q ? searchCalculators(q) : []);
    setSuggestOpen(q.length > 0);
    setActiveIndex(-1);
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        (!desktopSearchRef.current || !desktopSearchRef.current.contains(t)) &&
        (!mobileSearchRef.current || !mobileSearchRef.current.contains(t))
      ) {
        setSuggestOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const pickSuggestion = (calc: CalculatorInfo) => {
    setQuery("");
    setSuggestOpen(false);
    setMobileOpen(false);
    navigate(`/${calc.categorySlug}/${calc.slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!suggestOpen || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      pickSuggestion(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setSuggestOpen(false);
    }
  };

  const suggestionList = (idPrefix: string) => (
    <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden max-h-80 overflow-y-auto">
      {suggestions.map((calc, i) => {
        const Icon = getCategoryIcon(calc.icon);
        return (
          <button
            key={`${idPrefix}-${calc.slug}`}
            type="button"
            onClick={() => pickSuggestion(calc)}
            onMouseEnter={() => setActiveIndex(i)}
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

  const submitSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const q = query.trim();
    if (!q) return;
    setSuggestOpen(false);
    const hits = searchCalculators(q);
    if (hits.length > 0) {
      navigate(`/${hits[0].categorySlug}/${hits[0].slug}`);
    } else {
      navigate(`/category/all`);
    }
    setQuery("");
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-surface-lowest/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-5 shrink-0">
          <Link to="/" className="flex items-center gap-1.5" aria-label="TheCalculator.us home">
            <Calculator size={24} className="text-primary" />
            <span className="font-display text-[18px] font-semibold tracking-tight text-ink">
              TheCalculator<span className="text-primary">.us</span>
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-1" aria-label="Categories">
            {categories.map((c) => (
              <NavLink
                key={c.slug}
                to={`/category/${c.slug}`}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded text-[13px] font-medium transition-colors ${
                    isActive
                      ? "bg-tealbright text-white"
                      : "text-ink-soft hover:bg-surface-container hover:text-ink"
                  }`
                }
              >
                {c.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 flex-1 max-w-md justify-end">
          <div ref={desktopSearchRef} className="relative hidden sm:flex w-full">
            <form
              onSubmit={submitSearch}
              className="flex w-full items-center rounded-lg bg-surface-low focus-within:bg-surface-lowest focus-within:ring-2 focus-within:ring-primary"
              role="search"
            >
              <div className="pl-3 flex items-center justify-center">
                <Search size={18} className="text-ink-soft" />
              </div>
              <input
                className="w-full bg-transparent px-2 py-1.5 text-[12px] text-ink placeholder:text-ink-soft focus:outline-none"
                placeholder="Search calculator (e.g., mortgage, bmi)..."
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => query.trim() && setSuggestOpen(true)}
                aria-label="Search calculators"
                autoComplete="off"
              />
              <button
                className="bg-primary text-white text-[13px] font-medium px-3 py-1.5 rounded-r-lg hover:bg-tealbright transition-colors shrink-0"
                type="submit"
              >
                Search
              </button>
            </form>
            {suggestOpen && suggestions.length > 0 && suggestionList("d")}
          </div>
          <Link
            to="/about"
            className="w-8 h-8 rounded-full bg-primary hidden sm:flex items-center justify-center shrink-0"
            aria-label="About"
          >
            <User size={18} className="text-white" />
          </Link>
          <button
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-surface-low"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? (
              <X size={24} className="text-ink" />
            ) : (
              <Menu size={24} className="text-ink" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-surface-lowest border-t border-surface-container px-4 py-3">
          <div ref={mobileSearchRef} className="relative">
            <form onSubmit={submitSearch} className="flex items-center rounded-lg bg-surface-low mb-3" role="search">
              <div className="pl-3 flex items-center justify-center">
                <Search size={18} className="text-ink-soft" />
              </div>
              <input
                className="w-full bg-transparent px-2 py-2 text-[13px] text-ink placeholder:text-ink-soft focus:outline-none"
                placeholder="Search calculator..."
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => query.trim() && setSuggestOpen(true)}
                aria-label="Search calculators"
                autoComplete="off"
              />
              <button className="bg-primary text-white text-[13px] font-medium px-3 py-2 rounded-r-lg shrink-0" type="submit">
                Search
              </button>
            </form>
            {suggestOpen && suggestions.length > 0 && suggestionList("m")}
          </div>
          <nav className="grid grid-cols-2 gap-1" aria-label="Categories">
            {categories.map((c) => (
              <NavLink
                key={c.slug}
                to={`/category/${c.slug}`}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-[13px] font-medium ${
                    isActive ? "bg-tealbright text-white" : "text-ink-soft hover:bg-surface-low"
                  }`
                }
              >
                {c.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
