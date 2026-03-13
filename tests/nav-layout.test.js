import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('navigation uses a clean home overlay and distributed top bar', () => {
  const navSource = readFileSync(new URL('../src/components/Nav/Nav.jsx', import.meta.url), 'utf8')
  const navCss = readFileSync(new URL('../src/components/Nav/Nav.css', import.meta.url), 'utf8')

  assert.match(navSource, /const navLinks = siteContent\.nav/)
  assert.match(navSource, /className="nav__grid"/)
  assert.match(navSource, /className="nav__theme-dock"/)
  assert.match(navSource, /Dark/)
  assert.match(navSource, /Light/)
  assert.doesNotMatch(navSource, /contactLink/)
  assert.doesNotMatch(navSource, /nav__actions/)
  assert.doesNotMatch(navSource, /nav__cta/)
  assert.doesNotMatch(navSource, /nav__inner--home/)
  assert.doesNotMatch(navSource, /nav__inner--interior/)
  assert.match(navCss, /\.nav__grid/)
  assert.match(navCss, /grid-template-columns:\s*repeat\(4,\s*minmax\(0,\s*1fr\)\)/)
  assert.match(navCss, /\.nav__theme-dock[\s\S]*position:\s*fixed/)
  assert.match(navCss, /\.nav__theme-dock[\s\S]*left:\s*var\(--layout-pad\)/)
  assert.match(navCss, /\.nav__theme-dock[\s\S]*top:\s*50%/)
  assert.match(navCss, /\.nav__theme-dock[\s\S]*transform:\s*translateY\(-50%\)\s*rotate\(-90deg\)/)
  assert.match(navCss, /\.nav__theme-dock[\s\S]*transform-origin:\s*left center/)
  assert.match(navCss, /\.nav__item--link[\s\S]*font-weight:\s*500/)
  assert.match(navSource, /nav__menu-bar nav__menu-bar--top/)
  assert.match(navSource, /nav__menu-bar nav__menu-bar--middle/)
  assert.match(navSource, /nav__menu-bar nav__menu-bar--bottom/)
  assert.match(navCss, /\.nav__menu-bar/)
  assert.match(navCss, /\.nav__menu--open\s+\.nav__menu-bar--top[\s\S]*rotate\(45deg\)/)
  assert.match(navCss, /\.nav__menu--open\s+\.nav__menu-bar--middle[\s\S]*opacity:\s*0/)
  assert.match(navCss, /\.nav__menu--open\s+\.nav__menu-bar--bottom[\s\S]*rotate\(-45deg\)/)
  assert.doesNotMatch(navCss, /\.nav__inner--home/)
  assert.doesNotMatch(navCss, /\.nav__inner--interior/)
})

test('home nav only uses the light-on-dark treatment while the reel is active', () => {
  const navSource = readFileSync(new URL('../src/components/Nav/Nav.jsx', import.meta.url), 'utf8')
  const navCss = readFileSync(new URL('../src/components/Nav/Nav.css', import.meta.url), 'utf8')

  assert.match(navSource, /document\.querySelector\('\.home-end'\)/)
  assert.match(navSource, /setHomeOnDarkStage/)
  assert.match(navSource, /window\.innerHeight \* 0\.05/)
  assert.match(navSource, /nav--home-stage/)
  assert.match(navCss, /\.nav--home-stage\s+\.nav__item/)
  assert.doesNotMatch(navCss, /\.nav--home\s+\.nav__item/)
  assert.match(navSource, /scrolled && !isHome/)
})

test('main layout skips the traditional footer on home', () => {
  const layoutSource = readFileSync(new URL('../src/layouts/MainLayout.jsx', import.meta.url), 'utf8')

  assert.match(layoutSource, /const isHome = location\.pathname === '\/'/)
  assert.match(layoutSource, /!\s*isHome\s*&&\s*<Footer \/>/)
})

test('theme transition uses a centered radial blur reveal while keeping the home reel stable', () => {
  const themeSource = readFileSync(new URL('../src/components/ThemeTransition/ThemeTransition.jsx', import.meta.url), 'utf8')
  const themeCss = readFileSync(new URL('../src/components/ThemeTransition/ThemeTransition.css', import.meta.url), 'utf8')
  const reelCss = readFileSync(new URL('../src/components/HomeReel/HomeReel.css', import.meta.url), 'utf8')

  assert.match(themeSource, /theme-veil/)
  assert.match(themeSource, /theme-orb/)
  assert.match(themeSource, /scale:/)
  assert.match(themeSource, /transformOrigin:\s*'50% 50%'/)
  assert.doesNotMatch(themeSource, /xPercent/)
  assert.match(themeCss, /\.theme-veil/)
  assert.match(themeCss, /\.theme-orb/)
  assert.match(themeCss, /radial-gradient\(circle/)
  assert.match(themeCss, /backdrop-filter:\s*blur/)
  assert.match(themeCss, /border-radius:\s*50%/)
  assert.doesNotMatch(reelCss, /\.home-reel__title[\s\S]*color:\s*var\(--text\)/)
  assert.doesNotMatch(reelCss, /\.home-reel__view[\s\S]*color:\s*var\(--text\)/)
  assert.doesNotMatch(reelCss, /\.home-reel__band-fill[\s\S]*var\(--text\)/)
})

test('page transition uses a horizontal wipe with content parallax instead of a curtain only', () => {
  const transitionSource = readFileSync(new URL('../src/components/PageTransition/PageTransition.jsx', import.meta.url), 'utf8')
  const transitionCss = readFileSync(new URL('../src/components/PageTransition/PageTransition.css', import.meta.url), 'utf8')

  assert.match(transitionSource, /stageRef/)
  assert.match(transitionSource, /wipeRef/)
  assert.match(transitionSource, /className="page-stage"/)
  assert.match(transitionSource, /className="page-wipe"/)
  assert.match(transitionSource, /xPercent/)
  assert.match(transitionSource, /set\(overlayRefs,\s*\{\s*xPercent:\s*0,\s*display:\s*'block'/)
  assert.doesNotMatch(transitionSource, /\.to\(wipeRef\.current,\s*\{[\s\S]*xPercent:\s*0/)
  assert.doesNotMatch(transitionSource, /yPercent/)
  assert.match(transitionCss, /\.page-stage/)
  assert.match(transitionCss, /\.page-wipe/)
  assert.match(transitionCss, /\.page-sheen/)
})
