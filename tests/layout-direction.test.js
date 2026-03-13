import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('app keeps the multipage shell without legacy chrome', () => {
  const appSource = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8')

  assert.doesNotMatch(appSource, /Cursor/)
  assert.doesNotMatch(appSource, /FilmGrain/)
  assert.doesNotMatch(appSource, /Marquee/)
  assert.match(appSource, /lazy\(\(\)\s*=>\s*import/)
  assert.match(appSource, /Suspense/)
  assert.match(appSource, /path="proyectos"/)
  assert.match(appSource, /path="proyectos\/:slug"/)
  assert.match(appSource, /path="studio"/)
  assert.match(appSource, /path="contacto"/)
  assert.match(appSource, /path="\*"/)
})

test('home page is rebuilt around a pinned reel and integrated end frame', () => {
  const homeSource = readFileSync(new URL('../src/pages/HomePage.jsx', import.meta.url), 'utf8')

  assert.match(homeSource, /HomeReel/)
  assert.match(homeSource, /HomeClientBand/)
  assert.match(homeSource, /HomeEndFrame/)
  assert.doesNotMatch(homeSource, /HomeHeroStage/)
  assert.doesNotMatch(homeSource, /HomeMediaFlow/)
  assert.doesNotMatch(homeSource, /HomeClosingCta/)
  assert.doesNotMatch(homeSource, /from '\.\.\/components\/Hero\/Hero'/)
  assert.doesNotMatch(homeSource, /from '\.\.\/components\/Marquee\/Marquee'/)
  assert.doesNotMatch(homeSource, /from '\.\.\/components\/ProjectsPreview\/ProjectsPreview'/)
})

test('loader remains a full wordmark reveal without progress line chrome', () => {
  const loaderSource = readFileSync(new URL('../src/components/Loader/Loader.jsx', import.meta.url), 'utf8')
  const loaderCss = readFileSync(new URL('../src/components/Loader/Loader.css', import.meta.url), 'utf8')

  assert.match(loaderSource, /siteContent\.brand\.name/)
  assert.match(loaderSource, /siteContent\.hero\.eyebrow/)
  assert.match(loaderSource, /siteContent\.hero\.primaryCta\.label/)
  assert.doesNotMatch(loaderSource, /loader__line/)
  assert.doesNotMatch(loaderSource, />M4</)
  assert.match(loaderCss, /\.loader__view/)
})

test('home reel exposes pinned frames, rising mask, and blur-based title crossfades', () => {
  const reelSource = readFileSync(new URL('../src/components/HomeReel/HomeReel.jsx', import.meta.url), 'utf8')
  const reelCss = readFileSync(new URL('../src/components/HomeReel/HomeReel.css', import.meta.url), 'utf8')

  assert.match(reelSource, /home-reel__sticky/)
  assert.match(reelSource, /home-reel__title-card/)
  assert.match(reelSource, /project\.video/)
  assert.match(reelSource, /<video/)
  assert.match(reelSource, /autoPlay/)
  assert.match(reelSource, /muted/)
  assert.match(reelSource, /loop/)
  assert.match(reelSource, /playsInline/)
  assert.match(reelSource, /showcaseProjects\.slice\(0,\s*4\)/)
  assert.match(reelSource, /const TITLE_FADE_OUT_START = 0\.38/)
  assert.match(reelSource, /const TITLE_FADE_OUT_END = 0\.58/)
  assert.match(reelSource, /const TITLE_FADE_IN_START = 0\.48/)
  assert.match(reelSource, /const TITLE_FADE_IN_END = 0\.74/)
  assert.match(reelSource, /normalizeRange\(\s*localProgress,\s*TITLE_FADE_IN_START,\s*TITLE_FADE_IN_END,\s*\)/)
  assert.match(reelSource, /scrollTrigger:\s*\{[\s\S]*scrub:\s*true/)
  assert.match(reelCss, /\.home-reel__frame/)
  assert.match(reelCss, /\.home-reel__band/)
  assert.match(reelCss, /--title-step:/)
  assert.match(reelCss, /\.home-reel__title-window/)
  assert.match(reelCss, /--title-opacity:/)
  assert.match(reelCss, /--title-blur:/)
  assert.match(reelCss, /\.home-reel__title-card[\s\S]*filter:\s*blur\(var\(--title-blur\)\)/)
  assert.match(reelCss, /min-height:\s*calc\(var\(--reel-frames\)\s*\*\s*100dvh\)/)
  assert.match(reelCss, /height:\s*100dvh/)
  assert.doesNotMatch(reelCss, /100svh/)
  assert.doesNotMatch(reelSource, /home-reel__brand-band/)
  assert.doesNotMatch(reelSource, /BRAND_BAND_FADE_START/)
})

test('home client band renders a continuous loop before the closing frame', () => {
  const bandSource = readFileSync(new URL('../src/components/HomeClientBand/HomeClientBand.jsx', import.meta.url), 'utf8')
  const bandCss = readFileSync(new URL('../src/components/HomeClientBand/HomeClientBand.css', import.meta.url), 'utf8')

  assert.match(bandSource, /home-client-band/)
  assert.match(bandSource, /home-client-band__group/)
  assert.match(bandSource, /siteContent\.clients/)
  assert.doesNotMatch(bandSource, /showcaseProjects/)
  assert.match(bandCss, /\.home-client-band__track/)
  assert.match(bandCss, /\.home-client-band__group/)
  assert.match(bandCss, /animation:\s*home-client-band-scroll/)
  assert.match(bandCss, /42s linear infinite/)
})

test('home end frame integrates contact and lower support links without the old client list', () => {
  const endSource = readFileSync(new URL('../src/components/HomeEndFrame/HomeEndFrame.jsx', import.meta.url), 'utf8')
  const endCss = readFileSync(new URL('../src/components/HomeEndFrame/HomeEndFrame.css', import.meta.url), 'utf8')
  const contactSource = readFileSync(new URL('../src/pages/ContactPage.jsx', import.meta.url), 'utf8')

  assert.match(endSource, /siteContent\.contact\.title/)
  assert.match(endSource, /TextSwap/)
  assert.match(contactSource, /contact\.title/)
  assert.match(endSource, /home-end__footer-links/)
  assert.match(endCss, /\.home-end__title-label/)
  assert.match(endCss, /\.home-end__title-label[\s\S]*text-shadow:/)
  assert.match(endCss, /\.home-end[\s\S]*background:\s*var\(--bg\)/)
  assert.match(endCss, /min-height:\s*100dvh/)
  assert.doesNotMatch(endCss, /100svh/)
  assert.doesNotMatch(endCss, /\.home-end[\s\S]*background:\s*#020202/)
  assert.doesNotMatch(endSource, /home-end__top-list/)
})

test('studio page keeps a structural heading even with the manifesto-led layout', () => {
  const studioSource = readFileSync(new URL('../src/pages/StudioPage.jsx', import.meta.url), 'utf8')

  assert.match(studioSource, /<h1 className="studio__sr-title">/)
})
