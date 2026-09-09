import { TENTSERV_AGENT_REPOSITORY_URL } from '@/features/project/data/project-catalog'
import type { TentgentPlatform, TentgentRelease } from '@/features/project/types'
import { fetchJson } from '@/shared/api/fetch-json'

const RELEASES_API_URL = 'https://api.github.com/repos/HiroLiang/tentserv-agent/releases'
const DOWNLOAD_SUFFIXES: Record<TentgentPlatform, string> = {
  macArm64: '-aarch64-apple-darwin.tar.gz',
  macX64: '-x86_64-apple-darwin.tar.gz',
  windowsX64: '-x86_64-pc-windows-msvc.zip',
  linuxX64: '-x86_64-unknown-linux-gnu.tar.gz',
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function parseRelease(value: unknown): TentgentRelease | null {
  if (
    !isRecord(value) || value.draft !== false || value.prerelease !== false ||
    typeof value.tag_name !== 'string' || !value.tag_name.trim() ||
    typeof value.published_at !== 'string' || !Number.isFinite(Date.parse(value.published_at)) ||
    typeof value.html_url !== 'string' ||
    !value.html_url.startsWith(`${TENTSERV_AGENT_REPOSITORY_URL}/releases/tag/`) ||
    !Array.isArray(value.assets)
  ) {
    return null
  }

  const release: TentgentRelease = {
    version: value.tag_name,
    publishedAt: value.published_at,
    url: value.html_url,
    downloads: {},
  }
  const downloadPrefix = `${TENTSERV_AGENT_REPOSITORY_URL}/releases/download/${encodeURIComponent(value.tag_name)}/`

  for (const asset of value.assets) {
    if (
      !isRecord(asset) || asset.state !== 'uploaded' || typeof asset.name !== 'string' ||
      typeof asset.browser_download_url !== 'string' || !asset.browser_download_url.startsWith(downloadPrefix)
    ) {
      continue
    }

    if (asset.name === 'checksums.txt') release.checksumUrl = asset.browser_download_url

    for (const platform of Object.keys(DOWNLOAD_SUFFIXES) as TentgentPlatform[]) {
      if (asset.name.startsWith('tentgent-') && asset.name.endsWith(DOWNLOAD_SUFFIXES[platform])) {
        release.downloads[platform] = asset.browser_download_url
      }
    }
  }

  return release
}

export function selectTentgentReleases(data: unknown): TentgentRelease[] {
  if (!Array.isArray(data)) throw new Error('Invalid GitHub releases response')

  const releases = data.map(parseRelease).filter((release) => release !== null)
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt) || a.version.localeCompare(b.version))
  const uniqueReleases = releases.filter((release, index) =>
    releases.findIndex((candidate) => candidate.version === release.version) === index,
  )

  if (!uniqueReleases.length) throw new Error('No published stable Tentgent releases found')
  return uniqueReleases.slice(0, 5)
}

export async function fetchTentgentReleases(signal?: AbortSignal): Promise<TentgentRelease[]> {
  const timeout = AbortSignal.timeout(10_000)
  const requestSignal = signal ? AbortSignal.any([signal, timeout]) : timeout
  const releases: unknown[] = []

  for (let page = 1; ; page += 1) {
    const data = await fetchJson<unknown>(`${RELEASES_API_URL}?per_page=100&page=${page}`, {
      headers: { Accept: 'application/vnd.github+json' },
      signal: requestSignal,
    })
    if (!Array.isArray(data)) throw new Error('Invalid GitHub releases response')
    releases.push(...data)
    if (data.length < 100) break
  }

  return selectTentgentReleases(releases)
}
