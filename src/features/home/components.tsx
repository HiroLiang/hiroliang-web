import { type ReactNode, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CHAT_BUBBLE_BASE_CLASS_NAME, getChatBubbleClassName } from '@/features/home/chat-bubbles'
import { GamesPanel } from '@/features/home/games'
import { useMessages } from '@/hooks/use-locale'
import { useDetectedPlatform } from '@/features/project/use-detected-platform'
import {
  GITHUB_PROFILE_URL,
  HOME_SKILLS,
  PROJECT_ENTRIES,
  TENTSERV_CHAT_REPOSITORY_URL,
} from '@/features/home/content'
import { useTentservReleases } from '@/features/home/use-tentserv-releases'
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
        'app-panel-shell space-y-4 rounded-[1.6rem] border border-border/80 bg-secondary/45 p-5 shadow-[0_16px_60px_rgba(0,0,0,0.2)] sm:p-6',
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
  const notes = t.home.experience.notes

  return (
    <SectionShell>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        {t.home.experience.eyebrow}
      </p>
      <h2 className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-foreground">
        {t.home.experience.title}
      </h2>
      <p className="text-base leading-8 text-muted-foreground">{t.home.panels.experiences.description}</p>

      <div className="space-y-4 pt-2">
        {notes.map((note, index) => (
          <div
            key={`${t.home.experience.eyebrow}-${note.date}-${index}`}
            className={[
              CHAT_BUBBLE_BASE_CLASS_NAME,
              getChatBubbleClassName('assistant'),
            ].join(' ')}
          >
            <p className="text-xs font-semibold tracking-[0.18em] text-accent">{note.date}</p>
            <p className="pt-2 text-base leading-8 whitespace-pre-wrap">{note.body}</p>
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
  const detectedPlatform = useDetectedPlatform()
  const t = useMessages()
  const { config, latestRelease, loading, error } = useTentservReleases()
  const [selectedVersionKey, setSelectedVersionKey] = useState<string>('latest')
  const initPlatform = detectedPlatform === 'windows' ? 'windows' : 'mac'
  const [platformSelection, setPlatformSelection] = useState<'mac' | 'windows'>(initPlatform)

  if (loading) {
    return (
      <p className="text-sm text-muted-foreground">{t.project.currentVersionLabel}…</p>
    )
  }

  if (error || !latestRelease || !config) {
    return null
  }

  const selectedRelease =
    selectedVersionKey === 'latest'
      ? latestRelease
      : (config.releases.find((r) => r.version === selectedVersionKey) ?? latestRelease)

  const macUrl = selectedRelease.downloads.mac
  const windowsUrl = selectedRelease.downloads.windows

  const platformLabels = t.project.platforms.labels
  const sectionByPlatform = {
    mac: t.project.platforms.mac,
    windows: t.project.platforms.windows,
  }[platformSelection]

  const isDetectedMac = detectedPlatform === 'mac'
  const isDetectedWindows = detectedPlatform === 'windows'

  const otherVersions = config.releases.filter((r) => r.version !== config.latest)

  return (
    <div className="space-y-4">
      {/* Version selector */}
      <div className="flex items-center gap-3">
        <span className="min-w-[4.5rem] text-sm text-muted-foreground">{t.project.versionLabel}</span>
        <Select value={selectedVersionKey} onValueChange={setSelectedVersionKey}>
          <SelectTrigger className="w-52">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">
              {config.latest} ({t.project.latestVersionSuffix})
            </SelectItem>
            {otherVersions.map((r) => (
              <SelectItem key={r.version} value={r.version}>
                {r.version}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Platform toggle */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="min-w-[4.5rem] text-sm text-muted-foreground">{t.project.platformLabel}</span>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={platformSelection === 'mac' ? 'default' : 'outline'}
            onClick={() => setPlatformSelection('mac')}
          >
            {platformLabels.mac}
            {isDetectedMac ? <span className="ml-1.5 opacity-60 text-xs">({t.project.localSystemLabel})</span> : null}
          </Button>
          <Button
            variant={platformSelection === 'windows' ? 'default' : 'outline'}
            onClick={() => setPlatformSelection('windows')}
          >
            {platformLabels.windows}
            {isDetectedWindows ? <span className="ml-1.5 opacity-60 text-xs">({t.project.localSystemLabel})</span> : null}
          </Button>
        </div>
      </div>

      <div className="border-t border-border pt-4 space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          {sectionByPlatform.eyebrow}
        </p>
        <h3 className="text-2xl font-semibold leading-tight tracking-[-0.02em] text-foreground">
          {sectionByPlatform.title}
        </h3>
        <p className="text-base leading-8 text-muted-foreground">{sectionByPlatform.body}</p>

        {platformSelection === 'mac' && macUrl ? (
          <Button asChild>
            <a href={macUrl}>{t.project.platforms.mac.download}</a>
          </Button>
        ) : null}

        {platformSelection === 'windows' && windowsUrl ? (
          <Button asChild>
            <a href={windowsUrl}>{t.project.platforms.windows.download}</a>
          </Button>
        ) : null}
      </div>
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
                {project.id === 'tentserv-chat'
                  ? t.project.projects.tentservChat.title
                  : t.project.projects.plantCare.title}
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
