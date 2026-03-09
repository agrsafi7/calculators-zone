import { CalculatorConfig } from "@/components/CalculatorTemplate";

const cookingRelated = (exclude: string) => [
  { name: "Recipe Scaler", slug: "recipe-scaler-calculator", icon: "chef", category: "cooking" },
  { name: "Baking Ratio Calculator", slug: "baking-ratio-calculator", icon: "chef", category: "cooking" },
  { name: "Cooking Time Calculator", slug: "cooking-time-calculator", icon: "chef", category: "cooking" },
  { name: "Calorie per Serving", slug: "calorie-per-serving-calculator", icon: "chef", category: "cooking" },
].filter((c) => c.slug !== exclude);

export const cookingCalculators: CalculatorConfig[] = [
  {
    slug: "recipe-scaler-calculator",
    name: "Recipe Scaler Calculator",
    category: "Cooking & Kitchen",
    categorySlug: "cooking",
    description: "Scale recipe ingredients up or down for any number of servings. Perfect for meal prep and dinner parties.",
    metaDescription: "Free recipe scaler calculator. Adjust ingredient quantities for any serving size. Scale recipes up or down instantly.",
    icon: "chef",
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
    formula: { expression: "Scaled Amount = Original × (Desired ÷ Original Servings)", variables: ["Original = Original ingredient amount", "Desired = Number of servings you want", "Original Servings = Recipe's default serving size"] },
    howToUse: "Enter the original number of servings, desired servings, and up to 3 ingredient amounts. The calculator scales all ingredients proportionally.",
    faqs: [
      { question: "Do all ingredients scale linearly?", answer: "Most ingredients scale linearly, but seasonings, salt, and leavening agents (baking powder/soda) may not. For these, scale to 75% when doubling and taste-test." },
      { question: "How do I scale baking recipes?", answer: "Baking requires more precision. Flour, sugar, and liquids scale linearly, but leavening agents should be scaled more conservatively. Also consider pan size changes." },
    ],
    relatedCalcs: cookingRelated("recipe-scaler-calculator"),
  },
  {
    slug: "baking-ratio-calculator",
    name: "Baking Ratio Calculator",
    category: "Cooking & Kitchen",
    categorySlug: "cooking",
    description: "Calculate perfect baking ratios for bread, cakes, and pastries based on flour weight.",
    metaDescription: "Free baking ratio calculator. Get perfect ingredient proportions for bread, cake, cookies, and pastry based on baker's percentages.",
    icon: "chef",
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
    formula: { expression: "Ingredient = Flour × (Percentage ÷ 100)", variables: ["Flour = Base flour weight", "Hydration = Water as % of flour", "All percentages are relative to flour weight"] },
    howToUse: "Enter the amount of flour in grams and adjust the baker's percentages for hydration, salt, and yeast to get exact weights.",
    faqs: [
      { question: "What is baker's percentage?", answer: "Baker's percentage expresses each ingredient's weight as a percentage of the total flour weight. This makes it easy to scale recipes of any size while maintaining perfect ratios." },
      { question: "What hydration level should I use?", answer: "For sandwich bread: 60-65%. For artisan bread: 65-75%. For ciabatta: 75-85%. Higher hydration creates more open, airy crumb but is harder to handle." },
    ],
    relatedCalcs: cookingRelated("baking-ratio-calculator"),
  },
  {
    slug: "cooking-time-calculator",
    name: "Cooking Time Calculator",
    category: "Cooking & Kitchen",
    categorySlug: "cooking",
    description: "Estimate cooking times for meat based on weight, type, and desired doneness.",
    metaDescription: "Free cooking time calculator. Estimate roasting, grilling, and baking times for meat by weight and desired doneness.",
    icon: "chef",
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
    formula: { expression: "Time = Weight × Minutes per Pound", variables: ["Weight = Meat weight in pounds", "Min/lb varies by meat type and doneness", "Rest time = ~3 min per pound"] },
    howToUse: "Enter the meat weight in pounds and minutes per pound (e.g., turkey 13-15 min/lb at 325°F, beef roast 20-25 min/lb at 350°F).",
    faqs: [
      { question: "What are common minutes-per-pound values?", answer: "Turkey: 13-15 min/lb at 325°F. Beef roast: 20-25 min/lb at 350°F (medium). Pork loin: 20-25 min/lb at 350°F. Chicken: 20 min/lb at 350°F." },
      { question: "Why is resting time important?", answer: "Resting allows juices to redistribute throughout the meat. The internal temperature will also rise 5-10°F during resting, so remove meat slightly before target temp." },
    ],
    relatedCalcs: cookingRelated("cooking-time-calculator"),
  },
  {
    slug: "calorie-per-serving-calculator",
    name: "Calorie Per Serving Calculator",
    category: "Cooking & Kitchen",
    categorySlug: "cooking",
    description: "Calculate calories per serving for homemade recipes based on total calories and number of servings.",
    metaDescription: "Free calorie per serving calculator. Determine nutritional info per serving for homemade meals and recipes.",
    icon: "chef",
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
    formula: { expression: "Per Serving = Total ÷ Servings", variables: ["Total = Sum of all ingredient calories", "Servings = Number of portions", "Fat estimated from remaining calories"] },
    howToUse: "Add up the total calories, protein, and carbs from all ingredients in your recipe, then enter the number of servings.",
    faqs: [
      { question: "How do I find total recipe calories?", answer: "Add up the calories of each ingredient using nutrition labels or a food database like USDA FoodData Central. Many recipe apps do this automatically." },
      { question: "Is the fat estimate accurate?", answer: "The fat is estimated by subtracting protein and carb calories (4 cal/g each) from total calories, then dividing by 9 cal/g. It's an approximation—enter actual fat grams for more precision." },
    ],
    relatedCalcs: cookingRelated("calorie-per-serving-calculator"),
  },
  {
    slug: "unit-conversion-cooking",
    name: "Cooking Unit Converter",
    category: "Cooking & Kitchen",
    categorySlug: "cooking",
    description: "Convert between cups, tablespoons, teaspoons, milliliters, and other common cooking measurements.",
    metaDescription: "Free cooking unit converter. Convert between cups, tablespoons, teaspoons, milliliters, ounces, and grams for recipes.",
    icon: "chef",
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
        case 1: ml = v.amount * 236.588; break; // cups
        case 2: ml = v.amount * 14.787; break; // tablespoons
        case 3: ml = v.amount * 4.929; break; // teaspoons
        case 4: ml = v.amount * 29.574; break; // fluid ounces
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
    formula: { expression: "Convert via mL base unit", variables: ["1 Cup = 236.588 mL", "1 Tbsp = 14.787 mL", "1 Tsp = 4.929 mL", "1 fl oz = 29.574 mL"] },
    howToUse: "Select a unit, enter the amount, and instantly see conversions to all other common cooking measurements.",
    faqs: [
      { question: "Are US and metric cups the same?", answer: "No. A US cup is 236.588 mL while a metric cup (used in Australia) is 250 mL. A UK/Imperial cup is 284.131 mL. This calculator uses US cups." },
      { question: "How many tablespoons in a cup?", answer: "There are 16 tablespoons in 1 US cup. There are 3 teaspoons in 1 tablespoon, so 48 teaspoons in 1 cup." },
    ],
    relatedCalcs: cookingRelated("unit-conversion-cooking"),
  },
];
