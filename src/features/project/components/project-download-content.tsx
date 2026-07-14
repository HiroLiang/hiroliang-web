import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useDetectedPlatform } from '@/features/project/hooks/use-detected-platform'
import { useTentservReleases } from '@/features/project/hooks/use-tentserv-releases'
import { useMessages } from '@/hooks/use-locale'

export function ProjectDownloadContent() {
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
      : (config.releases.find((release) => release.version === selectedVersionKey) ?? latestRelease)

  const macUrl = selectedRelease.downloads.mac
  const windowsUrl = selectedRelease.downloads.windows
  const platformLabels = t.project.platforms.labels
  const sectionByPlatform = {
    mac: t.project.platforms.mac,
    windows: t.project.platforms.windows,
  }[platformSelection]
  const isDetectedMac = detectedPlatform === 'mac'
  const isDetectedWindows = detectedPlatform === 'windows'
  const otherVersions = config.releases.filter((release) => release.version !== config.latest)

  return (
    <div className="space-y-4">
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
            {otherVersions.map((release) => (
              <SelectItem key={release.version} value={release.version}>
                {release.version}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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
