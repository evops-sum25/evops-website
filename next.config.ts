import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/", destination: "/events", permanent: true }];
  },
  eslint: { ignoreDuringBuilds: true },
  output: "standalone",
  env: { NEXT_PUBLIC_API: process.env.NEXT_PUBLIC_API },
};

export default nextConfig;
