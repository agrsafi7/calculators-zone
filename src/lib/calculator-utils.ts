import { CalculatorInfo, popularCalculators } from "@/data/calculators";
import { financeCalculators } from "@/data/finance-calculators";

const STORAGE_KEY = "smartcalchub_recent";
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

// All calculators as a flat searchable list
export const allCalculators: CalculatorInfo[] = [
  ...popularCalculators,
  // Finance calculators from config
  ...financeCalculators.map((c) => ({
    slug: c.slug,
    name: c.name,
    category: c.category,
    categorySlug: c.categorySlug,
    description: c.description,
    icon: c.icon,
  })),
  // Other category calculators
  { slug: "calorie-calculator", name: "Calorie Calculator", category: "Health", categorySlug: "health", description: "Estimate daily calorie needs", icon: "heart" },
  { slug: "gpa-calculator", name: "GPA Calculator", category: "Math", categorySlug: "math", description: "Calculate your grade point average", icon: "hash" },
  { slug: "date-difference-calculator", name: "Date Difference Calculator", category: "Lifestyle", categorySlug: "lifestyle", description: "Calculate days between dates", icon: "smile" },
  { slug: "weight-converter", name: "Weight Converter", category: "Units", categorySlug: "conversions", description: "Convert between weight units", icon: "convert" },
  { slug: "molar-mass-calculator", name: "Molar Mass Calculator", category: "Science", categorySlug: "science", description: "Calculate molar mass of compounds", icon: "flask" },
  { slug: "kinematics-calculator", name: "Kinematics Calculator", category: "Science", categorySlug: "science", description: "Solve kinematics equations", icon: "flask" },
  { slug: "temperature-converter", name: "Temperature Converter", category: "Units", categorySlug: "conversions", description: "Convert between temperature scales", icon: "convert" },
  { slug: "pregnancy-calculator", name: "Pregnancy Due Date Calculator", category: "Health", categorySlug: "health", description: "Estimate your due date", icon: "heart" },
  { slug: "fractions-calculator", name: "Fractions Calculator", category: "Math", categorySlug: "math", description: "Add, subtract, multiply fractions", icon: "hash" },
  { slug: "volume-calculator", name: "Volume Calculator", category: "Math", categorySlug: "math", description: "Calculate volume of shapes", icon: "hash" },
  { slug: "time-zone-converter", name: "Time Zone Converter", category: "Lifestyle", categorySlug: "lifestyle", description: "Convert between time zones", icon: "smile" },
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
