import { getPosts } from "@/lib/content";

const SITE_URL = "https://sihaspan.com"; // TODO: replace with the live production domain

export default async function sitemap() {
  const routes = ["", "/about", "/services", "/who-we-serve", "/blog", "/contact"];
  const posts = await getPosts();

  return [
    ...routes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: route === "" ? 1 : 0.7,
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.publishedDate),
      changeFrequency: "yearly",
      priority: 0.6,
    })),
  ];
}
