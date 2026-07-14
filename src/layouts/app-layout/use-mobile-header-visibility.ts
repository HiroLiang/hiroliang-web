import { useEffect, useRef, useState } from 'react'

import {
  MOBILE_BREAKPOINT_QUERY,
  MOBILE_HEADER_HIDE_DELTA_PX,
  MOBILE_HEADER_SHOW_DELTA_PX,
} from '@/layouts/app-layout/constants'

export function useMobileHeaderVisibility(locationKey: string) {
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

    // 繁中：手機 navbar 不直接拖曳，而是觀察目前頁面的 scroll root。
    // English: The mobile navbar follows the active page scroll root instead of navbar dragging.
    // 日本語：モバイル navbar は直接ドラッグせず、現在ページの scroll root を監視します。
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
  }, [isMobileHeaderVisible, isMobileViewport, locationKey])

  return {
    isMobileHeaderVisible,
    isMobileViewport,
  }
}
