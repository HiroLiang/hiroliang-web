import { renderMarkdown } from '@/shared/markdown/markdown.service'

export function MessageRenderer({ content, mode = 'text' }: { content: string; mode?: 'markdown' | 'text' }) {
  if (mode === 'markdown') {
    return (
      <div
        className="markdown-body prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{
          __html: renderMarkdown(content),
        }}
      />
    )
  }

  return <p className="whitespace-pre-wrap">{content}</p>
}
