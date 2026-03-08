import { useParams } from "react-router-dom";
import { healthCalculators } from "@/data/health-calculators";
import { mathCalculators } from "@/data/math-calculators";
import { mathCalculatorsExtended } from "@/data/math-calculators-extended";
import { conversionCalculators } from "@/data/conversion-calculators";
import { conversionCalculatorsExtended } from "@/data/conversion-calculators-extended";
import { datetimeCalculators } from "@/data/datetime-calculators";
import { datetimeCalculatorsExtended } from "@/data/datetime-calculators-extended";
import { scienceCalculators } from "@/data/science-calculators";
import { scienceCalculatorsExtended } from "@/data/science-calculators-extended";
import { scienceCalculatorsExtra } from "@/data/science-calculators-extra";
import { lifestyleCalculators } from "@/data/lifestyle-calculators";
import { lifestyleCalculatorsExtended } from "@/data/lifestyle-calculators-extended";
import { financeCalculators } from "@/data/finance-calculators";
import { financeCalculatorsExtended } from "@/data/finance-calculators-extended";
import { healthCalculatorsExtended } from "@/data/health-calculators-extended";
import CalculatorTemplate from "@/components/CalculatorTemplate";
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
  ...scienceCalculators,
  ...scienceCalculatorsExtended,
  ...lifestyleCalculators,
  ...lifestyleCalculatorsExtended,
];

const GenericCalculatorPage = () => {
  const { categorySlug, slug } = useParams<{ categorySlug: string; slug: string }>();
  const config = allConfigs.find(
    (c) => c.slug === slug && c.categorySlug === categorySlug
  );

  if (!config) return <NotFound />;

  return <CalculatorTemplate key={slug} config={config} />;
};

export default GenericCalculatorPage;
