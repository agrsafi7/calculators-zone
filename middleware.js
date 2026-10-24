// Vercel Edge Middleware — SEO audit F4 (soft 404s).
//
// Problem: the SPA rewrite in vercel.json serves /index.html (HTTP 200) for
// EVERY unmatched path, so unknown URLs and unknown /category/<slug> URLs
// look like real pages to crawlers (soft 404s with homepage content).
//
// This middleware returns a real HTTP 404 for paths that match no known
// route, before the SPA rewrite runs. Rules are deliberately conservative:
// anything that could be a real page passes through, and the client-side
// NotFound component (noindexed) remains as a backstop.
//
// Pass-through rules:
//  - Static assets, Vercel internals, and API paths (never 404 those here).
//  - Exact static routes: /, /categories, /popular, /sitemap, /blog,
//    /about, /privacy-policy, /terms-of-service, /disclaimer, /contact.
//  - /category/<valid-slug> for the 8 real categories.
//  - /blog/<anything> — blog slugs (including not-yet-published drip posts)
//    must reach the SPA so client-side publish gating keeps working.
//  - /<valid-category>/<anything> — unknown calculator slugs under a valid
//    category fall through to the SPA, which renders the noindexed NotFound
//    page (GenericCalculatorPage renders NotFound for unknown slugs).
// Everything else (unknown single segments, unknown categories, 3+ segment
// paths, unknown two-segment prefixes) gets a 404 response.

const STATIC_ROUTES = new Set([
  "/",
  "/categories",
  "/popular",
  "/sitemap",
  "/blog",
  "/about",
  "/privacy-policy",
  "/terms-of-service",
  "/disclaimer",
  "/contact",
]);

const CATEGORIES = new Set([
  "finance",
  "health",
  "math",
  "conversions",
  "science",
  "datetime",
  "lifestyle",
  "other",
]);

export const config = {
  // Skip known static prefixes; the function itself also skips file-like
  // paths, so assets are never 404'd by this middleware.
  matcher: [
    "/((?!api|_next|assets|og|favicon.png|sitemap.xml|robots.txt|llms.txt|ai-catalog.json|.well-known).*)",
  ],
};

export default function middleware(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  // Never interfere with Vercel internals or file-like paths.
  if (path.startsWith("/_")) return;
  const lastSegment = path.split("/").pop() || "";
  if (lastSegment.includes(".")) return;

  if (STATIC_ROUTES.has(path)) return;

  const parts = path.split("/").filter(Boolean);

  // /category/<slug>
  if (parts[0] === "category") {
    if (parts.length === 2 && CATEGORIES.has(parts[1])) return;
    return notFoundResponse();
  }

  // /blog/<slug> — always pass through (publish gating is client-side).
  if (parts[0] === "blog") return;

  // /<category>/<calculator-slug>
  if (parts.length === 2 && CATEGORIES.has(parts[0])) return;

  // Anything else matches no known route.
  return notFoundResponse();
}

function notFoundResponse() {
  return new Response(
    "<!doctype html><html><head><title>Page Not Found | TheCalculator.us</title>" +
      '<meta name="robots" content="noindex, follow"></head><body style="font-family:Arial,Helvetica,sans-serif;text-align:center;padding:64px 16px;">' +
      "<h1>404 — Page not found</h1>" +
      "<p>The page you are looking for does not exist on TheCalculator.us.</p>" +
      '<p><a href="/">Return to Home</a></p></body></html>',
    {
      status: 404,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    }
  );
}
