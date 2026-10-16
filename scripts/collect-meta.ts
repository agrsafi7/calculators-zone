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
import { blogPosts } from "../src/data/blog-posts";

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
const customOverrides: Record<string, { title: string; description: string }> = {
  "mortgage-calculator": {
    title: "Mortgage Calculator",
    description: "Free mortgage calculator. Estimate monthly payments, total interest, and amortization for home loans.",
  },
  "bmi-calculator": {
    title: "BMI Calculator",
    description: "Free BMI calculator. Calculate your Body Mass Index with imperial or metric units. Understand healthy weight ranges.",
  },
  "percentage-calculator": {
    title: "Percentage Calculator",
    description: "Free percentage calculator. Calculate percentages, percentage of a number, and percentage change. Quick and accurate.",
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
    faqs: cfg?.faqs?.slice(0, 6),
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
for (const p of blogPosts) {
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
      datePublished: p.date,
      author: { "@type": "Organization", name: "TheCalculator.us" },
      publisher: { "@type": "Organization", name: "TheCalculator.us" },
      mainEntityOfPage: `https://thecalculator.us/blog/${p.slug}`,
      articleBody,
    },
  });
}

console.log(JSON.stringify(entries));
