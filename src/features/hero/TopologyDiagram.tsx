import * as React from 'react'
import { Card } from '@/components/Card'
import { StatusBeacon } from '@/components/StatusBeacon'
import { cn } from '@/lib/cn'

export interface TopologyDiagramProps extends React.HTMLAttributes<HTMLDivElement> {
  systemLabel?: string
  regionLabel?: string
  statusLabel?: string
  latencyLabel?: string
}

/**
 * System Topology Diagram as depicted in code.html, styled cleanly with CSS vars.
 * Features fixed aspect-ratio SVG to prevent CLS.
 */
export const TopologyDiagram = React.forwardRef<HTMLDivElement, TopologyDiagramProps>(
  (
    {
      className,
      systemLabel = 'system-topology',
      regionLabel = 'US-EAST-1',
      statusLabel = 'Operational',
      latencyLabel = 'Latency: <14ms',
      ...props
    },
    ref,
  ) => {
    return (
      <Card
        ref={ref}
        variant="card"
        className={cn('flex flex-col gap-6 p-6 sm:p-8', className)}
        {...props}
      >
        <div className="border-hairline flex items-center justify-between border-b pb-4">
          <span className="text-label-code text-muted font-mono">{systemLabel}</span>
          <span className="text-label-code text-eyebrow-tertiary font-mono">{regionLabel}</span>
        </div>

        <div className="rounded-card bg-surface-sunken/80 border-hairline relative flex h-[220px] w-full items-center justify-center border p-4 sm:h-[260px] sm:p-6">
          <svg
            className="h-full max-h-[180px] w-full max-w-[340px]"
            fill="none"
            viewBox="0 0 340 180"
            role="img"
            aria-labelledby="topology-svg-title topology-svg-desc"
          >
            <title id="topology-svg-title">Distributed System Topology Diagram</title>
            <desc id="topology-svg-desc">
              Network route diagram depicting Edge gateway routed to .NET Core API and Kafka event
              bus.
            </desc>

            {/* Path lines */}
            <path
              className="text-subtle stroke-current"
              strokeDasharray="4 4"
              d="M40 90 H130"
              strokeWidth="1.5"
            />
            <path
              className="text-accent stroke-current"
              d="M130 90 C160 90 170 45 210 45 H280"
              strokeWidth="2"
            />
            <path
              className="text-eyebrow-tertiary stroke-current"
              d="M130 90 C160 90 170 135 210 135 H280"
              strokeWidth="2"
            />

            {/* Edge Node */}
            <g transform="translate(20, 70)">
              <rect
                fill="var(--surface-raised)"
                stroke="var(--hairline-strong)"
                width="50"
                height="40"
                rx="6"
              />
              <text
                fill="var(--fg-body)"
                fontFamily="var(--font-mono)"
                fontSize="9"
                fontWeight="600"
                textAnchor="middle"
                x="25"
                y="24"
              >
                EDGE
              </text>
            </g>

            {/* Router Node */}
            <g transform="translate(110, 70)">
              <rect
                fill="var(--accent)"
                fillOpacity="0.25"
                stroke="var(--accent)"
                width="50"
                height="40"
                rx="6"
              />
              <text
                fill="var(--fg)"
                fontFamily="var(--font-mono)"
                fontSize="9"
                fontWeight="600"
                textAnchor="middle"
                x="25"
                y="24"
              >
                ROUTER
              </text>
            </g>

            {/* .NET API Node */}
            <g transform="translate(210, 25)">
              <rect
                fill="var(--surface-raised)"
                stroke="var(--eyebrow-secondary)"
                strokeOpacity="0.4"
                width="95"
                height="40"
                rx="6"
              />
              <text
                fill="var(--eyebrow-secondary)"
                fontFamily="var(--font-mono)"
                fontSize="9"
                fontWeight="500"
                textAnchor="middle"
                x="47.5"
                y="24"
              >
                .NET Core API
              </text>
            </g>

            {/* Kafka Bus Node */}
            <g transform="translate(210, 115)">
              <rect
                fill="var(--surface-raised)"
                stroke="var(--eyebrow-tertiary)"
                strokeOpacity="0.4"
                width="95"
                height="40"
                rx="6"
              />
              <text
                fill="var(--eyebrow-tertiary)"
                fontFamily="var(--font-mono)"
                fontSize="9"
                fontWeight="500"
                textAnchor="middle"
                x="47.5"
                y="24"
              >
                Kafka Bus
              </text>
            </g>
          </svg>
        </div>

        <div className="text-label-code text-muted flex items-center justify-between font-mono">
          <StatusBeacon status="success" label={statusLabel} />
          <span>{latencyLabel}</span>
        </div>
      </Card>
    )
  },
)

TopologyDiagram.displayName = 'TopologyDiagram'
