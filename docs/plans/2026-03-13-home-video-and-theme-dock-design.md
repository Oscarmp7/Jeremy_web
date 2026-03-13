# Home Video And Theme Dock Design

**Scope**

Replace the current home reel image placeholders with silent looping video placeholders and fix the theme toggle so it remains visually anchored outside the scrolled nav treatment on interior pages.

**Decisions**

- Keep the current reel composition, typography, overlays, and scroll logic.
- Extend project content with optional `video` placeholders instead of replacing the existing `poster` field.
- Render `video` in the home reel when available, with `poster` fallback and static-image fallback for reduced motion.
- Move the theme dock outside the header container so the interior `nav--scrolled` background never visually absorbs it.

**Constraints**

- No large visual redesign.
- No risky styling migration to Tailwind.
- Preserve accessibility and reduced-motion behavior already added.
- Keep implementation data-driven so placeholder media can be swapped for real campaign videos later.
