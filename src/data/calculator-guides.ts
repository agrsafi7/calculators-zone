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
};
