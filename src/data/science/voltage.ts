import type { ScienceCalculatorConfig } from "./types";

const voltUnits = [
  { label: "V", toBase: 1 },
  { label: "mV", toBase: 0.001 },
  { label: "kV", toBase: 1000 },
];
const currentUnits = [
  { label: "A", toBase: 1 },
  { label: "mA", toBase: 0.001 },
  { label: "μA", toBase: 0.000001 },
];
const resistanceUnits = [
  { label: "Ω", toBase: 1 },
  { label: "kΩ", toBase: 1000 },
  { label: "MΩ", toBase: 1_000_000 },
];

export const voltageConfig: ScienceCalculatorConfig = {
  slug: "voltage-calculator",
  categorySlug: "science",
  subCategory: "Electricity",
  title: "Voltage Calculator (Ohm's Law)",
  shortDescription:
    "Calculate voltage, current, or resistance using Ohm's law V = I × R. Switch between V/mV/kV, A/mA/μA, Ω/kΩ/MΩ with one click.",
  metaTitle: "Voltage Calculator — Ohm's Law V = I × R",
  metaDescription:
    "Free Ohm's law calculator. Solve for voltage (V), current (I), or resistance (R) with full unit support and step-by-step working.",
  keywords: "voltage calculator, ohms law calculator, V = IR, current resistance, electrical calculator",
  formulaPreview: "V = I × R",
  variables: [
    { key: "V", label: "Voltage", symbol: "V", baseUnit: "V", units: voltUnits, defaultValue: 12, placeholder: "e.g. 12" },
    { key: "I", label: "Current", symbol: "I", baseUnit: "A", units: currentUnits, defaultValue: 2, placeholder: "e.g. 2" },
    { key: "R", label: "Resistance", symbol: "R", baseUnit: "Ω", units: resistanceUnits, defaultValue: 6, placeholder: "e.g. 6" },
  ],
  solveFor: ["V", "I", "R"],
  defaultTarget: "V",
  resultUnit: { V: "V", I: "A", R: "Ω" },
  solve: (target, b) => {
    if (target === "V") {
      const value = b.I * b.R;
      return {
        value, unit: "V", formula: "V = I × R",
        steps: [
          { line: `I = ${b.I} A, R = ${b.R} Ω` },
          { line: `V = I × R = ${b.I} × ${b.R}` },
          { line: `V = ${value.toFixed(4)} V` },
        ],
      };
    }
    if (target === "I") {
      const value = b.V / b.R;
      return {
        value, unit: "A", formula: "I = V ÷ R",
        steps: [
          { line: `V = ${b.V} V, R = ${b.R} Ω` },
          { line: `I = V ÷ R = ${b.V} ÷ ${b.R}` },
          { line: `I = ${value.toFixed(6)} A` },
        ],
      };
    }
    const value = b.V / b.I;
    return {
      value, unit: "Ω", formula: "R = V ÷ I",
      steps: [
        { line: `V = ${b.V} V, I = ${b.I} A` },
        { line: `R = V ÷ I = ${b.V} ÷ ${b.I}` },
        { line: `R = ${value.toFixed(4)} Ω` },
      ],
    };
  },
  chart: {
    xKey: "I", yKey: "V", title: "Voltage vs Current (linear, V = IR)", xLabel: "Current (A)", yLabel: "Voltage (V)",
  },
  explanation: {
    formula: "V = I × R",
    variables: [
      { symbol: "V", name: "Voltage", unit: "V (volt)", description: "Electric potential difference." },
      { symbol: "I", name: "Current", unit: "A (ampere)", description: "Rate of charge flow." },
      { symbol: "R", name: "Resistance", unit: "Ω (ohm)", description: "Opposition to current flow." },
    ],
    description:
      "Ohm's law is the fundamental relationship in electrical circuits: voltage equals current multiplied by resistance. It applies to any ohmic component — most resistors, wires, and many sensors. Non-ohmic devices like diodes need more advanced models.",
    applications: [
      "Sizing pull-up/pull-down resistors",
      "LED current limiting",
      "Battery and power supply design",
      "Voltage divider calculations",
    ],
    commonMistakes: [
      "Mixing mA with V — convert to base SI units first.",
      "Applying Ohm's law to non-ohmic components like diodes.",
      "Forgetting that real wires also have resistance for high currents.",
    ],
  },
  examples: [
    { title: "Find voltage", scenario: "2 A flows through a 6 Ω resistor.", steps: ["V = 2 × 6"], answer: "V = 12 V" },
    { title: "Find current", scenario: "9 V battery, 330 Ω resistor.", steps: ["I = 9 ÷ 330"], answer: "I ≈ 27.3 mA" },
    { title: "Find resistance", scenario: "5 V across 0.1 A current.", steps: ["R = 5 ÷ 0.1"], answer: "R = 50 Ω" },
  ],
  faqs: [
    { q: "What is Ohm's law?", a: "Ohm's law states that voltage across a conductor is proportional to the current through it: V = I × R." },
    { q: "What is the unit of voltage?", a: "The volt (V), equal to one joule per coulomb." },
    { q: "Can I solve for current?", a: "Yes — pick Current in the Solve For dropdown and enter voltage and resistance." },
    { q: "Does Ohm's law apply to AC circuits?", a: "It applies in instantaneous form. For AC analysis you usually use impedance Z instead of plain resistance R." },
    { q: "How do I size an LED resistor?", a: "Use R = (Vsupply − Vled) ÷ Iled. For a 5 V supply, 2 V LED, 20 mA: R = (5 − 2) ÷ 0.02 = 150 Ω." },
    { q: "What if my component is non-ohmic?", a: "Diodes, transistors, and some sensors have nonlinear V–I curves. Use their datasheet rather than Ohm's law alone." },
    { q: "Why is power not in this calculator?", a: "Power is a separate but related formula: P = V × I, or P = I²R, or P = V²/R. Use a power calculator for that." },
    { q: "What ranges does this support?", a: "Voltage μV to kV, current μA to A, resistance Ω to MΩ — switch units inline." },
  ],
  related: [
    { label: "Ohm's Law Calculator", href: "/science/voltage-calculator" },
    { label: "Resistance Calculator", href: "/science/voltage-calculator" },
    { label: "Power Calculator", href: "/science/voltage-calculator" },
  ],
  seoContent: `## Ohm's law at a glance

Ohm's law is the workhorse of every electronics course. It says voltage across a resistive component equals the current through it multiplied by its resistance: V = I × R. From this single equation you can derive the two siblings — I = V ÷ R and R = V ÷ I — and solve for whichever quantity you need. This calculator handles all three: pick what you want to find from the **Solve For** dropdown and the form rearranges itself.

## Units that actually match the bench

Bench measurements rarely give you tidy SI numbers. Currents come in milliamps or microamps; voltages in millivolts or kilovolts; resistors in kilo- or megaohms. The unit selectors next to each input let you stay in whatever scale you're working in, and the calculator converts to volts, amperes, and ohms internally before applying the formula.

## When Ohm's law isn't enough

Ohm's law is exact for ideal resistors and a very good approximation for most wires and carbon-film resistors. It breaks down for nonlinear components such as diodes, LEDs, transistors, and thermistors, where the V–I relationship is curved or temperature-dependent. For those you need the device's datasheet or a Spice model rather than a simple multiplication.

## A practical example

You want to drive a red LED with a forward voltage of about 2 V at 20 mA from a 5 V supply. The resistor needs to drop the remaining 3 V at 20 mA: R = 3 ÷ 0.020 = 150 Ω. Pick the nearest standard value (often 150 Ω or 180 Ω) and you're done. That single calculation — straight from Ohm's law — is one of the most common in all of practical electronics.`,
};
