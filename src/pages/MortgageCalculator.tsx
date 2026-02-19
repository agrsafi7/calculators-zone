import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, RotateCcw, Star } from "lucide-react";
import AdPlaceholder from "@/components/AdPlaceholder";
import RecentlyUsed from "@/components/RecentlyUsed";
import { addRecentCalculator } from "@/lib/calculator-utils";
import { popularCalculators, getCategoryIcon } from "@/data/calculators";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const relatedCalculators = [
  { name: "Auto Loan Calculator", slug: "loan-calculator", icon: "dollar", category: "finance" },
  { name: "Refinance Calculator", slug: "refinance-calculator", icon: "dollar", category: "finance" },
  { name: "Rent vs. Buy", slug: "rent-vs-buy", icon: "home", category: "finance" },
  { name: "Amortization Schedule", slug: "amortization", icon: "dollar", category: "finance" },
];

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState(450000);
  const [downPayment, setDownPayment] = useState(90000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);

  useEffect(() => {
    addRecentCalculator({ slug: "mortgage-calculator", categorySlug: "finance", name: "Mortgage Calculator", category: "Finance" });
  }, []);

  const result = useMemo(() => {
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    if (monthlyRate === 0) return { monthly: principal / numPayments, totalInterest: 0, principal };

    const monthly =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
    const totalInterest = monthly * numPayments - principal;

    return { monthly, totalInterest, principal };
  }, [homePrice, downPayment, interestRate, loanTerm]);

  const handleDownPaymentChange = (value: number) => {
    setDownPayment(value);
    setDownPaymentPercent(Math.round((value / homePrice) * 100));
  };

  const handlePercentChange = (value: number) => {
    setDownPaymentPercent(value);
    setDownPayment(Math.round((value / 100) * homePrice));
  };

  const handleReset = () => {
    setHomePrice(450000);
    setDownPayment(90000);
    setDownPaymentPercent(20);
    setInterestRate(6.5);
    setLoanTerm(30);
  };

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

  const totalInterestK = `$${Math.round(result.totalInterest / 1000)}k`;

  // Donut chart SVG
  const principalRatio = result.principal / (result.principal + result.totalInterest);
  const circumference = 2 * Math.PI * 54;
  const principalArc = circumference * principalRatio;

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="container mx-auto px-4 py-4 text-sm text-muted-foreground flex items-center gap-1.5">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/category/finance" className="hover:text-foreground">Finance</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">Mortgage Calculator</span>
      </nav>

      <div className="container mx-auto px-4 pb-12">
        <div className="flex gap-8">
          {/* Main */}
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-black mb-3">Mortgage Calculator</h1>
            <p className="text-muted-foreground text-sm max-w-xl mb-6">
              Estimate your monthly mortgage payments with our comprehensive calculator. Adjust home price, down payment, and interest rates to see exactly how they impact your loan.
            </p>

            <AdPlaceholder size="leaderboard" />

            {/* Calculator Card */}
            <div className="bg-card rounded-xl border border-border p-6 md:p-8 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div>
                  <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                    <span className="text-primary">≡</span> Loan Details
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground block mb-1.5">Home Price</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                        <input
                          type="number"
                          value={homePrice}
                          onChange={(e) => setHomePrice(Number(e.target.value))}
                          className="w-full pl-7 pr-3 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-muted-foreground block mb-1.5">Down Payment</label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                          <input
                            type="number"
                            value={downPayment}
                            onChange={(e) => handleDownPaymentChange(Number(e.target.value))}
                            className="w-full pl-7 pr-3 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                          />
                        </div>
                        <div className="relative w-20">
                          <input
                            type="number"
                            value={downPaymentPercent}
                            onChange={(e) => handlePercentChange(Number(e.target.value))}
                            className="w-full pl-3 pr-7 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="text-xs font-medium text-muted-foreground block mb-1.5">Interest Rate</label>
                        <div className="relative">
                          <input
                            type="number"
                            step="0.1"
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                            className="w-full pl-3 pr-7 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <label className="text-xs font-medium text-muted-foreground block mb-1.5">Loan Term</label>
                        <select
                          value={loanTerm}
                          onChange={(e) => setLoanTerm(Number(e.target.value))}
                          className="w-full px-3 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none"
                        >
                          <option value={15}>15 Years</option>
                          <option value={20}>20 Years</option>
                          <option value={30}>30 Years</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <button
                      onClick={() => {}}
                      className="flex-1 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Recalculate Payment
                    </button>
                    <button
                      onClick={handleReset}
                      className="p-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Results */}
                <div className="text-center">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Estimated Monthly Payment</p>
                  <p className="text-4xl font-black text-foreground mb-1">
                    {formatCurrency(result.monthly)}
                    <span className="text-lg font-normal text-muted-foreground">/mo</span>
                  </p>

                  {/* Donut */}
                  <div className="relative inline-block my-4">
                    <svg width="140" height="140" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--border))" strokeWidth="12" />
                      <circle
                        cx="60"
                        cy="60"
                        r="54"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="12"
                        strokeDasharray={`${principalArc} ${circumference - principalArc}`}
                        strokeDashoffset={circumference / 4}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-[10px] text-muted-foreground">Total Interest</p>
                      <p className="text-lg font-bold">{totalInterestK}</p>
                    </div>
                  </div>

                  <div className="text-left space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                        Principal & Interest
                      </div>
                      <span className="font-semibold">{formatCurrency(result.monthly)}</span>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-border" />
                        Property Tax
                      </div>
                      <span>$0</span>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-border" />
                        Home Insurance
                      </div>
                      <span>$0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mid Ad */}
            <div className="my-8">
              <AdPlaceholder size="responsive" />
            </div>

            {/* How to use */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                <span className="text-primary">💡</span> How to use this calculator
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Our Mortgage Calculator helps you estimate your monthly payments and understand how different factors affect your loan. Simply input your potential home price, down payment amount, and expected interest rate.
              </p>

              <h3 className="font-semibold text-base mb-2">Understanding the Formula</h3>
              <p className="text-sm text-muted-foreground mb-3">
                The standard mortgage formula used to calculate your monthly payment (M) is:
              </p>
              <div className="formula-block mb-2">
                <p className="text-lg mb-3">M = P [ i(1 + i)^n ] / [ (1 + i)^n − 1 ]</p>
                <div className="flex justify-center gap-6 text-xs opacity-70">
                  <span>M = Monthly Payment</span>
                  <span>P = Principal Loan Amount</span>
                  <span>i = Monthly Interest Rate</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Where <strong>n</strong> is the number of payments over the loan's lifetime. While this math can be complex, our tool handles the heavy lifting instantly.
              </p>
            </section>

            {/* FAQ */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="border border-border rounded-xl overflow-hidden">
                <AccordionItem value="q1" className="border-b border-border px-5">
                  <AccordionTrigger className="text-sm font-medium">
                    What constitutes a good interest rate?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Interest rates fluctuate based on the economy and your personal credit score. Generally, a rate below the current national average is considered good. A higher credit score typically qualifies you for lower rates.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q2" className="px-5">
                  <AccordionTrigger className="text-sm font-medium">
                    How does a down payment affect my loan?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    A larger down payment reduces your loan principal, which means lower monthly payments and less interest paid over the life of the loan. Putting down at least 20% also helps you avoid private mortgage insurance (PMI).
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q3" className="px-5">
                  <AccordionTrigger className="text-sm font-medium">
                    Should I choose a 15 or 30 year mortgage?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    A 15-year mortgage has higher monthly payments but you pay significantly less interest overall. A 30-year mortgage offers lower monthly payments but costs more in total interest. Choose based on your budget and financial goals.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <AdPlaceholder size="leaderboard" />
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block w-[300px] shrink-0 space-y-6">
            {/* Related Calculators */}
            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                <span className="text-primary">≡</span> Related Calculators
              </h3>
              <ul className="space-y-1">
                {relatedCalculators.map((calc) => {
                  const Icon = getCategoryIcon(calc.icon);
                  return (
                    <li key={calc.slug}>
                      <Link
                        to={`/${calc.category}/${calc.slug}`}
                        className="flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-secondary transition-colors text-sm"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        {calc.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <AdPlaceholder size="rectangle" />

            <RecentlyUsed />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
