# Implementation Plan

Checkboxes reflect verified status, not intent.

## Phase 0 — Repository audit

- [x] Inspect workspace, supplied brief, and visual reference.
- [x] Confirm greenfield React/Vite/TypeScript project and missing real content.

Output: product constraints and asset inventory. Dependencies: none. Complete when unknown content is explicitly identified.

## Phase 1 — Documentation

- [x] Create PRD, implementation plan, architecture, content, accessibility, testing, and initial design specification.
- [x] Create product context and project README.

Output: implementation-guiding documentation. Dependencies: audit. Complete when every document contains project-specific decisions.

## Phase 2 — Architecture

- [ ] Configure strict Vite/React/TypeScript project.
- [ ] Define app registry, content types, window state, and reducer.

Output: maintainable application skeleton. Dependencies: documentation. Complete when source boundaries and state contracts compile.

## Phase 3 — Design system

- [ ] Implement tokens, typography, surfaces, icon treatment, and responsive rules.
- [ ] Add custom favicon and authored wallpaper treatment.

Output: reusable visual foundation. Dependencies: architecture. Complete when core shell uses tokens rather than ad-hoc values.

## Phase 4 — Core OS shell

- [ ] Implement boot, desktop, mobile home, launcher, and taskbar clock.

Output: recognizable PROXY OS first viewport. Dependencies: design system. Complete when core apps can be launched on desktop and mobile.

## Phase 5 — Window manager

- [ ] Implement centralized open/close/focus/minimize/maximize/restore.
- [ ] Implement pointer dragging, resizing, z-index, and viewport clamping.

Output: reusable window behavior. Dependencies: OS shell. Complete when reducer tests pass and windows remain reachable.

## Phase 6 — Applications

- [ ] Implement Welcome, Members, Profile, CVs, CV Viewer, Memories, About, and Links.
- [ ] Add gallery filtering/lightbox and missing-file states.

Output: complete information architecture. Dependencies: window manager and data layer. Complete when primary flows work.

## Phase 7 — Member content

- [ ] Populate clearly labeled sample records only.
- [ ] Verify all missing real assets have safe fallbacks and documentation.

Output: honest demonstration data. Dependencies: apps. Complete when no sample is presented as verified fact.

## Phase 8 — Responsive/mobile

- [ ] Implement full-screen mobile apps and touch navigation.
- [ ] Verify 320, 375, 390, 430, 768, 1024, 1280, 1440, and 1920px behaviors.

Output: intentional mobile experience. Dependencies: apps. Complete when no required action depends on desktop interactions.

## Phase 9 — Motion and microinteractions

- [ ] Add short boot/window/app transitions and pressed/hover/focus states.
- [ ] Verify reduced-motion mode.

Output: purposeful feedback. Dependencies: core flows. Complete when motion never delays access.

## Phase 10 — Accessibility

- [ ] Verify keyboard-only flows, labels, focus restoration, contrast, and overlay controls.

Output: WCAG-aligned interaction. Dependencies: feature complete. Complete when documented manual checks pass.

## Phase 11 — Performance

- [ ] Inspect bundle and asset behavior; confirm lazy media and on-demand document loading.

Output: production performance notes. Dependencies: build. Complete when no avoidable heavy dependency or eager media remains.

## Phase 12 — Testing

- [ ] Add reducer/application tests and run automated checks.
- [ ] Perform manual browser interaction checks.

Output: repeatable verification. Dependencies: feature complete. Complete when tests pass.

## Phase 13 — Polish

- [ ] Inspect rendered desktop and mobile together, fix one batched set of issues, and confirm once.

Output: coherent final UI. Dependencies: tests. Complete when review verdict is closed.

## Phase 14 — Production build

- [ ] Pass type checking, lint, tests, and production build.

Output: `dist/`. Dependencies: polish. Complete when all commands exit successfully.

## Phase 15 — Deployment readiness

- [ ] Verify static routes/assets and document Vercel import steps.
- [ ] Publish only if separately authorized by the user.

Output: deployment-ready repository. Dependencies: production build. Complete when local artifact is ready and no unauthorized deployment occurs.
