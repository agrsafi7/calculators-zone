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
  { name: "GPA Calculator", slug: "gpa-calculator", icon: "hash", category: "math" },
  { name: "Fractions Calculator", slug: "fractions-calculator", icon: "hash", category: "math" },
];

type CalcMode = "whatPercent" | "percentOf" | "change";

const PercentageCalculator = () => {
  const [mode, setMode] = useState<CalcMode>("whatPercent");
  const [val1, setVal1] = useState(25);
  const [val2, setVal2] = useState(200);

  useEffect(() => {
    addRecentCalculator({
      slug: "percentage-calculator",
      categorySlug: "math",
      name: "Percentage Calculator",
      category: "Math",
    });
  }, []);

  const computed = useMemo(() => {
    if (mode === "whatPercent") {
      const pct = (val1 / val2) * 100;
      return {
        center: `${pct.toFixed(2)}%`,
        descriptor: `${val1} of ${val2}`,
        sentence: `${val1} is ${pct.toFixed(2)}% of ${val2}`,
        partA: val1,
        partB: Math.max(val2 - val1, 0),
      };
    }
    if (mode === "percentOf") {
      const result = (val1 / 100) * val2;
      return {
        center: result.toFixed(2),
        descriptor: `${val1}% of ${val2}`,
        sentence: `${val1}% of ${val2} = ${result.toFixed(2)}`,
        partA: result,
        partB: Math.max(val2 - result, 0),
      };
    }
    const change = ((val2 - val1) / val1) * 100;
    return {
      center: `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`,
      descriptor: `${val1} → ${val2}`,
      sentence: `Change from ${val1} to ${val2} = ${change >= 0 ? "+" : ""}${change.toFixed(2)}%`,
      partA: Math.abs(val2 - val1),
      partB: Math.min(val1, val2),
    };
  }, [mode, val1, val2]);

  const handleReset = () => {
    setVal1(25);
    setVal2(200);
  };

  const modeLabels: Record<CalcMode, { label: string; input1: string; input2: string }> = {
    whatPercent: { label: "What % is X of Y?", input1: "Value (X)", input2: "Total (Y)" },
    percentOf: { label: "X% of Y", input1: "Percentage (X)", input2: "Value (Y)" },
    change: { label: "% Change", input1: "From Value", input2: "To Value" },
  };
  const current = modeLabels[mode];

  // Donut: part vs remainder
  const donutData = [
    { name: mode === "change" ? "Difference" : "Part", value: computed.partA, color: CHART_COLORS.blue },
    { name: mode === "change" ? "Smaller" : "Remainder", value: computed.partB, color: CHART_COLORS.lightBlue },
  ];

  const barData = [
    { name: "X", value: val1, color: CHART_COLORS.blue },
    { name: "Y", value: val2, color: CHART_COLORS.navy },
  ];

  return (
    <>
      <SEO
        title="Percentage Calculator"
        description="Free percentage calculator. Calculate percentages, percentage of a number, and percentage change. Quick and accurate."
        canonical="/math/percentage-calculator"
      />
      <CalculatorLayout
        title="Percentage Calculator"
        description="Quickly calculate percentages, percentage of a number, and percentage change between two values."
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Math", url: "/category/math" },
          { name: "Percentage Calculator" },
        ]}
        belowCard={
          <>
            <div className="my-6">
              <AdPlaceholder size="responsive" />
            </div>

            <section className="mb-8 bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                <span className="text-primary">💡</span> How to use this calculator
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Choose a calculation mode: find what percentage one number is of another,
                calculate a percentage of a value, or find the percentage change between two numbers.
              </p>
              <h3 className="font-semibold text-base mb-2">Common Formulas</h3>
              <div className="formula-block mb-2">
                <div className="space-y-2 text-sm md:text-lg">
                  <p>Percentage = (Part / Whole) × 100</p>
                  <p>Part = (Percentage / 100) × Whole</p>
                  <p>% Change = ((New − Old) / Old) × 100</p>
                </div>
              </div>
            </section>

            <GuideSections slug="percentage-calculator" />

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
              <Accordion
                type="single"
                collapsible
                className="border border-border rounded-2xl overflow-hidden bg-card"
              >
                <AccordionItem value="q1" className="border-b border-border px-5">
                  <AccordionTrigger className="text-sm font-medium">
                    How do I calculate a discount?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Use the "X% of Y" mode. Enter the discount percentage and the original price.
                    For example, 20% of $50 = $10 discount, so the final price is $40.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q2" className="px-5">
                  <AccordionTrigger className="text-sm font-medium">
                    What is percentage change used for?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Percentage change measures how much a value has increased or decreased relative
                    to its original value. Common in finance, science, and price comparisons.
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
              Calculation Mode
            </p>
            <ToggleSwitch<CalcMode>
              fullWidth
              value={mode}
              onChange={setMode}
              options={[
                { value: "whatPercent", label: "% of" },
                { value: "percentOf", label: "X% of Y" },
                { value: "change", label: "Change" },
              ]}
            />
          </div>

          <InputField
            label={current.input1}
            value={val1}
            onChange={(v) => setVal1(Number(v))}
          />
          <InputField
            label={current.input2}
            value={val2}
            onChange={(v) => setVal2(Number(v))}
          />

          <div className="pt-2 flex gap-2">
            <CTAButton>Calculate</CTAButton>
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
              Result
            </p>
            <span className="text-[10px] text-muted-foreground bg-card border border-border rounded-full px-3 py-1">
              {current.label}
            </span>
          </div>

          <h2 className="text-base font-bold text-foreground">{computed.descriptor}</h2>

          {/* Donut */}
          <div className="relative">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  dataKey="value"
                  strokeWidth={3}
                  stroke="hsl(var(--card))"
                >
                  {donutData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
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
              <p className="text-2xl md:text-3xl font-black text-foreground">{computed.center}</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                Result
              </p>
            </div>
          </div>

          <div className="space-y-1">
            {donutData.map((d) => (
              <LegendRow
                key={d.name}
                color={d.color}
                label={d.name}
                value={d.value.toFixed(2)}
              />
            ))}
          </div>

          {/* Bar comparison */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              X vs Y
            </p>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={barData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <RechartsTooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {barData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="border-t border-border pt-2">
            <ResultStatRow label="X" value={String(val1)} />
            <ResultStatRow label="Y" value={String(val2)} />
            <ResultStatRow label="Result" value={computed.center} emphasize />
          </div>
        </ResultsPanel>
      </CalculatorLayout>
    </>
  );
};

export default PercentageCalculator;
