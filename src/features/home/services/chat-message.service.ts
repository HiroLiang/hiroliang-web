import type { ChatMessage } from '@/features/home/types'

export function createMessage(
  role: ChatMessage['role'],
  content: string,
  status: ChatMessage['status'] = 'idle',
): ChatMessage {
  return {
    content,
    id: crypto.randomUUID(),
    role,
    status,
  }
}
