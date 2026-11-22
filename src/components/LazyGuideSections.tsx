import { lazy, Suspense } from "react";

// Lazy GuideSections (PageSpeed item 53, 22 Nov 2026): the guide data
// (calculator-guides.ts, ~764 KB source) is 252 KB transfer and sits below
// the fold, but GuideSections was a static import of CalculatorTemplate and
// the three dedicated pages, so Vite preloaded it with the page chunk on
// every calculator view. Loading it lazily takes it out of the critical
// module graph — it now loads after hydration starts instead of competing
// with the page chunk and critical resources.
//
// One shared lazy type (not one per call site) so the prerender warmup
// (scripts/prerender.mjs) resolves it with a single throwaway render:
// renderToString renders the Suspense fallback for an unresolved lazy
// component, which would strip every guide from the served HTML. The
// warmup + the guide-presence assertion in prerender.mjs guard that.
// Hydration is safe: React 18 keeps the server-rendered guide HTML visible
// while the boundary is pending and hydrates it when the chunk arrives
// (verified empirically against React 18.3.1, 22 Nov 2026) — no flash,
// no hydration mismatch.
const GuideSections = lazy(() => import("@/components/GuideSections"));

const LazyGuideSections = ({ slug }: { slug: string }) => (
  <Suspense fallback={null}>
    <GuideSections slug={slug} />
  </Suspense>
);

export default LazyGuideSections;
