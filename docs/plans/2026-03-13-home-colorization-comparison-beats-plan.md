# Home Colorization Comparison Beats Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the `Colorizacion` comparison sequence feel like one continuous shot: panel 1 rises physically from below, each case holds centered, and the page only releases to the client band and CTA after the last centered hold.

**Architecture:** Keep the stage inside `HomeReel`, but replace the current continuous progress mapping with explicit camera beats: title completion, panel 1 vertical entrance, hold 1, slide to panel 2, hold 2, slide to panel 3, hold 3, release. Drive one comparison track with deterministic segment boundaries so the active case and its metadata only change when a case is actually centered.

**Tech Stack:** React, GSAP ScrollTrigger, CSS custom properties, Node test runner.

---

### Task 1: Lock the timeline shape in source tests

**Files:**
- Modify: `tests/layout-direction.test.js`
- Test: `tests/layout-direction.test.js`

**Step 1: Write the failing test**

Add assertions for explicit beat constants:
- `COLOR_COMPARISON_FIRST_HOLD`
- `COLOR_COMPARISON_CENTER_HOLD`
- `COLOR_COMPARISON_FINAL_HOLD`
- `COLOR_COMPARISON_FIRST_HOLD_END`
- `COLOR_COMPARISON_SECOND_HOLD_END`
- `COLOR_COMPARISON_FINAL_HOLD_END`

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/layout-direction.test.js`
Expected: FAIL because the old continuous timeline constants are still in use.

**Step 3: Write minimal implementation**

Introduce the beat constants in `src/components/HomeReel/HomeReel.jsx`.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/layout-direction.test.js`
Expected: PASS

### Task 2: Replace continuous travel with beat-driven comparison timing

**Files:**
- Modify: `src/components/HomeReel/HomeReel.jsx`
- Test: `tests/layout-direction.test.js`

**Step 1: Write the failing test**

Extend the source test to require the explicit segmented timeline constants and remove dependence on a single `COLOR_COMPARISON_TRAVEL_START`.

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/layout-direction.test.js`
Expected: FAIL with missing beat constants or stale travel shape.

**Step 3: Write minimal implementation**

Inside `applyStage`:
- compute `colorRaw`
- map it into beats
- compute `activeIndex` only for actual centered cases
- compute `comparisonTrackProgress` separately for each travel segment
- keep metadata hidden while a case is traveling
- only enable slider interactivity while a case is centered

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/layout-direction.test.js`
Expected: PASS

### Task 3: Make the first comparison panel enter physically from below

**Files:**
- Modify: `src/components/HomeReel/HomeReel.css`
- Modify: `src/components/HomeReel/HomeReel.jsx`
- Test: `tests/layout-direction.test.js`

**Step 1: Write the failing test**

Require the comparison stage base transform variables to start fully outside the viewport and stay flat:
- `--comparison-stage-y: 100dvh;`
- `--comparison-stage-scale: 1;`
- `--comparison-stage-rotate: 0deg;`

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/layout-direction.test.js`
Expected: FAIL if the CSS still allows a partial in-frame start or tilt.

**Step 3: Write minimal implementation**

Set the base comparison stage to live below the frame in CSS and let `HomeReel.jsx` drive a long vertical interpolation to center.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/layout-direction.test.js`
Expected: PASS

### Task 4: Full verification

**Files:**
- Verify only

**Step 1: Run focused test**

Run: `npm test -- tests/layout-direction.test.js`
Expected: PASS

**Step 2: Run full suite**

Run: `npm test`
Expected: PASS

**Step 3: Run lint**

Run: `npm run lint`
Expected: PASS

**Step 4: Run production build**

Run: `npm run build`
Expected: PASS

**Step 5: Commit**

```bash
git add docs/plans/2026-03-13-home-colorization-comparison-beats-plan.md tests/layout-direction.test.js src/components/HomeReel/HomeReel.jsx src/components/HomeReel/HomeReel.css
git commit -m "refactor: tighten home color comparison beats"
```
