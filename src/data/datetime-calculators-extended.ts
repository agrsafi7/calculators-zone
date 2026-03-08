import { CalculatorConfig } from "@/components/CalculatorTemplate";

const rel = (exclude: string) => [
  { name: "Age Calculator", slug: "age-calculator", icon: "clock", category: "datetime" },
  { name: "Date Difference", slug: "date-difference-calculator", icon: "clock", category: "datetime" },
  { name: "Countdown", slug: "countdown-calculator", icon: "clock", category: "datetime" },
].filter(c => c.slug !== exclude);

const makeDt = (slug: string, name: string, desc: string, meta: string, subcategory: string, inputs: CalculatorConfig["inputs"], calculate: CalculatorConfig["calculate"], formula: CalculatorConfig["formula"]): CalculatorConfig => ({
  slug, name, category: "Date & Time", categorySlug: "datetime", description: desc, metaDescription: meta, icon: "clock", subcategory,
  inputs, calculate, formula,
  howToUse: `Enter values to calculate using the ${name}.`,
  faqs: [{ question: `How does the ${name} work?`, answer: desc }],
  relatedCalcs: rel(slug),
});

export const datetimeCalculatorsExtended: CalculatorConfig[] = [
  // Age Calculators
  makeDt("age-in-days-calculator", "Age in Days Calculator", "Calculate your exact age in days from your date of birth.", "Free age in days calculator.", "Age Calculators",
    [{ id: "birthYear", label: "Birth Year", type: "number", defaultValue: 1990, min: 1900 }, { id: "birthMonth", label: "Birth Month", type: "number", defaultValue: 6, min: 1, max: 12 }, { id: "birthDay", label: "Birth Day", type: "number", defaultValue: 15, min: 1, max: 31 }],
    (v) => { const bd = new Date(v.birthYear, v.birthMonth - 1, v.birthDay); const now = new Date(); const days = Math.floor((now.getTime() - bd.getTime()) / 86400000); return [{ label: "Age in Days", value: days.toLocaleString(), highlight: true }, { label: "In Hours", value: (days * 24).toLocaleString() }, { label: "In Minutes", value: (days * 1440).toLocaleString() }]; },
    { expression: "Days = (Today − Birth Date) / 86400000", variables: ["Milliseconds per day = 86,400,000"] }
  ),
  makeDt("age-in-hours-calculator", "Age in Hours Calculator", "Calculate your exact age in hours from your date of birth.", "Free age in hours calculator.", "Age Calculators",
    [{ id: "birthYear", label: "Birth Year", type: "number", defaultValue: 1990, min: 1900 }, { id: "birthMonth", label: "Birth Month", type: "number", defaultValue: 6, min: 1, max: 12 }, { id: "birthDay", label: "Birth Day", type: "number", defaultValue: 15, min: 1, max: 31 }],
    (v) => { const bd = new Date(v.birthYear, v.birthMonth - 1, v.birthDay); const now = new Date(); const hours = Math.floor((now.getTime() - bd.getTime()) / 3600000); return [{ label: "Age in Hours", value: hours.toLocaleString(), highlight: true }, { label: "In Days", value: Math.floor(hours / 24).toLocaleString() }, { label: "In Seconds", value: (hours * 3600).toLocaleString() }]; },
    { expression: "Hours = (Today − Birth Date) / 3600000", variables: ["Milliseconds per hour = 3,600,000"] }
  ),
  makeDt("age-in-seconds-calculator", "Age in Seconds Calculator", "Calculate your exact age in seconds from your date of birth.", "Free age in seconds calculator.", "Age Calculators",
    [{ id: "birthYear", label: "Birth Year", type: "number", defaultValue: 1990, min: 1900 }, { id: "birthMonth", label: "Birth Month", type: "number", defaultValue: 6, min: 1, max: 12 }, { id: "birthDay", label: "Birth Day", type: "number", defaultValue: 15, min: 1, max: 31 }],
    (v) => { const bd = new Date(v.birthYear, v.birthMonth - 1, v.birthDay); const now = new Date(); const secs = Math.floor((now.getTime() - bd.getTime()) / 1000); return [{ label: "Age in Seconds", value: secs.toLocaleString(), highlight: true }, { label: "In Billion", value: `${(secs / 1e9).toFixed(3)} billion` }]; },
    { expression: "Seconds = (Today − Birth Date) / 1000", variables: ["1 year ≈ 31.5 million seconds"] }
  ),
  // Date Calculators
  makeDt("leap-year-calculator", "Leap Year Calculator", "Check if a year is a leap year and find nearby leap years.", "Free leap year calculator.", "Date Calculators",
    [{ id: "year", label: "Year", type: "number", defaultValue: 2024, min: 1 }],
    (v) => { const isLeap = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0; const next = (() => { let y = v.year + 1; while (!isLeap(y)) y++; return y; })(); const prev = (() => { let y = v.year - 1; while (!isLeap(y)) y--; return y; })(); return [{ label: "Is Leap Year?", value: isLeap(v.year) ? "Yes ✓" : "No ✗", highlight: true }, { label: "Days in Year", value: isLeap(v.year) ? "366" : "365" }, { label: "Next Leap Year", value: `${next}` }, { label: "Previous Leap Year", value: `${prev}` }]; },
    { expression: "Leap if: (÷4 and not ÷100) or ÷400", variables: ["2000 was leap, 1900 was not"] }
  ),
  makeDt("day-of-year-calculator", "Day of Year Calculator", "Find the day number (1-365/366) for any date.", "Free day of year calculator.", "Date Calculators",
    [{ id: "year", label: "Year", type: "number", defaultValue: 2025, min: 1900 }, { id: "month", label: "Month", type: "number", defaultValue: 6, min: 1, max: 12 }, { id: "day", label: "Day", type: "number", defaultValue: 15, min: 1, max: 31 }],
    (v) => { const d = new Date(v.year, v.month - 1, v.day); const start = new Date(v.year, 0, 0); const dayNum = Math.floor((d.getTime() - start.getTime()) / 86400000); const daysInYear = (v.year % 4 === 0 && v.year % 100 !== 0) || v.year % 400 === 0 ? 366 : 365; return [{ label: "Day of Year", value: `${dayNum}`, highlight: true }, { label: "Days Remaining", value: `${daysInYear - dayNum}` }, { label: "% of Year", value: `${((dayNum / daysInYear) * 100).toFixed(1)}%` }]; },
    { expression: "Day number from January 1", variables: ["1-365 (or 366 in leap years)"] }
  ),
  makeDt("quarter-calculator", "Quarter Calculator", "Find the fiscal quarter for any date and quarter start/end dates.", "Free quarter calculator.", "Date Calculators",
    [{ id: "month", label: "Month (1-12)", type: "number", defaultValue: 6, min: 1, max: 12 }],
    (v) => { const q = Math.ceil(v.month / 3); const starts = ["Jan 1", "Apr 1", "Jul 1", "Oct 1"]; const ends = ["Mar 31", "Jun 30", "Sep 30", "Dec 31"]; return [{ label: "Quarter", value: `Q${q}`, highlight: true }, { label: "Start", value: starts[q - 1] }, { label: "End", value: ends[q - 1] }, { label: "Months", value: `${(q - 1) * 3 + 1} – ${q * 3}` }]; },
    { expression: "Q = ceil(month / 3)", variables: ["Q1: Jan-Mar, Q2: Apr-Jun, Q3: Jul-Sep, Q4: Oct-Dec"] }
  ),
  makeDt("date-to-unix-timestamp-calculator", "Unix Timestamp Calculator", "Convert dates to Unix timestamps and vice versa.", "Free Unix timestamp converter.", "Date Calculators",
    [{ id: "year", label: "Year", type: "number", defaultValue: 2025, min: 1970 }, { id: "month", label: "Month", type: "number", defaultValue: 1, min: 1, max: 12 }, { id: "day", label: "Day", type: "number", defaultValue: 1, min: 1, max: 31 }],
    (v) => { const d = new Date(v.year, v.month - 1, v.day); const ts = Math.floor(d.getTime() / 1000); return [{ label: "Unix Timestamp", value: ts.toLocaleString(), highlight: true }, { label: "ISO 8601", value: d.toISOString() }, { label: "Milliseconds", value: (ts * 1000).toLocaleString() }]; },
    { expression: "Seconds since Jan 1, 1970 00:00:00 UTC", variables: ["Unix epoch = 1970-01-01"] }
  ),
  // Time Calculators
  makeDt("time-addition-calculator", "Time Addition Calculator", "Add hours, minutes, and seconds together.", "Free time addition calculator.", "Time Calculators",
    [{ id: "h1", label: "Hours 1", type: "number", defaultValue: 2, min: 0 }, { id: "m1", label: "Minutes 1", type: "number", defaultValue: 45, min: 0 }, { id: "h2", label: "Hours 2", type: "number", defaultValue: 1, min: 0 }, { id: "m2", label: "Minutes 2", type: "number", defaultValue: 30, min: 0 }],
    (v) => { const totalMin = v.h1 * 60 + v.m1 + v.h2 * 60 + v.m2; const h = Math.floor(totalMin / 60); const m = totalMin % 60; return [{ label: "Total", value: `${h}h ${m}m`, highlight: true }, { label: "In Minutes", value: `${totalMin}` }, { label: "Decimal Hours", value: (totalMin / 60).toFixed(2) }]; },
    { expression: "Total = Time1 + Time2 (in minutes)", variables: ["Convert to minutes, add, convert back"] }
  ),
  makeDt("military-time-converter", "Military Time Converter", "Convert between 12-hour and 24-hour (military) time formats.", "Free military time converter.", "Time Calculators",
    [{ id: "hour", label: "Hour (1-12)", type: "number", defaultValue: 3, min: 1, max: 12 }, { id: "minute", label: "Minute", type: "number", defaultValue: 30, min: 0, max: 59 }, { id: "pm", label: "PM (1=yes, 0=no)", type: "number", defaultValue: 1, min: 0, max: 1 }],
    (v) => { let h24 = v.hour; if (v.pm && v.hour !== 12) h24 += 12; if (!v.pm && v.hour === 12) h24 = 0; const pad = (n: number) => String(n).padStart(2, "0"); return [{ label: "Military Time", value: `${pad(h24)}${pad(v.minute)}`, highlight: true }, { label: "24-Hour", value: `${pad(h24)}:${pad(v.minute)}` }, { label: "12-Hour", value: `${v.hour}:${pad(v.minute)} ${v.pm ? "PM" : "AM"}` }]; },
    { expression: "PM: add 12 (except 12 PM). AM: 12 AM = 0000", variables: ["1:00 PM = 1300"] }
  ),
  // Work & Business
  makeDt("pay-period-calculator", "Pay Period Calculator", "Calculate pay periods and annual salary from hourly, weekly, or monthly pay.", "Free pay period calculator.", "Work & Business",
    [{ id: "amount", label: "Pay Amount ($)", type: "number", defaultValue: 2500, step: 1 }, { id: "period", label: "Period", type: "select", defaultValue: 2, options: [{ value: 0, label: "Hourly" }, { value: 1, label: "Weekly" }, { value: 2, label: "Bi-weekly" }, { value: 3, label: "Monthly" }] }],
    (v) => { const toAnnual = [2080, 52, 26, 12]; const annual = v.amount * toAnnual[v.period]; return [{ label: "Annual Salary", value: `$${annual.toLocaleString()}`, highlight: true }, { label: "Monthly", value: `$${(annual / 12).toFixed(0)}` }, { label: "Bi-weekly", value: `$${(annual / 26).toFixed(0)}` }, { label: "Weekly", value: `$${(annual / 52).toFixed(0)}` }]; },
    { expression: "Annual = Amount × Periods per Year", variables: ["Hourly × 2080", "Bi-weekly × 26"] }
  ),
  makeDt("overtime-calculator", "Overtime Calculator", "Calculate overtime pay with standard 1.5x and 2x rates.", "Free overtime calculator.", "Work & Business",
    [{ id: "hourlyRate", label: "Hourly Rate ($)", type: "number", defaultValue: 25, step: 0.5 }, { id: "regularHours", label: "Regular Hours/Week", type: "number", defaultValue: 40, step: 1 }, { id: "overtimeHours", label: "Overtime Hours", type: "number", defaultValue: 10, step: 0.5 }],
    (v) => { const regPay = v.hourlyRate * v.regularHours; const otPay = v.hourlyRate * 1.5 * v.overtimeHours; const total = regPay + otPay; return [{ label: "Total Weekly Pay", value: `$${total.toFixed(2)}`, highlight: true }, { label: "Regular Pay", value: `$${regPay.toFixed(2)}` }, { label: "Overtime Pay", value: `$${otPay.toFixed(2)}` }, { label: "OT Rate", value: `$${(v.hourlyRate * 1.5).toFixed(2)}/hr` }]; },
    { expression: "OT Pay = Hours × Rate × 1.5", variables: ["Standard overtime = 1.5× after 40 hrs"] }
  ),
  // Countdown & Tracking
  makeDt("birthday-countdown-calculator", "Birthday Countdown Calculator", "Calculate how many days until your next birthday.", "Free birthday countdown calculator.", "Countdown & Tracking",
    [{ id: "birthMonth", label: "Birth Month (1-12)", type: "number", defaultValue: 6, min: 1, max: 12 }, { id: "birthDay", label: "Birth Day (1-31)", type: "number", defaultValue: 15, min: 1, max: 31 }],
    (v) => { const now = new Date(); const nextBd = new Date(now.getFullYear(), v.birthMonth - 1, v.birthDay); if (nextBd <= now) nextBd.setFullYear(nextBd.getFullYear() + 1); const days = Math.ceil((nextBd.getTime() - now.getTime()) / 86400000); const weeks = Math.floor(days / 7); return [{ label: "Days Until Birthday", value: `${days}`, highlight: true }, { label: "Weeks", value: `${weeks}` }, { label: "On", value: nextBd.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }) }]; },
    { expression: "Days = Next Birthday − Today", variables: ["Rolls to next year if birthday passed"] }
  ),
  makeDt("holiday-countdown-calculator", "Holiday Countdown Calculator", "Calculate days until major holidays: Christmas, New Year, etc.", "Free holiday countdown calculator.", "Countdown & Tracking",
    [{ id: "holiday", label: "Holiday", type: "select", defaultValue: 0, options: [{ value: 0, label: "Christmas (Dec 25)" }, { value: 1, label: "New Year (Jan 1)" }, { value: 2, label: "Valentine's (Feb 14)" }, { value: 3, label: "Halloween (Oct 31)" }] }],
    (v) => { const now = new Date(); const holidays = [[11, 25], [0, 1], [1, 14], [9, 31]]; const [m, d] = holidays[v.holiday]; let target = new Date(now.getFullYear(), m, d); if (target <= now) target.setFullYear(target.getFullYear() + 1); const days = Math.ceil((target.getTime() - now.getTime()) / 86400000); return [{ label: "Days Until", value: `${days}`, highlight: true }, { label: "Weeks", value: `${Math.floor(days / 7)}` }, { label: "Date", value: target.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }) }]; },
    { expression: "Days = Holiday Date − Today", variables: ["Rolls to next year if passed"] }
  ),
  makeDt("pregnancy-due-date-calculator", "Pregnancy Due Date Calculator", "Estimate due date based on last menstrual period (LMP + 280 days).", "Free pregnancy due date calculator.", "Countdown & Tracking",
    [{ id: "lmpYear", label: "LMP Year", type: "number", defaultValue: 2025, min: 2020 }, { id: "lmpMonth", label: "LMP Month", type: "number", defaultValue: 1, min: 1, max: 12 }, { id: "lmpDay", label: "LMP Day", type: "number", defaultValue: 1, min: 1, max: 31 }],
    (v) => { const lmp = new Date(v.lmpYear, v.lmpMonth - 1, v.lmpDay); const due = new Date(lmp); due.setDate(due.getDate() + 280); const now = new Date(); const weeksPreg = Math.floor((now.getTime() - lmp.getTime()) / (7 * 86400000)); const daysLeft = Math.ceil((due.getTime() - now.getTime()) / 86400000); const trimester = weeksPreg <= 12 ? "1st" : weeksPreg <= 27 ? "2nd" : "3rd"; return [{ label: "Due Date", value: due.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }), highlight: true }, { label: "Weeks Pregnant", value: `${Math.max(0, weeksPreg)}` }, { label: "Days Remaining", value: `${Math.max(0, daysLeft)}` }, { label: "Trimester", value: trimester }]; },
    { expression: "Due = LMP + 280 days (40 weeks)", variables: ["Naegele's rule", "Average pregnancy = 280 days"] }
  ),
  // Time Zones
  makeDt("world-clock-calculator", "World Clock Calculator", "See the current time in major cities worldwide based on UTC offsets.", "Free world clock calculator.", "Time Zones",
    [{ id: "utcHour", label: "UTC Hour (0-23)", type: "number", defaultValue: 12, min: 0, max: 23 }, { id: "utcMinute", label: "UTC Minute", type: "number", defaultValue: 0, min: 0, max: 59 }],
    (v) => { const pad = (n: number) => String(((n % 24) + 24) % 24).padStart(2, "0"); return [{ label: "UTC", value: `${pad(v.utcHour)}:${String(v.utcMinute).padStart(2, "0")}`, highlight: true }, { label: "New York (UTC-5)", value: `${pad(v.utcHour - 5)}:${String(v.utcMinute).padStart(2, "0")}` }, { label: "London (UTC+0)", value: `${pad(v.utcHour)}:${String(v.utcMinute).padStart(2, "0")}` }, { label: "Tokyo (UTC+9)", value: `${pad(v.utcHour + 9)}:${String(v.utcMinute).padStart(2, "0")}` }]; },
    { expression: "Local = UTC + Offset", variables: ["Fixed UTC offsets (no DST adjustment)"] }
  ),
  makeDt("dst-calculator", "DST Date Calculator", "Find Daylight Saving Time start and end dates for US.", "Free DST date calculator.", "Time Zones",
    [{ id: "year", label: "Year", type: "number", defaultValue: 2025, min: 2020, max: 2035 }],
    (v) => { const marchSecondSun = (() => { const d = new Date(v.year, 2, 1); const day = d.getDay(); return 8 + (7 - day) % 7; })(); const novFirstSun = (() => { const d = new Date(v.year, 10, 1); const day = d.getDay(); return 1 + (7 - day) % 7; })(); return [{ label: "Spring Forward", value: `March ${marchSecondSun}, ${v.year}`, highlight: true }, { label: "Fall Back", value: `November ${novFirstSun}, ${v.year}` }, { label: "DST Duration", value: "~238 days" }]; },
    { expression: "US: 2nd Sunday March → 1st Sunday November", variables: ["Clocks spring forward at 2:00 AM"] }
  ),
];
