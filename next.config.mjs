/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Friendly URL for the client: /admin opens the CMS.
      { source: "/admin", destination: "/keystatic", permanent: false },
      { source: "/admin/:path*", destination: "/keystatic/:path*", permanent: false },
      // Retired pages: "Who we serve" lives on Services; "Blog" was merged into Insights.
      { source: "/who-we-serve", destination: "/services#who-we-serve", permanent: true },
      { source: "/blog", destination: "/insights", permanent: true },
      { source: "/blog/:slug", destination: "/insights/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
