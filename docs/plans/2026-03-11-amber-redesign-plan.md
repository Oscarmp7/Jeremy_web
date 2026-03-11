# Manzana Cuatro — Amber Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the Manzana Cuatro portfolio as a multi-page cinematic site merging Amber's structure with M4's brand identity.

**Architecture:** React Router v7 for multi-page routing with GSAP-powered page transitions. CSS custom properties for dark/light theme with cinematic curtain swap. ScrollTrigger for parallax and scroll-driven animations. All content stays centralized in siteContent.js.

**Tech Stack:** React 19, React Router 7, Vite, Tailwind 4, GSAP 3.14 (ScrollTrigger), CSS custom properties

**Design Doc:** `docs/plans/2026-03-11-amber-redesign-design.md`

---

## Task 1: Install React Router and Set Up Multi-Page Routing Shell

**Files:**
- Modify: `package.json` (add react-router dependency)
- Modify: `src/main.jsx` (wrap app in BrowserRouter)
- Modify: `src/App.jsx` (replace single-page layout with Routes)
- Create: `src/pages/HomePage.jsx`
- Create: `src/pages/ProjectsPage.jsx`
- Create: `src/pages/ProjectDetailPage.jsx`
- Create: `src/pages/StudioPage.jsx`
- Create: `src/pages/ContactPage.jsx`
- Create: `src/layouts/MainLayout.jsx`

**Step 1: Install react-router**

Run: `npm install react-router`

**Step 2: Create MainLayout with shared Nav + Footer**

```jsx
// src/layouts/MainLayout.jsx
import { Outlet } from 'react-router'
import Nav from '../components/Nav/Nav'
import Footer from '../components/Footer/Footer'

export default function MainLayout() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
```

**Step 3: Create placeholder page components**

Each page is a simple shell for now — content will be built in later tasks.

```jsx
// src/pages/HomePage.jsx
export default function HomePage() {
  return <div className="page page--home">Home</div>
}
```

```jsx
// src/pages/ProjectsPage.jsx
export default function ProjectsPage() {
  return <div className="page page--projects">Projects</div>
}
```

```jsx
// src/pages/ProjectDetailPage.jsx
import { useParams } from 'react-router'
export default function ProjectDetailPage() {
  const { slug } = useParams()
  return <div className="page page--project-detail">{slug}</div>
}
```

```jsx
// src/pages/StudioPage.jsx
export default function StudioPage() {
  return <div className="page page--studio">Studio</div>
}
```

```jsx
// src/pages/ContactPage.jsx
export default function ContactPage() {
  return <div className="page page--contact">Contact</div>
}
```

**Step 4: Rewrite main.jsx with BrowserRouter**

```jsx
// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

**Step 5: Rewrite App.jsx with Routes**

```jsx
// src/App.jsx
import { useState } from 'react'
import { Routes, Route } from 'react-router'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import StudioPage from './pages/StudioPage'
import ContactPage from './pages/ContactPage'
import Loader from './components/Loader/Loader'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      <div className={`app-shell ${loaded ? 'app-shell--ready' : ''}`}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="proyectos" element={<ProjectsPage />} />
            <Route path="proyectos/:slug" element={<ProjectDetailPage />} />
            <Route path="studio" element={<StudioPage />} />
            <Route path="contacto" element={<ContactPage />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}
```

**Step 6: Verify the app runs**

Run: `npm run dev`
Expected: App loads, shows "Home" text, can navigate to `/proyectos`, `/studio`, `/contacto` manually in URL bar.

**Step 7: Commit**

```bash
git add -A
git commit -m "feat: add React Router with multi-page routing shell"
```

---

## Task 2: Theme System (Dark/Light with CSS Custom Properties)

**Files:**
- Modify: `src/index.css` (replace hardcoded dark values with theme tokens)
- Create: `src/hooks/useTheme.js` (theme state + toggle logic)
- Create: `src/components/ThemeTransition/ThemeTransition.jsx`
- Create: `src/components/ThemeTransition/ThemeTransition.css`

**Step 1: Rewrite CSS variables in index.css for theme support**

Replace the current `:root` variable block with two theme scopes. Keep all existing variables but organize them under `[data-theme="dark"]` (default) and `[data-theme="light"]`.

```css
/* -- Theme tokens -- */
:root,
[data-theme="dark"] {
  --bg: #050505;
  --bg-elevated: #0a0a0a;
  --text: #f5f5f0;
  --text-muted: #888888;
  --text-dim: #444444;
  --accent: #2f78ff;
  --accent-hover: #4a8fff;
  --separator: #333333;
  --curtain: #050505;
  --overlay: rgba(0, 0, 0, 0.6);
}

[data-theme="light"] {
  --bg: #f5f5f0;
  --bg-elevated: #ffffff;
  --text: #0a0a0a;
  --text-muted: #666666;
  --text-dim: #aaaaaa;
  --accent: #2f78ff;
  --accent-hover: #1a5fd4;
  --separator: #dddddd;
  --curtain: #f5f5f0;
  --overlay: rgba(255, 255, 255, 0.6);
}
```

Remove the old `--surface`, `--muted`, `--line`, `--line-strong`, `--shadow-lg`, `--accent-soft` variables. Replace all usages across component CSS files with the new token names. Remove the blue radial gradient from `body` background — just use `var(--bg)`.

**Step 2: Create useTheme hook**

```js
// src/hooks/useTheme.js
import { useState, useEffect, useCallback } from 'react'

export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('m4-theme') || 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('m4-theme', theme)
  }, [theme])

  const toggle = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle }
}
```

**Step 3: Create ThemeTransition component (cinematic curtain)**

```jsx
// src/components/ThemeTransition/ThemeTransition.jsx
import { useRef, useCallback } from 'react'
import gsap from 'gsap'
import './ThemeTransition.css'

export default function ThemeTransition({ onMidpoint }) {
  const curtainRef = useRef(null)
  const animatingRef = useRef(false)

  const play = useCallback(() => {
    if (animatingRef.current) return
    animatingRef.current = true

    const tl = gsap.timeline({
      onComplete: () => { animatingRef.current = false },
    })

    tl.set(curtainRef.current, { yPercent: 100, display: 'block' })
      .to(curtainRef.current, {
        yPercent: 0,
        duration: 0.25,
        ease: 'power4.inOut',
      })
      .call(() => onMidpoint?.())
      .to(curtainRef.current, {
        yPercent: -100,
        duration: 0.25,
        ease: 'power4.inOut',
      })
      .set(curtainRef.current, { display: 'none' })
  }, [onMidpoint])

  return {
    curtain: (
      <div ref={curtainRef} className="theme-curtain" aria-hidden="true" />
    ),
    play,
  }
}
```

```css
/* src/components/ThemeTransition/ThemeTransition.css */
.theme-curtain {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: var(--curtain);
  display: none;
  will-change: transform;
  pointer-events: none;
}
```

**Step 4: Integrate theme into App.jsx**

Add `useTheme` hook and `ThemeTransition` to App. Pass `theme` and `toggle` down to Nav (or via context — keep it simple with props through MainLayout for now).

**Step 5: Verify theme toggle works**

Run: `npm run dev`
Expected: Clicking theme toggle swaps colors with curtain animation. State persists on refresh via localStorage.

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: add dark/light theme with cinematic curtain transition"
```

---

## Task 3: Page Transition System

**Files:**
- Create: `src/components/PageTransition/PageTransition.jsx`
- Create: `src/components/PageTransition/PageTransition.css`
- Modify: `src/layouts/MainLayout.jsx` (wrap Outlet with transition)
- Modify: `src/components/Nav/Nav.jsx` (use Link from react-router instead of anchor tags)

**Step 1: Create PageTransition component**

```jsx
// src/components/PageTransition/PageTransition.jsx
import { useRef, useLayoutEffect } from 'react'
import { useLocation } from 'react-router'
import gsap from 'gsap'
import './PageTransition.css'

export default function PageTransition({ children }) {
  const curtainRef = useRef(null)
  const contentRef = useRef(null)
  const location = useLocation()
  const isFirstRender = useRef(true)

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const tl = gsap.timeline()

    tl.set(curtainRef.current, { yPercent: 100, display: 'block' })
      .to(curtainRef.current, {
        yPercent: 0,
        duration: 0.25,
        ease: 'power4.inOut',
      })
      .call(() => {
        window.scrollTo(0, 0)
      })
      .to(curtainRef.current, {
        yPercent: -100,
        duration: 0.25,
        ease: 'power4.inOut',
      })
      .set(curtainRef.current, { display: 'none' })
  }, [location.pathname])

  return (
    <>
      <div ref={contentRef}>{children}</div>
      <div ref={curtainRef} className="page-curtain" aria-hidden="true" />
    </>
  )
}
```

```css
/* src/components/PageTransition/PageTransition.css */
.page-curtain {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: var(--curtain);
  display: none;
  will-change: transform;
  pointer-events: none;
}
```

**Step 2: Update MainLayout to use PageTransition**

```jsx
// src/layouts/MainLayout.jsx
import { Outlet } from 'react-router'
import Nav from '../components/Nav/Nav'
import Footer from '../components/Footer/Footer'
import PageTransition from '../components/PageTransition/PageTransition'

export default function MainLayout({ theme, toggleTheme }) {
  return (
    <>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <PageTransition>
        <main>
          <Outlet />
        </main>
        <Footer />
      </PageTransition>
    </>
  )
}
```

**Step 3: Update Nav to use React Router Link**

Replace all `<a href="#section">` links with `<Link to="/route">` from react-router. Update `siteContent.nav` array to use route paths instead of hash anchors:

```js
// Update in siteContent.js
nav: [
  { label: 'Inicio', href: '/' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Studio', href: '/studio' },
  { label: 'Contacto', href: '/contacto' },
],
```

In Nav.jsx, import `Link` from `react-router` and replace anchor tags:

```jsx
import { Link } from 'react-router'
// ...
{siteContent.nav.map(link => (
  <Link key={link.href} to={link.href} className="nav__link">
    {link.label}
  </Link>
))}
```

**Step 4: Verify page transitions work**

Run: `npm run dev`
Expected: Clicking nav links triggers curtain wipe between pages. ~500ms total. Scroll resets to top.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add cinematic page transitions with curtain wipe"
```

---

## Task 4: Redesign Global CSS — Amber Base Aesthetic

**Files:**
- Modify: `src/index.css` (full rewrite of global styles to Amber aesthetic)

**Step 1: Rewrite index.css**

This is the foundation rewrite. Key changes:
- Remove all blue radial gradients from backgrounds
- Remove glassmorphism (backdrop-blur on cards, semi-transparent backgrounds)
- Remove card shadows and glows
- Set body background to flat `var(--bg)`
- Update button styles: primary filled blue, ghost with 1px border only
- Add `.separator` utility class: `height: 1px; background: var(--separator)` with GSAP-ready width animation
- Update `.footer` styles to match Amber minimal 3-column layout
- Add `.page` base class with padding-top for nav offset
- Update selection/focus colors for both themes
- Remove the `--surface`, `--accent-soft`, `--shadow-lg` tokens entirely
- Ensure all text uses the 3-tier font system: `--font-display`, `--font-body`, `--font-hud`
- Set global `letter-spacing` on display font usage
- Add `scroll-behavior: smooth` with `scroll-padding-top: var(--nav-height)`

**Step 2: Verify clean render**

Run: `npm run dev`
Expected: Dark flat background, clean typography, no visual artifacts from old styles.

**Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: rewrite global CSS to Amber minimal aesthetic"
```

---

## Task 5: Redesign Loader

**Files:**
- Modify: `src/components/Loader/Loader.jsx` (new cinematic structure)
- Modify: `src/components/Loader/Loader.css` (new animations)

**Step 1: Rewrite Loader component**

New structure:
- Black screen, centered layout
- Logo image (IV mark) fades in
- "MANZANA CUATRO" text below with mask reveal (Bebas Neue)
- 1px line expands from 0% to 100% width below text
- On complete: vertical wipe upward using GSAP timeline
- Call `onComplete` prop when done

Use GSAP timeline instead of CSS keyframes for precise sequencing:
1. Logo fade in (0 → 1 opacity, 0.4s)
2. Text mask reveal (translateY 100% → 0%, 0.4s, stagger per line)
3. Line expand (width 0% → 100%, 0.6s)
4. Hold 0.2s
5. Entire loader slides up (yPercent 0 → -100, 0.3s)
6. Fire onComplete

Total duration: ~1.5s

**Step 2: Verify loader plays and reveals home page**

Run: `npm run dev`
Expected: Cinematic loader sequence, then home page revealed.

**Step 3: Commit**

```bash
git add src/components/Loader/
git commit -m "feat: redesign loader with cinematic reveal sequence"
```

---

## Task 6: Redesign Navbar

**Files:**
- Modify: `src/components/Nav/Nav.jsx` (new structure with theme toggle + router links)
- Modify: `src/components/Nav/Nav.css` (Amber-style nav)

**Step 1: Rewrite Nav component**

New structure:
- Left: IV logo mark + "MANZANA CUATRO" in Bebas Neue, letter-spaced
- Center: Page links using `<Link>` (Inicio, Proyectos, Studio, Contacto) — Inter uppercase small
- Right: Theme toggle ("Dark"/"Light" in Space Mono) + WhatsApp CTA button (accent blue)
- Bottom border: 1px separator
- Scroll state: backdrop-blur + semi-transparent `var(--bg)` with 0.85 opacity
- Active route: highlight current page link using `useLocation()` from react-router

Props: `theme` (string), `toggleTheme` (function)

**Step 2: Rewrite Nav.css for Amber style**

- Transparent default, blurred on scroll
- Minimal spacing, elegant alignment
- Mobile (< 768px): hamburger → fullscreen overlay with Bebas Neue large links, stagger fade-in with GSAP
- Active link: `var(--text)` color, inactive: `var(--text-muted)`

**Step 3: Verify nav works across pages**

Run: `npm run dev`
Expected: Nav renders correctly, links navigate with page transitions, theme toggle works, active state shows, mobile menu works.

**Step 4: Commit**

```bash
git add src/components/Nav/
git commit -m "feat: redesign nav with Amber aesthetic and route-aware links"
```

---

## Task 7: Build Home Page — Hero Section

**Files:**
- Modify: `src/components/Hero/Hero.jsx` (full rewrite for Amber-style hero)
- Modify: `src/components/Hero/Hero.css` (new styles)
- Modify: `src/pages/HomePage.jsx` (compose hero + marquee + projects preview)

**Step 1: Rewrite Hero component**

New Amber-style hero:
- Full viewport height (`100vh`)
- Background: first portfolio image with `object-fit: cover`, dark overlay (`bg-black/40`)
- Parallax: GSAP ScrollTrigger on background image, `yPercent: 0 → 15`, `scrub: true`
- Title: "IMPACTO VISUAL / CON VISIÓN / DE MARCA" — Bebas Neue, very large (`clamp(3rem, 10vw, 8rem)`), mask reveal with stagger on load
- Subtitle: "Estudio de producción audiovisual — Santo Domingo, RD" — Inter, fade-in with 0.3s delay after title
- Bottom left: Two CTAs — `<Link to="/proyectos">` (filled blue) + `<Link to="/contacto">` (ghost outline)
- Bottom right: "© Manzana Cuatro 2026" — Space Mono, small

**Responsive:**
- Mobile: title scales to `clamp(2.5rem, 14vw, 4rem)`, CTAs stack vertically, copyright hidden
- Tablet: CTAs side by side, slightly smaller title

**Step 2: Verify hero renders with parallax**

Run: `npm run dev`
Expected: Fullscreen hero with background image, text reveals on load, parallax on scroll.

**Step 3: Commit**

```bash
git add src/components/Hero/ src/pages/HomePage.jsx
git commit -m "feat: build Amber-style fullscreen hero with parallax"
```

---

## Task 8: Build Marquee Component

**Files:**
- Create: `src/components/Marquee/Marquee.jsx`
- Create: `src/components/Marquee/Marquee.css`

**Step 1: Build Marquee component**

Infinite horizontal ticker of client names:
- 1px separator line above and below
- Client names in Bebas Neue, uppercase, letter-spaced, `var(--text-muted)`
- Duplicated content in DOM for seamless loop
- CSS animation: `translateX(0) → translateX(-50%)` infinite linear
- Speed: ~30s per cycle on desktop, ~20s on mobile (smaller content)
- Separator lines animate from 0% → 100% width on scroll enter (GSAP ScrollTrigger)

```jsx
const clients = ['La Bodega', 'Shibuya', 'Changan', 'Farma Extra', 'Porsche Center']
```

**Responsive:**
- Font size scales with viewport
- Speed adjusts for readability on small screens

**Step 2: Add Marquee to HomePage**

```jsx
// src/pages/HomePage.jsx
import Hero from '../components/Hero/Hero'
import Marquee from '../components/Marquee/Marquee'

export default function HomePage({ ready }) {
  return (
    <div className="page page--home">
      <Hero ready={ready} />
      <Marquee />
    </div>
  )
}
```

**Step 3: Verify marquee scrolls infinitely**

Run: `npm run dev`
Expected: Smooth infinite ticker below hero with separator lines.

**Step 4: Commit**

```bash
git add src/components/Marquee/ src/pages/HomePage.jsx
git commit -m "feat: add infinite client marquee ticker"
```

---

## Task 9: Build Projects Preview (Home) + Projects Page

**Files:**
- Create: `src/components/ProjectsPreview/ProjectsPreview.jsx`
- Create: `src/components/ProjectsPreview/ProjectsPreview.css`
- Create: `src/components/ProjectShowcase/ProjectShowcase.jsx`
- Create: `src/components/ProjectShowcase/ProjectShowcase.css`
- Modify: `src/pages/HomePage.jsx` (add preview)
- Modify: `src/pages/ProjectsPage.jsx` (add full showcase)

**Step 1: Build ProjectsPreview for Home page**

Shows 3 featured projects as large cards:
- Each card: poster image with `overflow: hidden`, title overlay (Bebas Neue), category + year (Space Mono)
- Hover: subtle `scale(1.02)` on image + parallax shift within container
- Cards link to `/proyectos/:slug`
- Below cards: "Ver todos los proyectos →" link to `/proyectos`
- Stagger fade-in on scroll with GSAP

**Responsive:**
- Desktop: 3 columns
- Tablet: 2 columns (show 2 projects)
- Mobile: 1 column (show 2 projects, stacked)

**Step 2: Build ProjectShowcase for Projects page**

Two synchronized views:

**View A — Visual panel (left, 60% on desktop):**
- Large card showing active project poster
- Left/right arrow navigation (styled minimal, accent on hover)
- Image has parallax within `overflow: hidden` container
- Transition between projects: crossfade opacity (0.3s)

**View B — Typographic list (right, 40% on desktop):**
- 5 project titles in Bebas Neue, large
- Year + category in Space Mono below each
- Active: `var(--text)`, inactive: `var(--text-dim)`
- Hover on title → updates active project in View A
- Click → navigates to `/proyectos/:slug`

State: `const [activeIndex, setActiveIndex] = useState(0)`

Both views share `activeIndex`. Arrow navigation and hover/click on list items both update it.

**Responsive:**
- Mobile: list becomes horizontal scroll tabs on top, card below full-width. Swipe gestures optional (nice-to-have).
- Tablet: 50/50 split

**Step 3: Wire into pages**

Add ProjectsPreview to HomePage below Marquee.
Add ProjectShowcase to ProjectsPage.

**Step 4: Verify synchronized views work**

Run: `npm run dev`
Expected: Home shows 3 project cards. `/proyectos` shows synced carousel + list.

**Step 5: Commit**

```bash
git add src/components/ProjectsPreview/ src/components/ProjectShowcase/ src/pages/
git commit -m "feat: build project preview cards and synchronized showcase"
```

---

## Task 10: Build Project Detail Page

**Files:**
- Modify: `src/pages/ProjectDetailPage.jsx` (full page build)
- Create: `src/pages/ProjectDetailPage.css`

**Step 1: Build project detail page**

- Look up project from `showcaseProjects` by `slug` param
- If not found: show simple "Proyecto no encontrado" + link back
- Hero: full-width project poster with parallax, dark overlay
- Title (Bebas Neue, large) + client + year + category (Space Mono)
- 1px separator
- Scope: horizontal list of service tags (pills with border)
- Process: numbered list of detail steps, stagger reveal on scroll
- 1px separator
- CTA: "Solicita una cotización" → WhatsApp link (filled blue button)
- Navigation: "← Anterior" / "Siguiente →" links to adjacent project slugs (wrap around)

**Responsive:**
- Mobile: all content stacks, full-width image, smaller title
- Tags wrap naturally

**Step 2: Verify detail pages render for each project**

Run: `npm run dev`
Navigate to each `/proyectos/:slug` route.
Expected: Each project renders with correct data, navigation links work.

**Step 3: Commit**

```bash
git add src/pages/ProjectDetailPage.*
git commit -m "feat: build project detail page with parallax hero"
```

---

## Task 11: Build Studio Page (Manifesto + Services + Stats)

**Files:**
- Modify: `src/pages/StudioPage.jsx` (full page build)
- Create: `src/pages/StudioPage.css`

**Step 1: Build manifesto section**

- Large text centered: "PASION POR ELEVAR MARCAS A TRAVES DE LOS AUDIOVISUALES" (Bebas Neue or Inter bold, `clamp(1.5rem, 4vw, 3.5rem)`)
- Word-by-word reveal: each word starts at `opacity: 0.15`, transitions to `1` as scroll position crosses it
- Implementation: split text into `<span>` per word, use GSAP ScrollTrigger with `scrub: true` and stagger to animate opacity
- Inverse parallax: text container moves at `0.85x` scroll speed

**Step 2: Build services section**

- 1px separator above
- Two columns of service names, text only (no cards, no icons)
- Services: Produccion Audiovisual, Colorizacion, Filmacion, Fotografia, Creacion de Contenido
- Stagger fade-in on scroll (~50ms per item)
- Inter font, `var(--text)` color

**Step 3: Build stats section**

- 1px separator above
- Three numbers side by side: "10 Anios", "300 Proyectos", "1 Pais"
- Bebas Neue for numbers (large), Inter for labels (small, muted)
- Counter animation: `gsap.fromTo()` on textContent from 0 to target, 1.5s duration, triggered on scroll enter

**Step 4: Build about content**

- Studio image with vertical parallax in frame (`overflow: hidden`, image moves on scroll)
- Bio text alongside
- Location: "Santo Domingo, RD"

**Responsive:**
- Mobile: single column throughout, reduced parallax intensity
- Stats: stack to single column or 3-across with smaller numbers

**Step 5: Verify all animations fire on scroll**

Run: `npm run dev`
Navigate to `/studio`
Expected: Word reveal, service stagger, stat counters all trigger correctly.

**Step 6: Commit**

```bash
git add src/pages/StudioPage.*
git commit -m "feat: build studio page with word-reveal manifesto and services"
```

---

## Task 12: Build Contact Page

**Files:**
- Modify: `src/pages/ContactPage.jsx` (full page build)
- Create: `src/pages/ContactPage.css`

**Step 1: Build contact page**

Structure:
- Large headline: "COMIENZA TU HISTORIA" (Bebas Neue, mask reveal on load)
- Subtitle text (Inter, fade-in)
- Primary CTA: "Escribenos por WhatsApp →" (filled blue button, hover fill animation L→R)
  - Hover effect: pseudo-element slides from left with `scaleX(0) → scaleX(1)`
- 1px separator
- Contact grid (2x2): WhatsApp, Email, Instagram, Domain
  - Each card: icon/label + value, minimal border, `var(--bg-elevated)` background
- Notes row: "Solo espanol · Respuesta directa · Enfoque en RD" (Space Mono, muted)

**Responsive:**
- Mobile: single column, cards stack, CTA full width
- Tablet: 2-column grid maintained

**Step 2: Verify contact page renders**

Run: `npm run dev`
Navigate to `/contacto`
Expected: Clean layout, WhatsApp link works, hover animations work.

**Step 3: Commit**

```bash
git add src/pages/ContactPage.*
git commit -m "feat: build contact page with CTA and contact grid"
```

---

## Task 13: Redesign Footer

**Files:**
- Modify: `src/components/Footer/Footer.jsx` (new structure)
- Move footer styles from `src/index.css` to `src/components/Footer/Footer.css` (create new file)

**Step 1: Rewrite Footer**

Amber-style minimal footer on all pages:
- 1px separator line at top
- Three columns: Brand (IV logo + "Manzana Cuatro" + email) | Nav links (Inicio, Proyectos, Studio, Contacto) | Social (Instagram, WhatsApp) + "(c) Manzana Cuatro 2026"
- All text in Inter, `var(--text-muted)`
- Links have hover opacity transition

**Responsive:**
- Mobile: single column, centered text
- Tablet: 2 columns (brand + nav combined, social separate)

**Step 2: Commit**

```bash
git add src/components/Footer/ src/index.css
git commit -m "feat: redesign footer with Amber minimal 3-column layout"
```

---

## Task 14: Add Home Page CTA Section

**Files:**
- Modify: `src/pages/HomePage.jsx` (add CTA section between projects preview and footer)

**Step 1: Add CTA section to home page**

Between ProjectsPreview and the footer, add a simple CTA section:
- 1px separator
- "COMIENZA TU HISTORIA" in Bebas Neue, large, centered
- `<Link to="/contacto">` styled as filled blue button: "Hablemos →"
- Fade-in on scroll

This mirrors the footer CTA from Amber but lives in the page content.

**Step 2: Commit**

```bash
git add src/pages/HomePage.jsx
git commit -m "feat: add CTA section to home page"
```

---

## Task 15: Responsive Polish Pass

**Files:**
- Modify: All component CSS files
- Modify: `src/index.css`

**Step 1: Audit every component at 5 breakpoints**

Test at: 375px (iPhone SE), 430px (iPhone Pro Max), 768px (iPad), 1024px (iPad landscape), 1440px (desktop), 1920px+ (ultrawide)

Check for:
- Touch targets >= 44px on all interactive elements
- No horizontal overflow at any width
- Text readability (min 16px body text on mobile)
- Image aspect ratios maintained
- Navigation usable on all sizes
- CTA buttons visible and tappable
- Parallax intensity reduced on mobile (use `ScrollTrigger.matchMedia`)
- Video/image placeholders show poster on mobile (no autoplay)

**Step 2: Fix all responsive issues found**

Apply mobile-first adjustments:
- Hero title: `clamp(2.5rem, 12vw, 8rem)`
- Nav: hamburger at `< 768px`
- Project showcase: stack at `< 1024px`
- Services: 1 column at `< 640px`
- Stats: adapt at `< 640px`
- Footer: 1 column at `< 768px`
- Reduce parallax multipliers on mobile via `ScrollTrigger.matchMedia`

**Step 3: Commit**

```bash
git add -A
git commit -m "fix: responsive polish pass across all breakpoints"
```

---

## Task 16: Scroll-Triggered Separator Lines

**Files:**
- Create: `src/components/Separator/Separator.jsx`

**Step 1: Build reusable Separator component**

```jsx
// src/components/Separator/Separator.jsx
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Separator() {
  const ref = useRef(null)

  useEffect(() => {
    gsap.fromTo(ref.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 90%',
          once: true,
        },
      }
    )
  }, [])

  return (
    <div
      ref={ref}
      style={{
        height: '1px',
        background: 'var(--separator)',
        transformOrigin: 'center',
        width: '100%',
      }}
      aria-hidden="true"
    />
  )
}
```

**Step 2: Add Separator between all major sections across all pages**

Replace any existing `<hr>` or divider elements with `<Separator />`.

**Step 3: Commit**

```bash
git add src/components/Separator/ src/pages/
git commit -m "feat: add scroll-triggered animated separator lines"
```

---

## Task 17: Clean Up Old Components and Dead Code

**Files:**
- Delete: `src/components/Work/CaseCard.jsx`
- Delete: `src/components/Work/CaseModal.jsx`
- Delete: `src/components/Work/Work.jsx`
- Delete: `src/components/Work/Work.css`
- Delete: `src/components/About/About.jsx`
- Delete: `src/components/About/About.css`
- Delete: `src/components/Services/Services.jsx`
- Delete: `src/components/Services/Services.css`
- Delete: `src/components/Contact/Contact.jsx`
- Delete: `src/components/Contact/Contact.css`
- Modify: `src/data/siteContent.js` (update nav hrefs, remove unused fields if any)
- Update favicon.svg to use Manzana Cuatro branding (blue instead of orange "JA")

**Step 1: Delete all old single-page section components**

These are replaced by the new page components and their embedded sections.

**Step 2: Verify no import errors**

Run: `npm run dev`
Expected: No errors, all pages render correctly.

**Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove old single-page components replaced by multi-page architecture"
```

---

## Task 18: Final Integration Test

**Files:** None (testing only)

**Step 1: Full user flow test**

1. Cold load → Loader plays → Home revealed
2. Scroll Home: hero parallax, marquee scrolls, projects preview visible, CTA section
3. Click "Proyectos" → page transition → ProjectsPage loads
4. Hover project titles → cards sync
5. Click project → transition → ProjectDetailPage with correct data
6. Navigate next/previous projects
7. Click "Studio" → transition → word-reveal manifest, services stagger, stat counters
8. Click "Contacto" → transition → CTA + contact info
9. Toggle dark/light theme → curtain transition, all pages correct in both themes
10. Test mobile: hamburger menu, touch navigation, responsive layouts
11. Test browser back/forward → transitions play correctly

**Step 2: Fix any issues found**

**Step 3: Final commit**

```bash
git add -A
git commit -m "fix: final integration fixes from full user flow test"
```

---

## Execution Order Summary

| Task | Description | Dependencies |
|------|-------------|-------------|
| 1 | React Router + page shell | None |
| 2 | Theme system (dark/light) | None |
| 3 | Page transitions | Task 1 |
| 4 | Global CSS rewrite | Task 2 |
| 5 | Loader redesign | Task 4 |
| 6 | Navbar redesign | Tasks 1, 2, 3 |
| 7 | Hero section | Task 4 |
| 8 | Marquee | Task 4 |
| 9 | Projects preview + showcase | Tasks 7, 8 |
| 10 | Project detail page | Task 9 |
| 11 | Studio page | Task 4 |
| 12 | Contact page | Task 4 |
| 13 | Footer redesign | Task 4 |
| 14 | Home CTA section | Task 9 |
| 15 | Responsive polish | Tasks 5-14 |
| 16 | Separator lines | Task 4 |
| 17 | Clean up old code | Tasks 5-14 |
| 18 | Final integration test | All |

**Parallelizable groups:**
- Tasks 1 + 2 (no dependencies, can run in parallel)
- Tasks 7 + 8 + 11 + 12 + 13 (all depend only on Task 4)
- Tasks 15 + 16 + 17 (all post-build polish)
