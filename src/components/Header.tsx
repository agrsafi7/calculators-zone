import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { categories } from "@/data/calculators";
import { searchCalculators } from "@/lib/calculator-utils";

// Site header per the approved design: fixed top bar with logo, category
// pills, search, and account icon.
const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const submitSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const q = query.trim();
    if (!q) return;
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
            <span className="material-symbols-outlined text-primary text-[24px]">calculate</span>
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
          <form
            onSubmit={submitSearch}
            className="hidden sm:flex w-full items-center rounded-lg bg-surface-low focus-within:bg-surface-lowest focus-within:ring-2 focus-within:ring-primary"
            role="search"
          >
            <div className="pl-3 flex items-center justify-center">
              <span className="material-symbols-outlined text-ink-soft text-[18px]">search</span>
            </div>
            <input
              className="w-full bg-transparent px-2 py-1.5 text-[12px] text-ink placeholder:text-ink-soft focus:outline-none"
              placeholder="Search calculator (e.g., mortgage, bmi)..."
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search calculators"
            />
            <button
              className="bg-primary text-white text-[13px] font-medium px-3 py-1.5 rounded-r-lg hover:bg-tealbright transition-colors shrink-0"
              type="submit"
            >
              Search
            </button>
          </form>
          <Link
            to="/about"
            className="w-8 h-8 rounded-full bg-primary hidden sm:flex items-center justify-center shrink-0"
            aria-label="About"
          >
            <span className="material-symbols-outlined text-white text-[18px]">person</span>
          </Link>
          <button
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-surface-low"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            <span className="material-symbols-outlined text-ink text-[24px]">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-surface-lowest border-t border-surface-container px-4 py-3">
          <form onSubmit={submitSearch} className="flex items-center rounded-lg bg-surface-low mb-3" role="search">
            <div className="pl-3 flex items-center justify-center">
              <span className="material-symbols-outlined text-ink-soft text-[18px]">search</span>
            </div>
            <input
              className="w-full bg-transparent px-2 py-2 text-[13px] text-ink placeholder:text-ink-soft focus:outline-none"
              placeholder="Search calculator..."
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search calculators"
            />
            <button className="bg-primary text-white text-[13px] font-medium px-3 py-2 rounded-r-lg shrink-0" type="submit">
              Search
            </button>
          </form>
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
