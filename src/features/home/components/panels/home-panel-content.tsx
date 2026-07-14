import { GamesPanel } from '@/features/home/components/games/games-panel'
import { ExperiencesPanel } from '@/features/home/components/panels/experiences-panel'
import { GithubPanel } from '@/features/home/components/panels/github-panel'
import { ProfilePanel } from '@/features/home/components/panels/profile-panel'
import type { HomePanelType } from '@/features/home/types'
import { ProjectsPanel } from '@/features/project'

export function HomePanelContent({ panel, resetToken = 0 }: { panel: HomePanelType; resetToken?: number }) {
  switch (panel) {
    case 'profile':
      return <ProfilePanel />
    case 'github':
      return <GithubPanel />
    case 'projects':
      return <ProjectsPanel resetToken={resetToken} />
    case 'games':
      return <GamesPanel />
    case 'note':
      return <ExperiencesPanel />
    default:
      return null
  }
}
