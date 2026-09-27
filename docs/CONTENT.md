# Content Replacement Guide

All current people and activity entries are clearly labeled sample content because no verified personal data or photos were supplied.

## Member data

Edit `src/data/members.ts`. For each member replace:

- `name`, `nickname`, and `role`
- `birthDate` and `hometown`
- `bio` and `interests`
- `photo` with a public path such as `/members/ibnu.webp`
- `socials` with verified public URLs only
- `cv` with a public PDF path such as `/cvs/ibnu-rizqi.pdf`
- `isPlaceholder: false` only after the whole record is approved for publication

Do not add email addresses, phone numbers, street addresses, or private accounts without explicit consent.

## Portraits

Place optimized portrait files in `public/members/`. Prefer WebP or AVIF, consistent portrait crops, and meaningful filenames. The interface supplies an initials fallback when a file is missing.

## CV PDFs

Place ATS CV files in `public/cvs/`. Keep text selectable, use one-column reading order where possible, and keep filenames stable. Update the member’s `cv` path. Missing PDFs intentionally show a “Belum tersedia” state.

## Memories

Edit `src/data/memories.ts`. Replace title, caption, date, category, alt text, and `src`. Put optimized activity photos in `public/memories/`. Use factual dates and descriptions; never identify people without permission.

## Group copy and links

- Group name and About copy: `src/data/site.ts`
- App labels: `src/data/apps.ts`
- GitHub and other bookmarks: `src/data/site.ts`
- Browser title/description: `index.html`

## Final content checklist

- Remove every visible “CONTOH” or “Belum diisi” label only after verified replacements exist.
- Open every social URL in a new tab and confirm it is public.
- View every PDF in production preview.
- Confirm every image has accurate alt text and permission for publication.
