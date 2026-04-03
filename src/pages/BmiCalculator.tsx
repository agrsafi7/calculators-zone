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
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, ResponsiveContainer, Cell,
} from "recharts";

const relatedCalculators = [
  { name: "Calorie Calculator", slug: "calorie-calculator", icon: "heart", category: "health" },
  { name: "Pregnancy Due Date", slug: "pregnancy-calculator", icon: "heart", category: "health" },
  { name: "Body Fat Calculator", slug: "body-fat-calculator", icon: "heart", category: "health" },
  { name: "Ideal Weight", slug: "ideal-weight-calculator", icon: "heart", category: "health" },
];

const getBmiCategory = (bmi: number) => {
  if (bmi < 18.5) return { label: "Underweight", color: "hsl(199, 89%, 48%)" };
  if (bmi < 25) return { label: "Normal weight", color: "hsl(142, 71%, 45%)" };
  if (bmi < 30) return { label: "Overweight", color: "hsl(25, 95%, 53%)" };
  return { label: "Obese", color: "hsl(0, 84%, 60%)" };
};

const bmiRanges = [
  { name: "Underweight", min: 10, max: 18.5, color: "hsl(199, 89%, 48%)" },
  { name: "Normal", min: 18.5, max: 25, color: "hsl(142, 71%, 45%)" },
  { name: "Overweight", min: 25, max: 30, color: "hsl(25, 95%, 53%)" },
  { name: "Obese", min: 30, max: 40, color: "hsl(0, 84%, 60%)" },
];

const BmiCalculator = () => {
  const [unit, setUnit] = useState<"imperial" | "metric">("imperial");
  const [weight, setWeight] = useState(154);
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(9);
  const [heightCm, setHeightCm] = useState(175);
  const [weightKg, setWeightKg] = useState(70);
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    addRecentCalculator({ slug: "bmi-calculator", categorySlug: "health", name: "BMI Calculator", category: "Health" });
  }, []);

  const calculate = () => {
    let bmi: number;
    if (unit === "imperial") {
      const totalInches = heightFt * 12 + heightIn;
      bmi = (weight / (totalInches * totalInches)) * 703;
    } else {
      const heightM = heightCm / 100;
      bmi = weightKg / (heightM * heightM);
    }
    setResult(Math.round(bmi * 10) / 10);
  };

  const handleReset = () => {
    setWeight(154);
    setHeightFt(5);
    setHeightIn(9);
    setHeightCm(175);
    setWeightKg(70);
    setResult(null);
  };

  useEffect(() => { calculate(); }, [unit, weight, heightFt, heightIn, heightCm, weightKg]);

  const category = result ? getBmiCategory(result) : null;

  // BMI gauge
  const gaugePercent = result ? Math.min(Math.max(((result - 10) / 30) * 100, 0), 100) : 0;

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
      return { min: Math.round(minWeight * 2.205), max: Math.round(maxWeight * 2.205), unit: "lbs" };
    }
    return { min: Math.round(minWeight), max: Math.round(maxWeight), unit: "kg" };
  }, [unit, heightFt, heightIn, heightCm]);

  // Bar chart data for BMI range visualization
  const barData = bmiRanges.map((range) => ({
    name: range.name,
    range: range.max - range.min,
    color: range.color,
    isYou: result ? result >= range.min && result < range.max : false,
  }));

  return (
    <div>
      <SEO title="BMI Calculator" description="Free BMI calculator. Calculate your Body Mass Index with imperial or metric units. Understand healthy weight ranges." canonical="/health/bmi-calculator" breadcrumbs={[{name:"Home",url:"/"},{name:"Health",url:"/category/health"},{name:"BMI Calculator",url:"/health/bmi-calculator"}]} faqs={[{question:"Is BMI accurate for everyone?",answer:"BMI doesn't account for muscle mass or body composition."},{question:"What is a healthy BMI range?",answer:"A BMI between 18.5 and 24.9 is considered normal weight."}]} />
      <nav className="container mx-auto px-4 py-4 text-sm text-muted-foreground flex items-center gap-1.5">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/category/health" className="hover:text-foreground">Health</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">BMI Calculator</span>
      </nav>

      <div className="container mx-auto px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl font-black mb-3">BMI Calculator</h1>
            <p className="text-muted-foreground text-sm max-w-xl mb-6">
              Calculate your Body Mass Index to understand if your weight is healthy for your height.
            </p>

            <AdPlaceholder size="leaderboard" />

            <div className="bg-card rounded-xl border border-border p-5 md:p-8 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                    <span className="text-primary">≡</span> Your Details
                  </h3>

                  <div className="flex rounded-lg border border-border overflow-hidden mb-4">
                    <button onClick={() => setUnit("imperial")} className={`flex-1 py-2 text-xs font-medium transition-colors ${unit === "imperial" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"}`}>
                      Imperial (lb/ft)
                    </button>
                    <button onClick={() => setUnit("metric")} className={`flex-1 py-2 text-xs font-medium transition-colors ${unit === "metric" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"}`}>
                      Metric (kg/cm)
                    </button>
                  </div>

                  <div className="space-y-4">
                    {unit === "imperial" ? (
                      <>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Weight (lbs)</label>
                          <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full px-3 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                        </div>
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Height (ft)</label>
                            <input type="number" value={heightFt} onChange={(e) => setHeightFt(Number(e.target.value))} className="w-full px-3 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                          </div>
                          <div className="flex-1">
                            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Height (in)</label>
                            <input type="number" value={heightIn} onChange={(e) => setHeightIn(Number(e.target.value))} className="w-full px-3 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Weight (kg)</label>
                          <input type="number" value={weightKg} onChange={(e) => setWeightKg(Number(e.target.value))} className="w-full px-3 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Height (cm)</label>
                          <input type="number" value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} className="w-full px-3 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex gap-2 mt-6">
                    <button onClick={calculate} className="flex-1 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
                      Calculate BMI
                    </button>
                    <button onClick={handleReset} className="p-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors">
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Result */}
                <div className="text-center flex flex-col items-center justify-center">
                  {result !== null && category && (
                    <>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Your BMI</p>
                      <p className="text-5xl font-black mb-1" style={{ color: category.color }}>{result}</p>
                      <p className="text-sm font-semibold mb-4" style={{ color: category.color }}>{category.label}</p>

                      {/* Gauge bar */}
                      <div className="w-full max-w-xs">
                        <div className="h-4 rounded-full overflow-hidden relative flex">
                          <div className="flex-1 bg-[hsl(199,89%,48%)]" />
                          <div className="flex-1 bg-[hsl(142,71%,45%)]" />
                          <div className="flex-1 bg-[hsl(25,95%,53%)]" />
                          <div className="flex-1 bg-[hsl(0,84%,60%)]" />
                          {/* Indicator */}
                          <div
                            className="absolute top-0 h-full w-1 bg-foreground rounded shadow-lg transition-all duration-500"
                            style={{ left: `${gaugePercent}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                          <span>Under</span>
                          <span>Normal</span>
                          <span>Over</span>
                          <span>Obese</span>
                        </div>
                      </div>

                      {/* Healthy weight range */}
                      <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20 w-full max-w-xs">
                        <p className="text-xs text-muted-foreground">Healthy weight for your height</p>
                        <p className="text-lg font-bold text-primary">{healthyRange.min} – {healthyRange.max} {healthyRange.unit}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* BMI Range Chart */}
            {result !== null && (
              <div className="bg-card rounded-xl border border-border p-6 mt-4">
                <h3 className="font-semibold text-sm mb-4">BMI Categories — Where You Stand</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={barData} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} width={70} />
                    <RechartsTooltip
                      contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }}
                    />
                    <Bar dataKey="range" name="BMI Range" radius={[0, 4, 4, 0]}>
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
                {result && (
                  <p className="text-center text-xs text-muted-foreground mt-2">
                    Your BMI of <strong className="text-foreground">{result}</strong> places you in the <strong style={{ color: category?.color }}>{category?.label}</strong> category
                  </p>
                )}
              </div>
            )}

            {/* BMI Reference Table */}
            {result !== null && (
              <div className="bg-card rounded-xl border border-border p-6 mt-4">
                <h3 className="font-semibold text-sm mb-4">BMI Reference Table</h3>
                <div className="space-y-2">
                  {bmiRanges.map((range) => {
                    const isActive = result >= range.min && result < range.max;
                    return (
                      <div
                        key={range.name}
                        className={`flex justify-between items-center p-3 rounded-lg transition-colors ${isActive ? "ring-2" : "bg-secondary"}`}
                        style={isActive ? { background: `${range.color}15`, ringColor: range.color } : {}}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full" style={{ background: range.color }} />
                          <span className={`text-sm ${isActive ? "font-bold" : "text-muted-foreground"}`}>{range.name}</span>
                          {isActive && <span className="text-[10px] bg-foreground text-background px-1.5 py-0.5 rounded font-bold">YOU</span>}
                        </div>
                        <span className="font-medium text-sm">{range.min} – {range.max}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="my-8">
              <AdPlaceholder size="responsive" />
            </div>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                <span className="text-primary">💡</span> How to use this calculator
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Simply enter your weight and height in either imperial or metric units. The calculator instantly computes your BMI and categorizes it according to WHO standards.
              </p>
              <h3 className="font-semibold text-base mb-2">Understanding the Formula</h3>
              <p className="text-sm text-muted-foreground mb-3">The BMI formula is:</p>
              <div className="formula-block mb-2">
                <p className="text-lg mb-3">BMI = weight (kg) / height² (m²)</p>
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs opacity-70">
                  <span>Imperial: BMI = (weight × 703) / height²</span>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="border border-border rounded-xl overflow-hidden">
                <AccordionItem value="q1" className="border-b border-border px-5">
                  <AccordionTrigger className="text-sm font-medium">Is BMI accurate for everyone?</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">BMI is a useful screening tool but doesn't account for muscle mass, bone density, or body composition. Athletes may have a high BMI despite being healthy.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="q2" className="px-5">
                  <AccordionTrigger className="text-sm font-medium">What is a healthy BMI range?</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">A BMI between 18.5 and 24.9 is considered normal weight. However, optimal health depends on many factors beyond BMI.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <AdPlaceholder size="leaderboard" />
          </div>

          <aside className="hidden lg:block w-[300px] shrink-0 space-y-6">
            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                <span className="text-primary">≡</span> Related Calculators
              </h3>
              <ul className="space-y-1">
                {relatedCalculators.map((calc) => {
                  const Icon = getCategoryIcon(calc.icon);
                  return (
                    <li key={calc.slug}>
                      <Link to={`/${calc.category}/${calc.slug}`} className="flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-secondary transition-colors text-sm">
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
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BmiCalculator;
