/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Friendly URL for the client: /admin opens the CMS.
      { source: "/admin", destination: "/keystatic", permanent: false },
      { source: "/admin/:path*", destination: "/keystatic/:path*", permanent: false },
    ];
  },
};

export default nextConfig;
