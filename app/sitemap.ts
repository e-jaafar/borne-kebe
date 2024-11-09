import { languages } from '@/config/i18n'
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.xn--borne-kb-80ai.com'
  const lastModified = new Date()

  // Routes principales avec priorités SEO
  const routes = [
    {
      url: '',
      priority: 1.0,
      changeFreq: 'weekly'
    },
    {
      url: '/pricing',
      priority: 0.9,
      changeFreq: 'weekly'
    },
    {
      url: '/contact',
      priority: 0.8,
      changeFreq: 'monthly'
    },
    {
      url: '/features',
      priority: 0.8,
      changeFreq: 'monthly'
    },
  ]

  // Générer toutes les URLs pour chaque langue
  const urls = routes.flatMap(route => 
    languages.map(lang => ({
      url: `${baseUrl}/${lang}${route.url}`,
      lastModified,
      changeFrequency: route.changeFreq as 'weekly' | 'monthly',
      priority: route.priority,
    }))
  )

  return urls
} 