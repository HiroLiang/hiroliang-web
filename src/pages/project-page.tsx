import { Link } from 'react-router-dom'

import { ProjectsPanel } from '@/features/home/components'
import { useMessages } from '@/hooks/use-locale'

export function ProjectPage() {
  const t = useMessages()

  return (
    <div className="hide-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto" data-app-scroll-root="true">
      <div className="space-y-8 pb-6">
        <ProjectsPanel
          className="min-h-0"
          initialProjectId="tentserv-chat"
          startWithSelector={false}
          showRouteLink={false}
        />

        <section className="space-y-4">
          <Link className="text-base font-semibold text-accent transition-colors hover:text-accent/80" to="/">
            {t.project.backHome}
          </Link>
        </section>
      </div>
    </div>
  )
}
