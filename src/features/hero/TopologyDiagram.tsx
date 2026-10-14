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

        <div className="rounded-card bg-surface-sunken/80 border-hairline relative flex h-[230px] w-full items-center justify-center overflow-hidden border p-3 sm:h-[270px] sm:p-5">
          {/* Subtle grid pattern background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
            aria-hidden="true"
          />

          <svg
            className="h-full max-h-[220px] w-full max-w-[380px]"
            fill="none"
            viewBox="0 0 380 210"
            role="img"
            aria-labelledby="topology-svg-title topology-svg-desc"
          >
            <title id="topology-svg-title">Full-Stack & DevOps Topology Diagram</title>
            <desc id="topology-svg-desc">
              Arquitectura de producción: Cliente Web SPA comunicándose con API en ASP.NET Core,
              procesamiento en segundo plano con Hangfire, persistencia en PostgreSQL y contenedores
              Docker.
            </desc>

            <defs>
              <linearGradient id="edgeLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--accent-fg)" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="apiLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--accent-fg)" stopOpacity="0.9" />
                <stop offset="100%" stopColor="var(--eyebrow-tertiary)" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Path lines */}
            {/* React SPA -> ASP.NET Core API */}
            <path
              className="text-subtle stroke-current"
              strokeDasharray="3 3"
              d="M70 105 H130"
              strokeWidth="1.5"
            />
            {/* Active animated pulsing line */}
            <path
              d="M70 105 H130"
              stroke="url(#edgeLineGrad)"
              strokeWidth="2"
              strokeDasharray="6 14"
              className="motion-reduce:animate-none"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="40"
                to="0"
                dur="1.8s"
                repeatCount="indefinite"
              />
            </path>

            {/* API -> Hangfire / Workers */}
            <path
              className="text-subtle stroke-current opacity-40"
              d="M230 85 C250 85 260 50 280 50 H300"
              strokeWidth="1.5"
            />
            <path
              d="M230 85 C250 85 260 50 280 50 H300"
              stroke="var(--eyebrow-tertiary)"
              strokeWidth="1.75"
              strokeDasharray="4 8"
              className="motion-reduce:animate-none"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="30"
                to="0"
                dur="2.2s"
                repeatCount="indefinite"
              />
            </path>

            {/* API -> PostgreSQL DB */}
            <path
              className="text-subtle stroke-current opacity-40"
              d="M230 125 C250 125 260 160 280 160 H300"
              strokeWidth="1.5"
            />
            <path
              d="M230 125 C250 125 260 160 280 160 H300"
              stroke="var(--accent)"
              strokeWidth="1.75"
              strokeDasharray="4 8"
              className="motion-reduce:animate-none"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-30"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </path>

            {/* 1. Client Node: React SPA */}
            <g transform="translate(10, 80)">
              <rect
                fill="var(--surface-raised)"
                stroke="var(--hairline-strong)"
                width="60"
                height="50"
                rx="8"
              />
              <circle cx="30" cy="18" r="3" fill="var(--accent)" />
              <text
                fill="var(--fg-body)"
                fontFamily="var(--font-mono)"
                fontSize="9"
                fontWeight="700"
                textAnchor="middle"
                x="30"
                y="34"
              >
                REACT
              </text>
              <text
                fill="var(--subtle)"
                fontFamily="var(--font-mono)"
                fontSize="7.5"
                textAnchor="middle"
                x="30"
                y="43"
              >
                SPA Client
              </text>
            </g>

            {/* 2. Central Backend Node: ASP.NET Core Monolith / RBAC */}
            <g transform="translate(130, 70)">
              <rect
                fill="var(--accent)"
                fillOpacity="0.12"
                stroke="var(--accent)"
                strokeWidth="1.5"
                width="100"
                height="70"
                rx="8"
              />
              {/* Docker beacon pill inside */}
              <rect
                x="25"
                y="8"
                width="50"
                height="13"
                rx="6.5"
                fill="var(--accent)"
                fillOpacity="0.25"
              />
              <text
                fill="var(--accent-fg)"
                fontFamily="var(--font-mono)"
                fontSize="7"
                fontWeight="700"
                textAnchor="middle"
                x="50"
                y="17"
              >
                DOCKER
              </text>
              <text
                fill="var(--fg)"
                fontFamily="var(--font-mono)"
                fontSize="9"
                fontWeight="700"
                textAnchor="middle"
                x="50"
                y="37"
              >
                ASP.NET Core
              </text>
              <text
                fill="var(--eyebrow-secondary)"
                fontFamily="var(--font-mono)"
                fontSize="8"
                textAnchor="middle"
                x="50"
                y="49"
              >
                REST API · RBAC
              </text>
              <text
                fill="var(--subtle)"
                fontFamily="var(--font-mono)"
                fontSize="7"
                textAnchor="middle"
                x="50"
                y="59"
              >
                Clean Monolith
              </text>
            </g>

            {/* 3. Upper Worker Node: Hangfire Jobs & Mails */}
            <g transform="translate(300, 25)">
              <rect
                fill="var(--surface-raised)"
                stroke="var(--eyebrow-tertiary)"
                strokeOpacity="0.5"
                width="72"
                height="48"
                rx="8"
              />
              <circle cx="15" cy="15" r="2.5" fill="var(--eyebrow-tertiary)">
                <animate
                  attributeName="opacity"
                  values="0.3;1;0.3"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              <text
                fill="var(--eyebrow-tertiary)"
                fontFamily="var(--font-mono)"
                fontSize="8.5"
                fontWeight="600"
                textAnchor="middle"
                x="40"
                y="22"
              >
                HANGFIRE
              </text>
              <text
                fill="var(--subtle)"
                fontFamily="var(--font-mono)"
                fontSize="7.5"
                textAnchor="middle"
                x="36"
                y="35"
              >
                Jobs & Emails
              </text>
            </g>

            {/* 4. Lower Data Node: PostgreSQL */}
            <g transform="translate(300, 135)">
              <rect
                fill="var(--surface-raised)"
                stroke="var(--accent)"
                strokeOpacity="0.4"
                width="72"
                height="48"
                rx="8"
              />
              <circle cx="15" cy="15" r="2.5" fill="var(--accent)">
                <animate
                  attributeName="opacity"
                  values="1;0.4;1"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              </circle>
              <text
                fill="var(--fg-body)"
                fontFamily="var(--font-mono)"
                fontSize="8.5"
                fontWeight="600"
                textAnchor="middle"
                x="40"
                y="22"
              >
                POSTGRES
              </text>
              <text
                fill="var(--subtle)"
                fontFamily="var(--font-mono)"
                fontSize="7.5"
                textAnchor="middle"
                x="36"
                y="35"
              >
                EF Core / SQL
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
