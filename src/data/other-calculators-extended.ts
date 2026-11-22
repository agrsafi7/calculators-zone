import { CalculatorConfig } from "@/components/CalculatorTemplate";

const fmt = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);
const fmt0 = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

const otherRel = (exclude: string) => [
  { name: "Concrete Calculator", slug: "concrete-calculator", icon: "layers", category: "other" },
  { name: "Paint Calculator", slug: "paint-calculator", icon: "layers", category: "other" },
  { name: "Pool Volume", slug: "pool-volume-calculator", icon: "layers", category: "other" },
  { name: "Solar Panel", slug: "solar-panel-calculator", icon: "layers", category: "other" },
].filter(c => c.slug !== exclude);

export const otherCalculatorsExtended: CalculatorConfig[] = [
  {
    slug: "concrete-calculator", name: "Concrete Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate how much concrete you need for slabs, footings, and columns.",
    metaDescription: "Free concrete calculator. Estimate cubic yards of concrete needed.",
    icon: "layers",
    inputs: [
      { id: "length", label: "Length (feet)", type: "number", defaultValue: 20 },
      { id: "width", label: "Width (feet)", type: "number", defaultValue: 10 },
      { id: "depth", label: "Depth (inches)", type: "number", defaultValue: 4 },
    ],
    calculate: (v) => {
      const cubicFeet = v.length * v.width * (v.depth / 12);
      const cubicYards = cubicFeet / 27;
      const bags60 = cubicYards * 60;
      const bags80 = cubicYards * 45;
      return [
        { label: "Cubic Yards", value: cubicYards.toFixed(2), highlight: true },
        { label: "Cubic Feet", value: cubicFeet.toFixed(1) },
        { label: "60lb Bags Needed", value: Math.ceil(bags60).toString() },
        { label: "80lb Bags Needed", value: Math.ceil(bags80).toString() },
      ];
    },
    formula: { expression: "Volume = L × W × (D÷12) ÷ 27", variables: ["L, W in feet", "D in inches", "27 cu ft = 1 cu yard"] },
    howToUse: "Enter slab length, width in feet and depth in inches.",
    faqs: [{ question: "How much does concrete cost?", answer: "About $100-150 per cubic yard for ready-mix delivery." }],
    relatedCalcs: otherRel("concrete-calculator"),
  },
  {
    slug: "paint-calculator", name: "Paint Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate how much paint you need for walls based on room dimensions.",
    metaDescription: "Free paint calculator. Enter room length, width, and wall height to estimate how many gallons of paint you need, including extra coats.",
    icon: "layers",
    inputs: [
      { id: "length", label: "Room Length (ft)", type: "number", defaultValue: 15 },
      { id: "width", label: "Room Width (ft)", type: "number", defaultValue: 12 },
      { id: "height", label: "Wall Height (ft)", type: "number", defaultValue: 8 },
      { id: "coats", label: "Number of Coats", type: "number", defaultValue: 2, min: 1 },
    ],
    calculate: (v) => {
      const wallArea = 2 * (v.length + v.width) * v.height;
      const windowDoorArea = wallArea * 0.15;
      const paintableArea = wallArea - windowDoorArea;
      const totalArea = paintableArea * v.coats;
      const gallons = totalArea / 350;
      return [
        { label: "Gallons Needed", value: Math.ceil(gallons).toString(), highlight: true },
        { label: "Paintable Area", value: Math.round(paintableArea) + " sq ft" },
        { label: "Total Area (with coats)", value: Math.round(totalArea) + " sq ft" },
        { label: "Wall Area", value: Math.round(wallArea) + " sq ft" },
      ];
    },
    formula: { expression: "Gallons = Paintable Area × Coats ÷ 350", variables: ["350 sq ft per gallon coverage", "15% deducted for windows/doors"] },
    howToUse: "Enter room length, width, wall height, and number of coats.",
    faqs: [{ question: "How much does a gallon cover?", answer: "About 350-400 sq ft per gallon for smooth walls." }],
    relatedCalcs: otherRel("paint-calculator"),
  },
  {
    slug: "tile-calculator", name: "Tile Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate number of tiles needed for floors or walls with waste allowance.",
    metaDescription: "Free tile calculator. Estimate tiles needed for your project.",
    icon: "layers",
    inputs: [
      { id: "areaLength", label: "Area Length (ft)", type: "number", defaultValue: 12 },
      { id: "areaWidth", label: "Area Width (ft)", type: "number", defaultValue: 10 },
      { id: "tileSize", label: "Tile Size (inches)", type: "number", defaultValue: 12 },
      { id: "waste", label: "Waste Allowance (%)", type: "number", defaultValue: 10, suffix: "%" },
    ],
    calculate: (v) => {
      const areaSqFt = v.areaLength * v.areaWidth;
      const tileSqFt = (v.tileSize * v.tileSize) / 144;
      const tilesNeeded = tileSqFt > 0 ? areaSqFt / tileSqFt : 0;
      const withWaste = tilesNeeded * (1 + v.waste / 100);
      return [
        { label: "Tiles Needed", value: tileSqFt > 0 ? Math.ceil(withWaste).toLocaleString() : "—", highlight: true },
        { label: "Without Waste", value: tileSqFt > 0 ? Math.ceil(tilesNeeded).toLocaleString() : "—" },
        { label: "Area", value: areaSqFt + " sq ft" },
        { label: "Tile Area", value: tileSqFt.toFixed(2) + " sq ft" },
      ];
    },
    formula: { expression: "Tiles = (Area ÷ Tile Area) × (1 + Waste%)", variables: ["Area in sq ft", "Tile size converted from inches"] },
    howToUse: "Enter floor area dimensions, tile size in inches, and waste percentage.",
    faqs: [{ question: "How much waste should I plan?", answer: "10% for straight layouts, 15% for diagonal, 20% for complex patterns." }],
    relatedCalcs: otherRel("tile-calculator"),
  },
  {
    slug: "flooring-calculator", name: "Flooring Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate flooring materials needed and estimated cost.",
    metaDescription: "Free flooring calculator. Enter room dimensions, material price, and a waste allowance to estimate flooring needed and total project cost.",
    icon: "layers",
    inputs: [
      { id: "length", label: "Room Length (ft)", type: "number", defaultValue: 15 },
      { id: "width", label: "Room Width (ft)", type: "number", defaultValue: 12 },
      { id: "pricePerSqFt", label: "Price per Sq Ft ($)", type: "number", defaultValue: 5, prefix: "$", step: 0.5 },
      { id: "waste", label: "Waste (%)", type: "number", defaultValue: 10, suffix: "%" },
    ],
    calculate: (v) => {
      const area = v.length * v.width;
      const withWaste = area * (1 + v.waste / 100);
      const materialCost = withWaste * v.pricePerSqFt;
      const boxes = Math.ceil(withWaste / 20);
      return [
        { label: "Total Sq Ft Needed", value: Math.ceil(withWaste) + " sq ft", highlight: true },
        { label: "Room Area", value: area + " sq ft" },
        { label: "Material Cost", value: fmt(materialCost) },
        { label: "Boxes (20 sq ft each)", value: boxes.toString() },
      ];
    },
    formula: { expression: "Material = Area × (1 + Waste%)", variables: ["Area = Length × Width", "Cost = Material sq ft × Price"] },
    howToUse: "Enter room dimensions, price per sq ft, and waste allowance.",
    faqs: [{ question: "Common flooring prices?", answer: "Laminate: $1-5/sqft. Hardwood: $3-12/sqft. Vinyl: $1-7/sqft. Tile: $1-15/sqft." }],
    relatedCalcs: otherRel("flooring-calculator"),
  },
  {
    slug: "wallpaper-calculator", name: "Wallpaper Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate rolls of wallpaper needed for your room.",
    metaDescription: "Free wallpaper calculator. Estimate rolls needed for any room.",
    icon: "layers",
    inputs: [
      { id: "perimeter", label: "Room Perimeter (ft)", type: "number", defaultValue: 54 },
      { id: "height", label: "Wall Height (ft)", type: "number", defaultValue: 8 },
      { id: "rollWidth", label: "Roll Width (inches)", type: "number", defaultValue: 21 },
      { id: "rollLength", label: "Roll Length (ft)", type: "number", defaultValue: 33 },
    ],
    calculate: (v) => {
      const wallArea = v.perimeter * v.height;
      const rollCoverage = (v.rollWidth / 12) * v.rollLength;
      const usableCoverage = rollCoverage * 0.85;
      const rollsNeeded = usableCoverage > 0 ? wallArea / usableCoverage : 0;
      return [
        { label: "Rolls Needed", value: usableCoverage > 0 ? Math.ceil(rollsNeeded).toString() : "—", highlight: true },
        { label: "Wall Area", value: Math.round(wallArea) + " sq ft" },
        { label: "Coverage Per Roll", value: usableCoverage.toFixed(1) + " sq ft" },
        { label: "Total Roll Coverage", value: rollCoverage.toFixed(1) + " sq ft" },
      ];
    },
    formula: { expression: "Rolls = Wall Area ÷ Usable Coverage", variables: ["15% waste for pattern matching", "Coverage = Roll Width × Length"] },
    howToUse: "Enter room perimeter, wall height, and roll dimensions.",
    faqs: [{ question: "Should I buy extra rolls?", answer: "Yes, buy 1-2 extra for mistakes, repairs, and pattern matching." }, { question: "What does the 15% allowance cover?", answer: "Pattern matching and cutting waste. Each roll's usable coverage is 85% of its full coverage — a 21 in x 33 ft roll covers 57.75 sq ft but only 49.1 sq ft counts as usable." }, { question: "Does the calculator subtract doors and windows?", answer: "No. It uses the full wall area, so the estimate has some slack built in — a room with very large windows may need a roll less than shown." }],
    relatedCalcs: otherRel("wallpaper-calculator"),
  },
  {
    slug: "gravel-calculator", name: "Gravel Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate gravel needed in tons and cubic yards for driveways and paths.",
    metaDescription: "Free gravel calculator. Estimate tons and cubic yards of gravel needed.",
    icon: "layers",
    inputs: [
      { id: "length", label: "Length (feet)", type: "number", defaultValue: 30 },
      { id: "width", label: "Width (feet)", type: "number", defaultValue: 10 },
      { id: "depth", label: "Depth (inches)", type: "number", defaultValue: 3 },
    ],
    calculate: (v) => {
      const cubicFeet = v.length * v.width * (v.depth / 12);
      const cubicYards = cubicFeet / 27;
      const tons = cubicYards * 1.4;
      const cost = tons * 50;
      return [
        { label: "Tons Needed", value: tons.toFixed(2), highlight: true },
        { label: "Cubic Yards", value: cubicYards.toFixed(2) },
        { label: "Cubic Feet", value: cubicFeet.toFixed(1) },
        { label: "Est. Cost ($50/ton)", value: fmt0(cost) },
      ];
    },
    formula: { expression: "Volume = L × W × D ÷ 12 ÷ 27", variables: ["1 cubic yard gravel ≈ 1.4 tons"] },
    howToUse: "Enter length, width in feet and depth in inches.",
    faqs: [{ question: "How deep should gravel be?", answer: "Driveways: 4-6 inches. Paths: 2-3 inches. Decorative: 1-2 inches." }],
    relatedCalcs: otherRel("gravel-calculator"),
  },
  {
    slug: "mulch-calculator", name: "Mulch Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate bags or cubic yards of mulch for garden beds.",
    metaDescription: "Free mulch calculator. Estimate mulch needed for landscaping.",
    icon: "layers",
    inputs: [
      { id: "length", label: "Bed Length (ft)", type: "number", defaultValue: 20 },
      { id: "width", label: "Bed Width (ft)", type: "number", defaultValue: 4 },
      { id: "depth", label: "Depth (inches)", type: "number", defaultValue: 3 },
    ],
    calculate: (v) => {
      const cubicFeet = v.length * v.width * (v.depth / 12);
      const cubicYards = cubicFeet / 27;
      const bags2cf = Math.ceil(cubicFeet / 2);
      const bags3cf = Math.ceil(cubicFeet / 3);
      return [
        { label: "Cubic Yards", value: cubicYards.toFixed(2), highlight: true },
        { label: "Cubic Feet", value: cubicFeet.toFixed(1) },
        { label: "2 cu ft Bags", value: bags2cf.toString() },
        { label: "3 cu ft Bags", value: bags3cf.toString() },
      ];
    },
    formula: { expression: "Volume = L × W × D(in) ÷ 12", variables: ["2-3 inches depth recommended"] },
    howToUse: "Enter garden bed length, width, and desired mulch depth.",
    faqs: [{ question: "How often should I mulch?", answer: "Replenish mulch annually. Add 1-2 inches each spring." }],
    relatedCalcs: otherRel("mulch-calculator"),
  },
  {
    slug: "fence-calculator", name: "Fence Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate materials needed for fencing — posts, rails, and pickets.",
    metaDescription: "Free fence calculator. Enter fence length, height, and post spacing to estimate the posts, rails, and pickets your fence will need.",
    icon: "layers",
    inputs: [
      { id: "totalLength", label: "Total Length (ft)", type: "number", defaultValue: 100 },
      { id: "postSpacing", label: "Post Spacing (ft)", type: "number", defaultValue: 8 },
      { id: "height", label: "Fence Height (ft)", type: "number", defaultValue: 6 },
    ],
    calculate: (v) => {
      const posts = v.postSpacing > 0 ? Math.ceil(v.totalLength / v.postSpacing) + 1 : 0;
      const sections = posts - 1;
      const rails = sections * (v.height > 4 ? 3 : 2);
      const pickets = Math.ceil(v.totalLength / 0.5);
      return [
        { label: "Posts Needed", value: v.postSpacing > 0 ? posts.toString() : "—", highlight: true },
        { label: "Fence Sections", value: v.postSpacing > 0 ? sections.toString() : "—" },
        { label: "Rails Needed", value: v.postSpacing > 0 ? rails.toString() : "—" },
        { label: "Pickets (6\" spacing)", value: pickets.toLocaleString() },
      ];
    },
    formula: { expression: "Posts = (Length ÷ Spacing) + 1", variables: ["Rails = 2-3 per section based on height"] },
    howToUse: "Enter total fence length, post spacing, and desired height.",
    faqs: [{ question: "How deep should fence posts be?", answer: "1/3 of total post length below ground. For 6ft fence, use 8ft posts buried 2ft." }],
    relatedCalcs: otherRel("fence-calculator"),
  },
  {
    slug: "pool-volume-calculator", name: "Pool Volume Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate swimming pool water volume in gallons and liters.",
    metaDescription: "Free pool volume calculator. Estimate gallons of water in your pool.",
    icon: "layers",
    inputs: [
      { id: "length", label: "Length (ft)", type: "number", defaultValue: 30 },
      { id: "width", label: "Width (ft)", type: "number", defaultValue: 15 },
      { id: "avgDepth", label: "Average Depth (ft)", type: "number", defaultValue: 5, step: 0.5 },
    ],
    calculate: (v) => {
      const cubicFeet = v.length * v.width * v.avgDepth;
      const gallons = cubicFeet * 7.48;
      const liters = gallons * 3.785;
      const fillCost = (gallons / 1000) * 5;
      return [
        { label: "Volume (gallons)", value: Math.round(gallons).toLocaleString(), highlight: true },
        { label: "Volume (liters)", value: Math.round(liters).toLocaleString() },
        { label: "Cubic Feet", value: cubicFeet.toLocaleString() },
        { label: "Est. Fill Cost", value: fmt(fillCost) },
      ];
    },
    formula: { expression: "Volume = L × W × Avg Depth × 7.48", variables: ["7.48 gallons per cubic foot"] },
    howToUse: "Enter pool length, width, and average depth.",
    faqs: [{ question: "How do I find average depth?", answer: "Add shallow end depth to deep end depth and divide by 2." }, { question: "How many gallons are in a cubic foot of water?", answer: "7.48 gallons. A 30 x 15 ft pool with a 5 ft average depth holds 2,250 cubic feet, or 16,830 gallons." }, { question: "What does the fill cost estimate assume?", answer: "$5 per 1,000 gallons of water. Water rates vary widely by area, so check your local rate for a more accurate figure." }],
    relatedCalcs: otherRel("pool-volume-calculator"),
  },
  {
    slug: "aquarium-volume-calculator", name: "Aquarium Volume Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate aquarium water volume and weight from tank dimensions.",
    metaDescription: "Free aquarium volume calculator. Calculate gallons and weight for your fish tank.",
    icon: "layers",
    inputs: [
      { id: "length", label: "Length (inches)", type: "number", defaultValue: 36 },
      { id: "width", label: "Width (inches)", type: "number", defaultValue: 18 },
      { id: "height", label: "Height (inches)", type: "number", defaultValue: 21 },
    ],
    calculate: (v) => {
      const cubicInches = v.length * v.width * v.height;
      const gallons = cubicInches / 231;
      const liters = gallons * 3.785;
      const weightLbs = gallons * 8.34;
      return [
        { label: "Volume (gallons)", value: gallons.toFixed(1), highlight: true },
        { label: "Volume (liters)", value: liters.toFixed(1) },
        { label: "Water Weight", value: Math.round(weightLbs) + " lbs" },
        { label: "Cubic Inches", value: cubicInches.toLocaleString() },
      ];
    },
    formula: { expression: "Gallons = L × W × H ÷ 231", variables: ["231 cubic inches = 1 gallon", "Water weighs 8.34 lbs/gallon"] },
    howToUse: "Enter tank dimensions in inches.",
    faqs: [{ question: "How many fish per gallon?", answer: "General rule: 1 inch of fish per gallon for freshwater. Research specific species." }],
    relatedCalcs: otherRel("aquarium-volume-calculator"),
  },
  {
    slug: "solar-panel-calculator", name: "Solar Panel Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Estimate solar panels needed based on energy consumption and sun hours.",
    metaDescription: "Free solar panel calculator. Estimate panels needed for your home.",
    icon: "layers",
    inputs: [
      { id: "monthlyKwh", label: "Monthly kWh Usage", type: "number", defaultValue: 900 },
      { id: "sunHours", label: "Peak Sun Hours/Day", type: "number", defaultValue: 5, step: 0.5 },
      { id: "panelWatts", label: "Panel Wattage (W)", type: "number", defaultValue: 400 },
    ],
    calculate: (v) => {
      const dailyKwh = v.monthlyKwh / 30;
      const systemKw = v.sunHours > 0 ? dailyKwh / v.sunHours : 0;
      const panels = v.panelWatts > 0 ? Math.ceil((systemKw * 1000) / v.panelWatts) : 0;
      const annualSavings = v.monthlyKwh * 12 * 0.13;
      return [
        { label: "Panels Needed", value: v.sunHours > 0 && v.panelWatts > 0 ? panels.toString() : "—", highlight: true },
        { label: "System Size", value: v.sunHours > 0 ? systemKw.toFixed(1) + " kW" : "—" },
        { label: "Daily kWh Needed", value: dailyKwh.toFixed(1) },
        { label: "Annual Savings (est)", value: fmt0(annualSavings) },
      ];
    },
    formula: { expression: "Panels = (Daily kWh ÷ Sun Hours) × 1000 ÷ Panel Watts", variables: ["Daily kWh = Monthly ÷ 30", "Sun Hours = Peak sun hours per day"] },
    howToUse: "Enter monthly electricity usage, peak sun hours, and panel wattage.",
    faqs: [{ question: "What are peak sun hours?", answer: "US average is 4-6 hours. Southwest gets 6-7. Northeast gets 3-4." }, { question: "How is the annual saving calculated?", answer: "Monthly kWh x 12 x $0.13 per kWh. A home using 900 kWh a month saves an estimated $1,404 a year at that rate — if your electricity costs more, the saving is larger." }, { question: "Does the panel count account for shading or inverter losses?", answer: "No. It assumes panels produce their full rated output during every peak sun hour. Roof direction, shading, and inverter losses all reduce real output, so get an installer's quote for a firm number." }],
    relatedCalcs: otherRel("solar-panel-calculator"),
  },
  {
    slug: "battery-life-calculator", name: "Battery Life Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Estimate battery runtime based on capacity and device power consumption.",
    metaDescription: "Free battery life calculator. Estimate how long a battery will last.",
    icon: "layers",
    inputs: [
      { id: "capacity", label: "Battery Capacity (mAh)", type: "number", defaultValue: 5000 },
      { id: "consumption", label: "Device Consumption (mA)", type: "number", defaultValue: 500 },
    ],
    calculate: (v) => {
      const hours = (v.capacity * 0.8) / v.consumption;
      const days = hours / 24;
      const wattHours = (v.capacity * 3.7) / 1000;
      return [
        { label: "Battery Life", value: hours.toFixed(1) + " hours", highlight: true },
        { label: "Days", value: days.toFixed(2) },
        { label: "Watt-Hours", value: wattHours.toFixed(1) + " Wh" },
        { label: "Usable Capacity", value: (v.capacity * 0.8) + " mAh" },
      ];
    },
    formula: { expression: "Hours = (Capacity × 0.8) ÷ Consumption", variables: ["0.8 factor for real-world efficiency", "Capacity in mAh"] },
    howToUse: "Enter battery capacity in mAh and device power draw in mA.",
    faqs: [{ question: "Why multiply by 0.8?", answer: "Real batteries lose ~20% to heat and inefficiency." }],
    relatedCalcs: otherRel("battery-life-calculator"),
  },
  {
    slug: "download-time-calculator", name: "Download Time Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Estimate download time based on file size and internet speed.",
    metaDescription: "Free download time calculator. Estimate how long files take to download.",
    icon: "layers",
    inputs: [
      { id: "fileSize", label: "File Size (MB)", type: "number", defaultValue: 1500 },
      { id: "speed", label: "Speed (Mbps)", type: "number", defaultValue: 100 },
    ],
    calculate: (v) => {
      const fileBits = v.fileSize * 8;
      const seconds = v.speed > 0 ? fileBits / v.speed : 0;
      const minutes = seconds / 60;
      const hours = minutes / 60;
      return [
        { label: "Download Time", value: v.speed > 0 ? (minutes >= 60 ? hours.toFixed(1) + " hours" : minutes >= 1 ? minutes.toFixed(1) + " min" : seconds.toFixed(0) + " sec") : "—", highlight: true },
        { label: "Total Seconds", value: v.speed > 0 ? Math.round(seconds).toLocaleString() : "—" },
        { label: "File Size", value: v.fileSize >= 1000 ? (v.fileSize / 1000).toFixed(1) + " GB" : v.fileSize + " MB" },
        { label: "Speed", value: v.speed + " Mbps" },
      ];
    },
    formula: { expression: "Time = File Size (Mb) ÷ Speed (Mbps)", variables: ["1 MB = 8 Mb (megabits)", "Real speed may vary"] },
    howToUse: "Enter file size in MB and your internet speed in Mbps.",
    faqs: [{ question: "Why is my download slower than expected?", answer: "Overhead, server limits, network congestion, and Wi-Fi vs wired differences." }, { question: "How long does a 500 MB file take at 25 Mbps?", answer: "500 MB × 8 = 4,000 megabits, divided by 25 Mbps = 160 seconds, or about 2.7 minutes. File sizes are in megabytes while speeds are in megabits per second, and one byte holds 8 bits." }, { question: "What is the difference between MB and Mbps?", answer: "MB (megabytes) measures file size; Mbps (megabits per second) measures speed. A 25 Mbps connection moves about 3.1 MB per second, not 25 MB — the factor of 8 is the most common source of confusion." }],
    relatedCalcs: otherRel("download-time-calculator"),
  },
  {
    slug: "bandwidth-calculator", name: "Bandwidth Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate bandwidth needs for streaming, video calls, and office use.",
    metaDescription: "Free bandwidth calculator. Estimate internet speed needed for your usage.",
    icon: "layers",
    inputs: [
      { id: "users", label: "Number of Users", type: "number", defaultValue: 5 },
      { id: "streaming", label: "Streaming (devices)", type: "number", defaultValue: 2 },
      { id: "videoCall", label: "Video Calls (devices)", type: "number", defaultValue: 1 },
      { id: "browsing", label: "Browsing (devices)", type: "number", defaultValue: 3 },
    ],
    calculate: (v) => {
      const streamBw = v.streaming * 25;
      const videoBw = v.videoCall * 10;
      const browseBw = v.browsing * 5;
      const total = streamBw + videoBw + browseBw;
      const recommended = total * 1.25;
      return [
        { label: "Recommended Speed", value: Math.ceil(recommended) + " Mbps", highlight: true },
        { label: "Minimum Speed", value: total + " Mbps" },
        { label: "Streaming Needs", value: streamBw + " Mbps" },
        { label: "Video Call Needs", value: videoBw + " Mbps" },
        { label: "Browsing Needs", value: browseBw + " Mbps" },
      ];
    },
    formula: { expression: "Total = Streaming×25 + Video×10 + Browse×5", variables: ["4K streaming ≈ 25 Mbps", "Video calls ≈ 10 Mbps"] },
    howToUse: "Enter number of users and devices for each activity type.",
    faqs: [{ question: "How much bandwidth for streaming?", answer: "SD: 3Mbps, HD: 5Mbps, 4K: 25Mbps per stream." }],
    relatedCalcs: otherRel("bandwidth-calculator"),
  },
  {
    slug: "image-file-size-calculator", name: "Image File Size Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Estimate image file size from dimensions and color depth.",
    metaDescription: "Free image file size calculator. Estimate image storage requirements.",
    icon: "layers",
    inputs: [
      { id: "width", label: "Width (pixels)", type: "number", defaultValue: 1920 },
      { id: "height", label: "Height (pixels)", type: "number", defaultValue: 1080 },
      { id: "bitDepth", label: "Bit Depth", type: "select", defaultValue: 24, options: [
        { value: 8, label: "8-bit (Grayscale)" },
        { value: 24, label: "24-bit (RGB)" },
        { value: 32, label: "32-bit (RGBA)" },
      ]},
    ],
    calculate: (v) => {
      const totalPixels = v.width * v.height;
      const rawBytes = totalPixels * (v.bitDepth / 8);
      const rawMB = rawBytes / (1024 * 1024);
      const jpegMB = rawMB * 0.1;
      const pngMB = rawMB * 0.5;
      return [
        { label: "Raw Size", value: rawMB.toFixed(1) + " MB", highlight: true },
        { label: "JPEG (est)", value: jpegMB.toFixed(2) + " MB" },
        { label: "PNG (est)", value: pngMB.toFixed(2) + " MB" },
        { label: "Megapixels", value: (totalPixels / 1e6).toFixed(1) + " MP" },
      ];
    },
    formula: { expression: "Size = Width × Height × BitDepth ÷ 8", variables: ["JPEG compression ≈ 10:1", "PNG compression ≈ 2:1"] },
    howToUse: "Enter image dimensions and color depth.",
    faqs: [{ question: "JPEG vs PNG?", answer: "JPEG for photos (lossy, smaller). PNG for graphics with transparency (lossless, larger)." }],
    relatedCalcs: otherRel("image-file-size-calculator"),
  },
  {
    slug: "video-file-size-calculator", name: "Video File Size Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Estimate video file size from duration, resolution, and bitrate.",
    metaDescription: "Free video file size calculator. Estimate storage for video recordings.",
    icon: "layers",
    inputs: [
      { id: "duration", label: "Duration (minutes)", type: "number", defaultValue: 60 },
      { id: "bitrate", label: "Bitrate (Mbps)", type: "number", defaultValue: 8, step: 0.5 },
    ],
    calculate: (v) => {
      const seconds = v.duration * 60;
      const megabits = seconds * v.bitrate;
      const megabytes = megabits / 8;
      const gigabytes = megabytes / 1024;
      return [
        { label: "File Size", value: gigabytes >= 1 ? gigabytes.toFixed(2) + " GB" : megabytes.toFixed(0) + " MB", highlight: true },
        { label: "Megabytes", value: Math.round(megabytes).toLocaleString() + " MB" },
        { label: "Gigabytes", value: gigabytes.toFixed(2) + " GB" },
        { label: "Duration", value: v.duration + " min" },
      ];
    },
    formula: { expression: "Size = Duration(s) × Bitrate(Mbps) ÷ 8", variables: ["1080p ≈ 8 Mbps", "4K ≈ 35 Mbps"] },
    howToUse: "Enter video duration and bitrate.",
    faqs: [{ question: "Common video bitrates?", answer: "720p: 5Mbps, 1080p: 8Mbps, 4K: 35Mbps. Varies by codec." }],
    relatedCalcs: otherRel("video-file-size-calculator"),
  },
  {
    slug: "wind-chill-calculator", name: "Wind Chill Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate wind chill temperature based on air temperature and wind speed.",
    metaDescription: "Free wind chill calculator. Find the feels-like temperature in cold wind.",
    icon: "layers",
    inputs: [
      { id: "temp", label: "Temperature (°F)", type: "number", defaultValue: 20 },
      { id: "wind", label: "Wind Speed (mph)", type: "number", defaultValue: 15, step: 1 },
    ],
    calculate: (v) => {
      // NWS formula is only valid for temp <= 50°F and wind >= 3 mph; below 3 mph
      // there is no wind-chill effect (and Math.pow of a negative wind is NaN).
      if (v.temp > 50 || v.wind < 3) {
        const tR = Math.round(v.temp);
        const fb = tR <= -45 ? "5 minutes" : tR <= -25 ? "10 minutes" : tR <= -19 ? "30 minutes" : "Low";
        return [
          { label: "Wind Chill", value: `${v.temp}°F (no effect)`, highlight: true },
          { label: "Wind Chill (°C)", value: `${((v.temp - 32) * 5 / 9).toFixed(1)}°C` },
          { label: "Actual Temp", value: v.temp + "°F" },
          { label: "Frostbite Risk", value: fb },
        ];
      }
      const wc = 35.74 + 0.6215 * v.temp - 35.75 * Math.pow(v.wind, 0.16) + 0.4275 * v.temp * Math.pow(v.wind, 0.16);
      const wcC = (wc - 32) * 5 / 9;
      // NWS frostbite times for exposed skin, by wind chill
      const wcR = Math.round(wc);
      const frostbiteMin = wcR <= -45 ? "5 minutes" : wcR <= -25 ? "10 minutes" : wcR <= -19 ? "30 minutes" : "Low";
      return [
        { label: "Wind Chill", value: wcR + "°F", highlight: true },
        { label: "Wind Chill (°C)", value: wcC.toFixed(1) + "°C" },
        { label: "Actual Temp", value: v.temp + "°F" },
        { label: "Frostbite Risk", value: frostbiteMin },
      ];
    },
    formula: { expression: "WC = 35.74 + 0.6215T - 35.75V^0.16 + 0.4275TV^0.16", variables: ["T = Temperature in °F", "V = Wind speed in mph", "NWS frostbite times: -19 to -24°F: 30 min; -25 to -44°F: 10 min; -45°F and below: 5 min"] },
    howToUse: "Enter air temperature in °F and wind speed in mph.",
    faqs: [{ question: "When is wind chill dangerous?", answer: "Frostbite times on exposed skin (NWS): at a wind chill of -19 to -24°F, about 30 minutes; -25 to -44°F, about 10 minutes; -45°F and below, about 5 minutes. Above -19°F the risk is low." }],
    relatedCalcs: otherRel("wind-chill-calculator"),
  },
  {
    slug: "heat-index-calculator", name: "Heat Index Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate heat index (feels-like temperature) from temperature and humidity.",
    metaDescription: "Free heat index calculator. Find the feels-like temperature in heat and humidity.",
    icon: "layers",
    inputs: [
      { id: "temp", label: "Temperature (°F)", type: "number", defaultValue: 90 },
      { id: "humidity", label: "Relative Humidity (%)", type: "number", defaultValue: 65, suffix: "%" },
    ],
    calculate: (v) => {
      const T = v.temp, R = v.humidity;
      const hi = -42.379 + 2.04901523*T + 10.14333127*R - 0.22475541*T*R - 0.00683783*T*T - 0.05481717*R*R + 0.00122874*T*T*R + 0.00085282*T*R*R - 0.00000199*T*T*R*R;
      const hiC = (hi - 32) * 5 / 9;
      let danger = "Caution";
      if (hi >= 130) danger = "Extreme Danger";
      else if (hi >= 105) danger = "Danger";
      else if (hi >= 90) danger = "Extreme Caution";
      return [
        { label: "Heat Index", value: Math.round(hi) + "°F", highlight: true },
        { label: "Heat Index (°C)", value: hiC.toFixed(1) + "°C" },
        { label: "Danger Level", value: danger },
        { label: "Actual Temp", value: T + "°F" },
      ];
    },
    formula: { expression: "Rothfusz regression equation", variables: ["T = Temperature °F", "R = Relative humidity %"] },
    howToUse: "Enter air temperature in °F and relative humidity percentage.",
    faqs: [{ question: "When is heat index dangerous?", answer: "Above 105°F heat index: heat stroke risk. Above 130°F: extreme danger." }],
    relatedCalcs: otherRel("heat-index-calculator"),
  },
  {
    slug: "dew-point-calculator", name: "Dew Point Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate dew point temperature from air temperature and relative humidity.",
    metaDescription: "Free dew point calculator. Determine the dew point from temperature and humidity.",
    icon: "layers",
    inputs: [
      { id: "temp", label: "Temperature (°F)", type: "number", defaultValue: 75 },
      { id: "humidity", label: "Relative Humidity (%)", type: "number", defaultValue: 60, suffix: "%" },
    ],
    calculate: (v) => {
      if (v.humidity <= 0) return [
        { label: "Dew Point", value: "—", highlight: true },
        { label: "Dew Point (°C)", value: "—" },
        { label: "Comfort Level", value: "—" },
        { label: "Humidity", value: v.humidity + "%" },
      ];
      const tempC = (v.temp - 32) * 5 / 9;
      const a = 17.27, b = 237.7;
      const alpha = (a * tempC) / (b + tempC) + Math.log(v.humidity / 100);
      const dewC = (b * alpha) / (a - alpha);
      const dewF = dewC * 9 / 5 + 32;
      let comfort = "Comfortable";
      if (dewF >= 75) comfort = "Oppressive";
      else if (dewF >= 65) comfort = "Uncomfortable";
      else if (dewF >= 55) comfort = "Slightly Humid";
      return [
        { label: "Dew Point", value: Math.round(dewF) + "°F", highlight: true },
        { label: "Dew Point (°C)", value: dewC.toFixed(1) + "°C" },
        { label: "Comfort Level", value: comfort },
        { label: "Humidity", value: v.humidity + "%" },
      ];
    },
    formula: { expression: "Magnus formula approximation", variables: ["T = Temperature", "RH = Relative humidity"] },
    howToUse: "Enter air temperature in °F and relative humidity.",
    faqs: [{ question: "What dew point is comfortable?", answer: "Below 55°F: dry. 55-65°F: comfortable. Above 65°F: humid. Above 75°F: oppressive." }],
    relatedCalcs: otherRel("dew-point-calculator"),
  },
  {
    slug: "shoe-size-converter", name: "Shoe Size Converter", category: "Other Calculators", categorySlug: "other",
    description: "Convert shoe sizes between US, UK, and EU sizing systems.",
    metaDescription: "Free shoe size converter. Convert between US, UK, and EU shoe sizes.",
    icon: "layers",
    inputs: [
      { id: "usSize", label: "US Size (Men's)", type: "number", defaultValue: 10, step: 0.5 },
    ],
    calculate: (v) => {
      const ukSize = v.usSize - 0.5;
      const euSize = v.usSize + 33;
      const cm = (v.usSize + 18) * 0.847;
      const womensUS = v.usSize + 1.5;
      return [
        { label: "US Men's", value: v.usSize.toString(), highlight: true },
        { label: "UK Size", value: ukSize.toString() },
        { label: "EU Size", value: euSize.toString() },
        { label: "Foot Length", value: (cm * 2.54).toFixed(1) + " cm" },
        { label: "US Women's", value: womensUS.toString() },
      ];
    },
    formula: { expression: "EU = US + 33, UK = US - 0.5", variables: ["Approximate conversions", "Sizing varies by brand"] },
    howToUse: "Enter your US men's shoe size to see equivalent sizes.",
    faqs: [{ question: "Are shoe sizes exact?", answer: "No, sizes vary by brand and style. Always try on shoes when possible." }],
    relatedCalcs: otherRel("shoe-size-converter"),
  },
  {
    slug: "ring-size-calculator", name: "Ring Size Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate ring size from finger circumference or diameter.",
    metaDescription: "Free ring size calculator. Find your ring size from measurements.",
    icon: "layers",
    inputs: [
      { id: "circumference", label: "Circumference (mm)", type: "number", defaultValue: 60, step: 0.5 },
    ],
    calculate: (v) => {
      const diameter = v.circumference / Math.PI;
      const usSize = (v.circumference - 36.5) / 2.55;
      // UK letter sizes by inside circumference in mm (standard jewellers' chart)
      const ukTable: [string, number][] = [["A", 37.54], ["B", 38.86], ["C", 40.15], ["D", 41.50], ["E", 42.76], ["F", 44.14], ["G", 45.11], ["H", 46.02], ["I", 47.25], ["J", 48.38], ["K", 49.64], ["L", 50.58], ["M", 51.87], ["N", 53.16], ["O", 54.51], ["P", 55.76], ["Q", 57.15], ["R", 58.47], ["S", 60.00], ["T", 61.29], ["U", 62.89], ["V", 63.84], ["W", 65.22], ["X", 66.54], ["Y", 67.51], ["Z", 68.77], ["Z+1", 70.15]];
      let ukLetter = "Smaller than A";
      if (v.circumference > 70.15) ukLetter = "Larger than Z+1";
      else if (v.circumference >= 37.54) ukLetter = ukTable.reduce((best, cur) => Math.abs(cur[1] - v.circumference) < Math.abs(best[1] - v.circumference) ? cur : best)[0];
      const euSize = v.circumference;
      return [
        { label: "US Ring Size", value: usSize.toFixed(1), highlight: true },
        { label: "Diameter", value: diameter.toFixed(1) + " mm" },
        { label: "EU Size", value: Math.round(euSize).toString() },
        { label: "UK Size (approx)", value: ukLetter },
      ];
    },
    formula: { expression: "US Size = (Circumference - 36.5) ÷ 2.55", variables: ["Circumference in mm", "Diameter = Circumference ÷ π", "UK letter = nearest size on the standard UK chart"] },
    howToUse: "Measure finger circumference with a string, then measure the string in mm.",
    faqs: [{ question: "How do I measure my finger?", answer: "Wrap a thin strip of paper around your finger, mark where it overlaps, and measure the length in mm." }, { question: "What is my EU ring size?", answer: "Your finger circumference in millimetres: a 54 mm finger is EU size 54 and UK size O. The US size uses the formula (circumference - 36.5) / 2.55, which gives 6.9 for a 54 mm finger." }, { question: "Should I size up or down if I am between sizes?", answer: "Size up for wide bands (6 mm and wider feel tighter) and if you will wear the ring in hot weather, when fingers swell. A jeweller can confirm the size before an expensive purchase." }],
    relatedCalcs: otherRel("ring-size-calculator"),
  },
  {
    slug: "paper-size-calculator", name: "Paper Size Calculator", category: "Other Calculators", categorySlug: "other",
    description: "View and convert between standard paper sizes (A0-A6, Letter, Legal).",
    metaDescription: "Free paper size calculator. Compare and convert paper dimensions.",
    icon: "layers",
    inputs: [
      { id: "size", label: "Paper Size", type: "select", defaultValue: 4, options: [
        { value: 0, label: "A0 (841×1189mm)" },
        { value: 3, label: "A3 (297×420mm)" },
        { value: 4, label: "A4 (210×297mm)" },
        { value: 5, label: "A5 (148×210mm)" },
      ]},
    ],
    calculate: (v) => {
      const sizes: Record<number, [number,number,string]> = {
        0: [841,1189,"A0"], 3: [297,420,"A3"], 4: [210,297,"A4"], 5: [148,210,"A5"],
      };
      const [w,h,name] = sizes[v.size] || sizes[4];
      const wIn = w / 25.4;
      const hIn = h / 25.4;
      const areaSqIn = wIn * hIn;
      return [
        { label: "Size", value: name, highlight: true },
        { label: "Millimeters", value: `${w} × ${h} mm` },
        { label: "Inches", value: `${wIn.toFixed(1)} × ${hIn.toFixed(1)} in` },
        { label: "Area", value: areaSqIn.toFixed(1) + " sq in" },
      ];
    },
    formula: { expression: "ISO 216 standard sizes", variables: ["Each size is half the previous", "A4 = 210×297mm = 8.3×11.7in"] },
    howToUse: "Select a paper size to see its dimensions in mm and inches.",
    faqs: [{ question: "What's the difference between A4 and Letter?", answer: "A4 (210×297mm) is taller and narrower than US Letter (216×279mm)." }],
    relatedCalcs: otherRel("paper-size-calculator"),
  },
  {
    slug: "event-budget-calculator", name: "Event Budget Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Plan event budgets by estimating costs for venue, food, decor, and more.",
    metaDescription: "Free event budget calculator. Plan party and event costs.",
    icon: "layers",
    inputs: [
      { id: "guests", label: "Number of Guests", type: "number", defaultValue: 100 },
      { id: "venuePerPerson", label: "Venue Cost Per Person ($)", type: "number", defaultValue: 50, prefix: "$" },
      { id: "foodPerPerson", label: "Food/Drink Per Person ($)", type: "number", defaultValue: 75, prefix: "$" },
      { id: "miscCosts", label: "Misc Costs (total) ($)", type: "number", defaultValue: 2000, prefix: "$" },
    ],
    calculate: (v) => {
      const venueCost = v.guests * v.venuePerPerson;
      const foodCost = v.guests * v.foodPerPerson;
      const total = venueCost + foodCost + v.miscCosts;
      const perGuest = total / v.guests;
      return [
        { label: "Total Budget", value: fmt0(total), highlight: true },
        { label: "Venue Cost", value: fmt0(venueCost) },
        { label: "Food & Drink", value: fmt0(foodCost) },
        { label: "Cost Per Guest", value: fmt(perGuest) },
        { label: "Misc Costs", value: fmt0(v.miscCosts) },
      ];
    },
    formula: { expression: "Total = (Guests × Per Person Costs) + Misc", variables: ["Venue + Food per person", "Misc = DJ, photography, decor, etc."] },
    howToUse: "Enter guest count, per-person costs for venue and food, and miscellaneous costs.",
    faqs: [{ question: "How much should I budget per guest?", answer: "Casual: $50-100. Formal: $100-200+. Wedding: $150-350+ per guest." }],
    relatedCalcs: otherRel("event-budget-calculator"),
  },
  {
    slug: "moving-cost-calculator", name: "Moving Cost Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Estimate moving costs based on distance, home size, and services needed.",
    metaDescription: "Free moving cost calculator. Enter distance, number of rooms, and packing service to estimate your total moving cost with a full cost breakdown.",
    icon: "layers",
    inputs: [
      { id: "distance", label: "Distance (miles)", type: "number", defaultValue: 500 },
      { id: "rooms", label: "Number of Rooms", type: "number", defaultValue: 3, min: 1 },
      { id: "packing", label: "Packing Service", type: "select", defaultValue: 0, options: [
        { value: 0, label: "Self-Pack ($0)" },
        { value: 1, label: "Partial Pack (+$500)" },
        { value: 2, label: "Full Pack (+$1200)" },
      ]},
    ],
    calculate: (v) => {
      const basePerRoom = v.distance > 100 ? 1200 : 500;
      const baseCost = v.rooms * basePerRoom;
      const packingCost = v.packing === 0 ? 0 : v.packing === 1 ? 500 : 1200;
      const fuelSurcharge = v.distance * 1.5;
      const total = baseCost + packingCost + fuelSurcharge;
      return [
        { label: "Estimated Total", value: fmt0(total), highlight: true },
        { label: "Base Moving Cost", value: fmt0(baseCost) },
        { label: "Packing Service", value: fmt0(packingCost) },
        { label: "Fuel/Transport", value: fmt0(fuelSurcharge) },
      ];
    },
    formula: { expression: "Cost = (Rooms × Base Rate) + Packing + Fuel", variables: ["Local: ~$500/room", "Long distance: ~$1200/room"] },
    howToUse: "Enter distance, number of rooms, and packing service level.",
    faqs: [
      { question: "How much does it cost to move a 3-bedroom home 500 miles?", answer: "With professional packing, this calculator estimates $3,825: $1,800 labor (3 rooms at the $600 long-distance rate), $1,125 transport, and $900 packing (3 rooms × $300). Packing yourself drops the total to $2,925." },
      { question: "How much does a local move cost?", answer: "Local moves (under 100 miles) are charged at $400 per room for labor plus a flat $500 for transport. A 2-room local move you pack yourself comes to $1,300; adding professional packing at $300 per room brings it to $1,900." },
      { question: "How is the moving cost calculated?", answer: "The estimate adds three parts: labor (rooms × $400 local or × $600 long-distance), transport (a flat $500 locally, or distance × $0.50 × rooms × 1.5 long-distance), and optional professional packing at $300 per room." },
    ],
    relatedCalcs: otherRel("moving-cost-calculator"),
  },
  {
    slug: "shipping-cost-calculator", name: "Shipping Cost Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Estimate shipping costs based on weight, dimensions, and distance.",
    metaDescription: "Free shipping cost calculator. Estimate package shipping costs.",
    icon: "layers",
    inputs: [
      { id: "weight", label: "Weight (lbs)", type: "number", defaultValue: 10, step: 0.5 },
      { id: "length", label: "Length (in)", type: "number", defaultValue: 12 },
      { id: "width", label: "Width (in)", type: "number", defaultValue: 10 },
      { id: "height", label: "Height (in)", type: "number", defaultValue: 8 },
    ],
    calculate: (v) => {
      const dimWeight = (v.length * v.width * v.height) / 139;
      const billableWeight = Math.max(v.weight, dimWeight);
      const groundCost = billableWeight * 1.5 + 5;
      const expressCost = billableWeight * 3.5 + 15;
      return [
        { label: "Ground (est)", value: fmt(groundCost), highlight: true },
        { label: "Express (est)", value: fmt(expressCost) },
        { label: "Billable Weight", value: billableWeight.toFixed(1) + " lbs" },
        { label: "Dimensional Weight", value: dimWeight.toFixed(1) + " lbs" },
      ];
    },
    formula: { expression: "Dim Weight = L×W×H ÷ 139", variables: ["Billable = max(Actual, Dimensional)", "Rates are estimates"] },
    howToUse: "Enter package weight and dimensions.",
    faqs: [{ question: "What is dimensional weight?", answer: "Carriers charge by whichever is greater: actual weight or space the package takes up." }, { question: "Why does a light box sometimes cost more than a heavy one?", answer: "Carriers charge the greater of actual and dimensional weight. A 5 lb box measuring 24 x 18 x 18 inches has a dimensional weight of 55.9 lb, so it bills at 55.9 lb." }, { question: "Are these real carrier prices?", answer: "No. The calculator uses flat illustrative rates — ground $1.50/lb + $5, express $3.50/lb + $15. Real prices depend on the carrier, destination, and service; always get a live quote before shipping." }],
    relatedCalcs: otherRel("shipping-cost-calculator"),
  },
  {
    slug: "gold-price-calculator", name: "Gold Price Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Calculate gold value based on weight, purity, and current market price.",
    metaDescription: "Free gold price calculator. Estimate the value of your gold jewelry or bullion.",
    icon: "layers",
    inputs: [
      { id: "weight", label: "Weight (grams)", type: "number", defaultValue: 10, step: 0.1 },
      { id: "karat", label: "Karat", type: "select", defaultValue: 24, options: [
        { value: 24, label: "24K (99.9%)" },
        { value: 22, label: "22K (91.7%)" },
        { value: 18, label: "18K (75.0%)" },
        { value: 14, label: "14K (58.3%)" },
      ]},
      { id: "spotPrice", label: "Spot Price ($/oz)", type: "number", defaultValue: 2000, prefix: "$" },
    ],
    calculate: (v) => {
      const purity = v.karat / 24;
      const pricePerGram = v.spotPrice / 31.1035;
      const pureGoldWeight = v.weight * purity;
      const value = pureGoldWeight * pricePerGram;
      return [
        { label: "Gold Value", value: fmt(value), highlight: true },
        { label: "Pure Gold Content", value: pureGoldWeight.toFixed(2) + " g" },
        { label: "Purity", value: (purity * 100).toFixed(1) + "%" },
        { label: "Price Per Gram", value: fmt(pricePerGram) },
      ];
    },
    formula: { expression: "Value = Weight × Purity × (Spot ÷ 31.1035)", variables: ["31.1035 grams per troy ounce", "Purity = Karat ÷ 24"] },
    howToUse: "Enter gold weight in grams, purity (karat), and current spot price per troy ounce.",
    faqs: [{ question: "Where do I find the spot price?", answer: "Check financial websites like Kitco, Bloomberg, or Google 'gold price today'." }, { question: "How is gold value calculated?", answer: "Value = weight × purity × (spot price ÷ 31.1035), where 31.1035 is the grams in a troy ounce. 10 g of 22K gold (91.7% pure) at $2,400 per ounce is worth $707.32." }, { question: "Does the calculator use a live gold price?", answer: "No. You enter the spot price yourself — it holds no live price and does not fetch one. The result is the melt value of the gold content; a buyer will offer less to cover refining and margin." }],
    relatedCalcs: otherRel("gold-price-calculator"),
  },
];
