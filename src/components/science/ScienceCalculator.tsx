import { useState, useMemo, useCallback, Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Copy,
  Printer,
  Share2,
  RotateCcw,
  Sigma,
  Beaker,
  Check,
} from "lucide-react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "@/hooks/use-toast";
import type {
  ScienceCalculatorConfig,
  Variable,
} from "@/data/science/types";

const Chart = lazy(() => import("./ScienceChart"));

interface Props {
  config: ScienceCalculatorConfig;
}

function fmt(n: number): string {
  if (!isFinite(n)) return "—";
  const abs = Math.abs(n);
  if (abs !== 0 && (abs < 0.001 || abs >= 1e7)) return n.toExponential(4);
  return n.toLocaleString(undefined, { maximumFractionDigits: 6 });
}

const ScienceCalculator = ({ config }: Props) => {
  const [target, setTarget] = useState<string>(config.defaultTarget);
  const [values, setValues] = useState<Record<string, string>>(() => {
    const out: Record<string, string> = {};
    config.variables.forEach((v) => {
      out[v.key] = v.defaultValue !== undefined ? String(v.defaultValue) : "";
    });
    return out;
  });
  const [units, setUnits] = useState<Record<string, string>>(() => {
    const out: Record<string, string> = {};
    config.variables.forEach((v) => {
      out[v.key] = v.defaultUnit ?? v.units[0].label;
    });
    return out;
  });
  const [copied, setCopied] = useState(false);

  const inputVars = useMemo(
    () => config.variables.filter((v) => v.key !== target),
    [config.variables, target],
  );

  const { result, error } = useMemo(() => {
    try {
      const base: Record<string, number> = {};
      for (const v of inputVars) {
        const raw = values[v.key];
        if (raw === "" || raw === undefined) {
          return { result: null, error: `Enter a value for ${v.label}.` };
        }
        const num = Number(raw);
        if (!isFinite(num)) return { result: null, error: `${v.label} must be a number.` };
        const unit = v.units.find((u) => u.label === units[v.key]) ?? v.units[0];
        base[v.key] = num * unit.toBase;
      }
      const res = config.solve(target, base, units);
      if (!isFinite(res.value)) {
        return { result: null, error: "Result is undefined. Check your inputs (e.g. divide by zero)." };
      }
      return { result: res, error: null as string | null };
    } catch (e) {
      return { result: null, error: (e as Error).message };
    }
  }, [config, target, inputVars, values, units]);

  const targetVar = config.variables.find((v) => v.key === target)!;

  const onReset = useCallback(() => {
    const out: Record<string, string> = {};
    const u: Record<string, string> = {};
    config.variables.forEach((v) => {
      out[v.key] = v.defaultValue !== undefined ? String(v.defaultValue) : "";
      u[v.key] = v.defaultUnit ?? v.units[0].label;
    });
    setValues(out);
    setUnits(u);
    setTarget(config.defaultTarget);
  }, [config]);

  const onCopy = useCallback(async () => {
    if (!result) return;
    const txt = `${targetVar.label}: ${fmt(result.value)} ${result.unit}\nFormula: ${result.formula}\n\n${result.steps.map((s) => s.line).join("\n")}`;
    try {
      await navigator.clipboard.writeText(txt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      toast({ title: "Result copied" });
    } catch {
      toast({ title: "Copy failed", variant: "destructive" });
    }
  }, [result, targetVar]);

  const onShare = useCallback(async () => {
    const params = new URLSearchParams();
    params.set("for", target);
    Object.entries(values).forEach(([k, v]) => v && params.set(k, v));
    Object.entries(units).forEach(([k, v]) => v && params.set(`${k}_u`, v));
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: config.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast({ title: "Share link copied" });
      }
    } catch {
      /* user cancelled */
    }
  }, [target, values, units, config.title]);

  const onPrint = useCallback(() => window.print(), []);

  // ---- SEO JSON-LD ----
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Science", url: "/category/science" },
    { name: config.subCategory, url: "/category/science" },
    { name: config.title, url: `/science/${config.slug}` },
  ];
  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: config.title,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    description: config.shortDescription,
    offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
  };

  return (
    <div className="bg-[hsl(220,20%,97%)] dark:bg-background min-h-[calc(100vh-200px)]">
      <SEO
        title={config.metaTitle}
        description={config.metaDescription}
        canonical={`/science/${config.slug}`}
        keywords={config.keywords}
        breadcrumbs={breadcrumbs.map((b) => ({ name: b.name, url: b.url }))}
        faqs={config.faqs.map((f) => ({ question: f.q, answer: f.a }))}
        jsonLd={calculatorSchema}
      />

      {/* Breadcrumbs */}
      <nav className="container mx-auto px-4 py-4 text-sm text-muted-foreground flex items-center gap-1.5 flex-wrap">
        {breadcrumbs.map((b, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i < breadcrumbs.length - 1 ? (
              <Link to={b.url} className="hover:text-foreground transition-colors">
                {b.name}
              </Link>
            ) : (
              <span className="text-foreground font-medium">{b.name}</span>
            )}
            {i < breadcrumbs.length - 1 && <ChevronRight className="w-3 h-3" />}
          </span>
        ))}
      </nav>

      <div className="container mx-auto px-4 pb-12 max-w-5xl">
        {/* HERO */}
        <header className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            <Beaker className="w-3.5 h-3.5" />
            Science · {config.subCategory}
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-foreground mb-2">
            {config.title}
          </h1>
          <p className="text-muted-foreground max-w-2xl">{config.shortDescription}</p>
          <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
            <Sigma className="w-4 h-4 text-primary" />
            <span className="font-mono text-sm font-semibold text-foreground">
              {config.formulaPreview}
            </span>
          </div>
        </header>

        {/* CALCULATOR CARD */}
        <section
          aria-label="Calculator"
          className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Inputs */}
            <div className="p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-border space-y-5">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-2">
                  Solve For
                </label>
                <select
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full px-3 py-3 rounded-lg border border-border bg-background text-base font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  {config.solveFor.map((key) => {
                    const v = config.variables.find((x) => x.key === key)!;
                    return (
                      <option key={key} value={key}>
                        {v.label} ({v.symbol})
                      </option>
                    );
                  })}
                </select>
              </div>

              {inputVars.map((v) => (
                <UnitInputField
                  key={v.key}
                  variable={v}
                  value={values[v.key]}
                  unit={units[v.key]}
                  onValueChange={(val) =>
                    setValues((s) => ({ ...s, [v.key]: val }))
                  }
                  onUnitChange={(u) => setUnits((s) => ({ ...s, [v.key]: u }))}
                />
              ))}

              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onReset}
                  className="flex-1"
                >
                  <RotateCcw className="w-4 h-4 mr-1.5" />
                  Reset
                </Button>
                <Button
                  type="button"
                  onClick={onCopy}
                  disabled={!result}
                  className="flex-1"
                >
                  {copied ? (
                    <Check className="w-4 h-4 mr-1.5" />
                  ) : (
                    <Copy className="w-4 h-4 mr-1.5" />
                  )}
                  Copy
                </Button>
              </div>
            </div>

            {/* Results */}
            <div className="p-6 md:p-8 bg-[hsl(220,20%,98%)] dark:bg-card/50">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                {targetVar.label} ({targetVar.symbol})
              </div>
              {error ? (
                <div className="text-destructive text-sm py-6">{error}</div>
              ) : result ? (
                <>
                  <div className="text-4xl md:text-5xl font-black text-primary mb-1 break-all">
                    {fmt(result.value)}
                  </div>
                  <div className="text-muted-foreground font-medium mb-4">
                    {result.unit}
                  </div>
                  <div className="px-3 py-2 rounded-lg bg-primary/5 border border-primary/20 mb-4">
                    <div className="text-[11px] font-semibold text-primary uppercase mb-0.5">
                      Formula used
                    </div>
                    <div className="font-mono text-sm text-foreground">
                      {result.formula}
                    </div>
                  </div>

                  {/* STEP BY STEP */}
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                      Step-by-step
                    </div>
                    <ol className="space-y-1.5 text-sm">
                      {result.steps.map((s, i) => (
                        <li
                          key={i}
                          className="flex gap-2 font-mono text-foreground"
                        >
                          <span className="text-muted-foreground shrink-0">
                            {i + 1}.
                          </span>
                          <div>
                            <div>{s.line}</div>
                            {s.note && (
                              <div className="text-xs text-muted-foreground font-sans italic">
                                {s.note}
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                    <Button size="sm" variant="ghost" onClick={onShare}>
                      <Share2 className="w-4 h-4 mr-1.5" />
                      Share
                    </Button>
                    <Button size="sm" variant="ghost" onClick={onPrint}>
                      <Printer className="w-4 h-4 mr-1.5" />
                      Print / PDF
                    </Button>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </section>

        {/* CHART */}
        {config.chart && result && (
          <section className="bg-card rounded-2xl border border-border shadow-sm p-6 mb-8">
            <h2 className="text-lg font-bold text-foreground mb-1">
              {config.chart.title}
            </h2>
            <p className="text-xs text-muted-foreground mb-4">
              Dynamic preview — updates as you change inputs.
            </p>
            <Suspense
              fallback={
                <div className="h-64 bg-muted/40 rounded-lg animate-pulse" />
              }
            >
              <Chart config={config} values={values} units={units} />
            </Suspense>
          </section>
        )}

        {/* FORMULA EXPLANATION */}
        <section className="bg-card rounded-2xl border border-border shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-foreground mb-3">
            Formula explained
          </h2>
          <div className="font-mono text-lg bg-muted/40 rounded-lg px-4 py-3 mb-4 inline-block">
            {config.explanation.formula}
          </div>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase text-muted-foreground border-b border-border">
                  <th className="py-2 pr-3">Symbol</th>
                  <th className="py-2 pr-3">Name</th>
                  <th className="py-2 pr-3">Unit</th>
                  <th className="py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                {config.explanation.variables.map((v) => (
                  <tr key={v.symbol} className="border-b border-border/60">
                    <td className="py-2 pr-3 font-mono font-semibold text-primary">
                      {v.symbol}
                    </td>
                    <td className="py-2 pr-3 text-foreground">{v.name}</td>
                    <td className="py-2 pr-3 text-muted-foreground">{v.unit}</td>
                    <td className="py-2 text-muted-foreground">{v.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {config.explanation.description}
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2 text-sm">
                Common applications
              </h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                {config.explanation.applications.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
            {config.explanation.commonMistakes && (
              <div>
                <h3 className="font-semibold text-foreground mb-2 text-sm">
                  Common mistakes
                </h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {config.explanation.commonMistakes.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* WORKED EXAMPLES */}
        <section className="bg-card rounded-2xl border border-border shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Worked examples
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {config.examples.map((ex, i) => (
              <article
                key={i}
                className="border border-border rounded-lg p-4 bg-background"
              >
                <div className="text-xs font-semibold text-primary mb-1">
                  Example {i + 1}
                </div>
                <h3 className="font-semibold text-foreground mb-1">{ex.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{ex.scenario}</p>
                <ol className="space-y-1 mb-2 text-xs font-mono text-foreground">
                  {ex.steps.map((s, j) => (
                    <li key={j}>{s}</li>
                  ))}
                </ol>
                <div className="text-sm font-bold text-primary">{ex.answer}</div>
              </article>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section
          className="bg-card rounded-2xl border border-border shadow-sm p-6 mb-8"
          aria-label="Frequently asked questions"
        >
          <h2 className="text-xl font-bold text-foreground mb-4">
            Frequently asked questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {config.faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-sm font-semibold">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* LONG-FORM SEO CONTENT */}
        <section className="bg-card rounded-2xl border border-border shadow-sm p-6 mb-8 prose-content">
          <article className="max-w-none">
            {config.seoContent.split("\n\n").map((para, i) => {
              if (para.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="text-xl font-bold text-foreground mt-6 first:mt-0 mb-2"
                  >
                    {para.replace(/^##\s+/, "")}
                  </h2>
                );
              }
              if (para.startsWith("- ")) {
                return (
                  <ul
                    key={i}
                    className="list-disc list-inside text-muted-foreground space-y-1 mb-3"
                  >
                    {para.split("\n").map((li, j) => (
                      <li key={j}>{li.replace(/^-\s+/, "")}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p
                  key={i}
                  className="text-muted-foreground leading-relaxed mb-3"
                >
                  {para}
                </p>
              );
            })}
          </article>
        </section>

        {/* RELATED */}
        <section className="bg-card rounded-2xl border border-border shadow-sm p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Related calculators
          </h2>
          <div className="flex flex-wrap gap-2">
            {config.related.map((r) => (
              <Link
                key={r.label + r.href}
                to={r.href}
                className="px-3 py-2 rounded-lg bg-primary/5 text-primary text-sm font-medium border border-primary/20 hover:bg-primary/10 transition-colors"
              >
                {r.label} →
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

interface UnitInputFieldProps {
  variable: Variable;
  value: string;
  unit: string;
  onValueChange: (v: string) => void;
  onUnitChange: (u: string) => void;
}

function UnitInputField({
  variable,
  value,
  unit,
  onValueChange,
  onUnitChange,
}: UnitInputFieldProps) {
  return (
    <div>
      <label
        htmlFor={`var-${variable.key}`}
        className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-1.5"
      >
        {variable.label} ({variable.symbol})
      </label>
      <div className="flex gap-2">
        <input
          id={`var-${variable.key}`}
          type="number"
          inputMode="decimal"
          step="any"
          value={value}
          placeholder={variable.placeholder}
          onChange={(e) => onValueChange(e.target.value)}
          className="flex-1 min-w-0 px-3 py-3 rounded-lg border border-border bg-background text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
        <select
          aria-label={`Unit for ${variable.label}`}
          value={unit}
          onChange={(e) => onUnitChange(e.target.value)}
          className="w-24 px-2 py-3 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          {variable.units.map((u) => (
            <option key={u.label} value={u.label}>
              {u.label}
            </option>
          ))}
        </select>
      </div>
      {variable.smartHint && (
        <p className="text-xs text-muted-foreground mt-1">{variable.smartHint}</p>
      )}
    </div>
  );
}

export default ScienceCalculator;
