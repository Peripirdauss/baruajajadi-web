/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'standalone',
  basePath: '/perip',
}

export default nextConfig

// Forced redeploy triggered at: 2026-04-09T10:38:00Z
