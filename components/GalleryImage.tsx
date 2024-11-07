'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'
import { Modal } from '@/components/ui/modal'
import { cn } from '@/lib/utils'

type S3Image = {
  Key: string
  LastModified: string
  ETag: string
  Size: number
  StorageClass: string
}

interface GalleryImageProps {
  image: S3Image
  priority?: boolean
  onModalChange: (isOpen: boolean) => void
  index: number
  isMobile: boolean
  style?: React.CSSProperties
}

export function GalleryImage({ 
  image, 
  priority = false, 
  onModalChange, 
  index,
  isMobile,
  style 
}: GalleryImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [aspectRatio, setAspectRatio] = useState(1)

  const imageUrl = `https://nouveau-storage-2150dbb5225628-staging.s3.eu-west-1.amazonaws.com/${image.Key}`
    .replace(/\/+/g, '/')
    .replace('https:/', 'https://')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const img = new window.Image()
      img.src = imageUrl
      img.onload = () => {
        setAspectRatio(img.height / img.width)
        setIsLoading(false)
      }
    }
  }, [imageUrl])

  return (
    <>
      <div 
        className={cn(
          'relative overflow-hidden group',
          'cursor-pointer transition-transform duration-300 hover:z-10 hover:scale-[1.02]'
        )}
        onClick={() => setIsModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsModalOpen(true)
          }
        }}
        style={{
          ...style,
          aspectRatio: `1/${aspectRatio}`,
          maxHeight: '400px'
        }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          </div>
        )}

        <Image
          src={imageUrl}
          alt={`Photo d'événement ${index + 1}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 30vw"
          priority={priority}
          quality={60}
          className={cn(
            'object-cover transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100'
          )}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          onModalChange?.(false)
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative max-w-[90vw] max-h-[85vh]">
            <Image
              src={imageUrl}
              alt={`Photo d'événement ${index + 1}`}
              width={1600}
              height={900}
              priority
              quality={85}
              className="rounded-lg max-h-[85vh] w-auto h-auto object-contain"
              style={{ maxWidth: '90vw' }}
            />
          </div>
        </div>
      </Modal>
    </>
  )
} 