import { useEffect, useMemo, useRef, useState } from 'react'

import { SectionShell } from '@/components/ui/section-shell'
import { NoteCard } from '@/features/home/components/notes/note-card'
import { NotePagination } from '@/features/home/components/notes/note-pagination'
import { getHomeNotes } from '@/features/home/services/home-note.service'
import { useLocale, useMessages } from '@/hooks/use-locale'

const NOTES_PER_PAGE = 2

export function ExperiencesPanel() {
  const t = useMessages()
  const { locale } = useLocale()
  const [currentPage, setCurrentPage] = useState(0)
  const notesStartRef = useRef<HTMLDivElement | null>(null)
  const notes = useMemo(() => getHomeNotes(locale), [locale])
  const totalPages = Math.ceil(notes.length / NOTES_PER_PAGE)
  const visibleNotes = notes.slice(
    currentPage * NOTES_PER_PAGE,
    (currentPage + 1) * NOTES_PER_PAGE,
  )

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, Math.max(totalPages - 1, 0)))
  }, [totalPages])

  function handlePageChange(page: number) {
    setCurrentPage(page)

    window.requestAnimationFrame(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      notesStartRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      })
    })
  }

  return (
    <SectionShell>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        {t.home.experience.eyebrow}
      </p>
      <h2 className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-foreground">
        {t.home.experience.title}
      </h2>
      <p className="text-base leading-8 text-muted-foreground">{t.home.panels.experiences.description}</p>

      <div ref={notesStartRef} className="space-y-4 pt-2">
        {visibleNotes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>

      <NotePagination
        currentPage={currentPage}
        nextPageLabel={t.home.experience.nextPage}
        onPageChange={handlePageChange}
        previousPageLabel={t.home.experience.previousPage}
        totalPages={totalPages}
      />
    </SectionShell>
  )
}
