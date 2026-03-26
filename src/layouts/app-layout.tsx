import { useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

import { useLocale, useMessages } from '@/hooks/use-locale'
import type { Locale } from '@/locales/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const MOBILE_BREAKPOINT_QUERY = '(max-width: 639px)'
const MOBILE_HEADER_SHOW_DELTA_PX = 24
const MOBILE_HEADER_HIDE_DELTA_PX = 10
const MOBILE_HEADER_SIDE_INSET_PX = 2.3

export function AppLayout() {
  const { locale, setLocale } = useLocale()
  const t = useMessages()
  const location = useLocation()
  const [isMobileViewport, setIsMobileViewport] = useState(false)
  const [isMobileHeaderVisible, setIsMobileHeaderVisible] = useState(false)
  const gestureStartYRef = useRef<number | null>(null)
  const consumedGestureRef = useRef(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT_QUERY)
    const updateViewport = () => {
      const matches = mediaQuery.matches
      setIsMobileViewport(matches)
      setIsMobileHeaderVisible((current) => (matches ? current : true))
    }

    updateViewport()
    mediaQuery.addEventListener('change', updateViewport)

    return () => {
      mediaQuery.removeEventListener('change', updateViewport)
    }
  }, [])

  useEffect(() => {
    if (!isMobileViewport) {
      gestureStartYRef.current = null
      consumedGestureRef.current = false
      return
    }

    const scrollRoots = Array.from(document.querySelectorAll<HTMLElement>('[data-app-scroll-root="true"]'))
    if (scrollRoots.length === 0) {
      return
    }

    function handleTouchStart(event: TouchEvent) {
      const touch = event.touches[0]
      if (!touch) {
        return
      }

      gestureStartYRef.current = touch.clientY
      consumedGestureRef.current = false
    }

    function handleTouchMove(event: TouchEvent) {
      const touch = event.touches[0]
      const gestureStartY = gestureStartYRef.current
      const currentTarget = event.currentTarget

      if (!touch || gestureStartY === null || !(currentTarget instanceof HTMLElement) || consumedGestureRef.current) {
        return
      }

      const deltaY = touch.clientY - gestureStartY
      const isAtTop = currentTarget.scrollTop <= 0

      if (!isMobileHeaderVisible && isAtTop && deltaY >= MOBILE_HEADER_SHOW_DELTA_PX) {
        setIsMobileHeaderVisible(true)
        consumedGestureRef.current = true
        gestureStartYRef.current = null
        return
      }

      if (isMobileHeaderVisible && deltaY <= -MOBILE_HEADER_HIDE_DELTA_PX) {
        setIsMobileHeaderVisible(false)
        consumedGestureRef.current = true
        gestureStartYRef.current = null
      }
    }

    function resetGesture() {
      gestureStartYRef.current = null
      consumedGestureRef.current = false
    }

    scrollRoots.forEach((root) => {
      root.addEventListener('touchstart', handleTouchStart, { passive: true })
      root.addEventListener('touchmove', handleTouchMove, { passive: false })
      root.addEventListener('touchend', resetGesture, { passive: true })
      root.addEventListener('touchcancel', resetGesture, { passive: true })
    })

    return () => {
      scrollRoots.forEach((root) => {
        root.removeEventListener('touchstart', handleTouchStart)
        root.removeEventListener('touchmove', handleTouchMove)
        root.removeEventListener('touchend', resetGesture)
        root.removeEventListener('touchcancel', resetGesture)
      })
    }
  }, [isMobileHeaderVisible, isMobileViewport, location.pathname])

  const mobileMainTopPadding = isMobileViewport ? (isMobileHeaderVisible ? 76 : 10) : 0
  const headerVisibilityClass = isMobileViewport
    ? isMobileHeaderVisible
      ? 'translate-y-0 opacity-100'
      : '-translate-y-[calc(100%-0.8rem)] opacity-0'
    : 'translate-y-0 opacity-100'

  return (
    <div className="h-screen overflow-hidden bg-background text-foreground">
      <div
        className="flex h-screen w-full flex-col overflow-hidden px-3 pb-3 pt-0 sm:px-5 sm:pb-4 sm:pt-4 lg:px-6"
        style={{ paddingTop: mobileMainTopPadding }}
      >
        <header
          className={[
            'z-50 border-border/70 bg-background/92 backdrop-blur transition-transform duration-200 ease-out',
            isMobileViewport
              ? `fixed top-0 flex items-center justify-between gap-3 rounded-b-2xl border border-t-0 px-3 py-3 ${headerVisibilityClass}`
              : 'mb-4 flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between',
          ].join(' ')}
          style={isMobileViewport ? { left: `${MOBILE_HEADER_SIDE_INSET_PX}px`, right: `${MOBILE_HEADER_SIDE_INSET_PX}px` } : undefined}
        >
          <NavLink
            className="flex min-w-0 shrink items-baseline gap-x-3 gap-y-1 whitespace-nowrap"
            to="/"
          >
            <span className="truncate text-xs font-semibold uppercase tracking-[0.18em] text-foreground sm:text-sm">
              Hiro Liang
            </span>
          </NavLink>

          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
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

            <div className="w-[104px] shrink-0 sm:w-[120px]">
              <Select onValueChange={(value) => setLocale(value as Locale)} value={locale}>
                <SelectTrigger aria-label={t.nav.language} className="h-9 bg-transparent px-2 text-xs sm:text-sm">
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
