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
        "If you're visiting America, note that US tipping culture is among the most tip-heavy in the world: **tipped workers in many states earn a lower cash minimum wage** (the federal tipped minimum is $2.13/hour), so tips genuinely are a large part of servers' income. That's why 18–20% has become the default expectation at American restaurants, and why this tip calculator defaults to those percentages.",
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

  "roman-numeral-converter": [
    {
      heading: "How this roman numeral converter works",
      paragraphs: [
        "Type any number from 1 to 3,999 and this roman numeral converter translates it instantly — or paste a roman numeral like **MCMXCIV** to get 1994 back. The system uses just seven letters: **I (1), V (5), X (10), L (50), C (100), D (500), M (1000)**.",
        "Whether you searched for a roman numerals converter, a roman numbers converter, or a roman letters converter, they all mean the same thing: turning modern digits into the ancient Roman system and back.",
      ],
    },
    {
      heading: "The two rules that do all the work",
      paragraphs: [
        "**Add when a smaller-or-equal symbol follows a bigger one:** VI = 5 + 1 = 6; LXX = 50 + 10 + 10 = 70. **Subtract when a smaller symbol comes first:** IV = 5 − 1 = 4; IX = 9; XL = 40; XC = 90; CD = 400; CM = 900. Subtraction only works for I before V/X, X before L/C, and C before D/M — so 49 is **XLIX**, never IL.",
        "A symbol repeats at most three times: III = 3 but 4 = IV, XXX = 30 but 40 = XL.",
      ],
    },
    {
      heading: "Worked examples",
      paragraphs: [
        "**2024 → MMXXIV.** 2000 = MM, 20 = XX, 4 = IV. Combined: **MMXXIV**.",
        "**MCMXCIV → 1994.** Read left to right: M = 1000, CM = 900, XC = 90, IV = 4. Total: **1994**.",
        "**949 → CMXLIX.** 900 = CM, 40 = XL, 9 = IX. Combined: **CMXLIX** — three subtraction pairs in one number, a great test of the rules.",
      ],
    },
    {
      heading: "Where roman numerals still appear",
      paragraphs: [
        "You'll meet roman numerals on **clock faces** (which traditionally use IIII for 4), **movie copyright years**, **Super Bowl numbers**, **book chapters**, and **monarch names** like Elizabeth II. Our full blog guide includes a complete 1–100 chart and the step-by-step conversion method.",
      ],
    },
  ],

  "statistics-calculator": [
    {
      heading: "What this statistics calculator computes",
      paragraphs: [
        "Paste any list of numbers and this statistics calculator returns the full descriptive summary: **count, sum, mean, median, mode, range, variance, and standard deviation** — everything you need for homework, lab reports, or a quick data check.",
        "Looking for a stats calculator that just does the basics? The mean, median and mode are the three 'centers' of your data; the range and standard deviation describe how spread out it is. Together they tell you what a raw list of numbers actually looks like.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take the data set **5, 8, 12, 15, 20**: count = 5, sum = 60, **mean = 60 ÷ 5 = 12**. Sorted, the middle value is 12, so **median = 12**. No value repeats, so there is **no mode**. **Range = 20 − 5 = 15**.",
        "For spread: deviations from the mean are −7, −4, 0, 3, 8. Squaring: 49, 16, 0, 9, 64. Sum = 138. Population variance = 138 ÷ 5 = **27.6**, so standard deviation = √27.6 ≈ **5.25**. The calculator shows both the population and sample versions — use the sample one when your data is a subset of something bigger (like 50 surveyed voters).",
      ],
    },
    {
      heading: "Mean vs median: which to trust",
      paragraphs: [
        "The mean uses every value, so **one outlier drags it**: the mean of 2, 4, 6, 8, 100 is 24, which describes none of the typical values. The median (6 here) ignores outliers entirely. That's why **house prices and salaries are reported as medians** — a few mansions or billionaires would warp the average.",
        "Rule of thumb: no outliers → mean; outliers present → median; most common category → mode (the only one that works for non-numbers, like best-selling shirt size).",
      ],
    },
  ],

  "gcf-calculator": [
    {
      heading: "What the GCF is and why it matters",
      paragraphs: [
        "The **greatest common factor (GCF)** — also called the greatest common divisor — is the largest number that divides two numbers evenly. This GCF calculator finds it instantly for any pair you enter.",
        "You need the greatest common factor whenever things must split evenly: **simplifying fractions** (24/36 reduces by GCF 12 to 2/3), cutting the largest equal pieces from two lengths, or packing two quantities into identical groups.",
      ],
    },
    {
      heading: "Worked examples",
      paragraphs: [
        "**GCF of 36 and 60:** factors of 36 are 1, 2, 3, 4, 6, 9, 12, 18, 36; factors of 60 are 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60. The largest shared factor is **12**.",
        "**GCF of 1071 and 462 (Euclidean algorithm):** 1071 ÷ 462 = 2 remainder 147; 462 ÷ 147 = 3 remainder 21; 147 ÷ 21 = 7 remainder 0. The last divisor is the GCF: **21**. The calculator uses this method, which is why it handles huge numbers without breaking a sweat.",
      ],
    },
    {
      heading: "GCF vs LCM",
      paragraphs: [
        "Don't confuse the two: the **GCF is the largest number dividing both** (it shrinks), while the **LCM is the smallest number both divide into** (it grows). For 12 and 18: GCF = 6, LCM = 36. Handy check: GCF × LCM always equals the product of the two numbers — 6 × 36 = 216 = 12 × 18.",
      ],
    },
  ],

  "weight-loss-percentage-calculator": [
    {
      heading: "How to calculate weight loss percentage",
      paragraphs: [
        "Enter your starting and current weight and this calculator shows your weight loss percentage: **(start − current) ÷ start × 100**. Percentages are fairer than pounds — 10 lbs lost means something different at 150 lbs than at 300 lbs.",
        "**Example:** starting at 220 lbs, now at 198 lbs. Lost: 22 lbs. Percentage: 22 ÷ 220 × 100 = **10%**. Doctors consider 10% a clinically meaningful threshold, linked to real improvements in blood pressure, blood sugar, and joint load.",
      ],
    },
    {
      heading: "The calorie math behind the percentage",
      paragraphs: [
        "A pound of body fat stores roughly **3,500 calories**. A daily deficit of 500 calories (eat 300 less + burn 200 more) × 7 days ≈ **1 lb per week** — the classic, still-reliable planning rule.",
        "A safe sustained rate is **0.5–1% of body weight per week** (1–2 lbs/week for a 200-lb person). Faster usually means water and muscle, not fat; slower is still real progress — 0.5 lb/week is 26 lbs in a year. Judge trends over 4-week averages, since daily weight swings of 1–3 lbs from water are completely normal.",
      ],
    },
    {
      heading: "Beyond the scale",
      paragraphs: [
        "Track **waist measurement at the navel** alongside your percentage — a shrinking waist with stable weight means fat loss plus muscle gain. Monthly progress photos, belt notches, and training performance that holds or improves while losing all confirm you're losing the right kind of weight.",
      ],
    },
  ],

  "lean-body-mass-calculator": [
    {
      heading: "How to calculate lean body mass",
      paragraphs: [
        "Enter your height, weight, and gender and this calculator estimates your **lean body mass (LBM)** — everything in your body except fat: muscle, bone, organs, and water — using the widely used **Boer formula**.",
        "Men: **LBM = 0.407 × weight(kg) + 0.267 × height(cm) − 19.2**. Women: **LBM = 0.252 × weight(kg) + 0.473 × height(cm) − 48.3**.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A man weighing **90 kg** at **183 cm** (6'0\"): LBM = 0.407 × 90 + 0.267 × 183 − 19.2 = 36.63 + 48.86 − 19.2 = **66.3 kg** (146 lbs). On a 200-lb frame, that implies roughly 27% body fat.",
        "A woman weighing **65 kg** at **165 cm**: LBM = 0.252 × 65 + 0.473 × 165 − 48.3 = 16.38 + 78.05 − 48.3 = **46.1 kg** (101.6 lbs).",
      ],
    },
    {
      heading: "How to use your LBM number",
      paragraphs: [
        "**Protein target:** 1.6–2.2 g per kg of LBM daily when building muscle, 1.2–1.6 g/kg in a deficit. The 66.3 kg man above needs roughly **106–146 g/day**. **Calorie baseline:** muscle drives resting metabolism far more than fat — two people at the same weight but different LBM can differ by 200+ calories/day in maintenance needs.",
        "Note the Boer formula is an estimate validated on typical adult builds; it loses accuracy for very muscular athletes or the very tall/short. For tracking your own trend over time, it's consistent and free — which is what matters most.",
      ],
    },
  ],

  "celsius-to-fahrenheit-converter": [
    {
      heading: "The conversion formulas",
      paragraphs: [
        "This celsius to fahrenheit calculator applies the exact formulas instantly — no rounding shortcuts:",
        "**°F = (°C × 9/5) + 32** and the reverse **°C = (°F − 32) × 5/9**.",
      ],
    },
    {
      heading: "Worked examples",
      paragraphs: [
        "**25°C → °F:** (25 × 9/5) + 32 = 45 + 32 = **77°F** — a warm day. **−40°C → °F:** (−40 × 9/5) + 32 = −72 + 32 = **−40°F** — the one temperature where both scales agree, a handy check your math is right.",
        "**98.6°F → °C:** (98.6 − 32) × 5/9 = 66.6 × 5/9 = **37°C** — normal body temperature. **350°F → °C:** (350 − 32) × 5/9 = 318 × 5/9 = **176.7°C** — round to **180°C** for oven settings.",
      ],
    },
    {
      heading: "Quick mental-math trick",
      paragraphs: [
        "For everyday estimates: **double the Celsius and add 30**. 20°C → ~70°F (actual 68°F) — close enough to decide on a jacket. Going back: subtract 30 from Fahrenheit and halve it. 86°F → ~28°C (actual 30°C).",
        "Anchor temperatures worth memorizing: water freezes at **0°C / 32°F**, room temperature is **20°C / 68°F**, body temperature is **37°C / 98.6°F**, and water boils at **100°C / 212°F**.",
      ],
    },
  ],
  "gas-mileage-calculator": [
    {
      heading: "From MPG to dollars: your cost per mile",
      paragraphs: [
        "Knowing your gas mileage is only half the story — this calculator turns it into money: **cost per mile = fuel price ÷ MPG**, and **trip fuel cost = distance ÷ MPG × fuel price**.",
        "**Example:** gas at **$3.50/gallon** and a car doing **28 MPG**. Cost per mile = 3.50 ÷ 28 = **$0.125** — twelve and a half cents per mile. A 400-mile drive costs 400 × 0.125 = **$50** in fuel.",
      ],
    },
    {
      heading: "Comparing cars by fuel cost",
      paragraphs: [
        "Sticker MPG differences look small until you annualize them. Over **15,000 miles/year** at $3.50/gallon: a 25 MPG car burns $2,100 of fuel; a 35 MPG car burns $1,500. That's **$600/year** — $3,000 over five years, often more than the price gap between trims.",
        "Track your real-world MPG here rather than trusting the window sticker: short trips, winter fuel blends, and city traffic routinely cut EPA figures by 10–20%.",
      ],
    },
  ],

  "road-trip-calculator": [
    {
      heading: "Planning a road trip: the travel distance math",
      paragraphs: [
        "A road trip calculator answers three questions: **how far** (travel distance), **how much fuel**, and **how much it costs**. Enter your route distance, your car's MPG, and the fuel price:",
        "**Fuel needed = distance ÷ MPG**; **fuel cost = fuel needed × price per gallon**.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A **450-mile** trip in a car doing **25 MPG** with gas at **$3.40/gallon**: fuel needed = 450 ÷ 25 = **18 gallons**; fuel cost = 18 × 3.40 = **$61.20**.",
        "For the full trip budget, add the extras people forget: **tolls** (check your route), **food** (~$15–25/person/day on the road), **lodging** if overnight, and a **10% buffer** for detours and price differences between states — gas can vary $1+/gallon across state lines.",
      ],
    },
    {
      heading: "Cutting the fuel bill",
      paragraphs: [
        "The cheapest lever is **speed**: dropping from 75 to 65 mph typically saves 10–15% on highway fuel. Next is **route choice**: 20 extra miles to avoid mountain passes or stop-and-go traffic usually pays for itself. And check tire pressure before you leave — it's free MPG.",
      ],
    },
  ],

  "fuel-cost-calculator": [
    {
      heading: "How to calculate fuel cost and mileage cost",
      paragraphs: [
        "This fuel cost calculator answers the 'what will it cost me to drive there?' question in one step. The core formula: **trip cost = (distance ÷ fuel efficiency) × fuel price**.",
        "**Mileage cost** — the cost per mile of driving — is the same math rearranged: **fuel price ÷ MPG**. At $3.60/gallon and 30 MPG, every mile costs you exactly **$0.12**.",
      ],
    },
    {
      heading: "Worked examples",
      paragraphs: [
        "**Daily commute:** 24 miles round-trip, 5 days/week, 28 MPG, $3.50/gal. Weekly fuel = (120 ÷ 28) × 3.50 = **$15.00**. Monthly ≈ **$65**. Yearly ≈ **$780** — worth knowing before you sign a lease farther from work.",
        "**Delivery driving:** if you earn per delivery, subtract your mileage cost first. At $0.12/mile, a 10-mile round trip costs $1.20 in fuel alone — before wear, insurance, and depreciation (the IRS standard mileage rate, which bundles all of that, is far higher).",
      ],
    },
  ],

  "trip-cost-calculator": [
    {
      heading: "Building a complete trip budget",
      paragraphs: [
        "Fuel is only one line of a trip budget. This trip cost calculator totals the full picture: **fuel + tolls + lodging + food + activities**, then splits it per person.",
        "**Example — 600-mile weekend for two:** fuel (600 ÷ 28 MPG × $3.50) = $75; tolls = $18; one hotel night = $140; food = $120; total = **$353**, or **$176.50 per person**.",
      ],
    },
    {
      heading: "What people forget to budget",
      paragraphs: [
        "The five most-forgotten trip costs: **parking** ($20–50/day in cities), **tolls** (check the route in advance), **travel-day food** (airport and highway prices), **pet care or house-sitting**, and a **10–15% contingency**. Add them and your 'cheap weekend' usually lands within 10% of the real number instead of 40% under it.",
        "Splitting costs? Decide the split rule before the trip — even miles, even people, or per-car — and log shared spending in one place. Most trip arguments are about money nobody tracked.",
      ],
    },
  ],

  "deck-calculator": [
    {
      heading: "How to estimate deck boards (deck board calculator)",
      paragraphs: [
        "This deck calculator estimates materials for your project, including the number of deck boards. The board math: **boards needed = deck width (inches) ÷ (board width + gap)**.",
        "**Example:** a deck **12 ft wide** (144 inches) using standard 5.5-inch decking with 1/4-inch gaps: 144 ÷ (5.5 + 0.25) = 144 ÷ 5.75 = **25.04 → 26 boards** of your deck's length. Add **10% waste** for cuts and mistakes: 26 × 1.1 = **28.6 → 29 boards**.",
      ],
    },
    {
      heading: "Framing and fasteners to remember",
      paragraphs: [
        "Boards are the visible part, but budget the hidden structure too: **joists** typically spaced 16 inches on center (12 inches for diagonal decking patterns), **beams and posts** per your local span tables, and roughly **350 screws per 100 sq ft** of decking. A 192 sq ft deck (16×12 ft) needs on the order of **650–700 screws**.",
        "Always check local building codes before you build — most areas require permits for decks above a certain height, plus specific footing depths and railing rules. The material estimate here gets you to the lumber yard; the permit office gets you a legal deck.",
      ],
    },
  ],

  "mixed-fraction-calculator": [
    {
      heading: "What is a mixed number?",
      paragraphs: [
        "A **mixed number** (or mixed fraction) combines a whole number with a fraction: **2½** means 2 + 1/2. This mixed number calculator adds, subtracts, multiplies, and divides them without the manual conversion.",
        "Carpenters, cooks, and students meet mixed numbers constantly: 2½ cups of flour, 3¾ inches of lumber, 1⅓ hours of homework.",
      ],
    },
    {
      heading: "How the math works (and worked examples)",
      paragraphs: [
        "The trick is converting to **improper fractions** first: multiply the whole number by the denominator, add the numerator. 2½ = (2×2 + 1)/2 = **5/2**.",
        "**Addition:** 2½ + 1¾ = 5/2 + 7/4 = 10/4 + 7/4 = 17/4 = **4¼**. **Multiplication:** 2½ × 1⅓ = 5/2 × 4/3 = 20/6 = 10/3 = **3⅓**. Division flips the second fraction: 2½ ÷ 1¼ = 5/2 ÷ 5/4 = 5/2 × 4/5 = 20/10 = **2**.",
        "Always **simplify** at the end: 20/6 reduces to 10/3 (divide by 2), then convert back by dividing — 10 ÷ 3 = 3 remainder 1 → **3⅓**.",
      ],
    },
  ],

  "btu-calculator": [
    {
      heading: "What is a BTU and how much heat do you need?",
      paragraphs: [
        "A **British Thermal Unit (BTU)** is the heat needed to raise one pound of water by 1°F. This heat calculator estimates the heating (or cooling) capacity your space needs, in BTU per hour.",
        "The quick rule of thumb for residential HVAC sizing: **≈ 20 BTU per square foot** for heating in a moderate climate. A **1,500 sq ft** home needs roughly 1,500 × 20 = **30,000 BTU/h** — about 2.5 tons of cooling (12,000 BTU = 1 ton).",
      ],
    },
    {
      heading: "Adjusting for your situation",
      paragraphs: [
        "The 20 BTU/sq ft baseline assumes 8-ft ceilings and average insulation. Adjust up for: **hot climates or poor insulation** (+10–20%), **ceilings over 8 ft** (scale by ceiling height ÷ 8), **large south/west windows** (+10%), and **kitchens** (+4,000 BTU). Adjust down for new, well-insulated construction (−10–20%).",
        "**Example:** a 1,200 sq ft older home with 9-ft ceilings in a hot climate: 1,200 × 20 = 24,000; × 1.15 (climate) = 27,600; × 1.125 (ceilings) = **≈ 31,000 BTU/h**. Professionals use a Manual J load calculation for the final number — this estimate gets you in the right equipment class so quotes make sense.",
      ],
    },
    {
      heading: "Don't oversize",
      paragraphs: [
        "Bigger is not better with HVAC: an oversized unit **short-cycles** — blasting on and off — which wastes energy, wears parts, and (for AC) fails to dehumidify, leaving the house cold but clammy. Slightly undersized with good insulation beats oversized every time.",
      ],
    },
  ],

  "scientific-notation-calculator": [
    {
      heading: "What scientific notation is",
      paragraphs: [
        "Scientific notation writes very large or small numbers compactly: **a × 10ⁿ**, where a (the coefficient) is between 1 and 10, and n counts how many places the decimal moved. This calculator converts both directions instantly.",
        "**7,800,000 → 7.8 × 10⁶** (decimal moved 6 places left). **0.00045 → 4.5 × 10⁻⁴** (decimal moved 4 places right, hence the negative exponent).",
      ],
    },
    {
      heading: "Working with scientific notation by hand",
      paragraphs: [
        "**Multiplication:** multiply the coefficients, add the exponents: (3 × 10⁴) × (2 × 10³) = 6 × 10⁷. **Division:** divide coefficients, subtract exponents: (8 × 10⁶) ÷ (2 × 10²) = 4 × 10⁴.",
        "**Addition/subtraction** requires matching exponents first: 3 × 10⁴ + 2 × 10³ = 3 × 10⁴ + 0.2 × 10⁴ = **3.2 × 10⁴**. This is the step students miss most — you can't just add the coefficients when the powers of ten differ.",
      ],
    },
    {
      heading: "Where you'll use it",
      paragraphs: [
        "Astronomy (a light-year ≈ 9.46 × 10¹⁵ meters), chemistry (Avogadro's number 6.022 × 10²³), computing (a terabyte = 10¹² bytes), and finance (national debts in the 10¹²s). Any time a number has more digits than you can comfortably read, scientific notation is the right tool.",
      ],
    },
  ],

  "miles-to-kilometers-converter": [
    {
      heading: "The conversion",
      paragraphs: [
        "One mile is exactly **1.60934 kilometers**. This converter applies it both ways: **km = miles × 1.60934**; **miles = km ÷ 1.60934**.",
        "**100 miles →** 100 × 1.60934 = **160.934 km**. **Marathon 26.2 miles →** 26.2 × 1.60934 = **42.16 km**. **5K run →** 5 ÷ 1.60934 = **3.107 miles**.",
      ],
    },
    {
      heading: "Quick mental conversions",
      paragraphs: [
        "For everyday estimates, the **3-2-1 rule**: 3 miles ≈ 5 km, or multiply miles by **1.6**. 60 mph ≈ 96 km/h — which is why 100 km/h speed limits feel familiar to Americans as 'about 60'.",
        "Common anchors: 1 mile ≈ 1.6 km, 10 miles ≈ 16 km, 62 miles ≈ 100 km (an ultra-marathon '100K' is 62.1 miles), and 1 km ≈ 0.62 miles.",
      ],
    },
    {
      heading: "Why the US still uses miles",
      paragraphs: [
        "The US customary system inherited the mile from Britain (standardized at **5,280 feet** in 1593), and the country's road network, speed limits, and car culture were all built around it before metrication efforts stalled in the 1970s. Science, the military, and medicine in the US use metric — the highway signs just never changed.",
      ],
    },
  ],
  "shoe-size-converter": [
    {
      heading: "How this shoe size calculator works",
      paragraphs: [
        "Select the sizing system you already know — US men's, US women's, UK, EU, or Mondo/JP centimeters — enter your size, and this shoe size calculator converts it to every other system instantly, plus your estimated foot length.",
        "Unlike rough formula-based converters, it uses a **standard conversion chart** (the same scale major athletic brands publish), so a US men's 9 correctly gives **UK 8.5, EU 42.5, and 27 cm Mondo** — not a rounded guess.",
      ],
    },
    {
      heading: "The sizing systems, explained",
      paragraphs: [
        "**US men's** is the baseline here: each full size is 1/3 inch (8.47 mm) of foot length. **US women's** runs 1.5 sizes larger than men's for the same foot — a women's 8 fits the same foot as a men's 6.5. **UK sizes** are 0.5 below US men's (US 9 = UK 8.5). **EU sizes** are based on the Paris point (2/3 cm per size) and aren't perfectly linear against US sizes, which is why a chart beats a formula. **Mondo/JP** is simply your foot length in centimeters — the most honest system there is.",
        "Worked example: you wear **EU 44**. The calculator finds the nearest chart entry → US men's **10** → UK **9.5**, US women's **11.5**, Mondo **28 cm**, foot length **28.0 cm (11.02 in)**.",
      ],
    },
    {
      heading: "How to measure your foot (the right way)",
      paragraphs: [
        "For the best result, skip the size you 'usually wear' and measure: **1.** Place a blank paper on a hard floor. **2.** Stand on it with your full weight (feet spread slightly under load). **3.** Mark the back of the heel and the tip of your longest toe. **4.** Measure between the marks in centimeters — that's your Mondo size. **5.** Measure in the **evening**: feet swell up to half a size during the day, and shoes bought to a morning measurement feel tight by dinner.",
        "Add **0.5–1 cm** of wiggle room beyond your raw measurement for comfort — toes should never touch the front of the shoe. If your two feet differ (most people's do), fit to the larger foot.",
      ],
    },
    {
      heading: "Why the same size fits differently everywhere",
      paragraphs: [
        "Three reasons conversions are approximate: **brand lasts differ** — each manufacturer sculpts its own foot mold, so a Nike 9 and an Allen Edmonds 9 are different shapes; **width matters** — the calculator covers length, but D/Medium vs W/Wide (or E in UK) changes fit dramatically; and **EU rounding varies** — some brands label US 9 as EU 42, others 42.5.",
        "Practical rule: when buying online, **check that brand's own size chart** against your Mondo cm measurement, read reviews for 'runs small/large' notes, and when between sizes, **size up** — a slightly long shoe with an insole beats a short one that crushes your toes.",
      ],
    },
    {
      heading: "Kids' sizes and international shopping tips",
      paragraphs: [
        "Kids' sizing restarts the scale: a US kids' 4 is roughly a women's 5.5, and kids' sizes run 1–7 before 'youth' overlaps adult smalls. When ordering from **UK shops**, remember UK = US men's − 0.5 (not − 1, a common mistake). From **EU shops**, use your Mondo cm against their chart rather than converting through US sizes — fewer rounding steps, fewer surprises. From **Japanese/Korean shops**, just use your centimeter measurement directly.",
      ],
    },
  ],
  "moving-cost-calculator": [
    {
      heading: "What a move actually costs",
      paragraphs: [
        "Every professional moving quote is built from the same three parts: **labor** (the crew loading, carrying, and unloading), **transport** (the truck and the miles it drives), and **packing** (optional — the crew boxing up your belongings for you). This calculator estimates all three and adds them together, so you can see exactly where the money goes.",
        "The single biggest distinction is **local versus long-distance**. Moves under **100 miles** are treated as local: crews charge by the room with a flat transport fee, which keeps short moves relatively cheap. Cross the 100-mile line and the move is priced as long-distance — labor costs more per room, and transport scales with every mile driven, which is why a cross-country move costs several times a same-city one.",
        "The second big lever is **how much stuff you have**, measured here in rooms. Rooms drive all three cost lines at once, so the number of rooms in your current home matters more to the final price than almost anything else you can control.",
      ],
    },
    {
      heading: "How this calculator estimates your move",
      paragraphs: [
        "**Labor:** rooms × **$400** for a local move, or rooms × **$600** for a long-distance move. More rooms mean more furniture, more boxes, and more crew hours.",
        "**Transport:** a flat **$500** for local moves. For long-distance moves it is **distance × $0.50 × (rooms × 1.5)** — the per-mile cost rises with the size of the load, because a fuller truck burns more fuel and needs a bigger vehicle.",
        "**Packing:** optional professional packing at **$300 per room**. Set packing to No and this line drops to zero — you supply the boxes and do the work yourself.",
        "Add the three lines and you get the estimated total. It is a planning estimate, not a quote: real movers also weigh the truck, count stairs, and charge for extras (see below), so use the figure to budget and to compare the quotes you collect.",
      ],
    },
    {
      heading: "Worked examples",
      paragraphs: [
        "**Long-distance, 3 rooms (the page default):** moving **500 miles** with professional packing. Labor = 3 × $600 = **$1,800**. Transport = 500 × $0.50 × 4.5 = **$1,125**. Packing = 3 × $300 = **$900**. Total: **$3,825** — the same figure the calculator shows above. Pack the boxes yourself and the total falls to **$2,925**.",
        "**Local, 2 rooms:** moving **30 miles** across town and packing yourself. Labor = 2 × $400 = **$800**, transport is the flat **$500**, packing $0 — total **$1,300**. Add professional packing (2 × $300) and it becomes **$1,900**.",
        "**Cross-country, 4 rooms:** moving **1,200 miles** with professional packing. Labor = 4 × $600 = **$2,400**. Transport = 1,200 × $0.50 × 6 = **$3,600**. Packing = 4 × $300 = **$1,200**. Total: **$7,200**. Notice how transport overtakes labor once the distance gets long — on long moves, miles cost more than muscle.",
      ],
    },
    {
      heading: "Ways to bring the cost down",
      paragraphs: [
        "**Declutter before you count rooms.** Since rooms drive labor, transport, and packing at the same time, selling, donating, or dumping one room's worth of furniture before the move cuts all three lines at once. This is the highest-value thing you can do.",
        "**Pack yourself.** Professional packing costs $300 per room on this calculator — $900 on a typical 3-room home. Boxes, tape, and a weekend of work usually cost far less. A middle option many movers offer is packing only the fragile rooms (kitchen and glassware) professionally.",
        "**Be flexible on dates.** Movers are busiest at weekends and at the start and end of the month, when leases turn over. A mid-week, mid-month move is easier to book and often cheaper to quote — ask for both dates when you request prices.",
        "**Get at least three quotes.** Estimates for the same move vary widely between companies. Compare each quote against the breakdown above: if one quote's transport line is double another's for the same distance, ask why before you sign.",
      ],
    },
    {
      heading: "What this estimate does not include",
      paragraphs: [
        "Real moving bills can add line items this calculator leaves out: **stairs or elevator fees**, long carries from door to truck, **storage** if the new home is not ready, **valuation coverage** (the mover's liability protection for damaged items), tolls and parking permits, and disassembly of specialty items like pianos, pool tables, or gym equipment. Budget a cushion on top of your estimate for these.",
        "One protection worth knowing about: for **interstate moves in the US**, movers are required to give you a written estimate and the federal 'Your Rights and Responsibilities When You Move' booklet, and reputable movers will visit or video-survey your home before quoting. A company that quotes a full-house move from a two-minute phone call, sight unseen, is one to be careful with.",
      ],
    },
  ],
  "simple-interest-calculator": [
    {
      heading: "How simple interest works",
      paragraphs: [
        "Simple interest is calculated only on the original amount you put in or borrow: **Interest = Principal x Rate x Time (I = P x R x T)**. Unlike compound interest, the interest you earn never starts earning interest of its own, so growth is a straight line — the same dollar amount every year. You will meet simple interest in short-term personal loans, some car loans, certain bonds and CDs, and late-payment charges.",
        "Because time sits in the formula as a simple multiplier, doubling the term exactly doubles the interest. That makes simple interest easy to sanity-check in your head before you ever open a calculator.",
      ],
    },
    {
      heading: "Worked example: $5,000 at 5% for 3 years",
      paragraphs: [
        "Using this page's starting values — **principal $5,000, rate 5%, time 3 years** — the interest is 5,000 x 0.05 x 3 = **$750.00**. The total value at the end is $5,000 + $750 = **$5,750.00**, and spread evenly that is **$20.83 of interest per month** ($250 per year, every year).",
        "For periods shorter than a year, enter time as a fraction: 6 months is 0.5 years, so the same deposit would earn 5,000 x 0.05 x 0.5 = $125.00.",
      ],
    },
    {
      heading: "Simple vs compound interest",
      paragraphs: [
        "Run the same numbers through the Compound Interest Calculator and the difference shows up fast: $5,000 at 5% compounded yearly for 3 years grows to $5,788.13 — **$788.13 of interest instead of $750**. The gap looks small over 3 years but widens every year, because compound interest pays interest on interest.",
        "Rule of thumb: if a product quotes simple interest on a **loan**, that is usually good for you. If it quotes simple interest on your **savings**, a compounding product will almost always beat it over time.",
      ],
    },
  ],
  "quit-smoking-calculator": [
    {
      heading: "How this calculator works",
      paragraphs: [
        "Everything starts with the **cost of one cigarette**: the price of a pack divided by the cigarettes in it — usually 20. At $8 a pack, that is $0.40 per cigarette. Multiply by how many you smoked a day and you have your daily habit cost; multiply that by the days since you quit and you have the money already saved.",
        "The calculator keeps it to two honest counts — **money and cigarettes**. No health promises and no guesswork: just what the habit cost, and what quitting has returned so far.",
      ],
    },
    {
      heading: "Worked example: a pack a day at $8 a pack",
      paragraphs: [
        "With this page's starting values — **20 cigarettes a day, $8 a pack, 30 days quit** — your old habit cost **$8 a day**. One month after quitting you have saved **$240**, avoided **600 cigarettes**, and not bought **30 packs**.",
        "Leave the habit behind for a full year and the same numbers become **$56 a week, about $243 a month, $2,920 a year** — and **$29,200 over 10 years**. That is the quiet arithmetic that makes the first hard month worth pushing through: the saving never stops growing.",
      ],
    },
    {
      heading: "What different habits cost",
      paragraphs: [
        "A **half-pack-a-day** habit (10 cigarettes) at $8 a pack costs $4 a day — **$1,460 a year**. A **two-pack-a-day** habit (40 cigarettes) costs $16 a day — **$5,840 a year**, more than many car loans.",
        "Pack prices vary a lot by state and brand, so enter the price you actually paid. A useful rule from the formula: **every $1 on the pack price changes a pack-a-day habit by $365 a year** — which is why the same habit costs far more in a high-tax state.",
      ],
    },
    {
      heading: "Making the saved money visible",
      paragraphs: [
        "Money not spent has a way of disappearing into everyday spending. Two habits stop that: move the old daily amount into a savings account on a schedule, and watch this page's yearly figure grow. Our Savings Calculator shows what those deposits become.",
        "As an illustration of the stakes: saving **$2,920 a year** and investing it at a **5% average annual return** would grow to about **$36,727 in 10 years** — roughly $7,500 more than the $29,200 simply not spent. Returns are never guaranteed, but the direction is the point: quitting pays you twice.",
      ],
    },
  ],

  "cost-of-alcohol-calculator": [
    {
      heading: "How this calculator works",
      paragraphs: [
        "Your **weekly spend** is drinks per week multiplied by what one drink actually costs you. Multiply by 52 for the **yearly spend**, divide the yearly figure by 12 for a true monthly average, and extend it across the years you choose for the long-term total.",
        "The calculator also counts **drinks per year** and shows an **invested comparison** — what the same yearly amount would grow to at a 5% average annual return — because the real cost of a habit is both the money spent and the growth it never gets.",
      ],
    },
    {
      heading: "Worked example: 10 drinks a week at $6 a drink",
      paragraphs: [
        "With this page's starting values — **10 drinks a week at $6 each** — you spend **$60 a week, $260 a month, and $3,120 a year**, across **520 drinks a year**.",
        "Keep that pace for the default 10 years and the total is **$31,200**. Invested at 5% instead, the same stream of money would reach about **$39,243**. Neither figure judges the habit — they simply price it, which most people have never actually done.",
      ],
    },
    {
      heading: "What common drinking patterns cost",
      paragraphs: [
        "A light social pattern — **4 drinks a week at $6** — costs **$1,248 a year**. **One drink a day** costs **$2,184 a year** at $6 a drink, and $3,640 at a $10 bar price. **Two drinks a day** (14 a week) reaches **$4,368 a year**. A heavier pattern of **25 drinks a week at $7** costs **$9,100 a year**.",
        "The single biggest lever is the **cost per drink**: the same drinks poured at home might cost $2 each, while a bar charges $10 or more. Enter what you really pay — most people should count a mix of home and out prices.",
      ],
    },
    {
      heading: "Cutting the number, not just counting it",
      paragraphs: [
        "Every figure on this page scales in direct proportion to the drinks: **halve the drinks per week and you halve the weekly, yearly, and 10-year cost**. At the worked example's pace, a single alcohol-free month returns **$260**.",
        "If the totals surprise you, try the companion tools: the Quit Smoking Savings Calculator prices a cigarette habit the same way, and the Savings Calculator shows what redirecting even part of the yearly figure would build over time.",
      ],
    },
  ],

  "hvac-sizing-calculator": [
    {
      heading: "How HVAC sizing works",
      paragraphs: [
        "Sizing starts with **BTU** — the heating or cooling capacity a home needs. This calculator multiplies your square footage by a **BTU-per-square-foot rate for your climate: 30 in cold climates, 25 in moderate ones, and 22 in hot ones** — the cold setting weights the heating load most heavily, because a system in a cold climate works hardest in winter.",
        "Capacity is then expressed in **tons: 1 ton = 12,000 BTU per hour**. Because residential systems are sold in half-ton steps, the result is **rounded up to the nearest 0.5 ton** — the size you would actually buy.",
      ],
    },
    {
      heading: "Worked examples",
      paragraphs: [
        "A **2,000 sq ft home in a moderate climate**: 2,000 × 25 = **50,000 BTU**, which is 4.17 tons, rounded up to a **4.5-ton system** — the default result on this page.",
        "The same method at other sizes: a **1,500 sq ft home on the hot setting** needs 1,500 × 22 = **33,000 BTU → 3 tons**. A **2,500 sq ft home on the cold setting** needs 2,500 × 30 = **75,000 BTU → 6.5 tons**. Notice how much the climate setting moves the answer — square footage alone never tells the whole story.",
      ],
    },
    {
      heading: "Why the right size matters",
      paragraphs: [
        "An **oversized** system short-cycles — switching on and off in quick bursts. That wastes energy, wears components faster, raises the purchase price, and removes humidity poorly, leaving rooms feeling clammy in summer. An **undersized** system runs almost nonstop on the hottest and coldest days and may never reach the set temperature.",
        "A square-footage rule like this one is the right first estimate for budgeting and comparing quotes. Before installing, a contractor should confirm the size with a **Manual J load calculation**, which also accounts for insulation, ceiling height, window area, and sun exposure — the factors a quick calculator cannot see.",
      ],
    },
  ],

  "closing-cost-calculator": [
    {
      heading: "What closing costs are made of",
      paragraphs: [
        "Closing costs are the lender and third-party fees due when a home purchase is finalized, paid on top of your down payment. This calculator builds its estimate from four parts: **loan origination at 1% of the loan amount**, **title insurance at 0.5% of the home price**, an **escrow deposit at 1% of the home price**, and **$1,050 of fixed fees** for items like the appraisal, credit report, and recording charges.",
        "Added together, typical totals land between **2% and 5% of the home price** — the range lenders themselves quote. Your lender's official Loan Estimate, issued within three business days of applying, replaces any calculator's figures with real ones.",
      ],
    },
    {
      heading: "Worked example: a $350,000 home with a $280,000 loan",
      paragraphs: [
        "Using this page's starting values: origination is 1% of $280,000 = **$2,800**; title insurance is 0.5% of $350,000 = **$1,750**; the escrow deposit is 1% of the price = **$3,500**; plus the $1,050 of fixed fees. **Total closing costs: $9,100 — 2.6% of the home price.**",
        "That makes the full **cash to close $79,100**: the $70,000 down payment (price minus loan) plus the $9,100 of closing costs. It is the cash-to-close figure, not the down payment alone, that decides whether a buyer is truly ready — and it is the number most first-time buyers underestimate.",
      ],
    },
    {
      heading: "Ways buyers lower closing costs",
      paragraphs: [
        "The biggest lever is the lender itself: **origination charges vary widely**, so compare Loan Estimates from at least two or three lenders before committing. Ask each one which fees are negotiable or optional, and question anything that appears twice under different names.",
        "Two structural options also exist. **Lender credits** cover some costs in exchange for a slightly higher interest rate — worth modeling if cash is tight. And in many markets the seller can contribute **concessions** toward the buyer's closing costs as part of the negotiated deal. Neither is free money, but both change how much cash you need on the day.",
      ],
    },
  ],

  "insulation-calculator": [
    {
      heading: "How this calculator works",
      paragraphs: [
        "Material is estimated from coverage. **Blown-in insulation** is counted in bags at roughly **40 sq ft of coverage per bag** at R-38 depth, and **batts** in standard packages covering about **48 sq ft each**. The calculator also gives the total **volume — area × thickness ÷ 12** — which is what you need when ordering loose-fill by the cubic foot.",
        "One honest warning built into the math: **coverage per bag falls as the target R-value rises**, because a higher R-value means a thicker layer over the same area. Always read the coverage chart printed on the product you buy — it lists the exact sq ft per bag at each R-value.",
      ],
    },
    {
      heading: "Worked example: a 1,000 sq ft attic at R-38",
      paragraphs: [
        "With this page's starting values — **1,000 sq ft, target R-38, 12 inches thick** — you need **25 bags of blown-in insulation** (1,000 ÷ 40), or about **21 batt packages** (1,000 ÷ 48), totaling **1,000 cubic feet** of material.",
        "Scale it by area: a 1,500 sq ft attic at the same target needs roughly 38 bags, and a 500 sq ft space about 13. Buying a little extra — around 10% — for cuts, gaps, and settling is standard practice and far cheaper than a second trip mid-project.",
      ],
    },
    {
      heading: "Choosing a target R-value",
      paragraphs: [
        "R-value measures resistance to heat flow — **higher is better insulated**. The ranges worth aiming for: **attics R-38 to R-60, walls R-13 to R-21**, with colder climates toward the top of each range. The attic is usually the highest-value target: it is the largest heat-loss surface in most homes and the easiest to add material to.",
        "Thickness alone does not fix an R-value — each material delivers a different R per inch (fiberglass, cellulose, and foam all differ), so match the installed depth to the product's stated R-value rather than to a generic inches figure. If your home has both heating and cooling seasons, our HVAC Sizing Calculator shows how the building's load changes with climate once the envelope is improved.",
      ],
    },
  ],

  "savings-calculator": [
    {
      heading: "How the savings projection is calculated",
      paragraphs: [
        "This calculator compounds your money **monthly** and adds a deposit every month. The future value combines two engines: your starting balance growing at the monthly rate, and each monthly deposit growing for the months it has left in the account — **FV = P(1+r)^n + D x [(1+r)^n - 1] / r**, where r is the annual rate divided by 12 and n is the number of months.",
        "That second engine is why regular deposits beat occasional lump sums for most people: a deposit made in month 1 compounds 119 more times than the same deposit made in month 120.",
      ],
    },
    {
      heading: "Worked example: $5,000 plus $300 a month for 10 years",
      paragraphs: [
        "With this page's starting values — **$5,000 initial savings, $300 monthly deposit, 4.5% interest, 10 years** — you put in $5,000 + (300 x 120) = **$41,000** of your own money. Interest adds **$12,194**, for a future balance of **$53,194**.",
        "Notice the split: deposits did most of the work (77% of the final balance). Early in any savings plan, your contributions matter far more than the rate — which is good news, because the deposit is the part you control.",
      ],
    },
    {
      heading: "Making the projection realistic",
      paragraphs: [
        "The projection assumes a steady rate and no withdrawals, taxes, or fees. High-yield savings accounts currently sit near the 4.5% used above, but rates move — re-run the numbers when your account's rate changes.",
        "Sensitivity check: adding **$100 a month** to the example above (deposit $400 instead of $300) lifts the 10-year balance by about **$15,120** — $12,000 of extra deposits plus roughly $3,120 of extra interest. When in doubt, raise the deposit before chasing a higher rate.",
      ],
    },
    {
      heading: "Your first year, in numbers",
      paragraphs: [
        "Run the same starting values for just **one year** and the balance is **$8,905**: your $5,000 start plus $3,600 of deposits is **$8,600 of your own money**, and interest adds **$305**.",
        "Every savings plan looks slow in year one — that $305 is only 3.4% of the balance. Compounding is back-loaded by design: in the 10-year example above, interest contributes **$12,194**, because each year's interest itself starts earning interest. The first year is the price of admission; the later years are the payoff.",
      ],
    },
    {
      heading: "The rate matters more than it looks",
      paragraphs: [
        "Hold the plan fixed — $5,000 start, $300 a month, 10 years — and change only the rate. At **0.5%**, roughly what a basic bank savings account pays, the balance reaches **$42,164**. At **4.5%**, the high-yield rate used on this page, it reaches **$53,194**.",
        "That is an **$11,030 difference from the rate alone**, with identical deposits. Moving idle cash from a basic account to a high-yield one is the single easiest improvement most savers can make — no extra saving required.",
      ],
    },
  ],
  "house-affordability-calculator": [
    {
      heading: "The 28/36 rule behind this calculator",
      paragraphs: [
        "Lenders judge affordability with two ratios. The **front-end ratio** caps your housing payment at 28% of gross monthly income. The **back-end ratio** caps housing plus all other monthly debts at 36%. This calculator works out both caps, subtracts your existing debts from the 36% cap, and uses whichever result is **lower** as your maximum monthly payment.",
        "It then converts that payment into a loan amount with the standard amortization formula and adds your down payment to give a maximum home price.",
      ],
    },
    {
      heading: "Worked example: $85,000 income, $500 of monthly debts",
      paragraphs: [
        "Using this page's starting values — **$85,000 income, $500/month existing debts, $50,000 down payment, 6.5% rate, 30-year term**: monthly income is $7,083.33. The 28% cap allows **$1,983.33/month**; the 36% cap allows $2,550 minus $500 of debts = $2,050. The 28% rule is the binding one.",
        "A $1,983.33 payment at 6.5% over 30 years supports a loan of **$313,785**. Add the $50,000 down payment and the maximum home price is **$363,785**, with a back-end debt-to-income ratio of 35.06% at that payment.",
      ],
    },
    {
      heading: "What this estimate leaves out",
      paragraphs: [
        "The maximum payment here is **principal and interest only**. Real ownership adds property tax, homeowner's insurance, HOA dues, and — with less than 20% down — usually private mortgage insurance (PMI). Budgeting those on top typically brings the comfortable price well below the calculator's ceiling.",
        "Lenders also vary: some approve back-end ratios of 43–50% for borrowers with strong credit and reserves, and every 0.5% move in the interest rate changes the affordable loan by tens of thousands of dollars. Treat the result as a planning ceiling, not a target.",
      ],
    },
  ],
  "tdee-calculator": [
    {
      heading: "How TDEE is calculated",
      paragraphs: [
        "TDEE (Total Daily Energy Expenditure) starts from your **BMR** — the calories your body burns at complete rest — estimated here with the **Mifflin-St Jeor equation**: BMR = 10 x weight(kg) + 6.25 x height(cm) - 5 x age, plus 5 for men or minus 161 for women. That BMR is then multiplied by an activity factor: 1.2 (sedentary), 1.375 (light), 1.55 (moderate), 1.725 (heavy), or 1.9 (athlete).",
        "The multiplier covers your job, daily movement, exercise, and digestion — everything your body spends energy on across a normal day.",
      ],
    },
    {
      heading: "Worked example: a moderately active 28-year-old",
      paragraphs: [
        "Using this page's starting values — **male, 28 years, 75 kg, 175 cm, moderate activity (x1.55)**: BMR = (10 x 75) + (6.25 x 175) - (5 x 28) + 5 = 750 + 1,093.75 - 140 + 5 = **1,709 cal/day**. Multiply by 1.55 and TDEE is **2,649 cal/day**, or **18,540 cal per week**.",
        "Eating at 2,649 a day should hold this person at roughly 75 kg. Eating below it creates a deficit; above it, a surplus.",
      ],
    },
    {
      heading: "Using TDEE for weight goals",
      paragraphs: [
        "A common starting point is a **deficit of about 500 cal/day** below TDEE for steady weight loss (roughly 0.5 kg, or about 1 lb, per week) or a surplus of 250–500 cal/day for gradual muscle gain. Avoid dropping below your BMR for extended periods without medical guidance.",
        "TDEE is an estimate, not a measurement — real values vary by around 10% between individuals. Track your weight and intake for 2–3 weeks and adjust the number by 100–200 cal based on what actually happens. One common mistake: TDEE already includes exercise, so do not add workout calories on top.",
      ],
    },
  ],
  "ideal-weight-calculator": [
    {
      heading: "Four classic formulas, one useful range",
      paragraphs: [
        "This calculator runs your height through the four best-known ideal-weight formulas — **Devine (1974), Robinson (1983), Miller (1983), and Hamwi (1964)**. Each starts from a base weight at 5 ft (60 inches) and adds a fixed amount per inch above that: Devine adds 2.3 kg per inch for men, Robinson 1.9 kg, Miller 1.41 kg, and Hamwi 2.7 kg (with lower bases and increments for women).",
        "The formulas were originally developed for clinical work such as drug dosing, which is why they still anchor many medical references today.",
      ],
    },
    {
      heading: "Worked example: a man who is 175 cm tall",
      paragraphs: [
        "Using this page's starting values — **male, 175 cm**: 175 cm is 68.9 inches, so 8.9 inches over the 5 ft base. The formulas give **Devine 70.5 kg, Robinson 68.9 kg, Miller 68.7 kg, and Hamwi 72.0 kg**, for an average of **70.0 kg**.",
        "That 3.3 kg spread between the lowest and highest formula is the real lesson: even the classic references disagree, so treat ideal weight as a **range around 69–72 kg** for this height, not a single magic number.",
      ],
    },
    {
      heading: "How to use the result sensibly",
      paragraphs: [
        "Height-only formulas cannot see your frame size, muscle mass, or body composition — a rugby player and a distance runner of the same height will land in different healthy places. Cross-check with the **BMI Calculator**: for 175 cm, the healthy BMI band (18.5–24.9) spans roughly 56.7–76.3 kg, a wider and more forgiving window than any single formula.",
        "Use ideal weight as orientation for a conversation with your doctor or dietitian, not as a target to chase at all costs.",
      ],
    },
  ],
  "water-intake-calculator": [
    {
      heading: "How your daily water target is built",
      paragraphs: [
        "This calculator starts with a widely used baseline of **35 ml of water per kilogram of body weight**, then adds **350 ml for every 30 minutes of exercise**, plus a climate adjustment: **+500 ml for hot or humid conditions** and +250 ml for cold conditions, since both increase water loss in ways people underestimate.",
        "The result is shown in millilitres, litres, US cups, and ounces so it works with whatever bottle or tracker you actually use.",
      ],
    },
    {
      heading: "Worked example: 70 kg with 30 minutes of exercise",
      paragraphs: [
        "Using this page's starting values — **70 kg body weight, 30 minutes of exercise, temperate climate**: baseline is 70 x 35 = 2,450 ml, exercise adds 350 ml, and the climate adds nothing, for a total of **2,800 ml per day — 2.8 litres, about 11 cups, or 95 oz**.",
        "On a hot day the same person would be shown 3,300 ml instead — the extra 500 ml is roughly one standard water bottle.",
      ],
    },
    {
      heading: "Thirst, food, and when to ignore the target",
      paragraphs: [
        "A portion of your daily water normally arrives via food and other drinks, so the calculator's figure is a guide for total intake rather than a strict glasses-of-water quota. Pale-straw urine through the day is a practical sign you are in the right zone.",
        "Spread intake across the day instead of drinking large amounts at once, and follow medical advice over any calculator if you have kidney, heart, or fluid-restriction conditions.",
      ],
    },
  ],
  "standard-deviation-calculator": [
    {
      heading: "What standard deviation measures",
      paragraphs: [
        "Standard deviation (SD) tells you how spread out a set of numbers is around its mean. A small SD means values cluster tightly; a large SD means they scatter widely. The calculation: find the **mean**, subtract it from every value and square the result, average those squares to get the **variance**, then take the square root.",
        "This calculator uses the **population** formula (dividing by N), which is the right choice when your values are the complete set you care about — all exam scores in a class, every day of a month — rather than a sample of something bigger.",
      ],
    },
    {
      heading: "Worked example: 10, 12, 23, 23, 16",
      paragraphs: [
        "Using this page's starting values: the mean is (10 + 12 + 23 + 23 + 16) / 5 = **16.8000**. The squared differences from the mean — 46.24, 23.04, 38.44, 38.44, 0.64 — add up to 146.8, so the variance is 146.8 / 5 = **29.3600** and the standard deviation is the square root of that: **5.4185**.",
        "In plain terms, a typical value in this set sits about 5.4 points away from the mean of 16.8. The two 23s do most of the pulling — remove them and the spread collapses.",
      ],
    },
    {
      heading: "Population vs sample, and the 68% rule",
      paragraphs: [
        "If your numbers are a **sample** meant to represent a larger group, statisticians divide by N - 1 instead (the sample standard deviation). For the example above that gives the square root of (146.8 / 4) = **6.06** — noticeably larger, because it corrects for the sample underestimating the true spread.",
        "For roughly bell-shaped data, about **68% of values fall within 1 SD of the mean** and about 95% within 2 SD — a quick way to judge whether a new value is ordinary or an outlier.",
      ],
    },
  ],
  "probability-calculator": [
    {
      heading: "Combining two independent events",
      paragraphs: [
        "This calculator answers three questions about two events, A and B. **Both happen (AND):** multiply — P(A and B) = P(A) x P(B). **Either happens (OR):** add, then subtract the overlap so it is not counted twice — P(A or B) = P(A) + P(B) - P(A and B). **A does not happen:** P(not A) = 1 - P(A).",
        "These rules assume the events are **independent** — one outcome does not change the other's odds, like two separate coin flips or two dice rolled together.",
      ],
    },
    {
      heading: "Worked example: P(A) = 0.5 and P(B) = 0.3",
      paragraphs: [
        "Using this page's starting values: **P(both) = 0.5 x 0.3 = 15.00%**. **P(either) = 0.5 + 0.3 - 0.15 = 65.00%**. **P(not A) = 50.00%**.",
        "In concrete terms, imagine A = flipping heads (0.5) and B = rolling a 1 or 2 on a die (2/6 = 0.333). Heads-and-a-low-roll would be 0.5 x 0.333 = 16.7% — the multiplication rule working exactly as above.",
      ],
    },
    {
      heading: "When the simple rules break",
      paragraphs: [
        "If the events influence each other, the multiplication rule needs adjusting: drawing a second card **without replacing** the first changes the deck, so the second probability must use the new totals. And if the events are **mutually exclusive** (they cannot both happen, like rolling a 2 versus rolling a 5), then P(A or B) is simply P(A) + P(B), because the overlap is zero.",
        "Enter probabilities as decimals between 0 and 1 (50% = 0.5). A result can never exceed 100% — if it does, the events are probably not independent.",
      ],
    },
  ],
  "date-difference-calculator": [
    {
      heading: "How the difference between two dates is counted",
      paragraphs: [
        "The calculator converts both dates to timestamps and takes the **absolute difference**, so the order you enter them in never matters. It reports the gap in **days**, then re-expresses it as weeks plus leftover days, approximate months (using the average month length of 30.44 days), and hours.",
        "Following the standard convention, it counts the days **between** the dates — the end date itself is not double-counted. Jan 1 to Jan 2 is 1 day, not 2.",
      ],
    },
    {
      heading: "Worked example: Jan 1, 2024 to Jan 1, 2025",
      paragraphs: [
        "Using this page's starting dates: the gap is **366 days** — not 365 — because 2024 is a **leap year** and Feb 29 falls inside the span. That is **52 weeks and 2 days**, about **12 months**, or **8,784 hours**.",
        "Run the same one-year span from Jan 1, 2025 to Jan 1, 2026 and you get 365 days (8,760 hours). Leap years are the most common reason a familiar date range surprises people.",
      ],
    },
    {
      heading: "Everyday uses and the off-by-one trap",
      paragraphs: [
        "Date differences drive project timelines, countdowns, rental and loan periods, age in days, and deadlines like '90 days from signing'. The classic trap is **inclusive counting**: if a contract gives you 30 days starting Monday, whether day 30 is a Wednesday or Thursday depends on whether the start day counts — this calculator counts elapsed days, which matches most legal and banking conventions.",
        "For working-day counts (excluding weekends), use the Business Days Calculator instead.",
      ],
    },
  ],
  "sleep-calculator": [
    {
      heading: "Why bedtime math runs in 90-minute cycles",
      paragraphs: [
        "Sleep runs in cycles of light sleep, deep sleep, and REM (dream) sleep, each lasting **about 90 minutes**. Waking in the middle of deep sleep is what produces that groggy, heavy feeling; waking near the end of a cycle feels noticeably lighter even on the same total sleep.",
        "This calculator works backwards from your wake-up time, subtracting whole cycles **and** the time you typically need to fall asleep, to offer bedtimes that land on cycle boundaries: 6, 5, or 4 cycles.",
      ],
    },
    {
      heading: "Worked example: waking at 7:00 AM",
      paragraphs: [
        "Using this page's starting values — **wake at 7:00, 15 minutes to fall asleep**: for **6 cycles (9.0 h)** of sleep, be in bed by **21:45**. For **5 cycles (7.5 h)**, bedtime is **23:15**. For **4 cycles (6.0 h)**, it is **00:45**.",
        "The 5- and 6-cycle options bracket the 7–9 hours most adults need. The 4-cycle option is a floor for a short night, not a routine to aim for.",
      ],
    },
    {
      heading: "Using the results well",
      paragraphs: [
        "Consistency beats perfection: a regular wake time anchors your cycle timing better than chasing one ideal bedtime. If you regularly need far more than 20–30 minutes to fall asleep, earlier screens-off time and a cooler, darker room usually help more than moving the bedtime.",
        "Cycle length is an average — individuals vary roughly between 80 and 120 minutes — so treat the suggested times as a starting window and adjust by 10–15 minutes based on how you actually wake up.",
      ],
    },
  ],
  "love-calculator": [
    {
      heading: "How this score is generated — honestly",
      paragraphs: [
        "No mystery and no psychology: this is a **just-for-fun game**. The score is produced by a fixed arithmetic recipe using only the **number of letters in each name**. The same two name lengths always produce the same score, whoever the names belong to — that is the tell that it is a novelty, not a measurement of anyone's relationship.",
        "It cannot see how two people treat each other, communicate, or show up on a bad day — the things that actually decide compatibility.",
      ],
    },
    {
      heading: "Worked example: Alex and Jordan",
      paragraphs: [
        "Try **Alex (4 letters)** and **Jordan (6 letters)**: the recipe returns **84%** — the 'Amazing chemistry!' band. The page's starting values, two names of 5 and 7 letters, return **16%**. Same effort, wildly different verdicts — because the verdict is about spelling length, not about the people.",
        "Swap in different names with the **same letter counts** and you will get identical scores, every time. That is by design.",
      ],
    },
    {
      heading: "What actually predicts a good match",
      paragraphs: [
        "Decades of relationship research point to unglamorous factors: how a couple handles conflict, whether both feel heard, shared values and goals, and plain kindness under stress. None of them fit in a name — and, as this page's own FAQ puts it, a low score means nothing and a high score guarantees nothing.",
        "Enjoy the number as an icebreaker, and judge the real thing by real life.",
      ],
    },
  ],
  "ohms-law-calculator": [
    {
      heading: "Ohm's law and the power rule",
      paragraphs: [
        "Ohm's law links the three core quantities of a simple circuit: **V = I x R** — voltage (volts) equals current (amps) times resistance (ohms). Add the power rule **P = V x I** and you can derive the fourth quantity, power in watts. This calculator takes voltage and resistance and returns **current, power, and current in milliamps**.",
        "The triangle mnemonic helps: cover the value you want, and the remaining two show you the operation — cover I and you see V over R; cover R and you see V over I.",
      ],
    },
    {
      heading: "Worked example: 12 volts across 4 ohms",
      paragraphs: [
        "Using this page's starting values — **voltage 12 V, resistance 4 ohms**: current = 12 / 4 = **3.0000 A** (that is **3,000.00 mA**), and power = 12 x 3 = **36.00 W**.",
        "That is a typical 12 V automotive-style circuit. It also tells you the fuse story: a circuit drawing 3 A needs a fuse rated comfortably above 3 A — and wiring and components rated for at least 36 W of heat.",
      ],
    },
    {
      heading: "Why the power number deserves respect",
      paragraphs: [
        "Power is the heat your components must shed. Doubling the voltage on a fixed resistance **doubles the current and quadruples the power**: at 24 V across the same 4 ohms, current is 6 A and power jumps to 144 W. A common quarter-watt resistor in a 36 W role does not get warm — it fails.",
        "Resistance can never be zero in this calculation: a zero-resistance path is a short circuit, where current is limited only by the power source itself.",
      ],
    },
  ],
  "force-calculator": [
    {
      heading: "Newton's second law: F = m x a",
      paragraphs: [
        "Force is what it takes to change an object's motion, and Newton's second law sizes it exactly: **Force (N) = mass (kg) x acceleration (m/s squared)**. One newton is the force needed to accelerate a 1 kg mass by 1 m/s every second. This calculator also shows the object's **weight** — the gravitational force on it at Earth's surface gravity — for comparison.",
        "Keep the vocabulary straight: mass (kg) is how much matter an object has and never changes; weight (N) is a force and depends on gravity.",
      ],
    },
    {
      heading: "Worked example: a 10 kg mass at 9.81 m/s squared",
      paragraphs: [
        "Using this page's starting values — **mass 10 kg, acceleration 9.81 m/s squared**: F = 10 x 9.81 = **98.10 N**. Because the acceleration entered is exactly Earth's g, the force equals the mass's weight: also **98.10 N**.",
        "For a feel of the unit: a 1 kg bag of sugar weighs about **9.81 N** on Earth — call it roughly 10 N. Our 10 kg mass presses down with the force of ten such bags.",
      ],
    },
    {
      heading: "Same mass, different worlds",
      paragraphs: [
        "Take the 10 kg mass to the Moon (g = 1.62 m/s squared) and its weight drops to **16.2 N**, while its mass stays exactly 10 kg — which is why astronauts can bounce in heavy suits there but would still struggle to stop a rolling 10 kg equipment case: stopping it takes the same force, because inertia depends on mass, not weight.",
        "Net force is what matters: if forces balance (pushes cancel out), acceleration is zero no matter how large the individual forces are.",
      ],
    },
  ],
  "pet-age-calculator": [
    {
      heading: "Why the 'multiply by 7' rule fails pets",
      paragraphs: [
        "Pets mature far faster than humans in their first two years, then settle into a steadier pace. This calculator's model: **year 1 counts as about 15 human years, year 2 brings the total to 24**, and each year after that adds a rate that depends on what you have — **4 per year for small dogs, 5 for medium dogs, 6 for large dogs, and 4 for cats**.",
        "That is why a single combined page like this one asks for pet type first: the same birthday means very different life stages for a Chihuahua and a Great Dane.",
      ],
    },
    {
      heading: "Worked example: three different 5-year-olds",
      paragraphs: [
        "Using this page's starting age of **5 years**: a **small dog** converts to 24 + (3 x 4) = **36 human years** (Adult). A **medium dog** converts to 24 + (3 x 5) = **39**. A **cat** converts to 24 + (3 x 4) = **36 human years**.",
        "The size gap widens with age: by 12 years, a small dog is at 64 human-equivalent years while a large dog is at 84 — a two-decade difference from the same birth date.",
      ],
    },
    {
      heading: "Getting a more specific answer",
      paragraphs: [
        "For dogs, the **Dog Age Calculator** goes deeper, with four size classes including giant breeds and full life-stage detail. For cats, the **Cat Age Calculator** adds cat-specific stages from Kitten to Geriatric. Use this page for a quick combined estimate, and the species pages when the details matter — senior care, diet changes, and vet schedules are all timed by life stage, not birthdays.",
      ],
    },
  ],
  "dog-age-calculator": [
    {
      heading: "The dog-age model this calculator uses",
      paragraphs: [
        "A dog's first year is worth about **15 human years** and the second adds **9 more (24 total)** — dogs are effectively young adults by age two. After that, each year adds an amount set by **size class: 4 for small dogs, 5 for medium, 6 for large, and 7 for giant breeds**. Size, not just age, is the driver: big dogs simply age faster.",
        "The old 'one dog year equals seven human years' rule survives because it is easy, not because it is right — it badly underestimates young dogs and overestimates old small ones.",
      ],
    },
    {
      heading: "Worked example: a 6-year-old medium dog",
      paragraphs: [
        "Using this page's starting values — **medium size (20–50 lbs), age 6**: 24 + (4 x 5) = **44 human years**, squarely Adult. The same 6-year-old as a **small dog** would be 24 + (4 x 4) = **40**, and as a **giant breed** 24 + (4 x 7) = **52**.",
        "Project to age 12 and the spread becomes dramatic: small 64, medium 74, large 84, giant **94 human-equivalent years**.",
      ],
    },
    {
      heading: "Planning care around life stage",
      paragraphs: [
        "Life stage, not the calendar, should time senior diets, joint care, and twice-yearly vet checks. On this calculator's stages, a giant breed crosses into Senior at roughly **age 6–7** (55+ human-equivalent years), while a small breed typically does not reach that stage until **around age 10**.",
        "That matches real lifespans: small breeds commonly live 12–16 years, giant breeds often just 7–10. Knowing which curve your dog is on is the difference between catching age-related problems early and being surprised by them.",
      ],
    },
  ],
  "cat-age-calculator": [
    {
      heading: "How cat years convert to human years",
      paragraphs: [
        "Cats sprint through their early life: **the first year equals about 15 human years, the second brings the total to 24**, and from then on each cat year adds a steady **4 human years**. Unlike dogs, there is no size multiplier — a Maine Coon and a Siamese follow the same curve.",
        "This page also maps the result to a life stage, from **Kitten** through Young Adult and Prime to **Senior** and **Geriatric**, which is how vets actually frame care decisions.",
      ],
    },
    {
      heading: "Worked example: a 5-year-old cat",
      paragraphs: [
        "Using this page's starting age of **5 years**: 24 + (3 x 4) = **36 human years** — a cat in its **Prime**. Extend the same math and a **10-year-old cat** is 24 + (8 x 4) = **56 human years**, just into Senior, while a **15-year-old** reaches 24 + (13 x 4) = **76 human years**, Geriatric.",
        "That middle stretch is long: cats spend roughly ages 3–9 in their prime, which is why a healthy adult cat can seem unchanged for years and then age quickly at the end.",
      ],
    },
    {
      heading: "Lifespan and vet timing",
      paragraphs: [
        "Indoor cats commonly live **12–18 years** (into their 80s and 90s in human terms); outdoor cats average far less, mainly due to accidents and disease rather than faster aging — the conversion curve is the same either way.",
        "Because the Senior stage starts around age 10, many vets suggest **twice-yearly check-ups from then on**, when kidney, thyroid, and dental issues typically emerge. Catching them at 56 human-equivalent years is a lot easier than at 76.",
      ],
    },
  ],

  "hourly-to-salary-calculator": [
    {
      heading: "How hourly pay converts to an annual salary",
      paragraphs: [
        "The conversion is simple multiplication: **Annual salary = Hourly rate × Hours per week × Work weeks per year**. A standard full-time year is 2,080 hours (40 hours × 52 weeks), but most people take time off — this calculator subtracts your weeks of vacation and holidays first, so the figure reflects the hours you actually get paid for.",
        "The result is **gross pay**: the amount before federal and state income tax, Social Security, and Medicare are withheld. Your take-home pay will be lower, typically by 20–30% depending on your tax situation. The calculator also breaks the annual figure into monthly, biweekly, and weekly pay so you can compare it directly with a salaried offer or your current budget.",
        "Note that this tool does not add overtime pay — if you regularly work more than 40 hours a week at time-and-a-half, your real earnings will be higher. Use the overtime pay calculator alongside this one to capture that.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take **$25 per hour, 40 hours a week, with 2 weeks off**. Work weeks = 52 − 2 = 50. Annual salary = $25 × 40 × 50 = **$50,000**. That breaks down to **$4,166.67 a month**, **$2,000 every two weeks**, and **$1,000 a week**.",
        "Time off matters more than people expect: the same $25 an hour with no weeks off is $25 × 40 × 52 = **$52,000** — a $2,000 difference for two weeks. And every $1 an hour is worth about $2,000 a year at 40 hours a week: at $20 an hour you'd earn $40,000, so moving from $20 to $25 an hour is a **$10,000 annual raise**.",
      ],
    },
    {
      heading: "Comparing an hourly job with a salaried offer",
      paragraphs: [
        "Never compare the headline numbers alone. A $50,000 salary with health insurance, a 401(k) match, and paid time off is worth more than $25 an hour with no benefits — employer benefits commonly add 20–30% on top of base pay. Ask what the total compensation package is worth before deciding.",
        "Also check whether the hourly role guarantees your hours. A $30-an-hour job at 30 hours a week ($45,000 a year with 2 weeks off) pays less than $25 an hour at a guaranteed 40 hours ($50,000). Hours and consistency are part of the wage.",
        "Use this calculator to test the offer in front of you: plug in the rate, your realistic weekly hours, and your actual time off. The annual figure it gives you is the number to compare — apples to apples — against any salary.",
      ],
    },
  ],

  "cash-back-vs-low-interest-calculator": [
    {
      heading: "How the cash-back vs low-APR comparison works",
      paragraphs: [
        "Car dealers often offer a choice: take a **cash-back rebate** and finance at a normal rate, or give up the rebate and finance at a **promotional low APR**. You can't have both, so the only fair comparison is total cost — and that is exactly what this calculator does.",
        "It builds two amortized loans with the standard payment formula, **M = P × r(1+r)ⁿ / ((1+r)ⁿ − 1)**. Offer A finances (Price − Rebate) at the higher rate; Offer B finances the full price at the low APR. Each monthly payment is multiplied by the term, and the cheaper total wins. Monthly payment alone can mislead you — the deal with the lower payment is not always the cheaper deal overall.",
        "The winner depends on three things: the size of the rebate, the gap between the two rates, and — most importantly — the **loan term**. A rebate is a fixed saving, while a lower rate saves more the longer you borrow, so the same two offers can flip winners when the term changes.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **$30,000 car** with a **$2,000 rebate at 7%** versus **2.9% APR with no rebate**, both over **60 months**. Offer A finances $28,000 at 7%: $554.43 a month, **$33,266 total**. Offer B finances $30,000 at 2.9%: $537.73 a month, **$32,264 total**. The low APR wins by **$1,002**.",
        "Now shorten the term to **36 months** and the winner flips. Offer A: $864.56 a month, **$31,124 total**. Offer B: $871.11 a month, **$31,360 total**. The cash back wins by **$236**. Over a short loan the rebate matters more; over a long loan the rate matters more. That is why guessing is unreliable — run your exact numbers.",
      ],
    },
    {
      heading: "Tips for getting the genuinely cheaper deal",
      paragraphs: [
        "**Negotiate the price first.** The rebate comes from the manufacturer, so a lower negotiated price stacks on top of it. A $1,000 price cut saves you $1,000 under either offer — don't let the financing choice distract from the price.",
        "**A 0% APR offer usually wins outright.** On the same $30,000 car over 60 months, 0% financing costs exactly $30,000 total — $3,266 less than the $2,000 rebate at 7%. The exception is a very large rebate on a short loan, which is worth checking with this calculator before you sign.",
        "**Watch the term the dealer suggests.** Stretching a loan to 72 or 84 months lowers the monthly payment but grows the total interest — and it makes the low-APR offer look better than it is relative to the rebate. Compare both offers at the *same* term, and choose the shortest term whose payment you can comfortably afford.",
      ],
    },
  ],

  "roi-calculator": [
    {
      heading: "How ROI is calculated",
      paragraphs: [
        "Return on investment measures profit relative to cost: **ROI = [(Final value − Initial cost) ÷ Initial cost] × 100**. If you invest $10,000 and end up with $15,000, your gain is $5,000 and your ROI is 50%. Simple, but it has a blind spot — it says nothing about how long the money was tied up.",
        "That is why this calculator also shows the **annualized return**, which spreads the gain evenly across each year using compounding: **Annualized = (Final ÷ Initial)^(1 ÷ years) − 1**. Two investments can have the same 50% ROI, but the one that delivered it in 3 years performed far better than the one that took 10. Annualized return is the number that lets you compare investments with different durations fairly.",
        "ROI works for almost anything with a cost and a payoff: stocks, a rental property, a business, a marketing campaign, or a course that leads to a raise. Just be sure the 'amount returned' includes everything you got back — sale price plus any income along the way, such as dividends or rent.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Invest **$10,000** and sell three years later for **$15,000**. Net profit = $15,000 − $10,000 = **$5,000**, or about **$1,666.67 per year**. ROI = $5,000 ÷ $10,000 × 100 = **50%**.",
        "The annualized return is (15,000 ÷ 10,000)^(1÷3) − 1 = **14.47% per year**. Now imagine the same $5,000 gain took five years instead: ROI is still 50%, but the annualized return falls to **8.45%**. Same profit, very different performance — which is exactly why the calculator shows both figures.",
      ],
    },
    {
      heading: "What ROI doesn't tell you",
      paragraphs: [
        "**Risk is invisible in ROI.** A 50% return from a volatile crypto trade and a 50% return from a diversified index fund look identical here, but one could just as easily have lost 50%. Always weigh the return against what you stood to lose.",
        "**Taxes and fees are not included.** Capital gains tax, trading commissions, and fund expenses all reduce the return you actually keep. If you paid $500 in fees on that $10,000 investment, your real gain is $4,500, not $5,000 — an ROI of 45%, not 50%.",
        "**Timing of cash flows is ignored.** ROI treats a lump sum invested on day one the same as money dripped in over years. For investments with ongoing deposits or withdrawals, an internal rate of return (IRR) calculation gives a truer picture. Use ROI as a quick comparison tool, not the final word.",
      ],
    },
  ],

  "credit-card-payment-calculator": [
    {
      heading: "How your payoff time is calculated",
      paragraphs: [
        "Credit card interest compounds monthly. Your monthly rate is the APR divided by 12 — so a 22% APR means **1.833% per month** on your balance. Each month, interest is charged on what you owe, your payment covers that interest first, and only the remainder reduces the balance.",
        "The calculator solves for the number of months with the formula **n = −ln(1 − B×r÷P) ÷ ln(1 + r)**, where B is the balance, r is the monthly rate, and P is your monthly payment. One hard rule falls out of the math: **if your payment doesn't exceed the monthly interest charge, the balance never shrinks** — the card is never paid off, no matter how long you pay.",
        "The figures assume you make the same payment every month and **add no new charges** to the card. In real life, new spending resets the clock, which is why the fastest payoff plans pair a fixed payment with a freeze on new card purchases.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **$5,000 balance at 22% APR** with a **$150 monthly payment**. The first month's interest is $5,000 × 0.22 ÷ 12 = **$91.67** — so only **$58.33** of your $150 actually reduces the balance. The calculator shows **52 months (4.3 years)** to pay it off, with **$2,800 in interest** on top of the $5,000 borrowed: $7,800 total.",
        "Raise the payment to **$200 a month** and the picture changes sharply: **34 months**, **$1,800 in interest**. That extra $50 a month saves **$1,000 in interest and 18 months** of payments. Go the other way — just $100 a month — and it takes **137 months (over 11 years)** and costs **$8,700 in interest**, more than the original balance.",
      ],
    },
    {
      heading: "How to pay off a card faster",
      paragraphs: [
        "**Pay more than the minimum.** Minimum payments are designed to stretch the debt out — often to 2–3% of the balance — which keeps you paying interest for years. Even $25 extra a month shortens the timeline noticeably, as the example above shows.",
        "**Attack the highest APR first.** If you carry balances on several cards, pay minimums on all of them and throw every spare dollar at the highest-rate card (the avalanche method). It saves the most interest of any payoff order.",
        "**Consider a 0% balance transfer** if your credit qualifies. Moving a balance to a 0% APR card for 12–18 months means every dollar of your payment attacks the principal — but watch the transfer fee (typically 3–5%) and have a plan to clear the balance before the promotional rate ends.",
      ],
    },
  ],

  "debt-payoff-calculator": [
    {
      heading: "How the payoff plan is calculated",
      paragraphs: [
        "This calculator treats your total debt as a single balance at one average interest rate, then solves for the payoff time with the formula **Months = −ln(1 − D×r÷P) ÷ ln(1 + r)**, where D is the total debt, r is the monthly rate (annual rate ÷ 12), and P is your monthly payment. It runs the calculation twice — once with your current payment and once with your extra payment added — so you can see exactly what the extra money buys you.",
        "The key insight is that **interest is charged on the remaining balance**, so every extra dollar of principal you pay this month shrinks next month's interest charge. That is why extra payments punch above their weight: a $100 monthly top-up doesn't just save $100 a month off the debt, it also cuts the interest on every month that follows.",
        "Because the tool uses one average rate, it is an estimate when your debts have very different rates — a 24% card and a 6% loan averaged to 15% won't behave exactly like the real mix. For a precise multi-debt plan, work out each debt's payoff separately, or use the average as a starting point and refine from there.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take **$25,000 of debt at a 15% average rate** with a **$500 monthly payment**. In the first month, interest alone is $25,000 × 0.15 ÷ 12 = **$312.50** — nearly two-thirds of the payment. At $500 a month, payoff takes **79 months (6.6 years)**, with **$14,500 in interest**: $39,500 total.",
        "Add an **extra $100 a month** ($600 total) and the loan clears in **60 months (5 years)** with **$11,000 in interest**. That $100 a month saves **19 months and $3,500 in interest**. The total extra cash you put in is $6,000 over five years, and it buys you $3,500 back in avoided interest plus a year and seven months of freedom.",
      ],
    },
    {
      heading: "Building a payoff plan that sticks",
      paragraphs: [
        "**Choose your method and commit to it.** The avalanche method (highest rate first) saves the most money; the snowball method (smallest balance first) gives quick wins that keep motivation up. The best method is the one you will actually follow for years — both beat drifting along on minimum payments.",
        "**Keep a small emergency fund first.** A $1,000 starter cushion stops the next car repair or medical bill from going straight back onto a card and undoing months of progress. Once the high-interest debt is gone, build the fund up to 3–6 months of expenses.",
        "**Automate the extra payment.** Set the higher payment to leave your account on payday, before you can spend it. And keep the rate in view: if any debt charges more than about 7–8%, paying it down usually beats investing the same money, because paying off a 15% debt is a guaranteed 15% return.",
      ],
    },
  ],

  "apr-calculator": [
    {
      heading: "APR vs interest rate — and how this calculator estimates it",
      paragraphs: [
        "The **interest rate** is the cost of borrowing the principal alone. The **APR (Annual Percentage Rate)** is meant to capture the *total* cost of borrowing, including fees such as origination charges, rolled into one annual figure. That is why two loans with the same interest rate can have different APRs — the one with bigger fees has the higher APR.",
        "This calculator estimates APR with a simplified formula: **APR ≈ (Total interest + Fees) ÷ Principal ÷ Years × 100**. It first works out your monthly payment from the standard amortization formula, totals the interest over the full term, adds your fees, and spreads that total cost across the loan amount and the years. It is a useful way to compare loans side by side — but it is an estimate, not the lender's official figure.",
        "One quirk to understand: because this simplified estimate spreads the interest across the *original* principal for the whole term — while on a real amortizing loan the balance shrinks each month — the estimate can come out **below the stated interest rate**. The APR on your loan disclosure, calculated by the lender from the actual payment schedule, will be higher. Use this tool to compare loans; rely on the lender's disclosed APR as the authoritative number.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Borrow **$20,000 at 5% for 60 months** with **$500 in fees**. The amortization formula gives a monthly payment of **$377.42**. Over five years you pay **$2,645.48 in interest**, so the true cost of borrowing is $2,645.48 + $500 = **$3,145.48**.",
        "The calculator's simplified APR estimate is ($2,645.48 + $500) ÷ $20,000 ÷ 5 years × 100 = **3.15%**. Raise the fees to $1,500 and the estimate rises to **4.15%** — same loan, same rate, but the fees add a full percentage point to the effective cost. That is the comparison APR exists to reveal: fees are real money, and a 'low rate' with heavy fees can cost more than a slightly higher rate with none.",
      ],
    },
    {
      heading: "How to use APR when choosing a loan",
      paragraphs: [
        "**Compare APRs only across the same term.** A 30-year loan will almost always show a lower APR than a 15-year loan, yet cost far more in total interest. Match the term first, then compare the APR.",
        "**Ask what the fees cover.** Origination fees, application fees, and closing costs all feed into APR, but some lenders quote a low APR while charging fees separately. Get the full fee schedule in writing before you decide.",
        "**Remember APR assumes you keep the loan to term.** If you expect to refinance or repay early, a loan with low upfront fees and a slightly higher rate may beat a low-APR loan loaded with fees you pay on day one. Run both scenarios here with your real numbers before signing.",
      ],
    },
  ],

  "future-value-calculator": [
    {
      heading: "How future value works",
      paragraphs: [
        "Future value answers a simple question: what will a lump sum be worth later if it grows at a steady rate? The formula is **FV = PV × (1 + r)ⁿ**, where PV is the amount you have today, r is the annual return, and n is the number of years. The growth compounds — each year's gains earn gains of their own in the years after, which is why the curve bends upward over time.",
        "This calculator compounds **annually** and assumes a single lump sum with no further deposits. That makes it ideal for questions like 'what will this $50,000 inheritance be worth in 15 years?' If you plan to add money every month, use the savings calculator instead — regular contributions change the picture considerably.",
        "A quick mental check is the **Rule of 72**: divide 72 by your annual return to estimate how many years it takes your money to double. At 7%, that is 72 ÷ 7 ≈ **10.3 years**. Any result from this calculator should roughly agree with that rule — a useful sanity check.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Invest **$50,000 at 7% a year for 15 years**. FV = $50,000 × (1.07)^15 = **$137,951.58**. Your total growth is **$87,951.58** — the money has multiplied by **2.76×**, and the growth alone is now larger than the original investment.",
        "Time is the most powerful input. Leave the same $50,000 invested for **30 years** at 7% and it becomes **$380,612.75** — the second 15 years add $242,661, nearly three times what the first 15 years added. That accelerating curve is compound growth, and it is why starting early usually beats saving more later.",
      ],
    },
    {
      heading: "Reality checks before you trust the number",
      paragraphs: [
        "**Returns are not constant.** The formula assumes the same return every year, but real investments fluctuate — a portfolio averaging 7% might gain 20% one year and lose 12% the next. The future value is a projection, not a promise.",
        "**Inflation eats into the result.** At 3% annual inflation, the real return on a 7% investment is roughly 4%, and $50,000 would be worth about **$90,047 in today's purchasing power** after 15 years — still nearly double, but well below the $137,952 nominal figure. Always ask whether a projection is nominal or inflation-adjusted.",
        "**Taxes take a share too.** Growth in a taxable account is taxed as it is realized, while a 401(k) or IRA shelters it until withdrawal (or, for a Roth, taxes it never). Where you invest matters almost as much as how much you invest.",
      ],
    },
  ],

  "student-loan-calculator": [
    {
      heading: "How student loan payments are calculated",
      paragraphs: [
        "Most student loans are amortizing loans with fixed monthly payments, calculated with the standard formula **M = P × r(1+r)ⁿ / ((1+r)ⁿ − 1)**, where P is the balance, r is the monthly interest rate (annual rate ÷ 12), and n is the number of payments. The federal standard repayment plan uses a 10-year term, which is this calculator's default.",
        "As with any amortizing loan, your early payments are mostly interest: interest is charged on the remaining balance, so the principal shrinks slowly at first and faster later. That structure is what makes the **term** so powerful — stretching the loan lowers the monthly payment but greatly increases the total interest, because you pay interest on a large balance for many more years.",
        "This calculator covers the standard fixed-payment case for federal and private loans alike. Income-driven repayment plans, which cap payments as a percentage of your income, work differently and are covered in the FAQs below.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Borrow **$35,000 at 5.5% over 10 years (120 payments)**. The monthly rate is 0.055 ÷ 12 = 0.004583, and the formula gives a monthly payment of **$379.84**. Over the life of the loan you pay **$10,581.04 in interest**, for a total repayment of **$45,581.04**.",
        "Look at the first payment: interest = $35,000 × 0.004583 = **$160.42**, so only **$219.42** reduces the balance. Now stretch the same loan to **20 years**: the payment drops to **$240.76**, but total interest jumps to **$22,782.53** — an extra **$12,201.50** for the lower payment. The 10-year plan costs $139 more a month but saves over $12,000.",
      ],
    },
    {
      heading: "Ways to pay less over the life of the loan",
      paragraphs: [
        "**Pay a little extra each month.** Adding $100 to the $379.84 payment above — $479.84 a month — clears the loan in **89 months instead of 120** and cuts total interest to $7,700.56, saving **$2,880.48**. Ask your servicer to apply extra payments to principal, not to future payments.",
        "**Refinancing can help — with a trade-off.** A lower rate from a private lender reduces your payment and total interest, but refinancing a federal loan means giving up income-driven repayment, deferment options, and loan forgiveness programs. Refinance only if you are confident you won't need those protections.",
        "**Check forgiveness and repayment programs.** Public Service Loan Forgiveness (PSLF) forgives the remaining federal balance after 120 qualifying payments in public service, and income-driven plans forgive what remains after 20–25 years. If either applies to you, the cheapest strategy may be to pay the minimum and let forgiveness do the rest — the opposite of the usual advice.",
      ],
    },
  ],

  "rent-vs-buy-calculator": [
    {
      heading: "How the rent vs buy comparison works",
      paragraphs: [
        "This calculator runs two scenarios side by side over the same number of years. On the buying side it takes your home price and down payment, finances the rest with a **30-year mortgage**, and totals your mortgage payments over the period. On the renting side it totals your rent, growing it each year by the annual rent increase you enter. It also projects the home's future value using your appreciation rate: **Future value = Price × (1 + appreciation)^years**.",
        "There is no universal winner — the answer depends on your inputs, and especially on **how long you stay**. Buying has large upfront costs (the down payment, plus closing costs) and builds equity slowly at first, while renting starts cheap but its cost rises every year. The longer the horizon, the more the balance usually tips toward buying — but only if home values actually rise.",
        "Be aware of what this comparison does **not** include: property tax, homeowner's insurance, maintenance (often 1–2% of the home's value per year), HOA fees, closing costs, the opportunity cost of tying up your down payment, and any tax benefits of mortgage interest. Treat the result as a starting comparison, then adjust for those costs before deciding.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **$400,000 home** with a **20% down payment ($80,000)**, a **$320,000 mortgage at 6.5%** for 30 years, and **rent of $2,000 a month** rising 3% a year, with home values also appreciating 3% a year. The monthly mortgage payment is **$2,022.62** — already slightly above the starting rent.",
        "Over **10 years**, total mortgage payments come to **$242,714**, while total rent — rising to $2,610 a month by year 10 — comes to **$275,133**. The home would be worth **$537,567**, a gain of **$137,567**. On these numbers, buying looks better over a decade.",
        "But shorten the horizon to **5 years** and the gap nearly vanishes: mortgage payments **$121,357** versus rent **$127,419**, with the home worth **$463,710**. Once you subtract closing costs and the cost of selling, five years may not be enough for buying to win. Same house, same rates — a different answer, decided by how long you stay.",
      ],
    },
    {
      heading: "How to decide for your situation",
      paragraphs: [
        "**Start with your time horizon.** The common rule of thumb is that buying makes sense if you will stay at least five years — and the example above shows why. If your job or life could move you in two or three years, renting's flexibility is usually worth more than the equity you'd build.",
        "**Stress-test the assumptions.** The comparison swings on appreciation and rent growth, neither of which is guaranteed. Run the numbers again with 0% appreciation and flat rent: if buying still wins, it is a robust choice; if it only wins when prices rise 3% a year, you are betting on the market.",
        "**Count the costs the tool leaves out.** Add property tax, insurance, and maintenance to the buying side, and remember the $80,000 down payment could otherwise be invested. If buying still comes out ahead after those adjustments — and you plan to stay — it is a strong case. If not, renting while investing the difference is a perfectly sound plan.",
      ],
    },
  ],

  "macro-calculator": [
    {
      heading: "How macros turn calories into grams",
      paragraphs: [
        "Every calorie you eat comes from one of three macronutrients — **protein, carbohydrate, or fat** — and each carries a fixed amount of energy: protein and carbs supply **4 calories per gram**, fat supplies **9 calories per gram**. A macro split is simply the share of your daily calories assigned to each, so once you know your calorie target and your split, the grams follow directly.",
        "This calculator offers four splits. **Balanced (40/30/30)** means 40% of calories from carbs, 30% from protein, 30% from fat. **Low Carb (25/40/35)** shifts calories toward protein and fat. **High Protein (30/40/30)** keeps carbs moderate while raising protein. **Keto (5/30/65)** keeps carbs very low and makes fat the main fuel source. The formula for each is the same: **grams = (calories × share) ÷ calories per gram**.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take **2,000 calories** on the **Balanced** split. Carbs: 2,000 × 40% ÷ 4 = **200g**. Protein: 2,000 × 30% ÷ 4 = **150g**. Fat: 2,000 × 30% ÷ 9 = **67g** (rounded from 66.7g). Check the total: 200 × 4 + 150 × 4 + 67 × 9 = 800 + 600 + 603 = **2,003 calories** — the extra 3 calories are just rounding on the fat grams.",
        "Switch the same 2,000 calories to **Keto (5/30/65)** and the picture changes completely: carbs drop to **25g**, protein stays at **150g**, and fat rises to **144g** (2,000 × 65% ÷ 9 = 144.4g). Same calories, very different plate — which is why the split matters as much as the total.",
      ],
    },
    {
      heading: "Picking a split that actually sticks",
      paragraphs: [
        "The best split is the one you can follow for months, not the one that looks optimal on paper. Higher protein (30–40% of calories) generally helps with **satiety and muscle retention** during weight loss, which is why the Low Carb and High Protein options both set protein at 40%. Very low-carb approaches like Keto work for some people but make social eating and high-intensity training harder.",
        "Two practical rules: **hit protein first** — it is the macro most people under-eat — and **don't chase exact grams daily**. Landing within about 10g of each target is close enough; weekly consistency beats daily precision. If you have a medical condition such as kidney disease or diabetes, check your targets with a clinician or dietitian before changing your diet.",
      ],
    },
  ],

  "protein-intake-calculator": [
    {
      heading: "Why protein is calculated per kilogram of body weight",
      paragraphs: [
        "Protein needs scale with body size, so recommendations are given as **grams per kilogram of body weight per day** rather than a single fixed number. The widely used reference intake for a sedentary adult is **0.8 g/kg/day** — the RDA set by the US National Academies — while active people and athletes generally need more to support training and recovery.",
        "This calculator multiplies your weight by an **activity factor**: 0.8 g/kg for sedentary, 1.2 for lightly active, 1.6 for moderately active, 2.0 for very active or athletes, and 2.2 for bodybuilders. The formula is simply **protein (g) = weight (kg) × factor**. It also splits the total across 3 or 5 meals and converts it to calories (protein has 4 calories per gram).",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A **70 kg** person who is moderately active: 70 × 1.6 = **112g of protein per day**. Spread over 3 meals, that is **37g per meal** (112 ÷ 3 = 37.3g); over 5 meals, **22g per meal** (112 ÷ 5 = 22.4g). In calories, 112g × 4 = **448 calories** from protein.",
        "Compare the extremes: the same 70 kg person at the sedentary factor needs only 70 × 0.8 = **56g**, while an 80 kg athlete at 2.0 g/kg needs 80 × 2.0 = **160g** — nearly three times as much. Activity level changes the answer far more than small differences in body weight.",
      ],
    },
    {
      heading: "Hitting your number without overthinking it",
      paragraphs: [
        "Spreading protein **evenly across meals** works better than loading it all into dinner — each meal of roughly 20–40g gives your body a steady supply for muscle maintenance. Good everyday sources include eggs, chicken, fish, Greek yoghurt, lentils, and beans; a palm-sized portion of meat or fish is roughly 20–30g of protein.",
        "For most healthy adults, intakes up to **2.2 g/kg** are considered safe, but more is not always better — protein beyond what your body can use is simply burned as energy. People with kidney conditions should get personalised advice before raising protein intake, since the standard ranges assume healthy kidney function.",
      ],
    },
  ],

  "calories-burned-calculator": [
    {
      heading: "How METs turn activity into calories",
      paragraphs: [
        "Exercise scientists measure activity intensity in **METs — Metabolic Equivalents of Task**. One MET is your resting energy use; an activity rated at 7 METs burns roughly seven times as much energy as sitting still. This calculator uses the standard formula **calories = MET × weight (kg) × 3.5 ÷ 200 × minutes**, which is why heavier people burn more calories doing the same activity for the same time.",
        "The activity options on this page carry fixed MET values: **walking (moderate) 3.5**, **weight training 5**, **cycling (moderate) 6**, **running (jogging) 7**, **swimming 8**, and **running (fast) 10**, with **yoga at 4**. These are averages — your real intensity varies with speed, terrain, and effort — so treat the result as a solid estimate, not a laboratory measurement.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A **70 kg** person **jogging for 30 minutes** (7 METs): 7 × 70 × 3.5 ÷ 200 × 30 = **257 calories**, or **514 calories per hour** at the same pace. Walk instead — 3.5 METs for a full hour — and you burn 3.5 × 70 × 3.5 ÷ 200 × 60 = **257 calories** too: half the intensity for twice the time gives the same total, which is the basic trade-off behind all calorie math.",
        "Intensity changes the answer fast. The same 70 kg person running **fast (10 METs)** for 30 minutes burns 10 × 70 × 3.5 ÷ 200 × 30 = **368 calories** — about 43% more than jogging for the same half hour.",
      ],
    },
    {
      heading: "Using the number honestly",
      paragraphs: [
        "Two common mistakes inflate the figure. First, **double-counting**: if you already use a TDEE that includes an activity multiplier, adding workout calories on top counts the same movement twice. Second, **trusting the number to the calorie** — MET tables are averages across studies, and individual burn varies by roughly 10–20% with fitness, body composition, and technique.",
        "The most useful way to use this calculator is **comparatively**: which activities give you the most burn for the time you actually have, and how your weekly total adds up. A 30-minute jog five days a week (about 1,285 calories) is a meaningful chunk of a weight-loss calorie deficit — but only if the rest of your day stays the same.",
      ],
    },
  ],

  "pace-calculator": [
    {
      heading: "Pace, speed, and finish time — three views of the same run",
      paragraphs: [
        "Runners talk in **pace** — the time per kilometre or per mile — rather than speed, because pace is what you feel and control on the road. The formula is simple: **pace = total time ÷ distance**. This calculator takes your distance in kilometres and your total time in hours, minutes, and seconds, then returns your pace per kilometre, your pace per mile (1 mile = 1.60934 km), and your average speed in km/h.",
        "Pace and speed are inverses: a faster pace means a smaller number of minutes per kilometre. Dropping from 6:00/km to 5:00/km is a bigger speed jump than it looks — 10 km/h to 12 km/h — because each second per kilometre counts more as you get faster.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Run **5 km in 25 minutes** (1,500 seconds). Pace per km: 1,500 ÷ 5 = **300 seconds = 5:00/km**. Pace per mile: 300 × 1.60934 = 482.8 seconds = **8:02/mi**. Speed: 5 km ÷ (1,500 ÷ 3,600 h) = **12.0 km/h**.",
        "Scale it up: a **10K in 55 minutes** (3,300 seconds) gives 3,300 ÷ 10 = **330 seconds = 5:30/km**, at a speed of **10.9 km/h**. And holding 5:00/km for a full marathon (42.195 km) would take 42.195 × 5 = 211 minutes — a finish time of about **3:31:00**.",
      ],
    },
    {
      heading: "What the numbers mean for your training",
      paragraphs: [
        "As a rough guide, beginners often run around **6:00–7:00/km**, intermediate runners **5:00–6:00/km**, and competitive runners **under 4:30/km** — but pace depends on terrain, weather, and distance, so compare like with like. A hilly 10K pace is not comparable to a flat 5K pace.",
        "Use this calculator backwards too: enter your target finish time for a race distance to find the pace you must hold, then train at that pace in short intervals. Knowing that a sub-30-minute 5K needs 6:00/km turns a vague goal into a concrete number you can practise.",
      ],
    },
  ],

  "distance-formula-calculator": [
    {
      heading: "The distance formula is the Pythagorean theorem in disguise",
      paragraphs: [
        "The distance between two points (x₁, y₁) and (x₂, y₂) is the length of the straight line joining them — the hypotenuse of a right triangle whose legs are the horizontal and vertical gaps between the points. That is why the formula is **d = √((x₂−x₁)² + (y₂−y₁)²)**: it is the Pythagorean theorem applied to the differences Δx and Δy.",
        "Because the differences are squared, the order of the points doesn't matter — (x₂−x₁)² equals (x₁−x₂)² — and the result is always a positive length in whatever units your coordinates use. This calculator also shows Δx and Δy separately, which is handy when you need the direction of travel as well as the distance.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Find the distance between **(1, 2)** and **(4, 6)**. Δx = 4 − 1 = **3**, Δy = 6 − 2 = **4**. Then d = √(3² + 4²) = √(9 + 16) = √25 = **5** — the classic 3-4-5 right triangle.",
        "The same answer appears whenever the gaps are 3 and 4, whatever the starting point: from **(−1, 2)** to **(3, −1)**, Δx = 4 and Δy = −3, and d = √(16 + 9) = **5** again. The negative sign vanishes when squared, so distance only cares about how far apart the points are, not which direction.",
      ],
    },
    {
      heading: "Where the distance formula shows up",
      paragraphs: [
        "**Maps and navigation:** the straight-line ('as the crow flies') distance between two GPS coordinates starts with this formula, before roads and terrain are considered. **Computer graphics and games:** collision detection constantly checks distances between objects. **Data science:** the same Euclidean distance measures how similar two data points are in clustering and nearest-neighbour algorithms.",
        "For three dimensions, just add the third gap: **d = √((x₂−x₁)² + (y₂−y₁)² + (z₂−z₁)²)**. And if you need the point halfway between two points rather than the distance, use the midpoint formula — ((x₁+x₂)/2, (y₁+y₂)/2) — which this site's midpoint calculator handles.",
      ],
    },
  ],

  "area-calculator": [
    {
      heading: "One idea, four shapes",
      paragraphs: [
        "Area measures how much surface a shape covers, in **square units** — square centimetres, square metres, square feet — matching whatever unit you measure the sides in. This calculator covers four shapes: **circle (πr²)**, **rectangle (length × width)**, **triangle (½ × base × height)**, and **trapezoid (½ × (a + b) × height**, where a and b are the two parallel sides).",
        "Note what each formula needs. A circle needs only its **radius** — not the diameter (a common slip: doubling the radius quadruples the area, since r is squared). A triangle needs its **height measured perpendicular to the base**, not the length of a sloping side. A trapezoid needs both parallel sides and the height between them.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A **circle with radius 10**: area = π × 10² = π × 100 = **314.16**, with a circumference (perimeter) of 2 × π × 10 = **62.83**. A **rectangle 10 × 5**: area = 10 × 5 = **50**, perimeter = 2 × (10 + 5) = **30**.",
        "A **triangle with base 10 and height 5**: area = ½ × 10 × 5 = **25** — exactly half the rectangle with the same base and height, as it should be. A **trapezoid with parallel sides 10 and 7 and height 5**: area = ½ × (10 + 7) × 5 = ½ × 17 × 5 = **42.5**.",
      ],
    },
    {
      heading: "Area in real life — and the unit trap",
      paragraphs: [
        "Area is the number behind **flooring, paint, lawn seed, and fabric**: a room 5 m × 4 m needs 20 m² of flooring (plus ~10% extra for cuts and waste), and a paint tin covering 12 m² per litre needs about 2 litres for a 25 m² wall. Always add a waste margin — real rooms have corners, doors, and offcuts.",
        "The classic mistake is **mixing units**: measuring one side in centimetres and the other in metres gives an area that is wrong by a factor of 100. Convert all dimensions to the same unit before calculating, and remember that area scales with the square of length — doubling every side of a shape makes its area **four times** larger, not twice.",
      ],
    },
  ],

  "volume-calculator": [
    {
      heading: "Volume is area with a third dimension",
      paragraphs: [
        "Volume measures the space inside a 3D shape, in **cubic units** — cm³, m³, litres (1 litre = 1,000 cm³). This calculator covers four shapes: **sphere (4/3πr³)**, **cylinder (πr²h)**, **cone (⅓πr²h)**, and **cube (s³)**. It also returns the surface area of each shape, which matters whenever you care about coating, heat loss, or material use rather than capacity.",
        "Notice the relationships: a cone holds exactly **one third** of the cylinder with the same radius and height, and a sphere's volume grows with the **cube** of its radius — doubling the radius multiplies the volume by eight. These scaling rules are why small changes in size have surprisingly large effects on capacity.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A **sphere with radius 5**: volume = 4/3 × π × 5³ = 4/3 × π × 125 = **523.60**, surface area = 4 × π × 25 = **314.16**. A **cylinder with radius 5 and height 10**: volume = π × 25 × 10 = **785.40**, surface area = 2 × π × 5 × (5 + 10) = **471.24**.",
        "A **cone with the same radius 5 and height 10**: volume = ⅓ × π × 25 × 10 = **261.80** — exactly one third of the cylinder's 785.40, as the formulas promise. A **cube with side 5**: volume = 5³ = **125**, surface area = 6 × 25 = **150**.",
      ],
    },
    {
      heading: "Practical uses and the litre shortcut",
      paragraphs: [
        "Volume decides **tank sizes, shipping boxes, concrete pours, and cooking**: a cylindrical water tank with radius 3 m and height 7 m holds π × 9 × 7 ≈ 197.92 m³ — nearly 198,000 litres. For small containers, remember the handy conversion: **1,000 cm³ = 1 litre**, so a 10 cm × 10 cm × 10 cm box holds exactly 1 litre.",
        "As with area, keep all dimensions in the **same unit** before calculating, and beware the cube trap: a box twice as long on every side holds **eight times** as much, not twice. That is why a slightly larger planter or storage bin often costs far less per litre than the small one.",
      ],
    },
  ],

  "pythagorean-theorem-calculator": [
    {
      heading: "The theorem that built geometry",
      paragraphs: [
        "For any **right triangle** — one with a 90° corner — the square of the hypotenuse (the side opposite the right angle) equals the sum of the squares of the other two sides: **a² + b² = c²**. This calculator takes the two legs a and b and returns the hypotenuse **c = √(a² + b²)**, along with a² + b², the triangle's area (½ab), and its perimeter.",
        "The theorem works both ways. It finds a missing side, but it also **tests** whether a triangle is right-angled: if a² + b² equals c² for the longest side, the angle opposite is exactly 90°. Builders have used this check for thousands of years — the 3-4-5 triangle is the classic way to square a corner on a construction site.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Legs **a = 3, b = 4**: c = √(3² + 4²) = √(9 + 16) = √25 = **5**. The area is ½ × 3 × 4 = **6**, and the perimeter is 3 + 4 + 5 = **12**. The 3-4-5 triangle is the most famous **Pythagorean triple** — a set of whole numbers that satisfies the theorem exactly.",
        "Another triple: legs **5 and 12** give c = √(25 + 144) = √169 = **13**, with area ½ × 5 × 12 = **30** and perimeter 5 + 12 + 13 = **30**. Other common triples include 8-15-17, 7-24-25, and 20-21-29; spotting one saves you a square root.",
      ],
    },
    {
      heading: "Finding a leg instead of the hypotenuse",
      paragraphs: [
        "This calculator solves for the hypotenuse, but the theorem rearranges easily. If you know the hypotenuse c and one leg a, the other leg is **b = √(c² − a²)**. For example, a ladder 5 m long leaning with its foot 3 m from a wall reaches √(25 − 9) = √16 = **4 m** up the wall.",
        "Watch the two classic errors: applying the theorem to a triangle that **isn't right-angled** (the formula only holds at 90°), and forgetting the final square root — a² + b² gives c², not c. If your answer looks too large, you probably skipped the √ step.",
      ],
    },
  ],

  "quadratic-equation-calculator": [
    {
      heading: "The quadratic formula solves every quadratic",
      paragraphs: [
        "A quadratic equation has the form **ax² + bx + c = 0** (with a ≠ 0), and the quadratic formula always finds its roots: **x = (−b ± √(b² − 4ac)) / 2a**. The ± means there are generally two solutions — the two points where the parabola y = ax² + bx + c crosses the x-axis.",
        "The key quantity is the **discriminant, Δ = b² − 4ac**. If Δ > 0, there are two distinct real roots. If Δ = 0, there is one repeated root (the parabola just touches the x-axis). If Δ < 0, there are no real roots — instead, two **complex conjugate** roots, which this calculator also returns. The vertex of the parabola sits at **x = −b / 2a**, exactly halfway between the two roots.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Solve **x² − 5x + 6 = 0** (a = 1, b = −5, c = 6). Discriminant: Δ = (−5)² − 4 × 1 × 6 = 25 − 24 = **1**. Roots: x = (5 ± √1) / 2, so x₁ = (5 + 1) / 2 = **3** and x₂ = (5 − 1) / 2 = **2**. Check: 3² − 15 + 6 = 0 ✓ and 2² − 10 + 6 = 0 ✓. The vertex is at x = 5 / 2 = **2.5**, midway between 2 and 3.",
        "Now **x² + 2x + 5 = 0**: Δ = 4 − 20 = **−16**, so the roots are complex: x = (−2 ± √−16) / 2 = **−1 ± 2i**. The parabola never touches the x-axis — its lowest point is above it — which is exactly what a negative discriminant means.",
      ],
    },
    {
      heading: "When to factor, when to use the formula",
      paragraphs: [
        "If the quadratic **factors neatly** — x² − 5x + 6 = (x − 2)(x − 3) — factoring is faster and gives the roots by inspection. But most quadratics don't factor over whole numbers, and the formula works every time, including when the roots are fractions, irrational, or complex. **Completing the square** is the middle path: it reveals the vertex form and is how the formula itself is derived.",
        "The most common mistake is a **sign error on −b**: when b is negative, −b is positive (as in the example above, where b = −5 gives −b = +5). Double-check the sign of each term before substituting, and verify your answers by plugging them back into the original equation.",
      ],
    },
  ],

  "square-root-calculator": [
    {
      heading: "What a square root actually is",
      paragraphs: [
        "The square root of a number x is the value that, multiplied by itself, gives x: **√x = x^(1/2)**. So √144 = 12 because 12 × 12 = 144. Every positive number has two square roots (a positive and a negative one), but the √ symbol conventionally means the **principal (positive)** root — the one this calculator returns.",
        "A **perfect square** is a number whose square root is a whole integer: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144… This calculator flags whether your number is one. Most numbers are not perfect squares, and their roots are **irrational** — decimals that never repeat or terminate, like √2 = 1.414214…",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "The default on this page: **√144 = 12** exactly — 144 is a perfect square (12² = 144). Now try **√50**: it is not a perfect square, and the calculator gives **7.071068** (to 6 decimal places). Check it: 7.071068² ≈ 50.000002 — the tiny error is just rounding at the 6th decimal.",
        "A famous one: **√2 = 1.414214**. The ancient Greeks proved this number cannot be written as a fraction, making it the first known irrational number. And **√10 = 3.162278** — useful whenever you need a quick estimate, since √10 is close to π (3.141593) but not equal to it.",
      ],
    },
    {
      heading: "Square roots without a calculator",
      paragraphs: [
        "For estimates, **bracket** the number between perfect squares: √50 lies between √49 = 7 and √64 = 8, closer to 7 — so about 7.1, matching the true 7.071068. One refinement step: 7.1² = 50.41, slightly high, so the root is slightly below 7.1.",
        "Square roots appear everywhere: the **Pythagorean theorem** (hypotenuse = √(a² + b²)), the **distance formula**, **standard deviation**, and **quadratic equations** all end with a square root. One rule to remember: there is no real square root of a negative number — √(−9) is not a real number (it is 3i in complex numbers), which is why this calculator returns an error for negative inputs.",
      ],
    },
  ],

  "triangle-calculator": [
    {
      heading: "Heron's formula: area from three sides alone",
      paragraphs: [
        "Most area formulas need a height, but **Heron's formula** finds a triangle's area from its three side lengths only: first compute the semi-perimeter **s = (a + b + c) / 2**, then **area = √(s(s−a)(s−b)(s−c))**. No angles, no heights — just the three sides. This calculator also returns the perimeter and all three angles, found with the **law of cosines**: cos A = (b² + c² − a²) / 2bc, and similarly for B and C.",
        "Before any of that, the sides must form a real triangle. The **triangle inequality** requires each side to be shorter than the sum of the other two (a < b + c, and so on). If that fails — say sides 2, 3, and 10 — no triangle exists, and the calculator returns an error.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Sides **a = 5, b = 7, c = 10**. Semi-perimeter: s = (5 + 7 + 10) / 2 = **11**. Area = √(11 × 6 × 4 × 1) = √264 = **16.2481**. Perimeter = 5 + 7 + 10 = **22**.",
        "The angles, via the law of cosines: angle A = **27.66°**, angle B = **40.54°**, and angle C = 180 − 27.66 − 40.54 = **111.80°**. Note that C is obtuse (over 90°) — the longest side, 10, faces the largest angle, as it always does. The three angles sum to 180°, a quick check that the answers are consistent.",
      ],
    },
    {
      heading: "Sanity checks for any triangle",
      paragraphs: [
        "Three quick tests catch most errors. **Angles sum to 180°** — always. **Largest side faces largest angle**, smallest side faces smallest angle. And the **area check**: for a right triangle, Heron's formula must agree with ½ × (product of the legs) — for sides 3, 4, 5, Heron gives √(6 × 3 × 2 × 1) = √36 = **6**, exactly matching ½ × 3 × 4 = 6.",
        "If you know two sides and the included angle instead of three sides, use **area = ½ab sin C**. And if your triangle is right-angled and you only need a missing side, the Pythagorean theorem is quicker than Heron — use the right tool for the information you have.",
      ],
    },
  ],

  "lcm-calculator": [
    {
      heading: "What the LCM is and how this calculator finds it",
      paragraphs: [
        "The **Least Common Multiple (LCM)** of two numbers is the smallest positive number that both divide into evenly. The multiples of 12 are 12, 24, 36, 48…; the multiples of 18 are 18, 36, 54…; the first number on both lists is **36**, so LCM(12, 18) = 36.",
        "Listing multiples works for small numbers, but this calculator uses the faster identity **LCM(a, b) = |a × b| / GCD(a, b)**, where GCD is the Greatest Common Divisor, found by the Euclidean algorithm (repeatedly replacing the pair with the remainder until it reaches zero). It returns the LCM, the GCD, and the product — the three quantities linked by that formula.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Find **LCM(12, 18)**. First the GCD: 18 ÷ 12 leaves remainder 6, then 12 ÷ 6 leaves 0, so **GCD = 6**. Then LCM = (12 × 18) ÷ 6 = 216 ÷ 6 = **36**. Check: 36 ÷ 12 = 3 and 36 ÷ 18 = 2, both whole — and no smaller number works.",
        "Two more: **LCM(8, 12) = 24** (GCD 4, product 96, 96 ÷ 4 = 24) and **LCM(15, 20) = 60** (GCD 5, product 300, 300 ÷ 5 = 60). When two numbers share no common factor except 1 — like 7 and 9 — the LCM is just their product: **LCM(7, 9) = 63**.",
      ],
    },
    {
      heading: "Where LCM actually gets used",
      paragraphs: [
        "**Adding fractions:** to add 1/12 + 1/18 you need a common denominator, and the LCM (36) is the smallest one that works: 3/36 + 2/36 = 5/36. **Scheduling:** if one bus runs every 12 minutes and another every 18, they coincide every 36 minutes. **Repeating patterns:** gears, flashing lights, and orbital alignments all repeat on LCM cycles.",
        "A useful relationship to remember: **LCM × GCD = a × b** always. For 12 and 18: 36 × 6 = 216 = 12 × 18 ✓. If your LCM and GCD don't satisfy this, one of them is wrong — a fast self-check for homework and exams.",
      ],
    },
  ],

  "electricity-power-calculator": [
    {
      heading: "How electrical power is calculated",
      paragraphs: [
        "Electrical power is the rate at which energy is used, and it comes from just two numbers: **P = V × I**, where P is power in watts, V is voltage in volts, and I is current in amps. One watt equals one joule of energy per second, so a 1,200-watt heater transfers 1,200 joules every second it runs.",
        "The same two inputs also give you resistance through Ohm's law: **R = V ÷ I**. Resistance in ohms tells you how much a circuit resists the flow of current — a high-wattage appliance at a fixed voltage has low resistance, which is why it draws more current.",
        "Power and energy are different things, and the distinction matters for your bill. **Power (watts)** is a rate; **energy (kilowatt-hours)** is power sustained over time: kWh = kW × hours. This calculator shows both, converting watts to kilowatts by dividing by 1,000 and reporting the energy used in one hour.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a circuit at **120 volts carrying 10 amps**. Power = 120 × 10 = **1,200 W**, or **1.200 kW**. Resistance = 120 ÷ 10 = **12.00 Ω**. Left running for one hour, the load consumes **1.200 kWh** of energy.",
        "The formula works backwards too. A **60-watt bulb on 120 volts** draws 60 ÷ 120 = **0.5 amps**. And a 1,200-watt heater run for 5 hours uses 1.2 kW × 5 = **6 kWh** — at a rate of $0.15 per kWh, that is $0.90 of electricity.",
      ],
    },
    {
      heading: "Sizing loads to a circuit",
      paragraphs: [
        "Add up the watts on a circuit before plugging in another appliance. A standard **15-amp household circuit at 120 volts** can deliver at most 120 × 15 = **1,800 watts**. A 1,200-watt heater plus a 700-watt microwave on the same circuit is 1,900 watts — over the limit, and the breaker will trip.",
        "For loads that run continuously (3 hours or more), a common rule of thumb is to stay at **80% of the circuit rating**: 1,800 × 0.80 = **1,440 watts** on a 15-amp circuit. Check the wattage label on every appliance, and when in doubt, spread heavy loads across circuits or ask an electrician.",
      ],
    },
  ],

  "time-duration-calculator": [
    {
      heading: "How a time duration is calculated",
      paragraphs: [
        "The calculator converts both times to **minutes since midnight**, then subtracts: duration = end time − start time. So 9:00 becomes 540 minutes and 17:30 becomes 1,050 minutes, and the difference is the duration in minutes.",
        "If the end time is earlier than the start time, the calculator assumes the span crosses midnight and adds **1,440 minutes (24 hours)**. That is how a night shift from 22:15 to 6:45 is handled — the result is the overnight duration, not a negative number.",
        "The result is shown three ways: hours and minutes, total minutes, and **decimal hours** (minutes ÷ 60). Decimal hours are what payroll systems and timesheets use, because 8 hours 30 minutes is 8.50 hours, not 8.30.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "From **9:00 to 17:30**: 17:30 is 1,050 minutes since midnight and 9:00 is 540 minutes, so the duration is 1,050 − 540 = **510 minutes**, or **8 hours 30 minutes**. In decimal hours that is 510 ÷ 60 = **8.50 hours**.",
        "An overnight shift from **22:15 to 6:45** works the same way: 105 minutes remain until midnight, plus 405 minutes after midnight, for a total of **510 minutes (8 hours 30 minutes)**. The midnight wrap is automatic — you never have to split the shift yourself.",
      ],
    },
    {
      heading: "Using the result for pay and planning",
      paragraphs: [
        "Decimal hours make pay math simple: 8.50 hours at $25 per hour is 8.50 × 25 = **$212.50**. Never multiply the '8.30' style figure directly — 8.30 hours would underpay by 20 minutes.",
        "Two limits to keep in mind. The calculator assumes **at most one midnight crossing**, so a span longer than 24 hours needs the days-between-dates calculator instead. And it measures clock time only — if you take an unpaid break, subtract it from the result (or use the work-hours calculator with net hours) before calculating pay.",
      ],
    },
  ],

  "days-between-dates-calculator": [
    {
      heading: "How the day count works",
      paragraphs: [
        "The calculator subtracts the two dates in milliseconds and divides by **86,400,000** — the number of milliseconds in a day (24 × 60 × 60 × 1,000). Because it uses real calendar dates, **leap years are handled automatically**: a span crossing February 29 simply counts one extra day.",
        "The result is the **absolute difference**, so the order of the dates doesn't matter — the tool also tells you the direction (forward or backward). Weeks are whole weeks only: days ÷ 7, rounded down, so 366 days is 52 weeks, not 52.3.",
        "One detail that trips people up: this is a **difference, not an inclusive count**. From 1 January to 2 January is 1 day, because the calculator counts the gap between the dates. If you need to count both endpoints (for example, a 1 January to 3 January trip is 3 days inclusive), add 1 to the result.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "From **1 January 2025 to 31 December 2025** is **364 days** — exactly **52 weeks**. That is the full calendar year minus one day, since the count runs from the first day to the last rather than including both.",
        "Cross a leap year and the extra day appears automatically: from **1 January 2024 to 1 January 2025** is **366 days**, because 2024 included 29 February. That is 52 whole weeks with 2 days left over.",
      ],
    },
    {
      heading: "Where the day count matters",
      paragraphs: [
        "Day counts show up in **countdowns** (days until a trip or deadline), **project timelines** (how many working days a phase really has), **contract notice periods**, and **age in days**. For any of these, the exact calendar count beats estimating 'about three months' — months are 28 to 31 days, so estimates drift fast.",
        "For planning, pair the day count with the week count: a 90-day project is 12 full weeks plus 6 days, which is easier to schedule around than 'about 3 months'. And remember the inclusive-count rule above — a deadline '30 days from 1 March' and a booking '1 March to 31 March inclusive' are different spans.",
      ],
    },
  ],

  "work-hours-calculator": [
    {
      heading: "How total hours and pay are calculated",
      paragraphs: [
        "The math is three multiplications. **Weekly hours = hours per day × days per week**, **total hours = weekly hours × number of weeks**, and **total pay = total hours × hourly rate**. The calculator also shows weekly pay, which is weekly hours × rate.",
        "Two things this calculator does **not** do. It does not deduct breaks — enter your **net hours worked**, after unpaid breaks (a 9-hour shift with a 1-hour unpaid lunch is 8 hours). And it does not calculate overtime: every hour is paid at the same rate, so overtime weeks need a separate overtime calculator.",
        "The pay figure is **gross pay**: total hours × rate, before tax, social security, or any other deductions. It is the number your employer starts from, not the number that lands in your bank account.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A standard full-time pattern — **8 hours a day, 5 days a week, for 4 weeks** — is 8 × 5 = **40 hours per week** and 40 × 4 = **160 total hours**. At $25 per hour, total pay is 160 × 25 = **$4,000**, or **$1,000 per week**.",
        "A part-time pattern works the same way: **6 hours a day, 3 days a week, for 4 weeks** is 6 × 3 × 4 = **72 hours**. At $18 per hour that is 72 × 18 = **$1,296** for the period.",
      ],
    },
    {
      heading: "Getting an accurate number",
      paragraphs: [
        "The most common mistake is entering **shift length instead of worked hours**. If your shift is 9 hours with a 1-hour unpaid lunch, enter 8 — otherwise a 4-week month overstates your hours by 20 and your pay by $500 at $25 per hour.",
        "For a quick annual estimate, use 52 weeks: 40 hours × $30 × 52 = **$62,400 gross per year**. That ignores unpaid time off, so treat it as a ceiling. And if your hours vary week to week, run the calculator per week with that week's actual hours rather than averaging — averages hide overtime weeks.",
      ],
    },
  ],

  "time-zone-converter": [
    {
      heading: "How time zone conversion works",
      paragraphs: [
        "Every time zone is defined by its **offset from UTC** (Coordinated Universal Time): UTC−5 means 5 hours behind UTC, UTC+1 means 1 hour ahead. To convert, the calculator finds the difference — **to offset − from offset** — and adds it to the time.",
        "If the result passes midnight, the date shifts. A converted time of 25:00 becomes **01:00 the next day**; a result of −2:00 becomes **22:00 the previous day**. The calculator reports the day change alongside the converted time so a meeting never lands on the wrong date.",
        "One important caveat: this converter uses the **fixed offsets you enter**. Many regions shift their offset by an hour for daylight saving time, so the offset that is correct in January may be wrong in July. Always check the offset that applies on your specific date — a world clock or time-zone reference will show it — then enter those numbers here.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Convert **12:00 at UTC−5 to UTC+1**. The difference is 1 − (−5) = **+6 hours**, so the converted time is 12:00 + 6 = **18:00 the same day**.",
        "Crossing midnight: **22:00 at UTC−5 to UTC+9** has a difference of 9 − (−5) = **+14 hours**, giving 22:00 + 14 = 36:00, which wraps to **12:00 the next day**. Going the other way, **20:00 at UTC+1 to UTC−8** is a difference of −9 hours, giving **11:00 the same day**.",
      ],
    },
    {
      heading: "Scheduling across time zones",
      paragraphs: [
        "Not every zone is a whole number of hours from UTC: some use **half-hour offsets** (such as UTC+5:30) and a few use 45 minutes. Enter these as decimals — 5.5 for UTC+5:30 — and the arithmetic works the same way.",
        "For meetings, convert in **both directions** and confirm the time in each person's local time and date: '18:00 your time, 12:00 my time, same day' prevents the classic mistake of one side showing up a day early or late. The maximum offset difference in the world is 26 hours, so a conversion can shift the date by a full day in either direction.",
      ],
    },
  ],

  "time-converter": [
    {
      heading: "One base unit: the second",
      paragraphs: [
        "Every conversion on this page goes through **seconds**. The fixed relationships are: 1 minute = 60 seconds, 1 hour = 3,600 seconds, 1 day = 86,400 seconds, and 1 week = 604,800 seconds. The calculator converts your value to seconds first, then divides into each target unit.",
        "The converter covers **seconds, minutes, hours, days, and weeks** — the units with exact, unchanging lengths. Months and years are deliberately not included: a month is 28 to 31 days and a year is 365 or 366 days, so there is no single exact conversion for them.",
      ],
    },
    {
      heading: "Worked examples",
      paragraphs: [
        "**3,600 seconds** = 3,600 ÷ 60 = **60 minutes** = **1 hour** = 3,600 ÷ 86,400 = **0.0417 days** = 3,600 ÷ 604,800 = **0.0060 weeks**. One hour is a small fraction of a day or week, which is why the decimal results look tiny.",
        "**2 weeks** the other way: 2 × 604,800 = **1,209,600 seconds** = **20,160 minutes** = **336 hours** = **14 days**. Working in seconds first keeps every step exact — no rounding creeps in until the final display.",
      ],
    },
    {
      heading: "Where time conversions come up",
      paragraphs: [
        "**Meetings and media:** a 90-minute meeting is 90 × 60 = **5,400 seconds**, and video runtimes in seconds become readable once converted to minutes. **Work:** a 40-hour week is 40 × 3,600 = **144,000 seconds**. **Tech:** server uptime, video encoding, and API timeouts are usually quoted in seconds and need converting to hours or days to make sense.",
        "For rough mental math, remember **3,600 seconds per hour** and **86,400 per day**. A year of 365 days is 365 × 86,400 = **31,536,000 seconds** — the figure behind the 'seconds in a year' question, and a useful anchor for any long conversion.",
      ],
    },
  ],

  "stair-calculator": [
    {
      heading: "How stair math works",
      paragraphs: [
        "A staircase starts from the **total rise** — the vertical height from one finished floor to the next — and a desired riser height. The number of risers is total rise ÷ desired riser, **rounded to the nearest whole number**, because you can't build a fraction of a step.",
        "The **actual riser height** is then total rise ÷ number of risers, so every step is exactly equal. Equal risers matter: uneven steps are a tripping hazard, and building codes limit how much risers may vary. The **tread depth** is estimated as 25 inches minus the actual riser height, the **stair angle** comes from the riser-to-tread ratio, and the **total run** is the number of stairs × tread depth — the horizontal floor space the staircase needs.",
        "This calculator gives you the geometry. It does not replace a building code check: riser and tread limits vary by jurisdiction, so confirm the rules where you are building before cutting anything.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **total rise of 108 inches (9 feet)** with a desired riser of **7.5 inches**. 108 ÷ 7.5 = 14.4, which rounds to **14 risers**. The actual riser height is 108 ÷ 14 = **7.71 inches** — slightly taller than desired, but equal on every step.",
        "The suggested tread is 25 − 7.71 = **17.29 inches**, the stair angle is **24.1°**, and the total run is 14 × 17.29 = **242 inches (20 feet 2 inches)** of horizontal floor space. That run is the number to check against your available floor plan — a staircase needs length as well as height.",
      ],
    },
    {
      heading: "Building to code and comfort",
      paragraphs: [
        "As a common US rule of thumb, the International Residential Code (IRC) limits risers to **7.75 inches maximum** with a minimum tread of **10 inches** and a maximum variation of 3/8 inch between risers — but local codes can differ, so check the rules in your area before building. The 7.71-inch riser in the example above sits just inside that 7.75-inch guideline.",
        "A second rule of thumb for comfort is that **one riser plus one tread should total about 17–18 inches**. Note that this calculator's tread estimate (25 minus the riser) is generous — real staircases usually use 10–11 inch treads — so treat the suggested tread as a starting point and confirm it against your local code and the space you have.",
        "Measure the total rise carefully, from **finished floor to finished floor** (including flooring thickness), and allow for headroom above the stairs and a landing at the top and bottom. A small measuring error at the start becomes an uneven step at the end.",
      ],
    },
  ],

  "square-footage-calculator": [
    {
      heading: "How square footage is calculated",
      paragraphs: [
        "For a rectangular room, area is simply **length × width**, with both measurements in feet. A room 15 feet long and 12 feet wide is 15 × 12 = 180 square feet — the area of the floor, not the perimeter.",
        "The calculator also converts the result. Square metres use **1 sq ft = 0.0929 m²**, and acres use **1 acre = 43,560 sq ft**. These conversions are handy for land, listings, and materials sold in metric units.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A room **15 feet by 12 feet** is **180 square feet**. In metric that is 180 × 0.0929 = **16.72 m²**, and in acres it is 180 ÷ 43,560 = **0.004132 acres** — a reminder of how small a room is next to an acre.",
        "A larger space, **20 feet by 25 feet**, is **500 square feet** or 46.45 m². If you are buying flooring for the 180 sq ft room, add 10% for cuts and waste: 180 × 1.10 = **198 sq ft** to order.",
      ],
    },
    {
      heading: "Measuring real rooms",
      paragraphs: [
        "**Irregular rooms:** split the floor into rectangles, measure each one, and add the areas together. An L-shaped room is two rectangles; a room with a bay window is the main rectangle plus the bay.",
        "**Measure the longest points** of each rectangle, wall to wall, and measure closets and nooks separately rather than guessing. For flooring or paint, measure each room individually — adding room areas is more accurate than measuring the whole house outline, which includes wall thicknesses and unusable space.",
        "For land, remember the acre: a **quarter acre is 43,560 ÷ 4 = 10,890 sq ft**, roughly a 100 × 109 foot lot. That conversion is the one most often needed when comparing property listings.",
      ],
    },
  ],

  "number-to-words-converter": [
    {
      heading: "How numbers become words",
      paragraphs: [
        "The converter breaks a number into **place values** — hundreds, thousands, millions, billions — and names each group. The numbers 1 to 19 have their own names (Eleven, Twelve, Thirteen), the tens have theirs (Twenty, Thirty, Forty), and everything else is built by combining them: 42 is 'Forty Two', 100 is 'One Hundred'.",
        "The output follows the **American style**: words are capitalised, tens and ones are separated by a space rather than a hyphen ('Forty Two', not 'Forty-Two'), and there is no 'and' between hundreds and the rest ('One Hundred One', not 'One Hundred and One').",
        "Three behaviours to know: the converter uses the **whole-number part only** — decimals are dropped, so 1234.56 becomes 'One Thousand Two Hundred Thirty Four'. Negative numbers get a **'Negative'** prefix. And it supports numbers up to the billions (999,999,999,999).",
      ],
    },
    {
      heading: "Worked examples",
      paragraphs: [
        "**1,234** breaks into 1 thousand + 2 hundred + 30 + 4, giving **'One Thousand Two Hundred Thirty Four'** (4 digits). **45,678** becomes **'Forty Five Thousand Six Hundred Seventy Eight'** — the thousands group is named first, then the remainder.",
        "Larger numbers follow the same pattern: **2,500,000** is **'Two Million Five Hundred Thousand'**, and **0** is simply **'Zero'**. Each group of three digits gets its own scale word, which is why the pattern stays readable even at a billion.",
      ],
    },
    {
      heading: "Writing numbers in words",
      paragraphs: [
        "Numbers in words are standard on **checks, contracts, and legal documents**, where words are harder to alter than digits — changing 'One Thousand' to 'Nine Thousand' is far more obvious than changing a 1 to a 9. That is also why checks spell out the dollars and write the cents as a fraction (for example, 'and 50/100').",
        "Because this converter drops decimals, handle cents separately: convert the dollar amount here, then append the cents in the format your document needs. And if you are writing for a British audience, note the style difference — British English usually inserts 'and' ('One Hundred and One'), while this converter uses the American form without it.",
      ],
    },
  ],

  "personal-loan-calculator": [
    {
      heading: "How personal loan payments are calculated",
      paragraphs: [
        "A personal loan is an **amortizing loan**: you borrow a lump sum and repay it in equal monthly installments over a fixed term. Each payment is split into an interest portion and a principal portion, and the split shifts every month — early payments are mostly interest, later payments mostly principal.",
        "Lenders use the standard amortization formula: **M = P × r(1+r)ⁿ / ((1+r)ⁿ − 1)**, where M is the monthly payment, P is the loan amount, r is the monthly interest rate (annual rate ÷ 12), and n is the number of monthly payments. This calculator applies that formula instantly, so changing the rate or term shows the new payment right away.",
        "Many personal loans also charge an **origination fee**, usually 1–8% of the loan amount. This calculator shows the fee separately and adds it to your total cost, while the monthly payment is calculated on the full loan amount. That matters when comparing offers: a loan with a lower rate but a high fee can cost more overall than a slightly higher-rate loan with no fee.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Borrow **$15,000 at 10% for 36 months** with a 2% origination fee. The monthly rate is 0.10 ÷ 12 = 0.008333. Plugging into the formula gives a monthly payment of **$484.01**.",
        "Look at the first payment: interest = $15,000 × 0.008333 = **$125.00**, so only **$359.01** reduces your balance. Over the full 36 months you pay **$2,424.28 in interest**, plus a **$300 origination fee** (2% of $15,000), for a total cost of **$17,724.28**.",
        "Stretch the same loan to 60 months and the payment falls to **$318.71** — but total interest rises to **$4,122.34**, an extra **$1,698.06** for the convenience of the lower payment. That trade-off is exactly what this calculator is for.",
      ],
    },
    {
      heading: "How to borrow less expensively",
      paragraphs: [
        "Three levers control what a personal loan costs: the **rate**, the **term**, and the **fees**. The rate is usually the biggest — improving your credit score before you apply, or getting quotes from several lenders, can move it by points, not fractions.",
        "Choose the **shortest term whose payment fits your budget**. A longer term feels easier month to month but quietly adds thousands in interest, as the worked example shows. If you can afford the 36-month payment, take it over the 60-month one.",
        "Finally, read the fee line. An origination fee is charged whether or not you finish the loan, and some lenders deduct it from the amount you receive — so a $15,000 loan with a 2% fee may only put $14,700 in your account while you still repay the full $15,000. Enter the fee in this calculator and compare the **total cost**, not just the monthly payment.",
      ],
    },
  ],

  "mortgage-payoff-calculator": [
    {
      heading: "How extra payments shorten a mortgage",
      paragraphs: [
        "A mortgage payment is mostly interest in the early years, because interest is charged on the remaining balance each month. On a **$250,000 balance at 6.5%**, the first month's interest alone is about $1,354 — most of the payment never touches the principal.",
        "Extra payments break that pattern. When you pay more than the scheduled amount, the extra goes **straight to principal**, which shrinks the balance that next month's interest is charged on. The effect compounds: a smaller balance means less interest, which means more of each regular payment goes to principal too.",
        "This calculator rebuilds your amortization month by month with the extra payment included, so the payoff date and interest saved it shows are the real result of that compounding — not a rough estimate.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **$250,000 balance at 6.5% with 25 years left**. The scheduled monthly payment is **$1,688.02**, and paying it off on schedule would cost **$256,405.37 in total interest** — more than the balance itself.",
        "Add just **$200 extra per month**. The loan is paid off in **19 years and 6 months** (234 months) instead of 25 years — **5 years and 6 months sooner** — and total interest falls to **$191,477.49**, a saving of **$64,927.88**.",
        "The extra payments themselves total **$46,800** ($200 × 234 months). So every extra dollar you paid saved about **$1.39 in interest** — a return no savings account offers, and it is guaranteed.",
      ],
    },
    {
      heading: "Making extra payments work",
      paragraphs: [
        "Before you start, confirm with your loan servicer that extra payments are **applied to principal**. Some servicers hold extra money as advance payments toward future bills unless you specify otherwise, which does not save interest. Also check your loan agreement for a **prepayment penalty** — rare on modern US mortgages, but worth a minute of reading.",
        "If $200 a month feels like a stretch, try **one extra payment a year** instead — for example, splitting one monthly payment across the year adds about $141 a month on the example above and still cuts years off the loan. Even $50 extra a month makes a visible difference over 25 years.",
        "Extra mortgage payments compete with other uses of the money. Pay off higher-interest debt first (credit cards almost always come first), keep an **emergency fund** of 3–6 months of expenses, and then weigh the guaranteed saving against what you might earn investing. There is no single right answer — but this calculator makes the mortgage side of the trade-off concrete.",
      ],
    },
  ],

  "budget-calculator": [
    {
      heading: "The 50/30/20 rule",
      paragraphs: [
        "The 50/30/20 rule is a simple way to split your income: **50% to needs, 30% to wants, and 20% to savings and extra debt payments**. Needs are the essentials you must pay — housing, utilities, groceries, insurance, minimum debt payments, transport. Wants are everything that makes life enjoyable but is not essential — dining out, streaming, travel, new clothes. Savings covers your emergency fund, retirement, and paying debt down faster.",
        "The math is straightforward: **Category = Monthly Income × Percentage**. This calculator multiplies your income by each percentage you enter, so you can see the dollar amount for every category at a glance — and adjust the percentages to fit your real life instead of forcing your life into a preset split.",
        "One important detail: use your **take-home pay** — the money that actually reaches your account after tax and payroll deductions — not your gross salary. Budgeting from gross income overstates what you have to spend and leaves you short every month.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "On **$5,000 a month** of take-home pay, the classic 50/30/20 split gives **$2,500 for needs**, **$1,500 for wants**, and **$1,000 for savings** — which adds up to **$12,000 saved in a year**.",
        "But the rule is a starting point, not a law. In a high-cost city, rent alone can push needs past 50%. A **60/25/15 split** on the same $5,000 gives **$3,000 for needs**, **$1,250 for wants**, and **$750 for savings** — still **$9,000 saved a year**, and a plan you can actually stick to beats an ideal one you abandon in February.",
        "Whatever split you choose, make sure the three percentages **add up to 100%**. This calculator multiplies each percentage independently, so percentages totalling more than 100% mean you are budgeting more than you earn.",
      ],
    },
    {
      heading: "Making the budget stick",
      paragraphs: [
        "A budget only works if it survives contact with real spending. Track your actual outgoings for a month and compare them with the targets — most people discover one category (often dining out or subscriptions) quietly running far over its share.",
        "**Automate the savings slice.** Move it to a separate account on payday, before you can spend it. A budget that depends on willpower at the end of the month will lose to a budget that pays you first.",
        "Review the split every few months, not every day. Income changes, rent changes, and a budget that flexes with your life is one you will keep. If needs are squeezing savings below 10% for months, that is a signal to look at the big fixed costs — housing and transport — rather than cutting every small pleasure.",
      ],
    },
  ],

  "401k-calculator": [
    {
      heading: "How a 401(k) grows",
      paragraphs: [
        "A 401(k) grows from three sources: **your contributions**, your **employer's matching contributions**, and **investment returns** compounding on both. Contributions go in before tax (in a traditional 401(k)), the money grows tax-deferred, and you pay income tax only when you withdraw it in retirement.",
        "The employer match is the part people underestimate. A common formula is **50% of your contributions up to 6% of salary** — contribute 6%, and your employer adds 3%. This calculator applies the match as **Salary × min(Your Contribution %, Match Limit %) × Match %**, so it only matches the part of your contribution within the limit.",
        "The projection uses monthly compounding: **FV = Balance × (1+r)ⁿ + (Monthly Contributions) × [(1+r)ⁿ − 1] / r**, where r is the monthly return and n is the number of months. It assumes your salary and contribution rate stay constant and shows the pre-tax balance — withdrawals in retirement are taxed as income.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **$75,000 salary**, a **10% contribution**, a **50% employer match up to 6%**, a **$25,000 current balance**, a **7% return**, and **30 years** to retirement. You contribute **$7,500 a year**; your employer adds **$2,250 a year** (50% of the 6% of salary that qualifies for the match). Together that is **$812.50 a month** going into the account.",
        "After 30 years the projected balance is **$1,194,138.87**. Your own contributions total $225,000 and the employer match totals **$67,500** — on top of the $25,000 starting balance, the remaining **$876,638.87** is investment growth.",
        "The match alone is worth far more than $67,500, because it compounds too. Run the same numbers without any employer match and the balance is **$965,394.31** — the match adds **$228,744.56**. Turning down the full match is the most expensive mistake in retirement saving.",
      ],
    },
    {
      heading: "Getting the most from your 401(k)",
      paragraphs: [
        "The first rule is simple: **contribute at least enough to get the full employer match**. It is an immediate 50–100% return on that part of your contribution, before any investment growth, and no investment can reliably beat it.",
        "Beyond the match, the IRS sets an annual limit on employee contributions: **$24,500 for 2026** if you are under 50, or **$32,500 if you are 50 or older** (with an $8,000 catch-up contribution; $35,750 for ages 60–63 with the higher $11,250 catch-up). These limits are adjusted for inflation, so check the current IRS figures each year — this calculator does not enforce the limit, so it is up to you to stay within it.",
        "Finally, remember what the projection assumes: a steady 7% return, a constant salary, and no withdrawals. Real returns vary year to year, and borrowing from a 401(k) or cashing out when changing jobs can undo years of growth. Use this calculator to test scenarios — a higher contribution rate, an extra five years — and let the numbers show which lever matters most.",
      ],
    },
  ],

  "ira-calculator": [
    {
      heading: "Traditional vs Roth: the same growth, different tax timing",
      paragraphs: [
        "A Traditional IRA and a Roth IRA invest in exactly the same way — the difference is **when you pay tax**. Traditional contributions may be tax-deductible now, and you pay income tax when you withdraw in retirement. Roth contributions are made with after-tax money, and qualified withdrawals in retirement are **tax-free**.",
        "This calculator grows both accounts with the same formula — **FV = Balance × (1+r)ⁿ + (Annual Contribution ÷ 12) × [(1+r)ⁿ − 1] / r**, compounded monthly — and then shows the after-tax result for each: the Roth keeps the full balance, while the Traditional balance is reduced by your expected retirement tax rate, **FV × (1 − Tax Rate)**.",
        "One thing the comparison does not model: the **upfront tax deduction** a Traditional contribution may give you today. If your Traditional contributions are deductible, that tax saving is real money too — the calculator's Traditional figure shows only the withdrawal side of the deal.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Start with a **$15,000 balance**, contribute **$6,500 a year** ($541.67 a month), earn **7%**, and retire in **30 years** with an expected retirement tax rate of **22%**. The projected balance is **$782,565.08**.",
        "In a **Roth IRA** you keep all of it: **$782,565.08**, tax-free. In a **Traditional IRA** the same balance is worth **$610,400.77 after tax** at 22% — a difference of **$172,164.31**. That gap is the price of paying tax later instead of now, before counting any deduction the Traditional contributions earned along the way.",
        "Your total contributions over 30 years are **$210,000** ($15,000 starting balance plus $6,500 × 30), so **$572,565.08** of the final balance is investment growth. Raising the contribution to the 2026 maximum of **$7,500 a year** ($625 a month) lifts the balance to **$884,229.33** — an extra **$101,664.25** from just $1,000 more a year.",
      ],
    },
    {
      heading: "Choosing and funding your IRA",
      paragraphs: [
        "The Roth-vs-Traditional decision comes down to one question: **will your tax rate be higher now or in retirement?** Early in your career, when your rate is low, Roth usually wins — you pay a small tax now for decades of tax-free growth. Near peak earnings, the Traditional deduction may be worth more.",
        "For 2026, the IRS limit is **$7,500 a year if you are under 50, or $8,600 if you are 50 or older** (a $1,100 catch-up) — combined across all your Traditional and Roth IRAs, and capped at your taxable compensation for the year. Roth contributions also have income limits, so check the current IRS figures if your income is high.",
        "You can contribute for a tax year until the **tax-filing deadline the following April**, which gives you extra months to top up. But the strongest habit is the simplest: set up an automatic monthly contribution — $625 a month hits the 2026 maximum exactly — and let compounding do the heavy work.",
      ],
    },
  ],

  "present-value-calculator": [
    {
      heading: "Why a dollar tomorrow is worth less than a dollar today",
      paragraphs: [
        "Money available today can be invested and earn returns, so a sum promised in the future is worth less than the same sum in hand now. **Present value** puts a number on that difference: it is what a future payment is worth in today's dollars.",
        "The formula is **PV = FV / (1 + r)ⁿ**, where FV is the future amount, r is the discount rate per year, and n is the number of years. The discount rate is your **opportunity cost** — the return you could earn elsewhere — so it should reflect a realistic alternative investment, not a guess.",
        "The calculator also shows the **discount amount** (how much value time strips away) and the **discount factor** (PV ÷ FV) — the fraction of each future dollar that a dollar today is worth. A factor of 0.5584 means each future dollar is worth about 56 cents today.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take **$100,000 due in 10 years** at a **6%** discount rate. The present value is $100,000 ÷ 1.06¹⁰ = **$55,839.48**. Time and a 6% return strip away **$44,160.52** — nearly half the value — and the discount factor is **0.5584**.",
        "The rate you choose changes the answer dramatically. At **3%** the same $100,000 is worth **$74,409.39** today; at **9%** it is worth only **$42,241.08**. A 6-point difference in the discount rate nearly halves the present value, which is why the rate deserves more thought than any other input.",
        "You can check the result by running it forward: **$55,839.48 × 1.06¹⁰ = $100,000.00**. Present value and future value are the same idea in opposite directions — discounting back and compounding forward meet in the middle.",
      ],
    },
    {
      heading: "Where present value is used",
      paragraphs: [
        "Present value is the tool for comparing money that arrives at **different times**. Should you take a lump sum or annual payments? Is a bond fairly priced? Is a business investment worth its upfront cost? Each question is answered by discounting every future cash flow to today and comparing.",
        "The classic everyday case is a **lottery or settlement payout**: a $1 million prize paid over 20 years is worth far less than $1 million today, and the lump-sum offer is usually close to the present value at the payer's discount rate. Run both options through this calculator before choosing.",
        "Be honest about the discount rate. Using an optimistic 12% makes every future payment look cheap and every long-term project look bad; using 2% does the opposite. For personal decisions, your expected long-term investment return — or the interest rate on your debt, if you would use the money to pay it down — is usually the right starting point.",
      ],
    },
  ],

  "cagr-calculator": [
    {
      heading: "What CAGR measures",
      paragraphs: [
        "The compound annual growth rate (CAGR) is the **steady yearly rate** that would have grown an investment from its starting value to its ending value, assuming smooth compounding. Real investments bounce around; CAGR draws the straight line through the noise.",
        "The formula is **CAGR = (Ending Value ÷ Beginning Value)^(1 ÷ Years) − 1**. It is a geometric average, which means it accounts for compounding — the return each year applies to a balance that already includes earlier gains.",
        "That is what makes CAGR useful for comparisons. Two investments over different periods, or with different starting amounts, can be judged on a single number: the annualized rate. This calculator also shows the **total return**, the **absolute gain**, and the **growth multiple** (ending ÷ beginning) so you can see the result in several ways at once.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "An investment grows from **$10,000 to $25,000 over 5 years**. The CAGR is (25,000 ÷ 10,000)^(1/5) − 1 = **20.11% a year**. The total return is **150%**, the absolute gain is **$15,000**, and the growth multiple is **2.50×**.",
        "Check it by compounding forward: **$10,000 × 1.2011⁵ = $25,000.00**. Each year's 20.11% applies to the growing balance, not to the original $10,000 — that is why five years at 20.11% produces a 150% total return, not 100.55%.",
        "CAGR also exposes why a simple average of yearly returns misleads. An investment that gains **50% one year and loses 50% the next** averages 0% — but $100 becomes $150, then **$75**, a 25% loss. The CAGR over those two years is **−13.40%**, which tells the truth about your money.",
      ],
    },
    {
      heading: "Using CAGR to compare investments",
      paragraphs: [
        "CAGR shines when periods differ. A 60% gain over 3 years (16.96% CAGR) beats an 80% gain over 5 years (12.47% CAGR) — but you would never see that from the totals alone. Whenever two options cover different time spans, annualize before comparing.",
        "What CAGR cannot show is **risk**. Two investments with the same CAGR can have completely different rides — one a smooth climb, the other a rollercoaster that happened to end at the same place. Always pair CAGR with a look at volatility, especially for money you might need soon.",
        "Finally, be careful annualizing short periods. A 10% gain in one month is not a 213% CAGR you can count on — the formula is exact, but extrapolating a lucky month across a year is not. CAGR is most honest over multi-year periods, where the compounding it measures has actually had time to work.",
      ],
    },
  ],

  "net-worth-calculator": [
    {
      heading: "What net worth actually measures",
      paragraphs: [
        "Your net worth is a single snapshot of your financial position: **Net Worth = Total Assets − Total Liabilities**. Assets are everything you own — cash and savings, investments, property at current market value, vehicles, and other valuables. Liabilities are everything you owe — mortgage, car loans, student loans, and credit card balances.",
        "It is a stock, not a flow: income tells you what comes in each month, but net worth tells you **what you have kept**. Two people with the same salary can have very different net worths, and the difference is almost always spending and debt, not earnings.",
        "This calculator also shows your **debt-to-asset ratio** — total liabilities divided by total assets. It answers a useful question: how much of what you own is funded by debt? A ratio of 50% means half your assets are effectively owned by your lenders.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Add up the assets: **$25,000** in cash and savings, **$100,000** in investments, a home worth **$350,000**, and **$30,000** in other assets — a total of **$505,000**. Now the liabilities: a **$250,000** mortgage and **$15,000** in other debts — a total of **$265,000**.",
        "Net worth is $505,000 − $265,000 = **$240,000**. The debt-to-asset ratio is $265,000 ÷ $505,000 = **52.48%** — just over half of the assets are debt-funded, mostly through the mortgage.",
        "Notice how much of the net worth sits in the home: $100,000 of home equity ($350,000 value minus $250,000 mortgage) is nearly half the total. That is normal for homeowners, but home equity is **illiquid** — it is real wealth you cannot spend without selling or borrowing against the house.",
      ],
    },
    {
      heading: "Growing your net worth",
      paragraphs: [
        "Net worth grows through two levers: **grow assets** and **shrink liabilities**. Saving and investing raise the asset side; paying down debt raises net worth dollar for dollar on the liability side, with the bonus of cutting future interest.",
        "Check your net worth **every few months**, not every day. Markets move, home values shift, and a single reading is noise — the trend over a year or two is the signal. If the number is climbing steadily, your financial habits are working even when it does not feel like it.",
        "If your net worth is negative, that is a starting point, not a verdict — it is common early in a career with student loans or a new mortgage. The most powerful early move is usually attacking the **highest-interest debt** while building a small emergency fund, then shifting the freed-up payments into investing once the expensive debt is gone.",
      ],
    },
  ],

  "emergency-fund-calculator": [
    {
      heading: "How big should your emergency fund be?",
      paragraphs: [
        "An emergency fund is cash set aside for the expenses life does not warn you about — a job loss, a medical bill, a car repair. Its size is measured in **months of expenses, not months of income**, because expenses are what the fund has to cover: **Target = Monthly Expenses × Months of Coverage**.",
        "The standard guidance is **3–6 months of expenses** for someone with stable employment, and **6–12 months** for freelancers, the self-employed, or single-income households, where income is less predictable. A homeowner with an older house or an older car may reasonably aim higher than a renter with a steady paycheck.",
        "This calculator works from your monthly expenses, the months of coverage you want, and what you have already saved. It shows your target, your progress as a percentage, the remaining gap, and the monthly amount needed to close that gap in 12 months.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "With **$4,000 a month** in expenses and **6 months** of coverage, the target is $4,000 × 6 = **$24,000**. If you already have **$5,000** saved, you are **20.83%** of the way there, with a gap of **$19,000**.",
        "To close that gap in 12 months, you would need to save **$1,583.33 a month**. That is a steep number — which is why the timeline matters as much as the target. Spread over 24 months it is $791.67 a month, and over 36 months just $527.78.",
        "The coverage choice moves the target just as much. Three months of the same expenses needs only **$12,000**, while twelve months needs **$48,000**. Start with the smallest target you can actually reach — a funded 3-month cushion beats an aspirational 12-month one you never start.",
      ],
    },
    {
      heading: "Building and keeping the fund",
      paragraphs: [
        "Keep the money in a **high-yield savings account**, separate from your everyday spending money and reachable within a day or two. It should not be invested in the stock market — the point of an emergency fund is that the full amount is there exactly when you need it, even in a downturn, when job losses and market falls tend to arrive together.",
        "**Automate the transfer.** A fixed amount moving to the savings account on payday beats good intentions at the end of the month, and even a small amount builds the habit. Windfalls — tax refunds, bonuses, sold items — are the fastest way to jump-start a fund from zero.",
        "When you use the fund, that is success, not failure — it did its job. The only rule is to **rebuild it afterwards**, starting with the next paycheck, before the spending it protected creeps back. An emergency fund you refill is a permanent safety net; one you spend and forget is a one-time rescue.",
      ],
    },
  ],

  "income-tax-calculator": [
    {
      heading: "How progressive tax brackets work",
      paragraphs: [
        "The US federal income tax is **progressive**: income is taxed in slices, and each slice is taxed at its own rate. Only the income inside a bracket is taxed at that bracket's rate — moving into a higher bracket never raises the tax on the income below it.",
        "That is why two different rates matter. Your **marginal rate** is the rate on your last dollar of income; your **effective rate** is your total tax divided by your total income, and it is always lower than your marginal rate. Confusing the two is the most common tax misunderstanding there is.",
        "This calculator applies the **2024 federal brackets** (10%, 12%, 22%, 24%, 32%, 35%, 37%) for single filers and married couples filing jointly, to the **taxable income** you enter — that is, your income after deductions. It covers federal income tax only: no state tax, no Social Security or Medicare payroll tax, and no head-of-household or married-filing-separately options. The IRS adjusts the bracket thresholds for inflation each year, so for a current-year estimate check the latest IRS figures.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take **$75,000 of taxable income as a single filer**, using this calculator's 2024 brackets. The first $11,600 is taxed at 10% (**$1,160**); the next $35,550 (up to $47,150) at 12% (**$4,266**); and the remaining $27,850 (up to $75,000) at 22% (**$6,127**). Total federal tax: **$11,553**.",
        "The **marginal rate is 22%**, but the **effective rate is only 15.40%** ($11,553 ÷ $75,000) — because most of the income was taxed at 10% and 12%. After-tax income is **$63,447**. The same $75,000 as a married couple filing jointly owes **$8,536** — an 11.38% effective rate and a 12% marginal rate — because the joint brackets are roughly twice as wide.",
        "For context, under the IRS's **2026 brackets** the same single filer would owe **$11,212** instead of $11,553 — the thresholds rise with inflation each year (the top of the 10% single bracket is $12,400 for 2026, versus $11,600 for 2024). This calculator's 2024-based figure is therefore a close estimate, not a filing-year number.",
      ],
    },
    {
      heading: "Using your tax estimate",
      paragraphs: [
        "The most practical use of this calculator is a **withholding check**. Compare its tax figure with what your employer withholds over the year: a big gap in either direction means a surprise refund or an unwelcome bill at filing time, and either can be fixed by adjusting your W-4.",
        "Remember the input is **taxable income**, not gross pay. Most filers take the standard deduction — **$16,100 for single filers and $32,200 for married couples filing jointly in 2026** — so a single filer earning $91,100 gross with no other adjustments has about $75,000 of taxable income. Pre-tax retirement contributions reduce it further, which is one reason 401(k) and Traditional IRA contributions lower your tax bill.",
        "Use the result as a planning estimate, not a filing figure. Deductions, credits, capital gains, and state taxes all sit outside this calculator, and the brackets themselves move every year. For the final number, the IRS figures for the relevant tax year — or a tax professional — are the authority.",
      ],
    },
  ],

  "daily-calorie-needs-calculator": [
    {
      heading: "How daily calorie needs are calculated",
      paragraphs: [
        "Your daily calorie need starts with your **basal metabolic rate (BMR)** — the energy your body burns at complete rest to keep you alive: breathing, circulation, body temperature. This calculator uses the **Mifflin-St Jeor equation**, the formula most dietitians consider the best validated for healthy adults: for men, BMR = 10 × weight (kg) + 6.25 × height (cm) − 5 × age + 5; for women, the same formula ends in − 161 instead of + 5.",
        "BMR alone is not what you eat in a day, because you are not lying still all day. Multiplying BMR by an **activity factor** gives your **total daily energy expenditure (TDEE)**: 1.2 for sedentary, 1.375 lightly active, 1.55 moderately active, 1.725 very active, and 1.9 super active. Your goal then adjusts the target: **−500 calories a day to lose weight, +500 to gain**, and no adjustment to maintain.",
        "The calculator also suggests a protein target of **30% of your daily calories**, divided by 4 calories per gram of protein. Protein is highlighted because it protects muscle while you lose weight and keeps you fuller than the same calories from carbs or fat.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        // Verified: BMR = 650 + 1031.25 − 150 − 161 = 1370.25 → 1370; TDEE = 1370.25 × 1.55 = 2123.89 → 2124.
        "Take a **30-year-old woman weighing 65 kg at 165 cm**, moderately active, maintaining her weight. Her BMR = 10 × 65 + 6.25 × 165 − 5 × 30 − 161 = 650 + 1,031.25 − 150 − 161 = **1,370 calories**. Multiply by the moderate activity factor 1.55 and her TDEE is **2,124 calories a day**.",
        // Verified: lose 2124 − 500 = 1624; gain 2124 + 500 = 2624; protein (2123.89 × 0.30) ÷ 4 = 159.29 → 159 g.
        "With the goal set to maintain, her daily target is **2,124 calories**; switching to weight loss drops it to **1,624**, and weight gain raises it to **2,624**. Her protein suggestion is 2,124 × 0.30 ÷ 4 = **159 g per day**.",
      ],
    },
    {
      heading: "Using your number without overthinking it",
      paragraphs: [
        "Treat the result as a **starting point, not a prescription**. The Mifflin-St Jeor equation is accurate to roughly ±10% for most people, so the honest way to use it is to eat at your target for two to three weeks, watch the trend on the scales, and adjust by 100–200 calories if your weight is not moving the way you want.",
        "Two common mistakes: **adding exercise calories on top of TDEE** (your activity factor already includes your workouts, so counting them again double-counts them) and **eating far below your BMR** for long stretches, which risks fatigue and nutrient gaps. This calculator gives general information, not medical advice — if you have a health condition, are pregnant, or want a personalised plan, talk to a clinician or registered dietitian.",
      ],
    },
  ],

  "heart-rate-calculator": [
    {
      heading: "Maximum heart rate and the Karvonen zones",
      paragraphs: [
        "Your **maximum heart rate** is the fastest your heart can beat during all-out effort, and it declines with age. This calculator estimates it with the classic formula **max HR = 220 − age** — a population average that is simple and widely used, though any individual's true maximum can differ by 10 or more beats per minute.",
        "The training zones then use the **Karvonen method**, which is more personal than a plain percentage of max heart rate. It starts from your **heart rate reserve (HRR)** — max HR minus resting HR — and applies each zone's percentage to that reserve before adding resting HR back: **zone = HRR × % + resting HR**. Because your resting heart rate is in the formula, two people the same age get different zones if their fitness differs.",
        "The three zones the calculator shows are **fat burn (60–70%)**, the steady effort where a high share of energy comes from fat; **cardio (70–80%)**, the moderate-to-hard range that builds endurance; and **peak (80–90%)**, short hard efforts that push your ceiling.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        // Verified: maxHR = 220 − 40 = 180; HRR = 180 − 65 = 115.
        "Take a **40-year-old with a resting heart rate of 65 bpm**. Max HR = 220 − 40 = **180 bpm**, and heart rate reserve = 180 − 65 = **115 bpm**.",
        // Verified: 60% → 134; 70% → 145.5 → 146; 80% → 157; 90% → 168.5 → 169 (JS Math.round).
        "The zones follow from the Karvonen formula: fat burn is 115 × 0.60 + 65 = **134 bpm** up to 115 × 0.70 + 65 = **146 bpm**; cardio runs **146–157 bpm**; and peak runs **157–169 bpm**. Notice the zones share their boundary numbers — 146 bpm is both the top of fat burn and the bottom of cardio — because each boundary is the same percentage applied once.",
      ],
    },
    {
      heading: "Training in the right zone",
      paragraphs: [
        "Most weekly training belongs in the **fat-burn and cardio zones**: they are sustainable for 30–60 minutes, and you should still be able to speak in short sentences. Peak-zone work is best kept to short intervals with recovery between them, and it is not where a session should start — warm up in the lower zones first.",
        "Use a **heart rate monitor or watch** rather than guessing by feel; perceived effort drifts as you tire, and heat and dehydration push heart rate up for the same pace. If you are new to exercise, have a heart condition, or take medication that affects heart rate, check with a clinician before training in the higher zones — these figures are general guidance, not medical advice.",
      ],
    },
  ],

  "target-heart-rate-calculator": [
    {
      heading: "The Karvonen formula, step by step",
      paragraphs: [
        "A target heart rate is the range your heart should be beating in for a chosen exercise intensity. This calculator uses the **Karvonen formula: target HR = HRR × intensity% + resting HR**, where **HRR (heart rate reserve)** is your maximum heart rate minus your resting heart rate.",
        "Maximum heart rate is estimated as **220 − age**, so HRR is 220 − age − resting HR. Working from the reserve rather than from max HR alone is what makes the result personal: a fit person with a low resting heart rate gets a wider reserve and a higher target range than someone the same age with a higher resting rate.",
        "You choose the intensity range yourself. Roughly, **50–60%** is light exercise and warm-ups, **60–70%** is moderate, and **70–85%** is vigorous. The calculator converts whatever range you enter into beats per minute.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        // Verified: maxHR = 220 − 35 = 185; HRR = 185 − 70 = 115.
        "Take a **35-year-old with a resting heart rate of 70 bpm**, training at **60–80%** intensity. Max HR = 220 − 35 = **185 bpm**, and heart rate reserve = 185 − 70 = **115 bpm**.",
        // Verified: low 115 × 0.60 + 70 = 139; high 115 × 0.80 + 70 = 162; 50% → 127.5 → 128.
        "The low end is 115 × 0.60 + 70 = **139 bpm**; the high end is 115 × 0.80 + 70 = **162 bpm**. So the target range is **139–162 bpm**. For comparison, a 50% warm-up floor for the same person would be 115 × 0.50 + 70 = **128 bpm**.",
      ],
    },
    {
      heading: "Picking an intensity range",
      paragraphs: [
        "If you are just starting out, begin at **50–60%** and stay there for a few weeks — it builds the habit without exhausting you. Move to **60–70%** when easy sessions feel genuinely easy, and save **70–85%** for days when you are rested and warmed up.",
        "Remember the 220 − age estimate can be off by 10 beats or more for an individual, so treat the range as a guide and cross-check with how you feel: at moderate intensity you can talk but not sing; at vigorous intensity you can only manage a few words at a time. If you have a heart condition or are returning to exercise after illness, ask a clinician what intensity is safe for you.",
      ],
    },
  ],

  "period-calculator": [
    {
      heading: "How period prediction works",
      paragraphs: [
        "This calculator predicts future periods with the simplest reliable rule: **next period = last period start + cycle length**. Enter the first day of your last period and your average cycle length, and it projects the next three periods.",
        "A **cycle** is counted from the first day of one period to the first day of the next. The textbook average is **28 days**, and a normal range is roughly **21–35 days**. The prediction assumes your cycles are regular — the same length each month — which is why the result is an estimate, not a guarantee.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        // Verified with JS Date: Jan 15 2026 + 28d = Feb 12 2026; +28d = Mar 12 2026; +28d = Apr 9 2026.
        "Suppose your last period started on **January 15, 2026** and your cycle is **28 days**. Add 28 days and the next period is predicted for **February 12, 2026**; add another 28 and the following one falls on **March 12, 2026**; a third cycle lands on **April 9, 2026**.",
        // Verified: Jan 15 2026 + 30d = Feb 14 2026.
        "With a **30-day cycle** from the same start date, the next period would instead be **February 14, 2026** — a two-day difference in cycle length moves every prediction by two days, which shows why knowing your own average matters more than the textbook 28.",
      ],
    },
    {
      heading: "Why predictions drift — and when to ask a clinician",
      paragraphs: [
        "Real cycles vary by a few days from month to month, and stress, illness, travel, and hormonal changes can shift a period further. The further ahead a prediction reaches, the more that uncertainty adds up, so treat the third date as a rough guide rather than a plan.",
        "One thing to know about this tool: it asks for your **period duration**, but the predicted dates depend only on the last period's start date and your cycle length — the duration does not change the results. And this calculator predicts period dates only; it is not a fertility or contraception tool. If your cycles are consistently irregular, very heavy, very painful, or you miss periods, talk to a clinician.",
      ],
    },
  ],

  "bac-calculator": [
    {
      heading: "The Widmark formula behind the estimate",
      paragraphs: [
        "Blood alcohol content (BAC) is the percentage of alcohol in your bloodstream. This calculator uses the **Widmark formula: BAC = (alcohol in grams ÷ (body weight in grams × r)) × 100 − 0.015 × hours**. The factor **r** reflects the share of body weight that is water: **0.68 for men and 0.55 for women**, which is why the same drinks produce a higher BAC in a woman than in a man of the same weight.",
        "Each **standard drink** counts as **14 grams of pure alcohol** — the US definition, roughly a 12 oz beer, a 5 oz glass of wine, or a 1.5 oz shot of spirits. The final term, **0.015% per hour**, is the average rate the liver clears alcohol; the calculator subtracts it for every hour since your first drink.",
        "The result is labelled with a status: **minimal effects** above 0%, **mildly impaired** above 0.04%, and **legally impaired** above 0.08% — the legal driving limit in most US states. It also estimates the **time to sober** by dividing your current BAC by 0.015.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        // Verified: 56 g; 56 ÷ (80000 × 0.68) × 100 = 0.10294 → 0.103; − 0.015 × 2 = 0.07294 → 0.073%. Sober: 0.07294 ÷ 0.015 = 4.86 → 4.9 h.
        "Take an **80 kg man who has had 4 standard drinks over 2 hours**. The alcohol is 4 × 14 = **56 g**. Plugging in: 56 ÷ (80,000 × 0.68) × 100 = **0.103%** before metabolism, minus 0.015 × 2 = 0.03 for the two hours, giving an estimated BAC of **0.073%** — 'mildly impaired', below the 0.08% legal limit but far from sober.",
        // Verified: 60 kg woman, 2 drinks, 1 h: 28 ÷ (60000 × 0.55) × 100 = 0.0848 − 0.015 = 0.0698 → 0.070%.
        "Time to sober is 0.073 ÷ 0.015 ≈ **4.9 hours** from now. For contrast, a **60 kg woman having 2 drinks in 1 hour** reaches about **0.070%** — nearly the same BAC from half the drinks, because of the lower body weight and the 0.55 factor.",
      ],
    },
    {
      heading: "What this estimate can't do",
      paragraphs: [
        "This is an **estimate, not a measurement**. Food, medication, drink strength, body composition, and individual metabolism all shift real BAC, and impairment begins well below 0.08% — reaction time and judgement are affected long before you feel drunk.",
        "Nothing speeds up sobering: **coffee, food, cold air, and exercise do not help** — only time clears alcohol. Never drive after drinking, however low the number looks, and never treat this calculator's result as a legal defence or a reason to drive. If you are worried about your drinking, a clinician can help without judgement.",
      ],
    },
  ],

  "healthy-weight-calculator": [
    {
      heading: "The healthy BMI range, in kilograms",
      paragraphs: [
        "This calculator turns the standard **healthy BMI range (18.5–24.9)** into a weight range for your height, using the BMI definition in reverse: **weight = BMI × height (m)²**. The low end uses 18.5, the high end 24.9, and the midpoint is the average of the two.",
        "BMI bands come from large population studies linking weight-for-height to health risk: below 18.5 is classed underweight, 18.5–24.9 healthy, 25–29.9 overweight, and 30 or above obese. The calculator also converts the range to pounds (multiplying by 2.205) for anyone who thinks in imperial units.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        // Verified: 1.7² = 2.89; 18.5 × 2.89 = 53.465 → 53.5; 24.9 × 2.89 = 71.961 → 72.0; mid 62.713 → 62.7; lbs 117.89 → 118, 158.67 → 159.
        "At **170 cm** tall, height in metres squared is 1.7 × 1.7 = **2.89**. The healthy range is 18.5 × 2.89 = **53.5 kg** up to 24.9 × 2.89 = **72.0 kg**, with a midpoint of **62.7 kg** — or **118–159 lbs**.",
        // Verified: 180 cm: 18.5 × 3.24 = 59.94 → 59.9; 24.9 × 3.24 = 80.676 → 80.7. Deltas: +6.4 low, +8.7 high.
        "Height changes the range more than most people expect: at **180 cm** the same band gives **59.9–80.7 kg**. That is because weight scales with the square of height — ten extra centimetres adds about 6–9 kg to the range.",
      ],
    },
    {
      heading: "What to do with your range",
      paragraphs: [
        "Use the range as a **screening result, not a verdict**. BMI cannot tell muscle from fat, so a muscular athlete can sit above the range while being very lean, and an older adult can sit inside it while losing muscle. Waist measurement, body-fat percentage, and how you move and feel all add context the number alone cannot.",
        "If you are outside the range and unsure why — or if you are thinking about changing your weight — a clinician or dietitian can interpret the number with your full health picture. Small, steady changes beat crash diets, and this calculator gives general information, not medical advice.",
      ],
    },
  ],

  "ph-calculator": [
    {
      heading: "What pH really means",
      paragraphs: [
        "pH is a compact way to describe how acidic or basic a solution is: **pH = −log₁₀[H⁺]**, the negative base-10 logarithm of the hydrogen ion concentration in moles per litre. Because the scale is logarithmic, **each whole pH unit is a 10-fold change** — a solution at pH 3 has ten times the hydrogen ions of one at pH 4.",
        "The scale runs from 0 to 14 at room temperature: **below 7 is acidic, 7 is neutral, above 7 is basic** (alkaline). The calculator also reports **pOH = −log₁₀[OH⁻]**, and at 25°C the two always add up: **pH + pOH = 14**, so knowing one gives you the other.",
        "It works in both directions: enter a hydrogen ion concentration to get pH and pOH, or enter a pH to get [H⁺] and [OH⁻] back. A concentration of zero or less has no pH, so the calculator asks for a positive value.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        // Verified: −log10(0.001) = 3.0000; pOH = 14 − 3 = 11.0000.
        "Take a solution with **[H⁺] = 0.001 mol/L**. pH = −log₁₀(0.001) = −(−3) = **3.0000**, and pOH = 14 − 3 = **11.0000** — clearly acidic.",
        // Verified: pH 9 → [H⁺] = 1.0000e-9, [OH⁻] = 1.0000e-5; pH 4.5 → [H⁺] = 3.1623e-5 (toExponential(4)).
        "Going the other way, a solution at **pH 9** has [H⁺] = 10⁻⁹ = **1.0000e-9 mol/L** and [OH⁻] = 10⁻⁵ = **1.0000e-5 mol/L** — basic, with far more hydroxide than hydrogen ions. A mildly acidic solution at **pH 4.5** has [H⁺] = **3.1623e-5 mol/L**.",
      ],
    },
    {
      heading: "pH in everyday life",
      paragraphs: [
        "Everyday chemistry sits all over the scale: **lemon juice is around pH 2**, vinegar around 2.5, black coffee around 5, pure water 7, baking soda solution around 9, and household bleach around 12–13. The numbers explain the behaviour — the acidity of vinegar is what makes it a cleaner and a preservative.",
        "Two things to keep in mind: the pH + pOH = 14 relationship holds at **25°C** and shifts slightly at other temperatures, and real-world pH is usually measured with a meter or indicator paper rather than calculated — this tool is for converting between pH and concentration, for homework, lab prep, and quick checks.",
      ],
    },
  ],

  "business-days-calculator": [
    {
      heading: "How business days are counted",
      paragraphs: [
        "A **business day** is a weekday — Monday to Friday. This calculator walks day by day from your start date to your end date, counting weekdays as business days and Saturdays and Sundays as weekend days.",
        "Two details matter. First, **both the start and end dates are counted** if they fall on weekdays, so a Monday-to-Friday span counts 5 business days, not 4. Second, **public holidays are not excluded** — they vary by country and are not part of the count, so subtract them yourself if your deadline crosses one.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        // Verified by re-running the tool's loop: Jan 6 2025 (Mon) → Jan 31 2025 (Fri): 20 biz, 6 weekend, totalDays diff 25, work weeks 4.0.
        "Take **Monday, January 6 to Friday, January 31, 2025**. The span covers four full working weeks, and the calculator counts **20 business days** and **6 weekend days** — the three Saturdays and Sundays in between — which converts to **4.0 work weeks** (20 ÷ 5).",
        "The **total calendar days** figure shows **25**, which is the difference between the two dates. The business and weekend counts add to 26 because both endpoints are included in the day-by-day count — the difference is the inclusive counting, not an error in the weekday tally.",
      ],
    },
    {
      heading: "Planning with business days",
      paragraphs: [
        "Business-day counts are the currency of **deadlines, notice periods, delivery estimates, and leave planning**. A '10 business day' turnaround starting on a Monday lands two Fridays later, not ten calendar days later — the distinction is worth two weekend days every week.",
        "For anything official, remember the two gaps: **add back any public holidays** in the span, and check whether your contract or employer counts the start day. This calculator counts it; some agreements do not, and that one day is the most common source of off-by-one deadline disputes.",
      ],
    },
  ],

  "add-subtract-days-calculator": [
    {
      heading: "Adding days across months and leap years",
      paragraphs: [
        "Adding days to a date sounds trivial until the span crosses a month boundary, a year boundary, or a leap-year February. This calculator does **true calendar arithmetic**: it advances the date day by day through the real calendar, so month lengths and leap years are handled automatically.",
        "The direction is controlled by the sign: a **positive number adds days**, a **negative number subtracts them**. The result shows the new date, the **day of the week** it falls on, and the span restated in **whole weeks plus leftover days**.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        // Verified with JS Date: Jan 1 2025 + 90d = April 1, 2025 (Tuesday); 90 = 12 weeks + 6 days.
        "Start on **January 1, 2025** and add **90 days**. Counting through January (31 days), February (28 days in 2025, not a leap year), and into March and April lands on **April 1, 2025 — a Tuesday**. The span restates as **12 weeks and 6 days** (12 × 7 = 84, plus 6).",
        // Verified: Jan 1 2025 − 90d = October 3, 2024.
        "Subtracting works the same way: January 1, 2025 minus 90 days is **October 3, 2024**. The result date and weekday are exact in both directions.",
      ],
    },
    {
      heading: "Everyday uses for date arithmetic",
      paragraphs: [
        "The classic uses are **deadlines and notice periods** ('90 days from today'), **warranty and return windows**, **travel planning** ('what date is 14 days before my flight?'), and **countdowns** to events. The day-of-week output matters as much as the date — a deadline landing on a Sunday is a different problem from one landing on a Tuesday.",
        "One thing to know: the **weeks breakdown is exact for days you add**; for subtracted (negative) day counts, use the result date itself rather than the weeks figure. And if your span crosses February in a leap year, the calculator adds the extra day automatically — 2028 is the next leap year after 2024.",
      ],
    },
  ],

  "height-calculator": [
    {
      heading: "The mid-parental height method",
      paragraphs: [
        "A child's adult height is strongly influenced by their parents' heights, and the standard clinical shortcut is the **mid-parental height method**: average both parents' heights, then adjust for the child's sex. For a **boy: (father + mother + 13) ÷ 2**. For a **girl: (father + mother − 13) ÷ 2**.",
        "The **13 cm** is the average adult height difference between men and women, split by the averaging into a ±6.5 cm adjustment. The result is a **target height** — the centre of the range a child is most likely to land in — and the calculator shows a **±5 cm range** around it, which covers about half of children.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        // Verified: boy (180+168+13)/2 = 180.5 cm = 5'11" (180.5/30.48 = 5.922 ft; 0.922×12 = 11.06 → 11); range 175.5→176, 185.5→186. Girl (180+168−13)/2 = 167.5 cm = 5'6"; range 162.5→163, 172.5→173.
        "Take a father who is **180 cm** and a mother who is **168 cm**. For a boy: (180 + 168 + 13) ÷ 2 = 361 ÷ 2 = **180.5 cm**, or **5'11\"**, with a range of **176–186 cm**. For a girl with the same parents: (180 + 168 − 13) ÷ 2 = 335 ÷ 2 = **167.5 cm**, or **5'6\"**, with a range of **163–173 cm**.",
        "The 13 cm between the two predictions is exactly the sex adjustment in the formula — same parents, same genes, but the average height difference between adult men and women shifts the target.",
      ],
    },
    {
      heading: "What the prediction can't capture",
      paragraphs: [
        "Parents' heights explain a lot, but not everything. **Nutrition, childhood health, the timing of puberty, and genes from the wider family** all move the final result, which is why the ±5 cm band covers only about half of children — the other half land further from the target in either direction.",
        "Use the prediction as a rough guide, not a verdict on a child's growth. If growth seems unusually fast or slow, or a child drops across centile lines on a growth chart, a paediatrician can assess it properly. One display note: the feet-and-inches figure is rounded to the nearest inch, so at a few heights the rounding can show 12 inches — for example, 182 cm displays as 5'12\" — which simply means 6'0\".",
      ],
    },
  ],

  "percentage-increase-calculator": [
    {
      heading: "How percentage increase works",
      paragraphs: [
        "A percentage increase expresses growth **relative to where you started**. A $5,000 raise means something very different on a $25,000 salary than on a $100,000 one — the percentage puts the change in proportion, which is why raises, price rises, and investment gains are almost always quoted this way.",
        "The formula is **% increase = ((New − Original) ÷ Original) × 100**. First find the absolute increase (new minus original), then divide by the original value to see how big the change is relative to the starting point, then multiply by 100 to turn it into a percentage. The **original value is always the denominator** — that is the part people most often get wrong.",
        "This calculator shows both results: the **percentage increase** (the headline number) and the **absolute increase** (the raw difference). A negative percentage means the value actually fell — the tool does not stop you entering a smaller 'new' value, so check the sign if the result surprises you.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A salary rises from **$50,000 to $55,000**. The absolute increase is $55,000 − $50,000 = **$5,000**. Divide by the original: $5,000 ÷ $50,000 = 0.10. Multiply by 100: a **10% increase**.",
        "Now compare a $5,000 raise on a $25,000 salary: $5,000 ÷ $25,000 = 0.20, a **20% increase** — twice the percentage for the same dollars. That is the whole point of the percentage: it measures the change against the starting point, not in isolation.",
      ],
    },
    {
      heading: "Where percentage increase shows up",
      paragraphs: [
        "Salary negotiations and annual reviews are the obvious case, but the same maths runs through **price inflation** (a grocery item rising from $2.00 to $2.20 is a 10% increase), **investment returns**, and **business growth** (revenue up from $40,000 to $48,000 a month is a 20% increase).",
        "One trap: **percentage increases do not add up simply**. Two consecutive 10% increases are not a 20% increase — $100 growing 10% becomes $110, then 10% again is $121, a **21% total increase**, because the second rise applies to the larger amount. Compounding works the same way in reverse for decreases.",
        "When comparing offers or tracking growth, always note the starting value alongside the percentage. A '50% increase' from a tiny base can be smaller in real terms than a '5% increase' from a large one.",
      ],
    },
  ],

  "percentage-decrease-calculator": [
    {
      heading: "How percentage decrease works",
      paragraphs: [
        "A percentage decrease measures a fall **relative to the original value**. A $16 saving on an $80 jacket and a $16 saving on a $400 coat are the same dollars but very different deals — the percentage tells you which one is the better discount.",
        "The formula is **% decrease = ((Original − New) ÷ Original) × 100**. Subtract the new value from the original to get the absolute decrease, divide by the original, and multiply by 100. As with increases, the **original value is the denominator** — using the new value instead is the most common mistake.",
        "This calculator shows the **percentage decrease** and the **absolute decrease**. If the new value is higher than the original, the result is negative — a sign you actually have an increase, and the percentage increase calculator will express it as a positive number.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A jacket drops from **$80 to $64**. The absolute decrease is $80 − $64 = **$16**. Divide by the original: $16 ÷ $80 = 0.20 — a **20% decrease**. That is the '20% off' the sale tag promises.",
        "The reverse check: 20% of $80 is $16, and $80 − $16 = **$64**. Working backwards like this is a quick way to confirm any discount before you buy.",
      ],
    },
    {
      heading: "Discounts, depreciation, and drops",
      paragraphs: [
        "Retail discounts are the everyday case, but the same calculation covers **depreciation** (a car falling from $20,000 to $17,000 has lost 15%), **weight loss**, **bill reductions**, and **falling investment values**.",
        "Watch out for the **asymmetry of percentages**: a 20% fall followed by a 20% rise does not get you back to the start. $100 down 20% is $80; 20% of $80 is only $16, so the rise takes you to **$96**, not $100. To recover a 20% drop you need a 25% rise (20 ÷ 80 = 0.25).",
        "When a store stacks discounts — say 20% off, then a further 10% off — the reductions multiply rather than add: $100 → $80 → **$72**, a 28% total saving, not 30%.",
      ],
    },
  ],

  "mean-median-mode-calculator": [
    {
      heading: "Three ways to describe the 'middle'",
      paragraphs: [
        "Mean, median, and mode are the three **measures of central tendency** — three different answers to 'what is a typical value in this data?' They often agree, but when they do not, the disagreement itself tells you something about the data.",
        "The **mean** is the arithmetic average: add all values and divide by how many there are (**mean = Σx ÷ n**). The **median** is the middle value once the data is sorted — with an even count, it is the average of the two middle values. The **mode** is the value that appears most often. This calculator also reports the **range** (highest minus lowest), a quick measure of spread.",
        "This calculator takes **five values**. That is enough for a quick classroom or homework check, but for larger data sets you would use a spreadsheet or statistics tool — the concepts are identical, only the counting gets longer.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take the values **5, 8, 8, 12, 15**. The mean is (5 + 8 + 8 + 12 + 15) ÷ 5 = 48 ÷ 5 = **9.6**. Sorted, the middle value is **8**, so the median is 8. The value 8 appears twice — more than any other — so the mode is **8**. The range is 15 − 5 = **10**.",
        "Now change the last value from 15 to 50. The mean jumps to (5 + 8 + 8 + 12 + 50) ÷ 5 = 83 ÷ 5 = **16.6**, but the median stays **8** and the mode stays **8**. One extreme value moved the mean a lot and the others not at all — that sensitivity is exactly why medians are used for house prices and incomes.",
      ],
    },
    {
      heading: "Which measure should you report?",
      paragraphs: [
        "Use the **mean** for symmetrical data with no extreme values — test scores in a typical class, for example. Use the **median** when the data is skewed or has outliers: income, house prices, and waiting times are the classic cases. Use the **mode** for categories and repeated values, such as the most common shoe size sold or the most frequent survey answer.",
        "When the mean is noticeably above the median, the data is **skewed right** — a few large values are pulling the average up. When the mean sits below the median, a few small values are dragging it down. Reporting both numbers gives a much fairer picture than either alone.",
        "If every value appears once, there is no mode — the calculator reports **'No mode'**. And if two values tie for most frequent, the data is **bimodal**; the calculator lists all tied values.",
      ],
    },
  ],

  "ratio-calculator": [
    {
      heading: "What a ratio is — and how to simplify one",
      paragraphs: [
        "A ratio compares two quantities in proportion: **12:18** says 'for every 12 of the first thing, there are 18 of the second.' Ratios show up in recipes, maps, scale models, mixing instructions, and finance — anywhere the **relationship** between two numbers matters more than the numbers themselves.",
        "To simplify a ratio, divide both sides by their **greatest common divisor (GCD)** — the largest number that divides both evenly. For 12:18 the GCD is 6, so 12 ÷ 6 = 2 and 18 ÷ 6 = 3: the simplified ratio is **2:3**. Simplified ratios are easier to read, compare, and scale.",
        "This calculator also converts the ratio to a **fraction** (2/3), a **decimal** (0.6667), and a **percentage** (66.67%) — the same relationship in three other forms. Note that the simplification step rounds decimal inputs to whole numbers first, so enter whole numbers when exact simplification matters.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Simplify **12:18**. The GCD of 12 and 18 is **6**. Dividing both sides: 12 ÷ 6 = 2 and 18 ÷ 6 = 3, so the ratio is **2:3**. As a fraction that is 2/3, as a decimal **0.6667**, and as a percentage **66.67%**.",
        "To scale it up, multiply both sides by the same number: 2:3 × 10 = **20:30**. The proportion is unchanged — a paint mix of 2 parts blue to 3 parts white gives the same colour whether you mix 2 litres with 3 or 20 litres with 30.",
      ],
    },
    {
      heading: "Ratios in everyday life",
      paragraphs: [
        "Cooking is the friendliest example: a **rice-to-water ratio of 1:2** means one cup of rice to two cups of water, whatever the cup size. Scale it to 3 cups of rice and you need 6 cups of water — the ratio does the thinking for you.",
        "Ratios also describe **odds, aspect ratios, and map scales**. A 16:9 screen, a 1:50,000 map, and a 3:1 odds quote are all ratios doing the same job: keeping two quantities in fixed proportion as the overall size changes.",
        "To split an amount by a ratio, add the parts first. Splitting $500 in the ratio 2:3 means 5 parts of $100 each: **$200 and $300**. Check the split adds back to the total — 200 + 300 = 500 — and the ratio of the shares is still 2:3.",
      ],
    },
  ],

  "circle-calculator": [
    {
      heading: "The three circle measurements",
      paragraphs: [
        "Every circle is fixed by a single number — its **radius**, the distance from the centre to the edge. From the radius, everything else follows: the **diameter** (twice the radius), the **circumference** (the distance around), and the **area** (the space inside).",
        "The formulas all use **π (pi), approximately 3.14159** — the ratio of any circle's circumference to its diameter. **Diameter = 2r**, **Circumference = 2πr** (equivalently π × diameter), and **Area = πr²**. Note the square in the area formula: doubling the radius quadruples the area.",
        "This calculator takes the **radius** and returns all three measurements at once. If you only know the diameter, halve it first; if you know the circumference, divide by 2π (about 6.283) to get the radius.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A circular garden has a **radius of 5 metres**. The diameter is 2 × 5 = **10 m**. The circumference is 2 × π × 5 = 10π = **31.4159 m** — the length of fencing needed around it. The area is π × 5² = 25π = **78.5398 m²** — the ground to plant.",
        "Double the radius to 10 m and the area becomes π × 100 = **314.1593 m²** — four times larger, not twice. That squared relationship catches people out when sizing round tables, rugs, and pizza: a 12-inch pizza has 44% more area than a 10-inch one, not 20% more.",
      ],
    },
    {
      heading: "Where circle maths is used",
      paragraphs: [
        "Circles appear whenever something is round: **fencing a garden bed** (circumference), **ordering turf or concrete for a round patio** (area), **sizing a round tablecloth** (diameter plus a drop on each side), and **measuring wheels and pipes** (circumference gives distance per revolution).",
        "Keep your units consistent — if the radius is in metres, the area comes out in **square metres** and the circumference in metres. Mixing centimetres and metres in the same calculation is the most common source of wrong answers.",
        "For rough estimates, π ≈ 3 is often good enough: a circle of radius 5 m has an area of roughly 3 × 25 = 75 m² (the exact answer is 78.54 m²). Use the calculator when the exact figure matters — ordering materials, for example — and round up slightly to allow for cutting and waste.",
      ],
    },
  ],

  "average-calculator": [
    {
      heading: "Three kinds of average",
      paragraphs: [
        "'Average' usually means the **arithmetic mean** — add the numbers and divide by how many there are. But it is only one of three standard averages, and the other two are the right tool in specific situations. This calculator shows all three so you can compare them.",
        "The **arithmetic mean** is Σx ÷ n. The **geometric mean** is the nth root of the product of all values — (Πx)^(1/n) — and it answers 'what constant rate gives the same overall growth?' The **harmonic mean** is n ÷ Σ(1/x), and it averages **rates** fairly. The three always come out in the same order: harmonic ≤ geometric ≤ arithmetic.",
        "This calculator takes **five values**. The geometric and harmonic means need positive numbers to behave — a zero turns the geometric mean to 0 and breaks the harmonic mean entirely, so for data containing zeros or negatives, the arithmetic mean is the safe choice.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "For the values **10, 20, 30, 40, 50** (sum 150): the arithmetic mean is 150 ÷ 5 = **30**. The geometric mean is the 5th root of 10 × 20 × 30 × 40 × 50 = 12,000,000, which is **26.05**. The harmonic mean is 5 ÷ (1/10 + 1/20 + 1/30 + 1/40 + 1/50) = 5 ÷ 0.22833 = **21.90**.",
        "The order holds as promised: 21.90 < 26.05 < 30. The wider the spread of the values, the further apart the three means drift — for identical values, all three are equal.",
      ],
    },
    {
      heading: "Picking the right average",
      paragraphs: [
        "Use the **arithmetic mean** for ordinary averaging: test scores, daily temperatures, monthly spending. It treats every value equally and is the number most people mean by 'average'.",
        "Use the **geometric mean** for growth rates and ratios that compound — investment returns over several years, for example. Averaging +10% and −10% arithmetically gives 0%, but $100 growing 10% then falling 10% ends at **$99**: the geometric mean catches the loss the arithmetic mean hides.",
        "Use the **harmonic mean** for rates over equal distances or quantities — the classic case is average speed. Driving 60 km at 60 km/h and 60 km at 120 km/h takes 1 hour + 0.5 hours = 1.5 hours for 120 km, so the true average speed is **80 km/h**, not the arithmetic 90 km/h. The harmonic mean of 60 and 120 is exactly 80.",
      ],
    },
  ],

  "slope-calculator": [
    {
      heading: "What slope measures",
      paragraphs: [
        "The **slope** of a line measures its steepness: how much y changes for each unit x changes. A slope of 2 means the line rises 2 units for every 1 unit it runs; a slope of 0.5 rises gently; a slope of 0 is flat; a negative slope falls as x increases.",
        "The formula is **m = (y₂ − y₁) ÷ (x₂ − x₁)** — 'rise over run'. Once you have the slope, the **y-intercept** b comes from b = y₁ − m·x₁, and the full line is **y = mx + b**. This calculator also gives the straight-line **distance** between the two points, √(Δx² + Δy²).",
        "A **vertical line** (both points sharing the same x) has no slope at all — the formula divides by zero. The calculator reports this as 'Undefined (vertical line)'. A horizontal line (same y) is different: its slope is simply 0.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take the points **(1, 2) and (4, 8)**. The slope is m = (8 − 2) ÷ (4 − 1) = 6 ÷ 3 = **2**. The y-intercept is b = 2 − 2 × 1 = **0**, so the line is **y = 2x** — it passes through the origin. The distance between the points is √(3² + 6²) = √45 = **6.7082**.",
        "Check the line against both points: at x = 1, y = 2 × 1 = 2; at x = 4, y = 2 × 4 = 8. A quick check like this catches swapped coordinates, the most common slope mistake.",
      ],
    },
    {
      heading: "Where slope shows up",
      paragraphs: [
        "Slope is the maths behind **gradients and rates of change**. A road sign reading '10% grade' describes a slope of 0.1 — a 1-metre rise for every 10 metres along. A roof pitch of 4:12 is a slope of 4 ÷ 12 ≈ 0.333.",
        "In charts and data, slope is the **rate**: on a distance-time graph it is speed; on a cost graph it is the price per unit. A steeper line means a faster rate — comparing slopes is comparing rates.",
        "Two lines with the same slope are **parallel**; lines whose slopes multiply to −1 are **perpendicular**. So a line with slope 2 is perpendicular to one with slope −0.5, since 2 × (−0.5) = −1.",
      ],
    },
  ],

  "length-converter": [
    {
      heading: "How length conversion works",
      paragraphs: [
        "Length conversion is multiplication by a fixed factor. Every unit has an **exact definition in metres**: 1 inch is exactly 2.54 cm, 1 foot is exactly 0.3048 m, and 1 mile is exactly 1609.344 m. Because the definitions are exact, conversions between them are exact too — any rounding happens only in how many decimals are displayed.",
        "This converter works through a **base unit**: it first converts your value to metres, then from metres to each target unit. That is why one entry fills in all six results at once — metres, feet, inches, centimetres, kilometres, and miles.",
        "Results are rounded to **4 decimal places** (6 for kilometres and miles). That is far more precision than a tape measure can deliver, but it keeps chained conversions accurate if you copy a result into another calculation.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "**100 metres** converts to 100 ÷ 0.3048 = **328.0840 feet**, 100 ÷ 0.0254 = **3937.0079 inches**, and 100 ÷ 1609.344 = **0.062137 miles**. The same length, four ways of saying it.",
        "Going the other way: a **5-mile run** is 5 × 1609.344 = **8046.72 metres**, or **8.04672 km**. And a single inch is exactly 2.54 cm — so a 12-inch ruler is exactly 30.48 cm long.",
      ],
    },
    {
      heading: "Metric, imperial, and everyday conversions",
      paragraphs: [
        "Most of the world uses **metric**; the US still uses **imperial** for everyday lengths, and the UK mixes both. The conversions that come up most are **inches ↔ centimetres** (screen sizes, heights), **feet ↔ metres** (room sizes, heights), and **miles ↔ kilometres** (driving distances).",
        "For quick mental estimates: **1 inch ≈ 2.5 cm**, **1 foot ≈ 30 cm**, **1 metre ≈ 3.3 feet**, **1 mile ≈ 1.6 km**, and **1 km ≈ 0.62 miles**. These are close enough for judging whether furniture fits or how far a run is — use the converter when the exact figure matters.",
        "Watch the units on **area and volume**: converting a length and then squaring it is not the same as converting an area. A room 3 m × 4 m is 12 m², which is 12 × 10.7639 = **129.17 ft²** — the conversion factor gets squared too (1 m² ≈ 10.7639 ft²).",
      ],
    },
  ],

  "weight-converter": [
    {
      heading: "How weight conversion works",
      paragraphs: [
        "Like length, weight conversion is multiplication by a fixed factor, working through a **base unit** — here, the kilogram. Enter a value in any of the seven units (kilograms, pounds, ounces, grams, stones, milligrams, metric tons) and the converter shows all seven at once.",
        "The key definitions: **1 pound is exactly 0.45359237 kg**, **1 ounce is 1/16 of a pound** (about 28.3495 g), and **1 stone is 14 pounds** (about 6.35029 kg). A metric ton is exactly 1,000 kg. This converter uses the rounded factors 0.453592, 0.0283495, and 6.35029, which agree with the exact definitions to at least four decimal places for everyday values.",
        "Strictly, kilograms measure **mass** and weight is a force that depends on gravity — but on Earth's surface the two are used interchangeably, and this converter (like every kitchen scale) treats them as the same thing.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "**70 kg** — a typical adult weight — converts to 70 ÷ 0.453592 = **154.3237 lb**, 70 ÷ 0.0283495 = **2469.1794 oz**, and 70 ÷ 6.35029 = **11.0231 stone**. In grams that is exactly 70,000 g, and in metric tons 0.070000 t.",
        "The reverse check: 154.3237 lb × 0.453592 = **70 kg** (to the displayed precision). Using the exact definition instead, 70 kg is 154.3236 lb — the rounded factor shifts the fourth decimal place, far below what any bathroom scale can measure.",
      ],
    },
    {
      heading: "Kilograms, pounds, and stones in daily life",
      paragraphs: [
        "Most of the world weighs in **kilograms**; the US uses **pounds**, and the UK commonly uses **stones and pounds** for body weight — 11 stone is about 70 kg, and 12 stone is about 76 kg.",
        "In the kitchen, **grams** rule for baking precision and **ounces** for US recipes: 8 oz is half a pound (about 227 g), and 1 oz is about 28.35 g. A stick of butter (4 oz) is about 113 g.",
        "For quick estimates: **1 kg ≈ 2.2 lb**, **1 lb ≈ 0.45 kg**, and **1 stone ≈ 6.35 kg**. Double a kilogram figure and add 10% to get pounds in your head — 70 kg → 140 + 14 = **154 lb**, within a pound of the exact 154.32 lb.",
      ],
    },
  ],

  "temperature-converter": [
    {
      heading: "Three scales, one temperature",
      paragraphs: [
        "Temperature is measured on three scales in everyday use. **Celsius (°C)** is the scientific and world standard, defined by water freezing at 0 °C and boiling at 100 °C. **Fahrenheit (°F)** is still standard in the US, with water freezing at 32 °F and boiling at 212 °F. **Kelvin (K)** is the scientific absolute scale, starting at absolute zero.",
        "Unlike other unit conversions, temperature conversion is **not just multiplication** — Fahrenheit has a shifted zero, so you must add or subtract 32 as well. **°F = °C × 9/5 + 32**, and going back, **°C = (°F − 32) × 5/9**. Kelvin is simpler: **K = °C + 273.15**, a pure shift with no scaling, because one kelvin is the same size as one degree Celsius.",
        "This converter takes a temperature in any of the three scales and shows all three at once, rounded to two decimal places. Note that it accepts any number — including physically impossible values below absolute zero — so treat results below 0 K as a sign of an input error.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Water boils at **100 °C**. In Fahrenheit that is 100 × 9/5 + 32 = 180 + 32 = **212 °F**. In Kelvin it is 100 + 273.15 = **373.15 K**.",
        "A comfortable room temperature of **68 °F** is (68 − 32) × 5/9 = 36 × 5/9 = **20 °C**, or 293.15 K. And the two scales meet at exactly one point: **−40 °C = −40 °F**.",
      ],
    },
    {
      heading: "Everyday temperatures worth knowing",
      paragraphs: [
        "A few anchor points make the scales intuitive: **0 °C / 32 °F** is freezing, **20–22 °C / 68–72 °F** is room temperature, **37 °C / 98.6 °F** is body temperature, and **100 °C / 212 °F** is boiling. If a forecast says 30 °C, that is a hot 86 °F day.",
        "For cooking, oven temperatures are the usual battleground: **180 °C is 356 °F** — cookbooks usually round the pair to 180 °C / 350 °F — and **200 °C is 392 °F**, commonly rounded to 400 °F in recipes.",
        "A quick mental shortcut: to estimate Fahrenheit from Celsius, **double the Celsius figure and add 30** — 20 °C becomes about 70 °F (exactly 68 °F). It is close enough for weather, and the converter gives the exact figure when it matters.",
      ],
    },
  ],

  "take-home-pay-calculator": [
    {
      heading: "How is take-home pay calculated?",
      paragraphs: [
        "Take-home pay is the money left from your salary after taxes and deductions are taken out. It is calculated as **gross pay minus federal income tax, state income tax, FICA (Social Security and Medicare), retirement contributions, and health insurance premiums**.",
        "This calculator applies the flat tax rates you enter to your salary, so it is an estimate rather than a precise payroll figure: it does not apply the progressive federal tax brackets or the standard deduction. **Retirement contributions** lower the income that federal and state tax apply to, but **FICA is still charged on your full gross pay** — which matches how 401(k) contributions are treated in real payroll. Health insurance is treated here as a post-tax cost, although many employer plans deduct premiums before tax.",
        "FICA is **6.2% for Social Security plus 1.45% for Medicare**, or 7.65% combined. In reality the Social Security portion stops once your earnings pass the annual wage base ($184,500 in 2026); this calculator applies the rate you enter to your full salary, so high earners should treat the result as approximate.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **$75,000 salary** with a 22% federal rate, 5% state rate, 7.65% FICA, a 6% retirement contribution, and $200 a month for health insurance. The retirement contribution is **$4,500**, which lowers taxable income to **$70,500**. Federal tax is $15,510, state tax is $3,525, FICA is $5,737.50 on the full gross, and health insurance costs $2,400 a year — total deductions of **$31,672.50**.",
        "That leaves **$43,327.50 a year**, or **$3,610.63 a month** and **$1,666.44 every two weeks**. The 6% retirement contribution saves **$1,215 in income tax** (27% of $4,500). Note that the calculator's 'effective tax rate' of 42.23% counts every deduction, including retirement savings and insurance — not just tax.",
      ],
    },
    {
      heading: "How can you increase your take-home pay?",
      paragraphs: [
        "The most reliable lever is **pre-tax contributions**: money you put into a 401(k), HSA, or FSA lowers the income your federal and state taxes apply to, so each dollar contributed costs you less than a dollar of take-home pay. If you get a large tax refund every year, adjusting your **W-4 withholding** spreads that money across your paychecks instead.",
        "Remember that a raise does not arrive in full: at the rates in the example above, a **$5,000 raise keeps about $3,267.50** after federal, state, and FICA taxes. And raising your retirement contribution is a trade-off — it lowers your take-home pay today while building savings and cutting your tax bill.",
      ],
    },
  ],

  "mortgage-amortization-schedule-calculator": [
    {
      heading: "How does mortgage amortization work?",
      paragraphs: [
        "Amortization is the process of paying off a loan through fixed monthly payments that are split between interest and principal. Each month, **interest is charged on the remaining balance**, and whatever is left of your payment reduces the principal — so the interest portion shrinks and the principal portion grows over the life of the loan.",
        "Lenders use the standard amortization formula: **M = P × r(1+r)ⁿ / ((1+r)ⁿ − 1)**, where M is the monthly payment, P is the loan amount, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of payments. This calculator applies that formula and summarizes your **first year** — Year 1 interest, Year 1 principal, and the balance after 12 payments — plus the total interest over the full term, rather than printing all 360 monthly rows.",
        "Because interest is charged on the balance, your early payments are mostly interest. That is why extra payments toward principal are so powerful early on: every dollar of principal you pay ahead of schedule stops earning interest for the lender.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **$350,000 mortgage at 6.5% fixed for 30 years** (360 payments). The monthly rate is 0.065 ÷ 12 = 0.005417, giving a monthly principal-and-interest payment of **$2,212.24**. On the very first payment, interest is $350,000 × 0.005417 = **$1,895.83**, so only **$316.40** reduces your balance.",
        "After the first year you have paid **$22,634.82 in interest** and only **$3,912.04 of principal**, leaving a balance of **$346,087.96**. Over the full 30 years you pay **$446,405.71 in interest** — more than the amount you borrowed. By the final payment the split has flipped completely: **$11.92 of interest and $2,200.32 of principal**.",
      ],
    },
    {
      heading: "How can you pay less interest on a mortgage?",
      paragraphs: [
        "**Shorten the term.** The same $350,000 loan at 6.5% over 15 years costs **$3,048.88 a month** but only **$198,797.64 in total interest** — a saving of **$247,608.07** compared with the 30-year loan.",
        "**Pay a little extra toward principal.** Adding just $100 a month to the 30-year loan above pays it off 42 months early and saves **$62,627.05 in interest**. Making one extra full payment a year saves **$97,981.94** and clears the loan in about 24 years. A third lever is the **rate itself**: refinancing to a lower rate cuts both the payment and the total interest, though closing costs mean it only pays off if you stay in the home long enough.",
      ],
    },
  ],

  "auto-lease-calculator": [
    {
      heading: "How is a car lease payment calculated?",
      paragraphs: [
        "A lease payment covers the car's depreciation while you drive it, plus a finance charge. It is calculated as **(capitalized cost − residual value) ÷ term + (capitalized cost + residual value) × money factor**, with sales tax added to the monthly amount.",
        "The **capitalized cost** is the negotiated price minus your down payment. The **residual value** is what the car is expected to be worth at the end of the lease, set as a percentage of the MSRP — here 58% of $35,000, or $20,300. The **money factor** is the lease's finance rate in decimal form; multiplying it by 2,400 gives the approximate APR, so 0.0018 is about 4.32%.",
        "This calculator applies sales tax to the monthly payment, which is how most states tax leases, but a few states tax the vehicle's full price or the total of the lease payments up front. It also does not include one-time fees such as the acquisition fee or disposition fee, so treat the total as the payment cost rather than the complete out-the-door cost.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Lease a car with a **$35,000 MSRP**, negotiated to **$33,000**, with **$2,000 down**, a **58% residual**, a **0.0018 money factor**, a **36-month term**, and **8% tax**. The residual value is **$20,300** and the capitalized cost is **$31,000**. Depreciation is ($31,000 − $20,300) ÷ 36 = **$297.22 a month**, and the finance charge is ($31,000 + $20,300) × 0.0018 = **$92.34 a month**.",
        "That gives a pre-tax payment of **$389.56**, or **$420.73 a month** with 8% tax. The total lease cost is **$17,146.18** (36 payments plus the down payment), and the implied APR is **4.32%**. Negotiating just $1,000 more off the price would save **$31.94 a month — $1,149.98 over the term** — which is why the negotiated price matters more than the monthly payment.",
      ],
    },
    {
      heading: "What should you check before signing a lease?",
      paragraphs: [
        "Convert the money factor to an APR and compare it with auto loan rates — a money factor of 0.0018 is about 4.32%, but dealers sometimes mark it up. Check the **residual value** too: a higher residual means lower payments, and it is also the price you would pay if you buy the car at lease end.",
        "Watch the **mileage allowance** and the per-mile overage charge, since excess miles can erase the savings of a low payment. And compare the **total lease cost** with buying: leasing usually means lower monthly payments but no ownership or equity at the end, so it suits drivers who want a new car every few years and stay within the mileage limit.",
      ],
    },
  ],

  "break-even-calculator": [
    {
      heading: "What is the break-even point?",
      paragraphs: [
        "The break-even point is the sales volume at which total revenue exactly covers total costs — no profit, no loss. It is calculated as **fixed costs ÷ (selling price per unit − variable cost per unit)**.",
        "The difference between the selling price and the variable cost is the **contribution per unit**: the amount each sale contributes toward covering fixed costs. Dividing the contribution by the price gives the **contribution margin** as a percentage. Because you cannot sell part of a unit, this calculator rounds the break-even point up to whole units.",
        "**Fixed costs** — rent, salaries, insurance — stay the same whether you sell nothing or a thousand units. **Variable costs** — materials, packaging, per-unit labor — rise with every unit sold. The calculator uses your monthly fixed costs, so the result is the number of units you must sell each month.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A business with **$10,000 a month in fixed costs** sells a product for **$50** with a **$20 variable cost per unit**. The contribution is $50 − $20 = **$30 per unit**, so the exact break-even point is $10,000 ÷ $30 = 333.33 units — rounded up to **334 units**, or **$16,700 in break-even revenue**. The contribution margin is $30 ÷ $50 = **60%**.",
        "At 334 units the business makes a **$20 profit** ($16,700 revenue against $16,680 of costs), while at 333 units it would lose **$10** — that is why the rounding matters. Raising the price to $55 would drop the break-even point to **286 units**, and cutting fixed costs to $8,000 would drop it to **267 units**.",
      ],
    },
    {
      heading: "How can you lower your break-even point?",
      paragraphs: [
        "You have three levers: **cut fixed costs**, **raise the price**, or **reduce the variable cost per unit**. Small changes move the number a lot — the $5 price rise in the example above cuts the break-even point by 48 units a month.",
        "Each lever has a trade-off. Raising prices can reduce the number of units you sell, and cutting fixed costs can mean giving up space or staff. Reducing variable costs — renegotiating with suppliers, cutting waste — is often the safest lever, because it improves every sale without touching the price. Re-run the calculation whenever any of the three inputs changes.",
      ],
    },
  ],

  "cd-calculator": [
    {
      heading: "How does a CD earn interest?",
      paragraphs: [
        "A certificate of deposit (CD) pays a fixed interest rate on a lump sum that you lock away for a set term. The maturity value is calculated as **FV = P × (1 + r/n)^(nt)**, where P is the deposit, r is the annual rate, n is the number of compounding periods per year, and t is the term in years.",
        "One detail matters: the rate field on this page is labeled APY, but the formula compounds the rate you enter at the frequency you choose — that is, it treats the rate as a **nominal annual rate**. A true 5% APY would return exactly $10,500 on a $10,000 deposit after one year; with monthly compounding this calculator returns **$10,511.62**. The difference is small, but it is real.",
        "CDs at FDIC-insured banks are protected up to **$250,000 per depositor, per bank**. The trade-off for the fixed rate is access: withdrawing early usually triggers a penalty of several months' interest, so only lock away money you will not need before the term ends.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Deposit **$10,000 at 5% for 12 months with monthly compounding**. The maturity value is $10,000 × (1 + 0.05 ÷ 12)^12 = **$10,511.62**, so the CD earns **$511.62 in interest** — an average of **$42.63 a month**.",
        "Compounding more often helps only slightly: daily compounding gives **$10,512.67**, just $1.05 more over the year. Time matters far more than frequency — the same $10,000 at 5% for five years grows to **$12,833.59**, earning **$2,833.59 in interest**.",
      ],
    },
    {
      heading: "How do you choose the right CD term?",
      paragraphs: [
        "Match the term to when you need the money. Longer terms usually pay higher rates, but the money is locked away — a five-year CD at a good rate is a poor choice for money you might need next year. If you are unsure, **laddering** — splitting your money across CDs of different terms — keeps some of it maturing regularly while the rest earns the longer-term rate.",
        "Before you commit, check the **early-withdrawal penalty** and compare the rate with high-yield savings accounts, which pay a variable rate but keep your money accessible. A CD wins when you value a guaranteed rate and will not touch the money until maturity.",
      ],
    },
  ],

  "college-cost-calculator": [
    {
      heading: "How much will college cost by the time you enroll?",
      paragraphs: [
        "The future cost of college is today's annual cost grown by tuition inflation for each year until enrollment, then added up over four years. The calculator applies **future cost = current cost × (1 + inflation)^years** to tuition plus room and board.",
        "The total assumes a **four-year degree** and applies the same inflation rate to room and board as to tuition. The 'monthly savings needed' figure simply divides the total by the months until enrollment — it assumes your savings earn **no investment return**, so it is a conservative target: if your savings grow, you would need less each month.",
        "The result is the sticker price before financial aid. Grants, scholarships, and need-based aid can reduce the actual amount substantially, and the calculator does not include books, fees, travel, or personal expenses.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Tuition of **$30,000** plus room and board of **$12,000** is **$42,000 a year** today. With enrollment five years away and 5% annual tuition inflation, the first year will cost $42,000 × 1.05^5 = **$53,603.83**.",
        "The four years cost **$53,603.83, $56,284.02, $59,098.22, and $62,053.13** — a total of **$231,039.19**, compared with $168,000 at today's prices. Inflation alone adds **$63,039.19**. Saving the full amount over five years takes **$3,850.65 a month** with no investment growth; if the savings earned 5% a year, about **$3,397.33 a month** would be enough.",
      ],
    },
    {
      heading: "How can you reduce the total cost of college?",
      paragraphs: [
        "Start early: the same inflation that raises the price also rewards early saving, because money set aside now has years to grow. A **529 plan** lets savings grow tax-free when used for education, and starting at a community college for the first two years before transferring can cut the total substantially.",
        "Compare the **net price**, not the sticker price: a college with high published tuition may offer enough aid to cost less than a cheaper school. Use each college's net price calculator, and apply for scholarships early — every dollar of aid is a dollar you do not have to save or borrow.",
      ],
    },
  ],

  "debt-to-income-ratio-calculator": [
    {
      heading: "What is a debt-to-income ratio?",
      paragraphs: [
        "Your debt-to-income ratio (DTI) is the share of your gross monthly income that goes to debt payments. It is calculated as **(total monthly debt payments ÷ gross monthly income) × 100**.",
        "The calculator adds up your **mortgage or rent, car payment, student loan payment, credit card minimums, and other monthly debts**, then divides by your gross (pre-tax) monthly income. Lenders use DTI to judge whether you can take on another payment — it is one of the first numbers checked on a mortgage application.",
        "This calculator rates your result on a simple scale: **20% or less is Excellent, up to 36% is Good, up to 43% is Acceptable, up to 50% is High, and above 50% is Very High Risk**. DTI only reflects monthly payments against income — it does not account for your total balances, credit score, or savings.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "With **$6,000 a month in gross income** and debts of $1,500 mortgage, $400 car payment, $300 student loan, and $150 in credit card minimums, total monthly debt is **$2,350**. DTI is $2,350 ÷ $6,000 × 100 = **39.17%**, rated **Acceptable**, leaving **$3,650** of income after debt payments.",
        "Paying off the $400 car payment would cut total debt to $1,950 and DTI to **32.50% — rated Good**. To reach the 36% threshold without paying anything off entirely, this borrower would need to cut **$190 a month** in debt payments.",
      ],
    },
    {
      heading: "How can you lower your DTI?",
      paragraphs: [
        "Attack the numerator or the denominator. Paying down a debt removes its whole monthly payment from the calculation — clearing the smallest balance first frees up cash quickly, while clearing the highest-rate debt saves the most interest. **Refinancing** to a lower payment or a longer term also lowers DTI, though it can cost more interest overall.",
        "Raising your income works just as well: a raise or extra work increases the denominator without touching your debts. And avoid taking on new debt before applying for a mortgage — many lenders look for a DTI of **43% or below**, and below 36% puts you in a strong position.",
      ],
    },
  ],

  "down-payment-calculator": [
    {
      heading: "How does a down payment affect your mortgage?",
      paragraphs: [
        "A down payment is the cash you pay up front when buying a home; the rest is borrowed as a mortgage. It is calculated as **home price × down payment percentage**, and a bigger down payment means a smaller loan, a lower monthly payment, and less total interest.",
        "The **20% threshold** matters: with less than 20% down, most conventional loans require **private mortgage insurance (PMI)**, which protects the lender if you default. This calculator estimates PMI at **0.5% of the loan amount per year** — a middle estimate, since real PMI varies with your credit score and loan-to-value ratio.",
        "You do not need 20% to buy: FHA loans require as little as 3.5% down, and some conventional loans accept 3–5%. The trade-off is a higher monthly payment, PMI, and more total interest — which this calculator shows side by side.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Buy a **$400,000 home at 6.5% for 30 years** with **20% down**: the down payment is **$80,000**, the loan is **$320,000**, and the monthly payment is **$2,022.62** with no PMI.",
        "With **10% down** instead, the down payment is **$40,000**, the loan is **$360,000**, and the payment is $2,275.44 plus **$150 a month of PMI — $2,425.44 in total**, or **$402.83 more every month**. Total interest rises from $408,142 to $459,160 — **$51,018 more** over the life of the loan. With **3% down**, the payment plus PMI reaches **$2,614.09 a month**.",
      ],
    },
    {
      heading: "How much should you put down?",
      paragraphs: [
        "Twenty percent is a good target if you can reach it **without draining your emergency savings** — it removes PMI and lowers both the payment and the total interest. But a smaller down payment is not a mistake if it gets you into a home sooner and you can afford the higher payment; the PMI is temporary, not forever.",
        "On a conventional loan you can typically ask to **cancel PMI once you reach 20% equity**, and it must be removed automatically once your loan balance falls to 22% of the home's original value. If you put less than 20% down, check your loan balance against that threshold each year — dropping PMI is an easy monthly saving.",
      ],
    },
  ],

  "home-equity-loan-calculator": [
    {
      heading: "How does a home equity loan work?",
      paragraphs: [
        "A home equity loan lets you borrow a lump sum against the equity in your home — the difference between what your home is worth and what you still owe on the mortgage. It is a fixed-rate loan repaid in equal monthly installments, calculated with the standard amortization formula **M = P × r(1+r)ⁿ / ((1+r)ⁿ − 1)**.",
        "This calculator prices the loan amount you enter — it does not check how much equity you have or what a lender will approve. Many lenders cap total borrowing at around **80–85% of the home's value**, so the amount you can borrow depends on your home value and your remaining mortgage balance.",
        "Your home is the collateral, so missed payments put it at risk — that is the key difference from an unsecured loan. Interest may be **tax-deductible if the loan is used to buy, build, or substantially improve your home**, within the combined mortgage debt limits.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Borrow **$50,000 at 7.5% for 15 years** (180 payments). The monthly payment is **$463.51**. The first payment includes **$312.50 of interest** — nearly two-thirds of the payment — because interest is charged on the full balance.",
        "Over 15 years you pay **$33,431.11 in interest** for a total cost of **$83,431.11**. A 10-year term raises the payment to **$593.51** but cuts total interest to **$21,221.06**, saving **$12,210.05**. Stretching to 30 years drops the payment to **$349.61** but pushes total interest to **$75,858.61** — more than the amount borrowed.",
      ],
    },
    {
      heading: "When does a home equity loan make sense?",
      paragraphs: [
        "It suits **large, one-time costs** where the rate beats the alternatives — a major renovation, or consolidating high-interest credit card debt into a lower fixed rate. It is a poor fit for everyday spending: borrowing against your home to fund consumption turns short-term purchases into long-term debt secured by your house.",
        "Compare it with a **HELOC**, which is a revolving line of credit with a variable rate that you draw on as needed, and with a **cash-out refinance**, which replaces your existing mortgage. Shop at least a few lenders — rates, fees, and closing costs vary — and borrow only what you can repay comfortably.",
      ],
    },
  ],

  "interest-rate-calculator": [
    {
      heading: "How do you find the interest rate on a loan?",
      paragraphs: [
        "If you know the loan amount, the monthly payment, and the term, the interest rate can be worked backward from the loan payment formula. There is no direct formula for the rate, so this calculator solves it iteratively with **Newton's method** — refining a guess until the payment it produces matches yours.",
        "This is useful when a dealer or lender quotes a **monthly payment without clearly stating the rate**: the implied rate lets you compare offers fairly. The result is the nominal annual interest rate — it is not the APR, which also includes fees and is usually slightly higher.",
        "One limit to know: the payment must cover the principal over the term. If your total payments add up to less than the loan amount, no positive interest rate can produce that payment, and the result will not be meaningful — so check your numbers if the answer looks wrong.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A **$20,000 loan** with a **$400 monthly payment** over **60 months** implies an annual rate of **7.42%**. Total paid is $24,000, so the loan costs **$4,000 in interest**.",
        "If the payment were **$450 a month** instead, the implied rate jumps to **12.50%** — total paid $27,000, interest **$7,000**. A $50 difference in the monthly payment costs **$3,000 over five years**, which is why the rate behind a quoted payment is always worth checking.",
      ],
    },
    {
      heading: "What should you do with the rate you find?",
      paragraphs: [
        "Compare it with the **APR on competing offers**, since APR includes fees and is the fairest basis for comparison. If the implied rate is far above the rate the lender advertised, ask what fees are bundled into the payment — the gap is usually explained there.",
        "Use the number to negotiate: a lower rate on the same term cuts both your monthly payment and your total interest. And if you are choosing between a lower rate and a shorter term, run both through a loan calculator — the shorter term often saves more overall, even at the same rate.",
      ],
    },
  ],

  "profit-margin-calculator": [
    {
      heading: "How is profit margin calculated?",
      paragraphs: [
        "Profit margin is the share of revenue left as profit after costs. It is calculated as **(revenue − cost) ÷ revenue × 100**. Margin is measured against revenue; markup — profit as a share of cost — is a different number for the same sale.",
        "This calculator works from **revenue (the selling price) and cost of goods**, so the margin it reports is a **gross margin**. It does not subtract operating expenses such as rent, salaries, or marketing, so your net margin — profit after all expenses — would be lower.",
        "The distinction between margin and markup trips up many sellers: a **50% markup** (adding half the cost on top) equals only a **33.33% margin**, because the profit is measured against the larger revenue figure. When you set prices from a target margin, always work from revenue, not cost.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Sell a product for **$100** that costs **$60** to make. Profit is **$40**, the margin is $40 ÷ $100 = **40%**, the markup is $40 ÷ $60 = **66.67%**, and cost is **60% of revenue**.",
        "Sell a different product for **$200** with a **$150** cost: profit is **$50**, but the margin is only **25%** and the markup **33.33%**. The second product earns more dollars per sale ($50 vs $40) but keeps a smaller share of each dollar — margin and total profit can point in different directions, so track both.",
      ],
    },
    {
      heading: "What is a good profit margin?",
      paragraphs: [
        "It depends on the industry. As a rough guide, software and tech margins often run **60–90%**, services **15–30%**, manufacturing **5–10%**, and retail **2–5%** — but these ranges vary widely, so compare your margin with businesses like yours rather than with a universal benchmark.",
        "To improve margin, you can **raise prices**, **cut the cost of goods**, or **shift sales toward higher-margin products**. Track margin per product, not just overall: a best-seller with a thin margin can look healthy on revenue while contributing little profit.",
      ],
    },
  ],

  "sales-tax-calculator": [
    {
      heading: "How is sales tax calculated?",
      paragraphs: [
        "Sales tax is a percentage added to the price of a purchase. The total is calculated as **price × (1 + tax rate ÷ 100)**, and the tax itself is **price × tax rate ÷ 100**.",
        "The rate you pay is usually a combination of **state, county, and city taxes**, so it varies by where you buy — and some states exempt groceries, clothing, or other categories. In the US, tax is added at checkout, so the shelf price is not the price you pay.",
        "This calculator works forward from the **pre-tax price**. If you only know the total on a receipt, you can work backward: divide the total by (1 + tax rate ÷ 100) to recover the pre-tax price, and the difference is the tax.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Buy an item for **$100** where the tax rate is **8.25%**: the tax is $100 × 0.0825 = **$8.25**, and the total is **$108.25**. A **$1,200 laptop at 6%** carries **$72 of tax** for a total of **$1,272**.",
        "Working backward: a receipt total of **$500** at a **7% rate** means a pre-tax price of $500 ÷ 1.07 = **$467.29**, so **$32.71** of the total was tax.",
      ],
    },
    {
      heading: "Why does the same item cost different amounts in different places?",
      paragraphs: [
        "Because the rate depends on location: combined state and local rates range from zero in the five states with no statewide sales tax (Alaska, Delaware, Montana, New Hampshire, and Oregon) to over 10% in some cities. A few states also exempt certain goods, so the same basket can be taxed differently across state lines.",
        "Online orders are usually taxed based on **where the item is delivered**, not where the seller is located, since most states now require online sellers to collect tax. When budgeting for a big purchase, round the rate up slightly — a small rate difference on a large price adds up fast.",
      ],
    },
  ],

  "tax-bracket-calculator": [
    {
      heading: "How do federal tax brackets work?",
      paragraphs: [
        "The US federal income tax is progressive: your income is taxed in slices, with each slice taxed at its own rate. Your **marginal bracket** is the rate on your last dollar of income, while your **effective rate** — total tax divided by total income — is always lower.",
        "This calculator uses the **2024 federal brackets** for two filing statuses — Single and Married Filing Jointly — with seven rates: 10%, 12%, 22%, 24%, 32%, 35%, and 37%. The IRS adjusts the bracket thresholds for inflation each year, so the figures shift slightly from year to year. The income you enter is **taxable income** — what remains after the standard deduction ($14,600 for single filers in 2024) or itemized deductions — not your gross salary.",
        "The result is **federal income tax only**. It does not include state tax, FICA, or tax credits, and it does not cover the Head of Household or Married Filing Separately statuses — so treat it as a planning estimate, not a filing figure.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A **single filer with $85,000 of taxable income** falls in the **22% marginal bracket** — but only the income above $47,150 is taxed at 22%. The bill is 10% of the first $11,600 ($1,160), plus 12% of the next $35,550 ($4,266), plus 22% of the remaining $37,850 ($8,327): total federal tax **$13,753**, an effective rate of **16.18%**, and **$71,247 after tax**.",
        "The same $85,000 for **married filing jointly** is taxed as 10% of the first $23,200 ($2,320) plus 12% of the remaining $61,800 ($7,416): **$9,736** total, a **12% marginal bracket**, and an **11.45% effective rate**. Taxing the whole $85,000 at 22% — the common misunderstanding — would give $18,700, overstating the real bill by **$4,947**.",
      ],
    },
    {
      heading: "Does a raise push you into a higher bracket — and should you care?",
      paragraphs: [
        "A raise can move you into a higher bracket, but only the income **above the threshold** is taxed at the higher rate — the rest is taxed exactly as before. A raise never leaves you with less after-tax income under the federal brackets alone.",
        "What actually changes your bill is **taxable income**: pre-tax contributions to a 401(k) or HSA, and deductions, lower it directly. Near a bracket threshold, a deduction saves tax at your marginal rate — so $1,000 of extra 401(k) contributions saves a 22%-bracket filer **$220 in federal tax**.",
      ],
    },
  ],
  "pregnancy-calculator": [
    {
      heading: "How is a pregnancy due date calculated?",
      paragraphs: [
        "Your estimated due date is your last menstrual period (LMP) plus 280 days (40 weeks). This is **Naegele's rule**, the standard method used worldwide: pregnancy is dated from the first day of your last period, not from conception, because the LMP is a date most people can remember while conception usually is not.",
        "The 280 days include about two weeks before ovulation, so at the due date the pregnancy is 40 weeks by gestational age but the baby has been developing for about 38 weeks. Only about **5% of babies arrive on their due date** — most are born within a week or two either side — so treat the date as a planning anchor for appointments and preparations, not a deadline.",
        "This calculator also shows your current week, your trimester, and the days left until the due date, all counted from the same LMP date. It assumes a regular 28-day cycle with ovulation around day 14; if your cycles are much longer or shorter, an early ultrasound gives a more reliable date.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "LMP = **January 1, 2026**. Adding 280 days gives an estimated due date of **Thursday, October 8, 2026**. The same result comes from the classic Naegele shortcut: add 7 days (January 8), subtract 3 months (October 8, 2025), add 1 year (October 8, 2026).",
        "Milestones from that LMP: week 13 begins **April 2, 2026**, week 27 begins **July 9, 2026**, and full term (39 weeks) begins **October 1, 2026**. This calculator counts the first trimester as weeks 0–12, the second as weeks 13–26, and the third from week 27 — definitions vary by a week between sources, so your clinician's dates may differ slightly.",
      ],
    },
    {
      heading: "When should you trust the estimate — and when not?",
      paragraphs: [
        "The estimate is most reliable when your periods are regular and you are sure of your LMP date. It is less reliable with **irregular cycles**, recent hormonal contraception, or breastfeeding, because ovulation may not have happened on day 14. A first-trimester ultrasound (usually between weeks 8 and 13) dates a pregnancy within about 5 days and takes priority when it disagrees with the LMP date.",
        "If you conceived by IVF, dating starts from the egg retrieval or transfer date instead of the LMP — ask your clinic for the gestational age they are using. Whatever the method, bring the result to your first prenatal appointment: your clinician confirms the dating and sets the schedule for scans and tests from it.",
      ],
    },
  ],

  "heart-rate-zone-calculator": [
    {
      heading: "How are heart rate zones calculated?",
      paragraphs: [
        "Heart rate zones are bands of beats per minute (bpm) based on your **heart rate reserve (HRR)** — the gap between your maximum heart rate and your resting heart rate. This calculator uses the **Karvonen method**: Zone = HRR × percentage + resting HR, with maximum heart rate estimated as **220 − age**.",
        "The four zones are **Zone 1 (50–60%)** recovery, **Zone 2 (60–70%)** aerobic base, **Zone 3 (70–80%)** tempo, and **Zone 4 (80–90%)** threshold. Training in different zones stresses different energy systems, which is why structured plans mix easy and hard days instead of running every session at the same effort.",
        "Both inputs are estimates: 220 − age can miss an individual's true maximum by roughly **10–12 bpm** in either direction, and resting heart rate varies with sleep, illness, and fitness. Treat the zones as a starting guide, not a medical measurement — and if you take medication that affects heart rate (such as beta blockers) or have a heart condition, ask your doctor before training to heart rate targets.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Age **30**, resting HR **60 bpm**. Maximum heart rate = 220 − 30 = **190 bpm**; heart rate reserve = 190 − 60 = **130 bpm**. Zone 1 (50–60%) = 130 × 0.50 + 60 to 130 × 0.60 + 60 = **125–138 bpm**. Zone 2 (60–70%) = **138–151 bpm**, Zone 3 (70–80%) = **151–164 bpm**, and Zone 4 (80–90%) = **164–177 bpm**.",
        "In practice: an easy run that stays in Zone 2 (138–151 bpm) builds aerobic fitness with low fatigue, while intervals that push into Zone 4 (164–177 bpm) improve speed and lactate tolerance. If your easy runs keep drifting into Zone 3, slow down — most runners go too hard on easy days.",
      ],
    },
    {
      heading: "Which zone should you train in?",
      paragraphs: [
        "Most of your training — roughly **80% of weekly time** in the popular polarized approach — belongs in Zones 1–2, where you can still hold a conversation. These sessions build the aerobic base that makes everything else possible, and they are the ones beginners skip most often.",
        "Zone 3 is the 'grey zone': hard enough to tire you, not hard enough to drive big adaptations — useful for tempo runs but easy to overdo. Zone 4 is for structured intervals with recovery built in. This calculator stops at Zone 4 (90%); the all-out Zone 5 (90–100%, here 177–190 bpm) is for short sprints and max-effort testing, and it is the zone most worth discussing with a coach or clinician before chasing.",
      ],
    },
  ],

  "one-rep-max-calculator": [
    {
      heading: "How is a one rep max estimated?",
      paragraphs: [
        "A one rep max (1RM) is the heaviest weight you can lift for a single repetition with good form. Instead of testing it directly, this calculator estimates it from a lighter set you already did: enter the **weight lifted and the reps completed**, and it averages the **Epley** and **Brzycki** formulas.",
        "Epley: **1RM = W × (1 + R ÷ 30)**. Brzycki: **1RM = W × 36 ÷ (37 − R)**. Both formulas were developed from observed lifting data and agree closely at low reps; averaging them smooths out each formula's bias. If you enter 1 rep, the calculator simply returns the weight itself — that is your tested 1RM.",
        "The estimate is most reliable with **1–10 reps**; beyond about 10 reps the formulas drift, because endurance starts to matter more than maximal strength. Treat the result as a training number, not a promise: use it to set working weights, and re-test with a real single when it matters.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "**100 kg for 8 reps.** Epley: 100 × (1 + 8 ÷ 30) = 100 × 1.2667 = **126.7 kg**. Brzycki: 100 × 36 ÷ (37 − 8) = 3,600 ÷ 29 = **124.1 kg**. The average is **125.4 kg**, shown as an estimated 1RM of **125 kg**.",
        "From that estimate the calculator also gives training percentages: **95% (119 kg)** for a heavy single and **80% (100 kg)** for working sets. A second check: **60 kg for 5 reps** gives Epley 70.0 kg and Brzycki 67.5 kg, an average of **69 kg** — the two formulas agree within 2.5 kg at low reps, which is why the average is trustworthy there.",
      ],
    },
    {
      heading: "How to use your 1RM in training",
      paragraphs: [
        "Most programs prescribe loads as percentages of 1RM: **65–75%** for volume and hypertrophy work, **75–85%** for strength sets, and **85–95%** for heavy singles and peaking. The calculator's 95% and 80% rows give you the two most-used anchors without extra math.",
        "Re-test or re-estimate every **4–8 weeks** as you get stronger, and estimate separately for each lift — your squat, bench, and deadlift 1RMs are independent numbers. Never test a true 1RM alone: use a spotter, safety pins, or a rack, and warm up in small jumps rather than going straight to the top weight.",
      ],
    },
  ],

  "vo2-max-calculator": [
    {
      heading: "How is VO2 max calculated?",
      paragraphs: [
        "VO2 max is the maximum rate at which your body can use oxygen during hard exercise, measured in **milliliters of oxygen per kilogram of body weight per minute (mL/kg/min)**. This calculator estimates it from the **Cooper 12-minute run test**: run as far as you can in 12 minutes, enter the distance, and it applies **VO2 max = (distance in meters − 504.9) ÷ 44.73**.",
        "That formula comes from Dr. Kenneth Cooper's research correlating 12-minute run distance with lab-measured VO2 max. It is an estimate, not a lab result: a true VO2 max test needs a treadmill or bike, a gas-analysis mask, and a graded effort to exhaustion. Field estimates like this one are typically within a few mL/kg/min of lab values for healthy adults.",
        "One thing to know about this tool: the result comes from the **distance only**, and it assumes the run lasted 12 minutes. The time field on the page does not change the result, so make sure the distance you enter is what you covered in exactly 12 minutes of running.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Run **2.4 km in 12 minutes**: (2,400 − 504.9) ÷ 44.73 = 1,895.1 ÷ 44.73 = **42.4 mL/kg/min**, rated **Good**. Run **3.0 km**: (3,000 − 504.9) ÷ 44.73 = **55.8 mL/kg/min**, rated **Superior**. Run **2.0 km**: (2,000 − 504.9) ÷ 44.73 = **33.4 mL/kg/min**, rated **Average**.",
        "The calculator's bands are: **above 55** Superior, **45–55** Excellent, **38–45** Good, **30–38** Average, and **30 or below** Poor. These are general adult bands, not adjusted for age or sex — a 55 for a 60-year-old is far more impressive than a 55 for a 20-year-old, so compare your number mainly against your own past results.",
      ],
    },
    {
      heading: "How can you improve your VO2 max?",
      paragraphs: [
        "The fastest gains come from **high-intensity interval training (HIIT)**: repeated 3–5 minute efforts at 90–95% of max heart rate with equal recovery, once or twice a week. Longer steady runs in Zone 2 build the aerobic base that intervals sharpen. Many beginners see gains of around **10–20% over 8–12 weeks** of consistent training, though gains slow as fitness rises.",
        "Retest every **6–8 weeks** under the same conditions — same course, similar weather, rested — and run the full 12 minutes at an even, hard effort. Pacing matters: starting too fast and fading usually covers less distance than a steady effort, and a shorter distance means a lower estimate.",
      ],
    },
  ],

  "waist-to-hip-ratio-calculator": [
    {
      heading: "How is waist-to-hip ratio calculated?",
      paragraphs: [
        "Waist-to-hip ratio (WHR) is your **waist circumference divided by your hip circumference**, measured in the same units: **WHR = waist ÷ hip**. It describes where your body stores fat — a higher ratio means more fat around the abdomen, which carries more health risk than fat stored around the hips and thighs.",
        "The World Health Organization flags **above 0.90 for men** and **above 0.85 for women** as substantially increased risk of metabolic complications. This calculator uses those same cut-offs: a ratio above your threshold shows as 'High Risk', at or below it as 'Normal'.",
        "WHR is a screening measure, not a diagnosis. It adds information BMI misses — two people with the same BMI can have very different fat distributions — but it cannot measure visceral fat directly, and a single ratio should never override a clinician's assessment.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A woman with a waist of **80 cm** and hips of **100 cm**: WHR = 80 ÷ 100 = **0.800**, below the female threshold of 0.85 — **Normal**. A man with a waist of **95 cm** and hips of **100 cm**: WHR = 95 ÷ 100 = **0.950**, above the male threshold of 0.90 — **High Risk**.",
        "Notice how small changes matter: if that man trims his waist to **88 cm** with hips unchanged, his ratio falls to **0.880** — back under the threshold. Because the ratio has no units, centimeters and inches give the same answer as long as both measurements use the same unit.",
      ],
    },
    {
      heading: "How to measure waist and hip correctly",
      paragraphs: [
        "Measure your waist at the **narrowest point** of your torso, usually just above the navel, with the tape snug but not compressing the skin. Measure your hips at the **widest point** around the buttocks. Stand relaxed, breathe out normally, and keep the tape level — measuring over thick clothing adds error.",
        "Take each measurement **twice** and average them; a 1–2 cm error in the waist moves the ratio by about 0.01–0.02, which can flip a borderline result. Re-measure every few weeks rather than daily — fat distribution changes slowly, and daily fluctuations are mostly water and posture.",
      ],
    },
  ],

  "body-surface-area-calculator": [
    {
      heading: "How is body surface area calculated?",
      paragraphs: [
        "Body surface area (BSA) is the total surface area of your skin, measured in **square meters (m²)**. This calculator uses the **Mosteller formula**, the simplest and most widely used: **BSA = √(height in cm × weight in kg ÷ 3,600)**.",
        "BSA matters because many medical doses and measurements scale with surface area better than with weight alone. It is used to calculate **chemotherapy doses**, assess **burn size**, index **kidney function** (eGFR), and compute **cardiac index** from cardiac output. The average adult BSA is roughly **1.7–1.9 m²**.",
        "Other formulas exist — DuBois and DuBois (1916) is the classic, and Haycock and others are used for children — but Mosteller is preferred in practice because it is simple and agrees closely with DuBois for most adults. This calculator uses Mosteller only, so results may differ slightly from a tool using a different formula.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Height **175 cm**, weight **75 kg**: BSA = √(175 × 75 ÷ 3,600) = √(13,125 ÷ 3,600) = √3.6458 = **1.91 m²** — at the top of the typical adult range. A smaller adult at **170 cm and 70 kg**: BSA = √(170 × 70 ÷ 3,600) = √3.3056 = **1.82 m²**.",
        "Because BSA uses a square root, it grows more slowly than weight: doubling weight alone increases BSA by only about **41%** (√2 ≈ 1.414), which is why dosing by surface area gives smaller patients proportionally larger doses per kilogram than dosing by weight.",
      ],
    },
    {
      heading: "What is BSA used for — and what are its limits?",
      paragraphs: [
        "In oncology, many chemotherapy drugs are dosed in **mg per m² of BSA**, and in burn care the **rule of nines** estimates the percentage of BSA burned. In cardiology, dividing cardiac output by BSA gives the cardiac index, letting doctors compare heart performance between people of different sizes.",
        "BSA is an estimate from height and weight, not a direct measurement — formulas can disagree by a few percent, and none accounts for body composition. Drug dosing is always a clinician's decision: this calculator is for understanding the number, not for working out a dose.",
      ],
    },
  ],

  "daily-calorie-deficit-calculator": [
    {
      heading: "How is a daily calorie deficit calculated?",
      paragraphs: [
        "A calorie deficit is the gap between the calories you burn and the calories you eat. This calculator works backwards from your goal: it multiplies the weight you want to lose by **7,700 calories per kilogram** (the energy stored in a kilogram of body fat) and spreads that total evenly over your timeframe: **daily deficit = weight × 7,700 ÷ (weeks × 7)**.",
        "The 7,700 figure is the metric version of the familiar **3,500 calories per pound** rule (3,500 × 2.2 ≈ 7,700). It is a planning average, not a law of physics: real weight loss slows over time as a lighter body burns fewer calories, so the calculator's even split is a starting plan, not a guarantee.",
        "The calculator also flags safety: a deficit above **1,000 calories per day** is marked 'Too aggressive', because very large deficits risk muscle loss, fatigue, and nutrient shortfalls. Note that this tool sizes the deficit only — it does not ask for your current weight or activity, so you still need your maintenance calories (TDEE) to turn the deficit into a daily intake target.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Goal: lose **10 kg in 20 weeks**. Total energy to burn: 10 × 7,700 = **77,000 calories**. Spread over 140 days: 77,000 ÷ 140 = **550 calories per day**, or **3,850 per week**, at a rate of **0.50 kg per week** — marked sustainable.",
        "Squeeze the same 10 kg into **8 weeks** and the daily deficit jumps to 77,000 ÷ 56 = **1,375 calories per day**, which the calculator flags as too aggressive. The fix is to extend the timeframe: 10 kg in 12 weeks needs 77,000 ÷ 84 ≈ **917 calories per day**, under the 1,000 limit.",
      ],
    },
    {
      heading: "How to turn the deficit into a daily plan",
      paragraphs: [
        "Find your maintenance calories first — use a TDEE or calorie calculator — then subtract the deficit. If your maintenance is 2,400 calories and your deficit is 550, your target intake is **1,850 calories per day**. Pair the deficit with enough protein (around 1.6–2.2 g per kg of body weight is the usual recommendation for dieting) and resistance training to protect muscle.",
        "Weigh yourself weekly under the same conditions and adjust if progress stalls for 2–3 weeks: recalculate with your new weight, or trim another 100–200 calories. If the deficit pushes your intake very low — generally below about 1,200 calories a day for women or 1,500 for men without medical supervision — talk to a doctor or dietitian before continuing.",
      ],
    },
  ],

  "fraction-to-decimal-calculator": [
    {
      heading: "How do you convert a fraction to a decimal?",
      paragraphs: [
        "Divide the numerator by the denominator: **decimal = numerator ÷ denominator**. The fraction bar is a division sign — 3/8 simply means 3 divided by 8. Multiply the result by 100 to get the percentage.",
        "Some fractions convert cleanly (**terminating decimals**): denominators made only of 2s and 5s, like 8 or 20, always terminate. Others **repeat forever**: 1/3 = 0.333…, 5/6 = 0.8333…. This calculator shows decimals rounded to **6 decimal places** and percentages to 2, so repeating decimals appear as a close approximation, not the exact value.",
        "Dividing by zero is undefined, so a denominator of 0 returns an error instead of a result.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "**3/8** = 3 ÷ 8 = **0.375**, which is **37.50%**. **7/16** = 7 ÷ 16 = **0.4375**, or **43.75%**. Both terminate because 8 and 16 are powers of 2.",
        "**1/3** = 1 ÷ 3 = **0.333333** (rounded to 6 places), or **33.33%**. The true value repeats forever, so any decimal you write down is an approximation — for exact work, keep the fraction. A quick check: 0.333333 × 3 = 0.999999, not quite 1, which is the rounding showing.",
      ],
    },
    {
      heading: "When should you use the fraction, and when the decimal?",
      paragraphs: [
        "Decimals win for **measurement and money**: 0.375 inches or $37.50 is easier to read than 3/8 of a dollar. Fractions win for **exact math**: 1/3 + 1/3 + 1/3 is exactly 1, but 0.333 + 0.333 + 0.333 = 0.999. In cooking, construction, and school math, keep fractions until the final step, then convert.",
        "Common conversions worth memorizing: **1/2 = 0.5, 1/4 = 0.25, 3/4 = 0.75, 1/5 = 0.2, 1/8 = 0.125, 1/10 = 0.1**. With these six, most everyday fractions convert in your head.",
      ],
    },
  ],

  "decimal-to-fraction-calculator": [
    {
      heading: "How do you convert a decimal to a fraction?",
      paragraphs: [
        "Write the decimal over a power of 10, then simplify. Count the decimal places (n), multiply the decimal by **10ⁿ** to get the numerator, use **10ⁿ** as the denominator, then divide both by their **greatest common divisor (GCD)**.",
        "For **0.75**: two decimal places, so 0.75 = 75/100; the GCD of 75 and 100 is 25, giving **3/4**. The calculator does exactly this: it reads the decimal places from the number you type, builds the fraction, and reduces it with the GCD.",
        "This works for **terminating decimals** — decimals that end. Repeating decimals like 0.333… cannot be typed exactly, so entering 0.333 gives 333/1000, not 1/3. Irrational numbers such as π have no exact fraction form at all.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "**0.75** → 75/100 → divide by 25 → **3/4** (75%). **0.125** → 125/1000 → divide by 125 → **1/8** (12.50%). **2.5** → 25/10 → divide by 5 → **5/2** (250%).",
        "A longer one: **0.625** → 625/1000 → the GCD of 625 and 1000 is 125 → **5/8**. And **1.6** → 16/10 → divide by 2 → **8/5**. The percentage shown alongside is just the decimal × 100, so 0.625 is 62.50%.",
      ],
    },
    {
      heading: "Where is decimal-to-fraction conversion useful?",
      paragraphs: [
        "Cooking and construction still run on fractions: a recipe calling for 0.75 cups is **3/4 cup**, and a 0.125-inch drill bit is **1/8 inch**. In school math, fractions keep exact values where decimals round — 1/3 is exact, 0.333 is not.",
        "For repeating decimals, use algebra instead of this tool: for 0.333…, let x = 0.333…, then 10x = 3.333…, so 9x = 3 and x = **1/3**. The same trick works for any repeating block.",
      ],
    },
  ],

  "exponent-calculator": [
    {
      heading: "How are exponents calculated?",
      paragraphs: [
        "An exponent tells you how many times to multiply the base by itself: **xⁿ = x × x × … × x** (n times). So 2¹⁰ means 2 multiplied by itself 10 times. This calculator computes **xⁿ for any base and exponent**, including negative and fractional exponents, and also shows the result in scientific notation.",
        "The exponent rules behind the tool: **x⁰ = 1** for any nonzero x, **x⁻ⁿ = 1 ÷ xⁿ** (a negative exponent means 'take the reciprocal'), and **x^(1/n)** is the nth root — so 9^0.5 = √9 = 3. Multiplying powers with the same base adds exponents: xᵃ × xᵇ = x^(a+b).",
        "Results grow fast: each extra power of 2 doubles the answer. That is why the calculator shows scientific notation alongside the full number — 2⁶⁴ is 18,446,744,073,709,551,616, which is far easier to read as 1.8447e+19. One limitation: a negative base raised to a fractional exponent has no real-number answer in this calculator (it shows NaN), even though the cube root of −8 is −3.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "**2¹⁰** = 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 = **1,024**, shown in scientific notation as **1.0240e+3**. **5³** = 5 × 5 × 5 = **125**. **3⁴** = 3 × 3 × 3 × 3 = **81**.",
        "Negative and fractional exponents: **2⁻³** = 1 ÷ 2³ = 1 ÷ 8 = **0.125**. **9^0.5** = √9 = **3**. And **10⁶** = **1,000,000** — a 1 followed by six zeros, which is why scientific notation counts zeros as powers of 10.",
      ],
    },
    {
      heading: "Where do exponents show up in real life?",
      paragraphs: [
        "**Compound interest** is exponential: money growing at 7% a year multiplies by 1.07ⁿ, which is why starting early matters so much. **Computing** runs on powers of 2 — a kilobyte is 2¹⁰ = 1,024 bytes. **Science** uses exponents for anything that doubles or halves: bacterial growth, radioactive decay, and the Richter scale, where each whole number is 10 times the amplitude of the last.",
        "A useful mental shortcut: **2¹⁰ ≈ 10³** (1,024 ≈ 1,000). So 2²⁰ is about a million, 2³⁰ about a billion — close enough for quick estimates of storage, populations, and doubling times.",
      ],
    },
  ],

  "log-calculator": [
    {
      heading: "How are logarithms calculated?",
      paragraphs: [
        "A logarithm answers the question 'to what power must the base be raised to get this value?' — **logₐ(x) = y means aʸ = x**. So log₁₀(100) = 2 because 10² = 100. This calculator finds logs in any base using the **change of base formula**: **logₐ(x) = ln(x) ÷ ln(a)**, and it also shows log₁₀ and ln for every value you enter.",
        "The two most common bases have special names: **log₁₀** (common log, base 10) and **ln** (natural log, base e ≈ 2.71828). Base 10 logs count digits and powers of 10; natural logs appear wherever things grow or decay continuously — interest, populations, radioactive decay.",
        "Logarithms are only defined for **positive values** with a **positive base that is not 1**, so entering 0, a negative number, or base 1 returns an error. That is a mathematical rule, not a tool limitation: no power of 10 ever equals 0 or a negative number.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "**log₁₀(100) = 2** because 10² = 100, and **log₁₀(1,000) = 3** because 10³ = 1,000. For the same value, **ln(100) = 4.605170** — the natural log is larger because base e (≈2.718) is smaller than 10, so it takes more multiplications to reach 100.",
        "Custom bases work the same way: **log₂(32) = 5** because 2⁵ = 32, and **log₅(125) = 3** because 5³ = 125. Using the change of base formula, log₂(32) = ln(32) ÷ ln(2) = 3.465736 ÷ 0.693147 = **5**.",
      ],
    },
    {
      heading: "Where are logarithms used?",
      paragraphs: [
        "Logarithms turn multiplication into addition, which is why they appear in **scales**: the Richter scale, decibels, and pH are all logarithmic — each step of 1 means 10 times the underlying quantity. A magnitude 6 earthquake is 10 times the amplitude of a magnitude 5.",
        "They also **undo exponentials**: if an investment doubles every 8 years, log₂ tells you how many doublings fit in a given period, and ln appears in the continuous-compounding formula. In data work, log scales make exponential growth look like a straight line, which is why charts of infections, prices, and populations so often use them.",
      ],
    },
  ],

  "prime-factorization-calculator": [
    {
      heading: "How is prime factorization calculated?",
      paragraphs: [
        "Prime factorization breaks a number into the **prime numbers that multiply together to make it**. This calculator uses **trial division**: it divides by the smallest prime (2) as many times as possible, then moves to 3, then 5, and so on, until only 1 remains. The divisors it collected are the prime factors.",
        "Every integer above 1 has exactly **one** prime factorization — the **fundamental theorem of arithmetic**. That uniqueness is why factorization matters: it is the basis for simplifying fractions, finding GCDs and LCMs, and (at very large scales) modern cryptography — RSA encryption relies on the fact that factoring a 600-digit number is practically impossible.",
        "The calculator also reports the **unique primes** (each factor listed once), whether the number **is prime** (a number with only one factor — itself), and the **total count of factors**. Enter an integer of 2 or more; 1 and 0 have no prime factorization, so they return an error.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "**360**: divide by 2 → 180 → 90 → 45 (three 2s), then 45 is not even, so divide by 3 → 15 → 5 (two 3s), and 5 is prime. So 360 = **2 × 2 × 2 × 3 × 3 × 5**, or in exponent form **2³ × 3² × 5**. Check: 8 × 9 × 5 = **360**. Unique primes: 2, 3, 5. Number of factors: 6. Is prime? No.",
        "**97** is prime: trial division finds no divisor, so the factorization is just **97** itself, with 1 factor. And **100** = **2 × 2 × 5 × 5** = 2² × 5² — useful when simplifying 100/360, since the common factors 2² × 5 cancel to leave 5/18.",
      ],
    },
    {
      heading: "What is prime factorization used for?",
      paragraphs: [
        "**Simplifying fractions**: cancel the prime factors two numbers share. **Finding GCD and LCM**: the GCD takes the lowest shared powers, the LCM the highest powers. **Checking primality**: if trial division finds no factor up to the square root, the number is prime.",
        "Trial division is simple but slow for huge numbers — checking a 20-digit number this way could take billions of steps. That slowness is a feature, not a bug: it is what keeps RSA encryption secure. For everyday numbers under a few million, this calculator answers instantly.",
      ],
    },
  ],

  "surface-area-calculator": [
    {
      heading: "How is surface area calculated?",
      paragraphs: [
        "Surface area is the total area of all the outside faces of a 3D shape, measured in **square units**. This calculator covers four shapes: **sphere 4πr²**, **cylinder 2πr(r + h)**, **cone πr(r + l)** where l is the slant height, and **rectangular prism 2(lw + wh + lh)**.",
        "The cylinder formula counts both circular ends (2πr²) plus the curved side (2πrh); the cone formula counts the circular base (πr²) plus the curved side (πrl). For the cone you enter the **vertical height**, and the calculator works out the slant height itself with Pythagoras: **l = √(r² + h²)**.",
        "Enter dimensions in any unit — centimeters, inches, meters — and the answer comes back in that unit squared. The sphere uses only the radius (dimension 1); the other dimensions are ignored for it, and dimension 3 (depth) is used only by the rectangular prism.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Sphere, radius **5**: 4π × 5² = 4π × 25 = **314.16**. Cylinder, radius **5**, height **10**: 2π × 5 × (5 + 10) = 2π × 5 × 15 = **471.24**. Cone, radius **5**, height **10**: slant height = √(25 + 100) = √125 = 11.18, so π × 5 × (5 + 11.18) = **254.16**. Rectangular prism, **5 × 10 × 3**: 2 × (50 + 30 + 15) = **190.00**.",
        "Notice the cylinder beats the sphere here even though both have radius 5 — the extra height adds curved-side area. And the cone has the smallest area of the rounded shapes, because its side slopes inward instead of standing straight up.",
      ],
    },
    {
      heading: "Where does surface area matter?",
      paragraphs: [
        "**Painting and wrapping**: the paint, paper, or fabric you need is the surface area, not the volume. **Packaging**: a box's material cost follows its surface area, which is why flat, wide boxes cost more to make than compact ones of the same volume. **Heating and cooling**: radiators and heat sinks work by surface area — fins exist to add more of it.",
        "A useful rule: when you double every dimension, surface area grows **4 times** (2²) while volume grows 8 times (2³). That is why small objects cool faster relative to their size, and why scaling a design up changes its material needs more than you might expect.",
      ],
    },
  ],

  "due-date-calculator": [
    {
      heading: "How is a due date calculated?",
      paragraphs: [
        "A due date is a start date plus a duration: **due date = start date + number of days**. Enter the start date and how many days you have, and the calculator counts forward on the real calendar — across month ends and leap years — and shows the resulting date, its day of the week, and how many days from now it falls.",
        "This is a general deadline calculator for **invoices, assignments, contracts, warranties, and project milestones** — not a pregnancy due date (that is the separate Pregnancy Due Date Calculator, which counts 280 days from the last menstrual period). For a 'net 30' invoice dated February 1, the due date is simply 30 days later.",
        "The calculator counts **calendar days**, not business days, so weekends and holidays are included in the count. If your deadline is defined in business days, count those separately and enter the equivalent calendar span.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Start **February 1, 2025**, duration **30 days**: February 2025 has 28 days, so 30 days forward lands on **Monday, March 3, 2025** — 4 weeks and 2 days later. Start **January 1, 2025**, duration **90 days**: January (31) + February (28) + March (31) = 90 days, landing on **Tuesday, April 1, 2025**.",
        "Leap years are handled automatically: 30 days from February 1, 2024 lands on **March 2, 2024**, one day earlier than in 2025, because February 2024 had 29 days. The calculator uses real calendar dates, so you never need to adjust for leap years by hand.",
      ],
    },
    {
      heading: "What are the common due-date conventions?",
      paragraphs: [
        "**Net 30 / Net 60 / Net 90** in invoicing mean payment is due that many days after the invoice date — enter the invoice date and the net days. **Rental and subscription periods** often run to the same date next month, which is not always the same as adding 30 days: 30 days from January 31 is March 2, not February 28.",
        "For legal or contract deadlines, check whether the last day falls on a weekend or holiday — many contracts roll the deadline to the next business day. The calculator shows the calendar date; applying a business-day rule is a separate step.",
      ],
    },
  ],

  "countdown-calculator": [
    {
      heading: "How does a countdown calculator work?",
      paragraphs: [
        "A countdown calculator subtracts the current moment from a target date: **time remaining = target date − now**. It converts that gap from milliseconds into **days, total hours, whole weeks, and approximate months**, so you can see the same wait in whichever unit makes sense.",
        "The conversions are straightforward: hours are days × 24 plus the leftover hours, weeks are whole 7-day blocks (any leftover days are dropped), and months use the average month length of **30.44 days** (365.25 ÷ 12), which is why the months figure is labelled approximate. If the target date has already passed, every result shows **0** rather than a negative number.",
        "The countdown is a snapshot: it is calculated when the page loads or when you change the target date. It does not tick down in real time, so refresh the page for the latest figure.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A target **100 days** away shows **100 days**, **2,400 hours** (100 × 24), **14 weeks** (100 ÷ 7 = 14.28, rounded down), and **≈3 months** (100 ÷ 30.44 = 3.28, rounded to 3). A target **24 days** away — say December 1 to Christmas Day — shows **24 days**, **576 hours**, **3 weeks**, and **≈1 month** (24 ÷ 30.44 = 0.79, rounded to 1).",
        "A full year out: **365 days** shows **52 weeks** and **≈12 months** (365 ÷ 30.44 = 11.99, rounded to 12). The months figure is the roughest of the four — real months run 28 to 31 days — so use days for precise planning and months only for a general sense of scale.",
      ],
    },
    {
      heading: "What are countdowns useful for?",
      paragraphs: [
        "Countdowns turn vague dates into concrete plans: **exam revision** (days left sets the daily study load), **travel** (weeks left sets the booking and packing schedule), **project deadlines**, and **events** like weddings and product launches, where the same number in days, weeks, and months helps different people plan.",
        "One caution: the days figure counts **whole 24-hour periods** from now, not calendar dates, so a target 'tomorrow' can show 0 days if less than 24 hours remain. For date-only planning, the Date Calculator or Days Between Dates tool gives the calendar-day count instead.",
      ],
    },
  ],
  "currency-converter": [
    {
      heading: "How does currency conversion work?",
      paragraphs: [
        "A currency converter turns an amount in one currency into another by multiplying by the **exchange rate** between them — the price of one currency in terms of the other. This converter works through **US dollars as a middle step**: your amount is first converted to USD, then from USD into each of the other currencies, so all five results appear at once.",
        "The five currencies covered are the **US dollar (USD), euro (EUR), British pound (GBP), Japanese yen (JPY), and Canadian dollar (CAD)**. Real exchange rates move every minute while markets are open, so this converter uses **fixed approximate rates** built into the tool — it treats 1 euro as 1.08 USD, 1 pound as 1.27 USD, 1 Canadian dollar as 0.74 USD, and 1 yen as 0.0067 USD. Those figures are reasonable for a rough estimate, but they are not live market rates and will drift from the real rate over time.",
        "One display detail: yen results are shown as **whole yen with no decimals**, because the yen has no smaller unit in everyday use — 1 yen is the smallest amount, unlike dollars and euros, which divide into cents.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take **€100** at the converter's built-in approximate rate of 1 EUR = 1.08 USD: 100 × 1.08 = **$108.00**. From that $108.00, the other results follow by division: $108.00 ÷ 1.27 = **£85.04**, $108.00 ÷ 0.0067 = **¥16,119**, and $108.00 ÷ 0.74 = **C$145.95**.",
        "Going the other way, **$100** converts to 100 ÷ 1.08 = **€92.59**, 100 ÷ 1.27 = **£78.74**, 100 ÷ 0.0067 = **¥14,925**, and 100 ÷ 0.74 = **C$135.14**. Notice the results are not mirror images: converting there and back at the same rates returns your starting amount, but the two directions use multiplication one way and division the other.",
      ],
    },
    {
      heading: "Why the amount you actually receive is different",
      paragraphs: [
        "The figure a converter shows is a **mid-market style estimate**, not what a bank or exchange service will actually give you. Money changers buy currency at one rate and sell it at a slightly worse one — the gap is called the **spread** — and many also add a flat fee or commission. On a small exchange, fees can matter more than the rate itself.",
        "That is why this converter is best used for **rough budgeting and price comparisons** — working out whether a €60 hotel room is about $65 or about $85 — rather than for deciding the exact cost of a transfer. Before exchanging real money, check a live rate from your bank or a currency service, and compare the total you will receive after fees, not just the headline rate.",
      ],
    },
  ],

  "speed-converter": [
    {
      heading: "How is speed converted between units?",
      paragraphs: [
        "Speed is **distance divided by time**, so converting a speed means converting the distance part and the time part together. This converter works through **metres per second (m/s)** as a base unit: your value is first converted to m/s, then from m/s into km/h, mph, knots, and feet per second.",
        "The conversion factors are exact definitions: **1 km/h = 0.2778 m/s** (divide by 3.6), **1 mph = 0.44704 m/s** (one mile is exactly 1,609.344 metres), **1 knot = 0.514444 m/s** (one nautical mile is exactly 1,852 metres), and **1 ft/s = 0.3048 m/s**. A knot is simply a nautical mile per hour, the standard speed unit in aviation and at sea.",
        "One limitation to know: the converter **shows feet per second in the results but does not accept it as an input** — the From list offers only km/h, mph, m/s, and knots. To convert from ft/s, multiply by 0.3048 to get m/s first, then enter that value.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "**100 km/h** converts to 100 ÷ 3.6 = **27.7778 m/s**. From there: 27.7778 ÷ 0.44704 = **62.14 mph**, 27.7778 ÷ 0.514444 = **54.00 knots**, and 27.7778 ÷ 0.3048 = **91.13 ft/s**. The mile figure is the one drivers meet most: 100 km/h is just over 62 mph.",
        "Going the other way, **60 mph** is 60 × 0.44704 = **26.8224 m/s**, or 26.8224 × 3.6 = **96.56 km/h**. For a quick mental estimate, multiply mph by 1.6 to get km/h (60 mph ≈ 96 km/h) or multiply km/h by 0.6 to get mph (100 km/h ≈ 60 mph, a little under the exact 62.14).",
      ],
    },
    {
      heading: "Speeds worth knowing",
      paragraphs: [
        "Everyday speeds give the units a feel: walking is about **5 km/h (3.1 mph)**, a casual cyclist rides near **20 km/h (12 mph)**, and a typical US highway limit of **65 mph is about 105 km/h**, while the UK motorway limit of **70 mph is about 113 km/h**.",
        "At the fast end, the speed of sound in air is about **343 m/s — roughly 1,235 km/h or 767 mph** — which is why aircraft speeds are often given as a fraction of it (Mach 0.8 is 80% of the speed of sound). A commercial jet cruises near 900 km/h, about 250 m/s.",
      ],
    },
  ],

  "speed-calculator": [
    {
      heading: "How is speed calculated?",
      paragraphs: [
        "Average speed is the **distance travelled divided by the time it took**: speed = distance ÷ time. Enter a distance in kilometres and a time in hours and minutes, and this calculator gives your average speed in **km/h, mph, and m/s**.",
        "The result is an **average over the whole trip**, not the speed at any single moment. A drive with a fast highway stretch and a slow stretch through town has one average speed that blends both, and every stop — traffic lights, fuel, rest breaks — counts in the time and pulls the average down.",
        "Note what the tool does and does not do: it **calculates speed only**, from the distance and time you enter. It does not solve for distance or time, so to find a distance you would multiply speed by time yourself (distance = speed × time), and to find a time you would divide distance by speed.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A **100 km** trip taking **1 hour 30 minutes**: first convert the time to hours — 1 + 30 ÷ 60 = **1.5 hours**. Then 100 ÷ 1.5 = **66.67 km/h**. In miles per hour that is 66.67 ÷ 1.60934 = **41.42 mph**, and in metres per second 66.67 ÷ 3.6 = **18.52 m/s**.",
        "A marathon example: running **42.195 km in 4 hours** gives 42.195 ÷ 4 = **10.55 km/h** — about 6.55 mph, or a pace of roughly 5 minutes 41 seconds per kilometre.",
      ],
    },
    {
      heading: "What affects your average speed?",
      paragraphs: [
        "Anything that adds time without adding distance lowers your average: **stops, congestion, hills, and headwinds**. That is why a journey's average speed is almost always well below the cruising speed — a car that spends most of a trip at 100 km/h but sits in traffic for 20 minutes will average far less.",
        "Averages also do not combine the way intuition suggests. Drive somewhere at **60 km/h and back at 40 km/h** over the same distance, and the average for the round trip is **48 km/h, not 50** — because the slower leg takes longer, it weighs more heavily in the total time. The correct figure is the total distance divided by the total time, which is what this calculator does when you enter the full trip.",
      ],
    },
  ],

  "half-life-calculator": [
    {
      heading: "What is a half-life, and how is the remaining amount calculated?",
      paragraphs: [
        "A **half-life** is the time it takes for half of a substance to decay away. The amount left after any time follows the formula **N = N₀ × (½)^(t/t½)**, where N₀ is the starting amount, t is the elapsed time, and t½ is the half-life — every half-life that passes halves whatever remains.",
        "The decay is **exponential, not linear**: after 1 half-life 50% remains, after 2 half-lives 25%, after 3 half-lives 12.5%, and after 10 half-lives less than 0.1%. The same formula describes radioactive decay, the way medicines clear from the body, and any other process where a quantity halves on a fixed schedule.",
        "Two things to keep in mind: enter the half-life and the elapsed time in the **same units** (both in years, both in days, or both in hours), because the formula only uses their ratio — and the amount mathematically **never reaches exactly zero**, it just keeps halving toward it.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Start with **100 units** of a substance with a **half-life of 5** time units, and wait **15** time units: 15 ÷ 5 = **3 half-lives** have passed. Remaining = 100 × (½)³ = 100 × 0.125 = **12.5 units**, so **87.5 units have decayed** and **12.50%** remains.",
        "The formula also handles fractions of a half-life. Start with **200 units**, half-life **8 days**, elapsed time **20 days**: 20 ÷ 8 = **2.5 half-lives**, and 200 × 0.5^2.5 = 200 × 0.1768 = **35.3553 units** remaining — **17.68%** of the original.",
      ],
    },
    {
      heading: "Where half-life shows up in real life",
      paragraphs: [
        "The best-known use is **carbon-14 dating**: carbon-14 has a half-life of about 5,730 years, so measuring how much remains in once-living material tells archaeologists how long ago it died. After about 11,460 years — two half-lives — only a quarter of the original carbon-14 is left.",
        "In medicine, a drug's half-life sets how often it must be taken: a drug with a 6-hour half-life is mostly cleared within a day, while one with a 24-hour half-life builds up with daily doses. And in nuclear waste storage, half-lives ranging from days to thousands of years decide how long material must be kept isolated — which is why a single number, the half-life, carries so much practical weight.",
      ],
    },
  ],

  "concrete-calculator": [
    {
      heading: "How much concrete do I need?",
      paragraphs: [
        "Concrete is ordered by **volume**: multiply length × width × depth to get cubic feet, then divide by 27 to get **cubic yards** — the unit ready-mix suppliers use. This calculator also converts the same volume into the number of **60-lb and 80-lb bags** you would need if you mix it yourself.",
        "The depth is entered in inches and converted to feet first (depth ÷ 12), because length and width are in feet. The bag counts use the standard yields of about **0.45 cubic feet per 60-lb bag** and **0.6 cubic feet per 80-lb bag**, and both are rounded up — you cannot buy part of a bag.",
        "One honest caveat: the calculator gives the **exact volume of a perfect slab** and adds nothing for waste. Real pours lose concrete to spillage, uneven ground, and formwork, so order **5–10% extra** on top of the cubic-yard figure — for example, treat 1.23 cubic yards as roughly 1.36 with a 10% allowance.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A **10 ft × 10 ft slab, 4 inches deep**: volume = 10 × 10 × (4 ÷ 12) = 10 × 10 × 0.3333 = **33.3 cubic feet**. In cubic yards that is 33.33 ÷ 27 = **1.23 cubic yards**. In bags: 33.33 ÷ 0.45 = 74.07, rounded up to **75 sixty-pound bags**, or 33.33 ÷ 0.6 = 55.56, rounded up to **56 eighty-pound bags**.",
        "Double the length to a **20 ft × 10 ft slab at the same 4-inch depth** and everything doubles: **66.7 cubic feet**, **2.47 cubic yards**, **149 sixty-pound bags**, or **112 eighty-pound bags**. At that size, ready-mix delivery is usually the practical choice — mixing 149 bags by hand is a very long day.",
      ],
    },
    {
      heading: "Bags or ready-mix — and how thick should the slab be?",
      paragraphs: [
        "**4 inches** is the standard depth for patios, walkways, and shed bases. Driveways and areas that carry vehicles are usually poured **5–6 inches** thick, and the extra depth adds up fast: a 10 × 10 slab at 6 inches needs 50 cubic feet (1.85 cubic yards) instead of 33.3.",
        "As a rough guide, **bags suit small jobs** — a few fence post footings, a small pad — while anything around a cubic yard or more is usually cheaper and far less labor as **ready-mix delivered by truck**. Either way, the calculator's volume is the starting point for the quote.",
        "The tool assumes a **rectangular slab**. For an L-shaped patio or a round pad, split the area into rectangles (or work out the shape's area separately) and add the volumes together — the calculator handles one rectangle at a time.",
      ],
    },
  ],

  "paint-calculator": [
    {
      heading: "How much paint do I need for a room?",
      paragraphs: [
        "Paint is sold by the gallon and one gallon covers about **350 square feet**, so the amount you need comes from your wall area: the calculator measures the walls, subtracts **15% for doors and windows**, multiplies by the **number of coats**, and divides by 350.",
        "The wall area is the room's **perimeter times the wall height** — 2 × (length + width) × height. The 15% deduction for doors and windows is a flat estimate, not a measurement of your room: a room with a wall of windows will need less paint than the estimate, and a room with almost no openings will need a little more.",
        "Gallons are always **rounded up to whole gallons**, since paint is not sold in fractions. One reading tip: the **Paintable Area** figure the calculator shows already includes your coats — for the default room it reads 734 sq ft, which is 367 sq ft of wall surface times 2 coats, not the wall surface alone.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A **15 ft × 12 ft room with 8 ft walls, painted with 2 coats**: wall area = 2 × (15 + 12) × 8 = **432 sq ft**. Subtract 15% for doors and windows (432 × 0.15 = 64.8) to get **367.2 sq ft** of paintable wall. Two coats double that to **734.4 sq ft**, and 734.4 ÷ 350 = 2.098 gallons — rounded up, **3 gallons**.",
        "The same room with **one coat** would need only 367.2 ÷ 350 = 1.049 gallons, still rounded up to **2 gallons**. And a smaller **12 ft × 10 ft room, 8 ft walls, one coat**: wall area = 2 × (12 + 10) × 8 = **352 sq ft**, paintable area = 352 × 0.85 = **299.2 sq ft**, and 299.2 ÷ 350 = 0.855 gallons — rounded up to **1 gallon**.",
      ],
    },
    {
      heading: "What changes how much paint you need?",
      paragraphs: [
        "The **350 sq ft per gallon** figure assumes smooth, previously painted walls. Rough or textured surfaces, bare drywall, and porous plaster absorb more paint and can cut coverage noticeably — a coat of **primer on new drywall** seals the surface and keeps the top coats closer to their rated coverage.",
        "**Colour changes** matter too: painting a light colour over a dark one usually needs an extra coat, and deep, rich colours sometimes need three coats for an even finish. Budget for the extra coat rather than discovering it halfway through the second gallon.",
        "Finally, this calculator covers **walls only** — ceilings, trim, and doors need separate estimates, and ceilings in particular take more paint than people expect, because the same 350 sq ft per gallon applies to a large flat area overhead.",
      ],
    },
  ],

  "percentage-change-calculator": [
    {
      heading: "How is percentage change calculated?",
      paragraphs: [
        "Percentage change compares a new value with an old one: **subtract the old value from the new value, divide by the old value, and multiply by 100**. A positive result is an increase; a negative result is a decrease.",
        "The formula is **((new − old) ÷ |old|) × 100**. The calculator divides by the **absolute value** of the old number, so a change from a negative starting value still reads sensibly — moving from −50 to −25 is a genuine improvement, and the calculator reports it as a 50% increase rather than a misleading negative figure.",
        "One edge case: if the old value is **zero**, percentage change is mathematically undefined, because you cannot divide by zero. This calculator shows **0%** in that case rather than an error — treat it as 'no meaningful percentage change' rather than a real result.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A price rises from **$50 to $75**: change = 75 − 50 = **25**, and 25 ÷ 50 × 100 = **50% increase**. A price falls from **$80 to $60**: change = 60 − 80 = **−20**, and −20 ÷ 80 × 100 = **−25%**, a 25% decrease. In both cases the calculator also shows the absolute change (25 and −20) and the direction.",
        "Percentage changes are **not symmetric**: a 50% rise followed by a 50% fall does not return you to the start. $100 rising 50% becomes $150, but $150 falling 50% becomes **$75** — because the second 50% is taken from a larger base. The same asymmetry is why an investment that falls 50% needs a 100% gain to recover.",
      ],
    },
    {
      heading: "Percentage change vs percentage points",
      paragraphs: [
        "The most common confusion is between **percentage change** and **percentage points**. If an interest rate rises from 10% to 12%, the rise is **2 percentage points** (the simple arithmetic difference), but the percentage change is (12 − 10) ÷ 10 × 100 = **20%**. Both figures are correct — they answer different questions.",
        "In everyday use, percentage change is the right tool for **prices, pay rises, and investment returns** ('up 8% this year'), while percentage points belong to rates that are already percentages ('unemployment rose 0.5 points'). Mixing them up is how headlines mislead: a tax rate going from 20% to 25% is a 5-point rise, not a 5% rise — it is a 25% increase.",
      ],
    },
  ],

  "home-affordability-calculator": [
    {
      heading: "How much house can I afford?",
      paragraphs: [
        "Lenders size a mortgage by your **monthly income and debts**, not your savings alone. This calculator applies the common **28/36 rule**: your housing payment should stay under 28% of gross monthly income, and your housing payment plus other monthly debts should stay under 36% — the lower of the two caps becomes your maximum monthly payment.",
        "From that payment, the calculator works backwards to a loan amount using the **present value of an annuity**: it asks what loan your maximum payment would pay off over **30 years (360 monthly payments)** at the interest rate you enter, with a fixed rate assumed. Your **maximum home price is that loan plus your down payment**.",
        "Be clear about what the figure leaves out: the payment covers **principal and interest only** — property tax, homeowner's insurance, HOA dues, and PMI (usually required when the down payment is under 20%) are all extra, so your real monthly housing cost will be higher. The DTI ratio shown is the debt-to-income ratio **at the maximum payment**, and there is no input for the loan term — 30 years is fixed.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take an **$85,000** annual income, **$500** a month in other debts, a **$40,000** down payment, and a **6.5%** rate. Monthly income is $85,000 ÷ 12 = **$7,083.33**. The 28% cap is $7,083.33 × 0.28 = **$1,983.33**; the 36% cap is $7,083.33 × 0.36 − $500 = **$2,050.00**. The lower cap binds, so the maximum payment is **$1,983.33**.",
        "At 6.5%, the monthly rate is 0.065 ÷ 12 = 0.0054167, and the annuity factor for 360 payments is about **158.21** — each dollar of monthly payment supports about $158.21 of loan. So the maximum loan is $1,983.33 × 158.21 = **$313,785**, and the maximum home price is $313,785 + $40,000 = **$353,785**, with a DTI of ($1,983.33 + $500) ÷ $7,083.33 = **35.06%**.",
        "Debts change the answer fast. With a **$60,000** income and **$800** a month in debts, monthly income is $5,000: the 28% cap is $1,400, but the 36% cap is $5,000 × 0.36 − $800 = **$1,000** — now the debts bind, and the maximum payment drops to $1,000, supporting a loan of about **$158,211** at 6.5% and a DTI of exactly 36%.",
      ],
    },
    {
      heading: "What this estimate leaves out",
      paragraphs: [
        "The biggest omissions are the **recurring costs bundled into a real mortgage payment**: property taxes and homeowner's insurance are usually collected monthly by the lender, HOA dues apply in many neighbourhoods, and PMI adds a monthly premium when the down payment is under 20%. On a $350,000 home these can easily add hundreds of dollars a month on top of principal and interest.",
        "There are also **one-off costs** the calculator does not model: closing costs, moving, and the maintenance every home needs — a common budgeting rule is to set aside roughly 1% of the home's value per year for upkeep. And lenders look beyond the ratios at your **credit score, employment history, and savings** after the down payment, so the 28/36 result is a planning guideline, not a promise of approval.",
      ],
    },
  ],

  "annuity-calculator": [
    {
      heading: "What is an annuity and how is it calculated?",
      paragraphs: [
        "An annuity is a series of equal payments made at regular intervals — for example, $1,000 deposited every year into a retirement account. Its future value is calculated with **FV = PMT × [(1+r)ⁿ − 1] / r**, where PMT is the payment, r is the interest rate per period, and n is the number of periods.",
        "There are two kinds. An **ordinary annuity** pays at the *end* of each period, while an **annuity due** pays at the *beginning*, so each payment earns interest for one extra period and ends up worth more. This calculator shows both, plus the **present value** — what the whole stream of future payments is worth in today's dollars, using PV = PMT × [(1 − (1+r)⁻ⁿ) / r].",
        "Note the units this tool uses: the rate is an **annual** rate and each period is **one year**, so a 20-period annuity is a 20-year plan with one payment a year. The calculator assumes a constant rate and ignores taxes and fees, and it needs a rate above zero — at 0% the formula divides by zero and shows no result.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Pay **$1,000 a year for 20 years at 5%**. The future value of an ordinary annuity is $1,000 × [(1.05²⁰ − 1) / 0.05] = $1,000 × 33.06595 = **$33,065.95**. The same payments as an annuity due are worth $33,065.95 × 1.05 = **$34,719.25** — the extra year of interest on every payment adds $1,653.30.",
        "You paid in **$20,000** in total, so $13,065.95 of the ordinary annuity's value is interest earned. The present value is **$12,462.21**: that is the lump sum you would need to invest today at 5% to fund the same twenty $1,000 payments. If someone offers you $11,000 cash instead of this payment stream, the calculator tells you the stream is worth more.",
      ],
    },
    {
      heading: "How to use the annuity result in planning",
      paragraphs: [
        "The present-value figure is the practical one: it lets you compare a lump sum against a payment stream on equal terms. Lottery winners, structured-settlement recipients, and retirees choosing between a pension lump sum and monthly payments all face exactly this comparison.",
        "Small changes in the inputs move the answer a lot over long periods. Try raising the rate by one point, or adding five years, and watch the future value jump — that is compounding doing the heavy lifting. The flip side is that the result is only as good as the rate you assume: a guaranteed 5% and a hoped-for 5% are very different things, so run the calculation at a conservative rate as well as an optimistic one before making a decision.",
      ],
    },
  ],

  "bond-calculator": [
    {
      heading: "How is a bond's price calculated?",
      paragraphs: [
        "A bond's price is the present value of everything it will pay you: all its future coupon (interest) payments plus the face value returned at maturity, each discounted back to today at the current market rate. The formula is **Price = Σ(Coupon ÷ (1+r)ᵗ) + Face ÷ (1+r)ⁿ**, where r is the market rate (yield to maturity) and n is the years to maturity.",
        "This is why bond prices move in the opposite direction to interest rates. When market rates rise, the bond's fixed coupons are discounted more heavily, so the bond is worth less. When rates fall, the same fixed coupons become more valuable and the price rises. A bond trades at a **premium** when its coupon rate is above the market rate, at a **discount** when below, and at **par** when the two are equal.",
        "This calculator assumes **annual coupon payments** and takes the market rate (yield to maturity) as an input — it prices the bond for you, but it does not solve for the yield itself. It also needs a market rate above zero; at 0% the formula divides by zero and shows no result.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **$1,000 bond with a 5% coupon and 10 years to maturity**, when the market rate is **4%**. The annual coupon is $50. The present value of ten $50 coupons at 4% is about $405.54, and the present value of the $1,000 face value is about $675.56 — so the bond is worth **$1,081.11**. Because the 5% coupon beats the 4% market rate, it sells at a premium of $81.11.",
        "Now suppose market rates rise to **6%**. The same bond is worth only **$926.40** — the coupons are worth about $368.00 in today's dollars and the face value about $558.39. The bond lost about 14% of its value from a two-point rate rise, even though nothing about the bond itself changed. The **current yield** also shifts: $50 ÷ $1,081.11 = **4.62%** at the 4% market rate, but $50 ÷ $926.40 = **5.40%** at 6%.",
      ],
    },
    {
      heading: "What the price tells you — and what it doesn't",
      paragraphs: [
        "The price tells you what the bond is worth today, not what you will earn. **Current yield** (coupon ÷ price) ignores the gain or loss when the bond matures at face value; **yield to maturity** counts it, which is why it is the better comparison between bonds. A premium bond's YTM is always below its coupon rate, because part of your return is given back as the price falls toward face value at maturity.",
        "Before buying, compare the YTM with bonds of similar maturity and credit quality, and remember the price assumes the issuer pays in full and on time. A high yield on a bond usually means the market thinks the issuer is riskier — the extra return is compensation for extra risk, not a free lunch.",
      ],
    },
  ],

  "business-loan-calculator": [
    {
      heading: "How are business loan payments calculated?",
      paragraphs: [
        "A business term loan is repaid in equal monthly instalments that cover interest plus a slice of the principal, calculated with the standard amortization formula **M = P × [r(1+r)ⁿ] / [(1+r)ⁿ − 1]**, where P is the loan amount, r is the monthly rate (annual rate ÷ 12), and n is the number of months. This calculator adds the origination fee on top: the fee is part of your total cost, and it is deducted from the cash you actually receive.",
        "That last point matters when comparing offers. A loan's headline rate ignores fees, so two loans with the same rate can have very different total costs once origination fees are counted. This calculator shows the **total cost of the loan** (all payments plus the fee) and the **total amount received** (loan minus fee) so you can compare like with like.",
        "The calculation assumes a fixed rate and equal monthly payments for the whole term. It does not include variable-rate changes, prepayment penalties, or closing costs beyond the origination fee you enter — check those separately before signing.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Borrow **$100,000 at 8% for 5 years (60 months)** with a **2% origination fee**. The monthly rate is 0.08 ÷ 12 = 0.006667, giving a monthly payment of **$2,027.64**. Over 60 months you pay $121,658.37 in total, of which **$21,658.37 is interest**. The 2% fee is **$2,000**, so the total cost is **$123,658.37** — and you actually receive **$98,000**, because the fee is taken out of the loan proceeds.",
        "Term length is the biggest lever after the rate. The same $100,000 at 8% over **3 years** costs **$3,133.64 a month** but only **$12,810.92 in interest** — a saving of $8,847.45 against the 5-year loan. Stretch it to **7 years** and the payment drops to **$1,558.62**, but total interest climbs to **$30,924.20**. A lower payment is not a cheaper loan.",
      ],
    },
    {
      heading: "How to compare business loan offers",
      paragraphs: [
        "Compare **total cost**, not the monthly payment and not the rate alone. A loan with a lower rate but a 5% origination fee can cost more than a slightly higher-rate loan with no fee — run both through this calculator with their real fees and terms before deciding.",
        "Also match the term to what the money buys. Equipment that lasts five years should not be financed over ten, and short-term working capital should not carry a long-term loan's interest bill. SBA loans usually offer lower rates and longer terms but slower approval and more paperwork; online term lenders are faster but often pricier. Whatever the source, confirm whether the rate is fixed, whether there is a prepayment penalty, and whether the lender requires a personal guarantee — none of those show up in a payment calculation, and all of them affect the real cost.",
      ],
    },
  ],

  "commission-calculator": [
    {
      heading: "How is commission calculated?",
      paragraphs: [
        "Commission is a percentage of the sales you make: **Commission = Sales × Rate ÷ 100**. If you also earn a base salary, your total earnings are the base plus the commission. This calculator uses that flat-rate formula, then annualizes the result by multiplying by 12.",
        "With the default figures — **$50,000 in sales at an 8% commission rate with a $3,000 monthly base salary** — the commission is $50,000 × 0.08 = **$4,000**, total monthly earnings are **$7,000**, and the annual projection is **$84,000**. The 'effective earnings rate' of **14.00%** is total earnings divided by sales, so it includes the base salary — it is not the same as your commission rate.",
        "Note that this calculator works with a **single flat rate** only, even though its description mentions tiered structures. If your plan pays different rates at different sales levels, calculate each tier separately and add them up, or run the tool once per tier.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A salesperson closes **$75,000 in a month at a 10% commission rate** with a **$3,000 base salary**. Commission is $75,000 × 0.10 = **$7,500**, so total monthly earnings are **$10,500** and the annual projection is **$126,000** — assuming every month matches this one.",
        "Now compare a higher-rate, lower-base offer: **12% commission with a $1,500 base** on the same $75,000 of sales pays $9,000 + $1,500 = **$10,500** — exactly the same this month. But in a slow $30,000 month, the first plan pays $3,000 + $3,000 = **$6,000** while the second pays $3,600 + $1,500 = **$5,100**. The break-even point between the two plans is $75,000 in monthly sales: below it the higher base wins, above it the higher rate wins. That is the calculation worth doing before accepting a compensation plan.",
      ],
    },
    {
      heading: "Flat, tiered, and draw — know your plan",
      paragraphs: [
        "A **flat rate** pays the same percentage on every sale and is the easiest to forecast. A **tiered plan** pays more as you sell more — for example 5% on the first $20,000 and 10% above it — which rewards high performers but makes income lumpy. A **draw** is an advance against future commission: it smooths your income, but if your commissions fall short of the draw you may owe the difference back, depending on whether the draw is recoverable.",
        "Whichever structure you are on, check three things in writing: whether commission is paid on the sale price or on collected revenue, when it is paid (at sale, at delivery, or at payment), and what happens to unpaid commission if you leave. The rate is only one part of what a plan is actually worth.",
      ],
    },
  ],

  "credit-cards-payoff-calculator": [
    {
      heading: "How long does it take to pay off a credit card?",
      paragraphs: [
        "Payoff time depends on three numbers — your balance, your APR, and your fixed monthly payment — and it follows the formula **Months = −log(1 − Balance×r ÷ Payment) ÷ log(1+r)**, where r is the monthly rate (APR ÷ 12). The critical condition is that your payment must be larger than one month's interest, or the balance never shrinks at all; this calculator shows an error message if the payment you enter is too low.",
        "The reason card debt is so stubborn is that interest is charged on the balance every month. Early on, most of each payment goes to interest and only a little reduces what you owe. As the balance falls, more of each payment attacks the principal — which is why raising your payment even modestly shortens the payoff dramatically.",
        "This calculator assumes a fixed monthly payment, a fixed APR, and no new charges. It also rounds the payoff time up to whole months, so the final payment is counted in full — the true total paid is very slightly less than shown.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take an **$8,000 balance at 22% APR** with a **$200 monthly payment**. One month's interest is $8,000 × 0.22 ÷ 12 = $146.67, so only $53.33 of the first payment reduces the balance. The payoff takes **73 months — 6.1 years** — and you pay **$14,600 in total, including $6,600 of interest**, nearly doubling the cost of whatever you bought.",
        "Raise the payment to **$300 a month** and the picture changes completely: payoff falls to **37 months**, total paid to **$11,100**, and interest to **$3,100**. An extra $100 a month saves **$3,500 in interest and three years of payments**. Even $250 a month cuts the payoff to 49 months and interest to $4,250.",
      ],
    },
    {
      heading: "How to pay off card debt faster",
      paragraphs: [
        "The fastest lever is the payment itself: pay as much above the minimum as you can, every month, and stop adding new charges to the card. If you carry several cards, the **avalanche method** (extra money to the highest APR first) minimizes total interest, while the **snowball method** (smallest balance first) gives quicker wins — this site has a calculator for each.",
        "Two other options can help: a **balance-transfer card** with a 0% introductory APR stops interest accruing while you pay down principal (watch the transfer fee and what happens when the intro period ends), and a **personal loan** at a lower fixed rate can replace revolving card debt with a fixed payoff date. Either way, the habit that matters is the one the calculator assumes — a fixed payment, made every month, with no new borrowing on top.",
      ],
    },
  ],

  "debt-avalanche-calculator": [
    {
      heading: "How does the debt avalanche method work?",
      paragraphs: [
        "The avalanche method attacks your debts in order of interest rate, highest first. You pay the minimum on every debt, then throw all your extra money at the highest-rate balance until it is gone, then move to the next-highest rate. Because high-rate debt generates the most interest per dollar, clearing it first minimizes the total interest you pay — it is the mathematically cheapest way to become debt-free.",
        "This calculator assumes a minimum payment of **2% of each balance (with a $25 floor)** and applies your extra monthly payment to the highest-rate debt that still has a balance. It models up to three debts. One thing to know: when a debt is cleared, this tool does **not** roll that debt's freed minimum payment into the next target — your total monthly payment shrinks instead. A textbook avalanche keeps the total payment constant by rolling freed minimums forward, so the tool's payoff time is slightly longer than a strict avalanche would be.",
        "Avalanche is cheapest on paper, but it has a motivational weakness: if your highest-rate debt is also your biggest, months can pass before any debt disappears. That is the trade-off against the snowball method, which clears a debt quickly for a morale boost.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Suppose you owe **$3,000 at 10%, $5,000 at 24%, and $12,000 at 6%** — $20,000 in total — and you can pay **$500 a month extra** on top of minimums. The avalanche targets the 24% card first: it is cleared in about 10 months, and the whole $20,000 is gone in **27 months (2 years 3 months)** with **$1,864.10 of interest** paid.",
        "Pay the same debts smallest-first (the snowball method) and it takes **28 months with $2,199.99 of interest** — the avalanche saves **$335.89 and one month**. The saving comes entirely from killing the 24% balance early instead of letting it accrue interest while you clear cheaper debts. With the calculator's default debts ($2,000 at 18%, $8,000 at 12%, $15,000 at 6%), both methods give the same answer — 30 months and $2,317.07 of interest — because the smallest debt is also the highest-rate one, so both methods attack it first. The methods only diverge when the smallest balance is not the highest rate.",
      ],
    },
    {
      heading: "When avalanche beats snowball — and when it doesn't",
      paragraphs: [
        "Avalanche wins whenever the rate spread between your debts is wide: a 24% card against a 6% loan is a clear case for attacking the card first. The bigger the rate gap and the bigger the high-rate balance, the more the avalanche saves. Run both calculators with your real numbers — the difference is sometimes hundreds of dollars, sometimes almost nothing.",
        "But the cheapest plan is only the best plan if you stick to it. Research on debt payoff consistently finds that people who clear a debt quickly are more likely to keep going, and avalanche's first win can be months away. If you have tried the avalanche before and stalled, the snowball's early wins may be worth more than the interest saved. Either method beats minimum payments by a wide margin: paying only minimums on the default debts takes 94 months and costs $7,174.57 in interest — more than triple the avalanche's $2,317.07.",
      ],
    },
  ],

  "debt-snowball-calculator": [
    {
      heading: "How does the debt snowball method work?",
      paragraphs: [
        "The snowball method attacks your debts in order of balance, smallest first. You pay the minimum on every debt, then throw all your extra money at the smallest balance until it is gone, then move to the next-smallest. Each cleared debt is a visible win, and the method is designed around motivation: quick victories keep you paying when a long slog would not.",
        "This calculator assumes a minimum payment of **2% of each balance (with a $25 floor)** and applies your extra monthly payment to the smallest debt that still has a balance. It models up to three debts. One thing to know: when a debt is cleared, this tool does **not** roll that debt's freed minimum payment into the next target — your total monthly payment shrinks instead. A textbook snowball keeps the total payment constant by rolling freed minimums forward, so the tool's payoff time is slightly longer than a strict snowball would be.",
        "The trade-off is cost. Because the snowball ignores interest rates, a high-rate balance can keep accruing expensive interest while you clear cheaper debts first. The avalanche method (highest rate first) is mathematically cheaper — the question is whether the snowball's momentum is worth the extra interest to you.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Suppose you owe **$3,000 at 10%, $5,000 at 24%, and $12,000 at 6%** — $20,000 in total — and you can pay **$500 a month extra** on top of minimums. The snowball targets the $3,000 balance first: with its $60 minimum plus the $500 extra, it is cleared in **6 months**. That first win comes four months sooner than the avalanche's first cleared debt, which takes about 10 months.",
        "The whole $20,000 is gone in **28 months (2 years 4 months)** with **$2,199.99 of interest** paid. The avalanche would finish one month sooner and cost **$335.89 less in interest** — the price of the snowball's quicker wins in this example. With the calculator's default debts ($2,000 at 18%, $8,000 at 12%, $15,000 at 6%), both methods give the same answer — 30 months and $2,317.07 of interest — because the smallest debt is also the highest-rate one. And either method crushes minimum-only payments, which would take 94 months and cost $7,174.57 in interest on those same debts.",
      ],
    },
    {
      heading: "Why the snowball works even though it costs more",
      paragraphs: [
        "Debt payoff fails more often from lost motivation than from bad arithmetic. Clearing a whole debt in a few months proves the plan works, frees up a payment, and shrinks the number of creditors chasing you — and studies of real payoff behaviour find that people using the smallest-first order are more likely to eliminate their debts entirely than people who start with the highest rate.",
        "The snowball makes most sense when your debts' interest rates are close together, so the extra cost is small, or when you have several small balances you can clear in quick succession. If one debt carries a much higher rate than the rest — a 24% card next to a 6% loan — run the avalanche calculator too and compare the interest difference. If the gap is a few hundred dollars, the snowball's momentum may be worth it; if it is thousands, the avalanche deserves a serious look. The method you finish is always better than the method you quit.",
      ],
    },
  ],

  "discount-calculator": [
    {
      heading: "How is a discount calculated?",
      paragraphs: [
        "A discount is a percentage taken off the original price: **Sale Price = Original Price × (1 − Discount ÷ 100)**, and **Savings = Original Price × Discount ÷ 100**. A 25% discount on a $100 item saves $25 and leaves a $75 sale price.",
        "Going the other way, the discount percentage is **((Original − Sale) ÷ Original) × 100** — so an $80 item marked down to $60 is 25% off. This calculator works in the first direction only: you enter the original price and the discount percentage, and it shows the sale price and your savings. Its description mentions finding the discount percentage from a sale price, but the tool has no sale-price input, so use the formula above for that.",
        "One label to read carefully: the 'Discount Amount' row shows the discount **percentage** (25.00%), not a dollar amount — the dollar savings are on the 'You Save' row.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A jacket is priced at **$240 with 30% off**. The savings are $240 × 0.30 = **$72**, so the sale price is $240 − $72 = **$168**. A quick mental check: 10% of $240 is $24, so 30% is three times that, $72.",
        "Now suppose the store offers an extra 10% off at the till. The second discount applies to the already-reduced $168, not the original $240: $168 × 0.90 = **$151.20**. The total saving is $88.80, or 37% — not the 40% you get by adding 30 and 10. Stacked discounts always multiply, never add.",
      ],
    },
    {
      heading: "Discount traps to watch for",
      paragraphs: [
        "'**Up to 70% off**' usually means a handful of items at 70% and most at far less — check the actual price, not the headline. A 'was $200, now $100' tag is only a bargain if the item genuinely sold at $200; inflated 'was' prices are common enough that comparing the sale price against other stores is worth the minute it takes.",
        "Also remember that the discount applies to the price **before tax** in most places, so your total at the till will be higher than the sale price shown here. And a discount only saves money if you were going to buy the item anyway — 50% off something you don't need is still 50% spent, not 50% saved.",
      ],
    },
  ],

  "heloc-calculator": [
    {
      heading: "How much can you borrow with a HELOC?",
      paragraphs: [
        "A HELOC (home equity line of credit) lets you borrow against the equity in your home, up to a limit set by the lender: **Max HELOC = Home Value × Max LTV% − Mortgage Balance**. LTV (loan-to-value) is the share of your home's value the lender will let you borrow in total, including your existing mortgage — 85% is a common cap.",
        "With a **$400,000 home, a $250,000 mortgage balance, and an 85% LTV limit**, the maximum is $400,000 × 0.85 − $250,000 = **$90,000**. Your total equity is $400,000 − $250,000 = **$150,000**, but the LTV cap means you cannot borrow all of it — the lender keeps a cushion. If the result is negative (your mortgage already exceeds the LTV cap), the calculator shows $0.",
        "A HELOC is a **revolving line**, like a credit card secured by your home: you draw what you need, pay interest only on what you have drawn, and can borrow again as you repay. The rate is usually variable, tied to the prime rate, so payments move with the market.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Using the figures above, you draw **$50,000 at an 8.5% rate**. During the draw period most HELOCs require interest-only payments: $50,000 × 0.085 ÷ 12 = **$354.17 a month**. Drawing the full $90,000 maximum would cost **$637.50 a month** in interest-only payments at the same rate.",
        "The 'Equity Used' figure shows how much of your home's value is now borrowed against: ($250,000 mortgage + $50,000 draw) ÷ $400,000 = **75%**. That leaves 25% of the home's value as your remaining equity cushion — and it is the number lenders watch if you ever refinance or sell.",
      ],
    },
    {
      heading: "What to know before drawing on a HELOC",
      paragraphs: [
        "The payment this calculator shows is **interest-only**, which is what you pay during the draw period (often 10 years). After that comes the repayment period, when you must pay down the principal too — typically over 15–20 years — and the monthly payment jumps. Budget for the repayment-phase payment, not just the interest-only figure, because the jump catches many borrowers by surprise.",
        "Two more things to check before you draw. First, the rate is variable: at 8.5% the interest-only payment on $50,000 is $354.17, but if rates rise two points it becomes $437.50 — and the rate has no fixed ceiling unless your agreement sets one. Second, your home secures the loan, so missed payments put the house itself at risk. On tax, HELOC interest is generally deductible only when the money is used to buy, build, or substantially improve the home that secures the loan — check the current IRS rules or ask a tax professional before assuming a deduction.",
      ],
    },
  ],

  "lease-calculator": [
    {
      heading: "How is a car lease payment calculated?",
      paragraphs: [
        "A lease payment has two parts: **depreciation** (the value the car loses while you drive it) plus a **finance charge** (the leasing company's profit on the money tied up). The formulas are **Depreciation = (Cap Cost − Residual Value) ÷ Term** and **Finance Charge = (Cap Cost + Residual Value) × Money Factor**, where the cap cost is the negotiated price minus your down payment, and the residual value is what the car is expected to be worth when the lease ends.",
        "The **money factor** is the lease world's version of an interest rate, written as a small decimal. Multiply it by 2,400 to get the approximate APR: a money factor of 0.002 is about 4.8% APR. Dealers sometimes quote the money factor precisely because it looks tiny — always convert it before comparing with a loan rate.",
        "This calculator covers depreciation, finance charge, and the down payment. It does not include sales tax, acquisition fees, disposition fees, or registration, which can add a meaningful amount to the real monthly cost — ask the dealer for the all-in figure before signing.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Lease a **$40,000 car with a 55% residual value, a 0.002 money factor, $3,000 down, and a 36-month term**. The residual value is $40,000 × 0.55 = **$22,000**, and the cap cost is $40,000 − $3,000 = **$37,000**. Depreciation is ($37,000 − $22,000) ÷ 36 = **$416.67 a month**; the finance charge is ($37,000 + $22,000) × 0.002 = **$118.00 a month**. Total monthly payment: **$534.67**, and the total cost over the lease is $534.67 × 36 + $3,000 = **$22,248**.",
        "What if you put nothing down? The cap cost stays $40,000, depreciation rises to $500.00 and the finance charge to $124.00, for a payment of **$624.00 a month** and a total of **$22,464**. The $3,000 down payment saves only **$216** over three years — and that money is at risk: if the car is totaled early in the lease, your down payment is generally not refunded. Many lease guides advise keeping the down payment small for exactly that reason.",
      ],
    },
    {
      heading: "How to get a better lease deal",
      paragraphs: [
        "Three numbers decide your payment, and all three are negotiable or choosable. **Negotiate the cap cost** like a purchase price — every $1,000 off the price cuts roughly $30 a month on a 36-month lease. **Pick a car with a high residual value**: a 60% residual instead of 55% on this $40,000 car would cut the depreciation charge from $416.67 to $361.11 a month. And **check the money factor** against current loan rates — a money factor of 0.003 is 7.2% APR, which may be more than a loan would cost.",
        "Before signing, confirm the mileage allowance and the per-mile overage charge, the wear-and-tear standards, and the disposition fee at turn-in. A cheap monthly payment with a 10,000-mile annual limit is expensive if you drive 15,000 miles a year — at $0.25 a mile, 5,000 extra miles a year costs $1,250 a year, or about $104 a month.",
      ],
    },
  ],

  "markup-calculator": [
    {
      heading: "How is markup calculated?",
      paragraphs: [
        "Markup is the percentage added to an item's cost to set its selling price: **Selling Price = Cost × (1 + Markup ÷ 100)**. A 75% markup on a $40 item adds $30 and gives a $70 selling price. The profit is the difference between selling price and cost, and this calculator also shows the **equivalent profit margin** — profit as a percentage of the selling price, not the cost.",
        "Markup and margin are the two ways of describing the same profit, and mixing them up is the most common pricing mistake in small business. A 75% markup sounds like a 75% profit, but the margin is $30 ÷ $70 = **42.86%** — less than half the selling price is profit. Margin can never exceed 100%; markup has no ceiling.",
        "This calculator works in one direction: cost plus markup gives you the selling price. Its description mentions finding the markup from cost and selling price, but the tool has no selling-price input — for that, use Markup = (Selling Price − Cost) ÷ Cost × 100.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "You buy a product for **$40** and apply a **75% markup**. The selling price is $40 × 1.75 = **$70**, the profit per unit is **$30**, and the equivalent margin is $30 ÷ $70 = **42.86%**. Sell 100 units a month and the gross profit is $3,000 — before rent, wages, and other overheads.",
        "Now try a steeper markup: a **$12** cost with **150% markup** gives a selling price of $12 × 2.50 = **$30**, a profit of **$18**, and a margin of **60%**. Notice the pattern: 100% markup always means a 50% margin, because doubling the cost makes profit exactly half the selling price. A 300% markup — common on drinks in restaurants — means a 75% margin.",
      ],
    },
    {
      heading: "Markup vs margin: why the mix-up costs money",
      paragraphs: [
        "Suppose you want a 25% **margin** and mistakenly apply a 25% **markup** to a $40 cost. You price at $50 and earn $10 — but your margin is $10 ÷ $50 = 20%, not 25%. To get a true 25% margin you need a markup of 25 ÷ (1 − 0.25) = **33.3%**, giving a $53.33 price and $13.33 profit. On thin-margin products that 5-point gap is the difference between profit and loss.",
        "When choosing a markup, start from the margin you need to cover overheads and profit, then convert it to a markup with **Markup = Margin ÷ (1 − Margin ÷ 100)**. Then check the market: the right markup is the one customers will pay while leaving you enough margin after all costs — not the one a rule of thumb suggests.",
      ],
    },
  ],

  "mutual-fund-calculator": [
    {
      heading: "How does a mutual fund investment grow?",
      paragraphs: [
        "A mutual fund investment grows in two ways: your initial lump sum compounds, and each regular contribution (a SIP — Systematic Investment Plan) compounds from the month it goes in. The formula is **FV = P(1+r)ⁿ + SIP × [(1+r)ⁿ − 1] / r**, where r is the monthly return (annual return ÷ 12) and n is the number of months. This calculator assumes monthly compounding and contributions at the end of each month.",
        "The key force is compounding: returns earn returns, so growth accelerates over time. In the early years most of the balance is money you put in; in the later years most of it is growth. That is why starting early matters more than starting big — time in the market beats timing the market, and a few extra years of compounding can outweigh years of larger contributions.",
        "The projection assumes a **constant** return every month, which real funds never deliver, and it ignores expense ratios, taxes, and inflation. Treat the result as a scenario — 'what if the fund returned exactly this much, every month, for 15 years' — not a forecast. The calculator also needs a return above zero; at 0% the formula divides by zero and shows no result.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Invest **$5,000 upfront plus $500 a month for 15 years at a 10% annual return**. The lump sum grows to $22,269.60 and the monthly contributions grow to $207,235.17, for a future value of **$229,505**. You invested **$95,000** in total ($5,000 + $500 × 180 months), so the wealth gained is **$134,505** — a growth multiple of **2.42×** your money.",
        "Now run the same plan at **7%**: the future value is **$172,726** and the wealth gained is **$77,726**. Three percentage points of return cost **$56,779** — which shows how sensitive long-term projections are to the return you assume. And without the monthly contributions, the $5,000 lump sum alone would reach only **$22,270**: the SIP did most of the work.",
      ],
    },
    {
      heading: "What the projection leaves out",
      paragraphs: [
        "Three real-world costs are missing from this calculator. **Expense ratios** — the fund's annual fee, often 0.5–1% for actively managed funds and far less for index funds — come straight out of your return every year. **Taxes** apply to distributions and to gains when you sell (unless the fund is in a tax-advantaged account). And **inflation** shrinks what the final number buys: $229,505 in 15 years is worth considerably less in today's dollars at even 2–3% annual inflation.",
        "Use the calculator to compare scenarios — a higher SIP, a longer horizon, a lower assumed return — rather than to predict an exact outcome. The most useful question it answers is not 'how rich will I be?' but 'how much difference does an extra $100 a month, or five more years, actually make?'",
      ],
    },
  ],

  "overtime-pay-calculator": [
    {
      heading: "How is overtime pay calculated?",
      paragraphs: [
        "Overtime pay is your hourly rate multiplied by an overtime multiplier — usually **1.5× (time and a half)** — for each overtime hour, added to your regular pay: **Total = (Rate × Regular Hours) + (Rate × Multiplier × OT Hours)**. Under the federal Fair Labor Standards Act (FLSA), non-exempt employees must be paid at least 1.5× their regular rate for hours worked over 40 in a workweek.",
        "This calculator takes the hours you enter as given: you type in your regular hours and your overtime hours separately, and it does not enforce the 40-hour threshold itself. Choose the 1.5× multiplier for standard overtime or 2× for double time, which some employers pay for Sundays, holidays, or very long shifts.",
        "The monthly estimate multiplies your weekly total by **4.33** (52 weeks ÷ 12 months), which is the standard way to convert a weekly figure to a monthly average — it is slightly more than four weeks' pay, because most months have more than four weeks.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "You earn **$20 an hour** and work **40 regular hours plus 10 overtime hours** in a week at time and a half. Regular pay is $20 × 40 = **$800**. The overtime rate is $20 × 1.5 = **$30 an hour**, so overtime pay is $30 × 10 = **$300**. Your weekly total is **$1,100**, and the monthly estimate is $1,100 × 4.33 = **$4,763**.",
        "At **double time** instead, the overtime rate is $40 an hour, overtime pay is **$400**, and the weekly total is **$1,200** — $100 more for the same 10 extra hours. Over a year, that difference is $5,200, which is why the multiplier in your contract matters as much as the hourly rate.",
      ],
    },
    {
      heading: "Overtime rules worth knowing",
      paragraphs: [
        "Not everyone qualifies. Under the FLSA, salaried executive, administrative, and professional employees are **exempt** from overtime only if they are paid at least **$684 a week ($35,568 a year)** — the federal threshold in force in 2026, after courts vacated the 2024 rule that would have raised it and the Department of Labor formally restored the 2019 figures in May 2026. Below that salary, the exemption cannot apply. Duties matter too: a job title alone does not make someone exempt.",
        "State rules can be stricter than federal law. California, for example, requires daily overtime after 8 hours in a day, not just weekly overtime after 40 — so a worker doing four 10-hour days earns daily overtime in California but none under the FLSA alone. And overtime is taxed at the same rates as regular pay: a bigger paycheck may have more tax withheld that week, but your total tax for the year depends on your total income, not on which hours were overtime.",
      ],
    },
  ],

  "pension-calculator": [
    {
      heading: "How is a pension calculated?",
      paragraphs: [
        "Most defined-benefit pensions use a simple formula: **Annual Pension = Final Average Salary × Benefit Multiplier × Years of Service**. The final average salary is usually your average pay over your last few years (often the highest 3–5 years), the multiplier is a percentage per year of service set by your plan — typically 1.5–2.5% — and the result is the annual income you receive in retirement.",
        "With a **$80,000 final average salary, 25 years of service, and a 2% multiplier**, the pension is $80,000 × 0.02 × 25 = **$40,000 a year**, or **$3,333.33 a month**. The **income replacement rate** is 50%: the pension replaces half of your final salary. Work 30 years at the same multiplier and the replacement rate rises to 60%, or $48,000 a year.",
        "This calculator gives the gross pension from the formula alone. It does not include cost-of-living adjustments (COLA), taxes, early-retirement reductions, survivor benefit options, or any cap your plan may set — and it has no cap of its own, so very long service at a high multiplier can show a replacement rate above 100%, which most real plans do not allow.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A teacher retires with a **final average salary of $80,000 after 25 years**, in a plan with a **2% multiplier**. Her annual pension is $80,000 × 2% × 25 = **$40,000**, paid as **$3,333.33 a month**, replacing **50%** of her final salary.",
        "Each extra year of service is worth 2% of final salary — **$1,600 a year for life** in this example. Working five more years (30 total) raises the pension to **$48,000 a year ($4,000 a month)**, a 60% replacement rate. That is why the last few years before retirement are the most valuable in a defined-benefit plan: each year adds the same percentage, and it is applied to your highest salary years.",
      ],
    },
    {
      heading: "What the estimate doesn't include",
      paragraphs: [
        "The headline number is only the starting point. Many plans **reduce the pension if you retire early** — sometimes by 5% or more per year before the normal retirement age — and some cap the replacement rate (80% is a common ceiling), which this calculator does not apply. If your plan offers a **COLA**, the pension keeps pace with inflation; without one, a $40,000 pension loses roughly a third of its buying power over 20 years at 2% inflation.",
        "Also check whether your pension is coordinated with Social Security (some public plans reduce the pension by part of your Social Security benefit), whether survivor options reduce your monthly amount, and how the pension is taxed in your state. The calculator's job is to show what the formula produces — your plan's summary document is the authority on what you will actually receive.",
      ],
    },
  ],

  "army-body-fat-calculator": [
    {
      heading: "How is Army body fat percentage calculated?",
      paragraphs: [
        "The U.S. Army estimates body fat percentage from tape measurements and height, using the Department of Defense circumference equations. For men the formula uses **waist and neck circumferences**; for women it adds the **hip circumference**. No scales, calipers, or lab equipment are needed — just a tape measure.",
        "The male equation is **86.010 × log₁₀(waist − neck) − 70.041 × log₁₀(height) + 36.76**, and the female equation is **163.205 × log₁₀(waist + hip − neck) − 97.684 × log₁₀(height) − 78.387**, with all measurements in inches. The waist-minus-neck term captures abdominal fat, while height adjusts for body size. This calculator applies these exact equations.",
        "This is an **estimate, not a medical measurement**: the tape method typically lands within about 3–4 percentage points of lab methods such as DEXA scans. One thing to know about this tool: its 'Army Max Allowed' figure is fixed at **26% for men and 36% for women**, which are the ceilings for soldiers aged 40 and over. The Army's actual limits rise with age — for men they run from 20% (ages 17–20) up to 26% (40+), and for women from 30% to 36% — so younger soldiers should check the limit for their own age group rather than relying on the tool's fixed figure.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a man who is **70 inches tall with a 34-inch waist and a 15.5-inch neck**. Waist minus neck is 18.5. Plugging in: 86.010 × log₁₀(18.5) = 108.99, and 70.041 × log₁₀(70) = 129.23. So body fat = 108.99 − 129.23 + 36.76 = **16.5%** — comfortably within the Army standard.",
        "Now a woman who is **64 inches tall with a 28-inch waist, 38-inch hips, and a 13-inch neck**. Waist + hip − neck = 53. Plugging in: 163.205 × log₁₀(53) = 281.41, and 97.684 × log₁₀(64) = 176.44. So body fat = 281.41 − 176.44 − 78.39 = **26.6%** — also within the standard, and below the 30% limit that applies to women aged 17–20.",
      ],
    },
    {
      heading: "How to measure accurately",
      paragraphs: [
        "Your result is only as good as your measurements. Measure the **waist at the navel** (men) or at the narrowest point of the torso (women), the **neck just below the Adam's apple**, and the **hips at the widest point of the buttocks**. Keep the tape level, snug against the skin without compressing it, and take each measurement at the end of a normal exhale.",
        "Small errors matter: a half-inch error on the waist can shift the result by roughly a full percentage point. Measure in the morning, before eating, and repeat each measurement twice — if the two readings differ, take a third and use the middle value. And remember that this method estimates fat from body shape; very muscular people can score higher than their true body fat because a thick neck and waist read as fat to the formula.",
      ],
    },
  ],

  "carbohydrate-calculator": [
    {
      heading: "How many grams of carbs should you eat per day?",
      paragraphs: [
        "Your daily carbohydrate target in grams is **(daily calories × carb percentage) ÷ 4**, because carbohydrates provide 4 kilocalories per gram. This calculator does that conversion for you: enter your calorie target, pick the share of calories you want from carbs, and it gives you the gram figure you will actually track on food labels.",
        "Dietary guidelines suggest carbohydrates make up **45–65% of total calories** for most adults. The middle of that range — around 50% — suits most moderately active people, while endurance athletes trend higher and low-carb dieters lower. This calculator offers 45%, 50%, 55%, and 60%; if you want a share above 60%, apply the formula directly (for example, 2,500 kcal at 65% is 2,500 × 0.65 ÷ 4 = 406 g).",
        "Carbohydrates are not a single food group: the gram target covers everything from vegetables and whole grains to added sugars. Where your carbs come from matters as much as the total — whole-food sources bring fibre, vitamins, and slower-digesting energy, while sugary drinks and refined snacks deliver the same grams with little else.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **2,500 kcal diet at 50% carbs**. Calories from carbs are 2,500 × 0.50 = 1,250 kcal. Divide by 4 kcal per gram: 1,250 ÷ 4 = **312.5 g**, which the calculator rounds to **313 g per day**.",
        "Now a **2,000 kcal diet at 45% carbs** (the lower-carb option): 2,000 × 0.45 = 900 kcal from carbs, and 900 ÷ 4 = **225 g per day**. The same person at 60% would need 2,000 × 0.60 ÷ 4 = **300 g** — a 75 g swing from a 15-point change in the percentage, which shows why picking the right share for your activity level matters.",
      ],
    },
    {
      heading: "What counts toward your carb target?",
      paragraphs: [
        "Food labels list **total carbohydrates** per serving — that is the number to add up against your target. It includes sugars, starches, and fibre. Some low-carb approaches track 'net carbs' (total carbs minus fibre), but this calculator's gram figure is a total-carb target, so compare it with the total-carbohydrate line on labels.",
        "A practical way to hit the target without constant arithmetic: build each meal around a carb anchor you know — a cup of cooked rice is about 45 g, a medium banana about 27 g, two slices of bread about 30 g — and let vegetables fill the rest. If you train hard, put more of your carbs in the meals around your workout, when your muscles use them most readily.",
      ],
    },
  ],

  "daily-water-intake-calculator": [
    {
      heading: "How much water should you drink per day?",
      paragraphs: [
        "This calculator estimates your daily water need as **35 ml per kilogram of body weight, plus 350 ml for every 30 minutes of exercise, plus a climate adjustment** (500 ml for hot or humid weather, 250 ml for cold and dry conditions). It is a personalised rule of thumb — more useful than a flat '8 glasses' because it scales with your size and activity.",
        "The 35 ml/kg figure is a widely used baseline for total water intake, and it includes the water in food: roughly a fifth of daily water typically comes from food, especially fruit, vegetables, and soups, so the amount you need to *drink* is somewhat less than the headline number. Treat the result as a target to aim for across the day, not a quota to force down in one sitting.",
        "Your needs rise further with illness (fever, vomiting), breastfeeding, and high altitude, and fall if you eat a lot of water-rich food. Thirst, urine colour (pale straw is the aim), and how you feel are better day-to-day guides than any single number.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a person weighing **70 kg who exercises 30 minutes a day in a temperate climate**. Base intake: 70 × 35 = 2,450 ml. Exercise adds 350 ml. Climate adds nothing. Total: **2,800 ml, or 2.8 litres per day**.",
        "In everyday units that is about **11 cups of 250 ml** (2,800 ÷ 250 = 11.2) or **95 fluid ounces** (2,800 ÷ 29.574 = 94.7). The same person on a hot day would add 500 ml, reaching **3.3 litres**, and with an hour of exercise instead of 30 minutes would add another 350 ml on top of that.",
      ],
    },
    {
      heading: "Does coffee count — and other hydration questions",
      paragraphs: [
        "Yes — **moderate caffeine counts toward hydration**. Coffee and tea are mostly water, and at normal intakes (a few cups a day) their mild diuretic effect does not cancel out the fluid they provide. Water is still the best default, but you do not need to 'subtract' your coffee from your daily total. Alcohol is the exception: it genuinely dehydrates, so it does not count.",
        "Two cautions. First, **more is not always better**: drinking far beyond thirst can dilute blood sodium (hyponatremia), a rare but serious condition seen mostly in endurance athletes who over-drink. Second, this calculator's figure is a general estimate, not medical advice — people with kidney, heart, or liver conditions may have fluid limits set by their doctor, and those limits override any calculator.",
      ],
    },
  ],

  "fat-intake-calculator": [
    {
      heading: "How many grams of fat should you eat per day?",
      paragraphs: [
        "Your daily fat target in grams is **(daily calories × fat percentage) ÷ 9**, because fat provides 9 kilocalories per gram — more than double the energy of carbs or protein. This calculator applies that formula to your calorie target and the fat share you choose.",
        "Dietary guidelines suggest fat make up **20–35% of total calories** for most adults. The calculator offers 20% (low fat), 30% (moderate), 40% (high fat), and 65% (keto). The 65% keto option sits well above the standard guideline range — it is a deliberate therapeutic-style diet, not a general recommendation, and it works by replacing most carbs with fat.",
        "One row of this calculator deserves a caution: the **'Saturated Fat Limit' is calculated as 33% of your total fat grams**. That happens to match the standard guidance (saturated fat below 10% of calories) at the 30% setting, but it drifts at other settings — at 65% keto on 2,000 kcal it shows about 48 g, while 10% of calories is only 22 g. Use the 10%-of-calories rule directly for saturated fat rather than trusting that row at high-fat settings.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **2,000 kcal diet at 30% fat**. Calories from fat: 2,000 × 0.30 = 600 kcal. Divide by 9 kcal per gram: 600 ÷ 9 = **66.7 g**, which the calculator rounds to **67 g per day**. The saturated-fat limit shown is a third of that, about **22 g** — which matches 10% of 2,000 kcal (200 kcal ÷ 9 = 22.2 g).",
        "Now the same 2,000 kcal at **65% (keto)**: 2,000 × 0.65 = 1,300 kcal from fat, and 1,300 ÷ 9 = **144 g per day** — more than double the moderate-fat figure. At 20% (low fat) it would be 2,000 × 0.20 ÷ 9 = **44 g**. The same calorie target produces very different gram targets depending on the share you choose, so pick the share that matches the diet you can actually sustain.",
      ],
    },
    {
      heading: "Which fats matter more than the total",
      paragraphs: [
        "Not all fat grams are equal. **Unsaturated fats** — olive oil, nuts, seeds, avocados, and oily fish — support heart health and are the fats to build your intake around. **Saturated fats** (butter, fatty meat, coconut oil) raise LDL cholesterol, which is why guidelines cap them below 10% of calories. **Trans fats** (partially hydrogenated oils) should be avoided entirely.",
        "In practice, hitting your gram target is easy; hitting it with the right fats takes a little planning. Cook with olive or rapeseed oil instead of butter, snack on nuts instead of crisps, and eat oily fish once or twice a week. If your target is high — 100 g or more — spreading fat across meals keeps each meal from feeling heavy and helps your body absorb fat-soluble vitamins (A, D, E, and K) through the day.",
      ],
    },
  ],

  "fertility-window-calculator": [
    {
      heading: "When is the fertile window?",
      paragraphs: [
        "The fertile window is the roughly six-day stretch each cycle when conception is possible, ending on ovulation day. This calculator estimates **ovulation as your last period's first day plus your cycle length minus 14 days**, then places the window from **5 days before ovulation to 1 day after it**. The timing works because sperm can survive up to 5 days inside the body, while the egg lives only 12–24 hours after release — so the days *before* ovulation matter most.",
        "The 'minus 14 days' rule reflects the luteal phase — the stretch between ovulation and the next period — which is about 14 days in most cycles. That is why the calculation counts backwards from your *next* expected period rather than forwards from your last one.",
        "This is an **estimate, not a guarantee**: ovulation timing varies from cycle to cycle, and stress, illness, and travel can shift it. The calendar method cannot be relied on as contraception. If you have been trying to conceive for 12 months (or 6 months if you are over 35) without success, a clinician can investigate.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a last period starting **1 January 2026 with a regular 28-day cycle**. Ovulation is estimated at 1 January + 28 − 14 days = **15 January**. The fertile window runs from 5 days before ovulation to 1 day after: **10 January to 16 January**.",
        "The **most fertile days** — the two days before ovulation plus ovulation day itself, when conception chances are highest — are **13 to 15 January**. Note that this calculator's window is 7 days inclusive (5 before, ovulation day, and 1 after), a day wider than the classic 6-day window, because it includes the day after ovulation when the egg may still be viable.",
      ],
    },
    {
      heading: "Why the calendar method has limits",
      paragraphs: [
        "The calculation assumes you ovulate exactly 14 days before your next period, every cycle. In reality, the luteal phase ranges roughly from 11 to 17 days, and the first half of the cycle — before ovulation — is the part that varies most. With irregular cycles, a calendar estimate can be off by several days in either direction.",
        "For a more precise read, combine the calendar with **ovulation predictor kits** (which detect the LH surge 12–36 hours before ovulation), **basal body temperature** (which rises slightly after ovulation), or cervical mucus changes. Used together, these signs confirm ovulation in a way a date calculation alone never can. And if your cycles are consistently shorter than 21 days or longer than 35, that is worth discussing with a doctor regardless of conception plans.",
      ],
    },
  ],

  "gfr-calculator": [
    {
      heading: "What is GFR and how is it estimated?",
      paragraphs: [
        "Glomerular filtration rate (GFR) measures how well your kidneys filter blood, in **millilitres per minute per 1.73 m² of body surface area**. Because measuring it directly is complex, doctors estimate it from a blood test: this calculator uses the **CKD-EPI 2021 equation**, which takes your **serum creatinine, age, and sex** and returns an estimated GFR (eGFR) — no race term, in line with the current standard.",
        "The equation is **eGFR = 142 × min(Scr/κ, 1)^α × max(Scr/κ, 1)^−1.200 × 0.9938^Age × 1.012 (if female)**, where Scr is serum creatinine in mg/dL, κ is 0.7 for women and 0.9 for men, and α is −0.241 for women and −0.302 for men. Creatinine is a waste product from muscle that healthy kidneys clear steadily, so higher creatinine in the blood means lower filtration.",
        "An eGFR is an **estimate, not a diagnosis**. A single result below 60 does not by itself mean kidney disease — chronic kidney disease (CKD) is diagnosed when eGFR stays below 60 for at least 3 months, or when there are other signs of kidney damage. Always discuss results with a clinician, and never change medication or diet on the basis of a calculator result alone.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **45-year-old man with serum creatinine of 1.0 mg/dL**. Here κ = 0.9 and α = −0.302, so Scr/κ = 1.11. The equation gives 142 × 1 × (1.11)^−1.200 × 0.9938^45 ≈ **95 mL/min/1.73m²**, which the calculator rounds to **95** and labels **Normal (G1)** — at or above 90.",
        "Now a **60-year-old woman with creatinine of 1.2 mg/dL**. Here κ = 0.7 and α = −0.241, so Scr/κ = 1.71. The equation gives 142 × 1 × (1.71)^−1.200 × 0.9938^60 × 1.012 ≈ **52 mL/min/1.73m²**, labelled **Moderate (G3a)** — the 45–59 band. The same creatinine level means something different at different ages and for different sexes, which is why the equation adjusts for both.",
      ],
    },
    {
      heading: "What the CKD stages mean",
      paragraphs: [
        "Kidney function is grouped into stages by eGFR: **G1 (90 and above)** normal, **G2 (60–89)** mildly decreased, **G3a (45–59)** mild-to-moderate decrease, **G3b (30–44)** moderate-to-severe decrease, **G4 (15–29)** severely decreased, and **G5 (below 15)** kidney failure. This calculator shows the stage alongside your eGFR using exactly these cut-offs. Note that G1 and G2 only count as CKD if there is other evidence of kidney damage, such as protein in the urine.",
        "Creatinine-based eGFR has known blind spots: **high muscle mass, heavy exercise, and cooked meat** can raise creatinine and make kidneys look worse than they are, while **low muscle mass** (from ageing, illness, or amputation) can hide a real decline. If your result is unexpected, your doctor may repeat the test, check cystatin C (a marker less affected by muscle), or look at urine protein. Blood pressure and blood sugar control are the two most powerful ways to protect kidney function over time.",
      ],
    },
  ],

  "maximum-heart-rate-calculator": [
    {
      heading: "What is maximum heart rate and how is it calculated?",
      paragraphs: [
        "Maximum heart rate (MHR) is the highest number of beats per minute your heart can reach during all-out exertion. Because measuring it requires a maximal-effort test, it is usually **estimated from age**. This calculator shows three established formulas side by side: the classic **220 − age**, **Tanaka (208 − 0.7 × age)**, and **Gulati (206 − 0.88 × age)**, which was developed specifically for women.",
        "All three are estimates with real individual variation — typically around **±10–12 beats per minute** — so two healthy people of the same age can have maximums 20 bpm apart. The Tanaka formula, built from a large meta-analysis, generally tracks older adults more closely than 220 − age, which tends to overestimate the maximum for younger people and underestimate it for older ones.",
        "Maximum heart rate is mainly useful as an anchor for **training zones**: workouts are prescribed as percentages of MHR (for example, 70–80% for steady cardio). It is not a fitness score — a higher maximum does not mean you are fitter — and it declines with age in everyone, athletes included.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **30-year-old**. The classic formula gives 220 − 30 = **190 bpm**. Tanaka gives 208 − 0.7 × 30 = 208 − 21 = **187 bpm**. Gulati gives 206 − 0.88 × 30 = 206 − 26.4 = **180 bpm** (rounded). The calculator's 'Average' row averages the first two formulas: (190 + 187) ÷ 2 = **189 bpm**.",
        "At **age 50** the formulas diverge more: 220 − 50 = **170 bpm**, Tanaka gives 208 − 35 = **173 bpm**, and Gulati gives 206 − 44 = **162 bpm**. Notice that Tanaka overtakes 220 − age after about age 40 — one reason it is often preferred for older adults. For training, 70% of a 190 bpm maximum is **133 bpm** and 80% is **152 bpm**, which is the steady-cardio band for the 30-year-old in the first example.",
      ],
    },
    {
      heading: "How to use your maximum heart rate for training",
      paragraphs: [
        "The usual five zones, as percentages of MHR, are: **50–60%** warm-up and recovery, **60–70%** light aerobic, **70–80%** steady cardio, **80–90%** hard effort, and **90–100%** maximal intervals. Most weekly training should sit in the 60–80% bands; the top zones are for short, deliberate intervals with recovery between them.",
        "If you want your true maximum rather than an estimate, a **graded exercise test** — treadmill or bike, effort rising until you cannot continue — measures it directly. It should be supervised if you have heart risk factors, high blood pressure, or symptoms such as chest pain or dizziness on exertion. A rough field alternative is the highest heart rate you reach in the final minute of a hard uphill interval session, though that usually lands a few beats below your true maximum.",
      ],
    },
  ],

  "sleep-cycle-calculator": [
    {
      heading: "How do sleep cycles work?",
      paragraphs: [
        "Sleep runs in repeating cycles of about **90 minutes**, each moving through light sleep, deep sleep, and REM (dreaming) sleep. Waking in the middle of a deep-sleep phase is what produces that groggy, heavy feeling; waking at the **boundary between cycles** usually feels much easier — even if you slept slightly less in total.",
        "This calculator works backwards from your wake time: **bedtime = wake time − (cycles × 90 minutes) − 15 minutes to fall asleep**. It shows three options — 4, 5, or 6 cycles — so you can pick the bedtime that fits your evening while still landing on a cycle boundary.",
        "The 90-minute figure is an average, not a fixed law: real cycles range roughly from 80 to 120 minutes and lengthen and shorten across the night, with more deep sleep early and more REM later. The calculator's bedtimes are therefore good starting points to test for a week or two, not precise predictions.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **7:00 AM wake time**. For **6 cycles** (9 hours of sleep): 6 × 90 = 540 minutes of sleep plus 15 minutes to fall asleep = 555 minutes, or 9 hours 15 minutes, before 7:00 AM — a bedtime of **9:45 PM**. For **5 cycles** (7.5 hours): 450 + 15 = 465 minutes before 7:00 AM, giving **11:15 PM**. For **4 cycles** (6 hours): 360 + 15 = 375 minutes, giving **12:45 AM**.",
        "The 6-cycle bedtime is the one the calculator highlights as ideal, and 9 hours sits at the top of the recommended range for adults. The 5-cycle option, 7.5 hours, suits many people well. The 4-cycle option, 6 hours, is below the recommended 7–9 hours for adults — fine occasionally, but not a nightly plan.",
      ],
    },
    {
      heading: "How many cycles do you actually need?",
      paragraphs: [
        "Most adults need **7–9 hours**, which is 5 to 6 full cycles. Individual needs vary: some people genuinely thrive on 7 hours, others need 9, and the right amount is the one that leaves you alert through the day without an alarm or caffeine to function. Sleeping longer than you need does not bank extra rest — regularity matters more than occasional long nights.",
        "Two practical notes. First, the calculator assumes **15 minutes to fall asleep** — if you usually take 30, go to bed 15 minutes earlier than it suggests. Second, the 'Sleep Duration' row on this page is a fixed recommendation ('6–9 hours recommended'), not a figure computed from your inputs. The most powerful sleep habit is not the bedtime itself but keeping the **same wake time every day**, weekends included, which steadies your body clock far more than any single early night.",
      ],
    },
  ],

  "body-type-calculator": [
    {
      heading: "What is body frame size?",
      paragraphs: [
        "Body frame size — small, medium, or large — is an estimate of your **bone structure**, calculated from your height divided by your wrist circumference. The ratio works because wrist size reflects bone thickness: for the same height, a thicker wrist means a larger frame. This calculator applies the standard height-to-wrist ratio with separate thresholds for men and women.",
        "For **men**, a ratio above 10.4 is a small frame, 9.6–10.4 is medium, and below 9.6 is large. For **women**, the cut-offs are higher — above 11 is small, 10.1–11 is medium, and below 10.1 is large — because women's wrists are typically slimmer relative to height. These are screening cut-offs from frame-size tables, not medical diagnoses.",
        "Frame size is about **bone**, not fat or muscle: it does not change when you gain or lose weight, and it says nothing on its own about whether you are at a healthy weight. Its main use is adjusting ideal-weight estimates — a large-framed person can healthily weigh more than a small-framed person of the same height — so pair it with BMI and waist measurement for a fuller picture.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a man who is **175 cm tall with a 17 cm wrist**. The ratio is 175 ÷ 17 = **10.3**, which falls in the 9.6–10.4 band — a **medium frame**. If his wrist were 16 cm instead, the ratio would be 175 ÷ 16 = 10.9, a small frame; at 19 cm it would be 175 ÷ 19 = 9.2, a large frame. One centimetre of wrist changes the category, so measure carefully.",
        "Now a woman who is **165 cm tall with a 14.5 cm wrist**. The ratio is 165 ÷ 14.5 = **11.4**, above the 11 cut-off — a **small frame**. The same wrist on a 175 cm woman would give 175 ÷ 14.5 = 12.1, also small; height stretches the ratio in the same direction for everyone.",
      ],
    },
    {
      heading: "Why does frame size matter for ideal weight?",
      paragraphs: [
        "Ideal-weight tables (such as the classic Metropolitan Life tables) give a **range**, not a single number — typically about ±10% around the midpoint — and frame size decides where in that range you sit. A large-framed person at the top of the range is carrying bone, not excess fat, while a small-framed person at the same weight may genuinely be carrying more fat.",
        "To measure your wrist, wrap a flexible tape around the **smallest part of your wrist, just above the wrist bone**, keeping it snug but not tight, on your non-dominant hand. Do not include the bony bump at the base of the hand, and measure with the hand relaxed — flexing the forearm changes the reading. If you land near a cut-off, treat the category as approximate: the boundary between 'medium' and 'large' is a convention, not a cliff.",
      ],
    },
  ],

  "basic-calculator": [
    {
      heading: "What can a basic calculator do?",
      paragraphs: [
        "A basic calculator performs **two-number arithmetic**: addition, subtraction, multiplication, division, and powers. Enter the first number, pick the operation, enter the second number, and the answer appears instantly — no buttons to press, no app to open.",
        "Because it handles one operation at a time, there is no order-of-operations puzzle: each calculation is exactly the two numbers and the operation you chose. It accepts **decimals and negative numbers** freely, and division by zero is flagged as 'Undefined (÷ 0)' rather than crashing or showing an error.",
        "One limit to know: very large powers can overflow — for example, 10^400 is beyond what the underlying number system can represent, and the result shows as Infinity. For everyday arithmetic — bills, measurements, tips, homework checks — that limit never comes up.",
      ],
    },
    {
      heading: "Worked examples",
      paragraphs: [
        "Using the calculator's own defaults, **12 + 8 = 20**. A few more: **48 × 7 = 336**, **100 ÷ 4 = 25**, and **2^10 = 1,024** (2 multiplied by itself ten times: 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2). Subtraction with a negative result works the same way: **15 − 23 = −8**.",
        "A practical example: three friends split an **$87 restaurant bill** evenly. Enter 87, choose divide, enter 3 — the answer is **$29 each**. Or a quick discount check: a $60 jacket at 25% off means you pay 75%, and 60 × 0.75 = **$45**. For percentage problems like that, the percentage calculator on this site does the whole job in one step.",
      ],
    },
    {
      heading: "When should you reach for a bigger tool?",
      paragraphs: [
        "This calculator is deliberately simple — one operation, two numbers. When the job grows, use a specialist: the **percentage calculator** for discounts, tips, and percent change; the **scientific calculator** for square roots, logarithms, and trigonometry; and the **fraction calculator** for exact fraction arithmetic.",
        "A useful habit for any quick calculation is a **sanity check against a round number**. If 48 × 7 comes out as 336, check it against 50 × 7 = 350 — close, and slightly lower, which is exactly what you expect. That ten-second habit catches most typos before they reach a bill, a quote, or a homework answer.",
      ],
    },
  ],

  "binary-calculator": [
    {
      heading: "What is binary and how do you convert decimal to binary?",
      paragraphs: [
        "Binary is the **base-2 number system**: it uses only the digits 0 and 1, where each position represents a power of 2 (1, 2, 4, 8, 16, and so on) instead of a power of 10. It is the language computers work in internally, because electronic circuits have two states — on and off.",
        "To convert a decimal number to binary, **divide by 2 repeatedly and record the remainders**, then read them from bottom to top. The same method works for any base: divide by 8 for octal, by 16 for hexadecimal. This calculator shows all three conversions at once — binary, octal, and hexadecimal — from a single decimal input.",
        "One behaviour to know: this calculator works with **whole, non-negative numbers**. It rounds decimal inputs down and drops any minus sign, so entering −42 or 42.9 both give the result for 42. That matches how binary conversion is normally taught, but enter whole numbers to avoid surprises.",
      ],
    },
    {
      heading: "Worked examples",
      paragraphs: [
        "Take **255**, the calculator's default. In binary it is **11111111** — eight 1s, because 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255. In octal it is **377** (3 × 64 + 7 × 8 + 7 = 255), and in hexadecimal it is **FF** (15 × 16 + 15 = 255).",
        "Now **42**, worked out by repeated division: 42 ÷ 2 = 21 remainder 0; 21 ÷ 2 = 10 remainder 1; 10 ÷ 2 = 5 remainder 0; 5 ÷ 2 = 2 remainder 1; 2 ÷ 2 = 1 remainder 0; 1 ÷ 2 = 0 remainder 1. Reading the remainders from bottom to top gives **101010**. Check it: 32 + 8 + 2 = 42. In octal 42 is **52**, and in hex it is **2A**.",
      ],
    },
    {
      heading: "Where does binary show up in everyday tech?",
      paragraphs: [
        "**255 is the largest value a single byte can hold** (2^8 − 1 = 255), which is why it appears everywhere: each colour channel in a screen runs from 0 to 255, so pure red is written as #FF0000 in hex, and each block of an IP address (like 192.168.1.1) is a number from 0 to 255. File sizes, too, are powers of two at heart — a kilobyte is 1,024 bytes, or 2^10.",
        "Octal and hexadecimal exist as shorthand for binary: one hex digit stands for exactly four binary digits, so a long binary string like 11111111 collapses to just FF. Programmers read memory addresses, colour codes, and error codes in hex for exactly this reason — it is binary you can actually read at a glance.",
      ],
    },
  ],

  "cgpa-calculator": [
    {
      heading: "How is CGPA calculated?",
      paragraphs: [
        "CGPA (Cumulative Grade Point Average) is the **credit-weighted average of your semester GPAs**: multiply each semester's GPA by its credit hours, add those products together, and divide by your total credit hours. It is not a simple average of your semester GPAs, because semesters with more credits count more.",
        "The formula is **CGPA = Σ(semester GPA × credits) ÷ Σcredits**. A 4.0 in a 16-credit semester pulls your CGPA up more than a 3.0 in a 12-credit semester pulls it down — the weights are the credit hours, not the semesters.",
        "This calculator covers **three semesters**. If you have more, combine your earlier semesters into a single line: add their credits together and use their combined weighted GPA as that line's GPA. The percentage shown is CGPA × 25 — a rough approximation on a 4.0 scale, not an official conversion; universities and countries use different formulas, so check your institution's own conversion before using it on an application.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take the calculator's defaults: semester 1 is **3.5 GPA over 15 credits**, semester 2 is **3.7 over 16 credits**, and semester 3 is **3.3 over 14 credits**. The weighted sum is (3.5 × 15) + (3.7 × 16) + (3.3 × 14) = 52.5 + 59.2 + 46.2 = **157.9 grade points**. Total credits: 15 + 16 + 14 = **45**. CGPA = 157.9 ÷ 45 = **3.51**.",
        "Note that the simple average of the three GPAs would be (3.5 + 3.7 + 3.3) ÷ 3 = 3.50 — very close here, but not the same, because the semesters carry different credit loads. The percentage approximation is 3.51 × 25 = **87.7%**.",
      ],
    },
    {
      heading: "How can you raise your CGPA?",
      paragraphs: [
        "Later semesters matter most when they carry more credits, and every semester dilutes the last. Continuing the example above, one more **16-credit semester at 4.0** adds 64 grade points: (157.9 + 64) ÷ (45 + 16) = 221.9 ÷ 61 = **3.64** — a jump of 0.13 from a single strong semester. The same 4.0 in a 12-credit semester would give (157.9 + 48) ÷ 57 = **3.61**.",
        "The practical lesson: **front-load your effort into high-credit semesters and high-credit courses**, and protect your CGPA early — a weak first semester is mathematically the hardest to undo, because each later semester is a smaller share of a growing total. If your university allows retaking a course to replace a grade, that is usually the fastest single lever, since it removes the low grade points entirely rather than diluting them.",
      ],
    },
  ],

  "confidence-interval-calculator": [
    {
      heading: "What is a confidence interval?",
      paragraphs: [
        "A confidence interval is a **range of plausible values for a population mean**, built from sample data: **x̄ ± z × (s ÷ √n)**, where x̄ is the sample mean, s is the standard deviation, n is the sample size, and z is the critical value for your confidence level (1.645 for 90%, 1.96 for 95%, 2.576 for 99%). The part after the ± is the margin of error.",
        "A 95% confidence interval means that if you repeated the study 100 times, about **95 of the intervals would contain the true population mean**. It does not mean there is a 95% chance the true mean is in *this* interval — the true mean is fixed; it is the interval that varies from sample to sample. That distinction is the single most common misunderstanding in statistics.",
        "This calculator uses **z-values for every sample size**. That is standard practice for large samples, but for small samples (usually under 30) the t-distribution gives wider, more honest intervals. With large samples the two are nearly identical, so the calculator's results are reliable for the common case — just treat small-sample results as slightly optimistic.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a sample with **mean 50, standard deviation 10, and size 100**, at the **95%** level. The standard error is 10 ÷ √100 = 10 ÷ 10 = **1**. The margin of error is 1.96 × 1 = **1.96**. So the confidence interval is 50 ± 1.96, or **48.04 to 51.96**.",
        "At **99%** confidence with the same sample, the margin grows to 2.576 × 1 = 2.576, giving **47.42 to 52.58** — a wider interval, because more confidence demands more room. And if the sample size were 400 instead of 100, the standard error would halve to 10 ÷ √400 = 0.5, the 95% margin would shrink to 0.98, and the interval would narrow to **49.02 to 50.98**.",
      ],
    },
    {
      heading: "What makes an interval narrower?",
      paragraphs: [
        "Three things shrink a confidence interval: a **larger sample**, a **smaller standard deviation**, and a **lower confidence level**. Sample size is the lever you control most directly — but it works through the square root, so quadrupling the sample only halves the margin of error. Doubling the sample narrows it by only about 29%.",
        "That square-root law is why survey margins of error are so stubborn: moving a poll from ±3 points to ±1.5 points needs four times the respondents, not twice. Before collecting data, decide how narrow the interval needs to be for the decision it will inform — then work backwards to the sample size, rather than collecting data first and hoping the interval comes out useful.",
      ],
    },
  ],

  "final-grade-calculator": [
    {
      heading: "What grade do you need on the final?",
      paragraphs: [
        "The grade you need on the final exam is **(target − current × (1 − w)) ÷ w**, where your current grade and target are percentages and w is the final exam's weight as a decimal. The formula works out how much of your final grade is still undecided, then how much of that remaining slice you must win to reach your target.",
        "Your **current grade** is the weighted average of everything graded so far — homework, quizzes, midterms — and it counts for (1 − w) of your final grade. The final exam counts for w. If the final is worth 30%, then 70% of your grade is already banked and 30% is still to play for.",
        "If the answer comes out **above 100%**, the target is out of reach on the final alone — you would need extra credit or a lower target. If it comes out **negative**, you have already secured your target even if you score zero on the final; this calculator still shows 'Achievable? Yes' in that case, so treat a negative number as a cushion, not a score to aim for.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a student with a **current grade of 82%** who wants a **90%** final grade, with the final exam worth **30%**. Needed = (90 − 82 × 0.70) ÷ 0.30 = (90 − 57.4) ÷ 0.30 = 32.6 ÷ 0.30 = **108.7%**. That is above 100%, so the target is not reachable on the final alone — the calculator flags this as 'Difficult (>100% needed)'.",
        "Now the same student with a **current grade of 88%** and a final worth **40%**: needed = (90 − 88 × 0.60) ÷ 0.40 = (90 − 52.8) ÷ 0.40 = 37.2 ÷ 0.40 = **93.0%**. Tough but achievable. Notice how much the final's weight matters: the same 88% current grade with a 30% final would need (90 − 61.6) ÷ 0.30 = **94.7%**.",
      ],
    },
    {
      heading: "What to do when the number is over 100%",
      paragraphs: [
        "First, **recheck your current grade** — the most common error is forgetting a dropped assignment or mis-weighting categories, and a few points of current grade can move the answer a lot when the final's weight is small. If the number is genuinely over 100%, your options are to lower the target (an 88% instead of a 90% may need only a realistic score), ask about **extra credit**, or check whether your instructor rounds borderline grades.",
        "Use the calculator as a planning tool, not just a verdict: try your target with different final weights to see which courses deserve your study time. A course where you need 75% on a 40% final is a better use of an evening than one where you need 98% on a 10% final — the first is winnable, the second is nearly decided already.",
      ],
    },
  ],

  "cube-root-calculator": [
    {
      heading: "How is a cube root calculated?",
      paragraphs: [
        "The cube root of a number is the value that, multiplied by itself three times, gives back the original number — so ∛27 = 3 because 3 × 3 × 3 = 27. In power form, the cube root is the same as raising a number to the power of one third: **∛x = x^(1/3)**.",
        "Unlike square roots, cube roots work for **negative numbers** too: ∛(−27) = −3, because (−3) × (−3) × (−3) = −27. A negative number has no real square root, but it always has a real cube root.",
        "This calculator shows the cube root to six decimal places and tells you whether the result is a whole number — a **perfect cube**. Whole-number cube roots (1, 8, 27, 64, 125, 216, 343, 512, 729, 1000…) are exact; most other numbers have cube roots that go on forever, so the tool rounds them.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take **∛10**: no whole number cubed gives 10 (2³ = 8 and 3³ = 27), so the answer is not a whole number. The calculator gives **∛10 ≈ 2.154435**. Check it: 2.154435³ ≈ 10.000000.",
        "A negative example: **∛(−125) = −5**, because (−5)³ = −125. And a perfect cube: **∛1000 = 10** exactly, since 10³ = 1000.",
        "A practical use: a cube-shaped box holds **125 cm³**. Each side is ∛125 = **5 cm**. Cube roots turn a volume back into a length — the reverse of cubing a side to get a volume.",
      ],
    },
    {
      heading: "Where cube roots show up",
      paragraphs: [
        "Cube roots appear whenever a volume scales. Double every side of a cube and its volume grows **eightfold** (2³ = 8); to make a tank hold eight times as much, each side only needs to double — the cube root of 8 is 2. The same scaling governs shipping boxes, water tanks, and storage containers.",
        "They also appear in science and engineering: the size of a crater from an explosion, the radius of a sphere from its volume, and the **cube-root scaling** used in some strength and acoustics calculations all run through cube roots.",
        "One mental shortcut: for perfect cubes, the last digit of the cube root matches a fixed pattern — cubes ending in 7 come from numbers ending in 3 (3³ = 27), cubes ending in 8 come from numbers ending in 2 (2³ = 8). It only works for perfect cubes, but it is a quick check when one turns up.",
      ],
    },
  ],

  "factor-calculator": [
    {
      heading: "What is a factor, and how are factors found?",
      paragraphs: [
        "A **factor** of a number is a whole number that divides into it evenly, with no remainder. The factors of 12 are 1, 2, 3, 4, 6, and 12 — each one divides 12 exactly. This calculator lists every factor, counts them, pairs them up, and tells you whether the number is prime.",
        "It finds factors by testing every whole number from 1 up to the square root of n: whenever i divides n evenly, both i and n ÷ i are factors. Checking only up to √n is enough, because every factor larger than √n pairs with one smaller than √n.",
        "Two input details: the tool takes the **absolute value** of a negative number (so −12 is factored as 12) and **rounds decimals down** to whole numbers before factoring. Factors are defined for whole numbers, so a decimal input is floored first.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take **60**. Testing 1 to √60 (≈ 7.75) gives the divisors 1, 2, 3, 4, 5, and 6, and each pairs with its partner: 1×60, 2×30, 3×20, 4×15, 5×12, 6×10. The full factor list is **1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60 — 12 factors** in total.",
        "Now take **36**: its factors are **1, 2, 3, 4, 6, 9, 12, 18, 36 — 9 factors**. The count is odd because 6 pairs with itself (6×6 = 36). An odd factor count is the signature of a perfect square: only squares have a factor that is its own partner.",
        "And **17** has just two factors, 1 and 17, so the tool reports it as prime. The number 1 is a special case: it has only one factor (itself), so it is **neither prime nor composite**, and the tool correctly answers 'No' to 'Is Prime?' for it.",
      ],
    },
    {
      heading: "Why factors matter",
      paragraphs: [
        "**Simplifying fractions** runs on factors: 18/24 simplifies by dividing top and bottom by their greatest common factor, 6, giving 3/4. Listing both numbers' factors makes the common ones obvious.",
        "**Prime testing** is factoring in disguise — a number is prime exactly when its only factors are 1 and itself. The same trial division the tool uses (test up to √n) is the oldest primality test there is.",
        "Factors also solve everyday grouping problems: 60 guests split evenly into tables of 4, 5, 6, 10, 12, 15, 20, or 30, because those are 60's factors. If a group size is not a factor, the split leaves a remainder — and the factor list tells you that before you start arranging chairs.",
      ],
    },
  ],

  "angle-converter": [
    {
      heading: "How are angles converted between units?",
      paragraphs: [
        "Every angle unit measures the same thing — how far around a circle you have turned — so converting is just rescaling by a fixed ratio. A full circle is **360 degrees = 2π radians = 400 gradians = 1 turn**, and this converter works through degrees as the middle step: your value is first converted to degrees, then from degrees into all four units.",
        "The conversion factors are exact definitions, not measurements: **180° = π radians**, **1 gradian = 0.9°**, and **1 turn = 360°**. Because the factors are exact, converting there and back returns your starting value (apart from the display rounding — degrees and gradians show 4 decimals, radians and turns 6).",
        "One angle to memorise: **1 radian ≈ 57.2958°**. A radian is the angle where the arc length equals the radius, which is why it is the natural unit in mathematics even though degrees are more familiar day to day.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take **180°** — a straight line, half a circle. In radians that is π, shown as **3.141593 rad**; in gradians it is 180 ÷ 0.9 = **200 gon**; in turns it is 180 ÷ 360 = **0.5 turns**.",
        "A right angle, **90°**, converts to π/2 = **1.570796 rad**, **100 gon**, and **0.25 turns**. A quarter turn is the same angle in all four systems — only the number changes.",
        "Going the other way, **1 radian** is 180 ÷ π = **57.2958°**, or 63.6620 gon, or 0.159155 turns. That is why a radian feels like a large angle: it is nearly 60 degrees, more than a sixth of a full circle.",
      ],
    },
    {
      heading: "Which unit do you use when?",
      paragraphs: [
        "**Degrees** are the everyday unit: navigation bearings, latitude and longitude, oven dials, and school geometry. They survive because 360 divides neatly by 2, 3, 4, 5, 6, 8, 9, 10, and 12 — a third of a circle is exactly 120°.",
        "**Radians** are the unit of mathematics and physics: calculus, trigonometry, and rotational motion all use them, because the formulas for arc length (s = rθ), angular speed, and derivatives of sine and cosine only work cleanly in radians. Whenever a formula contains π as an angle, it is in radians.",
        "**Gradians** (gon) divide a circle into 400, so a right angle is exactly 100 gon — a decimal-friendly system used in some surveying work, mostly in continental Europe. **Turns** (revolutions) suit rotating machinery: a motor spinning at 3,000 revolutions per minute turns 50 times every second.",
      ],
    },
  ],

  "area-converter": [
    {
      heading: "How is area converted between units?",
      paragraphs: [
        "Area units are all measures of the same surface, so converting between them is multiplication by a fixed factor. This converter works through **square metres (m²)** as a base unit: your value is first converted to m², then from m² into square feet, acres, and hectares.",
        "The factors the tool uses are **rounded**: 1 sq ft = 0.092903 m² (exactly 0.09290304 m²) and 1 acre = 4,046.86 m² (exactly 4,046.8564224 m²). The rounding is tiny — 1 acre comes out as 43,560.06 sq ft instead of exactly 43,560 — but it explains small last-digit differences from exact tables.",
        "One gap to know: **square kilometres are accepted as an input but do not appear in the results**. To get km² from the tool, take the square-metre result and divide by 1,000,000 — 1 km² is exactly one million m².",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take **1 acre**, the tool's default input. It converts to **4,046.86 m²** and **0.404686 hectares**, and to **43,560.06 sq ft** (the exact figure is 43,560 sq ft — the extra 0.06 is the tool's rounded factor at work).",
        "Going the other way, **1 hectare** is exactly **10,000 m²**, which the tool shows as **2.471052 acres** (exact: 2.471054 acres). A hectare is a square 100 m on each side — about two and a half acres.",
        "A room-sized example: **100 m²** is 100 ÷ 0.092903 = **1,076.39 sq ft**. For a quick mental estimate, multiply square metres by 10.7639 to get square feet, or divide square feet by 10.7639 to get square metres.",
      ],
    },
    {
      heading: "Area sizes worth knowing",
      paragraphs: [
        "An American football field without end zones measures 300 × 160 ft = 48,000 sq ft, about **1.1 acres** — so an acre is a little smaller than the playing field. A doubles tennis court is 78 × 36 ft = 2,808 sq ft, about **260.87 m²**.",
        "Land is usually priced per acre in the US and per hectare in metric countries. Because 1 hectare ≈ 2.47 acres, a price per hectare divided by 2.47 gives the rough price per acre — handy when comparing listings across unit systems.",
        "Watch out for the **square trap**: doubling a room's length and width quadruples its area, it does not double it. A 10 × 10 ft room is 100 sq ft, but a 20 × 20 ft room is 400 sq ft — four times the flooring, paint, and cost, even though each side only doubled.",
      ],
    },
  ],

  "energy-converter": [
    {
      heading: "How is energy converted between units?",
      paragraphs: [
        "Energy is measured in several units — joules, calories, kilowatt-hours, and BTU — but they all measure the same quantity, so converting is multiplication by a fixed factor. This converter works through **joules (J)** as a base unit: your value is first converted to joules, then from joules into calories, kilowatt-hours, and BTU.",
        "Two of the factors are exact definitions: **1 calorie = 4.184 J** (the thermochemical calorie) and **1 kWh = 3,600,000 J** (1,000 watts for 3,600 seconds). The third is rounded: the tool uses **1 BTU = 1,055.06 J**, while the exact ISO value is 1,055.05585262 J — close enough that results agree to about four significant figures.",
        "One honest limitation: the page description mentions **electron volts (eV)**, but the tool does not convert them — the inputs and results cover joules, calories, kWh, and BTU only. Electron volts belong to atomic-scale physics, where 1 eV = 1.602 × 10⁻¹⁹ J.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take **1,000 joules**, the tool's default input. In calories that is 1,000 ÷ 4.184 = **239.01 cal**; in kilowatt-hours it is 1,000 ÷ 3,600,000 = **0.000278 kWh**; in BTU it is 1,000 ÷ 1,055.06 = **0.9478 BTU**.",
        "The other direction shows why kWh is the billing unit: **1 kWh** equals **3,600,000 J**, which is **860,420.65 cal** and **3,412.13 BTU**. Joules are too small for household energy — a single kWh is millions of them — so bills use kWh instead.",
        "The food connection: a **kilocalorie** (the 'Calorie' on nutrition labels) is 1,000 calories, so 1 kcal = **4,184 J**. A 2,000 kcal day is 8,368,000 J, or about **2.32 kWh** of food energy.",
      ],
    },
    {
      heading: "Calories on labels vs calories in physics",
      paragraphs: [
        "The calorie on a food label is **1,000 physics calories** — a kilocalorie, written with a capital C. A 100-Calorie snack bar holds 100,000 physics calories, or 418,400 J. The two units differ by a factor of a thousand, which is the single most common energy-conversion mistake.",
        "BTU is the heating and cooling unit: air conditioners and furnaces are rated in BTU per hour, and natural gas is often sold by the therm (1 therm = 100,000 BTU ≈ 29.3 kWh). Converting BTU to kWh lets you compare gas and electric heating costs directly.",
        "A sense of scale helps: lifting an apple (about 1 newton of weight) one metre takes roughly **1 joule**; boiling a litre of water from room temperature takes about **335,000 J**; and a typical US home uses roughly **30 kWh per day** — about 108 million joules.",
      ],
    },
  ],

  "power-converter": [
    {
      heading: "How is power converted between units?",
      paragraphs: [
        "Power is the **rate** at which energy is used or produced — energy divided by time — and its SI unit is the watt: 1 watt = 1 joule per second. This converter works through **watts (W)** as a base unit: your value is first converted to watts, then from watts into kilowatts, horsepower, and BTU per hour.",
        "The factors the tool uses are **rounded**: 1 horsepower = 745.7 W (the exact mechanical horsepower is 745.699872 W) and 1 BTU/h = 0.293071 W. The kilowatt factor is exact: **1 kW = 1,000 W**. The rounding shifts results only in the fourth decimal place and beyond.",
        "One honest limitation: the page description mentions **foot-pounds per second**, but the tool does not convert it — the inputs and results cover watts, kilowatts, horsepower, and BTU/h only. For reference, 1 ft·lb/s ≈ 1.3558 W.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take **746 watts**, the tool's default input — chosen because it is almost exactly one horsepower. The tool gives 746 ÷ 1,000 = **0.7460 kW**, 746 ÷ 745.7 = **1.0004 hp**, and 746 ÷ 0.293071 = **2,545.46 BTU/h**.",
        "A rounder example: **1,000 W = 1 kW = 1.3410 hp = 3,412.14 BTU/h**. And **1 horsepower** on its own is 745.7 W, or 745.7 ÷ 0.293071 = **2,544.43 BTU/h**.",
        "Notice the direction of the BTU/h factor: a watt is a small unit, so a modest 1,000 W heater is over 3,400 BTU/h. Air conditioners are rated in BTU/h precisely because the numbers come out in the thousands, which suits equipment sizing.",
      ],
    },
    {
      heading: "Power vs energy — and what your bill actually charges",
      paragraphs: [
        "Power and energy are different quantities, and mixing them up is the most common mistake with these units. **Power (watts) is a rate; energy (watt-hours) is power × time.** A 100 W bulb running for 10 hours uses 1,000 Wh = 1 kWh of energy.",
        "That is why electricity bills charge per **kWh**, not per kW: the bill measures total energy consumed. A 1.5 kW space heater running for 4 hours uses 1.5 × 4 = **6 kWh**; at $0.12 per kWh that is $0.72.",
        "Horsepower survives mainly for engines and motors — a car engine, a lawnmower, a pump — while watts and kilowatts cover everything electrical. When a motor is rated 2 hp, it delivers about 1,491 W of mechanical power, and the electrical input will be higher still, because no motor is 100% efficient.",
      ],
    },
  ],

  "flight-time-calculator": [
    {
      heading: "How is flight time calculated?",
      paragraphs: [
        "Flight time is simply **distance divided by speed**: a 5,000 km flight at a cruise speed of 850 km/h takes 5,000 ÷ 850 ≈ 5.9 hours. This calculator takes a distance in kilometres and a cruise speed in km/h, and shows the result in hours (to one decimal) and in whole minutes.",
        "The figure it gives is the **cruise-only time** — the time spent actually flying at speed. It does not add time for taxiing, takeoff, climb, descent, or landing, and it has no input for wind, so a real gate-to-gate journey always takes longer than the number shown here.",
        "One edge case: entering a cruise speed of **0** divides by zero, and the tool shows 'Infinity hours' instead of an error. Keep the speed above zero — a typical jet cruises at roughly 800–900 km/h.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "With the tool's defaults — **5,000 km at 850 km/h** — the flight time is 5,000 ÷ 850 = **5.88 hours, shown as 5.9 hours**, or 5.88 × 60 = **353 minutes**. That is roughly a transatlantic-length flight, such as London to New York.",
        "A shorter hop: **3,000 km at 800 km/h** gives 3,000 ÷ 800 = **3.75 hours, shown as 3.8 hours**, or **225 minutes**. The hours figure is rounded to one decimal, so the minutes figure is the more precise of the two.",
        "Speed matters more than it looks: raising the cruise speed from 800 to 900 km/h on a 5,000 km route cuts the time from 6.25 hours to 5.56 hours — about **41 minutes saved**. That is why airlines care about cruise speed even when the difference seems small.",
      ],
    },
    {
      heading: "Why your actual flight takes longer",
      paragraphs: [
        "Airlines publish **gate-to-gate** times, which include taxiing out, takeoff, climbing to cruise altitude, descending, landing, and taxiing in. Those phases add a substantial chunk on top of the cruise-only figure this tool computes — which is why a scheduled time always looks longer than distance ÷ speed.",
        "Wind changes the answer too. A headwind slows the aircraft's ground speed and stretches the flight; a tailwind shortens it. The same route can take noticeably different times in each direction, and this calculator — which has no wind input — gives the still-air figure.",
        "Routes are also not straight lines: aircraft follow airways, avoid weather, and queue for landing. Use this tool for a quick estimate of the flying portion, then add the ground phases and a buffer when planning connections.",
      ],
    },
  ],

  "week-number-calculator": [
    {
      heading: "How is the ISO week number found?",
      paragraphs: [
        "The **ISO 8601** week system numbers the weeks of the year from 1 to 52 (sometimes 53): weeks start on **Monday**, and **week 1 is the week containing the first Thursday of January** — equivalently, the week containing January 4th. This calculator finds that week number for any date you enter, along with the day of the year, the weekday, and the quarter.",
        "The rule exists so that every week belongs entirely to one year and every year starts on a Monday. The trade-off is that the ISO year does not line up exactly with the calendar year: a few days at the start of January can belong to the previous ISO year, and a few days at the end of December can belong to the next one.",
        "Most years have 52 ISO weeks, but years in which January 1st is a Thursday — or leap years starting on a Wednesday — have **53**. The year 2020, for example, had 53 ISO weeks.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take **15 June 2025**. June 15th is a Sunday, the **166th day** of the year, in the second quarter (**Q2**). Counting Mondays from the start of week 1 (Monday 30 December 2024), it falls in **Week 24** — the week running Monday 9 June to Sunday 15 June 2025.",
        "A year-boundary example: **1 January 2026** is a Thursday, so it is in **Week 1** of 2026 — the week containing the first Thursday falls exactly on New Year's Day that year, and week 1 runs Monday 29 December 2025 to Sunday 4 January 2026.",
        "The day-of-year count is straightforward: add the days of the completed months plus the day of the month. For 15 June 2025: 31 (Jan) + 28 (Feb) + 31 (Mar) + 30 (Apr) + 31 (May) + 15 = **166**.",
      ],
    },
    {
      heading: "The year-boundary trap — read this before trusting edge dates",
      paragraphs: [
        "This tool assigns every date to the ISO week of the **calendar year you enter**, and that breaks at the year boundary. **1 January 2023** (a Sunday) belongs to ISO week 52 of 2022, but the tool shows Week 1. **29–31 December 2025** belong to ISO week 1 of 2026, but the tool shows Week 53.",
        "For dates in the middle of the year the tool is exactly right — the error only touches the handful of days around New Year when the ISO week-year and the calendar year disagree. If a week number near January 1st matters (payroll weeks, school terms, reporting periods), double-check it against an ISO calendar.",
        "One more quirk: the tool does not validate the date. Entering **30 February** does not produce an error — JavaScript silently rolls it forward to 2 March, and the tool reports that date's week instead. Enter only real calendar dates.",
      ],
    },
  ],

  "bandwidth-calculator": [
    {
      heading: "How is download time calculated?",
      paragraphs: [
        "Download time is **file size divided by speed** — but the units need matching first. File sizes are in bytes (MB) and speeds in bits per second (Mbps), and there are 8 bits in a byte. This calculator converts the file to megabits (MB × 8) and divides by the speed in Mbps to get the time in seconds.",
        "The tool also shows an **'Actual (80% efficiency)'** figure, which divides the ideal time by 0.8. Real connections rarely sustain their advertised speed, so the 80% row is the more realistic planning number — it is the ideal time plus a 25% allowance.",
        "One unit detail: the tool treats megabytes as **decimal** (1 MB = 1,000,000 bytes, so 1 MB = 8 Mb). Operating systems often report sizes in binary units instead, which is why a file can look bigger on your computer than the number you typed here — see below.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "With the tool's defaults — a **1,000 MB file at 100 Mbps** — the file is 1,000 × 8 = 8,000 megabits, and 8,000 ÷ 100 = **80.0 seconds**. At 80% efficiency the same download takes 80 ÷ 0.8 = **100.0 seconds**.",
        "A bigger file on a slower line: **5,000 MB at 50 Mbps** is 40,000 megabits ÷ 50 = **800 seconds, or 13.3 minutes** — and 1,000 seconds (16.7 minutes) at 80% efficiency. Doubling the file or halving the speed doubles the time; the relationship is exactly proportional.",
        "The bits-versus-bytes trap: a '100 Mbps' connection moves at most 12.5 MB per second (100 ÷ 8), not 100 MB per second. If a download shows 12 MB/s on a 100 Mbps line, it is running at full speed — the units just differ by a factor of eight.",
      ],
    },
    {
      heading: "Why real downloads are slower — and the MB vs MiB gap",
      paragraphs: [
        "The 80% efficiency row exists because advertised speed is a ceiling, not a guarantee: protocol overhead, network congestion, server limits, Wi-Fi interference, and other devices sharing the connection all take their cut. On a busy home network, 60–80% of the rated speed is typical, which is why the tool's FAQ quotes that range.",
        "The binary-unit gap adds a second surprise. A file Windows calls '1 GB' is 1,073,741,824 bytes — **1,073.74 decimal MB** — so at 100 Mbps it takes 85.9 seconds, about **7% longer** than the 80 seconds the tool shows for 1,000 MB. If your download runs longer than the estimate, check whether the file size you entered was in binary gigabytes.",
        "Uploads follow the same maths but usually run slower: most home connections offer far less upload than download speed. A 1,000 MB upload on a 10 Mbps upload link takes 800 seconds (13.3 minutes) even before the efficiency allowance — worth knowing before a video call or a cloud backup.",
      ],
    },
  ],

  "electricity-bill-calculator": [
    {
      heading: "How is an electricity bill estimated?",
      paragraphs: [
        "A monthly electricity bill is your **usage charge plus your fixed charges**: multiply the kilowatt-hours (kWh) you used by your rate per kWh, then add the fixed monthly charge for connection and service. This calculator does exactly that, and also shows the daily cost (monthly total ÷ 30) and the annual estimate (monthly total × 12).",
        "The tool uses a **single flat rate** for all usage — the rate you type in applies to every kWh. Real tariffs are often more complicated (see below), so the result is an estimate, not a replica of your supplier's bill.",
        "The defaults describe a typical US household: **900 kWh per month** at **$0.12 per kWh** with a **$15 fixed charge**. Your own usage is on your bill, usually as the month's kWh total.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "With the tool's defaults: 900 kWh × $0.12 = **$108.00 usage charge**, plus the $15.00 fixed charge, gives a **monthly bill of $123.00**. The daily cost is $123.00 ÷ 30 = **$4.10**, and the annual estimate is $123.00 × 12 = **$1,476**.",
        "A lighter user: **600 kWh at $0.15 per kWh** with a $10 fixed charge gives 600 × $0.15 = $90.00 + $10.00 = **$100.00 per month**. Even though the rate is higher, the smaller usage more than makes up for it — usage, not rate, is usually the bigger lever on the bill.",
        "To check your own numbers, find your **all-in rate**: divide your bill's total by its kWh. If a $138 bill covered 900 kWh, your all-in rate is $0.153 per kWh — higher than the headline energy rate, because it folds in the fixed charge and any taxes and fees.",
      ],
    },
    {
      heading: "What this estimate leaves out",
      paragraphs: [
        "Many suppliers use **tiered (block) pricing**, where the first block of kWh is cheap and later blocks cost more — or **time-of-use rates**, where evening electricity costs more than overnight electricity. A single flat rate cannot reproduce either, so heavy users on tiered tariffs will find the real bill higher than this estimate.",
        "Taxes, delivery charges, and surcharges are also outside the formula unless you fold them into the fixed charge or the rate. The cleanest way to handle them is the all-in rate above: total bill ÷ kWh, entered as your rate with the fixed charge set to zero.",
        "Usage is seasonal: air conditioning in summer and heating in winter can easily double a household's kWh. The annual estimate multiplies one month by 12, so it is only as representative as the month you entered — average three or four months of bills for a better yearly figure.",
      ],
    },
  ],

  "ideal-gas-law-calculator": [
    {
      heading: "How is temperature found from the ideal gas law?",
      paragraphs: [
        "The ideal gas law, **PV = nRT**, links a gas's pressure (P), volume (V), amount in moles (n), and absolute temperature (T) through the gas constant R. This calculator rearranges it to solve for temperature: **T = PV ÷ (nR)**, using R = 0.08206 L·atm/(mol·K), and shows the answer in kelvin and in Celsius.",
        "Temperature must be in **kelvin** — the absolute scale that starts at absolute zero (−273.15 °C). Gas laws work on ratios of temperature, and only the kelvin scale has a true zero; plugging in a Celsius temperature would give a meaningless result.",
        "One honest limitation: the page description says the tool solves for 'any variable', but it **solves for temperature only**. To find pressure or volume instead, rearrange the law yourself: P = nRT ÷ V and V = nRT ÷ P, with R = 0.08206 L·atm/(mol·K).",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "The tool's defaults are the textbook standard conditions: **1 atm, 22.414 L, 1 mol**. The temperature is T = (1 × 22.414) ÷ (1 × 0.08206) = **273.14 K**, shown as **−0.01 °C**. That is the standard temperature of 0 °C — one mole of an ideal gas occupies 22.414 litres at 1 atm and 0 °C.",
        "The tiny 0.01 K shortfall is the tool's **rounded gas constant** at work: the exact R is 0.082057366 L·atm/(mol·K), and the tool uses 0.08206. Using the exact R gives 273.15 K exactly; the rounding costs about a hundredth of a degree, which is negligible for homework and lab estimates.",
        "A second example: **2 atm, 10 L, 1 mol** gives T = (2 × 10) ÷ (1 × 0.08206) = **243.72 K**, or **−29.43 °C**. Doubling the pressure while holding volume fixed would double the temperature; here the smaller volume pulls it back down.",
      ],
    },
    {
      heading: "When the ideal gas law breaks down",
      paragraphs: [
        "The law assumes gas particles have no volume and never attract each other — a good approximation at **low pressure and high temperature**, where molecules are far apart and moving fast. Near condensation, at high pressure, or at very low temperature, real gases deviate: their measured PV is smaller than nRT predicts, because attractions pull molecules together and their own volume starts to matter.",
        "Unit discipline is the most common source of wrong answers. This tool expects **pressure in atm and volume in litres** to match its R = 0.08206 L·atm/(mol·K). If your pressure is in pascals or your volume in cubic metres, use R = 8.314 J/(mol·K) instead — or convert first (1 atm = 101,325 Pa, 1 m³ = 1,000 L).",
        "The tool guards against zero moles (it shows an error), but it does not stop negative or zero pressure or volume — physically meaningless inputs that produce a meaningless temperature, including a negative kelvin value. Keep all three inputs positive and the result stays physical.",
      ],
    },
  ],

  "molar-mass-calculator": [
    {
      heading: "How is molar mass calculated?",
      paragraphs: [
        "A compound's molar mass is the **sum of its atoms' atomic masses**: count how many atoms of each element the formula contains, multiply each count by that element's atomic mass, and add them up. The result is in **grams per mole (g/mol)** — the mass of one mole (6.022 × 10²³ particles) of the substance.",
        "This calculator covers **four elements — carbon, hydrogen, oxygen, and nitrogen** — with the atomic masses C = 12.011, H = 1.008, O = 15.999, and N = 14.007. Enter the atom counts from the formula (glucose C₆H₁₂O₆ means C = 6, H = 12, O = 6) and it returns the molar mass in g/mol and in kg/mol.",
        "The atomic masses are **weighted averages** of each element's isotopes as found in nature, which is why carbon is 12.011 rather than exactly 12 — most carbon is carbon-12, but about 1% is the heavier carbon-13.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take **glucose, C₆H₁₂O₆**, the tool's default: 6 × 12.011 = 72.066 for carbon, 12 × 1.008 = 12.096 for hydrogen, and 6 × 15.999 = 95.994 for oxygen. Adding them: 72.066 + 12.096 + 95.994 = **180.156 g/mol** (0.180156 kg/mol).",
        "**Water, H₂O**, is the simplest check: 2 × 1.008 + 15.999 = **18.015 g/mol** — the figure every chemistry student memorises. **Carbon dioxide, CO₂**, is 12.011 + 2 × 15.999 = **44.009 g/mol**, and **urea, CH₄N₂O**, is 12.011 + 4 × 1.008 + 2 × 14.007 + 15.999 = **60.056 g/mol**.",
        "Molar mass turns grams into moles and back: **90.078 g of glucose is exactly half a mole**, because 90.078 ÷ 180.156 = 0.5. That conversion — moles = mass ÷ molar mass — is the bridge between the lab bench and the balanced equation.",
      ],
    },
    {
      heading: "What this tool can't do — and why molar mass matters",
      paragraphs: [
        "The tool handles only **C, H, O, and N**, which covers most organic molecules and the common gases — but not table salt (NaCl), sulfuric acid (H₂SO₄), or anything containing sulfur, chlorine, metals, or other elements. For those, add up the atomic masses by hand from a periodic table using the same method.",
        "Molar mass is what makes **stoichiometry** possible: a balanced equation tells you the mole ratios of a reaction, and molar mass converts those moles into weighable grams. Without it, you cannot work out how much reactant to weigh or how much product to expect.",
        "It also connects gases to the ideal gas law: one mole of any ideal gas occupies 22.414 L at standard temperature and pressure, so 44.009 g of CO₂ (one mole) fills 22.414 L at 0 °C and 1 atm — the same 22.414 L the ideal gas law calculator uses as its default volume.",
      ],
    },
  ],

  "annuity-payout-calculator": [
    {
      heading: "How is an annuity payout calculated?",
      paragraphs: [
        "An annuity payout is the fixed monthly payment you receive when a lump sum is paid back to you, with interest, over a set number of years. It is calculated with the amortization formula: **PMT = PV × r / (1 − (1+r)^−n)**, where PV is the annuity value, r is the monthly interest rate, and n is the total number of monthly payments.",
        "Each payment is part interest and part return of your original lump sum. Early payments are mostly interest; later payments draw down the remaining balance until it reaches zero at the end of the payout period. A higher interest rate or a shorter payout period raises the monthly payment, while a longer period stretches the same lump sum into smaller payments.",
        "This calculator assumes a fixed rate and level monthly payments for the whole period. Real annuities vary: some pay for life rather than a fixed term, some adjust for inflation, and variable annuities tie payments to investment performance. Use the result as a planning estimate, not a quote from an insurer.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **$500,000 annuity at 5% paid out over 20 years** (240 monthly payments). The monthly rate is 0.05 ÷ 12 = 0.004167. Plugging into the formula gives a monthly payout of **$3,299.78**, or **$39,597.34 a year**.",
        "Over the full 20 years you receive **$791,946.89** in total — your original $500,000 plus **$291,946.89 of interest**. Stretch the same lump sum over 30 years instead and the monthly payout falls to **$2,684.11**, though the total paid out rises to **$966,278.92** because the balance earns interest for longer.",
      ],
    },
    {
      heading: "How do you choose a payout period?",
      paragraphs: [
        "Match the period to how long the money needs to last. A 20-year payout on $500,000 at 5% pays $3,299.78 a month; the same money over 30 years pays $2,684.11. The longer period gives you more total interest but less each month, and the payments stop entirely when the term ends.",
        "If you need income you cannot outlive, a fixed-term payout is the wrong product — a lifetime annuity pays a smaller amount but keeps paying as long as you live. Also consider inflation: a fixed $3,299.78 a month buys less in year 20 than in year 1, so some annuities offer payments that rise each year in exchange for starting lower.",
      ],
    },
  ],

  "bonus-calculator": [
    {
      heading: "How is a bonus taxed?",
      paragraphs: [
        "A work bonus is taxed as supplemental wages, and your take-home bonus is the gross amount minus federal tax, state tax, and FICA. This calculator applies the flat rates you enter: **Net Bonus = Gross − Federal − State − FICA**.",
        "Employers usually withhold federal tax on bonuses at the flat supplemental rate of 22% (37% on supplemental wages above $1 million in a year), rather than using your regular payroll withholding tables. That is why a bonus often feels heavily taxed: the withholding rate can be higher than the rate on your normal paychecks.",
        "Withholding is not your final tax bill. When you file your return, the bonus is taxed as ordinary income at your marginal rate, so you may get some of the withholding back as a refund — or owe more if your marginal rate is above 22%. FICA (Social Security and Medicare) applies to bonuses just like regular wages.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **$10,000 bonus** with 22% federal withholding, 5% state tax, and 7.65% FICA. Federal tax is $2,200, state tax is $500, and FICA is $765 — total taxes of **$3,465**.",
        "That leaves a take-home bonus of **$6,535**, an effective tax rate of 34.65%. If your actual marginal federal rate is 12% rather than 22%, you would get roughly $1,000 of that withholding back when you file your tax return.",
      ],
    },
    {
      heading: "Can you reduce the tax on a bonus?",
      paragraphs: [
        "The most effective lever is a **401(k) contribution in the bonus pay period**: money you defer into a traditional 401(k) escapes federal and state income tax (though FICA still applies). Increasing your contribution rate before the bonus is paid can shelter a large part of it.",
        "Timing matters too. If a bonus would push you into a higher bracket this year, asking for it to be paid in January instead of December — if your employer allows it — defers the tax by a year. Charitable donations in the same year also offset bonus income, but only if you itemize deductions.",
      ],
    },
  ],

  "canadian-mortgage-calculator": [
    {
      heading: "How is a Canadian mortgage payment calculated?",
      paragraphs: [
        "A Canadian mortgage payment is calculated with the standard amortization formula, but with one key difference: Canadian fixed-rate mortgages compound semi-annually, not monthly. The monthly rate is **r = (1 + i/2)^(1/6) − 1**, where i is the quoted annual rate, and the payment is then **M = P × r(1+r)ⁿ / ((1+r)ⁿ − 1)**.",
        "Because of semi-annual compounding, a quoted Canadian rate is slightly cheaper than the same number in the US. A 5.5% Canadian mortgage has an equivalent monthly rate of about 0.4532%, versus 0.4583% if the same rate compounded monthly. The difference is small each month but adds up over a 25-year amortization.",
        "This calculator uses the loan amount (home price minus down payment), the quoted rate, and the amortization period. It does not include CMHC mortgage insurance premiums, property tax, or homeowner's insurance, which are separate costs on top of the payment shown.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **$600,000 home with a $120,000 down payment**, leaving a $480,000 mortgage at 5.5% amortized over 25 years (300 payments). The Canadian monthly rate is (1 + 0.055/2)^(1/6) − 1 = 0.004532, giving a monthly payment of **$2,929.88**.",
        "Over 25 years you pay **$398,963.74 in interest** — nearly as much as the loan itself. If the same rate compounded monthly (the US method), the payment would be $2,947.62, or $17.74 more per month — **$5,322.25 more over the life of the loan**. That is the real cash value of Canada's semi-annual compounding rule.",
      ],
    },
    {
      heading: "How does the down payment change the payment?",
      paragraphs: [
        "A bigger down payment shrinks the loan and can remove a second cost entirely: in Canada, down payments under 20% require CMHC mortgage insurance, which is added to the loan balance. On a $600,000 home, a 20% down payment is $120,000 — exactly the amount that avoids the insurance premium.",
        "The minimum down payment is 5% on the first $500,000 and 10% on the portion above that. On a $600,000 home that is $25,000 + $10,000 = $35,000, but the resulting $565,000 mortgage would carry CMHC insurance on top. Test different down payments in the calculator to see how the monthly payment and the insurance trade-off interact.",
      ],
    },
  ],

  "debt-consolidation-calculator": [
    {
      heading: "How does debt consolidation save money?",
      paragraphs: [
        "Debt consolidation replaces several high-interest debts with a single loan at a lower rate, so more of each payment goes toward the balance instead of interest. This calculator compares your current debts — total balance, average rate, and current monthly payments — with a consolidation loan's rate and term, and shows the difference in monthly payment and total cost.",
        "The new loan's payment uses the standard amortization formula, while your current payoff time is derived from your balance, rate, and payment: if your monthly payment barely covers the interest, the payoff stretches for years. If the payment does not cover the monthly interest at all, the debt never gets paid off — the calculator flags that case directly.",
        "Consolidation only saves money if the new rate is genuinely lower and the term is not stretched so far that total interest rises. A longer term lowers the monthly payment but can cost more overall, and origination fees or balance-transfer fees eat into the savings.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take **$30,000 of credit card debt at 18%** with $800 a month in payments. At 18%, the monthly interest charge alone starts at $450, and paying $800 a month clears the debt in **56 months** at a total cost of **$44,800** — $14,800 of it interest.",
        "Consolidate into a **48-month loan at 8%** and the monthly payment falls to **$732.39**, the total cost falls to **$35,154.61**, and you are debt-free 8 months sooner. The total saving is **$9,645.39**, plus **$67.61 a month** back in your pocket while the loan runs.",
      ],
    },
    {
      heading: "When is consolidation a bad idea?",
      paragraphs: [
        "Watch the term. Consolidating the $30,000 above into a 7-year loan at 8% would cut the payment to about $468 a month — but the total cost would rise to roughly $39,277, wiping out more than half the saving. A lower payment is not the same as a lower cost.",
        "Consolidation also fails if the underlying spending does not change: paying off the cards and then running them up again leaves you with the consolidation loan plus new card debt. And secured consolidation — borrowing against your home — puts the house at risk if payments slip. Compare the total cost, not just the monthly payment, before signing.",
      ],
    },
  ],

  "financial-calculator": [
    {
      heading: "What is a financial (TVM) calculator?",
      paragraphs: [
        "A financial calculator solves time-value-of-money (TVM) problems: it works out the fixed monthly payment needed to pay off a loan of a given size, rate, and term. The core formula is **PMT = PV × r / (1 − (1+r)^−n)**, where PV is the present value (loan amount), r is the monthly rate, and n is the number of monthly payments.",
        "Time value of money is the idea that a dollar today is worth more than a dollar in the future, because today's dollar can earn interest. That is why a loan costs more than its face value: you repay the principal plus interest for the use of the lender's money over time. The same relationship links present value, future value, payments, rate, and periods in every loan and savings calculation.",
        "This calculator solves for the payment leg of that relationship and breaks the result into total paid and total interest. It assumes a fixed rate, level monthly payments, and monthly compounding — the standard structure for mortgages, auto loans, and personal loans.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **$200,000 loan at 6% over 30 years** (360 payments). The monthly rate is 0.06 ÷ 12 = 0.005, giving a monthly payment of **$1,199.10**. Over the full term you pay **$431,676.38** in total — **$231,676.38 of it interest**, more than the amount you borrowed.",
        "Shorten the term to 15 years and the payment rises to **$1,687.71**, but total interest falls to **$103,788.46** — a saving of **$127,887.92**. That trade-off between a higher payment and far less interest is exactly what this calculator is for: test the term and rate before you commit.",
      ],
    },
    {
      heading: "How do you use it for a savings goal?",
      paragraphs: [
        "A loan payment and a savings plan are mirror images, but they are not the same calculation. To pay off a $200,000 loan at 6% over 30 years takes $1,199.10 a month — but to save up $200,000 at the same rate over the same period takes only about **$199.10 a month**, because your deposits earn interest instead of costing it.",
        "That gap is the cost of borrowing versus the reward of saving, and it is why the order matters: saving first and borrowing less almost always beats borrowing the full amount. Use this calculator for the loan side of any plan, and a compound interest calculator for the savings side, to compare both paths honestly.",
      ],
    },
  ],

  "irr-calculator": [
    {
      heading: "What is IRR, and how is it calculated?",
      paragraphs: [
        "The internal rate of return (IRR) is the annual rate at which an investment's future cash flows are worth exactly what you paid for it — the rate that makes the net present value (NPV) equal zero. It is found by solving **NPV = Σ CF_t / (1+IRR)^t = 0**, which has no simple formula, so this calculator finds it by iteration (Newton's method).",
        "IRR turns a whole stream of cash flows into a single percentage you can compare with other investments or with your cost of capital. A project with an IRR above your cost of capital creates value; below it, the project destroys value even if the total cash coming back exceeds what you put in.",
        "IRR has limits: it assumes cash flows are reinvested at the IRR itself, it can give multiple answers when cash flows change sign more than once, and it ignores the size of the investment — a 50% return on $1,000 is not better than a 15% return on $1,000,000. Use it alongside NPV and payback period, not alone.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **$50,000 investment** returning $15,000 in year 1, $18,000 in year 2, $22,000 in year 3, and $12,000 in year 4 — $67,000 in total, a $17,000 profit and a 34% simple ROI. The IRR of that cash-flow stream is **12.98%**.",
        "You can check it: discounting the cash flows at 10% gives an NPV of **+$3,237.48**, and at 13% the NPV is about **−$22** — essentially zero, which is exactly what IRR means. If your cost of capital is 10%, this project clears the bar; if it is 15%, it does not.",
      ],
    },
    {
      heading: "What is a good IRR?",
      paragraphs: [
        "There is no universal target — a good IRR is simply one above your cost of capital with enough margin for the risk. Many businesses look for 15–25% on new projects, while a safe, predictable investment might be acceptable at 8–10%. The riskier and less certain the cash flows, the higher the IRR should be.",
        "Compare like with like: IRRs are most useful when the projects have similar lengths and risk. A 5-year project at 12% and a 2-year project at 12% are not equivalent, because the longer project ties your money up for longer. When projects differ in scale or timing, check the NPV in dollars too — it tells you how much value is actually created.",
      ],
    },
  ],

  "percent-off-calculator": [
    {
      heading: "How do you calculate percent off?",
      paragraphs: [
        "A percent-off discount is calculated as **Sale Price = Original Price × (1 − %off/100)**, and the amount you save is **Original Price × %off/100**. A 25% discount on a $100 item saves $25 and leaves a $75 sale price.",
        "The mental shortcut is to find 10% first, then scale it: 10% of $80 is $8, so 30% off is $24 off and the sale price is $56. That trick works for any percentage because every percent is a multiple of 10% plus a small remainder.",
        "Percent off is not the same as a percent change in the other direction. If a $100 item is marked down 25% to $75, restoring the price takes a 33.33% increase — because the 33.33% applies to the smaller $75 base. Discounts and markups are not symmetric.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a jacket priced at **$120 with 30% off**. The discount is $120 × 0.30 = **$36**, so the sale price is **$84**. At the register you would still pay sales tax on the $84, not on the original $120.",
        "Stacked discounts do not add up the way they look. A sign saying '20% off, plus an extra 10% off' is not 30% off: the second discount applies to the already-reduced price, so $100 becomes $80 and then **$72** — a 28% total discount, not 30%.",
      ],
    },
    {
      heading: "How do you spot a fake discount?",
      paragraphs: [
        "Compare against the price the item actually sold at before the sale, not the 'was' price on the tag. A retailer can inflate the original price before applying a discount, making a 40% saving look bigger than it is — the sale price may be barely below the normal price.",
        "Use the calculator to check the real numbers: enter the price you would actually have paid and the sale price, and work out the true percentage. A genuine deal saves money against the price you can verify elsewhere, not against a number the store chose.",
      ],
    },
  ],

  "property-tax-calculator": [
    {
      heading: "How is property tax calculated?",
      paragraphs: [
        "Property tax is calculated from your home's assessed value, not its market price: **Tax = (Home Value × Assessment Ratio − Exemptions) × Rate/1000**. The assessment ratio is the share of market value your county taxes, and the rate is usually quoted in mills — dollars of tax per $1,000 of assessed value.",
        "Assessed value and market value are often different. A county may assess homes at 80% of market value, or reassess only every few years, so a home worth $400,000 today might be taxed on $320,000. Exemptions such as a homestead exemption reduce the assessed value further before the rate is applied.",
        "The millage rate is set by local governments and varies widely by state and county. The effective rate — your tax bill divided by your home's market value — is the fairest way to compare the tax burden between areas, because it folds the assessment ratio and the millage rate into one number.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a home with a **$400,000 market value**, an 80% assessment ratio, a tax rate of $15 per $1,000, and no exemptions. The assessed value is $400,000 × 0.80 = **$320,000**, and the annual tax is $320,000 × 15/1000 = **$4,800** — **$400 a month**.",
        "The effective tax rate is $4,800 ÷ $400,000 = **1.20%**. Add a $50,000 homestead exemption and the assessed value falls to $270,000, the tax falls to **$4,050**, and you save **$750 a year** — which is why checking your exemptions is worth a few minutes every year.",
      ],
    },
    {
      heading: "Can you lower your property tax?",
      paragraphs: [
        "The most direct route is an appeal. If your assessment is higher than what comparable homes in your neighborhood recently sold for, you can file an appeal with your county assessor — comparable sales data is the strongest evidence, and many appeals succeed at least partly.",
        "The second route is exemptions. Homestead, senior citizen, veteran, and disability exemptions all reduce the assessed value, and some are not applied automatically — you have to claim them. A $50,000 exemption at a $15 millage rate is worth $750 a year, every year, for one form.",
      ],
    },
  ],

  "rent-calculator": [
    {
      heading: "How much rent can you afford?",
      paragraphs: [
        "The standard guideline is the 30% rule: your rent should be no more than 30% of your gross monthly income. This calculator applies it as **Max Rent = Monthly Income × Rent%**, then subtracts your estimated utilities to show what is left for the rent itself.",
        "The 30% figure is a guideline, not a law. It exists because housing is usually the largest single expense, and keeping it at or under 30% leaves room for food, transport, savings, and everything else. In expensive cities many renters spend 40–50%, which is workable only if other costs are low and savings do not disappear entirely.",
        "Note that the rule uses gross income — your pay before tax. A 30% rent on gross pay is a larger share of what actually lands in your bank account, so if you want a stricter budget, enter your take-home pay instead of your gross pay and the same percentage gives a more conservative answer.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **$5,000 monthly gross income** with the 30% rule and $150 a month of utilities. The maximum rent budget is $5,000 × 0.30 = **$1,500 a month**, or **$18,000 a year**.",
        "After the $150 of utilities, the rent you can actually afford is **$1,350 a month**, leaving **$3,500** of income for everything else. Raise the percentage to 40% and the budget becomes $2,000 — but that extra $500 a month is $6,000 a year that is no longer available for savings or emergencies.",
      ],
    },
    {
      heading: "What else should you budget for when renting?",
      paragraphs: [
        "Rent is not the whole housing cost. Utilities, renter's insurance, parking, and pet fees all add up, and most landlords also require a security deposit — often one month's rent — plus first month's rent upfront. This calculator's utilities field covers the recurring extras; the one-off move-in costs need separate savings.",
        "Also remember that rent usually rises each year. A rent that is exactly 30% of your income today becomes 33% after a 10% rent increase unless your pay rises too. Leaving a small margin under your maximum gives you room to absorb the increase without moving.",
      ],
    },
  ],

  "rental-property-calculator": [
    {
      heading: "How do you analyze a rental property?",
      paragraphs: [
        "A rental property is judged by three numbers: monthly cash flow, cap rate, and cash-on-cash return. Cash flow is **Rent − Mortgage − Expenses**; the cap rate is **Annual NOI ÷ Purchase Price**, where NOI is rent minus expenses excluding the mortgage; and cash-on-cash return is **Annual Cash Flow ÷ Down Payment**.",
        "The cap rate measures the property itself, ignoring how you financed it — which is why it is the standard way to compare two properties. Cash-on-cash return measures your money: the same property looks very different with a 25% down payment than with a 10% one, because leverage magnifies both gains and losses.",
        "This calculator assumes a 30-year fixed mortgage and the monthly expenses you enter — tax, insurance, and maintenance. It does not include vacancy, property management fees, or tax, so treat the results as a screening estimate before a deeper analysis.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **$300,000 property** with 25% down ($75,000), a $225,000 mortgage at 7% over 30 years, **$2,200 monthly rent**, and $600 a month of expenses. The monthly mortgage payment is **$1,496.93**.",
        "Annual NOI is ($2,200 − $600) × 12 = **$19,200**, so the cap rate is $19,200 ÷ $300,000 = **6.40%**. Monthly cash flow is $2,200 − $1,496.93 − $600 = **$103.07**, giving a cash-on-cash return of $103.07 × 12 ÷ $75,000 = **1.65%**. The property pays for itself, but only just — one month of vacancy would wipe out most of a year's cash flow.",
      ],
    },
    {
      heading: "What makes a rental deal good enough?",
      paragraphs: [
        "A cap rate of 5–10% is typical, with higher rates usually signalling higher-risk areas. But cap rate alone is not enough: a property can have a healthy cap rate and still lose money each month if the mortgage is expensive, which is why cash flow is the number that decides whether you can hold the property.",
        "Build in a margin for reality. Budget for at least one month of vacancy a year and for maintenance surprises — a new roof or a broken furnace can cost several years of cash flow. If the deal only works with perfect occupancy and zero repairs, it is not a deal yet.",
      ],
    },
  ],

  "rmd-calculator": [
    {
      heading: "How is a required minimum distribution calculated?",
      paragraphs: [
        "A required minimum distribution (RMD) is the smallest amount you must withdraw each year from a traditional IRA or 401(k) once you reach the required age. It is calculated as **RMD = Account Balance ÷ Distribution Factor**, where the factor comes from the IRS Uniform Lifetime Table and shrinks as you get older — so the required withdrawal grows each year.",
        "Under the SECURE 2.0 Act, RMDs begin at age 73 for people born between 1951 and 1959, and at age 75 for those born in 1960 or later. Your first RMD must be taken by April 1 of the year after you reach that age, and every later RMD is due by December 31.",
        "RMDs apply to traditional IRAs, 401(k)s, and similar pre-tax accounts — not to Roth IRAs during the owner's lifetime. The withdrawn amount counts as taxable income in the year you take it, which is why RMDs can push retirees into a higher tax bracket.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **$500,000 traditional IRA balance at age 73**. The distribution factor at 73 is 26.5, so the RMD is $500,000 ÷ 26.5 = **$18,867.92 for the year**, or **$1,572.33 a month** — 3.77% of the balance.",
        "By age 80 the factor has fallen to 20.2, so the same $500,000 balance would require **$24,752.48** — and by 75 (factor 24.6) it would be **$20,325.20**. The percentage rises every year, so even if the balance stays flat, the required withdrawal keeps growing.",
      ],
    },
    {
      heading: "What happens if you miss an RMD?",
      paragraphs: [
        "Missing an RMD is expensive: the penalty is 25% of the amount you should have withdrawn (reduced to 10% if corrected promptly). On an $18,867.92 RMD, that is a penalty of more than $4,700 — on top of the tax you still owe on the withdrawal itself.",
        "The practical fix is automation. Most custodians let you schedule RMDs as automatic monthly or annual withdrawals, and many will calculate the amount for you each year. If you have several accounts, you can total the RMDs and take the full amount from one IRA — but 401(k) RMDs must be taken from each 401(k) separately.",
      ],
    },
  ],

  "roth-ira-calculator": [
    {
      heading: "How does a Roth IRA grow?",
      paragraphs: [
        "A Roth IRA grows tax-free: you contribute after-tax money, it compounds without tax, and qualified withdrawals in retirement are completely tax-free. This calculator projects the future value with **FV = P(1+r)^n + PMT×[(1+r)^n−1]/r**, where P is your current balance, PMT is your monthly contribution, r is the monthly return, and n is the number of months.",
        "The power of a Roth IRA is time. Contributions are limited each year, but the growth on decades of contributions can dwarf the money you put in — and unlike a traditional IRA, none of that growth is ever taxed, and there are no required minimum distributions during your lifetime.",
        "Contributions are capped annually (the limit rises with inflation and is higher once you turn 50), and eligibility phases out above certain incomes — check the current IRS limits before contributing. This calculator assumes a steady monthly contribution and a constant rate of return, which is a simplification: real investment returns vary year to year.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **$10,000 current balance** with **$7,000 contributed each year** at a 7% average return for 30 years. The balance grows to **$792,814.72** — of which you contributed only **$220,000**. The other **$572,814.72 is tax-free growth**, more than two and a half times what you put in.",
        "At retirement, a 4% withdrawal rate on that balance provides **$2,642.72 a month** of tax-free income. Start ten years later — 20 years of growth instead of 30 — and the balance reaches only **$344,261.27** on $150,000 contributed. Those first ten years are worth more than $448,000.",
      ],
    },
    {
      heading: "Roth IRA or traditional IRA?",
      paragraphs: [
        "The choice comes down to your tax rate now versus your tax rate in retirement. If you expect to be in a higher bracket later — common early in a career — the Roth wins, because you pay tax at today's lower rate and withdraw tax-free. If you expect a lower bracket in retirement, a traditional IRA's upfront deduction may be worth more.",
        "The Roth has two extra advantages: your contributions (not the growth) can be withdrawn at any time without tax or penalty, and there are no required minimum distributions, so the money can keep growing — or pass to heirs — untouched. Many savers split contributions between both types to hedge against future tax changes.",
      ],
    },
  ],

  "social-security-calculator": [
    {
      heading: "How is a Social Security benefit calculated?",
      paragraphs: [
        "Your Social Security benefit starts from your Primary Insurance Amount (PIA) — the monthly benefit you receive at full retirement age. It is calculated from your average indexed monthly earnings with a progressive formula: **90% of the first bend-point amount, plus 32% of the next portion, plus 15% of the rest**, so lower earners get a higher share of their earnings replaced.",
        "Claiming early reduces the benefit and claiming late increases it. For each month before full retirement age, the benefit is cut by 5/9 of 1% for the first 36 months and 5/12 of 1% beyond that — roughly 30% for claiming at 62 with a full retirement age of 67. For each year you wait past full retirement age, up to age 70, the benefit grows by 8%.",
        "This calculator is an estimate: it uses the average annual earnings you enter as the basis for the benefit formula, while the Social Security Administration uses your highest 35 years of indexed earnings. The bend points in the formula are adjusted each year, so check your official estimate at ssa.gov before making a claiming decision.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take **average annual earnings of $65,000** with a full retirement age of 67. Average monthly earnings are $5,416.67, and the bend-point formula gives a PIA of **$2,414.25 a month** at age 67 — **$28,971.04 a year**.",
        "Claim at 62 and the benefit is cut by 30% to **$1,689.98 a month** ($20,279.73 a year). Wait until 70 and delayed credits add 24%, raising it to **$2,993.67 a month** ($35,924.09 a year). The gap between claiming at 62 and at 70 is **$1,303.69 every month, for life**.",
      ],
    },
    {
      heading: "Should you claim early or wait?",
      paragraphs: [
        "There is no single right answer. Waiting to 70 pays the highest monthly amount, but you give up eight years of payments to get it — the break-even point is usually around age 80–82, after which waiting wins. If you need the income, are in poor health, or have no other savings, claiming earlier is often the sensible choice.",
        "Consider your spouse too: a higher earner who delays raises the survivor benefit their spouse would receive, which can be worth more than the extra payments. And remember that up to 85% of Social Security benefits can be taxable if your other income is high enough — another reason to plan the claiming age alongside your tax situation.",
      ],
    },
  ],

  "tax-refund-calculator": [
    {
      heading: "How is a tax refund calculated?",
      paragraphs: [
        "A tax refund is the difference between what you already paid in tax and what you actually owe: **Refund = Tax Withheld − Tax Owed**. If withholding was more than the tax, you get a refund; if it was less, you owe the balance.",
        "Your tax is figured from taxable income — gross income minus deductions — run through the progressive federal brackets, where each slice of income is taxed at its own rate. Only the income above each bracket threshold is taxed at the higher rate, so moving into a higher bracket never makes you worse off overall. Tax credits then reduce the tax itself, dollar for dollar.",
        "This calculator is a federal-only estimate using its built-in brackets and a single set of deductions. It does not include state tax, FICA, the standard deduction choice, or the higher 35% and 37% brackets, so it is best for typical incomes — use it as a planning estimate, not a filing figure.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take **$75,000 of gross income**, **$14,600 of deductions**, and **$12,000 withheld**, with no credits. Taxable income is $75,000 − $14,600 = **$60,400**. The bracket tax is 10% of $11,600 ($1,160) plus 12% of the next $35,550 ($4,266) plus 22% of the remaining $13,250 ($2,915) — total tax of **$8,341**.",
        "With $12,000 withheld, the refund is **$3,659**, and the effective tax rate is $8,341 ÷ $75,000 = **11.12%**. Note the marginal rate is 22% — the rate on the next dollar earned — even though only 11.12% of total income went to federal tax.",
      ],
    },
    {
      heading: "Is a big refund good news?",
      paragraphs: [
        "A refund feels like a bonus, but it is really an interest-free loan you gave the government: you overpaid during the year and are getting your own money back. A $3,659 refund means about $305 a month was withheld unnecessarily — money that could have been earning interest or paying down debt.",
        "The ideal result is close to zero: enough withheld to avoid owing, but not so much that you are lending to the IRS. If your refund is large every year, adjust your W-4 withholding so more of your pay arrives in each paycheck instead. The exception is if you deliberately use the refund as forced savings — but a savings account pays you interest for the same job.",
      ],
    },
  ],

  "uk-mortgage-calculator": [
    {
      heading: "How is a UK mortgage repayment calculated?",
      paragraphs: [
        "A UK repayment mortgage is calculated with the standard amortization formula: **M = P × r(1+r)^n / ((1+r)^n − 1)**, where P is the mortgage amount (property price minus deposit), r is the monthly interest rate, and n is the total number of monthly payments. Each payment covers the month's interest plus a slice of the capital, so the balance reaches zero at the end of the term.",
        "The deposit matters twice: it shrinks the loan, and it sets your loan-to-value (LTV) ratio, which is how lenders price your rate. A 10% deposit means a 90% LTV mortgage; a 20% deposit means 80% LTV, which usually qualifies for a lower rate — so the saving from a bigger deposit is larger than the smaller loan alone suggests.",
        "Most UK mortgages are fixed for an initial period — commonly 2 or 5 years — then move to the lender's standard variable rate unless you remortgage. This calculator assumes one fixed rate for the whole term, so treat the total interest as a planning figure rather than a prediction of what you will actually pay.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **£300,000 property with a 10% deposit (£30,000)**, leaving a £270,000 mortgage at 5% over 25 years (300 payments). The monthly rate is 0.05 ÷ 12 = 0.004167, giving a monthly repayment of **£1,578.39**.",
        "Over 25 years you pay **£203,517.93 in interest** — about 75% of the amount borrowed. Raise the deposit to 20% and the loan falls to £240,000, the payment falls to **£1,403.02**, and total interest falls to **£180,904.83** — a saving of £22,613.10 before any rate improvement from the lower LTV.",
      ],
    },
    {
      heading: "What else does a UK mortgage cost?",
      paragraphs: [
        "The monthly repayment is not the whole cost. Budget for the arrangement fee (often around £1,000, sometimes added to the loan), a valuation fee, legal/conveyancing costs, and Stamp Duty Land Tax on purchases above the threshold — first-time buyers get relief up to a higher threshold.",
        "The other cost to plan for is the end of the fixed period. When a 2- or 5-year fix ends, the rate typically jumps to the lender's standard variable rate unless you remortgage, which can add hundreds of pounds a month. Diarise the fix end date and start shopping for a new deal three to six months before it arrives.",
      ],
    },
  ],

  "vat-calculator": [
    {
      heading: "How do you calculate VAT?",
      paragraphs: [
        "Value Added Tax is calculated two ways depending on whether your price already includes it. To add VAT to a net price: **Price + VAT = Amount × (1 + Rate/100)**. To remove VAT from a gross price: **Price excl. VAT = Amount ÷ (1 + Rate/100)** — dividing, not subtracting the percentage, because the VAT was charged on the smaller net amount.",
        "VAT is a consumption tax collected at each stage of production, with businesses reclaiming the VAT they pay on inputs — so the final consumer bears the full tax. That is different from US sales tax, which is charged only once, at the final sale, though the consumer ends up paying a similar amount either way.",
        "Rates vary by country and by product. The UK standard rate is 20%, EU standard rates range from 17% to 27%, and many countries charge reduced rates — often around 5% — on essentials such as food, books, and children's clothing.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a net price of **$500 with 20% VAT**. The VAT is $500 × 0.20 = **$100**, so the gross price is **$600**.",
        "Now work backwards from a gross price of $500 at 20% VAT. The net price is $500 ÷ 1.20 = **$416.67**, and the VAT inside that price is **$83.33** — not $100. The common mistake is to subtract 20% of the gross price, which overstates the VAT because the tax was calculated on the net figure.",
      ],
    },
    {
      heading: "When do you add VAT, and when do you remove it?",
      paragraphs: [
        "Add VAT when you are quoting a price before tax — the usual case for businesses selling to other businesses, where prices are shown net and VAT is added on the invoice. Remove VAT when you are working backwards from a price a consumer already paid, such as checking how much of a till receipt was tax or reclaiming VAT on a business expense.",
        "If you are a VAT-registered business, keep the two directions straight in your bookkeeping: the VAT you charge customers is not your money — you pass it to the tax authority, minus the VAT you paid on your own purchases. Getting the add/remove direction wrong is one of the most common small-business VAT errors.",
      ],
    },
  ],

  "cooking-measurement-converter": [
    {
      heading: "How do cooking measurements convert?",
      paragraphs: [
        "Cooking volumes convert through millilitres: every unit is first converted to mL, then to the unit you want. The key relationships are **1 US cup = 236.6 mL, 1 tablespoon = 14.8 mL, 1 teaspoon = 4.9 mL, and 1 fluid ounce = 29.6 mL** — and within the US system, 1 cup = 16 tablespoons = 48 teaspoons.",
        "The catch is that a 'cup' is not the same everywhere. This calculator uses the US cup (236.6 mL). A metric cup is 250 mL and an Australian cup is also 250 mL, so a recipe written for metric cups needs about 6% more of each ingredient than the US conversion shows.",
        "Volume and weight are different things: a cup of flour weighs about 125 g while a cup of sugar weighs about 200 g, because they have different densities. This converter handles volume-to-volume only — for volume-to-weight, use an ingredient density converter instead.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take **2 US cups** of milk. In millilitres that is 2 × 236.588 = **473.18 mL**. In tablespoons it is 2 × 16 = **32 tbsp**, in teaspoons 2 × 48 = **96 tsp**, and in fluid ounces 473.18 ÷ 29.574 = **16 fl oz** — exactly one US pint.",
        "If the recipe were written with metric cups instead, 2 cups would be 500 mL — 26.82 mL more. That is a small difference for milk, but for baking powder or yeast it can change the result, which is why checking which cup your recipe means is worth a moment.",
      ],
    },
    {
      heading: "How do you measure accurately without a scale?",
      paragraphs: [
        "Use the spoon-and-level method for dry ingredients: spoon flour into the cup rather than scooping the cup through the bag, then level it with a knife. Scooping compacts the flour and can add 20–30% more than the recipe intends.",
        "For liquids, measure at eye level in a clear jug — reading from above makes the level look lower than it is. And when a recipe gives both weight and volume, trust the weight: it is the same in every country, while cups are not.",
      ],
    },
  ],

  "data-storage-converter": [
    {
      heading: "How do data storage units convert?",
      paragraphs: [
        "Data storage converts in powers of 1024: **1 KB = 1,024 bytes, 1 MB = 1,024 KB, 1 GB = 1,024 MB, and 1 TB = 1,024 GB**. This calculator uses the binary (base-2) system, where each step up multiplies by 1,024 — so 1 GB is 1,073,741,824 bytes, not one billion.",
        "The confusion comes from the two systems in use. Formally, KB means 1,000 bytes (SI decimal) and KiB means 1,024 bytes (binary), but in everyday use KB almost always means 1,024 bytes — that is what operating systems show and what this calculator uses.",
        "That dual system explains the most common storage mystery: a drive sold as '1 TB' holds 1,000,000,000,000 bytes by the manufacturer's decimal counting, but your computer divides by 1,024 at each step and reports only about 931 GB. No space is missing — the two sides are just counting in different units.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take **2.5 GB**. In bytes that is 2.5 × 1,073,741,824 = **2,684,354,560 bytes**. In megabytes it is 2.5 × 1,024 = **2,560 MB**, and in kilobytes it is 2,560 × 1,024 = **2,621,440 KB**.",
        "Going the other way, a 500 GB drive holds 500 × 1,024 = **512,000 MB**. And that '1 TB' drive: 1,000,000,000,000 ÷ 1,073,741,824 = **931.32 GB** as your computer reports it — the roughly 7% gap is the decimal-versus-binary difference, not lost space.",
      ],
    },
    {
      heading: "How much storage do you actually need?",
      paragraphs: [
        "Work backwards from what you store. A typical smartphone photo is 3–5 MB, so 10,000 photos need roughly 30–50 GB; an hour of 1080p video is about 3–6 GB, while 4K video can be 20 GB an hour or more. Add your files up in the same unit before buying.",
        "Leave headroom: drives slow down and wear faster when nearly full, and operating systems need free space for updates and temporary files. A drive that is 80% full is effectively full — plan your next size up from what the arithmetic says.",
      ],
    },
  ],

  "fuel-consumption-converter": [
    {
      heading: "How do fuel consumption units convert?",
      paragraphs: [
        "Fuel consumption is measured two opposite ways: distance per unit of fuel (miles per gallon, km per litre) or fuel per unit of distance (litres per 100 km). The conversions are **km/L = MPG × 0.425144** and **L/100km = 100 ÷ km/L** — this calculator uses US gallons throughout.",
        "The two styles point in opposite directions, which is the main source of confusion. Higher MPG or km/L means better efficiency — you travel further on each unit of fuel. Lower L/100km means better efficiency — you use less fuel for each 100 km. A car rated 30 MPG and a car rated 7.84 L/100km are exactly the same car.",
        "Watch which gallon you are using. A US gallon is 3.785 litres, while an imperial gallon (UK) is 4.546 litres, so the same car shows a higher MPG figure in imperial gallons — 30 US MPG is about 36 imperial MPG. This calculator works in US gallons only.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a car rated at **30 MPG (US)**. In km/L that is 30 × 0.425144 = **12.75 km/L**. In litres per 100 km it is 100 ÷ 12.75432 = **7.84 L/100km**.",
        "A more efficient car at 50 MPG converts to 50 × 0.425144 = **21.26 km/L**, or 100 ÷ 21.2572 = **4.70 L/100km**. And going the other way, a car rated 8 L/100km does 100 ÷ 8 = 12.5 km/L, which is 12.5 ÷ 0.425144 = **29.40 MPG**.",
      ],
    },
    {
      heading: "How much fuel does your commute actually use?",
      paragraphs: [
        "L/100km makes trip maths easy: multiply the figure by the distance in hundreds of kilometres. A 40 km round-trip commute in a car rated 7.84 L/100km uses 0.4 × 7.84 = **3.14 litres a day** — about 15.7 litres over a five-day week, or roughly 690 litres over 220 working days a year.",
        "That is where small efficiency differences pay off. The same commute in a 4.70 L/100km car uses 1.88 litres a day — saving about 1.26 litres a day, or roughly 276 litres a year. At any fuel price, that adds up to a real annual saving.",
      ],
    },
  ],

  "inches-to-centimeters-converter": [
    {
      heading: "How do you convert inches to centimeters?",
      paragraphs: [
        "Inches convert to centimeters by a single exact factor: **cm = inches × 2.54**. Since 1959, the international inch has been defined as exactly 2.54 cm, so the conversion is exact — there is no rounding in the factor itself, only in how many decimal places you display.",
        "The same factor gives you millimetres and metres for free: multiply the centimetres by 10 for millimetres, or divide by 100 for metres. This calculator shows all three, so one input covers every metric length you are likely to need.",
        "Inches are still the everyday unit in the US for height, screen sizes, and many product dimensions, while most of the rest of the world uses centimetres — which is why this is one of the most common conversions there is.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take **12 inches** — one foot. In centimetres that is 12 × 2.54 = **30.48 cm**, in millimetres **304.80 mm**, and in metres **0.3048 m**.",
        "For height: a person who is 5 feet 10 inches tall is 70 inches, which is 70 × 2.54 = **177.80 cm**. And a 55-inch TV screen measures 55 × 2.54 = **139.70 cm** diagonally — the size is always the diagonal, not the width.",
      ],
    },
    {
      heading: "How do you estimate inches to centimeters in your head?",
      paragraphs: [
        "Multiply by 2.5 for a quick estimate and add a little: 2.5 is only 1.6% below the true 2.54, so 20 inches is about 50 cm by the shortcut and exactly 50.80 cm. For most everyday purposes — checking whether furniture fits, or whether a bag meets a size limit — the shortcut is close enough.",
        "For the reverse direction, divide centimetres by 2.54, or multiply by 0.3937. A 100 cm desk is 39.37 inches wide. When precision matters — cutting materials, medical measurements, engineering — use the calculator rather than the shortcut.",
      ],
    },
  ],

  "kilograms-to-pounds-converter": [
    {
      heading: "How do you convert kilograms to pounds?",
      paragraphs: [
        "Kilograms convert to pounds with one factor: **lbs = kg × 2.20462**. The conversion is exact by definition — since 1959, one pound has been defined as exactly 0.45359237 kg — so the only rounding is in how many decimal places you keep.",
        "This calculator also shows the result in ounces (pounds × 16) and in stones and pounds, the unit still used for body weight in the UK and Ireland. One stone is 14 pounds, so a weight in stones is just the pounds divided by 14, with the remainder shown as pounds.",
        "Kilograms are the standard almost everywhere, while pounds remain everyday in the US — for body weight, food, luggage limits, and gym weights — which is why this conversion comes up constantly when travelling or following fitness and cooking content from another country.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take **75 kg**. In pounds that is 75 × 2.20462 = **165.35 lb**, and in ounces it is 165.3465 × 16 = **2,645.54 oz**.",
        "In stones and pounds: 165.3465 ÷ 14 = 11.81 stone, so the weight is **11 st 11.3 lb** (11 full stone plus the 11.35 lb remainder). And a 23 kg checked-bag limit — the standard economy allowance — is 23 × 2.20462 = **50.71 lb**.",
      ],
    },
    {
      heading: "How do you estimate kg to lbs in your head?",
      paragraphs: [
        "Double the kilograms and add 10% of the original: 75 kg doubled is 150, plus 7.5 is 157.5 — that shortcut gives 157.5 lb against the true 165.35 lb, so it underestimates by about 5%. A closer shortcut is to multiply by 2.2: 75 × 2.2 = 165 lb, within half a pound of the exact answer.",
        "For the reverse direction, divide pounds by 2.2: 165 lb ÷ 2.2 = 75 kg. When the number matters — medication doses, luggage limits at check-in, or competition weight classes — use the exact factor rather than any shortcut.",
      ],
    },
  ],

  "liters-to-gallons-converter": [
    {
      heading: "How do you convert liters to gallons?",
      paragraphs: [
        "Litres convert to US gallons by dividing: **US gallons = litres ÷ 3.78541**, because one US gallon is defined as exactly 3.78541 litres. This calculator also shows imperial gallons (litres ÷ 4.54609) and US quarts (gallons × 4).",
        "The two gallons are the trap. A US gallon is 3.785 litres; an imperial gallon, used in the UK, is 4.546 litres — about 20% larger. The same volume of fuel reads as fewer imperial gallons than US gallons, which is also why UK fuel-economy figures in MPG look higher than the equivalent US figures.",
        "Litres are the standard for fuel, drinks, and containers almost everywhere except the US, where gallons rule for fuel and milk. Converting matters most when comparing fuel prices or tank sizes across countries, where mixing up the two gallons gives a wrong answer by a fifth.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take **10 litres**. In US gallons that is 10 ÷ 3.78541 = **2.6417 gal**, in imperial gallons 10 ÷ 4.54609 = **2.1997 gal**, and in US quarts 2.6417 × 4 = **10.5669 qt**.",
        "For a fuel tank: a 50-litre tank holds 50 ÷ 3.78541 = **13.21 US gallons**. At $3.50 a US gallon, filling it costs 13.21 × $3.50 = **$46.23** — and the same tank in imperial gallons is 50 ÷ 4.54609 = 11.00 gallons, which is why the same car is quoted with different tank sizes on each side of the Atlantic.",
      ],
    },
    {
      heading: "How do you compare fuel prices across countries?",
      paragraphs: [
        "Convert everything to the same unit before comparing. A litre price divided by 3.78541 gives the price per US gallon; multiplied by 4.54609 it gives the price per imperial gallon. Comparing a per-litre price directly with a per-gallon price without converting is meaningless.",
        "Remember that taxes dominate fuel prices in many countries, so a price gap often reflects tax rather than the fuel itself. The conversion tells you the true price difference; the reason for it is usually policy, not the petrol station.",
      ],
    },
  ],

  "pressure-converter": [
    {
      heading: "How do pressure units convert?",
      paragraphs: [
        "Pressure converts through pascals: every unit is first converted to Pa, then to the unit you want. The key relationships are **1 atmosphere = 101,325 Pa, 1 bar = 100,000 Pa, 1 PSI = 6,894.76 Pa, and 1 mmHg = 133.322 Pa**.",
        "Each unit has a home. Pascals are the scientific standard; PSI (pounds per square inch) is everyday in the US for tyres and plumbing; bar is common for tyres and weather in Europe; atmospheres describe pressure relative to sea level; and mmHg (millimetres of mercury) survives in medicine for blood pressure and in weather reports.",
        "Standard atmospheric pressure at sea level is the anchor for all of them: 1 atm = 101,325 Pa = 14.696 PSI = 1.01325 bar = 760 mmHg. Weather reports describe high and low pressure systems as small departures from that figure.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take **1 atmosphere**. In pascals that is **101,325 Pa**, in PSI it is 101,325 ÷ 6,894.76 = **14.6959 PSI**, in bar it is 101,325 ÷ 100,000 = **1.01325 bar**, and in mmHg it is 101,325 ÷ 133.322 = **760.00 mmHg**.",
        "For a car tyre at 32 PSI: in pascals that is 32 × 6,894.76 = **220,632.32 Pa**, in bar it is 220,632.32 ÷ 100,000 = **2.21 bar**, and in atmospheres it is 220,632.32 ÷ 101,325 = **2.18 atm** — more than twice the pressure of the air around you, which is why a puncture releases air so forcefully.",
      ],
    },
    {
      heading: "Why does tyre pressure matter?",
      paragraphs: [
        "Tyre pressure is usually quoted in PSI in the US and bar in Europe, and the recommended pressure is printed on the driver's door jamb, not on the tyre — the number on the tyre is the maximum, not the target. Most cars want roughly 30–35 PSI (about 2.1–2.4 bar).",
        "Pressure drops as temperature falls — roughly 1 PSI for every 10°F (5.6°C) drop — which is why the tyre warning light often appears on the first cold morning of autumn. Check pressures when the tyres are cold, before driving, for an accurate reading.",
      ],
    },
  ],

  "volume-converter": [
    {
      heading: "How do volume units convert?",
      paragraphs: [
        "Volume converts through litres: every unit is first converted to litres, then to the unit you want. The key relationships are **1 US gallon = 3.78541 L, 1 US cup = 0.236588 L, 1 millilitre = 0.001 L, and 1 fluid ounce = 0.0295735 L**.",
        "This converter uses US units throughout — US gallons, US cups, and US fluid ounces. The imperial gallon used in the UK is larger (4.546 L), and the metric cup is 250 mL rather than the US cup's 236.6 mL, so check which system your source uses before converting.",
        "Volume and weight are not interchangeable: a litre of water weighs 1 kg, but a litre of oil weighs about 0.91 kg and a litre of honey about 1.42 kg. This converter handles volume-to-volume only — converting between volume and weight needs the substance's density.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take **1 US gallon**. In litres that is **3.78541 L**, in millilitres **3,785.41 mL**, in US cups 3.78541 ÷ 0.236588 = **16.00 cups**, and in fluid ounces 3.78541 ÷ 0.0295735 = **128.00 fl oz**.",
        "Going the other way, 2 litres is 2 ÷ 3.78541 = **0.5283 US gallons**, or 2 ÷ 0.236588 = **8.45 US cups**. A standard 500 mL bottle is 0.5 litres — just over 2 cups (2.11) and about 16.91 fl oz.",
      ],
    },
    {
      heading: "How do you convert a recipe between US and metric?",
      paragraphs: [
        "Convert the whole recipe to one system before you start cooking, not ingredient by ingredient mid-recipe. Liquids convert cleanly through litres, but cups of dry ingredients are approximate — a cup of flour can vary by 20% depending on how it is measured — so metric recipes that give weights are more reliable.",
        "For oven dishes, the container matters too: a recipe written for a 9×13 inch baking dish needs the metric equivalent (about 23×33 cm), and a different dish size changes the depth of the food and therefore the cooking time. Convert the pan as well as the ingredients.",
      ],
    },
  ],

  "carbon-footprint-calculator": [
    {
      heading: "How is a carbon footprint calculated?",
      paragraphs: [
        "A carbon footprint is the total greenhouse gases caused by your activities, measured in tonnes of CO2 per year. This calculator adds up three sources: **electricity (0.42 kg CO2 per kWh), heating gas (5.3 kg CO2 per therm), and driving (0.21 kg CO2 per km)** — each multiplied by your usage and converted to tonnes.",
        "The three sources are shown separately because the fix is different for each. Electricity emissions depend on how your grid generates power; heating depends on your fuel and insulation; driving depends on distance and the car. Seeing the split tells you where a change actually moves the total.",
        "This is a household-energy estimate, not a complete footprint: it does not count food, shopping, air travel, or the goods and services you buy, which for most people add several more tonnes. Treat the result as a starting point for the energy side of your footprint, not the whole picture.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a household using **400 kWh of electricity a month, 30 therms of gas a month, and driving 18,000 km a year**. Electricity gives 400 × 12 × 0.42 = **2,016 kg (2.0 t)**, heating gives 30 × 12 × 5.3 = **1,908 kg (1.9 t)**, and driving gives 18,000 × 0.21 = **3,780 kg (3.8 t)**.",
        "The total is **7.7 tonnes of CO2 per year** — driving alone is nearly half of it. Cutting driving to 10,000 km a year would remove 8,000 × 0.21 = 1,680 kg, bringing the total down to **6.0 tonnes**. The global average is about 4.7 tonnes per person, so this household is above average before food and flights are even counted.",
      ],
    },
    {
      heading: "What cuts a carbon footprint fastest?",
      paragraphs: [
        "Start with the biggest slice in your own result. For the household above, driving is 3.8 of the 7.7 tonnes — so fewer kilometres, carpooling, or switching to an electric vehicle moves the total more than any change to lighting. For a household where heating dominates, insulation and a more efficient heating system matter most.",
        "Electricity is the easiest win in many places: switching to a renewable electricity tariff can cut the electricity slice to near zero without changing how much power you use. The calculator's factors are averages, so use the result to rank your options, then measure the real change after you act.",
      ],
    },
  ],

  "potential-energy-calculator": [
    {
      heading: "How is gravitational potential energy calculated?",
      paragraphs: [
        "Gravitational potential energy is the energy an object has because of its height above a reference point, calculated as **PE = m × g × h**, where m is the mass in kilograms, g is gravitational acceleration (9.81 m/s² on Earth), and h is the height in metres. The result is in joules.",
        "Potential energy is stored energy: it does not do anything until the object is allowed to fall. As it falls, the potential energy converts into kinetic energy — at the bottom, ignoring air resistance, all of the PE has become KE, which is why the same formula predicts how fast a dropped object will be moving.",
        "The height is always measured from a chosen reference level — usually the ground — and only the change in height matters. Lifting an object from the first floor to the second adds the same energy as lifting it from the ground to the first floor, because the height gained is the same.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **10 kg object held 5 metres above the ground** on Earth (g = 9.81 m/s²). Its potential energy is 10 × 9.81 × 5 = **490.50 joules**, or **0.4905 kJ**.",
        "Double the mass to 20 kg and the energy doubles to 981 J; double the height to 10 m instead and it also doubles to 981 J — the formula is linear in both. On the Moon, where g is 1.62 m/s², the same 10 kg object at 5 m has only 10 × 1.62 × 5 = **81 J** of potential energy.",
      ],
    },
    {
      heading: "Where does potential energy go when something falls?",
      paragraphs: [
        "It becomes kinetic energy. A 10 kg object dropped from 5 m reaches the ground with 490.50 J of kinetic energy, which is why the same mass hurts far more when dropped from a height than when it simply tips over on a table — the energy at impact grows directly with the height it fell from.",
        "That conversion is also how hydroelectric power works on a large scale: water stored behind a dam has enormous gravitational potential energy, and as it flows downhill through turbines, the energy becomes electricity. A cubic metre of water (1,000 kg) falling 100 m releases 1,000 × 9.81 × 100 = 981,000 J — nearly a megajoule from a single tonne of water.",
      ],
    },
  ],

  "bra-size-calculator": [
    {
      heading: "How is bra size calculated?",
      paragraphs: [
        "Your bra size has two parts: the band number, which comes from your underbust measurement, and the cup letter, which comes from the difference between your bust and band measurements. This calculator finds both from two measurements taken with a soft tape measure, and returns a US size.",
        "The band is your underbust measurement rounded to the nearest even number, because bands are sold in even sizes. The cup is set by the difference between your bust measurement and your band: a 1-inch difference is an A cup, 2 inches a B, 3 inches a C, 4 inches a D, and so on up to J.",
        "Sizing varies between brands, so treat the result as a starting point. If the calculated size feels off, try a sister size — the same cup volume on a different band, such as 34C, 32D, or 36B — and judge by the fit of the band and cups rather than the label alone.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Underbust 31 inches, bust 36 inches. The band rounds 31 up to the next even number, 32. The difference is 36 − 32 = 4 inches, which is a D cup, so the result is **32D**.",
        "If the same person measured a 35-inch bust instead, the difference would be 3 inches — a C cup — giving 32C. A single inch changes the cup, which is why measuring carefully matters more than the arithmetic.",
      ],
    },
    {
      heading: "How to measure for the best result",
      paragraphs: [
        "Measure the underbust snugly around your ribcage directly under your bust, with the tape level and firm but not tight. Then measure around the fullest part of your bust, keeping the tape level and not compressing the tissue. Standing upright and breathing normally gives the most repeatable numbers.",
        "Re-measure after any significant weight change, and whenever a familiar size starts to fit differently — band size in particular changes with weight. If the two measurements fall between sizes, round the underbust to the nearest even number first, then work out the cup from the rounded band, exactly as this calculator does.",
      ],
    },
  ],

  "conception-calculator": [
    {
      heading: "How is the conception date estimated?",
      paragraphs: [
        "This calculator estimates the date of conception from either the first day of your last menstrual period (LMP) or your due date. From the LMP it adds 14 days, the typical point of ovulation in a 28-day cycle; from the due date it subtracts 266 days, the average length of pregnancy counted from conception.",
        "It also shows a fertile window: the six days from five days before the estimated conception date through the conception date itself. That window reflects the fact that conception can follow intercourse in the days before ovulation, not only on the day of ovulation itself.",
        "The result is an estimate, not a precise date. Ovulation does not always happen on day 14, cycles vary in length, and only an early ultrasound can date a pregnancy more precisely. Use the estimate for planning and for discussion with a clinician, not as a medical determination.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "LMP **June 15, 2025**: adding 14 days gives an estimated conception date of **June 29, 2025**, with a fertile window of **June 24–29, 2025**.",
        "The same pregnancy dated from the other direction: a due date of **March 22, 2026** minus 266 days also gives June 29, 2025. The two routes agree because 280 days from LMP and 266 days from conception describe the same pregnancy — the 14-day gap is the time from LMP to ovulation.",
      ],
    },
    {
      heading: "When is the estimate less reliable?",
      paragraphs: [
        "The 14-day assumption fits a regular 28-day cycle. With longer cycles, ovulation usually comes later than day 14; with shorter cycles, earlier — so the estimated date shifts in the same direction. Irregular cycles, recent hormonal contraception, and breastfeeding all make the estimate less certain.",
        "In those cases a first-trimester ultrasound is the more reliable dating method, and it takes priority when it disagrees with the LMP-based estimate. If the dates matter for medical decisions, bring both the LMP date and the ultrasound result to your clinician rather than relying on either alone.",
      ],
    },
  ],

  "overweight-calculator": [
    {
      heading: "How do you know if you are overweight?",
      paragraphs: [
        "This calculator uses body mass index (BMI): your weight in kilograms divided by your height in metres squared. A BMI of **25–29.9** is classed as overweight, **30 and above** as obese, and **18.5–24.9** as the healthy range.",
        "It also shows your maximum healthy weight — the weight that would put your BMI at 24.9 for your height — and how far above it you are, if at all. That turns a category label into a concrete target.",
        "BMI is a screening measure, not a diagnosis. It cannot tell muscle from fat, so a muscular person can score as overweight while carrying little body fat, and it says nothing about where fat is stored. Use it alongside a waist measurement and how you feel, and talk to a clinician before starting a weight-loss plan.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A person weighing **90 kg** at **175 cm**: BMI = 90 ÷ (1.75 × 1.75) = 90 ÷ 3.0625 = **29.4** — overweight. The maximum healthy weight is 24.9 × 3.0625 = **76.3 kg**, so the weight to lose is 90 − 76.3 = **13.7 kg**.",
        "At 76 kg the same person would have a BMI of 24.8 — inside the healthy range. Small changes move the number: losing 5 kg, to 85 kg, gives a BMI of 27.8, still overweight but closer to the boundary.",
      ],
    },
    {
      heading: "What to do with the number",
      paragraphs: [
        "If your BMI is above the healthy range, the maximum healthy weight is a sensible first target — it is specific to your height and does not depend on an ideal body image. A gradual pace of about 0.5–1 kg a week is the generally advised rate for lasting loss.",
        "Track more than the scale: waist measurement, energy, sleep, and how your clothes fit all move with real changes in body composition, sometimes before the BMI does. And if your BMI is high mainly because of muscle, a body-fat measurement will tell you more than this calculator can.",
      ],
    },
  ],

  "resting-heart-rate-calculator": [
    {
      heading: "What does resting heart rate tell you?",
      paragraphs: [
        "Your resting heart rate (RHR) is the number of times your heart beats per minute while you are at rest, and it is a simple gauge of cardiovascular fitness: a stronger, more efficient heart pumps more blood per beat, so it needs fewer beats. This calculator compares your RHR with fitness norms for your sex and rates it from Athlete to Below Average.",
        "The bands differ for men and women. For men, under 50 bpm is rated Athlete, under 60 Excellent, under 70 Good, under 80 Average, and 80 or above Below Average. For women the cut-offs are 4 bpm higher: 54, 64, 74, and 84.",
        "The calculator also shows the usual normal range of 60–100 bpm. A value outside that range is not automatically a problem — trained athletes often sit below 60 — but a sudden change, or a consistently high resting rate, is worth mentioning to a clinician.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A man with a resting heart rate of **58 bpm**: 58 is below the 60 threshold but not below 50, so the rating is **Excellent**. The same 58 bpm for a woman is also Excellent, since it falls below her 64 threshold.",
        "At **72 bpm**, a man rates Average (72 is below 80, but not below 70) while a woman rates Good (72 is below 74). The 4 bpm difference between the two scales is why the same number can give a different rating.",
      ],
    },
    {
      heading: "How to measure it accurately",
      paragraphs: [
        "Measure first thing in the morning, before getting out of bed, and count your pulse for a full 60 seconds — a 15-second count multiplied by 4 is quicker but noisier. Two fingers on your wrist or the side of your neck, light pressure, and a still body give the cleanest reading.",
        "Caffeine, a late workout, stress, illness, and a poor night's sleep all raise the number, so one high reading means little. Measure for several mornings in a row and use the average; a falling trend over weeks of regular aerobic exercise is the sign that fitness is improving.",
      ],
    },
  ],

  "sleep-debt-calculator": [
    {
      heading: "How is sleep debt calculated?",
      paragraphs: [
        "Sleep debt is the running total of sleep you have missed: the gap between the hours you need each night and the hours you actually sleep, multiplied by the number of days. If you need 8 hours but sleep 6, you build up 2 hours of debt every night.",
        "This calculator also estimates recovery time, assuming you add about 2 extra hours of sleep per night until the debt is repaid. Recovery days are the total debt divided by 2, rounded up.",
        "The model is deliberately simple. Real recovery is not perfectly linear — short-term debt clears in days, while debt built over weeks or months takes longer to repay than the arithmetic suggests, and oversleeping at the weekend does not fully undo a week of short nights. Treat the figures as a planning guide, not a precise measure of how rested you are.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Need 8 hours, sleeping 6, for 7 days: the daily deficit is 2 hours, the total debt is **14 hours**, and recovery takes about **7 days** at 2 extra hours a night.",
        "A smaller gap adds up fast too: 7.5 hours needed against 7 hours slept is only 30 minutes a night, but over 30 days that is **15 hours** of debt — roughly two full nights of sleep — with a recovery estimate of 8 days.",
      ],
    },
    {
      heading: "How to pay sleep debt back",
      paragraphs: [
        "The steady way is a small, regular addition — an earlier bedtime of an hour or two, kept up for days — rather than one very long sleep. Short naps of 20–30 minutes can help in the afternoon, but long or late naps make the next night harder.",
        "Prevention beats repayment: a consistent sleep and wake time, even at weekends, keeps the debt from building in the first place. If you regularly need far more sleep than you get, or you feel exhausted despite enough hours in bed, that is a question for a clinician rather than a calculator.",
      ],
    },
  ],

  "waist-to-height-ratio-calculator": [
    {
      heading: "What is the waist-to-height ratio?",
      paragraphs: [
        "The waist-to-height ratio (WHtR) is your waist circumference divided by your height, both in the same units. It is a simple check for central fat — fat stored around the waist — which is more closely linked to health risk than total body weight alone.",
        "The rule of thumb is to keep your waist under half your height, a ratio below 0.5. This calculator rates the result in four bands: above 0.58 is High Risk, above 0.53 is Increased Risk, above 0.46 is Healthy, and 0.46 or below is Underweight Risk.",
        "It also shows a target waist: half your height in centimetres. Unlike BMI, the ratio needs no weight measurement and adjusts for height automatically, which is why many health researchers prefer it as a quick screening check.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Waist **85 cm**, height **175 cm**: WHtR = 85 ÷ 175 = **0.486** — Healthy. The target waist is 175 × 0.5 = 87.5 cm, shown as **88 cm**.",
        "At a **100 cm** waist the same height gives 100 ÷ 175 = **0.571** — Increased Risk, 12.5 cm above the 87.5 cm target. Losing 13 cm from the waist would bring the ratio to 0.497, just under the 0.5 line.",
      ],
    },
    {
      heading: "How to measure your waist",
      paragraphs: [
        "Stand relaxed and wrap a soft tape measure around your waist at navel level, level all the way round. Breathe out normally and read the measurement without pulling the tape tight or holding your stomach in.",
        "Measure at the same time of day and in the same conditions each time — morning, before eating, is the most repeatable. A single measurement is a snapshot; the trend over weeks is what tells you whether a change in diet or activity is working.",
      ],
    },
  ],

  "weekly-weight-loss-calculator": [
    {
      heading: "How much weight will a calorie deficit lose each week?",
      paragraphs: [
        "This calculator turns a daily calorie deficit into expected weight loss using the standard rule that a kilogram of body fat stores about 7,700 calories. Weekly loss is your daily deficit times 7, divided by 7,700.",
        "It also shows the monthly equivalent — weekly loss times 4.33, the average number of weeks in a month — and the weekly loss in pounds, using 2.205 lb per kilogram.",
        "The 7,700 rule is a useful planning estimate, not a law of nature. Real weight loss slows as your body adapts, and day-to-day weight moves with water, food, and glycogen. Expect the scale to zigzag around the trend the calculator shows, and judge progress over weeks, not days.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A **500-calorie** daily deficit: 500 × 7 ÷ 7,700 = **0.45 kg per week**, about **2.0 kg a month** and **1.0 lb a week**.",
        "A 750-calorie deficit gives 750 × 7 ÷ 7,700 = **0.68 kg a week**. Doubling the deficit to 1,000 calories gives 0.91 kg a week — but very large deficits are harder to sustain, and a deficit that big is best discussed with a clinician first.",
      ],
    },
    {
      heading: "What deficit should you choose?",
      paragraphs: [
        "A deficit of 500–750 calories a day is the usual recommendation for steady, sustainable loss: enough to see progress each week without the hunger and fatigue that make a plan hard to stick to. Smaller deficits work too — they just take longer.",
        "The deficit can come from food, activity, or both. Cutting 300 calories from food and adding 200 calories of walking reaches the same 500 total, and most people find a mix easier to maintain than diet alone.",
      ],
    },
  ],

  "weight-gain-calculator": [
    {
      heading: "How long does it take to gain weight?",
      paragraphs: [
        "This calculator estimates how many weeks it takes to reach a target weight from a daily calorie surplus, using the rule that a kilogram of body weight corresponds to about 7,700 calories. Weeks to goal equal the kilograms to gain times 7,700, divided by the surplus times 7.",
        "It also shows the expected weekly gain — surplus times 7 divided by 7,700 — so you can see whether the pace is realistic before committing to a plan.",
        "A modest surplus is the usual advice for gaining mostly muscle rather than fat: the calculator's guidance is 200–500 calories a day. Faster gains are possible with a bigger surplus, but more of the extra weight tends to be fat, and strength training decides how much of the gain is muscle.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "From **70 kg to 78 kg** with a **300-calorie** surplus: 8 kg to gain, so weeks = 8 × 7,700 ÷ (300 × 7) = 61,600 ÷ 2,100 = 29.3, shown as **29 weeks**, at **0.27 kg a week**.",
        "A 500-calorie surplus shortens the same goal to 8 × 7,700 ÷ 3,500 = 17.6, shown as **18 weeks**, at 0.45 kg a week. The trade-off is pace against composition: the faster route gains the same 8 kg, but with more of it likely to be fat.",
      ],
    },
    {
      heading: "Gaining weight the steady way",
      paragraphs: [
        "Weigh yourself once a week, in the same conditions, and compare the trend with the calculator's weekly figure. If the scale is flat after two or three weeks, the surplus is smaller than you think — portion sizes are easy to underestimate.",
        "Pair the surplus with progressive strength training and enough protein, and the gain skews toward muscle. Without training, extra calories mostly become fat, whatever the surplus size.",
      ],
    },
  ],

  "weight-loss-target-calculator": [
    {
      heading: "How long will it take to reach your target weight?",
      paragraphs: [
        "This calculator turns a weight-loss goal into a timeline: the kilograms to lose times 7,700 calories per kilogram, divided by your daily calorie deficit times 7, gives the weeks to your target. It also shows the target date and the expected weekly loss.",
        "The 7,700 figure is the energy stored in a kilogram of body fat, so the calculation is really an energy budget — how many days of deficit it takes to burn the fat you want to lose.",
        "Treat the date as a plan, not a promise. Weight loss slows as you get lighter, and the scale moves with water and food day to day. A steady 0.5–1 kg a week from a 500–1,000 calorie daily deficit is the generally advised pace.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "From **90 kg to 80 kg** with a **500-calorie** deficit: 10 kg to lose, so weeks = 10 × 7,700 ÷ (500 × 7) = 77,000 ÷ 3,500 = **22 weeks**, at **0.45 kg a week**.",
        "A 750-calorie deficit cuts the same goal to 77,000 ÷ 5,250 = 14.7, shown as **15 weeks**, at 0.68 kg a week. The calculator also converts the timeline into a target date counted from today, so the plan has a date attached, not just a number of weeks.",
      ],
    },
    {
      heading: "Keeping the plan on track",
      paragraphs: [
        "Weigh yourself weekly, in the same conditions, and compare the trend with the calculator's weekly figure rather than any single reading. A plateau of two or three weeks usually means the deficit has shrunk — as you get lighter, your body needs fewer calories, so the same diet becomes a smaller deficit.",
        "When that happens, the fix is a small adjustment — a little less food or a little more activity — not a crash diet. Re-run the calculator with your new current weight and the adjusted deficit to get a fresh target date.",
      ],
    },
  ],

  "hex-calculator": [
    {
      heading: "What does this hex calculator do?",
      paragraphs: [
        "This calculator converts decimal numbers to hexadecimal and adds them. Enter two decimal numbers and it shows each one in hex (base 16), their sum in hex, and their sum in decimal.",
        "Hexadecimal uses sixteen digits — 0–9 then A–F, where A is 10 and F is 15 — so each hex digit holds exactly four bits. That makes hex the standard shorthand for binary values in programming: colours like #FF0000, memory addresses, and MAC addresses are all written in hex.",
        "To convert by hand, divide the decimal number by 16 repeatedly and read the remainders backwards. 255 ÷ 16 = 15 remainder 15, and 15 ÷ 16 = 0 remainder 15, so 255 is 0xFF.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Enter **255** and **16**. The calculator shows **0xFF** and **0x10**, and their sum: 255 + 16 = **271**, which is **0x10F** in hex.",
        "Check the hex addition directly: in the units column F + 0 = F; in the sixteens column F + 1 = 16 in decimal, which writes 0 and carries 1 to the next column, giving 0x10F. The decimal check agrees: 0x10F = 1×256 + 0×16 + 15 = 271.",
      ],
    },
    {
      heading: "Where you will meet hex",
      paragraphs: [
        "Web colours are the most familiar use: #FF0000 is red, with FF (255) for the red channel and 00 for green and blue. The same two-digit-per-byte pattern appears in MAC addresses, IPv6 addresses, and memory dumps.",
        "Programmers also use hex for bit flags and file formats, because each hex digit maps cleanly to four bits — 0xF is 1111 in binary, 0x8 is 1000. Converting a few numbers by hand is the fastest way to build that intuition.",
      ],
    },
  ],

  "long-division-calculator": [
    {
      heading: "How does long division work?",
      paragraphs: [
        "Long division splits a number (the dividend) into equal groups of another number (the divisor). The answer has two parts: the quotient, how many whole groups fit, and the remainder, what is left over. This calculator also shows the exact decimal result.",
        "The relationship to remember is: dividend = divisor × quotient + remainder. That single check verifies any long division answer, with or without a calculator.",
        "Division by zero has no answer, and the calculator says so: entering 0 as the divisor shows an error instead of a result.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "1,000 ÷ 7: the quotient is **142** and the remainder is **6**, so the result is **142 R 6**, and the decimal is **142.857143**. Check: 7 × 142 + 6 = 994 + 6 = 1,000.",
        "The decimal never ends — 142.857142857… repeats the block 857142 — so the calculator shows it rounded to six decimal places. The remainder form, 142 R 6, is exact, which is why it is the form most school problems ask for.",
      ],
    },
    {
      heading: "When to use each form of the answer",
      paragraphs: [
        "Use the remainder form for sharing problems: 1,000 items split into boxes of 7 gives 142 full boxes with 6 left over. The remainder is a real quantity there, not a rounding artefact.",
        "Use the decimal form for measurements and money, where a fraction of a unit is meaningful — 1,000 ÷ 7 litres is about 142.86 litres per share. And when the division is exact, both forms agree: 1,000 ÷ 8 = 125 R 0 = 125 exactly.",
      ],
    },
  ],

  "matrix-calculator": [
    {
      heading: "What does this matrix calculator find?",
      paragraphs: [
        "This calculator works with a 2×2 matrix — four numbers in two rows and two columns — and finds its determinant, its trace, and whether it is invertible. Enter the four elements and the results appear immediately.",
        "The determinant is a single number that summarises the matrix: for a matrix with rows [a, b] and [c, d], it is a×d − b×c. If the determinant is not zero, the matrix has an inverse; if it is zero, the matrix is singular and cannot be inverted.",
        "The trace is simpler — the sum of the diagonal elements, a + d. Both numbers appear constantly in linear algebra: the determinant measures how the matrix scales area, and the trace appears in eigenvalues and in the characteristic equation.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Matrix [[3, 1], [2, 4]]: determinant = 3×4 − 1×2 = 12 − 2 = **10**, trace = 3 + 4 = **7**, and since the determinant is not zero the matrix is **invertible**.",
        "Change one number — [[3, 1], [6, 2]] — and the determinant becomes 3×2 − 1×6 = **0**, so the matrix is singular. The second row is exactly twice the first, which is why the determinant vanishes: the two rows carry the same information.",
      ],
    },
    {
      heading: "What the determinant tells you",
      paragraphs: [
        "Geometrically, the absolute value of the determinant is the area scaling factor of the transformation the matrix represents: a determinant of 10 stretches every area by a factor of 10, and a negative determinant also flips orientation, like a mirror image.",
        "In equation solving, a non-zero determinant means a system of two linear equations has exactly one solution. A zero determinant means the equations are either dependent (infinitely many solutions) or contradictory (none) — the matrix alone cannot tell you which, only that there is no unique answer.",
      ],
    },
  ],

  "midpoint-calculator": [
    {
      heading: "How do you find the midpoint of two points?",
      paragraphs: [
        "The midpoint of two points is the point exactly halfway between them: average the x-coordinates and average the y-coordinates. For points (x₁, y₁) and (x₂, y₂), the midpoint is ((x₁+x₂)/2, (y₁+y₂)/2).",
        "This calculator also shows the distance between the two points, from the distance formula: the square root of (x₂−x₁)² + (y₂−y₁)².",
        "Midpoints come up wherever a centre is needed — the centre of a line segment, the middle of a shape, or the point halfway along a path in graphics and mapping.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Points **(2, 3)** and **(8, 7)**: midpoint = ((2+8)/2, (3+7)/2) = **(5, 5)**. The distance is √(36 + 16) = √52 = **7.2111**.",
        "Check it on the number line: 5 is halfway between 2 and 8, and 5 is halfway between 3 and 7. The midpoint (5, 5) is the same distance from both points — half of 7.2111, or about 3.6056, from each.",
      ],
    },
    {
      heading: "Midpoints beyond two points",
      paragraphs: [
        "The same averaging idea extends: the centre of a triangle is the average of its three vertices, and the centre of any set of points is the average of their coordinates. That average point is the centroid, and it is the same calculation with more terms.",
        "In three dimensions, just average the z-coordinates too. The formula stays the same shape no matter how many dimensions you add — the midpoint is always the coordinate-wise average.",
      ],
    },
  ],

  "modulus-calculator": [
    {
      heading: "What is the modulus?",
      paragraphs: [
        "The modulus is the remainder after division: a mod b is what is left when a is divided by b as many whole times as possible. 17 mod 5 is 2, because 5 fits into 17 three times (15) with 2 left over.",
        "This calculator shows the remainder, the quotient, and a verification line: quotient × divisor + remainder = dividend. That identity is the quickest way to check any modulus result.",
        "For positive numbers the modulus and the remainder are the same thing. With negative numbers, different systems disagree: this calculator follows the JavaScript remainder, so −17 mod 5 gives −2, while the mathematical modulus (as in Python) gives 3. For everyday uses — clocks, wrapping, even/odd checks — the numbers are positive and the two agree.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "**17 mod 5**: quotient **3**, remainder **2**, and the verification reads 3 × 5 + 2 = 17.",
        "A second check: 100 mod 7 = **2**, because 7 × 14 = 98 and 100 − 98 = 2. And 20 mod 5 = **0**, which is how the modulus tests divisibility — a remainder of 0 means the division is exact.",
      ],
    },
    {
      heading: "Where modulus shows up",
      paragraphs: [
        "Clock arithmetic is modulus in disguise: 14 o'clock is 2 o'clock because 14 mod 12 = 2. The same wrapping applies to days of the week, angles, and any cycle that repeats.",
        "In programming, modulus tests even and odd (n mod 2), wraps an index around the end of a list, and spreads values evenly in hashing. Whenever something repeats or wraps, a modulus is usually doing the work.",
      ],
    },
  ],

  "number-sequence-calculator": [
    {
      heading: "What is a number sequence?",
      paragraphs: [
        "A number sequence is a list of numbers built by a rule. In an arithmetic sequence you add the same difference each time; in a geometric sequence you multiply by the same ratio each time. This calculator generates up to 20 terms of either kind, plus their sum.",
        "The nth term of an arithmetic sequence is a₁ + (n−1)d, where a₁ is the first term and d the common difference. For a geometric sequence it is a₁ × r^(n−1), where r is the common ratio.",
        "Sequences describe steady growth: arithmetic for adding the same amount each step, like saving a fixed sum monthly; geometric for multiplying, like compound interest or population growth.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Arithmetic, first term 2, difference 3, 8 terms: **2, 5, 8, 11, 14, 17, 20, 23**. The sum is **100** and the last term is **23** — check it with the formula: a₈ = 2 + 7×3 = 23.",
        "Geometric, first term 2, ratio 3, 5 terms: **2, 6, 18, 54, 162**, summing to **242**. The terms grow fast: the fifth term alone, 162, is more than double the sum of the first four (80).",
      ],
    },
    {
      heading: "How to spot which pattern a sequence follows",
      paragraphs: [
        "Subtract consecutive terms: if the differences are constant, the sequence is arithmetic. Divide consecutive terms: if the ratios are constant, it is geometric. A sequence can be neither — 1, 1, 2, 3, 5, 8 is the Fibonacci pattern, where each term is the sum of the two before it.",
        "Once you know the type and the first term, the whole sequence is determined — which is why this calculator only needs three inputs to generate all twenty terms.",
      ],
    },
  ],

  "p-value-calculator": [
    {
      heading: "What is a p-value?",
      paragraphs: [
        "A p-value is the probability of seeing a test result at least as extreme as yours if the null hypothesis — usually 'no effect' or 'no difference' — were true. A small p-value means the result would be surprising under the null, which is evidence against it. This calculator finds the p-value for a z-score, using the standard normal distribution.",
        "The usual significance cut-off is 0.05: below it, a result is called statistically significant. This calculator also checks the stricter 0.01 level. It offers one-tailed and two-tailed tests — two-tailed doubles the one-tailed p-value, because it counts extremes in both directions.",
        "A p-value is not the probability that the null hypothesis is true, and it says nothing about the size or importance of an effect. A tiny p-value from a huge sample can describe a trivial difference, and a non-significant result is not proof of no effect.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A z-score of **1.96**, two-tailed: p = **0.049996**, just below 0.05, so the result is significant at the 5% level but not at 1%. The same z-score one-tailed gives p = **0.024998** — half the two-tailed value, as expected.",
        "A z-score of **2.58**, two-tailed, gives p = **0.009880** — significant at both 0.05 and 0.01. A small z-score of 0.5 gives p = **0.617075**, far from significant: a result that far from the mean happens most of the time by chance.",
      ],
    },
    {
      heading: "One-tailed or two-tailed — which should you choose?",
      paragraphs: [
        "Choose two-tailed when you are testing for any difference, in either direction — it is the default in most research and the safer choice when you are unsure. Choose one-tailed only when the hypothesis specifies a direction in advance, such as 'the new drug lowers blood pressure'.",
        "The choice must be made before you see the data. Switching to one-tailed after seeing a two-tailed p-value of 0.08, just to get under 0.05, is not valid — it doubles your chance of a false positive.",
      ],
    },
  ],

  "percent-error-calculator": [
    {
      heading: "How is percent error calculated?",
      paragraphs: [
        "Percent error measures how far a measured value is from the accepted value, as a percentage of the accepted value: |experimental − theoretical| ÷ |theoretical| × 100. The absolute values keep the result positive — percent error is a size of error, not a direction.",
        "The calculator also shows the absolute error (the raw difference, in the original units) and the relative error (the same difference as a fraction of the theoretical value, before multiplying by 100).",
        "What counts as acceptable depends on the field: under 5% is usually good in school chemistry, while precise physics experiments aim for under 1%. The theoretical value cannot be zero — the calculator shows an error in that case, because the formula would divide by zero.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Experimental **9.8** against a theoretical **10.0**: absolute error 0.2, relative error 0.02, percent error **2.0000%**.",
        "A larger miss shows the scale: measuring 9.0 against 10.0 gives a **10%** error, five times larger. And the direction does not matter — measuring 10.2 also gives 2%, because the formula takes the absolute difference.",
      ],
    },
    {
      heading: "Percent error vs percent difference",
      paragraphs: [
        "Percent error needs a known true value to compare against. When neither value is the 'true' one — two measurements of the same thing, say — percent difference is the right tool: it divides by the average of the two values instead of one theoretical value.",
        "That makes percent difference symmetric: swapping the two values gives the same answer, while percent error changes if you swap the experimental and theoretical values. Use percent error for experiments against a known standard, and percent difference for comparing two measurements.",
      ],
    },
  ],

  "reading-time-calculator": [
    {
      heading: "How long will a text take to read?",
      paragraphs: [
        "Reading time is simply word count divided by reading speed: a 5,000-word article at 250 words per minute takes 20 minutes. This calculator also converts the word count into pages, at 250 words per page.",
        "Average adult reading speed is roughly 200–300 words per minute for general reading, and slower — 100–150 words per minute — for technical or unfamiliar material. The default speed here is 250 words per minute.",
        "The estimate assumes steady reading. Dense arguments, unfamiliar vocabulary, and note-taking all slow you down, so treat the result as a lower bound for study material and a fair estimate for light reading.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "**1,000 words** at **240 words per minute**: 1,000 ÷ 240 = 4.17 minutes, shown as **4 min 10 sec**, and 1,000 ÷ 250 = **4.0 pages**.",
        "A longer text shows the scaling: 5,000 words at 250 wpm takes exactly 20 minutes and fills 20.0 pages. Halving the speed to 125 wpm doubles the time to 40 minutes — reading time is inversely proportional to speed.",
      ],
    },
    {
      heading: "Using reading time to plan study",
      paragraphs: [
        "Count the words in a chapter or article — most word processors show the count — and you can plan a study session in minutes rather than pages. Three 2,000-word sections at 200 wpm is 30 minutes of reading, before any note-taking.",
        "For exam preparation, use a slower speed than your comfortable rate: reading to remember is slower than reading to skim, and the time the calculator gives is for one pass only.",
      ],
    },
  ],

  "right-triangle-calculator": [
    {
      heading: "How do you solve a right triangle?",
      paragraphs: [
        "A right triangle has one 90° angle, and its sides obey the Pythagorean theorem: a² + b² = c², where c is the hypotenuse, the side opposite the right angle. Enter the two legs and this calculator finds the hypotenuse, both acute angles, the area, and the perimeter.",
        "The angles come from the arctangent: angle A is arctan(b/a), and angle B is 90° minus angle A, since the three angles of any triangle add to 180°. The area is half the product of the legs, ½ × a × b.",
        "Note that this calculator takes the two legs as its inputs. If you know the hypotenuse and one leg instead, find the missing leg first with a² = c² − b², then enter both legs here.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Legs **3** and **4**: hypotenuse √(9 + 16) = √25 = **5**, angles **53.13°** and **36.87°**, area ½ × 3 × 4 = **6**, perimeter 3 + 4 + 5 = **12**.",
        "Check the angles: 53.13 + 36.87 + 90 = 180°, as required. The 3-4-5 triangle is the smallest Pythagorean triple — whole-number sides that satisfy the theorem exactly — and it is the classic check that a calculation is working.",
      ],
    },
    {
      heading: "Where right triangles appear",
      paragraphs: [
        "Builders use the 3-4-5 rule to square a corner: mark 3 units along one edge and 4 along the other, and the diagonal must measure 5 if the corner is square. The same geometry sizes roof pitches, ramps, and staircases.",
        "Navigation and surveying reduce to right triangles too: a distance and a bearing give a right triangle whose legs are the east-west and north-south offsets. Any problem with a right angle and two known values is a problem this calculator can solve.",
      ],
    },
  ],

  "rounding-calculator": [
    {
      heading: "How does rounding work?",
      paragraphs: [
        "Rounding replaces a number with a nearby value that has fewer digits. The standard rule is simple: look at the first digit being dropped — if it is 5 or more, round the last kept digit up; if it is 4 or less, leave it. This calculator rounds to any number of decimal places from 0 to 10.",
        "It also shows the floor (always rounded down), the ceiling (always rounded up), and the nearest integer, so you can compare all four ways of simplifying the same number at a glance.",
        "This is standard rounding, not banker's rounding: a trailing 5 always rounds up, so 2.5 becomes 3. Banker's rounding would send 2.5 to 2, the nearest even number, to avoid bias over many roundings.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "**3.14159** to 2 decimal places: the third decimal is 1, so the result is **3.14**. The floor is 3.14, the ceiling is 3.15, and the nearest integer is 3.",
        "A case where the digit matters: 3.146 to 2 places is **3.15**, because the third decimal is 6. And 2.5 to 0 places is **3** — the .5 rounds up under the standard rule this calculator uses.",
      ],
    },
    {
      heading: "Rounding in real life",
      paragraphs: [
        "Money is rounded to 2 decimal places, measurements to the precision of the instrument that took them — reporting a length to six decimals from a ruler marked in millimetres is false precision, not accuracy.",
        "One rule matters everywhere: do the rounding last. Rounding intermediate steps and then calculating from the rounded values compounds the error, sometimes enough to change the final answer.",
      ],
    },
  ],

  "sample-size-calculator": [
    {
      heading: "How many survey responses do you need?",
      paragraphs: [
        "The sample size for a survey depends on three things: the confidence level, the margin of error, and the population size. This calculator uses Cochran's formula with the most conservative assumption — a 50/50 split (p = 0.5) — which gives the largest sample size and keeps the results reliable whatever the true proportion turns out to be.",
        "It starts with the infinite-population size, n₀ = z²p(1−p)/e², where z is 1.645 for 90%, 1.96 for 95%, or 2.576 for 99% confidence, then applies the finite population correction, n = n₀ ÷ (1 + (n₀−1)/N), which shrinks the sample when the population is small.",
        "It also suggests how many surveys to send, assuming an 80% response rate: divide the required sample by 0.8. If you expect a lower response rate, send proportionally more.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "95% confidence, 5% margin, population 10,000: n₀ = 1.96² × 0.25 ÷ 0.05² = **384.16**, so **385** for an infinite population; with the correction, n = 384.16 ÷ (1 + 383.16/10,000) ≈ 369.98, rounded up to **370**. At an 80% response rate, send **463** surveys.",
        "Dropping to 90% confidence shrinks the infinite-population sample to **271**, because z falls to 1.645. And halving the margin of error to 2.5% quadruples the infinite-population figure to 1,537 — precision is expensive.",
      ],
    },
    {
      heading: "What the numbers assume",
      paragraphs: [
        "The formula assumes random sampling: every member of the population has an equal chance of responding. A self-selected online poll does not meet that assumption, and no sample size fixes a biased sample.",
        "It also assumes the worst case, p = 0.5. If you already know the proportion you are measuring is far from 50% — say 10% — a smaller sample would do, but this calculator keeps the conservative figure so the result stays reliable either way.",
      ],
    },
  ],

  "semester-grade-calculator": [
    {
      heading: "How is a semester grade calculated?",
      paragraphs: [
        "A semester grade is a weighted average: each component score is multiplied by its weight, the products are added, and the total is divided by the sum of the weights. This calculator combines assignments, midterm, and final exam scores, then converts the percentage to a letter grade.",
        "The weights do not have to add up to 100 — the calculator divides by the actual total weight, so any consistent set of weights works. The letter scale runs from A at 93% down to F below 60%, with plus and minus steps in between.",
        "Use it before the final to see what score you need: try different final-exam scores and watch the letter grade move.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Assignments **88%** (weight 30), midterm **76%** (weight 30), final **91%** (weight 40): (88×30 + 76×30 + 91×40) ÷ 100 = (2,640 + 2,280 + 3,640) ÷ 100 = **85.60%**, a **B**.",
        "The final carries the most weight here: raising the final from 91 to 100 would lift the grade to 89.20%, a B+. And a 10-point drop on the final, to 81, would cost 4 points overall, giving 81.60% — a B−.",
      ],
    },
    {
      heading: "Planning for the final exam",
      paragraphs: [
        "Work backwards from the grade you want. To find the final score that earns a target percentage, rearrange the formula: needed final = (target × total weight − assignments × their weight − midterm × its weight) ÷ final weight.",
        "If the required score is above 100, the target is out of reach this semester — that is useful information too, because it tells you to aim for the next grade down rather than chasing an impossible number.",
      ],
    },
  ],

  "variance-calculator": [
    {
      heading: "What is variance?",
      paragraphs: [
        "Variance measures how spread out a set of numbers is: the average of the squared differences from the mean. A small variance means the numbers cluster near the mean; a large one means they are widely scattered. This calculator takes five values and reports both population and sample variance, plus the mean and the population standard deviation.",
        "Population variance divides the sum of squared differences by N, the number of values, and is used when the data is the entire group. Sample variance divides by n−1 instead, which corrects the slight underestimation that comes from using a sample to estimate a population — and is why the sample figure is always a little larger.",
        "Variance is in squared units, which makes it hard to interpret directly. Its square root, the standard deviation, is in the original units — this calculator shows the population standard deviation for that reason.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Values **4, 8, 6, 5, 3**: the mean is **5.2**. Squared differences from the mean: 1.44, 7.84, 0.64, 0.04, 4.84, summing to 14.8. Population variance = 14.8 ÷ 5 = **2.96**; sample variance = 14.8 ÷ 4 = **3.70**; population standard deviation = √2.96 = **1.7205**.",
        "The spread is driven by the extremes: the 8 alone contributes 7.84, more than half the total. If all five values were 5.2, every difference would be zero and the variance would be 0 — no spread at all.",
      ],
    },
    {
      heading: "When to use population vs sample variance",
      paragraphs: [
        "Use population variance when your five values are the whole group you care about — the test scores of an entire class, for example. Use sample variance when they are a sample drawn from a larger group you want to describe.",
        "Most statistical work uses sample variance, because most data is a sample. The n−1 divisor is called Bessel's correction, and the gap between the two figures shrinks as the data set grows — with five values it is the difference between dividing by 5 and by 4.",
      ],
    },
  ],

  "weighted-grade-calculator": [
    {
      heading: "How is a weighted grade calculated?",
      paragraphs: [
        "A weighted grade is an average where each component counts according to its weight: multiply each grade by its weight, add the products, and divide by the total weight. This calculator takes three grade-and-weight pairs and returns the weighted average as a percentage.",
        "The weights do not need to add up to 100 — the calculator divides by whatever the weights total, so weights of 2, 3, and 5 work exactly like 20, 30, and 50. What matters is the ratio between them.",
        "If the total weight is zero, the calculator returns 0% — a grade needs at least one weighted component to mean anything.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Grades **90** (weight 20), **80** (weight 30), **95** (weight 50): (90×20 + 80×30 + 95×50) ÷ 100 = (1,800 + 2,400 + 4,750) ÷ 100 = **89.50%**.",
        "Compare the plain average: (90 + 80 + 95) ÷ 3 = 88.33%. The weighted result is higher because the best grade, 95, carries half the weight. The same three grades with equal weights of 1, 1, 1 would give exactly the plain average, 88.33%.",
      ],
    },
    {
      heading: "Weights, points, and percentages",
      paragraphs: [
        "A syllabus may give weights as percentages (20%, 30%, 50%), as points (200, 300, 500), or as counts of assignments — all three work here, because the calculator normalises by the total. Enter the numbers as they appear in the syllabus.",
        "One common mistake is entering a grade as a fraction (0.9) instead of a percentage (90). The calculator expects percentages, so a 0.9 would be read as 0.9%, not 90% — and the average would collapse accordingly.",
      ],
    },
  ],

  "z-score-calculator": [
    {
      heading: "What is a z-score?",
      paragraphs: [
        "A z-score (standard score) tells you how many standard deviations a value sits from the mean: z = (x − μ) ÷ σ. A z-score of 2 means the value is two standard deviations above the mean; a negative z-score means it is below the mean.",
        "This calculator also converts the z-score into a percentile — the percentage of values in a normal distribution that fall below yours — using the standard normal curve. A z-score of 0 is the 50th percentile by definition.",
        "Z-scores let you compare values from different distributions on the same scale: a test score and a height, for example, can both be expressed as 'how many standard deviations above average'.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A value of **130** with mean 100 and standard deviation 15: z = (130 − 100) ÷ 15 = **2.00**, above the mean, at the **97.72nd percentile** — higher than about 97.72% of values.",
        "The same distance below the mean, a value of 70, gives z = **−2.00** and the **2.28th percentile**. The two percentiles sum to 100, as they must: 97.72 + 2.28 = 100.",
      ],
    },
    {
      heading: "The 68-95-99.7 rule",
      paragraphs: [
        "For a normal distribution, about 68% of values fall within one standard deviation of the mean (z between −1 and 1), about 95% within two, and about 99.7% within three. That is why a z-score of 2 is already unusual, and a z-score of 3 is rare.",
        "The rule is a quick sanity check: if a data set claims to be normal but a third of its values sit beyond z = ±1, something is off — either the distribution is not normal, or the mean and standard deviation are wrong.",
      ],
    },
  ],

  "cycling-speed-calculator": [
    {
      heading: "How is cycling speed calculated?",
      paragraphs: [
        "Average cycling speed is simply **distance divided by time**: ride 20 miles in 1 hour and 15 minutes and your average speed is 16 mph. This calculator takes the distance in miles and the ride time in hours and minutes, then reports your average speed in mph and km/h, plus your pace in minutes per mile.",
        "The km/h figure is the mph speed multiplied by 1.609, and pace is 60 divided by the mph speed — so a 16 mph ride is a 3.8-minute mile. Because the calculation uses total elapsed time, any stops along the way count against your average, just as they would on a bike computer that is left running.",
        "Average speed is the most useful single number for comparing rides, but it hides the detail: a hilly 16 mph ride is a much harder effort than a flat 16 mph ride. Use the pace figure when you want to plan how long a route will take — multiply the minutes-per-mile pace by the distance.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **20-mile ride completed in 1 hour 15 minutes**. The total time is 1 + 15/60 = **1.25 hours**, so the average speed is 20 ÷ 1.25 = **16.0 mph**. In metric that is 16.0 × 1.609 = **25.7 km/h**, and the pace is 60 ÷ 16.0 = **3.8 minutes per mile**.",
        "If the same 20 miles took 1 hour 40 minutes instead, the time would be 1.667 hours and the speed would fall to 20 ÷ 1.667 = **12.0 mph** — a reminder that a small change in time makes a big difference to the average over a short ride.",
      ],
    },
    {
      heading: "What is a good cycling speed?",
      paragraphs: [
        "The calculator's own guidance puts **casual riding at 10–14 mph** and **racing at 25 mph and above**. Most recreational riders on flat ground sit somewhere in the mid-teens, and anything above 20 mph for a sustained ride is a strong effort for a non-racer.",
        "Compare like with like: wind, hills, road surface, and bike type all move the number. A 14 mph average into a headwind on a heavy bike can be a harder ride than 18 mph with a tailwind on a road bike. Track your speed on the same route over time — that is where the trend means something.",
        "Note that this calculator reports speed and pace only; it does not estimate calories burned. If you want a calorie figure, a bike computer or fitness app that knows your weight and the route profile will give a much better estimate than distance alone.",
      ],
    },
  ],

  "day-of-week-calculator": [
    {
      heading: "How do you find the day of the week for a date?",
      paragraphs: [
        "Enter the year, month, and day, and the calculator works out which day of the week that date falls on — Sunday through Saturday — using the standard Gregorian calendar. It also tells you whether the year is a leap year.",
        "A year is a leap year if it is divisible by 4, **except** century years, which must be divisible by 400. So 2024 and 2000 were leap years, but 1900 was not. Leap years matter here because the extra day shifts every date after February forward by one weekday.",
        "The calculator accepts any year you type, past or future. Enter the date as numbers — month 1–12, day 1–31 — and it returns the weekday, the formatted date, and the leap-year answer in one go.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Enter **1 January 2000**: the calculator returns **Saturday**, and the year is a leap year (2000 ÷ 400 = 5 exactly, so it passes the century rule). Enter **20 July 1969**, the day of the first Moon landing, and it returns **Sunday**.",
        "The leap-year rule is easy to check by hand for recent years: 2024 ÷ 4 = 506 with no remainder, so 2024 was a leap year; 2025 ÷ 4 leaves a remainder, so it was not.",
      ],
    },
    {
      heading: "What is the day-of-week calculator useful for?",
      paragraphs: [
        "The most common use is curiosity — finding the weekday you were born on, or the day a historical event happened. It is also handy for planning: checking which weekday an anniversary, holiday, or deadline falls on in a future year before you book anything.",
        "One thing to watch: the calculator does not reject impossible dates. Enter 30 February and it rolls forward to 2 March (or 1 March in a leap year) instead of showing an error, so double-check the formatted date in the results before trusting the weekday.",
        "Very old dates use modern Gregorian calendar rules, which were only adopted in 1582 — dates before that may not match the Julian calendar that was actually in use at the time.",
      ],
    },
  ],

  "dew-point-calculator": [
    {
      heading: "What is dew point, and how is it calculated?",
      paragraphs: [
        "The dew point is the temperature at which air becomes saturated with moisture, so water starts to condense — it is the temperature at which dew forms. This calculator works it out from the air temperature in °C and the relative humidity using the **Magnus formula**.",
        "The formula first computes an intermediate value, α = 17.27 × T ÷ (237.7 + T) + ln(RH ÷ 100), where T is the air temperature and RH is the relative humidity as a percentage. The dew point is then Td = 237.7 × α ÷ (17.27 − α). The calculator also converts the result to °F and labels the comfort level.",
        "Dew point is a better guide to how humid the air feels than relative humidity, because it measures the actual amount of moisture in the air. Relative humidity changes as the temperature changes through the day; the dew point stays roughly steady unless the air mass itself changes.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take air at **25°C with 60% relative humidity**. First, α = 17.27 × 25 ÷ (237.7 + 25) + ln(0.60) = 1.6434 − 0.5108 = **1.1326**. Then the dew point is 237.7 × 1.1326 ÷ (17.27 − 1.1326) = **16.7°C**, which is **62.0°F**.",
        "The calculator rates that **Somewhat Humid**: its bands are Dry at 10°C and below, Comfortable from 10–16°C, Somewhat Humid from 16–20°C, Very Humid from 20–24°C, and Extremely Humid above 24°C.",
      ],
    },
    {
      heading: "What dew point feels comfortable?",
      paragraphs: [
        "Below 10°C the air feels dry, and 10–16°C is generally comfortable — the range most people find pleasant. Once the dew point passes 16°C the air starts to feel sticky, and above 20°C most people find it oppressive, because sweat evaporates slowly and the body struggles to cool down.",
        "If the dew point equals the air temperature, the relative humidity is 100% and condensation is happening — fog, dew, or rain. A large gap between the temperature and the dew point means dry air and clear skies; a small gap means humid, muggy conditions.",
        "Gardeners and builders use the dew point too: it predicts when condensation will form on surfaces, which matters for painting, varnishing, and preventing mould. Paint applied when surfaces are near the dew point can fail to dry properly.",
      ],
    },
  ],

  "dice-roller": [
    {
      heading: "How does the dice roller work?",
      paragraphs: [
        "The dice roller picks a random number between 1 and the number of sides for each die you roll, then adds them up. You choose how many dice (1–20) and how many sides each die has (2–100), and it shows the total, the individual rolls, the average roll, and the highest total possible.",
        "Every die is an independent random pick, so each face is equally likely on every roll. Click Calculate again to re-roll — the results change every time, and past rolls have no effect on future ones.",
        "The roller covers all the standard tabletop dice — d4, d6, d8, d10, d12, and d20 — plus any custom size up to 100 sides, which makes it useful for board games, role-playing games, and classroom probability experiments alike.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Roll **2 six-sided dice**. One possible result is a 4 and a 6: the total is **10**, the average roll is **5.0**, and the maximum possible total is 2 × 6 = **12**. Re-roll and you might get a 2 and a 3 for a total of 5 — both outcomes are equally the result of the same random process.",
        "Over many rolls the averages settle down: a single six-sided die averages **3.5** (the faces 1–6 add to 21, divided by 6), so two dice average **7**. Seven is also the single most likely total, with 6 of the 36 possible combinations — 1+6, 2+5, 3+4, 4+3, 5+2, and 6+1 — giving a probability of 6 ÷ 36, or about **16.7%**.",
      ],
    },
    {
      heading: "Is the dice roller fair?",
      paragraphs: [
        "For games, yes. The roller uses JavaScript's Math.random(), which produces pseudo-random numbers — evenly distributed and unpredictable enough for board games, RPGs, and teaching. It is not a cryptographic random generator, so it is not suitable for lotteries, gambling, or security uses.",
        "Because the dice are independent, there is no such thing as a die being 'due' a good roll. A run of low numbers does not make a high number more likely next time — each roll starts fresh, which is exactly how physical dice behave.",
        "One practical note: the roller caps the roll at 20 dice even if you enter a larger number, but the 'Max Possible' figure still uses the number you typed. Keep the number of dice at 20 or below and the two figures will agree.",
      ],
    },
  ],

  "electricity-calculator": [
    {
      heading: "How is electricity cost calculated?",
      paragraphs: [
        "Electricity cost is calculated from energy use: **kilowatt-hours (kWh) = watts × hours ÷ 1,000**, and **cost = kWh × your rate per kWh**. This calculator takes an appliance's wattage, how many hours a day it runs, and your electricity rate, then shows the daily, monthly, and annual cost.",
        "The monthly figure is the daily cost multiplied by 30, and the annual figure is the daily cost multiplied by 365. That is a small inconsistency worth knowing about: twelve 30-day months are 360 days, not 365, so the monthly figure times 12 comes out slightly lower than the annual figure.",
        "A kilowatt-hour is the energy a 1,000-watt appliance uses in one hour — a 100-watt bulb running for 10 hours uses exactly 1 kWh. Your electricity bill charges per kWh, which is why the rate is quoted in dollars per kWh.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **1,500-watt space heater running 6 hours a day** at a rate of **$0.17 per kWh**. Daily energy use is 1,500 × 6 ÷ 1,000 = **9.0 kWh**, costing 9.0 × $0.17 = **$1.53 a day**.",
        "The monthly cost is $1.53 × 30 = **$45.90**, and the annual cost is $1.53 × 365 = **$558.45**. Twelve months at $45.90 would be $550.80 — the $7.65 gap is the 30-day month versus 365-day year difference described above.",
      ],
    },
    {
      heading: "How can you lower an appliance's electricity cost?",
      paragraphs: [
        "Only three things move the number: **watts, hours, and rate**. A lower-wattage appliance, fewer hours of use, or a cheaper tariff are the only levers — everything else is detail. The biggest wins usually come from high-wattage appliances that run for hours: heaters, air conditioners, water heaters, and older fridges.",
        "Find an appliance's wattage on its label or in its manual — a typical LED bulb is about 10W, a laptop about 50W, and an air conditioner 1,000–3,500W. If the label gives amps instead of watts, multiply amps by volts (120V in the US) to get watts.",
        "Use the calculator to compare before you buy: a 1,500W heater and a 750W heater cost exactly half as much to run for the same hours, and a device left on standby still draws power. Small wattages add up when they run all day, every day.",
      ],
    },
  ],

  "fence-calculator": [
    {
      heading: "How is fence material calculated?",
      paragraphs: [
        "Fence material is calculated from the length of the fence run: **posts = length ÷ post spacing + 1** (rounded up), **rails = sections × 3**, and **pickets = length ÷ 0.5**, assuming 6-inch-wide pickets. Post depth is one-third of the fence height.",
        "The '+1' in the post count is the end post: a fence with 13 sections needs 14 posts, one at each end plus one between every pair of sections. Rails are counted as three per 8-foot section, and pickets at two per foot of fence length.",
        "Enter the total fence length, the height, and the spacing between posts, and the calculator returns the post, rail, and picket counts plus the recommended post depth — the four numbers you need for a materials list.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **100-foot fence, 6 feet high, with posts 8 feet apart**. Posts = 100 ÷ 8 rounded up (13) + 1 = **14 posts**. Rails = 13 sections × 3 = **39 rails**. Pickets = 100 ÷ 0.5 = **200 pickets**. Post depth = 6 ÷ 3 = **2 feet**.",
        "So the shopping list is 14 posts (8 feet long, to allow 2 feet underground and 6 feet above), 39 eight-foot rails, and 200 pickets — before adding gates, concrete, and hardware, which the calculator does not cover.",
      ],
    },
    {
      heading: "What should you check before buying fence materials?",
      paragraphs: [
        "Buy a few extra pickets and at least one spare post: boards split, posts arrive warped, and cuts go wrong. The calculator gives exact counts for a straight run, so corners, slopes, and gates all need adjusting by hand.",
        "Two assumptions are built into this calculator: rails are counted as three per 8-foot section whatever the fence height or post spacing, and pickets assume 6-inch boards with no gap. If you are building a shorter fence with two rails per section, or pickets with gaps between them, adjust the rail and picket counts yourself.",
        "Check local rules before you dig: many areas limit fence height (often 6 feet in back gardens, lower in front), require the finished side to face outwards, and need you to call before digging to mark buried utilities.",
      ],
    },
  ],

  "flooring-calculator": [
    {
      heading: "How much flooring do I need?",
      paragraphs: [
        "Flooring is calculated from the room area plus a waste allowance: **total = length × width × (1 + waste%)**. This calculator takes the room's length and width in feet and a waste percentage, then shows the square footage to buy and the number of boxes, assuming 20 sq ft per box.",
        "The waste allowance covers cuts, damaged boards, and the odd mistake — it is not optional padding. A rectangular room with straight cuts wastes less than a room with angles, doorways, and a diagonal layout.",
        "Boxes are rounded up, because you cannot buy part of a box. The room area is shown separately so you can see exactly how much of the total is waste.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **15 × 12 foot room with a 10% waste allowance**. The room area is 15 × 12 = **180 sq ft**. Adding 10% waste gives 180 × 1.10 = **198 sq ft** to buy.",
        "At 20 sq ft per box, 198 ÷ 20 = 9.9 boxes, rounded up to **10 boxes** — 200 sq ft in total, leaving 2 sq ft spare for future repairs.",
      ],
    },
    {
      heading: "How much waste should you allow for flooring?",
      paragraphs: [
        "The calculator's guidance is **10% for a straight layout and 15% for a diagonal layout**. Diagonal boards need more cuts at the walls, so more material ends up as offcuts. Rooms with many doorways, closets, or angled walls deserve the higher figure too.",
        "Check the box size on your actual product: the calculator assumes 20 sq ft per box, but coverage varies by brand and plank size. Divide your total square footage by the real coverage to get the true box count.",
        "Keep the leftover boards after installation. A matching spare box is far more useful than a refund — flooring lines get discontinued, and a damaged board years later is much easier to fix if you have the exact product on hand.",
      ],
    },
  ],

  "gdp-calculator": [
    {
      heading: "How is GDP calculated?",
      paragraphs: [
        "GDP — Gross Domestic Product — is calculated with the **expenditure approach**: **GDP = C + I + G + (X − M)**, where C is consumption, I is investment, G is government spending, and (X − M) is net exports. Add up what everyone in the country spends and you get the total value of everything produced.",
        "This calculator takes the five components in billions and returns total GDP, net exports, and consumption as a percentage of GDP. All five inputs must be in the same units — the results are labelled in billions to match.",
        "Consumption is usually the largest component in developed economies, often around two-thirds of GDP. Investment covers business spending on equipment and buildings plus new housing; government spending covers public services and infrastructure, but not transfer payments like pensions.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Use the calculator's default values: consumption **$14,000B**, investment **$3,500B**, government spending **$3,200B**, exports **$2,500B**, and imports **$3,100B**. Net exports are 2,500 − 3,100 = **−$600B** — negative, because imports exceed exports.",
        "GDP is then 14,000 + 3,500 + 3,200 − 600 = **$20,100B**. Consumption as a share of GDP is 14,000 ÷ 20,100 × 100 = **69.7%**.",
      ],
    },
    {
      heading: "What does GDP not tell you?",
      paragraphs: [
        "GDP measures the size of an economy, not how well off its people are. It says nothing about how income is distributed, what the money buys, or what is left out — unpaid housework, volunteering, and the informal economy are all invisible to it.",
        "This calculator gives **nominal GDP** — the raw total at current prices. Comparing GDP across years needs a real (inflation-adjusted) figure, and comparing across countries needs a per-person figure and a common currency. A country with twice the GDP is not necessarily twice as wealthy per person.",
        "Net exports are the component most often misunderstood: a negative figure is a trade deficit, and it subtracts from GDP arithmetically — but a deficit on its own is not a verdict on an economy's health, since imports include the machinery and materials that domestic production depends on.",
      ],
    },
  ],

  "golf-handicap-calculator": [
    {
      heading: "How is a golf handicap calculated?",
      paragraphs: [
        "A golf handicap starts from a **score differential**: **(score − course rating) × 113 ÷ slope rating**. The differential adjusts your raw score for how hard the course is, so a 92 on a tough course counts for more than a 92 on an easy one. This calculator works out the differential for each of your three scores, then multiplies the best one by 0.96 to give an estimated handicap index.",
        "The course rating is the score a scratch golfer is expected to shoot on that course; the slope rating (55–155, with 113 as standard) measures how much harder the course plays for a bogey golfer than for a scratch golfer. Both numbers are printed on the scorecard.",
        "The 0.96 multiplier — sometimes called the 'bonus for excellence' — slightly rewards your best rounds, so your index reflects what you are capable of rather than your average day.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take scores of **92, 88, and 95** on a course rated **72** with a slope of **113**. The differentials are (92 − 72) × 113 ÷ 113 = **20.0**, (88 − 72) = **16.0**, and (95 − 72) = **23.0**. The best differential is **16.0** and the average is **19.7**.",
        "The estimated handicap index is the best differential × 0.96 = 16.0 × 0.96 = **15.4**. On a standard course, that means roughly 15 strokes above par.",
      ],
    },
    {
      heading: "Is this an official handicap index?",
      paragraphs: [
        "No — this is a simplified estimate from three rounds. An official WHS (World Handicap System) index uses the best 8 differentials from your last 20 rounds, averaged and multiplied by 0.96, and is maintained by a golf club or national association. Use this calculator as a guide, not as a tournament handicap.",
        "Because it takes your single best differential, this estimate runs lower — more generous — than an official index computed from the same three rounds would. With more rounds entered, the official method's average-of-eight would give a steadier, fairer number.",
        "Lower is better: a handicap of 0 means you typically shoot par, and a 15.4 index means about 15 strokes over par on a standard course. The lower your index, the fewer strokes you receive in handicap competition.",
      ],
    },
  ],

  "gravel-calculator": [
    {
      heading: "How much gravel do I need?",
      paragraphs: [
        "Gravel is calculated from the volume of the area to cover: **cubic feet = length × width × (depth in inches ÷ 12)**, then **cubic yards = cubic feet ÷ 27**, and **tons = cubic yards × 1.4**. Enter the length, width, and depth, and the calculator returns all three figures.",
        "The 1.4 tons per cubic yard is a typical average for crushed stone — suppliers sell by the cubic yard or by the ton, so having both numbers lets you compare quotes either way. Actual weight varies by stone type and moisture, so confirm with your supplier if you are ordering by weight.",
        "Depth is the input people most often get wrong. It is the finished, compacted depth of gravel, not the depth of the hole — so measure the depth you want the gravel to sit at once it has been spread and settled.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **20 × 10 foot area at 3 inches deep**. The volume is 20 × 10 × (3 ÷ 12) = **50 cubic feet**. Divide by 27 to get **1.85 cubic yards**, and multiply by 1.4 to get **2.59 tons**.",
        "A supplier selling by the yard would quote for 1.85 cubic yards — most round up to 2 yards — and one selling by the ton would quote about 2.6 tons. Either way, the same volume is being described.",
      ],
    },
    {
      heading: "How deep should gravel be?",
      paragraphs: [
        "The calculator's guidance is **3–4 inches for driveways, 2–3 inches for walkways, 6–12 inches for drainage, and 2 inches for decorative cover**. Driveways need the extra depth because vehicle weight compacts and displaces the stone over time.",
        "Order 5–10% more than the calculator shows for settling, spillage, and uneven ground — the figure is exact for a perfectly flat area at a perfectly even depth, and real ground is neither. It is cheaper to order a little extra than to pay a second delivery fee.",
        "For driveways, lay the gravel in layers if you can: a compacted base layer of larger stone with a thinner top layer of smaller gravel gives a firmer surface than one deep layer of a single size.",
      ],
    },
  ],

  "heat-index-calculator": [
    {
      heading: "What is the heat index, and how is it calculated?",
      paragraphs: [
        "The heat index is the **'feels like' temperature** — how hot the air actually feels once humidity is taken into account. This calculator uses the **Rothfusz regression equation** published by the National Weather Service, which combines air temperature in °F and relative humidity into a single apparent temperature.",
        "Humidity matters because sweat is the body's cooling system: in humid air, sweat evaporates slowly, so the body sheds heat less effectively and the same air temperature feels hotter. At low humidity the heat index is close to the air temperature; at high humidity it can run 10–15°F hotter.",
        "The equation is designed for temperatures of 80°F and above with humidity of 40% and above. Outside that range the result is less meaningful — below 80°F, humidity barely changes how the temperature feels.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take an air temperature of **95°F with 55% relative humidity**. Plugging those values into the Rothfusz equation gives a heat index of **109°F** (43°C) — 14 degrees hotter than the thermometer reads — and the calculator rates it **Danger**.",
        "For comparison, 90°F at 40% humidity gives a heat index of about **91°F**, barely above the air temperature. The same 90°F at 80% humidity would feel far worse, which is why the humidity input matters as much as the temperature.",
      ],
    },
    {
      heading: "When is the heat index dangerous?",
      paragraphs: [
        "The calculator's danger bands are: below 90°F **Caution**, 90–104°F **Extreme Caution**, 105–129°F **Danger**, and 130°F and above **Extreme Danger**. Above 105°F, heat illness becomes likely with prolonged exposure or physical activity.",
        "In the Danger band and above, the practical steps are simple: stay in shade or air conditioning during the hottest hours, drink water before you feel thirsty, and cut back on strenuous activity. Heat stroke is a medical emergency — confusion, hot dry skin, or fainting in the heat needs urgent help.",
        "Note that this calculator applies the core Rothfusz equation without the National Weather Service's small adjustments for very low or very high humidity, so at the extremes of the humidity range the figure is approximate rather than exact.",
      ],
    },
  ],

  "horsepower-calculator": [
    {
      heading: "How is horsepower calculated from torque and RPM?",
      paragraphs: [
        "Horsepower is calculated from torque and engine speed with the formula **HP = torque × RPM ÷ 5,252**, where torque is in pound-feet. This calculator also converts the result to kilowatts (× 0.7457) and metric horsepower, or PS (× 1.01387).",
        "Torque is the twisting force the engine produces; horsepower is how fast it can do work — torque multiplied by how quickly the engine is spinning. That is why the same torque figure means very different power at different RPM: double the revs and you double the horsepower.",
        "The constant 5,252 comes from the definition of one horsepower as 33,000 foot-pounds per minute, divided by 2π to convert revolutions to radians. At exactly 5,252 RPM, an engine's horsepower and torque numbers are equal — a handy check when reading a dyno chart.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take an engine making **300 lb-ft of torque at 5,000 RPM**. Horsepower is 300 × 5,000 ÷ 5,252 = **285.6 HP**. In metric terms that is 285.6 × 0.7457 = **213.0 kW**, and 285.6 × 1.01387 = **289.6 PS**.",
        "At 2,500 RPM the same 300 lb-ft would give only 300 × 2,500 ÷ 5,252 = **142.8 HP** — half the power, because the engine is doing the same work half as often. This is why engines are rated at their peak-RPM power figure, not at idle.",
      ],
    },
    {
      heading: "Horsepower vs torque: which matters?",
      paragraphs: [
        "Both, for different things. **Torque is what you feel** — the push that accelerates the car from a standstill and pulls it up a hill. **Horsepower is what sustains speed** — it decides how fast the car can ultimately go and how quickly it accelerates at higher speeds.",
        "A diesel truck and a sports car can have similar horsepower with very different torque: the truck makes its torque low in the rev range for pulling loads, while the sports car makes its power high in the rev range for speed. The calculator shows the relationship at one operating point — a full picture needs the torque curve across the rev range.",
        "This calculator works from torque and RPM only. It does not estimate horsepower from vehicle weight or acceleration times, so you need a torque figure — from the manufacturer's spec sheet or a dyno run — to use it.",
      ],
    },
  ],

  "ip-subnet-calculator": [
    {
      heading: "How do subnet calculations work?",
      paragraphs: [
        "A subnet is defined by its **CIDR prefix length** — the number after the slash, such as /24. The prefix tells you how many of the 32 bits in an IPv4 address identify the network, and the rest identify hosts: **total addresses = 2^(32 − prefix)**, and **usable hosts = total − 2**.",
        "Two addresses are always unusable: the first address in the range is the network address and the last is the broadcast address, so neither can be assigned to a device. The subnet mask is the prefix written as four octets — a /24 is 255.255.255.0 — and the wildcard mask is its inverse, 0.0.0.255.",
        "Each extra prefix bit halves the number of addresses: /24 has 256 addresses, /25 has 128, and /26 has 64. Going the other way, /23 has 512 and /16 has 65,536.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Enter a prefix of **24**. Total addresses = 2^(32 − 24) = 2^8 = **256**, and usable hosts = 256 − 2 = **254**. The subnet mask is **255.255.255.0** and the wildcard mask is **0.0.0.255**.",
        "Enter **26** instead: total addresses = 2^6 = **64**, usable hosts = **62**, and the mask is **255.255.255.192** — the last octet keeps 2 host bits (192 = 128 + 64) and the wildcard mask is 0.0.0.63.",
      ],
    },
    {
      heading: "What can you do with the subnet numbers?",
      paragraphs: [
        "The usual job is sizing a network: pick the smallest prefix that fits your device count with room to grow. A 50-device office fits in a /26 (62 usable hosts), but a /25 (126 usable) leaves headroom for growth without wasting much address space.",
        "The wildcard mask is used in access-control lists and some routing configurations, where it says which bits of an address must match and which can vary. It is simply 255 minus each octet of the subnet mask.",
        "Two limits to know: this calculator works from the prefix length alone, so it cannot show the network or broadcast address for a specific IP — you need an IP address as well as a prefix for that. And for /31 and /32 prefixes it reports 0 usable hosts, even though /31 links are used for point-to-point connections where both addresses carry traffic.",
      ],
    },
  ],

  "mulch-calculator": [
    {
      heading: "How much mulch do I need?",
      paragraphs: [
        "Mulch is calculated from the volume of the bed: **cubic feet = length × width × (depth in inches ÷ 12)**, then **cubic yards = cubic feet ÷ 27**. This calculator also converts the volume into standard 2-cubic-foot bags, rounded up.",
        "Suppliers sell mulch by the cubic yard in bulk or by the bag at a garden centre, so the calculator gives you both numbers. A cubic yard is 27 cubic feet — about 13.5 two-cubic-foot bags, or 14 bags rounded up.",
        "Depth is the finished depth of mulch on the bed, not the depth of the bed itself. Measure the length and width of the area in feet and the depth you want in inches, and the calculator does the rest.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **20 × 10 foot bed at 3 inches deep**. The volume is 20 × 10 × (3 ÷ 12) = **50 cubic feet**. Divide by 27 to get **1.85 cubic yards**, and divide 50 by 2 to get **25 bags** of 2 cubic feet each.",
        "A bulk supplier would quote about 2 cubic yards for this job; buying bags, you would need exactly 25. The bulk price per cubic yard is usually much lower than the bagged price, so for anything over a yard or two, bulk is the cheaper route.",
      ],
    },
    {
      heading: "How deep should mulch be, and how often should you top it up?",
      paragraphs: [
        "The ideal depth is **2–4 inches**. Too thin and weeds push through and moisture escapes; too thick and it can suffocate roots and trap too much moisture against stems. Keep mulch a few inches away from tree trunks and plant stems — piling it against bark (the 'mulch volcano') causes rot.",
        "Mulch breaks down over a season, so most gardeners add 1–2 inches each spring to bring the depth back up. The calculator gives the volume for a full fresh layer; for a top-up, enter the depth you are adding rather than the total depth.",
        "Bag counts assume standard 2-cubic-foot bags. If your bags are 3 cubic feet, divide the cubic-feet figure by 3 instead — the 50 cubic feet in the example would need 17 bags of that size, rounded up.",
      ],
    },
  ],

  "password-generator": [
    {
      heading: "How does the password generator work?",
      paragraphs: [
        "The password generator builds a password by picking characters at random from a **character pool**. Lowercase letters are always included; you can add uppercase letters, numbers, and symbols by setting each option to 1, and you choose the length from 4 to 64 characters. Click Calculate to generate a new password.",
        "The pool sizes are fixed: 26 lowercase letters, 26 uppercase, 10 digits, and 26 symbols — so with all four types selected the pool is **88 characters**. Every character in the password is an independent random pick from that pool.",
        "The calculator also reports **entropy**, the strength of the password measured in bits: entropy = log₂(pool size) × length. It rates the result Weak, Moderate, Strong, or Very Strong based on that number — over 40 bits is Moderate, over 60 is Strong, and over 80 is Very Strong.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Generate a **16-character password with all character types** (uppercase, numbers, and symbols all set to 1). The pool is 26 + 26 + 10 + 26 = **88 characters**, and the entropy is log₂(88) × 16 ≈ 6.46 × 16 = **103 bits**, rated **Very Strong**. A password like this would take far longer than the age of the universe to brute-force with current computers.",
        "For comparison, a **12-character password using lowercase letters only** has a pool of 26 and entropy of log₂(26) × 12 ≈ 4.70 × 12 = **56 bits**, rated **Moderate**. Length matters more than character variety: adding four characters to a password strengthens it far more than adding symbols to a short one.",
      ],
    },
    {
      heading: "How should you use generated passwords?",
      paragraphs: [
        "Use a **different password for every account** and store them in a password manager — that is the point of generating random passwords you could never memorise. A 16-character generated password is strong; the same password reused across ten sites is not.",
        "Two honest limits of this tool: it generates passwords with JavaScript's Math.random(), which is pseudo-random rather than cryptographically secure, so for the highest-security accounts a password manager's built-in generator is the better choice. And because characters are picked purely at random, there is no guarantee that every selected character type actually appears in the password — with 16 characters it almost always does, but check before you rely on it.",
        "Longer is better, and there is no real downside to length: a 20- or 24-character password is barely harder to store in a manager than a 16-character one, and each extra character multiplies the guessing effort by the size of the pool.",
      ],
    },
  ],

  "random-number-generator": [
    {
      heading: "How does the random number generator work?",
      paragraphs: [
        "The generator picks integers at random from the range you set: **random = floor(Math.random() × (max − min + 1)) + min**. Every whole number between the minimum and maximum, inclusive, has an equal chance of appearing. Each click of Calculate returns three numbers — one main result plus two bonus numbers — all drawn independently from the same range.",
        "The '+1' in the formula is what makes the maximum reachable: without it, the highest number could never be picked. So a range of 1 to 100 has exactly 100 possible values, and any specific number — 42, say — has a 1 in 100 chance on each draw.",
        "The numbers come from JavaScript's Math.random(), which is pseudo-random: evenly distributed and unpredictable enough for games, raffles, and sampling, but not suitable for cryptography, lotteries, or anything where the randomness itself must be provably secure.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Set the minimum to **1** and the maximum to **100**, then click Calculate. You might get a main number of 42 with bonus numbers of 17 and 88 — the exact values are random, but the structure is fixed: three independent draws from 100 possible values, each with a 1% chance of being any particular number.",
        "Narrow the range to **1 to 6** and the generator behaves like a die: each draw has a 1-in-6 chance of any face. Widen it to 1 to 1,000 and each specific number has a 0.1% chance. The maths is the same at any range — only the odds change.",
      ],
    },
    {
      heading: "What is a random number generator used for?",
      paragraphs: [
        "The everyday uses are picking winners, rolling dice, choosing names from a list, and sampling — any time you need a fair, unbiased pick. Teachers use it for random student selection, and developers use it to generate test data.",
        "One rule to follow: **enter the smaller number as the minimum**. The calculator does not swap them for you, so entering the numbers the wrong way round produces wrong results — for numbers between 10 and 50, enter min 10 and max 50.",
        "For a raffle or draw, decide the rules before you generate: draw once and use the main number, or use all three numbers for first, second, and third place. Either way, the draw is only as fair as the range is honest — make sure every entry maps to exactly one number.",
      ],
    },
  ],

  "recipe-converter": [
    {
      heading: "How do you scale a recipe up or down?",
      paragraphs: [
        "Recipe scaling is a simple proportion: **scale factor = desired servings ÷ original servings**, and every ingredient amount is multiplied by that factor. This calculator takes the original and desired serving counts plus two ingredient amounts, and returns the scaled amounts.",
        "Doubling a 4-serving recipe to 8 gives a factor of 2.00×; halving it to 2 servings gives 0.50×. The factor applies equally to every ingredient, which is what keeps the recipe's proportions — and therefore its flavour — the same.",
        "The calculator scales two ingredient amounts at a time and keeps the units you enter. Run it once per pair of ingredients for a longer recipe, and write the scaled amounts down as you go.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Scale a recipe from **4 servings to 8 servings** with ingredient amounts of **2 cups** and **1.5 cups**. The scale factor is 8 ÷ 4 = **2.00×**, so the first ingredient becomes 2 × 2 = **4.00 cups** and the second becomes 1.5 × 2 = **3.00 cups**.",
        "Scaling the same recipe down to **2 servings** gives a factor of 2 ÷ 4 = **0.50×**, so 2 cups become **1.00 cup** and 1.5 cups become **0.75 cups**. The maths works identically in both directions.",
      ],
    },
    {
      heading: "What does not scale with a recipe?",
      paragraphs: [
        "Cooking times do **not** scale proportionally. A doubled batch may need slightly longer in the oven, especially for baking, but it will not need double the time — check for doneness with a thermometer or skewer rather than trusting the clock.",
        "Strong seasonings — salt, chilli, garlic, spices — are best scaled cautiously. Start with about three-quarters of the scaled amount, taste, and add more: it is easy to add seasoning and impossible to take it out. Leavening agents like baking powder also behave differently in very large or very small batches.",
        "This calculator scales amounts only; it does not convert units. If your recipe is in cups and you want grams, convert the units separately before or after scaling — and remember that pan size matters too: a doubled cake needs a bigger tin, not just more batter.",
      ],
    },
  ],

  "resistor-calculator": [
    {
      heading: "How do you calculate series and parallel resistance?",
      paragraphs: [
        "Resistors in **series** simply add up: **R = R1 + R2 + R3**. Resistors in **parallel** combine by reciprocals: **1/R = 1/R1 + 1/R2 + 1/R3**. This calculator takes up to three resistor values in ohms and shows both totals, plus the series and parallel results for the first two resistors alone.",
        "Series increases total resistance — the current has to push through each resistor in turn. Parallel decreases it — each added resistor gives the current another path, so the total is always **less than the smallest individual resistor**.",
        "The parallel formula is the one people get wrong most often: you add the reciprocals and then take the reciprocal of the sum. For two resistors there is a shortcut — R = (R1 × R2) ÷ (R1 + R2) — which gives the same answer as the reciprocal method.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take resistors of **100 Ω, 220 Ω, and 330 Ω**. In series: 100 + 220 + 330 = **650.0 Ω**. In parallel: 1/R = 1/100 + 1/220 + 1/330 = 0.01 + 0.004545 + 0.003030 = 0.017576, so R = 1 ÷ 0.017576 = **56.89 Ω** — less than the smallest resistor, as expected.",
        "For the first two alone: series is 100 + 220 = **320.0 Ω**, and parallel is 1 ÷ (1/100 + 1/220) = 1 ÷ 0.014545 = **68.75 Ω**. The shortcut agrees: (100 × 220) ÷ (100 + 220) = 22,000 ÷ 320 = 68.75 Ω.",
      ],
    },
    {
      heading: "When should you use series vs parallel?",
      paragraphs: [
        "Use **series** when you need more resistance than a single resistor provides, or to split a voltage — two resistors in series form a voltage divider, with the voltage across each proportional to its resistance. Use **parallel** when you need less resistance, to share current between resistors, or to hit a value you do not have in a single part.",
        "A practical trick: two equal resistors in parallel give half the value of one, so two 100 Ω resistors in parallel make 50 Ω. Combining series and parallel lets you build almost any value from a standard set of parts.",
        "Watch the power rating, not just the resistance: a resistor that works electrically can still overheat if it carries too much current. Power is V² ÷ R, so a resistor dropping a large voltage at low resistance dissipates real heat — check the wattage before you build the circuit.",
      ],
    },
  ],

  "roofing-calculator": [
    {
      heading: "How is roofing material calculated?",
      paragraphs: [
        "Roofing is calculated from the **sloped roof area**, not the building's footprint: **roof area = length × width × pitch multiplier**, where the pitch multiplier is **√(1 + (pitch ÷ 12)²)**. Waste is added, then the total is divided by 100 to give **roofing squares** — the unit roofers buy in — and multiplied by 3 for the number of bundles.",
        "Pitch is the rise in inches for every 12 inches of horizontal run: a 6/12 pitch rises 6 inches per foot. A steeper pitch means more roof surface over the same footprint, so the multiplier grows with pitch — 1.118 for 6/12, but 1.414 for a steep 12/12 pitch.",
        "One roofing square covers 100 square feet, and the calculator assumes 3 bundles per square, which is standard for 3-tab shingles. The waste percentage covers cuts, starter rows, ridge caps, and mistakes.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **40 × 30 foot building with a 6/12 pitch and 15% waste**. The pitch multiplier is √(1 + (6 ÷ 12)²) = √1.25 = **1.118**, so the roof area is 40 × 30 × 1.118 = **1,342 sq ft**.",
        "Adding 15% waste gives 1,342 × 1.15 = 1,543 sq ft, which is **15.4 squares**. Bundles are 15.4 × 3 = 46.3, rounded up to **47 bundles**. Without the pitch adjustment, the flat footprint of 1,200 sq ft would have under-ordered by about 12%.",
      ],
    },
    {
      heading: "What should you check before ordering roofing?",
      paragraphs: [
        "Measure to the **outer edge of the roof**, including the overhang — the calculator uses the building's length and width, so if you enter the wall dimensions you will under-order. Add the overhang on all sides, or bump the waste percentage to cover it.",
        "Check your shingle type: the calculator assumes **3 bundles per square**, which suits standard 3-tab shingles. Architectural (laminate) shingles often need 4 bundles per square, which would raise the example above from 47 to 62 bundles.",
        "Roofing squares cover the field shingles only. Ridge caps, starter strips, underlayment, flashing, and vents are separate items — and complex roofs with valleys, dormers, and hips need more waste than a simple gable roof, so 15% is a floor, not a ceiling.",
      ],
    },
  ],

  "running-pace-calculator": [
    {
      heading: "How is running pace calculated?",
      paragraphs: [
        "Running pace is **time divided by distance**: run 3.1 miles in 25 minutes and your pace is 25 ÷ 3.1, or about 8 minutes per mile. This calculator takes the distance in miles and the time in minutes, then shows your pace per mile, your speed in mph, and a predicted 5K finish time.",
        "Speed is the inverse calculation — distance divided by time, multiplied by 60 to get miles per hour. The 5K prediction multiplies your pace by 3.107, the number of miles in 5 kilometres, assuming you hold the same pace for the whole race.",
        "Pace and speed describe the same run from opposite directions: pace answers 'how long does each mile take?', while speed answers 'how far do I get in an hour?'. Runners usually think in pace; the speed figure is useful for comparing with cycling or treadmill settings.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Run **3.1 miles in 25 minutes**. Pace is 25 ÷ 3.1 = 8.065 minutes per mile, shown as **8:04 per mile**. Speed is 3.1 ÷ (25 ÷ 60) = **7.4 mph**.",
        "The 5K prediction is 8.065 × 3.107 = 25.06 minutes, shown as **25:03**. That is close to the input time because 3.1 miles is already almost exactly a 5K (5 km = 3.107 miles) — the prediction just corrects for the small difference.",
      ],
    },
    {
      heading: "What is a good running pace?",
      paragraphs: [
        "A common guide is **10–12 minutes per mile for beginners, 8–10 for intermediate runners, and under 7 for advanced runners**. The example above — 8:04 per mile — sits at the faster end of intermediate. What counts as 'good' depends on age, distance, and how long you have been running.",
        "Time is entered in **minutes only** on this page, so enter 25.5 for 25 minutes 30 seconds. The 5K prediction also assumes an even pace throughout — in a real race, most runners slow down over the later miles, so treat it as a best case rather than a promise.",
        "Use pace to plan training, not just to judge it: a target pace for a race tells you what each mile split should look like, and an easy-run pace 1–2 minutes per mile slower than race pace is where most weekly mileage should sit.",
      ],
    },
  ],

  "screen-resolution-calculator": [
    {
      heading: "How is screen resolution measured?",
      paragraphs: [
        "The key number is **PPI — pixels per inch**, calculated as **√(width² + height²) ÷ diagonal size in inches**. It measures pixel density: how tightly the pixels are packed. This calculator takes the horizontal and vertical pixel counts and the screen's diagonal size, then shows PPI, total megapixels, and the aspect ratio.",
        "The formula uses Pythagoras' theorem: the diagonal in pixels is the hypotenuse of the width-by-height triangle, and dividing by the diagonal in inches gives pixels per inch. Megapixels are simply width × height ÷ 1,000,000, and the aspect ratio is the width and height reduced by their greatest common divisor.",
        "PPI is what decides whether a screen looks sharp. Resolution alone does not: the same 1920 × 1080 panel is crisp on a 24-inch monitor and visibly coarse on a 55-inch TV, because the pixels are spread over a much larger area.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **27-inch monitor at 2560 × 1440**. The diagonal in pixels is √(2560² + 1440²) = √8,627,200 = **2,937.2 pixels**. Divide by 27 inches to get **108.8 PPI**.",
        "Total pixels are 2560 × 1440 = 3,686,400, or **3.69 megapixels**. The greatest common divisor of 2560 and 1440 is 160, so the aspect ratio is 2560 ÷ 160 : 1440 ÷ 160 = **16:9**.",
      ],
    },
    {
      heading: "What PPI do you need?",
      paragraphs: [
        "It depends on viewing distance. The calculator's guidance is that **Retina — the point where individual pixels become hard to see — starts around 220 PPI** for laptops, and about 300 PPI for phones held close to the face. A 27-inch 1440p display at 108.8 PPI is well below that, but at arm's length on a desk it still looks sharp to most people.",
        "TVs get away with far lower PPI because you sit metres away: a 55-inch 4K TV is about 80 PPI and looks perfectly sharp from a sofa. Chasing PPI on a big screen matters less than colour accuracy, brightness, and contrast.",
        "When comparing monitors, match PPI to your use: text-heavy work benefits most from high density, since small text is where coarse pixels show first. For gaming, refresh rate and response time usually matter more than a few extra PPI.",
      ],
    },
  ],

  "tile-calculator": [
    {
      heading: "How many tiles do I need?",
      paragraphs: [
        "Tile quantity is calculated from area: **tiles = room area ÷ tile area**, rounded up, then multiplied by (1 + waste%). This calculator takes the room's length and width in feet, the tile size in inches (square tiles), and a waste percentage, then shows the tile count with and without waste, plus the number of boxes at 12 tiles per box.",
        "Tile area comes from the size in inches: a 12-inch tile covers 144 square inches, which is exactly 1 square foot (144 ÷ 144). A 6-inch tile covers 36 square inches, or 0.25 square feet — so it takes four of them to cover one square foot.",
        "Both roundings are up: you cannot buy part of a tile or part of a box, and the waste is applied to the already-rounded tile count. The 'tiles (no waste)' figure lets you see exactly how much of your order is the waste allowance.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Tile a **12 × 10 foot room with 12-inch tiles and 10% waste**. The room area is 12 × 10 = **120 sq ft**, and each tile covers 1 sq ft, so you need **120 tiles** before waste.",
        "Adding 10% waste gives 120 × 1.10 = **132 tiles**. At 12 tiles per box, 132 ÷ 12 = **11 boxes** exactly — no partial box left over.",
      ],
    },
    {
      heading: "How much waste should you allow for tiling?",
      paragraphs: [
        "The standard guidance is **10% for a straight layout, 15% for diagonal, and 20% for complex patterns** or rooms with many cuts. Diagonal layouts waste more because every tile meeting a wall needs an angled cut, and the offcut is usually unusable.",
        "This calculator assumes **square tiles** — one size in inches. For a rectangular tile, use the square root of its area: a 6 × 24 inch tile covers 144 square inches, so enter 12 as the tile size and the maths works out the same.",
        "Check the box quantity on your product: the calculator assumes 12 tiles per box, but counts vary. And keep the spares — tiles get discontinued, and a cracked tile years later is a much smaller job if you have matching replacements on hand.",
      ],
    },
  ],

  "time-card-calculator": [
    {
      heading: "How are work hours and pay calculated?",
      paragraphs: [
        "Work hours are calculated as **(clock-out time − clock-in time − break) ÷ 60**, and pay is **hours × hourly rate**. This calculator takes start and end times in 24-hour format, a break in minutes, and an hourly rate, then shows hours worked, decimal hours, daily pay, and a weekly figure equal to five identical days.",
        "Overnight shifts are handled automatically: if the end time is earlier than the start time, the calculator assumes the shift crossed midnight and adds 24 hours. A 22:00 start with a 06:00 finish is treated as an 8-hour shift, not a negative one.",
        "Decimal hours are what payroll systems use — 7 hours 30 minutes is 7.50 decimal hours — so the calculator shows both formats. The weekly figure is simply the daily pay multiplied by 5.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Clock in at **09:00** and out at **17:30**, with a **30-minute break**, at **$25 an hour**. Total minutes are (17 × 60 + 30) − (9 × 60) − 30 = 1,050 − 540 − 30 = **480 minutes**, which is **8h 0m** or **8.00 decimal hours**.",
        "Daily pay is 8.00 × $25 = **$200.00**, and the weekly figure is $200.00 × 5 = **$1,000.00**. For an overnight shift — 22:00 to 06:00 with the same 30-minute break — the total is 360 − 1,320 − 30 = −990 minutes, plus 1,440 for crossing midnight = **450 minutes (7h 30m)**, paying **$187.50**.",
      ],
    },
    {
      heading: "What should you watch out for on a time card?",
      paragraphs: [
        "Keep the **break shorter than the shift**. The overnight adjustment adds 24 hours whenever the total goes negative, so a break longer than the shift — say a 10-hour break on an 8-hour shift — wraps around and shows as a very long shift instead of an error.",
        "The weekly figure assumes five identical days. If your days vary in length, run each day separately and add the daily pay figures together — the ×5 shortcut only works when every day matches.",
        "This calculator does not apply overtime rules: it pays every hour at the same rate. If your jurisdiction pays time-and-a-half over 40 hours a week, work out the overtime hours separately and add the premium yourself.",
      ],
    },
  ],

  "tire-size-calculator": [
    {
      heading: "How are tire dimensions calculated?",
      paragraphs: [
        "Tire dimensions are calculated from the size code on the sidewall: **sidewall height = width × aspect ratio**, **overall diameter = (2 × sidewall ÷ 25.4) + rim diameter**, **circumference = diameter × π**, and **revolutions per mile = 63,360 ÷ circumference**. Enter the width in millimetres, the aspect ratio as a percentage, and the rim diameter in inches.",
        "The aspect ratio is a percentage of the width, not a fixed height: a 55-series sidewall on a 225 mm tyre is 123.75 mm tall, but the same 55-series on a 265 mm tyre would be taller. That is why two tyres with the same aspect ratio can have different overall diameters.",
        "Revolutions per mile is the figure that connects tyre size to your speedometer and odometer — both count wheel revolutions, so a tyre that turns fewer times per mile makes them read low.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **225/55R17** tyre: 225 mm wide, 55% aspect ratio, radial construction, 17-inch rim. The sidewall is 225 × 0.55 = **123.8 mm**. The overall diameter is (2 × 123.75 ÷ 25.4) + 17 = 9.74 + 17 = **26.7 inches**.",
        "The circumference is 26.74 × π = **84.0 inches**, and revolutions per mile are 63,360 ÷ 84.0 = **754**. A tyre with a larger diameter would turn fewer times per mile — and make the speedometer under-read.",
      ],
    },
    {
      heading: "What happens if you change tire size?",
      paragraphs: [
        "Changing the overall diameter changes what your speedometer and odometer report. A larger diameter means fewer revolutions per mile, so the speedometer reads lower than your true speed; a smaller diameter makes it read high. The revolutions-per-mile figure lets you compare two sizes before you buy.",
        "Width and aspect ratio trade off against each other: a wider tyre with a lower aspect ratio can keep the same overall diameter. That is the idea behind 'plus sizing' — a bigger rim with a lower-profile tyre that preserves the original diameter and keeps the speedometer accurate.",
        "Before fitting a different size, check clearance for the wider or taller tyre at full steering lock and full suspension travel, and confirm the size is approved for your vehicle — the load rating and speed rating matter as much as the dimensions.",
      ],
    },
  ],

  "travel-budget-calculator": [
    {
      heading: "How is a travel budget calculated?",
      paragraphs: [
        "A travel budget is the sum of its parts: **total = flights + (hotel per night × nights) + (food + activities per day) × days**, where **days = nights + 1**. This calculator takes those five inputs and returns the total, the hotel and food subtotals, and a daily average.",
        "Food and activities are charged for nights + 1 days because a 5-night trip spans 6 days — you eat and do things on both travel days, but you only sleep in the hotel for 5 nights. The daily average divides the total by the same day count.",
        "The result is an estimate built from your own numbers, not a prediction: the quality of the answer depends entirely on how realistic the per-day figures are for your destination.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Use the calculator's defaults: flights **$500**, hotel **$120 a night for 5 nights**, food **$50 a day**, and activities **$30 a day**. Hotel is 120 × 5 = **$600**; food is 50 × 6 = **$300**; activities are 30 × 6 = **$180**.",
        "The total is 500 + 600 + 300 + 180 = **$1,580**, and the daily average is 1,580 ÷ 6 = **$263**. The flight is nearly a third of the whole trip — the single biggest lever on the total.",
      ],
    },
    {
      heading: "How should you budget for a trip in practice?",
      paragraphs: [
        "Add a **10–20% buffer** on top of the total for the things no calculator itemises: tips, local transport, souvenirs, airport parking, and the meal that costs twice what you expected. The calculator does not add this for you — add it yourself after you see the total.",
        "Price the big items first and honestly. Flights and hotels are usually more than half the budget, and a realistic per-day food figure for your destination matters more than getting the activities line exactly right.",
        "If you are travelling with others, decide what is shared before you split: a hotel room split two ways halves the per-person cost, but food and activities usually do not split at all. Run the calculator once per person for the personal items and once for the shared ones.",
      ],
    },
  ],

  "wedding-budget-calculator": [
    {
      heading: "How is a wedding budget split?",
      paragraphs: [
        "A wedding budget is split by percentage: this calculator allocates **40% to venue and decor, 25% to catering, 10% to photography, and 8% to attire**, leaving the remaining **17% for everything else**. Enter your total budget and guest count, and it shows each category in dollars plus the cost per guest.",
        "The percentages are industry-standard starting points, not rules. Venue and catering together take nearly two-thirds of a typical budget, which is why those two decisions drive the total more than any other.",
        "Cost per guest is simply the total budget divided by the number of guests — the single most useful number for comparing venues and packages, because it scales with the size of the wedding in a way the headline total does not.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **$30,000 budget with 100 guests**. Venue and decor are 40% = **$12,000**; catering is 25% = **$7,500**; photography is 10% = **$3,000**; attire is 8% = **$2,400**.",
        "The cost per guest is 30,000 ÷ 100 = **$300**. The four shown categories add to $24,900 (83%), leaving **$5,100** — the remaining 17% — for flowers, music, invitations, transport, and everything else.",
      ],
    },
    {
      heading: "How should you use the budget breakdown?",
      paragraphs: [
        "Treat the percentages as a starting point and adjust to your priorities: a couple who care most about photography can move money from decor, and a small guest list frees up far more per guest than any amount of bargain-hunting on individual items.",
        "The guest count is the biggest lever on the whole budget. Cutting 20 guests from a 100-guest wedding at $300 per head saves $6,000 — more than most couples save by negotiating with any single vendor.",
        "Track the 17% remainder explicitly. Flowers, decor, music, invitations, rings, and transport are individually small but collectively large, and they are the items most often forgotten until late in the planning — when the money is already committed elsewhere.",
      ],
    },
  ],

  "wind-chill-calculator": [
    {
      heading: "What is wind chill, and how is it calculated?",
      paragraphs: [
        "Wind chill is the **'feels like' temperature in cold wind** — how cold exposed skin actually feels once the wind strips away the insulating layer of warm air around the body. This calculator uses the **National Weather Service formula**: WC = 35.74 + 0.6215T − 35.75V^0.16 + 0.4275TV^0.16, where T is the air temperature in °F and V is the wind speed in mph.",
        "The formula only applies when the temperature is **50°F or below** and the wind is **at least 3 mph**. Warmer than 50°F, or calmer than 3 mph, and the wind has no meaningful chilling effect — the calculator simply reports the air temperature with no wind-chill adjustment.",
        "Wind chill is a rate, not a temperature the world actually reaches: it describes how fast exposed skin loses heat. Objects cool to the air temperature faster in wind, but wind cannot make them colder than the air itself.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take an air temperature of **20°F with a 15 mph wind**. The wind factor is 15^0.16 ≈ 1.542, so the wind chill is 35.74 + 0.6215 × 20 − 35.75 × 1.542 + 0.4275 × 20 × 1.542 = **6°F** (−14°C) — fourteen degrees colder than the thermometer reads, with a **low frostbite risk**.",
        "At **0°F with a 20 mph wind**, the wind chill falls to **−22°F**, and the calculator flags **frostbite in 15 minutes**. The same 0°F air with no wind would feel like 0°F — the wind alone accounts for the entire 22-degree difference.",
      ],
    },
    {
      heading: "When is wind chill dangerous?",
      paragraphs: [
        "The calculator flags **frostbite in 30 minutes when the wind chill falls below 0°F, and in 15 minutes below −18°F**. Those times are for exposed skin: covered skin is protected, which is why the practical advice is about clothing, not about staying indoors at all costs.",
        "Dress in layers, cover exposed skin — face, ears, and hands lose heat fastest — and keep dry: wet clothing loses its insulating value and accelerates heat loss far more than wind alone.",
        "Wind chill also matters for planning, not just comfort. It decides whether a school run, a construction shift, or a winter hike needs extra precautions, and it is the number weather forecasts quote for a reason: the air temperature alone understates the cold whenever the wind is up.",
      ],
    },
  ],

  "aspect-ratio-calculator": [
    {
      heading: "How is an aspect ratio calculated?",
      paragraphs: [
        "An aspect ratio describes the shape of a rectangle — how wide it is compared with how tall — written as two numbers separated by a colon, like 16:9. This calculator finds it by dividing the width and the height by their **greatest common divisor (GCD)**, which reduces the pair to its simplest whole-number form.",
        "Resizing without distortion uses the same idea in reverse: the **new height = (new width ÷ old width) × old height**. As long as the width and height change by the same factor, the shape stays identical — nothing is stretched or squashed. The calculator also reports the total megapixels, which is simply width × height divided by one million.",
        "One detail to know: the new height is **rounded to the nearest whole pixel**, because screens and image files cannot have fractional pixels. On very small images that rounding can shift the ratio by a pixel, which is normally invisible but worth knowing if you need exact dimensions.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a Full HD image, **1920 × 1080 pixels**. The GCD of 1920 and 1080 is 120, so 1920 ÷ 120 = 16 and 1080 ÷ 120 = 9 — the aspect ratio is **16:9**. The image holds 1920 × 1080 = 2,073,600 pixels, or **2.07 megapixels**.",
        "Resize it to **1280 pixels wide** and the matching height is (1280 ÷ 1920) × 1080 = **720 pixels** — the familiar 720p size, still exactly 16:9. If you instead forced the height to 800 pixels, the picture would stretch vertically, which is exactly the distortion this calculator helps you avoid.",
      ],
    },
    {
      heading: "Common aspect ratios and where they are used",
      paragraphs: [
        "**16:9** is the widescreen standard for TVs, monitors, and YouTube videos. **4:3** was the old television and early digital-camera standard and is still common in presentation slides. **1:1** is the square format used for many social-media images, **21:9** is the ultrawide cinema and monitor format, and **3:2** is the classic 35mm photo ratio.",
        "When a video or image must fit a frame with a different ratio, something has to give: either the image is cropped, or empty bars appear (letterboxing). Knowing the ratio before you resize tells you which of those will happen, so you can plan the crop instead of discovering it afterwards.",
      ],
    },
  ],

  "baking-ratio-calculator": [
    {
      heading: "How are baking ratios calculated?",
      paragraphs: [
        "Professional bakers measure recipes with **baker's percentage**: every ingredient is expressed as a percentage of the flour weight, and flour is always 100%. So a recipe at 65% hydration uses 65 g of water for every 100 g of flour, whatever the batch size — the formula scales to any amount without changing the dough.",
        "This calculator applies that one rule to each ingredient: **ingredient weight = flour weight × (percentage ÷ 100)**. Water comes from the hydration percentage, salt and yeast from their own percentages, and the total dough weight is simply flour plus water plus salt plus yeast.",
        "Hydration is the number that most changes the bread. Wetter doughs (higher hydration) give a more open, airy crumb but are stickier and harder to handle; drier doughs are easier to shape but denser. Salt is usually around 2% — enough to flavour the loaf and strengthen the dough without slowing the yeast too much.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Start with **500 g of flour at 65% hydration, 2% salt, and 1% yeast**. Water = 500 × 0.65 = **325 g**. Salt = 500 × 0.02 = **10.0 g**. Yeast = 500 × 0.01 = **5.0 g**. Add them up: 500 + 325 + 10 + 5 = **840 g of dough**, enough for one large loaf or two small ones.",
        "To double the batch, just double the flour to 1,000 g and keep the same percentages: 650 g water, 20 g salt, 10 g yeast, and 1,680 g of dough. That is the whole point of baker's percentage — the ratios stay fixed while the batch size changes freely.",
      ],
    },
    {
      heading: "Which hydration level should you use?",
      paragraphs: [
        "As a starting guide: **sandwich bread 60–65%**, **artisan loaves 65–75%**, and **ciabatta 75–85%**. If you are new to a recipe, begin at the low end of the range — the dough will be easier to knead and shape — and raise the hydration by a few percent on the next bake once you know how the flour behaves.",
        "Different flours absorb different amounts of water, so the same percentage can feel wetter or drier depending on the flour. Wholegrain and high-protein bread flours generally need more water than plain white flour, and humid kitchens need slightly less. Treat the calculator's numbers as a reliable starting point, then adjust by feel.",
      ],
    },
  ],

  "binary-to-decimal-calculator": [
    {
      heading: "How is binary converted to decimal?",
      paragraphs: [
        "Binary is the base-2 number system computers use, with only two digits: 0 and 1. Each position in a binary number is worth a power of 2, starting from 2⁰ = 1 on the right and doubling to the left: 1, 2, 4, 8, 16, 32, and so on. To convert, you **add up the place values where the bit is 1** and ignore the places where it is 0.",
        "This calculator does that addition for you and also shows the same value in **hexadecimal (base 16) and octal (base 8)**, plus the number of bits entered. Type the binary digits into the input as a number — for example, type 1010 for the binary number 1010.",
        "Because the input is a numeric field, **leading zeros are dropped** (00101 becomes 101), but that never changes the value — leading zeros contribute nothing. If any digit other than 0 or 1 is entered, the calculator shows an error message instead of a result.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Convert **11010110** to decimal. Reading from the right, the place values are 1, 2, 4, 8, 16, 32, 64, 128. The 1 bits sit at 128, 64, 16, 4, and 2, so the total is 128 + 64 + 16 + 4 + 2 = **214**. The same value is **0xD6 in hexadecimal**, **0o326 in octal**, and it uses **8 bits** — one byte.",
        "A shorter example: **1010** has 1 bits at 8 and 2, so it equals **10** in decimal. Notice the pattern: each binary digit you add on the left doubles the largest value you can represent, which is why 8 bits reach 255 and 16 bits reach 65,535.",
      ],
    },
    {
      heading: "Where binary shows up in everyday computing",
      paragraphs: [
        "Binary is the native language of computers because a bit maps directly onto a switch that is on or off. File sizes, memory addresses, colour values, and network data are all stored as binary underneath, even when software displays them in decimal or hexadecimal for humans.",
        "Hexadecimal is a common shorthand for binary because each hex digit stands for exactly four bits: one byte is always two hex digits. That is why colour codes like #FF0000 (red) and memory addresses are written in hex — they are far shorter than the equivalent string of 1s and 0s.",
      ],
    },
  ],

  "blood-alcohol-calculator": [
    {
      heading: "How is blood alcohol content (BAC) estimated?",
      paragraphs: [
        "Blood alcohol content is the percentage of alcohol in the bloodstream, estimated here with the widely used **Widmark formula**. It takes the alcohol consumed (each standard drink is counted as 0.6 fluid ounces of pure alcohol), divides it by body weight adjusted for sex, and subtracts the alcohol the body clears over time — about **0.015% per hour**.",
        "The formula is: **BAC = (drinks × 0.6 × 5.14) ÷ (weight in pounds × r) − 0.015 × hours**, where r is 0.73 for men and 0.66 for women, reflecting average differences in body water. The result is an **estimate, not a measurement**: food, metabolism, medication, and the strength of the drinks all shift the real number, and only a breath or blood test measures BAC directly.",
        "This calculator is for general information only and is not medical advice. Never use an estimate to decide whether you are safe to drive — impairment begins well below the legal limit, and the only reliably safe choice after drinking is not to drive.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a man weighing **180 lb** who has **3 standard drinks over 2 hours**. The formula gives (3 × 0.6 × 5.14) ÷ (180 × 0.73) − 0.015 × 2 = 9.252 ÷ 131.4 − 0.03 = 0.070 − 0.03 = **0.040%**. The calculator labels this **Mildly impaired** and estimates **2.7 hours** until the BAC reaches zero (0.040 ÷ 0.015).",
        "For comparison, the same 3 drinks over 2 hours for a **160 lb** man give about **0.049%**, and a single drink over one hour for a 160 lb man gives about **0.011%**. Body weight makes a large difference: the same drinks produce a higher BAC in a lighter person. The US legal driving limit shown by the tool is **0.080%**, but limits vary by country and by driver — and impairment starts below any limit.",
      ],
    },
    {
      heading: "What affects BAC besides the number of drinks?",
      paragraphs: [
        "Drinking on an empty stomach raises BAC faster and higher than drinking with food, because food slows alcohol absorption. Stronger drinks count as more than one standard drink — a pint of strong beer or a large glass of wine can equal two standard drinks even though it looks like one.",
        "Time is the only thing that lowers BAC. Coffee, cold air, exercise, and food do not speed up the liver's steady rate of about 0.015% per hour. If you are unsure, wait longer than the estimate suggests — the calculator cannot account for how your own body processes alcohol.",
      ],
    },
  ],

  "blood-pressure-calculator": [
    {
      heading: "How is blood pressure classified?",
      paragraphs: [
        "Blood pressure is two numbers measured in mmHg: **systolic** (the pressure when the heart beats) over **diastolic** (the pressure between beats). This calculator sorts a reading into the standard categories: **Normal** is below 120/80, **Elevated** is systolic 120–129 with diastolic below 80, **Stage 1 Hypertension** is 130–139 or 80–89, **Stage 2 Hypertension** is 140 or higher, or 90 or higher, and **Hypertensive Crisis** is 180 or higher, or 120 or higher.",
        "It also calculates two derived figures. **Mean arterial pressure (MAP)** is the average pressure in the arteries during one heartbeat: MAP = diastolic + (systolic − diastolic) ÷ 3. **Pulse pressure** is the simple gap between the two numbers: systolic − diastolic.",
        "This calculator is for general information only and is not medical advice. A single reading is not a diagnosis — blood pressure rises and falls through the day with activity, stress, caffeine, and even the measurement itself. Repeated readings and a clinician's judgement are what turn numbers into a diagnosis.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a reading of **135/85 mmHg**. The systolic value of 135 falls in the 130–139 band, so the classification is **Stage 1 Hypertension**. Mean arterial pressure is 85 + (135 − 85) ÷ 3 = 85 + 16.7 = **101.7 mmHg**, and pulse pressure is 135 − 85 = **50 mmHg**.",
        "Compare a reading of **118/76 mmHg**: systolic below 120 and diastolic below 80, so it is **Normal**, with a MAP of 76 + (118 − 76) ÷ 3 = **90.0 mmHg** and a pulse pressure of **42 mmHg**. Small changes in either number can move a reading across a category boundary, which is why the exact category matters less than the overall pattern over time.",
      ],
    },
    {
      heading: "What do MAP and pulse pressure tell you?",
      paragraphs: [
        "Mean arterial pressure is the figure clinicians watch for whether organs are getting enough blood flow. A MAP roughly between 70 and 100 mmHg is generally considered adequate at rest; much lower can mean organs are under-perfused, and much higher over time strains the arteries.",
        "Pulse pressure tends to widen with age as arteries stiffen, so a large gap between systolic and diastolic is more common in older adults. Both figures are context for a clinician, not verdicts on their own — if your readings are consistently outside the normal range, or you have symptoms such as chest pain or severe headache, seek medical care rather than relying on a calculator.",
      ],
    },
  ],

  "caffeine-calculator": [
    {
      heading: "How is daily caffeine intake calculated?",
      paragraphs: [
        "This calculator adds up the caffeine in the drinks you enter, using a fixed average for each type: **coffee 95 mg per cup, tea 47 mg per cup, soda 40 mg per can, and energy drinks 160 mg per can**. Your total is compared with the **400 mg daily limit** that is generally cited as a safe upper amount for most healthy adults, and the result is shown as a percentage of that limit.",
        "The per-drink figures are averages, not exact values. A strong brewed coffee can hold well over 95 mg, a small espresso shot far less, and energy drinks vary widely by brand and can size. The total is therefore a reasonable estimate of a typical day, not a precise measurement.",
        "This calculator is for general information only and is not medical advice. Sensitivity to caffeine varies, and lower amounts are advised for people who are pregnant, sensitive to stimulants, or have certain health conditions — check with a clinician if you are unsure what level is right for you.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a day with **2 cups of coffee, 1 cup of tea, and 1 energy drink**. That is 2 × 95 + 47 + 160 = 190 + 47 + 160 = **397 mg** — **99.25% of the 400 mg limit**, so the calculator reports it as within the safe limit, but only just.",
        "Add one more coffee and the picture changes: **3 coffees and 1 energy drink** come to 3 × 95 + 160 = **445 mg**, which is over the limit. That is how easy it is to cross 400 mg — two strong coffees plus an energy drink can do it before lunch.",
      ],
    },
    {
      heading: "Where else caffeine hides",
      paragraphs: [
        "This calculator counts only the four drink types it asks about, but caffeine also appears in **chocolate, some pain relievers, pre-workout supplements, and certain teas and soft drinks** that are not labelled as energy drinks. If you consume those as well, your true daily total is higher than the number shown here.",
        "Timing matters as well as amount: caffeine has a half-life of roughly five to six hours, so a late-afternoon coffee can still be affecting sleep at midnight. If sleep is the concern, the total for the day is only half the story — when the last drink was matters too.",
      ],
    },
  ],

  "car-depreciation-calculator": [
    {
      heading: "How is car depreciation calculated?",
      paragraphs: [
        "This calculator estimates a car's value with **compound depreciation**: each year the car keeps a fixed percentage of the previous year's value, so the dollar loss shrinks over time even though the rate stays the same. The formula is **current value = purchase price × (1 − rate) ^ years**, where the rate is the annual depreciation percentage you enter.",
        "From that value it derives three more figures: **total depreciation** (purchase price minus current value), **average annual loss** (total depreciation divided by years owned), and **value retained** (current value as a percentage of the purchase price). Enter at least one year owned — the average annual loss divides by the number of years.",
        "The rate you enter is an estimate, and real depreciation is not a smooth curve. Most cars lose value fastest in the first year, then more slowly; brand, mileage, condition, and local demand all shift the real figure. Use the result as a planning estimate, not a guaranteed resale price.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a car bought for **$30,000** with an annual depreciation rate of **15%**, owned for **5 years**. The current value is $30,000 × 0.85⁵ = $30,000 × 0.4437 = **$13,311**. Total depreciation is $30,000 − $13,311 = **$16,689**, the average annual loss is $16,689 ÷ 5 = **$3,338**, and the value retained is **44.4%**.",
        "Notice the first year alone: after one year the car is worth $30,000 × 0.85 = **$25,500**, a $4,500 drop — more than the $3,338 average. That front-loaded loss is why the average annual figure understates the early years and overstates the later ones.",
      ],
    },
    {
      heading: "What makes one car hold value better than another?",
      paragraphs: [
        "Reliability reputation, fuel economy, and low running costs help a car keep its value; luxury cars and models with high maintenance costs tend to depreciate faster. Low mileage, a full service history, and a popular colour and specification also support resale value, while accident damage and gaps in servicing push it down.",
        "Because the calculator applies one steady rate, it cannot capture these differences — it treats every car the same. If you know a particular model holds value well, use a lower rate (say 10–12%); for a fast-depreciating model, use a higher one (say 20% or more). The existing FAQ's rule of thumb is 15–20% per year for most cars.",
      ],
    },
  ],

  "car-insurance-calculator": [
    {
      heading: "How is the insurance estimate calculated?",
      paragraphs: [
        "This calculator gives a rough estimate of annual car insurance cost from just three inputs. It starts with a base premium of **4% of the car's value per year**, then adjusts for driver age — **drivers under 25 pay 1.5× the base, and drivers over 65 pay 1.2×** — and finally reduces the premium for a higher deductible: each $1,000 of deductible cuts the premium by 6%, up to the formula's limit.",
        "The result is an **estimate, not a quote**. Real premiums depend on many things this tool never asks about: where you live, your driving record, how far you drive, the coverage type and limits, and the insurer itself. Two drivers with the same car and age can easily pay very different amounts.",
        "Keep the deductible within a realistic range (a few hundred to a few thousand dollars). The discount formula is designed for ordinary deductibles; very large values push the estimate outside any sensible range.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a car worth **$20,000**, a **30-year-old** driver, and a **$500 deductible**. The base premium is $20,000 × 4% = **$800** a year. Age 30 attracts no adjustment. The deductible discount is (500 ÷ 5000) × 0.3 = 3%, so the annual premium is $800 × 0.97 = **$776.00** — **$64.67 a month** and **$2.13 a day**.",
        "Change just the age to **22** and the base premium rises by half: $800 × 1.5 = $1,200, and after the same 3% deductible discount the annual premium becomes **$1,164.00**. That age adjustment alone adds $388 a year — the single biggest lever in this estimate.",
      ],
    },
    {
      heading: "What a real quote depends on that this tool ignores",
      paragraphs: [
        "Location is usually the largest missing factor: dense urban areas with more accidents and theft cost more to insure than quiet rural ones. Your driving record matters just as much — a clean record earns discounts, while accidents and tickets raise premiums for years.",
        "Coverage choices also move the price: liability-only cover is far cheaper than full cover, and the limits you choose set the ceiling on what the insurer pays. Use this calculator to get a ballpark figure for budgeting, then get quotes from several insurers — comparing three or more quotes is the most reliable way to find a fair price.",
      ],
    },
  ],

  "ceiling-fan-size-calculator": [
    {
      heading: "How is ceiling fan size chosen?",
      paragraphs: [
        "A ceiling fan is sized by the room's floor area: the fan's blade span (the diameter of the circle the blades sweep) must be large enough to move air across the whole room. This calculator multiplies **room length × room width** to get the area in square feet, then matches it to a standard size band.",
        "The bands are: up to **75 sq ft → 29–36 in**, up to **144 sq ft → 36–42 in**, up to **225 sq ft → 44–50 in**, up to **400 sq ft → 50–54 in**, and anything larger → **54–72 in**. The ranges overlap at the boundaries — a 36-inch fan appears in two bands — because the right size also depends on ceiling height, room shape, and how much airflow you want.",
        "Blade span is only part of the story. A fan that is too small leaves still corners; one that is too large can feel like a wind tunnel on its lowest setting and may not fit safely in a small room. The size band is a starting point, not a precise requirement.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a bedroom **12 ft long and 15 ft wide**. The area is 12 × 15 = **180 sq ft**, which falls in the 144–225 band, so the recommended fan size is **44–50 inches**.",
        "For comparison, a **10 × 10 ft** room is 100 sq ft, which needs a **36–42 inch** fan, while a large **20 × 20 ft** living room is 400 sq ft and needs a **50–54 inch** fan. If a room sits near a boundary — say 150 sq ft — either neighbouring size works; the larger one moves more air, the smaller one is quieter and less visually dominant.",
      ],
    },
    {
      heading: "What else affects the right fan besides room size?",
      paragraphs: [
        "Ceiling height matters: standard mounts suit 8–9 ft ceilings, while higher ceilings need a **downrod** to bring the fan blades to about 8–9 ft above the floor, where they move air effectively. On very low ceilings a flush (hugger) mount keeps the blades safely clear of head height.",
        "Blade count and pitch also affect airflow — more blades or a steeper pitch generally move more air but need a stronger motor. And in rooms with a strong draught or an open-plan layout, one fan may not be enough: very large spaces often work better with two smaller fans than one oversized one.",
      ],
    },
  ],

  "combination-calculator": [
    {
      heading: "How are combinations calculated?",
      paragraphs: [
        "A combination counts how many ways you can **choose r items from n items when the order does not matter**. The formula is **nCr = n! ÷ (r! × (n−r)!)**, where '!' means factorial — multiplying a number by every whole number below it. Choosing a 3-person committee from 10 people is a combination, because the same three people in a different order are still the same committee.",
        "This calculator also shows the probability of one specific combination: **1 ÷ nCr**, expressed as a percentage when it is not too small. Note that the tool **caps n at 30** (and r at n) — larger values are clamped to 30, so results for bigger problems must be worked out elsewhere.",
        "Combinations differ from **permutations**, where order does matter: arranging 3 people in a row from 10 gives far more results than merely choosing the same 3 people, because every arrangement of the same three counts separately.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Choose **3 items from 10**: C(10,3) = 10! ÷ (3! × 7!) = (10 × 9 × 8) ÷ (3 × 2 × 1) = 720 ÷ 6 = **120 combinations**. The chance of picking one particular set of three is 1 ÷ 120 = **0.8333%**.",
        "A smaller check: choose **2 from 5** and you get C(5,2) = (5 × 4) ÷ (2 × 1) = **10** — few enough to list by hand. By contrast, the same choice as a permutation would give 5 × 4 = 20, because each pair can be ordered two ways.",
      ],
    },
    {
      heading: "Where combinations actually get used",
      paragraphs: [
        "Lotteries are the classic example: the odds of matching all six numbers in a 6-from-49 draw are 1 in C(49,6) = 13,983,816 — though note that this tool caps n at 30, so it cannot compute that example directly. Card games, team selection, quality-control sampling, and genetics all use the same counting.",
        "A useful shortcut: C(n,r) always equals C(n, n−r), because choosing which r items to take is the same as choosing which n−r items to leave behind. So C(10,7) is the same as C(10,3) — 120 — which can save a lot of arithmetic when r is large.",
      ],
    },
  ],

  "cooking-time-calculator": [
    {
      heading: "How is cooking time calculated?",
      paragraphs: [
        "Roasting time for meat is estimated from its weight: **total cooking time = weight in pounds × minutes per pound**. The minutes-per-pound figure depends on the meat and the oven temperature, so this calculator asks you to enter it — common values are listed in the FAQ below, and the tool also converts your oven temperature between Fahrenheit and Celsius.",
        "The calculator also suggests a **rest time** after cooking: at least 10 minutes, or about 3 minutes per pound of meat, whichever is longer. Resting lets the juices redistribute through the meat instead of running out when it is cut, and the internal temperature keeps rising a few degrees while it rests.",
        "One honest limitation: the **oven temperature you enter is shown for reference only** — it does not change the cooking time. The time comes entirely from weight × minutes per pound, so if you roast hotter or cooler than the standard for that minutes-per-pound figure, the estimate will be off. Always check the internal temperature with a meat thermometer rather than trusting time alone.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Roast a **12 lb turkey at 14 minutes per pound** in a **325°F** oven. Total time = 12 × 14 = **168 minutes**, or **2 hours 48 minutes**. The recommended rest is 12 × 3 = **36 minutes** (well above the 10-minute minimum), and 325°F converts to **163°C**.",
        "A smaller example: a **5 lb chicken at 20 minutes per pound** needs 5 × 20 = **100 minutes (1 hour 40 minutes)** with a 15-minute rest. Both examples assume the bird goes into a fully preheated oven at the temperature the minutes-per-pound figure was written for.",
      ],
    },
    {
      heading: "Minutes per pound for common meats",
      paragraphs: [
        "As a guide: **turkey 13–15 min/lb at 325°F**, **beef roast 20–25 min/lb at 350°F** (medium), **pork loin 20–25 min/lb at 350°F**, and **chicken 20 min/lb at 350°F**. These are starting points — bone-in cuts, stuffed birds, and crowded ovens all take longer.",
        "The only reliable test of doneness is temperature: poultry is safe at 165°F (74°C) in the thickest part, beef and pork steaks and roasts at 145°F (63°C) plus a rest. Because ovens vary and thermometers are cheap, use this calculator to plan the schedule and the thermometer to decide when dinner is ready.",
      ],
    },
  ],

  "currency-exchange-calculator": [
    {
      heading: "How does currency exchange work here?",
      paragraphs: [
        "This calculator converts an amount from one currency to another by multiplying by an **exchange rate that you enter yourself**: converted amount = amount × rate. It does not fetch live rates and it holds no built-in rates — the default rate of 0.85 is only a starting value, so always replace it with a current rate from your bank or a currency service before trusting the result.",
        "It also accounts for the **service fee** many exchanges charge: the fee is a percentage of the converted amount, and the calculator shows the fee amount, what you actually receive after the fee, and the **effective rate** — the rate you really got once the fee is included. That effective rate is the honest number for comparing services.",
        "Exchange rates move constantly while markets are open, and the rate a bank or bureau offers you is always worse than the mid-market rate you see quoted online. This tool is for planning and comparison; the final figure comes from whoever actually makes the exchange.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Convert **$1,000 at a rate of 0.85** with a **2% service fee**. The converted amount is $1,000 × 0.85 = **€850.00**. The fee is 2% of €850 = **€17.00**, so you receive €850 − €17 = **€833.00**. The effective rate is €833 ÷ $1,000 = **0.8330** — noticeably worse than the headline 0.85.",
        "That gap is the point of the tool: a service advertising a good rate with a high fee can leave you worse off than a service with a slightly worse rate and no fee. Comparing effective rates, not headline rates, is how you find the better deal.",
      ],
    },
    {
      heading: "Why the amount you receive is always less than the converted figure",
      paragraphs: [
        "Currency services make money on the **spread** — the gap between the rate they buy currency at and the rate they sell it at — plus any flat fee or percentage commission. A '0% commission' offer usually just hides the charge inside a worse rate.",
        "For larger amounts, small rate differences matter a lot: on $10,000, a 1% worse rate costs $100. Check a current mid-market rate first, then compare the total you would actually receive from each service after fees, rather than comparing their advertised rates alone.",
      ],
    },
  ],

  "download-time-calculator": [
    {
      heading: "How is download time calculated?",
      paragraphs: [
        "Download time is the file size divided by the connection speed — with one catch: file sizes are measured in **megabytes (MB)** while speeds are measured in **megabits per second (Mbps)**, and one byte holds 8 bits. So the formula is **time in seconds = file size in MB × 8 ÷ speed in Mbps**.",
        "This calculator shows the result in the most readable unit — seconds for short downloads, minutes for medium ones, hours for very large files — plus the total seconds, the file size (shown in GB once it passes 1,000 MB), and the speed you entered.",
        "The result is a best-case estimate at a steady speed. Real downloads are almost always slower: network overhead, server limits, congestion, other devices sharing the connection, and Wi-Fi signal strength all eat into the advertised speed, which is itself a maximum rather than a guarantee.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Download a **500 MB** file on a **25 Mbps** connection. The file holds 500 × 8 = 4,000 megabits, so the time is 4,000 ÷ 25 = **160 seconds**, or about **2.7 minutes**.",
        "The same 160 seconds appears for a **2 GB (2,000 MB)** file on a **100 Mbps** connection: 2,000 × 8 = 16,000 megabits ÷ 100 = 160 seconds. Doubling both the file and the speed leaves the time unchanged — what matters is the ratio between them.",
      ],
    },
    {
      heading: "Why real downloads take longer than the estimate",
      paragraphs: [
        "Internet providers advertise speeds 'up to' a figure, and the speed you actually get varies with time of day and network load. On top of that, roughly 5–10% of the raw speed is consumed by protocol overhead — the addressing and error-checking data wrapped around your file.",
        "The server at the other end can also be the bottleneck: a slow or busy server will not feed your connection at full speed no matter how fast your plan is. If downloads are consistently much slower than this estimate, a speed test at different times of day will show whether the connection or the server is the limiting factor.",
      ],
    },
  ],

  "dpi-calculator": [
    {
      heading: "How is DPI calculated?",
      paragraphs: [
        "DPI — dots per inch — measures how densely an image's pixels are packed when printed. The formula is simple: **DPI = pixel width ÷ print width in inches**. A 3000-pixel-wide image printed 10 inches wide packs 300 dots into every inch; print the same image 20 inches wide and the density halves to 150 DPI.",
        "This calculator also reports the **print height** (pixel height ÷ DPI), the total **megapixels**, and a quality rating: **300 DPI or more is Excellent, 200–299 Good, 150–199 Acceptable, and below 150 Low**. Those bands match common print practice, where 300 DPI is the standard for sharp close-up prints.",
        "Note that DPI is calculated from the **width only** — the height follows from the image's aspect ratio, so the result assumes square pixels and no cropping. If you crop the image, recalculate with the cropped pixel dimensions.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take an image **3000 × 2000 pixels** printed **10 inches wide**. DPI = 3000 ÷ 10 = **300 DPI**, rated **Excellent**. The print height is 2000 ÷ 300 = **6.7 inches**, so the print is 10 × 6.7 inches, and the image holds 3000 × 2000 = 6,000,000 pixels, or **6.0 megapixels**.",
        "Print the same image **20 inches wide** instead and the DPI drops to 3000 ÷ 20 = 150 — merely Acceptable. To keep 300 DPI at that size you would need an image 6000 pixels wide. That trade-off between print size and sharpness is the whole point of the calculation.",
      ],
    },
    {
      heading: "What DPI do you actually need?",
      paragraphs: [
        "**300 DPI** is the standard for photos, books, and anything examined at arm's length. **150 DPI** is fine for posters and prints viewed from a few feet away, where the eye cannot resolve individual dots. **72 DPI** — the old screen standard — looks coarse in print but is irrelevant on screens, which display pixels directly rather than dots per inch.",
        "Going above 300 DPI rarely helps: most printers cannot reproduce detail beyond it, and the file just gets bigger. If your image falls short, printing slightly smaller is usually a better fix than upscaling, which adds pixels without adding real detail.",
      ],
    },
  ],

  "ev-charging-calculator": [
    {
      heading: "How is EV charging time calculated?",
      paragraphs: [
        "Charging time is the energy you need divided by the power the charger delivers: **time = kWh needed ÷ charger power in kW**. The energy needed comes from the battery size and how much charge you are adding: **kWh needed = battery size × (target % − current %) ÷ 100**. A bigger battery or a bigger top-up takes longer; a more powerful charger takes less time.",
        "This calculator also estimates the **cost** using a fixed electricity price of **$0.13 per kWh** and the **range added** at an assumed efficiency of **3.5 miles per kWh**. Both figures are approximations — your electricity rate and your car's real efficiency will differ — so treat them as planning numbers, not exact bills.",
        "One simplification to know: the calculator assumes **constant charging power** from start to finish. Real EVs charge fastest in the middle of the battery's range and slow down markedly above about 80%, so a top-up to 100% takes longer in practice than the steady-rate estimate suggests.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **75 kWh** battery charged from **20% to 80%** on a **7 kW** home charger. The energy needed is 75 × (80 − 20) ÷ 100 = **45.0 kWh**. Charging time is 45 ÷ 7 = 6.43 hours, shown as **6h 26m**. Cost is 45 × $0.13 = **$5.85**, and the range added is 45 × 3.5 = **158 miles**.",
        "On a **50 kW DC fast charger** the same 45 kWh would take 45 ÷ 50 = 0.9 hours — about 54 minutes — in this simplified model. In reality the car would slow down as it approached 80%, so the real fast-charge time would be somewhat longer than the estimate.",
      ],
    },
    {
      heading: "Charger levels and what they mean in practice",
      paragraphs: [
        "**Level 1** is a standard household outlet at about 1.4 kW — fine for overnight top-ups of a few dozen miles, but far too slow for a full charge. **Level 2** home and public chargers run at 7–19 kW and can fill most cars overnight. **DC fast charging** at 50–350 kW is for road trips, adding a large chunk of range in under an hour.",
        "For daily use, home Level 2 charging is usually the cheapest and most convenient option, and keeping the battery between roughly 20% and 80% for everyday driving is gentler on long-term battery health than routinely charging to 100%.",
      ],
    },
  ],

  "fertilizer-calculator": [
    {
      heading: "How is the amount of fertilizer calculated?",
      paragraphs: [
        "Lawns are fed by nitrogen, and fertilizer bags are labelled with three numbers — the **NPK ratio** — showing the percentages of nitrogen (N), phosphorus (P), and potassium (K) by weight. A bag marked 20-5-10 is 20% nitrogen, 5% phosphorus, and 10% potassium.",
        "This calculator works from the nitrogen alone. First it finds the nitrogen your lawn needs: **nitrogen needed = lawn area ÷ 1,000 × nitrogen rate** (pounds of nitrogen per 1,000 sq ft). Then it converts that into product: **product needed = nitrogen needed ÷ (nitrogen % ÷ 100)**. It also rounds up to whole 25 lb and 50 lb bags, since you cannot buy part of a bag.",
        "The nitrogen rate you enter is the key judgement call — a common maintenance rate is around 1 lb of nitrogen per 1,000 sq ft per application. Local guidance and the product label matter more than any rule of thumb, and more fertilizer is not better: excess nitrogen scorches grass and washes into waterways.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **5,000 sq ft** lawn, a nitrogen rate of **1 lb per 1,000 sq ft**, and a **20% nitrogen** fertilizer (the first number on the bag). Nitrogen needed = 5,000 ÷ 1,000 × 1 = **5.0 lbs**. Product needed = 5 ÷ 0.20 = **25.0 lbs** — exactly one 25 lb bag, or one 50 lb bag with half left over.",
        "Switch to a **10% nitrogen** product and the same lawn needs 5 ÷ 0.10 = 50 lbs of product — two 25 lb bags. Lower-nitrogen products are not worse; they simply take more bag weight to deliver the same feeding, which is why comparing products by price per bag alone is misleading.",
      ],
    },
    {
      heading: "What the calculator does not cover",
      paragraphs: [
        "Only the nitrogen number drives the amount — phosphorus and potassium are ignored. That is usually fine, because nitrogen is the nutrient lawns run short of most often, but a soil test is the only way to know whether your lawn also needs P or K.",
        "Application timing matters as much as amount: feeding during active growth (spring and autumn for cool-season grasses) gives the best uptake, while feeding dormant or heat-stressed grass wastes product. Water the lawn after applying granular fertilizer unless the label says otherwise, and keep it off paths and driveways where it washes straight into drains.",
      ],
    },
  ],

  "fibonacci-calculator": [
    {
      heading: "How are Fibonacci numbers calculated?",
      paragraphs: [
        "The Fibonacci sequence starts with **F(0) = 0 and F(1) = 1**, and every number after that is the **sum of the two before it**: F(n) = F(n−1) + F(n−2). So the sequence runs 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, and keeps growing, each step adding the previous two.",
        "This calculator shows **F(n)** for the position you enter, plus the next number **F(n+1)**, the **golden ratio φ = (1 + √5) ÷ 2 ≈ 1.61803399**, and the ratio of F(n) to F(n−1). As n grows, that ratio creeps closer and closer to φ — one of the most famous connections in mathematics.",
        "The tool **caps n at 70**, because Fibonacci numbers grow exponentially and F(70) is already over 190 trillion. Positions above 70 are clamped to 70, so the largest value it reports is F(70) = 190,392,490,709,135 — shown in exponential form as 1.9039e+14, since the tool switches to scientific notation above one trillion.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Find **F(10)**. Counting up from F(0) = 0 and F(1) = 1: F(2) = 1, F(3) = 2, F(4) = 3, F(5) = 5, F(6) = 8, F(7) = 13, F(8) = 21, F(9) = 34, and F(10) = 21 + 34 = **55**. The next number, F(11), is 34 + 55 = **89**.",
        "The ratio F(10) ÷ F(9) is 55 ÷ 34 = **1.617647** — already within 0.0004 of the golden ratio 1.61803399. By F(20) = 6,765 the match is closer still, which is why the ratio column is such a satisfying check that the sequence is behaving as the mathematics predicts.",
      ],
    },
    {
      heading: "Where Fibonacci numbers appear",
      paragraphs: [
        "Fibonacci numbers show up in nature — the spirals of pine cones and sunflowers, the petals of many flowers — and in art, architecture, and design, where the golden ratio is used as a proportion that the eye finds pleasing. They also appear in financial trading, computer algorithms, and even music.",
        "Part of the fascination is how a rule a child could follow — add the last two numbers — produces a sequence tied to one of mathematics' most celebrated constants. The calculator is a quick way to explore that: try a few positions and watch the ratio settle toward φ.",
      ],
    },
  ],

  "gcd-calculator": [
    {
      heading: "How is the greatest common divisor calculated?",
      paragraphs: [
        "The greatest common divisor (GCD) of two numbers is the **largest whole number that divides both of them exactly**. This calculator finds it with the **Euclidean algorithm**, a method over 2,000 years old: replace the larger number with the remainder of dividing it by the smaller, and repeat until the remainder is 0 — the last non-zero remainder is the GCD.",
        "The same two numbers also give the **least common multiple (LCM)** — the smallest number both divide into — through the identity LCM = (A × B) ÷ GCD. The calculator shows both, plus A ÷ GCD and B ÷ GCD, which are the two numbers with their common factor stripped out.",
        "The tool rounds its inputs to whole numbers and uses their absolute values, so decimals and negative signs do not change the result. Enter two non-zero whole numbers: with both inputs zero, the LCM has no defined value and the result is not meaningful.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Find the GCD of **48 and 36**. Divide 48 by 36: remainder 12. Divide 36 by 12: remainder 0. So the GCD is **12**. The LCM is (48 × 36) ÷ 12 = 1728 ÷ 12 = **144**. And 48 ÷ 12 = **4**, 36 ÷ 12 = **3** — the pair reduced to its simplest form.",
        "That reduction is the GCD's most common everyday use: the fraction 48/36 simplifies to **4/3** by dividing top and bottom by 12. Another example: GCD(270, 192) = **6**, found the same way — 270 ÷ 192 leaves 78, 192 ÷ 78 leaves 36, 78 ÷ 36 leaves 6, and 36 ÷ 6 leaves 0.",
      ],
    },
    {
      heading: "Where the GCD and LCM come in handy",
      paragraphs: [
        "Simplifying fractions is the classic use, but the GCD also answers practical questions: the largest square tile that fits a 48 × 36 inch floor exactly is 12 inches (the GCD), and the LCM tells you when two repeating cycles line up — two buses running every 48 and 36 minutes coincide every 144 minutes.",
        "The Euclidean algorithm is remarkably fast even for very large numbers, which is why it is still used in computer cryptography and algebra software today. For the small numbers on this page it finishes in a handful of steps, as the worked example shows.",
      ],
    },
  ],

  "gold-price-calculator": [
    {
      heading: "How is the value of gold calculated?",
      paragraphs: [
        "Gold is priced by the **troy ounce** (31.1035 grams — heavier than the ordinary ounce of 28.35 grams), and its value depends on weight and purity. This calculator converts the spot price you enter into a price per gram, then multiplies by the pure gold in your item: **value = weight × (karat ÷ 24) × (spot price ÷ 31.1035)**.",
        "Purity comes from the karat rating: 24K is pure gold, 22K is 22/24 = 91.7% pure, 18K is 75.0%, and 14K is 58.3%. The tool offers those four ratings — if your item is marked 10K or 9K, it is not covered here.",
        "The **spot price is entered by you** — the calculator holds no live price and does not fetch one, so check a current price from a financial source before calculating. Also note that the result is the **melt value** of the gold content, not what a buyer will pay: dealers and refiners pay below melt value to cover their costs and margin.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take **10 grams of 22K gold** with a spot price of **$2,400 per troy ounce**. Purity is 22 ÷ 24 = **91.7%**, so the item holds 10 × 0.9167 = **9.17 g of pure gold**. The price per gram is $2,400 ÷ 31.1035 = **$77.16**, giving a value of **$707.32** (the tool multiplies the unrounded figures: 9.1667 g × $77.1616).",
        "The same 10 grams in **24K at the tool's default $2,000 per ounce** would be worth 10 × ($2,000 ÷ 31.1035) = **$643.01**. Comparing the two examples shows how much both the karat and the spot price move the answer — always confirm both before relying on the figure.",
      ],
    },
    {
      heading: "Melt value is not the selling price",
      paragraphs: [
        "A buyer will offer less than the melt value — typically 70–95% of it depending on the buyer, the item, and the market — because refining, assaying, and reselling all cost money. Jewellery also carries craftsmanship value that the melt calculation ignores entirely, though second-hand jewellery rarely sells for its original retail price.",
        "One detail to check: the tool treats 24K as 100% pure, although its own label describes 24K as 99.9% — the difference is a tenth of a percent and rarely matters, but it is a reminder that this is an estimate, not an assay. For a valuable item, a professional appraisal is worth the fee.",
      ],
    },
  ],

  "hex-to-decimal-calculator": [
    {
      heading: "What does this calculator actually convert?",
      paragraphs: [
        "Hexadecimal (hex) is the base-16 number system, using the digits 0–9 plus the letters **A–F for the values 10–15**. It is a compact way of writing binary: each hex digit stands for exactly four bits, so one byte is always two hex digits.",
        "One important detail about this tool: despite the page name, **it converts from decimal to hexadecimal, not the other way round**. The input is a plain decimal number, and the tool shows its hex, binary, and octal forms. It cannot accept hex letters such as A–F because the input field only takes numbers — to convert hex to decimal, use the explanation below and check the result by entering the decimal answer here.",
        "The hex-to-decimal rule is: multiply each hex digit by 16 raised to its position (from the right, starting at 0) and add them up. So 0x1A3 = 1 × 256 + 10 × 16 + 3 = **419**.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Enter the decimal number **255**. The tool shows **0xFF** in hexadecimal, **11111111** in binary, and **0o377** in octal. Check the hex by hand: F stands for 15, so 0xFF = 15 × 16 + 15 = 240 + 15 = **255** — the same number, as expected.",
        "The other direction works the same way: **0xFF** converts back to 255, and **0x1A3** is 1 × 256 + 10 × 16 + 3 × 1 = **419**. Each hex digit to the left is worth sixteen times the one to its right, just as each decimal digit is worth ten times the one to its right.",
      ],
    },
    {
      heading: "Where hexadecimal is used",
      paragraphs: [
        "Hex is everywhere in computing: **colour codes** like #FF0000 (red) are three bytes in hex, **memory addresses** and **MAC addresses** are written in hex, and programmers use it to describe binary data compactly. A single hex digit replaces four binary digits, which is why long binary strings are almost always shown in hex instead.",
        "Because this tool works decimal-to-hex, it is most useful as a quick check: enter a decimal value you know and read off the hex, binary, and octal forms together. For converting a hex value you already have, apply the place-value rule above — or enter the decimal result here to confirm it matches.",
      ],
    },
  ],

  "hourly-rate-calculator": [
    {
      heading: "How is a freelance hourly rate calculated?",
      paragraphs: [
        "A sustainable freelance rate starts from the annual income you need and divides it by the hours you can actually bill. The formula is **hourly rate = (desired salary + annual expenses) ÷ ((52 − vacation weeks) × billable hours per week)**. The expenses figure covers the costs of running your freelance work — software, equipment, insurance, marketing — that an employer would normally pay for you.",
        "The denominator is the part most new freelancers get wrong: you cannot bill 40 hours a week for 52 weeks. Holidays, sick days, admin, pitching, and gaps between projects all eat into billable time, which is why the calculator asks for vacation weeks and billable hours separately.",
        "The rate this produces covers your salary and expenses only. It does **not** include income tax, retirement savings, or health cover — all of which you must fund yourself as a freelancer — so treat the result as a floor, not a finished price.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Aim for a **$60,000** salary with **$10,000** of annual expenses, working **30 billable hours a week** with **4 weeks of vacation**. Work weeks = 52 − 4 = **48**, billable hours per year = 48 × 30 = **1,440**, and annual revenue needed = $60,000 + $10,000 = **$70,000**. The hourly rate is $70,000 ÷ 1,440 = **$48.61**, and monthly revenue needed is $70,000 ÷ 12 = **$5,833.33**.",
        "Drop the billable hours to 20 a week and the same $70,000 must come from 960 hours, pushing the rate to **$72.92** an hour. That is the trade-off freelancers live with: fewer billable hours mean a higher rate is needed to earn the same living.",
      ],
    },
    {
      heading: "What to add on top of this rate",
      paragraphs: [
        "Tax is the biggest missing piece: as a freelancer you pay both the employee's and the employer's share of payroll taxes in many systems, plus income tax, so setting aside 25–30% of revenue for tax is a common rule of thumb. Retirement contributions and health insurance are also yours to fund.",
        "Non-billable time is the other hidden cost — quoting, invoicing, chasing payments, and learning new tools all take hours you cannot charge for. Many experienced freelancers add 10–20% to their calculated rate as a buffer for exactly these costs, and raise it further when demand for their work is strong.",
      ],
    },
  ],

  "invoice-calculator": [
    {
      heading: "How is an invoice total calculated?",
      paragraphs: [
        "An invoice total is built in a fixed order: **discount first, then tax**. The discount is a percentage of the subtotal, and the tax is charged on the amount left after the discount — not on the original subtotal. So total due = (subtotal − discount) + tax on the discounted amount.",
        "This calculator takes the subtotal, a discount percentage, and a tax rate, and shows each line separately: the subtotal, the discount as a negative amount, the tax as a positive amount, and the total due. Keeping the lines visible makes it easy to check the arithmetic before sending the invoice.",
        "The tool handles a single subtotal only — it has no line items. If an invoice has several products or services, add them together first and enter the combined subtotal.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a subtotal of **$500** with a **10% discount** and **8% tax**. The discount is $500 × 10% = **$50.00**, leaving $450.00. Tax is $450 × 8% = **$36.00**. The total due is $450 + $36 = **$486.00**.",
        "Notice the order matters: if tax were charged on the full $500 first, the tax would be $40 instead of $36 and the total would be $490. The $4 difference is the tax saved on the discounted portion — small here, but it scales with the invoice size, and most tax rules require the discount-first order this calculator uses.",
      ],
    },
    {
      heading: "Discounts, tax, and getting paid",
      paragraphs: [
        "A discount is a real cost: 10% off a $500 invoice is $50 of revenue given away, so offer discounts deliberately — for early payment, for example — rather than by habit. Tax rates vary by location and by what is being sold, and some goods and services are exempt, so confirm the correct rate for your situation rather than guessing.",
        "For the invoice itself, the essentials are a unique invoice number, the date, payment terms (such as 'due within 14 days'), and a clear breakdown of what was sold. A calculator gives you the numbers; clear terms are what get the invoice paid on time.",
      ],
    },
  ],

  "lawn-seed-calculator": [
    {
      heading: "How much grass seed do you need?",
      paragraphs: [
        "Grass seed is sold by weight and sown at a rate per 1,000 square feet, so the calculation is: **seed needed = (lawn area ÷ 1,000) × seed rate**. The lawn area is simply length × width in feet, and the seed rate depends on the grass type — fine grasses need far less seed per square foot than coarse ones.",
        "This calculator also shows the amount for **overseeding** — sowing into an existing lawn to thicken it — which is **half the new-lawn rate**, and rounds the total up to whole **5 lb bags**, since seed is sold in bags rather than by the pound.",
        "The rate you enter is the main judgement call. Typical new-lawn rates are **Kentucky bluegrass 2–3 lbs, Bermuda 1–2 lbs, and tall fescue 6–8 lbs per 1,000 sq ft**. Always check the bag label for the variety you are buying, since rates vary by cultivar and by region.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a lawn **40 ft long and 60 ft wide** — an area of 40 × 60 = **2,400 sq ft** — sown with fescue at **6 lbs per 1,000 sq ft**. Seed needed = (2,400 ÷ 1,000) × 6 = **14.4 lbs**. For overseeding the same lawn you would need half that, **7.2 lbs**.",
        "Buying 14.4 lbs means **three 5 lb bags** (15 lbs total), because two bags would only give 10 lbs. The small surplus is useful: it covers thin patches and gives you seed for repairs later in the season.",
      ],
    },
    {
      heading: "Getting the seed to grow",
      paragraphs: [
        "Seed needs contact with soil, moisture, and the right temperature — usually soil above 50°F (10°C) for cool-season grasses and above 65°F (18°C) for warm-season ones. Scattering seed onto dry, hard ground or into the heat of midsummer wastes most of it, however accurate the quantity.",
        "Water lightly and often until the seedlings are established, then switch to deeper, less frequent watering. Sowing in early autumn suits cool-season grasses best: warm soil, cooler air, and less competition from weeds give new grass the strongest start.",
      ],
    },
  ],

  "led-savings-calculator": [
    {
      heading: "How are LED savings calculated?",
      paragraphs: [
        "Switching a bulb to LED saves money because an LED produces the same light with far fewer watts. The annual cost of running any bulb is **bulbs × watts × hours per day × 365 ÷ 1,000 × electricity rate**, which converts watts into kilowatt-hours and then into money. This calculator runs that formula twice — once for the old bulbs, once for the LEDs — and the difference is the annual saving.",
        "It also shows the **energy reduction** as a percentage: (old watts − LED watts) ÷ old watts. A 60W bulb replaced by a 9W LED uses 85% less energy for the same light, which is why the savings are so large relative to the effort involved.",
        "The result compares **running costs only** — it does not subtract the price of the LED bulbs themselves. To work out the payback time, divide what the bulbs cost by the annual saving; with cheap bulbs and heavy use, payback is often a matter of months.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Replace **10 bulbs** from **60W to 9W**, used **5 hours a day**, at an electricity rate of **$0.15 per kWh**. The old bulbs use 10 × 60 × 5 × 365 ÷ 1,000 = **1,095 kWh a year**, costing **$164.25**. The LEDs use 10 × 9 × 5 × 365 ÷ 1,000 = **164.25 kWh**, costing **$24.64**. The annual saving is $164.25 − $24.64 = **$139.61**, an **85%** energy reduction.",
        "If the ten LED bulbs cost $30 in total, the payback time is $30 ÷ $139.61 ≈ 0.21 years — about **two and a half months**. After that, the saving is pure gain, and LEDs also last far longer than old bulbs, so replacement costs fall too.",
      ],
    },
    {
      heading: "Where the biggest savings hide",
      paragraphs: [
        "The bulbs that run longest save the most: kitchen, living-room, and outdoor lights that burn five or more hours a day repay an LED swap quickly, while a bulb in a rarely used cupboard may take years to pay back. Start with the high-use rooms first.",
        "Wattage is not brightness — match the **lumens**, not the watts, when choosing a replacement. A 60W old bulb gives about 800 lumens, which a 9–10W LED matches; buying on watts alone can leave a room dimmer than expected.",
      ],
    },
  ],

  "logarithm-calculator": [
    {
      heading: "How is a logarithm calculated?",
      paragraphs: [
        "A logarithm answers the question: **to what power must the base be raised to get this number?** So log₂(64) = 6 because 2⁶ = 64, and log₁₀(1000) = 3 because 10³ = 1000. This calculator uses the **change-of-base formula** — log_b(x) = ln(x) ÷ ln(b) — which works for any base.",
        "Alongside your chosen base, it always shows the three most common logarithms: the **natural log (ln, base e ≈ 2.71828)**, **log base 10**, and **log base 2**. Base 10 suits orders of magnitude and scientific scales, base e appears throughout calculus and growth mathematics, and base 2 is the natural choice in computing.",
        "Logarithms are only defined for **positive numbers** with a **positive base that is not 1**. Entering zero, a negative number, or a base of 1 produces NaN or Infinity rather than a result — the tool does not validate its inputs, so check yours before trusting the output.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take the number **64** with base **2**. Since 2⁶ = 64, **log₂(64) = 6.000000**. The same number's other logarithms are ln(64) = **4.158883**, log₁₀(64) = **1.806180**, and log₂(64) = **6.000000** — the calculator shows all four together so you can compare bases at a glance.",
        "Another check: **log₅(125) = 3**, because 5³ = 125. And log₁₀(100) = 2, which shows the base-10 logarithm simply counting the zeros for powers of ten — the reason it is used for scales like pH, decibels, and the Richter scale, where each whole step means ten times as much.",
      ],
    },
    {
      heading: "Where logarithms show up",
      paragraphs: [
        "Anything that grows or shrinks by multiplication rather than addition is naturally described with logarithms: **compound interest, population growth, radioactive decay, and the spread of an infection** all become straight lines on a log scale, which is why scientists and analysts reach for them.",
        "Everyday scales hide logarithms too. A sound 10 decibels louder carries ten times the energy, a magnitude-6 earthquake releases about 32 times the energy of a magnitude-5 one, and each whole pH step means a tenfold change in acidity. Logarithms are how we keep such enormous ranges readable.",
      ],
    },
  ],

  "margin-calculator": [
    {
      heading: "How is profit margin calculated?",
      paragraphs: [
        "Profit margin is the share of your revenue that is left as profit, expressed as a percentage. **Gross margin is (revenue − cost of goods) ÷ revenue × 100**, and **net margin subtracts operating expenses as well** before dividing by revenue.",
        "This calculator shows both figures from the same three inputs. Gross profit is revenue minus the direct cost of what you sold; net profit is gross profit minus operating expenses such as rent, salaries, and marketing. Dividing each by revenue turns them into margins you can compare across products, months, or businesses of different sizes.",
        "Margin is always measured against **revenue (the selling price)**, not against cost. That is what separates it from markup, which is measured against cost: a product bought for $60 and sold for $100 has a 40% margin but a 66.7% markup on cost.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a month with **$10,000 of revenue, $6,000 in cost of goods, and $2,000 in operating expenses**. Gross profit is $10,000 − $6,000 = **$4,000**, so gross margin is $4,000 ÷ $10,000 × 100 = **40.0%**.",
        "Net profit is $4,000 − $2,000 = **$2,000**, so net margin is $2,000 ÷ $10,000 × 100 = **20.0%**. Half of the gross profit is absorbed by operating expenses — which is exactly why the two margins tell different stories, and why this calculator shows both.",
      ],
    },
    {
      heading: "What is a good profit margin?",
      paragraphs: [
        "It depends on the industry: a 10–20% net margin is generally considered healthy, but grocery stores run happily on 1–3% while software companies often exceed 20%. Compare your margin with businesses like yours, not with a universal target.",
        "To improve margin you have three levers: **raise prices**, **lower the cost of goods** (cheaper suppliers, less waste), or **cut operating expenses**. Raising prices is usually the fastest lever — on $10,000 of revenue, a 5% price rise with no change in costs adds $500 straight to profit.",
        "Watch the two margins separately. If gross margin is strong but net margin is thin, the problem is overhead, not pricing. If gross margin itself is thin, no amount of cost-cutting on expenses will fix the business — the price or the product cost has to change.",
      ],
    },
  ],

  "median-calculator": [
    {
      heading: "How is the median calculated?",
      paragraphs: [
        "The median is the **middle value of a sorted list of numbers**. Sort the values from smallest to largest and take the one in the middle — half the values are above it and half below it.",
        "This calculator works with **exactly five values**. Enter them in any order: it sorts them, picks the middle one as the median, and also shows the mean, the range, and the minimum and maximum so you can see how the median compares with the average.",
        "The median is useful because a single extreme value barely moves it, while the mean can be pulled a long way. That is why incomes and house prices are usually reported as medians: one billionaire in a survey would distort the mean but leave the median almost untouched.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Enter the values **12, 7, 25, 18, and 9**. Sorted, they are **7, 9, 12, 18, 25**, and the middle value — the third of five — is **12**, so the median is 12.",
        "The mean is (7 + 9 + 12 + 18 + 25) ÷ 5 = 71 ÷ 5 = **14.2**, noticeably higher than the median because the outlier 25 pulls the average up. The range is 25 − 7 = **18**, with a minimum of 7 and a maximum of 25.",
      ],
    },
    {
      heading: "When should you use the median instead of the mean?",
      paragraphs: [
        "Use the median when your data is **skewed** — when a few very large or very small values would drag the mean away from the typical value. Salaries, house prices, and waiting times are classic cases.",
        "Use the mean when every value matters equally and there are no strong outliers, for example when averaging test scores or daily temperatures. When the two are close together, the data is fairly symmetric and either figure describes it well.",
        "Because this calculator takes five values, it is best for quick checks and small data sets. For larger lists, the same rule applies: sort the values and take the middle one (or the average of the two middle ones, if the count is even).",
      ],
    },
  ],

  "modulo-calculator": [
    {
      heading: "What is the modulo operation?",
      paragraphs: [
        "Modulo gives you the **remainder after division**. 17 mod 5 is 2, because 17 ÷ 5 = 3 with 2 left over. It answers the question 'what is left?' rather than 'how many times does it fit?'",
        "The relationship is **dividend = quotient × divisor + remainder**. This calculator shows all three parts: the remainder, the whole-number quotient, and the full division written out, plus whether the dividend is even or odd.",
        "Dividing by zero has no answer, so if you enter 0 as the divisor the calculator shows an error instead of a result.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Enter a dividend of **17** and a divisor of **5**. 5 fits into 17 three whole times (3 × 5 = 15), leaving **17 − 15 = 2**, so the remainder is **2** and the quotient is **3**.",
        "The calculator writes this out as **17 = 3 × 5 + 2**, and reports that 17 is odd — because 17 mod 2 = 1, there is a remainder of 1 when dividing by 2.",
      ],
    },
    {
      heading: "Where is modulo used?",
      paragraphs: [
        "Modulo is how clocks work: 15:00 is 3 o'clock because 15 mod 12 = 3. The same idea cycles through anything that repeats — days of the week, array positions in programming, and rotating schedules.",
        "It is also the standard test for even and odd numbers: a number is even when n mod 2 = 0 and odd when n mod 2 = 1. Hash functions and cryptography use modulo heavily to keep results inside a fixed range.",
        "A practical everyday use is splitting things evenly: 17 items shared among 5 people give 3 each with 2 left over — the remainder is exactly what modulo returns.",
      ],
    },
  ],

  "password-strength-calculator": [
    {
      heading: "How is password strength measured?",
      paragraphs: [
        "Password strength is measured as **entropy in bits: length × log₂(pool size)**, where the pool is the number of different characters that could appear in each position. More bits means more possible passwords, and therefore more guesses for an attacker to try.",
        "This calculator offers four character pools: lowercase only (26 characters), lower plus upper case (52), letters plus numbers (62), and all characters including symbols (95). It rates the result **Weak below 40 bits, Moderate from 40, Strong from 60, and Very Strong from 80 bits**, and estimates crack time assuming an attacker can try 10 billion guesses per second.",
        "The estimate assumes the password is **random** — every character chosen independently. A real word, a name, or a common pattern is far weaker than its entropy suggests, because attackers try dictionary words and leaked passwords first.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "A **12-character password using all 95 characters** has entropy of 12 × log₂(95) = **78.8 bits**, rated **Strong**. The number of possible combinations is 95¹², about **5.40 × 10²³** — at 10 billion guesses per second, trying them all would take about **1,715,429 years**.",
        "Compare an **8-character lowercase-only password**: entropy is 8 × log₂(26) = **37.6 bits**, rated **Weak**. There are only about 209 billion combinations, and at the same guessing rate they fall in about **21 seconds**. Four extra characters and a bigger pool turn seconds into millions of years.",
      ],
    },
    {
      heading: "How can you make a password stronger?",
      paragraphs: [
        "**Length beats complexity.** Each extra character multiplies the combinations by the pool size, so going from 8 to 12 characters with the same character set multiplies the guessing work by 95⁴ — roughly 81 million times — for a full character set.",
        "The easiest way to get length is a **passphrase**: four or five unrelated words strung together. It is long, memorable, and hard to guess — far better than a short password with a symbol swapped in.",
        "Use a **different password for every important account** and a password manager to remember them. Strength only helps if the password is unique: a very strong password reused across sites is compromised the moment any one of those sites leaks it.",
      ],
    },
  ],

  "permutation-calculator": [
    {
      heading: "How are permutations calculated?",
      paragraphs: [
        "A permutation is an **arrangement where order matters**, and the count is **nPr = n! ÷ (n−r)!** — the number of ways to pick r items from n and arrange them. The exclamation mark means factorial: n! is n × (n−1) × … × 1.",
        "This calculator also shows the matching **combination count, nCr = n! ÷ (r! × (n−r)!)**, where order does not matter, plus the values of n! and (n−r)! so you can see the working. It accepts n up to 20 and always keeps r no larger than n.",
        "The difference between the two counts is the factor r!: every combination of r items can be arranged in r! different orders, so permutations always outnumber combinations by exactly that factor.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take **n = 10 items and choose r = 3**. The number of permutations is 10P3 = 10! ÷ 7! = 3,628,800 ÷ 5,040 = **720** — equivalently 10 × 9 × 8, since the first pick has 10 options, the second 9, and the third 8.",
        "The number of combinations is 10C3 = 10! ÷ (3! × 7!) = **120**. The ratio 720 ÷ 120 = 6 is exactly 3! — each set of 3 items can be ordered 6 ways, and permutations count every ordering separately.",
      ],
    },
    {
      heading: "When do permutations apply?",
      paragraphs: [
        "Use permutations whenever **the order of the result matters**: the finishing order of a race, the digits of a lock code, or the batting order of a team. Swapping two items gives a genuinely different outcome.",
        "Use combinations when order does **not** matter: lottery numbers, a committee chosen from a group, or a hand of cards. ABC and CBA are the same committee, so combinations are the right count.",
        "A quick check: if rearranging the chosen items changes the result, you need permutations; if it does not, you need combinations. This calculator shows both, so you can compare them for the same n and r.",
      ],
    },
  ],

  "photo-print-size-calculator": [
    {
      heading: "How big can I print my photo?",
      paragraphs: [
        "The maximum print size is **pixels ÷ DPI (dots per inch)**. At 300 DPI — professional print quality — a 4032 × 3024 photo prints at 13.4 × 10.1 inches; at 150 DPI the same photo stretches to 26.9 × 20.2 inches.",
        "This calculator works from the pixel dimensions of your image. It reports the megapixel count (width × height ÷ 1,000,000) and the largest print at both **300 DPI for excellent quality** and **150 DPI, which is acceptable for large posters** viewed from a distance.",
        "The shape of the print follows the shape of the image: a 4032 × 3024 photo has a 4:3 aspect ratio, so it fits 8 × 6 or 12 × 9 inch frames without cropping, but would need trimming for a 10 × 8 frame.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Enter an image **4032 pixels wide and 3024 pixels tall** — a typical 12-megapixel phone photo. The megapixel count is 4032 × 3024 ÷ 1,000,000 = **12.2 MP**.",
        "At 300 DPI the maximum print is 4032 ÷ 300 = **13.4 inches** wide and 3024 ÷ 300 = **10.1 inches** tall. At 150 DPI it doubles: **26.9 × 20.2 inches**. So the same photo makes a crisp 13 × 10 inch print, or a poster over two feet wide if you accept the lower resolution.",
      ],
    },
    {
      heading: "What DPI should you print at?",
      paragraphs: [
        "**300 DPI is the standard for prints you hold or view up close** — photo books, framed prints, and anything examined at arm's length. Below about 240 DPI, sharp-eyed viewers start to notice softness in a close-up print.",
        "**150 DPI is fine for posters and wall art** viewed from a few feet away, where the eye cannot resolve individual dots. Billboards print at far lower DPI still, because nobody views them from two feet away.",
        "Cropping shrinks your printable size: cutting a photo in half in each direction quarters the pixel count and halves each print dimension. If you plan to print large, crop as little as possible and keep the original full-resolution file.",
      ],
    },
  ],

  "pool-volume-calculator": [
    {
      heading: "How do you calculate pool volume?",
      paragraphs: [
        "For a rectangular pool, the volume is **length × width × average depth × 7.48 gallons per cubic foot**. Multiply the three dimensions to get cubic feet, then convert to gallons.",
        "The tricky input is **average depth**: add the shallow-end depth to the deep-end depth and divide by 2. A pool that runs from 3 feet to 7 feet deep has an average depth of 5 feet. This calculator also converts the result to liters (gallons × 3.785) and estimates the cost of filling the pool at $5 per 1,000 gallons.",
        "The formula assumes a rectangular pool with a roughly even slope. For round or oval pools, or pools with large steps and benches, the result is an approximation — measure the main body of the pool and treat shelves and steps as extra.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a pool **30 feet long, 15 feet wide, with an average depth of 5 feet**. The volume is 30 × 15 × 5 = **2,250 cubic feet**.",
        "In gallons that is 2,250 × 7.48 = **16,830 gallons**, or 16,830 × 3.785 = **63,702 liters**. At the calculator's $5 per 1,000 gallons, filling it costs about **$84.15** — check your local water rate, since prices vary widely by area.",
      ],
    },
    {
      heading: "Why does pool volume matter?",
      paragraphs: [
        "**Chemical dosing depends on it.** Chlorine, pH adjusters, and algaecides are all dosed per gallon, so guessing the volume means either under-treating the water or wasting chemicals. A 16,830-gallon pool needs roughly twice the chlorine of an 8,000-gallon pool.",
        "It also sizes your equipment: pumps, filters, and heaters are rated by how many gallons they can handle, and running costs scale with volume. Knowing the exact figure makes quotes comparable.",
        "If your pool has a sloped floor, re-measure the average depth rather than guessing — a one-foot error in depth on a 30 × 15 pool changes the volume by 3,366 gallons, about 20% of the total.",
      ],
    },
  ],

  "price-per-sqft-calculator": [
    {
      heading: "How is price per square foot calculated?",
      paragraphs: [
        "Price per square foot is simply **the property price divided by its square footage**. A $350,000 home with 1,800 square feet costs $194.44 per square foot.",
        "This calculator also converts the figure to **price per square meter by multiplying by 10.764**, since one square meter equals 10.764 square feet. It shows the total price and total area alongside, so you can check the inputs at a glance.",
        "The figure is most useful for **comparing similar homes in the same area**. It strips out size differences so a 1,200 sq ft condo and a 2,400 sq ft house can be compared on equal terms — at least on price.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Enter a property price of **$350,000** and **1,800 square feet**. The price per square foot is $350,000 ÷ 1,800 = **$194.44**.",
        "Per square meter that is $194.44 × 10.764 = **$2,093.00**. If a second home nearby is listed at $210 per square foot, it is about 8% more expensive per unit of space — a gap worth investigating before offering.",
      ],
    },
    {
      heading: "What price per square foot does not tell you",
      paragraphs: [
        "It says nothing about **condition, age, land, or location**. A renovated home and a fixer-upper on the same street can have very different prices per square foot, and both can be fairly priced — the figure alone cannot tell you which is the better buy.",
        "It also ignores what is included in the square footage: finished basements, garages, and porches are counted differently by different listings, so two homes with the same headline figure may not be directly comparable. Check what the area includes before comparing.",
        "Use it as a **screening tool, not a valuation**. As a rough guide, the US national average sits around $150–$200 per square foot, but it varies hugely by location — the same figure that is cheap in one city is expensive in another.",
      ],
    },
  ],

  "prime-number-checker": [
    {
      heading: "How do you check if a number is prime?",
      paragraphs: [
        "A prime number is a whole number **greater than 1 that is divisible only by 1 and itself**. To test a number n, you only need to check divisibility by numbers from 2 up to the square root of n — if none of them divide evenly, the number is prime.",
        "This calculator runs that test for you and goes further: it finds the **next prime and the previous prime**, and for numbers that are not prime it lists the factors it found. For prime numbers it shows the digit count instead.",
        "Checking up to the square root is enough because factors come in pairs: if n has a factor larger than √n, it must also have a partner factor smaller than √n, so the smaller one would already have been found.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Enter **97**. The calculator tests divisibility from 2 up to √97 (about 9.8): 97 is not divisible by 2, 3, 5, or 7, so the answer is **Yes — 97 is prime**. The next prime is **101**, the previous prime is **89**, and 97 has **2 digits**.",
        "Now enter **91**. It looks prime at a glance, but 91 ÷ 7 = 13, so the answer is **No — 91 is not prime**, with factors **7 and 13**. Its neighbouring primes are the same pair: next **97**, previous **89**.",
      ],
    },
    {
      heading: "Why do prime numbers matter?",
      paragraphs: [
        "Primes are the **building blocks of all whole numbers**: every number greater than 1 is either prime or can be broken into prime factors, in exactly one way. That is why the factor list this calculator shows is so useful for mental arithmetic and fractions.",
        "They also secure the internet. Public-key encryption multiplies two very large primes together; the product is public, but recovering the original primes from it is so slow that the encryption holds. The security of online banking rests on how hard factoring is.",
        "A few facts worth knowing: **2 is the only even prime**, 1 is not prime (it has only one divisor), and there are infinitely many primes — a fact proved over 2,000 years ago.",
      ],
    },
  ],

  "profit-calculator": [
    {
      heading: "How is profit calculated?",
      paragraphs: [
        "Profit per unit is **selling price minus cost price**, and total profit is profit per unit multiplied by the number of units sold. Sell 100 units at a $45 profit each and you make $4,500.",
        "This calculator shows four figures: profit per unit, **Profit %**, total profit, and total revenue. Note that the Profit % here is measured against **cost** — profit ÷ cost × 100 — which is the return on what you paid for the goods, sometimes called markup. It is not the same as margin, which is measured against the selling price.",
        "Total revenue is selling price × units sold. It is the money coming in, not the money you keep — profit is what remains after the cost of the goods is subtracted.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Buy a product for **$75**, sell it for **$120**, and sell **100 units**. Profit per unit is $120 − $75 = **$45**, and Profit % is $45 ÷ $75 × 100 = **60.0%**.",
        "Total profit is $45 × 100 = **$4,500**, and total revenue is $120 × 100 = **$12,000**. For comparison, the margin on the selling price would be $45 ÷ $120 = 37.5% — the same sale, measured against a different base.",
      ],
    },
    {
      heading: "Profit vs margin — which should you watch?",
      paragraphs: [
        "Watch **both**. Profit % against cost tells you how much each dollar you spend on stock earns back; margin against price tells you how much of each sales dollar you keep. A 60% profit on cost sounds generous, but the same sale keeps only 37.5 cents of each dollar of revenue.",
        "If profit per unit is thin, you need volume to make the business work; if it is fat, each sale counts more. Use this calculator to test the trade-off: a lower price may sell more units but shrink the profit on each one, and the total profit can go either way.",
        "Remember that this calculator covers the **cost of goods only**. Rent, shipping, fees, and your time come out of the gross profit it shows, so the real bottom line is lower than the figure here.",
      ],
    },
  ],

  "proportion-calculator": [
    {
      heading: "How do you solve a proportion?",
      paragraphs: [
        "A proportion is two equal ratios, written **A/B = C/D**. To find the missing value, cross-multiply: **D = (B × C) ÷ A**. The calculator solves for D from the three values you enter.",
        "It also shows both ratios as decimals, so you can check that they match — if A/B and C/D are equal, the proportion holds. The full proportion is written out with the solved value filled in.",
        "Proportions only work when the relationship is genuinely proportional: doubling one side must double the other. If the relationship has a fixed fee or a minimum, a proportion will give the wrong answer.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Solve **3/4 = 9/D**. Cross-multiplying gives D = (4 × 9) ÷ 3 = 36 ÷ 3 = **12**.",
        "Check the ratios: 3 ÷ 4 = **0.75** and 9 ÷ 12 = **0.75**. They match, so the proportion holds: 3 is to 4 as 9 is to 12.",
      ],
    },
    {
      heading: "Where do proportions show up?",
      paragraphs: [
        "**Scaling recipes and mixtures**: if 3 cups of flour serve 4 people, 9 cups serve 12. The same math scales paint, concrete, and any recipe up or down.",
        "**Maps and scale drawings**: a scale of 1:50 means 1 cm on the drawing is 50 cm in reality, so a 9 cm line on the plan is a 4.5 m wall. Unit prices work the same way — comparing a 12 oz bottle with a 20 oz bottle is a proportion problem.",
        "A classic classroom use is **similar triangles**: the sides of two similar shapes are in proportion, so measuring one triangle lets you calculate the other without measuring it at all.",
      ],
    },
  ],

  "recipe-scaler-calculator": [
    {
      heading: "How do you scale a recipe?",
      paragraphs: [
        "Scaling a recipe means multiplying every ingredient by the **scale factor: desired servings ÷ original servings**. A recipe for 4 scaled to 6 servings uses a factor of 1.5, so every amount grows by half.",
        "This calculator scales **up to three ingredients at once** and shows the scale factor itself, so you can apply it to the rest of the recipe by hand. It works for scaling down as well as up — halving a recipe for 8 down to 4 uses a factor of 0.5.",
        "Amounts are shown to two decimal places. For kitchen use, round to the nearest practical measure: 2.25 cups is 2¼ cups, and 0.75 cup is ¾ cup.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Scale a recipe from **4 servings to 6 servings**. The scale factor is 6 ÷ 4 = **1.5×**.",
        "With 2 cups of flour, 1.5 cups of sugar, and 0.5 cup of butter, the scaled amounts are 2 × 1.5 = **3 cups** of flour, 1.5 × 1.5 = **2.25 cups** of sugar, and 0.5 × 1.5 = **0.75 cup** of butter.",
      ],
    },
    {
      heading: "What does not scale neatly?",
      paragraphs: [
        "**Seasonings and leavening** do not scale linearly. Salt, spices, baking powder, and yeast should be increased more cautiously than the main ingredients — scale them by roughly two-thirds of the factor, then taste and adjust.",
        "**Cooking time and temperature** barely change. A doubled cake does not bake twice as long; it bakes in a larger pan at the same temperature, usually with only a little extra time. Check for doneness early rather than trusting the original timing.",
        "**Pan size matters**: doubling a recipe into the same pan gives a thicker layer that cooks unevenly. Use a larger pan, or split the batch across two pans, when you scale up.",
      ],
    },
  ],

  "ring-size-calculator": [
    {
      heading: "How is ring size calculated from circumference?",
      paragraphs: [
        "Measure your finger's circumference in millimetres, and the size follows from it. The US size is approximately **(circumference − 36.5) ÷ 2.55**, and the **EU size is simply the circumference in millimetres** — a 54 mm finger is a EU size 54.",
        "This calculator also gives the ring's **inside diameter (circumference ÷ π)** and an approximate UK letter size. The US formula is a linear approximation of the standard sizing tables, so it is accurate to about a quarter of a size for typical fingers.",
        "Because the UK letter is only approximate, check it against a jeweller's sizing chart before ordering — and when in doubt, size with a physical ring sizer rather than relying on any formula.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Measure a finger circumference of **54 mm**. The inside diameter is 54 ÷ π = **17.2 mm**.",
        "The US size is (54 − 36.5) ÷ 2.55 = 17.5 ÷ 2.55 = **6.9**, and the EU size is **54** — the circumference itself, rounded to the nearest whole millimetre.",
      ],
    },
    {
      heading: "How do you measure your finger?",
      paragraphs: [
        "Wrap a **thin strip of paper around your finger**, mark where it overlaps, and measure the length in millimetres. A string works too, but paper stretches less and gives a steadier reading.",
        "Measure at the **end of the day**, when your fingers are at their largest, and make sure the strip slides over your knuckle — a ring that fits the finger but not the knuckle is unwearable. Warm hands measure larger than cold hands, so avoid measuring straight after coming in from the cold.",
        "If you are between sizes, **size up for wide bands** (6 mm and wider feel tighter than narrow ones) and for rings you will wear in hot weather. A jeweller can confirm the size in under a minute if the ring is an expensive purchase.",
      ],
    },
  ],

  "savings-goal-calculator": [
    {
      heading: "How much do I need to save each month?",
      paragraphs: [
        "The monthly saving needed is **remaining amount × monthly rate ÷ ((1 + monthly rate)^months − 1)**, where the remaining amount is your goal minus what you already have. With no interest, it simplifies to remaining ÷ months.",
        "This calculator uses the **sinking-fund formula**: it works out the fixed monthly deposit that, with interest compounding each month, reaches exactly your goal on time. It also shows the interest you will earn along the way and the equivalent weekly amount (monthly ÷ 4.33).",
        "The formula assumes you deposit at the end of each month and the rate stays fixed. Real savings rates move around, so treat the result as a plan, not a promise — and revisit it if your rate changes.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Save for a **$10,000 goal with $2,000 already saved, over 24 months at 4% annual interest**. The remaining amount is $8,000 and the monthly rate is 0.04 ÷ 12 = 0.003333.",
        "The monthly saving is $8,000 × 0.003333 ÷ ((1.003333)²⁴ − 1) = **$320.73**. Over two years you contribute $7,697.59 and earn **$302.41 in interest** — without interest you would need $8,000 ÷ 24 = $333.33 a month, so the interest saves about $12.60 a month. The weekly equivalent is **$74.07**.",
      ],
    },
    {
      heading: "How can you reach the goal faster?",
      paragraphs: [
        "**Start with what you have.** Every dollar already saved is a dollar you do not need to contribute, plus the interest it earns. Even a small starting balance shortens the road noticeably on a two-year goal.",
        "**Automate the deposit** for payday, so the saving happens before spending can absorb it. A high-yield savings account lets the interest do some of the work — the 4% in the example above covers nearly $300 of the goal by itself.",
        "If the monthly figure is out of reach, you have three honest options: extend the deadline, lower the goal, or find a higher rate. What does not work is ignoring the gap — a plan you cannot follow is worse than a smaller plan you can.",
      ],
    },
  ],

  "screen-size-calculator": [
    {
      heading: "How are screen width and height calculated?",
      paragraphs: [
        "A screen's advertised size is its **diagonal**, and the width and height follow from the diagonal and the aspect ratio using Pythagoras' theorem. Width = diagonal × ratioW ÷ √(ratioW² + ratioH²), and height uses ratioH in place of ratioW.",
        "This calculator takes the diagonal in inches and the aspect ratio (for example 16 and 9) and returns the width, height, and viewing area in square inches. The ratio is shown back to you as entered, so you can confirm the inputs.",
        "The result is the size of the **screen panel itself**, not the whole device — bezels, stands, and frames add to the overall footprint, so allow extra space when planning a desk or wall mount.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a **27-inch monitor with a 16:9 aspect ratio**. The divisor is √(16² + 9²) = √337 ≈ 18.36, so the width is 27 × 16 ÷ 18.36 = **23.53 inches** and the height is 27 × 9 ÷ 18.36 = **13.24 inches**.",
        "The viewing area is 23.53 × 13.24 = **311.5 square inches**. The same 27-inch diagonal in a 21:9 ultrawide ratio gives a wider but shorter screen — 24.82 × 10.64 inches — with only 263.9 square inches of area, about 47.6 square inches less.",
      ],
    },
    {
      heading: "Why is diagonal size misleading?",
      paragraphs: [
        "Two screens with the **same diagonal can have very different areas**. The wider the aspect ratio, the less total area a given diagonal buys — as the example shows, a 27-inch 21:9 screen has about 15% less viewing area than a 27-inch 16:9 screen.",
        "Diagonal size also grows more slowly than it feels: going from a 24-inch to a 27-inch screen is a 12.5% increase in diagonal but a 26.6% increase in area, because area scales with the square of the diagonal. That is why a modest-sounding upgrade can feel much bigger.",
        "When comparing screens, compare **width, height, and area** — not just the diagonal. This calculator gives you all three from the two numbers on the box.",
      ],
    },
  ],

  "shipping-cost-calculator": [
    {
      heading: "How is shipping cost estimated?",
      paragraphs: [
        "Carriers charge by **billable weight — the greater of the actual weight and the dimensional weight**. Dimensional weight is length × width × height ÷ 139, the standard divisor for US domestic parcels, and it prices the space a box takes up rather than what it weighs.",
        "This calculator prices the billable weight at flat illustrative rates: **ground at $1.50 per pound plus $5, and express at $3.50 per pound plus $15**. The estimate uses weight and dimensions only — it is not a live carrier quote, and real rates vary by carrier, destination, and service.",
        "Dimensional weight is why a large, light box can cost more to ship than a small, heavy one: the carrier is selling space in the truck, and a bulky parcel takes the space of several small ones.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Ship a **5 lb box measuring 24 × 18 × 18 inches**. Its dimensional weight is 24 × 18 × 18 ÷ 139 = 7,776 ÷ 139 = **55.9 lb** — far above its actual weight, so the billable weight is 55.9 lb.",
        "Ground shipping is 55.9 × $1.50 + $5 = **$88.91**, and express is 55.9 × $3.50 + $15 = **$210.80**. By contrast, a dense 10 lb box measuring 12 × 10 × 8 inches has a dimensional weight of only 6.9 lb, so it bills at its actual 10 lb: ground **$20.00**, express **$50.00**.",
      ],
    },
    {
      heading: "How can you lower shipping costs?",
      paragraphs: [
        "**Use the smallest box that fits.** Dimensional weight is based on the box, not the contents, so every spare inch of packaging costs money. A box 2 inches smaller in each direction can cut the dimensional weight by a quarter or more.",
        "**Pack light but safe.** Lightweight void fill protects the contents without adding billable pounds — but remember that if dimensional weight already exceeds actual weight, shaving ounces off the contents changes nothing. Shrinking the box is what pays.",
        "Always compare the estimate with a **real carrier quote** before committing. This calculator's flat rates are a planning aid; the carrier's actual price depends on the destination zone, fuel surcharges, and the service level you choose.",
      ],
    },
  ],

  "soil-calculator": [
    {
      heading: "How much soil do I need?",
      paragraphs: [
        "Soil volume is **length × width × depth**, with the depth converted from inches to feet. Divide the cubic feet by 27 to get cubic yards — the unit bulk soil is sold in.",
        "This calculator takes a bed's length, width, and depth in inches and returns the volume in **cubic feet and cubic yards**, the estimated weight (about 1.1 tons per cubic yard of topsoil), and the number of 40 lb bags the volume corresponds to.",
        "Beds are rarely perfectly rectangular. For an irregular shape, split it into rectangles, calculate each one, and add the volumes together — or measure the longest and widest points and accept a small overestimate.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Fill a raised bed **12 feet long and 4 feet wide to a depth of 6 inches**. The depth in feet is 6 ÷ 12 = 0.5, so the volume is 12 × 4 × 0.5 = **24 cubic feet**.",
        "In cubic yards that is 24 ÷ 27 = **0.89 cubic yards** — just under a yard, so ordering one cubic yard covers it with a little to spare. At 1.1 tons per cubic yard, the soil weighs about **0.98 tons**, roughly 1,960 pounds.",
      ],
    },
    {
      heading: "How deep should soil be?",
      paragraphs: [
        "Depth depends on what you are growing: **vegetable gardens need 8–12 inches**, flower beds 4–6 inches, and a new lawn 2–4 inches of topsoil. Shallow soil dries out fast and limits root growth, so it is better to err deep.",
        "**Order about 10% extra.** Fresh soil settles after watering and the first few weeks of weather, so a bed filled exactly to the brim will sink below it. The extra also covers uneven ground and the soil lost to wheelbarrows and spills.",
        "For large jobs, bulk delivery by the cubic yard is far cheaper than bags — but check access first. A delivery truck needs room to tip, and a cubic yard of soil weighs over a ton, so it cannot be moved far by hand.",
      ],
    },
  ],

  "solar-panel-calculator": [
    {
      heading: "How many solar panels do I need?",
      paragraphs: [
        "The panel count comes from your energy use and your sunlight: **panels = (monthly kWh ÷ 30 ÷ peak sun hours) × 1,000 ÷ panel wattage**. Divide monthly use into a daily figure, divide by the sun hours to get the system size in kilowatts, then divide by each panel's wattage.",
        "This calculator takes your **monthly electricity use in kWh, peak sun hours per day, and panel wattage**, and returns the panels needed, the system size, the daily kWh, and an estimated annual saving. The saving assumes electricity at **$0.13 per kWh**, a fixed figure built into the calculator — your actual rate may be higher or lower.",
        "The sizing assumes the panels produce their full rated output during every peak sun hour. Real systems lose some energy to inverter conversion, heat, wiring, and shading, so treat the panel count as a starting estimate rather than a final design.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a home using **900 kWh a month, with 5 peak sun hours a day and 400 W panels**. Daily use is 900 ÷ 30 = **30 kWh**, so the system size is 30 ÷ 5 = **6.0 kW**.",
        "The panels needed are 6,000 ÷ 400 = **15 panels**. The estimated annual saving is 900 × 12 × $0.13 = **$1,404** — the value of the electricity the system is expected to offset over a year at the calculator's $0.13 rate.",
      ],
    },
    {
      heading: "What the estimate leaves out",
      paragraphs: [
        "**Your roof matters.** Direction, pitch, and shading change real output a great deal: a south-facing roof with no shade outperforms an east-facing or partly shaded one, even with the same panels. Peak sun hours also vary by region — the US average is 4–6 hours, the Southwest gets 6–7, and the Northeast 3–4.",
        "**Savings depend on your electricity rate and your utility's rules.** The $0.13 per kWh in this calculator is a fixed assumption; if your rate is higher, the saving is larger, and net-metering rules decide how much you are paid for surplus power sent to the grid.",
        "Use this estimate to size the conversation, then get quotes from installers. A site survey accounts for roof condition, shading, local permits, and incentives — none of which a calculator can see.",
      ],
    },
  ],

  "stamp-duty-calculator": [
    {
      heading: "How is stamp duty calculated?",
      paragraphs: [
        "Stamp duty — the tax paid when buying property — is calculated here as a **flat rate: property price × the rate you enter, minus any first-time buyer discount**. This calculator does not apply any specific country or state's bands, thresholds, or exemptions: you enter the rate that applies in your jurisdiction.",
        "The discount is a percentage off the duty itself, not off the price. The calculator also shows the **effective rate** — the final duty as a percentage of the price — so you can see what you are actually paying after the discount.",
        "Because the calculation is flat-rate, it is an estimator for planning, not a tax assessment. Many jurisdictions use banded systems where different rates apply to different slices of the price, and the real bill can be lower than a flat rate suggests.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Buy a property for **$400,000** with a stamp duty rate of **2.5%** and no discount. The duty is $400,000 × 0.025 = **$10,000**, an effective rate of **2.50%**.",
        "With a **50% first-time buyer discount**, the discount is $10,000 × 0.50 = **$5,000**, so the duty payable falls to **$5,000** and the effective rate to **1.25%**.",
      ],
    },
    {
      heading: "What should you check before relying on the number?",
      paragraphs: [
        "**Find your actual rate first.** Stamp duty rates, thresholds, and first-time buyer relief differ by jurisdiction and change with budgets and elections. Enter the rate from your tax authority's current schedule, not a remembered figure.",
        "**Ask whether the system is banded.** Where rates rise in bands, only the part of the price above each threshold is charged at the higher rate — a flat-rate estimate can overstate the bill substantially on an expensive property.",
        "**Confirm who pays and when.** In most places the buyer pays at completion, and the duty is due on top of the price, so it needs to be in your cash budget alongside the deposit, legal fees, and moving costs.",
      ],
    },
  ],

  "steps-to-distance-calculator": [
    {
      heading: "How do you convert steps to distance?",
      paragraphs: [
        "Distance is **steps × stride length ÷ 63,360**, the number of inches in a mile. Your stride length is the distance covered by one step, typically 26–30 inches for walking.",
        "This calculator takes your step count and stride length in inches and returns the distance in **miles and kilometres** (miles × 1.60934), plus a rough calorie estimate of **0.04 calories per step**. The calorie figure is a broad average that ignores body weight and pace.",
        "Stride length varies with height and speed: taller people and faster walkers take longer strides. The default of 30 inches suits an average adult walking briskly; a shorter or slower walker may be closer to 26.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Walk **10,000 steps** with a **30-inch stride**. The total is 10,000 × 30 = 300,000 inches, and 300,000 ÷ 63,360 = **4.73 miles**.",
        "In kilometres that is 4.73 × 1.60934 = **7.62 km**, and the rough calorie estimate is 10,000 × 0.04 = **400 calories**. At a typical walking pace of about 3 miles per hour, the walk takes around an hour and a half.",
      ],
    },
    {
      heading: "How do you measure your stride length?",
      paragraphs: [
        "Walk **10 normal steps** on flat ground, measure the total distance, and divide by 10. Measuring ten steps at once averages out the natural variation between individual strides and is far more accurate than measuring one.",
        "Measure at your **usual walking pace** — a relaxed stroll and a brisk walk give different stride lengths, and the calculator can only use one figure. If you mostly run, measure a running stride separately; it is considerably longer.",
        "Fitness trackers estimate distance the same way, from step count and an assumed stride length. If your tracker and this calculator disagree, the stride length is the likely cause — measure yours and the numbers will line up.",
      ],
    },
  ],

  "typing-speed-calculator": [
    {
      heading: "How is typing speed measured?",
      paragraphs: [
        "Typing speed is measured in **words per minute (WPM), where one 'word' is defined as 5 characters**. The formula is WPM = (characters ÷ 5) ÷ minutes — spaces and punctuation count as characters, just like letters.",
        "This calculator shows two speeds: **gross WPM**, your raw pace, and **net WPM**, which subtracts one word for each error before dividing — so accuracy affects the headline figure. It also reports accuracy as a percentage and your characters per minute.",
        "The 5-character word is a long-standing convention from typewriter tests, chosen because it is close to the average length of an English word plus a space. It lets speeds from different tests be compared fairly.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Type **500 characters in 120 seconds with 5 errors**. That is 500 ÷ 5 = 100 words in 2 minutes, so the gross speed is 100 ÷ 2 = **50 WPM**.",
        "Net speed subtracts the 5 errors as words: (100 − 5) ÷ 2 = 47.5, shown as **48 WPM**. Accuracy is (500 − 5) ÷ 500 × 100 = **99.0%**, and the pace is 500 ÷ 2 = **250 characters per minute**.",
      ],
    },
    {
      heading: "What is a good typing speed?",
      paragraphs: [
        "Around **40 WPM is average** for an adult, **60 WPM and above is good**, and **80 WPM or more is excellent** — the level of professional typists and fast touch-typists. Most office work is comfortable at 50–60 WPM.",
        "**Accuracy matters more than raw speed.** Errors cost time twice: once in the mistake and once in the correction. A typist at 50 WPM with 99% accuracy produces more usable text than one at 65 WPM with 92% accuracy — which is why this calculator leads with the net figure.",
        "To improve, practise touch typing in short daily sessions and let speed follow accuracy. Ten focused minutes a day beats an occasional hour, and speed gains come steadily over weeks rather than overnight.",
      ],
    },
  ],

  "unit-conversion-cooking": [
    {
      heading: "How do cooking measurements convert?",
      paragraphs: [
        "This converter works through **millilitres as a common base**: 1 US cup = 236.588 mL, 1 tablespoon = 14.787 mL, 1 teaspoon = 4.929 mL, and 1 fluid ounce = 29.574 mL. Enter an amount in any one unit and it converts to mL first, then out to all the others.",
        "The units you can convert from are **cups, tablespoons, teaspoons, and fluid ounces**, and the results cover all of those plus millilitres. The familiar kitchen ratios fall straight out of the numbers: 1 cup = 16 tablespoons = 48 teaspoons.",
        "These are **US customary measures**. A metric cup is 250 mL, not 236.588 mL, so recipes written for metric cups will be slightly off if you convert with US figures — about 6% off per cup.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Convert **2 cups**. In millilitres that is 2 × 236.588 = **473.2 mL**.",
        "The same amount is 473.2 ÷ 14.787 = **32.0 tablespoons**, 473.2 ÷ 4.929 = **96.0 teaspoons**, and 473.2 ÷ 29.574 = **16.00 fluid ounces**. Every figure is the same volume, expressed four ways.",
      ],
    },
    {
      heading: "Should you convert by volume or by weight?",
      paragraphs: [
        "For baking, **weight is more accurate than volume**. A cup of flour can weigh anywhere from 120 g to 150 g depending on how it is scooped and packed, while 125 g is always 125 g. Volume conversions are exact for liquids but approximate for dry ingredients.",
        "Volume-to-weight conversion depends on the **ingredient's density**: a cup of honey weighs far more than a cup of flour. This converter handles volume only — for grams and ounces by ingredient, use a density-based converter.",
        "When a recipe's origin is unclear, check whether its cups are US (236.588 mL) or metric (250 mL). The difference is small per cup but adds up across a whole recipe, and it is the most common cause of 'the recipe didn't work' in international baking.",
      ],
    },
  ],

  "wallpaper-calculator": [
    {
      heading: "How many rolls of wallpaper do I need?",
      paragraphs: [
        "The roll count is **wall area ÷ usable coverage per roll, rounded up**. Wall area is the room's perimeter × wall height, and usable coverage is 85% of a roll's full coverage — the 15% allowance covers pattern matching and cutting waste.",
        "A roll's full coverage is **(roll width in inches ÷ 12) × roll length in feet**. This calculator shows the wall area, the usable coverage per roll, and the total coverage, so you can see how the allowance affects the result.",
        "The calculator does not subtract doors and windows, so the estimate has some slack built in — the 15% allowance is for pattern matching and waste, not for openings. For a room with very large windows, the true need may be a roll less than shown.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take a room with a **54-foot perimeter and 8-foot walls**, papered with rolls **21 inches wide and 33 feet long**. The wall area is 54 × 8 = **432 square feet**.",
        "Each roll covers (21 ÷ 12) × 33 = 1.75 × 33 = **57.75 square feet**, of which 85% is usable: 57.75 × 0.85 = **49.1 square feet**. The rolls needed are 432 ÷ 49.1 = 8.8, rounded up to **9 rolls**.",
      ],
    },
    {
      heading: "Should you buy extra rolls?",
      paragraphs: [
        "**Yes — buy 1–2 extra rolls** beyond the calculated number, for mistakes, repairs, and pattern matching. A miscut strip or a damaged corner is cheap to fix if you have spare paper from the same batch, and impossible to fix well if you do not.",
        "**Buy all rolls at once, from the same dye lot.** Wallpaper colour varies slightly between production runs, and two lots hung side by side can show a visible line. The batch number is printed on the roll label — check that every roll matches.",
        "Keep a leftover roll after the job. Future repairs — scuffs, stains, a moved picture hook — need matching paper, and a pattern discontinued a year later cannot be reordered at any price.",
      ],
    },
  ],

  "weighted-average-calculator": [
    {
      heading: "How is a weighted average calculated?",
      paragraphs: [
        "A weighted average is **the sum of each value multiplied by its weight, divided by the total weight**. Values that matter more get bigger weights, so they pull the average further toward themselves.",
        "This calculator takes **three values with three weights** and shows the weighted average, the simple average for comparison, the total weight, and the difference between the two averages. The weights do not need to total 100 — the calculator divides by the actual total, so any set of weights works.",
        "If all the weights are equal, the weighted average is exactly the simple average. The two figures only diverge when the weights differ — which is the whole point of weighting.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Take three scores: **90 with weight 30, 85 with weight 30, and 78 with weight 40**. Multiply and add: 90 × 30 + 85 × 30 + 78 × 40 = 2,700 + 2,550 + 3,120 = **8,370**.",
        "The total weight is 30 + 30 + 40 = 100, so the weighted average is 8,370 ÷ 100 = **83.70**. The simple average is (90 + 85 + 78) ÷ 3 = **84.33**, and the difference is **−0.63** — the lowest score carries the heaviest weight, so it drags the weighted average below the simple one.",
      ],
    },
    {
      heading: "When should you use a weighted average?",
      paragraphs: [
        "**Course grades** are the classic case: a final exam worth 40% of the grade should count more than a quiz worth 10%. Averaging the scores equally would overstate the quizzes and understate the exam.",
        "The same logic applies to **investment portfolios** (a return on a large holding matters more than one on a small holding), **survey results** (weighting responses to match the population), and any rating built from parts of unequal importance.",
        "A useful check: if the weighted average and the simple average are far apart, the weights are doing real work — look at which value carries the most weight, because that is the one driving the result.",
      ],
    },
  ],

  "word-count-calculator": [
    {
      heading: "What does the word count calculator estimate?",
      paragraphs: [
        "This calculator starts from a **word count you already know** and estimates everything else: characters (words × average characters per word), sentences (about 15 words each), paragraphs (about 5 sentences each), reading time at 250 words per minute, and speaking time at 150 words per minute.",
        "Note that it does **not count words from pasted text** — there is no text box. You enter the word count (from your document or editor) and the average characters per word, and the calculator derives the rest. The default of 5 characters per word is a reasonable average for English prose.",
        "The sentence and paragraph figures are rough by design: real sentences vary in length, and real paragraphs vary even more. Treat them as planning estimates, not exact counts.",
      ],
    },
    {
      heading: "Worked example",
      paragraphs: [
        "Enter **1,500 words** with an average of **5 characters per word**. The character count is 1,500 × 5 = **7,500 characters**.",
        "The estimates are 1,500 ÷ 15 = **100 sentences** and 100 ÷ 5 = **20 paragraphs**. Reading time is 1,500 ÷ 250 = **6.0 minutes**, and speaking time is 1,500 ÷ 150 = **10.0 minutes** — a useful pair when a piece is both published and presented.",
      ],
    },
    {
      heading: "How can you use these estimates?",
      paragraphs: [
        "**Plan article length.** A typical SEO blog post runs 1,500–2,500 words; at 250 words per minute, that is 6–10 minutes of reading — the range most readers will finish. Shorter formats need far less: social posts run 40–80 words and emails 50–200.",
        "**Time a talk or video script.** A 10-minute presentation needs about 1,500 spoken words, and speakers who rush through a script written for 2,000 words will run over. Work backwards from the speaking time to the word count, not the other way round.",
        "**Set reading-time labels honestly.** A '5-minute read' label should mean about 1,250 words at average reading speed. Understating the time annoys readers; overstating it puts them off starting at all.",
      ],
    },
  ],

};
