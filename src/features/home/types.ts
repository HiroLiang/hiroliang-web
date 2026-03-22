import { HOME_COMMANDS } from '@/features/home/commands'

export type HomeCommand = (typeof HOME_COMMANDS)[number]

export type HomePanelType = HomeCommand

export type PanelPhase = 'idle' | 'closing' | 'opening'

export type ChatRole = 'user' | 'assistant' | 'system'

export type ChatMessageStatus = 'idle' | 'streaming' | 'error'

export type ChatMessage = {
  id: string
  content: string
  role: ChatRole
  status?: ChatMessageStatus
}

export type ProjectDetailSection = {
  bodyKey: string
  titleKey: string
}

export type ProjectEntry = {
  githubUrl: string
  id: string
  supportsDownloads?: boolean
}
