import { Calculator, DollarSign, Heart, Hash, ArrowRightLeft, FlaskConical, Smile, Home, Clock, Car, ChefHat } from "lucide-react";

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
    name: "Math & Education",
    slug: "math",
    icon: "hash",
    color: "hsl(262 83% 58%)",
    description: "Solve fractions, percentages, geometry problems, GPA, and scientific equations.",
    tags: ["Percentage", "Fractions", "GPA"],
  },
  {
    name: "Unit Conversions",
    slug: "conversions",
    icon: "convert",
    color: "hsl(199 89% 48%)",
    description: "Convert between metric and imperial units for length, weight, temperature, and more.",
    tags: ["Length", "Weight", "Temperature"],
  },
  {
    name: "Science",
    slug: "science",
    icon: "flask",
    color: "hsl(25 95% 53%)",
    description: "Tools for physics, chemistry, thermodynamics, and other scientific fields.",
    tags: ["Force", "Ohm's Law", "pH"],
  },
  {
    name: "Date & Time",
    slug: "datetime",
    icon: "clock",
    color: "hsl(142 71% 45%)",
    description: "Calculate age, date differences, business days, countdowns, and time zones.",
    tags: ["Age", "Date Diff", "Countdown"],
  },
  {
    name: "Lifestyle",
    slug: "lifestyle",
    icon: "smile",
    color: "hsl(330 81% 60%)",
    description: "Everyday calculators for sleep, travel, pets, cooking, and personal hobbies.",
    tags: ["Sleep", "Pet Age", "Travel"],
  },
  {
    name: "Other Calculators",
    slug: "other",
    icon: "layers",
    color: "hsl(45 93% 47%)",
    description: "Automotive, real estate, cooking, DIY, weather, crafts, and 100+ more specialized calculators.",
    tags: ["Fuel Cost", "Property Tax", "Concrete"],
  },
];

export const popularCalculators: CalculatorInfo[] = [
  { slug: "bmi-calculator", name: "BMI Calculator", category: "Health", categorySlug: "health", description: "Calculate your Body Mass Index", icon: "heart" },
  { slug: "mortgage-calculator", name: "Mortgage Calculator", shortName: "Mortgage Calc", category: "Finance", categorySlug: "finance", description: "Estimate monthly mortgage payments", icon: "dollar" },
  { slug: "age-calculator", name: "Age Calculator", category: "Date & Time", categorySlug: "datetime", description: "Calculate your exact age", icon: "clock" },
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
    case "clock": return Clock;
    case "car": return Car;
    case "home": return Home;
    case "chef": return ChefHat;
    default: return Calculator;
  }
};
