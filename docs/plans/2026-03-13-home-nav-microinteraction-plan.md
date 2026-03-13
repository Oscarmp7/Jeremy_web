# Home Nav Microinteraction Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the desktop navbar strictly symmetric and add a refined shared text-swap interaction for desktop navlinks plus the home closing CTA.

**Architecture:** Introduce one reusable text-layer interaction component built with React plus project-native CSS, then wire it into the navbar and home closing CTA. Keep motion deterministic, keyboard-accessible, and reduced-motion safe.

**Tech Stack:** React, React Router, CSS, existing reduced-motion hook, node test suite, Vite

---

### Task 1: Add regression tests for the new interaction architecture

**Files:**
- Modify: `tests/nav-layout.test.js`
- Modify: `tests/layout-direction.test.js`

**Step 1: Write the failing test**

- Assert that desktop navbar no longer offsets brand/link alignment with `start/center/end` layout logic.
- Assert that nav source uses a shared interactive text component for desktop nav labels.
- Assert that the home closing CTA uses the same shared component or pattern instead of a plain text anchor.

**Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL showing missing component usage and old navbar alignment assumptions.

**Step 3: Write minimal implementation**

- No implementation yet; this task only establishes the regression target.

**Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS after later tasks are complete.

**Step 5: Commit**

```bash
git add tests/nav-layout.test.js tests/layout-direction.test.js
git commit -m "test: cover home nav microinteraction architecture"
```

### Task 2: Build the shared text interaction component

**Files:**
- Create: `src/components/TextSwap/TextSwap.jsx`
- Create: `src/components/TextSwap/TextSwap.css`
- Modify: `src/hooks/usePrefersReducedMotion.js` (only if API support is needed)

**Step 1: Write the failing test**

- Extend architecture assertions to require the new component import/usage.

**Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL because the component does not yet exist.

**Step 3: Write minimal implementation**

- Build a text component with duplicated decorative layer.
- Support deterministic stagger via CSS custom properties.
- Support variants for nav and hero-scale usage.
- Preserve a single accessible text reading.

**Step 4: Run test to verify it passes**

Run: `npm test`
Expected: Relevant assertions pass.

**Step 5: Commit**

```bash
git add src/components/TextSwap/TextSwap.jsx src/components/TextSwap/TextSwap.css
git commit -m "feat: add reusable text swap interaction"
```

### Task 3: Make the desktop navbar strictly symmetric

**Files:**
- Modify: `src/components/Nav/Nav.jsx`
- Modify: `src/components/Nav/Nav.css`
- Test: `tests/nav-layout.test.js`

**Step 1: Write the failing test**

- Assert that all four desktop slots use the same centering behavior.

**Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL because the current brand and last item use custom alignment.

**Step 3: Write minimal implementation**

- Center all desktop nav items inside equal columns.
- Keep mobile behavior untouched.
- Replace raw nav label text with the shared text interaction.

**Step 4: Run test to verify it passes**

Run: `npm test`
Expected: Navbar assertions pass.

**Step 5: Commit**

```bash
git add src/components/Nav/Nav.jsx src/components/Nav/Nav.css tests/nav-layout.test.js
git commit -m "feat: center desktop navbar and add nav text interaction"
```

### Task 4: Apply the interaction to the home closing CTA

**Files:**
- Modify: `src/components/HomeEndFrame/HomeEndFrame.jsx`
- Modify: `src/components/HomeEndFrame/HomeEndFrame.css`
- Test: `tests/layout-direction.test.js`

**Step 1: Write the failing test**

- Assert that `Comienza tu historia` is rendered with the shared interaction pattern.

**Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL because the CTA is currently plain text.

**Step 3: Write minimal implementation**

- Replace the plain title text with the shared interaction component.
- Tune spacing, line decoration, and motion scale for the larger CTA.

**Step 4: Run test to verify it passes**

Run: `npm test`
Expected: CTA-related assertions pass.

**Step 5: Commit**

```bash
git add src/components/HomeEndFrame/HomeEndFrame.jsx src/components/HomeEndFrame/HomeEndFrame.css tests/layout-direction.test.js
git commit -m "feat: add refined home closing CTA interaction"
```

### Task 5: Verify motion, accessibility, and production build

**Files:**
- Verify only: existing touched files

**Step 1: Run full tests**

Run: `npm test`
Expected: PASS

**Step 2: Run lint**

Run: `npm run lint`
Expected: PASS

**Step 3: Run production build**

Run: `npm run build`
Expected: PASS

**Step 4: Manual review checklist**

- Desktop navbar reads as symmetric.
- Hover and focus-visible interactions feel premium and restrained.
- CTA remains legible at large sizes.
- Reduced-motion users do not receive disruptive letter motion.

**Step 5: Commit**

```bash
git add .
git commit -m "feat: refine home nav and CTA text interactions"
```
