import PostList from "../components/PostList";
import { getBlog, getPosts } from "@/lib/content";

export const revalidate = 3600;

export async function generateMetadata() {
  const { seo } = await getBlog();
  return { title: seo.title, description: seo.description };
}

export default async function BlogPage() {
  const [{ head, emptyMessage }, posts] = await Promise.all([getBlog(), getPosts("blog")]);
  return <PostList head={head} emptyMessage={emptyMessage} posts={posts} basePath="/blog" />;
}
