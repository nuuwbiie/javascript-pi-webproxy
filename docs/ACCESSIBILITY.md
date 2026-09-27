# Accessibility

## Interaction model

- Desktop icons are buttons with single-click selection and double-click activation; Enter/Space always opens directly.
- Window title bars expose labeled minimize, maximize/restore, and close buttons.
- Windows move to front on focus. Newly opened windows receive focus, and closing restores focus to the launching control where possible.
- Gallery lightbox uses dialog semantics, traps focus, closes on Escape, and supports Left/Right Arrow navigation.
- Mobile applications are normal full-screen regions with explicit home/back controls.

## Visual access

- Focus uses a high-contrast two-layer outline, not color alone.
- Main reading text is at least 16px; regular labels are at least 14px.
- Controls target at least 44 × 44 CSS pixels on touch layouts.
- Status uses text alongside color.
- Decorative texture is ignored by assistive technology.

## Motion

`prefers-reduced-motion: reduce` skips the timed boot, removes spatial window transitions, and disables decorative movement. Content is never initially hidden solely for animation.

## Content and media

Images require contextual alt text; decorative previews use empty alt text. Missing portraits render text initials. PDF content has named open/download actions and an explanatory fallback.

## Manual verification

Keyboard-test the boot skip, launcher, desktop icons, window controls, taskbar restore, member flow, gallery filters, lightbox, and mobile navigation. At 200% text zoom, confirm important controls remain reachable and no body text overlaps.
