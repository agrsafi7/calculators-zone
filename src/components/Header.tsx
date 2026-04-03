import { Link } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { categories } from "@/data/calculators";
import { useDarkMode } from "@/hooks/use-dark-mode";
import SearchBar from "@/components/SearchBar";

const Header = () => {
  const { isDark, toggle: toggleDark } = useDarkMode();
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      const header = mobileRef.current;
      if (header && !header.contains(e.target as Node)) setMobileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

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
          <span className="text-lg font-bold text-foreground">TheCalculator.us</span>
        </Link>

        {/* Center search - shared behavior with Hero */}
        <div className="hidden md:block flex-1 max-w-md">
          <SearchBar placeholder="Search tools..." />
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

        {/* Dark mode toggle - desktop only (mobile has it in menu) */}
        <button
          onClick={toggleDark}
          className="hidden md:flex w-9 h-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors shrink-0"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
        </button>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu - overlay style */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-14 z-50 bg-card overflow-y-auto border-t border-border shadow-xl">
          <div className="px-4 py-4 space-y-3">
            <SearchBar placeholder="Search tools..." onAfterSelect={() => setMobileOpen(false)} />

            <nav className="flex flex-col gap-0.5 pt-2">
              {categories.map((cat) => {
                const isActive = window.location.pathname.includes(`/category/${cat.slug}`);
                return (
                  <Link
                    key={cat.slug}
                    to={`/category/${cat.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-secondary active:bg-secondary"
                    }`}
                  >
                    {cat.name}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center justify-between pt-3 border-t border-border mt-2">
              <span className="text-sm font-medium text-muted-foreground">Dark Mode</span>
              <button
                onClick={toggleDark}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
