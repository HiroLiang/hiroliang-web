import type { ConversationMessage } from './types'

export const CONVERSATION_MESSAGE_BASE_CLASS_NAME =
  'max-w-[88%] rounded-[1.35rem] px-4 py-3 text-sm leading-7 shadow-[0_10px_40px_rgba(0,0,0,0.28)]'

export function getConversationMessageClassName(
  role: ConversationMessage['role'],
  status: ConversationMessage['status'] = 'idle',
) {
  if (role === 'user') {
    return 'ml-auto border border-accent/40 bg-accent/90 text-accent-foreground'
  }

  if (status === 'error') {
    return 'mr-auto border border-destructive/40 bg-destructive/10 text-foreground'
  }

  return 'app-assistant-bubble mr-auto border border-border/70 bg-card text-card-foreground'
}
