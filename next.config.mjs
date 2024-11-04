/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true }
    return config
  },
  // Ajoutez ces configurations pour gérer les fichiers
  experimental: {
    serverComponentsExternalPackages: ['resend']
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nouveau-storage-2150dbb5225628-staging.s3.eu-west-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
}

export default nextConfig
