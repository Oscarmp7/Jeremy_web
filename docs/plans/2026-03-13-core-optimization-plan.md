# Core Optimization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Improve SEO, performance, accessibility, and code hygiene across the site without breaking the current visual system.

**Architecture:** Keep the existing React SPA and modular CSS structure, then add a thin metadata layer, route-level code splitting, reduced-motion guards, accessibility fixes, and safe dead-code removal. Avoid a broad Tailwind rewrite because the current codebase is already organized around component CSS.

**Tech Stack:** React 19, React Router 7, Vite 7, GSAP, Node test runner, ESLint

---

### Task 1: Add failing tests for the missing architecture

**Files:**
- Create: `tests/route-meta.test.js`
- Modify: `tests/layout-direction.test.js`
- Modify: `tests/nav-layout.test.js`

**Step 1: Write the failing tests**

- Add route metadata tests for home, projects, project detail, contact, and not-found.
- Assert the app uses lazy route imports and includes a catch-all route.
- Assert the layout exposes a skip link and the home-only footer branch is removed.

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: failures for missing route metadata utility, missing lazy imports, missing skip link, and stale footer assertions.

**Step 3: Write minimal implementation**

- Add the route metadata helper.
- Refactor routing to use lazy imports and a 404 route.
- Add the skip link and simplify the footer.

**Step 4: Run test to verify it passes**

Run: `npm test`

Expected: the new tests pass and the existing suite stays green.

### Task 2: Add route-level SEO and static discoverability assets

**Files:**
- Create: `src/seo/routeMeta.js`
- Create: `src/seo/RouteMeta.jsx`
- Create: `src/pages/NotFoundPage.jsx`
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`
- Modify: `index.html`
- Modify: `src/App.jsx`

**Step 1: Write the failing test**

- Cover route metadata generation in `tests/route-meta.test.js`.

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/route-meta.test.js`

Expected: fail because the helper and route integration do not exist yet.

**Step 3: Write minimal implementation**

- Centralize metadata generation.
- Inject document head tags on route changes.
- Add a real 404 page and catch-all route.
- Strengthen the base document metadata and add crawl assets.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/route-meta.test.js`

Expected: pass.

### Task 3: Split routes and reduce initial work

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/Loader/Loader.jsx`
- Modify: `src/components/ProjectShowcase/ProjectShowcase.jsx`

**Step 1: Write the failing test**

- Assert lazy imports are used in `tests/layout-direction.test.js`.

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/layout-direction.test.js`

Expected: fail because routes are currently eagerly imported.

**Step 3: Write minimal implementation**

- Convert page imports to `React.lazy`.
- Wrap routes with `Suspense`.
- Render only the active showcase image instead of all hidden images.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/layout-direction.test.js`

Expected: pass.

### Task 4: Improve accessibility and reduced motion

**Files:**
- Create: `src/hooks/usePrefersReducedMotion.js`
- Modify: `src/layouts/MainLayout.jsx`
- Modify: `src/index.css`
- Modify: `src/components/Nav/Nav.jsx`
- Modify: `src/components/Nav/Nav.css`
- Modify: `src/components/PageTransition/PageTransition.jsx`
- Modify: `src/components/ThemeTransition/ThemeTransition.jsx`
- Modify: `src/components/HomeReel/HomeReel.jsx`
- Modify: `src/pages/ContactPage.jsx`
- Modify: `src/pages/StudioPage.jsx`
- Modify: `src/pages/ProjectDetailPage.jsx`

**Step 1: Write the failing test**

- Assert the skip link exists.
- Assert the nav has explicit dialog labeling and keyboard close support markers.

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/nav-layout.test.js`

Expected: fail because the new accessibility hooks/markers are not there yet.

**Step 3: Write minimal implementation**

- Add `usePrefersReducedMotion`.
- Skip GSAP transitions when reduced motion is requested.
- Add skip link.
- Improve mobile menu semantics, escape close, focus management, and route-close behavior.
- Prevent hidden reel links from being keyboard-focusable.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/nav-layout.test.js`

Expected: pass.

### Task 5: Remove dead and unreachable code safely

**Files:**
- Delete: `src/components/Hero/Hero.jsx`
- Delete: `src/components/Hero/Hero.css`
- Delete: `src/components/Marquee/Marquee.jsx`
- Delete: `src/components/Marquee/Marquee.css`
- Delete: `src/components/ProjectsPreview/ProjectsPreview.jsx`
- Delete: `src/components/ProjectsPreview/ProjectsPreview.css`
- Delete: `src/components/Separator/Separator.jsx`
- Modify: `src/components/Footer/Footer.jsx`
- Modify: `src/components/Footer/Footer.css`
- Modify: `src/index.css`

**Step 1: Verify no live imports exist**

Run: `rg -n "Hero|Marquee|ProjectsPreview|Separator" src`

Expected: no active runtime imports outside the files being deleted.

**Step 2: Write minimal cleanup**

- Remove dead components and unreachable footer branch.
- Remove CSS that no longer has a consumer.

**Step 3: Run tests**

Run: `npm test`

Expected: suite remains green after cleanup.

### Task 6: Final verification

**Files:**
- Review only

**Step 1: Run full test suite**

Run: `npm test`

Expected: all tests pass.

**Step 2: Run linter**

Run: `npm run lint`

Expected: exit 0.

**Step 3: Run production build**

Run: `npm run build`

Expected: exit 0 and a smaller initial JS payload than the current build.
