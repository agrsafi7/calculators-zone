import { CalculatorConfig } from "@/components/CalculatorTemplate";

const mathRelated = (exclude: string) => [
  { name: "Percentage Calculator", slug: "percentage-calculator", icon: "hash", category: "math" },
  { name: "Fraction Calculator", slug: "fraction-calculator", icon: "hash", category: "math" },
  { name: "GPA Calculator", slug: "gpa-calculator", icon: "hash", category: "math" },
  { name: "Area Calculator", slug: "area-calculator", icon: "hash", category: "math" },
].filter((c) => c.slug !== exclude);

export const mathCalculatorsExtended: CalculatorConfig[] = [
  // ===== ALGEBRA =====
  {
    slug: "linear-equation-solver", name: "Linear Equation Solver", category: "Math", categorySlug: "math", subcategory: "Algebra",
    description: "Solve linear equations of the form ax + b = c for x.", metaDescription: "Free linear equation solver. Find x in ax + b = c instantly.", icon: "hash",
    inputs: [
      { id: "a", label: "Coefficient a", type: "number", defaultValue: 3 },
      { id: "b", label: "Constant b", type: "number", defaultValue: 5 },
      { id: "c", label: "Result c", type: "number", defaultValue: 20 },
    ],
    calculate: (v) => {
      if (v.a === 0) return [{ label: "Error", value: "Coefficient a cannot be zero" }];
      const x = (v.c - v.b) / v.a;
      return [
        { label: "x", value: x.toFixed(6), highlight: true },
        { label: "Equation", value: `${v.a}x + ${v.b} = ${v.c}` },
        { label: "Verification", value: `${v.a} × ${x.toFixed(4)} + ${v.b} = ${(v.a * x + v.b).toFixed(4)}` },
      ];
    },
    formula: { expression: "x = (c - b) / a", variables: ["ax + b = c"] },
    howToUse: "Enter coefficients a, b, and result c to solve for x.", faqs: [{ question: "What if a is zero?", answer: "If a=0, the equation has no variable term and cannot be solved for x." }],
    relatedCalcs: mathRelated("linear-equation-solver"),
  },
  {
    slug: "system-of-equations-calculator", name: "System of Equations Calculator", category: "Math", categorySlug: "math", subcategory: "Algebra",
    description: "Solve a system of two linear equations with two unknowns using Cramer's rule.", metaDescription: "Free system of equations solver. Solve 2x2 linear systems instantly.", icon: "hash",
    inputs: [
      { id: "a1", label: "a₁ (eq1: a₁x + b₁y = c₁)", type: "number", defaultValue: 2 },
      { id: "b1", label: "b₁", type: "number", defaultValue: 3 },
      { id: "c1", label: "c₁", type: "number", defaultValue: 8 },
      { id: "a2", label: "a₂ (eq2: a₂x + b₂y = c₂)", type: "number", defaultValue: 4 },
      { id: "b2", label: "b₂", type: "number", defaultValue: -1 },
      { id: "c2", label: "c₂", type: "number", defaultValue: 2 },
    ],
    calculate: (v) => {
      const det = v.a1 * v.b2 - v.a2 * v.b1;
      if (det === 0) return [{ label: "Result", value: "No unique solution (parallel or coincident lines)" }];
      const x = (v.c1 * v.b2 - v.c2 * v.b1) / det;
      const y = (v.a1 * v.c2 - v.a2 * v.c1) / det;
      return [
        { label: "x", value: x.toFixed(6), highlight: true },
        { label: "y", value: y.toFixed(6), highlight: true },
        { label: "Determinant", value: det.toFixed(4) },
      ];
    },
    formula: { expression: "Cramer's Rule: x = (c₁b₂ - c₂b₁) / det, y = (a₁c₂ - a₂c₁) / det", variables: ["det = a₁b₂ - a₂b₁"] },
    howToUse: "Enter coefficients for two equations to find x and y.", faqs: [{ question: "What if determinant is zero?", answer: "The system has no unique solution — the lines are parallel or the same line." }],
    relatedCalcs: mathRelated("system-of-equations-calculator"),
  },
  {
    slug: "polynomial-calculator", name: "Polynomial Calculator", category: "Math", categorySlug: "math", subcategory: "Algebra",
    description: "Evaluate a polynomial at a given value of x.", metaDescription: "Free polynomial calculator. Evaluate polynomials up to degree 4.", icon: "hash",
    inputs: [
      { id: "a4", label: "x⁴ coefficient", type: "number", defaultValue: 0 },
      { id: "a3", label: "x³ coefficient", type: "number", defaultValue: 1 },
      { id: "a2", label: "x² coefficient", type: "number", defaultValue: -3 },
      { id: "a1", label: "x coefficient", type: "number", defaultValue: 2 },
      { id: "a0", label: "Constant", type: "number", defaultValue: -5 },
      { id: "x", label: "Value of x", type: "number", defaultValue: 2 },
    ],
    calculate: (v) => {
      const result = v.a4 * v.x ** 4 + v.a3 * v.x ** 3 + v.a2 * v.x ** 2 + v.a1 * v.x + v.a0;
      return [
        { label: "P(x)", value: result.toFixed(6), highlight: true },
        { label: "x value", value: `${v.x}` },
      ];
    },
    formula: { expression: "P(x) = a₄x⁴ + a₃x³ + a₂x² + a₁x + a₀", variables: ["Evaluate at given x"] },
    howToUse: "Enter polynomial coefficients and x value to evaluate.", faqs: [{ question: "What is a polynomial?", answer: "An expression with variables raised to non-negative integer powers, like 3x² + 2x - 1." }],
    relatedCalcs: mathRelated("polynomial-calculator"),
  },
  {
    slug: "polynomial-roots-calculator", name: "Polynomial Roots Calculator", category: "Math", categorySlug: "math", subcategory: "Algebra",
    description: "Find the roots of a quadratic polynomial ax² + bx + c = 0.", metaDescription: "Free polynomial roots calculator using the quadratic formula.", icon: "hash",
    inputs: [
      { id: "a", label: "a (x² coefficient)", type: "number", defaultValue: 1 },
      { id: "b", label: "b (x coefficient)", type: "number", defaultValue: -5 },
      { id: "c", label: "c (constant)", type: "number", defaultValue: 6 },
    ],
    calculate: (v) => {
      if (v.a === 0) return [{ label: "Error", value: "Not a quadratic (a=0)" }];
      const disc = v.b ** 2 - 4 * v.a * v.c;
      if (disc < 0) {
        const real = (-v.b / (2 * v.a)).toFixed(4);
        const imag = (Math.sqrt(-disc) / (2 * v.a)).toFixed(4);
        return [
          { label: "Root 1", value: `${real} + ${imag}i`, highlight: true },
          { label: "Root 2", value: `${real} - ${imag}i` },
          { label: "Discriminant", value: `${disc} (complex roots)` },
        ];
      }
      const r1 = (-v.b + Math.sqrt(disc)) / (2 * v.a);
      const r2 = (-v.b - Math.sqrt(disc)) / (2 * v.a);
      return [
        { label: "Root 1", value: r1.toFixed(6), highlight: true },
        { label: "Root 2", value: r2.toFixed(6) },
        { label: "Discriminant", value: `${disc.toFixed(4)}` },
      ];
    },
    formula: { expression: "x = (-b ± √(b²-4ac)) / 2a", variables: ["Discriminant = b² - 4ac"] },
    howToUse: "Enter coefficients a, b, c to find roots.", faqs: [{ question: "What if discriminant is negative?", answer: "The roots are complex (imaginary) numbers." }],
    relatedCalcs: mathRelated("polynomial-roots-calculator"),
  },
  {
    slug: "polynomial-long-division-calculator", name: "Polynomial Long Division Calculator", category: "Math", categorySlug: "math", subcategory: "Algebra",
    description: "Divide a polynomial by a linear divisor (x - k) using long division.", metaDescription: "Free polynomial long division calculator.", icon: "hash",
    inputs: [
      { id: "a3", label: "x³ coefficient", type: "number", defaultValue: 1 },
      { id: "a2", label: "x² coefficient", type: "number", defaultValue: -6 },
      { id: "a1", label: "x coefficient", type: "number", defaultValue: 11 },
      { id: "a0", label: "Constant", type: "number", defaultValue: -6 },
      { id: "k", label: "Divisor (x - k), enter k", type: "number", defaultValue: 1 },
    ],
    calculate: (v) => {
      // Synthetic division
      const coeffs = [v.a3, v.a2, v.a1, v.a0];
      const result: number[] = [];
      let carry = 0;
      for (const c of coeffs) {
        const val = c + carry;
        result.push(val);
        carry = val * v.k;
      }
      const remainder = result.pop()!;
      return [
        { label: "Quotient", value: `${result[0]}x² + ${result[1]}x + ${result[2]}`, highlight: true },
        { label: "Remainder", value: `${remainder}` },
        { label: "P(k)", value: `${remainder} (Remainder Theorem)` },
      ];
    },
    formula: { expression: "Divide polynomial by (x - k) using synthetic division", variables: ["Remainder = P(k)"] },
    howToUse: "Enter cubic polynomial coefficients and divisor k.", faqs: [{ question: "What is synthetic division?", answer: "A shorthand method for dividing a polynomial by a linear factor (x - k)." }],
    relatedCalcs: mathRelated("polynomial-long-division-calculator"),
  },
  {
    slug: "synthetic-division-calculator", name: "Synthetic Division Calculator", category: "Math", categorySlug: "math", subcategory: "Algebra",
    description: "Perform synthetic division of a polynomial by (x - c).", metaDescription: "Free synthetic division calculator for polynomials.", icon: "hash",
    inputs: [
      { id: "a3", label: "x³ coefficient", type: "number", defaultValue: 2 },
      { id: "a2", label: "x² coefficient", type: "number", defaultValue: -3 },
      { id: "a1", label: "x coefficient", type: "number", defaultValue: 1 },
      { id: "a0", label: "Constant", type: "number", defaultValue: -6 },
      { id: "c", label: "c (dividing by x - c)", type: "number", defaultValue: 2 },
    ],
    calculate: (v) => {
      const coeffs = [v.a3, v.a2, v.a1, v.a0];
      const result: number[] = [];
      let carry = 0;
      for (const coeff of coeffs) {
        const val = coeff + carry;
        result.push(val);
        carry = val * v.c;
      }
      const remainder = result.pop()!;
      return [
        { label: "Quotient coefficients", value: result.join(", "), highlight: true },
        { label: "Remainder", value: `${remainder}` },
        { label: "Is (x-c) a factor?", value: remainder === 0 ? "Yes ✓" : "No" },
      ];
    },
    formula: { expression: "Bring down, multiply by c, add to next coefficient", variables: ["Last value = remainder"] },
    howToUse: "Enter polynomial coefficients and c value.", faqs: [{ question: "When is (x-c) a factor?", answer: "When the remainder is zero." }],
    relatedCalcs: mathRelated("synthetic-division-calculator"),
  },
  {
    slug: "completing-the-square-calculator", name: "Completing the Square Calculator", category: "Math", categorySlug: "math", subcategory: "Algebra",
    description: "Convert ax² + bx + c to vertex form a(x-h)² + k.", metaDescription: "Free completing the square calculator.", icon: "hash",
    inputs: [
      { id: "a", label: "a", type: "number", defaultValue: 1 },
      { id: "b", label: "b", type: "number", defaultValue: -6 },
      { id: "c", label: "c", type: "number", defaultValue: 5 },
    ],
    calculate: (v) => {
      if (v.a === 0) return [{ label: "Error", value: "a cannot be zero" }];
      const h = -v.b / (2 * v.a);
      const k = v.c - (v.b ** 2) / (4 * v.a);
      return [
        { label: "Vertex Form", value: `${v.a}(x - ${h.toFixed(4)})² + ${k.toFixed(4)}`, highlight: true },
        { label: "Vertex (h, k)", value: `(${h.toFixed(4)}, ${k.toFixed(4)})` },
        { label: "Axis of Symmetry", value: `x = ${h.toFixed(4)}` },
      ];
    },
    formula: { expression: "h = -b/(2a), k = c - b²/(4a)", variables: ["Vertex form: a(x-h)² + k"] },
    howToUse: "Enter a, b, c to convert to vertex form.", faqs: [{ question: "Why complete the square?", answer: "To find the vertex of a parabola and to solve quadratic equations." }],
    relatedCalcs: mathRelated("completing-the-square-calculator"),
  },
  {
    slug: "factoring-polynomials-calculator", name: "Factoring Polynomials Calculator", category: "Math", categorySlug: "math", subcategory: "Algebra",
    description: "Factor a quadratic expression ax² + bx + c into two binomials.", metaDescription: "Free factoring calculator for quadratic polynomials.", icon: "hash",
    inputs: [
      { id: "a", label: "a", type: "number", defaultValue: 1 },
      { id: "b", label: "b", type: "number", defaultValue: -5 },
      { id: "c", label: "c", type: "number", defaultValue: 6 },
    ],
    calculate: (v) => {
      const disc = v.b ** 2 - 4 * v.a * v.c;
      if (disc < 0) return [{ label: "Result", value: "Cannot be factored over real numbers" }];
      const r1 = (-v.b + Math.sqrt(disc)) / (2 * v.a);
      const r2 = (-v.b - Math.sqrt(disc)) / (2 * v.a);
      return [
        { label: "Factored Form", value: `${v.a === 1 ? "" : v.a}(x - ${r1.toFixed(4)})(x - ${r2.toFixed(4)})`, highlight: true },
        { label: "Root 1", value: r1.toFixed(6) },
        { label: "Root 2", value: r2.toFixed(6) },
        { label: "Sum of roots", value: (r1 + r2).toFixed(4) },
        { label: "Product of roots", value: (r1 * r2).toFixed(4) },
      ];
    },
    formula: { expression: "Find r₁, r₂ such that a(x-r₁)(x-r₂) = ax²+bx+c", variables: ["r₁+r₂ = -b/a", "r₁·r₂ = c/a"] },
    howToUse: "Enter coefficients to factor the quadratic.", faqs: [{ question: "Can all quadratics be factored?", answer: "Over real numbers, only if discriminant ≥ 0." }],
    relatedCalcs: mathRelated("factoring-polynomials-calculator"),
  },
  {
    slug: "partial-fraction-decomposition-calculator", name: "Partial Fraction Decomposition Calculator", category: "Math", categorySlug: "math", subcategory: "Algebra",
    description: "Decompose a rational expression A/(x-p)(x-q) into partial fractions.", metaDescription: "Free partial fraction decomposition calculator.", icon: "hash",
    inputs: [
      { id: "A", label: "Numerator constant A", type: "number", defaultValue: 5 },
      { id: "p", label: "Root p (x - p)", type: "number", defaultValue: 1 },
      { id: "q", label: "Root q (x - q)", type: "number", defaultValue: 3 },
    ],
    calculate: (v) => {
      if (v.p === v.q) return [{ label: "Error", value: "Roots must be different" }];
      const B = v.A / (v.p - v.q);
      const C = v.A / (v.q - v.p);
      return [
        { label: "Decomposition", value: `${B.toFixed(4)}/(x-${v.p}) + ${C.toFixed(4)}/(x-${v.q})`, highlight: true },
        { label: "Coefficient 1", value: B.toFixed(6) },
        { label: "Coefficient 2", value: C.toFixed(6) },
      ];
    },
    formula: { expression: "A/((x-p)(x-q)) = B/(x-p) + C/(x-q)", variables: ["B = A/(p-q)", "C = A/(q-p)"] },
    howToUse: "Enter the numerator and two distinct roots.", faqs: [{ question: "When is this used?", answer: "In integration of rational functions and Laplace transforms." }],
    relatedCalcs: mathRelated("partial-fraction-decomposition-calculator"),
  },
  {
    slug: "rational-expression-simplifier", name: "Rational Expression Simplifier", category: "Math", categorySlug: "math", subcategory: "Algebra",
    description: "Simplify a fraction of two polynomials by finding common factors.", metaDescription: "Free rational expression simplifier.", icon: "hash",
    inputs: [
      { id: "num", label: "Numerator (integer)", type: "number", defaultValue: 24 },
      { id: "den", label: "Denominator (integer)", type: "number", defaultValue: 36 },
    ],
    calculate: (v) => {
      if (v.den === 0) return [{ label: "Error", value: "Denominator cannot be zero" }];
      const gcdFn = (a: number, b: number): number => { a = Math.abs(a); b = Math.abs(b); return b === 0 ? a : gcdFn(b, a % b); };
      const g = gcdFn(Math.round(v.num), Math.round(v.den));
      return [
        { label: "Simplified", value: `${Math.round(v.num) / g}/${Math.round(v.den) / g}`, highlight: true },
        { label: "GCD", value: `${g}` },
        { label: "Decimal", value: (v.num / v.den).toFixed(6) },
      ];
    },
    formula: { expression: "Divide numerator and denominator by GCD", variables: [] },
    howToUse: "Enter numerator and denominator to simplify.", faqs: [{ question: "What is a rational expression?", answer: "A fraction where numerator and denominator are polynomials." }],
    relatedCalcs: mathRelated("rational-expression-simplifier"),
  },
  {
    slug: "equation-simplifier", name: "Equation Simplifier", category: "Math", categorySlug: "math", subcategory: "Algebra",
    description: "Simplify and solve a linear equation ax + b = cx + d.", metaDescription: "Free equation simplifier for linear equations.", icon: "hash",
    inputs: [
      { id: "a", label: "Left: ax coefficient", type: "number", defaultValue: 5 },
      { id: "b", label: "Left: constant", type: "number", defaultValue: 3 },
      { id: "c", label: "Right: cx coefficient", type: "number", defaultValue: 2 },
      { id: "d", label: "Right: constant", type: "number", defaultValue: 12 },
    ],
    calculate: (v) => {
      const coeff = v.a - v.c;
      const constant = v.d - v.b;
      if (coeff === 0) return [{ label: "Result", value: constant === 0 ? "Infinite solutions" : "No solution" }];
      const x = constant / coeff;
      return [
        { label: "x", value: x.toFixed(6), highlight: true },
        { label: "Simplified", value: `${coeff}x = ${constant}` },
        { label: "Original", value: `${v.a}x + ${v.b} = ${v.c}x + ${v.d}` },
      ];
    },
    formula: { expression: "(a-c)x = d-b → x = (d-b)/(a-c)", variables: [] },
    howToUse: "Enter coefficients for both sides of the equation.", faqs: [{ question: "What about nonlinear equations?", answer: "This tool handles linear equations. Use the quadratic solver for degree 2." }],
    relatedCalcs: mathRelated("equation-simplifier"),
  },
  {
    slug: "inequality-solver", name: "Inequality Solver", category: "Math", categorySlug: "math", subcategory: "Algebra",
    description: "Solve linear inequalities of the form ax + b > c.", metaDescription: "Free inequality solver for linear inequalities.", icon: "hash",
    inputs: [
      { id: "a", label: "Coefficient a", type: "number", defaultValue: 3 },
      { id: "b", label: "Constant b", type: "number", defaultValue: -7 },
      { id: "c", label: "Right side c", type: "number", defaultValue: 5 },
      { id: "type", label: "Inequality type", type: "select", defaultValue: 0, options: [{ value: 0, label: "> (greater)" }, { value: 1, label: "< (less)" }, { value: 2, label: "≥" }, { value: 3, label: "≤" }] },
    ],
    calculate: (v) => {
      if (v.a === 0) return [{ label: "Result", value: "No variable to solve for" }];
      const boundary = (v.c - v.b) / v.a;
      const symbols = [">", "<", "≥", "≤"];
      const flipped = v.a < 0 ? [1, 0, 3, 2][v.type] : v.type;
      return [
        { label: "Solution", value: `x ${symbols[flipped]} ${boundary.toFixed(4)}`, highlight: true },
        { label: "Boundary", value: boundary.toFixed(6) },
        { label: "Note", value: v.a < 0 ? "Inequality flipped (divided by negative)" : "Direction preserved" },
      ];
    },
    formula: { expression: "ax + b > c → x > (c-b)/a (flip if a<0)", variables: [] },
    howToUse: "Enter a, b, c and inequality type to solve.", faqs: [{ question: "Why flip the sign?", answer: "Dividing both sides of an inequality by a negative number reverses the direction." }],
    relatedCalcs: mathRelated("inequality-solver"),
  },
  {
    slug: "absolute-value-equation-solver", name: "Absolute Value Equation Solver", category: "Math", categorySlug: "math", subcategory: "Algebra",
    description: "Solve |ax + b| = c for x.", metaDescription: "Free absolute value equation solver.", icon: "hash",
    inputs: [
      { id: "a", label: "Coefficient a", type: "number", defaultValue: 2 },
      { id: "b", label: "Constant b", type: "number", defaultValue: -3 },
      { id: "c", label: "c (right side)", type: "number", defaultValue: 7 },
    ],
    calculate: (v) => {
      if (v.c < 0) return [{ label: "Result", value: "No solution (absolute value cannot equal negative)" }];
      if (v.a === 0) return [{ label: "Error", value: "a cannot be zero" }];
      const x1 = (v.c - v.b) / v.a;
      const x2 = (-v.c - v.b) / v.a;
      if (v.c === 0) return [{ label: "x", value: (- v.b / v.a).toFixed(6), highlight: true }];
      return [
        { label: "x₁", value: x1.toFixed(6), highlight: true },
        { label: "x₂", value: x2.toFixed(6), highlight: true },
        { label: "Equation", value: `|${v.a}x + ${v.b}| = ${v.c}` },
      ];
    },
    formula: { expression: "|ax+b| = c → ax+b = c or ax+b = -c", variables: [] },
    howToUse: "Enter a, b, and c to find both solutions.", faqs: [{ question: "Why two solutions?", answer: "The expression inside can be positive or negative and still have the same absolute value." }],
    relatedCalcs: mathRelated("absolute-value-equation-solver"),
  },
  {
    slug: "function-composition-calculator", name: "Function Composition Calculator", category: "Math", categorySlug: "math", subcategory: "Algebra",
    description: "Evaluate f(g(x)) for linear functions f(x) = ax + b and g(x) = cx + d.", metaDescription: "Free function composition calculator.", icon: "hash",
    inputs: [
      { id: "a", label: "f: coefficient a", type: "number", defaultValue: 2 },
      { id: "b", label: "f: constant b", type: "number", defaultValue: 3 },
      { id: "c", label: "g: coefficient c", type: "number", defaultValue: 4 },
      { id: "d", label: "g: constant d", type: "number", defaultValue: -1 },
      { id: "x", label: "x value", type: "number", defaultValue: 5 },
    ],
    calculate: (v) => {
      const gx = v.c * v.x + v.d;
      const fgx = v.a * gx + v.b;
      const gfx = v.c * (v.a * v.x + v.b) + v.d;
      return [
        { label: "f(g(x))", value: fgx.toFixed(6), highlight: true },
        { label: "g(f(x))", value: gfx.toFixed(6) },
        { label: "g(x)", value: gx.toFixed(4) },
        { label: "f(x)", value: (v.a * v.x + v.b).toFixed(4) },
      ];
    },
    formula: { expression: "f(g(x)) = a(cx + d) + b", variables: ["g(f(x)) = c(ax + b) + d"] },
    howToUse: "Define f and g as linear functions and enter x.", faqs: [{ question: "Is composition commutative?", answer: "No, f(g(x)) ≠ g(f(x)) in general." }],
    relatedCalcs: mathRelated("function-composition-calculator"),
  },
  {
    slug: "inverse-function-calculator", name: "Inverse Function Calculator", category: "Math", categorySlug: "math", subcategory: "Algebra",
    description: "Find the inverse of a linear function f(x) = ax + b.", metaDescription: "Free inverse function calculator for linear functions.", icon: "hash",
    inputs: [
      { id: "a", label: "Coefficient a", type: "number", defaultValue: 3 },
      { id: "b", label: "Constant b", type: "number", defaultValue: -5 },
      { id: "x", label: "x value", type: "number", defaultValue: 7 },
    ],
    calculate: (v) => {
      if (v.a === 0) return [{ label: "Error", value: "Function not invertible (a=0)" }];
      const invA = 1 / v.a;
      const invB = -v.b / v.a;
      const fx = v.a * v.x + v.b;
      const finvx = invA * v.x + invB;
      return [
        { label: "f⁻¹(x)", value: `${invA.toFixed(4)}x + ${invB.toFixed(4)}`, highlight: true },
        { label: "f(x) at x", value: fx.toFixed(6) },
        { label: "f⁻¹(x) at x", value: finvx.toFixed(6) },
        { label: "f(f⁻¹(x))", value: (v.a * finvx + v.b).toFixed(6) },
      ];
    },
    formula: { expression: "f⁻¹(x) = (x - b) / a = (1/a)x - b/a", variables: [] },
    howToUse: "Enter a and b for f(x) = ax + b to find its inverse.", faqs: [{ question: "When does the inverse exist?", answer: "A function has an inverse when it is one-to-one (a ≠ 0 for linear)." }],
    relatedCalcs: mathRelated("inverse-function-calculator"),
  },

  // ===== GEOMETRY =====
  {
    slug: "polygon-area-calculator", name: "Polygon Area Calculator", category: "Math", categorySlug: "math", subcategory: "Geometry",
    description: "Calculate the area of a regular polygon given side length and number of sides.", metaDescription: "Free polygon area calculator for regular polygons.", icon: "hash",
    inputs: [
      { id: "sides", label: "Number of Sides", type: "number", defaultValue: 6, min: 3, max: 100 },
      { id: "length", label: "Side Length", type: "number", defaultValue: 5, step: 0.1 },
    ],
    calculate: (v) => {
      const n = Math.floor(v.sides);
      const area = (n * v.length ** 2) / (4 * Math.tan(Math.PI / n));
      const perimeter = n * v.length;
      const apothem = v.length / (2 * Math.tan(Math.PI / n));
      return [
        { label: "Area", value: area.toFixed(4), highlight: true },
        { label: "Perimeter", value: perimeter.toFixed(4) },
        { label: "Apothem", value: apothem.toFixed(4) },
        { label: "Interior Angle", value: `${((n - 2) * 180 / n).toFixed(2)}°` },
      ];
    },
    formula: { expression: "A = (n × s²) / (4 × tan(π/n))", variables: ["n = sides", "s = side length"] },
    howToUse: "Enter the number of sides and side length.", faqs: [{ question: "What is an apothem?", answer: "The distance from the center to the midpoint of a side." }],
    relatedCalcs: mathRelated("polygon-area-calculator"),
  },
  {
    slug: "regular-polygon-calculator", name: "Regular Polygon Calculator", category: "Math", categorySlug: "math", subcategory: "Geometry",
    description: "Calculate properties of a regular polygon: area, perimeter, diagonals, and angles.", metaDescription: "Free regular polygon calculator.", icon: "hash",
    inputs: [
      { id: "n", label: "Number of Sides", type: "number", defaultValue: 8, min: 3 },
      { id: "s", label: "Side Length", type: "number", defaultValue: 4, step: 0.1 },
    ],
    calculate: (v) => {
      const n = Math.floor(v.n);
      const area = (n * v.s ** 2) / (4 * Math.tan(Math.PI / n));
      const diagonals = n * (n - 3) / 2;
      return [
        { label: "Area", value: area.toFixed(4), highlight: true },
        { label: "Perimeter", value: (n * v.s).toFixed(4) },
        { label: "Interior Angle", value: `${((n - 2) * 180 / n).toFixed(2)}°` },
        { label: "Exterior Angle", value: `${(360 / n).toFixed(2)}°` },
        { label: "Diagonals", value: `${diagonals}` },
      ];
    },
    formula: { expression: "Interior angle = (n-2)×180/n", variables: ["Diagonals = n(n-3)/2"] },
    howToUse: "Enter sides and length for full polygon properties.", faqs: [{ question: "What is a diagonal?", answer: "A line segment connecting two non-adjacent vertices." }],
    relatedCalcs: mathRelated("regular-polygon-calculator"),
  },
  {
    slug: "sector-area-calculator", name: "Sector Area Calculator", category: "Math", categorySlug: "math", subcategory: "Geometry",
    description: "Calculate the area of a circular sector given radius and central angle.", metaDescription: "Free sector area calculator.", icon: "hash",
    inputs: [
      { id: "r", label: "Radius", type: "number", defaultValue: 10, step: 0.1 },
      { id: "angle", label: "Central Angle (degrees)", type: "number", defaultValue: 60, step: 1 },
    ],
    calculate: (v) => {
      const rad = v.angle * Math.PI / 180;
      const area = 0.5 * v.r ** 2 * rad;
      const arcLen = v.r * rad;
      return [
        { label: "Sector Area", value: area.toFixed(4), highlight: true },
        { label: "Arc Length", value: arcLen.toFixed(4) },
        { label: "Fraction of Circle", value: `${(v.angle / 360 * 100).toFixed(2)}%` },
      ];
    },
    formula: { expression: "A = ½r²θ (θ in radians)", variables: ["Arc length = rθ"] },
    howToUse: "Enter radius and angle in degrees.", faqs: [{ question: "What is a sector?", answer: "A 'pie slice' shape of a circle bounded by two radii and an arc." }],
    relatedCalcs: mathRelated("sector-area-calculator"),
  },
  {
    slug: "arc-length-calculator", name: "Arc Length Calculator", category: "Math", categorySlug: "math", subcategory: "Geometry",
    description: "Calculate the arc length of a circle given radius and central angle.", metaDescription: "Free arc length calculator.", icon: "hash",
    inputs: [
      { id: "r", label: "Radius", type: "number", defaultValue: 8, step: 0.1 },
      { id: "angle", label: "Angle (degrees)", type: "number", defaultValue: 90 },
    ],
    calculate: (v) => {
      const rad = v.angle * Math.PI / 180;
      const arc = v.r * rad;
      return [
        { label: "Arc Length", value: arc.toFixed(4), highlight: true },
        { label: "Angle in Radians", value: rad.toFixed(6) },
        { label: "Full Circumference", value: (2 * Math.PI * v.r).toFixed(4) },
      ];
    },
    formula: { expression: "Arc = r × θ", variables: ["θ in radians"] },
    howToUse: "Enter radius and angle to find arc length.", faqs: [{ question: "What is arc length?", answer: "The distance along the curved part of a circle between two points." }],
    relatedCalcs: mathRelated("arc-length-calculator"),
  },
  {
    slug: "chord-length-calculator", name: "Chord Length Calculator", category: "Math", categorySlug: "math", subcategory: "Geometry",
    description: "Calculate the chord length of a circle from radius and central angle.", metaDescription: "Free chord length calculator.", icon: "hash",
    inputs: [
      { id: "r", label: "Radius", type: "number", defaultValue: 10, step: 0.1 },
      { id: "angle", label: "Central Angle (degrees)", type: "number", defaultValue: 60 },
    ],
    calculate: (v) => {
      const rad = v.angle * Math.PI / 180;
      const chord = 2 * v.r * Math.sin(rad / 2);
      return [
        { label: "Chord Length", value: chord.toFixed(4), highlight: true },
        { label: "Sagitta (height)", value: (v.r * (1 - Math.cos(rad / 2))).toFixed(4) },
      ];
    },
    formula: { expression: "Chord = 2r × sin(θ/2)", variables: ["θ = central angle in radians"] },
    howToUse: "Enter radius and central angle.", faqs: [{ question: "What is a chord?", answer: "A straight line connecting two points on a circle." }],
    relatedCalcs: mathRelated("chord-length-calculator"),
  },
  {
    slug: "ellipse-area-calculator", name: "Ellipse Area Calculator", category: "Math", categorySlug: "math", subcategory: "Geometry",
    description: "Calculate the area of an ellipse from semi-major and semi-minor axes.", metaDescription: "Free ellipse area calculator.", icon: "hash",
    inputs: [
      { id: "a", label: "Semi-major axis (a)", type: "number", defaultValue: 10, step: 0.1 },
      { id: "b", label: "Semi-minor axis (b)", type: "number", defaultValue: 6, step: 0.1 },
    ],
    calculate: (v) => {
      const area = Math.PI * v.a * v.b;
      return [
        { label: "Area", value: area.toFixed(4), highlight: true },
        { label: "Eccentricity", value: Math.sqrt(1 - (v.b ** 2) / (v.a ** 2)).toFixed(6) },
      ];
    },
    formula: { expression: "A = π × a × b", variables: ["a = semi-major", "b = semi-minor"] },
    howToUse: "Enter the two semi-axes.", faqs: [{ question: "What is eccentricity?", answer: "Measures how 'stretched' the ellipse is. 0 = circle, close to 1 = very elongated." }],
    relatedCalcs: mathRelated("ellipse-area-calculator"),
  },
  {
    slug: "ellipse-perimeter-calculator", name: "Ellipse Perimeter Calculator", category: "Math", categorySlug: "math", subcategory: "Geometry",
    description: "Approximate the perimeter of an ellipse using Ramanujan's formula.", metaDescription: "Free ellipse perimeter calculator.", icon: "hash",
    inputs: [
      { id: "a", label: "Semi-major axis", type: "number", defaultValue: 10, step: 0.1 },
      { id: "b", label: "Semi-minor axis", type: "number", defaultValue: 6, step: 0.1 },
    ],
    calculate: (v) => {
      const h = ((v.a - v.b) ** 2) / ((v.a + v.b) ** 2);
      const perimeter = Math.PI * (v.a + v.b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
      return [
        { label: "Perimeter (approx)", value: perimeter.toFixed(4), highlight: true },
        { label: "Area", value: (Math.PI * v.a * v.b).toFixed(4) },
      ];
    },
    formula: { expression: "P ≈ π(a+b)(1 + 3h/(10+√(4-3h)))", variables: ["h = ((a-b)/(a+b))²", "Ramanujan's approximation"] },
    howToUse: "Enter semi-major and semi-minor axes.", faqs: [{ question: "Is this exact?", answer: "No, ellipse perimeter has no closed-form solution. Ramanujan's formula is very accurate." }],
    relatedCalcs: mathRelated("ellipse-perimeter-calculator"),
  },
  {
    slug: "parabola-calculator", name: "Parabola Calculator", category: "Math", categorySlug: "math", subcategory: "Geometry",
    description: "Calculate vertex, focus, and directrix of a parabola y = ax² + bx + c.", metaDescription: "Free parabola calculator.", icon: "hash",
    inputs: [
      { id: "a", label: "a", type: "number", defaultValue: 1 },
      { id: "b", label: "b", type: "number", defaultValue: -4 },
      { id: "c", label: "c", type: "number", defaultValue: 3 },
    ],
    calculate: (v) => {
      if (v.a === 0) return [{ label: "Error", value: "Not a parabola (a=0)" }];
      const h = -v.b / (2 * v.a);
      const k = v.c - v.b ** 2 / (4 * v.a);
      const f = 1 / (4 * v.a);
      return [
        { label: "Vertex", value: `(${h.toFixed(4)}, ${k.toFixed(4)})`, highlight: true },
        { label: "Focus", value: `(${h.toFixed(4)}, ${(k + f).toFixed(4)})` },
        { label: "Directrix", value: `y = ${(k - f).toFixed(4)}` },
        { label: "Axis of Symmetry", value: `x = ${h.toFixed(4)}` },
        { label: "Opens", value: v.a > 0 ? "Upward" : "Downward" },
      ];
    },
    formula: { expression: "Vertex: (-b/2a, c-b²/4a)", variables: ["Focus: 1/(4a) above vertex"] },
    howToUse: "Enter a, b, c for y = ax² + bx + c.", faqs: [{ question: "What determines direction?", answer: "If a > 0 opens up, a < 0 opens down." }],
    relatedCalcs: mathRelated("parabola-calculator"),
  },
  {
    slug: "cone-volume-calculator", name: "Cone Volume Calculator", category: "Math", categorySlug: "math", subcategory: "Geometry",
    description: "Calculate the volume and surface area of a cone.", metaDescription: "Free cone volume calculator.", icon: "hash",
    inputs: [
      { id: "r", label: "Radius", type: "number", defaultValue: 5, step: 0.1 },
      { id: "h", label: "Height", type: "number", defaultValue: 12, step: 0.1 },
    ],
    calculate: (v) => {
      const volume = (Math.PI * v.r ** 2 * v.h) / 3;
      const slant = Math.sqrt(v.r ** 2 + v.h ** 2);
      const sa = Math.PI * v.r * (v.r + slant);
      return [
        { label: "Volume", value: volume.toFixed(4), highlight: true },
        { label: "Surface Area", value: sa.toFixed(4) },
        { label: "Slant Height", value: slant.toFixed(4) },
      ];
    },
    formula: { expression: "V = πr²h/3", variables: ["SA = πr(r + slant)", "slant = √(r²+h²)"] },
    howToUse: "Enter radius and height.", faqs: [{ question: "Why divide by 3?", answer: "A cone is exactly 1/3 the volume of a cylinder with the same base and height." }],
    relatedCalcs: mathRelated("cone-volume-calculator"),
  },
  {
    slug: "frustum-volume-calculator", name: "Frustum Volume Calculator", category: "Math", categorySlug: "math", subcategory: "Geometry",
    description: "Calculate the volume of a frustum (truncated cone).", metaDescription: "Free frustum volume calculator.", icon: "hash",
    inputs: [
      { id: "R", label: "Bottom Radius (R)", type: "number", defaultValue: 8, step: 0.1 },
      { id: "r", label: "Top Radius (r)", type: "number", defaultValue: 4, step: 0.1 },
      { id: "h", label: "Height", type: "number", defaultValue: 10, step: 0.1 },
    ],
    calculate: (v) => {
      const volume = (Math.PI * v.h / 3) * (v.R ** 2 + v.r ** 2 + v.R * v.r);
      const slant = Math.sqrt(v.h ** 2 + (v.R - v.r) ** 2);
      return [
        { label: "Volume", value: volume.toFixed(4), highlight: true },
        { label: "Slant Height", value: slant.toFixed(4) },
        { label: "Lateral SA", value: (Math.PI * (v.R + v.r) * slant).toFixed(4) },
      ];
    },
    formula: { expression: "V = πh(R² + r² + Rr) / 3", variables: ["R = bottom radius", "r = top radius"] },
    howToUse: "Enter both radii and height.", faqs: [{ question: "What is a frustum?", answer: "A cone with the top cut off by a plane parallel to the base." }],
    relatedCalcs: mathRelated("frustum-volume-calculator"),
  },
  {
    slug: "torus-volume-calculator", name: "Torus Volume Calculator", category: "Math", categorySlug: "math", subcategory: "Geometry",
    description: "Calculate the volume and surface area of a torus (donut shape).", metaDescription: "Free torus volume calculator.", icon: "hash",
    inputs: [
      { id: "R", label: "Major Radius (R)", type: "number", defaultValue: 10, step: 0.1 },
      { id: "r", label: "Minor Radius (r)", type: "number", defaultValue: 3, step: 0.1 },
    ],
    calculate: (v) => {
      const volume = 2 * Math.PI ** 2 * v.R * v.r ** 2;
      const sa = 4 * Math.PI ** 2 * v.R * v.r;
      return [
        { label: "Volume", value: volume.toFixed(4), highlight: true },
        { label: "Surface Area", value: sa.toFixed(4) },
      ];
    },
    formula: { expression: "V = 2π²Rr²", variables: ["SA = 4π²Rr", "R = center to tube center", "r = tube radius"] },
    howToUse: "Enter major and minor radii.", faqs: [{ question: "What is a torus?", answer: "A donut shape formed by revolving a circle around an axis." }],
    relatedCalcs: mathRelated("torus-volume-calculator"),
  },
  {
    slug: "prism-volume-calculator", name: "Prism Volume Calculator", category: "Math", categorySlug: "math", subcategory: "Geometry",
    description: "Calculate the volume of a rectangular or triangular prism.", metaDescription: "Free prism volume calculator.", icon: "hash",
    inputs: [
      { id: "type", label: "Type", type: "select", defaultValue: 0, options: [{ value: 0, label: "Rectangular" }, { value: 1, label: "Triangular" }] },
      { id: "a", label: "Base length", type: "number", defaultValue: 5, step: 0.1 },
      { id: "b", label: "Base width/height", type: "number", defaultValue: 4, step: 0.1 },
      { id: "h", label: "Prism height/depth", type: "number", defaultValue: 10, step: 0.1 },
    ],
    calculate: (v) => {
      const baseArea = v.type === 0 ? v.a * v.b : 0.5 * v.a * v.b;
      const volume = baseArea * v.h;
      return [
        { label: "Volume", value: volume.toFixed(4), highlight: true },
        { label: "Base Area", value: baseArea.toFixed(4) },
      ];
    },
    formula: { expression: "V = Base Area × Height", variables: ["Rectangular: l×w×h", "Triangular: ½bh × depth"] },
    howToUse: "Select type and enter dimensions.", faqs: [{ question: "What is a prism?", answer: "A 3D shape with two identical parallel bases connected by rectangular faces." }],
    relatedCalcs: mathRelated("prism-volume-calculator"),
  },
  {
    slug: "trapezoid-area-calculator", name: "Trapezoid Area Calculator", category: "Math", categorySlug: "math", subcategory: "Geometry",
    description: "Calculate the area of a trapezoid from its two parallel sides and height.", metaDescription: "Free trapezoid area calculator.", icon: "hash",
    inputs: [
      { id: "a", label: "Base 1 (a)", type: "number", defaultValue: 10, step: 0.1 },
      { id: "b", label: "Base 2 (b)", type: "number", defaultValue: 6, step: 0.1 },
      { id: "h", label: "Height", type: "number", defaultValue: 4, step: 0.1 },
    ],
    calculate: (v) => {
      const area = 0.5 * (v.a + v.b) * v.h;
      return [
        { label: "Area", value: area.toFixed(4), highlight: true },
        { label: "Perimeter (approx)", value: `Need side lengths for exact perimeter` },
      ];
    },
    formula: { expression: "A = ½(a + b) × h", variables: ["a, b = parallel sides", "h = height"] },
    howToUse: "Enter the two parallel sides and height.", faqs: [{ question: "What is a trapezoid?", answer: "A quadrilateral with exactly one pair of parallel sides." }],
    relatedCalcs: mathRelated("trapezoid-area-calculator"),
  },
  {
    slug: "rhombus-area-calculator", name: "Rhombus Area Calculator", category: "Math", categorySlug: "math", subcategory: "Geometry",
    description: "Calculate the area of a rhombus from its diagonals.", metaDescription: "Free rhombus area calculator.", icon: "hash",
    inputs: [
      { id: "d1", label: "Diagonal 1", type: "number", defaultValue: 10, step: 0.1 },
      { id: "d2", label: "Diagonal 2", type: "number", defaultValue: 8, step: 0.1 },
    ],
    calculate: (v) => {
      const area = 0.5 * v.d1 * v.d2;
      const side = Math.sqrt((v.d1 / 2) ** 2 + (v.d2 / 2) ** 2);
      return [
        { label: "Area", value: area.toFixed(4), highlight: true },
        { label: "Side Length", value: side.toFixed(4) },
        { label: "Perimeter", value: (4 * side).toFixed(4) },
      ];
    },
    formula: { expression: "A = ½ × d₁ × d₂", variables: ["Side = √((d₁/2)² + (d₂/2)²)"] },
    howToUse: "Enter both diagonals.", faqs: [{ question: "What is a rhombus?", answer: "A quadrilateral with all four sides equal. A square is a special rhombus." }],
    relatedCalcs: mathRelated("rhombus-area-calculator"),
  },
  {
    slug: "kite-area-calculator", name: "Kite Area Calculator", category: "Math", categorySlug: "math", subcategory: "Geometry",
    description: "Calculate the area of a kite from its two diagonals.", metaDescription: "Free kite area calculator.", icon: "hash",
    inputs: [
      { id: "d1", label: "Diagonal 1", type: "number", defaultValue: 12, step: 0.1 },
      { id: "d2", label: "Diagonal 2", type: "number", defaultValue: 8, step: 0.1 },
    ],
    calculate: (v) => {
      const area = 0.5 * v.d1 * v.d2;
      return [
        { label: "Area", value: area.toFixed(4), highlight: true },
      ];
    },
    formula: { expression: "A = ½ × d₁ × d₂", variables: ["Same as rhombus formula"] },
    howToUse: "Enter both diagonals of the kite.", faqs: [{ question: "What is a kite?", answer: "A quadrilateral with two pairs of consecutive sides that are equal." }],
    relatedCalcs: mathRelated("kite-area-calculator"),
  },

  // ===== TRIGONOMETRY =====
  {
    slug: "trigonometric-identities-calculator", name: "Trigonometric Identities Calculator", category: "Math", categorySlug: "math", subcategory: "Trigonometry",
    description: "Compute all six trigonometric functions and their reciprocals for a given angle.", metaDescription: "Free trig identities calculator.", icon: "hash",
    inputs: [{ id: "angle", label: "Angle (degrees)", type: "number", defaultValue: 30, step: 1 }],
    calculate: (v) => {
      const rad = v.angle * Math.PI / 180;
      return [
        { label: "sin", value: Math.sin(rad).toFixed(6), highlight: true },
        { label: "cos", value: Math.cos(rad).toFixed(6) },
        { label: "tan", value: Math.cos(rad) !== 0 ? Math.tan(rad).toFixed(6) : "undefined" },
        { label: "csc", value: Math.sin(rad) !== 0 ? (1 / Math.sin(rad)).toFixed(6) : "undefined" },
        { label: "sec", value: Math.cos(rad) !== 0 ? (1 / Math.cos(rad)).toFixed(6) : "undefined" },
        { label: "cot", value: Math.sin(rad) !== 0 ? (Math.cos(rad) / Math.sin(rad)).toFixed(6) : "undefined" },
      ];
    },
    formula: { expression: "sin²θ + cos²θ = 1", variables: ["csc = 1/sin", "sec = 1/cos", "cot = 1/tan"] },
    howToUse: "Enter an angle in degrees.", faqs: [{ question: "What are the Pythagorean identities?", answer: "sin²θ + cos²θ = 1, 1 + tan²θ = sec²θ, 1 + cot²θ = csc²θ" }],
    relatedCalcs: mathRelated("trigonometric-identities-calculator"),
  },
  {
    slug: "trigonometric-equation-solver", name: "Trigonometric Equation Solver", category: "Math", categorySlug: "math", subcategory: "Trigonometry",
    description: "Find angles where sin(x) = k, cos(x) = k, or tan(x) = k.", metaDescription: "Free trigonometric equation solver.", icon: "hash",
    inputs: [
      { id: "func", label: "Function", type: "select", defaultValue: 0, options: [{ value: 0, label: "sin(x) = k" }, { value: 1, label: "cos(x) = k" }, { value: 2, label: "tan(x) = k" }] },
      { id: "k", label: "k value", type: "number", defaultValue: 0.5, step: 0.01 },
    ],
    calculate: (v) => {
      if (v.func <= 1 && (v.k < -1 || v.k > 1)) return [{ label: "Error", value: "k must be between -1 and 1 for sin/cos" }];
      let angle: number;
      if (v.func === 0) angle = Math.asin(v.k) * 180 / Math.PI;
      else if (v.func === 1) angle = Math.acos(v.k) * 180 / Math.PI;
      else angle = Math.atan(v.k) * 180 / Math.PI;
      return [
        { label: "Principal angle", value: `${angle.toFixed(4)}°`, highlight: true },
        { label: "Radians", value: `${(angle * Math.PI / 180).toFixed(6)}` },
        { label: "Second solution (0-360°)", value: v.func === 0 ? `${(180 - angle).toFixed(4)}°` : v.func === 1 ? `${(360 - angle).toFixed(4)}°` : `${(angle + 180).toFixed(4)}°` },
      ];
    },
    formula: { expression: "Use inverse trig functions", variables: ["sin: x and 180-x", "cos: x and 360-x", "tan: x and x+180"] },
    howToUse: "Select function and enter k value.", faqs: [{ question: "How many solutions?", answer: "Trig equations have infinite solutions due to periodicity. We show principal values." }],
    relatedCalcs: mathRelated("trigonometric-equation-solver"),
  },
  {
    slug: "unit-circle-calculator", name: "Unit Circle Calculator", category: "Math", categorySlug: "math", subcategory: "Trigonometry",
    description: "Find coordinates and trig values for any angle on the unit circle.", metaDescription: "Free unit circle calculator.", icon: "hash",
    inputs: [{ id: "angle", label: "Angle (degrees)", type: "number", defaultValue: 45, step: 1 }],
    calculate: (v) => {
      const rad = v.angle * Math.PI / 180;
      return [
        { label: "Coordinates", value: `(${Math.cos(rad).toFixed(6)}, ${Math.sin(rad).toFixed(6)})`, highlight: true },
        { label: "Radians", value: `${rad.toFixed(6)}` },
        { label: "Quadrant", value: `${v.angle % 360 < 90 ? "I" : v.angle % 360 < 180 ? "II" : v.angle % 360 < 270 ? "III" : "IV"}` },
        { label: "Reference Angle", value: `${(v.angle % 90).toFixed(2)}°` },
      ];
    },
    formula: { expression: "(x, y) = (cos θ, sin θ)", variables: ["Unit circle has radius = 1"] },
    howToUse: "Enter an angle to see its position on the unit circle.", faqs: [{ question: "What is the unit circle?", answer: "A circle with radius 1 centered at the origin, fundamental to trigonometry." }],
    relatedCalcs: mathRelated("unit-circle-calculator"),
  },
  {
    slug: "law-of-sines-calculator", name: "Law of Sines Calculator", category: "Math", categorySlug: "math", subcategory: "Trigonometry",
    description: "Solve a triangle using the Law of Sines given a side and its opposite angle.", metaDescription: "Free Law of Sines calculator.", icon: "hash",
    inputs: [
      { id: "a", label: "Side a", type: "number", defaultValue: 10, step: 0.1 },
      { id: "A", label: "Angle A (degrees)", type: "number", defaultValue: 30 },
      { id: "B", label: "Angle B (degrees)", type: "number", defaultValue: 45 },
    ],
    calculate: (v) => {
      const C = 180 - v.A - v.B;
      if (C <= 0) return [{ label: "Error", value: "Angles must sum to less than 180°" }];
      const radA = v.A * Math.PI / 180;
      const radB = v.B * Math.PI / 180;
      const radC = C * Math.PI / 180;
      const b = v.a * Math.sin(radB) / Math.sin(radA);
      const c = v.a * Math.sin(radC) / Math.sin(radA);
      return [
        { label: "Side b", value: b.toFixed(4), highlight: true },
        { label: "Side c", value: c.toFixed(4) },
        { label: "Angle C", value: `${C.toFixed(2)}°` },
        { label: "Area", value: (0.5 * v.a * b * Math.sin(radC)).toFixed(4) },
      ];
    },
    formula: { expression: "a/sin A = b/sin B = c/sin C", variables: [] },
    howToUse: "Enter one side and two angles.", faqs: [{ question: "When to use Law of Sines?", answer: "When you know a side and its opposite angle plus another angle or side." }],
    relatedCalcs: mathRelated("law-of-sines-calculator"),
  },
  {
    slug: "law-of-cosines-calculator", name: "Law of Cosines Calculator", category: "Math", categorySlug: "math", subcategory: "Trigonometry",
    description: "Find the third side of a triangle using the Law of Cosines.", metaDescription: "Free Law of Cosines calculator.", icon: "hash",
    inputs: [
      { id: "a", label: "Side a", type: "number", defaultValue: 5, step: 0.1 },
      { id: "b", label: "Side b", type: "number", defaultValue: 7, step: 0.1 },
      { id: "C", label: "Included Angle C (degrees)", type: "number", defaultValue: 60 },
    ],
    calculate: (v) => {
      const radC = v.C * Math.PI / 180;
      const c = Math.sqrt(v.a ** 2 + v.b ** 2 - 2 * v.a * v.b * Math.cos(radC));
      const A = Math.acos((v.b ** 2 + c ** 2 - v.a ** 2) / (2 * v.b * c)) * 180 / Math.PI;
      const B = 180 - v.C - A;
      return [
        { label: "Side c", value: c.toFixed(4), highlight: true },
        { label: "Angle A", value: `${A.toFixed(2)}°` },
        { label: "Angle B", value: `${B.toFixed(2)}°` },
        { label: "Area", value: (0.5 * v.a * v.b * Math.sin(radC)).toFixed(4) },
      ];
    },
    formula: { expression: "c² = a² + b² - 2ab·cos(C)", variables: [] },
    howToUse: "Enter two sides and the included angle.", faqs: [{ question: "When to use Law of Cosines?", answer: "When you know two sides and the included angle (SAS) or all three sides (SSS)." }],
    relatedCalcs: mathRelated("law-of-cosines-calculator"),
  },
  {
    slug: "cotangent-calculator", name: "Cotangent Calculator", category: "Math", categorySlug: "math", subcategory: "Trigonometry",
    description: "Calculate the cotangent of an angle.", metaDescription: "Free cotangent calculator.", icon: "hash",
    inputs: [{ id: "angle", label: "Angle (degrees)", type: "number", defaultValue: 45 }],
    calculate: (v) => {
      const rad = v.angle * Math.PI / 180;
      const sin = Math.sin(rad);
      if (Math.abs(sin) < 1e-10) return [{ label: "cot", value: "undefined (sin=0)" }];
      return [{ label: "cot(θ)", value: (Math.cos(rad) / sin).toFixed(6), highlight: true }, { label: "tan(θ)", value: (sin / Math.cos(rad)).toFixed(6) }];
    },
    formula: { expression: "cot θ = cos θ / sin θ = 1 / tan θ", variables: [] },
    howToUse: "Enter angle in degrees.", faqs: [{ question: "When is cot undefined?", answer: "At 0°, 180°, 360° — where sin = 0." }],
    relatedCalcs: mathRelated("cotangent-calculator"),
  },
  {
    slug: "secant-calculator", name: "Secant Calculator", category: "Math", categorySlug: "math", subcategory: "Trigonometry",
    description: "Calculate the secant of an angle.", metaDescription: "Free secant calculator.", icon: "hash",
    inputs: [{ id: "angle", label: "Angle (degrees)", type: "number", defaultValue: 60 }],
    calculate: (v) => {
      const rad = v.angle * Math.PI / 180;
      const cos = Math.cos(rad);
      if (Math.abs(cos) < 1e-10) return [{ label: "sec", value: "undefined (cos=0)" }];
      return [{ label: "sec(θ)", value: (1 / cos).toFixed(6), highlight: true }, { label: "cos(θ)", value: cos.toFixed(6) }];
    },
    formula: { expression: "sec θ = 1 / cos θ", variables: [] },
    howToUse: "Enter angle in degrees.", faqs: [{ question: "When is sec undefined?", answer: "At 90° and 270° — where cos = 0." }],
    relatedCalcs: mathRelated("secant-calculator"),
  },
  {
    slug: "cosecant-calculator", name: "Cosecant Calculator", category: "Math", categorySlug: "math", subcategory: "Trigonometry",
    description: "Calculate the cosecant of an angle.", metaDescription: "Free cosecant calculator.", icon: "hash",
    inputs: [{ id: "angle", label: "Angle (degrees)", type: "number", defaultValue: 30 }],
    calculate: (v) => {
      const rad = v.angle * Math.PI / 180;
      const sin = Math.sin(rad);
      if (Math.abs(sin) < 1e-10) return [{ label: "csc", value: "undefined (sin=0)" }];
      return [{ label: "csc(θ)", value: (1 / sin).toFixed(6), highlight: true }, { label: "sin(θ)", value: sin.toFixed(6) }];
    },
    formula: { expression: "csc θ = 1 / sin θ", variables: [] },
    howToUse: "Enter angle in degrees.", faqs: [{ question: "When is csc undefined?", answer: "At 0°, 180°, 360° — where sin = 0." }],
    relatedCalcs: mathRelated("cosecant-calculator"),
  },
  {
    slug: "trigonometric-simplifier", name: "Trigonometric Simplifier", category: "Math", categorySlug: "math", subcategory: "Trigonometry",
    description: "Verify trig identities by computing both sides for a given angle.", metaDescription: "Free trig simplifier and identity verifier.", icon: "hash",
    inputs: [{ id: "angle", label: "Angle (degrees)", type: "number", defaultValue: 30 }],
    calculate: (v) => {
      const rad = v.angle * Math.PI / 180;
      const s = Math.sin(rad), c = Math.cos(rad);
      return [
        { label: "sin²θ + cos²θ", value: (s ** 2 + c ** 2).toFixed(10), highlight: true },
        { label: "1 + tan²θ", value: c !== 0 ? (1 + Math.tan(rad) ** 2).toFixed(6) : "undefined" },
        { label: "sec²θ", value: c !== 0 ? (1 / c ** 2).toFixed(6) : "undefined" },
        { label: "sin(2θ)", value: (2 * s * c).toFixed(6) },
        { label: "cos(2θ)", value: (c ** 2 - s ** 2).toFixed(6) },
      ];
    },
    formula: { expression: "Verify identities numerically", variables: ["sin²+cos²=1", "1+tan²=sec²"] },
    howToUse: "Enter an angle to verify identities hold.", faqs: [{ question: "Are these exact?", answer: "Due to floating point, results may differ from exact values by tiny amounts." }],
    relatedCalcs: mathRelated("trigonometric-simplifier"),
  },
  {
    slug: "angle-conversion-calculator", name: "Angle Conversion Calculator", category: "Math", categorySlug: "math", subcategory: "Trigonometry",
    description: "Convert between degrees, radians, and gradians.", metaDescription: "Free angle conversion calculator.", icon: "hash",
    inputs: [{ id: "degrees", label: "Degrees", type: "number", defaultValue: 90, step: 0.1 }],
    calculate: (v) => {
      const radians = v.degrees * Math.PI / 180;
      const gradians = v.degrees * 10 / 9;
      return [
        { label: "Radians", value: radians.toFixed(6), highlight: true },
        { label: "Gradians", value: gradians.toFixed(4) },
        { label: "Turns", value: (v.degrees / 360).toFixed(6) },
      ];
    },
    formula: { expression: "Radians = Degrees × π/180", variables: ["Gradians = Degrees × 10/9"] },
    howToUse: "Enter degrees to convert.", faqs: [{ question: "What are gradians?", answer: "A right angle = 100 gradians. Used in surveying." }],
    relatedCalcs: mathRelated("angle-conversion-calculator"),
  },
  {
    slug: "radians-to-degrees-calculator", name: "Radians to Degrees Calculator", category: "Math", categorySlug: "math", subcategory: "Trigonometry",
    description: "Convert radians to degrees.", metaDescription: "Free radians to degrees converter.", icon: "hash",
    inputs: [{ id: "rad", label: "Radians", type: "number", defaultValue: 3.14159, step: 0.001 }],
    calculate: (v) => {
      const deg = v.rad * 180 / Math.PI;
      return [{ label: "Degrees", value: deg.toFixed(4), highlight: true }, { label: "Gradians", value: (deg * 10 / 9).toFixed(4) }];
    },
    formula: { expression: "Degrees = Radians × 180/π", variables: [] },
    howToUse: "Enter radians.", faqs: [{ question: "Why radians?", answer: "Radians are the natural unit for calculus and many formulas." }],
    relatedCalcs: mathRelated("radians-to-degrees-calculator"),
  },
  {
    slug: "degrees-to-radians-calculator", name: "Degrees to Radians Calculator", category: "Math", categorySlug: "math", subcategory: "Trigonometry",
    description: "Convert degrees to radians.", metaDescription: "Free degrees to radians converter.", icon: "hash",
    inputs: [{ id: "deg", label: "Degrees", type: "number", defaultValue: 180, step: 1 }],
    calculate: (v) => {
      const rad = v.deg * Math.PI / 180;
      return [{ label: "Radians", value: rad.toFixed(6), highlight: true }, { label: "As π", value: `${(v.deg / 180).toFixed(4)}π` }];
    },
    formula: { expression: "Radians = Degrees × π/180", variables: [] },
    howToUse: "Enter degrees.", faqs: [{ question: "Common values?", answer: "90° = π/2, 180° = π, 360° = 2π" }],
    relatedCalcs: mathRelated("degrees-to-radians-calculator"),
  },

  // ===== CALCULUS =====
  {
    slug: "derivative-calculator", name: "Derivative Calculator", category: "Math", categorySlug: "math", subcategory: "Calculus",
    description: "Compute the numerical derivative of f(x) = axⁿ at a point using the power rule.", metaDescription: "Free derivative calculator using power rule.", icon: "hash",
    inputs: [
      { id: "a", label: "Coefficient a", type: "number", defaultValue: 3 },
      { id: "n", label: "Exponent n", type: "number", defaultValue: 2 },
      { id: "x", label: "x value", type: "number", defaultValue: 4 },
    ],
    calculate: (v) => {
      const derivative = v.a * v.n * v.x ** (v.n - 1);
      const original = v.a * v.x ** v.n;
      return [
        { label: "f'(x)", value: derivative.toFixed(6), highlight: true },
        { label: "f(x)", value: original.toFixed(6) },
        { label: "Derivative formula", value: `${v.a * v.n}x^${v.n - 1}` },
      ];
    },
    formula: { expression: "d/dx [axⁿ] = anx^(n-1)", variables: ["Power rule"] },
    howToUse: "Enter coefficient, exponent, and x value.", faqs: [{ question: "What is a derivative?", answer: "The instantaneous rate of change of a function — the slope at a specific point." }],
    relatedCalcs: mathRelated("derivative-calculator"),
  },
  {
    slug: "integral-calculator", name: "Integral Calculator", category: "Math", categorySlug: "math", subcategory: "Calculus",
    description: "Compute the definite integral of axⁿ from a to b using the power rule.", metaDescription: "Free integral calculator using power rule.", icon: "hash",
    inputs: [
      { id: "a", label: "Coefficient", type: "number", defaultValue: 2 },
      { id: "n", label: "Exponent", type: "number", defaultValue: 3 },
      { id: "lower", label: "Lower bound", type: "number", defaultValue: 0 },
      { id: "upper", label: "Upper bound", type: "number", defaultValue: 3 },
    ],
    calculate: (v) => {
      if (v.n === -1) {
        const result = v.a * (Math.log(Math.abs(v.upper)) - Math.log(Math.abs(v.lower)));
        return [{ label: "∫ result", value: result.toFixed(6), highlight: true }, { label: "Antiderivative", value: `${v.a}·ln|x|` }];
      }
      const newN = v.n + 1;
      const coeff = v.a / newN;
      const result = coeff * (v.upper ** newN - v.lower ** newN);
      return [
        { label: "∫ result", value: result.toFixed(6), highlight: true },
        { label: "Antiderivative", value: `${coeff.toFixed(4)}x^${newN}` },
      ];
    },
    formula: { expression: "∫axⁿdx = a·x^(n+1)/(n+1) + C", variables: ["n ≠ -1; if n=-1: a·ln|x|"] },
    howToUse: "Enter coefficient, exponent, and bounds.", faqs: [{ question: "What is an integral?", answer: "The area under a curve between two points. The reverse of differentiation." }],
    relatedCalcs: mathRelated("integral-calculator"),
  },
  {
    slug: "second-derivative-calculator", name: "Second Derivative Calculator", category: "Math", categorySlug: "math", subcategory: "Calculus",
    description: "Compute the second derivative of axⁿ using power rule twice.", metaDescription: "Free second derivative calculator.", icon: "hash",
    inputs: [
      { id: "a", label: "Coefficient", type: "number", defaultValue: 5 },
      { id: "n", label: "Exponent", type: "number", defaultValue: 3 },
      { id: "x", label: "x value", type: "number", defaultValue: 2 },
    ],
    calculate: (v) => {
      const first = v.a * v.n * v.x ** (v.n - 1);
      const second = v.a * v.n * (v.n - 1) * v.x ** (v.n - 2);
      return [
        { label: "f''(x)", value: second.toFixed(6), highlight: true },
        { label: "f'(x)", value: first.toFixed(6) },
        { label: "Concavity", value: second > 0 ? "Concave Up" : second < 0 ? "Concave Down" : "Inflection" },
      ];
    },
    formula: { expression: "f''(x) = an(n-1)x^(n-2)", variables: ["Apply power rule twice"] },
    howToUse: "Enter coefficient, exponent, and x.", faqs: [{ question: "What does the second derivative tell us?", answer: "Concavity and acceleration. Positive = concave up, negative = concave down." }],
    relatedCalcs: mathRelated("second-derivative-calculator"),
  },
  {
    slug: "limit-calculator", name: "Limit Calculator", category: "Math", categorySlug: "math", subcategory: "Calculus",
    description: "Estimate the limit of f(x) = (axⁿ + b) as x approaches a value.", metaDescription: "Free limit calculator.", icon: "hash",
    inputs: [
      { id: "a", label: "Coefficient a", type: "number", defaultValue: 1 },
      { id: "n", label: "Exponent n", type: "number", defaultValue: 2 },
      { id: "b", label: "Constant b", type: "number", defaultValue: -4 },
      { id: "approach", label: "x approaches", type: "number", defaultValue: 2 },
    ],
    calculate: (v) => {
      const f = (x: number) => v.a * x ** v.n + v.b;
      const direct = f(v.approach);
      const left = f(v.approach - 0.0001);
      const right = f(v.approach + 0.0001);
      return [
        { label: "Limit", value: direct.toFixed(6), highlight: true },
        { label: "f(x) at point", value: direct.toFixed(6) },
        { label: "Left-hand limit", value: left.toFixed(6) },
        { label: "Right-hand limit", value: right.toFixed(6) },
      ];
    },
    formula: { expression: "lim(x→c) f(x) — direct substitution for polynomials", variables: [] },
    howToUse: "Enter the function and the value x approaches.", faqs: [{ question: "When does direct substitution fail?", answer: "When it gives 0/0 or ∞/∞ (indeterminate forms). Use L'Hôpital's rule then." }],
    relatedCalcs: mathRelated("limit-calculator"),
  },
  {
    slug: "partial-derivative-calculator", name: "Partial Derivative Calculator", category: "Math", categorySlug: "math", subcategory: "Calculus",
    description: "Compute partial derivatives of f(x,y) = ax^m·y^n.", metaDescription: "Free partial derivative calculator.", icon: "hash",
    inputs: [
      { id: "a", label: "Coefficient", type: "number", defaultValue: 3 },
      { id: "m", label: "x exponent (m)", type: "number", defaultValue: 2 },
      { id: "n", label: "y exponent (n)", type: "number", defaultValue: 3 },
      { id: "x", label: "x value", type: "number", defaultValue: 2 },
      { id: "y", label: "y value", type: "number", defaultValue: 1 },
    ],
    calculate: (v) => {
      const fx = v.a * v.m * v.x ** (v.m - 1) * v.y ** v.n;
      const fy = v.a * v.n * v.x ** v.m * v.y ** (v.n - 1);
      return [
        { label: "∂f/∂x", value: fx.toFixed(6), highlight: true },
        { label: "∂f/∂y", value: fy.toFixed(6) },
        { label: "f(x,y)", value: (v.a * v.x ** v.m * v.y ** v.n).toFixed(6) },
      ];
    },
    formula: { expression: "∂/∂x [ax^m·y^n] = amx^(m-1)·y^n", variables: ["Treat other variable as constant"] },
    howToUse: "Enter function parameters and point.", faqs: [{ question: "What is a partial derivative?", answer: "The derivative with respect to one variable while holding others constant." }],
    relatedCalcs: mathRelated("partial-derivative-calculator"),
  },
  {
    slug: "implicit-differentiation-calculator", name: "Implicit Differentiation Calculator", category: "Math", categorySlug: "math", subcategory: "Calculus",
    description: "Find dy/dx for the circle equation x² + y² = r².", metaDescription: "Free implicit differentiation calculator.", icon: "hash",
    inputs: [
      { id: "r", label: "Radius r", type: "number", defaultValue: 5 },
      { id: "x", label: "x value", type: "number", defaultValue: 3 },
    ],
    calculate: (v) => {
      const y2 = v.r ** 2 - v.x ** 2;
      if (y2 < 0) return [{ label: "Error", value: "Point not on circle" }];
      const y = Math.sqrt(y2);
      const dydx = -v.x / y;
      return [
        { label: "dy/dx", value: dydx.toFixed(6), highlight: true },
        { label: "y (positive)", value: y.toFixed(6) },
        { label: "Slope at point", value: `${dydx.toFixed(4)}` },
      ];
    },
    formula: { expression: "x² + y² = r² → dy/dx = -x/y", variables: ["Differentiate both sides, solve for dy/dx"] },
    howToUse: "Enter r and x for the circle.", faqs: [{ question: "What is implicit differentiation?", answer: "Finding dy/dx when y is not explicitly solved as a function of x." }],
    relatedCalcs: mathRelated("implicit-differentiation-calculator"),
  },
  {
    slug: "directional-derivative-calculator", name: "Directional Derivative Calculator", category: "Math", categorySlug: "math", subcategory: "Calculus",
    description: "Compute the directional derivative of f = ax + by in direction θ.", metaDescription: "Free directional derivative calculator.", icon: "hash",
    inputs: [
      { id: "fx", label: "∂f/∂x value", type: "number", defaultValue: 3 },
      { id: "fy", label: "∂f/∂y value", type: "number", defaultValue: 4 },
      { id: "angle", label: "Direction angle (degrees)", type: "number", defaultValue: 45 },
    ],
    calculate: (v) => {
      const rad = v.angle * Math.PI / 180;
      const dd = v.fx * Math.cos(rad) + v.fy * Math.sin(rad);
      const gradMag = Math.sqrt(v.fx ** 2 + v.fy ** 2);
      return [
        { label: "Directional Derivative", value: dd.toFixed(6), highlight: true },
        { label: "Gradient Magnitude", value: gradMag.toFixed(6) },
        { label: "Max rate direction", value: `${(Math.atan2(v.fy, v.fx) * 180 / Math.PI).toFixed(2)}°` },
      ];
    },
    formula: { expression: "D_u f = ∇f · û = fx·cos θ + fy·sin θ", variables: [] },
    howToUse: "Enter partial derivatives and direction angle.", faqs: [{ question: "What is the directional derivative?", answer: "The rate of change of f in a specific direction." }],
    relatedCalcs: mathRelated("directional-derivative-calculator"),
  },
  {
    slug: "gradient-calculator", name: "Gradient Calculator", category: "Math", categorySlug: "math", subcategory: "Calculus",
    description: "Calculate the gradient vector of f(x,y) = ax^m + by^n at a point.", metaDescription: "Free gradient calculator.", icon: "hash",
    inputs: [
      { id: "a", label: "a", type: "number", defaultValue: 2 },
      { id: "m", label: "x exponent", type: "number", defaultValue: 3 },
      { id: "b", label: "b", type: "number", defaultValue: 5 },
      { id: "n", label: "y exponent", type: "number", defaultValue: 2 },
      { id: "x", label: "x", type: "number", defaultValue: 1 },
      { id: "y", label: "y", type: "number", defaultValue: 2 },
    ],
    calculate: (v) => {
      const gx = v.a * v.m * v.x ** (v.m - 1);
      const gy = v.b * v.n * v.y ** (v.n - 1);
      return [
        { label: "∇f", value: `(${gx.toFixed(4)}, ${gy.toFixed(4)})`, highlight: true },
        { label: "|∇f|", value: Math.sqrt(gx ** 2 + gy ** 2).toFixed(6) },
        { label: "Direction (degrees)", value: `${(Math.atan2(gy, gx) * 180 / Math.PI).toFixed(2)}°` },
      ];
    },
    formula: { expression: "∇f = (∂f/∂x, ∂f/∂y)", variables: [] },
    howToUse: "Enter function parameters and point.", faqs: [{ question: "What does the gradient represent?", answer: "The direction of steepest ascent and its magnitude is the max rate of change." }],
    relatedCalcs: mathRelated("gradient-calculator"),
  },
  {
    slug: "tangent-line-calculator", name: "Tangent Line Calculator", category: "Math", categorySlug: "math", subcategory: "Calculus",
    description: "Find the equation of the tangent line to f(x) = ax² + bx + c at x₀.", metaDescription: "Free tangent line calculator.", icon: "hash",
    inputs: [
      { id: "a", label: "a", type: "number", defaultValue: 1 },
      { id: "b", label: "b", type: "number", defaultValue: -2 },
      { id: "c", label: "c", type: "number", defaultValue: 1 },
      { id: "x0", label: "x₀", type: "number", defaultValue: 3 },
    ],
    calculate: (v) => {
      const y0 = v.a * v.x0 ** 2 + v.b * v.x0 + v.c;
      const slope = 2 * v.a * v.x0 + v.b;
      const intercept = y0 - slope * v.x0;
      return [
        { label: "Tangent Line", value: `y = ${slope.toFixed(4)}x + ${intercept.toFixed(4)}`, highlight: true },
        { label: "Slope", value: slope.toFixed(6) },
        { label: "Point", value: `(${v.x0}, ${y0.toFixed(4)})` },
      ];
    },
    formula: { expression: "y - y₀ = f'(x₀)(x - x₀)", variables: ["f'(x) = 2ax + b"] },
    howToUse: "Enter quadratic coefficients and point x₀.", faqs: [{ question: "What is a tangent line?", answer: "A line that touches the curve at exactly one point and has the same slope." }],
    relatedCalcs: mathRelated("tangent-line-calculator"),
  },
  {
    slug: "taylor-series-calculator", name: "Taylor Series Calculator", category: "Math", categorySlug: "math", subcategory: "Calculus",
    description: "Approximate e^x using Taylor series expansion up to n terms.", metaDescription: "Free Taylor series calculator for e^x.", icon: "hash",
    inputs: [
      { id: "x", label: "x value", type: "number", defaultValue: 1, step: 0.1 },
      { id: "n", label: "Number of terms", type: "number", defaultValue: 10, min: 1, max: 20 },
    ],
    calculate: (v) => {
      let sum = 0, factorial = 1;
      for (let i = 0; i < v.n; i++) {
        if (i > 0) factorial *= i;
        sum += v.x ** i / factorial;
      }
      const exact = Math.exp(v.x);
      return [
        { label: "Taylor Approx", value: sum.toFixed(10), highlight: true },
        { label: "Exact e^x", value: exact.toFixed(10) },
        { label: "Error", value: Math.abs(exact - sum).toExponential(4) },
      ];
    },
    formula: { expression: "e^x = Σ xⁿ/n! for n=0 to ∞", variables: [] },
    howToUse: "Enter x and number of terms.", faqs: [{ question: "What is a Taylor series?", answer: "An infinite sum of terms that approximates a function around a point." }],
    relatedCalcs: mathRelated("taylor-series-calculator"),
  },
  {
    slug: "maclaurin-series-calculator", name: "Maclaurin Series Calculator", category: "Math", categorySlug: "math", subcategory: "Calculus",
    description: "Approximate sin(x) using Maclaurin series (Taylor series at 0).", metaDescription: "Free Maclaurin series calculator.", icon: "hash",
    inputs: [
      { id: "x", label: "x (radians)", type: "number", defaultValue: 1, step: 0.1 },
      { id: "n", label: "Number of terms", type: "number", defaultValue: 7, min: 1, max: 15 },
    ],
    calculate: (v) => {
      let sum = 0;
      for (let i = 0; i < v.n; i++) {
        const k = 2 * i + 1;
        let factorial = 1;
        for (let j = 2; j <= k; j++) factorial *= j;
        sum += ((-1) ** i * v.x ** k) / factorial;
      }
      const exact = Math.sin(v.x);
      return [
        { label: "Maclaurin Approx", value: sum.toFixed(10), highlight: true },
        { label: "Exact sin(x)", value: exact.toFixed(10) },
        { label: "Error", value: Math.abs(exact - sum).toExponential(4) },
      ];
    },
    formula: { expression: "sin(x) = x - x³/3! + x⁵/5! - ...", variables: ["Maclaurin = Taylor at a=0"] },
    howToUse: "Enter x in radians and number of terms.", faqs: [{ question: "What is Maclaurin vs Taylor?", answer: "Maclaurin is a Taylor series centered at x=0." }],
    relatedCalcs: mathRelated("maclaurin-series-calculator"),
  },
  {
    slug: "critical-points-calculator", name: "Critical Points Calculator", category: "Math", categorySlug: "math", subcategory: "Calculus",
    description: "Find critical points of f(x) = ax² + bx + c (where f'(x) = 0).", metaDescription: "Free critical points calculator.", icon: "hash",
    inputs: [
      { id: "a", label: "a", type: "number", defaultValue: 1 },
      { id: "b", label: "b", type: "number", defaultValue: -6 },
      { id: "c", label: "c", type: "number", defaultValue: 8 },
    ],
    calculate: (v) => {
      if (v.a === 0) return [{ label: "Result", value: "Linear function — no critical points" }];
      const x = -v.b / (2 * v.a);
      const y = v.a * x ** 2 + v.b * x + v.c;
      return [
        { label: "Critical Point", value: `(${x.toFixed(4)}, ${y.toFixed(4)})`, highlight: true },
        { label: "Type", value: v.a > 0 ? "Minimum" : "Maximum" },
        { label: "f''(x)", value: `${2 * v.a}` },
      ];
    },
    formula: { expression: "f'(x) = 2ax + b = 0 → x = -b/(2a)", variables: ["f'' > 0 → min, f'' < 0 → max"] },
    howToUse: "Enter quadratic coefficients.", faqs: [{ question: "What is a critical point?", answer: "Where f'(x) = 0 or is undefined. Potential maxima, minima, or inflection points." }],
    relatedCalcs: mathRelated("critical-points-calculator"),
  },
  {
    slug: "inflection-point-calculator", name: "Inflection Point Calculator", category: "Math", categorySlug: "math", subcategory: "Calculus",
    description: "Find inflection points of f(x) = ax³ + bx² + cx + d (where f''(x) = 0).", metaDescription: "Free inflection point calculator.", icon: "hash",
    inputs: [
      { id: "a", label: "a (x³)", type: "number", defaultValue: 1 },
      { id: "b", label: "b (x²)", type: "number", defaultValue: -3 },
      { id: "c", label: "c (x)", type: "number", defaultValue: 0 },
      { id: "d", label: "d (constant)", type: "number", defaultValue: 0 },
    ],
    calculate: (v) => {
      if (v.a === 0) return [{ label: "Result", value: "Not cubic — no inflection point from f''=0 for quadratic" }];
      const x = -v.b / (3 * v.a);
      const y = v.a * x ** 3 + v.b * x ** 2 + v.c * x + v.d;
      return [
        { label: "Inflection Point", value: `(${x.toFixed(4)}, ${y.toFixed(4)})`, highlight: true },
        { label: "f''(x) = 6ax + 2b = 0", value: `x = ${x.toFixed(6)}` },
        { label: "Concavity changes", value: `From ${v.a > 0 ? "down to up" : "up to down"} at this point` },
      ];
    },
    formula: { expression: "f''(x) = 6ax + 2b = 0 → x = -b/(3a)", variables: [] },
    howToUse: "Enter cubic coefficients.", faqs: [{ question: "What is an inflection point?", answer: "Where the curve changes concavity (from concave up to down or vice versa)." }],
    relatedCalcs: mathRelated("inflection-point-calculator"),
  },

  // ===== STATISTICS =====
  {
    slug: "variance-calculator", name: "Variance Calculator", category: "Math", categorySlug: "math", subcategory: "Statistics",
    description: "Calculate population and sample variance of a data set.", metaDescription: "Free variance calculator. Enter a set of numbers to compute population variance, sample variance, and the mean of the data set.", icon: "hash",
    inputs: [
      { id: "v1", label: "Value 1", type: "number", defaultValue: 4 },
      { id: "v2", label: "Value 2", type: "number", defaultValue: 8 },
      { id: "v3", label: "Value 3", type: "number", defaultValue: 6 },
      { id: "v4", label: "Value 4", type: "number", defaultValue: 5 },
      { id: "v5", label: "Value 5", type: "number", defaultValue: 3 },
    ],
    calculate: (v) => {
      const data = [v.v1, v.v2, v.v3, v.v4, v.v5];
      const n = data.length;
      const mean = data.reduce((a, b) => a + b, 0) / n;
      const popVar = data.reduce((s, x) => s + (x - mean) ** 2, 0) / n;
      const samVar = data.reduce((s, x) => s + (x - mean) ** 2, 0) / (n - 1);
      return [
        { label: "Population Variance", value: popVar.toFixed(4), highlight: true },
        { label: "Sample Variance", value: samVar.toFixed(4) },
        { label: "Mean", value: mean.toFixed(4) },
        { label: "Pop. Std Dev", value: Math.sqrt(popVar).toFixed(4) },
      ];
    },
    formula: { expression: "σ² = Σ(xᵢ-μ)²/N", variables: ["s² = Σ(xᵢ-x̄)²/(n-1)"] },
    howToUse: "Enter data values.", faqs: [{ question: "Variance vs standard deviation?", answer: "SD is the square root of variance. Variance is in squared units." }],
    relatedCalcs: mathRelated("variance-calculator"),
  },
  {
    slug: "coefficient-of-variation-calculator", name: "Coefficient of Variation Calculator", category: "Math", categorySlug: "math", subcategory: "Statistics",
    description: "Calculate the coefficient of variation (CV) — relative variability of a data set.", metaDescription: "Free coefficient of variation calculator.", icon: "hash",
    inputs: [
      { id: "mean", label: "Mean", type: "number", defaultValue: 50 },
      { id: "sd", label: "Standard Deviation", type: "number", defaultValue: 8 },
    ],
    calculate: (v) => {
      if (v.mean === 0) return [{ label: "Error", value: "Mean cannot be zero" }];
      const cv = (v.sd / Math.abs(v.mean)) * 100;
      return [{ label: "CV", value: `${cv.toFixed(2)}%`, highlight: true }, { label: "Interpretation", value: cv < 15 ? "Low variability" : cv < 30 ? "Moderate" : "High variability" }];
    },
    formula: { expression: "CV = (σ / |μ|) × 100%", variables: [] },
    howToUse: "Enter mean and standard deviation.", faqs: [{ question: "When use CV?", answer: "To compare variability between datasets with different units or scales." }],
    relatedCalcs: mathRelated("coefficient-of-variation-calculator"),
  },
  {
    slug: "correlation-coefficient-calculator", name: "Correlation Coefficient Calculator", category: "Math", categorySlug: "math", subcategory: "Statistics",
    description: "Calculate Pearson's correlation coefficient for paired data.", metaDescription: "Free correlation coefficient calculator.", icon: "hash",
    inputs: [
      { id: "x1", label: "x₁", type: "number", defaultValue: 1 }, { id: "y1", label: "y₁", type: "number", defaultValue: 2 },
      { id: "x2", label: "x₂", type: "number", defaultValue: 2 }, { id: "y2", label: "y₂", type: "number", defaultValue: 4 },
      { id: "x3", label: "x₃", type: "number", defaultValue: 3 }, { id: "y3", label: "y₃", type: "number", defaultValue: 5 },
      { id: "x4", label: "x₄", type: "number", defaultValue: 4 }, { id: "y4", label: "y₄", type: "number", defaultValue: 4 },
      { id: "x5", label: "x₅", type: "number", defaultValue: 5 }, { id: "y5", label: "y₅", type: "number", defaultValue: 5 },
    ],
    calculate: (v) => {
      const xs = [v.x1, v.x2, v.x3, v.x4, v.x5];
      const ys = [v.y1, v.y2, v.y3, v.y4, v.y5];
      const n = 5;
      const mx = xs.reduce((a, b) => a + b, 0) / n;
      const my = ys.reduce((a, b) => a + b, 0) / n;
      let num = 0, dx = 0, dy = 0;
      for (let i = 0; i < n; i++) { num += (xs[i] - mx) * (ys[i] - my); dx += (xs[i] - mx) ** 2; dy += (ys[i] - my) ** 2; }
      const r = dx > 0 && dy > 0 ? num / Math.sqrt(dx * dy) : 0;
      return [
        { label: "r (Pearson)", value: r.toFixed(6), highlight: true },
        { label: "r²", value: (r ** 2).toFixed(6) },
        { label: "Strength", value: Math.abs(r) > 0.7 ? "Strong" : Math.abs(r) > 0.4 ? "Moderate" : "Weak" },
      ];
    },
    formula: { expression: "r = Σ(xᵢ-x̄)(yᵢ-ȳ) / √(Σ(xᵢ-x̄)²·Σ(yᵢ-ȳ)²)", variables: [] },
    howToUse: "Enter 5 paired data points.", faqs: [{ question: "What does r mean?", answer: "+1 = perfect positive, -1 = perfect negative, 0 = no linear relationship." }],
    relatedCalcs: mathRelated("correlation-coefficient-calculator"),
  },
  {
    slug: "regression-calculator", name: "Regression Calculator", category: "Math", categorySlug: "math", subcategory: "Statistics",
    description: "Perform simple linear regression on paired data.", metaDescription: "Free regression calculator.", icon: "hash",
    inputs: [
      { id: "x1", label: "x₁", type: "number", defaultValue: 1 }, { id: "y1", label: "y₁", type: "number", defaultValue: 3 },
      { id: "x2", label: "x₂", type: "number", defaultValue: 2 }, { id: "y2", label: "y₂", type: "number", defaultValue: 5 },
      { id: "x3", label: "x₃", type: "number", defaultValue: 3 }, { id: "y3", label: "y₃", type: "number", defaultValue: 7 },
      { id: "x4", label: "x₄", type: "number", defaultValue: 4 }, { id: "y4", label: "y₄", type: "number", defaultValue: 8 },
    ],
    calculate: (v) => {
      const xs = [v.x1, v.x2, v.x3, v.x4], ys = [v.y1, v.y2, v.y3, v.y4];
      const n = 4;
      const mx = xs.reduce((a, b) => a + b, 0) / n;
      const my = ys.reduce((a, b) => a + b, 0) / n;
      let num = 0, den = 0;
      for (let i = 0; i < n; i++) { num += (xs[i] - mx) * (ys[i] - my); den += (xs[i] - mx) ** 2; }
      const slope = den !== 0 ? num / den : 0;
      const intercept = my - slope * mx;
      return [
        { label: "Equation", value: `y = ${slope.toFixed(4)}x + ${intercept.toFixed(4)}`, highlight: true },
        { label: "Slope", value: slope.toFixed(6) },
        { label: "Y-Intercept", value: intercept.toFixed(6) },
      ];
    },
    formula: { expression: "y = mx + b", variables: ["m = Σ(x-x̄)(y-ȳ)/Σ(x-x̄)²", "b = ȳ - mx̄"] },
    howToUse: "Enter 4 paired data points.", faqs: [{ question: "What is linear regression?", answer: "Finding the best-fit straight line through data points." }],
    relatedCalcs: mathRelated("regression-calculator"),
  },
  {
    slug: "linear-regression-calculator", name: "Linear Regression Calculator", category: "Math", categorySlug: "math", subcategory: "Statistics",
    description: "Compute the best-fit line and R² value for paired data.", metaDescription: "Free linear regression calculator with R-squared.", icon: "hash",
    inputs: [
      { id: "x1", label: "x₁", type: "number", defaultValue: 1 }, { id: "y1", label: "y₁", type: "number", defaultValue: 2 },
      { id: "x2", label: "x₂", type: "number", defaultValue: 3 }, { id: "y2", label: "y₂", type: "number", defaultValue: 4 },
      { id: "x3", label: "x₃", type: "number", defaultValue: 5 }, { id: "y3", label: "y₃", type: "number", defaultValue: 5 },
      { id: "x4", label: "x₄", type: "number", defaultValue: 7 }, { id: "y4", label: "y₄", type: "number", defaultValue: 7 },
      { id: "x5", label: "x₅", type: "number", defaultValue: 9 }, { id: "y5", label: "y₅", type: "number", defaultValue: 8 },
    ],
    calculate: (v) => {
      const xs = [v.x1, v.x2, v.x3, v.x4, v.x5], ys = [v.y1, v.y2, v.y3, v.y4, v.y5];
      const n = 5;
      const mx = xs.reduce((a, b) => a + b, 0) / n, my = ys.reduce((a, b) => a + b, 0) / n;
      let sxy = 0, sxx = 0, syy = 0;
      for (let i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; syy += (ys[i] - my) ** 2; }
      const slope = sxx ? sxy / sxx : 0;
      const intercept = my - slope * mx;
      const r2 = sxx && syy ? (sxy ** 2) / (sxx * syy) : 0;
      return [
        { label: "Best-Fit Line", value: `y = ${slope.toFixed(4)}x + ${intercept.toFixed(4)}`, highlight: true },
        { label: "R²", value: r2.toFixed(6) },
        { label: "r", value: (sxy >= 0 ? 1 : -1) * Math.sqrt(r2) > 0 ? Math.sqrt(r2).toFixed(6) : (-Math.sqrt(r2)).toFixed(6) },
      ];
    },
    formula: { expression: "R² = (Σ(x-x̄)(y-ȳ))² / (Σ(x-x̄)²·Σ(y-ȳ)²)", variables: [] },
    howToUse: "Enter 5 paired data points.", faqs: [{ question: "What is R²?", answer: "The proportion of variance in y explained by x. 1.0 = perfect fit." }],
    relatedCalcs: mathRelated("linear-regression-calculator"),
  },
  {
    slug: "chi-square-calculator", name: "Chi-Square Calculator", category: "Math", categorySlug: "math", subcategory: "Statistics",
    description: "Perform a Chi-square goodness-of-fit test.", metaDescription: "Free Chi-square calculator.", icon: "hash",
    inputs: [
      { id: "o1", label: "Observed 1", type: "number", defaultValue: 20 }, { id: "e1", label: "Expected 1", type: "number", defaultValue: 25 },
      { id: "o2", label: "Observed 2", type: "number", defaultValue: 30 }, { id: "e2", label: "Expected 2", type: "number", defaultValue: 25 },
      { id: "o3", label: "Observed 3", type: "number", defaultValue: 25 }, { id: "e3", label: "Expected 3", type: "number", defaultValue: 25 },
      { id: "o4", label: "Observed 4", type: "number", defaultValue: 25 }, { id: "e4", label: "Expected 4", type: "number", defaultValue: 25 },
    ],
    calculate: (v) => {
      const pairs = [[v.o1, v.e1], [v.o2, v.e2], [v.o3, v.e3], [v.o4, v.e4]];
      let chi2 = 0;
      for (const [o, e] of pairs) { if (e > 0) chi2 += (o - e) ** 2 / e; }
      const df = pairs.length - 1;
      return [
        { label: "χ²", value: chi2.toFixed(4), highlight: true },
        { label: "Degrees of Freedom", value: `${df}` },
        { label: "Significant (α=0.05)?", value: chi2 > 7.815 ? "Yes (>7.815)" : "No" },
      ];
    },
    formula: { expression: "χ² = Σ(O-E)²/E", variables: ["df = categories - 1"] },
    howToUse: "Enter observed and expected values for each category.", faqs: [{ question: "What is Chi-square?", answer: "A test to determine if observed frequencies differ significantly from expected." }],
    relatedCalcs: mathRelated("chi-square-calculator"),
  },
  {
    slug: "normal-distribution-calculator", name: "Normal Distribution Calculator", category: "Math", categorySlug: "math", subcategory: "Statistics",
    description: "Calculate probabilities for a normal distribution given mean and standard deviation.", metaDescription: "Free normal distribution calculator.", icon: "hash",
    inputs: [
      { id: "x", label: "x value", type: "number", defaultValue: 85, step: 0.1 },
      { id: "mean", label: "Mean (μ)", type: "number", defaultValue: 75, step: 0.1 },
      { id: "sd", label: "Std Dev (σ)", type: "number", defaultValue: 10, step: 0.1 },
    ],
    calculate: (v) => {
      if (v.sd <= 0) return [{ label: "Error", value: "SD must be positive" }];
      const z = (v.x - v.mean) / v.sd;
      const t = 1 / (1 + 0.2316419 * Math.abs(z));
      const d = 0.3989422804014327;
      const p = d * Math.exp(-z * z / 2) * (0.3193815 * t - 0.3565638 * t * t + 1.781478 * t ** 3 - 1.821256 * t ** 4 + 1.330274 * t ** 5);
      const cdf = z > 0 ? 1 - p : p;
      return [
        { label: "P(X ≤ x)", value: (cdf * 100).toFixed(4) + "%", highlight: true },
        { label: "P(X > x)", value: ((1 - cdf) * 100).toFixed(4) + "%" },
        { label: "Z-Score", value: z.toFixed(4) },
      ];
    },
    formula: { expression: "Z = (x - μ) / σ", variables: ["Then lookup cumulative probability"] },
    howToUse: "Enter x, mean, and standard deviation.", faqs: [{ question: "What is 68-95-99.7 rule?", answer: "~68% within 1σ, ~95% within 2σ, ~99.7% within 3σ of the mean." }],
    relatedCalcs: mathRelated("normal-distribution-calculator"),
  },
  {
    slug: "binomial-distribution-calculator", name: "Binomial Distribution Calculator", category: "Math", categorySlug: "math", subcategory: "Statistics",
    description: "Calculate binomial probability P(X = k) for n trials.", metaDescription: "Free binomial distribution calculator.", icon: "hash",
    inputs: [
      { id: "n", label: "Trials (n)", type: "number", defaultValue: 10, min: 1 },
      { id: "k", label: "Successes (k)", type: "number", defaultValue: 3, min: 0 },
      { id: "p", label: "Probability (p)", type: "number", defaultValue: 0.3, step: 0.01, min: 0, max: 1 },
    ],
    calculate: (v) => {
      const comb = (n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i) / (i + 1); return r; };
      const prob = comb(v.n, v.k) * v.p ** v.k * (1 - v.p) ** (v.n - v.k);
      const mean = v.n * v.p;
      const variance = v.n * v.p * (1 - v.p);
      return [
        { label: "P(X = k)", value: (prob * 100).toFixed(4) + "%", highlight: true },
        { label: "Mean", value: mean.toFixed(4) },
        { label: "Variance", value: variance.toFixed(4) },
        { label: "Std Dev", value: Math.sqrt(variance).toFixed(4) },
      ];
    },
    formula: { expression: "P(X=k) = C(n,k) × p^k × (1-p)^(n-k)", variables: ["Mean = np", "Var = np(1-p)"] },
    howToUse: "Enter trials, successes, and probability.", faqs: [{ question: "When use binomial?", answer: "Fixed number of independent trials, each with same probability of success." }],
    relatedCalcs: mathRelated("binomial-distribution-calculator"),
  },
  {
    slug: "poisson-distribution-calculator", name: "Poisson Distribution Calculator", category: "Math", categorySlug: "math", subcategory: "Statistics",
    description: "Calculate Poisson probability P(X = k) for a given rate λ.", metaDescription: "Free Poisson distribution calculator.", icon: "hash",
    inputs: [
      { id: "lambda", label: "Rate (λ)", type: "number", defaultValue: 4, step: 0.1 },
      { id: "k", label: "k (occurrences)", type: "number", defaultValue: 3, min: 0 },
    ],
    calculate: (v) => {
      let factorial = 1;
      for (let i = 2; i <= v.k; i++) factorial *= i;
      const prob = (Math.exp(-v.lambda) * v.lambda ** v.k) / factorial;
      return [
        { label: "P(X = k)", value: (prob * 100).toFixed(4) + "%", highlight: true },
        { label: "Mean", value: `${v.lambda}` },
        { label: "Variance", value: `${v.lambda}` },
        { label: "Std Dev", value: Math.sqrt(v.lambda).toFixed(4) },
      ];
    },
    formula: { expression: "P(X=k) = e^(-λ) × λ^k / k!", variables: ["Mean = Variance = λ"] },
    howToUse: "Enter the average rate and desired count.", faqs: [{ question: "When use Poisson?", answer: "For counting events in a fixed interval when events occur independently at a constant rate." }],
    relatedCalcs: mathRelated("poisson-distribution-calculator"),
  },
  {
    slug: "geometric-distribution-calculator", name: "Geometric Distribution Calculator", category: "Math", categorySlug: "math", subcategory: "Statistics",
    description: "Calculate probability of first success on trial k.", metaDescription: "Free geometric distribution calculator.", icon: "hash",
    inputs: [
      { id: "p", label: "Success probability", type: "number", defaultValue: 0.2, step: 0.01 },
      { id: "k", label: "Trial number k", type: "number", defaultValue: 5, min: 1 },
    ],
    calculate: (v) => {
      const prob = (1 - v.p) ** (v.k - 1) * v.p;
      const cdf = 1 - (1 - v.p) ** v.k;
      return [
        { label: "P(X = k)", value: (prob * 100).toFixed(4) + "%", highlight: true },
        { label: "P(X ≤ k)", value: (cdf * 100).toFixed(4) + "%" },
        { label: "Expected trials", value: (1 / v.p).toFixed(2) },
      ];
    },
    formula: { expression: "P(X=k) = (1-p)^(k-1) × p", variables: ["E[X] = 1/p"] },
    howToUse: "Enter probability and trial number.", faqs: [{ question: "What does geometric distribution model?", answer: "Number of trials until the first success." }],
    relatedCalcs: mathRelated("geometric-distribution-calculator"),
  },
  {
    slug: "quartile-calculator", name: "Quartile Calculator", category: "Math", categorySlug: "math", subcategory: "Statistics",
    description: "Find Q1, Q2 (median), Q3, and IQR of a data set.", metaDescription: "Free quartile calculator.", icon: "hash",
    inputs: [
      { id: "v1", label: "V1", type: "number", defaultValue: 2 }, { id: "v2", label: "V2", type: "number", defaultValue: 4 },
      { id: "v3", label: "V3", type: "number", defaultValue: 6 }, { id: "v4", label: "V4", type: "number", defaultValue: 8 },
      { id: "v5", label: "V5", type: "number", defaultValue: 10 }, { id: "v6", label: "V6", type: "number", defaultValue: 12 },
      { id: "v7", label: "V7", type: "number", defaultValue: 14 }, { id: "v8", label: "V8", type: "number", defaultValue: 16 },
    ],
    calculate: (v) => {
      const data = [v.v1, v.v2, v.v3, v.v4, v.v5, v.v6, v.v7, v.v8].sort((a, b) => a - b);
      const q = (arr: number[], p: number) => { const i = (arr.length - 1) * p; const lo = Math.floor(i); return arr[lo] + (arr[Math.ceil(i)] - arr[lo]) * (i - lo); };
      const q1 = q(data, 0.25), q2 = q(data, 0.5), q3 = q(data, 0.75);
      return [
        { label: "Q1 (25th)", value: q1.toFixed(2), highlight: true },
        { label: "Q2 (Median)", value: q2.toFixed(2) },
        { label: "Q3 (75th)", value: q3.toFixed(2) },
        { label: "IQR", value: (q3 - q1).toFixed(2) },
      ];
    },
    formula: { expression: "Q1 = 25th percentile, Q3 = 75th percentile, IQR = Q3 - Q1", variables: [] },
    howToUse: "Enter 8 data values.", faqs: [{ question: "What is IQR?", answer: "Interquartile Range: the spread of the middle 50% of data. Used to identify outliers." }],
    relatedCalcs: mathRelated("quartile-calculator"),
  },
  {
    slug: "percentile-calculator", name: "Percentile Calculator", category: "Math", categorySlug: "math", subcategory: "Statistics",
    description: "Find the percentile rank of a value in a data set.", metaDescription: "Free percentile calculator.", icon: "hash",
    inputs: [
      { id: "value", label: "Value", type: "number", defaultValue: 75 },
      { id: "v1", label: "D1", type: "number", defaultValue: 50 }, { id: "v2", label: "D2", type: "number", defaultValue: 60 },
      { id: "v3", label: "D3", type: "number", defaultValue: 70 }, { id: "v4", label: "D4", type: "number", defaultValue: 80 },
      { id: "v5", label: "D5", type: "number", defaultValue: 90 },
    ],
    calculate: (v) => {
      const data = [v.v1, v.v2, v.v3, v.v4, v.v5].sort((a, b) => a - b);
      const below = data.filter(x => x < v.value).length;
      const percentile = (below / data.length) * 100;
      return [
        { label: "Percentile Rank", value: `${percentile.toFixed(1)}th`, highlight: true },
        { label: "Values below", value: `${below} of ${data.length}` },
      ];
    },
    formula: { expression: "Percentile = (# below value / total) × 100", variables: [] },
    howToUse: "Enter the value and data set.", faqs: [{ question: "What does 90th percentile mean?", answer: "90% of the values are below this point." }],
    relatedCalcs: mathRelated("percentile-calculator"),
  },
  {
    slug: "skewness-calculator", name: "Skewness Calculator", category: "Math", categorySlug: "math", subcategory: "Statistics",
    description: "Calculate the skewness of a data set.", metaDescription: "Free skewness calculator.", icon: "hash",
    inputs: [
      { id: "v1", label: "V1", type: "number", defaultValue: 2 }, { id: "v2", label: "V2", type: "number", defaultValue: 3 },
      { id: "v3", label: "V3", type: "number", defaultValue: 4 }, { id: "v4", label: "V4", type: "number", defaultValue: 5 },
      { id: "v5", label: "V5", type: "number", defaultValue: 20 },
    ],
    calculate: (v) => {
      const data = [v.v1, v.v2, v.v3, v.v4, v.v5];
      const n = data.length;
      const mean = data.reduce((a, b) => a + b, 0) / n;
      const sd = Math.sqrt(data.reduce((s, x) => s + (x - mean) ** 2, 0) / n);
      if (sd === 0) return [{ label: "Error", value: "All values are equal" }];
      const skew = data.reduce((s, x) => s + ((x - mean) / sd) ** 3, 0) / n;
      return [
        { label: "Skewness", value: skew.toFixed(4), highlight: true },
        { label: "Direction", value: skew > 0.5 ? "Right-skewed" : skew < -0.5 ? "Left-skewed" : "Approximately symmetric" },
      ];
    },
    formula: { expression: "Skew = Σ((xᵢ-μ)/σ)³ / n", variables: [] },
    howToUse: "Enter data values.", faqs: [{ question: "What does skewness tell us?", answer: "Whether data is symmetrically distributed or has a longer tail on one side." }],
    relatedCalcs: mathRelated("skewness-calculator"),
  },
  {
    slug: "kurtosis-calculator", name: "Kurtosis Calculator", category: "Math", categorySlug: "math", subcategory: "Statistics",
    description: "Calculate the kurtosis (tail heaviness) of a data set.", metaDescription: "Free kurtosis calculator.", icon: "hash",
    inputs: [
      { id: "v1", label: "V1", type: "number", defaultValue: 1 }, { id: "v2", label: "V2", type: "number", defaultValue: 2 },
      { id: "v3", label: "V3", type: "number", defaultValue: 3 }, { id: "v4", label: "V4", type: "number", defaultValue: 4 },
      { id: "v5", label: "V5", type: "number", defaultValue: 100 },
    ],
    calculate: (v) => {
      const data = [v.v1, v.v2, v.v3, v.v4, v.v5];
      const n = data.length;
      const mean = data.reduce((a, b) => a + b, 0) / n;
      const sd = Math.sqrt(data.reduce((s, x) => s + (x - mean) ** 2, 0) / n);
      if (sd === 0) return [{ label: "Error", value: "All values are equal" }];
      const kurt = data.reduce((s, x) => s + ((x - mean) / sd) ** 4, 0) / n;
      const excess = kurt - 3;
      return [
        { label: "Kurtosis", value: kurt.toFixed(4), highlight: true },
        { label: "Excess Kurtosis", value: excess.toFixed(4) },
        { label: "Type", value: excess > 0 ? "Leptokurtic (heavy tails)" : excess < 0 ? "Platykurtic (light tails)" : "Mesokurtic (normal)" },
      ];
    },
    formula: { expression: "Kurt = Σ((xᵢ-μ)/σ)⁴ / n", variables: ["Excess = Kurt - 3 (normal = 0)"] },
    howToUse: "Enter data values.", faqs: [{ question: "What does kurtosis measure?", answer: "How heavy/light the tails are compared to a normal distribution." }],
    relatedCalcs: mathRelated("kurtosis-calculator"),
  },

  // ===== NUMBER THEORY =====
  {
    slug: "prime-number-generator", name: "Prime Number Generator", category: "Math", categorySlug: "math", subcategory: "Number Theory",
    description: "Generate prime numbers up to a given limit.", metaDescription: "Free prime number generator.", icon: "hash",
    inputs: [{ id: "limit", label: "Upper Limit", type: "number", defaultValue: 100, min: 2 }],
    calculate: (v) => {
      const limit = Math.min(Math.floor(v.limit), 1000);
      const sieve = new Array(limit + 1).fill(true);
      sieve[0] = sieve[1] = false;
      for (let i = 2; i <= Math.sqrt(limit); i++) { if (sieve[i]) for (let j = i * i; j <= limit; j += i) sieve[j] = false; }
      const primes = sieve.map((v, i) => v ? i : -1).filter(x => x > 0);
      return [
        { label: "Primes", value: primes.slice(0, 30).join(", ") + (primes.length > 30 ? "..." : ""), highlight: true },
        { label: "Count", value: `${primes.length}` },
        { label: "Largest", value: `${primes[primes.length - 1]}` },
      ];
    },
    formula: { expression: "Sieve of Eratosthenes", variables: [] },
    howToUse: "Enter an upper limit (max 1000).", faqs: [{ question: "What is a prime number?", answer: "A number greater than 1 divisible only by 1 and itself." }],
    relatedCalcs: mathRelated("prime-number-generator"),
  },
  {
    slug: "coprime-calculator", name: "Coprime Calculator", category: "Math", categorySlug: "math", subcategory: "Number Theory",
    description: "Check if two numbers are coprime (GCD = 1).", metaDescription: "Free coprime checker.", icon: "hash",
    inputs: [
      { id: "a", label: "Number A", type: "number", defaultValue: 15 },
      { id: "b", label: "Number B", type: "number", defaultValue: 28 },
    ],
    calculate: (v) => {
      const gcdFn = (a: number, b: number): number => { a = Math.abs(a); b = Math.abs(b); return b === 0 ? a : gcdFn(b, a % b); };
      const g = gcdFn(Math.round(v.a), Math.round(v.b));
      return [
        { label: "Coprime?", value: g === 1 ? "Yes ✓" : "No", highlight: true },
        { label: "GCD", value: `${g}` },
        { label: "LCM", value: `${Math.abs(Math.round(v.a) * Math.round(v.b)) / g}` },
      ];
    },
    formula: { expression: "Coprime ↔ GCD(a, b) = 1", variables: [] },
    howToUse: "Enter two numbers.", faqs: [{ question: "Why are coprimes important?", answer: "Used in cryptography (RSA), fraction simplification, and number theory." }],
    relatedCalcs: mathRelated("coprime-calculator"),
  },
  {
    slug: "modular-arithmetic-calculator", name: "Modular Arithmetic Calculator", category: "Math", categorySlug: "math", subcategory: "Number Theory",
    description: "Perform modular arithmetic operations.", metaDescription: "Free modular arithmetic calculator.", icon: "hash",
    inputs: [
      { id: "a", label: "a", type: "number", defaultValue: 17 },
      { id: "b", label: "b", type: "number", defaultValue: 5 },
      { id: "m", label: "Modulus m", type: "number", defaultValue: 7 },
    ],
    calculate: (v) => {
      if (v.m === 0) return [{ label: "Error", value: "Modulus cannot be zero" }];
      const addMod = ((v.a % v.m + v.b % v.m) % v.m + v.m) % v.m;
      const mulMod = ((v.a % v.m) * (v.b % v.m) % v.m + v.m) % v.m;
      return [
        { label: "a mod m", value: `${((v.a % v.m) + v.m) % v.m}`, highlight: true },
        { label: "(a + b) mod m", value: `${addMod}` },
        { label: "(a × b) mod m", value: `${mulMod}` },
        { label: "a^b mod m", value: `${Number(BigInt(Math.round(v.a)) ** BigInt(Math.round(v.b)) % BigInt(Math.round(v.m)))}` },
      ];
    },
    formula: { expression: "a mod m = remainder of a ÷ m", variables: [] },
    howToUse: "Enter a, b, and modulus.", faqs: [{ question: "Where is modular arithmetic used?", answer: "Cryptography, clock arithmetic, hash functions, and computer science." }],
    relatedCalcs: mathRelated("modular-arithmetic-calculator"),
  },
  {
    slug: "modulus-calculator", name: "Modulus Calculator", category: "Math", categorySlug: "math", subcategory: "Number Theory",
    description: "Find the remainder when dividing a by b.", metaDescription: "Free modulus calculator. Find the remainder and quotient when one number is divided by another, with a quick verification of the result.", icon: "hash",
    inputs: [
      { id: "a", label: "Dividend", type: "number", defaultValue: 29 },
      { id: "b", label: "Divisor", type: "number", defaultValue: 7 },
    ],
    calculate: (v) => {
      if (v.b === 0) return [{ label: "Error", value: "Cannot divide by zero" }];
      return [
        { label: "Remainder", value: `${v.a % v.b}`, highlight: true },
        { label: "Quotient", value: `${Math.floor(v.a / v.b)}` },
        { label: "Verification", value: `${Math.floor(v.a / v.b)} × ${v.b} + ${v.a % v.b} = ${v.a}` },
      ];
    },
    formula: { expression: "a mod b = a - b × floor(a/b)", variables: [] },
    howToUse: "Enter dividend and divisor.", faqs: [{ question: "Is modulus the same as remainder?", answer: "For positive numbers, yes. Behavior differs for negatives depending on language." }],
    relatedCalcs: mathRelated("modulus-calculator"),
  },
  {
    slug: "euler-totient-calculator", name: "Euler Totient Function Calculator", category: "Math", categorySlug: "math", subcategory: "Number Theory",
    description: "Calculate Euler's totient φ(n) — count of integers ≤ n coprime to n.", metaDescription: "Free Euler totient calculator.", icon: "hash",
    inputs: [{ id: "n", label: "n", type: "number", defaultValue: 12, min: 1 }],
    calculate: (v) => {
      const n = Math.floor(Math.abs(v.n));
      let result = n;
      let temp = n;
      for (let p = 2; p * p <= temp; p++) {
        if (temp % p === 0) { while (temp % p === 0) temp /= p; result -= result / p; }
      }
      if (temp > 1) result -= result / temp;
      return [
        { label: "φ(n)", value: `${Math.round(result)}`, highlight: true },
        { label: "n", value: `${n}` },
        { label: "φ(n)/n", value: (result / n).toFixed(4) },
      ];
    },
    formula: { expression: "φ(n) = n × Π(1 - 1/p) for each prime p dividing n", variables: [] },
    howToUse: "Enter a positive integer.", faqs: [{ question: "Where is Euler's totient used?", answer: "In RSA encryption and modular arithmetic." }],
    relatedCalcs: mathRelated("euler-totient-calculator"),
  },
  {
    slug: "lcm-multiple-numbers-calculator", name: "LCM of Multiple Numbers Calculator", category: "Math", categorySlug: "math", subcategory: "Number Theory",
    description: "Find the LCM of up to 5 numbers.", metaDescription: "Free LCM calculator for multiple numbers.", icon: "hash",
    inputs: [
      { id: "a", label: "N1", type: "number", defaultValue: 4 }, { id: "b", label: "N2", type: "number", defaultValue: 6 },
      { id: "c", label: "N3", type: "number", defaultValue: 8 }, { id: "d", label: "N4", type: "number", defaultValue: 10 },
      { id: "e", label: "N5", type: "number", defaultValue: 12 },
    ],
    calculate: (v) => {
      const gcdFn = (a: number, b: number): number => { a = Math.abs(a); b = Math.abs(b); return b === 0 ? a : gcdFn(b, a % b); };
      const lcmFn = (a: number, b: number) => Math.abs(a * b) / gcdFn(a, b);
      const nums = [v.a, v.b, v.c, v.d, v.e].map(Math.round).filter(x => x > 0);
      const result = nums.reduce(lcmFn, 1);
      return [{ label: "LCM", value: result.toLocaleString(), highlight: true }, { label: "Numbers", value: nums.join(", ") }];
    },
    formula: { expression: "LCM(a,b) = |a×b| / GCD(a,b)", variables: ["Apply iteratively"] },
    howToUse: "Enter up to 5 numbers.", faqs: [{ question: "What is LCM?", answer: "Least Common Multiple — the smallest number divisible by all given numbers." }],
    relatedCalcs: mathRelated("lcm-multiple-numbers-calculator"),
  },
  {
    slug: "gcd-multiple-numbers-calculator", name: "GCD of Multiple Numbers Calculator", category: "Math", categorySlug: "math", subcategory: "Number Theory",
    description: "Find the GCD of up to 5 numbers.", metaDescription: "Free GCD calculator for multiple numbers.", icon: "hash",
    inputs: [
      { id: "a", label: "N1", type: "number", defaultValue: 12 }, { id: "b", label: "N2", type: "number", defaultValue: 18 },
      { id: "c", label: "N3", type: "number", defaultValue: 24 }, { id: "d", label: "N4", type: "number", defaultValue: 36 },
      { id: "e", label: "N5", type: "number", defaultValue: 48 },
    ],
    calculate: (v) => {
      const gcdFn = (a: number, b: number): number => { a = Math.abs(a); b = Math.abs(b); return b === 0 ? a : gcdFn(b, a % b); };
      const nums = [v.a, v.b, v.c, v.d, v.e].map(Math.round).filter(x => x > 0);
      const result = nums.reduce(gcdFn);
      return [{ label: "GCD", value: `${result}`, highlight: true }, { label: "Numbers", value: nums.join(", ") }];
    },
    formula: { expression: "Apply Euclidean algorithm iteratively", variables: [] },
    howToUse: "Enter up to 5 numbers.", faqs: [{ question: "What is GCD?", answer: "Greatest Common Divisor — the largest number that divides all given numbers." }],
    relatedCalcs: mathRelated("gcd-multiple-numbers-calculator"),
  },
  {
    slug: "number-base-converter", name: "Number Base Converter", category: "Math", categorySlug: "math", subcategory: "Number Theory",
    description: "Convert a decimal number to any base (2-36).", metaDescription: "Free number base converter.", icon: "hash",
    inputs: [
      { id: "value", label: "Decimal Number", type: "number", defaultValue: 255 },
      { id: "base", label: "Target Base (2-36)", type: "number", defaultValue: 16, min: 2, max: 36 },
    ],
    calculate: (v) => {
      const n = Math.floor(Math.abs(v.value));
      const b = Math.floor(v.base);
      return [
        { label: `Base ${b}`, value: n.toString(b).toUpperCase(), highlight: true },
        { label: "Binary", value: n.toString(2) },
        { label: "Octal", value: n.toString(8) },
        { label: "Hex", value: n.toString(16).toUpperCase() },
      ];
    },
    formula: { expression: "Repeatedly divide by base, collect remainders", variables: [] },
    howToUse: "Enter a number and target base.", faqs: [{ question: "What bases are common?", answer: "2 (binary), 8 (octal), 10 (decimal), 16 (hexadecimal)." }],
    relatedCalcs: mathRelated("number-base-converter"),
  },
  {
    slug: "base-2-calculator", name: "Base 2 Calculator", category: "Math", categorySlug: "math", subcategory: "Number Theory",
    description: "Convert decimal to binary and perform binary arithmetic.", metaDescription: "Free base 2 / binary calculator.", icon: "hash",
    inputs: [
      { id: "a", label: "Number A", type: "number", defaultValue: 42 },
      { id: "b", label: "Number B", type: "number", defaultValue: 15 },
    ],
    calculate: (v) => {
      const a = Math.floor(Math.abs(v.a)), b = Math.floor(Math.abs(v.b));
      return [
        { label: "A in binary", value: a.toString(2), highlight: true },
        { label: "B in binary", value: b.toString(2) },
        { label: "A+B binary", value: (a + b).toString(2) },
        { label: "A AND B", value: (a & b).toString(2) },
        { label: "A OR B", value: (a | b).toString(2) },
        { label: "A XOR B", value: (a ^ b).toString(2) },
      ];
    },
    formula: { expression: "Standard binary operations", variables: [] },
    howToUse: "Enter two numbers for binary operations.", faqs: [{ question: "What is XOR?", answer: "Exclusive OR: 1 when bits differ, 0 when same." }],
    relatedCalcs: mathRelated("base-2-calculator"),
  },
  {
    slug: "base-8-calculator", name: "Base 8 Calculator", category: "Math", categorySlug: "math", subcategory: "Number Theory",
    description: "Convert decimal to octal.", metaDescription: "Free base 8 / octal calculator.", icon: "hash",
    inputs: [{ id: "value", label: "Decimal Number", type: "number", defaultValue: 255 }],
    calculate: (v) => {
      const n = Math.floor(Math.abs(v.value));
      return [
        { label: "Octal", value: n.toString(8), highlight: true },
        { label: "Binary", value: n.toString(2) },
        { label: "Hex", value: n.toString(16).toUpperCase() },
      ];
    },
    formula: { expression: "Divide by 8, collect remainders", variables: [] },
    howToUse: "Enter a decimal number.", faqs: [{ question: "Where is octal used?", answer: "Unix file permissions (chmod 755) and some legacy systems." }],
    relatedCalcs: mathRelated("base-8-calculator"),
  },
  {
    slug: "base-16-calculator", name: "Base 16 Calculator", category: "Math", categorySlug: "math", subcategory: "Number Theory",
    description: "Convert decimal to hexadecimal.", metaDescription: "Free base 16 / hexadecimal calculator.", icon: "hash",
    inputs: [{ id: "value", label: "Decimal Number", type: "number", defaultValue: 255 }],
    calculate: (v) => {
      const n = Math.floor(Math.abs(v.value));
      return [
        { label: "Hexadecimal", value: `0x${n.toString(16).toUpperCase()}`, highlight: true },
        { label: "Binary", value: n.toString(2) },
        { label: "Octal", value: n.toString(8) },
        { label: "As Color", value: `#${n.toString(16).toUpperCase().padStart(6, "0")}` },
      ];
    },
    formula: { expression: "Divide by 16, use 0-9 and A-F", variables: [] },
    howToUse: "Enter a decimal number.", faqs: [{ question: "Why hex?", answer: "Compact binary representation. Each hex digit = 4 bits." }],
    relatedCalcs: mathRelated("base-16-calculator"),
  },

  // ===== MATRIX & LINEAR ALGEBRA =====
  {
    slug: "matrix-determinant-calculator", name: "Matrix Determinant Calculator", category: "Math", categorySlug: "math", subcategory: "Matrix & Linear Algebra",
    description: "Calculate the determinant of a 3×3 matrix.", metaDescription: "Free 3x3 matrix determinant calculator.", icon: "hash",
    inputs: [
      { id: "a", label: "a₁₁", type: "number", defaultValue: 1 }, { id: "b", label: "a₁₂", type: "number", defaultValue: 2 }, { id: "c", label: "a₁₃", type: "number", defaultValue: 3 },
      { id: "d", label: "a₂₁", type: "number", defaultValue: 4 }, { id: "e", label: "a₂₂", type: "number", defaultValue: 5 }, { id: "f", label: "a₂₃", type: "number", defaultValue: 6 },
      { id: "g", label: "a₃₁", type: "number", defaultValue: 7 }, { id: "h", label: "a₃₂", type: "number", defaultValue: 8 }, { id: "i", label: "a₃₃", type: "number", defaultValue: 0 },
    ],
    calculate: (v) => {
      const det = v.a * (v.e * v.i - v.f * v.h) - v.b * (v.d * v.i - v.f * v.g) + v.c * (v.d * v.h - v.e * v.g);
      return [
        { label: "Determinant", value: det.toFixed(4), highlight: true },
        { label: "Invertible?", value: det !== 0 ? "Yes" : "No (singular)" },
      ];
    },
    formula: { expression: "det = a(ei-fh) - b(di-fg) + c(dh-eg)", variables: ["Cofactor expansion along first row"] },
    howToUse: "Enter 9 elements of the 3×3 matrix.", faqs: [{ question: "What does determinant = 0 mean?", answer: "The matrix is singular (not invertible) and the system has no unique solution." }],
    relatedCalcs: mathRelated("matrix-determinant-calculator"),
  },
  {
    slug: "matrix-inverse-calculator", name: "Matrix Inverse Calculator", category: "Math", categorySlug: "math", subcategory: "Matrix & Linear Algebra",
    description: "Find the inverse of a 2×2 matrix.", metaDescription: "Free 2x2 matrix inverse calculator.", icon: "hash",
    inputs: [
      { id: "a", label: "a", type: "number", defaultValue: 4 }, { id: "b", label: "b", type: "number", defaultValue: 7 },
      { id: "c", label: "c", type: "number", defaultValue: 2 }, { id: "d", label: "d", type: "number", defaultValue: 6 },
    ],
    calculate: (v) => {
      const det = v.a * v.d - v.b * v.c;
      if (det === 0) return [{ label: "Error", value: "Matrix is singular (det=0)" }];
      return [
        { label: "Inverse", value: `[${(v.d / det).toFixed(4)}, ${(-v.b / det).toFixed(4)}; ${(-v.c / det).toFixed(4)}, ${(v.a / det).toFixed(4)}]`, highlight: true },
        { label: "Determinant", value: det.toFixed(4) },
      ];
    },
    formula: { expression: "A⁻¹ = (1/det) × [d, -b; -c, a]", variables: ["det = ad - bc"] },
    howToUse: "Enter 4 elements of the 2×2 matrix.", faqs: [{ question: "When does inverse exist?", answer: "When determinant ≠ 0." }],
    relatedCalcs: mathRelated("matrix-inverse-calculator"),
  },
  {
    slug: "matrix-rank-calculator", name: "Matrix Rank Calculator", category: "Math", categorySlug: "math", subcategory: "Matrix & Linear Algebra",
    description: "Determine the rank of a 2×3 matrix.", metaDescription: "Free matrix rank calculator.", icon: "hash",
    inputs: [
      { id: "a", label: "a₁₁", type: "number", defaultValue: 1 }, { id: "b", label: "a₁₂", type: "number", defaultValue: 2 }, { id: "c", label: "a₁₃", type: "number", defaultValue: 3 },
      { id: "d", label: "a₂₁", type: "number", defaultValue: 4 }, { id: "e", label: "a₂₂", type: "number", defaultValue: 5 }, { id: "f", label: "a₂₃", type: "number", defaultValue: 6 },
    ],
    calculate: (v) => {
      // Check 2x2 minors
      const m1 = v.a * v.e - v.b * v.d;
      const m2 = v.a * v.f - v.c * v.d;
      const m3 = v.b * v.f - v.c * v.e;
      const rank = (m1 !== 0 || m2 !== 0 || m3 !== 0) ? 2 : (v.a !== 0 || v.b !== 0 || v.c !== 0 || v.d !== 0 || v.e !== 0 || v.f !== 0) ? 1 : 0;
      return [{ label: "Rank", value: `${rank}`, highlight: true }, { label: "Max possible rank", value: "2 (min of rows, cols)" }];
    },
    formula: { expression: "Rank = number of linearly independent rows", variables: [] },
    howToUse: "Enter 6 elements of the 2×3 matrix.", faqs: [{ question: "What is matrix rank?", answer: "The number of linearly independent rows (or columns)." }],
    relatedCalcs: mathRelated("matrix-rank-calculator"),
  },
  {
    slug: "matrix-trace-calculator", name: "Matrix Trace Calculator", category: "Math", categorySlug: "math", subcategory: "Matrix & Linear Algebra",
    description: "Calculate the trace of a 3×3 matrix (sum of diagonal elements).", metaDescription: "Free matrix trace calculator.", icon: "hash",
    inputs: [
      { id: "a", label: "a₁₁", type: "number", defaultValue: 3 }, { id: "b", label: "a₁₂", type: "number", defaultValue: 0 }, { id: "c", label: "a₁₃", type: "number", defaultValue: 0 },
      { id: "d", label: "a₂₁", type: "number", defaultValue: 0 }, { id: "e", label: "a₂₂", type: "number", defaultValue: 5 }, { id: "f", label: "a₂₃", type: "number", defaultValue: 0 },
      { id: "g", label: "a₃₁", type: "number", defaultValue: 0 }, { id: "h", label: "a₃₂", type: "number", defaultValue: 0 }, { id: "i", label: "a₃₃", type: "number", defaultValue: 7 },
    ],
    calculate: (v) => {
      return [{ label: "Trace", value: `${v.a + v.e + v.i}`, highlight: true }, { label: "Sum of diagonal", value: `${v.a} + ${v.e} + ${v.i}` }];
    },
    formula: { expression: "tr(A) = a₁₁ + a₂₂ + a₃₃", variables: [] },
    howToUse: "Enter 3×3 matrix elements.", faqs: [{ question: "What is the trace used for?", answer: "Sum of eigenvalues, invariant under similarity transformations." }],
    relatedCalcs: mathRelated("matrix-trace-calculator"),
  },
  {
    slug: "eigenvalue-calculator", name: "Eigenvalue Calculator", category: "Math", categorySlug: "math", subcategory: "Matrix & Linear Algebra",
    description: "Find eigenvalues of a 2×2 matrix.", metaDescription: "Free 2x2 eigenvalue calculator.", icon: "hash",
    inputs: [
      { id: "a", label: "a", type: "number", defaultValue: 4 }, { id: "b", label: "b", type: "number", defaultValue: 1 },
      { id: "c", label: "c", type: "number", defaultValue: 2 }, { id: "d", label: "d", type: "number", defaultValue: 3 },
    ],
    calculate: (v) => {
      const trace = v.a + v.d;
      const det = v.a * v.d - v.b * v.c;
      const disc = trace ** 2 - 4 * det;
      if (disc < 0) {
        return [
          { label: "λ₁", value: `${(trace / 2).toFixed(4)} + ${(Math.sqrt(-disc) / 2).toFixed(4)}i`, highlight: true },
          { label: "λ₂", value: `${(trace / 2).toFixed(4)} - ${(Math.sqrt(-disc) / 2).toFixed(4)}i` },
        ];
      }
      const l1 = (trace + Math.sqrt(disc)) / 2;
      const l2 = (trace - Math.sqrt(disc)) / 2;
      return [
        { label: "λ₁", value: l1.toFixed(6), highlight: true },
        { label: "λ₂", value: l2.toFixed(6) },
        { label: "Trace (λ₁+λ₂)", value: trace.toFixed(4) },
        { label: "Det (λ₁×λ₂)", value: det.toFixed(4) },
      ];
    },
    formula: { expression: "λ = (trace ± √(trace²-4det)) / 2", variables: ["Characteristic equation: det(A-λI) = 0"] },
    howToUse: "Enter 2×2 matrix elements.", faqs: [{ question: "What are eigenvalues?", answer: "Scalars λ where Av = λv for some nonzero vector v." }],
    relatedCalcs: mathRelated("eigenvalue-calculator"),
  },
  {
    slug: "eigenvector-calculator", name: "Eigenvector Calculator", category: "Math", categorySlug: "math", subcategory: "Matrix & Linear Algebra",
    description: "Find eigenvectors of a 2×2 matrix.", metaDescription: "Free 2x2 eigenvector calculator.", icon: "hash",
    inputs: [
      { id: "a", label: "a", type: "number", defaultValue: 2 }, { id: "b", label: "b", type: "number", defaultValue: 1 },
      { id: "c", label: "c", type: "number", defaultValue: 1 }, { id: "d", label: "d", type: "number", defaultValue: 2 },
    ],
    calculate: (v) => {
      const trace = v.a + v.d;
      const det = v.a * v.d - v.b * v.c;
      const disc = trace ** 2 - 4 * det;
      if (disc < 0) return [{ label: "Result", value: "Complex eigenvalues — eigenvectors are complex" }];
      const l1 = (trace + Math.sqrt(disc)) / 2;
      const l2 = (trace - Math.sqrt(disc)) / 2;
      const ev1 = v.b !== 0 ? `(${v.b.toFixed(2)}, ${(l1 - v.a).toFixed(2)})` : `(1, 0)`;
      const ev2 = v.b !== 0 ? `(${v.b.toFixed(2)}, ${(l2 - v.a).toFixed(2)})` : `(0, 1)`;
      return [
        { label: "λ₁ eigenvector", value: ev1, highlight: true },
        { label: "λ₂ eigenvector", value: ev2 },
        { label: "λ₁", value: l1.toFixed(4) },
        { label: "λ₂", value: l2.toFixed(4) },
      ];
    },
    formula: { expression: "(A - λI)v = 0", variables: ["Solve null space of (A - λI)"] },
    howToUse: "Enter 2×2 matrix elements.", faqs: [{ question: "What are eigenvectors?", answer: "Directions that remain unchanged (only scaled) when multiplied by the matrix." }],
    relatedCalcs: mathRelated("eigenvector-calculator"),
  },
  {
    slug: "matrix-multiplication-calculator", name: "Matrix Multiplication Calculator", category: "Math", categorySlug: "math", subcategory: "Matrix & Linear Algebra",
    description: "Multiply two 2×2 matrices.", metaDescription: "Free 2x2 matrix multiplication calculator.", icon: "hash",
    inputs: [
      { id: "a1", label: "A₁₁", type: "number", defaultValue: 1 }, { id: "b1", label: "A₁₂", type: "number", defaultValue: 2 },
      { id: "c1", label: "A₂₁", type: "number", defaultValue: 3 }, { id: "d1", label: "A₂₂", type: "number", defaultValue: 4 },
      { id: "a2", label: "B₁₁", type: "number", defaultValue: 5 }, { id: "b2", label: "B₁₂", type: "number", defaultValue: 6 },
      { id: "c2", label: "B₂₁", type: "number", defaultValue: 7 }, { id: "d2", label: "B₂₂", type: "number", defaultValue: 8 },
    ],
    calculate: (v) => {
      const r11 = v.a1 * v.a2 + v.b1 * v.c2;
      const r12 = v.a1 * v.b2 + v.b1 * v.d2;
      const r21 = v.c1 * v.a2 + v.d1 * v.c2;
      const r22 = v.c1 * v.b2 + v.d1 * v.d2;
      return [
        { label: "Result", value: `[${r11}, ${r12}; ${r21}, ${r22}]`, highlight: true },
        { label: "Det(AB)", value: `${(r11 * r22 - r12 * r21).toFixed(4)}` },
      ];
    },
    formula: { expression: "(AB)ᵢⱼ = Σ Aᵢₖ × Bₖⱼ", variables: [] },
    howToUse: "Enter elements of two 2×2 matrices.", faqs: [{ question: "Is matrix multiplication commutative?", answer: "No, AB ≠ BA in general." }],
    relatedCalcs: mathRelated("matrix-multiplication-calculator"),
  },
  {
    slug: "matrix-addition-calculator", name: "Matrix Addition Calculator", category: "Math", categorySlug: "math", subcategory: "Matrix & Linear Algebra",
    description: "Add two 2×2 matrices.", metaDescription: "Free matrix addition calculator.", icon: "hash",
    inputs: [
      { id: "a1", label: "A₁₁", type: "number", defaultValue: 1 }, { id: "b1", label: "A₁₂", type: "number", defaultValue: 2 },
      { id: "c1", label: "A₂₁", type: "number", defaultValue: 3 }, { id: "d1", label: "A₂₂", type: "number", defaultValue: 4 },
      { id: "a2", label: "B₁₁", type: "number", defaultValue: 5 }, { id: "b2", label: "B₁₂", type: "number", defaultValue: 6 },
      { id: "c2", label: "B₂₁", type: "number", defaultValue: 7 }, { id: "d2", label: "B₂₂", type: "number", defaultValue: 8 },
    ],
    calculate: (v) => {
      return [{ label: "A + B", value: `[${v.a1 + v.a2}, ${v.b1 + v.b2}; ${v.c1 + v.c2}, ${v.d1 + v.d2}]`, highlight: true }];
    },
    formula: { expression: "(A+B)ᵢⱼ = Aᵢⱼ + Bᵢⱼ", variables: [] },
    howToUse: "Enter elements of two 2×2 matrices.", faqs: [{ question: "Can you add matrices of different sizes?", answer: "No, matrices must have the same dimensions." }],
    relatedCalcs: mathRelated("matrix-addition-calculator"),
  },
  {
    slug: "matrix-subtraction-calculator", name: "Matrix Subtraction Calculator", category: "Math", categorySlug: "math", subcategory: "Matrix & Linear Algebra",
    description: "Subtract two 2×2 matrices.", metaDescription: "Free matrix subtraction calculator.", icon: "hash",
    inputs: [
      { id: "a1", label: "A₁₁", type: "number", defaultValue: 5 }, { id: "b1", label: "A₁₂", type: "number", defaultValue: 6 },
      { id: "c1", label: "A₂₁", type: "number", defaultValue: 7 }, { id: "d1", label: "A₂₂", type: "number", defaultValue: 8 },
      { id: "a2", label: "B₁₁", type: "number", defaultValue: 1 }, { id: "b2", label: "B₁₂", type: "number", defaultValue: 2 },
      { id: "c2", label: "B₂₁", type: "number", defaultValue: 3 }, { id: "d2", label: "B₂₂", type: "number", defaultValue: 4 },
    ],
    calculate: (v) => {
      return [{ label: "A - B", value: `[${v.a1 - v.a2}, ${v.b1 - v.b2}; ${v.c1 - v.c2}, ${v.d1 - v.d2}]`, highlight: true }];
    },
    formula: { expression: "(A-B)ᵢⱼ = Aᵢⱼ - Bᵢⱼ", variables: [] },
    howToUse: "Enter elements of two 2×2 matrices.", faqs: [{ question: "Is subtraction commutative?", answer: "No, A-B ≠ B-A." }],
    relatedCalcs: mathRelated("matrix-subtraction-calculator"),
  },
  {
    slug: "vector-calculator", name: "Vector Calculator", category: "Math", categorySlug: "math", subcategory: "Matrix & Linear Algebra",
    description: "Perform vector operations: add, subtract, and scale 3D vectors.", metaDescription: "Free 3D vector calculator.", icon: "hash",
    inputs: [
      { id: "ax", label: "A.x", type: "number", defaultValue: 1 }, { id: "ay", label: "A.y", type: "number", defaultValue: 2 }, { id: "az", label: "A.z", type: "number", defaultValue: 3 },
      { id: "bx", label: "B.x", type: "number", defaultValue: 4 }, { id: "by", label: "B.y", type: "number", defaultValue: 5 }, { id: "bz", label: "B.z", type: "number", defaultValue: 6 },
    ],
    calculate: (v) => {
      return [
        { label: "A + B", value: `(${v.ax + v.bx}, ${v.ay + v.by}, ${v.az + v.bz})`, highlight: true },
        { label: "A - B", value: `(${v.ax - v.bx}, ${v.ay - v.by}, ${v.az - v.bz})` },
        { label: "|A|", value: Math.sqrt(v.ax ** 2 + v.ay ** 2 + v.az ** 2).toFixed(4) },
        { label: "|B|", value: Math.sqrt(v.bx ** 2 + v.by ** 2 + v.bz ** 2).toFixed(4) },
      ];
    },
    formula: { expression: "A+B = (a₁+b₁, a₂+b₂, a₃+b₃)", variables: ["|A| = √(a₁²+a₂²+a₃²)"] },
    howToUse: "Enter components of two 3D vectors.", faqs: [{ question: "What is a vector?", answer: "A quantity with both magnitude and direction, represented by components." }],
    relatedCalcs: mathRelated("vector-calculator"),
  },
  {
    slug: "dot-product-calculator", name: "Dot Product Calculator", category: "Math", categorySlug: "math", subcategory: "Matrix & Linear Algebra",
    description: "Calculate the dot product of two 3D vectors.", metaDescription: "Free dot product calculator.", icon: "hash",
    inputs: [
      { id: "ax", label: "A.x", type: "number", defaultValue: 1 }, { id: "ay", label: "A.y", type: "number", defaultValue: 2 }, { id: "az", label: "A.z", type: "number", defaultValue: 3 },
      { id: "bx", label: "B.x", type: "number", defaultValue: 4 }, { id: "by", label: "B.y", type: "number", defaultValue: -5 }, { id: "bz", label: "B.z", type: "number", defaultValue: 6 },
    ],
    calculate: (v) => {
      const dot = v.ax * v.bx + v.ay * v.by + v.az * v.bz;
      const magA = Math.sqrt(v.ax ** 2 + v.ay ** 2 + v.az ** 2);
      const magB = Math.sqrt(v.bx ** 2 + v.by ** 2 + v.bz ** 2);
      const angle = magA > 0 && magB > 0 ? Math.acos(dot / (magA * magB)) * 180 / Math.PI : 0;
      return [
        { label: "A · B", value: dot.toFixed(4), highlight: true },
        { label: "Angle between", value: `${angle.toFixed(2)}°` },
        { label: "Perpendicular?", value: Math.abs(dot) < 0.0001 ? "Yes ✓" : "No" },
      ];
    },
    formula: { expression: "A·B = a₁b₁ + a₂b₂ + a₃b₃", variables: ["cos θ = (A·B) / (|A|·|B|)"] },
    howToUse: "Enter two 3D vectors.", faqs: [{ question: "What does dot product = 0 mean?", answer: "The vectors are perpendicular (orthogonal)." }],
    relatedCalcs: mathRelated("dot-product-calculator"),
  },
  {
    slug: "cross-product-calculator", name: "Cross Product Calculator", category: "Math", categorySlug: "math", subcategory: "Matrix & Linear Algebra",
    description: "Calculate the cross product of two 3D vectors.", metaDescription: "Free cross product calculator.", icon: "hash",
    inputs: [
      { id: "ax", label: "A.x", type: "number", defaultValue: 1 }, { id: "ay", label: "A.y", type: "number", defaultValue: 2 }, { id: "az", label: "A.z", type: "number", defaultValue: 3 },
      { id: "bx", label: "B.x", type: "number", defaultValue: 4 }, { id: "by", label: "B.y", type: "number", defaultValue: 5 }, { id: "bz", label: "B.z", type: "number", defaultValue: 6 },
    ],
    calculate: (v) => {
      const cx = v.ay * v.bz - v.az * v.by;
      const cy = v.az * v.bx - v.ax * v.bz;
      const cz = v.ax * v.by - v.ay * v.bx;
      const mag = Math.sqrt(cx ** 2 + cy ** 2 + cz ** 2);
      return [
        { label: "A × B", value: `(${cx}, ${cy}, ${cz})`, highlight: true },
        { label: "|A × B|", value: mag.toFixed(4) },
        { label: "Parallelogram area", value: mag.toFixed(4) },
      ];
    },
    formula: { expression: "A×B = (a₂b₃-a₃b₂, a₃b₁-a₁b₃, a₁b₂-a₂b₁)", variables: [] },
    howToUse: "Enter two 3D vectors.", faqs: [{ question: "What is the cross product?", answer: "A vector perpendicular to both input vectors with magnitude equal to the parallelogram area." }],
    relatedCalcs: mathRelated("cross-product-calculator"),
  },
  {
    slug: "vector-magnitude-calculator", name: "Vector Magnitude Calculator", category: "Math", categorySlug: "math", subcategory: "Matrix & Linear Algebra",
    description: "Calculate the magnitude and unit vector of a 3D vector.", metaDescription: "Free vector magnitude calculator.", icon: "hash",
    inputs: [
      { id: "x", label: "x", type: "number", defaultValue: 3 },
      { id: "y", label: "y", type: "number", defaultValue: 4 },
      { id: "z", label: "z", type: "number", defaultValue: 0 },
    ],
    calculate: (v) => {
      const mag = Math.sqrt(v.x ** 2 + v.y ** 2 + v.z ** 2);
      if (mag === 0) return [{ label: "Error", value: "Zero vector has no direction" }];
      return [
        { label: "Magnitude", value: mag.toFixed(6), highlight: true },
        { label: "Unit Vector", value: `(${(v.x / mag).toFixed(4)}, ${(v.y / mag).toFixed(4)}, ${(v.z / mag).toFixed(4)})` },
      ];
    },
    formula: { expression: "|v| = √(x² + y² + z²)", variables: ["Unit = v / |v|"] },
    howToUse: "Enter vector components.", faqs: [{ question: "What is a unit vector?", answer: "A vector with magnitude 1 pointing in the same direction." }],
    relatedCalcs: mathRelated("vector-magnitude-calculator"),
  },

  // ===== EDUCATION (GRADE CALCULATORS) =====
  {
    slug: "semester-grade-calculator", name: "Semester Grade Calculator", category: "Math", categorySlug: "math", subcategory: "Grade Calculators",
    description: "Calculate your semester grade from assignment and exam scores.", metaDescription: "Free semester grade calculator. Combine assignment, midterm, and final exam scores with their weights to get your semester percentage and letter grade.", icon: "hash",
    inputs: [
      { id: "assignments", label: "Assignments Score (%)", type: "number", defaultValue: 85 },
      { id: "aw", label: "Assignments Weight (%)", type: "number", defaultValue: 30 },
      { id: "midterm", label: "Midterm Score (%)", type: "number", defaultValue: 78 },
      { id: "mw", label: "Midterm Weight (%)", type: "number", defaultValue: 30 },
      { id: "final", label: "Final Exam Score (%)", type: "number", defaultValue: 92 },
      { id: "fw", label: "Final Weight (%)", type: "number", defaultValue: 40 },
    ],
    calculate: (v) => {
      const grade = (v.assignments * v.aw + v.midterm * v.mw + v.final * v.fw) / (v.aw + v.mw + v.fw);
      const letter = grade >= 93 ? "A" : grade >= 90 ? "A-" : grade >= 87 ? "B+" : grade >= 83 ? "B" : grade >= 80 ? "B-" : grade >= 77 ? "C+" : grade >= 73 ? "C" : grade >= 70 ? "C-" : grade >= 67 ? "D+" : grade >= 60 ? "D" : "F";
      return [
        { label: "Semester Grade", value: `${grade.toFixed(2)}%`, highlight: true },
        { label: "Letter Grade", value: letter },
      ];
    },
    formula: { expression: "Grade = Σ(score × weight) / Σweights", variables: [] },
    howToUse: "Enter scores and weights for each component.", faqs: [{ question: "Do weights need to sum to 100?", answer: "Ideally yes, but the calculator normalizes if they don't." }],
    relatedCalcs: mathRelated("semester-grade-calculator"),
  },
  {
    slug: "weighted-grade-calculator", name: "Weighted Grade Calculator", category: "Math", categorySlug: "math", subcategory: "Grade Calculators",
    description: "Calculate a weighted average grade from multiple components.", metaDescription: "Free weighted grade calculator. Enter grades and their percentage weights to compute your weighted average and overall course grade.", icon: "hash",
    inputs: [
      { id: "g1", label: "Grade 1 (%)", type: "number", defaultValue: 90 }, { id: "w1", label: "Weight 1", type: "number", defaultValue: 20 },
      { id: "g2", label: "Grade 2 (%)", type: "number", defaultValue: 85 }, { id: "w2", label: "Weight 2", type: "number", defaultValue: 30 },
      { id: "g3", label: "Grade 3 (%)", type: "number", defaultValue: 78 }, { id: "w3", label: "Weight 3", type: "number", defaultValue: 50 },
    ],
    calculate: (v) => {
      const totalW = v.w1 + v.w2 + v.w3;
      const grade = totalW > 0 ? (v.g1 * v.w1 + v.g2 * v.w2 + v.g3 * v.w3) / totalW : 0;
      return [{ label: "Weighted Average", value: `${grade.toFixed(2)}%`, highlight: true }];
    },
    formula: { expression: "Weighted Avg = Σ(grade × weight) / Σweights", variables: [] },
    howToUse: "Enter grades and their weights.", faqs: [{ question: "What are weights?", answer: "How much each component counts toward the final grade." }],
    relatedCalcs: mathRelated("weighted-grade-calculator"),
  },
  {
    slug: "class-average-calculator", name: "Class Average Calculator", category: "Math", categorySlug: "math", subcategory: "Grade Calculators",
    description: "Calculate the class average from individual student scores.", metaDescription: "Free class average calculator.", icon: "hash",
    inputs: [
      { id: "s1", label: "Score 1", type: "number", defaultValue: 85 }, { id: "s2", label: "Score 2", type: "number", defaultValue: 92 },
      { id: "s3", label: "Score 3", type: "number", defaultValue: 78 }, { id: "s4", label: "Score 4", type: "number", defaultValue: 88 },
      { id: "s5", label: "Score 5", type: "number", defaultValue: 95 }, { id: "s6", label: "Score 6", type: "number", defaultValue: 72 },
    ],
    calculate: (v) => {
      const scores = [v.s1, v.s2, v.s3, v.s4, v.s5, v.s6].sort((a, b) => a - b);
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      return [
        { label: "Average", value: `${avg.toFixed(2)}%`, highlight: true },
        { label: "Highest", value: `${scores[scores.length - 1]}` },
        { label: "Lowest", value: `${scores[0]}` },
        { label: "Range", value: `${scores[scores.length - 1] - scores[0]}` },
      ];
    },
    formula: { expression: "Average = Sum / Count", variables: [] },
    howToUse: "Enter individual scores.", faqs: [{ question: "Is this the same as mean?", answer: "Yes, class average is the arithmetic mean of all scores." }],
    relatedCalcs: mathRelated("class-average-calculator"),
  },
  {
    slug: "attendance-percentage-calculator", name: "Attendance Percentage Calculator", category: "Math", categorySlug: "math", subcategory: "Grade Calculators",
    description: "Calculate your attendance percentage from classes attended and total classes.", metaDescription: "Free attendance percentage calculator.", icon: "hash",
    inputs: [
      { id: "attended", label: "Classes Attended", type: "number", defaultValue: 42 },
      { id: "total", label: "Total Classes", type: "number", defaultValue: 50 },
    ],
    calculate: (v) => {
      if (v.total === 0) return [{ label: "Error", value: "Total classes cannot be zero" }];
      const pct = (v.attended / v.total) * 100;
      return [
        { label: "Attendance", value: `${pct.toFixed(2)}%`, highlight: true },
        { label: "Missed", value: `${v.total - v.attended} classes` },
        { label: "Meets 75% requirement?", value: pct >= 75 ? "Yes ✓" : "No ✗" },
      ];
    },
    formula: { expression: "Attendance % = (Attended / Total) × 100", variables: [] },
    howToUse: "Enter classes attended and total.", faqs: [{ question: "Why 75%?", answer: "Many institutions require minimum 75% attendance for exam eligibility." }],
    relatedCalcs: mathRelated("attendance-percentage-calculator"),
  },
  {
    slug: "study-time-calculator", name: "Study Time Calculator", category: "Math", categorySlug: "math", subcategory: "Grade Calculators",
    description: "Estimate study time needed based on course credit hours.", metaDescription: "Free study time calculator.", icon: "hash",
    inputs: [
      { id: "credits", label: "Credit Hours", type: "number", defaultValue: 15 },
      { id: "ratio", label: "Study hours per credit", type: "number", defaultValue: 2, step: 0.5 },
    ],
    calculate: (v) => {
      const weekly = v.credits * v.ratio;
      return [
        { label: "Weekly Study Hours", value: `${weekly.toFixed(1)}`, highlight: true },
        { label: "Daily (7 days)", value: `${(weekly / 7).toFixed(1)} hrs` },
        { label: "Daily (5 days)", value: `${(weekly / 5).toFixed(1)} hrs` },
      ];
    },
    formula: { expression: "Study hours = Credits × Ratio", variables: ["Common ratio: 2-3 hours per credit"] },
    howToUse: "Enter your credit hours and study ratio.", faqs: [{ question: "How much should I study?", answer: "The general rule is 2-3 hours of study per credit hour per week." }],
    relatedCalcs: mathRelated("study-time-calculator"),
  },
  {
    slug: "test-score-calculator", name: "Test Score Calculator", category: "Math", categorySlug: "math", subcategory: "Grade Calculators",
    description: "Calculate your test score percentage from correct answers.", metaDescription: "Free test score calculator.", icon: "hash",
    inputs: [
      { id: "correct", label: "Correct Answers", type: "number", defaultValue: 42 },
      { id: "total", label: "Total Questions", type: "number", defaultValue: 50 },
    ],
    calculate: (v) => {
      if (v.total === 0) return [{ label: "Error", value: "Total cannot be zero" }];
      const pct = (v.correct / v.total) * 100;
      const letter = pct >= 93 ? "A" : pct >= 90 ? "A-" : pct >= 87 ? "B+" : pct >= 83 ? "B" : pct >= 80 ? "B-" : pct >= 77 ? "C+" : pct >= 73 ? "C" : pct >= 70 ? "C-" : pct >= 60 ? "D" : "F";
      return [
        { label: "Score", value: `${pct.toFixed(2)}%`, highlight: true },
        { label: "Letter Grade", value: letter },
        { label: "Wrong", value: `${v.total - v.correct}` },
      ];
    },
    formula: { expression: "Score = (Correct / Total) × 100", variables: [] },
    howToUse: "Enter correct and total questions.", faqs: [{ question: "What is a passing score?", answer: "Typically 60-70% depending on the institution." }],
    relatedCalcs: mathRelated("test-score-calculator"),
  },
  {
    slug: "course-percentage-calculator", name: "Course Percentage Calculator", category: "Math", categorySlug: "math", subcategory: "Grade Calculators",
    description: "Calculate your overall course percentage from multiple assessments.", metaDescription: "Free course percentage calculator.", icon: "hash",
    inputs: [
      { id: "quiz", label: "Quiz Avg (%)", type: "number", defaultValue: 88 }, { id: "qw", label: "Quiz Weight (%)", type: "number", defaultValue: 15 },
      { id: "hw", label: "Homework Avg (%)", type: "number", defaultValue: 92 }, { id: "hww", label: "HW Weight (%)", type: "number", defaultValue: 20 },
      { id: "mid", label: "Midterm (%)", type: "number", defaultValue: 81 }, { id: "mw", label: "Mid Weight (%)", type: "number", defaultValue: 25 },
      { id: "fin", label: "Final (%)", type: "number", defaultValue: 85 }, { id: "fw", label: "Final Weight (%)", type: "number", defaultValue: 40 },
    ],
    calculate: (v) => {
      const totalW = v.qw + v.hww + v.mw + v.fw;
      const grade = totalW > 0 ? (v.quiz * v.qw + v.hw * v.hww + v.mid * v.mw + v.fin * v.fw) / totalW : 0;
      return [{ label: "Course Grade", value: `${grade.toFixed(2)}%`, highlight: true }];
    },
    formula: { expression: "Weighted sum / total weight", variables: [] },
    howToUse: "Enter scores and weights for each category.", faqs: [{ question: "What if I haven't taken the final?", answer: "Set final weight to 0 to see current standing." }],
    relatedCalcs: mathRelated("course-percentage-calculator"),
  },
  {
    slug: "credit-hour-gpa-calculator", name: "Credit Hour GPA Calculator", category: "Math", categorySlug: "math", subcategory: "Grade Calculators",
    description: "Calculate GPA weighted by credit hours.", metaDescription: "Free credit hour GPA calculator.", icon: "hash",
    inputs: [
      { id: "g1", label: "Course 1 Grade (4.0 scale)", type: "number", defaultValue: 3.7, step: 0.1, max: 4 },
      { id: "c1", label: "Course 1 Credits", type: "number", defaultValue: 3 },
      { id: "g2", label: "Course 2 Grade", type: "number", defaultValue: 3.3, step: 0.1, max: 4 },
      { id: "c2", label: "Course 2 Credits", type: "number", defaultValue: 4 },
      { id: "g3", label: "Course 3 Grade", type: "number", defaultValue: 4.0, step: 0.1, max: 4 },
      { id: "c3", label: "Course 3 Credits", type: "number", defaultValue: 3 },
    ],
    calculate: (v) => {
      const totalCredits = v.c1 + v.c2 + v.c3;
      const gpa = totalCredits > 0 ? (v.g1 * v.c1 + v.g2 * v.c2 + v.g3 * v.c3) / totalCredits : 0;
      return [
        { label: "GPA", value: gpa.toFixed(2), highlight: true },
        { label: "Total Credits", value: `${totalCredits}` },
        { label: "Quality Points", value: (v.g1 * v.c1 + v.g2 * v.c2 + v.g3 * v.c3).toFixed(1) },
      ];
    },
    formula: { expression: "GPA = Σ(grade × credits) / Σcredits", variables: [] },
    howToUse: "Enter grade and credits for each course.", faqs: [{ question: "What is a good GPA?", answer: "3.0+ is generally good, 3.5+ is dean's list at many schools." }],
    relatedCalcs: mathRelated("credit-hour-gpa-calculator"),
  },
  {
    slug: "cgpa-calculator", name: "CGPA Calculator", category: "Math", categorySlug: "math", subcategory: "Grade Calculators",
    description: "Calculate Cumulative Grade Point Average across semesters.", metaDescription: "Free CGPA calculator. Enter each semester's GPA and credit hours to calculate your cumulative grade point average and total credits.", icon: "hash",
    inputs: [
      { id: "gpa1", label: "Sem 1 GPA", type: "number", defaultValue: 3.5, step: 0.1, max: 4 },
      { id: "cr1", label: "Sem 1 Credits", type: "number", defaultValue: 15 },
      { id: "gpa2", label: "Sem 2 GPA", type: "number", defaultValue: 3.7, step: 0.1, max: 4 },
      { id: "cr2", label: "Sem 2 Credits", type: "number", defaultValue: 16 },
      { id: "gpa3", label: "Sem 3 GPA", type: "number", defaultValue: 3.3, step: 0.1, max: 4 },
      { id: "cr3", label: "Sem 3 Credits", type: "number", defaultValue: 14 },
    ],
    calculate: (v) => {
      const totalCr = v.cr1 + v.cr2 + v.cr3;
      const cgpa = totalCr > 0 ? (v.gpa1 * v.cr1 + v.gpa2 * v.cr2 + v.gpa3 * v.cr3) / totalCr : 0;
      return [
        { label: "CGPA", value: cgpa.toFixed(2), highlight: true },
        { label: "Total Credits", value: `${totalCr}` },
        { label: "Percentage (approx)", value: `${(cgpa * 25).toFixed(1)}%` },
      ];
    },
    formula: { expression: "CGPA = Σ(semester_GPA × credits) / Σcredits", variables: [] },
    howToUse: "Enter GPA and credits for each semester.", faqs: [{ question: "CGPA vs GPA?", answer: "GPA is for one semester, CGPA is cumulative across all semesters." }],
    relatedCalcs: mathRelated("cgpa-calculator"),
  },
  {
    slug: "required-final-grade-calculator", name: "Required Final Grade Calculator", category: "Math", categorySlug: "math", subcategory: "Grade Calculators",
    description: "Calculate what score you need on the final to achieve your desired grade.", metaDescription: "Free required final grade calculator.", icon: "hash",
    inputs: [
      { id: "current", label: "Current Grade (%)", type: "number", defaultValue: 82 },
      { id: "cw", label: "Current Weight (%)", type: "number", defaultValue: 60 },
      { id: "target", label: "Target Grade (%)", type: "number", defaultValue: 90 },
    ],
    calculate: (v) => {
      const fw = 100 - v.cw;
      if (fw <= 0) return [{ label: "Error", value: "No remaining weight for final" }];
      const needed = (v.target * 100 - v.current * v.cw) / fw;
      return [
        { label: "Needed on Final", value: `${needed.toFixed(2)}%`, highlight: true },
        { label: "Final Weight", value: `${fw}%` },
        { label: "Achievable?", value: needed <= 100 ? "Yes ✓" : needed <= 110 ? "Possible with extra credit" : "Unlikely" },
      ];
    },
    formula: { expression: "Needed = (Target × 100 - Current × CurrentWeight) / FinalWeight", variables: [] },
    howToUse: "Enter current grade, its weight, and target grade.", faqs: [{ question: "What if I need over 100%?", answer: "You may need extra credit or it may not be achievable." }],
    relatedCalcs: mathRelated("required-final-grade-calculator"),
  },
  {
    slug: "exam-score-needed-calculator", name: "Exam Score Needed Calculator", category: "Math", categorySlug: "math", subcategory: "Grade Calculators",
    description: "Calculate the minimum exam score to pass or reach a target grade.", metaDescription: "Free exam score needed calculator.", icon: "hash",
    inputs: [
      { id: "current", label: "Current Average (%)", type: "number", defaultValue: 75 },
      { id: "cw", label: "Coursework Weight (%)", type: "number", defaultValue: 50 },
      { id: "target", label: "Target Overall (%)", type: "number", defaultValue: 70 },
    ],
    calculate: (v) => {
      const ew = 100 - v.cw;
      if (ew <= 0) return [{ label: "Error", value: "No exam weight" }];
      const needed = (v.target * 100 - v.current * v.cw) / ew;
      return [
        { label: "Exam Score Needed", value: `${needed.toFixed(2)}%`, highlight: true },
        { label: "Exam Weight", value: `${ew}%` },
        { label: "Status", value: needed < 0 ? "Already guaranteed ✓" : needed > 100 ? "Not achievable ✗" : "Achievable ✓" },
      ];
    },
    formula: { expression: "Needed = (Target×100 - Current×CW) / ExamWeight", variables: [] },
    howToUse: "Enter current average, coursework weight, and target.", faqs: [{ question: "What's a typical exam weight?", answer: "Finals are often 30-50% of the course grade." }],
    relatedCalcs: mathRelated("exam-score-needed-calculator"),
  },

  // ===== STUDY & ACADEMIC TOOLS =====
  {
    slug: "study-schedule-calculator", name: "Study Schedule Calculator", category: "Math", categorySlug: "math", subcategory: "Study & Academic Tools",
    description: "Plan study sessions based on available time and subjects.", metaDescription: "Free study schedule planner.", icon: "hash",
    inputs: [
      { id: "hours", label: "Available Hours/Week", type: "number", defaultValue: 20 },
      { id: "subjects", label: "Number of Subjects", type: "number", defaultValue: 5, min: 1 },
      { id: "hardPct", label: "Extra % for hardest subject", type: "number", defaultValue: 40 },
    ],
    calculate: (v) => {
      const basePerSubject = v.hours / v.subjects;
      const hardExtra = basePerSubject * (v.hardPct / 100);
      const redistributed = hardExtra / (v.subjects - 1);
      return [
        { label: "Base per subject", value: `${basePerSubject.toFixed(1)} hrs/week`, highlight: true },
        { label: "Hardest subject", value: `${(basePerSubject + hardExtra).toFixed(1)} hrs/week` },
        { label: "Others", value: `${(basePerSubject - redistributed).toFixed(1)} hrs/week each` },
        { label: "Daily study (5 days)", value: `${(v.hours / 5).toFixed(1)} hrs` },
      ];
    },
    formula: { expression: "Base = Total / Subjects", variables: ["Adjust for difficulty"] },
    howToUse: "Enter weekly hours, subjects, and difficulty adjustment.", faqs: [{ question: "How to prioritize?", answer: "Give more time to subjects you find hardest or have upcoming exams in." }],
    relatedCalcs: mathRelated("study-schedule-calculator"),
  },
  {
    slug: "reading-time-calculator", name: "Reading Time Calculator", category: "Math", categorySlug: "math", subcategory: "Study & Academic Tools",
    description: "Estimate how long it takes to read a text based on word count.", metaDescription: "Free reading time calculator. Enter a word count and reading speed in words per minute to estimate how long a text takes to read and how many pages it is.", icon: "hash",
    inputs: [
      { id: "words", label: "Word Count", type: "number", defaultValue: 5000 },
      { id: "speed", label: "Reading Speed (words/min)", type: "number", defaultValue: 250 },
    ],
    calculate: (v) => {
      if (v.speed <= 0) return [{ label: "Error", value: "Speed must be positive" }];
      const minutes = v.words / v.speed;
      return [
        { label: "Reading Time", value: `${Math.floor(minutes)} min ${Math.round((minutes % 1) * 60)} sec`, highlight: true },
        { label: "Pages (250 words/page)", value: `${(v.words / 250).toFixed(1)}` },
      ];
    },
    formula: { expression: "Time = Words / Speed", variables: ["Average adult: 200-300 wpm"] },
    howToUse: "Enter word count and reading speed.", faqs: [{ question: "What is average reading speed?", answer: "200-250 wpm for general reading, 100-150 for technical material." }],
    relatedCalcs: mathRelated("reading-time-calculator"),
  },
  {
    slug: "assignment-time-calculator", name: "Assignment Time Calculator", category: "Math", categorySlug: "math", subcategory: "Study & Academic Tools",
    description: "Estimate time needed to complete an assignment.", metaDescription: "Free assignment time estimator.", icon: "hash",
    inputs: [
      { id: "pages", label: "Pages to Write", type: "number", defaultValue: 5 },
      { id: "research", label: "Research Hours", type: "number", defaultValue: 3 },
      { id: "speed", label: "Writing Speed (pages/hr)", type: "number", defaultValue: 1, step: 0.5 },
    ],
    calculate: (v) => {
      const writing = v.speed > 0 ? v.pages / v.speed : 0;
      const editing = writing * 0.3;
      const total = v.research + writing + editing;
      return [
        { label: "Total Time", value: `${total.toFixed(1)} hours`, highlight: true },
        { label: "Research", value: `${v.research} hrs` },
        { label: "Writing", value: `${writing.toFixed(1)} hrs` },
        { label: "Editing (30%)", value: `${editing.toFixed(1)} hrs` },
      ];
    },
    formula: { expression: "Total = Research + Writing + Editing", variables: ["Editing ≈ 30% of writing time"] },
    howToUse: "Enter pages, research hours, and writing speed.", faqs: [{ question: "How fast can I write?", answer: "Average academic writing: 0.5-2 pages per hour depending on complexity." }],
    relatedCalcs: mathRelated("assignment-time-calculator"),
  },
  {
    slug: "course-load-calculator", name: "Course Load Calculator", category: "Math", categorySlug: "math", subcategory: "Study & Academic Tools",
    description: "Estimate your total weekly commitment based on course load.", metaDescription: "Free course load calculator.", icon: "hash",
    inputs: [
      { id: "credits", label: "Total Credit Hours", type: "number", defaultValue: 15 },
      { id: "classHrs", label: "Class Hours/Credit", type: "number", defaultValue: 1 },
      { id: "studyRatio", label: "Study Hours/Credit", type: "number", defaultValue: 2 },
    ],
    calculate: (v) => {
      const classTime = v.credits * v.classHrs;
      const studyTime = v.credits * v.studyRatio;
      const total = classTime + studyTime;
      return [
        { label: "Total Weekly Hours", value: `${total.toFixed(1)}`, highlight: true },
        { label: "Class Time", value: `${classTime.toFixed(1)} hrs` },
        { label: "Study Time", value: `${studyTime.toFixed(1)} hrs` },
        { label: "Load Level", value: total > 50 ? "Heavy" : total > 35 ? "Moderate" : "Light" },
      ];
    },
    formula: { expression: "Total = Credits × (Class + Study ratio)", variables: [] },
    howToUse: "Enter credit hours and time ratios.", faqs: [{ question: "What is full-time?", answer: "Typically 12-18 credit hours per semester." }],
    relatedCalcs: mathRelated("course-load-calculator"),
  },
  {
    slug: "exam-preparation-time-calculator", name: "Exam Preparation Time Calculator", category: "Math", categorySlug: "math", subcategory: "Study & Academic Tools",
    description: "Plan exam preparation time across multiple subjects.", metaDescription: "Free exam preparation time planner.", icon: "hash",
    inputs: [
      { id: "days", label: "Days Until Exam", type: "number", defaultValue: 14, min: 1 },
      { id: "subjects", label: "Number of Subjects", type: "number", defaultValue: 4 },
      { id: "hrsPerDay", label: "Study Hours/Day", type: "number", defaultValue: 6, step: 0.5 },
    ],
    calculate: (v) => {
      const total = v.days * v.hrsPerDay;
      const perSubject = v.subjects > 0 ? total / v.subjects : 0;
      return [
        { label: "Total Study Time", value: `${total} hours`, highlight: true },
        { label: "Per Subject", value: `${perSubject.toFixed(1)} hours` },
        { label: "Sessions (2hr blocks)", value: `${Math.ceil(total / 2)}` },
        { label: "Pomodoros (25 min)", value: `${Math.ceil(total * 60 / 25)}` },
      ];
    },
    formula: { expression: "Total = Days × Hours/Day", variables: [] },
    howToUse: "Enter days, subjects, and daily study hours.", faqs: [{ question: "How far in advance?", answer: "Start 2-4 weeks before major exams for best retention." }],
    relatedCalcs: mathRelated("exam-preparation-time-calculator"),
  },
  {
    slug: "homework-time-calculator", name: "Homework Time Calculator", category: "Math", categorySlug: "math", subcategory: "Study & Academic Tools",
    description: "Estimate weekly homework time based on assignments.", metaDescription: "Free homework time calculator.", icon: "hash",
    inputs: [
      { id: "assignments", label: "Assignments/Week", type: "number", defaultValue: 5 },
      { id: "avgTime", label: "Avg Hours/Assignment", type: "number", defaultValue: 1.5, step: 0.5 },
    ],
    calculate: (v) => {
      const total = v.assignments * v.avgTime;
      return [
        { label: "Weekly HW Time", value: `${total.toFixed(1)} hours`, highlight: true },
        { label: "Daily (5 days)", value: `${(total / 5).toFixed(1)} hrs` },
        { label: "Daily (7 days)", value: `${(total / 7).toFixed(1)} hrs` },
      ];
    },
    formula: { expression: "Total = Assignments × Avg Time", variables: [] },
    howToUse: "Enter assignments per week and average time each.", faqs: [{ question: "Tips for efficiency?", answer: "Use the Pomodoro technique: 25 min focused work, 5 min break." }],
    relatedCalcs: mathRelated("homework-time-calculator"),
  },
  {
    slug: "study-efficiency-calculator", name: "Study Efficiency Calculator", category: "Math", categorySlug: "math", subcategory: "Study & Academic Tools",
    description: "Measure study efficiency based on time spent and score achieved.", metaDescription: "Free study efficiency calculator.", icon: "hash",
    inputs: [
      { id: "hours", label: "Hours Studied", type: "number", defaultValue: 10 },
      { id: "score", label: "Score Achieved (%)", type: "number", defaultValue: 85 },
      { id: "maxScore", label: "Target Score (%)", type: "number", defaultValue: 100 },
    ],
    calculate: (v) => {
      const efficiency = v.hours > 0 ? v.score / v.hours : 0;
      const pctTarget = v.maxScore > 0 ? (v.score / v.maxScore) * 100 : 0;
      return [
        { label: "Points per Hour", value: efficiency.toFixed(2), highlight: true },
        { label: "Target Achievement", value: `${pctTarget.toFixed(1)}%` },
        { label: "Grade", value: v.score >= 90 ? "Excellent" : v.score >= 80 ? "Good" : v.score >= 70 ? "Adequate" : "Needs improvement" },
      ];
    },
    formula: { expression: "Efficiency = Score / Hours", variables: [] },
    howToUse: "Enter study hours and achieved score.", faqs: [{ question: "How to improve efficiency?", answer: "Active recall, spaced repetition, and eliminating distractions." }],
    relatedCalcs: mathRelated("study-efficiency-calculator"),
  },
  {
    slug: "learning-pace-calculator", name: "Learning Pace Calculator", category: "Math", categorySlug: "math", subcategory: "Study & Academic Tools",
    description: "Calculate your learning pace and estimate time to complete a course.", metaDescription: "Free learning pace calculator.", icon: "hash",
    inputs: [
      { id: "completed", label: "Modules Completed", type: "number", defaultValue: 12 },
      { id: "total", label: "Total Modules", type: "number", defaultValue: 40 },
      { id: "weeks", label: "Weeks Elapsed", type: "number", defaultValue: 4 },
    ],
    calculate: (v) => {
      const pace = v.weeks > 0 ? v.completed / v.weeks : 0;
      const remaining = v.total - v.completed;
      const weeksLeft = pace > 0 ? remaining / pace : Infinity;
      const pct = v.total > 0 ? (v.completed / v.total) * 100 : 0;
      return [
        { label: "Pace", value: `${pace.toFixed(1)} modules/week`, highlight: true },
        { label: "Progress", value: `${pct.toFixed(1)}%` },
        { label: "Remaining", value: `${remaining} modules` },
        { label: "Est. Weeks Left", value: weeksLeft < 100 ? `${weeksLeft.toFixed(1)}` : "N/A" },
      ];
    },
    formula: { expression: "Pace = Completed / Weeks", variables: ["ETA = Remaining / Pace"] },
    howToUse: "Enter completed modules, total, and weeks elapsed.", faqs: [{ question: "How to speed up?", answer: "Increase daily study time or focus on key concepts." }],
    relatedCalcs: mathRelated("learning-pace-calculator"),
  },
];
