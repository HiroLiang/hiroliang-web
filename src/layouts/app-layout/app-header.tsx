import { NavLink } from 'react-router-dom'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useLocale, useMessages } from '@/hooks/use-locale'
import { useTheme } from '@/hooks/use-theme'
import type { Locale } from '@/locales/types'
import type { ThemeMode } from '@/shared/styles/theme'

type AppHeaderProps = {
  isMobileHeaderVisible: boolean
  isMobileViewport: boolean
}

export function AppHeader({ isMobileHeaderVisible, isMobileViewport }: AppHeaderProps) {
  const { locale, setLocale } = useLocale()
  const { themeMode, setThemeMode } = useTheme()
  const t = useMessages()
  const headerVisibilityClass = isMobileViewport
    ? isMobileHeaderVisible
      ? 'translate-y-0 opacity-100'
      : '-translate-y-[calc(100%-0.8rem)] opacity-0'
    : 'translate-y-0 opacity-100'

  return (
    <header
      className={[
        'app-navbar z-50 border-border/70 bg-background/92 backdrop-blur transition-transform duration-200 ease-out',
        isMobileViewport
          ? `fixed inset-x-0 top-0 w-full flex items-center justify-between gap-3 rounded-b-2xl border border-t-0 px-3 py-3 ${headerVisibilityClass}`
          : 'mb-3 flex flex-col gap-4 rounded-b-2xl border border-t-0 px-3 py-3 sm:mb-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 lg:px-6',
      ].join(' ')}
    >
      <NavLink
        className="flex min-w-0 shrink items-baseline gap-x-3 gap-y-1 whitespace-nowrap"
        to="/"
      >
        <span className="truncate text-xs font-semibold uppercase tracking-[0.18em] text-foreground sm:text-sm">
          Hiro Liang
        </span>
      </NavLink>

      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <nav className="flex shrink-0 flex-row gap-3 whitespace-nowrap text-xs sm:gap-5 sm:text-sm">
          <a
            className="text-muted-foreground transition-colors duration-150 hover:text-foreground"
            href="https://github.com/HiroLiang"
            rel="noreferrer"
            target="_blank"
          >
            {t.nav.github}
          </a>
        </nav>

        <div className="w-[84px] shrink-0 sm:w-[120px]">
          <Select onValueChange={(value) => setLocale(value as Locale)} value={locale}>
            <SelectTrigger
              aria-label={t.nav.language}
              className="app-navbar-select-trigger h-9 bg-transparent px-2 text-xs sm:text-sm"
            >
              <SelectValue placeholder={t.localeLabel} />
            </SelectTrigger>
            <SelectContent align="end" className="app-navbar-select-content">
              <SelectItem value="en">{t.locales.en}</SelectItem>
              <SelectItem value="ja">{t.locales.ja}</SelectItem>
              <SelectItem value="zh-TW">{t.locales['zh-TW']}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-[84px] shrink-0 sm:w-[120px]">
          <Select onValueChange={(value) => setThemeMode(value as ThemeMode)} value={themeMode}>
            <SelectTrigger
              aria-label={t.nav.theme}
              className="app-navbar-select-trigger h-9 bg-transparent px-2 text-xs sm:text-sm"
            >
              <SelectValue placeholder={t.nav.theme} />
            </SelectTrigger>
            <SelectContent align="end" className="app-navbar-select-content">
              <SelectItem value="dark">{t.themeModes.dark}</SelectItem>
              <SelectItem value="bright">{t.themeModes.bright}</SelectItem>
              <SelectItem value="auto">{t.themeModes.auto}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  )
}
