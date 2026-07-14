import type { ThemeMode } from '@/shared/styles/theme'
import type { Locale } from '@/locales/types'

export type AppPreferencesState = {
  locale: Locale
  setLocale: (locale: Locale) => void
  themeMode: ThemeMode
  setThemeMode: (themeMode: ThemeMode) => void
  visitCount: number
  incrementVisits: () => void
}
