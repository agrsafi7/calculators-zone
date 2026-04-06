import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun, Search, ChevronDown, Calculator } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { categories } from "@/data/calculators";
import { useDarkMode } from "@/hooks/use-dark-mode";
import SearchBar from "@/components/SearchBar";
import CalculatorMegaMenu from "@/components/CalculatorMegaMenu";

const SITE_URL = "https://thecalculator.us";

const Header = () => {
  const { isDark, toggle: toggleDark } = useDarkMode();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [calcMenuOpen, setCalcMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const calcMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setCalcMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close search on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    if (searchOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [searchOpen]);

  // Close calc menu on click outside (desktop)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (calcMenuRef.current && !calcMenuRef.current.contains(e.target as Node)) {
        setCalcMenuOpen(false);
      }
    };
    if (calcMenuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [calcMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <a href={SITE_URL} className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 bg-foreground rounded-md flex items-center justify-center">
            <div className="w-3.5 h-3.5 grid grid-cols-2 gap-0.5">
              <div className="bg-primary-foreground rounded-[1px]" />
              <div className="bg-primary-foreground rounded-[1px]" />
              <div className="bg-primary-foreground rounded-[1px]" />
              <div className="bg-primary-foreground rounded-[1px]" />
            </div>
          </div>
          <span className="text-lg font-bold text-foreground">TheCalculator.us</span>
        </a>

        {/* Desktop: expandable search */}
        <div className="hidden md:flex items-center flex-1 max-w-md justify-end" ref={searchRef}>
          {searchOpen ? (
            <div className="w-full animate-in fade-in slide-in-from-right-4 duration-200">
              <SearchBar placeholder="Search tools..." />
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Open search"
            >
              <Search className="w-4.5 h-4.5" />
            </button>
          )}
        </div>

        {/* Desktop: Calculators dropdown */}
        <div className="hidden md:block relative shrink-0" ref={calcMenuRef}>
          <button
            onClick={() => setCalcMenuOpen((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              calcMenuOpen
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            <Calculator className="w-4 h-4" />
            Calculators
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${calcMenuOpen ? "rotate-180" : ""}`} />
          </button>

          {calcMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-[480px] max-h-[70vh] overflow-y-auto bg-card border border-border rounded-xl shadow-xl animate-in fade-in slide-in-from-top-2 duration-200 z-50">
              <CalculatorMegaMenu onClose={() => setCalcMenuOpen(false)} />
            </div>
          )}
        </div>


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

      {/* Mobile menu with backdrop */}
      {mobileOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 top-14 z-40 bg-black/40"
            onClick={() => setMobileOpen(false)}
            onTouchStart={() => setMobileOpen(false)}
          />
          <div
            ref={menuRef}
            className="md:hidden fixed top-14 left-0 right-0 z-50 bg-card overflow-y-auto border-t border-border shadow-xl max-h-[calc(100vh-3.5rem)]"
          >
            <div className="px-4 py-4 space-y-3">
              <SearchBar placeholder="Search tools..." onAfterSelect={() => setMobileOpen(false)} />

              {/* Calculators mega menu in mobile */}
              <div className="pt-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-1">Calculators</p>
                <CalculatorMegaMenu onClose={() => setMobileOpen(false)} />
              </div>


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
        </>
      )}
    </header>
  );
};

export default Header;
