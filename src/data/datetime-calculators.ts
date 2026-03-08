import { CalculatorConfig } from "@/components/CalculatorTemplate";

const dtSubcategoryMap: Record<string, string> = {
  "age-calculator": "Age Calculators",
  "chronological-age-calculator": "Age Calculators",
  "date-difference-calculator": "Date Calculators",
  "days-between-dates-calculator": "Date Calculators",
  "add-subtract-days-calculator": "Date Calculators",
  "due-date-calculator": "Date Calculators",
  "time-duration-calculator": "Time Calculators",
  "business-days-calculator": "Work & Business",
  "work-hours-calculator": "Work & Business",
  "retirement-date-calculator": "Work & Business",
  "time-zone-converter": "Time Zones",
  "countdown-calculator": "Countdown & Tracking",
  "week-number-calculator": "Date Calculators",
};


const dtRelated = (exclude: string) => [
  { name: "Age Calculator", slug: "age-calculator", icon: "clock", category: "datetime" },
  { name: "Date Difference", slug: "date-difference-calculator", icon: "clock", category: "datetime" },
  { name: "Business Days", slug: "business-days-calculator", icon: "clock", category: "datetime" },
  { name: "Countdown", slug: "countdown-calculator", icon: "clock", category: "datetime" },
].filter((c) => c.slug !== exclude);

export const datetimeCalculators: CalculatorConfig[] = [
  {
    slug: "age-calculator", name: "Age Calculator", category: "Date & Time", categorySlug: "datetime",
    description: "Calculate your exact age in years, months, days, hours, and minutes from your date of birth.",
    metaDescription: "Free age calculator. Find your exact age in years, months, days from your birthday.",
    icon: "clock",
    inputs: [
      { id: "birthYear", label: "Birth Year", type: "number", defaultValue: 1990, min: 1900, max: 2030 },
      { id: "birthMonth", label: "Birth Month (1-12)", type: "number", defaultValue: 6, min: 1, max: 12 },
      { id: "birthDay", label: "Birth Day (1-31)", type: "number", defaultValue: 15, min: 1, max: 31 },
    ],
    calculate: (v) => {
      const bd = new Date(v.birthYear, v.birthMonth - 1, v.birthDay);
      const now = new Date();
      let years = now.getFullYear() - bd.getFullYear();
      let months = now.getMonth() - bd.getMonth();
      let days = now.getDate() - bd.getDate();
      if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
      if (months < 0) { years--; months += 12; }
      const totalDays = Math.floor((now.getTime() - bd.getTime()) / 86400000);
      const totalWeeks = Math.floor(totalDays / 7);
      const nextBd = new Date(now.getFullYear(), v.birthMonth - 1, v.birthDay);
      if (nextBd <= now) nextBd.setFullYear(nextBd.getFullYear() + 1);
      const daysUntil = Math.ceil((nextBd.getTime() - now.getTime()) / 86400000);
      return [
        { label: "Age", value: `${years} years, ${months} months, ${days} days`, highlight: true },
        { label: "Total Days", value: totalDays.toLocaleString() },
        { label: "Total Weeks", value: totalWeeks.toLocaleString() },
        { label: "Next Birthday In", value: `${daysUntil} days` },
      ];
    },
    formula: { expression: "Age = Current Date − Birth Date", variables: ["Accounts for month/day differences"] },
    howToUse: "Enter your birth date to find your exact age and time until your next birthday.",
    faqs: [{ question: "Is this exact?", answer: "Yes, it accounts for varying month lengths and leap years." }],
    relatedCalcs: dtRelated("age-calculator"),
  },
  {
    slug: "date-difference-calculator", name: "Date Difference Calculator", category: "Date & Time", categorySlug: "datetime",
    description: "Calculate the exact number of days, weeks, and months between any two dates.",
    metaDescription: "Free date difference calculator. Find days, weeks, and months between two dates.",
    icon: "clock",
    inputs: [
      { id: "y1", label: "Start Year", type: "number", defaultValue: 2024, min: 1900 },
      { id: "m1", label: "Start Month", type: "number", defaultValue: 1, min: 1, max: 12 },
      { id: "d1", label: "Start Day", type: "number", defaultValue: 1, min: 1, max: 31 },
      { id: "y2", label: "End Year", type: "number", defaultValue: 2025, min: 1900 },
      { id: "m2", label: "End Month", type: "number", defaultValue: 1, min: 1, max: 12 },
      { id: "d2", label: "End Day", type: "number", defaultValue: 1, min: 1, max: 31 },
    ],
    calculate: (v) => {
      const d1 = new Date(v.y1, v.m1 - 1, v.d1);
      const d2 = new Date(v.y2, v.m2 - 1, v.d2);
      const diff = Math.abs(d2.getTime() - d1.getTime());
      const days = Math.floor(diff / 86400000);
      const weeks = Math.floor(days / 7);
      const months = Math.round(days / 30.44);
      const hours = days * 24;
      return [
        { label: "Days", value: days.toLocaleString(), highlight: true },
        { label: "Weeks", value: `${weeks} weeks, ${days % 7} days` },
        { label: "Months (approx)", value: `${months}` },
        { label: "Hours", value: hours.toLocaleString() },
      ];
    },
    formula: { expression: "Difference = |Date2 − Date1|", variables: ["Absolute difference in milliseconds, converted"] },
    howToUse: "Enter two dates to find the exact difference between them.",
    faqs: [{ question: "Does it include the end date?", answer: "No, it counts the days between the two dates, not including the end date." }],
    relatedCalcs: dtRelated("date-difference-calculator"),
  },
  {
    slug: "days-between-dates-calculator", name: "Days Between Dates Calculator", category: "Date & Time", categorySlug: "datetime",
    description: "Find the exact number of calendar days between two dates.",
    metaDescription: "Calculate days between two dates. Free days between dates calculator.",
    icon: "clock",
    inputs: [
      { id: "y1", label: "From Year", type: "number", defaultValue: 2025, min: 1900 },
      { id: "m1", label: "From Month", type: "number", defaultValue: 1, min: 1, max: 12 },
      { id: "d1", label: "From Day", type: "number", defaultValue: 1, min: 1, max: 31 },
      { id: "y2", label: "To Year", type: "number", defaultValue: 2025, min: 1900 },
      { id: "m2", label: "To Month", type: "number", defaultValue: 12, min: 1, max: 12 },
      { id: "d2", label: "To Day", type: "number", defaultValue: 31, min: 1, max: 31 },
    ],
    calculate: (v) => {
      const d1 = new Date(v.y1, v.m1 - 1, v.d1);
      const d2 = new Date(v.y2, v.m2 - 1, v.d2);
      const days = Math.round((d2.getTime() - d1.getTime()) / 86400000);
      return [
        { label: "Days Between", value: `${Math.abs(days)}`, highlight: true },
        { label: "Weeks", value: `${Math.floor(Math.abs(days) / 7)}` },
        { label: "Direction", value: days >= 0 ? "Forward" : "Backward" },
      ];
    },
    formula: { expression: "Days = (Date2 − Date1) / 86400000", variables: ["Difference in milliseconds ÷ ms per day"] },
    howToUse: "Enter two dates to find the number of days between them.",
    faqs: [{ question: "Is this the same as date difference?", answer: "Yes, this is a simplified version focused on day count." }],
    relatedCalcs: dtRelated("days-between-dates-calculator"),
  },
  {
    slug: "time-duration-calculator", name: "Time Duration Calculator", category: "Date & Time", categorySlug: "datetime",
    description: "Calculate the duration between two times in hours, minutes, and seconds.",
    metaDescription: "Free time duration calculator. Find hours and minutes between two times.",
    icon: "clock",
    inputs: [
      { id: "h1", label: "Start Hour (0-23)", type: "number", defaultValue: 9, min: 0, max: 23 },
      { id: "min1", label: "Start Minute", type: "number", defaultValue: 0, min: 0, max: 59 },
      { id: "h2", label: "End Hour (0-23)", type: "number", defaultValue: 17, min: 0, max: 23 },
      { id: "min2", label: "End Minute", type: "number", defaultValue: 30, min: 0, max: 59 },
    ],
    calculate: (v) => {
      let totalMin = (v.h2 * 60 + v.min2) - (v.h1 * 60 + v.min1);
      if (totalMin < 0) totalMin += 1440;
      const hours = Math.floor(totalMin / 60);
      const mins = totalMin % 60;
      return [
        { label: "Duration", value: `${hours}h ${mins}m`, highlight: true },
        { label: "Total Minutes", value: `${totalMin}` },
        { label: "Decimal Hours", value: (totalMin / 60).toFixed(2) },
      ];
    },
    formula: { expression: "Duration = End Time − Start Time", variables: ["Wraps around midnight if needed"] },
    howToUse: "Enter start and end times in 24-hour format to calculate the duration.",
    faqs: [{ question: "What about overnight?", answer: "If end is before start, it assumes overnight and adds 24 hours." }],
    relatedCalcs: dtRelated("time-duration-calculator"),
  },
  {
    slug: "business-days-calculator", name: "Business Days Calculator", category: "Date & Time", categorySlug: "datetime",
    description: "Calculate the number of business days (weekdays) between two dates, excluding weekends.",
    metaDescription: "Free business days calculator. Count weekdays between two dates, excluding weekends.",
    icon: "clock",
    inputs: [
      { id: "y1", label: "Start Year", type: "number", defaultValue: 2025, min: 1900 },
      { id: "m1", label: "Start Month", type: "number", defaultValue: 1, min: 1, max: 12 },
      { id: "d1", label: "Start Day", type: "number", defaultValue: 6, min: 1, max: 31 },
      { id: "y2", label: "End Year", type: "number", defaultValue: 2025, min: 1900 },
      { id: "m2", label: "End Month", type: "number", defaultValue: 1, min: 1, max: 12 },
      { id: "d2", label: "End Day", type: "number", defaultValue: 31, min: 1, max: 31 },
    ],
    calculate: (v) => {
      const start = new Date(v.y1, v.m1 - 1, v.d1);
      const end = new Date(v.y2, v.m2 - 1, v.d2);
      let bizDays = 0;
      let weekendDays = 0;
      const totalDays = Math.round((end.getTime() - start.getTime()) / 86400000);
      const cur = new Date(start);
      for (let i = 0; i <= Math.abs(totalDays); i++) {
        const day = cur.getDay();
        if (day !== 0 && day !== 6) bizDays++;
        else weekendDays++;
        cur.setDate(cur.getDate() + 1);
      }
      return [
        { label: "Business Days", value: `${bizDays}`, highlight: true },
        { label: "Weekend Days", value: `${weekendDays}` },
        { label: "Total Calendar Days", value: `${Math.abs(totalDays)}` },
        { label: "Work Weeks", value: `${(bizDays / 5).toFixed(1)}` },
      ];
    },
    formula: { expression: "Count weekdays (Mon-Fri) between dates", variables: ["Excludes Saturday and Sunday"] },
    howToUse: "Enter start and end dates. The calculator counts only Mon-Fri as business days.",
    faqs: [{ question: "Does it exclude holidays?", answer: "No, only weekends. Public holidays vary by country and are not excluded." }],
    relatedCalcs: dtRelated("business-days-calculator"),
  },
  {
    slug: "work-hours-calculator", name: "Work Hours Calculator", category: "Date & Time", categorySlug: "datetime",
    description: "Calculate total work hours and pay for a given period based on daily hours and hourly rate.",
    metaDescription: "Free work hours calculator. Track weekly work hours and calculate pay.",
    icon: "clock",
    inputs: [
      { id: "hoursPerDay", label: "Hours per Day", type: "number", defaultValue: 8, step: 0.5 },
      { id: "daysPerWeek", label: "Days per Week", type: "number", defaultValue: 5, min: 1, max: 7 },
      { id: "weeks", label: "Number of Weeks", type: "number", defaultValue: 4, min: 1 },
      { id: "rate", label: "Hourly Rate ($)", type: "number", defaultValue: 25, step: 0.5 },
    ],
    calculate: (v) => {
      const weeklyHours = v.hoursPerDay * v.daysPerWeek;
      const totalHours = weeklyHours * v.weeks;
      const totalPay = totalHours * v.rate;
      return [
        { label: "Total Hours", value: `${totalHours}`, highlight: true },
        { label: "Weekly Hours", value: `${weeklyHours}` },
        { label: "Total Pay", value: `$${totalPay.toLocaleString()}` },
        { label: "Weekly Pay", value: `$${(weeklyHours * v.rate).toLocaleString()}` },
      ];
    },
    formula: { expression: "Total = Hours/Day × Days/Week × Weeks", variables: ["Pay = Total Hours × Rate"] },
    howToUse: "Enter your daily hours, workdays per week, number of weeks, and hourly rate.",
    faqs: [{ question: "Does this include overtime?", answer: "No. For overtime, use a separate overtime calculator." }],
    relatedCalcs: dtRelated("work-hours-calculator"),
  },
  {
    slug: "time-zone-converter", name: "Time Zone Converter", category: "Date & Time", categorySlug: "datetime",
    description: "Convert time between different UTC offset time zones.",
    metaDescription: "Free time zone converter. Convert times between UTC offset zones.",
    icon: "clock",
    inputs: [
      { id: "hour", label: "Hour (0-23)", type: "number", defaultValue: 12, min: 0, max: 23 },
      { id: "minute", label: "Minute", type: "number", defaultValue: 0, min: 0, max: 59 },
      { id: "fromOffset", label: "From UTC Offset", type: "number", defaultValue: -5, min: -12, max: 14 },
      { id: "toOffset", label: "To UTC Offset", type: "number", defaultValue: 1, min: -12, max: 14 },
    ],
    calculate: (v) => {
      const diff = v.toOffset - v.fromOffset;
      let newHour = v.hour + diff;
      let dayShift = 0;
      if (newHour >= 24) { newHour -= 24; dayShift = 1; }
      if (newHour < 0) { newHour += 24; dayShift = -1; }
      const pad = (n: number) => String(Math.floor(n)).padStart(2, "0");
      return [
        { label: "Converted Time", value: `${pad(newHour)}:${pad(v.minute)}`, highlight: true },
        { label: "UTC Difference", value: `${diff >= 0 ? "+" : ""}${diff} hours` },
        { label: "Day Change", value: dayShift === 0 ? "Same day" : dayShift > 0 ? "Next day" : "Previous day" },
      ];
    },
    formula: { expression: "New Time = Original ± (To Offset − From Offset)", variables: ["UTC-based conversion"] },
    howToUse: "Enter the time, source UTC offset, and target UTC offset.",
    faqs: [{ question: "What about DST?", answer: "This uses fixed UTC offsets. Check whether your region observes DST and adjust accordingly." }],
    relatedCalcs: dtRelated("time-zone-converter"),
  },
  {
    slug: "countdown-calculator", name: "Countdown Calculator", category: "Date & Time", categorySlug: "datetime",
    description: "Calculate how many days, hours, and minutes remain until a specific date.",
    metaDescription: "Free countdown calculator. Find days remaining until any future date.",
    icon: "clock",
    inputs: [
      { id: "year", label: "Target Year", type: "number", defaultValue: 2026, min: 2024 },
      { id: "month", label: "Target Month (1-12)", type: "number", defaultValue: 1, min: 1, max: 12 },
      { id: "day", label: "Target Day (1-31)", type: "number", defaultValue: 1, min: 1, max: 31 },
    ],
    calculate: (v) => {
      const target = new Date(v.year, v.month - 1, v.day);
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const weeks = Math.floor(days / 7);
      const months = Math.round(days / 30.44);
      return [
        { label: "Days Remaining", value: `${Math.max(0, days)}`, highlight: true },
        { label: "Hours", value: `${Math.max(0, days * 24 + hours)}` },
        { label: "Weeks", value: `${Math.max(0, weeks)}` },
        { label: "Months (approx)", value: `${Math.max(0, months)}` },
      ];
    },
    formula: { expression: "Remaining = Target Date − Now", variables: ["Converted from milliseconds"] },
    howToUse: "Enter a target date to see how much time remains until it arrives.",
    faqs: [{ question: "Does it update in real time?", answer: "The value is calculated when you change inputs. Refresh to get the current countdown." }],
    relatedCalcs: dtRelated("countdown-calculator"),
  },
  {
    slug: "week-number-calculator", name: "Week Number Calculator", category: "Date & Time", categorySlug: "datetime",
    description: "Find the ISO week number and day of year for any date.",
    metaDescription: "Free week number calculator. Find the ISO week number for any date.",
    icon: "clock",
    inputs: [
      { id: "year", label: "Year", type: "number", defaultValue: 2025, min: 1900 },
      { id: "month", label: "Month (1-12)", type: "number", defaultValue: 6, min: 1, max: 12 },
      { id: "day", label: "Day (1-31)", type: "number", defaultValue: 15, min: 1, max: 31 },
    ],
    calculate: (v) => {
      const d = new Date(v.year, v.month - 1, v.day);
      const dayOfYear = Math.floor((d.getTime() - new Date(v.year, 0, 0).getTime()) / 86400000);
      // ISO week calculation
      const jan4 = new Date(v.year, 0, 4);
      const startOfWeek1 = new Date(jan4);
      startOfWeek1.setDate(jan4.getDate() - ((jan4.getDay() + 6) % 7));
      const weekNum = Math.ceil(((d.getTime() - startOfWeek1.getTime()) / 86400000 + 1) / 7);
      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return [
        { label: "Week Number", value: `Week ${Math.max(1, weekNum)}`, highlight: true },
        { label: "Day of Year", value: `${dayOfYear}` },
        { label: "Day of Week", value: dayNames[d.getDay()] },
        { label: "Quarter", value: `Q${Math.ceil(v.month / 3)}` },
      ];
    },
    formula: { expression: "ISO 8601 week numbering", variables: ["Week 1 contains January 4th"] },
    howToUse: "Enter a date to find its ISO week number, day of year, and more.",
    faqs: [{ question: "What is ISO week numbering?", answer: "ISO 8601 defines week 1 as the week containing the first Thursday of January. Weeks start on Monday." }],
    relatedCalcs: dtRelated("week-number-calculator"),
  },
  {
    slug: "add-subtract-days-calculator", name: "Add/Subtract Days Calculator", category: "Date & Time", categorySlug: "datetime",
    description: "Add or subtract a number of days from a date to find the resulting date.",
    metaDescription: "Free add/subtract days calculator. Find a date X days before or after a given date.",
    icon: "clock",
    inputs: [
      { id: "year", label: "Start Year", type: "number", defaultValue: 2025, min: 1900 },
      { id: "month", label: "Start Month (1-12)", type: "number", defaultValue: 1, min: 1, max: 12 },
      { id: "day", label: "Start Day (1-31)", type: "number", defaultValue: 1, min: 1, max: 31 },
      { id: "addDays", label: "Days to Add (negative to subtract)", type: "number", defaultValue: 90 },
    ],
    calculate: (v) => {
      const start = new Date(v.year, v.month - 1, v.day);
      const result = new Date(start);
      result.setDate(result.getDate() + v.addDays);
      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return [
        { label: "Result Date", value: result.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }), highlight: true },
        { label: "Day of Week", value: dayNames[result.getDay()] },
        { label: "Weeks", value: `${Math.abs(Math.floor(v.addDays / 7))} weeks, ${Math.abs(v.addDays % 7)} days` },
      ];
    },
    formula: { expression: "Result = Start Date + Days", variables: ["Negative days subtracts"] },
    howToUse: "Enter a starting date and number of days to add (or subtract with negative values).",
    faqs: [{ question: "Does it handle leap years?", answer: "Yes, JavaScript's Date object handles leap years automatically." }],
    relatedCalcs: dtRelated("add-subtract-days-calculator"),
  },
  {
    slug: "retirement-date-calculator", name: "Retirement Date Calculator", category: "Date & Time", categorySlug: "datetime",
    description: "Estimate your retirement date based on your current age and planned retirement age.",
    metaDescription: "Free retirement date calculator. Find your retirement date and remaining working years.",
    icon: "clock",
    inputs: [
      { id: "birthYear", label: "Birth Year", type: "number", defaultValue: 1985, min: 1940 },
      { id: "birthMonth", label: "Birth Month (1-12)", type: "number", defaultValue: 6, min: 1, max: 12 },
      { id: "retireAge", label: "Retirement Age", type: "number", defaultValue: 65, min: 40, max: 100 },
    ],
    calculate: (v) => {
      const retireYear = v.birthYear + v.retireAge;
      const retireDate = new Date(retireYear, v.birthMonth - 1, 1);
      const now = new Date();
      const daysLeft = Math.max(0, Math.round((retireDate.getTime() - now.getTime()) / 86400000));
      const yearsLeft = (daysLeft / 365.25).toFixed(1);
      return [
        { label: "Retirement Date", value: retireDate.toLocaleDateString("en-US", { month: "long", year: "numeric" }), highlight: true },
        { label: "Years Remaining", value: `${yearsLeft} years` },
        { label: "Days Remaining", value: daysLeft.toLocaleString() },
        { label: "Work Weeks Left", value: `≈ ${Math.round(daysLeft / 7 * 5 / 7).toLocaleString()}` },
      ];
    },
    formula: { expression: "Retirement Date = Birth Date + Retirement Age", variables: ["Simple age addition"] },
    howToUse: "Enter your birth year/month and desired retirement age to see your retirement timeline.",
    faqs: [{ question: "What is the average retirement age?", answer: "In the US, the average retirement age is around 62-65. Social Security full retirement age is 66-67 depending on birth year." }],
    relatedCalcs: dtRelated("retirement-date-calculator"),
  },
  {
    slug: "due-date-calculator", name: "Due Date Calculator", category: "Date & Time", categorySlug: "datetime",
    description: "Calculate a due date by adding a number of days or weeks to a start date.",
    metaDescription: "Free due date calculator. Find a deadline date from a start date plus duration.",
    icon: "clock",
    inputs: [
      { id: "year", label: "Start Year", type: "number", defaultValue: 2025, min: 1900 },
      { id: "month", label: "Start Month (1-12)", type: "number", defaultValue: 2, min: 1, max: 12 },
      { id: "day", label: "Start Day (1-31)", type: "number", defaultValue: 1, min: 1, max: 31 },
      { id: "duration", label: "Duration (days)", type: "number", defaultValue: 30, min: 0 },
    ],
    calculate: (v) => {
      const start = new Date(v.year, v.month - 1, v.day);
      const due = new Date(start);
      due.setDate(due.getDate() + v.duration);
      const now = new Date();
      const daysLeft = Math.round((due.getTime() - now.getTime()) / 86400000);
      return [
        { label: "Due Date", value: due.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }), highlight: true },
        { label: "Days from Now", value: `${daysLeft}` },
        { label: "Weeks", value: `${Math.floor(v.duration / 7)} weeks, ${v.duration % 7} days` },
      ];
    },
    formula: { expression: "Due = Start + Duration", variables: ["Duration in days"] },
    howToUse: "Enter a start date and duration in days to calculate the due date.",
    faqs: [{ question: "Can I use weeks?", answer: "Multiply weeks by 7 and enter as days." }],
    relatedCalcs: dtRelated("due-date-calculator"),
  },
  {
    slug: "chronological-age-calculator", name: "Chronological Age Calculator", category: "Date & Time", categorySlug: "datetime",
    description: "Calculate exact chronological age in years, months, and days — often used for educational assessments.",
    metaDescription: "Free chronological age calculator. Precise age in years, months, days for assessments.",
    icon: "clock",
    inputs: [
      { id: "birthYear", label: "Birth Year", type: "number", defaultValue: 2015, min: 1900 },
      { id: "birthMonth", label: "Birth Month (1-12)", type: "number", defaultValue: 3, min: 1, max: 12 },
      { id: "birthDay", label: "Birth Day (1-31)", type: "number", defaultValue: 10, min: 1, max: 31 },
      { id: "testYear", label: "Test Year", type: "number", defaultValue: 2025, min: 1900 },
      { id: "testMonth", label: "Test Month (1-12)", type: "number", defaultValue: 2, min: 1, max: 12 },
      { id: "testDay", label: "Test Day (1-31)", type: "number", defaultValue: 19, min: 1, max: 31 },
    ],
    calculate: (v) => {
      let years = v.testYear - v.birthYear;
      let months = v.testMonth - v.birthMonth;
      let days = v.testDay - v.birthDay;
      if (days < 0) { months--; days += new Date(v.testYear, v.testMonth - 1, 0).getDate(); }
      if (months < 0) { years--; months += 12; }
      const totalMonths = years * 12 + months;
      return [
        { label: "Chronological Age", value: `${years} years, ${months} months, ${days} days`, highlight: true },
        { label: "Total Months", value: `${totalMonths}` },
        { label: "Years (decimal)", value: `${(totalMonths / 12).toFixed(2)}` },
      ];
    },
    formula: { expression: "Age = Test Date − Birth Date", variables: ["Used in educational/psychological assessments"] },
    howToUse: "Enter the birth date and test/reference date to get the exact chronological age.",
    faqs: [{ question: "Why is this different from a regular age calculator?", answer: "Chronological age calculators allow specifying a reference date other than today — useful for test scoring and assessments." }],
    relatedCalcs: dtRelated("chronological-age-calculator"),
  },
];
