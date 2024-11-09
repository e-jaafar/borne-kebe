'use client'

import { motion } from 'framer-motion'
import { Camera, Scan, Sparkles, Share } from 'lucide-react'

type Step = {
  title: string
  description: string
  icon: typeof Camera | typeof Scan | typeof Sparkles | typeof Share
}

type HowItWorksProps = {
  title: string
  subtitle: string
  steps: {
    title: string
    description: string
    icon: string
  }[]
}

export function HowItWorks({ title, subtitle, steps }: HowItWorksProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Camera': return Camera
      case 'Users': return Scan
      case 'Settings': return Sparkles
      case 'Share2': return Share
      default: return Camera
    }
  }

  const stepsWithIcons: Step[] = steps.map(step => ({
    ...step,
    icon: getIcon(step.icon)
  }))

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50 dark:from-[#1a0f2e] dark:to-[#140b24]">
      <section className="py-20 container mx-auto px-4">
        {/* En-tête */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {subtitle}
          </p>
        </motion.div>

        {/* Timeline - Version Desktop */}
        <div className="relative max-w-5xl mx-auto hidden md:block">
          {/* Ligne de connexion */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500/20 to-purple-500/40 rounded-full" />

          {/* Étapes */}
          <div className="space-y-24">
            {stepsWithIcons.map((step, index) => {
              const Icon = step.icon
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className={`relative flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Contenu */}
                  <div className={`w-1/2 ${isEven ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white dark:bg-[#2d1f42] p-8 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-800/50 relative overflow-hidden group"
                    >
                      {/* Effet de brillance */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      
                      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Icône centrale */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 dark:from-purple-400 dark:to-purple-600 shadow-lg flex items-center justify-center z-10"
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    {/* Numéro */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-2xl font-bold text-purple-500 dark:text-purple-400">
                      {index + 1}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Version Mobile */}
        <div className="md:hidden space-y-8">
          {stepsWithIcons.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Carte */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-[#2d1f42] p-6 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-800/50 relative overflow-hidden"
                >
                  {/* En-tête avec icône et numéro */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 dark:from-purple-400 dark:to-purple-600 shadow-lg flex items-center justify-center"
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                      <span className="text-sm text-purple-500 dark:text-purple-400">
                        Étape {index + 1}
                      </span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {step.description}
                  </p>

                  {/* Effet de brillance */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </motion.div>

                {/* Ligne de connexion (sauf pour le dernier élément) */}
                {index < stepsWithIcons.length - 1 && (
                  <div className="absolute left-6 top-full h-8 w-px bg-gradient-to-b from-purple-500/20 to-purple-500/40" />
                )}
              </motion.div>
            )
          })}
        </div>
      </section>
    </div>
  )
} 