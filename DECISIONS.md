# DECISIONS.md — Architecture Decision Log

Append-only. Format: `ADR-NNN · Title · Status · Date` then Context / Decision / Consequences (keep each short).

---

## ADR-001 · Vite SPA + React Router (no meta-framework) · Accepted · 2026-10-10
**Context:** Two route types (home, case study). No server, no auth, content is static.
**Decision:** Vite 8 + React 19 SPA, React Router 8 in data/library mode with lazy routes. Per-route metadata via
React 19 native `<title>`/`<meta>` hoisting. Routes are locale-prefixed (ADR-010): `/:lang`, `/:lang/work/:slug`.
**Consequences:** Simple static hosting. Case study HTML is client-rendered; Google renders JS fine, but social
crawlers only see `index.html` OG tags (see open question Q4 for optional prerendering).

## ADR-002 · Approved dependency list · Proposed · 2026-10-10
Versions are the npm `latest` on 2026-10-10. Anything not listed requires asking.

| Area | Packages |
|---|---|
| Runtime | `react` 19.3, `react-dom`, `react-router` 8.4, `motion` 14.1, `lucide-react` 1.55, `react-hook-form` 7.89, `zod` 4.6, `@hookform/resolvers` 5.9 |
| shadcn deps | `class-variance-authority`, `clsx`, `tailwind-merge`, `@radix-ui/react-slot`, `@radix-ui/react-radio-group`, `@radix-ui/react-dialog`, `@radix-ui/react-label` (or the unified `radix-ui` package if the shadcn CLI emits it) |
| Fonts | `@fontsource-variable/epilogue`, `@fontsource-variable/manrope`, `@fontsource-variable/jetbrains-mono` (5.3) |
| Build | `vite` 8.3, `@vitejs/plugin-react`, `tailwindcss` 4.3, `@tailwindcss/vite` 4.3, `typescript` (ADR-004), `@types/react`, `@types/react-dom`, `@types/node` |
| Lint/format | `eslint` (ADR-004), `@eslint/js`, `typescript-eslint` 8.71, `eslint-plugin-react-hooks` 7.1, `eslint-plugin-react-refresh`, `eslint-plugin-jsx-a11y` 6.10, `globals`, `prettier` 3.9, `prettier-plugin-tailwindcss`, `eslint-config-prettier` |
| Test | `vitest` 5.0, `@testing-library/react` 16.3, `@testing-library/user-event`, `@testing-library/jest-dom`, `jsdom`, `vitest-axe` (+ `axe-core`) |
| Git hooks | `husky` 9.1, `lint-staged` 17.6, `@commitlint/cli` 21.2, `@commitlint/config-conventional` |
| Tooling via `pnpm dlx` (not installed) | `shadcn`, `only-allow`, `@lhci/cli` (Lighthouse), `create-vite` |
| Pending approval (Q6) | `sharp` (dev, OG image + favicon PNGs + AVIF/WebP generation via a script) |

## ADR-003 · Theme architecture: two attributes + CSS variables · Accepted · 2026-10-10
**Context:** 4 choices (light, dark, glass, system); system must follow the OS live; no flash on load.
**Decision:** `<html data-theme="light|dark|glass" data-theme-choice="light|dark|glass|system">`.
`data-theme` is always a *resolved* palette; CSS only keys off `data-theme`. A ~20-line inline script in
`index.html` reads `localStorage` (try/catch, validated) and sets both attributes before first paint.
`ThemeProvider` owns the choice in React state, writes storage, listens to `matchMedia('(prefers-color-scheme: dark)')`
when choice is `system`, and updates `<meta name="theme-color">` and `color-scheme`.
Storage key + valid values live in `src/features/theme/theme-constants.ts`; a unit test asserts the inline script
uses the same key/values (prevents drift).
**Consequences:** No React render needed to paint the correct theme; pure functions are unit-testable.

## ADR-004 · Toolchain compatibility check for TypeScript 7 / ESLint 10 · Proposed · 2026-10-10
**Context:** npm `latest` is TypeScript 7.0 (native Go port) and ESLint 10. typescript-eslint 8.71 and
eslint-plugin-jsx-a11y 6.10 may not declare support yet (peer ranges).
**Decision:** In task P2-03, check `pnpm view typescript-eslint peerDependencies` and
`pnpm view eslint-plugin-jsx-a11y peerDependencies`. Use the newest TypeScript and ESLint majors that satisfy all
peer ranges without `--force`/overrides. Record the chosen versions here.
**Consequences:** Might pin TS 6.x/5.9 or ESLint 9 for now; zero peer warnings is a hard requirement.

## ADR-005 · Content layer: typed modules, bilingual · Accepted (updated 2026-10-10)
**Decision:** `src/content/*.ts` export `Record<Locale, T>` objects with `Locale = "es" | "en"` — TypeScript
forces both translations to exist. `getContent(locale)` in `src/content/index.ts` assembles a `SiteContent`.
Components read it via `useContent()` (from `LocaleProvider`). Types in `src/types/content.ts`.
Placeholders carry `// TODO(content): <what is needed>`; `scripts/content-check.ts` lists them.
**Consequences:** Every copy change touches two locales; an integrity test checks both have identical shapes
(same slugs, same list lengths). No i18n dependency.

## ADR-006 · Contact submission abstraction · Accepted · 2026-10-10
**Decision:** `submitContact(payload): Promise<SubmitResult>` in `src/features/contact/submit-contact.ts`.
If `VITE_CONTACT_ENDPOINT` is set → `POST` JSON (Formspree-compatible: `Accept: application/json`).
If not set → clearly marked stub (`// TODO(content): configure endpoint`) that resolves after a short delay in dev and
returns an explicit `not-configured` error in production builds (never silently "succeeds" in prod).
Honeypot field `company` must be empty; Zod validates on client before submit.
**Consequences:** Swapping provider touches one file + one env var.

## ADR-007 · Radix via shadcn for interactive a11y primitives · Accepted · 2026-10-10
**Decision:** Theme switcher = Radix RadioGroup (roving tabindex, arrow keys, `role="radiogroup"`).
Mobile menu = Radix Dialog styled as a sheet (focus trap, Esc, focus return, scroll lock).
Form controls are plain styled `<input>/<textarea>` + Radix Label; no shadcn `Form` wrapper (fewer layers).

## ADR-008 · Motion: LazyMotion + reduced-motion · Accepted · 2026-10-10
**Decision:** `LazyMotion features={domAnimation}` + `m.*` components to keep the bundle small. A single `Reveal`
component (fade + 8px rise, once, on viewport enter). `MotionConfig reducedMotion="user"`. Hover effects are CSS.

## ADR-009 · code.html wins over DESIGN.md on conflicts · Accepted (owner decision) · 2026-10-10
**Context:** The Stitch export (`code.html`) and `DESIGN.md` disagree on several points.
**Decision:** Follow code.html wherever they conflict; DESIGN.md fills the gaps. Resolutions:
- Radii: code.html values → chip 2px, nav 4px, control 8px (buttons/inputs), card 16px, panel 24px.
- Canvas: obsidian `#131315` body + ink gradient (`#090D16 → #0D1322 → #080B12`) behind content.
- Ambient glows kept (ultramarine / sky / blue at 15–20%), drawn with `radial-gradient` instead of
  `filter: blur(140px)` (same look, far cheaper to paint; avoids Lighthouse regressions).
- Translucent cards (`white/3%`, `backdrop-blur`, `white/6%` border, shadow-xl/2xl) and gradient headline text kept.
- Material color ramp from code.html (`on-surface-variant #C4C5D7`, `outline #8E90A0`, tertiary `#7BD0FF`) used
  for text tiers; this also avoids DESIGN.md's `#71717A`, which failed AA.
- Status dot emerald kept as a dedicated `--success` token.
- Header avatar and "Case Study" nav item kept (avatar falls back to monogram until the owner provides a photo;
  "Case Study" links to the first featured case study).
- The "Glass" button is the selected theme in code.html, so **code.html is the Glass theme reference**; Dark is
  the same layout on solid obsidian surfaces (no glows, opaque cards); Light is derived from DESIGN.md.
- Still excluded: remote Google-hosted images, Material Symbols (→ lucide), Tailwind CDN.

## ADR-010 · Bilingual routing (es/en) by region · Accepted (owner decision) · 2026-10-10
**Context:** Owner wants Spanish or English depending on the visitor's region. Must stay SEO-friendly and
shareable, without an i18n library.
**Decision:**
- URL prefix is the source of truth: `/es/…` and `/en/…`. Shareable, crawlable, `hreflang`-compatible.
- `/` (no prefix) redirects client-side: stored preference (`localStorage`) → `navigator.languages` (any `es-*`
  → `es`) → fallback `en`. Region is inferred from the browser locale (e.g. `es-CO`, `es-MX`, `es-ES`); no IP
  geolocation (would need a server/third party — ask first if wanted).
- `LanguageSwitcher` in header + mobile menu keeps the current path (`/es/work/x` ⇄ `/en/work/x`) and stores the
  choice. Invalid prefix → NotFound.
- `<html lang>` updated per locale; `hreflang` alternates (`es`, `en`, `x-default`) on every page; sitemap lists
  both languages; dates/numbers via `Intl` with the active locale.
- Hosting needs SPA fallback for `/es/*` and `/en/*` (P6-01).
**Consequences:** All copy written twice (placeholders in both languages). Locale logic is pure and unit-tested.
