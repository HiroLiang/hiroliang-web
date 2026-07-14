import { type PointerEvent, useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { useMessages } from '@/hooks/use-locale'
import { useDetectedPlatform } from '@/features/project/hooks/use-detected-platform'
import type {
  GomokuBoardController,
  GomokuCell,
  GomokuGameState,
  GomokuMode,
} from '@/features/home/types'

import {
  createInitialGomokuGameState,
  getAvailableGomokuMoves,
  placeStoneInGomokuGame,
} from './gomoku-game-model'
import {
  computeGomokuLayout,
  resolveGomokuCellFromPointer,
  type GomokuCanvasLayout,
} from './gomoku-game-layout'
import { drawGomokuGame } from './gomoku-game-renderer'

type PointerState = {
  previewCell: GomokuCell | null
}

export function GomokuGame() {
  const t = useMessages()
  const platform = useDetectedPlatform()
  const isMobile = platform === 'mobile'
  const [mode, setMode] = useState<GomokuMode>('local')
  const [layout, setLayout] = useState<GomokuCanvasLayout>(() => computeGomokuLayout(640, 640, false))
  const [game, setGame] = useState<GomokuGameState>(() => createInitialGomokuGameState())
  const [pointerState, setPointerState] = useState<PointerState>({
    previewCell: null,
  })
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const gameRef = useRef(game)

  useEffect(() => {
    gameRef.current = game
  }, [game])

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) {
      return
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) {
        return
      }

      setLayout(computeGomokuLayout(entry.contentRect.width, entry.contentRect.height, isMobile))
    })

    observer.observe(wrapper)

    return () => {
      observer.disconnect()
    }
  }, [isMobile])

  useEffect(() => {
    const canvasElement = canvasRef.current
    if (!canvasElement) {
      return
    }

    const context = canvasElement.getContext('2d')
    if (!context) {
      return
    }

    const ratio = window.devicePixelRatio || 1
    const targetWidth = Math.floor(layout.width * ratio)
    const targetHeight = Math.floor(layout.height * ratio)

    if (canvasElement.width !== targetWidth || canvasElement.height !== targetHeight) {
      canvasElement.width = targetWidth
      canvasElement.height = targetHeight
      canvasElement.style.width = `${layout.width}px`
      canvasElement.style.height = `${layout.height}px`
    }

    context.setTransform(ratio, 0, 0, ratio, 0, 0)
    drawGomokuGame(context, layout, game, pointerState.previewCell, {
      stoneNames: t.home.panels.games.gomoku.stoneLabels,
      winnerMessage: (stone) => `${t.home.panels.games.gomoku.stoneLabels[stone]} ${t.home.panels.games.gomoku.winnerLabel}`,
    })
  }, [
    game,
    isMobile,
    layout,
    mode,
    pointerState.previewCell,
    t.home.panels.games.gomoku.stoneLabels,
    t.home.panels.games.gomoku.winnerLabel,
  ])

  useEffect(() => {
    setPointerState({
      previewCell: null,
    })
  }, [mode])

  function resetGame() {
    setGame(createInitialGomokuGameState())
    setPointerState({
      previewCell: null,
    })
  }

  const boardController: GomokuBoardController = {
    board: game.board,
    currentTurn: game.currentTurn,
    getAvailableMoves: () => getAvailableGomokuMoves(gameRef.current.board),
    placeStone: (cell) => {
      const nextGame = placeStoneInGomokuGame(gameRef.current, cell)
      if (!nextGame) {
        return false
      }

      gameRef.current = nextGame
      setGame(nextGame)
      return true
    },
  }

  function resolvePreviewCell(event: PointerEvent<HTMLDivElement>) {
    const wrapper = wrapperRef.current
    if (!wrapper || mode !== 'local') {
      return null
    }

    const targetCell = resolveGomokuCellFromPointer(layout, event.clientX, event.clientY, wrapper, isMobile)
    if (!targetCell) {
      return null
    }

    return boardController.board[targetCell.y]?.[targetCell.x] === null ? targetCell : null
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    wrapperRef.current?.focus()
    const nextPreviewCell = resolvePreviewCell(event)
    setPointerState({
      previewCell: nextPreviewCell,
    })
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    setPointerState((current) => ({
      ...current,
      previewCell: resolvePreviewCell(event),
    }))
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    const releaseCell = resolvePreviewCell(event)

    if (releaseCell) {
      boardController.placeStone(releaseCell)
    }

    setPointerState({
      previewCell: null,
    })
  }

  function handlePointerLeave() {
    setPointerState((current) => ({
      ...current,
      previewCell: null,
    }))
  }

  function handlePointerCancel() {
    setPointerState({
      previewCell: null,
    })
  }

  const modeLabels = t.home.panels.games.gomoku.modeLabels
  const stoneLabels = t.home.panels.games.gomoku.stoneLabels
  const statusText = `${t.home.panels.games.gomoku.currentTurnLabel} ${stoneLabels[game.currentTurn]}`

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden p-0 sm:p-2">
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 sm:gap-3">
        <div className="flex flex-wrap gap-2">
          {(['local', 'cpu', 'online'] as const).map((modeId) => {
            const isLocked = modeId !== 'local'
            const isSelected = modeId === mode

            return (
              <button
                aria-pressed={isSelected}
                className={[
                  'rounded-full border px-3 py-2 text-sm transition-colors',
                  isSelected
                    ? 'border-accent bg-accent/15 text-foreground'
                    : 'border-border/70 bg-background/25 text-muted-foreground',
                  isLocked ? 'cursor-not-allowed opacity-70' : 'hover:bg-secondary',
                ].join(' ')}
                disabled={isLocked}
                key={modeId}
                onClick={() => setMode(modeId)}
                type="button"
              >
                {modeLabels[modeId]}
                {isLocked ? <span className="ml-2 text-xs text-accent">{t.home.panels.games.gomoku.comingSoon}</span> : null}
              </button>
            )
          })}
        </div>

        <Button onClick={resetGame} type="button" variant="outline">
          {t.home.panels.games.gomoku.reset}
        </Button>
      </div>

      <div className="px-1 text-sm text-muted-foreground">{statusText}</div>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <div
          aria-label={t.home.panels.games.gomoku.boardLabel}
          className="relative flex min-h-0 flex-1 overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-accent"
          onPointerCancel={handlePointerCancel}
          onPointerDown={handlePointerDown}
          onPointerLeave={handlePointerLeave}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          ref={wrapperRef}
          role="application"
          style={{ touchAction: 'none' }}
          tabIndex={0}
        >
          <canvas className="absolute left-0 top-0 block" ref={canvasRef} />
        </div>
      </div>
    </div>
  )
}
