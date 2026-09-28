const SITE_URL = "https://sihaspan.com"; // TODO: replace with the live production domain

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/keystatic", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
