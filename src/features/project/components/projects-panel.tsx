import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { SectionShell } from '@/components/ui/section-shell'
import { PROJECT_ENTRIES } from '@/features/project/data/project-catalog'
import type { ProjectEntry } from '@/features/project/types'
import { useMessages } from '@/hooks/use-locale'

import { ProjectDetail } from './project-detail'
import { getProjectTitle } from './project-title'

export function ProjectsPanel({
  initialProjectId,
  resetToken = 0,
  showRouteLink = false,
  startWithSelector = true,
  className = '',
}: {
  initialProjectId?: ProjectEntry['id']
  resetToken?: number
  showRouteLink?: boolean
  startWithSelector?: boolean
  className?: string
}) {
  const t = useMessages()
  const [selectedProjectId, setSelectedProjectId] = useState(initialProjectId ?? PROJECT_ENTRIES[0]?.id ?? '')
  const [isSelectorOpen, setIsSelectorOpen] = useState(startWithSelector)
  const selectedProject =
    PROJECT_ENTRIES.find((project) => project.id === selectedProjectId) ?? PROJECT_ENTRIES[0]

  useEffect(() => {
    if (startWithSelector) {
      setIsSelectorOpen(true)
    }
  }, [resetToken, startWithSelector])

  return (
    <div className={['min-h-0 space-y-4', className].join(' ').trim()}>
      {isSelectorOpen ? (
        <SectionShell>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{t.project.selectorLabel}</p>
          <h2 className="text-2xl font-semibold leading-tight tracking-[-0.02em] text-foreground">
            {t.home.panels.projects.title}
          </h2>
          <p className="text-base leading-8 text-muted-foreground">{t.project.selectorPrompt}</p>
          <div className="flex flex-wrap gap-3">
            {PROJECT_ENTRIES.map((project) => (
              <button
                key={project.id}
                className="rounded-full border border-border bg-background/40 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                onClick={() => {
                  setSelectedProjectId(project.id)
                  setIsSelectorOpen(false)
                }}
                type="button"
              >
                {getProjectTitle(project, t)}
              </button>
            ))}
          </div>
        </SectionShell>
      ) : null}

      {!isSelectorOpen && selectedProject ? (
        <div className="min-h-0 space-y-4">
          <div className="flex">
            <Button onClick={() => setIsSelectorOpen(true)} type="button" variant="ghost">
              {t.project.backToProjects}
            </Button>
          </div>
          <ProjectDetail project={selectedProject} showRouteLink={showRouteLink} />
        </div>
      ) : null}
    </div>
  )
}
