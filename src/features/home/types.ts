import { HOME_COMMANDS } from '@/features/home/commands'

export type HomeCommand = (typeof HOME_COMMANDS)[number]

export type HomePanelType = HomeCommand

export type PanelPhase = 'idle' | 'closing' | 'opening'

export type ChatRole = 'user' | 'assistant' | 'system'

export type ChatMessageStatus = 'idle' | 'streaming' | 'error'

export type ChatMessage = {
  id: string
  content: string
  role: ChatRole
  status?: ChatMessageStatus
}

export type ProjectDetailSection = {
  bodyKey: string
  titleKey: string
}

export type ProjectEntry = {
  githubUrl: string
  id: string
  supportsDownloads?: boolean
}

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
