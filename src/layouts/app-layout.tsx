import { Outlet, useLocation } from 'react-router-dom'

import { AppHeader } from '@/layouts/app-layout/app-header'
import { useMobileHeaderVisibility } from '@/layouts/app-layout/use-mobile-header-visibility'

export function AppLayout() {
  const location = useLocation()
  const { isMobileHeaderVisible, isMobileViewport } = useMobileHeaderVisibility(location.pathname)

  const mobileMainTopPadding = isMobileViewport ? (isMobileHeaderVisible ? 76 : 10) : 0

  return (
    <div className="h-screen overflow-hidden bg-background text-foreground">
      <div
        className="flex h-screen w-full flex-col overflow-hidden pt-0"
        style={{ paddingTop: mobileMainTopPadding }}
      >
        <AppHeader isMobileHeaderVisible={isMobileHeaderVisible} isMobileViewport={isMobileViewport} />

        <main className="flex min-h-0 flex-1 overflow-hidden px-3 pb-3 sm:px-5 sm:pb-4 lg:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
