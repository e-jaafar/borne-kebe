import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.xn--borne-kb-80ai.com'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/private/',
          '*.json',
          '*.xml',
          '/images/',
          '/og-image.jpg',
          '/favicon.ico'
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: ['/'],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
} 