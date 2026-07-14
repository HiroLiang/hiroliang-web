export type ConversationMessageRole = 'user' | 'assistant' | 'system'
export type ConversationMessageStatus = 'idle' | 'streaming' | 'error'
export type ConversationPanelPhase = 'idle' | 'closing' | 'opening'

export type ConversationMessage = {
  id: string
  content: string
  role: ConversationMessageRole
  status?: ConversationMessageStatus
}
