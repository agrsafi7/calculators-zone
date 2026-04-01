import { CalculatorConfig } from "@/components/CalculatorTemplate";

const fmt = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);
const fmt0 = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
const num = (n: number) => new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(n);

const batch3Rel = (exclude: string) => [
  { name: "Inflation Calculator", slug: "inflation-calculator", icon: "layers", category: "other" },
  { name: "Electricity Cost", slug: "electricity-cost-calculator", icon: "layers", category: "other" },
  { name: "Pool Volume", slug: "pool-volume-calculator", icon: "layers", category: "other" },
  { name: "Baby Due Date", slug: "baby-due-date-calculator", icon: "layers", category: "other" },
].filter(c => c.slug !== exclude);

export const otherCalculatorsBatch3: CalculatorConfig[] = [
  // ═══════════════════════════════════════
  // PARENTING & FAMILY
  // ═══════════════════════════════════════
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
      return {
        results: [
          { label: "Estimated Due Date", value: due.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) },
          { label: "Weeks Pregnant", value: `${weeksPregnant} weeks` },
          { label: "Current Trimester", value: trimester, highlight: true },
        ],
        relatedCalculators: batch3Rel("baby-due-date-calculator"),
      };
    },
  },
  {
    slug: "diaper-cost-calculator", name: "Diaper Cost Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Parenting & Family",
    description: "Estimate how much you'll spend on diapers in the first year.",
    metaDescription: "Free diaper cost calculator. Estimate yearly diaper expenses for your baby.",
    icon: "layers",
    inputs: [
      { id: "perDay", label: "Diapers Per Day", type: "number", defaultValue: 8 },
      { id: "costPer", label: "Cost Per Diaper ($)", type: "number", defaultValue: 0.25, prefix: "$", step: 0.01 },
      { id: "months", label: "Number of Months", type: "number", defaultValue: 12 },
    ],
    calculate: (v) => {
      const total = v.perDay * v.costPer * 30.44 * v.months;
      const monthly = total / v.months;
      return {
        results: [
          { label: "Total Cost", value: fmt(total), highlight: true },
          { label: "Monthly Cost", value: fmt(monthly) },
          { label: "Total Diapers", value: num(v.perDay * 30.44 * v.months) },
        ],
        relatedCalculators: batch3Rel("diaper-cost-calculator"),
      };
    },
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
      const predicted = v.gender === 1
        ? (v.fatherHeight + v.motherHeight + 5) / 2
        : (v.fatherHeight + v.motherHeight - 5) / 2;
      const ft = Math.floor(predicted / 12);
      const inches = Math.round(predicted % 12);
      return {
        results: [
          { label: "Predicted Adult Height", value: `${ft}' ${inches}" (${num(predicted)} in)`, highlight: true },
          { label: "Method", value: "Mid-Parent Height Formula" },
        ],
        relatedCalculators: batch3Rel("child-height-predictor"),
      };
    },
  },

  // ═══════════════════════════════════════
  // POOL & OUTDOOR
  // ═══════════════════════════════════════
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
      const liters = gallons * 3.78541;
      return {
        results: [
          { label: "Volume (Gallons)", value: num(gallons), highlight: true },
          { label: "Volume (Liters)", value: num(liters) },
          { label: "Cubic Feet", value: num(cubicFt) },
        ],
        relatedCalculators: batch3Rel("pool-volume-calculator"),
      };
    },
  },
  {
    slug: "pool-chemical-calculator", name: "Pool Chemical Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Pool & Outdoor",
    description: "Calculate chlorine and chemical needs for your pool.",
    metaDescription: "Free pool chemical calculator. Determine chlorine and pH adjustment amounts.",
    icon: "layers",
    inputs: [
      { id: "gallons", label: "Pool Volume (gallons)", type: "number", defaultValue: 15000 },
      { id: "currentCl", label: "Current Chlorine (ppm)", type: "number", defaultValue: 1, step: 0.1 },
      { id: "targetCl", label: "Target Chlorine (ppm)", type: "number", defaultValue: 3, step: 0.1 },
    ],
    calculate: (v) => {
      const ppmNeeded = v.targetCl - v.currentCl;
      const ozBleach = (ppmNeeded * v.gallons) / (7500 * 0.0785);
      return {
        results: [
          { label: "Chlorine Needed", value: `${num(ppmNeeded)} ppm` },
          { label: "Liquid Bleach (6%)", value: `${num(ozBleach)} fl oz`, highlight: true },
          { label: "Pool Size", value: `${num(v.gallons)} gallons` },
        ],
        relatedCalculators: batch3Rel("pool-chemical-calculator"),
      };
    },
  },
  {
    slug: "deck-stain-calculator", name: "Deck Stain Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Pool & Outdoor",
    description: "Calculate how much stain you need for your deck.",
    metaDescription: "Free deck stain calculator. Estimate stain needed for your deck project.",
    icon: "layers",
    inputs: [
      { id: "length", label: "Deck Length (feet)", type: "number", defaultValue: 20 },
      { id: "width", label: "Deck Width (feet)", type: "number", defaultValue: 12 },
      { id: "coats", label: "Number of Coats", type: "number", defaultValue: 2, min: 1, max: 3 },
      { id: "coverage", label: "Stain Coverage (sq ft/gallon)", type: "number", defaultValue: 250 },
    ],
    calculate: (v) => {
      const area = v.length * v.width;
      const totalArea = area * v.coats;
      const gallons = totalArea / v.coverage;
      return {
        results: [
          { label: "Deck Area", value: `${num(area)} sq ft` },
          { label: "Stain Needed", value: `${Math.ceil(gallons)} gallons`, highlight: true },
          { label: "Total Coverage Area", value: `${num(totalArea)} sq ft` },
        ],
        relatedCalculators: batch3Rel("deck-stain-calculator"),
      };
    },
  },

  // ═══════════════════════════════════════
  // BUSINESS & FREELANCE
  // ═══════════════════════════════════════
  {
    slug: "hourly-rate-calculator", name: "Hourly Rate Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Business & Freelance",
    description: "Calculate your ideal freelance hourly rate based on desired salary and expenses.",
    metaDescription: "Free hourly rate calculator for freelancers. Find your ideal billing rate.",
    icon: "layers",
    inputs: [
      { id: "salary", label: "Desired Annual Salary ($)", type: "number", defaultValue: 80000, prefix: "$" },
      { id: "expenses", label: "Annual Business Expenses ($)", type: "number", defaultValue: 10000, prefix: "$" },
      { id: "billableHours", label: "Billable Hours/Week", type: "number", defaultValue: 30 },
      { id: "vacWeeks", label: "Vacation Weeks/Year", type: "number", defaultValue: 3 },
    ],
    calculate: (v) => {
      const workWeeks = 52 - v.vacWeeks;
      const totalNeeded = v.salary + v.expenses;
      const hourly = totalNeeded / (workWeeks * v.billableHours);
      return {
        results: [
          { label: "Recommended Hourly Rate", value: fmt(hourly), highlight: true },
          { label: "Annual Revenue Needed", value: fmt0(totalNeeded) },
          { label: "Billable Hours/Year", value: num(workWeeks * v.billableHours) },
          { label: "Monthly Revenue", value: fmt(totalNeeded / 12) },
        ],
        relatedCalculators: batch3Rel("hourly-rate-calculator"),
      };
    },
  },
  {
    slug: "break-even-calculator", name: "Break-Even Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Business & Freelance",
    description: "Calculate the break-even point for your product or business.",
    metaDescription: "Free break-even calculator. Find how many units you need to sell to cover costs.",
    icon: "layers",
    inputs: [
      { id: "fixedCosts", label: "Fixed Costs ($)", type: "number", defaultValue: 5000, prefix: "$" },
      { id: "pricePerUnit", label: "Price Per Unit ($)", type: "number", defaultValue: 50, prefix: "$" },
      { id: "costPerUnit", label: "Variable Cost Per Unit ($)", type: "number", defaultValue: 20, prefix: "$" },
    ],
    calculate: (v) => {
      const margin = v.pricePerUnit - v.costPerUnit;
      const breakEvenUnits = margin > 0 ? Math.ceil(v.fixedCosts / margin) : 0;
      const breakEvenRevenue = breakEvenUnits * v.pricePerUnit;
      return {
        results: [
          { label: "Break-Even Units", value: num(breakEvenUnits), highlight: true },
          { label: "Break-Even Revenue", value: fmt(breakEvenRevenue) },
          { label: "Profit Margin Per Unit", value: fmt(margin) },
          { label: "Contribution Margin %", value: `${num((margin / v.pricePerUnit) * 100)}%` },
        ],
        chartData: Array.from({ length: Math.min(breakEvenUnits * 2, 50) + 1 }, (_, i) => {
          const units = Math.round((i / 50) * breakEvenUnits * 2);
          return { name: `${units}`, Revenue: units * v.pricePerUnit, "Total Cost": v.fixedCosts + units * v.costPerUnit };
        }),
        chartConfig: { Revenue: { color: "#2563eb" }, "Total Cost": { color: "#ef4444" } },
        relatedCalculators: batch3Rel("break-even-calculator"),
      };
    },
  },
  {
    slug: "invoice-calculator", name: "Invoice Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Business & Freelance",
    description: "Calculate invoice totals with tax and discount.",
    metaDescription: "Free invoice calculator. Compute subtotal, tax, discount, and total for invoices.",
    icon: "layers",
    inputs: [
      { id: "subtotal", label: "Subtotal ($)", type: "number", defaultValue: 1500, prefix: "$" },
      { id: "discount", label: "Discount (%)", type: "number", defaultValue: 10 },
      { id: "taxRate", label: "Tax Rate (%)", type: "number", defaultValue: 8.25, step: 0.01 },
    ],
    calculate: (v) => {
      const discountAmt = v.subtotal * (v.discount / 100);
      const afterDiscount = v.subtotal - discountAmt;
      const tax = afterDiscount * (v.taxRate / 100);
      const total = afterDiscount + tax;
      return {
        results: [
          { label: "Subtotal", value: fmt(v.subtotal) },
          { label: "Discount", value: `-${fmt(discountAmt)}` },
          { label: "Tax", value: `+${fmt(tax)}` },
          { label: "Total Due", value: fmt(total), highlight: true },
        ],
        relatedCalculators: batch3Rel("invoice-calculator"),
      };
    },
  },
  {
    slug: "profit-margin-calculator", name: "Profit Margin Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Business & Freelance",
    description: "Calculate gross and net profit margins for your business.",
    metaDescription: "Free profit margin calculator. Find gross and net margins.",
    icon: "layers",
    inputs: [
      { id: "revenue", label: "Revenue ($)", type: "number", defaultValue: 50000, prefix: "$" },
      { id: "cogs", label: "Cost of Goods Sold ($)", type: "number", defaultValue: 20000, prefix: "$" },
      { id: "expenses", label: "Operating Expenses ($)", type: "number", defaultValue: 15000, prefix: "$" },
    ],
    calculate: (v) => {
      const grossProfit = v.revenue - v.cogs;
      const netProfit = grossProfit - v.expenses;
      const grossMargin = (grossProfit / v.revenue) * 100;
      const netMargin = (netProfit / v.revenue) * 100;
      return {
        results: [
          { label: "Gross Profit", value: fmt(grossProfit) },
          { label: "Gross Margin", value: `${num(grossMargin)}%` },
          { label: "Net Profit", value: fmt(netProfit), highlight: true },
          { label: "Net Margin", value: `${num(netMargin)}%` },
        ],
        chartData: [
          { name: "COGS", value: v.cogs },
          { name: "Expenses", value: v.expenses },
          { name: "Net Profit", value: Math.max(0, netProfit) },
        ],
        chartConfig: { value: { color: "#2563eb" } },
        relatedCalculators: batch3Rel("profit-margin-calculator"),
      };
    },
  },

  // ═══════════════════════════════════════
  // AUTOMOTIVE (new additions)
  // ═══════════════════════════════════════
  {
    slug: "car-lease-calculator", name: "Car Lease Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Automotive",
    description: "Estimate monthly car lease payments.",
    metaDescription: "Free car lease calculator. Estimate monthly lease payments.",
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
      const capCost = v.msrp - v.down;
      const depreciation = (capCost - residualVal) / v.term;
      const finance = (capCost + residualVal) * v.rate;
      const monthly = depreciation + finance;
      const totalCost = monthly * v.term + v.down;
      return {
        results: [
          { label: "Monthly Payment", value: fmt(monthly), highlight: true },
          { label: "Total Lease Cost", value: fmt(totalCost) },
          { label: "Residual Value", value: fmt(residualVal) },
          { label: "APR Equivalent", value: `${num(v.rate * 2400)}%` },
        ],
        relatedCalculators: batch3Rel("car-lease-calculator"),
      };
    },
  },
  {
    slug: "oil-change-calculator", name: "Oil Change Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Automotive",
    description: "Track oil change intervals and annual cost.",
    metaDescription: "Free oil change interval calculator. Estimate annual oil change costs.",
    icon: "layers",
    inputs: [
      { id: "milesPerYear", label: "Miles Driven Per Year", type: "number", defaultValue: 12000 },
      { id: "interval", label: "Oil Change Interval (miles)", type: "number", defaultValue: 5000 },
      { id: "costPerChange", label: "Cost Per Oil Change ($)", type: "number", defaultValue: 65, prefix: "$" },
    ],
    calculate: (v) => {
      const changesPerYear = Math.ceil(v.milesPerYear / v.interval);
      const annualCost = changesPerYear * v.costPerChange;
      return {
        results: [
          { label: "Oil Changes Per Year", value: `${changesPerYear}` },
          { label: "Annual Cost", value: fmt(annualCost), highlight: true },
          { label: "Cost Per Mile", value: `$${(annualCost / v.milesPerYear).toFixed(4)}` },
        ],
        relatedCalculators: batch3Rel("oil-change-calculator"),
      };
    },
  },
  {
    slug: "car-insurance-calculator", name: "Car Insurance Estimator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Automotive",
    description: "Estimate annual car insurance costs based on key factors.",
    metaDescription: "Free car insurance cost estimator. Get a rough estimate of annual premiums.",
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
      const deductibleFactor = 1 - (v.deductible / 5000) * 0.3;
      const annual = base * deductibleFactor;
      return {
        results: [
          { label: "Estimated Annual Premium", value: fmt(annual), highlight: true },
          { label: "Monthly Premium", value: fmt(annual / 12) },
          { label: "Daily Cost", value: fmt(annual / 365) },
        ],
        relatedCalculators: batch3Rel("car-insurance-calculator"),
      };
    },
  },

  // ═══════════════════════════════════════
  // REAL ESTATE (new additions)
  // ═══════════════════════════════════════
  {
    slug: "home-affordability-calculator", name: "Home Affordability Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Real Estate",
    description: "Determine how much home you can afford based on income and debts.",
    metaDescription: "Free home affordability calculator. Find how much house you can buy.",
    icon: "layers",
    inputs: [
      { id: "income", label: "Annual Gross Income ($)", type: "number", defaultValue: 85000, prefix: "$" },
      { id: "monthlyDebts", label: "Monthly Debts ($)", type: "number", defaultValue: 500, prefix: "$" },
      { id: "downPayment", label: "Down Payment ($)", type: "number", defaultValue: 40000, prefix: "$" },
      { id: "rate", label: "Interest Rate (%)", type: "number", defaultValue: 6.5, step: 0.1 },
    ],
    calculate: (v) => {
      const monthlyIncome = v.income / 12;
      const maxPayment = monthlyIncome * 0.28;
      const maxWithDebts = monthlyIncome * 0.36 - v.monthlyDebts;
      const payment = Math.min(maxPayment, maxWithDebts);
      const r = v.rate / 100 / 12;
      const n = 360;
      const loanAmount = payment > 0 ? payment * ((1 - Math.pow(1 + r, -n)) / r) : 0;
      const homePrice = loanAmount + v.downPayment;
      return {
        results: [
          { label: "Max Home Price", value: fmt0(homePrice), highlight: true },
          { label: "Max Loan Amount", value: fmt0(loanAmount) },
          { label: "Max Monthly Payment", value: fmt(payment) },
          { label: "DTI Ratio", value: `${num(((payment + v.monthlyDebts) / monthlyIncome) * 100)}%` },
        ],
        relatedCalculators: batch3Rel("home-affordability-calculator"),
      };
    },
  },
  {
    slug: "moving-cost-calculator", name: "Moving Cost Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Real Estate",
    description: "Estimate moving costs based on distance and home size.",
    metaDescription: "Free moving cost calculator. Budget your relocation expenses.",
    icon: "layers",
    inputs: [
      { id: "distance", label: "Distance (miles)", type: "number", defaultValue: 500 },
      { id: "rooms", label: "Number of Rooms", type: "number", defaultValue: 3, min: 1 },
      { id: "packing", label: "Professional Packing (1=Yes, 0=No)", type: "number", defaultValue: 1, min: 0, max: 1 },
    ],
    calculate: (v) => {
      const baseWeight = v.rooms * 1500;
      const local = v.distance < 100;
      const laborCost = local ? v.rooms * 400 : v.rooms * 600;
      const transportCost = local ? 500 : v.distance * 0.5 * (baseWeight / 1000);
      const packingCost = v.packing ? v.rooms * 300 : 0;
      const total = laborCost + transportCost + packingCost;
      return {
        results: [
          { label: "Estimated Total", value: fmt0(total), highlight: true },
          { label: "Labor Cost", value: fmt0(laborCost) },
          { label: "Transport Cost", value: fmt0(transportCost) },
          { label: "Packing Cost", value: v.packing ? fmt0(packingCost) : "DIY" },
        ],
        relatedCalculators: batch3Rel("moving-cost-calculator"),
      };
    },
  },
  {
    slug: "closing-cost-calculator", name: "Closing Cost Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Real Estate",
    description: "Estimate closing costs when buying a home.",
    metaDescription: "Free closing cost calculator. Estimate fees when purchasing a home.",
    icon: "layers",
    inputs: [
      { id: "homePrice", label: "Home Price ($)", type: "number", defaultValue: 350000, prefix: "$" },
      { id: "loanAmount", label: "Loan Amount ($)", type: "number", defaultValue: 280000, prefix: "$" },
    ],
    calculate: (v) => {
      const origination = v.loanAmount * 0.01;
      const appraisal = 500;
      const inspection = 400;
      const titleInsurance = v.homePrice * 0.005;
      const recording = 150;
      const escrow = v.homePrice * 0.01;
      const total = origination + appraisal + inspection + titleInsurance + recording + escrow;
      return {
        results: [
          { label: "Estimated Closing Costs", value: fmt(total), highlight: true },
          { label: "Loan Origination", value: fmt(origination) },
          { label: "Title Insurance", value: fmt(titleInsurance) },
          { label: "Escrow/Prepaid", value: fmt(escrow) },
          { label: "% of Home Price", value: `${num((total / v.homePrice) * 100)}%` },
        ],
        relatedCalculators: batch3Rel("closing-cost-calculator"),
      };
    },
  },

  // ═══════════════════════════════════════
  // FOOD & NUTRITION
  // ═══════════════════════════════════════
  {
    slug: "water-intake-calculator", name: "Water Intake Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Food & Nutrition",
    description: "Calculate daily water intake recommendation based on weight and activity.",
    metaDescription: "Free water intake calculator. Find how much water you should drink daily.",
    icon: "layers",
    inputs: [
      { id: "weight", label: "Weight (lbs)", type: "number", defaultValue: 160 },
      { id: "activity", label: "Activity Level (1=Low, 2=Moderate, 3=High)", type: "number", defaultValue: 2, min: 1, max: 3 },
    ],
    calculate: (v) => {
      const base = v.weight * 0.5;
      const multiplier = v.activity === 1 ? 1 : v.activity === 2 ? 1.2 : 1.5;
      const ounces = base * multiplier;
      const cups = ounces / 8;
      const liters = ounces * 0.0296;
      return {
        results: [
          { label: "Daily Water Intake", value: `${num(ounces)} oz`, highlight: true },
          { label: "Cups Per Day", value: `${num(cups)} cups` },
          { label: "Liters Per Day", value: `${num(liters)} L` },
        ],
        relatedCalculators: batch3Rel("water-intake-calculator"),
      };
    },
  },
  {
    slug: "caffeine-calculator", name: "Caffeine Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Food & Nutrition",
    description: "Track your daily caffeine intake and see if you're within safe limits.",
    metaDescription: "Free caffeine intake calculator. Track your daily caffeine consumption.",
    icon: "layers",
    inputs: [
      { id: "coffee", label: "Cups of Coffee (8oz)", type: "number", defaultValue: 2 },
      { id: "tea", label: "Cups of Tea", type: "number", defaultValue: 1 },
      { id: "soda", label: "Cans of Soda", type: "number", defaultValue: 0 },
      { id: "energy", label: "Energy Drinks", type: "number", defaultValue: 0 },
    ],
    calculate: (v) => {
      const total = v.coffee * 95 + v.tea * 47 + v.soda * 40 + v.energy * 160;
      const safe = 400;
      const status = total <= safe ? "Within Safe Limit" : "Exceeds Recommended Limit";
      return {
        results: [
          { label: "Total Caffeine", value: `${total} mg`, highlight: true },
          { label: "Safe Daily Limit", value: `${safe} mg` },
          { label: "Status", value: status },
          { label: "% of Safe Limit", value: `${num((total / safe) * 100)}%` },
        ],
        chartData: [
          { name: "Coffee", value: v.coffee * 95 },
          { name: "Tea", value: v.tea * 47 },
          { name: "Soda", value: v.soda * 40 },
          { name: "Energy", value: v.energy * 160 },
        ],
        chartConfig: { value: { color: "#2563eb" } },
        relatedCalculators: batch3Rel("caffeine-calculator"),
      };
    },
  },
  {
    slug: "protein-calculator", name: "Protein Intake Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Food & Nutrition",
    description: "Calculate your daily protein needs based on weight and goals.",
    metaDescription: "Free protein intake calculator. Find your daily protein requirement.",
    icon: "layers",
    inputs: [
      { id: "weight", label: "Weight (lbs)", type: "number", defaultValue: 160 },
      { id: "goal", label: "Goal (1=Maintain, 2=Lose, 3=Build)", type: "number", defaultValue: 1, min: 1, max: 3 },
      { id: "activity", label: "Activity (1=Sedentary, 2=Active, 3=Athlete)", type: "number", defaultValue: 2, min: 1, max: 3 },
    ],
    calculate: (v) => {
      const weightKg = v.weight * 0.4536;
      const factors: Record<string, number> = { "11": 0.8, "12": 0.8, "13": 1.2, "21": 1.0, "22": 1.2, "23": 1.4, "31": 1.6, "32": 1.8, "33": 2.2 };
      const factor = factors[`${v.goal}${v.activity}`] || 1.0;
      const protein = weightKg * factor;
      return {
        results: [
          { label: "Daily Protein", value: `${num(protein)}g`, highlight: true },
          { label: "Per Meal (3 meals)", value: `${num(protein / 3)}g` },
          { label: "Per Meal (4 meals)", value: `${num(protein / 4)}g` },
          { label: "Multiplier", value: `${factor}g/kg` },
        ],
        relatedCalculators: batch3Rel("protein-calculator"),
      };
    },
  },

  // ═══════════════════════════════════════
  // SAVINGS & BUDGETING
  // ═══════════════════════════════════════
  {
    slug: "emergency-fund-calculator", name: "Emergency Fund Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Savings & Budgeting",
    description: "Calculate how much you need in your emergency fund.",
    metaDescription: "Free emergency fund calculator. Find your target emergency savings.",
    icon: "layers",
    inputs: [
      { id: "monthlyExpenses", label: "Monthly Expenses ($)", type: "number", defaultValue: 3500, prefix: "$" },
      { id: "months", label: "Months of Coverage", type: "number", defaultValue: 6, min: 3, max: 12 },
      { id: "currentSavings", label: "Current Savings ($)", type: "number", defaultValue: 5000, prefix: "$" },
    ],
    calculate: (v) => {
      const target = v.monthlyExpenses * v.months;
      const gap = Math.max(0, target - v.currentSavings);
      const progress = Math.min(100, (v.currentSavings / target) * 100);
      return {
        results: [
          { label: "Target Emergency Fund", value: fmt0(target), highlight: true },
          { label: "Current Savings", value: fmt0(v.currentSavings) },
          { label: "Still Needed", value: fmt0(gap) },
          { label: "Progress", value: `${num(progress)}%` },
        ],
        relatedCalculators: batch3Rel("emergency-fund-calculator"),
      };
    },
  },
  {
    slug: "savings-goal-calculator", name: "Savings Goal Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Savings & Budgeting",
    description: "Calculate monthly savings needed to reach a financial goal.",
    metaDescription: "Free savings goal calculator. Plan your monthly savings to reach any target.",
    icon: "layers",
    inputs: [
      { id: "goal", label: "Savings Goal ($)", type: "number", defaultValue: 20000, prefix: "$" },
      { id: "current", label: "Current Savings ($)", type: "number", defaultValue: 2000, prefix: "$" },
      { id: "months", label: "Time Frame (months)", type: "number", defaultValue: 24 },
      { id: "rate", label: "Annual Interest Rate (%)", type: "number", defaultValue: 4.5, step: 0.1 },
    ],
    calculate: (v) => {
      const needed = v.goal - v.current;
      const r = v.rate / 100 / 12;
      const monthly = r > 0 ? (needed * r) / (Math.pow(1 + r, v.months) - 1) : needed / v.months;
      const totalSaved = monthly * v.months;
      const interestEarned = v.goal - v.current - totalSaved + (totalSaved - needed > 0 ? totalSaved - needed : 0);
      return {
        results: [
          { label: "Monthly Savings Needed", value: fmt(monthly), highlight: true },
          { label: "Total You'll Save", value: fmt(totalSaved) },
          { label: "Remaining to Goal", value: fmt(needed) },
          { label: "Weekly Amount", value: fmt(monthly / 4.33) },
        ],
        relatedCalculators: batch3Rel("savings-goal-calculator"),
      };
    },
  },
  {
    slug: "inflation-calculator", name: "Inflation Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Savings & Budgeting",
    description: "Calculate the impact of inflation on purchasing power over time.",
    metaDescription: "Free inflation calculator. See how inflation erodes purchasing power.",
    icon: "layers",
    inputs: [
      { id: "amount", label: "Current Amount ($)", type: "number", defaultValue: 1000, prefix: "$" },
      { id: "rate", label: "Inflation Rate (%)", type: "number", defaultValue: 3, step: 0.1 },
      { id: "years", label: "Years", type: "number", defaultValue: 10 },
    ],
    calculate: (v) => {
      const futureValue = v.amount * Math.pow(1 + v.rate / 100, v.years);
      const purchasingPower = v.amount / Math.pow(1 + v.rate / 100, v.years);
      const lostPower = v.amount - purchasingPower;
      return {
        results: [
          { label: "Equivalent Cost in Future", value: fmt(futureValue), highlight: true },
          { label: "Future Purchasing Power", value: fmt(purchasingPower) },
          { label: "Value Lost to Inflation", value: fmt(lostPower) },
          { label: "Total Inflation", value: `${num(((futureValue / v.amount) - 1) * 100)}%` },
        ],
        chartData: Array.from({ length: v.years + 1 }, (_, i) => ({
          name: `Year ${i}`,
          "Purchasing Power": Math.round(v.amount / Math.pow(1 + v.rate / 100, i)),
          "Cost Equivalent": Math.round(v.amount * Math.pow(1 + v.rate / 100, i)),
        })),
        chartConfig: { "Purchasing Power": { color: "#2563eb" }, "Cost Equivalent": { color: "#ef4444" } },
        relatedCalculators: batch3Rel("inflation-calculator"),
      };
    },
  },

  // ═══════════════════════════════════════
  // PRINTING & DESIGN
  // ═══════════════════════════════════════
  {
    slug: "dpi-calculator", name: "DPI Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Printing & Design",
    description: "Calculate print quality DPI from pixel dimensions and print size.",
    metaDescription: "Free DPI calculator. Find image resolution for printing.",
    icon: "layers",
    inputs: [
      { id: "widthPx", label: "Image Width (pixels)", type: "number", defaultValue: 3000 },
      { id: "heightPx", label: "Image Height (pixels)", type: "number", defaultValue: 2000 },
      { id: "widthIn", label: "Print Width (inches)", type: "number", defaultValue: 10 },
    ],
    calculate: (v) => {
      const dpi = v.widthPx / v.widthIn;
      const heightIn = v.heightPx / dpi;
      const quality = dpi >= 300 ? "Excellent" : dpi >= 150 ? "Good" : dpi >= 72 ? "Fair (screen only)" : "Poor";
      return {
        results: [
          { label: "DPI", value: `${Math.round(dpi)}`, highlight: true },
          { label: "Print Size", value: `${num(v.widthIn)}" × ${num(heightIn)}"` },
          { label: "Quality", value: quality },
          { label: "Megapixels", value: `${num((v.widthPx * v.heightPx) / 1000000)} MP` },
        ],
        relatedCalculators: batch3Rel("dpi-calculator"),
      };
    },
  },
  {
    slug: "aspect-ratio-calculator", name: "Aspect Ratio Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Printing & Design",
    description: "Calculate and resize dimensions while maintaining aspect ratio.",
    metaDescription: "Free aspect ratio calculator. Resize images and videos proportionally.",
    icon: "layers",
    inputs: [
      { id: "width", label: "Original Width", type: "number", defaultValue: 1920 },
      { id: "height", label: "Original Height", type: "number", defaultValue: 1080 },
      { id: "newWidth", label: "New Width", type: "number", defaultValue: 1280 },
    ],
    calculate: (v) => {
      const ratio = v.width / v.height;
      const newHeight = Math.round(v.newWidth / ratio);
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
      const g = gcd(v.width, v.height);
      return {
        results: [
          { label: "Aspect Ratio", value: `${v.width / g}:${v.height / g}`, highlight: true },
          { label: "Decimal Ratio", value: num(ratio) },
          { label: "New Dimensions", value: `${v.newWidth} × ${newHeight}` },
          { label: "Scale Factor", value: `${num((v.newWidth / v.width) * 100)}%` },
        ],
        relatedCalculators: batch3Rel("aspect-ratio-calculator"),
      };
    },
  },

  // ═══════════════════════════════════════
  // MATH & NUMBERS (new additions)
  // ═══════════════════════════════════════
  {
    slug: "roman-numeral-converter", name: "Roman Numeral Converter", category: "Other Calculators", categorySlug: "other",
    subcategory: "Math & Numbers",
    description: "Convert between Arabic numbers and Roman numerals.",
    metaDescription: "Free Roman numeral converter. Convert numbers to and from Roman numerals.",
    icon: "layers",
    inputs: [
      { id: "number", label: "Number (1-3999)", type: "number", defaultValue: 2026, min: 1, max: 3999 },
    ],
    calculate: (v) => {
      const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
      const syms = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
      let n = Math.floor(v.number);
      let roman = "";
      for (let i = 0; i < vals.length; i++) {
        while (n >= vals[i]) { roman += syms[i]; n -= vals[i]; }
      }
      return {
        results: [
          { label: "Roman Numeral", value: roman, highlight: true },
          { label: "Arabic Number", value: `${v.number}` },
        ],
        relatedCalculators: batch3Rel("roman-numeral-converter"),
      };
    },
  },
  {
    slug: "binary-converter", name: "Binary Converter", category: "Other Calculators", categorySlug: "other",
    subcategory: "Math & Numbers",
    description: "Convert numbers between decimal, binary, octal, and hexadecimal.",
    metaDescription: "Free binary converter. Convert between decimal, binary, hex, and octal.",
    icon: "layers",
    inputs: [
      { id: "decimal", label: "Decimal Number", type: "number", defaultValue: 255, min: 0 },
    ],
    calculate: (v) => {
      const n = Math.floor(v.decimal);
      return {
        results: [
          { label: "Binary", value: n.toString(2), highlight: true },
          { label: "Octal", value: n.toString(8) },
          { label: "Hexadecimal", value: n.toString(16).toUpperCase() },
          { label: "Decimal", value: `${n}` },
        ],
        relatedCalculators: batch3Rel("binary-converter"),
      };
    },
  },
  {
    slug: "percentage-change-calculator", name: "Percentage Change Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Math & Numbers",
    description: "Calculate the percentage change between two values.",
    metaDescription: "Free percentage change calculator. Find increase or decrease between values.",
    icon: "layers",
    inputs: [
      { id: "oldVal", label: "Old Value", type: "number", defaultValue: 50 },
      { id: "newVal", label: "New Value", type: "number", defaultValue: 75 },
    ],
    calculate: (v) => {
      const change = v.newVal - v.oldVal;
      const pctChange = v.oldVal !== 0 ? (change / Math.abs(v.oldVal)) * 100 : 0;
      const direction = change > 0 ? "Increase" : change < 0 ? "Decrease" : "No Change";
      return {
        results: [
          { label: "Percentage Change", value: `${num(pctChange)}%`, highlight: true },
          { label: "Absolute Change", value: num(change) },
          { label: "Direction", value: direction },
          { label: "Ratio", value: v.oldVal !== 0 ? num(v.newVal / v.oldVal) : "N/A" },
        ],
        relatedCalculators: batch3Rel("percentage-change-calculator"),
      };
    },
  },
  {
    slug: "random-number-generator", name: "Random Number Generator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Math & Numbers",
    description: "Generate random numbers within a specified range.",
    metaDescription: "Free random number generator. Generate random integers within any range.",
    icon: "layers",
    inputs: [
      { id: "min", label: "Minimum", type: "number", defaultValue: 1 },
      { id: "max", label: "Maximum", type: "number", defaultValue: 100 },
      { id: "count", label: "How Many", type: "number", defaultValue: 5, min: 1, max: 20 },
    ],
    calculate: (v) => {
      const numbers = Array.from({ length: Math.min(v.count, 20) }, () =>
        Math.floor(Math.random() * (v.max - v.min + 1)) + v.min
      );
      return {
        results: [
          { label: "Random Numbers", value: numbers.join(", "), highlight: true },
          { label: "Range", value: `${v.min} to ${v.max}` },
          { label: "Count", value: `${numbers.length}` },
        ],
        relatedCalculators: batch3Rel("random-number-generator"),
      };
    },
  },

  // ═══════════════════════════════════════
  // FITNESS & EXERCISE
  // ═══════════════════════════════════════
  {
    slug: "running-pace-calculator", name: "Running Pace Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Fitness & Exercise",
    description: "Calculate your running pace, speed, and finish times.",
    metaDescription: "Free running pace calculator. Find your pace per mile and finish times.",
    icon: "layers",
    inputs: [
      { id: "distance", label: "Distance (miles)", type: "number", defaultValue: 5, step: 0.1 },
      { id: "hours", label: "Hours", type: "number", defaultValue: 0, min: 0 },
      { id: "minutes", label: "Minutes", type: "number", defaultValue: 40, min: 0 },
      { id: "seconds", label: "Seconds", type: "number", defaultValue: 0, min: 0 },
    ],
    calculate: (v) => {
      const totalSeconds = v.hours * 3600 + v.minutes * 60 + v.seconds;
      const paceSeconds = v.distance > 0 ? totalSeconds / v.distance : 0;
      const paceMins = Math.floor(paceSeconds / 60);
      const paceSecs = Math.round(paceSeconds % 60);
      const mph = v.distance > 0 && totalSeconds > 0 ? (v.distance / totalSeconds) * 3600 : 0;
      const kmPace = paceSeconds / 1.60934;
      const kmPaceMins = Math.floor(kmPace / 60);
      const kmPaceSecs = Math.round(kmPace % 60);
      return {
        results: [
          { label: "Pace (per mile)", value: `${paceMins}:${paceSecs.toString().padStart(2, "0")}`, highlight: true },
          { label: "Pace (per km)", value: `${kmPaceMins}:${kmPaceSecs.toString().padStart(2, "0")}` },
          { label: "Speed", value: `${num(mph)} mph` },
          { label: "Speed (km/h)", value: `${num(mph * 1.60934)} km/h` },
        ],
        relatedCalculators: batch3Rel("running-pace-calculator"),
      };
    },
  },
  {
    slug: "calories-burned-calculator", name: "Calories Burned Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Fitness & Exercise",
    description: "Estimate calories burned during various exercises.",
    metaDescription: "Free calories burned calculator. Find how many calories you burn exercising.",
    icon: "layers",
    inputs: [
      { id: "weight", label: "Weight (lbs)", type: "number", defaultValue: 160 },
      { id: "duration", label: "Duration (minutes)", type: "number", defaultValue: 30 },
      { id: "activity", label: "Activity (1=Walking, 2=Jogging, 3=Running, 4=Cycling, 5=Swimming)", type: "number", defaultValue: 2, min: 1, max: 5 },
    ],
    calculate: (v) => {
      const mets: Record<number, number> = { 1: 3.5, 2: 7, 3: 9.8, 4: 7.5, 5: 8 };
      const actNames: Record<number, string> = { 1: "Walking", 2: "Jogging", 3: "Running", 4: "Cycling", 5: "Swimming" };
      const met = mets[v.activity] || 3.5;
      const weightKg = v.weight * 0.4536;
      const calories = (met * 3.5 * weightKg / 200) * v.duration;
      return {
        results: [
          { label: "Calories Burned", value: `${Math.round(calories)} cal`, highlight: true },
          { label: "Activity", value: actNames[v.activity] || "Unknown" },
          { label: "MET Value", value: `${met}` },
          { label: "Cal/Minute", value: num(calories / v.duration) },
        ],
        relatedCalculators: batch3Rel("calories-burned-calculator"),
      };
    },
  },
  {
    slug: "one-rep-max-calculator", name: "One Rep Max Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Fitness & Exercise",
    description: "Estimate your one-rep max based on weight and reps performed.",
    metaDescription: "Free one rep max calculator. Estimate your 1RM for any lift.",
    icon: "layers",
    inputs: [
      { id: "weight", label: "Weight Lifted (lbs)", type: "number", defaultValue: 185 },
      { id: "reps", label: "Reps Performed", type: "number", defaultValue: 5, min: 1 },
    ],
    calculate: (v) => {
      const oneRM = v.weight * (1 + v.reps / 30);
      return {
        results: [
          { label: "Estimated 1RM", value: `${Math.round(oneRM)} lbs`, highlight: true },
          { label: "90% (Heavy)", value: `${Math.round(oneRM * 0.9)} lbs` },
          { label: "80% (Moderate)", value: `${Math.round(oneRM * 0.8)} lbs` },
          { label: "70% (Light)", value: `${Math.round(oneRM * 0.7)} lbs` },
        ],
        relatedCalculators: batch3Rel("one-rep-max-calculator"),
      };
    },
  },

  // ═══════════════════════════════════════
  // ELECTRICITY & HOME
  // ═══════════════════════════════════════
  {
    slug: "led-savings-calculator", name: "LED Savings Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Electricity & Home",
    description: "Calculate savings when switching from incandescent to LED bulbs.",
    metaDescription: "Free LED savings calculator. See how much you save switching to LED lighting.",
    icon: "layers",
    inputs: [
      { id: "bulbs", label: "Number of Bulbs", type: "number", defaultValue: 20 },
      { id: "oldWatts", label: "Old Bulb Wattage", type: "number", defaultValue: 60 },
      { id: "newWatts", label: "LED Wattage", type: "number", defaultValue: 9 },
      { id: "hours", label: "Hours Used Per Day", type: "number", defaultValue: 5 },
      { id: "rate", label: "Electricity Rate ($/kWh)", type: "number", defaultValue: 0.12, step: 0.01 },
    ],
    calculate: (v) => {
      const oldAnnual = v.bulbs * v.oldWatts * v.hours * 365 / 1000 * v.rate;
      const newAnnual = v.bulbs * v.newWatts * v.hours * 365 / 1000 * v.rate;
      const savings = oldAnnual - newAnnual;
      return {
        results: [
          { label: "Annual Savings", value: fmt(savings), highlight: true },
          { label: "Old Annual Cost", value: fmt(oldAnnual) },
          { label: "New Annual Cost", value: fmt(newAnnual) },
          { label: "Energy Reduction", value: `${num(((v.oldWatts - v.newWatts) / v.oldWatts) * 100)}%` },
        ],
        relatedCalculators: batch3Rel("led-savings-calculator"),
      };
    },
  },
  {
    slug: "hvac-sizing-calculator", name: "HVAC Sizing Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Electricity & Home",
    description: "Estimate the HVAC tonnage needed for your home.",
    metaDescription: "Free HVAC sizing calculator. Estimate AC tonnage for your square footage.",
    icon: "layers",
    inputs: [
      { id: "sqft", label: "Home Square Footage", type: "number", defaultValue: 2000 },
      { id: "climate", label: "Climate (1=Cold, 2=Moderate, 3=Hot)", type: "number", defaultValue: 2, min: 1, max: 3 },
    ],
    calculate: (v) => {
      const btuPer = v.climate === 1 ? 30 : v.climate === 2 ? 25 : 22;
      const btu = v.sqft * btuPer;
      const tons = btu / 12000;
      return {
        results: [
          { label: "Recommended Tonnage", value: `${num(Math.ceil(tons * 2) / 2)} tons`, highlight: true },
          { label: "BTU Needed", value: num(btu) },
          { label: "BTU/sq ft Factor", value: `${btuPer}` },
        ],
        relatedCalculators: batch3Rel("hvac-sizing-calculator"),
      };
    },
  },
  {
    slug: "ceiling-fan-size-calculator", name: "Ceiling Fan Size Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Electricity & Home",
    description: "Determine the ideal ceiling fan size for your room.",
    metaDescription: "Free ceiling fan size calculator. Find the right fan diameter for your room.",
    icon: "layers",
    inputs: [
      { id: "length", label: "Room Length (feet)", type: "number", defaultValue: 14 },
      { id: "width", label: "Room Width (feet)", type: "number", defaultValue: 12 },
    ],
    calculate: (v) => {
      const area = v.length * v.width;
      let fanSize = "";
      if (area <= 75) fanSize = "29-36 inches";
      else if (area <= 144) fanSize = "36-42 inches";
      else if (area <= 225) fanSize = "44-50 inches";
      else if (area <= 400) fanSize = "50-54 inches";
      else fanSize = "54-72 inches (or 2 fans)";
      return {
        results: [
          { label: "Recommended Fan Size", value: fanSize, highlight: true },
          { label: "Room Area", value: `${num(area)} sq ft` },
        ],
        relatedCalculators: batch3Rel("ceiling-fan-size-calculator"),
      };
    },
  },

  // ═══════════════════════════════════════
  // TRAVEL PLANNING
  // ═══════════════════════════════════════
  {
    slug: "road-trip-calculator", name: "Road Trip Cost Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Travel Planning",
    description: "Estimate total road trip costs including fuel, food, and lodging.",
    metaDescription: "Free road trip cost calculator. Budget your entire road trip.",
    icon: "layers",
    inputs: [
      { id: "distance", label: "Total Distance (miles)", type: "number", defaultValue: 1000 },
      { id: "mpg", label: "MPG", type: "number", defaultValue: 28, step: 0.5 },
      { id: "gasPrice", label: "Gas Price ($/gal)", type: "number", defaultValue: 3.5, prefix: "$", step: 0.01 },
      { id: "nights", label: "Hotel Nights", type: "number", defaultValue: 2 },
      { id: "hotelCost", label: "Hotel Per Night ($)", type: "number", defaultValue: 120, prefix: "$" },
      { id: "foodPerDay", label: "Food Per Day ($)", type: "number", defaultValue: 50, prefix: "$" },
    ],
    calculate: (v) => {
      const fuelCost = (v.distance / v.mpg) * v.gasPrice;
      const hotelTotal = v.nights * v.hotelCost;
      const days = v.nights + 1;
      const foodTotal = days * v.foodPerDay;
      const total = fuelCost + hotelTotal + foodTotal;
      return {
        results: [
          { label: "Total Trip Cost", value: fmt(total), highlight: true },
          { label: "Fuel Cost", value: fmt(fuelCost) },
          { label: "Lodging Cost", value: fmt(hotelTotal) },
          { label: "Food Cost", value: fmt(foodTotal) },
        ],
        chartData: [
          { name: "Fuel", value: Math.round(fuelCost) },
          { name: "Lodging", value: Math.round(hotelTotal) },
          { name: "Food", value: Math.round(foodTotal) },
        ],
        chartConfig: { value: { color: "#2563eb" } },
        relatedCalculators: batch3Rel("road-trip-calculator"),
      };
    },
  },
  {
    slug: "currency-exchange-calculator", name: "Currency Exchange Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Travel Planning",
    description: "Convert between currencies with a custom exchange rate.",
    metaDescription: "Free currency exchange calculator. Convert between currencies.",
    icon: "layers",
    inputs: [
      { id: "amount", label: "Amount", type: "number", defaultValue: 1000 },
      { id: "rate", label: "Exchange Rate", type: "number", defaultValue: 0.85, step: 0.001 },
      { id: "fee", label: "Service Fee (%)", type: "number", defaultValue: 2, step: 0.1 },
    ],
    calculate: (v) => {
      const converted = v.amount * v.rate;
      const feeAmt = converted * (v.fee / 100);
      const afterFee = converted - feeAmt;
      return {
        results: [
          { label: "Converted Amount", value: num(converted) },
          { label: "Service Fee", value: num(feeAmt) },
          { label: "You Receive", value: num(afterFee), highlight: true },
          { label: "Effective Rate", value: num(afterFee / v.amount) },
        ],
        relatedCalculators: batch3Rel("currency-exchange-calculator"),
      };
    },
  },
  {
    slug: "luggage-weight-calculator", name: "Luggage Weight Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Travel Planning",
    description: "Check if your luggage is within airline weight limits.",
    metaDescription: "Free luggage weight calculator. Check your bags against airline limits.",
    icon: "layers",
    inputs: [
      { id: "bag1", label: "Checked Bag 1 (lbs)", type: "number", defaultValue: 42 },
      { id: "bag2", label: "Checked Bag 2 (lbs)", type: "number", defaultValue: 38 },
      { id: "carry", label: "Carry-On (lbs)", type: "number", defaultValue: 15 },
      { id: "limit", label: "Weight Limit Per Bag (lbs)", type: "number", defaultValue: 50 },
    ],
    calculate: (v) => {
      const total = v.bag1 + v.bag2 + v.carry;
      const bag1Ok = v.bag1 <= v.limit;
      const bag2Ok = v.bag2 <= v.limit;
      return {
        results: [
          { label: "Total Weight", value: `${num(total)} lbs`, highlight: true },
          { label: "Bag 1", value: `${v.bag1} lbs — ${bag1Ok ? "✓ OK" : "✗ Over limit!"}` },
          { label: "Bag 2", value: `${v.bag2} lbs — ${bag2Ok ? "✓ OK" : "✗ Over limit!"}` },
          { label: "Carry-On", value: `${v.carry} lbs` },
        ],
        relatedCalculators: batch3Rel("luggage-weight-calculator"),
      };
    },
  },

  // ═══════════════════════════════════════
  // MISCELLANEOUS
  // ═══════════════════════════════════════
  {
    slug: "tip-split-calculator", name: "Tip & Bill Split Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Miscellaneous",
    description: "Split a restaurant bill with tip among friends.",
    metaDescription: "Free tip and bill split calculator. Split restaurant bills evenly.",
    icon: "layers",
    inputs: [
      { id: "bill", label: "Bill Amount ($)", type: "number", defaultValue: 120, prefix: "$" },
      { id: "tipPct", label: "Tip (%)", type: "number", defaultValue: 18 },
      { id: "people", label: "Number of People", type: "number", defaultValue: 4, min: 1 },
    ],
    calculate: (v) => {
      const tip = v.bill * (v.tipPct / 100);
      const total = v.bill + tip;
      const perPerson = total / v.people;
      return {
        results: [
          { label: "Per Person", value: fmt(perPerson), highlight: true },
          { label: "Tip Amount", value: fmt(tip) },
          { label: "Total Bill", value: fmt(total) },
          { label: "Tip Per Person", value: fmt(tip / v.people) },
        ],
        relatedCalculators: batch3Rel("tip-split-calculator"),
      };
    },
  },
  {
    slug: "age-in-days-calculator", name: "Age in Days Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Miscellaneous",
    description: "Find your exact age in days, hours, and minutes.",
    metaDescription: "Free age in days calculator. Find your exact age down to the minute.",
    icon: "layers",
    inputs: [
      { id: "month", label: "Birth Month (1-12)", type: "number", defaultValue: 6, min: 1, max: 12 },
      { id: "day", label: "Birth Day", type: "number", defaultValue: 15, min: 1, max: 31 },
      { id: "year", label: "Birth Year", type: "number", defaultValue: 1990 },
    ],
    calculate: (v) => {
      const birth = new Date(v.year, v.month - 1, v.day);
      const now = new Date();
      const diffMs = now.getTime() - birth.getTime();
      const days = Math.floor(diffMs / (24 * 60 * 60 * 1000));
      const hours = Math.floor(diffMs / (60 * 60 * 1000));
      const minutes = Math.floor(diffMs / (60 * 1000));
      const weeks = Math.floor(days / 7);
      return {
        results: [
          { label: "Age in Days", value: num(days), highlight: true },
          { label: "Age in Weeks", value: num(weeks) },
          { label: "Age in Hours", value: num(hours) },
          { label: "Age in Minutes", value: num(minutes) },
        ],
        relatedCalculators: batch3Rel("age-in-days-calculator"),
      };
    },
  },
  {
    slug: "shoe-size-converter-intl", name: "International Shoe Size Converter", category: "Other Calculators", categorySlug: "other",
    subcategory: "Miscellaneous",
    description: "Convert shoe sizes between US, UK, and EU systems.",
    metaDescription: "Free shoe size converter. Convert between US, UK, and EU shoe sizes.",
    icon: "layers",
    inputs: [
      { id: "usSize", label: "US Size (Men's)", type: "number", defaultValue: 10, step: 0.5 },
    ],
    calculate: (v) => {
      const uk = v.usSize - 0.5;
      const eu = v.usSize + 33;
      const cm = (v.usSize + 18) * 0.847;
      return {
        results: [
          { label: "US Size", value: `${v.usSize}` },
          { label: "UK Size", value: `${uk}`, highlight: true },
          { label: "EU Size", value: `${eu}` },
          { label: "CM", value: num(cm) },
        ],
        relatedCalculators: batch3Rel("shoe-size-converter-intl"),
      };
    },
  },
  {
    slug: "screen-size-calculator", name: "Screen Size Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Technology",
    description: "Calculate actual screen dimensions from diagonal size and aspect ratio.",
    metaDescription: "Free screen size calculator. Find width and height from diagonal measurement.",
    icon: "layers",
    inputs: [
      { id: "diagonal", label: "Diagonal Size (inches)", type: "number", defaultValue: 27, step: 0.1 },
      { id: "ratioW", label: "Aspect Ratio Width", type: "number", defaultValue: 16 },
      { id: "ratioH", label: "Aspect Ratio Height", type: "number", defaultValue: 9 },
    ],
    calculate: (v) => {
      const ratio = Math.sqrt(v.ratioW * v.ratioW + v.ratioH * v.ratioH);
      const width = (v.diagonal / ratio) * v.ratioW;
      const height = (v.diagonal / ratio) * v.ratioH;
      const area = width * height;
      return {
        results: [
          { label: "Width", value: `${num(width)} inches`, highlight: true },
          { label: "Height", value: `${num(height)} inches` },
          { label: "Screen Area", value: `${num(area)} sq in` },
          { label: "Aspect Ratio", value: `${v.ratioW}:${v.ratioH}` },
        ],
        relatedCalculators: batch3Rel("screen-size-calculator"),
      };
    },
  },
  {
    slug: "internet-speed-calculator", name: "Download Time Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Technology",
    description: "Estimate file download time based on connection speed.",
    metaDescription: "Free download time calculator. Estimate how long a file will take to download.",
    icon: "layers",
    inputs: [
      { id: "fileSize", label: "File Size (GB)", type: "number", defaultValue: 5, step: 0.1 },
      { id: "speed", label: "Download Speed (Mbps)", type: "number", defaultValue: 100 },
    ],
    calculate: (v) => {
      const fileMb = v.fileSize * 1024;
      const fileMbits = fileMb * 8;
      const seconds = fileMbits / v.speed;
      const mins = Math.floor(seconds / 60);
      const secs = Math.round(seconds % 60);
      const hours = Math.floor(mins / 60);
      const remMins = mins % 60;
      const timeStr = hours > 0 ? `${hours}h ${remMins}m ${secs}s` : mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
      return {
        results: [
          { label: "Download Time", value: timeStr, highlight: true },
          { label: "File Size", value: `${v.fileSize} GB (${num(fileMb)} MB)` },
          { label: "Speed", value: `${v.speed} Mbps` },
          { label: "MB/second", value: num(v.speed / 8) },
        ],
        relatedCalculators: batch3Rel("internet-speed-calculator"),
      };
    },
  },
  {
    slug: "battery-life-calculator", name: "Battery Life Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Technology",
    description: "Estimate device battery life based on capacity and usage.",
    metaDescription: "Free battery life calculator. Estimate how long your device battery will last.",
    icon: "layers",
    inputs: [
      { id: "capacity", label: "Battery Capacity (mAh)", type: "number", defaultValue: 5000 },
      { id: "consumption", label: "Avg Power Draw (mA)", type: "number", defaultValue: 400 },
    ],
    calculate: (v) => {
      const hours = v.consumption > 0 ? v.capacity / v.consumption : 0;
      const hrsInt = Math.floor(hours);
      const minsRem = Math.round((hours - hrsInt) * 60);
      return {
        results: [
          { label: "Battery Life", value: `${hrsInt}h ${minsRem}m`, highlight: true },
          { label: "Total Hours", value: num(hours) },
          { label: "Capacity", value: `${v.capacity} mAh` },
          { label: "Consumption", value: `${v.consumption} mA` },
        ],
        relatedCalculators: batch3Rel("battery-life-calculator"),
      };
    },
  },
  {
    slug: "wallpaper-calculator", name: "Wallpaper Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Construction & Home",
    description: "Calculate how many rolls of wallpaper you need for a room.",
    metaDescription: "Free wallpaper calculator. Estimate wallpaper rolls needed for your room.",
    icon: "layers",
    inputs: [
      { id: "length", label: "Room Length (feet)", type: "number", defaultValue: 14 },
      { id: "width", label: "Room Width (feet)", type: "number", defaultValue: 12 },
      { id: "height", label: "Ceiling Height (feet)", type: "number", defaultValue: 9 },
      { id: "rollCoverage", label: "Roll Coverage (sq ft)", type: "number", defaultValue: 56 },
    ],
    calculate: (v) => {
      const perimeter = 2 * (v.length + v.width);
      const wallArea = perimeter * v.height;
      const windowDoorDeduct = wallArea * 0.15;
      const netArea = wallArea - windowDoorDeduct;
      const rolls = Math.ceil(netArea / v.rollCoverage);
      return {
        results: [
          { label: "Rolls Needed", value: `${rolls}`, highlight: true },
          { label: "Wall Area", value: `${num(wallArea)} sq ft` },
          { label: "Net Area (after deductions)", value: `${num(netArea)} sq ft` },
          { label: "Add 10% for waste", value: `${Math.ceil(rolls * 1.1)} rolls` },
        ],
        relatedCalculators: batch3Rel("wallpaper-calculator"),
      };
    },
  },
  {
    slug: "fence-calculator", name: "Fence Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Construction & Home",
    description: "Calculate materials needed for a fence project.",
    metaDescription: "Free fence calculator. Estimate posts, rails, and boards for your fence.",
    icon: "layers",
    inputs: [
      { id: "length", label: "Fence Length (feet)", type: "number", defaultValue: 100 },
      { id: "height", label: "Fence Height (feet)", type: "number", defaultValue: 6 },
      { id: "postSpacing", label: "Post Spacing (feet)", type: "number", defaultValue: 8 },
    ],
    calculate: (v) => {
      const posts = Math.ceil(v.length / v.postSpacing) + 1;
      const sections = posts - 1;
      const rails = sections * 3;
      const pickets = Math.ceil(v.length / 0.5);
      return {
        results: [
          { label: "Posts Needed", value: `${posts}`, highlight: true },
          { label: "Rails Needed", value: `${rails}` },
          { label: "Pickets (6\" wide)", value: `${pickets}` },
          { label: "Sections", value: `${sections}` },
        ],
        relatedCalculators: batch3Rel("fence-calculator"),
      };
    },
  },
];
