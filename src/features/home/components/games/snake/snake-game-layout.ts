const HUD_HEIGHT = 44
const VIEW_PADDING = 16
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

export type SnakeCanvasLayout = {
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

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function computeSnakeLayout(width: number, height: number, isMobile: boolean): SnakeCanvasLayout {
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
