# Design Doc — Manzana Cuatro Redesign (Amber × M4 Merge)

**Date:** 2026-03-11
**Approach:** Enfoque A — Amber structure, Manzana Cuatro identity
**Stack:** React 19 + Vite + Tailwind 4 + GSAP (ScrollTrigger) + React Router

---

## 1. Visual System

### Palette

| Token              | Dark (default)  | Light           |
|--------------------|-----------------|-----------------|
| `--bg`             | `#050505`       | `#f5f5f0`       |
| `--text`           | `#f5f5f0`       | `#0a0a0a`       |
| `--text-muted`     | `#888888`       | `#666666`       |
| `--text-dim`       | `#444444`       | `#aaaaaa`       |
| `--accent`         | `#2f78ff`       | `#2f78ff`       |
| `--separator`      | `#333333`       | `#dddddd`       |
| `--curtain`        | `#050505`       | `#f5f5f0`       |

No gradients, no glows, no glassmorphism. Color comes from portfolio imagery.

### Typography

| Role       | Font         | Usage                                      |
|------------|-------------|---------------------------------------------|
| Display    | Bebas Neue   | Headlines, project titles, CTA text         |
| Body       | Inter        | Paragraphs, UI text, nav links              |
| Mono       | Space Mono   | Year, category, copyright, meta, theme toggle|

### Unifying Element

1px horizontal line (`--separator` color) between all major sections. Lines animate from 0% to 100% width on scroll enter.

---

## 2. Theme System

### Toggle
Minimal toggle in navbar — "Light" / "Dark" label in Space Mono.

### Cinematic Transition
On toggle: a curtain (`--curtain` color) sweeps from bottom to top covering the viewport, CSS variables swap at the midpoint, curtain exits upward. Duration: **~500ms**, easing `power4.inOut`. Navbar stays visible throughout.

---

## 3. Animation System (GSAP + ScrollTrigger)

### Page Load
- Text mask reveal: `overflow: hidden` container, text `translateY(100%)` → `0` with stagger
- Fade-in: opacity 0 → 1 with delay sequencing

### Scroll-Triggered
- **Parallax hero:** background moves at `0.6x` scroll speed
- **Parallax project images:** `0.85x` within `overflow: hidden` containers
- **Parallax manifesto text:** inverse parallax, moves slower than scroll
- **About image:** vertical parallax within frame
- **Word reveal:** each word transitions from `opacity: 0.15` → `1` as viewport center crosses it
- **Stagger fade-in:** list items enter with ~50ms stagger delay
- **Line draw:** separator lines expand from center, 0% → 100% width

### Easing
All animations use `power3.out` for entrances, `power4.inOut` for transitions.

---

## 4. Page Transitions (React Router)

### Mechanism
A `<PageTransition>` wrapper component with a GSAP timeline:
1. User clicks nav link → route change is intercepted
2. Curtain div enters from bottom → covers viewport (~250ms)
3. Route swaps at full coverage (invisible to user)
4. Curtain exits upward → reveals new page (~250ms)
5. Total duration: **~500ms**

### Rules
- Navbar remains visible and interactive during transition
- Loader only plays on initial site load, never between pages
- Scroll resets to top on route change
- Browser back/forward triggers same transition

---

## 5. Page Structure

### Routes

| Route               | Page              | Sections                                    |
|----------------------|-------------------|---------------------------------------------|
| `/`                  | Home              | Hero → Marquee → Projects Preview → CTA     |
| `/proyectos`         | Projects          | Full project carousel + typographic list     |
| `/proyectos/:slug`   | Project Detail    | Hero image + scope + process + CTA           |
| `/studio`            | Studio            | Manifesto + Services + Stats                 |
| `/contacto`          | Contact           | CTA + contact info + WhatsApp                |

### Shared Layout
- Navbar (all pages)
- Footer (all pages)
- Page transition curtain (all routes)

---

## 6. Sections — Detailed Design

### 6.1 Loader (initial load only)

- Black screen, logo (IV mark) fades in centered
- "MANZANA CUATRO" appears below with mask reveal (Bebas Neue)
- 1px line expands 0% → 100% below name (progress indicator)
- Duration: ~1.5s
- Exit: vertical wipe upward reveals Home hero

### 6.2 Navbar

- `position: fixed`, transparent over hero
- **Left:** IV logo mark + "MANZANA CUATRO" (Bebas Neue, letter-spaced)
- **Center:** Inicio · Proyectos · Studio · Contacto (Inter, uppercase, small)
- **Right:** Theme toggle + "WhatsApp" CTA button (accent blue)
- **Scroll state:** backdrop-blur + semi-transparent bg
- **Bottom border:** 1px separator line
- **Mobile (< 768px):** Hamburger → fullscreen overlay, links in Bebas Neue large with stagger fade-in, WhatsApp CTA at bottom

### 6.3 Home — Hero

- Full viewport height (`100vh`), video/image background with parallax `0.6x`
- Dark overlay for text legibility (`bg-black/40`)
- **Title:** 2-3 lines in Bebas Neue, very large (~8-12vw responsive), mask reveal stagger
  - "IMPACTO VISUAL / CON VISIÓN / DE MARCA"
- **Subtitle:** "Estudio de producción audiovisual — Santo Domingo, RD" (Inter, fade-in with delay)
- **Bottom left:** Two CTAs — "Ver proyectos" (filled blue) + "Empezar proyecto →" (outline/ghost)
- **Bottom right:** "© Manzana Cuatro 2026" (Space Mono, small)

### 6.4 Home — Marquee

- 1px separator line top and bottom
- Infinite horizontal ticker, slow constant speed
- Client names in Bebas Neue, uppercase, letter-spaced, `--text-muted` color
- Content: "LA BODEGA · SHIBUYA · CHANGAN · FARMA EXTRA · PORSCHE CENTER"
- Duplicated in DOM for seamless loop
- Designed for easy swap to SVG logos later

### 6.5 Home — Projects Preview

- Shows 3 featured projects as large cards
- Each card: poster image with title overlay (Bebas Neue) + category (Space Mono)
- Hover: subtle scale + image parallax shift
- "Ver todos los proyectos →" link at bottom
- Links to `/proyectos`

### 6.6 Projects Page — Full Showcase

**Two synchronized views:**

**View A — Visual cards (left, ~60% width):**
- Large card showing active project's poster/video
- Left/right arrow navigation
- Video plays on hover (when available)
- Parallax on image within card (overflow hidden)

**View B — Typographic list (right, ~40%):**
- All 5 project titles in Bebas Neue, large
- Year + category below each in Space Mono
- Active project: `--text` color; inactive: `--text-dim`
- Hover on title → activates corresponding card
- Smooth opacity + translateY transition

**Sync:** Shared state — navigating either view updates the other.

**Mobile:** Stacks vertically — typographic list on top, card below. Swipe gestures on card.

### 6.7 Project Detail Page (`/proyectos/:slug`)

- Hero: full-width project image with parallax
- Title (Bebas Neue) + client + year + category (Space Mono)
- Scope: horizontal list of service tags
- Process: numbered steps with stagger reveal
- CTA: "Solicita una cotización" → WhatsApp link
- Navigation: "← Anterior" / "Siguiente →" links to adjacent projects

### 6.8 Studio Page

**Manifesto section:**
- Large text, centered (Bebas Neue or Inter bold)
- "PASIÓN POR ELEVAR MARCAS A TRAVÉS DE LOS AUDIOVISUALES"
- Word-by-word reveal: each word `opacity: 0.15` → `1` on scroll
- Inverse parallax (text scrolls slower)

**Services section:**
- Two columns, text only (no cards, no icons)
- Producción Audiovisual · Colorización · Filmación · Fotografía · Creación de Contenido
- Stagger fade-in on scroll (~50ms per item)

**Stats section:**
- Three numbers: 10 Años · 300 Proyectos · 1 País
- Counter animation on scroll enter
- Bebas Neue for numbers, Inter for labels

**About content:**
- Studio image with vertical parallax in frame
- Bio text alongside
- Location: Santo Domingo, RD

### 6.9 Contact Page

- Large CTA: "COMIENZA TU HISTORIA" (Bebas Neue)
- "Escríbenos por WhatsApp →" button (filled blue, hover fill animation L→R)
- Contact grid: WhatsApp, Email (info@manzanacuatro.com), Instagram (@manzanacuatro), Domain
- Notes: "Solo español · Respuesta directa · Enfoque en RD"

### 6.10 Footer (all pages)

- 1px separator line
- Three columns: Brand (logo + tagline) | Navigation links | Social + copyright
- All in Inter/Space Mono, `--text-muted`
- Minimal, consistent across all pages

---

## 7. Responsive Strategy

### Breakpoints

| Name     | Width        | Target                              |
|----------|-------------|---------------------------------------|
| `mobile` | < 640px      | Phones portrait                      |
| `tablet` | 640–1024px   | Tablets, phones landscape            |
| `desktop`| 1024–1440px  | Standard desktop                     |
| `wide`   | > 1440px     | Ultrawide, large monitors            |

### Mobile-First Principles

- Base styles target mobile, scale up via `min-width` media queries
- Touch targets: minimum 44px tap areas on all interactive elements
- No hover-dependent functionality — all hover effects are enhancements, not requirements
- Hamburger menu with fullscreen overlay replaces inline nav
- Single-column layouts that expand to multi-column at breakpoints

### Key Responsive Adaptations

**Hero:**
- Mobile: title scales from `8vw` desktop to `12vw`, CTAs stack vertically, copyright hidden
- Tablet: 2-column CTA layout, reduced title size

**Projects carousel:**
- Mobile: stacks vertically — typographic list becomes horizontal scroll tabs, card takes full width, swipe gestures
- Tablet: side-by-side but 50/50 split instead of 60/40

**Marquee:**
- Speed adjusts: slower on mobile for readability
- Font size scales down proportionally

**Manifesto:**
- Mobile: word-reveal still works, font size reduces, single centered column
- Parallax intensity reduces on mobile (performance)

**Footer:**
- Mobile: single column, stacked
- Tablet: 2 columns

**Services:**
- Mobile: single column
- Desktop: 2 columns

### Navigation (In-Page)

- Smooth scroll with offset for fixed navbar height (`scroll-margin-top: var(--nav-height)`)
- On Home page: sections have `id` attributes for anchor links
- Navbar links use React Router for page routes, hash links for in-page sections
- Mobile menu: closes on any link tap, smooth scroll to section
- Active state: current page highlighted in nav

### Performance on Mobile

- Parallax effects use `will-change: transform` and are throttled/disabled on low-power devices
- Video placeholders show poster image on mobile (no autoplay video to save bandwidth)
- GSAP ScrollTrigger uses `matchMedia` to reduce animation complexity on small screens
- Images: `loading="lazy"`, responsive srcset when available

---

## 8. Assets & Placeholders

### Ready Now
- Portfolio images (5 projects, Vercel Blob)
- Studio image
- Logo (IV mark PNG)
- Fonts: Bebas Neue, Inter, Space Mono

### Placeholder Strategy
- **Video hero:** Use first portfolio image with Ken Burns slow zoom as video placeholder
- **Project videos:** Poster images with subtle scale animation on hover
- **Client logos:** Text-based ticker (swap to SVG later)
- All placeholders designed for seamless replacement without layout changes

---

## 9. Tech Decisions

| Decision                  | Choice                  | Reason                                    |
|---------------------------|------------------------|-------------------------------------------|
| Routing                   | React Router v7         | Page transitions + route-based code split |
| Animation                 | GSAP + ScrollTrigger    | Already in project, powerful parallax     |
| Styling                   | Tailwind 4 + CSS files  | Already in project, utility + custom      |
| Theme                     | CSS custom properties   | Fast swap, no re-render, GSAP compatible  |
| State (project sync)      | React useState/context  | Simple, no external deps needed           |
| Video                     | Native HTML5 `<video>`  | No player library needed for loops        |
