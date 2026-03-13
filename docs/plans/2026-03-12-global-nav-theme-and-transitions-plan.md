# Global Nav, Theme, and Transitions Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Unify the navbar across all routes, move the Home client band to dedicated client data, slow and densify the loop, refine title blur timing, and add an editorial route transition with a discreet theme control strategy.

**Architecture:** Keep the Home reel architecture intact but treat the client band as a separate bridge component driven by dedicated data. Refactor the shared navbar so Home and interior pages use the same grid structure, move the theme control outside the main nav grid, and replace the current route/theme curtains with a more editorial wipe that preserves readability and continuity.

**Tech Stack:** React 19, React Router 7, GSAP, CSS component files, Node test runner, ESLint, Vite

---

### Task 1: Add dedicated client-band data

**Files:**
- Modify: `src/data/siteContent.js`
- Test: `tests/site-content.test.js`

**Step 1: Write the failing test**

Add assertions that:

- `siteContent.clients` exists
- It contains the approved client names in order
- The Home client band no longer depends on deriving names from `showcaseProjects`

**Step 2: Run test to verify it fails**

Run: `node --test tests/site-content.test.js`

Expected: FAIL because `siteContent.clients` does not exist yet.

**Step 3: Write minimal implementation**

Update `src/data/siteContent.js`:

- Add a new `clients` array under `siteContent`
- Seed it with the currently approved client names
- Keep `showcaseProjects` intact for portfolio content

**Step 4: Run test to verify it passes**

Run: `node --test tests/site-content.test.js`

Expected: PASS

**Step 5: Commit**

```bash
git add src/data/siteContent.js tests/site-content.test.js
git commit -m "feat: add dedicated client band data"
```

### Task 2: Refactor the Home client band to use dedicated data and slower looping

**Files:**
- Modify: `src/components/HomeClientBand/HomeClientBand.jsx`
- Modify: `src/components/HomeClientBand/HomeClientBand.css`
- Test: `tests/layout-direction.test.js`

**Step 1: Write the failing test**

Add assertions that:

- `HomeClientBand` reads from dedicated client data
- The component uses duplicated loop groups
- The CSS defines a continuous horizontal animation and group-based layout

**Step 2: Run test to verify it fails**

Run: `node --test tests/layout-direction.test.js`

Expected: FAIL if the component still derives data implicitly or lacks the desired loop structure.

**Step 3: Write minimal implementation**

Update the client band:

- Read from `siteContent.clients`
- Build at least two duplicated groups for seamless looping
- Slow the loop speed
- Ensure spacing keeps the row visually full at desktop widths and ultrawides
- Keep the sequence ordered so the first client exits left and returns on the right naturally

**Step 4: Run test to verify it passes**

Run: `node --test tests/layout-direction.test.js`

Expected: PASS

**Step 5: Commit**

```bash
git add src/components/HomeClientBand/HomeClientBand.jsx src/components/HomeClientBand/HomeClientBand.css tests/layout-direction.test.js
git commit -m "feat: refine looping client band"
```

### Task 3: Slow and soften Home title blur transitions

**Files:**
- Modify: `src/components/HomeReel/HomeReel.jsx`
- Modify: `src/components/HomeReel/HomeReel.css`
- Test: `tests/layout-direction.test.js`

**Step 1: Write the failing test**

Add assertions that:

- Home title timing constants use a wider transition window than the current quick switch
- The title blur/fade still exists
- The implementation remains scroll-driven

**Step 2: Run test to verify it fails**

Run: `node --test tests/layout-direction.test.js`

Expected: FAIL if timing remains unchanged.

**Step 3: Write minimal implementation**

Update title choreography:

- widen fade-out / fade-in windows
- reduce the feeling of a hard switch
- preserve subtle blur and minor translation
- keep interaction pointer-safe so only the active CTA is interactive

**Step 4: Run test to verify it passes**

Run: `node --test tests/layout-direction.test.js`

Expected: PASS

**Step 5: Commit**

```bash
git add src/components/HomeReel/HomeReel.jsx src/components/HomeReel/HomeReel.css tests/layout-direction.test.js
git commit -m "feat: soften home title transitions"
```

### Task 4: Unify the navbar across all routes

**Files:**
- Modify: `src/components/Nav/Nav.jsx`
- Modify: `src/components/Nav/Nav.css`
- Modify: `src/layouts/MainLayout.jsx`
- Test: `tests/nav-layout.test.js`

**Step 1: Write the failing test**

Add assertions that:

- Home and interior routes use the same navbar grid structure
- The desktop navbar always renders `Manzana Cuatro / Proyectos / Estudio / Contacto`
- Theme control is present outside the main nav grid
- Interior pages no longer use a structurally different navbar layout

**Step 2: Run test to verify it fails**

Run: `node --test tests/nav-layout.test.js`

Expected: FAIL while Home and interior nav variants still differ structurally.

**Step 3: Write minimal implementation**

Refactor the nav:

- keep one desktop grid across all routes
- preserve mobile menu behavior
- move theme control to a subtle right-side placement outside the core grid
- remove visual divergence between Home and interiors except contrast tuning

**Step 4: Run test to verify it passes**

Run: `node --test tests/nav-layout.test.js`

Expected: PASS

**Step 5: Commit**

```bash
git add src/components/Nav/Nav.jsx src/components/Nav/Nav.css src/layouts/MainLayout.jsx tests/nav-layout.test.js
git commit -m "feat: unify navbar across routes"
```

### Task 5: Refine theme behavior and transition language

**Files:**
- Modify: `src/hooks/useTheme.js`
- Modify: `src/components/ThemeTransition/ThemeTransition.jsx`
- Modify: `src/components/ThemeTransition/ThemeTransition.css`
- Modify: `src/components/Nav/Nav.jsx`
- Possibly modify: `src/index.css`
- Test: `tests/nav-layout.test.js`

**Step 1: Write the failing test**

Add assertions that:

- the theme control label is present in the navbar
- theme transition is no longer just the old generic curtain behavior
- the Home route can preserve reel readability while still supporting the lower-page theme effect strategy

**Step 2: Run test to verify it fails**

Run: `node --test tests/nav-layout.test.js`

Expected: FAIL until the old generic setup is replaced.

**Step 3: Write minimal implementation**

Update the theme system:

- expose a discreet `Dark / Light` control on desktop
- keep mobile theme action in menu
- replace the generic curtain with a more editorial wipe/color-grade style sweep
- ensure the Home reel stays visually stable in perceived contrast
- keep theme behavior global for interiors and limited in visual effect on the Home reel area

**Step 4: Run test to verify it passes**

Run: `node --test tests/nav-layout.test.js`

Expected: PASS

**Step 5: Commit**

```bash
git add src/hooks/useTheme.js src/components/ThemeTransition/ThemeTransition.jsx src/components/ThemeTransition/ThemeTransition.css src/components/Nav/Nav.jsx src/index.css tests/nav-layout.test.js
git commit -m "feat: refine theme control and transition"
```

### Task 6: Replace route transitions with an editorial wipe plus light parallax

**Files:**
- Modify: `src/components/PageTransition/PageTransition.jsx`
- Modify: `src/components/PageTransition/PageTransition.css`
- Modify: `src/layouts/MainLayout.jsx`
- Test: `tests/nav-layout.test.js`

**Step 1: Write the failing test**

Add assertions that:

- route transition still exists
- it now includes content motion or parallax support, not only a basic full-screen curtain
- the transition applies across route changes, including project detail routes

**Step 2: Run test to verify it fails**

Run: `node --test tests/nav-layout.test.js`

Expected: FAIL until the transition structure changes.

**Step 3: Write minimal implementation**

Refactor route transitions:

- keep route change orchestration in `PageTransition`
- add a directional wipe treatment
- add a tiny parallax offset for outgoing/incoming content
- keep timing tight and premium
- ensure `window.scrollTo(0, 0)` still occurs at the right midpoint

**Step 4: Run test to verify it passes**

Run: `node --test tests/nav-layout.test.js`

Expected: PASS

**Step 5: Commit**

```bash
git add src/components/PageTransition/PageTransition.jsx src/components/PageTransition/PageTransition.css src/layouts/MainLayout.jsx tests/nav-layout.test.js
git commit -m "feat: add editorial page transitions"
```

### Task 7: Run full verification and check Home-specific regressions

**Files:**
- Test: `tests/layout-direction.test.js`
- Test: `tests/nav-layout.test.js`
- Test: `tests/site-content.test.js`

**Step 1: Run targeted tests**

Run:

```bash
node --test tests/layout-direction.test.js tests/nav-layout.test.js tests/site-content.test.js
```

Expected: PASS

**Step 2: Run full project verification**

Run:

```bash
npm test
npm run lint
npm run build
```

Expected:

- `npm test`: all tests pass
- `npm run lint`: zero lint errors
- `npm run build`: production build succeeds

**Step 3: Manual visual QA checklist**

Check:

- desktop Home navbar matches interior navbar structure
- client band looks continuously full and loops cleanly
- title blur/fade feels slower and more scroll-matched
- theme control remains discreet
- route transition feels like an edit, not an app swipe
- Home reel readability remains strong while using the shared navbar

**Step 4: Commit**

```bash
git add .
git commit -m "feat: unify nav and refine transitions"
```
