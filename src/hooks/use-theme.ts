import { useEffect } from 'react'

import {
  SYSTEM_THEME_MEDIA_QUERY,
  applyResolvedTheme,
  resolveTheme,
} from '@/shared/styles/theme'
import { useAppStore } from '@/stores/preferences'

export function useTheme() {
  const themeMode = useAppStore((state) => state.themeMode)
  const setThemeMode = useAppStore((state) => state.setThemeMode)

  useEffect(() => {
    const mediaQuery = window.matchMedia(SYSTEM_THEME_MEDIA_QUERY)

    const syncTheme = () => {
      const systemResolvedTheme = mediaQuery.matches ? 'dark' : 'bright'
      applyResolvedTheme(resolveTheme(themeMode, systemResolvedTheme))
    }

    syncTheme()

    if (themeMode !== 'auto') {
      return
    }

    mediaQuery.addEventListener('change', syncTheme)

    return () => {
      mediaQuery.removeEventListener('change', syncTheme)
    }
  }, [themeMode])

  return {
    themeMode,
    setThemeMode,
  }
}
