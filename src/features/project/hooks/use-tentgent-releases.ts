import { useQuery } from '@tanstack/react-query'

import { TENTGENT_RELEASES_SNAPSHOT } from '@/features/project/data/tentgent-releases'
import { fetchTentgentReleases } from '@/features/project/services/tentgent-release.service'

export function useTentgentReleases() {
  const query = useQuery({
    queryKey: ['github-releases', 'HiroLiang/tentserv-agent', 'stable'],
    queryFn: ({ signal }) => fetchTentgentReleases(signal),
    staleTime: 5 * 60_000,
    retry: false,
  })

  return {
    releases: query.data ?? TENTGENT_RELEASES_SNAPSHOT,
    isFetching: query.isFetching,
    isError: query.isError,
    refetch: query.refetch,
  }
}
