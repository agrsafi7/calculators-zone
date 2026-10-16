import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calculator, CalendarDays, Clock3 } from "lucide-react";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogBody from "@/components/BlogBody";
import { blogPosts } from "@/data/blog-posts";

const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const idx = blogPosts.findIndex((p) => p.slug === slug);
  if (idx === -1) return <Navigate to="/blog" replace />;
  const post = blogPosts[idx];
  const prev = blogPosts[idx - 1];
  const next = blogPosts[idx + 1];

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "TheCalculator.us" },
    publisher: { "@type": "Organization", name: "TheCalculator.us" },
    mainEntityOfPage: `https://thecalculator.us/blog/${post.slug}`,
  };

  return (
    <div>
      <SEO
        title={post.title}
        description={post.description}
        canonical={`/blog/${post.slug}`}
        jsonLd={articleLd}
      />
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />
      <div className="container mx-auto px-4 py-10 max-w-[760px]">
        <span className="text-xs font-semibold text-primary uppercase tracking-wide">{post.category}</span>
        <h1 className="text-3xl md:text-4xl font-bold text-ink mt-2 mb-3 leading-tight">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-ink-soft mb-8">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="w-4 h-4" /> {formatDate(post.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="w-4 h-4" /> {post.readMinutes} min read
          </span>
        </div>

        <BlogBody sections={post.sections} />

        {/* Related calculators funnel */}
        <div className="mt-10 bg-primary/5 border border-primary/20 rounded-xl p-6">
          <h2 className="text-lg font-bold text-ink mb-1 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" /> Try the free calculator
          </h2>
          <p className="text-sm text-ink-soft mb-4">
            Reading is good — instant answers are better. Run the numbers yourself:
          </p>
          <div className="flex flex-wrap gap-3">
            {post.related.map((r) => (
              <Link
                key={r.path}
                to={r.path}
                className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-primary-dark transition-colors"
              >
                {r.name} <ArrowRight className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>

        {/* Prev / next */}
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          {prev ? (
            <Link
              to={`/blog/${prev.slug}`}
              className="group bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-colors"
            >
              <span className="text-xs text-ink-soft inline-flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Previous article
              </span>
              <p className="font-semibold text-ink text-sm mt-1 group-hover:text-primary transition-colors">
                {prev.title}
              </p>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              to={`/blog/${next.slug}`}
              className="group bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-colors text-right"
            >
              <span className="text-xs text-ink-soft inline-flex items-center gap-1">
                Next article <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <p className="font-semibold text-ink text-sm mt-1 group-hover:text-primary transition-colors">
                {next.title}
              </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
