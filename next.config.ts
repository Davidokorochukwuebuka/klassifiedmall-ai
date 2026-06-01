import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bucket-1212rex4i4.s3.us-east-1.amazonaws.com',
        pathname: '/wp-content/klassifiedmall/**',
      },
    ],
  },
};

export default nextConfig;
