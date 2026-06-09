import { velocityConfig } from "./velocity";
import { accelerationConfig } from "./acceleration";
import { kineticEnergyConfig } from "./kinetic-energy";
import { voltageConfig } from "./voltage";
import { densityConfig } from "./density";
import type { ScienceCalculatorConfig } from "./types";

export const scienceTemplateConfigs: ScienceCalculatorConfig[] = [
  velocityConfig,
  accelerationConfig,
  kineticEnergyConfig,
  voltageConfig,
  densityConfig,
];

export const scienceTemplateBySlug: Record<string, ScienceCalculatorConfig> =
  Object.fromEntries(scienceTemplateConfigs.map((c) => [c.slug, c]));
