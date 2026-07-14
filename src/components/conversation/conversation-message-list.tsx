import type { ReactNode } from 'react'

import { ConversationMessageBubble } from './conversation-message-bubble'
import type { ConversationMessage } from './types'

type ConversationMessageListProps<TMessage extends ConversationMessage = ConversationMessage> = {
  messages: TMessage[]
  panelSlot?: ReactNode
  renderMessageContent?: (message: TMessage) => ReactNode
  streamingLabel: string
}

export function ConversationMessageList<TMessage extends ConversationMessage = ConversationMessage>({
  messages,
  panelSlot,
  renderMessageContent,
  streamingLabel,
}: ConversationMessageListProps<TMessage>) {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <ConversationMessageBubble
          key={message.id}
          message={message}
          renderMessageContent={renderMessageContent}
          streamingLabel={streamingLabel}
        />
      ))}

      {panelSlot}
    </div>
  )
}
