import { lazy, Suspense } from "react";
import type { ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import ScrollToTop from "@/components/ScrollToTop";
import PageLoadingSkeleton from "@/components/PageLoadingSkeleton";
import PageTransition from "@/components/PageTransition";
import Index from "./pages/Index";
// Legal pages load on demand — ContactPage pulls in the supabase client,
// which has no business in the homepage bundle.
const PrivacyPolicy = lazy(() => import("./pages/LegalPages").then((m) => ({ default: m.PrivacyPolicy })));
const TermsOfService = lazy(() => import("./pages/LegalPages").then((m) => ({ default: m.TermsOfService })));
const Disclaimer = lazy(() => import("./pages/LegalPages").then((m) => ({ default: m.Disclaimer })));
const ContactPage = lazy(() => import("./pages/LegalPages").then((m) => ({ default: m.ContactPage })));

const MortgageCalculator = lazy(() => import("./pages/MortgageCalculator"));
const BmiCalculator = lazy(() => import("./pages/BmiCalculator"));
const PercentageCalculator = lazy(() => import("./pages/PercentageCalculator"));
const GenericCalculatorPage = lazy(() => import("./pages/GenericCalculatorPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const AllCategoriesPage = lazy(() => import("./pages/AllCategoriesPage"));
const PopularToolsPage = lazy(() => import("./pages/PopularToolsPage"));
const SitemapPage = lazy(() => import("./pages/SitemapPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const BlogIndex = lazy(() => import("./pages/BlogIndex"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));

// No global providers: the app shell used to mount QueryClientProvider,
// Sonner, the Radix Toaster and TooltipProvider here, but all four were
// dead weight on the entry path (PageSpeed item 53, 22 Nov 2026):
// - QueryClientProvider: zero useQuery calls anywhere in src/
// - Sonner: toast() from "sonner" is called nowhere (the Radix use-toast
//   toast() is a different system, used by ScienceCalculator + ContactPage)
// - Radix <Toaster />: now mounted by the two lazy pages that call
//   toast() (ScienceCalculator, LegalPages ContactPage), so the toast
//   primitives leave the entry bundle
// - TooltipProvider: no live component renders a Radix <Tooltip> (the
//   only usage is dead sidebar.tsx; ScienceChart's Tooltip is recharts')

// Shared shell: everything rendered inside the router. The client wraps it in
// BrowserRouter; the build-time prerenderer wraps it in StaticRouter with the
// same route tree, so the static HTML matches what the client hydrates.
export const AppShell = ({ children }: { children: ReactNode }) => (
  <>
    <ScrollToTop />
    <div className="flex flex-col min-h-screen app-container">
      <Header />
      <main className="flex-1 pt-16">
        <Suspense fallback={<PageLoadingSkeleton />}>
          <PageTransition>{children}</PageTransition>
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
    </div>
    <SpeedInsights />
  </>
);

const ClientRoutes = () => (
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

const App = () => (
  <BrowserRouter>
    <AppShell>
      <ClientRoutes />
    </AppShell>
  </BrowserRouter>
);

export default App;
