import { CalculatorConfig } from "@/components/CalculatorTemplate";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);
const fmt0 = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

const realEstateRelated = (exclude: string) => [
  { name: "Property Tax Calculator", slug: "property-tax-calculator", icon: "home", category: "realestate" },
  { name: "Rent vs Buy Calculator", slug: "rent-vs-buy-calculator", icon: "home", category: "realestate" },
  { name: "ROI Calculator", slug: "real-estate-roi-calculator", icon: "home", category: "realestate" },
  { name: "Square Footage Calculator", slug: "square-footage-calculator", icon: "home", category: "realestate" },
].filter((c) => c.slug !== exclude);

export const realEstateCalculators: CalculatorConfig[] = [
  {
    slug: "property-tax-calculator",
    name: "Property Tax Calculator",
    category: "Real Estate",
    categorySlug: "realestate",
    description: "Estimate your annual and monthly property tax payments based on home value and local tax rate.",
    metaDescription: "Free property tax calculator. Estimate annual and monthly property taxes based on your home's assessed value and local tax rate.",
    icon: "home",
    inputs: [
      { id: "homeValue", label: "Home Value", type: "number", defaultValue: 350000, prefix: "$" },
      { id: "taxRate", label: "Tax Rate (%)", type: "number", defaultValue: 1.1, suffix: "%", step: 0.01 },
      { id: "exemption", label: "Exemptions", type: "number", defaultValue: 0, prefix: "$" },
    ],
    calculate: (v) => {
      const taxableValue = Math.max(0, v.homeValue - v.exemption);
      const annualTax = taxableValue * (v.taxRate / 100);
      const monthlyTax = annualTax / 12;
      return [
        { label: "Annual Property Tax", value: fmt0(annualTax), highlight: true },
        { label: "Monthly Property Tax", value: fmt(monthlyTax) },
        { label: "Taxable Value", value: fmt0(taxableValue) },
        { label: "Effective Rate", value: ((annualTax / v.homeValue) * 100).toFixed(2) + "%" },
      ];
    },
    formula: { expression: "Tax = (Home Value - Exemptions) × Rate", variables: ["Home Value = Assessed property value", "Rate = Local property tax rate", "Exemptions = Homestead or other exemptions"] },
    howToUse: "Enter your home's assessed value, local property tax rate, and any exemptions you qualify for.",
    faqs: [
      { question: "What is the average US property tax rate?", answer: "The average effective property tax rate in the US is about 1.1%, but it varies significantly by state. New Jersey has the highest at ~2.5%, while Hawaii is lowest at ~0.3%." },
      { question: "What exemptions might I qualify for?", answer: "Common exemptions include homestead exemptions, senior citizen exemptions, veteran exemptions, and disability exemptions. Check with your local tax assessor's office." },
    ],
    relatedCalcs: realEstateRelated("property-tax-calculator"),
  },
  {
    slug: "rent-vs-buy-calculator",
    name: "Rent vs Buy Calculator",
    category: "Real Estate",
    categorySlug: "realestate",
    description: "Compare the financial impact of renting versus buying a home over time to make a smarter housing decision.",
    metaDescription: "Free rent vs buy calculator. Compare total costs of renting versus buying a home over 5-30 years. Make informed housing decisions.",
    icon: "home",
    inputs: [
      { id: "homePrice", label: "Home Price", type: "number", defaultValue: 350000, prefix: "$" },
      { id: "rent", label: "Monthly Rent", type: "number", defaultValue: 2000, prefix: "$" },
      { id: "downPayment", label: "Down Payment (%)", type: "number", defaultValue: 20, suffix: "%" },
      { id: "rate", label: "Mortgage Rate (%)", type: "number", defaultValue: 6.5, suffix: "%", step: 0.1 },
      { id: "years", label: "Time Period (years)", type: "number", defaultValue: 10, min: 1, max: 30 },
    ],
    calculate: (v) => {
      const downAmt = v.homePrice * (v.downPayment / 100);
      const loanAmt = v.homePrice - downAmt;
      const r = v.rate / 100 / 12;
      const n = 30 * 12;
      const monthly = r > 0 ? (loanAmt * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : loanAmt / n;
      const totalBuyCost = downAmt + (monthly * v.years * 12);
      const totalRentCost = v.rent * v.years * 12;
      const savings = totalRentCost - totalBuyCost;
      return [
        { label: "Total Buying Cost", value: fmt0(totalBuyCost), highlight: true },
        { label: "Total Renting Cost", value: fmt0(totalRentCost) },
        { label: "Monthly Mortgage", value: fmt(monthly) },
        { label: savings >= 0 ? "Buying Saves" : "Renting Saves", value: fmt0(Math.abs(savings)) },
      ];
    },
    formula: { expression: "Buy Cost = Down Payment + (Monthly × Months)", variables: ["Down Payment = Home Price × Down %", "Monthly = Mortgage payment", "Rent Cost = Monthly Rent × Months"] },
    howToUse: "Enter the home price, monthly rent, down payment percentage, mortgage rate, and the number of years to compare.",
    faqs: [
      { question: "Is it always better to buy?", answer: "Not always. Buying makes more financial sense when you plan to stay 5+ years, have a stable income, and can afford the down payment. Renting offers flexibility and lower upfront costs." },
      { question: "What costs are not included?", answer: "This simplified comparison doesn't include property taxes, insurance, maintenance (1-2% of home value/year), HOA fees, closing costs, or potential home value appreciation." },
    ],
    relatedCalcs: realEstateRelated("rent-vs-buy-calculator"),
  },
  {
    slug: "real-estate-roi-calculator",
    name: "Real Estate ROI Calculator",
    category: "Real Estate",
    categorySlug: "realestate",
    description: "Calculate return on investment for rental properties including purchase price, rental income, and expenses.",
    metaDescription: "Free real estate ROI calculator. Calculate investment property returns including cap rate, cash-on-cash return, and annual profit.",
    icon: "home",
    inputs: [
      { id: "purchasePrice", label: "Purchase Price", type: "number", defaultValue: 250000, prefix: "$" },
      { id: "monthlyRent", label: "Monthly Rental Income", type: "number", defaultValue: 2200, prefix: "$" },
      { id: "monthlyExpenses", label: "Monthly Expenses", type: "number", defaultValue: 800, prefix: "$" },
      { id: "downPayment", label: "Down Payment", type: "number", defaultValue: 50000, prefix: "$" },
    ],
    calculate: (v) => {
      const annualIncome = v.monthlyRent * 12;
      const annualExpenses = v.monthlyExpenses * 12;
      const noi = annualIncome - annualExpenses;
      const capRate = (noi / v.purchasePrice) * 100;
      const cashOnCash = (noi / v.downPayment) * 100;
      return [
        { label: "Net Operating Income", value: fmt0(noi), highlight: true },
        { label: "Cap Rate", value: capRate.toFixed(2) + "%" },
        { label: "Cash-on-Cash Return", value: cashOnCash.toFixed(2) + "%" },
        { label: "Annual Gross Income", value: fmt0(annualIncome) },
      ];
    },
    formula: { expression: "Cap Rate = NOI ÷ Purchase Price × 100", variables: ["NOI = Annual Income − Annual Expenses", "Cash-on-Cash = NOI ÷ Down Payment × 100"] },
    howToUse: "Enter the purchase price, expected monthly rent, monthly expenses (taxes, insurance, maintenance), and your down payment.",
    faqs: [
      { question: "What is a good cap rate?", answer: "A cap rate of 5-10% is generally considered good for rental properties. Higher cap rates indicate higher potential returns but may also indicate higher risk." },
      { question: "What expenses should I include?", answer: "Include property taxes, insurance, maintenance (budget 1% of value/year), vacancy allowance (5-10%), property management (8-10% of rent), and HOA fees if applicable." },
    ],
    relatedCalcs: realEstateRelated("real-estate-roi-calculator"),
  },
  {
    slug: "square-footage-calculator",
    name: "Square Footage Calculator",
    category: "Real Estate",
    categorySlug: "realestate",
    description: "Calculate the square footage of a room or property and estimate costs based on price per square foot.",
    metaDescription: "Free square footage calculator. Calculate area in square feet for rooms, homes, and lots. Estimate costs based on price per square foot.",
    icon: "home",
    inputs: [
      { id: "length", label: "Length (feet)", type: "number", defaultValue: 20 },
      { id: "width", label: "Width (feet)", type: "number", defaultValue: 15 },
      { id: "pricePerSqFt", label: "Price per Sq Ft ($)", type: "number", defaultValue: 150, prefix: "$" },
    ],
    calculate: (v) => {
      const sqFt = v.length * v.width;
      const sqM = sqFt * 0.0929;
      const totalCost = sqFt * v.pricePerSqFt;
      return [
        { label: "Area", value: sqFt.toLocaleString() + " sq ft", highlight: true },
        { label: "Area (metric)", value: sqM.toFixed(1) + " sq m" },
        { label: "Estimated Value", value: fmt0(totalCost) },
      ];
    },
    formula: { expression: "Area = Length × Width", variables: ["Length = Room length in feet", "Width = Room width in feet", "1 sq ft = 0.0929 sq m"] },
    howToUse: "Measure the length and width of the space in feet. Enter the price per square foot to estimate property or renovation costs.",
    faqs: [
      { question: "How is price per square foot determined?", answer: "It varies by location, property type, and market conditions. Check recent comparable sales in your area. The US average for new construction is about $150/sq ft." },
      { question: "How do I measure an irregular room?", answer: "Break the room into rectangles, calculate each area separately, then add them together. For L-shaped rooms, split into two rectangles." },
    ],
    relatedCalcs: realEstateRelated("square-footage-calculator"),
  },
  {
    slug: "stamp-duty-calculator",
    name: "Stamp Duty Calculator",
    category: "Real Estate",
    categorySlug: "realestate",
    description: "Estimate stamp duty (transfer tax) on property purchases based on purchase price and applicable rates.",
    metaDescription: "Free stamp duty calculator. Estimate property transfer taxes for the UK, Australia, and US real estate purchases.",
    icon: "home",
    inputs: [
      { id: "price", label: "Property Price", type: "number", defaultValue: 400000, prefix: "$" },
      { id: "rate", label: "Stamp Duty Rate (%)", type: "number", defaultValue: 2.5, suffix: "%", step: 0.1 },
      { id: "firstHome", label: "First-Time Buyer Discount (%)", type: "number", defaultValue: 0, suffix: "%", step: 0.5 },
    ],
    calculate: (v) => {
      const baseStampDuty = v.price * (v.rate / 100);
      const discount = baseStampDuty * (v.firstHome / 100);
      const finalDuty = baseStampDuty - discount;
      const effectiveRate = (finalDuty / v.price) * 100;
      return [
        { label: "Stamp Duty Payable", value: fmt0(finalDuty), highlight: true },
        { label: "Before Discount", value: fmt0(baseStampDuty) },
        { label: "Discount Amount", value: fmt0(discount) },
        { label: "Effective Rate", value: effectiveRate.toFixed(2) + "%" },
      ];
    },
    formula: { expression: "Duty = Price × Rate − Discount", variables: ["Price = Purchase price", "Rate = Stamp duty rate", "Discount = First-time buyer reduction"] },
    howToUse: "Enter the property purchase price, the applicable stamp duty rate, and any first-time buyer discount percentage.",
    faqs: [
      { question: "What is stamp duty?", answer: "Stamp duty (or transfer tax) is a tax paid when purchasing property. In the UK it's called SDLT, in Australia it varies by state, and in the US it's called a transfer tax with rates varying by state and county." },
      { question: "Do first-time buyers get a discount?", answer: "Many jurisdictions offer first-time buyer relief. In England, first-time buyers pay no SDLT on properties up to £425,000. Check your local regulations." },
    ],
    relatedCalcs: realEstateRelated("stamp-duty-calculator"),
  },
];
