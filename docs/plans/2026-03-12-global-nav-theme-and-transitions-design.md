# Global Nav, Theme, and Transitions Design

Date: 2026-03-12
Status: Approved

## Goal

Extend the editorial language already established on the Home page across the rest of the site:

- One shared navbar structure across all routes
- Dedicated client-band data instead of deriving clients from showcased projects
- Slower, fuller, continuous client loop
- Title blur/fade timing that tracks scroll more naturally
- Route transitions that feel like clean video-edit wipes instead of generic app animations
- Theme controls that stay discreet and do not compromise the Home reel

This is a refinement pass, not a redesign of the information architecture.

## Approved Direction

The user approved the following direction:

1. Keep the current Home reel concept
2. Move the client band to the end of the Home sequence, between the last clip and the closing CTA
3. Make the client band slower and structurally prepared for a much larger client list
4. Use the same navbar composition across Home and interior pages
5. Keep the theme control extremely discreet
6. Add a premium editorial page transition with light parallax, not a dramatic app-like animation

## Navbar System

### Shared Structure

All desktop routes should use the same upper navigation structure:

- Left: `Manzana Cuatro`
- Center-left: `Proyectos`
- Center-right: `Estudio`
- Right: `Contacto`

The layout should stay fixed and visually stable across:

- `/`
- `/proyectos`
- `/proyectos/:slug`
- `/studio`
- `/contacto`

The structure should no longer switch between a Home layout and an interior layout.

### Theme Control

The theme control should not live inside the four-item navbar grid.

Recommended behavior:

- Desktop: a very discreet `Dark / Light` control to the far right, visually secondary to the nav
- Mobile: keep the theme action in the mobile menu

This keeps the header editorial and uncluttered.

### Contrast Strategy

The Home reel remains visually sensitive because it sits on top of moving imagery.

The navbar should not rely only on the current frame being bright or dark enough. It should maintain readability through a controlled contrast treatment, such as:

- a blend-mode-based treatment, or
- a very subtle contrast mask/backdrop just for the nav text

The intent is stability, not obvious decoration.

## Theme Behavior

### Interior Pages

Interior pages should continue to support a true theme change across the page.

### Home Page

The Home reel should remain visually stable even when the theme changes.

Approved behavior:

- Above the fold Home reel remains effectively dark/stable in perception
- The theme change should affect:
  - the client band
  - the closing CTA/contact frame
  - all interior pages

This avoids ruining nav readability or reducing title contrast over video.

### Theme Transition Style

The current curtain transition is structurally useful, but visually too generic.

The updated theme transition should feel closer to video finishing or color grading:

- a clean wipe
- a controlled tonal sweep
- quick and precise
- no exaggerated flourish

The change should feel cinematic, not playful.

## Client Band System

### Data Source

The Home client band should no longer be derived from `showcaseProjects`.

It should move to a dedicated data source in `siteContent`, so the team can:

- control client order independently
- add many more clients than the visible projects
- later upgrade from text names to logos without changing component architecture

Recommended structure:

```js
clients: [
  { name: 'La Bodega' },
  { name: 'Shibuya' },
  { name: 'Changan Dominicana' },
]
```

This can grow later to include:

- `logo`
- `logoAlt`
- `href`
- `themeVariant`

### Loop Behavior

The band should feel permanently full.

Approved behavior:

- The visible row is never sparse
- The loop is seamless
- The first client exits left and re-enters on the right in order
- The component should scale to many clients without visible restart artifacts

The current direction of duplicating content in a long horizontal loop is correct, but the component should be driven by dedicated client data and tuned for density and pacing.

### Placement

The client band should sit between:

- the final Home reel clip
- the closing CTA/contact frame

It should act as a final editorial bridge, not as part of the opening reel transitions.

## Home Reel Timing Refinements

### Title Blur/Fade

The titles currently change too quickly relative to scroll intent.

Approved refinement:

- keep the blur/fade approach
- make it drag slightly more with scroll
- avoid feeling like a quick switch
- maintain a small amount of motion, not a heavy animated offset

The visual target is a smoother editorial handoff between names, not a sharp UI transition.

### Scroll Matching

The title transition should feel more directly tied to user scroll movement.

That means:

- slightly wider transition windows
- less abrupt state snapping
- a blur/fade curve that breathes with the crossing of the reveal

## Page Transition Direction

### Scope

Apply the same route transition language across all page navigations, including project detail routes.

### Motion Style

Recommended route transition:

- a clean horizontal wipe or swipe
- a tiny parallax offset on content
- fast and precise timing
- no oversized scaling, spinning, or dramatic depth effects

This should feel like a premium edit between scenes, not like a mobile app screen push.

### Behavioral Goal

The user should feel:

- one cohesive authored website
- controlled movement between sections
- continuity with the cinematic logic of the Home

The user should not feel:

- a heavy loader between every route
- a jarring screen replacement
- a novelty animation

## Files Likely Affected

This design will likely affect:

- `src/components/Nav/Nav.jsx`
- `src/components/Nav/Nav.css`
- `src/components/PageTransition/PageTransition.jsx`
- `src/components/PageTransition/PageTransition.css`
- `src/components/ThemeTransition/ThemeTransition.jsx`
- `src/components/ThemeTransition/ThemeTransition.css`
- `src/components/HomeReel/HomeReel.jsx`
- `src/components/HomeReel/HomeReel.css`
- `src/components/HomeClientBand/HomeClientBand.jsx`
- `src/components/HomeClientBand/HomeClientBand.css`
- `src/data/siteContent.js`
- `src/layouts/MainLayout.jsx`

## Success Criteria

This refinement is successful if:

- every page uses the same navbar structure
- the desktop header feels visually consistent across routes
- the theme control is present but secondary
- the Home client band is slower, denser, and driven by dedicated client data
- the Home title blur/fade feels more scroll-matched
- the route transition feels editorial and premium
- the Home reel remains visually stable and readable during theme changes
