# Portfolio 2.0 — Build Prompt

> How to use: create an empty repo, copy `DESIGN.md` and `code.html` (the Stitch export) into `/design/`, open the repo in your AI coding tool, and paste everything below the line as the first message. Use your most capable model for Phase 0 and Phase 1 (planning), then switch to a faster model for Phase 2 onward.

---

## Role

You are a senior front-end engineer and design-minded developer. You will build a production-grade personal portfolio website for a full-stack developer (React + .NET) who uses it to (1) impress recruiters and engineering teams and (2) sell landing pages and web applications to small businesses and founders.

Quality bar: the code must be as professional as the site looks. The repository itself is part of the portfolio.

## Working agreement (read first)

1. **Do not write application code until Phase 0 and Phase 1 are approved by me.** Plan first, then build.
2. **Work in small, verifiable tasks.** One task = one focused change = one commit.
3. **Verify every task** by running `pnpm typecheck`, `pnpm lint` and `pnpm build` (and tests when they exist). Fix failures before moving on. Never tell me something works without running these.
4. **Ask before adding any dependency** that is not on the approved list below. Prefer fewer dependencies.
5. **Never invent facts about me.** All names, metrics, companies, project results, testimonials, years of experience and contact details in the reference design are placeholders. Mark every placeholder in code with `// TODO(content):` and centralize them in `src/content/` so I can replace them easily. Do not write claims such as "10 years of experience", "8.4 billion events" or "led teams for millions of users".
6. **If something is ambiguous, ask one concise question** instead of guessing. If a library or API detail is uncertain, check the official documentation rather than relying on memory, and say which version you verified.
7. **Never use npm (or npx, yarn, bun).** The only package manager is **pnpm**: use `pnpm add`, `pnpm install`, `pnpm dlx`, `pnpm exec` and `pnpm run`. Do not create or commit `package-lock.json` or `yarn.lock`; only `pnpm-lock.yaml`. If a tool's docs show an npm command, translate it to the pnpm equivalent.
8. **Stop at the end of each phase** and wait for my approval.

## Design source of truth

The folder `/design/` contains:

- `DESIGN.md` — the design system ("Architectural Precision"): color tokens, typography, spacing, radii, elevation, components.
- `code.html` — a static reference export of the intended layout (Tailwind CDN + inline markup).

Read both fully before planning. Rules:

- **Follow the design system faithfully**: obsidian dark base, off-white light mode, ultramarine accent, hairline 1px borders, low-radius geometry, monospaced technical metadata, zero-padded mono index numbers, restraint over spectacle.
- **Do not copy `code.html` as is.** Rebuild it as typed, reusable React components. Convert its Tailwind CDN config into real design tokens (Tailwind v4 `@theme` in CSS).
- Replace Material Symbols icon font usage with `lucide-react` (tree-shakeable SVG icons).
- Self-host or properly load fonts (Epilogue, Manrope, JetBrains Mono) with `font-display: swap`; prefer `@fontsource-variable` packages to avoid third-party requests.
- Do not use stock photos, particle canvases, neon/terminal-green aesthetics or generic gradient blobs.

## Tech stack (approved)

- **Vite + React (latest stable) + TypeScript (strict mode)**, package manager **pnpm only** (never npm). Pin it with the `"packageManager"` field in `package.json` and enforce it with a `"preinstall": "pnpm dlx only-allow pnpm"` script
- **Tailwind CSS v4** with design tokens in CSS variables
- **shadcn/ui + Radix primitives** for accessible building blocks (only the components actually used; restyle them to match the design system)
- **Motion** (Framer Motion) for subtle, purposeful animation, respecting `prefers-reduced-motion`
- **lucide-react** for icons
- **React Router** only if multiple routes are needed (home + case study pages)
- **React Hook Form + Zod** for the contact form validation
- **ESLint (typescript-eslint, react-hooks, jsx-a11y) + Prettier**
- **Vitest + React Testing Library** for a small set of meaningful tests (theme logic, form validation, content integrity)
- **Husky + lint-staged + commitlint** to enforce Conventional Commits and run checks before commit

Do not add state management libraries, CSS-in-JS, UI kits beyond the above, or obscure packages.

## Required features

### Sections and pages (see `code.html` for layout)

1. **Header/nav**: brand mark, section links, theme switcher, primary CTA ("Hire me"). Mobile menu with focus trap and keyboard support.
2. **Hero**: value proposition, two CTAs, system-topology visual (SVG, no heavy assets).
3. **Featured projects**: case-study cards driven by typed data.
4. **Services**: landing pages, web applications, full-stack/.NET development. Benefit-focused copy.
5. **Stack ledger**: grouped Frontend / Backend & Data / Cloud & DevOps. Only list technologies I actually use (placeholders flagged for my review).
6. **About**.
7. **Contact**: validated form (name, email, message) plus direct links (email, GitHub, LinkedIn, WhatsApp). Submission must be handled behind a small abstraction (`submitContact()`), with a clearly marked stub I can later point to a backend or a service such as Formspree. Include success and error states and a honeypot field for spam.
8. **Case study detail page** (template driven by data in `src/content/projects.ts`).
9. **Footer** with directory, direct lines, availability status.

### Theme system (4 options)

- Selectable modes: **Light**, **Dark**, **Glass**, **System** (default).
- **System** follows `prefers-color-scheme` live (listen for changes) and resolves to light or dark.
- **Glass** is a distinct theme: frosted translucent surfaces (`backdrop-filter`), thin light borders, soft rich background. Text must stay AA-accessible. Provide a fallback when `backdrop-filter` is unsupported.
- Persist the choice in `localStorage` (with try/catch). Apply the theme with a tiny inline script in `index.html` **before first paint** to avoid a flash of the wrong theme.
- Implement with a `data-theme` attribute on `<html>` and CSS variables; build a typed `ThemeProvider` + `useTheme` hook. The switcher must be a proper accessible control (radio group semantics, labels, keyboard navigation).

### Non-functional requirements

- **Responsive**: mobile-first, breakpoints per `DESIGN.md` (4/8/12-column grid).
- **Accessibility**: WCAG AA contrast in all four theme modes, semantic landmarks, visible focus states, skip link, correct heading order, alt text, reduced-motion support, full keyboard navigation.
- **Performance**: Lighthouse 95+ on Performance, Accessibility, Best Practices and SEO (mobile). Code-split routes, lazy-load below-the-fold media, no layout shift, optimized images (WebP/AVIF, explicit dimensions).
- **SEO**: title and meta description, Open Graph and Twitter cards, canonical URL, `robots.txt`, `sitemap.xml`, JSON-LD `Person` schema, favicon set.
- **Content in data, not in JSX**: all copy and project data lives in typed files under `src/content/`. Components are presentational.
- **Bilingual-ready**: structure strings so adding Spanish later does not require rewriting components (do not install an i18n library yet; ask me first).

## Code quality standards

- TypeScript `strict`, no `any`, no non-null assertions without justification, no unused exports.
- Small, single-responsibility components; named exports; colocate component, test and types.
- Suggested structure (propose changes in Phase 1 if you have a better one):
  ```
  src/
    app/            # providers, router, layout
    components/ui/  # shadcn/ui primitives (restyled)
    components/     # shared building blocks
    features/       # hero, projects, services, stack, about, contact, theme
    content/        # typed content (projects.ts, services.ts, stack.ts, site.ts)
    hooks/  lib/  styles/  types/
  design/           # DESIGN.md and code.html reference (do not ship)
  ```
- No magic values: colors, spacing and type come from tokens. No inline styles except dynamic values.
- Comments explain _why_, not _what_. Public helpers get short JSDoc.

## Git and commit conventions

- Use **Conventional Commits**: `type(scope): imperative summary` (types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`). Subject line max 72 characters, no trailing period. Add a body when the _why_ is not obvious. Breaking changes use `!` and a `BREAKING CHANGE:` footer.
- Examples: `feat(theme): add glass theme with system sync`, `fix(contact): prevent double submit`, `chore(deps): add react-hook-form and zod`.
- One logical change per commit, working branch per phase (`feat/phase-2-foundation`, etc.). Never commit secrets, never force-push, never rewrite history I have not asked you to rewrite.
- Show me the proposed commit message and the diff summary before each commit if I ask for review mode; otherwise commit after checks pass.

## Phases

### Phase 0 — Context and plan (no app code)

1. Read `/design/DESIGN.md` and `/design/code.html`.
2. Create **`AGENTS.md`** at the repo root (short, high-signal, under ~120 lines) containing: project purpose, approved stack and versions, commands (`pnpm dev/build/typecheck/lint/test`), the "pnpm only, never npm/npx/yarn" rule, folder structure, code and design rules from this prompt, the Conventional Commits rule, the "never invent facts" rule, and a "do not touch / ask first" list. Treat it as living: when I correct a recurring mistake, propose a one-line rule to add.
3. Create **`PLAN.md`**: an ordered task list. Each task has an ID, a goal, acceptance criteria, files likely touched, and how to verify. Tasks must be small enough for one commit each.
4. Create **`DECISIONS.md`**: a short log of architectural decisions (stack choices and why) that you will append to as you go.
5. List open questions and risks. **Stop and wait for approval.**

### Phase 1 — Design tokens and architecture review

1. Propose the final folder structure and the token mapping from `DESIGN.md` to Tailwind v4 `@theme` and CSS variables for all four themes (light, dark, glass, system-resolved).
2. Propose the component inventory (what is reusable vs section-specific).
3. **Stop and wait for approval.**

### Phase 2 — Foundation

Scaffold Vite + React + TS, Tailwind v4, ESLint/Prettier, Vitest, Husky/lint-staged/commitlint, base layout, fonts, token CSS, `ThemeProvider` with the no-flash script, and the accessible theme switcher. Verify all four modes visually and with tests.

### Phase 3 — Sections

Build header, hero, projects, services, stack, about, contact and footer, one section per commit, from typed content. Make each section responsive and accessible before moving on.

### Phase 4 — Case study page and routing

Data-driven case study template and routing, with correct scroll and focus behavior on navigation.

### Phase 5 — Polish and quality gates

Motion pass (subtle, reduced-motion safe), SEO assets, image optimization, Lighthouse and axe audits, fix findings, write the README (setup, scripts, architecture, how to edit content, how to deploy).

### Phase 6 — Deployment readiness

Static build configuration for Vercel, Netlify or Cloudflare Pages, environment variable handling for the contact endpoint, a CI workflow running typecheck, lint, test and build on pull requests.

## Per-task loop

For every task in `PLAN.md`:

1. State the task and its acceptance criteria.
2. Implement only that task.
3. Run `pnpm typecheck && pnpm lint && pnpm test && pnpm build`.
4. Summarize what changed and anything I should review.
5. Commit with a Conventional Commit message.
6. Mark the task done in `PLAN.md`.

If you discover work outside the current task, add it to `PLAN.md` instead of doing it silently.

## Context hygiene

- Re-read `AGENTS.md` and `PLAN.md` at the start of every session, and update `PLAN.md` at the end of each one.
- Keep exploration (reading docs, comparing options) separate from implementation. If a task needs research, summarize findings in `DECISIONS.md` and keep them short.
- If the conversation grows long or you notice drift from the rules above, tell me and suggest starting a fresh session from `AGENTS.md` + `PLAN.md`.

## Definition of done

- All four theme modes work, persist and avoid flash on load.
- Typecheck, lint, tests and build pass with zero warnings.
- Lighthouse 95+ in all four categories (mobile), axe reports no serious violations.
- No invented facts: every placeholder is marked `TODO(content)` and listed in a `CONTENT_CHECKLIST.md` I can work through.
- README lets a stranger run, edit and deploy the site in under 10 minutes.
- Commit history is clean and follows Conventional Commits.

## Begin

Start with **Phase 0** now. Confirm you have read `DESIGN.md` and `code.html`, then produce `AGENTS.md`, `PLAN.md` and `DECISIONS.md`, list your open questions, and stop.
