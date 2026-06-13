/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prevents next/font from fetching Google Fonts at build time (hangs on restricted networks)
  optimizeFonts: true,
  images: {
    minimumCacheTTL: 2592000, // 30 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vyuhmlyqciamgxkepbcq.supabase.co",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Link",
            value: "</llms.txt>; rel=\"llms-txt\"",
          },
        ],
      },
    ];
  },
};
export default nextConfig;
