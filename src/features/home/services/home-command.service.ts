import { HOME_COMMANDS } from '@/features/home/data/home-commands'
import type { HomeCommand } from '@/features/home/types'

export function getHomeCommand(input: string): HomeCommand | null {
  const firstToken = input.trim().split(/\s+/)[0]

  if (!firstToken.startsWith('/')) {
    return null
  }

  const command = firstToken.slice(1)

  return HOME_COMMANDS.find((item) => item === command) ?? null
}
