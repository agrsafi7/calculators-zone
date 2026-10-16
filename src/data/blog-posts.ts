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
  date: string; // ISO date published
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
];
