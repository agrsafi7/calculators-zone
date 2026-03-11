import { CalculatorConfig } from "@/components/CalculatorTemplate";

const fmt = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);
const fmt0 = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

const otherRel3 = (exclude: string) => [
  { name: "LCM Calculator", slug: "lcm-calculator", icon: "layers", category: "other" },
  { name: "Ratio Calculator", slug: "ratio-calculator", icon: "layers", category: "other" },
  { name: "Soil Calculator", slug: "soil-calculator", icon: "layers", category: "other" },
  { name: "Wedding Budget", slug: "wedding-budget-calculator", icon: "layers", category: "other" },
].filter(c => c.slug !== exclude);

export const otherCalculatorsExtra: CalculatorConfig[] = [
  {
    slug: "lcm-calculator", name: "LCM Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate the Least Common Multiple of two or more numbers.",
    metaDescription: "Free LCM calculator. Find the least common multiple instantly.",
    icon: "layers",
    inputs: [
      { id: "num1", label: "Number 1", type: "number", defaultValue: 12 },
      { id: "num2", label: "Number 2", type: "number", defaultValue: 18 },
    ],
    calculate: (v) => {
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
      const a = Math.abs(Math.round(v.num1)), b = Math.abs(Math.round(v.num2));
      const g = gcd(a, b);
      const lcm = (a * b) / g;
      return [
        { label: "LCM", value: lcm.toLocaleString(), highlight: true },
        { label: "GCD", value: g.toLocaleString() },
        { label: "Product", value: (a * b).toLocaleString() },
      ];
    },
    formula: { expression: "LCM = (A × B) ÷ GCD(A, B)", variables: ["GCD = Greatest Common Divisor"] },
    howToUse: "Enter two numbers to find their LCM and GCD.",
    faqs: [{ question: "What is LCM used for?", answer: "Finding common denominators in fractions, scheduling, and synchronization problems." }],
    relatedCalcs: otherRel3("lcm-calculator"),
  },
  {
    slug: "gcd-calculator", name: "GCD Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate the Greatest Common Divisor of two numbers.",
    metaDescription: "Free GCD calculator. Find the greatest common divisor instantly.",
    icon: "layers",
    inputs: [
      { id: "num1", label: "Number 1", type: "number", defaultValue: 48 },
      { id: "num2", label: "Number 2", type: "number", defaultValue: 36 },
    ],
    calculate: (v) => {
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
      const a = Math.abs(Math.round(v.num1)), b = Math.abs(Math.round(v.num2));
      const g = gcd(a, b);
      const lcm = (a * b) / g;
      return [
        { label: "GCD", value: g.toLocaleString(), highlight: true },
        { label: "LCM", value: lcm.toLocaleString() },
        { label: "A ÷ GCD", value: (a / g).toString() },
        { label: "B ÷ GCD", value: (b / g).toString() },
      ];
    },
    formula: { expression: "Euclidean Algorithm: GCD(A, B) = GCD(B, A mod B)", variables: ["Repeats until remainder is 0"] },
    howToUse: "Enter two numbers to find their GCD.",
    faqs: [{ question: "GCD vs GCF?", answer: "Same thing. GCD = Greatest Common Divisor. GCF = Greatest Common Factor." }],
    relatedCalcs: otherRel3("gcd-calculator"),
  },
  {
    slug: "exponent-calculator", name: "Exponent Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate powers and exponents — raise any number to any power.",
    metaDescription: "Free exponent calculator. Calculate any number raised to any power.",
    icon: "layers",
    inputs: [
      { id: "base", label: "Base", type: "number", defaultValue: 2, step: 0.1 },
      { id: "exponent", label: "Exponent", type: "number", defaultValue: 10, step: 0.1 },
    ],
    calculate: (v) => {
      const result = Math.pow(v.base, v.exponent);
      const inverse = Math.pow(v.base, -v.exponent);
      const root = v.exponent !== 0 ? Math.pow(v.base, 1 / v.exponent) : 0;
      return [
        { label: "Result", value: result > 1e12 ? result.toExponential(4) : result.toLocaleString(), highlight: true },
        { label: "Expression", value: `${v.base}^${v.exponent}` },
        { label: "Inverse (base^-exp)", value: inverse < 0.0001 ? inverse.toExponential(4) : inverse.toFixed(6) },
        { label: "Root (base^(1/exp))", value: root.toFixed(6) },
      ];
    },
    formula: { expression: "Result = Base^Exponent", variables: ["Inverse = Base^(-Exponent)", "Root = Base^(1/Exponent)"] },
    howToUse: "Enter a base number and exponent.",
    faqs: [{ question: "What is 0^0?", answer: "Mathematically debated. Conventionally defined as 1 in combinatorics and computing." }],
    relatedCalcs: otherRel3("exponent-calculator"),
  },
  {
    slug: "logarithm-calculator", name: "Logarithm Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate logarithms with any base — natural log, log base 10, or custom.",
    metaDescription: "Free logarithm calculator. Calculate log of any number with any base.",
    icon: "layers",
    inputs: [
      { id: "number", label: "Number", type: "number", defaultValue: 100, step: 0.1, min: 0.001 },
      { id: "base", label: "Base", type: "number", defaultValue: 10, step: 0.1, min: 0.1 },
    ],
    calculate: (v) => {
      const logResult = Math.log(v.number) / Math.log(v.base);
      const ln = Math.log(v.number);
      const log10 = Math.log10(v.number);
      const log2 = Math.log2(v.number);
      return [
        { label: `log₍${v.base}₎(${v.number})`, value: logResult.toFixed(6), highlight: true },
        { label: "Natural Log (ln)", value: ln.toFixed(6) },
        { label: "Log Base 10", value: log10.toFixed(6) },
        { label: "Log Base 2", value: log2.toFixed(6) },
      ];
    },
    formula: { expression: "log_b(x) = ln(x) ÷ ln(b)", variables: ["ln = natural logarithm (base e)", "Change of base formula"] },
    howToUse: "Enter a number and the logarithm base.",
    faqs: [{ question: "What bases are most common?", answer: "Base 10 (common log), base e (natural log), and base 2 (computer science)." }],
    relatedCalcs: otherRel3("logarithm-calculator"),
  },
  {
    slug: "square-root-calculator", name: "Square Root Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate square roots, cube roots, and nth roots of any number.",
    metaDescription: "Free square root calculator. Find square, cube, and nth roots instantly.",
    icon: "layers",
    inputs: [
      { id: "number", label: "Number", type: "number", defaultValue: 144, step: 0.1 },
    ],
    calculate: (v) => {
      const sqrt = Math.sqrt(Math.abs(v.number));
      const cbrt = Math.cbrt(v.number);
      const squared = v.number * v.number;
      const isPerfect = Number.isInteger(sqrt) && v.number >= 0;
      return [
        { label: "Square Root", value: sqrt.toFixed(6), highlight: true },
        { label: "Cube Root", value: cbrt.toFixed(6) },
        { label: "Number Squared", value: squared > 1e12 ? squared.toExponential(4) : squared.toLocaleString() },
        { label: "Perfect Square?", value: isPerfect ? "Yes ✓" : "No" },
      ];
    },
    formula: { expression: "√x = x^(1/2)", variables: ["∛x = x^(1/3)", "x² = x × x"] },
    howToUse: "Enter any number to find its square root and cube root.",
    faqs: [{ question: "What are perfect squares?", answer: "Numbers whose square root is a whole number: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100..." }],
    relatedCalcs: otherRel3("square-root-calculator"),
  },
  {
    slug: "ratio-calculator", name: "Ratio Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Simplify ratios and solve for missing values in proportions.",
    metaDescription: "Free ratio calculator. Simplify ratios and solve proportions.",
    icon: "layers",
    inputs: [
      { id: "a", label: "A", type: "number", defaultValue: 15 },
      { id: "b", label: "B", type: "number", defaultValue: 25 },
    ],
    calculate: (v) => {
      const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
      const a = Math.abs(Math.round(v.a)), b = Math.abs(Math.round(v.b));
      const g = gcd(a, b);
      const total = a + b;
      const pctA = (a / total) * 100;
      const pctB = (b / total) * 100;
      return [
        { label: "Simplified Ratio", value: `${a/g}:${b/g}`, highlight: true },
        { label: "Original Ratio", value: `${a}:${b}` },
        { label: "A Percentage", value: pctA.toFixed(1) + "%" },
        { label: "B Percentage", value: pctB.toFixed(1) + "%" },
      ];
    },
    formula: { expression: "Simplified = A/GCD : B/GCD", variables: ["GCD = Greatest Common Divisor"] },
    howToUse: "Enter two numbers to simplify their ratio.",
    faqs: [{ question: "What is a ratio?", answer: "A comparison between two quantities. 3:1 means for every 3 of A, there is 1 of B." }],
    relatedCalcs: otherRel3("ratio-calculator"),
  },
  {
    slug: "proportion-calculator", name: "Proportion Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Solve proportions — find the missing value in A/B = C/D.",
    metaDescription: "Free proportion calculator. Solve for missing values in proportions.",
    icon: "layers",
    inputs: [
      { id: "a", label: "A", type: "number", defaultValue: 3 },
      { id: "b", label: "B", type: "number", defaultValue: 4 },
      { id: "c", label: "C", type: "number", defaultValue: 9 },
    ],
    calculate: (v) => {
      const d = (v.b * v.c) / v.a;
      const ratio1 = v.a / v.b;
      const ratio2 = v.c / d;
      return [
        { label: "D (missing value)", value: d.toFixed(4), highlight: true },
        { label: "Proportion", value: `${v.a}/${v.b} = ${v.c}/${d.toFixed(2)}` },
        { label: "Ratio A/B", value: ratio1.toFixed(4) },
        { label: "Ratio C/D", value: ratio2.toFixed(4) },
      ];
    },
    formula: { expression: "A/B = C/D → D = (B × C) ÷ A", variables: ["Cross multiply to solve"] },
    howToUse: "Enter A, B, and C to find the missing D value.",
    faqs: [{ question: "What is a proportion?", answer: "Two equal ratios. If A/B = C/D, then A×D = B×C (cross multiplication)." }],
    relatedCalcs: otherRel3("proportion-calculator"),
  },
  {
    slug: "modulo-calculator", name: "Modulo Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate the remainder of division (modulo operation).",
    metaDescription: "Free modulo calculator. Find the remainder of any division.",
    icon: "layers",
    inputs: [
      { id: "dividend", label: "Dividend", type: "number", defaultValue: 17 },
      { id: "divisor", label: "Divisor", type: "number", defaultValue: 5 },
    ],
    calculate: (v) => {
      if (v.divisor === 0) return [{ label: "Error", value: "Cannot divide by zero", highlight: true }];
      const remainder = v.dividend % v.divisor;
      const quotient = Math.floor(v.dividend / v.divisor);
      const isEven = v.dividend % 2 === 0;
      return [
        { label: "Remainder (mod)", value: remainder.toString(), highlight: true },
        { label: "Quotient", value: quotient.toString() },
        { label: "Division", value: `${v.dividend} = ${quotient} × ${v.divisor} + ${remainder}` },
        { label: "Number is Even?", value: isEven ? "Yes" : "No" },
      ];
    },
    formula: { expression: "A mod B = A - B × floor(A/B)", variables: ["mod = remainder after division"] },
    howToUse: "Enter dividend and divisor to find the remainder.",
    faqs: [{ question: "Where is modulo used?", answer: "Clock arithmetic, cryptography, hash functions, even/odd checking, cycling through arrays." }],
    relatedCalcs: otherRel3("modulo-calculator"),
  },
  {
    slug: "fibonacci-calculator", name: "Fibonacci Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate Fibonacci numbers and the golden ratio.",
    metaDescription: "Free Fibonacci calculator. Find Fibonacci numbers and golden ratio.",
    icon: "layers",
    inputs: [
      { id: "n", label: "Position (n)", type: "number", defaultValue: 10, min: 0, max: 70 },
    ],
    calculate: (v) => {
      const n = Math.min(70, Math.max(0, Math.round(v.n)));
      let a = 0, b = 1;
      for (let i = 0; i < n; i++) { [a, b] = [b, a + b]; }
      const goldenRatio = (1 + Math.sqrt(5)) / 2;
      const prevFib = n > 1 ? Math.round(a / goldenRatio) : 0;
      return [
        { label: `F(${n})`, value: a > 1e12 ? a.toExponential(4) : a.toLocaleString(), highlight: true },
        { label: `F(${n+1})`, value: b > 1e12 ? b.toExponential(4) : b.toLocaleString() },
        { label: "Golden Ratio", value: goldenRatio.toFixed(8) },
        { label: "F(n)/F(n-1) ≈ φ", value: prevFib > 0 ? (a / prevFib).toFixed(6) : "N/A" },
      ];
    },
    formula: { expression: "F(n) = F(n-1) + F(n-2)", variables: ["F(0) = 0, F(1) = 1", "Golden Ratio φ = (1+√5)/2 ≈ 1.618"] },
    howToUse: "Enter a position n (0-70) to find the Fibonacci number.",
    faqs: [{ question: "Where are Fibonacci numbers found?", answer: "Nature (flower petals, pine cones), art, architecture, and financial trading." }],
    relatedCalcs: otherRel3("fibonacci-calculator"),
  },
  {
    slug: "prime-number-checker", name: "Prime Number Checker", category: "Other Calculators", categorySlug: "other",
    description: "Check if a number is prime and find nearby prime numbers.",
    metaDescription: "Free prime number checker. Determine if a number is prime.",
    icon: "layers",
    inputs: [
      { id: "number", label: "Number", type: "number", defaultValue: 97, min: 2 },
    ],
    calculate: (v) => {
      const n = Math.abs(Math.round(v.number));
      const isPrime = (num: number) => {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) if (num % i === 0) return false;
        return true;
      };
      const prime = isPrime(n);
      let nextPrime = n + 1;
      while (!isPrime(nextPrime)) nextPrime++;
      let prevPrime = n - 1;
      while (prevPrime > 1 && !isPrime(prevPrime)) prevPrime--;
      const factors: number[] = [];
      if (!prime) {
        for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) { factors.push(i); if (i !== n/i) factors.push(n/i); }
        factors.sort((a,b) => a-b);
      }
      return [
        { label: "Is Prime?", value: prime ? "Yes ✓" : "No ✗", highlight: true },
        { label: "Next Prime", value: nextPrime.toLocaleString() },
        { label: "Previous Prime", value: prevPrime > 1 ? prevPrime.toLocaleString() : "N/A" },
        { label: prime ? "Digits" : "Factors", value: prime ? n.toString().length.toString() : factors.slice(0,6).join(", ") },
      ];
    },
    formula: { expression: "Check divisibility from 2 to √n", variables: ["If no divisors found, number is prime"] },
    howToUse: "Enter any positive number to check if it's prime.",
    faqs: [{ question: "What is a prime number?", answer: "A number greater than 1 that is only divisible by 1 and itself. E.g., 2, 3, 5, 7, 11, 13..." }],
    relatedCalcs: otherRel3("prime-number-checker"),
  },
  {
    slug: "permutation-calculator", name: "Permutation Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate permutations — arrangements of items where order matters.",
    metaDescription: "Free permutation calculator. Calculate nPr arrangements.",
    icon: "layers",
    inputs: [
      { id: "n", label: "Total Items (n)", type: "number", defaultValue: 10, min: 0, max: 20 },
      { id: "r", label: "Items Chosen (r)", type: "number", defaultValue: 3, min: 0, max: 20 },
    ],
    calculate: (v) => {
      const factorial = (num: number): number => num <= 1 ? 1 : num * factorial(num - 1);
      const n = Math.min(20, Math.max(0, Math.round(v.n)));
      const r = Math.min(n, Math.max(0, Math.round(v.r)));
      const perm = factorial(n) / factorial(n - r);
      const comb = factorial(n) / (factorial(r) * factorial(n - r));
      return [
        { label: "Permutations (nPr)", value: perm > 1e12 ? perm.toExponential(4) : perm.toLocaleString(), highlight: true },
        { label: "Combinations (nCr)", value: comb > 1e12 ? comb.toExponential(4) : comb.toLocaleString() },
        { label: "n!", value: factorial(n) > 1e12 ? factorial(n).toExponential(4) : factorial(n).toLocaleString() },
        { label: "(n-r)!", value: factorial(n-r).toLocaleString() },
      ];
    },
    formula: { expression: "nPr = n! ÷ (n-r)!", variables: ["n = total items", "r = items chosen", "Order matters in permutations"] },
    howToUse: "Enter total items (n) and items chosen (r).",
    faqs: [{ question: "Permutation vs combination?", answer: "Permutation: order matters (ABC ≠ CBA). Combination: order doesn't matter (ABC = CBA)." }],
    relatedCalcs: otherRel3("permutation-calculator"),
  },
  {
    slug: "combination-calculator", name: "Combination Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate combinations — selections where order doesn't matter.",
    metaDescription: "Free combination calculator. Calculate nCr selections.",
    icon: "layers",
    inputs: [
      { id: "n", label: "Total Items (n)", type: "number", defaultValue: 52, min: 0, max: 30 },
      { id: "r", label: "Items Chosen (r)", type: "number", defaultValue: 5, min: 0, max: 30 },
    ],
    calculate: (v) => {
      const factorial = (num: number): number => num <= 1 ? 1 : num * factorial(num - 1);
      const n = Math.min(30, Math.max(0, Math.round(v.n)));
      const r = Math.min(n, Math.max(0, Math.round(v.r)));
      // Use multiplicative formula for larger numbers
      let comb = 1;
      for (let i = 0; i < r; i++) { comb = comb * (n - i) / (i + 1); }
      comb = Math.round(comb);
      const probability = 1 / comb;
      return [
        { label: "Combinations (nCr)", value: comb > 1e12 ? comb.toExponential(4) : comb.toLocaleString(), highlight: true },
        { label: "Expression", value: `C(${n}, ${r})` },
        { label: "Probability (1/nCr)", value: probability < 0.0001 ? probability.toExponential(4) : (probability * 100).toFixed(4) + "%" },
      ];
    },
    formula: { expression: "nCr = n! ÷ (r! × (n-r)!)", variables: ["n = total items", "r = items chosen", "Order does NOT matter"] },
    howToUse: "Enter total items (n) and items chosen (r).",
    faqs: [{ question: "Lottery example?", answer: "Picking 6 from 49: C(49,6) = 13,983,816 possible combinations." }],
    relatedCalcs: otherRel3("combination-calculator"),
  },
  {
    slug: "probability-calculator", name: "Probability Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate probability of events, odds, and expected outcomes.",
    metaDescription: "Free probability calculator. Calculate event probability and odds.",
    icon: "layers",
    inputs: [
      { id: "favorable", label: "Favorable Outcomes", type: "number", defaultValue: 1, min: 0 },
      { id: "total", label: "Total Outcomes", type: "number", defaultValue: 6, min: 1 },
      { id: "trials", label: "Number of Trials", type: "number", defaultValue: 10, min: 1 },
    ],
    calculate: (v) => {
      const prob = v.favorable / v.total;
      const odds = v.favorable / (v.total - v.favorable);
      const expected = prob * v.trials;
      const atLeastOne = 1 - Math.pow(1 - prob, v.trials);
      return [
        { label: "Probability", value: (prob * 100).toFixed(2) + "%", highlight: true },
        { label: "Odds (for:against)", value: `${v.favorable}:${v.total - v.favorable}` },
        { label: "Expected in Trials", value: expected.toFixed(1) },
        { label: "P(at least 1)", value: (atLeastOne * 100).toFixed(2) + "%" },
      ];
    },
    formula: { expression: "P = Favorable ÷ Total", variables: ["Odds = Favorable : Unfavorable", "Expected = P × Trials"] },
    howToUse: "Enter favorable outcomes, total outcomes, and number of trials.",
    faqs: [{ question: "Probability vs odds?", answer: "Probability: chance of occurring (1/6 = 16.7%). Odds: ratio of for vs against (1:5)." }],
    relatedCalcs: otherRel3("probability-calculator"),
  },
  {
    slug: "z-score-calculator", name: "Z-Score Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate Z-scores for data points relative to the mean and standard deviation.",
    metaDescription: "Free Z-score calculator. Calculate standard scores for statistical analysis.",
    icon: "layers",
    inputs: [
      { id: "value", label: "Value (X)", type: "number", defaultValue: 85, step: 0.1 },
      { id: "mean", label: "Mean (μ)", type: "number", defaultValue: 75, step: 0.1 },
      { id: "stdDev", label: "Std Deviation (σ)", type: "number", defaultValue: 10, step: 0.1, min: 0.01 },
    ],
    calculate: (v) => {
      const z = (v.value - v.mean) / v.stdDev;
      // Approximate percentile using normal distribution
      const t = 1 / (1 + 0.2316419 * Math.abs(z));
      const d = 0.3989423 * Math.exp(-z * z / 2);
      const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
      const percentile = z > 0 ? (1 - p) * 100 : p * 100;
      return [
        { label: "Z-Score", value: z.toFixed(4), highlight: true },
        { label: "Percentile", value: percentile.toFixed(2) + "%" },
        { label: "Distance from Mean", value: (v.value - v.mean).toFixed(2) },
        { label: "σ from Mean", value: Math.abs(z).toFixed(2) + " σ" },
      ];
    },
    formula: { expression: "Z = (X - μ) ÷ σ", variables: ["X = observed value", "μ = population mean", "σ = standard deviation"] },
    howToUse: "Enter a data value, the mean, and standard deviation.",
    faqs: [{ question: "What does a Z-score tell you?", answer: "How many standard deviations a value is from the mean. Z=0 is exactly at the mean." }],
    relatedCalcs: otherRel3("z-score-calculator"),
  },
  {
    slug: "weighted-average-calculator", name: "Weighted Average Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate weighted averages for grades, scores, or any weighted data.",
    metaDescription: "Free weighted average calculator. Compute weighted means for grades and scores.",
    icon: "layers",
    inputs: [
      { id: "val1", label: "Value 1", type: "number", defaultValue: 90, step: 0.1 },
      { id: "wt1", label: "Weight 1 (%)", type: "number", defaultValue: 30 },
      { id: "val2", label: "Value 2", type: "number", defaultValue: 85, step: 0.1 },
      { id: "wt2", label: "Weight 2 (%)", type: "number", defaultValue: 30 },
      { id: "val3", label: "Value 3", type: "number", defaultValue: 78, step: 0.1 },
      { id: "wt3", label: "Weight 3 (%)", type: "number", defaultValue: 40 },
    ],
    calculate: (v) => {
      const totalWeight = v.wt1 + v.wt2 + v.wt3;
      const weighted = (v.val1 * v.wt1 + v.val2 * v.wt2 + v.val3 * v.wt3) / totalWeight;
      const simpleAvg = (v.val1 + v.val2 + v.val3) / 3;
      return [
        { label: "Weighted Average", value: weighted.toFixed(2), highlight: true },
        { label: "Simple Average", value: simpleAvg.toFixed(2) },
        { label: "Total Weight", value: totalWeight + "%" },
        { label: "Difference", value: (weighted - simpleAvg).toFixed(2) },
      ];
    },
    formula: { expression: "WA = Σ(Value × Weight) ÷ Σ(Weight)", variables: ["Each value multiplied by its weight", "Divided by total weight"] },
    howToUse: "Enter up to 3 values and their weights (percentages).",
    faqs: [{ question: "When to use weighted average?", answer: "Course grades, investment portfolios, survey results where items have different importance." }],
    relatedCalcs: otherRel3("weighted-average-calculator"),
  },
  {
    slug: "median-calculator", name: "Median Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Find the median (middle value) of a number set.",
    metaDescription: "Free median calculator. Find the middle value of any data set.",
    icon: "layers",
    inputs: [
      { id: "v1", label: "Value 1", type: "number", defaultValue: 12 },
      { id: "v2", label: "Value 2", type: "number", defaultValue: 7 },
      { id: "v3", label: "Value 3", type: "number", defaultValue: 25 },
      { id: "v4", label: "Value 4", type: "number", defaultValue: 18 },
      { id: "v5", label: "Value 5", type: "number", defaultValue: 9 },
    ],
    calculate: (v) => {
      const vals = [v.v1, v.v2, v.v3, v.v4, v.v5].sort((a,b) => a - b);
      const median = vals[2];
      const mean = vals.reduce((s,x) => s+x, 0) / 5;
      const range = vals[4] - vals[0];
      return [
        { label: "Median", value: median.toString(), highlight: true },
        { label: "Mean", value: mean.toFixed(2) },
        { label: "Range", value: range.toString() },
        { label: "Sorted", value: vals.join(", ") },
        { label: "Min / Max", value: `${vals[0]} / ${vals[4]}` },
      ];
    },
    formula: { expression: "Sort values, pick middle one", variables: ["For even count: average of two middle values"] },
    howToUse: "Enter 5 values to find the median.",
    faqs: [{ question: "Median vs mean?", answer: "Median is less affected by outliers. Use median for skewed data (e.g., income)." }],
    relatedCalcs: otherRel3("median-calculator"),
  },
  {
    slug: "variance-calculator", name: "Variance Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate variance and standard deviation of a data set.",
    metaDescription: "Free variance calculator. Compute variance and standard deviation.",
    icon: "layers",
    inputs: [
      { id: "v1", label: "Value 1", type: "number", defaultValue: 10 },
      { id: "v2", label: "Value 2", type: "number", defaultValue: 15 },
      { id: "v3", label: "Value 3", type: "number", defaultValue: 20 },
      { id: "v4", label: "Value 4", type: "number", defaultValue: 12 },
      { id: "v5", label: "Value 5", type: "number", defaultValue: 18 },
    ],
    calculate: (v) => {
      const vals = [v.v1, v.v2, v.v3, v.v4, v.v5];
      const mean = vals.reduce((s,x) => s+x, 0) / 5;
      const variance = vals.reduce((s,x) => s + Math.pow(x - mean, 2), 0) / 5;
      const sampleVariance = vals.reduce((s,x) => s + Math.pow(x - mean, 2), 0) / 4;
      const stdDev = Math.sqrt(variance);
      return [
        { label: "Population Variance", value: variance.toFixed(4), highlight: true },
        { label: "Std Deviation", value: stdDev.toFixed(4) },
        { label: "Sample Variance", value: sampleVariance.toFixed(4) },
        { label: "Mean", value: mean.toFixed(2) },
      ];
    },
    formula: { expression: "σ² = Σ(x - μ)² ÷ N", variables: ["μ = mean", "N = count", "Sample uses N-1"] },
    howToUse: "Enter 5 data values.",
    faqs: [{ question: "Population vs sample variance?", answer: "Population divides by N. Sample divides by N-1 (Bessel's correction)." }],
    relatedCalcs: otherRel3("variance-calculator"),
  },
  {
    slug: "soil-calculator", name: "Soil Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate cubic yards of soil or topsoil needed for garden beds and landscaping.",
    metaDescription: "Free soil calculator. Estimate topsoil needed for your garden project.",
    icon: "layers",
    inputs: [
      { id: "length", label: "Length (ft)", type: "number", defaultValue: 12 },
      { id: "width", label: "Width (ft)", type: "number", defaultValue: 4 },
      { id: "depth", label: "Depth (inches)", type: "number", defaultValue: 6 },
    ],
    calculate: (v) => {
      const cubicFeet = v.length * v.width * (v.depth / 12);
      const cubicYards = cubicFeet / 27;
      const bags40lb = Math.ceil(cubicFeet * 0.75);
      const weightTons = cubicYards * 1.1;
      return [
        { label: "Cubic Yards", value: cubicYards.toFixed(2), highlight: true },
        { label: "Cubic Feet", value: cubicFeet.toFixed(1) },
        { label: "40lb Bags", value: bags40lb.toString() },
        { label: "Weight (tons)", value: weightTons.toFixed(2) },
      ];
    },
    formula: { expression: "Volume = L × W × (D÷12) ÷ 27", variables: ["D in inches converted to feet", "1 cubic yard ≈ 1.1 tons topsoil"] },
    howToUse: "Enter bed length, width in feet and desired soil depth in inches.",
    faqs: [{ question: "How deep should topsoil be?", answer: "Vegetable gardens: 8-12 inches. Flower beds: 4-6 inches. Lawn: 2-4 inches." }],
    relatedCalcs: otherRel3("soil-calculator"),
  },
  {
    slug: "lawn-seed-calculator", name: "Lawn Seed Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate how much grass seed you need for your lawn.",
    metaDescription: "Free lawn seed calculator. Estimate grass seed for new or overseeded lawns.",
    icon: "layers",
    inputs: [
      { id: "length", label: "Lawn Length (ft)", type: "number", defaultValue: 50 },
      { id: "width", label: "Lawn Width (ft)", type: "number", defaultValue: 30 },
      { id: "seedRate", label: "Seed Rate (lbs per 1000 sq ft)", type: "number", defaultValue: 4, step: 0.5 },
    ],
    calculate: (v) => {
      const area = v.length * v.width;
      const seedLbs = (area / 1000) * v.seedRate;
      const overseeding = seedLbs * 0.5;
      const bags5lb = Math.ceil(seedLbs / 5);
      return [
        { label: "Seed Needed", value: seedLbs.toFixed(1) + " lbs", highlight: true },
        { label: "Lawn Area", value: area.toLocaleString() + " sq ft" },
        { label: "For Overseeding", value: overseeding.toFixed(1) + " lbs" },
        { label: "5lb Bags", value: bags5lb.toString() },
      ];
    },
    formula: { expression: "Seed = (Area ÷ 1000) × Rate", variables: ["Rate varies by grass type", "Overseeding = 50% of new lawn rate"] },
    howToUse: "Enter lawn dimensions and seed rate (check bag for rate per 1000 sq ft).",
    faqs: [{ question: "Common seed rates?", answer: "Kentucky Bluegrass: 2-3 lbs. Bermuda: 1-2 lbs. Fescue: 6-8 lbs per 1000 sq ft." }],
    relatedCalcs: otherRel3("lawn-seed-calculator"),
  },
  {
    slug: "wedding-budget-calculator", name: "Wedding Budget Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Plan your wedding budget with cost breakdowns by category.",
    metaDescription: "Free wedding budget calculator. Plan your wedding costs by category.",
    icon: "layers",
    inputs: [
      { id: "totalBudget", label: "Total Budget ($)", type: "number", defaultValue: 30000, prefix: "$" },
      { id: "guests", label: "Number of Guests", type: "number", defaultValue: 100 },
    ],
    calculate: (v) => {
      const venue = v.totalBudget * 0.40;
      const catering = v.totalBudget * 0.25;
      const photography = v.totalBudget * 0.12;
      const attire = v.totalBudget * 0.08;
      const flowers = v.totalBudget * 0.08;
      const misc = v.totalBudget * 0.07;
      const costPerGuest = v.totalBudget / v.guests;
      return [
        { label: "Venue & Reception", value: fmt0(venue), highlight: true },
        { label: "Catering", value: fmt0(catering) },
        { label: "Photography/Video", value: fmt0(photography) },
        { label: "Attire & Beauty", value: fmt0(attire) },
        { label: "Flowers & Decor", value: fmt0(flowers) },
        { label: "Misc (DJ, favors)", value: fmt0(misc) },
        { label: "Cost Per Guest", value: fmt(costPerGuest) },
      ];
    },
    formula: { expression: "Industry standard allocation percentages", variables: ["Venue: 40%", "Catering: 25%", "Photo: 12%", "Attire: 8%"] },
    howToUse: "Enter your total wedding budget and guest count.",
    faqs: [{ question: "Average US wedding cost?", answer: "About $30,000-35,000 in 2024. Varies greatly by location and guest count." }],
    relatedCalcs: otherRel3("wedding-budget-calculator"),
  },
  {
    slug: "photography-exposure-calculator", name: "Photography Exposure Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate exposure settings — aperture, shutter speed, and ISO relationships.",
    metaDescription: "Free photography exposure calculator. Calculate camera settings.",
    icon: "layers",
    inputs: [
      { id: "ev", label: "Exposure Value (EV)", type: "number", defaultValue: 12, step: 1, min: -6, max: 20 },
      { id: "iso", label: "ISO", type: "select", defaultValue: 100, options: [
        { value: 100, label: "ISO 100" },
        { value: 200, label: "ISO 200" },
        { value: 400, label: "ISO 400" },
        { value: 800, label: "ISO 800" },
      ]},
    ],
    calculate: (v) => {
      const isoFactor = Math.log2(v.iso / 100);
      const adjustedEV = v.ev - isoFactor;
      const apertures = [1.4, 2, 2.8, 4, 5.6, 8, 11, 16];
      const f = apertures[Math.min(Math.max(0, Math.round(adjustedEV / 2)), apertures.length - 1)];
      const shutterVal = Math.pow(2, adjustedEV) / (f * f);
      const shutter = shutterVal >= 1 ? `1/${Math.round(shutterVal)}s` : `${(1/shutterVal).toFixed(1)}s`;
      return [
        { label: "Suggested Aperture", value: `f/${f}`, highlight: true },
        { label: "Shutter Speed", value: shutter },
        { label: "ISO", value: v.iso.toString() },
        { label: "Adjusted EV", value: adjustedEV.toFixed(1) },
      ];
    },
    formula: { expression: "EV = log₂(f² / t)", variables: ["f = aperture", "t = shutter speed", "Higher EV = brighter scene"] },
    howToUse: "Enter scene EV (12 = sunny, 8 = overcast, 4 = indoor) and ISO.",
    faqs: [{ question: "What EV for common scenes?", answer: "Bright sun: 15. Cloudy: 12. Indoor: 7-9. Night: 0-4." }],
    relatedCalcs: otherRel3("photography-exposure-calculator"),
  },
  {
    slug: "yarn-calculator", name: "Yarn Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Estimate yarn needed for knitting and crochet projects.",
    metaDescription: "Free yarn calculator. Estimate skeins needed for knitting projects.",
    icon: "layers",
    inputs: [
      { id: "width", label: "Project Width (inches)", type: "number", defaultValue: 50 },
      { id: "height", label: "Project Height (inches)", type: "number", defaultValue: 60 },
      { id: "gauge", label: "Yards per Sq Inch", type: "number", defaultValue: 1.5, step: 0.1 },
      { id: "skeinYards", label: "Yards per Skein", type: "number", defaultValue: 220 },
    ],
    calculate: (v) => {
      const area = v.width * v.height;
      const yardsNeeded = area * v.gauge;
      const skeins = yardsNeeded / v.skeinYards;
      const withWaste = skeins * 1.1;
      return [
        { label: "Skeins Needed", value: Math.ceil(withWaste).toString(), highlight: true },
        { label: "Total Yards", value: Math.round(yardsNeeded).toLocaleString() },
        { label: "Project Area", value: area.toLocaleString() + " sq in" },
        { label: "With 10% Extra", value: Math.round(yardsNeeded * 1.1).toLocaleString() + " yds" },
      ];
    },
    formula: { expression: "Yards = Area × Yards Per Sq Inch", variables: ["Add 10% for waste and gauge changes"] },
    howToUse: "Enter project dimensions, yarn usage per square inch, and skein yardage.",
    faqs: [{ question: "How do I find yards per square inch?", answer: "Knit a swatch, measure area, divide yarn used by area. Or use pattern guidelines." }],
    relatedCalcs: otherRel3("yarn-calculator"),
  },
  {
    slug: "candle-making-calculator", name: "Candle Making Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate wax, fragrance oil, and wick needs for candle making.",
    metaDescription: "Free candle making calculator. Estimate wax and fragrance oil for candles.",
    icon: "layers",
    inputs: [
      { id: "containerOz", label: "Container Size (oz)", type: "number", defaultValue: 8 },
      { id: "numCandles", label: "Number of Candles", type: "number", defaultValue: 6 },
      { id: "fragranceLoad", label: "Fragrance Load (%)", type: "number", defaultValue: 10, suffix: "%", step: 1 },
    ],
    calculate: (v) => {
      const totalOz = v.containerOz * v.numCandles;
      const waxOz = totalOz * (1 - v.fragranceLoad / 100);
      const fragranceOz = totalOz * (v.fragranceLoad / 100);
      const waxLbs = waxOz / 16;
      return [
        { label: "Wax Needed", value: waxLbs.toFixed(1) + " lbs", highlight: true },
        { label: "Fragrance Oil", value: fragranceOz.toFixed(1) + " oz" },
        { label: "Total Wax (oz)", value: waxOz.toFixed(1) + " oz" },
        { label: "Wicks Needed", value: v.numCandles.toString() },
      ];
    },
    formula: { expression: "Wax = Total oz × (1 - Fragrance%)", variables: ["6-12% fragrance load typical", "1 lb wax ≈ 20 oz by volume"] },
    howToUse: "Enter container size, number of candles, and fragrance percentage.",
    faqs: [{ question: "What fragrance load is best?", answer: "6-10% for soy wax. 10-12% for paraffin. Don't exceed manufacturer's recommendation." }],
    relatedCalcs: otherRel3("candle-making-calculator"),
  },
  {
    slug: "knitting-gauge-calculator", name: "Knitting Gauge Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate stitches and rows needed based on gauge swatch measurements.",
    metaDescription: "Free knitting gauge calculator. Convert gauge to stitches and rows.",
    icon: "layers",
    inputs: [
      { id: "stitchesPer4in", label: "Stitches per 4 inches", type: "number", defaultValue: 20 },
      { id: "rowsPer4in", label: "Rows per 4 inches", type: "number", defaultValue: 28 },
      { id: "desiredWidth", label: "Desired Width (inches)", type: "number", defaultValue: 20 },
      { id: "desiredHeight", label: "Desired Height (inches)", type: "number", defaultValue: 24 },
    ],
    calculate: (v) => {
      const stitchesPerInch = v.stitchesPer4in / 4;
      const rowsPerInch = v.rowsPer4in / 4;
      const totalStitches = Math.round(stitchesPerInch * v.desiredWidth);
      const totalRows = Math.round(rowsPerInch * v.desiredHeight);
      return [
        { label: "Cast On Stitches", value: totalStitches.toString(), highlight: true },
        { label: "Total Rows", value: totalRows.toString() },
        { label: "Stitches/inch", value: stitchesPerInch.toFixed(1) },
        { label: "Rows/inch", value: rowsPerInch.toFixed(1) },
      ];
    },
    formula: { expression: "Stitches = (Gauge ÷ 4) × Width", variables: ["Gauge measured over 4 inches"] },
    howToUse: "Enter your gauge swatch measurements and desired project dimensions.",
    faqs: [{ question: "Why does gauge matter?", answer: "Different gauge = different finished size. Always check gauge before starting a project." }],
    relatedCalcs: otherRel3("knitting-gauge-calculator"),
  },
  {
    slug: "curtain-calculator", name: "Curtain Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate fabric needed for curtains based on window measurements.",
    metaDescription: "Free curtain calculator. Estimate fabric for window curtains.",
    icon: "layers",
    inputs: [
      { id: "windowWidth", label: "Window Width (inches)", type: "number", defaultValue: 60 },
      { id: "windowHeight", label: "Window Height (inches)", type: "number", defaultValue: 48 },
      { id: "fullness", label: "Fullness Ratio", type: "select", defaultValue: 2, options: [
        { value: 1.5, label: "Minimal (1.5×)" },
        { value: 2, label: "Standard (2×)" },
        { value: 2.5, label: "Full (2.5×)" },
        { value: 3, label: "Luxury (3×)" },
      ]},
    ],
    calculate: (v) => {
      const fabricWidth = v.windowWidth * v.fullness;
      const totalHeight = v.windowHeight + 12;
      const panels = Math.ceil(fabricWidth / 54);
      const fabricYards = (totalHeight * panels) / 36;
      return [
        { label: "Fabric Needed", value: fabricYards.toFixed(1) + " yards", highlight: true },
        { label: "Total Width", value: Math.round(fabricWidth) + " in" },
        { label: "Panels Needed", value: panels.toString() },
        { label: "Panel Height", value: totalHeight + " in" },
      ];
    },
    formula: { expression: "Width = Window × Fullness", variables: ["Add 12 inches to height for hem/rod pocket", "54 inch fabric width standard"] },
    howToUse: "Enter window width, height, and desired fullness.",
    faqs: [{ question: "What fullness ratio?", answer: "2× is standard for pleated curtains. 1.5× for flat panels. 2.5-3× for luxury look." }],
    relatedCalcs: otherRel3("curtain-calculator"),
  },
  {
    slug: "deck-calculator", name: "Deck Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate decking boards, screws, and posts needed for a deck project.",
    metaDescription: "Free deck calculator. Estimate materials for building a deck.",
    icon: "layers",
    inputs: [
      { id: "length", label: "Deck Length (ft)", type: "number", defaultValue: 16 },
      { id: "width", label: "Deck Width (ft)", type: "number", defaultValue: 12 },
      { id: "boardWidth", label: "Board Width (inches)", type: "number", defaultValue: 5.5 },
    ],
    calculate: (v) => {
      const area = v.length * v.width;
      const boardsNeeded = Math.ceil((v.width * 12) / (v.boardWidth + 0.125));
      const totalLinearFt = boardsNeeded * v.length;
      const screws = Math.ceil(area * 2.5);
      const posts = Math.ceil(v.length / 6) * 2 + 2;
      return [
        { label: "Boards Needed", value: boardsNeeded.toString(), highlight: true },
        { label: "Linear Feet", value: totalLinearFt.toLocaleString() },
        { label: "Deck Screws", value: screws.toLocaleString() },
        { label: "Posts (6ft spacing)", value: posts.toString() },
        { label: "Deck Area", value: area + " sq ft" },
      ];
    },
    formula: { expression: "Boards = (Width × 12) ÷ Board Width", variables: ["0.125 inch gap between boards", "~2.5 screws per sq ft"] },
    howToUse: "Enter deck length, width, and board width.",
    faqs: [{ question: "Common deck board sizes?", answer: "5.5 inches (standard), 3.5 inches (narrow). Composite and wood available." }],
    relatedCalcs: otherRel3("deck-calculator"),
  },
  {
    slug: "fertilizer-calculator", name: "Fertilizer Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate fertilizer amount based on lawn size and NPK ratio.",
    metaDescription: "Free fertilizer calculator. Determine how much fertilizer your lawn needs.",
    icon: "layers",
    inputs: [
      { id: "area", label: "Lawn Area (sq ft)", type: "number", defaultValue: 5000 },
      { id: "nRate", label: "N Rate (lbs N per 1000 sqft)", type: "number", defaultValue: 1, step: 0.25 },
      { id: "nPercent", label: "Fertilizer N% (first number)", type: "number", defaultValue: 20 },
    ],
    calculate: (v) => {
      const nNeeded = (v.area / 1000) * v.nRate;
      const productNeeded = nNeeded / (v.nPercent / 100);
      const bags25 = Math.ceil(productNeeded / 25);
      const bags50 = Math.ceil(productNeeded / 50);
      return [
        { label: "Product Needed", value: productNeeded.toFixed(1) + " lbs", highlight: true },
        { label: "Nitrogen Needed", value: nNeeded.toFixed(1) + " lbs" },
        { label: "25lb Bags", value: bags25.toString() },
        { label: "50lb Bags", value: bags50.toString() },
      ];
    },
    formula: { expression: "Product = N Needed ÷ (N% ÷ 100)", variables: ["N Needed = Area/1000 × Rate", "N% = first number on fertilizer bag"] },
    howToUse: "Enter lawn area, desired nitrogen rate, and fertilizer N percentage.",
    faqs: [{ question: "What does 20-5-10 mean?", answer: "20% Nitrogen, 5% Phosphorus, 10% Potassium by weight." }],
    relatedCalcs: otherRel3("fertilizer-calculator"),
  },
  {
    slug: "screen-resolution-calculator", name: "Screen Resolution Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate PPI (pixels per inch), total pixels, and aspect ratio for any display.",
    metaDescription: "Free screen resolution calculator. Find PPI and aspect ratio for displays.",
    icon: "layers",
    inputs: [
      { id: "hPixels", label: "Horizontal Pixels", type: "number", defaultValue: 2560 },
      { id: "vPixels", label: "Vertical Pixels", type: "number", defaultValue: 1440 },
      { id: "diagonal", label: "Screen Diagonal (inches)", type: "number", defaultValue: 27, step: 0.1 },
    ],
    calculate: (v) => {
      const diagPixels = Math.sqrt(v.hPixels * v.hPixels + v.vPixels * v.vPixels);
      const ppi = diagPixels / v.diagonal;
      const totalPixels = v.hPixels * v.vPixels;
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
      const g = gcd(v.hPixels, v.vPixels);
      return [
        { label: "PPI", value: Math.round(ppi) + " PPI", highlight: true },
        { label: "Aspect Ratio", value: `${v.hPixels/g}:${v.vPixels/g}` },
        { label: "Total Pixels", value: (totalPixels / 1e6).toFixed(2) + " MP" },
        { label: "Resolution", value: `${v.hPixels}×${v.vPixels}` },
      ];
    },
    formula: { expression: "PPI = √(H² + V²) ÷ Diagonal", variables: ["H = horizontal pixels", "V = vertical pixels"] },
    howToUse: "Enter display resolution and screen diagonal size.",
    faqs: [{ question: "What PPI is 'Retina'?", answer: "Apple considers 220+ PPI for laptops and 300+ for phones as Retina." }],
    relatedCalcs: otherRel3("screen-resolution-calculator"),
  },
  {
    slug: "random-number-generator", name: "Random Number Generator", category: "Other Calculators", categorySlug: "other",
    description: "Generate random numbers within a specified range.",
    metaDescription: "Free random number generator. Generate random numbers in any range.",
    icon: "layers",
    inputs: [
      { id: "min", label: "Minimum", type: "number", defaultValue: 1 },
      { id: "max", label: "Maximum", type: "number", defaultValue: 100 },
      { id: "count", label: "How Many", type: "number", defaultValue: 1, min: 1, max: 10 },
    ],
    calculate: (v) => {
      const mn = Math.min(v.min, v.max);
      const mx = Math.max(v.min, v.max);
      const nums: number[] = [];
      for (let i = 0; i < Math.min(v.count, 10); i++) {
        nums.push(Math.floor(Math.random() * (mx - mn + 1)) + mn);
      }
      const range = mx - mn;
      return [
        { label: "Random Number(s)", value: nums.join(", "), highlight: true },
        { label: "Range", value: `${mn} to ${mx}` },
        { label: "Possible Values", value: (range + 1).toLocaleString() },
      ];
    },
    formula: { expression: "Random = floor(Math.random × Range) + Min", variables: ["Uniform distribution", "Pseudo-random generation"] },
    howToUse: "Set a minimum and maximum value, and how many random numbers to generate.",
    faqs: [{ question: "Is this truly random?", answer: "It uses JavaScript's pseudo-random generator. Suitable for most purposes, not for cryptography." }],
    relatedCalcs: otherRel3("random-number-generator"),
  },
  {
    slug: "word-count-calculator", name: "Word Count Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate word count, character count, sentences, and reading time.",
    metaDescription: "Free word count calculator. Count words, characters, and estimate reading time.",
    icon: "layers",
    inputs: [
      { id: "words", label: "Word Count", type: "number", defaultValue: 1500 },
      { id: "charsPerWord", label: "Avg Characters/Word", type: "number", defaultValue: 5, step: 0.1 },
    ],
    calculate: (v) => {
      const characters = v.words * v.charsPerWord;
      const sentences = Math.round(v.words / 15);
      const paragraphs = Math.round(sentences / 5);
      const readingTime = v.words / 250;
      const speakingTime = v.words / 150;
      return [
        { label: "Characters", value: Math.round(characters).toLocaleString(), highlight: true },
        { label: "Sentences (est)", value: sentences.toLocaleString() },
        { label: "Paragraphs (est)", value: paragraphs.toString() },
        { label: "Reading Time", value: readingTime.toFixed(1) + " min" },
        { label: "Speaking Time", value: speakingTime.toFixed(1) + " min" },
      ];
    },
    formula: { expression: "Characters = Words × Avg Chars/Word", variables: ["Reading: ~250 WPM", "Speaking: ~150 WPM"] },
    howToUse: "Enter word count and average characters per word.",
    faqs: [{ question: "Average blog post length?", answer: "1500-2500 words for SEO. Social posts: 40-80 words. Emails: 50-200 words." }],
    relatedCalcs: otherRel3("word-count-calculator"),
  },
  {
    slug: "grade-calculator", name: "Grade Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate your overall grade from individual assignment scores and weights.",
    metaDescription: "Free grade calculator. Calculate final grades from weighted assignments.",
    icon: "layers",
    inputs: [
      { id: "score1", label: "Assignment 1 Score (%)", type: "number", defaultValue: 92 },
      { id: "weight1", label: "Weight 1 (%)", type: "number", defaultValue: 25 },
      { id: "score2", label: "Assignment 2 Score (%)", type: "number", defaultValue: 85 },
      { id: "weight2", label: "Weight 2 (%)", type: "number", defaultValue: 25 },
      { id: "score3", label: "Assignment 3 Score (%)", type: "number", defaultValue: 78 },
      { id: "weight3", label: "Weight 3 (%)", type: "number", defaultValue: 50 },
    ],
    calculate: (v) => {
      const totalWeight = v.weight1 + v.weight2 + v.weight3;
      const overall = (v.score1 * v.weight1 + v.score2 * v.weight2 + v.score3 * v.weight3) / totalWeight;
      let letter = "F";
      if (overall >= 93) letter = "A";
      else if (overall >= 90) letter = "A-";
      else if (overall >= 87) letter = "B+";
      else if (overall >= 83) letter = "B";
      else if (overall >= 80) letter = "B-";
      else if (overall >= 77) letter = "C+";
      else if (overall >= 73) letter = "C";
      else if (overall >= 70) letter = "C-";
      else if (overall >= 67) letter = "D+";
      else if (overall >= 60) letter = "D";
      return [
        { label: "Overall Grade", value: overall.toFixed(1) + "%", highlight: true },
        { label: "Letter Grade", value: letter },
        { label: "Total Weight", value: totalWeight + "%" },
        { label: "Points Earned", value: ((overall / 100) * totalWeight).toFixed(1) },
      ];
    },
    formula: { expression: "Grade = Σ(Score × Weight) ÷ Σ(Weight)", variables: ["Each assignment weighted by importance"] },
    howToUse: "Enter scores and weights for up to 3 assignments.",
    faqs: [{ question: "How do letter grades work?", answer: "A: 93-100, A-: 90-92, B+: 87-89, B: 83-86, etc." }],
    relatedCalcs: otherRel3("grade-calculator"),
  },
  {
    slug: "paint-color-mixer", name: "Color Mixer Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Mix two colors and see the resulting RGB and HEX values.",
    metaDescription: "Free color mixer calculator. Blend two RGB colors and see the result.",
    icon: "layers",
    inputs: [
      { id: "r1", label: "Color 1 Red (0-255)", type: "number", defaultValue: 255, min: 0, max: 255 },
      { id: "g1", label: "Color 1 Green (0-255)", type: "number", defaultValue: 0, min: 0, max: 255 },
      { id: "b1", label: "Color 1 Blue (0-255)", type: "number", defaultValue: 0, min: 0, max: 255 },
      { id: "r2", label: "Color 2 Red (0-255)", type: "number", defaultValue: 0, min: 0, max: 255 },
      { id: "g2", label: "Color 2 Green (0-255)", type: "number", defaultValue: 0, min: 0, max: 255 },
      { id: "b2", label: "Color 2 Blue (0-255)", type: "number", defaultValue: 255, min: 0, max: 255 },
    ],
    calculate: (v) => {
      const mr = Math.round((v.r1 + v.r2) / 2);
      const mg = Math.round((v.g1 + v.g2) / 2);
      const mb = Math.round((v.b1 + v.b2) / 2);
      const hex1 = `#${v.r1.toString(16).padStart(2,'0')}${v.g1.toString(16).padStart(2,'0')}${v.b1.toString(16).padStart(2,'0')}`.toUpperCase();
      const hex2 = `#${v.r2.toString(16).padStart(2,'0')}${v.g2.toString(16).padStart(2,'0')}${v.b2.toString(16).padStart(2,'0')}`.toUpperCase();
      const hexMix = `#${mr.toString(16).padStart(2,'0')}${mg.toString(16).padStart(2,'0')}${mb.toString(16).padStart(2,'0')}`.toUpperCase();
      return [
        { label: "Mixed Color (HEX)", value: hexMix, highlight: true },
        { label: "Mixed RGB", value: `rgb(${mr}, ${mg}, ${mb})` },
        { label: "Color 1", value: hex1 },
        { label: "Color 2", value: hex2 },
      ];
    },
    formula: { expression: "Mixed = Average of RGB channels", variables: ["R = (R1+R2)/2", "G = (G1+G2)/2", "B = (B1+B2)/2"] },
    howToUse: "Enter RGB values (0-255) for two colors to see the blended result.",
    faqs: [{ question: "How does color mixing work digitally?", answer: "Additive mixing averages RGB values. This differs from paint mixing (subtractive)." }],
    relatedCalcs: otherRel3("paint-color-mixer"),
  },
];
