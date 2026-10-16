import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Clock3, BookOpen } from "lucide-react";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getPublishedPosts } from "@/data/blog-posts";

const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

const BlogIndex = () => {
  return (
    <div>
      <SEO
        title="Blog — Guides & Explainers"
        description="In-depth guides and plain-English explainers from TheCalculator.us: roman numerals, statistics, weight-loss math, unit conversions, and more."
        canonical="/blog"
      />
      <Breadcrumbs items={[{ label: "Blog" }]} />
      <div className="container mx-auto px-4 py-10 max-w-[1100px]">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-ink">The Blog</h1>
        </div>
        <p className="text-ink-soft mb-8 max-w-2xl">
          Plain-English guides behind the numbers — written from the questions people actually search for. Every
          article links to the free calculator that does the math for you.
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          {getPublishedPosts().map((p) => (
            <Link
              key={p.slug}
              to={`/blog/${p.slug}`}
              className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-md transition-all flex flex-col"
            >
              <span className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">{p.category}</span>
              <h2 className="text-lg font-bold text-ink group-hover:text-primary transition-colors mb-2 leading-snug">
                {p.title}
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed mb-4 flex-1">{p.description}</p>
              <div className="flex items-center justify-between text-xs text-ink-soft">
                <span className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="w-3.5 h-3.5" /> {formatDate(p.date)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="w-3.5 h-3.5" /> {p.readMinutes} min read
                  </span>
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-primary">
                  Read <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogIndex;
