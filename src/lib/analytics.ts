// Google Analytics 4 loader, gated by the visitor's cookie-consent choice.
//
// The tag is loaded ONLY after the visitor taps "Accept" in the cookie
// banner (or returns with a stored "accepted" choice). "Decline" — or never
// choosing — means no analytics request is ever made, so the banner's
// Accept/Decline choice is real, not decorative.
//
// Property: TheCalculator.us (GA4, account agrsafi7@gmail.com).
export const GA_MEASUREMENT_ID = "G-VHM46KC74B";

let loaded = false;

export const loadAnalytics = () => {
  if (loaded) return;
  loaded = true;
  const w = window as unknown as Record<string, unknown>;
  const dataLayer = ((w.dataLayer as unknown[] | undefined) ?? []) as unknown[];
  w.dataLayer = dataLayer;
  const gtag = (...args: unknown[]) => {
    dataLayer.push(args);
  };
  w.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID);
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
};
