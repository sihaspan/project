import Link from "next/link";
import Icon from "./Icons";
import Reveal from "./Reveal";

/**
 * Insights page: heading, then every article laid out like the home page's
 * "five areas of practice": icon, heading, content and an arrow.
 */
export default function PostList({ head, emptyMessage, posts, basePath }) {
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
          <ul className="service-cols insight-cols">
            {posts.map((post, i) => (
              <Reveal key={post.slug} as="li" className="svc" delay={(i % 5) * 60}>
                <Icon name={post.icon || "advisory"} size={60} className="svc-icon" />
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <Link
                  href={`${basePath}/${post.slug}`}
                  className="svc-link"
                  aria-label={`Read ${post.title}`}
                >
                  <Icon name="arrow" size={24} strokeWidth={1.6} />
                </Link>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
