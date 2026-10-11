import { Mail, GitBranch, Link, MessageSquare } from 'lucide-react'
import type { ContactDirectLink } from '@/types/content'

export interface ContactLinksProps {
  links: ContactDirectLink[]
}

const iconMap = {
  email: Mail,
  github: GitBranch,
  linkedin: Link,
  whatsapp: MessageSquare,
} as const

/**
 * Direct contact channels list (email, GitHub, LinkedIn, WhatsApp).
 * Formatted with JetBrains Mono, lucide icons, and secure rel="noopener noreferrer" external links.
 */
export function ContactLinks({ links }: ContactLinksProps) {
  return (
    <ul className="text-label-code flex flex-col gap-3 font-mono">
      {links.map((link) => {
        const Icon = iconMap[link.type]
        const isExternal = !link.url.startsWith('mailto:')

        return (
          <li key={link.type}>
            <a
              href={link.url}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="group text-fg-muted hover:text-accent-fg inline-flex items-center gap-3 transition-colors"
            >
              <span className="rounded-control border-hairline bg-surface/60 group-hover:border-hairline-strong group-hover:bg-surface-hover flex h-8 w-8 items-center justify-center border transition-colors">
                <Icon className="text-accent-fg h-4 w-4" aria-hidden="true" />
              </span>
              <span>{link.label}</span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
