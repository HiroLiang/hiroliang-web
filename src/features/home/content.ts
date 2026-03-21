import type { ProjectEntry } from '@/features/home/types'

export const HOME_SKILLS = [
  'Java',
  'Spring Boot',
  'JBoss',
  'Docker',
  'OpenShift',
  'Angular',
  'Vue',
  'React',
  'Go',
  'Rust',
  'Tauri',
  'Ollama',
] as const

export const GITHUB_PROFILE_URL = 'https://github.com/HiroLiang'
export const TENTSERV_CHAT_REPOSITORY_URL = 'https://github.com/HiroLiang/tentserv-chat'

export const MAC_DOWNLOAD_URL =
  'https://github.com/HiroLiang/tentserv-chat/releases/download/v0.0.1-alpha1/tentserv-chat_0.1.0_universal.dmg'

export const WINDOWS_DOWNLOAD_URL =
  'https://github.com/HiroLiang/tentserv-chat/releases/download/v0.0.1-alpha1/tentserv-chat_0.1.0_x64-setup.zip'

export const PROJECT_ENTRIES: readonly ProjectEntry[] = [
  {
    id: 'tentserv-chat',
    name: 'Tentserv Chat',
    supportsDownloads: true,
  },
] as const
