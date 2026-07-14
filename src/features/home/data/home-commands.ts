export const HOME_COMMANDS = ['profile', 'github', 'projects', 'games', 'note', 'clean'] as const

export function formatHomeCommand(command: (typeof HOME_COMMANDS)[number]) {
  return `/${command}`
}
