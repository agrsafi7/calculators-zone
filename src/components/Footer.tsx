import { Link } from "react-router-dom";
import { Calculator } from "lucide-react";
import { categories, getCategoryIcon } from "@/data/calculators";
import { financeCalculators } from "@/data/finance-calculators";
import { healthCalculators } from "@/data/health-calculators";
import { mathCalculators } from "@/data/math-calculators";
import { conversionCalculators } from "@/data/conversion-calculators";
import { datetimeCalculators } from "@/data/datetime-calculators";
import { scienceCalculators } from "@/data/science-calculators";
import { lifestyleCalculators } from "@/data/lifestyle-calculators";

const popularTools = [
  { name: "Mortgage Calculator", href: "/finance/mortgage-calculator" },
  { name: "BMI Calculator", href: "/health/bmi-calculator" },
  { name: "Percentage Calculator", href: "/math/percentage-calculator" },
  { name: "Age Calculator", href: "/datetime/age-calculator" },
  { name: "Length Converter", href: "/conversions/length-converter" },
  { name: "Calorie Calculator", href: "/health/calorie-calculator" },
  { name: "GPA Calculator", href: "/math/gpa-calculator" },
  { name: "Force Calculator", href: "/science/force-calculator" },
  { name: "Sleep Calculator", href: "/lifestyle/sleep-calculator" },
  { name: "Currency Converter", href: "/conversions/currency-converter" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Contact", href: "/contact" },
];

const totalCalcs =
  financeCalculators.length +
  healthCalculators.length +
  mathCalculators.length +
  conversionCalculators.length +
  datetimeCalculators.length +
  scienceCalculators.length +
  lifestyleCalculators.length;

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Calculator className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-primary-foreground">
                SmartCalcHub
              </span>
            </div>
            <p className="text-sm opacity-70 mb-4">
              {totalCalcs}+ free online calculators for finance, health, math, science, and daily life. Fast, accurate, and trusted.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary-foreground mb-4">Categories</h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link to={`/category/${cat.slug}`} className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tools */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary-foreground mb-4">Popular Tools</h4>
            <ul className="space-y-2">
              {popularTools.slice(0, 7).map((tool) => (
                <li key={tool.href}>
                  <Link to={tool.href} className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Tools */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary-foreground mb-4">More Tools</h4>
            <ul className="space-y-2">
              {popularTools.slice(7).map((tool) => (
                <li key={tool.href}>
                  <Link to={tool.href} className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center text-sm opacity-60">
          © {new Date().getFullYear()} SmartCalc Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
