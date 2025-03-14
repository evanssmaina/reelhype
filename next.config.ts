import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    loader: 'custom',
    loaderFile: './src/config/image-loader.ts',
  },
  experimental: {
    dynamicIO: true,
    ppr: true,
    cacheLife: {
      tmdbDaily: {
        stale: 60 * 60, // 1 hour
        revalidate: 60 * 60 * 24, // 24 hours
        expire: 60 * 60 * 24 * 2, // 48 hours
      },
    },
    optimizePackageImports: ['@vidstack/react', '@nextui-org/react'],
  },
};

export default nextConfig;
