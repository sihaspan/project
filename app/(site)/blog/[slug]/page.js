import Link from "next/link";
import { notFound } from "next/navigation";
import { DocumentRenderer } from "@keystatic/core/renderer";
import { getPost, getPosts, formatDate } from "@/lib/content";

export const revalidate = 3600;
// Posts published after the last build are rendered on first request.
export const dynamicParams = true;

const SITE_URL = "https://sihaspan.com"; // TODO: replace with the live production domain

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  if (!post) return {};
  const images = post.coverImage ? [post.coverImage] : undefined;
  return {
    title: `${post.title} — SihaSpan`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedDate,
      authors: post.author ? [post.author] : undefined,
      images,
    },
  };
}

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedDate,
    author: { "@type": "Person", name: post.author || "SihaSpan Team" },
    publisher: { "@type": "Organization", name: "SihaSpan" },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    ...(post.coverImage ? { image: `${SITE_URL}${post.coverImage}` } : {}),
  };

  return (
    <article>
      <section style={{ paddingBottom: "24px" }}>
        <div className="wrap post-wrap">
          <Link href="/blog" className="post-back">← All articles</Link>
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
            <Link href="/blog" className="btn-secondary">← More articles</Link>
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
