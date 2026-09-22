import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  cacheComponents: true,
  experimental: {
    // Use the Rust port instead of the Babel transform
    turbopackRustReactCompiler: true,
  },
};

export default nextConfig;
