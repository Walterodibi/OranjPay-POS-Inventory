/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["i0.wp.com", "www.fmnfoods.com", "www.heineken.com", "assets.unileversolutions.com", "shoprite.ng"],
    unoptimized: true,
  },
}

module.exports = nextConfig
