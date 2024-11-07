import { MetadataRoute } from 'next'
import { languages } from '@/config/i18n'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.xn--borne-kb-80ai.com'
  const lastModified = new Date()

  // Routes principales
  const mainRoutes = ['', '/features', '/pricing', '/contact']
  
  // Générer toutes les URLs pour chaque langue
  const urls = mainRoutes.flatMap(route => 
    languages.map(lang => ({
      url: `${baseUrl}/${lang}${route}`,
      lastModified,
      changeFrequency: route === '' ? 'weekly' : 'monthly' as 'weekly' | 'monthly',
      priority: route === '' ? 1 : 0.8,
    }))
  )

  // Ajouter les URLs spéciales
  urls.push({
    url: `${baseUrl}/sitemap.xml`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.4,
  })

  return urls
} 