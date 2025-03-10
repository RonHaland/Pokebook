import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      hostname: 'raw.githubusercontent.com'
    }]
  },
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
