import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const NOTE_LOCALES = ['en', 'zh-TW', 'ja']
const NOTE_FILE_PATTERN = /^(?<id>(?<date>\d{4}-\d{2}-\d{2})-[a-z0-9]+(?:-[a-z0-9]+)*)\.(?<locale>en|zh-TW|ja)\.md$/
const NOTES_DIRECTORY = fileURLToPath(
  new URL('../src/features/home/data/notes/', import.meta.url),
)

function isValidIsoDate(value) {
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  )
}

async function validateNotes() {
  const entries = await readdir(NOTES_DIRECTORY, { withFileTypes: true })
  const errors = []
  const noteGroups = new Map()

  for (const entry of entries) {
    if (!entry.isFile()) {
      errors.push(`Only Markdown files are allowed in the notes directory: ${entry.name}`)
      continue
    }

    const match = NOTE_FILE_PATTERN.exec(entry.name)
    if (!match?.groups) {
      errors.push(`Invalid note filename: ${entry.name}`)
      continue
    }

    const { date, id, locale } = match.groups
    if (!isValidIsoDate(date)) {
      errors.push(`Invalid note date in filename: ${entry.name}`)
      continue
    }

    const content = (await readFile(join(NOTES_DIRECTORY, entry.name), 'utf8')).trim()
    if (!content) {
      errors.push(`Note content must not be empty: ${entry.name}`)
    } else if (content.startsWith('---')) {
      errors.push(`Front matter is not supported in note files: ${entry.name}`)
    }

    const locales = noteGroups.get(id) ?? new Set()
    if (locales.has(locale)) {
      errors.push(`Duplicate ${locale} note file for ${id}`)
    }
    locales.add(locale)
    noteGroups.set(id, locales)
  }

  if (noteGroups.size === 0) {
    errors.push('At least one complete note is required')
  }

  for (const [id, locales] of noteGroups) {
    const missingLocales = NOTE_LOCALES.filter((locale) => !locales.has(locale))
    if (missingLocales.length > 0) {
      errors.push(`Missing locale files for ${id}: ${missingLocales.join(', ')}`)
    }
  }

  if (errors.length > 0) {
    throw new Error(`Note validation failed:\n- ${errors.join('\n- ')}`)
  }

  console.log(`Validated ${noteGroups.size} note groups (${entries.length} Markdown files).`)
}

await validateNotes()
