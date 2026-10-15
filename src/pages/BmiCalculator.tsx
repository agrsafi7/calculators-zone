import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { addRecentCalculator, uniqueCalculators } from "@/lib/calculator-utils";

const RELATED = [
  { name: "Calorie Calculator", slug: "calorie-calculator" },
  { name: "Body Fat Calculator", slug: "body-fat-calculator" },
  { name: "Ideal Weight Calculator", slug: "ideal-weight-calculator" },
  { name: "Pregnancy Calculator", slug: "pregnancy-calculator" },
];

const FAQS = [
  {
    question: "How is BMI calculated?",
    answer: "BMI is calculated by dividing your weight in kilograms by the square of your height in meters. In imperial units: (weight in pounds ÷ height in inches²) × 703.",
  },
  {
    question: "What is a healthy BMI range?",
    answer: "A BMI between 18.5 and 24.9 is considered normal weight for most adults.",
  },
  {
    question: "Is BMI accurate for everyone?",
    answer: "BMI doesn't account for muscle mass, bone density, or body composition, so very muscular people may read as overweight. It remains a useful screening tool for most adults.",
  },
];

const RANGES = [
  { name: "Underweight", min: 15, max: 18.5, color: "#5bb8fe" },
  { name: "Normal", min: 18.5, max: 25, color: "#16a34a" },
  { name: "Overweight", min: 25, max: 30, color: "#eab308" },
  { name: "Obese", min: 30, max: 40, color: "#dc2626" },
];

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

  const result = useMemo(() => {
    let bmi: number;
    if (unit === "imperial") {
      const totalInches = heightFt * 12 + heightIn;
      bmi = totalInches > 0 ? (weight / (totalInches * totalInches)) * 703 : 0;
    } else {
      const heightM = heightCm / 100;
      bmi = heightM > 0 ? weightKg / (heightM * heightM) : 0;
    }
    return Math.round(bmi * 10) / 10;
  }, [unit, weight, heightFt, heightIn, heightCm, weightKg]);

  const category = RANGES.find((r) => result >= r.min && result < r.max) ?? RANGES[3];

  const healthyRange = useMemo(() => {
    const heightM = unit === "imperial" ? (heightFt * 12 + heightIn) * 0.0254 : heightCm / 100;
    const minW = 18.5 * heightM * heightM;
    const maxW = 24.9 * heightM * heightM;
    return unit === "imperial"
      ? { min: Math.round(minW * 2.205), max: Math.round(maxW * 2.205), unit: "lbs" }
      : { min: Math.round(minW), max: Math.round(maxW), unit: "kg" };
  }, [unit, heightFt, heightIn, heightCm]);

  const handleReset = () => {
    setWeight(154); setHeightFt(5); setHeightIn(9);
    setHeightCm(175); setWeightKg(70);
  };

  const markerPct = Math.min(100, Math.max(0, ((result - 15) / (40 - 15)) * 100));

  const healthCalcs = uniqueCalculators.filter((c) => c.categorySlug === "health" && c.slug !== "bmi-calculator");
  const dirGroups = (() => {
    const map = new Map<string, typeof healthCalcs>();
    for (const c of healthCalcs) {
      const k = (c as any).subcategory || "General";
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(c);
    }
    return [...map.entries()].sort((a, b) => b[1].length - a[1].length).slice(0, 4)
      .map(([name, items]) => ({ name, items: items.slice(0, 4) }));
  })();

  const numInput = "w-full bg-transparent px-2 py-1.5 font-numeric text-[14px] text-right text-ink focus:outline-none";
  const wrap = "flex items-center rounded-lg bg-surface-low overflow-hidden w-full sm:w-64 focus-within:bg-surface-lowest focus-within:ring-2 focus-within:ring-primary";
  const affix = "px-3 font-numeric text-[14px] text-ink-soft bg-surface-container py-1.5";

  return (
    <div className="w-full bg-background min-h-[calc(100vh-144px)]">
      <SEO
        title="BMI Calculator"
        description="Free BMI calculator. Calculate your Body Mass Index with imperial or metric units. Understand healthy weight ranges."
        canonical="/health/bmi-calculator"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Health", url: "/category/health" },
          { name: "BMI Calculator", url: "/health/bmi-calculator" },
        ]}
        faqs={FAQS}
      />

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10 py-5">
        <div className="flex flex-col w-full">
          <div className="flex flex-col mb-4">
            <div className="flex items-center gap-1.5 text-[11px] text-ink-soft">
              <Link className="hover:text-primary transition-colors" to="/">Home</Link>
              <span className="opacity-50">/</span>
              <Link className="hover:text-primary transition-colors" to="/category/health">Health</Link>
              <span className="opacity-50">/</span>
              <span className="text-ink font-medium">BMI Calculator</span>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-2 mt-1">
              <h1 className="font-display text-[24px] font-semibold text-ink tracking-tight">BMI Calculator</h1>
              <span className="text-[12px] text-ink-soft">Instant body mass index computation</span>
            </div>
            <p className="text-[14px] text-ink-soft mt-1">
              Calculate your Body Mass Index to understand if your weight is healthy for your height.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7">
              <div className="bg-surface-lowest rounded-xl p-6 shadow-sm">
                <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <label className="text-[13px] font-medium text-ink">Units</label>
                    <div className="grid grid-cols-2 gap-1 bg-surface-low p-1 rounded-lg w-full sm:w-64">
                      {(["imperial", "metric"] as Unit[]).map((u) => (
                        <button
                          key={u} type="button" onClick={() => setUnit(u)}
                          className={`py-1.5 text-center rounded text-[13px] font-medium capitalize transition-colors ${
                            unit === u ? "bg-surface-lowest text-primary font-semibold shadow-sm" : "text-ink-soft hover:text-ink"
                          }`}
                        >
                          {u === "imperial" ? "Imperial (lb/in)" : "Metric (kg/cm)"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {unit === "imperial" ? (
                    <>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                        <label className="text-[13px] font-medium text-ink" htmlFor="bmi-w">Weight</label>
                        <div className={wrap}>
                          <input id="bmi-w" type="number" min={1} value={weight}
                            onChange={(e) => setWeight(Number(e.target.value))} className={numInput} />
                          <span className={affix}>lbs</span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                        <label className="text-[13px] font-medium text-ink">Height</label>
                        <div className="flex items-center gap-2 w-full sm:w-64">
                          <div className={`${wrap} flex-1`}>
                            <input type="number" min={0} value={heightFt} aria-label="Height feet"
                              onChange={(e) => setHeightFt(Number(e.target.value))} className={numInput} />
                            <span className="px-2 font-numeric text-[14px] text-ink-soft bg-surface-container py-1.5">ft</span>
                          </div>
                          <div className={`${wrap} flex-1`}>
                            <input type="number" min={0} max={11} value={heightIn} aria-label="Height inches"
                              onChange={(e) => setHeightIn(Number(e.target.value))} className={numInput} />
                            <span className="px-2 font-numeric text-[14px] text-ink-soft bg-surface-container py-1.5">in</span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                        <label className="text-[13px] font-medium text-ink" htmlFor="bmi-kg">Weight</label>
                        <div className={wrap}>
                          <input id="bmi-kg" type="number" min={1} value={weightKg}
                            onChange={(e) => setWeightKg(Number(e.target.value))} className={numInput} />
                          <span className={affix}>kg</span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                        <label className="text-[13px] font-medium text-ink" htmlFor="bmi-cm">Height</label>
                        <div className={wrap}>
                          <input id="bmi-cm" type="number" min={1} value={heightCm}
                            onChange={(e) => setHeightCm(Number(e.target.value))} className={numInput} />
                          <span className={affix}>cm</span>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex items-center gap-3 pt-1">
                    <button type="submit"
                      className="flex-1 bg-primary text-white font-display text-[15px] font-semibold py-1.5 px-6 rounded-lg hover:bg-tealbright transition-all flex items-center justify-center gap-1.5 shadow-sm">
                      <span className="material-symbols-outlined text-[18px]">calculate</span>
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
                  <span className="text-[13px] font-medium uppercase tracking-wider text-ink-soft">Body Mass Index</span>
                  <span className="text-[11px] text-primary px-1.5 py-0.5 rounded bg-surface-low font-medium">BMI Score</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-numeric text-[32px] font-semibold text-primary tracking-tight">{result}</span>
                    <span className="text-[12px] text-ink-soft">kg/m²</span>
                  </div>
                  <span className="text-[11px] text-ink-soft mt-1">
                    Category: <strong style={{ color: category.color }}>{category.name}</strong>
                  </span>
                </div>
                <div className="w-full flex flex-col gap-1.5 pt-1">
                  <div className="relative w-full h-3 rounded-full flex overflow-hidden">
                    {RANGES.map((r) => (
                      <div key={r.name} style={{ width: `${((r.max - r.min) / 25) * 100}%`, backgroundColor: r.color }} title={r.name} />
                    ))}
                    <div
                      className="absolute top-[-3px] w-1 h-[18px] bg-ink rounded"
                      style={{ left: `calc(${markerPct}% - 2px)` }}
                      title={`Your BMI: ${result}`}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-ink-soft">
                    {RANGES.map((r) => (
                      <span key={r.name} className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: r.color }}></span> {r.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-surface-low rounded-lg p-4 flex flex-col gap-1.5 text-[12px]">
                  <div className="flex justify-between">
                    <span className="text-ink-soft">Healthy weight range</span>
                    <span className="font-numeric text-ink font-semibold">{healthyRange.min} – {healthyRange.max} {healthyRange.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-soft">Healthy BMI range</span>
                    <span className="font-numeric text-ink font-semibold">18.5 – 24.9</span>
                  </div>
                </div>
              </div>

              <div className="bg-surface-lowest rounded-xl p-4 shadow-sm">
                <div className="font-display text-[15px] font-semibold text-ink mb-1 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[18px]">grid_view</span>
                  Related Health Tools
                </div>
                <ul className="flex flex-col text-[12px]">
                  {RELATED.map((r) => (
                    <li key={r.slug}>
                      <Link to={`/health/${r.slug}`} className="text-link hover:text-link-dark hover:underline flex items-center justify-between py-1">
                        <span>{r.name}</span>
                        <span className="material-symbols-outlined text-[16px] opacity-40">chevron_right</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-7 bg-surface-lowest rounded-xl p-6 shadow-sm">
              <h2 className="font-display text-[18px] font-semibold text-ink mb-1">BMI Formula Mechanics</h2>
              <p className="text-[14px] text-ink-soft mb-4">
                Body Mass Index estimates body fat from height and weight using a simple ratio:
              </p>
              <div className="bg-surface-low p-4 rounded-lg font-numeric text-[14px] text-ink text-center mb-4">
                BMI = weight (kg) ÷ height (m)<sup>2</sup>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px]">
                <div className="flex gap-1.5"><strong className="font-numeric text-primary">18.5–24.9:</strong><span className="text-ink-soft">Normal, healthy weight range</span></div>
                <div className="flex gap-1.5"><strong className="font-numeric text-primary">&lt; 18.5:</strong><span className="text-ink-soft">Underweight — consider gaining weight</span></div>
                <div className="flex gap-1.5"><strong className="font-numeric text-primary">25–29.9:</strong><span className="text-ink-soft">Overweight — lifestyle review advised</span></div>
                <div className="flex gap-1.5"><strong className="font-numeric text-primary">≥ 30:</strong><span className="text-ink-soft">Obese — consult a health professional</span></div>
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
            <h3 className="font-display text-[18px] font-semibold text-ink mb-4">More Health Tools on TheCalculator.us</h3>
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

export default BmiCalculator;
