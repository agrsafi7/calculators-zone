import { CalculatorConfig } from "@/components/CalculatorTemplate";

const mathRelated = (exclude: string) => [
  { name: "Percentage Calculator", slug: "percentage-calculator", icon: "hash", category: "math" },
  { name: "Fraction Calculator", slug: "fraction-calculator", icon: "hash", category: "math" },
  { name: "GPA Calculator", slug: "gpa-calculator", icon: "hash", category: "math" },
  { name: "Area Calculator", slug: "area-calculator", icon: "hash", category: "math" },
].filter((c) => c.slug !== exclude);

const mathSubcategoryMap: Record<string, string> = {
  "percentage-increase-calculator": "Algebra",
  "percentage-decrease-calculator": "Algebra",
  "fraction-calculator": "Algebra",
  "mixed-fraction-calculator": "Algebra",
  "decimal-to-fraction-calculator": "Algebra",
  "fraction-to-decimal-calculator": "Algebra",
  "scientific-calculator": "Algebra",
  "quadratic-equation-calculator": "Algebra",
  "linear-equation-calculator": "Algebra",
  "scientific-notation-calculator": "Algebra",
  "long-division-calculator": "Algebra",
  "rounding-calculator": "Algebra",
  "number-sequence-calculator": "Algebra",
  "factor-calculator": "Algebra",
  "ratio-calculator": "Algebra",
  "percent-error-calculator": "Algebra",
  "standard-deviation-calculator": "Statistics",
  "mean-median-mode-calculator": "Statistics",
  "probability-calculator": "Statistics",
  "permutation-combination-calculator": "Statistics",
  "z-score-calculator": "Statistics",
  "sample-size-calculator": "Statistics",
  "confidence-interval-calculator": "Statistics",
  "p-value-calculator": "Statistics",
  "statistics-calculator": "Statistics",
  "average-calculator": "Statistics",
  "slope-calculator": "Geometry",
  "distance-formula-calculator": "Geometry",
  "midpoint-calculator": "Geometry",
  "area-calculator": "Geometry",
  "volume-calculator": "Geometry",
  "circle-calculator": "Geometry",
  "pythagorean-theorem-calculator": "Geometry",
  "right-triangle-calculator": "Geometry",
  "triangle-calculator": "Geometry",
  "surface-area-calculator": "Geometry",
  "binary-calculator": "Number Theory",
  "hex-calculator": "Number Theory",
  "lcm-calculator": "Number Theory",
  "gcf-calculator": "Number Theory",
  "prime-factorization-calculator": "Number Theory",
  "matrix-calculator": "Matrix & Linear Algebra",
  "determinant-calculator": "Matrix & Linear Algebra",
  "log-calculator": "Algebra",
  "exponent-calculator": "Algebra",
  "square-root-calculator": "Algebra",
  "cube-root-calculator": "Algebra",
  "gpa-calculator": "Grade Calculators",
  "grade-calculator": "Grade Calculators",
  "final-grade-calculator": "Grade Calculators",
};

const _mathCalculators: CalculatorConfig[] = [
  // 1. Percentage Increase
  {
    slug: "percentage-increase-calculator",
    name: "Percentage Increase Calculator",
    category: "Math",
    categorySlug: "math",
    description: "Calculate the percentage increase between two values quickly and accurately.",
    metaDescription: "Free percentage increase calculator. Find the percent change when a value goes up.",
    icon: "hash",
    inputs: [
      { id: "original", label: "Original Value", type: "number", defaultValue: 100 },
      { id: "newVal", label: "New Value", type: "number", defaultValue: 125 },
    ],
    calculate: (v) => {
      const increase = v.newVal - v.original;
      const pct = v.original !== 0 ? (increase / v.original) * 100 : 0;
      return [
        { label: "Percentage Increase", value: `${pct.toFixed(2)}%`, highlight: true },
        { label: "Absolute Increase", value: `${increase}` },
      ];
    },
    formula: { expression: "% Increase = ((New − Original) / Original) × 100", variables: ["New = New Value", "Original = Original Value"] },
    howToUse: "Enter the original and new values. The calculator shows the percentage and absolute increase.",
    faqs: [{ question: "Can this show negative results?", answer: "Yes — a negative result means the value actually decreased." }],
    relatedCalcs: mathRelated("percentage-increase-calculator"),
  },
  // 2. Percentage Decrease
  {
    slug: "percentage-decrease-calculator",
    name: "Percentage Decrease Calculator",
    category: "Math",
    categorySlug: "math",
    description: "Calculate the percentage decrease between two values.",
    metaDescription: "Free percentage decrease calculator. Find the percent drop between two numbers.",
    icon: "hash",
    inputs: [
      { id: "original", label: "Original Value", type: "number", defaultValue: 200 },
      { id: "newVal", label: "New Value", type: "number", defaultValue: 150 },
    ],
    calculate: (v) => {
      const decrease = v.original - v.newVal;
      const pct = v.original !== 0 ? (decrease / v.original) * 100 : 0;
      return [
        { label: "Percentage Decrease", value: `${pct.toFixed(2)}%`, highlight: true },
        { label: "Absolute Decrease", value: `${decrease}` },
      ];
    },
    formula: { expression: "% Decrease = ((Original − New) / Original) × 100", variables: ["Original = Starting Value", "New = Ending Value"] },
    howToUse: "Enter the original value and the new lower value.",
    faqs: [{ question: "What if the new value is higher?", answer: "The result will be negative, indicating an increase rather than a decrease." }],
    relatedCalcs: mathRelated("percentage-decrease-calculator"),
  },
  // 3. Fraction Calculator
  {
    slug: "fraction-calculator",
    name: "Fraction Calculator",
    category: "Math",
    categorySlug: "math",
    description: "Add, subtract, multiply, and divide fractions with step-by-step results.",
    metaDescription: "Free fraction calculator. Add, subtract, multiply, and divide fractions with simplified results.",
    icon: "hash",
    inputs: [
      { id: "num1", label: "Numerator 1", type: "number", defaultValue: 1 },
      { id: "den1", label: "Denominator 1", type: "number", defaultValue: 3 },
      { id: "op", label: "Operation", type: "select", defaultValue: 0, options: [{ value: 0, label: "Add (+)" }, { value: 1, label: "Subtract (−)" }, { value: 2, label: "Multiply (×)" }, { value: 3, label: "Divide (÷)" }] },
      { id: "num2", label: "Numerator 2", type: "number", defaultValue: 1 },
      { id: "den2", label: "Denominator 2", type: "number", defaultValue: 4 },
    ],
    calculate: (v) => {
      if (v.den1 === 0 || v.den2 === 0) return [{ label: "Error", value: "Denominator cannot be zero" }];
      let rNum: number, rDen: number;
      if (v.op === 0) { rNum = v.num1 * v.den2 + v.num2 * v.den1; rDen = v.den1 * v.den2; }
      else if (v.op === 1) { rNum = v.num1 * v.den2 - v.num2 * v.den1; rDen = v.den1 * v.den2; }
      else if (v.op === 2) { rNum = v.num1 * v.num2; rDen = v.den1 * v.den2; }
      else { rNum = v.num1 * v.den2; rDen = v.den1 * v.num2; }
      const gcdFn = (a: number, b: number): number => { a = Math.abs(a); b = Math.abs(b); return b === 0 ? a : gcdFn(b, a % b); };
      const g = gcdFn(rNum, rDen);
      const sNum = rNum / g;
      const sDen = rDen / g;
      const decimal = sDen !== 0 ? sNum / sDen : 0;
      return [
        { label: "Result (Fraction)", value: `${sNum}/${sDen}`, highlight: true },
        { label: "Decimal", value: decimal.toFixed(6) },
        { label: "Simplified", value: `${sNum}/${sDen}` },
      ];
    },
    formula: { expression: "a/b + c/d = (ad + bc) / bd", variables: ["Then simplify by GCD"] },
    howToUse: "Enter two fractions and select an operation. The calculator returns a simplified fraction and decimal equivalent.",
    faqs: [{ question: "What is GCD?", answer: "Greatest Common Divisor — the largest number that divides both numerator and denominator evenly." }],
    relatedCalcs: mathRelated("fraction-calculator"),
  },
  // 4. Mixed Fraction Calculator
  {
    slug: "mixed-fraction-calculator",
    name: "Mixed Fraction Calculator",
    category: "Math",
    categorySlug: "math",
    description: "Convert between mixed numbers and improper fractions, and perform arithmetic.",
    metaDescription: "Free mixed fraction calculator. Convert mixed numbers to improper fractions and perform operations.",
    icon: "hash",
    inputs: [
      { id: "whole", label: "Whole Number", type: "number", defaultValue: 2 },
      { id: "num", label: "Numerator", type: "number", defaultValue: 1 },
      { id: "den", label: "Denominator", type: "number", defaultValue: 3 },
    ],
    calculate: (v) => {
      if (v.den === 0) return [{ label: "Error", value: "Denominator cannot be zero" }];
      const improperNum = v.whole * v.den + v.num;
      const decimal = improperNum / v.den;
      return [
        { label: "Improper Fraction", value: `${improperNum}/${v.den}`, highlight: true },
        { label: "Mixed Number", value: `${v.whole} ${v.num}/${v.den}` },
        { label: "Decimal", value: decimal.toFixed(4) },
      ];
    },
    formula: { expression: "Improper = Whole × Denominator + Numerator", variables: ["Result over same denominator"] },
    howToUse: "Enter a whole number, numerator, and denominator to convert between mixed and improper fractions.",
    faqs: [{ question: "What is a mixed number?", answer: "A mixed number combines a whole number and a proper fraction, like 2⅓." }],
    relatedCalcs: mathRelated("mixed-fraction-calculator"),
  },
  // 5. Decimal to Fraction
  {
    slug: "decimal-to-fraction-calculator",
    name: "Decimal to Fraction Calculator",
    category: "Math",
    categorySlug: "math",
    description: "Convert any decimal number to its simplest fraction form.",
    metaDescription: "Free decimal to fraction converter. Convert decimals to simplified fractions instantly.",
    icon: "hash",
    inputs: [
      { id: "decimal", label: "Decimal Value", type: "number", defaultValue: 0.75, step: 0.001 },
    ],
    calculate: (v) => {
      const str = v.decimal.toString();
      const decPlaces = str.includes('.') ? str.split('.')[1].length : 0;
      let num = v.decimal * Math.pow(10, decPlaces);
      let den = Math.pow(10, decPlaces);
      const gcdFn = (a: number, b: number): number => { a = Math.abs(Math.round(a)); b = Math.abs(Math.round(b)); return b === 0 ? a : gcdFn(b, a % b); };
      const g = gcdFn(num, den);
      num = Math.round(num / g);
      den = Math.round(den / g);
      return [
        { label: "Fraction", value: `${num}/${den}`, highlight: true },
        { label: "Percentage", value: `${(v.decimal * 100).toFixed(2)}%` },
      ];
    },
    formula: { expression: "Multiply by 10^n, then simplify by GCD", variables: ["n = number of decimal places"] },
    howToUse: "Enter a decimal and the calculator converts it to its simplest fraction.",
    faqs: [{ question: "Can all decimals become fractions?", answer: "All terminating and repeating decimals can. Irrational numbers like π cannot be expressed as exact fractions." }],
    relatedCalcs: mathRelated("decimal-to-fraction-calculator"),
  },
  // 6. Fraction to Decimal
  {
    slug: "fraction-to-decimal-calculator",
    name: "Fraction to Decimal Calculator",
    category: "Math",
    categorySlug: "math",
    description: "Convert any fraction to its decimal and percentage equivalent.",
    metaDescription: "Free fraction to decimal converter. Convert fractions to decimals and percentages.",
    icon: "hash",
    inputs: [
      { id: "num", label: "Numerator", type: "number", defaultValue: 3 },
      { id: "den", label: "Denominator", type: "number", defaultValue: 8 },
    ],
    calculate: (v) => {
      if (v.den === 0) return [{ label: "Error", value: "Cannot divide by zero" }];
      const decimal = v.num / v.den;
      return [
        { label: "Decimal", value: decimal.toFixed(6), highlight: true },
        { label: "Percentage", value: `${(decimal * 100).toFixed(2)}%` },
      ];
    },
    formula: { expression: "Decimal = Numerator ÷ Denominator", variables: ["Simple division"] },
    howToUse: "Enter a numerator and denominator to get the decimal equivalent.",
    faqs: [{ question: "What about repeating decimals?", answer: "Fractions like 1/3 produce repeating decimals (0.333...). The calculator shows a rounded value." }],
    relatedCalcs: mathRelated("fraction-to-decimal-calculator"),
  },
  // 7. Scientific Calculator
  {
    slug: "scientific-calculator",
    name: "Scientific Calculator",
    category: "Math",
    categorySlug: "math",
    description: "Perform advanced calculations including trigonometry, logarithms, exponents, and roots.",
    metaDescription: "Free online scientific calculator. Compute trigonometric functions, logarithms, exponents, and more.",
    icon: "hash",
    inputs: [
      { id: "value", label: "Input Value", type: "number", defaultValue: 45, step: 0.001 },
      { id: "func", label: "Function", type: "select", defaultValue: 0, options: [{ value: 0, label: "sin" }, { value: 1, label: "cos" }, { value: 2, label: "tan" }, { value: 3, label: "log₁₀" }, { value: 4, label: "ln" }, { value: 5, label: "√ (sqrt)" }, { value: 6, label: "x²" }, { value: 7, label: "x³" }] },
    ],
    calculate: (v) => {
      const rad = v.value * Math.PI / 180;
      let result: number;
      let name: string;
      switch (v.func) {
        case 0: result = Math.sin(rad); name = `sin(${v.value}°)`; break;
        case 1: result = Math.cos(rad); name = `cos(${v.value}°)`; break;
        case 2: result = Math.tan(rad); name = `tan(${v.value}°)`; break;
        case 3: result = Math.log10(v.value); name = `log₁₀(${v.value})`; break;
        case 4: result = Math.log(v.value); name = `ln(${v.value})`; break;
        case 5: result = Math.sqrt(v.value); name = `√${v.value}`; break;
        case 6: result = v.value ** 2; name = `${v.value}²`; break;
        case 7: result = v.value ** 3; name = `${v.value}³`; break;
        default: result = v.value; name = String(v.value);
      }
      return [
        { label: name, value: result.toFixed(8), highlight: true },
        { label: "Rounded", value: `${parseFloat(result.toFixed(6))}` },
      ];
    },
    formula: { expression: "Various: sin, cos, tan, log, ln, √, x², x³", variables: ["Trig uses degrees input", "log is base-10, ln is natural"] },
    howToUse: "Enter a value and select a function. Trigonometric functions use degrees.",
    faqs: [{ question: "Are trig values in degrees or radians?", answer: "This calculator accepts degrees and converts to radians internally for computation." }],
    relatedCalcs: mathRelated("scientific-calculator"),
  },
  // 8. Standard Deviation
  {
    slug: "standard-deviation-calculator",
    name: "Standard Deviation Calculator",
    category: "Math",
    categorySlug: "math",
    description: "Calculate the mean, variance, and standard deviation of a data set.",
    metaDescription: "Free standard deviation calculator. Compute mean, variance, and standard deviation for any data set.",
    icon: "hash",
    inputs: [
      { id: "v1", label: "Value 1", type: "number", defaultValue: 10 },
      { id: "v2", label: "Value 2", type: "number", defaultValue: 12 },
      { id: "v3", label: "Value 3", type: "number", defaultValue: 23 },
      { id: "v4", label: "Value 4", type: "number", defaultValue: 23 },
      { id: "v5", label: "Value 5", type: "number", defaultValue: 16 },
    ],
    calculate: (v) => {
      const data = [v.v1, v.v2, v.v3, v.v4, v.v5].filter(x => !isNaN(x));
      const n = data.length;
      if (n === 0) return [{ label: "Error", value: "Enter values" }];
      const mean = data.reduce((a, b) => a + b, 0) / n;
      const variance = data.reduce((sum, x) => sum + (x - mean) ** 2, 0) / n;
      const sd = Math.sqrt(variance);
      return [
        { label: "Standard Deviation", value: sd.toFixed(4), highlight: true },
        { label: "Mean", value: mean.toFixed(4) },
        { label: "Variance", value: variance.toFixed(4) },
        { label: "Count", value: `${n}` },
      ];
    },
    formula: { expression: "σ = √(Σ(xᵢ − μ)² / N)", variables: ["μ = Mean", "N = Count", "Population SD"] },
    howToUse: "Enter up to 5 values. The calculator computes mean, variance, and standard deviation.",
    faqs: [{ question: "Population vs Sample SD?", answer: "This calculator uses population SD (÷N). For sample SD, divide by N−1. Sample SD is used when your data is a subset of a larger population." }],
    relatedCalcs: mathRelated("standard-deviation-calculator"),
  },
  // 9. Mean Median Mode
  {
    slug: "mean-median-mode-calculator",
    name: "Mean Median Mode Calculator",
    category: "Math",
    categorySlug: "math",
    description: "Find the mean, median, and mode of a data set for statistical analysis.",
    metaDescription: "Free mean, median, and mode calculator. Analyze data sets with measures of central tendency.",
    icon: "hash",
    inputs: [
      { id: "v1", label: "Value 1", type: "number", defaultValue: 5 },
      { id: "v2", label: "Value 2", type: "number", defaultValue: 8 },
      { id: "v3", label: "Value 3", type: "number", defaultValue: 8 },
      { id: "v4", label: "Value 4", type: "number", defaultValue: 12 },
      { id: "v5", label: "Value 5", type: "number", defaultValue: 15 },
    ],
    calculate: (v) => {
      const data = [v.v1, v.v2, v.v3, v.v4, v.v5].sort((a, b) => a - b);
      const n = data.length;
      const mean = data.reduce((a, b) => a + b, 0) / n;
      const median = n % 2 === 0 ? (data[n / 2 - 1] + data[n / 2]) / 2 : data[Math.floor(n / 2)];
      const freq: Record<number, number> = {};
      data.forEach(x => { freq[x] = (freq[x] || 0) + 1; });
      const maxFreq = Math.max(...Object.values(freq));
      const modes = Object.keys(freq).filter(k => freq[Number(k)] === maxFreq).map(Number);
      const range = data[n - 1] - data[0];
      return [
        { label: "Mean", value: mean.toFixed(2), highlight: true },
        { label: "Median", value: `${median}` },
        { label: "Mode", value: maxFreq > 1 ? modes.join(", ") : "No mode" },
        { label: "Range", value: `${range}` },
      ];
    },
    formula: { expression: "Mean = Σx / n; Median = middle value; Mode = most frequent", variables: ["n = number of values"] },
    howToUse: "Enter up to 5 values to find the mean, median, mode, and range.",
    faqs: [{ question: "What if there are multiple modes?", answer: "A data set can be bimodal or multimodal if multiple values share the highest frequency." }],
    relatedCalcs: mathRelated("mean-median-mode-calculator"),
  },
  // 10. Probability
  {
    slug: "probability-calculator",
    name: "Probability Calculator",
    category: "Math",
    categorySlug: "math",
    description: "Calculate the probability of single and combined events, including AND/OR probabilities.",
    metaDescription: "Free probability calculator. Compute probability of single events, union, and intersection of two events.",
    icon: "hash",
    inputs: [
      { id: "pA", label: "P(A) — Probability of A", type: "number", defaultValue: 0.5, step: 0.01, min: 0, max: 1 },
      { id: "pB", label: "P(B) — Probability of B", type: "number", defaultValue: 0.3, step: 0.01, min: 0, max: 1 },
    ],
    calculate: (v) => {
      const pAnd = v.pA * v.pB;
      const pOr = v.pA + v.pB - pAnd;
      const pNotA = 1 - v.pA;
      return [
        { label: "P(A and B)", value: `${(pAnd * 100).toFixed(2)}%`, highlight: true },
        { label: "P(A or B)", value: `${(pOr * 100).toFixed(2)}%` },
        { label: "P(not A)", value: `${(pNotA * 100).toFixed(2)}%` },
      ];
    },
    formula: { expression: "P(A∩B) = P(A)×P(B); P(A∪B) = P(A)+P(B)−P(A∩B)", variables: ["Assumes independent events"] },
    howToUse: "Enter the probability of events A and B (between 0 and 1) to compute combined probabilities.",
    faqs: [{ question: "What does independent mean?", answer: "Independent events don't affect each other. The outcome of A doesn't change the probability of B." }],
    relatedCalcs: mathRelated("probability-calculator"),
  },
  // 11. Permutation and Combination
  {
    slug: "permutation-combination-calculator",
    name: "Permutation & Combination Calculator",
    category: "Math",
    categorySlug: "math",
    description: "Calculate permutations (nPr) and combinations (nCr) for any n and r values.",
    metaDescription: "Free permutation and combination calculator. Compute nPr and nCr with factorials.",
    icon: "hash",
    inputs: [
      { id: "n", label: "n (total items)", type: "number", defaultValue: 10, min: 0 },
      { id: "r", label: "r (chosen items)", type: "number", defaultValue: 3, min: 0 },
    ],
    calculate: (v) => {
      const fact = (x: number): number => { if (x <= 1) return 1; let r = 1; for (let i = 2; i <= x; i++) r *= i; return r; };
      if (v.r > v.n || v.n < 0 || v.r < 0) return [{ label: "Error", value: "r must be ≤ n, both ≥ 0" }];
      const nPr = fact(v.n) / fact(v.n - v.r);
      const nCr = fact(v.n) / (fact(v.r) * fact(v.n - v.r));
      return [
        { label: "Permutations (nPr)", value: nPr.toLocaleString(), highlight: true },
        { label: "Combinations (nCr)", value: nCr.toLocaleString() },
        { label: `${v.n}!`, value: fact(v.n).toLocaleString() },
      ];
    },
    formula: { expression: "nPr = n!/(n−r)!; nCr = n!/(r!(n−r)!)", variables: ["n = total", "r = chosen", "! = factorial"] },
    howToUse: "Enter n (total items) and r (items to choose) to get permutations and combinations.",
    faqs: [{ question: "When do I use permutations vs combinations?", answer: "Use permutations when order matters (e.g., rankings). Use combinations when order doesn't matter (e.g., choosing a committee)." }],
    relatedCalcs: mathRelated("permutation-combination-calculator"),
  },
  // 12. Quadratic Equation
  {
    slug: "quadratic-equation-calculator",
    name: "Quadratic Equation Calculator",
    category: "Math",
    categorySlug: "math",
    description: "Solve quadratic equations (ax² + bx + c = 0) and find roots using the quadratic formula.",
    metaDescription: "Free quadratic equation solver. Find real and complex roots of ax² + bx + c = 0.",
    icon: "hash",
    inputs: [
      { id: "a", label: "a (coefficient of x²)", type: "number", defaultValue: 1, step: 0.1 },
      { id: "b", label: "b (coefficient of x)", type: "number", defaultValue: -5, step: 0.1 },
      { id: "c", label: "c (constant)", type: "number", defaultValue: 6, step: 0.1 },
    ],
    calculate: (v) => {
      if (v.a === 0) return [{ label: "Error", value: "a cannot be 0 (not quadratic)" }];
      const disc = v.b ** 2 - 4 * v.a * v.c;
      if (disc >= 0) {
        const x1 = (-v.b + Math.sqrt(disc)) / (2 * v.a);
        const x2 = (-v.b - Math.sqrt(disc)) / (2 * v.a);
        return [
          { label: "x₁", value: x1.toFixed(4), highlight: true },
          { label: "x₂", value: x2.toFixed(4) },
          { label: "Discriminant", value: disc.toFixed(2) },
          { label: "Vertex x", value: `${(-v.b / (2 * v.a)).toFixed(4)}` },
        ];
      } else {
        const real = (-v.b / (2 * v.a)).toFixed(4);
        const imag = (Math.sqrt(-disc) / (2 * v.a)).toFixed(4);
        return [
          { label: "x₁", value: `${real} + ${imag}i`, highlight: true },
          { label: "x₂", value: `${real} − ${imag}i` },
          { label: "Discriminant", value: `${disc.toFixed(2)} (complex roots)` },
        ];
      }
    },
    formula: { expression: "x = (−b ± √(b²−4ac)) / 2a", variables: ["a, b, c are coefficients", "Δ = b²−4ac (discriminant)"] },
    howToUse: "Enter the coefficients a, b, and c of your quadratic equation ax² + bx + c = 0.",
    faqs: [{ question: "What if the discriminant is negative?", answer: "When b²−4ac < 0, the equation has two complex conjugate roots." }],
    relatedCalcs: mathRelated("quadratic-equation-calculator"),
  },
  // 13. Linear Equation
  {
    slug: "linear-equation-calculator",
    name: "Linear Equation Calculator",
    category: "Math",
    categorySlug: "math",
    description: "Solve linear equations in the form ax + b = c for x.",
    metaDescription: "Free linear equation solver. Solve ax + b = c and find x.",
    icon: "hash",
    inputs: [
      { id: "a", label: "a (coefficient)", type: "number", defaultValue: 3, step: 0.1 },
      { id: "b", label: "b (constant left)", type: "number", defaultValue: 7, step: 0.1 },
      { id: "c", label: "c (right side)", type: "number", defaultValue: 22, step: 0.1 },
    ],
    calculate: (v) => {
      if (v.a === 0) return [{ label: "Error", value: v.b === v.c ? "Infinite solutions" : "No solution" }];
      const x = (v.c - v.b) / v.a;
      return [
        { label: "x =", value: x.toFixed(6), highlight: true },
        { label: "Equation", value: `${v.a}x + ${v.b} = ${v.c}` },
      ];
    },
    formula: { expression: "x = (c − b) / a", variables: ["ax + b = c"] },
    howToUse: "Enter a, b, and c for the equation ax + b = c.",
    faqs: [{ question: "What if a is zero?", answer: "If a=0 and b=c, there are infinite solutions. If a=0 and b≠c, there's no solution." }],
    relatedCalcs: mathRelated("linear-equation-calculator"),
  },
  // 14. Matrix Calculator (2x2 determinant)
  {
    slug: "matrix-calculator",
    name: "Matrix Calculator",
    category: "Math",
    categorySlug: "math",
    description: "Calculate the determinant and inverse of a 2×2 matrix.",
    metaDescription: "Free 2x2 matrix calculator. Compute determinant, inverse, and trace of 2×2 matrices.",
    icon: "hash",
    inputs: [
      { id: "a11", label: "a₁₁ (top-left)", type: "number", defaultValue: 4 },
      { id: "a12", label: "a₁₂ (top-right)", type: "number", defaultValue: 7 },
      { id: "a21", label: "a₂₁ (bottom-left)", type: "number", defaultValue: 2 },
      { id: "a22", label: "a₂₂ (bottom-right)", type: "number", defaultValue: 6 },
    ],
    calculate: (v) => {
      const det = v.a11 * v.a22 - v.a12 * v.a21;
      const trace = v.a11 + v.a22;
      return [
        { label: "Determinant", value: det.toFixed(4), highlight: true },
        { label: "Trace", value: trace.toFixed(4) },
        { label: "Invertible?", value: det !== 0 ? "Yes" : "No (singular)" },
      ];
    },
    formula: { expression: "det = a₁₁×a₂₂ − a₁₂×a₂₁", variables: ["trace = a₁₁ + a₂₂"] },
    howToUse: "Enter the four elements of a 2×2 matrix to compute its determinant and trace.",
    faqs: [{ question: "What does the determinant tell us?", answer: "If det≠0, the matrix is invertible. The absolute value represents the area scaling factor of the linear transformation." }],
    relatedCalcs: mathRelated("matrix-calculator"),
  },
  // 15. Determinant Calculator (same as matrix for 2x2 — could be 3x3)
  {
    slug: "determinant-calculator",
    name: "Determinant Calculator",
    category: "Math",
    categorySlug: "math",
    description: "Calculate the determinant of a 3×3 matrix using cofactor expansion.",
    metaDescription: "Free 3x3 determinant calculator. Compute the determinant of a 3×3 matrix step by step.",
    icon: "hash",
    inputs: [
      { id: "a", label: "Row 1: a", type: "number", defaultValue: 1 },
      { id: "b", label: "Row 1: b", type: "number", defaultValue: 2 },
      { id: "c", label: "Row 1: c", type: "number", defaultValue: 3 },
      { id: "d", label: "Row 2: d", type: "number", defaultValue: 4 },
      { id: "e", label: "Row 2: e", type: "number", defaultValue: 5 },
      { id: "f", label: "Row 2: f", type: "number", defaultValue: 6 },
      { id: "g", label: "Row 3: g", type: "number", defaultValue: 7 },
      { id: "h", label: "Row 3: h", type: "number", defaultValue: 8 },
      { id: "i", label: "Row 3: i", type: "number", defaultValue: 0 },
    ],
    calculate: (v) => {
      const det = v.a * (v.e * v.i - v.f * v.h) - v.b * (v.d * v.i - v.f * v.g) + v.c * (v.d * v.h - v.e * v.g);
      return [
        { label: "Determinant", value: det.toFixed(4), highlight: true },
        { label: "Invertible?", value: det !== 0 ? "Yes" : "No (singular)" },
      ];
    },
    formula: { expression: "det = a(ei−fh) − b(di−fg) + c(dh−eg)", variables: ["Cofactor expansion along row 1"] },
    howToUse: "Enter the 9 elements of a 3×3 matrix (row by row) to compute its determinant.",
    faqs: [{ question: "What is cofactor expansion?", answer: "It recursively breaks down an n×n determinant into smaller (n−1)×(n−1) determinants multiplied by their cofactors." }],
    relatedCalcs: mathRelated("determinant-calculator"),
  },
  // 16. Log Calculator
  {
    slug: "log-calculator",
    name: "Log Calculator",
    category: "Math",
    categorySlug: "math",
    description: "Calculate logarithms in any base including common (log₁₀) and natural (ln) logarithms.",
    metaDescription: "Free logarithm calculator. Compute log base 10, natural log, and custom base logarithms.",
    icon: "hash",
    inputs: [
      { id: "value", label: "Value", type: "number", defaultValue: 100, step: 0.01, min: 0.001 },
      { id: "base", label: "Base", type: "number", defaultValue: 10, step: 0.1, min: 0.001 },
    ],
    calculate: (v) => {
      if (v.value <= 0 || v.base <= 0 || v.base === 1) return [{ label: "Error", value: "Value > 0, Base > 0 and ≠ 1" }];
      const result = Math.log(v.value) / Math.log(v.base);
      return [
        { label: `log₍${v.base}₎(${v.value})`, value: result.toFixed(6), highlight: true },
        { label: "log₁₀", value: Math.log10(v.value).toFixed(6) },
        { label: "ln (natural)", value: Math.log(v.value).toFixed(6) },
      ];
    },
    formula: { expression: "logₐ(x) = ln(x) / ln(a)", variables: ["Change of base formula", "a = base, x = value"] },
    howToUse: "Enter the value and base to compute the logarithm. Also shows log₁₀ and ln.",
    faqs: [{ question: "What is the natural log?", answer: "ln is the logarithm base e (≈2.71828). It's fundamental in calculus and appears naturally in growth/decay processes." }],
    relatedCalcs: mathRelated("log-calculator"),
  },
  // 17. Exponent Calculator
  {
    slug: "exponent-calculator",
    name: "Exponent Calculator",
    category: "Math",
    categorySlug: "math",
    description: "Calculate the result of raising a number to any power (xⁿ).",
    metaDescription: "Free exponent calculator. Compute x raised to the power n for any base and exponent.",
    icon: "hash",
    inputs: [
      { id: "base", label: "Base (x)", type: "number", defaultValue: 2, step: 0.1 },
      { id: "exp", label: "Exponent (n)", type: "number", defaultValue: 10, step: 0.1 },
    ],
    calculate: (v) => {
      const result = Math.pow(v.base, v.exp);
      return [
        { label: `${v.base}^${v.exp}`, value: result.toLocaleString(undefined, { maximumFractionDigits: 6 }), highlight: true },
        { label: "Scientific Notation", value: result.toExponential(4) },
      ];
    },
    formula: { expression: "Result = x^n", variables: ["x = base", "n = exponent"] },
    howToUse: "Enter a base and exponent. The calculator computes x raised to the power n.",
    faqs: [{ question: "What is a negative exponent?", answer: "x⁻ⁿ = 1/xⁿ. For example, 2⁻³ = 1/8 = 0.125." }],
    relatedCalcs: mathRelated("exponent-calculator"),
  },
  // 18. Square Root
  {
    slug: "square-root-calculator",
    name: "Square Root Calculator",
    category: "Math",
    categorySlug: "math",
    description: "Calculate the square root of any number, including checking if it's a perfect square.",
    metaDescription: "Free square root calculator. Find √x and check if a number is a perfect square.",
    icon: "hash",
    inputs: [
      { id: "value", label: "Number", type: "number", defaultValue: 144, step: 0.01 },
    ],
    calculate: (v) => {
      if (v.value < 0) return [{ label: "Error", value: "Cannot take √ of negative number (real)" }];
      const sqrt = Math.sqrt(v.value);
      const isPerfect = Number.isInteger(sqrt);
      return [
        { label: `√${v.value}`, value: sqrt.toFixed(6), highlight: true },
        { label: "Perfect Square?", value: isPerfect ? "Yes" : "No" },
        { label: "Squared Back", value: `${v.value}` },
      ];
    },
    formula: { expression: "√x = x^(1/2)", variables: ["x must be ≥ 0 for real results"] },
    howToUse: "Enter a number to find its square root.",
    faqs: [{ question: "What is a perfect square?", answer: "A number whose square root is a whole integer, e.g., 4, 9, 16, 25, 36..." }],
    relatedCalcs: mathRelated("square-root-calculator"),
  },
  // 19. Cube Root
  {
    slug: "cube-root-calculator",
    name: "Cube Root Calculator",
    category: "Math",
    categorySlug: "math",
    description: "Calculate the cube root of any number, including negative numbers.",
    metaDescription: "Free cube root calculator. Find ∛x for any number including negatives.",
    icon: "hash",
    inputs: [
      { id: "value", label: "Number", type: "number", defaultValue: 27, step: 0.01 },
    ],
    calculate: (v) => {
      const cbrt = Math.cbrt(v.value);
      const isPerfect = Number.isInteger(cbrt);
      return [
        { label: `∛${v.value}`, value: cbrt.toFixed(6), highlight: true },
        { label: "Perfect Cube?", value: isPerfect ? "Yes" : "No" },
      ];
    },
    formula: { expression: "∛x = x^(1/3)", variables: ["Works for negative numbers too"] },
    howToUse: "Enter any number (positive or negative) to find its cube root.",
    faqs: [{ question: "Can you cube root negatives?", answer: "Yes. For example, ∛(−27) = −3, because (−3)³ = −27." }],
    relatedCalcs: mathRelated("cube-root-calculator"),
  },
  // 20. LCM
  {
    slug: "lcm-calculator",
    name: "LCM Calculator",
    category: "Math",
    categorySlug: "math",
    description: "Calculate the Least Common Multiple (LCM) of two or three numbers.",
    metaDescription: "Free LCM calculator. Find the least common multiple of two or three numbers.",
    icon: "hash",
    inputs: [
      { id: "a", label: "Number 1", type: "number", defaultValue: 12, min: 1 },
      { id: "b", label: "Number 2", type: "number", defaultValue: 18, min: 1 },
    ],
    calculate: (v) => {
      const gcdFn = (a: number, b: number): number => { a = Math.abs(a); b = Math.abs(b); return b === 0 ? a : gcdFn(b, a % b); };
      const lcm = Math.abs(v.a * v.b) / gcdFn(v.a, v.b);
      const gcd = gcdFn(v.a, v.b);
      return [
        { label: "LCM", value: lcm.toLocaleString(), highlight: true },
        { label: "GCD", value: gcd.toLocaleString() },
        { label: "Product", value: (v.a * v.b).toLocaleString() },
      ];
    },
    formula: { expression: "LCM(a,b) = |a×b| / GCD(a,b)", variables: ["GCD = Greatest Common Divisor"] },
    howToUse: "Enter two numbers to find their LCM and GCD.",
    faqs: [{ question: "What is LCM used for?", answer: "LCM is used to find common denominators for fractions, schedule timing problems, and determine repeating patterns." }],
    relatedCalcs: mathRelated("lcm-calculator"),
  },
  // 21. GCF
  {
    slug: "gcf-calculator",
    name: "GCF Calculator",
    category: "Math",
    categorySlug: "math",
    description: "Calculate the Greatest Common Factor (GCF) of two numbers using the Euclidean algorithm.",
    metaDescription: "Free GCF/GCD calculator. Find the greatest common factor of any two numbers.",
    icon: "hash",
    inputs: [
      { id: "a", label: "Number 1", type: "number", defaultValue: 48, min: 1 },
      { id: "b", label: "Number 2", type: "number", defaultValue: 36, min: 1 },
    ],
    calculate: (v) => {
      const gcdFn = (a: number, b: number): number => { a = Math.abs(a); b = Math.abs(b); return b === 0 ? a : gcdFn(b, a % b); };
      const gcd = gcdFn(v.a, v.b);
      const lcm = Math.abs(v.a * v.b) / gcd;
      return [
        { label: "GCF (GCD)", value: gcd.toLocaleString(), highlight: true },
        { label: "LCM", value: lcm.toLocaleString() },
      ];
    },
    formula: { expression: "GCD via Euclidean: GCD(a,b) = GCD(b, a mod b)", variables: ["Recurse until remainder = 0"] },
    howToUse: "Enter two numbers to find their GCF using the Euclidean algorithm.",
    faqs: [{ question: "Is GCF the same as GCD?", answer: "Yes. GCF (Greatest Common Factor) and GCD (Greatest Common Divisor) mean the same thing." }],
    relatedCalcs: mathRelated("gcf-calculator"),
  },
  // 22. Prime Factorization
  {
    slug: "prime-factorization-calculator",
    name: "Prime Factorization Calculator",
    category: "Math",
    categorySlug: "math",
    description: "Find the prime factorization of any positive integer.",
    metaDescription: "Free prime factorization calculator. Break down any number into its prime factors.",
    icon: "hash",
    inputs: [
      { id: "n", label: "Number", type: "number", defaultValue: 360, min: 2 },
    ],
    calculate: (v) => {
      let n = Math.floor(Math.abs(v.n));
      if (n < 2) return [{ label: "Error", value: "Enter a number ≥ 2" }];
      const factors: number[] = [];
      for (let d = 2; d * d <= n; d++) {
        while (n % d === 0) { factors.push(d); n /= d; }
      }
      if (n > 1) factors.push(n);
      const unique = [...new Set(factors)];
      const isPrime = factors.length === 1;
      return [
        { label: "Prime Factors", value: factors.join(" × "), highlight: true },
        { label: "Unique Primes", value: unique.join(", ") },
        { label: "Is Prime?", value: isPrime ? "Yes" : "No" },
        { label: "Number of Factors", value: `${factors.length}` },
      ];
    },
    formula: { expression: "Divide by smallest prime repeatedly", variables: ["Trial division method"] },
    howToUse: "Enter a positive integer ≥ 2 to see its complete prime factorization.",
    faqs: [{ question: "Why is prime factorization important?", answer: "It's fundamental in number theory, cryptography (RSA), finding LCM/GCD, and simplifying fractions." }],
    relatedCalcs: mathRelated("prime-factorization-calculator"),
  },
  // 23. GPA Calculator
  {
    slug: "gpa-calculator",
    name: "GPA Calculator",
    category: "Math",
    categorySlug: "math",
    description: "Calculate your Grade Point Average (GPA) based on course grades and credit hours.",
    metaDescription: "Free GPA calculator. Compute your cumulative GPA from course grades and credit hours.",
    icon: "hash",
    inputs: [
      { id: "g1", label: "Course 1 Grade (0-4)", type: "number", defaultValue: 3.5, step: 0.1, min: 0, max: 4 },
      { id: "c1", label: "Course 1 Credits", type: "number", defaultValue: 3, min: 1 },
      { id: "g2", label: "Course 2 Grade (0-4)", type: "number", defaultValue: 4.0, step: 0.1, min: 0, max: 4 },
      { id: "c2", label: "Course 2 Credits", type: "number", defaultValue: 4, min: 1 },
      { id: "g3", label: "Course 3 Grade (0-4)", type: "number", defaultValue: 3.0, step: 0.1, min: 0, max: 4 },
      { id: "c3", label: "Course 3 Credits", type: "number", defaultValue: 3, min: 1 },
    ],
    calculate: (v) => {
      const totalPoints = v.g1 * v.c1 + v.g2 * v.c2 + v.g3 * v.c3;
      const totalCredits = v.c1 + v.c2 + v.c3;
      const gpa = totalPoints / totalCredits;
      let letterEst = "A";
      if (gpa >= 3.7) letterEst = "A/A−";
      else if (gpa >= 3.3) letterEst = "B+";
      else if (gpa >= 3.0) letterEst = "B";
      else if (gpa >= 2.7) letterEst = "B−";
      else if (gpa >= 2.0) letterEst = "C";
      else letterEst = "Below C";
      return [
        { label: "GPA", value: gpa.toFixed(2), highlight: true },
        { label: "Total Credits", value: `${totalCredits}` },
        { label: "Estimated Letter", value: letterEst },
      ];
    },
    formula: { expression: "GPA = Σ(Grade × Credits) / Σ(Credits)", variables: ["A = 4.0, B = 3.0, C = 2.0, D = 1.0"] },
    howToUse: "Enter grade points (0-4 scale) and credit hours for each course.",
    faqs: [{ question: "What is a good GPA?", answer: "A GPA of 3.0+ (B average) is generally considered good. 3.5+ is very good, and 3.7+ is excellent." }],
    relatedCalcs: mathRelated("gpa-calculator"),
  },
  // 24. Grade Calculator
  {
    slug: "grade-calculator",
    name: "Grade Calculator",
    category: "Math",
    categorySlug: "math",
    description: "Calculate your weighted grade from multiple assignments with different weights.",
    metaDescription: "Free grade calculator. Compute weighted grades from assignments, tests, and projects.",
    icon: "hash",
    inputs: [
      { id: "s1", label: "Score 1 (%)", type: "number", defaultValue: 85, min: 0, max: 100 },
      { id: "w1", label: "Weight 1 (%)", type: "number", defaultValue: 30, min: 0 },
      { id: "s2", label: "Score 2 (%)", type: "number", defaultValue: 92, min: 0, max: 100 },
      { id: "w2", label: "Weight 2 (%)", type: "number", defaultValue: 40, min: 0 },
      { id: "s3", label: "Score 3 (%)", type: "number", defaultValue: 78, min: 0, max: 100 },
      { id: "w3", label: "Weight 3 (%)", type: "number", defaultValue: 30, min: 0 },
    ],
    calculate: (v) => {
      const totalWeight = v.w1 + v.w2 + v.w3;
      if (totalWeight === 0) return [{ label: "Error", value: "Weights must sum to > 0" }];
      const grade = (v.s1 * v.w1 + v.s2 * v.w2 + v.s3 * v.w3) / totalWeight;
      let letter = "A";
      if (grade >= 90) letter = "A";
      else if (grade >= 80) letter = "B";
      else if (grade >= 70) letter = "C";
      else if (grade >= 60) letter = "D";
      else letter = "F";
      return [
        { label: "Weighted Grade", value: `${grade.toFixed(1)}%`, highlight: true },
        { label: "Letter Grade", value: letter },
        { label: "Total Weight", value: `${totalWeight}%` },
      ];
    },
    formula: { expression: "Grade = Σ(Score × Weight) / Σ(Weight)", variables: ["Each component has a score and weight %"] },
    howToUse: "Enter scores and weights for each assignment. Weights should ideally sum to 100%.",
    faqs: [{ question: "What if weights don't add to 100%?", answer: "The calculator normalizes by dividing by total weight, so it works with any total." }],
    relatedCalcs: mathRelated("grade-calculator"),
  },
  // 25. Final Grade
  {
    slug: "final-grade-calculator",
    name: "Final Grade Calculator",
    category: "Math",
    categorySlug: "math",
    description: "Calculate what grade you need on your final exam to achieve your target course grade.",
    metaDescription: "Free final grade calculator. Find out what score you need on the final to get your desired grade.",
    icon: "hash",
    inputs: [
      { id: "current", label: "Current Grade (%)", type: "number", defaultValue: 82, min: 0, max: 100 },
      { id: "target", label: "Target Grade (%)", type: "number", defaultValue: 90, min: 0, max: 100 },
      { id: "finalWeight", label: "Final Exam Weight (%)", type: "number", defaultValue: 30, min: 1, max: 100 },
    ],
    calculate: (v) => {
      const needed = (v.target - v.current * (1 - v.finalWeight / 100)) / (v.finalWeight / 100);
      return [
        { label: "Needed on Final", value: `${needed.toFixed(1)}%`, highlight: true },
        { label: "Current Grade", value: `${v.current}%` },
        { label: "Achievable?", value: needed <= 100 ? "Yes ✓" : "Difficult (>100% needed)" },
      ];
    },
    formula: { expression: "Needed = (Target − Current×(1−w)) / w", variables: ["w = Final exam weight as decimal"] },
    howToUse: "Enter your current grade, desired final grade, and the weight of the final exam.",
    faqs: [{ question: "What if I need more than 100%?", answer: "You would need extra credit or to adjust your target grade downward." }],
    relatedCalcs: mathRelated("final-grade-calculator"),
  },
  // 26. Slope
  {
    slug: "slope-calculator",
    name: "Slope Calculator",
    category: "Math",
    categorySlug: "math",
    description: "Calculate the slope between two points and get the equation of the line.",
    metaDescription: "Free slope calculator. Find the slope, y-intercept, and equation of a line from two points.",
    icon: "hash",
    inputs: [
      { id: "x1", label: "x₁", type: "number", defaultValue: 1, step: 0.1 },
      { id: "y1", label: "y₁", type: "number", defaultValue: 2, step: 0.1 },
      { id: "x2", label: "x₂", type: "number", defaultValue: 4, step: 0.1 },
      { id: "y2", label: "y₂", type: "number", defaultValue: 8, step: 0.1 },
    ],
    calculate: (v) => {
      if (v.x1 === v.x2) return [{ label: "Slope", value: "Undefined (vertical line)", highlight: true }];
      const m = (v.y2 - v.y1) / (v.x2 - v.x1);
      const b = v.y1 - m * v.x1;
      const dist = Math.sqrt((v.x2 - v.x1) ** 2 + (v.y2 - v.y1) ** 2);
      return [
        { label: "Slope (m)", value: m.toFixed(4), highlight: true },
        { label: "Equation", value: `y = ${m.toFixed(2)}x + ${b.toFixed(2)}` },
        { label: "Y-Intercept", value: b.toFixed(4) },
        { label: "Distance", value: dist.toFixed(4) },
      ];
    },
    formula: { expression: "m = (y₂−y₁) / (x₂−x₁)", variables: ["Two points: (x₁,y₁) and (x₂,y₂)"] },
    howToUse: "Enter two points (x₁,y₁) and (x₂,y₂) to find the slope and line equation.",
    faqs: [{ question: "What does undefined slope mean?", answer: "A vertical line (x₁=x₂) has undefined slope because you'd divide by zero." }],
    relatedCalcs: mathRelated("slope-calculator"),
  },
  // 27. Distance Formula
  {
    slug: "distance-formula-calculator",
    name: "Distance Formula Calculator",
    category: "Math",
    categorySlug: "math",
    description: "Calculate the distance between two points in a 2D coordinate plane.",
    metaDescription: "Free distance formula calculator. Find the distance between two points (x₁,y₁) and (x₂,y₂).",
    icon: "hash",
    inputs: [
      { id: "x1", label: "x₁", type: "number", defaultValue: 0, step: 0.1 },
      { id: "y1", label: "y₁", type: "number", defaultValue: 0, step: 0.1 },
      { id: "x2", label: "x₂", type: "number", defaultValue: 3, step: 0.1 },
      { id: "y2", label: "y₂", type: "number", defaultValue: 4, step: 0.1 },
    ],
    calculate: (v) => {
      const d = Math.sqrt((v.x2 - v.x1) ** 2 + (v.y2 - v.y1) ** 2);
      return [
        { label: "Distance", value: d.toFixed(6), highlight: true },
        { label: "Δx", value: `${(v.x2 - v.x1).toFixed(2)}` },
        { label: "Δy", value: `${(v.y2 - v.y1).toFixed(2)}` },
      ];
    },
    formula: { expression: "d = √((x₂−x₁)² + (y₂−y₁)²)", variables: ["Euclidean distance in 2D"] },
    howToUse: "Enter two coordinate pairs to calculate the straight-line distance between them.",
    faqs: [{ question: "Does this work in 3D?", answer: "This calculator is for 2D. For 3D, add (z₂−z₁)² under the square root." }],
    relatedCalcs: mathRelated("distance-formula-calculator"),
  },
  // 28. Midpoint
  {
    slug: "midpoint-calculator",
    name: "Midpoint Calculator",
    category: "Math",
    categorySlug: "math",
    description: "Find the midpoint between two points on a coordinate plane.",
    metaDescription: "Free midpoint calculator. Find the midpoint between two coordinate points.",
    icon: "hash",
    inputs: [
      { id: "x1", label: "x₁", type: "number", defaultValue: 2, step: 0.1 },
      { id: "y1", label: "y₁", type: "number", defaultValue: 3, step: 0.1 },
      { id: "x2", label: "x₂", type: "number", defaultValue: 8, step: 0.1 },
      { id: "y2", label: "y₂", type: "number", defaultValue: 7, step: 0.1 },
    ],
    calculate: (v) => {
      const mx = (v.x1 + v.x2) / 2;
      const my = (v.y1 + v.y2) / 2;
      const dist = Math.sqrt((v.x2 - v.x1) ** 2 + (v.y2 - v.y1) ** 2);
      return [
        { label: "Midpoint", value: `(${mx.toFixed(2)}, ${my.toFixed(2)})`, highlight: true },
        { label: "Distance", value: dist.toFixed(4) },
      ];
    },
    formula: { expression: "M = ((x₁+x₂)/2, (y₁+y₂)/2)", variables: ["Average of x's and y's"] },
    howToUse: "Enter two points to find the midpoint between them.",
    faqs: [{ question: "What is the midpoint used for?", answer: "Finding centers of line segments, bisectors, and center points in geometry and graphics." }],
    relatedCalcs: mathRelated("midpoint-calculator"),
  },
  // 29. Area Calculator
  {
    slug: "area-calculator",
    name: "Area Calculator",
    category: "Math",
    categorySlug: "math",
    description: "Calculate the area of common shapes: circle, rectangle, triangle, and trapezoid.",
    metaDescription: "Free area calculator. Compute the area of circles, rectangles, triangles, and trapezoids.",
    icon: "hash",
    inputs: [
      { id: "shape", label: "Shape", type: "select", defaultValue: 0, options: [{ value: 0, label: "Circle" }, { value: 1, label: "Rectangle" }, { value: 2, label: "Triangle" }, { value: 3, label: "Trapezoid" }] },
      { id: "dim1", label: "Dimension 1 (radius/length/base)", type: "number", defaultValue: 10, step: 0.1 },
      { id: "dim2", label: "Dimension 2 (width/height)", type: "number", defaultValue: 5, step: 0.1 },
      { id: "dim3", label: "Dimension 3 (top base, trapezoid)", type: "number", defaultValue: 7, step: 0.1 },
    ],
    calculate: (v) => {
      let area: number, perim: number, name: string;
      switch (v.shape) {
        case 0: area = Math.PI * v.dim1 ** 2; perim = 2 * Math.PI * v.dim1; name = "Circle"; break;
        case 1: area = v.dim1 * v.dim2; perim = 2 * (v.dim1 + v.dim2); name = "Rectangle"; break;
        case 2: area = 0.5 * v.dim1 * v.dim2; perim = 0; name = "Triangle"; break;
        case 3: area = 0.5 * (v.dim1 + v.dim3) * v.dim2; perim = 0; name = "Trapezoid"; break;
        default: area = 0; perim = 0; name = "";
      }
      const results = [
        { label: `${name} Area`, value: area.toFixed(2), highlight: true },
      ];
      if (perim > 0) results.push({ label: "Perimeter", value: perim.toFixed(2), highlight: false });
      return results;
    },
    formula: { expression: "Circle: πr²; Rectangle: l×w; Triangle: ½bh; Trapezoid: ½(a+b)h", variables: ["r=radius", "l=length, w=width", "b=base, h=height"] },
    howToUse: "Select a shape and enter dimensions. Unused dimensions are ignored.",
    faqs: [{ question: "What units is area in?", answer: "Area is in square units of whatever unit you use for dimensions (e.g., cm → cm²)." }],
    relatedCalcs: mathRelated("area-calculator"),
  },
  // 30. Volume Calculator
  {
    slug: "volume-calculator",
    name: "Volume Calculator",
    category: "Math",
    categorySlug: "math",
    description: "Calculate the volume of common 3D shapes: sphere, cylinder, cone, and cube.",
    metaDescription: "Free volume calculator for spheres, cylinders, cones, and cubes.",
    icon: "hash",
    inputs: [
      { id: "shape", label: "Shape", type: "select", defaultValue: 0, options: [{ value: 0, label: "Sphere" }, { value: 1, label: "Cylinder" }, { value: 2, label: "Cone" }, { value: 3, label: "Cube" }] },
      { id: "dim1", label: "Dimension 1 (radius/side)", type: "number", defaultValue: 5, step: 0.1 },
      { id: "dim2", label: "Dimension 2 (height)", type: "number", defaultValue: 10, step: 0.1 },
    ],
    calculate: (v) => {
      let vol: number, sa: number, name: string;
      switch (v.shape) {
        case 0: vol = (4 / 3) * Math.PI * v.dim1 ** 3; sa = 4 * Math.PI * v.dim1 ** 2; name = "Sphere"; break;
        case 1: vol = Math.PI * v.dim1 ** 2 * v.dim2; sa = 2 * Math.PI * v.dim1 * (v.dim1 + v.dim2); name = "Cylinder"; break;
        case 2: vol = (1 / 3) * Math.PI * v.dim1 ** 2 * v.dim2; sa = Math.PI * v.dim1 * (v.dim1 + Math.sqrt(v.dim1 ** 2 + v.dim2 ** 2)); name = "Cone"; break;
        case 3: vol = v.dim1 ** 3; sa = 6 * v.dim1 ** 2; name = "Cube"; break;
        default: vol = 0; sa = 0; name = "";
      }
      return [
        { label: `${name} Volume`, value: vol.toFixed(2), highlight: true },
        { label: "Surface Area", value: sa.toFixed(2) },
      ];
    },
    formula: { expression: "Sphere: 4/3πr³; Cylinder: πr²h; Cone: 1/3πr²h; Cube: s³", variables: ["r=radius, h=height, s=side"] },
    howToUse: "Select a 3D shape, enter radius/side and height (if applicable).",
    faqs: [{ question: "What units?", answer: "Volume is in cubic units (e.g., cm³). Surface area is in square units (cm²)." }],
    relatedCalcs: mathRelated("volume-calculator"),
  },
  // 31. Binary Calculator
  {
    slug: "binary-calculator", name: "Binary Calculator", category: "Math", categorySlug: "math",
    description: "Convert between decimal, binary, octal, and hexadecimal number systems.",
    metaDescription: "Free binary calculator. Convert between decimal, binary, octal, and hex number systems.",
    icon: "hash",
    inputs: [
      { id: "value", label: "Decimal Number", type: "number", defaultValue: 255, min: 0 },
    ],
    calculate: (v) => {
      const n = Math.floor(Math.abs(v.value));
      return [
        { label: "Binary", value: n.toString(2), highlight: true },
        { label: "Octal", value: n.toString(8) },
        { label: "Hexadecimal", value: n.toString(16).toUpperCase() },
        { label: "Decimal", value: n.toLocaleString() },
      ];
    },
    formula: { expression: "Divide by base repeatedly, collect remainders", variables: ["Binary = base 2", "Octal = base 8", "Hex = base 16"] },
    howToUse: "Enter a decimal number to see its binary, octal, and hex representations.",
    faqs: [{ question: "Why is binary important?", answer: "Computers use binary (0s and 1s) internally. Understanding binary is fundamental to computer science." }],
    relatedCalcs: mathRelated("binary-calculator"),
  },
  // 32. Hex Calculator
  {
    slug: "hex-calculator", name: "Hex Calculator", category: "Math", categorySlug: "math",
    description: "Convert hexadecimal to decimal and perform hex arithmetic.",
    metaDescription: "Free hex calculator. Convert hexadecimal to decimal, binary, and octal.",
    icon: "hash",
    inputs: [
      { id: "hex1", label: "Hex Value 1 (decimal input)", type: "number", defaultValue: 255 },
      { id: "hex2", label: "Hex Value 2 (decimal input)", type: "number", defaultValue: 16 },
    ],
    calculate: (v) => {
      const sum = v.hex1 + v.hex2;
      const diff = v.hex1 - v.hex2;
      return [
        { label: "Hex 1", value: `0x${Math.abs(Math.floor(v.hex1)).toString(16).toUpperCase()}`, highlight: true },
        { label: "Hex 2", value: `0x${Math.abs(Math.floor(v.hex2)).toString(16).toUpperCase()}` },
        { label: "Sum (Hex)", value: `0x${Math.abs(Math.floor(sum)).toString(16).toUpperCase()}` },
        { label: "Sum (Decimal)", value: `${sum}` },
      ];
    },
    formula: { expression: "Convert, compute, display in hex", variables: ["Hex digits: 0-9, A-F"] },
    howToUse: "Enter two decimal numbers. The calculator shows hex conversions and arithmetic.",
    faqs: [{ question: "Where is hex used?", answer: "Colors (#FF0000), memory addresses, MAC addresses, and many programming contexts." }],
    relatedCalcs: mathRelated("hex-calculator"),
  },
  // 33. Percent Error Calculator
  {
    slug: "percent-error-calculator", name: "Percent Error Calculator", category: "Math", categorySlug: "math",
    description: "Calculate the percent error between an experimental and theoretical value.",
    metaDescription: "Free percent error calculator. Find the percentage error between measured and actual values.",
    icon: "hash",
    inputs: [
      { id: "experimental", label: "Experimental Value", type: "number", defaultValue: 9.8, step: 0.01 },
      { id: "theoretical", label: "Theoretical Value", type: "number", defaultValue: 9.81, step: 0.01 },
    ],
    calculate: (v) => {
      if (v.theoretical === 0) return [{ label: "Error", value: "Theoretical value cannot be zero" }];
      const error = Math.abs(v.experimental - v.theoretical);
      const pctError = (error / Math.abs(v.theoretical)) * 100;
      return [
        { label: "Percent Error", value: `${pctError.toFixed(4)}%`, highlight: true },
        { label: "Absolute Error", value: error.toFixed(6) },
        { label: "Relative Error", value: (error / Math.abs(v.theoretical)).toFixed(6) },
      ];
    },
    formula: { expression: "% Error = |Experimental − Theoretical| / |Theoretical| × 100", variables: ["Always positive (absolute value)"] },
    howToUse: "Enter your measured value and the accepted/theoretical value.",
    faqs: [{ question: "What is acceptable percent error?", answer: "Depends on the field. In chemistry: <5% is good. In physics: <1% for precise experiments." }],
    relatedCalcs: mathRelated("percent-error-calculator"),
  },
  // 34. Ratio Calculator
  {
    slug: "ratio-calculator", name: "Ratio Calculator", category: "Math", categorySlug: "math",
    description: "Simplify ratios and solve for missing values in proportions (a:b = c:d).",
    metaDescription: "Free ratio calculator. Simplify ratios and solve proportions with missing values.",
    icon: "hash",
    inputs: [
      { id: "a", label: "A", type: "number", defaultValue: 12 },
      { id: "b", label: "B", type: "number", defaultValue: 18 },
    ],
    calculate: (v) => {
      const gcdFn = (a: number, b: number): number => { a = Math.abs(a); b = Math.abs(b); return b === 0 ? a : gcdFn(b, a % b); };
      const g = gcdFn(Math.round(v.a), Math.round(v.b));
      const sa = Math.round(v.a) / g;
      const sb = Math.round(v.b) / g;
      return [
        { label: "Simplified Ratio", value: `${sa}:${sb}`, highlight: true },
        { label: "As Fraction", value: `${sa}/${sb}` },
        { label: "As Decimal", value: (v.a / v.b).toFixed(4) },
        { label: "As Percentage", value: `${((v.a / v.b) * 100).toFixed(2)}%` },
      ];
    },
    formula: { expression: "Divide both by GCD to simplify", variables: ["a:b = (a/GCD):(b/GCD)"] },
    howToUse: "Enter two numbers to simplify their ratio.",
    faqs: [{ question: "What is a ratio?", answer: "A ratio compares two quantities. 3:4 means 'for every 3 of A, there are 4 of B.'" }],
    relatedCalcs: mathRelated("ratio-calculator"),
  },
  // 35. Z-Score Calculator
  {
    slug: "z-score-calculator", name: "Z-Score Calculator", category: "Math", categorySlug: "math",
    description: "Calculate the z-score (standard score) for a value given the mean and standard deviation.",
    metaDescription: "Free z-score calculator. Find how many standard deviations a value is from the mean.",
    icon: "hash",
    inputs: [
      { id: "value", label: "Value (x)", type: "number", defaultValue: 85, step: 0.1 },
      { id: "mean", label: "Mean (μ)", type: "number", defaultValue: 75, step: 0.1 },
      { id: "sd", label: "Standard Deviation (σ)", type: "number", defaultValue: 10, step: 0.1 },
    ],
    calculate: (v) => {
      if (v.sd === 0) return [{ label: "Error", value: "SD cannot be zero" }];
      const z = (v.value - v.mean) / v.sd;
      // Approximate cumulative probability
      const t = 1 / (1 + 0.2316419 * Math.abs(z));
      const d = 0.3989422804014327;
      const p = d * Math.exp(-z * z / 2) * (0.3193815 * t - 0.3565638 * t * t + 1.781478 * t ** 3 - 1.821256 * t ** 4 + 1.330274 * t ** 5);
      const cdf = z > 0 ? 1 - p : p;
      return [
        { label: "Z-Score", value: z.toFixed(4), highlight: true },
        { label: "Percentile", value: `${(cdf * 100).toFixed(2)}%` },
        { label: "Above/Below Mean", value: z >= 0 ? "Above" : "Below" },
      ];
    },
    formula: { expression: "z = (x − μ) / σ", variables: ["x = value", "μ = mean", "σ = standard deviation"] },
    howToUse: "Enter a data point, the population mean, and standard deviation to find the z-score.",
    faqs: [{ question: "What does a z-score mean?", answer: "A z-score of 2 means the value is 2 standard deviations above the mean. About 95% of data falls within z = ±2." }],
    relatedCalcs: mathRelated("z-score-calculator"),
  },
  // 36. Circle Calculator
  {
    slug: "circle-calculator", name: "Circle Calculator", category: "Math", categorySlug: "math",
    description: "Calculate the area, circumference, and diameter of a circle from any known measurement.",
    metaDescription: "Free circle calculator. Find area, circumference, and diameter from radius or other measurements.",
    icon: "hash",
    inputs: [
      { id: "radius", label: "Radius", type: "number", defaultValue: 10, step: 0.1 },
    ],
    calculate: (v) => {
      const area = Math.PI * v.radius ** 2;
      const circumference = 2 * Math.PI * v.radius;
      return [
        { label: "Area", value: area.toFixed(4), highlight: true },
        { label: "Circumference", value: circumference.toFixed(4) },
        { label: "Diameter", value: `${(v.radius * 2).toFixed(2)}` },
      ];
    },
    formula: { expression: "Area = πr²; Circumference = 2πr; Diameter = 2r", variables: ["r = radius"] },
    howToUse: "Enter the radius to calculate area, circumference, and diameter.",
    faqs: [{ question: "What is π?", answer: "Pi (π) ≈ 3.14159... is the ratio of a circle's circumference to its diameter. It's an irrational number." }],
    relatedCalcs: mathRelated("circle-calculator"),
  },
  // 37. Pythagorean Theorem Calculator
  {
    slug: "pythagorean-theorem-calculator", name: "Pythagorean Theorem Calculator", category: "Math", categorySlug: "math",
    description: "Calculate the missing side of a right triangle using the Pythagorean theorem (a² + b² = c²).",
    metaDescription: "Free Pythagorean theorem calculator. Find the missing side of a right triangle.",
    icon: "hash",
    inputs: [
      { id: "a", label: "Side a", type: "number", defaultValue: 3, step: 0.1 },
      { id: "b", label: "Side b", type: "number", defaultValue: 4, step: 0.1 },
    ],
    calculate: (v) => {
      const c = Math.sqrt(v.a ** 2 + v.b ** 2);
      const area = 0.5 * v.a * v.b;
      const perimeter = v.a + v.b + c;
      return [
        { label: "Hypotenuse (c)", value: c.toFixed(4), highlight: true },
        { label: "a² + b²", value: `${(v.a ** 2 + v.b ** 2).toFixed(2)}` },
        { label: "Area", value: area.toFixed(2) },
        { label: "Perimeter", value: perimeter.toFixed(2) },
      ];
    },
    formula: { expression: "c = √(a² + b²)", variables: ["a and b are the two legs", "c is the hypotenuse"] },
    howToUse: "Enter the two legs of a right triangle to find the hypotenuse.",
    faqs: [{ question: "What are Pythagorean triples?", answer: "Integer solutions like 3-4-5, 5-12-13, 8-15-17. They form right triangles with whole-number sides." }],
    relatedCalcs: mathRelated("pythagorean-theorem-calculator"),
  },
  // 38. Scientific Notation Calculator
  {
    slug: "scientific-notation-calculator", name: "Scientific Notation Calculator", category: "Math", categorySlug: "math",
    description: "Convert numbers to scientific, E, and engineering notation, or perform operations (+ − × ÷) on two numbers in scientific notation.",
    metaDescription: "Free scientific notation calculator. Convert numbers and perform addition, subtraction, multiplication, and division in scientific notation.",
    icon: "hash",
    inputs: [
      { id: "mode", label: "Mode", type: "select", defaultValue: 0, options: [
        { value: 0, label: "Convert a number" },
        { value: 1, label: "Add (a × 10^b) + (c × 10^d)" },
        { value: 2, label: "Subtract (a × 10^b) − (c × 10^d)" },
        { value: 3, label: "Multiply (a × 10^b) × (c × 10^d)" },
        { value: 4, label: "Divide (a × 10^b) ÷ (c × 10^d)" },
      ]},
      { id: "value", label: "Number to convert", type: "number", defaultValue: 9460000000000000, step: 1 },
      { id: "decimals", label: "Decimal places (precision)", type: "number", defaultValue: 4, min: 0, max: 12, step: 1 },
      { id: "a", label: "Coefficient a", type: "number", defaultValue: 6.022, step: 0.001 },
      { id: "b", label: "Exponent b", type: "number", defaultValue: 23, step: 1 },
      { id: "c", label: "Coefficient c", type: "number", defaultValue: 1.6, step: 0.001 },
      { id: "d", label: "Exponent d", type: "number", defaultValue: 19, step: 1 },
    ],
    calculate: (v) => {
      const dp = Math.max(0, Math.min(12, Math.round(v.decimals ?? 4)));
      const fmtSci = (n: number) => {
        if (!isFinite(n)) return "—";
        if (n === 0) return `0 × 10^0`;
        const exp = Math.floor(Math.log10(Math.abs(n)));
        const coeff = n / Math.pow(10, exp);
        return `${coeff.toFixed(dp)} × 10^${exp}`;
      };
      const fmtEng = (n: number) => {
        if (!isFinite(n) || n === 0) return n === 0 ? "0 × 10^0" : "—";
        const exp = Math.floor(Math.log10(Math.abs(n)) / 3) * 3;
        const coeff = n / Math.pow(10, exp);
        return `${coeff.toFixed(dp)} × 10^${exp}`;
      };
      const mode = Math.round(v.mode ?? 0);
      if (mode === 0) {
        const x = v.value;
        return [
          { label: "Scientific Notation", value: fmtSci(x), highlight: true },
          { label: "E Notation", value: isFinite(x) ? x.toExponential(dp) : "—" },
          { label: "Engineering Notation", value: fmtEng(x) },
          { label: "Standard (Decimal) Form", value: isFinite(x) ? x.toLocaleString(undefined, { maximumFractionDigits: 20 }) : "—" },
          { label: "Order of Magnitude", value: x === 0 ? "0" : `10^${Math.floor(Math.log10(Math.abs(x)))}` },
        ];
      }
      const x = v.a * Math.pow(10, v.b);
      const y = v.c * Math.pow(10, v.d);
      let r = 0; let symbol = "+";
      if (mode === 1) { r = x + y; symbol = "+"; }
      if (mode === 2) { r = x - y; symbol = "−"; }
      if (mode === 3) { r = x * y; symbol = "×"; }
      if (mode === 4) { r = y === 0 ? NaN : x / y; symbol = "÷"; }
      return [
        { label: "Result (Scientific)", value: fmtSci(r), highlight: true },
        { label: "Result (E Notation)", value: isFinite(r) ? r.toExponential(dp) : "—" },
        { label: "Result (Engineering)", value: fmtEng(r) },
        { label: "Result (Decimal)", value: isFinite(r) ? r.toLocaleString(undefined, { maximumFractionDigits: 20 }) : "Undefined" },
        { label: "Operation", value: `(${v.a} × 10^${v.b}) ${symbol} (${v.c} × 10^${v.d})` },
      ];
    },
    formula: { expression: "a × 10ⁿ where 1 ≤ |a| < 10 and n is an integer", variables: ["n = floor(log₁₀|x|)", "Engineering: n is a multiple of 3"] },
    howToUse: "Choose a mode. To convert a number, enter it in the 'Number to convert' field. To perform an operation, pick Add/Subtract/Multiply/Divide and enter the coefficients and exponents for both numbers. Use the precision field to control how many decimal places appear in the coefficient.",
    longExplanation: "scientific-notation",
    faqs: [
      { question: "How do I write a number in scientific notation on a calculator?", answer: "Most calculators use the EE or EXP key. To enter 6.022 × 10²³, press 6.022, then EE (or EXP), then 23. The display usually shows it as 6.022E23 or 6.022 23. On phone calculators, switch to scientific mode and use the same EE button." },
      { question: "How do I write 9,460,000,000,000,000 in scientific notation?", answer: "Move the decimal point left until you have a number between 1 and 10. 9,460,000,000,000,000 becomes 9.46, and you moved the decimal 15 places, so it is 9.46 × 10¹⁵." },
      { question: "How do I write 60,500 in scientific notation?", answer: "Move the decimal 4 places to the left: 60,500 = 6.05 × 10⁴." },
      { question: "How do I write 16,900,000 in scientific notation?", answer: "Move the decimal 7 places to the left: 16,900,000 = 1.69 × 10⁷." },
      { question: "How do you do operations with scientific notation?", answer: "For × and ÷, multiply/divide the coefficients and add/subtract the exponents. For + and −, first rewrite both numbers with the same exponent, then add or subtract the coefficients." },
      { question: "How do you work out force using a calculator?", answer: "Use Newton's second law F = m × a. Multiply the mass (kg) by the acceleration (m/s²). For example, 1500 kg × 9.8 m/s² = 14,700 N. Our Force Calculator does this automatically." },
      { question: "What is E notation?", answer: "E notation is a calculator-friendly form of scientific notation. 6.022 × 10²³ is written as 6.022E23 or 6.022e23." },
      { question: "When is scientific notation used?", answer: "It is used for very large numbers (speed of light: 3 × 10⁸ m/s) and very small numbers (electron mass: 9.1 × 10⁻³¹ kg) common in science, engineering, and finance." },
    ],
    relatedCalcs: mathRelated("scientific-notation-calculator"),
  },
  // 39. Average Calculator
  {
    slug: "average-calculator", name: "Average Calculator", category: "Math", categorySlug: "math",
    description: "Calculate the arithmetic mean, geometric mean, and harmonic mean of a set of numbers.",
    metaDescription: "Free average calculator. Find arithmetic, geometric, and harmonic means of numbers.",
    icon: "hash",
    inputs: [
      { id: "v1", label: "Value 1", type: "number", defaultValue: 10 },
      { id: "v2", label: "Value 2", type: "number", defaultValue: 20 },
      { id: "v3", label: "Value 3", type: "number", defaultValue: 30 },
      { id: "v4", label: "Value 4", type: "number", defaultValue: 40 },
      { id: "v5", label: "Value 5", type: "number", defaultValue: 50 },
    ],
    calculate: (v) => {
      const data = [v.v1, v.v2, v.v3, v.v4, v.v5];
      const n = data.length;
      const arithmetic = data.reduce((a, b) => a + b, 0) / n;
      const geometric = Math.pow(data.reduce((a, b) => a * b, 1), 1 / n);
      const harmonic = n / data.reduce((sum, x) => sum + 1 / x, 0);
      return [
        { label: "Arithmetic Mean", value: arithmetic.toFixed(2), highlight: true },
        { label: "Geometric Mean", value: geometric.toFixed(2) },
        { label: "Harmonic Mean", value: harmonic.toFixed(2) },
        { label: "Sum", value: data.reduce((a, b) => a + b, 0).toLocaleString() },
      ];
    },
    formula: { expression: "Arithmetic: Σx/n; Geometric: (Πx)^(1/n); Harmonic: n/Σ(1/x)", variables: ["n = count of values"] },
    howToUse: "Enter up to 5 values to calculate different types of averages.",
    faqs: [{ question: "Which average should I use?", answer: "Arithmetic for most cases. Geometric for rates of change. Harmonic for rates and ratios (like speed)." }],
    relatedCalcs: mathRelated("average-calculator"),
  },
  // 40. Right Triangle Calculator
  {
    slug: "right-triangle-calculator", name: "Right Triangle Calculator", category: "Math", categorySlug: "math",
    description: "Calculate all sides, angles, area, and perimeter of a right triangle from two known values.",
    metaDescription: "Free right triangle calculator. Find all sides, angles, and area from any two measurements.",
    icon: "hash",
    inputs: [
      { id: "a", label: "Side a (adjacent)", type: "number", defaultValue: 5, step: 0.1 },
      { id: "b", label: "Side b (opposite)", type: "number", defaultValue: 12, step: 0.1 },
    ],
    calculate: (v) => {
      const c = Math.sqrt(v.a ** 2 + v.b ** 2);
      const angleA = Math.atan(v.b / v.a) * (180 / Math.PI);
      const angleB = 90 - angleA;
      const area = 0.5 * v.a * v.b;
      return [
        { label: "Hypotenuse", value: c.toFixed(4), highlight: true },
        { label: "Angle A", value: `${angleA.toFixed(2)}°` },
        { label: "Angle B", value: `${angleB.toFixed(2)}°` },
        { label: "Area", value: area.toFixed(2) },
        { label: "Perimeter", value: (v.a + v.b + c).toFixed(2) },
      ];
    },
    formula: { expression: "c = √(a²+b²); Angle = arctan(opposite/adjacent)", variables: ["All angles sum to 180°", "One angle = 90°"] },
    howToUse: "Enter the two legs to calculate the hypotenuse, angles, area, and perimeter.",
    faqs: [{ question: "What makes a triangle 'right'?", answer: "A right triangle has exactly one 90° angle. The side opposite the right angle is the hypotenuse." }],
    relatedCalcs: mathRelated("right-triangle-calculator"),
  },
  // 41. Triangle Calculator
  {
    slug: "triangle-calculator", name: "Triangle Calculator", category: "Math", categorySlug: "math",
    description: "Calculate the area, perimeter, and angles of a triangle from three side lengths using Heron's formula.",
    metaDescription: "Free triangle calculator. Find area, perimeter, and angles from three side lengths.",
    icon: "hash",
    inputs: [
      { id: "a", label: "Side a", type: "number", defaultValue: 5, step: 0.1 },
      { id: "b", label: "Side b", type: "number", defaultValue: 7, step: 0.1 },
      { id: "c", label: "Side c", type: "number", defaultValue: 10, step: 0.1 },
    ],
    calculate: (v) => {
      const s = (v.a + v.b + v.c) / 2;
      const areaSquared = s * (s - v.a) * (s - v.b) * (s - v.c);
      if (areaSquared <= 0) return [{ label: "Error", value: "Invalid triangle sides" }];
      const area = Math.sqrt(areaSquared);
      const angleA = Math.acos((v.b ** 2 + v.c ** 2 - v.a ** 2) / (2 * v.b * v.c)) * (180 / Math.PI);
      const angleB = Math.acos((v.a ** 2 + v.c ** 2 - v.b ** 2) / (2 * v.a * v.c)) * (180 / Math.PI);
      const angleC = 180 - angleA - angleB;
      return [
        { label: "Area", value: area.toFixed(4), highlight: true },
        { label: "Perimeter", value: (v.a + v.b + v.c).toFixed(2) },
        { label: "Angle A", value: `${angleA.toFixed(2)}°` },
        { label: "Angle B", value: `${angleB.toFixed(2)}°` },
        { label: "Angle C", value: `${angleC.toFixed(2)}°` },
      ];
    },
    formula: { expression: "Heron's: Area = √(s(s-a)(s-b)(s-c)) where s = (a+b+c)/2", variables: ["Angles via law of cosines"] },
    howToUse: "Enter three side lengths. The calculator finds area and angles using Heron's formula and law of cosines.",
    faqs: [{ question: "When is a triangle valid?", answer: "Each side must be less than the sum of the other two (triangle inequality)." }],
    relatedCalcs: mathRelated("triangle-calculator"),
  },
  // 42. Surface Area Calculator
  {
    slug: "surface-area-calculator", name: "Surface Area Calculator", category: "Math", categorySlug: "math",
    description: "Calculate the surface area of common 3D shapes: sphere, cylinder, cone, and rectangular prism.",
    metaDescription: "Free surface area calculator for spheres, cylinders, cones, and rectangular prisms.",
    icon: "hash",
    inputs: [
      { id: "shape", label: "Shape", type: "select", defaultValue: 0, options: [{ value: 0, label: "Sphere" }, { value: 1, label: "Cylinder" }, { value: 2, label: "Cone" }, { value: 3, label: "Rectangular Prism" }] },
      { id: "dim1", label: "Dimension 1 (radius/length)", type: "number", defaultValue: 5, step: 0.1 },
      { id: "dim2", label: "Dimension 2 (height/width)", type: "number", defaultValue: 10, step: 0.1 },
      { id: "dim3", label: "Dimension 3 (depth, prism only)", type: "number", defaultValue: 3, step: 0.1 },
    ],
    calculate: (v) => {
      let sa: number, name: string;
      switch (v.shape) {
        case 0: sa = 4 * Math.PI * v.dim1 ** 2; name = "Sphere"; break;
        case 1: sa = 2 * Math.PI * v.dim1 * (v.dim1 + v.dim2); name = "Cylinder"; break;
        case 2: { const slant = Math.sqrt(v.dim1 ** 2 + v.dim2 ** 2); sa = Math.PI * v.dim1 * (v.dim1 + slant); name = "Cone"; break; }
        case 3: sa = 2 * (v.dim1 * v.dim2 + v.dim2 * v.dim3 + v.dim1 * v.dim3); name = "Rectangular Prism"; break;
        default: sa = 0; name = "";
      }
      return [
        { label: `${name} Surface Area`, value: sa.toFixed(2), highlight: true },
      ];
    },
    formula: { expression: "Sphere: 4πr²; Cylinder: 2πr(r+h); Cone: πr(r+l); Prism: 2(lw+wh+lh)", variables: ["r=radius, h=height, l=slant height"] },
    howToUse: "Select a shape and enter dimensions to calculate surface area.",
    faqs: [{ question: "What is surface area used for?", answer: "Calculating material needed to cover an object, heat transfer, painting, wrapping, and manufacturing." }],
    relatedCalcs: mathRelated("surface-area-calculator"),
  },
  // 43. Sample Size Calculator
  {
    slug: "sample-size-calculator", name: "Sample Size Calculator", category: "Math", categorySlug: "math",
    description: "Calculate the required sample size for a survey given confidence level, margin of error, and population.",
    metaDescription: "Free sample size calculator. Determine how many survey responses you need for reliable results.",
    icon: "hash",
    inputs: [
      { id: "confidence", label: "Confidence Level", type: "select", defaultValue: 1.96, options: [{ value: 1.645, label: "90%" }, { value: 1.96, label: "95%" }, { value: 2.576, label: "99%" }] },
      { id: "margin", label: "Margin of Error (%)", type: "number", defaultValue: 5, suffix: "%", step: 0.5 },
      { id: "population", label: "Population Size", type: "number", defaultValue: 10000 },
    ],
    calculate: (v) => {
      const p = 0.5; // max variability
      const e = v.margin / 100;
      const z = v.confidence;
      const n0 = (z ** 2 * p * (1 - p)) / (e ** 2);
      const n = Math.ceil(n0 / (1 + (n0 - 1) / v.population));
      return [
        { label: "Required Sample Size", value: n.toLocaleString(), highlight: true },
        { label: "Infinite Pop. Sample", value: Math.ceil(n0).toLocaleString() },
        { label: "Response Rate Factor", value: `Get ${Math.ceil(n / 0.8)} surveys (80% rate)` },
      ];
    },
    formula: { expression: "n = n₀ / (1 + (n₀-1)/N); n₀ = z²p(1-p)/e²", variables: ["z = z-score for confidence", "p = 0.5 (maximum)", "e = margin of error"] },
    howToUse: "Select confidence level, set margin of error, and enter population size.",
    faqs: [{ question: "Why is p set to 0.5?", answer: "Using p=0.5 gives the maximum sample size (worst case), ensuring your results are reliable regardless of the actual proportion." }],
    relatedCalcs: mathRelated("sample-size-calculator"),
  },
  // 44. Confidence Interval Calculator
  {
    slug: "confidence-interval-calculator", name: "Confidence Interval Calculator", category: "Math", categorySlug: "math",
    description: "Calculate the confidence interval for a population mean from sample statistics.",
    metaDescription: "Free confidence interval calculator. Find the CI for a population mean from sample data.",
    icon: "hash",
    inputs: [
      { id: "mean", label: "Sample Mean", type: "number", defaultValue: 50, step: 0.1 },
      { id: "sd", label: "Standard Deviation", type: "number", defaultValue: 10, step: 0.1 },
      { id: "n", label: "Sample Size", type: "number", defaultValue: 100, min: 2 },
      { id: "confidence", label: "Confidence Level", type: "select", defaultValue: 1.96, options: [{ value: 1.645, label: "90%" }, { value: 1.96, label: "95%" }, { value: 2.576, label: "99%" }] },
    ],
    calculate: (v) => {
      const se = v.sd / Math.sqrt(v.n);
      const margin = v.confidence * se;
      return [
        { label: "Confidence Interval", value: `${(v.mean - margin).toFixed(2)} – ${(v.mean + margin).toFixed(2)}`, highlight: true },
        { label: "Margin of Error", value: `±${margin.toFixed(4)}` },
        { label: "Standard Error", value: se.toFixed(4) },
      ];
    },
    formula: { expression: "CI = x̄ ± z × (σ/√n)", variables: ["x̄ = sample mean", "σ = standard deviation", "n = sample size"] },
    howToUse: "Enter sample mean, standard deviation, sample size, and confidence level.",
    faqs: [{ question: "What does 95% confidence mean?", answer: "If you repeated the study 100 times, about 95 of the intervals would contain the true population mean." }],
    relatedCalcs: mathRelated("confidence-interval-calculator"),
  },
  // 45. P-Value Calculator
  {
    slug: "p-value-calculator", name: "P-Value Calculator", category: "Math", categorySlug: "math",
    description: "Calculate the p-value from a z-score or t-statistic for hypothesis testing.",
    metaDescription: "Free p-value calculator. Find the p-value from a z-score for statistical hypothesis testing.",
    icon: "hash",
    inputs: [
      { id: "zScore", label: "Z-Score / Test Statistic", type: "number", defaultValue: 1.96, step: 0.01 },
      { id: "tail", label: "Test Type", type: "select", defaultValue: 2, options: [{ value: 1, label: "One-Tailed" }, { value: 2, label: "Two-Tailed" }] },
    ],
    calculate: (v) => {
      const z = Math.abs(v.zScore);
      const t = 1 / (1 + 0.2316419 * z);
      const d = 0.3989422804014327;
      const p1 = d * Math.exp(-z * z / 2) * (0.3193815 * t - 0.3565638 * t * t + 1.781478 * t ** 3 - 1.821256 * t ** 4 + 1.330274 * t ** 5);
      const pValue = v.tail === 2 ? 2 * p1 : p1;
      return [
        { label: "P-Value", value: pValue < 0.0001 ? pValue.toExponential(4) : pValue.toFixed(6), highlight: true },
        { label: "Significant (α=0.05)?", value: pValue < 0.05 ? "Yes ✓" : "No" },
        { label: "Significant (α=0.01)?", value: pValue < 0.01 ? "Yes ✓" : "No" },
      ];
    },
    formula: { expression: "P-value from standard normal distribution", variables: ["Two-tailed = 2 × one-tailed", "Approximation using polynomial"] },
    howToUse: "Enter your test statistic and select one or two-tailed test.",
    faqs: [{ question: "What is a p-value?", answer: "The probability of observing results as extreme as the test statistic, assuming the null hypothesis is true. Lower = stronger evidence against null." }],
    relatedCalcs: mathRelated("p-value-calculator"),
  },
  // 46. Long Division Calculator
  {
    slug: "long-division-calculator", name: "Long Division Calculator", category: "Math", categorySlug: "math",
    description: "Perform long division and see the quotient, remainder, and decimal result.",
    metaDescription: "Free long division calculator. Get quotient, remainder, and decimal result for any division.",
    icon: "hash",
    inputs: [
      { id: "dividend", label: "Dividend (number being divided)", type: "number", defaultValue: 127 },
      { id: "divisor", label: "Divisor (dividing by)", type: "number", defaultValue: 5 },
    ],
    calculate: (v) => {
      if (v.divisor === 0) return [{ label: "Error", value: "Cannot divide by zero" }];
      const quotient = Math.floor(v.dividend / v.divisor);
      const remainder = v.dividend % v.divisor;
      const decimal = v.dividend / v.divisor;
      return [
        { label: "Quotient", value: `${quotient}`, highlight: true },
        { label: "Remainder", value: `${remainder}` },
        { label: "Result", value: `${quotient} R ${remainder}` },
        { label: "Decimal", value: decimal.toFixed(6) },
      ];
    },
    formula: { expression: "Dividend = Divisor × Quotient + Remainder", variables: ["Quotient = floor(Dividend / Divisor)"] },
    howToUse: "Enter the dividend and divisor. See the quotient, remainder, and decimal result.",
    faqs: [{ question: "What is a remainder?", answer: "The amount left over after division. 17 ÷ 5 = 3 remainder 2 (because 5 × 3 = 15, and 17 − 15 = 2)." }],
    relatedCalcs: mathRelated("long-division-calculator"),
  },
  // 47. Rounding Calculator
  {
    slug: "rounding-calculator", name: "Rounding Calculator", category: "Math", categorySlug: "math",
    description: "Round numbers to any decimal place, significant figures, or nearest whole number.",
    metaDescription: "Free rounding calculator. Round numbers to decimal places, significant figures, or nearest integer.",
    icon: "hash",
    inputs: [
      { id: "value", label: "Number", type: "number", defaultValue: 3.14159265, step: 0.0000001 },
      { id: "places", label: "Decimal Places", type: "number", defaultValue: 2, min: 0, max: 10 },
    ],
    calculate: (v) => {
      const places = Math.min(10, Math.max(0, Math.floor(v.places || 0)));
      const rounded = parseFloat(v.value.toFixed(places));
      const floor = Math.floor(v.value * Math.pow(10, places)) / Math.pow(10, places);
      const ceil = Math.ceil(v.value * Math.pow(10, places)) / Math.pow(10, places);
      return [
        { label: "Rounded", value: `${rounded}`, highlight: true },
        { label: "Floor (round down)", value: `${floor}` },
        { label: "Ceiling (round up)", value: `${ceil}` },
        { label: "Nearest Integer", value: `${Math.round(v.value)}` },
      ];
    },
    formula: { expression: "Standard rounding: ≥5 rounds up, <5 rounds down", variables: ["Floor always rounds toward −∞", "Ceiling always rounds toward +∞"] },
    howToUse: "Enter a number and number of decimal places to round to.",
    faqs: [{ question: "What is banker's rounding?", answer: "Banker's rounding rounds .5 to the nearest even number to reduce bias. Standard rounding always rounds .5 up." }],
    relatedCalcs: mathRelated("rounding-calculator"),
  },
  // 48. Number Sequence Calculator
  {
    slug: "number-sequence-calculator", name: "Number Sequence Calculator", category: "Math", categorySlug: "math",
    description: "Generate arithmetic and geometric sequences from a starting value, common difference/ratio, and number of terms.",
    metaDescription: "Free number sequence calculator. Generate arithmetic and geometric sequences.",
    icon: "hash",
    inputs: [
      { id: "first", label: "First Term", type: "number", defaultValue: 2, step: 0.1 },
      { id: "diff", label: "Common Difference / Ratio", type: "number", defaultValue: 3, step: 0.1 },
      { id: "n", label: "Number of Terms", type: "number", defaultValue: 8, min: 1, max: 20 },
      { id: "type", label: "Sequence Type", type: "select", defaultValue: 0, options: [{ value: 0, label: "Arithmetic (+)" }, { value: 1, label: "Geometric (×)" }] },
    ],
    calculate: (v) => {
      const terms: number[] = [];
      let sum = 0;
      for (let i = 0; i < Math.min(v.n, 20); i++) {
        const term = v.type === 0 ? v.first + i * v.diff : v.first * Math.pow(v.diff, i);
        terms.push(parseFloat(term.toFixed(4)));
        sum += term;
      }
      return [
        { label: "Sequence", value: terms.join(", "), highlight: true },
        { label: "Sum", value: sum.toFixed(2) },
        { label: "Last Term", value: `${terms[terms.length - 1]}` },
        { label: "Count", value: `${terms.length}` },
      ];
    },
    formula: { expression: "Arithmetic: aₙ = a₁ + (n−1)d; Geometric: aₙ = a₁ × r^(n−1)", variables: ["d = common difference", "r = common ratio"] },
    howToUse: "Enter the first term, difference/ratio, and number of terms.",
    faqs: [{ question: "What is an arithmetic sequence?", answer: "Each term increases by a constant amount (common difference). Example: 2, 5, 8, 11..." }],
    relatedCalcs: mathRelated("number-sequence-calculator"),
  },
  // 49. Factor Calculator
  {
    slug: "factor-calculator", name: "Factor Calculator", category: "Math", categorySlug: "math",
    description: "Find all factors (divisors) of a number and determine if it is prime.",
    metaDescription: "Free factor calculator. Find all factors of any positive integer.",
    icon: "hash",
    inputs: [
      { id: "n", label: "Number", type: "number", defaultValue: 60, min: 1 },
    ],
    calculate: (v) => {
      const n = Math.floor(Math.abs(v.n));
      if (n < 1) return [{ label: "Error", value: "Enter a positive integer" }];
      const factors: number[] = [];
      for (let i = 1; i <= Math.sqrt(n); i++) {
        if (n % i === 0) { factors.push(i); if (i !== n / i) factors.push(n / i); }
      }
      factors.sort((a, b) => a - b);
      const isPrime = factors.length === 2;
      return [
        { label: "Factors", value: factors.join(", "), highlight: true },
        { label: "Number of Factors", value: `${factors.length}` },
        { label: "Is Prime?", value: isPrime ? "Yes" : "No" },
        { label: "Factor Pairs", value: factors.filter((_, i) => i < factors.length / 2).map(f => `${f}×${n / f}`).join(", ") },
      ];
    },
    formula: { expression: "Check divisibility from 1 to √n", variables: ["If n/i is integer, both i and n/i are factors"] },
    howToUse: "Enter a positive integer to find all its factors.",
    faqs: [{ question: "What is a factor?", answer: "A factor divides evenly into a number with no remainder. Factors of 12 are 1, 2, 3, 4, 6, 12." }],
    relatedCalcs: mathRelated("factor-calculator"),
  },
  // 50. Statistics Calculator
  {
    slug: "statistics-calculator", name: "Statistics Calculator", category: "Math", categorySlug: "math",
    description: "Calculate comprehensive statistics: mean, median, mode, range, variance, standard deviation, and more.",
    metaDescription: "Free statistics calculator. Compute mean, median, mode, range, variance, and standard deviation.",
    icon: "hash",
    inputs: [
      { id: "v1", label: "Value 1", type: "number", defaultValue: 4 },
      { id: "v2", label: "Value 2", type: "number", defaultValue: 8 },
      { id: "v3", label: "Value 3", type: "number", defaultValue: 6 },
      { id: "v4", label: "Value 4", type: "number", defaultValue: 5 },
      { id: "v5", label: "Value 5", type: "number", defaultValue: 3 },
      { id: "v6", label: "Value 6", type: "number", defaultValue: 7 },
    ],
    calculate: (v) => {
      const data = [v.v1, v.v2, v.v3, v.v4, v.v5, v.v6].sort((a, b) => a - b);
      const n = data.length;
      const mean = data.reduce((a, b) => a + b, 0) / n;
      const median = n % 2 === 0 ? (data[n / 2 - 1] + data[n / 2]) / 2 : data[Math.floor(n / 2)];
      const variance = data.reduce((sum, x) => sum + (x - mean) ** 2, 0) / n;
      const sampleVar = data.reduce((sum, x) => sum + (x - mean) ** 2, 0) / (n - 1);
      const sd = Math.sqrt(variance);
      const range = data[n - 1] - data[0];
      return [
        { label: "Mean", value: mean.toFixed(4), highlight: true },
        { label: "Median", value: `${median}` },
        { label: "Population SD", value: sd.toFixed(4) },
        { label: "Sample SD", value: Math.sqrt(sampleVar).toFixed(4) },
        { label: "Range", value: `${range}` },
        { label: "Sorted Data", value: data.join(", ") },
      ];
    },
    formula: { expression: "μ = Σx/n; σ = √(Σ(x−μ)²/n); s = √(Σ(x−μ)²/(n−1))", variables: ["Population vs sample SD"] },
    howToUse: "Enter up to 6 data values to see comprehensive descriptive statistics.",
    faqs: [{ question: "Population vs sample?", answer: "Use population SD (÷n) when data is the entire population. Use sample SD (÷(n−1)) when data is a subset." }],
    relatedCalcs: mathRelated("statistics-calculator"),
  },
];

export const mathCalculators = _mathCalculators.map(c => ({
  ...c,
  subcategory: mathSubcategoryMap[c.slug] || "General",
}));
