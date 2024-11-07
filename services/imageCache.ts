// Créer un service de cache d'images
export class ImageCache {
  private static instance: ImageCache
  private cache: Map<string, string>

  private constructor() {
    this.cache = new Map()
  }

  static getInstance(): ImageCache {
    if (!ImageCache.instance) {
      ImageCache.instance = new ImageCache()
    }
    return ImageCache.instance
  }

  async preloadImage(url: string): Promise<void> {
    if (this.cache.has(url)) return

    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const objectURL = URL.createObjectURL(blob)
      this.cache.set(url, objectURL)
    } catch (error) {
      console.error('Error preloading image:', error)
    }
  }

  getImage(url: string): string | undefined {
    return this.cache.get(url)
  }

  clearCache(): void {
    this.cache.forEach(objectURL => {
      URL.revokeObjectURL(objectURL)
    })
    this.cache.clear()
  }
} 