'use client'

import { useState, useEffect } from 'react'

type AnimationOptions = {
  duration?: number
  delay?: number
  easing?: string
}

export function useAnimation(options: AnimationOptions = {}) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  const startAnimation = () => {
    if (hasAnimated) return

    setTimeout(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setIsAnimating(false)
        setHasAnimated(true)
      }, options.duration || 300)
    }, options.delay || 0)
  }

  return {
    isAnimating,
    hasAnimated,
    startAnimation,
    style: {
      transition: `all ${options.duration || 300}ms ${options.easing || 'ease-in-out'}`,
      opacity: isAnimating ? 1 : 0,
      transform: isAnimating ? 'translateY(0)' : 'translateY(20px)'
    }
  }
} 