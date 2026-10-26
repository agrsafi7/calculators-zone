import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CONSENT_KEY = "tc-cookie-consent";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_KEY)) {
        // Small delay so it doesn't flash on first paint
        const t = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(t);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const choose = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // ignore storage failures
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-50 bg-card border border-border rounded-xl shadow-lg p-5"
    >
      <p className="text-sm font-semibold mb-1">We use cookies 🍪</p>
      <p className="text-xs text-muted-foreground leading-relaxed mb-4">
        We use cookies to keep the site working and remember your preferences. See our{" "}
        <Link to="/privacy-policy" className="text-primary hover:underline font-medium">
          Privacy Policy
        </Link>{" "}
        for details.
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => choose("accepted")}
          className="flex-1 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          Accept
        </button>
        <button
          onClick={() => choose("declined")}
          className="flex-1 py-2 border border-border text-sm font-medium rounded-lg hover:bg-secondary transition-colors"
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
