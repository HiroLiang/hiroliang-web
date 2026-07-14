import { ConversationInlineMenu } from '@/components/conversation'
import { formatHomeCommand } from '@/features/home/data/home-commands'
import type { HomeCommand } from '@/features/home/types'

type CommandMenuProps = {
  commands: HomeCommand[]
  highlightedCommandIndex: number
  onHighlight: (index: number) => void
  onSelect: (command: HomeCommand) => void
}

export function CommandMenu({ commands, highlightedCommandIndex, onHighlight, onSelect }: CommandMenuProps) {
  return (
    <ConversationInlineMenu
      getKey={(command) => command}
      highlightedIndex={highlightedCommandIndex}
      items={commands}
      onHighlight={onHighlight}
      onSelect={onSelect}
      renderLabel={formatHomeCommand}
      renderMeta={() => 'command'}
    />
  )
}
