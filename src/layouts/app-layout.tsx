import { NavLink, Outlet } from 'react-router-dom'

import { useLocale, useMessages } from '@/hooks/use-locale'
import type { Locale } from '@/locales/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function AppLayout() {
  const { locale, setLocale } = useLocale()
  const t = useMessages()

  return (
    <div className="h-screen overflow-hidden bg-background text-foreground">
      <div className="flex h-screen w-full flex-col overflow-hidden px-4 pb-4 pt-4 sm:px-5 lg:px-6">
        <header className="mb-4 flex flex-col gap-4 border-b border-border/70 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <NavLink
            className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
            to="/"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
              Hiro Liang
            </span>
          </NavLink>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <nav className="flex flex-wrap gap-5 text-sm">
              <a
                className="text-muted-foreground transition-colors duration-150 hover:text-foreground"
                href="https://github.com/HiroLiang"
                rel="noreferrer"
                target="_blank"
              >
                {t.nav.github}
              </a>
            </nav>

            <div className="w-[120px]">
              <Select onValueChange={(value) => setLocale(value as Locale)} value={locale}>
                <SelectTrigger aria-label={t.nav.language} className="h-9 bg-transparent">
                  <SelectValue placeholder={t.localeLabel} />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="en">{t.locales.en}</SelectItem>
                  <SelectItem value="zh-TW">{t.locales['zh-TW']}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </header>

        <main className="flex min-h-0 flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
