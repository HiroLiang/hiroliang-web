import type { ReactNode } from 'react'

type ConversationInlineMenuProps<TItem> = {
  getKey: (item: TItem) => string
  highlightedIndex: number
  items: TItem[]
  onHighlight: (index: number) => void
  onSelect: (item: TItem) => void
  renderLabel: (item: TItem) => ReactNode
  renderMeta?: (item: TItem) => ReactNode
}

export function ConversationInlineMenu<TItem>({
  getKey,
  highlightedIndex,
  items,
  onHighlight,
  onSelect,
  renderLabel,
  renderMeta,
}: ConversationInlineMenuProps<TItem>) {
  return (
    <div className="app-command-menu absolute inset-x-0 bottom-[calc(100%+0.75rem)] rounded-[1.4rem] border border-border/80 bg-background/95 p-2 shadow-[0_18px_60px_rgba(0,0,0,0.42)] backdrop-blur">
      <div className="space-y-1">
        {items.map((item, index) => {
          const isHighlighted = index === highlightedIndex

          return (
            <button
              key={getKey(item)}
              className={[
                'flex w-full items-center justify-between rounded-[1rem] px-3 py-2 text-left text-sm transition-colors',
                isHighlighted ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-secondary',
              ].join(' ')}
              onClick={() => onSelect(item)}
              onMouseEnter={() => onHighlight(index)}
              type="button"
            >
              <span>{renderLabel(item)}</span>
              {renderMeta ? (
                <span
                  className={[
                    'text-[11px] uppercase tracking-[0.18em]',
                    isHighlighted ? 'text-accent-foreground/80' : 'text-muted-foreground',
                  ].join(' ')}
                >
                  {renderMeta(item)}
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}
