import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { categories, getCategoryIcon } from "@/data/calculators";
import { uniqueCalculators, getCategoryCalculatorCount } from "@/lib/calculator-utils";
import AdPlaceholder from "@/components/AdPlaceholder";
import SearchBar from "@/components/SearchBar";
import SEO from "@/components/SEO";

const totalCalcs = uniqueCalculators.length;

const Index = () => {
  return (
    <div>
      <SEO
        title="Free Online Calculators"
        description={`Free online calculators: ${totalCalcs} fast, accurate tools for finance, health, math, unit conversions, science, and everyday life. No sign-up required.`}
        canonical="/"
        keywords="online calculator, free calculator, mortgage calculator, BMI calculator, percentage calculator, age calculator, unit converter, loan calculator, calorie calculator, tip calculator"
      />

      {/* Simple hero */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-10 md:py-12 max-w-2xl text-center">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            Free Online Calculators
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
            {totalCalcs} free calculators for finance, health, math, science, unit conversions,
            and everyday life. Fast, accurate, and free forever — no sign-up needed.
          </p>
          <div className="max-w-xl mx-auto">
            <SearchBar large placeholder="Search calculators… (e.g. mortgage, BMI, tip)" />
          </div>
        </div>
      </section>

      {/* Categories — simple directory list */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h2 className="text-lg font-bold mb-4">Browse by Category</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {categories.map((cat) => {
            const Icon = getCategoryIcon(cat.icon);
            const count = getCategoryCalculatorCount(cat.slug);
            if (count === 0) return null;
            return (
              <li key={cat.slug}>
                <Link
                  to={`/category/${cat.slug}`}
                  className="flex items-center gap-4 bg-card border border-border rounded-xl px-5 py-4 hover:border-primary/40 transition-colors group"
                >
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-base group-hover:text-primary transition-colors">
                      {cat.name} Calculators
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {count} free calculators
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-8">
          <AdPlaceholder size="leaderboard" />
        </div>
      </main>

      {/* About */}
      <section className="border-t border-border bg-card mt-4">
        <div className="container mx-auto px-4 py-10 max-w-3xl">
          <h2 className="text-xl font-bold mb-4">About TheCalculator.us</h2>
          <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
            <p>
              TheCalculator.us is a free collection of {totalCalcs} online calculators built to
              answer everyday questions with numbers you can trust — from monthly mortgage
              payments and calorie needs to percentages, conversions, and date math.
            </p>
            <p>
              Every calculator runs entirely in your browser: results appear instantly, nothing
              is uploaded, and no account is needed. Popular tools include the{" "}
              <Link to="/finance/mortgage-calculator" className="text-primary hover:underline font-medium">
                Mortgage Calculator
              </Link>
              , the{" "}
              <Link to="/health/bmi-calculator" className="text-primary hover:underline font-medium">
                BMI Calculator
              </Link>
              , and the{" "}
              <Link to="/math/percentage-calculator" className="text-primary hover:underline font-medium">
                Percentage Calculator
              </Link>
              .
            </p>
            <p>
              <Link to="/about" className="text-primary hover:underline font-medium">
                Learn more about us
              </Link>{" "}
              or{" "}
              <Link to="/contact" className="text-primary hover:underline font-medium">
                get in touch
              </Link>{" "}
              with questions and feedback.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
