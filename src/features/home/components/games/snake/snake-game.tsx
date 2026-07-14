import { type KeyboardEvent, type PointerEvent, useEffect, useRef, useState } from 'react'

import { useMessages } from '@/hooks/use-locale'
import type { SnakeDirection, SnakeGameState } from '@/features/home/types'
import { useDetectedPlatform } from '@/features/project/hooks/use-detected-platform'

import { MAX_SIMULATION_STEPS } from './snake-game.constants'
import { computeSnakeLayout, type SnakeCanvasLayout } from './snake-game-layout'
import {
  createInitialSnakeState,
  enqueueSnakeDirection,
  resolveSnakeSwipeDirection,
  stepSnakeSimulation,
} from './snake-game-model'
import { drawSnakeGame } from './snake-game-renderer'

type SnakeRuntime = {
  accumulatorMs: number
  game: SnakeGameState
  lastFrameMs: number | null
}

type PointerStart = {
  x: number
  y: number
}

export function SnakeGame() {
  const t = useMessages()
  const platform = useDetectedPlatform()
  const isMobile = platform === 'mobile'
  const [layout, setLayout] = useState<SnakeCanvasLayout>(() => computeSnakeLayout(640, 640, false))
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
        const nextLayout = computeSnakeLayout(entry.contentRect.width, entry.contentRect.height, isMobile)

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

      // 繁中：每幀最多模擬固定步數，避免背景分頁回來後一次追太多步。
      // English: A frame caps catch-up steps so returning from a background tab stays stable.
      // 日本語：バックグラウンド復帰時に進みすぎないよう、1 フレームの追跡ステップ数を制限します。
      while (
        nextGame.status === 'running' &&
        runtime.accumulatorMs >= nextGame.speedMs &&
        stepCount < MAX_SIMULATION_STEPS
      ) {
        runtime.accumulatorMs -= nextGame.speedMs
        const nextDirection = queuedDirectionRef.current[0] ?? nextGame.direction
        if (queuedDirectionRef.current.length > 0) {
          queuedDirectionRef.current = queuedDirectionRef.current.slice(1)
        }
        nextGame = stepSnakeSimulation(nextGame, nextDirection)
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

    queuedDirectionRef.current = enqueueSnakeDirection(queuedDirectionRef.current, current.direction, nextDirection)
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

    const nextDirection = resolveSnakeSwipeDirection(event.clientX - pointerStart.x, event.clientY - pointerStart.y)
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
