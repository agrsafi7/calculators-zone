import { CalculatorInfo } from "@/data/calculators";
import { calculatorManifest } from "@/data/calculator-manifest";

const STORAGE_KEY = "calculators_recent";
const MAX_RECENT = 5;

export interface RecentEntry {
  slug: string;
  categorySlug: string;
  name: string;
  category: string;
  timestamp: number;
}

export const getRecentCalculators = (): RecentEntry[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as RecentEntry[];
  } catch {
    return [];
  }
};

export const addRecentCalculator = (calc: { slug: string; categorySlug: string; name: string; category: string }) => {
  const recent = getRecentCalculators().filter((r) => r.slug !== calc.slug);
  recent.unshift({ ...calc, timestamp: Date.now() });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));
};

export const clearRecentCalculators = () => {
  localStorage.removeItem(STORAGE_KEY);
};

// All calculators as a flat searchable list.
// NOTE: this comes from the build-time-generated lightweight manifest
// (src/data/calculator-manifest.ts), NOT the full configs — the full data
// files are ~1.8MB and must not be in the main bundle. They load on demand
// per category inside GenericCalculatorPage.
export const allCalculators: (CalculatorInfo & { subcategory?: string })[] = calculatorManifest;

// Assign subcategories to existing other calculators that don't have them
const otherSubcategoryMap: Record<string, string> = {
  "fuel-cost-calculator": "Automotive",
  "car-depreciation-calculator": "Automotive",
  "mpg-calculator": "Automotive",
  "tire-size-calculator": "Automotive",
  "engine-horsepower-calculator": "Automotive",
  "property-tax-calculator": "Real Estate",
  "rent-vs-buy-calculator": "Real Estate",
  "real-estate-roi-calculator": "Real Estate",
  "square-footage-calculator": "Real Estate",
  "stamp-duty-calculator": "Real Estate",
  "recipe-scaler-calculator": "Cooking & Kitchen",
  "baking-ratio-calculator": "Cooking & Kitchen",
  "cooking-time-calculator": "Cooking & Kitchen",
  "calorie-per-serving-calculator": "Cooking & Kitchen",
  "unit-conversion-cooking": "Cooking & Kitchen",
  "discount-calculator": "Business & Commerce",
  "markup-calculator": "Business & Commerce",
  "margin-calculator": "Business & Commerce",
  "break-even-calculator": "Business & Commerce",
  "vat-calculator": "Business & Commerce",
  "cost-per-unit-calculator": "Business & Commerce",
  "profit-calculator": "Business & Commerce",
  "reading-time-calculator": "Productivity",
  "typing-speed-calculator": "Productivity",
  "password-strength-calculator": "Technology & Computing",
  "aspect-ratio-calculator": "Photography & Media",
  "dpi-calculator": "Photography & Media",
  "binary-to-decimal-calculator": "Technology & Computing",
  "hex-to-decimal-calculator": "Technology & Computing",
  "roman-numeral-converter": "Number Systems",
  "concrete-calculator": "Construction & Home",
  "paint-calculator": "Construction & Home",
  "flooring-calculator": "Construction & Home",
  "mulch-calculator": "Gardening & Landscaping",
  "gravel-calculator": "Construction & Home",
  "soil-calculator": "Gardening & Landscaping",
  "pool-volume-calculator": "Construction & Home",
  "gold-price-calculator": "Finance & Shopping",
  "shoe-size-converter": "Fashion & Lifestyle",
  "ring-size-calculator": "Fashion & Lifestyle",
  "lcm-calculator": "Number Theory",
  "gcd-calculator": "Number Theory",
  "logarithm-calculator": "Number Theory",
  "fibonacci-calculator": "Number Theory",
  "ratio-calculator": "Number Theory",
  "prime-checker-calculator": "Number Theory",
  "exponent-calculator": "Number Theory",
  "z-score-calculator": "Statistics",
  "variance-calculator": "Statistics",
  "probability-calculator": "Statistics",
  "permutation-calculator": "Statistics",
  "combination-calculator": "Statistics",
  "photography-exposure-calculator": "Photography & Media",
  "candle-making-calculator": "Sewing & Crafts",
  "knitting-gauge-calculator": "Sewing & Crafts",
  "wedding-budget-calculator": "Events & Planning",
};

allCalculators.forEach(c => {
  if (c.categorySlug === "other" && !c.subcategory && otherSubcategoryMap[c.slug]) {
    (c as any).subcategory = otherSubcategoryMap[c.slug];
  }
});

// Deduplicate by slug and filter out pruned calculators
import { DELETED_SLUGS } from "@/data/deleted-slugs";
const seen = new Set<string>();
export const uniqueCalculators = allCalculators.filter((c) => {
  if (DELETED_SLUGS.has(c.slug)) return false;
  if (seen.has(c.slug)) return false;
  seen.add(c.slug);
  return true;
});

export const searchCalculators = (query: string): CalculatorInfo[] => {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  const scored: { c: CalculatorInfo; score: number }[] = [];
  for (const c of uniqueCalculators) {
    const name = c.name.toLowerCase();
    const cat = c.category.toLowerCase();
    const desc = c.description.toLowerCase();
    let score = -1;
    if (name === q) score = 100;
    else if (name.startsWith(q)) score = 80;
    else if (name.includes(` ${q}`) || name.includes(q)) score = 60;
    else if (cat.includes(q)) score = 40;
    else if (desc.includes(q)) score = 20;
    if (score > 0) scored.push({ c, score });
  }
  scored.sort((a, b) => b.score - a.score || a.c.name.length - b.c.name.length || a.c.name.localeCompare(b.c.name));
  return scored.slice(0, 8).map((s) => s.c);
};

// Helper to get calculator count per category
export const getCategoryCalculatorCount = (categorySlug: string): number => {
  return uniqueCalculators.filter(c => c.categorySlug === categorySlug).length;
};
