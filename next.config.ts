import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_CDN77_PUBLIC_URL: process.env.NEXT_PUBLIC_CDN77_PUBLIC_URL,
  },
};

export default nextConfig;
