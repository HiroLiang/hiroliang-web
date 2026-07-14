import type { GomokuCell, GomokuGameState, GomokuStone } from '@/features/home/types'

import { GOMOKU_BOARD_SIZE } from './gomoku-game.constants'
import {
  getGomokuBoardMetrics,
  getGomokuFrame,
  getGomokuIntersectionPosition,
  type GomokuCanvasLayout,
} from './gomoku-game-layout'

type GomokuRendererLabels = {
  stoneNames: Record<GomokuStone, string>
  winnerMessage: (stone: GomokuStone) => string
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

export function drawGomokuGame(
  context: CanvasRenderingContext2D,
  layout: GomokuCanvasLayout,
  game: GomokuGameState,
  previewCell: GomokuCell | null,
  labels: GomokuRendererLabels,
) {
  context.clearRect(0, 0, layout.width, layout.height)

  const frame = getGomokuFrame(layout)

  context.fillStyle = '#b88452'
  drawRoundedRect(context, frame.left, frame.top, frame.size, frame.size, 22)
  context.fill()

  const boardGradient = context.createLinearGradient(0, layout.boardTop, 0, layout.boardTop + layout.boardSize)
  boardGradient.addColorStop(0, '#ddb16d')
  boardGradient.addColorStop(1, '#be8347')
  context.fillStyle = boardGradient
  drawRoundedRect(context, layout.boardLeft, layout.boardTop, layout.boardSize, layout.boardSize, 18)
  context.fill()

  const metrics = getGomokuBoardMetrics(layout)

  context.strokeStyle = 'rgba(76, 43, 18, 0.72)'
  context.lineWidth = 1
  for (let index = 0; index < GOMOKU_BOARD_SIZE; index += 1) {
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
      const point = getGomokuIntersectionPosition(layout, { x, y })
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

      const point = getGomokuIntersectionPosition(layout, { x, y })
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
    const point = getGomokuIntersectionPosition(layout, previewCell)
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
