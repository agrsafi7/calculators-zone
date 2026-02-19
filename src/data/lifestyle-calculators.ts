import { CalculatorConfig } from "@/components/CalculatorTemplate";

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
];
