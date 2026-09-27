# Product Requirements Document

## 1. Product overview

PROXY OS is an interactive digital yearbook for the Connect & Deploy assignment in Pekan Ilkomerz 62. It presents a group through a fictional desktop operating system on larger screens and a mobile home-screen metaphor on small screens.

## 2. Background

The assignment requires a clean, informative, responsive group website containing member identity information, social links, ATS CVs, and activity documentation. The supplied concept demonstrates the desired OS metaphor and editorial tone.

## 3. Problem statement

Conventional profile grids make team information easy to scan but forgettable. Highly theatrical OS recreations are memorable but often inaccessible and cumbersome. PROXY OS must combine the discoverability of a directory with the personality of an explorable digital keepsake.

## 4. Objectives

- Make every required content category reachable in at most two intentional interactions.
- Deliver a memorable desktop composition without sacrificing reading comfort.
- Provide a purpose-built touch experience instead of a shrunken desktop.
- Keep member and memory content data-driven and easy to replace.
- Pass production build, lint, and focused interaction tests.

## 5. Target audience

Pekan Ilkomerz peers, mentors, assignment reviewers, friends, and future collaborators. Maintainers are student team members with basic familiarity with JSON-like TypeScript data files.

## 6. Core concept

“A digital yearbook disguised as a playful operating system.” The desktop is the home page; applications are the information architecture.

## 7. Assignment requirements

- Every member: full name, birth date, hometown, social media, and ATS CV.
- Group activity photos from Pekan Ilkomerz.
- Clean, informative, responsive presentation.
- GitHub-ready source and Vercel deployment readiness.

Unprovided personal content is represented by explicit sample records and replacement guidance, never invented as fact.

## 8. Functional requirements

- Session-scoped, skippable boot screen.
- Desktop icon selection and activation by pointer and keyboard.
- Central window manager with open, close, focus, minimize, maximize, restore, drag, resize, and viewport clamping.
- Taskbar with running apps, active state, local clock, launcher, and system status.
- Members explorer opens individual profiles.
- Profiles display all required fields and CV actions.
- CV explorer opens a readable viewer and exposes download/open behavior when a file exists.
- Memories app filters categories and opens an accessible keyboard-navigable lightbox.
- About and Links apps provide context and destinations.
- Mobile app grid and full-screen application views with a reliable back/home path.

## 9. Non-functional requirements

- Strict TypeScript and no `any` in product code.
- Static output; no backend dependency.
- Responsive from 320px through 1920px.
- Accessible focus, labels, dialogs, contrast, and reduced motion.
- Lazy or native loading for heavy assets and documents.
- No autoplay audio or unrequested tracking.

## 10. User stories

- As a reviewer, I can immediately understand the group concept and open key apps.
- As a visitor, I can browse all members and reach a profile from the directory.
- As a recruiter, I can view or download a published CV without tiny unreadable text.
- As a peer, I can browse memories by category and close a preview without a mouse.
- As a mobile visitor, I can use large touch targets and full-screen apps without dragging windows.
- As a maintainer, I can replace sample content in predictable data and public asset locations.

## 11. User flows

1. First visit → boot (or skip) → desktop/mobile home → app → detail → home/taskbar.
2. Members → member card → profile → CV viewer/download.
3. CVs → file → viewer → open/download if available.
4. Memories → category → image → next/previous/close.

## 12. Information architecture

- Shell: boot, desktop/mobile home, taskbar/mobile dock, start menu.
- Apps: Welcome, Members, Profile, CVs, CV Viewer, Memories, About, Links.
- Shared data: members, memories, app registry.

## 13. Desktop behavior

The first desktop is intentionally composed with a welcome window and hero/photo-board window. Desktop icons launch apps. Windows stay within the usable area, move to front on focus, and expose conventional title-bar controls with accessible labels.

## 14. Mobile behavior

The mobile surface is an app launcher with status/header chrome and full-screen app views. Desktop windows, resizing, and drag handles are absent. Navigation uses home/back affordances and 44px-or-larger touch targets.

## 15. Accessibility requirements

Semantic buttons and links, dialog semantics where appropriate, focus restoration after overlays, Escape to close, arrow-key gallery navigation, visible focus rings, meaningful alt text, no color-only states, and reduced-motion behavior.

## 16. Performance requirements

Keep the initial bundle modest, avoid large UI frameworks, reserve image dimensions, use lazy image loading outside the first view, and load PDFs only on demand. Production output should contain no source-map or console error surprises.

## 17. Browser support

Current evergreen Chromium, Firefox, and Safari/WebKit. Progressive enhancement is acceptable for decorative backdrop effects; core content and controls must remain functional.

## 18. Content requirements

Five sample member slots are included because the concept and assignment copy indicate five people. Each slot is explicitly labeled as awaiting verified content. Memory entries use design-safe placeholder artwork until real photos and captions are supplied.

## 19. Acceptance criteria

- All applications launch and can be closed or returned from.
- Window focus, minimize, maximize, restore, dragging, and resizing work on desktop.
- Member-to-profile and profile-to-CV flows work.
- Gallery filters and lightbox controls work by pointer and keyboard.
- No important content clips at specified target widths.
- Boot does not replay in the same browser session and is bypassed for reduced motion.
- Build, lint, and tests pass.

## 20. Out of scope

Authentication, content management, uploads, backend storage, chat, analytics, real music playback, account settings, and emulation of a real commercial OS.

## 21. Definition of Done

The documented acceptance criteria are met; required docs are current; placeholder fields are clearly enumerated; visual QA covers desktop and mobile; automated checks pass; and the output is ready for a GitHub repository and Vercel import.
