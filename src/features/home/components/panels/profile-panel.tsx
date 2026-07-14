import { HOME_SKILLS } from '@/features/home/data/home-content'
import { useMessages } from '@/hooks/use-locale'

import { SectionShell } from '@/components/ui/section-shell'

export function ProfilePanel() {
  const t = useMessages()

  return (
    <SectionShell>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        {t.home.hero.eyebrow}
      </p>
      <h2 className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-foreground">
        {t.home.hero.title}
      </h2>
      <p className="text-base leading-8 text-muted-foreground">{t.home.panels.profile.body}</p>
      <p className="text-base leading-8 text-muted-foreground">{t.home.hero.intro}</p>
      <p className="text-base leading-8 text-muted-foreground">{t.home.summary}</p>

      <div className="space-y-3 pt-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          {t.home.panels.profile.skillsLabel}
        </p>
        <div className="flex flex-wrap gap-x-3 gap-y-2 text-sm text-muted-foreground">
          {HOME_SKILLS.map((skill, index) => (
            <span key={skill}>
              {skill}
              {index < HOME_SKILLS.length - 1 ? <span className="ml-3 text-border">/</span> : null}
            </span>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
