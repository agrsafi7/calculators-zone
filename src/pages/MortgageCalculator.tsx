import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { RotateCcw } from "lucide-react";
import AdPlaceholder from "@/components/AdPlaceholder";
import RecentlyUsed from "@/components/RecentlyUsed";
import SEO from "@/components/SEO";
import { addRecentCalculator } from "@/lib/calculator-utils";
import { getCategoryIcon } from "@/data/calculators";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CalculatorLayout,
  InputPanel,
  ResultsPanel,
  InputField,
  InputRow,
  DropdownSelect,
  ToggleSwitch,
  AdvancedAccordion,
  CTAButton,
  LegendRow,
  ResultStatRow,
  CHART_COLORS,
} from "@/components/calculator-ui";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const SEG_COLORS = {
  principal: CHART_COLORS.blue,
  interest: CHART_COLORS.navy,
  tax: CHART_COLORS.yellow,
  insurance: CHART_COLORS.green,
};

const relatedCalculators = [
  { name: "Auto Loan Calculator", slug: "loan-calculator", icon: "dollar", category: "finance" },
  { name: "Refinance Calculator", slug: "refinance-calculator", icon: "dollar", category: "finance" },
  { name: "Rent vs. Buy", slug: "rent-vs-buy", icon: "home", category: "finance" },
  { name: "Amortization Schedule", slug: "amortization", icon: "dollar", category: "finance" },
];

type View = "monthly" | "annually";

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState(450000);
  const [downPayment, setDownPayment] = useState(90000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTax, setPropertyTax] = useState(250);
  const [homeInsurance, setHomeInsurance] = useState(100);
  const [view, setView] = useState<View>("monthly");

  useEffect(() => {
    addRecentCalculator({
      slug: "mortgage-calculator",
      categorySlug: "finance",
      name: "Mortgage Calculator",
      category: "Finance",
    });
  }, []);

  // Calculation logic — UNCHANGED
  const result = useMemo(() => {
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    if (monthlyRate === 0)
      return { monthly: principal / numPayments, totalInterest: 0, principal, numPayments };

    const monthly =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
    const totalInterest = monthly * numPayments - principal;

    return { monthly, totalInterest, principal, numPayments };
  }, [homePrice, downPayment, interestRate, loanTerm]);

  const amortizationData = useMemo(() => {
    const principal = result.principal;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = result.numPayments;
    if (monthlyRate === 0) return [];

    const monthly = result.monthly;
    let balance = principal;
    const data: { year: number; principal: number; interest: number; balance: number }[] = [];

    for (let year = 1; year <= loanTerm; year++) {
      let yearPrincipal = 0;
      let yearInterest = 0;
      for (let m = 0; m < 12; m++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = monthly - interestPayment;
        yearPrincipal += principalPayment;
        yearInterest += interestPayment;
        balance -= principalPayment;
      }
      data.push({
        year,
        principal: Math.round(yearPrincipal),
        interest: Math.round(yearInterest),
        balance: Math.max(0, Math.round(balance)),
      });
    }
    return data;
  }, [result, interestRate, loanTerm]);

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
    setPropertyTax(250);
    setHomeInsurance(100);
  };

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);

  // Display values: monthly or annually
  const factor = view === "annually" ? 12 : 1;
  const piPayment = result.monthly * factor;
  const taxPayment = propertyTax * factor;
  const insurancePayment = homeInsurance * factor;
  const totalPayment = piPayment + taxPayment + insurancePayment;
  const periodLabel = view === "annually" ? "/yr" : "/mo";

  // Donut: monthly payment breakdown
  const donutData = [
    { name: "Principal & Interest", value: Math.round(piPayment), color: SEG_COLORS.principal },
    { name: "Property Tax", value: Math.round(taxPayment), color: SEG_COLORS.tax },
    { name: "Home Insurance", value: Math.round(insurancePayment), color: SEG_COLORS.insurance },
  ];

  const totalForPct = donutData.reduce((s, d) => s + d.value, 0) || 1;

  return (
    <>
      <SEO
        title="Mortgage Calculator"
        description="Free mortgage calculator. Estimate monthly payments, total interest, and amortization for home loans."
        canonical="/finance/mortgage-calculator"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Finance", url: "/category/finance" },
          { name: "Mortgage Calculator", url: "/finance/mortgage-calculator" },
        ]}
        faqs={[
          {
            question: "What constitutes a good interest rate?",
            answer: "A rate below the current national average is generally considered good.",
          },
          {
            question: "How does a down payment affect my loan?",
            answer: "A larger down payment reduces your principal and monthly payments.",
          },
        ]}
      />
      <CalculatorLayout
        title="Mortgage Calculator"
        description="Estimate your monthly mortgage payments. Adjust home price, down payment, and interest rates to see exactly how they impact your loan."
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Finance", url: "/category/finance" },
          { name: "Mortgage Calculator" },
        ]}
        belowCard={
          <>
            {/* Long-term comparison */}
            {amortizationData.length > 0 && (
              <div className="bg-card rounded-2xl border border-border shadow-sm p-6 mt-6">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <h3 className="font-bold text-base">
                    Amortization — Principal vs Interest
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    Total interest: {formatCurrency(result.totalInterest)}
                  </span>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={amortizationData}
                    margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="year"
                      tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                      tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                    />
                    <RechartsTooltip
                      formatter={(v: number, n: string) => [formatCurrency(v), n]}
                      contentStyle={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                    <Bar
                      dataKey="principal"
                      name="Principal"
                      fill={SEG_COLORS.principal}
                      radius={[2, 2, 0, 0]}
                      stackId="a"
                    />
                    <Bar
                      dataKey="interest"
                      name="Interest"
                      fill={SEG_COLORS.navy}
                      radius={[2, 2, 0, 0]}
                      stackId="a"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            <div className="my-6">
              <AdPlaceholder size="responsive" />
            </div>

            <section className="mb-6 bg-card rounded-2xl border border-border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                <span className="text-primary">💡</span> How to use this calculator
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Input your potential home price, down payment, and expected interest rate to
                estimate monthly payments and understand how each factor affects your loan.
              </p>
              <div className="formula-block mb-2">
                <p className="text-lg mb-3">M = P [ i(1 + i)^n ] / [ (1 + i)^n − 1 ]</p>
                <div className="flex justify-center gap-6 text-xs opacity-70">
                  <span>M = Monthly Payment</span>
                  <span>P = Principal</span>
                  <span>i = Monthly Rate</span>
                </div>
              </div>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
              <Accordion
                type="single"
                collapsible
                className="border border-border rounded-2xl overflow-hidden bg-card"
              >
                <AccordionItem value="q1" className="border-b border-border px-5">
                  <AccordionTrigger className="text-sm font-medium">
                    What constitutes a good interest rate?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Rates fluctuate based on the economy and your credit score. Generally a rate
                    below the current national average is considered good.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q2" className="border-b border-border px-5">
                  <AccordionTrigger className="text-sm font-medium">
                    How does a down payment affect my loan?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    A larger down payment reduces your principal, lowering monthly payments and
                    total interest. 20%+ also avoids PMI.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q3" className="px-5">
                  <AccordionTrigger className="text-sm font-medium">
                    Should I choose a 15 or 30 year mortgage?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    A 15-year mortgage has higher monthly payments but you pay less interest
                    overall. A 30-year offers lower payments but costs more in total interest.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <AdPlaceholder size="leaderboard" />
          </>
        }
        sidebar={
          <>
            <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
              <h3 className="font-bold text-sm mb-4">Related Calculators</h3>
              <ul className="space-y-1">
                {relatedCalculators.map((calc) => {
                  const Icon = getCategoryIcon(calc.icon);
                  return (
                    <li key={calc.slug}>
                      <Link
                        to={`/${calc.category}/${calc.slug}`}
                        className="flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-secondary transition-colors text-sm"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
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
          </>
        }
      >
        {/* LEFT: Inputs */}
        <InputPanel>
          <InputField
            label="Home Price"
            value={homePrice}
            prefix="$"
            onChange={(v) => setHomePrice(Number(v))}
          />

          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">
              Down Payment
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  $
                </span>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => handleDownPaymentChange(Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2.5 rounded-lg border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                />
              </div>
              <div className="relative w-24">
                <input
                  type="number"
                  value={downPaymentPercent}
                  onChange={(e) => handlePercentChange(Number(e.target.value))}
                  className="w-full pl-3 pr-7 py-2.5 rounded-lg border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  %
                </span>
              </div>
            </div>
          </div>

          <InputRow>
            <InputField
              label="Interest Rate"
              value={interestRate}
              suffix="%"
              step="0.1"
              onChange={(v) => setInterestRate(Number(v))}
            />
            <DropdownSelect<number>
              label="Loan Term"
              value={loanTerm}
              onChange={setLoanTerm}
              options={[
                { value: 15, label: "15 Years" },
                { value: 20, label: "20 Years" },
                { value: 30, label: "30 Years" },
              ]}
            />
          </InputRow>

          <AdvancedAccordion title="Taxes, insurance, HOA fees">
            <InputRow>
              <InputField
                label="Property Tax / mo"
                value={propertyTax}
                prefix="$"
                onChange={(v) => setPropertyTax(Number(v))}
              />
              <InputField
                label="Insurance / mo"
                value={homeInsurance}
                prefix="$"
                onChange={(v) => setHomeInsurance(Number(v))}
              />
            </InputRow>
          </AdvancedAccordion>

          <div className="pt-2 flex gap-2">
            <CTAButton>Recalculate Payment</CTAButton>
            <button
              onClick={handleReset}
              className="px-3 py-3 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </InputPanel>

        {/* RIGHT: Results */}
        <ResultsPanel>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Total Payment
            </p>
            <ToggleSwitch<View>
              value={view}
              onChange={setView}
              options={[
                { value: "monthly", label: "Monthly" },
                { value: "annually", label: "Annually" },
              ]}
            />
          </div>

          <h2 className="text-base font-bold text-foreground">
            {view === "monthly" ? "Estimated monthly cost" : "Estimated annual cost"}
          </h2>

          {/* Donut chart with primary value in center */}
          <div className="relative">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={68}
                  outerRadius={92}
                  dataKey="value"
                  strokeWidth={3}
                  stroke="hsl(var(--card))"
                >
                  {donutData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-2xl md:text-3xl font-black text-foreground">
                {formatCurrency(totalPayment)}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                Total{periodLabel}
              </p>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-1">
            {donutData.map((d) => (
              <LegendRow
                key={d.name}
                color={d.color}
                label={d.name}
                value={formatCurrency(d.value)}
                meta={`${((d.value / totalForPct) * 100).toFixed(1)}%`}
              />
            ))}
          </div>

          {/* Summary stats */}
          <div className="border-t border-border pt-2">
            <ResultStatRow label="Loan amount" value={formatCurrency(result.principal)} />
            <ResultStatRow label="Total interest" value={formatCurrency(result.totalInterest)} />
            <ResultStatRow
              label={`Total over ${loanTerm} yrs`}
              value={formatCurrency(result.principal + result.totalInterest)}
              emphasize
            />
          </div>
        </ResultsPanel>
      </CalculatorLayout>
    </>
  );
};

export default MortgageCalculator;
