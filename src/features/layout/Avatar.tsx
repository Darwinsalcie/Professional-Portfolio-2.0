import * as React from 'react'
import { Monogram } from '@/components/Monogram'
import { cn } from '@/lib/cn'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  initials?: string
  size?: number
}

/**
 * Round header avatar with fallback to geometric Monogram.
 */
export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt = 'Avatar', initials = 'NJ', size = 32, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{ width: size, height: size }}
        className={cn(
          'ring-hairline-strong relative flex shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 select-none',
          className,
        )}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            width={size}
            height={size}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <Monogram initials={initials} size={size} className="h-full w-full" />
        )}
      </div>
    )
  },
)

Avatar.displayName = 'Avatar'
