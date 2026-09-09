import {
  CONVERSATION_MESSAGE_BASE_CLASS_NAME,
  MessageRenderer,
  getConversationMessageClassName,
} from '@/components/conversation'
import type { HomeNote } from '@/features/home/models/home-note'

export function NoteCard({ note }: { note: HomeNote }) {
  return (
    <article
      className={[
        CONVERSATION_MESSAGE_BASE_CLASS_NAME,
        getConversationMessageClassName('assistant'),
      ].join(' ')}
    >
      <p className="text-xs font-semibold tracking-[0.18em] text-accent">{note.date}</p>
      <div className="pt-2 text-base leading-8">
        <MessageRenderer content={note.body} mode="markdown" />
      </div>
    </article>
  )
}
