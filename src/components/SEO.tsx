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

const SEO = ({ title, description, canonical, type = "website", keywords, ogImage, jsonLd, breadcrumbs, faqs }: SEOProps) => {
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

  const faqSchema = faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: baseUrl,
    logo: `${baseUrl}/favicon.png`,
    sameAs: [],
    description: "Free online calculators for finance, health, math, science, conversions, and daily life.",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const isHomepage = canonical === "/";

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
      {canonical && <link rel="canonical" href={`${baseUrl}${canonical}`} />}
      {canonical && <link rel="alternate" href={`${baseUrl}${canonical}`} hrefLang="en" />}
      {canonical && <link rel="alternate" href={`${baseUrl}${canonical}`} hrefLang="x-default" />}
      {canonical && <meta property="og:url" content={`${baseUrl}${canonical}`} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${finalOgImage}`} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="content-language" content="en" />
      <html lang="en" />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
      {breadcrumbSchema && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      )}
      {faqSchema && (
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
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
