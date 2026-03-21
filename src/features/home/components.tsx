import { type ReactNode, useState } from 'react'
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

  return (
    <SectionShell>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        {t.home.experience.eyebrow}
      </p>
      <h2 className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-foreground">
        {t.home.experience.title}
      </h2>
      <p className="text-base leading-8 text-muted-foreground">{t.home.panels.experiences.description}</p>
      <p className="text-base leading-8 text-muted-foreground">{t.home.experience.body1}</p>
      <p className="text-base leading-8 text-muted-foreground">{t.home.experience.body2}</p>
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

function ProjectDownloadSection() {
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
    <SectionShell>
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
    </SectionShell>
  )
}

function ProjectDetail({ project, showRouteLink = false }: { project: ProjectEntry; showRouteLink?: boolean }) {
  const t = useMessages()

  if (project.id !== 'tentserv-chat') {
    return null
  }

  return (
    <div className="space-y-4">
      <SectionShell>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          {t.project.hero.eyebrow}
        </p>
        <h2 className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-foreground">
          {project.name}
        </h2>
        <p className="text-base leading-8 text-muted-foreground">{t.home.panels.projects.description}</p>
        <p className="text-base leading-8 text-muted-foreground">{t.project.hero.body}</p>
        <p className="text-base leading-8 text-muted-foreground">{t.project.intro}</p>
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
      </SectionShell>

      {project.supportsDownloads ? <ProjectDownloadSection /> : null}
    </div>
  )
}

export function ProjectsPanel({ showRouteLink = false }: { showRouteLink?: boolean }) {
  const t = useMessages()
  const [selectedProjectId, setSelectedProjectId] = useState(PROJECT_ENTRIES[0]?.id ?? '')
  const selectedProject =
    PROJECT_ENTRIES.find((project) => project.id === selectedProjectId) ?? PROJECT_ENTRIES[0]

  return (
    <div className="space-y-4">
      <SectionShell>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{t.project.selectorLabel}</p>
        <h2 className="text-2xl font-semibold leading-tight tracking-[-0.02em] text-foreground">
          {t.home.panels.projects.title}
        </h2>
        <p className="text-base leading-8 text-muted-foreground">{t.home.panels.projects.description}</p>
        <div className="flex flex-wrap gap-3">
          {PROJECT_ENTRIES.map((project) => {
            const isSelected = project.id === selectedProject?.id

            return (
              <button
                key={project.id}
                className={[
                  'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                  isSelected
                    ? 'border-accent bg-accent text-accent-foreground'
                    : 'border-border bg-background/40 text-foreground hover:bg-secondary',
                ].join(' ')}
                onClick={() => setSelectedProjectId(project.id)}
                type="button"
              >
                {project.name}
              </button>
            )
          })}
        </div>
      </SectionShell>

      {selectedProject ? <ProjectDetail project={selectedProject} showRouteLink={showRouteLink} /> : null}
    </div>
  )
}

export function HomePanelContent({ panel }: { panel: HomePanelType }) {
  switch (panel) {
    case 'profile':
      return <ProfilePanel />
    case 'github':
      return <GithubPanel />
    case 'projects':
      return <ProjectsPanel />
    case 'experiences':
      return <ExperiencesPanel />
    default:
      return null
  }
}
