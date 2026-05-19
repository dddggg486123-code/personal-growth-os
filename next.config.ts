import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/personal-growth-os',
  images: { unoptimized: true },
};

export default nextConfig;
