import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Home, Heart, Calculator, Hash, ChevronRight } from "lucide-react";
import { categories, getCategoryIcon, popularCalculators } from "@/data/calculators";
import { uniqueCalculators, getCategoryCalculatorCount } from "@/lib/calculator-utils";
import AdPlaceholder from "@/components/AdPlaceholder";
import SearchBar from "@/components/SearchBar";
import SEO from "@/components/SEO";
import HeroCalculator from "@/components/HeroCalculator";
import RecentlyUsed from "@/components/RecentlyUsed";
const totalCalcs = uniqueCalculators.length;

// Category cards with descriptions and subcategory items
const categoryCards = [
  {
    name: "Finance",
    slug: "finance",
    icon: "dollar",
    items: ["Mortgage Calculator", "Loan Repayment", "Investment Returns", "Tax Estimator", "Retirement Planner"],
    description: "Take control of your financial future with our comprehensive suite of finance calculators. Whether you're planning to buy your first home, comparing loan options, or mapping out your retirement strategy, our tools provide accurate, real-time calculations to help you make informed decisions. From mortgage payments and auto loan comparisons to compound interest projections and tax estimations, each calculator is designed with precision and simplicity. Our finance tools help individuals, families, and professionals navigate complex financial scenarios with confidence. Plan smarter, save more, and achieve your financial goals with CalcHub's trusted financial calculators.",
  },
  {
    name: "Health & Fitness",
    slug: "health",
    icon: "heart",
    items: ["BMI Calculator", "Calorie Counter", "Heart Rate Zones", "Body Fat Estimator", "Pregnancy Due Date"],
    description: "Your health journey starts with understanding your body. Our health and fitness calculators provide essential metrics to help you track progress, set realistic goals, and maintain a balanced lifestyle. Calculate your Body Mass Index (BMI) to understand your weight category, estimate daily calorie needs based on your activity level, or determine your ideal heart rate zones for effective workouts. Whether you're managing weight, planning a pregnancy, or optimizing athletic performance, our scientifically-backed tools deliver accurate results. Empower yourself with knowledge and take the guesswork out of health decisions with CalcHub's comprehensive health calculators.",
  },
  {
    name: "Math & Education",
    slug: "math",
    icon: "hash",
    items: ["Percentage Calculator", "Fraction Solver", "GPA Calculator", "Quadratic Equation", "Standard Deviation"],
    description: "Master mathematical concepts with our extensive collection of math and education calculators. From basic arithmetic to advanced algebra, our tools help students, teachers, and professionals solve problems quickly and accurately. Calculate percentages for discounts and tips, solve complex equations, convert fractions to decimals, or compute your GPA with ease. Our step-by-step approach helps you understand the underlying concepts while delivering instant results. Whether you're preparing for exams, checking homework, or solving real-world problems, CalcHub's math calculators are your reliable companion for academic and professional success.",
  },
  {
    name: "Unit Converters",
    slug: "conversions",
    icon: "convert",
    items: ["Length Converter", "Weight Converter", "Temperature Converter", "Speed Converter", "Data Storage Converter"],
    description: "Seamlessly convert between measurement units with our comprehensive unit conversion tools. Whether you're working with metric or imperial systems, our converters handle length, weight, temperature, volume, speed, and much more. Perfect for travelers comparing distances, chefs adjusting recipes, engineers calculating specifications, or students solving physics problems. Each converter supports multiple units and provides instant, accurate results. No more manual calculations or confusing conversion tables—simply enter your value and get results in any unit you need. CalcHub's unit converters make international measurements effortless and error-free.",
  },
  {
    name: "Science",
    slug: "science",
    icon: "flask",
    items: ["Force Calculator", "Ohm's Law", "pH Calculator", "Density Calculator", "Wavelength Converter"],
    description: "Explore the physical world with our powerful science calculators. Designed for students, researchers, and curious minds, our tools cover physics, chemistry, biology, astronomy, and environmental science. Calculate force, velocity, and acceleration for physics problems. Determine pH levels and molar concentrations for chemistry experiments. Explore wavelengths, frequencies, and energy conversions across the electromagnetic spectrum. Each calculator is built on established scientific formulas and provides accurate results for academic research, laboratory work, and practical applications. Unlock the mysteries of science with CalcHub's comprehensive scientific calculation tools.",
  },
  {
    name: "Lifestyle & Daily Life",
    slug: "lifestyle",
    icon: "smile",
    items: ["Tip Calculator", "Sleep Calculator", "Pet Age Converter", "Recipe Scaler", "Fuel Cost Calculator"],
    description: "Simplify everyday decisions with our practical lifestyle calculators. From splitting restaurant bills and calculating tips to planning road trips and scaling recipes, these tools make daily tasks effortless. Determine how much sleep you need for optimal health, convert your pet's age to human years, or estimate fuel costs for your next journey. Our lifestyle calculators are designed for real-world scenarios, helping you save time and make smarter choices in your daily routine. Whether at home, work, or on the go, CalcHub's lifestyle tools are your everyday problem-solving companions.",
  },
  {
    name: "Date & Time",
    slug: "datetime",
    icon: "calendar",
    items: ["Age Calculator", "Date Difference", "Countdown Timer", "Business Days Calculator", "Time Zone Converter"],
    description: "Master time-related calculations with our precise date and time tools. Calculate your exact age down to the day, find the difference between two dates, or count business days for project planning. Our countdown calculators help you track important events, while time zone converters ensure you never miss an international meeting. Perfect for event planners, project managers, travelers, and anyone who needs accurate time calculations. From historical date differences to future event countdowns, CalcHub's date and time calculators handle all your temporal needs with precision and ease.",
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

const CategoryCard = ({ cat }: { cat: typeof categoryCards[0] }) => {
  const Icon = getCategoryIcon(cat.icon);

  return (
    <Link
      to={`/category/${cat.slug}`}
      className="group bg-card rounded-2xl border border-border p-5 transition-all duration-300 ease-out hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-0.5 cursor-pointer block"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center group-hover:from-primary/25 group-hover:to-primary/10 transition-all duration-300">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm group-hover:text-primary transition-colors">{cat.name}</h3>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <ul className="space-y-1 mb-3">
        {cat.items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2.5 text-sm text-muted-foreground py-1"
          >
            <span className="w-1.5 h-1.5 bg-primary/40 rounded-full shrink-0" />
            {item}
          </li>
        ))}
      </ul>

      <p className="text-xs text-muted-foreground/80 line-clamp-2 leading-relaxed">
        {cat.description.slice(0, 120)}...
      </p>
    </Link>
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
            <CategoryCard key={i} cat={cat} />
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

      {/* Enhanced About Section */}
      <section className="container mx-auto px-4 py-10 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">About CalcHub — Your Trusted Calculator Resource</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
            <p>
              Welcome to <strong>CalcHub</strong>, your comprehensive destination for over {totalCalcs} free online calculators designed to simplify complex calculations across every aspect of life. Whether you're a student tackling algebra homework, a homeowner exploring mortgage options, or a fitness enthusiast tracking nutrition goals, our tools deliver fast, accurate results on any device.
            </p>
            
            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Popular Calculators You'll Love</h3>
            <p>
              Our most-used tools include the <Link to="/finance/mortgage-calculator" className="text-primary hover:underline font-medium">Mortgage Calculator</Link> for estimating monthly home payments and total interest costs, the <Link to="/health/bmi-calculator" className="text-primary hover:underline font-medium">BMI Calculator</Link> for understanding your body mass index and health category, and the <Link to="/math/percentage-calculator" className="text-primary hover:underline font-medium">Percentage Calculator</Link> for quick percentage computations in shopping, grades, or business.
            </p>
            <p>
              For students and educators, our <Link to="/math/scientific-notation-calculator" className="text-primary hover:underline font-medium">Scientific Notation Calculator</Link> handles large and small numbers with ease, while the <Link to="/math/gpa-calculator" className="text-primary hover:underline font-medium">GPA Calculator</Link> helps track academic performance across semesters. Need to know your exact age? Our <Link to="/datetime/age-calculator" className="text-primary hover:underline font-medium">Age Calculator</Link> computes years, months, and days with precision.
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Why Choose CalcHub?</h3>
            <p>
              Every calculator on CalcHub is individually crafted with accuracy and usability in mind. We combine intuitive interfaces with rigorous mathematical formulas to ensure you get reliable results every time. Our tools work seamlessly on desktops, tablets, and smartphones—no downloads or sign-ups required.
            </p>
            <p>
              From <Link to="/finance/salary-calculator" className="text-primary hover:underline font-medium">salary and tax calculations</Link> to <Link to="/conversions/length-converter" className="text-primary hover:underline font-medium">unit conversions</Link> and <Link to="/science/force-calculator" className="text-primary hover:underline font-medium">physics formulas</Link>, CalcHub empowers millions of users monthly to make informed decisions. Explore our categories, bookmark your favorites, and calculate with confidence.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
