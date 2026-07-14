import { HOME_COMMANDS } from '@/features/home/data/home-commands'
import type {
  ConversationMessage,
  ConversationMessageRole,
  ConversationMessageStatus,
  ConversationPanelPhase,
} from '@/components/conversation'

export type HomeCommand = (typeof HOME_COMMANDS)[number]

export type HomePanelType = HomeCommand

export type PanelPhase = ConversationPanelPhase

export type ChatRole = ConversationMessageRole

export type ChatMessageStatus = ConversationMessageStatus

export type ChatMessage = ConversationMessage

export type { ProjectDetailSection, ProjectEntry } from '@/features/project/types'

export type GameEntry = {
  id: 'snake' | 'gomoku'
}

export type GomokuMode = 'local' | 'cpu' | 'online'

export type GomokuStone = 'black' | 'white'

export type GomokuCell = {
  x: number
  y: number
}

export type GomokuBoardState = (GomokuStone | null)[][]

export type GomokuGameStatus = 'idle' | 'playing' | 'won' | 'draw'

export type GomokuGameState = {
  board: GomokuBoardState
  currentTurn: GomokuStone
  lastMove: GomokuCell | null
  status: GomokuGameStatus
  winner: GomokuStone | null
}

export type GomokuBoardController = {
  board: GomokuBoardState
  currentTurn: GomokuStone
  getAvailableMoves: () => GomokuCell[]
  placeStone: (cell: GomokuCell) => boolean
}

export type SnakeDirection = 'up' | 'down' | 'left' | 'right'

export type SnakeCell = {
  x: number
  y: number
}

export type SnakeGameState = {
  direction: SnakeDirection
  food: SnakeCell
  gridCount: number
  score: number
  snake: SnakeCell[]
  speedMs: number
  status: 'idle' | 'running' | 'game-over'
}
