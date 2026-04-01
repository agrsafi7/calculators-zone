import { CalculatorInfo, popularCalculators } from "@/data/calculators";
import { financeCalculators } from "@/data/finance-calculators";
import { financeCalculatorsExtended } from "@/data/finance-calculators-extended";
import { healthCalculators } from "@/data/health-calculators";
import { healthCalculatorsExtended } from "@/data/health-calculators-extended";
import { mathCalculators } from "@/data/math-calculators";
import { mathCalculatorsExtended } from "@/data/math-calculators-extended";
import { conversionCalculators } from "@/data/conversion-calculators";
import { conversionCalculatorsExtended } from "@/data/conversion-calculators-extended";
import { datetimeCalculators } from "@/data/datetime-calculators";
import { datetimeCalculatorsExtended } from "@/data/datetime-calculators-extended";
import { datetimeCalculatorsExtra } from "@/data/datetime-calculators-extra";
import { scienceCalculators } from "@/data/science-calculators";
import { scienceCalculatorsExtended } from "@/data/science-calculators-extended";
import { scienceCalculatorsExtra } from "@/data/science-calculators-extra";
import { lifestyleCalculators } from "@/data/lifestyle-calculators";
import { lifestyleCalculatorsExtended } from "@/data/lifestyle-calculators-extended";
import { lifestyleCalculatorsExtra } from "@/data/lifestyle-calculators-extra";
import { otherCalculators } from "@/data/other-calculators";
import { otherCalculatorsExtended } from "@/data/other-calculators-extended";
import { otherCalculatorsExtra } from "@/data/other-calculators-extra";
import { otherCalculatorsBatch2 } from "@/data/other-calculators-batch2";
import { otherCalculatorsBatch3 } from "@/data/other-calculators-batch3";

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

// Convert CalculatorConfig[] to CalculatorInfo[]
const configToInfo = (configs: { slug: string; name: string; category: string; categorySlug: string; description: string; icon: string; subcategory?: string }[]): (CalculatorInfo & { subcategory?: string })[] =>
  configs.map((c) => ({
    slug: c.slug,
    name: c.name,
    category: c.category,
    categorySlug: c.categorySlug,
    description: c.description,
    icon: c.icon,
    subcategory: c.subcategory,
  }));

// All calculators as a flat searchable list
export const allCalculators: (CalculatorInfo & { subcategory?: string })[] = [
  ...popularCalculators,
  ...configToInfo(financeCalculators),
  ...configToInfo(financeCalculatorsExtended),
  ...configToInfo(healthCalculators),
  ...configToInfo(healthCalculatorsExtended),
  ...configToInfo(mathCalculators),
  ...configToInfo(mathCalculatorsExtended),
  ...configToInfo(conversionCalculators),
  ...configToInfo(conversionCalculatorsExtended),
  ...configToInfo(datetimeCalculators),
  ...configToInfo(datetimeCalculatorsExtended),
  ...configToInfo(datetimeCalculatorsExtra),
  ...configToInfo(scienceCalculators),
  ...configToInfo(scienceCalculatorsExtended),
  ...configToInfo(scienceCalculatorsExtra),
  ...configToInfo(lifestyleCalculators),
  ...configToInfo(lifestyleCalculatorsExtended),
  ...configToInfo(lifestyleCalculatorsExtra),
  ...configToInfo(otherCalculators),
  ...configToInfo(otherCalculatorsExtended),
  ...configToInfo(otherCalculatorsExtra),
  ...configToInfo(otherCalculatorsBatch2),
];

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
  "electricity-cost-calculator": "Electricity & Energy",
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

// Deduplicate by slug
const seen = new Set<string>();
export const uniqueCalculators = allCalculators.filter((c) => {
  if (seen.has(c.slug)) return false;
  seen.add(c.slug);
  return true;
});

export const searchCalculators = (query: string): CalculatorInfo[] => {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return uniqueCalculators
    .filter((c) => c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q) || c.description.toLowerCase().includes(q))
    .slice(0, 8);
};

// Helper to get calculator count per category
export const getCategoryCalculatorCount = (categorySlug: string): number => {
  return uniqueCalculators.filter(c => c.categorySlug === categorySlug).length;
};
