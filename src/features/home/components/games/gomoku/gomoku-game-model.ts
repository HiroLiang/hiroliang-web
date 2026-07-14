import type { GomokuBoardState, GomokuCell, GomokuGameState, GomokuStone } from '@/features/home/types'

import { GOMOKU_BOARD_SIZE } from './gomoku-game.constants'

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

function createEmptyBoard(): GomokuBoardState {
  return Array.from({ length: GOMOKU_BOARD_SIZE }, () => Array.from({ length: GOMOKU_BOARD_SIZE }, () => null))
}

export function createInitialGomokuGameState(): GomokuGameState {
  return {
    board: createEmptyBoard(),
    currentTurn: 'black',
    lastMove: null,
    status: 'idle',
    winner: null,
  }
}

export function isInsideGomokuBoard(cell: GomokuCell) {
  return cell.x >= 0 && cell.x < GOMOKU_BOARD_SIZE && cell.y >= 0 && cell.y < GOMOKU_BOARD_SIZE
}

export function getAvailableGomokuMoves(board: GomokuBoardState) {
  const moves: GomokuCell[] = []

  for (let y = 0; y < GOMOKU_BOARD_SIZE; y += 1) {
    for (let x = 0; x < GOMOKU_BOARD_SIZE; x += 1) {
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

  while (isInsideGomokuBoard({ x: nextX, y: nextY }) && board[nextY]?.[nextX] === stone) {
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

export function placeStoneInGomokuGame(current: GomokuGameState, cell: GomokuCell): GomokuGameState | null {
  if (current.status === 'won' || current.status === 'draw') {
    return null
  }

  if (!isInsideGomokuBoard(cell) || current.board[cell.y]?.[cell.x] !== null) {
    return null
  }

  const nextBoard = current.board.map((row) => [...row])
  nextBoard[cell.y][cell.x] = current.currentTurn
  const winner = hasFiveInRow(nextBoard, cell, current.currentTurn) ? current.currentTurn : null
  const hasOpenMoves = getAvailableGomokuMoves(nextBoard).length > 0

  return {
    board: nextBoard,
    currentTurn: winner ? current.currentTurn : getNextTurn(current.currentTurn),
    lastMove: cell,
    status: winner ? 'won' : hasOpenMoves ? 'playing' : 'draw',
    winner,
  }
}
