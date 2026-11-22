import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { categories } from "@/data/calculators";
import { uniqueCalculators, searchCalculators, getCategoryCalculatorCount } from "@/lib/calculator-utils";
import SEO from "@/components/SEO";
import ScientificEngine from "@/components/ScientificEngine";
import { useSearchAutocomplete, SearchSuggestions } from "@/components/SearchAutocomplete";
import { ArrowLeftRight, ArrowRight, BadgeCheck, Clock, FlaskConical, Home, LucideIcon, Play, Search } from "lucide-react";

const totalCalcs = uniqueCalculators.length;

const CATEGORY_IMAGES: Record<string, string> = {
  finance: "/images/categories/finance.webp",
  health: "/images/categories/health.webp",
  math: "/images/categories/math.webp",
  other: "/images/categories/other.webp",
};

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  conversions: ArrowLeftRight,
  datetime: Clock,
  science: FlaskConical,
  lifestyle: Home,
};
// Homepage FAQs — visible text below; the identical Q&As are emitted as
// static FAQPage JSON-LD by scripts/collect-meta.ts (prerender), so the
// structured data always matches what visitors see. Keep both in sync.
const HOME_FAQS = [
  {
    question: "Are the calculators on TheCalculator.us free to use?",
    answer:
      "Yes. Every calculator on TheCalculator.us is free to use, with no sign-up, no account, and no limit on how many calculations you run.",
  },
  {
    question: "How accurate are the calculators?",
    answer:
      "Each calculator is coded individually and put through numerical verification against industry-standard benchmarks. Results are still estimates — for major financial, tax, or health decisions, confirm the numbers with a qualified professional.",
  },
  {
    question: "Do I need to create an account or share personal information?",
    answer:
      "No. The calculators run in your browser and work without an account. The basic calculator's history is stored only on your own device, and you can clear it at any time.",
  },
  {
    question: "Which calculators are the most popular?",
    answer:
      "The most used tools are the Mortgage Calculator, BMI Calculator, Percentage Calculator, Loan Calculator, and Age Calculator. You can browse the full directory by category — finance, health & fitness, math & education, unit conversions, science, date & time, lifestyle, and more.",
  },
];

const calcsForCategory = (slug: string) =>
  uniqueCalculators.filter((c) => c.categorySlug === slug);

const categoryLabel = (name: string) =>
  name.endsWith("Calculators") ? name : `${name} Calculators`;

const Index = () => {
  const navigate = useNavigate();
  const heroSearch = useSearchAutocomplete((calc) =>
    navigate(`/${calc.categorySlug}/${calc.slug}`)
  );

  const submitQuickSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const q = heroSearch.query.trim();
    if (!q) return;
    const hits = searchCalculators(q);
    if (hits.length > 0) navigate(`/${hits[0].categorySlug}/${hits[0].slug}`);
    heroSearch.setQuery("");
    heroSearch.setOpen(false);
  };

  return (
    <div className="w-full bg-background min-h-[calc(100vh-144px)]">
      <SEO
        title="Free Online Calculators — Finance, Health, Math & More"
        description={`TheCalculator.us offers ${totalCalcs} free online calculators for finance, health, math, conversions, date & time, science, lifestyle and everyday utilities. Fast, accurate, no sign-up.`}
        canonical="https://thecalculator.us/"
      />
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10 py-5">
        <div className="flex flex-col w-full">
          {/* Hero: Scientific Engine + intro rail */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8">
            <div className="lg:col-span-8">
              <ScientificEngine />
            </div>
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="bg-surface-lowest rounded-xl p-6 shadow-sm">
                <h1 className="font-display text-[18px] font-semibold text-ink mb-1">Free Online Calculators</h1>
                <p className="text-[12px] text-ink-soft mb-4">
                  Instant, precise mathematical engines for finance, everyday health, academics, and practical engineering.
                </p>
                <form className="flex flex-col gap-2" onSubmit={submitQuickSearch}>
                  <div className="relative w-full" ref={heroSearch.ref}>
                    <Search size={18} className="absolute left-3 top-2.5 text-ink-soft" />
                    <input
                      className="w-full bg-surface-low focus:bg-surface-lowest text-ink pl-9 pr-3 py-2 rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-ink-soft"
                      placeholder={`Search ${totalCalcs}+ utilities...`}
                      type="text"
                      value={heroSearch.query}
                      onChange={(e) => heroSearch.setQuery(e.target.value)}
                      onKeyDown={heroSearch.handleKeyDown}
                      onFocus={() => heroSearch.query.trim() && heroSearch.setOpen(true)}
                      aria-label="Search calculators"
                      autoComplete="off"
                    />
                    {heroSearch.open && heroSearch.suggestions.length > 0 && (
                      <SearchSuggestions
                        suggestions={heroSearch.suggestions}
                        activeIndex={heroSearch.activeIndex}
                        onSelect={heroSearch.pick}
                        onHover={heroSearch.setActiveIndex}
                        idPrefix="hero"
                      />
                    )}
                  </div>
                  <button
                    className="bg-link text-white hover:opacity-90 text-[13px] font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-1 transition-opacity"
                    type="submit"
                  >
                    <span>Find Calculator</span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              </div>
              <div className="bg-primary text-white rounded-xl p-4 shadow-sm flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-display text-[15px] font-semibold">Universal Accuracy</span>
                  <span className="text-[12px] opacity-90">Tested against known reference values</span>
                </div>
                <BadgeCheck size={32} className="opacity-80" />
              </div>
            </div>
          </section>

          {/* Tier 1 — Categories, simple style */}
          <section className="mb-8" aria-label="Calculator categories">
            <h2 className="font-display text-[20px] font-semibold text-ink mb-4">Calculator Categories</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((cat) => {
                const count = getCategoryCalculatorCount(cat.slug);
                const Icon = CATEGORY_ICONS[cat.slug];
                return (
                  <Link
                    key={cat.slug}
                    to={`/category/${cat.slug}`}
                    className="bg-surface-lowest rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3 group"
                  >
                    {CATEGORY_IMAGES[cat.slug] ? (
                      <img
                        className="w-10 h-10 rounded-full object-cover shrink-0"
                        src={CATEGORY_IMAGES[cat.slug]}
                        alt={`${cat.name} calculators`}
                        loading="lazy"
                        width={40}
                        height={40}
                      />
                    ) : (
                      <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                        {Icon && <Icon size={20} className="text-white" />}
                      </span>
                    )}
                    <span>
                      <span className="block font-display text-[15px] font-semibold text-ink group-hover:text-primary transition-colors">
                        {categoryLabel(cat.name)}
                      </span>
                      <span className="block text-[12px] text-ink-soft">{count} calculators</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Tier 2 — Category pages, listed */}
          <section className="mb-8" aria-label="Category pages">
            <h2 className="font-display text-[20px] font-semibold text-ink mb-4">Category Pages</h2>
            <div className="bg-surface-lowest rounded-xl shadow-sm px-6">
              {categories.map((cat) => {
                const count = getCategoryCalculatorCount(cat.slug);
                return (
                  <div key={cat.slug} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-4 border-b border-border last:border-b-0">
                    <Link
                      to={`/category/${cat.slug}`}
                      className="font-display text-[15px] font-semibold text-link hover:text-link-dark hover:underline shrink-0 sm:w-56"
                    >
                      {categoryLabel(cat.name)}
                    </Link>
                    <p className="text-[13px] text-ink-soft flex-1">{cat.description}</p>
                    <span className="text-[12px] text-ink-soft shrink-0">{count} calculators</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Tier 3 — All calculators, compact directory grouped by category */}
          <section className="mb-8" aria-label="All calculators">
            <h2 className="font-display text-[20px] font-semibold text-ink mb-1">All Calculators</h2>
            <p className="text-[13px] text-ink-soft mb-6">Every calculator on the site, grouped by category — {totalCalcs} free tools.</p>
            <div className="flex flex-col gap-8">
              {categories.map((cat) => {
                const list = calcsForCategory(cat.slug);
                return (
                  <div key={cat.slug}>
                    <h3 className="font-display text-[16px] font-semibold text-ink mb-3">
                      <Link to={`/category/${cat.slug}`} className="hover:text-primary transition-colors">
                        {categoryLabel(cat.name)}
                      </Link>
                      <span className="text-[12px] font-normal text-ink-soft ml-2">({list.length})</span>
                    </h3>
                    <ul className="columns-2 sm:columns-3 lg:columns-4 gap-x-6">
                      {list.map((c) => (
                        <li key={c.slug} className="break-inside-avoid">
                          <Link
                            to={`/${c.categorySlug}/${c.slug}`}
                            className="text-[13px] text-link hover:text-link-dark hover:underline block py-0.5"
                          >
                            {c.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="flex justify-center items-center mb-8">
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 bg-primary text-white hover:bg-tealbright px-8 py-3 rounded-lg font-display text-[15px] font-semibold shadow-md transition-all"
            >
              <span>All Calculators Directory</span>
              <Play size={20} className="bg-[#9cf2e8] text-[#00201d] rounded-full p-0.5" />
            </Link>
          </div>

          {/* About */}
          <section className="bg-surface-low rounded-xl p-6 text-ink-soft max-w-4xl mx-auto mb-6">
            <h2 className="font-display text-[18px] font-semibold text-ink mb-3">About TheCalculator.us</h2>
            <div className="space-y-3">
              <p className="text-[14px] leading-relaxed">
                TheCalculator.us's sole focus is to provide fast, comprehensive, convenient, free online calculators in a plethora of areas.
                Currently, we have around {totalCalcs} calculators to help you "do the math" quickly in fields such as finance, fitness, health, math,
                and others, with active research adding new utilities weekly. Our goal is to become the one-stop, go-to destination for people who need
                to make rapid, dependable calculations without intrusive interstitial ads or registration walls.
              </p>
              <p className="text-[14px] leading-relaxed">
                We coded and developed each calculator individually and put each one through strict, comprehensive numerical verification against
                industry-standard benchmarks. However, please inform us if you notice even the slightest error — your input is valuable to our
                mathematical standards. Additionally, while most calculators on TheCalculator.us are designed to be universally applicable for worldwide
                usage, some are tailored for specific countries; for example, the <em>Income Tax Calculator</em> is calibrated specifically for
                United States federal and state tax codes.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-surface-lowest rounded-xl p-6 shadow-sm max-w-4xl mx-auto mb-6 w-full">
            <h2 className="font-display text-[18px] font-semibold text-ink mb-4">Frequently Asked Questions</h2>
            <div className="space-y-5">
              {HOME_FAQS.map((f) => (
                <div key={f.question}>
                  <h3 className="font-display text-[15px] font-semibold text-ink mb-1">{f.question}</h3>
                  <p className="text-[14px] leading-relaxed text-ink-soft">{f.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Index;
