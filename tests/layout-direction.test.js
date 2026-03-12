import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'

import { siteContent } from '../src/data/siteContent.js'

test('app markup drops legacy cursor and marquee chrome', () => {
  const appSource = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8')

  assert.doesNotMatch(appSource, /Cursor/)
  assert.doesNotMatch(appSource, /FilmGrain/)
  assert.doesNotMatch(appSource, /Marquee/)
})

test('hero and work expose full-bleed spread containers', () => {
  const heroSource = readFileSync(new URL('../src/components/Hero/Hero.jsx', import.meta.url), 'utf8')
  const workSource = readFileSync(new URL('../src/components/Work/Work.jsx', import.meta.url), 'utf8')

  assert.match(heroSource, /hero__spread/)
  assert.match(workSource, /work__spread/)
})

test('navigation targets real sections and sections keep viewport-safe anchors', () => {
  const heroSource = readFileSync(new URL('../src/components/Hero/Hero.jsx', import.meta.url), 'utf8')
  const workSource = readFileSync(new URL('../src/components/Work/Work.jsx', import.meta.url), 'utf8')
  const aboutSource = readFileSync(new URL('../src/components/About/About.jsx', import.meta.url), 'utf8')
  const servicesSource = readFileSync(new URL('../src/components/Services/Services.jsx', import.meta.url), 'utf8')
  const contactSource = readFileSync(new URL('../src/components/Contact/Contact.jsx', import.meta.url), 'utf8')
  const cssSource = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8')
  const workCss = readFileSync(new URL('../src/components/Work/Work.css', import.meta.url), 'utf8')
  const aboutCss = readFileSync(new URL('../src/components/About/About.css', import.meta.url), 'utf8')
  const servicesCss = readFileSync(new URL('../src/components/Services/Services.css', import.meta.url), 'utf8')
  const contactCss = readFileSync(new URL('../src/components/Contact/Contact.css', import.meta.url), 'utf8')
  const joined = [heroSource, workSource, aboutSource, servicesSource, contactSource].join('\n')

  for (const link of siteContent.nav) {
    const id = link.href.replace('#', '')
    assert.match(joined, new RegExp(`id="${id}"`))
  }

  assert.match(cssSource, /main > section\s*\{/)
  assert.match(cssSource, /scroll-margin-top/)
  assert.match(workCss, /\.work\s*\{[\s\S]*min-height:\s*100svh/)
  assert.match(aboutCss, /\.about\s*\{[\s\S]*min-height:\s*100svh/)
  assert.match(servicesCss, /\.services\s*\{[\s\S]*min-height:\s*100svh/)
  assert.match(contactCss, /\.contact\s*\{[\s\S]*min-height:\s*100svh/)
})

test('legacy dead files are removed from the active design system', () => {
  const legacyFiles = [
    '../src/components/Marquee/Marquee.jsx',
    '../src/components/ui/Cursor.jsx',
    '../src/components/ui/FilmGrain.jsx',
    '../src/components/ui/LangToggle.jsx',
    '../src/components/ui/ThemeToggle.jsx',
    '../src/hooks/useCursor.js',
    '../src/hooks/useLiveTimecode.js',
    '../src/hooks/useTheme.js',
    '../src/components/Work/ProjectCard.jsx',
    '../src/components/Work/ProjectModal.jsx',
    '../src/data/projects.js',
    '../src/i18n/index.js',
    '../src/i18n/es.json',
    '../src/i18n/en.json',
  ]

  for (const relativePath of legacyFiles) {
    assert.equal(existsSync(new URL(relativePath, import.meta.url)), false, relativePath)
  }
})
