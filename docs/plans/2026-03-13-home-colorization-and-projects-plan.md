# Home Colorization And Projects Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refine the home `Colorizacion` stage so it behaves like a cinematic continuation of the reel, including a title drop, a horizontal track of three grading reels, and a draggable comparison hero, before redesigning the Projects page.

**Architecture:** Keep everything inside the existing pinned home scroll system. Add a more explicit stage model for HomeReel so the nav can react to the pure-background phase, extend the colorization area into a horizontal camera-track sequence, and replace the current static comparison with a real interactive slider.

**Tech Stack:** React, React Router, CSS, GSAP/ScrollTrigger, existing content data in `siteContent.js`, node test suite, Vite

---

### Task 1: Cover the refined colorization stage contract with tests

**Files:**
- Modify: `tests/layout-direction.test.js`
- Modify: `tests/nav-layout.test.js`
- Modify: `tests/site-content.test.js`

**Step 1: Write the failing test**

- Assert that `siteContent.colorization` exposes multiple reels for the horizontal track.
- Assert that `HomeReel` includes a horizontal track container plus a draggable comparison control.
- Assert that home nav treatment can respond to a dedicated home reel stage, not only the final home section.

**Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL because the current implementation only has a single colorization panel and a non-draggable comparison.

**Step 3: Write minimal implementation**

- Add the new content structure.
- Add the missing structural hooks/classes.
- Add explicit stage signaling for the nav.

**Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS

**Step 5: Commit**

```bash
git add tests/layout-direction.test.js tests/nav-layout.test.js tests/site-content.test.js src/components/HomeReel/HomeReel.jsx src/components/HomeReel/HomeReel.css src/components/Nav/Nav.jsx
git commit -m "test: cover refined home colorization flow"
```

### Task 2: Add multi-reel colorization data and stage signaling

**Files:**
- Modify: `src/data/siteContent.js`
- Modify: `src/components/HomeReel/HomeReel.jsx`
- Modify: `src/components/Nav/Nav.jsx`

**Step 1: Write the failing test**

- Assert a `reels` array under `siteContent.colorization`.
- Assert the home reel emits or applies explicit stage state for the pure-background phase.

**Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL because those hooks do not exist yet.

**Step 3: Write minimal implementation**

- Add `siteContent.colorization.reels` with three placeholder grading reels.
- Add a small stage state contract between `HomeReel` and `Nav`.

**Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS

**Step 5: Commit**

```bash
git add src/data/siteContent.js src/components/HomeReel/HomeReel.jsx src/components/Nav/Nav.jsx tests/layout-direction.test.js tests/nav-layout.test.js tests/site-content.test.js
git commit -m "feat: add colorization reel data and nav stage signaling"
```

### Task 3: Rebuild the colorization motion sequence inside HomeReel

**Files:**
- Modify: `src/components/HomeReel/HomeReel.jsx`
- Modify: `src/components/HomeReel/HomeReel.css`

**Step 1: Write the failing test**

- Assert presence of a horizontal colorization track.
- Assert presence of the title-drop specific structure.
- Assert that the comparison panel is separated from the track.

**Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL because the current stage does not model the camera-track sequence.

**Step 3: Write minimal implementation**

- Add the reel wash/fade into pure background.
- Make `Colorizacion` drop from above with perspective.
- Make the first colorization reel rise from below and cover the title.
- Move a track of three reels horizontally as if the camera is scanning a table.
- End on a dedicated comparison hero.

**Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/HomeReel/HomeReel.jsx src/components/HomeReel/HomeReel.css tests/layout-direction.test.js
git commit -m "feat: add cinematic colorization track to home reel"
```

### Task 4: Replace the static comparison with a draggable comparison slider

**Files:**
- Create: `src/components/ComparisonSlider/ComparisonSlider.jsx`
- Create: `src/components/ComparisonSlider/ComparisonSlider.css`
- Modify: `src/components/HomeReel/HomeReel.jsx`
- Modify: `src/components/HomeReel/HomeReel.css`
- Modify: `tests/layout-direction.test.js`

**Step 1: Write the failing test**

- Assert presence of a draggable comparison control/handle.
- Assert slider semantics and labels.

**Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL because the current comparison is only decorative.

**Step 3: Write minimal implementation**

- Build a reusable comparison slider using pointer events.
- Support click, drag, touch, and keyboard.
- Integrate it as the final hero of the colorization stage.

**Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/ComparisonSlider/ComparisonSlider.jsx src/components/ComparisonSlider/ComparisonSlider.css src/components/HomeReel/HomeReel.jsx src/components/HomeReel/HomeReel.css tests/layout-direction.test.js
git commit -m "feat: add draggable color comparison slider"
```

### Task 5: Final verification before moving to Projects

**Files:**
- Verify only: all touched files

**Step 1: Run tests**

Run: `npm test`
Expected: PASS

**Step 2: Run lint**

Run: `npm run lint`
Expected: PASS

**Step 3: Run build**

Run: `npm run build`
Expected: PASS

**Step 4: Manual review checklist**

- The final reel settles cleanly before `Colorizacion` starts.
- The background wash toward the active theme feels deliberate.
- The title drop reads like a sign passing the camera.
- The first reel hides the title behind it instead of pushing it upward.
- The three-reel horizontal track feels like a camera move, not stacked cards.
- The nav and theme toggle switch to the correct theme color as soon as the pure stage begins.
- The final comparison can be dragged with both mouse and touch.

**Step 5: Commit**

```bash
git add .
git commit -m "feat: refine cinematic colorization sequence"
```
