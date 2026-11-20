// Curated phrase -> calculator map for contextual in-content links inside
// the in-depth guides (rendered by GuideSections).
//
// Every entry was checked against the actual guide text (Nov 2026): the
// phrase must name the calculator unambiguously in context. Generic words
// are deliberately NOT here — e.g. "loan", "age", "tax", "date", "average"
// and "period" appear constantly as ordinary words, and linking them would
// be spammy or wrong ("deck of cards" is not the deck calculator, a loan
// "period" is not the period calculator, "concrete example" is not
// concrete). Each entry lists its phrases longest-first; the matcher also
// prefers the longest match at each position.
//
// Rules enforced by GuideSections: first mention only per guide, at most
// 4 links per guide, never a link to the guide's own page.
export interface GuideLinkEntry {
  href: string;
  phrases: string[];
}

export const GUIDE_LINKS: GuideLinkEntry[] = [
  { href: "/finance/mortgage-calculator", phrases: ["Mortgage Calculator", "Mortgage"] },
  { href: "/finance/loan-calculator", phrases: ["Loan Calculator"] },
  { href: "/finance/auto-loan-calculator", phrases: ["Auto Loan Calculator", "Auto Loan"] },
  { href: "/finance/compound-interest-calculator", phrases: ["Compound Interest Calculator", "Compound Interest"] },
  { href: "/finance/simple-interest-calculator", phrases: ["Simple Interest Calculator", "Simple Interest"] },
  { href: "/finance/interest-rate-calculator", phrases: ["Interest Rate Calculator", "Interest Rate"] },
  { href: "/finance/down-payment-calculator", phrases: ["Down Payment Calculator", "Down Payment"] },
  { href: "/finance/property-tax-calculator", phrases: ["Property Tax Calculator", "Property Tax"] },
  { href: "/finance/income-tax-calculator", phrases: ["Income Tax Calculator", "Income Tax"] },
  { href: "/finance/sales-tax-calculator", phrases: ["Sales Tax Calculator", "Sales Tax"] },
  { href: "/finance/take-home-pay-calculator", phrases: ["Take-Home Pay Calculator", "Take-Home Pay"] },
  { href: "/finance/social-security-calculator", phrases: ["Social Security Calculator", "Social Security"] },
  { href: "/finance/future-value-calculator", phrases: ["Future Value Calculator", "Future Value"] },
  { href: "/finance/retirement-calculator", phrases: ["Retirement Calculator", "Retirement"] },
  { href: "/finance/inflation-calculator", phrases: ["Inflation Calculator", "Inflation"] },
  { href: "/finance/pension-calculator", phrases: ["Pension Calculator", "Pension"] },
  { href: "/finance/apr-calculator", phrases: ["APR Calculator", "APR"] },
  { href: "/finance/vat-calculator", phrases: ["VAT Calculator", "VAT"] },
  { href: "/finance/amortization-calculator", phrases: ["Amortization Schedule Calculator", "Amortization Calculator", "Amortization Schedule", "Amortization"] },
  { href: "/finance/break-even-calculator", phrases: ["Break-Even Calculator", "Break-Even"] },
  { href: "/finance/savings-calculator", phrases: ["Savings Calculator"] },
  { href: "/finance/debt-to-income-ratio-calculator", phrases: ["Debt-to-Income Ratio Calculator", "Debt-to-Income Ratio"] },
  { href: "/other/hourly-rate-calculator", phrases: ["Hourly Rate Calculator", "Hourly Rate"] },
  { href: "/health/bmi-calculator", phrases: ["BMI Calculator", "BMI"] },
  { href: "/health/bmr-calculator", phrases: ["BMR Calculator", "BMR"] },
  { href: "/health/tdee-calculator", phrases: ["TDEE Calculator", "TDEE"] },
  { href: "/health/body-fat-calculator", phrases: ["Body Fat Calculator", "Body Fat"] },
  { href: "/health/calorie-calculator", phrases: ["Calorie Calculator", "Calorie"] },
  { href: "/health/healthy-weight-calculator", phrases: ["Healthy Weight Calculator", "Healthy Weight"] },
  { href: "/health/overweight-calculator", phrases: ["Overweight Calculator", "Overweight"] },
  { href: "/health/ovulation-calculator", phrases: ["Ovulation Calculator", "Ovulation"] },
  { href: "/health/conception-calculator", phrases: ["Conception Calculator", "Conception"] },
  { href: "/other/blood-pressure-calculator", phrases: ["Blood Pressure Calculator", "Blood Pressure"] },
  { href: "/datetime/due-date-calculator", phrases: ["Due Date Calculator", "Due Date"] },
  { href: "/datetime/business-days-calculator", phrases: ["Business Days Calculator", "Business Days"] },
  { href: "/datetime/work-hours-calculator", phrases: ["Work Hours Calculator", "Work Hours"] },
  { href: "/datetime/age-calculator", phrases: ["Age Calculator"] },
  { href: "/lifestyle/day-of-week-calculator", phrases: ["Day of the Week Calculator", "Day of the Week"] },
  { href: "/lifestyle/trip-cost-calculator", phrases: ["Trip Cost Calculator", "Trip Cost"] },
  { href: "/lifestyle/fuel-cost-calculator", phrases: ["Fuel Cost Calculator", "Fuel Cost"] },
  { href: "/lifestyle/dog-age-calculator", phrases: ["Dog Age Calculator", "Dog Age"] },
  { href: "/lifestyle/cat-age-calculator", phrases: ["Cat Age Calculator", "Cat Age"] },
  { href: "/lifestyle/square-footage-calculator", phrases: ["Square Footage Calculator", "Square Footage"] },
  { href: "/lifestyle/btu-calculator", phrases: ["BTU Calculator", "BTU"] },
  { href: "/lifestyle/resistor-calculator", phrases: ["Resistor Calculator", "Resistor"] },
  { href: "/math/standard-deviation-calculator", phrases: ["Standard Deviation Calculator", "Standard Deviation"] },
  { href: "/math/square-root-calculator", phrases: ["Square Root Calculator", "Square Root"] },
  { href: "/math/exponent-calculator", phrases: ["Exponent Calculator", "Exponent"] },
  { href: "/math/lcm-calculator", phrases: ["LCM Calculator", "LCM"] },
  { href: "/other/percentage-change-calculator", phrases: ["Percentage Change Calculator", "Percentage Change"] },
  { href: "/other/weighted-average-calculator", phrases: ["Weighted Average Calculator", "Weighted Average"] },
  { href: "/other/gcd-calculator", phrases: ["GCD Calculator", "GCD"] },
  { href: "/other/hvac-sizing-calculator", phrases: ["HVAC Sizing Calculator", "HVAC Sizing"] },
  { href: "/other/insulation-calculator", phrases: ["Insulation Calculator", "Insulation"] },
  { href: "/other/invoice-calculator", phrases: ["Invoice Calculator", "Invoice"] },
  { href: "/other/quit-smoking-calculator", phrases: ["Quit Smoking Savings Calculator", "Quit Smoking Calculator"] },
  { href: "/science/voltage-calculator", phrases: ["Voltage Calculator", "Voltage"] },
  { href: "/science/acceleration-calculator", phrases: ["Acceleration Calculator", "Acceleration"] },
];
