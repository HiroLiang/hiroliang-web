import type { ReactNode } from 'react'

export function SectionShell({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={[
        'app-panel-shell space-y-4 rounded-[1.6rem] border border-border/80 bg-secondary/45 p-5 shadow-[0_16px_60px_rgba(0,0,0,0.2)] sm:p-6',
        className,
      ].join(' ')}
    >
      {children}
    </section>
  )
}
