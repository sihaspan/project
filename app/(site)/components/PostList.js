import Link from "next/link";
import Icon from "./Icons";
import Reveal from "./Reveal";
import { formatDate } from "@/lib/content";

/**
 * Insights page: heading, one column per practice area (same layout as the
 * home page's "five areas of practice"), then any articles without an area.
 */
export default function PostList({ head, emptyMessage, posts, areas, basePath }) {
  // Articles store the area's icon key as their topic.
  const byArea = areas.map((area) => ({
    ...area,
    posts: posts.filter((p) => p.topic === area.icon),
  }));
  const grouped = new Set(byArea.flatMap((a) => a.posts.map((p) => p.slug)));
  const others = posts.filter((p) => !grouped.has(p.slug));

  return (
    <section style={{ paddingBottom: "24px" }}>
      <div className="wrap">
        <Reveal as="div" className="page-head">
          <div className="kicker">{head.kicker}</div>
          <h1>{head.heading}</h1>
          <p className="page-lede">{head.lede}</p>
        </Reveal>

        <ul className="service-cols topic-cols">
          {byArea.map((area, i) => (
            <Reveal key={area.title} as="li" className="svc topic" delay={i * 60}>
              <Icon name={area.icon} size={60} className="svc-icon" />
              <h2>{area.title}</h2>
              <p className="topic-count">
                {area.posts.length === 0
                  ? "No articles yet"
                  : `${area.posts.length} ${area.posts.length === 1 ? "article" : "articles"}`}
              </p>
              {area.posts.length > 0 ? (
                <ul className="topic-posts">
                  {area.posts.map((post) => (
                    <li key={post.slug}>
                      <Link href={`${basePath}/${post.slug}`}>
                        <time dateTime={post.publishedDate}>{formatDate(post.publishedDate)}</time>
                        <span>{post.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </Reveal>
          ))}
        </ul>

        {posts.length === 0 ? <p className="blog-empty">{emptyMessage}</p> : null}

        {others.length > 0 ? (
          <>
            <h2 className="topic-more-heading">
              {grouped.size > 0 ? "More insights" : "Latest insights"}
            </h2>
            <div className="blog-grid">
              {others.map((post, i) => (
                <Reveal key={post.slug} as="div" delay={(i % 3) * 70}>
                  <Link href={`${basePath}/${post.slug}`} className="blog-card">
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
                      <h3>{post.title}</h3>
                      <p>{post.excerpt}</p>
                      <span className="blog-more">Read article →</span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
