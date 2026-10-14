import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { Reveal } from '@/components/Reveal'
import { ContactForm } from './ContactForm'
import { ContactLinks } from './ContactLinks'
import type { ContactContent } from '@/types/content'

export interface ContactSectionProps {
  contact: ContactContent
}

/**
 * Contact section (#contact) featuring 5/7 responsive split:
 * - 5 cols: Section header, communication context, direct channels
 * - 7 cols: Validated interactive contact form
 */
export function ContactSection({ contact }: ContactSectionProps) {
  return (
    <Section id="contact" ariaLabelledby="contact-heading" className="py-8 md:py-12">
      <Container>
        <Reveal>
          <Card as="div" variant="panel" className="p-8 sm:p-12 md:p-16">
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
              {/* Left 5 Cols: Context & Direct Lines */}
              <div className="flex flex-col gap-6 lg:col-span-5">
                <SectionHeader
                  titleId="contact-heading"
                  eyebrow={contact.eyebrow}
                  title={contact.heading}
                  description={contact.lede}
                  className="max-w-none"
                />

                <div className="border-hairline border-t pt-2">
                  <span className="text-label-caps text-fg mb-4 block font-mono tracking-wider uppercase">
                    Direct Lines
                  </span>
                  <ContactLinks links={contact.directLinks} />
                </div>
              </div>

              {/* Right 7 Cols: Contact Form */}
              <div className="rounded-card border-hairline/80 bg-surface-sunken/40 flex flex-col border p-6 sm:p-8 lg:col-span-7">
                <ContactForm formLabels={contact.formLabels} />
              </div>
            </div>
          </Card>
        </Reveal>
      </Container>
    </Section>
  )
}
