import { Link } from "react-router-dom";
import { getCategoryIcon, popularCalculators } from "@/data/calculators";
import { getCategoryCalculatorCount, uniqueCalculators } from "@/lib/calculator-utils";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Flame } from "lucide-react";
import RecentlyUsed from "@/components/RecentlyUsed";

const allCategories = [
  { name: "Finance", slug: "finance", icon: "dollar", desc: "Mortgage, loans, investments, taxes, and retirement planning." },
  { name: "Health & Fitness", slug: "health", icon: "heart", desc: "BMI, calories, heart rate, body fat, and nutrition tools." },
  { name: "Math", slug: "math", icon: "hash", desc: "Algebra, geometry, fractions, matrices, and number theory." },
  { name: "Unit Converters", slug: "conversions", icon: "convert", desc: "Length, weight, temperature, energy, and 100+ unit conversions." },
  { name: "Science", slug: "science", icon: "flask", desc: "Physics, chemistry, astronomy, and thermodynamics calculators." },
  { name: "Date & Time", slug: "datetime", icon: "calendar", desc: "Age, date difference, time zones, and countdown tools." },
  { name: "Lifestyle", slug: "lifestyle", icon: "smile", desc: "Cooking, construction, automotive, and daily life tools." },
];

const getFeaturedCalculators = (categorySlug: string) => {
  return uniqueCalculators
    .filter((c) => c.categorySlug === categorySlug)
    .slice(0, 4);
};

const AllCategoriesPage = () => {
  return (
    <div>
      <SEO title="All Calculator Categories — CalcHub" description="Browse all calculator categories including finance, health, math, science, unit converters, and more." canonical="/categories" />
      <Breadcrumbs items={[{ label: "All Categories" }]} />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">All Calculator Categories</h1>
        <p className="text-muted-foreground mb-8">Browse our complete collection organized by category.</p>

        {/* Recently Used */}
        <div className="mb-8">
          <RecentlyUsed />
        </div>

        <div className="space-y-8">
          {allCategories.map((cat) => {
            const Icon = getCategoryIcon(cat.icon);
            const count = getCategoryCalculatorCount(cat.slug);
            const featured = getFeaturedCalculators(cat.slug);
            return (
              <div key={cat.slug} className="bg-card border border-border rounded-xl p-6">
                <Link to={`/category/${cat.slug}`} className="flex items-center gap-3 mb-2 group">
                  <div className="w-10 h-10 bg-foreground rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-background" />
                  </div>
                  <div>
                    <h2 className="font-bold group-hover:text-primary transition-colors">{cat.name}</h2>
                    <span className="text-xs text-muted-foreground">{count} calculators</span>
                  </div>
                </Link>
                <p className="text-sm text-muted-foreground mb-4">{cat.desc}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {featured.map((calc) => (
                    <Link
                      key={calc.slug}
                      to={`/${calc.categorySlug}/${calc.slug}`}
                      className="text-sm px-3 py-2 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors truncate"
                    >
                      {calc.name}
                    </Link>
                  ))}
                </div>
                <Link to={`/category/${cat.slug}`} className="inline-block mt-3 text-xs font-semibold text-primary hover:underline">
                  View all {count} calculators →
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllCategoriesPage;
