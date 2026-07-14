import type { ReactNode } from 'react'

import type { ConversationPanelPhase } from './types'

type ConversationPanelSlotProps = {
  children: ReactNode
  isActive: boolean
  phase: ConversationPanelPhase
}

export function ConversationPanelSlot({ children, isActive, phase }: ConversationPanelSlotProps) {
  return (
    <div
      aria-hidden={!isActive}
      className={[
        'origin-center overflow-hidden transition-all duration-300 ease-out',
        isActive ? 'pointer-events-auto' : 'pointer-events-none',
        phase === 'closing' || !isActive
          ? 'max-h-0 scale-y-0 opacity-0'
          : 'max-h-[9999px] scale-y-100 opacity-100',
      ].join(' ')}
    >
      {isActive ? children : null}
    </div>
  )
}
