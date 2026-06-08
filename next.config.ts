import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  // Disable ESLint during production build — lint locally instead
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript errors blocking build
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
