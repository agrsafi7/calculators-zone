import { CalculatorInfo, popularCalculators } from "@/data/calculators";
import { financeCalculators } from "@/data/finance-calculators";
import { healthCalculators } from "@/data/health-calculators";
import { mathCalculators } from "@/data/math-calculators";
import { conversionCalculators } from "@/data/conversion-calculators";
import { datetimeCalculators } from "@/data/datetime-calculators";
import { scienceCalculators } from "@/data/science-calculators";
import { lifestyleCalculators } from "@/data/lifestyle-calculators";

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

// Convert CalculatorConfig[] to CalculatorInfo[]
const configToInfo = (configs: { slug: string; name: string; category: string; categorySlug: string; description: string; icon: string }[]): CalculatorInfo[] =>
  configs.map((c) => ({
    slug: c.slug,
    name: c.name,
    category: c.category,
    categorySlug: c.categorySlug,
    description: c.description,
    icon: c.icon,
  }));

// All calculators as a flat searchable list
export const allCalculators: CalculatorInfo[] = [
  ...popularCalculators,
  ...configToInfo(financeCalculators),
  ...configToInfo(healthCalculators),
  ...configToInfo(mathCalculators),
  ...configToInfo(conversionCalculators),
  ...configToInfo(datetimeCalculators),
  ...configToInfo(scienceCalculators),
  ...configToInfo(lifestyleCalculators),
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
