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
    <div className="w-full bg-background">
      <section className="py-12 md:py-20 container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
        >
          <h2 className="text-foreground text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground text-base md:text-xl max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Version Mobile */}
        <div className="md:hidden space-y-6">
          {stepsWithIcons.map((step, index) => {
            const StepIcon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-card text-card-foreground rounded-xl shadow-lg border border-border p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="w-12 h-12 mt-5 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg flex items-center justify-center"
                      >
                        <StepIcon className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="absolute backdrop-blur-lg z-10  -top-2 -right-2 w-auto h-6 px-2 rounded-full bg-primary/20 flex items-center justify-center whitespace-nowrap">
                        <span className="text-sm font-bold text-primary">
                          Étape {index + 1}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-foreground text-lg font-semibold mb-1">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {index < stepsWithIcons.length - 1 && (
                    <div className="absolute left-6 -bottom-6 w-[1px] h-6 bg-gradient-to-b from-primary/50 to-transparent" />
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Version Desktop - Timeline */}
        <div className="hidden md:block relative max-w-5xl mx-auto">
          <div className="absolute mt-12 left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary/20 to-primary/40 rounded-full" />
          
          <div className="space-y-24">
            {stepsWithIcons.map((step, index) => {
              const StepIcon = step.icon
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
                  <div className={`w-1/2 ${isEven ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-card text-card-foreground p-8 rounded-2xl shadow-xl border border-border relative overflow-hidden group"
                    >
                      <h3 className="text-foreground text-2xl font-bold mb-4">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-lg flex items-center justify-center z-10"
                    >
                      <StepIcon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-lg font-bold text-primary whitespace-nowrap">
                      Étape {index + 1}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
} 