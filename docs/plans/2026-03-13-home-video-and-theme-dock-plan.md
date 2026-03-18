# Home Video And Theme Dock Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add silent looping placeholder videos to the home reel and keep the theme dock visually fixed outside the scrolled nav bar on interior pages.

**Architecture:** Extend the existing content model with optional video URLs, update the reel media layer to prefer video while preserving poster fallback and reduced-motion behavior, and structurally separate the theme dock from the nav header so scroll-state styling cannot visually merge them.

**Tech Stack:** React 19, React Router 7, modular CSS, GSAP, Node test runner, ESLint

---

### Task 1: Add failing structural tests

**Files:**
- Modify: `tests/layout-direction.test.js`
- Modify: `tests/nav-layout.test.js`
- Modify: `tests/site-content.test.js`

**Step 1: Write the failing test**

- Assert the home reel can render `video`.
- Assert project content contains placeholder video fields.
- Assert the theme dock is rendered outside the header shell instead of inside it.

**Step 2: Run test to verify it fails**

Run: `npm test`

Expected: failures for missing video fields and stale nav structure.

### Task 2: Implement reel video placeholders

**Files:**
- Modify: `src/data/siteContent.js`
- Modify: `src/components/HomeReel/HomeReel.jsx`
- Modify: `src/components/HomeReel/HomeReel.css`

**Step 1: Add minimal implementation**

- Add placeholder video URLs to the showcase projects used by the reel.
- Render `video` in the media layer when available.
- Keep poster fallback, muted loop autoplay, inline playback, and reduced-motion image behavior.

### Task 3: Fix theme dock positioning

**Files:**
- Modify: `src/components/Nav/Nav.jsx`
- Modify: `src/components/Nav/Nav.css`

**Step 1: Add minimal implementation**

- Render the theme dock as a sibling to the header rather than a child inside the scrolling nav shell.
- Keep mobile behavior unchanged.

### Task 4: Verify

**Step 1: Run tests**

Run: `npm test`

**Step 2: Run linter**

Run: `npm run lint`

**Step 3: Run production build**

Run: `npm run build`
