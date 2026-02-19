import { Link } from "react-router-dom";
import { ArrowUpRight, CheckCircle, Star } from "lucide-react";
import { categories, popularCalculators, getCategoryIcon } from "@/data/calculators";
import AdPlaceholder from "@/components/AdPlaceholder";
import SearchBar from "@/components/SearchBar";
import RecentlyUsed from "@/components/RecentlyUsed";

const Sidebar = () => (
  <aside className="hidden lg:block w-[300px] shrink-0 space-y-6">
    <AdPlaceholder size="rectangle" />

    <div className="bg-navy text-primary-foreground rounded-xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        <h3 className="font-bold text-sm">Why SmartCalc?</h3>
      </div>
      <p className="text-xs opacity-80 mb-4">
        We provide accurate, reliable, and free calculation tools for professionals and students alike. Trusted by financial advisors and educators worldwide.
      </p>
      <ul className="space-y-2 mb-4">
        {["100% Free & Open Access", "Mobile Optimized Tools", "Instant Results"].map((item) => (
          <li key={item} className="flex items-center gap-2 text-xs">
            <CheckCircle className="w-3.5 h-3.5 text-green-400" />
            {item}
          </li>
        ))}
      </ul>
      <Link
        to="/category/finance"
        className="block w-full text-center py-2 rounded-lg bg-destructive text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Browse All Tools
      </Link>
    </div>

    <RecentlyUsed />

    <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="font-bold text-sm mb-4">Latest Updates</h3>
      <ul className="space-y-4">
        {[
          { title: "How to calculate your Mortgage APR effectively", time: "2 days ago" },
          { title: "Understanding BMI vs. Body Fat Percentage", time: "5 days ago" },
          { title: "Top 10 Math Tricks for Students", time: "1 week ago" },
        ].map((item) => (
          <li key={item.title}>
            <p className="text-sm font-medium text-foreground leading-snug">{item.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
          </li>
        ))}
      </ul>
    </div>
  </aside>
);

const Index = () => {
  return (
    <div>
      <section className="hero-section py-16 md:py-24 text-center">
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-6">
            <CheckCircle className="w-3 h-3" />
            TRUSTED BY 2M+ USERS MONTHLY
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 max-w-2xl mx-auto">
            Free Online Calculators for Every Need
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Access over 100+ precision tools for finance, health, science, and daily life. Fast, free, and accurate.
          </p>
          <div className="max-w-lg mx-auto">
            <SearchBar large placeholder="What do you want to calculate today?" />
          </div>
        </div>
      </section>

      <section className="py-6">
        <AdPlaceholder size="leaderboard" />
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <div className="flex-1 min-w-0">
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Browse Categories</h2>
                <Link to="#" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                  View All <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((cat) => {
                  const Icon = getCategoryIcon(cat.icon);
                  return (
                    <Link
                      key={cat.slug}
                      to={`/category/${cat.slug}`}
                      className="card-elevated bg-card rounded-xl border border-border p-5 group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <h3 className="font-semibold text-sm mb-1">{cat.name}</h3>
                      <p className="text-xs text-muted-foreground mb-3">{cat.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.tags.map((tag) => (
                          <span key={tag} className="category-tag">{tag}</span>
                        ))}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Popular Calculators</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {popularCalculators.map((calc) => {
                  const Icon = getCategoryIcon(calc.icon);
                  return (
                    <Link
                      key={calc.slug}
                      to={`/${calc.categorySlug}/${calc.slug}`}
                      className="card-elevated bg-card rounded-xl border border-border p-4 flex items-center gap-3 group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{calc.shortName || calc.name}</p>
                        <p className="text-xs text-muted-foreground">{calc.category}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <Sidebar />
        </div>
      </section>
    </div>
  );
};

export default Index;
