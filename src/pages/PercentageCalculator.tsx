import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { addRecentCalculator, uniqueCalculators } from "@/lib/calculator-utils";
import { Calculator, ChevronRight, LayoutGrid } from "lucide-react";

const RELATED = [
  { name: "GPA Calculator", slug: "gpa-calculator" },
  { name: "Percent Off Calculator", slug: "percent-off-calculator" },
  { name: "Tip Calculator", slug: "tip-calculator" },
];

const FAQS = [
  {
    question: "How do I calculate what percent one number is of another?",
    answer: "Divide the part by the whole and multiply by 100. For example, 25 is (25 ÷ 200) × 100 = 12.5% of 200.",
  },
  {
    question: "How do I find X percent of a number?",
    answer: "Convert the percent to a decimal and multiply. For example, 25% of 200 = 0.25 × 200 = 50.",
  },
  {
    question: "How do I calculate percentage change?",
    answer: "Subtract the old value from the new value, divide by the old value, and multiply by 100. A positive result is an increase; negative is a decrease.",
  },
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
      const pct = val2 !== 0 ? (val1 / val2) * 100 : 0;
      return {
        center: `${pct.toFixed(2)}%`,
        descriptor: `${val1} of ${val2}`,
        sentence: `${val1} is ${pct.toFixed(2)}% of ${val2}`,
      };
    }
    if (mode === "percentOf") {
      const result = (val1 / 100) * val2;
      return {
        center: result.toFixed(2),
        descriptor: `${val1}% of ${val2}`,
        sentence: `${val1}% of ${val2} = ${result.toFixed(2)}`,
      };
    }
    const change = val1 !== 0 ? ((val2 - val1) / val1) * 100 : 0;
    return {
      center: `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`,
      descriptor: `${val1} → ${val2}`,
      sentence: `Change from ${val1} to ${val2} = ${change >= 0 ? "+" : ""}${change.toFixed(2)}%`,
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

  const mathCalcs = uniqueCalculators.filter((c) => c.categorySlug === "math" && c.slug !== "percentage-calculator");
  const dirGroups = (() => {
    const map = new Map<string, typeof mathCalcs>();
    for (const c of mathCalcs) {
      const k = (c as any).subcategory || "General";
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(c);
    }
    return [...map.entries()].sort((a, b) => b[1].length - a[1].length).slice(0, 4)
      .map(([name, items]) => ({ name, items: items.slice(0, 4) }));
  })();

  const numInput = "w-full bg-transparent px-2 py-1.5 font-numeric text-[14px] text-right text-ink focus:outline-none";
  const wrap = "flex items-center rounded-lg bg-surface-low overflow-hidden w-full sm:w-64 focus-within:bg-surface-lowest focus-within:ring-2 focus-within:ring-primary";

  return (
    <div className="w-full bg-background min-h-[calc(100vh-144px)]">
      <SEO
        title="Percentage Calculator"
        description="Free percentage calculator. Find what percent X is of Y, calculate X% of Y, and percentage increase or decrease."
        canonical="/math/percentage-calculator"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Math", url: "/category/math" },
          { name: "Percentage Calculator", url: "/math/percentage-calculator" },
        ]}
        faqs={FAQS}
      />

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10 py-5">
        <div className="flex flex-col w-full">
          <div className="flex flex-col mb-4">
            <div className="flex items-center gap-1.5 text-[11px] text-ink-soft">
              <Link className="hover:text-primary transition-colors" to="/">Home</Link>
              <span className="opacity-50">/</span>
              <Link className="hover:text-primary transition-colors" to="/category/math">Math</Link>
              <span className="opacity-50">/</span>
              <span className="text-ink font-medium">Percentage Calculator</span>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-2 mt-1">
              <h1 className="font-display text-[24px] font-semibold text-ink tracking-tight">Percentage Calculator</h1>
              <span className="text-[12px] text-ink-soft">Instant percentage computation</span>
            </div>
            <p className="text-[14px] text-ink-soft mt-1">
              Calculate percentages three ways: what percent X is of Y, X percent of Y, and percentage change.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7">
              <div className="bg-surface-lowest rounded-xl p-6 shadow-sm">
                <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <label className="text-[13px] font-medium text-ink">Calculation Type</label>
                    <div className="grid grid-cols-3 gap-1 bg-surface-low p-1 rounded-lg w-full sm:w-80">
                      {(Object.keys(modeLabels) as CalcMode[]).map((m) => (
                        <button
                          key={m} type="button" onClick={() => setMode(m)}
                          className={`py-1.5 px-1 text-center rounded text-[12px] font-medium transition-colors ${
                            mode === m ? "bg-surface-lowest text-primary font-semibold shadow-sm" : "text-ink-soft hover:text-ink"
                          }`}
                        >
                          {modeLabels[m].label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <label className="text-[13px] font-medium text-ink" htmlFor="pct-v1">{current.input1}</label>
                    <div className={wrap}>
                      <input id="pct-v1" type="number" value={val1}
                        onChange={(e) => setVal1(Number(e.target.value))} className={numInput} />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <label className="text-[13px] font-medium text-ink" htmlFor="pct-v2">{current.input2}</label>
                    <div className={wrap}>
                      <input id="pct-v2" type="number" value={val2}
                        onChange={(e) => setVal2(Number(e.target.value))} className={numInput} />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <button type="submit"
                      className="flex-1 bg-primary text-white font-display text-[15px] font-semibold py-1.5 px-6 rounded-lg hover:bg-tealbright transition-all flex items-center justify-center gap-1.5 shadow-sm">
                      <Calculator size={18} />
                      Calculate
                    </button>
                    <button type="button" onClick={handleReset}
                      className="bg-surface-low text-ink-soft hover:text-ink hover:bg-surface-container text-[13px] font-medium py-1.5 px-4 rounded-lg transition-colors">
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="bg-surface-lowest rounded-xl p-6 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-surface-container pb-2">
                  <span className="text-[13px] font-medium uppercase tracking-wider text-ink-soft">Percentage Result</span>
                  <span className="text-[11px] text-primary px-1.5 py-0.5 rounded bg-surface-low font-medium">{current.label}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-wider text-ink-soft mb-1">{computed.descriptor}</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-numeric text-[32px] font-semibold text-primary tracking-tight">{computed.center}</span>
                  </div>
                </div>
                <div className="bg-surface-low rounded-lg p-4 text-[12px]">
                  <div className="flex justify-between">
                    <span className="text-ink-soft">In words</span>
                    <span className="font-numeric text-ink font-semibold text-right">{computed.sentence}</span>
                  </div>
                </div>
              </div>

              <div className="bg-surface-lowest rounded-xl p-4 shadow-sm">
                <div className="font-display text-[15px] font-semibold text-ink mb-1 flex items-center gap-1.5">
                  <LayoutGrid size={18} className="text-primary" />
                  Related Math Tools
                </div>
                <ul className="flex flex-col text-[12px]">
                  {RELATED.map((r) => (
                    <li key={r.slug}>
                      <Link to={`/math/${r.slug}`} className="text-link hover:text-link-dark hover:underline flex items-center justify-between py-1">
                        <span>{r.name}</span>
                        <ChevronRight size={16} className="opacity-40" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-7 bg-surface-lowest rounded-xl p-6 shadow-sm">
              <h2 className="font-display text-[18px] font-semibold text-ink mb-1">Percentage Formula Mechanics</h2>
              <p className="text-[14px] text-ink-soft mb-4">
                Percentages express a ratio as parts per hundred. The three core formulas:
              </p>
              <div className="bg-surface-low p-4 rounded-lg font-numeric text-[14px] text-ink text-center mb-4 space-y-1">
                <div>P = (X ÷ Y) × 100</div>
                <div>X% of Y = (X ÷ 100) × Y</div>
                <div>Change % = ((New − Old) ÷ Old) × 100</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px]">
                <div className="flex gap-1.5"><strong className="font-numeric text-primary">P:</strong><span className="text-ink-soft">Resulting percentage</span></div>
                <div className="flex gap-1.5"><strong className="font-numeric text-primary">X:</strong><span className="text-ink-soft">The part or the rate</span></div>
                <div className="flex gap-1.5"><strong className="font-numeric text-primary">Y:</strong><span className="text-ink-soft">The whole or base value</span></div>
                <div className="flex gap-1.5"><strong className="font-numeric text-primary">100:</strong><span className="text-ink-soft">"Per hundred" scaling factor</span></div>
              </div>
            </div>
            <div className="md:col-span-5 bg-surface-lowest rounded-xl p-6 shadow-sm">
              <h2 className="font-display text-[18px] font-semibold text-ink mb-3">Frequently Asked Questions</h2>
              <div className="space-y-4 text-[12px]">
                {FAQS.map((f, i) => (
                  <div key={i}>
                    <h3 className="font-display text-[15px] font-semibold text-ink mb-1">{f.question}</h3>
                    <p className="text-ink-soft">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-surface-container">
            <h3 className="font-display text-[18px] font-semibold text-ink mb-4">More Math Tools on TheCalculator.us</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[12px]">
              {dirGroups.map((g) => (
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
        </div>
      </div>
    </div>
  );
};

export default PercentageCalculator;
