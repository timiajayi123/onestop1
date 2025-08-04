/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {},
    nextScriptWorkers: true,
  },
  images: {
    domains: ['cloud.appwrite.io', 'fra.cloud.appwrite.io'],
  },
};

module.exports = nextConfig;
