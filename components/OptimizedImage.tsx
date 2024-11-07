'use client'

import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = ''
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        quality={90}
        className={`
          duration-700 ease-in-out
          ${isLoading ? 'scale-110 blur-2xl' : 'scale-100 blur-0'}
          ${className}
        `}
        onLoad={() => setIsLoading(false)}
        sizes="(max-width: 640px) 100vw,
               (max-width: 1024px) 50vw,
               33vw"
      />
    </div>
  )
} 