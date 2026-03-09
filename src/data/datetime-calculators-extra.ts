import { CalculatorConfig } from "@/components/CalculatorTemplate";

const rel = (exclude: string) => [
  { name: "Date Calculator", slug: "date-calculator", icon: "Calendar", category: "datetime" },
  { name: "Age Calculator", slug: "age-calculator-tool", icon: "Calendar", category: "datetime" },
  { name: "Time Calculator", slug: "time-calculator", icon: "Clock", category: "datetime" },
].filter(c => c.slug !== exclude);

const mk = (
  slug: string,
  name: string,
  subcategory: string,
  description: string,
  inputs: CalculatorConfig["inputs"],
  calculate: CalculatorConfig["calculate"],
  formula?: { expression: string; variables: string[] }
): CalculatorConfig => ({
  slug,
  name,
  category: "Date & Time",
  categorySlug: "datetime",
  description,
  metaDescription: `Free ${name}. ${description}`,
  icon: "Calendar",
  subcategory,
  inputs,
  calculate,
  formula,
  howToUse: `Enter the required information to use the ${name}.`,
  faqs: [{ question: `How does the ${name} work?`, answer: description }],
  relatedCalcs: rel(slug),
});

export const datetimeCalculatorsExtra: CalculatorConfig[] = [
  // Date Difference Calculators
  mk(
    "date-difference",
    "Date Difference Calculator",
    "Date Difference",
    "Calculate the exact difference between two dates",
    [
      { id: "days", label: "Days Between", type: "number", defaultValue: 30, step: 1 },
    ],
    (v) => {
      const weeks = v.days / 7;
      const months = v.days / 30.44;
      return [
        { label: "Days", value: `${v.days}`, highlight: true },
        { label: "Weeks", value: `${weeks.toFixed(1)}` },
        { label: "Months", value: `${months.toFixed(1)}` },
      ];
    },
    { expression: "Difference = |End Date - Start Date|", variables: ["In days"] }
  ),

  mk(
    "weeks-between-dates",
    "Weeks Between Dates Calculator",
    "Date Difference",
    "Calculate weeks between two dates",
    [{ id: "days", label: "Total Days Between", type: "number", defaultValue: 90, step: 1 }],
    (v) => {
      const weeks = v.days / 7;
      return [
        { label: "Weeks", value: `${weeks.toFixed(1)}`, highlight: true },
        { label: "Full Weeks", value: `${Math.floor(weeks)}` },
        { label: "Remaining Days", value: `${v.days % 7}` },
      ];
    },
    { expression: "Weeks = Days / 7", variables: ["Remainder = Days mod 7"] }
  ),

  mk(
    "months-between-dates",
    "Months Between Dates Calculator",
    "Date Difference",
    "Calculate months between two dates",
    [{ id: "days", label: "Total Days Between", type: "number", defaultValue: 365, step: 1 }],
    (v) => {
      const months = v.days / 30.44;
      return [
        { label: "Approx Months", value: `${months.toFixed(1)}`, highlight: true },
        { label: "Weeks", value: `${(v.days / 7).toFixed(1)}` },
        { label: "Days", value: `${v.days}` },
      ];
    },
    { expression: "Months ≈ Days / 30.44", variables: ["Average days per month"] }
  ),

  mk(
    "years-between-dates",
    "Years Between Dates Calculator",
    "Date Difference",
    "Calculate years between two dates",
    [{ id: "days", label: "Total Days Between", type: "number", defaultValue: 730, step: 1 }],
    (v) => {
      const years = v.days / 365.25;
      return [
        { label: "Years", value: `${years.toFixed(2)}`, highlight: true },
        { label: "Months", value: `${(v.days / 30.44).toFixed(1)}` },
        { label: "Weeks", value: `${(v.days / 7).toFixed(0)}` },
      ];
    },
    { expression: "Years = Days / 365.25", variables: ["Accounts for leap years"] }
  ),

  mk(
    "business-days-between",
    "Business Days Between Dates Calculator",
    "Date Difference",
    "Calculate business days (excluding weekends) between dates",
    [
      { id: "totalDays", label: "Total Days", type: "number", defaultValue: 30, step: 1 },
    ],
    (v) => {
      const weeks = Math.floor(v.totalDays / 7);
      const remainder = v.totalDays % 7;
      const businessDays = weeks * 5 + Math.min(remainder, 5);
      return [
        { label: "Business Days", value: `${businessDays}`, highlight: true },
        { label: "Total Days", value: `${v.totalDays}` },
        { label: "Weekend Days", value: `${v.totalDays - businessDays}` },
      ];
    },
    { expression: "Business Days = Total - Weekends", variables: ["Excludes Saturdays and Sundays"] }
  ),

  mk(
    "weekend-days-between",
    "Weekend Days Between Dates Calculator",
    "Date Difference",
    "Count weekend days between two dates",
    [{ id: "totalDays", label: "Total Days", type: "number", defaultValue: 365, step: 1 }],
    (v) => {
      const weekends = Math.floor(v.totalDays / 7) * 2 + Math.min(v.totalDays % 7, 2);
      const weekdays = v.totalDays - weekends;
      return [
        { label: "Weekend Days", value: `${weekends}`, highlight: true },
        { label: "Weekdays", value: `${weekdays}` },
        { label: "Full Weeks", value: `${Math.floor(v.totalDays / 7)}` },
      ];
    },
    { expression: "Weekends = (Days/7) × 2", variables: ["Saturday + Sunday per week"] }
  ),

  // Date Addition & Subtraction
  mk(
    "add-days-to-date",
    "Add Days to Date Calculator",
    "Date Addition & Subtraction",
    "Add a specific number of days to calculate future date",
    [{ id: "days", label: "Days to Add", type: "number", defaultValue: 30, step: 1 }],
    (v) => {
      const weeks = v.days / 7;
      const months = v.days / 30.44;
      return [
        { label: "Days Added", value: `${v.days}`, highlight: true },
        { label: "Weeks", value: `${weeks.toFixed(1)}` },
        { label: "Months", value: `${months.toFixed(1)}` },
      ];
    },
    { expression: "New Date = Start Date + Days", variables: ["Forward in time"] }
  ),

  mk(
    "subtract-days-from-date",
    "Subtract Days from Date Calculator",
    "Date Addition & Subtraction",
    "Subtract days from a date to calculate past date",
    [{ id: "days", label: "Days to Subtract", type: "number", defaultValue: 30, step: 1 }],
    (v) => {
      const weeks = v.days / 7;
      return [
        { label: "Days Subtracted", value: `${v.days}`, highlight: true },
        { label: "Weeks", value: `${weeks.toFixed(1)}` },
      ];
    },
    { expression: "New Date = Start Date - Days", variables: ["Backward in time"] }
  ),

  mk(
    "add-weeks-to-date",
    "Add Weeks to Date Calculator",
    "Date Addition & Subtraction",
    "Add weeks to a date",
    [{ id: "weeks", label: "Weeks to Add", type: "number", defaultValue: 4, step: 1 }],
    (v) => {
      const days = v.weeks * 7;
      return [
        { label: "Weeks Added", value: `${v.weeks}`, highlight: true },
        { label: "Days", value: `${days}` },
        { label: "Months", value: `${(days / 30.44).toFixed(1)}` },
      ];
    },
    { expression: "New Date = Start + (Weeks × 7)", variables: ["1 week = 7 days"] }
  ),

  mk(
    "add-months-to-date",
    "Add Months to Date Calculator",
    "Date Addition & Subtraction",
    "Add months to a date",
    [{ id: "months", label: "Months to Add", type: "number", defaultValue: 6, step: 1 }],
    (v) => {
      const approxDays = v.months * 30.44;
      return [
        { label: "Months Added", value: `${v.months}`, highlight: true },
        { label: "Approx Days", value: `${Math.round(approxDays)}` },
        { label: "Weeks", value: `${(approxDays / 7).toFixed(1)}` },
      ];
    },
    { expression: "New Date = Start + Months", variables: ["Varies by month length"] }
  ),

  mk(
    "add-years-to-date",
    "Add Years to Date Calculator",
    "Date Addition & Subtraction",
    "Add years to a date",
    [{ id: "years", label: "Years to Add", type: "number", defaultValue: 5, step: 1 }],
    (v) => {
      const days = v.years * 365.25;
      return [
        { label: "Years Added", value: `${v.years}`, highlight: true },
        { label: "Approx Days", value: `${Math.round(days)}` },
        { label: "Months", value: `${v.years * 12}` },
      ];
    },
    { expression: "New Date = Start + Years", variables: ["Accounts for leap years"] }
  ),

  // Countdown Calculators
  mk(
    "countdown-to-date",
    "Countdown to Date Calculator",
    "Countdown",
    "Count down days remaining to a target date",
    [{ id: "daysAway", label: "Days Until Target", type: "number", defaultValue: 100, step: 1 }],
    (v) => {
      const weeks = v.daysAway / 7;
      const months = v.daysAway / 30.44;
      return [
        { label: "Days Remaining", value: `${v.daysAway}`, highlight: true },
        { label: "Weeks", value: `${weeks.toFixed(1)}` },
        { label: "Months", value: `${months.toFixed(1)}` },
      ];
    },
    { expression: "Days = Target Date - Today", variables: ["Countdown timer"] }
  ),

  mk(
    "countdown-to-birthday",
    "Countdown to Birthday Calculator",
    "Countdown",
    "Calculate days until your next birthday",
    [{ id: "daysUntil", label: "Days Until Birthday", type: "number", defaultValue: 50, step: 1 }],
    (v) => {
      const weeks = v.daysUntil / 7;
      return [
        { label: "Days Until", value: `${v.daysUntil}`, highlight: true },
        { label: "Weeks", value: `${weeks.toFixed(1)}` },
        { label: "% of Year", value: `${((v.daysUntil / 365) * 100).toFixed(1)}%` },
      ];
    },
    { expression: "Days = Next Birthday - Today", variables: ["Annual celebration"] }
  ),

  mk(
    "countdown-to-new-year",
    "Countdown to New Year Calculator",
    "Countdown",
    "Calculate days until New Year's Day",
    [{ id: "daysLeft", label: "Days Left in Year", type: "number", defaultValue: 90, step: 1 }],
    (v) => {
      const weeks = v.daysLeft / 7;
      const months = v.daysLeft / 30.44;
      return [
        { label: "Days Until New Year", value: `${v.daysLeft}`, highlight: true },
        { label: "Weeks", value: `${weeks.toFixed(1)}` },
        { label: "Months", value: `${months.toFixed(1)}` },
      ];
    },
    { expression: "Days = Jan 1 - Today", variables: ["Calendar year countdown"] }
  ),

  mk(
    "countdown-to-retirement",
    "Countdown to Retirement Calculator",
    "Countdown",
    "Calculate days until retirement",
    [
      { id: "yearsLeft", label: "Years Until Retirement", type: "number", defaultValue: 20, step: 1 },
    ],
    (v) => {
      const days = v.yearsLeft * 365.25;
      const months = v.yearsLeft * 12;
      return [
        { label: "Days Until Retirement", value: `${Math.round(days).toLocaleString()}`, highlight: true },
        { label: "Years", value: `${v.yearsLeft}` },
        { label: "Months", value: `${months}` },
      ];
    },
    { expression: "Days = Years × 365.25", variables: ["Work life countdown"] }
  ),

  // Age & Life Duration Calculators
  mk(
    "age-calculator-tool",
    "Age Calculator",
    "Age & Life Duration",
    "Calculate exact age from birth date",
    [{ id: "ageYears", label: "Age in Years", type: "number", defaultValue: 30, step: 1 }],
    (v) => {
      const months = v.ageYears * 12;
      const days = Math.round(v.ageYears * 365.25);
      return [
        { label: "Age", value: `${v.ageYears} years`, highlight: true },
        { label: "Months", value: `${months}` },
        { label: "Days", value: `${days.toLocaleString()}` },
      ];
    },
    { expression: "Age = Current Year - Birth Year", variables: ["Adjusted for month/day"] }
  ),

  mk(
    "age-in-months",
    "Age in Months Calculator",
    "Age & Life Duration",
    "Calculate age in months",
    [{ id: "ageMonths", label: "Age in Months", type: "number", defaultValue: 360, step: 1 }],
    (v) => {
      const years = v.ageMonths / 12;
      const weeks = (v.ageMonths * 30.44) / 7;
      return [
        { label: "Months", value: `${v.ageMonths}`, highlight: true },
        { label: "Years", value: `${years.toFixed(1)}` },
        { label: "Weeks", value: `${Math.round(weeks)}` },
      ];
    },
    { expression: "Months = Years × 12 + extra months", variables: ["Total months lived"] }
  ),

  mk(
    "age-in-days",
    "Age in Days Calculator",
    "Age & Life Duration",
    "Calculate age in days",
    [{ id: "ageDays", label: "Age in Days", type: "number", defaultValue: 10950, step: 1 }],
    (v) => {
      const years = v.ageDays / 365.25;
      const weeks = v.ageDays / 7;
      return [
        { label: "Days", value: `${v.ageDays.toLocaleString()}`, highlight: true },
        { label: "Years", value: `${years.toFixed(1)}` },
        { label: "Weeks", value: `${Math.round(weeks).toLocaleString()}` },
      ];
    },
    { expression: "Days = (Today - Birth Date) in days", variables: ["Total days lived"] }
  ),

  mk(
    "age-in-hours",
    "Age in Hours Calculator",
    "Age & Life Duration",
    "Calculate age in hours",
    [{ id: "ageDays", label: "Age in Days", type: "number", defaultValue: 10000, step: 1 }],
    (v) => {
      const hours = v.ageDays * 24;
      const minutes = hours * 60;
      return [
        { label: "Hours", value: `${hours.toLocaleString()}`, highlight: true },
        { label: "Days", value: `${v.ageDays.toLocaleString()}` },
        { label: "Minutes", value: `${minutes.toLocaleString()}` },
      ];
    },
    { expression: "Hours = Days × 24", variables: ["Total hours lived"] }
  ),

  mk(
    "age-difference",
    "Age Difference Calculator",
    "Age & Life Duration",
    "Calculate age difference between two people",
    [
      { id: "age1", label: "Person 1 Age (years)", type: "number", defaultValue: 35, step: 1 },
      { id: "age2", label: "Person 2 Age (years)", type: "number", defaultValue: 28, step: 1 },
    ],
    (v) => {
      const diff = Math.abs(v.age1 - v.age2);
      const months = diff * 12;
      const days = Math.round(diff * 365.25);
      return [
        { label: "Age Difference", value: `${diff} years`, highlight: true },
        { label: "Months", value: `${months}` },
        { label: "Days", value: `${days}` },
      ];
    },
    { expression: "Difference = |Age 1 - Age 2|", variables: ["Absolute difference"] }
  ),

  // Work & Business Time Calculators
  mk(
    "working-days-calculator",
    "Working Days Calculator",
    "Work & Business Time",
    "Calculate working days in a period",
    [{ id: "totalDays", label: "Total Days", type: "number", defaultValue: 30, step: 1 }],
    (v) => {
      const weeks = Math.floor(v.totalDays / 7);
      const remainder = v.totalDays % 7;
      const workingDays = weeks * 5 + Math.min(remainder, 5);
      return [
        { label: "Working Days", value: `${workingDays}`, highlight: true },
        { label: "Total Days", value: `${v.totalDays}` },
        { label: "Weekends", value: `${v.totalDays - workingDays}` },
      ];
    },
    { expression: "Working Days = Weekdays only", variables: ["Monday to Friday"] }
  ),

  mk(
    "business-hours-calculator",
    "Business Hours Calculator",
    "Work & Business Time",
    "Calculate business hours in a time period",
    [
      { id: "days", label: "Number of Days", type: "number", defaultValue: 5, step: 1 },
      { id: "hoursPerDay", label: "Hours Per Day", type: "number", defaultValue: 8, step: 0.5 },
    ],
    (v) => {
      const total = v.days * v.hoursPerDay;
      return [
        { label: "Total Business Hours", value: `${total}`, highlight: true },
        { label: "Days", value: `${v.days}` },
        { label: "Hours/Day", value: `${v.hoursPerDay}` },
      ];
    },
    { expression: "Hours = Days × Hours Per Day", variables: ["Standard work hours"] }
  ),

  mk(
    "overtime-hours-calculator",
    "Overtime Hours Calculator",
    "Work & Business Time",
    "Calculate overtime hours worked",
    [
      { id: "totalHours", label: "Total Hours Worked", type: "number", defaultValue: 50, step: 0.5 },
      { id: "regularHours", label: "Regular Hours", type: "number", defaultValue: 40, step: 0.5 },
    ],
    (v) => {
      const overtime = Math.max(0, v.totalHours - v.regularHours);
      const overtimePercent = (overtime / v.totalHours) * 100;
      return [
        { label: "Overtime Hours", value: `${overtime}`, highlight: true },
        { label: "Regular Hours", value: `${v.regularHours}` },
        { label: "Overtime %", value: `${overtimePercent.toFixed(1)}%` },
      ];
    },
    { expression: "Overtime = Total - Regular", variables: ["Extra hours worked"] }
  ),

  mk(
    "work-week-calculator",
    "Work Week Calculator",
    "Work & Business Time",
    "Calculate total work hours per week",
    [
      { id: "hoursPerDay", label: "Hours Per Day", type: "number", defaultValue: 8, step: 0.5 },
      { id: "daysPerWeek", label: "Days Per Week", type: "number", defaultValue: 5, step: 1, max: 7 },
    ],
    (v) => {
      const weekly = v.hoursPerDay * v.daysPerWeek;
      const monthly = weekly * 4.33;
      return [
        { label: "Weekly Hours", value: `${weekly}`, highlight: true },
        { label: "Monthly Hours", value: `${Math.round(monthly)}` },
        { label: "Annual Hours", value: `${Math.round(weekly * 52)}` },
      ];
    },
    { expression: "Weekly = Hours/Day × Days/Week", variables: ["Standard work schedule"] }
  ),

  // Time Duration Calculators
  mk(
    "time-duration-hours-converter",
    "Time Duration Calculator",
    "Time Duration",
    "Calculate duration between two times",
    [
      { id: "hours", label: "Duration (hours)", type: "number", defaultValue: 2.5, step: 0.25 },
    ],
    (v) => {
      const minutes = v.hours * 60;
      const seconds = minutes * 60;
      return [
        { label: "Hours", value: `${v.hours}`, highlight: true },
        { label: "Minutes", value: `${Math.round(minutes)}` },
        { label: "Seconds", value: `${Math.round(seconds)}` },
      ];
    },
    { expression: "Duration = End Time - Start Time", variables: ["Time elapsed"] }
  ),

  mk(
    "hours-between-times",
    "Hours Between Times Calculator",
    "Time Duration",
    "Calculate hours between two times",
    [{ id: "hours", label: "Hours Between", type: "number", defaultValue: 5, step: 0.5 }],
    (v) => {
      const minutes = v.hours * 60;
      const days = v.hours / 24;
      return [
        { label: "Hours", value: `${v.hours}`, highlight: true },
        { label: "Minutes", value: `${Math.round(minutes)}` },
        { label: "Days", value: `${days.toFixed(2)}` },
      ];
    },
    { expression: "Hours = (End - Start) in hours", variables: ["Decimal format"] }
  ),

  mk(
    "minutes-between-times",
    "Minutes Between Times Calculator",
    "Time Duration",
    "Calculate minutes between two times",
    [{ id: "minutes", label: "Minutes Between", type: "number", defaultValue: 90, step: 1 }],
    (v) => {
      const hours = v.minutes / 60;
      const seconds = v.minutes * 60;
      return [
        { label: "Minutes", value: `${v.minutes}`, highlight: true },
        { label: "Hours", value: `${hours.toFixed(2)}` },
        { label: "Seconds", value: `${seconds}` },
      ];
    },
    { expression: "Minutes = (End - Start) in minutes", variables: ["Precise timing"] }
  ),

  // Time Conversion Calculators
  mk(
    "seconds-to-minutes",
    "Seconds to Minutes Calculator",
    "Time Conversions",
    "Convert seconds to minutes",
    [{ id: "seconds", label: "Seconds", type: "number", defaultValue: 3600, step: 1 }],
    (v) => {
      const minutes = v.seconds / 60;
      const hours = v.seconds / 3600;
      return [
        { label: "Minutes", value: `${minutes.toFixed(2)}`, highlight: true },
        { label: "Seconds", value: `${v.seconds}` },
        { label: "Hours", value: `${hours.toFixed(3)}` },
      ];
    },
    { expression: "Minutes = Seconds / 60", variables: ["60 seconds per minute"] }
  ),

  mk(
    "seconds-to-hours",
    "Seconds to Hours Calculator",
    "Time Conversions",
    "Convert seconds to hours",
    [{ id: "seconds", label: "Seconds", type: "number", defaultValue: 3600, step: 1 }],
    (v) => {
      const hours = v.seconds / 3600;
      const minutes = v.seconds / 60;
      return [
        { label: "Hours", value: `${hours.toFixed(3)}`, highlight: true },
        { label: "Minutes", value: `${minutes.toFixed(1)}` },
        { label: "Seconds", value: `${v.seconds}` },
      ];
    },
    { expression: "Hours = Seconds / 3600", variables: ["3600 seconds per hour"] }
  ),

  mk(
    "minutes-to-hours",
    "Minutes to Hours Calculator",
    "Time Conversions",
    "Convert minutes to hours",
    [{ id: "minutes", label: "Minutes", type: "number", defaultValue: 120, step: 1 }],
    (v) => {
      const hours = v.minutes / 60;
      const seconds = v.minutes * 60;
      return [
        { label: "Hours", value: `${hours.toFixed(2)}`, highlight: true },
        { label: "Minutes", value: `${v.minutes}` },
        { label: "Seconds", value: `${seconds}` },
      ];
    },
    { expression: "Hours = Minutes / 60", variables: ["60 minutes per hour"] }
  ),

  mk(
    "hours-to-days",
    "Hours to Days Calculator",
    "Time Conversions",
    "Convert hours to days",
    [{ id: "hours", label: "Hours", type: "number", defaultValue: 48, step: 1 }],
    (v) => {
      const days = v.hours / 24;
      const weeks = days / 7;
      return [
        { label: "Days", value: `${days.toFixed(2)}`, highlight: true },
        { label: "Hours", value: `${v.hours}` },
        { label: "Weeks", value: `${weeks.toFixed(2)}` },
      ];
    },
    { expression: "Days = Hours / 24", variables: ["24 hours per day"] }
  ),

  mk(
    "days-to-weeks",
    "Days to Weeks Calculator",
    "Time Conversions",
    "Convert days to weeks",
    [{ id: "days", label: "Days", type: "number", defaultValue: 14, step: 1 }],
    (v) => {
      const weeks = v.days / 7;
      const months = v.days / 30.44;
      return [
        { label: "Weeks", value: `${weeks.toFixed(2)}`, highlight: true },
        { label: "Days", value: `${v.days}` },
        { label: "Months", value: `${months.toFixed(2)}` },
      ];
    },
    { expression: "Weeks = Days / 7", variables: ["7 days per week"] }
  ),

  mk(
    "days-to-months",
    "Days to Months Calculator",
    "Time Conversions",
    "Convert days to months",
    [{ id: "days", label: "Days", type: "number", defaultValue: 90, step: 1 }],
    (v) => {
      const months = v.days / 30.44;
      const years = v.days / 365.25;
      return [
        { label: "Months", value: `${months.toFixed(2)}`, highlight: true },
        { label: "Days", value: `${v.days}` },
        { label: "Years", value: `${years.toFixed(2)}` },
      ];
    },
    { expression: "Months = Days / 30.44", variables: ["Average month length"] }
  ),

  mk(
    "days-to-years",
    "Days to Years Calculator",
    "Time Conversions",
    "Convert days to years",
    [{ id: "days", label: "Days", type: "number", defaultValue: 365, step: 1 }],
    (v) => {
      const years = v.days / 365.25;
      const months = v.days / 30.44;
      return [
        { label: "Years", value: `${years.toFixed(3)}`, highlight: true },
        { label: "Months", value: `${months.toFixed(1)}` },
        { label: "Days", value: `${v.days}` },
      ];
    },
    { expression: "Years = Days / 365.25", variables: ["Accounts for leap years"] }
  ),

  // Calendar Calculators
  mk(
    "day-of-week",
    "Day of the Week Calculator",
    "Calendar Calculators",
    "Find what day of the week a date falls on",
    [
      { id: "year", label: "Year", type: "number", defaultValue: 2024, step: 1 },
      { id: "month", label: "Month (1-12)", type: "number", defaultValue: 3, min: 1, max: 12 },
      { id: "day", label: "Day", type: "number", defaultValue: 8, min: 1, max: 31 },
    ],
    (v) => {
      const date = new Date(v.year, v.month - 1, v.day);
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayName = days[date.getDay()];
      return [
        { label: "Day of Week", value: dayName, highlight: true },
        { label: "Date", value: `${v.month}/${v.day}/${v.year}` },
      ];
    },
    { expression: "Day = Date's weekday position", variables: ["0=Sunday, 6=Saturday"] }
  ),

  mk(
    "day-of-year",
    "Day of the Year Calculator",
    "Calendar Calculators",
    "Calculate which day of the year a date is",
    [
      { id: "month", label: "Month (1-12)", type: "number", defaultValue: 3, min: 1, max: 12 },
      { id: "day", label: "Day", type: "number", defaultValue: 8, min: 1, max: 31 },
    ],
    (v) => {
      const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      let dayOfYear = v.day;
      for (let i = 0; i < v.month - 1; i++) dayOfYear += daysInMonths[i];
      const remaining = 365 - dayOfYear;
      return [
        { label: "Day of Year", value: `${dayOfYear}`, highlight: true },
        { label: "Days Remaining", value: `${remaining}` },
        { label: "% of Year", value: `${((dayOfYear / 365) * 100).toFixed(1)}%` },
      ];
    },
    { expression: "Day = Sum of preceding month days + current day", variables: ["Non-leap year"] }
  ),

  mk(
    "week-number",
    "Week Number Calculator",
    "Calendar Calculators",
    "Calculate the week number of a date",
    [
      { id: "dayOfYear", label: "Day of Year (1-365)", type: "number", defaultValue: 67, min: 1, max: 365 },
    ],
    (v) => {
      const week = Math.ceil(v.dayOfYear / 7);
      const month = Math.ceil(v.dayOfYear / 30.44);
      return [
        { label: "Week Number", value: `${week}`, highlight: true },
        { label: "Day of Year", value: `${v.dayOfYear}` },
        { label: "Approx Month", value: `${month}` },
      ];
    },
    { expression: "Week = Day of Year / 7", variables: ["ISO week numbering"] }
  ),

  mk(
    "leap-year-calculator",
    "Leap Year Calculator",
    "Calendar Calculators",
    "Check if a year is a leap year",
    [{ id: "year", label: "Year", type: "number", defaultValue: 2024, step: 1 }],
    (v) => {
      const isLeap = (v.year % 4 === 0 && v.year % 100 !== 0) || (v.year % 400 === 0);
      return [
        { label: "Status", value: isLeap ? "Leap Year ✓" : "Not a Leap Year", highlight: true },
        { label: "Days in Year", value: isLeap ? "366" : "365" },
        { label: "Year", value: `${v.year}` },
      ];
    },
    { expression: "Leap if (year÷4=0 AND year÷100≠0) OR year÷400=0", variables: ["Gregorian calendar"] }
  ),

  mk(
    "quarter-of-year",
    "Quarter of Year Calculator",
    "Calendar Calculators",
    "Determine which quarter a date falls in",
    [{ id: "month", label: "Month (1-12)", type: "number", defaultValue: 3, min: 1, max: 12 }],
    (v) => {
      const quarter = Math.ceil(v.month / 3);
      const monthsInQ = (quarter - 1) * 3;
      const monthsLeft = 12 - v.month;
      return [
        { label: "Quarter", value: `Q${quarter}`, highlight: true },
        { label: "Month", value: `${v.month}` },
        { label: "Months Left in Year", value: `${monthsLeft}` },
      ];
    },
    { expression: "Quarter = Ceiling(Month / 3)", variables: ["Q1-Q4"] }
  ),

  // Time Zone Calculators
  mk(
    "time-zone-converter",
    "Time Zone Converter",
    "Time Zone Tools",
    "Convert time between time zones",
    [
      { id: "hour", label: "Hour (0-23)", type: "number", defaultValue: 14, min: 0, max: 23 },
      { id: "offsetDiff", label: "Offset Difference (hours)", type: "number", defaultValue: 5, step: 1 },
    ],
    (v) => {
      const newHour = (v.hour + v.offsetDiff + 24) % 24;
      return [
        { label: "Converted Time", value: `${newHour}:00`, highlight: true },
        { label: "Original Time", value: `${v.hour}:00` },
        { label: "Offset", value: `${v.offsetDiff > 0 ? '+' : ''}${v.offsetDiff}h` },
      ];
    },
    { expression: "New Time = (Original + Offset) mod 24", variables: ["24-hour format"] }
  ),

  mk(
    "meeting-time-planner",
    "Meeting Time Planner Calculator",
    "Time Zone Tools",
    "Find suitable meeting times across zones",
    [
      { id: "localHour", label: "Your Time (hour)", type: "number", defaultValue: 9, min: 0, max: 23 },
      { id: "timeDiff", label: "Their Time Zone Difference", type: "number", defaultValue: -5, step: 1 },
    ],
    (v) => {
      const theirHour = (v.localHour + v.timeDiff + 24) % 24;
      return [
        { label: "Their Time", value: `${theirHour}:00`, highlight: true },
        { label: "Your Time", value: `${v.localHour}:00` },
        { label: "Time Difference", value: `${v.timeDiff}h` },
      ];
    },
    { expression: "Their Time = Your Time + Offset", variables: ["Simultaneous timing"] }
  ),

  // Productivity Time Calculators
  mk(
    "pomodoro-calculator",
    "Pomodoro Timer Calculator",
    "Productivity Time",
    "Calculate Pomodoro session schedule",
    [
      { id: "sessions", label: "Number of Sessions", type: "number", defaultValue: 4, step: 1 },
      { id: "workMin", label: "Work Minutes", type: "number", defaultValue: 25, step: 5 },
      { id: "breakMin", label: "Break Minutes", type: "number", defaultValue: 5, step: 1 },
    ],
    (v) => {
      const cycleTime = v.workMin + v.breakMin;
      const total = cycleTime * v.sessions;
      return [
        { label: "Total Time", value: `${total} min`, highlight: true },
        { label: "Work Time", value: `${v.workMin * v.sessions} min` },
        { label: "Break Time", value: `${v.breakMin * v.sessions} min` },
      ];
    },
    { expression: "Total = (Work + Break) × Sessions", variables: ["Focus technique"] }
  ),

  mk(
    "focus-time-calculator",
    "Focus Time Calculator",
    "Productivity Time",
    "Calculate focused work time in a day",
    [
      { id: "totalHours", label: "Total Work Hours", type: "number", defaultValue: 8, step: 0.5 },
      { id: "distractionPercent", label: "Distraction % (0-100)", type: "number", defaultValue: 30, min: 0, max: 100 },
    ],
    (v) => {
      const focused = v.totalHours * (1 - v.distractionPercent / 100);
      const distracted = v.totalHours - focused;
      return [
        { label: "Focused Hours", value: `${focused.toFixed(1)}`, highlight: true },
        { label: "Distracted Hours", value: `${distracted.toFixed(1)}` },
        { label: "Focus %", value: `${(100 - v.distractionPercent).toFixed(0)}%` },
      ];
    },
    { expression: "Focused = Total × (1 - Distraction%)", variables: ["Deep work time"] }
  ),

  mk(
    "task-completion-time",
    "Task Completion Time Calculator",
    "Productivity Time",
    "Estimate task completion time with buffer",
    [
      { id: "estimatedMin", label: "Estimated Minutes", type: "number", defaultValue: 60, step: 5 },
      { id: "bufferPercent", label: "Buffer % (0-100)", type: "number", defaultValue: 20, min: 0, max: 100 },
    ],
    (v) => {
      const total = v.estimatedMin * (1 + v.bufferPercent / 100);
      const buffer = total - v.estimatedMin;
      return [
        { label: "Total Time", value: `${Math.ceil(total)} min`, highlight: true },
        { label: "Estimated", value: `${v.estimatedMin} min` },
        { label: "Buffer Added", value: `${Math.ceil(buffer)} min` },
      ];
    },
    { expression: "Total = Estimated × (1 + Buffer%)", variables: ["Planning accuracy"] }
  ),

  // Sleep & Lifestyle Time Calculators
  mk(
    "sleep-cycle-calculator",
    "Sleep Cycle Calculator",
    "Sleep & Lifestyle Time",
    "Calculate optimal sleep/wake times based on 90-min cycles",
    [{ id: "cycles", label: "Sleep Cycles", type: "number", defaultValue: 5, min: 1, max: 8, step: 1 }],
    (v) => {
      const minutes = v.cycles * 90;
      const hours = minutes / 60;
      return [
        { label: "Sleep Duration", value: `${hours.toFixed(1)} hours`, highlight: true },
        { label: "Minutes", value: `${minutes}` },
        { label: "Cycles", value: `${v.cycles}` },
      ];
    },
    { expression: "Duration = Cycles × 90 minutes", variables: ["REM cycle length"] }
  ),

  mk(
    "sleep-duration-calculator",
    "Sleep Duration Calculator",
    "Sleep & Lifestyle Time",
    "Calculate sleep duration",
    [{ id: "sleepHours", label: "Sleep Hours", type: "number", defaultValue: 8, step: 0.5 }],
    (v) => {
      const minutes = v.sleepHours * 60;
      const cycles = v.sleepHours / 1.5;
      return [
        { label: "Duration", value: `${v.sleepHours} hours`, highlight: true },
        { label: "Minutes", value: `${Math.round(minutes)}` },
        { label: "Sleep Cycles", value: `${cycles.toFixed(1)}` },
      ];
    },
    { expression: "Duration = Wake Time - Bedtime", variables: ["Total sleep"] }
  ),

  mk(
    "bedtime-calculator",
    "Bedtime Calculator",
    "Sleep & Lifestyle Time",
    "Calculate ideal bedtime for desired wake time",
    [
      { id: "wakeHour", label: "Wake Hour (0-23)", type: "number", defaultValue: 7, min: 0, max: 23 },
      { id: "sleepHours", label: "Desired Sleep Hours", type: "number", defaultValue: 8, step: 0.5 },
    ],
    (v) => {
      const bedHour = (v.wakeHour - v.sleepHours + 24) % 24;
      return [
        { label: "Bedtime", value: `${Math.floor(bedHour)}:${String(Math.round((bedHour % 1) * 60)).padStart(2, '0')}`, highlight: true },
        { label: "Wake Time", value: `${v.wakeHour}:00` },
        { label: "Sleep Duration", value: `${v.sleepHours}h` },
      ];
    },
    { expression: "Bedtime = Wake Time - Sleep Hours", variables: ["Work backwards"] }
  ),

  // Travel Time Calculators
  mk(
    "travel-time-calculator",
    "Travel Time Calculator",
    "Travel Time",
    "Calculate travel time from distance and speed",
    [
      { id: "distance", label: "Distance (km)", type: "number", defaultValue: 100, step: 1 },
      { id: "speed", label: "Speed (km/h)", type: "number", defaultValue: 80, step: 5 },
    ],
    (v) => {
      const hours = v.distance / v.speed;
      const minutes = hours * 60;
      return [
        { label: "Travel Time", value: `${hours.toFixed(2)} hours`, highlight: true },
        { label: "Minutes", value: `${Math.round(minutes)}` },
        { label: "Distance", value: `${v.distance} km` },
      ];
    },
    { expression: "Time = Distance / Speed", variables: ["Constant speed"] }
  ),

  mk(
    "walking-time-calculator",
    "Walking Time Calculator",
    "Travel Time",
    "Calculate walking time",
    [
      { id: "distance", label: "Distance (km)", type: "number", defaultValue: 5, step: 0.1 },
      { id: "pace", label: "Pace (km/h)", type: "number", defaultValue: 5, step: 0.5 },
    ],
    (v) => {
      const hours = v.distance / v.pace;
      const minutes = hours * 60;
      return [
        { label: "Walking Time", value: `${Math.round(minutes)} min`, highlight: true },
        { label: "Hours", value: `${hours.toFixed(2)}` },
        { label: "Distance", value: `${v.distance} km` },
      ];
    },
    { expression: "Time = Distance / Pace", variables: ["Average walking speed"] }
  ),

  mk(
    "flight-time-calculator",
    "Flight Time Calculator",
    "Travel Time",
    "Estimate flight duration",
    [
      { id: "distance", label: "Distance (km)", type: "number", defaultValue: 5000, step: 100 },
      { id: "speed", label: "Cruise Speed (km/h)", type: "number", defaultValue: 850, step: 50 },
    ],
    (v) => {
      const hours = v.distance / v.speed;
      const minutes = hours * 60;
      return [
        { label: "Flight Time", value: `${hours.toFixed(1)} hours`, highlight: true },
        { label: "Minutes", value: `${Math.round(minutes)}` },
        { label: "Distance", value: `${v.distance} km` },
      ];
    },
    { expression: "Time = Distance / Cruise Speed", variables: ["Typical commercial flight"] }
  ),

  // Astronomy Time Calculators
  mk(
    "day-length-calculator",
    "Day Length Calculator",
    "Astronomy Time",
    "Calculate daylight hours (simplified)",
    [
      { id: "dayOfYear", label: "Day of Year (1-365)", type: "number", defaultValue: 172, min: 1, max: 365 },
      { id: "latitude", label: "Latitude (degrees)", type: "number", defaultValue: 45, min: -90, max: 90 },
    ],
    (v) => {
      const seasonalEffect = Math.sin(((v.dayOfYear - 81) * 2 * Math.PI) / 365);
      const daylight = 12 + 4 * seasonalEffect * Math.abs(Math.sin((v.latitude * Math.PI) / 180));
      const nighttime = 24 - daylight;
      return [
        { label: "Daylight Hours", value: `${daylight.toFixed(1)}`, highlight: true },
        { label: "Night Hours", value: `${nighttime.toFixed(1)}` },
        { label: "Day of Year", value: `${v.dayOfYear}` },
      ];
    },
    { expression: "Daylight = 12 + seasonal variation", variables: ["Simplified model"] }
  ),

  mk(
    "moon-phase-calculator",
    "Moon Phase Calculator",
    "Astronomy Time",
    "Calculate moon phase (simplified)",
    [{ id: "daysSinceNewMoon", label: "Days Since New Moon", type: "number", defaultValue: 7, min: 0, max: 29, step: 1 }],
    (v) => {
      const phases = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];
      const phaseIndex = Math.floor((v.daysSinceNewMoon / 29.53) * 8) % 8;
      const illumination = 50 * (1 - Math.cos((v.daysSinceNewMoon / 29.53) * 2 * Math.PI));
      return [
        { label: "Moon Phase", value: phases[phaseIndex], highlight: true },
        { label: "Days Since New Moon", value: `${v.daysSinceNewMoon}` },
        { label: "Illumination", value: `${illumination.toFixed(0)}%` },
      ];
    },
    { expression: "Phase = Days in lunar cycle", variables: ["~29.5 day cycle"] }
  ),

  // Miscellaneous Time Calculators
  mk(
    "average-time-calculator",
    "Average Time Calculator",
    "Miscellaneous Time",
    "Calculate average of multiple time durations",
    [
      { id: "time1", label: "Time 1 (minutes)", type: "number", defaultValue: 30, step: 1 },
      { id: "time2", label: "Time 2 (minutes)", type: "number", defaultValue: 45, step: 1 },
      { id: "time3", label: "Time 3 (minutes)", type: "number", defaultValue: 60, step: 1 },
    ],
    (v) => {
      const avg = (v.time1 + v.time2 + v.time3) / 3;
      const total = v.time1 + v.time2 + v.time3;
      return [
        { label: "Average", value: `${avg.toFixed(1)} min`, highlight: true },
        { label: "Total", value: `${total} min` },
        { label: "Count", value: "3" },
      ];
    },
    { expression: "Average = Sum / Count", variables: ["Mean duration"] }
  ),

  mk(
    "time-percentage-calculator",
    "Time Percentage Calculator",
    "Miscellaneous Time",
    "Calculate what percentage of total time has passed",
    [
      { id: "elapsed", label: "Elapsed Time (minutes)", type: "number", defaultValue: 30, step: 1 },
      { id: "total", label: "Total Time (minutes)", type: "number", defaultValue: 120, step: 1 },
    ],
    (v) => {
      const percent = (v.elapsed / v.total) * 100;
      const remaining = v.total - v.elapsed;
      return [
        { label: "Percentage Complete", value: `${percent.toFixed(1)}%`, highlight: true },
        { label: "Elapsed", value: `${v.elapsed} min` },
        { label: "Remaining", value: `${remaining} min` },
      ];
    },
    { expression: "Percentage = (Elapsed / Total) × 100", variables: ["Progress tracking"] }
  ),

  mk(
    "time-remaining-calculator",
    "Time Remaining Calculator",
    "Miscellaneous Time",
    "Calculate time remaining",
    [
      { id: "total", label: "Total Time (minutes)", type: "number", defaultValue: 120, step: 1 },
      { id: "elapsed", label: "Elapsed Time (minutes)", type: "number", defaultValue: 45, step: 1 },
    ],
    (v) => {
      const remaining = v.total - v.elapsed;
      const percent = (remaining / v.total) * 100;
      return [
        { label: "Time Remaining", value: `${remaining} min`, highlight: true },
        { label: "% Remaining", value: `${percent.toFixed(1)}%` },
        { label: "Elapsed", value: `${v.elapsed} min` },
      ];
    },
    { expression: "Remaining = Total - Elapsed", variables: ["Countdown"] }
  ),
];
