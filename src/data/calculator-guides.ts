// In-depth guide content for top-traffic calculator pages.
// Rendered by <GuideSections slug> inside CalculatorTemplate and the
// custom Mortgage / BMI / Percentage pages. All numbers verified.

export interface GuideSection {
  heading: string;
  paragraphs: string[];
}

export const calculatorGuides: Record<string, GuideSection[]> = {
  "mortgage-calculator": [
    {
      heading: "How mortgage payments are calculated",
      paragraphs: [
        "A fixed-rate mortgage is an **amortizing loan**: every monthly payment is split into an interest portion and a principal portion, and the split changes every month. Early in the loan, most of your payment goes to interest; near the end, almost all of it reduces the principal.",
        "Lenders use the standard amortization formula: **M = P × r(1+r)ⁿ / ((1+r)ⁿ − 1)**, where M is the monthly payment, P is the loan amount, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of payments. Our calculator applies this formula instantly and builds your full amortization schedule from it.",
        "Your real monthly housing cost is usually more than principal and interest alone. Most homeowners also pay **property tax, homeowner's insurance, and sometimes PMI or HOA dues** each month. This calculator includes fields for tax and insurance so the figure you see matches the number leaving your bank account.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **$400,000 loan at 6.5% fixed for 30 years** (360 payments). The monthly rate is 0.065 ÷ 12 = 0.005417. Plugging into the formula gives a monthly principal-and-interest payment of **$2,528.27**.",
        "Look at the very first payment: interest = $400,000 × 0.005417 = **$2,166.67**, so only **$361.60** reduces your balance. Over the full 30 years you pay **$510,177.95 in interest** — more than the loan itself. That is why the amortization chart on this page is so useful: it shows exactly when your payments start working for you instead of the bank.",
      ],
    },
    {
      heading: "How to pay far less interest",
      paragraphs: [
        "Three levers move the total cost: the **rate**, the **term**, and **extra principal payments**. Even a small change compounds enormously over decades.",
        "Compare the same $400,000 at 6.5% on a **15-year term**: the payment rises to **$3,484.43**, but total interest falls to **$227,197** — a saving of roughly **$283,000**. If a 15-year payment is too steep, making just one extra monthly payment per year on a 30-year loan still cuts years off the term and tens of thousands in interest.",
        "Before you commit, use this calculator to test scenarios: a larger down payment, a 0.5% lower rate, or bi-weekly payments. Small inputs, very different outcomes — that is exactly what the tool is for.",
      ],
    },
  ],

  "bmi-calculator": [
    {
      heading: "What BMI actually measures",
      paragraphs: [
        "Body Mass Index estimates body fat from just two numbers: **BMI = weight (kg) ÷ height (m)²**. In imperial units the formula is **703 × weight (lb) ÷ height (in)²**. It is a screening tool used by doctors and health organisations worldwide — quick, free, and surprisingly useful as a first check.",
        "The standard adult categories are: **below 18.5** underweight, **18.5–24.9** healthy weight, **25–29.9** overweight, and **30 or above** obese. These cut-offs come from large population studies linking BMI ranges to health risk.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A person weighing **70 kg** at **1.75 m** tall: BMI = 70 ÷ (1.75 × 1.75) = 70 ÷ 3.0625 = **22.9** — comfortably in the healthy range.",
        "In imperial units, the same person is about **154 lb** and **69 in**: BMI = 703 × 154 ÷ (69 × 69) = 703 × 154 ÷ 4761 ≈ **22.7**. The tiny difference is just rounding between unit systems.",
      ],
    },
    {
      heading: "What BMI doesn't tell you",
      paragraphs: [
        "BMI cannot distinguish **muscle from fat**, so muscular athletes can score as 'overweight' while being very lean. It also doesn't account for **age, sex, or fat distribution** — belly fat carries more health risk than the same fat on hips and thighs, and older adults can have a 'healthy' BMI while losing muscle.",
        "Use BMI as a starting point, not a verdict. Pair it with **waist measurement, body-fat percentage, and how you actually feel and move** for a fuller picture. If your BMI is outside the healthy range and you're unsure why, a clinician or dietitian can interpret it in context.",
      ],
    },
  ],

  "percentage-calculator": [
    {
      heading: "The three percentage calculations everyone needs",
      paragraphs: [
        "Almost every 'percentage problem' is one of three questions. **(1) What is X% of Y?** — multiply Y by X÷100. **(2) X is what percent of Y?** — divide X by Y and multiply by 100. **(3) What is the percentage change from A to B?** — (B−A) ÷ A × 100. This calculator handles all three instantly.",
      ],
    },
    {
      heading: "Worked examples",
      paragraphs: [
        "**20% of 150** = 150 × 0.20 = **30**. That's the mental model for discounts and tips: find 10% first (15), then double it.",
        "**45 is what percent of 180?** = 45 ÷ 180 × 100 = **25%**. Useful for grades, completion rates, and progress tracking.",
        "A price rises from **$80 to $100**: (100−80) ÷ 80 × 100 = **25% increase**. Note the trap — a 25% increase followed by a 25% decrease does *not* return to $80 (it lands at $75), because the base changed. Percentage changes are never symmetric.",
      ],
    },
    {
      heading: "Where you'll use this daily",
      paragraphs: [
        "**Shopping:** a $60 jacket at 30% off costs $60 × 0.70 = **$42**. **Dining:** an 18% tip on $85 is $85 × 0.18 = **$15.30**. **Work:** a raise from $52,000 to $55,000 is a **5.8%** increase. **Investing:** a portfolio growing from $10,000 to $12,500 gained **25%**.",
        "One habit that pays off: always sanity-check percentages against 10%. If 10% of the bill is $8.50, then 20% must be about $17 — instant error detection for mental math.",
      ],
    },
  ],

  "loan-calculator": [
    {
      heading: "How loan amortization works",
      paragraphs: [
        "Like a mortgage, a personal or auto loan amortizes: fixed monthly payments, with the interest/principal split shifting over time. The payment formula is **M = P × r(1+r)ⁿ / ((1+r)ⁿ − 1)**, where r is the monthly rate and n the number of payments.",
        "Because interest is charged on the *remaining* balance, your early payments are interest-heavy. Extra payments attack the principal directly, which shrinks every future interest charge — the reason small overpayments save disproportionate amounts.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Borrow **$25,000 at 7% for 60 months**. Monthly rate = 0.07 ÷ 12 = 0.005833. The formula gives a monthly payment of **$495.03**.",
        "Total paid = $495.03 × 60 = **$29,701.80**, so the loan costs **$4,701.80 in interest**. On the very first payment, interest = $25,000 × 0.005833 = **$145.83**, leaving $349.20 to reduce the balance to $24,650.80. The schedule on this page shows every one of the 60 splits.",
      ],
    },
    {
      heading: "Three ways to pay less",
      paragraphs: [
        "**Shorten the term.** The same $25,000 at 7% over 36 months costs $771.93/month but only $2,789 in total interest — you save about $1,900 by paying it off two years sooner.",
        "**Pay a little extra monthly.** Adding $50/month to the 60-month loan above clears it roughly 7 months early and saves over $500 in interest.",
        "**Shop the rate.** Dropping from 7% to 6% on this loan saves about $700. Always compare APR — not just the interest rate — because APR includes fees and reflects the true yearly cost.",
      ],
    },
  ],

  "age-calculator": [
    {
      heading: "How exact age is calculated",
      paragraphs: [
        "An exact age isn't just 'this year minus birth year' — months and days matter. The calculator subtracts the birth date from the target date, **borrowing** months and days exactly like subtraction in arithmetic: if the target day is smaller than the birth day, it borrows days from the previous month (using that month's real length, including leap-year Februaries).",
        "The result is your age in **years, months, and days**, plus totals: total months, total weeks, and total days lived. The day count uses the real calendar, so leap years are handled automatically.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Born **15 March 1990**, measured on **15 October 2026**: 2026 − 1990 = 36 years; October (10) − March (3) = 7 months; 15 − 15 = 0 days. Exact age: **36 years, 7 months, 0 days**.",
        "Born **29 February 2000** (a leap day)? On 28 February 2026 the calculator correctly reports 25 years, 11 months, 30 days — it borrows from February's 28 days in 2026, not 29. Edge cases like this are why a dedicated calculator beats mental math.",
      ],
    },
    {
      heading: "Practical uses",
      paragraphs: [
        "**School and sports enrollment** often use strict age cut-off dates — being off by a day can decide eligibility. **Retirement planning** needs exact ages for pension and Social Security timing. **Milestones** (18th, 21st, 65th birthdays), **insurance quotes**, and **visa applications** all ask for precise age.",
        "Tip: use the 'age at a future date' style of question for planning — e.g., 'how old will I be when the mortgage ends?' — by comparing two dates rather than guessing.",
      ],
    },
  ],

  "compound-interest-calculator": [
    {
      heading: "Why compounding is so powerful",
      paragraphs: [
        "Simple interest pays you only on the original principal. **Compound interest pays interest on your interest** — each period's earnings join the balance and earn themselves. The formula is **A = P(1 + r/n)^(nt)**, where P is principal, r the annual rate, n compounding periods per year, and t years.",
        "The curve starts slowly and then bends upward: growth is exponential, not linear. That is why 'time in the market' beats 'timing the market' — starting ten years earlier matters more than finding a slightly higher rate.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Invest **$10,000 at 7% compounded monthly for 10 years**: A = 10,000 × (1 + 0.07/12)^120 = **$20,096.61**. Your money roughly doubles; interest earned is **$10,096.61**.",
        "Compare simple interest: $10,000 × (1 + 0.07 × 10) = **$17,000**. Compounding added an extra **$3,096.61** — nearly a third more profit — from the same rate and time. Now imagine adding $200/month: contributions plus compounding turn modest habits into serious wealth.",
      ],
    },
    {
      heading: "Two things that multiply your results",
      paragraphs: [
        "**Compounding frequency.** Monthly compounding beats annual compounding at the same nominal rate, because earnings start earning sooner. The difference is small short-term but real long-term — always check whether a quoted rate compounds monthly, quarterly, or annually.",
        "**Starting early.** $5,000 invested at 25 at 7% becomes ~$74,900 by 65. Waiting until 35 to invest the same $5,000 yields only ~$38,000. Ten years of delay costs roughly half the outcome — the steepest price in personal finance.",
      ],
    },
  ],

  "calorie-calculator": [
    {
      heading: "BMR and TDEE: the two numbers that matter",
      paragraphs: [
        "**BMR (Basal Metabolic Rate)** is what your body burns at complete rest — keeping you alive. The gold-standard estimate is the **Mifflin-St Jeor equation**: for men, 10 × weight(kg) + 6.25 × height(cm) − 5 × age + 5; for women, the same minus 161 instead of plus 5.",
        "**TDEE (Total Daily Energy Expenditure)** = BMR × activity multiplier (1.2 sedentary → 1.9 very active). TDEE is your maintenance calories: eat this much and your weight holds steady. This calculator computes both from your stats.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A **30-year-old man, 70 kg, 175 cm**: BMR = 10×70 + 6.25×175 − 5×30 + 5 = 700 + 1093.75 − 150 + 5 = **1,649 kcal/day** at rest.",
        "Moderately active (exercise 3–5 days/week, ×1.55): TDEE = 1,649 × 1.55 ≈ **2,556 kcal/day**. That is his maintenance line — the anchor every diet or bulk plan should start from.",
      ],
    },
    {
      heading: "Using it for weight goals",
      paragraphs: [
        "Weight change is energy balance. A **~500 kcal daily deficit** typically loses about **0.5 kg (1 lb) per week**, since a kilogram of body fat stores roughly 7,700 kcal. A 300 kcal surplus with progressive training supports lean muscle gain.",
        "Two honest caveats: the equations estimate an *average* body — very muscular or very lean people should treat the result as a starting point and adjust after 2–3 weeks of tracking. And never crash below your BMR for long; aggressive deficits cost muscle, energy, and adherence. Slow and consistent wins.",
      ],
    },
  ],

  "tip-calculator": [
    {
      heading: "How to calculate a tip",
      paragraphs: [
        "Tip = **bill × tip percentage**, total = bill + tip. For splitting: **per person = total ÷ number of people**. This calculator does all three in one step, including tax handling.",
        "Mental shortcut: find **10%** of the bill (move the decimal one place), then scale. 10% of $85 is $8.50, so 20% is $17.00 and 15% is halfway between: $12.75. You'll never fumble a tip again.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Dinner bill **$85**, you want to leave **18%**: tip = 85 × 0.18 = **$15.30**; total = **$100.30**.",
        "Splitting among **4 people**: $100.30 ÷ 4 = **$25.07 each** (round to $25.10 if you like round numbers — the extra cents never hurt).",
      ],
    },
    {
      heading: "How much should you tip?",
      paragraphs: [
        "Customs vary, but common US guidance: **15–20%** at sit-down restaurants (20% for great service), **10–15%** for food delivery, **$1–2 per drink** at bars, **10%** for takeout, and **15–20%** for rideshares and haircuts. In much of Europe and Asia, service is often included or tipping is modest — check local norms when travelling.",
        "One rule of thumb: tip on the **pre-tax** amount. Tax isn't service, and most etiquette guides agree the percentage applies to the subtotal.",
      ],
    },
  ],

  "salary-calculator": [
    {
      heading: "Converting salary to hourly (and back)",
      paragraphs: [
        "The standard conversion assumes **2,080 working hours per year** (40 hours × 52 weeks). **Hourly rate = annual salary ÷ 2,080**; **annual salary = hourly rate × 2,080**.",
        "A **$75,000 salary** = 75,000 ÷ 2,080 = **$36.06/hour**. A **$25/hour** job = 25 × 2,080 = **$52,000/year**. This is the fastest way to compare a salaried offer against hourly work.",
      ],
    },
    {
      heading: "Gross pay vs. take-home pay",
      paragraphs: [
        "Your salary is **gross pay** — what you *don't* keep includes federal and state income tax, Social Security and Medicare (7.65% in the US), plus pre-tax deductions like 401(k) contributions and health premiums. Take-home ('net') pay is often **70–80%** of gross, varying hugely by location and filing status.",
        "When comparing offers, compare **total compensation**: base salary + bonuses + retirement match + health coverage + PTO. A $70,000 job with a 6% 401(k) match and great insurance can beat a $75,000 job with neither.",
      ],
    },
    {
      heading: "Using it to negotiate",
      paragraphs: [
        "Translate any offer into hourly terms — it makes trade-offs concrete. A $5,000 raise on a $75,000 salary is **$2.40/hour**; is the extra responsibility worth $2.40 an hour to you?",
        "Also annualise side income the same way: $500/month freelancing = $6,000/year ≈ **$2.88/hour** of full-time-equivalent pay. Numbers beat gut feelings in every negotiation.",
      ],
    },
  ],

  "amortization-calculator": [
    {
      heading: "What an amortization schedule shows",
      paragraphs: [
        "An amortization schedule lists **every single payment** of a loan: the date, how much goes to interest, how much reduces principal, and the remaining balance. It turns the abstract 'total interest' figure into a month-by-month story.",
        "The pattern is always the same: **interest-heavy early, principal-heavy late**, because interest is charged on the outstanding balance. Seeing it row by row is the best cure for underestimating long-term borrowing costs.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **$25,000 loan at 7% over 60 months** ($495.03/month). **Payment 1:** interest = $25,000 × 0.07 ÷ 12 = **$145.83**; principal = 495.03 − 145.83 = **$349.20**; new balance **$24,650.80**.",
        "**Payment 30** (halfway): balance ≈ $13,900, interest ≈ $81 — nearly half the interest of payment 1. **Final payment 60:** interest is just a few dollars and the balance hits zero. The schedule makes the snowball visible.",
      ],
    },
    {
      heading: "Why it matters for your wallet",
      paragraphs: [
        "**Extra payments.** Because early payments are mostly interest, any extra principal payment now wipes out *all* the future interest that principal would have accrued. Even $50/month extra on the loan above saves 7+ months and $500+ in interest.",
        "**Refinancing decisions.** The schedule shows exactly how much interest remains — refinance only if the new loan's remaining-interest total (plus fees) is clearly lower. **Loan comparisons.** Two loans with the same payment can have wildly different total interest; the schedule reveals the true cost side by side.",
      ],
    },
  ],

  "auto-loan-calculator": [
    {
      heading: "How auto loan payments work",
      paragraphs: [
        "An auto loan is a fixed installment loan: you borrow a lump sum and repay it in equal monthly payments over a set term, usually 36 to 72 months. Each payment covers that month's interest plus a slice of principal, so the balance falls to exactly zero with the final payment.",
        "The payment formula is **PMT = P × r(1+r)ⁿ / ((1+r)ⁿ − 1)**, where P is the amount financed, r the monthly rate (APR ÷ 12), and n the number of months. A longer term lowers the payment but raises total interest — the trade-off every car buyer should price before signing.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Borrow **$30,000 at 7% APR for 60 months**. The monthly rate is 0.07 ÷ 12 = 0.005833, giving a payment of **$594.04**. Over five years you pay **$35,642** total — **$5,642** of it interest.",
        "Stretch the same loan to **72 months** and the payment drops to about **$511**, but total interest climbs to roughly **$6,800**. That extra year costs you over $1,100 in interest alone — which is why a bigger down payment or a shorter term beats a lower monthly payment almost every time.",
      ],
    },
    {
      heading: "How to pay less for your car loan",
      paragraphs: [
        "**Shop the rate before the car.** Banks, credit unions, and online lenders compete for auto loans — a 2% lower APR on $30,000 saves roughly $1,600 over 60 months. Get pre-approved so the dealer's finance office has to beat your number, not set it.",
        "**Mind the total, not the payment.** Dealers love stretching terms to hit a monthly target. Always compare total interest across 48, 60, and 72 months in this calculator. And avoid rolling negative equity from a trade-in into the new loan — it inflates the principal and the interest snowballs from there.",
      ],
    },
  ],

  "retirement-calculator": [
    {
      heading: "The math behind retirement savings",
      paragraphs: [
        "Retirement savings grow through **compound growth**: each year's returns earn returns of their own. The future value of regular contributions is **FV = PMT × (((1+r)ⁿ − 1) ÷ r)**, where PMT is the monthly contribution, r the monthly return, and n the number of months. Time does most of the heavy lifting.",
        "That is why starting early beats saving more later. Contributions made in your 20s compound for 40 years; the same dollars contributed in your 40s get only 20 years. The calculator shows this split between what you put in and what growth contributed.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Invest **$500/month for 30 years at 7% average annual return**. You contribute **$180,000** out of pocket. Compounded monthly, it grows to **$609,985** — meaning **$429,985** (over 70% of the total) came from growth, not from you.",
        "Start ten years earlier — **40 years** instead of 30 — and the same $500/month becomes roughly **$1,312,400**. Those extra ten years of contributions ($60,000) generate about **$702,000** of extra growth. Time in the market is the most powerful input you control.",
      ],
    },
    {
      heading: "Making the projection realistic",
      paragraphs: [
        "**Use a conservative return.** 7% is the long-run US stock market average after inflation; using 5–6% builds in a margin of safety. **Account for inflation**: $610,000 in 30 years buys far less than $610,000 today — at 3% inflation it's worth about $251,000 in today's dollars.",
        "**Don't forget employer matches and tax.** A 401(k) match is an instant 50–100% return on those dollars — contribute at least enough to capture the full match before investing elsewhere. And remember this calculator shows pre-tax growth; traditional retirement accounts are taxed on withdrawal.",
      ],
    },
  ],

  "bmr-calculator": [
    {
      heading: "What BMR means",
      paragraphs: [
        "Your **Basal Metabolic Rate** is the calories your body burns at complete rest — keeping you breathing, warm, and alive. For most people it accounts for **60–70% of total daily calorie burn**, before any movement or exercise. Knowing it is the foundation of any calorie target.",
        "This calculator uses the **Mifflin-St Jeor equation**, the most validated formula: men **BMR = 10×weight(kg) + 6.25×height(cm) − 5×age + 5**, women the same minus 161 instead of plus 5. Total daily needs (TDEE) then multiply BMR by an activity factor from 1.2 (sedentary) to 1.9 (very active).",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A **30-year-old man, 70 kg, 175 cm**: BMR = 10×70 + 6.25×175 − 5×30 + 5 = 700 + 1093.75 − 150 + 5 = **1,649 calories/day** at rest.",
        "A **woman with the same stats**: 700 + 1093.75 − 150 − 161 = **1,483 calories/day**. With a moderately active lifestyle (×1.55), his maintenance intake is about **2,556 calories** and hers about **2,298** — the number to eat at to hold weight steady.",
      ],
    },
    {
      heading: "Using BMR for weight goals",
      paragraphs: [
        "**To lose weight**, eat roughly 300–500 calories below TDEE — about 0.5 kg per week. Larger deficits backfire: they cost muscle and slow the metabolism you're trying to work with. **To gain**, add 200–300 above TDEE with strength training so the surplus becomes muscle, not fat.",
        "**Recalculate as you change.** BMR falls as you lose weight (less body to maintain) and with age (about 1–2% per decade after 20, mostly from muscle loss). Strength training is the best defense — muscle is metabolically expensive tissue. Re-run this calculator every few months or after every 5 kg of change.",
      ],
    },
  ],

  "body-fat-calculator": [
    {
      heading: "How body fat percentage is estimated",
      paragraphs: [
        "Body fat percentage is the share of your weight that is fat versus everything else (muscle, bone, water). This calculator uses the **US Navy circumference method**, developed for the armed forces: it predicts body fat from **height, neck, waist** (plus hips for women) using the formula **495 ÷ (1.0324 − 0.19077×log₁₀(waist−neck) + 0.15456×log₁₀(height)) − 450**.",
        "Typical healthy ranges are roughly **10–20% for men** and **18–28% for women** (athletes lower, older adults slightly higher). Tape measurements won't match a DEXA scan, but they're consistent enough to track trends — which is what matters.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A man with **waist 90 cm, neck 40 cm, height 175 cm**: waist−neck = 50. Plugging into the Navy formula gives **19.2%** body fat — inside the healthy range but with room to lean out.",
        "If he trims his waist to **84 cm** at the same neck and height, the estimate drops to about **14.5%**. That's the power of the tape method: small, measurable changes you can verify monthly without any equipment beyond a tape measure.",
      ],
    },
    {
      heading: "Getting reliable measurements",
      paragraphs: [
        "**Measure consistently.** Same time of day (morning, before food), same tape tension, waist at the navel (not sucked in), neck below the Adam's apple. A 1 cm error in waist shifts the result by roughly 1 percentage point — consistency beats precision.",
        "**Use it with other metrics.** Body fat % pairs well with scale weight and waist circumference: if weight is flat but waist is shrinking, you're likely gaining muscle and losing fat simultaneously. Don't chase extreme lows — men below ~5% and women below ~12% risk hormonal and health problems.",
      ],
    },
  ],

  "gpa-calculator": [
    {
      heading: "How GPA is calculated",
      paragraphs: [
        "Grade Point Average is a **credit-weighted average**: each course contributes its grade points multiplied by its credit hours, divided by total credits. **GPA = Σ(grade points × credits) ÷ Σcredits**. A 4-credit course moves your GPA more than a 1-credit one — weighting is the whole game.",
        "The standard US scale is **A = 4.0, A− = 3.7, B+ = 3.3, B = 3.0, B− = 2.7, C+ = 2.3, C = 2.0, D = 1.0, F = 0**. Some schools add weight for honors/AP courses (often +0.5 or +1.0), producing a weighted GPA above 4.0 — always know which scale your school reports.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Three courses: a **3-credit A (4.0)**, a **4-credit B+ (3.3)**, and a **3-credit C (2.0)**. Grade points = 3×4.0 + 4×3.3 + 3×2.0 = 12 + 13.2 + 6 = **31.2**. Total credits = 10. GPA = 31.2 ÷ 10 = **3.12**.",
        "Notice the 4-credit B+ pulled harder than the 3-credit A helped — weighting cuts both ways. To project a target GPA, enter your completed courses plus planned grades for current ones; the calculator shows exactly what you need this semester to hit your goal.",
      ],
    },
    {
      heading: "GPA strategy that actually works",
      paragraphs: [
        "**Protect high-credit courses first.** An hour of study buys more GPA in a 4-credit class than a 1-credit one. **Know drop/withdrawal deadlines** — a W usually hurts less than an F, and retaking a failed course (where grade replacement applies) can repair the damage fast.",
        "**Cumulative GPA has inertia.** After 60 credits, one perfect 15-credit semester (4.0) lifts a 3.0 only to about 3.2 — the math is unforgiving, which is why early semesters matter most. Use this calculator each term to see the real trajectory, not the hoped-for one.",
      ],
    },
  ],

  "ovulation-calculator": [
    {
      heading: "How ovulation timing works",
      paragraphs: [
        "Ovulation — the release of an egg — typically happens about **14 days before your next period**, not 14 days after the last one. For a textbook 28-day cycle that's day 14, but for a 32-day cycle it's around day 18. The **luteal phase** (ovulation to next period) is the stable part, usually 12–14 days; cycle length varies mostly in the follicular phase before ovulation.",
        "The **fertile window** is the 5 days before ovulation plus ovulation day itself, because sperm survive up to 5 days while the egg lasts only 12–24 hours. This calculator estimates the window from your last period date and average cycle length.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Last period started **January 1** with a regular **28-day cycle**. Ovulation lands around **January 15** (day 14), so the fertile window runs roughly **January 10–15**, with the highest conception odds on January 13–15.",
        "With a **32-day cycle** instead, ovulation shifts to about **January 19** and the window to **January 14–19**. Same method, different anchor — which is why tracking your own average cycle length beats assuming 28 days.",
      ],
    },
    {
      heading: "Making predictions more reliable",
      paragraphs: [
        "**Track at least 3 cycles.** One unusual month (stress, illness, travel) skews the average; three or more reveal your real pattern. Log start dates, not symptoms — the math needs dates.",
        "**Confirm with body signals.** Calendar estimates are predictions; **ovulation predictor kits** (LH surge, ~24–36 hours before ovulation) and **basal body temperature** shifts confirm it happened. For avoiding pregnancy, calendar methods alone are unreliable — typical-use failure is around 24% per year. For conception, daily or every-other-day intercourse through the fertile window maximizes odds.",
      ],
    },
  ],

  "pregnancy-due-date-calculator": [
    {
      heading: "How due dates are calculated",
      paragraphs: [
        "Pregnancy is dated from the **first day of your last menstrual period (LMP)**, not from conception — so the '40 weeks' already includes about two pre-ovulation weeks. The standard method is **Naegele's rule**: add 7 days, subtract 3 months, add 1 year to the LMP date.",
        "Only about **5% of babies arrive on the due date**; 37–42 weeks is the normal range. The date is a planning anchor for prenatal appointments and milestones, not an appointment the baby keeps.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "LMP = **January 1, 2026**. Add 7 days → January 8; subtract 3 months → October 8, 2025; add 1 year → **October 8, 2026**. That's the estimated due date — 280 days from the LMP.",
        "Key milestones from that date: the **first trimester ends** around 13 weeks (early April 2026), the **anatomy scan** typically happens at 18–22 weeks (May–June), and **full term** begins at 39 weeks (early October). This calculator maps all of these from one date.",
      ],
    },
    {
      heading: "When the estimate needs adjusting",
      paragraphs: [
        "**Irregular cycles** throw off Naegele's rule, which assumes ovulation on day 14. With longer cycles, conception happened later than assumed and the due date may be overestimated by the difference. **First-trimester ultrasound** (crown-rump length, weeks 8–13) dates pregnancy within about 5 days and overrides the LMP estimate when they disagree.",
        "**IVF pregnancies** are dated from the transfer: add 266 days to the egg retrieval date (or use the embryo's gestational age at transfer). If you don't remember your LMP at all, an early ultrasound is the way to establish dating — book it as soon as pregnancy is confirmed.",
      ],
    },
  ],

  "scientific-calculator": [
    {
      heading: "What a scientific calculator does",
      paragraphs: [
        "Beyond the four basic operations, a scientific calculator handles **trigonometry** (sin, cos, tan and inverses), **logarithms** (log base 10, natural log), **powers and roots** (xʸ, x², √x), **factorials**, and constants like **π and e**. It's the everyday engine for science, engineering, and finance math.",
        "**Angle mode matters.** Trigonometric functions need to know whether your angle is in degrees or radians — sin(30°) = 0.5, but sin(30 radians) = −0.988. This calculator has a Deg/Rad toggle; most textbook problems use degrees unless stated otherwise.",
      ],
    },
    {
      heading: "Worked examples",
      paragraphs: [
        "**sin(30°)** = **0.5** — the classic. **2¹⁰** = **1,024** (handy for computing powers of two). **log₁₀(1,000)** = **3**, because 10³ = 1,000. **√2** ≈ **1.41421**.",
        "Chained example — compound growth: **1.07¹⁰** ≈ **1.967**, so 7% annual growth nearly doubles money in 10 years (the rule of 72 says 72 ÷ 7 ≈ 10.3 years — close). Use parentheses for anything nested: **(3 + 4) × 2** = 14, not 11.",
      ],
    },
    {
      heading: "Avoiding the classic mistakes",
      paragraphs: [
        "**Order of operations still applies.** The calculator follows PEMDAS, but humans typing left-to-right forget it — when in doubt, add parentheses. **Watch the angle mode** before every trig calculation; a wrong mode is the #1 source of 'the calculator is broken' moments.",
        "**Degrees vs radians in code and class.** Programming languages (JavaScript, Python) use radians by default; switch the toggle to Rad when checking code output. And remember inverse trig returns angles: **sin⁻¹(0.5) = 30°** in degree mode.",
      ],
    },
  ],

  "fraction-calculator": [
    {
      heading: "How fraction arithmetic works",
      paragraphs: [
        "Every fraction operation comes down to **common denominators** for addition/subtraction and **straight multiplication** for ×/÷. Addition: **a/b + c/d = (ad + bc) / bd**, then simplify. Multiplication: **a/b × c/d = ac / bd**. Division flips the second fraction: **a/b ÷ c/d = a/b × d/c**.",
        "Simplifying means dividing top and bottom by their **greatest common divisor (GCD)**. This calculator reduces every answer automatically and shows mixed numbers where appropriate.",
      ],
    },
    {
      heading: "Worked examples",
      paragraphs: [
        "**1/2 + 1/3**: common denominator 6 → 3/6 + 2/6 = **5/6**. **3/4 − 1/6**: denominator 12 → 9/12 − 2/12 = **7/12**.",
        "**2/3 × 3/4** = 6/12 = **1/2** (cancel the 3s first to see it instantly). **5/6 ÷ 2/3** = 5/6 × 3/2 = 15/12 = **5/4** = 1¼. Division is just multiplication by the reciprocal — the flip is the whole trick.",
      ],
    },
    {
      heading: "Where fractions beat decimals",
      paragraphs: [
        "**Cooking and DIY.** Halving 3/4 cup gives 3/8 cup — exact, while 0.375 cups means nothing on a measuring cup. Thirds are the classic case: 1/3 is exact but 0.333... never terminates.",
        "**Mental shortcuts.** To compare fractions fast, cross-multiply: 5/8 vs 2/3 → 5×3=15 vs 2×8=16, so 2/3 is bigger. To add quickly, use the 'butterfly': (a×d + b×c) over (b×d) — the same formula above, just visualized.",
      ],
    },
  ],

  "mortgage-refinance-calculator": [
    {
      heading: "When refinancing makes sense",
      paragraphs: [
        "Refinancing replaces your current mortgage with a new one — usually to capture a **lower rate**, shorten the **term**, or switch loan type. The core question is simple: do the **monthly savings outweigh the closing costs** before you sell or move?",
        "The break-even rule: **break-even months = closing costs ÷ monthly savings**. If you plan to stay well past break-even, refinancing wins. Lenders often quote a '1% rule' (refinance if rates dropped 1%+), but the real test is your numbers — small balances need bigger rate drops to justify the fees.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "You owe **$350,000 at 7.5%** with 30 years left: payment **$2,447.25/month**. Refinancing to **6.0%** drops it to **$2,098.43** — a saving of **$348.82/month**.",
        "With **$6,000 in closing costs**, break-even is 6,000 ÷ 348.82 ≈ **17 months**. Stay 5+ years and you save roughly $348.82 × 43 ≈ **$15,000** net of costs. But watch the term: refinancing into a *new* 30 years restarts the clock — compare remaining interest, not just the payment.",
      ],
    },
    {
      heading: "Refinancing pitfalls to avoid",
      paragraphs: [
        "**Resetting the term.** Five years into a 30-year loan, a new 30-year refinance stretches you to 35 years total. Ask for the remaining term (25 years here) or run the numbers — a lower payment that costs more interest overall is a bad trade.",
        "**No-cost refis aren't free.** They roll costs into a slightly higher rate or the balance — fine if you'll move soon, worse if you stay. **ARMs** offer lower starter rates but reset risk; only choose one if you'll sell or pay off before the adjustment. And never refinance unsecured debt into your home without a plan — you're converting dischargeable debt into debt secured by your house.",
      ],
    },
  ],

  "date-calculator": [
    {
      heading: "What a date calculator does",
      paragraphs: [
        "A date calculator answers three everyday questions: **how many days between two dates**, what date falls **N days from today**, and what **day of the week** a date was or will be. Businesses use it for project timelines and contract terms; everyone else uses it for countdowns, anniversaries, and age-in-days curiosities.",
        "The core operation is **date duration**: subtract the earlier date from the later one. Leap years make mental math treacherous — a span crossing February 29 has an extra day hiding in it — which is exactly why the tool exists.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Days between **January 1, 2026** and **October 8, 2026**: the calculator counts **280 days** — exactly **40 weeks**. (2026 isn't a leap year, so February contributes its usual 28.)",
        "Add **100 days** to March 15, 2026 and you land on **June 23, 2026**. October 8, 2026 itself falls on a **Thursday**. Date math like this is trivial for the tool and error-prone by hand — one miscounted month throws everything off.",
      ],
    },
    {
      heading: "Everyday uses for day counting",
      paragraphs: [
        "**Deadlines and contracts:** 'delivery within 45 days of signing' — count it precisely instead of guessing mid-month. **Pregnancy and parenting:** 280 days from the last period is the standard due-date estimate. **Travel:** visa stays are counted in days, and overstaying by one is expensive.",
        "**Tip:** when a result matters (legal, medical, financial), double-check whether the count is **inclusive or exclusive** of the start date — conventions differ, and off-by-one is the classic date-calculation dispute.",
      ],
    },
  ],

  "time-calculator": [
    {
      heading: "Adding and subtracting time",
      paragraphs: [
        "A time calculator handles what clocks make awkward: **adding durations** (3h 45m + 2h 30m), **subtracting times** (how long from 9:00 AM to 5:30 PM), and converting between units. Time isn't decimal — 90 minutes is 1.5 hours, not 1.90 — so plain arithmetic keeps tripping people up.",
        "The reliable method is converting everything to the **smallest unit first**: turn hours into minutes, do the arithmetic, then convert back. This calculator does that silently on every operation.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Shift from **9:00 AM to 5:30 PM**: that's **8 hours 30 minutes**, or **8.5 decimal hours**. Work that schedule five days and the week totals **42.5 hours** — the number payroll actually needs.",
        "Add **2h 45m + 1h 50m**: convert to minutes (165 + 110 = 275), convert back — **4 hours 35 minutes**. Try it as decimals and watch the trap: 2.75 + 1.83 = 4.58 hours, which is 4h 35m, not 4h 58m. The tool keeps the units honest.",
      ],
    },
    {
      heading: "Hours, payroll, and billing",
      paragraphs: [
        "**Work hours tracking** is the top use: log start/end times daily and the weekly total feeds straight into timesheets. If you bill by the hour, convert to decimals (8h 30m → 8.5) before multiplying by your rate — a $60/hour rate on 8.5 hours is **$510**, clean.",
        "**Across midnight?** A shift from 10 PM to 6 AM is 8 hours, but naive subtraction gives −16. The calculator handles the day rollover. And for **time zones**, always convert both times to UTC first — '3 PM their time' is meaningless without it.",
      ],
    },
  ],

  "tax-calculator": [
    {
      heading: "How tax calculations work",
      paragraphs: [
        "Most everyday tax math is a **rate applied to a base**: sales tax on a purchase, VAT on an invoice, or withholding on a paycheck. **Tax = base × rate**, and the total is base + tax. Simple — until rates stack, compound, or phase in brackets.",
        "Income tax adds **brackets**: you pay each rate only on the slice of income inside that bracket, not the top rate on everything. Confusing the marginal rate with the effective rate is the single most common tax misconception.",
      ],
    },
    {
      heading: "Worked examples",
      paragraphs: [
        "**Sales tax:** a $1,000 laptop at 8.5% carries **$85** in tax — total **$1,085**. **VAT:** a €200 invoice ex-VAT at 20% becomes **€240**; the VAT-registered buyer reclaims the €20-equivalent portion later, which is why B2B quotes exclude VAT.",
        "**Brackets in action:** on $75,000 of taxable income with a 22% marginal bracket, you do **not** pay 22% of $75,000. You pay 10% on the first slice, 12% on the next, 22% only on the top slice — the effective rate lands well below 22%. This calculator applies each bracket to its slice automatically.",
      ],
    },
    {
      heading: "What people get wrong",
      paragraphs: [
        "**'A raise pushed me into a higher bracket so I earn less.'** Impossible under marginal brackets — only the dollars above the threshold are taxed at the higher rate. Raises always increase take-home pay.",
        "**Refunds aren't gifts.** A big refund means you overpaid withholding all year — an interest-free loan to the government. Adjust withholding so the refund is small. And **always compare pre-tax vs post-tax**: a $5,000 bonus at 24% marginal is really $3,800 in your pocket.",
      ],
    },
  ],

  "investment-calculator": [
    {
      heading: "How investments compound",
      paragraphs: [
        "Investing puts money into assets — stocks, bonds, funds — that (usually) grow over time. The engine is the same compounding behind retirement math: **FV = PV × (1+r)ⁿ**. The two inputs that matter most are the **annual return** and the **time horizon**; fees are the silent third, quietly subtracting every year.",
        "Expected returns come with expected volatility. Stocks have averaged ~10% nominal (~7% after inflation) long-term, but any single year can swing ±20% or more. Longer horizons smooth the ride — which is why time horizon should drive your asset mix.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "**$10,000 invested at 8% for 20 years**: FV = 10,000 × 1.08²⁰ = 10,000 × 4.661 = **$46,610**. You more than quadrupled the money while adding nothing.",
        "The **Rule of 72** shortcut: 72 ÷ 8 ≈ **9 years to double**. So that $10,000 doubles roughly twice in 20 years ($10k → $20k → $40k), landing near $46,610 — the rule gets you within 15% in seconds. Now subtract a 1% annual fee (7% net): the result drops to about **$38,700** — fees ate nearly **$8,000**.",
      ],
    },
    {
      heading: "Investing principles that hold up",
      paragraphs: [
        "**Diversify and keep costs low.** A broad index fund at 0.03% fees beats most stock-picking over decades — not because it's clever, but because it's cheap and diversified. **Match risk to horizon**: money needed in 2 years shouldn't ride the stock market's waves.",
        "**Rebalance yearly** back to your target mix (say 80/20 stocks/bonds) — it forces selling high and buying low mechanically. And **never invest money you'll need soon** in volatile assets; the market doesn't care about your timeline.",
      ],
    },
  ],

  "grade-calculator": [
    {
      heading: "How final grades are computed",
      paragraphs: [
        "Most courses use **weighted categories**: homework 20%, midterms 30%, final 50%, for example. Your grade is **Σ(category score × weight) ÷ Σweights**. The final exam's weight is what makes or breaks borderline grades — a 50%-weighted final can swing your course grade by a full letter.",
        "The reverse question is more useful: **what do I need on the final?** Required = (target − current×(1−w)) ÷ w, where w is the final's weight. This calculator runs it both ways.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "You're at **85%** going into a final worth **40%** of the grade, and you want a **90%**. Required = (90 − 85×0.60) ÷ 0.40 = (90 − 51) ÷ 0.40 = **97.5%**. Tough but possible — now you know exactly what's at stake.",
        "If the final were worth only **20%**: required = (90 − 85×0.80) ÷ 0.20 = (90 − 68) ÷ 0.20 = **110%** — mathematically impossible. That's the value of the calculation: it tells you when to fight and when to protect what you have.",
      ],
    },
    {
      heading: "Grade strategy",
      paragraphs: [
        "**Weight is leverage.** An hour spent on a 40%-weighted final buys twice the grade of an hour on 20%-weighted homework. Allocate study time by weight, not by what's due next.",
        "**Know the syllabus rules.** Some courses drop the lowest quiz, curve, or offer extra credit — each changes the math. And watch **rounding policies**: an 89.5% that rounds to an A is a very different target than one that doesn't. Ask before assuming.",
      ],
    },
  ],

  "inflation-calculator": [
    {
      heading: "What inflation does to money",
      paragraphs: [
        "Inflation is the **general rise in prices** — the same basket of goods costs more each year, so each dollar buys less. The future cost is **FV = PV × (1+i)ⁿ**, where i is the annual inflation rate. At 3% inflation, prices double roughly every 24 years (Rule of 72 again: 72 ÷ 3).",
        "Central banks in the US, UK, and EU target about **2%** annual inflation. Actual rates swing with energy prices, wars, and policy — the 2021–2023 surge reminded everyone that 'average' hides a lot.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "**$100,000 in the year 2000** at 3% average inflation: 100,000 × 1.03²⁵ = 100,000 × 2.094 = **$209,378**. You'd need about **$209,000 in 2025** to buy what $100,000 bought in 2000 — the dollar lost more than half its purchasing power.",
        "Flip it: a **$50,000 salary in 2000** equals roughly **$104,700 today** in purchasing power. Got a raise to $90,000 since then? In real terms you took a pay cut. Always compare money across years in **real (inflation-adjusted)** terms.",
      ],
    },
    {
      heading: "Protecting yourself from inflation",
      paragraphs: [
        "**Cash loses quietly.** Money in a 0.5% savings account during 3% inflation shrinks 2.5% in real terms yearly — 'safe' isn't safe. **Assets reprice**: stocks, real estate, and inflation-linked bonds (TIPS, linkers) historically outrun inflation over long horizons.",
        "**Debt gets cheaper in real terms** — a fixed-rate mortgage's payment stays flat while wages and prices rise, which is why inflation quietly benefits borrowers. And when negotiating salary, anchor to real terms: a 2% raise during 3% inflation is a 1% cut.",
      ],
    },
  ],
};
