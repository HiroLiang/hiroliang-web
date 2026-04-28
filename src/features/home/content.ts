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
export const TENTSERV_AGENT_REPOSITORY_URL = 'https://github.com/HiroLiang/tentserv-agent'
export const TENTSERV_CHAT_REPOSITORY_URL = 'https://github.com/HiroLiang/tentserv-chat'

export const PROJECT_ENTRIES: readonly ProjectEntry[] = [
  {
    githubUrl: TENTSERV_AGENT_REPOSITORY_URL,
    id: 'tentserv-agent',
    supportsDownloads: false,
  },
  {
    githubUrl: TENTSERV_CHAT_REPOSITORY_URL,
    id: 'tentserv-chat',
    supportsDownloads: true,
  },
  {
    githubUrl: 'https://github.com/HiroLiang/plant-care',
    id: 'plant-care',
    supportsDownloads: false,
  },
] as const
