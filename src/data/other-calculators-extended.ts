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
    metaDescription: "Free paint calculator. Estimate gallons of paint needed for your room.",
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
      const tilesNeeded = areaSqFt / tileSqFt;
      const withWaste = tilesNeeded * (1 + v.waste / 100);
      return [
        { label: "Tiles Needed", value: Math.ceil(withWaste).toLocaleString(), highlight: true },
        { label: "Without Waste", value: Math.ceil(tilesNeeded).toLocaleString() },
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
    metaDescription: "Free flooring calculator. Estimate materials and cost for your floor project.",
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
      const rollsNeeded = wallArea / usableCoverage;
      return [
        { label: "Rolls Needed", value: Math.ceil(rollsNeeded).toString(), highlight: true },
        { label: "Wall Area", value: Math.round(wallArea) + " sq ft" },
        { label: "Coverage Per Roll", value: usableCoverage.toFixed(1) + " sq ft" },
        { label: "Total Roll Coverage", value: rollCoverage.toFixed(1) + " sq ft" },
      ];
    },
    formula: { expression: "Rolls = Wall Area ÷ Usable Coverage", variables: ["15% waste for pattern matching", "Coverage = Roll Width × Length"] },
    howToUse: "Enter room perimeter, wall height, and roll dimensions.",
    faqs: [{ question: "Should I buy extra rolls?", answer: "Yes, buy 1-2 extra for mistakes, repairs, and pattern matching." }],
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
    metaDescription: "Free fence calculator. Estimate posts, rails, and pickets for your fence.",
    icon: "layers",
    inputs: [
      { id: "totalLength", label: "Total Length (ft)", type: "number", defaultValue: 100 },
      { id: "postSpacing", label: "Post Spacing (ft)", type: "number", defaultValue: 8 },
      { id: "height", label: "Fence Height (ft)", type: "number", defaultValue: 6 },
    ],
    calculate: (v) => {
      const posts = Math.ceil(v.totalLength / v.postSpacing) + 1;
      const sections = posts - 1;
      const rails = sections * (v.height > 4 ? 3 : 2);
      const pickets = Math.ceil(v.totalLength / 0.5);
      return [
        { label: "Posts Needed", value: posts.toString(), highlight: true },
        { label: "Fence Sections", value: sections.toString() },
        { label: "Rails Needed", value: rails.toString() },
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
    faqs: [{ question: "How do I find average depth?", answer: "Add shallow end depth to deep end depth and divide by 2." }],
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
      const systemKw = dailyKwh / v.sunHours;
      const panels = Math.ceil((systemKw * 1000) / v.panelWatts);
      const annualSavings = v.monthlyKwh * 12 * 0.13;
      return [
        { label: "Panels Needed", value: panels.toString(), highlight: true },
        { label: "System Size", value: systemKw.toFixed(1) + " kW" },
        { label: "Daily kWh Needed", value: dailyKwh.toFixed(1) },
        { label: "Annual Savings (est)", value: fmt0(annualSavings) },
      ];
    },
    formula: { expression: "Panels = (Daily kWh ÷ Sun Hours) × 1000 ÷ Panel Watts", variables: ["Daily kWh = Monthly ÷ 30", "Sun Hours = Peak sun hours per day"] },
    howToUse: "Enter monthly electricity usage, peak sun hours, and panel wattage.",
    faqs: [{ question: "What are peak sun hours?", answer: "US average is 4-6 hours. Southwest gets 6-7. Northeast gets 3-4." }],
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
      const seconds = fileBits / v.speed;
      const minutes = seconds / 60;
      const hours = minutes / 60;
      return [
        { label: "Download Time", value: minutes >= 60 ? hours.toFixed(1) + " hours" : minutes >= 1 ? minutes.toFixed(1) + " min" : seconds.toFixed(0) + " sec", highlight: true },
        { label: "Total Seconds", value: Math.round(seconds).toLocaleString() },
        { label: "File Size", value: v.fileSize >= 1000 ? (v.fileSize / 1000).toFixed(1) + " GB" : v.fileSize + " MB" },
        { label: "Speed", value: v.speed + " Mbps" },
      ];
    },
    formula: { expression: "Time = File Size (Mb) ÷ Speed (Mbps)", variables: ["1 MB = 8 Mb (megabits)", "Real speed may vary"] },
    howToUse: "Enter file size in MB and your internet speed in Mbps.",
    faqs: [{ question: "Why is my download slower than expected?", answer: "Overhead, server limits, network congestion, and Wi-Fi vs wired differences." }],
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
    slug: "carbon-footprint-calculator", name: "Carbon Footprint Calculator", category: "Other Calculators", categorySlug: "other",
    description: "Estimate your monthly carbon footprint from driving, electricity, and flights.",
    metaDescription: "Free carbon footprint calculator. Estimate your CO2 emissions.",
    icon: "layers",
    inputs: [
      { id: "carMiles", label: "Monthly Car Miles", type: "number", defaultValue: 1000 },
      { id: "electricityKwh", label: "Monthly Electricity (kWh)", type: "number", defaultValue: 900 },
      { id: "flightsPerYear", label: "Flights Per Year", type: "number", defaultValue: 4 },
    ],
    calculate: (v) => {
      const carCO2 = v.carMiles * 0.404 * 12;
      const electricityCO2 = v.electricityKwh * 0.42 * 12;
      const flightCO2 = v.flightsPerYear * 500;
      const total = (carCO2 + electricityCO2 + flightCO2) / 1000;
      return [
        { label: "Annual CO₂", value: total.toFixed(1) + " tonnes", highlight: true },
        { label: "Car Emissions", value: (carCO2 / 1000).toFixed(1) + " t" },
        { label: "Electricity", value: (electricityCO2 / 1000).toFixed(1) + " t" },
        { label: "Flights", value: (flightCO2 / 1000).toFixed(1) + " t" },
      ];
    },
    formula: { expression: "CO₂ = Car + Electricity + Flights", variables: ["Car: 0.404 kg/mile", "Electricity: 0.42 kg/kWh", "Flight: ~500 kg/flight"] },
    howToUse: "Enter monthly car miles, electricity usage, and annual flights.",
    faqs: [{ question: "What's the average carbon footprint?", answer: "US average: ~16 tonnes/year. Global average: ~4 tonnes. Goal: under 2 tonnes." }],
    relatedCalcs: otherRel("carbon-footprint-calculator"),
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
      const wc = 35.74 + 0.6215 * v.temp - 35.75 * Math.pow(v.wind, 0.16) + 0.4275 * v.temp * Math.pow(v.wind, 0.16);
      const wcC = (wc - 32) * 5 / 9;
      const frostbiteMin = v.wind > 5 && wc < -18 ? Math.max(5, 30 + wc) : 0;
      return [
        { label: "Wind Chill", value: Math.round(wc) + "°F", highlight: true },
        { label: "Wind Chill (°C)", value: wcC.toFixed(1) + "°C" },
        { label: "Actual Temp", value: v.temp + "°F" },
        { label: "Frostbite Risk", value: frostbiteMin > 0 ? frostbiteMin + " min" : "Low" },
      ];
    },
    formula: { expression: "WC = 35.74 + 0.6215T - 35.75V^0.16 + 0.4275TV^0.16", variables: ["T = Temperature in °F", "V = Wind speed in mph"] },
    howToUse: "Enter air temperature in °F and wind speed in mph.",
    faqs: [{ question: "When is wind chill dangerous?", answer: "Below -20°F wind chill: frostbite in 30 minutes. Below -45°F: frostbite in 10 minutes." }],
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
      const ukLetter = String.fromCharCode(65 + Math.round(usSize));
      const euSize = v.circumference;
      return [
        { label: "US Ring Size", value: usSize.toFixed(1), highlight: true },
        { label: "Diameter", value: diameter.toFixed(1) + " mm" },
        { label: "EU Size", value: Math.round(euSize).toString() },
        { label: "UK Size (approx)", value: ukLetter },
      ];
    },
    formula: { expression: "US Size = (Circumference - 36.5) ÷ 2.55", variables: ["Circumference in mm", "Diameter = Circumference ÷ π"] },
    howToUse: "Measure finger circumference with a string, then measure the string in mm.",
    faqs: [{ question: "How do I measure my finger?", answer: "Wrap a thin strip of paper around your finger, mark where it overlaps, and measure the length in mm." }],
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
    metaDescription: "Free moving cost calculator. Estimate your relocation expenses.",
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
    faqs: [{ question: "Average moving cost?", answer: "Local: $1000-2500. Long distance: $2500-7500 for a 2-3 bedroom home." }],
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
    faqs: [{ question: "What is dimensional weight?", answer: "Carriers charge by whichever is greater: actual weight or space the package takes up." }],
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
    faqs: [{ question: "Where do I find the spot price?", answer: "Check financial websites like Kitco, Bloomberg, or Google 'gold price today'." }],
    relatedCalcs: otherRel("gold-price-calculator"),
  },
];
