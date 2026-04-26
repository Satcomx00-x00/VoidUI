import type { NextConfig } from "next";

/**
 * GitHub Pages serves the site under `https://<user>.github.io/<repo>/`.
 * When building for Pages we set the basePath/assetPrefix and switch Next.js
 * to static export. Locally (`npm run dev`) these are no-ops.
 */
const isPages = process.env.GITHUB_PAGES === "true";
const repoBasePath = isPages ? "/VoidUI" : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: isPages ? "export" : undefined,
  basePath: repoBasePath,
  assetPrefix: repoBasePath || undefined,
  images: { unoptimized: isPages },
  trailingSlash: isPages,
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
