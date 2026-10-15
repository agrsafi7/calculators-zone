import { useParams, Navigate } from "react-router-dom";
import { DELETED_REDIRECTS } from "@/data/deleted-slugs";
import { healthCalculators } from "@/data/health-calculators";
import { mathCalculators } from "@/data/math-calculators";
import { mathCalculatorsExtended } from "@/data/math-calculators-extended";
import { conversionCalculators } from "@/data/conversion-calculators";
import { conversionCalculatorsExtended } from "@/data/conversion-calculators-extended";
import { datetimeCalculators } from "@/data/datetime-calculators";
import { datetimeCalculatorsExtended } from "@/data/datetime-calculators-extended";
import { datetimeCalculatorsExtra } from "@/data/datetime-calculators-extra";
import { scienceCalculators } from "@/data/science-calculators";
import { scienceCalculatorsExtended } from "@/data/science-calculators-extended";
import { scienceCalculatorsExtra } from "@/data/science-calculators-extra";
import { lifestyleCalculators } from "@/data/lifestyle-calculators";
import { lifestyleCalculatorsExtended } from "@/data/lifestyle-calculators-extended";
import { lifestyleCalculatorsExtra } from "@/data/lifestyle-calculators-extra";
import { financeCalculators } from "@/data/finance-calculators";
import { financeCalculatorsExtended } from "@/data/finance-calculators-extended";
import { healthCalculatorsExtended } from "@/data/health-calculators-extended";
import { otherCalculators } from "@/data/other-calculators";
import { otherCalculatorsExtended } from "@/data/other-calculators-extended";
import { otherCalculatorsExtra } from "@/data/other-calculators-extra";
import { otherCalculatorsBatch2 } from "@/data/other-calculators-batch2";
import { otherCalculatorsBatch3 } from "@/data/other-calculators-batch3";
import { expansionCalculators } from "@/data/expansion-calculators";
import CalculatorTemplate from "@/components/CalculatorTemplate";
import ScienceCalculator from "@/components/science/ScienceCalculator";
import { scienceTemplateBySlug } from "@/data/science";
import NotFound from "./NotFound";

const allConfigs = [
  ...financeCalculators,
  ...financeCalculatorsExtended,
  ...healthCalculators,
  ...healthCalculatorsExtended,
  ...mathCalculators,
  ...mathCalculatorsExtended,
  ...conversionCalculators,
  ...conversionCalculatorsExtended,
  ...datetimeCalculators,
  ...datetimeCalculatorsExtended,
  ...datetimeCalculatorsExtra,
  ...scienceCalculators,
  ...scienceCalculatorsExtended,
  ...scienceCalculatorsExtra,
  ...lifestyleCalculators,
  ...lifestyleCalculatorsExtended,
  ...lifestyleCalculatorsExtra,
  ...otherCalculators,
  ...otherCalculatorsExtended,
  ...otherCalculatorsExtra,
  ...otherCalculatorsBatch2,
  ...otherCalculatorsBatch3,
  ...expansionCalculators,
];

const GenericCalculatorPage = () => {
  const { categorySlug, slug } = useParams<{ categorySlug: string; slug: string }>();

  // Pruned calculators: client-side redirect to their category page.
  // (vercel.json handles the 301 at the edge for crawlers.)
  if (slug && DELETED_REDIRECTS[slug]) {
    return <Navigate to={`/category/${DELETED_REDIRECTS[slug]}`} replace />;
  }

  // Science Calculator Template override — richer UX for select science calculators.
  if (categorySlug === "science" && slug && scienceTemplateBySlug[slug]) {
    return <ScienceCalculator key={slug} config={scienceTemplateBySlug[slug]} />;
  }

  const config = allConfigs.find(
    (c) => c.slug === slug && c.categorySlug === categorySlug
  );

  if (!config) return <NotFound />;

  return <CalculatorTemplate key={slug} config={config} />;
};

export default GenericCalculatorPage;
