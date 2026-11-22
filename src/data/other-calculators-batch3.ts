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
      const billableYear = workWeeks * v.billableHours;
      const hourly = billableYear > 0 ? total / billableYear : 0;
      return [
        { label: "Recommended Hourly Rate", value: fmt(hourly), highlight: true },
        { label: "Annual Revenue Needed", value: fmt0(total) },
        { label: "Billable Hours/Year", value: num(billableYear) },
        { label: "Monthly Revenue", value: fmt(total / 12) },
      ];
    },
    formula: { expression: "Rate = (Salary + Expenses) / (Work Weeks × Hours)", variables: ["All monetary values in USD"] },
    howToUse: "Enter desired salary, expenses, billable hours, and vacation weeks.", faqs: [
      { question: "How does the Hourly Rate Calculator work?", answer: "Enter the required values and the calculator will compute the results instantly." },
      { question: "How is the hourly rate calculated?", answer: "Rate = (desired salary + annual expenses) ÷ ((52 − vacation weeks) × billable hours per week). A $60,000 salary plus $10,000 expenses over 48 weeks at 30 billable hours a week gives $48.61 an hour." },
      { question: "Does the rate include taxes?", answer: "No. It covers only your salary and expenses. As a freelancer you must also fund income tax, retirement savings, and health cover, so treat the result as a floor and add a margin for those costs." },
    ], relatedCalcs: b3Rel("hourly-rate-calculator"),
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
    formula: defFormula, howToUse: "Enter subtotal, discount %, and tax rate.", faqs: [
      { question: "How does the Invoice Calculator work?", answer: "Enter the required values and the calculator will compute the results instantly." },
      { question: "Is tax calculated before or after the discount?", answer: "After the discount. On a $500 subtotal with 10% off and 8% tax, the discount is $50, tax is 8% of the remaining $450 ($36), and the total due is $486." },
      { question: "Can I add several line items?", answer: "No. The calculator takes a single subtotal, so add all line items together first and enter the combined amount." },
    ], relatedCalcs: b3Rel("invoice-calculator"),
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
        { label: "Gross Margin", value: v.revenue !== 0 ? `${num((gross / v.revenue) * 100)}%` : "—" },
        { label: "Net Profit", value: fmt(net), highlight: true },
        { label: "Net Margin", value: v.revenue !== 0 ? `${num((net / v.revenue) * 100)}%` : "—" },
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
      const deductibleFactor = Math.max(0.1, 1 - (v.deductible / 5000) * 0.3);
      const annual = base * deductibleFactor;
      return [
        { label: "Est. Annual Premium", value: fmt(annual), highlight: true },
        { label: "Monthly Premium", value: fmt(annual / 12) },
        { label: "Daily Cost", value: fmt(annual / 365) },
      ];
    },
    formula: defFormula, howToUse: "Enter car value, driver age, and deductible.", faqs: [
      { question: "How does the Car Insurance Estimator work?", answer: "Enter the required values and the calculator will compute the results instantly." },
      { question: "How is the estimate calculated?", answer: "The base premium is 4% of the car's value per year, multiplied by 1.5 for drivers under 25 or 1.2 for drivers over 65, then reduced for a higher deductible. A $20,000 car, a 30-year-old driver, and a $500 deductible give $776 a year. The deductible discount is capped so the premium never falls below 10% of the base premium." },
      { question: "Is this a real insurance quote?", answer: "No. It is a rough estimate from three inputs only. Real premiums also depend on where you live, your driving record, how far you drive, and the coverage you choose — get quotes from several insurers for a real price." },
    ], relatedCalcs: b3Rel("car-insurance-calculator"),
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
      const loan = maxPmt > 0 ? (r === 0 ? maxPmt * 360 : maxPmt * ((1 - Math.pow(1 + r, -360)) / r)) : 0;
      return [
        { label: "Max Home Price", value: fmt0(loan + v.downPayment), highlight: true },
        { label: "Max Loan Amount", value: fmt0(loan) },
        { label: "Max Monthly Payment", value: fmt(maxPmt) },
        { label: "DTI Ratio", value: mi > 0 ? `${num(((maxPmt + v.monthlyDebts) / mi) * 100)}%` : "—" },
      ];
    },
    formula: defFormula, howToUse: "Enter income, debts, down payment, and interest rate.", faqs: [
      { question: "What is the 28/36 rule?", answer: "A common lender guideline: spend no more than 28% of gross monthly income on housing, and no more than 36% on housing plus all other debts. This calculator takes the lower of the two caps as your maximum monthly payment." },
      { question: "Does the estimate include taxes and insurance?", answer: "No. The maximum payment covers principal and interest only, on a 30-year fixed mortgage at the rate you enter. Property tax, homeowner's insurance, HOA dues, and PMI (usually required with less than 20% down) are all extra, so your real monthly housing cost will be higher." },
      { question: "How does the down payment affect affordability?", answer: "The down payment is added directly to the maximum loan: max home price = max loan + down payment. A larger down payment raises the price you can afford dollar for dollar, and it also lowers the loan amount you need." },
    ], relatedCalcs: b3Rel("home-affordability-calculator"),
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
        { label: "% of Home Price", value: v.homePrice > 0 ? `${num((total / v.homePrice) * 100)}%` : "—" },
      ];
    },
    formula: { expression: "Total = Origination (1% of loan) + Title (0.5% of price) + Escrow deposit (1% of price) + $1,050 fixed fees", variables: ["Worked default: $2,800 + $1,750 + $3,500 + $1,050 = $9,100 on a $350,000 home"] },
    howToUse: "Enter home price and loan amount.",
    faqs: [
      { question: "How much are closing costs on a $350,000 home?", answer: "With a $280,000 loan, this calculator estimates $9,100 — 2.6% of the home price. Across the US, closing costs typically run 2% to 5% of the price, so roughly $7,000 to $17,500 on a $350,000 home." },
      { question: "What is included in closing costs?", answer: "This estimate builds in loan origination (1% of the loan), title insurance (0.5% of the price), an escrow deposit (1% of the price), and $1,050 of fixed lender and third-party fees — the category that covers items like the appraisal, credit report, and recording charges." },
      { question: "Who pays closing costs, and can they be reduced?", answer: "The buyer usually pays most closing costs, although sellers sometimes offer concessions toward them. You can reduce yours by comparing Loan Estimates from several lenders, asking about lender credits, and questioning optional or duplicate fees before you commit." },
    ], relatedCalcs: b3Rel("closing-cost-calculator"),
  },

  // ═══ FOOD & NUTRITION ═══
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
    formula: defFormula, howToUse: "Enter number of each beverage consumed.", faqs: [
      { question: "How does the Caffeine Calculator work?", answer: "Enter the required values and the calculator will compute the results instantly." },
      { question: "How much caffeine is in each drink?", answer: "The calculator uses fixed averages: coffee 95 mg per cup, tea 47 mg per cup, soda 40 mg per can, and energy drinks 160 mg per can. Real drinks vary by brand, size, and brew strength." },
      { question: "What is the safe daily limit?", answer: "400 mg for most healthy adults. Two cups of coffee, one tea, and one energy drink total 397 mg — 99.25% of the limit — while three coffees plus an energy drink reach 445 mg, over the limit." },
    ], relatedCalcs: b3Rel("caffeine-calculator"),
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
        { label: "Progress", value: target > 0 ? `${num(Math.min(100, (v.currentSavings / target) * 100))}%` : "—" },
      ];
    },
    formula: defFormula, howToUse: "Enter monthly expenses, months of coverage, and current savings.", faqs: defFaqs("Emergency Fund Calculator"), relatedCalcs: b3Rel("emergency-fund-calculator"),
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
        { label: "Total Inflation", value: `${num((Math.pow(1 + v.rate / 100, v.years) - 1) * 100)}%` },
      ];
    },
    formula: { expression: "FV = PV × (1 + r)^n", variables: ["PV = Present value", "r = Inflation rate", "n = Years"] },
    howToUse: "Enter current amount, inflation rate, and years.", faqs: defFaqs("Inflation Calculator"), relatedCalcs: b3Rel("inflation-calculator"),
  },

  // ═══ MATH & NUMBERS ═══
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
    formula: defFormula, howToUse: "Enter old and new values.", faqs: [
      { question: "How do you calculate percentage change?", answer: "Subtract the old value from the new value, divide by the old value, and multiply by 100. From 50 to 75: (75 − 50) ÷ 50 × 100 = 50% increase." },
      { question: "What is the difference between percentage change and percentage points?", answer: "Percentage points are the simple arithmetic difference between two percentages; percentage change is relative. A rate rising from 10% to 12% rises by 2 percentage points, but that is a 20% increase ((12 − 10) ÷ 10 × 100)." },
      { question: "What if the old value is zero?", answer: "Percentage change is undefined when the starting value is zero, because you cannot divide by zero. This calculator shows 0% in that case rather than an error — treat it as 'no meaningful percentage change' rather than a real result." },
    ], relatedCalcs: b3Rel("percentage-change-calculator"),
  },

  // ═══ FITNESS & EXERCISE ═══
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
        { label: "Cal/Minute", value: v.duration > 0 ? num(cal / v.duration) : "—" },
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
        { label: "Energy Reduction", value: v.oldWatts !== 0 ? `${num(((v.oldWatts - v.newWatts) / v.oldWatts) * 100)}%` : "—" },
      ];
    },
    formula: defFormula, howToUse: "Enter bulb count, wattages, hours, and electricity rate.", faqs: [
      { question: "How does the LED Savings Calculator work?", answer: "Enter the required values and the calculator will compute the results instantly." },
      { question: "How much can I save switching 10 bulbs to LED?", answer: "Replacing 60W bulbs with 9W LEDs, used 5 hours a day at $0.15 per kWh: the old bulbs cost $164.25 a year, the LEDs $24.64 — a saving of $139.61 a year, an 85% energy reduction." },
      { question: "Does the saving include the cost of the bulbs?", answer: "No. It compares running costs only. To work out the payback time, divide what the bulbs cost by the annual saving — with cheap bulbs and heavy use, payback is often a matter of months." },
    ], relatedCalcs: b3Rel("led-savings-calculator"),
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
    formula: { expression: "BTU = Square footage × BTU per sq ft (30 cold / 25 moderate / 22 hot); Tons = BTU ÷ 12,000, rounded up to the nearest 0.5", variables: ["1 ton of cooling = 12,000 BTU per hour"] },
    howToUse: "Enter square footage and climate zone.",
    faqs: [
      { question: "What size HVAC system do I need for a 2,000 sq ft home?", answer: "On this calculator's moderate-climate setting, a 2,000 sq ft home needs 50,000 BTU, which rounds up to a 4.5-ton system. The same home estimates at 4 tons on the hot setting and 5 tons on the cold setting, which weights the heating load more heavily." },
      { question: "How many BTU is one ton?", answer: "One ton equals 12,000 BTU per hour. A 3-ton system delivers about 36,000 BTU per hour, and a 5-ton system about 60,000 BTU per hour." },
      { question: "Is a bigger HVAC system better?", answer: "No. An oversized system short-cycles — switching on and off frequently — which wastes energy, wears parts faster, and removes humidity poorly. An undersized system runs nonstop on the most extreme days. Pros confirm the final size with a Manual J load calculation before installing." },
    ], relatedCalcs: b3Rel("hvac-sizing-calculator"),
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
    formula: defFormula, howToUse: "Enter room length and width.", faqs: [
      { question: "How does the Ceiling Fan Size Calculator work?", answer: "Enter the required values and the calculator will compute the results instantly." },
      { question: "What size fan for a 12×15 ft room?", answer: "The room is 180 sq ft, which falls in the 144–225 band, so the recommended fan size is 44–50 inches." },
      { question: "What if my room is between two sizes?", answer: "The size bands overlap at the boundaries, so either neighbouring size works. The larger fan moves more air; the smaller one is quieter and less visually dominant." },
    ], relatedCalcs: b3Rel("ceiling-fan-size-calculator"),
  },

  // ═══ TRAVEL PLANNING ═══
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
      const w = r > 0 ? (v.diagonal / r) * v.ratioW : 0;
      const h = r > 0 ? (v.diagonal / r) * v.ratioH : 0;
      return [
        { label: "Width", value: `${num(w)} in`, highlight: true },
        { label: "Height", value: `${num(h)} in` },
        { label: "Area", value: `${num(w * h)} sq in` },
        { label: "Ratio", value: `${v.ratioW}:${v.ratioH}` },
      ];
    },
    formula: defFormula, howToUse: "Enter diagonal size and aspect ratio.", faqs: [
      { question: "How does the Screen Size Calculator work?", answer: "Enter the required values and the calculator will compute the results instantly." },
      { question: "What are the dimensions of a 27-inch 16:9 screen?", answer: "23.53 inches wide and 13.24 inches tall, with a viewing area of 311.5 square inches." },
      { question: "Do two screens with the same diagonal have the same area?", answer: "No. A 27-inch 21:9 ultrawide screen is 24.82 x 10.64 inches with 263.9 square inches of area — about 47.6 square inches less than a 27-inch 16:9 screen." },
    ], relatedCalcs: b3Rel("screen-size-calculator"),
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

  // ═══ HEALTH & SAFETY — habit cost calculators (added 2026-11-07 from GSC query demand) ═══
  {
    slug: "quit-smoking-calculator", name: "Quit Smoking Savings Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Health & Safety",
    description: "Calculate how much money you save by quitting smoking, plus the cigarettes and packs you have not smoked since your quit day.",
    metaDescription: "Free quit smoking savings calculator. Enter cigarettes per day and pack price to see money saved per day, month and year, cigarettes not smoked, packs not bought, and your 10-year total.",
    icon: "layers",
    inputs: [
      { id: "cigsPerDay", label: "Cigarettes Smoked Per Day", type: "number", defaultValue: 20 },
      { id: "perPack", label: "Cigarettes Per Pack", type: "number", defaultValue: 20 },
      { id: "packPrice", label: "Price Per Pack ($)", type: "number", defaultValue: 8, prefix: "$", step: 0.01 },
      { id: "daysQuit", label: "Days Since You Quit", type: "number", defaultValue: 30 },
    ],
    calculate: (v) => {
      const perDay = v.perPack > 0 ? v.cigsPerDay * (v.packPrice / v.perPack) : 0;
      const yearly = perDay * 365;
      return [
        { label: "Money Saved So Far", value: fmt(perDay * v.daysQuit), highlight: true },
        { label: "Cigarettes Not Smoked", value: num(v.cigsPerDay * v.daysQuit) },
        { label: "Packs Not Bought", value: v.perPack > 0 ? num((v.cigsPerDay * v.daysQuit) / v.perPack) : "—" },
        { label: "You Save Per Day", value: fmt(perDay) },
        { label: "You Save Per Week", value: fmt(perDay * 7) },
        { label: "You Save Per Month", value: fmt((perDay * 365) / 12) },
        { label: "You Save Per Year", value: fmt(yearly) },
        { label: "Saved in 10 Years", value: fmt(yearly * 10) },
      ];
    },
    formula: { expression: "Daily cost = Cigarettes per day × (Pack price ÷ Cigarettes per pack)", variables: ["Money saved = Daily cost × Days quit", "Yearly saving = Daily cost × 365"] },
    howToUse: "Enter how many cigarettes you smoked per day, the price you paid per pack, and how many days ago you quit.",
    faqs: [
      { question: "How much does a pack-a-day habit cost per year?", answer: "At $8 a pack, smoking 20 cigarettes a day costs $8 a day — $2,920 a year and $29,200 over 10 years. That full amount becomes your saving when you quit." },
      { question: "How much do I save in the first month after quitting?", answer: "A pack-a-day smoker paying $8 a pack saves $240 in the first 30 days — 600 cigarettes not smoked and 30 packs not bought. A half-pack-a-day habit saves about $120 in the same month." },
      { question: "How many cigarettes are in a pack?", answer: "A standard US pack contains 20 cigarettes. Some brands sell packs of 25 — set the cigarettes-per-pack field to match what you used to buy." },
      { question: "What could the money be worth if I invested it instead?", answer: "Saving $2,920 a year and investing it at a 5% average annual return would grow to about $36,727 after 10 years — roughly $7,500 more than the $29,200 you simply did not spend. That invested figure is an illustration, not a guarantee." },
    ],
    relatedCalcs: [
      { name: "Cost of Alcohol Calculator", slug: "cost-of-alcohol-calculator", icon: "layers", category: "other" },
      { name: "Blood Alcohol Calculator", slug: "blood-alcohol-calculator", icon: "layers", category: "other" },
      { name: "Savings Calculator", slug: "savings-calculator", icon: "dollar", category: "finance" },
      { name: "Caffeine Calculator", slug: "caffeine-calculator", icon: "layers", category: "other" },
    ],
  },
  {
    slug: "cost-of-alcohol-calculator", name: "Cost of Alcohol Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Health & Safety",
    description: "Calculate how much you spend on alcohol per week, month, and year, and what the same money could grow to if it was invested instead.",
    metaDescription: "Free cost of alcohol calculator. Enter drinks per week and cost per drink to see your weekly, monthly and yearly alcohol spend, drinks per year, and the multi-year total.",
    icon: "layers",
    inputs: [
      { id: "drinksPerWeek", label: "Drinks Per Week", type: "number", defaultValue: 10 },
      { id: "costPerDrink", label: "Average Cost Per Drink ($)", type: "number", defaultValue: 6, prefix: "$", step: 0.01 },
      { id: "years", label: "Years at This Rate", type: "number", defaultValue: 10 },
    ],
    calculate: (v) => {
      const weekly = v.drinksPerWeek * v.costPerDrink;
      const yearly = weekly * 52;
      const invested = v.years > 0 ? yearly * ((Math.pow(1.05, v.years) - 1) / 0.05) : 0;
      return [
        { label: `Cost Over ${v.years} Years`, value: fmt0(yearly * v.years), highlight: true },
        { label: "Weekly Spend", value: fmt(weekly) },
        { label: "Monthly Spend", value: fmt((weekly * 52) / 12) },
        { label: "Yearly Spend", value: fmt0(yearly) },
        { label: "Drinks Per Year", value: num(v.drinksPerWeek * 52) },
        { label: "If Invested at 5%/yr Instead", value: fmt0(invested) },
      ];
    },
    formula: { expression: "Yearly spend = Drinks per week × Cost per drink × 52", variables: ["Monthly spend = Yearly spend ÷ 12", "Invested comparison assumes a 5% average annual return, saved yearly"] },
    howToUse: "Enter how many drinks you have in a typical week, what one drink usually costs you, and a number of years to total up.",
    faqs: [
      { question: "How much does one drink a day cost per year?", answer: "One $6 drink a day is 7 drinks a week: $42 a week, or $2,184 a year. At a $10 bar price, the same one-a-day habit costs $3,640 a year." },
      { question: "How much do I spend on alcohol per month?", answer: "Multiply your weekly spend by 52, then divide by 12. Ten drinks a week at $6 each is $60 a week, which works out to $260 a month and $3,120 a year." },
      { question: "How many drinks is that per year?", answer: "Drinks per week multiplied by 52. Ten drinks a week is 520 drinks a year; two drinks a day (14 a week) is 728 a year." },
      { question: "What if I invested the money instead of drinking it?", answer: "At a 5% average annual return, saving $3,120 a year instead grows to about $39,243 in 10 years — roughly $8,000 more than the $31,200 spent. An illustration of the trade-off, not a guarantee of returns." },
    ],
    relatedCalcs: [
      { name: "Quit Smoking Savings Calculator", slug: "quit-smoking-calculator", icon: "layers", category: "other" },
      { name: "Blood Alcohol Calculator", slug: "blood-alcohol-calculator", icon: "layers", category: "other" },
      { name: "Savings Calculator", slug: "savings-calculator", icon: "dollar", category: "finance" },
      { name: "Caffeine Calculator", slug: "caffeine-calculator", icon: "layers", category: "other" },
    ],
  },
];
