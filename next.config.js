/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost:3000'],
    formats: ['image/avif', 'image/webp'],
  }
}

module.exports = nextConfig
