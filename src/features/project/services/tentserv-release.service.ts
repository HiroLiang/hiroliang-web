import { fetchJson } from '@/shared/api/fetch-json'

export interface TentservDownloads {
  mac?: string
  windows?: string
}

export interface TentservRelease {
  version: string
  downloads: TentservDownloads
}

export interface TentservReleasesConfig {
  latest: string
  releases: TentservRelease[]
}

const TENTSERV_RELEASES_URL = '/tentserv-releases.json'

export function getLatestTentservRelease(config: TentservReleasesConfig | null) {
  return config ? (config.releases.find((release) => release.version === config.latest) ?? null) : null
}

export function fetchTentservReleases() {
  return fetchJson<TentservReleasesConfig>(TENTSERV_RELEASES_URL)
}
