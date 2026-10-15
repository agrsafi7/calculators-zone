import { Link } from "react-router-dom";
import { categories, getCategoryIcon } from "@/data/calculators";
import { uniqueCalculators, getCategoryCalculatorCount } from "@/lib/calculator-utils";
import AdPlaceholder from "@/components/AdPlaceholder";
import SearchBar from "@/components/SearchBar";
import SEO from "@/components/SEO";

const totalCalcs = uniqueCalculators.length;

// Original category descriptions (2-3 sentences each) for SEO + usability.
const categoryDescriptions: Record<string, string> = {
  finance:
    "Plan your money with confidence. Our finance calculators cover mortgages, auto and personal loans, compound interest, retirement savings, taxes, and budgeting — every calculation runs instantly in your browser with clear breakdowns of payments, interest, and totals.",
  health:
    "Understand your body with trusted health metrics. Calculate BMI, body fat percentage, daily calorie needs (TDEE), BMR, heart-rate zones, pregnancy due dates, and more. These tools are for general information and work best alongside professional medical advice.",
  math:
    "From homework to engineering, our math calculators handle percentages, fractions, algebra, geometry, statistics, and GPA calculations. Each tool shows the formula it uses, so you don't just get an answer — you learn the method.",
  conversions:
    "Convert anything to anything. Length, weight, temperature, volume, speed, time, energy, pressure, data storage, and cooking measurements — between metric and imperial systems with precise, standard conversion factors.",
  science:
    "Physics, chemistry, and engineering calculations made simple. Force, velocity, energy, Ohm's law, pH, density, half-life, and the ideal gas law — built for students, teachers, and working professionals who need reliable numbers fast.",
  datetime:
    "Master time calculations. Find your exact age in years, months, and days; count days between dates; add or subtract days; calculate business days; convert time zones; and build countdowns for events and deadlines.",
  lifestyle:
    "Everyday math, solved. Tip and bill splitting, sleep cycles, pet age conversion, travel and fuel costs, recipe scaling, and random generators — the small calculations that come up constantly in daily life.",
  other:
    "Specialized calculators for everything else: automotive costs, real estate, construction and DIY projects, cooking, weather, and crafts. If you need to compute it, there's probably a tool here for it.",
};

const popularSlugs = [
  "mortgage-calculator",
  "bmi-calculator",
  "percentage-calculator",
  "age-calculator",
  "loan-calculator",
  "compound-interest-calculator",
  "calorie-calculator",
  "tip-calculator",
];

const popularCalcs = popularSlugs
  .map((slug) => uniqueCalculators.find((c) => c.slug === slug))
  .filter((c): c is (typeof uniqueCalculators)[number] => Boolean(c));

const Index = () => {
  return (
    <div>
      <SEO
        title="Free Online Calculators"
        description={`Free online calculators: ${totalCalcs} fast, accurate tools for finance, health, math, unit conversions, science, and everyday life. No sign-up required.`}
        canonical="/"
        keywords="online calculator, free calculator, mortgage calculator, BMI calculator, percentage calculator, age calculator, unit converter, loan calculator, calorie calculator, tip calculator"
      />

      {/* Simple hero: headline + intro + search */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-10 md:py-14 max-w-3xl text-center">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Free Online Calculators
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
            {totalCalcs} free calculators for finance, health, math, science, unit conversions,
            and everyday life. Every tool is fast, accurate, mobile-friendly, and free forever —
            no sign-up, no downloads. Just pick a calculator below or search for exactly what
            you need.
          </p>
          <div className="max-w-xl mx-auto">
            <SearchBar large placeholder="Search calculators… (e.g. mortgage, BMI, tip)" />
          </div>
        </div>
      </section>

      {/* Popular calculators */}
      <section className="container mx-auto px-4 py-8 max-w-5xl">
        <h2 className="text-lg font-bold mb-4">Most Popular Calculators</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {popularCalcs.map((calc) => (
            <li key={calc.slug}>
              <Link
                to={`/${calc.categorySlug}/${calc.slug}`}
                className="block px-4 py-3 bg-card border border-border rounded-lg text-sm font-medium hover:border-primary/40 hover:text-primary transition-colors"
              >
                {calc.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="container mx-auto px-4 max-w-5xl">
        <AdPlaceholder size="leaderboard" />
      </div>

      {/* Category sections with full calculator link lists */}
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="space-y-10">
          {categories.map((cat) => {
            const Icon = getCategoryIcon(cat.icon);
            const calcs = uniqueCalculators
              .filter((c) => c.categorySlug === cat.slug)
              .sort((a, b) => a.name.localeCompare(b.name));
            if (calcs.length === 0) return null;
            return (
              <section key={cat.slug} aria-label={`${cat.name} calculators`}>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold">
                    <Link to={`/category/${cat.slug}`} className="hover:text-primary transition-colors">
                      {cat.name} Calculators
                    </Link>
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    ({getCategoryCalculatorCount(cat.slug)})
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-3xl">
                  {categoryDescriptions[cat.slug] || cat.description}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1">
                  {calcs.map((calc) => (
                    <li key={calc.slug}>
                      <Link
                        to={`/${calc.categorySlug}/${calc.slug}`}
                        className="text-sm text-foreground/80 hover:text-primary hover:underline py-1 block"
                      >
                        {calc.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/category/${cat.slug}`}
                  className="inline-block mt-3 text-sm font-medium text-primary hover:underline"
                >
                  View all {cat.name.toLowerCase()} calculators →
                </Link>
              </section>
            );
          })}
        </div>
      </main>

      {/* About */}
      <section className="border-t border-border bg-card mt-8">
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
