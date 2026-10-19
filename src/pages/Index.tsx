import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { categories } from "@/data/calculators";
import { uniqueCalculators, searchCalculators } from "@/lib/calculator-utils";
import SEO from "@/components/SEO";
import ScientificEngine from "@/components/ScientificEngine";
import { useSearchAutocomplete, SearchSuggestions } from "@/components/SearchAutocomplete";
import { ArrowLeftRight, ArrowRight, BadgeCheck, Clock, FlaskConical, Home, LucideIcon, Play, Search, TrendingUp } from "lucide-react";

const totalCalcs = uniqueCalculators.length;

const CATEGORY_IMAGES: Record<string, string> = {
  finance: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiVEwE0z5UThuB6Kp4dzOehehPrRbBJZKOZivzMq8Q7rFZ9I2qGb-4z-QjSK9N3l2PSEZiGZ7TsdzIDuUIma-jCF9pljhBUcV-utx1sEF5eD4W4eaOI5o4_wizxtNvTLXJNdyotT0xgVfTiDuDQYbrqaD1GxNnBQKBSz1b--HgHoUlsOBvh1ODKUHOkuqhcGxm4WIdfswbIW_2ixcY2mzPKAJ00CVM_N2PtXdzhVl_i67Yx_RwFfmo=w200",
  health: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGK_sBsDvtmwKepjEMXeYySXCsEmu9r0FN6nZWO00vGYRjemPdALqLRIiqsTTFGb3o0IZNCwMS3ieIts4OTgMk7VF9WhBc1MpqQGON4jQbWeIGZnCl8-QO8h3nXx5CmEElIsIKuq59cyUmlm1sL4ua_E50BbrxHhud6jmuZ3FIyN2kgn_otkIFpDKiRW-OACpvwoYRzwM0z6ilvBE7ff4Zmotrz78OIzTRUXCkaEwBRx7CJLhUiswR=w200",
  math: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBng2iry8yhYtaA0BhItFPEIG97gbyp--Zh5rfqhGrPBIxNnHVh-p_twmW6HjxLpw_wBszeacQZ1VrYRSkxrSGNOq2PQbMsOpYBdWlLz3ulCdRAxqsDzAj9cfVYfTmKyXwDLk4sfhN-86UqpwfI8rJpZjPmO8k4KjzUYvNyEmz4vWQJ6nKskGnoL61kkPDRc6Zc7I0kpXewYSnDkmrYlg5Uw6lzoYewo26UyzndmomTv8hQh8PsG2E=w200",
  other: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1cPfaMmkKFwMWFwpCgKuWEAyKkTH_84snAQOQ_ayRYd4NrxBUgBiF-Lti9my-q9ey9XC9_kyvUv342LU5Wf2dLX6BcJbe0_kYBJ5phe9y_Kp7ziLOyZ5hWqkZB56LcV3uHYljb9Cd_HV77INijaTLcNfUfVy73vq63km0G7XDt-ZuH9VoqbfygBCucW_UytgX1xwjkVxzacyelklwzzB_rk1f2tj1epsxNBdAtCu8TZ37ky1gBajd=w200",
};

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  conversions: ArrowLeftRight,
  datetime: Clock,
  science: FlaskConical,
  lifestyle: Home,
};
const POPULAR_TODAY = [
  { name: "Mortgage", to: "/finance/mortgage-calculator" },
  { name: "BMI Body Mass", to: "/health/bmi-calculator" },
  { name: "Personal Loan", to: "/finance/personal-loan-calculator" },
  { name: "Auto Financing", to: "/finance/auto-loan-calculator" },
  { name: "Calorie Target", to: "/health/calorie-calculator" },
];

const topForCategory = (slug: string, n: number) =>
  uniqueCalculators.filter((c) => c.categorySlug === slug).slice(0, n);

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
                <h2 className="font-display text-[18px] font-semibold text-ink mb-1">Free Online Calculators</h2>
                <p className="text-[12px] text-ink-soft mb-4">
                  Instant, precise mathematical engines for finance, everyday health, academics, and practical engineering.
                </p>
                <form className="flex flex-col gap-2 mb-4" onSubmit={submitQuickSearch}>
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
                <div className="bg-surface-low rounded-lg p-4">
                  <div className="flex items-center gap-1.5 text-[11px] text-ink-soft uppercase tracking-wider mb-2 font-medium">
                    <TrendingUp size={14} className="text-primary" />
                    <span>Most Popular Today</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {POPULAR_TODAY.map((p) => (
                      <Link
                        key={p.to}
                        to={p.to}
                        className="text-[12px] text-link hover:text-link-dark bg-surface-lowest px-2 py-1 rounded hover:shadow-sm transition-all"
                      >
                        {p.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-primary text-white rounded-xl p-4 shadow-sm flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-display text-[15px] font-semibold">Universal Accuracy</span>
                  <span className="text-[12px] opacity-90">Validated against IEEE 754 precision norms</span>
                </div>
                <BadgeCheck size={32} className="opacity-80" />
              </div>
            </div>
          </section>

          {/* Category directory cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8" aria-label="Calculator categories">
            {categories.map((cat, i) => {
              const list = topForCategory(cat.slug, 12);
              return (
                <div key={cat.slug} className="bg-surface-lowest rounded-xl p-6 shadow-sm flex flex-col">
                  <div className="flex items-center gap-4 pb-3 mb-4 bg-surface-low -mx-6 -mt-6 p-6 rounded-t-xl">
                    {CATEGORY_IMAGES[cat.slug] ? (
                      <img
                        className="w-14 h-14 rounded-full object-cover shrink-0 shadow-sm"
                        src={CATEGORY_IMAGES[cat.slug]}
                        alt={`${cat.name} calculators`}
                        loading="lazy"
                      />
                    ) : (
                      <span className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-sm">
                        {(() => { const DynIcon = CATEGORY_ICONS[cat.slug]; return <DynIcon size={28} className="text-white" />; })()}
                      </span>
                    )}
                    <div>
                      <h3 className="font-display text-[18px] font-semibold text-ink">
                        <Link to={`/category/${cat.slug}`} className="hover:text-primary transition-colors">
                          {cat.name}{cat.name.endsWith("Calculators") ? "" : " Calculators"}
                        </Link>
                      </h3>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-1.5 flex-1">
                    {list.map((c) => (
                      <li key={c.slug}>
                        <Link
                          to={`/${c.categorySlug}/${c.slug}`}
                          className="text-[12px] text-link hover:text-link-dark hover:underline block py-0.5"
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="mt-3 text-[12px] font-medium text-primary hover:underline"
                  >
                    View all →
                  </Link>
                </div>
              );
            })}
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
        </div>
      </div>
    </div>
  );
};

export default Index;
