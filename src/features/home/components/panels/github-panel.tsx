import { Button } from '@/components/ui/button'
import { GITHUB_PROFILE_URL } from '@/features/home/data/home-content'
import { useMessages } from '@/hooks/use-locale'

import { SectionShell } from '@/components/ui/section-shell'

export function GithubPanel() {
  const t = useMessages()

  return (
    <SectionShell>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        {t.home.panels.github.eyebrow}
      </p>
      <h2 className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-foreground">
        {t.home.panels.github.title}
      </h2>
      <p className="text-base leading-8 text-muted-foreground">{t.home.panels.github.body}</p>
      <div className="flex flex-wrap gap-3 pt-1">
        <Button asChild>
          <a href={GITHUB_PROFILE_URL} rel="noreferrer" target="_blank">
            {t.home.panels.github.cta}
          </a>
        </Button>
      </div>
    </SectionShell>
  )
}
