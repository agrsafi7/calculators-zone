// Blog post data for TheCalculator.us — /blog.
// Each post targets a real query cluster seen in Google Search Console and
// links into the matching calculator(s) to funnel readers to the tool.
// Content renderer: src/components/BlogBody.tsx supports **bold**,
// "- " bullet lines, and markdown pipe tables.

export interface BlogSection {
  heading: string;
  body: string[];
}

export interface BlogRelatedTool {
  name: string;
  path: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string; // meta description
  date: string; // ISO date published (kept for schema compat)
  publishDate: string; // ISO date the post becomes visible on /blog
  category: string;
  readMinutes: number;
  related: BlogRelatedTool[];
  sections: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "roman-numerals-chart-conversion-guide",
    title: "Roman Numerals Chart & Conversion Guide: How to Read and Write Them",
    description:
      "A complete roman numerals chart from 1 to 1000, the seven symbols, the subtraction rules, and worked examples for converting numbers to roman numerals and back.",
    date: "2026-10-17",
    publishDate: "2026-10-17",
    category: "Math",
    readMinutes: 8,
    related: [{ name: "Roman Numeral Converter", path: "/lifestyle/roman-numeral-converter" }],
    sections: [
      {
        heading: "What are roman numerals?",
        body: [
          "Roman numerals are a number system that originated in ancient Rome and is still used today on clock faces, book chapters, movie sequel titles, and Super Bowl numbers. Instead of the digits 0–9, it uses **seven letters**: I, V, X, L, C, D, and M. Because there is no symbol for zero, every value is built by combining letters.",
          "Once you learn the seven symbols and three simple rules, you can read any roman numeral you encounter — and write any number in roman form without a chart.",
        ],
      },
      {
        heading: "The seven symbols and their values",
        body: [
          "The entire system is built from these seven letters:",
          "| Symbol | Value | Symbol | Value |",
          "|---|---|---|---|",
          "| I | 1 | V | 5 |",
          "| X | 10 | L | 50 |",
          "| C | 100 | D | 500 |",
          "| M | 1,000 | | |",
          "Notice the pattern: the symbols alternate between 1-based and 5-based values (1, 5, 10, 50, 100, 500, 1000), each ten times the one two rows earlier. This pattern is what makes the system work.",
        ],
      },
      {
        heading: "The three rules of roman numerals",
        body: [
          "**Rule 1 — Addition:** When a symbol of smaller (or equal) value follows a larger one, add the values. VI = 5 + 1 = **6**. LXX = 50 + 10 + 10 = **70**.",
          "**Rule 2 — Subtraction:** When a smaller symbol comes *before* a larger one, subtract it. IV = 5 − 1 = **4**. IX = 10 − 1 = **9**. XL = 50 − 10 = **40**. This shortcut is only allowed for specific pairs: I before V or X, X before L or C, and C before D or M.",
          "**Rule 3 — Repetition:** A symbol can repeat at most three times. III = 3, but 4 is written IV, never IIII. XXX = 30, but 40 is XL. Repeating a symbol multiplies its value, so XXX = 3 × 10 = 30.",
        ],
      },
      {
        heading: "How to convert numbers to roman numerals (worked examples)",
        body: [
          "**Example 1: 27 → XXVII.** Break 27 into 20 + 7. Twenty is XX (10 + 10), seven is VII (5 + 1 + 1). Together: **XXVII**.",
          "**Example 2: 94 → XCIV.** Break 94 into 90 + 4. Ninety uses subtraction: 100 − 10 = XC. Four is IV (5 − 1). Together: **XCIV**.",
          "**Example 3: 2026 → MMXXVI.** Two thousand is MM (1,000 + 1,000), twenty is XX, six is VI. Together: **MMXXVI**.",
          "A reliable method for any number: write down the largest-value symbol that fits, subtract its value, and repeat with the remainder. For 94: largest symbol under 94 is XC (90) → remainder 4 → largest under 4 is IV → remainder 0. Done: **XCIV**.",
        ],
      },
      {
        heading: "How to read roman numerals back into numbers",
        body: [
          "Scan the symbols left to right. If a symbol is followed by a *larger* symbol, subtract the smaller one (that pair is a subtraction pair). Otherwise, add it. Then move on.",
          "**Example: MCMXCIV.** Start: M (1,000), then C before M → subtract: 1,000 − 100 → running total 900… wait, careful. Correct pass: M = 1,000. CM = 1,000 − 100 = 900. XC = 100 − 10 = 90. IV = 5 − 1 = 4. Total: 1,000 + 900 + 90 + 4 = **1994**.",
          "Common trap: **IL** is not 49. Only the allowed subtraction pairs (I before V or X, X before L or C, C before D or M) are valid, so 49 is **XLIX** (40 + 9), never IL.",
        ],
      },
      {
        heading: "Roman numerals 1–100 quick chart",
        body: [
          "The units 1–10: I, II, III, IV, V, VI, VII, VIII, IX, X.",
          "The tens 10–100: X, XX, XXX, XL, L, LX, LXX, LXXX, XC, C.",
          "Combine a ten with a unit: 23 = XXIII, 47 = XLVII, 86 = LXXXVI, 99 = XCIX.",
          "Hundreds follow the same tens pattern one level up: 100 = C, 200 = CC, 400 = CD, 500 = D, 900 = CM, 1000 = M. So 847 = DCCCXLVII (800 + 40 + 7).",
        ],
      },
      {
        heading: "Where you'll still see roman numerals",
        body: [
          "Roman numerals survive in formal and decorative contexts: copyright years on films, clock and watch faces (which traditionally use **IIII** for 4 instead of IV), book chapter numbers, monarch names like Elizabeth II, the Super Bowl, and outline numbering in legal documents. Knowing the rules above lets you read all of them on sight.",
        ],
      },
    ],
  },
  {
    slug: "statistics-mean-median-mode-standard-deviation-explained",
    title: "Statistics Basics Explained: Mean, Median, Mode & Standard Deviation",
    description:
      "A plain-English statistics guide: what mean, median, mode, range, variance, and standard deviation tell you about your data, with worked examples and when to use each.",
    date: "2026-10-17",
    publishDate: "2026-10-17",
    category: "Math",
    readMinutes: 10,
    related: [
      { name: "Statistics Calculator", path: "/math/statistics-calculator" },
      { name: "Standard Deviation Calculator", path: "/math/standard-deviation-calculator" },
      { name: "Mean, Median & Mode Calculator", path: "/math/mean-median-mode-calculator" },
    ],
    sections: [
      {
        heading: "What statistics actually tell you",
        body: [
          "Descriptive statistics answer one question: **what does this data look like?** A raw list of numbers — test scores, house prices, race times — is hard to grasp. A handful of summary numbers captures its center, its spread, and its shape.",
          "The four most useful summaries are the **mean** (average), **median** (middle), **mode** (most common), and **standard deviation** (spread). This guide explains what each one means, how to compute it, and — most importantly — which one to trust in different situations.",
        ],
      },
      {
        heading: "Mean: the average, and when it misleads",
        body: [
          "The **mean** is the sum of all values divided by how many there are. For the data set 2, 4, 6, 8, 10: sum = 30, count = 5, mean = **6**.",
          "The mean uses every value, which is both its strength and its weakness. One extreme value drags it along: for 2, 4, 6, 8, **100**, the mean jumps to **24** — a number that represents none of the typical values well. When data has outliers (a billionaire in a salary survey, one disastrous exam score), the mean can be misleading.",
        ],
      },
      {
        heading: "Median: the middle value",
        body: [
          "The **median** is the value in the middle when data is sorted. For 2, 4, 6, 8, 100, the median is **6** — completely unaffected by the outlier. For an even number of values, take the average of the two middle ones: for 2, 4, 6, 8 the median is (4 + 6) ÷ 2 = **5**.",
          "Use the median when outliers matter: **house prices** (a few mansions skew the mean), **incomes**, and **response times**. This is why news reports usually quote the *median* house price, not the average.",
        ],
      },
      {
        heading: "Mode: the most common value",
        body: [
          "The **mode** is the value that appears most often. For 3, 5, 5, 7, 9 the mode is **5**. A data set can have two modes (bimodal) or none at all.",
          "The mode is the only center measure that works for non-numbers: the most common **shirt size**, the most popular **ice-cream flavor**, the most frequent **error message**. In business, the mode answers 'what's typical for our customers?'",
        ],
      },
      {
        heading: "Range, variance, and standard deviation: measuring spread",
        body: [
          "Two data sets can share a mean but look nothing alike. Consider {0, 50, 100} and {49, 50, 51} — both have mean 50, but the first is wildly spread and the second tightly clustered. Spread measures capture that difference.",
          "The **range** is simply max minus min: 100 for the first set, 2 for the second. Quick, but it only sees the two extremes.",
          "The **standard deviation** (σ) measures the *typical* distance of values from the mean. For {49, 50, 51}: each value is about 1 away from 50, so σ ≈ **0.82**. For {0, 50, 100}: σ ≈ **40.8**. Same mean, completely different spread — and now one number says so.",
        ],
      },
      {
        heading: "How standard deviation is calculated (worked example)",
        body: [
          "For the data set 2, 4, 6, 8, 10 (mean = 6), the population standard deviation is computed in four steps:",
          "- Step 1: subtract the mean from each value: −4, −2, 0, 2, 4",
          "- Step 2: square each difference: 16, 4, 0, 4, 16",
          "- Step 3: average the squares (the **variance**): (16 + 4 + 0 + 4 + 16) ÷ 5 = **8**",
          "- Step 4: take the square root: √8 ≈ **2.83**",
          "That 2.83 is the standard deviation. Note: when your data is a *sample* of a larger population (e.g., 50 voters surveyed), divide by n − 1 instead of n in step 3 — this is the sample standard deviation, and most statistics calculators offer both.",
        ],
      },
      {
        heading: "The 68-95-99.7 rule: reading a standard deviation",
        body: [
          "For roughly bell-shaped (normal) data, the standard deviation has a concrete meaning: about **68%** of values fall within 1 standard deviation of the mean, **95%** within 2, and **99.7%** within 3.",
          "Example: exam scores with mean 70 and standard deviation 10. About 68% of students scored between 60 and 80, and 95% between 50 and 90. A score of 95 is 2.5 standard deviations above the mean — genuinely exceptional, top ~1%.",
        ],
      },
      {
        heading: "Which measure should you use? A quick decision guide",
        body: [
          "- Typical value, no outliers → **mean** (e.g., average daily steps)",
          "- Typical value, with outliers → **median** (e.g., home prices, salaries)",
          "- Most common category → **mode** (e.g., best-selling size, popular choice)",
          "- How consistent the data is → **standard deviation** (e.g., manufacturing quality, test reliability)",
          "- Quick sense of the extremes → **range**",
        ],
      },
    ],
  },
  {
    slug: "greatest-common-factor-gcf-explained",
    title: "GCF Explained: How to Find the Greatest Common Factor (3 Methods)",
    description:
      "What is the greatest common factor? Learn three ways to find the GCF — listing factors, prime factorization, and the Euclidean algorithm — with worked examples.",
    date: "2026-10-17",
    publishDate: "2026-10-17",
    category: "Math",
    readMinutes: 8,
    related: [{ name: "GCF Calculator", path: "/math/gcf-calculator" }],
    sections: [
      {
        heading: "What is the greatest common factor?",
        body: [
          "The **greatest common factor (GCF)** — also called the greatest common divisor (GCD) — of two numbers is the largest number that divides both of them exactly. For 12 and 18, the common factors are 1, 2, 3, and 6, so the GCF is **6**.",
          "You use the GCF whenever something must be divided evenly: simplifying fractions, splitting items into equal groups, or finding the largest square tile that fits a rectangle without cutting.",
        ],
      },
      {
        heading: "Method 1: list the factors",
        body: [
          "Write out all factors of each number and pick the largest shared one. For 24 and 36:",
          "- Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24",
          "- Factors of 36: 1, 2, 3, 4, 6, 9, 12, 18, 36",
          "Common factors: 1, 2, 3, 4, 6, 12. The greatest is **12**.",
          "This method is intuitive and perfect for small numbers, but it gets tedious fast with large ones.",
        ],
      },
      {
        heading: "Method 2: prime factorization",
        body: [
          "Break each number into primes, then multiply the primes they share (using the lowest exponent each). For 48 and 180:",
          "- 48 = 2⁴ × 3¹",
          "- 180 = 2² × 3² × 5¹",
          "Shared primes: 2 (lowest exponent 2) and 3 (lowest exponent 1). GCF = 2² × 3¹ = 4 × 3 = **12**.",
          "This method reveals *why* the GCF works: the common factor is exactly the prime building blocks the two numbers share.",
        ],
      },
      {
        heading: "Method 3: the Euclidean algorithm (best for big numbers)",
        body: [
          "For large numbers, repeated division is fastest. To find GCF(1071, 462):",
          "- Step 1: 1071 ÷ 462 = 2 remainder **147**",
          "- Step 2: 462 ÷ 147 = 3 remainder **21**",
          "- Step 3: 147 ÷ 21 = 7 remainder **0**",
          "When the remainder hits zero, the last divisor is the GCF: **21**. No factoring needed — this works for numbers of any size, which is why computers use it.",
        ],
      },
      {
        heading: "GCF vs LCM: don't mix them up",
        body: [
          "The **GCF** is the largest number that divides both (it can only get *smaller* than the inputs). The **LCM** (least common multiple) is the smallest number both divide into (it can only get *larger*). For 12 and 18: GCF = 6, LCM = 36.",
          "Handy relationship: GCF(a, b) × LCM(a, b) = a × b. Check: 6 × 36 = 216 = 12 × 18. ✓",
        ],
      },
      {
        heading: "Real-world uses of the GCF",
        body: [
          "- **Simplifying fractions:** 24/36 reduces by dividing top and bottom by GCF(24,36) = 12 → **2/3**.",
          "- **Tiling a floor:** a 12 ft × 18 ft room tiles perfectly with 6 ft squares (GCF = 6).",
          "- **Splitting supplies:** 48 pencils and 60 erasers split into identical packs of at most 12 each (GCF = 12) → 4 packs, 12 pencils + 15 erasers per pack.",
          "- **Scheduling:** two buses every 20 and 30 minutes align every LCM(20,30) = 60 minutes; the GCF (10) is the largest interval that divides both schedules.",
        ],
      },
    ],
  },
  {
    slug: "weight-loss-percentage-calculation-guide",
    title: "Weight Loss Math: Percentages, Calories & Realistic Rates",
    description:
      "How to calculate weight loss percentage, the calorie math behind a pound of fat, and what a healthy rate of weight loss actually looks like — with worked examples.",
    date: "2026-10-17",
    publishDate: "2026-10-17",
    category: "Health",
    readMinutes: 9,
    related: [
      { name: "Weight Loss Percentage Calculator", path: "/health/weight-loss-percentage-calculator" },
      { name: "Lean Body Mass Calculator", path: "/health/lean-body-mass-calculator" },
    ],
    sections: [
      {
        heading: "How to calculate weight loss percentage",
        body: [
          "Weight loss percentage tells you how much of your starting weight you've lost — a fairer measure than pounds alone, since 10 lbs means something different at 150 lbs than at 300 lbs. The formula:",
          "**Weight loss % = (starting weight − current weight) ÷ starting weight × 100**",
          "**Example:** starting at 220 lbs, now 198 lbs. Lost: 220 − 198 = 22 lbs. Percentage: 22 ÷ 220 × 100 = **10%**. A 10% weight loss is the threshold doctors consider clinically meaningful — it's linked to real improvements in blood pressure, blood sugar, and joint load.",
        ],
      },
      {
        heading: "The calorie math: what does a pound of fat actually cost?",
        body: [
          "A pound of body fat stores roughly **3,500 calories**. To lose one pound, you need a cumulative deficit of about 3,500 calories — through eating less, moving more, or both.",
          "**Example:** a 500-calorie daily deficit (say, 300 fewer eaten + 200 burned walking) × 7 days = 3,500 calories ≈ **1 lb per week**. That's the classic rule of thumb, and it's still the most reliable planning number there is.",
          "Caveat: the 3,500 rule is an average. As you lose weight your body needs fewer calories (a lighter body burns less), so real loss often slows after the first month. Plan for it rather than fighting it.",
        ],
      },
      {
        heading: "What is a realistic rate of weight loss?",
        body: [
          "Health authorities generally consider **0.5–1% of body weight per week** a safe, sustainable rate. For a 200-lb person, that's 1–2 lbs per week — about 4–8 lbs per month.",
          "- Faster than that usually means water, glycogen, and muscle — not fat — and rebounds hard.",
          "- Slower than that is still progress: 0.5 lb/week is 26 lbs in a year.",
          "The first week often looks faster (water loss from reduced carbs/sodium), then settles. Judge your trend over **4-week averages**, not day-to-day scale noise.",
        ],
      },
      {
        heading: "Why the scale lies (and what to track instead)",
        body: [
          "Daily weight swings of 1–3 lbs are normal — water, food in transit, sodium, hormones, even a hard workout. The scale measures *everything*, not fat.",
          "Better progress markers alongside weight loss percentage:",
          "- **Waist measurement** at the navel — shrinking waist with stable weight means fat loss + muscle gain.",
          "- **Progress photos** monthly in the same lighting and pose.",
          "- **How clothes fit** and belt notches.",
          "- **Strength and energy** — training performance that holds or improves while losing means you're keeping muscle.",
        ],
      },
      {
        heading: "Setting your calorie target: a worked example",
        body: [
          "Take a 35-year-old woman, 165 lbs, lightly active, aiming to lose 1 lb/week:",
          "- Step 1: estimate maintenance calories — roughly 13 × body weight ≈ **2,145/day** (a rough starting point; activity varies).",
          "- Step 2: subtract 500 → target ≈ **1,645 calories/day**.",
          "- Step 3: protein target — about 0.7–1 g per lb of *goal* body weight to protect muscle: ~**115–150 g/day**.",
          "- Step 4: reassess every 2–3 weeks; when loss stalls for 3+ weeks, shave another 100–150 calories or add a walk.",
          "Never drop below ~1,200/day (women) or ~1,500/day (men) without medical supervision — extreme deficits cost muscle, hormones, and adherence.",
        ],
      },
      {
        heading: "The plateau: why weight loss stalls and what to do",
        body: [
          "Almost everyone stalls around weeks 6–10. Three usual causes:",
          "- **Metabolic adaptation:** a smaller body burns fewer calories; your original deficit shrank.",
          "- **Calorie creep:** portions drift up, 'bites' stop being counted, weekends erase weekday deficits.",
          "- **Water retention masking fat loss:** new training, salty meals, or stress hold water for days.",
          "The fix: tighten tracking for two weeks (weigh food, log everything), hold the course — and only then adjust calories down slightly or add 2,000 daily steps. Most 'plateaus' are measurement problems, not metabolic ones.",
        ],
      },
    ],
  },
  {
    slug: "how-to-calculate-lean-body-mass",
    title: "How to Calculate Lean Body Mass (Boer Formula, Worked Examples)",
    description:
      "What is lean body mass, how to calculate it with the Boer formula for men and women, and how LBM differs from fat-free mass — with worked metric and imperial examples.",
    date: "2026-10-17",
    publishDate: "2026-10-17",
    category: "Health",
    readMinutes: 8,
    related: [{ name: "Lean Body Mass Calculator", path: "/health/lean-body-mass-calculator" }],
    sections: [
      {
        heading: "What is lean body mass?",
        body: [
          "**Lean body mass (LBM)** is the weight of everything in your body *except* fat: muscle, bones, organs, water, and connective tissue. If you weigh 180 lbs with 20% body fat, your lean body mass is 180 × 0.80 = **144 lbs**.",
          "LBM matters more than total weight for most goals. Two people can weigh the same while one carries 30 lbs more muscle — their metabolisms, strength, and health profiles are completely different. Protein targets, calorie needs, and even medication doses are often set from LBM rather than total weight.",
        ],
      },
      {
        heading: "The Boer formula: how to calculate lean body mass",
        body: [
          "The most widely used estimation is the **Boer formula**, based on height and weight:",
          "- **Men:** LBM = 0.407 × weight(kg) + 0.267 × height(cm) − 19.2",
          "- **Women:** LBM = 0.252 × weight(kg) + 0.473 × height(cm) − 48.3",
          "It estimates LBM without needing a body-fat measurement, which makes it practical — you only need a scale and a tape measure.",
        ],
      },
      {
        heading: "Worked examples (metric and imperial)",
        body: [
          "**Example 1 — man, 85 kg, 180 cm:** LBM = 0.407 × 85 + 0.267 × 180 − 19.2 = 34.60 + 48.06 − 19.2 = **63.5 kg**. That's 140 lbs of lean mass on an 187-lb frame — roughly 25% body fat implied.",
          "**Example 2 — woman, 65 kg, 165 cm:** LBM = 0.252 × 65 + 0.473 × 165 − 48.3 = 16.38 + 78.05 − 48.3 = **46.1 kg**. About 101.6 lbs of lean mass on a 143-lb frame.",
          "**Imperial users:** convert first — divide pounds by 2.205 to get kg, multiply inches by 2.54 to get cm. A 6'0\" (183 cm), 200 lb (90.7 kg) man: LBM = 0.407 × 90.7 + 0.267 × 183 − 19.2 = 36.91 + 48.86 − 19.2 = **66.6 kg (146.8 lbs)**.",
        ],
      },
      {
        heading: "Lean body mass vs fat-free mass: the difference",
        body: [
          "The terms are often used interchangeably, but technically **fat-free mass (FFM)** includes the small amount of essential fat in organs and bone marrow (~2–3%), while **lean body mass** excludes all fat. In practice the difference is 1–2% and irrelevant for training or diet planning — either number serves the same purpose.",
        ],
      },
      {
        heading: "How to use your LBM number",
        body: [
          "- **Protein target:** 1.6–2.2 g per kg of LBM per day when building muscle; 1.2–1.6 g/kg of LBM when maintaining in a deficit. For the 63.5 kg LBM man above: ~**102–140 g/day**.",
          "- **Calorie baseline:** LBM drives your resting metabolic rate far more than fat does. Two people at the same weight but different LBM can differ by 200+ calories/day in maintenance needs.",
          "- **Tracking recomposition:** if total weight stays flat but LBM rises over months, you're gaining muscle while losing fat — the scale alone would call it 'no progress'.",
        ],
      },
      {
        heading: "Limitations of the Boer formula",
        body: [
          "The Boer formula was validated on typical adult builds. It loses accuracy for very muscular athletes (underestimates), very tall or short people, and children. It also can't distinguish *where* lean mass sits — a DEXA scan remains the gold standard if you need precision. For everyone else, it's a solid, free estimate that's consistent enough to track trends over time.",
        ],
      },
    ],
  },
  {
    slug: "celsius-to-fahrenheit-conversion-guide",
    title: "Celsius to Fahrenheit: The Only Formulas You'll Ever Need",
    description:
      "How to convert Celsius to Fahrenheit and back with the exact formulas, quick mental-math tricks, and the key reference temperatures worth memorizing.",
    date: "2026-10-17",
    publishDate: "2026-10-17",
    category: "Conversions",
    readMinutes: 6,
    related: [
      { name: "Celsius to Fahrenheit Converter", path: "/conversions/celsius-to-fahrenheit-converter" },
      { name: "Temperature Converter", path: "/conversions/temperature-converter" },
    ],
    sections: [
      {
        heading: "The two formulas",
        body: [
          "**Celsius → Fahrenheit:** °F = (°C × 9/5) + 32",
          "**Fahrenheit → Celsius:** °C = (°F − 32) × 5/9",
          "That's the whole system. Memorize the first one and the second is just its mirror: subtract 32 first, then multiply by 5/9.",
        ],
      },
      {
        heading: "Worked examples",
        body: [
          "**20°C to Fahrenheit:** (20 × 9/5) + 32 = 36 + 32 = **68°F** — pleasant room temperature.",
          "**100°C to Fahrenheit:** (100 × 9/5) + 32 = 180 + 32 = **212°F** — the boiling point of water.",
          "**98.6°F to Celsius:** (98.6 − 32) × 5/9 = 66.6 × 5/9 = **37°C** — normal body temperature.",
          "**−40°:** (−40 × 9/5) + 32 = −72 + 32 = **−40°F**. The one temperature where both scales agree — a handy check that your math is right.",
        ],
      },
      {
        heading: "The quick mental-math trick",
        body: [
          "For everyday estimates, double the Celsius and add 30: 20°C → ~70°F (actual 68°F). It's within a few degrees across normal weather ranges — good enough to decide whether you need a jacket.",
          "Going the other way: subtract 30 from Fahrenheit and halve it. 86°F → (86 − 30) ÷ 2 = ~28°C (actual 30°C). Close enough for travel weather.",
        ],
      },
      {
        heading: "Reference temperatures worth memorizing",
        body: [
          "| What | °C | °F |",
          "|---|---|---|",
          "| Water freezes | 0 | 32 |",
          "| Room temperature | 20 | 68 |",
          "| Body temperature | 37 | 98.6 |",
          "| Hot day | 30 | 86 |",
          "| Water boils | 100 | 212 |",
          "| Oven, moderate | 180 | 350 |",
          "With freezing (0/32), body (37/98.6), and boiling (100/212) anchored, you can sanity-check any conversion instantly.",
        ],
      },
      {
        heading: "Why two scales exist",
        body: [
          "Fahrenheit (1724) was built around human-scale references — 0°F was the coldest temperature Daniel Fahrenheit could reliably produce, 96°F was roughly body temperature. Celsius (1742) anchored to water's freezing and boiling points, which made it the natural choice for science and, eventually, most of the world. The US, Liberia, and Myanmar are the main holdouts on Fahrenheit — which is why travelers convert most.",
        ],
      },
    ],
  },
  {
    slug: "days-between-dates-explained",
    title: "How Many Days Between Two Dates? Date Difference, Explained",
    description:
      "How to calculate the number of days between two dates by hand, why leap years and month lengths make it tricky, and common uses from age to project planning.",
    date: "2026-10-19",
    publishDate: "2026-10-19",
    category: "Date & Time",
    readMinutes: 7,
    related: [{ name: "Date Calculator", path: "/datetime/date-calculator" }],
    sections: [
      {
        heading: "Why counting days between dates is harder than it looks",
        body: [
          "Ask 'how many days between March 3 and November 18?' and your brain stalls — months have different lengths, February changes every four years, and year boundaries complicate everything. This is exactly why a date calculator exists: it handles the calendar's irregularities instantly.",
          "But understanding the manual method helps you sanity-check results and handle the edge cases (like whether to count the start day) that trip people up.",
        ],
      },
      {
        heading: "The manual method: count month by month",
        body: [
          "To find the days between two dates by hand, walk through the months:",
          "- Step 1: days remaining in the start month (month length minus start day).",
          "- Step 2: full months in between — add each month's length.",
          "- Step 3: days elapsed in the end month.",
          "**Example: March 3 → November 18, 2026.** March has 31 days: 31 − 3 = 28 remaining. Full months April–October: 30 + 31 + 30 + 31 + 31 + 30 + 31 = 214. November: 18. Total: 28 + 214 + 18 = **260 days**.",
        ],
      },
      {
        heading: "Leap years: the February trap",
        body: [
          "A year is a leap year if it's divisible by 4 — **except** century years, which must be divisible by 400. So 2024 was a leap year, 2000 was, but **1900 was not** and 2100 won't be.",
          "This matters whenever your range crosses February 29. Days between Jan 15, 2024 and Jan 15, 2025 = **366** (includes Feb 29, 2024). Days between Jan 15, 2025 and Jan 15, 2026 = **365**. Forgetting the leap day is the #1 manual counting error.",
        ],
      },
      {
        heading: "Do you count the start day? (inclusive vs exclusive)",
        body: [
          "There are two conventions and they differ by exactly one day. **Exclusive** (the standard): days *between* the dates, not counting the start — March 3 → March 4 is 1 day. **Inclusive**: counting both endpoints — March 3 → March 4 is 2 days.",
          "Most calculators use exclusive. But contracts, warranties, and 'day 1 of your trial' often mean inclusive. When a date range matters legally or financially, **confirm which convention applies** — a one-day difference has decided court cases.",
        ],
      },
      {
        heading: "Everyday uses for date differences",
        body: [
          "- **Pregnancy & age:** gestational age is counted in days/weeks from the last menstrual period.",
          "- **Project planning:** 'we have 47 working days until launch' — subtract weekends and holidays from the raw count.",
          "- **Finance:** loan interest accrues daily; a 3-day difference in payoff dates changes the interest owed.",
          "- **Travel:** visa '90 days in any 180-day period' rules (Schengen) require exact day counts.",
          "- **Habits:** streak counters and 'days since' trackers run on this exact math.",
        ],
      },
      {
        heading: "Quick reference: month lengths",
        body: [
          "| Month | Days | Month | Days |",
          "|---|---|---|---|",
          "| January | 31 | July | 31 |",
          "| February | 28 (29 leap) | August | 31 |",
          "| March | 31 | September | 30 |",
          "| April | 30 | October | 31 |",
          "| May | 31 | November | 30 |",
          "| June | 30 | December | 31 |",
          "Memory trick: the **knuckle method** — make a fist; knuckle months have 31 days, valleys have 30 (except February).",
        ],
      },
    ],
  },
  {
    slug: "time-duration-hours-between-times-guide",
    title: "Time Duration Guide: Hours Between Times, Overnight Shifts & Time Math",
    description:
      "How to calculate the hours and minutes between two times by hand, handle overnight spans past midnight, and convert between time formats without errors.",
    date: "2026-10-21",
    publishDate: "2026-10-21",
    category: "Date & Time",
    readMinutes: 7,
    related: [{ name: "Time Calculator", path: "/datetime/time-calculator" }],
    sections: [
      {
        heading: "The core trick: convert everything to minutes",
        body: [
          "Time math is hard because hours and minutes use base 60, not base 100. The universal trick: **convert both times to total minutes since midnight**, subtract, then convert back.",
          "**Example: 9:15 AM → 2:45 PM.** 9:15 AM = 9 × 60 + 15 = 555 minutes. 2:45 PM = 14 × 60 + 45 = 885 minutes. Difference: 885 − 555 = 330 minutes = **5 hours 30 minutes**.",
        ],
      },
      {
        heading: "Crossing midnight: overnight durations",
        body: [
          "When the end time is *earlier* than the start time, you've crossed midnight — add 24 hours (1,440 minutes) to the end time first.",
          "**Example: night shift 10:00 PM → 6:30 AM.** Start: 22 × 60 = 1,320. End: 6 × 60 + 30 = 390; since 390 < 1,320, add 1,440 → 1,830. Difference: 1,830 − 1,320 = 510 minutes = **8 hours 30 minutes**.",
          "This is the step people forget most. Any time calculator handles it automatically, but knowing the rule lets you verify shift pay by hand.",
        ],
      },
      {
        heading: "AM/PM vs 24-hour time",
        body: [
          "The 24-hour clock eliminates the AM/PM ambiguity that causes most time-math errors: 2:45 PM = **14:45**, 12:00 AM (midnight) = **00:00**, 12:00 PM (noon) = **12:00**.",
          "Conversion rules: for PM times (except 12 PM), **add 12** to the hour. 12 AM → 0, 12 PM stays 12. Hospitals, airlines, and militaries use 24-hour time precisely because 'meet at 8' should never need a follow-up question.",
        ],
      },
      {
        heading: "Adding and subtracting durations",
        body: [
          "To add durations, add minutes and hours separately, then carry: **2h 45m + 1h 30m** = 3h 75m = **4h 15m** (75 minutes = 1h 15m).",
          "To subtract, borrow like regular subtraction: **5h 10m − 2h 45m** → borrow 1 hour: 4h 70m − 2h 45m = **2h 25m**.",
          "**Worked timesheet example:** Mon 8:30–17:00 (8.5h), Tue 8:45–17:15 (8.5h), Wed 9:00–18:00 with 1h lunch (8h), Thu 8:30–16:30 (8h), Fri 8:30–15:00 (6.5h). Total: **39.5 hours**.",
        ],
      },
      {
        heading: "Decimal hours vs hours:minutes",
        body: [
          "Payroll often uses decimal hours: **7h 30m = 7.5 hours**, **8h 45m = 8.75 hours**. Convert minutes to decimal by dividing by 60: 15m = 0.25, 30m = 0.5, 45m = 0.75.",
          "At **$22/hour**, 7.5 hours = **$165.00**. Mixing up 7:30 (7.5h) with 7.30 hours (7h 18m) is a classic payroll error — always convert explicitly.",
        ],
      },
    ],
  },
  {
    slug: "how-to-calculate-sales-tax",
    title: "How to Calculate Sales Tax: The Formula, Examples & State Differences",
    description:
      "How to calculate sales tax on any purchase, work backwards from a tax-inclusive price, and why US sales tax rates vary so much by state and city.",
    date: "2026-10-23",
    publishDate: "2026-10-23",
    category: "Finance",
    readMinutes: 7,
    related: [{ name: "Tax Calculator", path: "/finance/tax-calculator" }],
    sections: [
      {
        heading: "The sales tax formula",
        body: [
          "**Tax = price × tax rate** (as a decimal), and **total = price + tax**.",
          "**Example:** a **$1,200** laptop in a city with **8.875%** sales tax. Tax = 1,200 × 0.08875 = **$106.50**. Total at checkout: **$1,306.50**.",
          "For quick mental math, round the rate: at ~9%, just compute 10% ($120) and shave a bit off (~$106). Close enough to avoid checkout sticker shock.",
        ],
      },
      {
        heading: "Working backwards: finding the pre-tax price",
        body: [
          "See a tax-inclusive price and want the original? **Pre-tax price = total ÷ (1 + tax rate)**.",
          "**Example:** you paid **$54.37** total with 8% tax. Pre-tax = 54.37 ÷ 1.08 = **$50.34**. The tax was $4.03.",
          "This is useful for expense reports (many companies reimburse pre-tax amounts) and for checking whether a 'tax-free weekend' deal actually saved you money.",
        ],
      },
      {
        heading: "Why US sales tax is so complicated",
        body: [
          "The US has no national sales tax — instead, **45 states** plus thousands of counties and cities each set their own rates, which **stack**. A purchase in Chicago can face Illinois state tax (6.25%) + Cook County (1.75%) + Chicago city (1.25%) + transit authority taxes = **over 10%** combined.",
          "Five states have **no statewide sales tax at all**: Alaska, Delaware, Montana, New Hampshire, and Oregon (though Alaska allows local taxes). Meanwhile, groceries, clothing, and medicine are taxed, exempt, or reduced depending on the state — the same $100 grocery run is taxed in some states and not others.",
        ],
      },
      {
        heading: "Sales tax vs VAT: the key difference",
        body: [
          "Most of the world uses **VAT (Value Added Tax)** instead: typically **15–25%**, but it's **built into the displayed price** — the tag says €120 and you pay €120. US sales tax is added at checkout, which is why Americans do this math constantly and Europeans rarely think about it.",
          "If you're a traveler: the US price tag is *never* the final price. Mentally add ~7–10% everywhere except the five no-tax states.",
        ],
      },
      {
        heading: "Common sales tax mistakes",
        body: [
          "- **Tipping on the taxed total:** etiquette says tip on the pre-tax subtotal, not the after-tax total.",
          "- **Forgetting local add-ons:** the state rate on a tourism site isn't the whole story — cities and counties pile on.",
          "- **Online purchases:** most states now require online retailers to collect sales tax based on *your* delivery address, not the seller's location.",
          "- **Tax holidays:** states run tax-free weekends (usually August, for school supplies/clothing) — real savings if you time big purchases.",
        ],
      },
    ],
  },
  {
    slug: "compound-interest-wealth-math",
    title: "Compound Interest: The Math Behind Wealth (With Real Numbers)",
    description:
      "How compound interest really works, the Rule of 72, and worked examples showing why starting early beats investing more later.",
    date: "2026-10-26",
    publishDate: "2026-10-26",
    category: "Finance",
    readMinutes: 9,
    related: [{ name: "Investment Calculator", path: "/finance/investment-calculator" }],
    sections: [
      {
        heading: "What compound interest actually is",
        body: [
          "Simple interest pays you on your original deposit only. **Compound interest pays you on your deposit *plus* all previously earned interest** — your money earns money, which earns more money. The formula: **A = P(1 + r)ⁿ**, where P is principal, r the rate per period, n the number of periods.",
          "**Example:** $10,000 at 8% annual, compounded yearly, for 30 years: 10,000 × (1.08)³⁰ = 10,000 × 10.0627 = **$100,627**. The interest ($90,627) dwarfs the original deposit — that's compounding.",
        ],
      },
      {
        heading: "The Rule of 72: doubling time in your head",
        body: [
          "**Years to double ≈ 72 ÷ interest rate.** At 8%, money doubles every 9 years (72 ÷ 8). At 6%, every 12 years. At 12%, every 6.",
          "This one rule answers most real questions: 'How long until my $50k is $100k at 7%?' → 72 ÷ 7 ≈ **10.3 years**. It's accurate within a few percent for rates between 4% and 15%.",
        ],
      },
      {
        heading: "Why starting early beats investing more",
        body: [
          "Compare: **Asha** invests $5,000/year from age 25 to 35 (10 years, $50,000 total), then stops. **Ben** invests $5,000/year from 35 to 65 (30 years, $150,000 total). Both earn 8%.",
          "At 65: Asha's early money compounded for decades → **$787,000**. Ben's larger total contributions → **$611,000**. Asha invested **one-third** the money and ended with **$176,000 more** — because her dollars had 10 extra years to compound.",
          "The math is brutal and clear: **time in the market beats timing the market**, and it beats contributing more later.",
        ],
      },
      {
        heading: "Compounding frequency: daily vs monthly vs yearly",
        body: [
          "More frequent compounding grows money slightly faster: $10,000 at 8% for 10 years → yearly: **$21,589**; monthly: **$22,196**; daily: **$22,253**. The jump from yearly to monthly matters ($607); monthly to daily barely does ($57).",
          "What matters far more than frequency: the **rate** and the **time**. Don't chase daily-compounding accounts; chase an extra 1% of return or an extra 5 years.",
        ],
      },
      {
        heading: "The dark side: compound interest on debt",
        body: [
          "Compounding works against you on debt. A **$5,000** credit card balance at **24% APR** with minimum payments (~$125/month) takes **over 7 years** to clear and costs **~$5,700 in interest** — more than the original balance.",
          "Rule of thumb: **any guaranteed return beats investing math when it's debt payoff**. Paying off 24% debt is a risk-free 24% return — no investment reliably offers that.",
        ],
      },
      {
        heading: "Putting it to work: a realistic plan",
        body: [
          "**Example:** invest **$500/month** at 7% average return for 30 years. Future value = 500 × [((1 + 0.07/12)³⁶⁰ − 1) ÷ (0.07/12)] ≈ **$609,000**, of which you contributed $180,000 — compounding created the other **$429,000**.",
          "Three levers, in order of power: **1. Start now** (time is the biggest factor). **2. Automate contributions** (consistency beats amount-timing). **3. Keep fees low** (a 1% fee over 30 years eats roughly a quarter of your gains).",
        ],
      },
    ],
  },
  {
    slug: "how-to-calculate-your-grade-weighted-average",
    title: "How to Calculate Your Grade: Weighted Averages, Explained",
    description:
      "How weighted grades actually work, how to calculate what you need on the final exam, and why a 0 hurts more than you think.",
    date: "2026-10-28",
    publishDate: "2026-10-28",
    category: "Education",
    readMinutes: 7,
    related: [{ name: "Grade Calculator", path: "/math/grade-calculator" }],
    sections: [
      {
        heading: "How weighted grades work",
        body: [
          "Most courses don't average your scores equally — each category has a **weight**. The formula: **grade = Σ(score × weight) ÷ Σ(weights)**.",
          "**Example:** homework 20% (avg 92), quizzes 30% (avg 85), final exam 50% (score 78). Grade = (92 × 0.20) + (85 × 0.30) + (78 × 0.50) = 18.4 + 25.5 + 39 = **82.9 → B**.",
          "Notice: the final exam (50% weight) pulled the grade down far more than the strong homework could lift it. **Weight is leverage** — a category worth half your grade deserves half your study time.",
        ],
      },
      {
        heading: "What do I need on the final? (worked examples)",
        body: [
          "Rearrange the formula: **needed = (target − current weighted) ÷ final weight**.",
          "**Example:** you want an A (90%). Current: homework 20% at 88 (contributes 17.6), midterm 30% at 84 (contributes 25.2). So far: 42.8 of 50 possible. Final is worth 50%. Needed: (90 − 42.8) ÷ 0.50 = **94.4%** on the final.",
          "If the needed score exceeds 100%, the target is mathematically impossible — time to negotiate extra credit or recalibrate expectations early, not after the exam.",
        ],
      },
      {
        heading: "Why a zero hurts more than you think",
        body: [
          "A **0 on a 20%-weight assignment** with otherwise 90s: (90 × 0.80) + (0 × 0.20) = **72** — one missed assignment drops you two letter grades. This is why teachers beg students to turn in *something*: even a 50% on that assignment gives (90 × 0.80) + (50 × 0.20) = **82**.",
          "The math also shows why **dropping the lowest score** policies are so valuable — they delete your worst data point entirely.",
        ],
      },
      {
        heading: "GPA: the average of averages",
        body: [
          "Convert each course grade to points (A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0), multiply by credit hours, sum, and divide by total credits: **GPA = Σ(grade points × credits) ÷ Σ(credits)**.",
          "**Example:** A in 3-credit chemistry (12 pts), B in 4-credit calculus (12 pts), A in 3-credit history (12 pts): 36 ÷ 10 = **3.6 GPA**. A 4-credit B drags exactly as much as a 4-credit A lifts — credits are weights, just like assignment categories.",
        ],
      },
    ],
  },
  {
    slug: "inflation-explained-what-money-will-be-worth",
    title: "Inflation Explained: What Your Money Will Actually Be Worth",
    description:
      "What inflation really measures, how to calculate future purchasing power, and why 'safe' cash quietly loses value every year.",
    date: "2026-10-30",
    publishDate: "2026-10-30",
    category: "Finance",
    readMinutes: 8,
    related: [{ name: "Inflation Calculator", path: "/finance/inflation-calculator" }],
    sections: [
      {
        heading: "What inflation actually measures",
        body: [
          "Inflation is the **rate at which prices rise** — equivalently, the rate at which each dollar **loses purchasing power**. It's measured by tracking a basket of goods (the Consumer Price Index): if the basket cost $100 last year and $103 this year, inflation was **3%**.",
          "At 3% annual inflation, something costing $100 today costs **$134** in 10 years (100 × 1.03¹⁰) and **$181** in 20 years. Your money doesn't sit still — it melts.",
        ],
      },
      {
        heading: "The purchasing power formula (worked example)",
        body: [
          "**Future value = present value × (1 + inflation)ⁿ**. Or in reverse: **what $100,000 buys in 20 years at 3% inflation = 100,000 ÷ (1.03)²⁰ = $55,368**.",
          "Read that again: twenty years of 3% inflation nearly **halves** your money's buying power. This is the single most important number in retirement planning — a $1M nest egg in 2046 buys what ~$550k buys today.",
        ],
      },
      {
        heading: "Why cash in a savings account still loses",
        body: [
          "If your savings earn **4%** while inflation runs **3%**, your **real return is ~1%** (4 − 3). The precise formula: real = (1 + nominal) ÷ (1 + inflation) − 1 = 1.04 ÷ 1.03 − 1 = **0.97%**.",
          "When savings rates (say 0.5%) sit *below* inflation (3%), you're **guaranteed to lose ~2.5% of purchasing power yearly**. Cash feels safe because the number never drops — but what the number *buys* drops every single year. Safety of principal ≠ safety of purchasing power.",
        ],
      },
      {
        heading: "A brief history of US inflation",
        body: [
          "| Era | What happened |",
          "|---|---|",
          "| 1970s | Oil shocks drove inflation above **13%**; mortgages hit 18% |",
          "| 1990s–2019 | The 'Great Moderation': mostly **2–3%**, the Fed's target zone |",
          "| 2021–2022 | Post-pandemic spike to **9.1%** (June 2022), a 40-year high |",
          "| Long-run average | Roughly **3%** per year over the last century |",
          "The 2% target isn't arbitrary: mild inflation encourages spending over hoarding, while staying low enough not to distort decisions. Deflation (falling prices) sounds nice but historically triggers recessions — which is why central banks fear it more.",
        ],
      },
      {
        heading: "How to protect yourself",
        body: [
          "- **Invest in productive assets:** stocks, real estate, and businesses tend to rise *with* inflation over long periods.",
          "- **I Bonds / TIPS:** US government bonds whose payouts adjust with CPI — direct inflation insurance.",
          "- **Negotiate raises against inflation:** a 2% raise in a 4% inflation year is a **pay cut**. Know your real number.",
          "- **Fixed-rate debt gets cheaper:** inflation erodes what you owe — a 30-year mortgage at 6% during 3% inflation costs ~3% in real terms.",
        ],
      },
    ],
  },
  {
    slug: "how-to-calculate-percentage-complete-guide",
    title: "How to Calculate Percentage: The Complete Guide (With Shortcuts)",
    description:
      "Every percentage calculation you'll ever need: percent of a number, percent change, reverse percentages, and the mental-math tricks that make them instant.",
    date: "2026-11-02",
    publishDate: "2026-11-02",
    category: "Math",
    readMinutes: 8,
    related: [{ name: "Percentage Calculator", path: "/math/percentage-calculator" }],
    sections: [
      {
        heading: "The three percentage questions",
        body: [
          "Every percentage problem is one of three types:",
          "**1. What is X% of Y?** → (X ÷ 100) × Y. What is 20% of 85? 0.20 × 85 = **17**.",
          "**2. X is what percent of Y?** → (X ÷ Y) × 100. 17 is what percent of 85? (17 ÷ 85) × 100 = **20%**.",
          "**3. What number is X, which is Y% of it?** → X ÷ (Y ÷ 100). 17 is 20% of what number? 17 ÷ 0.20 = **85**.",
          "Master these three templates and no percentage problem can surprise you.",
        ],
      },
      {
        heading: "Percent change: increase and decrease",
        body: [
          "**Percent change = (new − old) ÷ old × 100**.",
          "**Increase:** price $40 → $50. (50 − 40) ÷ 40 × 100 = **25% increase**.",
          "**Decrease:** price $50 → $40. (40 − 50) ÷ 50 × 100 = **−20%** — a 20% decrease.",
          "Note the asymmetry: +25% then −25% does NOT return to start. $40 + 25% = $50; $50 − 25% = **$37.50**. Percentages compound against different bases — the classic retail 'discount then tax' trap.",
        ],
      },
      {
        heading: "Reverse percentages: finding the original",
        body: [
          "After a 20% discount you paid $80 — what was the original price? **Original = paid ÷ (1 − discount)** = 80 ÷ 0.80 = **$100**.",
          "After adding 15% tip the bill was $92 — pre-tip amount? 92 ÷ 1.15 = **$80**.",
          "The pattern: divide by (1 ± rate). Discount → divide by (1 − rate); markup/tax/tip → divide by (1 + rate).",
        ],
      },
      {
        heading: "Mental-math shortcuts",
        body: [
          "- **10%:** move the decimal one place. 10% of 85 = 8.5.",
          "- **1%:** move it two places. 1% of 85 = 0.85.",
          "- **Build anything from 10% and 1%:** 15% = 10% + half of 10% (8.5 + 4.25 = 12.75). 23% = 2×10% + 3×1% (17 + 2.55 = 19.55).",
          "- **Flip it:** 18% of 50 = 50% of 18 = **9**. (X% of Y = Y% of X — always true, often easier.)",
          "- **25% = quarter, 50% = half, 75% = three-quarters, 33% ≈ third.** Use fractions when they're cleaner.",
        ],
      },
      {
        heading: "Percentage points vs percent: don't mix them up",
        body: [
          "If an interest rate rises from **4% to 6%**, that's a **2 percentage point** increase — but a **50%** relative increase ((6−4) ÷ 4). Politicians and advertisers exploit this confusion constantly: 'grew 200%' sounds enormous, but from a base of 1% it's just 3%.",
          "Always ask: percent **of what**? The base determines everything.",
        ],
      },
    ],
  },
  {
    slug: "mortgage-amortization-explained-where-payment-goes",
    title: "Mortgage Amortization Explained: Where Every Dollar of Your Payment Goes",
    description:
      "How mortgage amortization really works, why early payments are mostly interest, and how extra payments save shocking amounts — with a full worked example.",
    date: "2026-11-04",
    publishDate: "2026-11-04",
    category: "Finance",
    readMinutes: 9,
    related: [{ name: "Mortgage Calculator", path: "/finance/mortgage-calculator" }],
    sections: [
      {
        heading: "What amortization means",
        body: [
          "A fixed-rate mortgage is an **amortizing loan**: you pay the same amount every month, but the *split* between interest and principal shifts continuously. Early on, you're mostly paying the bank for the privilege of borrowing; near the end, you're mostly paying yourself (building equity).",
          "The monthly payment formula: **M = P × r(1+r)ⁿ ÷ ((1+r)ⁿ − 1)**, where P = loan amount, r = monthly rate, n = number of payments.",
        ],
      },
      {
        heading: "Worked example: $400,000 at 6.5% for 30 years",
        body: [
          "Monthly rate: 0.065 ÷ 12 = 0.005417. Payments: 360. Monthly payment = **$2,528.27**.",
          "**Payment #1:** interest = 400,000 × 0.005417 = **$2,166.67**; principal = only **$361.60**. Your balance drops to $399,638.40.",
          "**Payment #180 (year 15):** balance ≈ $283,000; interest ≈ $1,533; principal ≈ $995 — finally more principal than interest.",
          "**Payment #360:** interest ≈ **$13.63**; principal ≈ **$2,514.64**. Total interest paid over 30 years: **$510,177** — more than the loan itself.",
        ],
      },
      {
        heading: "The extra-payment superpower",
        body: [
          "Because early payments are interest-heavy, **extra principal paid early destroys future interest**. Add just **$200/month** extra to the example above: the loan ends in **~24 years instead of 30**, and total interest falls to **~$381,000** — a saving of roughly **$129,000** for $200/month.",
          "One extra payment per year (divide one monthly payment by 12 and add it monthly) cuts a 30-year loan to about **25 years**. Biweekly payments (26 half-payments = 13 full payments/year) do the same automatically.",
        ],
      },
      {
        heading: "15-year vs 30-year: the real comparison",
        body: [
          "Same $400,000 at 6.5%: **30-year** → $2,528/month, $510,177 total interest. **15-year** → $3,484/month, **$227,197** total interest.",
          "The 15-year costs **$956/month more** but saves **~$283,000** in interest and builds equity dramatically faster — after 5 years you owe ~$343k on the 15-year vs ~$372k on the 30-year. The tradeoff is purely cash flow: the higher payment leaves less room for emergencies and investing.",
        ],
      },
      {
        heading: "What ' PITI' means (your true monthly cost)",
        body: [
          "The mortgage payment is only **P&I** (principal & interest). Your real housing cost is **PITI**: + **Property Tax** (often 1–2% of home value/year) + **Insurance** (~$100–200/month) + sometimes **PMI** (if down payment < 20%) and **HOA**.",
          "On a $500,000 home: P&I $2,528 + tax ~$520 + insurance ~$150 = **~$3,200/month** true cost. Budget on PITI, not P&I — lenders qualify you on PITI for exactly this reason.",
        ],
      },
    ],
  },
  {
    slug: "bmi-explained-what-number-means",
    title: "BMI Explained: What the Number Means (and What It Doesn't)",
    description:
      "How BMI is calculated, what the categories mean, and the important limitations athletes, older adults, and muscular builds should know.",
    date: "2026-11-06",
    publishDate: "2026-11-06",
    category: "Health",
    readMinutes: 8,
    related: [{ name: "BMI Calculator", path: "/health/bmi-calculator" }],
    sections: [
      {
        heading: "How BMI is calculated",
        body: [
          "**BMI = weight (kg) ÷ height (m)²**. In imperial: **BMI = 703 × weight (lbs) ÷ height (in)²**.",
          "**Example:** 180 lbs at 5'10\" (70 in). BMI = 703 × 180 ÷ 70² = 126,540 ÷ 4,900 = **25.8** — just into 'overweight'.",
          "**Metric example:** 82 kg at 1.78 m. BMI = 82 ÷ (1.78 × 1.78) = 82 ÷ 3.1684 = **25.9**. Same person, same answer — the formulas are equivalent.",
        ],
      },
      {
        heading: "The categories and what they signal",
        body: [
          "| BMI | Category |",
          "|---|---|",
          "| Below 18.5 | Underweight |",
          "| 18.5 – 24.9 | Healthy weight |",
          "| 25 – 29.9 | Overweight |",
          "| 30 and above | Obesity |",
          "These cutoffs come from population studies linking BMI ranges to disease risk. At a population level, the correlation is strong: higher BMI ranges associate with higher rates of diabetes, heart disease, and joint problems. **Population-level** is the key phrase — see the next section.",
        ],
      },
      {
        heading: "What BMI gets wrong (the limitations)",
        body: [
          "BMI can't tell muscle from fat. A **5'10\", 210-lb linebacker** (BMI 30.1, 'obese') may carry 12% body fat; a **5'10\", 170-lb sedentary adult** (BMI 23.8, 'healthy') may carry 30% body fat with low muscle — the latter is often the unhealthier of the two ('skinny fat').",
          "Other blind spots: **older adults** (muscle loss masks fat gain), **very tall/short people** (the square law distorts), **pregnancy**, and **different ethnicities** (some Asian health authorities use lower cutoffs, e.g., 23/27.5, because risk rises earlier).",
          "Better companions to BMI: **waist circumference** (men > 40 in / women > 35 in signals risk regardless of BMI), **waist-to-height ratio** (keep under 0.5), and **body fat percentage** if you can measure it.",
        ],
      },
      {
        heading: "Why doctors still use it",
        body: [
          "Because it's **free, instant, and directionally right for most people**. It takes 10 seconds and no equipment, and for the average non-athletic adult it correlates well with body fat. Think of BMI as a **smoke detector, not a diagnosis**: a high reading means 'look closer' (check waist, blood pressure, blood sugar), not 'you are unhealthy'.",
        ],
      },
      {
        heading: "Moving your BMI: the math",
        body: [
          "To go from BMI 25.8 to 24.0 at 5'10\": target weight = 24 × 70² ÷ 703 = 24 × 4,900 ÷ 703 = **167.3 lbs** — about **13 lbs** to lose from 180.",
          "A sustainable deficit of 500 cal/day ≈ 1 lb/week → ~**3 months**. But remember the better targets: waist under half your height, strength trending up, and habits you can keep — the BMI number is just the scoreboard.",
        ],
      },
    ],
  },
  {
    slug: "how-age-is-calculated-birthdays-leap-years",
    title: "How Age Is Actually Calculated: Birthdays, Leap Years & Exact Age",
    description:
      "How exact age in years, months, and days is computed, why leap-day babies are special, and the off-by-one errors everyone makes.",
    date: "2026-11-09",
    publishDate: "2026-11-09",
    category: "Date & Time",
    readMinutes: 6,
    related: [{ name: "Age Calculator", path: "/datetime/age-calculator" }],
    sections: [
      {
        heading: "The definition of age (it's not what you think)",
        body: [
          "Your age in completed years = **current date minus birth date, counting only fully completed years**. Born **June 15, 1990**, today **October 17, 2026**: 2026 − 1990 = 36, but your birthday hasn't... wait, it has (June < October) → **36 years old**.",
          "If today were **March 1, 2026** instead: 2026 − 1990 = 36, but June 15 hasn't occurred yet this year → subtract one → **35**. The rule: **subtract a year if this year's birthday hasn't happened yet**.",
        ],
      },
      {
        heading: "Exact age: years, months, days",
        body: [
          "For the full breakdown, work largest unit to smallest with borrowing:",
          "**Example: born March 10, 2000; today October 17, 2026.** Years: 2026 − 2000 = 26, birthday passed (March < October) → **26 years**. Months: October − March = **7 months**. Days: 17 − 10 = **7 days**. Exact age: **26 years, 7 months, 7 days**.",
          "When the day borrows (e.g., born March 25, today October 17): months drop by one (6), days = 17 + 30 (days in September) − 25 = **22** → 26 years, 6 months, 22 days. The borrow uses the *previous* month's length — the fiddly part calculators handle for you.",
        ],
      },
      {
        heading: "Leap-day babies (February 29)",
        body: [
          "Born **Feb 29, 2000**: in non-leap years, when do you turn a year older — Feb 28 or Mar 1? Legally it varies by jurisdiction (most US states: **March 1**; UK: **Feb 28** in common law tradition... actually it's genuinely disputed). Practically, almost everyone celebrates on **Feb 28 or Mar 1** in off years.",
          "Fun math: by their 24th birthday (2024), a leap-day baby has only had **6 actual Feb-29 birthdays** — the joke 'I'm 6 years old!' is arithmetically defensible.",
        ],
      },
      {
        heading: "Age in other units",
        body: [
          "A 30-year-old has lived roughly: **30 years** = 360 months = ~1,560 weeks = **~10,950 days** (including ~7–8 leap days) = ~262,800 hours = **~15.8 million minutes**.",
          "These conversions matter for: insurance underwriting (age in days for infants), legal thresholds (18 years to the day), and retirement eligibility (often 'age 65' means the exact birthday, not the calendar year).",
        ],
      },
      {
        heading: "Common off-by-one errors",
        body: [
          "- **'Turning 30 in 2026' ≠ 30 all year:** you're 29 until the birthday itself.",
          "- **East Asian age reckoning:** traditionally you're 1 at birth and gain a year each Lunar New Year — a newborn in December could be '2' within weeks. (South Korea standardized to international age in 2023.)",
          "- **'In your 30th year'** means age 29 — ordinal years count the year you're completing, not completed.",
        ],
      },
    ],
  },
  {
    slug: "how-loan-interest-really-works",
    title: "How Loan Interest Really Works: APR, Amortization & the True Cost",
    description:
      "APR vs interest rate, how amortization front-loads interest, and worked examples showing what a loan truly costs you.",
    date: "2026-11-11",
    publishDate: "2026-11-11",
    category: "Finance",
    readMinutes: 8,
    related: [{ name: "Loan Calculator", path: "/finance/loan-calculator" }],
    sections: [
      {
        heading: "Interest rate vs APR: the difference that costs you",
        body: [
          "The **interest rate** is what the lender charges on the balance. The **APR** (Annual Percentage Rate) folds in **fees and points**, spread over the loan term — it's the true yearly cost.",
          "**Example:** a $300,000 mortgage at 6.5% with $6,000 in fees. The rate is 6.5%, but the APR is ~**6.65%** — the fees' cost annualized. When comparing loans, **compare APRs, not rates**: a 6.4% rate with heavy fees can cost more than a 6.6% rate with none.",
        ],
      },
      {
        heading: "How amortization front-loads interest",
        body: [
          "Every payment = interest on the *current* balance + the rest to principal. Since the balance is biggest at the start, **early payments are mostly interest**.",
          "**Example: $25,000 car loan, 7% APR, 5 years (60 payments).** Monthly payment = **$495.03**. Payment #1: interest = 25,000 × (0.07/12) = **$145.83**; principal = $349.20. Payment #60: interest = **$2.87**; principal = $492.16. Total interest: **$4,701.80** — nearly 19% on top of the car's price.",
        ],
      },
      {
        heading: "Shorter term vs lower rate: which saves more?",
        body: [
          "Same $25,000 car loan: **7% for 5 years** → $495/mo, $4,702 total interest. **7% for 3 years** → $772/mo, **$2,786** total interest (saves $1,916). **5% for 5 years** → $472/mo, **$3,307** total interest (saves $1,395).",
          "Shortening the term usually beats lowering the rate by a point or two — less time for interest to compound. The constraint is always monthly cash flow: never stretch the term just to afford the payment; that's how a $25,000 car costs $32,000.",
        ],
      },
      {
        heading: "The Rule of 78s and prepayment penalties (watch out)",
        body: [
          "Some lenders (mostly subprime/auto) use the **Rule of 78s**, which front-loads interest even more aggressively than standard amortization — paying early saves you less. Others charge **prepayment penalties** (often 1–2% of balance) for escaping early.",
          "Before signing: ask two questions — **'Is interest calculated with standard amortization?'** and **'Is there a prepayment penalty?'** Get both answers in writing. A loan you can't exit cheaply isn't a loan, it's a lease on your future income.",
        ],
      },
      {
        heading: "Total cost: the only number that matters",
        body: [
          "Monthly payment is a cash-flow number; **total of payments** is the cost number. Always compute: monthly × months.",
          "$495 × 60 = **$29,700** for that $25,000 car. $2,528 × 360 = **$910,188** for a $400,000 mortgage. Seeing the total reframes every borrowing decision — and makes the case for bigger down payments and shorter terms better than any lecture.",
        ],
      },
    ],
  },
  {
    slug: "how-much-to-tip-guide-every-situation",
    title: "How Much to Tip in Every Situation: The Complete Guide",
    description:
      "Exact tipping percentages for restaurants, bars, delivery, travel, and services — US norms plus how tipping works around the world.",
    date: "2026-11-13",
    publishDate: "2026-11-13",
    category: "Lifestyle",
    readMinutes: 8,
    related: [{ name: "Tip Calculator", path: "/finance/tip-calculator" }],
    sections: [
      {
        heading: "The quick-reference chart",
        body: [
          "| Situation | Standard tip |",
          "|---|---|",
          "| Sit-down restaurant (US) | **18–20%** (15% minimum) |",
          "| Bar (per drink) | **$1–2** |",
          "| Food delivery | **10–15%** (min $3–5) |",
          "| Takeout / counter pickup | **5–10%** (optional) |",
          "| Rideshare (Uber/Lyft) | **15–20%** |",
          "| Haircut / salon | **15–20%** |",
          "| Hotel housekeeping | **$3–5 per night** |",
          "| Valet | **$2–5** on return |",
          "| Coffee shop tip jar | **$1** or spare change (optional) |",
          "Tip on the **pre-tax** subtotal — tax isn't service.",
        ],
      },
      {
        heading: "Why America tips so much (the economics)",
        body: [
          "US tipping isn't just custom — it's **wage structure**. The federal tipped minimum wage is **$2.13/hour** (unchanged since 1991); tips are legally expected to bring workers to the regular minimum, and in practice they're most of a server's income. That's why 18–20% became the default: you're not adding a bonus, you're paying the wage.",
          "Seven states (CA, OR, WA, NV, MN, MT, AK) require the **full** minimum wage before tips — tipping there is genuinely extra, though 18–20% remains the norm.",
        ],
      },
      {
        heading: "Tipping around the world",
        body: [
          "- **Japan & South Korea:** tipping can **offend** — excellent service is the standard, included in the price. Don't tip.",
          "- **Most of Europe:** service is often included ('service compris'); rounding up or 5–10% for great service suffices.",
          "- **UK:** 10–12.5% at restaurants if service isn't included; pubs — no tip expected (offering the bartender a drink is the tradition).",
          "- **Middle East:** 10–15% is common in tourist areas; check if a service charge is already added.",
          "- **Australia/NZ:** tipping is rare and entirely optional — workers earn full wages.",
          "Rule for travelers: **when in doubt, ask a local** — and never tip where it's insulting.",
        ],
      },
      {
        heading: "The math: tipping without a calculator",
        body: [
          "**20%:** move the decimal (10%), double it. $64 bill → $6.40 → **$12.80**.",
          "**15%:** 10% + half of 10%. $64 → $6.40 + $3.20 = **$9.60**.",
          "**18%:** 20% minus a little. $64 → $12.80 − ~$1.30 = **~$11.50**.",
          "**Splitting:** total with tip ÷ people. $143.20 among 4 = **$35.80 each**. Round up to whole dollars when the change is silly — nobody misses 20 cents.",
        ],
      },
      {
        heading: "Tipping debates worth knowing",
        body: [
          "**Tip fatigue** is real: tablets prompting 25–30% at self-serve counters have pushed back — you're allowed to hit 'custom' or $0 where no service occurred. **Tipflation** (suggested percentages creeping from 15% → 20% → 25%) is driven by point-of-sale software defaults, not consensus.",
          "The honest framework: tip for **personal service rendered** (someone served, carried, cleaned, or drove for you), proportional to effort. A percentage of the bill is just a convenient proxy for that — when the proxy feels wrong (a $200 bottle of wine vs a $40 one, same pouring effort), tipping a flat generous amount is perfectly defensible.",
        ],
      },
    ],
  },
];

// Publishing schedule: a post becomes visible on /blog (and its article
// page) once its publishDate arrives. Because the check runs client-side,
// scheduled posts go live automatically — no rebuild or deploy needed.
export const isPublished = (publishDate: string): boolean =>
  publishDate <= new Date().toISOString().slice(0, 10);

export const getPublishedPosts = (): BlogPost[] =>
  blogPosts
    .filter((p) => isPublished(p.publishDate))
    .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1));
