import { type PointerEvent, useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { useMessages } from '@/hooks/use-locale'
import { useDetectedPlatform } from '@/features/project/use-detected-platform'
import type {
  GomokuBoardController,
  GomokuBoardState,
  GomokuCell,
  GomokuGameState,
  GomokuMode,
  GomokuStone,
} from '@/features/home/types'

const BOARD_SIZE = 15
const VIEW_PADDING = 8
const BOARD_FRAME_INSET = 12
const BOARD_INNER_PADDING = 18
const MOBILE_POINTER_ALIGNMENT_OFFSET = 16
const DIRECTION_PAIRS = [
  [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
  ],
  [
    { x: 0, y: 1 },
    { x: 0, y: -1 },
  ],
  [
    { x: 1, y: 1 },
    { x: -1, y: -1 },
  ],
  [
    { x: 1, y: -1 },
    { x: -1, y: 1 },
  ],
] as const

type CanvasLayout = {
  boardLeft: number
  boardSize: number
  boardTop: number
  height: number
  stoneRadius: number
  width: number
}

type PointerState = {
  previewCell: GomokuCell | null
}

function createEmptyBoard(): GomokuBoardState {
  return Array.from({ length: BOARD_SIZE }, () => Array.from({ length: BOARD_SIZE }, () => null))
}

function createInitialGameState(): GomokuGameState {
  return {
    board: createEmptyBoard(),
    currentTurn: 'black',
    lastMove: null,
    status: 'idle',
    winner: null,
  }
}

function isInsideBoard(cell: GomokuCell) {
  return cell.x >= 0 && cell.x < BOARD_SIZE && cell.y >= 0 && cell.y < BOARD_SIZE
}

function getAvailableMoves(board: GomokuBoardState) {
  const moves: GomokuCell[] = []

  for (let y = 0; y < BOARD_SIZE; y += 1) {
    for (let x = 0; x < BOARD_SIZE; x += 1) {
      if (board[y]?.[x] === null) {
        moves.push({ x, y })
      }
    }
  }

  return moves
}

function getNextTurn(stone: GomokuStone): GomokuStone {
  return stone === 'black' ? 'white' : 'black'
}

function countDirection(board: GomokuBoardState, origin: GomokuCell, stone: GomokuStone, dx: number, dy: number) {
  let count = 0
  let nextX = origin.x + dx
  let nextY = origin.y + dy

  while (isInsideBoard({ x: nextX, y: nextY }) && board[nextY]?.[nextX] === stone) {
    count += 1
    nextX += dx
    nextY += dy
  }

  return count
}

function hasFiveInRow(board: GomokuBoardState, cell: GomokuCell, stone: GomokuStone) {
  return DIRECTION_PAIRS.some(([forward, backward]) => {
    const count =
      1 +
      countDirection(board, cell, stone, forward.x, forward.y) +
      countDirection(board, cell, stone, backward.x, backward.y)

    return count >= 5
  })
}

function placeStoneInGame(current: GomokuGameState, cell: GomokuCell): GomokuGameState | null {
  if (current.status === 'won' || current.status === 'draw') {
    return null
  }

  if (!isInsideBoard(cell) || current.board[cell.y]?.[cell.x] !== null) {
    return null
  }

  const nextBoard = current.board.map((row) => [...row])
  nextBoard[cell.y][cell.x] = current.currentTurn
  const winner = hasFiveInRow(nextBoard, cell, current.currentTurn) ? current.currentTurn : null
  const hasOpenMoves = getAvailableMoves(nextBoard).length > 0

  return {
    board: nextBoard,
    currentTurn: winner ? current.currentTurn : getNextTurn(current.currentTurn),
    lastMove: cell,
    status: winner ? 'won' : hasOpenMoves ? 'playing' : 'draw',
    winner,
  }
}

function computeLayout(width: number, height: number, isMobile: boolean): CanvasLayout {
  const safeWidth = Math.max(width, 220)
  const safeHeight = Math.max(height, 220)
  const horizontalPadding = isMobile ? 0 : VIEW_PADDING * 2
  const verticalPadding = isMobile ? 4 : VIEW_PADDING * 2
  const availableWidth = Math.max(160, safeWidth - horizontalPadding)
  const availableHeight = Math.max(160, safeHeight - verticalPadding)
  const boardSize = Math.max(180, Math.floor(Math.min(availableWidth, availableHeight)))
  const boardLeft = Math.floor((safeWidth - boardSize) / 2)
  const boardTop = Math.floor((safeHeight - boardSize) / 2)
  const gridSpacing = (boardSize - BOARD_INNER_PADDING * 2) / (BOARD_SIZE - 1)

  return {
    boardLeft,
    boardSize,
    boardTop,
    height: safeHeight,
    stoneRadius: Math.max(6, Math.floor(gridSpacing * 0.42)),
    width: safeWidth,
  }
}

function getBoardMetrics(layout: CanvasLayout) {
  const playableSize = layout.boardSize - BOARD_INNER_PADDING * 2
  const spacing = playableSize / (BOARD_SIZE - 1)

  return {
    maxX: layout.boardLeft + BOARD_INNER_PADDING + spacing * (BOARD_SIZE - 1),
    maxY: layout.boardTop + BOARD_INNER_PADDING + spacing * (BOARD_SIZE - 1),
    minX: layout.boardLeft + BOARD_INNER_PADDING,
    minY: layout.boardTop + BOARD_INNER_PADDING,
    spacing,
  }
}

function resolveCellFromPointer(
  layout: CanvasLayout,
  clientX: number,
  clientY: number,
  wrapper: HTMLDivElement,
  isMobile: boolean,
) {
  const bounds = wrapper.getBoundingClientRect()
  const pointerOffset = isMobile ? MOBILE_POINTER_ALIGNMENT_OFFSET : 0
  const localX = clientX - bounds.left - pointerOffset
  const localY = clientY - bounds.top - pointerOffset
  const metrics = getBoardMetrics(layout)
  const maxDistance = metrics.spacing * 0.45

  if (
    localX < metrics.minX - maxDistance ||
    localX > metrics.maxX + maxDistance ||
    localY < metrics.minY - maxDistance ||
    localY > metrics.maxY + maxDistance
  ) {
    return null
  }

  const boardX = Math.round((localX - metrics.minX) / metrics.spacing)
  const boardY = Math.round((localY - metrics.minY) / metrics.spacing)
  const cell = {
    x: boardX,
    y: boardY,
  }

  if (!isInsideBoard(cell)) {
    return null
  }

  const targetX = metrics.minX + cell.x * metrics.spacing
  const targetY = metrics.minY + cell.y * metrics.spacing
  const deltaX = localX - targetX
  const deltaY = localY - targetY

  if (Math.hypot(deltaX, deltaY) > maxDistance) {
    return null
  }

  return cell
}

function getIntersectionPosition(layout: CanvasLayout, cell: GomokuCell) {
  const metrics = getBoardMetrics(layout)

  return {
    x: metrics.minX + cell.x * metrics.spacing,
    y: metrics.minY + cell.y * metrics.spacing,
  }
}

function drawRoundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath()
  context.moveTo(x + radius, y)
  context.arcTo(x + width, y, x + width, y + height, radius)
  context.arcTo(x + width, y + height, x, y + height, radius)
  context.arcTo(x, y + height, x, y, radius)
  context.arcTo(x, y, x + width, y, radius)
  context.closePath()
}

function getStoneTextColor(stone: GomokuStone) {
  return stone === 'black' ? '#f5e5b8' : '#2f2618'
}

function drawStone(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  stone: GomokuStone,
  opacity = 1,
) {
  context.save()
  context.globalAlpha = opacity
  const fill = context.createRadialGradient(x - radius * 0.35, y - radius * 0.35, radius * 0.1, x, y, radius)
  if (stone === 'black') {
    fill.addColorStop(0, '#4d4338')
    fill.addColorStop(1, '#14110f')
  } else {
    fill.addColorStop(0, '#fffef8')
    fill.addColorStop(1, '#ded6c7')
  }
  context.fillStyle = fill
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2)
  context.fill()
  context.restore()
}

function drawGomokuGame(
  context: CanvasRenderingContext2D,
  layout: CanvasLayout,
  game: GomokuGameState,
  previewCell: GomokuCell | null,
  labels: {
    stoneNames: Record<GomokuStone, string>
    winnerMessage: (stone: GomokuStone) => string
  },
) {
  context.clearRect(0, 0, layout.width, layout.height)

  const frameLeft = layout.boardLeft - BOARD_FRAME_INSET
  const frameTop = layout.boardTop - BOARD_FRAME_INSET
  const frameSize = layout.boardSize + BOARD_FRAME_INSET * 2

  context.fillStyle = '#b88452'
  drawRoundedRect(context, frameLeft, frameTop, frameSize, frameSize, 22)
  context.fill()

  const boardGradient = context.createLinearGradient(0, layout.boardTop, 0, layout.boardTop + layout.boardSize)
  boardGradient.addColorStop(0, '#ddb16d')
  boardGradient.addColorStop(1, '#be8347')
  context.fillStyle = boardGradient
  drawRoundedRect(context, layout.boardLeft, layout.boardTop, layout.boardSize, layout.boardSize, 18)
  context.fill()

  const metrics = getBoardMetrics(layout)

  context.strokeStyle = 'rgba(76, 43, 18, 0.72)'
  context.lineWidth = 1
  for (let index = 0; index < BOARD_SIZE; index += 1) {
    const offset = metrics.spacing * index
    const x = metrics.minX + offset
    const y = metrics.minY + offset
    context.beginPath()
    context.moveTo(metrics.minX, y)
    context.lineTo(metrics.maxX, y)
    context.stroke()
    context.beginPath()
    context.moveTo(x, metrics.minY)
    context.lineTo(x, metrics.maxY)
    context.stroke()
  }

  const starPoints = [3, 7, 11]
  context.fillStyle = 'rgba(70, 40, 18, 0.8)'
  starPoints.forEach((y) => {
    starPoints.forEach((x) => {
      const point = getIntersectionPosition(layout, { x, y })
      context.beginPath()
      context.arc(point.x, point.y, Math.max(2, layout.stoneRadius * 0.18), 0, Math.PI * 2)
      context.fill()
    })
  })

  game.board.forEach((row, y) => {
    row.forEach((stone, x) => {
      if (!stone) {
        return
      }

      const point = getIntersectionPosition(layout, { x, y })
      drawStone(context, point.x, point.y, layout.stoneRadius, stone)

      if (game.lastMove?.x === x && game.lastMove.y === y) {
        context.fillStyle = getStoneTextColor(stone)
        context.beginPath()
        context.arc(point.x, point.y, Math.max(2, layout.stoneRadius * 0.18), 0, Math.PI * 2)
        context.fill()
      }
    })
  })

  if (previewCell && game.status !== 'won' && game.status !== 'draw' && game.board[previewCell.y]?.[previewCell.x] === null) {
    const point = getIntersectionPosition(layout, previewCell)
    drawStone(context, point.x, point.y, layout.stoneRadius, game.currentTurn, 0.4)
  }

  if (game.status === 'won' && game.winner) {
    const isCompactLayout = layout.width < 640
    const bannerWidth = Math.min(layout.boardSize - 24, isCompactLayout ? 220 : 280)
    const bannerHeight = isCompactLayout ? 42 : 48
    const bannerLeft = layout.boardLeft + Math.floor((layout.boardSize - bannerWidth) / 2)
    const bannerTop = layout.boardTop + Math.floor((layout.boardSize - bannerHeight) / 2)

    context.fillStyle = 'rgba(22, 16, 12, 0.84)'
    drawRoundedRect(context, bannerLeft, bannerTop, bannerWidth, bannerHeight, 16)
    context.fill()

    context.fillStyle = '#f3dfb2'
    context.font = isCompactLayout ? '600 16px var(--font-family-app), monospace' : '600 18px var(--font-family-app), monospace'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(labels.winnerMessage(game.winner), bannerLeft + bannerWidth / 2, bannerTop + bannerHeight / 2)
    context.textAlign = 'start'
    context.textBaseline = 'alphabetic'
  }
}

export function GomokuGame() {
  const t = useMessages()
  const platform = useDetectedPlatform()
  const isMobile = platform === 'mobile'
  const [mode, setMode] = useState<GomokuMode>('local')
  const [layout, setLayout] = useState<CanvasLayout>(() => computeLayout(640, 640, false))
  const [game, setGame] = useState<GomokuGameState>(() => createInitialGameState())
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

      setLayout(computeLayout(entry.contentRect.width, entry.contentRect.height, isMobile))
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
    setGame(createInitialGameState())
    setPointerState({
      previewCell: null,
    })
  }

  const boardController: GomokuBoardController = {
    board: game.board,
    currentTurn: game.currentTurn,
    getAvailableMoves: () => getAvailableMoves(gameRef.current.board),
    placeStone: (cell) => {
      const nextGame = placeStoneInGame(gameRef.current, cell)
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

    const targetCell = resolveCellFromPointer(layout, event.clientX, event.clientY, wrapper, isMobile)
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
