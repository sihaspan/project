import Link from "next/link";
import Reveal from "../components/Reveal";
import { getBlog, getPosts, formatDate } from "@/lib/content";

export const revalidate = 3600;

export async function generateMetadata() {
  const { seo } = await getBlog();
  return { title: seo.title, description: seo.description };
}

export default async function BlogPage() {
  const [{ head, emptyMessage }, posts] = await Promise.all([getBlog(), getPosts()]);

  return (
    <section style={{ paddingBottom: "24px" }}>
      <div className="wrap">
        <Reveal as="div" className="page-head">
          <div className="kicker">{head.kicker}</div>
          <h1>{head.heading}</h1>
          <p className="page-lede">{head.lede}</p>
        </Reveal>

        {posts.length === 0 ? (
          <p className="blog-empty">{emptyMessage}</p>
        ) : (
          <div className="blog-grid">
            {posts.map((post, i) => (
              <Reveal key={post.slug} as="div" delay={(i % 3) * 70}>
                <Link href={`/blog/${post.slug}`} className="blog-card">
                  {post.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="blog-card-img" src={post.coverImage} alt={post.coverAlt || ""} />
                  ) : (
                    <div className="blog-card-img blog-card-img--empty" aria-hidden="true" />
                  )}
                  <div className="blog-card-body">
                    <div className="blog-meta">
                      <time dateTime={post.publishedDate}>{formatDate(post.publishedDate)}</time>
                    </div>
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                    <span className="blog-more">Read article →</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
