import DOMPurify from 'dompurify'
import { marked } from 'marked'

export function renderMarkdown(content: string): string {
  return DOMPurify.sanitize(marked.parse(content) as string)
}
