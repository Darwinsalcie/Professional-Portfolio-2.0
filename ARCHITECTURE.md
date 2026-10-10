# ARCHITECTURE.md — Phase 1: Structure, Tokens, Components

Source of truth for visuals: `design/DESIGN.md`. This file translates it into code-level contracts.
Contrast ratios marked `≈` are estimates; they are enforced by the automated token-contrast test (task P2-08).

---

## 1. Folder structure

```
.
├─ design/                    # DESIGN.md, code.html, screen.png — reference only, excluded from build & lint
├─ public/
│  ├─ favicon.svg  favicon-32.png  apple-touch-icon.png  icon-192.png  icon-512.png
│  ├─ og-image.png  site.webmanifest  robots.txt
├─ scripts/
│  ├─ generate-sitemap.ts     # postbuild: writes dist/sitemap.xml from content/projects.ts
│  └─ content-check.ts        # lists TODO(content) markers → used by CONTENT_CHECKLIST.md
├─ src/
│  ├─ main.tsx
│  ├─ app/
│  │  ├─ App.tsx              # <Providers><RouterProvider/></Providers>
│  │  ├─ providers.tsx        # ThemeProvider, LocaleProvider, MotionProvider
│  │  ├─ router.tsx           # route table, lazy pages
│  │  └─ RootLayout.tsx       # SkipLink, SiteHeader, <main id="main">, SiteFooter, scroll/focus mgmt
│  ├─ pages/                  # (added vs. suggested structure) thin route components
│  │  ├─ HomePage.tsx  CaseStudyPage.tsx  NotFoundPage.tsx
│  ├─ components/
│  │  ├─ ui/                  # shadcn output, restyled: button, radio-group, sheet, label, input, textarea
│  │  ├─ Container.tsx  Section.tsx  SectionHeader.tsx  Card.tsx  Chip.tsx
│  │  ├─ IndexNumber.tsx  StatusBeacon.tsx  SkipLink.tsx  Monogram.tsx  Avatar.tsx  AmbientGlow.tsx
│  │  ├─ Reveal.tsx  VisuallyHidden.tsx
│  ├─ features/
│  │  ├─ theme/               # theme-constants.ts, theme.ts (pure), theme-script.ts, ThemeProvider.tsx,
│  │  │                       # useTheme.ts, ThemeSwitcher.tsx (+ tests)
│  │  ├─ i18n/                # locale.ts (pure: isLocale, detectLocale, swapLocaleInPath), LocaleProvider,
│  │  │                       # useLocale/useContent, LocaleRedirect, LanguageSwitcher, LocalizedLink
│  │  ├─ layout/              # SiteHeader, DesktopNav, MobileNav, SiteFooter, useActiveSection
│  │  ├─ hero/                # Hero, TopologyDiagram
│  │  ├─ projects/            # ProjectsSection, ProjectCard
│  │  ├─ services/            # ServicesSection, ServiceCard, service-icons.ts
│  │  ├─ stack/               # StackSection, StackGroup
│  │  ├─ about/               # AboutSection, Portrait
│  │  ├─ contact/             # ContactSection, ContactForm, ContactLinks, contact-schema.ts, submit-contact.ts
│  │  └─ case-study/          # CaseStudyHeader, CaseStudyBody, CaseStudyMeta, CaseStudyPager
│  ├─ content/                # site.ts nav.ts hero.ts projects.ts services.ts stack.ts about.ts contact.ts
│  │                          # footer.ts ui.ts index.ts (getContent)
│  ├─ hooks/                  # useMediaQuery, usePrefersReducedMotion (if Motion's hook is insufficient)
│  ├─ lib/                    # cn.ts, env.ts (zod-validated import.meta.env), contrast.ts, seo.ts
│  ├─ styles/                 # index.css → imports tokens.css, themes.css, base.css
│  ├─ types/                  # content.ts, env.d.ts
│  └─ test/                   # setup.ts, render helpers (renderWithProviders, withTheme)
├─ AGENTS.md  PLAN.md  DECISIONS.md  ARCHITECTURE.md  CONTENT_CHECKLIST.md  README.md
```

Routes (ADR-010): `/` → `LocaleRedirect` (stored choice → `navigator.languages` → `en`);
`/:lang` (HomePage), `/:lang/work/:slug` (CaseStudyPage, lazy), `*` (NotFoundPage, lazy). `:lang` ∈ `es | en`,
validated in a layout route that provides `LocaleProvider` and sets `<html lang>`.
Home section ids (same in both languages): `#work`, `#services`, `#stack`, `#about`, `#contact`.

---

## 2. Design tokens

### 2.1 Static tokens → Tailwind v4 `@theme` (`src/styles/tokens.css`)

```css
@theme {
  /* Fonts */
  --font-display: 'Epilogue Variable', ui-sans-serif, system-ui, sans-serif;
  --font-body: 'Manrope Variable', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono Variable', ui-monospace, monospace;

  /* Type scale (DESIGN.md typography) → utilities text-headline-xl, text-body-md … */
  --text-headline-xl: 4rem;
  --text-headline-xl--line-height: 4.5rem;
  --text-headline-xl--letter-spacing: -0.03em;
  --text-headline-xl--font-weight: 600;
  --text-headline-xl-m: 2.375rem;
  --text-headline-xl-m--line-height: 2.75rem;
  --text-headline-xl-m--letter-spacing: -0.025em;
  --text-headline-xl-m--font-weight: 600;
  --text-headline-lg: 2.75rem;
  --text-headline-lg--line-height: 3.25rem;
  --text-headline-lg--letter-spacing: -0.025em;
  --text-headline-lg--font-weight: 600;
  --text-headline-lg-m: 1.875rem;
  --text-headline-lg-m--line-height: 2.25rem;
  --text-headline-lg-m--letter-spacing: -0.02em;
  --text-headline-lg-m--font-weight: 600;
  --text-headline-md: 2rem;
  --text-headline-md--line-height: 2.5rem;
  --text-headline-md--letter-spacing: -0.02em;
  --text-headline-md--font-weight: 500;
  --text-headline-sm: 1.375rem;
  --text-headline-sm--line-height: 1.875rem;
  --text-headline-sm--letter-spacing: -0.015em;
  --text-headline-sm--font-weight: 500;
  --text-body-lg: 1.125rem;
  --text-body-lg--line-height: 1.875rem;
  --text-body-lg--letter-spacing: -0.01em;
  --text-body-md: 0.9375rem;
  --text-body-md--line-height: 1.5rem;
  --text-body-md--letter-spacing: -0.005em;
  --text-body-sm: 0.8125rem;
  --text-body-sm--line-height: 1.25rem;
  --text-label-code: 0.75rem;
  --text-label-code--line-height: 1rem;
  --text-label-code--letter-spacing: 0.04em;
  --text-label-code--font-weight: 500;
  --text-label-caps: 0.6875rem;
  --text-label-caps--line-height: 0.875rem;
  --text-label-caps--letter-spacing: 0.08em;
  --text-label-caps--font-weight: 600;

  /* Radii — code.html values (ADR-009), as semantic tokens → rounded-chip, rounded-nav, … */
  --radius-chip: 0.125rem; /* 2px  stack chips, tags */
  --radius-nav: 0.25rem; /* 4px  nav links, theme/language segments */
  --radius-control: 0.5rem; /* 8px  buttons, inputs */
  --radius-card: 1rem; /* 16px project/service/stack cards */
  --radius-panel: 1.5rem; /* 24px hero topology, about, contact panels */

  /* Spacing — base 4px (Tailwind default --spacing: 0.25rem) + named layout tokens */
  --spacing-gutter: 1rem; /* mobile  */
  --spacing-gutter-md: 1.5rem; /* tablet  */
  --spacing-gutter-xl: 2.5rem; /* desktop */
  --spacing-margin: 1.25rem;
  --spacing-margin-md: 2rem;
  --spacing-margin-xl: 4rem;
  --spacing-section: 6rem; /* vertical rhythm between sections (desktop) */
  --spacing-section-m: 4rem;

  /* Layout */
  --container-page: 90rem; /* 1440px */
  --breakpoint-md: 48rem; /* 768  → 8 cols  */
  --breakpoint-xl: 80rem; /* 1280 → 12 cols */

  /* Elevation — code.html uses shadow-xl / shadow-2xl on cards and panels */
  --shadow-card: 0 20px 25px -5px rgb(0 0 0 / 0.25), 0 8px 10px -6px rgb(0 0 0 / 0.25);
  --shadow-panel: 0 25px 50px -12px rgb(0 0 0 / 0.45);
  --shadow-float: 0 20px 40px -15px rgb(0 0 0 / 0.8), 0 0 1px 1px rgb(255 255 255 / 0.08);

  /* Motion */
  --ease-precise: cubic-bezier(0.22, 1, 0.36, 1);
  --duration-fast: 120ms;
  --duration-base: 200ms;
  --duration-slow: 400ms;
}
```

Grid: mobile 4 cols / tablet 8 / desktop 12 via `grid-cols-4 md:grid-cols-8 xl:grid-cols-12` inside `Container`
(`max-w-page mx-auto px-margin md:px-margin-md xl:px-margin-xl`). Project/About splits: 7/5 or 8/4 at `xl`.

### 2.2 Semantic color variables (`src/styles/themes.css`) + Tailwind mapping

Components only use semantic utilities. Mapping uses `@theme inline` so utilities resolve to the live variable:

```css
@theme inline {
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-surface-raised: var(--surface-raised);
  --color-surface-sunken: var(--surface-sunken);
  --color-hairline: var(--hairline);
  --color-hairline-strong: var(--hairline-strong);
  --color-fg: var(--fg);
  --color-muted: var(--fg-muted);
  --color-subtle: var(--fg-subtle);
  --color-accent: var(--accent);
  --color-accent-hover: var(--accent-hover);
  --color-on-accent: var(--on-accent);
  --color-accent-fg: var(--accent-fg);
  --color-index: var(--index);
  --color-info: var(--info);
  --color-success: var(--success);
  --color-danger: var(--danger);
  --color-focus: var(--focus);
}
```

Plus non-color vars: `--header-bg`, `--backdrop` (page background image), `--surface-blur`, `--card-edge`
(top gradient hairline), `--selection-bg`.

### 2.3 Theme values

Reference: **code.html = Glass** (its switcher marks Glass as active). Dark = same layout on solid obsidian.
Light = derived from DESIGN.md's archival off-white with the same accent.

| Variable                               | Glass (code.html)                                               | Dark                              | Light                                |
| -------------------------------------- | --------------------------------------------------------------- | --------------------------------- | ------------------------------------ |
| `--bg` (body/header)                   | `#131315`                                                       | `#131315`                         | `#FBFBF9`                            |
| `--backdrop` (main canvas)             | `linear-gradient(to bottom,#090D16,#0D1322,#080B12)`            | `#131315` (flat)                  | `#FBFBF9` (flat)                     |
| `--glow` (AmbientGlow)                 | 3 radial gradients: `#1D4ED8`/20%, `#7BD0FF`/15%, `#0053DB`/20% | none                              | none                                 |
| `--surface` (cards)                    | `rgb(255 255 255 / .03)` + blur 40px                            | `#1C1B1D`                         | `#FFFFFF`                            |
| `--surface-hover`                      | `rgb(255 255 255 / .06)`                                        | `#201F21`                         | `#F4F4F1`                            |
| `--surface-raised` (header)            | `rgb(19 19 21 / .85)` + blur 24px                               | `rgb(19 19 21 / .85)` + blur 24px | `rgb(251 251 249 / .85)` + blur 24px |
| `--surface-sunken` (diagram, footer)   | `rgb(14 14 16 / .6)` / `#0E0E10`                                | `#0E0E10`                         | `#F2F2EF`                            |
| `--control` (inputs, segments)         | `rgb(255 255 255 / .03)`                                        | `#1C1B1D`                         | `#FFFFFF`                            |
| `--hairline`                           | `rgb(255 255 255 / .06)`                                        | `rgb(255 255 255 / .08)`          | `rgb(10 10 12 / .08)`                |
| `--hairline-strong`                    | `rgb(255 255 255 / .12)`                                        | `#434655`                         | `rgb(10 10 12 / .16)`                |
| `--fg` (headings)                      | `#FFFFFF`                                                       | `#FFFFFF`                         | `#131315`                            |
| `--fg-body`                            | `#E5E1E4`                                                       | `#E5E1E4`                         | `#1C1B1D`                            |
| `--fg-muted`                           | `#C4C5D7` (≈11:1)                                               | `#C4C5D7`                         | `#45464F` (≈9:1)                     |
| `--fg-subtle`                          | `#8E90A0` (≈5.8:1)                                              | `#8E90A0`                         | `#5C5E6B` (≈6.3:1)                   |
| `--accent` (fills)                     | `#1D4ED8`                                                       | `#1D4ED8`                         | `#1D4ED8`                            |
| `--on-accent`                          | `#FFFFFF` (≈6.7:1)                                              | `#FFFFFF`                         | `#FFFFFF`                            |
| `--accent-hover` / `--on-accent-hover` | `#B7C4FF` / `#002682`                                           | `#B7C4FF` / `#002682`             | `#1E40AF` / `#FFFFFF`                |
| `--accent-fg` (links, active)          | `#B7C4FF`                                                       | `#B7C4FF`                         | `#1D4ED8` (≈6.4:1)                   |
| `--eyebrow-secondary`                  | `#B4C5FF`                                                       | `#B4C5FF`                         | `#0039B5`                            |
| `--eyebrow-tertiary` / `--index`       | `#7BD0FF`                                                       | `#7BD0FF`                         | `#006387` (≈6:1)                     |
| `--headline-gradient`                  | `#DBE1FF → #B7C4FF → #7BD0FF`                                   | same                              | `#1D4ED8 → #0053DB → #006387`        |
| `--success` (status dot)               | `#34D399`                                                       | `#34D399`                         | `#047857`                            |
| `--danger`                             | `#FFB4AB`                                                       | `#FFB4AB`                         | `#B3261E`                            |
| `--focus`                              | `#B7C4FF`                                                       | `#B7C4FF`                         | `#1D4ED8`                            |

- **Glass fallback:** `@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))` →
  `--surface: rgb(22 27 40 / .96)`, `--surface-raised: rgb(19 19 21 / .97)` so text contrast never depends on blur.
  Glass contrast is tested against the _worst case_ composite (surface over the lightest backdrop stop + glow).
- **AmbientGlow:** absolutely positioned, `pointer-events-none`, `aria-hidden`, `radial-gradient(closest-side, …)`
  sized like code.html (720/640/580px) — no `filter: blur`. Rendered only when `data-theme="glass"`.
- **System:** no own palette. Resolves to `dark` or `light` via `prefers-color-scheme`; `data-theme-choice="system"`.
- `color-scheme: dark` for dark/glass, `light` for light (native form controls & scrollbars).
- `<meta name="theme-color">` updated to the resolved `--bg`.
- Focus ring: `outline: 2px solid var(--focus); outline-offset: 2px` on `:focus-visible`; inputs use 1px border +
  `inset 0 0 0 1px var(--focus)` per DESIGN.md, still ≥3:1 against surface.
- Hero headline gradient text (code.html) uses `--headline-gradient` via `bg-clip-text`, with solid `--accent-fg`
  fallback when `background-clip: text` is unsupported and under `forced-colors`.

### 2.4 Token-contrast test (P2-08)

`src/lib/contrast.ts` (WCAG relative luminance + alpha compositing, no deps) + `themes.contrast.test.ts` iterating a
typed table of `[foreground, background, minRatio]` pairs per theme. Token values are duplicated in
`src/features/theme/theme-tokens.ts` **only for the test**; a second test parses `themes.css` and asserts the
values match (single source of truth stays the CSS).

---

## 3. Component inventory

### 3.1 Reusable (`src/components`, `src/components/ui`)

| Component                         | Notes                                                                                                                                                                                                                                                                                               |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Button` (ui)                     | cva variants (code.html): `primary` (accent fill → `--accent-hover` on hover, `rounded-control`, shadow-card, arrow icon nudges right), `ghost` (white/4% + blur → 8% on hover), `mono` (JetBrains link + `ArrowUpRight`). Sizes `sm` (header) / `lg` (hero `px-8 py-4`). `asChild` via Radix Slot. |
| `RadioGroup` (ui)                 | Radix, restyled as code.html's segmented mono control (`rounded-nav`). Used by ThemeSwitcher and LanguageSwitcher.                                                                                                                                                                                  |
| `Sheet` (ui)                      | Radix Dialog positioned as right/top sheet. Used by MobileNav.                                                                                                                                                                                                                                      |
| `Label`, `Input`, `Textarea` (ui) | code.html inputs (`rounded-control`, `--control` bg, hairline, `px-4 py-3.5`), visible focus inset, `aria-invalid` styling.                                                                                                                                                                         |
| `Container`                       | Max-width 1440, responsive margins, optional `grid` prop for 4/8/12 cols.                                                                                                                                                                                                                           |
| `Section`                         | `<section aria-labelledby>` + vertical rhythm + id.                                                                                                                                                                                                                                                 |
| `SectionHeader`                   | eyebrow (`label-caps`, tone: secondary/tertiary/accent), `h2`, lede. Heading level prop.                                                                                                                                                                                                            |
| `Card`                            | `variant: card                                                                                                                                                                                                                                                                                      | panel`→`rounded-card`/`rounded-panel`, `--surface`+ blur (glass), hairline, shadow,`hover:bg-surface-hover`; `as` prop (`article`/`div`). |
| `Chip`                            | mono `label-caps`, `rounded-chip`, `px-3 py-1`, white/4% bg (project tags); `variant="ledger"` = body-sm `rounded-lg px-3.5 py-2` (stack ledger, as code.html).                                                                                                                                     |
| `IndexNumber`                     | zero-padded mono index (`01`), `--index` color.                                                                                                                                                                                                                                                     |
| `StatusBeacon`                    | pill with dot (`--success` operational / `--index` availability, pulse off under reduced motion).                                                                                                                                                                                                   |
| `Monogram`                        | inline SVG brand mark (initials from content), replaces the remote logo image.                                                                                                                                                                                                                      |
| `Avatar`                          | round 32px header avatar; owner photo when provided, else `Monogram` in a circle.                                                                                                                                                                                                                   |
| `AmbientGlow`                     | glass-only decorative radial gradients (§2.3), `aria-hidden`.                                                                                                                                                                                                                                       |
| `SkipLink`, `VisuallyHidden`      | a11y helpers.                                                                                                                                                                                                                                                                                       |
| `Reveal`                          | Motion `m.div`, once-on-view fade/rise; no-op under reduced motion.                                                                                                                                                                                                                                 |
| `Seo`                             | React 19 `<title>`, `<meta>`, canonical, `hreflang` alternates (es/en/x-default), JSON-LD per page.                                                                                                                                                                                                 |

### 3.2 Section-specific (`src/features/*`)

| Feature    | Components                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| theme      | `ThemeProvider`, `useTheme`, `ThemeSwitcher` (radio group, visible labels Light/Dark/Glass/System, `aria-label` from content)                                                                                                                                                                                                                                                                  |
| i18n       | `LocaleProvider` (from `:lang` param), `useLocale`, `useContent`, `LocaleRedirect` (`/` → detected locale), `LanguageSwitcher` (ES/EN radio group, keeps current path + hash, stores choice), `LocalizedLink` (prefixes `/:lang`)                                                                                                                                                              |
| layout     | `SiteHeader` (sticky, translucent, monogram + name/role, `DesktopNav` incl. "Case Study", ThemeSwitcher, LanguageSwitcher, "Hire me", `Avatar`), `MobileNav` (Sheet, focus trap, closes on navigate, both switchers), `useActiveSection` (IntersectionObserver → `aria-current="location"`), `SiteFooter` (beacon, directory with indices, direct lines, specs, © year, local time via `Intl`) |
| hero       | `Hero` (eyebrow, h1, lede, 2 CTAs), `TopologyDiagram` (inline SVG, colors via CSS vars, `role="img"` + `<title>/<desc>`, node labels from content, fixed aspect-ratio → no CLS)                                                                                                                                                                                                                |
| projects   | `ProjectsSection`, `ProjectCard` (index, domain tag, title, summary, chips, "View case study" mono link to `/work/:slug`)                                                                                                                                                                                                                                                                      |
| services   | `ServicesSection`, `ServiceCard` (lucide icon via typed `iconKey` map, benefit list, CTA to contact)                                                                                                                                                                                                                                                                                           |
| stack      | `StackSection`, `StackGroup` (Frontend / Backend & Data / Cloud & DevOps; chips tone core/utility)                                                                                                                                                                                                                                                                                             |
| about      | `AboutSection`, `Portrait` (owner photo when provided, else monogram frame — no stock photo)                                                                                                                                                                                                                                                                                                   |
| contact    | `ContactSection`, `ContactForm` (RHF + Zod, honeypot, live-region status, double-submit guard), `ContactLinks` (email, GitHub, LinkedIn, WhatsApp `wa.me`), `contact-schema.ts`, `submit-contact.ts`                                                                                                                                                                                           |
| case-study | `CaseStudyHeader`, `CaseStudyMeta` (role, timeline, stack, links), `CaseStudyBody` (problem / approach / architecture / outcomes with indexed lists), `CaseStudyPager` (prev/next)                                                                                                                                                                                                             |

### 3.3 Content types (`src/types/content.ts`, sketch)

```ts
type Locale = 'es' | 'en'
type Localized<T> = Record<Locale, T> // every content module exports Localized<…>
interface Project {
  slug: string
  index: number
  title: string
  domain: string
  summary: string
  stack: StackItemRef[]
  role: string
  timeline: string
  links?: { live?: string; repo?: string }
  caseStudy: {
    problem: string
    approach: string[]
    architecture: string[]
    outcomes: string[]
    cover?: ImageAsset
  }
}
interface Service {
  id: string
  iconKey: ServiceIconKey
  title: string
  summary: string
  benefits: string[]
}
interface StackGroup {
  id: 'frontend' | 'backend' | 'cloud'
  title: string
  items: { name: string; tone: 'core' | 'utility' }[]
}
interface SiteMeta {
  name: string
  role: string
  url: string
  email: string
  location: string
  timezone: string
  socials: { github: string; linkedin: string; whatsapp: string }
  availability: string
}
```
