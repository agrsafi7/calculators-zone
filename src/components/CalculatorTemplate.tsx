import { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { RotateCcw } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdPlaceholder from "@/components/AdPlaceholder";
import RecentlyUsed from "@/components/RecentlyUsed";
import GuideSections from "@/components/GuideSections";
import SEO from "@/components/SEO";
import { addRecentCalculator, uniqueCalculators } from "@/lib/calculator-utils";
import { DELETED_SLUGS } from "@/data/deleted-slugs";
import { getCategoryIcon } from "@/data/calculators";
import { categorySEOData, getMetaKeywords } from "@/lib/seo-keywords";
import ScientificNotationExplanation from "@/components/calculator-explanations/ScientificNotationExplanation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// recharts (~400KB) loads on demand — only when a results chart renders.
const CalculatorChart = lazy(() => import("@/components/CalculatorChart"));

export interface InputConfig {
  id: string;
  label: string;
  type: "number" | "select";
  defaultValue: number;
  prefix?: string;
  suffix?: string;
  step?: number;
  min?: number;
  max?: number;
  options?: { value: number; label: string }[];
}

export interface ResultItem {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface CalculatorConfig {
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  subcategory?: string;
  description: string;
  metaDescription: string;
  icon: string;
  inputs: InputConfig[];
  calculate: (values: Record<string, number>) => ResultItem[];
  formula: { expression: string; variables: string[] };
  howToUse: string;
  longExplanation?: string;
  faqs: { question: string; answer: string }[];
  relatedCalcs: { name: string; slug: string; icon: string; category: string }[];
}

// Get cross-category related calculators for internal linking
const getCrossCategoryLinks = (currentSlug: string, currentCategorySlug: string) => {
  const otherCalcs = uniqueCalculators.filter(
    (c) => c.categorySlug !== currentCategorySlug && c.slug !== currentSlug
  );
  // Pick 4 popular ones from different categories
  const picked: typeof otherCalcs = [];
  const usedCategories = new Set<string>();
  const popularSlugs = ["mortgage-calculator", "bmi-calculator", "percentage-calculator", "age-calculator", "length-converter", "force-calculator", "tip-calculator", "calorie-calculator"];
  
  for (const slug of popularSlugs) {
    if (picked.length >= 4) break;
    const calc = otherCalcs.find((c) => c.slug === slug && !usedCategories.has(c.categorySlug));
    if (calc) {
      picked.push(calc);
      usedCategories.add(calc.categorySlug);
    }
  }
  return picked;
};

const CalculatorTemplate = ({ config }: { config: CalculatorConfig }) => {
  const getDefaults = () => {
    const d: Record<string, number> = {};
    config.inputs.forEach((inp) => { d[inp.id] = inp.defaultValue; });
    return d;
  };

  const [values, setValues] = useState<Record<string, number>>(getDefaults);

  useEffect(() => {
    addRecentCalculator({
      slug: config.slug,
      categorySlug: config.categorySlug,
      name: config.name,
      category: config.category,
    });
  }, [config.slug]);

  const results = useMemo(() => {
    try {
      return config.calculate(values);
    } catch {
      return [{ label: "Error", value: "Check inputs", highlight: false }];
    }
  }, [values, config]);

  const crossLinks = useMemo(() => getCrossCategoryLinks(config.slug, config.categorySlug), [config.slug, config.categorySlug]);

  const handleChange = (id: string, val: number) => {
    setValues((prev) => ({ ...prev, [id]: val }));
  };

  const handleReset = () => setValues(getDefaults());

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: config.category, url: `/category/${config.categorySlug}` },
    { name: config.name, url: `/${config.categorySlug}/${config.slug}` },
  ];

  const categoryKeywords = getMetaKeywords(config.categorySlug);

  return (
    <div>
      <SEO
        title={config.name}
        description={config.metaDescription}
        canonical={`/${config.categorySlug}/${config.slug}`}
        breadcrumbs={breadcrumbs}
        faqs={config.faqs}
        keywords={categoryKeywords}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: config.name,
          description: config.metaDescription,
          applicationCategory: "UtilityApplication",
          operatingSystem: "All",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          applicationSubCategory: config.category,
        }}
      />

      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: config.category, href: `/category/${config.categorySlug}` },
        { label: config.name },
      ]} />

      <div className="container mx-auto px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl font-black mb-3">{config.name}</h1>
            <p className="text-muted-foreground text-sm max-w-xl mb-6">{config.description}</p>

            <AdPlaceholder size="leaderboard" />

            <div className="bg-card rounded-xl border border-border p-5 md:p-8 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Inputs */}
                <div>
                  <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                    <span className="text-primary">≡</span> Input Values
                  </h3>
                  <div className="space-y-4">
                    {config.inputs.map((inp) => (
                      <div key={inp.id}>
                        <label className="text-xs font-medium text-muted-foreground block mb-1.5">{inp.label}</label>
                        {inp.type === "select" && inp.options ? (
                          <select
                            value={values[inp.id]}
                            onChange={(e) => handleChange(inp.id, Number(e.target.value))}
                            className="w-full px-3 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none"
                          >
                            {inp.options.map((o) => (
                              <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                          </select>
                        ) : (
                          <div className="relative">
                            {inp.prefix && (
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{inp.prefix}</span>
                            )}
                            <input
                              type="number"
                              step={inp.step || 1}
                              min={inp.min}
                              max={inp.max}
                              value={values[inp.id]}
                              onChange={(e) => handleChange(inp.id, Number(e.target.value))}
                              className={`w-full ${inp.prefix ? "pl-7" : "pl-3"} ${inp.suffix ? "pr-8" : "pr-3"} py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30`}
                            />
                            {inp.suffix && (
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{inp.suffix}</span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 mt-6">
                    <button className="flex-1 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
                      Calculate
                    </button>
                    <button
                      onClick={handleReset}
                      className="p-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Results */}
                <div className="flex flex-col items-center justify-center">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Results</p>
                  <div className="w-full space-y-3">
                    {results.map((r, i) => (
                      <div
                        key={i}
                        className={`rounded-xl p-4 ${r.highlight ? "bg-primary/5 border border-primary/20" : "bg-secondary"}`}
                      >
                        <p className="text-xs text-muted-foreground mb-0.5">{r.label}</p>
                        <p className={`font-black ${r.highlight ? "text-2xl md:text-3xl text-primary" : "text-lg text-foreground"}`}>
                          {r.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Suspense fallback={null}>
              <CalculatorChart results={results} />
            </Suspense>

            <div className="my-8">
              <AdPlaceholder size="responsive" />
            </div>

            {/* How to use */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                <span className="text-primary">💡</span> How to Use the {config.name}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{config.howToUse}</p>
              <h3 className="font-semibold text-base mb-2">Formula</h3>
              <div className="formula-block mb-2">
                <p className="text-base md:text-lg mb-3">{config.formula.expression}</p>
                <div className="flex flex-wrap justify-center gap-4 text-xs opacity-70">
                  {config.formula.variables.map((v, i) => (
                    <span key={i}>{v}</span>
                  ))}
                </div>
              </div>
            </section>

            {config.longExplanation === "scientific-notation" && <ScientificNotationExplanation />}

            {/* In-depth guide (only for calculators that have one) */}
            <GuideSections slug={config.slug} />

            {/* Internal links - Explore More section */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Explore More Calculators</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {crossLinks.map((calc) => {
                  const Icon = getCategoryIcon(calc.icon);
                  return (
                    <Link
                      key={calc.slug}
                      to={`/${calc.categorySlug}/${calc.slug}`}
                      className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-sm transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm group-hover:text-primary transition-colors">{calc.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{calc.category} • {calc.description}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link to={`/category/${config.categorySlug}`} className="text-xs font-medium text-primary hover:underline">
                  Browse all {config.category} calculators
                </Link>
                <span className="text-xs text-muted-foreground">|</span>
                <Link to="/categories" className="text-xs font-medium text-primary hover:underline">
                  Browse all calculator categories
                </Link>
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="border border-border rounded-xl overflow-hidden">
                {config.faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`q${i}`} className={`${i < config.faqs.length - 1 ? "border-b border-border" : ""} px-5`}>
                    <AccordionTrigger className="text-sm font-medium">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* SEO content block with keyword-rich text */}
            <section className="mb-8 border-t border-border pt-6">
              <h2 className="text-lg font-bold mb-3">About the {config.name}</h2>
              <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
                <p>
                  The <strong>{config.name}</strong> is a free online tool that helps you {config.metaDescription.toLowerCase()}. 
                  This calculator is part of our <Link to={`/category/${config.categorySlug}`} className="text-primary hover:underline font-medium">{config.category} calculators</Link> collection, 
                  trusted by users in the United States, United Kingdom, Canada, and Australia.
                </p>
                <p>
                  Whether you're a student, professional, or just need a quick answer, our {config.name.toLowerCase()} provides instant, 
                  accurate results with no sign-up required. All calculations run directly in your browser for maximum speed and privacy.
                </p>
                <p>
                  Looking for more tools? Try our popular calculators: {' '}
                  <Link to="/finance/mortgage-calculator" className="text-primary hover:underline">Mortgage Calculator</Link>, {' '}
                  <Link to="/health/bmi-calculator" className="text-primary hover:underline">BMI Calculator</Link>, {' '}
                  <Link to="/math/percentage-calculator" className="text-primary hover:underline">Percentage Calculator</Link>, and {' '}
                  <Link to="/datetime/age-calculator" className="text-primary hover:underline">Age Calculator</Link>.
                </p>
              </div>
            </section>

            <AdPlaceholder size="leaderboard" />
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block w-[300px] shrink-0 space-y-6">
            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                <span className="text-primary">≡</span> Related Calculators
              </h3>
              <ul className="space-y-1">
                {config.relatedCalcs
                  .filter((calc) => !DELETED_SLUGS.has(calc.slug))
                  .map((calc) => {
                    const Icon = getCategoryIcon(calc.icon);
                    return (
                      <li key={calc.slug}>
                        <Link
                          to={`/${calc.category}/${calc.slug}`}
                          className="flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-secondary transition-colors text-sm"
                        >
                          <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          {calc.name}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>

            {/* Popular across site */}
            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-bold text-sm mb-4">🔥 Popular Calculators</h3>
              <ul className="space-y-1.5">
                {[
                  { name: "Mortgage Calculator", path: "/finance/mortgage-calculator" },
                  { name: "BMI Calculator", path: "/health/bmi-calculator" },
                  { name: "Percentage Calculator", path: "/math/percentage-calculator" },
                  { name: "Age Calculator", path: "/datetime/age-calculator" },
                  { name: "Length Converter", path: "/conversions/length-converter" },
                ].filter(l => !l.path.includes(config.slug)).slice(0, 4).map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-sm text-primary hover:underline">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <AdPlaceholder size="rectangle" />
            <RecentlyUsed />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CalculatorTemplate;
