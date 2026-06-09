import type { ScienceCalculatorConfig } from "./types";

const distanceUnits = [
  { label: "m", toBase: 1 },
  { label: "km", toBase: 1000 },
  { label: "cm", toBase: 0.01 },
  { label: "mi", toBase: 1609.344 },
  { label: "ft", toBase: 0.3048 },
];
const timeUnits = [
  { label: "s", toBase: 1 },
  { label: "min", toBase: 60 },
  { label: "h", toBase: 3600 },
];
const velocityUnits = [
  { label: "m/s", toBase: 1 },
  { label: "km/h", toBase: 1 / 3.6 },
  { label: "mph", toBase: 0.44704 },
  { label: "ft/s", toBase: 0.3048 },
];

export const velocityConfig: ScienceCalculatorConfig = {
  slug: "velocity-calculator",
  categorySlug: "science",
  subCategory: "Physics",
  title: "Velocity Calculator",
  shortDescription:
    "Calculate velocity, distance, or time using v = d ÷ t. Solve for any variable, switch units instantly, and see step-by-step working.",
  metaTitle: "Velocity Calculator — Solve for v, d, or t (m/s, km/h, mph)",
  metaDescription:
    "Free online velocity calculator. Solve for velocity, distance, or time using v = d ÷ t with full unit support (m/s, km/h, mph, ft/s) and step-by-step solutions.",
  keywords:
    "velocity calculator, speed calculator, v = d/t, distance time velocity, m/s, km/h, mph",
  formulaPreview: "v = d ÷ t",
  variables: [
    {
      key: "v",
      label: "Velocity",
      symbol: "v",
      baseUnit: "m/s",
      units: velocityUnits,
      placeholder: "e.g. 25",
      smartHint: "Average velocity over the time interval.",
      defaultValue: 25,
    },
    {
      key: "d",
      label: "Distance",
      symbol: "d",
      baseUnit: "m",
      units: distanceUnits,
      placeholder: "e.g. 100",
      smartHint: "Total distance traveled.",
      defaultValue: 100,
    },
    {
      key: "t",
      label: "Time",
      symbol: "t",
      baseUnit: "s",
      units: timeUnits,
      placeholder: "e.g. 20",
      smartHint: "Time taken to cover the distance.",
      defaultValue: 20,
    },
  ],
  solveFor: ["v", "d", "t"],
  defaultTarget: "v",
  resultUnit: { v: "m/s", d: "m", t: "s" },
  solve: (target, b, u) => {
    if (target === "v") {
      const value = b.d / b.t;
      return {
        value,
        unit: "m/s",
        formula: "v = d ÷ t",
        steps: [
          { line: `Distance (d) = ${b.d} m` },
          { line: `Time (t) = ${b.t} s` },
          { line: `v = d ÷ t` },
          { line: `v = ${b.d} ÷ ${b.t}` },
          { line: `v = ${value.toFixed(4)} m/s`, note: "Final velocity in SI units." },
        ],
      };
    }
    if (target === "d") {
      const value = b.v * b.t;
      return {
        value,
        unit: "m",
        formula: "d = v × t",
        steps: [
          { line: `Velocity (v) = ${b.v} m/s` },
          { line: `Time (t) = ${b.t} s` },
          { line: `d = v × t` },
          { line: `d = ${b.v} × ${b.t}` },
          { line: `d = ${value.toFixed(4)} m` },
        ],
      };
    }
    const value = b.d / b.v;
    return {
      value,
      unit: "s",
      formula: "t = d ÷ v",
      steps: [
        { line: `Distance (d) = ${b.d} m` },
        { line: `Velocity (v) = ${b.v} m/s` },
        { line: `t = d ÷ v` },
        { line: `t = ${b.d} ÷ ${b.v}` },
        { line: `t = ${value.toFixed(4)} s` },
      ],
    };
  },
  chart: {
    xKey: "t",
    yKey: "d",
    title: "Distance vs Time",
    xLabel: "Time (s)",
    yLabel: "Distance (m)",
  },
  explanation: {
    formula: "v = d / t",
    variables: [
      { symbol: "v", name: "Velocity", unit: "m/s", description: "Rate of change of position." },
      { symbol: "d", name: "Distance", unit: "m", description: "Total path length traveled." },
      { symbol: "t", name: "Time", unit: "s", description: "Duration of travel." },
    ],
    description:
      "Velocity is the distance traveled per unit of time in a specific direction. In its simplest form, average velocity equals total distance divided by total time. Use this calculator when motion is in a straight line and you only need the magnitude (speed) of velocity.",
    applications: [
      "Calculating average driving speed for a trip",
      "Physics homework involving uniform motion",
      "Sports analytics — runner, cyclist, ball speed",
      "Engineering: belt and conveyor speed checks",
    ],
    commonMistakes: [
      "Mixing units — make sure distance and time are in compatible units.",
      "Confusing average velocity with instantaneous velocity.",
      "Forgetting that velocity is a vector — this calculator returns magnitude.",
    ],
  },
  examples: [
    {
      title: "Road trip average speed",
      scenario: "A car travels 150 km in 3 hours.",
      steps: ["d = 150 km = 150,000 m", "t = 3 h = 10,800 s", "v = 150,000 ÷ 10,800"],
      answer: "v ≈ 13.89 m/s (50 km/h)",
    },
    {
      title: "Sprinter time",
      scenario: "A sprinter runs at 10 m/s. How long to cover 100 m?",
      steps: ["v = 10 m/s, d = 100 m", "t = d ÷ v = 100 ÷ 10"],
      answer: "t = 10 s",
    },
    {
      title: "Distance from speed",
      scenario: "A drone flies at 15 m/s for 4 minutes.",
      steps: ["v = 15 m/s, t = 240 s", "d = v × t = 15 × 240"],
      answer: "d = 3,600 m (3.6 km)",
    },
  ],
  faqs: [
    { q: "What is the formula for velocity?", a: "Average velocity equals distance divided by time: v = d ÷ t." },
    { q: "Is velocity the same as speed?", a: "Speed is the magnitude only; velocity is speed plus direction. For straight-line motion the numeric value is identical." },
    { q: "What units does the calculator support?", a: "Distance: m, km, cm, mi, ft. Time: s, min, h. Velocity: m/s, km/h, mph, ft/s." },
    { q: "How do I convert km/h to m/s?", a: "Divide by 3.6. For example, 72 km/h ÷ 3.6 = 20 m/s." },
    { q: "What's the difference between average and instantaneous velocity?", a: "Average velocity uses total distance over total time. Instantaneous velocity is the derivative of position at a single instant." },
    { q: "Can I solve for time?", a: "Yes — switch the Solve For dropdown to Time and enter distance and velocity." },
    { q: "Does direction matter?", a: "For 1D motion this calculator returns magnitude. For 2D/3D motion you need vector components." },
    { q: "What if my velocity changes?", a: "This is the average-velocity formula. For changing velocity use the Acceleration Calculator with v_f = v_i + at." },
    { q: "Why is my result in m/s and not km/h?", a: "Internally the solver works in SI units. The selected unit is shown in the input; the displayed result uses the standard unit for the variable." },
  ],
  related: [
    { label: "Speed Calculator", href: "/science/velocity-calculator" },
    { label: "Distance Calculator", href: "/science/velocity-calculator" },
    { label: "Acceleration Calculator", href: "/science/acceleration-calculator" },
    { label: "Kinetic Energy Calculator", href: "/science/kinetic-energy-calculator" },
  ],
  seoContent: `## What is velocity?

Velocity is a vector quantity that describes how fast an object is moving and in what direction. In everyday conversation people often use the words "velocity" and "speed" interchangeably, but in physics they're different: speed is a scalar that only tells you how fast, while velocity also tells you which way. When motion is along a single straight line, the magnitude of velocity equals the speed, which is what this calculator computes.

## How the velocity formula works

The basic formula for average velocity is simple: divide the total distance traveled by the time it took. In symbols, v = d ÷ t. The calculator above lets you rearrange this equation to solve for any of the three variables. Pick what you want to solve for from the **Solve For** dropdown and the input fields update automatically. Internally every value is converted to SI base units (meters and seconds) before the calculation runs, so you can freely mix km with hours or miles with minutes without worrying about manual conversion.

## Real-world uses

Velocity calculations show up in nearly every branch of physics and engineering. Drivers use them to estimate trip times, athletes use them to track training pace, and engineers use them to size motors, belts, and conveyors. Astronomers use the same underlying equation (extended with calculus) to compute orbital speeds. Even simple GPS apps compute velocity by sampling position over short time intervals and dividing.

## Common mistakes to avoid

The most frequent mistake is mixing incompatible units — for example dividing kilometers by seconds and forgetting to convert. Another common error is confusing average velocity with instantaneous velocity: the formula v = d ÷ t only gives an average over the whole interval. If acceleration is non-zero, the instantaneous velocity at any given moment can be very different. Finally, remember that velocity is technically a vector; this calculator returns magnitude, which is fine for 1D motion but insufficient when you need direction.

## Unit conversions cheat sheet

- 1 m/s = 3.6 km/h
- 1 km/h ≈ 0.2778 m/s
- 1 mph ≈ 0.447 m/s ≈ 1.609 km/h
- 1 ft/s ≈ 0.3048 m/s

## Worked example

A train covers 240 km in 2 hours. To find its average velocity, convert 240 km to 240,000 m and 2 h to 7,200 s, then divide: 240,000 ÷ 7,200 ≈ 33.33 m/s, or 120 km/h. That's the answer for the whole trip; the actual speed at any instant could be higher or lower.`,
};
