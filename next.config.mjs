/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['nouveau-storage-2150dbb5225628-staging.s3.eu-west-1.amazonaws.com'],
  },
  transpilePackages: ['lucide-react'],
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
  serverRuntimeConfig: {
    resend: {
      apiKey: process.env.RESEND_API_KEY,
    },
  },
}

export default nextConfig
