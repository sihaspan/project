import { notFound } from "next/navigation";
import PostArticle from "../../components/PostArticle";
import { getPost, getPosts } from "@/lib/content";

export const revalidate = 3600;
// Posts published after the last build are rendered on first request.
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — Healthcare et Omnia`,
    description: post.excerpt,
    alternates: { canonical: `/insights/${post.slug}` },
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

export default async function InsightsPostPage({ params }) {
  const post = await getPost(params.slug);
  if (!post) notFound();
  return <PostArticle post={post} basePath="/insights" backLabel="All insights" />;
}
