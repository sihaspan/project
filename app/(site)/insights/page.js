import PostList from "../components/PostList";
import { getInsights, getPosts } from "@/lib/content";

export const revalidate = 3600;

export async function generateMetadata() {
  const { seo } = await getInsights();
  return { title: seo.title, description: seo.description };
}

export default async function InsightsPage() {
  const [{ head, emptyMessage }, posts] = await Promise.all([getInsights(), getPosts("insight")]);
  return <PostList head={head} emptyMessage={emptyMessage} posts={posts} basePath="/insights" />;
}
