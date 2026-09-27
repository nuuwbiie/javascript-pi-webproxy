# PROXY OS

A digital yearbook disguised as a playful operating system for Connect & Deploy — Pekan Ilkomerz 62.

## Preview

Screenshots will be added after the final rendered QA pass.

## Features

- Session-scoped boot sequence
- Interactive desktop with movable, resizable, minimizable windows
- Purpose-built mobile home screen and full-screen apps
- Member explorer, profiles, CV explorer/viewer, memories gallery, About, and Links
- Keyboard navigation and reduced-motion support
- Data-driven content with honest missing-asset fallbacks

## Technology

React, Vite, strict TypeScript, modern CSS, Lucide React, Vitest, and Testing Library. The production output is static and requires no backend.

## Project structure

See `docs/ARCHITECTURE.md` for the source boundaries and window-state model.

## Local development

```bash
npm install
npm run dev
```

## Commands

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

## Updating content

See `docs/CONTENT.md` for member records, portraits, CV PDFs, memories, captions, group copy, and external links. Do not remove sample labels until all replacement information is verified and approved for publication.

## Deployment

### Vercel

1. Push the repository to GitHub.
2. Import it in Vercel and keep the detected Vite settings.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Deploy and manually verify asset, PDF, and SPA navigation paths.

No environment variables or backend services are required.

## Credits

Designed for the PROXY group’s Pekan Ilkomerz 62 Connect & Deploy assignment. Visual direction follows the supplied PROXY OS concept art.
