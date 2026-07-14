import { forwardRef, type ReactNode } from 'react'

export const ConversationViewport = forwardRef<HTMLDivElement, { children: ReactNode; isAppScrollRoot?: boolean }>(
  ({ children, isAppScrollRoot = true }, ref) => (
    <div
      className="hide-scrollbar min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5"
      data-app-scroll-root={isAppScrollRoot ? 'true' : undefined}
      ref={ref}
    >
      {children}
    </div>
  ),
)

ConversationViewport.displayName = 'ConversationViewport'
