import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const eyebrowVariants = cva('font-mono text-label-caps tracking-widest uppercase', {
  variants: {
    tone: {
      secondary: 'text-eyebrow-secondary',
      tertiary: 'text-eyebrow-tertiary',
      accent: 'text-accent-fg',
      muted: 'text-muted',
    },
  },
  defaultVariants: {
    tone: 'secondary',
  },
})

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string
  eyebrowTone?: VariantProps<typeof eyebrowVariants>['tone']
  title: string
  description?: string
  headingLevel?: 'h1' | 'h2' | 'h3'
  titleId?: string
}

/**
 * SectionHeader primitive composing eyebrow, heading, and lede description.
 */
export const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  (
    {
      className,
      eyebrow,
      eyebrowTone = 'secondary',
      title,
      description,
      headingLevel: Heading = 'h2',
      titleId,
      ...props
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn('flex flex-col gap-3', className)} {...props}>
        {eyebrow && <span className={eyebrowVariants({ tone: eyebrowTone })}>{eyebrow}</span>}
        <Heading
          id={titleId}
          className="font-display text-headline-lg-m text-fg md:text-headline-lg"
        >
          {title}
        </Heading>
        {description && <p className="font-body text-body-md text-muted max-w-xl">{description}</p>}
      </div>
    )
  },
)

SectionHeader.displayName = 'SectionHeader'
