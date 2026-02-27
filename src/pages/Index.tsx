import { Link } from "react-router-dom";
import { ArrowUpRight, CheckCircle, Star, Calculator, Search } from "lucide-react";
import { categories, popularCalculators, getCategoryIcon } from "@/data/calculators";
import { financeCalculators } from "@/data/finance-calculators";
import { healthCalculators } from "@/data/health-calculators";
import { mathCalculators } from "@/data/math-calculators";
import { conversionCalculators } from "@/data/conversion-calculators";
import { datetimeCalculators } from "@/data/datetime-calculators";
import { scienceCalculators } from "@/data/science-calculators";
import { lifestyleCalculators } from "@/data/lifestyle-calculators";
import AdPlaceholder from "@/components/AdPlaceholder";
import SearchBar from "@/components/SearchBar";
import RecentlyUsed from "@/components/RecentlyUsed";
import SEO from "@/components/SEO";
import HeroCalculator from "@/components/HeroCalculator";

const categoryCalcCounts: Record<string, number> = {
  finance: financeCalculators.length,
  health: healthCalculators.length,
  math: mathCalculators.length,
  conversions: conversionCalculators.length,
  datetime: datetimeCalculators.length,
  science: scienceCalculators.length,
  lifestyle: lifestyleCalculators.length,
};

const categoryFeatured: Record<string, { name: string; slug: string }[]> = {
  finance: financeCalculators.slice(0, 4).map(c => ({ name: c.name, slug: c.slug })),
  health: healthCalculators.slice(0, 4).map(c => ({ name: c.name, slug: c.slug })),
  math: mathCalculators.slice(0, 4).map(c => ({ name: c.name, slug: c.slug })),
  conversions: conversionCalculators.slice(0, 4).map(c => ({ name: c.name, slug: c.slug })),
  datetime: datetimeCalculators.slice(0, 4).map(c => ({ name: c.name, slug: c.slug })),
  science: scienceCalculators.slice(0, 4).map(c => ({ name: c.name, slug: c.slug })),
  lifestyle: lifestyleCalculators.slice(0, 4).map(c => ({ name: c.name, slug: c.slug })),
};

const totalCalcs = Object.values(categoryCalcCounts).reduce((a, b) => a + b, 0);

const Sidebar = () => (
  <aside className="hidden lg:block w-[300px] shrink-0 space-y-6">
    <AdPlaceholder size="rectangle" />

    <div className="bg-navy text-primary-foreground rounded-xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        <h3 className="font-bold text-sm">Why Calculators?</h3>
      </div>
      <p className="text-xs opacity-80 mb-4">
        We provide accurate, reliable, and free calculation tools for professionals and students alike. Trusted by financial advisors and educators worldwide.
      </p>
      <ul className="space-y-2 mb-4">
        {[`${totalCalcs}+ Free Calculators`, "Mobile Optimized Tools", "Instant Results"].map((item) => (
          <li key={item} className="flex items-center gap-2 text-xs">
            <CheckCircle className="w-3.5 h-3.5 text-green-400" />
            {item}
          </li>
        ))}
      </ul>
      <Link
        to="/category/finance"
        className="block w-full text-center py-2 rounded-lg bg-destructive text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Browse All Tools
      </Link>
    </div>

    <RecentlyUsed />

    <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="font-bold text-sm mb-4">Latest Updates</h3>
      <ul className="space-y-4">
        {[
          { title: "How to calculate your Mortgage APR effectively", time: "2 days ago" },
          { title: "Understanding BMI vs. Body Fat Percentage", time: "5 days ago" },
          { title: "Top 10 Math Tricks for Students", time: "1 week ago" },
        ].map((item) => (
          <li key={item.title}>
            <p className="text-sm font-medium text-foreground leading-snug">{item.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
          </li>
        ))}
      </ul>
    </div>
  </aside>
);

const Index = () => {
  return (
    <div>
      <SEO title="Free Online Calculators" description={`Access ${totalCalcs}+ free online calculators for finance, health, math, science, and daily life. Fast, accurate, and mobile-friendly tools trusted by millions.`} canonical="/" />
      <section className="hero-section py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left: Calculator */}
            <div>
              <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-4">
                <Calculator className="w-3 h-3" />
                QUICK CALCULATE
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4">
                Free Online Calculators for Every Need
              </h1>
              <p className="text-muted-foreground text-sm mb-6">
                Access over {totalCalcs}+ precision tools for finance, health, science, and daily life.
              </p>
              <HeroCalculator />
            </div>

            {/* Right: Search + Info */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                <Search className="w-3 h-3" />
                FIND A CALCULATOR
              </div>
              <h2 className="text-2xl font-bold">What do you want to calculate?</h2>
              <SearchBar large placeholder="Search calculators..." />
              <div className="bg-card rounded-xl border border-border p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary fill-primary" />
                  <span className="font-semibold text-sm">Trusted by 2M+ users monthly</span>
                </div>
                <ul className="space-y-2">
                  {[`${totalCalcs}+ Free Calculators`, "Instant & Accurate Results", "Works on All Devices"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <RecentlyUsed />
            </div>
          </div>
        </div>
      </section>

      <section className="py-6">
        <AdPlaceholder size="leaderboard" />
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <div className="flex-1 min-w-0">
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Browse Categories</h2>
                <span className="text-sm font-medium text-muted-foreground">{totalCalcs} calculators across {categories.length} categories</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((cat) => {
                  const Icon = getCategoryIcon(cat.icon);
                  const count = categoryCalcCounts[cat.slug] || 0;
                  const featured = categoryFeatured[cat.slug] || [];
                  return (
                    <Link
                      key={cat.slug}
                      to={`/category/${cat.slug}`}
                      className="card-elevated bg-card rounded-xl border border-border p-5 group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className="text-xs font-bold px-2.5 py-1 rounded-full text-primary-foreground"
                            style={{ backgroundColor: cat.color }}
                          >
                            {count}
                          </span>
                          <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      <h3 className="font-semibold text-sm mb-1">{cat.name}</h3>
                      <p className="text-xs text-muted-foreground mb-3">{cat.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {featured.map((f) => (
                          <span key={f.slug} className="category-tag">{f.name}</span>
                        ))}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Popular Calculators</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {popularCalculators.map((calc) => {
                  const Icon = getCategoryIcon(calc.icon);
                  return (
                    <Link
                      key={calc.slug}
                      to={`/${calc.categorySlug}/${calc.slug}`}
                      className="card-elevated bg-card rounded-xl border border-border p-4 flex items-center gap-3 group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{calc.shortName || calc.name}</p>
                        <p className="text-xs text-muted-foreground">{calc.category}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <Sidebar />
        </div>
      </section>

      {/* SEO About Section */}
      <section className="container mx-auto px-4 py-12 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">About Calculators</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
            <p>
              Calculators is your one-stop destination for fast, comprehensive, and completely free online calculators across a wide range of categories. With over {totalCalcs} tools spanning finance, health &amp; fitness, math, unit conversions, science, date &amp; time, and lifestyle — we help millions of users every month make quick, accurate calculations without the hassle of sign-ups or downloads.
            </p>
            <p>
              Whether you're a student solving complex equations, a professional calculating mortgage rates, or someone tracking daily calorie intake — our tools are designed with precision and simplicity in mind. Each calculator is individually developed, rigorously tested, and optimized for all devices so you get reliable results every time, on desktop or mobile.
            </p>
            <p>
              We believe the internet should be a source of free, accessible information. That's why all our calculators and tools are 100% free to use, require no registration, and are constantly updated to reflect the latest formulas and standards. From <Link to="/finance/mortgage-calculator" className="text-primary hover:underline">mortgage calculators</Link> and <Link to="/health/bmi-calculator" className="text-primary hover:underline">BMI calculators</Link> to <Link to="/math/percentage-calculator" className="text-primary hover:underline">percentage calculators</Link> and <Link to="/conversions/length-converter" className="text-primary hover:underline">unit converters</Link> — we've got you covered.
            </p>
            <p>
              Our mission is simple: to be the most trusted, go-to calculator resource on the web. If you find an error or have a suggestion for a new tool, we'd love to hear from you. Your feedback helps us continuously improve and expand our library of calculators.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
