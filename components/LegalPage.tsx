'use client'

import { Shield, Book, Cookie } from 'lucide-react'
import { motion } from 'framer-motion'

type LegalPageProps = {
  title: string
  content: readonly string[]
  type: 'privacy' | 'terms' | 'cookies'
}

export function LegalPage({ title, content, type }: LegalPageProps) {
  const getIcon = () => {
    switch (type) {
      case 'privacy':
        return Shield
      case 'terms':
        return Book
      case 'cookies':
        return Cookie
      default:
        return Shield
    }
  }

  const Icon = getIcon()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 md:py-24 bg-background">
      <div className="container mx-auto max-w-4xl px-4">
        {/* En-tête */}
        <motion.div 
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary/10 text-primary"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className="w-8 h-8" />
          </motion.div>
          <h1 className="text-foreground text-4xl font-bold mb-4">
            {title}
          </h1>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
        </motion.div>

        {/* Contenu */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="bg-card text-card-foreground rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-border"
        >
          <div className="prose dark:prose-invert max-w-none">
            {content.map((text, index) => {
              const isTitle = text.length < 50
              return (
                <motion.div
                  key={index}
                  variants={item}
                  className="mb-6"
                >
                  {isTitle ? (
                    <h2 className="text-foreground text-xl font-semibold mt-8 mb-4">
                      {text}
                    </h2>
                  ) : (
                    <p className="text-muted-foreground leading-relaxed">
                      {text}
                    </p>
                  )}
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Date de dernière mise à jour */}
        <motion.div 
          className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Dernière mise à jour : 24/11/2024
        </motion.div>
      </div>
    </div>
  )
} 