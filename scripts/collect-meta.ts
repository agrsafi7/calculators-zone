// Builds a JSON manifest of every route + its SEO meta for the prerender step.
// Run via esbuild bundle (see scripts/prerender.mjs). Must stay side-effect free.
//
// The route list mirrors public/sitemap.xml exactly: both derive from
// uniqueCalculators (deduplicated by slug, pruned slugs excluded).
import { categories } from "../src/data/calculators";
import { categorySEOData } from "../src/lib/seo-keywords";
import { uniqueCalculators } from "../src/lib/calculator-utils";
import { healthCalculators } from "../src/data/health-calculators";
import { mathCalculators } from "../src/data/math-calculators";
import { mathCalculatorsExtended } from "../src/data/math-calculators-extended";
import { conversionCalculators } from "../src/data/conversion-calculators";
import { conversionCalculatorsExtended } from "../src/data/conversion-calculators-extended";
import { datetimeCalculators } from "../src/data/datetime-calculators";
import { datetimeCalculatorsExtended } from "../src/data/datetime-calculators-extended";
import { datetimeCalculatorsExtra } from "../src/data/datetime-calculators-extra";
import { scienceCalculators } from "../src/data/science-calculators";
import { scienceCalculatorsExtended } from "../src/data/science-calculators-extended";
import { scienceCalculatorsExtra } from "../src/data/science-calculators-extra";
import { lifestyleCalculators } from "../src/data/lifestyle-calculators";
import { lifestyleCalculatorsExtended } from "../src/data/lifestyle-calculators-extended";
import { lifestyleCalculatorsExtra } from "../src/data/lifestyle-calculators-extra";
import { financeCalculators } from "../src/data/finance-calculators";
import { financeCalculatorsExtended } from "../src/data/finance-calculators-extended";
import { healthCalculatorsExtended } from "../src/data/health-calculators-extended";
import { otherCalculators } from "../src/data/other-calculators";
import { otherCalculatorsExtended } from "../src/data/other-calculators-extended";
import { otherCalculatorsExtra } from "../src/data/other-calculators-extra";
import { otherCalculatorsBatch2 } from "../src/data/other-calculators-batch2";
import { otherCalculatorsBatch3 } from "../src/data/other-calculators-batch3";
import { expansionCalculators } from "../src/data/expansion-calculators";
import { blogPosts, isPublished } from "../src/data/blog-posts";

interface Entry {
  path: string;
  title: string;
  description: string;
  faqs?: { question: string; answer: string }[];
  articleLd?: Record<string, unknown>;
}

const allConfigs = [
  ...financeCalculators,
  ...financeCalculatorsExtended,
  ...healthCalculators,
  ...healthCalculatorsExtended,
  ...mathCalculators,
  ...mathCalculatorsExtended,
  ...conversionCalculators,
  ...conversionCalculatorsExtended,
  ...datetimeCalculators,
  ...datetimeCalculatorsExtended,
  ...datetimeCalculatorsExtra,
  ...scienceCalculators,
  ...scienceCalculatorsExtended,
  ...scienceCalculatorsExtra,
  ...lifestyleCalculators,
  ...lifestyleCalculatorsExtended,
  ...lifestyleCalculatorsExtra,
  ...otherCalculators,
  ...otherCalculatorsExtended,
  ...otherCalculatorsExtra,
  ...otherCalculatorsBatch2,
  ...otherCalculatorsBatch3,
  ...expansionCalculators,
];

// Full config lookup by slug (first occurrence wins, same as the router)
const configBySlug = new Map<string, (typeof allConfigs)[number]>();
for (const c of allConfigs) {
  if (!configBySlug.has(c.slug)) configBySlug.set(c.slug, c);
}

// Custom pages override the data-file meta (their components pass their own SEO props)
// These three are custom pages, not template configs, so they have no data-file
// faqs — without the faqs below, the prerender step emits no FAQPage JSON-LD
// for them even though the pages themselves render the same FAQs visibly.
// The faqs here are copied verbatim from each page's FAQS array so the
// structured data always matches the visible content.
const customOverrides: Record<string, { title: string; description: string; faqs?: { question: string; answer: string }[] }> = {
  "mortgage-calculator": {
    title: "Mortgage Calculator",
    description: "Free mortgage calculator. Estimate monthly payments, total interest, and amortization for home loans.",
    faqs: [
      {
        question: "What is included in PITI?",
        answer: "PITI stands for Principal, Interest, Taxes, and Insurance. Most lenders bundle local property taxes and hazard insurance into your monthly escrow payment.",
      },
      {
        question: "How can I avoid paying PMI?",
        answer: "Private Mortgage Insurance (PMI) is typically required on conventional mortgages when the down payment is less than 20% of the purchase price.",
      },
      {
        question: "Is a 15-year or 30-year loan better?",
        answer: "A 30-year loan keeps mandatory monthly payments lower, providing flexibility. A 15-year loan dramatically cuts total interest paid over the life of the loan.",
      },
    ],
  },
  "bmi-calculator": {
    title: "BMI Calculator",
    description: "Free BMI calculator. Calculate your Body Mass Index with imperial or metric units. Understand healthy weight ranges.",
    faqs: [
      {
        question: "How is BMI calculated?",
        answer: "BMI is calculated by dividing your weight in kilograms by the square of your height in meters. In imperial units: (weight in pounds ÷ height in inches²) × 703.",
      },
      {
        question: "What is a healthy BMI range?",
        answer: "A BMI between 18.5 and 24.9 is considered normal weight for most adults.",
      },
      {
        question: "Is BMI accurate for everyone?",
        answer: "BMI doesn't account for muscle mass, bone density, or body composition, so very muscular people may read as overweight. It remains a useful screening tool for most adults.",
      },
    ],
  },
  "percentage-calculator": {
    title: "Percentage Calculator",
    description: "Free percentage calculator. Calculate percentages, percentage of a number, and percentage change. Quick and accurate.",
    faqs: [
      {
        question: "How do I calculate what percent one number is of another?",
        answer: "Divide the part by the whole and multiply by 100. For example, 25 is (25 ÷ 200) × 100 = 12.5% of 200.",
      },
      {
        question: "How do I find X percent of a number?",
        answer: "Convert the percent to a decimal and multiply. For example, 25% of 200 = 0.25 × 200 = 50.",
      },
      {
        question: "How do I calculate percentage change?",
        answer: "Subtract the old value from the new value, divide by the old value, and multiply by 100. A positive result is an increase; negative is a decrease.",
      },
    ],
  },
};

const entries: Entry[] = [];

// Calculator pages — same canonical list as the sitemap
for (const u of uniqueCalculators) {
  const path = `/${u.categorySlug}/${u.slug}`;
  const cfg = configBySlug.get(u.slug);
  const override = customOverrides[u.slug];
  entries.push({
    path,
    title: `${override?.title ?? cfg?.name ?? u.name} | TheCalculator.us`,
    description: override?.description ?? cfg?.metaDescription ?? u.description,
    faqs: (override?.faqs ?? cfg?.faqs)?.slice(0, 6),
  });
}

// Category pages
for (const cat of categories) {
  const seo = categorySEOData[cat.slug];
  entries.push({
    path: `/category/${cat.slug}`,
    title: `${cat.name} Calculators | TheCalculator.us`,
    description: seo?.contentIntro
      ? seo.contentIntro.split(". ")[0] + "."
      : `Free ${cat.name.toLowerCase()} calculators. ${cat.description}`,
  });
}

// Static pages
const statics: Entry[] = [
  {
    path: "/",
    title: "Free Online Calculators | TheCalculator.us",
    description:
      "Free online calculators for finance, health, math, science, unit conversions, and everyday life. Fast, accurate, and mobile-friendly — no sign-up required.",
  },
  { path: "/categories", title: "All Calculator Categories | TheCalculator.us", description: "Browse all calculator categories: finance, health, math, conversions, science, lifestyle, date & time, and more." },
  { path: "/popular", title: "Popular Calculators | TheCalculator.us", description: "The most popular free online calculators: mortgage, BMI, percentage, age, loan, and more." },
  { path: "/about", title: "About Us | TheCalculator.us", description: "About TheCalculator.us — who we are, how our free calculators are built and tested, and our commitment to accuracy and privacy." },
  { path: "/privacy-policy", title: "Privacy Policy | TheCalculator.us", description: "Privacy Policy for TheCalculator.us — what data we collect, how cookies and advertising work, and your opt-out choices." },
  { path: "/terms-of-service", title: "Terms of Service | TheCalculator.us", description: "Terms of Service for TheCalculator.us — the rules for using our free online calculators." },
  { path: "/disclaimer", title: "Disclaimer | TheCalculator.us", description: "Disclaimer for TheCalculator.us — the limitations of our calculators for financial, health, and general decisions." },
  { path: "/contact", title: "Contact Us | TheCalculator.us", description: "Contact TheCalculator.us — questions, feedback, error reports, and partnership inquiries." },
];
entries.push(...statics);

// Blog index + posts
entries.push({
  path: "/blog",
  title: "Blog — Guides & Explainers | TheCalculator.us",
  description:
    "In-depth guides and plain-English explainers from TheCalculator.us: roman numerals, statistics, weight-loss math, unit conversions, and more.",
});
// Build-time publish gating (SEO audit F3): posts whose publishDate is in
// the future get NO prerendered page and NO Article JSON-LD, so crawlers
// cannot index or extract them early. They still go live automatically on
// their date via the client-side isPublished check + /blog links — no
// rebuild needed. Their sitemap entries must be re-added (public/sitemap.xml)
// at the next deploy after each publish date.
for (const p of blogPosts) {
  if (!isPublished(p.publishDate)) continue;
  const plain = (s: string) =>
    s
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .trim();
  const articleBody = p.sections
    .map((s) => `${s.heading}. ${s.body.map(plain).join(" ")}`)
    .join("\n\n")
    .slice(0, 8000);
  entries.push({
    path: `/blog/${p.slug}`,
    title: `${p.title} | TheCalculator.us`,
    description: p.description,
    articleLd: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: p.title,
      description: p.description,
      datePublished: p.publishDate,
      author: { "@type": "Organization", name: "TheCalculator.us" },
      publisher: { "@type": "Organization", name: "TheCalculator.us" },
      mainEntityOfPage: `https://thecalculator.us/blog/${p.slug}`,
      articleBody,
    },
  });
}

console.log(JSON.stringify(entries));
