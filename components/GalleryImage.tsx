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
  image: S3Image;
  priority?: boolean;
  onModalChange: (isOpen: boolean) => void;
  index: number;
  isMobile: boolean;
}

export function GalleryImage({ image, priority = false, onModalChange, index, isMobile }: GalleryImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    onModalChange?.(isModalOpen)
  }, [isModalOpen, onModalChange])

  const imageUrl = `https://nouveau-storage-2150dbb5225628-staging.s3.eu-west-1.amazonaws.com/${image.Key}`
    .replace(/\/+/g, '/')
    .replace('https:/', 'https://')

  const getDesktopHeight = () => {
    const heights = ['h-64', 'h-96', 'h-80', 'h-72']
    return heights[index % heights.length]
  }

  return (
    <>
      <div 
        className={cn(
          'relative group overflow-hidden rounded-lg w-full mb-4',
          'cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl',
          isMobile ? 'h-[300px]' : getDesktopHeight(),
          !isMobile && 'break-inside-avoid'
        )}
        onClick={() => setIsModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsModalOpen(true)
          }
        }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          </div>
        )}

        <Image
          src={imageUrl}
          alt={`Gallery image ${image.Key}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          quality={75}
          className={cn(
            'object-cover transition-all duration-300',
            isLoading ? 'opacity-0' : 'opacity-100'
          )}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
              </div>
            )}
            <div className="relative">
              <Image
                src={imageUrl}
                alt={`Gallery image ${image.Key}`}
                width={1920}
                height={1080}
                priority
                quality={100}
                className="rounded-lg max-h-[85vh] w-auto h-auto object-contain"
                style={{ maxWidth: '90vw' }}
                onLoad={() => setIsLoading(false)}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
} 