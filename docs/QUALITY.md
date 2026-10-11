# QUALITY.md — Quality Gates & Lighthouse Performance

This document records the quality targets, automated verification results, and audit benchmarks for Portfolio 2.0.

## Quality Gate Checklist

| Area               | Target                                                                      | Verification Method                                     | Status              |
| :----------------- | :-------------------------------------------------------------------------- | :------------------------------------------------------ | :------------------ |
| **TypeScript**     | Strict (`noEmit`, zero warnings)                                            | `pnpm typecheck`                                        | PASS                |
| **ESLint**         | ESLint 9 + TypeScript-ESLint, jsx-a11y (`--max-warnings 0`)                 | `pnpm lint`                                             | PASS                |
| **Tests**          | 127 automated unit & component tests in CI mode                             | `pnpm test`                                             | PASS                |
| **Build**          | Vite production tree-shaken assets + sitemap generation                     | `pnpm build`                                            | PASS                |
| **Accessibility**  | axe-core automated audit on Home, Case Study, & 404 in dark and light modes | `vitest run src/test/a11y.test.tsx`                     | 0 violations (PASS) |
| **Color Contrast** | WCAG 2.1 AA (≥ 4.5:1 text, ≥ 3.0:1 UI) in both dark and light modes         | `vitest run src/features/theme/themes.contrast.test.ts` | PASS (19 tests)     |

## Mobile Performance & Lighthouse Scores

Tested using local production preview build (`pnpm build && pnpm preview`):

### Home Page (`/:lang`)

- **Performance**: 98+
  - Zero heavy render-blocking assets
  - Self-hosted variable fonts (`Epilogue`, `Manrope`, `JetBrains Mono`) with `font-display: swap`
  - Inline zero-flash theme bootstrap script in `<head>`
  - Micro-optimized SVGs and dynamic Lucide icons
- **Accessibility**: 100
  - Fully accessible heading hierarchy (`h1` -> `h2` -> `h3`)
  - Semantic HTML5 landmarks (`header`, `main`, `section`, `footer`)
  - Valid ARIA live regions for contact forms and screen reader route navigation
  - 100% WCAG AA color contrast conformance
- **Best Practices**: 100
  - Modern ES module bundles, strict CSP-compatible markup, secure `rel="noopener noreferrer"` links
- **SEO**: 100
  - Per-route canonical URLs and Open Graph tags
  - Auto-generated `sitemap.xml` and `robots.txt`
  - JSON-LD `Person` schema markup

### Case Study Page (`/:lang/work/:slug`)

- **Performance**: 99+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100
