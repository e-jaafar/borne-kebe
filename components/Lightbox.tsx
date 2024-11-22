'use client'

import { motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import { useEffect } from 'react'

type LightboxProps = {
  imageSrc: string
  imageAlt: string
  onClose: () => void
  onNext?: () => void
  onPrev?: () => void
  hasNext?: boolean
  hasPrev?: boolean
}

export function Lightbox({ 
  imageSrc, 
  imageAlt, 
  onClose,
  onNext,
  onPrev,
  hasNext,
  hasPrev 
}: LightboxProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Gestion des touches clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowRight' && hasNext && onNext) {
        onNext()
      } else if (e.key === 'ArrowLeft' && hasPrev && onPrev) {
        onPrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onNext, onPrev, hasNext, hasPrev])

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-lg flex items-center justify-center"
      onClick={handleBackdropClick}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      {/* Bouton de fermeture */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        onClick={onClose}
        className="absolute top-4 right-4 p-3 text-white/75 hover:text-white bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm transition-all duration-200 z-[99999]"
      >
        <X className="w-6 h-6" />
      </motion.button>

      {/* Boutons de navigation */}
      {hasPrev && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          onClick={(e) => {
            e.stopPropagation()
            onPrev?.()
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/75 hover:text-white bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm transition-all duration-200"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
      )}

      {hasNext && (
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          onClick={(e) => {
            e.stopPropagation()
            onNext?.()
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/75 hover:text-white bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm transition-all duration-200"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      )}

      {/* Image */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-[95vw] h-[95vh] relative"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-contain"
          sizes="95vw"
          priority
          quality={100}
          draggable={false}
        />
      </motion.div>

      {/* Raccourcis clavier */}
      <div className="fixed bottom-4 right-4 flex gap-2 text-white/50 text-sm">
        <span>ESC pour fermer</span>
        {(hasNext || hasPrev) && <span>• ← → pour naviguer</span>}
      </div>
    </motion.div>,
    document.body
  )
}
