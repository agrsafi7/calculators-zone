import { Calculator, CalendarDays, Clock, Timer, Moon, Plane, Target, Sunrise, BedDouble, Coffee } from "lucide-react";

export interface CalculatorConfig {
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  description: string;
  icon: string;
  subcategory: string;
  inputs: Array<{ name: string; label: string; type: string; placeholder?: string; options?: string[] }>;
  calculate: (inputs: Record<string, string>) => { result: string; steps?: string[] };
  formula?: string;
}

const mk = (
  slug: string,
  name: string,
  subcategory: string,
  description: string,
  inputs: Array<{ name: string; label: string; type: string; placeholder?: string; options?: string[] }>,
  calculate: (inputs: Record<string, string>) => { result: string; steps?: string[] },
  formula?: string
): CalculatorConfig => ({
  slug,
  name,
  category: "Date & Time",
  categorySlug: "datetime",
  description,
  icon: "Calendar",
  subcategory,
  inputs,
  calculate,
  formula,
});

export const datetimeCalculatorsExtra: CalculatorConfig[] = [
  // Date Difference Calculators
  mk(
    "date-difference",
    "Date Difference Calculator",
    "Date Difference",
    "Calculate the exact difference between two dates",
    [
      { name: "startDate", label: "Start Date", type: "date" },
      { name: "endDate", label: "End Date", type: "date" },
    ],
    (inputs) => {
      const start = new Date(inputs.startDate);
      const end = new Date(inputs.endDate);
      const diffMs = Math.abs(end.getTime() - start.getTime());
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      return { result: `${days} days`, steps: [`Difference: ${days} days`] };
    },
    "Difference = |End Date - Start Date| in days"
  ),

  mk(
    "weeks-between-dates",
    "Weeks Between Dates Calculator",
    "Date Difference",
    "Calculate weeks between two dates",
    [
      { name: "startDate", label: "Start Date", type: "date" },
      { name: "endDate", label: "End Date", type: "date" },
    ],
    (inputs) => {
      const start = new Date(inputs.startDate);
      const end = new Date(inputs.endDate);
      const diffMs = Math.abs(end.getTime() - start.getTime());
      const weeks = (diffMs / (1000 * 60 * 60 * 24 * 7)).toFixed(2);
      return { result: `${weeks} weeks`, steps: [`Weeks: ${weeks}`] };
    },
    "Weeks = Days / 7"
  ),

  mk(
    "months-between-dates",
    "Months Between Dates Calculator",
    "Date Difference",
    "Calculate months between two dates",
    [
      { name: "startDate", label: "Start Date", type: "date" },
      { name: "endDate", label: "End Date", type: "date" },
    ],
    (inputs) => {
      const start = new Date(inputs.startDate);
      const end = new Date(inputs.endDate);
      const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
      return { result: `${Math.abs(months)} months`, steps: [`Months: ${Math.abs(months)}`] };
    },
    "Months = (Year difference × 12) + Month difference"
  ),

  mk(
    "years-between-dates",
    "Years Between Dates Calculator",
    "Date Difference",
    "Calculate years between two dates",
    [
      { name: "startDate", label: "Start Date", type: "date" },
      { name: "endDate", label: "End Date", type: "date" },
    ],
    (inputs) => {
      const start = new Date(inputs.startDate);
      const end = new Date(inputs.endDate);
      const years = ((Math.abs(end.getTime() - start.getTime())) / (1000 * 60 * 60 * 24 * 365.25)).toFixed(2);
      return { result: `${years} years`, steps: [`Years: ${years}`] };
    },
    "Years = Days / 365.25"
  ),

  mk(
    "business-days-between",
    "Business Days Between Dates Calculator",
    "Date Difference",
    "Calculate business days (excluding weekends) between dates",
    [
      { name: "startDate", label: "Start Date", type: "date" },
      { name: "endDate", label: "End Date", type: "date" },
    ],
    (inputs) => {
      const start = new Date(inputs.startDate);
      const end = new Date(inputs.endDate);
      let count = 0;
      const current = new Date(start);
      while (current <= end) {
        const day = current.getDay();
        if (day !== 0 && day !== 6) count++;
        current.setDate(current.getDate() + 1);
      }
      return { result: `${count} business days`, steps: [`Business days: ${count}`] };
    },
    "Business Days = Total days - weekends"
  ),

  mk(
    "weekend-days-between",
    "Weekend Days Between Dates Calculator",
    "Date Difference",
    "Count weekend days between two dates",
    [
      { name: "startDate", label: "Start Date", type: "date" },
      { name: "endDate", label: "End Date", type: "date" },
    ],
    (inputs) => {
      const start = new Date(inputs.startDate);
      const end = new Date(inputs.endDate);
      let count = 0;
      const current = new Date(start);
      while (current <= end) {
        const day = current.getDay();
        if (day === 0 || day === 6) count++;
        current.setDate(current.getDate() + 1);
      }
      return { result: `${count} weekend days`, steps: [`Weekend days: ${count}`] };
    },
    "Weekend Days = Saturdays + Sundays"
  ),

  // Date Addition & Subtraction
  mk(
    "add-days-to-date",
    "Add Days to Date Calculator",
    "Date Addition & Subtraction",
    "Add a specific number of days to a date",
    [
      { name: "startDate", label: "Start Date", type: "date" },
      { name: "days", label: "Days to Add", type: "number", placeholder: "30" },
    ],
    (inputs) => {
      const date = new Date(inputs.startDate);
      date.setDate(date.getDate() + parseInt(inputs.days));
      return { result: date.toISOString().split('T')[0], steps: [`New date: ${date.toDateString()}`] };
    },
    "New Date = Start Date + Days"
  ),

  mk(
    "subtract-days-from-date",
    "Subtract Days from Date Calculator",
    "Date Addition & Subtraction",
    "Subtract days from a date",
    [
      { name: "startDate", label: "Start Date", type: "date" },
      { name: "days", label: "Days to Subtract", type: "number", placeholder: "30" },
    ],
    (inputs) => {
      const date = new Date(inputs.startDate);
      date.setDate(date.getDate() - parseInt(inputs.days));
      return { result: date.toISOString().split('T')[0], steps: [`New date: ${date.toDateString()}`] };
    },
    "New Date = Start Date - Days"
  ),

  mk(
    "add-weeks-to-date",
    "Add Weeks to Date Calculator",
    "Date Addition & Subtraction",
    "Add weeks to a date",
    [
      { name: "startDate", label: "Start Date", type: "date" },
      { name: "weeks", label: "Weeks to Add", type: "number", placeholder: "4" },
    ],
    (inputs) => {
      const date = new Date(inputs.startDate);
      date.setDate(date.getDate() + (parseInt(inputs.weeks) * 7));
      return { result: date.toISOString().split('T')[0], steps: [`New date: ${date.toDateString()}`] };
    },
    "New Date = Start Date + (Weeks × 7 days)"
  ),

  mk(
    "add-months-to-date",
    "Add Months to Date Calculator",
    "Date Addition & Subtraction",
    "Add months to a date",
    [
      { name: "startDate", label: "Start Date", type: "date" },
      { name: "months", label: "Months to Add", type: "number", placeholder: "6" },
    ],
    (inputs) => {
      const date = new Date(inputs.startDate);
      date.setMonth(date.getMonth() + parseInt(inputs.months));
      return { result: date.toISOString().split('T')[0], steps: [`New date: ${date.toDateString()}`] };
    },
    "New Date = Start Date + Months"
  ),

  mk(
    "add-years-to-date",
    "Add Years to Date Calculator",
    "Date Addition & Subtraction",
    "Add years to a date",
    [
      { name: "startDate", label: "Start Date", type: "date" },
      { name: "years", label: "Years to Add", type: "number", placeholder: "5" },
    ],
    (inputs) => {
      const date = new Date(inputs.startDate);
      date.setFullYear(date.getFullYear() + parseInt(inputs.years));
      return { result: date.toISOString().split('T')[0], steps: [`New date: ${date.toDateString()}`] };
    },
    "New Date = Start Date + Years"
  ),

  // Countdown Calculators
  mk(
    "countdown-to-date",
    "Countdown to Date Calculator",
    "Countdown",
    "Count down to a specific date",
    [{ name: "targetDate", label: "Target Date", type: "date" }],
    (inputs) => {
      const target = new Date(inputs.targetDate);
      const now = new Date();
      const diffMs = target.getTime() - now.getTime();
      const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      return { result: `${days} days remaining`, steps: [`Days until: ${days}`] };
    },
    "Days Remaining = Target Date - Today"
  ),

  mk(
    "countdown-to-birthday",
    "Countdown to Birthday Calculator",
    "Countdown",
    "Days until your next birthday",
    [
      { name: "birthMonth", label: "Birth Month", type: "number", placeholder: "6" },
      { name: "birthDay", label: "Birth Day", type: "number", placeholder: "15" },
    ],
    (inputs) => {
      const today = new Date();
      const nextBirthday = new Date(today.getFullYear(), parseInt(inputs.birthMonth) - 1, parseInt(inputs.birthDay));
      if (nextBirthday < today) nextBirthday.setFullYear(today.getFullYear() + 1);
      const diffMs = nextBirthday.getTime() - today.getTime();
      const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      return { result: `${days} days until birthday`, steps: [`Days: ${days}`] };
    },
    "Days = Next Birthday Date - Today"
  ),

  mk(
    "countdown-to-new-year",
    "Countdown to New Year Calculator",
    "Countdown",
    "Days until New Year's Day",
    [],
    () => {
      const today = new Date();
      const newYear = new Date(today.getFullYear() + 1, 0, 1);
      const diffMs = newYear.getTime() - today.getTime();
      const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      return { result: `${days} days until New Year`, steps: [`Days: ${days}`] };
    },
    "Days = January 1 - Today"
  ),

  mk(
    "countdown-to-retirement",
    "Countdown to Retirement Calculator",
    "Countdown",
    "Calculate days until retirement",
    [
      { name: "retirementAge", label: "Retirement Age", type: "number", placeholder: "65" },
      { name: "currentAge", label: "Current Age", type: "number", placeholder: "45" },
    ],
    (inputs) => {
      const yearsLeft = parseInt(inputs.retirementAge) - parseInt(inputs.currentAge);
      const days = yearsLeft * 365;
      return { result: `${days} days (${yearsLeft} years)`, steps: [`Years: ${yearsLeft}`, `Days: ${days}`] };
    },
    "Days = (Retirement Age - Current Age) × 365"
  ),

  // Age & Life Duration Calculators
  mk(
    "age-calculator",
    "Age Calculator",
    "Age & Life Duration",
    "Calculate exact age from birth date",
    [{ name: "birthDate", label: "Birth Date", type: "date" }],
    (inputs) => {
      const birth = new Date(inputs.birthDate);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--;
      return { result: `${age} years old`, steps: [`Age: ${age} years`] };
    },
    "Age = Current Year - Birth Year (adjusted for month/day)"
  ),

  mk(
    "age-in-months",
    "Age in Months Calculator",
    "Age & Life Duration",
    "Calculate age in months",
    [{ name: "birthDate", label: "Birth Date", type: "date" }],
    (inputs) => {
      const birth = new Date(inputs.birthDate);
      const today = new Date();
      const months = (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
      return { result: `${months} months`, steps: [`Months: ${months}`] };
    },
    "Months = (Year difference × 12) + Month difference"
  ),

  mk(
    "age-in-days",
    "Age in Days Calculator",
    "Age & Life Duration",
    "Calculate age in days",
    [{ name: "birthDate", label: "Birth Date", type: "date" }],
    (inputs) => {
      const birth = new Date(inputs.birthDate);
      const today = new Date();
      const diffMs = today.getTime() - birth.getTime();
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      return { result: `${days.toLocaleString()} days`, steps: [`Days: ${days.toLocaleString()}`] };
    },
    "Days = (Today - Birth Date) / (24 hours)"
  ),

  mk(
    "age-in-hours",
    "Age in Hours Calculator",
    "Age & Life Duration",
    "Calculate age in hours",
    [{ name: "birthDate", label: "Birth Date", type: "date" }],
    (inputs) => {
      const birth = new Date(inputs.birthDate);
      const today = new Date();
      const diffMs = today.getTime() - birth.getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      return { result: `${hours.toLocaleString()} hours`, steps: [`Hours: ${hours.toLocaleString()}`] };
    },
    "Hours = (Today - Birth Date) in hours"
  ),

  mk(
    "age-difference",
    "Age Difference Calculator",
    "Age & Life Duration",
    "Calculate age difference between two people",
    [
      { name: "person1Birth", label: "Person 1 Birth Date", type: "date" },
      { name: "person2Birth", label: "Person 2 Birth Date", type: "date" },
    ],
    (inputs) => {
      const p1 = new Date(inputs.person1Birth);
      const p2 = new Date(inputs.person2Birth);
      const diffMs = Math.abs(p2.getTime() - p1.getTime());
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const years = (days / 365.25).toFixed(1);
      return { result: `${years} years (${days} days)`, steps: [`Years: ${years}`, `Days: ${days}`] };
    },
    "Difference = |Person 1 Birth - Person 2 Birth|"
  ),

  // Work & Business Time Calculators
  mk(
    "working-days-calculator",
    "Working Days Calculator",
    "Work & Business Time",
    "Calculate working days in a period",
    [
      { name: "startDate", label: "Start Date", type: "date" },
      { name: "endDate", label: "End Date", type: "date" },
    ],
    (inputs) => {
      const start = new Date(inputs.startDate);
      const end = new Date(inputs.endDate);
      let count = 0;
      const current = new Date(start);
      while (current <= end) {
        const day = current.getDay();
        if (day !== 0 && day !== 6) count++;
        current.setDate(current.getDate() + 1);
      }
      return { result: `${count} working days`, steps: [`Working days: ${count}`] };
    },
    "Working Days = Weekdays between dates"
  ),

  mk(
    "business-hours-calculator",
    "Business Hours Calculator",
    "Work & Business Time",
    "Calculate business hours in a time period",
    [
      { name: "days", label: "Number of Days", type: "number", placeholder: "5" },
      { name: "hoursPerDay", label: "Hours Per Day", type: "number", placeholder: "8" },
    ],
    (inputs) => {
      const hours = parseInt(inputs.days) * parseInt(inputs.hoursPerDay);
      return { result: `${hours} business hours`, steps: [`Total hours: ${hours}`] };
    },
    "Business Hours = Days × Hours Per Day"
  ),

  mk(
    "overtime-hours-calculator",
    "Overtime Hours Calculator",
    "Work & Business Time",
    "Calculate overtime hours worked",
    [
      { name: "totalHours", label: "Total Hours Worked", type: "number", placeholder: "50" },
      { name: "regularHours", label: "Regular Hours", type: "number", placeholder: "40" },
    ],
    (inputs) => {
      const overtime = Math.max(0, parseInt(inputs.totalHours) - parseInt(inputs.regularHours));
      return { result: `${overtime} overtime hours`, steps: [`Overtime: ${overtime} hours`] };
    },
    "Overtime = Total Hours - Regular Hours"
  ),

  mk(
    "work-week-calculator",
    "Work Week Calculator",
    "Work & Business Time",
    "Calculate total work hours per week",
    [
      { name: "hoursPerDay", label: "Hours Per Day", type: "number", placeholder: "8" },
      { name: "daysPerWeek", label: "Days Per Week", type: "number", placeholder: "5" },
    ],
    (inputs) => {
      const total = parseInt(inputs.hoursPerDay) * parseInt(inputs.daysPerWeek);
      return { result: `${total} hours per week`, steps: [`Weekly hours: ${total}`] };
    },
    "Weekly Hours = Hours Per Day × Days Per Week"
  ),

  // Time Duration Calculators
  mk(
    "time-duration-calculator",
    "Time Duration Calculator",
    "Time Duration",
    "Calculate duration between two times",
    [
      { name: "startTime", label: "Start Time", type: "time" },
      { name: "endTime", label: "End Time", type: "time" },
    ],
    (inputs) => {
      const [sh, sm] = inputs.startTime.split(':').map(Number);
      const [eh, em] = inputs.endTime.split(':').map(Number);
      let minutes = (eh * 60 + em) - (sh * 60 + sm);
      if (minutes < 0) minutes += 24 * 60;
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return { result: `${hours}h ${mins}m`, steps: [`Duration: ${hours} hours ${mins} minutes`] };
    },
    "Duration = End Time - Start Time"
  ),

  mk(
    "hours-between-times",
    "Hours Between Times Calculator",
    "Time Duration",
    "Calculate hours between two times",
    [
      { name: "startTime", label: "Start Time", type: "time" },
      { name: "endTime", label: "End Time", type: "time" },
    ],
    (inputs) => {
      const [sh, sm] = inputs.startTime.split(':').map(Number);
      const [eh, em] = inputs.endTime.split(':').map(Number);
      let minutes = (eh * 60 + em) - (sh * 60 + sm);
      if (minutes < 0) minutes += 24 * 60;
      const hours = (minutes / 60).toFixed(2);
      return { result: `${hours} hours`, steps: [`Hours: ${hours}`] };
    },
    "Hours = (End - Start) in hours"
  ),

  mk(
    "minutes-between-times",
    "Minutes Between Times Calculator",
    "Time Duration",
    "Calculate minutes between two times",
    [
      { name: "startTime", label: "Start Time", type: "time" },
      { name: "endTime", label: "End Time", type: "time" },
    ],
    (inputs) => {
      const [sh, sm] = inputs.startTime.split(':').map(Number);
      const [eh, em] = inputs.endTime.split(':').map(Number);
      let minutes = (eh * 60 + em) - (sh * 60 + sm);
      if (minutes < 0) minutes += 24 * 60;
      return { result: `${minutes} minutes`, steps: [`Minutes: ${minutes}`] };
    },
    "Minutes = (End - Start) in minutes"
  ),

  // Time Conversion Calculators
  mk(
    "seconds-to-minutes",
    "Seconds to Minutes Calculator",
    "Time Conversions",
    "Convert seconds to minutes",
    [{ name: "seconds", label: "Seconds", type: "number", placeholder: "3600" }],
    (inputs) => {
      const minutes = (parseInt(inputs.seconds) / 60).toFixed(2);
      return { result: `${minutes} minutes`, steps: [`Minutes: ${minutes}`] };
    },
    "Minutes = Seconds / 60"
  ),

  mk(
    "seconds-to-hours",
    "Seconds to Hours Calculator",
    "Time Conversions",
    "Convert seconds to hours",
    [{ name: "seconds", label: "Seconds", type: "number", placeholder: "3600" }],
    (inputs) => {
      const hours = (parseInt(inputs.seconds) / 3600).toFixed(2);
      return { result: `${hours} hours`, steps: [`Hours: ${hours}`] };
    },
    "Hours = Seconds / 3600"
  ),

  mk(
    "minutes-to-hours",
    "Minutes to Hours Calculator",
    "Time Conversions",
    "Convert minutes to hours",
    [{ name: "minutes", label: "Minutes", type: "number", placeholder: "120" }],
    (inputs) => {
      const hours = (parseInt(inputs.minutes) / 60).toFixed(2);
      return { result: `${hours} hours`, steps: [`Hours: ${hours}`] };
    },
    "Hours = Minutes / 60"
  ),

  mk(
    "hours-to-days",
    "Hours to Days Calculator",
    "Time Conversions",
    "Convert hours to days",
    [{ name: "hours", label: "Hours", type: "number", placeholder: "48" }],
    (inputs) => {
      const days = (parseInt(inputs.hours) / 24).toFixed(2);
      return { result: `${days} days`, steps: [`Days: ${days}`] };
    },
    "Days = Hours / 24"
  ),

  mk(
    "days-to-weeks",
    "Days to Weeks Calculator",
    "Time Conversions",
    "Convert days to weeks",
    [{ name: "days", label: "Days", type: "number", placeholder: "14" }],
    (inputs) => {
      const weeks = (parseInt(inputs.days) / 7).toFixed(2);
      return { result: `${weeks} weeks`, steps: [`Weeks: ${weeks}`] };
    },
    "Weeks = Days / 7"
  ),

  mk(
    "days-to-months",
    "Days to Months Calculator",
    "Time Conversions",
    "Convert days to months",
    [{ name: "days", label: "Days", type: "number", placeholder: "90" }],
    (inputs) => {
      const months = (parseInt(inputs.days) / 30.44).toFixed(2);
      return { result: `${months} months`, steps: [`Months: ${months}`] };
    },
    "Months = Days / 30.44"
  ),

  mk(
    "days-to-years",
    "Days to Years Calculator",
    "Time Conversions",
    "Convert days to years",
    [{ name: "days", label: "Days", type: "number", placeholder: "365" }],
    (inputs) => {
      const years = (parseInt(inputs.days) / 365.25).toFixed(2);
      return { result: `${years} years`, steps: [`Years: ${years}`] };
    },
    "Years = Days / 365.25"
  ),

  // Calendar Calculators
  mk(
    "day-of-week",
    "Day of the Week Calculator",
    "Calendar Calculators",
    "Find what day of the week a date falls on",
    [{ name: "date", label: "Date", type: "date" }],
    (inputs) => {
      const date = new Date(inputs.date);
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayName = days[date.getDay()];
      return { result: dayName, steps: [`Day: ${dayName}`] };
    },
    "Day of Week = Date's weekday"
  ),

  mk(
    "day-of-year",
    "Day of the Year Calculator",
    "Calendar Calculators",
    "Calculate which day of the year a date is",
    [{ name: "date", label: "Date", type: "date" }],
    (inputs) => {
      const date = new Date(inputs.date);
      const start = new Date(date.getFullYear(), 0, 0);
      const diff = date.getTime() - start.getTime();
      const day = Math.floor(diff / (1000 * 60 * 60 * 24));
      return { result: `Day ${day} of the year`, steps: [`Day: ${day}`] };
    },
    "Day of Year = Days since January 1"
  ),

  mk(
    "week-number",
    "Week Number Calculator",
    "Calendar Calculators",
    "Calculate the week number of a date",
    [{ name: "date", label: "Date", type: "date" }],
    (inputs) => {
      const date = new Date(inputs.date);
      const start = new Date(date.getFullYear(), 0, 1);
      const days = Math.floor((date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      const week = Math.ceil((days + start.getDay() + 1) / 7);
      return { result: `Week ${week}`, steps: [`Week: ${week}`] };
    },
    "Week = Days since Jan 1 / 7"
  ),

  mk(
    "leap-year-calculator",
    "Leap Year Calculator",
    "Calendar Calculators",
    "Check if a year is a leap year",
    [{ name: "year", label: "Year", type: "number", placeholder: "2024" }],
    (inputs) => {
      const year = parseInt(inputs.year);
      const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
      return { result: isLeap ? "Leap Year" : "Not a Leap Year", steps: [`${year} is ${isLeap ? '' : 'not '}a leap year`] };
    },
    "Leap Year: divisible by 4, except centuries (unless divisible by 400)"
  ),

  mk(
    "quarter-of-year",
    "Quarter of Year Calculator",
    "Calendar Calculators",
    "Determine which quarter a date falls in",
    [{ name: "date", label: "Date", type: "date" }],
    (inputs) => {
      const date = new Date(inputs.date);
      const quarter = Math.floor(date.getMonth() / 3) + 1;
      return { result: `Q${quarter}`, steps: [`Quarter: ${quarter}`] };
    },
    "Quarter = (Month / 3) + 1"
  ),

  // Time Zone Calculators
  mk(
    "time-zone-converter",
    "Time Zone Converter",
    "Time Zone Tools",
    "Convert time between time zones",
    [
      { name: "time", label: "Time", type: "time" },
      { name: "offsetFrom", label: "From UTC Offset (hours)", type: "number", placeholder: "-5" },
      { name: "offsetTo", label: "To UTC Offset (hours)", type: "number", placeholder: "0" },
    ],
    (inputs) => {
      const [h, m] = inputs.time.split(':').map(Number);
      const fromOffset = parseInt(inputs.offsetFrom);
      const toOffset = parseInt(inputs.offsetTo);
      const newHours = (h - fromOffset + toOffset + 24) % 24;
      const formatted = `${String(newHours).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      return { result: formatted, steps: [`Converted time: ${formatted}`] };
    },
    "New Time = Original Time + (To Offset - From Offset)"
  ),

  mk(
    "meeting-time-planner",
    "Meeting Time Planner Calculator",
    "Time Zone Tools",
    "Find suitable meeting times across zones",
    [
      { name: "zone1Hour", label: "Zone 1 Hour", type: "number", placeholder: "9" },
      { name: "zone2Offset", label: "Zone 2 UTC Offset", type: "number", placeholder: "5" },
      { name: "zone1Offset", label: "Zone 1 UTC Offset", type: "number", placeholder: "0" },
    ],
    (inputs) => {
      const z1Hour = parseInt(inputs.zone1Hour);
      const offset = parseInt(inputs.zone2Offset) - parseInt(inputs.zone1Offset);
      const z2Hour = (z1Hour + offset + 24) % 24;
      return { result: `Zone 2: ${z2Hour}:00`, steps: [`Zone 2 time: ${z2Hour}:00`] };
    },
    "Zone 2 Time = Zone 1 Time + Offset Difference"
  ),

  // Productivity Time Calculators
  mk(
    "pomodoro-calculator",
    "Pomodoro Timer Calculator",
    "Productivity Time",
    "Calculate Pomodoro session schedule",
    [
      { name: "sessions", label: "Number of Sessions", type: "number", placeholder: "4" },
      { name: "workMinutes", label: "Work Minutes", type: "number", placeholder: "25" },
      { name: "breakMinutes", label: "Break Minutes", type: "number", placeholder: "5" },
    ],
    (inputs) => {
      const sessions = parseInt(inputs.sessions);
      const work = parseInt(inputs.workMinutes);
      const breakTime = parseInt(inputs.breakMinutes);
      const total = (work + breakTime) * sessions;
      return { result: `${total} minutes total`, steps: [`Total time: ${total} min`, `Sessions: ${sessions}`] };
    },
    "Total = (Work + Break) × Sessions"
  ),

  mk(
    "focus-time-calculator",
    "Focus Time Calculator",
    "Productivity Time",
    "Calculate focused work time in a day",
    [
      { name: "totalHours", label: "Total Work Hours", type: "number", placeholder: "8" },
      { name: "distractionPercent", label: "Distraction % (0-100)", type: "number", placeholder: "30" },
    ],
    (inputs) => {
      const total = parseInt(inputs.totalHours);
      const distraction = parseInt(inputs.distractionPercent) / 100;
      const focused = total * (1 - distraction);
      return { result: `${focused.toFixed(1)} hours`, steps: [`Focused hours: ${focused.toFixed(1)}`] };
    },
    "Focused Hours = Total × (1 - Distraction %)"
  ),

  mk(
    "task-completion-time",
    "Task Completion Time Calculator",
    "Productivity Time",
    "Estimate task completion time",
    [
      { name: "estimatedMinutes", label: "Estimated Minutes", type: "number", placeholder: "60" },
      { name: "bufferPercent", label: "Buffer % (0-100)", type: "number", placeholder: "20" },
    ],
    (inputs) => {
      const estimated = parseInt(inputs.estimatedMinutes);
      const buffer = parseInt(inputs.bufferPercent) / 100;
      const total = estimated * (1 + buffer);
      return { result: `${Math.ceil(total)} minutes`, steps: [`With buffer: ${Math.ceil(total)} min`] };
    },
    "Total Time = Estimated × (1 + Buffer %)"
  ),

  // Sleep & Lifestyle Time Calculators
  mk(
    "sleep-cycle-calculator",
    "Sleep Cycle Calculator",
    "Sleep & Lifestyle Time",
    "Calculate optimal sleep/wake times based on 90-min cycles",
    [
      { name: "bedtime", label: "Bedtime", type: "time" },
      { name: "cycles", label: "Sleep Cycles", type: "number", placeholder: "5" },
    ],
    (inputs) => {
      const [h, m] = inputs.bedtime.split(':').map(Number);
      const cycles = parseInt(inputs.cycles);
      const sleepMinutes = cycles * 90;
      const wakeMinutes = h * 60 + m + sleepMinutes;
      const wakeHour = Math.floor(wakeMinutes / 60) % 24;
      const wakeMins = wakeMinutes % 60;
      return { result: `Wake at ${wakeHour}:${String(wakeMins).padStart(2, '0')}`, steps: [`Sleep time: ${sleepMinutes} min`] };
    },
    "Wake Time = Bedtime + (Cycles × 90 minutes)"
  ),

  mk(
    "sleep-duration-calculator",
    "Sleep Duration Calculator",
    "Sleep & Lifestyle Time",
    "Calculate sleep duration",
    [
      { name: "bedtime", label: "Bedtime", type: "time" },
      { name: "wakeTime", label: "Wake Time", type: "time" },
    ],
    (inputs) => {
      const [bh, bm] = inputs.bedtime.split(':').map(Number);
      const [wh, wm] = inputs.wakeTime.split(':').map(Number);
      let minutes = (wh * 60 + wm) - (bh * 60 + bm);
      if (minutes < 0) minutes += 24 * 60;
      const hours = (minutes / 60).toFixed(1);
      return { result: `${hours} hours`, steps: [`Sleep duration: ${hours} hours`] };
    },
    "Duration = Wake Time - Bedtime"
  ),

  mk(
    "bedtime-calculator",
    "Bedtime Calculator",
    "Sleep & Lifestyle Time",
    "Calculate ideal bedtime for wake time",
    [
      { name: "wakeTime", label: "Wake Time", type: "time" },
      { name: "sleepHours", label: "Desired Sleep Hours", type: "number", placeholder: "8" },
    ],
    (inputs) => {
      const [h, m] = inputs.wakeTime.split(':').map(Number);
      const sleepMinutes = parseInt(inputs.sleepHours) * 60;
      const bedMinutes = h * 60 + m - sleepMinutes;
      const bedHour = (Math.floor(bedMinutes / 60) + 24) % 24;
      const bedMins = ((bedMinutes % 60) + 60) % 60;
      return { result: `${bedHour}:${String(bedMins).padStart(2, '0')}`, steps: [`Bedtime: ${bedHour}:${String(bedMins).padStart(2, '0')}`] };
    },
    "Bedtime = Wake Time - Sleep Hours"
  ),

  // Travel Time Calculators
  mk(
    "travel-time-calculator",
    "Travel Time Calculator",
    "Travel Time",
    "Calculate travel time from distance and speed",
    [
      { name: "distance", label: "Distance (km)", type: "number", placeholder: "100" },
      { name: "speed", label: "Average Speed (km/h)", type: "number", placeholder: "80" },
    ],
    (inputs) => {
      const time = parseFloat(inputs.distance) / parseFloat(inputs.speed);
      const hours = Math.floor(time);
      const minutes = Math.round((time - hours) * 60);
      return { result: `${hours}h ${minutes}m`, steps: [`Travel time: ${hours}h ${minutes}m`] };
    },
    "Time = Distance / Speed"
  ),

  mk(
    "walking-time-calculator",
    "Walking Time Calculator",
    "Travel Time",
    "Calculate walking time",
    [
      { name: "distance", label: "Distance (km)", type: "number", placeholder: "5" },
      { name: "pace", label: "Pace (km/h)", type: "number", placeholder: "5" },
    ],
    (inputs) => {
      const time = parseFloat(inputs.distance) / parseFloat(inputs.pace);
      const hours = Math.floor(time);
      const minutes = Math.round((time - hours) * 60);
      return { result: `${hours}h ${minutes}m`, steps: [`Walking time: ${hours}h ${minutes}m`] };
    },
    "Time = Distance / Pace"
  ),

  mk(
    "flight-time-calculator",
    "Flight Time Calculator",
    "Travel Time",
    "Estimate flight duration",
    [
      { name: "distance", label: "Distance (km)", type: "number", placeholder: "5000" },
      { name: "cruiseSpeed", label: "Cruise Speed (km/h)", type: "number", placeholder: "850" },
    ],
    (inputs) => {
      const time = parseFloat(inputs.distance) / parseFloat(inputs.cruiseSpeed);
      const hours = Math.floor(time);
      const minutes = Math.round((time - hours) * 60);
      return { result: `${hours}h ${minutes}m`, steps: [`Flight time: ${hours}h ${minutes}m`] };
    },
    "Flight Time = Distance / Cruise Speed"
  ),

  // Astronomy Time Calculators
  mk(
    "day-length-calculator",
    "Day Length Calculator",
    "Astronomy Time",
    "Calculate daylight hours (simplified)",
    [
      { name: "latitude", label: "Latitude (degrees)", type: "number", placeholder: "45" },
      { name: "dayOfYear", label: "Day of Year (1-365)", type: "number", placeholder: "172" },
    ],
    (inputs) => {
      // Simplified calculation
      const lat = parseFloat(inputs.latitude) * Math.PI / 180;
      const daylight = 12 + 2 * Math.sin((parseInt(inputs.dayOfYear) - 81) * 2 * Math.PI / 365) * Math.sin(lat);
      const hours = Math.floor(Math.abs(daylight));
      const minutes = Math.round((Math.abs(daylight) - hours) * 60);
      return { result: `${hours}h ${minutes}m`, steps: [`Daylight: ${hours}h ${minutes}m`] };
    },
    "Daylight = 12 + seasonal variation"
  ),

  mk(
    "moon-phase-calculator",
    "Moon Phase Calculator",
    "Astronomy Time",
    "Calculate moon phase (simplified)",
    [{ name: "date", label: "Date", type: "date" }],
    (inputs) => {
      const date = new Date(inputs.date);
      const knownNewMoon = new Date('2000-01-06').getTime();
      const lunarCycle = 29.53059 * 24 * 60 * 60 * 1000;
      const phase = ((date.getTime() - knownNewMoon) % lunarCycle) / lunarCycle;
      const phases = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];
      const phaseIndex = Math.floor(phase * 8);
      return { result: phases[phaseIndex], steps: [`Phase: ${phases[phaseIndex]}`] };
    },
    "Phase based on lunar cycle (~29.5 days)"
  ),

  // Miscellaneous Time Calculators
  mk(
    "average-time-calculator",
    "Average Time Calculator",
    "Miscellaneous Time",
    "Calculate average of multiple time durations",
    [
      { name: "time1", label: "Time 1 (minutes)", type: "number", placeholder: "30" },
      { name: "time2", label: "Time 2 (minutes)", type: "number", placeholder: "45" },
      { name: "time3", label: "Time 3 (minutes)", type: "number", placeholder: "60" },
    ],
    (inputs) => {
      const times = [inputs.time1, inputs.time2, inputs.time3].filter(t => t).map(Number);
      const avg = times.reduce((a, b) => a + b, 0) / times.length;
      return { result: `${avg.toFixed(1)} minutes`, steps: [`Average: ${avg.toFixed(1)} min`] };
    },
    "Average = Sum of times / Count"
  ),

  mk(
    "time-percentage-calculator",
    "Time Percentage Calculator",
    "Miscellaneous Time",
    "Calculate what percentage of total time has passed",
    [
      { name: "elapsed", label: "Elapsed Time (minutes)", type: "number", placeholder: "30" },
      { name: "total", label: "Total Time (minutes)", type: "number", placeholder: "120" },
    ],
    (inputs) => {
      const percentage = (parseFloat(inputs.elapsed) / parseFloat(inputs.total)) * 100;
      return { result: `${percentage.toFixed(1)}%`, steps: [`Percentage: ${percentage.toFixed(1)}%`] };
    },
    "Percentage = (Elapsed / Total) × 100"
  ),

  mk(
    "time-remaining-calculator",
    "Time Remaining Calculator",
    "Miscellaneous Time",
    "Calculate time remaining",
    [
      { name: "total", label: "Total Time (minutes)", type: "number", placeholder: "120" },
      { name: "elapsed", label: "Elapsed Time (minutes)", type: "number", placeholder: "45" },
    ],
    (inputs) => {
      const remaining = parseFloat(inputs.total) - parseFloat(inputs.elapsed);
      return { result: `${remaining} minutes`, steps: [`Remaining: ${remaining} min`] };
    },
    "Remaining = Total - Elapsed"
  ),
];
