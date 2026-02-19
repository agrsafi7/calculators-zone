import { Calculator, DollarSign, Heart, Hash, ArrowRightLeft, FlaskConical, Smile, Home } from "lucide-react";

export interface CalculatorInfo {
  slug: string;
  name: string;
  shortName?: string;
  category: string;
  categorySlug: string;
  description: string;
  icon: string;
}

export interface CategoryInfo {
  name: string;
  slug: string;
  icon: string;
  color: string;
  description: string;
  tags: string[];
}

export const categories: CategoryInfo[] = [
  {
    name: "Finance",
    slug: "finance",
    icon: "dollar",
    color: "hsl(217 91% 60%)",
    description: "Mortgage, loan payments, interest rates, ROI, and retirement planning.",
    tags: ["Mortgage", "Auto Loan", "Salary"],
  },
  {
    name: "Health & Fitness",
    slug: "health",
    icon: "heart",
    color: "hsl(0 84% 60%)",
    description: "Calculate BMI, body fat, calories burned, BMR, and pregnancy due dates.",
    tags: ["BMI", "Calories", "Pregnancy"],
  },
  {
    name: "Math & Algebra",
    slug: "math",
    icon: "hash",
    color: "hsl(262 83% 58%)",
    description: "Solve fractions, percentages, geometry problems, and scientific equations.",
    tags: ["Percentage", "Fractions", "Volume"],
  },
  {
    name: "Unit Conversions",
    slug: "conversions",
    icon: "convert",
    color: "hsl(199 89% 48%)",
    description: "Convert between metric and imperial units for length, weight, and volume.",
    tags: ["Length", "Weight", "Temperature"],
  },
  {
    name: "Science",
    slug: "science",
    icon: "flask",
    color: "hsl(25 95% 53%)",
    description: "Tools for physics, chemistry, thermodynamics, and other scientific fields.",
    tags: ["Molar Mass", "Kinematics"],
  },
  {
    name: "Lifestyle",
    slug: "lifestyle",
    icon: "smile",
    color: "hsl(330 81% 60%)",
    description: "Everyday calculators for time, date, travel, and personal hobbies.",
    tags: ["Age", "Date", "Time Zone"],
  },
];

export const popularCalculators: CalculatorInfo[] = [
  { slug: "bmi-calculator", name: "BMI Calculator", category: "Health", categorySlug: "health", description: "Calculate your Body Mass Index", icon: "heart" },
  { slug: "mortgage-calculator", name: "Mortgage Calculator", shortName: "Mortgage Calc", category: "Finance", categorySlug: "finance", description: "Estimate monthly mortgage payments", icon: "dollar" },
  { slug: "age-calculator", name: "Age Calculator", category: "Lifestyle", categorySlug: "lifestyle", description: "Calculate your exact age", icon: "smile" },
  { slug: "percentage-calculator", name: "Percentage Calculator", shortName: "Percentage Calc", category: "Math", categorySlug: "math", description: "Calculate percentages easily", icon: "hash" },
  { slug: "salary-calculator", name: "Salary Calculator", shortName: "Salary Paycheck", category: "Finance", categorySlug: "finance", description: "Calculate your take-home pay", icon: "dollar" },
  { slug: "length-converter", name: "Length Converter", category: "Units", categorySlug: "conversions", description: "Convert between length units", icon: "convert" },
];

export const getCategoryIcon = (icon: string) => {
  switch (icon) {
    case "dollar": return DollarSign;
    case "heart": return Heart;
    case "hash": return Hash;
    case "convert": return ArrowRightLeft;
    case "flask": return FlaskConical;
    case "smile": return Smile;
    case "home": return Home;
    default: return Calculator;
  }
};
