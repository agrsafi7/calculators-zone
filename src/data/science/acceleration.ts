import type { ScienceCalculatorConfig } from "./types";

const velocityUnits = [
  { label: "m/s", toBase: 1 },
  { label: "km/h", toBase: 1 / 3.6 },
  { label: "mph", toBase: 0.44704 },
  { label: "ft/s", toBase: 0.3048 },
];
const timeUnits = [
  { label: "s", toBase: 1 },
  { label: "min", toBase: 60 },
  { label: "h", toBase: 3600 },
];
const accelUnits = [
  { label: "m/s²", toBase: 1 },
  { label: "ft/s²", toBase: 0.3048 },
  { label: "g", toBase: 9.80665 },
];

export const accelerationConfig: ScienceCalculatorConfig = {
  slug: "acceleration-calculator",
  categorySlug: "science",
  subCategory: "Physics",
  title: "Acceleration Calculator",
  shortDescription:
    "Calculate acceleration, initial/final velocity, or time using a = (v_f − v_i) ÷ t. Solve for any variable with step-by-step working.",
  metaTitle: "Acceleration Calculator — Solve a = (vf − vi) / t",
  metaDescription:
    "Free acceleration calculator. Solve for acceleration, initial velocity, final velocity, or time. Supports m/s², ft/s², and g with step-by-step working.",
  keywords: "acceleration calculator, a = dv/dt, m/s², deceleration calculator, kinematics",
  formulaPreview: "a = (vf − vi) ÷ t",
  variables: [
    { key: "a", label: "Acceleration", symbol: "a", baseUnit: "m/s²", units: accelUnits, defaultValue: 2, placeholder: "e.g. 2" },
    { key: "vi", label: "Initial Velocity", symbol: "vᵢ", baseUnit: "m/s", units: velocityUnits, defaultValue: 0, placeholder: "e.g. 0" },
    { key: "vf", label: "Final Velocity", symbol: "vf", baseUnit: "m/s", units: velocityUnits, defaultValue: 20, placeholder: "e.g. 20" },
    { key: "t", label: "Time", symbol: "t", baseUnit: "s", units: timeUnits, defaultValue: 10, placeholder: "e.g. 10" },
  ],
  solveFor: ["a", "vf", "vi", "t"],
  defaultTarget: "a",
  resultUnit: { a: "m/s²", vf: "m/s", vi: "m/s", t: "s" },
  solve: (target, b) => {
    if (target === "a") {
      const value = (b.vf - b.vi) / b.t;
      return {
        value, unit: "m/s²", formula: "a = (vf − vi) ÷ t",
        steps: [
          { line: `vi = ${b.vi} m/s, vf = ${b.vf} m/s, t = ${b.t} s` },
          { line: `a = (vf − vi) ÷ t` },
          { line: `a = (${b.vf} − ${b.vi}) ÷ ${b.t}` },
          { line: `a = ${value.toFixed(4)} m/s²` },
        ],
      };
    }
    if (target === "vf") {
      const value = b.vi + b.a * b.t;
      return {
        value, unit: "m/s", formula: "vf = vi + a × t",
        steps: [
          { line: `vi = ${b.vi} m/s, a = ${b.a} m/s², t = ${b.t} s` },
          { line: `vf = vi + a × t` },
          { line: `vf = ${b.vi} + ${b.a} × ${b.t}` },
          { line: `vf = ${value.toFixed(4)} m/s` },
        ],
      };
    }
    if (target === "vi") {
      const value = b.vf - b.a * b.t;
      return {
        value, unit: "m/s", formula: "vi = vf − a × t",
        steps: [
          { line: `vf = ${b.vf} m/s, a = ${b.a} m/s², t = ${b.t} s` },
          { line: `vi = vf − a × t` },
          { line: `vi = ${b.vf} − ${b.a} × ${b.t}` },
          { line: `vi = ${value.toFixed(4)} m/s` },
        ],
      };
    }
    const value = (b.vf - b.vi) / b.a;
    return {
      value, unit: "s", formula: "t = (vf − vi) ÷ a",
      steps: [
        { line: `vi = ${b.vi} m/s, vf = ${b.vf} m/s, a = ${b.a} m/s²` },
        { line: `t = (vf − vi) ÷ a` },
        { line: `t = (${b.vf} − ${b.vi}) ÷ ${b.a}` },
        { line: `t = ${value.toFixed(4)} s` },
      ],
    };
  },
  chart: {
    xKey: "t", yKey: "vf", title: "Final Velocity vs Time", xLabel: "Time (s)", yLabel: "Velocity (m/s)",
  },
  explanation: {
    formula: "a = (vf − vi) / t",
    variables: [
      { symbol: "a", name: "Acceleration", unit: "m/s²", description: "Rate of change of velocity." },
      { symbol: "vᵢ", name: "Initial Velocity", unit: "m/s", description: "Velocity at the start of the interval." },
      { symbol: "vf", name: "Final Velocity", unit: "m/s", description: "Velocity at the end of the interval." },
      { symbol: "t", name: "Time", unit: "s", description: "Length of the time interval." },
    ],
    description:
      "Acceleration measures how quickly velocity changes. Positive values mean speeding up in the direction of motion; negative values (deceleration) mean slowing down. Earth's gravity gives roughly 9.81 m/s² of free-fall acceleration.",
    applications: [
      "Vehicle 0–60 mph performance",
      "Free-fall and projectile motion",
      "Roller-coaster and ride engineering",
      "Aerospace launch and re-entry profiles",
    ],
    commonMistakes: [
      "Forgetting the sign — deceleration is just negative acceleration.",
      "Using inconsistent units between vi, vf and t.",
      "Assuming constant acceleration when it's actually changing.",
    ],
  },
  examples: [
    { title: "Car from 20 to 40 m/s", scenario: "A car accelerates from 20 m/s to 40 m/s in 5 s.", steps: ["a = (40 − 20) ÷ 5"], answer: "a = 4 m/s²" },
    { title: "Free fall", scenario: "Object dropped, final velocity after 3 s.", steps: ["vi = 0, a = 9.81 m/s², t = 3 s", "vf = 0 + 9.81 × 3"], answer: "vf ≈ 29.43 m/s" },
    { title: "Braking distance time", scenario: "Car decelerates at 5 m/s² from 25 m/s to stop.", steps: ["t = (0 − 25) ÷ −5"], answer: "t = 5 s" },
  ],
  faqs: [
    { q: "What is acceleration?", a: "Acceleration is the rate of change of velocity with respect to time, measured in m/s²." },
    { q: "Is deceleration negative acceleration?", a: "Yes — when an object slows down, acceleration points opposite to motion and is treated as negative." },
    { q: "What is 1 g of acceleration?", a: "1 g equals Earth's gravitational acceleration, about 9.80665 m/s²." },
    { q: "How do I calculate 0–60 mph time?", a: "Convert 60 mph to 26.82 m/s, then divide by acceleration. At 5 m/s² it takes about 5.36 s." },
    { q: "What if acceleration isn't constant?", a: "This formula assumes constant acceleration. For variable acceleration use calculus: a = dv/dt." },
    { q: "Can acceleration be zero?", a: "Yes — when velocity is constant, acceleration is zero (Newton's first law)." },
    { q: "How does this differ from v² = u² + 2as?", a: "That kinematic equation lets you skip time if you know distance. This calculator uses the time-based form." },
    { q: "What units are supported?", a: "Velocity: m/s, km/h, mph, ft/s. Time: s, min, h. Acceleration: m/s², ft/s², g." },
    { q: "Does direction matter?", a: "Yes — acceleration is a vector. Use signed values for 1D problems." },
  ],
  related: [
    { label: "Velocity Calculator", href: "/science/velocity-calculator" },
    { label: "Force Calculator", href: "/science/acceleration-calculator" },
    { label: "Kinetic Energy Calculator", href: "/science/kinetic-energy-calculator" },
  ],
  seoContent: `## Understanding acceleration

Acceleration is one of the most important concepts in classical mechanics. It tells you how quickly the velocity of an object is changing — both in magnitude and in direction. When you press the gas pedal in a car, you experience positive acceleration; press the brake and you feel negative acceleration (deceleration). Free-falling objects accelerate downward at roughly 9.81 m/s² due to Earth's gravity, a value often abbreviated as 1 g.

## How to use this calculator

Use the **Solve For** dropdown to choose what you want to find: acceleration, initial velocity, final velocity, or time. The input fields update to match. Enter the known values in any supported units; the calculator converts to SI base units behind the scenes, runs the math, and shows step-by-step working so you can check (or learn) the algebra.

## Where acceleration appears

Engineers use acceleration calculations everywhere — from designing cars (0–60 times), roller coasters (safe g-forces), and elevators (passenger comfort) to launching rockets and analyzing crash data. In physics homework, this formula is usually the first kinematic equation you learn, before moving on to displacement equations like s = vit + ½at² and v² = u² + 2as.

## Common pitfalls

Watch the signs. A 30 m/s car braking to 0 m/s in 5 seconds has an acceleration of (0 − 30) ÷ 5 = −6 m/s². The negative sign means the acceleration vector opposes the motion. Also be careful with unit consistency: it's safer to convert km/h to m/s before doing the math than to try mixing units. Finally, this formula assumes constant acceleration — if acceleration changes over the interval, the answer is only an average.`,
};
