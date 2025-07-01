import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: false, // Keep ESLint checking enabled
    dirs: ['app', 'components', 'lib'], // Only check these directories
  },
  typescript: {
    ignoreBuildErrors: false, // Keep TypeScript checking enabled
  },
};

export default nextConfig;
