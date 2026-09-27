# Testing Strategy

## Automated checks

- `npm run typecheck`: strict TypeScript compilation.
- `npm run lint`: ESLint for React, hooks, and TypeScript.
- `npm run test`: Vitest reducer and app-flow tests.
- `npm run build`: production bundle and asset resolution.

Focused tests cover opening, closing, focusing, minimizing, restoring, maximizing, and payload-based profile launching. They assert state behavior rather than implementation markup.

## Manual desktop matrix

At 1024, 1280, 1440, and 1920px:

- Complete or skip boot; reload within the session and confirm it does not replay.
- Open every desktop icon by keyboard and pointer.
- Drag and resize windows against every viewport edge.
- Verify focus stacking, taskbar minimize/restore, maximize/restore, and close.
- Navigate Members → Profile → CV.
- Filter Memories and operate the lightbox with keyboard.
- Confirm local clock updates and external links use safe new tabs.

## Manual mobile matrix

At 320, 375, 390, 430, and 768px:

- Verify app grid, touch targets, full-screen app views, home/back navigation, scrolling, and safe-area spacing.
- Confirm no desktop dragging, clipped dialogs, or unintended horizontal scrolling.
- Test landscape once at a compact height.

## Accessibility and motion

- Keyboard-only walkthrough and visible focus review.
- Reduced-motion system setting.
- 200% browser text zoom.
- Screen-reader spot check for app names, windows, gallery dialog, and image alternatives.

## Browser coverage

Chromium is the required rendered QA target. Firefox and Safari/WebKit compatibility is supported through standards-based APIs and should receive a release smoke test when those browsers are available.
