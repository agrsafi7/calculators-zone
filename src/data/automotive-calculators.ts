import { CalculatorConfig } from "@/components/CalculatorTemplate";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);
const fmt0 = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

const autoRelated = (exclude: string) => [
  { name: "Fuel Cost Calculator", slug: "fuel-cost-calculator", icon: "car", category: "automotive" },
  { name: "Car Depreciation", slug: "car-depreciation-calculator", icon: "car", category: "automotive" },
  { name: "MPG Calculator", slug: "mpg-calculator", icon: "car", category: "automotive" },
  { name: "Tire Size Calculator", slug: "tire-size-calculator", icon: "car", category: "automotive" },
].filter((c) => c.slug !== exclude);

export const automotiveCalculators: CalculatorConfig[] = [
  {
    slug: "fuel-cost-calculator",
    name: "Fuel Cost Calculator",
    category: "Automotive",
    categorySlug: "automotive",
    description: "Estimate fuel costs for your trip based on distance, fuel efficiency, and gas price. Great for road trip planning.",
    metaDescription: "Free fuel cost calculator. Estimate gas costs for any trip based on distance, MPG, and fuel price. Plan your road trips and commute expenses.",
    icon: "car",
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
    howToUse: "Enter the trip distance in miles, your vehicle's fuel efficiency in MPG, and the current gas price per gallon.",
    faqs: [
      { question: "How do I find my car's MPG?", answer: "Check the EPA fuel economy sticker on the vehicle, your owner's manual, or visit fueleconomy.gov. You can also calculate it by dividing miles driven by gallons used at your last fill-up." },
      { question: "Does this account for city vs highway driving?", answer: "This uses a single MPG value. For mixed driving, use your car's combined MPG rating. City driving typically gets lower MPG than highway driving." },
    ],
    relatedCalcs: autoRelated("fuel-cost-calculator"),
  },
  {
    slug: "car-depreciation-calculator",
    name: "Car Depreciation Calculator",
    category: "Automotive",
    categorySlug: "automotive",
    description: "Estimate your car's value over time based on purchase price, age, and depreciation rate.",
    metaDescription: "Free car depreciation calculator. Estimate how much your vehicle will be worth after 1-10 years based on average depreciation rates.",
    icon: "car",
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
    howToUse: "Enter the car's purchase price, how many years you've owned it, and the annual depreciation rate (average is 15-20%).",
    faqs: [
      { question: "What is the average car depreciation rate?", answer: "Most cars depreciate 15-20% per year on average. Luxury cars may depreciate faster, while trucks and economy cars often hold value better." },
      { question: "When does a car lose the most value?", answer: "A new car loses the most value in the first year (20-30%), and then about 15% per year after that. After 5 years, most cars have lost about 60% of their original value." },
    ],
    relatedCalcs: autoRelated("car-depreciation-calculator"),
  },
  {
    slug: "mpg-calculator",
    name: "MPG Calculator",
    category: "Automotive",
    categorySlug: "automotive",
    description: "Calculate your vehicle's miles per gallon fuel efficiency based on miles driven and fuel used.",
    metaDescription: "Free MPG calculator. Calculate your vehicle's fuel efficiency by entering miles driven and gallons of gas used.",
    icon: "car",
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
    formula: { expression: "MPG = Miles Driven ÷ Gallons Used", variables: ["Miles = Total miles driven between fill-ups", "Gallons = Total gallons of fuel consumed"] },
    howToUse: "Fill your tank, reset your trip odometer, drive normally, then fill up again. Enter the miles driven and gallons used.",
    faqs: [
      { question: "What's a good MPG for a car?", answer: "For a passenger car, 30+ MPG is considered good. SUVs average 20-25 MPG. Hybrids can achieve 40-60+ MPG. Electric vehicles don't use MPG but have MPGe ratings." },
      { question: "How can I improve my MPG?", answer: "Maintain proper tire pressure, avoid aggressive driving, remove excess weight, use cruise control on highways, keep up with regular maintenance, and avoid excessive idling." },
    ],
    relatedCalcs: autoRelated("mpg-calculator"),
  },
  {
    slug: "tire-size-calculator",
    name: "Tire Size Calculator",
    category: "Automotive",
    categorySlug: "automotive",
    description: "Calculate tire diameter, circumference, and compare different tire sizes to check compatibility.",
    metaDescription: "Free tire size calculator. Calculate tire diameter, circumference, and compare sizes for proper fitment. Check speedometer accuracy.",
    icon: "car",
    inputs: [
      { id: "width", label: "Tire Width (mm)", type: "number", defaultValue: 225 },
      { id: "aspect", label: "Aspect Ratio (%)", type: "number", defaultValue: 45 },
      { id: "rim", label: "Rim Diameter (inches)", type: "number", defaultValue: 17 },
    ],
    calculate: (v) => {
      const sidewall = (v.width * v.aspect / 100) / 25.4; // mm to inches
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
    formula: { expression: "Diameter = (2 × Sidewall) + Rim", variables: ["Sidewall = Width × Aspect ÷ 2540", "Rim = Rim diameter in inches", "Circumference = Diameter × π"] },
    howToUse: "Enter your tire width in millimeters, aspect ratio percentage, and rim diameter in inches (e.g., for a 225/45R17 tire).",
    faqs: [
      { question: "What does 225/45R17 mean?", answer: "225 is the tire width in mm, 45 is the aspect ratio (sidewall height as percentage of width), R means radial construction, and 17 is the rim diameter in inches." },
      { question: "How much size difference is acceptable?", answer: "Generally, the overall diameter should stay within 3% of the original tire size. Larger differences affect speedometer accuracy, ABS, traction control, and may cause clearance issues." },
    ],
    relatedCalcs: autoRelated("tire-size-calculator"),
  },
  {
    slug: "engine-horsepower-calculator",
    name: "Engine Horsepower Calculator",
    category: "Automotive",
    categorySlug: "automotive",
    description: "Estimate engine horsepower using the classic dyno formula based on elapsed time and vehicle weight.",
    metaDescription: "Free horsepower calculator. Estimate your car's HP using quarter-mile time and vehicle weight or other performance metrics.",
    icon: "car",
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
    formula: { expression: "HP = Weight ÷ (ET ÷ 5.825)³", variables: ["Weight = Vehicle weight in lbs", "ET = Quarter-mile elapsed time in seconds"] },
    howToUse: "Enter your vehicle's weight in pounds and the quarter-mile elapsed time (ET) in seconds to estimate horsepower.",
    faqs: [
      { question: "How accurate is this calculator?", answer: "This uses the standard trap-speed formula and provides a reasonable estimate. Actual dyno results may vary due to drivetrain losses, weather conditions, and traction." },
      { question: "What is a good quarter-mile time?", answer: "Most modern cars run 13-16 seconds. Performance cars run 11-13 seconds. Supercars can run under 11 seconds. Professional drag cars run under 6 seconds." },
    ],
    relatedCalcs: autoRelated("engine-horsepower-calculator"),
  },
];
