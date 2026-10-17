// Calculator audit harness — runs every calculator's calculate() with
// multiple input sets and flags crashes, NaN/Infinity, and empty outputs.
// Run: esbuild scripts/audit-calculators.ts --bundle --platform=node --format=cjs
//        --alias:@=<root>/src --outfile=/tmp/audit.cjs && node /tmp/audit.cjs
import { financeCalculators } from "../src/data/finance-calculators";
import { financeCalculatorsExtended } from "../src/data/finance-calculators-extended";
import { healthCalculators } from "../src/data/health-calculators";
import { healthCalculatorsExtended } from "../src/data/health-calculators-extended";
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
import { otherCalculators } from "../src/data/other-calculators";
import { otherCalculatorsExtended } from "../src/data/other-calculators-extended";
import { otherCalculatorsExtra } from "../src/data/other-calculators-extra";
import { otherCalculatorsBatch2 } from "../src/data/other-calculators-batch2";
import { otherCalculatorsBatch3 } from "../src/data/other-calculators-batch3";
import { expansionCalculators } from "../src/data/expansion-calculators";
import { DELETED_SLUGS } from "../src/data/deleted-slugs";

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

interface Issue {
  slug: string;
  name: string;
  kind: string;
  detail: string;
}

const issues: Issue[] = [];
const seen = new Set<string>();
let total = 0;

const numVal = (inp: any, mode: string): number => {
  let v: number;
  if (inp.type === "select") {
    const opts = inp.options ?? [];
    if (mode === "first") v = opts[0]?.value ?? inp.defaultValue ?? 0;
    else if (mode === "last") v = opts[opts.length - 1]?.value ?? inp.defaultValue ?? 0;
    else v = inp.defaultValue ?? 0;
  } else if (mode === "min") v = inp.min ?? 0;
  else if (mode === "max") v = inp.max ?? inp.defaultValue ?? 100;
  else if (mode === "zero") v = 0;
  else if (mode === "neg") v = -5;
  else v = inp.defaultValue ?? 0;
  // Simulate CalculatorTemplate.handleChange clamping
  if (Number.isFinite(v)) {
    if (inp.min !== undefined && v < inp.min) v = inp.min;
    if (inp.max !== undefined && v > inp.max) v = inp.max;
  }
  return v;
};

// Simulate CalculatorTemplate result sanitizing: non-finite display values
// become an em dash + guidance notice, never "$NaN".
const sanitize = (res: any[]) =>
  res.map((r) => {
    const v = String(r?.value ?? "");
    return /NaN|Infinity|undefined/.test(v) ? { ...r, value: "—", sanitized: true } : r;
  });

const checkResult = (cfg: any, mode: string, res: any) => {
  if (!Array.isArray(res)) {
    issues.push({ slug: cfg.slug, name: cfg.name, kind: "bad-return", detail: `${mode}: calculate() did not return an array` });
    return;
  }
  if (res.length === 0) {
    issues.push({ slug: cfg.slug, name: cfg.name, kind: "empty", detail: `${mode}: returned zero result items` });
  }
  for (const r of res) {
    const v = String(r?.value ?? "");
    if (/NaN|Infinity|undefined/.test(v)) {
      issues.push({ slug: cfg.slug, name: cfg.name, kind: "nan", detail: `${mode}: "${r?.label}" = "${v}"` });
    } else if ((r as any).sanitized) {
      issues.push({ slug: cfg.slug, name: cfg.name, kind: "graceful", detail: `${mode}: "${r?.label}" → em dash + notice (degenerate input handled)` });
    }
  }
};

for (const cfg of allConfigs as any[]) {
  if (seen.has(cfg.slug)) continue;
  if (DELETED_SLUGS.has(cfg.slug)) continue;
  seen.add(cfg.slug);
  total++;

  // structural checks
  const ids = (cfg.inputs ?? []).map((i: any) => i.id);
  const dupes = ids.filter((id: string, i: number) => ids.indexOf(id) !== i);
  if (dupes.length) issues.push({ slug: cfg.slug, name: cfg.name, kind: "dup-input", detail: `duplicate input ids: ${[...new Set(dupes)].join(",")}` });
  for (const inp of cfg.inputs ?? []) {
    if (inp.defaultValue === undefined || inp.defaultValue === null || Number.isNaN(inp.defaultValue)) {
      issues.push({ slug: cfg.slug, name: cfg.name, kind: "no-default", detail: `input "${inp.id}" missing defaultValue` });
    }
    if (inp.type === "select" && (!inp.options || inp.options.length === 0)) {
      issues.push({ slug: cfg.slug, name: cfg.name, kind: "no-options", detail: `select "${inp.id}" has no options` });
    }
  }

  const modes = ["default", "min", "max", "zero", "neg", "first", "last"];
  for (const mode of modes) {
    const values: Record<string, number> = {};
    for (const inp of cfg.inputs ?? []) values[inp.id] = numVal(inp, mode);
    try {
      const res = sanitize(cfg.calculate(values));
      checkResult(cfg, mode, res);
    } catch (e: any) {
      issues.push({ slug: cfg.slug, name: cfg.name, kind: "crash", detail: `${mode}: threw ${e?.message ?? e}` });
    }
  }
}

console.log(`\nAudited ${total} calculators, ${issues.length} issues.\n`);
const byKind: Record<string, number> = {};
for (const i of issues) byKind[i.kind] = (byKind[i.kind] ?? 0) + 1;
console.log("By kind:", JSON.stringify(byKind));
console.log("\n--- ISSUES ---");
for (const i of issues) {
  console.log(`[${i.kind}] ${i.slug} — ${i.detail}`);
}
