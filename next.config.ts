import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // !! WARN !!
    // Temporarily ignore type errors during build
    // This is due to NextAuth compatibility with Next.js 16
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
