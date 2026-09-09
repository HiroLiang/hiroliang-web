import type { HomeNote } from '@/features/home/models/home-note'
import type { Locale } from '@/locales/types'

const NOTE_LOCALES = ['en', 'zh-TW', 'ja'] as const satisfies readonly Locale[]
const NOTE_FILE_PATTERN = /\/(?<id>(?<date>\d{4}-\d{2}-\d{2})-[a-z0-9]+(?:-[a-z0-9]+)*)\.(?<locale>en|zh-TW|ja)\.md$/

type HomeNoteGroup = {
  bodies: Record<Locale, string>
  date: string
  id: string
}

type MutableHomeNoteGroup = Omit<HomeNoteGroup, 'bodies'> & {
  bodies: Partial<Record<Locale, string>>
}

const noteModules = import.meta.glob<string>('../data/notes/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
})

function isValidIsoDate(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  )
}

function buildNoteGroups(): readonly HomeNoteGroup[] {
  const groups = new Map<string, MutableHomeNoteGroup>()

  for (const [path, rawContent] of Object.entries(noteModules)) {
    const match = NOTE_FILE_PATTERN.exec(path)
    if (!match?.groups) {
      throw new Error(`Invalid note filename: ${path}`)
    }

    const { date, id, locale } = match.groups as {
      date: string
      id: string
      locale: Locale
    }
    if (!isValidIsoDate(date)) {
      throw new Error(`Invalid note date in filename: ${path}`)
    }

    const body = rawContent.trim()
    if (!body) {
      throw new Error(`Note content must not be empty: ${path}`)
    }
    if (body.startsWith('---')) {
      throw new Error(`Front matter is not supported in note files: ${path}`)
    }

    const group = groups.get(id) ?? { bodies: {}, date, id }
    if (group.bodies[locale]) {
      throw new Error(`Duplicate ${locale} note file for ${id}`)
    }

    group.bodies[locale] = body
    groups.set(id, group)
  }

  if (groups.size === 0) {
    throw new Error('At least one complete note is required')
  }

  return [...groups.values()]
    .map((group) => {
      const missingLocales = NOTE_LOCALES.filter((locale) => !group.bodies[locale])
      if (missingLocales.length > 0) {
        throw new Error(`Missing locale files for ${group.id}: ${missingLocales.join(', ')}`)
      }

      return {
        ...group,
        bodies: group.bodies as Record<Locale, string>,
      }
    })
    .sort((left, right) => {
      if (left.date !== right.date) {
        return right.date.localeCompare(left.date)
      }

      return left.id.localeCompare(right.id)
    })
}

const noteGroups = buildNoteGroups()

export function formatHomeNoteDate(date: string, locale: Locale) {
  const [year, month, day] = date.split('-')

  if (locale === 'zh-TW') {
    return `${year} 年 ${month} 月 ${day} 日`
  }

  if (locale === 'ja') {
    return `${year}年${Number(month)}月${Number(day)}日`
  }

  return `${year} / ${month} / ${day}`
}

export function getHomeNotes(locale: Locale): readonly HomeNote[] {
  return noteGroups.map((note) => ({
    body: note.bodies[locale],
    date: formatHomeNoteDate(note.date, locale),
    id: note.id,
  }))
}
