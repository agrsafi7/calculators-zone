# Science Calculator Template — Plan

Big scope, so I want to confirm the approach before writing code. Goal: ship a reusable engine, then apply it to **Velocity, Acceleration, Kinetic Energy, Voltage, Density** first.

## 1. New reusable engine

Create `src/components/science/ScienceCalculator.tsx` + a config type `ScienceCalculatorConfig` in `src/data/science/types.ts`.

A config declares:
- meta: `slug`, `title`, `shortDescription`, `category` (e.g. `Physics`), `breadcrumbs`, `formulaPreview` (LaTeX-ish string), `keywords`
- `variables`: `[{ key, label, symbol, units: [{label, toBase}], defaultUnit, placeholder, smartHint }]`
- `solveFor`: array of variable keys the user can solve for
- `solve(values, target)` → `{ value, unit, steps: Step[] }` — pure function returning numeric answer + structured step-by-step
- `chart`: `{ type: "line" | "scatter", xVar, yVar, title }` (optional)
- `explanation`: `{ formula, variableDefs, unitsTable, description, applications[] }`
- `examples`: 3 worked examples `{ scenario, inputs, walkthrough }`
- `faqs`: 8–12 `{ q, a }`
- `related`: array of `{ slug, label }`
- `seoContent`: long-form MDX/markdown string (800–1500 words)

The engine renders all 15 sections from one config — hero, input card with **Solve For** dropdown that swaps inputs dynamically, results panel with copy/share/PDF, step-by-step, dynamic chart (Recharts), formula block, examples, FAQ accordion, related calculators, and SEO content.

## 2. Shared UI bits

- `<SolveForSelector>` — dropdown that filters which variables show
- `<UnitInput>` — large numeric input + unit dropdown, mobile-first, `inputMode="decimal"`, validation
- `<ResultCard>` — main answer, formula used, copy / share-link / download-PDF buttons (PDF via `jspdf` if not already installed)
- `<StepByStep>` — numbered, monospace math lines
- `<DynamicChart>` — Recharts line/scatter that re-renders on input change, lazy-loaded via `React.lazy`
- `<FormulaBlock>`, `<WorkedExamples>`, `<FAQAccordion>`, `<RelatedCalculators>`, `<SeoLongform>`

## 3. SEO

`<SEO>` (existing) gets `jsonLd` per page including Calculator + Article + FAQPage + BreadcrumbList + LearningResource schemas. Unique title/description/H1/canonical from config. Add the 5 new URLs to the sitemap generator.

## 4. The 5 calculators

Author one config file each under `src/data/science/`:
`velocity.ts`, `acceleration.ts`, `kinetic-energy.ts`, `voltage.ts`, `density.ts`.

Formulas:
- Velocity `v = d / t` — solve for v, d, t
- Acceleration `a = (v_f − v_i) / t` — solve for a, v_f, v_i, t
- Kinetic Energy `KE = ½ m v²` — solve for KE, m, v
- Voltage (Ohm's law) `V = I × R` — solve for V, I, R
- Density `ρ = m / V` — solve for ρ, m, V

## 5. Routing

Route `/science/:slug` already hits `GenericCalculatorPage`. I'll add a thin check: if a slug exists in the new science-configs registry, render `<ScienceCalculator>` instead of the legacy `CalculatorTemplate`. This leaves the other ~1000 calculators untouched.

## 6. Performance / a11y

- Chart in `React.lazy` + `Suspense` (skeleton)
- Recharts already in deps
- `inputMode="decimal"`, labels tied via `htmlFor`, error text via `aria-describedby`
- No layout-heavy animations on scroll

## 7. Out of scope for this first pass (confirm if you want them now)

- Migrating the other ~50 science calculators — engine will be ready; I'll do them in a follow-up batch
- A site-wide PDF brand template — I'll use a clean default
- Server-rendered HTML for indexability — site is SPA; current SEO setup (Helmet + sitemap + JSON-LD) is what Google uses today. True static HTML would need SSR/prerender, which is a separate architectural change

## Files I'll create/edit

Create:
- `src/data/science/types.ts`
- `src/data/science/velocity.ts`, `acceleration.ts`, `kinetic-energy.ts`, `voltage.ts`, `density.ts`
- `src/data/science/index.ts` (registry)
- `src/components/science/ScienceCalculator.tsx`
- `src/components/science/{SolveForSelector,UnitInput,ResultCard,StepByStep,DynamicChart,FormulaBlock,WorkedExamples,FAQAccordion,RelatedCalculators,SeoLongform}.tsx`

Edit:
- `src/pages/GenericCalculatorPage.tsx` (route to new engine when slug is in registry)
- `scripts/gen-sitemap.ts` (pick up new configs automatically if registry is exported)

Approve and I'll build it. If you want me to also migrate the other science calculators in the same pass, say so and I'll extend scope.