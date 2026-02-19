import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import MortgageCalculator from "./pages/MortgageCalculator";
import BmiCalculator from "./pages/BmiCalculator";
import PercentageCalculator from "./pages/PercentageCalculator";
import GenericCalculatorPage from "./pages/GenericCalculatorPage";
import CategoryPage from "./pages/CategoryPage";
import { PrivacyPolicy, TermsOfService, Disclaimer, ContactPage } from "./pages/LegalPages";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              {/* Specific hand-crafted calculator pages */}
              <Route path="/finance/mortgage-calculator" element={<MortgageCalculator />} />
              <Route path="/health/bmi-calculator" element={<BmiCalculator />} />
              <Route path="/math/percentage-calculator" element={<PercentageCalculator />} />
              {/* Category listing pages */}
              <Route path="/category/:slug" element={<CategoryPage />} />
              {/* Generic dynamic calculator pages for all categories */}
              <Route path="/:categorySlug/:slug" element={<GenericCalculatorPage />} />
              {/* Legal pages */}
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
      <SpeedInsights />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
