import type { ProjectEntry } from '@/features/project/types'
import type { useMessages } from '@/hooks/use-locale'

export function getProjectTitle(project: ProjectEntry, t: ReturnType<typeof useMessages>) {
  switch (project.id) {
    case 'tentserv-agent':
      return t.project.projects.tentservAgent.title
    case 'tentserv-chat':
      return t.project.projects.tentservChat.title
    case 'plant-care':
      return t.project.projects.plantCare.title
    default:
      return project.id
  }
}
