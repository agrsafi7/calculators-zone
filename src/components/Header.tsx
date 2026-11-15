import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { categories, type CalculatorInfo } from "@/data/calculators";
import { searchCalculators } from "@/lib/calculator-utils";
import { Calculator, ChevronDown, Menu, Search, X } from "lucide-react";
import { useSearchAutocomplete, SearchSuggestions } from "./SearchAutocomplete";

// Site header: fixed top bar — EVERYTHING LEFT-ALIGNED in one row:
// logo, then menu, then search, starting from the left (layout per Abu,
// 2026-11-15 — nothing is pinned to the right edge). No account/about
// icon in the header.
//
// Header layout (fixed 2026-11-15): the 1200px container cannot fit all
// 8 category links + logo + a usable search box at any desktop width —
// the row overflowed, crushing the search and clipping the Search button
// off the right edge. So only the first 4 categories show inline and the
// rest live in a "More" dropdown. The search box EXPANDS on click: it
// rests compact and grows wide while typing (the menu hides while it is
// open), then collapses back on Escape / outside click / submit.
const VISIBLE_CATEGORIES = categories.slice(0, 4);
const MORE_CATEGORIES = categories.slice(4);

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const desktopInputRef = useRef<HTMLInputElement>(null);

  const onPick = (calc: CalculatorInfo) => {
    setMobileOpen(false);
    setSearchOpen(false);
    navigate(`/${calc.categorySlug}/${calc.slug}`);
  };
  const desktopSearch = useSearchAutocomplete(onPick);
  const mobileSearch = useSearchAutocomplete(onPick);

  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  // Close the "More" dropdown on outside click.
  useEffect(() => {
    if (!moreOpen) return;
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [moreOpen]);

  // Collapse the expanded search when the user clicks elsewhere and the
  // box is empty (a typed query keeps it open so results stay visible).
  useEffect(() => {
    if (!searchOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        desktopSearch.ref.current &&
        !desktopSearch.ref.current.contains(e.target as Node) &&
        !desktopSearch.query.trim()
      ) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [searchOpen, desktopSearch.ref, desktopSearch.query]);

  // Focus the input as soon as the search expands.
  useEffect(() => {
    if (searchOpen) desktopInputRef.current?.focus();
  }, [searchOpen]);

  const submitSearch =
    (s: ReturnType<typeof useSearchAutocomplete>) => (e?: React.FormEvent) => {
      e?.preventDefault();
      const q = s.query.trim();
      if (!q) return;
      s.setOpen(false);
      setSearchOpen(false);
      const hits = searchCalculators(q);
      if (hits.length > 0) {
        navigate(`/${hits[0].categorySlug}/${hits[0].slug}`);
      } else {
        // SEO audit F9: never navigate to a category slug that does not
        // exist ("/category/all" rendered "Category not found"). The
        // categories page is a real page and handles any query.
        navigate(`/categories`);
      }
      s.setQuery("");
    };

  const handleDesktopKeyDown = (e: React.KeyboardEvent) => {
    desktopSearch.handleKeyDown(e);
    if (e.key === "Escape") {
      desktopSearch.setQuery("");
      setSearchOpen(false);
      desktopInputRef.current?.blur();
    }
  };

  const moreActive = MORE_CATEGORIES.some((c) =>
    location.pathname.startsWith(`/category/${c.slug}`),
  );

  return (
    <header className="fixed top-0 w-full z-50 bg-surface-lowest/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* Left-aligned row: logo -> menu -> search -> hamburger. Nothing
          is pushed to the right edge. */}
      <div className="h-16 max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10 flex items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-1.5 shrink-0"
          aria-label="TheCalculator.us home"
        >
          <Calculator size={24} className="text-primary" />
          <span className="font-display text-[18px] font-semibold tracking-tight text-ink whitespace-nowrap">
            TheCalculator<span className="text-primary">.us</span>
          </span>
        </Link>

        <nav
          className={`${searchOpen ? "hidden" : "hidden lg:flex"} items-center gap-1 shrink-0`}
          aria-label="Categories"
        >
          {VISIBLE_CATEGORIES.map((c) => (
            <NavLink
              key={c.slug}
              to={`/category/${c.slug}`}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded text-[13px] font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? "bg-tealbright text-white"
                    : "text-ink-soft hover:bg-surface-container hover:text-ink"
                }`
              }
            >
              {c.name}
            </NavLink>
          ))}
          <div ref={moreRef} className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={moreOpen}
              className={`px-3 py-1.5 rounded text-[13px] font-medium transition-colors flex items-center gap-1 whitespace-nowrap ${
                moreActive
                  ? "bg-tealbright text-white"
                  : "text-ink-soft hover:bg-surface-container hover:text-ink"
              }`}
            >
              More
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`}
              />
            </button>
            {moreOpen && (
              <div className="absolute left-0 top-full mt-2 w-56 rounded-xl bg-surface-lowest shadow-lg border border-surface-container py-1 z-50">
                {MORE_CATEGORIES.map((c) => (
                  <NavLink
                    key={c.slug}
                    to={`/category/${c.slug}`}
                    onClick={() => setMoreOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-[13px] font-medium transition-colors ${
                        isActive
                          ? "bg-tealbright text-white"
                          : "text-ink-soft hover:bg-surface-container hover:text-ink"
                      }`
                    }
                  >
                    {c.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div
          ref={desktopSearch.ref}
          className={`relative hidden sm:flex transition-all duration-300 shrink-0 ${
            searchOpen ? "w-[min(430px,calc(100vw-150px))]" : "w-44 lg:w-52"
          }`}
        >
          <form
            onSubmit={submitSearch(desktopSearch)}
            className="flex w-full items-center rounded-lg bg-surface-low focus-within:bg-surface-lowest focus-within:ring-2 focus-within:ring-primary"
            role="search"
          >
            <div className="pl-3 flex items-center justify-center shrink-0">
              <Search size={18} className="text-ink-soft" />
            </div>
            <input
              ref={desktopInputRef}
              className="w-full min-w-0 bg-transparent px-2 py-1.5 text-[12px] text-ink placeholder:text-ink-soft focus:outline-none"
              placeholder={searchOpen ? "Search calculator (e.g., mortgage, bmi)..." : "Search..."}
              type="search"
              value={desktopSearch.query}
              onChange={(e) => desktopSearch.setQuery(e.target.value)}
              onKeyDown={handleDesktopKeyDown}
              onFocus={() => {
                setSearchOpen(true);
                desktopSearch.query.trim() && desktopSearch.setOpen(true);
              }}
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
          {desktopSearch.open && desktopSearch.suggestions.length > 0 && (
            <SearchSuggestions
              suggestions={desktopSearch.suggestions}
              activeIndex={desktopSearch.activeIndex}
              onSelect={desktopSearch.pick}
              onHover={desktopSearch.setActiveIndex}
              idPrefix="d"
            />
          )}
        </div>

        <button
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-surface-low shrink-0"
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

      {mobileOpen && (
        <div className="lg:hidden bg-surface-lowest border-t border-surface-container px-4 py-3">
          <div ref={mobileSearch.ref} className="relative">
            <form onSubmit={submitSearch(mobileSearch)} className="flex items-center rounded-lg bg-surface-low mb-3" role="search">
              <div className="pl-3 flex items-center justify-center">
                <Search size={18} className="text-ink-soft" />
              </div>
              <input
                className="w-full bg-transparent px-2 py-2 text-[13px] text-ink placeholder:text-ink-soft focus:outline-none"
                placeholder="Search calculator..."
                type="search"
                value={mobileSearch.query}
                onChange={(e) => mobileSearch.setQuery(e.target.value)}
                onKeyDown={mobileSearch.handleKeyDown}
                onFocus={() => mobileSearch.query.trim() && mobileSearch.setOpen(true)}
                aria-label="Search calculators"
                autoComplete="off"
              />
              <button className="bg-primary text-white text-[13px] font-medium px-3 py-2 rounded-r-lg shrink-0" type="submit">
                Search
              </button>
            </form>
            {mobileSearch.open && mobileSearch.suggestions.length > 0 && (
              <SearchSuggestions
                suggestions={mobileSearch.suggestions}
                activeIndex={mobileSearch.activeIndex}
                onSelect={mobileSearch.pick}
                onHover={mobileSearch.setActiveIndex}
                idPrefix="m"
              />
            )}
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
