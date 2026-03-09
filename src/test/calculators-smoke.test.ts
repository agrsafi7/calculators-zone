import { describe, expect, it } from "vitest";
import type { CalculatorConfig } from "@/components/CalculatorTemplate";

import { financeCalculators } from "@/data/finance-calculators";
import { financeCalculatorsExtended } from "@/data/finance-calculators-extended";
import { healthCalculators } from "@/data/health-calculators";
import { healthCalculatorsExtended } from "@/data/health-calculators-extended";
import { mathCalculators } from "@/data/math-calculators";
import { mathCalculatorsExtended } from "@/data/math-calculators-extended";
import { conversionCalculators } from "@/data/conversion-calculators";
import { conversionCalculatorsExtended } from "@/data/conversion-calculators-extended";
import { datetimeCalculators } from "@/data/datetime-calculators";
import { datetimeCalculatorsExtended } from "@/data/datetime-calculators-extended";
import { datetimeCalculatorsExtra } from "@/data/datetime-calculators-extra";
import { scienceCalculators } from "@/data/science-calculators";
import { scienceCalculatorsExtended } from "@/data/science-calculators-extended";
import { scienceCalculatorsExtra } from "@/data/science-calculators-extra";
import { lifestyleCalculators } from "@/data/lifestyle-calculators";
import { lifestyleCalculatorsExtended } from "@/data/lifestyle-calculators-extended";
import { lifestyleCalculatorsExtra } from "@/data/lifestyle-calculators-extra";

const allConfigs: CalculatorConfig[] = [
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
];

const getDefaults = (config: CalculatorConfig) =>
  Object.fromEntries(config.inputs.map((i) => [i.id, i.defaultValue]));

describe("calculator smoke checks", () => {
  it("loads calculator config list", () => {
    expect(allConfigs.length).toBeGreaterThan(0);
  });

  it("every calculator calculate() works with default inputs", () => {
    for (const config of allConfigs) {
      const defaults = getDefaults(config);

      expect(() => config.calculate(defaults), `calculate() threw for ${config.categorySlug}/${config.slug}`).not.toThrow();

      const result = config.calculate(defaults);
      expect(Array.isArray(result), `Result not array for ${config.categorySlug}/${config.slug}`).toBe(true);
      expect(result.length, `Empty result for ${config.categorySlug}/${config.slug}`).toBeGreaterThan(0);

      for (const item of result) {
        expect(typeof item.label).toBe("string");
        expect(typeof item.value).toBe("string");
      }
    }
  });
});
