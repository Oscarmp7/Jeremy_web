import test from 'node:test'
import assert from 'node:assert/strict'

test('route metadata resolves home, listing, detail, contact, and 404 states', async () => {
  const { getRouteMeta } = await import('../src/seo/routeMeta.js')

  const homeMeta = getRouteMeta('/')
  assert.match(homeMeta.title, /Manzana Cuatro/i)
  assert.match(homeMeta.description, /Santo Domingo/i)
  assert.equal(homeMeta.canonicalUrl, 'https://manzanacuatro.com/')
  assert.equal(homeMeta.ogType, 'website')

  const projectsMeta = getRouteMeta('/proyectos')
  assert.equal(projectsMeta.title, 'Proyectos | Manzana Cuatro')
  assert.equal(projectsMeta.canonicalUrl, 'https://manzanacuatro.com/proyectos')

  const detailMeta = getRouteMeta('/proyectos/changan-dominicana')
  assert.match(detailMeta.title, /Changan Dominicana/)
  assert.equal(
    detailMeta.canonicalUrl,
    'https://manzanacuatro.com/proyectos/changan-dominicana',
  )
  assert.equal(detailMeta.ogType, 'article')

  const contactMeta = getRouteMeta('/contacto')
  assert.equal(contactMeta.title, 'Contacto | Manzana Cuatro')

  const notFoundMeta = getRouteMeta('/ruta-inexistente')
  assert.equal(notFoundMeta.title, '404 | Manzana Cuatro')
  assert.equal(notFoundMeta.robots, 'noindex, nofollow')
})
