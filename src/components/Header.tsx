import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import { useDarkMode } from "@/hooks/use-dark-mode";

const navLinks = [
  { label: "Finance", href: "/category/finance" },
  { label: "Health", href: "/category/health" },
  { label: "Math", href: "/category/math" },
  { label: "Conversions", href: "/category/conversions" },
  { label: "Science", href: "/category/science" },
  { label: "Date & Time", href: "/category/datetime" },
  { label: "Lifestyle", href: "/category/lifestyle" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggle } = useDarkMode();

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src="/favicon.png" alt="Calculators" className="w-8 h-8 rounded-lg" />
          <span className="text-lg font-bold text-foreground">
            Calculators
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <div className="w-48">
            <SearchBar />
          </div>
          <button
            onClick={toggle}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
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
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="block text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 mt-3">
            <div className="flex-1">
              <SearchBar />
            </div>
            <button
              onClick={toggle}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
