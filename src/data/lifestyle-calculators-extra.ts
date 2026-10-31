import { CalculatorConfig } from "@/components/CalculatorTemplate";

const rel = (exclude: string) => [
  { name: "Trip Cost Calculator", slug: "trip-cost-calculator", icon: "smile", category: "lifestyle" },
  { name: "Sleep Calculator", slug: "sleep-calculator", icon: "smile", category: "lifestyle" },
  { name: "Electricity Calculator", slug: "electricity-calculator", icon: "smile", category: "lifestyle" },
].filter(c => c.slug !== exclude);

const mk = (slug: string, name: string, desc: string, meta: string, sub: string, inputs: CalculatorConfig["inputs"], calculate: CalculatorConfig["calculate"], formula: CalculatorConfig["formula"]): CalculatorConfig => ({
  slug, name, category: "Lifestyle", categorySlug: "lifestyle", description: desc, metaDescription: meta, icon: "smile", subcategory: sub,
  inputs, calculate, formula,
  howToUse: `Enter values to use the ${name}.`,
  faqs: [{ question: `What does the ${name} do?`, answer: desc }],
  relatedCalcs: rel(slug),
});

export const lifestyleCalculatorsExtra: CalculatorConfig[] = [
  // ═══════════════════════════════════════════
  // TIME & DATE
  // ═══════════════════════════════════════════
  mk("weeks-between-dates-calculator", "Weeks Between Dates Calculator", "Calculate the number of weeks between two dates.", "Free weeks between dates calculator.", "Time & Date",
    [{ id: "days", label: "Total Days Between", type: "number", defaultValue: 90, step: 1 }],
    (v) => { const weeks = v.days / 7; return [{ label: "Weeks", value: `${weeks.toFixed(1)}`, highlight: true }, { label: "Full Weeks", value: `${Math.floor(weeks)}` }, { label: "Remaining Days", value: `${v.days % 7}` }]; },
    { expression: "Weeks = Days / 7", variables: ["Remainder = Days mod 7"] }
  ),
  mk("months-between-dates-calculator", "Months Between Dates Calculator", "Calculate months between two dates.", "Free months between dates calculator.", "Time & Date",
    [{ id: "days", label: "Total Days Between", type: "number", defaultValue: 365, step: 1 }],
    (v) => { const months = v.days / 30.44; return [{ label: "Approx Months", value: `${months.toFixed(1)}`, highlight: true }, { label: "Weeks", value: `${(v.days / 7).toFixed(1)}` }, { label: "Days", value: `${v.days}` }]; },
    { expression: "Months ≈ Days / 30.44", variables: ["Average days per month = 30.44"] }
  ),
  mk("years-between-dates-calculator", "Years Between Dates Calculator", "Calculate years between two dates.", "Free years between dates calculator.", "Time & Date",
    [{ id: "days", label: "Total Days Between", type: "number", defaultValue: 730, step: 1 }],
    (v) => { const years = v.days / 365.25; return [{ label: "Years", value: `${years.toFixed(2)}`, highlight: true }, { label: "Months", value: `${(v.days / 30.44).toFixed(1)}` }, { label: "Weeks", value: `${(v.days / 7).toFixed(0)}` }]; },
    { expression: "Years = Days / 365.25", variables: ["Accounts for leap years"] }
  ),
  mk("weekend-days-calculator", "Weekend Days Calculator", "Calculate number of weekend days in a period.", "Free weekend days calculator.", "Time & Date",
    [{ id: "totalDays", label: "Total Days", type: "number", defaultValue: 365, step: 1 }],
    (v) => { const weekends = Math.floor(v.totalDays / 7) * 2 + Math.min(v.totalDays % 7, 2); const weekdays = v.totalDays - weekends; return [{ label: "Weekend Days", value: `${weekends}`, highlight: true }, { label: "Weekdays", value: `${weekdays}` }, { label: "Full Weeks", value: `${Math.floor(v.totalDays / 7)}` }]; },
    { expression: "Weekends = (Days/7) × 2 + remainder", variables: ["Saturday + Sunday per week"] }
  ),
  mk("day-of-year-calculator", "Day of Year Calculator", "Find what day number of the year a date falls on.", "Free day of year calculator.", "Time & Date",
    [{ id: "month", label: "Month (1-12)", type: "number", defaultValue: 3, min: 1, max: 12 }, { id: "day", label: "Day", type: "number", defaultValue: 8, min: 1, max: 31 }],
    (v) => { const daysInMonths = [31,28,31,30,31,30,31,31,30,31,30,31]; let dayOfYear = v.day; for (let i = 0; i < v.month - 1; i++) dayOfYear += daysInMonths[i]; const remaining = 365 - dayOfYear; return [{ label: "Day of Year", value: `${dayOfYear}`, highlight: true }, { label: "Days Remaining", value: `${remaining}` }, { label: "% of Year", value: `${(dayOfYear / 365 * 100).toFixed(1)}%` }]; },
    { expression: "Sum of days in preceding months + current day", variables: ["Non-leap year basis"] }
  ),
  mk("days-until-calculator", "Days Until Calculator", "Calculate how many days until a target number of days from now.", "Free days until calculator.", "Time & Date",
    [{ id: "target", label: "Target Day of Year", type: "number", defaultValue: 365, min: 1, max: 365 }, { id: "current", label: "Current Day of Year", type: "number", defaultValue: 67, min: 1, max: 365 }],
    (v) => { const days = v.target > v.current ? v.target - v.current : 365 - v.current + v.target; const weeks = days / 7; return [{ label: "Days Until", value: `${days}`, highlight: true }, { label: "Weeks", value: `${weeks.toFixed(1)}` }, { label: "Months", value: `${(days / 30.44).toFixed(1)}` }]; },
    { expression: "Days = Target - Current", variables: ["Wraps around year if needed"] }
  ),
  mk("days-since-calculator", "Days Since Calculator", "Calculate how many days since a past event.", "Free days since calculator.", "Time & Date",
    [{ id: "days", label: "Days Since Event", type: "number", defaultValue: 100, step: 1 }],
    (v) => { return [{ label: "Days Ago", value: `${v.days}`, highlight: true }, { label: "Weeks Ago", value: `${(v.days / 7).toFixed(1)}` }, { label: "Months Ago", value: `${(v.days / 30.44).toFixed(1)}` }, { label: "Years Ago", value: `${(v.days / 365.25).toFixed(2)}` }]; },
    { expression: "Convert days to weeks, months, years", variables: ["1 year ≈ 365.25 days"] }
  ),
  mk("time-between-two-times-calculator", "Time Between Two Times Calculator", "Calculate the duration between two times.", "Free time between two times calculator.", "Time & Date",
    [{ id: "startHour", label: "Start Hour (0-23)", type: "number", defaultValue: 9, min: 0, max: 23 }, { id: "startMin", label: "Start Minute", type: "number", defaultValue: 0, min: 0, max: 59 }, { id: "endHour", label: "End Hour (0-23)", type: "number", defaultValue: 17, min: 0, max: 23 }, { id: "endMin", label: "End Minute", type: "number", defaultValue: 30, min: 0, max: 59 }],
    (v) => { let totalMin = (v.endHour * 60 + v.endMin) - (v.startHour * 60 + v.startMin); if (totalMin < 0) totalMin += 1440; const h = Math.floor(totalMin / 60); const m = totalMin % 60; return [{ label: "Duration", value: `${h}h ${m}m`, highlight: true }, { label: "Total Minutes", value: `${totalMin}` }, { label: "Decimal Hours", value: `${(totalMin / 60).toFixed(2)}` }]; },
    { expression: "Duration = End - Start", variables: ["Wraps past midnight if needed"] }
  ),
  mk("minutes-between-times-calculator", "Minutes Between Times Calculator", "Calculate minutes between two times.", "Free minutes between times calculator.", "Time & Date",
    [{ id: "startMin", label: "Start (total minutes from midnight)", type: "number", defaultValue: 540, min: 0 }, { id: "endMin", label: "End (total minutes from midnight)", type: "number", defaultValue: 1050, min: 0 }],
    (v) => { let diff = v.endMin - v.startMin; if (diff < 0) diff += 1440; return [{ label: "Minutes", value: `${diff}`, highlight: true }, { label: "Hours", value: `${(diff / 60).toFixed(2)}` }, { label: "Seconds", value: `${diff * 60}` }]; },
    { expression: "Minutes = End - Start", variables: ["1440 minutes per day"] }
  ),
  mk("time-zone-difference-calculator", "Time Zone Difference Calculator", "Calculate time difference between two time zones.", "Free time zone difference calculator.", "Time & Date",
    [{ id: "zone1", label: "Zone 1 (UTC offset)", type: "number", defaultValue: -5, step: 0.5 }, { id: "zone2", label: "Zone 2 (UTC offset)", type: "number", defaultValue: 5.5, step: 0.5 }],
    (v) => { const diff = Math.abs(v.zone2 - v.zone1); return [{ label: "Time Difference", value: `${diff} hours`, highlight: true }, { label: "Minutes", value: `${diff * 60}` }, { label: "Direction", value: v.zone2 > v.zone1 ? "Zone 2 is ahead" : "Zone 1 is ahead" }]; },
    { expression: "Diff = |Zone2 - Zone1|", variables: ["UTC offsets from -12 to +14"] }
  ),
  mk("world-time-difference-calculator", "World Time Difference Calculator", "Calculate time differences across world cities.", "Free world time difference calculator.", "Time & Date",
    [{ id: "offset1", label: "City 1 UTC Offset", type: "number", defaultValue: 0, step: 0.5 }, { id: "offset2", label: "City 2 UTC Offset", type: "number", defaultValue: 9, step: 0.5 }, { id: "hour", label: "Time in City 1 (hour)", type: "number", defaultValue: 12, min: 0, max: 23 }],
    (v) => { const diff = v.offset2 - v.offset1; let city2Hour = (v.hour + diff) % 24; if (city2Hour < 0) city2Hour += 24; return [{ label: "Time in City 2", value: `${city2Hour.toFixed(0)}:00`, highlight: true }, { label: "Difference", value: `${diff > 0 ? "+" : ""}${diff}h` }, { label: "Same Day?", value: city2Hour >= 0 && city2Hour < 24 && Math.abs(diff) < 24 ? "Yes" : "May differ" }]; },
    { expression: "City2 Time = City1 Time + (Offset2 - Offset1)", variables: ["Adjust for day boundary"] }
  ),
  mk("meeting-time-planner-calculator", "Meeting Time Planner Calculator", "Find overlapping work hours across time zones.", "Free meeting time planner calculator.", "Time & Date",
    [{ id: "offset1", label: "Zone 1 UTC Offset", type: "number", defaultValue: -5, step: 0.5 }, { id: "offset2", label: "Zone 2 UTC Offset", type: "number", defaultValue: 5.5, step: 0.5 }, { id: "workStart", label: "Work Start (hour)", type: "number", defaultValue: 9, min: 0, max: 23 }, { id: "workEnd", label: "Work End (hour)", type: "number", defaultValue: 17, min: 0, max: 23 }],
    (v) => { const diff = v.offset2 - v.offset1; const z2Start = v.workStart + diff; const z2End = v.workEnd + diff; const overlapStart = Math.max(v.workStart, z2Start); const overlapEnd = Math.min(v.workEnd, z2End); const overlap = Math.max(0, overlapEnd - overlapStart); return [{ label: "Overlap Hours", value: `${overlap.toFixed(1)}h`, highlight: true }, { label: "Best Window (Zone 1)", value: overlap > 0 ? `${overlapStart}:00 - ${overlapEnd}:00` : "None" }, { label: "Time Difference", value: `${Math.abs(diff)}h` }]; },
    { expression: "Overlap = max(0, min(End1,End2) - max(Start1,Start2))", variables: ["Standard 9-5 work hours"] }
  ),
  mk("event-countdown-calculator", "Event Countdown Calculator", "Count down days, hours, and minutes to an event.", "Free event countdown calculator.", "Time & Date",
    [{ id: "daysUntil", label: "Days Until Event", type: "number", defaultValue: 30, step: 1 }],
    (v) => { const hours = v.daysUntil * 24; const min = hours * 60; const weeks = v.daysUntil / 7; return [{ label: "Days", value: `${v.daysUntil}`, highlight: true }, { label: "Hours", value: `${hours.toLocaleString()}` }, { label: "Minutes", value: `${min.toLocaleString()}` }, { label: "Weeks", value: `${weeks.toFixed(1)}` }]; },
    { expression: "Hours = Days × 24", variables: ["Minutes = Hours × 60"] }
  ),
  mk("time-until-birthday-calculator", "Time Until Birthday Calculator", "Calculate time remaining until your next birthday.", "Free birthday countdown calculator.", "Time & Date",
    [{ id: "daysUntil", label: "Days Until Birthday", type: "number", defaultValue: 120, step: 1 }],
    (v) => { const weeks = v.daysUntil / 7; const months = v.daysUntil / 30.44; return [{ label: "Days Until Birthday", value: `${v.daysUntil}`, highlight: true }, { label: "Weeks", value: `${weeks.toFixed(1)}` }, { label: "Months", value: `${months.toFixed(1)}` }, { label: "Hours", value: `${(v.daysUntil * 24).toLocaleString()}` }]; },
    { expression: "Countdown = Birthday - Today", variables: ["Recalculates each year"] }
  ),
  mk("anniversary-countdown-calculator", "Anniversary Countdown Calculator", "Count down to your next anniversary.", "Free anniversary countdown calculator.", "Time & Date",
    [{ id: "daysUntil", label: "Days Until Anniversary", type: "number", defaultValue: 60, step: 1 }, { id: "years", label: "Which Anniversary (#)", type: "number", defaultValue: 5, min: 1 }],
    (v) => { return [{ label: "Days Until", value: `${v.daysUntil}`, highlight: true }, { label: "Anniversary #", value: `${v.years}` }, { label: "Weeks", value: `${(v.daysUntil / 7).toFixed(1)}` }, { label: "Total Years Together", value: `${v.years}` }]; },
    { expression: "Countdown to anniversary date", variables: ["Track your milestones"] }
  ),
  mk("leap-year-calculator", "Leap Year Calculator", "Check if a year is a leap year and calculate next leap year.", "Free leap year calculator.", "Time & Date",
    [{ id: "year", label: "Year", type: "number", defaultValue: 2026, step: 1 }],
    (v) => { const isLeap = (v.year % 4 === 0 && v.year % 100 !== 0) || (v.year % 400 === 0); let next = v.year; while (!((next % 4 === 0 && next % 100 !== 0) || (next % 400 === 0))) next++; if (next === v.year && isLeap) { next = v.year + 1; while (!((next % 4 === 0 && next % 100 !== 0) || (next % 400 === 0))) next++; } return [{ label: "Is Leap Year?", value: isLeap ? "Yes ✓" : "No ✗", highlight: true }, { label: "Days in Year", value: isLeap ? "366" : "365" }, { label: "Next Leap Year", value: `${next}` }]; },
    { expression: "Leap if divisible by 4, not 100, unless 400", variables: ["Feb has 29 days in leap years"] }
  ),
  mk("calendar-week-calculator", "Calendar Week Calculator", "Calculate the ISO calendar week number.", "Free calendar week calculator.", "Time & Date",
    [{ id: "dayOfYear", label: "Day of Year (1-365)", type: "number", defaultValue: 67, min: 1, max: 366 }],
    (v) => { const week = Math.ceil(v.dayOfYear / 7); return [{ label: "Week Number", value: `W${week}`, highlight: true }, { label: "Day of Year", value: `${v.dayOfYear}` }, { label: "Quarter", value: `Q${Math.ceil(v.dayOfYear / 91.25)}` }]; },
    { expression: "Week = ⌈DayOfYear / 7⌉", variables: ["ISO 8601 week numbering"] }
  ),
  mk("quarter-of-year-calculator", "Quarter of Year Calculator", "Determine which quarter a date falls in.", "Free quarter of year calculator.", "Time & Date",
    [{ id: "month", label: "Month (1-12)", type: "number", defaultValue: 3, min: 1, max: 12 }],
    (v) => { const q = Math.ceil(v.month / 3); const qStart = (q - 1) * 3 + 1; const qEnd = q * 3; return [{ label: "Quarter", value: `Q${q}`, highlight: true }, { label: "Months", value: `${qStart} - ${qEnd}` }, { label: "Half", value: q <= 2 ? "H1" : "H2" }]; },
    { expression: "Quarter = ⌈Month / 3⌉", variables: ["Q1: Jan-Mar, Q2: Apr-Jun, Q3: Jul-Sep, Q4: Oct-Dec"] }
  ),

  // ═══════════════════════════════════════════
  // PERSONAL LIFE
  // ═══════════════════════════════════════════
  mk("life-expectancy-calculator", "Life Expectancy Calculator", "Estimate life expectancy based on lifestyle factors.", "Free life expectancy calculator.", "Personal Life",
    [{ id: "age", label: "Current Age", type: "number", defaultValue: 30, min: 1 }, { id: "exercise", label: "Exercise (hrs/week)", type: "number", defaultValue: 3, min: 0 }, { id: "smoker", label: "Smoker? (0=No, 1=Yes)", type: "number", defaultValue: 0, min: 0, max: 1 }, { id: "bmi", label: "BMI", type: "number", defaultValue: 24, step: 0.1 }],
    (v) => { let base = 79; base += Math.min(v.exercise, 7) * 0.5; if (v.smoker) base -= 10; if (v.bmi > 30) base -= 3; else if (v.bmi < 18.5) base -= 2; const remaining = Math.max(0, base - v.age); return [{ label: "Est. Life Expectancy", value: `${base.toFixed(0)} years`, highlight: true }, { label: "Years Remaining", value: `${remaining.toFixed(0)}` }, { label: "Life Lived", value: `${((v.age / base) * 100).toFixed(1)}%` }]; },
    { expression: "Base ± lifestyle adjustments", variables: ["Exercise, smoking, BMI factors"] }
  ),
  mk("personal-milestone-calculator", "Personal Milestone Calculator", "Calculate when you'll reach age milestones.", "Free milestone calculator.", "Personal Life",
    [{ id: "age", label: "Current Age", type: "number", defaultValue: 25, min: 0 }, { id: "milestone", label: "Milestone Age", type: "number", defaultValue: 50, min: 1 }],
    (v) => { const yearsUntil = v.milestone - v.age; const daysUntil = yearsUntil * 365.25; return [{ label: "Years Until", value: `${yearsUntil}`, highlight: true }, { label: "Days Until", value: `${Math.round(daysUntil).toLocaleString()}` }, { label: "Months Until", value: `${(yearsUntil * 12).toFixed(0)}` }]; },
    { expression: "Years = Milestone - Current Age", variables: ["Approximate calculation"] }
  ),
  mk("life-percentage-calculator", "Life Percentage Calculator", "See what percentage of your expected life you've lived.", "Free life percentage calculator.", "Personal Life",
    [{ id: "age", label: "Current Age", type: "number", defaultValue: 30, min: 0 }, { id: "expectancy", label: "Life Expectancy", type: "number", defaultValue: 80, min: 1 }],
    (v) => { const pct = (v.age / v.expectancy) * 100; const remaining = v.expectancy - v.age; return [{ label: "Life Lived", value: `${pct.toFixed(1)}%`, highlight: true }, { label: "Years Remaining", value: `${remaining}` }, { label: "Weeks Remaining", value: `${Math.round(remaining * 52).toLocaleString()}` }]; },
    { expression: "% = (Age / Expectancy) × 100", variables: ["Motivational perspective tool"] }
  ),
  mk("daily-life-percentage-calculator", "Daily Life Percentage Calculator", "See how much of today has passed.", "Free daily life percentage calculator.", "Personal Life",
    [{ id: "hour", label: "Current Hour (0-23)", type: "number", defaultValue: 14, min: 0, max: 23 }, { id: "minute", label: "Current Minute", type: "number", defaultValue: 30, min: 0, max: 59 }],
    (v) => { const totalMin = v.hour * 60 + v.minute; const pct = (totalMin / 1440) * 100; return [{ label: "Day Elapsed", value: `${pct.toFixed(1)}%`, highlight: true }, { label: "Minutes Passed", value: `${totalMin}` }, { label: "Minutes Remaining", value: `${1440 - totalMin}` }]; },
    { expression: "% = (Minutes / 1440) × 100", variables: ["1440 minutes in a day"] }
  ),
  mk("zodiac-sign-calculator", "Zodiac Sign Calculator", "Find your Western zodiac sign from your birth month and day.", "Free zodiac sign calculator.", "Personal Life",
    [{ id: "month", label: "Birth Month (1-12)", type: "number", defaultValue: 3, min: 1, max: 12 }, { id: "day", label: "Birth Day", type: "number", defaultValue: 8, min: 1, max: 31 }],
    (v) => { const signs = ["Capricorn","Aquarius","Pisces","Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn"]; const dates = [20,19,21,20,21,21,23,23,23,23,22,22]; const idx = v.day < dates[v.month - 1] ? v.month - 1 : v.month; return [{ label: "Zodiac Sign", value: signs[idx], highlight: true }, { label: "Element", value: ["Earth","Air","Water","Fire","Earth","Air","Water","Fire","Earth","Air","Water","Fire","Earth"][idx] }]; },
    { expression: "Based on birth date ranges", variables: ["12 Western zodiac signs"] }
  ),
  mk("chinese-zodiac-calculator", "Chinese Zodiac Calculator", "Find your Chinese zodiac animal from birth year.", "Free Chinese zodiac calculator.", "Personal Life",
    [{ id: "year", label: "Birth Year", type: "number", defaultValue: 1996, step: 1 }],
    (v) => { const animals = ["Monkey","Rooster","Dog","Pig","Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat"]; const idx = v.year % 12; return [{ label: "Chinese Zodiac", value: animals[idx], highlight: true }, { label: "Next Occurrence", value: `${v.year + 12}` }, { label: "Element Cycle", value: `${12}-year cycle` }]; },
    { expression: "Animal = Year mod 12", variables: ["12 animals in the cycle"] }
  ),
  mk("happiness-score-calculator", "Happiness Score Calculator", "Estimate your happiness score based on life factors.", "Free happiness score calculator.", "Personal Life",
    [{ id: "health", label: "Health (1-10)", type: "number", defaultValue: 7, min: 1, max: 10 }, { id: "relationships", label: "Relationships (1-10)", type: "number", defaultValue: 8, min: 1, max: 10 }, { id: "career", label: "Career (1-10)", type: "number", defaultValue: 6, min: 1, max: 10 }, { id: "finances", label: "Finances (1-10)", type: "number", defaultValue: 5, min: 1, max: 10 }],
    (v) => { const avg = (v.health * 0.3 + v.relationships * 0.3 + v.career * 0.2 + v.finances * 0.2); const pct = avg * 10; return [{ label: "Happiness Score", value: `${avg.toFixed(1)}/10`, highlight: true }, { label: "Percentage", value: `${pct.toFixed(0)}%` }, { label: "Lowest Area", value: v.health <= v.relationships && v.health <= v.career && v.health <= v.finances ? "Health" : v.relationships <= v.career && v.relationships <= v.finances ? "Relationships" : v.career <= v.finances ? "Career" : "Finances" }]; },
    { expression: "Score = 0.3×Health + 0.3×Relationships + 0.2×Career + 0.2×Finances", variables: ["Weighted average"] }
  ),

  // ═══════════════════════════════════════════
  // RELATIONSHIPS
  // ═══════════════════════════════════════════
  mk("love-compatibility-calculator", "Love Compatibility Calculator", "Fun love compatibility score based on names.", "Free love compatibility calculator.", "Relationships",
    [{ id: "name1len", label: "Your Name Length", type: "number", defaultValue: 5, min: 1 }, { id: "name2len", label: "Partner Name Length", type: "number", defaultValue: 6, min: 1 }],
    (v) => { const score = Math.min(99, Math.abs(((v.name1len * 7 + v.name2len * 13) % 100))); return [{ label: "Compatibility", value: `${score}%`, highlight: true }, { label: "Rating", value: score > 80 ? "❤️ Excellent" : score > 60 ? "💛 Good" : score > 40 ? "🧡 Fair" : "💔 Needs work" }]; },
    { expression: "Fun algorithm based on name characteristics", variables: ["For entertainment only!"] }
  ),
  mk("relationship-duration-calculator", "Relationship Duration Calculator", "Calculate how long you've been in a relationship.", "Free relationship duration calculator.", "Relationships",
    [{ id: "days", label: "Days Together", type: "number", defaultValue: 730, step: 1 }],
    (v) => { const years = Math.floor(v.days / 365.25); const months = Math.floor((v.days % 365.25) / 30.44); const d = Math.round(v.days % 30.44); return [{ label: "Duration", value: `${years}y ${months}m ${d}d`, highlight: true }, { label: "Total Months", value: `${(v.days / 30.44).toFixed(0)}` }, { label: "Total Weeks", value: `${(v.days / 7).toFixed(0)}` }]; },
    { expression: "Years, months, days from total days", variables: ["Track your love story"] }
  ),
  mk("dating-anniversary-calculator", "Dating Anniversary Calculator", "Calculate upcoming dating anniversaries.", "Free dating anniversary calculator.", "Relationships",
    [{ id: "daysTogether", label: "Days Together", type: "number", defaultValue: 500, step: 1 }],
    (v) => { const nextHundred = Math.ceil(v.daysTogether / 100) * 100; const nextYear = Math.ceil(v.daysTogether / 365.25) * 365.25; return [{ label: "Days Together", value: `${v.daysTogether}`, highlight: true }, { label: "Next 100-day Mark", value: `Day ${nextHundred} (in ${nextHundred - v.daysTogether} days)` }, { label: "Next Anniversary", value: `In ${Math.round(nextYear - v.daysTogether)} days` }]; },
    { expression: "Track milestones: 100, 200, 365, 500, 1000 days", variables: ["Celebrate every milestone!"] }
  ),
  mk("wedding-budget-calculator", "Wedding Budget Calculator", "Estimate wedding costs by category.", "Free wedding budget calculator. Enter your total budget and guest count to split costs by category: venue, catering, photography, flowers, and decor.", "Relationships",
    [{ id: "budget", label: "Total Budget ($)", type: "number", defaultValue: 30000, step: 1000 }, { id: "guests", label: "Number of Guests", type: "number", defaultValue: 100, min: 1 }],
    (v) => { const venue = v.budget * 0.40; const catering = v.budget * 0.25; const photo = v.budget * 0.10; const attire = v.budget * 0.08; const perGuest = v.budget / v.guests; return [{ label: "Venue & Decor", value: `$${venue.toLocaleString()}`, highlight: true }, { label: "Catering", value: `$${catering.toLocaleString()}` }, { label: "Photography", value: `$${photo.toLocaleString()}` }, { label: "Attire", value: `$${attire.toLocaleString()}` }, { label: "Cost per Guest", value: `$${perGuest.toFixed(0)}` }]; },
    { expression: "Venue 40%, Catering 25%, Photo 10%, Attire 8%", variables: ["Remaining 17% for other items"] }
  ),
  mk("wedding-guest-calculator", "Wedding Guest Calculator", "Estimate food and seating needs for wedding guests.", "Free wedding guest calculator.", "Relationships",
    [{ id: "guests", label: "Guest Count", type: "number", defaultValue: 120, min: 1 }, { id: "tables", label: "Seats per Table", type: "number", defaultValue: 8, min: 4 }],
    (v) => { const tables = Math.ceil(v.guests / v.tables); const meals = Math.ceil(v.guests * 1.05); const chairs = v.guests + Math.ceil(v.guests * 0.05); return [{ label: "Tables Needed", value: `${tables}`, highlight: true }, { label: "Meals (5% buffer)", value: `${meals}` }, { label: "Chairs", value: `${chairs}` }]; },
    { expression: "Tables = ⌈Guests / SeatsPerTable⌉", variables: ["Add 5% buffer for meals"] }
  ),
  mk("love-percentage-calculator", "Love Percentage Calculator", "Fun love percentage generator.", "Free love percentage calculator.", "Relationships",
    [{ id: "v1", label: "Your Lucky Number", type: "number", defaultValue: 7, min: 1 }, { id: "v2", label: "Partner Lucky Number", type: "number", defaultValue: 3, min: 1 }],
    (v) => { const pct = Math.min(99, (v.v1 * 11 + v.v2 * 17) % 100); return [{ label: "Love %", value: `${pct}%`, highlight: true }, { label: "Verdict", value: pct > 75 ? "Soulmates! 💕" : pct > 50 ? "Great match! 💛" : "Keep trying! 🌟" }]; },
    { expression: "Fun algorithm — not scientific!", variables: ["For entertainment purposes"] }
  ),

  // ═══════════════════════════════════════════
  // HOME & HOUSEHOLD
  // ═══════════════════════════════════════════
  mk("room-area-calculator", "Room Area Calculator", "Calculate the area of a room in multiple units.", "Free room area calculator.", "Home & Household",
    [{ id: "length", label: "Length (ft)", type: "number", defaultValue: 15, step: 0.5 }, { id: "width", label: "Width (ft)", type: "number", defaultValue: 12, step: 0.5 }],
    (v) => { const sqft = v.length * v.width; const sqm = sqft * 0.0929; return [{ label: "Area", value: `${sqft.toFixed(0)} sq ft`, highlight: true }, { label: "In sq meters", value: `${sqm.toFixed(1)} m²` }, { label: "In sq yards", value: `${(sqft / 9).toFixed(1)} yd²` }]; },
    { expression: "Area = Length × Width", variables: ["1 sq ft = 0.0929 m²"] }
  ),
  mk("wall-paint-calculator", "Wall Paint Calculator", "Calculate paint needed for walls with door/window deductions.", "Free wall paint calculator.", "Home & Household",
    [{ id: "length", label: "Room Length (ft)", type: "number", defaultValue: 15, step: 0.5 }, { id: "width", label: "Room Width (ft)", type: "number", defaultValue: 12, step: 0.5 }, { id: "height", label: "Wall Height (ft)", type: "number", defaultValue: 9, step: 0.5 }, { id: "doors", label: "Number of Doors", type: "number", defaultValue: 2, min: 0 }, { id: "windows", label: "Number of Windows", type: "number", defaultValue: 3, min: 0 }],
    (v) => { const wallArea = 2 * (v.length + v.width) * v.height; const deduct = v.doors * 21 + v.windows * 15; const paintable = wallArea - deduct; const gallons = paintable / 350; return [{ label: "Paint Needed", value: `${Math.ceil(gallons)} gallons`, highlight: true }, { label: "Wall Area", value: `${wallArea.toFixed(0)} sq ft` }, { label: "Paintable Area", value: `${paintable.toFixed(0)} sq ft` }]; },
    { expression: "Gallons = Paintable Area / 350", variables: ["Door ≈ 21 sq ft, Window ≈ 15 sq ft"] }
  ),
  mk("furniture-space-calculator", "Furniture Space Calculator", "Check if furniture fits in your room.", "Free furniture space calculator.", "Home & Household",
    [{ id: "roomLength", label: "Room Length (ft)", type: "number", defaultValue: 15, step: 0.5 }, { id: "roomWidth", label: "Room Width (ft)", type: "number", defaultValue: 12, step: 0.5 }, { id: "furnitureArea", label: "Total Furniture Area (sq ft)", type: "number", defaultValue: 80, step: 1 }],
    (v) => { const roomArea = v.roomLength * v.roomWidth; const used = (v.furnitureArea / roomArea) * 100; const remaining = roomArea - v.furnitureArea; return [{ label: "Room Area", value: `${roomArea} sq ft`, highlight: true }, { label: "Space Used", value: `${used.toFixed(1)}%` }, { label: "Free Space", value: `${remaining.toFixed(0)} sq ft` }, { label: "Recommendation", value: used > 60 ? "Too crowded" : used > 40 ? "Well furnished" : "Spacious" }]; },
    { expression: "Used % = Furniture Area / Room Area × 100", variables: ["Ideal: 30-50% coverage"] }
  ),
  mk("home-renovation-budget-calculator", "Home Renovation Budget Calculator", "Estimate renovation costs by room.", "Free home renovation budget calculator.", "Home & Household",
    [{ id: "sqft", label: "Area (sq ft)", type: "number", defaultValue: 200, step: 10 }, { id: "costPerSqft", label: "Cost per sq ft ($)", type: "number", defaultValue: 100, step: 5 }, { id: "contingency", label: "Contingency (%)", type: "number", defaultValue: 15, min: 0 }],
    (v) => { const base = v.sqft * v.costPerSqft; const cont = base * (v.contingency / 100); const total = base + cont; return [{ label: "Total Budget", value: `$${total.toLocaleString()}`, highlight: true }, { label: "Base Cost", value: `$${base.toLocaleString()}` }, { label: "Contingency", value: `$${cont.toLocaleString()}` }]; },
    { expression: "Total = Area × Cost/sqft × (1 + Contingency%)", variables: ["Add 10-20% contingency"] }
  ),
  mk("electricity-bill-calculator", "Electricity Bill Calculator", "Estimate monthly electricity bill from usage.", "Free electricity bill calculator. Enter usage in kWh, your rate per kWh, and fixed charges to estimate monthly, daily, and annual power costs.", "Home & Household",
    [{ id: "kwh", label: "Monthly kWh", type: "number", defaultValue: 900, step: 10 }, { id: "rate", label: "Rate ($/kWh)", type: "number", defaultValue: 0.12, step: 0.01 }, { id: "fixed", label: "Fixed Charges ($)", type: "number", defaultValue: 15, step: 1 }],
    (v) => { const usage = v.kwh * v.rate; const total = usage + v.fixed; return [{ label: "Monthly Bill", value: `$${total.toFixed(2)}`, highlight: true }, { label: "Usage Charge", value: `$${usage.toFixed(2)}` }, { label: "Daily Cost", value: `$${(total / 30).toFixed(2)}` }, { label: "Annual Estimate", value: `$${(total * 12).toLocaleString()}` }]; },
    { expression: "Bill = kWh × Rate + Fixed", variables: ["Average US home: 900 kWh/month"] }
  ),
  mk("water-usage-calculator", "Water Usage Calculator", "Estimate household water usage and costs.", "Free water usage calculator.", "Home & Household",
    [{ id: "people", label: "People in Household", type: "number", defaultValue: 4, min: 1 }, { id: "gallonsPerDay", label: "Gallons/Person/Day", type: "number", defaultValue: 80, step: 5 }, { id: "rate", label: "Rate ($/1000 gal)", type: "number", defaultValue: 5, step: 0.5 }],
    (v) => { const daily = v.people * v.gallonsPerDay; const monthly = daily * 30; const cost = (monthly / 1000) * v.rate; return [{ label: "Monthly Usage", value: `${monthly.toLocaleString()} gal`, highlight: true }, { label: "Daily Usage", value: `${daily} gal` }, { label: "Monthly Cost", value: `$${cost.toFixed(2)}` }, { label: "Annual Cost", value: `$${(cost * 12).toFixed(0)}` }]; },
    { expression: "Usage = People × Gallons/Day × 30", variables: ["Average: 80-100 gal/person/day"] }
  ),
  mk("gas-consumption-calculator", "Gas Consumption Calculator", "Estimate natural gas consumption and costs.", "Free gas consumption calculator.", "Home & Household",
    [{ id: "therms", label: "Monthly Therms", type: "number", defaultValue: 50, step: 1 }, { id: "rate", label: "Rate ($/therm)", type: "number", defaultValue: 1.2, step: 0.1 }, { id: "fixed", label: "Fixed Charge ($)", type: "number", defaultValue: 12, step: 1 }],
    (v) => { const usage = v.therms * v.rate; const total = usage + v.fixed; return [{ label: "Monthly Bill", value: `$${total.toFixed(2)}`, highlight: true }, { label: "Usage Charge", value: `$${usage.toFixed(2)}` }, { label: "Annual Estimate", value: `$${(total * 12).toFixed(0)}` }]; },
    { expression: "Bill = Therms × Rate + Fixed", variables: ["1 therm = 100,000 BTU"] }
  ),
  mk("appliance-energy-cost-calculator", "Appliance Energy Cost Calculator", "Calculate the cost of running an appliance.", "Free appliance energy cost calculator.", "Home & Household",
    [{ id: "watts", label: "Wattage (W)", type: "number", defaultValue: 1500, step: 50 }, { id: "hours", label: "Hours/Day", type: "number", defaultValue: 4, step: 0.5 }, { id: "rate", label: "Rate ($/kWh)", type: "number", defaultValue: 0.12, step: 0.01 }],
    (v) => { const dailyKwh = (v.watts * v.hours) / 1000; const dailyCost = dailyKwh * v.rate; const monthly = dailyCost * 30; return [{ label: "Monthly Cost", value: `$${monthly.toFixed(2)}`, highlight: true }, { label: "Daily kWh", value: `${dailyKwh.toFixed(2)}` }, { label: "Daily Cost", value: `$${dailyCost.toFixed(2)}` }, { label: "Annual Cost", value: `$${(monthly * 12).toFixed(0)}` }]; },
    { expression: "Cost = (Watts × Hours / 1000) × Rate", variables: ["Convert watts to kWh"] }
  ),
  mk("heating-cost-calculator", "Heating Cost Calculator", "Estimate heating costs for winter months.", "Free heating cost calculator.", "Home & Household",
    [{ id: "sqft", label: "Home Size (sq ft)", type: "number", defaultValue: 2000, step: 100 }, { id: "btuPerSqft", label: "BTU/sq ft needed", type: "number", defaultValue: 30, step: 5 }, { id: "fuelCost", label: "Fuel Cost ($/therm)", type: "number", defaultValue: 1.2, step: 0.1 }, { id: "months", label: "Heating Months", type: "number", defaultValue: 5, min: 1, max: 12 }],
    (v) => { const btuTotal = v.sqft * v.btuPerSqft; const thermsPerMonth = (btuTotal * 24 * 30) / 100000 / 0.8; const monthlyCost = thermsPerMonth * v.fuelCost; const seasonCost = monthlyCost * v.months; return [{ label: "Season Cost", value: `$${seasonCost.toFixed(0)}`, highlight: true }, { label: "Monthly Cost", value: `$${monthlyCost.toFixed(0)}` }, { label: "BTU/hr Needed", value: `${btuTotal.toLocaleString()}` }]; },
    { expression: "Cost based on BTU requirements", variables: ["80% furnace efficiency assumed"] }
  ),
  mk("solar-savings-calculator", "Solar Savings Calculator", "Estimate savings from solar panels.", "Free solar savings calculator.", "Home & Household",
    [{ id: "monthlyBill", label: "Monthly Electric Bill ($)", type: "number", defaultValue: 150, step: 10 }, { id: "offset", label: "Solar Offset (%)", type: "number", defaultValue: 80, min: 0, max: 100 }, { id: "systemCost", label: "System Cost ($)", type: "number", defaultValue: 20000, step: 1000 }],
    (v) => { const annualSavings = v.monthlyBill * 12 * (v.offset / 100); const payback = v.systemCost / annualSavings; const savings25yr = annualSavings * 25 - v.systemCost; return [{ label: "Annual Savings", value: `$${annualSavings.toFixed(0)}`, highlight: true }, { label: "Payback Period", value: `${payback.toFixed(1)} years` }, { label: "25-Year Net Savings", value: `$${savings25yr.toLocaleString()}` }]; },
    { expression: "Savings = Bill × 12 × Offset%", variables: ["25-year panel lifespan"] }
  ),

  // ═══════════════════════════════════════════
  // TRAVEL
  // ═══════════════════════════════════════════
  mk("trip-distance-calculator", "Trip Distance Calculator", "Estimate trip distance from speed and time.", "Free trip distance calculator.", "Travel",
    [{ id: "speed", label: "Average Speed (mph)", type: "number", defaultValue: 60, step: 5 }, { id: "hours", label: "Travel Time (hours)", type: "number", defaultValue: 5, step: 0.5 }],
    (v) => { const dist = v.speed * v.hours; return [{ label: "Distance", value: `${dist.toFixed(0)} miles`, highlight: true }, { label: "In km", value: `${(dist * 1.609).toFixed(0)} km` }]; },
    { expression: "Distance = Speed × Time", variables: ["Average speed accounts for stops"] }
  ),
  mk("travel-time-calculator", "Travel Time Calculator", "Calculate travel time from distance and speed.", "Free travel time calculator.", "Travel",
    [{ id: "distance", label: "Distance (miles)", type: "number", defaultValue: 300, step: 10 }, { id: "speed", label: "Average Speed (mph)", type: "number", defaultValue: 60, step: 5 }],
    (v) => { if (v.speed === 0) return [{ label: "Error", value: "Speed cannot be zero" }]; const hours = v.distance / v.speed; const h = Math.floor(hours); const m = Math.round((hours - h) * 60); return [{ label: "Travel Time", value: `${h}h ${m}m`, highlight: true }, { label: "Decimal Hours", value: `${hours.toFixed(2)}` }]; },
    { expression: "Time = Distance / Speed", variables: ["Add time for stops and traffic"] }
  ),
  mk("road-trip-fuel-cost-calculator", "Road Trip Fuel Cost Calculator", "Calculate fuel cost for a road trip.", "Free road trip fuel cost calculator.", "Travel",
    [{ id: "distance", label: "Distance (miles)", type: "number", defaultValue: 500, step: 10 }, { id: "mpg", label: "Fuel Economy (mpg)", type: "number", defaultValue: 28, step: 1 }, { id: "price", label: "Fuel Price ($/gal)", type: "number", defaultValue: 3.5, step: 0.1 }],
    (v) => { if (v.mpg === 0) return [{ label: "Error", value: "MPG cannot be zero" }]; const gallons = v.distance / v.mpg; const cost = gallons * v.price; return [{ label: "Fuel Cost", value: `$${cost.toFixed(2)}`, highlight: true }, { label: "Gallons Needed", value: `${gallons.toFixed(1)}` }, { label: "Cost per Mile", value: `$${(cost / v.distance).toFixed(3)}` }]; },
    { expression: "Cost = (Distance / MPG) × Price", variables: ["Factor in highway vs city MPG"] }
  ),
  mk("trip-budget-calculator", "Trip Budget Calculator", "Plan a comprehensive trip budget.", "Free trip budget calculator.", "Travel",
    [{ id: "days", label: "Trip Days", type: "number", defaultValue: 7, min: 1 }, { id: "hotel", label: "Hotel/Night ($)", type: "number", defaultValue: 120, step: 10 }, { id: "food", label: "Food/Day ($)", type: "number", defaultValue: 60, step: 5 }, { id: "transport", label: "Transport ($)", type: "number", defaultValue: 500, step: 50 }, { id: "activities", label: "Activities/Day ($)", type: "number", defaultValue: 40, step: 5 }],
    (v) => { const hotel = v.days * v.hotel; const food = v.days * v.food; const act = v.days * v.activities; const total = hotel + food + v.transport + act; return [{ label: "Total Budget", value: `$${total.toLocaleString()}`, highlight: true }, { label: "Lodging", value: `$${hotel.toLocaleString()}` }, { label: "Food", value: `$${food.toLocaleString()}` }, { label: "Per Day", value: `$${(total / v.days).toFixed(0)}` }]; },
    { expression: "Total = (Hotel + Food + Activities) × Days + Transport", variables: ["Add 10-15% buffer"] }
  ),
  mk("flight-duration-calculator", "Flight Duration Calculator", "Estimate flight time from distance.", "Free flight duration calculator.", "Travel",
    [{ id: "distance", label: "Distance (miles)", type: "number", defaultValue: 2500, step: 100 }, { id: "speed", label: "Avg Air Speed (mph)", type: "number", defaultValue: 550, step: 10 }],
    (v) => { if (v.speed === 0) return [{ label: "Error", value: "Speed cannot be zero" }]; const hours = v.distance / v.speed; const h = Math.floor(hours); const m = Math.round((hours - h) * 60); return [{ label: "Flight Time", value: `${h}h ${m}m`, highlight: true }, { label: "With Layover (+2h)", value: `${h + 2}h ${m}m` }]; },
    { expression: "Time = Distance / Speed", variables: ["Average commercial: 550 mph"] }
  ),
  mk("luggage-weight-calculator", "Luggage Weight Calculator", "Check if your luggage meets airline weight limits.", "Free luggage weight calculator.", "Travel",
    [{ id: "items", label: "Total Items Weight (lbs)", type: "number", defaultValue: 40, step: 0.5 }, { id: "bagWeight", label: "Bag Weight (lbs)", type: "number", defaultValue: 8, step: 0.5 }, { id: "limit", label: "Airline Limit (lbs)", type: "number", defaultValue: 50, step: 1 }],
    (v) => { const total = v.items + v.bagWeight; const diff = v.limit - total; return [{ label: "Total Weight", value: `${total.toFixed(1)} lbs`, highlight: true }, { label: "Remaining", value: diff >= 0 ? `${diff.toFixed(1)} lbs left` : `${Math.abs(diff).toFixed(1)} lbs OVER!` }, { label: "In kg", value: `${(total * 0.4536).toFixed(1)} kg` }]; },
    { expression: "Total = Items + Bag Weight", variables: ["Typical limit: 50 lbs checked, 22 lbs carry-on"] }
  ),
  mk("hotel-cost-calculator", "Hotel Cost Calculator", "Calculate total hotel stay cost with taxes.", "Free hotel cost calculator.", "Travel",
    [{ id: "rate", label: "Nightly Rate ($)", type: "number", defaultValue: 120, step: 10 }, { id: "nights", label: "Number of Nights", type: "number", defaultValue: 5, min: 1 }, { id: "tax", label: "Tax Rate (%)", type: "number", defaultValue: 12, min: 0 }, { id: "resort", label: "Resort Fee/Night ($)", type: "number", defaultValue: 25, step: 5 }],
    (v) => { const subtotal = v.rate * v.nights; const taxAmt = subtotal * (v.tax / 100); const fees = v.resort * v.nights; const total = subtotal + taxAmt + fees; return [{ label: "Total Cost", value: `$${total.toFixed(2)}`, highlight: true }, { label: "Room Cost", value: `$${subtotal.toFixed(0)}` }, { label: "Taxes", value: `$${taxAmt.toFixed(2)}` }, { label: "Resort Fees", value: `$${fees.toFixed(0)}` }]; },
    { expression: "Total = (Rate × Nights) × (1 + Tax%) + Fees", variables: ["Check for hidden resort fees"] }
  ),
  mk("trip-cost-per-person-calculator", "Trip Cost Per Person Calculator", "Split trip costs among travelers.", "Free trip cost per person calculator.", "Travel",
    [{ id: "total", label: "Total Trip Cost ($)", type: "number", defaultValue: 5000, step: 100 }, { id: "people", label: "Number of People", type: "number", defaultValue: 4, min: 1 }],
    (v) => { const perPerson = v.total / v.people; return [{ label: "Cost per Person", value: `$${perPerson.toFixed(2)}`, highlight: true }, { label: "Per Person/Day (7d)", value: `$${(perPerson / 7).toFixed(0)}` }]; },
    { expression: "Per Person = Total / People", variables: ["Split evenly or by usage"] }
  ),
  mk("vacation-budget-calculator", "Vacation Budget Calculator", "Plan a complete vacation budget.", "Free vacation budget calculator.", "Travel",
    [{ id: "flights", label: "Flights ($)", type: "number", defaultValue: 800, step: 50 }, { id: "hotel", label: "Total Hotel ($)", type: "number", defaultValue: 1200, step: 100 }, { id: "food", label: "Total Food ($)", type: "number", defaultValue: 700, step: 50 }, { id: "activities", label: "Activities ($)", type: "number", defaultValue: 500, step: 50 }, { id: "misc", label: "Miscellaneous ($)", type: "number", defaultValue: 300, step: 50 }],
    (v) => { const total = v.flights + v.hotel + v.food + v.activities + v.misc; return [{ label: "Total Vacation Budget", value: `$${total.toLocaleString()}`, highlight: true }, { label: "Largest Expense", value: v.hotel > v.flights ? "Hotel" : "Flights" }, { label: "Food %", value: `${((v.food / total) * 100).toFixed(0)}%` }]; },
    { expression: "Total = Flights + Hotel + Food + Activities + Misc", variables: ["Budget for souvenirs too!"] }
  ),

  // ═══════════════════════════════════════════
  // FOOD & COOKING
  // ═══════════════════════════════════════════
  mk("recipe-ingredient-scaler", "Recipe Ingredient Scaler", "Scale recipe ingredients up or down.", "Free recipe ingredient scaler.", "Food & Cooking",
    [{ id: "original", label: "Original Servings", type: "number", defaultValue: 4, min: 1 }, { id: "desired", label: "Desired Servings", type: "number", defaultValue: 8, min: 1 }, { id: "amount", label: "Ingredient Amount", type: "number", defaultValue: 2, step: 0.25 }],
    (v) => { if (v.original === 0) return [{ label: "Error", value: "Original servings cannot be zero" }]; const factor = v.desired / v.original; const scaled = v.amount * factor; return [{ label: "Scaled Amount", value: `${scaled.toFixed(2)}`, highlight: true }, { label: "Scale Factor", value: `${factor.toFixed(2)}×` }, { label: "Original", value: `${v.amount}` }]; },
    { expression: "Scaled = Original × (Desired / Original Servings)", variables: ["Works for any ingredient"] }
  ),
  mk("serving-size-calculator", "Serving Size Calculator", "Calculate nutrition per serving from total.", "Free serving size calculator.", "Food & Cooking",
    [{ id: "totalCalories", label: "Total Calories", type: "number", defaultValue: 2400, step: 50 }, { id: "servings", label: "Number of Servings", type: "number", defaultValue: 6, min: 1 }],
    (v) => { const perServing = v.totalCalories / v.servings; return [{ label: "Calories/Serving", value: `${perServing.toFixed(0)}`, highlight: true }, { label: "Total Calories", value: `${v.totalCalories}` }, { label: "Servings", value: `${v.servings}` }]; },
    { expression: "Per Serving = Total / Servings", variables: ["Apply to any nutrient"] }
  ),
  mk("meal-cost-calculator", "Meal Cost Calculator", "Calculate cost per meal from grocery spending.", "Free meal cost calculator.", "Food & Cooking",
    [{ id: "groceryBudget", label: "Weekly Grocery ($)", type: "number", defaultValue: 150, step: 10 }, { id: "mealsPerWeek", label: "Meals per Week", type: "number", defaultValue: 21, min: 1 }, { id: "people", label: "People", type: "number", defaultValue: 2, min: 1 }],
    (v) => { const perMeal = v.groceryBudget / v.mealsPerWeek; const perPerson = perMeal / v.people; return [{ label: "Cost per Meal", value: `$${perMeal.toFixed(2)}`, highlight: true }, { label: "Per Person/Meal", value: `$${perPerson.toFixed(2)}` }, { label: "Monthly Budget", value: `$${(v.groceryBudget * 4.33).toFixed(0)}` }]; },
    { expression: "Per Meal = Budget / Meals", variables: ["3 meals/day × 7 = 21/week"] }
  ),
  mk("coffee-ratio-calculator", "Coffee Ratio Calculator", "Calculate perfect coffee-to-water ratio.", "Free coffee ratio calculator.", "Food & Cooking",
    [{ id: "cups", label: "Cups of Coffee", type: "number", defaultValue: 4, min: 1 }, { id: "ratio", label: "Ratio (g per 6oz)", type: "number", defaultValue: 10, step: 0.5 }],
    (v) => { const water = v.cups * 6; const coffee = v.cups * v.ratio; return [{ label: "Coffee Needed", value: `${coffee.toFixed(0)}g`, highlight: true }, { label: "Water", value: `${water} oz (${(water * 29.57).toFixed(0)} ml)` }, { label: "Tablespoons", value: `~${(coffee / 5).toFixed(1)}` }]; },
    { expression: "Coffee (g) = Cups × Ratio", variables: ["Standard: 10g per 6oz cup"] }
  ),
  mk("party-food-calculator", "Party Food Calculator", "Calculate food quantities for a party.", "Free party food calculator.", "Food & Cooking",
    [{ id: "guests", label: "Number of Guests", type: "number", defaultValue: 20, min: 1 }, { id: "hours", label: "Party Duration (hrs)", type: "number", defaultValue: 4, min: 1 }],
    (v) => { const appetizers = v.guests * v.hours * 2; const mainDish = v.guests * 0.5; const sides = v.guests * 0.33; const drinks = v.guests * v.hours; return [{ label: "Appetizer Pieces", value: `${Math.ceil(appetizers)}`, highlight: true }, { label: "Main Dish (lbs)", value: `${mainDish.toFixed(0)}` }, { label: "Side Dishes (lbs)", value: `${(sides * 2).toFixed(0)}` }, { label: "Drinks", value: `${Math.ceil(drinks)}` }]; },
    { expression: "Appetizers: 2 pcs/person/hour", variables: ["Main: 0.5 lb/person"] }
  ),
  mk("pizza-party-calculator", "Pizza Party Calculator", "Calculate how many pizzas to order.", "Free pizza party calculator.", "Food & Cooking",
    [{ id: "guests", label: "Number of Guests", type: "number", defaultValue: 12, min: 1 }, { id: "slicesPerPerson", label: "Slices per Person", type: "number", defaultValue: 3, min: 1 }, { id: "slicesPerPizza", label: "Slices per Pizza", type: "number", defaultValue: 8, min: 4 }],
    (v) => { const totalSlices = v.guests * v.slicesPerPerson; const pizzas = Math.ceil(totalSlices / v.slicesPerPizza); return [{ label: "Pizzas Needed", value: `${pizzas}`, highlight: true }, { label: "Total Slices", value: `${totalSlices}` }, { label: "Leftover Slices", value: `${pizzas * v.slicesPerPizza - totalSlices}` }]; },
    { expression: "Pizzas = ⌈(Guests × Slices/Person) / Slices/Pizza⌉", variables: ["Average: 3 slices per person"] }
  ),
  mk("meal-prep-calculator", "Meal Prep Calculator", "Plan weekly meal prep portions.", "Free meal prep calculator.", "Food & Cooking",
    [{ id: "meals", label: "Meals to Prep", type: "number", defaultValue: 10, min: 1 }, { id: "proteinPerMeal", label: "Protein/Meal (oz)", type: "number", defaultValue: 6, step: 0.5 }, { id: "carbsPerMeal", label: "Carbs/Meal (cups)", type: "number", defaultValue: 1, step: 0.25 }, { id: "veggiesPerMeal", label: "Veggies/Meal (cups)", type: "number", defaultValue: 1.5, step: 0.25 }],
    (v) => { const protein = v.meals * v.proteinPerMeal; const carbs = v.meals * v.carbsPerMeal; const veggies = v.meals * v.veggiesPerMeal; return [{ label: "Total Protein", value: `${protein.toFixed(0)} oz (${(protein / 16).toFixed(1)} lbs)`, highlight: true }, { label: "Total Carbs", value: `${carbs.toFixed(1)} cups` }, { label: "Total Veggies", value: `${veggies.toFixed(1)} cups` }, { label: "Containers", value: `${v.meals}` }]; },
    { expression: "Total = Meals × Amount/Meal", variables: ["Prep on Sunday for the week!"] }
  ),

  // ═══════════════════════════════════════════
  // SHOPPING
  // ═══════════════════════════════════════════
  mk("shopping-budget-calculator", "Shopping Budget Calculator", "Plan your shopping budget by category.", "Free shopping budget calculator.", "Shopping",
    [{ id: "income", label: "Monthly Income ($)", type: "number", defaultValue: 4000, step: 100 }, { id: "shoppingPct", label: "Shopping Budget (%)", type: "number", defaultValue: 10, min: 1, max: 100 }],
    (v) => { const budget = v.income * (v.shoppingPct / 100); return [{ label: "Shopping Budget", value: `$${budget.toFixed(0)}`, highlight: true }, { label: "Weekly Budget", value: `$${(budget / 4.33).toFixed(0)}` }, { label: "Daily Budget", value: `$${(budget / 30).toFixed(2)}` }]; },
    { expression: "Budget = Income × %", variables: ["50/30/20 rule: 30% for wants"] }
  ),
  mk("price-per-unit-calculator", "Price Per Unit Calculator", "Compare prices by unit cost.", "Free price per unit calculator.", "Shopping",
    [{ id: "price", label: "Price ($)", type: "number", defaultValue: 5.99, step: 0.01 }, { id: "quantity", label: "Quantity (units)", type: "number", defaultValue: 12, min: 1 }],
    (v) => { const ppu = v.price / v.quantity; return [{ label: "Price per Unit", value: `$${ppu.toFixed(3)}`, highlight: true }, { label: "Total Price", value: `$${v.price.toFixed(2)}` }, { label: "Units", value: `${v.quantity}` }]; },
    { expression: "PPU = Price / Quantity", variables: ["Lower PPU = better value"] }
  ),
  mk("price-comparison-calculator", "Price Comparison Calculator", "Compare two product options by unit price.", "Free price comparison calculator.", "Shopping",
    [{ id: "price1", label: "Option A Price ($)", type: "number", defaultValue: 5.99, step: 0.01 }, { id: "qty1", label: "Option A Quantity", type: "number", defaultValue: 12, min: 1 }, { id: "price2", label: "Option B Price ($)", type: "number", defaultValue: 8.49, step: 0.01 }, { id: "qty2", label: "Option B Quantity", type: "number", defaultValue: 20, min: 1 }],
    (v) => { const ppu1 = v.price1 / v.qty1; const ppu2 = v.price2 / v.qty2; const winner = ppu1 < ppu2 ? "Option A" : "Option B"; const savings = Math.abs(ppu1 - ppu2) * Math.max(v.qty1, v.qty2); return [{ label: "Best Value", value: winner, highlight: true }, { label: "Option A (per unit)", value: `$${ppu1.toFixed(3)}` }, { label: "Option B (per unit)", value: `$${ppu2.toFixed(3)}` }, { label: "Savings", value: `$${savings.toFixed(2)}` }]; },
    { expression: "Compare: Price/Quantity for each", variables: ["Choose lower unit price"] }
  ),
  mk("sale-price-calculator", "Sale Price Calculator", "Calculate sale price after discount.", "Free sale price calculator.", "Shopping",
    [{ id: "original", label: "Original Price ($)", type: "number", defaultValue: 79.99, step: 0.01 }, { id: "discount", label: "Discount (%)", type: "number", defaultValue: 30, min: 0, max: 100 }],
    (v) => { const saved = v.original * (v.discount / 100); const sale = v.original - saved; return [{ label: "Sale Price", value: `$${sale.toFixed(2)}`, highlight: true }, { label: "You Save", value: `$${saved.toFixed(2)}` }, { label: "Discount", value: `${v.discount}%` }]; },
    { expression: "Sale = Original × (1 - Discount%)", variables: ["Stack coupons for more savings"] }
  ),
  mk("bulk-purchase-calculator", "Bulk Purchase Calculator", "Compare bulk vs regular pricing.", "Free bulk purchase calculator.", "Shopping",
    [{ id: "regularPrice", label: "Regular Price ($)", type: "number", defaultValue: 3.99, step: 0.01 }, { id: "regularQty", label: "Regular Quantity", type: "number", defaultValue: 1, min: 1 }, { id: "bulkPrice", label: "Bulk Price ($)", type: "number", defaultValue: 15.99, step: 0.01 }, { id: "bulkQty", label: "Bulk Quantity", type: "number", defaultValue: 6, min: 1 }],
    (v) => { const regPPU = v.regularPrice / v.regularQty; const bulkPPU = v.bulkPrice / v.bulkQty; const savings = (regPPU - bulkPPU) * v.bulkQty; return [{ label: "Bulk Savings", value: `$${savings.toFixed(2)}`, highlight: true }, { label: "Regular per Unit", value: `$${regPPU.toFixed(3)}` }, { label: "Bulk per Unit", value: `$${bulkPPU.toFixed(3)}` }, { label: "% Savings", value: `${((1 - bulkPPU / regPPU) * 100).toFixed(1)}%` }]; },
    { expression: "Savings = (RegPPU - BulkPPU) × BulkQty", variables: ["Only buy bulk if you'll use it all"] }
  ),
  mk("coupon-savings-calculator", "Coupon Savings Calculator", "Calculate total savings from coupons.", "Free coupon savings calculator.", "Shopping",
    [{ id: "subtotal", label: "Subtotal ($)", type: "number", defaultValue: 100, step: 1 }, { id: "couponPct", label: "Coupon (%)", type: "number", defaultValue: 20, min: 0, max: 100 }, { id: "additionalOff", label: "Additional Off ($)", type: "number", defaultValue: 5, step: 1 }],
    (v) => { const pctSavings = v.subtotal * (v.couponPct / 100); const total = v.subtotal - pctSavings - v.additionalOff; return [{ label: "Final Price", value: `$${Math.max(0, total).toFixed(2)}`, highlight: true }, { label: "% Savings", value: `$${pctSavings.toFixed(2)}` }, { label: "Total Saved", value: `$${(pctSavings + v.additionalOff).toFixed(2)}` }]; },
    { expression: "Final = Subtotal × (1 - Coupon%) - Extra", variables: ["Apply % first, then $ off"] }
  ),
  mk("grocery-budget-calculator", "Grocery Budget Calculator", "Plan weekly grocery spending.", "Free grocery budget calculator.", "Shopping",
    [{ id: "people", label: "People", type: "number", defaultValue: 3, min: 1 }, { id: "perPerson", label: "Budget/Person/Week ($)", type: "number", defaultValue: 75, step: 5 }],
    (v) => { const weekly = v.people * v.perPerson; const monthly = weekly * 4.33; return [{ label: "Weekly Budget", value: `$${weekly.toFixed(0)}`, highlight: true }, { label: "Monthly Budget", value: `$${monthly.toFixed(0)}` }, { label: "Annual", value: `$${(monthly * 12).toLocaleString()}` }]; },
    { expression: "Budget = People × $/Person/Week", variables: ["USDA moderate: ~$75/person/week"] }
  ),
  mk("subscription-cost-calculator", "Subscription Cost Calculator", "Calculate total cost of all subscriptions.", "Free subscription cost calculator.", "Shopping",
    [{ id: "s1", label: "Subscription 1 ($/mo)", type: "number", defaultValue: 15, step: 1 }, { id: "s2", label: "Subscription 2 ($/mo)", type: "number", defaultValue: 10, step: 1 }, { id: "s3", label: "Subscription 3 ($/mo)", type: "number", defaultValue: 8, step: 1 }, { id: "s4", label: "Subscription 4 ($/mo)", type: "number", defaultValue: 12, step: 1 }],
    (v) => { const monthly = v.s1 + v.s2 + v.s3 + v.s4; const annual = monthly * 12; return [{ label: "Monthly Total", value: `$${monthly.toFixed(2)}`, highlight: true }, { label: "Annual Total", value: `$${annual.toFixed(0)}` }, { label: "Daily Cost", value: `$${(monthly / 30).toFixed(2)}` }]; },
    { expression: "Total = Sum of all subscriptions", variables: ["Review annually to cut waste"] }
  ),

  // ═══════════════════════════════════════════
  // PRODUCTIVITY
  // ═══════════════════════════════════════════
  mk("daily-productivity-score-calculator", "Daily Productivity Score Calculator", "Rate your daily productivity.", "Free daily productivity score.", "Productivity",
    [{ id: "tasksCompleted", label: "Tasks Completed", type: "number", defaultValue: 8, min: 0 }, { id: "tasksPlanned", label: "Tasks Planned", type: "number", defaultValue: 10, min: 1 }, { id: "focusHours", label: "Focus Hours", type: "number", defaultValue: 5, step: 0.5 }],
    (v) => { const completion = (v.tasksCompleted / v.tasksPlanned) * 100; const score = Math.min(100, completion * 0.6 + v.focusHours * 8); return [{ label: "Productivity Score", value: `${score.toFixed(0)}/100`, highlight: true }, { label: "Completion Rate", value: `${completion.toFixed(0)}%` }, { label: "Focus Hours", value: `${v.focusHours}h` }]; },
    { expression: "Score = Completion% × 0.6 + Focus × 8", variables: ["Aim for 80+ daily"] }
  ),
  mk("task-time-calculator", "Task Time Calculator", "Estimate how long tasks will take.", "Free task time calculator.", "Productivity",
    [{ id: "tasks", label: "Number of Tasks", type: "number", defaultValue: 8, min: 1 }, { id: "avgMinutes", label: "Avg Minutes per Task", type: "number", defaultValue: 30, step: 5 }, { id: "breakMin", label: "Break Time (min)", type: "number", defaultValue: 5, step: 1 }],
    (v) => { const workMin = v.tasks * v.avgMinutes; const breakTotal = (v.tasks - 1) * v.breakMin; const total = workMin + breakTotal; return [{ label: "Total Time", value: `${Math.floor(total / 60)}h ${total % 60}m`, highlight: true }, { label: "Work Time", value: `${workMin} min` }, { label: "Break Time", value: `${breakTotal} min` }]; },
    { expression: "Total = (Tasks × Avg) + Breaks", variables: ["Include buffer time"] }
  ),
  mk("pomodoro-session-calculator", "Pomodoro Session Calculator", "Plan Pomodoro work sessions.", "Free Pomodoro calculator.", "Productivity",
    [{ id: "totalMinutes", label: "Work Time Available (min)", type: "number", defaultValue: 240, step: 15 }, { id: "workBlock", label: "Work Block (min)", type: "number", defaultValue: 25, min: 10 }, { id: "shortBreak", label: "Short Break (min)", type: "number", defaultValue: 5, min: 1 }, { id: "longBreak", label: "Long Break (min)", type: "number", defaultValue: 15, min: 5 }],
    (v) => { const cycleTime = v.workBlock * 4 + v.shortBreak * 3 + v.longBreak; const cycles = Math.floor(v.totalMinutes / cycleTime); const sessions = cycles * 4; const actualWork = sessions * v.workBlock; return [{ label: "Pomodoro Sessions", value: `${sessions}`, highlight: true }, { label: "Actual Work", value: `${actualWork} min` }, { label: "Full Cycles", value: `${cycles}` }, { label: "Efficiency", value: `${((actualWork / v.totalMinutes) * 100).toFixed(0)}%` }]; },
    { expression: "Cycle = 4 × Work + 3 × Short + 1 × Long", variables: ["Standard: 25/5/15 minutes"] }
  ),
  mk("focus-time-calculator", "Focus Time Calculator", "Calculate optimal focus and break periods.", "Free focus time calculator.", "Productivity",
    [{ id: "available", label: "Available Hours", type: "number", defaultValue: 8, step: 0.5 }, { id: "focusRatio", label: "Focus Ratio (work:break)", type: "number", defaultValue: 5, min: 2, max: 10 }],
    (v) => { const totalMin = v.available * 60; const cycleMin = v.focusRatio + 1; const cycles = Math.floor(totalMin / (v.focusRatio * 10 + 10)); const focusMin = cycles * v.focusRatio * 10; return [{ label: "Focus Time", value: `${(focusMin / 60).toFixed(1)}h`, highlight: true }, { label: "Break Time", value: `${((totalMin - focusMin) / 60).toFixed(1)}h` }, { label: "Sessions", value: `${cycles}` }]; },
    { expression: "Focus blocks with scheduled breaks", variables: ["5:1 ratio = 50min work, 10min break"] }
  ),
  mk("meeting-time-cost-calculator", "Meeting Time Cost Calculator", "Calculate the cost of meetings.", "Free meeting cost calculator.", "Productivity",
    [{ id: "attendees", label: "Attendees", type: "number", defaultValue: 6, min: 1 }, { id: "duration", label: "Duration (min)", type: "number", defaultValue: 60, step: 15 }, { id: "avgSalary", label: "Avg Hourly Rate ($)", type: "number", defaultValue: 50, step: 5 }],
    (v) => { const cost = v.attendees * (v.duration / 60) * v.avgSalary; return [{ label: "Meeting Cost", value: `$${cost.toFixed(0)}`, highlight: true }, { label: "Per Attendee", value: `$${(cost / v.attendees).toFixed(0)}` }, { label: "Person-Hours", value: `${(v.attendees * v.duration / 60).toFixed(1)}` }]; },
    { expression: "Cost = Attendees × Hours × Rate", variables: ["Consider: is this meeting worth it?"] }
  ),
  mk("habit-streak-calculator", "Habit Streak Calculator", "Track and motivate habit streaks.", "Free habit streak calculator.", "Productivity",
    [{ id: "streak", label: "Current Streak (days)", type: "number", defaultValue: 30, min: 0 }, { id: "goal", label: "Goal (days)", type: "number", defaultValue: 100, min: 1 }],
    (v) => { const pct = Math.min(100, (v.streak / v.goal) * 100); const remaining = Math.max(0, v.goal - v.streak); return [{ label: "Progress", value: `${pct.toFixed(1)}%`, highlight: true }, { label: "Current Streak", value: `${v.streak} days` }, { label: "Days to Goal", value: `${remaining}` }, { label: "Weeks", value: `${(v.streak / 7).toFixed(1)}` }]; },
    { expression: "Progress = Streak / Goal × 100", variables: ["Don't break the chain!"] }
  ),

  // ═══════════════════════════════════════════
  // DIGITAL LIFE
  // ═══════════════════════════════════════════
  mk("screen-time-calculator", "Screen Time Calculator", "Calculate your daily screen time impact.", "Free screen time calculator.", "Digital Life",
    [{ id: "phone", label: "Phone (hrs/day)", type: "number", defaultValue: 3, step: 0.5 }, { id: "computer", label: "Computer (hrs/day)", type: "number", defaultValue: 5, step: 0.5 }, { id: "tv", label: "TV (hrs/day)", type: "number", defaultValue: 2, step: 0.5 }],
    (v) => { const daily = v.phone + v.computer + v.tv; const weekly = daily * 7; const yearly = daily * 365; return [{ label: "Daily Screen Time", value: `${daily.toFixed(1)}h`, highlight: true }, { label: "Weekly", value: `${weekly.toFixed(0)}h` }, { label: "% of Waking Hours", value: `${((daily / 16) * 100).toFixed(0)}%` }, { label: "Yearly", value: `${(yearly / 24).toFixed(0)} days` }]; },
    { expression: "Total = Phone + Computer + TV", variables: ["16 waking hours assumed"] }
  ),
  mk("data-usage-calculator", "Data Usage Calculator", "Estimate monthly data usage.", "Free data usage calculator.", "Digital Life",
    [{ id: "streaming", label: "Streaming (hrs/day)", type: "number", defaultValue: 2, step: 0.5 }, { id: "social", label: "Social Media (hrs/day)", type: "number", defaultValue: 1.5, step: 0.5 }, { id: "browsing", label: "Browsing (hrs/day)", type: "number", defaultValue: 1, step: 0.5 }],
    (v) => { const streamGB = v.streaming * 1.5 * 30; const socialGB = v.social * 0.3 * 30; const browseGB = v.browsing * 0.1 * 30; const total = streamGB + socialGB + browseGB; return [{ label: "Monthly Data", value: `${total.toFixed(1)} GB`, highlight: true }, { label: "Streaming", value: `${streamGB.toFixed(1)} GB` }, { label: "Social Media", value: `${socialGB.toFixed(1)} GB` }, { label: "Browsing", value: `${browseGB.toFixed(1)} GB` }]; },
    { expression: "Streaming ≈ 1.5 GB/hr, Social ≈ 0.3 GB/hr", variables: ["HD streaming uses more"] }
  ),
  mk("file-download-time-calculator", "File Download Time Calculator", "Estimate download time for files.", "Free download time calculator.", "Digital Life",
    [{ id: "fileSize", label: "File Size (MB)", type: "number", defaultValue: 500, step: 10 }, { id: "speed", label: "Download Speed (Mbps)", type: "number", defaultValue: 50, step: 5 }],
    (v) => { if (v.speed === 0) return [{ label: "Error", value: "Speed cannot be zero" }]; const seconds = (v.fileSize * 8) / v.speed; const min = seconds / 60; return [{ label: "Download Time", value: min < 1 ? `${seconds.toFixed(0)} sec` : `${min.toFixed(1)} min`, highlight: true }, { label: "In Seconds", value: `${seconds.toFixed(0)}` }]; },
    { expression: "Time = (FileSize × 8) / Speed", variables: ["1 byte = 8 bits"] }
  ),
  mk("battery-life-calculator", "Battery Life Calculator", "Estimate device battery life.", "Free battery life calculator.", "Digital Life",
    [{ id: "capacity", label: "Battery (mAh)", type: "number", defaultValue: 5000, step: 100 }, { id: "consumption", label: "Avg Draw (mA)", type: "number", defaultValue: 400, step: 10 }],
    (v) => { if (v.consumption === 0) return [{ label: "Error", value: "Consumption cannot be zero" }]; const hours = v.capacity / v.consumption * 0.7; return [{ label: "Battery Life", value: `${hours.toFixed(1)} hours`, highlight: true }, { label: "Days (light use)", value: `${(hours / 8).toFixed(1)}` }]; },
    { expression: "Life = Capacity / Draw × 0.7", variables: ["70% efficiency factor"] }
  ),
  mk("storage-usage-calculator", "Storage Usage Calculator", "Calculate remaining storage space.", "Free storage usage calculator.", "Digital Life",
    [{ id: "total", label: "Total Storage (GB)", type: "number", defaultValue: 256, step: 16 }, { id: "used", label: "Used Storage (GB)", type: "number", defaultValue: 180, step: 1 }],
    (v) => { const free = v.total - v.used; const pct = (v.used / v.total) * 100; return [{ label: "Free Space", value: `${free.toFixed(1)} GB`, highlight: true }, { label: "Used", value: `${pct.toFixed(1)}%` }, { label: "Photos (~3MB each)", value: `~${Math.floor(free * 1000 / 3)}` }]; },
    { expression: "Free = Total - Used", variables: ["System uses ~10-20% of advertised"] }
  ),

  // ═══════════════════════════════════════════
  // TRANSPORTATION
  // ═══════════════════════════════════════════
  mk("fuel-cost-per-trip-calculator", "Fuel Cost Per Trip Calculator", "Calculate fuel cost for a specific trip.", "Free fuel cost per trip calculator.", "Transportation",
    [{ id: "distance", label: "Distance (miles)", type: "number", defaultValue: 25, step: 1 }, { id: "mpg", label: "MPG", type: "number", defaultValue: 28, step: 1 }, { id: "price", label: "Gas Price ($/gal)", type: "number", defaultValue: 3.5, step: 0.1 }],
    (v) => { if (v.mpg === 0) return [{ label: "Error", value: "MPG cannot be zero" }]; const gal = v.distance / v.mpg; const cost = gal * v.price; return [{ label: "Trip Cost", value: `$${cost.toFixed(2)}`, highlight: true }, { label: "Gallons Used", value: `${gal.toFixed(2)}` }, { label: "Cost/Mile", value: `$${(cost / v.distance).toFixed(3)}` }]; },
    { expression: "Cost = (Distance / MPG) × Price", variables: ["Track regular commute costs"] }
  ),
  mk("fuel-cost-per-month-calculator", "Fuel Cost Per Month Calculator", "Estimate monthly fuel expenses.", "Free monthly fuel cost calculator.", "Transportation",
    [{ id: "dailyMiles", label: "Daily Miles", type: "number", defaultValue: 30, step: 5 }, { id: "mpg", label: "MPG", type: "number", defaultValue: 28, step: 1 }, { id: "price", label: "Gas Price ($/gal)", type: "number", defaultValue: 3.5, step: 0.1 }, { id: "daysPerMonth", label: "Driving Days/Month", type: "number", defaultValue: 22, min: 1 }],
    (v) => { if (v.mpg === 0) return [{ label: "Error", value: "MPG cannot be zero" }]; const monthlyMiles = v.dailyMiles * v.daysPerMonth; const gal = monthlyMiles / v.mpg; const cost = gal * v.price; return [{ label: "Monthly Fuel Cost", value: `$${cost.toFixed(2)}`, highlight: true }, { label: "Monthly Miles", value: `${monthlyMiles}` }, { label: "Gallons/Month", value: `${gal.toFixed(1)}` }, { label: "Annual", value: `$${(cost * 12).toFixed(0)}` }]; },
    { expression: "Cost = (Daily Miles × Days / MPG) × Price", variables: ["22 work days assumed"] }
  ),
  mk("commute-time-calculator", "Commute Time Calculator", "Calculate annual commute time.", "Free commute time calculator.", "Transportation",
    [{ id: "oneWay", label: "One-Way (minutes)", type: "number", defaultValue: 30, step: 5 }, { id: "daysPerWeek", label: "Days/Week", type: "number", defaultValue: 5, min: 1, max: 7 }],
    (v) => { const daily = v.oneWay * 2; const weekly = daily * v.daysPerWeek; const annual = weekly * 50; return [{ label: "Daily Commute", value: `${daily} min`, highlight: true }, { label: "Weekly", value: `${(weekly / 60).toFixed(1)} hrs` }, { label: "Annual", value: `${(annual / 60).toFixed(0)} hrs` }, { label: "Annual Days", value: `${(annual / 60 / 24).toFixed(1)} days` }]; },
    { expression: "Annual = One-Way × 2 × Days/Week × 50", variables: ["50 working weeks/year"] }
  ),
  mk("carpool-savings-calculator", "Carpool Savings Calculator", "Calculate savings from carpooling.", "Free carpool savings calculator.", "Transportation",
    [{ id: "soloCost", label: "Solo Monthly Cost ($)", type: "number", defaultValue: 200, step: 10 }, { id: "carpoolers", label: "People in Carpool", type: "number", defaultValue: 3, min: 2 }],
    (v) => { const shared = v.soloCost / v.carpoolers; const savings = v.soloCost - shared; return [{ label: "Monthly Savings", value: `$${savings.toFixed(0)}`, highlight: true }, { label: "Your Share", value: `$${shared.toFixed(0)}` }, { label: "Annual Savings", value: `$${(savings * 12).toLocaleString()}` }]; },
    { expression: "Savings = Solo Cost - (Solo Cost / People)", variables: ["Plus reduced wear & emissions"] }
  ),
  mk("taxi-fare-calculator", "Taxi Fare Calculator", "Estimate taxi or rideshare fare.", "Free taxi fare calculator.", "Transportation",
    [{ id: "baseFare", label: "Base Fare ($)", type: "number", defaultValue: 3, step: 0.5 }, { id: "perMile", label: "Per Mile ($)", type: "number", defaultValue: 2.5, step: 0.1 }, { id: "distance", label: "Distance (miles)", type: "number", defaultValue: 8, step: 0.5 }, { id: "tip", label: "Tip (%)", type: "number", defaultValue: 18, min: 0 }],
    (v) => { const fare = v.baseFare + v.perMile * v.distance; const tipAmt = fare * (v.tip / 100); const total = fare + tipAmt; return [{ label: "Total Fare", value: `$${total.toFixed(2)}`, highlight: true }, { label: "Base + Distance", value: `$${fare.toFixed(2)}` }, { label: "Tip", value: `$${tipAmt.toFixed(2)}` }]; },
    { expression: "Fare = Base + (Per Mile × Distance) + Tip", variables: ["Surge pricing may apply"] }
  ),

  // ═══════════════════════════════════════════
  // EVENTS & PARTIES
  // ═══════════════════════════════════════════
  mk("party-budget-calculator", "Party Budget Calculator", "Plan a comprehensive party budget.", "Free party budget calculator.", "Events & Parties",
    [{ id: "guests", label: "Number of Guests", type: "number", defaultValue: 30, min: 1 }, { id: "perGuest", label: "Budget per Guest ($)", type: "number", defaultValue: 25, step: 5 }, { id: "venue", label: "Venue Cost ($)", type: "number", defaultValue: 200, step: 50 }],
    (v) => { const guestCost = v.guests * v.perGuest; const total = guestCost + v.venue; return [{ label: "Total Budget", value: `$${total.toLocaleString()}`, highlight: true }, { label: "Guest Costs", value: `$${guestCost.toLocaleString()}` }, { label: "Venue", value: `$${v.venue}` }]; },
    { expression: "Total = (Guests × Per Guest) + Venue", variables: ["Add 10% buffer for extras"] }
  ),
  mk("drink-quantity-calculator", "Drink Quantity Calculator", "Calculate how many drinks for a party.", "Free drink quantity calculator.", "Events & Parties",
    [{ id: "guests", label: "Guests", type: "number", defaultValue: 25, min: 1 }, { id: "hours", label: "Party Hours", type: "number", defaultValue: 4, min: 1 }, { id: "drinksPerHour", label: "Drinks per Person/Hour", type: "number", defaultValue: 1.5, step: 0.5 }],
    (v) => { const total = v.guests * v.hours * v.drinksPerHour; const softDrinks = total * 0.3; const alcoholic = total * 0.7; return [{ label: "Total Drinks", value: `${Math.ceil(total)}`, highlight: true }, { label: "Soft Drinks", value: `${Math.ceil(softDrinks)}` }, { label: "Alcoholic", value: `${Math.ceil(alcoholic)}` }]; },
    { expression: "Drinks = Guests × Hours × Rate", variables: ["1-2 drinks/person/hour typical"] }
  ),
  mk("event-cost-calculator", "Event Cost Calculator", "Estimate full event costs.", "Free event cost calculator.", "Events & Parties",
    [{ id: "venue", label: "Venue ($)", type: "number", defaultValue: 500, step: 50 }, { id: "food", label: "Food ($)", type: "number", defaultValue: 800, step: 50 }, { id: "entertainment", label: "Entertainment ($)", type: "number", defaultValue: 300, step: 50 }, { id: "decor", label: "Decor ($)", type: "number", defaultValue: 200, step: 50 }],
    (v) => { const total = v.venue + v.food + v.entertainment + v.decor; return [{ label: "Total Event Cost", value: `$${total.toLocaleString()}`, highlight: true }, { label: "Largest Item", value: v.food > v.venue ? "Food" : "Venue" }, { label: "Food %", value: `${((v.food / total) * 100).toFixed(0)}%` }]; },
    { expression: "Total = Venue + Food + Entertainment + Decor", variables: ["Biggest expense usually food"] }
  ),
  mk("music-playlist-time-calculator", "Music Playlist Time Calculator", "Calculate total playlist duration.", "Free playlist time calculator.", "Events & Parties",
    [{ id: "songs", label: "Number of Songs", type: "number", defaultValue: 50, min: 1 }, { id: "avgLength", label: "Avg Song Length (min)", type: "number", defaultValue: 3.5, step: 0.5 }],
    (v) => { const totalMin = v.songs * v.avgLength; const hours = Math.floor(totalMin / 60); const min = Math.round(totalMin % 60); return [{ label: "Playlist Duration", value: `${hours}h ${min}m`, highlight: true }, { label: "Total Minutes", value: `${totalMin.toFixed(0)}` }, { label: "Songs", value: `${v.songs}` }]; },
    { expression: "Duration = Songs × Avg Length", variables: ["Average pop song: 3-4 min"] }
  ),

  // ═══════════════════════════════════════════
  // HEALTH LIFESTYLE
  // ═══════════════════════════════════════════
  mk("daily-step-goal-calculator", "Daily Step Goal Calculator", "Calculate your ideal daily step goal.", "Free daily step goal calculator.", "Health Lifestyle",
    [{ id: "currentSteps", label: "Current Avg Steps", type: "number", defaultValue: 5000, step: 500 }, { id: "goal", label: "Target Steps", type: "number", defaultValue: 10000, step: 500 }],
    (v) => { const increase = v.goal - v.currentSteps; const distMiles = v.goal * 0.000473; return [{ label: "Steps Needed", value: `${v.goal.toLocaleString()}`, highlight: true }, { label: "Increase Needed", value: `+${increase.toLocaleString()}` }, { label: "Distance", value: `${distMiles.toFixed(1)} miles` }, { label: "Calories Burned", value: `~${Math.round(v.goal * 0.04)}` }]; },
    { expression: "1 step ≈ 2.5 ft; 10,000 steps ≈ 5 miles", variables: ["Burns ~0.04 cal/step"] }
  ),
  mk("walking-distance-calculator", "Walking Distance Calculator", "Calculate walking distance from steps.", "Free walking distance calculator.", "Health Lifestyle",
    [{ id: "steps", label: "Steps Walked", type: "number", defaultValue: 8000, step: 500 }, { id: "strideLength", label: "Stride Length (ft)", type: "number", defaultValue: 2.5, step: 0.1 }],
    (v) => { const feet = v.steps * v.strideLength; const miles = feet / 5280; const km = miles * 1.609; return [{ label: "Distance", value: `${miles.toFixed(2)} miles`, highlight: true }, { label: "In km", value: `${km.toFixed(2)} km` }, { label: "Calories", value: `~${Math.round(v.steps * 0.04)}` }]; },
    { expression: "Distance = Steps × Stride Length", variables: ["Average stride: 2.5 ft"] }
  ),
  mk("sleep-schedule-calculator", "Sleep Schedule Calculator", "Calculate ideal bedtime and wake time.", "Free sleep schedule calculator.", "Health Lifestyle",
    [{ id: "wakeHour", label: "Desired Wake Time (hour)", type: "number", defaultValue: 7, min: 0, max: 23 }, { id: "cycles", label: "Sleep Cycles (4-6)", type: "number", defaultValue: 5, min: 4, max: 6 }],
    (v) => { const sleepMin = v.cycles * 90 + 15; const sleepHour = v.wakeHour - sleepMin / 60; const bedtime = sleepHour < 0 ? sleepHour + 24 : sleepHour; const h = Math.floor(bedtime); const m = Math.round((bedtime - h) * 60); return [{ label: "Bedtime", value: `${h}:${m.toString().padStart(2, "0")}`, highlight: true }, { label: "Sleep Duration", value: `${(sleepMin / 60).toFixed(1)}h` }, { label: "Cycles", value: `${v.cycles}` }]; },
    { expression: "Bedtime = Wake Time - (Cycles × 90min + 15min)", variables: ["1 cycle = 90 min; 15 min to fall asleep"] }
  ),
  mk("stress-score-calculator", "Stress Score Calculator", "Assess your current stress level.", "Free stress score calculator.", "Health Lifestyle",
    [{ id: "work", label: "Work Stress (1-10)", type: "number", defaultValue: 6, min: 1, max: 10 }, { id: "personal", label: "Personal Stress (1-10)", type: "number", defaultValue: 4, min: 1, max: 10 }, { id: "sleep", label: "Sleep Quality (1-10, 10=best)", type: "number", defaultValue: 7, min: 1, max: 10 }, { id: "exercise", label: "Exercise Frequency (1-10)", type: "number", defaultValue: 5, min: 1, max: 10 }],
    (v) => { const stressRaw = (v.work + v.personal) / 2; const relief = (v.sleep + v.exercise) / 2; const net = Math.max(1, Math.min(10, stressRaw - relief * 0.3 + 3)); return [{ label: "Stress Score", value: `${net.toFixed(1)}/10`, highlight: true }, { label: "Level", value: net > 7 ? "High ⚠️" : net > 4 ? "Moderate" : "Low ✓" }, { label: "Relief Score", value: `${relief.toFixed(1)}/10` }]; },
    { expression: "Net = (Work + Personal)/2 - Relief × 0.3", variables: ["Exercise and sleep reduce stress"] }
  ),
  mk("meditation-time-calculator", "Meditation Time Calculator", "Plan meditation sessions.", "Free meditation time calculator.", "Health Lifestyle",
    [{ id: "experience", label: "Experience (1=beginner, 10=expert)", type: "number", defaultValue: 3, min: 1, max: 10 }, { id: "available", label: "Available Time (min)", type: "number", defaultValue: 30, step: 5 }],
    (v) => { const recommended = Math.min(v.available, 5 + v.experience * 3); const sessions = Math.floor(v.available / recommended); return [{ label: "Session Length", value: `${recommended} min`, highlight: true }, { label: "Sessions Possible", value: `${sessions}` }, { label: "Total Time", value: `${sessions * recommended} min` }]; },
    { expression: "Session = 5 + Experience × 3 min", variables: ["Start with 5 min, build up"] }
  ),

  // ═══════════════════════════════════════════
  // PET CARE
  // ═══════════════════════════════════════════
  mk("pet-food-calculator", "Pet Food Calculator", "Calculate daily food portions for pets.", "Free pet food calculator.", "Pet Care",
    [{ id: "weight", label: "Pet Weight (lbs)", type: "number", defaultValue: 30, step: 1 }, { id: "activity", label: "Activity Level (1-3)", type: "number", defaultValue: 2, min: 1, max: 3 }],
    (v) => { const baseCalories = v.weight * 30 + 70; const multiplier = v.activity === 1 ? 1.0 : v.activity === 2 ? 1.4 : 1.8; const calories = baseCalories * multiplier; const cups = calories / 350; return [{ label: "Daily Calories", value: `${calories.toFixed(0)} kcal`, highlight: true }, { label: "Food (cups/day)", value: `${cups.toFixed(1)}` }, { label: "Activity", value: v.activity === 1 ? "Low" : v.activity === 2 ? "Moderate" : "High" }]; },
    { expression: "Calories = (Weight×30 + 70) × Activity", variables: ["1 cup ≈ 350 kcal average"] }
  ),
  mk("pet-water-intake-calculator", "Pet Water Intake Calculator", "Calculate daily water needs for pets.", "Free pet water intake calculator.", "Pet Care",
    [{ id: "weight", label: "Pet Weight (lbs)", type: "number", defaultValue: 30, step: 1 }],
    (v) => { const ozPerDay = v.weight * 1; const cups = ozPerDay / 8; const ml = ozPerDay * 29.57; return [{ label: "Daily Water", value: `${ozPerDay.toFixed(0)} oz`, highlight: true }, { label: "In Cups", value: `${cups.toFixed(1)}` }, { label: "In mL", value: `${ml.toFixed(0)}` }]; },
    { expression: "Water = 1 oz per lb body weight", variables: ["Rule of thumb for dogs"] }
  ),
  mk("pet-care-cost-calculator", "Pet Care Cost Calculator", "Estimate annual pet care costs.", "Free pet care cost calculator.", "Pet Care",
    [{ id: "food", label: "Monthly Food ($)", type: "number", defaultValue: 50, step: 5 }, { id: "vet", label: "Annual Vet ($)", type: "number", defaultValue: 400, step: 50 }, { id: "grooming", label: "Monthly Grooming ($)", type: "number", defaultValue: 30, step: 5 }, { id: "other", label: "Monthly Other ($)", type: "number", defaultValue: 20, step: 5 }],
    (v) => { const annual = (v.food + v.grooming + v.other) * 12 + v.vet; return [{ label: "Annual Cost", value: `$${annual.toLocaleString()}`, highlight: true }, { label: "Monthly Avg", value: `$${(annual / 12).toFixed(0)}` }, { label: "Daily Cost", value: `$${(annual / 365).toFixed(2)}` }]; },
    { expression: "Annual = Monthly×12 + Vet", variables: ["Don't forget emergency fund"] }
  ),

  // ═══════════════════════════════════════════
  // ENTERTAINMENT
  // ═══════════════════════════════════════════
  mk("movie-marathon-time-calculator", "Movie Marathon Time Calculator", "Calculate total time for a movie marathon.", "Free movie marathon calculator.", "Entertainment",
    [{ id: "movies", label: "Number of Movies", type: "number", defaultValue: 5, min: 1 }, { id: "avgLength", label: "Avg Length (min)", type: "number", defaultValue: 120, step: 10 }, { id: "breakBetween", label: "Break Between (min)", type: "number", defaultValue: 15, step: 5 }],
    (v) => { const watchTime = v.movies * v.avgLength; const breaks = (v.movies - 1) * v.breakBetween; const total = watchTime + breaks; const h = Math.floor(total / 60); const m = total % 60; return [{ label: "Total Time", value: `${h}h ${m}m`, highlight: true }, { label: "Watch Time", value: `${(watchTime / 60).toFixed(1)}h` }, { label: "Break Time", value: `${breaks} min` }]; },
    { expression: "Total = Movies × Length + Breaks", variables: ["Don't forget snack prep time!"] }
  ),
  mk("book-reading-time-calculator", "Book Reading Time Calculator", "Estimate time to finish a book.", "Free book reading time calculator.", "Entertainment",
    [{ id: "pages", label: "Pages", type: "number", defaultValue: 300, step: 10 }, { id: "pagesPerHour", label: "Pages per Hour", type: "number", defaultValue: 30, step: 5 }],
    (v) => { if (v.pagesPerHour === 0) return [{ label: "Error", value: "Speed cannot be zero" }]; const hours = v.pages / v.pagesPerHour; return [{ label: "Reading Time", value: `${hours.toFixed(1)} hours`, highlight: true }, { label: "At 30 min/day", value: `${Math.ceil(hours * 2)} days` }, { label: "At 1 hr/day", value: `${Math.ceil(hours)} days` }]; },
    { expression: "Time = Pages / Pages per Hour", variables: ["Average: 25-30 pages/hour"] }
  ),
  mk("tv-series-watch-time-calculator", "TV Series Watch Time Calculator", "Calculate total time to binge a TV series.", "Free TV series watch time calculator.", "Entertainment",
    [{ id: "seasons", label: "Seasons", type: "number", defaultValue: 5, min: 1 }, { id: "episodes", label: "Episodes per Season", type: "number", defaultValue: 10, min: 1 }, { id: "length", label: "Episode Length (min)", type: "number", defaultValue: 45, step: 5 }],
    (v) => { const totalEp = v.seasons * v.episodes; const totalMin = totalEp * v.length; const hours = totalMin / 60; const days = hours / 24; return [{ label: "Total Watch Time", value: `${hours.toFixed(1)} hours`, highlight: true }, { label: "Episodes", value: `${totalEp}` }, { label: "Non-stop Days", value: `${days.toFixed(1)}` }, { label: "At 2 eps/day", value: `${Math.ceil(totalEp / 2)} days` }]; },
    { expression: "Total = Seasons × Episodes × Length", variables: ["Binge responsibly!"] }
  ),
  mk("entertainment-budget-calculator", "Entertainment Budget Calculator", "Plan monthly entertainment spending.", "Free entertainment budget calculator.", "Entertainment",
    [{ id: "streaming", label: "Streaming ($/mo)", type: "number", defaultValue: 30, step: 5 }, { id: "dining", label: "Dining Out ($/mo)", type: "number", defaultValue: 100, step: 10 }, { id: "events", label: "Events ($/mo)", type: "number", defaultValue: 50, step: 10 }, { id: "hobbies", label: "Hobbies ($/mo)", type: "number", defaultValue: 40, step: 10 }],
    (v) => { const total = v.streaming + v.dining + v.events + v.hobbies; return [{ label: "Monthly Entertainment", value: `$${total.toFixed(0)}`, highlight: true }, { label: "Annual", value: `$${(total * 12).toLocaleString()}` }, { label: "Daily Average", value: `$${(total / 30).toFixed(2)}` }]; },
    { expression: "Total = Streaming + Dining + Events + Hobbies", variables: ["Part of 30% 'wants' budget"] }
  ),

  // ═══════════════════════════════════════════
  // PERSONAL FINANCE LIFESTYLE
  // ═══════════════════════════════════════════
  mk("daily-expense-calculator", "Daily Expense Calculator", "Track and calculate daily spending.", "Free daily expense calculator.", "Personal Finance Lifestyle",
    [{ id: "food", label: "Food ($)", type: "number", defaultValue: 15, step: 1 }, { id: "transport", label: "Transport ($)", type: "number", defaultValue: 8, step: 1 }, { id: "coffee", label: "Coffee/Snacks ($)", type: "number", defaultValue: 5, step: 0.5 }, { id: "other", label: "Other ($)", type: "number", defaultValue: 10, step: 1 }],
    (v) => { const daily = v.food + v.transport + v.coffee + v.other; return [{ label: "Daily Total", value: `$${daily.toFixed(2)}`, highlight: true }, { label: "Monthly (30d)", value: `$${(daily * 30).toFixed(0)}` }, { label: "Annual", value: `$${(daily * 365).toLocaleString()}` }]; },
    { expression: "Total = Food + Transport + Coffee + Other", variables: ["Small daily costs add up fast!"] }
  ),
  mk("monthly-expense-calculator", "Monthly Expense Calculator", "Calculate total monthly expenses.", "Free monthly expense calculator.", "Personal Finance Lifestyle",
    [{ id: "housing", label: "Housing ($)", type: "number", defaultValue: 1200, step: 50 }, { id: "utilities", label: "Utilities ($)", type: "number", defaultValue: 200, step: 10 }, { id: "food", label: "Food ($)", type: "number", defaultValue: 500, step: 25 }, { id: "transport", label: "Transport ($)", type: "number", defaultValue: 300, step: 25 }, { id: "other", label: "Other ($)", type: "number", defaultValue: 400, step: 25 }],
    (v) => { const total = v.housing + v.utilities + v.food + v.transport + v.other; return [{ label: "Monthly Total", value: `$${total.toLocaleString()}`, highlight: true }, { label: "Housing %", value: `${((v.housing / total) * 100).toFixed(0)}%` }, { label: "Annual", value: `$${(total * 12).toLocaleString()}` }]; },
    { expression: "Sum all expense categories", variables: ["Housing should be < 30% of income"] }
  ),
  mk("cost-of-living-calculator", "Cost of Living Calculator", "Estimate cost of living adjustments.", "Free cost of living calculator.", "Personal Finance Lifestyle",
    [{ id: "currentSalary", label: "Current Salary ($)", type: "number", defaultValue: 60000, step: 1000 }, { id: "colIndex", label: "New City COL Index", type: "number", defaultValue: 120, step: 5 }, { id: "currentIndex", label: "Current City COL Index", type: "number", defaultValue: 100, step: 5 }],
    (v) => { if (v.currentIndex === 0) return [{ label: "Error", value: "Index cannot be zero" }]; const needed = v.currentSalary * (v.colIndex / v.currentIndex); const diff = needed - v.currentSalary; return [{ label: "Salary Needed", value: `$${needed.toLocaleString()}`, highlight: true }, { label: "Difference", value: `${diff >= 0 ? "+" : ""}$${diff.toLocaleString()}` }, { label: "COL Change", value: `${((v.colIndex / v.currentIndex - 1) * 100).toFixed(0)}%` }]; },
    { expression: "Needed = Salary × (New COL / Current COL)", variables: ["100 = national average"] }
  ),
  mk("personal-savings-goal-calculator", "Personal Savings Goal Calculator", "Calculate monthly savings needed for a goal.", "Free savings goal calculator.", "Personal Finance Lifestyle",
    [{ id: "goal", label: "Savings Goal ($)", type: "number", defaultValue: 10000, step: 500 }, { id: "months", label: "Months to Save", type: "number", defaultValue: 12, min: 1 }, { id: "current", label: "Current Savings ($)", type: "number", defaultValue: 1000, step: 100 }],
    (v) => { const needed = v.goal - v.current; const monthly = needed / v.months; const weekly = monthly / 4.33; return [{ label: "Monthly Savings", value: `$${monthly.toFixed(2)}`, highlight: true }, { label: "Weekly", value: `$${weekly.toFixed(2)}` }, { label: "Remaining", value: `$${needed.toLocaleString()}` }]; },
    { expression: "Monthly = (Goal - Current) / Months", variables: ["Automate your savings!"] }
  ),
  mk("cost-per-day-calculator", "Cost Per Day Calculator", "Break down any cost into daily amounts.", "Free cost per day calculator.", "Personal Finance Lifestyle",
    [{ id: "totalCost", label: "Total Cost ($)", type: "number", defaultValue: 1200, step: 50 }, { id: "days", label: "Number of Days", type: "number", defaultValue: 365, min: 1 }],
    (v) => { const daily = v.totalCost / v.days; return [{ label: "Cost per Day", value: `$${daily.toFixed(2)}`, highlight: true }, { label: "Per Week", value: `$${(daily * 7).toFixed(2)}` }, { label: "Per Month", value: `$${(daily * 30).toFixed(2)}` }]; },
    { expression: "Daily = Total / Days", variables: ["Makes large costs feel manageable"] }
  ),
];
