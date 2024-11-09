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
    <div className="min-h-[calc(100vh-4rem)] py-12 md:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-[#1a0f2e] dark:to-[#140b24]">
      <div className="container mx-auto max-w-4xl px-4">
        {/* En-tête */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary/10 text-primary"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className="w-8 h-8" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
            {title}
          </h1>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
        </motion.div>

        {/* Contenu */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="bg-white dark:bg-[#1a0f2e]/50 rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50"
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
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
                      {text}
                    </h2>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
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
          Dernière mise à jour : {new Date().toLocaleDateString()}
        </motion.div>
      </div>
    </div>
  )
} 