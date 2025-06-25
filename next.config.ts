import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/", destination: "/events", permanent: true }];
  },
  eslint: { ignoreDuringBuilds: true },
  output: "standalone",
};

export default nextConfig;
