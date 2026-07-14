import type { FormEvent, KeyboardEvent, RefObject } from 'react'

import type { ChatMessage, HomeCommand, HomePanelType, PanelPhase } from '@/features/home/types'

export type HomeChatController = {
  activePanel: HomePanelType | null
  applyCommandSelection: (command: HomeCommand) => void
  filteredCommands: HomeCommand[]
  handleComposerChange: (value: string) => void
  handleCompositionEnd: () => void
  handleCompositionStart: () => void
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>
  handleTextareaKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => Promise<void>
  highlightedCommandIndex: number
  inputValue: string
  isAnyStreaming: boolean
  isCommandMenuOpen: boolean
  messages: ChatMessage[]
  panelPhase: PanelPhase
  panelResetToken: number
  scrollViewportRef: RefObject<HTMLDivElement | null>
  setHighlightedCommandIndex: (index: number) => void
  streamingComposerText: string
  textareaRef: RefObject<HTMLTextAreaElement | null>
}
