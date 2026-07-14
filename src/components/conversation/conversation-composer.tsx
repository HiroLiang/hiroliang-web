import type { KeyboardEvent, RefObject } from 'react'

import { Button } from '@/components/ui/button'

type ConversationComposerProps = {
  disabled: boolean
  inputValue: string
  onChange: (value: string) => void
  onCompositionEnd: () => void
  onCompositionStart: () => void
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => Promise<void> | void
  placeholder: string
  sendLabel: string
  streamingLabel: string
  textareaRef: RefObject<HTMLTextAreaElement | null>
}

export function ConversationComposer({
  disabled,
  inputValue,
  onChange,
  onCompositionEnd,
  onCompositionStart,
  onKeyDown,
  placeholder,
  sendLabel,
  streamingLabel,
  textareaRef,
}: ConversationComposerProps) {
  return (
    <div className="app-composer-shell flex items-end gap-3 rounded-[1.5rem] border border-border/70 bg-secondary/65 p-3">
      <textarea
        ref={textareaRef}
        className="min-h-24 flex-1 resize-none rounded-[1.2rem] border border-border/70 bg-background/50 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        onCompositionEnd={onCompositionEnd}
        onCompositionStart={onCompositionStart}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        rows={3}
        value={inputValue}
      />
      <Button className="h-11 px-6" disabled={disabled || !inputValue.trim()} type="submit">
        {disabled ? streamingLabel : sendLabel}
      </Button>
    </div>
  )
}
