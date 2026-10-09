import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Use the Rust port instead of the Babel transform
    turbopackRustReactCompiler: true,
    agentUpgrade: 'latest',
    turbopackGc: true,
    turbopackLazyDynamicImports: true,
    turbopackPluginRuntimeStrategy: 'forceWorkerThreads',
    agentFeedback: true,
  },
};

export default nextConfig;
