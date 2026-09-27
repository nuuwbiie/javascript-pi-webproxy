# Architecture

## Overview

PROXY OS is a static React single-page application built with Vite and strict TypeScript. It deliberately avoids a backend and heavy windowing libraries. Content, state transitions, rendering, and pointer interactions are separated so the OS metaphor remains maintainable.

## Source boundaries

```text
src/
  app/                 shell, providers, and top-level composition
  apps/                application views
  components/          desktop, window, taskbar, and shared UI
  data/                app registry, members, and memories
  hooks/               clock, media, and window interaction hooks
  lib/                 pure helpers
  styles/              tokens and global component styling
  types/               product and window contracts
```

## State model

`WindowProvider` owns a reducer whose state contains running windows, focus order, selection, and the next z-index. Every application is registered by `AppId`; rendering is selected from that registry rather than duplicated across windows. Profile and CV windows carry a typed member identifier in their payload.

Window geometry uses desktop workspace coordinates. Dragging and resizing update transient visual state through pointer events, then commit bounded geometry. Maximized windows preserve their prior rectangle for restore. Mobile does not reuse window geometry: it uses a single active-app route state so touch interaction stays predictable.

## Content model

Member and memory records live in `src/data`. Components never contain factual profile content. Optional URLs and asset paths allow honest fallbacks. `CONTENT.md` is the maintainer contract.

## Styling

One tokenized CSS system is appropriate for the bespoke OS chrome and keeps the bundle small. Semantic component class names own layout; CSS variables own recurring color, radius, shadow, spacing, and motion values.

## Documents and assets

Static public files use stable paths under `public/`. CVs are embedded with the browser’s PDF renderer only after a viewer opens. Missing PDFs display an explanatory state rather than a broken frame.

## Error boundaries

The app shell includes a small React error boundary. Individual media uses load fallbacks. Unsupported or absent documents provide explicit alternative actions only when a real URL exists.

## Decisions

- React Context + reducer is sufficient; Redux would add ceremony without server or cross-page data complexity.
- Native pointer events keep drag/resize lightweight and support pointer capture.
- Lucide React supplies functional glyphs; branded app tiles provide the distinct PROXY OS icon identity.
- Vitest targets reducer and navigation logic; broad snapshot testing is avoided.
