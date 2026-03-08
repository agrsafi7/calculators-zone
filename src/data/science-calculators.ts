import { CalculatorConfig } from "@/components/CalculatorTemplate";

const sciSubcategoryMap: Record<string, string> = {
  "force-calculator": "Mechanics",
  "velocity-calculator": "Mechanics",
  "acceleration-calculator": "Mechanics",
  "kinetic-energy-calculator": "Mechanics",
  "potential-energy-calculator": "Mechanics",
  "pressure-calculator": "Mechanics",
  "torque-calculator": "Mechanics",
  "speed-calculator": "Mechanics",
  "mass-calculator": "Mechanics",
  "ohms-law-calculator": "Electricity & Magnetism",
  "voltage-calculator": "Electricity & Magnetism",
  "electricity-power-calculator": "Electricity & Magnetism",
  "density-calculator": "General Physics",
  "molar-mass-calculator": "Chemistry",
  "ph-calculator": "Chemistry",
  "molecular-weight-calculator": "Chemistry",
  "half-life-calculator": "Nuclear & Radioactivity",
  "ideal-gas-law-calculator": "Chemistry",
  "wavelength-calculator": "Waves & Optics",
  "frequency-calculator": "Waves & Optics",
  "weight-calculator": "Astronomy & Space",
};


const sciRelated = (exclude: string) => [
  { name: "Force Calculator", slug: "force-calculator", icon: "flask", category: "science" },
  { name: "Density Calculator", slug: "density-calculator", icon: "flask", category: "science" },
  { name: "Ohm's Law", slug: "ohms-law-calculator", icon: "flask", category: "science" },
  { name: "Ideal Gas Law", slug: "ideal-gas-law-calculator", icon: "flask", category: "science" },
].filter((c) => c.slug !== exclude);

export const scienceCalculators: CalculatorConfig[] = [
  {
    slug: "force-calculator", name: "Force Calculator", category: "Science", categorySlug: "science",
    description: "Calculate force using Newton's second law: F = m × a.",
    metaDescription: "Free force calculator using F = ma. Calculate force from mass and acceleration.",
    icon: "flask",
    inputs: [
      { id: "mass", label: "Mass (kg)", type: "number", defaultValue: 10, step: 0.1 },
      { id: "acceleration", label: "Acceleration (m/s²)", type: "number", defaultValue: 9.81, step: 0.01 },
    ],
    calculate: (v) => {
      const force = v.mass * v.acceleration;
      return [
        { label: "Force", value: `${force.toFixed(2)} N`, highlight: true },
        { label: "Weight (if a=g)", value: `${(v.mass * 9.81).toFixed(2)} N` },
      ];
    },
    formula: { expression: "F = m × a", variables: ["F = Force (Newtons)", "m = mass (kg)", "a = acceleration (m/s²)"] },
    howToUse: "Enter mass and acceleration to calculate force in Newtons.",
    faqs: [{ question: "What is a Newton?", answer: "1 N is the force needed to accelerate 1 kg at 1 m/s². It's named after Sir Isaac Newton." }],
    relatedCalcs: sciRelated("force-calculator"),
  },
  {
    slug: "velocity-calculator", name: "Velocity Calculator", category: "Science", categorySlug: "science",
    description: "Calculate final velocity using initial velocity, acceleration, and time.",
    metaDescription: "Free velocity calculator. v = u + at. Calculate velocity from acceleration and time.",
    icon: "flask",
    inputs: [
      { id: "u", label: "Initial Velocity (m/s)", type: "number", defaultValue: 0, step: 0.1 },
      { id: "a", label: "Acceleration (m/s²)", type: "number", defaultValue: 9.81, step: 0.01 },
      { id: "t", label: "Time (s)", type: "number", defaultValue: 5, step: 0.1 },
    ],
    calculate: (v) => {
      const vel = v.u + v.a * v.t;
      const dist = v.u * v.t + 0.5 * v.a * v.t ** 2;
      return [
        { label: "Final Velocity", value: `${vel.toFixed(2)} m/s`, highlight: true },
        { label: "Distance", value: `${dist.toFixed(2)} m` },
        { label: "Speed (km/h)", value: `${(vel * 3.6).toFixed(2)} km/h` },
      ];
    },
    formula: { expression: "v = u + at; s = ut + ½at²", variables: ["u = initial velocity", "a = acceleration", "t = time"] },
    howToUse: "Enter initial velocity, acceleration, and time to find the final velocity and distance traveled.",
    faqs: [{ question: "What is the difference between speed and velocity?", answer: "Velocity has direction (vector); speed is the magnitude of velocity (scalar)." }],
    relatedCalcs: sciRelated("velocity-calculator"),
  },
  {
    slug: "acceleration-calculator", name: "Acceleration Calculator", category: "Science", categorySlug: "science",
    description: "Calculate acceleration from change in velocity over time.",
    metaDescription: "Free acceleration calculator. Find a = Δv/Δt from velocity change and time.",
    icon: "flask",
    inputs: [
      { id: "vi", label: "Initial Velocity (m/s)", type: "number", defaultValue: 0, step: 0.1 },
      { id: "vf", label: "Final Velocity (m/s)", type: "number", defaultValue: 30, step: 0.1 },
      { id: "t", label: "Time (s)", type: "number", defaultValue: 6, step: 0.1 },
    ],
    calculate: (v) => {
      if (v.t === 0) return [{ label: "Error", value: "Time cannot be zero" }];
      const a = (v.vf - v.vi) / v.t;
      const dist = (v.vi + v.vf) / 2 * v.t;
      return [
        { label: "Acceleration", value: `${a.toFixed(4)} m/s²`, highlight: true },
        { label: "In g's", value: `${(a / 9.81).toFixed(3)} g` },
        { label: "Distance", value: `${dist.toFixed(2)} m` },
      ];
    },
    formula: { expression: "a = (v − u) / t", variables: ["v = final velocity", "u = initial velocity", "t = time"] },
    howToUse: "Enter initial velocity, final velocity, and time to calculate acceleration.",
    faqs: [{ question: "What is 1g?", answer: "1g = 9.81 m/s², the acceleration due to Earth's gravity." }],
    relatedCalcs: sciRelated("acceleration-calculator"),
  },
  {
    slug: "kinetic-energy-calculator", name: "Kinetic Energy Calculator", category: "Science", categorySlug: "science",
    description: "Calculate the kinetic energy of a moving object from its mass and velocity.",
    metaDescription: "Free kinetic energy calculator. KE = ½mv². Calculate energy from mass and speed.",
    icon: "flask",
    inputs: [
      { id: "mass", label: "Mass (kg)", type: "number", defaultValue: 1000, step: 1 },
      { id: "velocity", label: "Velocity (m/s)", type: "number", defaultValue: 20, step: 0.1 },
    ],
    calculate: (v) => {
      const ke = 0.5 * v.mass * v.velocity ** 2;
      return [
        { label: "Kinetic Energy", value: `${ke.toLocaleString()} J`, highlight: true },
        { label: "In kJ", value: `${(ke / 1000).toFixed(2)} kJ` },
        { label: "Speed (km/h)", value: `${(v.velocity * 3.6).toFixed(1)}` },
      ];
    },
    formula: { expression: "KE = ½mv²", variables: ["m = mass (kg)", "v = velocity (m/s)", "KE in Joules"] },
    howToUse: "Enter mass and velocity to calculate kinetic energy in joules.",
    faqs: [{ question: "Why does velocity matter more than mass?", answer: "KE is proportional to v². Doubling speed quadruples kinetic energy." }],
    relatedCalcs: sciRelated("kinetic-energy-calculator"),
  },
  {
    slug: "potential-energy-calculator", name: "Potential Energy Calculator", category: "Science", categorySlug: "science",
    description: "Calculate gravitational potential energy from mass, height, and gravity.",
    metaDescription: "Free potential energy calculator. PE = mgh. Calculate gravitational PE.",
    icon: "flask",
    inputs: [
      { id: "mass", label: "Mass (kg)", type: "number", defaultValue: 10, step: 0.1 },
      { id: "height", label: "Height (m)", type: "number", defaultValue: 5, step: 0.1 },
      { id: "gravity", label: "Gravity (m/s²)", type: "number", defaultValue: 9.81, step: 0.01 },
    ],
    calculate: (v) => {
      const pe = v.mass * v.gravity * v.height;
      return [
        { label: "Potential Energy", value: `${pe.toFixed(2)} J`, highlight: true },
        { label: "In kJ", value: `${(pe / 1000).toFixed(4)} kJ` },
      ];
    },
    formula: { expression: "PE = m × g × h", variables: ["m = mass", "g = gravity (9.81)", "h = height"] },
    howToUse: "Enter mass, height, and gravitational acceleration.",
    faqs: [{ question: "What happens to PE when an object falls?", answer: "PE converts to kinetic energy. At the bottom, all PE becomes KE (ignoring friction)." }],
    relatedCalcs: sciRelated("potential-energy-calculator"),
  },
  {
    slug: "ohms-law-calculator", name: "Ohm's Law Calculator", category: "Science", categorySlug: "science",
    description: "Calculate voltage, current, resistance, or power using Ohm's law.",
    metaDescription: "Free Ohm's law calculator. V = IR. Calculate voltage, current, resistance, and power.",
    icon: "flask",
    inputs: [
      { id: "voltage", label: "Voltage (V)", type: "number", defaultValue: 12, step: 0.1 },
      { id: "resistance", label: "Resistance (Ω)", type: "number", defaultValue: 4, step: 0.1 },
    ],
    calculate: (v) => {
      if (v.resistance === 0) return [{ label: "Error", value: "Resistance cannot be zero" }];
      const current = v.voltage / v.resistance;
      const power = v.voltage * current;
      return [
        { label: "Current", value: `${current.toFixed(4)} A`, highlight: true },
        { label: "Power", value: `${power.toFixed(2)} W` },
        { label: "Current (mA)", value: `${(current * 1000).toFixed(2)} mA` },
      ];
    },
    formula: { expression: "V = I × R; P = V × I", variables: ["V = Voltage", "I = Current", "R = Resistance", "P = Power"] },
    howToUse: "Enter voltage and resistance to calculate current and power.",
    faqs: [{ question: "What is Ohm's law?", answer: "Ohm's law states that current through a conductor is directly proportional to voltage and inversely proportional to resistance." }],
    relatedCalcs: sciRelated("ohms-law-calculator"),
  },
  {
    slug: "voltage-calculator", name: "Voltage Calculator", category: "Science", categorySlug: "science",
    description: "Calculate voltage from current and resistance using Ohm's law (V = IR).",
    metaDescription: "Free voltage calculator. V = IR. Calculate voltage from current and resistance.",
    icon: "flask",
    inputs: [
      { id: "current", label: "Current (A)", type: "number", defaultValue: 2, step: 0.01 },
      { id: "resistance", label: "Resistance (Ω)", type: "number", defaultValue: 6, step: 0.1 },
    ],
    calculate: (v) => {
      const voltage = v.current * v.resistance;
      const power = voltage * v.current;
      return [
        { label: "Voltage", value: `${voltage.toFixed(2)} V`, highlight: true },
        { label: "Power", value: `${power.toFixed(2)} W` },
      ];
    },
    formula: { expression: "V = I × R", variables: ["I = Current (Amps)", "R = Resistance (Ohms)"] },
    howToUse: "Enter current and resistance to calculate voltage.",
    faqs: [{ question: "What is voltage?", answer: "Voltage (electric potential difference) is the 'pressure' that pushes electrons through a circuit." }],
    relatedCalcs: sciRelated("voltage-calculator"),
  },
  {
    slug: "density-calculator", name: "Density Calculator", category: "Science", categorySlug: "science",
    description: "Calculate density, mass, or volume using ρ = m/V.",
    metaDescription: "Free density calculator. Calculate density from mass and volume. ρ = m/V.",
    icon: "flask",
    inputs: [
      { id: "mass", label: "Mass (kg)", type: "number", defaultValue: 7.874, step: 0.001 },
      { id: "volume", label: "Volume (m³)", type: "number", defaultValue: 0.001, step: 0.0001 },
    ],
    calculate: (v) => {
      if (v.volume === 0) return [{ label: "Error", value: "Volume cannot be zero" }];
      const density = v.mass / v.volume;
      return [
        { label: "Density", value: `${density.toFixed(2)} kg/m³`, highlight: true },
        { label: "In g/cm³", value: `${(density / 1000).toFixed(4)}` },
        { label: "Floats in water?", value: density < 1000 ? "Yes (< 1000 kg/m³)" : "No (≥ 1000 kg/m³)" },
      ];
    },
    formula: { expression: "ρ = m / V", variables: ["ρ = density", "m = mass", "V = volume"] },
    howToUse: "Enter mass and volume to calculate density.",
    faqs: [{ question: "What is water's density?", answer: "Pure water at 4°C has a density of exactly 1000 kg/m³ (1 g/cm³)." }],
    relatedCalcs: sciRelated("density-calculator"),
  },
  {
    slug: "molar-mass-calculator", name: "Molar Mass Calculator", category: "Science", categorySlug: "science",
    description: "Calculate the molar mass of common compounds by selecting elements and quantities.",
    metaDescription: "Free molar mass calculator. Find molecular weight of chemical compounds.",
    icon: "flask",
    inputs: [
      { id: "c", label: "Carbon (C) atoms", type: "number", defaultValue: 6, min: 0 },
      { id: "h", label: "Hydrogen (H) atoms", type: "number", defaultValue: 12, min: 0 },
      { id: "o", label: "Oxygen (O) atoms", type: "number", defaultValue: 6, min: 0 },
      { id: "n", label: "Nitrogen (N) atoms", type: "number", defaultValue: 0, min: 0 },
    ],
    calculate: (v) => {
      const mass = v.c * 12.011 + v.h * 1.008 + v.o * 15.999 + v.n * 14.007;
      return [
        { label: "Molar Mass", value: `${mass.toFixed(3)} g/mol`, highlight: true },
        { label: "In kg/mol", value: `${(mass / 1000).toFixed(6)}` },
      ];
    },
    formula: { expression: "M = Σ(atoms × atomic mass)", variables: ["C = 12.011", "H = 1.008", "O = 15.999", "N = 14.007"] },
    howToUse: "Enter the number of each type of atom in your molecule. Example: Glucose (C₆H₁₂O₆) → C=6, H=12, O=6.",
    faqs: [{ question: "What is molar mass?", answer: "The mass of one mole (6.022 × 10²³) of a substance, in grams per mole." }],
    relatedCalcs: sciRelated("molar-mass-calculator"),
  },
  {
    slug: "ph-calculator", name: "pH Calculator", category: "Science", categorySlug: "science",
    description: "Calculate pH from hydrogen ion concentration or vice versa.",
    metaDescription: "Free pH calculator. Convert between pH and hydrogen ion concentration [H⁺].",
    icon: "flask",
    inputs: [
      { id: "mode", label: "Calculate", type: "select", defaultValue: 0, options: [{ value: 0, label: "pH from [H⁺]" }, { value: 1, label: "[H⁺] from pH" }] },
      { id: "value", label: "Value ([H⁺] in mol/L or pH)", type: "number", defaultValue: 7, step: 0.01 },
    ],
    calculate: (v) => {
      if (v.mode === 0) {
        if (v.value <= 0) return [{ label: "Error", value: "[H⁺] must be > 0" }];
        const ph = -Math.log10(v.value);
        const poh = 14 - ph;
        return [
          { label: "pH", value: ph.toFixed(4), highlight: true },
          { label: "pOH", value: poh.toFixed(4) },
          { label: "Nature", value: ph < 7 ? "Acidic" : ph > 7 ? "Basic" : "Neutral" },
        ];
      } else {
        const h = Math.pow(10, -v.value);
        const oh = Math.pow(10, -(14 - v.value));
        return [
          { label: "[H⁺]", value: h.toExponential(4), highlight: true },
          { label: "[OH⁻]", value: oh.toExponential(4) },
          { label: "Nature", value: v.value < 7 ? "Acidic" : v.value > 7 ? "Basic" : "Neutral" },
        ];
      }
    },
    formula: { expression: "pH = −log₁₀[H⁺]; [H⁺] = 10^(−pH)", variables: ["pH + pOH = 14 at 25°C"] },
    howToUse: "Select mode: either enter [H⁺] concentration to get pH, or enter pH to get [H⁺].",
    faqs: [{ question: "What is pH?", answer: "pH measures acidity on a scale of 0-14. Below 7 is acidic, above 7 is basic, 7 is neutral." }],
    relatedCalcs: sciRelated("ph-calculator"),
  },
  {
    slug: "half-life-calculator", name: "Half-Life Calculator", category: "Science", categorySlug: "science",
    description: "Calculate remaining quantity after radioactive decay based on half-life and elapsed time.",
    metaDescription: "Free half-life calculator. Calculate remaining substance after radioactive decay.",
    icon: "flask",
    inputs: [
      { id: "initial", label: "Initial Amount", type: "number", defaultValue: 100, step: 0.1 },
      { id: "halfLife", label: "Half-Life (time units)", type: "number", defaultValue: 5, step: 0.1 },
      { id: "time", label: "Elapsed Time", type: "number", defaultValue: 15, step: 0.1 },
    ],
    calculate: (v) => {
      if (v.halfLife <= 0) return [{ label: "Error", value: "Half-life must be > 0" }];
      const remaining = v.initial * Math.pow(0.5, v.time / v.halfLife);
      const decayed = v.initial - remaining;
      const halfLives = v.time / v.halfLife;
      return [
        { label: "Remaining", value: remaining.toFixed(4), highlight: true },
        { label: "Decayed", value: decayed.toFixed(4) },
        { label: "Half-Lives Elapsed", value: halfLives.toFixed(2) },
        { label: "% Remaining", value: `${((remaining / v.initial) * 100).toFixed(2)}%` },
      ];
    },
    formula: { expression: "N = N₀ × (½)^(t/t½)", variables: ["N₀ = initial", "t = elapsed time", "t½ = half-life"] },
    howToUse: "Enter the initial amount, half-life period, and elapsed time.",
    faqs: [{ question: "What is a half-life?", answer: "The time for half of a radioactive substance to decay. After 1 half-life, 50% remains; after 2, 25%; etc." }],
    relatedCalcs: sciRelated("half-life-calculator"),
  },
  {
    slug: "ideal-gas-law-calculator", name: "Ideal Gas Law Calculator", category: "Science", categorySlug: "science",
    description: "Calculate pressure, volume, temperature, or moles using PV = nRT.",
    metaDescription: "Free ideal gas law calculator. PV = nRT. Solve for any variable.",
    icon: "flask",
    inputs: [
      { id: "pressure", label: "Pressure (atm)", type: "number", defaultValue: 1, step: 0.01 },
      { id: "volume", label: "Volume (L)", type: "number", defaultValue: 22.414, step: 0.01 },
      { id: "moles", label: "Moles (n)", type: "number", defaultValue: 1, step: 0.01 },
    ],
    calculate: (v) => {
      const R = 0.08206; // L·atm/(mol·K)
      if (v.moles === 0) return [{ label: "Error", value: "Moles cannot be zero" }];
      const T = (v.pressure * v.volume) / (v.moles * R);
      return [
        { label: "Temperature", value: `${T.toFixed(2)} K`, highlight: true },
        { label: "In °C", value: `${(T - 273.15).toFixed(2)} °C` },
        { label: "PV", value: `${(v.pressure * v.volume).toFixed(4)} L·atm` },
      ];
    },
    formula: { expression: "PV = nRT → T = PV/(nR)", variables: ["R = 0.08206 L·atm/(mol·K)", "T in Kelvin"] },
    howToUse: "Enter pressure, volume, and moles to solve for temperature.",
    faqs: [{ question: "What is R?", answer: "The ideal gas constant. R = 0.08206 L·atm/(mol·K) = 8.314 J/(mol·K)." }],
    relatedCalcs: sciRelated("ideal-gas-law-calculator"),
  },
  {
    slug: "pressure-calculator", name: "Pressure Calculator", category: "Science", categorySlug: "science",
    description: "Calculate pressure from force and area using P = F/A.",
    metaDescription: "Free pressure calculator. P = F/A. Calculate pressure from force and area.",
    icon: "flask",
    inputs: [
      { id: "force", label: "Force (N)", type: "number", defaultValue: 100, step: 0.1 },
      { id: "area", label: "Area (m²)", type: "number", defaultValue: 0.01, step: 0.001 },
    ],
    calculate: (v) => {
      if (v.area === 0) return [{ label: "Error", value: "Area cannot be zero" }];
      const p = v.force / v.area;
      return [
        { label: "Pressure", value: `${p.toFixed(2)} Pa`, highlight: true },
        { label: "In kPa", value: `${(p / 1000).toFixed(4)}` },
        { label: "In atm", value: `${(p / 101325).toFixed(6)}` },
        { label: "In PSI", value: `${(p / 6894.76).toFixed(4)}` },
      ];
    },
    formula: { expression: "P = F / A", variables: ["P = Pressure (Pascals)", "F = Force (Newtons)", "A = Area (m²)"] },
    howToUse: "Enter force and area to calculate pressure.",
    faqs: [{ question: "What is a Pascal?", answer: "1 Pa = 1 N/m². Standard atmospheric pressure is 101,325 Pa." }],
    relatedCalcs: sciRelated("pressure-calculator"),
  },
  {
    slug: "wavelength-calculator", name: "Wavelength Calculator", category: "Science", categorySlug: "science",
    description: "Calculate wavelength from frequency using the wave equation λ = v/f.",
    metaDescription: "Free wavelength calculator. λ = v/f. Calculate wavelength from frequency and wave speed.",
    icon: "flask",
    inputs: [
      { id: "frequency", label: "Frequency (Hz)", type: "number", defaultValue: 440, step: 0.1 },
      { id: "speed", label: "Wave Speed (m/s)", type: "number", defaultValue: 343, step: 0.1 },
    ],
    calculate: (v) => {
      if (v.frequency === 0) return [{ label: "Error", value: "Frequency cannot be zero" }];
      const wavelength = v.speed / v.frequency;
      return [
        { label: "Wavelength", value: `${wavelength.toFixed(4)} m`, highlight: true },
        { label: "In cm", value: `${(wavelength * 100).toFixed(2)} cm` },
        { label: "Period", value: `${(1 / v.frequency).toExponential(4)} s` },
      ];
    },
    formula: { expression: "λ = v / f", variables: ["λ = wavelength", "v = wave speed", "f = frequency"] },
    howToUse: "Enter frequency and wave speed. Default speed is 343 m/s (sound in air).",
    faqs: [{ question: "Why 343 m/s?", answer: "343 m/s is the speed of sound in air at 20°C. For light, use 3×10⁸ m/s." }],
    relatedCalcs: sciRelated("wavelength-calculator"),
  },
  {
    slug: "frequency-calculator", name: "Frequency Calculator", category: "Science", categorySlug: "science",
    description: "Calculate frequency from wavelength and wave speed using f = v/λ.",
    metaDescription: "Free frequency calculator. f = v/λ. Calculate frequency from wavelength.",
    icon: "flask",
    inputs: [
      { id: "wavelength", label: "Wavelength (m)", type: "number", defaultValue: 0.78, step: 0.01 },
      { id: "speed", label: "Wave Speed (m/s)", type: "number", defaultValue: 343, step: 0.1 },
    ],
    calculate: (v) => {
      if (v.wavelength === 0) return [{ label: "Error", value: "Wavelength cannot be zero" }];
      const freq = v.speed / v.wavelength;
      return [
        { label: "Frequency", value: `${freq.toFixed(2)} Hz`, highlight: true },
        { label: "Period", value: `${(1 / freq).toFixed(6)} s` },
        { label: "In kHz", value: `${(freq / 1000).toFixed(4)}` },
      ];
    },
    formula: { expression: "f = v / λ", variables: ["f = frequency (Hz)", "v = speed (m/s)", "λ = wavelength (m)"] },
    howToUse: "Enter wavelength and wave speed to calculate frequency.",
    faqs: [{ question: "What frequencies can humans hear?", answer: "20 Hz to 20,000 Hz (20 kHz). Below is infrasound, above is ultrasound." }],
    relatedCalcs: sciRelated("frequency-calculator"),
  },
  {
    slug: "torque-calculator", name: "Torque Calculator", category: "Science", categorySlug: "science",
    description: "Calculate torque from force and lever arm distance using τ = F × r × sin(θ).",
    metaDescription: "Free torque calculator. τ = F × r. Calculate torque from force and distance.",
    icon: "flask",
    inputs: [
      { id: "force", label: "Force (N)", type: "number", defaultValue: 50, step: 0.1 },
      { id: "distance", label: "Lever Arm (m)", type: "number", defaultValue: 0.3, step: 0.01 },
      { id: "angle", label: "Angle (degrees)", type: "number", defaultValue: 90, min: 0, max: 180, step: 1 },
    ],
    calculate: (v) => {
      const rad = v.angle * Math.PI / 180;
      const torque = v.force * v.distance * Math.sin(rad);
      return [
        { label: "Torque", value: `${torque.toFixed(2)} N·m`, highlight: true },
        { label: "In lb·ft", value: `${(torque * 0.7376).toFixed(2)}` },
      ];
    },
    formula: { expression: "τ = F × r × sin(θ)", variables: ["F = Force (N)", "r = lever arm (m)", "θ = angle"] },
    howToUse: "Enter force, lever arm distance, and angle. 90° gives maximum torque.",
    faqs: [{ question: "What is torque?", answer: "Torque is the rotational equivalent of force. It causes objects to rotate around an axis." }],
    relatedCalcs: sciRelated("torque-calculator"),
  },
  // Molecular Weight Calculator
  {
    slug: "molecular-weight-calculator", name: "Molecular Weight Calculator", category: "Science", categorySlug: "science",
    description: "Calculate molecular weight by entering the count of common elements (H, C, N, O, S, etc.).",
    metaDescription: "Free molecular weight calculator. Calculate molecular mass from element composition.",
    icon: "flask",
    inputs: [
      { id: "carbon", label: "Carbon (C) atoms", type: "number", defaultValue: 6, min: 0 },
      { id: "hydrogen", label: "Hydrogen (H) atoms", type: "number", defaultValue: 12, min: 0 },
      { id: "oxygen", label: "Oxygen (O) atoms", type: "number", defaultValue: 6, min: 0 },
      { id: "nitrogen", label: "Nitrogen (N) atoms", type: "number", defaultValue: 0, min: 0 },
    ],
    calculate: (v) => {
      const mw = v.carbon * 12.011 + v.hydrogen * 1.008 + v.oxygen * 15.999 + v.nitrogen * 14.007;
      const formula = [v.carbon > 0 ? `C${v.carbon > 1 ? v.carbon : ""}` : "", v.hydrogen > 0 ? `H${v.hydrogen > 1 ? v.hydrogen : ""}` : "", v.oxygen > 0 ? `O${v.oxygen > 1 ? v.oxygen : ""}` : "", v.nitrogen > 0 ? `N${v.nitrogen > 1 ? v.nitrogen : ""}` : ""].filter(Boolean).join("");
      return [
        { label: "Molecular Weight", value: `${mw.toFixed(3)} g/mol`, highlight: true },
        { label: "Formula", value: formula || "—" },
      ];
    },
    formula: { expression: "MW = Σ (atoms × atomic mass)", variables: ["C=12.011, H=1.008, O=15.999, N=14.007"] },
    howToUse: "Enter the number of each type of atom in the molecule.",
    faqs: [{ question: "What is C6H12O6?", answer: "Glucose — molecular weight 180.156 g/mol." }],
    relatedCalcs: sciRelated("molecular-weight-calculator"),
  },
  // Speed Calculator
  {
    slug: "speed-calculator", name: "Speed Calculator", category: "Science", categorySlug: "science",
    description: "Calculate speed, distance, or time using the formula speed = distance / time.",
    metaDescription: "Free speed calculator. Calculate speed, distance, or time from two known values.",
    icon: "flask",
    inputs: [
      { id: "distance", label: "Distance (km)", type: "number", defaultValue: 100, step: 0.1 },
      { id: "hours", label: "Time - Hours", type: "number", defaultValue: 1, min: 0 },
      { id: "minutes", label: "Time - Minutes", type: "number", defaultValue: 30, min: 0, max: 59 },
    ],
    calculate: (v) => {
      const totalHours = v.hours + v.minutes / 60;
      if (totalHours <= 0) return [{ label: "Error", value: "Time must be > 0" }];
      const speed = v.distance / totalHours;
      return [
        { label: "Speed", value: `${speed.toFixed(2)} km/h`, highlight: true },
        { label: "Speed (mph)", value: `${(speed / 1.60934).toFixed(2)} mph` },
        { label: "Speed (m/s)", value: `${(speed / 3.6).toFixed(2)} m/s` },
      ];
    },
    formula: { expression: "Speed = Distance / Time", variables: ["d = distance", "t = time", "v = speed"] },
    howToUse: "Enter distance and time to calculate speed, or use to solve for any variable.",
    faqs: [{ question: "Speed vs velocity?", answer: "Speed is scalar (magnitude only). Velocity is a vector (magnitude + direction)." }],
    relatedCalcs: sciRelated("speed-calculator"),
  },
  // Mass Calculator
  {
    slug: "mass-calculator", name: "Mass Calculator", category: "Science", categorySlug: "science",
    description: "Calculate mass from force and acceleration, density and volume, or weight and gravity.",
    metaDescription: "Free mass calculator. Calculate mass from force, density, or weight using physics formulas.",
    icon: "flask",
    inputs: [
      { id: "force", label: "Force (N)", type: "number", defaultValue: 98.1, step: 0.1 },
      { id: "acceleration", label: "Acceleration (m/s²)", type: "number", defaultValue: 9.81, step: 0.01 },
    ],
    calculate: (v) => {
      if (v.acceleration === 0) return [{ label: "Error", value: "Acceleration cannot be zero" }];
      const mass = v.force / v.acceleration;
      return [
        { label: "Mass", value: `${mass.toFixed(4)} kg`, highlight: true },
        { label: "In grams", value: `${(mass * 1000).toFixed(2)} g` },
        { label: "In pounds", value: `${(mass * 2.20462).toFixed(4)} lbs` },
        { label: "Weight on Earth", value: `${(mass * 9.81).toFixed(2)} N` },
      ];
    },
    formula: { expression: "m = F / a (from F = ma)", variables: ["F = Force (N)", "a = Acceleration (m/s²)"] },
    howToUse: "Enter force and acceleration to calculate mass using Newton's second law.",
    faqs: [{ question: "Mass vs weight?", answer: "Mass is the amount of matter (constant). Weight is the gravitational force on that mass (varies by location)." }],
    relatedCalcs: sciRelated("mass-calculator"),
  },
  // Electricity/Power Calculator
  {
    slug: "electricity-power-calculator", name: "Electrical Power Calculator", category: "Science", categorySlug: "science",
    description: "Calculate electrical power, current, voltage, or resistance using P = IV and Ohm's law.",
    metaDescription: "Free electrical power calculator. Calculate watts, amps, volts, and ohms from any two values.",
    icon: "flask",
    inputs: [
      { id: "voltage", label: "Voltage (V)", type: "number", defaultValue: 120, step: 0.1 },
      { id: "current", label: "Current (A)", type: "number", defaultValue: 10, step: 0.1 },
    ],
    calculate: (v) => {
      const power = v.voltage * v.current;
      const resistance = v.current > 0 ? v.voltage / v.current : 0;
      return [
        { label: "Power", value: `${power.toFixed(1)} W`, highlight: true },
        { label: "In kW", value: `${(power / 1000).toFixed(3)} kW` },
        { label: "Resistance", value: `${resistance.toFixed(2)} Ω` },
        { label: "Energy (1 hr)", value: `${(power / 1000).toFixed(3)} kWh` },
      ];
    },
    formula: { expression: "P = V × I; R = V / I", variables: ["P = Power (Watts)", "V = Voltage", "I = Current"] },
    howToUse: "Enter voltage and current to calculate power and resistance.",
    faqs: [{ question: "What is a watt?", answer: "A watt measures the rate of energy transfer. 1 watt = 1 joule per second = 1 volt × 1 amp." }],
    relatedCalcs: sciRelated("electricity-power-calculator"),
  },
  // Weight Calculator
  {
    slug: "weight-calculator", name: "Weight Calculator", category: "Science", categorySlug: "science",
    description: "Calculate your weight on different planets and celestial bodies based on your Earth weight.",
    metaDescription: "Free weight on other planets calculator. See what you'd weigh on Mars, Jupiter, Moon, and more.",
    icon: "flask",
    inputs: [
      { id: "earthWeight", label: "Weight on Earth (kg)", type: "number", defaultValue: 70, step: 0.1 },
    ],
    calculate: (v) => {
      const g: Record<string, number> = { Moon: 0.166, Mars: 0.378, Jupiter: 2.528, Saturn: 1.065, Venus: 0.907, Mercury: 0.378 };
      return [
        { label: "Earth", value: `${v.earthWeight.toFixed(1)} kg`, highlight: true },
        { label: "Moon", value: `${(v.earthWeight * g.Moon).toFixed(1)} kg` },
        { label: "Mars", value: `${(v.earthWeight * g.Mars).toFixed(1)} kg` },
        { label: "Jupiter", value: `${(v.earthWeight * g.Jupiter).toFixed(1)} kg` },
        { label: "Venus", value: `${(v.earthWeight * g.Venus).toFixed(1)} kg` },
      ];
    },
    formula: { expression: "Weight = Earth Weight × (Planet g / Earth g)", variables: ["Moon: 0.166g", "Mars: 0.378g", "Jupiter: 2.528g"] },
    howToUse: "Enter your weight on Earth to see what you'd weigh on other planets.",
    faqs: [{ question: "Is this mass or weight?", answer: "This shows weight (force of gravity). Your mass stays the same everywhere — only the gravitational pull changes." }],
    relatedCalcs: sciRelated("weight-calculator"),
  },
];
