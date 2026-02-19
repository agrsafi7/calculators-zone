import { useParams } from "react-router-dom";
import { financeCalculators } from "@/data/finance-calculators";
import CalculatorTemplate from "@/components/CalculatorTemplate";
import NotFound from "./NotFound";

const FinanceCalculatorPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const config = financeCalculators.find((c) => c.slug === slug);

  if (!config) return <NotFound />;

  return <CalculatorTemplate key={slug} config={config} />;
};

export default FinanceCalculatorPage;
