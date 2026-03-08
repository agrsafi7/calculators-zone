import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";

const trendingTools = [
  { name: "Mortgage Repayment Calculator", description: "Calculate monthly payments and total interest for your home loan.", slug: "mortgage-calculator", categorySlug: "finance" },
  { name: "BMI Calculator", description: "Find your Body Mass Index and understand your weight category.", slug: "bmi-calculator", categorySlug: "health" },
  { name: "Scientific Notation Solver", description: "Convert numbers to and from scientific notation instantly.", slug: "scientific-notation-calculator", categorySlug: "math" },
  { name: "Sales Tax & Tip Calculator", description: "Quickly calculate total costs including local taxes and gratuity.", slug: "sales-tax-calculator", categorySlug: "finance" },
  { name: "Percentage Calculator", description: "Calculate percentages, increases, decreases, and ratios.", slug: "percentage-calculator", categorySlug: "math" },
  { name: "Age Calculator", description: "Find your exact age in years, months, and days.", slug: "age-calculator", categorySlug: "datetime" },
  { name: "Calorie Calculator", description: "Estimate your daily caloric needs based on activity level.", slug: "calorie-calculator", categorySlug: "health" },
  { name: "Compound Interest Calculator", description: "See how your investments grow over time with compound interest.", slug: "compound-interest-calculator", categorySlug: "finance" },
  { name: "Temperature Converter", description: "Convert between Celsius, Fahrenheit, and Kelvin instantly.", slug: "temperature-converter", categorySlug: "conversions" },
  { name: "Loan EMI Calculator", description: "Calculate equated monthly installments for any loan.", slug: "loan-calculator", categorySlug: "finance" },
  { name: "GPA Calculator", description: "Calculate your Grade Point Average from course grades.", slug: "gpa-calculator", categorySlug: "math" },
  { name: "Body Fat Calculator", description: "Estimate your body fat percentage using simple measurements.", slug: "body-fat-calculator", categorySlug: "health" },
];

const PopularToolsPage = () => {
  return (
    <div>
      <SEO title="Popular & Trending Calculators — CalcHub" description="Discover the most popular and trending calculators used by millions. From mortgage to BMI, find the tools everyone loves." canonical="/popular" />
      <Breadcrumbs items={[{ label: "Popular Tools" }]} />
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-7 h-7 text-primary" />
          <h1 className="text-3xl font-bold">Popular & Trending Tools</h1>
        </div>
        <p className="text-muted-foreground mb-8">The most visited calculators this week.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingTools.map((tool, i) => (
            <div key={tool.slug} className="bg-card rounded-xl border border-border p-5 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-muted-foreground">#{i + 1}</span>
                <h2 className="font-bold text-sm">{tool.name}</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4 flex-1">{tool.description}</p>
              <Link to={`/${tool.categorySlug}/${tool.slug}`} className="block w-full text-center py-2.5 bg-secondary text-foreground text-sm font-semibold rounded-lg hover:bg-secondary/80 transition-colors">
                Calculate
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularToolsPage;
