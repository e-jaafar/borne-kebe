'use client'

import { useState, useEffect } from 'react'

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [slowConnection, setSlowConnection] = useState(false)

  useEffect(() => {
    const connection = (navigator as any).connection

    const updateNetworkStatus = () => {
      setIsOnline(navigator.onLine)
      if (connection) {
        setSlowConnection(connection.effectiveType === '2g' || connection.saveData)
      }
    }

    window.addEventListener('online', updateNetworkStatus)
    window.addEventListener('offline', updateNetworkStatus)
    if (connection) {
      connection.addEventListener('change', updateNetworkStatus)
    }

    return () => {
      window.removeEventListener('online', updateNetworkStatus)
      window.removeEventListener('offline', updateNetworkStatus)
      if (connection) {
        connection.removeEventListener('change', updateNetworkStatus)
      }
    }
  }, [])

  return { isOnline, slowConnection }
} 