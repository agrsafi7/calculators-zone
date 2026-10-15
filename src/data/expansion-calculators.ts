import { CalculatorConfig } from "@/components/CalculatorTemplate";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);
const fmt0 = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
const fmtGBP = (n: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 2 }).format(n);
const fmtGBP0 = (n: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);

const amortMonthly = (principal: number, annualRate: number, months: number): number => {
  if (months <= 0) return 0;
  if (annualRate === 0) return principal / months;
  const r = annualRate / 100 / 12;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
};

export const expansionCalculators: CalculatorConfig[] = [
  // 1. Financial (TVM) Calculator
  {
    slug: "financial-calculator",
    name: "Financial Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Solve time-value-of-money problems: calculate the periodic payment needed to pay off a loan or reach a savings goal, with total interest breakdown.",
    metaDescription: "Free financial calculator (TVM solver). Calculate loan payments, total interest, and payoff totals for any interest rate and term.",
    icon: "dollar",
    inputs: [
      { id: "principal", label: "Loan / Present Value", type: "number", defaultValue: 200000, prefix: "$" },
      { id: "rate", label: "Annual Interest Rate (%)", type: "number", defaultValue: 6, suffix: "%", step: 0.1 },
      { id: "years", label: "Term (years)", type: "number", defaultValue: 30 },
    ],
    calculate: (v) => {
      const months = Math.max(1, Math.round(v.years * 12));
      const pmt = amortMonthly(v.principal, v.rate, months);
      const total = pmt * months;
      return [
        { label: "Monthly Payment", value: fmt(pmt), highlight: true },
        { label: "Total Paid", value: fmt0(total) },
        { label: "Total Interest", value: fmt0(total - v.principal) },
      ];
    },
    formula: { expression: "PMT = PV × r / (1 − (1+r)^−n)", variables: ["PMT = Periodic Payment", "PV = Present Value", "r = Rate per Period", "n = Number of Periods"] },
    howToUse: "Enter the loan amount (present value), annual interest rate, and term in years. The calculator solves for the fixed periodic payment and shows exactly how much of your money goes to interest versus principal.",
    faqs: [
      { question: "What is the time value of money?", answer: "Money today is worth more than the same amount in the future because it can earn interest. TVM math — present value, future value, payments, rate, and periods — connects these concepts, and this calculator solves for the payment leg of that relationship." },
      { question: "Does this work for savings goals too?", answer: "The same formula works in reverse: it tells you the fixed monthly deposit needed to reach a target. Enter your goal as the loan amount to see the required monthly saving." },
    ],
    relatedCalcs: [
      { name: "Loan Calculator", slug: "loan-calculator", icon: "dollar", category: "finance" },
      { name: "Amortization Calculator", slug: "amortization-calculator", icon: "dollar", category: "finance" },
      { name: "Compound Interest Calculator", slug: "compound-interest-calculator", icon: "dollar", category: "finance" },
    ],
  },

  // 2. UK Mortgage Calculator
  {
    slug: "uk-mortgage-calculator",
    name: "UK Mortgage Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Calculate monthly repayments for a UK repayment mortgage. Enter the property price, deposit percentage, interest rate, and term.",
    metaDescription: "Free UK mortgage calculator. Estimate monthly repayments, total interest, and loan amount for a UK repayment mortgage.",
    icon: "dollar",
    inputs: [
      { id: "price", label: "Property Price (£)", type: "number", defaultValue: 300000, prefix: "£" },
      { id: "depositPct", label: "Deposit (%)", type: "number", defaultValue: 10, suffix: "%" },
      { id: "rate", label: "Interest Rate (% APR)", type: "number", defaultValue: 5, suffix: "%", step: 0.1 },
      { id: "term", label: "Mortgage Term (years)", type: "number", defaultValue: 25 },
    ],
    calculate: (v) => {
      const loan = v.price * (1 - v.depositPct / 100);
      const months = Math.max(1, Math.round(v.term * 12));
      const monthly = amortMonthly(loan, v.rate, months);
      return [
        { label: "Monthly Repayment", value: fmtGBP(monthly), highlight: true },
        { label: "Mortgage Amount", value: fmtGBP0(loan) },
        { label: "Total Interest", value: fmtGBP0(monthly * months - loan) },
      ];
    },
    formula: { expression: "M = P × r(1+r)^n / ((1+r)^n − 1)", variables: ["M = Monthly Repayment", "P = Mortgage Amount", "r = Monthly Rate", "n = Number of Payments"] },
    howToUse: "Enter the property price, your deposit as a percentage, the mortgage interest rate, and the term. The calculator shows your monthly repayment on a standard UK capital-and-interest (repayment) mortgage, plus total interest over the full term.",
    faqs: [
      { question: "What is a repayment mortgage?", answer: "The standard UK mortgage type: each monthly payment covers interest plus a slice of the capital, so the balance reaches zero at the end of the term — unlike interest-only mortgages, where you must repay the capital separately." },
      { question: "How does the deposit affect my mortgage?", answer: "A bigger deposit means a smaller loan and usually access to lower interest rates, since lenders price by loan-to-value (LTV). A 10% deposit means a 90% LTV mortgage." },
    ],
    relatedCalcs: [
      { name: "Mortgage Calculator", slug: "mortgage-calculator", icon: "dollar", category: "finance" },
      { name: "House Affordability Calculator", slug: "house-affordability-calculator", icon: "dollar", category: "finance" },
      { name: "Rent vs Buy Calculator", slug: "rent-vs-buy-calculator", icon: "dollar", category: "finance" },
    ],
  },

  // 3. Canadian Mortgage Calculator (semi-annual compounding)
  {
    slug: "canadian-mortgage-calculator",
    name: "Canadian Mortgage Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Calculate Canadian mortgage payments with correct semi-annual compounding. Enter home price, down payment, rate, and amortization.",
    metaDescription: "Free Canadian mortgage calculator with semi-annual compounding. Estimate monthly payments and total interest for a Canadian mortgage.",
    icon: "dollar",
    inputs: [
      { id: "price", label: "Home Price", type: "number", defaultValue: 600000, prefix: "$" },
      { id: "down", label: "Down Payment", type: "number", defaultValue: 120000, prefix: "$" },
      { id: "rate", label: "Annual Rate (%)", type: "number", defaultValue: 5.5, suffix: "%", step: 0.05 },
      { id: "amort", label: "Amortization (years)", type: "number", defaultValue: 25 },
    ],
    calculate: (v) => {
      const principal = Math.max(0, v.price - v.down);
      const months = Math.max(1, Math.round(v.amort * 12));
      // Canadian mortgages compound semi-annually: monthly rate = (1 + i/2)^(2/12) - 1
      const r = Math.pow(1 + v.rate / 200, 2 / 12) - 1;
      const monthly = r === 0 ? principal / months : (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
      return [
        { label: "Monthly Payment", value: fmt(monthly), highlight: true },
        { label: "Mortgage Amount", value: fmt0(principal) },
        { label: "Total Interest", value: fmt0(monthly * months - principal) },
      ];
    },
    formula: { expression: "r = (1 + i/2)^(1/6) − 1, then standard amortization", variables: ["i = Quoted Annual Rate", "r = Equivalent Monthly Rate", "Semi-annual compounding (Canadian standard)"] },
    howToUse: "Enter your home price, down payment, quoted mortgage rate, and amortization period. Unlike US calculations, Canadian law requires rates to compound semi-annually — this calculator applies the correct conversion so your payment matches what a Canadian lender quotes.",
    faqs: [
      { question: "Why is Canadian mortgage math different?", answer: "Canadian fixed-rate mortgages compound semi-annually, not monthly. A 5.5% Canadian rate equals a slightly lower effective monthly rate than a 5.5% US rate — the difference is small per month but real over 25 years." },
      { question: "What is the minimum down payment in Canada?", answer: "5% on the first $500,000 and 10% on the portion above, up to $1M. Down payments under 20% require CMHC mortgage insurance, which is added to the loan." },
    ],
    relatedCalcs: [
      { name: "Mortgage Calculator", slug: "mortgage-calculator", icon: "dollar", category: "finance" },
      { name: "Down Payment Calculator", slug: "down-payment-calculator", icon: "dollar", category: "finance" },
      { name: "Amortization Calculator", slug: "amortization-calculator", icon: "dollar", category: "finance" },
    ],
  },

  // 4. Cash Back vs Low Interest Calculator
  {
    slug: "cash-back-vs-low-interest-calculator",
    name: "Cash Back vs Low Interest Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Should you take the cash back rebate or the low APR financing on a car? Compare both deals side by side and see which saves you more.",
    metaDescription: "Free cash back vs low interest calculator. Compare auto loan rebate vs low APR financing to find the cheaper deal.",
    icon: "dollar",
    inputs: [
      { id: "price", label: "Vehicle Price", type: "number", defaultValue: 30000, prefix: "$" },
      { id: "cashback", label: "Cash Back Rebate", type: "number", defaultValue: 2000, prefix: "$" },
      { id: "highRate", label: "Rate with Cash Back (%)", type: "number", defaultValue: 7, suffix: "%", step: 0.1 },
      { id: "lowRate", label: "Low APR Offer (%)", type: "number", defaultValue: 2.9, suffix: "%", step: 0.1 },
      { id: "term", label: "Loan Term (months)", type: "number", defaultValue: 60 },
    ],
    calculate: (v) => {
      const months = Math.max(1, Math.round(v.term));
      const loanA = Math.max(0, v.price - v.cashback);
      const mA = amortMonthly(loanA, v.highRate, months);
      const mB = amortMonthly(v.price, v.lowRate, months);
      const totalA = mA * months;
      const totalB = mB * months;
      const diff = Math.abs(totalA - totalB);
      const better = totalA < totalB ? `Cash back saves ${fmt0(diff)}` : totalB < totalA ? `Low APR saves ${fmt0(diff)}` : "Both deals cost the same";
      return [
        { label: "Better Deal", value: better, highlight: true },
        { label: "Monthly (Cash Back)", value: fmt(mA) },
        { label: "Monthly (Low APR)", value: fmt(mB) },
        { label: "Total Cost (Cash Back)", value: fmt0(totalA) },
        { label: "Total Cost (Low APR)", value: fmt0(totalB) },
      ];
    },
    formula: { expression: "Compare total cost = monthly payment × term, for each offer", variables: ["Offer A: (Price − Rebate) at the higher rate", "Offer B: Full price at the low APR"] },
    howToUse: "Enter the vehicle price, the cash-back rebate amount, the interest rate you'd pay if you take the rebate, the promotional low APR, and the loan term. The calculator totals both deals so you can see — in dollars, not guesses — which offer is genuinely cheaper.",
    faqs: [
      { question: "Is 0% APR always the best deal?", answer: "Not always. On a $30,000 car, a $2,000 rebate at 7% can beat 2.9% with no rebate over longer terms — it depends on the numbers, which is exactly what this comparison reveals." },
      { question: "Can I negotiate and still get the rebate?", answer: "Yes — negotiate the vehicle price first, then apply the rebate or low-APR offer. The rebate comes from the manufacturer, so a lower negotiated price stacks with it." },
    ],
    relatedCalcs: [
      { name: "Auto Loan Calculator", slug: "auto-loan-calculator", icon: "dollar", category: "finance" },
      { name: "Loan Calculator", slug: "loan-calculator", icon: "dollar", category: "finance" },
      { name: "Car Depreciation Calculator", slug: "car-depreciation-calculator", icon: "dollar", category: "finance" },
    ],
  },

  // 5. Basic Calculator
  {
    slug: "basic-calculator",
    name: "Basic Calculator",
    category: "Math",
    categorySlug: "math",
    description: "A simple online calculator for everyday arithmetic: add, subtract, multiply, divide, and powers — instant results, no downloads.",
    metaDescription: "Free basic calculator online. Add, subtract, multiply, and divide instantly — simple, fast, and mobile-friendly.",
    icon: "hash",
    inputs: [
      { id: "a", label: "First Number", type: "number", defaultValue: 12 },
      {
        id: "op", label: "Operation", type: "select", defaultValue: 0,
        options: [
          { value: 0, label: "Add (+)" },
          { value: 1, label: "Subtract (−)" },
          { value: 2, label: "Multiply (×)" },
          { value: 3, label: "Divide (÷)" },
          { value: 4, label: "Power (^)" },
        ],
      },
      { id: "b", label: "Second Number", type: "number", defaultValue: 8 },
    ],
    calculate: (v) => {
      const symbols = ["+", "−", "×", "÷", "^"];
      let result: string;
      switch (v.op) {
        case 0: result = `${v.a + v.b}`; break;
        case 1: result = `${v.a - v.b}`; break;
        case 2: result = `${v.a * v.b}`; break;
        case 3: result = v.b === 0 ? "Undefined (÷ 0)" : `${v.a / v.b}`; break;
        case 4: result = `${Math.pow(v.a, v.b)}`; break;
        default: result = "—";
      }
      return [
        { label: "Result", value: result, highlight: true },
        { label: "Expression", value: `${v.a} ${symbols[v.op] ?? "?"} ${v.b}` },
      ];
    },
    formula: { expression: "Enter two numbers, pick an operation, get the answer", variables: ["Addition", "Subtraction", "Multiplication", "Division", "Exponents"] },
    howToUse: "Type your first number, choose the operation, type the second number — the result appears instantly. Use it for quick everyday arithmetic: bills, measurements, homework checks, and anything else that needs a fast, reliable answer.",
    faqs: [
      { question: "Why use this instead of my phone's calculator?", answer: "No app switching, no clutter — it's instant in your browser, works on any device, and keeps a clean history-free interface for one-off calculations." },
      { question: "Can it handle decimals and negatives?", answer: "Yes. Enter decimal points and negative numbers freely; division by zero is flagged rather than crashing." },
    ],
    relatedCalcs: [
      { name: "Scientific Calculator", slug: "scientific-calculator", icon: "hash", category: "math" },
      { name: "Percentage Calculator", slug: "percentage-calculator", icon: "hash", category: "math" },
      { name: "Fraction Calculator", slug: "fraction-calculator", icon: "hash", category: "math" },
    ],
  },

  // 6. Percent Off Calculator
  {
    slug: "percent-off-calculator",
    name: "Percent Off Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Calculate sale prices instantly: enter the original price and the percent off to see your discount amount and final price.",
    metaDescription: "Free percent off calculator. Find sale prices and discount savings from any percent-off deal instantly.",
    icon: "dollar",
    inputs: [
      { id: "price", label: "Original Price", type: "number", defaultValue: 100, prefix: "$" },
      { id: "pct", label: "Percent Off (%)", type: "number", defaultValue: 25, suffix: "%" },
    ],
    calculate: (v) => {
      const save = (v.price * v.pct) / 100;
      return [
        { label: "Sale Price", value: fmt(v.price - save), highlight: true },
        { label: "You Save", value: fmt(save) },
      ];
    },
    formula: { expression: "Sale Price = Original × (1 − %off/100)", variables: ["Discount = Original × %off/100"] },
    howToUse: "Enter the original price and the discount percentage. You'll instantly see the sale price and exactly how much money you keep in your pocket.",
    faqs: [
      { question: "How do I calculate 30% off $80 in my head?", answer: "Find 10% first ($8), then triple it ($24 off) — the sale price is $80 − $24 = $56. This calculator does the same thing instantly for any numbers." },
      { question: "Do stacked discounts add up?", answer: "No — '20% off then an extra 10% off' is not 30% off. The second discount applies to the already-reduced price: $100 → $80 → $72, which is 28% off total." },
    ],
    relatedCalcs: [
      { name: "Discount Calculator", slug: "discount-calculator", icon: "dollar", category: "finance" },
      { name: "Sales Tax Calculator", slug: "sales-tax-calculator", icon: "dollar", category: "finance" },
      { name: "Tip Calculator", slug: "tip-calculator", icon: "dollar", category: "finance" },
    ],
  },

  // 7. Bra Size Calculator
  {
    slug: "bra-size-calculator",
    name: "Bra Size Calculator",
    category: "Health",
    categorySlug: "health",
    description: "Find your bra size from two measurements: underbust and bust. Get your band size, cup size, and full size in seconds.",
    metaDescription: "Free bra size calculator. Measure underbust and bust to find your band, cup, and full bra size.",
    icon: "heart",
    inputs: [
      { id: "under", label: "Underbust (inches)", type: "number", defaultValue: 32, step: 0.5, min: 24, max: 60 },
      { id: "bust", label: "Bust — fullest part (inches)", type: "number", defaultValue: 36, step: 0.5, min: 24, max: 70 },
    ],
    calculate: (v) => {
      let band = Math.round(v.under);
      if (band % 2 !== 0) band += 1; // bands come in even sizes
      const diff = Math.round(v.bust - band);
      const cups = ["AA", "A", "B", "C", "D", "DD/E", "DDD/F", "G", "H", "I", "J"];
      const cup = diff <= 0 ? cups[0] : cups[Math.min(diff, cups.length - 1)];
      return [
        { label: "Your Bra Size", value: `${band}${cup}`, highlight: true },
        { label: "Band Size", value: `${band}` },
        { label: "Cup Size", value: cup },
      ];
    },
    formula: { expression: "Band = underbust rounded to nearest even; Cup = bust − band (1\" = A, 2\" = B, …)", variables: ["Measure snugly under the bust", "Measure around the fullest part"] },
    howToUse: "With a soft tape measure: (1) measure snugly around your ribcage directly under your bust — that's the underbust; (2) measure around the fullest part of your bust. Enter both in inches for your US band + cup size.",
    faqs: [
      { question: "Why does my calculated size differ from what I wear?", answer: "Most people wear the wrong size — studies suggest up to 80% do. Brands also vary ('vanity sizing'), so treat the calculated size as your starting point and try sister sizes (e.g., 34C ≈ 32D ≈ 36B) for the best fit." },
      { question: "Does this work for UK/EU sizes?", answer: "This calculator gives US sizing. UK cup letters match US up to DD; beyond that they diverge (UK: E, F, FF, G…), so check a conversion chart if you buy UK brands." },
    ],
    relatedCalcs: [
      { name: "Body Fat Calculator", slug: "body-fat-calculator", icon: "heart", category: "health" },
      { name: "Ideal Weight Calculator", slug: "ideal-weight-calculator", icon: "heart", category: "health" },
      { name: "BMI Calculator", slug: "bmi-calculator", icon: "heart", category: "health" },
    ],
  },

  // 8. Carbohydrate Calculator
  {
    slug: "carbohydrate-calculator",
    name: "Carbohydrate Calculator",
    category: "Health",
    categorySlug: "health",
    description: "Calculate your daily carbohydrate needs in grams based on your calorie target and the share of calories you want from carbs.",
    metaDescription: "Free carbohydrate calculator. Find your optimal daily carb intake in grams from your calorie goal.",
    icon: "heart",
    inputs: [
      { id: "calories", label: "Daily Calories", type: "number", defaultValue: 2500, min: 1000, max: 10000 },
      {
        id: "pct", label: "Carbs (% of calories)", type: "select", defaultValue: 50,
        options: [
          { value: 45, label: "45% — lower carb" },
          { value: 50, label: "50% — balanced" },
          { value: 55, label: "55% — active" },
          { value: 60, label: "60% — endurance" },
        ],
      },
    ],
    calculate: (v) => {
      const grams = (v.calories * v.pct) / 100 / 4;
      return [
        { label: "Daily Carbohydrates", value: `${Math.round(grams)} g`, highlight: true },
        { label: "Calories from Carbs", value: `${Math.round((v.calories * v.pct) / 100)} kcal` },
      ];
    },
    formula: { expression: "Carb grams = (Calories × carb%) ÷ 4", variables: ["Carbohydrates provide 4 kcal per gram"] },
    howToUse: "Enter your daily calorie target and choose what share should come from carbohydrates (dietary guidelines suggest 45–65%). The calculator converts it to grams — the number you'll actually track on food labels.",
    faqs: [
      { question: "How many carbs should I eat per day?", answer: "For a 2,500 kcal diet at 50% carbs, that's about 313 g/day. Active people and endurance athletes trend higher (55–60%); low-carb approaches go below 45%. Match the percentage to your training and goals." },
      { question: "Are carbs bad for weight loss?", answer: "No — total calories determine weight change, not carbs alone. Very low-carb diets work for some people mainly because they reduce overall intake. Choose the carb level you can sustain." },
    ],
    relatedCalcs: [
      { name: "Calorie Calculator", slug: "calorie-calculator", icon: "heart", category: "health" },
      { name: "Macro Calculator", slug: "macro-calculator", icon: "heart", category: "health" },
      { name: "Protein Intake Calculator", slug: "protein-intake-calculator", icon: "heart", category: "health" },
    ],
  },
];
