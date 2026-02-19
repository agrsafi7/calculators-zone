import { Link } from "react-router-dom";
import { Calculator } from "lucide-react";

const footerLinks = {
  calculators: [
    { label: "Finance Tools", href: "/category/finance" },
    { label: "Health & Fitness", href: "/category/health" },
    { label: "Math Solvers", href: "/category/math" },
    { label: "Unit Converter", href: "/category/conversions" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Advertise", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Sitemap", href: "#" },
  ],
};

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Calculator className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-white">
                SmartCalcHub
              </span>
            </div>
            <p className="text-sm opacity-70">
              The world's leading destination for online calculation tools. We make complex math simple for everyone, every day.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Calculators</h4>
            <ul className="space-y-2">
              {footerLinks.calculators.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm opacity-60">
          © {new Date().getFullYear()} SmartCalc Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
