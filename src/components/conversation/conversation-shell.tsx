import type { ReactNode } from 'react'

export function ConversationShell({ children }: { children: ReactNode }) {
  return (
    <section className="flex min-h-0 flex-1 overflow-hidden">
      <div className="app-chat-shell crt-shell flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden rounded-[2rem] border border-border/80">
        {children}
      </div>
    </section>
  )
}
