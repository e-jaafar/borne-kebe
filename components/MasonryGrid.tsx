'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { GalleryImage } from './GalleryImage'
import { motion } from 'framer-motion'
import { useMediaQuery } from '@/hooks/useMediaQuery'

type Image = {
  src: string
  alt: string
}

type MasonryGridProps = {
  images: Image[]
}

export function MasonryGrid({ images }: MasonryGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const [columns, setColumns] = useState(3)
  const [gridWidth, setGridWidth] = useState(0)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(max-width: 1024px)')

  // Fonction pour calculer le nombre de colonnes avec useCallback
  const calculateColumns = useCallback(() => {
    if (isMobile) return 1
    if (isTablet) return 2
    return 3
  }, [isMobile, isTablet])

  // Fonction de debounce typée
  const debounce = <T extends (...args: unknown[]) => void>(
    func: T,
    wait: number
  ) => {
    let timeout: NodeJS.Timeout

    return (...args: Parameters<T>) => {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  // Mise à jour des dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (gridRef.current) {
        setGridWidth(gridRef.current.offsetWidth)
        setColumns(calculateColumns())
      }
    }

    updateDimensions()

    const debouncedHandleResize = debounce(updateDimensions, 250)
    window.addEventListener('resize', debouncedHandleResize)

    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, [calculateColumns])

  // Distribution des images dans les colonnes
  const distributeImages = useCallback(() => {
    if (!images || images.length === 0) return []
    
    // Limiter à 9 images
    const limitedImages = images.slice(0, 9)
    
    const columnArrays: Image[][] = Array.from({ length: columns }, () => [])
    
    limitedImages.forEach((image, index) => {
      columnArrays[index % columns].push(image)
    })
    
    return columnArrays
  }, [columns, images])

  const columnWidth = gridWidth / columns

  return (
    <div 
      ref={gridRef}
      className="relative w-full"
      style={{ 
        height: gridWidth > 0 ? 'auto' : '100vh',
        minHeight: '400px'
      }}
    >
      <div className="flex gap-4">
        {distributeImages().map((column, columnIndex) => (
          <div
            key={columnIndex}
            className="flex-1"
            style={{ 
              width: `${100 / columns}%`,
              position: 'relative'
            }}
          >
            {column.map((image, imageIndex) => {
              // Calcul de l'index global de l'image
              const globalIndex = columnIndex + (imageIndex * columns)
              
              return (
                <motion.div
                  key={`${columnIndex}-${imageIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: imageIndex * 0.1 }}
                  className="mb-4"
                  style={{ 
                    position: 'relative',
                    width: '100%',
                    willChange: 'transform'
                  }}
                >
                  <GalleryImage
                    src={image.src}
                    alt={image.alt}
                    width={columnWidth}
                    allImages={images}
                    currentIndex={globalIndex}
                  />
                </motion.div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}