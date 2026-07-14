export const appEnv = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
  chatApiKey: import.meta.env.VITE_CHAT_API_KEY?.trim() ?? '',
  chatModel: import.meta.env.VITE_CHAT_MODEL?.trim() ?? '',
  chatStreamUrl: import.meta.env.VITE_CHAT_STREAM_URL?.trim() ?? '',
  useCustomFont: import.meta.env.VITE_USE_CUSTOM_FONT === 'true',
} as const

export function requireEnvValue(value: string, name: string) {
  if (!value) {
    throw new Error(`Missing ${name}`)
  }

  return value
}
