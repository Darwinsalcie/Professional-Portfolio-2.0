---
name: Architectural Precision
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1c1b1d'
  surface-container: '#201f21'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#c4c5d7'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#313032'
  outline: '#8e90a0'
  outline-variant: '#434655'
  surface-tint: '#b7c4ff'
  primary: '#b7c4ff'
  on-primary: '#002682'
  primary-container: '#1d4ed8'
  on-primary-container: '#cad3ff'
  inverse-primary: '#2151da'
  secondary: '#b4c5ff'
  on-secondary: '#002a78'
  secondary-container: '#0053db'
  on-secondary-container: '#cdd7ff'
  tertiary: '#7bd0ff'
  on-tertiary: '#00354a'
  tertiary-container: '#006387'
  on-tertiary-container: '#a3dcff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001551'
  on-primary-fixed-variant: '#0039b5'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174b'
  on-secondary-fixed-variant: '#003ea8'
  tertiary-fixed: '#c4e7ff'
  tertiary-fixed-dim: '#7bd0ff'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#004c69'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
typography:
  headline-xl:
    fontFamily: Epilogue
    fontSize: 64px
    fontWeight: '600'
    lineHeight: 72px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Epilogue
    fontSize: 38px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Epilogue
    fontSize: 44px
    fontWeight: '600'
    lineHeight: 52px
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Epilogue
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Epilogue
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Epilogue
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 30px
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 30px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Manrope
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-sm:
    fontFamily: Manrope
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-desktop: 2.5rem
  margin: 1.25rem
  margin-desktop: 4rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.75rem
  space-xl: 3rem
---

## Brand & Style

This design system expresses the discipline, structural rigor, and refinement of an elite full-stack engineer operating at the convergence of enterprise architecture and gallery-grade visual execution. 

### Visual Archetype & Narrative
The aesthetic aligns with **Architectural Structuralism & Editorial Minimalism**:
- **Monolithic Discipline:** Layouts rely on structured vertical grids, asymmetric cadence, and generous white space to signal confidence and maturity.
- **Micro-Detail Craft:** Every element features engineered micro-treatments: razor-thin 1px hairline borders, muted telemetry data, and monospaced diagnostic metadata.
- **Restraint Over Spectacle:** Strictly rejects clichés such as chaotic particle canvases, terminal green saturation, or fuzzy generic gradient blobs. Depth is achieved via atmospheric clarity, micro-surfacing, and deliberate typography.

### Target Audiences & Emotional Dynamics
1. **Top-Tier Engineering Executives & Staff Recruiters:** Must immediately register enterprise readiness, low-level architectural mastery (.NET / C#), and modern frontend perfection (React / TypeScript).
2. **High-Value Independent Clients & Founders:** Must perceive high craft, institutional reliability, bespoke care, and end-to-end agency-level competence.

## Colors

The color architecture is built around deep, warm-tinted obsidian foundations, balanced with calibrated off-white surfaces and anchored by an authoritative Ultramarine Blue core.

### Palette Hierarchy & Intent
- **Foundation Dark (`#0A0A0C`):** A custom warm carbon black with subtle brown-gray undertones, preventing optical fatigue common with pitch `#000000` blacks.
- **Foundation Light / Inverted Canvas (`#FBFBF9`):** An archival museum off-white used for tactile light-mode views and print-optimized case studies.
- **Core Cobalt Accent (`#1D4ED8` & `#2563EB`):** A high-voltage, precise Ultramarine. Evokes high-end industrial design, deep technical authority, and focused intent without neon glare.
- **Structural Muted Neutrals:**
  - `surface-elevated`: `rgba(255, 255, 255, 0.03)` to `rgba(255, 255, 255, 0.06)`
  - `hairline-border`: `rgba(255, 255, 255, 0.08)` (dark mode) / `rgba(10, 10, 12, 0.08)` (light mode)
  - `text-primary`: `#F4F4F5`
  - `text-muted`: `#A1A1AA`
  - `text-tertiary`: `#71717A`

### Contrast & Legibility
All text tokens meet or exceed WCAG AA requirements (minimum 4.5:1 for body copy; 3:1 for large display). Interactive accents are calibrated to provide unmistakable focus states across ambient low-light contexts.

## Typography

The typographic system balances sculptural editorial presence with precision engineering instrumentation.

### Font Pairings & Functional Roles
- **Display Headings (`Epilogue`):** Delivers sculptural, geometric authority with architectural character cuts in uppercase and lowercase glyphs. Used for high-impact project titles, narrative manifestos, and section leads.
- **Body & Longform (`Manrope`):** Modern, geometric-grotesque hybrid offering clarity, subtle warmth, and rhythmic open counters that prevent eye fatigue in dense technical deep-dives.
- **Technical & Metadata (`JetBrains Mono`):** Applied to technical tags, architecture specs (.NET CLR versions, system benchmarks, commit digests), indices, dates, and interactive controls. Set with subtle tracking for optimal scanability.

## Layout & Spacing

The layout model takes inspiration from Swiss structural posters and technical blueprints, relying on an asymmetrical 12-column grid.

### Grid & Breakpoints
- **Desktop (1280px+):** 12-column fluid grid, 1440px max-width container, `4rem` outer margin, `2.5rem` gutters. Project showcases break symmetrically into 7/5 or 8/4 splits to emphasize engineering artifacts alongside architectural diagrams.
- **Tablet (768px – 1279px):** 8-column layout, `2rem` outer margins, `1.5rem` gutters. Secondary telemetry folds cleanly beneath primary visual decks.
- **Mobile (< 768px):** 4-column layout, `1.25rem` outer margin, `1rem` gutters. Complex multi-column data sheets reflow into vertically stacked structural cards.

### Spacing Philosophy
Spacing operates on a strict 4px/8px baseline rhythm. Generous vertical pauses (`space-xl` and section spans exceeding `6rem`) isolate case studies, transforming the portfolio into a curated gallery rather than an overwhelming link farm.

## Elevation & Depth

Visual hierarchy rejects exaggerated, cloudy drop shadows in favor of crisp architectural layering, 1px structural hairlines, and frosted glass planes.

### Depth System
1. **Base Layer (Ground Zero):** `#0A0A0C` matte foundation.
2. **Elevated Surfaces:** Semi-translucent panels utilizing `rgba(18, 18, 22, 0.75)` backed by backdrop filters (`backdrop-filter: blur(16px)`).
3. **The Hairline Edge:** Surfaces define boundaries through a 1px border (`rgba(255, 255, 255, 0.08)`). Under hover or focused states, borders subtly illuminate to `rgba(37, 99, 235, 0.45)`.
4. **Micro-Glow & Precision Shadows:** High-priority modals and interactive floating anchors use an ultra-restrained, targeted ambient shadow: `0 20px 40px -15px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(255, 255, 255, 0.08)`. No diffuse colored halos are permitted.

## Shapes

The design system enforces a disciplined, low-radius shape profile (`roundedness: 1`).

### Geometry Rules
- **Micro Radii (`0.25rem` / 4px):** Standard interactive buttons, code pills, telemetry indicators, input fields, and stack chips.
- **Structural Radii (`0.5rem` / 8px):** Project cards, diagnostic panels, modals, and preview viewports.
- **Pill Exceptions:** Restricted entirely to live status beacons (e.g., "Available for Q3 Advisory") and binary switch toggles.
- **Crisp Structural Corners:** Keeps the interface grounded in industrial precision rather than consumer-app playfulness.

## Components

### Buttons
- **Primary Action:** Solid Ultramarine background (`#1D4ED8`), white text (`#FFFFFF`), `fontFamily: Manrope`, `fontWeight: 600`, 4px radius. Subtle scale hover (`scale(1.015)`) with an instantaneous border tint shift.
- **Secondary / Ghost:** Transparent background, 1px hairline border (`rgba(255, 255, 255, 0.12)`), text color `#F4F4F5`. On hover: surface shifts to `rgba(255, 255, 255, 0.04)` and border shifts to `#2563EB`.
- **Monospaced Action:** JetBrains Mono uppercase command buttons with inline chevron arrows (`->`) for code sandbox and documentation links.

### Chips & Technical Stack Badges
- Used for technologies (.NET 8, React 19, CQRS, Distributed Systems).
- JetBrains Mono font (`11px`), tracking `0.05em`.
- Background: `rgba(255, 255, 255, 0.03)`; border: `1px solid rgba(255, 255, 255, 0.08)`. Left-hand colored dot: solid Ultramarine for core platforms, neutral slate for utilities.

### Cards & Case Study Viewports
- Surfaces feature subtle top-gradient hairline dividers (`linear-gradient(90deg, rgba(37,99,235,0.4) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%)`).
- Dual layout: Left column hosts architecture taxonomy, client metrics, and live system latency; right column hosts high-resolution component mockups or system topology graphs.

### Inputs & Contact Elements
- Single-line and multi-line inputs set to `background: rgba(255, 255, 255, 0.02)`, `border: 1px solid rgba(255, 255, 255, 0.1)`.
- Active focus state: Hairline transitions crisply to `#2563EB`, removing default browser rings in favor of a 1px inner inset glow.

### Lists & Architecture Logs
- Ordered lists feature zero-padded monospaced index numbers (`01`, `02`, `03`) in `#38BDF8`.
- Rows are separated by 1px horizontal hairline rules with subtle hover expansion from the left margin.