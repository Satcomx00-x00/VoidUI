import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/VoidUI",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
