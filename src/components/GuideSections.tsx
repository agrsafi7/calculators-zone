import { Link } from "react-router-dom";
import { calculatorGuides } from "@/data/calculator-guides";
import { GUIDE_LINKS } from "@/data/guide-links";

// Contextual in-content links inside guide paragraphs. Phrases come from
// the curated map in guide-links.ts (generic words deliberately excluded).
// Rules: first mention only per guide, at most MAX_GUIDE_LINKS links per
// guide, never a link to the guide's own page.
const MAX_GUIDE_LINKS = 4;

interface LinkState {
  linkedHrefs: Set<string>;
  count: number;
}

// Flatten the map to phrase -> href, longest phrases first so the regex
// alternation prefers the longest match at each position.
const PHRASE_TO_HREF = new Map<string, string>();
for (const entry of GUIDE_LINKS) {
  for (const phrase of entry.phrases) {
    PHRASE_TO_HREF.set(phrase.toLowerCase(), entry.href);
  }
}
const PHRASE_PATTERN = [...PHRASE_TO_HREF.keys()]
  .sort((a, b) => b.length - a.length)
  .map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
  .join("|");
const LINK_RE = new RegExp(`\\b(${PHRASE_PATTERN})\\b`, "gi");

const linkify = (text: string, selfSlug: string, state: LinkState, keyPrefix: string) => {
  const parts = text.split(LINK_RE);
  return parts.map((part, i) => {
    const href = PHRASE_TO_HREF.get(part.toLowerCase());
    if (!href) return <span key={`${keyPrefix}-${i}`}>{part}</span>;
    const targetSlug = href.split("/").pop() ?? "";
    if (
      targetSlug === selfSlug ||
      state.linkedHrefs.has(href) ||
      state.count >= MAX_GUIDE_LINKS
    ) {
      return <span key={`${keyPrefix}-${i}`}>{part}</span>;
    }
    state.linkedHrefs.add(href);
    state.count += 1;
    return (
      <Link key={`${keyPrefix}-${i}`} to={href} className="text-link hover:underline font-medium">
        {part}
      </Link>
    );
  });
};

// Renders **bold** markers inside guide paragraphs, with contextual links
// applied inside both plain and bold text.
const renderRich = (text: string, selfSlug: string, state: LinkState, keyPrefix: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**") && p.length > 4) {
      return (
        <strong key={`${keyPrefix}-b${i}`} className="text-foreground font-semibold">
          {linkify(p.slice(2, -2), selfSlug, state, `${keyPrefix}-b${i}`)}
        </strong>
      );
    }
    return <span key={`${keyPrefix}-t${i}`}>{linkify(p, selfSlug, state, `${keyPrefix}-t${i}`)}</span>;
  });
};

const GuideSections = ({ slug }: { slug: string }) => {
  const sections = calculatorGuides[slug];
  if (!sections || sections.length === 0) return null;

  // Fresh link state per render: first-mention tracking is per guide.
  const linkState: LinkState = { linkedHrefs: new Set(), count: 0 };

  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">In-Depth Guide</h2>
      <div className="space-y-6">
        {sections.map((s, i) => (
          <div key={i}>
            <h3 className="text-base font-semibold text-foreground mb-2">{s.heading}</h3>
            <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
              {s.paragraphs.map((p, j) => (
                <p key={j}>{renderRich(p, slug, linkState, `s${i}p${j}`)}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GuideSections;
