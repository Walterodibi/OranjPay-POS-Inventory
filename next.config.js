/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "i0.wp.com",
      "www.fmnfoods.com",
      "assets.unileversolutions.com",
      "www.heineken.com",
      "shoprite.ng",
      "zyntraqtech.com",
      "v0.blob.com",
    ],
    unoptimized: true,
  },
  experimental: {
    optimizeCss: false,
  },
}

module.exports = nextConfig
