import type { NextConfig } from "next";

// Substack moves from www.oakheartlab.com to this subdomain at cutover
// (docs/cutover-checklist.md items 1 and 10). These keep indexed post URLs,
// the RSS feed and Substack's own pages working.
const substack = "https://blog.oakheartlab.com";

const substackPaths = [
  "/p/:path*",
  "/about",
  "/archive",
  "/feed",
  "/subscribe",
  "/podcast",
  "/notes",
  "/s/:path*",
  "/t/:path*",
];

const nextConfig: NextConfig = {
  async redirects() {
    return substackPaths.map((source) => ({
      source,
      destination: `${substack}${source}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
