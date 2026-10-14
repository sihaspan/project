/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Friendly URL for the client: /admin opens the CMS.
      { source: "/admin", destination: "/keystatic", permanent: false },
      { source: "/admin/:path*", destination: "/keystatic/:path*", permanent: false },
      // Retired pages: keep old links and bookmarks working.
      { source: "/blog", destination: "/insights", permanent: true },
      { source: "/blog/:slug", destination: "/insights/:slug", permanent: true },
      { source: "/who-we-serve", destination: "/services#who-we-serve", permanent: true },
    ];
  },
};

export default nextConfig;
