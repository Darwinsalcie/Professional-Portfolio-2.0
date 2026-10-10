# AGENTS.md — Portfolio 2.0

Read this file and `PLAN.md` at the start of every session. Update `PLAN.md` at the end of every session.
Detailed specs: `ARCHITECTURE.md` (tokens, structure, components) · `DECISIONS.md` (why) · `design/DESIGN.md` (visual source of truth).

## Purpose
Production-grade personal portfolio for a full-stack developer (React + .NET). Goals: (1) impress recruiters and
engineering teams, (2) sell landing pages and web apps to small businesses and founders.
The repository itself is part of the portfolio: code quality must match the visual quality.

## Stack (versions verified on the npm registry 2026-10-10; re-verify before upgrading)
Vite 8 · React 19 · TypeScript strict (version per DECISIONS ADR-004) · Tailwind CSS 4 (`@tailwindcss/vite`)
shadcn/ui + Radix (only used parts) · Motion 14 (`motion/react`) · lucide-react · React Router 8
React Hook Form 7 + Zod 4 (`@hookform/resolvers`) · ESLint 10 (typescript-eslint, react-hooks, jsx-a11y) + Prettier 3
Vitest 5 + React Testing Library 16 · Husky 9 + lint-staged + commitlint · Fontsource variable fonts.

## Package manager: pnpm ONLY
- NEVER use npm, npx, yarn or bun. Use `pnpm add`, `pnpm install`, `pnpm dlx`, `pnpm exec`, `pnpm run`.
- Translate any npm command in docs to pnpm. Only `pnpm-lock.yaml` is committed; never `package-lock.json`/`yarn.lock`.
- `package.json` pins `"packageManager"` and has `"preinstall": "pnpm dlx only-allow pnpm"`.

## Commands
| Command | Purpose |
|---|---|
| `pnpm dev` | Dev server |
| `pnpm build` | Production build (typecheck included) |
| `pnpm preview` | Serve the build locally |
| `pnpm typecheck` | `tsc --noEmit` (project refs) |
| `pnpm lint` | ESLint, `--max-warnings 0` |
| `pnpm test` | Vitest run (CI mode) |
| `pnpm format` | Prettier write |
| `pnpm content:check` | List every `TODO(content)` placeholder |

Gate for every task: `pnpm typecheck && pnpm lint && pnpm test && pnpm build` — all green, zero warnings.
Never claim something works without running the gate.

## Folder structure (details in ARCHITECTURE.md §1)
```
design/          reference only (DESIGN.md, code.html, screen.png) — never imported, never shipped
public/          favicons, robots.txt, og image, manifest
scripts/         build-time node scripts (sitemap, content check)
src/app/         providers, router, root layout
src/pages/       route components (lazy-loaded)
src/components/ui/  shadcn primitives, restyled to tokens
src/components/  shared building blocks (Container, SectionHeader, Chip, Card…)
src/features/    theme, i18n, layout, hero, projects, services, stack, about, contact, case-study
src/content/     ALL copy and data, typed
src/hooks/ src/lib/ src/styles/ src/types/ src/test/
```

## Code rules
- TS `strict` + `noUncheckedIndexedAccess`. No `any`. No `!` without a `// why:` comment. No unused exports.
- Small single-responsibility components, **named exports only** (except where a tool requires default, e.g. lazy pages
  re-exported). Colocate `Component.tsx`, `Component.test.tsx`, types.
- Components are presentational. **No copy in JSX**: every user-visible string comes from `src/content/`.
- **Bilingual: Spanish (`es`) and English (`en`).** Every content module provides both locales (type-enforced);
  locale comes from the URL prefix (`/es`, `/en`), defaulted by browser region (DECISIONS ADR-010).
  No i18n library without asking.
- No magic values: colors, spacing, radii, type and motion come from tokens. Inline `style` only for dynamic values.
- Use semantic utilities (`bg-surface`, `text-muted`, `border-hairline`), never raw palette hex in components.
- Comments explain *why*, not *what*. Exported helpers get a one-line JSDoc.
- Icons: `lucide-react` only. No Material Symbols, no icon fonts.

## Design rules
- **Precedence (owner decision): when `design/code.html` and `design/DESIGN.md` conflict, code.html wins.**
  DESIGN.md still applies wherever code.html is silent. Deviations are listed in DECISIONS ADR-009.
- Obsidian base (`#131315`), ink-gradient canvas, Ultramarine accent (`#1D4ED8`), 1px translucent hairlines.
- Radii as in code.html via semantic tokens: `rounded-chip` 2px, `rounded-nav` 4px, `rounded-control` 8px
  (buttons, inputs), `rounded-card` 16px, `rounded-panel` 24px. Pill for beacons/avatars.
- Ambient light glows and gradient headline text are allowed (they are in code.html) — implement glows as
  `radial-gradient` (no `filter: blur`) for performance.
- JetBrains Mono for metadata, chips, indices, controls; zero-padded indices (`01`, `02`).
- No stock photos, particle canvases or neon/terminal green.
- Do NOT copy `design/code.html` markup. Rebuild as typed components; reproduce its look.
- WCAG AA in all four themes (Light, Dark, Glass, System). Visible focus, reduced motion respected.

## Content rule: never invent facts
All names, metrics, companies, results, testimonials, years and contact details are placeholders unless the owner
supplied them. Mark each with `// TODO(content): …` in `src/content/` and list it in `CONTENT_CHECKLIST.md`.
Never write claims like "10 years of experience", "8.4B events", "millions of users".

## Git
- Conventional Commits: `type(scope): imperative summary` (≤72 chars, no period). Types: feat, fix, docs, style,
  refactor, perf, test, build, ci, chore. Body when the *why* is not obvious. Breaking: `!` + `BREAKING CHANGE:`.
- One task from PLAN.md = one commit. Branch per phase: `feat/phase-N-<name>`; fast-forward merge to `main` at
  phase end. Never force-push, never rewrite history, never commit secrets or `.env`.

## Per-task loop
1. State task ID + acceptance criteria. 2. Implement only that task. 3. Run the gate.
4. Summarize changes + anything to review. 5. Commit. 6. Tick the task in `PLAN.md`.
Out-of-scope work discovered → add a task to `PLAN.md`, do not do it silently.
Research → summarize briefly in `DECISIONS.md`, cite the doc + version verified.

## Ask first / do not touch
- Adding any dependency not in `DECISIONS.md` ADR-002 (approved list) → ask.
- Installing an i18n library, analytics, CMS, or any third-party script → ask.
- Editing `design/` files → never.
- Changing tokens in a way that breaks AA contrast tests → never; fix the token instead.
- Real personal data (name, email, phone, photo) → only what the owner provides.
- Deleting or rewriting git history, changing branch protection, publishing/deploying → ask.

## Living rules
When the owner corrects a recurring mistake, propose a one-line rule for this file.
