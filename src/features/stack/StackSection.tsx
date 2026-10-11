import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
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
        <SectionHeader
          titleId="stack-heading"
          eyebrow={ui.stackEyebrow}
          eyebrowTone="accent"
          title={ui.stackTitle}
          description={ui.stackLede}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
          {stack.map((group) => (
            <StackGroupCard key={group.id} group={group} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
