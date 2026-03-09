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
import { automotiveCalculators } from "@/data/automotive-calculators";
import { realEstateCalculators } from "@/data/realestate-calculators";
import { cookingCalculators } from "@/data/cooking-calculators";

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
  ...configToInfo(automotiveCalculators),
  ...configToInfo(realEstateCalculators),
  ...configToInfo(cookingCalculators),
];

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
