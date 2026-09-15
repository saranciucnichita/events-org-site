/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/backend/:path*', // if frontend uses /backend/...
        destination: 'http://localhost:3001/:path*', // query will redirect to NestJS
      },
    ];
  },
};

export default nextConfig;
