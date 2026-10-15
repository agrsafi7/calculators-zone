import { useEffect, useState, lazy, Suspense } from "react";
import { useParams, Navigate } from "react-router-dom";
import { DELETED_REDIRECTS } from "@/data/deleted-slugs";
import type { CalculatorConfig } from "@/components/CalculatorTemplate";
import CalculatorTemplate from "@/components/CalculatorTemplate";
import { scienceTemplateBySlug } from "@/data/science";
import NotFound from "./NotFound";

const ScienceCalculator = lazy(() => import("@/components/science/ScienceCalculator"));

// On-demand category data loaders. The full calculator configs (~1.8MB source)
// are NOT in the main bundle — each category's data loads only when a page in
// that category is visited. This is the single biggest mobile speed win.
const categoryLoaders: Record<string, () => Promise<CalculatorConfig[]>> = {
  finance: async () => {
    const [a, b, c] = await Promise.all([
      import("@/data/finance-calculators"),
      import("@/data/finance-calculators-extended"),
      import("@/data/expansion-calculators"),
    ]);
    return [...a.financeCalculators, ...b.financeCalculatorsExtended, ...c.expansionFinanceCalculators];
  },
  health: async () => {
    const [a, b, c] = await Promise.all([
      import("@/data/health-calculators"),
      import("@/data/health-calculators-extended"),
      import("@/data/expansion-calculators"),
    ]);
    return [...a.healthCalculators, ...b.healthCalculatorsExtended, ...c.expansionHealthCalculators];
  },
  math: async () => {
    const [a, b, c] = await Promise.all([
      import("@/data/math-calculators"),
      import("@/data/math-calculators-extended"),
      import("@/data/expansion-calculators"),
    ]);
    return [...a.mathCalculators, ...b.mathCalculatorsExtended, ...c.expansionMathCalculators];
  },
  conversions: async () => {
    const [a, b] = await Promise.all([
      import("@/data/conversion-calculators"),
      import("@/data/conversion-calculators-extended"),
    ]);
    return [...a.conversionCalculators, ...b.conversionCalculatorsExtended];
  },
  datetime: async () => {
    const [a, b, c] = await Promise.all([
      import("@/data/datetime-calculators"),
      import("@/data/datetime-calculators-extended"),
      import("@/data/datetime-calculators-extra"),
    ]);
    return [...a.datetimeCalculators, ...b.datetimeCalculatorsExtended, ...c.datetimeCalculatorsExtra];
  },
  science: async () => {
    const [a, b, c] = await Promise.all([
      import("@/data/science-calculators"),
      import("@/data/science-calculators-extended"),
      import("@/data/science-calculators-extra"),
    ]);
    return [...a.scienceCalculators, ...b.scienceCalculatorsExtended, ...c.scienceCalculatorsExtra];
  },
  lifestyle: async () => {
    const [a, b, c] = await Promise.all([
      import("@/data/lifestyle-calculators"),
      import("@/data/lifestyle-calculators-extended"),
      import("@/data/lifestyle-calculators-extra"),
    ]);
    return [...a.lifestyleCalculators, ...b.lifestyleCalculatorsExtended, ...c.lifestyleCalculatorsExtra];
  },
  other: async () => {
    const [a, b, c, d, e] = await Promise.all([
      import("@/data/other-calculators"),
      import("@/data/other-calculators-extended"),
      import("@/data/other-calculators-extra"),
      import("@/data/other-calculators-batch2"),
      import("@/data/other-calculators-batch3"),
    ]);
    return [...a.otherCalculators, ...b.otherCalculatorsExtended, ...c.otherCalculatorsExtra, ...d.otherCalculatorsBatch2, ...e.otherCalculatorsBatch3];
  },
};

const LoadingSkeleton = () => (
  <div className="container mx-auto px-4 py-8 max-w-3xl animate-pulse">
    <div className="h-8 bg-secondary rounded-lg w-2/3 mb-4" />
    <div className="h-4 bg-secondary rounded w-full mb-2" />
    <div className="h-4 bg-secondary rounded w-5/6 mb-8" />
    <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
      <div className="h-10 bg-secondary rounded-lg" />
      <div className="h-10 bg-secondary rounded-lg" />
      <div className="h-12 bg-primary/20 rounded-xl" />
    </div>
  </div>
);

const GenericCalculatorPage = () => {
  const { categorySlug, slug } = useParams<{ categorySlug: string; slug: string }>();
  // undefined = loading, null = not found
  const [config, setConfig] = useState<CalculatorConfig | null | undefined>(undefined);

  useEffect(() => {
    if (!categorySlug || !slug || DELETED_REDIRECTS[slug]) return;
    let alive = true;
    setConfig(undefined);
    const loader = categoryLoaders[categorySlug];
    if (!loader) {
      setConfig(null);
      return;
    }
    loader()
      .then((configs) => {
        if (!alive) return;
        setConfig(configs.find((c) => c.slug === slug && c.categorySlug === categorySlug) ?? null);
      })
      .catch(() => {
        if (alive) setConfig(null);
      });
    return () => {
      alive = false;
    };
  }, [categorySlug, slug]);

  // Pruned calculators: client-side redirect to their category page.
  // (vercel.json handles the 301 at the edge for crawlers.)
  if (slug && DELETED_REDIRECTS[slug]) {
    return <Navigate to={`/category/${DELETED_REDIRECTS[slug]}`} replace />;
  }

  // Science Calculator Template override — richer UX for select science calculators.
  if (categorySlug === "science" && slug && scienceTemplateBySlug[slug]) {
    return (
      <Suspense fallback={<LoadingSkeleton />}>
        <ScienceCalculator key={slug} config={scienceTemplateBySlug[slug]} />
      </Suspense>
    );
  }

  if (config === undefined) return <LoadingSkeleton />;
  if (config === null) return <NotFound />;

  return <CalculatorTemplate key={slug} config={config} />;
};

export default GenericCalculatorPage;
