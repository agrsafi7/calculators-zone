import { CalculatorConfig } from "@/components/CalculatorTemplate";

const convSubcategoryMap: Record<string, string> = {
  "length-converter": "Length & Distance",
  "weight-converter": "Weight & Mass",
  "mass-converter": "Weight & Mass",
  "temperature-converter": "Temperature",
  "area-converter": "Area & Volume",
  "volume-converter": "Area & Volume",
  "speed-converter": "Speed & Motion",
  "time-converter": "Time",
  "energy-converter": "Energy & Power",
  "pressure-converter": "Energy & Power",
  "power-converter": "Energy & Power",
  "data-storage-converter": "Digital & Data",
  "fuel-consumption-converter": "Fuel & Automotive",
  "angle-converter": "Angle & Rotation",
  "currency-converter": "Currency",
  "miles-to-kilometers-converter": "Length & Distance",
  "kilograms-to-pounds-converter": "Weight & Mass",
  "celsius-to-fahrenheit-converter": "Temperature",
  "liters-to-gallons-converter": "Area & Volume",
  "inches-to-centimeters-converter": "Length & Distance",
};


const convRelated = (exclude: string) => [
  { name: "Length Converter", slug: "length-converter", icon: "convert", category: "conversions" },
  { name: "Weight Converter", slug: "weight-converter", icon: "convert", category: "conversions" },
  { name: "Temperature Converter", slug: "temperature-converter", icon: "convert", category: "conversions" },
  { name: "Speed Converter", slug: "speed-converter", icon: "convert", category: "conversions" },
].filter((c) => c.slug !== exclude);

export const conversionCalculators: CalculatorConfig[] = [
  {
    slug: "length-converter", name: "Length Converter", category: "Units", categorySlug: "conversions",
    description: "Convert between meters, feet, inches, centimeters, kilometers, miles, and more.",
    metaDescription: "Free length converter. Convert between metric and imperial length units instantly.",
    icon: "convert",
    inputs: [
      { id: "value", label: "Value", type: "number", defaultValue: 100, step: 0.01 },
      { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Meters" }, { value: 1, label: "Feet" }, { value: 2, label: "Inches" }, { value: 3, label: "Centimeters" }, { value: 4, label: "Kilometers" }, { value: 5, label: "Miles" }] },
    ],
    calculate: (v) => {
      const toM = [1, 0.3048, 0.0254, 0.01, 1000, 1609.344];
      const m = v.value * toM[v.from];
      return [
        { label: "Meters", value: m.toFixed(4), highlight: true },
        { label: "Feet", value: (m / 0.3048).toFixed(4) },
        { label: "Inches", value: (m / 0.0254).toFixed(4) },
        { label: "Centimeters", value: (m / 0.01).toFixed(4) },
        { label: "Kilometers", value: (m / 1000).toFixed(6) },
        { label: "Miles", value: (m / 1609.344).toFixed(6) },
      ];
    },
    formula: { expression: "Convert to base unit (meters), then to target", variables: ["1 ft = 0.3048 m", "1 mi = 1609.344 m"] },
    howToUse: "Enter a value and select the source unit. All conversions are shown simultaneously.",
    faqs: [{ question: "How many feet in a meter?", answer: "1 meter = 3.28084 feet." }],
    relatedCalcs: convRelated("length-converter"),
  },
  {
    slug: "weight-converter", name: "Weight Converter", category: "Units", categorySlug: "conversions",
    description: "Convert between kilograms, pounds, ounces, grams, and stones.",
    metaDescription: "Free weight converter. Convert kg, lbs, oz, grams, stones instantly.",
    icon: "convert",
    inputs: [
      { id: "value", label: "Value", type: "number", defaultValue: 70, step: 0.01 },
      { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Kilograms" }, { value: 1, label: "Pounds" }, { value: 2, label: "Ounces" }, { value: 3, label: "Grams" }, { value: 4, label: "Stones" }] },
    ],
    calculate: (v) => {
      const toKg = [1, 0.453592, 0.0283495, 0.001, 6.35029];
      const kg = v.value * toKg[v.from];
      return [
        { label: "Kilograms", value: kg.toFixed(4), highlight: true },
        { label: "Pounds", value: (kg / 0.453592).toFixed(4) },
        { label: "Ounces", value: (kg / 0.0283495).toFixed(4) },
        { label: "Grams", value: (kg * 1000).toFixed(2) },
        { label: "Stones", value: (kg / 6.35029).toFixed(4) },
      ];
    },
    formula: { expression: "Convert to base (kg), then to target", variables: ["1 lb = 0.4536 kg", "1 stone = 6.35 kg"] },
    howToUse: "Enter a weight and source unit to see all conversions.",
    faqs: [{ question: "How many pounds in a kilogram?", answer: "1 kg = 2.20462 lbs." }],
    relatedCalcs: convRelated("weight-converter"),
  },
  {
    slug: "mass-converter", name: "Mass Converter", category: "Units", categorySlug: "conversions",
    description: "Convert between mass units including milligrams, grams, kilograms, metric tons, and more.",
    metaDescription: "Free mass converter. Convert mg, g, kg, metric tons, and more.",
    icon: "convert",
    inputs: [
      { id: "value", label: "Value", type: "number", defaultValue: 1000, step: 0.01 },
      { id: "from", label: "From", type: "select", defaultValue: 2, options: [{ value: 0, label: "Milligrams" }, { value: 1, label: "Grams" }, { value: 2, label: "Kilograms" }, { value: 3, label: "Metric Tons" }, { value: 4, label: "Pounds" }] },
    ],
    calculate: (v) => {
      const toG = [0.001, 1, 1000, 1000000, 453.592];
      const g = v.value * toG[v.from];
      return [
        { label: "Milligrams", value: (g * 1000).toFixed(2), highlight: true },
        { label: "Grams", value: g.toFixed(4) },
        { label: "Kilograms", value: (g / 1000).toFixed(6) },
        { label: "Metric Tons", value: (g / 1000000).toFixed(8) },
        { label: "Pounds", value: (g / 453.592).toFixed(6) },
      ];
    },
    formula: { expression: "Convert to grams, then to target unit", variables: ["1 kg = 1000 g", "1 metric ton = 1,000,000 g"] },
    howToUse: "Enter a mass value and unit to convert to all other units.",
    faqs: [{ question: "Mass vs weight?", answer: "Mass is constant everywhere; weight depends on gravity. On Earth's surface they're used interchangeably." }],
    relatedCalcs: convRelated("mass-converter"),
  },
  {
    slug: "temperature-converter", name: "Temperature Converter", category: "Units", categorySlug: "conversions",
    description: "Convert between Celsius, Fahrenheit, and Kelvin temperature scales.",
    metaDescription: "Free temperature converter. Convert °C, °F, and K instantly.",
    icon: "convert",
    inputs: [
      { id: "value", label: "Temperature", type: "number", defaultValue: 100, step: 0.1 },
      { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Celsius" }, { value: 1, label: "Fahrenheit" }, { value: 2, label: "Kelvin" }] },
    ],
    calculate: (v) => {
      let c: number;
      if (v.from === 0) c = v.value;
      else if (v.from === 1) c = (v.value - 32) * 5 / 9;
      else c = v.value - 273.15;
      return [
        { label: "Celsius", value: `${c.toFixed(2)} °C`, highlight: true },
        { label: "Fahrenheit", value: `${(c * 9 / 5 + 32).toFixed(2)} °F` },
        { label: "Kelvin", value: `${(c + 273.15).toFixed(2)} K` },
      ];
    },
    formula: { expression: "°F = °C × 9/5 + 32; K = °C + 273.15", variables: ["°C = (°F − 32) × 5/9"] },
    howToUse: "Enter a temperature and select its scale to see all conversions.",
    faqs: [{ question: "What is absolute zero?", answer: "0 K = −273.15 °C = −459.67 °F. It's the theoretical lowest temperature." }],
    relatedCalcs: convRelated("temperature-converter"),
  },
  {
    slug: "area-converter", name: "Area Converter", category: "Units", categorySlug: "conversions",
    description: "Convert between square meters, square feet, acres, hectares, and more.",
    metaDescription: "Free area unit converter. Convert sq meters, sq feet, acres, hectares.",
    icon: "convert",
    inputs: [
      { id: "value", label: "Value", type: "number", defaultValue: 1, step: 0.01 },
      { id: "from", label: "From", type: "select", defaultValue: 3, options: [{ value: 0, label: "Square Meters" }, { value: 1, label: "Square Feet" }, { value: 2, label: "Square Kilometers" }, { value: 3, label: "Acres" }, { value: 4, label: "Hectares" }] },
    ],
    calculate: (v) => {
      const toSqM = [1, 0.092903, 1000000, 4046.86, 10000];
      const sqm = v.value * toSqM[v.from];
      return [
        { label: "Square Meters", value: sqm.toFixed(2), highlight: true },
        { label: "Square Feet", value: (sqm / 0.092903).toFixed(2) },
        { label: "Acres", value: (sqm / 4046.86).toFixed(6) },
        { label: "Hectares", value: (sqm / 10000).toFixed(6) },
      ];
    },
    formula: { expression: "Convert to m², then to target", variables: ["1 acre = 4046.86 m²", "1 hectare = 10000 m²"] },
    howToUse: "Enter a value and source unit to convert between area units.",
    faqs: [{ question: "How big is an acre?", answer: "About 43,560 sq ft, roughly the size of a football field without end zones." }],
    relatedCalcs: convRelated("area-converter"),
  },
  {
    slug: "volume-converter", name: "Volume Converter", category: "Units", categorySlug: "conversions",
    description: "Convert between liters, gallons, cups, milliliters, and fluid ounces.",
    metaDescription: "Free volume converter. Convert liters, gallons, cups, ml, and fluid ounces.",
    icon: "convert",
    inputs: [
      { id: "value", label: "Value", type: "number", defaultValue: 1, step: 0.01 },
      { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Liters" }, { value: 1, label: "US Gallons" }, { value: 2, label: "US Cups" }, { value: 3, label: "Milliliters" }, { value: 4, label: "Fluid Ounces" }] },
    ],
    calculate: (v) => {
      const toL = [1, 3.78541, 0.236588, 0.001, 0.0295735];
      const l = v.value * toL[v.from];
      return [
        { label: "Liters", value: l.toFixed(4), highlight: true },
        { label: "US Gallons", value: (l / 3.78541).toFixed(4) },
        { label: "US Cups", value: (l / 0.236588).toFixed(4) },
        { label: "Milliliters", value: (l * 1000).toFixed(2) },
        { label: "Fluid Ounces", value: (l / 0.0295735).toFixed(4) },
      ];
    },
    formula: { expression: "Convert to liters, then to target", variables: ["1 gal = 3.785 L", "1 cup = 236.6 mL"] },
    howToUse: "Enter a volume and unit to see all conversions.",
    faqs: [{ question: "US vs Imperial gallon?", answer: "US gallon = 3.785 L. Imperial gallon = 4.546 L. This calculator uses US gallons." }],
    relatedCalcs: convRelated("volume-converter"),
  },
  {
    slug: "speed-converter", name: "Speed Converter", category: "Units", categorySlug: "conversions",
    description: "Convert between km/h, mph, m/s, knots, and feet per second.",
    metaDescription: "Free speed converter. Convert km/h, mph, m/s, knots, and ft/s.",
    icon: "convert",
    inputs: [
      { id: "value", label: "Value", type: "number", defaultValue: 100, step: 0.1 },
      { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "km/h" }, { value: 1, label: "mph" }, { value: 2, label: "m/s" }, { value: 3, label: "Knots" }] },
    ],
    calculate: (v) => {
      const toMs = [1 / 3.6, 0.44704, 1, 0.514444];
      const ms = v.value * toMs[v.from];
      return [
        { label: "km/h", value: (ms * 3.6).toFixed(2), highlight: true },
        { label: "mph", value: (ms / 0.44704).toFixed(2) },
        { label: "m/s", value: ms.toFixed(4) },
        { label: "Knots", value: (ms / 0.514444).toFixed(2) },
        { label: "ft/s", value: (ms / 0.3048).toFixed(2) },
      ];
    },
    formula: { expression: "Convert to m/s, then to target", variables: ["1 km/h = 0.2778 m/s", "1 mph = 0.4470 m/s"] },
    howToUse: "Enter a speed and unit to convert between speed units.",
    faqs: [{ question: "What are knots?", answer: "Nautical miles per hour. Used in aviation and maritime. 1 knot ≈ 1.852 km/h." }],
    relatedCalcs: convRelated("speed-converter"),
  },
  {
    slug: "time-converter", name: "Time Converter", category: "Units", categorySlug: "conversions",
    description: "Convert between seconds, minutes, hours, days, weeks, months, and years.",
    metaDescription: "Free time unit converter. Convert seconds, minutes, hours, days, weeks, months, years.",
    icon: "convert",
    inputs: [
      { id: "value", label: "Value", type: "number", defaultValue: 3600, step: 1 },
      { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Seconds" }, { value: 1, label: "Minutes" }, { value: 2, label: "Hours" }, { value: 3, label: "Days" }, { value: 4, label: "Weeks" }] },
    ],
    calculate: (v) => {
      const toS = [1, 60, 3600, 86400, 604800];
      const s = v.value * toS[v.from];
      return [
        { label: "Seconds", value: s.toLocaleString(), highlight: true },
        { label: "Minutes", value: (s / 60).toFixed(2) },
        { label: "Hours", value: (s / 3600).toFixed(4) },
        { label: "Days", value: (s / 86400).toFixed(4) },
        { label: "Weeks", value: (s / 604800).toFixed(4) },
      ];
    },
    formula: { expression: "Convert to seconds, then to target", variables: ["1 min = 60s", "1 hr = 3600s", "1 day = 86400s"] },
    howToUse: "Enter a time value and unit to see all conversions.",
    faqs: [{ question: "How many seconds in a year?", answer: "Approximately 31,536,000 seconds (365 days)." }],
    relatedCalcs: convRelated("time-converter"),
  },
  {
    slug: "energy-converter", name: "Energy Converter", category: "Units", categorySlug: "conversions",
    description: "Convert between joules, calories, kilowatt-hours, BTU, and electron volts.",
    metaDescription: "Free energy converter. Convert joules, calories, kWh, BTU, and eV.",
    icon: "convert",
    inputs: [
      { id: "value", label: "Value", type: "number", defaultValue: 1000, step: 0.01 },
      { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Joules" }, { value: 1, label: "Calories" }, { value: 2, label: "kWh" }, { value: 3, label: "BTU" }] },
    ],
    calculate: (v) => {
      const toJ = [1, 4.184, 3600000, 1055.06];
      const j = v.value * toJ[v.from];
      return [
        { label: "Joules", value: j.toFixed(2), highlight: true },
        { label: "Calories", value: (j / 4.184).toFixed(2) },
        { label: "Kilowatt-hours", value: (j / 3600000).toFixed(6) },
        { label: "BTU", value: (j / 1055.06).toFixed(4) },
      ];
    },
    formula: { expression: "Convert to joules, then to target", variables: ["1 cal = 4.184 J", "1 kWh = 3,600,000 J"] },
    howToUse: "Enter an energy value and unit to convert between energy units.",
    faqs: [{ question: "What is a joule?", answer: "The SI unit of energy. One joule is the energy needed to exert 1 newton of force over 1 meter." }],
    relatedCalcs: convRelated("energy-converter"),
  },
  {
    slug: "pressure-converter", name: "Pressure Converter", category: "Units", categorySlug: "conversions",
    description: "Convert between pascals, atmospheres, PSI, bar, and mmHg.",
    metaDescription: "Free pressure converter. Convert Pa, atm, PSI, bar, mmHg.",
    icon: "convert",
    inputs: [
      { id: "value", label: "Value", type: "number", defaultValue: 1, step: 0.01 },
      { id: "from", label: "From", type: "select", defaultValue: 1, options: [{ value: 0, label: "Pascals" }, { value: 1, label: "Atmospheres" }, { value: 2, label: "PSI" }, { value: 3, label: "Bar" }, { value: 4, label: "mmHg" }] },
    ],
    calculate: (v) => {
      const toPa = [1, 101325, 6894.76, 100000, 133.322];
      const pa = v.value * toPa[v.from];
      return [
        { label: "Pascals", value: pa.toFixed(2), highlight: true },
        { label: "Atmospheres", value: (pa / 101325).toFixed(6) },
        { label: "PSI", value: (pa / 6894.76).toFixed(4) },
        { label: "Bar", value: (pa / 100000).toFixed(6) },
        { label: "mmHg", value: (pa / 133.322).toFixed(4) },
      ];
    },
    formula: { expression: "Convert to pascals, then to target", variables: ["1 atm = 101325 Pa", "1 bar = 100000 Pa"] },
    howToUse: "Enter a pressure and unit to convert between pressure units.",
    faqs: [{ question: "What is standard atmospheric pressure?", answer: "1 atm = 101,325 Pa = 14.696 PSI = 760 mmHg." }],
    relatedCalcs: convRelated("pressure-converter"),
  },
  {
    slug: "power-converter", name: "Power Converter", category: "Units", categorySlug: "conversions",
    description: "Convert between watts, kilowatts, horsepower, BTU/h, and foot-pounds/second.",
    metaDescription: "Free power converter. Convert watts, kW, horsepower, BTU/h.",
    icon: "convert",
    inputs: [
      { id: "value", label: "Value", type: "number", defaultValue: 746, step: 0.1 },
      { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Watts" }, { value: 1, label: "Kilowatts" }, { value: 2, label: "Horsepower" }, { value: 3, label: "BTU/h" }] },
    ],
    calculate: (v) => {
      const toW = [1, 1000, 745.7, 0.293071];
      const w = v.value * toW[v.from];
      return [
        { label: "Watts", value: w.toFixed(2), highlight: true },
        { label: "Kilowatts", value: (w / 1000).toFixed(4) },
        { label: "Horsepower", value: (w / 745.7).toFixed(4) },
        { label: "BTU/h", value: (w / 0.293071).toFixed(2) },
      ];
    },
    formula: { expression: "Convert to watts, then to target", variables: ["1 HP = 745.7 W", "1 kW = 1000 W"] },
    howToUse: "Enter a power value and unit to convert.",
    faqs: [{ question: "What is horsepower?", answer: "Originally defined by James Watt. 1 HP ≈ 745.7 watts." }],
    relatedCalcs: convRelated("power-converter"),
  },
  {
    slug: "data-storage-converter", name: "Data Storage Converter", category: "Units", categorySlug: "conversions",
    description: "Convert between bytes, KB, MB, GB, TB, and PB.",
    metaDescription: "Free data storage converter. Convert bytes, KB, MB, GB, TB instantly.",
    icon: "convert",
    inputs: [
      { id: "value", label: "Value", type: "number", defaultValue: 1, step: 0.01 },
      { id: "from", label: "From", type: "select", defaultValue: 3, options: [{ value: 0, label: "Bytes" }, { value: 1, label: "KB" }, { value: 2, label: "MB" }, { value: 3, label: "GB" }, { value: 4, label: "TB" }] },
    ],
    calculate: (v) => {
      const toB = [1, 1024, 1048576, 1073741824, 1099511627776];
      const b = v.value * toB[v.from];
      return [
        { label: "Bytes", value: b.toLocaleString(), highlight: true },
        { label: "Kilobytes (KB)", value: (b / 1024).toFixed(2) },
        { label: "Megabytes (MB)", value: (b / 1048576).toFixed(4) },
        { label: "Gigabytes (GB)", value: (b / 1073741824).toFixed(6) },
        { label: "Terabytes (TB)", value: (b / 1099511627776).toFixed(8) },
      ];
    },
    formula: { expression: "1 KB = 1024 B; 1 MB = 1024 KB; etc.", variables: ["Binary (base-2) conversions"] },
    howToUse: "Enter a data size and unit to convert between storage units.",
    faqs: [{ question: "KB vs KiB?", answer: "KB traditionally = 1024 bytes (binary). Formally, KiB = 1024 bytes and KB = 1000 bytes (SI). This uses binary." }],
    relatedCalcs: convRelated("data-storage-converter"),
  },
  {
    slug: "fuel-consumption-converter", name: "Fuel Consumption Converter", category: "Units", categorySlug: "conversions",
    description: "Convert between miles per gallon (MPG), liters per 100km, and km per liter.",
    metaDescription: "Free fuel consumption converter. Convert MPG, L/100km, km/L.",
    icon: "convert",
    inputs: [
      { id: "value", label: "Value", type: "number", defaultValue: 30, step: 0.1 },
      { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "MPG (US)" }, { value: 1, label: "L/100km" }, { value: 2, label: "km/L" }] },
    ],
    calculate: (v) => {
      let kml: number;
      if (v.from === 0) kml = v.value * 0.425144;
      else if (v.from === 1) kml = v.value > 0 ? 100 / v.value : 0;
      else kml = v.value;
      const mpg = kml / 0.425144;
      const l100 = kml > 0 ? 100 / kml : 0;
      return [
        { label: "MPG (US)", value: mpg.toFixed(2), highlight: true },
        { label: "L/100km", value: l100.toFixed(2) },
        { label: "km/L", value: kml.toFixed(2) },
      ];
    },
    formula: { expression: "MPG × 0.4251 = km/L; L/100km = 100/km/L", variables: ["US MPG used"] },
    howToUse: "Enter a fuel consumption value and unit to convert.",
    faqs: [{ question: "Which is better, higher or lower?", answer: "Higher MPG or km/L = better efficiency. Lower L/100km = better efficiency." }],
    relatedCalcs: convRelated("fuel-consumption-converter"),
  },
  {
    slug: "angle-converter", name: "Angle Converter", category: "Units", categorySlug: "conversions",
    description: "Convert between degrees, radians, gradians, and turns.",
    metaDescription: "Free angle converter. Convert degrees, radians, gradians, turns.",
    icon: "convert",
    inputs: [
      { id: "value", label: "Value", type: "number", defaultValue: 180, step: 0.1 },
      { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "Degrees" }, { value: 1, label: "Radians" }, { value: 2, label: "Gradians" }, { value: 3, label: "Turns" }] },
    ],
    calculate: (v) => {
      const toDeg = [1, 180 / Math.PI, 0.9, 360];
      const deg = v.value * toDeg[v.from];
      return [
        { label: "Degrees", value: `${deg.toFixed(4)}°`, highlight: true },
        { label: "Radians", value: `${(deg * Math.PI / 180).toFixed(6)} rad` },
        { label: "Gradians", value: `${(deg / 0.9).toFixed(4)} gon` },
        { label: "Turns", value: (deg / 360).toFixed(6) },
      ];
    },
    formula: { expression: "1 turn = 360° = 2π rad = 400 gon", variables: ["π rad = 180°"] },
    howToUse: "Enter an angle and unit to convert between angle units.",
    faqs: [{ question: "What is a radian?", answer: "The angle subtended by an arc equal to the radius. A full circle = 2π radians." }],
    relatedCalcs: convRelated("angle-converter"),
  },
  {
    slug: "currency-converter", name: "Currency Converter", category: "Units", categorySlug: "conversions",
    description: "Convert between major currencies using approximate exchange rates. Note: rates are approximate.",
    metaDescription: "Simple currency converter with approximate rates for USD, EUR, GBP, JPY, and more.",
    icon: "convert",
    inputs: [
      { id: "amount", label: "Amount", type: "number", defaultValue: 100, step: 0.01 },
      { id: "from", label: "From", type: "select", defaultValue: 0, options: [{ value: 0, label: "USD" }, { value: 1, label: "EUR" }, { value: 2, label: "GBP" }, { value: 3, label: "JPY" }, { value: 4, label: "CAD" }] },
    ],
    calculate: (v) => {
      const toUSD = [1, 1.08, 1.27, 0.0067, 0.74];
      const usd = v.amount * toUSD[v.from];
      return [
        { label: "USD", value: `$${usd.toFixed(2)}`, highlight: true },
        { label: "EUR", value: `€${(usd / 1.08).toFixed(2)}` },
        { label: "GBP", value: `£${(usd / 1.27).toFixed(2)}` },
        { label: "JPY", value: `¥${(usd / 0.0067).toFixed(0)}` },
        { label: "CAD", value: `C$${(usd / 0.74).toFixed(2)}` },
      ];
    },
    formula: { expression: "Amount × Exchange Rate", variables: ["⚠️ Rates are approximate / static", "Use a live API for real-time rates"] },
    howToUse: "Enter an amount and currency. Note: exchange rates are approximate and not live.",
    faqs: [{ question: "Are these rates live?", answer: "No. These are approximate static rates. For actual trading, use a live exchange rate service." }],
    relatedCalcs: convRelated("currency-converter"),
  },
  {
    slug: "miles-to-kilometers-converter", name: "Miles to Kilometers Converter", category: "Units", categorySlug: "conversions",
    description: "Quickly convert miles to kilometers and vice versa.",
    metaDescription: "Convert miles to kilometers and km to miles. Free instant converter.",
    icon: "convert",
    inputs: [
      { id: "miles", label: "Miles", type: "number", defaultValue: 26.2, step: 0.01 },
    ],
    calculate: (v) => {
      const km = v.miles * 1.60934;
      return [
        { label: "Kilometers", value: km.toFixed(4), highlight: true },
        { label: "Meters", value: (km * 1000).toFixed(1) },
      ];
    },
    formula: { expression: "km = miles × 1.60934", variables: ["1 mile = 1.60934 km"] },
    howToUse: "Enter miles to get the equivalent in kilometers.",
    faqs: [{ question: "Why 1.60934?", answer: "This is the exact international conversion factor defined in 1959." }],
    relatedCalcs: convRelated("miles-to-kilometers-converter"),
  },
  {
    slug: "kilograms-to-pounds-converter", name: "Kilograms to Pounds Converter", category: "Units", categorySlug: "conversions",
    description: "Convert kilograms to pounds and ounces quickly.",
    metaDescription: "Convert kg to lbs instantly. Free kilograms to pounds converter.",
    icon: "convert",
    inputs: [
      { id: "kg", label: "Kilograms", type: "number", defaultValue: 75, step: 0.01 },
    ],
    calculate: (v) => {
      const lbs = v.kg * 2.20462;
      const oz = lbs * 16;
      return [
        { label: "Pounds", value: lbs.toFixed(4), highlight: true },
        { label: "Ounces", value: oz.toFixed(2) },
        { label: "Stones & Pounds", value: `${Math.floor(lbs / 14)} st ${(lbs % 14).toFixed(1)} lb` },
      ];
    },
    formula: { expression: "lbs = kg × 2.20462", variables: ["1 kg = 2.20462 lbs"] },
    howToUse: "Enter a weight in kilograms to convert to pounds.",
    faqs: [{ question: "How accurate is this?", answer: "Exact to the international definition: 1 lb = 0.45359237 kg." }],
    relatedCalcs: convRelated("kilograms-to-pounds-converter"),
  },
  {
    slug: "celsius-to-fahrenheit-converter", name: "Celsius to Fahrenheit Converter", category: "Units", categorySlug: "conversions",
    description: "Convert Celsius to Fahrenheit and Kelvin quickly.",
    metaDescription: "Convert °C to °F instantly. Free Celsius to Fahrenheit converter.",
    icon: "convert",
    inputs: [
      { id: "celsius", label: "Celsius (°C)", type: "number", defaultValue: 37, step: 0.1 },
    ],
    calculate: (v) => {
      const f = v.celsius * 9 / 5 + 32;
      const k = v.celsius + 273.15;
      return [
        { label: "Fahrenheit", value: `${f.toFixed(2)} °F`, highlight: true },
        { label: "Kelvin", value: `${k.toFixed(2)} K` },
      ];
    },
    formula: { expression: "°F = °C × 9/5 + 32", variables: ["K = °C + 273.15"] },
    howToUse: "Enter a temperature in Celsius to convert.",
    faqs: [{ question: "What is body temperature?", answer: "Normal body temp is ~37 °C = 98.6 °F." }],
    relatedCalcs: convRelated("celsius-to-fahrenheit-converter"),
  },
  {
    slug: "liters-to-gallons-converter", name: "Liters to Gallons Converter", category: "Units", categorySlug: "conversions",
    description: "Convert liters to US gallons and vice versa.",
    metaDescription: "Convert liters to gallons instantly. Free L to gal converter.",
    icon: "convert",
    inputs: [
      { id: "liters", label: "Liters", type: "number", defaultValue: 10, step: 0.01 },
    ],
    calculate: (v) => {
      const gal = v.liters / 3.78541;
      return [
        { label: "US Gallons", value: gal.toFixed(4), highlight: true },
        { label: "Imperial Gallons", value: (v.liters / 4.54609).toFixed(4) },
        { label: "Quarts", value: (gal * 4).toFixed(4) },
      ];
    },
    formula: { expression: "US gal = L / 3.78541", variables: ["1 US gal = 3.78541 L"] },
    howToUse: "Enter liters to convert to gallons.",
    faqs: [{ question: "US vs Imperial gallon?", answer: "US gallon = 3.785 L. Imperial gallon = 4.546 L." }],
    relatedCalcs: convRelated("liters-to-gallons-converter"),
  },
  {
    slug: "inches-to-centimeters-converter", name: "Inches to Centimeters Converter", category: "Units", categorySlug: "conversions",
    description: "Convert inches to centimeters and millimeters.",
    metaDescription: "Convert inches to cm instantly. Free inches to centimeters converter.",
    icon: "convert",
    inputs: [
      { id: "inches", label: "Inches", type: "number", defaultValue: 12, step: 0.01 },
    ],
    calculate: (v) => {
      const cm = v.inches * 2.54;
      return [
        { label: "Centimeters", value: `${cm.toFixed(4)} cm`, highlight: true },
        { label: "Millimeters", value: `${(cm * 10).toFixed(2)} mm` },
        { label: "Meters", value: `${(cm / 100).toFixed(4)} m` },
      ];
    },
    formula: { expression: "cm = inches × 2.54", variables: ["1 inch = 2.54 cm exactly"] },
    howToUse: "Enter inches to convert to centimeters.",
    faqs: [{ question: "Why exactly 2.54?", answer: "Since 1959, the international inch is defined as exactly 2.54 cm." }],
    relatedCalcs: convRelated("inches-to-centimeters-converter"),
  },
];
