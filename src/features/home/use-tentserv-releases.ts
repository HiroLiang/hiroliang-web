import { useEffect, useState } from 'react'

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

interface UseTentservReleasesResult {
  config: TentservReleasesConfig | null
  latestRelease: TentservRelease | null
  loading: boolean
  error: boolean
}

export function useTentservReleases(): UseTentservReleasesResult {
  const [config, setConfig] = useState<TentservReleasesConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/tentserv-releases.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json() as Promise<TentservReleasesConfig>
      })
      .then((data) => {
        setConfig(data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  const latestRelease = config
    ? (config.releases.find((r) => r.version === config.latest) ?? null)
    : null

  return { config, latestRelease, loading, error }
}
