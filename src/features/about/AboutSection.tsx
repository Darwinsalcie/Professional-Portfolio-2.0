import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { IndexNumber } from '@/components/IndexNumber'
import { Reveal } from '@/components/Reveal'
import { Portrait } from './Portrait'
import type { AboutContent, SiteMeta } from '@/types/content'

export interface AboutSectionProps {
  about: AboutContent
  meta: SiteMeta
}

/**
 * About section (#about) featuring 5/7 split with Portrait frame,
 * narrative biography, and indexed engineering principles.
 */
export function AboutSection({ about, meta }: AboutSectionProps) {
  return (
    <Section id="about" ariaLabelledby="about-heading" className="py-8 md:py-12">
      <Container>
        <Reveal>
          <Card
            as="div"
            variant="panel"
            className="grid grid-cols-1 items-center gap-8 p-8 sm:p-12 md:p-16 lg:grid-cols-12 lg:gap-12"
          >
            {/* Column 1: Portrait */}
            <div className="flex justify-center lg:col-span-5">
              <Portrait initials="DS" />
            </div>

            {/* Column 2: Narrative & Principles */}
            <div className="flex flex-col gap-6 lg:col-span-7">
              <div className="flex flex-col gap-2">
                <span className="text-label-caps text-eyebrow-secondary font-mono tracking-widest uppercase">
                  {about.eyebrow}
                </span>
                <h2
                  id="about-heading"
                  className="font-display text-headline-lg-m md:text-headline-lg text-fg tracking-tight"
                >
                  {meta.name}
                </h2>
                <span className="font-display text-headline-sm text-eyebrow-tertiary font-normal">
                  {about.heading}
                </span>
              </div>

              {/* Narrative Paragraphs */}
              <div className="font-body text-body-md text-muted flex max-w-xl flex-col gap-4">
                {about.narrative.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Professional Credentials & Resume Bar */}
              {(about.experienceNotice ?? about.educationNotice ?? about.resumeCta) && (
                <div className="rounded-card border-hairline bg-surface/60 flex flex-col gap-4 p-4 md:p-5">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {about.experienceNotice && (
                      <div className="rounded-control border-hairline bg-surface-sunken/80 flex flex-col justify-center gap-1 p-3">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                            aria-hidden="true"
                          />
                          <span className="text-label-caps text-subtle font-mono text-[10px] tracking-wider uppercase">
                            Rol Actual
                          </span>
                        </div>
                        <div className="text-fg font-mono text-sm font-semibold">
                          {about.experienceNotice.role}
                        </div>
                        <div className="text-muted text-xs">
                          {about.experienceNotice.organization} ·{' '}
                          <span className="text-subtle font-mono">
                            {about.experienceNotice.period}
                          </span>
                        </div>
                      </div>
                    )}

                    {about.educationNotice && (
                      <div className="rounded-control border-hairline bg-surface-sunken/80 flex flex-col justify-center gap-1 p-3">
                        <div className="flex items-center gap-2">
                          <span className="text-accent-fg text-xs">🎓</span>
                          <span className="text-label-caps text-subtle font-mono text-[10px] tracking-wider uppercase">
                            Formación Académica
                          </span>
                        </div>
                        <div className="text-fg font-mono text-sm font-semibold">
                          {about.educationNotice.status}
                        </div>
                        <div className="text-muted text-xs">{about.educationNotice.progress}</div>
                      </div>
                    )}
                  </div>

                  {about.resumeCta && (
                    <div className="border-hairline flex items-center justify-between border-t pt-3">
                      <span className="text-muted font-mono text-xs">Currículum Vitae (PDF)</span>
                      <a
                        href={about.resumeCta.href}
                        download
                        className="rounded-control border-hairline bg-surface-raised hover:bg-surface-hover hover:border-accent text-fg inline-flex items-center gap-2 px-3.5 py-1.5 font-mono text-xs font-medium transition-all"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-accent-fg h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        <span>{about.resumeCta.label}</span>
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Indexed Principles List */}
              <div className="border-hairline/80 flex flex-col gap-4 border-t pt-4">
                {about.principles.map((principle) => (
                  <div key={principle.index} className="flex items-start gap-3.5">
                    <IndexNumber value={principle.index} className="mt-0.5" />
                    <div className="flex flex-col gap-0.5">
                      <span className="font-body text-body-md text-fg font-semibold">
                        {principle.title}
                      </span>
                      <span className="font-body text-body-sm text-muted">
                        {principle.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Reveal>
      </Container>
    </Section>
  )
}
