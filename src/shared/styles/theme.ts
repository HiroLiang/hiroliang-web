export type ThemeMode = 'dark' | 'bright' | 'auto'
export type ResolvedTheme = 'dark' | 'bright'

const PREFERENCES_STORAGE_KEY = 'app-preferences'
export const SYSTEM_THEME_MEDIA_QUERY = '(prefers-color-scheme: dark)'

export function isThemeMode(value: unknown): value is ThemeMode {
  return value === 'dark' || value === 'bright' || value === 'auto'
}

export function getSystemResolvedTheme(): ResolvedTheme {
  if (typeof window === 'undefined') {
    return 'bright'
  }

  return window.matchMedia(SYSTEM_THEME_MEDIA_QUERY).matches ? 'dark' : 'bright'
}

export function resolveTheme(themeMode: ThemeMode, systemResolvedTheme: ResolvedTheme = getSystemResolvedTheme()): ResolvedTheme {
  return themeMode === 'auto' ? systemResolvedTheme : themeMode
}

export function applyResolvedTheme(resolvedTheme: ResolvedTheme) {
  if (typeof document === 'undefined') {
    return
  }

  const root = document.documentElement
  root.dataset.theme = resolvedTheme
  root.style.colorScheme = resolvedTheme === 'dark' ? 'dark' : 'light'
}

export function applyThemeMode(themeMode: ThemeMode) {
  applyResolvedTheme(resolveTheme(themeMode))
}

export function getStoredThemeMode(): ThemeMode | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const raw = window.localStorage.getItem(PREFERENCES_STORAGE_KEY)
    if (!raw) {
      return null
    }

    const parsed = JSON.parse(raw) as {
      state?: {
        themeMode?: unknown
      }
    }
    const themeMode = parsed?.state?.themeMode

    return isThemeMode(themeMode) ? themeMode : null
  } catch {
    return null
  }
}

export function getInitialThemeMode(): ThemeMode {
  return getStoredThemeMode() ?? 'auto'
}
