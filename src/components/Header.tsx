import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Calculator } from "lucide-react";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";

const navLinks = [
  { label: "Finance", href: "/category/finance" },
  { label: "Health", href: "/category/health" },
  { label: "Math", href: "/category/math" },
  { label: "Science", href: "/category/science" },
  { label: "Lifestyle", href: "/category/lifestyle" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Calculator className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">
            SmartCalc<span className="text-primary">Hub</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            More <ChevronDown className="w-3 h-3" />
          </button>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <div className="w-48">
            <SearchBar />
          </div>
          <button className="px-4 py-1.5 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
            Log In
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
          <div className="mt-3">
            <SearchBar />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
