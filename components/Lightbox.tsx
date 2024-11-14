import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

type LightboxProps = {
  image: {
    src: string
    alt: string
    event?: string
    date?: string
  }
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
  hasNext: boolean
  hasPrevious: boolean
}

export function Lightbox({ 
  image, 
  onClose, 
  onPrevious, 
  onNext,
  hasNext,
  hasPrevious 
}: LightboxProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/95 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Boutons de navigation */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-50"
        >
          <X size={24} />
        </button>

        {hasPrevious && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onPrevious()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-50 p-2 hover:bg-muted rounded-full"
          >
            <ChevronLeft size={32} />
          </button>
        )}

        {hasNext && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-50 p-2 hover:bg-white/10 rounded-full"
          >
            <ChevronRight size={32} />
          </button>
        )}

        {/* Container de l'image */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-4xl h-[80vh]"
          onClick={e => e.stopPropagation()}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-contain"
            sizes="(max-width: 1536px) 100vw, 1536px"
            priority
            quality={100}
          />

          {(image.event || image.date) && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              {image.event && (
                <h3 className="text-white text-xl font-medium">{image.event}</h3>
              )}
              {image.date && (
                <p className="text-white/70 text-sm">{image.date}</p>
              )}
            </div>
          )}
        </motion.div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
          Utilisez ← → pour naviguer, Échap pour fermer
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
