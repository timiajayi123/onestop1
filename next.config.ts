import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {},
    nextScriptWorkers: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fra.cloud.appwrite.io',
        pathname: '/v1/storage/buckets/**/files/**/view',
      },
      {
        protocol: 'https',
        hostname: 'fra.cloud.appwrite.io',
        pathname: '/v1/storage/buckets/**/files/**/preview',
      },
      {
        protocol: 'https',
        hostname: 'cloud.appwrite.io',
        pathname: '/v1/storage/buckets/**/files/**/preview',
      },
    ],
  },
};

export default nextConfig;
