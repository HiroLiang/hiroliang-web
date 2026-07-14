import type { ReactNode } from 'react'

import {
  CONVERSATION_MESSAGE_BASE_CLASS_NAME,
  getConversationMessageClassName,
} from './conversation-message-styles'
import { MessageRenderer } from './message-renderer'
import type { ConversationMessage } from './types'

type ConversationMessageBubbleProps<TMessage extends ConversationMessage = ConversationMessage> = {
  message: TMessage
  renderMessageContent?: (message: TMessage) => ReactNode
  streamingLabel: string
}

export function ConversationMessageBubble<TMessage extends ConversationMessage = ConversationMessage>({
  message,
  renderMessageContent,
  streamingLabel,
}: ConversationMessageBubbleProps<TMessage>) {
  const content = message.content || (message.status === 'streaming' ? streamingLabel : '')

  return (
    <div
      className={[
        CONVERSATION_MESSAGE_BASE_CLASS_NAME,
        getConversationMessageClassName(message.role, message.status),
      ].join(' ')}
    >
      {renderMessageContent ? renderMessageContent(message) : <MessageRenderer content={content} />}
    </div>
  )
}
