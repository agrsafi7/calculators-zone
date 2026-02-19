import { useParams } from "react-router-dom";
import { healthCalculators } from "@/data/health-calculators";
import { mathCalculators } from "@/data/math-calculators";
import { conversionCalculators } from "@/data/conversion-calculators";
import { datetimeCalculators } from "@/data/datetime-calculators";
import { scienceCalculators } from "@/data/science-calculators";
import { lifestyleCalculators } from "@/data/lifestyle-calculators";
import { financeCalculators } from "@/data/finance-calculators";
import CalculatorTemplate from "@/components/CalculatorTemplate";
import NotFound from "./NotFound";

const allConfigs = [
  ...financeCalculators,
  ...healthCalculators,
  ...mathCalculators,
  ...conversionCalculators,
  ...datetimeCalculators,
  ...scienceCalculators,
  ...lifestyleCalculators,
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
