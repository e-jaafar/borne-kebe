import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { Lightbox } from './Lightbox'
import { useKeyPress } from '@/hooks/useKeyPress'

type LocalImage = {
  src: string
  alt: string
}

type MasonryGridProps = {
  images: LocalImage[]
}

// function ImageSkeleton() {
//   return (
//     <div className="animate-pulse">
//       <div className="bg-gray-200 dark:bg-gray-700 rounded-lg w-full h-full min-h-[200px]" />
//     </div>
//   )
// }

export function MasonryGrid({ images }: MasonryGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [columns, setColumns] = useState<number>(3)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [selectedImage, setSelectedImage] = useState<LocalImage | null>(null)
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  useEffect(() => {
    const updateColumns = () => {
      if (!containerRef.current) return
      const width = containerRef.current.offsetWidth
      if (width <= 640) setColumns(2)
      else if (width <= 1024) setColumns(3)
      else setColumns(4)
    }

    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [])

  const handleImageLoad = (src: string) => {
    setLoadedImages(prev => new Set(prev).add(src))
  }

  const handleImageClick = (image: LocalImage, index: number) => {
    setSelectedImage(image)
    setCurrentIndex(index)
  }

  const handlePrevious = () => {
    if (!images || images.length === 0) return
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1
    setCurrentIndex(newIndex)
    setSelectedImage(images[newIndex])
  }

  const handleNext = () => {
    if (!images || images.length === 0) return
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0
    setCurrentIndex(newIndex)
    setSelectedImage(images[newIndex])
  }

  const handleClose = () => {
    setSelectedImage(null)
    setCurrentIndex(0)
  }

  // Gestion des touches clavier avec useKeyPress
  useKeyPress('ArrowLeft', handlePrevious)
  useKeyPress('ArrowRight', handleNext)
  useKeyPress('Escape', handleClose)

  const getRandomAspectRatio = () => {
    const ratios = [
      'aspect-[1/1.2]',
      'aspect-[1/1]',
      'aspect-[4/5]',
      'aspect-[3/2]',
      'aspect-[2/3]'
    ]
    return ratios[Math.floor(Math.random() * ratios.length)]
  }

  const getOptimizedColumns = () => {
    if (!Array.isArray(images) || images.length === 0) {
      return Array(columns).fill([])
    }

    const columnItems: LocalImage[][] = Array(columns).fill(null).map(() => [])
    images.forEach((image: LocalImage, index: number) => {
      const columnIndex = index % columns
      columnItems[columnIndex].push(image)
    })
    return columnItems
  }

  if (!Array.isArray(images) || images.length === 0) {
    return <div className="text-center text-gray-500">Chargement des images...</div>
  }

  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
          Nos Événements
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Découvrez les moments magiques capturés lors des événements où notre photobooth a créé des souvenirs inoubliables.
        </p>
      </div>

      <div ref={containerRef} className="w-full px-4 py-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-2 max-w-5xl mx-auto"
        >
          {getOptimizedColumns().map((column: LocalImage[], columnIndex: number) => (
            <div key={columnIndex} className="flex-1 flex flex-col gap-2">
              {column.map((image: LocalImage, imageIndex: number) => {
                const globalIndex = columnIndex * Math.ceil(images.length / columns) + imageIndex
                const aspectRatio = getRandomAspectRatio()
                
                return (
                  <motion.div
                    key={`${columnIndex}-${imageIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: (columnIndex * column.length + imageIndex) * 0.1,
                      duration: 0.5
                    }}
                    className="relative group cursor-pointer"
                    onClick={() => handleImageClick(image, globalIndex)}
                  >
                    <div className={`relative ${aspectRatio} w-full overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300`}>
                      {!loadedImages.has(image.src) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                        </div>
                      )}
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
                        className={`
                          object-cover transition-transform duration-500 group-hover:scale-105
                          ${loadedImages.has(image.src) ? 'opacity-100' : 'opacity-0'}
                        `}
                        priority={imageIndex === 0}
                        onLoad={() => handleImageLoad(image.src)}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          ))}
        </motion.div>
      </div>

      {selectedImage && (
        <Lightbox
          image={selectedImage}
          onClose={handleClose}
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasNext={currentIndex < images.length - 1}
          hasPrevious={currentIndex > 0}
        />
      )}
    </>
  )
}