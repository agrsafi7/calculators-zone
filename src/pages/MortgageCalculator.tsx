import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { addRecentCalculator, uniqueCalculators } from "@/lib/calculator-utils";
import { Calculator, ChevronRight, Info, Landmark, LayoutGrid, Table, X } from "lucide-react";

const RELATED = [
  { name: "Mortgage Refinance Calculator", slug: "refinance-calculator" },
  { name: "Amortization Schedule Calculator", slug: "amortization-calculator" },
  { name: "Auto Loan Payment Calculator", slug: "auto-loan-calculator" },
  { name: "Rent vs Buy Calculator", slug: "rent-vs-buy-calculator" },
  { name: "Compound Interest Calculator", slug: "compound-interest-calculator" },
];

const FAQS = [
  {
    question: "What is included in PITI?",
    answer: "PITI stands for Principal, Interest, Taxes, and Insurance. Most lenders bundle local property taxes and hazard insurance into your monthly escrow payment.",
  },
  {
    question: "How can I avoid paying PMI?",
    answer: "Private Mortgage Insurance (PMI) is typically required on conventional mortgages when the down payment is less than 20% of the purchase price.",
  },
  {
    question: "Is a 15-year or 30-year loan better?",
    answer: "A 30-year loan keeps mandatory monthly payments lower, providing flexibility. A 15-year loan dramatically cuts total interest paid over the life of the loan.",
  },
];

const fmt = (n: number, d = 2) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState(400000);
  const [downPayment, setDownPayment] = useState(80000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(6.5);
  const [propertyTax, setPropertyTax] = useState(4200);
  const [homeInsurance, setHomeInsurance] = useState(1200);
  const [hoaFee, setHoaFee] = useState(0);
  const [showAmort, setShowAmort] = useState(false);

  useEffect(() => {
    addRecentCalculator({
      slug: "mortgage-calculator",
      categorySlug: "finance",
      name: "Mortgage Calculator",
      category: "Finance",
    });
  }, []);

  const calc = useMemo(() => {
    const principal = Math.max(0, homePrice - downPayment);
    const monthlyRate = interestRate / 100 / 12;
    const n = loanTerm * 12;
    let monthlyPI = 0;
    if (monthlyRate > 0 && n > 0 && principal > 0) {
      monthlyPI = (principal * (monthlyRate * Math.pow(1 + monthlyRate, n))) / (Math.pow(1 + monthlyRate, n) - 1);
    } else if (n > 0) {
      monthlyPI = principal / n;
    }
    const monthlyTax = propertyTax / 12;
    const monthlyIns = homeInsurance / 12;
    const totalMonthly = monthlyPI + monthlyTax + monthlyIns + hoaFee;
    const totalInterest = Math.max(0, monthlyPI * n - principal);
    const totalCost = principal + totalInterest + propertyTax * loanTerm + homeInsurance * loanTerm + hoaFee * n;
    const now = new Date();
    const payoff = new Date(now.getFullYear() + loanTerm, now.getMonth());
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return {
      principal, monthlyPI, monthlyTax, monthlyIns, hoaFee, totalMonthly,
      totalInterest, totalCost,
      payoff: `${months[payoff.getMonth()]} ${payoff.getFullYear()}`,
      monthlyRate, n,
    };
  }, [homePrice, downPayment, loanTerm, interestRate, propertyTax, homeInsurance, hoaFee]);

  const amortRows = useMemo(() => {
    const rows: { year: number; interest: number; principal: number; total: number; balance: number }[] = [];
    let balance = calc.principal;
    for (let yr = 1; yr <= 5; yr++) {
      let ai = 0, ap = 0;
      for (let m = 0; m < 12; m++) {
        if (balance <= 0) break;
        const im = balance * calc.monthlyRate;
        const pm = Math.min(balance, calc.monthlyPI - im);
        ai += im; ap += pm; balance -= pm;
      }
      rows.push({ year: yr, interest: ai, principal: ap, total: ai + ap, balance: Math.max(0, balance) });
    }
    return rows;
  }, [calc]);

  const syncDownFromPrice = (price: number) => {
    setHomePrice(price);
    setDownPayment(Math.round(price * (downPaymentPct / 100)));
  };
  const syncDownFromAmount = (amt: number) => {
    setDownPayment(amt);
    if (homePrice > 0) setDownPaymentPct(Math.min(100, Math.round((amt / homePrice) * 100)));
  };
  const syncDownFromPct = (pct: number) => {
    setDownPaymentPct(pct);
    setDownPayment(Math.round(homePrice * (pct / 100)));
  };
  const reset = () => {
    setHomePrice(400000); setDownPayment(80000); setDownPaymentPct(20);
    setLoanTerm(30); setInterestRate(6.5); setPropertyTax(4200);
    setHomeInsurance(1200); setHoaFee(0);
  };

  const pct = (v: number) => (calc.totalMonthly > 0 ? ((v / calc.totalMonthly) * 100).toFixed(1) + "%" : "0%");

  const finCalcs = uniqueCalculators.filter((c) => c.categorySlug === "finance" && c.slug !== "mortgage-calculator");
  const dirGroups = (() => {
    const map = new Map<string, typeof finCalcs>();
    for (const c of finCalcs) {
      const k = (c as any).subcategory || "General";
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(c);
    }
    return [...map.entries()].sort((a, b) => b[1].length - a[1].length).slice(0, 4)
      .map(([name, items]) => ({ name, items: items.slice(0, 4) }));
  })();

  const numInput = "w-full bg-transparent px-2 py-1.5 font-numeric text-[14px] text-right text-ink focus:outline-none";
  const wrap = "flex items-center rounded-lg bg-surface-low overflow-hidden w-full sm:w-64 focus-within:bg-surface-lowest focus-within:ring-2 focus-within:ring-primary";
  const affix = "px-3 font-numeric text-[14px] text-ink-soft bg-surface-container py-1.5";

  return (
    <div className="w-full bg-background min-h-[calc(100vh-144px)]">
      <SEO
        title="Mortgage Calculator"
        description="Free mortgage calculator. Estimate monthly PITI payments, total interest, and view the amortization schedule for home loans."
        canonical="/finance/mortgage-calculator"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Finance", url: "/category/finance" },
          { name: "Mortgage Calculator", url: "/finance/mortgage-calculator" },
        ]}
        faqs={FAQS}
      />

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-10 py-5">
        <div className="flex flex-col w-full">
          {/* Breadcrumbs & header */}
          <div className="flex flex-col mb-4">
            <div className="flex items-center gap-1.5 text-[11px] text-ink-soft">
              <Link className="hover:text-primary transition-colors" to="/">Home</Link>
              <span className="opacity-50">/</span>
              <Link className="hover:text-primary transition-colors" to="/category/finance">Financial</Link>
              <span className="opacity-50">/</span>
              <span className="text-ink font-medium">Mortgage Calculator</span>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-2 mt-1">
              <h1 className="font-display text-[24px] font-semibold text-ink tracking-tight">Mortgage Calculator</h1>
              <span className="text-[12px] text-ink-soft">Instant amortization & monthly PITI computation</span>
            </div>
            <p className="text-[14px] text-ink-soft mt-1">
              Estimate your total monthly mortgage payment including principal, interest, taxes, and insurance (PITI), and view total loan cost.
            </p>
          </div>

          {/* Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="bg-surface-lowest rounded-xl p-6 shadow-sm">
                <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <label className="text-[13px] font-medium text-ink flex items-center gap-1.5" htmlFor="mc-price">
                      Home Price
                      <Info size={16} className="text-ink-soft opacity-50" />
                    </label>
                    <div className={wrap}>
                      <span className={affix}>$</span>
                      <input id="mc-price" type="number" min={0} step={1000} value={homePrice}
                        onChange={(e) => syncDownFromPrice(Number(e.target.value))} className={numInput} />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <label className="text-[13px] font-medium text-ink flex items-center gap-1.5" htmlFor="mc-down">
                      Down Payment
                      <Info size={16} className="text-ink-soft opacity-50" />
                    </label>
                    <div className="flex items-center gap-2 w-full sm:w-64">
                      <div className={`${wrap} flex-1`}>
                        <span className="px-2 font-numeric text-[14px] text-ink-soft bg-surface-container py-1.5">$</span>
                        <input id="mc-down" type="number" min={0} step={500} value={downPayment}
                          onChange={(e) => syncDownFromAmount(Number(e.target.value))} className={numInput} />
                      </div>
                      <div className={`${wrap} w-20`}>
                        <input type="number" min={0} max={100} step={1} value={downPaymentPct}
                          onChange={(e) => syncDownFromPct(Number(e.target.value))} className={numInput} aria-label="Down payment percent" />
                        <span className="px-1.5 font-numeric text-[14px] text-ink-soft bg-surface-container py-1.5">%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <label className="text-[13px] font-medium text-ink">Loan Term</label>
                    <div className="grid grid-cols-4 gap-1 bg-surface-low p-1 rounded-lg w-full sm:w-64">
                      {[30, 20, 15, 10].map((t) => (
                        <button
                          key={t} type="button" onClick={() => setLoanTerm(t)}
                          className={`py-1.5 text-center rounded text-[13px] font-medium transition-colors ${
                            loanTerm === t ? "bg-surface-lowest text-primary font-semibold shadow-sm" : "text-ink-soft hover:text-ink"
                          }`}
                        >
                          {t} yr
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <label className="text-[13px] font-medium text-ink flex items-center gap-1.5" htmlFor="mc-rate">
                      Interest Rate (APR)
                      <Info size={16} className="text-ink-soft opacity-50" />
                    </label>
                    <div className={wrap}>
                      <input id="mc-rate" type="number" min={0.1} max={25} step={0.05} value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))} className={numInput} />
                      <span className={affix}>%</span>
                    </div>
                  </div>

                  <div className="h-px bg-surface-container my-1"></div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <label className="text-[13px] font-medium text-ink" htmlFor="mc-tax">Property Taxes (Annual)</label>
                    <div className={wrap}>
                      <span className={affix}>$</span>
                      <input id="mc-tax" type="number" min={0} step={50} value={propertyTax}
                        onChange={(e) => setPropertyTax(Number(e.target.value))} className={numInput} />
                      <span className="px-2 text-[11px] text-ink-soft bg-surface-container py-1.5">/yr</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <label className="text-[13px] font-medium text-ink" htmlFor="mc-ins">Homeowners Insurance</label>
                    <div className={wrap}>
                      <span className={affix}>$</span>
                      <input id="mc-ins" type="number" min={0} step={50} value={homeInsurance}
                        onChange={(e) => setHomeInsurance(Number(e.target.value))} className={numInput} />
                      <span className="px-2 text-[11px] text-ink-soft bg-surface-container py-1.5">/yr</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <label className="text-[13px] font-medium text-ink" htmlFor="mc-hoa">HOA / PMI / Fees</label>
                    <div className={wrap}>
                      <span className={affix}>$</span>
                      <input id="mc-hoa" type="number" min={0} step={10} value={hoaFee}
                        onChange={(e) => setHoaFee(Number(e.target.value))} className={numInput} />
                      <span className="px-2 text-[11px] text-ink-soft bg-surface-container py-1.5">/mo</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <button type="submit"
                      className="flex-1 bg-primary text-white font-display text-[15px] font-semibold py-1.5 px-6 rounded-lg hover:bg-tealbright transition-all flex items-center justify-center gap-1.5 shadow-sm">
                      <Calculator size={18} />
                      Calculate
                    </button>
                    <button type="button" onClick={reset}
                      className="bg-surface-low text-ink-soft hover:text-ink hover:bg-surface-container text-[13px] font-medium py-1.5 px-4 rounded-lg transition-colors">
                      Reset
                    </button>
                  </div>
                </form>
              </div>

              <div className="bg-surface-low rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-lowest flex items-center justify-center text-primary shrink-0">
                    <Landmark size={20} />
                  </div>
                  <div>
                    <div className="font-display text-[15px] font-semibold text-ink">Conforming Loan Limit</div>
                    <div className="text-[12px] text-ink-soft">Baseline limit is $766,550 for single-family homes in 2024–2025.</div>
                  </div>
                </div>
                <a className="text-[13px] font-medium text-primary hover:underline whitespace-nowrap hidden sm:inline-block" href="#formula-section">View Formula</a>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="bg-surface-lowest rounded-xl p-6 shadow-sm flex flex-col gap-4" aria-live="polite">
                <div className="flex items-center justify-between border-b border-surface-container pb-2">
                  <span className="text-[13px] font-medium uppercase tracking-wider text-ink-soft">Estimated Payment</span>
                  <span className="text-[11px] text-primary px-1.5 py-0.5 rounded bg-surface-low font-medium">Monthly PITI</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-numeric text-[32px] font-semibold text-primary tracking-tight">{fmt(calc.totalMonthly)}</span>
                    <span className="text-[12px] text-ink-soft">/ month</span>
                  </div>
                  <span className="text-[11px] text-ink-soft mt-1">Includes Principal, Interest, Taxes, and Insurance.</span>
                </div>
                <div className="w-full flex flex-col gap-1.5 pt-1">
                  <div className="w-full h-3 rounded-full bg-surface-container flex overflow-hidden">
                    <div className="bg-primary transition-all duration-300" style={{ width: pct(calc.monthlyPI) }} title="Principal & Interest"></div>
                    <div className="bg-link transition-all duration-300" style={{ width: pct(calc.monthlyTax) }} title="Property Tax"></div>
                    <div className="bg-[#5bb8fe] transition-all duration-300" style={{ width: pct(calc.monthlyIns) }} title="Home Insurance"></div>
                    <div className="bg-[#495167] transition-all duration-300" style={{ width: pct(calc.hoaFee) }} title="HOA / Fees"></div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-ink-soft">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary inline-block"></span> P&I</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-link inline-block"></span> Tax</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#5bb8fe] inline-block"></span> Ins</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#495167] inline-block"></span> HOA</span>
                  </div>
                </div>
                <div className="flex flex-col divide-y divide-surface-container text-[12px]">
                  <div className="flex justify-between py-1.5"><span className="text-ink-soft">Principal & Interest</span><span className="font-numeric text-[14px] text-ink">{fmt(calc.monthlyPI)}</span></div>
                  <div className="flex justify-between py-1.5"><span className="text-ink-soft">Property Taxes (Monthly)</span><span className="font-numeric text-[14px] text-ink">{fmt(calc.monthlyTax)}</span></div>
                  <div className="flex justify-between py-1.5"><span className="text-ink-soft">Homeowners Insurance</span><span className="font-numeric text-[14px] text-ink">{fmt(calc.monthlyIns)}</span></div>
                  <div className="flex justify-between py-1.5"><span className="text-ink-soft">PMI / HOA Dues</span><span className="font-numeric text-[14px] text-ink">{fmt(calc.hoaFee)}</span></div>
                </div>
                <div className="bg-surface-low rounded-lg p-4 flex flex-col gap-1.5 text-[12px]">
                  <div className="flex justify-between"><span className="text-ink-soft">Total Loan Amount</span><span className="font-numeric text-ink font-semibold">{fmt(calc.principal, 0)}</span></div>
                  <div className="flex justify-between"><span className="text-ink-soft">Total Interest Paid</span><span className="font-numeric text-ink font-semibold">{fmt(calc.totalInterest, 0)}</span></div>
                  <div className="flex justify-between"><span className="text-ink-soft">Total Cost of Loan</span><span className="font-numeric text-ink font-semibold">{fmt(calc.totalCost, 0)}</span></div>
                  <div className="flex justify-between"><span className="text-ink-soft">Estimated Payoff</span><span className="font-numeric text-ink font-semibold">{calc.payoff}</span></div>
                </div>
                <button
                  type="button" onClick={() => setShowAmort((v) => !v)}
                  className="w-full bg-surface-container hover:bg-surface-high text-ink text-[13px] font-medium py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Table size={18} />
                  <span>{showAmort ? "Hide Amortization Schedule" : "View Amortization Schedule"}</span>
                </button>
              </div>

              <div className="bg-surface-lowest rounded-xl p-4 shadow-sm">
                <div className="font-display text-[15px] font-semibold text-ink mb-1 flex items-center gap-1.5">
                  <LayoutGrid size={18} className="text-primary" />
                  Related Financial Tools
                </div>
                <ul className="flex flex-col text-[12px]">
                  {RELATED.map((r) => (
                    <li key={r.slug}>
                      <Link to={`/finance/${r.slug}`} className="text-link hover:text-link-dark hover:underline flex items-center justify-between py-1">
                        <span>{r.name}</span>
                        <ChevronRight size={16} className="opacity-40" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {showAmort && (
            <div className="mt-6 bg-surface-lowest rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-display text-[18px] font-semibold text-ink">Annual Amortization Schedule (First 5 Years)</h2>
                  <p className="text-[12px] text-ink-soft">Shows the shift from interest-heavy payments to principal balance reduction.</p>
                </div>
                <button type="button" className="text-ink-soft hover:text-ink" onClick={() => setShowAmort(false)} aria-label="Close">
                  <X size={20} />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[12px]">
                  <thead className="bg-surface-container text-[13px] font-medium text-ink">
                    <tr>
                      <th className="py-1.5 px-4 rounded-l">Year</th>
                      <th className="py-1.5 px-4 text-right">Interest Paid</th>
                      <th className="py-1.5 px-4 text-right">Principal Paid</th>
                      <th className="py-1.5 px-4 text-right">Total Payments</th>
                      <th className="py-1.5 px-4 text-right rounded-r">Ending Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container font-numeric text-[14px]">
                    {amortRows.map((r, i) => (
                      <tr key={r.year} className={i % 2 === 1 ? "bg-surface-low" : ""}>
                        <td className="py-1.5 px-4 font-medium text-ink">Year {r.year}</td>
                        <td className="py-1.5 px-4 text-right text-ink-soft">{fmt(r.interest, 0)}</td>
                        <td className="py-1.5 px-4 text-right text-ink-soft">{fmt(r.principal, 0)}</td>
                        <td className="py-1.5 px-4 text-right text-ink-soft">{fmt(r.total, 0)}</td>
                        <td className="py-1.5 px-4 text-right font-semibold text-ink">{fmt(r.balance, 0)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start" id="formula-section">
            <div className="md:col-span-7 bg-surface-lowest rounded-xl p-6 shadow-sm">
              <h2 className="font-display text-[18px] font-semibold text-ink mb-1">Mortgage Formula Mechanics</h2>
              <p className="text-[14px] text-ink-soft mb-4">
                Standard fixed-rate mortgages use the standard amortization formula to determine the fixed monthly principal and interest:
              </p>
              <div className="bg-surface-low p-4 rounded-lg font-numeric text-[14px] text-ink text-center mb-4">
                M = P × [ i(1 + i)<sup>n</sup> ] ÷ [ (1 + i)<sup>n</sup> − 1 ]
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px]">
                <div className="flex gap-1.5"><strong className="font-numeric text-primary">M:</strong><span className="text-ink-soft">Total monthly mortgage payment</span></div>
                <div className="flex gap-1.5"><strong className="font-numeric text-primary">P:</strong><span className="text-ink-soft">Principal loan amount (Price minus Down payment)</span></div>
                <div className="flex gap-1.5"><strong className="font-numeric text-primary">i:</strong><span className="text-ink-soft">Monthly interest rate (Annual rate ÷ 12)</span></div>
                <div className="flex gap-1.5"><strong className="font-numeric text-primary">n:</strong><span className="text-ink-soft">Total count of monthly payments (Years × 12)</span></div>
              </div>
            </div>
            <div className="md:col-span-5 bg-surface-lowest rounded-xl p-6 shadow-sm">
              <h2 className="font-display text-[18px] font-semibold text-ink mb-3">Frequently Asked Questions</h2>
              <div className="space-y-4 text-[12px]">
                {FAQS.map((f, i) => (
                  <div key={i}>
                    <h3 className="font-display text-[15px] font-semibold text-ink mb-1">{f.question}</h3>
                    <p className="text-ink-soft">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-surface-container">
            <h3 className="font-display text-[18px] font-semibold text-ink mb-4">More Financial Tools on TheCalculator.us</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[12px]">
              {dirGroups.map((g) => (
                <div key={g.name} className="flex flex-col gap-1">
                  <span className="font-display text-[15px] font-semibold text-ink mb-1">{g.name}</span>
                  {g.items.map((c) => (
                    <Link key={c.slug} to={`/${c.categorySlug}/${c.slug}`} className="text-link hover:underline">
                      {c.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
