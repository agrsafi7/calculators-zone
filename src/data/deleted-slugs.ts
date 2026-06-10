// Calculators removed during the Phase 2 pruning pass.
// These slugs are filtered from listings/search/sitemap and 301-redirect
// to their category page (see vercel.json + GenericCalculatorPage).

export const DELETED_REDIRECTS: Record<string, string> = {
  // science → /category/science
  "specific-heat-calculator": "science",
  "thermal-expansion-calculator": "science",
  "heat-transfer-calculator": "science",
  "capacitance-calculator": "science",
  "inductance-calculator": "science",
  "lens-calculator": "science",
  "doppler-effect-calculator": "science",
  "orbital-velocity-calculator": "science",
  "escape-velocity-calculator": "science",
  "gravitational-force-calculator": "science",
  "light-year-calculator": "science",
  "dilution-calculator": "science",
  "stoichiometry-calculator": "science",
  "electrochemistry-calculator": "science",
  "radioactive-decay-calculator": "science",
  "nuclear-binding-energy-calculator": "science",
  "reynolds-number-calculator": "science",
  "earthquake-magnitude-calculator": "science",
  "atmospheric-pressure-calculator": "science",
  "wavelength-calculator": "science",
  // conversions → /category/conversions
  "torque-converter-eng": "conversions",
  "power-converter-eng": "conversions",
  "acceleration-converter-eng": "conversions",
  "angular-velocity-converter": "conversions",
  "angular-acceleration-converter": "conversions",
  "moment-of-inertia-converter": "conversions",
  "mass-moment-of-inertia-converter": "conversions",
  "capacitance-converter": "conversions",
  "inductance-converter": "conversions",
  "thermal-expansion-converter": "conversions",
  "specific-heat-capacity-converter": "conversions",
  "heat-transfer-coefficient-converter": "conversions",
  "astronomical-distance-converter": "conversions",
  "light-year-converter": "conversions",
  "parsec-converter": "conversions",
  "orbital-speed-converter": "conversions",
  "yarn-count-converter": "conversions",
  // math → /category/math
  "chi-square-calculator": "math",
  "binomial-distribution-calculator": "math",
  "poisson-distribution-calculator": "math",
  "geometric-distribution-calculator": "math",
  // other → /category/other
  "yarn-calculator": "other",
  "aquarium-volume-calculator": "other",
  "candle-making-calculator": "other",
  "knitting-gauge-calculator": "other",
  // lifestyle → /category/lifestyle
  "love-calculator": "lifestyle",
  "compatibility-calculator": "lifestyle",
};

export const DELETED_SLUGS: Set<string> = new Set(Object.keys(DELETED_REDIRECTS));
