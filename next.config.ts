import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/free-templates',
        destination: '/templates',
        permanent: true,
      },
      {
        source: '/tools/wedding-budget-calculator/index.html',
        destination: '/tools/wedding-budget-calculator/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
