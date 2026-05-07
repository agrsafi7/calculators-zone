import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Home, Heart, Calculator, Hash, ChevronRight, Search, Percent, Receipt } from "lucide-react";
import { categories, getCategoryIcon } from "@/data/calculators";
import AdPlaceholder from "@/components/AdPlaceholder";
import SearchBar from "@/components/SearchBar";
import SEO from "@/components/SEO";
import { GradientCard } from "@/components/ui/gradient-card";
import CategoryRowList from "@/components/CategoryRowList";
import { getCategoryCalculatorCount } from "@/lib/calculator-utils";
const HeroCalculator = lazy(() => import("@/components/HeroCalculator"));
const totalCalcs = 1093;

// Category cards with descriptions and subcategory items
const categoryCards = [
  {
    name: "Finance",
    slug: "finance",
    icon: "dollar",
    items: ["Mortgage Calculator", "Loan Repayment", "Investment Returns", "Tax Estimator", "Retirement Planner"],
    description: "Take control of your financial future with our comprehensive suite of finance calculators. Whether you're planning to buy your first home, comparing loan options, or mapping out your retirement strategy, our tools provide accurate, real-time calculations to help you make informed decisions.",
  },
  {
    name: "Health & Fitness",
    slug: "health",
    icon: "heart",
    items: ["BMI Calculator", "Calorie Counter", "Heart Rate Zones", "Body Fat Estimator", "Pregnancy Due Date"],
    description: "Your health journey starts with understanding your body. Our health and fitness calculators provide essential metrics to help you track progress, set realistic goals, and maintain a balanced lifestyle.",
  },
  {
    name: "Math & Education",
    slug: "math",
    icon: "hash",
    items: ["Percentage Calculator", "Fraction Solver", "GPA Calculator", "Quadratic Equation", "Standard Deviation"],
    description: "Master mathematical concepts with our extensive collection of math and education calculators. From basic arithmetic to advanced algebra, our tools help students, teachers, and professionals solve problems quickly and accurately.",
  },
  {
    name: "Unit Converters",
    slug: "conversions",
    icon: "convert",
    items: ["Length Converter", "Weight Converter", "Temperature Converter", "Speed Converter", "Data Storage Converter"],
    description: "Seamlessly convert between measurement units with our comprehensive unit conversion tools. Whether you're working with metric or imperial systems, our converters handle length, weight, temperature, volume, speed, and much more.",
  },
  {
    name: "Science",
    slug: "science",
    icon: "flask",
    items: ["Force Calculator", "Ohm's Law", "pH Calculator", "Density Calculator", "Wavelength Converter"],
    description: "Explore the physical world with our powerful science calculators. Designed for students, researchers, and curious minds, our tools cover physics, chemistry, biology, astronomy, and environmental science.",
  },
  {
    name: "Lifestyle & Daily Life",
    slug: "lifestyle",
    icon: "smile",
    items: ["Tip Calculator", "Sleep Calculator", "Pet Age Converter", "Recipe Scaler", "Fuel Cost Calculator"],
    description: "Simplify everyday decisions with our practical lifestyle calculators. From splitting restaurant bills and calculating tips to planning road trips and scaling recipes, these tools make daily tasks effortless.",
  },
  {
    name: "Date & Time",
    slug: "datetime",
    icon: "calendar",
    items: ["Age Calculator", "Date Difference", "Countdown Timer", "Business Days Calculator", "Time Zone Converter"],
    description: "Master time-related calculations with our precise date and time tools. Calculate your exact age down to the day, find the difference between two dates, or count business days for project planning.",
  },
  {
    name: "Other Calculators",
    slug: "other",
    icon: "layers",
    items: ["Fuel Cost Calculator", "Property Tax", "Concrete Calculator", "Paint Calculator", "Solar Panel Calculator"],
    description: "Browse 100+ specialized calculators covering automotive, real estate, cooking, DIY home projects, weather, crafts, number theory, and much more.",
  },
];

const commonlyUsed = [
  { name: "Mortgage Calculator", slug: "mortgage-calculator", categorySlug: "finance", icon: Home },
  { name: "BMI Calculator", slug: "bmi-calculator", categorySlug: "health", icon: Heart },
  { name: "Age Calculator", slug: "age-calculator", categorySlug: "datetime", icon: Calculator },
  { name: "Percentage Calculator", slug: "percentage-calculator", categorySlug: "math", icon: Hash },
  { name: "Tip Calculator", slug: "tip-calculator", categorySlug: "finance", icon: Calculator },
  { name: "Loan Calculator", slug: "loan-calculator", categorySlug: "finance", icon: Home },
  { name: "GPA Calculator", slug: "gpa-calculator", categorySlug: "math", icon: Hash },
  { name: "Calorie Calculator", slug: "calorie-calculator", categorySlug: "health", icon: Heart },
];

const trendingTools = [
  { name: "Mortgage Repayment Calculator", description: "Calculate monthly payments and total interest for your home loan.", slug: "mortgage-calculator", categorySlug: "finance" },
  { name: "Scientific Notation Solver", description: "Convert numbers to and from scientific notation instantly.", slug: "scientific-notation-calculator", categorySlug: "math" },
  { name: "Sales Tax & Tip Calculator", description: "Quickly calculate total costs including local taxes and gratuity.", slug: "sales-tax-calculator", categorySlug: "finance" },
  { name: "BMI Calculator", description: "Find your Body Mass Index and understand your weight category.", slug: "bmi-calculator", categorySlug: "health" },
  { name: "Percentage Calculator", description: "Calculate percentages, increases, decreases, and ratios.", slug: "percentage-calculator", categorySlug: "math" },
  { name: "Age Calculator", description: "Find your exact age in years, months, and days.", slug: "age-calculator", categorySlug: "datetime" },
];

const CategoryCard = ({ cat }: { cat: typeof categoryCards[0] }) => {
  const Icon = getCategoryIcon(cat.icon);

  return (
    <Link to={`/category/${cat.slug}`} className="group block btn-press" aria-label={`Browse ${cat.name} calculators`}>
      <GradientCard variant="light" className="p-4 h-full">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/15 group-hover:bg-primary/15 transition-all">
            <Icon className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm text-foreground">{cat.name}</h3>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
        </div>

        <ul className="space-y-0.5 mb-2">
          {cat.items.slice(0, 4).map((item) => (
            <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground py-0.5">
              <span className="w-1 h-1 bg-primary/60 rounded-full shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        <p className="text-[11px] text-muted-foreground/80 line-clamp-2 leading-relaxed hidden sm:block">
          {cat.description.slice(0, 100)}...
        </p>
      </GradientCard>
    </Link>
  );
};

const Index = () => {
  return (
    <div>
      <SEO
        title="Free Online Calculators — TheCalculator.us"
        description={`Access ${totalCalcs}+ free online calculators for finance, health, math, science, and daily life. Fast, accurate, and mobile-friendly tools trusted in the US, UK, Canada, and Australia.`}
        canonical="/"
        keywords="online calculator, free calculator, mortgage calculator, BMI calculator, percentage calculator, age calculator, unit converter, GPA calculator, calorie calculator, loan calculator, tip calculator, scientific calculator, math calculator, finance calculator, health calculator"
      />

      {/* Hero Section — two-column with calculator + headline */}
      <section className="hero-section py-8 md:py-16 animate-stagger-1">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
            {/* Left: Calculator */}
            <div className="order-2 lg:order-1">
              <Suspense
                fallback={
                  <div
                    className="bg-card rounded-2xl shadow-lg border border-border p-5 w-full animate-pulse"
                    role="status"
                    aria-label="Loading calculator"
                  >
                    <div className="h-16 rounded-lg bg-muted mb-4" />
                    <div className="grid grid-cols-5 gap-2 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-9 rounded bg-muted" />
                      ))}
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="h-11 rounded bg-muted" />
                      ))}
                    </div>
                  </div>
                }
              >
                <HeroCalculator />
              </Suspense>
            </div>

            {/* Right: Headline + Search + Quick Access */}
            <div className="order-1 lg:order-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 leading-[1.05]">
                Precision Tools for Every Calculation.
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-xl">
                Fast, accurate, and easy-to-use calculators for math, finance, and science.
              </p>

              <div className="max-w-xl">
                <SearchBar large placeholder="Search for a calculator..." />
              </div>

              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Quick Access
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "BMI", slug: "bmi-calculator", categorySlug: "health", icon: Heart },
                    { name: "Tip", slug: "tip-calculator", categorySlug: "finance", icon: Receipt },
                    { name: "Percentage", slug: "percentage-calculator", categorySlug: "math", icon: Percent },
                  ].map((calc) => (
                    <Link
                      key={calc.slug}
                      to={`/${calc.categorySlug}/${calc.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full hover:border-primary/40 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 group text-sm font-medium btn-press"
                    >
                      <calc.icon className="w-4 h-4 text-primary" />
                      <span>{calc.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Ad */}
      <section className="py-6">
        <AdPlaceholder size="leaderboard" />
      </section>

      {/* Browse Categories */}
      <section className="container mx-auto px-4 py-10 animate-stagger-3">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">Browse Categories</h2>
          <p className="text-sm text-muted-foreground mt-3">Browse our extensive library of calculation tools</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {categoryCards.map((cat, i) => (
            <CategoryCard key={i} cat={cat} />
          ))}
        </div>
      </section>

      {/* Ad */}
      <section className="py-6">
        <AdPlaceholder size="leaderboard" />
      </section>

      {/* Trending Now */}
      <section className="container mx-auto px-4 py-8 animate-stagger-4">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Trending Now</h2>
            <p className="text-sm text-muted-foreground mt-1">Most visited calculators this week</p>
          </div>
          <Link to="/popular" className="text-sm font-semibold text-primary flex items-center gap-1 hover:underline">
            View all trending calculators <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingTools.map((tool) => (
            <GradientCard key={tool.slug} variant="light" className="p-5 min-h-[200px]">
              <div className="flex flex-col h-full">
                <h3 className="font-bold text-base text-foreground mb-2">{tool.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{tool.description}</p>
                <Link
                  to={`/${tool.categorySlug}/${tool.slug}`}
                  aria-label={`Open ${tool.name}`}
                  className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 bg-primary/10 border border-primary/20 text-primary text-sm font-semibold rounded-lg hover:bg-primary/15 transition-colors"
                >
                  Open {tool.name}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </GradientCard>
          ))}
          <div className="hidden lg:flex bg-card rounded-xl border border-border items-center justify-center row-span-2">
            <AdPlaceholder size="rectangle" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-10 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">About TheCalculator.us — Your Trusted Calculator Resource</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
            <p>
              Welcome to <strong>TheCalculator.us</strong>, your comprehensive destination for over {totalCalcs} free online calculators designed to simplify complex calculations across every aspect of life.
            </p>
            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Popular Calculators You'll Love</h3>
            <p>
              Our most-used tools include the <Link to="/finance/mortgage-calculator" className="text-primary hover:underline font-medium">Mortgage Calculator</Link>, the <Link to="/health/bmi-calculator" className="text-primary hover:underline font-medium">BMI Calculator</Link>, and the <Link to="/math/percentage-calculator" className="text-primary hover:underline font-medium">Percentage Calculator</Link>.
            </p>
            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Why Choose TheCalculator.us?</h3>
            <p>
              Every calculator is individually crafted with accuracy and usability in mind. Our tools work seamlessly on desktops, tablets, and smartphones—no downloads or sign-ups required.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
