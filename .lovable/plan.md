# Aggressive Pruning Plan — Keep Only Everyday-Use Calculators

Current state: 775 calculators across 11 categories. Target: **~180 high-value calculators** people actually search for and use repeatedly.

## Philosophy

Keep a calculator only if it answers **yes** to at least one:
- Does a normal person use this monthly (money, health, dates, cooking, home)?
- Is it a top-10 Google search in its niche (BMI, mortgage, percentage, age, tip)?
- Does it solve a real-life decision (rent vs buy, loan payoff, calories)?

Delete if it's:
- A textbook formula (chi-square, Reynolds number, stoichiometry)
- A duplicate with trivial variation (5 different "loan" calculators)
- A hyper-niche hobby tool (yarn gauge, candle wick, aquarium volume)
- An obscure unit converter (parsec, slug, hogshead)

## Target Counts (775 → ~180)

| Category | Now | Target | Strategy |
|---|---|---|---|
| Finance | 152 | **40** | Keep mortgage, loan, auto, salary, tax, tip, ROI, retirement, savings, credit card, compound interest, investment, debt payoff, refinance, paycheck, sales tax, discount, currency. Cut duplicates and exotic loan variants. |
| Health | 98 | **25** | Keep BMI, BMR, body fat, calorie, macro, water intake, pregnancy due date, ovulation, ideal weight, heart rate, blood pressure, A1C, TDEE, pace, one-rep max. Cut clinical-only tools. |
| Math | 156 | **30** | Keep percentage, fraction, scientific, GPA, average, ratio, exponent, square root, log, standard deviation, probability, area, volume, slope, quadratic. Cut distributions, niche sequences, hyper-specific geometry. |
| Conversions | 142 | **20** | Keep length, weight, temperature, volume, area, speed, time, energy, power, pressure, data storage, fuel economy, currency, shoe size, clothing size. Cut engineering converters. |
| Science | 18 | **8** | Keep velocity, acceleration, density, force, Ohm's law, kinetic energy, voltage, pH. Cut everything else. |
| Date & Time | 28 | **12** | Keep age, date difference, days between, business days, countdown, time zone, time card, week number, days until, hours, add/subtract date, time duration. |
| Lifestyle | 50 | **15** | Keep sleep, tip, gas/fuel cost, travel time, pet age, calorie burn, BAC, water intake, alarm, nap. Cut horoscopes, compatibility, niche hobby. |
| Other | 84 | **25** | Keep concrete, paint, flooring, mulch, gravel, tile, square footage, electricity cost, fuel cost, MPG, password strength, aspect ratio, DPI, discount, markup, margin, profit, VAT, break-even, recipe scaler, baking ratio. |
| Unknown/misc | 47 | **5** | Audit and reassign or delete. |

**Total target: ~180** (76% reduction from 775).

## Execution

1. Generate a complete kill list as `docs/calculator-kill-list-v2.md` for your review (DELETE / KEEP per calculator, with reason).
2. After approval, in a single pass:
   - Add all deleted slugs to `src/data/deleted-slugs.ts` (auto-redirects to category page)
   - Add 301 redirects in `vercel.json` for SEO preservation
   - Regenerate `public/sitemap.xml`
   - Update homepage popular/featured lists if any deleted calc appears there

## SEO Safety

- Every deleted URL → 301 redirect to its category page (already implemented pattern)
- No 404s, no broken internal links
- Sitemap shrinks from 1,061 → ~200 URLs (Google focuses crawl budget on quality pages)
- Topical authority strengthens (180 strong pages > 775 thin pages)

## Two Options

**Option A — Review first (safer):** I generate the kill list as a markdown file. You skim/edit it. Then I execute.

**Option B — Trust me, execute now (faster):** I apply my best judgment in one pass using the counts above. You can tell me afterward "restore X, also delete Y" and I adjust.

Which option do you want?
