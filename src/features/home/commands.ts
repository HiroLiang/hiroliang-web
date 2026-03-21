export const HOME_COMMANDS = ['profile', 'github', 'projects', 'experiences'] as const

export function formatHomeCommand(command: (typeof HOME_COMMANDS)[number]) {
  return `/${command}`
}
