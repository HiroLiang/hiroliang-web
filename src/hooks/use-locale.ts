import { messages } from '@/locales'
import type { Locale } from '@/locales/types'
import { useAppStore } from '@/stores/preferences'

export function useLocale() {
  const locale = useAppStore((state) => state.locale)
  const setLocale = useAppStore((state) => state.setLocale)

  return { locale, setLocale }
}

export function useMessages() {
  const locale = useAppStore((state) => state.locale)

  return messages[locale]
}

export function isLocale(value: string): value is Locale {
  return value in messages
}
