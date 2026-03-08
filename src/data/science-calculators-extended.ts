import { CalculatorConfig } from "@/components/CalculatorTemplate";

const rel = (exclude: string) => [
  { name: "Force Calculator", slug: "force-calculator", icon: "flask", category: "science" },
  { name: "Density Calculator", slug: "density-calculator", icon: "flask", category: "science" },
  { name: "Ohm's Law", slug: "ohms-law-calculator", icon: "flask", category: "science" },
].filter(c => c.slug !== exclude);

const makeSci = (slug: string, name: string, desc: string, meta: string, subcategory: string, inputs: CalculatorConfig["inputs"], calculate: CalculatorConfig["calculate"], formula: CalculatorConfig["formula"]): CalculatorConfig => ({
  slug, name, category: "Science", categorySlug: "science", description: desc, metaDescription: meta, icon: "flask", subcategory,
  inputs, calculate, formula,
  howToUse: `Enter values to calculate using the ${name}.`,
  faqs: [{ question: `What does the ${name} do?`, answer: `It calculates ${desc.toLowerCase()}` }],
  relatedCalcs: rel(slug),
});

export const scienceCalculatorsExtended: CalculatorConfig[] = [
  // Thermodynamics
  makeSci("specific-heat-calculator", "Specific Heat Calculator", "Calculate heat energy using Q = mcΔT.", "Free specific heat calculator. Q = mcΔT.", "Thermodynamics",
    [{ id: "mass", label: "Mass (kg)", type: "number", defaultValue: 1, step: 0.01 }, { id: "c", label: "Specific Heat (J/kg·K)", type: "number", defaultValue: 4186, step: 1 }, { id: "dt", label: "Temperature Change (°C)", type: "number", defaultValue: 10, step: 0.1 }],
    (v) => { const q = v.mass * v.c * v.dt; return [{ label: "Heat Energy", value: `${q.toLocaleString()} J`, highlight: true }, { label: "In kJ", value: `${(q / 1000).toFixed(2)} kJ` }, { label: "In kcal", value: `${(q / 4184).toFixed(2)} kcal` }]; },
    { expression: "Q = m × c × ΔT", variables: ["Q = heat (J)", "c = specific heat capacity", "ΔT = temperature change"] }
  ),
  makeSci("thermal-expansion-calculator", "Thermal Expansion Calculator", "Calculate linear thermal expansion ΔL = L₀ × α × ΔT.", "Free thermal expansion calculator.", "Thermodynamics",
    [{ id: "length", label: "Original Length (m)", type: "number", defaultValue: 10, step: 0.01 }, { id: "alpha", label: "Coefficient (×10⁻⁶/°C)", type: "number", defaultValue: 12, step: 0.1 }, { id: "dt", label: "Temperature Change (°C)", type: "number", defaultValue: 50, step: 1 }],
    (v) => { const dl = v.length * (v.alpha * 1e-6) * v.dt; return [{ label: "Expansion", value: `${(dl * 1000).toFixed(4)} mm`, highlight: true }, { label: "New Length", value: `${(v.length + dl).toFixed(6)} m` }, { label: "% Change", value: `${((dl / v.length) * 100).toFixed(4)}%` }]; },
    { expression: "ΔL = L₀ × α × ΔT", variables: ["Steel α ≈ 12 × 10⁻⁶/°C", "Aluminum α ≈ 23 × 10⁻⁶/°C"] }
  ),
  makeSci("heat-transfer-calculator", "Heat Transfer Calculator", "Calculate heat transfer rate through a surface using Q = kAΔT/d.", "Free heat transfer calculator.", "Thermodynamics",
    [{ id: "k", label: "Thermal Conductivity (W/m·K)", type: "number", defaultValue: 0.6, step: 0.01 }, { id: "area", label: "Area (m²)", type: "number", defaultValue: 1, step: 0.01 }, { id: "dt", label: "Temperature Diff (°C)", type: "number", defaultValue: 20, step: 0.1 }, { id: "thickness", label: "Thickness (m)", type: "number", defaultValue: 0.1, step: 0.01 }],
    (v) => { if (v.thickness === 0) return [{ label: "Error", value: "Thickness cannot be zero" }]; const q = v.k * v.area * v.dt / v.thickness; return [{ label: "Heat Transfer Rate", value: `${q.toFixed(2)} W`, highlight: true }, { label: "In kW", value: `${(q / 1000).toFixed(4)} kW` }]; },
    { expression: "Q = k × A × ΔT / d", variables: ["k = thermal conductivity", "d = thickness"] }
  ),
  // Electricity & Magnetism
  makeSci("capacitance-calculator", "Capacitance Calculator", "Calculate capacitance, charge, or voltage using Q = CV.", "Free capacitance calculator. Q = CV.", "Electricity & Magnetism",
    [{ id: "voltage", label: "Voltage (V)", type: "number", defaultValue: 12, step: 0.1 }, { id: "capacitance", label: "Capacitance (µF)", type: "number", defaultValue: 100, step: 1 }],
    (v) => { const c = v.capacitance * 1e-6; const q = c * v.voltage; const energy = 0.5 * c * v.voltage ** 2; return [{ label: "Charge", value: `${(q * 1e6).toFixed(2)} µC`, highlight: true }, { label: "Energy Stored", value: `${(energy * 1000).toFixed(4)} mJ` }, { label: "Capacitance", value: `${v.capacitance} µF` }]; },
    { expression: "Q = C × V; E = ½CV²", variables: ["Q = charge (Coulombs)", "C = capacitance (Farads)"] }
  ),
  makeSci("inductance-calculator", "Inductance Calculator", "Calculate inductance energy using E = ½LI².", "Free inductance calculator.", "Electricity & Magnetism",
    [{ id: "inductance", label: "Inductance (mH)", type: "number", defaultValue: 10, step: 0.1 }, { id: "current", label: "Current (A)", type: "number", defaultValue: 2, step: 0.1 }],
    (v) => { const l = v.inductance * 0.001; const energy = 0.5 * l * v.current ** 2; return [{ label: "Energy Stored", value: `${(energy * 1000).toFixed(4)} mJ`, highlight: true }, { label: "Reactance at 60Hz", value: `${(2 * Math.PI * 60 * l).toFixed(2)} Ω` }]; },
    { expression: "E = ½LI²; X_L = 2πfL", variables: ["L = inductance", "f = frequency"] }
  ),
  makeSci("coulombs-law-calculator", "Coulomb's Law Calculator", "Calculate electrostatic force between two charges.", "Free Coulomb's law calculator.", "Electricity & Magnetism",
    [{ id: "q1", label: "Charge 1 (µC)", type: "number", defaultValue: 1, step: 0.1 }, { id: "q2", label: "Charge 2 (µC)", type: "number", defaultValue: 1, step: 0.1 }, { id: "r", label: "Distance (m)", type: "number", defaultValue: 0.1, step: 0.01 }],
    (v) => { if (v.r === 0) return [{ label: "Error", value: "Distance cannot be zero" }]; const k = 8.9875e9; const f = k * Math.abs(v.q1 * 1e-6) * Math.abs(v.q2 * 1e-6) / (v.r ** 2); return [{ label: "Force", value: `${f.toFixed(4)} N`, highlight: true }, { label: "Direction", value: v.q1 * v.q2 > 0 ? "Repulsive" : "Attractive" }]; },
    { expression: "F = k|q₁q₂|/r²", variables: ["k = 8.988 × 10⁹ N·m²/C²"] }
  ),
  // Waves & Optics
  makeSci("refraction-calculator", "Refraction Calculator", "Calculate angle of refraction using Snell's law: n₁sinθ₁ = n₂sinθ₂.", "Free refraction calculator. Snell's law.", "Waves & Optics",
    [{ id: "n1", label: "Refractive Index n₁", type: "number", defaultValue: 1, step: 0.01 }, { id: "angle1", label: "Angle of Incidence (°)", type: "number", defaultValue: 45, min: 0, max: 89 }, { id: "n2", label: "Refractive Index n₂", type: "number", defaultValue: 1.5, step: 0.01 }],
    (v) => { const sinTheta2 = v.n1 * Math.sin(v.angle1 * Math.PI / 180) / v.n2; if (Math.abs(sinTheta2) > 1) return [{ label: "Result", value: "Total Internal Reflection", highlight: true }]; const theta2 = Math.asin(sinTheta2) * 180 / Math.PI; const critAngle = v.n1 < v.n2 ? "N/A" : `${(Math.asin(v.n2 / v.n1) * 180 / Math.PI).toFixed(1)}°`; return [{ label: "Refracted Angle", value: `${theta2.toFixed(2)}°`, highlight: true }, { label: "Critical Angle", value: critAngle }]; },
    { expression: "n₁ sin θ₁ = n₂ sin θ₂", variables: ["n_air = 1.0", "n_glass ≈ 1.5", "n_water ≈ 1.33"] }
  ),
  makeSci("lens-calculator", "Thin Lens Calculator", "Calculate focal length, image distance, or magnification using 1/f = 1/do + 1/di.", "Free thin lens calculator.", "Waves & Optics",
    [{ id: "focal", label: "Focal Length (cm)", type: "number", defaultValue: 10, step: 0.1 }, { id: "objectDist", label: "Object Distance (cm)", type: "number", defaultValue: 30, step: 0.1 }],
    (v) => { if (v.objectDist === v.focal) return [{ label: "Result", value: "Image at infinity" }]; const di = (v.focal * v.objectDist) / (v.objectDist - v.focal); const mag = -di / v.objectDist; return [{ label: "Image Distance", value: `${di.toFixed(2)} cm`, highlight: true }, { label: "Magnification", value: `${mag.toFixed(3)}×` }, { label: "Image Type", value: di > 0 ? "Real, Inverted" : "Virtual, Upright" }]; },
    { expression: "1/f = 1/do + 1/di", variables: ["f = focal length", "M = -di/do"] }
  ),
  makeSci("doppler-effect-calculator", "Doppler Effect Calculator", "Calculate the observed frequency when a source moves relative to an observer.", "Free Doppler effect calculator.", "Waves & Optics",
    [{ id: "sourceFreq", label: "Source Frequency (Hz)", type: "number", defaultValue: 440, step: 1 }, { id: "sourceSpeed", label: "Source Speed (m/s)", type: "number", defaultValue: 30, step: 1 }, { id: "approaching", label: "Approaching (1) or Receding (0)", type: "number", defaultValue: 1, min: 0, max: 1 }],
    (v) => { const vs = 343; const sign = v.approaching ? -1 : 1; const fo = v.sourceFreq * vs / (vs + sign * v.sourceSpeed); return [{ label: "Observed Frequency", value: `${fo.toFixed(1)} Hz`, highlight: true }, { label: "Frequency Shift", value: `${(fo - v.sourceFreq).toFixed(1)} Hz` }]; },
    { expression: "fo = fs × v / (v ± vs)", variables: ["v = speed of sound (343 m/s)", "− for approaching, + for receding"] }
  ),
  // Astronomy & Space
  makeSci("orbital-velocity-calculator", "Orbital Velocity Calculator", "Calculate orbital velocity for circular orbits around Earth.", "Free orbital velocity calculator.", "Astronomy & Space",
    [{ id: "altitude", label: "Altitude above Earth (km)", type: "number", defaultValue: 400, step: 1 }],
    (v) => { const R = 6371 + v.altitude; const GM = 3.986e14; const vel = Math.sqrt(GM / (R * 1000)); const period = 2 * Math.PI * R * 1000 / vel; return [{ label: "Orbital Velocity", value: `${(vel / 1000).toFixed(2)} km/s`, highlight: true }, { label: "In m/s", value: `${vel.toFixed(0)} m/s` }, { label: "Period", value: `${(period / 60).toFixed(1)} min` }]; },
    { expression: "v = √(GM/r)", variables: ["GM_Earth = 3.986 × 10¹⁴ m³/s²", "r = R_Earth + altitude"] }
  ),
  makeSci("escape-velocity-calculator", "Escape Velocity Calculator", "Calculate the escape velocity from a celestial body.", "Free escape velocity calculator.", "Astronomy & Space",
    [{ id: "mass", label: "Body Mass (×10²⁴ kg)", type: "number", defaultValue: 5.972, step: 0.001 }, { id: "radius", label: "Body Radius (km)", type: "number", defaultValue: 6371, step: 1 }],
    (v) => { const G = 6.674e-11; const m = v.mass * 1e24; const r = v.radius * 1000; const ve = Math.sqrt(2 * G * m / r); return [{ label: "Escape Velocity", value: `${(ve / 1000).toFixed(2)} km/s`, highlight: true }, { label: "In m/s", value: `${ve.toFixed(0)} m/s` }, { label: "In Mach", value: `${(ve / 343).toFixed(1)}` }]; },
    { expression: "v_e = √(2GM/r)", variables: ["Earth: 11.2 km/s", "Moon: 2.4 km/s"] }
  ),
  makeSci("gravitational-force-calculator", "Gravitational Force Calculator", "Calculate gravitational force between two masses using F = Gm₁m₂/r².", "Free gravitational force calculator.", "Astronomy & Space",
    [{ id: "m1", label: "Mass 1 (kg)", type: "number", defaultValue: 5.972e24, step: 1e20 }, { id: "m2", label: "Mass 2 (kg)", type: "number", defaultValue: 70, step: 1 }, { id: "r", label: "Distance (m)", type: "number", defaultValue: 6371000, step: 1000 }],
    (v) => { if (v.r === 0) return [{ label: "Error", value: "Distance cannot be zero" }]; const G = 6.674e-11; const f = G * v.m1 * v.m2 / (v.r ** 2); return [{ label: "Gravitational Force", value: `${f.toFixed(2)} N`, highlight: true }, { label: "In g-equivalent", value: `${(f / (v.m2 * 9.81)).toFixed(4)} g` }]; },
    { expression: "F = Gm₁m₂/r²", variables: ["G = 6.674 × 10⁻¹¹ N·m²/kg²"] }
  ),
  makeSci("light-year-calculator", "Light Year Calculator", "Convert between light-years, parsecs, AU, and kilometers.", "Free light year distance calculator.", "Astronomy & Space",
    [{ id: "ly", label: "Light Years", type: "number", defaultValue: 4.24, step: 0.01 }],
    (v) => { const km = v.ly * 9.461e12; const au = v.ly * 63241; const pc = v.ly * 0.30660; return [{ label: "Light Years", value: `${v.ly}`, highlight: true }, { label: "Parsecs", value: pc.toFixed(4) }, { label: "AU", value: au.toLocaleString() }, { label: "Trillion km", value: (km / 1e12).toFixed(2) }]; },
    { expression: "1 ly = 9.461 × 10¹² km", variables: ["Proxima Centauri ≈ 4.24 ly"] }
  ),
  // Chemistry
  makeSci("dilution-calculator", "Dilution Calculator", "Calculate dilution using C₁V₁ = C₂V₂.", "Free dilution calculator. C₁V₁ = C₂V₂.", "Chemistry",
    [{ id: "c1", label: "Initial Concentration (M)", type: "number", defaultValue: 1, step: 0.01 }, { id: "v1", label: "Initial Volume (mL)", type: "number", defaultValue: 100, step: 1 }, { id: "c2", label: "Final Concentration (M)", type: "number", defaultValue: 0.1, step: 0.01 }],
    (v) => { if (v.c2 === 0) return [{ label: "Error", value: "Final concentration cannot be zero" }]; const v2 = (v.c1 * v.v1) / v.c2; const waterToAdd = v2 - v.v1; return [{ label: "Final Volume", value: `${v2.toFixed(1)} mL`, highlight: true }, { label: "Water to Add", value: `${waterToAdd.toFixed(1)} mL` }, { label: "Dilution Factor", value: `${(v.c1 / v.c2).toFixed(1)}×` }]; },
    { expression: "C₁V₁ = C₂V₂ → V₂ = C₁V₁/C₂", variables: ["Add solvent to increase volume"] }
  ),
  makeSci("stoichiometry-calculator", "Stoichiometry Calculator", "Calculate moles, mass, or volume for chemical reactions.", "Free stoichiometry calculator.", "Chemistry",
    [{ id: "mass", label: "Reactant Mass (g)", type: "number", defaultValue: 36, step: 0.1 }, { id: "molarMass", label: "Molar Mass (g/mol)", type: "number", defaultValue: 18, step: 0.01 }, { id: "ratio", label: "Mole Ratio (product:reactant)", type: "number", defaultValue: 1, step: 0.1 }],
    (v) => { if (v.molarMass === 0) return [{ label: "Error", value: "Molar mass cannot be zero" }]; const moles = v.mass / v.molarMass; const productMoles = moles * v.ratio; return [{ label: "Moles of Reactant", value: moles.toFixed(4), highlight: true }, { label: "Moles of Product", value: productMoles.toFixed(4) }, { label: "Molecules", value: `${(moles * 6.022e23).toExponential(3)}` }]; },
    { expression: "moles = mass / molar mass; product = moles × ratio", variables: ["Avogadro: 6.022 × 10²³"] }
  ),
  makeSci("electrochemistry-calculator", "Electrochemistry Calculator", "Calculate cell potential using E°cell = E°cathode − E°anode.", "Free electrochemistry calculator.", "Chemistry",
    [{ id: "cathode", label: "E° Cathode (V)", type: "number", defaultValue: 0.34, step: 0.01 }, { id: "anode", label: "E° Anode (V)", type: "number", defaultValue: -0.76, step: 0.01 }, { id: "n", label: "Electrons Transferred", type: "number", defaultValue: 2, min: 1 }],
    (v) => { const ecell = v.cathode - v.anode; const dG = -v.n * 96485 * ecell; return [{ label: "E°cell", value: `${ecell.toFixed(3)} V`, highlight: true }, { label: "ΔG°", value: `${(dG / 1000).toFixed(2)} kJ/mol` }, { label: "Spontaneous?", value: ecell > 0 ? "Yes" : "No" }]; },
    { expression: "E°cell = E°cathode − E°anode; ΔG° = −nFE°", variables: ["F = 96,485 C/mol"] }
  ),
  // Nuclear & Radioactivity
  makeSci("radioactive-decay-calculator", "Radioactive Decay Calculator", "Calculate remaining activity after radioactive decay.", "Free radioactive decay calculator.", "Nuclear & Radioactivity",
    [{ id: "activity", label: "Initial Activity (Bq)", type: "number", defaultValue: 1000, step: 1 }, { id: "halfLife", label: "Half-Life (hours)", type: "number", defaultValue: 6, step: 0.1 }, { id: "time", label: "Elapsed Time (hours)", type: "number", defaultValue: 18, step: 0.1 }],
    (v) => { if (v.halfLife <= 0) return [{ label: "Error", value: "Half-life must be > 0" }]; const decay = v.activity * Math.pow(0.5, v.time / v.halfLife); const lambda = Math.log(2) / v.halfLife; return [{ label: "Remaining Activity", value: `${decay.toFixed(2)} Bq`, highlight: true }, { label: "Decay Constant", value: `${lambda.toFixed(6)} /hr` }, { label: "% Remaining", value: `${((decay / v.activity) * 100).toFixed(2)}%` }]; },
    { expression: "A = A₀ × (½)^(t/t½)", variables: ["λ = ln(2)/t½"] }
  ),
  makeSci("nuclear-binding-energy-calculator", "Nuclear Binding Energy Calculator", "Calculate nuclear binding energy from mass defect.", "Free nuclear binding energy calculator.", "Nuclear & Radioactivity",
    [{ id: "protons", label: "Number of Protons", type: "number", defaultValue: 26, min: 1 }, { id: "neutrons", label: "Number of Neutrons", type: "number", defaultValue: 30, min: 0 }, { id: "atomicMass", label: "Atomic Mass (u)", type: "number", defaultValue: 55.845, step: 0.001 }],
    (v) => { const massDefect = v.protons * 1.00728 + v.neutrons * 1.00866 - v.atomicMass; const be = massDefect * 931.5; const bePerNucleon = be / (v.protons + v.neutrons); return [{ label: "Binding Energy", value: `${be.toFixed(2)} MeV`, highlight: true }, { label: "BE per Nucleon", value: `${bePerNucleon.toFixed(2)} MeV` }, { label: "Mass Defect", value: `${massDefect.toFixed(4)} u` }]; },
    { expression: "BE = Δm × 931.5 MeV/u", variables: ["Δm = Z×m_p + N×m_n − M_atom"] }
  ),
  // Fluid Mechanics
  makeSci("buoyancy-calculator", "Buoyancy Calculator", "Calculate buoyant force using Archimedes' principle.", "Free buoyancy calculator. Archimedes' principle.", "Fluid Mechanics",
    [{ id: "volume", label: "Submerged Volume (m³)", type: "number", defaultValue: 0.01, step: 0.001 }, { id: "fluidDensity", label: "Fluid Density (kg/m³)", type: "number", defaultValue: 1000, step: 1 }],
    (v) => { const force = v.fluidDensity * v.volume * 9.81; return [{ label: "Buoyant Force", value: `${force.toFixed(2)} N`, highlight: true }, { label: "Weight of Displaced Fluid", value: `${(v.fluidDensity * v.volume).toFixed(2)} kg` }]; },
    { expression: "F_b = ρ × V × g", variables: ["ρ = fluid density", "V = submerged volume"] }
  ),
  makeSci("bernoulli-calculator", "Bernoulli's Equation Calculator", "Calculate fluid velocity or pressure using Bernoulli's principle.", "Free Bernoulli equation calculator.", "Fluid Mechanics",
    [{ id: "p1", label: "Pressure 1 (Pa)", type: "number", defaultValue: 101325, step: 100 }, { id: "v1", label: "Velocity 1 (m/s)", type: "number", defaultValue: 2, step: 0.1 }, { id: "h1", label: "Height 1 (m)", type: "number", defaultValue: 0, step: 0.1 }, { id: "h2", label: "Height 2 (m)", type: "number", defaultValue: 5, step: 0.1 }],
    (v) => { const rho = 1000; const p2 = v.p1 + 0.5 * rho * v.v1 ** 2 + rho * 9.81 * v.h1 - rho * 9.81 * v.h2 - 0.5 * rho * v.v1 ** 2; return [{ label: "Pressure at Point 2", value: `${p2.toFixed(0)} Pa`, highlight: true }, { label: "In kPa", value: `${(p2 / 1000).toFixed(2)} kPa` }, { label: "Pressure Change", value: `${(p2 - v.p1).toFixed(0)} Pa` }]; },
    { expression: "P₁ + ½ρv₁² + ρgh₁ = P₂ + ½ρv₂² + ρgh₂", variables: ["For incompressible, non-viscous flow"] }
  ),
  makeSci("reynolds-number-calculator", "Reynolds Number Calculator", "Calculate the Reynolds number to determine flow regime.", "Free Reynolds number calculator.", "Fluid Mechanics",
    [{ id: "velocity", label: "Flow Velocity (m/s)", type: "number", defaultValue: 2, step: 0.1 }, { id: "diameter", label: "Pipe Diameter (m)", type: "number", defaultValue: 0.05, step: 0.001 }, { id: "viscosity", label: "Kinematic Viscosity (m²/s)", type: "number", defaultValue: 0.000001, step: 0.0000001 }],
    (v) => { if (v.viscosity === 0) return [{ label: "Error", value: "Viscosity cannot be zero" }]; const re = v.velocity * v.diameter / v.viscosity; const regime = re < 2300 ? "Laminar" : re < 4000 ? "Transitional" : "Turbulent"; return [{ label: "Reynolds Number", value: re.toFixed(0), highlight: true }, { label: "Flow Regime", value: regime }]; },
    { expression: "Re = vD/ν", variables: ["Re < 2300: Laminar", "Re > 4000: Turbulent"] }
  ),
  // Earth Science
  makeSci("earthquake-magnitude-calculator", "Earthquake Energy Calculator", "Calculate energy released by earthquakes on the Richter scale.", "Free earthquake energy calculator.", "Earth Science",
    [{ id: "magnitude", label: "Magnitude (Richter)", type: "number", defaultValue: 6, step: 0.1 }],
    (v) => { const energy = Math.pow(10, 1.5 * v.magnitude + 4.8); const tnt = energy / 4.184e9; return [{ label: "Energy Released", value: `${energy.toExponential(2)} J`, highlight: true }, { label: "TNT Equivalent", value: `${tnt.toExponential(2)} tons` }, { label: "30× more than", value: `Magnitude ${(v.magnitude - 1).toFixed(1)}` }]; },
    { expression: "log₁₀E = 1.5M + 4.8", variables: ["Each magnitude step ≈ 31.6× more energy"] }
  ),
  makeSci("atmospheric-pressure-calculator", "Atmospheric Pressure Calculator", "Calculate atmospheric pressure at altitude using barometric formula.", "Free atmospheric pressure at altitude calculator.", "Earth Science",
    [{ id: "altitude", label: "Altitude (m)", type: "number", defaultValue: 3000, step: 100 }],
    (v) => { const p = 101325 * Math.pow(1 - 2.25577e-5 * v.altitude, 5.25588); return [{ label: "Pressure", value: `${p.toFixed(0)} Pa`, highlight: true }, { label: "In atm", value: (p / 101325).toFixed(4) }, { label: "In mmHg", value: (p / 133.322).toFixed(1) }, { label: "% of Sea Level", value: `${((p / 101325) * 100).toFixed(1)}%` }]; },
    { expression: "P = P₀(1 − 2.256×10⁻⁵h)^5.256", variables: ["Barometric formula", "P₀ = 101325 Pa at sea level"] }
  ),
];
