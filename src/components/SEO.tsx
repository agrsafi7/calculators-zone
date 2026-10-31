import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: "website" | "article";
  keywords?: string;
  ogImage?: string;
  jsonLd?: Record<string, unknown>;
  breadcrumbs?: { name: string; url: string }[];
  faqs?: { question: string; answer: string }[];
  noindex?: boolean;
}

// OG images per category
const categoryOgImages: Record<string, string> = {
  finance: "/og/og-finance.jpg",
  health: "/og/og-health.jpg",
  math: "/og/og-math.jpg",
  conversions: "/og/og-conversions.jpg",
  science: "/og/og-science.jpg",
  datetime: "/og/og-datetime.jpg",
  lifestyle: "/og/og-lifestyle.jpg",
};

export const getCategoryOgImage = (categorySlug: string): string => {
  return categoryOgImages[categorySlug] || "/og/og-default.jpg";
};

const SEO = ({ title, description, canonical, type = "website", keywords, ogImage, jsonLd, breadcrumbs, faqs, noindex }: SEOProps) => {
  const siteName = "TheCalculator.us";
  const fullTitle = `${title} | ${siteName}`;
  const baseUrl = "https://thecalculator.us";
  
  // Determine OG image based on canonical URL or provided ogImage
  let finalOgImage = ogImage || "/og/og-default.jpg";
  if (!ogImage && canonical) {
    // Check if it's a category page
    const categoryMatch = canonical.match(/^\/category\/(\w+)/);
    if (categoryMatch) {
      finalOgImage = getCategoryOgImage(categoryMatch[1]);
    }
    // Check if it's a calculator page
    const calcMatch = canonical.match(/^\/(\w+)\/[\w-]+$/);
    if (calcMatch && calcMatch[1] !== "category") {
      finalOgImage = getCategoryOgImage(calcMatch[1]);
    }
  }

  const breadcrumbSchema = breadcrumbs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: b.name,
          item: `${baseUrl}${b.url}`,
        })),
      }
    : null;

  // FAQPage JSON-LD is owned by the static prerender layer
  // (scripts/collect-meta.ts + scripts/prerender.mjs), which emits exactly
  // one FAQPage block per page in the served HTML. Emitting it here as well
  // duplicated the schema after hydration (SEO audit F7), so the `faqs`
  // prop is intentionally no longer rendered from this component.

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: baseUrl,
    logo: `${baseUrl}/favicon.png`,
    sameAs: [],
    description: "Free online calculators for finance, health, math, science, conversions, and daily life.",
  };

  // No SearchAction/potentialAction: the site has no ?q= search-results
  // view for the urlTemplate to point at (SEO audit F8), and Google retired
  // the sitelinks search box in Nov 2024. Do not re-add without a real
  // search results page.
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: baseUrl,
  };

  const isHomepage = canonical === "/";

  // Canonical may be passed as a path ("/about") or a full URL — never double the base.
  const canonicalUrl = canonical
    ? canonical.startsWith("http")
      ? canonical
      : `${baseUrl}${canonical}`
    : undefined;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={`${baseUrl}${finalOgImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      {canonical && <link rel="canonical" href={canonicalUrl} />}
      {canonical && <link rel="alternate" href={canonicalUrl} hrefLang="en" />}
      {canonical && <link rel="alternate" href={canonicalUrl} hrefLang="x-default" />}
      {canonical && <meta property="og:url" content={canonicalUrl} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${finalOgImage}`} />
      <meta name="robots" content={noindex ? "noindex, follow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
      <meta name="content-language" content="en" />
      <html lang="en" />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
      {breadcrumbSchema && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      )}
      {isHomepage && (
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      )}
      {isHomepage && (
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
