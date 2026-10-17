// Build-time server entry: renders the full app to an HTML string for each
// route so crawlers and first-time visitors get real content without waiting
// for JavaScript. Uses direct (non-lazy) page imports because renderToString
// cannot resolve React.lazy components.
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { Routes, Route } from "react-router-dom";
import { AppShell } from "./App";
import Index from "./pages/Index";
import MortgageCalculator from "./pages/MortgageCalculator";
import BmiCalculator from "./pages/BmiCalculator";
import PercentageCalculator from "./pages/PercentageCalculator";
import GenericCalculatorPage from "./pages/GenericCalculatorPage";
import CategoryPage from "./pages/CategoryPage";
import AllCategoriesPage from "./pages/AllCategoriesPage";
import PopularToolsPage from "./pages/PopularToolsPage";
import SitemapPage from "./pages/SitemapPage";
import AboutPage from "./pages/AboutPage";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import {
  PrivacyPolicy,
  TermsOfService,
  Disclaimer,
  ContactPage,
} from "./pages/LegalPages";

const ServerRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/finance/mortgage-calculator" element={<MortgageCalculator />} />
    <Route path="/health/bmi-calculator" element={<BmiCalculator />} />
    <Route path="/math/percentage-calculator" element={<PercentageCalculator />} />
    <Route path="/categories" element={<AllCategoriesPage />} />
    <Route path="/popular" element={<PopularToolsPage />} />
    <Route path="/sitemap" element={<SitemapPage />} />
    <Route path="/category/:slug" element={<CategoryPage />} />
    <Route path="/:categorySlug/:slug" element={<GenericCalculatorPage />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/terms-of-service" element={<TermsOfService />} />
    <Route path="/disclaimer" element={<Disclaimer />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/blog" element={<BlogIndex />} />
    <Route path="/blog/:slug" element={<BlogPost />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export function render(url: string): string {
  const helmetContext: Record<string, unknown> = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <AppShell>
          <ServerRoutes />
        </AppShell>
      </StaticRouter>
    </HelmetProvider>
  );
  return html;
}
