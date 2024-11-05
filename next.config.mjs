/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compiler: {
    // Activer SWC
    styledComponents: true,
  },
  // Autres configurations existantes
  images: {
    domains: ['nouveau-storage-2150dbb5225628-staging.s3.eu-west-1.amazonaws.com'],
  },
}

export default nextConfig
