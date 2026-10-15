import PostList from "../components/PostList";
import { getInsights, getPosts, getServices } from "@/lib/content";

export const revalidate = 3600;

export async function generateMetadata() {
  const { seo } = await getInsights();
  return { title: seo.title, description: seo.description };
}

export default async function InsightsPage() {
  const [{ head, emptyMessage }, posts, services] = await Promise.all([
    getInsights(),
    getPosts(),
    getServices(),
  ]);
  const areas = services.items.map(({ icon, title }) => ({ icon, title }));
  return (
    <PostList
      head={head}
      emptyMessage={emptyMessage}
      posts={posts}
      areas={areas}
      basePath="/insights"
    />
  );
}
