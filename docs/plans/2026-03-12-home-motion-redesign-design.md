# Home Motion Redesign Design

Date: 2026-03-12
Status: Approved

## Goal

Redesign the Home page so it behaves like a pinned audiovisual reel centered on portfolio and brand perception, while staying faithful to the Manzana Cuatro brief:

- Minimalist
- Modern
- Portfolio-first
- Subtle motion
- Clear WhatsApp and portfolio intent
- Spanish-first language

The code structure can remain modular, but the user-facing experience must not read like stacked sections. It must read like a fixed stage where a horizontal mask rises and replaces one frame with the next.

## Brief Alignment

This corrected direction aligns with `docs/brief-manzana-cuatro.md` in the following ways:

- Keeps portfolio as the main visual hook
- Preserves WhatsApp and portfolio intent without turning the top bar into a CTA strip
- Maintains a minimalist and premium feel
- Uses subtle, controlled motion rather than showy effects
- Supports the Apple-like reference through restraint, hierarchy, and polish

To stay aligned, the redesign must avoid:

- Conventional section stacking on Home
- Decorative transitions that do not affect hierarchy
- Heavy top-bar actions
- English labels such as `About`

## Information Architecture

The Home page will remain modular in code, but it must no longer feel like a sequence of sections. It must feel like one pinned reel.

Planned Home structure:

1. Loader
2. Pinned Home reel stage
3. Opening visual frame
4. First horizontal brand/client band transition
5. Additional visual frames revealed by the rising mask
6. Release from the pinned stage on the final frame
7. Integrated contact/end frame

The `/proyectos` page remains the full browsing destination. The Home page only highlights selected work and brand positioning.

## Navbar Direction

### Home Navbar

The Home page gets a minimal navigation overlay that stays visually subordinate to the reel:

- Left edge: `Manzana Cuatro` linking to `/`
- Interior links: `Proyectos`, `Estudio`
- Right edge: `Contacto`

Changes from current navbar:

- Remove explicit `Inicio`
- Rename `Studio` to `Estudio`
- Remove heavy CTA treatment from the top bar
- Keep the nav visually light and almost editorial
- Avoid side widgets on Home if they compete with the reel

### Interior Pages

Interior pages should keep the same visual language, but with slightly more functional behavior and spacing than the Home page version.

## Home Visual System

### Loader

The existing loader is replaced with a quieter, more iconic version:

- Full black background
- Large centered Manzana Cuatro wordmark
- No loading bar
- Minimal, still presentation
- Clean fade reveal into the first media stage

The reveal should feel like darkness dissolving into a living frame, not like a curtain wipe.

### Pinned Reel Stage

The Home page is a pinned stage, not a scrolling stack.

The user should perceive:

- The viewport staying almost static
- A horizontal mask or band rising through the frame
- The next visual layer being revealed below the current one
- The current frame remaining visually alive while the next one enters

The user should not perceive:

- Traditional section-to-section page scrolling
- Independent cards or content blocks
- Detached decorative transitions

### First Horizontal Band

The first band is not a decorative marquee.

It should communicate brand trust through:

- Client names or partner/brand references
- A visual rhythm consistent with the references in `docs/stitch`
- A horizontal editorial strip that participates in the reveal

This band acts as the first handoff between the opening frame and the next featured frame.

### Title and Frame Swap

When the rising horizontal band crosses the optical center:

- The active title changes
- The supporting metadata changes with it
- The new frame becomes the focal layer

This swap must feel synchronized with the mask crossing. The title should not change early or late.

### Additional Frames

The same logic repeats through the remaining featured frames:

- The stage remains pinned
- The horizontal band rises
- The next visual layer is revealed
- The active title updates at the crossing point

This should feel like frame replacement rather than section navigation.

### Final Release

Only on the last featured frame should the page begin to feel like it is actually moving downward again.

That release transitions into a final integrated end frame.

### Integrated Contact End Frame

The Home page should not end with a conventional footer block.

Instead, the final frame should integrate:

- Upper area with client/brand/service list treatment
- Large central contact call-to-action
- Lower area with social/contact/legal links

This entire ending should feel like the final composition of the reel, not like a separate website footer.

## Motion Principles

Motion must remain aligned with the brief:

- Subtle
- Clean
- Purposeful

Rules:

- Each animation must reinforce hierarchy, timing, or continuity
- Decorative motion with no communicative value should be removed
- The stage should feel pinned for most of the Home journey
- Only a few moments should feel memorable; not every element should animate

Key moments:

1. Loader fade reveal
2. First horizontal brand/client band handoff
3. Active title update at the crossing point
4. Final release into the integrated contact frame

## Mobile Behavior

Mobile should preserve the same concept but simplify execution:

- Fewer simultaneous layers
- Shorter transitions
- Reduced motion complexity
- Stronger emphasis on readability and tap targets

The Home page should still feel premium on mobile without relying on fragile choreography.

## Component Strategy

Rather than forcing the current `Hero`, `Marquee`, and `ProjectsPreview` into this new behavior, the Home page should be rebuilt as a dedicated pinned reel.

Recommended structure:

- `HomePage` remains the page orchestrator
- A dedicated reel component owns the pinned frame choreography
- A dedicated end-frame component replaces the notion of a traditional Home footer
- Navbar is refactored into reusable Home and interior variants

## Data Strategy

No real videos are required for this phase, but the placeholders must be treated like persistent moving frames rather than static cards.

Use current project imagery as placeholders and treat them as media canvases:

- Opening frame uses selected portfolio imagery
- Additional frames use existing showcase entries
- First band uses client/brand references rather than generic service text
- End frame uses contact and brand information already present in site content

This keeps the redesign unblocked while preparing the codebase for real clips later.

## Success Criteria

The redesign is successful if:

- The Home page feels pinned and cinematic rather than section-based
- The user perceives the horizontal band rising through the stage
- Frame changes feel synchronized with title changes
- Portfolio remains the focal point
- The final contact composition feels integrated into the reel
- Navigation stays visually quiet
- Mobile preserves the concept without fragility
