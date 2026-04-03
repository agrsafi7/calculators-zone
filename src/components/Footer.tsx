import { Link } from "react-router-dom";
import { uniqueCalculators } from "@/lib/calculator-utils";

const totalCalcs = uniqueCalculators.length;

const mainLinks = [
  { label: "Home", href: "/" },
  { label: "All Calculators", href: "/categories" },
  { label: "Popular Tools", href: "/popular" },
  { label: "About Us", href: "/disclaimer" },
  { label: "Contact", href: "/contact" },
];

const categoryLinks = [
  { label: "Finance", href: "/category/finance" },
  { label: "Health & Fitness", href: "/category/health" },
  { label: "Math & Education", href: "/category/math" },
  { label: "Unit Conversions", href: "/category/conversions" },
  { label: "Science", href: "/category/science" },
  { label: "Date & Time", href: "/category/datetime" },
  { label: "Lifestyle", href: "/category/lifestyle" },
  { label: "Other Calculators", href: "/category/other" },
];

const popularCalcLinks = [
  { label: "Mortgage Calculator", href: "/finance/mortgage-calculator" },
  { label: "BMI Calculator", href: "/health/bmi-calculator" },
  { label: "Percentage Calculator", href: "/math/percentage-calculator" },
  { label: "Age Calculator", href: "/datetime/age-calculator" },
  { label: "Calorie Calculator", href: "/health/calorie-calculator" },
  { label: "Tip Calculator", href: "/lifestyle/tip-calculator" },
  { label: "Salary Calculator", href: "/finance/salary-calculator" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Cookie Policy", href: "/privacy-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
];

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-primary-foreground rounded-md flex items-center justify-center">
                <div className="w-3.5 h-3.5 grid grid-cols-2 gap-0.5">
                  <div className="bg-foreground rounded-[1px]" />
                  <div className="bg-foreground rounded-[1px]" />
                  <div className="bg-foreground rounded-[1px]" />
                  <div className="bg-foreground rounded-[1px]" />
                </div>
              </div>
              <span className="text-lg font-bold text-primary-foreground">TheCalculator.us</span>
            </div>
            <p className="text-sm opacity-70 mb-4 leading-relaxed">
              TheCalculator.us is your one-stop destination for over {totalCalcs.toLocaleString()} free online calculators. 
              Trusted by millions of users in the US, UK, Canada, and Australia for finance, health, math, science, and daily life calculations.
            </p>
            <p className="text-xs opacity-50 mb-5">
              Free calculators • No sign-up required • Works on all devices
            </p>
            <div className="flex items-center gap-3">
              <Link
                to="/contact"
                className="w-8 h-8 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/10 transition-colors"
                aria-label="Contact"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary-foreground mb-4">Categories</h4>
            <ul className="space-y-2">
              {categoryLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Calculators */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary-foreground mb-4">Popular Tools</h4>
            <ul className="space-y-2">
              {popularCalcLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Main */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {mainLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary-foreground mt-6 mb-4">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center text-sm opacity-60">
          © {new Date().getFullYear()} TheCalculator.us Interactive. All rights reserved. Accuracy not guaranteed for medical or legal decisions.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
