import { MetadataRoute } from 'next'
import { languages } from '@/config/i18n'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.xn--borne-kb-80ai.com'
  const routes = ['', '/features', '/pricing', '/contact']
  
  return routes.flatMap(route => 
    languages.map(lang => ({
      url: `${baseUrl}/${lang}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'weekly' : 'monthly',
      priority: route === '' ? 1 : 0.8,
    }))
  )
} 