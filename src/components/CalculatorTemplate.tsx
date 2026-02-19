import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, RotateCcw } from "lucide-react";
import AdPlaceholder from "@/components/AdPlaceholder";
import RecentlyUsed from "@/components/RecentlyUsed";
import SEO from "@/components/SEO";
import { addRecentCalculator } from "@/lib/calculator-utils";
import { getCategoryIcon } from "@/data/calculators";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  description: string;
  metaDescription: string;
  icon: string;
  inputs: InputConfig[];
  calculate: (values: Record<string, number>) => ResultItem[];
  formula: { expression: string; variables: string[] };
  howToUse: string;
  faqs: { question: string; answer: string }[];
  relatedCalcs: { name: string; slug: string; icon: string; category: string }[];
}

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

  const handleChange = (id: string, val: number) => {
    setValues((prev) => ({ ...prev, [id]: val }));
  };

  const handleReset = () => setValues(getDefaults());

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: config.category, url: `/category/${config.categorySlug}` },
    { name: config.name, url: `/${config.categorySlug}/${config.slug}` },
  ];

  return (
    <div>
      <SEO
        title={config.name}
        description={config.metaDescription}
        canonical={`/${config.categorySlug}/${config.slug}`}
        breadcrumbs={breadcrumbs}
        faqs={config.faqs}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: config.name,
          description: config.metaDescription,
          applicationCategory: "FinanceApplication",
          operatingSystem: "All",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />

      <nav className="container mx-auto px-4 py-4 text-sm text-muted-foreground flex items-center gap-1.5">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to={`/category/${config.categorySlug}`} className="hover:text-foreground">{config.category}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">{config.name}</span>
      </nav>

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

            <div className="my-8">
              <AdPlaceholder size="responsive" />
            </div>

            {/* How to use */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                <span className="text-primary">💡</span> How to use this calculator
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

            <AdPlaceholder size="leaderboard" />
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block w-[300px] shrink-0 space-y-6">
            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                <span className="text-primary">≡</span> Related Calculators
              </h3>
              <ul className="space-y-1">
                {config.relatedCalcs.map((calc) => {
                  const Icon = getCategoryIcon(calc.icon);
                  return (
                    <li key={calc.slug}>
                      <Link
                        to={`/${calc.category}/${calc.slug}`}
                        className="flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-secondary transition-colors text-sm"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        {calc.name}
                      </Link>
                    </li>
                  );
                })}
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
