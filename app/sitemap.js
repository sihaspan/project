const SITE_URL = "https://sihaspan.com"; // TODO: replace with the live production domain

export default function sitemap() {
  const routes = ["", "/about", "/services", "/who-we-serve", "/contact"];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
