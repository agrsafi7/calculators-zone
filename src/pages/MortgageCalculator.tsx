import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, RotateCcw, Star } from "lucide-react";
import AdPlaceholder from "@/components/AdPlaceholder";
import RecentlyUsed from "@/components/RecentlyUsed";
import SEO from "@/components/SEO";
import { addRecentCalculator } from "@/lib/calculator-utils";
import { popularCalculators, getCategoryIcon } from "@/data/calculators";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, ResponsiveContainer, Legend, AreaChart, Area,
} from "recharts";

const COLORS = {
  primary: "hsl(217, 91%, 60%)",
  interest: "hsl(0, 84%, 60%)",
  tax: "hsl(25, 95%, 53%)",
  insurance: "hsl(142, 71%, 45%)",
};

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
  const [propertyTax, setPropertyTax] = useState(250);
  const [homeInsurance, setHomeInsurance] = useState(100);

  useEffect(() => {
    addRecentCalculator({ slug: "mortgage-calculator", categorySlug: "finance", name: "Mortgage Calculator", category: "Finance" });
  }, []);

  const result = useMemo(() => {
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    if (monthlyRate === 0) return { monthly: principal / numPayments, totalInterest: 0, principal, numPayments };

    const monthly =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
    const totalInterest = monthly * numPayments - principal;

    return { monthly, totalInterest, principal, numPayments };
  }, [homePrice, downPayment, interestRate, loanTerm]);

  // Generate amortization data for chart (yearly)
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
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

  const totalMonthly = result.monthly + propertyTax + homeInsurance;

  // Pie chart data
  const pieData = [
    { name: "Principal & Interest", value: Math.round(result.monthly), color: COLORS.primary },
    { name: "Property Tax", value: propertyTax, color: COLORS.tax },
    { name: "Home Insurance", value: homeInsurance, color: COLORS.insurance },
  ];

  const totalCostData = [
    { name: "Principal", value: Math.round(result.principal), color: COLORS.primary },
    { name: "Total Interest", value: Math.round(result.totalInterest), color: COLORS.interest },
  ];

  return (
    <div>
      <SEO title="Mortgage Calculator" description="Free mortgage calculator. Estimate monthly payments, total interest, and amortization for home loans. Adjust rates and terms instantly." canonical="/finance/mortgage-calculator" breadcrumbs={[{name:"Home",url:"/"},{name:"Finance",url:"/category/finance"},{name:"Mortgage Calculator",url:"/finance/mortgage-calculator"}]} faqs={[{question:"What constitutes a good interest rate?",answer:"A rate below the current national average is generally considered good."},{question:"How does a down payment affect my loan?",answer:"A larger down payment reduces your principal and monthly payments."}]} />
      <nav className="container mx-auto px-4 py-4 text-sm text-muted-foreground flex items-center gap-1.5">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/category/finance" className="hover:text-foreground">Finance</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">Mortgage Calculator</span>
      </nav>

      <div className="container mx-auto px-4 pb-12">
        <div className="flex gap-8">
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
                        <input type="number" value={homePrice} onChange={(e) => setHomePrice(Number(e.target.value))} className="w-full pl-7 pr-3 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-muted-foreground block mb-1.5">Down Payment</label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                          <input type="number" value={downPayment} onChange={(e) => handleDownPaymentChange(Number(e.target.value))} className="w-full pl-7 pr-3 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                        </div>
                        <div className="relative w-20">
                          <input type="number" value={downPaymentPercent} onChange={(e) => handlePercentChange(Number(e.target.value))} className="w-full pl-3 pr-7 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="text-xs font-medium text-muted-foreground block mb-1.5">Interest Rate</label>
                        <div className="relative">
                          <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full pl-3 pr-7 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <label className="text-xs font-medium text-muted-foreground block mb-1.5">Loan Term</label>
                        <select value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} className="w-full px-3 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none">
                          <option value={15}>15 Years</option>
                          <option value={20}>20 Years</option>
                          <option value={30}>30 Years</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="text-xs font-medium text-muted-foreground block mb-1.5">Property Tax/mo</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                          <input type="number" value={propertyTax} onChange={(e) => setPropertyTax(Number(e.target.value))} className="w-full pl-7 pr-3 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <label className="text-xs font-medium text-muted-foreground block mb-1.5">Insurance/mo</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                          <input type="number" value={homeInsurance} onChange={(e) => setHomeInsurance(Number(e.target.value))} className="w-full pl-7 pr-3 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <button onClick={() => {}} className="flex-1 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
                      Recalculate Payment
                    </button>
                    <button onClick={handleReset} className="p-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors">
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Results */}
                <div className="text-center">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Total Monthly Payment</p>
                  <p className="text-4xl font-black text-foreground mb-1">
                    {formatCurrency(totalMonthly)}
                    <span className="text-lg font-normal text-muted-foreground">/mo</span>
                  </p>

                  {/* Monthly Breakdown Donut */}
                  <div className="my-4">
                    <ResponsiveContainer width="100%" height={180}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={75}
                          dataKey="value"
                          strokeWidth={2}
                          stroke="hsl(var(--card))"
                        >
                          {pieData.map((entry, i) => (
                            <Cell key={i} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip
                          formatter={(value: number) => formatCurrency(value)}
                          contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="text-left space-y-2 text-sm">
                    {pieData.map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                          <span className="text-muted-foreground">{item.name}</span>
                        </div>
                        <span className="font-semibold">{formatCurrency(item.value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Total Cost Breakdown */}
            <div className="bg-card rounded-xl border border-border p-6 mt-4">
              <h3 className="font-semibold text-sm mb-4">Total Cost Over {loanTerm} Years</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={totalCostData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      dataKey="value"
                      strokeWidth={2}
                      stroke="hsl(var(--card))"
                    >
                      {totalCostData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3">
                  {totalCostData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      <span className="text-sm font-bold">{formatCurrency(item.value)}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <span className="text-sm font-bold text-primary">Total Cost</span>
                    <span className="text-sm font-black text-primary">{formatCurrency(result.principal + result.totalInterest)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Amortization Chart */}
            {amortizationData.length > 0 && (
              <div className="bg-card rounded-xl border border-border p-6 mt-4">
                <h3 className="font-semibold text-sm mb-4">Amortization Schedule — Principal vs Interest</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={amortizationData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} label={{ value: "Year", position: "insideBottom", offset: -2, fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                    <RechartsTooltip
                      formatter={(value: number, name: string) => [formatCurrency(value), name]}
                      contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                    <Bar dataKey="principal" name="Principal" fill={COLORS.primary} radius={[2, 2, 0, 0]} stackId="a" />
                    <Bar dataKey="interest" name="Interest" fill={COLORS.interest} radius={[2, 2, 0, 0]} stackId="a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Balance Over Time */}
            {amortizationData.length > 0 && (
              <div className="bg-card rounded-xl border border-border p-6 mt-4">
                <h3 className="font-semibold text-sm mb-4">Remaining Balance Over Time</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={amortizationData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                    <RechartsTooltip
                      formatter={(value: number) => [formatCurrency(value), "Balance"]}
                      contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }}
                    />
                    <Area type="monotone" dataKey="balance" fill={COLORS.primary} fillOpacity={0.15} stroke={COLORS.primary} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}

            <div className="my-8">
              <AdPlaceholder size="responsive" />
            </div>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                <span className="text-primary">💡</span> How to use this calculator
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Our Mortgage Calculator helps you estimate your monthly payments and understand how different factors affect your loan. Simply input your potential home price, down payment amount, and expected interest rate.
              </p>
              <h3 className="font-semibold text-base mb-2">Understanding the Formula</h3>
              <p className="text-sm text-muted-foreground mb-3">The standard mortgage formula used to calculate your monthly payment (M) is:</p>
              <div className="formula-block mb-2">
                <p className="text-lg mb-3">M = P [ i(1 + i)^n ] / [ (1 + i)^n − 1 ]</p>
                <div className="flex justify-center gap-6 text-xs opacity-70">
                  <span>M = Monthly Payment</span>
                  <span>P = Principal Loan Amount</span>
                  <span>i = Monthly Interest Rate</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">Where <strong>n</strong> is the number of payments over the loan's lifetime.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="border border-border rounded-xl overflow-hidden">
                <AccordionItem value="q1" className="border-b border-border px-5">
                  <AccordionTrigger className="text-sm font-medium">What constitutes a good interest rate?</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">Interest rates fluctuate based on the economy and your personal credit score. Generally, a rate below the current national average is considered good.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="q2" className="border-b border-border px-5">
                  <AccordionTrigger className="text-sm font-medium">How does a down payment affect my loan?</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">A larger down payment reduces your loan principal, which means lower monthly payments and less interest paid over the life of the loan. Putting down at least 20% also helps you avoid private mortgage insurance (PMI).</AccordionContent>
                </AccordionItem>
                <AccordionItem value="q3" className="px-5">
                  <AccordionTrigger className="text-sm font-medium">Should I choose a 15 or 30 year mortgage?</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">A 15-year mortgage has higher monthly payments but you pay significantly less interest overall. A 30-year mortgage offers lower monthly payments but costs more in total interest.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <AdPlaceholder size="leaderboard" />
          </div>

          <aside className="hidden lg:block w-[300px] shrink-0 space-y-6">
            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                <span className="text-primary">≡</span> Related Calculators
              </h3>
              <ul className="space-y-1">
                {relatedCalculators.map((calc) => {
                  const Icon = getCategoryIcon(calc.icon);
                  return (
                    <li key={calc.slug}>
                      <Link to={`/${calc.category}/${calc.slug}`} className="flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-secondary transition-colors text-sm">
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
          </aside>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
