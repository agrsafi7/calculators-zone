import { CalculatorConfig } from "@/components/CalculatorTemplate";

const fmt = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);
const fmt0 = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
const num = (n: number) => new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(n);

const b3Rel = (exclude: string) => [
  { name: "Inflation Calculator", slug: "inflation-calculator", icon: "layers", category: "other" },
  { name: "Pool Volume", slug: "pool-volume-calculator", icon: "layers", category: "other" },
  { name: "Break-Even", slug: "break-even-calculator", icon: "layers", category: "other" },
  { name: "Running Pace", slug: "running-pace-calculator", icon: "layers", category: "other" },
].filter(c => c.slug !== exclude);

const defFormula = { expression: "See description", variables: ["Input values as specified"] };
const defFaqs = (name: string) => [{ question: `How does the ${name} work?`, answer: "Enter the required values and the calculator will compute the results instantly." }];

export const otherCalculatorsBatch3: CalculatorConfig[] = [
  // ═══ PARENTING & FAMILY ═══
  {
    slug: "baby-due-date-calculator", name: "Baby Due Date Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Parenting & Family",
    description: "Estimate your baby's due date based on the first day of your last menstrual period.",
    metaDescription: "Free baby due date calculator. Estimate your expected delivery date.",
    icon: "layers",
    inputs: [
      { id: "month", label: "Last Period Month (1-12)", type: "number", defaultValue: 1, min: 1, max: 12 },
      { id: "day", label: "Last Period Day", type: "number", defaultValue: 15, min: 1, max: 31 },
      { id: "year", label: "Year", type: "number", defaultValue: 2026, min: 2024, max: 2028 },
    ],
    calculate: (v) => {
      const lmp = new Date(v.year, v.month - 1, v.day);
      const due = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000);
      const today = new Date();
      const weeksPregnant = Math.max(0, Math.floor((today.getTime() - lmp.getTime()) / (7 * 24 * 60 * 60 * 1000)));
      const trimester = weeksPregnant <= 12 ? "First" : weeksPregnant <= 27 ? "Second" : "Third";
      return [
        { label: "Estimated Due Date", value: due.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) },
        { label: "Weeks Pregnant", value: `${weeksPregnant} weeks` },
        { label: "Current Trimester", value: trimester, highlight: true },
      ];
    },
    formula: { expression: "Due Date = LMP + 280 days", variables: ["LMP = Last menstrual period date"] },
    howToUse: "Enter the first day of your last menstrual period.",
    faqs: defFaqs("Baby Due Date Calculator"),
    relatedCalcs: b3Rel("baby-due-date-calculator"),
  },
  {
    slug: "diaper-cost-calculator", name: "Diaper Cost Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Parenting & Family",
    description: "Estimate how much you'll spend on diapers in the first year.",
    metaDescription: "Free diaper cost calculator. Estimate yearly diaper expenses.",
    icon: "layers",
    inputs: [
      { id: "perDay", label: "Diapers Per Day", type: "number", defaultValue: 8 },
      { id: "costPer", label: "Cost Per Diaper ($)", type: "number", defaultValue: 0.25, prefix: "$", step: 0.01 },
      { id: "months", label: "Number of Months", type: "number", defaultValue: 12 },
    ],
    calculate: (v) => {
      const total = v.perDay * v.costPer * 30.44 * v.months;
      return [
        { label: "Total Cost", value: fmt(total), highlight: true },
        { label: "Monthly Cost", value: fmt(total / v.months) },
        { label: "Total Diapers", value: num(v.perDay * 30.44 * v.months) },
      ];
    },
    formula: defFormula, howToUse: "Enter diapers per day, cost per diaper, and months.", faqs: defFaqs("Diaper Cost Calculator"), relatedCalcs: b3Rel("diaper-cost-calculator"),
  },
  {
    slug: "child-height-predictor", name: "Child Height Predictor", category: "Other Calculators", categorySlug: "other",
    subcategory: "Parenting & Family",
    description: "Predict your child's adult height based on parents' heights.",
    metaDescription: "Free child height predictor. Estimate adult height from parent heights.",
    icon: "layers",
    inputs: [
      { id: "fatherHeight", label: "Father's Height (inches)", type: "number", defaultValue: 70 },
      { id: "motherHeight", label: "Mother's Height (inches)", type: "number", defaultValue: 64 },
      { id: "gender", label: "Child Gender (1=Boy, 2=Girl)", type: "number", defaultValue: 1, min: 1, max: 2 },
    ],
    calculate: (v) => {
      const predicted = v.gender === 1 ? (v.fatherHeight + v.motherHeight + 5) / 2 : (v.fatherHeight + v.motherHeight - 5) / 2;
      const ft = Math.floor(predicted / 12);
      const inches = Math.round(predicted % 12);
      return [
        { label: "Predicted Adult Height", value: `${ft}' ${inches}" (${num(predicted)} in)`, highlight: true },
        { label: "Method", value: "Mid-Parent Height Formula" },
      ];
    },
    formula: { expression: "Boy: (Father + Mother + 5) / 2; Girl: (Father + Mother - 5) / 2", variables: ["Heights in inches"] },
    howToUse: "Enter both parents' heights and child's gender.", faqs: defFaqs("Child Height Predictor"), relatedCalcs: b3Rel("child-height-predictor"),
  },

  // ═══ POOL & OUTDOOR ═══
  {
    slug: "pool-volume-calculator", name: "Pool Volume Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Pool & Outdoor",
    description: "Calculate the volume of water in your swimming pool.",
    metaDescription: "Free pool volume calculator. Find gallons of water in your pool.",
    icon: "layers",
    inputs: [
      { id: "length", label: "Length (feet)", type: "number", defaultValue: 30 },
      { id: "width", label: "Width (feet)", type: "number", defaultValue: 15 },
      { id: "avgDepth", label: "Average Depth (feet)", type: "number", defaultValue: 5, step: 0.5 },
    ],
    calculate: (v) => {
      const cubicFt = v.length * v.width * v.avgDepth;
      const gallons = cubicFt * 7.48052;
      return [
        { label: "Volume (Gallons)", value: num(gallons), highlight: true },
        { label: "Volume (Liters)", value: num(gallons * 3.78541) },
        { label: "Cubic Feet", value: num(cubicFt) },
      ];
    },
    formula: { expression: "Volume = L × W × D × 7.48", variables: ["L = Length", "W = Width", "D = Avg depth"] },
    howToUse: "Enter pool dimensions in feet.", faqs: defFaqs("Pool Volume Calculator"), relatedCalcs: b3Rel("pool-volume-calculator"),
  },
  {
    slug: "deck-stain-calculator", name: "Deck Stain Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Pool & Outdoor",
    description: "Calculate how much stain you need for your deck.",
    metaDescription: "Free deck stain calculator. Estimate stain needed for your deck.",
    icon: "layers",
    inputs: [
      { id: "length", label: "Deck Length (feet)", type: "number", defaultValue: 20 },
      { id: "width", label: "Deck Width (feet)", type: "number", defaultValue: 12 },
      { id: "coats", label: "Number of Coats", type: "number", defaultValue: 2, min: 1, max: 3 },
      { id: "coverage", label: "Coverage (sq ft/gallon)", type: "number", defaultValue: 250 },
    ],
    calculate: (v) => {
      const area = v.length * v.width;
      const gallons = (area * v.coats) / v.coverage;
      return [
        { label: "Deck Area", value: `${num(area)} sq ft` },
        { label: "Stain Needed", value: `${Math.ceil(gallons)} gallons`, highlight: true },
        { label: "Total Coverage", value: `${num(area * v.coats)} sq ft` },
      ];
    },
    formula: defFormula, howToUse: "Enter deck dimensions and number of coats.", faqs: defFaqs("Deck Stain Calculator"), relatedCalcs: b3Rel("deck-stain-calculator"),
  },

  // ═══ BUSINESS & FREELANCE ═══
  {
    slug: "hourly-rate-calculator", name: "Hourly Rate Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Business & Freelance",
    description: "Calculate your ideal freelance hourly rate.",
    metaDescription: "Free hourly rate calculator for freelancers. Enter your target salary, business expenses, and billable hours to find the hourly rate you need to charge.",
    icon: "layers",
    inputs: [
      { id: "salary", label: "Desired Annual Salary ($)", type: "number", defaultValue: 80000, prefix: "$" },
      { id: "expenses", label: "Annual Expenses ($)", type: "number", defaultValue: 10000, prefix: "$" },
      { id: "billableHours", label: "Billable Hours/Week", type: "number", defaultValue: 30 },
      { id: "vacWeeks", label: "Vacation Weeks/Year", type: "number", defaultValue: 3 },
    ],
    calculate: (v) => {
      const workWeeks = 52 - v.vacWeeks;
      const total = v.salary + v.expenses;
      const hourly = total / (workWeeks * v.billableHours);
      return [
        { label: "Recommended Hourly Rate", value: fmt(hourly), highlight: true },
        { label: "Annual Revenue Needed", value: fmt0(total) },
        { label: "Billable Hours/Year", value: num(workWeeks * v.billableHours) },
        { label: "Monthly Revenue", value: fmt(total / 12) },
      ];
    },
    formula: { expression: "Rate = (Salary + Expenses) / (Work Weeks × Hours)", variables: ["All monetary values in USD"] },
    howToUse: "Enter desired salary, expenses, billable hours, and vacation weeks.", faqs: defFaqs("Hourly Rate Calculator"), relatedCalcs: b3Rel("hourly-rate-calculator"),
  },
  {
    slug: "break-even-calculator", name: "Break-Even Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Business & Freelance",
    description: "Calculate the break-even point for your product.",
    metaDescription: "Free break-even calculator. Find how many units to sell.",
    icon: "layers",
    inputs: [
      { id: "fixedCosts", label: "Fixed Costs ($)", type: "number", defaultValue: 5000, prefix: "$" },
      { id: "pricePerUnit", label: "Price Per Unit ($)", type: "number", defaultValue: 50, prefix: "$" },
      { id: "costPerUnit", label: "Variable Cost/Unit ($)", type: "number", defaultValue: 20, prefix: "$" },
    ],
    calculate: (v) => {
      const margin = v.pricePerUnit - v.costPerUnit;
      const units = margin > 0 ? Math.ceil(v.fixedCosts / margin) : 0;
      return [
        { label: "Break-Even Units", value: num(units), highlight: true },
        { label: "Break-Even Revenue", value: fmt(units * v.pricePerUnit) },
        { label: "Profit Margin/Unit", value: fmt(margin) },
        { label: "Contribution Margin %", value: `${num((margin / v.pricePerUnit) * 100)}%` },
      ];
    },
    formula: { expression: "Units = Fixed Costs / (Price - Variable Cost)", variables: ["All in USD"] },
    howToUse: "Enter fixed costs, price per unit, and variable cost per unit.", faqs: defFaqs("Break-Even Calculator"), relatedCalcs: b3Rel("break-even-calculator"),
  },
  {
    slug: "invoice-calculator", name: "Invoice Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Business & Freelance",
    description: "Calculate invoice totals with tax and discount.",
    metaDescription: "Free invoice calculator. Compute subtotal, tax, and total.",
    icon: "layers",
    inputs: [
      { id: "subtotal", label: "Subtotal ($)", type: "number", defaultValue: 1500, prefix: "$" },
      { id: "discount", label: "Discount (%)", type: "number", defaultValue: 10 },
      { id: "taxRate", label: "Tax Rate (%)", type: "number", defaultValue: 8.25, step: 0.01 },
    ],
    calculate: (v) => {
      const disc = v.subtotal * (v.discount / 100);
      const after = v.subtotal - disc;
      const tax = after * (v.taxRate / 100);
      return [
        { label: "Subtotal", value: fmt(v.subtotal) },
        { label: "Discount", value: `-${fmt(disc)}` },
        { label: "Tax", value: `+${fmt(tax)}` },
        { label: "Total Due", value: fmt(after + tax), highlight: true },
      ];
    },
    formula: defFormula, howToUse: "Enter subtotal, discount %, and tax rate.", faqs: defFaqs("Invoice Calculator"), relatedCalcs: b3Rel("invoice-calculator"),
  },
  {
    slug: "profit-margin-calculator", name: "Profit Margin Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Business & Freelance",
    description: "Calculate gross and net profit margins.",
    metaDescription: "Free profit margin calculator.",
    icon: "layers",
    inputs: [
      { id: "revenue", label: "Revenue ($)", type: "number", defaultValue: 50000, prefix: "$" },
      { id: "cogs", label: "Cost of Goods ($)", type: "number", defaultValue: 20000, prefix: "$" },
      { id: "expenses", label: "Operating Expenses ($)", type: "number", defaultValue: 15000, prefix: "$" },
    ],
    calculate: (v) => {
      const gross = v.revenue - v.cogs;
      const net = gross - v.expenses;
      return [
        { label: "Gross Profit", value: fmt(gross) },
        { label: "Gross Margin", value: `${num((gross / v.revenue) * 100)}%` },
        { label: "Net Profit", value: fmt(net), highlight: true },
        { label: "Net Margin", value: `${num((net / v.revenue) * 100)}%` },
      ];
    },
    formula: defFormula, howToUse: "Enter revenue, COGS, and operating expenses.", faqs: defFaqs("Profit Margin Calculator"), relatedCalcs: b3Rel("profit-margin-calculator"),
  },

  // ═══ AUTOMOTIVE ═══
  {
    slug: "car-lease-calculator", name: "Car Lease Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Automotive",
    description: "Estimate monthly car lease payments.",
    metaDescription: "Free car lease calculator.",
    icon: "layers",
    inputs: [
      { id: "msrp", label: "Vehicle MSRP ($)", type: "number", defaultValue: 35000, prefix: "$" },
      { id: "residual", label: "Residual Value (%)", type: "number", defaultValue: 55 },
      { id: "term", label: "Lease Term (months)", type: "number", defaultValue: 36 },
      { id: "rate", label: "Money Factor", type: "number", defaultValue: 0.002, step: 0.0001 },
      { id: "down", label: "Down Payment ($)", type: "number", defaultValue: 2000, prefix: "$" },
    ],
    calculate: (v) => {
      const residualVal = v.msrp * (v.residual / 100);
      const cap = v.msrp - v.down;
      const dep = (cap - residualVal) / v.term;
      const fin = (cap + residualVal) * v.rate;
      const monthly = dep + fin;
      return [
        { label: "Monthly Payment", value: fmt(monthly), highlight: true },
        { label: "Total Lease Cost", value: fmt(monthly * v.term + v.down) },
        { label: "Residual Value", value: fmt(residualVal) },
        { label: "APR Equivalent", value: `${num(v.rate * 2400)}%` },
      ];
    },
    formula: defFormula, howToUse: "Enter MSRP, residual %, term, money factor, and down payment.", faqs: defFaqs("Car Lease Calculator"), relatedCalcs: b3Rel("car-lease-calculator"),
  },
  {
    slug: "oil-change-calculator", name: "Oil Change Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Automotive",
    description: "Track oil change intervals and annual cost.",
    metaDescription: "Free oil change interval calculator.",
    icon: "layers",
    inputs: [
      { id: "milesPerYear", label: "Miles Per Year", type: "number", defaultValue: 12000 },
      { id: "interval", label: "Change Interval (miles)", type: "number", defaultValue: 5000 },
      { id: "costPerChange", label: "Cost Per Change ($)", type: "number", defaultValue: 65, prefix: "$" },
    ],
    calculate: (v) => {
      const changes = Math.ceil(v.milesPerYear / v.interval);
      const annual = changes * v.costPerChange;
      return [
        { label: "Changes Per Year", value: `${changes}` },
        { label: "Annual Cost", value: fmt(annual), highlight: true },
        { label: "Cost Per Mile", value: `$${(annual / v.milesPerYear).toFixed(4)}` },
      ];
    },
    formula: defFormula, howToUse: "Enter miles per year, interval, and cost per change.", faqs: defFaqs("Oil Change Calculator"), relatedCalcs: b3Rel("oil-change-calculator"),
  },
  {
    slug: "car-insurance-calculator", name: "Car Insurance Estimator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Automotive",
    description: "Estimate annual car insurance costs.",
    metaDescription: "Free car insurance cost estimator. Enter your car's value, driver age, and deductible to estimate your annual and monthly insurance premiums.",
    icon: "layers",
    inputs: [
      { id: "carValue", label: "Car Value ($)", type: "number", defaultValue: 25000, prefix: "$" },
      { id: "age", label: "Driver Age", type: "number", defaultValue: 30 },
      { id: "deductible", label: "Deductible ($)", type: "number", defaultValue: 500, prefix: "$" },
    ],
    calculate: (v) => {
      let base = v.carValue * 0.04;
      if (v.age < 25) base *= 1.5;
      else if (v.age > 65) base *= 1.2;
      const annual = base * (1 - (v.deductible / 5000) * 0.3);
      return [
        { label: "Est. Annual Premium", value: fmt(annual), highlight: true },
        { label: "Monthly Premium", value: fmt(annual / 12) },
        { label: "Daily Cost", value: fmt(annual / 365) },
      ];
    },
    formula: defFormula, howToUse: "Enter car value, driver age, and deductible.", faqs: defFaqs("Car Insurance Estimator"), relatedCalcs: b3Rel("car-insurance-calculator"),
  },

  // ═══ REAL ESTATE ═══
  {
    slug: "home-affordability-calculator", name: "Home Affordability Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Real Estate",
    description: "Determine how much home you can afford.",
    metaDescription: "Free home affordability calculator. Enter income, monthly debts, down payment, and interest rate to estimate the maximum home price you can afford.",
    icon: "layers",
    inputs: [
      { id: "income", label: "Annual Gross Income ($)", type: "number", defaultValue: 85000, prefix: "$" },
      { id: "monthlyDebts", label: "Monthly Debts ($)", type: "number", defaultValue: 500, prefix: "$" },
      { id: "downPayment", label: "Down Payment ($)", type: "number", defaultValue: 40000, prefix: "$" },
      { id: "rate", label: "Interest Rate (%)", type: "number", defaultValue: 6.5, step: 0.1 },
    ],
    calculate: (v) => {
      const mi = v.income / 12;
      const maxPmt = Math.min(mi * 0.28, mi * 0.36 - v.monthlyDebts);
      const r = v.rate / 100 / 12;
      const loan = maxPmt > 0 ? maxPmt * ((1 - Math.pow(1 + r, -360)) / r) : 0;
      return [
        { label: "Max Home Price", value: fmt0(loan + v.downPayment), highlight: true },
        { label: "Max Loan Amount", value: fmt0(loan) },
        { label: "Max Monthly Payment", value: fmt(maxPmt) },
        { label: "DTI Ratio", value: `${num(((maxPmt + v.monthlyDebts) / mi) * 100)}%` },
      ];
    },
    formula: defFormula, howToUse: "Enter income, debts, down payment, and interest rate.", faqs: defFaqs("Home Affordability Calculator"), relatedCalcs: b3Rel("home-affordability-calculator"),
  },
  {
    slug: "moving-cost-calculator", name: "Moving Cost Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Real Estate",
    description: "Estimate moving costs based on distance and home size.",
    metaDescription: "Free moving cost calculator.",
    icon: "layers",
    inputs: [
      { id: "distance", label: "Distance (miles)", type: "number", defaultValue: 500 },
      { id: "rooms", label: "Number of Rooms", type: "number", defaultValue: 3, min: 1 },
      { id: "packing", label: "Pro Packing (1=Yes, 0=No)", type: "number", defaultValue: 1, min: 0, max: 1 },
    ],
    calculate: (v) => {
      const local = v.distance < 100;
      const labor = local ? v.rooms * 400 : v.rooms * 600;
      const transport = local ? 500 : v.distance * 0.5 * (v.rooms * 1500 / 1000);
      const packing = v.packing ? v.rooms * 300 : 0;
      return [
        { label: "Estimated Total", value: fmt0(labor + transport + packing), highlight: true },
        { label: "Labor Cost", value: fmt0(labor) },
        { label: "Transport Cost", value: fmt0(transport) },
        { label: "Packing Cost", value: v.packing ? fmt0(packing) : "DIY" },
      ];
    },
    formula: defFormula, howToUse: "Enter distance, rooms, and packing preference.", faqs: defFaqs("Moving Cost Calculator"), relatedCalcs: b3Rel("moving-cost-calculator"),
  },
  {
    slug: "closing-cost-calculator", name: "Closing Cost Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Real Estate",
    description: "Estimate closing costs when buying a home.",
    metaDescription: "Free closing cost calculator. Enter the home price and loan amount to estimate total closing costs, including origination fees and title insurance.",
    icon: "layers",
    inputs: [
      { id: "homePrice", label: "Home Price ($)", type: "number", defaultValue: 350000, prefix: "$" },
      { id: "loanAmount", label: "Loan Amount ($)", type: "number", defaultValue: 280000, prefix: "$" },
    ],
    calculate: (v) => {
      const orig = v.loanAmount * 0.01;
      const title = v.homePrice * 0.005;
      const escrow = v.homePrice * 0.01;
      const total = orig + 500 + 400 + title + 150 + escrow;
      return [
        { label: "Est. Closing Costs", value: fmt(total), highlight: true },
        { label: "Loan Origination", value: fmt(orig) },
        { label: "Title Insurance", value: fmt(title) },
        { label: "% of Home Price", value: `${num((total / v.homePrice) * 100)}%` },
      ];
    },
    formula: defFormula, howToUse: "Enter home price and loan amount.", faqs: defFaqs("Closing Cost Calculator"), relatedCalcs: b3Rel("closing-cost-calculator"),
  },

  // ═══ FOOD & NUTRITION ═══
  {
    slug: "water-intake-calculator", name: "Water Intake Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Food & Nutrition",
    description: "Calculate daily water intake recommendation.",
    metaDescription: "Free water intake calculator.",
    icon: "layers",
    inputs: [
      { id: "weight", label: "Weight (lbs)", type: "number", defaultValue: 160 },
      { id: "activity", label: "Activity (1=Low, 2=Med, 3=High)", type: "number", defaultValue: 2, min: 1, max: 3 },
    ],
    calculate: (v) => {
      const base = v.weight * 0.5;
      const mult = v.activity === 1 ? 1 : v.activity === 2 ? 1.2 : 1.5;
      const oz = base * mult;
      return [
        { label: "Daily Water", value: `${num(oz)} oz`, highlight: true },
        { label: "Cups Per Day", value: `${num(oz / 8)} cups` },
        { label: "Liters Per Day", value: `${num(oz * 0.0296)} L` },
      ];
    },
    formula: defFormula, howToUse: "Enter weight and activity level.", faqs: defFaqs("Water Intake Calculator"), relatedCalcs: b3Rel("water-intake-calculator"),
  },
  {
    slug: "caffeine-calculator", name: "Caffeine Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Food & Nutrition",
    description: "Track your daily caffeine intake.",
    metaDescription: "Free caffeine intake calculator. Total the caffeine in your daily coffee, tea, soda, and energy drinks and compare it with the recommended safe limit.",
    icon: "layers",
    inputs: [
      { id: "coffee", label: "Cups of Coffee", type: "number", defaultValue: 2 },
      { id: "tea", label: "Cups of Tea", type: "number", defaultValue: 1 },
      { id: "soda", label: "Cans of Soda", type: "number", defaultValue: 0 },
      { id: "energy", label: "Energy Drinks", type: "number", defaultValue: 0 },
    ],
    calculate: (v) => {
      const total = v.coffee * 95 + v.tea * 47 + v.soda * 40 + v.energy * 160;
      return [
        { label: "Total Caffeine", value: `${total} mg`, highlight: true },
        { label: "Safe Daily Limit", value: "400 mg" },
        { label: "Status", value: total <= 400 ? "Within Safe Limit" : "Exceeds Limit" },
        { label: "% of Limit", value: `${num((total / 400) * 100)}%` },
      ];
    },
    formula: defFormula, howToUse: "Enter number of each beverage consumed.", faqs: defFaqs("Caffeine Calculator"), relatedCalcs: b3Rel("caffeine-calculator"),
  },
  {
    slug: "protein-calculator", name: "Protein Intake Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Food & Nutrition",
    description: "Calculate daily protein needs.",
    metaDescription: "Free protein intake calculator.",
    icon: "layers",
    inputs: [
      { id: "weight", label: "Weight (lbs)", type: "number", defaultValue: 160 },
      { id: "goal", label: "Goal (1=Maintain, 2=Lose, 3=Build)", type: "number", defaultValue: 1, min: 1, max: 3 },
      { id: "activity", label: "Activity (1=Sedentary, 2=Active, 3=Athlete)", type: "number", defaultValue: 2, min: 1, max: 3 },
    ],
    calculate: (v) => {
      const kg = v.weight * 0.4536;
      const factors: Record<string, number> = { "11": 0.8, "12": 0.8, "13": 1.2, "21": 1.0, "22": 1.2, "23": 1.4, "31": 1.6, "32": 1.8, "33": 2.2 };
      const f = factors[`${v.goal}${v.activity}`] || 1.0;
      const protein = kg * f;
      return [
        { label: "Daily Protein", value: `${num(protein)}g`, highlight: true },
        { label: "Per Meal (3)", value: `${num(protein / 3)}g` },
        { label: "Per Meal (4)", value: `${num(protein / 4)}g` },
        { label: "Multiplier", value: `${f}g/kg` },
      ];
    },
    formula: defFormula, howToUse: "Enter weight, goal, and activity level.", faqs: defFaqs("Protein Intake Calculator"), relatedCalcs: b3Rel("protein-calculator"),
  },

  // ═══ SAVINGS & BUDGETING ═══
  {
    slug: "emergency-fund-calculator", name: "Emergency Fund Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Savings & Budgeting",
    description: "Calculate how much you need in your emergency fund.",
    metaDescription: "Free emergency fund calculator.",
    icon: "layers",
    inputs: [
      { id: "monthlyExpenses", label: "Monthly Expenses ($)", type: "number", defaultValue: 3500, prefix: "$" },
      { id: "months", label: "Months of Coverage", type: "number", defaultValue: 6, min: 3, max: 12 },
      { id: "currentSavings", label: "Current Savings ($)", type: "number", defaultValue: 5000, prefix: "$" },
    ],
    calculate: (v) => {
      const target = v.monthlyExpenses * v.months;
      const gap = Math.max(0, target - v.currentSavings);
      return [
        { label: "Target Fund", value: fmt0(target), highlight: true },
        { label: "Current Savings", value: fmt0(v.currentSavings) },
        { label: "Still Needed", value: fmt0(gap) },
        { label: "Progress", value: `${num(Math.min(100, (v.currentSavings / target) * 100))}%` },
      ];
    },
    formula: defFormula, howToUse: "Enter monthly expenses, months of coverage, and current savings.", faqs: defFaqs("Emergency Fund Calculator"), relatedCalcs: b3Rel("emergency-fund-calculator"),
  },
  {
    slug: "savings-goal-calculator", name: "Savings Goal Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Savings & Budgeting",
    description: "Calculate monthly savings needed to reach a goal.",
    metaDescription: "Free savings goal calculator.",
    icon: "layers",
    inputs: [
      { id: "goal", label: "Savings Goal ($)", type: "number", defaultValue: 20000, prefix: "$" },
      { id: "current", label: "Current Savings ($)", type: "number", defaultValue: 2000, prefix: "$" },
      { id: "months", label: "Time Frame (months)", type: "number", defaultValue: 24 },
      { id: "rate", label: "Annual Interest (%)", type: "number", defaultValue: 4.5, step: 0.1 },
    ],
    calculate: (v) => {
      const needed = v.goal - v.current;
      const r = v.rate / 100 / 12;
      const monthly = r > 0 ? (needed * r) / (Math.pow(1 + r, v.months) - 1) : needed / v.months;
      return [
        { label: "Monthly Savings", value: fmt(monthly), highlight: true },
        { label: "Remaining to Goal", value: fmt(needed) },
        { label: "Weekly Amount", value: fmt(monthly / 4.33) },
      ];
    },
    formula: defFormula, howToUse: "Enter goal, current savings, time frame, and interest rate.", faqs: defFaqs("Savings Goal Calculator"), relatedCalcs: b3Rel("savings-goal-calculator"),
  },
  {
    slug: "inflation-calculator", name: "Inflation Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Savings & Budgeting",
    description: "Calculate the impact of inflation on purchasing power.",
    metaDescription: "Free inflation calculator.",
    icon: "layers",
    inputs: [
      { id: "amount", label: "Current Amount ($)", type: "number", defaultValue: 1000, prefix: "$" },
      { id: "rate", label: "Inflation Rate (%)", type: "number", defaultValue: 3, step: 0.1 },
      { id: "years", label: "Years", type: "number", defaultValue: 10 },
    ],
    calculate: (v) => {
      const futureVal = v.amount * Math.pow(1 + v.rate / 100, v.years);
      const purchPower = v.amount / Math.pow(1 + v.rate / 100, v.years);
      return [
        { label: "Future Cost Equivalent", value: fmt(futureVal), highlight: true },
        { label: "Future Purchasing Power", value: fmt(purchPower) },
        { label: "Value Lost", value: fmt(v.amount - purchPower) },
        { label: "Total Inflation", value: `${num(((futureVal / v.amount) - 1) * 100)}%` },
      ];
    },
    formula: { expression: "FV = PV × (1 + r)^n", variables: ["PV = Present value", "r = Inflation rate", "n = Years"] },
    howToUse: "Enter current amount, inflation rate, and years.", faqs: defFaqs("Inflation Calculator"), relatedCalcs: b3Rel("inflation-calculator"),
  },

  // ═══ PRINTING & DESIGN ═══
  {
    slug: "dpi-calculator", name: "DPI Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Printing & Design",
    description: "Calculate print quality DPI from pixel dimensions.",
    metaDescription: "Free DPI calculator for printing.",
    icon: "layers",
    inputs: [
      { id: "widthPx", label: "Image Width (pixels)", type: "number", defaultValue: 3000 },
      { id: "heightPx", label: "Image Height (pixels)", type: "number", defaultValue: 2000 },
      { id: "widthIn", label: "Print Width (inches)", type: "number", defaultValue: 10 },
    ],
    calculate: (v) => {
      const dpi = v.widthPx / v.widthIn;
      const quality = dpi >= 300 ? "Excellent" : dpi >= 150 ? "Good" : dpi >= 72 ? "Fair" : "Poor";
      return [
        { label: "DPI", value: `${Math.round(dpi)}`, highlight: true },
        { label: "Print Size", value: `${num(v.widthIn)}" × ${num(v.heightPx / dpi)}"` },
        { label: "Quality", value: quality },
        { label: "Megapixels", value: `${num((v.widthPx * v.heightPx) / 1000000)} MP` },
      ];
    },
    formula: defFormula, howToUse: "Enter image pixel dimensions and desired print width.", faqs: defFaqs("DPI Calculator"), relatedCalcs: b3Rel("dpi-calculator"),
  },
  {
    slug: "aspect-ratio-calculator", name: "Aspect Ratio Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Printing & Design",
    description: "Calculate and resize dimensions maintaining aspect ratio.",
    metaDescription: "Free aspect ratio calculator.",
    icon: "layers",
    inputs: [
      { id: "width", label: "Original Width", type: "number", defaultValue: 1920 },
      { id: "height", label: "Original Height", type: "number", defaultValue: 1080 },
      { id: "newWidth", label: "New Width", type: "number", defaultValue: 1280 },
    ],
    calculate: (v) => {
      const ratio = v.width / v.height;
      const newH = Math.round(v.newWidth / ratio);
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
      const g = gcd(v.width, v.height);
      return [
        { label: "Aspect Ratio", value: `${v.width / g}:${v.height / g}`, highlight: true },
        { label: "Decimal Ratio", value: num(ratio) },
        { label: "New Dimensions", value: `${v.newWidth} × ${newH}` },
        { label: "Scale Factor", value: `${num((v.newWidth / v.width) * 100)}%` },
      ];
    },
    formula: defFormula, howToUse: "Enter original dimensions and desired new width.", faqs: defFaqs("Aspect Ratio Calculator"), relatedCalcs: b3Rel("aspect-ratio-calculator"),
  },

  // ═══ MATH & NUMBERS ═══
  {
    slug: "roman-numeral-converter", name: "Roman Numeral Converter", category: "Other Calculators", categorySlug: "other",
    subcategory: "Math & Numbers",
    description: "Convert between Arabic numbers and Roman numerals.",
    metaDescription: "Free Roman numeral converter.",
    icon: "layers",
    inputs: [{ id: "number", label: "Number (1-3999)", type: "number", defaultValue: 2026, min: 1, max: 3999 }],
    calculate: (v) => {
      const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
      const syms = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
      let n = Math.floor(v.number); let roman = "";
      for (let i = 0; i < vals.length; i++) while (n >= vals[i]) { roman += syms[i]; n -= vals[i]; }
      return [
        { label: "Roman Numeral", value: roman, highlight: true },
        { label: "Arabic Number", value: `${v.number}` },
      ];
    },
    formula: defFormula, howToUse: "Enter a number between 1 and 3999.", faqs: defFaqs("Roman Numeral Converter"), relatedCalcs: b3Rel("roman-numeral-converter"),
  },
  {
    slug: "binary-converter", name: "Binary Converter", category: "Other Calculators", categorySlug: "other",
    subcategory: "Math & Numbers",
    description: "Convert numbers between decimal, binary, octal, and hex.",
    metaDescription: "Free binary converter.",
    icon: "layers",
    inputs: [{ id: "decimal", label: "Decimal Number", type: "number", defaultValue: 255, min: 0 }],
    calculate: (v) => {
      const n = Math.floor(v.decimal);
      return [
        { label: "Binary", value: n.toString(2), highlight: true },
        { label: "Octal", value: n.toString(8) },
        { label: "Hexadecimal", value: n.toString(16).toUpperCase() },
        { label: "Decimal", value: `${n}` },
      ];
    },
    formula: defFormula, howToUse: "Enter a decimal number.", faqs: defFaqs("Binary Converter"), relatedCalcs: b3Rel("binary-converter"),
  },
  {
    slug: "percentage-change-calculator", name: "Percentage Change Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Math & Numbers",
    description: "Calculate percentage change between two values.",
    metaDescription: "Free percentage change calculator. Enter old and new values to find the percentage increase or decrease between them, plus the absolute change.",
    icon: "layers",
    inputs: [
      { id: "oldVal", label: "Old Value", type: "number", defaultValue: 50 },
      { id: "newVal", label: "New Value", type: "number", defaultValue: 75 },
    ],
    calculate: (v) => {
      const change = v.newVal - v.oldVal;
      const pct = v.oldVal !== 0 ? (change / Math.abs(v.oldVal)) * 100 : 0;
      return [
        { label: "Percentage Change", value: `${num(pct)}%`, highlight: true },
        { label: "Absolute Change", value: num(change) },
        { label: "Direction", value: change > 0 ? "Increase" : change < 0 ? "Decrease" : "No Change" },
      ];
    },
    formula: defFormula, howToUse: "Enter old and new values.", faqs: defFaqs("Percentage Change Calculator"), relatedCalcs: b3Rel("percentage-change-calculator"),
  },
  {
    slug: "random-number-generator", name: "Random Number Generator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Math & Numbers",
    description: "Generate random numbers within a range.",
    metaDescription: "Free random number generator.",
    icon: "layers",
    inputs: [
      { id: "min", label: "Minimum", type: "number", defaultValue: 1 },
      { id: "max", label: "Maximum", type: "number", defaultValue: 100 },
      { id: "count", label: "How Many", type: "number", defaultValue: 5, min: 1, max: 20 },
    ],
    calculate: (v) => {
      const nums = Array.from({ length: Math.min(v.count, 20) }, () => Math.floor(Math.random() * (v.max - v.min + 1)) + v.min);
      return [
        { label: "Random Numbers", value: nums.join(", "), highlight: true },
        { label: "Range", value: `${v.min} to ${v.max}` },
        { label: "Count", value: `${nums.length}` },
      ];
    },
    formula: defFormula, howToUse: "Enter min, max, and count.", faqs: defFaqs("Random Number Generator"), relatedCalcs: b3Rel("random-number-generator"),
  },

  // ═══ FITNESS & EXERCISE ═══
  {
    slug: "running-pace-calculator", name: "Running Pace Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Fitness & Exercise",
    description: "Calculate running pace, speed, and finish times.",
    metaDescription: "Free running pace calculator. Enter distance and time to find your pace per mile and kilometer, your speed, and predicted race finish times.",
    icon: "layers",
    inputs: [
      { id: "distance", label: "Distance (miles)", type: "number", defaultValue: 5, step: 0.1 },
      { id: "hours", label: "Hours", type: "number", defaultValue: 0 },
      { id: "minutes", label: "Minutes", type: "number", defaultValue: 40 },
      { id: "seconds", label: "Seconds", type: "number", defaultValue: 0 },
    ],
    calculate: (v) => {
      const totalSec = v.hours * 3600 + v.minutes * 60 + v.seconds;
      const paceSec = v.distance > 0 ? totalSec / v.distance : 0;
      const pM = Math.floor(paceSec / 60);
      const pS = Math.round(paceSec % 60);
      const mph = v.distance > 0 && totalSec > 0 ? (v.distance / totalSec) * 3600 : 0;
      return [
        { label: "Pace (per mile)", value: `${pM}:${pS.toString().padStart(2, "0")}`, highlight: true },
        { label: "Speed", value: `${num(mph)} mph` },
        { label: "Speed (km/h)", value: `${num(mph * 1.60934)} km/h` },
      ];
    },
    formula: defFormula, howToUse: "Enter distance and total time.", faqs: defFaqs("Running Pace Calculator"), relatedCalcs: b3Rel("running-pace-calculator"),
  },
  {
    slug: "calories-burned-calculator", name: "Calories Burned Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Fitness & Exercise",
    description: "Estimate calories burned during exercise.",
    metaDescription: "Free calories burned calculator.",
    icon: "layers",
    inputs: [
      { id: "weight", label: "Weight (lbs)", type: "number", defaultValue: 160 },
      { id: "duration", label: "Duration (min)", type: "number", defaultValue: 30 },
      { id: "activity", label: "Activity (1=Walk, 2=Jog, 3=Run, 4=Bike, 5=Swim)", type: "number", defaultValue: 2, min: 1, max: 5 },
    ],
    calculate: (v) => {
      const mets: Record<number, number> = { 1: 3.5, 2: 7, 3: 9.8, 4: 7.5, 5: 8 };
      const names: Record<number, string> = { 1: "Walking", 2: "Jogging", 3: "Running", 4: "Cycling", 5: "Swimming" };
      const met = mets[v.activity] || 3.5;
      const cal = (met * 3.5 * v.weight * 0.4536 / 200) * v.duration;
      return [
        { label: "Calories Burned", value: `${Math.round(cal)} cal`, highlight: true },
        { label: "Activity", value: names[v.activity] || "Unknown" },
        { label: "MET Value", value: `${met}` },
        { label: "Cal/Minute", value: num(cal / v.duration) },
      ];
    },
    formula: defFormula, howToUse: "Enter weight, duration, and activity type.", faqs: defFaqs("Calories Burned Calculator"), relatedCalcs: b3Rel("calories-burned-calculator"),
  },
  {
    slug: "one-rep-max-calculator", name: "One Rep Max Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Fitness & Exercise",
    description: "Estimate your one-rep max for any lift.",
    metaDescription: "Free one rep max calculator.",
    icon: "layers",
    inputs: [
      { id: "weight", label: "Weight Lifted (lbs)", type: "number", defaultValue: 185 },
      { id: "reps", label: "Reps Performed", type: "number", defaultValue: 5, min: 1 },
    ],
    calculate: (v) => {
      const orm = v.weight * (1 + v.reps / 30);
      return [
        { label: "Estimated 1RM", value: `${Math.round(orm)} lbs`, highlight: true },
        { label: "90% (Heavy)", value: `${Math.round(orm * 0.9)} lbs` },
        { label: "80% (Moderate)", value: `${Math.round(orm * 0.8)} lbs` },
        { label: "70% (Light)", value: `${Math.round(orm * 0.7)} lbs` },
      ];
    },
    formula: { expression: "1RM = Weight × (1 + Reps/30)", variables: ["Epley formula"] },
    howToUse: "Enter weight lifted and reps completed.", faqs: defFaqs("One Rep Max Calculator"), relatedCalcs: b3Rel("one-rep-max-calculator"),
  },

  // ═══ ELECTRICITY & HOME ═══
  {
    slug: "led-savings-calculator", name: "LED Savings Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Electricity & Home",
    description: "Calculate savings switching to LED bulbs.",
    metaDescription: "Free LED savings calculator. Compare bulb count, wattage, and hours of use to see how much you save each year by switching to LED bulbs.",
    icon: "layers",
    inputs: [
      { id: "bulbs", label: "Number of Bulbs", type: "number", defaultValue: 20 },
      { id: "oldWatts", label: "Old Wattage", type: "number", defaultValue: 60 },
      { id: "newWatts", label: "LED Wattage", type: "number", defaultValue: 9 },
      { id: "hours", label: "Hours/Day", type: "number", defaultValue: 5 },
      { id: "rate", label: "Rate ($/kWh)", type: "number", defaultValue: 0.12, step: 0.01 },
    ],
    calculate: (v) => {
      const oldCost = v.bulbs * v.oldWatts * v.hours * 365 / 1000 * v.rate;
      const newCost = v.bulbs * v.newWatts * v.hours * 365 / 1000 * v.rate;
      return [
        { label: "Annual Savings", value: fmt(oldCost - newCost), highlight: true },
        { label: "Old Annual Cost", value: fmt(oldCost) },
        { label: "New Annual Cost", value: fmt(newCost) },
        { label: "Energy Reduction", value: `${num(((v.oldWatts - v.newWatts) / v.oldWatts) * 100)}%` },
      ];
    },
    formula: defFormula, howToUse: "Enter bulb count, wattages, hours, and electricity rate.", faqs: defFaqs("LED Savings Calculator"), relatedCalcs: b3Rel("led-savings-calculator"),
  },
  {
    slug: "hvac-sizing-calculator", name: "HVAC Sizing Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Electricity & Home",
    description: "Estimate HVAC tonnage needed for your home.",
    metaDescription: "Free HVAC sizing calculator. Enter your home's square footage and climate zone to estimate the AC tonnage and BTU capacity your home needs.",
    icon: "layers",
    inputs: [
      { id: "sqft", label: "Square Footage", type: "number", defaultValue: 2000 },
      { id: "climate", label: "Climate (1=Cold, 2=Moderate, 3=Hot)", type: "number", defaultValue: 2, min: 1, max: 3 },
    ],
    calculate: (v) => {
      const btuPer = v.climate === 1 ? 30 : v.climate === 2 ? 25 : 22;
      const btu = v.sqft * btuPer;
      const tons = btu / 12000;
      return [
        { label: "Recommended Tonnage", value: `${num(Math.ceil(tons * 2) / 2)} tons`, highlight: true },
        { label: "BTU Needed", value: num(btu) },
        { label: "BTU/sq ft", value: `${btuPer}` },
      ];
    },
    formula: defFormula, howToUse: "Enter square footage and climate zone.", faqs: defFaqs("HVAC Sizing Calculator"), relatedCalcs: b3Rel("hvac-sizing-calculator"),
  },
  {
    slug: "ceiling-fan-size-calculator", name: "Ceiling Fan Size Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Electricity & Home",
    description: "Find the ideal ceiling fan size for your room.",
    metaDescription: "Free ceiling fan size calculator. Enter your room's length and width to find the right ceiling fan blade size for the space, in inches.",
    icon: "layers",
    inputs: [
      { id: "length", label: "Room Length (ft)", type: "number", defaultValue: 14 },
      { id: "width", label: "Room Width (ft)", type: "number", defaultValue: 12 },
    ],
    calculate: (v) => {
      const area = v.length * v.width;
      let size = area <= 75 ? "29-36 in" : area <= 144 ? "36-42 in" : area <= 225 ? "44-50 in" : area <= 400 ? "50-54 in" : "54-72 in";
      return [
        { label: "Fan Size", value: size, highlight: true },
        { label: "Room Area", value: `${num(area)} sq ft` },
      ];
    },
    formula: defFormula, howToUse: "Enter room length and width.", faqs: defFaqs("Ceiling Fan Size Calculator"), relatedCalcs: b3Rel("ceiling-fan-size-calculator"),
  },

  // ═══ TRAVEL PLANNING ═══
  {
    slug: "road-trip-calculator", name: "Road Trip Cost Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Travel Planning",
    description: "Estimate total road trip costs.",
    metaDescription: "Free road trip cost calculator.",
    icon: "layers",
    inputs: [
      { id: "distance", label: "Distance (miles)", type: "number", defaultValue: 1000 },
      { id: "mpg", label: "MPG", type: "number", defaultValue: 28 },
      { id: "gasPrice", label: "Gas Price ($/gal)", type: "number", defaultValue: 3.5, prefix: "$", step: 0.01 },
      { id: "nights", label: "Hotel Nights", type: "number", defaultValue: 2 },
      { id: "hotelCost", label: "Hotel/Night ($)", type: "number", defaultValue: 120, prefix: "$" },
      { id: "foodPerDay", label: "Food/Day ($)", type: "number", defaultValue: 50, prefix: "$" },
    ],
    calculate: (v) => {
      const fuel = (v.distance / v.mpg) * v.gasPrice;
      const hotel = v.nights * v.hotelCost;
      const food = (v.nights + 1) * v.foodPerDay;
      return [
        { label: "Total Trip Cost", value: fmt(fuel + hotel + food), highlight: true },
        { label: "Fuel Cost", value: fmt(fuel) },
        { label: "Lodging Cost", value: fmt(hotel) },
        { label: "Food Cost", value: fmt(food) },
      ];
    },
    formula: defFormula, howToUse: "Enter distance, MPG, gas price, and trip details.", faqs: defFaqs("Road Trip Cost Calculator"), relatedCalcs: b3Rel("road-trip-calculator"),
  },
  {
    slug: "currency-exchange-calculator", name: "Currency Exchange Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Travel Planning",
    description: "Convert between currencies.",
    metaDescription: "Free currency exchange calculator.",
    icon: "layers",
    inputs: [
      { id: "amount", label: "Amount", type: "number", defaultValue: 1000 },
      { id: "rate", label: "Exchange Rate", type: "number", defaultValue: 0.85, step: 0.001 },
      { id: "fee", label: "Service Fee (%)", type: "number", defaultValue: 2, step: 0.1 },
    ],
    calculate: (v) => {
      const converted = v.amount * v.rate;
      const fee = converted * (v.fee / 100);
      return [
        { label: "Converted", value: num(converted) },
        { label: "Fee", value: num(fee) },
        { label: "You Receive", value: num(converted - fee), highlight: true },
        { label: "Effective Rate", value: num((converted - fee) / v.amount) },
      ];
    },
    formula: defFormula, howToUse: "Enter amount, exchange rate, and service fee.", faqs: defFaqs("Currency Exchange Calculator"), relatedCalcs: b3Rel("currency-exchange-calculator"),
  },
  {
    slug: "luggage-weight-calculator", name: "Luggage Weight Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Travel Planning",
    description: "Check luggage against airline weight limits.",
    metaDescription: "Free luggage weight calculator.",
    icon: "layers",
    inputs: [
      { id: "bag1", label: "Bag 1 (lbs)", type: "number", defaultValue: 42 },
      { id: "bag2", label: "Bag 2 (lbs)", type: "number", defaultValue: 38 },
      { id: "carry", label: "Carry-On (lbs)", type: "number", defaultValue: 15 },
      { id: "limit", label: "Limit Per Bag (lbs)", type: "number", defaultValue: 50 },
    ],
    calculate: (v) => [
      { label: "Total Weight", value: `${num(v.bag1 + v.bag2 + v.carry)} lbs`, highlight: true },
      { label: "Bag 1", value: `${v.bag1} lbs — ${v.bag1 <= v.limit ? "✓ OK" : "✗ Over!"}` },
      { label: "Bag 2", value: `${v.bag2} lbs — ${v.bag2 <= v.limit ? "✓ OK" : "✗ Over!"}` },
      { label: "Carry-On", value: `${v.carry} lbs` },
    ],
    formula: defFormula, howToUse: "Enter bag weights and airline limit.", faqs: defFaqs("Luggage Weight Calculator"), relatedCalcs: b3Rel("luggage-weight-calculator"),
  },

  // ═══ MISCELLANEOUS ═══
  {
    slug: "tip-split-calculator", name: "Tip & Bill Split Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Miscellaneous",
    description: "Split a restaurant bill with tip.",
    metaDescription: "Free tip and bill split calculator.",
    icon: "layers",
    inputs: [
      { id: "bill", label: "Bill ($)", type: "number", defaultValue: 120, prefix: "$" },
      { id: "tipPct", label: "Tip (%)", type: "number", defaultValue: 18 },
      { id: "people", label: "People", type: "number", defaultValue: 4, min: 1 },
    ],
    calculate: (v) => {
      const tip = v.bill * (v.tipPct / 100);
      const total = v.bill + tip;
      return [
        { label: "Per Person", value: fmt(total / v.people), highlight: true },
        { label: "Tip Amount", value: fmt(tip) },
        { label: "Total Bill", value: fmt(total) },
        { label: "Tip Per Person", value: fmt(tip / v.people) },
      ];
    },
    formula: defFormula, howToUse: "Enter bill, tip %, and number of people.", faqs: defFaqs("Tip & Bill Split Calculator"), relatedCalcs: b3Rel("tip-split-calculator"),
  },
  {
    slug: "age-in-days-calculator", name: "Age in Days Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Miscellaneous",
    description: "Find your exact age in days, hours, and minutes.",
    metaDescription: "Free age in days calculator.",
    icon: "layers",
    inputs: [
      { id: "month", label: "Birth Month (1-12)", type: "number", defaultValue: 6, min: 1, max: 12 },
      { id: "day", label: "Birth Day", type: "number", defaultValue: 15, min: 1, max: 31 },
      { id: "year", label: "Birth Year", type: "number", defaultValue: 1990 },
    ],
    calculate: (v) => {
      const birth = new Date(v.year, v.month - 1, v.day);
      const diff = Date.now() - birth.getTime();
      const days = Math.floor(diff / 86400000);
      return [
        { label: "Age in Days", value: num(days), highlight: true },
        { label: "Age in Weeks", value: num(Math.floor(days / 7)) },
        { label: "Age in Hours", value: num(Math.floor(diff / 3600000)) },
        { label: "Age in Minutes", value: num(Math.floor(diff / 60000)) },
      ];
    },
    formula: defFormula, howToUse: "Enter your birth date.", faqs: defFaqs("Age in Days Calculator"), relatedCalcs: b3Rel("age-in-days-calculator"),
  },
  {
    slug: "shoe-size-converter-intl", name: "Shoe Size Converter", category: "Other Calculators", categorySlug: "other",
    subcategory: "Miscellaneous",
    description: "Convert shoe sizes between US, UK, and EU.",
    metaDescription: "Free shoe size converter.",
    icon: "layers",
    inputs: [{ id: "usSize", label: "US Size (Men's)", type: "number", defaultValue: 10, step: 0.5 }],
    calculate: (v) => [
      { label: "US Size", value: `${v.usSize}` },
      { label: "UK Size", value: `${v.usSize - 0.5}`, highlight: true },
      { label: "EU Size", value: `${v.usSize + 33}` },
      { label: "CM", value: num((v.usSize + 18) * 0.847) },
    ],
    formula: defFormula, howToUse: "Enter US men's shoe size.", faqs: defFaqs("Shoe Size Converter"), relatedCalcs: b3Rel("shoe-size-converter-intl"),
  },

  // ═══ TECHNOLOGY ═══
  {
    slug: "screen-size-calculator", name: "Screen Size Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Technology",
    description: "Calculate screen dimensions from diagonal and aspect ratio.",
    metaDescription: "Free screen size calculator. Enter the diagonal size and aspect ratio to calculate a screen's exact width, height, and viewing area.",
    icon: "layers",
    inputs: [
      { id: "diagonal", label: "Diagonal (inches)", type: "number", defaultValue: 27, step: 0.1 },
      { id: "ratioW", label: "Aspect Width", type: "number", defaultValue: 16 },
      { id: "ratioH", label: "Aspect Height", type: "number", defaultValue: 9 },
    ],
    calculate: (v) => {
      const r = Math.sqrt(v.ratioW ** 2 + v.ratioH ** 2);
      const w = (v.diagonal / r) * v.ratioW;
      const h = (v.diagonal / r) * v.ratioH;
      return [
        { label: "Width", value: `${num(w)} in`, highlight: true },
        { label: "Height", value: `${num(h)} in` },
        { label: "Area", value: `${num(w * h)} sq in` },
        { label: "Ratio", value: `${v.ratioW}:${v.ratioH}` },
      ];
    },
    formula: defFormula, howToUse: "Enter diagonal size and aspect ratio.", faqs: defFaqs("Screen Size Calculator"), relatedCalcs: b3Rel("screen-size-calculator"),
  },
  {
    slug: "internet-speed-calculator", name: "Download Time Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Technology",
    description: "Estimate file download time.",
    metaDescription: "Free download time calculator.",
    icon: "layers",
    inputs: [
      { id: "fileSize", label: "File Size (GB)", type: "number", defaultValue: 5, step: 0.1 },
      { id: "speed", label: "Speed (Mbps)", type: "number", defaultValue: 100 },
    ],
    calculate: (v) => {
      const secs = (v.fileSize * 1024 * 8) / v.speed;
      const m = Math.floor(secs / 60);
      const s = Math.round(secs % 60);
      const h = Math.floor(m / 60);
      const timeStr = h > 0 ? `${h}h ${m % 60}m ${s}s` : m > 0 ? `${m}m ${s}s` : `${s}s`;
      return [
        { label: "Download Time", value: timeStr, highlight: true },
        { label: "File Size", value: `${v.fileSize} GB` },
        { label: "Speed", value: `${v.speed} Mbps` },
        { label: "MB/second", value: num(v.speed / 8) },
      ];
    },
    formula: defFormula, howToUse: "Enter file size and connection speed.", faqs: defFaqs("Download Time Calculator"), relatedCalcs: b3Rel("internet-speed-calculator"),
  },
  {
    slug: "battery-life-calculator", name: "Battery Life Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Technology",
    description: "Estimate device battery life.",
    metaDescription: "Free battery life calculator.",
    icon: "layers",
    inputs: [
      { id: "capacity", label: "Battery (mAh)", type: "number", defaultValue: 5000 },
      { id: "consumption", label: "Avg Draw (mA)", type: "number", defaultValue: 400 },
    ],
    calculate: (v) => {
      const hrs = v.consumption > 0 ? v.capacity / v.consumption : 0;
      return [
        { label: "Battery Life", value: `${Math.floor(hrs)}h ${Math.round((hrs % 1) * 60)}m`, highlight: true },
        { label: "Total Hours", value: num(hrs) },
        { label: "Capacity", value: `${v.capacity} mAh` },
      ];
    },
    formula: defFormula, howToUse: "Enter battery capacity and average power draw.", faqs: defFaqs("Battery Life Calculator"), relatedCalcs: b3Rel("battery-life-calculator"),
  },

  // ═══ CONSTRUCTION & HOME ═══
  {
    slug: "wallpaper-calculator", name: "Wallpaper Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Construction & Home",
    description: "Calculate wallpaper rolls needed for a room.",
    metaDescription: "Free wallpaper calculator.",
    icon: "layers",
    inputs: [
      { id: "length", label: "Room Length (ft)", type: "number", defaultValue: 14 },
      { id: "width", label: "Room Width (ft)", type: "number", defaultValue: 12 },
      { id: "height", label: "Ceiling Height (ft)", type: "number", defaultValue: 9 },
      { id: "rollCoverage", label: "Roll Coverage (sq ft)", type: "number", defaultValue: 56 },
    ],
    calculate: (v) => {
      const wallArea = 2 * (v.length + v.width) * v.height;
      const net = wallArea * 0.85;
      const rolls = Math.ceil(net / v.rollCoverage);
      return [
        { label: "Rolls Needed", value: `${rolls}`, highlight: true },
        { label: "Wall Area", value: `${num(wallArea)} sq ft` },
        { label: "Net Area", value: `${num(net)} sq ft` },
        { label: "With 10% Waste", value: `${Math.ceil(rolls * 1.1)} rolls` },
      ];
    },
    formula: defFormula, howToUse: "Enter room dimensions and roll coverage.", faqs: defFaqs("Wallpaper Calculator"), relatedCalcs: b3Rel("wallpaper-calculator"),
  },
  {
    slug: "fence-calculator", name: "Fence Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Construction & Home",
    description: "Calculate materials for a fence project.",
    metaDescription: "Free fence calculator. Enter fence length, height, and post spacing to estimate the posts, rails, and pickets your fence will need.",
    icon: "layers",
    inputs: [
      { id: "length", label: "Fence Length (ft)", type: "number", defaultValue: 100 },
      { id: "height", label: "Fence Height (ft)", type: "number", defaultValue: 6 },
      { id: "postSpacing", label: "Post Spacing (ft)", type: "number", defaultValue: 8 },
    ],
    calculate: (v) => {
      const posts = Math.ceil(v.length / v.postSpacing) + 1;
      const sections = posts - 1;
      return [
        { label: "Posts Needed", value: `${posts}`, highlight: true },
        { label: "Rails Needed", value: `${sections * 3}` },
        { label: "Pickets (6\" wide)", value: `${Math.ceil(v.length / 0.5)}` },
        { label: "Sections", value: `${sections}` },
      ];
    },
    formula: defFormula, howToUse: "Enter fence length, height, and post spacing.", faqs: defFaqs("Fence Calculator"), relatedCalcs: b3Rel("fence-calculator"),
  },
];
