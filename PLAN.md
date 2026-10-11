# PLAN.md — Ordered task list

Status: `[ ]` todo · `[~]` in progress · `[x]` done. One task = one commit. Gate after every task:
`pnpm typecheck && pnpm lint && pnpm test && pnpm build` (from P2-04 onward; earlier tasks run whatever exists).
Execution mode after Phase 0/1 approval: phases 2–6 run autonomously; stop only for blocking questions or a
dependency outside ADR-002. Merge each phase branch into `main` (fast-forward) when its last task is done.

Legend per task: **Goal** · **Accept** (acceptance criteria) · **Files** · **Verify** · **Commit**.

---

## Phase 0 — Context & plan ✅ (awaiting approval)

- [x] **P0-01** Read design refs; write `AGENTS.md`, `PLAN.md`, `DECISIONS.md`.

## Phase 1 — Tokens & architecture ✅ (awaiting approval)

- [x] **P1-01** `ARCHITECTURE.md`: structure, token mapping (4 themes), component inventory.

---

## Phase 2 — Foundation · branch `feat/phase-2-foundation`

- [x] **P2-01 Repository init**
      Goal: git repo with docs and design refs. · Accept: `stich/` moved to `design/` (DESIGN.md, code.html, screen.png);
      `.gitignore` (node_modules, dist, coverage, .env*, !.env.example), `.gitattributes` (`* text=auto eol=lf`),
      `.editorconfig`, `.nvmrc` (24); `main` has initial commit, then branch created. · Files: root dotfiles, `design/`.
      Verify: `git status` clean, `git log` shows commit. · Commit: `chore: initialize repository with plan and design references`

- [x] **P2-02 Scaffold Vite + React + TS (strict)**
      Goal: running app skeleton. · Accept: scaffolded with `pnpm create vite` (check `--help`, react-ts template,
      non-interactive) into a temp dir and merged in, boilerplate removed; `packageManager: "pnpm@11.9.0"`,
      `preinstall: pnpm dlx only-allow pnpm`, `engines.node >=22`; tsconfig `strict`, `noUncheckedIndexedAccess`,
      `noUnusedLocals/Parameters`, `verbatimModuleSyntax`, alias `@/* → src/*` (tsconfig + vite); scripts `dev`,
      `build`, `preview`, `typecheck`. No `package-lock.json`. · Files: `package.json`, `tsconfig*.json`,
      `vite.config.ts`, `index.html`, `src/main.tsx`, `src/app/App.tsx`. · Verify: `pnpm typecheck && pnpm build`,
      `pnpm dev` serves. · Commit: `build: scaffold vite react typescript app with strict config`

- [x] **P2-03 ESLint + Prettier**
      Goal: zero-warning lint. · Accept: resolve ADR-004 (record versions in DECISIONS.md); flat config with
      `@eslint/js`, `typescript-eslint` (strictTypeChecked + stylisticTypeChecked), react-hooks, react-refresh,
      jsx-a11y (strict), `eslint-config-prettier`; ignores `dist`, `design`, `coverage`; rules: no default exports in
      `src/` (except config files), `no-explicit-any`, `no-non-null-assertion`; Prettier + tailwind plugin;
      scripts `lint` (`--max-warnings 0`), `lint:fix`, `format`, `format:check`. No peer-dep warnings.
      · Verify: `pnpm lint`, `pnpm format:check`. · Commit: `build(lint): add eslint flat config and prettier`

- [x] **P2-04 Vitest + Testing Library**
      Goal: test runner. · Accept: vitest config (jsdom, globals off, setup file with jest-dom + vitest-axe matchers,
      coverage via v8 optional); `src/test/setup.ts`, `src/test/render.tsx` helper; smoke test renders App;
      scripts `test` (run), `test:watch`. · Verify: full gate. · Commit: `test: set up vitest and testing library`

- [x] **P2-05 Git hooks: Husky, lint-staged, commitlint**
      Goal: enforce quality at commit. · Accept: `prepare: husky`; `pre-commit` → lint-staged (eslint --fix +
      prettier on staged); `commit-msg` → commitlint (config-conventional, header-max-length 72); verified on Windows.
      · Verify: a commit with message `bad message` is rejected; valid one passes.
      · Commit: `build(git): enforce conventional commits and pre-commit checks`

- [x] **P2-06 Tailwind v4 + static tokens**
      Goal: token layer. · Accept: `@tailwindcss/vite` plugin; `src/styles/index.css` imports `tokens.css`
      (ARCHITECTURE §2.1), `base.css`; utilities `text-headline-xl`, `px-margin-xl`, `max-w-page` work.
      · Verify: gate + a utility used in App renders correctly in browser. · Commit: `feat(styles): add tailwind v4 and design tokens`

- [x] **P2-07 Theme palettes (light/dark/glass) + base layer**
      Goal: semantic colors. · Accept: `themes.css` per ARCHITECTURE §2.2–2.3 keyed on `[data-theme]`; `@theme inline`
      mapping; glass backdrop + `@supports` fallback; base: body bg/fg/font, `::selection`, `:focus-visible` ring,
      `prefers-reduced-motion` reset, `color-scheme`. · Verify: gate; manually toggle attribute in devtools for 3 palettes.
      · Commit: `feat(theme): add light, dark and glass color palettes`

- [x] **P2-08 Token contrast test**
      Goal: AA guaranteed by CI. · Accept: `src/lib/contrast.ts` (luminance, alpha compositing, ratio) with unit tests;
      `theme-tokens.ts` table + test asserting it matches `themes.css`; contrast test for every fg/bg pair in all 3
      palettes (4.5:1 body, 3:1 large text/UI). Fix tokens if any fail and log in DECISIONS.md.
      · Verify: gate. · Commit: `test(theme): enforce wcag aa contrast for theme tokens`

- [x] **P2-09 Fonts**
      Goal: self-hosted fonts. · Accept: `@fontsource-variable/{epilogue,manrope,jetbrains-mono}` imported (only needed
      subsets/axes: latin + latin-ext for Spanish); `font-display: swap`; `--font-*` tokens point to them; no requests
      to Google Fonts. · Verify: gate; browser network tab shows only local woff2. · Commit: `feat(styles): self-host variable fonts`

- [x] **P2-10 Theme logic (pure) + tests**
      Goal: testable theme core. · Accept: `theme-constants.ts` (STORAGE_KEY, THEME_CHOICES, DEFAULT = system),
      `theme.ts`: `isThemeChoice`, `readStoredChoice` (try/catch), `writeStoredChoice`, `resolveTheme(choice, prefersDark)`,
      `applyTheme(root, choice, resolved)`; 100% branch coverage on these. · Verify: gate. · Commit: `feat(theme): add theme resolution and persistence logic`

- [x] **P2-11 No-flash inline script**
      Goal: correct theme before first paint. · Accept: minimal inline script in `index.html` `<head>` (before CSS)
      sets `data-theme` + `data-theme-choice` + `color-scheme`; test asserts it uses the same key/values as
      `theme-constants.ts`; works with storage disabled. · Verify: gate; hard reload in each mode shows no flash
      (browser check, throttled CPU). · Commit: `feat(theme): apply stored theme before first paint`

- [x] **P2-12 ThemeProvider + useTheme**
      Goal: React API. · Accept: context with `{ choice, resolved, setChoice }`; listens to `matchMedia` changes only when
      choice is `system` (cleanup on change/unmount); updates `meta[name=theme-color]`; `useTheme` throws outside provider.
      Tests: persistence, live system switch (mocked matchMedia), storage failure. · Verify: gate.
      · Commit: `feat(theme): add theme provider with live system sync`

- [x] **P2-13 shadcn init + ThemeSwitcher**
      Goal: accessible switcher. · Accept: `pnpm dlx shadcn@latest init` (Vite + Tailwind v4 path, verify docs),
      `components.json`, `lib/cn.ts`; add `radio-group`, restyle to tokens; `ThemeSwitcher` = segmented radio group
      with visible labels, group `aria-label` from content, arrow-key navigation, visible focus. Tests: role
      radiogroup, arrow keys change selection, choice persisted. · Verify: gate + keyboard check in browser.
      · Commit: `feat(theme): add accessible theme switcher`

- [x] **P2-14 App shell, router, bilingual layout**
      Goal: skeleton routes with regional language detection. · Accept: `providers.tsx` (ThemeProvider, LocaleProvider),
      `router.tsx` (`/` → `LocaleRedirect` checking stored preference, `navigator.languages` for `es-*` fallback `en`;
      `/:lang`, `/:lang/work/:slug`, `*` lazy pages), `LanguageSwitcher` (ES/EN control), `RootLayout` with `SkipLink` → `#main`,
      header/main/footer landmarks, `Container`, `Section`; placeholder pages. · Verify: gate; screenshot all 4 theme modes
      and verify language toggle persists and switches routes.
      · Commit: `feat(app): add router, providers and root layout with bilingual routing`

- [x] **P2-15 Content model + placeholders (es & en)**
      Goal: typed bilingual content layer. · Accept: `types/content.ts` (`Locale = "es" | "en"`, `Localized<T>`);
      `content/*.ts` with neutral placeholders in both Spanish and English (no invented facts) each marked `// TODO(content):`;
      `getContent(locale)`; integrity tests (slugs/ids match across locales, non-empty required fields, valid URLs/emails,
      indices sequential); `scripts/content-check.ts` + `pnpm content:check`; `CONTENT_CHECKLIST.md` generated/updated.
      · Verify: gate + `pnpm content:check`.
      · Commit: `feat(content): add typed bilingual content model with placeholders`

---

## Phase 3 — Sections · branch `feat/phase-3-sections`

Each section: responsive at 375/768/1280/1440, keyboard-complete, AA in all themes, content from `src/content/`,
a render + axe test. Browser screenshot check at the end of each section task.

- [x] **P3-01 UI primitives** — `Button` (cva primary/ghost/mono, asChild), `Card`, `Chip`, `SectionHeader`,
      `IndexNumber`, `StatusBeacon`, `Monogram`, `VisuallyHidden`. Tests: variants render, link-as-button semantics.
      Commit: `feat(ui): add design system primitives`
- [x] **P3-02 Header (desktop)** — sticky translucent header, monogram + name/role, `DesktopNav` (section anchors,
      `useActiveSection` → `aria-current`), ThemeSwitcher, LanguageSwitcher, Avatar, "Hire me" → `#contact`.
      Commit: `feat(layout): add site header with theme and language switchers`
- [x] **P3-03 Mobile nav** — shadcn `sheet` (Radix Dialog): trigger with `aria-expanded`/label, focus trap, Esc,
      focus return, closes on link click, ThemeSwitcher inside. Tests for open/close/focus. Commit: `feat(layout): add accessible mobile menu`
- [x] **P3-04 Hero + TopologyDiagram** — single `h1`, eyebrow, lede, 2 CTAs; SVG diagram themed via CSS vars,
      `role="img"` + title/desc, fixed aspect ratio. Commit: `feat(hero): add hero with system topology diagram`
- [x] **P3-05 Featured projects** — `ProjectsSection` (`#work`) + `ProjectCard` linking `/work/:slug`, 3-col xl /
      2-col md / 1-col mobile. Commit: `feat(projects): add featured project cards`
- [ ] **P3-06 Services** — landing pages, web applications, full-stack/.NET; lucide icon map; benefit lists; CTA.
      Commit: `feat(services): add services section`
- [ ] **P3-07 Stack ledger** — 3 groups, core/utility chips, all items flagged for owner review.
      Commit: `feat(stack): add stack ledger`
- [ ] **P3-08 About** — `Portrait` (owner photo slot or monogram frame), narrative, indexed principles list.
      Commit: `feat(about): add about section`
- [ ] **P3-09 Contact schema + submitContact** — Zod schema (name 2–80, email, message 20–2000, honeypot empty),
      `submit-contact.ts` per ADR-006, `lib/env.ts` typed env. Unit tests (valid/invalid, honeypot, endpoint ok/fail,
      not-configured in prod). Commit: `feat(contact): add contact schema and submission abstraction`
- [ ] **P3-10 Contact form UI** — RHF + zodResolver, ui `Label/Input/Textarea`, `aria-invalid` + `aria-describedby`
      errors, focus first invalid field, `aria-live` status, success/error states, disabled while submitting, hidden
      honeypot (off-screen, `tabIndex=-1`, `autocomplete=off`). Tests with user-event. Commit: `feat(contact): add validated contact form`
- [ ] **P3-11 Contact section + direct links** — `#contact` layout 5/7, `ContactLinks` (mailto, GitHub, LinkedIn,
      `wa.me`), external links `rel="noopener noreferrer"`. Commit: `feat(contact): add contact section with direct links`
- [ ] **P3-12 Footer** — beacon, indexed directory (anchors work from any route), direct lines, specs, dynamic year.
      Commit: `feat(layout): add site footer`
- [ ] **P3-13 Home composition + responsive/theme pass** — compose `HomePage`; verify heading order, landmarks,
      4/8/12 grid at 375/768/1280/1440 × 4 themes in browser; fix issues. Commit: `fix(ui): polish responsive layout across themes`

---

## Phase 4 — Case study page & routing · branch `feat/phase-4-case-studies`

- [ ] **P4-01 Case study content** — extend `Project.caseStudy` (problem, approach, architecture, outcomes, role,
      timeline, links, optional cover) with placeholders + integrity tests. Commit: `feat(content): add case study content model`
- [ ] **P4-02 Case study page** — lazy `/work/:slug`: header, meta sidebar (xl 8/4 split), body with indexed lists,
      prev/next pager; unknown slug → NotFound. Tests for both. Commit: `feat(case-study): add data-driven case study page`
- [ ] **P4-03 Scroll & focus management** — scroll to top on route change, focus page `h1` (tabIndex -1) on navigation,
      route announcer live region, hash links (`/#contact`) scroll correctly from subpages, header offset via
      `scroll-margin-top`. Tests. Commit: `feat(app): manage scroll and focus on navigation`
- [ ] **P4-04 Per-route metadata + 404** — `Seo` component (title, description, canonical, OG) on Home, CaseStudy,
      NotFound. Commit: `feat(seo): add per-route metadata`

---

## Phase 5 — Polish & quality gates · branch `feat/phase-5-polish`

- [ ] **P5-01 Motion pass** — `MotionConfig reducedMotion="user"`, `LazyMotion`, `Reveal` on section headers/cards,
      CSS hover micro-interactions (button scale 1.015, card border illumination, row hover indent). Commit: `feat(motion): add subtle reveal and hover motion`
- [ ] **P5-02 SEO assets** — `index.html` meta/OG/Twitter, canonical from `site.url`, `robots.txt`, postbuild
      `sitemap.xml` script, JSON-LD `Person` (only owner-provided fields), favicon set + manifest, OG image 1200×630
      (typographic, on-brand; needs Q6). Commit: `feat(seo): add sitemap, structured data and social cards`
- [ ] **P5-03 Images** — AVIF/WebP with explicit width/height, `loading="lazy"`/`decoding="async"` below fold,
      `fetchpriority` for any LCP image. Commit: `perf(images): serve optimized responsive images`
- [ ] **P5-04 Accessibility audit** — axe tests per page in all themes; keyboard walkthrough; fix findings (each
      fix its own commit if non-trivial). Commit: `test(a11y): add axe audits for all pages and themes`
- [ ] **P5-05 Lighthouse** — `pnpm build && pnpm preview`, run `pnpm dlx @lhci/cli autorun` (mobile) on `/` and one
      case study; reach ≥95 in all four categories; record scores in `docs/QUALITY.md`. Commit: `perf: reach lighthouse 95+ on mobile`
- [ ] **P5-06 README** — what/why, setup (<10 min), scripts, architecture overview, editing content, theme system,
      contact endpoint, deploy. Commit: `docs: write project readme`
- [ ] **P5-07 Content checklist** — final `CONTENT_CHECKLIST.md` from `pnpm content:check`, grouped by file.
      Commit: `docs(content): finalize content checklist`

---

## Phase 6 — Deployment readiness · branch `feat/phase-6-deploy`

- [ ] **P6-01 Hosting config** — config for the chosen host (Q2): SPA fallback, immutable cache for `/assets/*`,
      security headers (CSP allowing only self + contact endpoint, Referrer-Policy, X-Content-Type-Options,
      Permissions-Policy). Commit: `build(deploy): add static hosting configuration`
- [ ] **P6-02 Env handling** — `.env.example`, `VITE_CONTACT_ENDPOINT`, `VITE_SITE_URL`; typed + validated in
      `lib/env.ts`; README section. Commit: `build(env): document and validate environment variables`
- [ ] **P6-03 CI workflow** — `.github/workflows/ci.yml`: on PR + push to main; `pnpm/action-setup`, Node 24,
      pnpm cache, `pnpm install --frozen-lockfile`, typecheck, lint, test, build. Commit: `ci: add pull request quality workflow`
- [ ] **P6-04 Definition-of-done review** — run full gate, verify DoD list from the build prompt, clean commit log,
      update PLAN/DECISIONS. Commit: `chore: complete definition of done review`

---

## Backlog (discovered work goes here)

- (empty)
