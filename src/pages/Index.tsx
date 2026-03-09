import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Home, Heart, Calculator, Hash, ChevronDown } from "lucide-react";
import { categories, getCategoryIcon, popularCalculators } from "@/data/calculators";
import { uniqueCalculators, getCategoryCalculatorCount } from "@/lib/calculator-utils";
import AdPlaceholder from "@/components/AdPlaceholder";
import SearchBar from "@/components/SearchBar";
import SEO from "@/components/SEO";
import HeroCalculator from "@/components/HeroCalculator";
import RecentlyUsed from "@/components/RecentlyUsed";
const totalCalcs = uniqueCalculators.length;

// Category cards with collapsible subcategories
const categoryCards = [
  {
    name: "Finance",
    slug: "finance",
    icon: "dollar",
    items: ["Mortgage & Loans", "Investment & Savings", "Tax & Salary", "Credit & Debt"],
  },
  {
    name: "Health & Fitness",
    slug: "health",
    icon: "heart",
    items: ["BMI & Body Composition", "Calories & Nutrition", "Heart Rate & Fitness", "Pregnancy & Growth"],
  },
  {
    name: "Math & Education",
    slug: "math",
    icon: "hash",
    items: ["Algebra & Equations", "Geometry & Trigonometry", "Statistics & Probability", "GPA & Grade"],
  },
  {
    name: "Unit Converters",
    slug: "conversions",
    icon: "convert",
    items: ["Length & Weight", "Temperature & Speed", "Energy & Pressure", "Currency & Data"],
  },
  {
    name: "Science",
    slug: "science",
    icon: "flask",
    items: ["Physics", "Chemistry", "Biology", "Astronomy", "Environmental Science", "Geology & Earth Science", "Thermodynamics", "Optics", "Fluid Mechanics", "Nuclear Physics"],
  },
  {
    name: "Lifestyle & Daily Life",
    slug: "lifestyle",
    icon: "smile",
    items: ["Time & Date", "Personal Life", "Relationships", "Home & Household", "Travel", "Food & Cooking", "Shopping", "Productivity", "Digital Life", "Transportation", "Events & Parties", "Health Lifestyle", "Pet Care", "Entertainment", "Personal Finance"],
  },
  {
    name: "Date & Time",
    slug: "datetime",
    icon: "calendar",
    items: ["Date Difference", "Date Addition & Subtraction", "Countdown", "Age & Life Duration", "Work & Business Time", "Time Duration", "Time Conversions", "Calendar Calculators", "Holidays & Events", "Time Zone Tools", "Scheduling & Planning", "Productivity Time", "Sleep & Lifestyle Time", "Travel Time", "Astronomy Time", "Miscellaneous Time"],
  },
];

const commonlyUsed = [
  { name: "Mortgage Calculator", slug: "mortgage-calculator", categorySlug: "finance", icon: Home },
  { name: "BMI Calculator", slug: "bmi-calculator", categorySlug: "health", icon: Heart },
  { name: "Age Calculator", slug: "age-calculator", categorySlug: "datetime", icon: Calculator },
  { name: "Scientific Notation", slug: "scientific-notation-calculator", categorySlug: "math", icon: Hash },
];

const trendingTools = [
  { name: "Mortgage Repayment Calculator", description: "Calculate monthly payments and total interest for your home loan.", slug: "mortgage-calculator", categorySlug: "finance" },
  { name: "Scientific Notation Solver", description: "Convert numbers to and from scientific notation instantly.", slug: "scientific-notation-calculator", categorySlug: "math" },
  { name: "Sales Tax & Tip Calculator", description: "Quickly calculate total costs including local taxes and gratuity.", slug: "sales-tax-calculator", categorySlug: "finance" },
  { name: "BMI Calculator", description: "Find your Body Mass Index and understand your weight category.", slug: "bmi-calculator", categorySlug: "health" },
  { name: "Percentage Calculator", description: "Calculate percentages, increases, decreases, and ratios.", slug: "percentage-calculator", categorySlug: "math" },
  { name: "Age Calculator", description: "Find your exact age in years, months, and days.", slug: "age-calculator", categorySlug: "datetime" },
];

const CategoryCard = ({ cat, index }: { cat: typeof categoryCards[0]; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const Icon = getCategoryIcon(cat.icon);
  const visibleItems = expanded ? cat.items : cat.items.slice(0, 3);
  const hasMore = cat.items.length > 3;

  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [expanded, cat.items]);

  const collapsedCount = 3;
  const collapsedHeight = collapsedCount * 32; // ~32px per item

  return (
    <div
      className="group bg-card rounded-2xl border border-border p-5 transition-all duration-300 ease-out hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-0.5"
    >
      <Link to={`/category/${cat.slug}`} className="block">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center group-hover:from-primary/25 group-hover:to-primary/10 transition-all duration-300">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm group-hover:text-primary transition-colors">{cat.name}</h3>
          </div>
          
            
          </span>
        </div>
      </Link>

      <div
        ref={contentRef}
        className="overflow-hidden transition-[height] duration-300 ease-in-out"
        style={{ height: expanded ? contentHeight : Math.min(collapsedHeight, contentHeight ?? collapsedHeight) }}
      >
        <ul className="space-y-1">
          {cat.items.map((item, i) => (
            <li
              key={item}
              className={`flex items-center gap-2.5 text-sm text-muted-foreground py-1 transition-opacity duration-300 ${
                !expanded && i >= collapsedCount ? "opacity-0" : "opacity-100"
              }`}
            >
              <span className="w-1.5 h-1.5 bg-primary/40 rounded-full shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {hasMore && (
        <button
          onClick={(e) => { e.preventDefault(); setExpanded(!expanded); }}
          className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-primary/70 hover:text-primary transition-colors"
        >
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
          {expanded ? "Show less" : `+${cat.items.length - 3} more`}
        </button>
      )}
    </div>
  );
};

const Index = () => {
  return (
    <div>
      <SEO
        title="Free Online Calculators — CalcHub"
        description={`Access ${totalCalcs}+ free online calculators for finance, health, math, science, and daily life. Fast, accurate, and mobile-friendly.`}
        canonical="/"
      />

      {/* Hero Section */}
      <section className="hero-section py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Left: Calculator */}
            <div className="w-full max-w-full lg:max-w-md mx-auto lg:mx-0">
              <HeroCalculator />
            </div>

            {/* Right: Search + commonly used */}
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-tight mb-3">
                  Search {totalCalcs.toLocaleString()}+ specialized calculators…
                </h1>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Fast, accurate, and free calculators for your finances, health, education, and daily needs.
                </p>
              </div>

              <div className="mt-6">
                <SearchBar large placeholder="Try 'Mortgage Payment' or 'BMI'..." />
              </div>

              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Commonly Used
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {commonlyUsed.map((calc) => (
                    <Link
                      key={calc.slug}
                      to={`/${calc.categorySlug}/${calc.slug}`}
                      className="flex items-center gap-2.5 px-3.5 py-2.5 bg-card border border-border rounded-lg hover:border-primary/30 hover:shadow-sm transition-all group"
                    >
                      <calc.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                      <span className="text-sm font-medium truncate">{calc.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recently Used */}
      <section className="container mx-auto px-4 py-6">
        <RecentlyUsed />
      </section>

      {/* Ad */}
      <section className="py-6">
        <AdPlaceholder size="leaderboard" />
      </section>

      {/* Explore Categories */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black underline underline-offset-8 decoration-primary decoration-4">Explore Categories</h2>
          <p className="text-sm text-muted-foreground mt-3">Browse our extensive library of calculation tools</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryCards.map((cat, i) => (
            <CategoryCard key={i} cat={cat} index={i} />
          ))}
        </div>
      </section>

      {/* Ad */}
      <section className="py-6">
        <AdPlaceholder size="leaderboard" />
      </section>

      {/* Trending Tools */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Trending Tools</h2>
            <p className="text-sm text-muted-foreground mt-1">Most visited calculators this week</p>
          </div>
          <Link to="/popular" className="text-sm font-semibold text-primary flex items-center gap-1 hover:underline">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingTools.map((tool) => (
            <div key={tool.slug} className="bg-card rounded-xl border border-border p-5 flex flex-col">
              <h3 className="font-bold text-sm mb-2">{tool.name}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">{tool.description}</p>
              <Link
                to={`/${tool.categorySlug}/${tool.slug}`}
                className="block w-full text-center py-2.5 bg-secondary text-foreground text-sm font-semibold rounded-lg hover:bg-secondary/80 transition-colors"
              >
                Calculate
              </Link>
            </div>
          ))}
          {/* Ad slot in trending */}
          <div className="hidden lg:flex bg-card rounded-xl border border-border items-center justify-center row-span-2">
            <AdPlaceholder size="rectangle" />
          </div>
        </div>
      </section>

      {/* Footer disclaimer text */}
      <section className="container mx-auto px-4 py-10 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">About CalcHub</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
            <p>
              CalcHub is your one-stop destination for fast, comprehensive, and completely free online calculators across a wide range of categories. With over {totalCalcs} tools spanning finance, health &amp; fitness, math, unit conversions, science, date &amp; time, and lifestyle — we help millions of users every month make quick, accurate calculations.
            </p>
            <p>
              Whether you're a student solving complex equations, a professional calculating mortgage rates, or someone tracking daily calorie intake — our tools are designed with precision and simplicity in mind. Each calculator is individually developed, rigorously tested, and optimized for all devices.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
