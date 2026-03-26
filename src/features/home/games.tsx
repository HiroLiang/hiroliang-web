import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { GomokuGame } from '@/features/home/games/gomoku-game'
import { SnakeGame } from '@/features/home/games/snake-game'
import { useMessages } from '@/hooks/use-locale'
import type { GameEntry } from '@/features/home/types'

const GAME_ENTRIES: readonly GameEntry[] = [{ id: 'gomoku' }, { id: 'snake' }] as const

export function GamesPanel() {
  const t = useMessages()
  const [selectedGameId, setSelectedGameId] = useState<GameEntry['id'] | null>(null)

  return (
    <div className="min-h-0 space-y-4">
      {!selectedGameId ? (
        <section className="space-y-4 rounded-[1.6rem] border border-border/80 bg-secondary/45 p-5 shadow-[0_16px_60px_rgba(0,0,0,0.2)] sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {t.home.panels.games.eyebrow}
          </p>
          <h2 className="text-2xl font-semibold leading-tight tracking-[-0.02em] text-foreground">
            {t.home.panels.games.title}
          </h2>
          <p className="text-base leading-8 text-muted-foreground">{t.home.panels.games.description}</p>

          <div className="grid gap-3">
            {GAME_ENTRIES.map((game) => (
              <button
                key={game.id}
                className="rounded-[1.3rem] border border-border/70 bg-background/35 px-4 py-4 text-left transition-colors hover:bg-secondary"
                onClick={() => setSelectedGameId(game.id)}
                type="button"
              >
                <p className="text-base font-semibold text-foreground">{t.home.panels.games.entries[game.id].title}</p>
                <p className="pt-1 text-sm leading-7 text-muted-foreground">
                  {t.home.panels.games.entries[game.id].description}
                </p>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {selectedGameId === 'snake' ? (
        <div className="min-h-0 space-y-4">
          <div className="flex">
            <Button onClick={() => setSelectedGameId(null)} type="button" variant="ghost">
              {t.home.panels.games.backToGames}
            </Button>
          </div>

          <section className="flex h-[min(72vh,48rem)] min-h-[22rem] flex-col overflow-hidden rounded-[1.6rem] border border-border/80 bg-secondary/45 p-3 shadow-[0_16px_60px_rgba(0,0,0,0.2)] sm:p-4">
            <SnakeGame />
          </section>
        </div>
      ) : null}

      {selectedGameId === 'gomoku' ? (
        <div className="min-h-0 space-y-4">
          <div className="flex">
            <Button onClick={() => setSelectedGameId(null)} type="button" variant="ghost">
              {t.home.panels.games.backToGames}
            </Button>
          </div>

          <section className="flex h-[min(78vh,52rem)] min-h-[24rem] flex-col overflow-hidden rounded-[1.6rem] border border-border/80 bg-secondary/45 p-1 shadow-[0_16px_60px_rgba(0,0,0,0.2)] sm:p-4">
            <GomokuGame />
          </section>
        </div>
      ) : null}
    </div>
  )
}
