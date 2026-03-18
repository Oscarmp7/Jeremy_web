# Core Optimization Design

**Context**

The site already has a strong visual direction, stable modular CSS, and a clean content-driven structure. The weak points are architectural: route-level SEO is minimal, the app eagerly loads every page, several animations do not respect reduced-motion preferences, the mobile menu is not fully accessible, and there is dead or unreachable code left from earlier iterations.

**Goals**

- Improve route-level SEO without changing the current visual language.
- Reduce the initial JavaScript cost by splitting routes and trimming dead code.
- Improve accessibility for keyboard users and reduced-motion users.
- Tighten image rendering and remove avoidable redundant work.
- Preserve the current brand feel and existing CSS architecture unless a change is clearly lower-risk.

**Approach**

1. Keep the current CSS module/BEM approach as the primary styling system.
2. Add a small route metadata layer that updates `document.title`, description, canonical, OG/Twitter tags, and adds a 404 route.
3. Convert route imports to `React.lazy` + `Suspense` to reduce the initial bundle.
4. Add a reduced-motion hook and gate JS-driven motion where needed.
5. Improve the mobile menu semantics and keyboard handling without introducing a dependency.
6. Remove clearly dead components and unreachable branches only where project usage is already proven absent.

**Tradeoffs Considered**

**Option A: Full Next.js or SSR migration**

- Pros: strongest SEO foundation, server-rendered metadata.
- Cons: large migration, high risk, unnecessary for this pass.

**Option B: Conservative SPA hardening**

- Pros: improves SEO/performance/accessibility quickly with low break risk.
- Cons: still not as strong as full SSR for search indexing.

**Option C: Tailwind-first rewrite**

- Pros: faster future iteration if the project fully commits to it.
- Cons: high regression risk because the app is already organized around hand-authored CSS.

**Recommendation**

Option B. It addresses the highest-value problems with the lowest regression risk and keeps the existing visual identity intact.

**Implementation Areas**

- `src/App.jsx`: lazy routes, suspense shell, route metadata wiring, 404 route.
- `src/layouts/MainLayout.jsx`: skip link and main landmark refinement.
- New metadata utility/component for route-level head management.
- `src/components/Nav/*`: focus trap, escape close, route-close behavior, reduced motion guard.
- `src/components/PageTransition/*` and `src/components/ThemeTransition/*`: reduced-motion handling.
- `src/components/HomeReel/*`, `src/pages/*`: reduced-motion and image loading improvements.
- `index.html` and `public/*`: stronger base metadata, `robots.txt`, `sitemap.xml`.
- Cleanup of dead components and unreachable footer branch.

**Testing Strategy**

- Add unit tests for route metadata generation.
- Add structural tests for lazy routes, 404 handling, skip link, and unreachable-code cleanup.
- Re-run the existing test suite, lint, and production build.
