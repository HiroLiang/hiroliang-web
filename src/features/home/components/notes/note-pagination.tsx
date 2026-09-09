import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

type NotePaginationProps = {
  currentPage: number
  nextPageLabel: string
  onPageChange: (page: number) => void
  previousPageLabel: string
  totalPages: number
}

export function NotePagination({
  currentPage,
  nextPageLabel,
  onPageChange,
  previousPageLabel,
  totalPages,
}: NotePaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex items-center justify-center gap-3 pt-2">
      <Button
        aria-label={previousPageLabel}
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
        size="icon"
        title={previousPageLabel}
        type="button"
        variant="ghost"
      >
        <ChevronLeft aria-hidden="true" className="h-5 w-5" />
      </Button>

      <span
        aria-live="polite"
        className="min-w-16 text-center text-sm font-medium tabular-nums text-muted-foreground"
      >
        {currentPage + 1} / {totalPages}
      </span>

      <Button
        aria-label={nextPageLabel}
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
        size="icon"
        title={nextPageLabel}
        type="button"
        variant="ghost"
      >
        <ChevronRight aria-hidden="true" className="h-5 w-5" />
      </Button>
    </div>
  )
}
