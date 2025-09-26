/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE || 'mock',
    NEXT_PUBLIC_FEATURE_FINANCING: process.env.NEXT_PUBLIC_FEATURE_FINANCING || 'true',
    NEXT_PUBLIC_FEATURE_OPS: process.env.NEXT_PUBLIC_FEATURE_OPS || 'true',
  },
  experimental: {
    serverComponentsExternalPackages: ['@react-pdf/renderer'],
  },
  webpack: (config) => {
    // Handle PDF generation
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
}

module.exports = nextConfig