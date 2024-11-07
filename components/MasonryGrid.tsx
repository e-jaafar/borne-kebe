'use client'

import { useState, useEffect, useRef } from 'react'
import { GalleryImage } from './GalleryImage'

type S3Image = {
  Key: string
  LastModified: string
  ETag: string
  Size: number
  StorageClass: string
}

interface MasonryGridProps {
  images: S3Image[]
}

export function MasonryGrid({ images }: MasonryGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [columns, setColumns] = useState<number>(3)
  const [gap] = useState<number>(2) // Réduit l'espacement à 2px

  useEffect(() => {
    const updateColumns = () => {
      if (!containerRef.current) return
      const width = containerRef.current.offsetWidth
      // Ajuste le nombre de colonnes en fonction de la largeur
      if (width <= 640) setColumns(2)
      else if (width <= 1024) setColumns(3)
      else setColumns(4) // Augmente le nombre de colonnes sur grand écran
    }

    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [])

  // Distribuer les images dans les colonnes de manière optimale
  const getOptimizedColumns = () => {
    const columnHeights = Array(columns).fill(0)
    const columnItems: S3Image[][] = Array(columns).fill(null).map(() => [])

    images.forEach((image) => {
      // Trouver la colonne la plus courte
      const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights))
      columnItems[shortestColumn].push(image)
      // Mise à jour approximative de la hauteur de la colonne
      columnHeights[shortestColumn] += 300 // Hauteur approximative
    })

    return columnItems
  }

  const columnItems = getOptimizedColumns()

  return (
    <div 
      ref={containerRef} 
      className="w-full"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`,
      }}
    >
      {columnItems.map((column, columnIndex) => (
        <div 
          key={columnIndex} 
          className="flex flex-col"
          style={{ gap: `${gap}px` }}
        >
          {column.map((image, imageIndex) => (
            <GalleryImage
              key={image.Key}
              image={image}
              index={imageIndex}
              onModalChange={() => {}}
              isMobile={false}
              priority={imageIndex < 4}
              style={{
                width: '100%',
                marginBottom: 0
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
} 