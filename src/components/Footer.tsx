import { Link } from "react-router-dom";

// Site footer per the approved design: minimal single row.
const Footer = () => {
  return (
    <footer className="w-full bg-surface-lowest shadow-[0_-1px_6px_rgba(0,0,0,0.03)] py-5">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-ink-soft">
        <div className="flex items-center gap-1.5">
          <span className="font-numeric">© 2026</span>
          <span>TheCalculator.us. Fast, instant computational utilities.</span>
        </div>
        <nav className="flex flex-wrap items-center gap-6" aria-label="Footer">
          <Link className="hover:text-primary transition-colors" to="/about">About</Link>
          <Link className="hover:text-primary transition-colors" to="/sitemap">Sitemap</Link>
          <Link className="hover:text-primary transition-colors" to="/privacy-policy">Privacy Policy</Link>
          <Link className="hover:text-primary transition-colors" to="/terms-of-service">Terms</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
