import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import AdPlaceholder from "@/components/AdPlaceholder";
import RecentlyUsed from "@/components/RecentlyUsed";
import GuideSections from "@/components/GuideSections";
import SEO from "@/components/SEO";
import { addRecentCalculator } from "@/lib/calculator-utils";
import { getCategoryIcon } from "@/data/calculators";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CalculatorLayout,
  InputPanel,
  ResultsPanel,
  InputField,
  InputRow,
  ToggleSwitch,
  CTAButton,
  LegendRow,
  ResultStatRow,
  CHART_COLORS,
} from "@/components/calculator-ui";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

const relatedCalculators = [
  { name: "Calorie Calculator", slug: "calorie-calculator", icon: "heart", category: "health" },
  { name: "Pregnancy Due Date", slug: "pregnancy-calculator", icon: "heart", category: "health" },
  { name: "Body Fat Calculator", slug: "body-fat-calculator", icon: "heart", category: "health" },
  { name: "Ideal Weight", slug: "ideal-weight-calculator", icon: "heart", category: "health" },
];

// BMI category colors mapped to spec palette
const bmiRanges = [
  { name: "Underweight", min: 10, max: 18.5, color: CHART_COLORS.lightBlue },
  { name: "Normal", min: 18.5, max: 25, color: CHART_COLORS.green },
  { name: "Overweight", min: 25, max: 30, color: CHART_COLORS.yellow },
  { name: "Obese", min: 30, max: 40, color: CHART_COLORS.pink },
];

const getBmiCategory = (bmi: number) => {
  for (const r of bmiRanges) {
    if (bmi >= r.min && bmi < r.max) return { label: r.name, color: r.color };
  }
  return { label: "Obese", color: CHART_COLORS.pink };
};

type Unit = "imperial" | "metric";

const BmiCalculator = () => {
  const [unit, setUnit] = useState<Unit>("imperial");
  const [weight, setWeight] = useState(154);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(9);
  const [heightCm, setHeightCm] = useState(175);
  const [weightKg, setWeightKg] = useState(70);

  useEffect(() => {
    addRecentCalculator({
      slug: "bmi-calculator",
      categorySlug: "health",
      name: "BMI Calculator",
      category: "Health",
    });
  }, []);

  // Calculation logic — UNCHANGED
  const result = useMemo(() => {
    let bmi: number;
    if (unit === "imperial") {
      const totalInches = heightFt * 12 + heightIn;
      bmi = (weight / (totalInches * totalInches)) * 703;
    } else {
      const heightM = heightCm / 100;
      bmi = weightKg / (heightM * heightM);
    }
    return Math.round(bmi * 10) / 10;
  }, [unit, weight, heightFt, heightIn, heightCm, weightKg]);

  const category = getBmiCategory(result);

  const handleReset = () => {
    setWeight(154);
    setHeightFt(5);
    setHeightIn(9);
    setHeightCm(175);
    setWeightKg(70);
  };

  // Healthy weight range
  const healthyRange = useMemo(() => {
    let heightM: number;
    if (unit === "imperial") {
      const totalInches = heightFt * 12 + heightIn;
      heightM = totalInches * 0.0254;
    } else {
      heightM = heightCm / 100;
    }
    const minWeight = 18.5 * heightM * heightM;
    const maxWeight = 24.9 * heightM * heightM;
    if (unit === "imperial") {
      return {
        min: Math.round(minWeight * 2.205),
        max: Math.round(maxWeight * 2.205),
        unit: "lbs",
      };
    }
    return { min: Math.round(minWeight), max: Math.round(maxWeight), unit: "kg" };
  }, [unit, heightFt, heightIn, heightCm]);

  // Donut: how user's BMI fills the 0-40 scale, by segment
  const donutData = bmiRanges.map((r) => ({
    name: r.name,
    value: r.max - r.min,
    color: r.color,
  }));

  // Bar: BMI category widths, your bar emphasized
  const barData = bmiRanges.map((r) => ({
    name: r.name,
    range: r.max - r.min,
    color: r.color,
    isYou: result >= r.min && result < r.max,
  }));

  return (
    <>
      <SEO
        title="BMI Calculator"
        description="Free BMI calculator. Calculate your Body Mass Index with imperial or metric units. Understand healthy weight ranges."
        canonical="/health/bmi-calculator"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Health", url: "/category/health" },
          { name: "BMI Calculator", url: "/health/bmi-calculator" },
        ]}
        faqs={[
          {
            question: "Is BMI accurate for everyone?",
            answer: "BMI doesn't account for muscle mass or body composition.",
          },
          {
            question: "What is a healthy BMI range?",
            answer: "A BMI between 18.5 and 24.9 is considered normal weight.",
          },
        ]}
      />
      <CalculatorLayout
        title="BMI Calculator"
        description="Calculate your Body Mass Index to understand if your weight is healthy for your height."
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Health", url: "/category/health" },
          { name: "BMI Calculator" },
        ]}
        belowCard={
          <>
            <div className="my-6">
              <AdPlaceholder size="responsive" />
            </div>

            <section className="mb-6 bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h3 className="font-semibold text-base mb-4">BMI Reference Table</h3>
              <div className="space-y-2">
                {bmiRanges.map((r) => {
                  const isActive = result >= r.min && result < r.max;
                  return (
                    <div
                      key={r.name}
                      className={`flex justify-between items-center p-3 rounded-lg transition-colors ${
                        isActive ? "ring-2" : "bg-secondary"
                      }`}
                      style={
                        isActive
                          ? { background: `${r.color}20`, boxShadow: `0 0 0 2px ${r.color}` }
                          : {}
                      }
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ background: r.color }}
                        />
                        <span
                          className={`text-sm ${
                            isActive ? "font-bold text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {r.name}
                        </span>
                        {isActive && (
                          <span className="text-[10px] bg-foreground text-background px-1.5 py-0.5 rounded font-bold">
                            YOU
                          </span>
                        )}
                      </div>
                      <span className="font-medium text-sm text-foreground">
                        {r.min} – {r.max}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="mb-6 bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                <span className="text-primary">💡</span> How to use this calculator
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Enter your weight and height in either imperial or metric units. The calculator
                instantly computes your BMI and categorizes it according to WHO standards.
              </p>
              <h3 className="font-semibold text-base mb-2">Understanding the Formula</h3>
              <div className="formula-block mb-2">
                <p className="text-lg mb-3">BMI = weight (kg) / height² (m²)</p>
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs opacity-70">
                  <span>Imperial: BMI = (weight × 703) / height²</span>
                </div>
              </div>
            </section>

            <GuideSections slug="bmi-calculator" />

            <section className="mb-6">
              <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
              <Accordion
                type="single"
                collapsible
                className="border border-border rounded-2xl overflow-hidden bg-card"
              >
                <AccordionItem value="q1" className="border-b border-border px-5">
                  <AccordionTrigger className="text-sm font-medium">
                    Is BMI accurate for everyone?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    BMI is a useful screening tool but doesn't account for muscle mass, bone
                    density, or body composition. Athletes may have a high BMI despite being
                    healthy.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q2" className="px-5">
                  <AccordionTrigger className="text-sm font-medium">
                    What is a healthy BMI range?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    A BMI between 18.5 and 24.9 is considered normal weight. Optimal health
                    depends on many factors beyond BMI.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <AdPlaceholder size="leaderboard" />
          </>
        }
        sidebar={
          <>
            <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
              <h3 className="font-bold text-sm mb-4">Related Calculators</h3>
              <ul className="space-y-1">
                {relatedCalculators.map((calc) => {
                  const Icon = getCategoryIcon(calc.icon);
                  return (
                    <li key={calc.slug}>
                      <Link
                        to={`/${calc.category}/${calc.slug}`}
                        className="flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-secondary transition-colors text-sm"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
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
          </>
        }
      >
        {/* LEFT: Inputs */}
        <InputPanel>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Units
            </p>
            <ToggleSwitch<Unit>
              fullWidth
              value={unit}
              onChange={setUnit}
              options={[
                { value: "imperial", label: "Imperial (lb/ft)" },
                { value: "metric", label: "Metric (kg/cm)" },
              ]}
            />
          </div>

          {unit === "imperial" ? (
            <>
              <InputField
                label="Weight (lbs)"
                value={weight}
                onChange={(v) => setWeight(Number(v))}
              />
              <InputRow>
                <InputField
                  label="Height (ft)"
                  value={heightFt}
                  onChange={(v) => setHeightFt(Number(v))}
                />
                <InputField
                  label="Height (in)"
                  value={heightIn}
                  onChange={(v) => setHeightIn(Number(v))}
                />
              </InputRow>
            </>
          ) : (
            <>
              <InputField
                label="Weight (kg)"
                value={weightKg}
                onChange={(v) => setWeightKg(Number(v))}
              />
              <InputField
                label="Height (cm)"
                value={heightCm}
                onChange={(v) => setHeightCm(Number(v))}
              />
            </>
          )}

          <div className="pt-2 flex gap-2">
            <CTAButton>Calculate BMI</CTAButton>
            <button
              onClick={handleReset}
              className="px-4 py-3 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              Reset
            </button>
          </div>
        </InputPanel>

        {/* RIGHT: Results */}
        <ResultsPanel>
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Your BMI
            </p>
            <span
              className="text-[10px] font-bold uppercase tracking-wider rounded-full px-3 py-1"
              style={{ background: `${category.color}25`, color: category.color }}
            >
              {category.label}
            </span>
          </div>

          <h2 className="text-base font-bold text-foreground">
            Healthy weight: {healthyRange.min}–{healthyRange.max} {healthyRange.unit}
          </h2>

          {/* Donut with BMI in center */}
          <div className="relative">
            <ResponsiveContainer width="100%" height={210}>
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={62}
                  outerRadius={88}
                  dataKey="value"
                  strokeWidth={3}
                  stroke="hsl(var(--card))"
                  startAngle={180}
                  endAngle={-180}
                >
                  {donutData.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={entry.color}
                      fillOpacity={entry.name === category.label ? 1 : 0.35}
                    />
                  ))}
                </Pie>
                <RechartsTooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-3xl md:text-4xl font-black" style={{ color: category.color }}>
                {result}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                BMI Score
              </p>
            </div>
          </div>

          <div className="space-y-1">
            {donutData.map((d) => (
              <LegendRow
                key={d.name}
                color={d.color}
                label={d.name}
                value={`${bmiRanges.find((r) => r.name === d.name)?.min}–${
                  bmiRanges.find((r) => r.name === d.name)?.max
                }`}
              />
            ))}
          </div>

          {/* Bar chart of ranges */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Where You Stand
            </p>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart
                data={barData}
                layout="vertical"
                margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  width={75}
                />
                <RechartsTooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="range" radius={[0, 4, 4, 0]}>
                  {barData.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={entry.color}
                      fillOpacity={entry.isYou ? 1 : 0.3}
                      stroke={entry.isYou ? entry.color : "none"}
                      strokeWidth={entry.isYou ? 2 : 0}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="border-t border-border pt-2">
            <ResultStatRow label="Category" value={category.label} />
            <ResultStatRow
              label="Healthy range"
              value={`${healthyRange.min}–${healthyRange.max} ${healthyRange.unit}`}
            />
            <ResultStatRow label="Your BMI" value={String(result)} emphasize />
          </div>
        </ResultsPanel>
      </CalculatorLayout>
    </>
  );
};

export default BmiCalculator;
