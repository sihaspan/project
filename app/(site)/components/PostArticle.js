import Link from "next/link";
import { DocumentRenderer } from "@keystatic/core/renderer";
import { formatDate } from "@/lib/content";

const SITE_URL = "https://sihaspan.com"; // TODO: replace with the live production domain

/** Article layout for /insights/[slug]. */
export default function PostArticle({ post, basePath, backLabel }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedDate,
    author: { "@type": "Person", name: post.author || "Healthcare et Omnia Team" },
    publisher: { "@type": "Organization", name: "Healthcare et Omnia" },
    mainEntityOfPage: `${SITE_URL}${basePath}/${post.slug}`,
    ...(post.coverImage ? { image: `${SITE_URL}${post.coverImage}` } : {}),
  };

  return (
    <article>
      <section style={{ paddingBottom: "24px" }}>
        <div className="wrap post-wrap">
          <Link href={basePath} className="post-back">← {backLabel}</Link>
          <header className="post-head">
            <div className="blog-meta">
              <time dateTime={post.publishedDate}>{formatDate(post.publishedDate)}</time>
              {post.author ? <span> · {post.author}</span> : null}
            </div>
            <h1>{post.title}</h1>
            <p className="page-lede">{post.excerpt}</p>
          </header>

          {post.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="post-cover" src={post.coverImage} alt={post.coverAlt || ""} />
          ) : null}

          <div className="post-body">
            <DocumentRenderer document={post.content} />
          </div>

          <div className="post-footer">
            <Link href={basePath} className="btn-secondary">← {backLabel}</Link>
            <Link href="/contact" className="btn-primary">Talk to us</Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
