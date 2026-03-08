import { CalculatorConfig } from "@/components/CalculatorTemplate";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);
const fmt0 = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
const pct = (n: number) => `${n.toFixed(2)}%`;

const loanCalc = (principal: number, annualRate: number, months: number) => {
  if (annualRate === 0) return { monthly: principal / months, totalInterest: 0, totalPayment: principal };
  const r = annualRate / 100 / 12;
  const monthly = (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  const totalPayment = monthly * months;
  return { monthly, totalInterest: totalPayment - principal, totalPayment };
};

const financeRelated = (exclude: string) => [
  { name: "Mortgage Calculator", slug: "mortgage-calculator", icon: "dollar", category: "finance" },
  { name: "Loan Calculator", slug: "loan-calculator", icon: "dollar", category: "finance" },
  { name: "Compound Interest", slug: "compound-interest-calculator", icon: "dollar", category: "finance" },
  { name: "Savings Calculator", slug: "savings-calculator", icon: "dollar", category: "finance" },
].filter((c) => c.slug !== exclude);

const _financeCalculators: CalculatorConfig[] = [
  // 1. Loan Calculator
  {
    slug: "loan-calculator",
    name: "Loan Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Calculate your monthly loan payments, total interest, and total cost for any type of loan. Adjust principal, rate, and term to find the best plan.",
    metaDescription: "Free online loan calculator. Estimate monthly payments, total interest costs, and amortization for personal, auto, or business loans.",
    icon: "dollar",
    inputs: [
      { id: "principal", label: "Loan Amount", type: "number", defaultValue: 25000, prefix: "$" },
      { id: "rate", label: "Interest Rate (%)", type: "number", defaultValue: 7, suffix: "%", step: 0.1 },
      { id: "term", label: "Loan Term (months)", type: "number", defaultValue: 60 },
    ],
    calculate: (v) => {
      const r = loanCalc(v.principal, v.rate, v.term);
      return [
        { label: "Monthly Payment", value: fmt(r.monthly), highlight: true },
        { label: "Total Interest", value: fmt0(r.totalInterest) },
        { label: "Total Payment", value: fmt0(r.totalPayment) },
      ];
    },
    formula: { expression: "M = P × [r(1+r)^n] / [(1+r)^n − 1]", variables: ["M = Monthly Payment", "P = Principal", "r = Monthly Rate", "n = Number of Payments"] },
    howToUse: "Enter your loan amount, annual interest rate, and loan term in months. The calculator instantly shows your monthly payment, total interest paid, and total cost of the loan.",
    faqs: [
      { question: "What is the difference between interest rate and APR?", answer: "The interest rate is the cost of borrowing the principal. APR includes the interest rate plus other fees and costs, giving you a more complete picture of the loan's true cost." },
      { question: "How can I reduce my total interest?", answer: "You can reduce interest by making extra payments, choosing a shorter term, or refinancing at a lower rate. Even small additional monthly payments can save thousands over the loan's life." },
    ],
    relatedCalcs: financeRelated("loan-calculator"),
  },
  // 2. Auto Loan Calculator
  {
    slug: "auto-loan-calculator",
    name: "Auto Loan Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Estimate your monthly car payment, total interest, and total cost of your auto loan. Factor in trade-in value and down payment.",
    metaDescription: "Free auto loan calculator. Estimate monthly car payments with trade-in, down payment, interest rate, and loan term.",
    icon: "dollar",
    inputs: [
      { id: "price", label: "Vehicle Price", type: "number", defaultValue: 35000, prefix: "$" },
      { id: "downPayment", label: "Down Payment", type: "number", defaultValue: 5000, prefix: "$" },
      { id: "tradeIn", label: "Trade-In Value", type: "number", defaultValue: 0, prefix: "$" },
      { id: "rate", label: "Interest Rate (%)", type: "number", defaultValue: 6.5, suffix: "%", step: 0.1 },
      { id: "term", label: "Loan Term (months)", type: "number", defaultValue: 60 },
    ],
    calculate: (v) => {
      const principal = v.price - v.downPayment - v.tradeIn;
      const r = loanCalc(Math.max(principal, 0), v.rate, v.term);
      return [
        { label: "Monthly Payment", value: fmt(r.monthly), highlight: true },
        { label: "Loan Amount", value: fmt0(Math.max(principal, 0)) },
        { label: "Total Interest", value: fmt0(r.totalInterest) },
        { label: "Total Cost", value: fmt0(r.totalPayment + v.downPayment + v.tradeIn) },
      ];
    },
    formula: { expression: "M = (Price − Down − Trade) × [r(1+r)^n] / [(1+r)^n − 1]", variables: ["M = Monthly Payment", "r = Monthly Interest Rate", "n = Number of Payments"] },
    howToUse: "Enter the vehicle price, your down payment, any trade-in value, interest rate, and loan term. The calculator computes your monthly payment and total loan cost.",
    faqs: [
      { question: "What is a good auto loan rate?", answer: "Good rates depend on your credit score and market conditions. As of 2024-2025, rates between 4-7% are typical for new cars with good credit. Used car rates tend to be 1-2% higher." },
      { question: "Should I make a larger down payment?", answer: "A larger down payment reduces your loan amount, monthly payments, and total interest. Aim for at least 20% to avoid being upside-down on the loan." },
    ],
    relatedCalcs: financeRelated("auto-loan-calculator"),
  },
  // 3. Personal Loan Calculator
  {
    slug: "personal-loan-calculator",
    name: "Personal Loan Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Calculate monthly payments and total costs for personal loans. Compare different rates and terms to find the most affordable option.",
    metaDescription: "Free personal loan calculator. Calculate monthly payments, interest costs, and total repayment for any personal loan amount.",
    icon: "dollar",
    inputs: [
      { id: "amount", label: "Loan Amount", type: "number", defaultValue: 15000, prefix: "$" },
      { id: "rate", label: "Interest Rate (%)", type: "number", defaultValue: 10, suffix: "%", step: 0.1 },
      { id: "term", label: "Loan Term (months)", type: "number", defaultValue: 36 },
      { id: "origFee", label: "Origination Fee (%)", type: "number", defaultValue: 2, suffix: "%", step: 0.5 },
    ],
    calculate: (v) => {
      const fee = v.amount * (v.origFee / 100);
      const r = loanCalc(v.amount, v.rate, v.term);
      return [
        { label: "Monthly Payment", value: fmt(r.monthly), highlight: true },
        { label: "Origination Fee", value: fmt(fee) },
        { label: "Total Interest", value: fmt0(r.totalInterest) },
        { label: "Total Cost (incl. fee)", value: fmt0(r.totalPayment + fee) },
      ];
    },
    formula: { expression: "M = P × [r(1+r)^n] / [(1+r)^n − 1]", variables: ["P = Loan Amount", "r = Monthly Rate", "n = Term in Months"] },
    howToUse: "Enter the loan amount you need, expected interest rate, term length, and any origination fee. The calculator shows your monthly payment and total cost including fees.",
    faqs: [
      { question: "What credit score do I need for a personal loan?", answer: "Most lenders require a minimum score of 580-620. Better scores (700+) qualify for lower rates, potentially saving thousands in interest." },
      { question: "Are personal loans better than credit cards?", answer: "Personal loans typically have lower interest rates than credit cards and fixed repayment schedules, making them better for large, planned expenses or debt consolidation." },
    ],
    relatedCalcs: financeRelated("personal-loan-calculator"),
  },
  // 4. Student Loan Calculator
  {
    slug: "student-loan-calculator",
    name: "Student Loan Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Estimate your monthly student loan payments and see how different repayment plans affect your total cost. Plan your education debt payoff strategy.",
    metaDescription: "Free student loan calculator. Estimate monthly payments, total interest, and repayment timelines for federal and private student loans.",
    icon: "dollar",
    inputs: [
      { id: "balance", label: "Loan Balance", type: "number", defaultValue: 35000, prefix: "$" },
      { id: "rate", label: "Interest Rate (%)", type: "number", defaultValue: 5.5, suffix: "%", step: 0.1 },
      { id: "term", label: "Repayment Term (years)", type: "number", defaultValue: 10 },
    ],
    calculate: (v) => {
      const months = v.term * 12;
      const r = loanCalc(v.balance, v.rate, months);
      return [
        { label: "Monthly Payment", value: fmt(r.monthly), highlight: true },
        { label: "Total Interest", value: fmt0(r.totalInterest) },
        { label: "Total Repayment", value: fmt0(r.totalPayment) },
        { label: "Payoff Date", value: new Date(Date.now() + months * 30.44 * 24 * 3600 * 1000).toLocaleDateString("en-US", { month: "short", year: "numeric" }) },
      ];
    },
    formula: { expression: "M = P × [r(1+r)^n] / [(1+r)^n − 1]", variables: ["P = Loan Balance", "r = Monthly Interest Rate", "n = Total Payments"] },
    howToUse: "Enter your total student loan balance, interest rate, and desired repayment term. See your monthly payment and how much interest you'll pay over the life of the loan.",
    faqs: [
      { question: "Should I refinance my student loans?", answer: "Refinancing can lower your interest rate and monthly payment, but you may lose federal loan benefits like income-driven repayment and loan forgiveness. Consider carefully." },
      { question: "What is income-driven repayment?", answer: "Income-driven plans cap your monthly payment at a percentage of your discretionary income (typically 10-20%). After 20-25 years of payments, the remaining balance may be forgiven." },
    ],
    relatedCalcs: financeRelated("student-loan-calculator"),
  },
  // 5. Refinance Calculator
  {
    slug: "refinance-calculator",
    name: "Refinance Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Compare your current loan to a refinanced loan. See how much you could save monthly and over the life of your loan by refinancing.",
    metaDescription: "Free refinance calculator. Compare current vs. new loan terms to see monthly savings and total interest reduction from refinancing.",
    icon: "dollar",
    inputs: [
      { id: "balance", label: "Current Loan Balance", type: "number", defaultValue: 250000, prefix: "$" },
      { id: "currentRate", label: "Current Interest Rate (%)", type: "number", defaultValue: 7, suffix: "%", step: 0.1 },
      { id: "currentTerm", label: "Remaining Term (months)", type: "number", defaultValue: 300 },
      { id: "newRate", label: "New Interest Rate (%)", type: "number", defaultValue: 5.5, suffix: "%", step: 0.1 },
      { id: "newTerm", label: "New Loan Term (months)", type: "number", defaultValue: 360 },
      { id: "closingCosts", label: "Closing Costs", type: "number", defaultValue: 5000, prefix: "$" },
    ],
    calculate: (v) => {
      const cur = loanCalc(v.balance, v.currentRate, v.currentTerm);
      const nw = loanCalc(v.balance, v.newRate, v.newTerm);
      const monthlySavings = cur.monthly - nw.monthly;
      const breakEven = monthlySavings > 0 ? Math.ceil(v.closingCosts / monthlySavings) : 0;
      return [
        { label: "New Monthly Payment", value: fmt(nw.monthly), highlight: true },
        { label: "Current Monthly Payment", value: fmt(cur.monthly) },
        { label: "Monthly Savings", value: fmt(monthlySavings) },
        { label: "Break-Even Point", value: `${breakEven} months` },
        { label: "Lifetime Savings", value: fmt0(cur.totalPayment - nw.totalPayment - v.closingCosts) },
      ];
    },
    formula: { expression: "Savings = Current Total − New Total − Closing Costs", variables: ["Current/New payments calculated via standard amortization"] },
    howToUse: "Enter your current loan balance, rate, and remaining term. Then enter the new rate, term, and closing costs. The calculator shows your monthly savings and break-even point.",
    faqs: [
      { question: "When does refinancing make sense?", answer: "Refinancing typically makes sense when you can reduce your rate by at least 0.5-1%, plan to stay in the home past the break-even point, and closing costs are reasonable." },
      { question: "What is the break-even point?", answer: "The break-even point is when your cumulative monthly savings exceed the closing costs. After this point, refinancing saves you money." },
    ],
    relatedCalcs: financeRelated("refinance-calculator"),
  },
  // 6. Mortgage Refinance Calculator
  {
    slug: "mortgage-refinance-calculator",
    name: "Mortgage Refinance Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Specifically designed for mortgage refinancing. Compare your current mortgage to a new one and calculate potential savings.",
    metaDescription: "Free mortgage refinance calculator. Compare current and new mortgage terms to find your monthly savings and break-even timeline.",
    icon: "dollar",
    inputs: [
      { id: "balance", label: "Remaining Mortgage Balance", type: "number", defaultValue: 300000, prefix: "$" },
      { id: "currentRate", label: "Current Rate (%)", type: "number", defaultValue: 6.5, suffix: "%", step: 0.1 },
      { id: "currentRemaining", label: "Remaining Term (years)", type: "number", defaultValue: 25 },
      { id: "newRate", label: "New Rate (%)", type: "number", defaultValue: 5.0, suffix: "%", step: 0.1 },
      { id: "newTerm", label: "New Term (years)", type: "number", defaultValue: 30 },
      { id: "closingCosts", label: "Closing Costs", type: "number", defaultValue: 6000, prefix: "$" },
    ],
    calculate: (v) => {
      const cur = loanCalc(v.balance, v.currentRate, v.currentRemaining * 12);
      const nw = loanCalc(v.balance, v.newRate, v.newTerm * 12);
      const savings = cur.monthly - nw.monthly;
      const breakEven = savings > 0 ? Math.ceil(v.closingCosts / savings) : 0;
      return [
        { label: "New Monthly Payment", value: fmt(nw.monthly), highlight: true },
        { label: "Monthly Savings", value: fmt(savings) },
        { label: "Break-Even", value: `${breakEven} months` },
        { label: "New Total Interest", value: fmt0(nw.totalInterest) },
        { label: "Lifetime Savings", value: fmt0(cur.totalPayment - nw.totalPayment - v.closingCosts) },
      ];
    },
    formula: { expression: "Savings = (Old Payment × Old Remaining) − (New Payment × New Term) − Closing Costs", variables: ["Payments calculated via standard mortgage formula"] },
    howToUse: "Enter your remaining mortgage balance, current rate and remaining term, then the new refinance terms and closing costs. See your potential monthly and lifetime savings.",
    faqs: [
      { question: "Should I refinance to a longer term?", answer: "A longer term lowers monthly payments but increases total interest. It can make sense if cash flow is a priority, but you'll pay more overall." },
      { question: "Can I refinance with bad credit?", answer: "Yes, but rates will be higher. FHA Streamline refinancing may be available if you have an existing FHA loan, often with minimal credit requirements." },
    ],
    relatedCalcs: financeRelated("mortgage-refinance-calculator"),
  },
  // 7. Amortization Calculator
  {
    slug: "amortization-calculator",
    name: "Amortization Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "See how your loan payments are split between principal and interest over time. Understand your amortization schedule at a glance.",
    metaDescription: "Free amortization calculator. See how each payment splits between principal and interest. Understand your loan payoff timeline.",
    icon: "dollar",
    inputs: [
      { id: "principal", label: "Loan Amount", type: "number", defaultValue: 200000, prefix: "$" },
      { id: "rate", label: "Interest Rate (%)", type: "number", defaultValue: 6, suffix: "%", step: 0.1 },
      { id: "term", label: "Loan Term (years)", type: "number", defaultValue: 30 },
      { id: "extraPayment", label: "Extra Monthly Payment", type: "number", defaultValue: 0, prefix: "$" },
    ],
    calculate: (v) => {
      const months = v.term * 12;
      const r = loanCalc(v.principal, v.rate, months);
      const withExtra = v.extraPayment > 0 ? loanCalc(v.principal, v.rate, months) : null;
      let savedInterest = 0;
      let savedMonths = 0;
      if (v.extraPayment > 0) {
        const mr = v.rate / 100 / 12;
        let balance = v.principal;
        let totalInt = 0;
        let m = 0;
        while (balance > 0 && m < months) {
          const intPayment = balance * mr;
          const princPayment = Math.min(r.monthly - intPayment + v.extraPayment, balance);
          totalInt += intPayment;
          balance -= princPayment;
          m++;
        }
        savedInterest = r.totalInterest - totalInt;
        savedMonths = months - m;
      }
      const results = [
        { label: "Monthly Payment", value: fmt(r.monthly), highlight: true },
        { label: "Total Interest", value: fmt0(r.totalInterest) },
        { label: "Total Payment", value: fmt0(r.totalPayment) },
      ];
      if (v.extraPayment > 0) {
        results.push(
          { label: "Interest Saved (extra payments)", value: fmt0(savedInterest) },
          { label: "Time Saved", value: `${Math.floor(savedMonths / 12)} yrs ${savedMonths % 12} mos` }
        );
      }
      return results;
    },
    formula: { expression: "M = P × [r(1+r)^n] / [(1+r)^n − 1]", variables: ["Interest portion decreases over time", "Principal portion increases over time"] },
    howToUse: "Enter your loan amount, interest rate, and term. Optionally add extra monthly payments to see how much time and interest you can save.",
    faqs: [
      { question: "What is amortization?", answer: "Amortization is the process of spreading a loan into fixed payments over time. Each payment covers interest and principal, with more going toward interest early on." },
      { question: "How do extra payments help?", answer: "Extra payments go directly toward principal, reducing the balance faster. This means less interest accrues, shortening your loan and saving money." },
    ],
    relatedCalcs: financeRelated("amortization-calculator"),
  },
  // 8. Mortgage Amortization Schedule Calculator
  {
    slug: "mortgage-amortization-schedule-calculator",
    name: "Mortgage Amortization Schedule",
    category: "Finance",
    categorySlug: "finance",
    description: "Generate a detailed mortgage amortization schedule. See the principal and interest breakdown for each year of your mortgage.",
    metaDescription: "Free mortgage amortization schedule calculator. View yearly breakdowns of principal, interest, and remaining balance for your mortgage.",
    icon: "dollar",
    inputs: [
      { id: "principal", label: "Mortgage Amount", type: "number", defaultValue: 350000, prefix: "$" },
      { id: "rate", label: "Interest Rate (%)", type: "number", defaultValue: 6.5, suffix: "%", step: 0.1 },
      { id: "term", label: "Term (years)", type: "number", defaultValue: 30 },
    ],
    calculate: (v) => {
      const months = v.term * 12;
      const r = loanCalc(v.principal, v.rate, months);
      const mr = v.rate / 100 / 12;
      let balance = v.principal;
      let y1Int = 0, y1Princ = 0;
      for (let i = 0; i < 12 && i < months; i++) {
        const intPmt = balance * mr;
        const princPmt = r.monthly - intPmt;
        y1Int += intPmt;
        y1Princ += princPmt;
        balance -= princPmt;
      }
      return [
        { label: "Monthly Payment", value: fmt(r.monthly), highlight: true },
        { label: "Year 1 Interest", value: fmt0(y1Int) },
        { label: "Year 1 Principal", value: fmt0(y1Princ) },
        { label: "Balance After Year 1", value: fmt0(balance) },
        { label: "Total Interest (full term)", value: fmt0(r.totalInterest) },
      ];
    },
    formula: { expression: "Each payment: Interest = Balance × r, Principal = Payment − Interest", variables: ["r = Monthly Interest Rate", "Balance decreases each month"] },
    howToUse: "Enter your mortgage amount, interest rate, and term. The calculator shows your payment breakdown for the first year and total interest over the full term.",
    faqs: [
      { question: "Why is most of my early payment interest?", answer: "Because interest is calculated on the remaining balance. Early on, the balance is highest, so more of each payment goes to interest. Over time, as the balance shrinks, more goes to principal." },
      { question: "How does a 15-year vs 30-year schedule compare?", answer: "A 15-year mortgage has higher monthly payments but dramatically less total interest — often saving hundreds of thousands of dollars over the life of the loan." },
    ],
    relatedCalcs: financeRelated("mortgage-amortization-schedule-calculator"),
  },
  // 9. Interest Rate Calculator
  {
    slug: "interest-rate-calculator",
    name: "Interest Rate Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Find the interest rate on a loan when you know the payment amount, principal, and term. Reverse-engineer any loan's rate.",
    metaDescription: "Free interest rate calculator. Determine the interest rate on any loan from the monthly payment, loan amount, and term.",
    icon: "dollar",
    inputs: [
      { id: "principal", label: "Loan Amount", type: "number", defaultValue: 20000, prefix: "$" },
      { id: "payment", label: "Monthly Payment", type: "number", defaultValue: 400, prefix: "$" },
      { id: "term", label: "Loan Term (months)", type: "number", defaultValue: 60 },
    ],
    calculate: (v) => {
      // Newton's method to find rate
      let rate = 0.05 / 12; // initial guess
      for (let i = 0; i < 100; i++) {
        const pmt = (v.principal * rate * Math.pow(1 + rate, v.term)) / (Math.pow(1 + rate, v.term) - 1);
        const pmt_deriv = v.principal * (
          (Math.pow(1 + rate, v.term) + rate * v.term * Math.pow(1 + rate, v.term - 1)) * (Math.pow(1 + rate, v.term) - 1) -
          rate * Math.pow(1 + rate, v.term) * v.term * Math.pow(1 + rate, v.term - 1)
        ) / Math.pow(Math.pow(1 + rate, v.term) - 1, 2);
        const newRate = rate - (pmt - v.payment) / pmt_deriv;
        if (Math.abs(newRate - rate) < 1e-10) break;
        rate = newRate;
      }
      const annualRate = rate * 12 * 100;
      const totalPaid = v.payment * v.term;
      return [
        { label: "Estimated Annual Rate", value: pct(annualRate), highlight: true },
        { label: "Monthly Rate", value: pct(annualRate / 12) },
        { label: "Total Paid", value: fmt0(totalPaid) },
        { label: "Total Interest", value: fmt0(totalPaid - v.principal) },
      ];
    },
    formula: { expression: "Solved iteratively: M = P × [r(1+r)^n] / [(1+r)^n − 1] for r", variables: ["M = Known Monthly Payment", "P = Known Principal", "n = Known Term"] },
    howToUse: "Enter the loan amount, your monthly payment, and term. The calculator uses Newton's method to determine the interest rate that produces that payment.",
    faqs: [
      { question: "How accurate is this calculation?", answer: "The Newton's method approach converges to an extremely accurate result, typically within 0.001% of the actual rate." },
      { question: "Why would I need to calculate the rate?", answer: "This is useful when a dealer or lender quotes a monthly payment without clearly stating the rate, allowing you to compare offers." },
    ],
    relatedCalcs: financeRelated("interest-rate-calculator"),
  },
  // 10. Compound Interest Calculator
  {
    slug: "compound-interest-calculator",
    name: "Compound Interest Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Calculate how your money grows with compound interest over time. See the power of compounding with different rates, periods, and contributions.",
    metaDescription: "Free compound interest calculator. See how your investment grows over time with compounding. Add monthly contributions to maximize growth.",
    icon: "dollar",
    inputs: [
      { id: "principal", label: "Initial Investment", type: "number", defaultValue: 10000, prefix: "$" },
      { id: "monthly", label: "Monthly Contribution", type: "number", defaultValue: 200, prefix: "$" },
      { id: "rate", label: "Annual Interest Rate (%)", type: "number", defaultValue: 7, suffix: "%", step: 0.1 },
      { id: "years", label: "Time Period (years)", type: "number", defaultValue: 20 },
      { id: "compound", label: "Compounding Frequency", type: "select", defaultValue: 12, options: [{ value: 1, label: "Annually" }, { value: 4, label: "Quarterly" }, { value: 12, label: "Monthly" }, { value: 365, label: "Daily" }] },
    ],
    calculate: (v) => {
      const n = v.compound;
      const r = v.rate / 100;
      const t = v.years;
      const futureP = v.principal * Math.pow(1 + r / n, n * t);
      const futureC = v.monthly * ((Math.pow(1 + r / n, n * t) - 1) / (r / n));
      const total = futureP + futureC;
      const totalContributed = v.principal + v.monthly * 12 * t;
      return [
        { label: "Future Value", value: fmt0(total), highlight: true },
        { label: "Total Contributions", value: fmt0(totalContributed) },
        { label: "Total Interest Earned", value: fmt0(total - totalContributed) },
        { label: "Interest as % of Total", value: pct(((total - totalContributed) / total) * 100) },
      ];
    },
    formula: { expression: "A = P(1 + r/n)^(nt) + PMT × [(1 + r/n)^(nt) − 1] / (r/n)", variables: ["A = Future Value", "P = Principal", "PMT = Monthly Contribution", "r = Annual Rate", "n = Compounds/Year"] },
    howToUse: "Enter your initial investment, monthly contribution, expected rate of return, time period, and compounding frequency. Watch your money grow exponentially.",
    faqs: [
      { question: "What is compound interest?", answer: "Compound interest means you earn interest not just on your initial investment, but also on the accumulated interest from previous periods. This creates exponential growth over time." },
      { question: "How does compounding frequency matter?", answer: "More frequent compounding (daily vs. annually) results in slightly more interest earned, though the difference is usually small for typical savings rates." },
    ],
    relatedCalcs: financeRelated("compound-interest-calculator"),
  },
  // 11. Simple Interest Calculator
  {
    slug: "simple-interest-calculator",
    name: "Simple Interest Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Calculate simple interest on a principal amount. Simple interest is calculated only on the original principal, not on accumulated interest.",
    metaDescription: "Free simple interest calculator. Calculate interest earned or owed using the simple interest formula I = P × R × T.",
    icon: "dollar",
    inputs: [
      { id: "principal", label: "Principal Amount", type: "number", defaultValue: 5000, prefix: "$" },
      { id: "rate", label: "Annual Rate (%)", type: "number", defaultValue: 5, suffix: "%", step: 0.1 },
      { id: "time", label: "Time (years)", type: "number", defaultValue: 3, step: 0.5 },
    ],
    calculate: (v) => {
      const interest = v.principal * (v.rate / 100) * v.time;
      return [
        { label: "Total Interest", value: fmt(interest), highlight: true },
        { label: "Total Amount", value: fmt(v.principal + interest) },
        { label: "Monthly Interest", value: fmt(interest / (v.time * 12)) },
      ];
    },
    formula: { expression: "I = P × R × T", variables: ["I = Interest", "P = Principal", "R = Annual Rate", "T = Time in Years"] },
    howToUse: "Enter the principal amount, annual interest rate, and time period. The calculator shows total simple interest earned and the final amount.",
    faqs: [
      { question: "When is simple interest used?", answer: "Simple interest is commonly used for short-term loans, car loans, and some savings instruments. It's also used for calculating interest on bonds." },
      { question: "What's the difference between simple and compound interest?", answer: "Simple interest is calculated only on the principal. Compound interest is calculated on the principal plus accumulated interest, leading to faster growth." },
    ],
    relatedCalcs: financeRelated("simple-interest-calculator"),
  },
  // 12. Investment Calculator
  {
    slug: "investment-calculator",
    name: "Investment Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Project the future value of your investments with regular contributions. See how different return rates and time horizons affect your portfolio.",
    metaDescription: "Free investment calculator. Project future portfolio value with initial investment, monthly contributions, and expected returns.",
    icon: "dollar",
    inputs: [
      { id: "initial", label: "Initial Investment", type: "number", defaultValue: 25000, prefix: "$" },
      { id: "monthly", label: "Monthly Contribution", type: "number", defaultValue: 500, prefix: "$" },
      { id: "rate", label: "Expected Annual Return (%)", type: "number", defaultValue: 8, suffix: "%", step: 0.1 },
      { id: "years", label: "Investment Period (years)", type: "number", defaultValue: 25 },
    ],
    calculate: (v) => {
      const r = v.rate / 100 / 12;
      const n = v.years * 12;
      const fvInitial = v.initial * Math.pow(1 + r, n);
      const fvContrib = v.monthly * ((Math.pow(1 + r, n) - 1) / r);
      const total = fvInitial + fvContrib;
      const totalInvested = v.initial + v.monthly * n;
      return [
        { label: "Future Value", value: fmt0(total), highlight: true },
        { label: "Total Invested", value: fmt0(totalInvested) },
        { label: "Investment Gains", value: fmt0(total - totalInvested) },
        { label: "Return on Investment", value: pct(((total - totalInvested) / totalInvested) * 100) },
      ];
    },
    formula: { expression: "FV = PV(1+r)^n + PMT × [(1+r)^n − 1] / r", variables: ["FV = Future Value", "PV = Present Value", "PMT = Monthly Payment", "r = Monthly Return Rate"] },
    howToUse: "Enter your starting amount, monthly contributions, expected annual return, and time horizon. The calculator projects your portfolio's future value.",
    faqs: [
      { question: "What return rate should I use?", answer: "The S&P 500 has historically returned about 10% annually before inflation (7% after). Use conservative estimates (6-8%) for planning purposes." },
      { question: "How important are monthly contributions?", answer: "Very important! Regular contributions combined with compound returns create significant wealth over time. Even $200/month can grow to over $150,000 in 20 years at 7% return." },
    ],
    relatedCalcs: financeRelated("investment-calculator"),
  },
  // 13. ROI Calculator
  {
    slug: "roi-calculator",
    name: "Return on Investment (ROI) Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Calculate the return on investment for any investment. Measure profit or loss relative to the cost of the investment.",
    metaDescription: "Free ROI calculator. Calculate return on investment percentage, annualized return, and net profit from any investment.",
    icon: "dollar",
    inputs: [
      { id: "invested", label: "Amount Invested", type: "number", defaultValue: 10000, prefix: "$" },
      { id: "returned", label: "Amount Returned", type: "number", defaultValue: 15000, prefix: "$" },
      { id: "years", label: "Investment Duration (years)", type: "number", defaultValue: 3, step: 0.5 },
    ],
    calculate: (v) => {
      const gain = v.returned - v.invested;
      const roi = (gain / v.invested) * 100;
      const annualized = (Math.pow(v.returned / v.invested, 1 / v.years) - 1) * 100;
      return [
        { label: "ROI", value: pct(roi), highlight: true },
        { label: "Annualized Return", value: pct(annualized) },
        { label: "Net Profit", value: fmt(gain) },
        { label: "Profit per Year", value: fmt(gain / v.years) },
      ];
    },
    formula: { expression: "ROI = [(Final Value − Initial Cost) / Initial Cost] × 100", variables: ["Annualized = (Final/Initial)^(1/years) − 1"] },
    howToUse: "Enter the amount you invested and the total value returned (including the original investment). Add the duration to see annualized returns.",
    faqs: [
      { question: "What is a good ROI?", answer: "A 'good' ROI depends on the investment type. Stock market averages 7-10% annually. Real estate might target 8-12%. High-risk investments should offer higher potential returns." },
      { question: "Why use annualized ROI?", answer: "Annualized ROI normalizes returns across different time periods, making it easier to compare investments with different durations." },
    ],
    relatedCalcs: financeRelated("roi-calculator"),
  },
  // 14. Savings Calculator
  {
    slug: "savings-calculator",
    name: "Savings Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Calculate how much your savings will grow over time. Set a savings goal and see how long it takes to reach it with regular deposits.",
    metaDescription: "Free savings calculator. Project savings growth with regular deposits and interest. Set and track savings goals.",
    icon: "dollar",
    inputs: [
      { id: "initial", label: "Initial Savings", type: "number", defaultValue: 5000, prefix: "$" },
      { id: "monthly", label: "Monthly Deposit", type: "number", defaultValue: 300, prefix: "$" },
      { id: "rate", label: "Annual Interest Rate (%)", type: "number", defaultValue: 4.5, suffix: "%", step: 0.1 },
      { id: "years", label: "Time Period (years)", type: "number", defaultValue: 10 },
    ],
    calculate: (v) => {
      const r = v.rate / 100 / 12;
      const n = v.years * 12;
      const fv = v.initial * Math.pow(1 + r, n) + v.monthly * ((Math.pow(1 + r, n) - 1) / r);
      const totalDeposited = v.initial + v.monthly * n;
      return [
        { label: "Future Balance", value: fmt0(fv), highlight: true },
        { label: "Total Deposited", value: fmt0(totalDeposited) },
        { label: "Interest Earned", value: fmt0(fv - totalDeposited) },
      ];
    },
    formula: { expression: "FV = P(1+r)^n + D × [(1+r)^n − 1] / r", variables: ["P = Initial Savings", "D = Monthly Deposit", "r = Monthly Rate", "n = Months"] },
    howToUse: "Enter your starting balance, monthly deposit amount, expected interest rate, and time period. See how your savings grow over time.",
    faqs: [
      { question: "Where should I save my money?", answer: "High-yield savings accounts (HYSAs) currently offer 4-5% APY. CDs offer slightly higher rates for locked periods. Compare rates regularly to maximize earnings." },
      { question: "How much should I save each month?", answer: "A common rule is the 50/30/20 budget: 50% needs, 30% wants, 20% savings and debt repayment. Adjust based on your income and goals." },
    ],
    relatedCalcs: financeRelated("savings-calculator"),
  },
  // 15. Retirement Calculator
  {
    slug: "retirement-calculator",
    name: "Retirement Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Plan your retirement savings. Calculate how much you need to save to maintain your lifestyle in retirement based on your current age and goals.",
    metaDescription: "Free retirement calculator. Estimate how much you need to save for retirement based on age, income, savings rate, and expected returns.",
    icon: "dollar",
    inputs: [
      { id: "age", label: "Current Age", type: "number", defaultValue: 30 },
      { id: "retireAge", label: "Retirement Age", type: "number", defaultValue: 65 },
      { id: "currentSavings", label: "Current Savings", type: "number", defaultValue: 50000, prefix: "$" },
      { id: "monthlyContrib", label: "Monthly Contribution", type: "number", defaultValue: 500, prefix: "$" },
      { id: "rate", label: "Expected Return (%)", type: "number", defaultValue: 7, suffix: "%", step: 0.1 },
      { id: "withdrawalRate", label: "Annual Withdrawal Rate (%)", type: "number", defaultValue: 4, suffix: "%", step: 0.1 },
    ],
    calculate: (v) => {
      const yearsToRetire = v.retireAge - v.age;
      const months = yearsToRetire * 12;
      const r = v.rate / 100 / 12;
      const fv = v.currentSavings * Math.pow(1 + r, months) + v.monthlyContrib * ((Math.pow(1 + r, months) - 1) / r);
      const annualIncome = fv * (v.withdrawalRate / 100);
      return [
        { label: "Projected Nest Egg", value: fmt0(fv), highlight: true },
        { label: "Annual Retirement Income", value: fmt0(annualIncome) },
        { label: "Monthly Retirement Income", value: fmt(annualIncome / 12) },
        { label: "Years Until Retirement", value: `${yearsToRetire} years` },
        { label: "Total Contributions", value: fmt0(v.currentSavings + v.monthlyContrib * months) },
      ];
    },
    formula: { expression: "Nest Egg = Savings × (1+r)^n + PMT × [(1+r)^n−1]/r", variables: ["Withdrawal Income = Nest Egg × Withdrawal Rate"] },
    howToUse: "Enter your current age, target retirement age, current savings, monthly contributions, expected return, and planned withdrawal rate. See your projected retirement income.",
    faqs: [
      { question: "What is the 4% rule?", answer: "The 4% rule suggests withdrawing 4% of your portfolio in the first year of retirement, then adjusting for inflation. Historically, this approach has sustained portfolios for 30+ years." },
      { question: "How much do I need to retire?", answer: "A common target is 25× your annual expenses (based on the 4% rule). If you spend $50,000/year, aim for $1.25 million. Adjust based on your lifestyle and risk tolerance." },
    ],
    relatedCalcs: financeRelated("retirement-calculator"),
  },
  // 16. 401k Calculator
  {
    slug: "401k-calculator",
    name: "401k Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Project your 401(k) growth with employer matching. See how contributions, matching, and investment returns build your retirement fund.",
    metaDescription: "Free 401k calculator. Project 401(k) growth with employer match, contribution rates, and investment returns over time.",
    icon: "dollar",
    inputs: [
      { id: "salary", label: "Annual Salary", type: "number", defaultValue: 75000, prefix: "$" },
      { id: "contribution", label: "Your Contribution (%)", type: "number", defaultValue: 10, suffix: "%" },
      { id: "matchPct", label: "Employer Match (%)", type: "number", defaultValue: 50, suffix: "%" },
      { id: "matchLimit", label: "Match Up To (%)", type: "number", defaultValue: 6, suffix: "%" },
      { id: "currentBalance", label: "Current 401k Balance", type: "number", defaultValue: 25000, prefix: "$" },
      { id: "rate", label: "Expected Return (%)", type: "number", defaultValue: 7, suffix: "%", step: 0.1 },
      { id: "years", label: "Years Until Retirement", type: "number", defaultValue: 30 },
    ],
    calculate: (v) => {
      const yourAnnual = v.salary * (v.contribution / 100);
      const matchableContrib = Math.min(v.contribution, v.matchLimit);
      const employerAnnual = v.salary * (matchableContrib / 100) * (v.matchPct / 100);
      const totalMonthly = (yourAnnual + employerAnnual) / 12;
      const r = v.rate / 100 / 12;
      const n = v.years * 12;
      const fv = v.currentBalance * Math.pow(1 + r, n) + totalMonthly * ((Math.pow(1 + r, n) - 1) / r);
      return [
        { label: "Projected 401k Balance", value: fmt0(fv), highlight: true },
        { label: "Your Annual Contribution", value: fmt0(yourAnnual) },
        { label: "Employer Annual Match", value: fmt0(employerAnnual) },
        { label: "Total Monthly (You + Employer)", value: fmt(totalMonthly) },
        { label: "Free Money (Total Employer Match)", value: fmt0(employerAnnual * v.years) },
      ];
    },
    formula: { expression: "FV = Balance × (1+r)^n + (Your+Employer)/12 × [(1+r)^n−1]/r", variables: ["Employer Match = Salary × min(Contribution, MatchLimit) × MatchRate"] },
    howToUse: "Enter your salary, contribution percentage, employer match details, current balance, expected return, and years to retirement. See how employer matching boosts your savings.",
    faqs: [
      { question: "Should I max out my 401k?", answer: "At minimum, contribute enough to get the full employer match — it's free money. Beyond that, consider maxing out if you can ($23,000 limit in 2024) for tax-deferred growth." },
      { question: "What is employer matching?", answer: "Employer matching means your employer contributes money to your 401(k) based on your contributions. For example, a 50% match on up to 6% of salary means if you contribute 6%, they add 3%." },
    ],
    relatedCalcs: financeRelated("401k-calculator"),
  },
  // 17. IRA Calculator
  {
    slug: "ira-calculator",
    name: "IRA Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Project the growth of your Individual Retirement Account (IRA). Compare Traditional vs Roth IRA strategies for retirement planning.",
    metaDescription: "Free IRA calculator. Project Traditional or Roth IRA growth with annual contributions and compound returns over time.",
    icon: "dollar",
    inputs: [
      { id: "current", label: "Current IRA Balance", type: "number", defaultValue: 15000, prefix: "$" },
      { id: "annual", label: "Annual Contribution", type: "number", defaultValue: 6500, prefix: "$" },
      { id: "rate", label: "Expected Return (%)", type: "number", defaultValue: 7, suffix: "%", step: 0.1 },
      { id: "years", label: "Years Until Retirement", type: "number", defaultValue: 30 },
      { id: "taxRate", label: "Expected Tax Rate in Retirement (%)", type: "number", defaultValue: 22, suffix: "%" },
    ],
    calculate: (v) => {
      const r = v.rate / 100 / 12;
      const n = v.years * 12;
      const monthlyContrib = v.annual / 12;
      const fv = v.current * Math.pow(1 + r, n) + monthlyContrib * ((Math.pow(1 + r, n) - 1) / r);
      const rothAfterTax = fv; // Roth = no tax on withdrawal
      const tradAfterTax = fv * (1 - v.taxRate / 100);
      return [
        { label: "Projected Balance", value: fmt0(fv), highlight: true },
        { label: "Roth IRA (Tax-Free Withdrawal)", value: fmt0(rothAfterTax) },
        { label: "Traditional IRA (After Tax)", value: fmt0(tradAfterTax) },
        { label: "Total Contributed", value: fmt0(v.current + v.annual * v.years) },
        { label: "Investment Growth", value: fmt0(fv - v.current - v.annual * v.years) },
      ];
    },
    formula: { expression: "FV = P(1+r)^n + (Annual/12) × [(1+r)^n−1]/r", variables: ["Traditional After-Tax = FV × (1 − Tax Rate)", "Roth After-Tax = FV (no tax)"] },
    howToUse: "Enter your current balance, annual contribution, expected return, years to retirement, and expected tax rate. Compare Traditional vs Roth IRA outcomes.",
    faqs: [
      { question: "Roth vs Traditional IRA — which is better?", answer: "If you expect to be in a higher tax bracket in retirement, Roth is better (pay taxes now at lower rate). If you expect lower taxes in retirement, Traditional saves you more." },
      { question: "What are the IRA contribution limits?", answer: "For 2024, the limit is $7,000/year ($8,000 if age 50+). These limits are adjusted periodically for inflation." },
    ],
    relatedCalcs: financeRelated("ira-calculator"),
  },
  // 18. Annuity Calculator
  {
    slug: "annuity-calculator",
    name: "Annuity Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Calculate the future value of an annuity or determine the payment needed to reach a target amount. Plan structured payments.",
    metaDescription: "Free annuity calculator. Calculate future value, present value, or payment amount for ordinary annuities and annuities due.",
    icon: "dollar",
    inputs: [
      { id: "payment", label: "Payment Amount", type: "number", defaultValue: 1000, prefix: "$" },
      { id: "rate", label: "Annual Interest Rate (%)", type: "number", defaultValue: 5, suffix: "%", step: 0.1 },
      { id: "periods", label: "Number of Periods (years)", type: "number", defaultValue: 20 },
    ],
    calculate: (v) => {
      const r = v.rate / 100;
      const fvOrdinary = v.payment * ((Math.pow(1 + r, v.periods) - 1) / r);
      const fvDue = fvOrdinary * (1 + r);
      const pvOrdinary = v.payment * ((1 - Math.pow(1 + r, -v.periods)) / r);
      return [
        { label: "Future Value (Ordinary)", value: fmt0(fvOrdinary), highlight: true },
        { label: "Future Value (Annuity Due)", value: fmt0(fvDue) },
        { label: "Present Value", value: fmt0(pvOrdinary) },
        { label: "Total Payments", value: fmt0(v.payment * v.periods) },
      ];
    },
    formula: { expression: "FV = PMT × [(1+r)^n − 1] / r", variables: ["PMT = Payment", "r = Rate per Period", "n = Number of Periods"] },
    howToUse: "Enter the payment amount, annual interest rate, and number of periods. The calculator shows both ordinary annuity and annuity due values.",
    faqs: [
      { question: "What is the difference between ordinary annuity and annuity due?", answer: "An ordinary annuity has payments at the end of each period. An annuity due has payments at the beginning. Annuity due has a slightly higher future value because payments earn interest for one extra period." },
      { question: "When would I use an annuity?", answer: "Annuities are used in retirement planning, structured settlements, lease payments, and any scenario with regular periodic payments." },
    ],
    relatedCalcs: financeRelated("annuity-calculator"),
  },
  // 19. Present Value Calculator
  {
    slug: "present-value-calculator",
    name: "Present Value Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Calculate the present value of a future sum of money. Understand what a future payment is worth in today's dollars.",
    metaDescription: "Free present value calculator. Determine today's value of future money using discount rates. Essential for investment analysis.",
    icon: "dollar",
    inputs: [
      { id: "futureValue", label: "Future Value", type: "number", defaultValue: 100000, prefix: "$" },
      { id: "rate", label: "Discount Rate (%)", type: "number", defaultValue: 6, suffix: "%", step: 0.1 },
      { id: "years", label: "Years", type: "number", defaultValue: 10 },
    ],
    calculate: (v) => {
      const pv = v.futureValue / Math.pow(1 + v.rate / 100, v.years);
      const discount = v.futureValue - pv;
      return [
        { label: "Present Value", value: fmt(pv), highlight: true },
        { label: "Discount Amount", value: fmt(discount) },
        { label: "Total Discount Factor", value: (pv / v.futureValue).toFixed(4) },
      ];
    },
    formula: { expression: "PV = FV / (1 + r)^n", variables: ["PV = Present Value", "FV = Future Value", "r = Discount Rate", "n = Years"] },
    howToUse: "Enter the future amount, the discount rate (opportunity cost of capital), and the time period. The calculator shows what that future sum is worth today.",
    faqs: [
      { question: "What is the time value of money?", answer: "Money available today is worth more than the same amount in the future because it can be invested to earn returns. Present value quantifies this difference." },
      { question: "How do I choose a discount rate?", answer: "Use your expected rate of return on alternative investments, the inflation rate, or your required rate of return. Higher rates result in lower present values." },
    ],
    relatedCalcs: financeRelated("present-value-calculator"),
  },
  // 20. Future Value Calculator
  {
    slug: "future-value-calculator",
    name: "Future Value Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Calculate the future value of a present sum. See how your money will grow over time at a given rate of return.",
    metaDescription: "Free future value calculator. Project how a lump sum grows over time with compound interest.",
    icon: "dollar",
    inputs: [
      { id: "presentValue", label: "Present Value", type: "number", defaultValue: 50000, prefix: "$" },
      { id: "rate", label: "Annual Return (%)", type: "number", defaultValue: 7, suffix: "%", step: 0.1 },
      { id: "years", label: "Years", type: "number", defaultValue: 15 },
    ],
    calculate: (v) => {
      const fv = v.presentValue * Math.pow(1 + v.rate / 100, v.years);
      const growth = fv - v.presentValue;
      return [
        { label: "Future Value", value: fmt0(fv), highlight: true },
        { label: "Total Growth", value: fmt0(growth) },
        { label: "Growth Factor", value: `${(fv / v.presentValue).toFixed(2)}×` },
      ];
    },
    formula: { expression: "FV = PV × (1 + r)^n", variables: ["FV = Future Value", "PV = Present Value", "r = Annual Rate", "n = Years"] },
    howToUse: "Enter the amount you have today, the expected annual rate of return, and how many years you'll invest. See the projected future value.",
    faqs: [
      { question: "Is future value guaranteed?", answer: "No. Future value calculations assume a constant rate of return, which isn't realistic for most investments. Actual returns will vary year to year." },
      { question: "How does inflation affect future value?", answer: "Inflation erodes purchasing power. To find the 'real' future value, subtract the inflation rate from your nominal return rate." },
    ],
    relatedCalcs: financeRelated("future-value-calculator"),
  },
  // 21. Inflation Calculator
  {
    slug: "inflation-calculator",
    name: "Inflation Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Calculate the impact of inflation on purchasing power over time. See how much today's money will be worth in the future.",
    metaDescription: "Free inflation calculator. See how inflation erodes purchasing power over time. Calculate future equivalent amounts.",
    icon: "dollar",
    inputs: [
      { id: "amount", label: "Current Amount", type: "number", defaultValue: 100000, prefix: "$" },
      { id: "inflation", label: "Annual Inflation Rate (%)", type: "number", defaultValue: 3, suffix: "%", step: 0.1 },
      { id: "years", label: "Years", type: "number", defaultValue: 20 },
    ],
    calculate: (v) => {
      const futureEquivalent = v.amount * Math.pow(1 + v.inflation / 100, v.years);
      const purchasingPower = v.amount / Math.pow(1 + v.inflation / 100, v.years);
      const lost = v.amount - purchasingPower;
      return [
        { label: "Future Cost of Same Goods", value: fmt0(futureEquivalent), highlight: true },
        { label: "Future Purchasing Power", value: fmt0(purchasingPower) },
        { label: "Purchasing Power Lost", value: fmt0(lost) },
        { label: "Percentage Lost", value: pct((lost / v.amount) * 100) },
      ];
    },
    formula: { expression: "Future Cost = Amount × (1 + inflation)^years", variables: ["Purchasing Power = Amount / (1 + inflation)^years"] },
    howToUse: "Enter an amount, expected inflation rate, and time period. See how inflation changes the purchasing power of your money over time.",
    faqs: [
      { question: "What is a typical inflation rate?", answer: "The US Federal Reserve targets 2% annual inflation. Historical average since 1913 is about 3.1%. Recent years have seen higher rates due to economic factors." },
      { question: "How can I protect against inflation?", answer: "Invest in assets that historically outpace inflation: stocks, real estate, TIPS (Treasury Inflation-Protected Securities), and commodities." },
    ],
    relatedCalcs: financeRelated("inflation-calculator"),
  },
  // 22. APR Calculator
  {
    slug: "apr-calculator",
    name: "APR Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Calculate the Annual Percentage Rate for a loan including fees. APR gives you the true cost of borrowing money.",
    metaDescription: "Free APR calculator. Calculate the true annual percentage rate including fees and charges for any loan.",
    icon: "dollar",
    inputs: [
      { id: "principal", label: "Loan Amount", type: "number", defaultValue: 20000, prefix: "$" },
      { id: "rate", label: "Interest Rate (%)", type: "number", defaultValue: 5, suffix: "%", step: 0.1 },
      { id: "term", label: "Term (months)", type: "number", defaultValue: 60 },
      { id: "fees", label: "Total Fees", type: "number", defaultValue: 500, prefix: "$" },
    ],
    calculate: (v) => {
      const effectivePrincipal = v.principal + v.fees;
      const r = loanCalc(v.principal, v.rate, v.term);
      const totalCost = r.monthly * v.term;
      const totalInterestPlusFees = totalCost - v.principal + v.fees;
      const apr = (totalInterestPlusFees / v.principal / (v.term / 12)) * 100;
      return [
        { label: "Effective APR", value: pct(apr), highlight: true },
        { label: "Monthly Payment", value: fmt(r.monthly) },
        { label: "Total Interest", value: fmt0(r.totalInterest) },
        { label: "Total Fees", value: fmt(v.fees) },
        { label: "True Cost of Borrowing", value: fmt0(r.totalInterest + v.fees) },
      ];
    },
    formula: { expression: "APR ≈ (Total Interest + Fees) / Principal / Years × 100", variables: ["APR includes all borrowing costs annualized"] },
    howToUse: "Enter the loan amount, stated interest rate, term, and any upfront fees. The calculator shows the effective APR — the true cost of the loan.",
    faqs: [
      { question: "Why is APR different from interest rate?", answer: "APR includes the interest rate plus fees, origination charges, and other costs, giving you a more complete picture of borrowing costs." },
      { question: "Should I always choose the lowest APR?", answer: "Generally yes, but consider loan terms too. A lower APR over a longer term might cost more in total interest than a slightly higher APR over a shorter term." },
    ],
    relatedCalcs: financeRelated("apr-calculator"),
  },
  // 23. Credit Card Payment Calculator
  {
    slug: "credit-card-payment-calculator",
    name: "Credit Card Payment Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Calculate how long it takes to pay off credit card debt. See the impact of different payment amounts on your payoff timeline.",
    metaDescription: "Free credit card payment calculator. See how long it takes to pay off your balance and how much interest you'll pay.",
    icon: "dollar",
    inputs: [
      { id: "balance", label: "Credit Card Balance", type: "number", defaultValue: 5000, prefix: "$" },
      { id: "apr", label: "APR (%)", type: "number", defaultValue: 22, suffix: "%", step: 0.1 },
      { id: "payment", label: "Monthly Payment", type: "number", defaultValue: 150, prefix: "$" },
    ],
    calculate: (v) => {
      const r = v.apr / 100 / 12;
      if (v.payment <= v.balance * r) return [{ label: "Error", value: "Payment too low to pay off debt", highlight: true }];
      const months = Math.ceil(-Math.log(1 - (v.balance * r) / v.payment) / Math.log(1 + r));
      const totalPaid = v.payment * months;
      const totalInterest = totalPaid - v.balance;
      return [
        { label: "Months to Pay Off", value: `${months} months (${(months / 12).toFixed(1)} years)`, highlight: true },
        { label: "Total Interest Paid", value: fmt(totalInterest) },
        { label: "Total Amount Paid", value: fmt(totalPaid) },
      ];
    },
    formula: { expression: "n = −ln(1 − Br/P) / ln(1 + r)", variables: ["B = Balance", "r = Monthly Rate", "P = Monthly Payment", "n = Months"] },
    howToUse: "Enter your credit card balance, APR, and your planned monthly payment. See how long it will take to become debt-free and how much interest you'll pay.",
    faqs: [
      { question: "Why does credit card interest feel so high?", answer: "Credit card APRs (15-25%+) are much higher than other loans because they're unsecured. Even small balances can generate significant interest if only minimum payments are made." },
      { question: "How can I pay off my card faster?", answer: "Pay more than the minimum, transfer balances to 0% APR cards, or use the avalanche method (pay highest APR debts first)." },
    ],
    relatedCalcs: financeRelated("credit-card-payment-calculator"),
  },
  // 24. Credit Card Interest Calculator
  {
    slug: "credit-card-interest-calculator",
    name: "Credit Card Interest Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Calculate how much interest you pay on your credit card balance each month and year. Understand the true cost of carrying a balance.",
    metaDescription: "Free credit card interest calculator. See how much interest accrues on your credit card balance monthly and annually.",
    icon: "dollar",
    inputs: [
      { id: "balance", label: "Balance", type: "number", defaultValue: 8000, prefix: "$" },
      { id: "apr", label: "APR (%)", type: "number", defaultValue: 20, suffix: "%", step: 0.1 },
    ],
    calculate: (v) => {
      const monthlyInterest = v.balance * (v.apr / 100 / 12);
      const dailyInterest = v.balance * (v.apr / 100 / 365);
      const annualInterest = v.balance * (v.apr / 100);
      return [
        { label: "Monthly Interest Charge", value: fmt(monthlyInterest), highlight: true },
        { label: "Daily Interest", value: fmt(dailyInterest) },
        { label: "Annual Interest (if balance unchanged)", value: fmt(annualInterest) },
      ];
    },
    formula: { expression: "Monthly Interest = Balance × (APR / 12)", variables: ["Daily Interest = Balance × (APR / 365)"] },
    howToUse: "Enter your current credit card balance and APR. See exactly how much interest accrues each day, month, and year.",
    faqs: [
      { question: "Is interest charged on the entire balance?", answer: "Most credit cards use average daily balance. If you pay in full by the due date, you typically avoid interest entirely through the grace period." },
      { question: "What is a good credit card APR?", answer: "APRs vary by card type and credit score. As of 2024-2025, average is around 20-22%. Cards for excellent credit may offer 14-18%." },
    ],
    relatedCalcs: financeRelated("credit-card-interest-calculator"),
  },
  // 25. Debt Payoff Calculator
  {
    slug: "debt-payoff-calculator",
    name: "Debt Payoff Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Create a debt payoff plan. Calculate how long to pay off your total debt and how extra payments can accelerate your payoff date.",
    metaDescription: "Free debt payoff calculator. Plan your debt-free date with monthly payments, extra payments, and multiple debt strategies.",
    icon: "dollar",
    inputs: [
      { id: "totalDebt", label: "Total Debt", type: "number", defaultValue: 25000, prefix: "$" },
      { id: "avgRate", label: "Average Interest Rate (%)", type: "number", defaultValue: 15, suffix: "%", step: 0.1 },
      { id: "monthlyPayment", label: "Monthly Payment", type: "number", defaultValue: 500, prefix: "$" },
      { id: "extraPayment", label: "Extra Monthly Payment", type: "number", defaultValue: 100, prefix: "$" },
    ],
    calculate: (v) => {
      const r = v.avgRate / 100 / 12;
      const calcMonths = (payment: number) => {
        if (payment <= v.totalDebt * r) return Infinity;
        return Math.ceil(-Math.log(1 - (v.totalDebt * r) / payment) / Math.log(1 + r));
      };
      const monthsNormal = calcMonths(v.monthlyPayment);
      const monthsExtra = calcMonths(v.monthlyPayment + v.extraPayment);
      const totalNormal = v.monthlyPayment * monthsNormal;
      const totalExtra = (v.monthlyPayment + v.extraPayment) * monthsExtra;
      return [
        { label: "Payoff (Current)", value: monthsNormal === Infinity ? "Never" : `${monthsNormal} months`, highlight: true },
        { label: "Payoff (With Extra)", value: `${monthsExtra} months` },
        { label: "Time Saved", value: monthsNormal === Infinity ? "∞" : `${monthsNormal - monthsExtra} months` },
        { label: "Interest Saved", value: fmt0(totalNormal - totalExtra - v.totalDebt + v.totalDebt) },
        { label: "Total Cost (With Extra)", value: fmt0(totalExtra) },
      ];
    },
    formula: { expression: "Months = −ln(1 − Dr/P) / ln(1+r)", variables: ["D = Total Debt", "r = Monthly Rate", "P = Payment"] },
    howToUse: "Enter your total debt, average interest rate, current monthly payment, and any extra payment you can make. See how much faster you can become debt-free.",
    faqs: [
      { question: "Avalanche vs snowball method?", answer: "Avalanche: pay highest-rate debts first (saves more money). Snowball: pay smallest debts first (psychological wins). Both work — choose the one you'll stick with." },
      { question: "Should I save or pay off debt?", answer: "Generally pay off high-interest debt (above 7-8%) before investing. Keep an emergency fund of 3-6 months expenses while paying off debt." },
    ],
    relatedCalcs: financeRelated("debt-payoff-calculator"),
  },
  // 26. Debt-to-Income Ratio Calculator
  {
    slug: "debt-to-income-ratio-calculator",
    name: "Debt-to-Income Ratio Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Calculate your debt-to-income ratio (DTI). Lenders use this metric to evaluate your ability to manage monthly payments and repay debts.",
    metaDescription: "Free debt-to-income ratio calculator. Calculate your DTI ratio to understand your borrowing capacity and financial health.",
    icon: "dollar",
    inputs: [
      { id: "monthlyIncome", label: "Gross Monthly Income", type: "number", defaultValue: 6000, prefix: "$" },
      { id: "mortgage", label: "Monthly Mortgage/Rent", type: "number", defaultValue: 1500, prefix: "$" },
      { id: "carPayment", label: "Car Payment", type: "number", defaultValue: 400, prefix: "$" },
      { id: "studentLoan", label: "Student Loan Payment", type: "number", defaultValue: 300, prefix: "$" },
      { id: "creditCards", label: "Credit Card Minimums", type: "number", defaultValue: 150, prefix: "$" },
      { id: "otherDebt", label: "Other Monthly Debt", type: "number", defaultValue: 0, prefix: "$" },
    ],
    calculate: (v) => {
      const totalDebt = v.mortgage + v.carPayment + v.studentLoan + v.creditCards + v.otherDebt;
      const dti = (totalDebt / v.monthlyIncome) * 100;
      let rating = "Excellent";
      if (dti > 50) rating = "Very High Risk";
      else if (dti > 43) rating = "High";
      else if (dti > 36) rating = "Acceptable";
      else if (dti > 20) rating = "Good";
      return [
        { label: "Debt-to-Income Ratio", value: pct(dti), highlight: true },
        { label: "Rating", value: rating },
        { label: "Total Monthly Debt", value: fmt(totalDebt) },
        { label: "Remaining Income", value: fmt(v.monthlyIncome - totalDebt) },
      ];
    },
    formula: { expression: "DTI = (Total Monthly Debt / Gross Monthly Income) × 100", variables: ["Below 36% is ideal", "Above 43% may affect loan approval"] },
    howToUse: "Enter your gross monthly income and all monthly debt payments. The calculator shows your DTI ratio and how lenders may view it.",
    faqs: [
      { question: "What is a good DTI ratio?", answer: "Below 36% is considered good, with no more than 28% going to housing. Most lenders require below 43% for mortgage approval. Below 20% is excellent." },
      { question: "How can I improve my DTI?", answer: "Increase income, pay down debts, avoid new debt, or refinance to lower payments. Even small reductions can improve loan terms." },
    ],
    relatedCalcs: financeRelated("debt-to-income-ratio-calculator"),
  },
  // 27. Salary Calculator
  {
    slug: "salary-calculator",
    name: "Salary Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Convert between hourly, weekly, biweekly, monthly, and annual salary. Understand your earnings across different pay periods.",
    metaDescription: "Free salary calculator. Convert hourly wages to annual salary and vice versa. See weekly, biweekly, and monthly equivalents.",
    icon: "dollar",
    inputs: [
      { id: "annual", label: "Annual Salary", type: "number", defaultValue: 65000, prefix: "$" },
      { id: "hoursPerWeek", label: "Hours Per Week", type: "number", defaultValue: 40 },
      { id: "weeksPerYear", label: "Work Weeks Per Year", type: "number", defaultValue: 52 },
    ],
    calculate: (v) => {
      const hourly = v.annual / (v.hoursPerWeek * v.weeksPerYear);
      const weekly = v.annual / v.weeksPerYear;
      const biweekly = v.annual / (v.weeksPerYear / 2);
      const monthly = v.annual / 12;
      return [
        { label: "Hourly Rate", value: fmt(hourly), highlight: true },
        { label: "Weekly Pay", value: fmt(weekly) },
        { label: "Biweekly Pay", value: fmt(biweekly) },
        { label: "Monthly Pay", value: fmt(monthly) },
        { label: "Annual Salary", value: fmt0(v.annual) },
      ];
    },
    formula: { expression: "Hourly = Annual / (Hours/Week × Weeks/Year)", variables: ["Weekly = Annual / Weeks", "Monthly = Annual / 12"] },
    howToUse: "Enter your annual salary (or adjust to find hourly rate), hours per week, and work weeks per year. See your pay broken down by period.",
    faqs: [
      { question: "How many work hours are in a year?", answer: "A standard full-time year is 2,080 hours (40 hours × 52 weeks). With holidays and vacation, actual working hours are typically 1,920-2,000." },
      { question: "How do I convert hourly to salary?", answer: "Multiply your hourly rate by 2,080 for a standard full-time annual salary. For example, $25/hour × 2,080 = $52,000/year." },
    ],
    relatedCalcs: financeRelated("salary-calculator"),
  },
  // 28. Hourly to Salary Calculator
  {
    slug: "hourly-to-salary-calculator",
    name: "Hourly to Salary Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Convert your hourly wage to an annual salary equivalent. Factor in overtime, holidays, and vacation time for accuracy.",
    metaDescription: "Free hourly to salary calculator. Convert hourly wages to annual salary, weekly, and monthly pay with overtime.",
    icon: "dollar",
    inputs: [
      { id: "hourlyRate", label: "Hourly Rate", type: "number", defaultValue: 25, prefix: "$", step: 0.5 },
      { id: "hoursPerWeek", label: "Hours Per Week", type: "number", defaultValue: 40 },
      { id: "weeksOff", label: "Weeks Off (Vacation/Holiday)", type: "number", defaultValue: 2 },
    ],
    calculate: (v) => {
      const workWeeks = 52 - v.weeksOff;
      const annual = v.hourlyRate * v.hoursPerWeek * workWeeks;
      return [
        { label: "Annual Salary Equivalent", value: fmt0(annual), highlight: true },
        { label: "Monthly Pay", value: fmt(annual / 12) },
        { label: "Biweekly Pay", value: fmt(v.hourlyRate * v.hoursPerWeek * 2) },
        { label: "Weekly Pay", value: fmt(v.hourlyRate * v.hoursPerWeek) },
        { label: "Work Weeks Per Year", value: `${workWeeks} weeks` },
      ];
    },
    formula: { expression: "Annual = Hourly × Hours/Week × (52 − Weeks Off)", variables: ["Standard year = 2,080 hours"] },
    howToUse: "Enter your hourly rate, weekly hours, and time off. The calculator converts your hourly wage to an annual salary equivalent.",
    faqs: [
      { question: "Does this include benefits?", answer: "No. Salaried positions often include benefits (health insurance, retirement, PTO) that can add 20-30% to the total compensation value." },
      { question: "How do I negotiate a raise?", answer: "Research market rates for your role, document your achievements, and present your case based on value delivered. A 3-5% annual raise is typical; 10-20% is common when switching jobs." },
    ],
    relatedCalcs: financeRelated("hourly-to-salary-calculator"),
  },
  // 29. Overtime Pay Calculator
  {
    slug: "overtime-pay-calculator",
    name: "Overtime Pay Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Calculate your overtime pay based on hourly rate, regular hours, and overtime hours. See how OT affects your total weekly earnings.",
    metaDescription: "Free overtime pay calculator. Calculate weekly earnings with regular and overtime hours at 1.5× or 2× pay rates.",
    icon: "dollar",
    inputs: [
      { id: "hourlyRate", label: "Regular Hourly Rate", type: "number", defaultValue: 20, prefix: "$", step: 0.5 },
      { id: "regularHours", label: "Regular Hours/Week", type: "number", defaultValue: 40 },
      { id: "overtimeHours", label: "Overtime Hours/Week", type: "number", defaultValue: 10 },
      { id: "otMultiplier", label: "OT Rate Multiplier", type: "select", defaultValue: 1.5, options: [{ value: 1.5, label: "1.5× (Time and a Half)" }, { value: 2, label: "2× (Double Time)" }] },
    ],
    calculate: (v) => {
      const regularPay = v.hourlyRate * v.regularHours;
      const otRate = v.hourlyRate * v.otMultiplier;
      const otPay = otRate * v.overtimeHours;
      const weeklyTotal = regularPay + otPay;
      return [
        { label: "Weekly Total Pay", value: fmt(weeklyTotal), highlight: true },
        { label: "Regular Pay", value: fmt(regularPay) },
        { label: "Overtime Pay", value: fmt(otPay) },
        { label: "Overtime Rate", value: `${fmt(otRate)}/hr` },
        { label: "Monthly Estimate", value: fmt(weeklyTotal * 4.33) },
      ];
    },
    formula: { expression: "Total = (Rate × Regular Hours) + (Rate × Multiplier × OT Hours)", variables: ["Standard OT = 1.5× after 40 hours/week"] },
    howToUse: "Enter your hourly rate, regular hours, overtime hours, and the OT multiplier. See your total weekly earnings broken down by regular and overtime pay.",
    faqs: [
      { question: "Who qualifies for overtime?", answer: "Under the FLSA, non-exempt employees must receive 1.5× pay for hours over 40/week. Salaried employees earning below $35,568/year are also eligible." },
      { question: "Is overtime taxed differently?", answer: "Overtime is taxed at the same rates as regular income. It may push you into a higher withholding bracket for that paycheck, but total tax is the same." },
    ],
    relatedCalcs: financeRelated("overtime-pay-calculator"),
  },
  // 30. Commission Calculator
  {
    slug: "commission-calculator",
    name: "Commission Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Calculate sales commission earnings based on sales amount and commission rate. Support for tiered commission structures.",
    metaDescription: "Free commission calculator. Calculate sales commission earnings with flat or tiered rate structures.",
    icon: "dollar",
    inputs: [
      { id: "salesAmount", label: "Total Sales Amount", type: "number", defaultValue: 50000, prefix: "$" },
      { id: "commissionRate", label: "Commission Rate (%)", type: "number", defaultValue: 8, suffix: "%", step: 0.5 },
      { id: "baseSalary", label: "Base Salary (monthly)", type: "number", defaultValue: 3000, prefix: "$" },
    ],
    calculate: (v) => {
      const commission = v.salesAmount * (v.commissionRate / 100);
      const totalEarnings = v.baseSalary + commission;
      const effectiveRate = (totalEarnings / v.salesAmount) * 100;
      return [
        { label: "Commission Earned", value: fmt(commission), highlight: true },
        { label: "Total Monthly Earnings", value: fmt(totalEarnings) },
        { label: "Annual Projection", value: fmt0(totalEarnings * 12) },
        { label: "Effective Earnings Rate", value: pct(effectiveRate) },
      ];
    },
    formula: { expression: "Commission = Sales × Rate / 100", variables: ["Total = Base Salary + Commission"] },
    howToUse: "Enter your total sales amount, commission rate, and base salary. See your commission, total earnings, and annual projection.",
    faqs: [
      { question: "What is a typical commission rate?", answer: "Rates vary by industry: real estate (5-6%), insurance (5-15%), SaaS sales (8-15%), retail (1-3%). Higher-value sales often have lower percentage rates." },
      { question: "Draw vs commission?", answer: "A draw is an advance against future commissions. If your commissions don't cover the draw, you may owe the difference back to your employer." },
    ],
    relatedCalcs: financeRelated("commission-calculator"),
  },
  // 31. Bonus Calculator
  {
    slug: "bonus-calculator",
    name: "Bonus Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Calculate your take-home bonus after taxes. Bonuses are typically taxed at a supplemental wage rate which may differ from your regular rate.",
    metaDescription: "Free bonus calculator. Calculate your net bonus after federal and state taxes using supplemental wage tax rates.",
    icon: "dollar",
    inputs: [
      { id: "bonusAmount", label: "Gross Bonus", type: "number", defaultValue: 10000, prefix: "$" },
      { id: "fedRate", label: "Federal Tax Rate (%)", type: "number", defaultValue: 22, suffix: "%" },
      { id: "stateRate", label: "State Tax Rate (%)", type: "number", defaultValue: 5, suffix: "%" },
      { id: "fica", label: "FICA (%)", type: "number", defaultValue: 7.65, suffix: "%", step: 0.01 },
    ],
    calculate: (v) => {
      const fedTax = v.bonusAmount * (v.fedRate / 100);
      const stateTax = v.bonusAmount * (v.stateRate / 100);
      const ficaTax = v.bonusAmount * (v.fica / 100);
      const totalTax = fedTax + stateTax + ficaTax;
      const netBonus = v.bonusAmount - totalTax;
      return [
        { label: "Take-Home Bonus", value: fmt(netBonus), highlight: true },
        { label: "Federal Tax", value: fmt(fedTax) },
        { label: "State Tax", value: fmt(stateTax) },
        { label: "FICA (SS + Medicare)", value: fmt(ficaTax) },
        { label: "Total Taxes", value: fmt(totalTax) },
        { label: "Effective Tax Rate", value: pct((totalTax / v.bonusAmount) * 100) },
      ];
    },
    formula: { expression: "Net Bonus = Gross − Federal − State − FICA", variables: ["Federal supplemental rate = 22% (flat)", "FICA = 7.65%"] },
    howToUse: "Enter your gross bonus amount and applicable tax rates. The calculator shows your take-home bonus after all deductions.",
    faqs: [
      { question: "Are bonuses taxed at a higher rate?", answer: "Bonuses are taxed as supplemental wages at a flat 22% federal rate (37% over $1M). They may appear taxed higher due to withholding, but your actual tax is determined when you file." },
      { question: "Can I reduce taxes on my bonus?", answer: "You can contribute more to your 401(k) in the bonus period, make charitable donations, or time the bonus to optimize your annual tax bracket." },
    ],
    relatedCalcs: financeRelated("bonus-calculator"),
  },
  // 32. Take-Home Pay Calculator
  {
    slug: "take-home-pay-calculator",
    name: "Take-Home Pay Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Estimate your take-home pay after taxes and deductions. See how much of your gross salary you actually receive.",
    metaDescription: "Free take-home pay calculator. Estimate net pay after federal, state, FICA taxes, and retirement contributions.",
    icon: "dollar",
    inputs: [
      { id: "grossAnnual", label: "Gross Annual Salary", type: "number", defaultValue: 75000, prefix: "$" },
      { id: "fedRate", label: "Federal Tax Rate (%)", type: "number", defaultValue: 22, suffix: "%" },
      { id: "stateRate", label: "State Tax Rate (%)", type: "number", defaultValue: 5, suffix: "%" },
      { id: "fica", label: "FICA (%)", type: "number", defaultValue: 7.65, suffix: "%", step: 0.01 },
      { id: "retirement", label: "Retirement Contribution (%)", type: "number", defaultValue: 6, suffix: "%" },
      { id: "healthInsurance", label: "Monthly Health Insurance", type: "number", defaultValue: 200, prefix: "$" },
    ],
    calculate: (v) => {
      const retirementDeduction = v.grossAnnual * (v.retirement / 100);
      const taxableIncome = v.grossAnnual - retirementDeduction;
      const fedTax = taxableIncome * (v.fedRate / 100);
      const stateTax = taxableIncome * (v.stateRate / 100);
      const ficaTax = v.grossAnnual * (v.fica / 100);
      const healthAnnual = v.healthInsurance * 12;
      const totalDeductions = fedTax + stateTax + ficaTax + retirementDeduction + healthAnnual;
      const netAnnual = v.grossAnnual - totalDeductions;
      return [
        { label: "Monthly Take-Home", value: fmt(netAnnual / 12), highlight: true },
        { label: "Annual Take-Home", value: fmt0(netAnnual) },
        { label: "Biweekly Paycheck", value: fmt(netAnnual / 26) },
        { label: "Federal Tax", value: fmt0(fedTax) },
        { label: "Total Deductions", value: fmt0(totalDeductions) },
        { label: "Effective Tax Rate", value: pct((totalDeductions / v.grossAnnual) * 100) },
      ];
    },
    formula: { expression: "Take-Home = Gross − Federal − State − FICA − Retirement − Insurance", variables: ["Retirement reduces taxable income", "FICA on full gross"] },
    howToUse: "Enter your gross annual salary and tax rates, plus any pre-tax deductions. See your estimated take-home pay broken down by pay period.",
    faqs: [
      { question: "What is FICA?", answer: "FICA includes Social Security tax (6.2%) and Medicare tax (1.45%), totaling 7.65%. Your employer pays an equal amount. An additional 0.9% Medicare tax applies to income over $200,000." },
      { question: "How can I increase my take-home pay?", answer: "Maximize pre-tax deductions (401k, HSA, FSA), claim all eligible tax credits, adjust your W-4 withholding, and consider tax-advantaged benefits your employer offers." },
    ],
    relatedCalcs: financeRelated("take-home-pay-calculator"),
  },
  // 33. Tax Calculator
  {
    slug: "tax-calculator",
    name: "Tax Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Estimate your total income tax liability. Calculate federal, state, and FICA taxes based on your income and filing status.",
    metaDescription: "Free tax calculator. Estimate federal, state, and FICA taxes on your income. See your effective tax rate and tax breakdown.",
    icon: "dollar",
    inputs: [
      { id: "income", label: "Gross Annual Income", type: "number", defaultValue: 85000, prefix: "$" },
      { id: "deductions", label: "Total Deductions", type: "number", defaultValue: 14600, prefix: "$" },
      { id: "stateRate", label: "State Tax Rate (%)", type: "number", defaultValue: 5, suffix: "%" },
    ],
    calculate: (v) => {
      const taxable = Math.max(v.income - v.deductions, 0);
      // 2024 single brackets (simplified)
      let fedTax = 0;
      const brackets = [
        { limit: 11600, rate: 0.10 },
        { limit: 47150, rate: 0.12 },
        { limit: 100525, rate: 0.22 },
        { limit: 191950, rate: 0.24 },
        { limit: 243725, rate: 0.32 },
        { limit: 609350, rate: 0.35 },
        { limit: Infinity, rate: 0.37 },
      ];
      let remaining = taxable;
      let prev = 0;
      for (const b of brackets) {
        const chunk = Math.min(remaining, b.limit - prev);
        if (chunk <= 0) break;
        fedTax += chunk * b.rate;
        remaining -= chunk;
        prev = b.limit;
      }
      const stateTax = taxable * (v.stateRate / 100);
      const fica = v.income * 0.0765;
      const total = fedTax + stateTax + fica;
      return [
        { label: "Total Estimated Tax", value: fmt0(total), highlight: true },
        { label: "Federal Income Tax", value: fmt0(fedTax) },
        { label: "State Income Tax", value: fmt0(stateTax) },
        { label: "FICA Taxes", value: fmt0(fica) },
        { label: "Effective Tax Rate", value: pct((total / v.income) * 100) },
        { label: "After-Tax Income", value: fmt0(v.income - total) },
      ];
    },
    formula: { expression: "Tax = Σ (Taxable Income in Bracket × Bracket Rate)", variables: ["Uses 2024 US federal tax brackets (single filer)", "Standard deduction = $14,600"] },
    howToUse: "Enter your gross income, total deductions (standard or itemized), and state tax rate. See your estimated tax breakdown across federal, state, and FICA.",
    faqs: [
      { question: "Standard vs itemized deductions?", answer: "The 2024 standard deduction is $14,600 (single) or $29,200 (married filing jointly). Itemize if your deductions (mortgage interest, charity, state taxes, etc.) exceed these amounts." },
      { question: "What is the marginal vs effective tax rate?", answer: "Your marginal rate is the rate on your last dollar of income. Your effective rate is total tax divided by total income — always lower than your marginal rate due to progressive brackets." },
    ],
    relatedCalcs: financeRelated("tax-calculator"),
  },
  // 34. Income Tax Calculator
  {
    slug: "income-tax-calculator",
    name: "Income Tax Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Calculate your federal income tax using current tax brackets. See your marginal and effective tax rates for better planning.",
    metaDescription: "Free income tax calculator with 2024 federal brackets. Calculate marginal rate, effective rate, and total tax owed.",
    icon: "dollar",
    inputs: [
      { id: "income", label: "Taxable Income", type: "number", defaultValue: 75000, prefix: "$" },
      { id: "filingStatus", label: "Filing Status", type: "select", defaultValue: 1, options: [{ value: 1, label: "Single" }, { value: 2, label: "Married Filing Jointly" }] },
    ],
    calculate: (v) => {
      const singleBrackets = [
        { limit: 11600, rate: 0.10 }, { limit: 47150, rate: 0.12 }, { limit: 100525, rate: 0.22 },
        { limit: 191950, rate: 0.24 }, { limit: 243725, rate: 0.32 }, { limit: 609350, rate: 0.35 }, { limit: Infinity, rate: 0.37 },
      ];
      const marriedBrackets = [
        { limit: 23200, rate: 0.10 }, { limit: 94300, rate: 0.12 }, { limit: 201050, rate: 0.22 },
        { limit: 383900, rate: 0.24 }, { limit: 487450, rate: 0.32 }, { limit: 731200, rate: 0.35 }, { limit: Infinity, rate: 0.37 },
      ];
      const brackets = v.filingStatus === 1 ? singleBrackets : marriedBrackets;
      let tax = 0, remaining = v.income, prev = 0, marginalRate = 0.10;
      for (const b of brackets) {
        const chunk = Math.min(remaining, b.limit - prev);
        if (chunk <= 0) break;
        tax += chunk * b.rate;
        marginalRate = b.rate;
        remaining -= chunk;
        prev = b.limit;
      }
      return [
        { label: "Federal Income Tax", value: fmt0(tax), highlight: true },
        { label: "Effective Tax Rate", value: pct((tax / v.income) * 100) },
        { label: "Marginal Tax Rate", value: pct(marginalRate * 100) },
        { label: "After-Tax Income", value: fmt0(v.income - tax) },
      ];
    },
    formula: { expression: "Progressive brackets: each portion taxed at its bracket rate", variables: ["2024 rates: 10%, 12%, 22%, 24%, 32%, 35%, 37%"] },
    howToUse: "Enter your taxable income and filing status. The calculator applies current federal tax brackets to show your total tax, effective rate, and marginal rate.",
    faqs: [
      { question: "What is the difference between taxable and gross income?", answer: "Gross income is your total earnings. Taxable income is what's left after subtracting deductions (standard or itemized) and any pre-tax contributions." },
      { question: "How do tax brackets work?", answer: "The US uses progressive brackets. Only the income within each bracket is taxed at that rate — not your entire income. Moving into a higher bracket only affects the income above that threshold." },
    ],
    relatedCalcs: financeRelated("income-tax-calculator"),
  },
  // 35. Capital Gains Tax Calculator
  {
    slug: "capital-gains-tax-calculator",
    name: "Capital Gains Tax Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Calculate capital gains tax on investments. See how holding period (short vs long-term) affects your tax on investment profits.",
    metaDescription: "Free capital gains tax calculator. Calculate short-term and long-term capital gains taxes on stock, real estate, and other investments.",
    icon: "dollar",
    inputs: [
      { id: "purchasePrice", label: "Purchase Price", type: "number", defaultValue: 10000, prefix: "$" },
      { id: "salePrice", label: "Sale Price", type: "number", defaultValue: 15000, prefix: "$" },
      { id: "holdingPeriod", label: "Holding Period", type: "select", defaultValue: 1, options: [{ value: 0, label: "Short-Term (< 1 year)" }, { value: 1, label: "Long-Term (≥ 1 year)" }] },
      { id: "income", label: "Annual Income (for bracket)", type: "number", defaultValue: 80000, prefix: "$" },
    ],
    calculate: (v) => {
      const gain = v.salePrice - v.purchasePrice;
      if (gain <= 0) return [
        { label: "Capital Loss", value: fmt(Math.abs(gain)), highlight: true },
        { label: "Tax Owed", value: "$0" },
        { label: "Deductible Loss (up to $3,000/yr)", value: fmt(Math.min(Math.abs(gain), 3000)) },
      ];
      let rate: number;
      if (v.holdingPeriod === 0) {
        // Short-term = ordinary income rate (simplified)
        rate = v.income > 191950 ? 0.32 : v.income > 100525 ? 0.24 : v.income > 47150 ? 0.22 : 0.12;
      } else {
        rate = v.income > 492300 ? 0.20 : v.income > 44625 ? 0.15 : 0;
      }
      const tax = gain * rate;
      return [
        { label: "Capital Gain", value: fmt(gain), highlight: true },
        { label: "Tax Rate", value: pct(rate * 100) },
        { label: "Tax Owed", value: fmt(tax) },
        { label: "Net Profit (after tax)", value: fmt(gain - tax) },
      ];
    },
    formula: { expression: "Capital Gain = Sale Price − Purchase Price", variables: ["Long-term rates: 0%, 15%, or 20%", "Short-term: taxed as ordinary income"] },
    howToUse: "Enter purchase and sale prices, holding period, and your income level. See your capital gains tax and net profit.",
    faqs: [
      { question: "What qualifies as long-term?", answer: "Assets held for more than one year qualify for preferential long-term capital gains rates (0%, 15%, or 20%), which are lower than ordinary income rates." },
      { question: "Can I offset gains with losses?", answer: "Yes, capital losses offset capital gains dollar-for-dollar. Net losses can deduct up to $3,000/year from ordinary income, with excess carried forward." },
    ],
    relatedCalcs: financeRelated("capital-gains-tax-calculator"),
  },
  // 36. Sales Tax Calculator
  {
    slug: "sales-tax-calculator",
    name: "Sales Tax Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Calculate sales tax on any purchase. Find the total price including tax or reverse-calculate the pre-tax price from a total.",
    metaDescription: "Free sales tax calculator. Calculate total price with tax or find the pre-tax amount from any purchase total.",
    icon: "dollar",
    inputs: [
      { id: "price", label: "Price Before Tax", type: "number", defaultValue: 100, prefix: "$" },
      { id: "taxRate", label: "Sales Tax Rate (%)", type: "number", defaultValue: 8.25, suffix: "%", step: 0.25 },
    ],
    calculate: (v) => {
      const taxAmount = v.price * (v.taxRate / 100);
      const total = v.price + taxAmount;
      const preTaxFromTotal = v.price / (1 + v.taxRate / 100);
      return [
        { label: "Total Price (with tax)", value: fmt(total), highlight: true },
        { label: "Sales Tax Amount", value: fmt(taxAmount) },
        { label: "Pre-Tax Price", value: fmt(v.price) },
      ];
    },
    formula: { expression: "Total = Price × (1 + Tax Rate / 100)", variables: ["Tax Amount = Price × Tax Rate / 100"] },
    howToUse: "Enter the item price and your local sales tax rate. See the tax amount and total price you'll pay.",
    faqs: [
      { question: "Which states have no sales tax?", answer: "Alaska, Delaware, Montana, New Hampshire, and Oregon have no state sales tax. However, some Alaska municipalities charge local sales tax." },
      { question: "Is sales tax included in the listed price?", answer: "In the US, sales tax is added at checkout and not included in shelf prices. In many other countries, VAT is included in the displayed price." },
    ],
    relatedCalcs: financeRelated("sales-tax-calculator"),
  },
  // 37. VAT Calculator
  {
    slug: "vat-calculator",
    name: "VAT Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Calculate Value Added Tax (VAT) on goods and services. Add or remove VAT from any price with international rate support.",
    metaDescription: "Free VAT calculator. Add or remove VAT from any price. Supports UK, EU, and international VAT rates.",
    icon: "dollar",
    inputs: [
      { id: "amount", label: "Amount", type: "number", defaultValue: 500, prefix: "$" },
      { id: "vatRate", label: "VAT Rate (%)", type: "number", defaultValue: 20, suffix: "%" },
    ],
    calculate: (v) => {
      const vatAdd = v.amount * (v.vatRate / 100);
      const totalInc = v.amount + vatAdd;
      const exclFromIncl = v.amount / (1 + v.vatRate / 100);
      const vatFromIncl = v.amount - exclFromIncl;
      return [
        { label: "Price + VAT", value: fmt(totalInc), highlight: true },
        { label: "VAT Amount (adding)", value: fmt(vatAdd) },
        { label: "Price excl. VAT (if amount includes VAT)", value: fmt(exclFromIncl) },
        { label: "VAT Amount (removing)", value: fmt(vatFromIncl) },
      ];
    },
    formula: { expression: "Price + VAT = Amount × (1 + Rate/100)", variables: ["Price excl. VAT = Amount / (1 + Rate/100)"] },
    howToUse: "Enter the amount and VAT rate. The calculator shows both adding VAT to a net price and extracting VAT from a gross price.",
    faqs: [
      { question: "What is VAT?", answer: "Value Added Tax is a consumption tax levied at each stage of production. Common in the UK (20%), EU (varies 17-27%), and many other countries. It's similar to sales tax but applied differently." },
      { question: "VAT vs sales tax?", answer: "VAT is collected incrementally at each production stage, while sales tax is collected only at the final sale. Both result in the consumer paying the full tax on the final price." },
    ],
    relatedCalcs: financeRelated("vat-calculator"),
  },
  // 38. Property Tax Calculator
  {
    slug: "property-tax-calculator",
    name: "Property Tax Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Estimate your annual property tax based on home value and local tax rate. Understand how assessments affect your tax bill.",
    metaDescription: "Free property tax calculator. Estimate annual property taxes based on home value, assessment ratio, and local millage rate.",
    icon: "dollar",
    inputs: [
      { id: "homeValue", label: "Home Market Value", type: "number", defaultValue: 400000, prefix: "$" },
      { id: "assessmentRatio", label: "Assessment Ratio (%)", type: "number", defaultValue: 80, suffix: "%" },
      { id: "taxRate", label: "Tax Rate (per $1,000)", type: "number", defaultValue: 15, step: 0.5 },
      { id: "exemptions", label: "Exemptions", type: "number", defaultValue: 0, prefix: "$" },
    ],
    calculate: (v) => {
      const assessedValue = v.homeValue * (v.assessmentRatio / 100) - v.exemptions;
      const annualTax = Math.max(assessedValue, 0) * (v.taxRate / 1000);
      return [
        { label: "Annual Property Tax", value: fmt0(annualTax), highlight: true },
        { label: "Monthly Tax", value: fmt(annualTax / 12) },
        { label: "Assessed Value", value: fmt0(assessedValue) },
        { label: "Effective Tax Rate", value: pct((annualTax / v.homeValue) * 100) },
      ];
    },
    formula: { expression: "Tax = (Home Value × Assessment Ratio − Exemptions) × Rate/1000", variables: ["Assessed value differs from market value", "Millage rate = tax per $1,000"] },
    howToUse: "Enter your home's market value, assessment ratio, local tax rate (per $1,000), and any exemptions. See your estimated annual and monthly property tax.",
    faqs: [
      { question: "How are property taxes calculated?", answer: "Your assessed value (usually a percentage of market value) is multiplied by the local millage/tax rate. Exemptions (homestead, senior, etc.) can reduce the assessed value." },
      { question: "Can I appeal my property tax?", answer: "Yes! If you believe your assessment is too high, you can file an appeal with your county assessor. Comparable sales data from your neighborhood is the strongest evidence." },
    ],
    relatedCalcs: financeRelated("property-tax-calculator"),
  },
  // 39. Rent vs Buy Calculator
  {
    slug: "rent-vs-buy-calculator",
    name: "Rent vs Buy Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Compare the total cost of renting versus buying a home. Factor in appreciation, tax benefits, and opportunity cost of down payment.",
    metaDescription: "Free rent vs buy calculator. Compare total costs of renting vs buying a home over time including appreciation and tax savings.",
    icon: "dollar",
    inputs: [
      { id: "homePrice", label: "Home Price", type: "number", defaultValue: 400000, prefix: "$" },
      { id: "downPayment", label: "Down Payment (%)", type: "number", defaultValue: 20, suffix: "%" },
      { id: "mortgageRate", label: "Mortgage Rate (%)", type: "number", defaultValue: 6.5, suffix: "%", step: 0.1 },
      { id: "monthlyRent", label: "Monthly Rent", type: "number", defaultValue: 2000, prefix: "$" },
      { id: "rentIncrease", label: "Annual Rent Increase (%)", type: "number", defaultValue: 3, suffix: "%" },
      { id: "appreciation", label: "Home Appreciation (%/yr)", type: "number", defaultValue: 3, suffix: "%", step: 0.5 },
      { id: "years", label: "Time Period (years)", type: "number", defaultValue: 10 },
    ],
    calculate: (v) => {
      const dp = v.homePrice * (v.downPayment / 100);
      const loanAmt = v.homePrice - dp;
      const mort = loanCalc(loanAmt, v.mortgageRate, 30 * 12);
      const mortgageCostOverPeriod = mort.monthly * v.years * 12;
      let totalRent = 0;
      let annualRent = v.monthlyRent * 12;
      for (let y = 0; y < v.years; y++) {
        totalRent += annualRent;
        annualRent *= 1 + v.rentIncrease / 100;
      }
      const futureHomeValue = v.homePrice * Math.pow(1 + v.appreciation / 100, v.years);
      const equity = futureHomeValue - loanAmt + (mort.monthly * v.years * 12 - mort.totalInterest * (v.years / 30));
      return [
        { label: "Total Rent Cost", value: fmt0(totalRent), highlight: false },
        { label: "Total Mortgage Payments", value: fmt0(mortgageCostOverPeriod) },
        { label: "Monthly Mortgage Payment", value: fmt(mort.monthly) },
        { label: "Home Value After Period", value: fmt0(futureHomeValue), highlight: true },
        { label: "Home Appreciation Gain", value: fmt0(futureHomeValue - v.homePrice) },
      ];
    },
    formula: { expression: "Total Rent = Σ (Monthly Rent × 12 × (1+increase)^year)", variables: ["Home Value = Price × (1+appreciation)^years"] },
    howToUse: "Enter the home price, mortgage details, current rent, and expected annual changes. Compare total costs of renting vs buying over your time horizon.",
    faqs: [
      { question: "Is buying always better than renting?", answer: "Not always. Buying makes sense if you plan to stay 5+ years, home appreciation exceeds costs, and you can afford the down payment. Renting offers flexibility and lower upfront costs." },
      { question: "What costs does buying include beyond mortgage?", answer: "Property tax, insurance, maintenance (1-2% of home value/year), HOA fees, closing costs, and opportunity cost of the down payment." },
    ],
    relatedCalcs: financeRelated("rent-vs-buy-calculator"),
  },
  // 40. Lease Calculator
  {
    slug: "lease-calculator",
    name: "Lease Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Calculate monthly car lease payments. Factor in MSRP, residual value, money factor, and down payment for accurate estimates.",
    metaDescription: "Free lease calculator. Calculate monthly car lease payments with residual value, money factor, and fees.",
    icon: "dollar",
    inputs: [
      { id: "msrp", label: "MSRP / Negotiated Price", type: "number", defaultValue: 40000, prefix: "$" },
      { id: "residualPct", label: "Residual Value (%)", type: "number", defaultValue: 55, suffix: "%" },
      { id: "moneyFactor", label: "Money Factor", type: "number", defaultValue: 0.002, step: 0.0001 },
      { id: "downPayment", label: "Down Payment", type: "number", defaultValue: 3000, prefix: "$" },
      { id: "term", label: "Lease Term (months)", type: "number", defaultValue: 36 },
    ],
    calculate: (v) => {
      const residualValue = v.msrp * (v.residualPct / 100);
      const capCost = v.msrp - v.downPayment;
      const depreciation = (capCost - residualValue) / v.term;
      const financeCharge = (capCost + residualValue) * v.moneyFactor;
      const monthlyPayment = depreciation + financeCharge;
      const impliedAPR = v.moneyFactor * 2400;
      return [
        { label: "Monthly Lease Payment", value: fmt(monthlyPayment), highlight: true },
        { label: "Depreciation Fee", value: fmt(depreciation) },
        { label: "Finance Fee", value: fmt(financeCharge) },
        { label: "Total Lease Cost", value: fmt0(monthlyPayment * v.term + v.downPayment) },
        { label: "Implied APR", value: pct(impliedAPR) },
      ];
    },
    formula: { expression: "Payment = Depreciation + Finance = (Cap − Residual)/Term + (Cap + Residual) × MF", variables: ["MF = Money Factor", "APR ≈ MF × 2400"] },
    howToUse: "Enter the vehicle price, residual value percentage, money factor, down payment, and lease term. See your monthly payment and total lease cost.",
    faqs: [
      { question: "What is a money factor?", answer: "The money factor is the lease equivalent of an interest rate. Multiply by 2,400 to convert to an approximate APR. A money factor of 0.002 ≈ 4.8% APR." },
      { question: "What is residual value?", answer: "Residual value is the car's estimated worth at lease end, expressed as a percentage of MSRP. Higher residual = lower monthly payments because you're paying less depreciation." },
    ],
    relatedCalcs: financeRelated("lease-calculator"),
  },
  // 41. Business Loan Calculator
  {
    slug: "business-loan-calculator",
    name: "Business Loan Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Calculate business loan payments, total interest, and cost. Compare SBA, term loans, and lines of credit for your business.",
    metaDescription: "Free business loan calculator. Estimate monthly payments and total costs for SBA, term, and equipment loans.",
    icon: "dollar",
    inputs: [
      { id: "loanAmount", label: "Loan Amount", type: "number", defaultValue: 100000, prefix: "$" },
      { id: "rate", label: "Interest Rate (%)", type: "number", defaultValue: 8, suffix: "%", step: 0.1 },
      { id: "term", label: "Term (years)", type: "number", defaultValue: 5 },
      { id: "originFee", label: "Origination Fee (%)", type: "number", defaultValue: 2, suffix: "%" },
    ],
    calculate: (v) => {
      const months = v.term * 12;
      const r = loanCalc(v.loanAmount, v.rate, months);
      const fee = v.loanAmount * (v.originFee / 100);
      return [
        { label: "Monthly Payment", value: fmt(r.monthly), highlight: true },
        { label: "Total Interest", value: fmt0(r.totalInterest) },
        { label: "Origination Fee", value: fmt(fee) },
        { label: "Total Cost of Loan", value: fmt0(r.totalPayment + fee) },
        { label: "Total Amount Received", value: fmt0(v.loanAmount - fee) },
      ];
    },
    formula: { expression: "M = P × [r(1+r)^n] / [(1+r)^n − 1]", variables: ["Total Cost includes origination fee"] },
    howToUse: "Enter the loan amount, interest rate, term, and any origination fee. See your monthly payment and total cost of the business loan.",
    faqs: [
      { question: "What types of business loans are available?", answer: "Common types include SBA loans (lower rates, longer terms), term loans, equipment financing, lines of credit, and invoice factoring. Each has different qualifications and terms." },
      { question: "What do I need to qualify?", answer: "Most lenders look at business revenue, time in business (2+ years preferred), credit score (680+), and business plan. SBA loans have specific eligibility requirements." },
    ],
    relatedCalcs: financeRelated("business-loan-calculator"),
  },
  // 42. Profit Margin Calculator
  {
    slug: "profit-margin-calculator",
    name: "Profit Margin Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Calculate gross and net profit margins for your business. Understand the profitability of your products or services.",
    metaDescription: "Free profit margin calculator. Calculate gross margin, net margin, and markup percentage from cost and revenue.",
    icon: "dollar",
    inputs: [
      { id: "revenue", label: "Revenue / Selling Price", type: "number", defaultValue: 100, prefix: "$" },
      { id: "cost", label: "Cost of Goods", type: "number", defaultValue: 60, prefix: "$" },
    ],
    calculate: (v) => {
      const profit = v.revenue - v.cost;
      const margin = (profit / v.revenue) * 100;
      const markup = (profit / v.cost) * 100;
      return [
        { label: "Profit", value: fmt(profit), highlight: true },
        { label: "Profit Margin", value: pct(margin) },
        { label: "Markup", value: pct(markup) },
        { label: "Cost as % of Revenue", value: pct((v.cost / v.revenue) * 100) },
      ];
    },
    formula: { expression: "Margin = (Revenue − Cost) / Revenue × 100", variables: ["Markup = (Revenue − Cost) / Cost × 100"] },
    howToUse: "Enter your revenue (selling price) and cost of goods. See your profit, profit margin percentage, and markup percentage.",
    faqs: [
      { question: "What is a good profit margin?", answer: "Varies by industry. Software/tech: 60-90%. Retail: 2-5%. Manufacturing: 5-10%. Services: 15-30%. Compare to industry benchmarks for context." },
      { question: "Margin vs markup — what's the difference?", answer: "Margin is profit as a percentage of revenue. Markup is profit as a percentage of cost. A 50% markup equals a 33.3% margin." },
    ],
    relatedCalcs: financeRelated("profit-margin-calculator"),
  },
  // 43. Break-Even Calculator
  {
    slug: "break-even-calculator",
    name: "Break-Even Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Calculate your break-even point — the number of units or revenue needed to cover all costs. Essential for pricing and business planning.",
    metaDescription: "Free break-even calculator. Find how many units you need to sell to cover fixed and variable costs.",
    icon: "dollar",
    inputs: [
      { id: "fixedCosts", label: "Fixed Costs (monthly)", type: "number", defaultValue: 10000, prefix: "$" },
      { id: "pricePerUnit", label: "Selling Price Per Unit", type: "number", defaultValue: 50, prefix: "$" },
      { id: "costPerUnit", label: "Variable Cost Per Unit", type: "number", defaultValue: 20, prefix: "$" },
    ],
    calculate: (v) => {
      const contribution = v.pricePerUnit - v.costPerUnit;
      if (contribution <= 0) return [{ label: "Error", value: "Price must exceed variable cost", highlight: true }];
      const beUnits = Math.ceil(v.fixedCosts / contribution);
      const beRevenue = beUnits * v.pricePerUnit;
      const contributionMargin = (contribution / v.pricePerUnit) * 100;
      return [
        { label: "Break-Even Units", value: `${beUnits.toLocaleString()} units`, highlight: true },
        { label: "Break-Even Revenue", value: fmt0(beRevenue) },
        { label: "Contribution Per Unit", value: fmt(contribution) },
        { label: "Contribution Margin", value: pct(contributionMargin) },
      ];
    },
    formula: { expression: "Break-Even Units = Fixed Costs / (Price − Variable Cost)", variables: ["Contribution Margin = (Price − Variable Cost) / Price"] },
    howToUse: "Enter your monthly fixed costs, selling price per unit, and variable cost per unit. See how many units you need to sell to break even.",
    faqs: [
      { question: "Why is break-even analysis important?", answer: "It tells you the minimum sales volume needed to cover costs. Any sales above this point generate profit. It's essential for pricing decisions and business planning." },
      { question: "How can I lower my break-even point?", answer: "Reduce fixed costs, increase selling price, or decrease variable costs per unit. Even small changes can significantly shift the break-even point." },
    ],
    relatedCalcs: financeRelated("break-even-calculator"),
  },
  // 44. Markup Calculator
  {
    slug: "markup-calculator",
    name: "Markup Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Calculate the selling price based on cost and desired markup percentage. Or find the markup percentage from cost and selling price.",
    metaDescription: "Free markup calculator. Calculate selling price from cost and markup percentage, or reverse-calculate markup from prices.",
    icon: "dollar",
    inputs: [
      { id: "cost", label: "Cost Price", type: "number", defaultValue: 40, prefix: "$" },
      { id: "markup", label: "Markup (%)", type: "number", defaultValue: 75, suffix: "%" },
    ],
    calculate: (v) => {
      const sellingPrice = v.cost * (1 + v.markup / 100);
      const profit = sellingPrice - v.cost;
      const margin = (profit / sellingPrice) * 100;
      return [
        { label: "Selling Price", value: fmt(sellingPrice), highlight: true },
        { label: "Profit Per Unit", value: fmt(profit) },
        { label: "Markup Percentage", value: pct(v.markup) },
        { label: "Equivalent Profit Margin", value: pct(margin) },
      ];
    },
    formula: { expression: "Selling Price = Cost × (1 + Markup / 100)", variables: ["Profit = Selling Price − Cost", "Margin = Profit / Selling Price × 100"] },
    howToUse: "Enter the cost price and desired markup percentage. The calculator shows the selling price and equivalent profit margin.",
    faqs: [
      { question: "What markup should I use?", answer: "Depends on industry: retail clothing 50-100%, grocery 5-15%, restaurants 300% on drinks. Research industry standards and consider your overhead costs." },
      { question: "How do I convert margin to markup?", answer: "Markup = Margin / (1 − Margin/100) × 100. For example, a 25% margin = 33.3% markup." },
    ],
    relatedCalcs: financeRelated("markup-calculator"),
  },
  // 45. Discount Calculator
  {
    slug: "discount-calculator",
    name: "Discount Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Calculate the sale price and savings from any discount percentage. Also find what discount percentage a sale price represents.",
    metaDescription: "Free discount calculator. Calculate sale price, savings amount, and discount percentage for any original price.",
    icon: "dollar",
    inputs: [
      { id: "originalPrice", label: "Original Price", type: "number", defaultValue: 100, prefix: "$" },
      { id: "discount", label: "Discount (%)", type: "number", defaultValue: 25, suffix: "%" },
    ],
    calculate: (v) => {
      const savings = v.originalPrice * (v.discount / 100);
      const salePrice = v.originalPrice - savings;
      return [
        { label: "Sale Price", value: fmt(salePrice), highlight: true },
        { label: "You Save", value: fmt(savings) },
        { label: "Original Price", value: fmt(v.originalPrice) },
        { label: "Discount Amount", value: pct(v.discount) },
      ];
    },
    formula: { expression: "Sale Price = Original × (1 − Discount / 100)", variables: ["Savings = Original × Discount / 100"] },
    howToUse: "Enter the original price and discount percentage. See the sale price and how much you save.",
    faqs: [
      { question: "How do I calculate the discount percentage?", answer: "Discount % = ((Original − Sale) / Original) × 100. For example, $80 marked down to $60 = (($80-$60)/$80)×100 = 25% off." },
      { question: "Do stacked discounts multiply?", answer: "Stacked discounts (e.g., 20% + 10%) don't equal 30%. The second discount applies to the already-reduced price: $100 → $80 → $72, which is 28% total, not 30%." },
    ],
    relatedCalcs: financeRelated("discount-calculator"),
  },
  // 46. Tip Calculator
  {
    slug: "tip-calculator",
    name: "Tip Calculator",
    category: "Finance",
    categorySlug: "finance",
    description: "Calculate the tip amount and total bill. Split the bill evenly among any number of people with customizable tip percentages.",
    metaDescription: "Free tip calculator. Calculate tip amounts, split bills between multiple people, and find the total per person.",
    icon: "dollar",
    inputs: [
      { id: "billAmount", label: "Bill Amount", type: "number", defaultValue: 85, prefix: "$" },
      { id: "tipPercent", label: "Tip (%)", type: "number", defaultValue: 18, suffix: "%" },
      { id: "splitBy", label: "Split Between (people)", type: "number", defaultValue: 2, min: 1 },
    ],
    calculate: (v) => {
      const tipAmount = v.billAmount * (v.tipPercent / 100);
      const total = v.billAmount + tipAmount;
      const perPerson = total / Math.max(v.splitBy, 1);
      const tipPerPerson = tipAmount / Math.max(v.splitBy, 1);
      return [
        { label: "Total (with tip)", value: fmt(total), highlight: true },
        { label: "Tip Amount", value: fmt(tipAmount) },
        { label: "Per Person (total)", value: fmt(perPerson) },
        { label: "Per Person (tip only)", value: fmt(tipPerPerson) },
      ];
    },
    formula: { expression: "Tip = Bill × Tip% / 100", variables: ["Total = Bill + Tip", "Per Person = Total / Number of People"] },
    howToUse: "Enter the bill amount, desired tip percentage, and number of people splitting. See the tip, total, and per-person amounts.",
    faqs: [
      { question: "How much should I tip?", answer: "In the US: 15-20% for restaurants, 15-20% for delivery, $1-2 per drink at bars, 15-20% for hair/nail services. Higher for exceptional service." },
      { question: "Should I tip on tax?", answer: "Tipping on the pre-tax amount is technically correct, but many people tip on the total including tax. The difference is usually small." },
    ],
    relatedCalcs: financeRelated("tip-calculator"),
  },
  // 47. Mortgage Payoff Calculator
  {
    slug: "mortgage-payoff-calculator", name: "Mortgage Payoff Calculator", category: "Finance", categorySlug: "finance",
    description: "Calculate how quickly you can pay off your mortgage with extra payments and see total interest saved.",
    metaDescription: "Free mortgage payoff calculator. See how extra payments accelerate your mortgage payoff and save interest.",
    icon: "dollar",
    inputs: [
      { id: "balance", label: "Remaining Balance", type: "number", defaultValue: 250000, prefix: "$" },
      { id: "rate", label: "Interest Rate (%)", type: "number", defaultValue: 6.5, suffix: "%", step: 0.1 },
      { id: "remaining", label: "Remaining Term (years)", type: "number", defaultValue: 25 },
      { id: "extra", label: "Extra Monthly Payment", type: "number", defaultValue: 200, prefix: "$" },
    ],
    calculate: (v) => {
      const months = v.remaining * 12;
      const r = loanCalc(v.balance, v.rate, months);
      const mr = v.rate / 100 / 12;
      let bal = v.balance, totalInt = 0, m = 0;
      while (bal > 0 && m < months) {
        const intPmt = bal * mr;
        const princPmt = Math.min(r.monthly - intPmt + v.extra, bal);
        totalInt += intPmt;
        bal -= princPmt;
        m++;
      }
      return [
        { label: "New Payoff Time", value: `${Math.floor(m / 12)} yrs ${m % 12} mos`, highlight: true },
        { label: "Original Payoff Time", value: `${v.remaining} years` },
        { label: "Time Saved", value: `${Math.floor((months - m) / 12)} yrs ${(months - m) % 12} mos` },
        { label: "Interest Saved", value: fmt0(r.totalInterest - totalInt) },
      ];
    },
    formula: { expression: "Recalculate amortization with extra principal payments each month", variables: ["Extra payments reduce principal faster"] },
    howToUse: "Enter your remaining balance, rate, term, and extra monthly payment to see how much time and interest you save.",
    faqs: [{ question: "Do extra payments go to principal?", answer: "Yes, extra payments typically reduce the principal directly, which means less interest accrues in future months." }],
    relatedCalcs: financeRelated("mortgage-payoff-calculator"),
  },
  // 48. House Affordability Calculator
  {
    slug: "house-affordability-calculator", name: "House Affordability Calculator", category: "Finance", categorySlug: "finance",
    description: "Estimate how much house you can afford based on your income, debts, and down payment.",
    metaDescription: "Free house affordability calculator. Find out how much home you can afford based on income and debts.",
    icon: "dollar",
    inputs: [
      { id: "annualIncome", label: "Annual Income", type: "number", defaultValue: 85000, prefix: "$" },
      { id: "monthlyDebts", label: "Monthly Debts", type: "number", defaultValue: 500, prefix: "$" },
      { id: "downPayment", label: "Down Payment", type: "number", defaultValue: 50000, prefix: "$" },
      { id: "rate", label: "Mortgage Rate (%)", type: "number", defaultValue: 6.5, suffix: "%", step: 0.1 },
      { id: "term", label: "Loan Term (years)", type: "number", defaultValue: 30 },
    ],
    calculate: (v) => {
      const monthlyIncome = v.annualIncome / 12;
      const maxPayment28 = monthlyIncome * 0.28;
      const maxPayment36 = monthlyIncome * 0.36 - v.monthlyDebts;
      const maxMonthly = Math.min(maxPayment28, maxPayment36);
      const mr = v.rate / 100 / 12;
      const n = v.term * 12;
      const maxLoan = maxMonthly > 0 ? maxMonthly * ((Math.pow(1 + mr, n) - 1) / (mr * Math.pow(1 + mr, n))) : 0;
      const maxHome = maxLoan + v.downPayment;
      return [
        { label: "Max Home Price", value: fmt0(maxHome), highlight: true },
        { label: "Max Loan Amount", value: fmt0(maxLoan) },
        { label: "Max Monthly Payment", value: fmt(maxMonthly) },
        { label: "DTI at Max", value: pct(((maxMonthly + v.monthlyDebts) / monthlyIncome) * 100) },
      ];
    },
    formula: { expression: "Max Payment = min(28% of income, 36% of income − debts)", variables: ["Max Loan derived from payment using amortization formula"] },
    howToUse: "Enter your income, existing debts, down payment, and expected mortgage rate. See the maximum home price you can afford.",
    faqs: [{ question: "What is the 28/36 rule?", answer: "Housing costs should be ≤28% of gross income, and total debt ≤36%. Some lenders allow up to 43%." }],
    relatedCalcs: financeRelated("house-affordability-calculator"),
  },
  // 49. Down Payment Calculator
  {
    slug: "down-payment-calculator", name: "Down Payment Calculator", category: "Finance", categorySlug: "finance",
    description: "Calculate the down payment amount for a home purchase and see how it affects your mortgage.",
    metaDescription: "Free down payment calculator. See how different down payment amounts affect your mortgage payment and PMI.",
    icon: "dollar",
    inputs: [
      { id: "homePrice", label: "Home Price", type: "number", defaultValue: 400000, prefix: "$" },
      { id: "downPct", label: "Down Payment (%)", type: "number", defaultValue: 20, suffix: "%", step: 1 },
      { id: "rate", label: "Mortgage Rate (%)", type: "number", defaultValue: 6.5, suffix: "%", step: 0.1 },
      { id: "term", label: "Term (years)", type: "number", defaultValue: 30 },
    ],
    calculate: (v) => {
      const dp = v.homePrice * (v.downPct / 100);
      const loan = v.homePrice - dp;
      const r = loanCalc(loan, v.rate, v.term * 12);
      const pmi = v.downPct < 20 ? loan * 0.005 / 12 : 0;
      return [
        { label: "Down Payment Amount", value: fmt0(dp), highlight: true },
        { label: "Loan Amount", value: fmt0(loan) },
        { label: "Monthly Payment", value: fmt(r.monthly) },
        { label: "Monthly PMI", value: pmi > 0 ? fmt(pmi) : "None (≥20%)" },
        { label: "Total Payment + PMI", value: fmt(r.monthly + pmi) },
      ];
    },
    formula: { expression: "Down Payment = Home Price × %", variables: ["PMI applies if <20% down", "PMI ≈ 0.5% of loan annually"] },
    howToUse: "Enter the home price and desired down payment percentage to see the impact on your mortgage.",
    faqs: [{ question: "Do I need 20% down?", answer: "No. FHA loans require as little as 3.5%. Conventional loans start at 3-5%. But <20% means paying PMI." }],
    relatedCalcs: financeRelated("down-payment-calculator"),
  },
  // 50. CD Calculator
  {
    slug: "cd-calculator", name: "CD Calculator", category: "Finance", categorySlug: "finance",
    description: "Calculate the maturity value and interest earned on a Certificate of Deposit.",
    metaDescription: "Free CD calculator. Calculate interest earned and maturity value for certificates of deposit.",
    icon: "dollar",
    inputs: [
      { id: "deposit", label: "Initial Deposit", type: "number", defaultValue: 10000, prefix: "$" },
      { id: "rate", label: "APY (%)", type: "number", defaultValue: 5, suffix: "%", step: 0.1 },
      { id: "term", label: "Term (months)", type: "number", defaultValue: 12 },
      { id: "compound", label: "Compounding", type: "select", defaultValue: 12, options: [{ value: 1, label: "Annually" }, { value: 4, label: "Quarterly" }, { value: 12, label: "Monthly" }, { value: 365, label: "Daily" }] },
    ],
    calculate: (v) => {
      const t = v.term / 12;
      const fv = v.deposit * Math.pow(1 + v.rate / 100 / v.compound, v.compound * t);
      const interest = fv - v.deposit;
      return [
        { label: "Maturity Value", value: fmt(fv), highlight: true },
        { label: "Total Interest", value: fmt(interest) },
        { label: "Monthly Interest (avg)", value: fmt(interest / v.term) },
      ];
    },
    formula: { expression: "FV = P × (1 + r/n)^(nt)", variables: ["P = deposit", "r = APY", "n = compounds/year", "t = years"] },
    howToUse: "Enter deposit amount, APY, term, and compounding frequency to see your CD's maturity value.",
    faqs: [{ question: "Is my CD insured?", answer: "Yes, CDs at FDIC-insured banks are protected up to $250,000 per depositor per institution." }],
    relatedCalcs: financeRelated("cd-calculator"),
  },
  // 51. Bond Calculator
  {
    slug: "bond-calculator", name: "Bond Calculator", category: "Finance", categorySlug: "finance",
    description: "Calculate the price, yield, or interest payments of a bond investment.",
    metaDescription: "Free bond calculator. Calculate bond price, yield to maturity, and coupon payments.",
    icon: "dollar",
    inputs: [
      { id: "faceValue", label: "Face Value", type: "number", defaultValue: 1000, prefix: "$" },
      { id: "couponRate", label: "Coupon Rate (%)", type: "number", defaultValue: 5, suffix: "%", step: 0.1 },
      { id: "years", label: "Years to Maturity", type: "number", defaultValue: 10 },
      { id: "marketRate", label: "Market Rate / YTM (%)", type: "number", defaultValue: 4, suffix: "%", step: 0.1 },
    ],
    calculate: (v) => {
      const coupon = v.faceValue * (v.couponRate / 100);
      const r = v.marketRate / 100;
      const pvCoupons = coupon * ((1 - Math.pow(1 + r, -v.years)) / r);
      const pvFace = v.faceValue / Math.pow(1 + r, v.years);
      const price = pvCoupons + pvFace;
      return [
        { label: "Bond Price", value: fmt(price), highlight: true },
        { label: "Annual Coupon", value: fmt(coupon) },
        { label: "Current Yield", value: pct((coupon / price) * 100) },
        { label: "Premium/Discount", value: price > v.faceValue ? "Premium" : price < v.faceValue ? "Discount" : "Par" },
      ];
    },
    formula: { expression: "Price = Σ(Coupon/(1+r)^t) + Face/(1+r)^n", variables: ["PV of coupon payments + PV of face value"] },
    howToUse: "Enter face value, coupon rate, years to maturity, and market rate to calculate the bond's fair price.",
    faqs: [{ question: "What is yield to maturity?", answer: "YTM is the total return expected if the bond is held to maturity, accounting for coupon payments and price gain/loss." }],
    relatedCalcs: financeRelated("bond-calculator"),
  },
  // 52. Roth IRA Calculator
  {
    slug: "roth-ira-calculator", name: "Roth IRA Calculator", category: "Finance", categorySlug: "finance",
    description: "Project the growth of your Roth IRA with tax-free withdrawals in retirement.",
    metaDescription: "Free Roth IRA calculator. Project tax-free growth and retirement income from your Roth IRA contributions.",
    icon: "dollar",
    inputs: [
      { id: "current", label: "Current Balance", type: "number", defaultValue: 10000, prefix: "$" },
      { id: "annual", label: "Annual Contribution", type: "number", defaultValue: 7000, prefix: "$" },
      { id: "rate", label: "Expected Return (%)", type: "number", defaultValue: 7, suffix: "%", step: 0.1 },
      { id: "years", label: "Years Until Retirement", type: "number", defaultValue: 30 },
    ],
    calculate: (v) => {
      const r = v.rate / 100 / 12;
      const n = v.years * 12;
      const mo = v.annual / 12;
      const fv = v.current * Math.pow(1 + r, n) + mo * ((Math.pow(1 + r, n) - 1) / r);
      const contributed = v.current + v.annual * v.years;
      return [
        { label: "Tax-Free Balance", value: fmt0(fv), highlight: true },
        { label: "Total Contributed", value: fmt0(contributed) },
        { label: "Tax-Free Growth", value: fmt0(fv - contributed) },
        { label: "Monthly Retirement Income (4%)", value: fmt((fv * 0.04) / 12) },
      ];
    },
    formula: { expression: "FV = P(1+r)^n + PMT×[(1+r)^n−1]/r", variables: ["All growth and withdrawals are tax-free"] },
    howToUse: "Enter your current Roth IRA balance, annual contribution, expected return, and years to retirement.",
    faqs: [{ question: "Who can contribute to a Roth IRA?", answer: "Single filers earning under $161,000 and married couples under $240,000 (2024). Contribution limit is $7,000/year ($8,000 if 50+)." }],
    relatedCalcs: financeRelated("roth-ira-calculator"),
  },
  // 53. RMD Calculator
  {
    slug: "rmd-calculator", name: "RMD Calculator", category: "Finance", categorySlug: "finance",
    description: "Calculate your Required Minimum Distribution from retirement accounts based on age and balance.",
    metaDescription: "Free RMD calculator. Calculate required minimum distributions from Traditional IRAs and 401(k)s.",
    icon: "dollar",
    inputs: [
      { id: "balance", label: "Account Balance", type: "number", defaultValue: 500000, prefix: "$" },
      { id: "age", label: "Your Age", type: "number", defaultValue: 73, min: 72, max: 120 },
    ],
    calculate: (v) => {
      const lifetable: Record<number, number> = { 72: 27.4, 73: 26.5, 74: 25.5, 75: 24.6, 76: 23.7, 77: 22.9, 78: 22.0, 79: 21.1, 80: 20.2, 81: 19.4, 82: 18.5, 83: 17.7, 84: 16.8, 85: 16.0, 86: 15.2, 87: 14.4, 88: 13.7, 89: 12.9, 90: 12.2 };
      const factor = lifetable[v.age] || Math.max(27.4 - (v.age - 72) * 0.85, 2);
      const rmd = v.balance / factor;
      return [
        { label: "Annual RMD", value: fmt0(rmd), highlight: true },
        { label: "Monthly RMD", value: fmt(rmd / 12) },
        { label: "Distribution Factor", value: factor.toFixed(1) },
        { label: "RMD as % of Balance", value: pct((rmd / v.balance) * 100) },
      ];
    },
    formula: { expression: "RMD = Account Balance / Distribution Factor", variables: ["Factor from IRS Uniform Lifetime Table"] },
    howToUse: "Enter your retirement account balance and age. RMDs start at age 73 (under SECURE 2.0 Act).",
    faqs: [{ question: "When must I take RMDs?", answer: "RMDs must begin by April 1 of the year after you turn 73. Failure to take RMDs results in a 25% penalty on the amount not withdrawn." }],
    relatedCalcs: financeRelated("rmd-calculator"),
  },
  // 54. Depreciation Calculator
  {
    slug: "depreciation-calculator", name: "Depreciation Calculator", category: "Finance", categorySlug: "finance",
    description: "Calculate asset depreciation using straight-line, declining balance, or sum-of-years methods.",
    metaDescription: "Free depreciation calculator. Calculate annual depreciation using straight-line and declining balance methods.",
    icon: "dollar",
    inputs: [
      { id: "cost", label: "Asset Cost", type: "number", defaultValue: 50000, prefix: "$" },
      { id: "salvage", label: "Salvage Value", type: "number", defaultValue: 5000, prefix: "$" },
      { id: "life", label: "Useful Life (years)", type: "number", defaultValue: 5 },
    ],
    calculate: (v) => {
      const slAnnual = (v.cost - v.salvage) / v.life;
      const dbRate = 2 / v.life;
      const dbYear1 = v.cost * dbRate;
      return [
        { label: "Straight-Line (annual)", value: fmt(slAnnual), highlight: true },
        { label: "SL Monthly", value: fmt(slAnnual / 12) },
        { label: "Double Declining Year 1", value: fmt(dbYear1) },
        { label: "Total Depreciation", value: fmt0(v.cost - v.salvage) },
      ];
    },
    formula: { expression: "SL = (Cost − Salvage) / Life", variables: ["DDB Rate = 2 / Life", "Applied to book value each year"] },
    howToUse: "Enter asset cost, salvage value, and useful life to calculate annual depreciation.",
    faqs: [{ question: "Which method should I use?", answer: "Straight-line is simplest and most common. Declining balance front-loads depreciation, which can provide larger tax deductions early." }],
    relatedCalcs: financeRelated("depreciation-calculator"),
  },
  // 55. Budget Calculator
  {
    slug: "budget-calculator", name: "Budget Calculator", category: "Finance", categorySlug: "finance",
    description: "Create a monthly budget using the 50/30/20 rule. Allocate income to needs, wants, and savings.",
    metaDescription: "Free budget calculator. Plan your monthly budget with the 50/30/20 rule for needs, wants, and savings.",
    icon: "dollar",
    inputs: [
      { id: "income", label: "Monthly Income", type: "number", defaultValue: 5000, prefix: "$" },
      { id: "needsPct", label: "Needs (%)", type: "number", defaultValue: 50, suffix: "%" },
      { id: "wantsPct", label: "Wants (%)", type: "number", defaultValue: 30, suffix: "%" },
      { id: "savingsPct", label: "Savings (%)", type: "number", defaultValue: 20, suffix: "%" },
    ],
    calculate: (v) => {
      const needs = v.income * (v.needsPct / 100);
      const wants = v.income * (v.wantsPct / 100);
      const savings = v.income * (v.savingsPct / 100);
      return [
        { label: "Needs Budget", value: fmt(needs), highlight: true },
        { label: "Wants Budget", value: fmt(wants) },
        { label: "Savings/Debt", value: fmt(savings) },
        { label: "Annual Savings", value: fmt0(savings * 12) },
      ];
    },
    formula: { expression: "Category = Income × Percentage", variables: ["50/30/20 is a popular guideline"] },
    howToUse: "Enter your monthly income and adjust the percentages for needs, wants, and savings.",
    faqs: [{ question: "What counts as needs?", answer: "Housing, utilities, groceries, insurance, minimum debt payments, transportation — essentials you must pay." }],
    relatedCalcs: financeRelated("budget-calculator"),
  },
  // 56. Debt Consolidation Calculator
  {
    slug: "debt-consolidation-calculator", name: "Debt Consolidation Calculator", category: "Finance", categorySlug: "finance",
    description: "Compare your current debts with a single consolidation loan to see potential savings.",
    metaDescription: "Free debt consolidation calculator. See if consolidating your debts into one loan saves money.",
    icon: "dollar",
    inputs: [
      { id: "totalDebt", label: "Total Current Debt", type: "number", defaultValue: 30000, prefix: "$" },
      { id: "avgRate", label: "Average Current Rate (%)", type: "number", defaultValue: 18, suffix: "%", step: 0.1 },
      { id: "currentPayment", label: "Total Current Monthly Payments", type: "number", defaultValue: 800, prefix: "$" },
      { id: "newRate", label: "Consolidation Rate (%)", type: "number", defaultValue: 8, suffix: "%", step: 0.1 },
      { id: "newTerm", label: "Consolidation Term (months)", type: "number", defaultValue: 48 },
    ],
    calculate: (v) => {
      const r = loanCalc(v.totalDebt, v.newRate, v.newTerm);
      const currentMonths = (() => { const mr = v.avgRate / 100 / 12; if (v.currentPayment <= v.totalDebt * mr) return Infinity; return Math.ceil(-Math.log(1 - (v.totalDebt * mr) / v.currentPayment) / Math.log(1 + mr)); })();
      const currentTotal = v.currentPayment * currentMonths;
      return [
        { label: "New Monthly Payment", value: fmt(r.monthly), highlight: true },
        { label: "Monthly Savings", value: fmt(v.currentPayment - r.monthly) },
        { label: "New Total Cost", value: fmt0(r.totalPayment) },
        { label: "Current Total Cost", value: currentMonths === Infinity ? "Never paid off" : fmt0(currentTotal) },
        { label: "Total Savings", value: currentMonths === Infinity ? "Significant" : fmt0(currentTotal - r.totalPayment) },
      ];
    },
    formula: { expression: "Compare current payments vs consolidation loan payment", variables: ["Standard amortization formula for new loan"] },
    howToUse: "Enter your total debts and average rate, then compare with a consolidation loan's rate and term.",
    faqs: [{ question: "Is consolidation always better?", answer: "Not always. A longer term may reduce monthly payments but increase total interest. Also consider origination fees." }],
    relatedCalcs: financeRelated("debt-consolidation-calculator"),
  },
  // 57. Pension Calculator
  {
    slug: "pension-calculator", name: "Pension Calculator", category: "Finance", categorySlug: "finance",
    description: "Estimate your pension income based on years of service, final salary, and benefit multiplier.",
    metaDescription: "Free pension calculator. Estimate retirement pension income from years of service and salary.",
    icon: "dollar",
    inputs: [
      { id: "finalSalary", label: "Final Average Salary", type: "number", defaultValue: 80000, prefix: "$" },
      { id: "yearsOfService", label: "Years of Service", type: "number", defaultValue: 25 },
      { id: "multiplier", label: "Benefit Multiplier (%)", type: "number", defaultValue: 2, suffix: "%", step: 0.1 },
    ],
    calculate: (v) => {
      const annualPension = v.finalSalary * (v.multiplier / 100) * v.yearsOfService;
      const monthlyPension = annualPension / 12;
      const replacementRate = (annualPension / v.finalSalary) * 100;
      return [
        { label: "Annual Pension", value: fmt0(annualPension), highlight: true },
        { label: "Monthly Pension", value: fmt(monthlyPension) },
        { label: "Income Replacement", value: pct(replacementRate) },
      ];
    },
    formula: { expression: "Pension = Final Salary × Multiplier × Years of Service", variables: ["Typical multiplier: 1.5-2.5% per year"] },
    howToUse: "Enter your final average salary, years of service, and your plan's benefit multiplier.",
    faqs: [{ question: "What is a typical multiplier?", answer: "Government pensions often use 1.5-2.5%. After 30 years at 2%, you'd receive 60% of your final salary." }],
    relatedCalcs: financeRelated("pension-calculator"),
  },
  // 58. IRR Calculator
  {
    slug: "irr-calculator", name: "IRR Calculator", category: "Finance", categorySlug: "finance",
    description: "Calculate the Internal Rate of Return for an investment with an initial cost and annual cash flows.",
    metaDescription: "Free IRR calculator. Calculate internal rate of return for investment projects with multiple cash flows.",
    icon: "dollar",
    inputs: [
      { id: "initial", label: "Initial Investment", type: "number", defaultValue: 50000, prefix: "$" },
      { id: "cf1", label: "Year 1 Cash Flow", type: "number", defaultValue: 15000, prefix: "$" },
      { id: "cf2", label: "Year 2 Cash Flow", type: "number", defaultValue: 18000, prefix: "$" },
      { id: "cf3", label: "Year 3 Cash Flow", type: "number", defaultValue: 22000, prefix: "$" },
      { id: "cf4", label: "Year 4 Cash Flow", type: "number", defaultValue: 12000, prefix: "$" },
    ],
    calculate: (v) => {
      const cfs = [-v.initial, v.cf1, v.cf2, v.cf3, v.cf4];
      let rate = 0.1;
      for (let iter = 0; iter < 200; iter++) {
        let npv = 0, dnpv = 0;
        for (let t = 0; t < cfs.length; t++) {
          npv += cfs[t] / Math.pow(1 + rate, t);
          dnpv += -t * cfs[t] / Math.pow(1 + rate, t + 1);
        }
        const newRate = rate - npv / dnpv;
        if (Math.abs(newRate - rate) < 1e-10) break;
        rate = newRate;
      }
      const totalReturn = v.cf1 + v.cf2 + v.cf3 + v.cf4;
      return [
        { label: "IRR", value: pct(rate * 100), highlight: true },
        { label: "Total Cash Flows", value: fmt0(totalReturn) },
        { label: "Net Profit", value: fmt0(totalReturn - v.initial) },
        { label: "ROI", value: pct(((totalReturn - v.initial) / v.initial) * 100) },
      ];
    },
    formula: { expression: "NPV = Σ CF_t / (1+IRR)^t = 0, solve for IRR", variables: ["Newton's method iteration"] },
    howToUse: "Enter the initial investment and expected annual cash flows. The calculator finds the rate that makes NPV zero.",
    faqs: [{ question: "What is a good IRR?", answer: "Generally, an IRR above your cost of capital is good. Many businesses target 15-25% for new projects." }],
    relatedCalcs: financeRelated("irr-calculator"),
  },
  // 59. HELOC Calculator
  {
    slug: "heloc-calculator", name: "HELOC Calculator", category: "Finance", categorySlug: "finance",
    description: "Calculate how much you can borrow with a Home Equity Line of Credit and estimate monthly payments.",
    metaDescription: "Free HELOC calculator. Estimate your available home equity and HELOC monthly payments.",
    icon: "dollar",
    inputs: [
      { id: "homeValue", label: "Home Value", type: "number", defaultValue: 400000, prefix: "$" },
      { id: "mortgageBalance", label: "Mortgage Balance", type: "number", defaultValue: 250000, prefix: "$" },
      { id: "ltvLimit", label: "Max LTV (%)", type: "number", defaultValue: 85, suffix: "%" },
      { id: "rate", label: "HELOC Rate (%)", type: "number", defaultValue: 8.5, suffix: "%", step: 0.1 },
      { id: "drawAmount", label: "Amount to Draw", type: "number", defaultValue: 50000, prefix: "$" },
    ],
    calculate: (v) => {
      const maxBorrow = v.homeValue * (v.ltvLimit / 100) - v.mortgageBalance;
      const equity = v.homeValue - v.mortgageBalance;
      const interestOnly = v.drawAmount * (v.rate / 100 / 12);
      return [
        { label: "Max HELOC Amount", value: fmt0(Math.max(maxBorrow, 0)), highlight: true },
        { label: "Total Home Equity", value: fmt0(equity) },
        { label: "Interest-Only Payment", value: fmt(interestOnly) },
        { label: "Equity Used", value: pct(((v.mortgageBalance + v.drawAmount) / v.homeValue) * 100) },
      ];
    },
    formula: { expression: "Max HELOC = Home Value × LTV% − Mortgage Balance", variables: ["Interest-only = Draw × Rate / 12"] },
    howToUse: "Enter your home value, mortgage balance, LTV limit, HELOC rate, and desired draw amount.",
    faqs: [{ question: "HELOC vs home equity loan?", answer: "HELOC is a revolving line of credit with variable rates. Home equity loans are lump-sum with fixed rates." }],
    relatedCalcs: financeRelated("heloc-calculator"),
  },
  // 60. FHA Loan Calculator
  {
    slug: "fha-loan-calculator", name: "FHA Loan Calculator", category: "Finance", categorySlug: "finance",
    description: "Calculate monthly payments for an FHA loan including upfront and annual mortgage insurance premiums.",
    metaDescription: "Free FHA loan calculator. Estimate monthly payments with FHA mortgage insurance premiums.",
    icon: "dollar",
    inputs: [
      { id: "homePrice", label: "Home Price", type: "number", defaultValue: 300000, prefix: "$" },
      { id: "downPct", label: "Down Payment (%)", type: "number", defaultValue: 3.5, suffix: "%", step: 0.5 },
      { id: "rate", label: "Interest Rate (%)", type: "number", defaultValue: 6, suffix: "%", step: 0.1 },
      { id: "term", label: "Term (years)", type: "number", defaultValue: 30 },
    ],
    calculate: (v) => {
      const dp = v.homePrice * (v.downPct / 100);
      const baseLoan = v.homePrice - dp;
      const upfrontMIP = baseLoan * 0.0175;
      const totalLoan = baseLoan + upfrontMIP;
      const r = loanCalc(totalLoan, v.rate, v.term * 12);
      const annualMIP = baseLoan * 0.0055;
      const monthlyMIP = annualMIP / 12;
      return [
        { label: "Monthly P&I", value: fmt(r.monthly), highlight: true },
        { label: "Monthly MIP", value: fmt(monthlyMIP) },
        { label: "Total Monthly", value: fmt(r.monthly + monthlyMIP) },
        { label: "Upfront MIP", value: fmt0(upfrontMIP) },
        { label: "Total Loan (incl UFMIP)", value: fmt0(totalLoan) },
      ];
    },
    formula: { expression: "Upfront MIP = 1.75% of base loan; Annual MIP ≈ 0.55%", variables: ["MIP is added to loan amount", "Annual MIP paid monthly"] },
    howToUse: "Enter home price, down payment (min 3.5%), rate, and term. See payments with FHA mortgage insurance.",
    faqs: [{ question: "Can I remove FHA MIP?", answer: "For loans with <10% down, MIP lasts the life of the loan. With ≥10% down, it drops off after 11 years. Refinancing to conventional is another option." }],
    relatedCalcs: financeRelated("fha-loan-calculator"),
  },
  // 61. Rental Property Calculator
  {
    slug: "rental-property-calculator", name: "Rental Property Calculator", category: "Finance", categorySlug: "finance",
    description: "Analyze rental property investment returns including cash flow, cap rate, and cash-on-cash return.",
    metaDescription: "Free rental property calculator. Analyze ROI, cash flow, cap rate, and returns on rental investments.",
    icon: "dollar",
    inputs: [
      { id: "purchasePrice", label: "Purchase Price", type: "number", defaultValue: 300000, prefix: "$" },
      { id: "downPayment", label: "Down Payment (%)", type: "number", defaultValue: 25, suffix: "%" },
      { id: "rate", label: "Mortgage Rate (%)", type: "number", defaultValue: 7, suffix: "%", step: 0.1 },
      { id: "monthlyRent", label: "Monthly Rent", type: "number", defaultValue: 2200, prefix: "$" },
      { id: "expenses", label: "Monthly Expenses (tax, ins, maint)", type: "number", defaultValue: 600, prefix: "$" },
    ],
    calculate: (v) => {
      const dp = v.purchasePrice * (v.downPayment / 100);
      const loan = v.purchasePrice - dp;
      const r = loanCalc(loan, v.rate, 360);
      const noi = (v.monthlyRent - v.expenses) * 12;
      const cashFlow = v.monthlyRent - r.monthly - v.expenses;
      const capRate = (noi / v.purchasePrice) * 100;
      const cocReturn = (cashFlow * 12 / dp) * 100;
      return [
        { label: "Monthly Cash Flow", value: fmt(cashFlow), highlight: true },
        { label: "Cap Rate", value: pct(capRate) },
        { label: "Cash-on-Cash Return", value: pct(cocReturn) },
        { label: "Monthly Mortgage", value: fmt(r.monthly) },
        { label: "Annual NOI", value: fmt0(noi) },
      ];
    },
    formula: { expression: "Cap Rate = NOI / Purchase Price; CoC = Cash Flow / Down Payment", variables: ["NOI = Rent − Expenses (excl mortgage)"] },
    howToUse: "Enter purchase details, expected rent, and expenses. See your cash flow and investment returns.",
    faqs: [{ question: "What is a good cap rate?", answer: "Cap rates of 5-10% are common. Higher cap rates = higher returns but often higher risk areas." }],
    relatedCalcs: financeRelated("rental-property-calculator"),
  },
  // 62. Payback Period Calculator
  {
    slug: "payback-period-calculator", name: "Payback Period Calculator", category: "Finance", categorySlug: "finance",
    description: "Calculate how long it takes to recoup an investment from its annual cash flows.",
    metaDescription: "Free payback period calculator. Find how long to recover your investment from annual returns.",
    icon: "dollar",
    inputs: [
      { id: "investment", label: "Initial Investment", type: "number", defaultValue: 50000, prefix: "$" },
      { id: "annualReturn", label: "Annual Net Cash Flow", type: "number", defaultValue: 12000, prefix: "$" },
    ],
    calculate: (v) => {
      if (v.annualReturn <= 0) return [{ label: "Error", value: "Cash flow must be positive" }];
      const years = v.investment / v.annualReturn;
      const fullYears = Math.floor(years);
      const remainingMonths = Math.round((years - fullYears) * 12);
      return [
        { label: "Payback Period", value: `${fullYears} yrs ${remainingMonths} mos`, highlight: true },
        { label: "Decimal Years", value: years.toFixed(2) },
        { label: "5-Year Return", value: fmt0(v.annualReturn * 5 - v.investment) },
      ];
    },
    formula: { expression: "Payback = Investment / Annual Cash Flow", variables: ["Simple payback, no discounting"] },
    howToUse: "Enter initial investment and expected annual returns to find the payback period.",
    faqs: [{ question: "What is a good payback period?", answer: "Generally under 3-5 years for most business investments. Shorter is better for risk management." }],
    relatedCalcs: financeRelated("payback-period-calculator"),
  },
  // 63. Home Equity Loan Calculator
  {
    slug: "home-equity-loan-calculator", name: "Home Equity Loan Calculator", category: "Finance", categorySlug: "finance",
    description: "Calculate monthly payments for a fixed-rate home equity loan.",
    metaDescription: "Free home equity loan calculator. Estimate monthly payments and total cost for home equity loans.",
    icon: "dollar",
    inputs: [
      { id: "loanAmount", label: "Loan Amount", type: "number", defaultValue: 50000, prefix: "$" },
      { id: "rate", label: "Interest Rate (%)", type: "number", defaultValue: 7.5, suffix: "%", step: 0.1 },
      { id: "term", label: "Term (years)", type: "number", defaultValue: 15 },
    ],
    calculate: (v) => {
      const r = loanCalc(v.loanAmount, v.rate, v.term * 12);
      return [
        { label: "Monthly Payment", value: fmt(r.monthly), highlight: true },
        { label: "Total Interest", value: fmt0(r.totalInterest) },
        { label: "Total Cost", value: fmt0(r.totalPayment) },
      ];
    },
    formula: { expression: "Standard amortization: M = P × [r(1+r)^n] / [(1+r)^n − 1]", variables: ["Fixed rate, fixed term"] },
    howToUse: "Enter the loan amount, interest rate, and term to see your monthly payment.",
    faqs: [{ question: "Is home equity loan interest deductible?", answer: "Yes, if the loan is used to buy, build, or substantially improve your home (up to $750K combined mortgage debt)." }],
    relatedCalcs: financeRelated("home-equity-loan-calculator"),
  },
  // 64. Mutual Fund Calculator
  {
    slug: "mutual-fund-calculator", name: "Mutual Fund Calculator", category: "Finance", categorySlug: "finance",
    description: "Project mutual fund investment growth with regular SIP contributions and expected returns.",
    metaDescription: "Free mutual fund calculator. Project growth with SIP contributions and compound returns.",
    icon: "dollar",
    inputs: [
      { id: "initial", label: "Initial Investment", type: "number", defaultValue: 5000, prefix: "$" },
      { id: "monthly", label: "Monthly SIP", type: "number", defaultValue: 500, prefix: "$" },
      { id: "rate", label: "Expected Return (%)", type: "number", defaultValue: 10, suffix: "%", step: 0.1 },
      { id: "years", label: "Investment Period (years)", type: "number", defaultValue: 15 },
    ],
    calculate: (v) => {
      const r = v.rate / 100 / 12;
      const n = v.years * 12;
      const fv = v.initial * Math.pow(1 + r, n) + v.monthly * ((Math.pow(1 + r, n) - 1) / r);
      const invested = v.initial + v.monthly * n;
      return [
        { label: "Future Value", value: fmt0(fv), highlight: true },
        { label: "Total Invested", value: fmt0(invested) },
        { label: "Wealth Gained", value: fmt0(fv - invested) },
        { label: "Growth Multiple", value: `${(fv / invested).toFixed(2)}×` },
      ];
    },
    formula: { expression: "FV = P(1+r)^n + SIP × [(1+r)^n − 1] / r", variables: ["SIP = Systematic Investment Plan"] },
    howToUse: "Enter initial investment, monthly SIP amount, expected return, and period.",
    faqs: [{ question: "What is SIP?", answer: "Systematic Investment Plan — investing a fixed amount regularly (monthly). It averages out market volatility through dollar-cost averaging." }],
    relatedCalcs: financeRelated("mutual-fund-calculator"),
  },
  // 65. Rent Calculator
  {
    slug: "rent-calculator", name: "Rent Calculator", category: "Finance", categorySlug: "finance",
    description: "Calculate how much rent you can afford based on your income and the common 30% rule.",
    metaDescription: "Free rent calculator. Find how much rent you can afford based on income using the 30% rule.",
    icon: "dollar",
    inputs: [
      { id: "monthlyIncome", label: "Monthly Gross Income", type: "number", defaultValue: 5000, prefix: "$" },
      { id: "rentPct", label: "Rent Percentage of Income (%)", type: "number", defaultValue: 30, suffix: "%" },
      { id: "utilities", label: "Estimated Monthly Utilities", type: "number", defaultValue: 150, prefix: "$" },
    ],
    calculate: (v) => {
      const maxRent = v.monthlyIncome * (v.rentPct / 100);
      const maxRentAfterUtil = maxRent - v.utilities;
      return [
        { label: "Max Rent Budget", value: fmt(maxRent), highlight: true },
        { label: "After Utilities", value: fmt(maxRentAfterUtil) },
        { label: "Annual Rent Cost", value: fmt0(maxRent * 12) },
        { label: "Remaining Income", value: fmt(v.monthlyIncome - maxRent) },
      ];
    },
    formula: { expression: "Max Rent = Monthly Income × Rent%", variables: ["30% rule is a common guideline"] },
    howToUse: "Enter your monthly income and desired rent percentage to find your maximum rent budget.",
    faqs: [{ question: "Is 30% a hard rule?", answer: "No. It's a guideline. In high-cost cities, many spend 40-50%. The key is balancing rent with savings and other financial goals." }],
    relatedCalcs: financeRelated("rent-calculator"),
  },
  // 66. College Cost Calculator
  {
    slug: "college-cost-calculator", name: "College Cost Calculator", category: "Finance", categorySlug: "finance",
    description: "Estimate the total cost of college education including tuition growth and room & board.",
    metaDescription: "Free college cost calculator. Estimate total college costs with tuition inflation over 4 years.",
    icon: "dollar",
    inputs: [
      { id: "annualTuition", label: "Annual Tuition", type: "number", defaultValue: 30000, prefix: "$" },
      { id: "roomBoard", label: "Annual Room & Board", type: "number", defaultValue: 12000, prefix: "$" },
      { id: "years", label: "Years Until Start", type: "number", defaultValue: 5 },
      { id: "inflation", label: "Tuition Inflation (%/yr)", type: "number", defaultValue: 5, suffix: "%", step: 0.5 },
    ],
    calculate: (v) => {
      let total = 0;
      const annualCost = v.annualTuition + v.roomBoard;
      for (let y = 0; y < 4; y++) {
        total += annualCost * Math.pow(1 + v.inflation / 100, v.years + y);
      }
      const currentCost = annualCost * 4;
      return [
        { label: "Total 4-Year Cost", value: fmt0(total), highlight: true },
        { label: "Year 1 Cost", value: fmt0(annualCost * Math.pow(1 + v.inflation / 100, v.years)) },
        { label: "Current 4-Year Cost", value: fmt0(currentCost) },
        { label: "Monthly Savings Needed", value: fmt(total / (v.years * 12)) },
      ];
    },
    formula: { expression: "Future Cost = Current × (1 + inflation)^years", variables: ["Summed over 4 years of college"] },
    howToUse: "Enter current tuition, room & board, years until enrollment, and expected tuition inflation.",
    faqs: [{ question: "How fast does tuition increase?", answer: "Historically 5-8% per year, outpacing general inflation. Public and private rates differ significantly." }],
    relatedCalcs: financeRelated("college-cost-calculator"),
  },
  // 67. Auto Lease Calculator
  {
    slug: "auto-lease-calculator", name: "Auto Lease Calculator", category: "Finance", categorySlug: "finance",
    description: "Calculate monthly auto lease payments with residual value, money factor, taxes, and fees.",
    metaDescription: "Free auto lease calculator. Estimate car lease payments including taxes, residual, and money factor.",
    icon: "dollar",
    inputs: [
      { id: "msrp", label: "MSRP", type: "number", defaultValue: 35000, prefix: "$" },
      { id: "negotiatedPrice", label: "Negotiated Price", type: "number", defaultValue: 33000, prefix: "$" },
      { id: "downPayment", label: "Down Payment", type: "number", defaultValue: 2000, prefix: "$" },
      { id: "residualPct", label: "Residual (%)", type: "number", defaultValue: 58, suffix: "%" },
      { id: "moneyFactor", label: "Money Factor", type: "number", defaultValue: 0.0018, step: 0.0001 },
      { id: "term", label: "Term (months)", type: "number", defaultValue: 36 },
      { id: "taxRate", label: "Tax Rate (%)", type: "number", defaultValue: 8, suffix: "%", step: 0.25 },
    ],
    calculate: (v) => {
      const residual = v.msrp * (v.residualPct / 100);
      const capCost = v.negotiatedPrice - v.downPayment;
      const depreciation = (capCost - residual) / v.term;
      const finance = (capCost + residual) * v.moneyFactor;
      const preTax = depreciation + finance;
      const monthly = preTax * (1 + v.taxRate / 100);
      return [
        { label: "Monthly Payment", value: fmt(monthly), highlight: true },
        { label: "Pre-Tax Payment", value: fmt(preTax) },
        { label: "Total Lease Cost", value: fmt0(monthly * v.term + v.downPayment) },
        { label: "Implied APR", value: pct(v.moneyFactor * 2400) },
        { label: "Residual Value", value: fmt0(residual) },
      ];
    },
    formula: { expression: "Payment = (Cap − Residual)/Term + (Cap + Residual) × MF + Tax", variables: ["APR ≈ MF × 2400"] },
    howToUse: "Enter MSRP, negotiated price, residual, money factor, and term to estimate your lease payment.",
    faqs: [{ question: "Should I negotiate MSRP or money factor?", answer: "Both. The cap cost (negotiated price) is the biggest lever. A lower money factor also reduces your finance charges." }],
    relatedCalcs: financeRelated("auto-lease-calculator"),
  },
  // 68. Boat Loan Calculator
  {
    slug: "boat-loan-calculator", name: "Boat Loan Calculator", category: "Finance", categorySlug: "finance",
    description: "Calculate monthly payments for a boat loan including down payment and loan term options.",
    metaDescription: "Free boat loan calculator. Estimate monthly boat payments with interest and down payment.",
    icon: "dollar",
    inputs: [
      { id: "price", label: "Boat Price", type: "number", defaultValue: 45000, prefix: "$" },
      { id: "downPayment", label: "Down Payment", type: "number", defaultValue: 5000, prefix: "$" },
      { id: "rate", label: "Interest Rate (%)", type: "number", defaultValue: 7, suffix: "%", step: 0.1 },
      { id: "term", label: "Term (years)", type: "number", defaultValue: 10 },
    ],
    calculate: (v) => {
      const loan = v.price - v.downPayment;
      const r = loanCalc(loan, v.rate, v.term * 12);
      return [
        { label: "Monthly Payment", value: fmt(r.monthly), highlight: true },
        { label: "Loan Amount", value: fmt0(loan) },
        { label: "Total Interest", value: fmt0(r.totalInterest) },
        { label: "Total Cost", value: fmt0(r.totalPayment + v.downPayment) },
      ];
    },
    formula: { expression: "Standard loan amortization", variables: ["Boat loans typically 10-20 years"] },
    howToUse: "Enter boat price, down payment, rate, and term to estimate monthly payments.",
    faqs: [{ question: "What are typical boat loan rates?", answer: "Boat loan rates range from 5-9% depending on credit, boat age, and loan amount. New boats get better rates." }],
    relatedCalcs: financeRelated("boat-loan-calculator"),
  },
  // 69. Marriage Tax Calculator
  {
    slug: "marriage-tax-calculator", name: "Marriage Tax Calculator", category: "Finance", categorySlug: "finance",
    description: "Compare your tax liability filing as single vs married filing jointly to find the marriage tax bonus or penalty.",
    metaDescription: "Free marriage tax calculator. See if filing jointly saves or costs you money compared to filing separately.",
    icon: "dollar",
    inputs: [
      { id: "income1", label: "Spouse 1 Income", type: "number", defaultValue: 75000, prefix: "$" },
      { id: "income2", label: "Spouse 2 Income", type: "number", defaultValue: 65000, prefix: "$" },
    ],
    calculate: (v) => {
      const calcTax = (income: number, brackets: { limit: number; rate: number }[]) => {
        let tax = 0, rem = income, prev = 0;
        for (const b of brackets) { const c = Math.min(rem, b.limit - prev); if (c <= 0) break; tax += c * b.rate; rem -= c; prev = b.limit; }
        return tax;
      };
      const single = [{ limit: 11600, rate: 0.10 }, { limit: 47150, rate: 0.12 }, { limit: 100525, rate: 0.22 }, { limit: 191950, rate: 0.24 }, { limit: 243725, rate: 0.32 }, { limit: 609350, rate: 0.35 }, { limit: Infinity, rate: 0.37 }];
      const married = [{ limit: 23200, rate: 0.10 }, { limit: 94300, rate: 0.12 }, { limit: 201050, rate: 0.22 }, { limit: 383900, rate: 0.24 }, { limit: 487450, rate: 0.32 }, { limit: 731200, rate: 0.35 }, { limit: Infinity, rate: 0.37 }];
      const tax1 = calcTax(v.income1 - 14600, single);
      const tax2 = calcTax(v.income2 - 14600, single);
      const taxJoint = calcTax(v.income1 + v.income2 - 29200, married);
      const diff = (tax1 + tax2) - taxJoint;
      return [
        { label: diff >= 0 ? "Marriage Bonus" : "Marriage Penalty", value: fmt(Math.abs(diff)), highlight: true },
        { label: "Tax as Singles", value: fmt0(tax1 + tax2) },
        { label: "Tax as Married", value: fmt0(taxJoint) },
      ];
    },
    formula: { expression: "Compare single taxes vs married filing jointly", variables: ["2024 brackets with standard deductions"] },
    howToUse: "Enter each spouse's income to see if marriage creates a tax bonus or penalty.",
    faqs: [{ question: "What causes a marriage penalty?", answer: "When both spouses earn similar high incomes, the combined income pushes into higher brackets faster than two single returns." }],
    relatedCalcs: financeRelated("marriage-tax-calculator"),
  },
  // 70. Estate Tax Calculator
  {
    slug: "estate-tax-calculator", name: "Estate Tax Calculator", category: "Finance", categorySlug: "finance",
    description: "Estimate federal estate tax liability based on the value of an estate and applicable exemptions.",
    metaDescription: "Free estate tax calculator. Estimate federal estate taxes with current exemption amounts and rates.",
    icon: "dollar",
    inputs: [
      { id: "estateValue", label: "Total Estate Value", type: "number", defaultValue: 15000000, prefix: "$" },
      { id: "exemption", label: "Exemption Amount", type: "number", defaultValue: 13610000, prefix: "$" },
      { id: "deductions", label: "Deductions (charity, etc.)", type: "number", defaultValue: 0, prefix: "$" },
    ],
    calculate: (v) => {
      const taxable = Math.max(v.estateValue - v.exemption - v.deductions, 0);
      const tax = taxable * 0.40;
      const effectiveRate = v.estateValue > 0 ? (tax / v.estateValue) * 100 : 0;
      return [
        { label: "Estimated Estate Tax", value: fmt0(tax), highlight: true },
        { label: "Taxable Estate", value: fmt0(taxable) },
        { label: "Effective Rate", value: pct(effectiveRate) },
        { label: "Net to Heirs", value: fmt0(v.estateValue - tax) },
      ];
    },
    formula: { expression: "Tax = (Estate − Exemption − Deductions) × 40%", variables: ["2024 exemption: $13.61M per person", "Rate: 40% on taxable portion"] },
    howToUse: "Enter total estate value, exemption amount, and deductions. See estimated federal estate tax.",
    faqs: [{ question: "Who pays estate tax?", answer: "Only estates exceeding the exemption (~$13.61M in 2024). Less than 1% of estates owe federal estate tax." }],
    relatedCalcs: financeRelated("estate-tax-calculator"),
  },
  // 71. Social Security Calculator
  {
    slug: "social-security-calculator", name: "Social Security Calculator", category: "Finance", categorySlug: "finance",
    description: "Estimate your monthly Social Security retirement benefit based on average earnings and claiming age.",
    metaDescription: "Free Social Security calculator. Estimate your monthly retirement benefit by claiming age.",
    icon: "dollar",
    inputs: [
      { id: "avgEarnings", label: "Average Annual Earnings", type: "number", defaultValue: 65000, prefix: "$" },
      { id: "claimAge", label: "Claiming Age", type: "number", defaultValue: 67, min: 62, max: 70 },
      { id: "fra", label: "Full Retirement Age", type: "number", defaultValue: 67, min: 66, max: 67 },
    ],
    calculate: (v) => {
      const aime = v.avgEarnings / 12;
      let pia = 0;
      if (aime <= 1174) pia = aime * 0.9;
      else if (aime <= 7078) pia = 1174 * 0.9 + (aime - 1174) * 0.32;
      else pia = 1174 * 0.9 + (7078 - 1174) * 0.32 + (aime - 7078) * 0.15;
      let benefit = pia;
      if (v.claimAge < v.fra) {
        const monthsEarly = (v.fra - v.claimAge) * 12;
        const reduction = monthsEarly <= 36 ? monthsEarly * (5/900) : 36 * (5/900) + (monthsEarly - 36) * (5/1200);
        benefit = pia * (1 - reduction);
      } else if (v.claimAge > v.fra) {
        benefit = pia * (1 + (v.claimAge - v.fra) * 0.08);
      }
      return [
        { label: "Monthly Benefit", value: fmt(benefit), highlight: true },
        { label: "Annual Benefit", value: fmt0(benefit * 12) },
        { label: "PIA (at FRA)", value: fmt(pia) },
        { label: "Adjustment", value: v.claimAge < v.fra ? `−${pct(((pia - benefit) / pia) * 100)}` : `+${pct(((benefit - pia) / pia) * 100)}` },
      ];
    },
    formula: { expression: "PIA = 90%×first $1,174 + 32%×next $5,904 + 15%×remainder", variables: ["Reduced ~6.7%/yr before FRA", "Increased 8%/yr after FRA to age 70"] },
    howToUse: "Enter your average annual earnings, claiming age, and full retirement age.",
    faqs: [{ question: "Should I claim early?", answer: "Claiming at 62 reduces benefits ~30%. Waiting to 70 increases ~24% above FRA. Consider health, savings, and other income." }],
    relatedCalcs: financeRelated("social-security-calculator"),
  },
  // 72. Annuity Payout Calculator
  {
    slug: "annuity-payout-calculator", name: "Annuity Payout Calculator", category: "Finance", categorySlug: "finance",
    description: "Calculate the periodic payout from an annuity given a lump sum, interest rate, and payout period.",
    metaDescription: "Free annuity payout calculator. Estimate periodic payments from an annuity investment.",
    icon: "dollar",
    inputs: [
      { id: "principal", label: "Annuity Value", type: "number", defaultValue: 500000, prefix: "$" },
      { id: "rate", label: "Interest Rate (%)", type: "number", defaultValue: 5, suffix: "%", step: 0.1 },
      { id: "years", label: "Payout Period (years)", type: "number", defaultValue: 20 },
    ],
    calculate: (v) => {
      const r = v.rate / 100 / 12;
      const n = v.years * 12;
      const pmt = r > 0 ? v.principal * r / (1 - Math.pow(1 + r, -n)) : v.principal / n;
      return [
        { label: "Monthly Payout", value: fmt(pmt), highlight: true },
        { label: "Annual Payout", value: fmt0(pmt * 12) },
        { label: "Total Payouts", value: fmt0(pmt * n) },
        { label: "Total Interest Earned", value: fmt0(pmt * n - v.principal) },
      ];
    },
    formula: { expression: "PMT = PV × r / (1 − (1+r)^−n)", variables: ["PV = annuity value", "r = monthly rate", "n = total payments"] },
    howToUse: "Enter the annuity value, interest rate, and desired payout period.",
    faqs: [{ question: "What types of annuities exist?", answer: "Fixed (guaranteed rate), variable (market-linked), immediate (payouts start now), and deferred (payouts start later)." }],
    relatedCalcs: financeRelated("annuity-payout-calculator"),
  },
  // 73. Credit Cards Payoff Calculator
  {
    slug: "credit-cards-payoff-calculator", name: "Credit Cards Payoff Calculator", category: "Finance", categorySlug: "finance",
    description: "Calculate how long it takes to pay off credit card debt and total interest paid with minimum or fixed payments.",
    metaDescription: "Free credit card payoff calculator. Find how long to pay off your balance and total interest costs.",
    icon: "dollar",
    inputs: [
      { id: "balance", label: "Current Balance", type: "number", defaultValue: 8000, prefix: "$" },
      { id: "apr", label: "APR (%)", type: "number", defaultValue: 22, suffix: "%", step: 0.1 },
      { id: "payment", label: "Monthly Payment", type: "number", defaultValue: 200, prefix: "$" },
    ],
    calculate: (v) => {
      const mr = v.apr / 100 / 12;
      if (v.payment <= v.balance * mr) return [{ label: "Error", value: "Payment too low to cover interest", highlight: true }];
      const months = Math.ceil(-Math.log(1 - (v.balance * mr) / v.payment) / Math.log(1 + mr));
      const totalPaid = v.payment * months;
      const totalInterest = totalPaid - v.balance;
      return [
        { label: "Months to Payoff", value: `${months} months (${(months / 12).toFixed(1)} yrs)`, highlight: true },
        { label: "Total Interest", value: fmt0(totalInterest) },
        { label: "Total Paid", value: fmt0(totalPaid) },
      ];
    },
    formula: { expression: "Months = −log(1 − Balance×r/Payment) / log(1+r)", variables: ["r = monthly rate = APR/12"] },
    howToUse: "Enter your credit card balance, APR, and monthly payment amount.",
    faqs: [{ question: "Why does minimum payment take so long?", answer: "Minimum payments (often 2% of balance) mostly cover interest. A $5,000 balance at 20% APR with minimums takes 25+ years." }],
    relatedCalcs: financeRelated("credit-cards-payoff-calculator"),
  },
  // 74. VA Mortgage Calculator
  {
    slug: "va-mortgage-calculator", name: "VA Mortgage Calculator", category: "Finance", categorySlug: "finance",
    description: "Calculate monthly payments for a VA home loan including the VA funding fee. No down payment or PMI required.",
    metaDescription: "Free VA mortgage calculator. Estimate payments for VA home loans with funding fee and no PMI.",
    icon: "dollar",
    inputs: [
      { id: "homePrice", label: "Home Price", type: "number", defaultValue: 350000, prefix: "$" },
      { id: "downPayment", label: "Down Payment", type: "number", defaultValue: 0, prefix: "$" },
      { id: "rate", label: "Interest Rate (%)", type: "number", defaultValue: 6.25, suffix: "%", step: 0.1 },
      { id: "term", label: "Term (years)", type: "number", defaultValue: 30 },
      { id: "fundingFee", label: "Funding Fee (%)", type: "number", defaultValue: 2.15, suffix: "%", step: 0.05 },
    ],
    calculate: (v) => {
      const baseLoan = v.homePrice - v.downPayment;
      const fee = baseLoan * (v.fundingFee / 100);
      const totalLoan = baseLoan + fee;
      const r = loanCalc(totalLoan, v.rate, v.term * 12);
      return [
        { label: "Monthly Payment", value: fmt(r.monthly), highlight: true },
        { label: "VA Funding Fee", value: fmt0(fee) },
        { label: "Total Loan Amount", value: fmt0(totalLoan) },
        { label: "Total Interest", value: fmt0(r.totalInterest) },
        { label: "No PMI", value: "✓ VA benefit" },
      ];
    },
    formula: { expression: "Loan = (Price − Down) + Funding Fee; standard amortization", variables: ["Funding fee can be financed into loan", "No PMI required"] },
    howToUse: "Enter home price, down payment (can be $0), rate, term, and funding fee percentage.",
    faqs: [{ question: "What is the VA funding fee?", answer: "A one-time fee (1.25-3.3%) that funds the VA loan program. Exempt for veterans with service-connected disabilities." }],
    relatedCalcs: financeRelated("va-mortgage-calculator"),
  },
  // 75. Average Return Calculator
  {
    slug: "average-return-calculator", name: "Average Return Calculator", category: "Finance", categorySlug: "finance",
    description: "Calculate the average annual return (CAGR) of an investment from start and end values over time.",
    metaDescription: "Free average return calculator. Find CAGR and average annual return from investment performance.",
    icon: "dollar",
    inputs: [
      { id: "startValue", label: "Starting Value", type: "number", defaultValue: 10000, prefix: "$" },
      { id: "endValue", label: "Ending Value", type: "number", defaultValue: 25000, prefix: "$" },
      { id: "years", label: "Number of Years", type: "number", defaultValue: 10 },
    ],
    calculate: (v) => {
      if (v.startValue <= 0 || v.years <= 0) return [{ label: "Error", value: "Values must be positive" }];
      const cagr = (Math.pow(v.endValue / v.startValue, 1 / v.years) - 1) * 100;
      const totalReturn = ((v.endValue - v.startValue) / v.startValue) * 100;
      return [
        { label: "CAGR", value: pct(cagr), highlight: true },
        { label: "Total Return", value: pct(totalReturn) },
        { label: "Gain/Loss", value: fmt0(v.endValue - v.startValue) },
        { label: "Growth Multiple", value: `${(v.endValue / v.startValue).toFixed(2)}×` },
      ];
    },
    formula: { expression: "CAGR = (End/Start)^(1/Years) − 1", variables: ["Compound Annual Growth Rate"] },
    howToUse: "Enter starting value, ending value, and time period to calculate average annual return.",
    faqs: [{ question: "CAGR vs simple average?", answer: "CAGR accounts for compounding and is more accurate. Simple average can be misleading with volatile returns." }],
    relatedCalcs: financeRelated("average-return-calculator"),
  },
];

const financeSubcategoryMap: Record<string, string> = {
  // Loan Calculators
  "loan-calculator": "Loan Calculators",
  "auto-loan-calculator": "Loan Calculators",
  "personal-loan-calculator": "Loan Calculators",
  "student-loan-calculator": "Loan Calculators",
  "refinance-calculator": "Loan Calculators",
  "mortgage-refinance-calculator": "Loan Calculators",
  "amortization-calculator": "Loan Calculators",
  "mortgage-amortization-schedule-calculator": "Loan Calculators",
  "business-loan-calculator": "Loan Calculators",
  "lease-calculator": "Loan Calculators",
  "mortgage-payoff-calculator": "Loan Calculators",
  "fha-loan-calculator": "Loan Calculators",
  "heloc-calculator": "Loan Calculators",
  "home-equity-loan-calculator": "Loan Calculators",
  "boat-loan-calculator": "Loan Calculators",
  "auto-lease-calculator": "Loan Calculators",
  "va-mortgage-calculator": "Loan Calculators",
  // Investment Calculators
  "interest-rate-calculator": "Investment Calculators",
  "compound-interest-calculator": "Investment Calculators",
  "simple-interest-calculator": "Investment Calculators",
  "investment-calculator": "Investment Calculators",
  "roi-calculator": "Investment Calculators",
  "savings-calculator": "Investment Calculators",
  "cd-calculator": "Investment Calculators",
  "bond-calculator": "Investment Calculators",
  "mutual-fund-calculator": "Investment Calculators",
  "irr-calculator": "Investment Calculators",
  "payback-period-calculator": "Investment Calculators",
  "annuity-calculator": "Investment Calculators",
  "present-value-calculator": "Investment Calculators",
  "future-value-calculator": "Investment Calculators",
  "annuity-payout-calculator": "Investment Calculators",
  "roth-ira-calculator": "Investment Calculators",
  "average-return-calculator": "Investment Calculators",
  // Retirement Calculators
  "retirement-calculator": "Retirement Calculators",
  "401k-calculator": "Retirement Calculators",
  "ira-calculator": "Retirement Calculators",
  "rmd-calculator": "Retirement Calculators",
  "pension-calculator": "Retirement Calculators",
  "social-security-calculator": "Retirement Calculators",
  // Tax Calculators
  "tax-calculator": "Tax Calculators",
  "income-tax-calculator": "Tax Calculators",
  "capital-gains-tax-calculator": "Tax Calculators",
  "sales-tax-calculator": "Tax Calculators",
  "vat-calculator": "Tax Calculators",
  "property-tax-calculator": "Tax Calculators",
  "marriage-tax-calculator": "Tax Calculators",
  "estate-tax-calculator": "Tax Calculators",
  // Business Calculators
  "profit-margin-calculator": "Business Calculators",
  "break-even-calculator": "Business Calculators",
  "markup-calculator": "Business Calculators",
  "discount-calculator": "Business Calculators",
  "depreciation-calculator": "Business Calculators",
  // Real Estate Calculators
  "rent-vs-buy-calculator": "Real Estate Calculators",
  "house-affordability-calculator": "Real Estate Calculators",
  "down-payment-calculator": "Real Estate Calculators",
  "rental-property-calculator": "Real Estate Calculators",
  // Personal Finance
  "salary-calculator": "Personal Finance",
  "hourly-to-salary-calculator": "Personal Finance",
  "overtime-pay-calculator": "Personal Finance",
  "commission-calculator": "Personal Finance",
  "bonus-calculator": "Personal Finance",
  "take-home-pay-calculator": "Personal Finance",
  "budget-calculator": "Personal Finance",
  "debt-consolidation-calculator": "Personal Finance",
  "tip-calculator": "Personal Finance",
  "rent-calculator": "Personal Finance",
  "credit-card-payment-calculator": "Personal Finance",
  "credit-card-interest-calculator": "Personal Finance",
  "debt-payoff-calculator": "Personal Finance",
  "debt-to-income-ratio-calculator": "Personal Finance",
  "credit-cards-payoff-calculator": "Personal Finance",
  "college-cost-calculator": "Personal Finance",
  "inflation-calculator": "Personal Finance",
  "apr-calculator": "Personal Finance",
};

export const financeCalculators: CalculatorConfig[] = _financeCalculators.map(c => ({
  ...c,
  subcategory: financeSubcategoryMap[c.slug] || "General",
}));
