import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import CookieConsent from "@/components/CookieConsent";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen app-container">
          <Header />
          <main className="flex-1 pt-16">
            <Suspense fallback={<PageLoadingSkeleton />}>
              <PageTransition>
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
              </PageTransition>
            </Suspense>
          </main>
          <Footer />
          <BackToTop />
          <CookieConsent />
        </div>
      </BrowserRouter>
      <SpeedInsights />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
