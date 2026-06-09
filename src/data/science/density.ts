import type { ScienceCalculatorConfig } from "./types";

const massUnits = [
  { label: "kg", toBase: 1 },
  { label: "g", toBase: 0.001 },
  { label: "mg", toBase: 0.000001 },
  { label: "lb", toBase: 0.45359237 },
];
const volumeUnits = [
  { label: "m³", toBase: 1 },
  { label: "L", toBase: 0.001 },
  { label: "mL", toBase: 0.000001 },
  { label: "cm³", toBase: 0.000001 },
  { label: "ft³", toBase: 0.0283168 },
];
const densityUnits = [
  { label: "kg/m³", toBase: 1 },
  { label: "g/cm³", toBase: 1000 },
  { label: "g/mL", toBase: 1000 },
  { label: "lb/ft³", toBase: 16.0185 },
];

export const densityConfig: ScienceCalculatorConfig = {
  slug: "density-calculator",
  categorySlug: "science",
  subCategory: "Physics",
  title: "Density Calculator",
  shortDescription:
    "Calculate density, mass, or volume using ρ = m ÷ V. Supports kg/m³, g/cm³, g/mL, lb/ft³ and full mass/volume conversions.",
  metaTitle: "Density Calculator — ρ = m ÷ V (kg/m³, g/cm³)",
  metaDescription:
    "Free density calculator. Solve for density, mass, or volume with the formula ρ = m ÷ V. Multiple unit options and step-by-step working.",
  keywords: "density calculator, mass volume density, kg/m³, g/cm³, ρ = m/V",
  formulaPreview: "ρ = m ÷ V",
  variables: [
    { key: "rho", label: "Density", symbol: "ρ", baseUnit: "kg/m³", units: densityUnits, defaultValue: 2000, placeholder: "e.g. 2000" },
    { key: "m", label: "Mass", symbol: "m", baseUnit: "kg", units: massUnits, defaultValue: 0.5, placeholder: "e.g. 0.5" },
    { key: "V", label: "Volume", symbol: "V", baseUnit: "m³", units: volumeUnits, defaultValue: 0.00025, placeholder: "e.g. 0.00025" },
  ],
  solveFor: ["rho", "m", "V"],
  defaultTarget: "rho",
  resultUnit: { rho: "kg/m³", m: "kg", V: "m³" },
  solve: (target, b) => {
    if (target === "rho") {
      const value = b.m / b.V;
      return {
        value, unit: "kg/m³", formula: "ρ = m ÷ V",
        steps: [
          { line: `m = ${b.m} kg, V = ${b.V} m³` },
          { line: `ρ = m ÷ V = ${b.m} ÷ ${b.V}` },
          { line: `ρ = ${value.toFixed(4)} kg/m³`, note: `≈ ${(value / 1000).toFixed(4)} g/cm³` },
        ],
      };
    }
    if (target === "m") {
      const value = b.rho * b.V;
      return {
        value, unit: "kg", formula: "m = ρ × V",
        steps: [
          { line: `ρ = ${b.rho} kg/m³, V = ${b.V} m³` },
          { line: `m = ρ × V = ${b.rho} × ${b.V}` },
          { line: `m = ${value.toFixed(4)} kg` },
        ],
      };
    }
    const value = b.m / b.rho;
    return {
      value, unit: "m³", formula: "V = m ÷ ρ",
      steps: [
        { line: `m = ${b.m} kg, ρ = ${b.rho} kg/m³` },
        { line: `V = m ÷ ρ = ${b.m} ÷ ${b.rho}` },
        { line: `V = ${value.toFixed(6)} m³` },
      ],
    };
  },
  chart: {
    xKey: "V", yKey: "m", title: "Mass vs Volume (slope = density)", xLabel: "Volume (m³)", yLabel: "Mass (kg)",
  },
  explanation: {
    formula: "ρ = m / V",
    variables: [
      { symbol: "ρ", name: "Density", unit: "kg/m³", description: "Mass per unit volume." },
      { symbol: "m", name: "Mass", unit: "kg", description: "Quantity of matter." },
      { symbol: "V", name: "Volume", unit: "m³", description: "Space occupied." },
    ],
    description:
      "Density is the amount of mass packed into a given volume. Water at 4 °C has a density of 1,000 kg/m³ (1 g/cm³), which is often used as a reference for relative density.",
    applications: [
      "Identifying materials from a sample",
      "Calculating buoyancy and whether an object floats",
      "Shipping and freight weight estimation",
      "Chemistry: converting between mass and volume",
    ],
    commonMistakes: [
      "Mixing g/cm³ with kg/m³ without converting (factor of 1,000).",
      "Confusing weight (force) with mass.",
      "Using volume of the container instead of the object.",
    ],
  },
  examples: [
    { title: "Rock sample", scenario: "Object mass 500 g, volume 250 cm³.", steps: ["m = 0.5 kg, V = 0.00025 m³", "ρ = 0.5 ÷ 0.00025"], answer: "ρ = 2,000 kg/m³ (2 g/cm³)" },
    { title: "Mass of a gold bar", scenario: "Gold ρ = 19,300 kg/m³, volume 0.001 m³.", steps: ["m = 19,300 × 0.001"], answer: "m = 19.3 kg" },
    { title: "Volume of water", scenario: "1 kg of water at 4 °C (ρ = 1000 kg/m³).", steps: ["V = 1 ÷ 1000"], answer: "V = 0.001 m³ = 1 L" },
  ],
  faqs: [
    { q: "What is density?", a: "Density is mass per unit volume, ρ = m ÷ V. SI units are kg/m³." },
    { q: "What's the density of water?", a: "1,000 kg/m³ (or 1 g/cm³) at 4 °C — slightly less at higher temperatures." },
    { q: "Why does ice float?", a: "Ice has a lower density (≈917 kg/m³) than liquid water, so it displaces more volume than its own mass requires." },
    { q: "What units does this calculator support?", a: "Mass: kg, g, mg, lb. Volume: m³, L, mL, cm³, ft³. Density: kg/m³, g/cm³, g/mL, lb/ft³." },
    { q: "How do I convert g/cm³ to kg/m³?", a: "Multiply by 1,000. So 2 g/cm³ = 2,000 kg/m³." },
    { q: "Can I find volume if I know mass and density?", a: "Yes — set Solve For to Volume and enter mass and density." },
    { q: "Is density the same as specific gravity?", a: "Specific gravity is the ratio of a substance's density to water's density and is unitless." },
    { q: "Does temperature affect density?", a: "Yes — most substances expand when heated, so density decreases with temperature." },
  ],
  related: [
    { label: "Mass Calculator", href: "/science/density-calculator" },
    { label: "Volume Calculator", href: "/science/density-calculator" },
    { label: "Kinetic Energy Calculator", href: "/science/kinetic-energy-calculator" },
  ],
  seoContent: `## What density tells you

Density (ρ, lowercase Greek rho) is one of the most useful properties in physics, chemistry, geology, and engineering. It measures how much mass is packed into each unit of volume: ρ = m ÷ V. Water at 4 °C is the reference point — 1,000 kg/m³ or 1 g/cm³ — and most everyday materials get compared to it.

## Using the calculator

The **Solve For** dropdown rearranges the formula automatically. Pick density to compute ρ from a measured mass and volume; pick mass to compute m from ρ and V (handy when ordering material by volume but billing by weight); pick volume to find V from m and ρ (useful in chemistry for dosing).

## Choosing units

The two most common density units differ by a factor of 1,000: 1 g/cm³ = 1,000 kg/m³. The calculator handles the conversion for you, but if you're double-checking by hand make sure you don't drop the factor — it's the single most frequent unit error in density problems. You can also enter US units like lb and ft³; the result will still be displayed in the standard SI unit for the chosen target.

## Why density matters

Density determines buoyancy: any object with a lower density than the fluid around it will float (Archimedes' principle). It's also a quick way to identify materials — a small dense lump that comes in at 19,300 kg/m³ is almost certainly gold, while one at 2,700 kg/m³ is probably aluminium. In shipping, density (or its inverse, specific volume) sets the "dimensional weight" used for freight pricing.`,
};
