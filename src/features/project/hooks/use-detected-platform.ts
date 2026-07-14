import { useEffect, useState } from 'react'

import { detectPlatform, type Platform } from '@/features/project/services/platform.service'

export function useDetectedPlatform(): Platform {
  const [platform, setPlatform] = useState<Platform>(() =>
    detectPlatform(window.navigator.userAgent, window.navigator.platform),
  )

  useEffect(() => {
    const handleResize = () => {
      setPlatform(detectPlatform(window.navigator.userAgent, window.navigator.platform))
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return platform
}
