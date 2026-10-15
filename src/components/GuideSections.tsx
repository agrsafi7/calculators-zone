import { calculatorGuides } from "@/data/calculator-guides";

// Renders **bold** markers inside guide paragraphs.
const renderRich = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") && p.length > 4 ? (
      <strong key={i} className="text-foreground font-semibold">
        {p.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{p}</span>
    )
  );
};

const GuideSections = ({ slug }: { slug: string }) => {
  const sections = calculatorGuides[slug];
  if (!sections || sections.length === 0) return null;

  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">In-Depth Guide</h2>
      <div className="space-y-6">
        {sections.map((s, i) => (
          <div key={i}>
            <h3 className="text-base font-semibold text-foreground mb-2">{s.heading}</h3>
            <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
              {s.paragraphs.map((p, j) => (
                <p key={j}>{renderRich(p)}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GuideSections;
