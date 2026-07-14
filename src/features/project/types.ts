export type ProjectDetailSection = {
  bodyKey: string
  titleKey: string
}

export type ProjectEntry = {
  githubUrl: string
  id: 'tentserv-agent' | 'tentserv-chat' | 'plant-care'
  supportsDownloads?: boolean
}
