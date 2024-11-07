import { MetadataRoute } from 'next'
import { languages } from '@/config/i18n'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.xn--borne-kb-80ai.com'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
} 