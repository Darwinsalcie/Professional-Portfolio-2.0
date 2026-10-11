import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { IndexNumber } from '@/components/IndexNumber'
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
    <Section id="about" ariaLabelledby="about-heading" className="py-12 md:py-20">
      <Container>
        <Card
          as="div"
          variant="panel"
          className="grid grid-cols-1 items-center gap-8 p-8 sm:p-12 md:p-16 lg:grid-cols-12 lg:gap-12"
        >
          {/* Column 1: Portrait */}
          <div className="flex justify-center lg:col-span-5">
            <Portrait initials={meta.name.slice(0, 2).toUpperCase()} />
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
      </Container>
    </Section>
  )
}
