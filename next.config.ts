import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
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
        destination: '/tools/wedding-budget-calculator',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
