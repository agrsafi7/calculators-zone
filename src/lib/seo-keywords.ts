// High-intent keywords searched in tier-1 countries (USA, UK, Canada, Australia)
// Used for meta tags, content optimization, and internal linking

export interface CategorySEO {
  slug: string;
  keywords: string[];
  longTailKeywords: string[];
  geoKeywords: string[];
  contentIntro: string;
  relatedCategories: { name: string; slug: string }[];
  topCalcLinks: { name: string; slug: string; calcSlug: string; anchor: string }[];
}

export const categorySEOData: Record<string, CategorySEO> = {
  finance: {
    slug: "finance",
    keywords: [
      "mortgage calculator", "loan calculator", "compound interest calculator",
      "retirement calculator", "investment calculator", "salary calculator",
      "auto loan calculator", "credit card payoff calculator", "tax calculator",
      "savings calculator", "budget calculator", "ROI calculator",
      "net worth calculator", "amortization calculator", "debt payoff calculator",
    ],
    longTailKeywords: [
      "how much house can I afford calculator", "monthly mortgage payment calculator",
      "how to calculate compound interest", "retirement savings calculator by age",
      "take home pay calculator after taxes", "credit card minimum payment calculator",
      "how much should I save for retirement", "car loan monthly payment calculator",
      "simple interest vs compound interest calculator", "debt snowball calculator",
    ],
    geoKeywords: [
      "UK mortgage calculator", "Australian home loan calculator",
      "Canadian tax calculator 2025", "US salary after tax calculator",
      "UK stamp duty calculator", "Australian superannuation calculator",
    ],
    contentIntro: `Our finance calculators help you make smarter money decisions. Whether you're calculating mortgage payments for a new home in the US, UK, Canada, or Australia, estimating your take-home salary after taxes, or planning retirement savings, our tools provide instant and accurate results. Millions of users trust our financial calculators for budgeting, investing, and debt management.`,
    relatedCategories: [
      { name: "Math & Education", slug: "math" },
      { name: "Lifestyle", slug: "lifestyle" },
    ],
    topCalcLinks: [
      { name: "Mortgage Calculator", slug: "finance", calcSlug: "mortgage-calculator", anchor: "Calculate your monthly mortgage payments" },
      { name: "Salary Calculator", slug: "finance", calcSlug: "salary-calculator", anchor: "Estimate your take-home pay after taxes" },
      { name: "Compound Interest Calculator", slug: "finance", calcSlug: "compound-interest-calculator", anchor: "See how your investments grow over time" },
      { name: "Loan Calculator", slug: "finance", calcSlug: "loan-calculator", anchor: "Compare loan options and monthly payments" },
      { name: "Retirement Calculator", slug: "finance", calcSlug: "retirement-calculator", anchor: "Plan your retirement savings strategy" },
    ],
  },
  health: {
    slug: "health",
    keywords: [
      "BMI calculator", "calorie calculator", "body fat calculator",
      "BMR calculator", "TDEE calculator", "pregnancy due date calculator",
      "ideal weight calculator", "heart rate zone calculator", "macro calculator",
      "water intake calculator", "ovulation calculator", "blood alcohol calculator",
    ],
    longTailKeywords: [
      "how to calculate BMI for adults", "how many calories should I eat to lose weight",
      "body fat percentage calculator for men", "pregnancy due date calculator by last period",
      "ideal body weight calculator by height and age", "how to calculate basal metabolic rate",
      "how much water should I drink per day calculator", "macro calculator for weight loss",
      "heart rate zones for fat burning", "calorie deficit calculator for weight loss",
    ],
    geoKeywords: [
      "BMI calculator NHS UK", "Australian BMI calculator metric",
      "Canadian calorie calculator", "US body fat percentage calculator",
    ],
    contentIntro: `Track your health and fitness goals with our medically-informed calculators. From BMI and body fat calculations used by the NHS, Health Canada, and Australian health services, to calorie counters and pregnancy planners — our tools give you the data you need. Whether you're starting a weight loss journey, training for a marathon, or expecting a baby, get accurate health metrics instantly.`,
    relatedCategories: [
      { name: "Lifestyle", slug: "lifestyle" },
      { name: "Science", slug: "science" },
    ],
    topCalcLinks: [
      { name: "BMI Calculator", slug: "health", calcSlug: "bmi-calculator", anchor: "Calculate your Body Mass Index instantly" },
      { name: "Calorie Calculator", slug: "health", calcSlug: "calorie-calculator", anchor: "Find your daily calorie needs" },
      { name: "Body Fat Calculator", slug: "health", calcSlug: "body-fat-calculator", anchor: "Estimate your body fat percentage" },
      { name: "Pregnancy Calculator", slug: "health", calcSlug: "pregnancy-calculator", anchor: "Calculate your expected due date" },
      { name: "BMR Calculator", slug: "health", calcSlug: "bmr-calculator", anchor: "Find your basal metabolic rate" },
    ],
  },
  math: {
    slug: "math",
    keywords: [
      "percentage calculator", "fraction calculator", "GPA calculator",
      "scientific notation calculator", "quadratic equation solver",
      "standard deviation calculator", "mean median mode calculator",
      "exponent calculator", "logarithm calculator", "matrix calculator",
      "algebra calculator", "prime number calculator", "factorial calculator",
    ],
    longTailKeywords: [
      "how to calculate percentage increase", "fraction to decimal converter",
      "how to calculate GPA on 4.0 scale", "scientific notation converter",
      "quadratic formula solver step by step", "standard deviation calculator with steps",
      "how to find mean median and mode", "percentage of a number calculator",
      "how to simplify fractions calculator", "cumulative GPA calculator college",
    ],
    geoKeywords: [
      "UK GCSE grade calculator", "Australian ATAR calculator",
      "Canadian GPA calculator", "US college GPA calculator 4.0 scale",
    ],
    contentIntro: `Solve any math problem with our comprehensive collection of math and education calculators. Used by students, teachers, and professionals across the US, UK, Canada, and Australia, these tools cover everything from basic percentages to advanced statistics. Whether you're calculating your GPA, solving quadratic equations, or converting scientific notation, get step-by-step accurate results.`,
    relatedCategories: [
      { name: "Science", slug: "science" },
      { name: "Finance", slug: "finance" },
    ],
    topCalcLinks: [
      { name: "Percentage Calculator", slug: "math", calcSlug: "percentage-calculator", anchor: "Calculate percentages instantly" },
      { name: "GPA Calculator", slug: "math", calcSlug: "gpa-calculator", anchor: "Calculate your grade point average" },
      { name: "Scientific Notation Calculator", slug: "math", calcSlug: "scientific-notation-calculator", anchor: "Convert to and from scientific notation" },
      { name: "Fraction Calculator", slug: "math", calcSlug: "fraction-calculator", anchor: "Add, subtract, multiply, and divide fractions" },
      { name: "Standard Deviation Calculator", slug: "math", calcSlug: "standard-deviation-calculator", anchor: "Calculate statistical deviation" },
    ],
  },
  conversions: {
    slug: "conversions",
    keywords: [
      "length converter", "weight converter", "temperature converter",
      "speed converter", "volume converter", "area converter",
      "data storage converter", "energy converter", "pressure converter",
      "kg to lbs", "celsius to fahrenheit", "miles to km",
      "inches to cm", "feet to meters", "liters to gallons",
    ],
    longTailKeywords: [
      "how to convert celsius to fahrenheit formula", "kg to pounds conversion chart",
      "how many inches in a foot", "miles to kilometers converter",
      "liters to gallons US vs UK", "how to convert metric to imperial",
      "cm to inches converter", "ounces to grams conversion",
      "square feet to square meters calculator", "MB to GB converter",
    ],
    geoKeywords: [
      "US gallons to UK gallons converter", "metric to imperial converter UK",
      "Australian metric conversion", "Canadian measurement converter",
    ],
    contentIntro: `Convert between any measurement units instantly with our comprehensive conversion tools. Whether you need to convert metric to imperial for US measurements, understand UK pints vs US pints, or switch between Celsius and Fahrenheit, our converters handle it all. Perfect for travelers, students, engineers, and anyone working with international measurements across the US, UK, Canada, and Australia.`,
    relatedCategories: [
      { name: "Science", slug: "science" },
      { name: "Math & Education", slug: "math" },
    ],
    topCalcLinks: [
      { name: "Length Converter", slug: "conversions", calcSlug: "length-converter", anchor: "Convert between miles, kilometers, feet, and meters" },
      { name: "Weight Converter", slug: "conversions", calcSlug: "weight-converter", anchor: "Convert kg to lbs and more" },
      { name: "Temperature Converter", slug: "conversions", calcSlug: "temperature-converter", anchor: "Convert Celsius, Fahrenheit, and Kelvin" },
      { name: "Speed Converter", slug: "conversions", calcSlug: "speed-converter", anchor: "Convert between mph and km/h" },
      { name: "Volume Converter", slug: "conversions", calcSlug: "volume-converter", anchor: "Convert liters, gallons, and fluid ounces" },
    ],
  },
  science: {
    slug: "science",
    keywords: [
      "force calculator", "Ohm's law calculator", "pH calculator",
      "density calculator", "wavelength calculator", "velocity calculator",
      "acceleration calculator", "kinetic energy calculator", "momentum calculator",
      "molar mass calculator", "ideal gas law calculator", "Boyle's law calculator",
    ],
    longTailKeywords: [
      "how to calculate force using mass and acceleration",
      "Ohm's law voltage current resistance calculator",
      "how to calculate density from mass and volume",
      "wavelength frequency speed of light calculator",
      "kinetic energy formula calculator", "ideal gas law PV=nRT calculator",
      "how to calculate pH from concentration", "Newton's second law calculator",
      "molar mass of compounds calculator", "gravitational force calculator",
    ],
    geoKeywords: [
      "GCSE physics calculator UK", "AP physics calculator US",
      "Australian HSC science formulas", "Canadian physics equations",
    ],
    contentIntro: `Tackle physics, chemistry, and biology problems with our powerful science calculators. From Newton's laws and Ohm's law to pH calculations and gas laws, our tools are trusted by students preparing for AP exams (US), GCSEs and A-Levels (UK), HSC (Australia), and provincial exams (Canada). Each calculator uses established scientific formulas and provides precise, reliable results.`,
    relatedCategories: [
      { name: "Math & Education", slug: "math" },
      { name: "Unit Conversions", slug: "conversions" },
    ],
    topCalcLinks: [
      { name: "Force Calculator", slug: "science", calcSlug: "force-calculator", anchor: "Calculate force using F=ma" },
      { name: "Ohm's Law Calculator", slug: "science", calcSlug: "ohms-law-calculator", anchor: "Calculate voltage, current, and resistance" },
      { name: "pH Calculator", slug: "science", calcSlug: "ph-calculator", anchor: "Calculate pH from hydrogen ion concentration" },
      { name: "Density Calculator", slug: "science", calcSlug: "density-calculator", anchor: "Calculate density from mass and volume" },
      { name: "Kinetic Energy Calculator", slug: "science", calcSlug: "kinetic-energy-calculator", anchor: "Calculate energy of moving objects" },
    ],
  },
  datetime: {
    slug: "datetime",
    keywords: [
      "age calculator", "date difference calculator", "countdown timer",
      "business days calculator", "time zone converter", "date calculator",
      "working days calculator", "hours calculator", "time duration calculator",
      "days between dates", "weeks calculator", "leap year calculator",
    ],
    longTailKeywords: [
      "how old am I exact age calculator", "how many days between two dates",
      "business days calculator exclude holidays", "time zone difference calculator",
      "how many weeks until a date", "date of birth age calculator",
      "working days calculator UK bank holidays", "hours between two times calculator",
      "countdown to date calculator", "how many days until Christmas calculator",
    ],
    geoKeywords: [
      "UK bank holiday calculator", "Australian public holiday calculator",
      "Canadian statutory holiday calculator", "US federal holiday date calculator",
    ],
    contentIntro: `Master time-related calculations with our precise date and time tools. Calculate your exact age down to the day, count business days excluding US federal holidays, UK bank holidays, or Australian public holidays, and convert between time zones for international meetings. Our date calculators are perfect for project managers, event planners, HR professionals, and anyone who needs accurate temporal calculations.`,
    relatedCategories: [
      { name: "Lifestyle", slug: "lifestyle" },
      { name: "Finance", slug: "finance" },
    ],
    topCalcLinks: [
      { name: "Age Calculator", slug: "datetime", calcSlug: "age-calculator", anchor: "Calculate your exact age in years, months, and days" },
      { name: "Date Difference Calculator", slug: "datetime", calcSlug: "date-difference-calculator", anchor: "Find the difference between two dates" },
      { name: "Business Days Calculator", slug: "datetime", calcSlug: "business-days-calculator", anchor: "Count working days between dates" },
      { name: "Time Zone Converter", slug: "datetime", calcSlug: "time-zone-converter", anchor: "Convert times across world time zones" },
      { name: "Countdown Calculator", slug: "datetime", calcSlug: "countdown-calculator", anchor: "Count down days to any event" },
    ],
  },
  lifestyle: {
    slug: "lifestyle",
    keywords: [
      "tip calculator", "sleep calculator", "pet age calculator",
      "recipe scaler", "fuel cost calculator", "electricity cost calculator",
      "shoe size converter", "bra size calculator", "paint calculator",
      "carpet calculator", "moving cost calculator", "wedding budget calculator",
    ],
    longTailKeywords: [
      "how much to tip calculator", "sleep cycle calculator what time to wake up",
      "dog years to human years calculator", "recipe converter half double",
      "fuel cost calculator for road trip", "how much paint do I need calculator",
      "electricity usage cost calculator per month", "carpet area calculator",
      "shoe size conversion US UK EU", "how much sleep do I need by age",
    ],
    geoKeywords: [
      "UK tipping calculator", "Australian fuel cost calculator",
      "Canadian shoe size converter", "US electricity rate calculator by state",
    ],
    contentIntro: `Simplify everyday decisions with our practical lifestyle calculators. From calculating tips at restaurants in the US or UK, to estimating fuel costs for road trips across Australia or Canada, these tools make daily tasks effortless. Plan your sleep schedule, convert your pet's age, scale recipes, and estimate home improvement costs — all free and instant.`,
    relatedCategories: [
      { name: "Finance", slug: "finance" },
      { name: "Health & Fitness", slug: "health" },
    ],
    topCalcLinks: [
      { name: "Tip Calculator", slug: "lifestyle", calcSlug: "tip-calculator", anchor: "Calculate tips and split bills easily" },
      { name: "Sleep Calculator", slug: "lifestyle", calcSlug: "sleep-calculator", anchor: "Find the best time to sleep and wake up" },
      { name: "Fuel Cost Calculator", slug: "lifestyle", calcSlug: "fuel-cost-calculator", anchor: "Estimate gas costs for your trip" },
      { name: "Pet Age Calculator", slug: "lifestyle", calcSlug: "pet-age-calculator", anchor: "Convert pet years to human years" },
      { name: "Electricity Cost Calculator", slug: "lifestyle", calcSlug: "electricity-cost-calculator", anchor: "Calculate your monthly electricity bill" },
    ],
  },
};

// Get keywords for a specific category
export const getCategoryKeywords = (slug: string): string[] => {
  const data = categorySEOData[slug];
  if (!data) return [];
  return [...data.keywords.slice(0, 8), ...data.longTailKeywords.slice(0, 4)];
};

// Get meta keywords string
export const getMetaKeywords = (slug: string): string => {
  return getCategoryKeywords(slug).join(", ");
};

// Cross-category popular links for footer/sidebar SEO
export const globalPopularLinks = [
  { name: "Mortgage Calculator", path: "/finance/mortgage-calculator" },
  { name: "BMI Calculator", path: "/health/bmi-calculator" },
  { name: "Percentage Calculator", path: "/math/percentage-calculator" },
  { name: "Age Calculator", path: "/datetime/age-calculator" },
  { name: "Length Converter", path: "/conversions/length-converter" },
  { name: "Calorie Calculator", path: "/health/calorie-calculator" },
  { name: "GPA Calculator", path: "/math/gpa-calculator" },
  { name: "Tip Calculator", path: "/lifestyle/tip-calculator" },
  { name: "Force Calculator", path: "/science/force-calculator" },
  { name: "Salary Calculator", path: "/finance/salary-calculator" },
  { name: "Temperature Converter", path: "/conversions/temperature-converter" },
  { name: "Scientific Notation Calculator", path: "/math/scientific-notation-calculator" },
];
