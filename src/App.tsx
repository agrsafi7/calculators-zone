import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import PageLoadingSkeleton from "@/components/PageLoadingSkeleton";
import Index from "./pages/Index";

const MortgageCalculator = lazy(() => import("./pages/MortgageCalculator"));
const BmiCalculator = lazy(() => import("./pages/BmiCalculator"));
const PercentageCalculator = lazy(() => import("./pages/PercentageCalculator"));
const GenericCalculatorPage = lazy(() => import("./pages/GenericCalculatorPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const AllCategoriesPage = lazy(() => import("./pages/AllCategoriesPage"));
const PopularToolsPage = lazy(() => import("./pages/PopularToolsPage"));
const SitemapPage = lazy(() => import("./pages/SitemapPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const { PrivacyPolicy, TermsOfService, Disclaimer, ContactPage } = await import("./pages/LegalPages");

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
          <main className="flex-1">
            <Suspense fallback={<PageLoadingSkeleton />}>
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
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
