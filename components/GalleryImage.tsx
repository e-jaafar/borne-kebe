'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import imageCache from '@/services/imageCache'
import { Loader2 } from 'lucide-react'

type GalleryImageProps = {
  imageKey: string
  index: number
  layout: 'square' | 'tall' | 'wide' | 'large'
  priority?: boolean
}

export function GalleryImage({ imageKey, index, layout, priority = false }: GalleryImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const formattedKey = imageKey.startsWith('/') ? imageKey : `/${imageKey}`
  const imageUrl = `https://nouveau-storage-2150dbb5225628-staging.s3.eu-west-1.amazonaws.com${formattedKey}`

  const layoutClasses = {
    square: "aspect-square",
    tall: "aspect-[2/3] md:row-span-2",
    wide: "aspect-[3/2] md:col-span-2",
    large: "aspect-square md:col-span-2 md:row-span-2"
  }

  useEffect(() => {
    const preloadImage = new window.Image()
    preloadImage.src = imageUrl
    
    const loadImage = async () => {
      try {
        const hasImage = await imageCache.has(imageKey)
        
        if (hasImage) {
          setIsLoading(false)
          return
        }

        preloadImage.onload = async () => {
          await imageCache.set(imageKey, imageUrl)
          setIsLoading(false)
        }

      } catch (error) {
        console.error(`Erreur lors du chargement de l'image ${imageKey}:`, error)
        setIsLoading(false)
      }
    }

    loadImage()
  }, [imageKey, imageUrl])

  return (
    <div className={`relative group overflow-hidden rounded-lg ${layoutClasses[layout]} transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      )}
      <Image
        src={imageUrl}
        alt={`Gallery image ${index + 1}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        quality={75}
        className={`object-cover transition-all duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  )
} 