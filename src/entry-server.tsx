// Build-time server entry: renders the full app to an HTML string for each
// route so crawlers and first-time visitors get real content without waiting
// for JavaScript. Uses direct (non-lazy) page imports because renderToString
// cannot resolve React.lazy components.
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { Routes, Route, useParams } from "react-router-dom";
import { AppShell } from "./App";
import CalculatorTemplate from "./components/CalculatorTemplate";
import ScienceCalculator from "./components/science/ScienceCalculator";
import { scienceTemplateBySlug } from "./data/science";
import { DELETED_REDIRECTS } from "./data/deleted-slugs";
// Server-side synchronous calculator registry. All configs are imported
// directly here (build-time only — the client still lazy-loads per category)
// so template calculator pages render real content instead of a skeleton.
import { financeCalculators } from "./data/finance-calculators";
import { financeCalculatorsExtended } from "./data/finance-calculators-extended";
import { healthCalculators } from "./data/health-calculators";
import { healthCalculatorsExtended } from "./data/health-calculators-extended";
import { mathCalculators } from "./data/math-calculators";
import { mathCalculatorsExtended } from "./data/math-calculators-extended";
import { conversionCalculators } from "./data/conversion-calculators";
import { conversionCalculatorsExtended } from "./data/conversion-calculators-extended";
import { datetimeCalculators } from "./data/datetime-calculators";
import { datetimeCalculatorsExtended } from "./data/datetime-calculators-extended";
import { datetimeCalculatorsExtra } from "./data/datetime-calculators-extra";
import { scienceCalculators } from "./data/science-calculators";
import { scienceCalculatorsExtended } from "./data/science-calculators-extended";
import { scienceCalculatorsExtra } from "./data/science-calculators-extra";
import { lifestyleCalculators } from "./data/lifestyle-calculators";
import { lifestyleCalculatorsExtended } from "./data/lifestyle-calculators-extended";
import { lifestyleCalculatorsExtra } from "./data/lifestyle-calculators-extra";
import { otherCalculators } from "./data/other-calculators";
import { otherCalculatorsExtended } from "./data/other-calculators-extended";
import { otherCalculatorsExtra } from "./data/other-calculators-extra";
import { otherCalculatorsBatch2 } from "./data/other-calculators-batch2";
import { otherCalculatorsBatch3 } from "./data/other-calculators-batch3";
import {
  expansionFinanceCalculators,
  expansionHealthCalculators,
  expansionMathCalculators,
} from "./data/expansion-calculators";
import NotFound from "./pages/NotFound";

const allCalculatorConfigs = [
  ...financeCalculators,
  ...financeCalculatorsExtended,
  ...expansionFinanceCalculators,
  ...healthCalculators,
  ...healthCalculatorsExtended,
  ...expansionHealthCalculators,
  ...mathCalculators,
  ...mathCalculatorsExtended,
  ...expansionMathCalculators,
  ...conversionCalculators,
  ...conversionCalculatorsExtended,
  ...datetimeCalculators,
  ...datetimeCalculatorsExtended,
  ...datetimeCalculatorsExtra,
  ...scienceCalculators,
  ...scienceCalculatorsExtended,
  ...scienceCalculatorsExtra,
  ...lifestyleCalculators,
  ...lifestyleCalculatorsExtended,
  ...lifestyleCalculatorsExtra,
  ...otherCalculators,
  ...otherCalculatorsExtended,
  ...otherCalculatorsExtra,
  ...otherCalculatorsBatch2,
  ...otherCalculatorsBatch3,
];
const configByPath = new Map(
  allCalculatorConfigs.map((c) => [`${c.categorySlug}/${c.slug}`, c])
);

// Server twin of GenericCalculatorPage: resolves the config synchronously so
// the prerendered HTML contains the real calculator (the client version loads
// the same config asynchronously on navigation and hydrates this markup).
const ServerGenericCalculatorPage = () => {
  const { categorySlug, slug } = useParams<{ categorySlug: string; slug: string }>();
  if (!categorySlug || !slug || DELETED_REDIRECTS[slug]) return null;
  if (categorySlug === "science" && slug && scienceTemplateBySlug[slug]) {
    return <ScienceCalculator config={scienceTemplateBySlug[slug]} />;
  }
  const config = configByPath.get(`${categorySlug}/${slug}`);
  if (!config) return <NotFound />;
  return <CalculatorTemplate key={slug} config={config} />;
};
import Index from "./pages/Index";
import MortgageCalculator from "./pages/MortgageCalculator";
import BmiCalculator from "./pages/BmiCalculator";
import PercentageCalculator from "./pages/PercentageCalculator";
import CategoryPage from "./pages/CategoryPage";
import AllCategoriesPage from "./pages/AllCategoriesPage";
import PopularToolsPage from "./pages/PopularToolsPage";
import SitemapPage from "./pages/SitemapPage";
import AboutPage from "./pages/AboutPage";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";
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
    <Route path="/:categorySlug/:slug" element={<ServerGenericCalculatorPage />} />
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
