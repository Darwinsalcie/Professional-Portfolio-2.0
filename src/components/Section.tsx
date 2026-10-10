import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  id: string
  children: ReactNode
  ariaLabelledby?: string
}

export function Section({ id, children, ariaLabelledby, className, ...props }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn('py-section-m md:py-section scroll-mt-20', className)}
      {...props}
    >
      {children}
    </section>
  )
}
