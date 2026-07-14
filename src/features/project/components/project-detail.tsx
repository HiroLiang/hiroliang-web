import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { SectionShell } from '@/components/ui/section-shell'
import { TENTSERV_CHAT_REPOSITORY_URL } from '@/features/project/data/project-catalog'
import type { ProjectEntry } from '@/features/project/types'
import { useMessages } from '@/hooks/use-locale'

import { CommandBlock } from './command-block'
import { ProjectDownloadContent } from './project-download-content'

function TentservProjectDetail({ project, showRouteLink = false }: { project: ProjectEntry; showRouteLink?: boolean }) {
  const t = useMessages()
  const content = t.project.projects.tentservChat
  const overviewSections = [
    content.sections.overview.intro,
    content.sections.overview.vision,
    content.sections.overview.boundary,
    content.sections.overview.architecture,
    content.sections.overview.stack,
    content.sections.overview.status,
  ]

  return (
    <SectionShell>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        {t.project.hero.eyebrow}
      </p>
      <h2 className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-foreground">
        {content.title}
      </h2>
      <p className="text-base leading-8 text-muted-foreground">{content.summary}</p>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">{t.project.overviewSectionTitle}</h3>
        <div className="space-y-5">
          {overviewSections.map((section, index) => (
            <div key={`${section.title}-${index}`} className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{section.title}</p>
              <p className="whitespace-pre-wrap text-base leading-8 text-muted-foreground">{section.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">{t.project.downloadsSectionTitle}</h3>
        {project.supportsDownloads ? <ProjectDownloadContent /> : null}
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">{t.project.linkSectionTitle}</h3>
        <div className="flex flex-wrap gap-3 pt-1">
          <Button asChild variant="outline">
            <a href={TENTSERV_CHAT_REPOSITORY_URL} rel="noreferrer" target="_blank">
              {t.project.ctaGithub}
            </a>
          </Button>
          {showRouteLink ? (
            <Button asChild variant="ghost">
              <Link to="/project">{t.home.featured.link}</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </SectionShell>
  )
}

function TentservAgentProjectDetail({ project }: { project: ProjectEntry }) {
  const t = useMessages()
  const content = t.project.projects.tentservAgent
  const overviewSections = [
    content.sections.intro,
    content.sections.runtime,
    content.sections.architecture,
    content.sections.stack,
    content.sections.status,
  ]
  const installCommands = [content.install.mac, content.install.windows, content.install.verify]

  return (
    <SectionShell>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        {t.project.selectorLabel}
      </p>
      <h2 className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-foreground">
        {content.title}
      </h2>
      <p className="text-base leading-8 text-muted-foreground">{content.summary}</p>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">{t.project.overviewSectionTitle}</h3>
        <div className="space-y-5">
          {overviewSections.map((section, index) => (
            <div key={`${section.title}-${index}`} className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{section.title}</p>
              <p className="whitespace-pre-wrap text-base leading-8 text-muted-foreground">{section.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">{t.project.installSectionTitle}</h3>
        <div className="space-y-4">
          {installCommands.map((item) => (
            <div key={item.title} className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{item.title}</p>
              <p className="text-base leading-8 text-muted-foreground">{item.body}</p>
              <CommandBlock command={item.command} />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">{t.project.commandsSectionTitle}</h3>
        <div className="space-y-4">
          {content.commands.map((item) => (
            <div key={item.title} className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{item.title}</p>
              <p className="text-base leading-8 text-muted-foreground">{item.body}</p>
              <CommandBlock command={item.command} />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">{t.project.linkSectionTitle}</h3>
        <div className="flex flex-wrap gap-3 pt-1">
          <Button asChild variant="outline">
            <a href={project.githubUrl} rel="noreferrer" target="_blank">
              {t.project.ctaGithub}
            </a>
          </Button>
        </div>
      </div>
    </SectionShell>
  )
}

function PlantCareProjectDetail({ project }: { project: ProjectEntry }) {
  const t = useMessages()
  const content = t.project.projects.plantCare
  const overviewSections = [
    content.sections.intro,
    content.sections.vision,
    content.sections.collaboration,
    content.sections.architecture,
    content.sections.stack,
    content.sections.status,
  ]

  return (
    <SectionShell>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        {t.project.selectorLabel}
      </p>
      <h2 className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-foreground">
        {content.title}
      </h2>
      <p className="text-base leading-8 text-muted-foreground">{content.summary}</p>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">{t.project.overviewSectionTitle}</h3>
        <div className="space-y-5">
          {overviewSections.map((section, index) => (
            <div key={`${section.title}-${index}`} className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{section.title}</p>
              <p className="whitespace-pre-wrap text-base leading-8 text-muted-foreground">{section.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">{t.project.linkSectionTitle}</h3>
        <div className="flex flex-wrap gap-3 pt-1">
          <Button asChild variant="outline">
            <a href={project.githubUrl} rel="noreferrer" target="_blank">
              {t.project.ctaGithub}
            </a>
          </Button>
        </div>
      </div>
    </SectionShell>
  )
}

export function ProjectDetail({ project, showRouteLink = false }: { project: ProjectEntry; showRouteLink?: boolean }) {
  switch (project.id) {
    case 'tentserv-agent':
      return <TentservAgentProjectDetail project={project} />
    case 'tentserv-chat':
      return <TentservProjectDetail project={project} showRouteLink={showRouteLink} />
    case 'plant-care':
      return <PlantCareProjectDetail project={project} />
    default:
      return null
  }
}
