import type { GomokuCell } from '@/features/home/types'

import {
  GOMOKU_BOARD_FRAME_INSET,
  GOMOKU_BOARD_INNER_PADDING,
  GOMOKU_BOARD_SIZE,
  GOMOKU_MOBILE_POINTER_ALIGNMENT_OFFSET,
  GOMOKU_VIEW_PADDING,
} from './gomoku-game.constants'
import { isInsideGomokuBoard } from './gomoku-game-model'

export type GomokuCanvasLayout = {
  boardLeft: number
  boardSize: number
  boardTop: number
  height: number
  stoneRadius: number
  width: number
}

export function computeGomokuLayout(width: number, height: number, isMobile: boolean): GomokuCanvasLayout {
  const safeWidth = Math.max(width, 220)
  const safeHeight = Math.max(height, 220)
  const horizontalPadding = isMobile ? 0 : GOMOKU_VIEW_PADDING * 2
  const verticalPadding = isMobile ? 4 : GOMOKU_VIEW_PADDING * 2
  const availableWidth = Math.max(160, safeWidth - horizontalPadding)
  const availableHeight = Math.max(160, safeHeight - verticalPadding)
  const boardSize = Math.max(180, Math.floor(Math.min(availableWidth, availableHeight)))
  const boardLeft = Math.floor((safeWidth - boardSize) / 2)
  const boardTop = Math.floor((safeHeight - boardSize) / 2)
  const gridSpacing = (boardSize - GOMOKU_BOARD_INNER_PADDING * 2) / (GOMOKU_BOARD_SIZE - 1)

  return {
    boardLeft,
    boardSize,
    boardTop,
    height: safeHeight,
    stoneRadius: Math.max(6, Math.floor(gridSpacing * 0.42)),
    width: safeWidth,
  }
}

export function getGomokuBoardMetrics(layout: GomokuCanvasLayout) {
  const playableSize = layout.boardSize - GOMOKU_BOARD_INNER_PADDING * 2
  const spacing = playableSize / (GOMOKU_BOARD_SIZE - 1)

  return {
    maxX: layout.boardLeft + GOMOKU_BOARD_INNER_PADDING + spacing * (GOMOKU_BOARD_SIZE - 1),
    maxY: layout.boardTop + GOMOKU_BOARD_INNER_PADDING + spacing * (GOMOKU_BOARD_SIZE - 1),
    minX: layout.boardLeft + GOMOKU_BOARD_INNER_PADDING,
    minY: layout.boardTop + GOMOKU_BOARD_INNER_PADDING,
    spacing,
  }
}

export function resolveGomokuCellFromPointer(
  layout: GomokuCanvasLayout,
  clientX: number,
  clientY: number,
  wrapper: HTMLDivElement,
  isMobile: boolean,
) {
  const bounds = wrapper.getBoundingClientRect()
  const pointerOffset = isMobile ? GOMOKU_MOBILE_POINTER_ALIGNMENT_OFFSET : 0
  const localX = clientX - bounds.left - pointerOffset
  const localY = clientY - bounds.top - pointerOffset
  const metrics = getGomokuBoardMetrics(layout)
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

  if (!isInsideGomokuBoard(cell)) {
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

export function getGomokuIntersectionPosition(layout: GomokuCanvasLayout, cell: GomokuCell) {
  const metrics = getGomokuBoardMetrics(layout)

  return {
    x: metrics.minX + cell.x * metrics.spacing,
    y: metrics.minY + cell.y * metrics.spacing,
  }
}

export function getGomokuFrame(layout: GomokuCanvasLayout) {
  return {
    left: layout.boardLeft - GOMOKU_BOARD_FRAME_INSET,
    size: layout.boardSize + GOMOKU_BOARD_FRAME_INSET * 2,
    top: layout.boardTop - GOMOKU_BOARD_FRAME_INSET,
  }
}
