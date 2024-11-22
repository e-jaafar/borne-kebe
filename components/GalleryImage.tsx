'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Lightbox } from './Lightbox'
import { Search } from 'lucide-react'

type GalleryImageProps = {
  src: string
  alt: string
  width: number
  allImages?: { src: string; alt: string }[]
  currentIndex?: number
}

export function GalleryImage({ src, alt, width, allImages = [], currentIndex = 0 }: GalleryImageProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex)
  const aspectRatio = 3/2

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleImageClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen(true)
    setCurrentImageIndex(currentIndex)
  }

  const handleNext = () => {
    if (currentImageIndex < allImages.length - 1) {
      setCurrentImageIndex(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1)
    }
  }

  // Gestion des raccourcis clavier
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      } else if (e.key === 'ArrowRight') {
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      }
    }

    document.body.classList.add('lightbox-open')
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.classList.remove('lightbox-open')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, currentImageIndex])

  return (
    <>
      <motion.div
        className="relative overflow-hidden rounded-lg cursor-zoom-in group"
        style={{
          width: '100%',
          height: width / aspectRatio,
        }}
        whileHover={{ scale: 1.02 }}
        onClick={handleImageClick}
      >
        {/* Overlay au hover avec icône de zoom */}
        <motion.div
          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center"
        >
          <Search className="w-6 h-6 text-white opacity-75" />
        </motion.div>

        {/* Image */}
        <div className="relative w-full h-full">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`
              object-cover transition-all duration-300
              ${isLoading ? 'scale-110 blur-sm' : 'scale-100 blur-0'}
            `}
            onLoadingComplete={() => setIsLoading(false)}
            draggable={false}
          />
        </div>

        {/* Effet de brillance */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
            transform: 'translateX(-100%)',
            animation: 'shimmer 2s infinite',
          }}
        />
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && isMounted && (
          <Lightbox
            imageSrc={allImages[currentImageIndex]?.src || src}
            imageAlt={allImages[currentImageIndex]?.alt || alt}
            onClose={() => setIsOpen(false)}
            onNext={handleNext}
            onPrev={handlePrev}
            hasNext={currentImageIndex < allImages.length - 1}
            hasPrev={currentImageIndex > 0}
          />
        )}
      </AnimatePresence>
    </>
  )
} 