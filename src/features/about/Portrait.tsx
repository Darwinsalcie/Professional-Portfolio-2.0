import * as React from 'react'
import { Monogram } from '@/components/Monogram'
import { cn } from '@/lib/cn'

export interface PortraitProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  initials?: string
}

/**
 * Owner portrait photo slot or geometric monogram frame (no stock photos).
 * Framed in 340px square card matching code.html.
 */
export function Portrait({
  className,
  src,
  alt = 'Owner Portrait',
  initials = 'NJ',
  ...props
}: PortraitProps) {
  return (
    <div
      className={cn(
        'rounded-panel border-hairline shadow-panel relative flex aspect-square w-full max-w-[340px] items-center justify-center border bg-white/[0.04] p-3 backdrop-blur-2xl',
        className,
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="rounded-card h-full w-full object-cover brightness-95 contrast-125 grayscale"
        />
      ) : (
        <div className="rounded-card border-hairline/60 bg-surface-sunken/60 flex h-full w-full flex-col items-center justify-center border p-6 text-center">
          <Monogram initials={initials} size={80} className="text-accent-fg" />
          <span className="text-label-code text-subtle mt-4 font-mono">
            {initials} // ARCHITECT
          </span>
        </div>
      )}
    </div>
  )
}
