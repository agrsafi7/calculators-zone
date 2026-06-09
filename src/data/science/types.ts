// Reusable Science Calculator config types.

export interface Unit {
  /** Display label, e.g. "m/s" */
  label: string;
  /** Factor to convert FROM this unit TO the variable's base unit. */
  toBase: number;
}

export interface Variable {
  /** Stable key used in formulas, e.g. "d" or "t". */
  key: string;
  /** Human label, e.g. "Distance". */
  label: string;
  /** Math symbol, e.g. "d". */
  symbol: string;
  /** Base unit used by the solver, e.g. "m". */
  baseUnit: string;
  /** Available units. First entry is treated as the default. */
  units: Unit[];
  /** Placeholder text. */
  placeholder?: string;
  /** Helpful smart hint shown under the input. */
  smartHint?: string;
  /** Default unit label (must match a units[].label). Falls back to units[0]. */
  defaultUnit?: string;
  /** Optional default numeric value, in the default unit. */
  defaultValue?: number;
}

export interface SolveStep {
  /** Plain-text math line, e.g. "v = d / t". */
  line: string;
  /** Optional explanation underneath. */
  note?: string;
}

export interface SolveResult {
  /** Numeric value in `unit`. */
  value: number;
  /** Display unit label. */
  unit: string;
  /** Step-by-step solution. */
  steps: SolveStep[];
  /** Formula used, plain text, e.g. "v = d ÷ t". */
  formula: string;
}

export interface ChartConfig {
  /** Variable key on the X axis (independent). */
  xKey: string;
  /** Variable key on the Y axis (computed). */
  yKey: string;
  /** Chart title. */
  title: string;
  /** Axis labels. */
  xLabel: string;
  yLabel: string;
}

export interface WorkedExample {
  title: string;
  scenario: string;
  steps: string[];
  answer: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface RelatedCalc {
  label: string;
  href: string;
}

export interface FormulaExplanation {
  /** Pretty formula, plain text. */
  formula: string;
  /** Each variable: symbol, name, units, definition. */
  variables: { symbol: string; name: string; unit: string; description: string }[];
  /** 1–3 paragraph description. */
  description: string;
  /** Real-world applications. */
  applications: string[];
  /** Common mistakes to avoid. */
  commonMistakes?: string[];
}

export interface ScienceCalculatorConfig {
  slug: string;            // e.g. "velocity-calculator"
  categorySlug: string;    // "science"
  subCategory: string;     // e.g. "Physics"
  title: string;           // H1, e.g. "Velocity Calculator"
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  formulaPreview: string;  // pretty, e.g. "v = d ÷ t"
  variables: Variable[];
  /** Variable keys the user is allowed to solve for. */
  solveFor: string[];
  /** Default target. */
  defaultTarget: string;
  /** Pure solver — values are in BASE units. Returns value in base unit too. */
  solve: (
    target: string,
    valuesBase: Record<string, number>,
    /** Unit labels chosen for each variable (for nicer step text). */
    chosenUnits: Record<string, string>,
  ) => SolveResult;
  /** Pretty unit label to show for the result, per target. */
  resultUnit: Record<string, string>;
  chart?: ChartConfig;
  explanation: FormulaExplanation;
  examples: WorkedExample[];
  faqs: Faq[];
  related: RelatedCalc[];
  /** Long-form SEO copy as markdown-lite (paragraphs separated by \n\n). */
  seoContent: string;
}
