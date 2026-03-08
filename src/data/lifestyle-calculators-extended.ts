import { CalculatorConfig } from "@/components/CalculatorTemplate";

const rel = (exclude: string) => [
  { name: "Sleep Calculator", slug: "sleep-calculator", icon: "smile", category: "lifestyle" },
  { name: "Travel Budget", slug: "travel-budget-calculator", icon: "smile", category: "lifestyle" },
  { name: "Electricity Cost", slug: "electricity-calculator", icon: "smile", category: "lifestyle" },
].filter(c => c.slug !== exclude);

const makeLife = (slug: string, name: string, desc: string, meta: string, subcategory: string, inputs: CalculatorConfig["inputs"], calculate: CalculatorConfig["calculate"], formula: CalculatorConfig["formula"]): CalculatorConfig => ({
  slug, name, category: "Lifestyle", categorySlug: "lifestyle", description: desc, metaDescription: meta, icon: "smile", subcategory,
  inputs, calculate, formula,
  howToUse: `Enter values to use the ${name}.`,
  faqs: [{ question: `What does the ${name} do?`, answer: desc }],
  relatedCalcs: rel(slug),
});

export const lifestyleCalculatorsExtended: CalculatorConfig[] = [
  // Home & Construction
  makeLife("paint-calculator", "Paint Calculator", "Calculate how much paint you need for walls based on room dimensions.", "Free paint calculator for rooms.", "Home & Construction",
    [{ id: "length", label: "Room Length (ft)", type: "number", defaultValue: 15, step: 0.5 }, { id: "width", label: "Room Width (ft)", type: "number", defaultValue: 12, step: 0.5 }, { id: "height", label: "Wall Height (ft)", type: "number", defaultValue: 8, step: 0.5 }, { id: "coats", label: "Number of Coats", type: "number", defaultValue: 2, min: 1 }],
    (v) => { const wallArea = 2 * (v.length + v.width) * v.height; const doorWindow = wallArea * 0.15; const paintableArea = (wallArea - doorWindow) * v.coats; const gallons = paintableArea / 350; return [{ label: "Gallons Needed", value: `${Math.ceil(gallons)}`, highlight: true }, { label: "Wall Area", value: `${wallArea.toFixed(0)} sq ft` }, { label: "Paintable Area", value: `${paintableArea.toFixed(0)} sq ft` }]; },
    { expression: "Gallons = Paintable Area / 350 sq ft per gallon", variables: ["Deduct 15% for doors/windows"] }
  ),
  makeLife("flooring-calculator", "Flooring Calculator", "Calculate flooring material needed for a room with waste factor.", "Free flooring calculator.", "Home & Construction",
    [{ id: "length", label: "Room Length (ft)", type: "number", defaultValue: 15, step: 0.5 }, { id: "width", label: "Room Width (ft)", type: "number", defaultValue: 12, step: 0.5 }, { id: "waste", label: "Waste (%)", type: "number", defaultValue: 10, min: 0 }],
    (v) => { const area = v.length * v.width; const withWaste = area * (1 + v.waste / 100); const boxes = Math.ceil(withWaste / 20); return [{ label: "Flooring Needed", value: `${withWaste.toFixed(0)} sq ft`, highlight: true }, { label: "Room Area", value: `${area.toFixed(0)} sq ft` }, { label: "Boxes (20 sq ft/box)", value: `${boxes}` }]; },
    { expression: "Total = Area × (1 + Waste%)", variables: ["Add 10% for straight, 15% for diagonal"] }
  ),
  makeLife("fence-calculator", "Fence Calculator", "Calculate fence materials needed: posts, rails, and pickets.", "Free fence calculator.", "Home & Construction",
    [{ id: "length", label: "Fence Length (ft)", type: "number", defaultValue: 100, step: 1 }, { id: "height", label: "Fence Height (ft)", type: "number", defaultValue: 6, step: 0.5 }, { id: "postSpacing", label: "Post Spacing (ft)", type: "number", defaultValue: 8, step: 1 }],
    (v) => { const posts = Math.ceil(v.length / v.postSpacing) + 1; const rails = Math.ceil(v.length / 8) * 3; const pickets = Math.ceil(v.length / 0.5); return [{ label: "Posts Needed", value: `${posts}`, highlight: true }, { label: "Rails (8ft)", value: `${rails}` }, { label: "Pickets", value: `${pickets}` }, { label: "Post Depth", value: `${Math.ceil(v.height / 3)} ft` }]; },
    { expression: "Posts = Length/Spacing + 1", variables: ["Post depth = 1/3 of height"] }
  ),
  makeLife("deck-calculator", "Deck Calculator", "Calculate decking boards, joists, and screws for a deck.", "Free deck calculator.", "Home & Construction",
    [{ id: "length", label: "Deck Length (ft)", type: "number", defaultValue: 16, step: 1 }, { id: "width", label: "Deck Width (ft)", type: "number", defaultValue: 12, step: 1 }],
    (v) => { const area = v.length * v.width; const boards = Math.ceil(area / 4); const joists = Math.ceil(v.length / 1.33) + 1; const screws = Math.ceil(area * 8); return [{ label: "Area", value: `${area} sq ft`, highlight: true }, { label: "Deck Boards (6\"×8')", value: `${boards}` }, { label: "Joists (16\" OC)", value: `${joists}` }, { label: "Screws", value: `~${screws}` }]; },
    { expression: "Boards = Area / board coverage; Joists at 16\" OC", variables: ["Add 10% for waste"] }
  ),
  // Travel & Auto
  makeLife("ev-range-calculator", "EV Range Calculator", "Estimate electric vehicle range based on battery capacity and consumption.", "Free EV range calculator.", "Travel & Auto",
    [{ id: "battery", label: "Battery Capacity (kWh)", type: "number", defaultValue: 75, step: 1 }, { id: "consumption", label: "Consumption (kWh/100mi)", type: "number", defaultValue: 28, step: 0.1 }, { id: "soc", label: "State of Charge (%)", type: "number", defaultValue: 100, min: 0, max: 100 }],
    (v) => { if (v.consumption === 0) return [{ label: "Error", value: "Consumption cannot be zero" }]; const usable = v.battery * (v.soc / 100); const range = (usable / v.consumption) * 100; return [{ label: "Estimated Range", value: `${range.toFixed(0)} miles`, highlight: true }, { label: "Usable Energy", value: `${usable.toFixed(1)} kWh` }, { label: "Range (km)", value: `${(range * 1.609).toFixed(0)} km` }]; },
    { expression: "Range = (Battery × SoC) / Consumption × 100", variables: ["Real-world range varies with weather, speed, terrain"] }
  ),
  makeLife("car-lease-calculator", "Car Lease Calculator", "Calculate monthly lease payments for a vehicle.", "Free car lease payment calculator.", "Travel & Auto",
    [{ id: "price", label: "Vehicle Price ($)", type: "number", defaultValue: 35000, step: 500 }, { id: "residual", label: "Residual Value (%)", type: "number", defaultValue: 55, min: 0, max: 100 }, { id: "months", label: "Lease Term (months)", type: "number", defaultValue: 36, min: 12 }, { id: "rate", label: "Money Factor (×)", type: "number", defaultValue: 0.0025, step: 0.0001 }],
    (v) => { const rv = v.price * (v.residual / 100); const dep = (v.price - rv) / v.months; const fin = (v.price + rv) * v.rate; const monthly = dep + fin; return [{ label: "Monthly Payment", value: `$${monthly.toFixed(2)}`, highlight: true }, { label: "Depreciation", value: `$${dep.toFixed(2)}/mo` }, { label: "Finance Charge", value: `$${fin.toFixed(2)}/mo` }, { label: "Total Cost", value: `$${(monthly * v.months).toFixed(0)}` }]; },
    { expression: "Payment = Depreciation + Finance", variables: ["MF × 2400 ≈ APR%"] }
  ),
  // Cooking & Kitchen
  makeLife("oven-temperature-converter", "Oven Temperature Converter", "Convert between Celsius, Fahrenheit, and gas marks for cooking.", "Free oven temperature converter.", "Cooking & Kitchen",
    [{ id: "tempF", label: "Temperature (°F)", type: "number", defaultValue: 350, step: 25 }],
    (v) => { const c = (v.tempF - 32) * 5 / 9; const gasMark = Math.round((v.tempF - 250) / 25); return [{ label: "Fahrenheit", value: `${v.tempF}°F`, highlight: true }, { label: "Celsius", value: `${Math.round(c)}°C` }, { label: "Gas Mark", value: `${Math.max(1, gasMark)}` }, { label: "Description", value: v.tempF <= 300 ? "Low" : v.tempF <= 375 ? "Moderate" : v.tempF <= 425 ? "Hot" : "Very Hot" }]; },
    { expression: "°C = (°F − 32) × 5/9", variables: ["Gas Mark ≈ (°F − 250)/25"] }
  ),
  makeLife("baking-conversion-calculator", "Baking Conversion Calculator", "Convert between butter sticks, cups, tablespoons, and grams.", "Free baking conversion calculator.", "Cooking & Kitchen",
    [{ id: "sticks", label: "Butter Sticks", type: "number", defaultValue: 1, step: 0.25 }],
    (v) => { const grams = v.sticks * 113.4; const cups = v.sticks * 0.5; const tbsp = v.sticks * 8; return [{ label: "Grams", value: `${grams.toFixed(0)} g`, highlight: true }, { label: "Cups", value: `${cups.toFixed(2)}` }, { label: "Tablespoons", value: `${tbsp}` }, { label: "Ounces", value: `${(v.sticks * 4).toFixed(1)} oz` }]; },
    { expression: "1 stick = 113.4g = ½ cup = 8 tbsp", variables: ["US butter stick standard"] }
  ),
  // Sports & Fitness
  makeLife("running-pace-calculator", "Running Pace Calculator", "Calculate running pace, speed, and finish time from distance and time.", "Free running pace calculator.", "Sports & Fitness",
    [{ id: "distance", label: "Distance (miles)", type: "number", defaultValue: 3.1, step: 0.1 }, { id: "minutes", label: "Time (minutes)", type: "number", defaultValue: 25, step: 0.5 }],
    (v) => { if (v.distance === 0) return [{ label: "Error", value: "Distance cannot be zero" }]; const pace = v.minutes / v.distance; const speed = v.distance / (v.minutes / 60); const paceMin = Math.floor(pace); const paceSec = Math.round((pace - paceMin) * 60); return [{ label: "Pace", value: `${paceMin}:${String(paceSec).padStart(2, "0")} /mi`, highlight: true }, { label: "Speed", value: `${speed.toFixed(1)} mph` }, { label: "5K Time", value: `${Math.floor(pace * 3.107)}:${String(Math.round(((pace * 3.107) % 1) * 60)).padStart(2, "0")}` }]; },
    { expression: "Pace = Time / Distance", variables: ["Speed = Distance / (Time/60)"] }
  ),
  makeLife("cycling-speed-calculator", "Cycling Speed Calculator", "Calculate cycling speed from distance and time.", "Free cycling speed calculator.", "Sports & Fitness",
    [{ id: "distance", label: "Distance (miles)", type: "number", defaultValue: 20, step: 0.1 }, { id: "hours", label: "Hours", type: "number", defaultValue: 1, min: 0 }, { id: "minutes", label: "Minutes", type: "number", defaultValue: 0, min: 0, max: 59 }],
    (v) => { const totalH = v.hours + v.minutes / 60; if (totalH === 0) return [{ label: "Error", value: "Time cannot be zero" }]; const speed = v.distance / totalH; return [{ label: "Average Speed", value: `${speed.toFixed(1)} mph`, highlight: true }, { label: "km/h", value: `${(speed * 1.609).toFixed(1)}` }, { label: "Pace", value: `${(60 / speed).toFixed(1)} min/mile` }]; },
    { expression: "Speed = Distance / Time", variables: ["Casual: 10-14 mph", "Racing: 25+ mph"] }
  ),
  makeLife("swimming-pace-calculator", "Swimming Pace Calculator", "Calculate swimming pace per 100m/yd from total distance and time.", "Free swimming pace calculator.", "Sports & Fitness",
    [{ id: "distance", label: "Distance (meters)", type: "number", defaultValue: 1500, step: 25 }, { id: "minutes", label: "Total Minutes", type: "number", defaultValue: 25, step: 0.5 }],
    (v) => { if (v.distance === 0) return [{ label: "Error", value: "Distance cannot be zero" }]; const per100 = (v.minutes / v.distance) * 100; const perMin = Math.floor(per100); const perSec = Math.round((per100 - perMin) * 60); return [{ label: "Pace /100m", value: `${perMin}:${String(perSec).padStart(2, "0")}`, highlight: true }, { label: "Speed", value: `${(v.distance / v.minutes * 60 / 1000).toFixed(2)} km/h` }]; },
    { expression: "Pace = (Time / Distance) × 100", variables: ["Per 100 meters"] }
  ),
  // Weather
  makeLife("uv-index-calculator", "UV Index Calculator", "Estimate UV exposure and safe sun time based on UV index and skin type.", "Free UV index calculator.", "Weather",
    [{ id: "uvIndex", label: "UV Index", type: "number", defaultValue: 6, min: 0, max: 15, step: 1 }, { id: "skinType", label: "Skin Type (1-6, Fitzpatrick)", type: "number", defaultValue: 3, min: 1, max: 6 }],
    (v) => { const baseMed = [200, 250, 350, 450, 600, 1000][v.skinType - 1]; const burnTime = baseMed / v.uvIndex; const level = v.uvIndex <= 2 ? "Low" : v.uvIndex <= 5 ? "Moderate" : v.uvIndex <= 7 ? "High" : v.uvIndex <= 10 ? "Very High" : "Extreme"; return [{ label: "Safe Sun Time", value: `~${Math.round(burnTime)} min`, highlight: true }, { label: "UV Level", value: level }, { label: "SPF 30 Extends", value: `~${Math.round(burnTime * 30)} min` }]; },
    { expression: "Burn Time ≈ MED / UV Index", variables: ["MED = Minimal Erythemal Dose", "Varies by skin type"] }
  ),
  makeLife("rain-amount-calculator", "Rainfall Calculator", "Calculate total water volume from rainfall over an area.", "Free rainfall calculator.", "Weather",
    [{ id: "rainfall", label: "Rainfall (inches)", type: "number", defaultValue: 1, step: 0.01 }, { id: "area", label: "Area (sq ft)", type: "number", defaultValue: 1000, step: 10 }],
    (v) => { const gallons = v.rainfall * v.area * 0.623; const liters = gallons * 3.78541; return [{ label: "Water Volume", value: `${gallons.toFixed(0)} gallons`, highlight: true }, { label: "Liters", value: `${liters.toFixed(0)} L` }, { label: "Weight", value: `${(gallons * 8.34).toFixed(0)} lbs` }]; },
    { expression: "Gallons = Rainfall × Area × 0.623", variables: ["1 inch of rain on 1000 sq ft ≈ 623 gallons"] }
  ),
  // Tech & Digital
  makeLife("screen-resolution-calculator", "Screen Resolution Calculator", "Calculate pixels per inch (PPI) from screen size and resolution.", "Free screen PPI calculator.", "Tech & Digital",
    [{ id: "widthPx", label: "Width (pixels)", type: "number", defaultValue: 2560, step: 1 }, { id: "heightPx", label: "Height (pixels)", type: "number", defaultValue: 1440, step: 1 }, { id: "diagonal", label: "Screen Size (inches)", type: "number", defaultValue: 27, step: 0.1 }],
    (v) => { if (v.diagonal === 0) return [{ label: "Error", value: "Size cannot be zero" }]; const diagPx = Math.sqrt(v.widthPx ** 2 + v.heightPx ** 2); const ppi = diagPx / v.diagonal; const megapixels = (v.widthPx * v.heightPx) / 1e6; return [{ label: "PPI", value: `${ppi.toFixed(1)}`, highlight: true }, { label: "Megapixels", value: `${megapixels.toFixed(2)} MP` }, { label: "Aspect Ratio", value: `${v.widthPx / (function gcd(a: number, b: number): number { return b ? gcd(b, a % b) : a; })(v.widthPx, v.heightPx)}:${v.heightPx / (function gcd(a: number, b: number): number { return b ? gcd(b, a % b) : a; })(v.widthPx, v.heightPx)}` }]; },
    { expression: "PPI = √(W² + H²) / diagonal", variables: ["Higher PPI = sharper display", "Retina ≈ 220+ PPI"] }
  ),
  makeLife("internet-speed-calculator", "Internet Speed Calculator", "Estimate download times based on internet speed for common file sizes.", "Free internet speed calculator.", "Tech & Digital",
    [{ id: "speed", label: "Internet Speed (Mbps)", type: "number", defaultValue: 100, step: 1 }],
    (v) => { const s = v.speed; const t = (sizeMB: number) => { const sec = (sizeMB * 8) / s; return sec < 60 ? `${sec.toFixed(1)}s` : `${(sec / 60).toFixed(1)}m`; }; return [{ label: "1 GB Movie", value: t(1000), highlight: true }, { label: "50 GB Game", value: t(50000) }, { label: "10 MB Photo", value: t(10) }, { label: "5 GB Backup", value: t(5000) }]; },
    { expression: "Time = File Size (Mb) / Speed (Mbps)", variables: ["1 byte = 8 bits"] }
  ),
  // Fashion & Shopping
  makeLife("discount-calculator", "Discount Calculator", "Calculate the sale price after applying a percentage discount.", "Free discount calculator.", "Fashion & Shopping",
    [{ id: "price", label: "Original Price ($)", type: "number", defaultValue: 99.99, step: 0.01 }, { id: "discount", label: "Discount (%)", type: "number", defaultValue: 25, min: 0, max: 100 }],
    (v) => { const savings = v.price * (v.discount / 100); const salePrice = v.price - savings; return [{ label: "Sale Price", value: `$${salePrice.toFixed(2)}`, highlight: true }, { label: "You Save", value: `$${savings.toFixed(2)}` }, { label: "With 8% Tax", value: `$${(salePrice * 1.08).toFixed(2)}` }]; },
    { expression: "Sale = Original × (1 − Discount%)", variables: ["Savings = Original × Discount%"] }
  ),
  makeLife("cost-per-use-calculator", "Cost Per Use Calculator", "Calculate the cost per use of an item based on price and expected uses.", "Free cost per use calculator.", "Fashion & Shopping",
    [{ id: "price", label: "Item Price ($)", type: "number", defaultValue: 200, step: 1 }, { id: "uses", label: "Expected Uses", type: "number", defaultValue: 100, min: 1 }],
    (v) => { const cpu = v.price / v.uses; return [{ label: "Cost Per Use", value: `$${cpu.toFixed(2)}`, highlight: true }, { label: "Uses to Break Even at $5", value: `${Math.ceil(v.price / 5)}` }, { label: "Uses to Break Even at $1", value: `${Math.ceil(v.price / 1)}` }]; },
    { expression: "Cost Per Use = Price / Number of Uses", variables: ["Lower = better value"] }
  ),
  // Work & Productivity
  makeLife("meeting-cost-calculator", "Meeting Cost Calculator", "Calculate the cost of a meeting based on attendees and hourly rates.", "Free meeting cost calculator.", "Work & Productivity",
    [{ id: "attendees", label: "Number of Attendees", type: "number", defaultValue: 8, min: 1 }, { id: "avgRate", label: "Avg Hourly Rate ($)", type: "number", defaultValue: 50, step: 1 }, { id: "duration", label: "Duration (minutes)", type: "number", defaultValue: 60, min: 1 }],
    (v) => { const cost = v.attendees * v.avgRate * (v.duration / 60); const perMinute = cost / v.duration; return [{ label: "Meeting Cost", value: `$${cost.toFixed(2)}`, highlight: true }, { label: "Per Minute", value: `$${perMinute.toFixed(2)}` }, { label: "Annual (weekly)", value: `$${(cost * 52).toLocaleString()}` }]; },
    { expression: "Cost = Attendees × Rate × Duration", variables: ["Hidden cost of meetings"] }
  ),
  makeLife("freelance-rate-calculator", "Freelance Rate Calculator", "Calculate your ideal hourly freelance rate based on desired annual income.", "Free freelance rate calculator.", "Work & Productivity",
    [{ id: "annualIncome", label: "Target Annual Income ($)", type: "number", defaultValue: 100000, step: 1000 }, { id: "expenses", label: "Annual Expenses ($)", type: "number", defaultValue: 15000, step: 500 }, { id: "billableHours", label: "Billable Hours/Week", type: "number", defaultValue: 30, min: 1 }, { id: "weeksOff", label: "Weeks Off/Year", type: "number", defaultValue: 4, min: 0 }],
    (v) => { const workWeeks = 52 - v.weeksOff; const totalNeeded = v.annualIncome + v.expenses; const hourly = totalNeeded / (v.billableHours * workWeeks); return [{ label: "Hourly Rate", value: `$${hourly.toFixed(2)}`, highlight: true }, { label: "Day Rate (8hr)", value: `$${(hourly * 8).toFixed(0)}` }, { label: "Weekly Revenue", value: `$${(hourly * v.billableHours).toFixed(0)}` }]; },
    { expression: "Rate = (Income + Expenses) / (Hours × Weeks)", variables: ["Include taxes, insurance, benefits in expenses"] }
  ),
];
