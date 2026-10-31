import { CalculatorConfig } from "@/components/CalculatorTemplate";

const healthRelated = (exclude: string) => [
  { name: "BMI Calculator", slug: "bmi-calculator", icon: "heart", category: "health" },
  { name: "BMR Calculator", slug: "bmr-calculator", icon: "heart", category: "health" },
  { name: "Calorie Calculator", slug: "calorie-calculator", icon: "heart", category: "health" },
  { name: "TDEE Calculator", slug: "tdee-calculator", icon: "heart", category: "health" },
].filter((c) => c.slug !== exclude);

export const healthCalculatorsExtended: CalculatorConfig[] = [
  // ═══════════════════════════════════════════
  // BODY COMPOSITION CALCULATORS
  // ═══════════════════════════════════════════
  {
    slug: "waist-to-height-ratio-calculator", name: "Waist-to-Height Ratio Calculator", category: "Health", categorySlug: "health", subcategory: "Body Composition",
    description: "Calculate your waist-to-height ratio — a simple indicator of health risk related to central obesity.",
    metaDescription: "Free waist-to-height ratio calculator. Assess health risk from central obesity.",
    icon: "heart",
    inputs: [
      { id: "waist", label: "Waist Circumference (cm)", type: "number", defaultValue: 80, step: 0.1 },
      { id: "height", label: "Height (cm)", type: "number", defaultValue: 170, step: 0.1 },
    ],
    calculate: (v) => {
      const ratio = v.waist / v.height;
      let risk = "Healthy";
      if (ratio > 0.58) risk = "High Risk";
      else if (ratio > 0.53) risk = "Increased Risk";
      else if (ratio > 0.46) risk = "Healthy";
      else risk = "Underweight Risk";
      return [
        { label: "Waist-to-Height Ratio", value: ratio.toFixed(3), highlight: true },
        { label: "Risk Category", value: risk },
        { label: "Target (keep below 0.5)", value: `${(v.height * 0.5).toFixed(0)} cm waist` },
      ];
    },
    formula: { expression: "WHtR = Waist / Height", variables: ["<0.5 = healthy", ">0.58 = high risk"] },
    howToUse: "Enter your waist circumference and height in centimeters.",
    faqs: [{ question: "Why waist-to-height?", answer: "WHtR is considered a better predictor of cardiovascular risk than BMI because it accounts for central fat distribution." }],
    relatedCalcs: healthRelated("waist-to-height-ratio-calculator"),
  },
  {
    slug: "waist-to-hip-ratio-calculator", name: "Waist-to-Hip Ratio Calculator", category: "Health", categorySlug: "health", subcategory: "Body Composition",
    description: "Calculate waist-to-hip ratio to assess body fat distribution and associated health risks.",
    metaDescription: "Free waist-to-hip ratio calculator. Assess health risk based on body fat distribution.",
    icon: "heart",
    inputs: [
      { id: "waist", label: "Waist (cm)", type: "number", defaultValue: 80, step: 0.1 },
      { id: "hip", label: "Hip (cm)", type: "number", defaultValue: 100, step: 0.1 },
      { id: "gender", label: "Gender", type: "select", defaultValue: 0, options: [{ value: 0, label: "Male" }, { value: 1, label: "Female" }] },
    ],
    calculate: (v) => {
      const ratio = v.waist / v.hip;
      const threshold = v.gender === 0 ? 0.9 : 0.85;
      return [
        { label: "Waist-to-Hip Ratio", value: ratio.toFixed(3), highlight: true },
        { label: "Risk Level", value: ratio > threshold ? "High Risk" : "Normal" },
        { label: "Threshold", value: threshold.toString() },
      ];
    },
    formula: { expression: "WHR = Waist / Hip", variables: ["Male risk: >0.9", "Female risk: >0.85"] },
    howToUse: "Measure waist at narrowest point and hips at widest point.",
    faqs: [{ question: "What is a healthy WHR?", answer: "Males: <0.9, Females: <0.85. Higher ratios indicate more abdominal fat and greater health risk." }],
    relatedCalcs: healthRelated("waist-to-hip-ratio-calculator"),
  },
  {
    slug: "body-adiposity-index-calculator", name: "Body Adiposity Index Calculator", category: "Health", categorySlug: "health", subcategory: "Body Composition",
    description: "Estimate body fat percentage using hip circumference and height without needing weight.",
    metaDescription: "Free BAI calculator. Estimate body fat from hip circumference and height.",
    icon: "heart",
    inputs: [
      { id: "hip", label: "Hip Circumference (cm)", type: "number", defaultValue: 100, step: 0.1 },
      { id: "height", label: "Height (m)", type: "number", defaultValue: 1.70, step: 0.01 },
    ],
    calculate: (v) => {
      const bai = (v.hip / Math.pow(v.height, 1.5)) - 18;
      return [
        { label: "Body Adiposity Index", value: `${bai.toFixed(1)}%`, highlight: true },
        { label: "Estimated Body Fat", value: `${bai.toFixed(1)}%` },
      ];
    },
    formula: { expression: "BAI = (Hip / Height^1.5) − 18", variables: ["Hip in cm, Height in meters"] },
    howToUse: "Enter hip circumference in cm and height in meters.",
    faqs: [{ question: "How accurate is BAI?", answer: "BAI correlates well with DEXA for populations but may be less accurate for very lean or obese individuals." }],
    relatedCalcs: healthRelated("body-adiposity-index-calculator"),
  },
  {
    slug: "relative-fat-mass-calculator", name: "Relative Fat Mass Calculator", category: "Health", categorySlug: "health", subcategory: "Body Composition",
    description: "Calculate Relative Fat Mass using height and waist circumference for a better body fat estimate.",
    metaDescription: "Free RFM calculator. Estimate body fat percentage more accurately than BMI.",
    icon: "heart",
    inputs: [
      { id: "gender", label: "Gender", type: "select", defaultValue: 0, options: [{ value: 0, label: "Male" }, { value: 1, label: "Female" }] },
      { id: "height", label: "Height (cm)", type: "number", defaultValue: 175, step: 0.1 },
      { id: "waist", label: "Waist (cm)", type: "number", defaultValue: 85, step: 0.1 },
    ],
    calculate: (v) => {
      const rfm = v.gender === 0
        ? 64 - (20 * v.height / v.waist)
        : 76 - (20 * v.height / v.waist);
      return [
        { label: "Relative Fat Mass", value: `${rfm.toFixed(1)}%`, highlight: true },
        { label: "Classification", value: rfm < 20 ? "Athletic" : rfm < 25 ? "Healthy" : rfm < 30 ? "Above Average" : "High" },
      ];
    },
    formula: { expression: "RFM (male) = 64 − 20×(Height/Waist)", variables: ["Female: 76 − 20×(Height/Waist)"] },
    howToUse: "Enter gender, height, and waist circumference.",
    faqs: [{ question: "Is RFM better than BMI?", answer: "RFM has been shown to estimate body fat more accurately than BMI in several studies." }],
    relatedCalcs: healthRelated("relative-fat-mass-calculator"),
  },
  {
    slug: "body-roundness-index-calculator", name: "Body Roundness Index Calculator", category: "Health", categorySlug: "health", subcategory: "Body Composition",
    description: "Calculate Body Roundness Index which quantifies body shape and visceral fat.",
    metaDescription: "Free BRI calculator. Assess body shape and visceral fat risk.",
    icon: "heart",
    inputs: [
      { id: "waist", label: "Waist (cm)", type: "number", defaultValue: 85, step: 0.1 },
      { id: "height", label: "Height (cm)", type: "number", defaultValue: 175, step: 0.1 },
    ],
    calculate: (v) => {
      const wc = v.waist / 100;
      const h = v.height / 100;
      const eccentricity = Math.sqrt(1 - Math.pow((wc / (2 * Math.PI)), 2) / Math.pow(h / 2, 2));
      const bri = 364.2 - 365.5 * eccentricity;
      return [
        { label: "Body Roundness Index", value: bri.toFixed(2), highlight: true },
        { label: "Risk", value: bri > 6 ? "High" : bri > 4 ? "Moderate" : "Low" },
      ];
    },
    formula: { expression: "BRI based on body eccentricity from waist and height", variables: ["Higher BRI = more round = more visceral fat"] },
    howToUse: "Enter waist circumference and height.",
    faqs: [{ question: "What does BRI measure?", answer: "BRI quantifies how round vs elliptical your body cross-section is, correlating with visceral adiposity." }],
    relatedCalcs: healthRelated("body-roundness-index-calculator"),
  },
  {
    slug: "skinfold-body-fat-calculator", name: "Skinfold Body Fat Calculator", category: "Health", categorySlug: "health", subcategory: "Body Composition",
    description: "Estimate body fat using the Jackson-Pollock 3-site skinfold method.",
    metaDescription: "Free skinfold body fat calculator using 3-site Jackson-Pollock method.",
    icon: "heart",
    inputs: [
      { id: "gender", label: "Gender", type: "select", defaultValue: 0, options: [{ value: 0, label: "Male" }, { value: 1, label: "Female" }] },
      { id: "age", label: "Age", type: "number", defaultValue: 30 },
      { id: "site1", label: "Site 1 (mm)", type: "number", defaultValue: 12, step: 0.5 },
      { id: "site2", label: "Site 2 (mm)", type: "number", defaultValue: 15, step: 0.5 },
      { id: "site3", label: "Site 3 (mm)", type: "number", defaultValue: 10, step: 0.5 },
    ],
    calculate: (v) => {
      const sum = v.site1 + v.site2 + v.site3;
      let density: number;
      if (v.gender === 0) {
        density = 1.10938 - 0.0008267 * sum + 0.0000016 * sum * sum - 0.0002574 * v.age;
      } else {
        density = 1.0994921 - 0.0009929 * sum + 0.0000023 * sum * sum - 0.0001392 * v.age;
      }
      const bf = (495 / density) - 450;
      return [
        { label: "Body Fat %", value: `${bf.toFixed(1)}%`, highlight: true },
        { label: "Body Density", value: density.toFixed(4) },
        { label: "Sum of Skinfolds", value: `${sum} mm` },
      ];
    },
    formula: { expression: "BF% = (495/Density) − 450 (Siri equation)", variables: ["Density from Jackson-Pollock 3-site"] },
    howToUse: "Males: chest, abdomen, thigh. Females: triceps, suprailiac, thigh.",
    faqs: [{ question: "How accurate are skinfold measurements?", answer: "Within 3-4% of DEXA when performed by a trained professional. Consistency in measurement technique is key." }],
    relatedCalcs: healthRelated("skinfold-body-fat-calculator"),
  },
  {
    slug: "fat-mass-index-calculator", name: "Fat Mass Index Calculator", category: "Health", categorySlug: "health", subcategory: "Body Composition",
    description: "Calculate Fat Mass Index (FMI) to assess if your fat mass is proportionate to your height.",
    metaDescription: "Free FMI calculator. Assess fat mass relative to height.",
    icon: "heart",
    inputs: [
      { id: "weight", label: "Weight (kg)", type: "number", defaultValue: 75, step: 0.1 },
      { id: "height", label: "Height (cm)", type: "number", defaultValue: 175, step: 0.1 },
      { id: "bodyFat", label: "Body Fat (%)", type: "number", defaultValue: 20, step: 0.1 },
    ],
    calculate: (v) => {
      const fatMass = v.weight * (v.bodyFat / 100);
      const hm = v.height / 100;
      const fmi = fatMass / (hm * hm);
      return [
        { label: "Fat Mass Index", value: `${fmi.toFixed(1)} kg/m²`, highlight: true },
        { label: "Fat Mass", value: `${fatMass.toFixed(1)} kg` },
        { label: "Classification", value: fmi < 5 ? "Low" : fmi < 9 ? "Normal" : "Excess" },
      ];
    },
    formula: { expression: "FMI = Fat Mass / Height²", variables: ["Fat Mass = Weight × BF%"] },
    howToUse: "Enter weight, height, and body fat percentage.",
    faqs: [{ question: "What is a normal FMI?", answer: "Males: 3-6 kg/m². Females: 5-9 kg/m². Higher values indicate excess fat." }],
    relatedCalcs: healthRelated("fat-mass-index-calculator"),
  },
  {
    slug: "fat-free-mass-index-calculator", name: "Fat-Free Mass Index Calculator", category: "Health", categorySlug: "health", subcategory: "Body Composition",
    description: "Calculate FFMI to assess muscular development relative to height.",
    metaDescription: "Free FFMI calculator. Assess muscle mass development normalized for height.",
    icon: "heart",
    inputs: [
      { id: "weight", label: "Weight (kg)", type: "number", defaultValue: 80, step: 0.1 },
      { id: "height", label: "Height (cm)", type: "number", defaultValue: 178, step: 0.1 },
      { id: "bodyFat", label: "Body Fat (%)", type: "number", defaultValue: 15, step: 0.1 },
    ],
    calculate: (v) => {
      const lbm = v.weight * (1 - v.bodyFat / 100);
      const hm = v.height / 100;
      const ffmi = lbm / (hm * hm);
      const adjustedFfmi = ffmi + 6.1 * (1.8 - hm);
      return [
        { label: "FFMI", value: ffmi.toFixed(1), highlight: true },
        { label: "Adjusted FFMI", value: adjustedFfmi.toFixed(1) },
        { label: "Lean Body Mass", value: `${lbm.toFixed(1)} kg` },
        { label: "Rating", value: ffmi > 25 ? "Exceptional" : ffmi > 22 ? "Advanced" : ffmi > 19 ? "Intermediate" : "Beginner" },
      ];
    },
    formula: { expression: "FFMI = LBM / Height²", variables: ["Adjusted FFMI corrects for height differences", "Natural limit ~25"] },
    howToUse: "Enter weight, height, and body fat percentage.",
    faqs: [{ question: "What is a good FFMI?", answer: "18-20 is average male, 22-23 is muscular, 25+ is near the natural limit." }],
    relatedCalcs: healthRelated("fat-free-mass-index-calculator"),
  },
  {
    slug: "lean-mass-index-calculator", name: "Lean Mass Index Calculator", category: "Health", categorySlug: "health", subcategory: "Body Composition",
    description: "Calculate your lean mass index to track muscle development progress.",
    metaDescription: "Free lean mass index calculator. Track muscle development relative to height.",
    icon: "heart",
    inputs: [
      { id: "leanMass", label: "Lean Mass (kg)", type: "number", defaultValue: 60, step: 0.1 },
      { id: "height", label: "Height (cm)", type: "number", defaultValue: 175, step: 0.1 },
    ],
    calculate: (v) => {
      const hm = v.height / 100;
      const lmi = v.leanMass / (hm * hm);
      return [
        { label: "Lean Mass Index", value: `${lmi.toFixed(1)} kg/m²`, highlight: true },
        { label: "Classification", value: lmi > 20 ? "Athletic" : lmi > 17 ? "Average" : "Below Average" },
      ];
    },
    formula: { expression: "LMI = Lean Mass / Height²", variables: ["Similar to FFMI"] },
    howToUse: "Enter lean mass and height.",
    faqs: [{ question: "How do I find lean mass?", answer: "Lean mass = Total weight − Fat mass. Use a body fat calculator to estimate." }],
    relatedCalcs: healthRelated("lean-mass-index-calculator"),
  },
  {
    slug: "body-density-calculator", name: "Body Density Calculator", category: "Health", categorySlug: "health", subcategory: "Body Composition",
    description: "Estimate body density from skinfold measurements to calculate body fat percentage.",
    metaDescription: "Free body density calculator from skinfold measurements.",
    icon: "heart",
    inputs: [
      { id: "gender", label: "Gender", type: "select", defaultValue: 0, options: [{ value: 0, label: "Male" }, { value: 1, label: "Female" }] },
      { id: "age", label: "Age", type: "number", defaultValue: 30 },
      { id: "sumSkinfolds", label: "Sum of Skinfolds (mm)", type: "number", defaultValue: 40, step: 0.5 },
    ],
    calculate: (v) => {
      const s = v.sumSkinfolds;
      let density: number;
      if (v.gender === 0) {
        density = 1.10938 - 0.0008267 * s + 0.0000016 * s * s - 0.0002574 * v.age;
      } else {
        density = 1.0994921 - 0.0009929 * s + 0.0000023 * s * s - 0.0001392 * v.age;
      }
      const bf = (495 / density) - 450;
      return [
        { label: "Body Density", value: `${density.toFixed(4)} g/cm³`, highlight: true },
        { label: "Body Fat %", value: `${bf.toFixed(1)}%` },
      ];
    },
    formula: { expression: "Siri: BF% = (495/Density) − 450", variables: ["Density from Jackson-Pollock equation"] },
    howToUse: "Enter gender, age, and sum of 3-site skinfold measurements.",
    faqs: [{ question: "What units?", answer: "Skinfolds in mm. Density in g/cm³ (water = 1.0)." }],
    relatedCalcs: healthRelated("body-density-calculator"),
  },

  // ═══════════════════════════════════════════
  // NUTRITION CALCULATORS
  // ═══════════════════════════════════════════
  {
    slug: "daily-water-intake-calculator", name: "Daily Water Intake Calculator", category: "Health", categorySlug: "health", subcategory: "Nutrition",
    description: "Calculate your recommended daily water intake based on weight, activity, and climate.",
    metaDescription: "Free daily water intake calculator personalized to your body and lifestyle.",
    icon: "heart",
    inputs: [
      { id: "weight", label: "Weight (kg)", type: "number", defaultValue: 70, step: 0.1 },
      { id: "exercise", label: "Exercise (min/day)", type: "number", defaultValue: 30 },
      { id: "climate", label: "Climate", type: "select", defaultValue: 0, options: [{ value: 0, label: "Temperate" }, { value: 500, label: "Hot/Humid" }, { value: 250, label: "Cold/Dry" }] },
    ],
    calculate: (v) => {
      const base = v.weight * 35;
      const exerciseBonus = (v.exercise / 30) * 350;
      const total = base + exerciseBonus + v.climate;
      return [
        { label: "Daily Water Intake", value: `${(total / 1000).toFixed(1)} L`, highlight: true },
        { label: "In Cups (250ml)", value: `${Math.round(total / 250)} cups` },
        { label: "In Ounces", value: `${Math.round(total / 29.574)} oz` },
      ];
    },
    formula: { expression: "Water (ml) = Weight×35 + Exercise Bonus + Climate", variables: ["35ml per kg body weight"] },
    howToUse: "Enter weight, daily exercise, and climate.",
    faqs: [{ question: "Does coffee count?", answer: "Moderate caffeine intake does count toward hydration, though water is preferred." }],
    relatedCalcs: healthRelated("daily-water-intake-calculator"),
  },
  {
    slug: "fiber-intake-calculator", name: "Fiber Intake Calculator", category: "Health", categorySlug: "health", subcategory: "Nutrition",
    description: "Calculate your recommended daily fiber intake based on age and gender.",
    metaDescription: "Free fiber intake calculator. Find your daily fiber recommendation.",
    icon: "heart",
    inputs: [
      { id: "gender", label: "Gender", type: "select", defaultValue: 0, options: [{ value: 0, label: "Male" }, { value: 1, label: "Female" }] },
      { id: "age", label: "Age", type: "number", defaultValue: 30 },
      { id: "calories", label: "Daily Calories", type: "number", defaultValue: 2000 },
    ],
    calculate: (v) => {
      const recommended = v.gender === 0 ? (v.age <= 50 ? 38 : 30) : (v.age <= 50 ? 25 : 21);
      const perCalorie = (v.calories / 1000) * 14;
      return [
        { label: "Recommended Fiber", value: `${recommended}g/day`, highlight: true },
        { label: "Per 1000 cal Rule", value: `${perCalorie.toFixed(0)}g/day` },
        { label: "Minimum", value: `${Math.min(recommended, Math.round(perCalorie))}g/day` },
      ];
    },
    formula: { expression: "14g per 1000 calories, adjusted by age/sex", variables: ["Males 19-50: 38g", "Females 19-50: 25g"] },
    howToUse: "Enter gender, age, and daily calorie intake.",
    faqs: [{ question: "Why is fiber important?", answer: "Fiber aids digestion, lowers cholesterol, controls blood sugar, and promotes satiety for weight management." }],
    relatedCalcs: healthRelated("fiber-intake-calculator"),
  },
  {
    slug: "sugar-intake-calculator", name: "Sugar Intake Calculator", category: "Health", categorySlug: "health", subcategory: "Nutrition",
    description: "Calculate your maximum daily added sugar intake based on WHO and AHA guidelines.",
    metaDescription: "Free sugar intake calculator based on health guidelines.",
    icon: "heart",
    inputs: [
      { id: "gender", label: "Gender", type: "select", defaultValue: 0, options: [{ value: 0, label: "Male" }, { value: 1, label: "Female" }] },
      { id: "calories", label: "Daily Calories", type: "number", defaultValue: 2000 },
    ],
    calculate: (v) => {
      const ahaMax = v.gender === 0 ? 36 : 25;
      const whoMax = Math.round(v.calories * 0.10 / 4);
      const whoIdeal = Math.round(v.calories * 0.05 / 4);
      return [
        { label: "AHA Max Added Sugar", value: `${ahaMax}g/day`, highlight: true },
        { label: "WHO Max (10% cal)", value: `${whoMax}g/day` },
        { label: "WHO Ideal (5% cal)", value: `${whoIdeal}g/day` },
        { label: "AHA in Teaspoons", value: `${Math.round(ahaMax / 4)} tsp` },
      ];
    },
    formula: { expression: "AHA: Men 36g, Women 25g max added sugar", variables: ["WHO: <10% of calories, ideally <5%"] },
    howToUse: "Select gender and enter daily calorie intake.",
    faqs: [{ question: "What counts as added sugar?", answer: "Sugar added during processing — not naturally occurring sugar in fruits and milk." }],
    relatedCalcs: healthRelated("sugar-intake-calculator"),
  },
  {
    slug: "sodium-intake-calculator", name: "Sodium Intake Calculator", category: "Health", categorySlug: "health", subcategory: "Nutrition",
    description: "Calculate recommended daily sodium limits and track intake against guidelines.",
    metaDescription: "Free sodium intake calculator based on health guidelines.",
    icon: "heart",
    inputs: [
      { id: "age", label: "Age", type: "number", defaultValue: 35 },
      { id: "hasHypertension", label: "Hypertension?", type: "select", defaultValue: 0, options: [{ value: 0, label: "No" }, { value: 1, label: "Yes" }] },
      { id: "currentIntake", label: "Current Intake (mg/day)", type: "number", defaultValue: 3400 },
    ],
    calculate: (v) => {
      const limit = v.hasHypertension === 1 ? 1500 : 2300;
      const excess = Math.max(0, v.currentIntake - limit);
      return [
        { label: "Recommended Limit", value: `${limit} mg/day`, highlight: true },
        { label: "Current Intake", value: `${v.currentIntake} mg/day` },
        { label: "Excess", value: excess > 0 ? `${excess} mg over` : "Within limit ✓" },
        { label: "In Teaspoons Salt", value: `${(v.currentIntake / 2300).toFixed(1)} tsp` },
      ];
    },
    formula: { expression: "AHA: <2300mg general, <1500mg for hypertension", variables: ["1 tsp salt ≈ 2300mg sodium"] },
    howToUse: "Enter age, hypertension status, and current daily sodium intake.",
    faqs: [{ question: "Why limit sodium?", answer: "Excess sodium raises blood pressure, increasing risk of heart disease and stroke." }],
    relatedCalcs: healthRelated("sodium-intake-calculator"),
  },
  {
    slug: "cholesterol-intake-calculator", name: "Cholesterol Intake Calculator", category: "Health", categorySlug: "health", subcategory: "Nutrition",
    description: "Track dietary cholesterol intake against recommended guidelines.",
    metaDescription: "Free cholesterol intake calculator with health guidelines.",
    icon: "heart",
    inputs: [
      { id: "eggs", label: "Eggs per day", type: "number", defaultValue: 2 },
      { id: "meat", label: "Meat servings (100g)", type: "number", defaultValue: 2, step: 0.5 },
      { id: "dairy", label: "Dairy servings", type: "number", defaultValue: 2, step: 0.5 },
    ],
    calculate: (v) => {
      const fromEggs = v.eggs * 186;
      const fromMeat = v.meat * 75;
      const fromDairy = v.dairy * 30;
      const total = fromEggs + fromMeat + fromDairy;
      return [
        { label: "Estimated Daily Cholesterol", value: `${Math.round(total)} mg`, highlight: true },
        { label: "From Eggs", value: `${Math.round(fromEggs)} mg` },
        { label: "From Meat", value: `${Math.round(fromMeat)} mg` },
        { label: "Guideline", value: total > 300 ? "Above 300mg guideline" : "Within guideline ✓" },
      ];
    },
    formula: { expression: "Sum of cholesterol from food sources", variables: ["1 egg ≈ 186mg", "100g meat ≈ 75mg"] },
    howToUse: "Enter your daily food servings to estimate cholesterol intake.",
    faqs: [{ question: "Does dietary cholesterol matter?", answer: "Current research shows dietary cholesterol has less impact on blood cholesterol than saturated fat for most people." }],
    relatedCalcs: healthRelated("cholesterol-intake-calculator"),
  },
  {
    slug: "glycemic-load-calculator", name: "Glycemic Load Calculator", category: "Health", categorySlug: "health", subcategory: "Nutrition",
    description: "Calculate the glycemic load of a food serving to understand its blood sugar impact.",
    metaDescription: "Free glycemic load calculator for managing blood sugar.",
    icon: "heart",
    inputs: [
      { id: "gi", label: "Glycemic Index (0-100)", type: "number", defaultValue: 72 },
      { id: "carbs", label: "Carbs per serving (g)", type: "number", defaultValue: 25, step: 0.1 },
    ],
    calculate: (v) => {
      const gl = (v.gi * v.carbs) / 100;
      return [
        { label: "Glycemic Load", value: gl.toFixed(1), highlight: true },
        { label: "Classification", value: gl <= 10 ? "Low" : gl <= 20 ? "Medium" : "High" },
        { label: "GI Rating", value: v.gi <= 55 ? "Low GI" : v.gi <= 69 ? "Medium GI" : "High GI" },
      ];
    },
    formula: { expression: "GL = (GI × Carbs per serving) / 100", variables: ["Low: ≤10", "Medium: 11-19", "High: ≥20"] },
    howToUse: "Enter the glycemic index and carbs per serving of a food.",
    faqs: [{ question: "GL vs GI?", answer: "GI measures how fast a carb raises blood sugar. GL accounts for portion size, making it more practical." }],
    relatedCalcs: healthRelated("glycemic-load-calculator"),
  },
  {
    slug: "glycemic-index-calculator", name: "Glycemic Index Calculator", category: "Health", categorySlug: "health", subcategory: "Nutrition",
    description: "Look up and compare glycemic index values for common foods to manage blood sugar.",
    metaDescription: "Free glycemic index reference calculator for common foods.",
    icon: "heart",
    inputs: [
      { id: "food", label: "Food Type", type: "select", defaultValue: 72, options: [{ value: 72, label: "White Bread" }, { value: 55, label: "Brown Rice" }, { value: 36, label: "Apple" }, { value: 25, label: "Lentils" }, { value: 80, label: "White Rice" }, { value: 42, label: "Oatmeal" }] },
      { id: "servingCarbs", label: "Carbs in Serving (g)", type: "number", defaultValue: 30, step: 1 },
    ],
    calculate: (v) => {
      const gi = v.food;
      const gl = (gi * v.servingCarbs) / 100;
      return [
        { label: "Glycemic Index", value: `${gi}`, highlight: true },
        { label: "GI Category", value: gi <= 55 ? "Low" : gi <= 69 ? "Medium" : "High" },
        { label: "Glycemic Load", value: gl.toFixed(1) },
        { label: "GL Category", value: gl <= 10 ? "Low" : gl <= 20 ? "Medium" : "High" },
      ];
    },
    formula: { expression: "GI categorized: Low ≤55, Medium 56-69, High ≥70", variables: ["GL = GI × Carbs / 100"] },
    howToUse: "Select a food and enter carbs per serving.",
    faqs: [{ question: "What affects GI?", answer: "Cooking method, ripeness, fiber content, and food combinations all affect GI." }],
    relatedCalcs: healthRelated("glycemic-index-calculator"),
  },
  {
    slug: "meal-calorie-calculator", name: "Meal Calorie Calculator", category: "Health", categorySlug: "health", subcategory: "Nutrition",
    description: "Calculate total calories in a meal from protein, carbs, and fat content.",
    metaDescription: "Free meal calorie calculator from macronutrient content.",
    icon: "heart",
    inputs: [
      { id: "protein", label: "Protein (g)", type: "number", defaultValue: 30, step: 0.1 },
      { id: "carbs", label: "Carbohydrates (g)", type: "number", defaultValue: 45, step: 0.1 },
      { id: "fat", label: "Fat (g)", type: "number", defaultValue: 15, step: 0.1 },
      { id: "alcohol", label: "Alcohol (g)", type: "number", defaultValue: 0, step: 0.1 },
    ],
    calculate: (v) => {
      const cal = v.protein * 4 + v.carbs * 4 + v.fat * 9 + v.alcohol * 7;
      return [
        { label: "Total Calories", value: `${Math.round(cal)} cal`, highlight: true },
        { label: "From Protein", value: `${Math.round(v.protein * 4)} cal (${Math.round((v.protein * 4 / cal) * 100)}%)` },
        { label: "From Carbs", value: `${Math.round(v.carbs * 4)} cal (${Math.round((v.carbs * 4 / cal) * 100)}%)` },
        { label: "From Fat", value: `${Math.round(v.fat * 9)} cal (${Math.round((v.fat * 9 / cal) * 100)}%)` },
      ];
    },
    formula: { expression: "Calories = Protein×4 + Carbs×4 + Fat×9 + Alcohol×7", variables: ["Atwater factors"] },
    howToUse: "Enter the macronutrient content of your meal.",
    faqs: [{ question: "Are all calories equal?", answer: "Calorically yes, but protein has higher thermic effect and greater satiety than carbs or fat." }],
    relatedCalcs: healthRelated("meal-calorie-calculator"),
  },
  {
    slug: "food-energy-calculator", name: "Food Energy Calculator", category: "Health", categorySlug: "health", subcategory: "Nutrition",
    description: "Convert between calories, kilojoules, and other food energy units.",
    metaDescription: "Free food energy converter between calories and kilojoules.",
    icon: "heart",
    inputs: [
      { id: "calories", label: "Calories (kcal)", type: "number", defaultValue: 500, step: 1 },
    ],
    calculate: (v) => {
      const kj = v.calories * 4.184;
      return [
        { label: "Kilojoules", value: `${Math.round(kj)} kJ`, highlight: true },
        { label: "Calories", value: `${v.calories} kcal` },
        { label: "BTU", value: `${(v.calories * 3.968).toFixed(0)} BTU` },
      ];
    },
    formula: { expression: "1 kcal = 4.184 kJ", variables: ["kJ commonly used in Australia/Europe"] },
    howToUse: "Enter calories to convert to kilojoules.",
    faqs: [{ question: "kcal vs Cal?", answer: "They are the same. 1 food Calorie (Cal) = 1 kilocalorie (kcal) = 4.184 kilojoules." }],
    relatedCalcs: healthRelated("food-energy-calculator"),
  },
  {
    slug: "daily-nutrient-requirement-calculator", name: "Daily Nutrient Requirement Calculator", category: "Health", categorySlug: "health", subcategory: "Nutrition",
    description: "Calculate daily requirements for key nutrients based on age, gender, and activity.",
    metaDescription: "Free daily nutrient calculator for protein, fiber, vitamins, and minerals.",
    icon: "heart",
    inputs: [
      { id: "gender", label: "Gender", type: "select", defaultValue: 0, options: [{ value: 0, label: "Male" }, { value: 1, label: "Female" }] },
      { id: "age", label: "Age", type: "number", defaultValue: 30 },
      { id: "weight", label: "Weight (kg)", type: "number", defaultValue: 70, step: 0.1 },
      { id: "activity", label: "Activity", type: "select", defaultValue: 1, options: [{ value: 0, label: "Sedentary" }, { value: 1, label: "Active" }, { value: 2, label: "Very Active" }] },
    ],
    calculate: (v) => {
      const proteinMultiplier = v.activity === 0 ? 0.8 : v.activity === 1 ? 1.2 : 1.6;
      const protein = v.weight * proteinMultiplier;
      const fiber = v.gender === 0 ? (v.age <= 50 ? 38 : 30) : (v.age <= 50 ? 25 : 21);
      const calcium = v.age > 50 ? 1200 : 1000;
      const vitD = v.age > 70 ? 800 : 600;
      return [
        { label: "Protein", value: `${Math.round(protein)}g/day`, highlight: true },
        { label: "Fiber", value: `${fiber}g/day` },
        { label: "Calcium", value: `${calcium}mg/day` },
        { label: "Vitamin D", value: `${vitD} IU/day` },
      ];
    },
    formula: { expression: "Protein = Weight × Activity Multiplier", variables: ["0.8g/kg sedentary", "1.2-1.6g/kg active"] },
    howToUse: "Enter gender, age, weight, and activity level.",
    faqs: [{ question: "Do athletes need more?", answer: "Yes, athletes may need 1.4-2.0g/kg of protein and increased micronutrients." }],
    relatedCalcs: healthRelated("daily-nutrient-requirement-calculator"),
  },
  {
    slug: "vitamin-intake-calculator", name: "Vitamin Intake Calculator", category: "Health", categorySlug: "health", subcategory: "Nutrition",
    description: "Find your recommended daily vitamin intake based on age and gender.",
    metaDescription: "Free vitamin intake calculator with daily recommended amounts.",
    icon: "heart",
    inputs: [
      { id: "gender", label: "Gender", type: "select", defaultValue: 0, options: [{ value: 0, label: "Male" }, { value: 1, label: "Female" }] },
      { id: "age", label: "Age", type: "number", defaultValue: 30 },
    ],
    calculate: (v) => {
      const vitA = v.gender === 0 ? 900 : 700;
      const vitC = v.gender === 0 ? 90 : 75;
      const vitD = v.age > 70 ? 800 : 600;
      const vitE = 15;
      return [
        { label: "Vitamin A", value: `${vitA} mcg RAE`, highlight: true },
        { label: "Vitamin C", value: `${vitC} mg` },
        { label: "Vitamin D", value: `${vitD} IU` },
        { label: "Vitamin E", value: `${vitE} mg` },
      ];
    },
    formula: { expression: "Based on USDA Dietary Reference Intakes", variables: ["Varies by age and sex"] },
    howToUse: "Enter gender and age for recommended vitamin intakes.",
    faqs: [{ question: "Should I take supplements?", answer: "Most people can get vitamins from a balanced diet. Supplements may help those with deficiencies or specific conditions." }],
    relatedCalcs: healthRelated("vitamin-intake-calculator"),
  },
  {
    slug: "mineral-intake-calculator", name: "Mineral Intake Calculator", category: "Health", categorySlug: "health", subcategory: "Nutrition",
    description: "Find your recommended daily mineral intake for calcium, iron, zinc, and more.",
    metaDescription: "Free mineral intake calculator with daily recommended amounts.",
    icon: "heart",
    inputs: [
      { id: "gender", label: "Gender", type: "select", defaultValue: 0, options: [{ value: 0, label: "Male" }, { value: 1, label: "Female" }] },
      { id: "age", label: "Age", type: "number", defaultValue: 30 },
    ],
    calculate: (v) => {
      const calcium = v.age > 50 ? 1200 : 1000;
      const iron = v.gender === 1 && v.age < 51 ? 18 : 8;
      const zinc = v.gender === 0 ? 11 : 8;
      const magnesium = v.gender === 0 ? 420 : 320;
      return [
        { label: "Calcium", value: `${calcium} mg`, highlight: true },
        { label: "Iron", value: `${iron} mg` },
        { label: "Zinc", value: `${zinc} mg` },
        { label: "Magnesium", value: `${magnesium} mg` },
      ];
    },
    formula: { expression: "Based on USDA DRI", variables: ["Women need more iron during reproductive years"] },
    howToUse: "Enter gender and age.",
    faqs: [{ question: "Can I get too much?", answer: "Yes, excessive mineral intake can be harmful. Upper limits exist for most minerals." }],
    relatedCalcs: healthRelated("mineral-intake-calculator"),
  },

  // ═══════════════════════════════════════════
  // WEIGHT MANAGEMENT CALCULATORS
  // ═══════════════════════════════════════════
  {
    slug: "weight-loss-target-calculator", name: "Weight Loss Target Calculator", category: "Health", categorySlug: "health", subcategory: "Weight Management",
    description: "Calculate a realistic timeline for reaching your target weight based on calorie deficit.",
    metaDescription: "Free weight loss target calculator. Plan your weight loss timeline.",
    icon: "heart",
    inputs: [
      { id: "currentWeight", label: "Current Weight (kg)", type: "number", defaultValue: 85, step: 0.1 },
      { id: "targetWeight", label: "Target Weight (kg)", type: "number", defaultValue: 70, step: 0.1 },
      { id: "deficit", label: "Daily Deficit (cal)", type: "number", defaultValue: 500 },
    ],
    calculate: (v) => {
      const toLose = v.currentWeight - v.targetWeight;
      const weeksNeeded = (toLose * 7700) / (v.deficit * 7);
      const targetDate = new Date(); targetDate.setDate(targetDate.getDate() + weeksNeeded * 7);
      return [
        { label: "Time to Goal", value: `${Math.round(weeksNeeded)} weeks`, highlight: true },
        { label: "Weight to Lose", value: `${toLose.toFixed(1)} kg` },
        { label: "Target Date", value: targetDate.toLocaleDateString("en-US", { month: "short", year: "numeric" }) },
        { label: "Weekly Loss", value: `${(v.deficit * 7 / 7700).toFixed(2)} kg/week` },
      ];
    },
    formula: { expression: "Weeks = (Weight × 7700 cal/kg) / (Deficit × 7)", variables: ["1 kg fat ≈ 7700 calories"] },
    howToUse: "Enter current weight, target weight, and daily calorie deficit.",
    faqs: [{ question: "What's a safe rate?", answer: "0.5-1 kg per week (500-1000 cal/day deficit) is safe and sustainable." }],
    relatedCalcs: healthRelated("weight-loss-target-calculator"),
  },
  {
    slug: "weight-gain-calculator", name: "Weight Gain Calculator", category: "Health", categorySlug: "health", subcategory: "Weight Management",
    description: "Calculate calorie surplus and timeline needed for healthy weight gain.",
    metaDescription: "Free weight gain calculator. Plan calorie surplus for muscle building.",
    icon: "heart",
    inputs: [
      { id: "currentWeight", label: "Current Weight (kg)", type: "number", defaultValue: 60, step: 0.1 },
      { id: "targetWeight", label: "Target Weight (kg)", type: "number", defaultValue: 70, step: 0.1 },
      { id: "surplus", label: "Daily Surplus (cal)", type: "number", defaultValue: 300 },
    ],
    calculate: (v) => {
      const toGain = v.targetWeight - v.currentWeight;
      const weeksNeeded = (toGain * 7700) / (v.surplus * 7);
      return [
        { label: "Time to Goal", value: `${Math.round(weeksNeeded)} weeks`, highlight: true },
        { label: "Weight to Gain", value: `${toGain.toFixed(1)} kg` },
        { label: "Weekly Gain", value: `${(v.surplus * 7 / 7700).toFixed(2)} kg/week` },
      ];
    },
    formula: { expression: "Weeks = (Weight × 7700) / (Surplus × 7)", variables: ["200-500 cal surplus for lean gains"] },
    howToUse: "Enter current weight, target, and daily calorie surplus.",
    faqs: [{ question: "How fast can I gain muscle?", answer: "Beginners: ~1kg/month. Intermediate: ~0.5kg/month. Advanced: ~0.25kg/month." }],
    relatedCalcs: healthRelated("weight-gain-calculator"),
  },
  {
    slug: "weight-loss-percentage-calculator", name: "Weight Loss Percentage Calculator", category: "Health", categorySlug: "health", subcategory: "Weight Management",
    description: "Calculate what percentage of body weight you've lost.",
    metaDescription: "Free weight loss percentage calculator to track progress.",
    icon: "heart",
    inputs: [
      { id: "startWeight", label: "Starting Weight (kg)", type: "number", defaultValue: 90, step: 0.1 },
      { id: "currentWeight", label: "Current Weight (kg)", type: "number", defaultValue: 82, step: 0.1 },
    ],
    calculate: (v) => {
      const lost = v.startWeight - v.currentWeight;
      const pct = (lost / v.startWeight) * 100;
      return [
        { label: "Weight Loss %", value: `${pct.toFixed(1)}%`, highlight: true },
        { label: "Weight Lost", value: `${lost.toFixed(1)} kg` },
        { label: "Remaining Weight", value: `${v.currentWeight.toFixed(1)} kg` },
      ];
    },
    formula: { expression: "% = (Start − Current) / Start × 100", variables: [] },
    howToUse: "Enter starting and current weight.",
    faqs: [{ question: "What % is significant?", answer: "5-10% weight loss produces significant health benefits for overweight individuals." }],
    relatedCalcs: healthRelated("weight-loss-percentage-calculator"),
  },
  {
    slug: "weight-change-calculator", name: "Weight Change Calculator", category: "Health", categorySlug: "health", subcategory: "Weight Management",
    description: "Calculate weight change over time and track progress toward your goal.",
    metaDescription: "Free weight change calculator to track progress over time.",
    icon: "heart",
    inputs: [
      { id: "startWeight", label: "Start Weight (kg)", type: "number", defaultValue: 85, step: 0.1 },
      { id: "currentWeight", label: "Current Weight (kg)", type: "number", defaultValue: 80, step: 0.1 },
      { id: "weeks", label: "Weeks Elapsed", type: "number", defaultValue: 8 },
    ],
    calculate: (v) => {
      const change = v.currentWeight - v.startWeight;
      const weeklyRate = change / v.weeks;
      return [
        { label: "Total Change", value: `${change > 0 ? "+" : ""}${change.toFixed(1)} kg`, highlight: true },
        { label: "Weekly Rate", value: `${weeklyRate > 0 ? "+" : ""}${weeklyRate.toFixed(2)} kg/wk` },
        { label: "Monthly Rate", value: `${(weeklyRate * 4.33).toFixed(1)} kg/mo` },
      ];
    },
    formula: { expression: "Change = Current − Start", variables: ["Rate = Change / Weeks"] },
    howToUse: "Enter start weight, current weight, and weeks elapsed.",
    faqs: [{ question: "How often should I weigh?", answer: "Weekly under consistent conditions (morning, before eating). Daily fluctuations of 1-2kg are normal." }],
    relatedCalcs: healthRelated("weight-change-calculator"),
  },
  {
    slug: "weekly-weight-loss-calculator", name: "Weekly Weight Loss Calculator", category: "Health", categorySlug: "health", subcategory: "Weight Management",
    description: "Calculate expected weekly weight loss based on your calorie deficit.",
    metaDescription: "Free weekly weight loss calculator from calorie deficit.",
    icon: "heart",
    inputs: [
      { id: "dailyDeficit", label: "Daily Calorie Deficit", type: "number", defaultValue: 500 },
    ],
    calculate: (v) => {
      const weeklyLoss = (v.dailyDeficit * 7) / 7700;
      const monthlyLoss = weeklyLoss * 4.33;
      return [
        { label: "Weekly Weight Loss", value: `${weeklyLoss.toFixed(2)} kg`, highlight: true },
        { label: "Monthly Loss", value: `${monthlyLoss.toFixed(1)} kg` },
        { label: "In Pounds/Week", value: `${(weeklyLoss * 2.205).toFixed(1)} lbs` },
      ];
    },
    formula: { expression: "Weekly Loss = (Deficit × 7) / 7700", variables: ["7700 cal per kg of fat"] },
    howToUse: "Enter your daily calorie deficit.",
    faqs: [{ question: "Is 1000 cal deficit safe?", answer: "For most adults, 500-750 is safer. 1000 may be appropriate under medical supervision." }],
    relatedCalcs: healthRelated("weekly-weight-loss-calculator"),
  },
  {
    slug: "daily-calorie-deficit-calculator", name: "Daily Calorie Deficit Calculator", category: "Health", categorySlug: "health", subcategory: "Weight Management",
    description: "Calculate the daily calorie deficit needed to reach your weight loss goal by a target date.",
    metaDescription: "Free daily calorie deficit calculator for weight loss planning.",
    icon: "heart",
    inputs: [
      { id: "toLose", label: "Weight to Lose (kg)", type: "number", defaultValue: 10, step: 0.1 },
      { id: "weeks", label: "Weeks to Achieve", type: "number", defaultValue: 20 },
    ],
    calculate: (v) => {
      const totalCal = v.toLose * 7700;
      const dailyDeficit = totalCal / (v.weeks * 7);
      return [
        { label: "Daily Deficit Needed", value: `${Math.round(dailyDeficit)} cal`, highlight: true },
        { label: "Weekly Deficit", value: `${Math.round(dailyDeficit * 7)} cal` },
        { label: "Rate", value: `${(v.toLose / v.weeks).toFixed(2)} kg/week` },
        { label: "Safety", value: dailyDeficit > 1000 ? "⚠ Too aggressive" : "✓ Sustainable" },
      ];
    },
    formula: { expression: "Deficit = (Weight × 7700) / (Weeks × 7)", variables: [] },
    howToUse: "Enter weight to lose and timeframe.",
    faqs: [{ question: "What if deficit is too high?", answer: "Extend your timeframe. Deficits over 1000 cal/day risk muscle loss and metabolic slowdown." }],
    relatedCalcs: healthRelated("daily-calorie-deficit-calculator"),
  },
  {
    slug: "daily-calorie-surplus-calculator", name: "Daily Calorie Surplus Calculator", category: "Health", categorySlug: "health", subcategory: "Weight Management",
    description: "Calculate daily calorie surplus needed for weight gain goals.",
    metaDescription: "Free calorie surplus calculator for weight gain planning.",
    icon: "heart",
    inputs: [
      { id: "toGain", label: "Weight to Gain (kg)", type: "number", defaultValue: 5, step: 0.1 },
      { id: "weeks", label: "Weeks to Achieve", type: "number", defaultValue: 20 },
    ],
    calculate: (v) => {
      const dailySurplus = (v.toGain * 7700) / (v.weeks * 7);
      return [
        { label: "Daily Surplus Needed", value: `${Math.round(dailySurplus)} cal`, highlight: true },
        { label: "Weekly Gain", value: `${(v.toGain / v.weeks).toFixed(2)} kg/week` },
        { label: "Type", value: dailySurplus <= 500 ? "Lean Bulk" : "Aggressive Bulk" },
      ];
    },
    formula: { expression: "Surplus = (Weight × 7700) / (Weeks × 7)", variables: ["200-500 cal for lean gains"] },
    howToUse: "Enter weight to gain and timeframe.",
    faqs: [{ question: "How much surplus for muscle?", answer: "200-300 cal surplus minimizes fat gain while supporting muscle growth." }],
    relatedCalcs: healthRelated("daily-calorie-surplus-calculator"),
  },
  {
    slug: "weight-maintenance-calories-calculator", name: "Weight Maintenance Calories Calculator", category: "Health", categorySlug: "health", subcategory: "Weight Management",
    description: "Calculate exact calories needed to maintain your current weight.",
    metaDescription: "Free weight maintenance calorie calculator.",
    icon: "heart",
    inputs: [
      { id: "gender", label: "Gender", type: "select", defaultValue: 0, options: [{ value: 0, label: "Male" }, { value: 1, label: "Female" }] },
      { id: "age", label: "Age", type: "number", defaultValue: 30 },
      { id: "weight", label: "Weight (kg)", type: "number", defaultValue: 70, step: 0.1 },
      { id: "height", label: "Height (cm)", type: "number", defaultValue: 170, step: 0.1 },
      { id: "activity", label: "Activity", type: "select", defaultValue: 1.55, options: [{ value: 1.2, label: "Sedentary" }, { value: 1.375, label: "Light" }, { value: 1.55, label: "Moderate" }, { value: 1.725, label: "Active" }, { value: 1.9, label: "Very Active" }] },
    ],
    calculate: (v) => {
      const bmr = v.gender === 0 ? 10 * v.weight + 6.25 * v.height - 5 * v.age + 5 : 10 * v.weight + 6.25 * v.height - 5 * v.age - 161;
      const tdee = bmr * v.activity;
      return [
        { label: "Maintenance Calories", value: `${Math.round(tdee)} cal/day`, highlight: true },
        { label: "BMR", value: `${Math.round(bmr)} cal/day` },
        { label: "Weekly Total", value: `${Math.round(tdee * 7).toLocaleString()} cal` },
      ];
    },
    formula: { expression: "TDEE = BMR × Activity Factor", variables: ["Mifflin-St Jeor equation"] },
    howToUse: "Enter your details to find maintenance calories.",
    faqs: [{ question: "Why track maintenance?", answer: "Knowing maintenance calories is the foundation for any weight goal — subtract for loss, add for gain." }],
    relatedCalcs: healthRelated("weight-maintenance-calories-calculator"),
  },
  {
    slug: "body-recomposition-calculator", name: "Body Recomposition Calculator", category: "Health", categorySlug: "health", subcategory: "Weight Management",
    description: "Calculate macros and calories for simultaneous fat loss and muscle gain.",
    metaDescription: "Free body recomposition calculator for fat loss and muscle gain.",
    icon: "heart",
    inputs: [
      { id: "weight", label: "Weight (kg)", type: "number", defaultValue: 75, step: 0.1 },
      { id: "bodyFat", label: "Body Fat (%)", type: "number", defaultValue: 20, step: 0.1 },
      { id: "tdee", label: "TDEE (cal)", type: "number", defaultValue: 2400 },
    ],
    calculate: (v) => {
      const lbm = v.weight * (1 - v.bodyFat / 100);
      const protein = lbm * 2.2;
      const trainingCal = v.tdee + 200;
      const restCal = v.tdee - 300;
      return [
        { label: "Training Day Calories", value: `${Math.round(trainingCal)} cal`, highlight: true },
        { label: "Rest Day Calories", value: `${Math.round(restCal)} cal` },
        { label: "Daily Protein", value: `${Math.round(protein)}g` },
        { label: "Lean Body Mass", value: `${lbm.toFixed(1)} kg` },
      ];
    },
    formula: { expression: "Train: TDEE+200, Rest: TDEE-300", variables: ["Protein: 2.2g per kg lean mass"] },
    howToUse: "Enter weight, body fat %, and TDEE.",
    faqs: [{ question: "Can I lose fat and gain muscle?", answer: "Yes, especially for beginners and those returning to training. High protein and progressive overload are key." }],
    relatedCalcs: healthRelated("body-recomposition-calculator"),
  },

  // ═══════════════════════════════════════════
  // FITNESS TRAINING CALCULATORS
  // ═══════════════════════════════════════════
  {
    slug: "workout-calorie-burn-calculator", name: "Workout Calorie Burn Calculator", category: "Health", categorySlug: "health", subcategory: "Fitness Training",
    description: "Estimate calories burned during specific workouts using MET values.",
    metaDescription: "Free workout calorie burn calculator for various exercises.",
    icon: "heart",
    inputs: [
      { id: "weight", label: "Weight (kg)", type: "number", defaultValue: 70, step: 0.1 },
      { id: "activity", label: "Activity", type: "select", defaultValue: 7, options: [{ value: 3.5, label: "Walking" }, { value: 7, label: "Running (moderate)" }, { value: 10, label: "Running (fast)" }, { value: 6, label: "Cycling" }, { value: 8, label: "Swimming" }, { value: 5, label: "Weight Training" }, { value: 8.5, label: "HIIT" }, { value: 4, label: "Yoga" }] },
      { id: "duration", label: "Duration (min)", type: "number", defaultValue: 45 },
    ],
    calculate: (v) => {
      const cal = (v.activity * v.weight * 3.5 / 200) * v.duration;
      return [
        { label: "Calories Burned", value: `${Math.round(cal)} cal`, highlight: true },
        { label: "Per Hour", value: `${Math.round(cal * 60 / v.duration)} cal/hr` },
        { label: "MET Value", value: `${v.activity}` },
      ];
    },
    formula: { expression: "Cal = MET × Weight × 3.5 / 200 × Minutes", variables: ["MET = metabolic equivalent"] },
    howToUse: "Select activity, enter weight and duration.",
    faqs: [{ question: "Are these estimates accurate?", answer: "MET calculations are estimates. Actual burn varies based on intensity, fitness level, and body composition." }],
    relatedCalcs: healthRelated("workout-calorie-burn-calculator"),
  },
  {
    slug: "vo2-max-calculator", name: "VO2 Max Calculator", category: "Health", categorySlug: "health", subcategory: "Fitness Training",
    description: "Estimate your VO2 max (maximal oxygen uptake) from running performance.",
    metaDescription: "Free VO2 max calculator from running performance data.",
    icon: "heart",
    inputs: [
      { id: "distance", label: "Distance Run (km)", type: "number", defaultValue: 2.4, step: 0.1 },
      { id: "minutes", label: "Time (minutes)", type: "number", defaultValue: 12 },
    ],
    calculate: (v) => {
      // Cooper test formula
      const vo2 = (v.distance * 1000 - 504.9) / 44.73;
      let fitness = "Poor";
      if (vo2 > 55) fitness = "Superior";
      else if (vo2 > 45) fitness = "Excellent";
      else if (vo2 > 38) fitness = "Good";
      else if (vo2 > 30) fitness = "Average";
      return [
        { label: "VO2 Max", value: `${vo2.toFixed(1)} mL/kg/min`, highlight: true },
        { label: "Fitness Level", value: fitness },
      ];
    },
    formula: { expression: "VO2max = (Distance_m − 504.9) / 44.73", variables: ["Cooper 12-minute run test"] },
    howToUse: "Run as far as you can in 12 minutes and enter the distance.",
    faqs: [{ question: "What is VO2 max?", answer: "VO2 max is the maximum rate of oxygen consumption during exercise — the gold standard of cardiovascular fitness." }],
    relatedCalcs: healthRelated("vo2-max-calculator"),
  },
  {
    slug: "running-speed-calculator", name: "Running Speed Calculator", category: "Health", categorySlug: "health", subcategory: "Fitness Training",
    description: "Calculate running speed from distance and time, with pace conversions.",
    metaDescription: "Free running speed calculator with pace conversions.",
    icon: "heart",
    inputs: [
      { id: "distance", label: "Distance (km)", type: "number", defaultValue: 5, step: 0.1 },
      { id: "minutes", label: "Minutes", type: "number", defaultValue: 25 },
      { id: "seconds", label: "Seconds", type: "number", defaultValue: 0 },
    ],
    calculate: (v) => {
      const totalMin = v.minutes + v.seconds / 60;
      const speedKmh = v.distance / (totalMin / 60);
      const pacePerKm = totalMin / v.distance;
      const paceMins = Math.floor(pacePerKm);
      const paceSecs = Math.round((pacePerKm - paceMins) * 60);
      return [
        { label: "Speed", value: `${speedKmh.toFixed(1)} km/h`, highlight: true },
        { label: "Pace", value: `${paceMins}:${String(paceSecs).padStart(2, "0")} /km` },
        { label: "Speed (mph)", value: `${(speedKmh / 1.60934).toFixed(1)} mph` },
      ];
    },
    formula: { expression: "Speed = Distance / Time", variables: ["Pace = Time / Distance"] },
    howToUse: "Enter distance and time.",
    faqs: [{ question: "What's a good 5K time?", answer: "Beginner: 30-40 min. Intermediate: 20-25 min. Advanced: under 20 min." }],
    relatedCalcs: healthRelated("running-speed-calculator"),
  },
  {
    slug: "running-distance-calculator", name: "Running Distance Calculator", category: "Health", categorySlug: "health", subcategory: "Fitness Training",
    description: "Calculate distance covered based on speed/pace and time.",
    metaDescription: "Free running distance calculator from pace and time.",
    icon: "heart",
    inputs: [
      { id: "paceMin", label: "Pace (min per km)", type: "number", defaultValue: 5, step: 0.1 },
      { id: "duration", label: "Duration (minutes)", type: "number", defaultValue: 30 },
    ],
    calculate: (v) => {
      const distance = v.duration / v.paceMin;
      return [
        { label: "Distance", value: `${distance.toFixed(2)} km`, highlight: true },
        { label: "In Miles", value: `${(distance / 1.60934).toFixed(2)} mi` },
        { label: "Speed", value: `${(60 / v.paceMin).toFixed(1)} km/h` },
      ];
    },
    formula: { expression: "Distance = Duration / Pace", variables: [] },
    howToUse: "Enter your pace and run duration.",
    faqs: [{ question: "How to improve distance?", answer: "Gradually increase weekly mileage by 10% max. Include long slow runs." }],
    relatedCalcs: healthRelated("running-distance-calculator"),
  },
  {
    slug: "cycling-power-calculator", name: "Cycling Power Calculator", category: "Health", categorySlug: "health", subcategory: "Fitness Training",
    description: "Estimate cycling power output (watts) from speed, weight, and gradient.",
    metaDescription: "Free cycling power calculator from speed and conditions.",
    icon: "heart",
    inputs: [
      { id: "weight", label: "Rider + Bike Weight (kg)", type: "number", defaultValue: 80, step: 0.1 },
      { id: "speed", label: "Speed (km/h)", type: "number", defaultValue: 25, step: 0.1 },
      { id: "gradient", label: "Gradient (%)", type: "number", defaultValue: 0, step: 0.1 },
    ],
    calculate: (v) => {
      const speedMs = v.speed / 3.6;
      const gravityForce = v.weight * 9.81 * (v.gradient / 100);
      const rollingResistance = v.weight * 9.81 * 0.005;
      const aeroResistance = 0.5 * 1.225 * 0.4 * 0.5 * speedMs * speedMs;
      const power = (gravityForce + rollingResistance + aeroResistance) * speedMs;
      const wPerKg = power / v.weight;
      return [
        { label: "Power Output", value: `${Math.round(Math.max(power, 0))} W`, highlight: true },
        { label: "Watts/kg", value: `${Math.max(wPerKg, 0).toFixed(1)} W/kg` },
        { label: "FTP Estimate", value: `${Math.round(Math.max(power, 0) * 0.95)} W` },
      ];
    },
    formula: { expression: "Power = (Gravity + Rolling + Aero) × Speed", variables: ["Simplified model"] },
    howToUse: "Enter combined weight, speed, and gradient.",
    faqs: [{ question: "What is FTP?", answer: "Functional Threshold Power — the max power you can sustain for 1 hour. Key metric for cycling training." }],
    relatedCalcs: healthRelated("cycling-power-calculator"),
  },
  {
    slug: "swimming-pace-calculator", name: "Swimming Pace Calculator", category: "Health", categorySlug: "health", subcategory: "Fitness Training",
    description: "Calculate swimming pace per 100m and estimate times for various distances.",
    metaDescription: "Free swimming pace calculator with distance projections.",
    icon: "heart",
    inputs: [
      { id: "distance", label: "Distance (meters)", type: "number", defaultValue: 400 },
      { id: "minutes", label: "Minutes", type: "number", defaultValue: 8 },
      { id: "seconds", label: "Seconds", type: "number", defaultValue: 0 },
    ],
    calculate: (v) => {
      const totalSec = v.minutes * 60 + v.seconds;
      const per100 = totalSec / (v.distance / 100);
      const paceMins = Math.floor(per100 / 60);
      const paceSecs = Math.round(per100 % 60);
      return [
        { label: "Pace per 100m", value: `${paceMins}:${String(paceSecs).padStart(2, "0")}`, highlight: true },
        { label: "500m Time", value: `${Math.floor(per100 * 5 / 60)}:${String(Math.round(per100 * 5 % 60)).padStart(2, "0")}` },
        { label: "1500m Time", value: `${Math.floor(per100 * 15 / 60)}:${String(Math.round(per100 * 15 % 60)).padStart(2, "0")}` },
      ];
    },
    formula: { expression: "Pace/100m = Total Time / (Distance/100)", variables: [] },
    howToUse: "Enter swim distance and time.",
    faqs: [{ question: "What's a good 100m pace?", answer: "Beginner: 2:30+, Intermediate: 1:45-2:00, Advanced: under 1:30." }],
    relatedCalcs: healthRelated("swimming-pace-calculator"),
  },
  {
    slug: "training-zone-calculator", name: "Training Zone Calculator", category: "Health", categorySlug: "health", subcategory: "Fitness Training",
    description: "Calculate your 5 training heart rate zones for optimized workouts.",
    metaDescription: "Free training zone calculator for heart rate based training.",
    icon: "heart",
    inputs: [
      { id: "age", label: "Age", type: "number", defaultValue: 30 },
      { id: "restingHR", label: "Resting HR (bpm)", type: "number", defaultValue: 60 },
    ],
    calculate: (v) => {
      const maxHR = 220 - v.age;
      const hrr = maxHR - v.restingHR;
      const zone = (low: number, high: number) => `${Math.round(hrr * low + v.restingHR)}-${Math.round(hrr * high + v.restingHR)} bpm`;
      return [
        { label: "Zone 1 (Recovery)", value: zone(0.5, 0.6), highlight: false },
        { label: "Zone 2 (Endurance)", value: zone(0.6, 0.7), highlight: true },
        { label: "Zone 3 (Tempo)", value: zone(0.7, 0.8) },
        { label: "Zone 4 (Threshold)", value: zone(0.8, 0.9) },
        { label: "Zone 5 (VO2 Max)", value: zone(0.9, 1.0) },
      ];
    },
    formula: { expression: "Zone = HRR × %Intensity + Resting HR", variables: ["Karvonen method", "5 training zones"] },
    howToUse: "Enter age and resting heart rate.",
    faqs: [{ question: "Which zone for fat loss?", answer: "Zone 2-3 burns the most total calories in sustainable sessions. Zone 5 has highest afterburn effect." }],
    relatedCalcs: healthRelated("training-zone-calculator"),
  },
  {
    slug: "workout-intensity-calculator", name: "Workout Intensity Calculator", category: "Health", categorySlug: "health", subcategory: "Fitness Training",
    description: "Determine your workout intensity level from heart rate during exercise.",
    metaDescription: "Free workout intensity calculator from exercise heart rate.",
    icon: "heart",
    inputs: [
      { id: "age", label: "Age", type: "number", defaultValue: 30 },
      { id: "exerciseHR", label: "Exercise Heart Rate (bpm)", type: "number", defaultValue: 150 },
      { id: "restingHR", label: "Resting HR (bpm)", type: "number", defaultValue: 60 },
    ],
    calculate: (v) => {
      const maxHR = 220 - v.age;
      const hrr = maxHR - v.restingHR;
      const intensity = ((v.exerciseHR - v.restingHR) / hrr) * 100;
      let zone = "Recovery";
      if (intensity > 90) zone = "VO2 Max";
      else if (intensity > 80) zone = "Threshold";
      else if (intensity > 70) zone = "Tempo";
      else if (intensity > 60) zone = "Endurance";
      return [
        { label: "Intensity", value: `${intensity.toFixed(0)}%`, highlight: true },
        { label: "Training Zone", value: zone },
        { label: "Max HR", value: `${maxHR} bpm` },
      ];
    },
    formula: { expression: "Intensity% = (Exercise HR − Rest HR) / (Max HR − Rest HR) × 100", variables: [] },
    howToUse: "Enter age, exercise heart rate, and resting heart rate.",
    faqs: [{ question: "What intensity is best?", answer: "It depends on your goal. 60-70% for fat burning, 70-80% for cardio fitness, 80-90% for performance." }],
    relatedCalcs: healthRelated("workout-intensity-calculator"),
  },
  {
    slug: "strength-level-calculator", name: "Strength Level Calculator", category: "Health", categorySlug: "health", subcategory: "Fitness Training",
    description: "Assess your strength level compared to bodyweight standards for major lifts.",
    metaDescription: "Free strength level calculator for bench, squat, and deadlift.",
    icon: "heart",
    inputs: [
      { id: "bodyweight", label: "Body Weight (kg)", type: "number", defaultValue: 80, step: 0.1 },
      { id: "lift", label: "Lift", type: "select", defaultValue: 1, options: [{ value: 1, label: "Bench Press" }, { value: 1.25, label: "Squat" }, { value: 1.5, label: "Deadlift" }] },
      { id: "weight", label: "Weight Lifted (kg)", type: "number", defaultValue: 100 },
    ],
    calculate: (v) => {
      const ratio = v.weight / v.bodyweight;
      const standards = { beginner: 0.5 * v.lift, intermediate: 1.0 * v.lift, advanced: 1.5 * v.lift, elite: 2.0 * v.lift };
      let level = "Beginner";
      if (ratio >= standards.elite) level = "Elite";
      else if (ratio >= standards.advanced) level = "Advanced";
      else if (ratio >= standards.intermediate) level = "Intermediate";
      return [
        { label: "Strength Ratio", value: `${ratio.toFixed(2)}× BW`, highlight: true },
        { label: "Level", value: level },
        { label: "Next Level Target", value: level === "Elite" ? "You're elite!" : `${Math.round(v.bodyweight * (ratio < standards.intermediate ? standards.intermediate : ratio < standards.advanced ? standards.advanced : standards.elite))} kg` },
      ];
    },
    formula: { expression: "Ratio = Weight Lifted / Body Weight", variables: ["Standards vary by lift type"] },
    howToUse: "Enter body weight, select a lift, and enter the weight lifted.",
    faqs: [{ question: "What are good strength standards?", answer: "Intermediate: ~1× BW bench, 1.25× squat, 1.5× deadlift. These are rough guidelines." }],
    relatedCalcs: healthRelated("strength-level-calculator"),
  },
  {
    slug: "muscle-gain-calculator", name: "Muscle Gain Calculator", category: "Health", categorySlug: "health", subcategory: "Fitness Training",
    description: "Estimate potential muscle gain based on training experience and genetics.",
    metaDescription: "Free muscle gain potential calculator based on training experience.",
    icon: "heart",
    inputs: [
      { id: "gender", label: "Gender", type: "select", defaultValue: 0, options: [{ value: 0, label: "Male" }, { value: 1, label: "Female" }] },
      { id: "yearsTraining", label: "Years of Training", type: "number", defaultValue: 0, min: 0 },
    ],
    calculate: (v) => {
      const base = v.gender === 0 ? 10 : 5;
      const yearlyGain = v.yearsTraining === 0 ? base : base / (v.yearsTraining + 1);
      const monthlyGain = yearlyGain / 12;
      return [
        { label: "Potential Yearly Gain", value: `${yearlyGain.toFixed(1)} kg`, highlight: true },
        { label: "Monthly Gain", value: `${monthlyGain.toFixed(2)} kg` },
        { label: "Training Level", value: v.yearsTraining === 0 ? "Beginner" : v.yearsTraining < 3 ? "Intermediate" : "Advanced" },
      ];
    },
    formula: { expression: "Based on McDonald/Lyle model", variables: ["Beginner males: ~10kg/yr", "Rate decreases with experience"] },
    howToUse: "Enter gender and years of resistance training.",
    faqs: [{ question: "Why does gain slow down?", answer: "Muscle growth follows diminishing returns. Beginners gain fastest, then rate decreases each year." }],
    relatedCalcs: healthRelated("muscle-gain-calculator"),
  },

  // ═══════════════════════════════════════════
  // HEART & CARDIOVASCULAR CALCULATORS
  // ═══════════════════════════════════════════
  {
    slug: "maximum-heart-rate-calculator", name: "Maximum Heart Rate Calculator", category: "Health", categorySlug: "health", subcategory: "Heart & Cardiovascular",
    description: "Calculate your maximum heart rate using multiple established formulas.",
    metaDescription: "Free maximum heart rate calculator using multiple formulas.",
    icon: "heart",
    inputs: [
      { id: "age", label: "Age", type: "number", defaultValue: 30 },
    ],
    calculate: (v) => {
      const formula220 = 220 - v.age;
      const tanaka = 208 - 0.7 * v.age;
      const gulati = 206 - 0.88 * v.age;
      return [
        { label: "Standard (220−age)", value: `${formula220} bpm`, highlight: true },
        { label: "Tanaka Formula", value: `${Math.round(tanaka)} bpm` },
        { label: "Gulati (women)", value: `${Math.round(gulati)} bpm` },
        { label: "Average", value: `${Math.round((formula220 + tanaka) / 2)} bpm` },
      ];
    },
    formula: { expression: "Standard: 220−Age; Tanaka: 208−0.7×Age", variables: ["Individual variation: ±12 bpm"] },
    howToUse: "Enter your age.",
    faqs: [{ question: "How accurate is 220−age?", answer: "It's a rough estimate with ±12 bpm variation. Tanaka (208−0.7×age) is more accurate for older adults." }],
    relatedCalcs: healthRelated("maximum-heart-rate-calculator"),
  },
  {
    slug: "heart-rate-zone-calculator", name: "Heart Rate Zone Calculator", category: "Health", categorySlug: "health", subcategory: "Heart & Cardiovascular",
    description: "Calculate heart rate zones for optimal training using the Karvonen method.",
    metaDescription: "Free heart rate zone calculator for training optimization.",
    icon: "heart",
    inputs: [
      { id: "age", label: "Age", type: "number", defaultValue: 30 },
      { id: "restingHR", label: "Resting HR", type: "number", defaultValue: 60 },
    ],
    calculate: (v) => {
      const maxHR = 220 - v.age;
      const hrr = maxHR - v.restingHR;
      const z = (pct: number) => Math.round(hrr * pct + v.restingHR);
      return [
        { label: "Max Heart Rate", value: `${maxHR} bpm`, highlight: true },
        { label: "Zone 1 (50-60%)", value: `${z(0.5)}-${z(0.6)} bpm` },
        { label: "Zone 2 (60-70%)", value: `${z(0.6)}-${z(0.7)} bpm` },
        { label: "Zone 3 (70-80%)", value: `${z(0.7)}-${z(0.8)} bpm` },
        { label: "Zone 4 (80-90%)", value: `${z(0.8)}-${z(0.9)} bpm` },
      ];
    },
    formula: { expression: "Zone = HRR × % + Resting HR", variables: ["Karvonen method"] },
    howToUse: "Enter age and resting heart rate.",
    faqs: [{ question: "Which zone burns most fat?", answer: "Zone 2 (60-70%) uses the highest percentage of fat. Higher zones burn more total calories." }],
    relatedCalcs: healthRelated("heart-rate-zone-calculator"),
  },
  {
    slug: "resting-heart-rate-calculator", name: "Resting Heart Rate Calculator", category: "Health", categorySlug: "health", subcategory: "Heart & Cardiovascular",
    description: "Assess your cardiovascular fitness from resting heart rate.",
    metaDescription: "Free resting heart rate calculator. Enter your age, gender, and resting heart rate (bpm) to assess your cardiovascular fitness against normal ranges.",
    icon: "heart",
    inputs: [
      { id: "age", label: "Age", type: "number", defaultValue: 30 },
      { id: "gender", label: "Gender", type: "select", defaultValue: 0, options: [{ value: 0, label: "Male" }, { value: 1, label: "Female" }] },
      { id: "rhr", label: "Resting Heart Rate (bpm)", type: "number", defaultValue: 65 },
    ],
    calculate: (v) => {
      let fitness = "Average";
      const thresholds = v.gender === 0 ? [50, 60, 70, 80] : [54, 64, 74, 84];
      if (v.rhr < thresholds[0]) fitness = "Athlete";
      else if (v.rhr < thresholds[1]) fitness = "Excellent";
      else if (v.rhr < thresholds[2]) fitness = "Good";
      else if (v.rhr < thresholds[3]) fitness = "Average";
      else fitness = "Below Average";
      return [
        { label: "Resting HR", value: `${v.rhr} bpm`, highlight: true },
        { label: "Fitness Level", value: fitness },
        { label: "Normal Range", value: "60-100 bpm" },
      ];
    },
    formula: { expression: "Based on age/sex-adjusted fitness norms", variables: ["Lower RHR = better cardiovascular fitness"] },
    howToUse: "Measure pulse first thing in the morning for 60 seconds.",
    faqs: [{ question: "Can I lower my RHR?", answer: "Yes, regular aerobic exercise can lower RHR by 5-20 bpm over months." }],
    relatedCalcs: healthRelated("resting-heart-rate-calculator"),
  },
  {
    slug: "heart-rate-recovery-calculator", name: "Heart Rate Recovery Calculator", category: "Health", categorySlug: "health", subcategory: "Heart & Cardiovascular",
    description: "Assess cardiovascular health by measuring heart rate recovery after exercise.",
    metaDescription: "Free heart rate recovery calculator for cardiovascular assessment.",
    icon: "heart",
    inputs: [
      { id: "peakHR", label: "Peak Exercise HR (bpm)", type: "number", defaultValue: 170 },
      { id: "hr1min", label: "HR After 1 Minute (bpm)", type: "number", defaultValue: 140 },
      { id: "hr2min", label: "HR After 2 Minutes (bpm)", type: "number", defaultValue: 120 },
    ],
    calculate: (v) => {
      const recovery1 = v.peakHR - v.hr1min;
      const recovery2 = v.peakHR - v.hr2min;
      let assessment = "Normal";
      if (recovery1 < 12) assessment = "Abnormal (consult doctor)";
      else if (recovery1 > 25) assessment = "Excellent";
      else if (recovery1 > 18) assessment = "Good";
      return [
        { label: "1-Min Recovery", value: `${recovery1} bpm drop`, highlight: true },
        { label: "2-Min Recovery", value: `${recovery2} bpm drop` },
        { label: "Assessment", value: assessment },
      ];
    },
    formula: { expression: "Recovery = Peak HR − HR at interval", variables: ["<12 bpm in 1 min = abnormal"] },
    howToUse: "Record peak HR, then HR at 1 and 2 minutes after stopping.",
    faqs: [{ question: "What is normal recovery?", answer: "A drop of >12 bpm in the first minute is normal. <12 may indicate cardiac risk." }],
    relatedCalcs: healthRelated("heart-rate-recovery-calculator"),
  },
  {
    slug: "cardiac-output-calculator", name: "Cardiac Output Calculator", category: "Health", categorySlug: "health", subcategory: "Heart & Cardiovascular",
    description: "Calculate cardiac output from heart rate and stroke volume.",
    metaDescription: "Free cardiac output calculator for cardiovascular assessment.",
    icon: "heart",
    inputs: [
      { id: "heartRate", label: "Heart Rate (bpm)", type: "number", defaultValue: 70 },
      { id: "strokeVolume", label: "Stroke Volume (mL)", type: "number", defaultValue: 70 },
    ],
    calculate: (v) => {
      const co = (v.heartRate * v.strokeVolume) / 1000;
      return [
        { label: "Cardiac Output", value: `${co.toFixed(1)} L/min`, highlight: true },
        { label: "Normal Range", value: "4.0-8.0 L/min" },
        { label: "Status", value: co >= 4 && co <= 8 ? "Normal ✓" : "Outside normal range" },
      ];
    },
    formula: { expression: "CO = Heart Rate × Stroke Volume / 1000", variables: ["Normal: 4-8 L/min at rest"] },
    howToUse: "Enter heart rate and stroke volume.",
    faqs: [{ question: "What increases cardiac output?", answer: "Exercise can increase CO to 20-40 L/min in trained athletes through higher HR and stroke volume." }],
    relatedCalcs: healthRelated("cardiac-output-calculator"),
  },
  {
    slug: "blood-pressure-map-calculator", name: "Blood Pressure Mean Arterial Pressure Calculator", category: "Health", categorySlug: "health", subcategory: "Heart & Cardiovascular",
    description: "Calculate Mean Arterial Pressure from systolic and diastolic blood pressure.",
    metaDescription: "Free MAP calculator from blood pressure readings.",
    icon: "heart",
    inputs: [
      { id: "systolic", label: "Systolic (mmHg)", type: "number", defaultValue: 120 },
      { id: "diastolic", label: "Diastolic (mmHg)", type: "number", defaultValue: 80 },
    ],
    calculate: (v) => {
      const map = v.diastolic + (v.systolic - v.diastolic) / 3;
      const pp = v.systolic - v.diastolic;
      let category = "Normal";
      if (v.systolic >= 140 || v.diastolic >= 90) category = "Hypertension Stage 2";
      else if (v.systolic >= 130 || v.diastolic >= 80) category = "Hypertension Stage 1";
      else if (v.systolic >= 120) category = "Elevated";
      return [
        { label: "MAP", value: `${map.toFixed(0)} mmHg`, highlight: true },
        { label: "Pulse Pressure", value: `${pp} mmHg` },
        { label: "BP Category", value: category },
        { label: "MAP Normal Range", value: "70-100 mmHg" },
      ];
    },
    formula: { expression: "MAP = DBP + (SBP − DBP) / 3", variables: ["Normal MAP: 70-100 mmHg"] },
    howToUse: "Enter systolic and diastolic blood pressure.",
    faqs: [{ question: "Why is MAP important?", answer: "MAP represents the average pressure in arteries during one cardiac cycle. Below 60 means organs may not get enough blood." }],
    relatedCalcs: healthRelated("blood-pressure-map-calculator"),
  },

  // ═══════════════════════════════════════════
  // PREGNANCY & WOMEN'S HEALTH CALCULATORS
  // ═══════════════════════════════════════════
  {
    slug: "fertility-window-calculator", name: "Fertility Window Calculator", category: "Health", categorySlug: "health", subcategory: "Pregnancy & Women's Health",
    description: "Calculate your most fertile days for conception based on your menstrual cycle.",
    metaDescription: "Free fertility window calculator to identify your most fertile days.",
    icon: "heart",
    inputs: [
      { id: "lmpMonth", label: "Last Period Month (1-12)", type: "number", defaultValue: 1, min: 1, max: 12 },
      { id: "lmpDay", label: "Last Period Day", type: "number", defaultValue: 1, min: 1, max: 31 },
      { id: "lmpYear", label: "Year", type: "number", defaultValue: 2026 },
      { id: "cycleLength", label: "Cycle Length (days)", type: "number", defaultValue: 28, min: 21, max: 45 },
    ],
    calculate: (v) => {
      const lmp = new Date(v.lmpYear, v.lmpMonth - 1, v.lmpDay);
      const ovulation = new Date(lmp); ovulation.setDate(ovulation.getDate() + v.cycleLength - 14);
      const start = new Date(ovulation); start.setDate(start.getDate() - 5);
      const end = new Date(ovulation); end.setDate(end.getDate() + 1);
      const fmt = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      return [
        { label: "Fertile Window", value: `${fmt(start)} – ${fmt(end)}`, highlight: true },
        { label: "Ovulation Day", value: fmt(ovulation) },
        { label: "Most Fertile Days", value: `${fmt(new Date(ovulation.getTime() - 2 * 86400000))} – ${fmt(ovulation)}` },
      ];
    },
    formula: { expression: "Ovulation ≈ LMP + Cycle − 14 days", variables: ["Fertile window: 5 days before to 1 day after ovulation"] },
    howToUse: "Enter last period date and cycle length.",
    faqs: [{ question: "How long is the fertile window?", answer: "Sperm survive up to 5 days, and the egg lives 12-24 hours, creating a ~6-day fertile window." }],
    relatedCalcs: healthRelated("fertility-window-calculator"),
  },
  {
    slug: "implantation-calculator", name: "Implantation Calculator", category: "Health", categorySlug: "health", subcategory: "Pregnancy & Women's Health",
    description: "Estimate when implantation may occur after ovulation.",
    metaDescription: "Free implantation calculator based on ovulation date.",
    icon: "heart",
    inputs: [
      { id: "ovMonth", label: "Ovulation Month (1-12)", type: "number", defaultValue: 1, min: 1, max: 12 },
      { id: "ovDay", label: "Ovulation Day", type: "number", defaultValue: 15, min: 1, max: 31 },
      { id: "ovYear", label: "Year", type: "number", defaultValue: 2026 },
    ],
    calculate: (v) => {
      const ov = new Date(v.ovYear, v.ovMonth - 1, v.ovDay);
      const early = new Date(ov); early.setDate(early.getDate() + 6);
      const late = new Date(ov); late.setDate(late.getDate() + 12);
      const typical = new Date(ov); typical.setDate(typical.getDate() + 9);
      const testDate = new Date(ov); testDate.setDate(testDate.getDate() + 14);
      const fmt = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      return [
        { label: "Typical Implantation", value: fmt(typical), highlight: true },
        { label: "Implantation Range", value: `${fmt(early)} – ${fmt(late)}` },
        { label: "Earliest Test Date", value: fmt(testDate) },
      ];
    },
    formula: { expression: "Implantation: 6-12 days post ovulation", variables: ["Most common: 8-10 days post ovulation"] },
    howToUse: "Enter estimated ovulation date.",
    faqs: [{ question: "What is implantation?", answer: "When the fertilized egg attaches to the uterine lining, typically 6-12 days after ovulation." }],
    relatedCalcs: healthRelated("implantation-calculator"),
  },
  {
    slug: "pregnancy-week-calculator", name: "Pregnancy Week Calculator", category: "Health", categorySlug: "health", subcategory: "Pregnancy & Women's Health",
    description: "Find out exactly how many weeks pregnant you are from your LMP.",
    metaDescription: "Free pregnancy week calculator from last menstrual period.",
    icon: "heart",
    inputs: [
      { id: "lmpMonth", label: "LMP Month (1-12)", type: "number", defaultValue: 1, min: 1, max: 12 },
      { id: "lmpDay", label: "LMP Day", type: "number", defaultValue: 1, min: 1, max: 31 },
      { id: "lmpYear", label: "Year", type: "number", defaultValue: 2026 },
    ],
    calculate: (v) => {
      const lmp = new Date(v.lmpYear, v.lmpMonth - 1, v.lmpDay);
      const now = new Date();
      const diffDays = Math.floor((now.getTime() - lmp.getTime()) / 86400000);
      const weeks = Math.floor(diffDays / 7);
      const days = diffDays % 7;
      const due = new Date(lmp); due.setDate(due.getDate() + 280);
      const trimester = weeks < 13 ? "1st" : weeks < 27 ? "2nd" : "3rd";
      return [
        { label: "Current Week", value: `${weeks} weeks, ${days} days`, highlight: true },
        { label: "Trimester", value: trimester },
        { label: "Due Date", value: due.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) },
        { label: "Days Remaining", value: `${Math.max(0, 280 - diffDays)} days` },
      ];
    },
    formula: { expression: "Weeks = Days since LMP / 7", variables: ["Full term = 40 weeks"] },
    howToUse: "Enter your last menstrual period date.",
    faqs: [{ question: "When do weeks start?", answer: "Pregnancy weeks count from LMP, so you're technically 'pregnant' 2 weeks before conception." }],
    relatedCalcs: healthRelated("pregnancy-week-calculator"),
  },
  {
    slug: "pregnancy-trimester-calculator", name: "Pregnancy Trimester Calculator", category: "Health", categorySlug: "health", subcategory: "Pregnancy & Women's Health",
    description: "Determine which trimester you're in and when each trimester starts and ends.",
    metaDescription: "Free pregnancy trimester calculator with milestone dates.",
    icon: "heart",
    inputs: [
      { id: "lmpMonth", label: "LMP Month (1-12)", type: "number", defaultValue: 1, min: 1, max: 12 },
      { id: "lmpDay", label: "LMP Day", type: "number", defaultValue: 1, min: 1, max: 31 },
      { id: "lmpYear", label: "Year", type: "number", defaultValue: 2026 },
    ],
    calculate: (v) => {
      const lmp = new Date(v.lmpYear, v.lmpMonth - 1, v.lmpDay);
      const t1End = new Date(lmp); t1End.setDate(t1End.getDate() + 12 * 7);
      const t2End = new Date(lmp); t2End.setDate(t2End.getDate() + 27 * 7);
      const due = new Date(lmp); due.setDate(due.getDate() + 280);
      const fmt = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      const now = new Date();
      const weeks = Math.floor((now.getTime() - lmp.getTime()) / 86400000 / 7);
      return [
        { label: "Current Trimester", value: weeks < 13 ? "1st Trimester" : weeks < 27 ? "2nd Trimester" : "3rd Trimester", highlight: true },
        { label: "1st Trimester", value: `Until ${fmt(t1End)}` },
        { label: "2nd Trimester", value: `Until ${fmt(t2End)}` },
        { label: "Due Date", value: fmt(due) },
      ];
    },
    formula: { expression: "1st: weeks 1-12, 2nd: 13-26, 3rd: 27-40", variables: [] },
    howToUse: "Enter your LMP date.",
    faqs: [{ question: "What happens each trimester?", answer: "1st: major organ development. 2nd: growth and movement. 3rd: weight gain and preparation for birth." }],
    relatedCalcs: healthRelated("pregnancy-trimester-calculator"),
  },
  {
    slug: "pregnancy-bmi-calculator", name: "Pregnancy BMI Calculator", category: "Health", categorySlug: "health", subcategory: "Pregnancy & Women's Health",
    description: "Calculate BMI during pregnancy and recommended weight gain ranges.",
    metaDescription: "Free pregnancy BMI calculator with weight gain guidelines.",
    icon: "heart",
    inputs: [
      { id: "preWeight", label: "Pre-Pregnancy Weight (kg)", type: "number", defaultValue: 65, step: 0.1 },
      { id: "height", label: "Height (cm)", type: "number", defaultValue: 165, step: 0.1 },
      { id: "currentWeight", label: "Current Weight (kg)", type: "number", defaultValue: 72, step: 0.1 },
    ],
    calculate: (v) => {
      const preBmi = v.preWeight / Math.pow(v.height / 100, 2);
      const currentBmi = v.currentWeight / Math.pow(v.height / 100, 2);
      const gained = v.currentWeight - v.preWeight;
      let recMin: number, recMax: number;
      if (preBmi < 18.5) { recMin = 12.5; recMax = 18; }
      else if (preBmi < 25) { recMin = 11.5; recMax = 16; }
      else if (preBmi < 30) { recMin = 7; recMax = 11.5; }
      else { recMin = 5; recMax = 9; }
      return [
        { label: "Pre-Pregnancy BMI", value: preBmi.toFixed(1), highlight: true },
        { label: "Weight Gained", value: `${gained.toFixed(1)} kg` },
        { label: "Recommended Total Gain", value: `${recMin}-${recMax} kg` },
        { label: "Status", value: gained <= recMax ? "On Track ✓" : "Above recommended" },
      ];
    },
    formula: { expression: "BMI = Weight / Height²", variables: ["IOM guidelines by pre-pregnancy BMI"] },
    howToUse: "Enter pre-pregnancy weight, height, and current weight.",
    faqs: [{ question: "Does BMI matter during pregnancy?", answer: "Pre-pregnancy BMI determines recommended weight gain. Excessive gain increases complications." }],
    relatedCalcs: healthRelated("pregnancy-bmi-calculator"),
  },
  {
    slug: "baby-growth-percentile-calculator", name: "Baby Growth Percentile Calculator", category: "Health", categorySlug: "health", subcategory: "Pregnancy & Women's Health",
    description: "Estimate your baby's growth percentile based on weight and age.",
    metaDescription: "Free baby growth percentile calculator for weight tracking.",
    icon: "heart",
    inputs: [
      { id: "gender", label: "Gender", type: "select", defaultValue: 0, options: [{ value: 0, label: "Boy" }, { value: 1, label: "Girl" }] },
      { id: "ageMonths", label: "Age (months)", type: "number", defaultValue: 6, min: 0, max: 36 },
      { id: "weight", label: "Weight (kg)", type: "number", defaultValue: 7.5, step: 0.1 },
    ],
    calculate: (v) => {
      // Simplified WHO percentile approximation
      const medianBoy = [3.3, 4.5, 5.6, 6.4, 7.0, 7.5, 7.9, 8.3, 8.6, 8.9, 9.2, 9.4, 9.6];
      const medianGirl = [3.2, 4.2, 5.1, 5.8, 6.4, 6.9, 7.3, 7.6, 7.9, 8.2, 8.5, 8.7, 8.9];
      const medians = v.gender === 0 ? medianBoy : medianGirl;
      const idx = Math.min(Math.floor(v.ageMonths), medians.length - 1);
      const median = medians[idx];
      const zScore = (v.weight - median) / (median * 0.12);
      const percentile = Math.min(99, Math.max(1, Math.round(50 + zScore * 34)));
      return [
        { label: "Estimated Percentile", value: `${percentile}th`, highlight: true },
        { label: "Median Weight", value: `${median} kg` },
        { label: "Status", value: percentile < 5 ? "Underweight" : percentile > 95 ? "Overweight" : "Normal Range" },
      ];
    },
    formula: { expression: "Based on WHO growth charts (simplified)", variables: ["Percentile from z-score approximation"] },
    howToUse: "Enter baby's gender, age in months, and weight.",
    faqs: [{ question: "What percentile is normal?", answer: "5th-95th percentile is considered normal. Consistent tracking along a growth curve matters more than a single reading." }],
    relatedCalcs: healthRelated("baby-growth-percentile-calculator"),
  },

  // ═══════════════════════════════════════════
  // MEDICAL & HEALTH RISK CALCULATORS
  // ═══════════════════════════════════════════
  {
    slug: "diabetes-risk-calculator", name: "Diabetes Risk Calculator", category: "Health", categorySlug: "health", subcategory: "Medical Risk",
    description: "Assess your risk of developing type 2 diabetes based on key risk factors.",
    metaDescription: "Free diabetes risk calculator based on lifestyle and health factors.",
    icon: "heart",
    inputs: [
      { id: "age", label: "Age", type: "number", defaultValue: 45 },
      { id: "bmi", label: "BMI", type: "number", defaultValue: 28, step: 0.1 },
      { id: "waist", label: "Waist (cm)", type: "number", defaultValue: 90 },
      { id: "familyHistory", label: "Family History", type: "select", defaultValue: 0, options: [{ value: 0, label: "No" }, { value: 3, label: "Yes" }] },
      { id: "activity", label: "Exercise", type: "select", defaultValue: 0, options: [{ value: 0, label: "Active" }, { value: 2, label: "Sedentary" }] },
    ],
    calculate: (v) => {
      let score = 0;
      if (v.age >= 65) score += 4; else if (v.age >= 55) score += 3; else if (v.age >= 45) score += 2;
      if (v.bmi >= 35) score += 4; else if (v.bmi >= 30) score += 3; else if (v.bmi >= 25) score += 1;
      if (v.waist > 102) score += 3; else if (v.waist > 88) score += 2;
      score += v.familyHistory + v.activity;
      let risk = "Low";
      if (score >= 12) risk = "High";
      else if (score >= 7) risk = "Moderate";
      return [
        { label: "Risk Score", value: `${score}/20`, highlight: true },
        { label: "Risk Level", value: risk },
        { label: "Recommendation", value: risk === "High" ? "See your doctor for screening" : "Maintain healthy habits" },
      ];
    },
    formula: { expression: "Scoring based on Finnish Diabetes Risk Score (FINDRISC)", variables: ["Age, BMI, waist, family history, activity"] },
    howToUse: "Enter your health data and risk factors.",
    faqs: [{ question: "Can diabetes be prevented?", answer: "Type 2 diabetes risk can be reduced by 58% through lifestyle changes: healthy diet, exercise, and weight management." }],
    relatedCalcs: healthRelated("diabetes-risk-calculator"),
  },
  {
    slug: "heart-disease-risk-calculator", name: "Heart Disease Risk Calculator", category: "Health", categorySlug: "health", subcategory: "Medical Risk",
    description: "Estimate 10-year cardiovascular disease risk based on major risk factors.",
    metaDescription: "Free heart disease risk calculator based on major risk factors.",
    icon: "heart",
    inputs: [
      { id: "age", label: "Age", type: "number", defaultValue: 55 },
      { id: "gender", label: "Gender", type: "select", defaultValue: 0, options: [{ value: 0, label: "Male" }, { value: 1, label: "Female" }] },
      { id: "systolic", label: "Systolic BP (mmHg)", type: "number", defaultValue: 130 },
      { id: "cholesterol", label: "Total Cholesterol (mg/dL)", type: "number", defaultValue: 220 },
      { id: "smoker", label: "Smoker?", type: "select", defaultValue: 0, options: [{ value: 0, label: "No" }, { value: 1, label: "Yes" }] },
      { id: "diabetic", label: "Diabetic?", type: "select", defaultValue: 0, options: [{ value: 0, label: "No" }, { value: 1, label: "Yes" }] },
    ],
    calculate: (v) => {
      // Simplified Framingham-style risk estimation
      let risk = 5;
      risk += Math.max(0, (v.age - 40) * 0.5);
      if (v.gender === 0) risk *= 1.3;
      if (v.systolic > 140) risk += 5; else if (v.systolic > 130) risk += 3;
      if (v.cholesterol > 240) risk += 4; else if (v.cholesterol > 200) risk += 2;
      if (v.smoker === 1) risk *= 1.5;
      if (v.diabetic === 1) risk *= 1.4;
      risk = Math.min(Math.round(risk), 80);
      return [
        { label: "10-Year Risk", value: `${risk}%`, highlight: true },
        { label: "Risk Level", value: risk > 20 ? "High" : risk > 10 ? "Moderate" : "Low" },
        { label: "Key Action", value: v.smoker === 1 ? "Quit smoking (biggest impact)" : "Maintain healthy lifestyle" },
      ];
    },
    formula: { expression: "Simplified Framingham risk estimation", variables: ["Not a substitute for clinical assessment"] },
    howToUse: "Enter your health metrics. This is a screening tool, not a diagnosis.",
    faqs: [{ question: "Can I reduce my risk?", answer: "Yes — quit smoking, exercise, eat healthy, control blood pressure and cholesterol. These can reduce risk by 50%+." }],
    relatedCalcs: healthRelated("heart-disease-risk-calculator"),
  },
  {
    slug: "stroke-risk-calculator", name: "Stroke Risk Calculator", category: "Health", categorySlug: "health", subcategory: "Medical Risk",
    description: "Assess your stroke risk based on the CHA₂DS₂-VASc scoring system.",
    metaDescription: "Free stroke risk calculator using CHA₂DS₂-VASc score.",
    icon: "heart",
    inputs: [
      { id: "age", label: "Age", type: "number", defaultValue: 65 },
      { id: "gender", label: "Gender", type: "select", defaultValue: 0, options: [{ value: 0, label: "Male" }, { value: 1, label: "Female (adds 1 point)" }] },
      { id: "chf", label: "Heart Failure?", type: "select", defaultValue: 0, options: [{ value: 0, label: "No" }, { value: 1, label: "Yes" }] },
      { id: "hypertension", label: "Hypertension?", type: "select", defaultValue: 0, options: [{ value: 0, label: "No" }, { value: 1, label: "Yes" }] },
      { id: "diabetes", label: "Diabetes?", type: "select", defaultValue: 0, options: [{ value: 0, label: "No" }, { value: 1, label: "Yes" }] },
      { id: "priorStroke", label: "Prior Stroke/TIA?", type: "select", defaultValue: 0, options: [{ value: 0, label: "No" }, { value: 2, label: "Yes" }] },
    ],
    calculate: (v) => {
      let score = v.chf + v.hypertension + v.diabetes + v.priorStroke + v.gender;
      if (v.age >= 75) score += 2; else if (v.age >= 65) score += 1;
      const riskMap: Record<number, string> = { 0: "0%", 1: "1.3%", 2: "2.2%", 3: "3.2%", 4: "4.0%", 5: "6.7%", 6: "9.8%", 7: "9.6%", 8: "12.5%", 9: "15.2%" };
      return [
        { label: "CHA₂DS₂-VASc Score", value: `${score}`, highlight: true },
        { label: "Annual Stroke Risk", value: riskMap[Math.min(score, 9)] || ">15%" },
        { label: "Recommendation", value: score >= 2 ? "Discuss anticoagulation with doctor" : "Monitor risk factors" },
      ];
    },
    formula: { expression: "CHA₂DS₂-VASc scoring system", variables: ["C=CHF, H=HTN, A₂=Age≥75, D=Diabetes, S₂=Stroke, V=Vascular, A=Age 65-74, Sc=Sex"] },
    howToUse: "Answer the risk factor questions.",
    faqs: [{ question: "What is CHA₂DS₂-VASc?", answer: "A scoring system to assess stroke risk in patients with atrial fibrillation, guiding anticoagulation decisions." }],
    relatedCalcs: healthRelated("stroke-risk-calculator"),
  },
  {
    slug: "kidney-function-calculator", name: "Kidney Function Calculator", category: "Health", categorySlug: "health", subcategory: "Medical Risk",
    description: "Estimate kidney function (eGFR) from creatinine, age, and sex.",
    metaDescription: "Free kidney function (eGFR) calculator using CKD-EPI equation.",
    icon: "heart",
    inputs: [
      { id: "gender", label: "Gender", type: "select", defaultValue: 0, options: [{ value: 0, label: "Male" }, { value: 1, label: "Female" }] },
      { id: "age", label: "Age", type: "number", defaultValue: 50 },
      { id: "creatinine", label: "Serum Creatinine (mg/dL)", type: "number", defaultValue: 1.1, step: 0.01 },
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
    formula: { expression: "CKD-EPI 2021 (race-free)", variables: ["Normal: ≥90 mL/min"] },
    howToUse: "Enter gender, age, and serum creatinine from blood test.",
    faqs: [{ question: "What is eGFR?", answer: "Estimated glomerular filtration rate — how well your kidneys filter waste. Normal is ≥90." }],
    relatedCalcs: healthRelated("kidney-function-calculator"),
  },
  {
    slug: "liver-function-score-calculator", name: "Liver Function Score Calculator", category: "Health", categorySlug: "health", subcategory: "Medical Risk",
    description: "Calculate the MELD score to assess liver disease severity.",
    metaDescription: "Free MELD score calculator for liver function assessment.",
    icon: "heart",
    inputs: [
      { id: "bilirubin", label: "Bilirubin (mg/dL)", type: "number", defaultValue: 1.2, step: 0.1 },
      { id: "creatinine", label: "Creatinine (mg/dL)", type: "number", defaultValue: 1.0, step: 0.1 },
      { id: "inr", label: "INR", type: "number", defaultValue: 1.1, step: 0.1 },
    ],
    calculate: (v) => {
      const bil = Math.max(v.bilirubin, 1);
      const cr = Math.max(Math.min(v.creatinine, 4), 1);
      const inr = Math.max(v.inr, 1);
      const meld = Math.round(10 * (0.957 * Math.log(cr) + 0.378 * Math.log(bil) + 1.120 * Math.log(inr) + 0.643));
      return [
        { label: "MELD Score", value: `${meld}`, highlight: true },
        { label: "3-Month Mortality", value: meld < 10 ? "<2%" : meld < 20 ? "6%" : meld < 30 ? "20%" : ">50%" },
        { label: "Severity", value: meld < 10 ? "Low" : meld < 20 ? "Moderate" : "Severe" },
      ];
    },
    formula: { expression: "MELD = 10 × (0.957×ln(Cr) + 0.378×ln(Bil) + 1.120×ln(INR) + 0.643)", variables: ["Used for liver transplant prioritization"] },
    howToUse: "Enter lab values from blood tests.",
    faqs: [{ question: "What is MELD?", answer: "Model for End-Stage Liver Disease — predicts 3-month mortality and prioritizes transplant candidates." }],
    relatedCalcs: healthRelated("liver-function-score-calculator"),
  },
  {
    slug: "metabolic-age-calculator", name: "Metabolic Age Calculator", category: "Health", categorySlug: "health", subcategory: "Medical Risk",
    description: "Estimate your metabolic age based on BMR compared to population averages.",
    metaDescription: "Free metabolic age calculator based on BMR comparison.",
    icon: "heart",
    inputs: [
      { id: "gender", label: "Gender", type: "select", defaultValue: 0, options: [{ value: 0, label: "Male" }, { value: 1, label: "Female" }] },
      { id: "age", label: "Actual Age", type: "number", defaultValue: 35 },
      { id: "weight", label: "Weight (kg)", type: "number", defaultValue: 75, step: 0.1 },
      { id: "height", label: "Height (cm)", type: "number", defaultValue: 175, step: 0.1 },
    ],
    calculate: (v) => {
      const bmr = v.gender === 0 ? 10 * v.weight + 6.25 * v.height - 5 * v.age + 5 : 10 * v.weight + 6.25 * v.height - 5 * v.age - 161;
      // Compare to average BMR for different ages
      const avgBmrForAge = v.gender === 0 ? 10 * 80 + 6.25 * 175 - 5 * v.age + 5 : 10 * 65 + 6.25 * 163 - 5 * v.age - 161;
      const metabolicAge = Math.round(v.age + (avgBmrForAge - bmr) / 5);
      return [
        { label: "Metabolic Age", value: `${metabolicAge} years`, highlight: true },
        { label: "Actual Age", value: `${v.age} years` },
        { label: "Your BMR", value: `${Math.round(bmr)} cal/day` },
        { label: "Status", value: metabolicAge < v.age ? "Younger than average ✓" : "Older than average" },
      ];
    },
    formula: { expression: "Based on BMR comparison to age-matched averages", variables: ["Lower metabolic age = better fitness"] },
    howToUse: "Enter your stats to estimate metabolic age.",
    faqs: [{ question: "Can I improve metabolic age?", answer: "Yes! Building muscle, exercising regularly, and maintaining healthy weight lowers metabolic age." }],
    relatedCalcs: healthRelated("metabolic-age-calculator"),
  },
  {
    slug: "dehydration-risk-calculator", name: "Dehydration Risk Calculator", category: "Health", categorySlug: "health", subcategory: "Medical Risk",
    description: "Assess your dehydration risk based on fluid intake, activity, and environment.",
    metaDescription: "Free dehydration risk calculator based on fluid balance.",
    icon: "heart",
    inputs: [
      { id: "weight", label: "Weight (kg)", type: "number", defaultValue: 70, step: 0.1 },
      { id: "waterIntake", label: "Water Intake (L/day)", type: "number", defaultValue: 1.5, step: 0.1 },
      { id: "exercise", label: "Exercise (min/day)", type: "number", defaultValue: 30 },
      { id: "climate", label: "Climate", type: "select", defaultValue: 0, options: [{ value: 0, label: "Moderate" }, { value: 1, label: "Hot" }, { value: 2, label: "Very Hot" }] },
    ],
    calculate: (v) => {
      const needed = (v.weight * 35 + (v.exercise / 30) * 350 + v.climate * 500) / 1000;
      const deficit = needed - v.waterIntake;
      const risk = deficit > 1 ? "High" : deficit > 0.3 ? "Moderate" : "Low";
      return [
        { label: "Hydration Status", value: risk, highlight: true },
        { label: "Daily Need", value: `${needed.toFixed(1)} L` },
        { label: "Current Intake", value: `${v.waterIntake} L` },
        { label: "Deficit", value: deficit > 0 ? `${deficit.toFixed(1)} L short` : "Adequate ✓" },
      ];
    },
    formula: { expression: "Need = Weight×35ml + Exercise + Climate bonus", variables: [] },
    howToUse: "Enter weight, water intake, exercise, and climate.",
    faqs: [{ question: "Signs of dehydration?", answer: "Dark urine, thirst, fatigue, headache, dry mouth. Severe: dizziness, rapid heartbeat." }],
    relatedCalcs: healthRelated("dehydration-risk-calculator"),
  },

  // ═══════════════════════════════════════════
  // LIFESTYLE & WELLNESS CALCULATORS
  // ═══════════════════════════════════════════
  {
    slug: "sleep-debt-calculator", name: "Sleep Debt Calculator", category: "Health", categorySlug: "health", subcategory: "Lifestyle & Wellness",
    description: "Calculate your accumulated sleep debt and recovery time needed.",
    metaDescription: "Free sleep debt calculator to track cumulative sleep deficit.",
    icon: "heart",
    inputs: [
      { id: "needed", label: "Hours Needed per Night", type: "number", defaultValue: 8, step: 0.5 },
      { id: "actual", label: "Hours Actually Sleeping", type: "number", defaultValue: 6, step: 0.5 },
      { id: "days", label: "Days of Deficit", type: "number", defaultValue: 7 },
    ],
    calculate: (v) => {
      const dailyDebt = v.needed - v.actual;
      const totalDebt = dailyDebt * v.days;
      const recoveryDays = Math.ceil(totalDebt / 2);
      return [
        { label: "Total Sleep Debt", value: `${totalDebt.toFixed(1)} hours`, highlight: true },
        { label: "Daily Deficit", value: `${dailyDebt.toFixed(1)} hours` },
        { label: "Recovery Time", value: `~${recoveryDays} days (adding 2hr/night)` },
      ];
    },
    formula: { expression: "Sleep Debt = (Needed − Actual) × Days", variables: ["Chronic debt takes longer to recover"] },
    howToUse: "Enter sleep needed, actual sleep, and number of days.",
    faqs: [{ question: "Can you catch up on sleep?", answer: "Short-term debt can be repaid over a few days. Chronic debt (months) requires consistent improved sleep habits." }],
    relatedCalcs: healthRelated("sleep-debt-calculator"),
  },
  {
    slug: "sleep-cycle-calculator", name: "Sleep Cycle Calculator", category: "Health", categorySlug: "health", subcategory: "Lifestyle & Wellness",
    description: "Calculate optimal bedtime and wake time based on 90-minute sleep cycles.",
    metaDescription: "Free sleep cycle calculator for optimal bedtime and wake times.",
    icon: "heart",
    inputs: [
      { id: "wakeHour", label: "Wake Time (hour, 0-23)", type: "number", defaultValue: 7, min: 0, max: 23 },
      { id: "wakeMin", label: "Wake Time (minute)", type: "number", defaultValue: 0, min: 0, max: 59 },
    ],
    calculate: (v) => {
      const wakeMin = v.wakeHour * 60 + v.wakeMin;
      const fallAsleep = 15;
      const cycles = [4, 5, 6];
      const bedtimes = cycles.map(c => {
        let bedMin = wakeMin - (c * 90 + fallAsleep);
        if (bedMin < 0) bedMin += 1440;
        const h = Math.floor(bedMin / 60);
        const m = bedMin % 60;
        return `${h}:${String(m).padStart(2, "0")}`;
      });
      return [
        { label: "Ideal Bedtime (6 cycles)", value: bedtimes[2], highlight: true },
        { label: "5 Cycles (7.5 hrs)", value: bedtimes[1] },
        { label: "4 Cycles (6 hrs)", value: bedtimes[0] },
        { label: "Sleep Duration", value: "6-9 hours recommended" },
      ];
    },
    formula: { expression: "Bedtime = Wake Time − (Cycles × 90min) − 15min", variables: ["1 cycle = 90 minutes", "15 min to fall asleep"] },
    howToUse: "Enter your desired wake time.",
    faqs: [{ question: "Why 90-minute cycles?", answer: "Sleep cycles through light, deep, and REM stages in ~90 minutes. Waking between cycles feels more refreshed." }],
    relatedCalcs: healthRelated("sleep-cycle-calculator"),
  },
  {
    slug: "circadian-rhythm-calculator", name: "Circadian Rhythm Calculator", category: "Health", categorySlug: "health", subcategory: "Lifestyle & Wellness",
    description: "Map your ideal daily schedule based on your chronotype and circadian rhythm.",
    metaDescription: "Free circadian rhythm calculator for optimal daily scheduling.",
    icon: "heart",
    inputs: [
      { id: "chronotype", label: "Chronotype", type: "select", defaultValue: 0, options: [{ value: 0, label: "Early Bird (wake 5-7am)" }, { value: 1, label: "Normal (wake 7-9am)" }, { value: 2, label: "Night Owl (wake 9-11am)" }] },
    ],
    calculate: (v) => {
      const schedules = [
        { wake: "6:00", peak: "9:00-12:00", exercise: "7:00", sleep: "22:00" },
        { wake: "7:30", peak: "10:00-14:00", exercise: "8:00", sleep: "23:30" },
        { wake: "9:30", peak: "12:00-16:00", exercise: "17:00", sleep: "1:00" },
      ];
      const s = schedules[v.chronotype];
      return [
        { label: "Optimal Wake", value: s.wake, highlight: true },
        { label: "Peak Focus", value: s.peak },
        { label: "Best Exercise Time", value: s.exercise },
        { label: "Ideal Bedtime", value: s.sleep },
      ];
    },
    formula: { expression: "Based on chronotype research", variables: ["Align activities with natural energy peaks"] },
    howToUse: "Select your natural chronotype.",
    faqs: [{ question: "Can I change my chronotype?", answer: "Chronotype is partly genetic but can shift with consistent sleep schedules, light exposure, and age." }],
    relatedCalcs: healthRelated("circadian-rhythm-calculator"),
  },
  {
    slug: "hydration-level-calculator", name: "Hydration Level Calculator", category: "Health", categorySlug: "health", subcategory: "Lifestyle & Wellness",
    description: "Assess your current hydration level based on intake and output indicators.",
    metaDescription: "Free hydration level calculator for daily hydration tracking.",
    icon: "heart",
    inputs: [
      { id: "waterDrunk", label: "Water Consumed (L)", type: "number", defaultValue: 2, step: 0.1 },
      { id: "urineColor", label: "Urine Color", type: "select", defaultValue: 1, options: [{ value: 0, label: "Clear/Pale" }, { value: 1, label: "Light Yellow" }, { value: 2, label: "Dark Yellow" }, { value: 3, label: "Amber/Brown" }] },
      { id: "weight", label: "Weight (kg)", type: "number", defaultValue: 70, step: 0.1 },
    ],
    calculate: (v) => {
      const needed = v.weight * 0.035;
      const hydrationPct = Math.min(100, (v.waterDrunk / needed) * 100);
      const urineLabels = ["Well Hydrated", "Hydrated", "Mildly Dehydrated", "Dehydrated"];
      return [
        { label: "Hydration Level", value: `${hydrationPct.toFixed(0)}%`, highlight: true },
        { label: "Urine Assessment", value: urineLabels[v.urineColor] },
        { label: "Daily Need", value: `${needed.toFixed(1)} L` },
        { label: "Remaining", value: `${Math.max(0, needed - v.waterDrunk).toFixed(1)} L` },
      ];
    },
    formula: { expression: "Hydration% = Intake / Need × 100", variables: ["Urine color is a practical indicator"] },
    howToUse: "Enter water consumed, urine color, and weight.",
    faqs: [{ question: "Best hydration indicator?", answer: "Urine color is the most practical daily indicator. Pale yellow means good hydration." }],
    relatedCalcs: healthRelated("hydration-level-calculator"),
  },
  {
    slug: "step-count-to-calories-calculator", name: "Step Count to Calories Calculator", category: "Health", categorySlug: "health", subcategory: "Lifestyle & Wellness",
    description: "Convert your daily step count into estimated calories burned.",
    metaDescription: "Free step count to calories converter based on body weight.",
    icon: "heart",
    inputs: [
      { id: "steps", label: "Steps", type: "number", defaultValue: 10000 },
      { id: "weight", label: "Weight (kg)", type: "number", defaultValue: 70, step: 0.1 },
      { id: "pace", label: "Walking Pace", type: "select", defaultValue: 1, options: [{ value: 0.8, label: "Slow" }, { value: 1, label: "Moderate" }, { value: 1.2, label: "Brisk" }] },
    ],
    calculate: (v) => {
      const baseCal = v.steps * 0.04 * (v.weight / 70) * v.pace;
      const distKm = v.steps * 0.000762;
      return [
        { label: "Calories Burned", value: `${Math.round(baseCal)} cal`, highlight: true },
        { label: "Distance", value: `${distKm.toFixed(2)} km` },
        { label: "Distance (miles)", value: `${(distKm / 1.609).toFixed(2)} mi` },
      ];
    },
    formula: { expression: "Cal ≈ Steps × 0.04 × (Weight/70) × Pace", variables: [] },
    howToUse: "Enter step count, weight, and walking pace.",
    faqs: [{ question: "How many steps for weight loss?", answer: "Adding 2,000-4,000 extra steps daily can help create a calorie deficit for weight loss." }],
    relatedCalcs: healthRelated("step-count-to-calories-calculator"),
  },
  {
    slug: "daily-activity-level-calculator", name: "Daily Activity Level Calculator", category: "Health", categorySlug: "health", subcategory: "Lifestyle & Wellness",
    description: "Determine your physical activity level (PAL) for accurate calorie calculations.",
    metaDescription: "Free activity level calculator for TDEE accuracy.",
    icon: "heart",
    inputs: [
      { id: "workType", label: "Work Type", type: "select", defaultValue: 1.3, options: [{ value: 1.2, label: "Desk Job" }, { value: 1.3, label: "Standing Job" }, { value: 1.5, label: "Active Job" }, { value: 1.7, label: "Manual Labor" }] },
      { id: "exerciseMin", label: "Exercise (min/day)", type: "number", defaultValue: 30 },
      { id: "steps", label: "Daily Steps", type: "number", defaultValue: 7000 },
    ],
    calculate: (v) => {
      let pal = v.workType;
      pal += v.exerciseMin * 0.003;
      pal += (v.steps / 10000) * 0.1;
      let level = "Sedentary";
      if (pal >= 1.9) level = "Very Active";
      else if (pal >= 1.7) level = "Active";
      else if (pal >= 1.5) level = "Moderately Active";
      else if (pal >= 1.4) level = "Lightly Active";
      return [
        { label: "Activity Level (PAL)", value: pal.toFixed(2), highlight: true },
        { label: "Category", value: level },
        { label: "TDEE Multiplier", value: `×${pal.toFixed(2)}` },
      ];
    },
    formula: { expression: "PAL = Work Factor + Exercise + NEAT", variables: ["NEAT = Non-Exercise Activity Thermogenesis"] },
    howToUse: "Select work type and enter exercise and step data.",
    faqs: [{ question: "What is NEAT?", answer: "Non-Exercise Activity Thermogenesis — calories from daily movement like walking, fidgeting, standing. Can vary by 2000 cal/day between people." }],
    relatedCalcs: healthRelated("daily-activity-level-calculator"),
  },
  {
    slug: "stress-level-calculator", name: "Stress Level Calculator", category: "Health", categorySlug: "health", subcategory: "Lifestyle & Wellness",
    description: "Assess your current stress level based on common stress indicators.",
    metaDescription: "Free stress level assessment calculator based on lifestyle factors.",
    icon: "heart",
    inputs: [
      { id: "sleepQuality", label: "Sleep Quality", type: "select", defaultValue: 1, options: [{ value: 0, label: "Good" }, { value: 1, label: "Fair" }, { value: 2, label: "Poor" }] },
      { id: "workStress", label: "Work Stress", type: "select", defaultValue: 1, options: [{ value: 0, label: "Low" }, { value: 1, label: "Moderate" }, { value: 2, label: "High" }] },
      { id: "exercise", label: "Exercise Frequency", type: "select", defaultValue: 1, options: [{ value: 0, label: "Regular (4+/week)" }, { value: 1, label: "Some (1-3/week)" }, { value: 2, label: "None" }] },
      { id: "socialSupport", label: "Social Support", type: "select", defaultValue: 0, options: [{ value: 0, label: "Strong" }, { value: 1, label: "Moderate" }, { value: 2, label: "Weak" }] },
    ],
    calculate: (v) => {
      const score = v.sleepQuality + v.workStress + v.exercise + v.socialSupport;
      let level = "Low";
      if (score >= 6) level = "High";
      else if (score >= 4) level = "Moderate";
      const tips = score >= 6 ? "Consider professional support" : score >= 4 ? "Add stress-relief practices" : "Maintain current habits";
      return [
        { label: "Stress Score", value: `${score}/8`, highlight: true },
        { label: "Stress Level", value: level },
        { label: "Top Recommendation", value: tips },
      ];
    },
    formula: { expression: "Score = Sum of factor ratings (0-2 each)", variables: ["0-3: Low", "4-5: Moderate", "6-8: High"] },
    howToUse: "Rate each stress factor.",
    faqs: [{ question: "How to reduce stress?", answer: "Exercise, sleep hygiene, meditation, social connection, and time management are evidence-based strategies." }],
    relatedCalcs: healthRelated("stress-level-calculator"),
  },
];
