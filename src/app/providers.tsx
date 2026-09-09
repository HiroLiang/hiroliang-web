import { QueryClientProvider } from '@tanstack/react-query'
import { type PropsWithChildren } from 'react'

import { useDocumentLocale } from '@/hooks/use-document-locale'
import { queryClient } from '@/shared/api/query-client'

export function AppProviders({ children }: PropsWithChildren) {
  useDocumentLocale()

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
