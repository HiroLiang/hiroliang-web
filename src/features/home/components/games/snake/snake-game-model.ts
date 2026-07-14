import type { SnakeCell, SnakeDirection, SnakeGameState } from '@/features/home/types'

import {
  INITIAL_SPEED_MS,
  MAX_QUEUED_DIRECTIONS,
  MIN_SPEED_MS,
  MIN_SWIPE_DISTANCE_PX,
  SPEED_STEP_MS,
} from './snake-game.constants'

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

export function createInitialSnakeState(gridCount: number, direction: SnakeDirection = 'right'): SnakeGameState {
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

export function enqueueSnakeDirection(
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

export function resolveSnakeSwipeDirection(deltaX: number, deltaY: number) {
  if (Math.abs(deltaX) < MIN_SWIPE_DISTANCE_PX && Math.abs(deltaY) < MIN_SWIPE_DISTANCE_PX) {
    return null
  }

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    return deltaX > 0 ? 'right' : 'left'
  }

  return deltaY > 0 ? 'down' : 'up'
}

export function stepSnakeSimulation(current: SnakeGameState, nextDirection: SnakeDirection): SnakeGameState {
  if (current.status !== 'running') {
    return current
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
