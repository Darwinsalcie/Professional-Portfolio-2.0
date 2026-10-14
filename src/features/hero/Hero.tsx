import { Button } from '@/components/ui/button'
import { Container } from '@/components/Container'
import { TopologyDiagram } from './TopologyDiagram'
import type { HeroContent } from '@/types/content'

export interface HeroProps {
  content: HeroContent
  locale: string
}

/**
 * Hero section featuring accessible single h1, headline gradient text,
 * dual CTAs, and SVG system topology diagram.
 */
export function Hero({ content, locale }: HeroProps) {
  const primaryHref = `/${locale}${content.primaryCta.href}`
  const secondaryHref = `/${locale}${content.secondaryCta.href}`

  return (
    <section
      aria-labelledby="hero-title"
      className="relative w-full overflow-hidden pt-6 pb-12 md:pt-8 md:pb-16"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Eyebrow, h1, lede, CTAs */}
          <div className="flex flex-col gap-6 md:gap-8 lg:col-span-7">
            <div className="flex flex-col gap-3 md:gap-4">
              <span className="text-label-caps text-eyebrow-secondary font-mono tracking-widest uppercase">
                {content.eyebrow}
              </span>

              <h1
                id="hero-title"
                className="font-display text-headline-xl-m md:text-headline-xl text-fg leading-tight tracking-tight"
              >
                <span>{content.titleLine1} </span>
                <span className="from-accent-fg via-accent to-eyebrow-tertiary bg-gradient-to-r bg-clip-text text-transparent">
                  {content.titleLine2}
                </span>
              </h1>
            </div>

            <p className="font-body text-body-lg text-muted max-w-xl">{content.lede}</p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button asChild size="lg" variant="primary" showArrow>
                <a href={primaryHref}>{content.primaryCta.label}</a>
              </Button>

              <Button asChild size="lg" variant="ghost">
                <a href={secondaryHref}>{content.secondaryCta.label}</a>
              </Button>
            </div>
          </div>

          {/* Right Column: Topology Diagram */}
          <div className="relative mx-auto w-full max-w-lg lg:col-span-5 lg:max-w-none">
            <TopologyDiagram />
          </div>
        </div>
      </Container>
    </section>
  )
}
