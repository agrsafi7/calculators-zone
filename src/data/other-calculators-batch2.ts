import { CalculatorConfig } from "@/components/CalculatorTemplate";

const fmt = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);
const fmt0 = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

const batch2Rel = (exclude: string) => [
  { name: "Wind Chill", slug: "wind-chill-calculator", icon: "layers", category: "other" },
  { name: "Rainfall Calculator", slug: "rainfall-calculator", icon: "layers", category: "other" },
  { name: "Blood Alcohol", slug: "blood-alcohol-calculator", icon: "layers", category: "other" },
  { name: "Electricity Bill", slug: "electricity-bill-calculator", icon: "layers", category: "other" },
].filter(c => c.slug !== exclude);

export const otherCalculatorsBatch2: CalculatorConfig[] = [
  // ═══════════════════════════════════════
  // WEATHER & ENVIRONMENT (subcategory)
  // ═══════════════════════════════════════
  {
    slug: "wind-chill-calculator", name: "Wind Chill Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Weather & Environment",
    description: "Calculate wind chill temperature based on air temperature and wind speed.",
    metaDescription: "Free wind chill calculator. Find the feels-like temperature.",
    icon: "layers",
    inputs: [
      { id: "temp", label: "Temperature (°F)", type: "number", defaultValue: 30 },
      { id: "wind", label: "Wind Speed (mph)", type: "number", defaultValue: 15 },
    ],
    calculate: (v) => {
      const wc = 35.74 + 0.6215 * v.temp - 35.75 * Math.pow(v.wind, 0.16) + 0.4275 * v.temp * Math.pow(v.wind, 0.16);
      const wcC = (wc - 32) * 5 / 9;
      let risk = "Low";
      if (wc < -20) risk = "Extreme (frostbite in minutes)";
      else if (wc < 0) risk = "High";
      else if (wc < 20) risk = "Moderate";
      return [
        { label: "Wind Chill", value: wc.toFixed(1) + "°F", highlight: true },
        { label: "Wind Chill (°C)", value: wcC.toFixed(1) + "°C" },
        { label: "Frostbite Risk", value: risk },
      ];
    },
    formula: { expression: "WC = 35.74 + 0.6215T - 35.75V^0.16 + 0.4275TV^0.16", variables: ["T = Air temperature °F", "V = Wind speed mph"] },
    howToUse: "Enter air temperature in °F and wind speed in mph.",
    faqs: [{ question: "When is wind chill dangerous?", answer: "Below 0°F wind chill, frostbite can occur in 30 minutes." }],
    relatedCalcs: batch2Rel("wind-chill-calculator"),
  },
  {
    slug: "heat-index-calculator", name: "Heat Index Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Weather & Environment",
    description: "Calculate heat index (feels-like temperature) from temperature and humidity.",
    metaDescription: "Free heat index calculator. Find the apparent temperature.",
    icon: "layers",
    inputs: [
      { id: "temp", label: "Temperature (°F)", type: "number", defaultValue: 95 },
      { id: "humidity", label: "Relative Humidity (%)", type: "number", defaultValue: 60, suffix: "%" },
    ],
    calculate: (v) => {
      const T = v.temp, R = v.humidity;
      const hi = -42.379 + 2.04901523*T + 10.14333127*R - 0.22475541*T*R - 0.00683783*T*T - 0.05481717*R*R + 0.00122874*T*T*R + 0.00085282*T*R*R - 0.00000199*T*T*R*R;
      let danger = "Caution";
      if (hi >= 130) danger = "Extreme Danger";
      else if (hi >= 105) danger = "Danger";
      else if (hi >= 90) danger = "Extreme Caution";
      return [
        { label: "Heat Index", value: hi.toFixed(1) + "°F", highlight: true },
        { label: "Heat Index (°C)", value: ((hi - 32) * 5 / 9).toFixed(1) + "°C" },
        { label: "Danger Level", value: danger },
      ];
    },
    formula: { expression: "Rothfusz regression equation", variables: ["T = Temperature °F", "R = Relative humidity %"] },
    howToUse: "Enter temperature (°F) and relative humidity (%).",
    faqs: [{ question: "When is heat index dangerous?", answer: "Above 105°F heat index, heat stroke is likely with prolonged exposure." }],
    relatedCalcs: batch2Rel("heat-index-calculator"),
  },
  {
    slug: "dew-point-calculator", name: "Dew Point Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Weather & Environment",
    description: "Calculate dew point temperature from air temperature and humidity.",
    metaDescription: "Free dew point calculator. Find dew point from temp and humidity.",
    icon: "layers",
    inputs: [
      { id: "temp", label: "Temperature (°C)", type: "number", defaultValue: 25 },
      { id: "humidity", label: "Relative Humidity (%)", type: "number", defaultValue: 60, suffix: "%" },
    ],
    calculate: (v) => {
      const a = 17.27, b = 237.7;
      const alpha = (a * v.temp) / (b + v.temp) + Math.log(v.humidity / 100);
      const dewPoint = (b * alpha) / (a - alpha);
      const dewPointF = dewPoint * 9 / 5 + 32;
      let comfort = "Dry";
      if (dewPoint > 24) comfort = "Severely uncomfortable";
      else if (dewPoint > 20) comfort = "Very humid";
      else if (dewPoint > 16) comfort = "Somewhat uncomfortable";
      else if (dewPoint > 10) comfort = "Comfortable";
      return [
        { label: "Dew Point", value: dewPoint.toFixed(1) + "°C", highlight: true },
        { label: "Dew Point (°F)", value: dewPointF.toFixed(1) + "°F" },
        { label: "Comfort Level", value: comfort },
      ];
    },
    formula: { expression: "Td = b × α / (a - α)", variables: ["α = aT/(b+T) + ln(RH/100)", "a=17.27, b=237.7"] },
    howToUse: "Enter air temperature (°C) and relative humidity (%).",
    faqs: [{ question: "What's a comfortable dew point?", answer: "Below 16°C (60°F) is comfortable. Above 20°C feels oppressive." }],
    relatedCalcs: batch2Rel("dew-point-calculator"),
  },
  {
    slug: "rainfall-calculator", name: "Rainfall Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Weather & Environment",
    description: "Calculate water volume from rainfall amount and area.",
    metaDescription: "Free rainfall calculator. Estimate water volume from rain.",
    icon: "layers",
    inputs: [
      { id: "rainfall", label: "Rainfall (inches)", type: "number", defaultValue: 2, step: 0.1 },
      { id: "area", label: "Area (sq ft)", type: "number", defaultValue: 1000 },
    ],
    calculate: (v) => {
      const cubicFeet = v.area * (v.rainfall / 12);
      const gallons = cubicFeet * 7.48052;
      const liters = gallons * 3.78541;
      return [
        { label: "Water Volume", value: gallons.toFixed(0) + " gallons", highlight: true },
        { label: "Liters", value: liters.toFixed(0) + " L" },
        { label: "Cubic Feet", value: cubicFeet.toFixed(1) + " ft³" },
      ];
    },
    formula: { expression: "Volume = Area × Rainfall ÷ 12 × 7.48", variables: ["Area in sq ft", "Rainfall in inches"] },
    howToUse: "Enter rainfall amount in inches and collection area in square feet.",
    faqs: [{ question: "How much rain can a roof collect?", answer: "A 1000 sq ft roof collects ~623 gallons per inch of rain." }],
    relatedCalcs: batch2Rel("rainfall-calculator"),
  },
  {
    slug: "uv-index-exposure-calculator", name: "UV Exposure Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Weather & Environment",
    description: "Estimate safe sun exposure time based on UV index and skin type.",
    metaDescription: "Free UV exposure calculator. Find safe sun time by UV index.",
    icon: "layers",
    inputs: [
      { id: "uvIndex", label: "UV Index", type: "number", defaultValue: 7, min: 1, max: 15 },
      { id: "skinType", label: "Skin Type (1-6)", type: "number", defaultValue: 3, min: 1, max: 6 },
    ],
    calculate: (v) => {
      const baseTimes: Record<number, number> = { 1: 67, 2: 100, 3: 200, 4: 300, 5: 400, 6: 500 };
      const base = baseTimes[v.skinType] || 200;
      const safeMinutes = base / v.uvIndex;
      let risk = "Low";
      if (v.uvIndex >= 11) risk = "Extreme";
      else if (v.uvIndex >= 8) risk = "Very High";
      else if (v.uvIndex >= 6) risk = "High";
      else if (v.uvIndex >= 3) risk = "Moderate";
      return [
        { label: "Safe Exposure Time", value: Math.round(safeMinutes) + " min", highlight: true },
        { label: "UV Risk Level", value: risk },
        { label: "SPF 30 Time", value: Math.round(safeMinutes * 30) + " min" },
      ];
    },
    formula: { expression: "Safe Time = Base MED ÷ UV Index", variables: ["MED = Minimal Erythemal Dose by skin type"] },
    howToUse: "Enter the current UV index and your skin type (1=very fair, 6=very dark).",
    faqs: [{ question: "What UV index needs sunscreen?", answer: "UV 3+ requires protection. UV 8+ requires extra caution." }],
    relatedCalcs: batch2Rel("uv-index-exposure-calculator"),
  },
  {
    slug: "carbon-footprint-calculator", name: "Carbon Footprint Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Weather & Environment",
    description: "Estimate your annual carbon footprint from driving, electricity, and flights.",
    metaDescription: "Free carbon footprint calculator. Estimate CO2 emissions.",
    icon: "layers",
    inputs: [
      { id: "milesDriven", label: "Miles Driven/Year", type: "number", defaultValue: 12000 },
      { id: "kwh", label: "Monthly Electricity (kWh)", type: "number", defaultValue: 900 },
      { id: "flights", label: "Flight Hours/Year", type: "number", defaultValue: 10 },
    ],
    calculate: (v) => {
      const drivingCO2 = v.milesDriven * 0.411; // kg CO2 per mile
      const electricityCO2 = v.kwh * 12 * 0.42; // kg CO2 per kWh
      const flightCO2 = v.flights * 250; // kg CO2 per flight hour
      const total = (drivingCO2 + electricityCO2 + flightCO2) / 1000; // metric tons
      return [
        { label: "Annual CO₂", value: total.toFixed(1) + " tons", highlight: true },
        { label: "From Driving", value: (drivingCO2 / 1000).toFixed(1) + " tons" },
        { label: "From Electricity", value: (electricityCO2 / 1000).toFixed(1) + " tons" },
        { label: "From Flights", value: (flightCO2 / 1000).toFixed(1) + " tons" },
      ];
    },
    formula: { expression: "CO₂ = Driving + Electricity + Flights", variables: ["0.411 kg/mile driving", "0.42 kg/kWh electricity", "250 kg/flight hour"] },
    howToUse: "Enter annual miles driven, monthly electricity usage, and flight hours.",
    faqs: [{ question: "What's the average US carbon footprint?", answer: "About 16 metric tons CO₂ per person per year." }],
    relatedCalcs: batch2Rel("carbon-footprint-calculator"),
  },

  // ═══════════════════════════════════════
  // PETS & ANIMALS (subcategory)
  // ═══════════════════════════════════════
  {
    slug: "dog-age-calculator", name: "Dog Age Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Pets & Animals",
    description: "Convert dog years to human years using the updated formula.",
    metaDescription: "Free dog age calculator. Convert dog years to human years accurately.",
    icon: "layers",
    inputs: [
      { id: "dogAge", label: "Dog's Age (years)", type: "number", defaultValue: 5, step: 0.5 },
      { id: "size", label: "Dog Size", type: "select", defaultValue: 2, options: [
        { value: 1, label: "Small (< 20 lbs)" },
        { value: 2, label: "Medium (20-50 lbs)" },
        { value: 3, label: "Large (50-90 lbs)" },
        { value: 4, label: "Giant (90+ lbs)" },
      ]},
    ],
    calculate: (v) => {
      const multipliers: Record<number, number> = { 1: 5, 2: 6, 3: 7, 4: 8 };
      const mult = multipliers[v.size] || 6;
      let humanAge: number;
      if (v.dogAge <= 1) humanAge = 15;
      else if (v.dogAge <= 2) humanAge = 15 + 9 * (v.dogAge - 1);
      else humanAge = 24 + (v.dogAge - 2) * mult;
      const lifeExpectancy: Record<number, number> = { 1: 15, 2: 12, 3: 10, 4: 8 };
      const remaining = Math.max(0, lifeExpectancy[v.size] - v.dogAge);
      return [
        { label: "Human Equivalent", value: Math.round(humanAge) + " years", highlight: true },
        { label: "Dog Age", value: v.dogAge + " years" },
        { label: "Est. Life Remaining", value: remaining.toFixed(1) + " years" },
      ];
    },
    formula: { expression: "First 2 years: 15 + 9. After: 24 + (age-2) × multiplier", variables: ["Multiplier varies by size"] },
    howToUse: "Enter your dog's age and size category.",
    faqs: [{ question: "Is the 7-year rule accurate?", answer: "No, dogs age faster in early years. Size also matters significantly." }],
    relatedCalcs: batch2Rel("dog-age-calculator"),
  },
  {
    slug: "cat-age-calculator", name: "Cat Age Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Pets & Animals",
    description: "Convert cat years to human years.",
    metaDescription: "Free cat age calculator. Convert cat years to human equivalent.",
    icon: "layers",
    inputs: [
      { id: "catAge", label: "Cat's Age (years)", type: "number", defaultValue: 5, step: 0.5 },
    ],
    calculate: (v) => {
      let humanAge: number;
      if (v.catAge <= 1) humanAge = 15;
      else if (v.catAge <= 2) humanAge = 24;
      else humanAge = 24 + (v.catAge - 2) * 4;
      const stage = v.catAge <= 0.5 ? "Kitten" : v.catAge <= 2 ? "Junior" : v.catAge <= 6 ? "Prime" : v.catAge <= 10 ? "Mature" : v.catAge <= 14 ? "Senior" : "Geriatric";
      return [
        { label: "Human Equivalent", value: Math.round(humanAge) + " years", highlight: true },
        { label: "Life Stage", value: stage },
        { label: "Cat Age", value: v.catAge + " years" },
      ];
    },
    formula: { expression: "Year 1 = 15, Year 2 = 24, After: +4 per year", variables: ["Cats age fastest in first 2 years"] },
    howToUse: "Enter your cat's age in years.",
    faqs: [{ question: "How long do cats live?", answer: "Indoor cats average 12-18 years. Some reach 20+." }],
    relatedCalcs: batch2Rel("cat-age-calculator"),
  },
  {
    slug: "pet-food-calculator", name: "Pet Food Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Pets & Animals",
    description: "Calculate daily food requirements for dogs and cats based on weight.",
    metaDescription: "Free pet food calculator. Determine daily feeding amounts.",
    icon: "layers",
    inputs: [
      { id: "weight", label: "Pet Weight (lbs)", type: "number", defaultValue: 30 },
      { id: "activity", label: "Activity Level", type: "select", defaultValue: 2, options: [
        { value: 1, label: "Low / Senior" },
        { value: 2, label: "Normal / Adult" },
        { value: 3, label: "High / Active" },
        { value: 4, label: "Very High / Working" },
      ]},
    ],
    calculate: (v) => {
      const weightKg = v.weight * 0.453592;
      const rer = 70 * Math.pow(weightKg, 0.75); // Resting energy requirement
      const multipliers: Record<number, number> = { 1: 1.0, 2: 1.4, 3: 1.8, 4: 2.5 };
      const dailyCal = rer * (multipliers[v.activity] || 1.4);
      const cupsPerDay = dailyCal / 350; // ~350 cal per cup average dry food
      return [
        { label: "Daily Calories", value: Math.round(dailyCal) + " cal", highlight: true },
        { label: "Cups Dry Food/Day", value: cupsPerDay.toFixed(1) },
        { label: "Resting Energy", value: Math.round(rer) + " cal" },
      ];
    },
    formula: { expression: "RER = 70 × Weight(kg)^0.75", variables: ["Daily = RER × Activity multiplier"] },
    howToUse: "Enter pet weight and activity level.",
    faqs: [{ question: "How often should I feed my pet?", answer: "Adults: 2 meals/day. Puppies/kittens: 3-4 meals/day." }],
    relatedCalcs: batch2Rel("pet-food-calculator"),
  },

  // ═══════════════════════════════════════
  // HEALTH & SAFETY (subcategory)
  // ═══════════════════════════════════════
  {
    slug: "blood-alcohol-calculator", name: "Blood Alcohol Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Health & Safety",
    description: "Estimate blood alcohol content (BAC) based on drinks, weight, and time.",
    metaDescription: "Free BAC calculator. Estimate blood alcohol content.",
    icon: "layers",
    inputs: [
      { id: "drinks", label: "Standard Drinks", type: "number", defaultValue: 3 },
      { id: "weight", label: "Body Weight (lbs)", type: "number", defaultValue: 160 },
      { id: "hours", label: "Hours Drinking", type: "number", defaultValue: 2, step: 0.5 },
      { id: "gender", label: "Gender", type: "select", defaultValue: 1, options: [
        { value: 1, label: "Male" },
        { value: 2, label: "Female" },
      ]},
    ],
    calculate: (v) => {
      const r = v.gender === 1 ? 0.73 : 0.66;
      const bac = ((v.drinks * 0.6 * 5.14) / (v.weight * r)) - (0.015 * v.hours);
      const actualBac = Math.max(0, bac);
      let status = "Sober";
      if (actualBac >= 0.30) status = "Life-threatening";
      else if (actualBac >= 0.20) status = "Very impaired";
      else if (actualBac >= 0.08) status = "Legally impaired";
      else if (actualBac >= 0.04) status = "Mildly impaired";
      else if (actualBac > 0) status = "Minimal effects";
      const soberHours = actualBac / 0.015;
      return [
        { label: "Estimated BAC", value: actualBac.toFixed(3) + "%", highlight: true },
        { label: "Status", value: status },
        { label: "Hours Until Sober", value: soberHours.toFixed(1) + " hrs" },
        { label: "Legal Limit (US)", value: "0.080%" },
      ];
    },
    formula: { expression: "BAC = (Drinks × 0.6 × 5.14) / (Weight × r) - 0.015 × Hours", variables: ["r = 0.73 (male), 0.66 (female)"] },
    howToUse: "Enter number of standard drinks, body weight, hours, and gender.",
    faqs: [{ question: "What is a standard drink?", answer: "12oz beer, 5oz wine, or 1.5oz spirits." }],
    relatedCalcs: batch2Rel("blood-alcohol-calculator"),
  },
  {
    slug: "water-intake-calculator", name: "Water Intake Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Health & Safety",
    description: "Calculate recommended daily water intake based on weight and activity.",
    metaDescription: "Free water intake calculator. Find your daily hydration needs.",
    icon: "layers",
    inputs: [
      { id: "weight", label: "Body Weight (lbs)", type: "number", defaultValue: 150 },
      { id: "activity", label: "Activity Level", type: "select", defaultValue: 2, options: [
        { value: 1, label: "Sedentary" },
        { value: 2, label: "Moderate" },
        { value: 3, label: "Active" },
        { value: 4, label: "Very Active" },
      ]},
    ],
    calculate: (v) => {
      const baseOz = v.weight * 0.5;
      const multipliers: Record<number, number> = { 1: 1.0, 2: 1.2, 3: 1.5, 4: 1.8 };
      const totalOz = baseOz * (multipliers[v.activity] || 1.2);
      const cups = totalOz / 8;
      const liters = totalOz * 0.0295735;
      return [
        { label: "Daily Water", value: Math.round(totalOz) + " oz", highlight: true },
        { label: "Cups", value: cups.toFixed(1) + " cups" },
        { label: "Liters", value: liters.toFixed(1) + " L" },
      ];
    },
    formula: { expression: "Water = Weight(lbs) × 0.5 × Activity Factor", variables: ["Base = half body weight in oz"] },
    howToUse: "Enter body weight and activity level.",
    faqs: [{ question: "Is 8 glasses a day enough?", answer: "It depends on weight and activity. Larger/active people need more." }],
    relatedCalcs: batch2Rel("water-intake-calculator"),
  },
  {
    slug: "blood-pressure-calculator", name: "Blood Pressure Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Health & Safety",
    description: "Classify blood pressure readings and calculate mean arterial pressure.",
    metaDescription: "Free blood pressure calculator. Classify BP readings.",
    icon: "layers",
    inputs: [
      { id: "systolic", label: "Systolic (mmHg)", type: "number", defaultValue: 120 },
      { id: "diastolic", label: "Diastolic (mmHg)", type: "number", defaultValue: 80 },
    ],
    calculate: (v) => {
      const map = v.diastolic + (v.systolic - v.diastolic) / 3;
      const pp = v.systolic - v.diastolic;
      let category = "Normal";
      if (v.systolic >= 180 || v.diastolic >= 120) category = "Hypertensive Crisis";
      else if (v.systolic >= 140 || v.diastolic >= 90) category = "Stage 2 Hypertension";
      else if (v.systolic >= 130 || v.diastolic >= 80) category = "Stage 1 Hypertension";
      else if (v.systolic >= 120) category = "Elevated";
      return [
        { label: "Classification", value: category, highlight: true },
        { label: "Mean Arterial Pressure", value: map.toFixed(1) + " mmHg" },
        { label: "Pulse Pressure", value: pp + " mmHg" },
        { label: "Reading", value: v.systolic + "/" + v.diastolic },
      ];
    },
    formula: { expression: "MAP = Diastolic + (Systolic - Diastolic) / 3", variables: ["Normal BP: < 120/80 mmHg"] },
    howToUse: "Enter systolic and diastolic blood pressure values.",
    faqs: [{ question: "What's normal blood pressure?", answer: "Less than 120/80 mmHg is considered normal." }],
    relatedCalcs: batch2Rel("blood-pressure-calculator"),
  },

  // ═══════════════════════════════════════
  // ELECTRICITY & ENERGY (subcategory)
  // ═══════════════════════════════════════
  {
    slug: "electricity-bill-calculator", name: "Electricity Bill Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Electricity & Energy",
    description: "Estimate monthly electricity bill from appliance usage.",
    metaDescription: "Free electricity bill estimator. Calculate monthly power costs.",
    icon: "layers",
    inputs: [
      { id: "kwh", label: "Monthly Usage (kWh)", type: "number", defaultValue: 900 },
      { id: "rate", label: "Rate per kWh ($)", type: "number", defaultValue: 0.13, prefix: "$", step: 0.01 },
      { id: "fixedCharge", label: "Fixed Monthly Charge", type: "number", defaultValue: 15, prefix: "$" },
    ],
    calculate: (v) => {
      const energyCost = v.kwh * v.rate;
      const total = energyCost + v.fixedCharge;
      const annual = total * 12;
      const dailyCost = total / 30;
      return [
        { label: "Monthly Bill", value: fmt(total), highlight: true },
        { label: "Energy Cost", value: fmt(energyCost) },
        { label: "Daily Cost", value: fmt(dailyCost) },
        { label: "Annual Estimate", value: fmt0(annual) },
      ];
    },
    formula: { expression: "Bill = (kWh × Rate) + Fixed Charge", variables: ["kWh = Monthly electricity usage", "Rate = Cost per kWh"] },
    howToUse: "Enter monthly kWh usage, rate per kWh, and any fixed charges.",
    faqs: [{ question: "Average US electricity bill?", answer: "About $120-150/month for a typical household." }],
    relatedCalcs: batch2Rel("electricity-bill-calculator"),
  },
  {
    slug: "solar-panel-calculator", name: "Solar Panel Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Electricity & Energy",
    description: "Estimate solar panel system size and savings for your home.",
    metaDescription: "Free solar panel calculator. Estimate system size and cost savings.",
    icon: "layers",
    inputs: [
      { id: "monthlyBill", label: "Monthly Electric Bill", type: "number", defaultValue: 150, prefix: "$" },
      { id: "sunHours", label: "Peak Sun Hours/Day", type: "number", defaultValue: 5, step: 0.5 },
      { id: "panelWatts", label: "Panel Wattage", type: "number", defaultValue: 400 },
    ],
    calculate: (v) => {
      const monthlyKwh = v.monthlyBill / 0.13;
      const dailyKwh = monthlyKwh / 30;
      const systemKw = dailyKwh / v.sunHours;
      const panels = Math.ceil((systemKw * 1000) / v.panelWatts);
      const systemCost = systemKw * 2800;
      const annualSavings = v.monthlyBill * 12;
      const payback = systemCost / annualSavings;
      return [
        { label: "System Size", value: systemKw.toFixed(1) + " kW", highlight: true },
        { label: "Panels Needed", value: panels.toString() },
        { label: "Est. System Cost", value: fmt0(systemCost) },
        { label: "Payback Period", value: payback.toFixed(1) + " years" },
      ];
    },
    formula: { expression: "System kW = Daily kWh ÷ Sun Hours", variables: ["Daily kWh = Monthly Bill ÷ Rate ÷ 30"] },
    howToUse: "Enter your monthly bill, average peak sun hours, and panel wattage.",
    faqs: [{ question: "How many sun hours does my area get?", answer: "US average is 4-6 peak sun hours. Check NREL's solar resource maps." }],
    relatedCalcs: batch2Rel("solar-panel-calculator"),
  },
  {
    slug: "battery-life-calculator", name: "Battery Life Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Electricity & Energy",
    description: "Calculate battery runtime from capacity and device power consumption.",
    metaDescription: "Free battery life calculator. Estimate device runtime from battery capacity.",
    icon: "layers",
    inputs: [
      { id: "capacity", label: "Battery Capacity (mAh)", type: "number", defaultValue: 5000 },
      { id: "consumption", label: "Device Consumption (mA)", type: "number", defaultValue: 500 },
      { id: "efficiency", label: "Efficiency (%)", type: "number", defaultValue: 85, suffix: "%" },
    ],
    calculate: (v) => {
      const effectiveCapacity = v.capacity * (v.efficiency / 100);
      const hours = effectiveCapacity / v.consumption;
      const minutes = hours * 60;
      return [
        { label: "Battery Life", value: hours.toFixed(1) + " hours", highlight: true },
        { label: "Total Minutes", value: Math.round(minutes) + " min" },
        { label: "Effective Capacity", value: Math.round(effectiveCapacity) + " mAh" },
        { label: "Watt-hours", value: (v.capacity * 3.7 / 1000).toFixed(1) + " Wh" },
      ];
    },
    formula: { expression: "Runtime = (Capacity × Efficiency) ÷ Consumption", variables: ["Capacity in mAh", "Consumption in mA"] },
    howToUse: "Enter battery capacity (mAh), device power draw (mA), and efficiency.",
    faqs: [{ question: "Why include efficiency?", answer: "Real batteries lose 10-20% to heat and voltage conversion." }],
    relatedCalcs: batch2Rel("battery-life-calculator"),
  },

  // ═══════════════════════════════════════
  // TRAVEL & TRANSPORTATION (subcategory)
  // ═══════════════════════════════════════
  {
    slug: "flight-time-calculator", name: "Flight Time Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Travel & Transportation",
    description: "Estimate flight time based on distance and aircraft speed.",
    metaDescription: "Free flight time calculator. Estimate travel time by air.",
    icon: "layers",
    inputs: [
      { id: "distance", label: "Distance (miles)", type: "number", defaultValue: 2500 },
      { id: "speed", label: "Aircraft Speed (mph)", type: "number", defaultValue: 550 },
      { id: "headwind", label: "Headwind (mph)", type: "number", defaultValue: 30 },
    ],
    calculate: (v) => {
      const effectiveSpeed = v.speed - v.headwind;
      const hours = v.distance / effectiveSpeed;
      const h = Math.floor(hours);
      const m = Math.round((hours - h) * 60);
      const distKm = v.distance * 1.60934;
      return [
        { label: "Flight Time", value: `${h}h ${m}m`, highlight: true },
        { label: "Effective Speed", value: effectiveSpeed + " mph" },
        { label: "Distance (km)", value: Math.round(distKm).toLocaleString() + " km" },
      ];
    },
    formula: { expression: "Time = Distance ÷ (Speed - Headwind)", variables: ["Average jet speed: 500-600 mph"] },
    howToUse: "Enter distance, cruise speed, and headwind.",
    faqs: [{ question: "Average commercial jet speed?", answer: "About 550-580 mph (Mach 0.78-0.85)." }],
    relatedCalcs: batch2Rel("flight-time-calculator"),
  },
  {
    slug: "road-trip-calculator", name: "Road Trip Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Travel & Transportation",
    description: "Calculate road trip duration, fuel costs, and stops needed.",
    metaDescription: "Free road trip calculator. Plan your drive with time and cost estimates.",
    icon: "layers",
    inputs: [
      { id: "distance", label: "Distance (miles)", type: "number", defaultValue: 500 },
      { id: "avgSpeed", label: "Average Speed (mph)", type: "number", defaultValue: 60 },
      { id: "mpg", label: "Vehicle MPG", type: "number", defaultValue: 28 },
      { id: "gasPrice", label: "Gas Price ($/gal)", type: "number", defaultValue: 3.5, prefix: "$", step: 0.01 },
    ],
    calculate: (v) => {
      const hours = v.distance / v.avgSpeed;
      const h = Math.floor(hours);
      const m = Math.round((hours - h) * 60);
      const gallons = v.distance / v.mpg;
      const fuelCost = gallons * v.gasPrice;
      const stops = Math.floor(v.distance / 300);
      return [
        { label: "Drive Time", value: `${h}h ${m}m`, highlight: true },
        { label: "Fuel Cost", value: fmt(fuelCost) },
        { label: "Gallons Needed", value: gallons.toFixed(1) + " gal" },
        { label: "Gas Stops (~300mi)", value: stops.toString() },
      ];
    },
    formula: { expression: "Time = Distance ÷ Speed", variables: ["Fuel = Distance ÷ MPG × Price"] },
    howToUse: "Enter distance, average speed, MPG, and gas price.",
    faqs: [{ question: "How often should I stop?", answer: "Every 2-3 hours or 150-200 miles for safety." }],
    relatedCalcs: batch2Rel("road-trip-calculator"),
  },
  {
    slug: "ev-charging-calculator", name: "EV Charging Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Travel & Transportation",
    description: "Calculate EV charging time and cost based on battery size and charger level.",
    metaDescription: "Free EV charging calculator. Estimate charge time and cost.",
    icon: "layers",
    inputs: [
      { id: "battery", label: "Battery Size (kWh)", type: "number", defaultValue: 75 },
      { id: "currentCharge", label: "Current Charge (%)", type: "number", defaultValue: 20, suffix: "%" },
      { id: "targetCharge", label: "Target Charge (%)", type: "number", defaultValue: 80, suffix: "%" },
      { id: "chargerKw", label: "Charger Power (kW)", type: "number", defaultValue: 11 },
    ],
    calculate: (v) => {
      const kwhNeeded = v.battery * ((v.targetCharge - v.currentCharge) / 100);
      const hours = kwhNeeded / v.chargerKw;
      const h = Math.floor(hours);
      const m = Math.round((hours - h) * 60);
      const cost = kwhNeeded * 0.13;
      return [
        { label: "Charge Time", value: `${h}h ${m}m`, highlight: true },
        { label: "Energy Needed", value: kwhNeeded.toFixed(1) + " kWh" },
        { label: "Est. Cost", value: fmt(cost) },
        { label: "Range Added (~3.5mi/kWh)", value: Math.round(kwhNeeded * 3.5) + " mi" },
      ];
    },
    formula: { expression: "Time = kWh Needed ÷ Charger Power", variables: ["kWh = Battery × (Target - Current) / 100"] },
    howToUse: "Enter battery size, current/target charge levels, and charger power.",
    faqs: [{ question: "Level 1 vs Level 2 vs DC Fast?", answer: "L1: 1.4kW, L2: 7-19kW, DC Fast: 50-350kW." }],
    relatedCalcs: batch2Rel("ev-charging-calculator"),
  },

  // ═══════════════════════════════════════
  // CONSTRUCTION & HOME (subcategory)
  // ═══════════════════════════════════════
  {
    slug: "wallpaper-calculator", name: "Wallpaper Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Construction & Home",
    description: "Calculate how many rolls of wallpaper you need for a room.",
    metaDescription: "Free wallpaper calculator. Estimate rolls needed for your room.",
    icon: "layers",
    inputs: [
      { id: "roomLength", label: "Room Length (ft)", type: "number", defaultValue: 14 },
      { id: "roomWidth", label: "Room Width (ft)", type: "number", defaultValue: 12 },
      { id: "wallHeight", label: "Wall Height (ft)", type: "number", defaultValue: 8 },
      { id: "rollWidth", label: "Roll Width (inches)", type: "number", defaultValue: 21 },
    ],
    calculate: (v) => {
      const perimeter = 2 * (v.roomLength + v.roomWidth);
      const wallArea = perimeter * v.wallHeight;
      const rollCoverage = (v.rollWidth / 12) * 33; // standard 33ft roll
      const rolls = Math.ceil(wallArea / rollCoverage * 1.1); // 10% waste
      return [
        { label: "Rolls Needed", value: rolls.toString(), highlight: true },
        { label: "Wall Area", value: wallArea.toFixed(0) + " sq ft" },
        { label: "Roll Coverage", value: rollCoverage.toFixed(1) + " sq ft/roll" },
        { label: "Perimeter", value: perimeter + " ft" },
      ];
    },
    formula: { expression: "Rolls = Wall Area ÷ Roll Coverage × 1.1", variables: ["10% waste factor included"] },
    howToUse: "Enter room dimensions and wallpaper roll width.",
    faqs: [{ question: "Should I buy extra?", answer: "Yes, always buy 10-15% extra for pattern matching and waste." }],
    relatedCalcs: batch2Rel("wallpaper-calculator"),
  },
  {
    slug: "tile-calculator", name: "Tile Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Construction & Home",
    description: "Calculate how many tiles you need for floors or walls.",
    metaDescription: "Free tile calculator. Estimate tiles needed with waste factor.",
    icon: "layers",
    inputs: [
      { id: "areaLength", label: "Area Length (ft)", type: "number", defaultValue: 12 },
      { id: "areaWidth", label: "Area Width (ft)", type: "number", defaultValue: 10 },
      { id: "tileSize", label: "Tile Size (inches)", type: "number", defaultValue: 12 },
      { id: "waste", label: "Waste Factor (%)", type: "number", defaultValue: 10, suffix: "%" },
    ],
    calculate: (v) => {
      const areaSqFt = v.areaLength * v.areaWidth;
      const tileSqFt = (v.tileSize * v.tileSize) / 144;
      const tilesNeeded = Math.ceil(areaSqFt / tileSqFt);
      const withWaste = Math.ceil(tilesNeeded * (1 + v.waste / 100));
      const boxes = Math.ceil(withWaste / 10);
      return [
        { label: "Tiles Needed (with waste)", value: withWaste.toString(), highlight: true },
        { label: "Tiles (exact)", value: tilesNeeded.toString() },
        { label: "Area", value: areaSqFt + " sq ft" },
        { label: "Boxes (~10/box)", value: boxes.toString() },
      ];
    },
    formula: { expression: "Tiles = Area ÷ Tile Area × (1 + Waste%)", variables: ["Tile area in sq ft"] },
    howToUse: "Enter area dimensions, tile size, and waste percentage.",
    faqs: [{ question: "How much waste to plan for?", answer: "10% for straight lay, 15% for diagonal, 20% for complex patterns." }],
    relatedCalcs: batch2Rel("tile-calculator"),
  },
  {
    slug: "fence-calculator", name: "Fence Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Construction & Home",
    description: "Calculate materials needed for fencing — posts, rails, and pickets.",
    metaDescription: "Free fence calculator. Estimate fence materials and cost.",
    icon: "layers",
    inputs: [
      { id: "length", label: "Fence Length (ft)", type: "number", defaultValue: 100 },
      { id: "height", label: "Fence Height (ft)", type: "number", defaultValue: 6 },
      { id: "postSpacing", label: "Post Spacing (ft)", type: "number", defaultValue: 8 },
      { id: "costPerFt", label: "Cost per Linear Ft ($)", type: "number", defaultValue: 25, prefix: "$" },
    ],
    calculate: (v) => {
      const posts = Math.ceil(v.length / v.postSpacing) + 1;
      const rails = Math.ceil(v.length / v.postSpacing) * (v.height > 4 ? 3 : 2);
      const pickets = Math.ceil(v.length / 0.5); // 6" spacing
      const totalCost = v.length * v.costPerFt;
      return [
        { label: "Posts Needed", value: posts.toString(), highlight: true },
        { label: "Rails", value: rails.toString() },
        { label: "Pickets (6\" spacing)", value: pickets.toString() },
        { label: "Estimated Cost", value: fmt0(totalCost) },
      ];
    },
    formula: { expression: "Posts = Length ÷ Spacing + 1", variables: ["Rails = Sections × (2 or 3)"] },
    howToUse: "Enter fence length, height, post spacing, and cost per foot.",
    faqs: [{ question: "How deep should fence posts be?", answer: "At least 1/3 of total post length, typically 2-3 feet deep." }],
    relatedCalcs: batch2Rel("fence-calculator"),
  },
  {
    slug: "deck-calculator", name: "Deck Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Construction & Home",
    description: "Calculate decking boards, joists, and screws needed for a deck.",
    metaDescription: "Free deck calculator. Estimate decking materials needed.",
    icon: "layers",
    inputs: [
      { id: "length", label: "Deck Length (ft)", type: "number", defaultValue: 16 },
      { id: "width", label: "Deck Width (ft)", type: "number", defaultValue: 12 },
      { id: "boardWidth", label: "Board Width (inches)", type: "number", defaultValue: 5.5 },
    ],
    calculate: (v) => {
      const area = v.length * v.width;
      const boardsNeeded = Math.ceil(v.width / (v.boardWidth / 12));
      const totalBoardFeet = boardsNeeded * v.length;
      const joists = Math.ceil(v.length / 1.33) + 1; // 16" OC
      const screws = area * 6; // ~6 screws per sq ft
      return [
        { label: "Deck Boards", value: boardsNeeded.toString(), highlight: true },
        { label: "Board Linear Ft", value: totalBoardFeet.toString() },
        { label: "Joists (16\" OC)", value: joists.toString() },
        { label: "Screws Needed", value: Math.round(screws).toLocaleString() },
      ];
    },
    formula: { expression: "Boards = Width ÷ Board Width", variables: ["Joists at 16\" on center"] },
    howToUse: "Enter deck dimensions and board width.",
    faqs: [{ question: "What joist spacing should I use?", answer: "16\" OC is standard. 12\" OC for diagonal decking or heavy loads." }],
    relatedCalcs: batch2Rel("deck-calculator"),
  },
  {
    slug: "insulation-calculator", name: "Insulation Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Construction & Home",
    description: "Calculate insulation needed based on area and desired R-value.",
    metaDescription: "Free insulation calculator. Estimate insulation materials needed.",
    icon: "layers",
    inputs: [
      { id: "area", label: "Area (sq ft)", type: "number", defaultValue: 1000 },
      { id: "rValue", label: "Target R-Value", type: "number", defaultValue: 38 },
      { id: "thickness", label: "Insulation Thickness (in)", type: "number", defaultValue: 12 },
    ],
    calculate: (v) => {
      const bags = Math.ceil(v.area / 40); // ~40 sq ft per bag at R-38
      const batts = Math.ceil(v.area / 48); // 16"x96" batts cover ~48 sq ft
      const cubicFt = v.area * (v.thickness / 12);
      return [
        { label: "Bags (blown-in)", value: bags.toString(), highlight: true },
        { label: "Batts (16×96\")", value: batts.toString() },
        { label: "Cubic Feet", value: cubicFt.toFixed(0) + " ft³" },
        { label: "Target R-Value", value: "R-" + v.rValue },
      ];
    },
    formula: { expression: "Coverage varies by insulation type and R-value", variables: ["Higher R-value = better insulation"] },
    howToUse: "Enter area to insulate, target R-value, and insulation thickness.",
    faqs: [{ question: "What R-value do I need?", answer: "Attic: R-38 to R-60. Walls: R-13 to R-21. Varies by climate zone." }],
    relatedCalcs: batch2Rel("insulation-calculator"),
  },

  // ═══════════════════════════════════════
  // GARDENING & LANDSCAPING (subcategory)
  // ═══════════════════════════════════════
  {
    slug: "lawn-fertilizer-calculator", name: "Lawn Fertilizer Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Gardening & Landscaping",
    description: "Calculate how much fertilizer to apply based on lawn size and nitrogen needs.",
    metaDescription: "Free lawn fertilizer calculator. Determine application rate.",
    icon: "layers",
    inputs: [
      { id: "lawnSize", label: "Lawn Size (sq ft)", type: "number", defaultValue: 5000 },
      { id: "nitrogenRate", label: "Nitrogen Rate (lbs/1000 sqft)", type: "number", defaultValue: 1, step: 0.25 },
      { id: "fertilizerN", label: "Fertilizer N% (first number)", type: "number", defaultValue: 24, suffix: "%" },
    ],
    calculate: (v) => {
      const totalNitrogen = v.lawnSize / 1000 * v.nitrogenRate;
      const fertilizerLbs = totalNitrogen / (v.fertilizerN / 100);
      const bags = Math.ceil(fertilizerLbs / 25); // 25lb bags
      return [
        { label: "Fertilizer Needed", value: fertilizerLbs.toFixed(1) + " lbs", highlight: true },
        { label: "Bags (25 lb)", value: bags.toString() },
        { label: "Total Nitrogen", value: totalNitrogen.toFixed(1) + " lbs N" },
      ];
    },
    formula: { expression: "Fertilizer = (Area/1000 × N Rate) ÷ (N%/100)", variables: ["N Rate = lbs nitrogen per 1000 sqft"] },
    howToUse: "Enter lawn size, desired nitrogen rate, and fertilizer N percentage.",
    faqs: [{ question: "How often should I fertilize?", answer: "2-4 times per year for most lawns." }],
    relatedCalcs: batch2Rel("lawn-fertilizer-calculator"),
  },
  {
    slug: "raised-bed-soil-calculator", name: "Raised Bed Soil Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Gardening & Landscaping",
    description: "Calculate soil volume needed for raised garden beds.",
    metaDescription: "Free raised bed calculator. Estimate soil needed.",
    icon: "layers",
    inputs: [
      { id: "length", label: "Bed Length (ft)", type: "number", defaultValue: 8 },
      { id: "width", label: "Bed Width (ft)", type: "number", defaultValue: 4 },
      { id: "depth", label: "Bed Depth (inches)", type: "number", defaultValue: 12 },
    ],
    calculate: (v) => {
      const cubicFt = v.length * v.width * (v.depth / 12);
      const cubicYards = cubicFt / 27;
      const bags = Math.ceil(cubicFt / 1.5); // 1.5 cu ft bags
      const liters = cubicFt * 28.3168;
      return [
        { label: "Cubic Feet", value: cubicFt.toFixed(1) + " ft³", highlight: true },
        { label: "Cubic Yards", value: cubicYards.toFixed(2) + " yd³" },
        { label: "Bags (1.5 cu ft)", value: bags.toString() },
        { label: "Liters", value: Math.round(liters).toLocaleString() + " L" },
      ];
    },
    formula: { expression: "Volume = L × W × D/12", variables: ["Convert to cubic yards: ÷ 27"] },
    howToUse: "Enter bed length, width in feet and depth in inches.",
    faqs: [{ question: "Best soil mix for raised beds?", answer: "1/3 topsoil, 1/3 compost, 1/3 peat moss or coconut coir." }],
    relatedCalcs: batch2Rel("raised-bed-soil-calculator"),
  },
  {
    slug: "seed-spacing-calculator", name: "Seed Spacing Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Gardening & Landscaping",
    description: "Calculate how many plants fit in a garden bed with proper spacing.",
    metaDescription: "Free seed spacing calculator. Plan your garden planting.",
    icon: "layers",
    inputs: [
      { id: "bedLength", label: "Bed Length (ft)", type: "number", defaultValue: 8 },
      { id: "bedWidth", label: "Bed Width (ft)", type: "number", defaultValue: 4 },
      { id: "spacing", label: "Plant Spacing (inches)", type: "number", defaultValue: 12 },
    ],
    calculate: (v) => {
      const spacingFt = v.spacing / 12;
      const rows = Math.floor(v.bedWidth / spacingFt);
      const plantsPerRow = Math.floor(v.bedLength / spacingFt);
      const total = rows * plantsPerRow;
      return [
        { label: "Total Plants", value: total.toString(), highlight: true },
        { label: "Rows", value: rows.toString() },
        { label: "Plants Per Row", value: plantsPerRow.toString() },
        { label: "Bed Area", value: (v.bedLength * v.bedWidth) + " sq ft" },
      ];
    },
    formula: { expression: "Plants = (Width ÷ Spacing) × (Length ÷ Spacing)", variables: ["Spacing in feet"] },
    howToUse: "Enter bed dimensions and desired plant spacing.",
    faqs: [{ question: "Does spacing vary by plant?", answer: "Yes! Tomatoes: 24-36\", lettuce: 6-12\", herbs: 6-18\"." }],
    relatedCalcs: batch2Rel("seed-spacing-calculator"),
  },

  // ═══════════════════════════════════════
  // EDUCATION & STUDY (subcategory)
  // ═══════════════════════════════════════
  {
    slug: "grade-average-calculator", name: "Grade Average Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Education & Study",
    description: "Calculate weighted grade averages from multiple assignments.",
    metaDescription: "Free grade average calculator. Compute weighted averages.",
    icon: "layers",
    inputs: [
      { id: "grade1", label: "Grade 1 (%)", type: "number", defaultValue: 85, suffix: "%" },
      { id: "weight1", label: "Weight 1 (%)", type: "number", defaultValue: 30, suffix: "%" },
      { id: "grade2", label: "Grade 2 (%)", type: "number", defaultValue: 92, suffix: "%" },
      { id: "weight2", label: "Weight 2 (%)", type: "number", defaultValue: 40, suffix: "%" },
      { id: "grade3", label: "Grade 3 (%)", type: "number", defaultValue: 78, suffix: "%" },
      { id: "weight3", label: "Weight 3 (%)", type: "number", defaultValue: 30, suffix: "%" },
    ],
    calculate: (v) => {
      const totalWeight = v.weight1 + v.weight2 + v.weight3;
      const weightedAvg = (v.grade1 * v.weight1 + v.grade2 * v.weight2 + v.grade3 * v.weight3) / totalWeight;
      let letter = "F";
      if (weightedAvg >= 93) letter = "A";
      else if (weightedAvg >= 90) letter = "A-";
      else if (weightedAvg >= 87) letter = "B+";
      else if (weightedAvg >= 83) letter = "B";
      else if (weightedAvg >= 80) letter = "B-";
      else if (weightedAvg >= 77) letter = "C+";
      else if (weightedAvg >= 73) letter = "C";
      else if (weightedAvg >= 70) letter = "C-";
      else if (weightedAvg >= 67) letter = "D+";
      else if (weightedAvg >= 60) letter = "D";
      return [
        { label: "Weighted Average", value: weightedAvg.toFixed(1) + "%", highlight: true },
        { label: "Letter Grade", value: letter },
        { label: "Total Weight", value: totalWeight + "%" },
      ];
    },
    formula: { expression: "Average = Σ(Grade × Weight) ÷ ΣWeight", variables: ["Each grade weighted by importance"] },
    howToUse: "Enter grades and their weights (should sum to 100%).",
    faqs: [{ question: "What if weights don't add to 100%?", answer: "The calculator normalizes them automatically." }],
    relatedCalcs: batch2Rel("grade-average-calculator"),
  },
  {
    slug: "study-time-calculator", name: "Study Time Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Education & Study",
    description: "Calculate recommended study hours based on course credits and difficulty.",
    metaDescription: "Free study time calculator. Plan your study schedule.",
    icon: "layers",
    inputs: [
      { id: "credits", label: "Course Credits", type: "number", defaultValue: 15 },
      { id: "difficulty", label: "Difficulty Level", type: "select", defaultValue: 2, options: [
        { value: 1, label: "Easy" },
        { value: 2, label: "Moderate" },
        { value: 3, label: "Hard" },
        { value: 4, label: "Very Hard" },
      ]},
    ],
    calculate: (v) => {
      const multipliers: Record<number, number> = { 1: 2, 2: 2.5, 3: 3, 4: 3.5 };
      const mult = multipliers[v.difficulty] || 2.5;
      const weeklyHours = v.credits * mult;
      const dailyHours = weeklyHours / 7;
      const classHours = v.credits; // 1 credit ≈ 1 class hour/week
      const studyOnly = weeklyHours - classHours;
      return [
        { label: "Total Weekly Hours", value: weeklyHours.toFixed(0) + " hrs", highlight: true },
        { label: "Study Hours (outside class)", value: studyOnly.toFixed(0) + " hrs" },
        { label: "Daily Average", value: dailyHours.toFixed(1) + " hrs" },
        { label: "Class Hours", value: classHours + " hrs" },
      ];
    },
    formula: { expression: "Study Hours = Credits × Difficulty Multiplier", variables: ["Rule of thumb: 2-3 hours per credit per week"] },
    howToUse: "Enter total course credits and overall difficulty level.",
    faqs: [{ question: "How many hours should I study?", answer: "General rule: 2-3 hours per credit hour per week." }],
    relatedCalcs: batch2Rel("study-time-calculator"),
  },
  {
    slug: "scholarship-calculator", name: "Scholarship Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Education & Study",
    description: "Calculate how much tuition a scholarship covers and remaining costs.",
    metaDescription: "Free scholarship calculator. Estimate tuition coverage.",
    icon: "layers",
    inputs: [
      { id: "tuition", label: "Annual Tuition", type: "number", defaultValue: 40000, prefix: "$" },
      { id: "scholarship", label: "Scholarship Amount", type: "number", defaultValue: 15000, prefix: "$" },
      { id: "years", label: "Years of Study", type: "number", defaultValue: 4 },
    ],
    calculate: (v) => {
      const totalTuition = v.tuition * v.years;
      const totalScholarship = v.scholarship * v.years;
      const remaining = totalTuition - totalScholarship;
      const coverage = (v.scholarship / v.tuition) * 100;
      return [
        { label: "Remaining Cost", value: fmt0(remaining), highlight: true },
        { label: "Total Tuition", value: fmt0(totalTuition) },
        { label: "Total Scholarship", value: fmt0(totalScholarship) },
        { label: "Coverage", value: coverage.toFixed(1) + "%" },
      ];
    },
    formula: { expression: "Remaining = (Tuition - Scholarship) × Years", variables: ["Coverage % = Scholarship ÷ Tuition"] },
    howToUse: "Enter annual tuition, scholarship amount, and years of study.",
    faqs: [{ question: "Are scholarships taxable?", answer: "Generally no for tuition, but yes for amounts used for room/board." }],
    relatedCalcs: batch2Rel("scholarship-calculator"),
  },

  // ═══════════════════════════════════════
  // EVENTS & PLANNING (subcategory)
  // ═══════════════════════════════════════
  {
    slug: "wedding-budget-calculator", name: "Wedding Budget Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Events & Planning",
    description: "Plan your wedding budget with cost breakdowns by category.",
    metaDescription: "Free wedding budget calculator. Plan wedding costs by category.",
    icon: "layers",
    inputs: [
      { id: "totalBudget", label: "Total Budget", type: "number", defaultValue: 30000, prefix: "$" },
      { id: "guests", label: "Number of Guests", type: "number", defaultValue: 100 },
    ],
    calculate: (v) => {
      const venue = v.totalBudget * 0.40;
      const catering = v.totalBudget * 0.25;
      const photography = v.totalBudget * 0.12;
      const flowers = v.totalBudget * 0.08;
      const other = v.totalBudget * 0.15;
      const perGuest = v.totalBudget / v.guests;
      return [
        { label: "Per Guest Cost", value: fmt(perGuest), highlight: true },
        { label: "Venue (40%)", value: fmt0(venue) },
        { label: "Catering (25%)", value: fmt0(catering) },
        { label: "Photography (12%)", value: fmt0(photography) },
        { label: "Flowers/Decor (8%)", value: fmt0(flowers) },
        { label: "Other (15%)", value: fmt0(other) },
      ];
    },
    formula: { expression: "Industry standard allocation percentages", variables: ["Venue 40%, Catering 25%, Photo 12%, Flowers 8%, Other 15%"] },
    howToUse: "Enter total budget and number of guests.",
    faqs: [{ question: "Average US wedding cost?", answer: "About $30,000-35,000 in 2024." }],
    relatedCalcs: batch2Rel("wedding-budget-calculator"),
  },
  {
    slug: "party-food-calculator", name: "Party Food Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Events & Planning",
    description: "Calculate how much food and drinks to buy for a party.",
    metaDescription: "Free party food calculator. Plan food quantities for events.",
    icon: "layers",
    inputs: [
      { id: "guests", label: "Number of Guests", type: "number", defaultValue: 30 },
      { id: "hours", label: "Event Duration (hours)", type: "number", defaultValue: 4 },
    ],
    calculate: (v) => {
      const appetizers = v.guests * 6; // 6 pieces per person
      const mainDishLbs = v.guests * 0.5; // 0.5 lb per person
      const drinks = v.guests * v.hours * 1; // 1 drink per hour
      const icePerPerson = 1.5; // lbs
      const totalIce = v.guests * icePerPerson;
      return [
        { label: "Appetizer Pieces", value: appetizers.toString(), highlight: true },
        { label: "Main Dish", value: mainDishLbs.toFixed(0) + " lbs" },
        { label: "Drinks", value: drinks + " servings" },
        { label: "Ice Needed", value: totalIce.toFixed(0) + " lbs" },
      ];
    },
    formula: { expression: "Per person: 6 appetizers, 0.5lb main, 1 drink/hour", variables: ["Adjust for event type and duration"] },
    howToUse: "Enter number of guests and event duration.",
    faqs: [{ question: "How much alcohol for a party?", answer: "Plan 2 drinks for the first hour, 1 per hour after." }],
    relatedCalcs: batch2Rel("party-food-calculator"),
  },
  {
    slug: "event-seating-calculator", name: "Event Seating Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Events & Planning",
    description: "Calculate venue space and tables needed for event seating.",
    metaDescription: "Free event seating calculator. Plan your venue layout.",
    icon: "layers",
    inputs: [
      { id: "guests", label: "Number of Guests", type: "number", defaultValue: 120 },
      { id: "seatsPerTable", label: "Seats per Table", type: "number", defaultValue: 8 },
      { id: "sqFtPerPerson", label: "Sq Ft per Person", type: "number", defaultValue: 15 },
    ],
    calculate: (v) => {
      const tables = Math.ceil(v.guests / v.seatsPerTable);
      const totalSqFt = v.guests * v.sqFtPerPerson;
      const danceFloor = v.guests * 3; // 3 sq ft per dancer
      return [
        { label: "Tables Needed", value: tables.toString(), highlight: true },
        { label: "Venue Space", value: totalSqFt.toLocaleString() + " sq ft" },
        { label: "Dance Floor", value: danceFloor + " sq ft" },
        { label: "Total Space", value: (totalSqFt + danceFloor).toLocaleString() + " sq ft" },
      ];
    },
    formula: { expression: "Tables = Guests ÷ Seats per Table", variables: ["15 sq ft per person for sit-down dining"] },
    howToUse: "Enter guest count, seats per table, and space allocation.",
    faqs: [{ question: "How much space per person?", answer: "Sit-down: 12-15 sq ft. Cocktail: 6-8 sq ft." }],
    relatedCalcs: batch2Rel("event-seating-calculator"),
  },

  // ═══════════════════════════════════════
  // FINANCE & SHOPPING (subcategory)  
  // ═══════════════════════════════════════
  {
    slug: "currency-exchange-calculator", name: "Currency Exchange Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Finance & Shopping",
    description: "Convert between currencies using a custom exchange rate.",
    metaDescription: "Free currency exchange calculator. Convert currencies with custom rates.",
    icon: "layers",
    inputs: [
      { id: "amount", label: "Amount", type: "number", defaultValue: 1000, prefix: "$" },
      { id: "rate", label: "Exchange Rate", type: "number", defaultValue: 0.85, step: 0.0001 },
      { id: "fee", label: "Service Fee (%)", type: "number", defaultValue: 2, suffix: "%" },
    ],
    calculate: (v) => {
      const converted = v.amount * v.rate;
      const feeAmount = converted * (v.fee / 100);
      const afterFee = converted - feeAmount;
      const effectiveRate = afterFee / v.amount;
      return [
        { label: "Converted Amount", value: converted.toFixed(2), highlight: true },
        { label: "After Fee", value: afterFee.toFixed(2) },
        { label: "Fee Amount", value: feeAmount.toFixed(2) },
        { label: "Effective Rate", value: effectiveRate.toFixed(4) },
      ];
    },
    formula: { expression: "Converted = Amount × Rate × (1 - Fee%)", variables: ["Rate = Exchange rate"] },
    howToUse: "Enter amount, exchange rate, and any service fee percentage.",
    faqs: [{ question: "Where to find exchange rates?", answer: "Check Google, XE.com, or your bank for current rates." }],
    relatedCalcs: batch2Rel("currency-exchange-calculator"),
  },
  {
    slug: "savings-goal-calculator", name: "Savings Goal Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Finance & Shopping",
    description: "Calculate monthly savings needed to reach a financial goal.",
    metaDescription: "Free savings goal calculator. Plan your savings timeline.",
    icon: "layers",
    inputs: [
      { id: "goal", label: "Savings Goal", type: "number", defaultValue: 10000, prefix: "$" },
      { id: "current", label: "Current Savings", type: "number", defaultValue: 2000, prefix: "$" },
      { id: "months", label: "Months to Goal", type: "number", defaultValue: 24 },
      { id: "interest", label: "Annual Interest (%)", type: "number", defaultValue: 4, suffix: "%", step: 0.1 },
    ],
    calculate: (v) => {
      const remaining = v.goal - v.current;
      const monthlyRate = v.interest / 100 / 12;
      let monthlySaving: number;
      if (monthlyRate > 0) {
        monthlySaving = (remaining * monthlyRate) / (Math.pow(1 + monthlyRate, v.months) - 1);
      } else {
        monthlySaving = remaining / v.months;
      }
      const totalContributions = monthlySaving * v.months;
      const interestEarned = v.goal - v.current - totalContributions;
      return [
        { label: "Monthly Savings", value: fmt(monthlySaving), highlight: true },
        { label: "Remaining to Save", value: fmt0(remaining) },
        { label: "Interest Earned", value: fmt(Math.max(0, interestEarned)) },
        { label: "Weekly Amount", value: fmt(monthlySaving / 4.33) },
      ];
    },
    formula: { expression: "Monthly = Remaining × r / ((1+r)^n - 1)", variables: ["r = Monthly interest rate", "n = Number of months"] },
    howToUse: "Enter your goal, current savings, timeline, and expected interest rate.",
    faqs: [{ question: "Where to save for goals?", answer: "High-yield savings accounts offer 4-5% APY currently." }],
    relatedCalcs: batch2Rel("savings-goal-calculator"),
  },
  {
    slug: "price-per-sqft-calculator", name: "Price Per Square Foot Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Finance & Shopping",
    description: "Calculate and compare property prices per square foot.",
    metaDescription: "Free price per square foot calculator. Compare property values.",
    icon: "layers",
    inputs: [
      { id: "price", label: "Property Price", type: "number", defaultValue: 350000, prefix: "$" },
      { id: "sqft", label: "Square Footage", type: "number", defaultValue: 1800 },
    ],
    calculate: (v) => {
      const pricePerSqFt = v.price / v.sqft;
      const pricePerSqM = pricePerSqFt * 10.764;
      return [
        { label: "Price per Sq Ft", value: fmt(pricePerSqFt), highlight: true },
        { label: "Price per Sq Meter", value: fmt(pricePerSqM) },
        { label: "Total Price", value: fmt0(v.price) },
        { label: "Total Area", value: v.sqft.toLocaleString() + " sq ft" },
      ];
    },
    formula: { expression: "Price/SqFt = Total Price ÷ Square Footage", variables: ["Lower $/sqft = better value"] },
    howToUse: "Enter property price and total square footage.",
    faqs: [{ question: "Average price per sq ft in US?", answer: "National average is ~$150-200, but varies hugely by location." }],
    relatedCalcs: batch2Rel("price-per-sqft-calculator"),
  },

  // ═══════════════════════════════════════
  // SEWING & CRAFTS (subcategory)
  // ═══════════════════════════════════════
  {
    slug: "fabric-calculator", name: "Fabric Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Sewing & Crafts",
    description: "Calculate how much fabric you need for curtains, clothing, or projects.",
    metaDescription: "Free fabric calculator. Estimate yards of fabric needed.",
    icon: "layers",
    inputs: [
      { id: "width", label: "Project Width (inches)", type: "number", defaultValue: 60 },
      { id: "height", label: "Project Height (inches)", type: "number", defaultValue: 84 },
      { id: "panels", label: "Number of Panels", type: "number", defaultValue: 2 },
      { id: "fabricWidth", label: "Fabric Width (inches)", type: "number", defaultValue: 54 },
    ],
    calculate: (v) => {
      const widthsNeeded = Math.ceil((v.width * v.panels) / v.fabricWidth);
      const totalInches = widthsNeeded * (v.height + 6); // 6" for hems
      const yards = totalInches / 36;
      const meters = yards * 0.9144;
      return [
        { label: "Yards Needed", value: yards.toFixed(1) + " yd", highlight: true },
        { label: "Meters", value: meters.toFixed(1) + " m" },
        { label: "Widths to Cut", value: widthsNeeded.toString() },
        { label: "Total Length (in)", value: totalInches.toString() },
      ];
    },
    formula: { expression: "Yards = (Widths × (Height + Hem)) ÷ 36", variables: ["6\" hem allowance included"] },
    howToUse: "Enter project dimensions, number of panels, and fabric width.",
    faqs: [{ question: "How much extra for pattern matching?", answer: "Add 10-15% for pattern repeats." }],
    relatedCalcs: batch2Rel("fabric-calculator"),
  },
  {
    slug: "yarn-calculator", name: "Yarn Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Sewing & Crafts",
    description: "Calculate yarn needed for knitting or crochet projects.",
    metaDescription: "Free yarn calculator. Estimate skeins needed for your project.",
    icon: "layers",
    inputs: [
      { id: "width", label: "Project Width (inches)", type: "number", defaultValue: 50 },
      { id: "height", label: "Project Height (inches)", type: "number", defaultValue: 60 },
      { id: "gauge", label: "Stitches per Inch", type: "number", defaultValue: 4, step: 0.5 },
      { id: "yardsPer", label: "Yards per Skein", type: "number", defaultValue: 220 },
    ],
    calculate: (v) => {
      const totalStitches = v.width * v.gauge * v.height * v.gauge;
      const yardsNeeded = totalStitches / (v.gauge * v.gauge) * 1.5; // rough estimate
      const skeins = Math.ceil(yardsNeeded / v.yardsPer);
      return [
        { label: "Skeins Needed", value: skeins.toString(), highlight: true },
        { label: "Total Yards", value: Math.round(yardsNeeded).toLocaleString() },
        { label: "Total Stitches", value: totalStitches.toLocaleString() },
      ];
    },
    formula: { expression: "Yards ≈ Area × 1.5 (approx)", variables: ["Varies by stitch pattern and tension"] },
    howToUse: "Enter project dimensions, gauge, and yards per skein.",
    faqs: [{ question: "How do I find my gauge?", answer: "Knit a 4×4 inch swatch and count stitches per inch." }],
    relatedCalcs: batch2Rel("yarn-calculator"),
  },
  {
    slug: "candle-wax-calculator", name: "Candle Wax Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Sewing & Crafts",
    description: "Calculate wax needed for candle making based on container volume.",
    metaDescription: "Free candle wax calculator. Estimate wax for candle making.",
    icon: "layers",
    inputs: [
      { id: "diameter", label: "Container Diameter (inches)", type: "number", defaultValue: 3, step: 0.25 },
      { id: "height", label: "Container Height (inches)", type: "number", defaultValue: 4, step: 0.25 },
      { id: "numCandles", label: "Number of Candles", type: "number", defaultValue: 6 },
    ],
    calculate: (v) => {
      const radius = v.diameter / 2;
      const volume = Math.PI * radius * radius * v.height; // cubic inches
      const ozPerCandle = volume * 0.554; // ~0.554 oz per cubic inch of soy wax
      const totalOz = ozPerCandle * v.numCandles;
      const lbs = totalOz / 16;
      return [
        { label: "Total Wax", value: lbs.toFixed(1) + " lbs", highlight: true },
        { label: "Wax per Candle", value: ozPerCandle.toFixed(1) + " oz" },
        { label: "Total Ounces", value: totalOz.toFixed(1) + " oz" },
        { label: "Fragrance Oil (10%)", value: (totalOz * 0.1).toFixed(1) + " oz" },
      ];
    },
    formula: { expression: "Volume = π × r² × h", variables: ["Wax weight ≈ Volume × 0.554 oz/in³"] },
    howToUse: "Enter container dimensions and number of candles to make.",
    faqs: [{ question: "How much fragrance oil?", answer: "Typically 6-10% of wax weight for good scent throw." }],
    relatedCalcs: batch2Rel("candle-wax-calculator"),
  },

  // ═══════════════════════════════════════
  // TECHNOLOGY & COMPUTING (subcategory)
  // ═══════════════════════════════════════
  {
    slug: "data-transfer-calculator", name: "Data Transfer Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Technology & Computing",
    description: "Calculate file transfer time based on file size and connection speed.",
    metaDescription: "Free data transfer calculator. Estimate download/upload times.",
    icon: "layers",
    inputs: [
      { id: "fileSize", label: "File Size (GB)", type: "number", defaultValue: 5, step: 0.1 },
      { id: "speed", label: "Connection Speed (Mbps)", type: "number", defaultValue: 100 },
    ],
    calculate: (v) => {
      const fileBits = v.fileSize * 8 * 1024; // Megabits
      const seconds = fileBits / v.speed;
      const minutes = seconds / 60;
      const hours = minutes / 60;
      return [
        { label: "Transfer Time", value: hours >= 1 ? hours.toFixed(1) + " hours" : minutes >= 1 ? minutes.toFixed(1) + " min" : seconds.toFixed(0) + " sec", highlight: true },
        { label: "Total Seconds", value: seconds.toFixed(1) + " sec" },
        { label: "File Size (MB)", value: (v.fileSize * 1024).toFixed(0) + " MB" },
        { label: "Speed (MB/s)", value: (v.speed / 8).toFixed(1) + " MB/s" },
      ];
    },
    formula: { expression: "Time = (File GB × 8192) ÷ Speed Mbps", variables: ["1 byte = 8 bits", "1 GB = 1024 MB"] },
    howToUse: "Enter file size in GB and connection speed in Mbps.",
    faqs: [{ question: "Why is actual speed slower?", answer: "Overhead, latency, and server limits reduce real throughput." }],
    relatedCalcs: batch2Rel("data-transfer-calculator"),
  },
  {
    slug: "storage-converter-calculator", name: "Storage Unit Converter", category: "Other Calculators", categorySlug: "other",
    subcategory: "Technology & Computing",
    description: "Convert between bytes, KB, MB, GB, TB, and PB.",
    metaDescription: "Free storage converter. Convert between digital storage units.",
    icon: "layers",
    inputs: [
      { id: "value", label: "Value", type: "number", defaultValue: 500 },
      { id: "unit", label: "Unit", type: "select", defaultValue: 3, options: [
        { value: 1, label: "KB" },
        { value: 2, label: "MB" },
        { value: 3, label: "GB" },
        { value: 4, label: "TB" },
      ]},
    ],
    calculate: (v) => {
      const toBytes: Record<number, number> = { 1: 1024, 2: 1048576, 3: 1073741824, 4: 1099511627776 };
      const bytes = v.value * (toBytes[v.unit] || 1073741824);
      return [
        { label: "Bytes", value: bytes.toExponential(3), highlight: true },
        { label: "Kilobytes", value: (bytes / 1024).toFixed(2) },
        { label: "Megabytes", value: (bytes / 1048576).toFixed(2) },
        { label: "Gigabytes", value: (bytes / 1073741824).toFixed(4) },
        { label: "Terabytes", value: (bytes / 1099511627776).toFixed(6) },
      ];
    },
    formula: { expression: "1 KB = 1024 bytes, 1 MB = 1024 KB, etc.", variables: ["Binary (1024) not decimal (1000)"] },
    howToUse: "Enter a value and select the unit to convert from.",
    faqs: [{ question: "KB vs KiB?", answer: "KB (1000 bytes) is decimal. KiB (1024 bytes) is binary. We use binary." }],
    relatedCalcs: batch2Rel("storage-converter-calculator"),
  },
  {
    slug: "screen-resolution-calculator", name: "Screen Resolution Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Technology & Computing",
    description: "Calculate pixel density (PPI) from screen size and resolution.",
    metaDescription: "Free PPI calculator. Calculate pixel density from screen specs.",
    icon: "layers",
    inputs: [
      { id: "width", label: "Horizontal Pixels", type: "number", defaultValue: 2560 },
      { id: "height", label: "Vertical Pixels", type: "number", defaultValue: 1440 },
      { id: "diagonal", label: "Screen Size (inches)", type: "number", defaultValue: 27, step: 0.1 },
    ],
    calculate: (v) => {
      const diagPixels = Math.sqrt(v.width * v.width + v.height * v.height);
      const ppi = diagPixels / v.diagonal;
      const megapixels = (v.width * v.height) / 1e6;
      const aspectW = v.width / gcd(v.width, v.height);
      const aspectH = v.height / gcd(v.width, v.height);
      function gcd(a: number, b: number): number { return b === 0 ? a : gcd(b, a % b); }
      return [
        { label: "Pixel Density", value: ppi.toFixed(0) + " PPI", highlight: true },
        { label: "Total Pixels", value: megapixels.toFixed(2) + " MP" },
        { label: "Aspect Ratio", value: `${aspectW}:${aspectH}` },
        { label: "Resolution", value: `${v.width}×${v.height}` },
      ];
    },
    formula: { expression: "PPI = √(W² + H²) ÷ Diagonal", variables: ["W, H = pixel dimensions", "Diagonal in inches"] },
    howToUse: "Enter screen resolution and diagonal size in inches.",
    faqs: [{ question: "What PPI is considered retina?", answer: "Apple defines Retina as ~220+ PPI for laptops, 326+ for phones." }],
    relatedCalcs: batch2Rel("screen-resolution-calculator"),
  },
  {
    slug: "bandwidth-calculator", name: "Bandwidth Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Technology & Computing",
    description: "Calculate bandwidth needs for streaming, video calls, and web browsing.",
    metaDescription: "Free bandwidth calculator. Estimate internet speed requirements.",
    icon: "layers",
    inputs: [
      { id: "streamingDevices", label: "4K Streaming Devices", type: "number", defaultValue: 2 },
      { id: "videoCalls", label: "Simultaneous Video Calls", type: "number", defaultValue: 1 },
      { id: "gamingDevices", label: "Gaming Devices", type: "number", defaultValue: 1 },
      { id: "generalDevices", label: "General Browsing Devices", type: "number", defaultValue: 3 },
    ],
    calculate: (v) => {
      const streamingMbps = v.streamingDevices * 25; // 4K needs ~25 Mbps
      const videoCalls = v.videoCalls * 10;
      const gaming = v.gamingDevices * 15;
      const general = v.generalDevices * 5;
      const total = streamingMbps + videoCalls + gaming + general;
      const recommended = Math.ceil(total * 1.25 / 50) * 50; // Round up with 25% buffer
      return [
        { label: "Minimum Needed", value: total + " Mbps", highlight: true },
        { label: "Recommended Plan", value: recommended + " Mbps" },
        { label: "Streaming", value: streamingMbps + " Mbps" },
        { label: "Other Uses", value: (videoCalls + gaming + general) + " Mbps" },
      ];
    },
    formula: { expression: "Total = Σ(Devices × Bandwidth per device)", variables: ["4K: 25Mbps, Video: 10Mbps, Gaming: 15Mbps, General: 5Mbps"] },
    howToUse: "Enter the number of devices for each activity type.",
    faqs: [{ question: "Is 100 Mbps enough?", answer: "For 2-3 people with moderate use, yes. Heavy households need 200+." }],
    relatedCalcs: batch2Rel("bandwidth-calculator"),
  },

  // ═══════════════════════════════════════
  // PHOTOGRAPHY & MEDIA (subcategory)
  // ═══════════════════════════════════════
  {
    slug: "photo-print-size-calculator", name: "Photo Print Size Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Photography & Media",
    description: "Determine maximum print size at various quality levels from your photo resolution.",
    metaDescription: "Free photo print size calculator. Find max print size from resolution.",
    icon: "layers",
    inputs: [
      { id: "pixelWidth", label: "Image Width (px)", type: "number", defaultValue: 4032 },
      { id: "pixelHeight", label: "Image Height (px)", type: "number", defaultValue: 3024 },
    ],
    calculate: (v) => {
      const mp = (v.pixelWidth * v.pixelHeight) / 1e6;
      const printAt300w = v.pixelWidth / 300;
      const printAt300h = v.pixelHeight / 300;
      const printAt150w = v.pixelWidth / 150;
      const printAt150h = v.pixelHeight / 150;
      return [
        { label: "Megapixels", value: mp.toFixed(1) + " MP", highlight: true },
        { label: "Max Print (300 DPI)", value: `${printAt300w.toFixed(1)}" × ${printAt300h.toFixed(1)}"` },
        { label: "Max Print (150 DPI)", value: `${printAt150w.toFixed(1)}" × ${printAt150h.toFixed(1)}"` },
        { label: "Resolution", value: `${v.pixelWidth} × ${v.pixelHeight}` },
      ];
    },
    formula: { expression: "Print Size = Pixels ÷ DPI", variables: ["300 DPI = excellent quality", "150 DPI = good for posters"] },
    howToUse: "Enter your photo's pixel dimensions.",
    faqs: [{ question: "What DPI for quality prints?", answer: "300 DPI for professional prints, 150 DPI acceptable for large posters." }],
    relatedCalcs: batch2Rel("photo-print-size-calculator"),
  },
  {
    slug: "video-file-size-calculator", name: "Video File Size Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Photography & Media",
    description: "Estimate video file size from duration, resolution, and bitrate.",
    metaDescription: "Free video file size calculator. Estimate storage needs.",
    icon: "layers",
    inputs: [
      { id: "minutes", label: "Duration (minutes)", type: "number", defaultValue: 10 },
      { id: "bitrate", label: "Bitrate (Mbps)", type: "number", defaultValue: 8, step: 0.5 },
    ],
    calculate: (v) => {
      const seconds = v.minutes * 60;
      const megabits = seconds * v.bitrate;
      const megabytes = megabits / 8;
      const gigabytes = megabytes / 1024;
      return [
        { label: "File Size", value: gigabytes >= 1 ? gigabytes.toFixed(2) + " GB" : megabytes.toFixed(0) + " MB", highlight: true },
        { label: "Megabytes", value: megabytes.toFixed(0) + " MB" },
        { label: "Gigabytes", value: gigabytes.toFixed(3) + " GB" },
        { label: "Duration", value: v.minutes + " min" },
      ];
    },
    formula: { expression: "Size (MB) = Duration(sec) × Bitrate(Mbps) ÷ 8", variables: ["1080p ≈ 8 Mbps", "4K ≈ 35-68 Mbps"] },
    howToUse: "Enter video duration and bitrate.",
    faqs: [{ question: "Typical bitrates?", answer: "1080p: 5-10 Mbps. 4K: 35-68 Mbps. 720p: 2.5-5 Mbps." }],
    relatedCalcs: batch2Rel("video-file-size-calculator"),
  },
  {
    slug: "audio-file-size-calculator", name: "Audio File Size Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Photography & Media",
    description: "Estimate audio file size from duration and quality settings.",
    metaDescription: "Free audio file size calculator. Estimate audio storage needs.",
    icon: "layers",
    inputs: [
      { id: "minutes", label: "Duration (minutes)", type: "number", defaultValue: 60 },
      { id: "bitrate", label: "Bitrate (kbps)", type: "number", defaultValue: 320 },
    ],
    calculate: (v) => {
      const seconds = v.minutes * 60;
      const kilobits = seconds * v.bitrate;
      const megabytes = kilobits / 8 / 1024;
      let format = "MP3";
      if (v.bitrate >= 1400) format = "WAV/FLAC";
      else if (v.bitrate >= 256) format = "High Quality MP3";
      else if (v.bitrate >= 128) format = "Standard MP3";
      else format = "Low Quality";
      return [
        { label: "File Size", value: megabytes.toFixed(1) + " MB", highlight: true },
        { label: "Quality Level", value: format },
        { label: "Duration", value: v.minutes + " min" },
        { label: "Bitrate", value: v.bitrate + " kbps" },
      ];
    },
    formula: { expression: "Size (MB) = Duration(sec) × Bitrate(kbps) ÷ 8192", variables: ["CD quality ≈ 1411 kbps", "MP3 ≈ 128-320 kbps"] },
    howToUse: "Enter audio duration and bitrate.",
    faqs: [{ question: "What bitrate for music?", answer: "320 kbps MP3 is near-CD quality. 128 kbps is acceptable for speech." }],
    relatedCalcs: batch2Rel("audio-file-size-calculator"),
  },

  // ═══════════════════════════════════════
  // SPORTS & FITNESS (subcategory)
  // ═══════════════════════════════════════
  {
    slug: "running-pace-calculator", name: "Running Pace Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Sports & Fitness",
    description: "Calculate running pace, speed, and predicted race finish times.",
    metaDescription: "Free running pace calculator. Find your pace and race predictions.",
    icon: "layers",
    inputs: [
      { id: "distance", label: "Distance (miles)", type: "number", defaultValue: 3.1, step: 0.1 },
      { id: "minutes", label: "Time (minutes)", type: "number", defaultValue: 25 },
      { id: "seconds", label: "Time (seconds)", type: "number", defaultValue: 0 },
    ],
    calculate: (v) => {
      const totalMinutes = v.minutes + v.seconds / 60;
      const paceMin = totalMinutes / v.distance;
      const paceMinWhole = Math.floor(paceMin);
      const paceSec = Math.round((paceMin - paceMinWhole) * 60);
      const mph = (v.distance / totalMinutes) * 60;
      const km = v.distance * 1.60934;
      const paceKm = totalMinutes / km;
      return [
        { label: "Pace", value: `${paceMinWhole}:${paceSec.toString().padStart(2, '0')} /mile`, highlight: true },
        { label: "Speed", value: mph.toFixed(1) + " mph" },
        { label: "Pace (km)", value: `${Math.floor(paceKm)}:${Math.round((paceKm % 1) * 60).toString().padStart(2, '0')} /km` },
        { label: "5K Prediction", value: `${Math.floor(paceMin * 3.1)}:${Math.round((paceMin * 3.1 % 1) * 60).toString().padStart(2, '0')}` },
      ];
    },
    formula: { expression: "Pace = Time ÷ Distance", variables: ["Speed = Distance ÷ Time × 60"] },
    howToUse: "Enter distance and finish time.",
    faqs: [{ question: "What's a good 5K pace?", answer: "Beginners: 10-12 min/mile. Intermediate: 8-10 min/mile. Advanced: sub-7 min/mile." }],
    relatedCalcs: batch2Rel("running-pace-calculator"),
  },
  {
    slug: "cycling-speed-calculator", name: "Cycling Speed Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Sports & Fitness",
    description: "Calculate cycling speed, distance, or time from known values.",
    metaDescription: "Free cycling speed calculator. Compute ride stats.",
    icon: "layers",
    inputs: [
      { id: "distance", label: "Distance (miles)", type: "number", defaultValue: 20 },
      { id: "hours", label: "Hours", type: "number", defaultValue: 1 },
      { id: "minutes", label: "Minutes", type: "number", defaultValue: 15 },
    ],
    calculate: (v) => {
      const totalHours = v.hours + v.minutes / 60;
      const speed = v.distance / totalHours;
      const speedKmh = speed * 1.60934;
      const distKm = v.distance * 1.60934;
      const calories = v.distance * 40; // rough estimate: 40 cal per mile
      return [
        { label: "Average Speed", value: speed.toFixed(1) + " mph", highlight: true },
        { label: "Speed (km/h)", value: speedKmh.toFixed(1) + " km/h" },
        { label: "Distance (km)", value: distKm.toFixed(1) + " km" },
        { label: "Est. Calories Burned", value: Math.round(calories).toLocaleString() },
      ];
    },
    formula: { expression: "Speed = Distance ÷ Time", variables: ["1 mile = 1.609 km"] },
    howToUse: "Enter ride distance and total time.",
    faqs: [{ question: "What's a good cycling speed?", answer: "Casual: 10-12 mph. Intermediate: 15-18 mph. Advanced: 20+ mph." }],
    relatedCalcs: batch2Rel("cycling-speed-calculator"),
  },
  {
    slug: "steps-to-distance-calculator", name: "Steps to Distance Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Sports & Fitness",
    description: "Convert step count to distance walked or run.",
    metaDescription: "Free steps to distance calculator. Convert steps to miles/km.",
    icon: "layers",
    inputs: [
      { id: "steps", label: "Number of Steps", type: "number", defaultValue: 10000 },
      { id: "strideLength", label: "Stride Length (inches)", type: "number", defaultValue: 30 },
    ],
    calculate: (v) => {
      const totalInches = v.steps * v.strideLength;
      const miles = totalInches / 63360;
      const km = miles * 1.60934;
      const calories = v.steps * 0.04; // rough estimate
      return [
        { label: "Distance", value: miles.toFixed(2) + " miles", highlight: true },
        { label: "Kilometers", value: km.toFixed(2) + " km" },
        { label: "Est. Calories", value: Math.round(calories).toString() },
        { label: "Total Steps", value: v.steps.toLocaleString() },
      ];
    },
    formula: { expression: "Distance = Steps × Stride Length ÷ 63360", variables: ["Average stride: 26-30 inches"] },
    howToUse: "Enter step count and your stride length in inches.",
    faqs: [{ question: "How many steps in a mile?", answer: "About 2,000-2,500 steps depending on stride length." }],
    relatedCalcs: batch2Rel("steps-to-distance-calculator"),
  },
  {
    slug: "swimming-calories-calculator", name: "Swimming Calories Calculator", category: "Other Calculators", categorySlug: "other",
    subcategory: "Sports & Fitness",
    description: "Estimate calories burned while swimming based on duration and stroke type.",
    metaDescription: "Free swimming calories calculator. Estimate energy burned swimming.",
    icon: "layers",
    inputs: [
      { id: "weight", label: "Body Weight (lbs)", type: "number", defaultValue: 160 },
      { id: "minutes", label: "Duration (minutes)", type: "number", defaultValue: 30 },
      { id: "stroke", label: "Stroke Type", type: "select", defaultValue: 2, options: [
        { value: 1, label: "Leisurely" },
        { value: 2, label: "Moderate Freestyle" },
        { value: 3, label: "Vigorous Freestyle" },
        { value: 4, label: "Butterfly" },
      ]},
    ],
    calculate: (v) => {
      const mets: Record<number, number> = { 1: 6, 2: 8, 3: 10, 4: 13.8 };
      const met = mets[v.stroke] || 8;
      const weightKg = v.weight * 0.453592;
      const calories = met * weightKg * (v.minutes / 60);
      const calPerMin = calories / v.minutes;
      return [
        { label: "Calories Burned", value: Math.round(calories).toString(), highlight: true },
        { label: "Calories/Minute", value: calPerMin.toFixed(1) },
        { label: "MET Value", value: met.toString() },
        { label: "Duration", value: v.minutes + " min" },
      ];
    },
    formula: { expression: "Calories = MET × Weight(kg) × Hours", variables: ["MET varies by intensity and stroke"] },
    howToUse: "Enter body weight, swim duration, and stroke type.",
    faqs: [{ question: "Which stroke burns most calories?", answer: "Butterfly burns the most (~13.8 MET), followed by vigorous freestyle." }],
    relatedCalcs: batch2Rel("swimming-calories-calculator"),
  },
];
