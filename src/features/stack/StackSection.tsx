import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { Reveal } from '@/components/Reveal'
import { StackGroupCard } from './StackGroupCard'
import type { StackGroup, UiLabels } from '@/types/content'

export interface StackSectionProps {
  stack: StackGroup[]
  ui: UiLabels
}

/**
 * Stack Ledger section (#stack) featuring 3-column category grid.
 */
export function StackSection({ stack, ui }: StackSectionProps) {
  return (
    <Section id="stack" ariaLabelledby="stack-heading" className="py-12 md:py-20">
      <Container className="flex flex-col gap-10">
        <Reveal>
          <SectionHeader
            titleId="stack-heading"
            eyebrow={ui.stackEyebrow}
            eyebrowTone="accent"
            title={ui.stackTitle}
            description={ui.stackLede}
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
          {stack.map((group, idx) => (
            <Reveal key={group.id} delay={idx * 0.1}>
              <StackGroupCard group={group} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
