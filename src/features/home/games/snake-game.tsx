import { type KeyboardEvent, type PointerEvent, useEffect, useRef, useState } from 'react'

import { useMessages } from '@/hooks/use-locale'
import type { SnakeCell, SnakeDirection, SnakeGameState } from '@/features/home/types'
import { useDetectedPlatform } from '@/features/project/use-detected-platform'

const INITIAL_SPEED_MS = 220
const MIN_SPEED_MS = 90
const SPEED_STEP_MS = 12
const HUD_HEIGHT = 44
const VIEW_PADDING = 16
const MAX_SIMULATION_STEPS = 6
const MAX_QUEUED_DIRECTIONS = 2
const MIN_SWIPE_DISTANCE_PX = 20
const MOBILE_MIN_CELL_SIZE_PX = 8
const MOBILE_MAX_CELL_SIZE_PX = 15
const DESKTOP_MIN_CELL_SIZE_PX = 5
const DESKTOP_MAX_CELL_SIZE_PX = 10
const MOBILE_MIN_GRID_COUNT = 12
const BOARD_FRAME_INSET_PX = 8
const MOBILE_HUD_HEIGHT_PX = 18
const MOBILE_HUD_GAP_PX = 8
const MOBILE_TOP_PADDING_PX = 8
const MOBILE_BOTTOM_PADDING_PX = 8
const MOBILE_SIDE_PADDING_PX = 8
const DIRECTION_VECTORS: Record<SnakeDirection, SnakeCell> = {
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  up: { x: 0, y: -1 },
}
const OPPOSITE_DIRECTIONS: Record<SnakeDirection, SnakeDirection> = {
  down: 'up',
  left: 'right',
  right: 'left',
  up: 'down',
}

type CanvasLayout = {
  boardLeft: number
  boardSize: number
  boardTop: number
  cellSize: number
  frameInset: number
  gridCount: number
  height: number
  hudBaseline: number
  hudGap: number
  hudHeight: number
  hudLeft: number
  hudRight: number
  playableHeight: number
  playableWidth: number
  width: number
}

type SnakeRuntime = {
  accumulatorMs: number
  game: SnakeGameState
  lastFrameMs: number | null
}

type PointerStart = {
  x: number
  y: number
}

function getResponsiveGridCount(boardPixelSize: number) {
  if (boardPixelSize >= 920) {
    return 32
  }

  if (boardPixelSize >= 720) {
    return 28
  }

  if (boardPixelSize >= 540) {
    return 24
  }

  return 20
}

function createStartingSnake(gridCount: number) {
  const centerY = Math.floor(gridCount / 2)
  const headX = Math.max(2, Math.floor(gridCount / 3))

  return [
    { x: headX, y: centerY },
    { x: headX - 1, y: centerY },
    { x: headX - 2, y: centerY },
  ]
}

function createRandomFood(snake: readonly SnakeCell[], gridCount: number) {
  const occupied = new Set(snake.map((cell) => `${cell.x}:${cell.y}`))
  const availableCells: SnakeCell[] = []

  for (let y = 0; y < gridCount; y += 1) {
    for (let x = 0; x < gridCount; x += 1) {
      const key = `${x}:${y}`
      if (!occupied.has(key)) {
        availableCells.push({ x, y })
      }
    }
  }

  return availableCells[Math.floor(Math.random() * availableCells.length)] ?? { x: 0, y: 0 }
}

function createInitialSnakeState(gridCount: number, direction: SnakeDirection = 'right'): SnakeGameState {
  const snake = createStartingSnake(gridCount)

  return {
    direction,
    food: createRandomFood(snake, gridCount),
    gridCount,
    score: 0,
    snake,
    speedMs: INITIAL_SPEED_MS,
    status: 'idle',
  }
}

function isOppositeDirection(next: SnakeDirection, current: SnakeDirection) {
  return OPPOSITE_DIRECTIONS[next] === current
}

function enqueueDirection(
  queue: readonly SnakeDirection[],
  currentDirection: SnakeDirection,
  nextDirection: SnakeDirection,
): SnakeDirection[] {
  if (queue.length >= MAX_QUEUED_DIRECTIONS) {
    return [...queue]
  }

  const lastQueuedDirection = queue.at(-1)
  const baselineDirection = lastQueuedDirection ?? currentDirection

  if (isOppositeDirection(nextDirection, baselineDirection) || lastQueuedDirection === nextDirection) {
    return [...queue]
  }

  return [...queue, nextDirection]
}

function resolveSwipeDirection(deltaX: number, deltaY: number) {
  if (Math.abs(deltaX) < MIN_SWIPE_DISTANCE_PX && Math.abs(deltaY) < MIN_SWIPE_DISTANCE_PX) {
    return null
  }

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    return deltaX > 0 ? 'right' : 'left'
  }

  return deltaY > 0 ? 'down' : 'up'
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function computeLayout(width: number, height: number, isMobile: boolean): CanvasLayout {
  const safeWidth = Math.max(width, 160)
  const safeHeight = Math.max(height, 160)
  if (isMobile) {
    const playableWidth = Math.max(
      1,
      safeWidth - (MOBILE_SIDE_PADDING_PX + BOARD_FRAME_INSET_PX) * 2,
    )
    const playableHeight = Math.max(
      1,
      safeHeight -
        MOBILE_TOP_PADDING_PX -
        MOBILE_HUD_HEIGHT_PX -
        MOBILE_HUD_GAP_PX -
        MOBILE_BOTTOM_PADDING_PX -
        BOARD_FRAME_INSET_PX * 2,
    )
    const boardLimit = Math.max(1, Math.floor(Math.min(playableWidth, playableHeight)))
    const preferredCellSize = clamp(
      Math.floor(boardLimit / MOBILE_MIN_GRID_COUNT),
      MOBILE_MIN_CELL_SIZE_PX,
      MOBILE_MAX_CELL_SIZE_PX,
    )
    const gridCount = Math.max(1, Math.floor(boardLimit / preferredCellSize))
    const cellSize = clamp(Math.floor(boardLimit / gridCount), MOBILE_MIN_CELL_SIZE_PX, MOBILE_MAX_CELL_SIZE_PX)
    const adjustedBoardSize = gridCount * cellSize
    const boardLeft = Math.floor((safeWidth - adjustedBoardSize) / 2)
    const boardTop = MOBILE_TOP_PADDING_PX + MOBILE_HUD_HEIGHT_PX + MOBILE_HUD_GAP_PX + BOARD_FRAME_INSET_PX

    return {
      boardLeft,
      boardSize: adjustedBoardSize,
      boardTop,
      cellSize,
      frameInset: BOARD_FRAME_INSET_PX,
      gridCount,
      height: safeHeight,
      hudBaseline: MOBILE_TOP_PADDING_PX + Math.floor(MOBILE_HUD_HEIGHT_PX / 2),
      hudGap: MOBILE_HUD_GAP_PX,
      hudHeight: MOBILE_HUD_HEIGHT_PX,
      hudLeft: boardLeft,
      hudRight: boardLeft + adjustedBoardSize,
      playableHeight,
      playableWidth,
      width: safeWidth,
    }
  }

  const availableWidth = Math.max(safeWidth - VIEW_PADDING * 2, 64)
  const playableHeight = Math.max(safeHeight - HUD_HEIGHT - VIEW_PADDING * 2, 64)
  const maxBoardSize = Math.max(64, Math.floor(Math.min(availableWidth, playableHeight)))
  const targetGridCount = getResponsiveGridCount(maxBoardSize)
  const minimumGridCount = Math.max(8, Math.floor(maxBoardSize / DESKTOP_MAX_CELL_SIZE_PX))
  const maximumGridCount = Math.max(minimumGridCount, Math.floor(maxBoardSize / DESKTOP_MIN_CELL_SIZE_PX))
  const gridCount = clamp(targetGridCount, minimumGridCount, maximumGridCount)
  const cellSize = clamp(Math.floor(maxBoardSize / gridCount), DESKTOP_MIN_CELL_SIZE_PX, DESKTOP_MAX_CELL_SIZE_PX)
  const adjustedBoardSize = gridCount * cellSize
  const boardTop = HUD_HEIGHT + Math.max(VIEW_PADDING, Math.floor((playableHeight - adjustedBoardSize) / 2) + VIEW_PADDING)

  return {
    boardLeft: Math.floor((safeWidth - adjustedBoardSize) / 2),
    boardSize: adjustedBoardSize,
    boardTop,
    cellSize,
    frameInset: BOARD_FRAME_INSET_PX,
    gridCount,
    height: safeHeight,
    hudBaseline: 22,
    hudGap: VIEW_PADDING,
    hudHeight: HUD_HEIGHT,
    hudLeft: VIEW_PADDING,
    hudRight: Math.max(VIEW_PADDING, safeWidth - 140),
    playableHeight: playableHeight,
    playableWidth: availableWidth,
    width: safeWidth,
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

function drawSnakeGame(
  context: CanvasRenderingContext2D,
  layout: CanvasLayout,
  game: SnakeGameState,
  highScore: number,
  labels: {
    gameOver: string
    gameOverHint: string
    highScore: string
    score: string
  },
) {
  const { boardLeft, boardSize, boardTop, cellSize, frameInset, gridCount, height, hudBaseline, hudLeft, hudRight, width } =
    layout

  context.clearRect(0, 0, width, height)

  const background = context.createLinearGradient(0, 0, 0, height)
  background.addColorStop(0, 'rgba(15, 24, 14, 0.98)')
  background.addColorStop(1, 'rgba(9, 17, 10, 1)')
  context.fillStyle = background
  context.fillRect(0, 0, width, height)

  context.strokeStyle = 'rgba(132, 148, 95, 0.32)'
  context.lineWidth = 1
  drawRoundedRect(
    context,
    boardLeft - frameInset,
    boardTop - frameInset,
    boardSize + frameInset * 2,
    boardSize + frameInset * 2,
    18,
  )
  context.stroke()

  context.fillStyle = 'rgba(17, 29, 15, 0.94)'
  drawRoundedRect(
    context,
    boardLeft - frameInset,
    boardTop - frameInset,
    boardSize + frameInset * 2,
    boardSize + frameInset * 2,
    18,
  )
  context.fill()

  context.fillStyle = 'rgba(78, 93, 58, 0.2)'
  for (let index = 0; index <= gridCount; index += 1) {
    const offset = index * cellSize
    context.fillRect(boardLeft + offset, boardTop, 1, boardSize)
    context.fillRect(boardLeft, boardTop + offset, boardSize, 1)
  }

  context.fillStyle = '#f56f51'
  context.fillRect(
    boardLeft + game.food.x * cellSize + 2,
    boardTop + game.food.y * cellSize + 2,
    Math.max(2, cellSize - 4),
    Math.max(2, cellSize - 4),
  )

  game.snake.forEach((segment, index) => {
    context.fillStyle = index === 0 ? '#ffd65c' : '#9abf62'
    context.fillRect(
      boardLeft + segment.x * cellSize + 1,
      boardTop + segment.y * cellSize + 1,
      Math.max(2, cellSize - 2),
      Math.max(2, cellSize - 2),
    )
  })

  context.fillStyle = '#cfd9a3'
  context.font = '600 14px var(--font-family-app), monospace'
  context.textBaseline = 'middle'
  context.textAlign = 'start'
  context.fillText(`${labels.score} ${game.score}`, hudLeft, hudBaseline)
  context.textAlign = 'end'
  context.fillText(`${labels.highScore} ${highScore}`, hudRight, hudBaseline)
  context.textAlign = 'start'

  if (game.status !== 'game-over') {
    return
  }

  context.fillStyle = 'rgba(4, 9, 5, 0.54)'
  drawRoundedRect(context, boardLeft + cellSize, boardTop + boardSize / 2 - 48, boardSize - cellSize * 2, 96, 18)
  context.fill()

  context.fillStyle = '#ffd65c'
  context.font = '700 20px var(--font-family-app), monospace'
  context.textAlign = 'center'
  context.fillText(labels.gameOver, boardLeft + boardSize / 2, boardTop + boardSize / 2 - 10)

  context.fillStyle = '#cfd9a3'
  context.font = '400 12px var(--font-family-app), monospace'
  context.fillText(labels.gameOverHint, boardLeft + boardSize / 2, boardTop + boardSize / 2 + 18)
  context.textAlign = 'start'
}

export function SnakeGame() {
  const t = useMessages()
  const platform = useDetectedPlatform()
  const isMobile = platform === 'mobile'
  const [layout, setLayout] = useState<CanvasLayout>(() => computeLayout(640, 640, false))
  const [game, setGame] = useState<SnakeGameState>(() => createInitialSnakeState(layout.gridCount))
  const [highScore, setHighScore] = useState(0)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const pointerStartRef = useRef<PointerStart | null>(null)
  const runtimeRef = useRef<SnakeRuntime>({
    accumulatorMs: 0,
    game,
    lastFrameMs: null,
  })
  const highScoreRef = useRef(highScore)
  const queuedDirectionRef = useRef<SnakeDirection[]>([])

  useEffect(() => {
    runtimeRef.current.game = game
  }, [game])

  useEffect(() => {
    highScoreRef.current = highScore
  }, [highScore])

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

      setLayout((current) => {
        const nextLayout = computeLayout(entry.contentRect.width, entry.contentRect.height, isMobile)

        if (current.gridCount !== nextLayout.gridCount) {
          const resetGame = createInitialSnakeState(nextLayout.gridCount)
          runtimeRef.current.game = resetGame
          runtimeRef.current.accumulatorMs = 0
          runtimeRef.current.lastFrameMs = null
          queuedDirectionRef.current = []
          setGame(resetGame)
        }

        return nextLayout
      })
    })

    observer.observe(wrapper)

    return () => {
      observer.disconnect()
    }
  }, [isMobile])

  useEffect(() => {
    setHighScore((current) => Math.max(current, game.score))
  }, [game.score])

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }

    const canvasElement = canvasRef.current
    const runtime = runtimeRef.current
    let frameId = 0

    function stepSimulation(current: SnakeGameState): SnakeGameState {
      if (current.status !== 'running') {
        return current
      }

      const nextDirection = queuedDirectionRef.current[0] ?? current.direction
      if (queuedDirectionRef.current.length > 0) {
        queuedDirectionRef.current = queuedDirectionRef.current.slice(1)
      }
      const vector = DIRECTION_VECTORS[nextDirection]
      const head = current.snake[0]
      const nextHead = {
        x: head.x + vector.x,
        y: head.y + vector.y,
      }

      const hitsWall =
        nextHead.x < 0 ||
        nextHead.x >= current.gridCount ||
        nextHead.y < 0 ||
        nextHead.y >= current.gridCount

      if (hitsWall) {
        return {
          ...current,
          direction: nextDirection,
          status: 'game-over',
        }
      }

      const willEatFood = nextHead.x === current.food.x && nextHead.y === current.food.y
      const nextBody = willEatFood ? current.snake : current.snake.slice(0, -1)
      const hitsSelf = nextBody.some((segment) => segment.x === nextHead.x && segment.y === nextHead.y)

      if (hitsSelf) {
        return {
          ...current,
          direction: nextDirection,
          status: 'game-over',
        }
      }

      const nextSnake = [nextHead, ...nextBody]
      const nextScore = willEatFood ? current.score + 1 : current.score

      return {
        direction: nextDirection,
        food: willEatFood ? createRandomFood(nextSnake, current.gridCount) : current.food,
        gridCount: current.gridCount,
        score: nextScore,
        snake: nextSnake,
        speedMs: willEatFood ? Math.max(MIN_SPEED_MS, current.speedMs - SPEED_STEP_MS) : current.speedMs,
        status: 'running',
      }
    }

    function renderFrame() {
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
      drawSnakeGame(context, layout, runtimeRef.current.game, highScoreRef.current, {
        gameOver: t.home.panels.games.snake.gameOver,
        gameOverHint: t.home.panels.games.snake.gameOverHint,
        highScore: t.home.panels.games.snake.highScoreLabel,
        score: t.home.panels.games.snake.scoreLabel,
      })
    }

    function tick(timestamp: number) {
      if (runtime.lastFrameMs === null) {
        runtime.lastFrameMs = timestamp
      } else {
        runtime.accumulatorMs += timestamp - runtime.lastFrameMs
        runtime.lastFrameMs = timestamp
      }

      let nextGame = runtime.game
      let stepCount = 0

      while (
        nextGame.status === 'running' &&
        runtime.accumulatorMs >= nextGame.speedMs &&
        stepCount < MAX_SIMULATION_STEPS
      ) {
        runtime.accumulatorMs -= nextGame.speedMs
        nextGame = stepSimulation(nextGame)
        stepCount += 1
      }

      if (stepCount === MAX_SIMULATION_STEPS && nextGame.status === 'running') {
        runtime.accumulatorMs = 0
      }

      if (nextGame !== runtime.game) {
        runtime.game = nextGame
        if (nextGame.score > highScoreRef.current) {
          highScoreRef.current = nextGame.score
          setHighScore(nextGame.score)
        }
        setGame(nextGame)
      }

      renderFrame()
      frameId = window.requestAnimationFrame(tick)
    }

    frameId = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(frameId)
      runtime.lastFrameMs = null
      runtime.accumulatorMs = 0
    }
  }, [
    layout,
    t.home.panels.games.snake.gameOver,
    t.home.panels.games.snake.gameOverHint,
    t.home.panels.games.snake.highScoreLabel,
    t.home.panels.games.snake.scoreLabel,
  ])

  useEffect(() => {
    wrapperRef.current?.focus()
  }, [])

  function startGame(direction: SnakeDirection) {
    const nextGame: SnakeGameState = {
      ...createInitialSnakeState(layout.gridCount, direction),
      direction,
      status: 'running',
    }
    queuedDirectionRef.current = []
    runtimeRef.current.game = nextGame
    runtimeRef.current.accumulatorMs = 0
    runtimeRef.current.lastFrameMs = null
    setGame(nextGame)
  }

  function queueDirection(nextDirection: SnakeDirection) {
    const current = runtimeRef.current.game

    if (current.status !== 'running') {
      queuedDirectionRef.current = []
      return
    }

    queuedDirectionRef.current = enqueueDirection(queuedDirectionRef.current, current.direction, nextDirection)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const directionByKey: Partial<Record<string, SnakeDirection>> = {
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right',
      ArrowUp: 'up',
    }

    const nextDirection = directionByKey[event.key]
    if (!nextDirection) {
      return
    }

    event.preventDefault()

    if (game.status === 'idle' || game.status === 'game-over') {
      startGame(nextDirection == 'left' ? 'right' : nextDirection)
      return
    }

    queueDirection(nextDirection)
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!isMobile) {
      return
    }

    wrapperRef.current?.focus()
    pointerStartRef.current = {
      x: event.clientX,
      y: event.clientY,
    }
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (!isMobile) {
      return
    }

    const pointerStart = pointerStartRef.current
    pointerStartRef.current = null
    if (!pointerStart) {
      return
    }

    const nextDirection = resolveSwipeDirection(event.clientX - pointerStart.x, event.clientY - pointerStart.y)
    if (!nextDirection) {
      return
    }

    if (game.status === 'idle' || game.status === 'game-over') {
      startGame(nextDirection)
      return
    }

    queueDirection(nextDirection)
  }

  function handlePointerCancel() {
    pointerStartRef.current = null
  }

  return (
    <div className="flex min-h-0 flex-1 overflow-hidden rounded-[1.5rem] border border-border/70 bg-background/20">
      <div
        aria-label={t.home.panels.games.snake.boardLabel}
        className="relative flex min-h-0 flex-1 overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-accent"
        onKeyDown={handleKeyDown}
        onPointerCancel={handlePointerCancel}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        ref={wrapperRef}
        role="application"
        style={isMobile ? { touchAction: 'none' } : undefined}
        tabIndex={0}
      >
        <canvas className="absolute left-0 top-0 block" ref={canvasRef} />
      </div>
    </div>
  )
}
