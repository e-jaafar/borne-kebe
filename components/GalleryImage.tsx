'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import imageCache from '@/services/imageCache'
import { Loader2 } from 'lucide-react'

type GalleryImageProps = {
  imageKey: string
  index: number
}

export function GalleryImage({ imageKey, index }: GalleryImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const formattedKey = imageKey.startsWith('/') ? imageKey : `/${imageKey}`
  const imageUrl = `https://nouveau-storage-2150dbb5225628-staging.s3.eu-west-1.amazonaws.com${formattedKey}`

  useEffect(() => {
    const loadImage = async () => {
      try {
        const hasImage = await imageCache.has(imageKey)
        
        if (hasImage) {
          setIsLoading(false)
          return
        }

        const imgElement = new Image()
        imgElement.onload = async () => {
          await imageCache.set(imageKey, imageUrl)
          setIsLoading(false)
        }
        imgElement.src = imageUrl

      } catch (error) {
        console.error(`Erreur lors du chargement de l'image ${imageKey}:`, error)
        setIsLoading(false)
      }
    }

    loadImage()
  }, [imageKey, imageUrl])

  return (
    <div className="relative group overflow-hidden rounded-lg aspect-square">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      )}
      <Image
        src={imageUrl}
        alt={`Gallery image ${index + 1}`}
        fill
        className={`object-cover transition-all duration-300 group-hover:scale-110 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  )
} 