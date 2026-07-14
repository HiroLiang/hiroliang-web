export function CommandBlock({ command }: { command: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-border bg-background/60 p-3 text-sm leading-6 text-foreground">
      <code>{command}</code>
    </pre>
  )
}
