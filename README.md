# Portfolio 2.0

> Production-grade personal portfolio and consulting showcase for a full-stack developer (React 19 + .NET).

Designed with architectural rigor, rich frosted-glass aesthetic layering, strict WCAG 2.1 AA accessibility in dark and light modes, and bilingual support (Spanish and English).

---

## Tech Stack

- **Core Framework**: React 19 + Vite 8
- **Language**: TypeScript 6 (`strict`, `noUncheckedIndexedAccess`, zero warnings)
- **Styling**: Tailwind CSS 4 (`@tailwindcss/vite`) + CSS Custom Properties Design Tokens
- **UI & Accessibility Primitives**: Radix UI + shadcn/ui custom primitives
- **Motion**: `motion` 14 (`motion/react`) with strict `prefers-reduced-motion: reduce` compliance
- **Routing**: React Router 8 with locale-prefixed routes (`/:lang`, `/:lang/work/:slug`)
- **Forms & Validation**: React Hook Form 7 + Zod 4 (`@hookform/resolvers`)
- **Typography**: Self-hosted variable fonts via Fontsource (`Epilogue`, `Manrope`, `JetBrains Mono`)
- **Testing & Quality**: Vitest 5, React Testing Library 16, axe-core (`vitest-axe`), ESLint 9, Prettier 3, Husky 9 + Commitlint
- **Package Manager**: `pnpm` exclusively

---

## Quick Setup (< 10 minutes)

### Prerequisites

- Node.js 22 or higher (`node -v`)
- pnpm 11+ (`corepack enable && corepack prepare pnpm@latest --activate` or `npm i -g pnpm`)

### Installation & Local Development

```bash
# Clone the repository
git clone <repository-url>
cd "Professional Portfolio 2.0"

# Install dependencies using pnpm
pnpm install

# Start the local development server
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Scripts & Quality Gates

The quality gate must pass with zero errors and zero warnings before every commit:

| Script               | Purpose                                                        |
| :------------------- | :------------------------------------------------------------- |
| `pnpm dev`           | Starts Vite local development server with HMR                  |
| `pnpm build`         | Typechecks (`tsc -b`) and bundles production assets to `/dist` |
| `pnpm postbuild`     | Generates static `sitemap.xml` for all canonical routes        |
| `pnpm preview`       | Serves the production bundle locally                           |
| `pnpm typecheck`     | Strict TypeScript validation without emitting files            |
| `pnpm lint`          | Runs ESLint with zero-warning threshold (`--max-warnings 0`)   |
| `pnpm lint:fix`      | Automatically formats and fixes autofixable lint errors        |
| `pnpm format`        | Formats all code with Prettier                                 |
| `pnpm test`          | Runs the full Vitest suite in CI mode                          |
| `pnpm content:check` | Scans for any pending `TODO(content)` placeholders             |

Run the full gate:

```bash
pnpm typecheck && pnpm lint && pnpm test && pnpm build
```

---

## Architecture Overview

```
public/              # Favicons, web manifest, robots.txt, sitemap.xml, OG card
scripts/             # Build-time node automation (sitemap generator, content checklist)
src/app/             # Application entry, router, providers (theme, motion, locale)
src/pages/           # Lazy-loaded route components (HomePage, CaseStudyPage, NotFoundPage)
src/components/ui/   # Accessible shadcn / Radix primitives (Button, RadioGroup, Sheet...)
src/components/      # Design system building blocks (Card, Container, SectionHeader, Reveal...)
src/features/
  ├── theme/         # System-aware theme switcher (Dark, Light, System)
  ├── i18n/          # Locale routing and language selection (es / en)
  ├── layout/        # SiteHeader, SiteFooter, DesktopNav, MobileNav, Avatar
  ├── hero/          # Hero section and SVG topology diagram
  ├── projects/      # Showcase project cards and domain categories
  ├── services/      # Consulting capabilities and services cards
  ├── stack/         # Technology ledger grouped cards
  ├── about/         # Biography narrative, Portrait frame, and core principles
  ├── contact/       # Contact links and validated form with live feedback
  └── case-study/    # In-depth project case study layout and prev/next pager
src/content/         # Typed bilingual content dictionaries (site, hero, projects, etc.)
src/styles/          # Tailwind 4 theme configuration, token definitions, and base CSS
```

---

## Theme System

The portfolio features a high-performance, flash-free theme engine:

- **Modes**: `dark`, `light`, and `system` (live synchronization with OS `prefers-color-scheme`).
- **Aesthetics**: Ink canvas (`#131315`), subtle ambient hairlines, and frosted glass translucent surfaces (`backdrop-blur-2xl`) in both themes.
- **Zero Flash on Load**: An inline script in `<head>` resolves stored or OS preferences and applies `data-theme` before the first paint.

---

## Content Editing

All copy, project data, and contact coordinates live in `src/content/`:

- `site.ts`: Personal details, verified contact email, links, location.
- `hero.ts`: Headlines, lede, and call-to-actions.
- `projects.ts`: Featured projects and complete case studies (problem, approach, architecture, outcomes).
- `services.ts`: Specialized consulting offerings.
- `stack.ts`: Core and auxiliary technology groupings.
- `about.ts`: Biography narrative and engineering principles.
- `contact.ts`: Form labels, direct lines, and feedback notifications.

Run `pnpm content:check` at any time to verify pending placeholders.

---

## Contact Endpoint Configuration

The contact form sends submissions via a POST request. In local development, submissions resolve gracefully with mock confirmations. In production, configure your endpoint via environment variables:

```bash
VITE_CONTACT_ENDPOINT="https://your-api-endpoint.com/api/contact"
VITE_SITE_URL="https://your-portfolio-domain.com"
```

---

## Deployment

This portfolio builds into a purely static bundle (`/dist`):

1. **Build**: Run `pnpm build`.
2. **Deploy**: Upload the `/dist` directory to any static host (Cloudflare Pages, Vercel, Netlify, GitHub Pages, or AWS S3 + CloudFront).
3. **SPA Routing**: Configure static host rewrite rules to redirect all unmatched requests to `/index.html` (HTTP 200).
