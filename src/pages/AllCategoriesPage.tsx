import { Link } from "react-router-dom";
import { getCategoryIcon } from "@/data/calculators";
import { getCategoryCalculatorCount } from "@/lib/calculator-utils";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";

const allCategories = [
  { name: "Finance", slug: "finance", icon: "dollar", desc: "Mortgage, loans, investments, taxes, and retirement planning." },
  { name: "Health & Fitness", slug: "health", icon: "heart", desc: "BMI, calories, heart rate, body fat, and nutrition tools." },
  { name: "Math", slug: "math", icon: "hash", desc: "Algebra, geometry, fractions, matrices, and number theory." },
  { name: "Unit Converters", slug: "conversions", icon: "convert", desc: "Length, weight, temperature, energy, and 100+ unit conversions." },
  { name: "Science", slug: "science", icon: "flask", desc: "Physics, chemistry, astronomy, and thermodynamics calculators." },
  { name: "Date & Time", slug: "datetime", icon: "calendar", desc: "Age, date difference, time zones, and countdown tools." },
  { name: "Lifestyle", slug: "lifestyle", icon: "smile", desc: "Cooking, construction, automotive, and daily life tools." },
];

const AllCategoriesPage = () => {
  return (
    <div>
      <SEO title="All Calculator Categories — CalcHub" description="Browse all calculator categories including finance, health, math, science, unit converters, and more." canonical="/categories" />
      <Breadcrumbs items={[{ label: "All Categories" }]} />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">All Calculator Categories</h1>
        <p className="text-muted-foreground mb-8">Browse our complete collection organized by category.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {allCategories.map((cat) => {
            const Icon = getCategoryIcon(cat.icon);
            const count = getCategoryCalculatorCount(cat.slug);
            return (
              <Link key={cat.slug} to={`/category/${cat.slug}`} className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-foreground rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-background" />
                  </div>
                  <div>
                    <h2 className="font-bold">{cat.name}</h2>
                    <span className="text-xs text-muted-foreground">{count} calculators</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{cat.desc}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllCategoriesPage;
