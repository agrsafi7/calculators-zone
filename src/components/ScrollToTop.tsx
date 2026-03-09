import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scroll to the top on any client-side navigation (routes, categories, calculators, etc.). */
const ScrollToTop = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    // Always reset scroll position on navigation as requested.
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.search]);

  return null;
};

export default ScrollToTop;
