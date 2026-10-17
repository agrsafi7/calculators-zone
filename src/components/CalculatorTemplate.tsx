import { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import GuideSections from "@/components/GuideSections";
import SEO from "@/components/SEO";
import { addRecentCalculator, uniqueCalculators } from "@/lib/calculator-utils";
import { DELETED_SLUGS } from "@/data/deleted-slugs";
import { getMetaKeywords } from "@/lib/seo-keywords";
import ScientificNotationExplanation from "@/components/calculator-explanations/ScientificNotationExplanation";
import { Calculator, ChevronRight, LayoutGrid } from "lucide-react";

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
  sanitized?: boolean; // set when a non-finite value was replaced with an em dash
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

// Group same-category calculators by subcategory for the directory grid.
const getDirectoryGroups = (categorySlug: string, currentSlug: string) => {
  const calcs = uniqueCalculators.filter(
    (c) => c.categorySlug === categorySlug && c.slug !== currentSlug
  );
  const groups = new Map<string, typeof calcs>();
  for (const c of calcs) {
    const key = c.subcategory || "General";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(c);
  }
  return [...groups.entries()]
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 4)
    .map(([name, items]) => ({ name, items: items.slice(0, 5) }));
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
  }, [config.slug, config.categorySlug, config.name, config.category]);

  const results = useMemo(() => {
    try {
      const raw = config.calculate(values);
      // Sanitize: never display NaN/Infinity/undefined to users. Degenerate
      // inputs (e.g. 0-year loan) show an em dash plus a guidance notice.
      return raw.map((r) => {
        const v = String(r?.value ?? "");
        if (/NaN|Infinity|undefined/.test(v)) {
          return { ...r, value: "—", sanitized: true };
        }
        return r;
      });
    } catch {
      return [{ label: "Error", value: "Check inputs", highlight: false }];
    }
  }, [values, config]);

  const hasSanitized = results.some((r) => r.sanitized);

  const handleChange = (id: string, val: number) => {
    // Clamp to the input's declared range so degenerate values (negative
    // loan terms, etc.) can't be entered in the first place.
    const inp = config.inputs.find((i) => i.id === id);
    let clamped = val;
    if (Number.isFinite(val) && inp) {
      if (inp.min !== undefined && clamped < inp.min) clamped = inp.min;
      if (inp.max !== undefined && clamped > inp.max) clamped = inp.max;
    }
    setValues((prev) => ({ ...prev, [id]: clamped }));
  };

  const handleReset = () => setValues(getDefaults());

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: config.category, url: `/category/${config.categorySlug}` },
    { name: config.name, url: `/${config.categorySlug}/${config.slug}` },
  ];

  const categoryKeywords = getMetaKeywords(config.categorySlug);
  const primaryResult = results.find((r) => r.highlight) ?? results[0];
  const breakdown = results.filter((r) => r !== primaryResult);
  const directoryGroups = useMemo(
    () => getDirectoryGroups(config.categorySlug, config.slug),
    [config.categorySlug, config.slug]
  );
  const related = config.relatedCalcs.filter((c) => !DELETED_SLUGS.has(c.slug)).slice(0, 5);

  return (
    <div className="w-full bg-background min-h-[calc(100vh-144px)]">
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

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10 py-5">
        <div className="flex flex-col w-full">
          {/* Breadcrumbs & header */}
          <div className="flex flex-col mb-4">
            <div className="flex items-center gap-1.5 text-[11px] text-ink-soft">
              <Link className="hover:text-primary transition-colors" to="/">Home</Link>
              <span className="opacity-50">/</span>
              <Link className="hover:text-primary transition-colors" to={`/category/${config.categorySlug}`}>{config.category}</Link>
              <span className="opacity-50">/</span>
              <span className="text-ink font-medium">{config.name}</span>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-2 mt-1">
              <h1 className="font-display text-[24px] font-semibold text-ink tracking-tight">{config.name}</h1>
              <span className="text-[12px] text-ink-soft">Instant {config.category.toLowerCase()} computation</span>
            </div>
            <p className="text-[14px] text-ink-soft mt-1">{config.description}</p>
          </div>

          {/* Primary workspace: 7 / 5 split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: input form */}
            <div className="lg:col-span-7">
              <div className="bg-surface-lowest rounded-xl p-6 shadow-sm">
                <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                  {config.inputs.map((inp) => (
                    <div key={inp.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <label className="text-[13px] font-medium text-ink" htmlFor={`inp-${inp.id}`}>
                        {inp.label}
                      </label>
                      {inp.type === "select" && inp.options ? (
                        <select
                          id={`inp-${inp.id}`}
                          value={values[inp.id]}
                          onChange={(e) => handleChange(inp.id, Number(e.target.value))}
                          className="w-full sm:w-64 px-3 py-1.5 rounded-lg bg-surface-low text-[14px] font-numeric text-ink focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          {inp.options.map((o) => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                          ))}
                        </select>
                      ) : (
                        <div className="flex items-center rounded-lg bg-surface-low overflow-hidden w-full sm:w-64 focus-within:bg-surface-lowest focus-within:ring-2 focus-within:ring-primary">
                          {inp.prefix && (
                            <span className="px-3 font-numeric text-[14px] text-ink-soft bg-surface-container py-1.5">{inp.prefix}</span>
                          )}
                          <input
                            id={`inp-${inp.id}`}
                            className="w-full bg-transparent px-2 py-1.5 font-numeric text-[14px] text-right text-ink focus:outline-none"
                            type="number"
                            step={inp.step || 1}
                            min={inp.min}
                            max={inp.max}
                            value={values[inp.id]}
                            onChange={(e) => handleChange(inp.id, Number(e.target.value))}
                          />
                          {inp.suffix && (
                            <span className="px-2 font-numeric text-[14px] text-ink-soft bg-surface-container py-1.5">{inp.suffix}</span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      className="flex-1 bg-primary text-white font-display text-[15px] font-semibold py-1.5 px-6 rounded-lg hover:bg-tealbright transition-all flex items-center justify-center gap-1.5 shadow-sm"
                      type="submit"
                    >
                      <Calculator size={18} />
                      Calculate
                    </button>
                    <button
                      className="bg-surface-low text-ink-soft hover:text-ink hover:bg-surface-container text-[13px] font-medium py-1.5 px-4 rounded-lg transition-colors"
                      onClick={handleReset}
                      type="button"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right: results + related */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="bg-surface-lowest rounded-xl p-6 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-surface-container pb-2">
                  <span className="text-[13px] font-medium uppercase tracking-wider text-ink-soft">Result</span>
                  <span className="text-[11px] text-primary px-1.5 py-0.5 rounded bg-surface-low font-medium">{config.category}</span>
                </div>
                {primaryResult && (
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-wider text-ink-soft mb-1">{primaryResult.label}</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-numeric text-[32px] font-semibold text-primary tracking-tight">{primaryResult.value}</span>
                    </div>
                  </div>
                )}
                {breakdown.length > 0 && (
                  <div className="flex flex-col divide-y divide-surface-container text-[12px]">
                    {breakdown.map((r, i) => (
                      <div key={i} className="flex justify-between py-1.5">
                        <span className="text-ink-soft">{r.label}</span>
                        <span className="font-numeric text-[14px] text-ink">{r.value}</span>
                      </div>
                    ))}
                  </div>
                )}
                {hasSanitized && (
                  <p className="text-[12px] text-ink-soft bg-surface-low rounded-lg px-3 py-2">
                    Some inputs need attention — values must be within their allowed ranges for a valid result.
                  </p>
                )}
              </div>

              {related.length > 0 && (
                <div className="bg-surface-lowest rounded-xl p-4 shadow-sm">
                  <div className="font-display text-[15px] font-semibold text-ink mb-1 flex items-center gap-1.5">
                    <LayoutGrid size={18} className="text-primary" />
                    Related {config.category} Tools
                  </div>
                  <ul className="flex flex-col text-[12px]">
                    {related.map((calc) => (
                      <li key={calc.slug}>
                        <Link
                          to={`/${calc.category}/${calc.slug}`}
                          className="text-link hover:text-link-dark hover:underline flex items-center justify-between py-1"
                        >
                          <span>{calc.name}</span>
                          <ChevronRight size={16} className="opacity-40" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <Suspense fallback={null}>
            <CalculatorChart results={results} />
          </Suspense>

          {config.longExplanation === "scientific-notation" && <ScientificNotationExplanation />}

          {/* Formula + FAQ */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-7 bg-surface-lowest rounded-xl p-6 shadow-sm">
              <h2 className="font-display text-[18px] font-semibold text-ink mb-1">{config.name} Formula Mechanics</h2>
              <p className="text-[14px] text-ink-soft mb-4">{config.howToUse}</p>
              <div className="bg-surface-low p-4 rounded-lg font-numeric text-[14px] text-ink text-center mb-4">
                {config.formula.expression}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px]">
                {config.formula.variables.map((v, i) => {
                  const idx = v.indexOf(":");
                  const sym = idx > -1 ? v.slice(0, idx + 1) : "";
                  const rest = idx > -1 ? v.slice(idx + 1) : v;
                  return (
                    <div key={i} className="flex gap-1.5">
                      <strong className="font-numeric text-primary">{sym}</strong>
                      <span className="text-ink-soft">{rest}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="md:col-span-5 bg-surface-lowest rounded-xl p-6 shadow-sm">
              <h2 className="font-display text-[18px] font-semibold text-ink mb-3">Frequently Asked Questions</h2>
              <div className="space-y-4 text-[12px]">
                {config.faqs.map((faq, i) => (
                  <div key={i}>
                    <h3 className="font-display text-[15px] font-semibold text-ink mb-1">{faq.question}</h3>
                    <p className="text-ink-soft">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* In-depth guide (only for calculators that have one) */}
          <GuideSections slug={config.slug} />

          {/* Category directory grid */}
          {directoryGroups.length > 0 && (
            <div className="mt-8 pt-6 border-t border-surface-container">
              <h3 className="font-display text-[18px] font-semibold text-ink mb-4">
                More {config.category} Tools on TheCalculator.us
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[12px]">
                {directoryGroups.map((g) => (
                  <div key={g.name} className="flex flex-col gap-1">
                    <span className="font-display text-[15px] font-semibold text-ink mb-1">{g.name}</span>
                    {g.items.map((c) => (
                      <Link key={c.slug} to={`/${c.categorySlug}/${c.slug}`} className="text-link hover:underline">
                        {c.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SEO content block */}
          <section className="mt-8 border-t border-surface-container pt-6">
            <h2 className="font-display text-[18px] font-semibold text-ink mb-3">About the {config.name}</h2>
            <div className="text-[12px] text-ink-soft space-y-3 leading-relaxed">
              <p>
                The <strong>{config.name}</strong> is a free online tool that helps you {config.metaDescription.toLowerCase()}.
                This calculator is part of our <Link to={`/category/${config.categorySlug}`} className="text-link hover:underline font-medium">{config.category} calculators</Link> collection,
                trusted by users in the United States, United Kingdom, Canada, and Australia.
              </p>
              <p>
                Whether you're a student, professional, or just need a quick answer, our {config.name.toLowerCase()} provides instant,
                accurate results with no sign-up required. All calculations run directly in your browser for maximum speed and privacy.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CalculatorTemplate;
