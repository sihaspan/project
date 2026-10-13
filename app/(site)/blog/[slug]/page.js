import { notFound } from "next/navigation";
import PostArticle from "../../components/PostArticle";
import { getPost, getPosts } from "@/lib/content";

export const revalidate = 3600;
// Posts published after the last build are rendered on first request.
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getPosts("blog");
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug, "blog");
  if (!post) return {};
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
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const post = await getPost(params.slug, "blog");
  if (!post) notFound();
  return <PostArticle post={post} basePath="/blog" backLabel="All posts" />;
}
