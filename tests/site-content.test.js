import test from 'node:test'
import assert from 'node:assert/strict'

import { showcaseProjects, siteContent } from '../src/data/siteContent.js'

test('site content reflects the Manzana Cuatro brief and dedicated client band data', () => {
  assert.equal(siteContent.brand.name, 'Manzana Cuatro')
  assert.equal(siteContent.brand.email, 'info@manzanacuatro.com')
  assert.match(siteContent.brand.whatsappHref, /18498633817/)
  assert.equal(siteContent.hero.primaryCta.label, 'Ver portafolio')
  assert.equal(siteContent.hero.secondaryCta.label, 'Escríbenos por WhatsApp')
  assert.equal(siteContent.contact.title, 'Comienza tu historia')
  assert.deepEqual(
    siteContent.clients.map((client) => client.name),
    [
      'La Bodega',
      'Shibuya',
      'Changan Dominicana',
      'Farma Extra',
      'Porsche Center Santo Domingo',
    ],
  )
})

test('showcase projects and services match the brief inventory', () => {
  assert.equal(showcaseProjects.length, 5)
  assert.deepEqual(
    showcaseProjects.map((project) => project.title),
    [
      'La Bodega Día de los Padres',
      'Shibuya Casa de Campo',
      'Changan Dominicana',
      'Farma Extra',
      'Porsche Center Santo Domingo',
    ],
  )

  assert.deepEqual(
    siteContent.services.map((service) => service.title),
    [
      'Producción audiovisual',
      'Colorización',
      'Filmación',
      'Fotografía',
      'Creación de contenido',
    ],
  )
})

test('credibility stats preserve the brief numbers', () => {
  assert.deepEqual(
    siteContent.stats.map((stat) => stat.value),
    ['10', '300', '1'],
  )
})

test('shared navigation uses the approved spanish-first information architecture', () => {
  assert.deepEqual(
    siteContent.nav.map((link) => link.label),
    ['Proyectos', 'Estudio', 'Contacto'],
  )
  assert.equal(siteContent.about.eyebrow, 'Estudio')
})
