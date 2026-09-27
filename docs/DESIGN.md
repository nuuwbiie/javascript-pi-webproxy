# Initial Design Specification

This pre-build specification translates the supplied concept art into implementation rules. It is updated after rendered QA so documented values match the shipped interface.

## Visual thesis

PROXY OS feels like a sunlit campus desktop assembled from a yearbook, a friendly file manager, and crisp editorial annotations. A blue-sky wallpaper provides emotional scale; warm paper windows keep people and documents readable; lime and coral marks add student-made energy.

## Principles

1. Compose the desktop like a poster, not a pile of cards.
2. Keep chrome quiet enough that portraits, names, and memories lead.
3. Use nostalgic cues in typography and controls, not low-resolution usability.
4. Let playful details reward exploration without hiding required information.
5. On mobile, preserve the identity while replacing the interaction model.

## Tokens

- Background sky: `#5aa7df`; deep sky: `#2f79bb`; ground/navy: `#102634`.
- Paper: `#f7f3ea`; bright surface: `#fffdf7`; ink: `#10171d`; muted ink: `#5d6871`.
- Accent lime: `#c7f36b`; coral: `#ff7067`; yellow: `#ffd45e`; link blue: `#226cae`.
- Border: dark ink at 20–35% depending on hierarchy.
- Radius: 8px controls, 12px windows, 18px major mobile surfaces; app tiles use distinctive mixed geometry.
- Shadows: a crisp 2px ink edge plus broad soft atmospheric shadow for windows; avoid generic floating-card shadow everywhere.

## Typography

- Display: a heavy geometric sans stack with tight spacing.
- Interface: system sans for native-feeling readability.
- Monospace: system mono for boot, filenames, and technical annotations.
- Handwritten accents use a restrained cursive system fallback only for short decorative phrases, never instructions.

## Spacing

Use a 4px base with primary steps 8, 12, 16, 24, 32, 48, and 64. Window internals favor 16–24px; desktop composition uses larger negative space.

## Window anatomy

A 38–42px title bar, grouped status controls, concise title, and right-aligned actions. Content owns one continuous surface instead of nested card stacks. Resize affordances are visible on focus. Maximized windows align to the workspace, not behind the taskbar.

## Taskbar

A pale paper strip with a bold blue PROXY mark, compact running-app chips, and a right system cluster. It reads as authored OS chrome rather than a direct commercial-OS clone.

## App icons

Functional line glyphs sit inside colorful “file objects”: folder tabs, photo corners, punched-note dots, and bookmark notches. Labels use a dark high-contrast plate over the wallpaper.

## States

- Hover: small lift or color shift; never constant bounce.
- Pressed: 1–2px translation with reduced shadow.
- Focus: lime inner ring plus dark outer ring.
- Disabled/missing: neutral surface and explicit explanatory copy.

## Motion

Boot completes in roughly 1.4 seconds. Windows open with one short opacity/scale transition; minimizing collapses toward the taskbar without elaborate physics. Gallery transitions use a brief crossfade. Reduced motion removes transform-based movement.

## Responsive behavior

At widths below 768px, the desktop is replaced by a mobile home screen. Apps become full-height views; desktop icons become a 2–3 column launcher; the taskbar becomes a bottom dock/home control. Tablet landscape may retain the desktop when usable.

## Wallpaper and imagery

The wallpaper should evoke bright sky and campus optimism without claiming to depict a real campus. Real portraits and memories, once supplied, use honest crops and light editorial color treatment. Placeholder artwork is visibly labeled sample material.

## Application layouts

- Members: file-explorer toolbar, light sidebar on desktop, responsive portrait grid.
- Profile: decisive portrait/name split; facts and links remain scannable; CV action is prominent.
- Gallery: variable but aligned crops, category tabs, captions in the lightbox.
- CV viewer: dark document stage with generous page scale and persistent file actions.
