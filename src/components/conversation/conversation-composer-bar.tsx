import type { FormEvent, ReactNode } from 'react'

export function ConversationComposerBar({
  children,
  onSubmit,
}: {
  children: ReactNode
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void> | void
}) {
  return (
    <form className="border-t border-border/70 px-4 py-4 sm:px-5" onSubmit={onSubmit}>
      <div className="relative">{children}</div>
    </form>
  )
}
