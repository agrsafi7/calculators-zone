import { useState, useEffect } from "react";
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

const relatedCalculators = [
  { name: "GPA Calculator", slug: "gpa-calculator", icon: "hash", category: "math" },
  { name: "Fractions Calculator", slug: "fractions-calculator", icon: "hash", category: "math" },
];

type CalcMode = "whatPercent" | "percentOf" | "change";

const PercentageCalculator = () => {
  const [mode, setMode] = useState<CalcMode>("whatPercent");
  const [val1, setVal1] = useState(25);
  const [val2, setVal2] = useState(200);
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    addRecentCalculator({ slug: "percentage-calculator", categorySlug: "math", name: "Percentage Calculator", category: "Math" });
  }, []);

  const calculate = () => {
    if (mode === "whatPercent") {
      setResult(`${val1} is ${((val1 / val2) * 100).toFixed(2)}% of ${val2}`);
    } else if (mode === "percentOf") {
      setResult(`${val1}% of ${val2} = ${((val1 / 100) * val2).toFixed(2)}`);
    } else {
      const change = ((val2 - val1) / val1) * 100;
      setResult(`Change from ${val1} to ${val2} = ${change >= 0 ? "+" : ""}${change.toFixed(2)}%`);
    }
  };

  useEffect(() => { calculate(); }, [mode, val1, val2]);

  const handleReset = () => {
    setVal1(25);
    setVal2(200);
    setResult("");
  };

  const modeLabels: Record<CalcMode, { label: string; input1: string; input2: string }> = {
    whatPercent: { label: "What % is X of Y?", input1: "Value (X)", input2: "Total (Y)" },
    percentOf: { label: "X% of Y", input1: "Percentage (X)", input2: "Value (Y)" },
    change: { label: "% Change", input1: "From Value", input2: "To Value" },
  };

  const current = modeLabels[mode];

  return (
    <div>
      <SEO title="Percentage Calculator" description="Free percentage calculator. Calculate percentages, percentage of a number, and percentage change. Quick and accurate." canonical="/math/percentage-calculator" />
      <nav className="container mx-auto px-4 py-4 text-sm text-muted-foreground flex items-center gap-1.5">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/category/math" className="hover:text-foreground">Math</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">Percentage Calculator</span>
      </nav>

      <div className="container mx-auto px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl font-black mb-3">Percentage Calculator</h1>
            <p className="text-muted-foreground text-sm max-w-xl mb-6">
              Quickly calculate percentages, percentage of a number, and percentage change between two values. Useful for discounts, tips, grades, and data analysis.
            </p>

            <AdPlaceholder size="leaderboard" />

            <div className="bg-card rounded-xl border border-border p-5 md:p-8 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                    <span className="text-primary">≡</span> Calculation Mode
                  </h3>

                  {/* Mode tabs */}
                  <div className="flex rounded-lg border border-border overflow-hidden mb-4">
                    {(["whatPercent", "percentOf", "change"] as CalcMode[]).map((m) => (
                      <button
                        key={m}
                        onClick={() => setMode(m)}
                        className={`flex-1 py-2 text-xs font-medium transition-colors ${mode === m ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"}`}
                      >
                        {modeLabels[m].label}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground block mb-1.5">{current.input1}</label>
                      <input
                        type="number"
                        value={val1}
                        onChange={(e) => setVal1(Number(e.target.value))}
                        className="w-full px-3 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground block mb-1.5">{current.input2}</label>
                      <input
                        type="number"
                        value={val2}
                        onChange={(e) => setVal2(Number(e.target.value))}
                        className="w-full px-3 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <button
                      onClick={calculate}
                      className="flex-1 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                    >
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

                <div className="flex flex-col items-center justify-center text-center">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Result</p>
                  <div className="bg-secondary rounded-xl p-6 w-full">
                    <p className="text-xl md:text-2xl font-black text-foreground">{result}</p>
                  </div>

                  <div className="mt-6 w-full text-left space-y-3 text-sm text-muted-foreground">
                    <p><strong className="text-foreground">Tip:</strong> To find what percent A is of B, divide A by B and multiply by 100.</p>
                    <p><strong className="text-foreground">Example:</strong> 25 is 12.5% of 200 because 25 ÷ 200 × 100 = 12.5%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-8">
              <AdPlaceholder size="responsive" />
            </div>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                <span className="text-primary">💡</span> How to use this calculator
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Choose a calculation mode: find what percentage one number is of another, calculate a percentage of a value, or find the percentage change between two numbers.
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

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="border border-border rounded-xl overflow-hidden">
                <AccordionItem value="q1" className="border-b border-border px-5">
                  <AccordionTrigger className="text-sm font-medium">How do I calculate a discount?</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    To calculate a discount, use the "X% of Y" mode. Enter the discount percentage and the original price. For example, 20% of $50 = $10 discount, so the final price is $40.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q2" className="px-5">
                  <AccordionTrigger className="text-sm font-medium">What is percentage change used for?</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Percentage change measures how much a value has increased or decreased relative to its original value. It's commonly used in finance (stock returns), science (experimental results), and everyday comparisons (price changes).
                  </AccordionContent>
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

export default PercentageCalculator;
