// Collector for scripts/generate-manifest.mjs. Bundled with esbuild and run in
// Node at build time. Emits the lightweight calculator list as JSON.
import { popularCalculators } from "../src/data/calculators";
import { DELETED_SLUGS } from "../src/data/deleted-slugs";
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

const all: any[] = [
  ...popularCalculators,
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

const seen = new Set<string>();
const out: any[] = [];
for (const c of all) {
  if (seen.has(c.slug) || DELETED_SLUGS.has(c.slug)) continue;
  seen.add(c.slug);
  const entry: Record<string, string> = {
    slug: c.slug,
    name: c.name,
    category: c.category,
    categorySlug: c.categorySlug,
    description: c.description,
    icon: c.icon,
  };
  if (c.shortName) entry.shortName = c.shortName;
  if (c.subcategory) entry.subcategory = c.subcategory;
  out.push(entry);
}

console.log(JSON.stringify(out));
