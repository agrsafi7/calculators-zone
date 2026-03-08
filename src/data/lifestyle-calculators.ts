import { CalculatorConfig } from "@/components/CalculatorTemplate";

const lifeSubcategoryMap: Record<string, string> = {
  "age-in-months-calculator": "Age & Personal",
  "sleep-calculator": "Health & Wellness",
  "love-calculator": "Fun & Entertainment",
  "compatibility-calculator": "Fun & Entertainment",
  "bmi-for-kids-calculator": "Health & Wellness",
  "pet-age-calculator": "Pets",
  "dog-age-calculator": "Pets",
  "cat-age-calculator": "Pets",
  "travel-budget-calculator": "Travel & Auto",
  "gas-mileage-calculator": "Travel & Auto",
  "trip-cost-calculator": "Travel & Auto",
  "fuel-cost-calculator": "Travel & Auto",
  "cooking-measurement-converter": "Cooking & Kitchen",
  "recipe-converter": "Cooking & Kitchen",
  "random-number-generator": "Fun & Entertainment",
  "number-to-words-converter": "Fun & Entertainment",
  "dice-roller": "Fun & Entertainment",
  "roman-numeral-converter": "Fun & Entertainment",
  "day-of-week-calculator": "Fun & Entertainment",
  "electricity-calculator": "Home & Construction",
  "concrete-calculator": "Home & Construction",
  "btu-calculator": "Home & Construction",
  "square-footage-calculator": "Home & Construction",
  "tile-calculator": "Home & Construction",
  "gravel-calculator": "Home & Construction",
  "roofing-calculator": "Home & Construction",
  "mulch-calculator": "Home & Construction",
  "stair-calculator": "Home & Construction",
  "wind-chill-calculator": "Weather",
  "dew-point-calculator": "Weather",
  "heat-index-calculator": "Weather",
  "password-generator": "Tech & Digital",
  "bandwidth-calculator": "Tech & Digital",
  "ip-subnet-calculator": "Tech & Digital",
  "voltage-drop-calculator": "Tech & Digital",
  "resistor-calculator": "Tech & Digital",
  "molarity-calculator": "Science & Chemistry",
  "height-calculator": "Health & Wellness",
  "shoe-size-converter": "Fashion & Shopping",
  "golf-handicap-calculator": "Sports & Fitness",
  "tire-size-calculator": "Travel & Auto",
  "horsepower-calculator": "Travel & Auto",
  "time-card-calculator": "Work & Productivity",
  "gdp-calculator": "Economics",
};


const lifeRelated = (exclude: string) => [
  { name: "Age Calculator", slug: "age-calculator", icon: "smile", category: "lifestyle" },
  { name: "Sleep Calculator", slug: "sleep-calculator", icon: "smile", category: "lifestyle" },
  { name: "Pet Age Calculator", slug: "pet-age-calculator", icon: "smile", category: "lifestyle" },
  { name: "Gas Mileage", slug: "gas-mileage-calculator", icon: "smile", category: "lifestyle" },
].filter((c) => c.slug !== exclude);

export const lifestyleCalculators: CalculatorConfig[] = [
  {
    slug: "age-in-months-calculator", name: "Age in Months Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Calculate your exact age in months from your date of birth.",
    metaDescription: "Free age in months calculator. Find your exact age in months from your birthday.",
    icon: "smile",
    inputs: [
      { id: "birthYear", label: "Birth Year", type: "number", defaultValue: 1990, min: 1900 },
      { id: "birthMonth", label: "Birth Month (1-12)", type: "number", defaultValue: 6, min: 1, max: 12 },
    ],
    calculate: (v) => {
      const now = new Date();
      const months = (now.getFullYear() - v.birthYear) * 12 + (now.getMonth() + 1 - v.birthMonth);
      return [
        { label: "Age in Months", value: `${months} months`, highlight: true },
        { label: "In Years", value: `${(months / 12).toFixed(1)} years` },
        { label: "In Weeks (approx)", value: `${Math.round(months * 4.345)}` },
      ];
    },
    formula: { expression: "Months = (Current Year − Birth Year) × 12 + month diff", variables: ["Simple month counting"] },
    howToUse: "Enter birth year and month to get your age in months.",
    faqs: [{ question: "Why count age in months?", answer: "For infants and toddlers, age in months is more precise than years for tracking development." }],
    relatedCalcs: lifeRelated("age-in-months-calculator"),
  },
  {
    slug: "sleep-calculator", name: "Sleep Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Calculate optimal bedtime or wake-up time based on sleep cycles (90 minutes each).",
    metaDescription: "Free sleep calculator. Find the best bedtime or wake-up time based on 90-minute sleep cycles.",
    icon: "smile",
    inputs: [
      { id: "wakeHour", label: "Wake Up Hour (0-23)", type: "number", defaultValue: 7, min: 0, max: 23 },
      { id: "wakeMin", label: "Wake Up Minute", type: "number", defaultValue: 0, min: 0, max: 59 },
      { id: "fallAsleepMin", label: "Time to Fall Asleep (min)", type: "number", defaultValue: 15, min: 0 },
    ],
    calculate: (v) => {
      const pad = (n: number) => String(n).padStart(2, "0");
      const wakeMin = v.wakeHour * 60 + v.wakeMin;
      const results: { label: string; value: string; highlight?: boolean }[] = [];
      for (let cycles = 6; cycles >= 4; cycles--) {
        const sleepMin = cycles * 90;
        let bedtime = wakeMin - sleepMin - v.fallAsleepMin;
        if (bedtime < 0) bedtime += 1440;
        const h = Math.floor(bedtime / 60) % 24;
        const m = bedtime % 60;
        results.push({
          label: `${cycles} cycles (${(cycles * 1.5).toFixed(1)}h)`,
          value: `${pad(h)}:${pad(m)}`,
          highlight: cycles === 5,
        });
      }
      return results;
    },
    formula: { expression: "Bedtime = Wake Time − (Cycles × 90 min) − Fall Asleep Time", variables: ["1 cycle ≈ 90 minutes", "5-6 cycles recommended"] },
    howToUse: "Enter your desired wake-up time and how long it takes you to fall asleep.",
    faqs: [{ question: "Why 90-minute cycles?", answer: "Each sleep cycle through light, deep, and REM sleep takes ~90 minutes. Waking between cycles feels more refreshing." }],
    relatedCalcs: lifeRelated("sleep-calculator"),
  },
  {
    slug: "love-calculator", name: "Love Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "A fun calculator that generates a compatibility score from two names. For entertainment only!",
    metaDescription: "Free love calculator. Fun compatibility score generator from two names.",
    icon: "smile",
    inputs: [
      { id: "name1Len", label: "Your Name Length (letters)", type: "number", defaultValue: 5, min: 1 },
      { id: "name2Len", label: "Partner Name Length (letters)", type: "number", defaultValue: 7, min: 1 },
    ],
    calculate: (v) => {
      // Fun deterministic "score" based on name lengths
      const score = Math.abs(((v.name1Len * 7 + v.name2Len * 13) * 37) % 101);
      let message = "Strong compatibility!";
      if (score < 30) message = "Keep working on it! 💪";
      else if (score < 60) message = "Good potential! 💕";
      else if (score < 80) message = "Great match! 💖";
      else message = "Amazing chemistry! 🔥";
      return [
        { label: "Love Score", value: `${score}%`, highlight: true },
        { label: "Message", value: message },
      ];
    },
    formula: { expression: "Secret Love Algorithm™ 💕", variables: ["For entertainment purposes only!"] },
    howToUse: "Enter the number of letters in each name for a fun compatibility score.",
    faqs: [{ question: "Is this accurate?", answer: "This is purely for fun and entertainment! Real relationships require communication, trust, and effort." }],
    relatedCalcs: lifeRelated("love-calculator"),
  },
  {
    slug: "compatibility-calculator", name: "Compatibility Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Fun compatibility calculator based on zodiac-style scoring. For entertainment only!",
    metaDescription: "Free compatibility calculator. Fun zodiac-based compatibility score.",
    icon: "smile",
    inputs: [
      { id: "month1", label: "Your Birth Month (1-12)", type: "number", defaultValue: 3, min: 1, max: 12 },
      { id: "month2", label: "Partner Birth Month (1-12)", type: "number", defaultValue: 9, min: 1, max: 12 },
    ],
    calculate: (v) => {
      const diff = Math.abs(v.month1 - v.month2);
      const scores: Record<number, number> = { 0: 95, 1: 85, 2: 75, 3: 88, 4: 70, 5: 65, 6: 90, 7: 72, 8: 78, 9: 82, 10: 68, 11: 88 };
      const score = scores[diff] || 75;
      return [
        { label: "Compatibility", value: `${score}%`, highlight: true },
        { label: "Type", value: score > 80 ? "Highly Compatible" : score > 65 ? "Compatible" : "Challenging" },
      ];
    },
    formula: { expression: "Fun algorithm based on birth month differences", variables: ["For entertainment only!"] },
    howToUse: "Enter both birth months for a fun compatibility rating.",
    faqs: [{ question: "Is this scientific?", answer: "No! This is purely for fun. Real compatibility depends on personalities, values, and communication." }],
    relatedCalcs: lifeRelated("compatibility-calculator"),
  },
  {
    slug: "bmi-for-kids-calculator", name: "BMI for Kids Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Calculate BMI for children and teens with age-appropriate percentile interpretation.",
    metaDescription: "Free BMI calculator for kids. Calculate BMI with age and gender context.",
    icon: "smile",
    inputs: [
      { id: "age", label: "Age (years)", type: "number", defaultValue: 10, min: 2, max: 19 },
      { id: "gender", label: "Gender", type: "select", defaultValue: 0, options: [{ value: 0, label: "Boy" }, { value: 1, label: "Girl" }] },
      { id: "weight", label: "Weight (kg)", type: "number", defaultValue: 32, step: 0.1 },
      { id: "height", label: "Height (cm)", type: "number", defaultValue: 137, step: 0.1 },
    ],
    calculate: (v) => {
      const bmi = v.weight / ((v.height / 100) ** 2);
      // Simplified interpretation for kids
      let category = "Healthy Weight";
      if (bmi < 14) category = "Underweight";
      else if (bmi < 18 + v.age * 0.2) category = "Healthy Weight";
      else if (bmi < 22 + v.age * 0.3) category = "Overweight";
      else category = "Obese";
      return [
        { label: "BMI", value: bmi.toFixed(1), highlight: true },
        { label: "Category", value: category },
        { label: "Age", value: `${v.age} years old` },
      ];
    },
    formula: { expression: "BMI = Weight(kg) / Height(m)²", variables: ["Interpreted with age/gender-specific charts", "Simplified thresholds"] },
    howToUse: "Enter the child's age, gender, weight, and height. Results use simplified age-adjusted thresholds.",
    faqs: [{ question: "Is child BMI different from adult?", answer: "Yes. Child BMI uses age- and gender-specific percentile charts because body composition changes with growth." }],
    relatedCalcs: lifeRelated("bmi-for-kids-calculator"),
  },
  {
    slug: "pet-age-calculator", name: "Pet Age Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Convert your pet's age to human years for dogs and cats.",
    metaDescription: "Free pet age calculator. Convert dog and cat age to human years.",
    icon: "smile",
    inputs: [
      { id: "petType", label: "Pet Type", type: "select", defaultValue: 0, options: [{ value: 0, label: "Dog (small)" }, { value: 1, label: "Dog (medium)" }, { value: 2, label: "Dog (large)" }, { value: 3, label: "Cat" }] },
      { id: "age", label: "Pet Age (years)", type: "number", defaultValue: 5, min: 0, step: 0.5 },
    ],
    calculate: (v) => {
      let humanAge: number;
      if (v.petType <= 2) {
        // Dog
        if (v.age <= 1) humanAge = 15;
        else if (v.age <= 2) humanAge = 24;
        else {
          const rate = v.petType === 0 ? 4 : v.petType === 1 ? 5 : 6;
          humanAge = 24 + (v.age - 2) * rate;
        }
      } else {
        // Cat
        if (v.age <= 1) humanAge = 15;
        else if (v.age <= 2) humanAge = 24;
        else humanAge = 24 + (v.age - 2) * 4;
      }
      const stage = humanAge < 15 ? "Kitten/Puppy" : humanAge < 30 ? "Young Adult" : humanAge < 50 ? "Adult" : humanAge < 70 ? "Mature" : "Senior";
      return [
        { label: "Human Years", value: `${Math.round(humanAge)} years`, highlight: true },
        { label: "Life Stage", value: stage },
      ];
    },
    formula: { expression: "First year ≈ 15 human years, second ≈ 9, then 4-6/year", variables: ["Varies by pet size", "Large dogs age faster"] },
    howToUse: "Select pet type and enter age to see the equivalent in human years.",
    faqs: [{ question: "Is the 7-year rule accurate?", answer: "No. The '7 years per dog year' rule is oversimplified. Dogs age faster in early years, then slow down." }],
    relatedCalcs: lifeRelated("pet-age-calculator"),
  },
  {
    slug: "dog-age-calculator", name: "Dog Age Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Convert your dog's age to human years based on breed size.",
    metaDescription: "Free dog age calculator. Convert dog years to human years by breed size.",
    icon: "smile",
    inputs: [
      { id: "size", label: "Dog Size", type: "select", defaultValue: 1, options: [{ value: 0, label: "Small (<20 lbs)" }, { value: 1, label: "Medium (20-50 lbs)" }, { value: 2, label: "Large (50-90 lbs)" }, { value: 3, label: "Giant (>90 lbs)" }] },
      { id: "age", label: "Dog Age (years)", type: "number", defaultValue: 6, min: 0, step: 0.5 },
    ],
    calculate: (v) => {
      const rates = [4, 5, 6, 7]; // years per dog year after age 2
      let human: number;
      if (v.age <= 1) human = 15;
      else if (v.age <= 2) human = 24;
      else human = 24 + (v.age - 2) * rates[v.size];
      return [
        { label: "Human Years", value: `${Math.round(human)}`, highlight: true },
        { label: "Life Stage", value: human < 30 ? "Young" : human < 55 ? "Adult" : human < 75 ? "Senior" : "Geriatric" },
      ];
    },
    formula: { expression: "Year 1 = 15, Year 2 = 9, then 4-7/year by size", variables: ["Small dogs live longer", "Giant breeds age fastest"] },
    howToUse: "Select your dog's size category and enter their age.",
    faqs: [{ question: "Do small dogs really live longer?", answer: "Generally yes. Small breeds average 12-16 years while giant breeds average 7-10 years." }],
    relatedCalcs: lifeRelated("dog-age-calculator"),
  },
  {
    slug: "cat-age-calculator", name: "Cat Age Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Convert your cat's age to human years equivalent.",
    metaDescription: "Free cat age calculator. Convert cat years to human years.",
    icon: "smile",
    inputs: [
      { id: "age", label: "Cat Age (years)", type: "number", defaultValue: 5, min: 0, step: 0.5 },
    ],
    calculate: (v) => {
      let human: number;
      if (v.age <= 1) human = 15;
      else if (v.age <= 2) human = 24;
      else human = 24 + (v.age - 2) * 4;
      return [
        { label: "Human Years", value: `${Math.round(human)}`, highlight: true },
        { label: "Life Stage", value: human < 15 ? "Kitten" : human < 30 ? "Young Adult" : human < 55 ? "Prime" : human < 75 ? "Senior" : "Geriatric" },
      ];
    },
    formula: { expression: "Year 1 = 15, Year 2 = 9, then 4/year", variables: ["Indoor cats may live 15-20 years"] },
    howToUse: "Enter your cat's age to see the human equivalent.",
    faqs: [{ question: "How long do cats live?", answer: "Indoor cats average 12-18 years. Some live into their 20s. The oldest recorded cat lived to 38." }],
    relatedCalcs: lifeRelated("cat-age-calculator"),
  },
  {
    slug: "travel-budget-calculator", name: "Travel Budget Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Estimate your total travel costs including flights, hotel, food, and activities.",
    metaDescription: "Free travel budget calculator. Estimate total trip costs for flights, hotels, food, and activities.",
    icon: "smile",
    inputs: [
      { id: "flights", label: "Flight Cost ($)", type: "number", defaultValue: 500 },
      { id: "hotelPerNight", label: "Hotel per Night ($)", type: "number", defaultValue: 120 },
      { id: "nights", label: "Number of Nights", type: "number", defaultValue: 5, min: 1 },
      { id: "foodPerDay", label: "Food per Day ($)", type: "number", defaultValue: 50 },
      { id: "activitiesPerDay", label: "Activities per Day ($)", type: "number", defaultValue: 30 },
    ],
    calculate: (v) => {
      const hotel = v.hotelPerNight * v.nights;
      const food = v.foodPerDay * (v.nights + 1);
      const activities = v.activitiesPerDay * (v.nights + 1);
      const total = v.flights + hotel + food + activities;
      return [
        { label: "Total Budget", value: `$${total.toLocaleString()}`, highlight: true },
        { label: "Hotel Total", value: `$${hotel.toLocaleString()}` },
        { label: "Food Total", value: `$${food.toLocaleString()}` },
        { label: "Daily Average", value: `$${Math.round(total / (v.nights + 1))}` },
      ];
    },
    formula: { expression: "Total = Flights + (Hotel × Nights) + (Food + Activities) × Days", variables: ["Days = Nights + 1"] },
    howToUse: "Enter costs for flights, hotel, food, and activities to estimate your trip budget.",
    faqs: [{ question: "Should I add a buffer?", answer: "Yes! Add 10-20% for unexpected expenses, tips, souvenirs, and transportation." }],
    relatedCalcs: lifeRelated("travel-budget-calculator"),
  },
  {
    slug: "gas-mileage-calculator", name: "Gas Mileage Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Calculate your vehicle's fuel efficiency (MPG or km/L) from distance and fuel used.",
    metaDescription: "Free gas mileage calculator. Calculate MPG from distance traveled and fuel consumed.",
    icon: "smile",
    inputs: [
      { id: "distance", label: "Distance Driven (miles)", type: "number", defaultValue: 300, step: 0.1 },
      { id: "fuel", label: "Fuel Used (gallons)", type: "number", defaultValue: 10, step: 0.1 },
      { id: "fuelPrice", label: "Fuel Price ($/gal)", type: "number", defaultValue: 3.5, step: 0.01 },
    ],
    calculate: (v) => {
      if (v.fuel === 0) return [{ label: "Error", value: "Fuel cannot be zero" }];
      const mpg = v.distance / v.fuel;
      const costPerMile = (v.fuel * v.fuelPrice) / v.distance;
      const kml = mpg * 0.425144;
      return [
        { label: "Fuel Economy", value: `${mpg.toFixed(1)} MPG`, highlight: true },
        { label: "km/L", value: kml.toFixed(1) },
        { label: "Cost per Mile", value: `$${costPerMile.toFixed(2)}` },
        { label: "Total Fuel Cost", value: `$${(v.fuel * v.fuelPrice).toFixed(2)}` },
      ];
    },
    formula: { expression: "MPG = Distance / Fuel", variables: ["Miles per gallon", "Cost = Fuel × Price"] },
    howToUse: "Enter the distance driven and fuel consumed to calculate fuel economy.",
    faqs: [{ question: "What is good MPG?", answer: "For gasoline cars: 25+ MPG city, 30+ highway is good. Hybrids can achieve 40-60+ MPG." }],
    relatedCalcs: lifeRelated("gas-mileage-calculator"),
  },
  {
    slug: "trip-cost-calculator", name: "Trip Cost Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Calculate the fuel cost of a road trip based on distance, fuel economy, and gas price.",
    metaDescription: "Free trip cost calculator. Estimate fuel costs for road trips.",
    icon: "smile",
    inputs: [
      { id: "distance", label: "Trip Distance (miles)", type: "number", defaultValue: 500 },
      { id: "mpg", label: "Vehicle MPG", type: "number", defaultValue: 28, step: 0.1 },
      { id: "gasPrice", label: "Gas Price ($/gal)", type: "number", defaultValue: 3.5, step: 0.01 },
    ],
    calculate: (v) => {
      if (v.mpg === 0) return [{ label: "Error", value: "MPG cannot be zero" }];
      const gallons = v.distance / v.mpg;
      const cost = gallons * v.gasPrice;
      return [
        { label: "Fuel Cost", value: `$${cost.toFixed(2)}`, highlight: true },
        { label: "Gallons Needed", value: gallons.toFixed(1) },
        { label: "Cost per Mile", value: `$${(cost / v.distance).toFixed(3)}` },
      ];
    },
    formula: { expression: "Cost = (Distance / MPG) × Gas Price", variables: ["Gallons = Distance ÷ MPG"] },
    howToUse: "Enter trip distance, your vehicle's MPG, and current gas price.",
    faqs: [{ question: "Does this include other costs?", answer: "No, this only estimates fuel. Add tolls, parking, food, and maintenance for total trip cost." }],
    relatedCalcs: lifeRelated("trip-cost-calculator"),
  },
  {
    slug: "cooking-measurement-converter", name: "Cooking Measurement Converter", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Convert between common cooking measurements: cups, tablespoons, teaspoons, ml, and ounces.",
    metaDescription: "Free cooking measurement converter. Convert cups, tbsp, tsp, ml, and oz.",
    icon: "smile",
    inputs: [
      { id: "value", label: "Value", type: "number", defaultValue: 1, step: 0.25 },
      { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Cups" }, { value: 1, label: "Tablespoons" }, { value: 2, label: "Teaspoons" }, { value: 3, label: "Milliliters" }, { value: 4, label: "Fluid Ounces" }] },
    ],
    calculate: (v) => {
      const toMl = [236.588, 14.787, 4.929, 1, 29.574];
      const ml = v.value * toMl[v.from];
      return [
        { label: "Cups", value: (ml / 236.588).toFixed(3), highlight: true },
        { label: "Tablespoons", value: (ml / 14.787).toFixed(2) },
        { label: "Teaspoons", value: (ml / 4.929).toFixed(2) },
        { label: "Milliliters", value: ml.toFixed(1) },
        { label: "Fluid Ounces", value: (ml / 29.574).toFixed(3) },
      ];
    },
    formula: { expression: "Convert to mL, then to target unit", variables: ["1 cup = 236.6 mL", "1 tbsp = 14.8 mL", "1 tsp = 4.9 mL"] },
    howToUse: "Enter a cooking measurement and unit to see all conversions.",
    faqs: [{ question: "Are these US or metric cups?", answer: "US cups (236.6 mL). A metric cup is 250 mL. Australian cups are also 250 mL." }],
    relatedCalcs: lifeRelated("cooking-measurement-converter"),
  },
  {
    slug: "recipe-converter", name: "Recipe Converter", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Scale recipe ingredients up or down by adjusting serving sizes.",
    metaDescription: "Free recipe converter. Scale recipes up or down by changing serving sizes.",
    icon: "smile",
    inputs: [
      { id: "originalServings", label: "Original Servings", type: "number", defaultValue: 4, min: 1 },
      { id: "desiredServings", label: "Desired Servings", type: "number", defaultValue: 8, min: 1 },
      { id: "amount1", label: "Ingredient Amount", type: "number", defaultValue: 2, step: 0.25 },
      { id: "amount2", label: "Ingredient 2 Amount", type: "number", defaultValue: 1.5, step: 0.25 },
    ],
    calculate: (v) => {
      const factor = v.desiredServings / v.originalServings;
      return [
        { label: "Scale Factor", value: `${factor.toFixed(2)}×`, highlight: true },
        { label: "Ingredient 1 (scaled)", value: `${(v.amount1 * factor).toFixed(2)}` },
        { label: "Ingredient 2 (scaled)", value: `${(v.amount2 * factor).toFixed(2)}` },
      ];
    },
    formula: { expression: "Scaled = Original × (Desired Servings / Original Servings)", variables: ["Simple proportion scaling"] },
    howToUse: "Enter original and desired servings, plus ingredient amounts. The calculator scales everything proportionally.",
    faqs: [{ question: "Do cooking times change?", answer: "Not proportionally. Larger batches may need slightly longer cooking, especially for baking." }],
    relatedCalcs: lifeRelated("recipe-converter"),
  },
  {
    slug: "random-number-generator", name: "Random Number Generator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Generate a random number within a specified range.",
    metaDescription: "Free random number generator. Generate random numbers within any range.",
    icon: "smile",
    inputs: [
      { id: "min", label: "Minimum", type: "number", defaultValue: 1 },
      { id: "max", label: "Maximum", type: "number", defaultValue: 100 },
    ],
    calculate: (v) => {
      const range = v.max - v.min;
      const r1 = Math.floor(Math.random() * (range + 1)) + v.min;
      const r2 = Math.floor(Math.random() * (range + 1)) + v.min;
      const r3 = Math.floor(Math.random() * (range + 1)) + v.min;
      return [
        { label: "Random Number", value: `${r1}`, highlight: true },
        { label: "Bonus #1", value: `${r2}` },
        { label: "Bonus #2", value: `${r3}` },
        { label: "Range", value: `${v.min} – ${v.max}` },
      ];
    },
    formula: { expression: "Math.random() × (max − min + 1) + min", variables: ["Uniform distribution", "Click Calculate to regenerate"] },
    howToUse: "Set a minimum and maximum range, then click Calculate to generate random numbers.",
    faqs: [{ question: "Is this truly random?", answer: "It uses JavaScript's Math.random() which is pseudo-random — good enough for most uses but not cryptographic applications." }],
    relatedCalcs: lifeRelated("random-number-generator"),
  },
  {
    slug: "number-to-words-converter", name: "Number to Words Converter", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Convert any number to its English word representation.",
    metaDescription: "Free number to words converter. Convert numbers to English text.",
    icon: "smile",
    inputs: [
      { id: "number", label: "Number", type: "number", defaultValue: 1234, min: 0 },
    ],
    calculate: (v) => {
      const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
      const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
      const convert = (n: number): string => {
        if (n === 0) return "Zero";
        if (n < 20) return ones[n];
        if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
        if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + convert(n % 100) : "");
        if (n < 1000000) return convert(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + convert(n % 1000) : "");
        if (n < 1000000000) return convert(Math.floor(n / 1000000)) + " Million" + (n % 1000000 ? " " + convert(n % 1000000) : "");
        return convert(Math.floor(n / 1000000000)) + " Billion" + (n % 1000000000 ? " " + convert(n % 1000000000) : "");
      };
      const words = convert(Math.floor(Math.abs(v.number)));
      return [
        { label: "In Words", value: (v.number < 0 ? "Negative " : "") + words, highlight: true },
        { label: "Digits", value: `${String(Math.abs(Math.floor(v.number))).length} digits` },
      ];
    },
    formula: { expression: "Recursive decomposition into place values", variables: ["Supports up to billions"] },
    howToUse: "Enter any number to see its English word representation.",
    faqs: [{ question: "What is the largest number supported?", answer: "Up to billions (999,999,999,999). Larger numbers would need additional place value names." }],
    relatedCalcs: lifeRelated("number-to-words-converter"),
  },
  // Dice Roller
  {
    slug: "dice-roller", name: "Dice Roller", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Roll one or more dice with any number of sides. Perfect for board games and RPGs.",
    metaDescription: "Free dice roller. Roll multiple dice with custom sides for board games, D&D, and more.",
    icon: "smile",
    inputs: [
      { id: "numDice", label: "Number of Dice", type: "number", defaultValue: 2, min: 1, max: 20 },
      { id: "sides", label: "Sides per Die", type: "number", defaultValue: 6, min: 2, max: 100 },
    ],
    calculate: (v) => {
      const rolls: number[] = [];
      for (let i = 0; i < Math.min(v.numDice, 20); i++) rolls.push(Math.floor(Math.random() * v.sides) + 1);
      const total = rolls.reduce((a, b) => a + b, 0);
      return [
        { label: "Total", value: `${total}`, highlight: true },
        { label: "Rolls", value: rolls.join(", ") },
        { label: "Average Roll", value: (total / rolls.length).toFixed(1) },
        { label: "Max Possible", value: `${v.numDice * v.sides}` },
      ];
    },
    formula: { expression: "Each die: random(1 to sides)", variables: ["Click Calculate to re-roll"] },
    howToUse: "Select number of dice and sides per die, then click Calculate to roll.",
    faqs: [{ question: "Is this truly random?", answer: "Uses Math.random() — pseudo-random and good for games, but not cryptographic." }],
    relatedCalcs: lifeRelated("dice-roller"),
  },
  // Electricity Cost Calculator
  {
    slug: "electricity-calculator", name: "Electricity Cost Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Calculate the electricity cost of running an appliance based on wattage, usage, and rate.",
    metaDescription: "Free electricity cost calculator. Estimate daily, monthly, and yearly electricity costs for any appliance.",
    icon: "smile",
    inputs: [
      { id: "watts", label: "Wattage (W)", type: "number", defaultValue: 100, step: 1 },
      { id: "hoursPerDay", label: "Hours Used per Day", type: "number", defaultValue: 8, step: 0.5 },
      { id: "rate", label: "Electricity Rate ($/kWh)", type: "number", defaultValue: 0.12, step: 0.01 },
    ],
    calculate: (v) => {
      const dailyKwh = (v.watts * v.hoursPerDay) / 1000;
      const dailyCost = dailyKwh * v.rate;
      return [
        { label: "Monthly Cost", value: `$${(dailyCost * 30).toFixed(2)}`, highlight: true },
        { label: "Daily Cost", value: `$${dailyCost.toFixed(2)}` },
        { label: "Annual Cost", value: `$${(dailyCost * 365).toFixed(2)}` },
        { label: "Daily kWh", value: `${dailyKwh.toFixed(2)} kWh` },
      ];
    },
    formula: { expression: "Cost = (Watts × Hours / 1000) × Rate", variables: ["kWh = kilowatt-hours"] },
    howToUse: "Enter the appliance wattage, daily usage hours, and your electricity rate.",
    faqs: [{ question: "How do I find wattage?", answer: "Check the label on your appliance or its manual. Common: LED bulb 10W, laptop 50W, AC unit 1000-3500W." }],
    relatedCalcs: lifeRelated("electricity-calculator"),
  },
  // Concrete Calculator
  {
    slug: "concrete-calculator", name: "Concrete Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Calculate how much concrete you need for a project in cubic yards and bags.",
    metaDescription: "Free concrete calculator. Estimate cubic yards and bags of concrete needed for slabs, footings, and columns.",
    icon: "smile",
    inputs: [
      { id: "length", label: "Length (feet)", type: "number", defaultValue: 10, step: 0.5 },
      { id: "width", label: "Width (feet)", type: "number", defaultValue: 10, step: 0.5 },
      { id: "depth", label: "Depth (inches)", type: "number", defaultValue: 4, step: 0.5 },
    ],
    calculate: (v) => {
      const cubicFeet = v.length * v.width * (v.depth / 12);
      const cubicYards = cubicFeet / 27;
      const bags60 = Math.ceil(cubicFeet / 0.45);
      const bags80 = Math.ceil(cubicFeet / 0.6);
      return [
        { label: "Cubic Yards", value: cubicYards.toFixed(2), highlight: true },
        { label: "Cubic Feet", value: cubicFeet.toFixed(1) },
        { label: "60-lb Bags", value: `${bags60}` },
        { label: "80-lb Bags", value: `${bags80}` },
      ];
    },
    formula: { expression: "Volume = L × W × (D/12) cubic feet; ÷ 27 = cubic yards", variables: ["60-lb bag ≈ 0.45 cu ft", "80-lb bag ≈ 0.6 cu ft"] },
    howToUse: "Enter length, width, and depth of your concrete project.",
    faqs: [{ question: "Should I order extra?", answer: "Yes, order 5-10% extra for waste, spillage, and uneven ground." }],
    relatedCalcs: lifeRelated("concrete-calculator"),
  },
  // BTU Calculator
  {
    slug: "btu-calculator", name: "BTU Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Calculate the BTU capacity needed to heat or cool a room based on square footage.",
    metaDescription: "Free BTU calculator. Estimate heating/cooling BTU requirements for any room size.",
    icon: "smile",
    inputs: [
      { id: "sqft", label: "Room Size (sq ft)", type: "number", defaultValue: 300, step: 10 },
      { id: "ceiling", label: "Ceiling Height (ft)", type: "number", defaultValue: 8, step: 0.5 },
      { id: "insulation", label: "Insulation Quality", type: "select", defaultValue: 1, options: [{ value: 1.2, label: "Poor" }, { value: 1, label: "Average" }, { value: 0.8, label: "Good" }] },
    ],
    calculate: (v) => {
      const baseBtu = v.sqft * 20 * v.insulation;
      const heightFactor = v.ceiling > 8 ? 1 + (v.ceiling - 8) * 0.1 : 1;
      const btu = baseBtu * heightFactor;
      const tons = btu / 12000;
      return [
        { label: "BTUs Needed", value: `${Math.round(btu).toLocaleString()} BTU`, highlight: true },
        { label: "Tons of Cooling", value: `${tons.toFixed(2)} tons` },
        { label: "Watts Equivalent", value: `${Math.round(btu * 0.293)} W` },
      ];
    },
    formula: { expression: "BTU ≈ Sq Ft × 20 × Insulation Factor × Height Factor", variables: ["20 BTU per sq ft is standard", "Adjusted for insulation and ceiling height"] },
    howToUse: "Enter room size, ceiling height, and insulation quality to estimate BTU needs.",
    faqs: [{ question: "What is a BTU?", answer: "British Thermal Unit — the energy to heat 1 pound of water by 1°F. Used to rate AC and heating capacity." }],
    relatedCalcs: lifeRelated("btu-calculator"),
  },
  // Wind Chill Calculator
  {
    slug: "wind-chill-calculator", name: "Wind Chill Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Calculate the wind chill temperature — how cold it actually feels with wind.",
    metaDescription: "Free wind chill calculator. Find the 'feels like' temperature based on air temperature and wind speed.",
    icon: "smile",
    inputs: [
      { id: "temp", label: "Air Temperature (°F)", type: "number", defaultValue: 20, step: 1 },
      { id: "wind", label: "Wind Speed (mph)", type: "number", defaultValue: 15, step: 1 },
    ],
    calculate: (v) => {
      if (v.temp > 50 || v.wind < 3) return [{ label: "Wind Chill", value: `${v.temp}°F (no effect)`, highlight: true }];
      const wc = 35.74 + 0.6215 * v.temp - 35.75 * Math.pow(v.wind, 0.16) + 0.4275 * v.temp * Math.pow(v.wind, 0.16);
      const frostbiteMin = wc < -18 ? "15 minutes" : wc < 0 ? "30 minutes" : "Low risk";
      return [
        { label: "Wind Chill", value: `${Math.round(wc)}°F`, highlight: true },
        { label: "Feels Like (°C)", value: `${Math.round((wc - 32) * 5 / 9)}°C` },
        { label: "Frostbite Risk", value: frostbiteMin },
      ];
    },
    formula: { expression: "WC = 35.74 + 0.6215T − 35.75V^0.16 + 0.4275TV^0.16", variables: ["T = temperature (°F)", "V = wind speed (mph)", "NWS formula"] },
    howToUse: "Enter air temperature and wind speed. Valid when temp ≤ 50°F and wind ≥ 3 mph.",
    faqs: [{ question: "What is wind chill?", answer: "It measures the cooling effect of wind on exposed skin. Faster winds make it feel colder than the actual temperature." }],
    relatedCalcs: lifeRelated("wind-chill-calculator"),
  },
  // Dew Point Calculator
  {
    slug: "dew-point-calculator", name: "Dew Point Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Calculate the dew point temperature from air temperature and relative humidity.",
    metaDescription: "Free dew point calculator. Find the dew point from temperature and humidity.",
    icon: "smile",
    inputs: [
      { id: "temp", label: "Air Temperature (°C)", type: "number", defaultValue: 25, step: 0.1 },
      { id: "humidity", label: "Relative Humidity (%)", type: "number", defaultValue: 60, min: 1, max: 100, step: 1 },
    ],
    calculate: (v) => {
      const a = 17.27, b = 237.7;
      const alpha = (a * v.temp) / (b + v.temp) + Math.log(v.humidity / 100);
      const dewPoint = (b * alpha) / (a - alpha);
      let comfort = "Comfortable";
      if (dewPoint > 24) comfort = "Extremely Humid";
      else if (dewPoint > 20) comfort = "Very Humid";
      else if (dewPoint > 16) comfort = "Somewhat Humid";
      else if (dewPoint > 10) comfort = "Comfortable";
      else comfort = "Dry";
      return [
        { label: "Dew Point", value: `${dewPoint.toFixed(1)}°C`, highlight: true },
        { label: "Dew Point (°F)", value: `${(dewPoint * 9 / 5 + 32).toFixed(1)}°F` },
        { label: "Comfort Level", value: comfort },
      ];
    },
    formula: { expression: "Td = 237.7 × α / (17.27 − α)", variables: ["α = 17.27×T/(237.7+T) + ln(RH/100)", "Magnus formula"] },
    howToUse: "Enter air temperature and relative humidity to calculate the dew point.",
    faqs: [{ question: "What does dew point mean?", answer: "The temperature at which air becomes saturated and moisture condenses. Higher dew point = more humidity and discomfort." }],
    relatedCalcs: lifeRelated("dew-point-calculator"),
  },
  // Roman Numeral Converter
  {
    slug: "roman-numeral-converter", name: "Roman Numeral Converter", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Convert between decimal numbers and Roman numerals.",
    metaDescription: "Free Roman numeral converter. Convert numbers to Roman numerals and vice versa.",
    icon: "smile",
    inputs: [
      { id: "number", label: "Number (1-3999)", type: "number", defaultValue: 2025, min: 1, max: 3999 },
    ],
    calculate: (v) => {
      const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
      const rom = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
      let n = Math.floor(Math.min(Math.max(v.number, 1), 3999));
      let result = "";
      for (let i = 0; i < val.length; i++) {
        while (n >= val[i]) { result += rom[i]; n -= val[i]; }
      }
      return [
        { label: "Roman Numeral", value: result, highlight: true },
        { label: "Decimal", value: `${Math.floor(v.number)}` },
      ];
    },
    formula: { expression: "Subtract largest Roman value repeatedly", variables: ["I=1, V=5, X=10, L=50, C=100, D=500, M=1000"] },
    howToUse: "Enter a number between 1 and 3999 to convert to Roman numerals.",
    faqs: [{ question: "Why max 3999?", answer: "Standard Roman numerals can't represent 4000+. Extended notation exists but isn't commonly used." }],
    relatedCalcs: lifeRelated("roman-numeral-converter"),
  },
  // Square Footage Calculator
  {
    slug: "square-footage-calculator", name: "Square Footage Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Calculate the square footage of a room or area from length and width measurements.",
    metaDescription: "Free square footage calculator. Calculate area in square feet from dimensions.",
    icon: "smile",
    inputs: [
      { id: "length", label: "Length (feet)", type: "number", defaultValue: 15, step: 0.5 },
      { id: "width", label: "Width (feet)", type: "number", defaultValue: 12, step: 0.5 },
    ],
    calculate: (v) => {
      const sqft = v.length * v.width;
      const sqm = sqft * 0.0929;
      const acres = sqft / 43560;
      return [
        { label: "Square Footage", value: `${sqft.toFixed(1)} sq ft`, highlight: true },
        { label: "Square Meters", value: `${sqm.toFixed(2)} m²` },
        { label: "Acres", value: acres.toFixed(6) },
      ];
    },
    formula: { expression: "Area = Length × Width", variables: ["1 sq ft = 0.0929 m²"] },
    howToUse: "Enter length and width in feet to calculate square footage.",
    faqs: [{ question: "How do I measure an irregular room?", answer: "Break it into rectangles, calculate each area, then add them together." }],
    relatedCalcs: lifeRelated("square-footage-calculator"),
  },
  // Tip Calculator (already exists in finance, add lifestyle version)
  // Fuel Cost Calculator
  {
    slug: "fuel-cost-calculator", name: "Fuel Cost Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Calculate the fuel cost for any trip based on distance, fuel economy, and gas price.",
    metaDescription: "Free fuel cost calculator. Estimate gas costs for trips based on distance and vehicle MPG.",
    icon: "smile",
    inputs: [
      { id: "distance", label: "Distance (miles)", type: "number", defaultValue: 250, step: 1 },
      { id: "mpg", label: "Fuel Economy (MPG)", type: "number", defaultValue: 28, step: 0.1 },
      { id: "gasPrice", label: "Gas Price ($/gal)", type: "number", defaultValue: 3.50, step: 0.01 },
    ],
    calculate: (v) => {
      if (v.mpg === 0) return [{ label: "Error", value: "MPG cannot be zero" }];
      const gallons = v.distance / v.mpg;
      const cost = gallons * v.gasPrice;
      return [
        { label: "Total Fuel Cost", value: `$${cost.toFixed(2)}`, highlight: true },
        { label: "Gallons Needed", value: gallons.toFixed(1) },
        { label: "Cost per Mile", value: `$${(cost / v.distance).toFixed(3)}` },
      ];
    },
    formula: { expression: "Cost = (Distance / MPG) × Price per Gallon", variables: ["Simple fuel calculation"] },
    howToUse: "Enter trip distance, your vehicle's fuel economy, and current gas price.",
    faqs: [{ question: "How do I improve MPG?", answer: "Maintain proper tire pressure, reduce speed, avoid aggressive driving, remove excess weight, and keep up with maintenance." }],
    relatedCalcs: lifeRelated("fuel-cost-calculator"),
  },
  // Time Card Calculator
  {
    slug: "time-card-calculator", name: "Time Card Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Calculate total work hours and pay from clock-in and clock-out times.",
    metaDescription: "Free time card calculator. Track daily work hours from start and end times with break deduction.",
    icon: "smile",
    inputs: [
      { id: "startH", label: "Start Hour (0-23)", type: "number", defaultValue: 9, min: 0, max: 23 },
      { id: "startM", label: "Start Minute", type: "number", defaultValue: 0, min: 0, max: 59 },
      { id: "endH", label: "End Hour (0-23)", type: "number", defaultValue: 17, min: 0, max: 23 },
      { id: "endM", label: "End Minute", type: "number", defaultValue: 30, min: 0, max: 59 },
      { id: "breakMin", label: "Break (minutes)", type: "number", defaultValue: 30, min: 0 },
      { id: "rate", label: "Hourly Rate ($)", type: "number", defaultValue: 25, step: 0.5 },
    ],
    calculate: (v) => {
      let totalMin = (v.endH * 60 + v.endM) - (v.startH * 60 + v.startM) - v.breakMin;
      if (totalMin < 0) totalMin += 1440;
      const hours = totalMin / 60;
      const pay = hours * v.rate;
      return [
        { label: "Hours Worked", value: `${Math.floor(totalMin / 60)}h ${totalMin % 60}m`, highlight: true },
        { label: "Decimal Hours", value: hours.toFixed(2) },
        { label: "Daily Pay", value: `$${pay.toFixed(2)}` },
        { label: "Weekly (×5)", value: `$${(pay * 5).toFixed(2)}` },
      ];
    },
    formula: { expression: "Hours = (End − Start − Break) / 60", variables: ["Pay = Hours × Rate"] },
    howToUse: "Enter clock-in time, clock-out time, break duration, and hourly rate.",
    faqs: [{ question: "Does this handle overnight shifts?", answer: "Yes, if end time is before start time, it assumes the shift crosses midnight." }],
    relatedCalcs: lifeRelated("time-card-calculator"),
  },
  // Horsepower Calculator
  {
    slug: "horsepower-calculator", name: "Horsepower Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Calculate horsepower from torque and RPM, or estimate engine HP from vehicle performance.",
    metaDescription: "Free horsepower calculator. Calculate HP from torque and RPM.",
    icon: "smile",
    inputs: [
      { id: "torque", label: "Torque (lb-ft)", type: "number", defaultValue: 300, step: 1 },
      { id: "rpm", label: "RPM", type: "number", defaultValue: 5000, step: 100 },
    ],
    calculate: (v) => {
      const hp = (v.torque * v.rpm) / 5252;
      const kw = hp * 0.7457;
      return [
        { label: "Horsepower", value: `${hp.toFixed(1)} HP`, highlight: true },
        { label: "Kilowatts", value: `${kw.toFixed(1)} kW` },
        { label: "Metric HP (PS)", value: `${(hp * 1.01387).toFixed(1)} PS` },
      ];
    },
    formula: { expression: "HP = Torque × RPM / 5252", variables: ["1 HP ≈ 0.7457 kW", "5252 = 33000/(2π)"] },
    howToUse: "Enter torque and RPM to calculate horsepower.",
    faqs: [{ question: "HP vs torque?", answer: "Torque is rotational force. HP is the rate of doing work (torque × speed). High torque = acceleration. High HP = top speed." }],
    relatedCalcs: lifeRelated("horsepower-calculator"),
  },
  // Password Generator
  {
    slug: "password-generator", name: "Password Generator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Generate secure random passwords with customizable length and character types.",
    metaDescription: "Free password generator. Create strong random passwords with letters, numbers, and symbols.",
    icon: "smile",
    inputs: [
      { id: "length", label: "Password Length", type: "number", defaultValue: 16, min: 4, max: 64 },
      { id: "includeUpper", label: "Include Uppercase (1=yes)", type: "number", defaultValue: 1, min: 0, max: 1 },
      { id: "includeNumbers", label: "Include Numbers (1=yes)", type: "number", defaultValue: 1, min: 0, max: 1 },
      { id: "includeSymbols", label: "Include Symbols (1=yes)", type: "number", defaultValue: 1, min: 0, max: 1 },
    ],
    calculate: (v) => {
      let chars = "abcdefghijklmnopqrstuvwxyz";
      if (v.includeUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      if (v.includeNumbers) chars += "0123456789";
      if (v.includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
      let password = "";
      for (let i = 0; i < v.length; i++) password += chars[Math.floor(Math.random() * chars.length)];
      const entropy = Math.log2(chars.length) * v.length;
      let strength = "Weak";
      if (entropy > 80) strength = "Very Strong";
      else if (entropy > 60) strength = "Strong";
      else if (entropy > 40) strength = "Moderate";
      return [
        { label: "Password", value: password, highlight: true },
        { label: "Strength", value: strength },
        { label: "Entropy", value: `${entropy.toFixed(0)} bits` },
        { label: "Character Pool", value: `${chars.length} chars` },
      ];
    },
    formula: { expression: "Random selection from character pool", variables: ["Entropy = log₂(pool size) × length"] },
    howToUse: "Set length and character options, then click Calculate to generate a new password.",
    faqs: [{ question: "How long should my password be?", answer: "At least 12-16 characters. Longer is better. Use a password manager to store unique passwords for each account." }],
    relatedCalcs: lifeRelated("password-generator"),
  },
  // Molarity Calculator
  {
    slug: "molarity-calculator", name: "Molarity Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Calculate the molarity (moles per liter) of a solution from solute mass and volume.",
    metaDescription: "Free molarity calculator. Calculate solution concentration in mol/L from mass and molar mass.",
    icon: "smile",
    inputs: [
      { id: "mass", label: "Solute Mass (grams)", type: "number", defaultValue: 58.44, step: 0.01 },
      { id: "molarMass", label: "Molar Mass (g/mol)", type: "number", defaultValue: 58.44, step: 0.01 },
      { id: "volume", label: "Solution Volume (liters)", type: "number", defaultValue: 1, step: 0.01 },
    ],
    calculate: (v) => {
      if (v.molarMass === 0 || v.volume === 0) return [{ label: "Error", value: "Values cannot be zero" }];
      const moles = v.mass / v.molarMass;
      const molarity = moles / v.volume;
      return [
        { label: "Molarity", value: `${molarity.toFixed(4)} M`, highlight: true },
        { label: "Moles of Solute", value: moles.toFixed(4) },
        { label: "In mmol/L", value: `${(molarity * 1000).toFixed(2)} mM` },
      ];
    },
    formula: { expression: "Molarity = (Mass / Molar Mass) / Volume", variables: ["M = mol/L", "Mass in grams", "Volume in liters"] },
    howToUse: "Enter solute mass, its molar mass, and solution volume to calculate molarity.",
    faqs: [{ question: "What is molarity?", answer: "Molarity (M) is the number of moles of solute per liter of solution. A 1M NaCl solution has 58.44g NaCl per liter." }],
    relatedCalcs: lifeRelated("molarity-calculator"),
  },
  // Height Calculator
  {
    slug: "height-calculator", name: "Height Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Predict a child's adult height based on parents' heights using the mid-parental height method.",
    metaDescription: "Free height calculator. Predict adult height from parents' heights using mid-parental method.",
    icon: "smile",
    inputs: [
      { id: "gender", label: "Child's Gender", type: "select", defaultValue: 0, options: [{ value: 0, label: "Boy" }, { value: 1, label: "Girl" }] },
      { id: "fatherHeight", label: "Father's Height (cm)", type: "number", defaultValue: 175, step: 0.1 },
      { id: "motherHeight", label: "Mother's Height (cm)", type: "number", defaultValue: 163, step: 0.1 },
    ],
    calculate: (v) => {
      const predicted = v.gender === 0
        ? (v.fatherHeight + v.motherHeight + 13) / 2
        : (v.fatherHeight + v.motherHeight - 13) / 2;
      const inFeet = predicted / 30.48;
      const feet = Math.floor(inFeet);
      const inches = Math.round((inFeet - feet) * 12);
      return [
        { label: "Predicted Height", value: `${predicted.toFixed(1)} cm`, highlight: true },
        { label: "In Feet/Inches", value: `${feet}'${inches}"` },
        { label: "Range (±5cm)", value: `${(predicted - 5).toFixed(0)} – ${(predicted + 5).toFixed(0)} cm` },
      ];
    },
    formula: { expression: "Boys: (Father + Mother + 13) / 2; Girls: (Father + Mother − 13) / 2", variables: ["Mid-parental height method", "±5cm accuracy"] },
    howToUse: "Enter the child's gender and both parents' heights to predict adult height.",
    faqs: [{ question: "How accurate is this?", answer: "Mid-parental height predicts within ±5cm for ~50% of children. Genetics, nutrition, and health also play roles." }],
    relatedCalcs: lifeRelated("height-calculator"),
  },
  // Shoe Size Conversion
  {
    slug: "shoe-size-converter", name: "Shoe Size Converter", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Convert shoe sizes between US, UK, EU, and centimeter measurements.",
    metaDescription: "Free shoe size converter. Convert between US, UK, EU shoe sizes and foot length in cm.",
    icon: "smile",
    inputs: [
      { id: "size", label: "US Size", type: "number", defaultValue: 10, step: 0.5, min: 1 },
      { id: "gender", label: "Gender", type: "select", defaultValue: 0, options: [{ value: 0, label: "Men" }, { value: 1, label: "Women" }] },
    ],
    calculate: (v) => {
      const cm = v.gender === 0 ? (v.size + 18) * 0.847 + 7.62 : (v.size + 17) * 0.847 + 7.62;
      const uk = v.gender === 0 ? v.size - 0.5 : v.size - 2;
      const eu = v.gender === 0 ? v.size + 33 : v.size + 31;
      return [
        { label: "US Size", value: `${v.size}`, highlight: true },
        { label: "UK Size", value: `${uk}` },
        { label: "EU Size", value: `${eu}` },
        { label: "Foot Length", value: `${cm.toFixed(1)} cm` },
      ];
    },
    formula: { expression: "Approximate conversions between sizing systems", variables: ["US Men = UK + 0.5", "US Women = EU − 31"] },
    howToUse: "Enter your US shoe size and gender to see equivalent sizes in other systems.",
    faqs: [{ question: "Do shoe sizes vary by brand?", answer: "Yes, shoe sizes can vary significantly between brands. Always try shoes on or check brand-specific size charts." }],
    relatedCalcs: lifeRelated("shoe-size-converter"),
  },
  // Golf Handicap Calculator
  {
    slug: "golf-handicap-calculator", name: "Golf Handicap Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Calculate your golf handicap index from recent scores, course rating, and slope rating.",
    metaDescription: "Free golf handicap calculator. Estimate your handicap index from recent round scores.",
    icon: "smile",
    inputs: [
      { id: "score1", label: "Score 1", type: "number", defaultValue: 92 },
      { id: "score2", label: "Score 2", type: "number", defaultValue: 88 },
      { id: "score3", label: "Score 3", type: "number", defaultValue: 95 },
      { id: "courseRating", label: "Course Rating", type: "number", defaultValue: 72, step: 0.1 },
      { id: "slopeRating", label: "Slope Rating", type: "number", defaultValue: 113, min: 55, max: 155 },
    ],
    calculate: (v) => {
      const diffs = [v.score1, v.score2, v.score3].map(s => (s - v.courseRating) * 113 / v.slopeRating);
      const best = Math.min(...diffs);
      const avg = diffs.reduce((a, b) => a + b, 0) / diffs.length;
      const handicap = Math.max(0, best * 0.96);
      return [
        { label: "Handicap Index", value: handicap.toFixed(1), highlight: true },
        { label: "Best Differential", value: best.toFixed(1) },
        { label: "Avg Differential", value: avg.toFixed(1) },
      ];
    },
    formula: { expression: "Differential = (Score − Course Rating) × 113 / Slope", variables: ["Handicap ≈ Best Differential × 0.96"] },
    howToUse: "Enter recent scores, course rating, and slope rating to estimate your handicap.",
    faqs: [{ question: "What is slope rating?", answer: "Slope (55-155) measures course difficulty for bogey golfers relative to scratch golfers. Standard is 113." }],
    relatedCalcs: lifeRelated("golf-handicap-calculator"),
  },
  // Tire Size Calculator
  {
    slug: "tire-size-calculator", name: "Tire Size Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Calculate tire dimensions (diameter, circumference, sidewall height) from tire size notation.",
    metaDescription: "Free tire size calculator. Calculate tire diameter, circumference, and sidewall from size notation.",
    icon: "smile",
    inputs: [
      { id: "width", label: "Tire Width (mm)", type: "number", defaultValue: 225 },
      { id: "aspect", label: "Aspect Ratio (%)", type: "number", defaultValue: 55 },
      { id: "rim", label: "Rim Diameter (inches)", type: "number", defaultValue: 17 },
    ],
    calculate: (v) => {
      const sidewall = v.width * (v.aspect / 100);
      const diameter = (sidewall * 2 / 25.4) + v.rim;
      const circumference = diameter * Math.PI;
      const revsPerMile = 63360 / circumference;
      return [
        { label: "Overall Diameter", value: `${diameter.toFixed(1)} inches`, highlight: true },
        { label: "Sidewall Height", value: `${sidewall.toFixed(1)} mm` },
        { label: "Circumference", value: `${circumference.toFixed(1)} inches` },
        { label: "Revs per Mile", value: `${Math.round(revsPerMile)}` },
      ];
    },
    formula: { expression: "Diameter = (2 × Width × Aspect% / 25.4) + Rim", variables: ["225/55R17 = 225mm wide, 55% aspect, 17\" rim"] },
    howToUse: "Enter tire width (mm), aspect ratio, and rim diameter from your tire size (e.g., 225/55R17).",
    faqs: [{ question: "What does the R mean?", answer: "R stands for Radial construction, the most common tire type. The number after R is the rim diameter in inches." }],
    relatedCalcs: lifeRelated("tire-size-calculator"),
  },
  // Tile Calculator
  {
    slug: "tile-calculator", name: "Tile Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Calculate how many tiles you need for a room based on area and tile size, including waste allowance.",
    metaDescription: "Free tile calculator. Estimate tiles needed for floors and walls with waste factor.",
    icon: "smile",
    inputs: [
      { id: "areaLength", label: "Room Length (feet)", type: "number", defaultValue: 12, step: 0.5 },
      { id: "areaWidth", label: "Room Width (feet)", type: "number", defaultValue: 10, step: 0.5 },
      { id: "tileSize", label: "Tile Size (inches)", type: "number", defaultValue: 12, step: 1 },
      { id: "waste", label: "Waste Factor (%)", type: "number", defaultValue: 10, suffix: "%" },
    ],
    calculate: (v) => {
      const areaSqFt = v.areaLength * v.areaWidth;
      const tileSqFt = (v.tileSize * v.tileSize) / 144;
      const tilesNeeded = Math.ceil(areaSqFt / tileSqFt);
      const withWaste = Math.ceil(tilesNeeded * (1 + v.waste / 100));
      return [
        { label: "Tiles Needed (with waste)", value: `${withWaste}`, highlight: true },
        { label: "Tiles (no waste)", value: `${tilesNeeded}` },
        { label: "Room Area", value: `${areaSqFt} sq ft` },
        { label: "Boxes (12/box)", value: `${Math.ceil(withWaste / 12)}` },
      ];
    },
    formula: { expression: "Tiles = (Room Area / Tile Area) × (1 + Waste%)", variables: ["Add 10% for straight cuts, 15% for diagonal"] },
    howToUse: "Enter room dimensions, tile size, and waste percentage.",
    faqs: [{ question: "How much waste should I plan?", answer: "10% for straight layouts, 15% for diagonal, 20% for complex patterns or many cuts." }],
    relatedCalcs: lifeRelated("tile-calculator"),
  },
  // Gravel Calculator
  {
    slug: "gravel-calculator", name: "Gravel Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Calculate how much gravel you need in tons and cubic yards for a project.",
    metaDescription: "Free gravel calculator. Estimate gravel needed in cubic yards and tons for landscaping and driveways.",
    icon: "smile",
    inputs: [
      { id: "length", label: "Length (feet)", type: "number", defaultValue: 20, step: 0.5 },
      { id: "width", label: "Width (feet)", type: "number", defaultValue: 10, step: 0.5 },
      { id: "depth", label: "Depth (inches)", type: "number", defaultValue: 3, step: 0.5 },
    ],
    calculate: (v) => {
      const cubicFeet = v.length * v.width * (v.depth / 12);
      const cubicYards = cubicFeet / 27;
      const tons = cubicYards * 1.4;
      return [
        { label: "Cubic Yards", value: cubicYards.toFixed(2), highlight: true },
        { label: "Tons", value: tons.toFixed(2) },
        { label: "Cubic Feet", value: cubicFeet.toFixed(1) },
      ];
    },
    formula: { expression: "Volume = L × W × D/12 (cubic feet) ÷ 27 = cubic yards", variables: ["1 cubic yard of gravel ≈ 1.4 tons"] },
    howToUse: "Enter the length, width, and depth of the area you need to cover.",
    faqs: [{ question: "How deep should gravel be?", answer: "Driveways: 3-4 inches. Walkways: 2-3 inches. Drainage: 6-12 inches. Decorative: 2 inches." }],
    relatedCalcs: lifeRelated("gravel-calculator"),
  },
  // Heat Index Calculator
  {
    slug: "heat-index-calculator", name: "Heat Index Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Calculate the heat index — how hot it really feels based on temperature and humidity.",
    metaDescription: "Free heat index calculator. Find the 'feels like' temperature from air temp and relative humidity.",
    icon: "smile",
    inputs: [
      { id: "temp", label: "Air Temperature (°F)", type: "number", defaultValue: 95, step: 1 },
      { id: "humidity", label: "Relative Humidity (%)", type: "number", defaultValue: 55, min: 0, max: 100 },
    ],
    calculate: (v) => {
      const T = v.temp, R = v.humidity;
      const hi = -42.379 + 2.04901523*T + 10.14333127*R - 0.22475541*T*R - 0.00683783*T*T - 0.05481717*R*R + 0.00122874*T*T*R + 0.00085282*T*R*R - 0.00000199*T*T*R*R;
      let danger = "Caution";
      if (hi >= 130) danger = "Extreme Danger";
      else if (hi >= 105) danger = "Danger";
      else if (hi >= 90) danger = "Extreme Caution";
      return [
        { label: "Heat Index", value: `${Math.round(hi)}°F`, highlight: true },
        { label: "Heat Index (°C)", value: `${Math.round((hi - 32) * 5 / 9)}°C` },
        { label: "Danger Level", value: danger },
      ];
    },
    formula: { expression: "Rothfusz regression equation (NWS)", variables: ["Valid for temp ≥ 80°F and humidity ≥ 40%"] },
    howToUse: "Enter air temperature (°F) and relative humidity (%). Works best above 80°F.",
    faqs: [{ question: "What is heat index?", answer: "The 'feels like' temperature accounting for humidity. High humidity reduces sweat evaporation, making it feel hotter." }],
    relatedCalcs: lifeRelated("heat-index-calculator"),
  },
  // Roofing Calculator
  {
    slug: "roofing-calculator", name: "Roofing Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Calculate how many squares of roofing material you need based on roof dimensions and pitch.",
    metaDescription: "Free roofing calculator. Estimate roofing squares and bundles needed for your roof area.",
    icon: "smile",
    inputs: [
      { id: "length", label: "Building Length (feet)", type: "number", defaultValue: 40 },
      { id: "width", label: "Building Width (feet)", type: "number", defaultValue: 30 },
      { id: "pitch", label: "Roof Pitch (rise per 12 run)", type: "number", defaultValue: 6, min: 0, max: 24 },
      { id: "waste", label: "Waste (%)", type: "number", defaultValue: 15, suffix: "%" },
    ],
    calculate: (v) => {
      const pitchMultiplier = Math.sqrt(1 + (v.pitch / 12) ** 2);
      const roofArea = v.length * v.width * pitchMultiplier;
      const withWaste = roofArea * (1 + v.waste / 100);
      const squares = withWaste / 100;
      const bundles = Math.ceil(squares * 3);
      return [
        { label: "Roof Area", value: `${Math.round(roofArea)} sq ft`, highlight: true },
        { label: "Roofing Squares", value: `${squares.toFixed(1)} squares` },
        { label: "Bundles Needed", value: `${bundles}` },
        { label: "Pitch Multiplier", value: pitchMultiplier.toFixed(3) },
      ];
    },
    formula: { expression: "Area = Length × Width × √(1 + (pitch/12)²)", variables: ["1 square = 100 sq ft", "3 bundles per square"] },
    howToUse: "Enter building dimensions and roof pitch. The calculator accounts for pitch slope and waste.",
    faqs: [{ question: "What is roof pitch?", answer: "Pitch is the rise in inches for every 12 inches of horizontal run. A 6/12 pitch rises 6 inches per foot." }],
    relatedCalcs: lifeRelated("roofing-calculator"),
  },
  // Mulch Calculator
  {
    slug: "mulch-calculator", name: "Mulch Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Calculate how much mulch you need in cubic yards and bags for your garden beds.",
    metaDescription: "Free mulch calculator. Estimate cubic yards and bags of mulch for garden beds and landscaping.",
    icon: "smile",
    inputs: [
      { id: "length", label: "Area Length (feet)", type: "number", defaultValue: 20, step: 0.5 },
      { id: "width", label: "Area Width (feet)", type: "number", defaultValue: 10, step: 0.5 },
      { id: "depth", label: "Depth (inches)", type: "number", defaultValue: 3, step: 0.5 },
    ],
    calculate: (v) => {
      const cubicFeet = v.length * v.width * (v.depth / 12);
      const cubicYards = cubicFeet / 27;
      const bags2cuft = Math.ceil(cubicFeet / 2);
      return [
        { label: "Cubic Yards", value: cubicYards.toFixed(2), highlight: true },
        { label: "Cubic Feet", value: cubicFeet.toFixed(1) },
        { label: "Bags (2 cu ft)", value: `${bags2cuft}` },
      ];
    },
    formula: { expression: "Volume = L × W × (Depth/12) cubic feet ÷ 27 = cubic yards", variables: ["Standard bag = 2 cubic feet"] },
    howToUse: "Enter the area dimensions and desired mulch depth.",
    faqs: [{ question: "How deep should mulch be?", answer: "2-4 inches is ideal. Too thin won't suppress weeds, too thick can suffocate roots and trap moisture." }],
    relatedCalcs: lifeRelated("mulch-calculator"),
  },
  // Stair Calculator
  {
    slug: "stair-calculator", name: "Stair Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Calculate the number of stairs, riser height, and tread depth for a staircase.",
    metaDescription: "Free stair calculator. Calculate number of stairs, riser height, and tread depth for building code compliance.",
    icon: "smile",
    inputs: [
      { id: "totalRise", label: "Total Rise (inches)", type: "number", defaultValue: 108, step: 0.5 },
      { id: "riserHeight", label: "Desired Riser Height (inches)", type: "number", defaultValue: 7.5, step: 0.25 },
    ],
    calculate: (v) => {
      const numStairs = Math.round(v.totalRise / v.riserHeight);
      const actualRiser = v.totalRise / numStairs;
      const tread = 25 - actualRiser; // 7-11 rule: riser + tread ≈ 17-18"
      const stairAngle = Math.atan(actualRiser / Math.max(tread, 1)) * (180 / Math.PI);
      return [
        { label: "Number of Stairs", value: `${numStairs}`, highlight: true },
        { label: "Actual Riser Height", value: `${actualRiser.toFixed(2)}"` },
        { label: "Suggested Tread Depth", value: `${Math.max(tread, 10).toFixed(2)}"` },
        { label: "Stair Angle", value: `${stairAngle.toFixed(1)}°` },
        { label: "Total Run", value: `${(numStairs * Math.max(tread, 10)).toFixed(0)}"` },
      ];
    },
    formula: { expression: "Stairs = Total Rise / Riser Height (rounded)", variables: ["Code: Risers 7-7.75\", Treads 10-11\"", "Riser + Tread ≈ 17-18\""] },
    howToUse: "Enter the total height to climb and desired riser height.",
    faqs: [{ question: "What is building code for stairs?", answer: "IRC code: max riser 7.75\", min tread 10\", max variation between risers 3/8\". Always check local codes." }],
    relatedCalcs: lifeRelated("stair-calculator"),
  },
  // GDP Calculator
  {
    slug: "gdp-calculator", name: "GDP Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Calculate GDP using the expenditure approach: GDP = C + I + G + (X − M).",
    metaDescription: "Free GDP calculator. Calculate Gross Domestic Product using the expenditure approach.",
    icon: "smile",
    inputs: [
      { id: "consumption", label: "Consumption (C)", type: "number", defaultValue: 14000, prefix: "$" },
      { id: "investment", label: "Investment (I)", type: "number", defaultValue: 3500, prefix: "$" },
      { id: "government", label: "Government (G)", type: "number", defaultValue: 3200, prefix: "$" },
      { id: "exports", label: "Exports (X)", type: "number", defaultValue: 2500, prefix: "$" },
      { id: "imports", label: "Imports (M)", type: "number", defaultValue: 3100, prefix: "$" },
    ],
    calculate: (v) => {
      const netExports = v.exports - v.imports;
      const gdp = v.consumption + v.investment + v.government + netExports;
      return [
        { label: "GDP", value: `$${gdp.toLocaleString()}B`, highlight: true },
        { label: "Net Exports", value: `$${netExports.toLocaleString()}B` },
        { label: "C as % of GDP", value: `${((v.consumption / gdp) * 100).toFixed(1)}%` },
      ];
    },
    formula: { expression: "GDP = C + I + G + (X − M)", variables: ["C = Consumption", "I = Investment", "G = Government", "X−M = Net Exports"] },
    howToUse: "Enter the four GDP components (in billions) to calculate total GDP.",
    faqs: [{ question: "What is GDP?", answer: "Gross Domestic Product measures the total value of goods and services produced in a country in a given period." }],
    relatedCalcs: lifeRelated("gdp-calculator"),
  },
  // Day of the Week Calculator
  {
    slug: "day-of-week-calculator", name: "Day of the Week Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Find out what day of the week any date falls on, past or future.",
    metaDescription: "Free day of the week calculator. Find what day any date falls on.",
    icon: "smile",
    inputs: [
      { id: "year", label: "Year", type: "number", defaultValue: 2000, min: 1 },
      { id: "month", label: "Month (1-12)", type: "number", defaultValue: 1, min: 1, max: 12 },
      { id: "day", label: "Day (1-31)", type: "number", defaultValue: 1, min: 1, max: 31 },
    ],
    calculate: (v) => {
      const d = new Date(v.year, v.month - 1, v.day);
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const isLeap = (v.year % 4 === 0 && v.year % 100 !== 0) || v.year % 400 === 0;
      return [
        { label: "Day of Week", value: days[d.getDay()], highlight: true },
        { label: "Date", value: d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) },
        { label: "Leap Year?", value: isLeap ? "Yes" : "No" },
      ];
    },
    formula: { expression: "JavaScript Date object calculation", variables: ["Handles all dates including historical"] },
    howToUse: "Enter any date to find out what day of the week it falls on.",
    faqs: [{ question: "What day was I born?", answer: "Enter your birth date to find out!" }],
    relatedCalcs: lifeRelated("day-of-week-calculator"),
  },
  // Voltage Drop Calculator
  {
    slug: "voltage-drop-calculator", name: "Voltage Drop Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Calculate voltage drop in electrical wire based on wire gauge, length, and current.",
    metaDescription: "Free voltage drop calculator. Calculate wire voltage drop for electrical installations.",
    icon: "smile",
    inputs: [
      { id: "voltage", label: "Source Voltage (V)", type: "number", defaultValue: 120 },
      { id: "current", label: "Current (Amps)", type: "number", defaultValue: 20, step: 0.1 },
      { id: "length", label: "One-Way Length (feet)", type: "number", defaultValue: 100, step: 1 },
      { id: "gauge", label: "Wire Gauge (AWG)", type: "select", defaultValue: 12, options: [{ value: 14, label: "14 AWG" }, { value: 12, label: "12 AWG" }, { value: 10, label: "10 AWG" }, { value: 8, label: "8 AWG" }, { value: 6, label: "6 AWG" }] },
    ],
    calculate: (v) => {
      const resistance: Record<number, number> = { 14: 3.14, 12: 1.98, 10: 1.24, 8: 0.778, 6: 0.491 };
      const r = (resistance[v.gauge] || 1.98) / 1000;
      const vDrop = 2 * v.length * r * v.current;
      const pctDrop = (vDrop / v.voltage) * 100;
      return [
        { label: "Voltage Drop", value: `${vDrop.toFixed(2)} V`, highlight: true },
        { label: "Drop Percentage", value: `${pctDrop.toFixed(1)}%` },
        { label: "Voltage at Load", value: `${(v.voltage - vDrop).toFixed(1)} V` },
        { label: "Status", value: pctDrop <= 3 ? "Good (≤3%)" : pctDrop <= 5 ? "Acceptable (≤5%)" : "Too High (>5%)" },
      ];
    },
    formula: { expression: "VD = 2 × Length × Resistance/ft × Current", variables: ["NEC recommends ≤3% for branch circuits", "≤5% total including feeder"] },
    howToUse: "Enter source voltage, current draw, wire length, and gauge to check voltage drop.",
    faqs: [{ question: "Why does voltage drop matter?", answer: "Excessive voltage drop causes dim lights, motors running hot, and equipment malfunction. NEC recommends ≤3% for branch circuits." }],
    relatedCalcs: lifeRelated("voltage-drop-calculator"),
  },
  // Resistor Calculator
  {
    slug: "resistor-calculator", name: "Resistor Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Calculate total resistance for resistors in series and parallel configurations.",
    metaDescription: "Free resistor calculator. Calculate series and parallel resistance combinations.",
    icon: "smile",
    inputs: [
      { id: "r1", label: "Resistor 1 (Ω)", type: "number", defaultValue: 100, step: 0.1 },
      { id: "r2", label: "Resistor 2 (Ω)", type: "number", defaultValue: 220, step: 0.1 },
      { id: "r3", label: "Resistor 3 (Ω)", type: "number", defaultValue: 330, step: 0.1 },
    ],
    calculate: (v) => {
      const series = v.r1 + v.r2 + v.r3;
      const parallel = 1 / (1 / v.r1 + 1 / v.r2 + 1 / v.r3);
      return [
        { label: "Series Total", value: `${series.toFixed(1)} Ω`, highlight: true },
        { label: "Parallel Total", value: `${parallel.toFixed(2)} Ω` },
        { label: "R1 + R2 (series)", value: `${(v.r1 + v.r2).toFixed(1)} Ω` },
        { label: "R1 ∥ R2 (parallel)", value: `${(1 / (1 / v.r1 + 1 / v.r2)).toFixed(2)} Ω` },
      ];
    },
    formula: { expression: "Series: R = R1 + R2 + R3; Parallel: 1/R = 1/R1 + 1/R2 + 1/R3", variables: ["Series increases total resistance", "Parallel decreases total resistance"] },
    howToUse: "Enter resistance values for up to 3 resistors to see series and parallel totals.",
    faqs: [{ question: "When to use series vs parallel?", answer: "Series increases resistance (voltage dividers). Parallel decreases resistance (current sharing). Use both in complex circuits." }],
    relatedCalcs: lifeRelated("resistor-calculator"),
  },
  // Bandwidth Calculator
  {
    slug: "bandwidth-calculator", name: "Bandwidth Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Calculate file download/upload time based on file size and internet speed.",
    metaDescription: "Free bandwidth calculator. Estimate download and upload times from file size and internet speed.",
    icon: "smile",
    inputs: [
      { id: "fileSize", label: "File Size (MB)", type: "number", defaultValue: 1000, step: 1 },
      { id: "speed", label: "Internet Speed (Mbps)", type: "number", defaultValue: 100, step: 1 },
    ],
    calculate: (v) => {
      if (v.speed <= 0) return [{ label: "Error", value: "Speed must be > 0" }];
      const fileBits = v.fileSize * 8;
      const seconds = fileBits / v.speed;
      const minutes = seconds / 60;
      const hours = minutes / 60;
      return [
        { label: "Download Time", value: seconds < 60 ? `${seconds.toFixed(1)} seconds` : minutes < 60 ? `${minutes.toFixed(1)} minutes` : `${hours.toFixed(2)} hours`, highlight: true },
        { label: "In Seconds", value: `${seconds.toFixed(1)}s` },
        { label: "Actual (80% efficiency)", value: `${(seconds / 0.8).toFixed(1)}s` },
      ];
    },
    formula: { expression: "Time = File Size (Mb) / Speed (Mbps)", variables: ["1 MB = 8 Mb", "Real speed ≈ 80% of advertised"] },
    howToUse: "Enter file size in MB and your internet speed in Mbps.",
    faqs: [{ question: "Why is actual speed lower?", answer: "Overhead from protocols, network congestion, server limits, and Wi-Fi losses typically reduce throughput to 60-80% of rated speed." }],
    relatedCalcs: lifeRelated("bandwidth-calculator"),
  },
  // IP Subnet Calculator
  {
    slug: "ip-subnet-calculator", name: "IP Subnet Calculator", category: "Lifestyle", categorySlug: "lifestyle",
    description: "Calculate subnet details from a CIDR prefix length: network address, broadcast, and usable host range.",
    metaDescription: "Free IP subnet calculator. Calculate network, broadcast, and host range from CIDR notation.",
    icon: "smile",
    inputs: [
      { id: "prefix", label: "CIDR Prefix Length (/)", type: "number", defaultValue: 24, min: 0, max: 32 },
    ],
    calculate: (v) => {
      const totalIPs = Math.pow(2, 32 - v.prefix);
      const usableHosts = Math.max(totalIPs - 2, 0);
      const maskOctets: number[] = [];
      for (let i = 0; i < 4; i++) {
        const bits = Math.min(Math.max(v.prefix - i * 8, 0), 8);
        maskOctets.push(256 - Math.pow(2, 8 - bits));
      }
      return [
        { label: "Subnet Mask", value: maskOctets.join("."), highlight: true },
        { label: "Total IPs", value: totalIPs.toLocaleString() },
        { label: "Usable Hosts", value: usableHosts.toLocaleString() },
        { label: "Wildcard Mask", value: maskOctets.map(o => 255 - o).join(".") },
      ];
    },
    formula: { expression: "Total IPs = 2^(32 − prefix); Usable = Total − 2", variables: ["/24 = 256 IPs, 254 hosts", "/16 = 65536 IPs"] },
    howToUse: "Enter the CIDR prefix length (e.g., 24 for /24) to calculate subnet details.",
    faqs: [{ question: "Why minus 2 for usable hosts?", answer: "The first IP is the network address and the last is the broadcast address — neither can be assigned to hosts." }],
    relatedCalcs: lifeRelated("ip-subnet-calculator"),
  },
];
