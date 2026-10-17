// Formula verification v2 — hand-checked vectors with correct labels.
// Expected values computed independently (Python).
import { financeCalculators } from "@/data/finance-calculators";
import { healthCalculators } from "@/data/health-calculators";
import { mathCalculators } from "@/data/math-calculators";
import { conversionCalculators } from "@/data/conversion-calculators";
import { datetimeCalculators } from "@/data/datetime-calculators";

const all = [...financeCalculators, ...healthCalculators, ...mathCalculators, ...conversionCalculators, ...datetimeCalculators] as any[];
const bySlug = new Map(all.map((c) => [c.slug, c]));

interface Vec { slug: string; inputs: Record<string, number>; expect: Record<string, string>; }
const vectors: Vec[] = [
  { slug: "loan-calculator", inputs: { principal: 25000, rate: 7, term: 60 },
    expect: { "Monthly Payment": "$495.03" } },
  { slug: "compound-interest-calculator", inputs: { principal: 10000, monthly: 0, rate: 8, years: 10, compound: 1 },
    expect: { "Future Value": "$21,589", "Total Interest Earned": "$11,589" } },
  { slug: "auto-loan-calculator", inputs: { price: 35000, downPayment: 5000, tradeIn: 0, rate: 6.5, term: 60 },
    expect: { "Monthly Payment": "$586.98" } },
  { slug: "tip-calculator", inputs: { billAmount: 85, tipPercent: 18, splitBy: 2 },
    expect: { "Tip Amount": "$15.30", "Total (with tip)": "$100.30", "Per Person (total)": "$50.15" } },
  { slug: "simple-interest-calculator", inputs: { principal: 5000, rate: 5, time: 3 },
    expect: { "Total Interest": "$750.00", "Total Amount": "$5,750.00" } },
  { slug: "bmr-calculator", inputs: { gender: 0, age: 30, weight: 70, height: 170 },
    expect: { "Your BMR": "1618 cal/day" } },
  { slug: "temperature-converter", inputs: { value: 98.6, from: 1 },
    expect: { "Celsius": "37.00 °C" } },
  { slug: "celsius-to-fahrenheit-converter", inputs: { celsius: 25 },
    expect: { "Fahrenheit": "77.00 °F" } },
];

let pass = 0, fail = 0;
for (const v of vectors) {
  const cfg = bySlug.get(v.slug);
  if (!cfg) { console.log(`SKIP ${v.slug}: not found`); continue; }
  let res: any[];
  try { res = cfg.calculate(v.inputs); }
  catch (e: any) { console.log(`FAIL ${v.slug}: threw ${e?.message}`); fail++; continue; }
  for (const [label, expected] of Object.entries(v.expect)) {
    const got = res.find((r) => r.label === label)?.value;
    const norm = (s: string) => s?.replace(/[$,]/g, "").trim();
    if (got === undefined) { fail++; console.log(`FAIL ${v.slug}: label "${label}" not found. Labels: ${res.map((r) => r.label).join(" | ")}`); }
    else if (norm(String(got)) === norm(expected)) { pass++; }
    else { fail++; console.log(`FAIL ${v.slug} "${label}": expected "${expected}", got "${got}"`); }
  }
}
console.log(`\n${pass} passed, ${fail} failed out of ${vectors.length} vectors.`);
