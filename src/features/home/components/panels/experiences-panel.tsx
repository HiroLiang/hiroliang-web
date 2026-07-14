import {
  CONVERSATION_MESSAGE_BASE_CLASS_NAME,
  getConversationMessageClassName,
} from '@/components/conversation'
import { useMessages } from '@/hooks/use-locale'

import { SectionShell } from '@/components/ui/section-shell'

export function ExperiencesPanel() {
  const t = useMessages()
  const notes = t.home.experience.notes

  return (
    <SectionShell>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        {t.home.experience.eyebrow}
      </p>
      <h2 className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-foreground">
        {t.home.experience.title}
      </h2>
      <p className="text-base leading-8 text-muted-foreground">{t.home.panels.experiences.description}</p>

      <div className="space-y-4 pt-2">
        {notes.map((note, index) => (
          <div
            key={`${t.home.experience.eyebrow}-${note.date}-${index}`}
            className={[
              CONVERSATION_MESSAGE_BASE_CLASS_NAME,
              getConversationMessageClassName('assistant'),
            ].join(' ')}
          >
            <p className="text-xs font-semibold tracking-[0.18em] text-accent">{note.date}</p>
            <p className="pt-2 text-base leading-8 whitespace-pre-wrap">{note.body}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}
