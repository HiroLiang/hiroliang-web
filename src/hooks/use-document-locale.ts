import { useEffect } from 'react'

import { useLocale } from '@/hooks/use-locale'
import type { Locale } from '@/locales/types'

const DOCUMENT_LANGUAGE: Record<Locale, string> = {
  en: 'en',
  'zh-TW': 'zh-Hant-TW',
  ja: 'ja',
}

export function useDocumentLocale() {
  const { locale } = useLocale()

  useEffect(() => {
    document.documentElement.lang = DOCUMENT_LANGUAGE[locale]
  }, [locale])
}
