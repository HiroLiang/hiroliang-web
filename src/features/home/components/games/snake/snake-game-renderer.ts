import type { SnakeGameState } from '@/features/home/types'

import type { SnakeCanvasLayout } from './snake-game-layout'

type SnakeRendererLabels = {
  gameOver: string
  gameOverHint: string
  highScore: string
  score: string
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

export function drawSnakeGame(
  context: CanvasRenderingContext2D,
  layout: SnakeCanvasLayout,
  game: SnakeGameState,
  highScore: number,
  labels: SnakeRendererLabels,
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
