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
  { name: "Investment Calculator", slug: "investment-calculator", icon: "dollar", category: "finance" },
  { name: "Savings Calculator", slug: "savings-calculator", icon: "dollar", category: "finance" },
].filter((c) => c.slug !== exclude);

export const financeCalculatorsExtended: CalculatorConfig[] = [
  // ═══════════════════════════════════════════
  // INVESTMENT CALCULATORS
  // ═══════════════════════════════════════════
  {
    slug: "npv-calculator", name: "Net Present Value (NPV) Calculator", category: "Finance", categorySlug: "finance", subcategory: "Investment Calculators",
    description: "Calculate the net present value of future cash flows to determine if an investment is worthwhile.",
    metaDescription: "Free NPV calculator. Determine the present value of future cash flows for investment decisions.",
    icon: "dollar",
    inputs: [
      { id: "initial", label: "Initial Investment", type: "number", defaultValue: 100000, prefix: "$" },
      { id: "rate", label: "Discount Rate (%)", type: "number", defaultValue: 10, suffix: "%", step: 0.5 },
      { id: "cf1", label: "Year 1 Cash Flow", type: "number", defaultValue: 30000, prefix: "$" },
      { id: "cf2", label: "Year 2 Cash Flow", type: "number", defaultValue: 35000, prefix: "$" },
      { id: "cf3", label: "Year 3 Cash Flow", type: "number", defaultValue: 40000, prefix: "$" },
      { id: "cf4", label: "Year 4 Cash Flow", type: "number", defaultValue: 25000, prefix: "$" },
      { id: "cf5", label: "Year 5 Cash Flow", type: "number", defaultValue: 20000, prefix: "$" },
    ],
    calculate: (v) => {
      const r = v.rate / 100;
      const cfs = [v.cf1, v.cf2, v.cf3, v.cf4, v.cf5];
      let npv = -v.initial;
      cfs.forEach((cf, i) => { npv += cf / Math.pow(1 + r, i + 1); });
      const totalCF = cfs.reduce((s, c) => s + c, 0);
      return [
        { label: "Net Present Value", value: fmt0(npv), highlight: true },
        { label: "Decision", value: npv >= 0 ? "✓ Accept (NPV ≥ 0)" : "✗ Reject (NPV < 0)" },
        { label: "Total Cash Flows", value: fmt0(totalCF) },
        { label: "Profitability Index", value: ((npv + v.initial) / v.initial).toFixed(2) },
      ];
    },
    formula: { expression: "NPV = Σ(CFt / (1+r)^t) − Initial Investment", variables: ["r = discount rate", "t = time period"] },
    howToUse: "Enter the initial investment, discount rate, and expected cash flows for each year.",
    faqs: [{ question: "What discount rate should I use?", answer: "Use your cost of capital or required rate of return. Common rates: 8-15% for business projects." }],
    relatedCalcs: financeRelated("npv-calculator"),
  },
  {
    slug: "mirr-calculator", name: "Modified Internal Rate of Return (MIRR) Calculator", category: "Finance", categorySlug: "finance", subcategory: "Investment Calculators",
    description: "Calculate MIRR which addresses IRR limitations by using separate reinvestment and finance rates.",
    metaDescription: "Free MIRR calculator. Calculate modified internal rate of return with realistic reinvestment assumptions.",
    icon: "dollar",
    inputs: [
      { id: "initial", label: "Initial Investment", type: "number", defaultValue: 100000, prefix: "$" },
      { id: "financeRate", label: "Finance Rate (%)", type: "number", defaultValue: 10, suffix: "%", step: 0.5 },
      { id: "reinvestRate", label: "Reinvestment Rate (%)", type: "number", defaultValue: 12, suffix: "%", step: 0.5 },
      { id: "cf1", label: "Year 1 Cash Flow", type: "number", defaultValue: 30000, prefix: "$" },
      { id: "cf2", label: "Year 2 Cash Flow", type: "number", defaultValue: 35000, prefix: "$" },
      { id: "cf3", label: "Year 3 Cash Flow", type: "number", defaultValue: 40000, prefix: "$" },
      { id: "cf4", label: "Year 4 Cash Flow", type: "number", defaultValue: 30000, prefix: "$" },
    ],
    calculate: (v) => {
      const cfs = [v.cf1, v.cf2, v.cf3, v.cf4];
      const n = cfs.length;
      const rr = v.reinvestRate / 100;
      let fvPositive = 0;
      cfs.forEach((cf, i) => { if (cf > 0) fvPositive += cf * Math.pow(1 + rr, n - 1 - i); });
      const pvNegative = v.initial;
      const mirr = (Math.pow(fvPositive / pvNegative, 1 / n) - 1) * 100;
      return [
        { label: "MIRR", value: pct(mirr), highlight: true },
        { label: "FV of Positive Cash Flows", value: fmt0(fvPositive) },
        { label: "PV of Negative Cash Flows", value: fmt0(pvNegative) },
        { label: "Total Cash Flows", value: fmt0(cfs.reduce((s, c) => s + c, 0)) },
      ];
    },
    formula: { expression: "MIRR = (FV positive / PV negative)^(1/n) − 1", variables: ["FV = future value at reinvestment rate", "PV = present value at finance rate"] },
    howToUse: "Enter initial investment, finance rate, reinvestment rate, and annual cash flows.",
    faqs: [{ question: "Why MIRR over IRR?", answer: "MIRR avoids multiple IRR issues and uses realistic reinvestment rates instead of assuming reinvestment at the IRR." }],
    relatedCalcs: financeRelated("mirr-calculator"),
  },
  {
    slug: "dcf-calculator", name: "Discounted Cash Flow (DCF) Calculator", category: "Finance", categorySlug: "finance", subcategory: "Investment Calculators",
    description: "Value a business or investment using discounted cash flow analysis with terminal value.",
    metaDescription: "Free DCF calculator. Value investments using discounted cash flow analysis with terminal value.",
    icon: "dollar",
    inputs: [
      { id: "cf1", label: "Year 1 Free Cash Flow", type: "number", defaultValue: 50000, prefix: "$" },
      { id: "growthRate", label: "Growth Rate (%)", type: "number", defaultValue: 5, suffix: "%", step: 0.5 },
      { id: "discountRate", label: "Discount Rate (%)", type: "number", defaultValue: 10, suffix: "%", step: 0.5 },
      { id: "terminalGrowth", label: "Terminal Growth Rate (%)", type: "number", defaultValue: 2, suffix: "%", step: 0.5 },
      { id: "years", label: "Projection Period (years)", type: "number", defaultValue: 5 },
    ],
    calculate: (v) => {
      const r = v.discountRate / 100;
      const g = v.growthRate / 100;
      const tg = v.terminalGrowth / 100;
      let pvCFs = 0;
      let lastCF = v.cf1;
      for (let t = 1; t <= v.years; t++) {
        const cf = t === 1 ? v.cf1 : lastCF * (1 + g);
        pvCFs += cf / Math.pow(1 + r, t);
        lastCF = cf;
      }
      const terminalValue = (lastCF * (1 + tg)) / (r - tg);
      const pvTerminal = terminalValue / Math.pow(1 + r, v.years);
      const totalValue = pvCFs + pvTerminal;
      return [
        { label: "Intrinsic Value", value: fmt0(totalValue), highlight: true },
        { label: "PV of Cash Flows", value: fmt0(pvCFs) },
        { label: "PV of Terminal Value", value: fmt0(pvTerminal) },
        { label: "Terminal Value", value: fmt0(terminalValue) },
      ];
    },
    formula: { expression: "Value = Σ(FCF/(1+r)^t) + Terminal/(1+r)^n", variables: ["Terminal = FCF×(1+g)/(r−g)"] },
    howToUse: "Enter the first year's free cash flow, growth rate, discount rate, terminal growth, and projection period.",
    faqs: [{ question: "What is terminal value?", answer: "Terminal value captures the value beyond the projection period, assuming perpetual growth. It often represents 60-80% of total DCF value." }],
    relatedCalcs: financeRelated("dcf-calculator"),
  },
  {
    slug: "capital-gains-calculator", name: "Capital Gains Calculator", category: "Finance", categorySlug: "finance", subcategory: "Investment Calculators",
    description: "Calculate capital gains or losses on investments including stocks, real estate, and other assets.",
    metaDescription: "Free capital gains calculator. Calculate profit or loss on investment sales.",
    icon: "dollar",
    inputs: [
      { id: "purchasePrice", label: "Purchase Price", type: "number", defaultValue: 10000, prefix: "$" },
      { id: "salePrice", label: "Sale Price", type: "number", defaultValue: 15000, prefix: "$" },
      { id: "purchaseFees", label: "Purchase Fees", type: "number", defaultValue: 50, prefix: "$" },
      { id: "saleFees", label: "Sale Fees", type: "number", defaultValue: 50, prefix: "$" },
    ],
    calculate: (v) => {
      const costBasis = v.purchasePrice + v.purchaseFees;
      const netProceeds = v.salePrice - v.saleFees;
      const gain = netProceeds - costBasis;
      const returnPct = (gain / costBasis) * 100;
      return [
        { label: gain >= 0 ? "Capital Gain" : "Capital Loss", value: fmt(Math.abs(gain)), highlight: true },
        { label: "Return %", value: pct(returnPct) },
        { label: "Cost Basis", value: fmt(costBasis) },
        { label: "Net Proceeds", value: fmt(netProceeds) },
      ];
    },
    formula: { expression: "Gain = (Sale − Fees) − (Purchase + Fees)", variables: ["Cost basis includes purchase fees"] },
    howToUse: "Enter purchase price, sale price, and any fees to calculate your capital gain or loss.",
    faqs: [{ question: "What is cost basis?", answer: "Cost basis is the original purchase price plus any fees or commissions. It's used to calculate your taxable gain." }],
    relatedCalcs: financeRelated("capital-gains-calculator"),
  },
  {
    slug: "dividend-yield-calculator", name: "Dividend Yield Calculator", category: "Finance", categorySlug: "finance", subcategory: "Investment Calculators",
    description: "Calculate the dividend yield of a stock based on annual dividends and current share price.",
    metaDescription: "Free dividend yield calculator. Calculate stock dividend yield from annual dividends and share price.",
    icon: "dollar",
    inputs: [
      { id: "annualDividend", label: "Annual Dividend Per Share", type: "number", defaultValue: 3.50, prefix: "$", step: 0.1 },
      { id: "sharePrice", label: "Current Share Price", type: "number", defaultValue: 85, prefix: "$" },
      { id: "shares", label: "Number of Shares", type: "number", defaultValue: 100 },
    ],
    calculate: (v) => {
      const yld = (v.annualDividend / v.sharePrice) * 100;
      const totalAnnual = v.annualDividend * v.shares;
      const quarterly = totalAnnual / 4;
      return [
        { label: "Dividend Yield", value: pct(yld), highlight: true },
        { label: "Annual Income", value: fmt(totalAnnual) },
        { label: "Quarterly Income", value: fmt(quarterly) },
        { label: "Monthly Income", value: fmt(totalAnnual / 12) },
      ];
    },
    formula: { expression: "Yield = (Annual Dividend / Share Price) × 100", variables: ["Higher yield = more income per dollar invested"] },
    howToUse: "Enter the annual dividend per share and current share price to calculate yield.",
    faqs: [{ question: "What is a good dividend yield?", answer: "2-6% is typical. Very high yields (>8%) may signal risk. Consider dividend growth rate too." }],
    relatedCalcs: financeRelated("dividend-yield-calculator"),
  },
  {
    slug: "dividend-growth-calculator", name: "Dividend Growth Calculator", category: "Finance", categorySlug: "finance", subcategory: "Investment Calculators",
    description: "Project future dividend income growth using the dividend growth model.",
    metaDescription: "Free dividend growth calculator. Project future dividend income with compound growth.",
    icon: "dollar",
    inputs: [
      { id: "currentDividend", label: "Current Annual Dividend", type: "number", defaultValue: 2.50, prefix: "$", step: 0.1 },
      { id: "growthRate", label: "Dividend Growth Rate (%)", type: "number", defaultValue: 7, suffix: "%", step: 0.5 },
      { id: "years", label: "Years to Project", type: "number", defaultValue: 10 },
      { id: "shares", label: "Number of Shares", type: "number", defaultValue: 200 },
    ],
    calculate: (v) => {
      const futureDividend = v.currentDividend * Math.pow(1 + v.growthRate / 100, v.years);
      const currentIncome = v.currentDividend * v.shares;
      const futureIncome = futureDividend * v.shares;
      let totalIncome = 0;
      for (let y = 0; y < v.years; y++) totalIncome += v.currentDividend * Math.pow(1 + v.growthRate / 100, y) * v.shares;
      return [
        { label: "Future Dividend/Share", value: fmt(futureDividend), highlight: true },
        { label: "Future Annual Income", value: fmt(futureIncome) },
        { label: "Current Annual Income", value: fmt(currentIncome) },
        { label: "Total Income Over Period", value: fmt0(totalIncome) },
        { label: "Income Growth", value: `${(futureIncome / currentIncome).toFixed(2)}×` },
      ];
    },
    formula: { expression: "Future Dividend = Current × (1 + Growth Rate)^Years", variables: ["Assumes consistent growth rate"] },
    howToUse: "Enter current dividend, expected growth rate, time period, and number of shares.",
    faqs: [{ question: "What is a Dividend Aristocrat?", answer: "Companies that have increased dividends for 25+ consecutive years. They tend to have reliable growth rates." }],
    relatedCalcs: financeRelated("dividend-growth-calculator"),
  },
  {
    slug: "portfolio-return-calculator", name: "Portfolio Return Calculator", category: "Finance", categorySlug: "finance", subcategory: "Investment Calculators",
    description: "Calculate the weighted average return of a multi-asset investment portfolio.",
    metaDescription: "Free portfolio return calculator. Calculate weighted average returns across multiple investments.",
    icon: "dollar",
    inputs: [
      { id: "alloc1", label: "Asset 1 Allocation (%)", type: "number", defaultValue: 60, suffix: "%" },
      { id: "return1", label: "Asset 1 Return (%)", type: "number", defaultValue: 10, suffix: "%", step: 0.5 },
      { id: "alloc2", label: "Asset 2 Allocation (%)", type: "number", defaultValue: 30, suffix: "%" },
      { id: "return2", label: "Asset 2 Return (%)", type: "number", defaultValue: 5, suffix: "%", step: 0.5 },
      { id: "alloc3", label: "Asset 3 Allocation (%)", type: "number", defaultValue: 10, suffix: "%" },
      { id: "return3", label: "Asset 3 Return (%)", type: "number", defaultValue: 3, suffix: "%", step: 0.5 },
    ],
    calculate: (v) => {
      const totalAlloc = v.alloc1 + v.alloc2 + v.alloc3;
      const weightedReturn = (v.alloc1 * v.return1 + v.alloc2 * v.return2 + v.alloc3 * v.return3) / totalAlloc;
      return [
        { label: "Portfolio Return", value: pct(weightedReturn), highlight: true },
        { label: "Total Allocation", value: `${totalAlloc}%` },
        { label: "Asset 1 Contribution", value: pct((v.alloc1 * v.return1) / totalAlloc) },
        { label: "Asset 2 Contribution", value: pct((v.alloc2 * v.return2) / totalAlloc) },
      ];
    },
    formula: { expression: "Portfolio Return = Σ(Weight × Return)", variables: ["Weights should sum to 100%"] },
    howToUse: "Enter allocation percentages and expected returns for each asset class.",
    faqs: [{ question: "What is asset allocation?", answer: "Dividing your portfolio among stocks, bonds, and other assets based on your risk tolerance and goals." }],
    relatedCalcs: financeRelated("portfolio-return-calculator"),
  },
  {
    slug: "portfolio-allocation-calculator", name: "Portfolio Allocation Calculator", category: "Finance", categorySlug: "finance", subcategory: "Investment Calculators",
    description: "Determine optimal portfolio allocation based on your age and risk tolerance using common rules of thumb.",
    metaDescription: "Free portfolio allocation calculator. Find your ideal stock/bond split based on age and risk profile.",
    icon: "dollar",
    inputs: [
      { id: "age", label: "Your Age", type: "number", defaultValue: 35 },
      { id: "totalPortfolio", label: "Total Portfolio Value", type: "number", defaultValue: 100000, prefix: "$" },
      { id: "riskTolerance", label: "Risk Tolerance", type: "select", defaultValue: 2, options: [{ value: 1, label: "Conservative" }, { value: 2, label: "Moderate" }, { value: 3, label: "Aggressive" }] },
    ],
    calculate: (v) => {
      const riskAdjust = v.riskTolerance === 1 ? -10 : v.riskTolerance === 3 ? 10 : 0;
      const stockPct = Math.min(Math.max(110 - v.age + riskAdjust, 20), 90);
      const bondPct = 100 - stockPct;
      return [
        { label: "Stocks Allocation", value: `${stockPct}%`, highlight: true },
        { label: "Bonds Allocation", value: `${bondPct}%` },
        { label: "Stocks Value", value: fmt0(v.totalPortfolio * stockPct / 100) },
        { label: "Bonds Value", value: fmt0(v.totalPortfolio * bondPct / 100) },
      ];
    },
    formula: { expression: "Stock % = 110 − Age ± Risk Adjustment", variables: ["Conservative: −10%", "Aggressive: +10%"] },
    howToUse: "Enter your age, portfolio value, and risk tolerance to get a suggested allocation.",
    faqs: [{ question: "Is 110 minus age a good rule?", answer: "It's a starting point. Your actual allocation should consider income needs, time horizon, and personal risk comfort." }],
    relatedCalcs: financeRelated("portfolio-allocation-calculator"),
  },
  {
    slug: "cagr-calculator", name: "CAGR (Compound Annual Growth Rate) Calculator", category: "Finance", categorySlug: "finance", subcategory: "Investment Calculators",
    description: "Calculate the compound annual growth rate of an investment over a specific time period.",
    metaDescription: "Free CAGR calculator. Calculate compound annual growth rate for any investment.",
    icon: "dollar",
    inputs: [
      { id: "beginValue", label: "Beginning Value", type: "number", defaultValue: 10000, prefix: "$" },
      { id: "endValue", label: "Ending Value", type: "number", defaultValue: 25000, prefix: "$" },
      { id: "years", label: "Number of Years", type: "number", defaultValue: 5 },
    ],
    calculate: (v) => {
      if (v.beginValue <= 0 || v.years <= 0) return [{ label: "Error", value: "Values must be positive" }];
      const cagr = (Math.pow(v.endValue / v.beginValue, 1 / v.years) - 1) * 100;
      const totalReturn = ((v.endValue - v.beginValue) / v.beginValue) * 100;
      return [
        { label: "CAGR", value: pct(cagr), highlight: true },
        { label: "Total Return", value: pct(totalReturn) },
        { label: "Absolute Gain", value: fmt0(v.endValue - v.beginValue) },
        { label: "Growth Multiple", value: `${(v.endValue / v.beginValue).toFixed(2)}×` },
      ];
    },
    formula: { expression: "CAGR = (End/Begin)^(1/Years) − 1", variables: ["Smooths out year-to-year volatility"] },
    howToUse: "Enter beginning value, ending value, and number of years.",
    faqs: [{ question: "Why use CAGR?", answer: "CAGR gives a smoothed annual rate that accounts for compounding, more useful than simple average returns." }],
    relatedCalcs: financeRelated("cagr-calculator"),
  },
  {
    slug: "dollar-cost-averaging-calculator", name: "Dollar Cost Averaging Calculator", category: "Finance", categorySlug: "finance", subcategory: "Investment Calculators",
    description: "See how dollar cost averaging works by investing a fixed amount regularly regardless of market price.",
    metaDescription: "Free dollar cost averaging calculator. Compare DCA vs lump sum investment strategies.",
    icon: "dollar",
    inputs: [
      { id: "monthlyInvestment", label: "Monthly Investment", type: "number", defaultValue: 500, prefix: "$" },
      { id: "months", label: "Investment Period (months)", type: "number", defaultValue: 24 },
      { id: "annualReturn", label: "Expected Annual Return (%)", type: "number", defaultValue: 8, suffix: "%", step: 0.5 },
    ],
    calculate: (v) => {
      const r = v.annualReturn / 100 / 12;
      const n = v.months;
      const fv = v.monthlyInvestment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      const totalInvested = v.monthlyInvestment * n;
      const lumpSum = totalInvested * Math.pow(1 + v.annualReturn / 100, n / 12);
      return [
        { label: "DCA Final Value", value: fmt0(fv), highlight: true },
        { label: "Total Invested", value: fmt0(totalInvested) },
        { label: "DCA Gain", value: fmt0(fv - totalInvested) },
        { label: "Lump Sum Value", value: fmt0(lumpSum) },
      ];
    },
    formula: { expression: "FV = PMT × [(1+r)^n − 1] / r × (1+r)", variables: ["PMT = monthly investment", "r = monthly return"] },
    howToUse: "Enter monthly investment amount, period, and expected return to compare DCA vs lump sum.",
    faqs: [{ question: "Is DCA better than lump sum?", answer: "Historically, lump sum outperforms ~2/3 of the time. DCA reduces risk of bad timing and is easier psychologically." }],
    relatedCalcs: financeRelated("dollar-cost-averaging-calculator"),
  },
  {
    slug: "drip-calculator", name: "Dividend Reinvestment Calculator (DRIP)", category: "Finance", categorySlug: "finance", subcategory: "Investment Calculators",
    description: "Calculate the power of reinvesting dividends to buy more shares over time.",
    metaDescription: "Free DRIP calculator. See how dividend reinvestment compounds your investment growth.",
    icon: "dollar",
    inputs: [
      { id: "shares", label: "Initial Shares", type: "number", defaultValue: 100 },
      { id: "sharePrice", label: "Share Price", type: "number", defaultValue: 50, prefix: "$" },
      { id: "dividendYield", label: "Dividend Yield (%)", type: "number", defaultValue: 4, suffix: "%", step: 0.1 },
      { id: "priceGrowth", label: "Annual Price Growth (%)", type: "number", defaultValue: 5, suffix: "%", step: 0.5 },
      { id: "years", label: "Years", type: "number", defaultValue: 20 },
    ],
    calculate: (v) => {
      let shares = v.shares;
      let price = v.sharePrice;
      let totalDividends = 0;
      for (let y = 0; y < v.years; y++) {
        const dividend = shares * price * (v.dividendYield / 100);
        totalDividends += dividend;
        shares += dividend / price;
        price *= 1 + v.priceGrowth / 100;
      }
      const finalValue = shares * price;
      const withoutDrip = v.shares * v.sharePrice * Math.pow(1 + v.priceGrowth / 100, v.years);
      return [
        { label: "Final Value (DRIP)", value: fmt0(finalValue), highlight: true },
        { label: "Final Shares", value: Math.floor(shares).toLocaleString() },
        { label: "Without DRIP", value: fmt0(withoutDrip) },
        { label: "DRIP Benefit", value: fmt0(finalValue - withoutDrip) },
        { label: "Total Dividends Reinvested", value: fmt0(totalDividends) },
      ];
    },
    formula: { expression: "New Shares = Dividend / Price; repeat annually", variables: ["Compounding effect grows exponentially"] },
    howToUse: "Enter initial shares, price, yield, growth rate, and time period.",
    faqs: [{ question: "Why DRIP?", answer: "Reinvesting dividends buys more shares, which generate more dividends — creating a compounding snowball effect." }],
    relatedCalcs: financeRelated("drip-calculator"),
  },
  {
    slug: "etf-expense-ratio-calculator", name: "ETF Expense Ratio Calculator", category: "Finance", categorySlug: "finance", subcategory: "Investment Calculators",
    description: "Calculate how much ETF expense ratios cost you over time and compare different funds.",
    metaDescription: "Free ETF expense ratio calculator. See the true cost of fund fees on your investment returns.",
    icon: "dollar",
    inputs: [
      { id: "investment", label: "Investment Amount", type: "number", defaultValue: 50000, prefix: "$" },
      { id: "expenseRatio1", label: "Fund 1 Expense Ratio (%)", type: "number", defaultValue: 0.03, suffix: "%", step: 0.01 },
      { id: "expenseRatio2", label: "Fund 2 Expense Ratio (%)", type: "number", defaultValue: 0.75, suffix: "%", step: 0.01 },
      { id: "returnRate", label: "Expected Return (%)", type: "number", defaultValue: 8, suffix: "%", step: 0.5 },
      { id: "years", label: "Years", type: "number", defaultValue: 30 },
    ],
    calculate: (v) => {
      const fv1 = v.investment * Math.pow(1 + (v.returnRate - v.expenseRatio1) / 100, v.years);
      const fv2 = v.investment * Math.pow(1 + (v.returnRate - v.expenseRatio2) / 100, v.years);
      const fvNoFee = v.investment * Math.pow(1 + v.returnRate / 100, v.years);
      return [
        { label: "Fund 1 Final Value", value: fmt0(fv1), highlight: true },
        { label: "Fund 2 Final Value", value: fmt0(fv2) },
        { label: "Difference (Savings)", value: fmt0(fv1 - fv2) },
        { label: "Fund 1 Fee Cost", value: fmt0(fvNoFee - fv1) },
        { label: "Fund 2 Fee Cost", value: fmt0(fvNoFee - fv2) },
      ];
    },
    formula: { expression: "FV = Investment × (1 + Return − Expense)^Years", variables: ["Even 0.5% difference compounds significantly"] },
    howToUse: "Compare two funds by entering their expense ratios along with your investment details.",
    faqs: [{ question: "Do expense ratios matter?", answer: "Yes! A 0.5% difference on $50K over 30 years can cost $50,000+. Low-cost index funds often outperform." }],
    relatedCalcs: financeRelated("etf-expense-ratio-calculator"),
  },
  {
    slug: "stock-average-price-calculator", name: "Stock Average Price Calculator", category: "Finance", categorySlug: "finance", subcategory: "Investment Calculators",
    description: "Calculate your average cost basis when buying shares at different prices over time.",
    metaDescription: "Free stock average price calculator. Find your average cost per share across multiple purchases.",
    icon: "dollar",
    inputs: [
      { id: "shares1", label: "Purchase 1 Shares", type: "number", defaultValue: 50 },
      { id: "price1", label: "Purchase 1 Price", type: "number", defaultValue: 100, prefix: "$" },
      { id: "shares2", label: "Purchase 2 Shares", type: "number", defaultValue: 30 },
      { id: "price2", label: "Purchase 2 Price", type: "number", defaultValue: 85, prefix: "$" },
      { id: "shares3", label: "Purchase 3 Shares", type: "number", defaultValue: 40 },
      { id: "price3", label: "Purchase 3 Price", type: "number", defaultValue: 110, prefix: "$" },
    ],
    calculate: (v) => {
      const totalShares = v.shares1 + v.shares2 + v.shares3;
      const totalCost = v.shares1 * v.price1 + v.shares2 * v.price2 + v.shares3 * v.price3;
      const avgPrice = totalCost / totalShares;
      return [
        { label: "Average Price/Share", value: fmt(avgPrice), highlight: true },
        { label: "Total Shares", value: totalShares.toLocaleString() },
        { label: "Total Cost", value: fmt0(totalCost) },
      ];
    },
    formula: { expression: "Avg Price = Total Cost / Total Shares", variables: ["Weighted by number of shares at each price"] },
    howToUse: "Enter the number of shares and price for each purchase to find your average cost basis.",
    faqs: [{ question: "Why track average price?", answer: "Your average cost basis determines your profit/loss and tax liability when you sell." }],
    relatedCalcs: financeRelated("stock-average-price-calculator"),
  },
  {
    slug: "stock-profit-calculator", name: "Stock Profit Calculator", category: "Finance", categorySlug: "finance", subcategory: "Investment Calculators",
    description: "Calculate your profit or loss from buying and selling stocks including commissions.",
    metaDescription: "Free stock profit calculator. Calculate gains/losses from stock trades with commissions.",
    icon: "dollar",
    inputs: [
      { id: "buyPrice", label: "Buy Price Per Share", type: "number", defaultValue: 50, prefix: "$" },
      { id: "sellPrice", label: "Sell Price Per Share", type: "number", defaultValue: 72, prefix: "$" },
      { id: "shares", label: "Number of Shares", type: "number", defaultValue: 100 },
      { id: "buyCommission", label: "Buy Commission", type: "number", defaultValue: 0, prefix: "$" },
      { id: "sellCommission", label: "Sell Commission", type: "number", defaultValue: 0, prefix: "$" },
    ],
    calculate: (v) => {
      const totalBuy = v.buyPrice * v.shares + v.buyCommission;
      const totalSell = v.sellPrice * v.shares - v.sellCommission;
      const profit = totalSell - totalBuy;
      const returnPct = (profit / totalBuy) * 100;
      return [
        { label: profit >= 0 ? "Profit" : "Loss", value: fmt(Math.abs(profit)), highlight: true },
        { label: "Return %", value: pct(returnPct) },
        { label: "Total Buy Cost", value: fmt(totalBuy) },
        { label: "Net Sale Proceeds", value: fmt(totalSell) },
      ];
    },
    formula: { expression: "Profit = (Sell × Shares − Commission) − (Buy × Shares + Commission)", variables: [] },
    howToUse: "Enter buy price, sell price, shares, and any commissions to calculate profit.",
    faqs: [{ question: "Are stock profits taxed?", answer: "Yes. Short-term gains (<1 year) are taxed as ordinary income. Long-term gains (>1 year) get preferential rates of 0%, 15%, or 20%." }],
    relatedCalcs: financeRelated("stock-profit-calculator"),
  },
  {
    slug: "risk-vs-return-calculator", name: "Risk vs Return Calculator", category: "Finance", categorySlug: "finance", subcategory: "Investment Calculators",
    description: "Compare the risk-adjusted returns of investments using the Sharpe Ratio.",
    metaDescription: "Free risk vs return calculator. Compare investments using the Sharpe Ratio for risk-adjusted performance.",
    icon: "dollar",
    inputs: [
      { id: "portfolioReturn", label: "Portfolio Return (%)", type: "number", defaultValue: 12, suffix: "%", step: 0.5 },
      { id: "riskFreeRate", label: "Risk-Free Rate (%)", type: "number", defaultValue: 4.5, suffix: "%", step: 0.1 },
      { id: "stdDev", label: "Portfolio Std Deviation (%)", type: "number", defaultValue: 15, suffix: "%", step: 0.5 },
    ],
    calculate: (v) => {
      const sharpe = (v.portfolioReturn - v.riskFreeRate) / v.stdDev;
      const excessReturn = v.portfolioReturn - v.riskFreeRate;
      return [
        { label: "Sharpe Ratio", value: sharpe.toFixed(2), highlight: true },
        { label: "Rating", value: sharpe > 1 ? "Excellent" : sharpe > 0.5 ? "Good" : sharpe > 0 ? "Acceptable" : "Poor" },
        { label: "Excess Return", value: pct(excessReturn) },
        { label: "Risk (Std Dev)", value: pct(v.stdDev) },
      ];
    },
    formula: { expression: "Sharpe = (Return − Risk-Free) / Std Deviation", variables: [">1 = Good", ">2 = Excellent"] },
    howToUse: "Enter portfolio return, risk-free rate, and standard deviation to calculate the Sharpe Ratio.",
    faqs: [{ question: "What is the Sharpe Ratio?", answer: "It measures excess return per unit of risk. Higher is better — it means more return for each unit of volatility." }],
    relatedCalcs: financeRelated("risk-vs-return-calculator"),
  },

  // ═══════════════════════════════════════════
  // BUSINESS CALCULATORS
  // ═══════════════════════════════════════════
  {
    slug: "gross-profit-calculator", name: "Gross Profit Calculator", category: "Finance", categorySlug: "finance", subcategory: "Business Calculators",
    description: "Calculate gross profit and gross profit margin from revenue and cost of goods sold.",
    metaDescription: "Free gross profit calculator. Calculate gross profit and margin from revenue and COGS.",
    icon: "dollar",
    inputs: [
      { id: "revenue", label: "Total Revenue", type: "number", defaultValue: 500000, prefix: "$" },
      { id: "cogs", label: "Cost of Goods Sold", type: "number", defaultValue: 300000, prefix: "$" },
    ],
    calculate: (v) => {
      const gp = v.revenue - v.cogs;
      const margin = (gp / v.revenue) * 100;
      return [
        { label: "Gross Profit", value: fmt0(gp), highlight: true },
        { label: "Gross Margin", value: pct(margin) },
        { label: "COGS Ratio", value: pct((v.cogs / v.revenue) * 100) },
      ];
    },
    formula: { expression: "Gross Profit = Revenue − COGS", variables: ["Gross Margin = GP / Revenue × 100"] },
    howToUse: "Enter total revenue and cost of goods sold.",
    faqs: [{ question: "What is a good gross margin?", answer: "Varies by industry: Software 70-90%, Retail 25-50%, Manufacturing 25-35%." }],
    relatedCalcs: financeRelated("gross-profit-calculator"),
  },
  {
    slug: "net-profit-calculator", name: "Net Profit Calculator", category: "Finance", categorySlug: "finance", subcategory: "Business Calculators",
    description: "Calculate net profit after all expenses including operating costs, taxes, and interest.",
    metaDescription: "Free net profit calculator. Find your bottom-line profit after all business expenses.",
    icon: "dollar",
    inputs: [
      { id: "revenue", label: "Total Revenue", type: "number", defaultValue: 500000, prefix: "$" },
      { id: "cogs", label: "Cost of Goods Sold", type: "number", defaultValue: 200000, prefix: "$" },
      { id: "opExpenses", label: "Operating Expenses", type: "number", defaultValue: 150000, prefix: "$" },
      { id: "interest", label: "Interest Expense", type: "number", defaultValue: 10000, prefix: "$" },
      { id: "taxes", label: "Taxes", type: "number", defaultValue: 30000, prefix: "$" },
    ],
    calculate: (v) => {
      const gp = v.revenue - v.cogs;
      const opIncome = gp - v.opExpenses;
      const netProfit = opIncome - v.interest - v.taxes;
      return [
        { label: "Net Profit", value: fmt0(netProfit), highlight: true },
        { label: "Net Margin", value: pct((netProfit / v.revenue) * 100) },
        { label: "Gross Profit", value: fmt0(gp) },
        { label: "Operating Income", value: fmt0(opIncome) },
      ];
    },
    formula: { expression: "Net Profit = Revenue − COGS − OpEx − Interest − Taxes", variables: [] },
    howToUse: "Enter revenue, COGS, operating expenses, interest, and taxes.",
    faqs: [{ question: "Net vs gross profit?", answer: "Gross profit only subtracts direct costs. Net profit subtracts all expenses including overhead, interest, and taxes." }],
    relatedCalcs: financeRelated("net-profit-calculator"),
  },
  {
    slug: "operating-margin-calculator", name: "Operating Margin Calculator", category: "Finance", categorySlug: "finance", subcategory: "Business Calculators",
    description: "Calculate operating margin to measure operational efficiency before interest and taxes.",
    metaDescription: "Free operating margin calculator. Measure business operational efficiency from revenue and expenses.",
    icon: "dollar",
    inputs: [
      { id: "revenue", label: "Revenue", type: "number", defaultValue: 1000000, prefix: "$" },
      { id: "cogs", label: "COGS", type: "number", defaultValue: 400000, prefix: "$" },
      { id: "opExpenses", label: "Operating Expenses", type: "number", defaultValue: 350000, prefix: "$" },
    ],
    calculate: (v) => {
      const opIncome = v.revenue - v.cogs - v.opExpenses;
      const opMargin = (opIncome / v.revenue) * 100;
      return [
        { label: "Operating Income", value: fmt0(opIncome), highlight: true },
        { label: "Operating Margin", value: pct(opMargin) },
        { label: "Total Costs", value: fmt0(v.cogs + v.opExpenses) },
      ];
    },
    formula: { expression: "Operating Margin = (Revenue − COGS − OpEx) / Revenue × 100", variables: [] },
    howToUse: "Enter revenue, cost of goods sold, and operating expenses.",
    faqs: [{ question: "Why operating margin?", answer: "It shows core business profitability before financing and tax decisions affect the bottom line." }],
    relatedCalcs: financeRelated("operating-margin-calculator"),
  },
  {
    slug: "ebitda-calculator", name: "EBITDA Calculator", category: "Finance", categorySlug: "finance", subcategory: "Business Calculators",
    description: "Calculate EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization) for business valuation.",
    metaDescription: "Free EBITDA calculator. Calculate earnings before interest, taxes, depreciation, and amortization.",
    icon: "dollar",
    inputs: [
      { id: "netIncome", label: "Net Income", type: "number", defaultValue: 200000, prefix: "$" },
      { id: "interest", label: "Interest Expense", type: "number", defaultValue: 30000, prefix: "$" },
      { id: "taxes", label: "Income Taxes", type: "number", defaultValue: 50000, prefix: "$" },
      { id: "depreciation", label: "Depreciation", type: "number", defaultValue: 40000, prefix: "$" },
      { id: "amortization", label: "Amortization", type: "number", defaultValue: 10000, prefix: "$" },
    ],
    calculate: (v) => {
      const ebitda = v.netIncome + v.interest + v.taxes + v.depreciation + v.amortization;
      const ebit = ebitda - v.depreciation - v.amortization;
      return [
        { label: "EBITDA", value: fmt0(ebitda), highlight: true },
        { label: "EBIT", value: fmt0(ebit) },
        { label: "D&A", value: fmt0(v.depreciation + v.amortization) },
        { label: "EBITDA Multiple (at 5×)", value: fmt0(ebitda * 5) },
      ];
    },
    formula: { expression: "EBITDA = Net Income + Interest + Taxes + D&A", variables: ["Common valuation metric"] },
    howToUse: "Enter net income, interest, taxes, depreciation, and amortization.",
    faqs: [{ question: "Why is EBITDA used?", answer: "It approximates cash flow from operations and is widely used for business valuation and comparing companies across industries." }],
    relatedCalcs: financeRelated("ebitda-calculator"),
  },
  {
    slug: "roa-calculator", name: "Return on Assets (ROA) Calculator", category: "Finance", categorySlug: "finance", subcategory: "Business Calculators",
    description: "Calculate ROA to measure how efficiently a company uses its assets to generate profit.",
    metaDescription: "Free ROA calculator. Measure business efficiency by comparing net income to total assets.",
    icon: "dollar",
    inputs: [
      { id: "netIncome", label: "Net Income", type: "number", defaultValue: 150000, prefix: "$" },
      { id: "totalAssets", label: "Total Assets", type: "number", defaultValue: 1500000, prefix: "$" },
    ],
    calculate: (v) => {
      const roa = (v.netIncome / v.totalAssets) * 100;
      return [
        { label: "ROA", value: pct(roa), highlight: true },
        { label: "Net Income", value: fmt0(v.netIncome) },
        { label: "Total Assets", value: fmt0(v.totalAssets) },
        { label: "Asset Turnover", value: `${(v.netIncome / v.totalAssets).toFixed(3)}` },
      ];
    },
    formula: { expression: "ROA = Net Income / Total Assets × 100", variables: ["Higher ROA = more efficient asset use"] },
    howToUse: "Enter net income and total assets.",
    faqs: [{ question: "What is a good ROA?", answer: "5%+ is generally good. It varies by industry: capital-heavy industries have lower ROA, tech/services higher." }],
    relatedCalcs: financeRelated("roa-calculator"),
  },
  {
    slug: "roe-calculator", name: "Return on Equity (ROE) Calculator", category: "Finance", categorySlug: "finance", subcategory: "Business Calculators",
    description: "Calculate ROE to measure how well a company generates returns for shareholders.",
    metaDescription: "Free ROE calculator. Measure shareholder returns by comparing net income to equity.",
    icon: "dollar",
    inputs: [
      { id: "netIncome", label: "Net Income", type: "number", defaultValue: 200000, prefix: "$" },
      { id: "shareholderEquity", label: "Shareholder Equity", type: "number", defaultValue: 1000000, prefix: "$" },
    ],
    calculate: (v) => {
      const roe = (v.netIncome / v.shareholderEquity) * 100;
      return [
        { label: "ROE", value: pct(roe), highlight: true },
        { label: "Net Income", value: fmt0(v.netIncome) },
        { label: "Shareholder Equity", value: fmt0(v.shareholderEquity) },
      ];
    },
    formula: { expression: "ROE = Net Income / Shareholder Equity × 100", variables: ["15-20% is considered strong"] },
    howToUse: "Enter net income and total shareholder equity.",
    faqs: [{ question: "ROE vs ROA?", answer: "ROE measures returns on owner's equity, ROA on total assets. High debt can inflate ROE while ROA stays low." }],
    relatedCalcs: financeRelated("roe-calculator"),
  },
  {
    slug: "cogs-calculator", name: "Cost of Goods Sold Calculator", category: "Finance", categorySlug: "finance", subcategory: "Business Calculators",
    description: "Calculate the cost of goods sold using beginning inventory, purchases, and ending inventory.",
    metaDescription: "Free COGS calculator. Calculate cost of goods sold for profit and tax reporting.",
    icon: "dollar",
    inputs: [
      { id: "beginInventory", label: "Beginning Inventory", type: "number", defaultValue: 50000, prefix: "$" },
      { id: "purchases", label: "Purchases During Period", type: "number", defaultValue: 200000, prefix: "$" },
      { id: "endInventory", label: "Ending Inventory", type: "number", defaultValue: 40000, prefix: "$" },
    ],
    calculate: (v) => {
      const cogs = v.beginInventory + v.purchases - v.endInventory;
      return [
        { label: "COGS", value: fmt0(cogs), highlight: true },
        { label: "Available for Sale", value: fmt0(v.beginInventory + v.purchases) },
        { label: "Inventory Change", value: fmt0(v.endInventory - v.beginInventory) },
      ];
    },
    formula: { expression: "COGS = Beginning Inventory + Purchases − Ending Inventory", variables: [] },
    howToUse: "Enter beginning inventory, purchases made, and ending inventory.",
    faqs: [{ question: "Why is COGS important?", answer: "COGS directly affects gross profit and is a key tax deduction for businesses selling physical products." }],
    relatedCalcs: financeRelated("cogs-calculator"),
  },
  {
    slug: "inventory-turnover-calculator", name: "Inventory Turnover Calculator", category: "Finance", categorySlug: "finance", subcategory: "Business Calculators",
    description: "Calculate how many times inventory is sold and replaced in a given period.",
    metaDescription: "Free inventory turnover calculator. Measure how efficiently inventory is managed.",
    icon: "dollar",
    inputs: [
      { id: "cogs", label: "Cost of Goods Sold", type: "number", defaultValue: 500000, prefix: "$" },
      { id: "avgInventory", label: "Average Inventory", type: "number", defaultValue: 100000, prefix: "$" },
    ],
    calculate: (v) => {
      const turnover = v.cogs / v.avgInventory;
      const daysToSell = 365 / turnover;
      return [
        { label: "Inventory Turnover", value: `${turnover.toFixed(1)}×`, highlight: true },
        { label: "Days to Sell Inventory", value: `${Math.round(daysToSell)} days` },
        { label: "Monthly Turnover", value: `${(turnover / 12).toFixed(2)}×` },
      ];
    },
    formula: { expression: "Turnover = COGS / Average Inventory", variables: ["Higher turnover = faster selling"] },
    howToUse: "Enter COGS and average inventory value.",
    faqs: [{ question: "What is good inventory turnover?", answer: "Varies by industry: grocery 14-20×, retail 4-6×, auto 6-8×. Higher means efficient management." }],
    relatedCalcs: financeRelated("inventory-turnover-calculator"),
  },
  {
    slug: "working-capital-calculator", name: "Working Capital Calculator", category: "Finance", categorySlug: "finance", subcategory: "Business Calculators",
    description: "Calculate working capital and the current ratio to assess short-term financial health.",
    metaDescription: "Free working capital calculator. Assess business liquidity with current ratio analysis.",
    icon: "dollar",
    inputs: [
      { id: "currentAssets", label: "Current Assets", type: "number", defaultValue: 500000, prefix: "$" },
      { id: "currentLiabilities", label: "Current Liabilities", type: "number", defaultValue: 300000, prefix: "$" },
    ],
    calculate: (v) => {
      const wc = v.currentAssets - v.currentLiabilities;
      const ratio = v.currentAssets / v.currentLiabilities;
      return [
        { label: "Working Capital", value: fmt0(wc), highlight: true },
        { label: "Current Ratio", value: ratio.toFixed(2) },
        { label: "Status", value: ratio >= 1.5 ? "Healthy" : ratio >= 1 ? "Adequate" : "Concerning" },
      ];
    },
    formula: { expression: "Working Capital = Current Assets − Current Liabilities", variables: ["Current Ratio = Assets / Liabilities"] },
    howToUse: "Enter current assets and current liabilities.",
    faqs: [{ question: "What current ratio is ideal?", answer: "1.5-2.0 is generally healthy. Below 1.0 means liabilities exceed assets, signaling potential cash flow issues." }],
    relatedCalcs: financeRelated("working-capital-calculator"),
  },
  {
    slug: "cost-per-unit-calculator", name: "Cost per Unit Calculator", category: "Finance", categorySlug: "finance", subcategory: "Business Calculators",
    description: "Calculate the total cost per unit including fixed and variable costs.",
    metaDescription: "Free cost per unit calculator. Find total production cost per unit for pricing decisions.",
    icon: "dollar",
    inputs: [
      { id: "fixedCosts", label: "Total Fixed Costs", type: "number", defaultValue: 50000, prefix: "$" },
      { id: "variableCost", label: "Variable Cost Per Unit", type: "number", defaultValue: 15, prefix: "$" },
      { id: "units", label: "Units Produced", type: "number", defaultValue: 5000 },
    ],
    calculate: (v) => {
      const fixedPerUnit = v.fixedCosts / v.units;
      const totalPerUnit = fixedPerUnit + v.variableCost;
      const totalCost = totalPerUnit * v.units;
      return [
        { label: "Cost Per Unit", value: fmt(totalPerUnit), highlight: true },
        { label: "Fixed Cost/Unit", value: fmt(fixedPerUnit) },
        { label: "Variable Cost/Unit", value: fmt(v.variableCost) },
        { label: "Total Production Cost", value: fmt0(totalCost) },
      ];
    },
    formula: { expression: "CPU = (Fixed Costs / Units) + Variable Cost", variables: [] },
    howToUse: "Enter fixed costs, variable cost per unit, and number of units produced.",
    faqs: [{ question: "How does volume affect cost?", answer: "Higher volume spreads fixed costs over more units, reducing cost per unit (economies of scale)." }],
    relatedCalcs: financeRelated("cost-per-unit-calculator"),
  },
  {
    slug: "contribution-margin-calculator", name: "Contribution Margin Calculator", category: "Finance", categorySlug: "finance", subcategory: "Business Calculators",
    description: "Calculate the contribution margin per unit and ratio to understand product profitability.",
    metaDescription: "Free contribution margin calculator. Analyze product profitability and break-even pricing.",
    icon: "dollar",
    inputs: [
      { id: "price", label: "Selling Price Per Unit", type: "number", defaultValue: 50, prefix: "$" },
      { id: "variableCost", label: "Variable Cost Per Unit", type: "number", defaultValue: 20, prefix: "$" },
      { id: "units", label: "Units Sold", type: "number", defaultValue: 1000 },
    ],
    calculate: (v) => {
      const cm = v.price - v.variableCost;
      const cmRatio = (cm / v.price) * 100;
      const totalCM = cm * v.units;
      return [
        { label: "Contribution Margin/Unit", value: fmt(cm), highlight: true },
        { label: "CM Ratio", value: pct(cmRatio) },
        { label: "Total Contribution Margin", value: fmt0(totalCM) },
      ];
    },
    formula: { expression: "CM = Selling Price − Variable Cost", variables: ["CM Ratio = CM / Price × 100"] },
    howToUse: "Enter selling price and variable cost per unit.",
    faqs: [{ question: "What is contribution margin?", answer: "The amount each unit contributes toward covering fixed costs and generating profit after variable costs." }],
    relatedCalcs: financeRelated("contribution-margin-calculator"),
  },
  {
    slug: "business-valuation-calculator", name: "Business Valuation Calculator", category: "Finance", categorySlug: "finance", subcategory: "Business Calculators",
    description: "Estimate business value using multiple valuation methods including earnings and revenue multiples.",
    metaDescription: "Free business valuation calculator. Estimate company worth using earnings and revenue multiples.",
    icon: "dollar",
    inputs: [
      { id: "annualRevenue", label: "Annual Revenue", type: "number", defaultValue: 1000000, prefix: "$" },
      { id: "netProfit", label: "Annual Net Profit", type: "number", defaultValue: 200000, prefix: "$" },
      { id: "ebitda", label: "Annual EBITDA", type: "number", defaultValue: 250000, prefix: "$" },
      { id: "industryMultiple", label: "Industry Multiple", type: "number", defaultValue: 5, step: 0.5 },
    ],
    calculate: (v) => {
      const earningsVal = v.netProfit * v.industryMultiple;
      const ebitdaVal = v.ebitda * v.industryMultiple;
      const revenueVal = v.annualRevenue * (v.industryMultiple / 3);
      return [
        { label: "EBITDA Valuation", value: fmt0(ebitdaVal), highlight: true },
        { label: "Earnings Valuation", value: fmt0(earningsVal) },
        { label: "Revenue Valuation", value: fmt0(revenueVal) },
        { label: "Average Estimate", value: fmt0((earningsVal + ebitdaVal + revenueVal) / 3) },
      ];
    },
    formula: { expression: "Value = Metric × Industry Multiple", variables: ["Common multiples: 3-10× EBITDA"] },
    howToUse: "Enter revenue, profit, EBITDA, and an appropriate industry multiple.",
    faqs: [{ question: "What multiple should I use?", answer: "Depends on industry, growth, and risk. Tech: 10-20×, Services: 3-8×, Retail: 3-5×, Manufacturing: 4-6×." }],
    relatedCalcs: financeRelated("business-valuation-calculator"),
  },

  // ═══════════════════════════════════════════
  // LOAN CALCULATORS (New)
  // ═══════════════════════════════════════════
  {
    slug: "loan-comparison-calculator", name: "Loan Comparison Calculator", category: "Finance", categorySlug: "finance", subcategory: "Loan Calculators",
    description: "Compare two loan offers side by side to find the better deal.",
    metaDescription: "Free loan comparison calculator. Compare two loan offers to find the best terms.",
    icon: "dollar",
    inputs: [
      { id: "amount", label: "Loan Amount", type: "number", defaultValue: 200000, prefix: "$" },
      { id: "rate1", label: "Loan 1 Rate (%)", type: "number", defaultValue: 6.5, suffix: "%", step: 0.1 },
      { id: "term1", label: "Loan 1 Term (years)", type: "number", defaultValue: 30 },
      { id: "rate2", label: "Loan 2 Rate (%)", type: "number", defaultValue: 5.75, suffix: "%", step: 0.1 },
      { id: "term2", label: "Loan 2 Term (years)", type: "number", defaultValue: 15 },
    ],
    calculate: (v) => {
      const l1 = loanCalc(v.amount, v.rate1, v.term1 * 12);
      const l2 = loanCalc(v.amount, v.rate2, v.term2 * 12);
      return [
        { label: "Loan 1 Monthly", value: fmt(l1.monthly) },
        { label: "Loan 2 Monthly", value: fmt(l2.monthly) },
        { label: "Loan 1 Total Interest", value: fmt0(l1.totalInterest) },
        { label: "Loan 2 Total Interest", value: fmt0(l2.totalInterest) },
        { label: "Interest Savings", value: fmt0(Math.abs(l1.totalInterest - l2.totalInterest)), highlight: true },
        { label: "Better Deal", value: l1.totalPayment < l2.totalPayment ? "Loan 1" : "Loan 2" },
      ];
    },
    formula: { expression: "Compare total cost = monthly payment × term", variables: [] },
    howToUse: "Enter loan amount and terms for two loans to compare.",
    faqs: [{ question: "Lower rate or shorter term?", answer: "Shorter terms cost less total interest but have higher monthly payments. Choose based on your cash flow." }],
    relatedCalcs: financeRelated("loan-comparison-calculator"),
  },
  {
    slug: "loan-eligibility-calculator", name: "Loan Eligibility Calculator", category: "Finance", categorySlug: "finance", subcategory: "Loan Calculators",
    description: "Estimate how much loan you can qualify for based on income and existing debts.",
    metaDescription: "Free loan eligibility calculator. Find your maximum loan amount based on income and debts.",
    icon: "dollar",
    inputs: [
      { id: "monthlyIncome", label: "Monthly Gross Income", type: "number", defaultValue: 7000, prefix: "$" },
      { id: "monthlyDebts", label: "Monthly Debt Payments", type: "number", defaultValue: 500, prefix: "$" },
      { id: "rate", label: "Interest Rate (%)", type: "number", defaultValue: 7, suffix: "%", step: 0.1 },
      { id: "term", label: "Loan Term (years)", type: "number", defaultValue: 30 },
      { id: "dtiLimit", label: "Max DTI (%)", type: "number", defaultValue: 43, suffix: "%" },
    ],
    calculate: (v) => {
      const maxPayment = v.monthlyIncome * (v.dtiLimit / 100) - v.monthlyDebts;
      const mr = v.rate / 100 / 12;
      const n = v.term * 12;
      const maxLoan = maxPayment > 0 ? maxPayment * ((Math.pow(1 + mr, n) - 1) / (mr * Math.pow(1 + mr, n))) : 0;
      const currentDTI = (v.monthlyDebts / v.monthlyIncome) * 100;
      return [
        { label: "Max Loan Amount", value: fmt0(maxLoan), highlight: true },
        { label: "Max Monthly Payment", value: fmt(maxPayment) },
        { label: "Current DTI", value: pct(currentDTI) },
        { label: "Remaining DTI Capacity", value: pct(v.dtiLimit - currentDTI) },
      ];
    },
    formula: { expression: "Max Payment = Income × DTI% − Existing Debts", variables: ["Max Loan derived from max payment"] },
    howToUse: "Enter monthly income, existing debts, rate, term, and maximum DTI ratio.",
    faqs: [{ question: "What DTI do lenders want?", answer: "Conventional: 43-50%, FHA: up to 57%, VA: no strict limit but 41% guideline." }],
    relatedCalcs: financeRelated("loan-eligibility-calculator"),
  },
  {
    slug: "balloon-loan-calculator", name: "Balloon Loan Calculator", category: "Finance", categorySlug: "finance", subcategory: "Loan Calculators",
    description: "Calculate payments for a balloon loan where a large payment is due at the end of the term.",
    metaDescription: "Free balloon loan calculator. Estimate monthly payments and final balloon payment.",
    icon: "dollar",
    inputs: [
      { id: "amount", label: "Loan Amount", type: "number", defaultValue: 200000, prefix: "$" },
      { id: "rate", label: "Interest Rate (%)", type: "number", defaultValue: 6, suffix: "%", step: 0.1 },
      { id: "amortTerm", label: "Amortization Term (years)", type: "number", defaultValue: 30 },
      { id: "balloonTerm", label: "Balloon Due In (years)", type: "number", defaultValue: 7 },
    ],
    calculate: (v) => {
      const r = loanCalc(v.amount, v.rate, v.amortTerm * 12);
      const mr = v.rate / 100 / 12;
      const n = v.balloonTerm * 12;
      let balance = v.amount;
      for (let i = 0; i < n; i++) {
        const intPmt = balance * mr;
        balance -= (r.monthly - intPmt);
      }
      return [
        { label: "Monthly Payment", value: fmt(r.monthly), highlight: true },
        { label: "Balloon Payment", value: fmt0(balance) },
        { label: "Total Paid Before Balloon", value: fmt0(r.monthly * n) },
        { label: "Principal Paid", value: fmt0(v.amount - balance) },
      ];
    },
    formula: { expression: "Monthly based on amortization; balloon = remaining balance", variables: [] },
    howToUse: "Enter loan amount, rate, amortization term, and when the balloon payment is due.",
    faqs: [{ question: "What is a balloon payment?", answer: "A large lump sum due at end of term. Monthly payments are low, but you must refinance or pay the balance when due." }],
    relatedCalcs: financeRelated("balloon-loan-calculator"),
  },
  {
    slug: "interest-only-loan-calculator", name: "Interest Only Loan Calculator", category: "Finance", categorySlug: "finance", subcategory: "Loan Calculators",
    description: "Calculate interest-only payments and compare with fully amortizing payments.",
    metaDescription: "Free interest-only loan calculator. Compare interest-only vs amortizing payments.",
    icon: "dollar",
    inputs: [
      { id: "amount", label: "Loan Amount", type: "number", defaultValue: 300000, prefix: "$" },
      { id: "rate", label: "Interest Rate (%)", type: "number", defaultValue: 6.5, suffix: "%", step: 0.1 },
      { id: "ioPeriod", label: "Interest-Only Period (years)", type: "number", defaultValue: 10 },
      { id: "totalTerm", label: "Total Loan Term (years)", type: "number", defaultValue: 30 },
    ],
    calculate: (v) => {
      const ioPayment = v.amount * (v.rate / 100 / 12);
      const remainingTerm = (v.totalTerm - v.ioPeriod) * 12;
      const amort = loanCalc(v.amount, v.rate, remainingTerm);
      const fullAmort = loanCalc(v.amount, v.rate, v.totalTerm * 12);
      return [
        { label: "Interest-Only Payment", value: fmt(ioPayment), highlight: true },
        { label: "After IO Period Payment", value: fmt(amort.monthly) },
        { label: "Fully Amortized Payment", value: fmt(fullAmort.monthly) },
        { label: "IO Period Savings/mo", value: fmt(fullAmort.monthly - ioPayment) },
      ];
    },
    formula: { expression: "IO Payment = Loan × Rate / 12", variables: ["Principal untouched during IO period"] },
    howToUse: "Enter loan amount, rate, IO period, and total term.",
    faqs: [{ question: "When are IO loans useful?", answer: "When cash flow is tight initially (investors, commission-based income) or when expecting higher income later." }],
    relatedCalcs: financeRelated("interest-only-loan-calculator"),
  },
  {
    slug: "biweekly-mortgage-calculator", name: "Biweekly Mortgage Calculator", category: "Finance", categorySlug: "finance", subcategory: "Loan Calculators",
    description: "See how biweekly payments can accelerate your mortgage payoff and save interest.",
    metaDescription: "Free biweekly mortgage calculator. See how paying every 2 weeks saves years and interest.",
    icon: "dollar",
    inputs: [
      { id: "balance", label: "Loan Amount", type: "number", defaultValue: 300000, prefix: "$" },
      { id: "rate", label: "Interest Rate (%)", type: "number", defaultValue: 6.5, suffix: "%", step: 0.1 },
      { id: "term", label: "Loan Term (years)", type: "number", defaultValue: 30 },
    ],
    calculate: (v) => {
      const months = v.term * 12;
      const r = loanCalc(v.balance, v.rate, months);
      const biweekly = r.monthly / 2;
      // Biweekly = 26 payments/year = 13 monthly payments worth
      const extraAnnual = r.monthly; // one extra monthly payment per year
      const mr = v.rate / 100 / 12;
      let bal = v.balance, totalInt = 0, m = 0;
      while (bal > 0 && m < months) {
        const intPmt = bal * mr;
        const princPmt = Math.min(r.monthly - intPmt + extraAnnual / 12, bal);
        totalInt += intPmt;
        bal -= princPmt;
        m++;
      }
      return [
        { label: "Biweekly Payment", value: fmt(biweekly), highlight: true },
        { label: "Monthly Equivalent", value: fmt(r.monthly) },
        { label: "Years Saved", value: `${((months - m) / 12).toFixed(1)} years` },
        { label: "Interest Saved", value: fmt0(r.totalInterest - totalInt) },
      ];
    },
    formula: { expression: "Biweekly = Monthly / 2; 26 payments = 13 months/year", variables: ["Extra month of payments each year"] },
    howToUse: "Enter your loan details to see savings from biweekly payments.",
    faqs: [{ question: "Why does biweekly save money?", answer: "26 biweekly payments = 13 monthly payments per year instead of 12, making one extra payment annually." }],
    relatedCalcs: financeRelated("biweekly-mortgage-calculator"),
  },
  {
    slug: "extra-payment-mortgage-calculator", name: "Extra Payment Mortgage Calculator", category: "Finance", categorySlug: "finance", subcategory: "Loan Calculators",
    description: "Calculate how extra monthly payments reduce your mortgage term and total interest.",
    metaDescription: "Free extra payment mortgage calculator. See how additional payments save time and interest.",
    icon: "dollar",
    inputs: [
      { id: "balance", label: "Loan Balance", type: "number", defaultValue: 250000, prefix: "$" },
      { id: "rate", label: "Interest Rate (%)", type: "number", defaultValue: 6, suffix: "%", step: 0.1 },
      { id: "term", label: "Term (years)", type: "number", defaultValue: 30 },
      { id: "extra", label: "Extra Monthly Payment", type: "number", defaultValue: 300, prefix: "$" },
    ],
    calculate: (v) => {
      const months = v.term * 12;
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
        { label: "New Payoff", value: `${Math.floor(m / 12)} yrs ${m % 12} mos`, highlight: true },
        { label: "Time Saved", value: `${Math.floor((months - m) / 12)} yrs ${(months - m) % 12} mos` },
        { label: "Interest Saved", value: fmt0(r.totalInterest - totalInt) },
        { label: "Regular Payment", value: fmt(r.monthly) },
      ];
    },
    formula: { expression: "Recalculate amortization with extra principal each month", variables: [] },
    howToUse: "Enter loan details and extra monthly payment amount.",
    faqs: [{ question: "Should I pay extra on my mortgage?", answer: "If your rate is higher than investment returns (after tax), extra payments are a guaranteed return equal to your rate." }],
    relatedCalcs: financeRelated("extra-payment-mortgage-calculator"),
  },
  {
    slug: "mortgage-required-income-calculator", name: "Mortgage Required Income Calculator", category: "Finance", categorySlug: "finance", subcategory: "Loan Calculators",
    description: "Calculate the minimum income needed to qualify for a specific mortgage amount.",
    metaDescription: "Free mortgage income calculator. Find the salary needed to qualify for your dream home.",
    icon: "dollar",
    inputs: [
      { id: "homePrice", label: "Home Price", type: "number", defaultValue: 400000, prefix: "$" },
      { id: "downPct", label: "Down Payment (%)", type: "number", defaultValue: 20, suffix: "%" },
      { id: "rate", label: "Interest Rate (%)", type: "number", defaultValue: 6.5, suffix: "%", step: 0.1 },
      { id: "term", label: "Term (years)", type: "number", defaultValue: 30 },
      { id: "monthlyDebts", label: "Other Monthly Debts", type: "number", defaultValue: 400, prefix: "$" },
      { id: "dtiLimit", label: "Max DTI (%)", type: "number", defaultValue: 43, suffix: "%" },
    ],
    calculate: (v) => {
      const loan = v.homePrice * (1 - v.downPct / 100);
      const r = loanCalc(loan, v.rate, v.term * 12);
      const totalMonthly = r.monthly + v.monthlyDebts;
      const requiredIncome = totalMonthly / (v.dtiLimit / 100);
      return [
        { label: "Required Monthly Income", value: fmt(requiredIncome), highlight: true },
        { label: "Required Annual Income", value: fmt0(requiredIncome * 12) },
        { label: "Mortgage Payment", value: fmt(r.monthly) },
        { label: "Total Monthly Obligations", value: fmt(totalMonthly) },
      ];
    },
    formula: { expression: "Required Income = (Mortgage + Debts) / DTI Limit", variables: [] },
    howToUse: "Enter home price, down payment, rate, term, existing debts, and DTI limit.",
    faqs: [{ question: "What DTI do lenders use?", answer: "Most conventional lenders use 43% as the maximum, though some allow up to 50% with strong compensating factors." }],
    relatedCalcs: financeRelated("mortgage-required-income-calculator"),
  },
  {
    slug: "loan-against-property-calculator", name: "Loan Against Property Calculator", category: "Finance", categorySlug: "finance", subcategory: "Loan Calculators",
    description: "Calculate how much you can borrow against your property based on its value and LTV ratio.",
    metaDescription: "Free loan against property calculator. Find your borrowing capacity based on property value.",
    icon: "dollar",
    inputs: [
      { id: "propertyValue", label: "Property Value", type: "number", defaultValue: 500000, prefix: "$" },
      { id: "ltvRatio", label: "LTV Ratio (%)", type: "number", defaultValue: 70, suffix: "%" },
      { id: "rate", label: "Interest Rate (%)", type: "number", defaultValue: 8, suffix: "%", step: 0.1 },
      { id: "term", label: "Term (years)", type: "number", defaultValue: 15 },
    ],
    calculate: (v) => {
      const maxLoan = v.propertyValue * (v.ltvRatio / 100);
      const r = loanCalc(maxLoan, v.rate, v.term * 12);
      return [
        { label: "Max Loan Amount", value: fmt0(maxLoan), highlight: true },
        { label: "Monthly EMI", value: fmt(r.monthly) },
        { label: "Total Interest", value: fmt0(r.totalInterest) },
        { label: "Total Payment", value: fmt0(r.totalPayment) },
      ];
    },
    formula: { expression: "Max Loan = Property Value × LTV%", variables: [] },
    howToUse: "Enter property value, LTV ratio, interest rate, and desired term.",
    faqs: [{ question: "What LTV is typical?", answer: "Most lenders offer 60-80% LTV for loans against property. Higher LTV may come with higher rates." }],
    relatedCalcs: financeRelated("loan-against-property-calculator"),
  },
  {
    slug: "loan-prepayment-calculator", name: "Loan Prepayment Calculator", category: "Finance", categorySlug: "finance", subcategory: "Loan Calculators",
    description: "Calculate savings from making a lump sum prepayment on your loan.",
    metaDescription: "Free loan prepayment calculator. See how a lump sum payment reduces loan term and interest.",
    icon: "dollar",
    inputs: [
      { id: "balance", label: "Current Balance", type: "number", defaultValue: 200000, prefix: "$" },
      { id: "rate", label: "Interest Rate (%)", type: "number", defaultValue: 6, suffix: "%", step: 0.1 },
      { id: "remaining", label: "Remaining Term (years)", type: "number", defaultValue: 25 },
      { id: "prepayment", label: "Lump Sum Prepayment", type: "number", defaultValue: 20000, prefix: "$" },
    ],
    calculate: (v) => {
      const origMonths = v.remaining * 12;
      const origR = loanCalc(v.balance, v.rate, origMonths);
      const newBalance = v.balance - v.prepayment;
      const mr = v.rate / 100 / 12;
      // Calculate new payoff time with same payment
      let bal = newBalance, m = 0, totalInt = 0;
      while (bal > 0 && m < origMonths) {
        const intPmt = bal * mr;
        const princPmt = Math.min(origR.monthly - intPmt, bal);
        totalInt += intPmt;
        bal -= princPmt;
        m++;
      }
      return [
        { label: "New Payoff", value: `${Math.floor(m / 12)} yrs ${m % 12} mos`, highlight: true },
        { label: "Time Saved", value: `${Math.floor((origMonths - m) / 12)} yrs ${(origMonths - m) % 12} mos` },
        { label: "Interest Saved", value: fmt0(origR.totalInterest - totalInt) },
        { label: "New Balance", value: fmt0(newBalance) },
      ];
    },
    formula: { expression: "Apply lump sum to principal, recalculate payoff", variables: [] },
    howToUse: "Enter current balance, rate, remaining term, and prepayment amount.",
    faqs: [{ question: "Are there prepayment penalties?", answer: "Some loans charge 1-5% of the prepaid amount. Check your loan agreement. Most mortgages allow prepayment penalty-free." }],
    relatedCalcs: financeRelated("loan-prepayment-calculator"),
  },
  {
    slug: "loan-balance-calculator", name: "Loan Balance Calculator", category: "Finance", categorySlug: "finance", subcategory: "Loan Calculators",
    description: "Calculate your remaining loan balance at any point during the loan term.",
    metaDescription: "Free loan balance calculator. Find remaining balance at any point in your loan term.",
    icon: "dollar",
    inputs: [
      { id: "original", label: "Original Loan Amount", type: "number", defaultValue: 250000, prefix: "$" },
      { id: "rate", label: "Interest Rate (%)", type: "number", defaultValue: 6, suffix: "%", step: 0.1 },
      { id: "term", label: "Original Term (years)", type: "number", defaultValue: 30 },
      { id: "paymentsMade", label: "Payments Made (months)", type: "number", defaultValue: 60 },
    ],
    calculate: (v) => {
      const n = v.term * 12;
      const r = loanCalc(v.original, v.rate, n);
      const mr = v.rate / 100 / 12;
      let bal = v.original, totalPrinc = 0;
      for (let i = 0; i < v.paymentsMade && i < n; i++) {
        const intPmt = bal * mr;
        const princPmt = r.monthly - intPmt;
        totalPrinc += princPmt;
        bal -= princPmt;
      }
      return [
        { label: "Remaining Balance", value: fmt0(bal), highlight: true },
        { label: "Principal Paid", value: fmt0(totalPrinc) },
        { label: "Equity Built (%)", value: pct((totalPrinc / v.original) * 100) },
        { label: "Payments Remaining", value: `${n - v.paymentsMade}` },
      ];
    },
    formula: { expression: "Track amortization to find balance at payment N", variables: [] },
    howToUse: "Enter original loan details and number of payments made.",
    faqs: [{ question: "Why is equity building slow at first?", answer: "Early payments are mostly interest. As the balance decreases, more of each payment goes to principal." }],
    relatedCalcs: financeRelated("loan-balance-calculator"),
  },

  // ═══════════════════════════════════════════
  // RETIREMENT CALCULATORS (New)
  // ═══════════════════════════════════════════
  {
    slug: "retirement-savings-calculator", name: "Retirement Savings Calculator", category: "Finance", categorySlug: "finance", subcategory: "Retirement Calculators",
    description: "Project your retirement savings growth based on current savings, contributions, and expected returns.",
    metaDescription: "Free retirement savings calculator. Project your nest egg growth with regular contributions.",
    icon: "dollar",
    inputs: [
      { id: "currentSavings", label: "Current Savings", type: "number", defaultValue: 50000, prefix: "$" },
      { id: "monthlyContribution", label: "Monthly Contribution", type: "number", defaultValue: 1000, prefix: "$" },
      { id: "annualReturn", label: "Expected Return (%)", type: "number", defaultValue: 7, suffix: "%", step: 0.5 },
      { id: "years", label: "Years Until Retirement", type: "number", defaultValue: 25 },
    ],
    calculate: (v) => {
      const r = v.annualReturn / 100 / 12;
      const n = v.years * 12;
      const fv = v.currentSavings * Math.pow(1 + r, n) + v.monthlyContribution * ((Math.pow(1 + r, n) - 1) / r);
      const contributed = v.currentSavings + v.monthlyContribution * n;
      return [
        { label: "Retirement Savings", value: fmt0(fv), highlight: true },
        { label: "Total Contributed", value: fmt0(contributed) },
        { label: "Investment Growth", value: fmt0(fv - contributed) },
        { label: "Monthly Income (4% Rule)", value: fmt((fv * 0.04) / 12) },
      ];
    },
    formula: { expression: "FV = P(1+r)^n + PMT×[(1+r)^n−1]/r", variables: [] },
    howToUse: "Enter current savings, monthly contribution, expected return, and years to retirement.",
    faqs: [{ question: "How much should I save?", answer: "Aim for 15-20% of gross income. Target 25× your desired annual retirement spending." }],
    relatedCalcs: financeRelated("retirement-savings-calculator"),
  },
  {
    slug: "retirement-withdrawal-calculator", name: "Retirement Withdrawal Calculator", category: "Finance", categorySlug: "finance", subcategory: "Retirement Calculators",
    description: "Calculate how long your retirement savings will last with regular withdrawals.",
    metaDescription: "Free retirement withdrawal calculator. See how long your nest egg lasts with planned spending.",
    icon: "dollar",
    inputs: [
      { id: "savings", label: "Retirement Savings", type: "number", defaultValue: 1000000, prefix: "$" },
      { id: "monthlyWithdrawal", label: "Monthly Withdrawal", type: "number", defaultValue: 4000, prefix: "$" },
      { id: "returnRate", label: "Investment Return (%)", type: "number", defaultValue: 5, suffix: "%", step: 0.5 },
      { id: "inflation", label: "Inflation Rate (%)", type: "number", defaultValue: 3, suffix: "%", step: 0.5 },
    ],
    calculate: (v) => {
      const realRate = (v.returnRate - v.inflation) / 100 / 12;
      let bal = v.savings, months = 0;
      while (bal > 0 && months < 600) {
        bal = bal * (1 + realRate) - v.monthlyWithdrawal;
        months++;
      }
      const years = months / 12;
      const withdrawalRate = (v.monthlyWithdrawal * 12 / v.savings) * 100;
      return [
        { label: "Money Lasts", value: months >= 600 ? "50+ years" : `${Math.floor(years)} yrs ${months % 12} mos`, highlight: true },
        { label: "Withdrawal Rate", value: pct(withdrawalRate) },
        { label: "Annual Withdrawal", value: fmt0(v.monthlyWithdrawal * 12) },
        { label: "Status", value: withdrawalRate <= 4 ? "✓ Sustainable" : "⚠ Consider reducing" },
      ];
    },
    formula: { expression: "Iterate: Balance × (1+real rate) − Withdrawal", variables: ["Real rate = nominal − inflation"] },
    howToUse: "Enter savings, monthly withdrawal, return rate, and inflation.",
    faqs: [{ question: "What is a safe withdrawal rate?", answer: "The 4% rule suggests withdrawing 4% annually (adjusted for inflation) for a 30-year retirement with 95% success rate." }],
    relatedCalcs: financeRelated("retirement-withdrawal-calculator"),
  },
  {
    slug: "fire-calculator", name: "Early Retirement (FIRE) Calculator", category: "Finance", categorySlug: "finance", subcategory: "Retirement Calculators",
    description: "Calculate when you can achieve Financial Independence and Retire Early (FIRE).",
    metaDescription: "Free FIRE calculator. Find your path to financial independence and early retirement.",
    icon: "dollar",
    inputs: [
      { id: "annualExpenses", label: "Annual Expenses", type: "number", defaultValue: 40000, prefix: "$" },
      { id: "currentSavings", label: "Current Savings", type: "number", defaultValue: 100000, prefix: "$" },
      { id: "annualSavings", label: "Annual Savings", type: "number", defaultValue: 30000, prefix: "$" },
      { id: "returnRate", label: "Investment Return (%)", type: "number", defaultValue: 7, suffix: "%", step: 0.5 },
      { id: "withdrawalRate", label: "Withdrawal Rate (%)", type: "number", defaultValue: 4, suffix: "%", step: 0.25 },
    ],
    calculate: (v) => {
      const fireNumber = v.annualExpenses / (v.withdrawalRate / 100);
      const r = v.returnRate / 100;
      let bal = v.currentSavings, years = 0;
      while (bal < fireNumber && years < 100) {
        bal = bal * (1 + r) + v.annualSavings;
        years++;
      }
      const savingsRate = (v.annualSavings / (v.annualExpenses + v.annualSavings)) * 100;
      return [
        { label: "FIRE Number", value: fmt0(fireNumber), highlight: true },
        { label: "Years to FIRE", value: years >= 100 ? "100+" : `${years} years` },
        { label: "Savings Rate", value: pct(savingsRate) },
        { label: "Current Progress", value: pct((v.currentSavings / fireNumber) * 100) },
      ];
    },
    formula: { expression: "FIRE Number = Annual Expenses / Withdrawal Rate", variables: ["Save until investments cover expenses"] },
    howToUse: "Enter annual expenses, current savings, annual savings, return rate, and withdrawal rate.",
    faqs: [{ question: "What is the FIRE movement?", answer: "Financial Independence, Retire Early. Achieve enough passive income from investments to cover living expenses without working." }],
    relatedCalcs: financeRelated("fire-calculator"),
  },
  {
    slug: "four-percent-rule-calculator", name: "4% Rule Retirement Calculator", category: "Finance", categorySlug: "finance", subcategory: "Retirement Calculators",
    description: "Calculate how much you need to retire using the 4% safe withdrawal rate rule.",
    metaDescription: "Free 4% rule calculator. Find your retirement number based on the safe withdrawal rate.",
    icon: "dollar",
    inputs: [
      { id: "annualSpending", label: "Desired Annual Spending", type: "number", defaultValue: 50000, prefix: "$" },
      { id: "socialSecurity", label: "Social Security Income", type: "number", defaultValue: 18000, prefix: "$" },
      { id: "otherIncome", label: "Other Annual Income", type: "number", defaultValue: 0, prefix: "$" },
    ],
    calculate: (v) => {
      const gap = v.annualSpending - v.socialSecurity - v.otherIncome;
      const needed = Math.max(gap, 0) / 0.04;
      return [
        { label: "Retirement Portfolio Needed", value: fmt0(needed), highlight: true },
        { label: "Annual Gap", value: fmt0(gap) },
        { label: "Monthly Withdrawal", value: fmt(gap / 12) },
        { label: "With 3.5% Rule", value: fmt0(gap / 0.035) },
      ];
    },
    formula: { expression: "Portfolio = (Spending − Other Income) / 4%", variables: ["Based on Trinity Study"] },
    howToUse: "Enter desired annual spending and any guaranteed income sources.",
    faqs: [{ question: "Is 4% still safe?", answer: "Research suggests 3.5-4% works for 30-year retirements. For early retirees, 3.25-3.5% may be more conservative." }],
    relatedCalcs: financeRelated("four-percent-rule-calculator"),
  },
  {
    slug: "retirement-income-calculator", name: "Retirement Income Calculator", category: "Finance", categorySlug: "finance", subcategory: "Retirement Calculators",
    description: "Calculate your total monthly retirement income from all sources.",
    metaDescription: "Free retirement income calculator. Estimate total monthly income from all retirement sources.",
    icon: "dollar",
    inputs: [
      { id: "socialSecurity", label: "Monthly Social Security", type: "number", defaultValue: 2000, prefix: "$" },
      { id: "pension", label: "Monthly Pension", type: "number", defaultValue: 1500, prefix: "$" },
      { id: "portfolioValue", label: "Investment Portfolio", type: "number", defaultValue: 500000, prefix: "$" },
      { id: "withdrawalRate", label: "Withdrawal Rate (%)", type: "number", defaultValue: 4, suffix: "%", step: 0.25 },
      { id: "otherIncome", label: "Other Monthly Income", type: "number", defaultValue: 500, prefix: "$" },
    ],
    calculate: (v) => {
      const portfolioMonthly = (v.portfolioValue * (v.withdrawalRate / 100)) / 12;
      const total = v.socialSecurity + v.pension + portfolioMonthly + v.otherIncome;
      return [
        { label: "Total Monthly Income", value: fmt(total), highlight: true },
        { label: "Annual Income", value: fmt0(total * 12) },
        { label: "Portfolio Income/mo", value: fmt(portfolioMonthly) },
        { label: "Guaranteed Income/mo", value: fmt(v.socialSecurity + v.pension) },
      ];
    },
    formula: { expression: "Total = SS + Pension + Portfolio × Rate/12 + Other", variables: [] },
    howToUse: "Enter all income sources to see your total retirement income.",
    faqs: [{ question: "How much income do I need?", answer: "Most retirees need 70-80% of pre-retirement income. Consider healthcare costs which increase with age." }],
    relatedCalcs: financeRelated("retirement-income-calculator"),
  },
  {
    slug: "social-security-break-even-calculator", name: "Social Security Break-Even Calculator", category: "Finance", categorySlug: "finance", subcategory: "Retirement Calculators",
    description: "Find the age at which delaying Social Security benefits becomes more profitable than claiming early.",
    metaDescription: "Free Social Security break-even calculator. Find when delaying benefits pays off vs claiming early.",
    icon: "dollar",
    inputs: [
      { id: "earlyBenefit", label: "Monthly Benefit at 62", type: "number", defaultValue: 1500, prefix: "$" },
      { id: "fraBenefit", label: "Monthly Benefit at FRA (67)", type: "number", defaultValue: 2200, prefix: "$" },
      { id: "delayedBenefit", label: "Monthly Benefit at 70", type: "number", defaultValue: 2700, prefix: "$" },
    ],
    calculate: (v) => {
      // Break-even: early vs FRA
      const earlyTotal = (age: number) => v.earlyBenefit * (age - 62) * 12;
      const fraTotal = (age: number) => age >= 67 ? v.fraBenefit * (age - 67) * 12 : 0;
      let beAge62vs67 = 67;
      for (let age = 67; age <= 95; age++) {
        if (fraTotal(age) > earlyTotal(age)) { beAge62vs67 = age; break; }
      }
      const delayedTotal = (age: number) => age >= 70 ? v.delayedBenefit * (age - 70) * 12 : 0;
      let beAge62vs70 = 70;
      for (let age = 70; age <= 95; age++) {
        if (delayedTotal(age) > earlyTotal(age)) { beAge62vs70 = age; break; }
      }
      return [
        { label: "Break-Even (62 vs 67)", value: `Age ${beAge62vs67}`, highlight: true },
        { label: "Break-Even (62 vs 70)", value: `Age ${beAge62vs70}` },
        { label: "Extra/mo (67 vs 62)", value: fmt(v.fraBenefit - v.earlyBenefit) },
        { label: "Extra/mo (70 vs 62)", value: fmt(v.delayedBenefit - v.earlyBenefit) },
      ];
    },
    formula: { expression: "Find age where cumulative delayed > cumulative early", variables: [] },
    howToUse: "Enter your estimated benefits at ages 62, FRA, and 70.",
    faqs: [{ question: "Should I wait?", answer: "If you expect to live past the break-even age and don't need the money now, waiting generally provides more lifetime income." }],
    relatedCalcs: financeRelated("social-security-break-even-calculator"),
  },
  {
    slug: "pension-growth-calculator", name: "Pension Growth Calculator", category: "Finance", categorySlug: "finance", subcategory: "Retirement Calculators",
    description: "Project pension value growth based on additional years of service and salary increases.",
    metaDescription: "Free pension growth calculator. Project how more years of service increase your pension.",
    icon: "dollar",
    inputs: [
      { id: "currentSalary", label: "Current Salary", type: "number", defaultValue: 75000, prefix: "$" },
      { id: "salaryGrowth", label: "Annual Salary Growth (%)", type: "number", defaultValue: 3, suffix: "%", step: 0.5 },
      { id: "currentYears", label: "Current Years of Service", type: "number", defaultValue: 15 },
      { id: "additionalYears", label: "Additional Years", type: "number", defaultValue: 10 },
      { id: "multiplier", label: "Benefit Multiplier (%)", type: "number", defaultValue: 2, suffix: "%", step: 0.1 },
    ],
    calculate: (v) => {
      const currentPension = v.currentSalary * (v.multiplier / 100) * v.currentYears;
      const futureSalary = v.currentSalary * Math.pow(1 + v.salaryGrowth / 100, v.additionalYears);
      const totalYears = v.currentYears + v.additionalYears;
      const futurePension = futureSalary * (v.multiplier / 100) * totalYears;
      return [
        { label: "Future Annual Pension", value: fmt0(futurePension), highlight: true },
        { label: "Current Pension Value", value: fmt0(currentPension) },
        { label: "Pension Increase", value: fmt0(futurePension - currentPension) },
        { label: "Income Replacement", value: pct((futurePension / futureSalary) * 100) },
      ];
    },
    formula: { expression: "Pension = Final Salary × Multiplier × Total Years", variables: [] },
    howToUse: "Enter salary, growth rate, years of service, and pension multiplier.",
    faqs: [{ question: "How does working longer help?", answer: "Each additional year adds to your multiplier AND your salary base is higher, creating a compound effect." }],
    relatedCalcs: financeRelated("pension-growth-calculator"),
  },
  {
    slug: "retirement-contribution-calculator", name: "Retirement Contribution Calculator", category: "Finance", categorySlug: "finance", subcategory: "Retirement Calculators",
    description: "Calculate how much you need to contribute monthly to reach your retirement savings goal.",
    metaDescription: "Free retirement contribution calculator. Find the monthly savings needed for your retirement goal.",
    icon: "dollar",
    inputs: [
      { id: "goal", label: "Retirement Goal", type: "number", defaultValue: 1000000, prefix: "$" },
      { id: "currentSavings", label: "Current Savings", type: "number", defaultValue: 50000, prefix: "$" },
      { id: "years", label: "Years Until Retirement", type: "number", defaultValue: 25 },
      { id: "returnRate", label: "Expected Return (%)", type: "number", defaultValue: 7, suffix: "%", step: 0.5 },
    ],
    calculate: (v) => {
      const r = v.returnRate / 100 / 12;
      const n = v.years * 12;
      const fvCurrent = v.currentSavings * Math.pow(1 + r, n);
      const gap = v.goal - fvCurrent;
      const monthlyNeeded = gap > 0 ? gap / ((Math.pow(1 + r, n) - 1) / r) : 0;
      return [
        { label: "Monthly Contribution Needed", value: fmt(monthlyNeeded), highlight: true },
        { label: "Annual Contribution", value: fmt0(monthlyNeeded * 12) },
        { label: "Current Savings Will Grow To", value: fmt0(fvCurrent) },
        { label: "Gap to Fill", value: fmt0(Math.max(gap, 0)) },
      ];
    },
    formula: { expression: "PMT = (Goal − FV of Current) / [(1+r)^n−1]/r", variables: [] },
    howToUse: "Enter your retirement goal, current savings, timeline, and expected return.",
    faqs: [{ question: "What if I can't save that much?", answer: "Consider extending your timeline, adjusting your goal, or finding ways to increase income/reduce expenses." }],
    relatedCalcs: financeRelated("retirement-contribution-calculator"),
  },

  // ═══════════════════════════════════════════
  // TAX CALCULATORS (New)
  // ═══════════════════════════════════════════
  {
    slug: "tax-refund-calculator", name: "Tax Refund Calculator", category: "Finance", categorySlug: "finance", subcategory: "Tax Calculators",
    description: "Estimate your tax refund or amount owed based on income, withholding, and credits.",
    metaDescription: "Free tax refund calculator. Estimate your federal tax refund or balance due.",
    icon: "dollar",
    inputs: [
      { id: "income", label: "Gross Income", type: "number", defaultValue: 75000, prefix: "$" },
      { id: "withheld", label: "Total Tax Withheld", type: "number", defaultValue: 12000, prefix: "$" },
      { id: "deductions", label: "Deductions", type: "number", defaultValue: 14600, prefix: "$" },
      { id: "credits", label: "Tax Credits", type: "number", defaultValue: 0, prefix: "$" },
    ],
    calculate: (v) => {
      const taxable = Math.max(v.income - v.deductions, 0);
      const brackets = [{ limit: 11600, rate: 0.10 }, { limit: 47150, rate: 0.12 }, { limit: 100525, rate: 0.22 }, { limit: 191950, rate: 0.24 }, { limit: Infinity, rate: 0.32 }];
      let tax = 0, remaining = taxable, prev = 0;
      for (const b of brackets) { const chunk = Math.min(remaining, b.limit - prev); if (chunk <= 0) break; tax += chunk * b.rate; remaining -= chunk; prev = b.limit; }
      tax = Math.max(tax - v.credits, 0);
      const refund = v.withheld - tax;
      return [
        { label: refund >= 0 ? "Estimated Refund" : "Amount Owed", value: fmt(Math.abs(refund)), highlight: true },
        { label: "Total Tax", value: fmt0(tax) },
        { label: "Effective Rate", value: pct((tax / v.income) * 100) },
        { label: "Taxable Income", value: fmt0(taxable) },
      ];
    },
    formula: { expression: "Refund = Withheld − Calculated Tax + Credits", variables: [] },
    howToUse: "Enter income, total tax withheld, deductions, and credits.",
    faqs: [{ question: "Is a big refund good?", answer: "A large refund means you overpaid during the year. Consider adjusting W-4 to keep more in each paycheck." }],
    relatedCalcs: financeRelated("tax-refund-calculator"),
  },
  {
    slug: "tax-bracket-calculator", name: "Tax Bracket Calculator", category: "Finance", categorySlug: "finance", subcategory: "Tax Calculators",
    description: "Find your federal tax bracket and see how each portion of income is taxed.",
    metaDescription: "Free tax bracket calculator. See which federal tax bracket you fall into.",
    icon: "dollar",
    inputs: [
      { id: "taxableIncome", label: "Taxable Income", type: "number", defaultValue: 85000, prefix: "$" },
      { id: "filingStatus", label: "Filing Status", type: "select", defaultValue: 1, options: [{ value: 1, label: "Single" }, { value: 2, label: "Married Filing Jointly" }] },
    ],
    calculate: (v) => {
      const single = [{ limit: 11600, rate: 10 }, { limit: 47150, rate: 12 }, { limit: 100525, rate: 22 }, { limit: 191950, rate: 24 }, { limit: 243725, rate: 32 }, { limit: 609350, rate: 35 }, { limit: Infinity, rate: 37 }];
      const married = [{ limit: 23200, rate: 10 }, { limit: 94300, rate: 12 }, { limit: 201050, rate: 22 }, { limit: 383900, rate: 24 }, { limit: 487450, rate: 32 }, { limit: 731200, rate: 35 }, { limit: Infinity, rate: 37 }];
      const brackets = v.filingStatus === 1 ? single : married;
      let tax = 0, remaining = v.taxableIncome, prev = 0, marginal = 10;
      for (const b of brackets) { const chunk = Math.min(remaining, b.limit - prev); if (chunk <= 0) break; tax += chunk * (b.rate / 100); marginal = b.rate; remaining -= chunk; prev = b.limit; }
      return [
        { label: "Marginal Tax Bracket", value: `${marginal}%`, highlight: true },
        { label: "Federal Tax", value: fmt0(tax) },
        { label: "Effective Rate", value: pct((tax / v.taxableIncome) * 100) },
        { label: "After-Tax Income", value: fmt0(v.taxableIncome - tax) },
      ];
    },
    formula: { expression: "Progressive: each bracket range taxed at its rate", variables: [] },
    howToUse: "Enter your taxable income and filing status.",
    faqs: [{ question: "Am I taxed at my bracket rate on everything?", answer: "No! Only income within each bracket is taxed at that rate. Your effective rate is always lower than your marginal rate." }],
    relatedCalcs: financeRelated("tax-bracket-calculator"),
  },
  {
    slug: "payroll-tax-calculator", name: "Payroll Tax Calculator", category: "Finance", categorySlug: "finance", subcategory: "Tax Calculators",
    description: "Calculate employer and employee payroll taxes including Social Security and Medicare.",
    metaDescription: "Free payroll tax calculator. Calculate FICA, Social Security, and Medicare taxes.",
    icon: "dollar",
    inputs: [
      { id: "grossPay", label: "Gross Annual Pay", type: "number", defaultValue: 75000, prefix: "$" },
      { id: "employees", label: "Number of Employees", type: "number", defaultValue: 1 },
    ],
    calculate: (v) => {
      const ssWage = Math.min(v.grossPay, 168600);
      const ssTax = ssWage * 0.062;
      const medicareTax = v.grossPay * 0.0145;
      const additionalMedicare = Math.max(v.grossPay - 200000, 0) * 0.009;
      const employeeTotal = ssTax + medicareTax + additionalMedicare;
      const employerTotal = ssTax + medicareTax;
      return [
        { label: "Employee FICA/person", value: fmt(employeeTotal), highlight: true },
        { label: "Employer FICA/person", value: fmt(employerTotal) },
        { label: "Total Payroll Tax", value: fmt0((employeeTotal + employerTotal) * v.employees) },
        { label: "Social Security", value: fmt(ssTax) },
        { label: "Medicare", value: fmt(medicareTax + additionalMedicare) },
      ];
    },
    formula: { expression: "SS = 6.2% (up to $168,600); Medicare = 1.45%", variables: ["Employer matches employee amounts"] },
    howToUse: "Enter gross annual pay and number of employees.",
    faqs: [{ question: "What is the SS wage base?", answer: "For 2024, Social Security tax applies only to the first $168,600 of earnings. Medicare has no wage cap." }],
    relatedCalcs: financeRelated("payroll-tax-calculator"),
  },
  {
    slug: "self-employment-tax-calculator", name: "Self Employment Tax Calculator", category: "Finance", categorySlug: "finance", subcategory: "Tax Calculators",
    description: "Calculate self-employment tax (Social Security and Medicare) for freelancers and contractors.",
    metaDescription: "Free self-employment tax calculator. Calculate SE tax for freelancers and independent contractors.",
    icon: "dollar",
    inputs: [
      { id: "netEarnings", label: "Net Self-Employment Income", type: "number", defaultValue: 80000, prefix: "$" },
    ],
    calculate: (v) => {
      const taxableBase = v.netEarnings * 0.9235;
      const ssBase = Math.min(taxableBase, 168600);
      const ssTax = ssBase * 0.124;
      const medicareTax = taxableBase * 0.029;
      const additionalMedicare = Math.max(taxableBase - 200000, 0) * 0.009;
      const totalSE = ssTax + medicareTax + additionalMedicare;
      const deduction = totalSE / 2;
      return [
        { label: "Self-Employment Tax", value: fmt(totalSE), highlight: true },
        { label: "Deductible Half", value: fmt(deduction) },
        { label: "Social Security Portion", value: fmt(ssTax) },
        { label: "Medicare Portion", value: fmt(medicareTax + additionalMedicare) },
        { label: "Effective SE Rate", value: pct((totalSE / v.netEarnings) * 100) },
      ];
    },
    formula: { expression: "SE Tax = Net × 92.35% × 15.3%", variables: ["You pay both employer and employee portions"] },
    howToUse: "Enter your net self-employment income (after business expenses).",
    faqs: [{ question: "Why is SE tax higher?", answer: "Self-employed pay both employer (7.65%) and employee (7.65%) shares of FICA, totaling 15.3%." }],
    relatedCalcs: financeRelated("self-employment-tax-calculator"),
  },
  {
    slug: "after-tax-return-calculator", name: "After Tax Return Calculator", category: "Finance", categorySlug: "finance", subcategory: "Tax Calculators",
    description: "Calculate your real investment return after accounting for taxes on gains and dividends.",
    metaDescription: "Free after-tax return calculator. Find your real investment return after taxes.",
    icon: "dollar",
    inputs: [
      { id: "grossReturn", label: "Gross Return (%)", type: "number", defaultValue: 10, suffix: "%", step: 0.5 },
      { id: "taxRate", label: "Tax Rate on Gains (%)", type: "number", defaultValue: 15, suffix: "%" },
      { id: "dividendYield", label: "Dividend Yield (%)", type: "number", defaultValue: 2, suffix: "%", step: 0.1 },
      { id: "dividendTaxRate", label: "Dividend Tax Rate (%)", type: "number", defaultValue: 15, suffix: "%" },
    ],
    calculate: (v) => {
      const capitalGainReturn = v.grossReturn - v.dividendYield;
      const afterTaxGain = capitalGainReturn * (1 - v.taxRate / 100);
      const afterTaxDividend = v.dividendYield * (1 - v.dividendTaxRate / 100);
      const totalAfterTax = afterTaxGain + afterTaxDividend;
      return [
        { label: "After-Tax Return", value: pct(totalAfterTax), highlight: true },
        { label: "Tax Drag", value: pct(v.grossReturn - totalAfterTax) },
        { label: "Gross Return", value: pct(v.grossReturn) },
        { label: "Effective Tax Rate", value: pct(((v.grossReturn - totalAfterTax) / v.grossReturn) * 100) },
      ];
    },
    formula: { expression: "After-Tax = Gain×(1−Tax%) + Dividend×(1−DivTax%)", variables: [] },
    howToUse: "Enter gross return, tax rates, and dividend yield.",
    faqs: [{ question: "How to minimize investment taxes?", answer: "Use tax-advantaged accounts (401k, IRA), hold investments >1 year for lower cap gains rates, and tax-loss harvest." }],
    relatedCalcs: financeRelated("after-tax-return-calculator"),
  },
  {
    slug: "salary-comparison-calculator", name: "Salary Comparison Calculator", category: "Finance", categorySlug: "finance", subcategory: "Tax Calculators",
    description: "Compare two salary offers accounting for taxes, benefits, and cost of living differences.",
    metaDescription: "Free salary comparison calculator. Compare job offers with taxes and cost of living adjustments.",
    icon: "dollar",
    inputs: [
      { id: "salary1", label: "Salary Offer 1", type: "number", defaultValue: 85000, prefix: "$" },
      { id: "salary2", label: "Salary Offer 2", type: "number", defaultValue: 95000, prefix: "$" },
      { id: "tax1", label: "Offer 1 Total Tax Rate (%)", type: "number", defaultValue: 30, suffix: "%" },
      { id: "tax2", label: "Offer 2 Total Tax Rate (%)", type: "number", defaultValue: 35, suffix: "%" },
      { id: "colIndex", label: "Offer 2 COL Index (vs 100)", type: "number", defaultValue: 120 },
    ],
    calculate: (v) => {
      const net1 = v.salary1 * (1 - v.tax1 / 100);
      const net2 = v.salary2 * (1 - v.tax2 / 100);
      const adjusted2 = net2 * (100 / v.colIndex);
      return [
        { label: "Offer 1 Net Pay", value: fmt0(net1), highlight: net1 > adjusted2 },
        { label: "Offer 2 Net Pay", value: fmt0(net2) },
        { label: "Offer 2 COL-Adjusted", value: fmt0(adjusted2), highlight: adjusted2 > net1 },
        { label: "Better Offer", value: net1 > adjusted2 ? "Offer 1" : "Offer 2" },
      ];
    },
    formula: { expression: "Net = Salary × (1 − Tax%); Adjusted = Net × (100/COL)", variables: [] },
    howToUse: "Enter salaries, tax rates, and cost of living index for offer 2.",
    faqs: [{ question: "What is COL index?", answer: "Cost of Living index where 100 = national average. NYC ~190, Austin ~95, San Francisco ~180." }],
    relatedCalcs: financeRelated("salary-comparison-calculator"),
  },

  // ═══════════════════════════════════════════
  // PERSONAL FINANCE CALCULATORS
  // ═══════════════════════════════════════════
  {
    slug: "emergency-fund-calculator", name: "Emergency Fund Calculator", category: "Finance", categorySlug: "finance", subcategory: "Personal Finance Calculators",
    description: "Calculate how much you need in your emergency fund based on monthly expenses.",
    metaDescription: "Free emergency fund calculator. Find the right emergency fund size for your situation.",
    icon: "dollar",
    inputs: [
      { id: "monthlyExpenses", label: "Monthly Expenses", type: "number", defaultValue: 4000, prefix: "$" },
      { id: "months", label: "Months of Coverage", type: "number", defaultValue: 6 },
      { id: "currentFund", label: "Current Emergency Fund", type: "number", defaultValue: 5000, prefix: "$" },
    ],
    calculate: (v) => {
      const target = v.monthlyExpenses * v.months;
      const gap = Math.max(target - v.currentFund, 0);
      const progress = (v.currentFund / target) * 100;
      return [
        { label: "Target Emergency Fund", value: fmt0(target), highlight: true },
        { label: "Current Progress", value: pct(progress) },
        { label: "Gap to Fill", value: fmt0(gap) },
        { label: "Monthly Save (12mo goal)", value: fmt(gap / 12) },
      ];
    },
    formula: { expression: "Target = Monthly Expenses × Months of Coverage", variables: [] },
    howToUse: "Enter monthly expenses, desired coverage months, and current savings.",
    faqs: [{ question: "How many months should I save?", answer: "3-6 months for stable employment, 6-12 months for self-employed or variable income." }],
    relatedCalcs: financeRelated("emergency-fund-calculator"),
  },
  {
    slug: "net-worth-calculator", name: "Net Worth Calculator", category: "Finance", categorySlug: "finance", subcategory: "Personal Finance Calculators",
    description: "Calculate your net worth by listing all assets and liabilities.",
    metaDescription: "Free net worth calculator. Calculate your financial net worth from assets and liabilities.",
    icon: "dollar",
    inputs: [
      { id: "cash", label: "Cash & Savings", type: "number", defaultValue: 25000, prefix: "$" },
      { id: "investments", label: "Investments", type: "number", defaultValue: 100000, prefix: "$" },
      { id: "property", label: "Property Value", type: "number", defaultValue: 350000, prefix: "$" },
      { id: "otherAssets", label: "Other Assets", type: "number", defaultValue: 30000, prefix: "$" },
      { id: "mortgage", label: "Mortgage Balance", type: "number", defaultValue: 250000, prefix: "$" },
      { id: "otherDebts", label: "Other Debts", type: "number", defaultValue: 15000, prefix: "$" },
    ],
    calculate: (v) => {
      const totalAssets = v.cash + v.investments + v.property + v.otherAssets;
      const totalLiabilities = v.mortgage + v.otherDebts;
      const netWorth = totalAssets - totalLiabilities;
      return [
        { label: "Net Worth", value: fmt0(netWorth), highlight: true },
        { label: "Total Assets", value: fmt0(totalAssets) },
        { label: "Total Liabilities", value: fmt0(totalLiabilities) },
        { label: "Debt-to-Asset Ratio", value: pct((totalLiabilities / totalAssets) * 100) },
      ];
    },
    formula: { expression: "Net Worth = Total Assets − Total Liabilities", variables: [] },
    howToUse: "Enter all your assets and debts to calculate net worth.",
    faqs: [{ question: "What is a good net worth?", answer: "A common benchmark: your age × income / 10. Net worth grows exponentially with consistent saving and investing." }],
    relatedCalcs: financeRelated("net-worth-calculator"),
  },
  {
    slug: "expense-ratio-calculator", name: "Expense Ratio Calculator", category: "Finance", categorySlug: "finance", subcategory: "Personal Finance Calculators",
    description: "Calculate the real cost of fund expense ratios on your investments over time.",
    metaDescription: "Free expense ratio calculator. See how fund fees impact your investment returns.",
    icon: "dollar",
    inputs: [
      { id: "investment", label: "Investment Amount", type: "number", defaultValue: 100000, prefix: "$" },
      { id: "expenseRatio", label: "Expense Ratio (%)", type: "number", defaultValue: 0.5, suffix: "%", step: 0.01 },
      { id: "returnRate", label: "Annual Return (%)", type: "number", defaultValue: 8, suffix: "%", step: 0.5 },
      { id: "years", label: "Years", type: "number", defaultValue: 30 },
    ],
    calculate: (v) => {
      const withFee = v.investment * Math.pow(1 + (v.returnRate - v.expenseRatio) / 100, v.years);
      const withoutFee = v.investment * Math.pow(1 + v.returnRate / 100, v.years);
      const feeCost = withoutFee - withFee;
      return [
        { label: "With Fees", value: fmt0(withFee), highlight: true },
        { label: "Without Fees", value: fmt0(withoutFee) },
        { label: "Total Fee Cost", value: fmt0(feeCost) },
        { label: "Annual Fee", value: fmt(v.investment * (v.expenseRatio / 100)) },
      ];
    },
    formula: { expression: "FV = Investment × (1 + Return − Fee)^Years", variables: [] },
    howToUse: "Enter investment amount, expense ratio, expected return, and time period.",
    faqs: [{ question: "What is a low expense ratio?", answer: "Index funds: 0.03-0.20%. Actively managed: 0.50-2.00%. Lower is generally better." }],
    relatedCalcs: financeRelated("expense-ratio-calculator"),
  },
  {
    slug: "budget-percentage-calculator", name: "Budget Percentage Calculator", category: "Finance", categorySlug: "finance", subcategory: "Personal Finance Calculators",
    description: "Break down your budget by category percentages and see recommended allocations.",
    metaDescription: "Free budget percentage calculator. Allocate income by category with recommended percentages.",
    icon: "dollar",
    inputs: [
      { id: "income", label: "Monthly Income", type: "number", defaultValue: 6000, prefix: "$" },
      { id: "housing", label: "Housing (%)", type: "number", defaultValue: 30, suffix: "%" },
      { id: "food", label: "Food (%)", type: "number", defaultValue: 12, suffix: "%" },
      { id: "transport", label: "Transportation (%)", type: "number", defaultValue: 10, suffix: "%" },
      { id: "savings", label: "Savings (%)", type: "number", defaultValue: 20, suffix: "%" },
    ],
    calculate: (v) => {
      const remaining = 100 - v.housing - v.food - v.transport - v.savings;
      return [
        { label: "Housing", value: fmt(v.income * v.housing / 100) },
        { label: "Food", value: fmt(v.income * v.food / 100) },
        { label: "Transportation", value: fmt(v.income * v.transport / 100) },
        { label: "Savings", value: fmt(v.income * v.savings / 100), highlight: true },
        { label: "Remaining for Other", value: `${remaining}% (${fmt(v.income * remaining / 100)})` },
      ];
    },
    formula: { expression: "Amount = Income × Percentage / 100", variables: [] },
    howToUse: "Enter monthly income and allocation percentages.",
    faqs: [{ question: "Recommended budget percentages?", answer: "Housing: 25-30%, Food: 10-15%, Transport: 10-15%, Savings: 15-20%, Insurance: 10-15%." }],
    relatedCalcs: financeRelated("budget-percentage-calculator"),
  },
  {
    slug: "debt-snowball-calculator", name: "Debt Snowball Calculator", category: "Finance", categorySlug: "finance", subcategory: "Personal Finance Calculators",
    description: "Calculate debt payoff using the snowball method — paying smallest balances first for motivation.",
    metaDescription: "Free debt snowball calculator. Pay off debts smallest to largest for maximum motivation.",
    icon: "dollar",
    inputs: [
      { id: "debt1", label: "Debt 1 Balance", type: "number", defaultValue: 2000, prefix: "$" },
      { id: "rate1", label: "Debt 1 Rate (%)", type: "number", defaultValue: 18, suffix: "%" },
      { id: "debt2", label: "Debt 2 Balance", type: "number", defaultValue: 8000, prefix: "$" },
      { id: "rate2", label: "Debt 2 Rate (%)", type: "number", defaultValue: 12, suffix: "%" },
      { id: "debt3", label: "Debt 3 Balance", type: "number", defaultValue: 15000, prefix: "$" },
      { id: "rate3", label: "Debt 3 Rate (%)", type: "number", defaultValue: 6, suffix: "%" },
      { id: "extraPayment", label: "Extra Monthly Payment", type: "number", defaultValue: 500, prefix: "$" },
    ],
    calculate: (v) => {
      const debts = [
        { balance: v.debt1, rate: v.rate1, minPay: Math.max(v.debt1 * 0.02, 25) },
        { balance: v.debt2, rate: v.rate2, minPay: Math.max(v.debt2 * 0.02, 25) },
        { balance: v.debt3, rate: v.rate3, minPay: Math.max(v.debt3 * 0.02, 25) },
      ].sort((a, b) => a.balance - b.balance);
      const totalDebt = debts.reduce((s, d) => s + d.balance, 0);
      let totalInterest = 0, months = 0;
      const balances = debts.map(d => d.balance);
      while (balances.some(b => b > 0) && months < 600) {
        let extra = v.extraPayment;
        for (let i = 0; i < debts.length; i++) {
          if (balances[i] <= 0) continue;
          const intPmt = balances[i] * (debts[i].rate / 100 / 12);
          totalInterest += intPmt;
          let payment = debts[i].minPay;
          if (i === balances.findIndex(b => b > 0)) payment += extra;
          balances[i] = Math.max(balances[i] + intPmt - payment, 0);
        }
        months++;
      }
      return [
        { label: "Payoff Time", value: `${Math.floor(months / 12)} yrs ${months % 12} mos`, highlight: true },
        { label: "Total Interest Paid", value: fmt0(totalInterest) },
        { label: "Total Debt", value: fmt0(totalDebt) },
        { label: "Order", value: "Smallest → Largest" },
      ];
    },
    formula: { expression: "Pay minimums on all, extra goes to smallest balance", variables: ["When one is paid off, roll payment to next"] },
    howToUse: "Enter up to 3 debts with balances and rates, plus your extra monthly payment.",
    faqs: [{ question: "Snowball vs avalanche?", answer: "Snowball pays smallest first (motivation). Avalanche pays highest rate first (saves more interest). Choose what keeps you motivated." }],
    relatedCalcs: financeRelated("debt-snowball-calculator"),
  },
  {
    slug: "debt-avalanche-calculator", name: "Debt Avalanche Calculator", category: "Finance", categorySlug: "finance", subcategory: "Personal Finance Calculators",
    description: "Calculate debt payoff using the avalanche method — paying highest interest rates first to save money.",
    metaDescription: "Free debt avalanche calculator. Pay off debts by highest interest rate to minimize total interest.",
    icon: "dollar",
    inputs: [
      { id: "debt1", label: "Debt 1 Balance", type: "number", defaultValue: 2000, prefix: "$" },
      { id: "rate1", label: "Debt 1 Rate (%)", type: "number", defaultValue: 18, suffix: "%" },
      { id: "debt2", label: "Debt 2 Balance", type: "number", defaultValue: 8000, prefix: "$" },
      { id: "rate2", label: "Debt 2 Rate (%)", type: "number", defaultValue: 12, suffix: "%" },
      { id: "debt3", label: "Debt 3 Balance", type: "number", defaultValue: 15000, prefix: "$" },
      { id: "rate3", label: "Debt 3 Rate (%)", type: "number", defaultValue: 6, suffix: "%" },
      { id: "extraPayment", label: "Extra Monthly Payment", type: "number", defaultValue: 500, prefix: "$" },
    ],
    calculate: (v) => {
      const debts = [
        { balance: v.debt1, rate: v.rate1, minPay: Math.max(v.debt1 * 0.02, 25) },
        { balance: v.debt2, rate: v.rate2, minPay: Math.max(v.debt2 * 0.02, 25) },
        { balance: v.debt3, rate: v.rate3, minPay: Math.max(v.debt3 * 0.02, 25) },
      ].sort((a, b) => b.rate - a.rate);
      const totalDebt = debts.reduce((s, d) => s + d.balance, 0);
      let totalInterest = 0, months = 0;
      const balances = debts.map(d => d.balance);
      while (balances.some(b => b > 0) && months < 600) {
        let extra = v.extraPayment;
        for (let i = 0; i < debts.length; i++) {
          if (balances[i] <= 0) continue;
          const intPmt = balances[i] * (debts[i].rate / 100 / 12);
          totalInterest += intPmt;
          let payment = debts[i].minPay;
          if (i === balances.findIndex(b => b > 0)) payment += extra;
          balances[i] = Math.max(balances[i] + intPmt - payment, 0);
        }
        months++;
      }
      return [
        { label: "Payoff Time", value: `${Math.floor(months / 12)} yrs ${months % 12} mos`, highlight: true },
        { label: "Total Interest Paid", value: fmt0(totalInterest) },
        { label: "Total Debt", value: fmt0(totalDebt) },
        { label: "Order", value: "Highest Rate → Lowest" },
      ];
    },
    formula: { expression: "Pay minimums on all, extra goes to highest rate", variables: ["Mathematically optimal for minimizing interest"] },
    howToUse: "Enter debts with balances and rates, plus your extra monthly payment.",
    faqs: [{ question: "How much does avalanche save?", answer: "Typically saves 10-30% on interest compared to snowball, depending on rate differences and balances." }],
    relatedCalcs: financeRelated("debt-avalanche-calculator"),
  },
  {
    slug: "financial-independence-calculator", name: "Financial Independence Calculator", category: "Finance", categorySlug: "finance", subcategory: "Personal Finance Calculators",
    description: "Calculate when you'll reach financial independence based on savings rate and investment returns.",
    metaDescription: "Free financial independence calculator. Find when your investments can cover your expenses.",
    icon: "dollar",
    inputs: [
      { id: "annualIncome", label: "Annual Income", type: "number", defaultValue: 80000, prefix: "$" },
      { id: "savingsRate", label: "Savings Rate (%)", type: "number", defaultValue: 30, suffix: "%" },
      { id: "currentSavings", label: "Current Savings", type: "number", defaultValue: 50000, prefix: "$" },
      { id: "returnRate", label: "Investment Return (%)", type: "number", defaultValue: 7, suffix: "%", step: 0.5 },
    ],
    calculate: (v) => {
      const annualSavings = v.annualIncome * (v.savingsRate / 100);
      const annualExpenses = v.annualIncome - annualSavings;
      const fiNumber = annualExpenses * 25;
      const r = v.returnRate / 100;
      let bal = v.currentSavings, years = 0;
      while (bal < fiNumber && years < 100) { bal = bal * (1 + r) + annualSavings; years++; }
      return [
        { label: "FI Number", value: fmt0(fiNumber), highlight: true },
        { label: "Years to FI", value: years >= 100 ? "100+" : `${years} years` },
        { label: "Annual Expenses", value: fmt0(annualExpenses) },
        { label: "Progress", value: pct((v.currentSavings / fiNumber) * 100) },
      ];
    },
    formula: { expression: "FI Number = Annual Expenses × 25", variables: ["Based on 4% withdrawal rate"] },
    howToUse: "Enter income, savings rate, current savings, and expected returns.",
    faqs: [{ question: "What savings rate for early FI?", answer: "50% → ~17 years, 60% → ~12 years, 70% → ~8 years to FI. Higher savings rate dramatically shortens the timeline." }],
    relatedCalcs: financeRelated("financial-independence-calculator"),
  },
  {
    slug: "net-income-calculator", name: "Net Income Calculator", category: "Finance", categorySlug: "finance", subcategory: "Personal Finance Calculators",
    description: "Calculate your net income after all deductions including taxes, insurance, and retirement contributions.",
    metaDescription: "Free net income calculator. Find your take-home pay after all deductions.",
    icon: "dollar",
    inputs: [
      { id: "grossIncome", label: "Gross Monthly Income", type: "number", defaultValue: 6500, prefix: "$" },
      { id: "federalTax", label: "Federal Tax (%)", type: "number", defaultValue: 22, suffix: "%" },
      { id: "stateTax", label: "State Tax (%)", type: "number", defaultValue: 5, suffix: "%" },
      { id: "fica", label: "FICA (%)", type: "number", defaultValue: 7.65, suffix: "%", step: 0.01 },
      { id: "insurance", label: "Health Insurance", type: "number", defaultValue: 200, prefix: "$" },
      { id: "retirement", label: "Retirement Contribution (%)", type: "number", defaultValue: 6, suffix: "%" },
    ],
    calculate: (v) => {
      const retirement = v.grossIncome * (v.retirement / 100);
      const taxable = v.grossIncome - retirement;
      const fedTax = taxable * (v.federalTax / 100);
      const stateTax = taxable * (v.stateTax / 100);
      const fica = v.grossIncome * (v.fica / 100);
      const totalDeductions = fedTax + stateTax + fica + v.insurance + retirement;
      const netIncome = v.grossIncome - totalDeductions;
      return [
        { label: "Net Income", value: fmt(netIncome), highlight: true },
        { label: "Total Deductions", value: fmt(totalDeductions) },
        { label: "Take-Home Rate", value: pct((netIncome / v.grossIncome) * 100) },
        { label: "Annual Net", value: fmt0(netIncome * 12) },
      ];
    },
    formula: { expression: "Net = Gross − Taxes − Insurance − Retirement", variables: [] },
    howToUse: "Enter gross income and all deduction percentages/amounts.",
    faqs: [{ question: "How to increase net income?", answer: "Maximize pre-tax deductions (401k, HSA), adjust W-4 withholding, and use all available tax credits." }],
    relatedCalcs: financeRelated("net-income-calculator"),
  },
  {
    slug: "lifestyle-inflation-calculator", name: "Lifestyle Inflation Calculator", category: "Finance", categorySlug: "finance", subcategory: "Personal Finance Calculators",
    description: "See how increasing spending with income raises hurts your wealth accumulation over time.",
    metaDescription: "Free lifestyle inflation calculator. See the hidden cost of increasing spending with income.",
    icon: "dollar",
    inputs: [
      { id: "currentIncome", label: "Current Annual Income", type: "number", defaultValue: 70000, prefix: "$" },
      { id: "currentSpending", label: "Current Annual Spending", type: "number", defaultValue: 50000, prefix: "$" },
      { id: "incomeGrowth", label: "Income Growth (%/yr)", type: "number", defaultValue: 5, suffix: "%", step: 0.5 },
      { id: "lifestyleInflation", label: "Lifestyle Inflation (%/yr)", type: "number", defaultValue: 3, suffix: "%", step: 0.5 },
      { id: "years", label: "Years", type: "number", defaultValue: 20 },
      { id: "returnRate", label: "Investment Return (%)", type: "number", defaultValue: 7, suffix: "%", step: 0.5 },
    ],
    calculate: (v) => {
      let wealthInflated = 0, wealthFlat = 0;
      let spending = v.currentSpending;
      let income = v.currentIncome;
      const r = v.returnRate / 100;
      for (let y = 0; y < v.years; y++) {
        const savingsInflated = income - spending;
        const savingsFlat = income - v.currentSpending;
        wealthInflated = (wealthInflated + savingsInflated) * (1 + r);
        wealthFlat = (wealthFlat + savingsFlat) * (1 + r);
        income *= 1 + v.incomeGrowth / 100;
        spending *= 1 + v.lifestyleInflation / 100;
      }
      return [
        { label: "Wealth (with inflation)", value: fmt0(wealthInflated) },
        { label: "Wealth (flat spending)", value: fmt0(wealthFlat), highlight: true },
        { label: "Cost of Lifestyle Inflation", value: fmt0(wealthFlat - wealthInflated) },
        { label: "Future Annual Spending", value: fmt0(v.currentSpending * Math.pow(1 + v.lifestyleInflation / 100, v.years)) },
      ];
    },
    formula: { expression: "Compare savings with vs without spending increases", variables: [] },
    howToUse: "Enter income, spending, growth rates, and time period.",
    faqs: [{ question: "What is lifestyle inflation?", answer: "When spending increases proportionally with income, preventing you from saving the raises. It's the #1 wealth killer for high earners." }],
    relatedCalcs: financeRelated("lifestyle-inflation-calculator"),
  },

  // ═══════════════════════════════════════════
  // REAL ESTATE CALCULATORS
  // ═══════════════════════════════════════════
  {
    slug: "cap-rate-calculator", name: "Cap Rate Calculator", category: "Finance", categorySlug: "finance", subcategory: "Real Estate Calculators",
    description: "Calculate the capitalization rate for investment property valuation and comparison.",
    metaDescription: "Free cap rate calculator. Evaluate rental property investments with capitalization rate.",
    icon: "dollar",
    inputs: [
      { id: "noi", label: "Annual Net Operating Income", type: "number", defaultValue: 30000, prefix: "$" },
      { id: "propertyValue", label: "Property Value", type: "number", defaultValue: 400000, prefix: "$" },
    ],
    calculate: (v) => {
      const capRate = (v.noi / v.propertyValue) * 100;
      return [
        { label: "Cap Rate", value: pct(capRate), highlight: true },
        { label: "Property Value", value: fmt0(v.propertyValue) },
        { label: "Monthly NOI", value: fmt(v.noi / 12) },
        { label: "Value at 8% Cap", value: fmt0(v.noi / 0.08) },
      ];
    },
    formula: { expression: "Cap Rate = NOI / Property Value × 100", variables: [] },
    howToUse: "Enter annual NOI and property value.",
    faqs: [{ question: "What is a good cap rate?", answer: "4-5% in prime areas, 6-8% in secondary markets, 8-12% in higher risk areas." }],
    relatedCalcs: financeRelated("cap-rate-calculator"),
  },
  {
    slug: "cash-on-cash-return-calculator", name: "Cash on Cash Return Calculator", category: "Finance", categorySlug: "finance", subcategory: "Real Estate Calculators",
    description: "Calculate the cash-on-cash return for a rental property investment.",
    metaDescription: "Free cash on cash return calculator. Measure rental property ROI on invested cash.",
    icon: "dollar",
    inputs: [
      { id: "annualCashFlow", label: "Annual Pre-Tax Cash Flow", type: "number", defaultValue: 12000, prefix: "$" },
      { id: "totalCashInvested", label: "Total Cash Invested", type: "number", defaultValue: 80000, prefix: "$" },
    ],
    calculate: (v) => {
      const coc = (v.annualCashFlow / v.totalCashInvested) * 100;
      return [
        { label: "Cash-on-Cash Return", value: pct(coc), highlight: true },
        { label: "Monthly Cash Flow", value: fmt(v.annualCashFlow / 12) },
        { label: "Payback Period", value: `${(v.totalCashInvested / v.annualCashFlow).toFixed(1)} years` },
      ];
    },
    formula: { expression: "CoC = Annual Cash Flow / Total Cash Invested × 100", variables: [] },
    howToUse: "Enter annual cash flow and total cash invested (down payment + closing costs + repairs).",
    faqs: [{ question: "What CoC is good?", answer: "8-12% is solid. Above 12% is excellent. It measures return on YOUR money, not the total property value." }],
    relatedCalcs: financeRelated("cash-on-cash-return-calculator"),
  },
  {
    slug: "property-appreciation-calculator", name: "Property Appreciation Calculator", category: "Finance", categorySlug: "finance", subcategory: "Real Estate Calculators",
    description: "Project your property's future value based on annual appreciation rates.",
    metaDescription: "Free property appreciation calculator. Project home value growth over time.",
    icon: "dollar",
    inputs: [
      { id: "currentValue", label: "Current Property Value", type: "number", defaultValue: 400000, prefix: "$" },
      { id: "appreciationRate", label: "Annual Appreciation (%)", type: "number", defaultValue: 3, suffix: "%", step: 0.5 },
      { id: "years", label: "Years", type: "number", defaultValue: 10 },
    ],
    calculate: (v) => {
      const futureValue = v.currentValue * Math.pow(1 + v.appreciationRate / 100, v.years);
      const gain = futureValue - v.currentValue;
      return [
        { label: "Future Value", value: fmt0(futureValue), highlight: true },
        { label: "Total Appreciation", value: fmt0(gain) },
        { label: "Total Return", value: pct((gain / v.currentValue) * 100) },
        { label: "Annual Gain (avg)", value: fmt0(gain / v.years) },
      ];
    },
    formula: { expression: "FV = Current × (1 + Rate)^Years", variables: [] },
    howToUse: "Enter current value, appreciation rate, and time period.",
    faqs: [{ question: "What is average home appreciation?", answer: "Historically 3-5% nationally, but varies widely by location. Some markets see 7-10%, others flat or declining." }],
    relatedCalcs: financeRelated("property-appreciation-calculator"),
  },
  {
    slug: "rental-yield-calculator", name: "Rental Yield Calculator", category: "Finance", categorySlug: "finance", subcategory: "Real Estate Calculators",
    description: "Calculate gross and net rental yield on investment properties.",
    metaDescription: "Free rental yield calculator. Calculate gross and net yields on rental properties.",
    icon: "dollar",
    inputs: [
      { id: "propertyValue", label: "Property Value", type: "number", defaultValue: 350000, prefix: "$" },
      { id: "monthlyRent", label: "Monthly Rent", type: "number", defaultValue: 2500, prefix: "$" },
      { id: "annualExpenses", label: "Annual Expenses", type: "number", defaultValue: 8000, prefix: "$" },
    ],
    calculate: (v) => {
      const annualRent = v.monthlyRent * 12;
      const grossYield = (annualRent / v.propertyValue) * 100;
      const netYield = ((annualRent - v.annualExpenses) / v.propertyValue) * 100;
      return [
        { label: "Gross Yield", value: pct(grossYield), highlight: true },
        { label: "Net Yield", value: pct(netYield) },
        { label: "Annual Rent", value: fmt0(annualRent) },
        { label: "Annual Net Income", value: fmt0(annualRent - v.annualExpenses) },
      ];
    },
    formula: { expression: "Gross Yield = Annual Rent / Value × 100", variables: ["Net Yield subtracts expenses"] },
    howToUse: "Enter property value, monthly rent, and annual expenses.",
    faqs: [{ question: "Yield vs cap rate?", answer: "Rental yield uses rent income. Cap rate uses NOI (rent minus operating expenses). Net yield is closest to cap rate." }],
    relatedCalcs: financeRelated("rental-yield-calculator"),
  },
  {
    slug: "real-estate-roi-calculator", name: "Real Estate ROI Calculator", category: "Finance", categorySlug: "finance", subcategory: "Real Estate Calculators",
    description: "Calculate the total return on a real estate investment including appreciation, rent, and equity.",
    metaDescription: "Free real estate ROI calculator. Calculate total returns including appreciation and rental income.",
    icon: "dollar",
    inputs: [
      { id: "purchasePrice", label: "Purchase Price", type: "number", defaultValue: 300000, prefix: "$" },
      { id: "currentValue", label: "Current/Sale Value", type: "number", defaultValue: 380000, prefix: "$" },
      { id: "totalRentCollected", label: "Total Rent Collected", type: "number", defaultValue: 72000, prefix: "$" },
      { id: "totalExpenses", label: "Total Expenses Paid", type: "number", defaultValue: 45000, prefix: "$" },
      { id: "downPayment", label: "Down Payment", type: "number", defaultValue: 60000, prefix: "$" },
    ],
    calculate: (v) => {
      const appreciation = v.currentValue - v.purchasePrice;
      const netRent = v.totalRentCollected - v.totalExpenses;
      const totalReturn = appreciation + netRent;
      const roi = (totalReturn / v.downPayment) * 100;
      return [
        { label: "Total ROI", value: pct(roi), highlight: true },
        { label: "Total Return", value: fmt0(totalReturn) },
        { label: "Appreciation", value: fmt0(appreciation) },
        { label: "Net Rental Income", value: fmt0(netRent) },
      ];
    },
    formula: { expression: "ROI = (Appreciation + Net Rent) / Down Payment × 100", variables: [] },
    howToUse: "Enter purchase price, current value, total rent, expenses, and down payment.",
    faqs: [{ question: "Why use down payment for ROI?", answer: "ROI on cash invested (leveraged return) shows actual return on YOUR money, which is amplified by mortgage leverage." }],
    relatedCalcs: financeRelated("real-estate-roi-calculator"),
  },
  {
    slug: "mortgage-tax-savings-calculator", name: "Mortgage Tax Savings Calculator", category: "Finance", categorySlug: "finance", subcategory: "Real Estate Calculators",
    description: "Calculate the tax savings from mortgage interest deduction.",
    metaDescription: "Free mortgage tax savings calculator. See how much you save from mortgage interest deductions.",
    icon: "dollar",
    inputs: [
      { id: "loanAmount", label: "Mortgage Amount", type: "number", defaultValue: 300000, prefix: "$" },
      { id: "rate", label: "Interest Rate (%)", type: "number", defaultValue: 6.5, suffix: "%", step: 0.1 },
      { id: "taxBracket", label: "Tax Bracket (%)", type: "number", defaultValue: 22, suffix: "%" },
      { id: "standardDeduction", label: "Standard Deduction", type: "number", defaultValue: 14600, prefix: "$" },
    ],
    calculate: (v) => {
      const annualInterest = v.loanAmount * (v.rate / 100);
      const taxSavings = annualInterest * (v.taxBracket / 100);
      const netBenefit = Math.max(annualInterest - v.standardDeduction, 0) * (v.taxBracket / 100);
      return [
        { label: "Potential Tax Savings", value: fmt0(taxSavings), highlight: true },
        { label: "Annual Interest", value: fmt0(annualInterest) },
        { label: "Savings Above Standard Deduction", value: fmt0(netBenefit) },
        { label: "Monthly Tax Benefit", value: fmt(netBenefit / 12) },
      ];
    },
    formula: { expression: "Savings = Interest × Tax Bracket %", variables: ["Only beneficial if itemizing exceeds standard deduction"] },
    howToUse: "Enter mortgage details and tax bracket.",
    faqs: [{ question: "Should I itemize for mortgage interest?", answer: "Only if your total itemized deductions (mortgage interest + state taxes + charity) exceed the standard deduction ($14,600 single, $29,200 married)." }],
    relatedCalcs: financeRelated("mortgage-tax-savings-calculator"),
  },
  {
    slug: "house-flip-profit-calculator", name: "House Flip Profit Calculator", category: "Finance", categorySlug: "finance", subcategory: "Real Estate Calculators",
    description: "Calculate potential profit from flipping a house including purchase, renovation, and selling costs.",
    metaDescription: "Free house flip calculator. Estimate profit from buying, renovating, and selling a property.",
    icon: "dollar",
    inputs: [
      { id: "purchasePrice", label: "Purchase Price", type: "number", defaultValue: 200000, prefix: "$" },
      { id: "renovationCost", label: "Renovation Cost", type: "number", defaultValue: 50000, prefix: "$" },
      { id: "holdingCosts", label: "Holding Costs (total)", type: "number", defaultValue: 15000, prefix: "$" },
      { id: "salePrice", label: "Expected Sale Price", type: "number", defaultValue: 325000, prefix: "$" },
      { id: "closingPct", label: "Closing/Agent Fees (%)", type: "number", defaultValue: 8, suffix: "%" },
    ],
    calculate: (v) => {
      const totalCost = v.purchasePrice + v.renovationCost + v.holdingCosts;
      const closingCosts = v.salePrice * (v.closingPct / 100);
      const netSale = v.salePrice - closingCosts;
      const profit = netSale - totalCost;
      const roi = (profit / totalCost) * 100;
      return [
        { label: "Net Profit", value: fmt0(profit), highlight: true },
        { label: "ROI", value: pct(roi) },
        { label: "Total Investment", value: fmt0(totalCost) },
        { label: "Net Sale Proceeds", value: fmt0(netSale) },
        { label: "Closing Costs", value: fmt0(closingCosts) },
      ];
    },
    formula: { expression: "Profit = Sale − Closing Fees − Purchase − Reno − Holding", variables: [] },
    howToUse: "Enter purchase price, renovation costs, holding costs, expected sale price, and fees.",
    faqs: [{ question: "What profit margin is good for flips?", answer: "Aim for 15-20% ROI minimum. The 70% rule: don't pay more than 70% of ARV minus repair costs." }],
    relatedCalcs: financeRelated("house-flip-profit-calculator"),
  },
  {
    slug: "rental-cash-flow-calculator", name: "Rental Cash Flow Calculator", category: "Finance", categorySlug: "finance", subcategory: "Real Estate Calculators",
    description: "Calculate monthly cash flow from a rental property after all expenses and mortgage.",
    metaDescription: "Free rental cash flow calculator. Determine monthly profit from rental property investments.",
    icon: "dollar",
    inputs: [
      { id: "monthlyRent", label: "Monthly Rent", type: "number", defaultValue: 2500, prefix: "$" },
      { id: "mortgage", label: "Monthly Mortgage", type: "number", defaultValue: 1500, prefix: "$" },
      { id: "propertyTax", label: "Monthly Property Tax", type: "number", defaultValue: 300, prefix: "$" },
      { id: "insurance", label: "Monthly Insurance", type: "number", defaultValue: 100, prefix: "$" },
      { id: "maintenance", label: "Monthly Maintenance", type: "number", defaultValue: 150, prefix: "$" },
      { id: "vacancy", label: "Vacancy Rate (%)", type: "number", defaultValue: 5, suffix: "%" },
    ],
    calculate: (v) => {
      const effectiveRent = v.monthlyRent * (1 - v.vacancy / 100);
      const totalExpenses = v.mortgage + v.propertyTax + v.insurance + v.maintenance;
      const cashFlow = effectiveRent - totalExpenses;
      return [
        { label: "Monthly Cash Flow", value: fmt(cashFlow), highlight: true },
        { label: "Annual Cash Flow", value: fmt0(cashFlow * 12) },
        { label: "Effective Rent", value: fmt(effectiveRent) },
        { label: "Total Expenses", value: fmt(totalExpenses) },
        { label: "Cash Flow Margin", value: pct((cashFlow / effectiveRent) * 100) },
      ];
    },
    formula: { expression: "Cash Flow = Effective Rent − All Expenses", variables: ["Effective Rent = Rent × (1 − Vacancy%)"] },
    howToUse: "Enter monthly rent, all expenses, and vacancy rate.",
    faqs: [{ question: "What is positive cash flow?", answer: "When rent exceeds all expenses. Even $100/month positive is good, as you're also building equity and getting appreciation." }],
    relatedCalcs: financeRelated("rental-cash-flow-calculator"),
  },

  // ═══════════════════════════════════════════
  // CRYPTO FINANCE CALCULATORS
  // ═══════════════════════════════════════════
  {
    slug: "crypto-profit-calculator", name: "Crypto Profit Calculator", category: "Finance", categorySlug: "finance", subcategory: "Crypto Finance Calculators",
    description: "Calculate your cryptocurrency profit or loss from buying and selling digital assets.",
    metaDescription: "Free crypto profit calculator. Calculate gains and losses from cryptocurrency trades.",
    icon: "dollar",
    inputs: [
      { id: "buyPrice", label: "Buy Price Per Coin", type: "number", defaultValue: 30000, prefix: "$" },
      { id: "sellPrice", label: "Current/Sell Price", type: "number", defaultValue: 45000, prefix: "$" },
      { id: "quantity", label: "Quantity", type: "number", defaultValue: 0.5, step: 0.01 },
      { id: "buyFee", label: "Buy Fee (%)", type: "number", defaultValue: 0.5, suffix: "%", step: 0.1 },
      { id: "sellFee", label: "Sell Fee (%)", type: "number", defaultValue: 0.5, suffix: "%", step: 0.1 },
    ],
    calculate: (v) => {
      const totalBuy = v.buyPrice * v.quantity * (1 + v.buyFee / 100);
      const totalSell = v.sellPrice * v.quantity * (1 - v.sellFee / 100);
      const profit = totalSell - totalBuy;
      const roi = (profit / totalBuy) * 100;
      return [
        { label: profit >= 0 ? "Profit" : "Loss", value: fmt(Math.abs(profit)), highlight: true },
        { label: "ROI", value: pct(roi) },
        { label: "Total Invested", value: fmt(totalBuy) },
        { label: "Current Value", value: fmt(totalSell) },
      ];
    },
    formula: { expression: "Profit = (Sell × Qty × (1−Fee%)) − (Buy × Qty × (1+Fee%))", variables: [] },
    howToUse: "Enter buy price, sell price, quantity, and trading fees.",
    faqs: [{ question: "Are crypto gains taxed?", answer: "Yes, crypto is treated as property by the IRS. Short-term gains taxed as income, long-term at capital gains rates." }],
    relatedCalcs: financeRelated("crypto-profit-calculator"),
  },
  {
    slug: "crypto-mining-calculator", name: "Crypto Mining Calculator", category: "Finance", categorySlug: "finance", subcategory: "Crypto Finance Calculators",
    description: "Calculate cryptocurrency mining profitability based on hash rate, power costs, and coin price.",
    metaDescription: "Free crypto mining calculator. Estimate mining profitability with electricity and hardware costs.",
    icon: "dollar",
    inputs: [
      { id: "hashRate", label: "Hash Rate (TH/s)", type: "number", defaultValue: 100, step: 1 },
      { id: "powerConsumption", label: "Power (Watts)", type: "number", defaultValue: 3250 },
      { id: "electricityCost", label: "Electricity ($/kWh)", type: "number", defaultValue: 0.10, prefix: "$", step: 0.01 },
      { id: "dailyReward", label: "Daily Reward (coins)", type: "number", defaultValue: 0.0005, step: 0.0001 },
      { id: "coinPrice", label: "Coin Price", type: "number", defaultValue: 45000, prefix: "$" },
    ],
    calculate: (v) => {
      const dailyPower = (v.powerConsumption / 1000) * 24 * v.electricityCost;
      const dailyRevenue = v.dailyReward * v.coinPrice;
      const dailyProfit = dailyRevenue - dailyPower;
      return [
        { label: "Daily Profit", value: fmt(dailyProfit), highlight: true },
        { label: "Monthly Profit", value: fmt(dailyProfit * 30) },
        { label: "Daily Revenue", value: fmt(dailyRevenue) },
        { label: "Daily Power Cost", value: fmt(dailyPower) },
        { label: "Annual Profit", value: fmt0(dailyProfit * 365) },
      ];
    },
    formula: { expression: "Profit = (Reward × Price) − (Power × Hours × Rate)", variables: [] },
    howToUse: "Enter hash rate, power consumption, electricity cost, daily reward, and coin price.",
    faqs: [{ question: "Is mining still profitable?", answer: "Depends on electricity costs, hardware efficiency, and coin price. Locations with cheap power (<$0.05/kWh) have the best margins." }],
    relatedCalcs: financeRelated("crypto-mining-calculator"),
  },
  {
    slug: "staking-reward-calculator", name: "Staking Reward Calculator", category: "Finance", categorySlug: "finance", subcategory: "Crypto Finance Calculators",
    description: "Calculate potential staking rewards and annual yield for proof-of-stake cryptocurrencies.",
    metaDescription: "Free crypto staking calculator. Estimate staking rewards and APY for PoS coins.",
    icon: "dollar",
    inputs: [
      { id: "stakedAmount", label: "Amount Staked", type: "number", defaultValue: 10000, prefix: "$" },
      { id: "apy", label: "Staking APY (%)", type: "number", defaultValue: 5, suffix: "%", step: 0.1 },
      { id: "compoundFreq", label: "Compounds Per Year", type: "number", defaultValue: 365 },
      { id: "years", label: "Duration (years)", type: "number", defaultValue: 3 },
    ],
    calculate: (v) => {
      const fv = v.stakedAmount * Math.pow(1 + (v.apy / 100) / v.compoundFreq, v.compoundFreq * v.years);
      const rewards = fv - v.stakedAmount;
      const effectiveAPY = (Math.pow(fv / v.stakedAmount, 1 / v.years) - 1) * 100;
      return [
        { label: "Total Value", value: fmt(fv), highlight: true },
        { label: "Total Rewards", value: fmt(rewards) },
        { label: "Monthly Rewards (avg)", value: fmt(rewards / (v.years * 12)) },
        { label: "Effective APY", value: pct(effectiveAPY) },
      ];
    },
    formula: { expression: "FV = Staked × (1 + APY/n)^(n×t)", variables: ["n = compounding frequency"] },
    howToUse: "Enter staked amount, APY, compounding frequency, and duration.",
    faqs: [{ question: "Is staking safe?", answer: "Risks include: validator slashing, lock-up periods, coin price drops, and smart contract bugs. Choose established networks." }],
    relatedCalcs: financeRelated("staking-reward-calculator"),
  },
  {
    slug: "nft-profit-calculator", name: "NFT Profit Calculator", category: "Finance", categorySlug: "finance", subcategory: "Crypto Finance Calculators",
    description: "Calculate profit or loss from NFT trades including gas fees and marketplace commissions.",
    metaDescription: "Free NFT profit calculator. Calculate gains from NFT trades with fees and royalties.",
    icon: "dollar",
    inputs: [
      { id: "buyPrice", label: "Purchase Price", type: "number", defaultValue: 0.5, step: 0.01 },
      { id: "sellPrice", label: "Sale Price", type: "number", defaultValue: 1.2, step: 0.01 },
      { id: "ethPrice", label: "ETH Price (USD)", type: "number", defaultValue: 3000, prefix: "$" },
      { id: "gasFees", label: "Gas Fees (ETH)", type: "number", defaultValue: 0.02, step: 0.001 },
      { id: "royalty", label: "Creator Royalty (%)", type: "number", defaultValue: 5, suffix: "%" },
      { id: "platformFee", label: "Platform Fee (%)", type: "number", defaultValue: 2.5, suffix: "%" },
    ],
    calculate: (v) => {
      const sellAfterFees = v.sellPrice * (1 - (v.royalty + v.platformFee) / 100);
      const profitETH = sellAfterFees - v.buyPrice - v.gasFees;
      const profitUSD = profitETH * v.ethPrice;
      const roi = (profitETH / (v.buyPrice + v.gasFees)) * 100;
      return [
        { label: "Profit (ETH)", value: `${profitETH.toFixed(4)} ETH`, highlight: true },
        { label: "Profit (USD)", value: fmt(profitUSD) },
        { label: "ROI", value: pct(roi) },
        { label: "Fees Paid (ETH)", value: `${(v.sellPrice - sellAfterFees + v.gasFees).toFixed(4)} ETH` },
      ];
    },
    formula: { expression: "Profit = Sell×(1−Royalty−Platform) − Buy − Gas", variables: [] },
    howToUse: "Enter buy/sell prices in ETH, ETH price, gas fees, and marketplace fees.",
    faqs: [{ question: "What fees do NFT sellers pay?", answer: "Typically 2.5% platform fee + 0-10% creator royalty + gas fees for blockchain transactions." }],
    relatedCalcs: financeRelated("nft-profit-calculator"),
  },
  {
    slug: "bitcoin-halving-calculator", name: "Bitcoin Halving Calculator", category: "Finance", categorySlug: "finance", subcategory: "Crypto Finance Calculators",
    description: "Calculate the impact of Bitcoin halvings on mining rewards and supply over time.",
    metaDescription: "Free Bitcoin halving calculator. See how halvings reduce mining rewards and affect supply.",
    icon: "dollar",
    inputs: [
      { id: "currentReward", label: "Current Block Reward (BTC)", type: "number", defaultValue: 3.125, step: 0.001 },
      { id: "blocksPerDay", label: "Blocks Per Day", type: "number", defaultValue: 144 },
      { id: "halvingsAhead", label: "Halvings to Calculate", type: "number", defaultValue: 3 },
      { id: "btcPrice", label: "Current BTC Price", type: "number", defaultValue: 45000, prefix: "$" },
    ],
    calculate: (v) => {
      const results: { label: string; value: string; highlight?: boolean }[] = [];
      let reward = v.currentReward;
      const dailyBTC = v.blocksPerDay * reward;
      results.push({ label: "Current Daily Mining", value: `${dailyBTC.toFixed(2)} BTC (${fmt0(dailyBTC * v.btcPrice)})`, highlight: true });
      for (let h = 1; h <= v.halvingsAhead; h++) {
        reward /= 2;
        const daily = v.blocksPerDay * reward;
        results.push({ label: `After Halving ${h}`, value: `${reward.toFixed(4)} BTC/block → ${daily.toFixed(2)} BTC/day` });
      }
      results.push({ label: "Annual New Supply (current)", value: `${(dailyBTC * 365).toFixed(0)} BTC` });
      return results;
    },
    formula: { expression: "Reward halves every ~210,000 blocks (~4 years)", variables: ["Max supply: 21 million BTC"] },
    howToUse: "Enter current block reward and number of future halvings to project.",
    faqs: [{ question: "When is the next halving?", answer: "Halvings occur roughly every 4 years. Each halving cuts the block reward in half, reducing new supply." }],
    relatedCalcs: financeRelated("bitcoin-halving-calculator"),
  },

  // ═══════════════════════════════════════════
  // WEALTH & GENERAL CALCULATORS
  // ═══════════════════════════════════════════
  {
    slug: "millionaire-calculator", name: "Millionaire Calculator", category: "Finance", categorySlug: "finance", subcategory: "Investment Calculators",
    description: "Calculate how long it will take to become a millionaire based on savings and investment returns.",
    metaDescription: "Free millionaire calculator. Find how long until you reach $1 million through saving and investing.",
    icon: "dollar",
    inputs: [
      { id: "currentSavings", label: "Current Savings", type: "number", defaultValue: 10000, prefix: "$" },
      { id: "monthlyContribution", label: "Monthly Contribution", type: "number", defaultValue: 1000, prefix: "$" },
      { id: "returnRate", label: "Annual Return (%)", type: "number", defaultValue: 8, suffix: "%", step: 0.5 },
      { id: "goal", label: "Goal Amount", type: "number", defaultValue: 1000000, prefix: "$" },
    ],
    calculate: (v) => {
      const r = v.returnRate / 100 / 12;
      let bal = v.currentSavings, months = 0;
      while (bal < v.goal && months < 1200) { bal = bal * (1 + r) + v.monthlyContribution; months++; }
      const totalContributed = v.currentSavings + v.monthlyContribution * months;
      return [
        { label: "Time to Goal", value: months >= 1200 ? "100+ years" : `${Math.floor(months / 12)} yrs ${months % 12} mos`, highlight: true },
        { label: "Total Contributed", value: fmt0(totalContributed) },
        { label: "Investment Growth", value: fmt0(v.goal - totalContributed) },
        { label: "Growth %", value: pct(((v.goal - totalContributed) / totalContributed) * 100) },
      ];
    },
    formula: { expression: "Compound monthly until goal is reached", variables: [] },
    howToUse: "Enter current savings, monthly contribution, return rate, and goal.",
    faqs: [{ question: "Can anyone become a millionaire?", answer: "With consistent investing, yes. $500/month at 8% return reaches $1M in ~30 years. Starting early is key due to compounding." }],
    relatedCalcs: financeRelated("millionaire-calculator"),
  },
  {
    slug: "rule-of-72-calculator", name: "Rule of 72 Calculator", category: "Finance", categorySlug: "finance", subcategory: "Investment Calculators",
    description: "Quickly estimate how long it takes to double your money using the Rule of 72.",
    metaDescription: "Free Rule of 72 calculator. Estimate doubling time for any investment return rate.",
    icon: "dollar",
    inputs: [
      { id: "returnRate", label: "Annual Return (%)", type: "number", defaultValue: 8, suffix: "%", step: 0.5 },
      { id: "amount", label: "Starting Amount", type: "number", defaultValue: 10000, prefix: "$" },
    ],
    calculate: (v) => {
      const doublingTime = 72 / v.returnRate;
      const exactTime = Math.log(2) / Math.log(1 + v.returnRate / 100);
      const doubled = v.amount * 2;
      const quadrupled = v.amount * 4;
      return [
        { label: "Doubling Time (Rule of 72)", value: `${doublingTime.toFixed(1)} years`, highlight: true },
        { label: "Exact Doubling Time", value: `${exactTime.toFixed(1)} years` },
        { label: "Doubled Amount", value: fmt0(doubled) },
        { label: "Quadrupled (2× doubling)", value: `${(doublingTime * 2).toFixed(1)} years → ${fmt0(quadrupled)}` },
      ];
    },
    formula: { expression: "Years to Double ≈ 72 / Annual Return %", variables: ["Quick mental math approximation"] },
    howToUse: "Enter the annual return rate to estimate doubling time.",
    faqs: [{ question: "How accurate is the Rule of 72?", answer: "Very accurate for rates between 6-10%. For exact calculation, use ln(2)/ln(1+r)." }],
    relatedCalcs: financeRelated("rule-of-72-calculator"),
  },
  {
    slug: "inflation-adjusted-return-calculator", name: "Inflation Adjusted Return Calculator", category: "Finance", categorySlug: "finance", subcategory: "Investment Calculators",
    description: "Calculate the real (inflation-adjusted) return on your investments.",
    metaDescription: "Free inflation-adjusted return calculator. Find your real investment return after inflation.",
    icon: "dollar",
    inputs: [
      { id: "nominalReturn", label: "Nominal Return (%)", type: "number", defaultValue: 10, suffix: "%", step: 0.5 },
      { id: "inflationRate", label: "Inflation Rate (%)", type: "number", defaultValue: 3, suffix: "%", step: 0.5 },
      { id: "investment", label: "Investment Amount", type: "number", defaultValue: 100000, prefix: "$" },
      { id: "years", label: "Years", type: "number", defaultValue: 20 },
    ],
    calculate: (v) => {
      const realReturn = ((1 + v.nominalReturn / 100) / (1 + v.inflationRate / 100) - 1) * 100;
      const nominalFV = v.investment * Math.pow(1 + v.nominalReturn / 100, v.years);
      const realFV = v.investment * Math.pow(1 + realReturn / 100, v.years);
      return [
        { label: "Real Return", value: pct(realReturn), highlight: true },
        { label: "Nominal FV", value: fmt0(nominalFV) },
        { label: "Real FV (today's dollars)", value: fmt0(realFV) },
        { label: "Purchasing Power Loss", value: fmt0(nominalFV - realFV) },
      ];
    },
    formula: { expression: "Real Return = (1+Nominal)/(1+Inflation) − 1", variables: [] },
    howToUse: "Enter nominal return, inflation rate, investment amount, and time period.",
    faqs: [{ question: "Why does real return matter?", answer: "Inflation erodes purchasing power. A 10% return with 3% inflation is really ~6.8% in today's dollars." }],
    relatedCalcs: financeRelated("inflation-adjusted-return-calculator"),
  },
  {
    slug: "time-value-of-money-calculator", name: "Time Value of Money Calculator", category: "Finance", categorySlug: "finance", subcategory: "Investment Calculators",
    description: "Calculate the present or future value of money based on interest rates and time periods.",
    metaDescription: "Free time value of money calculator. Convert between present and future value of money.",
    icon: "dollar",
    inputs: [
      { id: "presentValue", label: "Present Value", type: "number", defaultValue: 10000, prefix: "$" },
      { id: "rate", label: "Interest Rate (%)", type: "number", defaultValue: 6, suffix: "%", step: 0.5 },
      { id: "years", label: "Number of Years", type: "number", defaultValue: 10 },
      { id: "compounding", label: "Compounding", type: "select", defaultValue: 1, options: [{ value: 1, label: "Annual" }, { value: 4, label: "Quarterly" }, { value: 12, label: "Monthly" }] },
    ],
    calculate: (v) => {
      const fv = v.presentValue * Math.pow(1 + (v.rate / 100) / v.compounding, v.compounding * v.years);
      const pvFromFV = fv / Math.pow(1 + (v.rate / 100) / v.compounding, v.compounding * v.years);
      return [
        { label: "Future Value", value: fmt(fv), highlight: true },
        { label: "Interest Earned", value: fmt(fv - v.presentValue) },
        { label: "Growth Multiple", value: `${(fv / v.presentValue).toFixed(2)}×` },
        { label: "Effective Annual Rate", value: pct((Math.pow(1 + (v.rate / 100) / v.compounding, v.compounding) - 1) * 100) },
      ];
    },
    formula: { expression: "FV = PV × (1 + r/n)^(n×t)", variables: ["n = compounding periods per year"] },
    howToUse: "Enter present value, interest rate, years, and compounding frequency.",
    faqs: [{ question: "What is TVM?", answer: "A dollar today is worth more than a dollar tomorrow because it can earn interest. TVM quantifies this principle." }],
    relatedCalcs: financeRelated("time-value-of-money-calculator"),
  },
  {
    slug: "financial-goal-calculator", name: "Financial Goal Calculator", category: "Finance", categorySlug: "finance", subcategory: "Personal Finance Calculators",
    description: "Calculate the monthly savings needed to reach any financial goal by a target date.",
    metaDescription: "Free financial goal calculator. Find the monthly savings needed for any financial target.",
    icon: "dollar",
    inputs: [
      { id: "goalAmount", label: "Goal Amount", type: "number", defaultValue: 50000, prefix: "$" },
      { id: "currentSavings", label: "Current Savings", type: "number", defaultValue: 5000, prefix: "$" },
      { id: "months", label: "Months to Goal", type: "number", defaultValue: 36 },
      { id: "returnRate", label: "Expected Return (%)", type: "number", defaultValue: 5, suffix: "%", step: 0.5 },
    ],
    calculate: (v) => {
      const r = v.returnRate / 100 / 12;
      const fvCurrent = v.currentSavings * Math.pow(1 + r, v.months);
      const gap = v.goalAmount - fvCurrent;
      const monthly = gap > 0 && r > 0 ? gap / ((Math.pow(1 + r, v.months) - 1) / r) : gap > 0 ? gap / v.months : 0;
      return [
        { label: "Monthly Savings Needed", value: fmt(monthly), highlight: true },
        { label: "Current Savings Will Grow To", value: fmt(fvCurrent) },
        { label: "Total You'll Save", value: fmt0(monthly * v.months + v.currentSavings) },
        { label: "Interest Earned", value: fmt0(v.goalAmount - monthly * v.months - v.currentSavings) },
      ];
    },
    formula: { expression: "PMT = (Goal − FV current) / [(1+r)^n−1]/r", variables: [] },
    howToUse: "Enter your goal, current savings, timeline, and expected return.",
    faqs: [{ question: "What goals should I prioritize?", answer: "Emergency fund → high-interest debt payoff → employer 401k match → other savings goals." }],
    relatedCalcs: financeRelated("financial-goal-calculator"),
  },
  {
    slug: "passive-income-calculator", name: "Passive Income Calculator", category: "Finance", categorySlug: "finance", subcategory: "Investment Calculators",
    description: "Calculate how much investment capital you need to generate your desired passive income.",
    metaDescription: "Free passive income calculator. Find the investment needed for your desired monthly passive income.",
    icon: "dollar",
    inputs: [
      { id: "desiredMonthly", label: "Desired Monthly Income", type: "number", defaultValue: 3000, prefix: "$" },
      { id: "returnRate", label: "Annual Return/Yield (%)", type: "number", defaultValue: 5, suffix: "%", step: 0.25 },
    ],
    calculate: (v) => {
      const annualIncome = v.desiredMonthly * 12;
      const capitalNeeded = annualIncome / (v.returnRate / 100);
      return [
        { label: "Capital Needed", value: fmt0(capitalNeeded), highlight: true },
        { label: "Annual Income", value: fmt0(annualIncome) },
        { label: "At 4% Yield", value: fmt0(annualIncome / 0.04) },
        { label: "At 6% Yield", value: fmt0(annualIncome / 0.06) },
      ];
    },
    formula: { expression: "Capital = Annual Income / Yield %", variables: [] },
    howToUse: "Enter desired monthly passive income and expected return/yield.",
    faqs: [{ question: "What generates passive income?", answer: "Dividend stocks (2-5%), bonds (4-6%), REITs (3-8%), rental properties (5-12%), and peer-to-peer lending." }],
    relatedCalcs: financeRelated("passive-income-calculator"),
  },
  {
    slug: "wealth-growth-calculator", name: "Wealth Growth Calculator", category: "Finance", categorySlug: "finance", subcategory: "Investment Calculators",
    description: "Project your total wealth growth over time with income growth, savings, and investment returns.",
    metaDescription: "Free wealth growth calculator. Project total wealth accumulation over your career.",
    icon: "dollar",
    inputs: [
      { id: "currentWealth", label: "Current Net Worth", type: "number", defaultValue: 50000, prefix: "$" },
      { id: "annualSavings", label: "Annual Savings", type: "number", defaultValue: 20000, prefix: "$" },
      { id: "savingsGrowth", label: "Savings Growth (%/yr)", type: "number", defaultValue: 3, suffix: "%", step: 0.5 },
      { id: "returnRate", label: "Investment Return (%)", type: "number", defaultValue: 7, suffix: "%", step: 0.5 },
      { id: "years", label: "Years", type: "number", defaultValue: 30 },
    ],
    calculate: (v) => {
      let wealth = v.currentWealth;
      let savings = v.annualSavings;
      let totalSaved = v.currentWealth;
      for (let y = 0; y < v.years; y++) {
        wealth = (wealth + savings) * (1 + v.returnRate / 100);
        totalSaved += savings;
        savings *= 1 + v.savingsGrowth / 100;
      }
      return [
        { label: "Projected Wealth", value: fmt0(wealth), highlight: true },
        { label: "Total Saved", value: fmt0(totalSaved) },
        { label: "Investment Growth", value: fmt0(wealth - totalSaved) },
        { label: "Growth Multiple", value: `${(wealth / v.currentWealth).toFixed(1)}×` },
      ];
    },
    formula: { expression: "Wealth = Σ((Balance + Savings) × (1+Return))", variables: ["Savings increase annually"] },
    howToUse: "Enter current wealth, annual savings, growth rates, and time period.",
    faqs: [{ question: "How does savings growth help?", answer: "Increasing savings by 3%/year (matching raises) dramatically accelerates wealth building due to compounding." }],
    relatedCalcs: financeRelated("wealth-growth-calculator"),
  },
];
