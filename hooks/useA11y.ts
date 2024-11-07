'use client'

import { useEffect, useCallback } from 'react'

export function useA11y() {
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      document.body.classList.add('user-is-tabbing')
    }
  }, [])

  const handleMouseDown = useCallback(() => {
    document.body.classList.remove('user-is-tabbing')
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    window.addEventListener('mousedown', handleMouseDown)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      window.removeEventListener('mousedown', handleMouseDown)
    }
  }, [handleKeyPress, handleMouseDown])
} 