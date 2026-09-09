export type ProjectDetailSection = {
  bodyKey: string
  titleKey: string
}

export type ProjectEntry = {
  githubUrl: string
  id: 'tentserv-agent' | 'tentserv-chat' | 'plant-care'
  supportsDownloads?: boolean
}

export type TentgentPlatform = 'macArm64' | 'macX64' | 'windowsX64' | 'linuxX64'

export type TentgentRelease = {
  version: string
  publishedAt: string
  url: string
  downloads: Partial<Record<TentgentPlatform, string>>
  checksumUrl?: string
}
