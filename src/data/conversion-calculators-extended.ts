import { CalculatorConfig } from "@/components/CalculatorTemplate";

const rel = (exclude: string) => [
  { name: "Length Converter", slug: "length-converter", icon: "convert", category: "conversions" },
  { name: "Weight Converter", slug: "weight-converter", icon: "convert", category: "conversions" },
  { name: "Temperature Converter", slug: "temperature-converter", icon: "convert", category: "conversions" },
].filter(c => c.slug !== exclude);

const makeConv = (slug: string, name: string, desc: string, meta: string, subcategory: string, inputs: CalculatorConfig["inputs"], calculate: CalculatorConfig["calculate"], formula: CalculatorConfig["formula"]): CalculatorConfig => ({
  slug, name, category: "Units", categorySlug: "conversions", description: desc, metaDescription: meta, icon: "convert", subcategory,
  inputs, calculate, formula,
  howToUse: `Enter a value to convert using the ${name}.`,
  faqs: [{ question: `How does the ${name} work?`, answer: `It converts between related units using standard conversion factors.` }],
  relatedCalcs: rel(slug),
});

export const conversionCalculatorsExtended: CalculatorConfig[] = [
  // Frequency Conversions
  makeConv("frequency-converter", "Frequency Converter", "Convert between Hz, kHz, MHz, GHz, and RPM.", "Free frequency converter. Convert Hz, kHz, MHz, GHz.", "Frequency",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1000, step: 0.01 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Hz" }, { value: 1, label: "kHz" }, { value: 2, label: "MHz" }, { value: 3, label: "GHz" }] }],
    (v) => { const toHz = [1, 1e3, 1e6, 1e9]; const hz = v.value * toHz[v.from]; return [{ label: "Hz", value: hz.toLocaleString(), highlight: true }, { label: "kHz", value: (hz / 1e3).toFixed(4) }, { label: "MHz", value: (hz / 1e6).toFixed(6) }, { label: "GHz", value: (hz / 1e9).toFixed(9) }]; },
    { expression: "Convert to Hz, then to target", variables: ["1 kHz = 1000 Hz", "1 MHz = 10⁶ Hz"] }
  ),
  // Torque Converter
  makeConv("torque-converter", "Torque Converter", "Convert between N·m, lb·ft, kg·cm, and dyne·cm.", "Free torque converter. Convert N·m, lb·ft, kg·cm.", "Force & Torque",
    [{ id: "value", label: "Value", type: "number", defaultValue: 100, step: 0.01 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "N·m" }, { value: 1, label: "lb·ft" }, { value: 2, label: "kg·cm" }] }],
    (v) => { const toNm = [1, 1.35582, 0.0980665]; const nm = v.value * toNm[v.from]; return [{ label: "N·m", value: nm.toFixed(4), highlight: true }, { label: "lb·ft", value: (nm / 1.35582).toFixed(4) }, { label: "kg·cm", value: (nm / 0.0980665).toFixed(2) }]; },
    { expression: "Convert to N·m, then to target", variables: ["1 lb·ft = 1.356 N·m"] }
  ),
  // Force Converter
  makeConv("force-converter", "Force Converter", "Convert between Newtons, pounds-force, dynes, and kilogram-force.", "Free force converter. Convert N, lbf, dyn, kgf.", "Force & Torque",
    [{ id: "value", label: "Value", type: "number", defaultValue: 100, step: 0.01 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Newtons" }, { value: 1, label: "Pounds-force" }, { value: 2, label: "Kilogram-force" }] }],
    (v) => { const toN = [1, 4.44822, 9.80665]; const n = v.value * toN[v.from]; return [{ label: "Newtons", value: n.toFixed(4), highlight: true }, { label: "Pounds-force", value: (n / 4.44822).toFixed(4) }, { label: "Kilogram-force", value: (n / 9.80665).toFixed(4) }, { label: "Dynes", value: (n * 1e5).toFixed(0) }]; },
    { expression: "Convert to Newtons, then to target", variables: ["1 lbf = 4.448 N"] }
  ),
  // Density Converter
  makeConv("density-converter", "Density Converter", "Convert between kg/m³, g/cm³, lb/ft³, and lb/gal.", "Free density converter. Convert kg/m³, g/cm³, lb/ft³.", "Density",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1000, step: 0.1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "kg/m³" }, { value: 1, label: "g/cm³" }, { value: 2, label: "lb/ft³" }] }],
    (v) => { const toKg = [1, 1000, 16.0185]; const kg = v.value * toKg[v.from]; return [{ label: "kg/m³", value: kg.toFixed(2), highlight: true }, { label: "g/cm³", value: (kg / 1000).toFixed(4) }, { label: "lb/ft³", value: (kg / 16.0185).toFixed(4) }]; },
    { expression: "Convert to kg/m³, then to target", variables: ["Water = 1000 kg/m³ = 1 g/cm³"] }
  ),
  // Luminance Converter
  makeConv("luminance-converter", "Luminance Converter", "Convert between candela/m², foot-lambert, and nit.", "Free luminance converter. Convert cd/m², fL, nit.", "Light & Optics",
    [{ id: "value", label: "Value", type: "number", defaultValue: 500, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "cd/m² (nit)" }, { value: 1, label: "Foot-lambert" }] }],
    (v) => { const toNit = [1, 3.42626]; const nit = v.value * toNit[v.from]; return [{ label: "cd/m² (nit)", value: nit.toFixed(2), highlight: true }, { label: "Foot-lambert", value: (nit / 3.42626).toFixed(4) }]; },
    { expression: "Convert to nits (cd/m²)", variables: ["1 fL = 3.426 cd/m²"] }
  ),
  // Flow Rate Converter
  makeConv("flow-rate-converter", "Flow Rate Converter", "Convert between L/min, gal/min, m³/h, and ft³/min.", "Free flow rate converter. Convert L/min, GPM, m³/h, CFM.", "Flow & Fluid",
    [{ id: "value", label: "Value", type: "number", defaultValue: 10, step: 0.1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "L/min" }, { value: 1, label: "gal/min (GPM)" }, { value: 2, label: "m³/h" }, { value: 3, label: "ft³/min (CFM)" }] }],
    (v) => { const toLpm = [1, 3.78541, 16.6667, 28.3168]; const lpm = v.value * toLpm[v.from]; return [{ label: "L/min", value: lpm.toFixed(3), highlight: true }, { label: "GPM", value: (lpm / 3.78541).toFixed(3) }, { label: "m³/h", value: (lpm / 16.6667).toFixed(4) }, { label: "CFM", value: (lpm / 28.3168).toFixed(4) }]; },
    { expression: "Convert to L/min, then to target", variables: ["1 GPM = 3.785 L/min"] }
  ),
  // Viscosity Converter
  makeConv("viscosity-converter", "Viscosity Converter", "Convert between Pa·s, cP (centipoise), and lb/(ft·s).", "Free viscosity converter. Convert Pa·s, cP, lb/(ft·s).", "Flow & Fluid",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1, step: 0.001 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Pa·s" }, { value: 1, label: "cP (centipoise)" }, { value: 2, label: "lb/(ft·s)" }] }],
    (v) => { const toPas = [1, 0.001, 1.48816]; const pas = v.value * toPas[v.from]; return [{ label: "Pa·s", value: pas.toFixed(6), highlight: true }, { label: "cP", value: (pas * 1000).toFixed(3) }, { label: "lb/(ft·s)", value: (pas / 1.48816).toFixed(6) }]; },
    { expression: "Convert to Pa·s, then to target", variables: ["Water ≈ 0.001 Pa·s = 1 cP at 20°C"] }
  ),
  // Acceleration Converter
  makeConv("acceleration-converter", "Acceleration Converter", "Convert between m/s², ft/s², g-force, and gal.", "Free acceleration converter. Convert m/s², ft/s², g.", "Speed & Motion",
    [{ id: "value", label: "Value", type: "number", defaultValue: 9.81, step: 0.01 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "m/s²" }, { value: 1, label: "ft/s²" }, { value: 2, label: "g-force" }] }],
    (v) => { const toMs2 = [1, 0.3048, 9.80665]; const ms2 = v.value * toMs2[v.from]; return [{ label: "m/s²", value: ms2.toFixed(4), highlight: true }, { label: "ft/s²", value: (ms2 / 0.3048).toFixed(4) }, { label: "g-force", value: (ms2 / 9.80665).toFixed(6) }, { label: "Gal (cm/s²)", value: (ms2 * 100).toFixed(2) }]; },
    { expression: "Convert to m/s², then to target", variables: ["1 g = 9.80665 m/s²"] }
  ),
  // Sound Level Converter
  makeConv("sound-level-converter", "Sound Level Converter", "Convert between decibels, nepers, and bels.", "Free sound level converter. Convert dB, Np, B.", "Sound & Audio",
    [{ id: "value", label: "Value (dB)", type: "number", defaultValue: 60, step: 0.1 }],
    (v) => { const np = v.value * 0.1151; const bel = v.value / 10; return [{ label: "Decibels", value: `${v.value} dB`, highlight: true }, { label: "Nepers", value: `${np.toFixed(4)} Np` }, { label: "Bels", value: `${bel.toFixed(2)} B` }]; },
    { expression: "1 Np = 8.686 dB; 1 B = 10 dB", variables: ["dB is most common"] }
  ),
  // Illuminance Converter
  makeConv("illuminance-converter", "Illuminance Converter", "Convert between lux, foot-candles, and phot.", "Free illuminance converter. Convert lux, fc, phot.", "Light & Optics",
    [{ id: "value", label: "Value", type: "number", defaultValue: 500, step: 1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Lux" }, { value: 1, label: "Foot-candles" }, { value: 2, label: "Phot" }] }],
    (v) => { const toLux = [1, 10.764, 10000]; const lux = v.value * toLux[v.from]; return [{ label: "Lux", value: lux.toFixed(2), highlight: true }, { label: "Foot-candles", value: (lux / 10.764).toFixed(4) }, { label: "Phot", value: (lux / 10000).toFixed(6) }]; },
    { expression: "Convert to lux, then to target", variables: ["1 fc ≈ 10.764 lux"] }
  ),
  // Magnetic Field Converter
  makeConv("magnetic-field-converter", "Magnetic Field Converter", "Convert between Tesla, Gauss, and mT.", "Free magnetic field converter. Convert T, G, mT.", "Electromagnetic",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1, step: 0.001 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Tesla" }, { value: 1, label: "Gauss" }, { value: 2, label: "milliTesla" }] }],
    (v) => { const toT = [1, 0.0001, 0.001]; const t = v.value * toT[v.from]; return [{ label: "Tesla", value: t.toExponential(4), highlight: true }, { label: "Gauss", value: (t * 10000).toFixed(2) }, { label: "milliTesla", value: (t * 1000).toFixed(4) }]; },
    { expression: "1 T = 10,000 G", variables: ["Earth's field ≈ 25-65 µT"] }
  ),
  // Radiation Dose Converter
  makeConv("radiation-dose-converter", "Radiation Dose Converter", "Convert between Sievert, rem, Gray, and rad.", "Free radiation dose converter. Convert Sv, rem, Gy, rad.", "Nuclear & Radiation",
    [{ id: "value", label: "Value", type: "number", defaultValue: 1, step: 0.001 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Sievert (Sv)" }, { value: 1, label: "rem" }, { value: 2, label: "Gray (Gy)" }] }],
    (v) => { const toSv = [1, 0.01, 1]; const sv = v.value * toSv[v.from]; return [{ label: "Sievert", value: sv.toFixed(6), highlight: true }, { label: "rem", value: (sv * 100).toFixed(4) }, { label: "milliSievert", value: (sv * 1000).toFixed(3) }]; },
    { expression: "1 Sv = 100 rem", variables: ["Annual background ≈ 2-3 mSv"] }
  ),
  // Cooking Weight Converter
  makeConv("cooking-weight-converter", "Cooking Weight Converter", "Convert between common cooking weights: grams, ounces, cups of flour/sugar.", "Free cooking weight converter for baking.", "Cooking",
    [{ id: "value", label: "Value (grams)", type: "number", defaultValue: 250, step: 1 }],
    (v) => { return [{ label: "Grams", value: `${v.value} g`, highlight: true }, { label: "Ounces", value: `${(v.value / 28.3495).toFixed(2)} oz` }, { label: "Cups (flour)", value: `${(v.value / 125).toFixed(2)} cups` }, { label: "Cups (sugar)", value: `${(v.value / 200).toFixed(2)} cups` }]; },
    { expression: "Flour: 1 cup ≈ 125g; Sugar: 1 cup ≈ 200g", variables: ["Weight-based baking is more accurate"] }
  ),
  // Hex to Decimal Converter
  makeConv("hex-decimal-converter", "Hex to Decimal Converter", "Convert between hexadecimal, decimal, binary, and octal number systems.", "Free hex to decimal converter. Convert hex, dec, bin, oct.", "Digital & Data",
    [{ id: "decimal", label: "Decimal Number", type: "number", defaultValue: 255, min: 0 }],
    (v) => { const n = Math.floor(Math.abs(v.decimal)); return [{ label: "Decimal", value: `${n}`, highlight: true }, { label: "Hexadecimal", value: `0x${n.toString(16).toUpperCase()}` }, { label: "Binary", value: `${n.toString(2)}` }, { label: "Octal", value: `0o${n.toString(8)}` }]; },
    { expression: "Standard base conversion", variables: ["Hex = base 16", "Binary = base 2"] }
  ),
  // Color Code Converter
  makeConv("color-code-converter", "Color Code Converter", "Convert between RGB values and approximate hex color codes.", "Free color code converter. RGB to hex conversion.", "Digital & Data",
    [{ id: "r", label: "Red (0-255)", type: "number", defaultValue: 37, min: 0, max: 255 }, { id: "g", label: "Green (0-255)", type: "number", defaultValue: 99, min: 0, max: 255 }, { id: "b", label: "Blue (0-255)", type: "number", defaultValue: 235, min: 0, max: 255 }],
    (v) => { const hex = `#${[v.r, v.g, v.b].map(c => Math.min(255, Math.max(0, Math.round(c))).toString(16).padStart(2, "0")).join("")}`; const hsl = (() => { const r = v.r / 255, g = v.g / 255, b = v.b / 255; const max = Math.max(r, g, b), min = Math.min(r, g, b); const l = (max + min) / 2; if (max === min) return `hsl(0, 0%, ${Math.round(l * 100)}%)`; const d = max - min; const s = l > 0.5 ? d / (2 - max - min) : d / (max + min); let h = 0; if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6; else if (max === g) h = ((b - r) / d + 2) / 6; else h = ((r - g) / d + 4) / 6; return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`; })(); return [{ label: "Hex", value: hex.toUpperCase(), highlight: true }, { label: "RGB", value: `rgb(${v.r}, ${v.g}, ${v.b})` }, { label: "HSL", value: hsl }]; },
    { expression: "RGB → Hex: each channel to base-16", variables: ["0-255 per channel"] }
  ),
  // Fuel Economy Converter (imperial/metric)
  makeConv("fuel-economy-converter", "Fuel Economy Converter", "Convert between MPG (US), MPG (UK), L/100km, and km/L.", "Free fuel economy converter. Convert MPG, L/100km, km/L.", "Fuel & Automotive",
    [{ id: "value", label: "Value", type: "number", defaultValue: 30, step: 0.1 }, { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "MPG (US)" }, { value: 1, label: "MPG (UK)" }, { value: 2, label: "L/100km" }, { value: 3, label: "km/L" }] }],
    (v) => { const toKml = [0.425144, 0.354006, (v2: number) => v2 > 0 ? 100 / v2 : 0, 1]; let kml: number; if (v.from === 2) { kml = v.value > 0 ? 100 / v.value : 0; } else { kml = v.value * (typeof toKml[v.from] === "number" ? toKml[v.from] as number : 1); } return [{ label: "km/L", value: kml.toFixed(3), highlight: true }, { label: "MPG (US)", value: (kml / 0.425144).toFixed(2) }, { label: "MPG (UK)", value: (kml / 0.354006).toFixed(2) }, { label: "L/100km", value: kml > 0 ? (100 / kml).toFixed(2) : "∞" }]; },
    { expression: "Convert to km/L as base unit", variables: ["US gallon ≠ UK gallon"] }
  ),
  // Shoe Size Converter (international)
  makeConv("shoe-size-international-converter", "International Shoe Size Converter", "Convert shoe sizes between US, UK, EU, and JP systems.", "Free international shoe size converter.", "Fashion & Apparel",
    [{ id: "usSize", label: "US Men's Size", type: "number", defaultValue: 10, step: 0.5, min: 4, max: 16 }],
    (v) => { const uk = v.usSize - 0.5; const eu = v.usSize + 33; const jp = (v.usSize + 18) * 0.847 + 7.62; return [{ label: "US", value: `${v.usSize}`, highlight: true }, { label: "UK", value: `${uk}` }, { label: "EU", value: `${eu}` }, { label: "JP (cm)", value: jp.toFixed(1) }]; },
    { expression: "Approximate sizing conversions", variables: ["Sizes vary by brand"] }
  ),
  // Ring Size Converter
  makeConv("ring-size-converter", "Ring Size Converter", "Convert ring sizes between US, UK, EU, and diameter (mm).", "Free ring size converter. Convert US, UK, EU ring sizes.", "Fashion & Apparel",
    [{ id: "usSize", label: "US Ring Size", type: "number", defaultValue: 7, step: 0.5, min: 3, max: 15 }],
    (v) => { const mm = 11.63 + (v.usSize * 0.8128); const ukIdx = Math.round((v.usSize - 0.5) * 2); const ukLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; const uk = ukLetters[Math.min(Math.max(ukIdx, 0), 25)] || "—"; return [{ label: "US Size", value: `${v.usSize}`, highlight: true }, { label: "UK/AU", value: uk }, { label: "EU (mm circumference)", value: `${(mm * Math.PI).toFixed(1)} mm` }, { label: "Inner Diameter", value: `${mm.toFixed(1)} mm` }]; },
    { expression: "Diameter = 11.63 + (US × 0.813) mm", variables: ["Approximate conversions"] }
  ),
  // Paper Size Converter
  makeConv("paper-size-converter", "Paper Size Converter", "View dimensions of standard paper sizes: A0-A6, Letter, Legal, Tabloid.", "Free paper size reference. A-series, Letter, Legal dimensions.", "Printing & Media",
    [{ id: "size", label: "Paper Size", type: "select", defaultValue: 4, options: [{ value: 0, label: "A0" }, { value: 1, label: "A1" }, { value: 2, label: "A2" }, { value: 3, label: "A3" }, { value: 4, label: "A4" }, { value: 5, label: "A5" }, { value: 6, label: "Letter" }, { value: 7, label: "Legal" }] }],
    (v) => { const sizes: Record<number, [number, number, string]> = { 0: [841, 1189, "A0"], 1: [594, 841, "A1"], 2: [420, 594, "A2"], 3: [297, 420, "A3"], 4: [210, 297, "A4"], 5: [148, 210, "A5"], 6: [216, 279, "Letter"], 7: [216, 356, "Legal"] }; const [w, h, n] = sizes[v.size]; return [{ label: "Size", value: n, highlight: true }, { label: "mm", value: `${w} × ${h} mm` }, { label: "inches", value: `${(w / 25.4).toFixed(1)} × ${(h / 25.4).toFixed(1)} in` }, { label: "Area", value: `${(w * h / 10000).toFixed(2)} m²` }]; },
    { expression: "Standard ISO 216 / ANSI sizes", variables: ["A-series: each size is half the previous"] }
  ),
  // Clothing Size Converter
  makeConv("clothing-size-converter", "Clothing Size Converter", "Convert clothing sizes between US, UK, and EU for tops.", "Free clothing size converter. US, UK, EU sizes.", "Fashion & Apparel",
    [{ id: "usSize", label: "US Size (Women)", type: "number", defaultValue: 8, min: 0, max: 20, step: 2 }],
    (v) => { const uk = v.usSize + 4; const eu = v.usSize + 30; const label = v.usSize <= 2 ? "XS" : v.usSize <= 4 ? "S" : v.usSize <= 8 ? "M" : v.usSize <= 12 ? "L" : v.usSize <= 16 ? "XL" : "XXL"; return [{ label: "US", value: `${v.usSize}`, highlight: true }, { label: "UK", value: `${uk}` }, { label: "EU", value: `${eu}` }, { label: "Letter", value: label }]; },
    { expression: "UK = US + 4; EU = US + 30", variables: ["Approximate — brands vary"] }
  ),
];
