import { Card } from '@/components/Card'
import { Chip } from '@/components/Chip'
import type { StackGroup } from '@/types/content'

export interface StackGroupProps {
  group: StackGroup
}

/**
 * Stack group category container rendering ledger chips.
 * Distinct styles for 'core' vs 'utility' stack items per ARCHITECTURE §3.2.
 */
export function StackGroupCard({ group }: StackGroupProps) {
  return (
    <Card as="div" variant="card" className="flex flex-col gap-5 p-6 sm:p-8">
      <h3 className="font-display text-headline-sm text-fg font-medium">{group.title}</h3>

      <div className="flex flex-wrap gap-2.5 pt-2">
        {group.items.map((item) => (
          <Chip
            key={item.name}
            variant="ledger"
            className={
              item.tone === 'core'
                ? 'text-fg border-hairline-strong bg-white/[0.06] font-medium'
                : 'text-muted border-hairline bg-white/[0.03]'
            }
          >
            {item.name}
          </Chip>
        ))}
      </div>
    </Card>
  )
}
