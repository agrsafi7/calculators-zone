import { CalculatorConfig } from "@/components/CalculatorTemplate";

const rel = (exclude: string) => [
  { name: "Length Converter", slug: "length-converter", icon: "convert", category: "conversions" },
  { name: "Weight Converter", slug: "weight-converter", icon: "convert", category: "conversions" },
  { name: "Temperature Converter", slug: "temperature-converter", icon: "convert", category: "conversions" },
].filter(c => c.slug !== exclude);

const mc = (slug: string, name: string, desc: string, meta: string, subcategory: string, inputs: CalculatorConfig["inputs"], calculate: CalculatorConfig["calculate"], formula: CalculatorConfig["formula"]): CalculatorConfig => ({
  slug, name, category: "Units", categorySlug: "conversions", description: desc, metaDescription: meta, icon: "convert", subcategory,
  inputs, calculate, formula,
  howToUse: `Enter a value to convert using the ${name}.`,
  faqs: [{ question: `How does the ${name} work?`, answer: `It converts between related units using standard conversion factors.` }],
  relatedCalcs: rel(slug),
});

export const conversionCalculatorsExtended: CalculatorConfig[] = [

  // ═══════════════════════════════════════════
  // ENGINEERING UNIT CONVERTERS
  // ═══════════════════════════════════════════

  mc("torque-converter-eng", "Torque Converter", "Convert between N·m, lb·ft, kg·cm, oz·in, and dyne·cm.", "Free torque converter.", "Energy & Power",
    [{ id: "value", label: "Value", type: "number", defaultValue: 100, step: 0.01 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "N·m" }, { value: 1, label: "lb·ft" }, { value: 2, label: "kg·cm" }, { value: 3, label: "oz·in" }] }],
    (v) => { const toNm = [1, 1.35582, 0.0980665, 0.00706155]; const nm = v.value * toNm[v.from]; return [{ label: "N·m", value: nm.toFixed(4), highlight: true }, { label: "lb·ft", value: (nm / 1.35582).toFixed(4) }, { label: "kg·cm", value: (nm / 0.0980665).toFixed(2) }, { label: "oz·in", value: (nm / 0.00706155).toFixed(2) }]; },
    { expression: "Convert to N·m, then to target", variables: ["1 lb·ft = 1.356 N·m"] }
  ),

  mc("power-converter-eng", "Power Converter (Engineering)", "Convert between watts, kW, HP, BTU/h, and ft·lbf/s.", "Free engineering power converter.", "Energy & Power",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1000, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Watts" }, { value: 1, label: "Kilowatts" }, { value: 2, label: "Horsepower" }, { value: 3, label: "BTU/h" }, { value: 4, label: "ft·lbf/s" }] }],
    (v) => { const toW = [1, 1000, 745.7, 0.293071, 1.35582]; const w = v.value * toW[v.from]; return [{ label: "Watts", value: w.toFixed(2), highlight: true }, { label: "Kilowatts", value: (w / 1000).toFixed(4) }, { label: "Horsepower", value: (w / 745.7).toFixed(4) }, { label: "BTU/h", value: (w / 0.293071).toFixed(2) }, { label: "ft·lbf/s", value: (w / 1.35582).toFixed(2) }]; },
    { expression: "Convert to watts, then to target", variables: ["1 HP = 745.7 W"] }
  ),

  mc("acceleration-converter-eng", "Acceleration Converter", "Convert between m/s², ft/s², g-force, and Gal.", "Free acceleration converter.", "Speed",
    [{ id: "value", label: "Value", type: "number", defaultValue: 9.81, step: 0.01 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "m/s²" }, { value: 1, label: "ft/s²" }, { value: 2, label: "g-force" }, { value: 3, label: "Gal (cm/s²)" }] }],
    (v) => { const toMs2 = [1, 0.3048, 9.80665, 0.01]; const ms2 = v.value * toMs2[v.from]; return [{ label: "m/s²", value: ms2.toFixed(4), highlight: true }, { label: "ft/s²", value: (ms2 / 0.3048).toFixed(4) }, { label: "g-force", value: (ms2 / 9.80665).toFixed(6) }, { label: "Gal", value: (ms2 * 100).toFixed(2) }]; },
    { expression: "Convert to m/s², then to target", variables: ["1 g = 9.80665 m/s²"] }
  ),

  mc("angular-velocity-converter", "Angular Velocity Converter", "Convert between rad/s, deg/s, RPM, and rev/s.", "Free angular velocity converter.", "Speed",
    [{ id: "value", label: "Value", type: "number", defaultValue: 100, step: 0.1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "rad/s" }, { value: 1, label: "deg/s" }, { value: 2, label: "RPM" }, { value: 3, label: "rev/s" }] }],
    (v) => { const toRad = [1, Math.PI / 180, Math.PI / 30, 2 * Math.PI]; const rad = v.value * toRad[v.from]; return [{ label: "rad/s", value: rad.toFixed(4), highlight: true }, { label: "deg/s", value: (rad * 180 / Math.PI).toFixed(2) }, { label: "RPM", value: (rad * 30 / Math.PI).toFixed(2) }, { label: "rev/s", value: (rad / (2 * Math.PI)).toFixed(4) }]; },
    { expression: "Convert to rad/s, then to target", variables: ["1 RPM = π/30 rad/s"] }
  ),

  mc("angular-acceleration-converter", "Angular Acceleration Converter", "Convert between rad/s², deg/s², and rev/s².", "Free angular acceleration converter.", "Speed",
    [{ id: "value", label: "Value", type: "number", defaultValue: 10, step: 0.01 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "rad/s²" }, { value: 1, label: "deg/s²" }, { value: 2, label: "rev/s²" }] }],
    (v) => { const toRad = [1, Math.PI / 180, 2 * Math.PI]; const rad = v.value * toRad[v.from]; return [{ label: "rad/s²", value: rad.toFixed(4), highlight: true }, { label: "deg/s²", value: (rad * 180 / Math.PI).toFixed(2) }, { label: "rev/s²", value: (rad / (2 * Math.PI)).toFixed(4) }]; },
    { expression: "Convert to rad/s², then to target", variables: ["1 rev/s² = 2π rad/s²"] }
  ),

  mc("moment-of-inertia-converter", "Moment of Inertia Converter", "Convert between kg·m², g·cm², lb·ft², and slug·ft².", "Free moment of inertia converter.", "Energy & Power",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1, step: 0.001 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "kg·m²" }, { value: 1, label: "g·cm²" }, { value: 2, label: "lb·ft²" }, { value: 3, label: "slug·ft²" }] }],
    (v) => { const toKgm2 = [1, 1e-7, 0.0421401, 1.35582]; const kgm2 = v.value * toKgm2[v.from]; return [{ label: "kg·m²", value: kgm2.toFixed(6), highlight: true }, { label: "g·cm²", value: (kgm2 * 1e7).toFixed(1) }, { label: "lb·ft²", value: (kgm2 / 0.0421401).toFixed(4) }, { label: "slug·ft²", value: (kgm2 / 1.35582).toFixed(6) }]; },
    { expression: "Convert to kg·m², then to target", variables: ["1 slug·ft² = 1.356 kg·m²"] }
  ),

  mc("moment-of-force-converter", "Moment of Force Converter", "Convert between N·m, kN·m, lb·ft, and kgf·m.", "Free moment of force converter.", "Energy & Power",
    [{ id: "value", label: "Value", type: "number", defaultValue: 50, step: 0.1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "N·m" }, { value: 1, label: "kN·m" }, { value: 2, label: "lb·ft" }, { value: 3, label: "kgf·m" }] }],
    (v) => { const toNm = [1, 1000, 1.35582, 9.80665]; const nm = v.value * toNm[v.from]; return [{ label: "N·m", value: nm.toFixed(4), highlight: true }, { label: "kN·m", value: (nm / 1000).toFixed(6) }, { label: "lb·ft", value: (nm / 1.35582).toFixed(4) }, { label: "kgf·m", value: (nm / 9.80665).toFixed(4) }]; },
    { expression: "Convert to N·m, then to target", variables: ["1 kgf·m = 9.807 N·m"] }
  ),

  mc("specific-weight-converter", "Specific Weight Converter", "Convert between N/m³, kN/m³, lbf/ft³, and kgf/m³.", "Free specific weight converter.", "Material Properties",
    [{ id: "value", label: "Value", type: "number", defaultValue: 9810, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "N/m³" }, { value: 1, label: "kN/m³" }, { value: 2, label: "lbf/ft³" }, { value: 3, label: "kgf/m³" }] }],
    (v) => { const toNm3 = [1, 1000, 157.087, 9.80665]; const nm3 = v.value * toNm3[v.from]; return [{ label: "N/m³", value: nm3.toFixed(2), highlight: true }, { label: "kN/m³", value: (nm3 / 1000).toFixed(4) }, { label: "lbf/ft³", value: (nm3 / 157.087).toFixed(4) }, { label: "kgf/m³", value: (nm3 / 9.80665).toFixed(2) }]; },
    { expression: "Convert to N/m³, then to target", variables: ["Water ≈ 9810 N/m³"] }
  ),

  mc("mass-moment-of-inertia-converter", "Mass Moment of Inertia Converter", "Convert between kg·m², lb·in², and oz·in².", "Free mass moment of inertia converter.", "Energy & Power",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1, step: 0.001 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "kg·m²" }, { value: 1, label: "lb·in²" }, { value: 2, label: "oz·in²" }] }],
    (v) => { const toKgm2 = [1, 0.000292640, 0.0000182900]; const kgm2 = v.value * toKgm2[v.from]; return [{ label: "kg·m²", value: kgm2.toFixed(6), highlight: true }, { label: "lb·in²", value: (kgm2 / 0.000292640).toFixed(2) }, { label: "oz·in²", value: (kgm2 / 0.0000182900).toFixed(1) }]; },
    { expression: "Convert to kg·m², then to target", variables: ["1 lb·in² = 2.926e-4 kg·m²"] }
  ),

  mc("mechanical-work-converter", "Mechanical Work Converter", "Convert between joules, ft·lbf, kWh, and calorie.", "Free mechanical work converter.", "Energy & Power",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1000, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Joules" }, { value: 1, label: "ft·lbf" }, { value: 2, label: "kWh" }, { value: 3, label: "Calories" }] }],
    (v) => { const toJ = [1, 1.35582, 3.6e6, 4.184]; const j = v.value * toJ[v.from]; return [{ label: "Joules", value: j.toFixed(2), highlight: true }, { label: "ft·lbf", value: (j / 1.35582).toFixed(2) }, { label: "kWh", value: (j / 3.6e6).toFixed(8) }, { label: "Calories", value: (j / 4.184).toFixed(2) }]; },
    { expression: "Convert to joules, then to target", variables: ["1 ft·lbf = 1.356 J"] }
  ),

  mc("power-to-weight-ratio-converter", "Power-to-Weight Ratio Converter", "Convert between W/kg, HP/ton, kW/kg, and HP/lb.", "Free power-to-weight ratio converter.", "Energy & Power",
    [{ id: "value", label: "Value", type: "number", defaultValue: 100, step: 0.1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "W/kg" }, { value: 1, label: "HP/ton" }, { value: 2, label: "kW/kg" }, { value: 3, label: "HP/lb" }] }],
    (v) => { const toWkg = [1, 0.7457, 1000, 1643.99]; const wkg = v.value * toWkg[v.from]; return [{ label: "W/kg", value: wkg.toFixed(2), highlight: true }, { label: "HP/ton", value: (wkg / 0.7457).toFixed(2) }, { label: "kW/kg", value: (wkg / 1000).toFixed(6) }, { label: "HP/lb", value: (wkg / 1643.99).toFixed(6) }]; },
    { expression: "Convert to W/kg, then to target", variables: ["F1 car ≈ 1300 W/kg"] }
  ),

  mc("rotational-speed-converter", "Rotational Speed Converter", "Convert between RPM, rad/s, deg/s, and Hz.", "Free rotational speed converter.", "Speed",
    [{ id: "value", label: "Value", type: "number", defaultValue: 3000, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "RPM" }, { value: 1, label: "rad/s" }, { value: 2, label: "Hz" }] }],
    (v) => { const toRPM = [1, 30 / Math.PI, 60]; const rpm = v.value * toRPM[v.from]; return [{ label: "RPM", value: rpm.toFixed(2), highlight: true }, { label: "rad/s", value: (rpm * Math.PI / 30).toFixed(4) }, { label: "Hz", value: (rpm / 60).toFixed(4) }, { label: "deg/s", value: (rpm * 6).toFixed(2) }]; },
    { expression: "1 RPM = 2π/60 rad/s", variables: ["1 Hz = 60 RPM"] }
  ),

  mc("rotational-energy-converter", "Rotational Energy Converter", "Calculate and convert rotational kinetic energy.", "Free rotational energy converter.", "Energy & Power",
    [{ id: "inertia", label: "Moment of Inertia (kg·m²)", type: "number", defaultValue: 0.5, step: 0.01 }, { id: "rpm", label: "Speed (RPM)", type: "number", defaultValue: 3000, step: 1 }],
    (v) => { const omega = v.rpm * Math.PI / 30; const e = 0.5 * v.inertia * omega * omega; return [{ label: "Energy (Joules)", value: e.toFixed(2), highlight: true }, { label: "Energy (kJ)", value: (e / 1000).toFixed(4) }, { label: "Energy (kWh)", value: (e / 3.6e6).toFixed(8) }, { label: "Energy (ft·lbf)", value: (e / 1.35582).toFixed(2) }]; },
    { expression: "E = ½Iω²", variables: ["ω = RPM × π/30"] }
  ),

  // ═══════════════════════════════════════════
  // ENERGY & ELECTRICITY CONVERTERS
  // ═══════════════════════════════════════════

  mc("electric-current-converter", "Electric Current Converter", "Convert between amperes, milliamperes, microamperes, and kiloamperes.", "Free electric current converter.", "Electricity",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1, step: 0.001 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Amperes (A)" }, { value: 1, label: "Milliamperes (mA)" }, { value: 2, label: "Microamperes (µA)" }, { value: 3, label: "Kiloamperes (kA)" }] }],
    (v) => { const toA = [1, 0.001, 1e-6, 1000]; const a = v.value * toA[v.from]; return [{ label: "Amperes", value: a.toFixed(6), highlight: true }, { label: "Milliamperes", value: (a * 1000).toFixed(3) }, { label: "Microamperes", value: (a * 1e6).toFixed(1) }, { label: "Kiloamperes", value: (a / 1000).toFixed(9) }]; },
    { expression: "Convert to amperes, then to target", variables: ["1 A = 1000 mA"] }
  ),

  mc("electric-charge-converter", "Electric Charge Converter", "Convert between coulombs, milliampere-hours, ampere-hours, and faradays.", "Free electric charge converter.", "Electricity",
    [{ id: "value", label: "Value", type: "number", defaultValue: 3600, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Coulombs (C)" }, { value: 1, label: "mAh" }, { value: 2, label: "Ah" }, { value: 3, label: "Faradays" }] }],
    (v) => { const toC = [1, 3.6, 3600, 96485.3]; const c = v.value * toC[v.from]; return [{ label: "Coulombs", value: c.toFixed(2), highlight: true }, { label: "mAh", value: (c / 3.6).toFixed(2) }, { label: "Ah", value: (c / 3600).toFixed(4) }, { label: "Faradays", value: (c / 96485.3).toFixed(6) }]; },
    { expression: "Convert to coulombs, then to target", variables: ["1 Ah = 3600 C"] }
  ),

  mc("electric-potential-converter", "Electric Potential Converter", "Convert between volts, millivolts, kilovolts, and megavolts.", "Free electric potential converter.", "Electricity",
    [{ id: "value", label: "Value", type: "number", defaultValue: 220, step: 0.1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Volts (V)" }, { value: 1, label: "Millivolts (mV)" }, { value: 2, label: "Kilovolts (kV)" }, { value: 3, label: "Megavolts (MV)" }] }],
    (v) => { const toV = [1, 0.001, 1000, 1e6]; const vol = v.value * toV[v.from]; return [{ label: "Volts", value: vol.toFixed(4), highlight: true }, { label: "Millivolts", value: (vol * 1000).toFixed(1) }, { label: "Kilovolts", value: (vol / 1000).toFixed(6) }, { label: "Megavolts", value: (vol / 1e6).toFixed(9) }]; },
    { expression: "Convert to volts, then to target", variables: ["1 kV = 1000 V"] }
  ),

  mc("electric-resistance-converter", "Electric Resistance Converter", "Convert between ohms, kilohms, megohms, and milliohms.", "Free electric resistance converter.", "Electricity",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1000, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Ohms (Ω)" }, { value: 1, label: "Kilohms (kΩ)" }, { value: 2, label: "Megohms (MΩ)" }, { value: 3, label: "Milliohms (mΩ)" }] }],
    (v) => { const toOhm = [1, 1000, 1e6, 0.001]; const ohm = v.value * toOhm[v.from]; return [{ label: "Ohms", value: ohm.toFixed(4), highlight: true }, { label: "Kilohms", value: (ohm / 1000).toFixed(4) }, { label: "Megohms", value: (ohm / 1e6).toFixed(6) }, { label: "Milliohms", value: (ohm * 1000).toFixed(1) }]; },
    { expression: "Convert to ohms, then to target", variables: ["1 kΩ = 1000 Ω"] }
  ),

  mc("electric-conductance-converter", "Electric Conductance Converter", "Convert between siemens, millisiemens, and microsiemens.", "Free electric conductance converter.", "Electricity",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1, step: 0.001 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Siemens (S)" }, { value: 1, label: "Millisiemens (mS)" }, { value: 2, label: "Microsiemens (µS)" }] }],
    (v) => { const toS = [1, 0.001, 1e-6]; const s = v.value * toS[v.from]; return [{ label: "Siemens", value: s.toFixed(6), highlight: true }, { label: "Millisiemens", value: (s * 1000).toFixed(3) }, { label: "Microsiemens", value: (s * 1e6).toFixed(1) }]; },
    { expression: "Conductance = 1/Resistance", variables: ["1 S = 1/Ω"] }
  ),

  mc("capacitance-converter", "Capacitance Converter", "Convert between farads, microfarads, nanofarads, and picofarads.", "Free capacitance converter.", "Electricity",
    [{ id: "value", label: "Value", type: "number", defaultValue: 100, step: 0.1 }, { id: "from", label: "From", type: "select", defaultValue: 1, options: [{ value: 0, label: "Farads (F)" }, { value: 1, label: "Microfarads (µF)" }, { value: 2, label: "Nanofarads (nF)" }, { value: 3, label: "Picofarads (pF)" }] }],
    (v) => { const toF = [1, 1e-6, 1e-9, 1e-12]; const f = v.value * toF[v.from]; return [{ label: "Farads", value: f.toExponential(4), highlight: true }, { label: "Microfarads", value: (f * 1e6).toFixed(4) }, { label: "Nanofarads", value: (f * 1e9).toFixed(2) }, { label: "Picofarads", value: (f * 1e12).toFixed(1) }]; },
    { expression: "Convert to farads, then to target", variables: ["1 µF = 10⁻⁶ F"] }
  ),

  mc("inductance-converter", "Inductance Converter", "Convert between henries, millihenries, microhenries, and nanohenries.", "Free inductance converter.", "Electricity",
    [{ id: "value", label: "Value", type: "number", defaultValue: 10, step: 0.1 }, { id: "from", label: "From", type: "select", defaultValue: 1, options: [{ value: 0, label: "Henries (H)" }, { value: 1, label: "Millihenries (mH)" }, { value: 2, label: "Microhenries (µH)" }, { value: 3, label: "Nanohenries (nH)" }] }],
    (v) => { const toH = [1, 0.001, 1e-6, 1e-9]; const h = v.value * toH[v.from]; return [{ label: "Henries", value: h.toExponential(4), highlight: true }, { label: "Millihenries", value: (h * 1000).toFixed(4) }, { label: "Microhenries", value: (h * 1e6).toFixed(2) }, { label: "Nanohenries", value: (h * 1e9).toFixed(1) }]; },
    { expression: "Convert to henries, then to target", variables: ["1 mH = 10⁻³ H"] }
  ),

  mc("magnetic-flux-converter", "Magnetic Flux Converter", "Convert between webers, maxwells, and milliwebers.", "Free magnetic flux converter.", "Electricity",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1, step: 0.001 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Webers (Wb)" }, { value: 1, label: "Maxwells (Mx)" }, { value: 2, label: "Milliwebers (mWb)" }] }],
    (v) => { const toWb = [1, 1e-8, 0.001]; const wb = v.value * toWb[v.from]; return [{ label: "Webers", value: wb.toFixed(6), highlight: true }, { label: "Maxwells", value: (wb * 1e8).toFixed(1) }, { label: "Milliwebers", value: (wb * 1000).toFixed(3) }]; },
    { expression: "1 Wb = 10⁸ Mx", variables: ["Weber is the SI unit"] }
  ),

  mc("magnetic-field-strength-converter", "Magnetic Field Strength Converter", "Convert between A/m, Oersteds, and kA/m.", "Free magnetic field strength converter.", "Electricity",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1000, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "A/m" }, { value: 1, label: "Oersteds (Oe)" }, { value: 2, label: "kA/m" }] }],
    (v) => { const toAm = [1, 79.5775, 1000]; const am = v.value * toAm[v.from]; return [{ label: "A/m", value: am.toFixed(2), highlight: true }, { label: "Oersteds", value: (am / 79.5775).toFixed(4) }, { label: "kA/m", value: (am / 1000).toFixed(4) }]; },
    { expression: "1 Oe = 79.577 A/m", variables: ["A/m is the SI unit"] }
  ),

  mc("electric-field-strength-converter", "Electric Field Strength Converter", "Convert between V/m, kV/m, V/cm, and MV/m.", "Free electric field strength converter.", "Electricity",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1000, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "V/m" }, { value: 1, label: "kV/m" }, { value: 2, label: "V/cm" }, { value: 3, label: "MV/m" }] }],
    (v) => { const toVm = [1, 1000, 100, 1e6]; const vm = v.value * toVm[v.from]; return [{ label: "V/m", value: vm.toFixed(2), highlight: true }, { label: "kV/m", value: (vm / 1000).toFixed(4) }, { label: "V/cm", value: (vm / 100).toFixed(4) }, { label: "MV/m", value: (vm / 1e6).toFixed(8) }]; },
    { expression: "Convert to V/m, then to target", variables: ["1 kV/m = 1000 V/m"] }
  ),

  mc("power-density-converter", "Power Density Converter", "Convert between W/m², kW/m², W/cm², and BTU/(h·ft²).", "Free power density converter.", "Electricity",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1000, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "W/m²" }, { value: 1, label: "kW/m²" }, { value: 2, label: "W/cm²" }, { value: 3, label: "BTU/(h·ft²)" }] }],
    (v) => { const toWm2 = [1, 1000, 10000, 3.15459]; const wm2 = v.value * toWm2[v.from]; return [{ label: "W/m²", value: wm2.toFixed(2), highlight: true }, { label: "kW/m²", value: (wm2 / 1000).toFixed(4) }, { label: "W/cm²", value: (wm2 / 10000).toFixed(6) }, { label: "BTU/(h·ft²)", value: (wm2 / 3.15459).toFixed(2) }]; },
    { expression: "Convert to W/m², then to target", variables: ["Solar constant ≈ 1361 W/m²"] }
  ),

  mc("energy-density-converter", "Energy Density Converter", "Convert between J/m³, kJ/m³, Wh/L, and BTU/ft³.", "Free energy density converter.", "Electricity",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1000, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "J/m³" }, { value: 1, label: "kJ/m³" }, { value: 2, label: "Wh/L" }, { value: 3, label: "BTU/ft³" }] }],
    (v) => { const toJm3 = [1, 1000, 3600, 37259.5]; const jm3 = v.value * toJm3[v.from]; return [{ label: "J/m³", value: jm3.toFixed(2), highlight: true }, { label: "kJ/m³", value: (jm3 / 1000).toFixed(4) }, { label: "Wh/L", value: (jm3 / 3600).toFixed(4) }, { label: "BTU/ft³", value: (jm3 / 37259.5).toFixed(6) }]; },
    { expression: "Convert to J/m³, then to target", variables: ["1 Wh/L = 3600 J/m³"] }
  ),

  mc("electric-power-converter", "Electric Power Converter", "Convert between watts, kilowatts, megawatts, and volt-amperes.", "Free electric power converter.", "Electricity",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1500, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Watts (W)" }, { value: 1, label: "Kilowatts (kW)" }, { value: 2, label: "Megawatts (MW)" }, { value: 3, label: "Volt-Amperes (VA)" }] }],
    (v) => { const toW = [1, 1000, 1e6, 1]; const w = v.value * toW[v.from]; return [{ label: "Watts", value: w.toFixed(2), highlight: true }, { label: "Kilowatts", value: (w / 1000).toFixed(4) }, { label: "Megawatts", value: (w / 1e6).toFixed(6) }, { label: "Volt-Amperes", value: w.toFixed(2) }]; },
    { expression: "Convert to watts, then to target", variables: ["W = V × A (for DC)"] }
  ),

  mc("electric-energy-converter", "Electric Energy Converter", "Convert between kWh, Wh, MWh, and joules.", "Free electric energy converter.", "Electricity",
    [{ id: "value", label: "Value", type: "number", defaultValue: 100, step: 0.1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "kWh" }, { value: 1, label: "Wh" }, { value: 2, label: "MWh" }, { value: 3, label: "Joules" }] }],
    (v) => { const toKwh = [1, 0.001, 1000, 1 / 3.6e6]; const kwh = v.value * toKwh[v.from]; return [{ label: "kWh", value: kwh.toFixed(4), highlight: true }, { label: "Wh", value: (kwh * 1000).toFixed(1) }, { label: "MWh", value: (kwh / 1000).toFixed(6) }, { label: "Joules", value: (kwh * 3.6e6).toFixed(0) }]; },
    { expression: "1 kWh = 3.6 × 10⁶ J", variables: ["kWh is used for billing"] }
  ),

  mc("reactive-power-converter", "Reactive Power Converter", "Convert between VAR, kVAR, MVAR.", "Free reactive power converter.", "Electricity",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1000, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "VAR" }, { value: 1, label: "kVAR" }, { value: 2, label: "MVAR" }] }],
    (v) => { const toVar = [1, 1000, 1e6]; const va = v.value * toVar[v.from]; return [{ label: "VAR", value: va.toFixed(2), highlight: true }, { label: "kVAR", value: (va / 1000).toFixed(4) }, { label: "MVAR", value: (va / 1e6).toFixed(6) }]; },
    { expression: "Convert to VAR, then to target", variables: ["VAR = Volt-Ampere Reactive"] }
  ),

  mc("apparent-power-converter", "Apparent Power Converter", "Convert between VA, kVA, and MVA.", "Free apparent power converter.", "Electricity",
    [{ id: "value", label: "Value", type: "number", defaultValue: 5000, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "VA" }, { value: 1, label: "kVA" }, { value: 2, label: "MVA" }] }],
    (v) => { const toVA = [1, 1000, 1e6]; const va = v.value * toVA[v.from]; return [{ label: "VA", value: va.toFixed(2), highlight: true }, { label: "kVA", value: (va / 1000).toFixed(4) }, { label: "MVA", value: (va / 1e6).toFixed(6) }]; },
    { expression: "S = V × I", variables: ["VA = Volt-Ampere"] }
  ),

  // ═══════════════════════════════════════════
  // RADIATION & NUCLEAR CONVERTERS
  // ═══════════════════════════════════════════

  mc("radiation-exposure-converter", "Radiation Exposure Converter", "Convert between C/kg, roentgens, and mR.", "Free radiation exposure converter.", "Radiation",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1, step: 0.001 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "C/kg" }, { value: 1, label: "Roentgens (R)" }, { value: 2, label: "Milliroentgens (mR)" }] }],
    (v) => { const toCkg = [1, 2.58e-4, 2.58e-7]; const ckg = v.value * toCkg[v.from]; return [{ label: "C/kg", value: ckg.toExponential(4), highlight: true }, { label: "Roentgens", value: (ckg / 2.58e-4).toFixed(4) }, { label: "Milliroentgens", value: (ckg / 2.58e-7).toFixed(1) }]; },
    { expression: "1 R = 2.58 × 10⁻⁴ C/kg", variables: ["Roentgen measures ionization"] }
  ),

  mc("radiation-absorbed-dose-converter", "Radiation Absorbed Dose Converter", "Convert between gray, rad, milligray, and centigray.", "Free radiation absorbed dose converter.", "Radiation",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1, step: 0.01 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Gray (Gy)" }, { value: 1, label: "Rad" }, { value: 2, label: "Milligray (mGy)" }, { value: 3, label: "Centigray (cGy)" }] }],
    (v) => { const toGy = [1, 0.01, 0.001, 0.01]; const gy = v.value * toGy[v.from]; return [{ label: "Gray", value: gy.toFixed(6), highlight: true }, { label: "Rad", value: (gy * 100).toFixed(4) }, { label: "Milligray", value: (gy * 1000).toFixed(3) }, { label: "Centigray", value: (gy * 100).toFixed(4) }]; },
    { expression: "1 Gy = 100 rad", variables: ["Gray is the SI unit"] }
  ),

  mc("radioactivity-converter", "Radioactivity Converter", "Convert between becquerels, curies, and disintegrations/s.", "Free radioactivity converter.", "Radiation",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1, step: 0.001 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Becquerels (Bq)" }, { value: 1, label: "Curies (Ci)" }, { value: 2, label: "Millicuries (mCi)" }] }],
    (v) => { const toBq = [1, 3.7e10, 3.7e7]; const bq = v.value * toBq[v.from]; return [{ label: "Becquerels", value: bq.toExponential(4), highlight: true }, { label: "Curies", value: (bq / 3.7e10).toExponential(4) }, { label: "Millicuries", value: (bq / 3.7e7).toFixed(4) }, { label: "kBq", value: (bq / 1000).toFixed(2) }]; },
    { expression: "1 Ci = 3.7 × 10¹⁰ Bq", variables: ["Bq = disintegrations/s"] }
  ),

  mc("radiation-equivalent-dose-converter", "Radiation Equivalent Dose Converter", "Convert between sieverts, rem, millisieverts, and microsieverts.", "Free radiation equivalent dose converter.", "Radiation",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1, step: 0.001 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Sieverts (Sv)" }, { value: 1, label: "rem" }, { value: 2, label: "Millisieverts (mSv)" }, { value: 3, label: "Microsieverts (µSv)" }] }],
    (v) => { const toSv = [1, 0.01, 0.001, 1e-6]; const sv = v.value * toSv[v.from]; return [{ label: "Sieverts", value: sv.toFixed(6), highlight: true }, { label: "rem", value: (sv * 100).toFixed(4) }, { label: "Millisieverts", value: (sv * 1000).toFixed(3) }, { label: "Microsieverts", value: (sv * 1e6).toFixed(1) }]; },
    { expression: "1 Sv = 100 rem", variables: ["Annual limit ≈ 1 mSv (public)"] }
  ),

  mc("radiation-activity-converter", "Radiation Activity Converter", "Convert between Bq, kBq, MBq, GBq, and Ci.", "Free radiation activity converter.", "Radiation",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1000, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 2, options: [{ value: 0, label: "Bq" }, { value: 1, label: "kBq" }, { value: 2, label: "MBq" }, { value: 3, label: "GBq" }] }],
    (v) => { const toBq = [1, 1000, 1e6, 1e9]; const bq = v.value * toBq[v.from]; return [{ label: "Bq", value: bq.toExponential(3), highlight: true }, { label: "kBq", value: (bq / 1000).toFixed(2) }, { label: "MBq", value: (bq / 1e6).toFixed(4) }, { label: "GBq", value: (bq / 1e9).toFixed(6) }, { label: "Curies", value: (bq / 3.7e10).toExponential(3) }]; },
    { expression: "Convert to Bq, then to target", variables: ["1 GBq = 10⁹ Bq"] }
  ),

  mc("radiation-intensity-converter", "Radiation Intensity Converter", "Convert between W/m², W/cm², and mW/cm².", "Free radiation intensity converter.", "Radiation",
    [{ id: "value", label: "Value", type: "number", defaultValue: 10, step: 0.1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "W/m²" }, { value: 1, label: "W/cm²" }, { value: 2, label: "mW/cm²" }] }],
    (v) => { const toWm2 = [1, 10000, 10]; const wm2 = v.value * toWm2[v.from]; return [{ label: "W/m²", value: wm2.toFixed(4), highlight: true }, { label: "W/cm²", value: (wm2 / 10000).toFixed(6) }, { label: "mW/cm²", value: (wm2 / 10).toFixed(3) }]; },
    { expression: "Convert to W/m², then to target", variables: ["1 W/cm² = 10000 W/m²"] }
  ),

  // ═══════════════════════════════════════════
  // THERMODYNAMICS CONVERTERS
  // ═══════════════════════════════════════════

  mc("thermal-conductivity-converter", "Thermal Conductivity Converter", "Convert between W/(m·K), BTU/(h·ft·°F), and cal/(s·cm·°C).", "Free thermal conductivity converter.", "Thermodynamics",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1, step: 0.01 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "W/(m·K)" }, { value: 1, label: "BTU/(h·ft·°F)" }, { value: 2, label: "cal/(s·cm·°C)" }] }],
    (v) => { const toWmk = [1, 1.73073, 418.68]; const wmk = v.value * toWmk[v.from]; return [{ label: "W/(m·K)", value: wmk.toFixed(4), highlight: true }, { label: "BTU/(h·ft·°F)", value: (wmk / 1.73073).toFixed(4) }, { label: "cal/(s·cm·°C)", value: (wmk / 418.68).toFixed(6) }]; },
    { expression: "Convert to W/(m·K), then to target", variables: ["Copper ≈ 401 W/(m·K)"] }
  ),

  mc("thermal-expansion-converter", "Thermal Expansion Converter", "Convert between 1/K, 1/°C, 1/°F, and µm/(m·K).", "Free thermal expansion converter.", "Thermodynamics",
    [{ id: "value", label: "Value (×10⁻⁶/K)", type: "number", defaultValue: 12, step: 0.1 }],
    (v) => { const perK = v.value * 1e-6; return [{ label: "×10⁻⁶/K", value: v.value.toFixed(2), highlight: true }, { label: "×10⁻⁶/°C", value: v.value.toFixed(2) }, { label: "×10⁻⁶/°F", value: (v.value / 1.8).toFixed(2) }, { label: "µm/(m·K)", value: v.value.toFixed(2) }]; },
    { expression: "α(°F) = α(K) / 1.8", variables: ["Steel ≈ 12 × 10⁻⁶/K"] }
  ),

  mc("heat-flux-converter", "Heat Flux Converter", "Convert between W/m², BTU/(h·ft²), cal/(s·cm²), and kW/m².", "Free heat flux converter.", "Thermodynamics",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1000, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "W/m²" }, { value: 1, label: "BTU/(h·ft²)" }, { value: 2, label: "kW/m²" }] }],
    (v) => { const toWm2 = [1, 3.15459, 1000]; const wm2 = v.value * toWm2[v.from]; return [{ label: "W/m²", value: wm2.toFixed(2), highlight: true }, { label: "BTU/(h·ft²)", value: (wm2 / 3.15459).toFixed(2) }, { label: "kW/m²", value: (wm2 / 1000).toFixed(4) }]; },
    { expression: "Convert to W/m², then to target", variables: ["Solar irradiance ≈ 1000 W/m²"] }
  ),

  mc("heat-density-converter", "Heat Density Converter", "Convert between J/m³, kJ/m³, BTU/ft³, and cal/cm³.", "Free heat density converter.", "Thermodynamics",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1000, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "J/m³" }, { value: 1, label: "kJ/m³" }, { value: 2, label: "BTU/ft³" }] }],
    (v) => { const toJm3 = [1, 1000, 37259.5]; const jm3 = v.value * toJm3[v.from]; return [{ label: "J/m³", value: jm3.toFixed(2), highlight: true }, { label: "kJ/m³", value: (jm3 / 1000).toFixed(4) }, { label: "BTU/ft³", value: (jm3 / 37259.5).toFixed(6) }]; },
    { expression: "Convert to J/m³, then to target", variables: ["1 BTU/ft³ = 37259.5 J/m³"] }
  ),

  mc("specific-heat-capacity-converter", "Specific Heat Capacity Converter", "Convert between J/(kg·K), cal/(g·°C), BTU/(lb·°F), and kJ/(kg·K).", "Free specific heat capacity converter.", "Thermodynamics",
    [{ id: "value", label: "Value", type: "number", defaultValue: 4186, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "J/(kg·K)" }, { value: 1, label: "cal/(g·°C)" }, { value: 2, label: "BTU/(lb·°F)" }, { value: 3, label: "kJ/(kg·K)" }] }],
    (v) => { const toJkgK = [1, 4186, 4186, 1000]; const jkgk = v.value * toJkgK[v.from]; return [{ label: "J/(kg·K)", value: jkgk.toFixed(2), highlight: true }, { label: "cal/(g·°C)", value: (jkgk / 4186).toFixed(4) }, { label: "BTU/(lb·°F)", value: (jkgk / 4186).toFixed(4) }, { label: "kJ/(kg·K)", value: (jkgk / 1000).toFixed(4) }]; },
    { expression: "Convert to J/(kg·K), then to target", variables: ["Water = 4186 J/(kg·K)"] }
  ),

  mc("thermal-resistance-converter", "Thermal Resistance Converter", "Convert between K/W, °C/W, and °F·h/BTU.", "Free thermal resistance converter.", "Thermodynamics",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1, step: 0.01 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "K/W" }, { value: 1, label: "°C/W" }, { value: 2, label: "°F·h/BTU" }] }],
    (v) => { const toKW = [1, 1, 1.8956]; const kw = v.value * toKW[v.from]; return [{ label: "K/W", value: kw.toFixed(4), highlight: true }, { label: "°C/W", value: kw.toFixed(4) }, { label: "°F·h/BTU", value: (kw / 1.8956).toFixed(4) }]; },
    { expression: "K/W = °C/W (same scale)", variables: ["Lower = better heat transfer"] }
  ),

  mc("heat-transfer-coefficient-converter", "Heat Transfer Coefficient Converter", "Convert between W/(m²·K), BTU/(h·ft²·°F), and cal/(s·cm²·°C).", "Free heat transfer coefficient converter.", "Thermodynamics",
    [{ id: "value", label: "Value", type: "number", defaultValue: 10, step: 0.1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "W/(m²·K)" }, { value: 1, label: "BTU/(h·ft²·°F)" }, { value: 2, label: "kcal/(h·m²·°C)" }] }],
    (v) => { const toWm2K = [1, 5.67826, 1.163]; const wm2k = v.value * toWm2K[v.from]; return [{ label: "W/(m²·K)", value: wm2k.toFixed(4), highlight: true }, { label: "BTU/(h·ft²·°F)", value: (wm2k / 5.67826).toFixed(4) }, { label: "kcal/(h·m²·°C)", value: (wm2k / 1.163).toFixed(4) }]; },
    { expression: "Convert to W/(m²·K), then to target", variables: ["Free convection (air) ≈ 5-25 W/(m²·K)"] }
  ),

  mc("thermal-diffusivity-converter", "Thermal Diffusivity Converter", "Convert between m²/s, cm²/s, ft²/h, and mm²/s.", "Free thermal diffusivity converter.", "Thermodynamics",
    [{ id: "value", label: "Value", type: "number", defaultValue: 0.143e-6, step: 1e-8 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "m²/s" }, { value: 1, label: "cm²/s" }, { value: 2, label: "ft²/h" }, { value: 3, label: "mm²/s" }] }],
    (v) => { const toM2s = [1, 1e-4, 2.58064e-5, 1e-6]; const m2s = v.value * toM2s[v.from]; return [{ label: "m²/s", value: m2s.toExponential(4), highlight: true }, { label: "cm²/s", value: (m2s * 1e4).toFixed(6) }, { label: "ft²/h", value: (m2s / 2.58064e-5).toFixed(4) }, { label: "mm²/s", value: (m2s * 1e6).toFixed(4) }]; },
    { expression: "α = k/(ρ·cp)", variables: ["Water ≈ 0.143 × 10⁻⁶ m²/s"] }
  ),

  mc("heat-energy-converter", "Heat Energy Converter", "Convert between joules, calories, BTU, therms, and kWh.", "Free heat energy converter.", "Thermodynamics",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1, step: 0.01 }, { id: "from", label: "From", type: "select", defaultValue: 2, options: [{ value: 0, label: "Joules" }, { value: 1, label: "Calories" }, { value: 2, label: "BTU" }, { value: 3, label: "Therms" }, { value: 4, label: "kWh" }] }],
    (v) => { const toJ = [1, 4.184, 1055.06, 1.055e8, 3.6e6]; const j = v.value * toJ[v.from]; return [{ label: "Joules", value: j.toFixed(2), highlight: true }, { label: "Calories", value: (j / 4.184).toFixed(2) }, { label: "BTU", value: (j / 1055.06).toFixed(4) }, { label: "Therms", value: (j / 1.055e8).toFixed(8) }, { label: "kWh", value: (j / 3.6e6).toFixed(8) }]; },
    { expression: "Convert to joules, then to target", variables: ["1 therm = 100,000 BTU"] }
  ),

  // ═══════════════════════════════════════════
  // LIGHT & OPTICS CONVERTERS
  // ═══════════════════════════════════════════

  mc("illuminance-converter-ext", "Illuminance Converter", "Convert between lux, foot-candles, phot, and nox.", "Free illuminance converter.", "Light & Optics",
    [{ id: "value", label: "Value", type: "number", defaultValue: 500, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Lux (lx)" }, { value: 1, label: "Foot-candles (fc)" }, { value: 2, label: "Phot (ph)" }] }],
    (v) => { const toLux = [1, 10.764, 10000]; const lux = v.value * toLux[v.from]; return [{ label: "Lux", value: lux.toFixed(2), highlight: true }, { label: "Foot-candles", value: (lux / 10.764).toFixed(4) }, { label: "Phot", value: (lux / 10000).toFixed(6) }, { label: "Nox", value: (lux * 1000).toFixed(0) }]; },
    { expression: "1 fc = 10.764 lux", variables: ["Office lighting ≈ 300-500 lux"] }
  ),

  mc("luminous-intensity-converter", "Luminous Intensity Converter", "Convert between candela, lumen/sr, and hefnerkerze.", "Free luminous intensity converter.", "Light & Optics",
    [{ id: "value", label: "Value", type: "number", defaultValue: 100, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Candela (cd)" }, { value: 1, label: "Hefnerkerze (HK)" }] }],
    (v) => { const toCd = [1, 0.9]; const cd = v.value * toCd[v.from]; return [{ label: "Candela", value: cd.toFixed(2), highlight: true }, { label: "Hefnerkerze", value: (cd / 0.9).toFixed(2) }, { label: "Lumens/sr", value: cd.toFixed(2) }]; },
    { expression: "1 cd = 1 lm/sr", variables: ["Candle ≈ 1 cd"] }
  ),

  mc("luminous-flux-converter", "Luminous Flux Converter", "Convert between lumens, candela·sr, and lux·m².", "Free luminous flux converter.", "Light & Optics",
    [{ id: "value", label: "Value", type: "number", defaultValue: 800, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Lumens (lm)" }, { value: 1, label: "Lux·m²" }] }],
    (v) => { const toLm = [1, 1]; const lm = v.value * toLm[v.from]; return [{ label: "Lumens", value: lm.toFixed(2), highlight: true }, { label: "Lux·m²", value: lm.toFixed(2) }, { label: "Candela (isotropic)", value: (lm / (4 * Math.PI)).toFixed(2) }]; },
    { expression: "Φ = I × Ω", variables: ["60W bulb ≈ 800 lm"] }
  ),

  mc("luminance-converter-ext", "Luminance Converter", "Convert between cd/m², foot-lamberts, stilbs, and nits.", "Free luminance converter.", "Light & Optics",
    [{ id: "value", label: "Value", type: "number", defaultValue: 500, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "cd/m² (nit)" }, { value: 1, label: "Foot-lamberts (fL)" }, { value: 2, label: "Stilb (sb)" }] }],
    (v) => { const toNit = [1, 3.42626, 10000]; const nit = v.value * toNit[v.from]; return [{ label: "Nits (cd/m²)", value: nit.toFixed(2), highlight: true }, { label: "Foot-lamberts", value: (nit / 3.42626).toFixed(4) }, { label: "Stilbs", value: (nit / 10000).toFixed(6) }]; },
    { expression: "1 fL = 3.426 cd/m²", variables: ["HDR display ≈ 1000+ nits"] }
  ),

  mc("optical-power-converter", "Optical Power Converter", "Convert between diopters and focal length in meters/mm.", "Free optical power converter.", "Light & Optics",
    [{ id: "diopter", label: "Power (Diopters)", type: "number", defaultValue: 2, step: 0.25 }],
    (v) => { const f = v.diopter !== 0 ? 1 / v.diopter : 0; return [{ label: "Diopters", value: `${v.diopter} D`, highlight: true }, { label: "Focal Length (m)", value: f.toFixed(4) }, { label: "Focal Length (mm)", value: (f * 1000).toFixed(1) }, { label: "Focal Length (cm)", value: (f * 100).toFixed(2) }]; },
    { expression: "D = 1/f (meters)", variables: ["Positive = converging lens"] }
  ),

  mc("optical-density-converter", "Optical Density Converter", "Convert between optical density, transmittance %, and absorbance.", "Free optical density converter.", "Light & Optics",
    [{ id: "od", label: "Optical Density", type: "number", defaultValue: 1, step: 0.01, min: 0 }],
    (v) => { const t = Math.pow(10, -v.od) * 100; return [{ label: "Optical Density", value: v.od.toFixed(3), highlight: true }, { label: "Transmittance (%)", value: t.toFixed(4) }, { label: "Absorbance", value: v.od.toFixed(3) }, { label: "Opacity", value: (100 - t).toFixed(4) }]; },
    { expression: "OD = -log₁₀(T)", variables: ["OD 1 = 10% transmission"] }
  ),

  mc("light-energy-converter", "Light Energy Converter", "Convert between lumen-seconds, talbot, and lux-seconds·m².", "Free light energy converter.", "Light & Optics",
    [{ id: "value", label: "Value (lumen-seconds)", type: "number", defaultValue: 1000, step: 1 }],
    (v) => { return [{ label: "Lumen-seconds", value: v.value.toFixed(2), highlight: true }, { label: "Talbots", value: v.value.toFixed(2) }, { label: "Lux·s·m²", value: v.value.toFixed(2) }]; },
    { expression: "1 talbot = 1 lumen-second", variables: ["Luminous energy unit"] }
  ),

  // ═══════════════════════════════════════════
  // FLUID MECHANICS CONVERTERS
  // ═══════════════════════════════════════════

  mc("dynamic-viscosity-converter", "Dynamic Viscosity Converter", "Convert between Pa·s, cP, poise, and lb/(ft·s).", "Free dynamic viscosity converter.", "Fluid Mechanics",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1, step: 0.001 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Pa·s" }, { value: 1, label: "cP (centipoise)" }, { value: 2, label: "Poise (P)" }, { value: 3, label: "lb/(ft·s)" }] }],
    (v) => { const toPas = [1, 0.001, 0.1, 1.48816]; const pas = v.value * toPas[v.from]; return [{ label: "Pa·s", value: pas.toFixed(6), highlight: true }, { label: "cP", value: (pas * 1000).toFixed(3) }, { label: "Poise", value: (pas * 10).toFixed(4) }, { label: "lb/(ft·s)", value: (pas / 1.48816).toFixed(6) }]; },
    { expression: "1 P = 0.1 Pa·s", variables: ["Water ≈ 1 cP at 20°C"] }
  ),

  mc("kinematic-viscosity-converter", "Kinematic Viscosity Converter", "Convert between m²/s, cSt, stokes, and ft²/s.", "Free kinematic viscosity converter.", "Fluid Mechanics",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1, step: 0.01 }, { id: "from", label: "From", type: "select", defaultValue: 1, options: [{ value: 0, label: "m²/s" }, { value: 1, label: "cSt (mm²/s)" }, { value: 2, label: "Stokes (cm²/s)" }, { value: 3, label: "ft²/s" }] }],
    (v) => { const toM2s = [1, 1e-6, 1e-4, 0.092903]; const m2s = v.value * toM2s[v.from]; return [{ label: "m²/s", value: m2s.toExponential(4), highlight: true }, { label: "cSt (mm²/s)", value: (m2s * 1e6).toFixed(4) }, { label: "Stokes", value: (m2s * 1e4).toFixed(4) }, { label: "ft²/s", value: (m2s / 0.092903).toFixed(6) }]; },
    { expression: "ν = µ/ρ", variables: ["Water ≈ 1 cSt at 20°C"] }
  ),

  mc("surface-tension-converter", "Surface Tension Converter", "Convert between N/m, dyn/cm, mN/m, and lbf/ft.", "Free surface tension converter.", "Fluid Mechanics",
    [{ id: "value", label: "Value", type: "number", defaultValue: 0.0728, step: 0.0001 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "N/m" }, { value: 1, label: "dyn/cm" }, { value: 2, label: "mN/m" }] }],
    (v) => { const toNm = [1, 0.001, 0.001]; const nm = v.value * toNm[v.from]; return [{ label: "N/m", value: nm.toFixed(6), highlight: true }, { label: "dyn/cm", value: (nm * 1000).toFixed(3) }, { label: "mN/m", value: (nm * 1000).toFixed(3) }]; },
    { expression: "1 dyn/cm = 1 mN/m = 0.001 N/m", variables: ["Water ≈ 72.8 mN/m"] }
  ),

  mc("flow-rate-converter-ext", "Flow Rate Converter", "Convert between L/min, GPM, m³/h, CFM, and L/s.", "Free flow rate converter.", "Fluid Mechanics",
    [{ id: "value", label: "Value", type: "number", defaultValue: 10, step: 0.1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "L/min" }, { value: 1, label: "GPM" }, { value: 2, label: "m³/h" }, { value: 3, label: "L/s" }] }],
    (v) => { const toLpm = [1, 3.78541, 16.6667, 60]; const lpm = v.value * toLpm[v.from]; return [{ label: "L/min", value: lpm.toFixed(3), highlight: true }, { label: "GPM", value: (lpm / 3.78541).toFixed(3) }, { label: "m³/h", value: (lpm / 16.6667).toFixed(4) }, { label: "L/s", value: (lpm / 60).toFixed(4) }]; },
    { expression: "Convert to L/min, then to target", variables: ["1 GPM = 3.785 L/min"] }
  ),

  mc("mass-flow-rate-converter", "Mass Flow Rate Converter", "Convert between kg/s, kg/h, lb/s, lb/h, and ton/h.", "Free mass flow rate converter.", "Fluid Mechanics",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1, step: 0.01 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "kg/s" }, { value: 1, label: "kg/h" }, { value: 2, label: "lb/s" }, { value: 3, label: "ton/h" }] }],
    (v) => { const toKgs = [1, 1 / 3600, 0.453592, 1000 / 3600]; const kgs = v.value * toKgs[v.from]; return [{ label: "kg/s", value: kgs.toFixed(4), highlight: true }, { label: "kg/h", value: (kgs * 3600).toFixed(2) }, { label: "lb/s", value: (kgs / 0.453592).toFixed(4) }, { label: "ton/h", value: (kgs * 3.6).toFixed(4) }]; },
    { expression: "Convert to kg/s, then to target", variables: ["1 lb/s = 0.4536 kg/s"] }
  ),

  mc("volume-flow-rate-converter", "Volume Flow Rate Converter", "Convert between m³/s, L/s, ft³/s, and gal/min.", "Free volume flow rate converter.", "Fluid Mechanics",
    [{ id: "value", label: "Value", type: "number", defaultValue: 0.01, step: 0.001 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "m³/s" }, { value: 1, label: "L/s" }, { value: 2, label: "ft³/s" }, { value: 3, label: "gal/min" }] }],
    (v) => { const toM3s = [1, 0.001, 0.0283168, 6.309e-5]; const m3s = v.value * toM3s[v.from]; return [{ label: "m³/s", value: m3s.toFixed(6), highlight: true }, { label: "L/s", value: (m3s * 1000).toFixed(3) }, { label: "ft³/s", value: (m3s / 0.0283168).toFixed(4) }, { label: "gal/min", value: (m3s / 6.309e-5).toFixed(2) }]; },
    { expression: "Convert to m³/s, then to target", variables: ["1 L/s = 0.001 m³/s"] }
  ),

  mc("hydraulic-conductivity-converter", "Hydraulic Conductivity Converter", "Convert between m/s, cm/s, ft/day, and gal/(day·ft²).", "Free hydraulic conductivity converter.", "Fluid Mechanics",
    [{ id: "value", label: "Value", type: "number", defaultValue: 0.001, step: 0.0001 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "m/s" }, { value: 1, label: "cm/s" }, { value: 2, label: "ft/day" }] }],
    (v) => { const toMs = [1, 0.01, 3.528e-6]; const ms = v.value * toMs[v.from]; return [{ label: "m/s", value: ms.toExponential(4), highlight: true }, { label: "cm/s", value: (ms * 100).toFixed(6) }, { label: "ft/day", value: (ms / 3.528e-6).toFixed(2) }]; },
    { expression: "Convert to m/s, then to target", variables: ["Sand ≈ 10⁻⁴ to 10⁻² m/s"] }
  ),

  mc("fluid-velocity-converter", "Fluid Velocity Converter", "Convert between m/s, ft/s, km/h, and mph.", "Free fluid velocity converter.", "Fluid Mechanics",
    [{ id: "value", label: "Value", type: "number", defaultValue: 5, step: 0.1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "m/s" }, { value: 1, label: "ft/s" }, { value: 2, label: "km/h" }, { value: 3, label: "mph" }] }],
    (v) => { const toMs = [1, 0.3048, 1 / 3.6, 0.44704]; const ms = v.value * toMs[v.from]; return [{ label: "m/s", value: ms.toFixed(4), highlight: true }, { label: "ft/s", value: (ms / 0.3048).toFixed(4) }, { label: "km/h", value: (ms * 3.6).toFixed(2) }, { label: "mph", value: (ms / 0.44704).toFixed(2) }]; },
    { expression: "Convert to m/s, then to target", variables: ["Pipe flow typically 1-5 m/s"] }
  ),

  mc("pressure-head-converter", "Pressure Head Converter", "Convert between meters of water, feet of water, PSI, and kPa.", "Free pressure head converter.", "Fluid Mechanics",
    [{ id: "value", label: "Value", type: "number", defaultValue: 10, step: 0.1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "m H₂O" }, { value: 1, label: "ft H₂O" }, { value: 2, label: "PSI" }, { value: 3, label: "kPa" }] }],
    (v) => { const toMH2O = [1, 0.3048, 0.703089, 0.101972]; const mh2o = v.value * toMH2O[v.from]; return [{ label: "m H₂O", value: mh2o.toFixed(4), highlight: true }, { label: "ft H₂O", value: (mh2o / 0.3048).toFixed(4) }, { label: "PSI", value: (mh2o / 0.703089).toFixed(4) }, { label: "kPa", value: (mh2o / 0.101972).toFixed(2) }]; },
    { expression: "1 m H₂O = 9.807 kPa", variables: ["Head = P/(ρg)"] }
  ),

  // ═══════════════════════════════════════════
  // MATERIAL PROPERTY CONVERTERS
  // ═══════════════════════════════════════════

  mc("density-converter-ext", "Density Converter", "Convert between kg/m³, g/cm³, lb/ft³, lb/gal, and kg/L.", "Free density converter.", "Material Properties",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1000, step: 0.1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "kg/m³" }, { value: 1, label: "g/cm³" }, { value: 2, label: "lb/ft³" }, { value: 3, label: "lb/gal" }, { value: 4, label: "kg/L" }] }],
    (v) => { const toKgm3 = [1, 1000, 16.0185, 119.826, 1000]; const kgm3 = v.value * toKgm3[v.from]; return [{ label: "kg/m³", value: kgm3.toFixed(2), highlight: true }, { label: "g/cm³", value: (kgm3 / 1000).toFixed(4) }, { label: "lb/ft³", value: (kgm3 / 16.0185).toFixed(4) }, { label: "lb/gal", value: (kgm3 / 119.826).toFixed(4) }, { label: "kg/L", value: (kgm3 / 1000).toFixed(4) }]; },
    { expression: "Convert to kg/m³, then to target", variables: ["Water = 1000 kg/m³"] }
  ),

  mc("specific-volume-converter", "Specific Volume Converter", "Convert between m³/kg, L/kg, ft³/lb, and gal/lb.", "Free specific volume converter.", "Material Properties",
    [{ id: "value", label: "Value", type: "number", defaultValue: 0.001, step: 0.0001 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "m³/kg" }, { value: 1, label: "L/kg" }, { value: 2, label: "ft³/lb" }] }],
    (v) => { const toM3kg = [1, 0.001, 0.0624279]; const m3kg = v.value * toM3kg[v.from]; return [{ label: "m³/kg", value: m3kg.toFixed(6), highlight: true }, { label: "L/kg", value: (m3kg * 1000).toFixed(4) }, { label: "ft³/lb", value: (m3kg / 0.0624279).toFixed(4) }]; },
    { expression: "v = 1/ρ", variables: ["Water = 0.001 m³/kg"] }
  ),

  mc("specific-gravity-converter", "Specific Gravity Converter", "Calculate density from specific gravity and convert units.", "Free specific gravity converter.", "Material Properties",
    [{ id: "sg", label: "Specific Gravity", type: "number", defaultValue: 1.025, step: 0.001 }],
    (v) => { const kgm3 = v.sg * 1000; return [{ label: "Specific Gravity", value: v.sg.toFixed(4), highlight: true }, { label: "kg/m³", value: kgm3.toFixed(1) }, { label: "g/cm³", value: (kgm3 / 1000).toFixed(4) }, { label: "lb/ft³", value: (kgm3 / 16.0185).toFixed(2) }]; },
    { expression: "SG = ρ_substance / ρ_water", variables: ["Water SG = 1.000 at 4°C"] }
  ),

  mc("linear-density-converter", "Linear Density Converter", "Convert between kg/m, g/m, lb/ft, and denier.", "Free linear density converter.", "Material Properties",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1, step: 0.01 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "kg/m" }, { value: 1, label: "g/m" }, { value: 2, label: "lb/ft" }, { value: 3, label: "Denier" }] }],
    (v) => { const toKgm = [1, 0.001, 1.48816, 1.111e-7]; const kgm = v.value * toKgm[v.from]; return [{ label: "kg/m", value: kgm.toFixed(6), highlight: true }, { label: "g/m", value: (kgm * 1000).toFixed(3) }, { label: "lb/ft", value: (kgm / 1.48816).toFixed(6) }, { label: "Denier", value: (kgm / 1.111e-7).toFixed(0) }]; },
    { expression: "Convert to kg/m, then to target", variables: ["Denier = g per 9000 m"] }
  ),

  mc("area-density-converter", "Area Density Converter", "Convert between kg/m², g/m², oz/yd², and lb/ft².", "Free area density converter.", "Material Properties",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1, step: 0.01 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "kg/m²" }, { value: 1, label: "g/m² (GSM)" }, { value: 2, label: "oz/yd²" }, { value: 3, label: "lb/ft²" }] }],
    (v) => { const toKgm2 = [1, 0.001, 0.033906, 4.88243]; const kgm2 = v.value * toKgm2[v.from]; return [{ label: "kg/m²", value: kgm2.toFixed(4), highlight: true }, { label: "g/m² (GSM)", value: (kgm2 * 1000).toFixed(1) }, { label: "oz/yd²", value: (kgm2 / 0.033906).toFixed(2) }, { label: "lb/ft²", value: (kgm2 / 4.88243).toFixed(6) }]; },
    { expression: "Convert to kg/m², then to target", variables: ["Paper: 80 GSM typical"] }
  ),

  mc("bulk-density-converter", "Bulk Density Converter", "Convert between kg/m³, lb/ft³, g/mL, and ton/m³.", "Free bulk density converter.", "Material Properties",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1500, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "kg/m³" }, { value: 1, label: "lb/ft³" }, { value: 2, label: "g/mL" }, { value: 3, label: "ton/m³" }] }],
    (v) => { const toKgm3 = [1, 16.0185, 1000, 1000]; const kgm3 = v.value * toKgm3[v.from]; return [{ label: "kg/m³", value: kgm3.toFixed(2), highlight: true }, { label: "lb/ft³", value: (kgm3 / 16.0185).toFixed(2) }, { label: "g/mL", value: (kgm3 / 1000).toFixed(4) }, { label: "ton/m³", value: (kgm3 / 1000).toFixed(4) }]; },
    { expression: "Convert to kg/m³, then to target", variables: ["Sand ≈ 1500 kg/m³"] }
  ),

  mc("surface-density-converter", "Surface Density Converter", "Convert between kg/m², g/cm², and lb/in².", "Free surface density converter.", "Material Properties",
    [{ id: "value", label: "Value", type: "number", defaultValue: 10, step: 0.1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "kg/m²" }, { value: 1, label: "g/cm²" }, { value: 2, label: "lb/in²" }] }],
    (v) => { const toKgm2 = [1, 10, 703.07]; const kgm2 = v.value * toKgm2[v.from]; return [{ label: "kg/m²", value: kgm2.toFixed(4), highlight: true }, { label: "g/cm²", value: (kgm2 / 10).toFixed(4) }, { label: "lb/in²", value: (kgm2 / 703.07).toFixed(6) }]; },
    { expression: "Convert to kg/m², then to target", variables: ["1 g/cm² = 10 kg/m²"] }
  ),

  // ═══════════════════════════════════════════
  // CHEMICAL & MOLECULAR CONVERTERS
  // ═══════════════════════════════════════════

  mc("molar-mass-converter", "Molar Mass Converter", "Convert between g/mol, kg/mol, and lb/mol.", "Free molar mass converter.", "Chemistry",
    [{ id: "value", label: "Value", type: "number", defaultValue: 18.015, step: 0.001 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "g/mol" }, { value: 1, label: "kg/mol" }, { value: 2, label: "lb/mol" }] }],
    (v) => { const toGmol = [1, 1000, 453.592]; const gmol = v.value * toGmol[v.from]; return [{ label: "g/mol", value: gmol.toFixed(4), highlight: true }, { label: "kg/mol", value: (gmol / 1000).toFixed(6) }, { label: "lb/mol", value: (gmol / 453.592).toFixed(6) }, { label: "kg/kmol", value: gmol.toFixed(4) }]; },
    { expression: "Convert to g/mol, then to target", variables: ["Water = 18.015 g/mol"] }
  ),

  mc("molar-volume-converter", "Molar Volume Converter", "Convert between L/mol, m³/mol, and cm³/mol.", "Free molar volume converter.", "Chemistry",
    [{ id: "value", label: "Value", type: "number", defaultValue: 22.414, step: 0.001 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "L/mol" }, { value: 1, label: "m³/mol" }, { value: 2, label: "cm³/mol" }] }],
    (v) => { const toLmol = [1, 1000, 0.001]; const lmol = v.value * toLmol[v.from]; return [{ label: "L/mol", value: lmol.toFixed(4), highlight: true }, { label: "m³/mol", value: (lmol / 1000).toFixed(6) }, { label: "cm³/mol", value: (lmol * 1000).toFixed(1) }]; },
    { expression: "Ideal gas at STP = 22.414 L/mol", variables: ["PV = nRT"] }
  ),

  mc("molar-concentration-converter", "Molar Concentration Converter", "Convert between mol/L, mmol/L, µmol/L, and mol/m³.", "Free molar concentration converter.", "Chemistry",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1, step: 0.01 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "mol/L (M)" }, { value: 1, label: "mmol/L" }, { value: 2, label: "µmol/L" }, { value: 3, label: "mol/m³" }] }],
    (v) => { const toM = [1, 0.001, 1e-6, 0.001]; const m = v.value * toM[v.from]; return [{ label: "mol/L (M)", value: m.toFixed(6), highlight: true }, { label: "mmol/L", value: (m * 1000).toFixed(3) }, { label: "µmol/L", value: (m * 1e6).toFixed(1) }, { label: "mol/m³", value: (m * 1000).toFixed(3) }]; },
    { expression: "Molarity = mol/L", variables: ["1 M = 1000 mmol/L"] }
  ),

  mc("molarity-converter", "Molarity Converter", "Convert between molarity, normality (approx.), and % w/v.", "Free molarity converter.", "Chemistry",
    [{ id: "molarity", label: "Molarity (mol/L)", type: "number", defaultValue: 1, step: 0.01 }, { id: "molarMass", label: "Molar Mass (g/mol)", type: "number", defaultValue: 40, step: 0.01 }],
    (v) => { const gPerL = v.molarity * v.molarMass; return [{ label: "Molarity (M)", value: `${v.molarity} mol/L`, highlight: true }, { label: "g/L", value: gPerL.toFixed(2) }, { label: "% w/v", value: (gPerL / 10).toFixed(2) }, { label: "mg/mL", value: gPerL.toFixed(2) }]; },
    { expression: "g/L = M × Molar Mass", variables: ["% w/v = g per 100 mL"] }
  ),

  mc("molality-converter", "Molality Converter", "Convert between mol/kg, mmol/kg, and compare with molarity.", "Free molality converter.", "Chemistry",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1, step: 0.01 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "mol/kg" }, { value: 1, label: "mmol/kg" }] }],
    (v) => { const toMolkg = [1, 0.001]; const molkg = v.value * toMolkg[v.from]; return [{ label: "mol/kg", value: molkg.toFixed(4), highlight: true }, { label: "mmol/kg", value: (molkg * 1000).toFixed(2) }, { label: "≈ Molarity (dilute)", value: `≈ ${molkg.toFixed(4)} M` }]; },
    { expression: "m = mol solute / kg solvent", variables: ["For dilute aqueous: m ≈ M"] }
  ),

  mc("catalytic-activity-converter", "Catalytic Activity Converter", "Convert between katal, enzyme units (U), and µkat.", "Free catalytic activity converter.", "Chemistry",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1, step: 0.001 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "katal (kat)" }, { value: 1, label: "Enzyme Unit (U)" }, { value: 2, label: "µkat" }] }],
    (v) => { const toKat = [1, 1 / 6e7, 1e-6]; const kat = v.value * toKat[v.from]; return [{ label: "katal", value: kat.toExponential(4), highlight: true }, { label: "Enzyme Units (U)", value: (kat * 6e7).toFixed(2) }, { label: "µkat", value: (kat * 1e6).toFixed(4) }]; },
    { expression: "1 kat = 6 × 10⁷ U", variables: ["kat is the SI unit"] }
  ),

  mc("chemical-concentration-converter", "Chemical Concentration Converter", "Convert between ppm, ppb, mg/L, µg/L, and %.", "Free chemical concentration converter.", "Chemistry",
    [{ id: "value", label: "Value", type: "number", defaultValue: 100, step: 0.1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "ppm (mg/L)" }, { value: 1, label: "ppb (µg/L)" }, { value: 2, label: "% (w/v)" }] }],
    (v) => { const toPpm = [1, 0.001, 10000]; const ppm = v.value * toPpm[v.from]; return [{ label: "ppm (mg/L)", value: ppm.toFixed(4), highlight: true }, { label: "ppb (µg/L)", value: (ppm * 1000).toFixed(1) }, { label: "% (w/v)", value: (ppm / 10000).toFixed(6) }, { label: "mg/L", value: ppm.toFixed(4) }]; },
    { expression: "1 ppm = 1 mg/L (in water)", variables: ["1% = 10,000 ppm"] }
  ),

  mc("gas-constant-converter", "Gas Constant Converter", "View the gas constant in different unit systems.", "Free gas constant reference converter.", "Chemistry",
    [{ id: "n", label: "Moles (n)", type: "number", defaultValue: 1, step: 0.1 }, { id: "t", label: "Temperature (K)", type: "number", defaultValue: 273.15, step: 1 }],
    (v) => { const pv = v.n * 8.314 * v.t; return [{ label: "R (J/(mol·K))", value: "8.31446", highlight: true }, { label: "R (L·atm/(mol·K))", value: "0.08206" }, { label: "R (cal/(mol·K))", value: "1.9872" }, { label: "PV = nRT result (J)", value: pv.toFixed(2) }]; },
    { expression: "PV = nRT", variables: ["R = 8.314 J/(mol·K)"] }
  ),

  mc("gas-flow-converter", "Gas Flow Converter", "Convert between SLPM, SCFM, NL/min, and Nm³/h.", "Free gas flow converter.", "Chemistry",
    [{ id: "value", label: "Value", type: "number", defaultValue: 10, step: 0.1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "SLPM" }, { value: 1, label: "SCFM" }, { value: 2, label: "Nm³/h" }] }],
    (v) => { const toSLPM = [1, 28.3168, 16.6667]; const slpm = v.value * toSLPM[v.from]; return [{ label: "SLPM", value: slpm.toFixed(3), highlight: true }, { label: "SCFM", value: (slpm / 28.3168).toFixed(4) }, { label: "Nm³/h", value: (slpm / 16.6667).toFixed(4) }]; },
    { expression: "Standard conditions: 0°C, 1 atm", variables: ["S = Standard, N = Normal"] }
  ),

  // ═══════════════════════════════════════════
  // DATA & COMPUTING CONVERTERS
  // ═══════════════════════════════════════════

  mc("data-transfer-rate-converter", "Data Transfer Rate Converter", "Convert between bps, Kbps, Mbps, Gbps, and Tbps.", "Free data transfer rate converter.", "Data & Computing",
    [{ id: "value", label: "Value", type: "number", defaultValue: 100, step: 0.1 }, { id: "from", label: "From", type: "select", defaultValue: 2, options: [{ value: 0, label: "bps" }, { value: 1, label: "Kbps" }, { value: 2, label: "Mbps" }, { value: 3, label: "Gbps" }, { value: 4, label: "Tbps" }] }],
    (v) => { const toBps = [1, 1e3, 1e6, 1e9, 1e12]; const bps = v.value * toBps[v.from]; return [{ label: "bps", value: bps.toExponential(3), highlight: true }, { label: "Kbps", value: (bps / 1e3).toFixed(2) }, { label: "Mbps", value: (bps / 1e6).toFixed(4) }, { label: "Gbps", value: (bps / 1e9).toFixed(6) }, { label: "MB/s", value: (bps / 8e6).toFixed(4) }]; },
    { expression: "1 byte = 8 bits", variables: ["Mbps ≠ MB/s"] }
  ),

  mc("bitrate-converter", "Bitrate Converter", "Convert between kbps, Mbps, KB/s, MB/s, and GB/s.", "Free bitrate converter.", "Data & Computing",
    [{ id: "value", label: "Value", type: "number", defaultValue: 8, step: 0.1 }, { id: "from", label: "From", type: "select", defaultValue: 1, options: [{ value: 0, label: "kbps" }, { value: 1, label: "Mbps" }, { value: 2, label: "KB/s" }, { value: 3, label: "MB/s" }] }],
    (v) => { const toKbps = [1, 1000, 8, 8000]; const kbps = v.value * toKbps[v.from]; return [{ label: "kbps", value: kbps.toFixed(2), highlight: true }, { label: "Mbps", value: (kbps / 1000).toFixed(4) }, { label: "KB/s", value: (kbps / 8).toFixed(2) }, { label: "MB/s", value: (kbps / 8000).toFixed(4) }]; },
    { expression: "Bytes/s = bits/s ÷ 8", variables: ["Audio CD ≈ 1411 kbps"] }
  ),

  mc("pixel-density-converter", "Pixel Density Converter", "Calculate PPI from resolution and screen size.", "Free pixel density (PPI) calculator.", "Data & Computing",
    [{ id: "widthPx", label: "Width (pixels)", type: "number", defaultValue: 1920, step: 1 }, { id: "heightPx", label: "Height (pixels)", type: "number", defaultValue: 1080, step: 1 }, { id: "diagonal", label: "Diagonal (inches)", type: "number", defaultValue: 15.6, step: 0.1 }],
    (v) => { const diag = Math.sqrt(v.widthPx ** 2 + v.heightPx ** 2); const ppi = v.diagonal > 0 ? diag / v.diagonal : 0; return [{ label: "PPI", value: ppi.toFixed(1), highlight: true }, { label: "Diagonal Pixels", value: diag.toFixed(0) }, { label: "Total Pixels", value: (v.widthPx * v.heightPx).toLocaleString() }, { label: "Megapixels", value: (v.widthPx * v.heightPx / 1e6).toFixed(2) }]; },
    { expression: "PPI = √(W² + H²) / diagonal", variables: ["Retina ≈ 220+ PPI"] }
  ),

  mc("screen-resolution-converter", "Screen Resolution Converter", "Compare common screen resolutions and their pixel counts.", "Free screen resolution reference.", "Data & Computing",
    [{ id: "res", label: "Resolution", type: "select", defaultValue: 2, options: [{ value: 0, label: "720p (1280×720)" }, { value: 1, label: "1080p (1920×1080)" }, { value: 2, label: "1440p (2560×1440)" }, { value: 3, label: "4K (3840×2160)" }] }],
    (v) => { const resolutions: [number, number, string][] = [[1280, 720, "HD"], [1920, 1080, "Full HD"], [2560, 1440, "QHD"], [3840, 2160, "4K UHD"]]; const [w, h, name] = resolutions[v.res]; const mp = (w * h) / 1e6; return [{ label: "Resolution", value: `${w} × ${h}`, highlight: true }, { label: "Name", value: name }, { label: "Total Pixels", value: (w * h).toLocaleString() }, { label: "Megapixels", value: mp.toFixed(2) }, { label: "Aspect Ratio", value: "16:9" }]; },
    { expression: "Pixels = Width × Height", variables: ["4K = 4× the pixels of 1080p"] }
  ),

  mc("image-aspect-ratio-converter", "Image Aspect Ratio Converter", "Calculate and convert image aspect ratios.", "Free aspect ratio calculator.", "Data & Computing",
    [{ id: "width", label: "Width", type: "number", defaultValue: 1920, step: 1 }, { id: "height", label: "Height", type: "number", defaultValue: 1080, step: 1 }],
    (v) => { const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b); const g = gcd(Math.abs(Math.round(v.width)), Math.abs(Math.round(v.height))); const rw = Math.round(v.width) / g; const rh = Math.round(v.height) / g; return [{ label: "Aspect Ratio", value: `${rw}:${rh}`, highlight: true }, { label: "Decimal", value: (v.width / v.height).toFixed(4) }, { label: "Width", value: `${v.width} px` }, { label: "Height", value: `${v.height} px` }]; },
    { expression: "Ratio = W:H (reduced by GCD)", variables: ["16:9, 4:3, 1:1 are common"] }
  ),

  mc("color-code-converter-ext", "Color Code Converter", "Convert between RGB, HEX, and HSL color codes.", "Free color code converter. RGB to HEX to HSL.", "Data & Computing",
    [{ id: "r", label: "Red (0-255)", type: "number", defaultValue: 37, min: 0, max: 255 }, { id: "g", label: "Green (0-255)", type: "number", defaultValue: 99, min: 0, max: 255 }, { id: "b", label: "Blue (0-255)", type: "number", defaultValue: 235, min: 0, max: 255 }],
    (v) => { const hex = `#${[v.r, v.g, v.b].map(c => Math.min(255, Math.max(0, Math.round(c))).toString(16).padStart(2, "0")).join("")}`; const r = v.r / 255, g = v.g / 255, b = v.b / 255; const max = Math.max(r, g, b), min = Math.min(r, g, b); const l = (max + min) / 2; let h = 0, s = 0; if (max !== min) { const d = max - min; s = l > 0.5 ? d / (2 - max - min) : d / (max + min); if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6; else if (max === g) h = ((b - r) / d + 2) / 6; else h = ((r - g) / d + 4) / 6; } return [{ label: "HEX", value: hex.toUpperCase(), highlight: true }, { label: "RGB", value: `rgb(${v.r}, ${v.g}, ${v.b})` }, { label: "HSL", value: `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)` }]; },
    { expression: "RGB → Hex → HSL conversion", variables: ["Each channel 0-255"] }
  ),

  mc("binary-converter", "Binary Converter", "Convert between binary, decimal, hex, and octal.", "Free binary number converter.", "Data & Computing",
    [{ id: "decimal", label: "Decimal Number", type: "number", defaultValue: 255, min: 0, step: 1 }],
    (v) => { const n = Math.floor(Math.abs(v.decimal)); return [{ label: "Decimal", value: `${n}`, highlight: true }, { label: "Binary", value: n.toString(2) }, { label: "Hexadecimal", value: `0x${n.toString(16).toUpperCase()}` }, { label: "Octal", value: `0o${n.toString(8)}` }]; },
    { expression: "Standard base conversion", variables: ["Binary = base 2"] }
  ),

  mc("byte-converter", "Byte Converter", "Convert between bytes, KB, MB, GB, TB, and PB.", "Free byte converter.", "Data & Computing",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1, step: 0.01 }, { id: "from", label: "From", type: "select", defaultValue: 3, options: [{ value: 0, label: "Bytes" }, { value: 1, label: "KB" }, { value: 2, label: "MB" }, { value: 3, label: "GB" }, { value: 4, label: "TB" }] }],
    (v) => { const toBytes = [1, 1024, 1048576, 1073741824, 1099511627776]; const bytes = v.value * toBytes[v.from]; return [{ label: "Bytes", value: bytes.toLocaleString(), highlight: true }, { label: "KB", value: (bytes / 1024).toFixed(2) }, { label: "MB", value: (bytes / 1048576).toFixed(4) }, { label: "GB", value: (bytes / 1073741824).toFixed(6) }, { label: "TB", value: (bytes / 1099511627776).toFixed(8) }]; },
    { expression: "1 KB = 1024 bytes (binary)", variables: ["1 GB = 1024 MB"] }
  ),

  mc("data-size-converter", "Data Size Converter", "Convert between bits, bytes, KB, MB, GB, and TB.", "Free data size converter.", "Data & Computing",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1, step: 0.01 }, { id: "from", label: "From", type: "select", defaultValue: 3, options: [{ value: 0, label: "Bits" }, { value: 1, label: "Bytes" }, { value: 2, label: "KB" }, { value: 3, label: "MB" }, { value: 4, label: "GB" }] }],
    (v) => { const toBits = [1, 8, 8192, 8388608, 8589934592]; const bits = v.value * toBits[v.from]; return [{ label: "Bits", value: bits.toLocaleString(), highlight: true }, { label: "Bytes", value: (bits / 8).toFixed(0) }, { label: "KB", value: (bits / 8192).toFixed(2) }, { label: "MB", value: (bits / 8388608).toFixed(4) }, { label: "GB", value: (bits / 8589934592).toFixed(6) }]; },
    { expression: "1 byte = 8 bits", variables: ["Using binary (1024) scale"] }
  ),

  mc("network-speed-converter", "Network Speed Converter", "Convert between Mbps, Gbps, MB/s, and KB/s.", "Free network speed converter.", "Data & Computing",
    [{ id: "value", label: "Value", type: "number", defaultValue: 100, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Mbps" }, { value: 1, label: "Gbps" }, { value: 2, label: "MB/s" }, { value: 3, label: "KB/s" }] }],
    (v) => { const toMbps = [1, 1000, 8, 0.008]; const mbps = v.value * toMbps[v.from]; return [{ label: "Mbps", value: mbps.toFixed(2), highlight: true }, { label: "Gbps", value: (mbps / 1000).toFixed(4) }, { label: "MB/s", value: (mbps / 8).toFixed(2) }, { label: "KB/s", value: (mbps * 125).toFixed(0) }]; },
    { expression: "MB/s = Mbps / 8", variables: ["1 Gbps = 1000 Mbps"] }
  ),

  mc("memory-size-converter", "Memory Size Converter", "Convert between KB, MB, GB, and TB with binary/decimal.", "Free memory size converter.", "Data & Computing",
    [{ id: "value", label: "Value", type: "number", defaultValue: 16, step: 0.1 }, { id: "from", label: "From", type: "select", defaultValue: 2, options: [{ value: 0, label: "KB" }, { value: 1, label: "MB" }, { value: 2, label: "GB" }, { value: 3, label: "TB" }] }],
    (v) => { const toMB = [1 / 1024, 1, 1024, 1048576]; const mb = v.value * toMB[v.from]; return [{ label: "KB", value: (mb * 1024).toLocaleString(), highlight: true }, { label: "MB", value: mb.toFixed(2) }, { label: "GB", value: (mb / 1024).toFixed(4) }, { label: "TB", value: (mb / 1048576).toFixed(8) }]; },
    { expression: "Binary: 1 GB = 1024 MB", variables: ["RAM uses binary units"] }
  ),

  // ═══════════════════════════════════════════
  // ENGINEERING MEASUREMENT CONVERTERS
  // ═══════════════════════════════════════════

  mc("stress-converter", "Stress Converter", "Convert between Pa, kPa, MPa, GPa, PSI, and ksi.", "Free stress converter.", "Material Properties",
    [{ id: "value", label: "Value", type: "number", defaultValue: 250, step: 0.1 }, { id: "from", label: "From", type: "select", defaultValue: 2, options: [{ value: 0, label: "Pa" }, { value: 1, label: "kPa" }, { value: 2, label: "MPa" }, { value: 3, label: "GPa" }, { value: 4, label: "PSI" }] }],
    (v) => { const toPa = [1, 1e3, 1e6, 1e9, 6894.76]; const pa = v.value * toPa[v.from]; return [{ label: "Pa", value: pa.toExponential(3), highlight: true }, { label: "kPa", value: (pa / 1e3).toFixed(2) }, { label: "MPa", value: (pa / 1e6).toFixed(4) }, { label: "GPa", value: (pa / 1e9).toFixed(6) }, { label: "PSI", value: (pa / 6894.76).toFixed(2) }]; },
    { expression: "Stress = Force / Area", variables: ["Steel yield ≈ 250 MPa"] }
  ),

  mc("strain-converter", "Strain Converter", "Convert between dimensionless strain, %, microstrain, and mm/m.", "Free strain converter.", "Material Properties",
    [{ id: "value", label: "Value", type: "number", defaultValue: 0.002, step: 0.0001 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Strain (ε)" }, { value: 1, label: "% Strain" }, { value: 2, label: "Microstrain (µε)" }, { value: 3, label: "mm/m" }] }],
    (v) => { const toE = [1, 0.01, 1e-6, 0.001]; const e = v.value * toE[v.from]; return [{ label: "Strain (ε)", value: e.toFixed(6), highlight: true }, { label: "% Strain", value: (e * 100).toFixed(4) }, { label: "Microstrain", value: (e * 1e6).toFixed(1) }, { label: "mm/m", value: (e * 1000).toFixed(3) }]; },
    { expression: "ε = ΔL/L", variables: ["Steel yield strain ≈ 0.2%"] }
  ),

  mc("youngs-modulus-converter", "Young's Modulus Converter", "Convert between GPa, MPa, PSI, and ksi.", "Free Young's modulus converter.", "Material Properties",
    [{ id: "value", label: "Value", type: "number", defaultValue: 200, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "GPa" }, { value: 1, label: "MPa" }, { value: 2, label: "PSI" }, { value: 3, label: "ksi" }] }],
    (v) => { const toGPa = [1, 0.001, 6.894e-6, 6.894e-3]; const gpa = v.value * toGPa[v.from]; return [{ label: "GPa", value: gpa.toFixed(4), highlight: true }, { label: "MPa", value: (gpa * 1000).toFixed(1) }, { label: "PSI", value: (gpa / 6.894e-6).toFixed(0) }, { label: "ksi", value: (gpa / 6.894e-3).toFixed(2) }]; },
    { expression: "E = σ/ε", variables: ["Steel ≈ 200 GPa"] }
  ),

  mc("bulk-modulus-converter", "Bulk Modulus Converter", "Convert between GPa, MPa, PSI, and bar.", "Free bulk modulus converter.", "Material Properties",
    [{ id: "value", label: "Value", type: "number", defaultValue: 2.2, step: 0.1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "GPa" }, { value: 1, label: "MPa" }, { value: 2, label: "bar" }] }],
    (v) => { const toGPa = [1, 0.001, 1e-4]; const gpa = v.value * toGPa[v.from]; return [{ label: "GPa", value: gpa.toFixed(4), highlight: true }, { label: "MPa", value: (gpa * 1000).toFixed(1) }, { label: "bar", value: (gpa * 10000).toFixed(0) }, { label: "PSI", value: (gpa / 6.894e-6).toFixed(0) }]; },
    { expression: "K = -V(dP/dV)", variables: ["Water ≈ 2.2 GPa"] }
  ),

  mc("shear-modulus-converter", "Shear Modulus Converter", "Convert between GPa, MPa, PSI, and ksi.", "Free shear modulus converter.", "Material Properties",
    [{ id: "value", label: "Value", type: "number", defaultValue: 80, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "GPa" }, { value: 1, label: "MPa" }, { value: 2, label: "ksi" }] }],
    (v) => { const toGPa = [1, 0.001, 6.894e-3]; const gpa = v.value * toGPa[v.from]; return [{ label: "GPa", value: gpa.toFixed(4), highlight: true }, { label: "MPa", value: (gpa * 1000).toFixed(1) }, { label: "ksi", value: (gpa / 6.894e-3).toFixed(2) }, { label: "PSI", value: (gpa / 6.894e-6).toFixed(0) }]; },
    { expression: "G = E / 2(1+ν)", variables: ["Steel ≈ 80 GPa"] }
  ),

  mc("elastic-modulus-converter", "Elastic Modulus Converter", "Convert between GPa, MPa, N/m², and PSI.", "Free elastic modulus converter.", "Material Properties",
    [{ id: "value", label: "Value", type: "number", defaultValue: 70, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "GPa" }, { value: 1, label: "MPa" }, { value: 2, label: "PSI" }] }],
    (v) => { const toGPa = [1, 0.001, 6.894e-6]; const gpa = v.value * toGPa[v.from]; return [{ label: "GPa", value: gpa.toFixed(4), highlight: true }, { label: "MPa", value: (gpa * 1000).toFixed(1) }, { label: "N/m²", value: (gpa * 1e9).toExponential(3) }, { label: "PSI", value: (gpa / 6.894e-6).toFixed(0) }]; },
    { expression: "Modulus = Stress / Strain", variables: ["Aluminum ≈ 70 GPa"] }
  ),

  mc("material-hardness-converter", "Material Hardness Converter", "Approximate conversion between Rockwell C, Brinell, and Vickers hardness.", "Free hardness converter.", "Material Properties",
    [{ id: "hrc", label: "Rockwell C (HRC)", type: "number", defaultValue: 30, step: 1, min: 20, max: 70 }],
    (v) => { const hb = 4.14 * v.hrc + 188; const hv = 6.1 * v.hrc + 199; return [{ label: "Rockwell C (HRC)", value: `${v.hrc}`, highlight: true }, { label: "Brinell (HB) ≈", value: hb.toFixed(0) }, { label: "Vickers (HV) ≈", value: hv.toFixed(0) }]; },
    { expression: "Approximate empirical correlations", variables: ["Exact values depend on material"] }
  ),

  // ═══════════════════════════════════════════
  // ASTRONOMICAL CONVERTERS
  // ═══════════════════════════════════════════

  mc("astronomical-distance-converter", "Astronomical Distance Converter", "Convert between AU, light-years, parsecs, and km.", "Free astronomical distance converter.", "Astronomy",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1, step: 0.01 }, { id: "from", label: "From", type: "select", defaultValue: 1, options: [{ value: 0, label: "AU" }, { value: 1, label: "Light-years" }, { value: 2, label: "Parsecs" }, { value: 3, label: "Kilometers" }] }],
    (v) => { const toKm = [1.496e8, 9.461e12, 3.086e13, 1]; const km = v.value * toKm[v.from]; return [{ label: "AU", value: (km / 1.496e8).toFixed(4), highlight: true }, { label: "Light-years", value: (km / 9.461e12).toFixed(6) }, { label: "Parsecs", value: (km / 3.086e13).toFixed(6) }, { label: "Kilometers", value: km.toExponential(4) }]; },
    { expression: "1 pc = 3.26 ly = 206,265 AU", variables: ["1 AU = Earth-Sun distance"] }
  ),

  mc("light-year-converter", "Light Year Converter", "Convert between light-years, parsecs, AU, and miles.", "Free light year converter.", "Astronomy",
    [{ id: "value", label: "Light-years", type: "number", defaultValue: 4.24, step: 0.01 }],
    (v) => { const km = v.value * 9.461e12; return [{ label: "Light-years", value: v.value.toFixed(4), highlight: true }, { label: "Parsecs", value: (v.value / 3.262).toFixed(4) }, { label: "AU", value: (v.value * 63241).toFixed(0) }, { label: "Trillion km", value: (km / 1e12).toFixed(3) }, { label: "Trillion miles", value: (km / 1.609e12).toFixed(3) }]; },
    { expression: "1 ly = 9.461 × 10¹² km", variables: ["Proxima Centauri = 4.24 ly"] }
  ),

  mc("parsec-converter", "Parsec Converter", "Convert between parsecs, light-years, AU, and km.", "Free parsec converter.", "Astronomy",
    [{ id: "value", label: "Parsecs", type: "number", defaultValue: 1, step: 0.01 }],
    (v) => { return [{ label: "Parsecs", value: v.value.toFixed(4), highlight: true }, { label: "Light-years", value: (v.value * 3.262).toFixed(4) }, { label: "AU", value: (v.value * 206265).toFixed(0) }, { label: "Trillion km", value: (v.value * 30.857).toFixed(3) }]; },
    { expression: "1 pc = 3.262 ly", variables: ["Parallax of 1 arcsecond"] }
  ),

  mc("stellar-magnitude-converter", "Stellar Magnitude Converter", "Convert between apparent magnitude and flux ratio.", "Free stellar magnitude converter.", "Astronomy",
    [{ id: "mag1", label: "Magnitude 1", type: "number", defaultValue: 1, step: 0.1 }, { id: "mag2", label: "Magnitude 2", type: "number", defaultValue: 6, step: 0.1 }],
    (v) => { const ratio = Math.pow(10, (v.mag2 - v.mag1) / 2.5); return [{ label: "Δ Magnitude", value: (v.mag2 - v.mag1).toFixed(2), highlight: true }, { label: "Flux Ratio", value: ratio.toFixed(2) }, { label: "Brighter Star", value: `m = ${Math.min(v.mag1, v.mag2)}` }]; },
    { expression: "F₁/F₂ = 10^((m₂−m₁)/2.5)", variables: ["Lower magnitude = brighter"] }
  ),

  mc("orbital-speed-converter", "Orbital Speed Converter", "Convert between km/s, m/s, mph, and escape velocity comparison.", "Free orbital speed converter.", "Astronomy",
    [{ id: "value", label: "Value", type: "number", defaultValue: 7.8, step: 0.1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "km/s" }, { value: 1, label: "m/s" }, { value: 2, label: "mph" }] }],
    (v) => { const toKms = [1, 0.001, 0.000447]; const kms = v.value * toKms[v.from]; return [{ label: "km/s", value: kms.toFixed(4), highlight: true }, { label: "m/s", value: (kms * 1000).toFixed(1) }, { label: "mph", value: (kms / 0.000447).toFixed(0) }, { label: "% of escape velocity", value: ((kms / 11.2) * 100).toFixed(1) }]; },
    { expression: "v = √(GM/r)", variables: ["ISS ≈ 7.8 km/s"] }
  ),

  mc("planetary-distance-converter", "Planetary Distance Converter", "Compare distances in AU, million km, and light-minutes.", "Free planetary distance converter.", "Astronomy",
    [{ id: "au", label: "Distance (AU)", type: "number", defaultValue: 1, step: 0.01 }],
    (v) => { const km = v.au * 1.496e8; const lightMin = km / (3e5 * 60); return [{ label: "AU", value: v.au.toFixed(4), highlight: true }, { label: "Million km", value: (km / 1e6).toFixed(2) }, { label: "Light-minutes", value: lightMin.toFixed(2) }, { label: "Million miles", value: (km / 1.609e6).toFixed(2) }]; },
    { expression: "1 AU = 149.6 million km", variables: ["Light-time = d/c"] }
  ),

  // ═══════════════════════════════════════════
  // NAVIGATION & AVIATION CONVERTERS
  // ═══════════════════════════════════════════

  mc("nautical-distance-converter", "Nautical Distance Converter", "Convert between nautical miles, km, miles, and meters.", "Free nautical distance converter.", "Navigation & Aviation",
    [{ id: "value", label: "Value", type: "number", defaultValue: 100, step: 0.1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Nautical Miles" }, { value: 1, label: "Kilometers" }, { value: 2, label: "Miles" }] }],
    (v) => { const toNm = [1, 0.539957, 0.868976]; const nm = v.value * toNm[v.from]; return [{ label: "Nautical Miles", value: nm.toFixed(4), highlight: true }, { label: "Kilometers", value: (nm / 0.539957).toFixed(2) }, { label: "Miles", value: (nm / 0.868976).toFixed(2) }, { label: "Meters", value: (nm * 1852).toFixed(0) }]; },
    { expression: "1 NM = 1.852 km", variables: ["1 NM = 1 minute of latitude"] }
  ),

  mc("wind-speed-converter", "Wind Speed Converter", "Convert between m/s, km/h, mph, knots, and Beaufort scale.", "Free wind speed converter.", "Navigation & Aviation",
    [{ id: "value", label: "Value", type: "number", defaultValue: 20, step: 0.1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "m/s" }, { value: 1, label: "km/h" }, { value: 2, label: "mph" }, { value: 3, label: "Knots" }] }],
    (v) => { const toMs = [1, 1 / 3.6, 0.44704, 0.514444]; const ms = v.value * toMs[v.from]; const beaufort = ms < 0.5 ? 0 : ms < 1.5 ? 1 : ms < 3.3 ? 2 : ms < 5.5 ? 3 : ms < 8 ? 4 : ms < 10.8 ? 5 : ms < 13.9 ? 6 : ms < 17.2 ? 7 : ms < 20.7 ? 8 : ms < 24.5 ? 9 : ms < 28.5 ? 10 : ms < 32.6 ? 11 : 12; return [{ label: "m/s", value: ms.toFixed(2), highlight: true }, { label: "km/h", value: (ms * 3.6).toFixed(1) }, { label: "mph", value: (ms / 0.44704).toFixed(1) }, { label: "Knots", value: (ms / 0.514444).toFixed(1) }, { label: "Beaufort", value: `${beaufort}` }]; },
    { expression: "Convert to m/s, then to target", variables: ["Hurricane ≥ 33 m/s (Beaufort 12)"] }
  ),

  mc("aircraft-speed-converter", "Aircraft Speed Converter", "Convert between knots, Mach, km/h, and mph.", "Free aircraft speed converter.", "Navigation & Aviation",
    [{ id: "value", label: "Value", type: "number", defaultValue: 250, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Knots (KTAS)" }, { value: 1, label: "Mach" }, { value: 2, label: "km/h" }, { value: 3, label: "mph" }] }],
    (v) => { const toKts = [1, 661.47, 0.539957, 0.868976]; const kts = v.value * toKts[v.from]; return [{ label: "Knots", value: kts.toFixed(1), highlight: true }, { label: "Mach (at FL350)", value: (kts / 661.47).toFixed(3) }, { label: "km/h", value: (kts / 0.539957).toFixed(1) }, { label: "mph", value: (kts / 0.868976).toFixed(1) }]; },
    { expression: "Mach 1 ≈ 661.47 kts at FL350", variables: ["Speed of sound varies with altitude"] }
  ),

  mc("fuel-consumption-aviation-converter", "Fuel Consumption Converter (Aviation)", "Convert between kg/h, lb/h, gal/h, and L/h for aviation fuel.", "Free aviation fuel consumption converter.", "Navigation & Aviation",
    [{ id: "value", label: "Value", type: "number", defaultValue: 2500, step: 10 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "kg/h" }, { value: 1, label: "lb/h" }, { value: 2, label: "gal/h (Jet-A)" }, { value: 3, label: "L/h" }] }],
    (v) => { const toKgh = [1, 0.453592, 3.028, 0.8]; const kgh = v.value * toKgh[v.from]; return [{ label: "kg/h", value: kgh.toFixed(1), highlight: true }, { label: "lb/h", value: (kgh / 0.453592).toFixed(1) }, { label: "gal/h (Jet-A)", value: (kgh / 3.028).toFixed(1) }, { label: "L/h", value: (kgh / 0.8).toFixed(1) }]; },
    { expression: "Jet-A density ≈ 0.8 kg/L", variables: ["737 ≈ 2500 kg/h cruise"] }
  ),

  mc("altitude-converter", "Altitude Converter", "Convert between feet, meters, and flight levels.", "Free altitude converter.", "Navigation & Aviation",
    [{ id: "value", label: "Value", type: "number", defaultValue: 35000, step: 100 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Feet" }, { value: 1, label: "Meters" }, { value: 2, label: "Flight Level (×100ft)" }] }],
    (v) => { const toFt = [1, 3.28084, 100]; const ft = v.value * toFt[v.from]; return [{ label: "Feet", value: ft.toFixed(0), highlight: true }, { label: "Meters", value: (ft / 3.28084).toFixed(0) }, { label: "Flight Level", value: `FL${Math.round(ft / 100)}` }, { label: "Kilometers", value: (ft / 3280.84).toFixed(2) }]; },
    { expression: "FL = altitude in feet / 100", variables: ["Cruising ≈ FL350 (35,000 ft)"] }
  ),

  mc("flight-distance-converter", "Flight Distance Converter", "Convert between nautical miles, km, miles, and great circle distance.", "Free flight distance converter.", "Navigation & Aviation",
    [{ id: "value", label: "Value", type: "number", defaultValue: 3000, step: 10 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Nautical Miles" }, { value: 1, label: "Kilometers" }, { value: 2, label: "Miles" }] }],
    (v) => { const toNm = [1, 0.539957, 0.868976]; const nm = v.value * toNm[v.from]; const hours = nm / 450; return [{ label: "Nautical Miles", value: nm.toFixed(0), highlight: true }, { label: "Kilometers", value: (nm * 1.852).toFixed(0) }, { label: "Miles", value: (nm * 1.15078).toFixed(0) }, { label: "Est. Flight Time (450kt)", value: `${Math.floor(hours)}h ${Math.round((hours % 1) * 60)}m` }]; },
    { expression: "Time = Distance / Speed", variables: ["Typical cruise ≈ 450 kts"] }
  ),

  mc("air-pressure-altitude-converter", "Air Pressure Altitude Converter", "Estimate pressure at altitude using ISA model.", "Free air pressure altitude converter.", "Navigation & Aviation",
    [{ id: "altitude", label: "Altitude (meters)", type: "number", defaultValue: 5000, step: 100 }],
    (v) => { const p = 101325 * Math.pow(1 - 2.25577e-5 * v.altitude, 5.25588); const pHpa = p / 100; const temp = 15 - 0.0065 * v.altitude; return [{ label: "Pressure (hPa)", value: pHpa.toFixed(1), highlight: true }, { label: "Pressure (atm)", value: (p / 101325).toFixed(4) }, { label: "Pressure (PSI)", value: (p / 6894.76).toFixed(2) }, { label: "Temp ISA (°C)", value: temp.toFixed(1) }]; },
    { expression: "P = P₀(1 − 2.26e-5·h)^5.256", variables: ["ISA: T = 15°C at sea level"] }
  ),

  // ═══════════════════════════════════════════
  // TYPOGRAPHY & PRINTING CONVERTERS
  // ═══════════════════════════════════════════

  mc("font-size-converter", "Font Size Converter", "Convert between pt, px, em, rem, and mm.", "Free font size converter.", "Typography & Printing",
    [{ id: "value", label: "Value", type: "number", defaultValue: 16, step: 0.5 }, { id: "from", label: "From", type: "select", defaultValue: 1, options: [{ value: 0, label: "Points (pt)" }, { value: 1, label: "Pixels (px)" }, { value: 2, label: "em/rem" }, { value: 3, label: "mm" }] }],
    (v) => { const toPx = [1.333, 1, 16, 3.7795]; const px = v.value * toPx[v.from]; return [{ label: "Pixels (px)", value: px.toFixed(2), highlight: true }, { label: "Points (pt)", value: (px / 1.333).toFixed(2) }, { label: "em/rem", value: (px / 16).toFixed(3) }, { label: "mm", value: (px / 3.7795).toFixed(2) }]; },
    { expression: "1pt ≈ 1.333px at 96 DPI", variables: ["1rem = 16px (default)"] }
  ),

  mc("dpi-to-ppi-converter", "DPI to PPI Converter", "Convert between DPI, PPI, and dots/cm.", "Free DPI to PPI converter.", "Typography & Printing",
    [{ id: "value", label: "Value", type: "number", defaultValue: 300, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "DPI" }, { value: 1, label: "PPI" }, { value: 2, label: "dots/cm" }] }],
    (v) => { const toDPI = [1, 1, 2.54]; const dpi = v.value * toDPI[v.from]; return [{ label: "DPI", value: dpi.toFixed(1), highlight: true }, { label: "PPI", value: dpi.toFixed(1) }, { label: "dots/cm", value: (dpi / 2.54).toFixed(1) }, { label: "dots/mm", value: (dpi / 25.4).toFixed(2) }]; },
    { expression: "1 inch = 2.54 cm", variables: ["Print: 300 DPI; Screen: 72-96 PPI"] }
  ),

  mc("paper-size-converter-ext", "Paper Size Converter", "View dimensions of A-series, B-series, Letter, Legal, and Tabloid.", "Free paper size converter.", "Typography & Printing",
    [{ id: "size", label: "Paper Size", type: "select", defaultValue: 4, options: [{ value: 0, label: "A0" }, { value: 1, label: "A1" }, { value: 2, label: "A2" }, { value: 3, label: "A3" }, { value: 4, label: "A4" }, { value: 5, label: "A5" }, { value: 6, label: "Letter" }, { value: 7, label: "Legal" }] }],
    (v) => { const sizes: Record<number, [number, number, string]> = { 0: [841, 1189, "A0"], 1: [594, 841, "A1"], 2: [420, 594, "A2"], 3: [297, 420, "A3"], 4: [210, 297, "A4"], 5: [148, 210, "A5"], 6: [216, 279, "Letter"], 7: [216, 356, "Legal"] }; const [w, h, n] = sizes[v.size]; return [{ label: "Size", value: n, highlight: true }, { label: "mm", value: `${w} × ${h}` }, { label: "inches", value: `${(w / 25.4).toFixed(1)} × ${(h / 25.4).toFixed(1)}` }, { label: "Area (m²)", value: (w * h / 1e6).toFixed(4) }]; },
    { expression: "ISO 216 paper sizes", variables: ["A0 = 1 m²"] }
  ),

  mc("point-to-pixel-converter", "Point to Pixel Converter", "Convert between typographic points and pixels at various DPIs.", "Free point to pixel converter.", "Typography & Printing",
    [{ id: "points", label: "Points", type: "number", defaultValue: 12, step: 0.5 }, { id: "dpi", label: "DPI", type: "number", defaultValue: 96, step: 1 }],
    (v) => { const px = v.points * v.dpi / 72; return [{ label: "Points", value: `${v.points} pt`, highlight: true }, { label: "Pixels", value: px.toFixed(2) }, { label: "At 72 DPI", value: `${(v.points * 1).toFixed(1)} px` }, { label: "At 300 DPI", value: `${(v.points * 300 / 72).toFixed(1)} px` }]; },
    { expression: "px = pt × DPI / 72", variables: ["1pt = 1/72 inch"] }
  ),

  mc("pixel-to-inch-converter", "Pixel to Inch Converter", "Convert pixels to inches at various DPIs.", "Free pixel to inch converter.", "Typography & Printing",
    [{ id: "pixels", label: "Pixels", type: "number", defaultValue: 1920, step: 1 }, { id: "dpi", label: "DPI/PPI", type: "number", defaultValue: 96, step: 1 }],
    (v) => { const inches = v.dpi > 0 ? v.pixels / v.dpi : 0; return [{ label: "Inches", value: inches.toFixed(3), highlight: true }, { label: "cm", value: (inches * 2.54).toFixed(2) }, { label: "mm", value: (inches * 25.4).toFixed(1) }, { label: "At 300 DPI", value: `${(v.pixels / 300).toFixed(3)} in` }]; },
    { expression: "inches = pixels / DPI", variables: ["Screen: 96 DPI, Print: 300 DPI"] }
  ),

  mc("print-resolution-converter", "Print Resolution Converter", "Calculate print size from pixel dimensions and DPI.", "Free print resolution calculator.", "Typography & Printing",
    [{ id: "widthPx", label: "Width (pixels)", type: "number", defaultValue: 3000, step: 1 }, { id: "heightPx", label: "Height (pixels)", type: "number", defaultValue: 2000, step: 1 }, { id: "dpi", label: "Print DPI", type: "number", defaultValue: 300, step: 1 }],
    (v) => { const wIn = v.dpi > 0 ? v.widthPx / v.dpi : 0; const hIn = v.dpi > 0 ? v.heightPx / v.dpi : 0; return [{ label: "Print Size (inches)", value: `${wIn.toFixed(1)} × ${hIn.toFixed(1)}`, highlight: true }, { label: "Print Size (cm)", value: `${(wIn * 2.54).toFixed(1)} × ${(hIn * 2.54).toFixed(1)}` }, { label: "Megapixels", value: (v.widthPx * v.heightPx / 1e6).toFixed(2) }, { label: "At 150 DPI", value: `${(v.widthPx / 150).toFixed(1)} × ${(v.heightPx / 150).toFixed(1)} in` }]; },
    { expression: "size = pixels / DPI", variables: ["300 DPI for quality print"] }
  ),

  // ═══════════════════════════════════════════
  // TIME & CALENDAR CONVERTERS
  // ═══════════════════════════════════════════

  mc("unix-timestamp-converter", "Unix Timestamp Converter", "Convert between Unix timestamps and human-readable dates.", "Free Unix timestamp converter.", "Time",
    [{ id: "timestamp", label: "Unix Timestamp (seconds)", type: "number", defaultValue: Math.floor(Date.now() / 1000), step: 1 }],
    (v) => { const d = new Date(v.timestamp * 1000); return [{ label: "Unix Timestamp", value: `${v.timestamp}`, highlight: true }, { label: "UTC Date", value: d.toUTCString() }, { label: "ISO 8601", value: d.toISOString() }, { label: "Milliseconds", value: `${v.timestamp * 1000}` }]; },
    { expression: "Seconds since Jan 1, 1970 UTC", variables: ["Unix epoch = midnight 1970"] }
  ),

  mc("seconds-to-time-converter", "Seconds to Time Converter", "Convert seconds to hours, minutes, days, and weeks.", "Free seconds to time converter.", "Time",
    [{ id: "seconds", label: "Seconds", type: "number", defaultValue: 86400, step: 1 }],
    (v) => { const d = Math.floor(v.seconds / 86400); const h = Math.floor((v.seconds % 86400) / 3600); const m = Math.floor((v.seconds % 3600) / 60); const s = Math.floor(v.seconds % 60); return [{ label: "Time", value: `${d}d ${h}h ${m}m ${s}s`, highlight: true }, { label: "Hours", value: (v.seconds / 3600).toFixed(2) }, { label: "Minutes", value: (v.seconds / 60).toFixed(1) }, { label: "Days", value: (v.seconds / 86400).toFixed(4) }]; },
    { expression: "1 day = 86400 seconds", variables: ["1 hour = 3600 seconds"] }
  ),

  mc("time-format-converter", "Time Format Converter (12h/24h)", "Convert between 12-hour and 24-hour time formats.", "Free 12h to 24h time converter.", "Time",
    [{ id: "hour24", label: "Hour (0-23)", type: "number", defaultValue: 14, step: 1, min: 0, max: 23 }, { id: "minute", label: "Minute (0-59)", type: "number", defaultValue: 30, step: 1, min: 0, max: 59 }],
    (v) => { const h24 = Math.min(23, Math.max(0, Math.floor(v.hour24))); const min = Math.min(59, Math.max(0, Math.floor(v.minute))); const h12 = h24 === 0 ? 12 : h24 > 12 ? h24 - 12 : h24; const ampm = h24 < 12 ? "AM" : "PM"; return [{ label: "24-hour", value: `${String(h24).padStart(2, "0")}:${String(min).padStart(2, "0")}`, highlight: true }, { label: "12-hour", value: `${h12}:${String(min).padStart(2, "0")} ${ampm}` }, { label: "Minutes since midnight", value: `${h24 * 60 + min}` }]; },
    { expression: "24h: 0-23; 12h: 12AM, 1-11AM, 12PM, 1-11PM", variables: ["14:30 = 2:30 PM"] }
  ),

  mc("epoch-time-converter", "Epoch Time Converter", "Convert epoch timestamps (ms and s) to readable dates.", "Free epoch time converter.", "Time",
    [{ id: "epoch", label: "Epoch (milliseconds)", type: "number", defaultValue: Date.now(), step: 1000 }],
    (v) => { const d = new Date(v.epoch); const s = v.epoch / 1000; return [{ label: "Epoch (ms)", value: v.epoch.toLocaleString(), highlight: true }, { label: "Epoch (s)", value: s.toFixed(0) }, { label: "Date", value: d.toLocaleDateString() }, { label: "Time", value: d.toLocaleTimeString() }]; },
    { expression: "Milliseconds since Jan 1, 1970", variables: ["JavaScript uses ms epoch"] }
  ),

  mc("julian-date-converter", "Julian Date Converter", "Convert between Julian Date and calendar date.", "Free Julian date converter.", "Time",
    [{ id: "jd", label: "Julian Date", type: "number", defaultValue: 2460000, step: 0.5 }],
    (v) => { const jd = v.jd + 0.5; const z = Math.floor(jd); const a = z < 2299161 ? z : (() => { const al = Math.floor((z - 1867216.25) / 36524.25); return z + 1 + al - Math.floor(al / 4); })(); const b = a + 1524; const c = Math.floor((b - 122.1) / 365.25); const d = Math.floor(365.25 * c); const e = Math.floor((b - d) / 30.6001); const day = b - d - Math.floor(30.6001 * e); const month = e < 14 ? e - 1 : e - 13; const year = month > 2 ? c - 4716 : c - 4715; return [{ label: "Julian Date", value: v.jd.toFixed(1), highlight: true }, { label: "Calendar Date", value: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}` }, { label: "Modified JD", value: (v.jd - 2400000.5).toFixed(1) }]; },
    { expression: "JD counts days from 4713 BC", variables: ["Used in astronomy"] }
  ),

  mc("time-interval-converter", "Time Interval Converter", "Convert between milliseconds, seconds, minutes, hours, and days.", "Free time interval converter.", "Time",
    [{ id: "value", label: "Value", type: "number", defaultValue: 3600000, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Milliseconds" }, { value: 1, label: "Seconds" }, { value: 2, label: "Minutes" }, { value: 3, label: "Hours" }, { value: 4, label: "Days" }] }],
    (v) => { const toMs = [1, 1000, 60000, 3600000, 86400000]; const ms = v.value * toMs[v.from]; return [{ label: "Milliseconds", value: ms.toLocaleString(), highlight: true }, { label: "Seconds", value: (ms / 1000).toFixed(2) }, { label: "Minutes", value: (ms / 60000).toFixed(4) }, { label: "Hours", value: (ms / 3600000).toFixed(6) }, { label: "Days", value: (ms / 86400000).toFixed(6) }]; },
    { expression: "Convert to ms, then to target", variables: ["1 day = 86,400,000 ms"] }
  ),

  // ═══════════════════════════════════════════
  // COOKING & FOOD CONVERTERS
  // ═══════════════════════════════════════════

  mc("ingredient-density-converter", "Ingredient Density Converter", "Convert between volume and weight for common ingredients.", "Free ingredient density converter for cooking.", "Cooking & Food",
    [{ id: "cups", label: "Cups", type: "number", defaultValue: 1, step: 0.25 }, { id: "ingredient", label: "Ingredient", type: "select", defaultValue: 0, options: [{ value: 0, label: "All-purpose flour" }, { value: 1, label: "Sugar" }, { value: 2, label: "Butter" }, { value: 3, label: "Water" }] }],
    (v) => { const densities = [125, 200, 227, 236.6]; const g = v.cups * densities[v.ingredient]; return [{ label: "Grams", value: g.toFixed(1), highlight: true }, { label: "Ounces", value: (g / 28.35).toFixed(2) }, { label: "Tablespoons", value: (v.cups * 16).toFixed(0) }, { label: "Teaspoons", value: (v.cups * 48).toFixed(0) }]; },
    { expression: "Weight = Cups × density", variables: ["Flour: 125g/cup, Sugar: 200g/cup"] }
  ),

  mc("baking-temperature-converter", "Baking Temperature Converter", "Convert between °C, °F, and Gas Mark for baking.", "Free baking temperature converter.", "Cooking & Food",
    [{ id: "value", label: "Value", type: "number", defaultValue: 180, step: 5 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "°C" }, { value: 1, label: "°F" }, { value: 2, label: "Gas Mark" }] }],
    (v) => { let c: number; if (v.from === 0) c = v.value; else if (v.from === 1) c = (v.value - 32) * 5 / 9; else c = v.value * 14 + 121; const f = c * 9 / 5 + 32; const gm = Math.round((c - 121) / 14); const desc = c < 150 ? "Low" : c < 180 ? "Moderate" : c < 220 ? "Hot" : "Very Hot"; return [{ label: "°C", value: `${c.toFixed(0)}°C`, highlight: true }, { label: "°F", value: `${f.toFixed(0)}°F` }, { label: "Gas Mark", value: `${Math.max(1, gm)}` }, { label: "Heat Level", value: desc }]; },
    { expression: "°F = °C × 9/5 + 32", variables: ["Gas Mark 4 = 180°C = 350°F"] }
  ),

  mc("recipe-portion-converter", "Recipe Portion Converter", "Scale recipe portions up or down.", "Free recipe portion scaler.", "Cooking & Food",
    [{ id: "original", label: "Original Servings", type: "number", defaultValue: 4, step: 1 }, { id: "desired", label: "Desired Servings", type: "number", defaultValue: 6, step: 1 }, { id: "amount", label: "Ingredient Amount", type: "number", defaultValue: 200, step: 1 }],
    (v) => { const factor = v.original > 0 ? v.desired / v.original : 1; const scaled = v.amount * factor; return [{ label: "Scale Factor", value: `${factor.toFixed(2)}×`, highlight: true }, { label: "Scaled Amount", value: scaled.toFixed(1) }, { label: "Original Amount", value: `${v.amount}` }, { label: "Change", value: `${factor >= 1 ? "+" : ""}${((factor - 1) * 100).toFixed(0)}%` }]; },
    { expression: "New = Original × (Desired/Original servings)", variables: ["Scale all ingredients equally"] }
  ),

  mc("oven-temperature-converter", "Oven Temperature Converter", "Convert common oven temperatures between scales.", "Free oven temperature converter.", "Cooking & Food",
    [{ id: "temp", label: "Temperature", type: "select", defaultValue: 3, options: [{ value: 0, label: "250°F / 120°C" }, { value: 1, label: "300°F / 150°C" }, { value: 2, label: "325°F / 160°C" }, { value: 3, label: "350°F / 180°C" }, { value: 4, label: "375°F / 190°C" }, { value: 5, label: "400°F / 200°C" }, { value: 6, label: "425°F / 220°C" }, { value: 7, label: "450°F / 230°C" }] }],
    (v) => { const temps: [number, number, number, string][] = [[120, 250, 1, "Very Low"], [150, 300, 2, "Low"], [160, 325, 3, "Moderate Low"], [180, 350, 4, "Moderate"], [190, 375, 5, "Moderate Hot"], [200, 400, 6, "Hot"], [220, 425, 7, "Very Hot"], [230, 450, 8, "Extremely Hot"]]; const [c, f, gm, desc] = temps[v.temp]; return [{ label: "°C", value: `${c}°C`, highlight: true }, { label: "°F", value: `${f}°F` }, { label: "Gas Mark", value: `${gm}` }, { label: "Description", value: desc }]; },
    { expression: "Common oven temperature reference", variables: ["Most baking: 350°F / 180°C"] }
  ),

  mc("cooking-measurement-converter", "Cooking Measurement Converter", "Convert between tsp, tbsp, cups, mL, and fluid oz.", "Free cooking measurement converter.", "Cooking & Food",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1, step: 0.25 }, { id: "from", label: "From", type: "select", defaultValue: 2, options: [{ value: 0, label: "Teaspoons" }, { value: 1, label: "Tablespoons" }, { value: 2, label: "Cups" }, { value: 3, label: "mL" }, { value: 4, label: "Fluid oz" }] }],
    (v) => { const toMl = [4.929, 14.787, 236.588, 1, 29.5735]; const ml = v.value * toMl[v.from]; return [{ label: "mL", value: ml.toFixed(2), highlight: true }, { label: "Teaspoons", value: (ml / 4.929).toFixed(2) }, { label: "Tablespoons", value: (ml / 14.787).toFixed(2) }, { label: "Cups", value: (ml / 236.588).toFixed(3) }, { label: "Fluid oz", value: (ml / 29.5735).toFixed(2) }]; },
    { expression: "1 cup = 16 tbsp = 48 tsp", variables: ["1 tbsp = ~15 mL"] }
  ),

  mc("sugar-conversion-calculator", "Sugar Conversion Calculator", "Convert between sugar types: granulated, powdered, brown, and honey.", "Free sugar conversion calculator.", "Cooking & Food",
    [{ id: "cups", label: "Cups Granulated Sugar", type: "number", defaultValue: 1, step: 0.25 }],
    (v) => { return [{ label: "Granulated", value: `${v.cups} cups (${(v.cups * 200).toFixed(0)}g)`, highlight: true }, { label: "Powdered", value: `${(v.cups * 1.75).toFixed(2)} cups (${(v.cups * 200 * 0.875).toFixed(0)}g)` }, { label: "Brown (packed)", value: `${v.cups} cups (${(v.cups * 220).toFixed(0)}g)` }, { label: "Honey", value: `${(v.cups * 0.75).toFixed(2)} cups` }]; },
    { expression: "Approximate substitution ratios", variables: ["Reduce liquid when using honey"] }
  ),

  mc("butter-conversion-calculator", "Butter Conversion Calculator", "Convert butter between sticks, cups, grams, and tablespoons.", "Free butter conversion calculator.", "Cooking & Food",
    [{ id: "sticks", label: "Sticks of Butter", type: "number", defaultValue: 1, step: 0.25 }],
    (v) => { const g = v.sticks * 113; return [{ label: "Sticks", value: `${v.sticks}`, highlight: true }, { label: "Cups", value: (v.sticks * 0.5).toFixed(2) }, { label: "Tablespoons", value: (v.sticks * 8).toFixed(0) }, { label: "Grams", value: g.toFixed(0) }, { label: "Ounces", value: (g / 28.35).toFixed(1) }]; },
    { expression: "1 stick = ½ cup = 8 tbsp = 113g", variables: ["US standard stick"] }
  ),

  // ═══════════════════════════════════════════
  // TEXTILE & FABRIC CONVERTERS
  // ═══════════════════════════════════════════

  mc("fabric-weight-converter", "Fabric Weight Converter", "Convert between g/m² (GSM), oz/yd², and g/yd².", "Free fabric weight converter.", "Textile",
    [{ id: "value", label: "Value", type: "number", defaultValue: 150, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "g/m² (GSM)" }, { value: 1, label: "oz/yd²" }] }],
    (v) => { const toGsm = [1, 33.906]; const gsm = v.value * toGsm[v.from]; const category = gsm < 100 ? "Light" : gsm < 200 ? "Medium" : gsm < 350 ? "Heavy" : "Very Heavy"; return [{ label: "g/m² (GSM)", value: gsm.toFixed(1), highlight: true }, { label: "oz/yd²", value: (gsm / 33.906).toFixed(2) }, { label: "Weight Class", value: category }]; },
    { expression: "1 oz/yd² = 33.906 g/m²", variables: ["T-shirt ≈ 150-180 GSM"] }
  ),

  mc("thread-count-converter", "Thread Count Converter", "Compare thread counts and calculate thread density.", "Free thread count reference.", "Textile",
    [{ id: "tc", label: "Thread Count", type: "number", defaultValue: 400, step: 10 }, { id: "width", label: "Fabric Width (inches)", type: "number", defaultValue: 1, step: 0.1 }],
    (v) => { const density = v.width > 0 ? v.tc / v.width : 0; const quality = v.tc < 200 ? "Basic" : v.tc < 400 ? "Good" : v.tc < 600 ? "Premium" : "Luxury"; return [{ label: "Thread Count", value: `${v.tc}`, highlight: true }, { label: "Threads/inch", value: density.toFixed(0) }, { label: "Quality", value: quality }]; },
    { expression: "TC = warp + weft threads per sq inch", variables: ["300-400 TC is sweet spot"] }
  ),

  mc("yarn-count-converter", "Yarn Count Converter", "Convert between Ne (cotton count), Nm (metric), and denier.", "Free yarn count converter.", "Textile",
    [{ id: "value", label: "Value", type: "number", defaultValue: 30, step: 0.1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Ne (cotton count)" }, { value: 1, label: "Nm (metric)" }, { value: 2, label: "Denier" }] }],
    (v) => { let ne: number; if (v.from === 0) ne = v.value; else if (v.from === 1) ne = v.value / 1.6934; else ne = 5315 / v.value; const nm = ne * 1.6934; const den = 5315 / ne; return [{ label: "Ne (Cotton)", value: ne.toFixed(2), highlight: true }, { label: "Nm (Metric)", value: nm.toFixed(2) }, { label: "Denier", value: den.toFixed(1) }, { label: "Tex", value: (den / 9).toFixed(2) }]; },
    { expression: "Ne × Denier = 5315", variables: ["Higher Ne = finer yarn"] }
  ),

  mc("textile-density-converter", "Textile Density Converter", "Convert between threads/inch, threads/cm, and EPI/PPI.", "Free textile density converter.", "Textile",
    [{ id: "value", label: "Threads per inch", type: "number", defaultValue: 80, step: 1 }],
    (v) => { return [{ label: "Threads/inch", value: v.value.toFixed(0), highlight: true }, { label: "Threads/cm", value: (v.value / 2.54).toFixed(1) }, { label: "Threads/10cm", value: (v.value / 2.54 * 10).toFixed(0) }]; },
    { expression: "1 inch = 2.54 cm", variables: ["EPI = ends per inch, PPI = picks per inch"] }
  ),

  // ═══════════════════════════════════════════
  // CONSTRUCTION CONVERTERS
  // ═══════════════════════════════════════════

  mc("concrete-volume-converter", "Concrete Volume Converter", "Calculate concrete volume for slabs and convert between units.", "Free concrete volume calculator.", "Construction",
    [{ id: "length", label: "Length (ft)", type: "number", defaultValue: 20, step: 0.5 }, { id: "width", label: "Width (ft)", type: "number", defaultValue: 10, step: 0.5 }, { id: "depth", label: "Depth (inches)", type: "number", defaultValue: 4, step: 0.5 }],
    (v) => { const ft3 = v.length * v.width * (v.depth / 12); const yd3 = ft3 / 27; const m3 = ft3 * 0.0283168; return [{ label: "Cubic Yards", value: yd3.toFixed(2), highlight: true }, { label: "Cubic Feet", value: ft3.toFixed(1) }, { label: "Cubic Meters", value: m3.toFixed(2) }, { label: "80lb Bags (≈0.6 ft³)", value: Math.ceil(ft3 / 0.6).toLocaleString() }]; },
    { expression: "V = L × W × D", variables: ["1 yd³ = 27 ft³"] }
  ),

  mc("brick-quantity-converter", "Brick Quantity Converter", "Estimate bricks needed for a wall.", "Free brick quantity calculator.", "Construction",
    [{ id: "length", label: "Wall Length (ft)", type: "number", defaultValue: 20, step: 0.5 }, { id: "height", label: "Wall Height (ft)", type: "number", defaultValue: 8, step: 0.5 }],
    (v) => { const sqft = v.length * v.height; const bricks = Math.ceil(sqft * 7); return [{ label: "Area (sq ft)", value: sqft.toFixed(1), highlight: true }, { label: "Standard Bricks", value: bricks.toLocaleString() }, { label: "With 5% waste", value: Math.ceil(bricks * 1.05).toLocaleString() }, { label: "With 10% waste", value: Math.ceil(bricks * 1.10).toLocaleString() }]; },
    { expression: "≈ 7 standard bricks per sq ft", variables: ["Includes mortar joints"] }
  ),

  mc("sand-volume-converter", "Sand Volume Converter", "Convert sand volume and estimate weight.", "Free sand volume converter.", "Construction",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1, step: 0.1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Cubic yards" }, { value: 1, label: "Cubic feet" }, { value: 2, label: "Cubic meters" }] }],
    (v) => { const toYd3 = [1, 1 / 27, 1.30795]; const yd3 = v.value * toYd3[v.from]; const tons = yd3 * 1.35; return [{ label: "Cubic Yards", value: yd3.toFixed(2), highlight: true }, { label: "Cubic Feet", value: (yd3 * 27).toFixed(1) }, { label: "Cubic Meters", value: (yd3 / 1.30795).toFixed(2) }, { label: "Tons (≈)", value: tons.toFixed(2) }]; },
    { expression: "Sand ≈ 1.35 tons/yd³", variables: ["Density varies with moisture"] }
  ),

  mc("steel-weight-converter", "Steel Weight Converter", "Calculate steel weight from dimensions.", "Free steel weight calculator.", "Construction",
    [{ id: "diameter", label: "Diameter (mm)", type: "number", defaultValue: 12, step: 1 }, { id: "length", label: "Length (m)", type: "number", defaultValue: 12, step: 0.5 }],
    (v) => { const area = Math.PI * (v.diameter / 2000) ** 2; const volume = area * v.length; const kg = volume * 7850; return [{ label: "Weight (kg)", value: kg.toFixed(2), highlight: true }, { label: "Weight (lb)", value: (kg * 2.205).toFixed(2) }, { label: "kg/m", value: (kg / v.length).toFixed(3) }, { label: "Cross Section (mm²)", value: (Math.PI * (v.diameter / 2) ** 2).toFixed(1) }]; },
    { expression: "W = πr²L × 7850 kg/m³", variables: ["Steel density = 7850 kg/m³"] }
  ),

  mc("roof-pitch-converter", "Roof Pitch Converter", "Convert between roof pitch (X:12), degrees, and percentage.", "Free roof pitch converter.", "Construction",
    [{ id: "pitch", label: "Pitch (rise per 12 run)", type: "number", defaultValue: 6, step: 0.5 }],
    (v) => { const degrees = Math.atan(v.pitch / 12) * 180 / Math.PI; const percent = (v.pitch / 12) * 100; const factor = Math.sqrt(1 + (v.pitch / 12) ** 2); return [{ label: "Pitch", value: `${v.pitch}:12`, highlight: true }, { label: "Degrees", value: `${degrees.toFixed(1)}°` }, { label: "Percentage", value: `${percent.toFixed(1)}%` }, { label: "Rafter Factor", value: factor.toFixed(4) }]; },
    { expression: "Angle = arctan(rise/run)", variables: ["4:12 to 8:12 is common"] }
  ),

  mc("construction-material-converter", "Construction Material Converter", "Estimate material quantities for common projects.", "Free construction material estimator.", "Construction",
    [{ id: "sqft", label: "Area (sq ft)", type: "number", defaultValue: 200, step: 10 }, { id: "material", label: "Material", type: "select", defaultValue: 0, options: [{ value: 0, label: "Paint" }, { value: 1, label: "Flooring (tile)" }, { value: 2, label: "Drywall" }, { value: 3, label: "Insulation" }] }],
    (v) => { const calcs: [string, string, string][] = [ [`${(v.sqft / 350).toFixed(1)} gallons`, `${Math.ceil(v.sqft / 350)} gallon cans`, "350 sq ft/gallon"], [`${Math.ceil(v.sqft * 1.1)} sq ft tiles`, `${Math.ceil(v.sqft * 1.1 / 15)} boxes (15 sqft)`, "10% waste added"], [`${Math.ceil(v.sqft / 32)} sheets (4×8)`, `${Math.ceil(v.sqft / 32 * 1.1)} sheets +waste`, "32 sq ft per sheet"], [`${Math.ceil(v.sqft / 40)} rolls (R-13)`, `${(v.sqft * 0.5).toFixed(0)} board feet`, "40 sq ft per roll"] ]; const [qty, alt, note] = calcs[v.material]; return [{ label: "Quantity", value: qty, highlight: true }, { label: "Alternative", value: alt }, { label: "Coverage Note", value: note }]; },
    { expression: "Quantity = Area / Coverage rate", variables: ["Always add 10% for waste"] }
  ),

  // ═══════════════════════════════════════════
  // AUTOMOTIVE CONVERTERS
  // ═══════════════════════════════════════════

  mc("engine-displacement-converter", "Engine Displacement Converter", "Convert between cc, liters, cubic inches, and cubic feet.", "Free engine displacement converter.", "Automotive",
    [{ id: "value", label: "Value", type: "number", defaultValue: 2000, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "cc (cm³)" }, { value: 1, label: "Liters" }, { value: 2, label: "Cubic inches" }] }],
    (v) => { const toCc = [1, 1000, 16.387]; const cc = v.value * toCc[v.from]; return [{ label: "cc (cm³)", value: cc.toFixed(0), highlight: true }, { label: "Liters", value: (cc / 1000).toFixed(2) }, { label: "Cubic inches", value: (cc / 16.387).toFixed(1) }]; },
    { expression: "1 L = 1000 cc", variables: ["V8 5.0L = 302 ci"] }
  ),

  mc("torque-to-power-converter", "Torque-to-Power Converter", "Calculate horsepower from torque and RPM.", "Free torque to HP converter.", "Automotive",
    [{ id: "torque", label: "Torque (lb·ft)", type: "number", defaultValue: 300, step: 1 }, { id: "rpm", label: "RPM", type: "number", defaultValue: 5000, step: 100 }],
    (v) => { const hp = (v.torque * v.rpm) / 5252; const kw = hp * 0.7457; return [{ label: "Horsepower", value: hp.toFixed(1), highlight: true }, { label: "Kilowatts", value: kw.toFixed(1) }, { label: "Torque (N·m)", value: (v.torque * 1.35582).toFixed(1) }, { label: "PS (metric HP)", value: (hp * 1.01387).toFixed(1) }]; },
    { expression: "HP = Torque × RPM / 5252", variables: ["5252 is where HP = Torque"] }
  ),

  mc("fuel-efficiency-converter", "Fuel Efficiency Converter", "Convert between MPG (US), MPG (UK), L/100km, and km/L.", "Free fuel efficiency converter.", "Automotive",
    [{ id: "value", label: "Value", type: "number", defaultValue: 30, step: 0.1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "MPG (US)" }, { value: 1, label: "MPG (UK)" }, { value: 2, label: "L/100km" }, { value: 3, label: "km/L" }] }],
    (v) => { let kml: number; if (v.from === 0) kml = v.value * 0.425144; else if (v.from === 1) kml = v.value * 0.354006; else if (v.from === 2) kml = v.value > 0 ? 100 / v.value : 0; else kml = v.value; return [{ label: "km/L", value: kml.toFixed(3), highlight: true }, { label: "MPG (US)", value: (kml / 0.425144).toFixed(1) }, { label: "MPG (UK)", value: (kml / 0.354006).toFixed(1) }, { label: "L/100km", value: kml > 0 ? (100 / kml).toFixed(1) : "∞" }]; },
    { expression: "Convert to km/L as base", variables: ["Lower L/100km = more efficient"] }
  ),

  mc("gear-ratio-converter", "Gear Ratio Converter", "Calculate gear ratios and final drive speed.", "Free gear ratio calculator.", "Automotive",
    [{ id: "driven", label: "Driven Teeth", type: "number", defaultValue: 40, step: 1 }, { id: "driving", label: "Driving Teeth", type: "number", defaultValue: 20, step: 1 }, { id: "inputRpm", label: "Input RPM", type: "number", defaultValue: 3000, step: 100 }],
    (v) => { const ratio = v.driving > 0 ? v.driven / v.driving : 0; const outputRpm = ratio > 0 ? v.inputRpm / ratio : 0; const torqueMult = ratio; return [{ label: "Gear Ratio", value: `${ratio.toFixed(2)}:1`, highlight: true }, { label: "Output RPM", value: outputRpm.toFixed(0) }, { label: "Torque Multiplier", value: `${torqueMult.toFixed(2)}×` }, { label: "Speed Reduction", value: `${((1 - 1 / ratio) * 100).toFixed(1)}%` }]; },
    { expression: "Ratio = Driven / Driving teeth", variables: ["Higher ratio = more torque, less speed"] }
  ),

  mc("tire-size-converter", "Tire Size Converter", "Calculate tire dimensions from size notation.", "Free tire size converter.", "Automotive",
    [{ id: "width", label: "Width (mm)", type: "number", defaultValue: 225, step: 5 }, { id: "aspect", label: "Aspect Ratio (%)", type: "number", defaultValue: 45, step: 5 }, { id: "rim", label: "Rim Diameter (inches)", type: "number", defaultValue: 17, step: 1 }],
    (v) => { const sidewall = v.width * (v.aspect / 100); const diameter = (sidewall * 2 + v.rim * 25.4); const circ = diameter * Math.PI; return [{ label: "Tire Size", value: `${v.width}/${v.aspect}R${v.rim}`, highlight: true }, { label: "Overall Diameter", value: `${diameter.toFixed(1)} mm (${(diameter / 25.4).toFixed(1)} in)` }, { label: "Sidewall Height", value: `${sidewall.toFixed(1)} mm` }, { label: "Circumference", value: `${circ.toFixed(0)} mm` }, { label: "Rev/mile", value: Math.round(1609344 / circ).toLocaleString() }]; },
    { expression: "Diameter = 2×sidewall + rim", variables: ["225/45R17 = common sports size"] }
  ),

  mc("vehicle-speed-converter", "Vehicle Speed Converter", "Convert vehicle speeds and calculate stopping distances.", "Free vehicle speed converter.", "Automotive",
    [{ id: "value", label: "Value", type: "number", defaultValue: 100, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "km/h" }, { value: 1, label: "mph" }, { value: 2, label: "m/s" }] }],
    (v) => { const toKmh = [1, 1.60934, 3.6]; const kmh = v.value * toKmh[v.from]; const ms = kmh / 3.6; const stopDist = ms * 1.5 + (ms * ms) / (2 * 7.5); return [{ label: "km/h", value: kmh.toFixed(1), highlight: true }, { label: "mph", value: (kmh / 1.60934).toFixed(1) }, { label: "m/s", value: ms.toFixed(2) }, { label: "Est. Stopping Distance", value: `${stopDist.toFixed(0)} m` }]; },
    { expression: "d = v×t_react + v²/(2a)", variables: ["t_react ≈ 1.5s, a ≈ 7.5 m/s²"] }
  ),
];
