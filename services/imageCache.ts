// Créer un service de cache d'images
class ImageCache {
  private cache: Map<string, string>

  constructor() {
    this.cache = new Map()
  }

  async has(key: string): Promise<boolean> {
    return this.cache.has(key)
  }

  async set(key: string, url: string): Promise<void> {
    this.cache.set(key, url)
  }

  async get(key: string): Promise<string | undefined> {
    return this.cache.get(key)
  }
}

export default new ImageCache() 