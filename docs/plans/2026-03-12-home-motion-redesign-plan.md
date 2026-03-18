# Home Motion Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the Home page into a pinned audiovisual reel with a rising horizontal mask, synchronized title swaps, a minimal overlay nav, and an integrated final contact frame.

**Architecture:** Keep the route structure intact but replace the current Home composition with a single pinned reel stage and a final integrated end frame. Refactor shared navigation/layout so the Home uses a light overlay nav and no traditional footer. Use existing project data and images as placeholder media, and drive the Home sequence with ScrollTrigger pinning plus a rising horizontal mask that reveals the next frame while updating the active title.

**Tech Stack:** React 19, React Router 7, GSAP ScrollTrigger, CSS modules-by-component pattern, Node test runner, ESLint, Vite

---

### Task 1: Stabilize navigation labels and shared content

**Files:**
- Modify: `src/data/siteContent.js`
- Test: `tests/site-content.test.js`

**Step 1: Write the failing test**

Update `tests/site-content.test.js` to assert the shared navigation reflects the approved IA:

- Nav items are `Proyectos`, `Estudio`, `Contacto`
- No explicit `Inicio`

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL if old labels remain.

**Step 3: Write minimal implementation**

Update `src/data/siteContent.js`:

- Remove the `Inicio` nav item
- Rename `Studio` to `Estudio`
- Keep route hrefs unchanged (`/studio`)

**Step 4: Run test to verify it passes**

Run: `npm test`

Expected: PASS for nav assertions.

### Task 2: Replace the loader with the approved wordmark reveal

**Files:**
- Modify: `src/components/Loader/Loader.jsx`
- Modify: `src/components/Loader/Loader.css`
- Test: `tests/layout-direction.test.js`

**Step 1: Write the failing test**

Require:

- Loader renders `MANZANA CUATRO`
- Loader no longer includes the progress line element/class

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL if the old loader remains.

**Step 3: Write minimal implementation**

Update loader implementation:

- Replace compact logo with full wordmark
- Remove progress line node and related animation
- Keep black fullscreen background
- Use fade-based reveal timing that hands off cleanly to the reel

**Step 4: Run test to verify it passes**

Run: `npm test`

Expected: PASS.

### Task 3: Replace the section-based Home with a pinned reel and end frame

**Files:**
- Create: `src/components/HomeReel/HomeReel.jsx`
- Create: `src/components/HomeReel/HomeReel.css`
- Create: `src/components/HomeEndFrame/HomeEndFrame.jsx`
- Create: `src/components/HomeEndFrame/HomeEndFrame.css`
- Modify: `src/pages/HomePage.jsx`
- Test: `tests/layout-direction.test.js`

**Step 1: Write the failing test**

Assert:

- `HomePage.jsx` no longer imports the old `Hero`, `Marquee`, `ProjectsPreview`, and `Separator`
- `HomePage.jsx` renders a pinned reel component and an end-frame component

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL until the old composition is removed.

**Step 3: Write minimal implementation**

Create a new Home composition:

- `HomeReel` for the pinned frame choreography
- `HomeEndFrame` for the integrated contact close

Refactor `HomePage.jsx` to orchestrate those components and remove the old sequence.

**Step 4: Run test to verify it passes**

Run: `npm test`

Expected: PASS.

### Task 4: Implement the pinned reel, rising mask, and title synchronization

**Files:**
- Modify: `src/components/HomeReel/HomeReel.jsx`
- Modify: `src/components/HomeReel/HomeReel.css`
- Reference: `src/data/siteContent.js`
- Test: `tests/layout-direction.test.js`

**Step 1: Write the failing test**

Assert:

- A pinned or sticky reel stage exists
- A horizontal band/mask element exists
- Active title/title-track scaffolding exists
- At least three featured frames are sourced from showcase data

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL until the reel structure exists.

**Step 3: Write minimal implementation**

Build the reel:

- Pin the Home reel for most of the Home journey
- Render stacked media frames that stay visually alive while the next one is revealed
- Implement a rising horizontal band/mask that visually replaces one frame with the next
- Update the active title/metadata at the mask crossing point
- Use client or brand references in the first band rather than a decorative marquee
- Release the pin only as the final frame transitions into the end frame

Keep motion subtle and mobile-safe.

**Step 4: Run test to verify it passes**

Run: `npm test`

Expected: PASS.

### Task 5: Refactor shared navigation and layout into Home and interior variants

**Files:**
- Modify: `src/components/Nav/Nav.jsx`
- Modify: `src/components/Nav/Nav.css`
- Modify: `src/layouts/MainLayout.jsx`
- Modify: `src/components/Footer/Footer.jsx`
- Modify: `src/components/Footer/Footer.css`
- Test: `tests/nav-layout.test.js`

**Step 1: Write the failing test**

Assert:

- Top navigation no longer renders explicit `Inicio`
- Top navigation includes `Proyectos`, `Estudio`, `Contacto`
- Home navigation is a light overlay layout
- Home does not rely on a traditional footer block beneath the reel

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL until layout behavior is updated.

**Step 3: Write minimal implementation**

For Home:

- Brand on left edge
- Links distributed across the header
- Contact aligned to right edge
- No heavy CTA buttons in the top bar
- No footer treatment that competes with the reel

For interior pages:

- Preserve the same visual language with slightly more practical spacing
- Keep footer behavior conventional

**Step 4: Run test to verify it passes**

Run: `npm test`

Expected: PASS.

### Task 6: Build the integrated final contact frame

**Files:**
- Modify: `src/components/HomeEndFrame/HomeEndFrame.jsx`
- Modify: `src/components/HomeEndFrame/HomeEndFrame.css`
- Reference: `src/data/siteContent.js`
- Test: `tests/layout-direction.test.js`

**Step 1: Write the failing test**

Assert:

- The final Home composition contains a large contact CTA
- The end frame contains upper list treatment for brands/clients or capabilities
- The end frame includes lower social/contact/legal links

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL until the end frame is built.

**Step 3: Write minimal implementation**

Update the Home end frame:

- Place a large central contact CTA
- Include upper list treatment aligned with the references
- Include lower support links and contact information
- Make the entire frame feel like part of the reel rather than a conventional footer

**Step 4: Run test to verify it passes**

Run: `npm test`

Expected: PASS.

### Task 7: Align the tests with the pinned reel architecture

**Files:**
- Modify: `tests/layout-direction.test.js`
- Modify: `tests/site-content.test.js`
- Modify: `tests/nav-layout.test.js`

**Step 1: Run tests to capture failures**

Run: `npm test`

Expected: FAIL on stale assumptions if any old structure remains.

**Step 2: Write minimal implementation**

Update coverage to match the approved Home architecture:

- Assert route-based structure where appropriate
- Assert pinned reel scaffolding rather than old Home sections
- Keep checks focused on real maintained files

**Step 3: Run tests to verify they pass**

Run: `npm test`

Expected: PASS.

### Task 8: Resolve lint issues and cleanup motion hooks

**Files:**
- Modify: `src/components/ProjectShowcase/ProjectShowcase.jsx`
- Modify: `src/components/Separator/Separator.jsx`
- Modify: any new Home components if lint flags them

**Step 1: Run lint to capture failures**

Run: `npm run lint`

Expected: FAIL on any unused bindings, stale imports, or ref cleanup problems.

**Step 2: Write minimal implementation**

Fix lint issues:

- Remove unused bindings
- Capture `ref.current` into local variables before cleanup where needed
- Fix any new warnings/errors introduced by the redesign

**Step 3: Run lint to verify it passes**

Run: `npm run lint`

Expected: PASS.

### Task 9: Verify production build and final behavior

**Files:**
- Verify only

**Step 1: Run full verification**

Run: `npm test`
Expected: PASS

Run: `npm run lint`
Expected: PASS

Run: `npm run build`
Expected: PASS

**Step 2: Manual QA checklist**

Check:

- Home loader reveals cleanly into the opening frame
- Navbar layout matches the approved overlay design
- Home feels pinned rather than section-based
- The horizontal band rises through the reel
- Active title changes at the crossing point
- The final release into the contact frame feels intentional
- The end frame feels integrated rather than footer-like
- Mobile layout remains legible and touch-friendly
- Interior pages still navigate correctly
