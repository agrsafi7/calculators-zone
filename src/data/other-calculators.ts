import { CalculatorConfig } from "@/components/CalculatorTemplate";

const fmt = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);
const fmt0 = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

const otherRelated = (exclude: string) => [
  { name: "Electricity Cost", slug: "electricity-cost-calculator", icon: "layers", category: "other" },
  { name: "Fuel Cost", slug: "fuel-cost-calculator", icon: "layers", category: "other" },
  { name: "Discount Calculator", slug: "discount-calculator", icon: "layers", category: "other" },
  { name: "Markup Calculator", slug: "markup-calculator", icon: "layers", category: "other" },
].filter(c => c.slug !== exclude);

export const otherCalculators: CalculatorConfig[] = [
  // === Migrated from Automotive ===
  {
    slug: "fuel-cost-calculator",
    name: "Fuel Cost Calculator",
    category: "Other Calculators",
    categorySlug: "other",
    description: "Estimate fuel costs for your trip based on distance, fuel efficiency, and gas price.",
    metaDescription: "Free fuel cost calculator. Estimate gas costs for any trip based on distance, MPG, and fuel price.",
    icon: "layers",
    inputs: [
      { id: "distance", label: "Distance (miles)", type: "number", defaultValue: 300 },
      { id: "mpg", label: "Fuel Efficiency (MPG)", type: "number", defaultValue: 28, step: 0.5 },
      { id: "price", label: "Gas Price ($/gallon)", type: "number", defaultValue: 3.5, prefix: "$", step: 0.01 },
    ],
    calculate: (v) => {
      const gallons = v.distance / v.mpg;
      const cost = gallons * v.price;
      const costPerMile = cost / v.distance;
      return [
        { label: "Total Fuel Cost", value: fmt(cost), highlight: true },
        { label: "Gallons Needed", value: gallons.toFixed(1) + " gal" },
        { label: "Cost Per Mile", value: fmt(costPerMile) },
      ];
    },
    formula: { expression: "Cost = (Distance ÷ MPG) × Price", variables: ["Distance = Trip distance in miles", "MPG = Miles per gallon", "Price = Price per gallon"] },
    howToUse: "Enter the trip distance, your vehicle's MPG, and the current gas price per gallon.",
    faqs: [
      { question: "How do I find my car's MPG?", answer: "Check the EPA sticker, your owner's manual, or fueleconomy.gov." },
    ],
    relatedCalcs: otherRelated("fuel-cost-calculator"),
  },
  {
    slug: "car-depreciation-calculator",
    name: "Car Depreciation Calculator",
    category: "Other Calculators",
    categorySlug: "other",
    description: "Estimate your car's value over time based on purchase price, age, and depreciation rate.",
    metaDescription: "Free car depreciation calculator. Estimate vehicle value after 1-10 years.",
    icon: "layers",
    inputs: [
      { id: "price", label: "Purchase Price", type: "number", defaultValue: 35000, prefix: "$" },
      { id: "years", label: "Years Owned", type: "number", defaultValue: 5, min: 1, max: 20 },
      { id: "rate", label: "Annual Depreciation (%)", type: "number", defaultValue: 15, suffix: "%", step: 0.5 },
    ],
    calculate: (v) => {
      const currentValue = v.price * Math.pow(1 - v.rate / 100, v.years);
      const totalLoss = v.price - currentValue;
      const annualLoss = totalLoss / v.years;
      return [
        { label: "Current Value", value: fmt0(currentValue), highlight: true },
        { label: "Total Depreciation", value: fmt0(totalLoss) },
        { label: "Avg Annual Loss", value: fmt0(annualLoss) },
        { label: "Value Retained", value: ((currentValue / v.price) * 100).toFixed(1) + "%" },
      ];
    },
    formula: { expression: "Value = Price × (1 - Rate)^Years", variables: ["Price = Original purchase price", "Rate = Annual depreciation rate", "Years = Number of years owned"] },
    howToUse: "Enter the car's purchase price, years owned, and annual depreciation rate.",
    faqs: [
      { question: "What is the average car depreciation rate?", answer: "Most cars depreciate 15-20% per year on average." },
    ],
    relatedCalcs: otherRelated("car-depreciation-calculator"),
  },
  {
    slug: "mpg-calculator",
    name: "MPG Calculator",
    category: "Other Calculators",
    categorySlug: "other",
    description: "Calculate your vehicle's miles per gallon fuel efficiency.",
    metaDescription: "Free MPG calculator. Calculate fuel efficiency by entering miles driven and gallons used.",
    icon: "layers",
    inputs: [
      { id: "miles", label: "Miles Driven", type: "number", defaultValue: 350 },
      { id: "gallons", label: "Gallons Used", type: "number", defaultValue: 12, step: 0.1 },
    ],
    calculate: (v) => {
      const mpg = v.miles / v.gallons;
      const kpl = mpg * 0.425144;
      const l100km = 235.215 / mpg;
      return [
        { label: "Fuel Efficiency", value: mpg.toFixed(1) + " MPG", highlight: true },
        { label: "Km per Liter", value: kpl.toFixed(1) + " km/L" },
        { label: "Liters per 100km", value: l100km.toFixed(1) + " L/100km" },
      ];
    },
    formula: { expression: "MPG = Miles ÷ Gallons", variables: ["Miles = Total miles driven", "Gallons = Total gallons consumed"] },
    howToUse: "Enter miles driven and gallons used between fill-ups.",
    faqs: [{ question: "What's a good MPG?", answer: "30+ MPG is good for passenger cars. Hybrids can achieve 40-60+ MPG." }],
    relatedCalcs: otherRelated("mpg-calculator"),
  },
  {
    slug: "tire-size-calculator",
    name: "Tire Size Calculator",
    category: "Other Calculators",
    categorySlug: "other",
    description: "Calculate tire diameter, circumference, and compare different tire sizes.",
    metaDescription: "Free tire size calculator. Calculate tire diameter and circumference for fitment.",
    icon: "layers",
    inputs: [
      { id: "width", label: "Tire Width (mm)", type: "number", defaultValue: 225 },
      { id: "aspect", label: "Aspect Ratio (%)", type: "number", defaultValue: 45 },
      { id: "rim", label: "Rim Diameter (inches)", type: "number", defaultValue: 17 },
    ],
    calculate: (v) => {
      const sidewall = (v.width * v.aspect / 100) / 25.4;
      const diameter = (sidewall * 2) + v.rim;
      const circumference = diameter * Math.PI;
      const revPerMile = 63360 / circumference;
      return [
        { label: "Overall Diameter", value: diameter.toFixed(1) + " in", highlight: true },
        { label: "Sidewall Height", value: sidewall.toFixed(1) + " in" },
        { label: "Circumference", value: circumference.toFixed(1) + " in" },
        { label: "Revs Per Mile", value: Math.round(revPerMile).toLocaleString() },
      ];
    },
    formula: { expression: "Diameter = (2 × Sidewall) + Rim", variables: ["Sidewall = Width × Aspect ÷ 2540", "Circumference = Diameter × π"] },
    howToUse: "Enter tire width in mm, aspect ratio, and rim diameter in inches.",
    faqs: [{ question: "What does 225/45R17 mean?", answer: "225mm width, 45% aspect ratio, Radial, 17 inch rim." }],
    relatedCalcs: otherRelated("tire-size-calculator"),
  },
  {
    slug: "engine-horsepower-calculator",
    name: "Engine Horsepower Calculator",
    category: "Other Calculators",
    categorySlug: "other",
    description: "Estimate engine horsepower using quarter-mile time and vehicle weight.",
    metaDescription: "Free horsepower calculator. Estimate HP using quarter-mile time and weight.",
    icon: "layers",
    inputs: [
      { id: "weight", label: "Vehicle Weight (lbs)", type: "number", defaultValue: 3500 },
      { id: "et", label: "Quarter-Mile ET (seconds)", type: "number", defaultValue: 13.5, step: 0.1 },
    ],
    calculate: (v) => {
      const hp = v.weight / Math.pow(v.et / 5.825, 3);
      const kw = hp * 0.7457;
      const powerToWeight = hp / (v.weight / 1000);
      return [
        { label: "Estimated Horsepower", value: Math.round(hp) + " HP", highlight: true },
        { label: "Power (kW)", value: kw.toFixed(0) + " kW" },
        { label: "HP per 1000 lbs", value: powerToWeight.toFixed(1) },
      ];
    },
    formula: { expression: "HP = Weight ÷ (ET ÷ 5.825)³", variables: ["Weight = Vehicle weight in lbs", "ET = Quarter-mile time in seconds"] },
    howToUse: "Enter vehicle weight and quarter-mile elapsed time.",
    faqs: [{ question: "How accurate is this?", answer: "It's an estimate. Actual dyno results may vary due to conditions." }],
    relatedCalcs: otherRelated("engine-horsepower-calculator"),
  },
  // === Migrated from Real Estate ===
  {
    slug: "property-tax-calculator",
    name: "Property Tax Calculator",
    category: "Other Calculators",
    categorySlug: "other",
    description: "Estimate annual and monthly property tax payments based on home value and tax rate.",
    metaDescription: "Free property tax calculator. Estimate annual and monthly property taxes.",
    icon: "layers",
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
    formula: { expression: "Tax = (Home Value - Exemptions) × Rate", variables: ["Home Value = Assessed property value", "Rate = Local tax rate"] },
    howToUse: "Enter your home's assessed value, local tax rate, and any exemptions.",
    faqs: [{ question: "What is the average US property tax rate?", answer: "About 1.1%, varying by state from 0.3% to 2.5%." }],
    relatedCalcs: otherRelated("property-tax-calculator"),
  },
  {
    slug: "rent-vs-buy-calculator",
    name: "Rent vs Buy Calculator",
    category: "Other Calculators",
    categorySlug: "other",
    description: "Compare renting versus buying a home over time.",
    metaDescription: "Free rent vs buy calculator. Compare total costs of renting versus buying.",
    icon: "layers",
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
    formula: { expression: "Buy Cost = Down Payment + (Monthly × Months)", variables: ["Monthly = Mortgage payment", "Rent Cost = Monthly Rent × Months"] },
    howToUse: "Enter home price, monthly rent, down payment %, mortgage rate, and years to compare.",
    faqs: [{ question: "Is it always better to buy?", answer: "Not always. Buying is better if you stay 5+ years and can afford the down payment." }],
    relatedCalcs: otherRelated("rent-vs-buy-calculator"),
  },
  {
    slug: "real-estate-roi-calculator",
    name: "Real Estate ROI Calculator",
    category: "Other Calculators",
    categorySlug: "other",
    description: "Calculate return on investment for rental properties.",
    metaDescription: "Free real estate ROI calculator. Calculate cap rate and cash-on-cash return.",
    icon: "layers",
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
    formula: { expression: "Cap Rate = NOI ÷ Purchase Price × 100", variables: ["NOI = Annual Income − Expenses"] },
    howToUse: "Enter purchase price, monthly rent, expenses, and down payment.",
    faqs: [{ question: "What is a good cap rate?", answer: "5-10% is generally considered good for rental properties." }],
    relatedCalcs: otherRelated("real-estate-roi-calculator"),
  },
  {
    slug: "square-footage-calculator",
    name: "Square Footage Calculator",
    category: "Other Calculators",
    categorySlug: "other",
    description: "Calculate square footage and estimate costs per square foot.",
    metaDescription: "Free square footage calculator. Calculate area and estimate costs.",
    icon: "layers",
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
    formula: { expression: "Area = Length × Width", variables: ["Length in feet", "Width in feet"] },
    howToUse: "Enter length and width in feet, and price per sq ft for cost estimates.",
    faqs: [{ question: "How do I measure an irregular room?", answer: "Break it into rectangles, calculate each area, then add them." }],
    relatedCalcs: otherRelated("square-footage-calculator"),
  },
  {
    slug: "stamp-duty-calculator",
    name: "Stamp Duty Calculator",
    category: "Other Calculators",
    categorySlug: "other",
    description: "Estimate stamp duty (transfer tax) on property purchases.",
    metaDescription: "Free stamp duty calculator. Estimate property transfer taxes.",
    icon: "layers",
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
    formula: { expression: "Duty = Price × Rate − Discount", variables: ["Price = Purchase price", "Rate = Stamp duty rate"] },
    howToUse: "Enter property price, stamp duty rate, and any first-time buyer discount.",
    faqs: [{ question: "What is stamp duty?", answer: "A tax paid when purchasing property, varying by jurisdiction." }],
    relatedCalcs: otherRelated("stamp-duty-calculator"),
  },
  // === Migrated from Cooking ===
  {
    slug: "recipe-scaler-calculator",
    name: "Recipe Scaler Calculator",
    category: "Other Calculators",
    categorySlug: "other",
    description: "Scale recipe ingredients up or down for any number of servings.",
    metaDescription: "Free recipe scaler calculator. Adjust ingredient quantities for any serving size.",
    icon: "layers",
    inputs: [
      { id: "originalServings", label: "Original Servings", type: "number", defaultValue: 4, min: 1 },
      { id: "desiredServings", label: "Desired Servings", type: "number", defaultValue: 8, min: 1 },
      { id: "ingredient1", label: "Ingredient 1 Amount", type: "number", defaultValue: 2, step: 0.25 },
      { id: "ingredient2", label: "Ingredient 2 Amount", type: "number", defaultValue: 1.5, step: 0.25 },
      { id: "ingredient3", label: "Ingredient 3 Amount", type: "number", defaultValue: 0.5, step: 0.25 },
    ],
    calculate: (v) => {
      const factor = v.desiredServings / v.originalServings;
      return [
        { label: "Scale Factor", value: factor.toFixed(2) + "×", highlight: true },
        { label: "Ingredient 1 (scaled)", value: (v.ingredient1 * factor).toFixed(2) },
        { label: "Ingredient 2 (scaled)", value: (v.ingredient2 * factor).toFixed(2) },
        { label: "Ingredient 3 (scaled)", value: (v.ingredient3 * factor).toFixed(2) },
      ];
    },
    formula: { expression: "Scaled = Original × (Desired ÷ Original Servings)", variables: ["Original = Original ingredient amount", "Desired = Target servings"] },
    howToUse: "Enter original servings, desired servings, and up to 3 ingredient amounts.",
    faqs: [{ question: "Do all ingredients scale linearly?", answer: "Most do, but seasonings and leavening agents may need adjusting." }],
    relatedCalcs: otherRelated("recipe-scaler-calculator"),
  },
  {
    slug: "baking-ratio-calculator",
    name: "Baking Ratio Calculator",
    category: "Other Calculators",
    categorySlug: "other",
    description: "Calculate perfect baking ratios for bread, cakes, and pastries.",
    metaDescription: "Free baking ratio calculator. Get perfect ingredient proportions.",
    icon: "layers",
    inputs: [
      { id: "flour", label: "Flour (grams)", type: "number", defaultValue: 500 },
      { id: "hydration", label: "Hydration (%)", type: "number", defaultValue: 65, suffix: "%", step: 1 },
      { id: "salt", label: "Salt (%)", type: "number", defaultValue: 2, suffix: "%", step: 0.1 },
      { id: "yeast", label: "Yeast (%)", type: "number", defaultValue: 1, suffix: "%", step: 0.1 },
    ],
    calculate: (v) => {
      const water = v.flour * (v.hydration / 100);
      const salt = v.flour * (v.salt / 100);
      const yeast = v.flour * (v.yeast / 100);
      const totalDough = v.flour + water + salt + yeast;
      return [
        { label: "Water/Liquid", value: water.toFixed(0) + " g", highlight: true },
        { label: "Salt", value: salt.toFixed(1) + " g" },
        { label: "Yeast", value: yeast.toFixed(1) + " g" },
        { label: "Total Dough Weight", value: totalDough.toFixed(0) + " g" },
      ];
    },
    formula: { expression: "Ingredient = Flour × (Percentage ÷ 100)", variables: ["All percentages relative to flour weight"] },
    howToUse: "Enter flour weight and adjust baker's percentages for hydration, salt, and yeast.",
    faqs: [{ question: "What hydration level should I use?", answer: "Sandwich bread: 60-65%. Artisan: 65-75%. Ciabatta: 75-85%." }],
    relatedCalcs: otherRelated("baking-ratio-calculator"),
  },
  {
    slug: "cooking-time-calculator",
    name: "Cooking Time Calculator",
    category: "Other Calculators",
    categorySlug: "other",
    description: "Estimate cooking times for meat based on weight and type.",
    metaDescription: "Free cooking time calculator. Estimate roasting and baking times by weight.",
    icon: "layers",
    inputs: [
      { id: "weight", label: "Weight (lbs)", type: "number", defaultValue: 5, step: 0.5 },
      { id: "minPerLb", label: "Minutes per Pound", type: "number", defaultValue: 20 },
      { id: "temp", label: "Oven Temperature (°F)", type: "number", defaultValue: 350 },
    ],
    calculate: (v) => {
      const totalMinutes = v.weight * v.minPerLb;
      const hours = Math.floor(totalMinutes / 60);
      const mins = Math.round(totalMinutes % 60);
      const restTime = Math.max(10, Math.round(v.weight * 3));
      return [
        { label: "Total Cooking Time", value: `${hours}h ${mins}m`, highlight: true },
        { label: "Total Minutes", value: totalMinutes.toFixed(0) + " min" },
        { label: "Recommended Rest Time", value: restTime + " min" },
        { label: "Oven Temp", value: v.temp + "°F / " + Math.round((v.temp - 32) * 5 / 9) + "°C" },
      ];
    },
    formula: { expression: "Time = Weight × Minutes per Pound", variables: ["Weight in pounds", "Min/lb varies by meat type"] },
    howToUse: "Enter meat weight, minutes per pound, and oven temperature.",
    faqs: [{ question: "Common min/lb values?", answer: "Turkey: 13-15 at 325°F. Beef roast: 20-25 at 350°F. Chicken: 20 at 350°F." }],
    relatedCalcs: otherRelated("cooking-time-calculator"),
  },
  {
    slug: "calorie-per-serving-calculator",
    name: "Calorie Per Serving Calculator",
    category: "Other Calculators",
    categorySlug: "other",
    description: "Calculate calories per serving for homemade recipes.",
    metaDescription: "Free calorie per serving calculator. Determine nutritional info per serving.",
    icon: "layers",
    inputs: [
      { id: "totalCalories", label: "Total Recipe Calories", type: "number", defaultValue: 2400 },
      { id: "servings", label: "Number of Servings", type: "number", defaultValue: 6, min: 1 },
      { id: "totalProtein", label: "Total Protein (g)", type: "number", defaultValue: 120 },
      { id: "totalCarbs", label: "Total Carbs (g)", type: "number", defaultValue: 180 },
    ],
    calculate: (v) => {
      const calPerServing = v.totalCalories / v.servings;
      const proteinPerServing = v.totalProtein / v.servings;
      const carbsPerServing = v.totalCarbs / v.servings;
      const fatCalories = v.totalCalories - (v.totalProtein * 4 + v.totalCarbs * 4);
      const fatPerServing = (fatCalories / 9) / v.servings;
      return [
        { label: "Calories Per Serving", value: Math.round(calPerServing) + " cal", highlight: true },
        { label: "Protein Per Serving", value: proteinPerServing.toFixed(1) + " g" },
        { label: "Carbs Per Serving", value: carbsPerServing.toFixed(1) + " g" },
        { label: "Est. Fat Per Serving", value: Math.max(0, fatPerServing).toFixed(1) + " g" },
      ];
    },
    formula: { expression: "Per Serving = Total ÷ Servings", variables: ["Total = Sum of all ingredient calories"] },
    howToUse: "Enter total recipe calories, protein, carbs, and number of servings.",
    faqs: [{ question: "Is the fat estimate accurate?", answer: "It's estimated from remaining calories after protein and carbs." }],
    relatedCalcs: otherRelated("calorie-per-serving-calculator"),
  },
  {
    slug: "unit-conversion-cooking",
    name: "Cooking Unit Converter",
    category: "Other Calculators",
    categorySlug: "other",
    description: "Convert between cups, tablespoons, teaspoons, milliliters, and more.",
    metaDescription: "Free cooking unit converter. Convert between common cooking measurements.",
    icon: "layers",
    inputs: [
      { id: "amount", label: "Amount", type: "number", defaultValue: 1, step: 0.25 },
      { id: "unit", label: "From Unit", type: "select", defaultValue: 1, options: [
        { value: 1, label: "Cups" },
        { value: 2, label: "Tablespoons" },
        { value: 3, label: "Teaspoons" },
        { value: 4, label: "Fluid Ounces" },
      ]},
    ],
    calculate: (v) => {
      let ml: number;
      switch (v.unit) {
        case 1: ml = v.amount * 236.588; break;
        case 2: ml = v.amount * 14.787; break;
        case 3: ml = v.amount * 4.929; break;
        case 4: ml = v.amount * 29.574; break;
        default: ml = v.amount * 236.588;
      }
      return [
        { label: "Milliliters", value: ml.toFixed(1) + " mL", highlight: true },
        { label: "Cups", value: (ml / 236.588).toFixed(3) },
        { label: "Tablespoons", value: (ml / 14.787).toFixed(1) },
        { label: "Teaspoons", value: (ml / 4.929).toFixed(1) },
        { label: "Fluid Ounces", value: (ml / 29.574).toFixed(2) },
      ];
    },
    formula: { expression: "Convert via mL base unit", variables: ["1 Cup = 236.588 mL", "1 Tbsp = 14.787 mL", "1 Tsp = 4.929 mL"] },
    howToUse: "Select a unit, enter the amount, and see all conversions.",
    faqs: [{ question: "How many tablespoons in a cup?", answer: "16 tablespoons = 1 US cup." }],
    relatedCalcs: otherRelated("unit-conversion-cooking"),
  },
  // === NEW CALCULATORS ===
  {
    slug: "electricity-cost-calculator",
    name: "Electricity Cost Calculator",
    category: "Other Calculators",
    categorySlug: "other",
    description: "Calculate electricity costs for appliances based on wattage and usage hours.",
    metaDescription: "Free electricity cost calculator. Estimate power bills by appliance wattage and usage.",
    icon: "layers",
    inputs: [
      { id: "watts", label: "Wattage (W)", type: "number", defaultValue: 1000 },
      { id: "hours", label: "Hours Per Day", type: "number", defaultValue: 8, step: 0.5 },
      { id: "rate", label: "Cost per kWh ($)", type: "number", defaultValue: 0.12, prefix: "$", step: 0.01 },
      { id: "days", label: "Days", type: "number", defaultValue: 30 },
    ],
    calculate: (v) => {
      const kwhPerDay = (v.watts * v.hours) / 1000;
      const totalKwh = kwhPerDay * v.days;
      const totalCost = totalKwh * v.rate;
      const monthlyCost = kwhPerDay * 30 * v.rate;
      return [
        { label: "Total Cost", value: fmt(totalCost), highlight: true },
        { label: "Daily kWh", value: kwhPerDay.toFixed(2) + " kWh" },
        { label: "Total kWh", value: totalKwh.toFixed(1) + " kWh" },
        { label: "Monthly Estimate", value: fmt(monthlyCost) },
      ];
    },
    formula: { expression: "Cost = (Watts × Hours × Days ÷ 1000) × Rate", variables: ["Watts = Appliance wattage", "Rate = Cost per kWh"] },
    howToUse: "Enter the appliance wattage, daily usage hours, electricity rate, and number of days.",
    faqs: [{ question: "What's the average electricity rate?", answer: "US average is about $0.12-0.16 per kWh, varying by state." }],
    relatedCalcs: otherRelated("electricity-cost-calculator"),
  },
  {
    slug: "discount-calculator",
    name: "Discount Calculator",
    category: "Other Calculators",
    categorySlug: "other",
    description: "Calculate sale prices, savings amount, and final cost after discount.",
    metaDescription: "Free discount calculator. Find sale prices and savings quickly.",
    icon: "layers",
    inputs: [
      { id: "originalPrice", label: "Original Price", type: "number", defaultValue: 100, prefix: "$" },
      { id: "discountPercent", label: "Discount (%)", type: "number", defaultValue: 25, suffix: "%" },
      { id: "taxRate", label: "Sales Tax (%)", type: "number", defaultValue: 8, suffix: "%", step: 0.1 },
    ],
    calculate: (v) => {
      const savings = v.originalPrice * (v.discountPercent / 100);
      const salePrice = v.originalPrice - savings;
      const tax = salePrice * (v.taxRate / 100);
      const finalPrice = salePrice + tax;
      return [
        { label: "Sale Price", value: fmt(salePrice), highlight: true },
        { label: "You Save", value: fmt(savings) },
        { label: "Sales Tax", value: fmt(tax) },
        { label: "Final Price (with tax)", value: fmt(finalPrice) },
      ];
    },
    formula: { expression: "Sale Price = Original × (1 - Discount%)", variables: ["Original = Original price", "Discount = Percentage off"] },
    howToUse: "Enter original price, discount percentage, and optional sales tax rate.",
    faqs: [{ question: "How do I calculate double discounts?", answer: "Apply each discount sequentially, not by adding percentages." }],
    relatedCalcs: otherRelated("discount-calculator"),
  },
  {
    slug: "markup-calculator",
    name: "Markup Calculator",
    category: "Other Calculators",
    categorySlug: "other",
    description: "Calculate selling price based on cost and desired markup percentage.",
    metaDescription: "Free markup calculator. Determine selling price from cost and markup.",
    icon: "layers",
    inputs: [
      { id: "cost", label: "Cost Price", type: "number", defaultValue: 50, prefix: "$" },
      { id: "markup", label: "Markup (%)", type: "number", defaultValue: 40, suffix: "%" },
    ],
    calculate: (v) => {
      const markupAmt = v.cost * (v.markup / 100);
      const sellingPrice = v.cost + markupAmt;
      const margin = (markupAmt / sellingPrice) * 100;
      return [
        { label: "Selling Price", value: fmt(sellingPrice), highlight: true },
        { label: "Markup Amount", value: fmt(markupAmt) },
        { label: "Profit Margin", value: margin.toFixed(1) + "%" },
        { label: "Cost", value: fmt(v.cost) },
      ];
    },
    formula: { expression: "Selling Price = Cost × (1 + Markup%)", variables: ["Cost = Purchase/production cost", "Markup = Desired markup percentage"] },
    howToUse: "Enter cost price and desired markup percentage.",
    faqs: [{ question: "Markup vs margin?", answer: "Markup is % of cost. Margin is % of selling price. 50% markup = 33.3% margin." }],
    relatedCalcs: otherRelated("markup-calculator"),
  },
  {
    slug: "margin-calculator",
    name: "Profit Margin Calculator",
    category: "Other Calculators",
    categorySlug: "other",
    description: "Calculate profit margin, gross profit, and net margin from revenue and costs.",
    metaDescription: "Free profit margin calculator. Compute gross and net profit margins.",
    icon: "layers",
    inputs: [
      { id: "revenue", label: "Revenue", type: "number", defaultValue: 10000, prefix: "$" },
      { id: "cost", label: "Cost of Goods", type: "number", defaultValue: 6000, prefix: "$" },
      { id: "expenses", label: "Operating Expenses", type: "number", defaultValue: 2000, prefix: "$" },
    ],
    calculate: (v) => {
      const grossProfit = v.revenue - v.cost;
      const netProfit = grossProfit - v.expenses;
      const grossMargin = (grossProfit / v.revenue) * 100;
      const netMargin = (netProfit / v.revenue) * 100;
      return [
        { label: "Gross Profit", value: fmt(grossProfit), highlight: true },
        { label: "Net Profit", value: fmt(netProfit) },
        { label: "Gross Margin", value: grossMargin.toFixed(1) + "%" },
        { label: "Net Margin", value: netMargin.toFixed(1) + "%" },
      ];
    },
    formula: { expression: "Margin = (Revenue - Costs) ÷ Revenue × 100", variables: ["Revenue = Total sales", "Costs = Cost of goods sold"] },
    howToUse: "Enter revenue, cost of goods, and operating expenses.",
    faqs: [{ question: "What's a good profit margin?", answer: "Varies by industry. 10-20% net margin is generally healthy." }],
    relatedCalcs: otherRelated("margin-calculator"),
  },
  {
    slug: "break-even-calculator",
    name: "Break Even Calculator",
    category: "Other Calculators",
    categorySlug: "other",
    description: "Calculate the break-even point for your business in units and revenue.",
    metaDescription: "Free break even calculator. Find how many units you need to sell to cover costs.",
    icon: "layers",
    inputs: [
      { id: "fixedCosts", label: "Fixed Costs", type: "number", defaultValue: 10000, prefix: "$" },
      { id: "pricePerUnit", label: "Price Per Unit", type: "number", defaultValue: 50, prefix: "$" },
      { id: "costPerUnit", label: "Variable Cost Per Unit", type: "number", defaultValue: 30, prefix: "$" },
    ],
    calculate: (v) => {
      const contribution = v.pricePerUnit - v.costPerUnit;
      const breakEvenUnits = contribution > 0 ? v.fixedCosts / contribution : 0;
      const breakEvenRevenue = breakEvenUnits * v.pricePerUnit;
      const marginPerUnit = (contribution / v.pricePerUnit) * 100;
      return [
        { label: "Break-Even Units", value: Math.ceil(breakEvenUnits).toLocaleString(), highlight: true },
        { label: "Break-Even Revenue", value: fmt0(breakEvenRevenue) },
        { label: "Contribution Per Unit", value: fmt(contribution) },
        { label: "Contribution Margin", value: marginPerUnit.toFixed(1) + "%" },
      ];
    },
    formula: { expression: "Break-Even = Fixed Costs ÷ (Price - Variable Cost)", variables: ["Fixed Costs = Rent, salaries, etc.", "Contribution = Price - Variable Cost"] },
    howToUse: "Enter total fixed costs, selling price per unit, and variable cost per unit.",
    faqs: [{ question: "What are fixed vs variable costs?", answer: "Fixed costs don't change with volume (rent, salaries). Variable costs change per unit (materials, shipping)." }],
    relatedCalcs: otherRelated("break-even-calculator"),
  },
  {
    slug: "vat-calculator",
    name: "VAT Calculator",
    category: "Other Calculators",
    categorySlug: "other",
    description: "Calculate VAT (Value Added Tax) - add or remove VAT from any price.",
    metaDescription: "Free VAT calculator. Add or remove VAT from prices. Supports any VAT rate.",
    icon: "layers",
    inputs: [
      { id: "amount", label: "Amount", type: "number", defaultValue: 100, prefix: "$" },
      { id: "vatRate", label: "VAT Rate (%)", type: "number", defaultValue: 20, suffix: "%" },
    ],
    calculate: (v) => {
      const vatAmount = v.amount * (v.vatRate / 100);
      const priceWithVat = v.amount + vatAmount;
      const priceExVat = v.amount / (1 + v.vatRate / 100);
      const vatFromGross = v.amount - priceExVat;
      return [
        { label: "Price + VAT", value: fmt(priceWithVat), highlight: true },
        { label: "VAT Amount (added)", value: fmt(vatAmount) },
        { label: "Price excl. VAT (if gross)", value: fmt(priceExVat) },
        { label: "VAT in gross price", value: fmt(vatFromGross) },
      ];
    },
    formula: { expression: "VAT = Amount × Rate%", variables: ["Amount = Net price", "Rate = VAT percentage"] },
    howToUse: "Enter an amount and VAT rate. Results show both adding and removing VAT.",
    faqs: [{ question: "What are common VAT rates?", answer: "UK: 20%. EU average: 21%. Some countries have reduced rates for food/books." }],
    relatedCalcs: otherRelated("vat-calculator"),
  },
  {
    slug: "cost-per-unit-calculator",
    name: "Cost Per Unit Calculator",
    category: "Other Calculators",
    categorySlug: "other",
    description: "Calculate the cost per unit to compare prices and find the best deal.",
    metaDescription: "Free cost per unit calculator. Compare prices by unit to find the best value.",
    icon: "layers",
    inputs: [
      { id: "totalCost", label: "Total Price", type: "number", defaultValue: 12.99, prefix: "$", step: 0.01 },
      { id: "quantity", label: "Quantity / Units", type: "number", defaultValue: 24 },
    ],
    calculate: (v) => {
      const costPerUnit = v.totalCost / v.quantity;
      const costPer10 = costPerUnit * 10;
      const costPer100 = costPerUnit * 100;
      return [
        { label: "Cost Per Unit", value: "$" + costPerUnit.toFixed(4), highlight: true },
        { label: "Cost Per 10", value: fmt(costPer10) },
        { label: "Cost Per 100", value: fmt(costPer100) },
        { label: "Total Price", value: fmt(v.totalCost) },
      ];
    },
    formula: { expression: "Cost Per Unit = Total Price ÷ Quantity", variables: ["Total Price = Package price", "Quantity = Number of units"] },
    howToUse: "Enter the total price and number of units to find cost per unit.",
    faqs: [{ question: "When should I use unit pricing?", answer: "Always compare unit prices when buying bulk vs regular sizes at stores." }],
    relatedCalcs: otherRelated("cost-per-unit-calculator"),
  },
  {
    slug: "profit-calculator",
    name: "Profit Calculator",
    category: "Other Calculators",
    categorySlug: "other",
    description: "Calculate profit, profit percentage, and return on investment.",
    metaDescription: "Free profit calculator. Calculate profit amount and percentage from cost and revenue.",
    icon: "layers",
    inputs: [
      { id: "costPrice", label: "Cost Price", type: "number", defaultValue: 75, prefix: "$" },
      { id: "sellingPrice", label: "Selling Price", type: "number", defaultValue: 120, prefix: "$" },
      { id: "unitsSold", label: "Units Sold", type: "number", defaultValue: 100 },
    ],
    calculate: (v) => {
      const profitPerUnit = v.sellingPrice - v.costPrice;
      const profitPercent = (profitPerUnit / v.costPrice) * 100;
      const totalProfit = profitPerUnit * v.unitsSold;
      const totalRevenue = v.sellingPrice * v.unitsSold;
      return [
        { label: "Profit Per Unit", value: fmt(profitPerUnit), highlight: true },
        { label: "Profit %", value: profitPercent.toFixed(1) + "%" },
        { label: "Total Profit", value: fmt(totalProfit) },
        { label: "Total Revenue", value: fmt(totalRevenue) },
      ];
    },
    formula: { expression: "Profit = Selling Price - Cost Price", variables: ["Cost = Purchase/production price", "Selling = Sale price"] },
    howToUse: "Enter cost price, selling price, and number of units sold.",
    faqs: [{ question: "Profit vs revenue?", answer: "Revenue is total sales. Profit is revenue minus all costs." }],
    relatedCalcs: otherRelated("profit-calculator"),
  },
  {
    slug: "reading-time-calculator",
    name: "Reading Time Calculator",
    category: "Other Calculators",
    categorySlug: "other",
    description: "Estimate how long it takes to read text based on word count and reading speed.",
    metaDescription: "Free reading time calculator. Estimate reading time for articles, books, and documents.",
    icon: "layers",
    inputs: [
      { id: "wordCount", label: "Word Count", type: "number", defaultValue: 2500 },
      { id: "wpm", label: "Reading Speed (WPM)", type: "number", defaultValue: 250 },
    ],
    calculate: (v) => {
      const minutes = v.wordCount / v.wpm;
      const hours = Math.floor(minutes / 60);
      const mins = Math.round(minutes % 60);
      const pages = v.wordCount / 250;
      return [
        { label: "Reading Time", value: hours > 0 ? `${hours}h ${mins}m` : `${mins} min`, highlight: true },
        { label: "Total Minutes", value: minutes.toFixed(1) + " min" },
        { label: "Estimated Pages", value: pages.toFixed(1) },
        { label: "Words", value: v.wordCount.toLocaleString() },
      ];
    },
    formula: { expression: "Time = Word Count ÷ WPM", variables: ["WPM = Words per minute (avg 200-300)"] },
    howToUse: "Enter the word count and your reading speed in words per minute.",
    faqs: [{ question: "What's average reading speed?", answer: "Adults average 200-300 WPM. Speed readers can reach 600+ WPM." }],
    relatedCalcs: otherRelated("reading-time-calculator"),
  },
  {
    slug: "typing-speed-calculator",
    name: "Typing Speed Calculator",
    category: "Other Calculators",
    categorySlug: "other",
    description: "Calculate typing speed in WPM from characters typed and time taken.",
    metaDescription: "Free typing speed calculator. Calculate WPM from characters and time.",
    icon: "layers",
    inputs: [
      { id: "characters", label: "Characters Typed", type: "number", defaultValue: 500 },
      { id: "seconds", label: "Time (seconds)", type: "number", defaultValue: 120 },
      { id: "errors", label: "Errors", type: "number", defaultValue: 5 },
    ],
    calculate: (v) => {
      const words = v.characters / 5;
      const minutes = v.seconds / 60;
      const grossWpm = words / minutes;
      const netWpm = Math.max(0, (words - v.errors) / minutes);
      const accuracy = ((v.characters - v.errors) / v.characters) * 100;
      return [
        { label: "Net WPM", value: Math.round(netWpm) + " WPM", highlight: true },
        { label: "Gross WPM", value: Math.round(grossWpm) + " WPM" },
        { label: "Accuracy", value: accuracy.toFixed(1) + "%" },
        { label: "Characters/Min", value: Math.round(v.characters / minutes).toLocaleString() },
      ];
    },
    formula: { expression: "WPM = (Characters ÷ 5) ÷ Minutes", variables: ["5 characters = 1 word", "Net WPM subtracts errors"] },
    howToUse: "Enter characters typed, time in seconds, and number of errors.",
    faqs: [{ question: "What's a good typing speed?", answer: "40 WPM is average. 60+ WPM is good. 80+ WPM is excellent." }],
    relatedCalcs: otherRelated("typing-speed-calculator"),
  },
  {
    slug: "password-strength-calculator",
    name: "Password Strength Calculator",
    category: "Other Calculators",
    categorySlug: "other",
    description: "Estimate password strength based on length and character types used.",
    metaDescription: "Free password strength calculator. Check how strong your password is.",
    icon: "layers",
    inputs: [
      { id: "length", label: "Password Length", type: "number", defaultValue: 12, min: 1, max: 128 },
      { id: "charTypes", label: "Character Types", type: "select", defaultValue: 4, options: [
        { value: 1, label: "Lowercase only (26)" },
        { value: 2, label: "Lower + Upper (52)" },
        { value: 3, label: "Letters + Numbers (62)" },
        { value: 4, label: "All + Symbols (95)" },
      ]},
    ],
    calculate: (v) => {
      const poolSizes: Record<number, number> = { 1: 26, 2: 52, 3: 62, 4: 95 };
      const pool = poolSizes[v.charTypes] || 95;
      const entropy = v.length * Math.log2(pool);
      const combinations = Math.pow(pool, v.length);
      const crackTimeSeconds = combinations / 1e10;
      let strength = "Weak";
      if (entropy >= 80) strength = "Very Strong";
      else if (entropy >= 60) strength = "Strong";
      else if (entropy >= 40) strength = "Moderate";
      return [
        { label: "Strength", value: strength, highlight: true },
        { label: "Entropy", value: entropy.toFixed(1) + " bits" },
        { label: "Possible Combinations", value: combinations > 1e15 ? combinations.toExponential(2) : combinations.toLocaleString() },
        { label: "Crack Time (10B/sec)", value: crackTimeSeconds > 3.15e7 ? (crackTimeSeconds / 3.15e7).toFixed(0) + " years" : crackTimeSeconds.toFixed(0) + " sec" },
      ];
    },
    formula: { expression: "Entropy = Length × log₂(Pool Size)", variables: ["Pool Size = Number of possible characters", "Higher entropy = stronger password"] },
    howToUse: "Enter password length and select character types used.",
    faqs: [{ question: "How long should a password be?", answer: "At least 12 characters with mixed types for good security." }],
    relatedCalcs: otherRelated("password-strength-calculator"),
  },
  {
    slug: "aspect-ratio-calculator",
    name: "Aspect Ratio Calculator",
    category: "Other Calculators",
    categorySlug: "other",
    description: "Calculate aspect ratios, resize dimensions while maintaining proportions.",
    metaDescription: "Free aspect ratio calculator. Resize images and videos while keeping proportions.",
    icon: "layers",
    inputs: [
      { id: "width", label: "Original Width", type: "number", defaultValue: 1920 },
      { id: "height", label: "Original Height", type: "number", defaultValue: 1080 },
      { id: "newWidth", label: "New Width", type: "number", defaultValue: 1280 },
    ],
    calculate: (v) => {
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
      const d = gcd(v.width, v.height);
      const ratioW = v.width / d;
      const ratioH = v.height / d;
      const newHeight = (v.newWidth / v.width) * v.height;
      const megapixels = (v.width * v.height) / 1e6;
      return [
        { label: "Aspect Ratio", value: `${ratioW}:${ratioH}`, highlight: true },
        { label: "New Height", value: Math.round(newHeight) + " px" },
        { label: "Original Size", value: `${v.width}×${v.height}` },
        { label: "Megapixels", value: megapixels.toFixed(2) + " MP" },
      ];
    },
    formula: { expression: "Ratio = Width:Height (simplified by GCD)", variables: ["New Height = (New Width ÷ Width) × Height"] },
    howToUse: "Enter original dimensions and a new width to calculate the proportional height.",
    faqs: [{ question: "Common aspect ratios?", answer: "16:9 (widescreen), 4:3 (standard), 1:1 (square), 21:9 (ultrawide)." }],
    relatedCalcs: otherRelated("aspect-ratio-calculator"),
  },
  {
    slug: "dpi-calculator",
    name: "DPI Calculator",
    category: "Other Calculators",
    categorySlug: "other",
    description: "Calculate DPI (dots per inch) for print quality from pixel dimensions and print size.",
    metaDescription: "Free DPI calculator. Determine print resolution from pixel dimensions.",
    icon: "layers",
    inputs: [
      { id: "pixelWidth", label: "Image Width (pixels)", type: "number", defaultValue: 3000 },
      { id: "pixelHeight", label: "Image Height (pixels)", type: "number", defaultValue: 2000 },
      { id: "printWidth", label: "Print Width (inches)", type: "number", defaultValue: 10, step: 0.5 },
    ],
    calculate: (v) => {
      const dpiW = v.pixelWidth / v.printWidth;
      const printHeight = v.pixelHeight / dpiW;
      const megapixels = (v.pixelWidth * v.pixelHeight) / 1e6;
      let quality = "Low";
      if (dpiW >= 300) quality = "Excellent";
      else if (dpiW >= 200) quality = "Good";
      else if (dpiW >= 150) quality = "Acceptable";
      return [
        { label: "DPI", value: Math.round(dpiW) + " DPI", highlight: true },
        { label: "Print Quality", value: quality },
        { label: "Print Height", value: printHeight.toFixed(1) + " in" },
        { label: "Megapixels", value: megapixels.toFixed(1) + " MP" },
      ];
    },
    formula: { expression: "DPI = Pixel Width ÷ Print Width", variables: ["300 DPI = excellent print quality", "150 DPI = acceptable for viewing distance"] },
    howToUse: "Enter image pixel dimensions and desired print width in inches.",
    faqs: [{ question: "What DPI do I need?", answer: "300 DPI for high-quality prints. 150 DPI for posters. 72 DPI for screens." }],
    relatedCalcs: otherRelated("dpi-calculator"),
  },
  {
    slug: "binary-to-decimal-calculator",
    name: "Binary to Decimal Calculator",
    category: "Other Calculators",
    categorySlug: "other",
    description: "Convert binary numbers to decimal and hexadecimal.",
    metaDescription: "Free binary to decimal calculator. Convert between binary, decimal, and hex.",
    icon: "layers",
    inputs: [
      { id: "binary", label: "Binary Number (as decimal input)", type: "number", defaultValue: 11010110 },
    ],
    calculate: (v) => {
      const binStr = Math.abs(Math.round(v.binary)).toString();
      let decimal = 0;
      for (let i = 0; i < binStr.length; i++) {
        const bit = parseInt(binStr[i]);
        if (bit !== 0 && bit !== 1) return [{ label: "Error", value: "Invalid binary (use 0s and 1s)", highlight: true }];
        decimal += bit * Math.pow(2, binStr.length - 1 - i);
      }
      return [
        { label: "Decimal", value: decimal.toLocaleString(), highlight: true },
        { label: "Hexadecimal", value: "0x" + decimal.toString(16).toUpperCase() },
        { label: "Octal", value: "0o" + decimal.toString(8) },
        { label: "Bits", value: binStr.length.toString() },
      ];
    },
    formula: { expression: "Decimal = Σ(bit × 2^position)", variables: ["Each bit position has value 2^n", "Rightmost bit = position 0"] },
    howToUse: "Enter a binary number using only 0s and 1s.",
    faqs: [{ question: "What is binary?", answer: "Binary is base-2 number system using only 0 and 1. Used by computers." }],
    relatedCalcs: otherRelated("binary-to-decimal-calculator"),
  },
  {
    slug: "hex-to-decimal-calculator",
    name: "Hex to Decimal Calculator",
    category: "Other Calculators",
    categorySlug: "other",
    description: "Convert hexadecimal values to decimal. Enter hex as a decimal approximation.",
    metaDescription: "Free hex to decimal converter. Quick hexadecimal conversions.",
    icon: "layers",
    inputs: [
      { id: "hexVal", label: "Hex Value (decimal)", type: "number", defaultValue: 255 },
    ],
    calculate: (v) => {
      const dec = Math.abs(Math.round(v.hexVal));
      const hex = dec.toString(16).toUpperCase();
      const binary = dec.toString(2);
      const octal = dec.toString(8);
      return [
        { label: "Hexadecimal", value: "0x" + hex, highlight: true },
        { label: "Decimal", value: dec.toLocaleString() },
        { label: "Binary", value: binary },
        { label: "Octal", value: "0o" + octal },
      ];
    },
    formula: { expression: "Hex uses digits 0-9 and A-F (base 16)", variables: ["A=10, B=11, C=12, D=13, E=14, F=15"] },
    howToUse: "Enter a decimal number to see its hex, binary, and octal representations.",
    faqs: [{ question: "Where is hex used?", answer: "Colors (#FF0000), memory addresses, MAC addresses, and programming." }],
    relatedCalcs: otherRelated("hex-to-decimal-calculator"),
  },
  {
    slug: "roman-numeral-converter",
    name: "Roman Numeral Converter",
    category: "Other Calculators",
    categorySlug: "other",
    description: "Convert numbers to and from Roman numerals.",
    metaDescription: "Free Roman numeral converter. Convert between Arabic and Roman numerals.",
    icon: "layers",
    inputs: [
      { id: "number", label: "Number (1-3999)", type: "number", defaultValue: 2024, min: 1, max: 3999 },
    ],
    calculate: (v) => {
      const num = Math.min(3999, Math.max(1, Math.round(v.number)));
      const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
      const syms = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
      let result = "", n = num;
      for (let i = 0; i < vals.length; i++) {
        while (n >= vals[i]) { result += syms[i]; n -= vals[i]; }
      }
      return [
        { label: "Roman Numeral", value: result, highlight: true },
        { label: "Arabic Number", value: num.toLocaleString() },
        { label: "Characters", value: result.length.toString() },
      ];
    },
    formula: { expression: "M=1000, D=500, C=100, L=50, X=10, V=5, I=1", variables: ["Subtractive: IV=4, IX=9, XL=40, XC=90, CD=400, CM=900"] },
    howToUse: "Enter any number between 1 and 3999.",
    faqs: [{ question: "Why max 3999?", answer: "Standard Roman numerals don't have a symbol for 5000. Extended notation exists but isn't common." }],
    relatedCalcs: otherRelated("roman-numeral-converter"),
  },
];
