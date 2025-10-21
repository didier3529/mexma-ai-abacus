/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: { 
    unoptimized: true,
    domains: ['assets.coingecko.com', 'img.solana.fm', 'raw.githubusercontent.com']
  },
  // Ensure proper static generation
  trailingSlash: false,
  // Optimize for Vercel
  swcMinify: true,
  // Ensure proper routing
  basePath: '',
  assetPrefix: '',
};

module.exports = nextConfig;