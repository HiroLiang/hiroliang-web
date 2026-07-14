import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { defaultLocale } from '@/locales'
import type { AppPreferencesState } from '@/stores/preferences/types'

export const useAppStore = create<AppPreferencesState>()(
  persist(
    (set) => ({
      locale: defaultLocale,
      setLocale: (locale) => set({ locale }),
      themeMode: 'auto',
      setThemeMode: (themeMode) => set({ themeMode }),
      visitCount: 0,
      incrementVisits: () =>
        set((state) => ({
          visitCount: state.visitCount + 1,
        })),
    }),
    {
      name: 'app-preferences',
      partialize: (state) => ({
        locale: state.locale,
        themeMode: state.themeMode,
      }),
    },
  ),
)
