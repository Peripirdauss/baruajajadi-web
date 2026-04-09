/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/perip',
  assetPrefix: '/perip',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'standalone',
}

export default nextConfig

// Forced redeploy triggered at: 2026-04-09T10:38:00Z
