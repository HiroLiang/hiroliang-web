import { MessageRenderer } from '@/components/conversation'
import type { ChatMessage } from '@/features/home/types'

export function renderHomeMessageContent(message: ChatMessage, streamingLabel: string) {
  if (message.role === 'assistant' && message.content) {
    return <MessageRenderer content={message.content} mode="markdown" />
  }

  return (
    <MessageRenderer content={message.content || (message.status === 'streaming' ? streamingLabel : '')} />
  )
}
