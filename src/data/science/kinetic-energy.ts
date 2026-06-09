import type { ScienceCalculatorConfig } from "./types";

const massUnits = [
  { label: "kg", toBase: 1 },
  { label: "g", toBase: 0.001 },
  { label: "lb", toBase: 0.45359237 },
  { label: "t", toBase: 1000 },
];
const velocityUnits = [
  { label: "m/s", toBase: 1 },
  { label: "km/h", toBase: 1 / 3.6 },
  { label: "mph", toBase: 0.44704 },
  { label: "ft/s", toBase: 0.3048 },
];
const energyUnits = [
  { label: "J", toBase: 1 },
  { label: "kJ", toBase: 1000 },
  { label: "cal", toBase: 4.184 },
  { label: "kcal", toBase: 4184 },
];

export const kineticEnergyConfig: ScienceCalculatorConfig = {
  slug: "kinetic-energy-calculator",
  categorySlug: "science",
  subCategory: "Physics",
  title: "Kinetic Energy Calculator",
  shortDescription:
    "Calculate kinetic energy, mass, or velocity using KE = ½ m v². Solve for any variable with units in kg, g, lb, m/s, km/h and more.",
  metaTitle: "Kinetic Energy Calculator — KE = ½ m v² (Joules)",
  metaDescription:
    "Free kinetic energy calculator. Solve for KE, mass, or velocity with the formula KE = ½ m v². Multiple units, step-by-step working.",
  keywords: "kinetic energy calculator, KE formula, ½mv², joules, mass velocity energy",
  formulaPreview: "KE = ½ × m × v²",
  variables: [
    { key: "KE", label: "Kinetic Energy", symbol: "KE", baseUnit: "J", units: energyUnits, defaultValue: 5000, placeholder: "e.g. 5000" },
    { key: "m", label: "Mass", symbol: "m", baseUnit: "kg", units: massUnits, defaultValue: 10, placeholder: "e.g. 10" },
    { key: "v", label: "Velocity", symbol: "v", baseUnit: "m/s", units: velocityUnits, defaultValue: 20, placeholder: "e.g. 20" },
  ],
  solveFor: ["KE", "m", "v"],
  defaultTarget: "KE",
  resultUnit: { KE: "J", m: "kg", v: "m/s" },
  solve: (target, b) => {
    if (target === "KE") {
      const value = 0.5 * b.m * b.v * b.v;
      return {
        value, unit: "J", formula: "KE = ½ × m × v²",
        steps: [
          { line: `m = ${b.m} kg, v = ${b.v} m/s` },
          { line: `KE = ½ × m × v²` },
          { line: `KE = 0.5 × ${b.m} × ${b.v}²` },
          { line: `KE = 0.5 × ${b.m} × ${(b.v * b.v).toFixed(4)}` },
          { line: `KE = ${value.toFixed(4)} J` },
        ],
      };
    }
    if (target === "m") {
      const value = (2 * b.KE) / (b.v * b.v);
      return {
        value, unit: "kg", formula: "m = 2 × KE ÷ v²",
        steps: [
          { line: `KE = ${b.KE} J, v = ${b.v} m/s` },
          { line: `m = 2 × KE ÷ v²` },
          { line: `m = 2 × ${b.KE} ÷ ${(b.v * b.v).toFixed(4)}` },
          { line: `m = ${value.toFixed(4)} kg` },
        ],
      };
    }
    const value = Math.sqrt((2 * b.KE) / b.m);
    return {
      value, unit: "m/s", formula: "v = √(2 × KE ÷ m)",
      steps: [
        { line: `KE = ${b.KE} J, m = ${b.m} kg` },
        { line: `v = √(2 × KE ÷ m)` },
        { line: `v = √(2 × ${b.KE} ÷ ${b.m})` },
        { line: `v = ${value.toFixed(4)} m/s` },
      ],
    };
  },
  chart: {
    xKey: "m", yKey: "KE", title: "Kinetic Energy vs Mass", xLabel: "Mass (kg)", yLabel: "KE (J)",
  },
  explanation: {
    formula: "KE = ½ m v²",
    variables: [
      { symbol: "KE", name: "Kinetic Energy", unit: "J", description: "Energy of motion." },
      { symbol: "m", name: "Mass", unit: "kg", description: "Inertial mass of the object." },
      { symbol: "v", name: "Velocity", unit: "m/s", description: "Magnitude of velocity." },
    ],
    description:
      "Kinetic energy is the energy an object possesses due to its motion. It scales linearly with mass and with the square of velocity, which is why doubling speed quadruples kinetic energy — a key fact in vehicle safety.",
    applications: [
      "Vehicle crash energy estimation",
      "Ballistics and firearm muzzle energy",
      "Wind-turbine power calculations",
      "Sports impact analysis",
    ],
    commonMistakes: [
      "Forgetting to square the velocity.",
      "Using grams instead of kilograms.",
      "Mixing km/h with m/s without conversion.",
    ],
  },
  examples: [
    { title: "Running person", scenario: "A 70 kg person runs at 5 m/s.", steps: ["KE = 0.5 × 70 × 5²", "KE = 0.5 × 70 × 25"], answer: "KE = 875 J" },
    { title: "Car at highway speed", scenario: "A 1200 kg car moving at 30 m/s.", steps: ["KE = 0.5 × 1200 × 900"], answer: "KE = 540,000 J (540 kJ)" },
    { title: "Speed from energy", scenario: "A 2 kg ball has 100 J of KE. Find v.", steps: ["v = √(2 × 100 ÷ 2)"], answer: "v = 10 m/s" },
  ],
  faqs: [
    { q: "What is kinetic energy?", a: "Kinetic energy is the energy an object has because of its motion, calculated as ½ × mass × velocity²." },
    { q: "Why is velocity squared in the formula?", a: "Because kinetic energy depends on the work needed to accelerate the object — work scales with v² mathematically (W = ∫F·ds with constant acceleration)." },
    { q: "What units does KE use?", a: "The SI unit is the joule (J). 1 J = 1 kg·m²/s². Calories and kcal are also supported here." },
    { q: "Doubling speed: what happens to KE?", a: "It quadruples. A car at 60 mph has 4× the kinetic energy of the same car at 30 mph — that's why high-speed crashes are so much more dangerous." },
    { q: "Can kinetic energy be negative?", a: "No. Mass is positive and v² is always non-negative, so KE ≥ 0." },
    { q: "How is KE related to momentum?", a: "Both depend on m and v, but momentum p = mv is linear in v while KE = ½mv² is quadratic." },
    { q: "What's relativistic kinetic energy?", a: "At speeds close to light, KE = (γ − 1)mc². For everyday speeds the classical formula is accurate." },
    { q: "How do I convert km/h before using this?", a: "Divide by 3.6 to get m/s, or just pick km/h in the unit selector and the calculator does it for you." },
  ],
  related: [
    { label: "Velocity Calculator", href: "/science/velocity-calculator" },
    { label: "Acceleration Calculator", href: "/science/acceleration-calculator" },
    { label: "Density Calculator", href: "/science/density-calculator" },
  ],
  seoContent: `## What is kinetic energy?

Kinetic energy (KE) is the energy a body has because it is moving. Stop the body and that energy has to go somewhere — into heat, sound, deformation, or work done on another object. The formula KE = ½ m v² captures this for non-relativistic speeds and is one of the cornerstones of classical mechanics.

## Why v² matters

The squared term has huge practical consequences. Doubling the speed of an object quadruples its kinetic energy, which is why a car at 100 km/h carries four times the destructive energy of the same car at 50 km/h. The same principle is why wind turbines produce dramatically more power on windy days — wind power scales with v³ because mass flow itself depends on v.

## Choosing the right units

The SI unit of energy is the joule (J), defined as 1 kg·m²/s². For larger numbers people use kilojoules (kJ) or even megajoules. In nutrition, the kilocalorie (kcal) is common — 1 kcal ≈ 4,184 J. Our calculator converts automatically, so you can mix and match input units without doing the arithmetic by hand.

## Worked example

Suppose you want to know how much energy a 1,500 kg car carries at 80 km/h. First convert 80 km/h to m/s by dividing by 3.6, giving 22.22 m/s. Then KE = 0.5 × 1500 × 22.22² ≈ 370,400 J, or 370 kJ. That's roughly the energy released by burning 9 g of gasoline — and it has to be dissipated by the brakes (as heat) every time the car comes to a stop.`,
};
