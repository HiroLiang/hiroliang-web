import { useEffect, useState } from 'react'

import {
  fetchTentservReleases,
  getLatestTentservRelease,
  type TentservRelease,
  type TentservReleasesConfig,
} from '@/features/project/services/tentserv-release.service'

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
    fetchTentservReleases()
      .then((data) => {
        setConfig(data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  return {
    config,
    error,
    latestRelease: getLatestTentservRelease(config),
    loading,
  }
}
