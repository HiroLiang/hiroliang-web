import { type ReactNode, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useMessages } from '@/hooks/use-locale'
import { useDetectedPlatform } from '@/features/project/use-detected-platform'
import {
  GITHUB_PROFILE_URL,
  HOME_SKILLS,
  MAC_DOWNLOAD_URL,
  PROJECT_ENTRIES,
  TENTSERV_CHAT_REPOSITORY_URL,
  WINDOWS_DOWNLOAD_URL,
} from '@/features/home/content'
import type { HomePanelType, ProjectEntry } from '@/features/home/types'

function SectionShell({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={[
        'space-y-4 rounded-[1.6rem] border border-border/80 bg-secondary/45 p-5 shadow-[0_16px_60px_rgba(0,0,0,0.2)] sm:p-6',
        className,
      ].join(' ')}
    >
      {children}
    </section>
  )
}

export function ProfilePanel() {
  const t = useMessages()

  return (
    <SectionShell>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        {t.home.hero.eyebrow}
      </p>
      <h2 className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-foreground">
        {t.home.hero.title}
      </h2>
      <p className="text-base leading-8 text-muted-foreground">{t.home.panels.profile.body}</p>
      <p className="text-base leading-8 text-muted-foreground">{t.home.hero.intro}</p>
      <p className="text-base leading-8 text-muted-foreground">{t.home.summary}</p>

      <div className="space-y-3 pt-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          {t.home.panels.profile.skillsLabel}
        </p>
        <div className="flex flex-wrap gap-x-3 gap-y-2 text-sm text-muted-foreground">
          {HOME_SKILLS.map((skill, index) => (
            <span key={skill}>
              {skill}
              {index < HOME_SKILLS.length - 1 ? <span className="ml-3 text-border">/</span> : null}
            </span>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}

export function ExperiencesPanel() {
  const t = useMessages()
  const notes = [
    t.home.panels.experiences.description,
    t.home.experience.body1,
    t.home.experience.body2,
  ]

  return (
    <SectionShell>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        {t.home.experience.eyebrow}
      </p>
      <h2 className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-foreground">
        {t.home.experience.title}
      </h2>

      <div className="space-y-4 pt-2">
        {notes.map((note, index) => (
          <div
            key={`${t.home.experience.eyebrow}-${index}`}
            className={[
              'rounded-[1.2rem] bg-background/25 px-4 py-4',
              index === 0 ? 'border border-border/60' : 'border border-border/45',
            ].join(' ')}
          >
            <p className="text-base leading-8 text-muted-foreground whitespace-pre-wrap">{note}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}

export function GithubPanel() {
  const t = useMessages()

  return (
    <SectionShell>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        {t.home.panels.github.eyebrow}
      </p>
      <h2 className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-foreground">
        {t.home.panels.github.title}
      </h2>
      <p className="text-base leading-8 text-muted-foreground">{t.home.panels.github.body}</p>
      <div className="flex flex-wrap gap-3 pt-1">
        <Button asChild>
          <a href={GITHUB_PROFILE_URL} rel="noreferrer" target="_blank">
            {t.home.panels.github.cta}
          </a>
        </Button>
      </div>
    </SectionShell>
  )
}

function ProjectDownloadContent() {
  const platform = useDetectedPlatform()
  const t = useMessages()
  const platformLabels = t.project.platforms.labels

  const sectionByPlatform = {
    desktop: t.project.platforms.desktop,
    mac: t.project.platforms.mac,
    mobile: t.project.platforms.mobile,
    windows: t.project.platforms.windows,
  }[platform]

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {t.project.detectedEnvironment}:{' '}
        <strong className="text-foreground">{platformLabels[platform]}</strong>
      </p>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        {sectionByPlatform.eyebrow}
      </p>
      <h3 className="text-2xl font-semibold leading-tight tracking-[-0.02em] text-foreground">
        {sectionByPlatform.title}
      </h3>
      <p className="text-base leading-8 text-muted-foreground">{sectionByPlatform.body}</p>

      {platform === 'mac' ? (
        <Button asChild>
          <a href={MAC_DOWNLOAD_URL}>{t.project.platforms.mac.download}</a>
        </Button>
      ) : null}

      {platform === 'windows' ? (
        <Button asChild>
          <a href={WINDOWS_DOWNLOAD_URL}>{t.project.platforms.windows.download}</a>
        </Button>
      ) : null}

      {platform === 'desktop' ? (
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <a href={MAC_DOWNLOAD_URL}>{t.project.platforms.desktop.downloadMac}</a>
          </Button>
          <Button asChild variant="outline">
            <a href={WINDOWS_DOWNLOAD_URL}>{t.project.platforms.desktop.downloadWindows}</a>
          </Button>
        </div>
      ) : null}
    </div>
  )
}

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

function ProjectDetail({ project, showRouteLink = false }: { project: ProjectEntry; showRouteLink?: boolean }) {
  switch (project.id) {
    case 'tentserv-chat':
      return <TentservProjectDetail project={project} showRouteLink={showRouteLink} />
    case 'plant-care':
      return <PlantCareProjectDetail project={project} />
    default:
      return null
  }
}

export function ProjectsPanel({
  initialProjectId,
  resetToken = 0,
  showRouteLink = false,
  startWithSelector = true,
}: {
  initialProjectId?: ProjectEntry['id']
  resetToken?: number
  showRouteLink?: boolean
  startWithSelector?: boolean
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
    <div className="space-y-4">
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
                {project.id === 'tentserv-chat'
                  ? t.project.projects.tentservChat.title
                  : t.project.projects.plantCare.title}
              </button>
            ))}
          </div>
        </SectionShell>
      ) : null}

      {!isSelectorOpen && selectedProject ? (
        <div className="space-y-4">
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

export function HomePanelContent({ panel, resetToken = 0 }: { panel: HomePanelType; resetToken?: number }) {
  switch (panel) {
    case 'profile':
      return <ProfilePanel />
    case 'github':
      return <GithubPanel />
    case 'projects':
      return <ProjectsPanel resetToken={resetToken} />
    case 'note':
      return <ExperiencesPanel />
    default:
      return null
  }
}
