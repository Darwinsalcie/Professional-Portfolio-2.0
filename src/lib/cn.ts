import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-headline-xl',
        'text-headline-xl-m',
        'text-headline-lg',
        'text-headline-lg-m',
        'text-headline-md',
        'text-headline-sm',
        'text-body-lg',
        'text-body-md',
        'text-body-sm',
        'text-label-code',
        'text-label-caps',
      ],
      rounded: ['rounded-chip', 'rounded-nav', 'rounded-control', 'rounded-card', 'rounded-panel'],
    },
  },
})

/**
 * Merges class names safely using clsx and custom extended tailwind-merge.
 */
export function cn(...inputs: ClassValue[]): string {
  return customTwMerge(clsx(inputs))
}
