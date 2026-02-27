import { CalculatorConfig } from "@/components/CalculatorTemplate";

const healthRelated = (exclude: string) => [
  { name: "BMI Calculator", slug: "bmi-calculator", icon: "heart", category: "health" },
  { name: "BMR Calculator", slug: "bmr-calculator", icon: "heart", category: "health" },
  { name: "Calorie Calculator", slug: "calorie-calculator", icon: "heart", category: "health" },
  { name: "TDEE Calculator", slug: "tdee-calculator", icon: "heart", category: "health" },
].filter((c) => c.slug !== exclude);

export const healthCalculators: CalculatorConfig[] = [
  // 1. BMR Calculator
  {
    slug: "bmr-calculator",
    name: "BMR Calculator",
    category: "Health",
    categorySlug: "health",
    description: "Calculate your Basal Metabolic Rate — the number of calories your body burns at rest each day.",
    metaDescription: "Free BMR calculator. Estimate your basal metabolic rate using the Mifflin-St Jeor equation based on age, gender, height, and weight.",
    icon: "heart",
    inputs: [
      { id: "gender", label: "Gender", type: "select", defaultValue: 0, options: [{ value: 0, label: "Male" }, { value: 1, label: "Female" }] },
      { id: "age", label: "Age (years)", type: "number", defaultValue: 30, min: 1, max: 120 },
      { id: "weight", label: "Weight (kg)", type: "number", defaultValue: 70, min: 1, step: 0.1 },
      { id: "height", label: "Height (cm)", type: "number", defaultValue: 170, min: 1, step: 0.1 },
    ],
    calculate: (v) => {
      const bmr = v.gender === 0
        ? 10 * v.weight + 6.25 * v.height - 5 * v.age + 5
        : 10 * v.weight + 6.25 * v.height - 5 * v.age - 161;
      return [
        { label: "Your BMR", value: `${Math.round(bmr)} cal/day`, highlight: true },
        { label: "Sedentary (×1.2)", value: `${Math.round(bmr * 1.2)} cal/day` },
        { label: "Light Exercise (×1.375)", value: `${Math.round(bmr * 1.375)} cal/day` },
        { label: "Active (×1.55)", value: `${Math.round(bmr * 1.55)} cal/day` },
      ];
    },
    formula: { expression: "BMR = 10×W + 6.25×H − 5×A + S", variables: ["W = Weight (kg)", "H = Height (cm)", "A = Age", "S = +5 (male) or −161 (female)"] },
    howToUse: "Select your gender, enter your age, weight in kilograms, and height in centimeters. The calculator uses the Mifflin-St Jeor equation to estimate your BMR.",
    faqs: [
      { question: "What is BMR?", answer: "BMR (Basal Metabolic Rate) is the number of calories your body needs to maintain basic life functions like breathing, circulation, and cell production while at complete rest." },
      { question: "How is BMR different from TDEE?", answer: "BMR only accounts for calories burned at rest. TDEE (Total Daily Energy Expenditure) includes BMR plus calories burned through physical activity and digestion." },
    ],
    relatedCalcs: healthRelated("bmr-calculator"),
  },
  // 2. Body Fat Calculator
  {
    slug: "body-fat-calculator",
    name: "Body Fat Calculator",
    category: "Health",
    categorySlug: "health",
    description: "Estimate your body fat percentage using the U.S. Navy method with simple body measurements.",
    metaDescription: "Free body fat percentage calculator using the U.S. Navy method. Estimate body fat from waist, neck, and height measurements.",
    icon: "heart",
    inputs: [
      { id: "gender", label: "Gender", type: "select", defaultValue: 0, options: [{ value: 0, label: "Male" }, { value: 1, label: "Female" }] },
      { id: "height", label: "Height (cm)", type: "number", defaultValue: 175, step: 0.1 },
      { id: "waist", label: "Waist (cm)", type: "number", defaultValue: 85, step: 0.1 },
      { id: "neck", label: "Neck (cm)", type: "number", defaultValue: 38, step: 0.1 },
      { id: "hip", label: "Hip (cm, women only)", type: "number", defaultValue: 95, step: 0.1 },
    ],
    calculate: (v) => {
      let bf: number;
      if (v.gender === 0) {
        bf = 495 / (1.0324 - 0.19077 * Math.log10(v.waist - v.neck) + 0.15456 * Math.log10(v.height)) - 450;
      } else {
        bf = 495 / (1.29579 - 0.35004 * Math.log10(v.waist + v.hip - v.neck) + 0.22100 * Math.log10(v.height)) - 450;
      }
      bf = Math.max(2, Math.min(bf, 60));
      const leanMass = 100 - bf;
      let category = "Essential Fat";
      if (v.gender === 0) {
        if (bf < 6) category = "Essential Fat";
        else if (bf < 14) category = "Athletes";
        else if (bf < 18) category = "Fitness";
        else if (bf < 25) category = "Average";
        else category = "Obese";
      } else {
        if (bf < 14) category = "Essential Fat";
        else if (bf < 21) category = "Athletes";
        else if (bf < 25) category = "Fitness";
        else if (bf < 32) category = "Average";
        else category = "Obese";
      }
      return [
        { label: "Body Fat %", value: `${bf.toFixed(1)}%`, highlight: true },
        { label: "Category", value: category },
        { label: "Lean Body Mass", value: `${leanMass.toFixed(1)}%` },
      ];
    },
    formula: { expression: "BF% = 495 / (1.0324 − 0.19077×log₁₀(waist−neck) + 0.15456×log₁₀(height)) − 450", variables: ["Male formula shown", "Female adds hip measurement"] },
    howToUse: "Select your gender, enter your height, and provide waist, neck, and hip (for women) measurements in centimeters.",
    faqs: [
      { question: "How accurate is the Navy method?", answer: "The U.S. Navy method is generally accurate within 3-4% of DEXA scan results for most people. It's one of the most reliable non-invasive methods available." },
      { question: "What is a healthy body fat percentage?", answer: "For men, 10-20% is considered healthy. For women, 18-28% is healthy. Athletes may have lower levels, while essential fat minimums are ~3% for men and ~12% for women." },
    ],
    relatedCalcs: healthRelated("body-fat-calculator"),
  },
  // 3. Calorie Calculator
  {
    slug: "calorie-calculator",
    name: "Calorie Calculator",
    category: "Health",
    categorySlug: "health",
    description: "Calculate how many calories you need per day to maintain, lose, or gain weight based on your activity level.",
    metaDescription: "Free calorie calculator. Estimate daily calorie needs for weight loss, maintenance, or muscle gain based on age, gender, and activity level.",
    icon: "heart",
    inputs: [
      { id: "gender", label: "Gender", type: "select", defaultValue: 0, options: [{ value: 0, label: "Male" }, { value: 1, label: "Female" }] },
      { id: "age", label: "Age", type: "number", defaultValue: 30, min: 1 },
      { id: "weight", label: "Weight (kg)", type: "number", defaultValue: 70, step: 0.1 },
      { id: "height", label: "Height (cm)", type: "number", defaultValue: 170, step: 0.1 },
      { id: "activity", label: "Activity Level", type: "select", defaultValue: 1.55, options: [{ value: 1.2, label: "Sedentary" }, { value: 1.375, label: "Light Exercise" }, { value: 1.55, label: "Moderate Exercise" }, { value: 1.725, label: "Very Active" }, { value: 1.9, label: "Extra Active" }] },
    ],
    calculate: (v) => {
      const bmr = v.gender === 0
        ? 10 * v.weight + 6.25 * v.height - 5 * v.age + 5
        : 10 * v.weight + 6.25 * v.height - 5 * v.age - 161;
      const tdee = bmr * v.activity;
      return [
        { label: "Maintenance Calories", value: `${Math.round(tdee)} cal/day`, highlight: true },
        { label: "Weight Loss (0.5 kg/wk)", value: `${Math.round(tdee - 500)} cal/day` },
        { label: "Weight Loss (1 kg/wk)", value: `${Math.round(tdee - 1000)} cal/day` },
        { label: "Weight Gain (0.5 kg/wk)", value: `${Math.round(tdee + 500)} cal/day` },
      ];
    },
    formula: { expression: "TDEE = BMR × Activity Factor", variables: ["BMR = Mifflin-St Jeor", "Sedentary = ×1.2", "Moderate = ×1.55", "Very Active = ×1.725"] },
    howToUse: "Enter your gender, age, weight, height, and select your activity level to calculate daily calorie needs for different goals.",
    faqs: [
      { question: "How many calories should I eat to lose weight?", answer: "A deficit of 500 calories per day typically results in about 0.5 kg (1 lb) of weight loss per week, which is considered a healthy and sustainable rate." },
      { question: "Should I eat below my BMR?", answer: "Generally, it's not recommended to eat below your BMR for extended periods as it can slow your metabolism and lead to nutrient deficiencies." },
    ],
    relatedCalcs: healthRelated("calorie-calculator"),
  },
  // 4. Daily Calorie Needs Calculator
  {
    slug: "daily-calorie-needs-calculator",
    name: "Daily Calorie Needs Calculator",
    category: "Health",
    categorySlug: "health",
    description: "Determine your daily caloric requirements based on your personal metrics and fitness goals.",
    metaDescription: "Calculate your daily calorie needs based on age, gender, weight, height, activity level, and fitness goals.",
    icon: "heart",
    inputs: [
      { id: "gender", label: "Gender", type: "select", defaultValue: 0, options: [{ value: 0, label: "Male" }, { value: 1, label: "Female" }] },
      { id: "age", label: "Age", type: "number", defaultValue: 25, min: 1 },
      { id: "weight", label: "Weight (kg)", type: "number", defaultValue: 75, step: 0.1 },
      { id: "height", label: "Height (cm)", type: "number", defaultValue: 175, step: 0.1 },
      { id: "activity", label: "Activity Level", type: "select", defaultValue: 1.55, options: [{ value: 1.2, label: "Sedentary" }, { value: 1.375, label: "Lightly Active" }, { value: 1.55, label: "Moderately Active" }, { value: 1.725, label: "Very Active" }, { value: 1.9, label: "Super Active" }] },
      { id: "goal", label: "Goal", type: "select", defaultValue: 0, options: [{ value: -500, label: "Lose Weight" }, { value: 0, label: "Maintain" }, { value: 500, label: "Gain Weight" }] },
    ],
    calculate: (v) => {
      const bmr = v.gender === 0
        ? 10 * v.weight + 6.25 * v.height - 5 * v.age + 5
        : 10 * v.weight + 6.25 * v.height - 5 * v.age - 161;
      const tdee = bmr * v.activity;
      const target = tdee + v.goal;
      return [
        { label: "Daily Calories", value: `${Math.round(target)} cal`, highlight: true },
        { label: "BMR", value: `${Math.round(bmr)} cal` },
        { label: "TDEE", value: `${Math.round(tdee)} cal` },
        { label: "Protein (30%)", value: `${Math.round((target * 0.3) / 4)}g` },
      ];
    },
    formula: { expression: "Target = (BMR × Activity) + Goal Adjustment", variables: ["BMR = Mifflin-St Jeor", "Activity = 1.2–1.9", "Goal = ±500 cal"] },
    howToUse: "Fill in your details and select your fitness goal to get a personalized daily calorie target plus a suggested protein intake.",
    faqs: [
      { question: "What is a safe caloric deficit?", answer: "A deficit of 500-750 calories per day is considered safe and sustainable for most adults, leading to 0.5-0.75 kg weight loss per week." },
    ],
    relatedCalcs: healthRelated("daily-calorie-needs-calculator"),
  },
  // 5. Ideal Weight Calculator
  {
    slug: "ideal-weight-calculator",
    name: "Ideal Weight Calculator",
    category: "Health",
    categorySlug: "health",
    description: "Find your ideal body weight using multiple established formulas (Devine, Robinson, Miller, Hamwi).",
    metaDescription: "Calculate your ideal body weight using Devine, Robinson, Miller, and Hamwi formulas based on height and gender.",
    icon: "heart",
    inputs: [
      { id: "gender", label: "Gender", type: "select", defaultValue: 0, options: [{ value: 0, label: "Male" }, { value: 1, label: "Female" }] },
      { id: "height", label: "Height (cm)", type: "number", defaultValue: 175, step: 0.1 },
    ],
    calculate: (v) => {
      const inches = v.height / 2.54;
      const over60 = Math.max(inches - 60, 0);
      let devine: number, robinson: number, miller: number, hamwi: number;
      if (v.gender === 0) {
        devine = 50 + 2.3 * over60;
        robinson = 52 + 1.9 * over60;
        miller = 56.2 + 1.41 * over60;
        hamwi = 48 + 2.7 * over60;
      } else {
        devine = 45.5 + 2.3 * over60;
        robinson = 49 + 1.7 * over60;
        miller = 53.1 + 1.36 * over60;
        hamwi = 45.5 + 2.2 * over60;
      }
      const avg = (devine + robinson + miller + hamwi) / 4;
      return [
        { label: "Average Ideal Weight", value: `${avg.toFixed(1)} kg`, highlight: true },
        { label: "Devine Formula", value: `${devine.toFixed(1)} kg` },
        { label: "Robinson Formula", value: `${robinson.toFixed(1)} kg` },
        { label: "Miller Formula", value: `${miller.toFixed(1)} kg` },
      ];
    },
    formula: { expression: "Devine: IBW = 50 + 2.3 × (inches over 60)", variables: ["For males; females start at 45.5 kg", "Multiple formulas averaged"] },
    howToUse: "Select your gender and enter your height. The calculator shows ideal weight from four different medical formulas.",
    faqs: [
      { question: "Which ideal weight formula is most accurate?", answer: "No single formula is universally best. The Devine formula is most commonly used in clinical settings, but averaging multiple formulas provides a better range." },
    ],
    relatedCalcs: healthRelated("ideal-weight-calculator"),
  },
  // 6. Lean Body Mass Calculator
  {
    slug: "lean-body-mass-calculator",
    name: "Lean Body Mass Calculator",
    category: "Health",
    categorySlug: "health",
    description: "Calculate your lean body mass (LBM) — the weight of everything in your body except fat.",
    metaDescription: "Free lean body mass calculator. Estimate your fat-free mass using the Boer formula based on height, weight, and gender.",
    icon: "heart",
    inputs: [
      { id: "gender", label: "Gender", type: "select", defaultValue: 0, options: [{ value: 0, label: "Male" }, { value: 1, label: "Female" }] },
      { id: "weight", label: "Weight (kg)", type: "number", defaultValue: 75, step: 0.1 },
      { id: "height", label: "Height (cm)", type: "number", defaultValue: 175, step: 0.1 },
    ],
    calculate: (v) => {
      const lbm = v.gender === 0
        ? 0.407 * v.weight + 0.267 * v.height - 19.2
        : 0.252 * v.weight + 0.473 * v.height - 48.3;
      const fatMass = v.weight - lbm;
      const bf = (fatMass / v.weight) * 100;
      return [
        { label: "Lean Body Mass", value: `${lbm.toFixed(1)} kg`, highlight: true },
        { label: "Fat Mass", value: `${fatMass.toFixed(1)} kg` },
        { label: "Body Fat %", value: `${bf.toFixed(1)}%` },
      ];
    },
    formula: { expression: "LBM (male) = 0.407×W + 0.267×H − 19.2", variables: ["W = Weight (kg)", "H = Height (cm)", "Boer Formula"] },
    howToUse: "Enter your gender, weight, and height to calculate your lean body mass using the Boer formula.",
    faqs: [
      { question: "Why is lean body mass important?", answer: "LBM helps determine your metabolic rate, protein needs, and medication dosages. It's a better indicator of fitness than total body weight alone." },
    ],
    relatedCalcs: healthRelated("lean-body-mass-calculator"),
  },
  // 7. Pregnancy Due Date Calculator
  {
    slug: "pregnancy-calculator",
    name: "Pregnancy Due Date Calculator",
    category: "Health",
    categorySlug: "health",
    description: "Estimate your baby's due date based on your last menstrual period (LMP) using Naegele's rule.",
    metaDescription: "Free pregnancy due date calculator. Estimate your due date and trimester milestones from your last menstrual period.",
    icon: "heart",
    inputs: [
      { id: "lmpMonth", label: "LMP Month (1-12)", type: "number", defaultValue: 1, min: 1, max: 12 },
      { id: "lmpDay", label: "LMP Day (1-31)", type: "number", defaultValue: 1, min: 1, max: 31 },
      { id: "lmpYear", label: "LMP Year", type: "number", defaultValue: 2025, min: 2020, max: 2030 },
    ],
    calculate: (v) => {
      const lmp = new Date(v.lmpYear, v.lmpMonth - 1, v.lmpDay);
      const due = new Date(lmp);
      due.setDate(due.getDate() + 280);
      const now = new Date();
      const diffDays = Math.floor((now.getTime() - lmp.getTime()) / (1000 * 60 * 60 * 24));
      const weeks = Math.max(0, Math.floor(diffDays / 7));
      const days = Math.max(0, diffDays % 7);
      const trimester = weeks < 13 ? "1st" : weeks < 27 ? "2nd" : "3rd";
      return [
        { label: "Estimated Due Date", value: due.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }), highlight: true },
        { label: "Current Week", value: `Week ${weeks}, Day ${days}` },
        { label: "Trimester", value: `${trimester} Trimester` },
        { label: "Days Until Due", value: `${Math.max(0, Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))} days` },
      ];
    },
    formula: { expression: "Due Date = LMP + 280 days", variables: ["LMP = Last Menstrual Period", "Also known as Naegele's Rule", "280 days ≈ 40 weeks"] },
    howToUse: "Enter the date of your last menstrual period (LMP). The calculator adds 280 days to estimate your due date.",
    faqs: [
      { question: "How accurate is Naegele's rule?", answer: "About 5% of babies are born on their due date. Most births occur within 1-2 weeks of the estimated date." },
    ],
    relatedCalcs: healthRelated("pregnancy-calculator"),
  },
  // 8. Ovulation Calculator
  {
    slug: "ovulation-calculator",
    name: "Ovulation Calculator",
    category: "Health",
    categorySlug: "health",
    description: "Estimate your most fertile days and ovulation date based on your menstrual cycle length.",
    metaDescription: "Free ovulation calculator. Predict your fertile window and ovulation date based on your cycle length and last period.",
    icon: "heart",
    inputs: [
      { id: "lmpMonth", label: "Last Period Month (1-12)", type: "number", defaultValue: 1, min: 1, max: 12 },
      { id: "lmpDay", label: "Last Period Day (1-31)", type: "number", defaultValue: 1, min: 1, max: 31 },
      { id: "lmpYear", label: "Last Period Year", type: "number", defaultValue: 2025, min: 2020, max: 2030 },
      { id: "cycleLength", label: "Cycle Length (days)", type: "number", defaultValue: 28, min: 21, max: 45 },
    ],
    calculate: (v) => {
      const lmp = new Date(v.lmpYear, v.lmpMonth - 1, v.lmpDay);
      const ovulation = new Date(lmp);
      ovulation.setDate(ovulation.getDate() + v.cycleLength - 14);
      const fertileStart = new Date(ovulation);
      fertileStart.setDate(fertileStart.getDate() - 5);
      const fertileEnd = new Date(ovulation);
      fertileEnd.setDate(fertileEnd.getDate() + 1);
      const nextPeriod = new Date(lmp);
      nextPeriod.setDate(nextPeriod.getDate() + v.cycleLength);
      const fmt = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      return [
        { label: "Estimated Ovulation", value: fmt(ovulation), highlight: true },
        { label: "Fertile Window", value: `${fmt(fertileStart)} – ${fmt(fertileEnd)}` },
        { label: "Next Period", value: fmt(nextPeriod) },
      ];
    },
    formula: { expression: "Ovulation ≈ LMP + (Cycle Length − 14)", variables: ["LMP = Last Menstrual Period", "Fertile window = 5 days before ovulation + 1 day after"] },
    howToUse: "Enter the first day of your last period and your average cycle length to estimate ovulation and fertile days.",
    faqs: [
      { question: "How accurate is this calculator?", answer: "This provides an estimate based on average cycles. Actual ovulation can vary. For more accuracy, consider using ovulation prediction kits." },
    ],
    relatedCalcs: healthRelated("ovulation-calculator"),
  },
  // 9. Water Intake Calculator
  {
    slug: "water-intake-calculator",
    name: "Water Intake Calculator",
    category: "Health",
    categorySlug: "health",
    description: "Calculate how much water you should drink daily based on your weight and activity level.",
    metaDescription: "Free water intake calculator. Find out how many liters of water you should drink daily based on weight, exercise, and climate.",
    icon: "heart",
    inputs: [
      { id: "weight", label: "Weight (kg)", type: "number", defaultValue: 70, step: 0.1 },
      { id: "exercise", label: "Exercise (minutes/day)", type: "number", defaultValue: 30, min: 0 },
      { id: "climate", label: "Climate", type: "select", defaultValue: 0, options: [{ value: 0, label: "Temperate" }, { value: 500, label: "Hot/Humid" }, { value: 250, label: "Cold" }] },
    ],
    calculate: (v) => {
      const base = v.weight * 35; // ml per kg
      const exerciseExtra = (v.exercise / 30) * 350;
      const total = base + exerciseExtra + v.climate;
      return [
        { label: "Daily Water Intake", value: `${(total / 1000).toFixed(1)} liters`, highlight: true },
        { label: "In Cups (250ml)", value: `${Math.round(total / 250)} cups` },
        { label: "In Ounces", value: `${Math.round(total / 29.574)} oz` },
      ];
    },
    formula: { expression: "Water (ml) = Weight × 35 + Exercise Bonus + Climate", variables: ["35ml per kg body weight", "+350ml per 30 min exercise", "Climate adjustment"] },
    howToUse: "Enter your weight, daily exercise duration, and climate type to get your recommended daily water intake.",
    faqs: [
      { question: "Is 8 glasses a day enough?", answer: "The '8 glasses' rule is a rough guideline. Actual needs vary based on body size, activity, climate, and health conditions. This calculator provides a more personalized estimate." },
    ],
    relatedCalcs: healthRelated("water-intake-calculator"),
  },
  // 10. Macro Calculator
  {
    slug: "macro-calculator",
    name: "Macro Calculator",
    category: "Health",
    categorySlug: "health",
    description: "Calculate your optimal macronutrient split (protein, carbs, fat) based on your calorie needs and goals.",
    metaDescription: "Free macronutrient calculator. Get personalized protein, carb, and fat targets based on your calories and fitness goals.",
    icon: "heart",
    inputs: [
      { id: "calories", label: "Daily Calories", type: "number", defaultValue: 2000, min: 500 },
      { id: "goal", label: "Goal", type: "select", defaultValue: 0, options: [{ value: 0, label: "Balanced (40/30/30)" }, { value: 1, label: "Low Carb (25/40/35)" }, { value: 2, label: "High Protein (30/40/30)" }, { value: 3, label: "Keto (5/30/65)" }] },
    ],
    calculate: (v) => {
      const splits: Record<number, [number, number, number]> = {
        0: [0.4, 0.3, 0.3],
        1: [0.25, 0.4, 0.35],
        2: [0.3, 0.4, 0.3],
        3: [0.05, 0.3, 0.65],
      };
      const [carb, protein, fat] = splits[v.goal] || splits[0];
      return [
        { label: "Protein", value: `${Math.round((v.calories * protein) / 4)}g (${Math.round(protein * 100)}%)`, highlight: true },
        { label: "Carbohydrates", value: `${Math.round((v.calories * carb) / 4)}g (${Math.round(carb * 100)}%)` },
        { label: "Fat", value: `${Math.round((v.calories * fat) / 9)}g (${Math.round(fat * 100)}%)` },
      ];
    },
    formula: { expression: "Protein/Carbs = Calories × % / 4 cal/g; Fat = Calories × % / 9 cal/g", variables: ["Protein = 4 cal/g", "Carbs = 4 cal/g", "Fat = 9 cal/g"] },
    howToUse: "Enter your daily calorie target and select a macro goal. The calculator distributes calories across protein, carbs, and fat.",
    faqs: [
      { question: "What macro ratio is best for weight loss?", answer: "A higher protein intake (30-40% of calories) tends to support weight loss by increasing satiety and preserving muscle mass. The best ratio depends on your individual preferences and activity." },
    ],
    relatedCalcs: healthRelated("macro-calculator"),
  },
  // 11. TDEE Calculator
  {
    slug: "tdee-calculator",
    name: "TDEE Calculator",
    category: "Health",
    categorySlug: "health",
    description: "Calculate your Total Daily Energy Expenditure to understand how many calories you burn each day.",
    metaDescription: "Free TDEE calculator. Estimate your total daily energy expenditure based on BMR and activity level using the Mifflin-St Jeor equation.",
    icon: "heart",
    inputs: [
      { id: "gender", label: "Gender", type: "select", defaultValue: 0, options: [{ value: 0, label: "Male" }, { value: 1, label: "Female" }] },
      { id: "age", label: "Age", type: "number", defaultValue: 28, min: 1 },
      { id: "weight", label: "Weight (kg)", type: "number", defaultValue: 75, step: 0.1 },
      { id: "height", label: "Height (cm)", type: "number", defaultValue: 175, step: 0.1 },
      { id: "activity", label: "Activity Level", type: "select", defaultValue: 1.55, options: [{ value: 1.2, label: "Sedentary (office job)" }, { value: 1.375, label: "Light (1-3 days/wk)" }, { value: 1.55, label: "Moderate (3-5 days/wk)" }, { value: 1.725, label: "Heavy (6-7 days/wk)" }, { value: 1.9, label: "Athlete (2x/day)" }] },
    ],
    calculate: (v) => {
      const bmr = v.gender === 0
        ? 10 * v.weight + 6.25 * v.height - 5 * v.age + 5
        : 10 * v.weight + 6.25 * v.height - 5 * v.age - 161;
      const tdee = bmr * v.activity;
      return [
        { label: "TDEE", value: `${Math.round(tdee)} cal/day`, highlight: true },
        { label: "BMR", value: `${Math.round(bmr)} cal/day` },
        { label: "Weekly Burn", value: `${Math.round(tdee * 7).toLocaleString()} cal` },
      ];
    },
    formula: { expression: "TDEE = BMR × Activity Multiplier", variables: ["BMR = 10W + 6.25H − 5A + S", "S = +5 (male), −161 (female)"] },
    howToUse: "Enter your details and activity level. TDEE shows your total daily calorie burn including exercise.",
    faqs: [
      { question: "What is the difference between BMR and TDEE?", answer: "BMR is calories burned at complete rest. TDEE adds calories from daily activities, exercise, and digestion (thermic effect of food)." },
    ],
    relatedCalcs: healthRelated("tdee-calculator"),
  },
  // 12. Heart Rate Calculator
  {
    slug: "heart-rate-calculator",
    name: "Heart Rate Calculator",
    category: "Health",
    categorySlug: "health",
    description: "Calculate your maximum heart rate and target heart rate zones for effective exercise.",
    metaDescription: "Free heart rate zone calculator. Find your maximum heart rate and optimal training zones based on age.",
    icon: "heart",
    inputs: [
      { id: "age", label: "Age", type: "number", defaultValue: 30, min: 1, max: 120 },
      { id: "restingHR", label: "Resting Heart Rate (bpm)", type: "number", defaultValue: 70, min: 30, max: 120 },
    ],
    calculate: (v) => {
      const maxHR = 220 - v.age;
      const hrr = maxHR - v.restingHR;
      const zone = (pct: number) => Math.round(hrr * pct + v.restingHR);
      return [
        { label: "Maximum Heart Rate", value: `${maxHR} bpm`, highlight: true },
        { label: "Fat Burn Zone (60-70%)", value: `${zone(0.6)} – ${zone(0.7)} bpm` },
        { label: "Cardio Zone (70-80%)", value: `${zone(0.7)} – ${zone(0.8)} bpm` },
        { label: "Peak Zone (80-90%)", value: `${zone(0.8)} – ${zone(0.9)} bpm` },
      ];
    },
    formula: { expression: "Max HR = 220 − Age; Zone = HRR × % + Resting HR", variables: ["HRR = Max HR − Resting HR", "Karvonen method"] },
    howToUse: "Enter your age and resting heart rate to see your maximum heart rate and training zones.",
    faqs: [
      { question: "How do I measure resting heart rate?", answer: "Measure your pulse first thing in the morning before getting out of bed. Count beats for 60 seconds or 15 seconds × 4." },
    ],
    relatedCalcs: healthRelated("heart-rate-calculator"),
  },
  // 13. Target Heart Rate Calculator
  {
    slug: "target-heart-rate-calculator",
    name: "Target Heart Rate Calculator",
    category: "Health",
    categorySlug: "health",
    description: "Find your target heart rate range for a specific exercise intensity using the Karvonen formula.",
    metaDescription: "Calculate your target heart rate for exercise based on age, resting heart rate, and desired intensity.",
    icon: "heart",
    inputs: [
      { id: "age", label: "Age", type: "number", defaultValue: 30, min: 1 },
      { id: "restingHR", label: "Resting Heart Rate (bpm)", type: "number", defaultValue: 68, min: 30 },
      { id: "intensityLow", label: "Low Intensity (%)", type: "number", defaultValue: 50, min: 0, max: 100 },
      { id: "intensityHigh", label: "High Intensity (%)", type: "number", defaultValue: 85, min: 0, max: 100 },
    ],
    calculate: (v) => {
      const maxHR = 220 - v.age;
      const hrr = maxHR - v.restingHR;
      const low = Math.round(hrr * (v.intensityLow / 100) + v.restingHR);
      const high = Math.round(hrr * (v.intensityHigh / 100) + v.restingHR);
      return [
        { label: "Target HR Range", value: `${low} – ${high} bpm`, highlight: true },
        { label: "Max Heart Rate", value: `${maxHR} bpm` },
        { label: "Heart Rate Reserve", value: `${hrr} bpm` },
      ];
    },
    formula: { expression: "THR = HRR × Intensity% + Resting HR", variables: ["HRR = 220 − Age − Resting HR", "Karvonen formula"] },
    howToUse: "Enter your age, resting heart rate, and desired intensity range to calculate your target heart rate for exercise.",
    faqs: [
      { question: "What intensity should I train at?", answer: "Beginners should start at 50-60%. Moderate fitness: 60-70%. Advanced: 70-85%. Always consult a doctor before starting intense exercise." },
    ],
    relatedCalcs: healthRelated("target-heart-rate-calculator"),
  },
  // 14. Pace Calculator
  {
    slug: "pace-calculator",
    name: "Pace Calculator",
    category: "Health",
    categorySlug: "health",
    description: "Calculate your running or walking pace per mile/km, or estimate finish time for a given distance.",
    metaDescription: "Free running pace calculator. Calculate pace per mile or km, or estimate your finish time for 5K, 10K, half marathon, or marathon.",
    icon: "heart",
    inputs: [
      { id: "distance", label: "Distance (km)", type: "number", defaultValue: 5, step: 0.1 },
      { id: "hours", label: "Hours", type: "number", defaultValue: 0, min: 0 },
      { id: "minutes", label: "Minutes", type: "number", defaultValue: 25, min: 0 },
      { id: "seconds", label: "Seconds", type: "number", defaultValue: 0, min: 0 },
    ],
    calculate: (v) => {
      const totalSec = v.hours * 3600 + v.minutes * 60 + v.seconds;
      if (v.distance <= 0 || totalSec <= 0) return [{ label: "Error", value: "Enter valid values" }];
      const paceSecKm = totalSec / v.distance;
      const paceSecMi = paceSecKm * 1.60934;
      const fmtPace = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
      const speed = (v.distance / totalSec) * 3600;
      return [
        { label: "Pace per km", value: `${fmtPace(paceSecKm)} /km`, highlight: true },
        { label: "Pace per mile", value: `${fmtPace(paceSecMi)} /mi` },
        { label: "Speed", value: `${speed.toFixed(1)} km/h` },
      ];
    },
    formula: { expression: "Pace = Total Time / Distance", variables: ["Time in seconds", "Distance in km or miles"] },
    howToUse: "Enter your distance and total time. The calculator computes your pace per km/mile and speed.",
    faqs: [
      { question: "What is a good running pace?", answer: "Beginners often run 6:00-7:00/km. Intermediate runners: 5:00-6:00/km. Competitive runners: under 4:30/km." },
    ],
    relatedCalcs: healthRelated("pace-calculator"),
  },
  // 15. Steps to Calories Calculator
  {
    slug: "steps-to-calories-calculator",
    name: "Steps to Calories Calculator",
    category: "Health",
    categorySlug: "health",
    description: "Estimate how many calories you burn from walking a certain number of steps based on your weight.",
    metaDescription: "Convert steps to calories burned. Estimate calorie expenditure from walking based on step count and body weight.",
    icon: "heart",
    inputs: [
      { id: "steps", label: "Number of Steps", type: "number", defaultValue: 10000, min: 0 },
      { id: "weight", label: "Weight (kg)", type: "number", defaultValue: 70, step: 0.1 },
    ],
    calculate: (v) => {
      const strideM = 0.762; // avg stride length
      const distKm = (v.steps * strideM) / 1000;
      const calories = v.steps * 0.04 * (v.weight / 70);
      const distMi = distKm / 1.60934;
      return [
        { label: "Calories Burned", value: `${Math.round(calories)} cal`, highlight: true },
        { label: "Distance Walked", value: `${distKm.toFixed(2)} km` },
        { label: "Distance (miles)", value: `${distMi.toFixed(2)} mi` },
      ];
    },
    formula: { expression: "Calories ≈ Steps × 0.04 × (Weight / 70)", variables: ["Based on average stride", "Adjusted for body weight"] },
    howToUse: "Enter your step count and weight. The calculator estimates calories burned and distance covered.",
    faqs: [
      { question: "How many steps should I walk daily?", answer: "10,000 steps per day is a popular goal, but studies show health benefits starting at 7,000-8,000 steps. Any increase from your current level is beneficial." },
    ],
    relatedCalcs: healthRelated("steps-to-calories-calculator"),
  },
  // 16. BAC Calculator
  {
    slug: "bac-calculator",
    name: "BAC Calculator",
    category: "Health",
    categorySlug: "health",
    description: "Estimate your Blood Alcohol Content (BAC) based on drinks consumed, body weight, and time.",
    metaDescription: "Free BAC calculator. Estimate your blood alcohol content based on drinks, weight, gender, and time elapsed.",
    icon: "heart",
    inputs: [
      { id: "gender", label: "Gender", type: "select", defaultValue: 0, options: [{ value: 0, label: "Male" }, { value: 1, label: "Female" }] },
      { id: "weight", label: "Weight (kg)", type: "number", defaultValue: 75, step: 0.1 },
      { id: "drinks", label: "Standard Drinks", type: "number", defaultValue: 3, min: 0, step: 0.5 },
      { id: "hours", label: "Hours Since First Drink", type: "number", defaultValue: 2, min: 0, step: 0.5 },
    ],
    calculate: (v) => {
      const r = v.gender === 0 ? 0.68 : 0.55;
      const alcoholGrams = v.drinks * 14;
      const bac = Math.max(0, (alcoholGrams / (v.weight * 1000 * r)) * 100 - 0.015 * v.hours);
      let status = "Sober";
      if (bac > 0.08) status = "Legally Impaired";
      else if (bac > 0.04) status = "Mildly Impaired";
      else if (bac > 0) status = "Minimal Effects";
      const soberHours = bac > 0 ? bac / 0.015 : 0;
      return [
        { label: "Estimated BAC", value: `${bac.toFixed(3)}%`, highlight: true },
        { label: "Status", value: status },
        { label: "Time to Sober", value: `≈ ${soberHours.toFixed(1)} hours` },
      ];
    },
    formula: { expression: "BAC = (Alcohol g / (Weight × 1000 × r)) × 100 − 0.015 × Hours", variables: ["r = 0.68 (male), 0.55 (female)", "1 standard drink = 14g alcohol"] },
    howToUse: "Enter your gender, weight, number of standard drinks consumed, and hours since your first drink.",
    faqs: [
      { question: "What is the legal BAC limit?", answer: "In most U.S. states, the legal limit is 0.08%. However, impairment can begin at much lower levels. Never drive if you feel impaired." },
    ],
    relatedCalcs: healthRelated("bac-calculator"),
  },
  // 17. Protein Intake Calculator
  {
    slug: "protein-intake-calculator",
    name: "Protein Intake Calculator",
    category: "Health",
    categorySlug: "health",
    description: "Calculate your recommended daily protein intake based on your weight, activity level, and fitness goals.",
    metaDescription: "Free protein intake calculator. Find your optimal daily protein in grams based on weight, activity, and goals.",
    icon: "heart",
    inputs: [
      { id: "weight", label: "Weight (kg)", type: "number", defaultValue: 70, step: 0.1 },
      { id: "activity", label: "Activity Level", type: "select", defaultValue: 1.6, options: [{ value: 0.8, label: "Sedentary" }, { value: 1.2, label: "Lightly Active" }, { value: 1.6, label: "Moderately Active" }, { value: 2.0, label: "Very Active / Athlete" }, { value: 2.2, label: "Bodybuilder" }] },
    ],
    calculate: (v) => {
      const protein = v.weight * v.activity;
      return [
        { label: "Daily Protein", value: `${Math.round(protein)}g`, highlight: true },
        { label: "Per Meal (3 meals)", value: `${Math.round(protein / 3)}g` },
        { label: "Per Meal (5 meals)", value: `${Math.round(protein / 5)}g` },
        { label: "Calories from Protein", value: `${Math.round(protein * 4)} cal` },
      ];
    },
    formula: { expression: "Protein (g) = Weight (kg) × Activity Factor", variables: ["Sedentary = 0.8g/kg", "Active = 1.6g/kg", "Athlete = 2.0-2.2g/kg"] },
    howToUse: "Enter your weight and activity level to get your recommended daily protein intake.",
    faqs: [
      { question: "Can I eat too much protein?", answer: "For most healthy adults, up to 2.2g/kg is safe. Very high intakes (>3g/kg) may stress kidneys in people with pre-existing kidney conditions." },
    ],
    relatedCalcs: healthRelated("protein-intake-calculator"),
  },
  // 18. Carbohydrate Intake Calculator
  {
    slug: "carbohydrate-intake-calculator",
    name: "Carbohydrate Intake Calculator",
    category: "Health",
    categorySlug: "health",
    description: "Calculate your recommended daily carbohydrate intake based on calorie needs and dietary preferences.",
    metaDescription: "Free carbohydrate intake calculator. Determine how many grams of carbs you should eat daily based on your calorie needs.",
    icon: "heart",
    inputs: [
      { id: "calories", label: "Daily Calories", type: "number", defaultValue: 2000, min: 500 },
      { id: "carbPct", label: "Carb Percentage", type: "select", defaultValue: 50, options: [{ value: 20, label: "Low Carb (20%)" }, { value: 35, label: "Moderate Low (35%)" }, { value: 50, label: "Balanced (50%)" }, { value: 60, label: "High Carb (60%)" }] },
    ],
    calculate: (v) => {
      const carbGrams = (v.calories * (v.carbPct / 100)) / 4;
      const carbCals = carbGrams * 4;
      return [
        { label: "Daily Carbs", value: `${Math.round(carbGrams)}g`, highlight: true },
        { label: "Calories from Carbs", value: `${Math.round(carbCals)} cal` },
        { label: "Per Meal (3 meals)", value: `${Math.round(carbGrams / 3)}g` },
      ];
    },
    formula: { expression: "Carbs (g) = (Calories × Carb%) / 4", variables: ["1g carbs = 4 calories", "Typical range: 45-65% of calories"] },
    howToUse: "Enter your daily calorie target and preferred carbohydrate percentage to see your daily gram target.",
    faqs: [
      { question: "How many carbs should I eat per day?", answer: "The Dietary Guidelines suggest 45-65% of calories from carbs (225-325g on a 2,000 cal diet). Low-carb diets use 20-35%." },
    ],
    relatedCalcs: healthRelated("carbohydrate-intake-calculator"),
  },
  // 19. Fat Intake Calculator
  {
    slug: "fat-intake-calculator",
    name: "Fat Intake Calculator",
    category: "Health",
    categorySlug: "health",
    description: "Calculate your recommended daily fat intake in grams based on your calorie needs and diet type.",
    metaDescription: "Free fat intake calculator. Determine your daily fat grams based on calorie target and dietary preferences.",
    icon: "heart",
    inputs: [
      { id: "calories", label: "Daily Calories", type: "number", defaultValue: 2000, min: 500 },
      { id: "fatPct", label: "Fat Percentage", type: "select", defaultValue: 30, options: [{ value: 20, label: "Low Fat (20%)" }, { value: 30, label: "Moderate (30%)" }, { value: 40, label: "High Fat (40%)" }, { value: 65, label: "Keto (65%)" }] },
    ],
    calculate: (v) => {
      const fatGrams = (v.calories * (v.fatPct / 100)) / 9;
      const satFat = fatGrams * 0.33;
      return [
        { label: "Daily Fat", value: `${Math.round(fatGrams)}g`, highlight: true },
        { label: "Calories from Fat", value: `${Math.round(fatGrams * 9)} cal` },
        { label: "Saturated Fat Limit", value: `< ${Math.round(satFat)}g` },
      ];
    },
    formula: { expression: "Fat (g) = (Calories × Fat%) / 9", variables: ["1g fat = 9 calories", "Typical range: 20-35% of calories"] },
    howToUse: "Enter your daily calorie target and preferred fat percentage to calculate your daily fat gram intake.",
    faqs: [
      { question: "Are all fats bad?", answer: "No. Unsaturated fats (olive oil, nuts, avocados) are beneficial. Limit saturated fats to <10% of calories and avoid trans fats entirely." },
    ],
    relatedCalcs: healthRelated("fat-intake-calculator"),
  },
  // 20. Child Growth Percentile Calculator
  {
    slug: "child-growth-percentile-calculator",
    name: "Child Growth Percentile Calculator",
    category: "Health",
    categorySlug: "health",
    description: "Estimate your child's growth percentile for weight and height based on age and gender using WHO standards.",
    metaDescription: "Free child growth percentile calculator. Estimate where your child falls on WHO growth charts by age, weight, and height.",
    icon: "heart",
    inputs: [
      { id: "gender", label: "Gender", type: "select", defaultValue: 0, options: [{ value: 0, label: "Boy" }, { value: 1, label: "Girl" }] },
      { id: "ageMonths", label: "Age (months)", type: "number", defaultValue: 24, min: 0, max: 240 },
      { id: "weight", label: "Weight (kg)", type: "number", defaultValue: 12, step: 0.1 },
      { id: "height", label: "Height (cm)", type: "number", defaultValue: 86, step: 0.1 },
    ],
    calculate: (v) => {
      // Simplified percentile estimation using approximate WHO medians
      const ageYears = v.ageMonths / 12;
      // Approximate median weights (simplified)
      const medianWeight = v.gender === 0
        ? 3.5 + ageYears * 2.1
        : 3.3 + ageYears * 2.0;
      const medianHeight = v.gender === 0
        ? 50 + ageYears * 6.5
        : 49 + ageYears * 6.3;
      // Z-score approximation
      const wZ = (v.weight - medianWeight) / (medianWeight * 0.12);
      const hZ = (v.height - medianHeight) / (medianHeight * 0.04);
      // CDF approximation
      const cdf = (z: number) => {
        const t = 1 / (1 + 0.2316419 * Math.abs(z));
        const d = 0.3989422802 * Math.exp(-z * z / 2);
        const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
        return z > 0 ? (1 - p) * 100 : p * 100;
      };
      const wPct = Math.min(99, Math.max(1, Math.round(cdf(wZ))));
      const hPct = Math.min(99, Math.max(1, Math.round(cdf(hZ))));
      const bmi = v.weight / ((v.height / 100) ** 2);
      return [
        { label: "Weight Percentile", value: `${wPct}th`, highlight: true },
        { label: "Height Percentile", value: `${hPct}th` },
        { label: "BMI", value: `${bmi.toFixed(1)}` },
      ];
    },
    formula: { expression: "Percentile from WHO Z-score charts", variables: ["Based on age, gender, weight, height", "Simplified approximation"] },
    howToUse: "Enter your child's gender, age in months, weight, and height. The calculator estimates growth percentiles based on WHO standards.",
    faqs: [
      { question: "What does 50th percentile mean?", answer: "The 50th percentile means your child's measurement is at the median — 50% of children their age weigh more and 50% weigh less. Most children fall between the 25th and 75th percentiles." },
    ],
    relatedCalcs: healthRelated("child-growth-percentile-calculator"),
  },
  // 21. One Rep Max Calculator
  {
    slug: "one-rep-max-calculator", name: "One Rep Max Calculator", category: "Health", categorySlug: "health",
    description: "Estimate your one-repetition maximum (1RM) for any lift based on weight and reps performed.",
    metaDescription: "Free one rep max calculator. Estimate your 1RM using the Epley formula from any weight and rep count.",
    icon: "heart",
    inputs: [
      { id: "weight", label: "Weight Lifted", type: "number", defaultValue: 100, step: 0.5 },
      { id: "reps", label: "Reps Performed", type: "number", defaultValue: 8, min: 1, max: 30 },
    ],
    calculate: (v) => {
      if (v.reps === 1) return [{ label: "1RM", value: `${v.weight}`, highlight: true }, { label: "That IS your 1RM!", value: "Test confirmed" }];
      const epley = v.weight * (1 + v.reps / 30);
      const brzycki = v.weight * (36 / (37 - v.reps));
      const avg = (epley + brzycki) / 2;
      return [
        { label: "Estimated 1RM", value: `${Math.round(avg)}`, highlight: true },
        { label: "Epley Formula", value: `${Math.round(epley)}` },
        { label: "Brzycki Formula", value: `${Math.round(brzycki)}` },
        { label: "95% (heavy single)", value: `${Math.round(avg * 0.95)}` },
        { label: "80% (working sets)", value: `${Math.round(avg * 0.8)}` },
      ];
    },
    formula: { expression: "Epley: 1RM = W × (1 + R/30); Brzycki: 1RM = W × 36/(37−R)", variables: ["W = weight lifted", "R = reps performed"] },
    howToUse: "Enter the weight you lifted and how many reps you completed. The calculator estimates your 1RM.",
    faqs: [{ question: "How accurate is this?", answer: "Most accurate with 1-10 reps. Above 10 reps, estimates become less reliable. The average of Epley and Brzycki is typically within 5% of actual 1RM." }],
    relatedCalcs: healthRelated("one-rep-max-calculator"),
  },
  // 22. Body Surface Area Calculator
  {
    slug: "body-surface-area-calculator", name: "Body Surface Area Calculator", category: "Health", categorySlug: "health",
    description: "Calculate your body surface area (BSA) using the Mosteller formula for medical dosing.",
    metaDescription: "Free BSA calculator. Calculate body surface area using the Mosteller formula for medical applications.",
    icon: "heart",
    inputs: [
      { id: "height", label: "Height (cm)", type: "number", defaultValue: 175, step: 0.1 },
      { id: "weight", label: "Weight (kg)", type: "number", defaultValue: 75, step: 0.1 },
    ],
    calculate: (v) => {
      const bsa = Math.sqrt((v.height * v.weight) / 3600);
      return [
        { label: "BSA", value: `${bsa.toFixed(2)} m²`, highlight: true },
        { label: "Average Adult BSA", value: "1.7-1.9 m²" },
      ];
    },
    formula: { expression: "BSA = √(Height × Weight / 3600)", variables: ["Mosteller formula", "Height in cm, Weight in kg"] },
    howToUse: "Enter height and weight to calculate body surface area.",
    faqs: [{ question: "Why is BSA important?", answer: "BSA is used for drug dosing (chemotherapy), burn assessment, kidney function, and cardiac index calculations." }],
    relatedCalcs: healthRelated("body-surface-area-calculator"),
  },
  // 23. Army Body Fat Calculator
  {
    slug: "army-body-fat-calculator", name: "Army Body Fat Calculator", category: "Health", categorySlug: "health",
    description: "Calculate body fat percentage using the U.S. Army circumference-based method.",
    metaDescription: "Free Army body fat calculator. Estimate body fat using the DoD circumference method.",
    icon: "heart",
    inputs: [
      { id: "gender", label: "Gender", type: "select", defaultValue: 0, options: [{ value: 0, label: "Male" }, { value: 1, label: "Female" }] },
      { id: "height", label: "Height (inches)", type: "number", defaultValue: 70, step: 0.5 },
      { id: "waist", label: "Waist (inches)", type: "number", defaultValue: 34, step: 0.5 },
      { id: "neck", label: "Neck (inches)", type: "number", defaultValue: 15.5, step: 0.5 },
      { id: "hip", label: "Hip (inches, women)", type: "number", defaultValue: 38, step: 0.5 },
    ],
    calculate: (v) => {
      let bf: number;
      if (v.gender === 0) {
        bf = 86.010 * Math.log10(v.waist - v.neck) - 70.041 * Math.log10(v.height) + 36.76;
      } else {
        bf = 163.205 * Math.log10(v.waist + v.hip - v.neck) - 97.684 * Math.log10(v.height) - 78.387;
      }
      const maxAllowed = v.gender === 0 ? 26 : 36;
      return [
        { label: "Body Fat %", value: `${Math.max(bf, 2).toFixed(1)}%`, highlight: true },
        { label: "Army Max Allowed", value: `${maxAllowed}%` },
        { label: "Status", value: bf <= maxAllowed ? "Within Standards ✓" : "Exceeds Standards" },
      ];
    },
    formula: { expression: "Male: 86.01×log(waist−neck) − 70.04×log(height) + 36.76", variables: ["Female adds hip measurement", "All measurements in inches"] },
    howToUse: "Enter measurements in inches. Women must also enter hip measurement.",
    faqs: [{ question: "What are Army body fat standards?", answer: "Males: 26% max (ages 17-20) to 26%. Females: 30-36% depending on age. Standards vary by branch." }],
    relatedCalcs: healthRelated("army-body-fat-calculator"),
  },
  // 24. Calories Burned Calculator
  {
    slug: "calories-burned-calculator", name: "Calories Burned Calculator", category: "Health", categorySlug: "health",
    description: "Estimate calories burned during various activities based on duration and body weight.",
    metaDescription: "Free calories burned calculator. Estimate calorie expenditure for running, cycling, swimming, and more.",
    icon: "heart",
    inputs: [
      { id: "weight", label: "Weight (kg)", type: "number", defaultValue: 70, step: 0.1 },
      { id: "activity", label: "Activity", type: "select", defaultValue: 7, options: [{ value: 3.5, label: "Walking (moderate)" }, { value: 7, label: "Running (jogging)" }, { value: 10, label: "Running (fast)" }, { value: 6, label: "Cycling (moderate)" }, { value: 8, label: "Swimming" }, { value: 5, label: "Weight Training" }, { value: 4, label: "Yoga" }] },
      { id: "duration", label: "Duration (minutes)", type: "number", defaultValue: 30, min: 1 },
    ],
    calculate: (v) => {
      const calories = (v.activity * v.weight * 3.5 / 200) * v.duration;
      return [
        { label: "Calories Burned", value: `${Math.round(calories)} cal`, highlight: true },
        { label: "Per Hour", value: `${Math.round(calories * 60 / v.duration)} cal/hr` },
        { label: "MET Value", value: `${v.activity}` },
      ];
    },
    formula: { expression: "Calories = MET × Weight(kg) × 3.5 / 200 × Minutes", variables: ["MET = Metabolic Equivalent of Task"] },
    howToUse: "Select an activity, enter your weight and duration to estimate calories burned.",
    faqs: [{ question: "What are METs?", answer: "Metabolic Equivalents measure exercise intensity. 1 MET = resting. Walking = 3-4 METs. Running = 7-12 METs." }],
    relatedCalcs: healthRelated("calories-burned-calculator"),
  },
  // 25. Pregnancy Weight Gain Calculator
  {
    slug: "pregnancy-weight-gain-calculator", name: "Pregnancy Weight Gain Calculator", category: "Health", categorySlug: "health",
    description: "Calculate recommended weight gain during pregnancy based on pre-pregnancy BMI.",
    metaDescription: "Free pregnancy weight gain calculator. Find recommended weight gain ranges by trimester.",
    icon: "heart",
    inputs: [
      { id: "weight", label: "Pre-Pregnancy Weight (kg)", type: "number", defaultValue: 65, step: 0.1 },
      { id: "height", label: "Height (cm)", type: "number", defaultValue: 165, step: 0.1 },
      { id: "week", label: "Current Week of Pregnancy", type: "number", defaultValue: 20, min: 1, max: 42 },
    ],
    calculate: (v) => {
      const bmi = v.weight / ((v.height / 100) ** 2);
      let minTotal: number, maxTotal: number;
      if (bmi < 18.5) { minTotal = 12.5; maxTotal = 18; }
      else if (bmi < 25) { minTotal = 11.5; maxTotal = 16; }
      else if (bmi < 30) { minTotal = 7; maxTotal = 11.5; }
      else { minTotal = 5; maxTotal = 9; }
      const progress = Math.min(v.week / 40, 1);
      const expectedMin = minTotal * progress;
      const expectedMax = maxTotal * progress;
      return [
        { label: "Expected Gain So Far", value: `${expectedMin.toFixed(1)} – ${expectedMax.toFixed(1)} kg`, highlight: true },
        { label: "Total Recommended", value: `${minTotal} – ${maxTotal} kg` },
        { label: "Pre-Pregnancy BMI", value: bmi.toFixed(1) },
        { label: "BMI Category", value: bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese" },
      ];
    },
    formula: { expression: "Based on IOM guidelines by pre-pregnancy BMI", variables: ["Normal BMI: 11.5-16 kg total", "Gradual gain assumed"] },
    howToUse: "Enter pre-pregnancy weight, height, and current week to see recommended weight gain.",
    faqs: [{ question: "Why does recommended gain vary by BMI?", answer: "Women with lower BMI need more weight gain for healthy fetal development. Higher BMI women have more reserves." }],
    relatedCalcs: healthRelated("pregnancy-weight-gain-calculator"),
  },
  // 26. Period Calculator
  {
    slug: "period-calculator", name: "Period Calculator", category: "Health", categorySlug: "health",
    description: "Predict your next period date and track your menstrual cycle.",
    metaDescription: "Free period calculator. Predict next period date based on cycle length and last period.",
    icon: "heart",
    inputs: [
      { id: "lastMonth", label: "Last Period Month (1-12)", type: "number", defaultValue: 1, min: 1, max: 12 },
      { id: "lastDay", label: "Last Period Day", type: "number", defaultValue: 15, min: 1, max: 31 },
      { id: "lastYear", label: "Last Period Year", type: "number", defaultValue: 2026, min: 2020 },
      { id: "cycleLength", label: "Cycle Length (days)", type: "number", defaultValue: 28, min: 21, max: 45 },
      { id: "periodLength", label: "Period Duration (days)", type: "number", defaultValue: 5, min: 1, max: 10 },
    ],
    calculate: (v) => {
      const lastPeriod = new Date(v.lastYear, v.lastMonth - 1, v.lastDay);
      const next1 = new Date(lastPeriod); next1.setDate(next1.getDate() + v.cycleLength);
      const next2 = new Date(next1); next2.setDate(next2.getDate() + v.cycleLength);
      const next3 = new Date(next2); next3.setDate(next3.getDate() + v.cycleLength);
      const fmt = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      return [
        { label: "Next Period", value: fmt(next1), highlight: true },
        { label: "Following Period", value: fmt(next2) },
        { label: "3rd Period", value: fmt(next3) },
        { label: "Cycle Length", value: `${v.cycleLength} days` },
      ];
    },
    formula: { expression: "Next Period = Last Period + Cycle Length", variables: ["Assumes regular cycles"] },
    howToUse: "Enter the first day of your last period and your average cycle length.",
    faqs: [{ question: "What is a normal cycle length?", answer: "Normal cycles range from 21-35 days, with 28 days being average. Cycles can vary by a few days each month." }],
    relatedCalcs: healthRelated("period-calculator"),
  },
  // 27. GFR Calculator
  {
    slug: "gfr-calculator", name: "GFR Calculator", category: "Health", categorySlug: "health",
    description: "Estimate Glomerular Filtration Rate (eGFR) to assess kidney function using the CKD-EPI equation.",
    metaDescription: "Free GFR calculator. Estimate kidney function using the CKD-EPI equation from creatinine, age, and sex.",
    icon: "heart",
    inputs: [
      { id: "gender", label: "Gender", type: "select", defaultValue: 0, options: [{ value: 0, label: "Male" }, { value: 1, label: "Female" }] },
      { id: "age", label: "Age", type: "number", defaultValue: 45, min: 18, max: 120 },
      { id: "creatinine", label: "Serum Creatinine (mg/dL)", type: "number", defaultValue: 1.0, step: 0.01 },
    ],
    calculate: (v) => {
      const kappa = v.gender === 0 ? 0.9 : 0.7;
      const alpha = v.gender === 0 ? -0.302 : -0.241;
      const sexFactor = v.gender === 0 ? 1 : 1.012;
      const scr = v.creatinine / kappa;
      const egfr = 142 * Math.pow(Math.min(scr, 1), alpha) * Math.pow(Math.max(scr, 1), -1.200) * Math.pow(0.9938, v.age) * sexFactor;
      let stage = "Normal (G1)";
      if (egfr < 15) stage = "Kidney Failure (G5)";
      else if (egfr < 30) stage = "Severe (G4)";
      else if (egfr < 45) stage = "Moderate-Severe (G3b)";
      else if (egfr < 60) stage = "Moderate (G3a)";
      else if (egfr < 90) stage = "Mild (G2)";
      return [
        { label: "eGFR", value: `${Math.round(egfr)} mL/min/1.73m²`, highlight: true },
        { label: "CKD Stage", value: stage },
      ];
    },
    formula: { expression: "CKD-EPI 2021 (race-free)", variables: ["eGFR based on creatinine, age, sex"] },
    howToUse: "Enter gender, age, and serum creatinine level from a blood test.",
    faqs: [{ question: "What is a normal GFR?", answer: "Normal is ≥90 mL/min/1.73m². Below 60 sustained for 3 months indicates chronic kidney disease." }],
    relatedCalcs: healthRelated("gfr-calculator"),
  },
  // 28. Conception Calculator
  {
    slug: "conception-calculator", name: "Conception Calculator", category: "Health", categorySlug: "health",
    description: "Estimate the date of conception based on your due date or last menstrual period.",
    metaDescription: "Free conception date calculator. Estimate when conception occurred from due date or last period.",
    icon: "heart",
    inputs: [
      { id: "mode", label: "Calculate From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Last Menstrual Period" }, { value: 1, label: "Due Date" }] },
      { id: "month", label: "Month (1-12)", type: "number", defaultValue: 6, min: 1, max: 12 },
      { id: "day", label: "Day (1-31)", type: "number", defaultValue: 15, min: 1, max: 31 },
      { id: "year", label: "Year", type: "number", defaultValue: 2025, min: 2020 },
    ],
    calculate: (v) => {
      const date = new Date(v.year, v.month - 1, v.day);
      let conception: Date;
      if (v.mode === 0) {
        conception = new Date(date); conception.setDate(conception.getDate() + 14);
      } else {
        conception = new Date(date); conception.setDate(conception.getDate() - 266);
      }
      const fertileStart = new Date(conception); fertileStart.setDate(fertileStart.getDate() - 5);
      const fmt = (d: Date) => d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
      return [
        { label: "Estimated Conception", value: fmt(conception), highlight: true },
        { label: "Fertile Window", value: `${fmt(fertileStart)} – ${fmt(conception)}` },
      ];
    },
    formula: { expression: "From LMP: Conception ≈ LMP + 14 days; From Due Date: Conception ≈ Due − 266 days", variables: ["Ovulation typically occurs ~14 days after LMP"] },
    howToUse: "Select whether you know your LMP or due date, then enter the date.",
    faqs: [{ question: "How accurate is this?", answer: "This estimates based on a 28-day cycle with ovulation at day 14. Actual conception can vary by several days." }],
    relatedCalcs: healthRelated("conception-calculator"),
  },
  // 29. Healthy Weight Calculator
  {
    slug: "healthy-weight-calculator", name: "Healthy Weight Calculator", category: "Health", categorySlug: "health",
    description: "Find the healthy weight range for your height based on BMI guidelines.",
    metaDescription: "Free healthy weight calculator. Find your ideal weight range based on height using BMI guidelines.",
    icon: "heart",
    inputs: [
      { id: "height", label: "Height (cm)", type: "number", defaultValue: 170, step: 0.1 },
    ],
    calculate: (v) => {
      const hm = v.height / 100;
      const minWeight = 18.5 * hm * hm;
      const maxWeight = 24.9 * hm * hm;
      const midWeight = (minWeight + maxWeight) / 2;
      return [
        { label: "Healthy Range", value: `${minWeight.toFixed(1)} – ${maxWeight.toFixed(1)} kg`, highlight: true },
        { label: "Midpoint", value: `${midWeight.toFixed(1)} kg` },
        { label: "In Pounds", value: `${(minWeight * 2.205).toFixed(0)} – ${(maxWeight * 2.205).toFixed(0)} lbs` },
      ];
    },
    formula: { expression: "Weight Range = BMI(18.5-24.9) × Height(m)²", variables: ["BMI 18.5-24.9 is considered healthy"] },
    howToUse: "Enter your height to see the healthy weight range based on BMI guidelines.",
    faqs: [{ question: "Is BMI the best measure?", answer: "BMI is a screening tool, not a diagnostic. It doesn't account for muscle mass, bone density, or body composition." }],
    relatedCalcs: healthRelated("healthy-weight-calculator"),
  },
  // 30. Body Type Calculator
  {
    slug: "body-type-calculator", name: "Body Type Calculator", category: "Health", categorySlug: "health",
    description: "Determine your body frame size (small, medium, large) based on wrist circumference and height.",
    metaDescription: "Free body type calculator. Determine your body frame size from wrist measurement and height.",
    icon: "heart",
    inputs: [
      { id: "gender", label: "Gender", type: "select", defaultValue: 0, options: [{ value: 0, label: "Male" }, { value: 1, label: "Female" }] },
      { id: "height", label: "Height (cm)", type: "number", defaultValue: 175, step: 0.1 },
      { id: "wrist", label: "Wrist Circumference (cm)", type: "number", defaultValue: 17, step: 0.1 },
    ],
    calculate: (v) => {
      const ratio = v.height / v.wrist;
      let frame: string;
      if (v.gender === 0) {
        frame = ratio > 10.4 ? "Small Frame" : ratio > 9.6 ? "Medium Frame" : "Large Frame";
      } else {
        frame = ratio > 11 ? "Small Frame" : ratio > 10.1 ? "Medium Frame" : "Large Frame";
      }
      return [
        { label: "Body Frame", value: frame, highlight: true },
        { label: "Height/Wrist Ratio", value: ratio.toFixed(1) },
      ];
    },
    formula: { expression: "Ratio = Height / Wrist Circumference", variables: ["Male: >10.4 small, 9.6-10.4 medium, <9.6 large"] },
    howToUse: "Enter your gender, height, and wrist circumference to determine body frame size.",
    faqs: [{ question: "Why does frame size matter?", answer: "Frame size affects ideal weight calculations. A large-framed person can healthily weigh more than a small-framed person of the same height." }],
    relatedCalcs: healthRelated("body-type-calculator"),
  },
];
