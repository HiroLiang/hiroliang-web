import { Download, ExternalLink, LoaderCircle, RefreshCw } from 'lucide-react'
import { useId, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TENTSERV_AGENT_REPOSITORY_URL } from '@/features/project/data/project-catalog'
import { useTentgentReleases } from '@/features/project/hooks/use-tentgent-releases'
import type { TentgentPlatform } from '@/features/project/types'
import { useLocale, useMessages } from '@/hooks/use-locale'

export function TentgentReleases() {
  const t = useMessages()
  const { locale } = useLocale()
  const copy = t.project.releases
  const { releases, isFetching, isError, refetch } = useTentgentReleases()
  const [selection, setSelection] = useState('latest')
  const selectId = useId()
  const headingId = useId()
  const latestRelease = releases[0]
  const selectedRelease = releases.find((release) => release.version === selection) ?? latestRelease

  if (!selectedRelease) return null

  const publishedDate = new Intl.DateTimeFormat(locale, {
    year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC',
  }).format(new Date(selectedRelease.publishedAt))

  return (
    <section aria-labelledby={headingId} className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 id={headingId} className="text-lg font-semibold text-foreground">{copy.title}</h3>
        {isFetching ? (
          <span role="status" aria-label={copy.loading}>
            <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin text-muted-foreground" />
          </span>
        ) : null}
      </div>

      {isError ? (
        <div className="flex items-center gap-2">
          <p role="status" className="min-w-0 flex-1 text-sm text-muted-foreground">{copy.unavailable}</p>
          <Button aria-label={copy.retry} title={copy.retry} disabled={isFetching} onClick={() => void refetch()} size="icon" type="button" variant="ghost" className="shrink-0">
            <RefreshCw aria-hidden="true" className="h-4 w-4" />
          </Button>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <label htmlFor={selectId} className="text-sm text-muted-foreground">{t.project.versionLabel}</label>
        <Select value={selectedRelease.version} onValueChange={(version) => setSelection(version === latestRelease.version ? 'latest' : version)}>
          <SelectTrigger id={selectId} className="w-52 max-w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            {releases.map((release, index) => (
              <SelectItem key={release.version} value={release.version}>
                {release.version}{index === 0 ? ` (${t.project.latestVersionSuffix})` : ''}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
        <p>{copy.published}: <time dateTime={selectedRelease.publishedAt}>{publishedDate}</time></p>
        <a className="inline-flex items-center gap-1 text-accent hover:underline" href={selectedRelease.url} rel="noreferrer" target="_blank">
          {copy.notes}<ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {(Object.keys(copy.platforms) as TentgentPlatform[]).map((platform) => {
          const url = selectedRelease.downloads[platform]
          return url ? (
            <Button key={platform} asChild variant="outline" className="min-w-0 gap-2 px-3">
              <a href={url}>
                <Download aria-hidden="true" className="h-4 w-4 shrink-0" />
                {copy.platforms[platform]}
              </a>
            </Button>
          ) : null
        })}
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-accent">
        {selectedRelease.checksumUrl ? (
          <a className="hover:underline" href={selectedRelease.checksumUrl}>{copy.checksums}</a>
        ) : null}
        <a className="inline-flex items-center gap-1 hover:underline" href={`${TENTSERV_AGENT_REPOSITORY_URL}/releases`} rel="noreferrer" target="_blank">
          {copy.all}<ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  )
}
